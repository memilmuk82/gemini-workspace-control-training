'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

const workspaceRoot = path.resolve(__dirname, '..');
const capturesRoot = path.join(workspaceRoot, 'captures');
const artifactsRoot = path.join(__dirname, '.artifacts');

function loadPlaywright() {
  const candidates = [
    process.env.PLAYWRIGHT_MODULE_DIR,
    path.join(
      os.homedir(),
      '.cache',
      'codex-runtimes',
      'codex-primary-runtime',
      'dependencies',
      'node',
      'node_modules',
      'playwright',
    ),
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch {
      // Try the next bundled location.
    }
  }

  throw new Error(
    'Playwright를 찾지 못했습니다. PLAYWRIGHT_MODULE_DIR에 Playwright 모듈 경로를 지정하세요.',
  );
}

const { chromium } = loadPlaywright();

const accountConfig = {
  edu: {
    label: '교육용 계정',
    startUrl: 'https://classroom.google.com/',
  },
  personal: {
    label: '개인 계정',
    startUrl: 'https://gemini.google.com/',
  },
};

const allowedHosts = new Set([
  'accounts.google.com',
  'chat.google.com',
  'classroom.google.com',
  'docs.google.com',
  'drive.google.com',
  'forms.google.com',
  'gemini.google.com',
  'mail.google.com',
  'notebooklm.google.com',
  'sheets.google.com',
  'studio.workspace.google.com',
  'support.google.com',
  'workspace.google.com',
]);

const blockedActionPattern = new RegExp(
  [
    '게시',
    '할당',
    '보내기',
    '공유',
    '예약',
    '삭제',
    '제출',
    '결제',
    '구매',
    '업그레이드',
    'publish',
    'post',
    'assign',
    'send',
    'share',
    'schedule',
    'delete',
    'submit',
    'turn on',
    'upgrade',
    'purchase',
  ].join('|'),
  'i',
);

function emit(payload) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

function getProfileRoot() {
  const localAppData =
    process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
  return path.join(localAppData, 'CodexEvidenceCapture', 'profiles');
}

function requireAccount(account) {
  const config = accountConfig[account];
  if (!config) {
    throw new Error('계정 유형은 edu 또는 personal이어야 합니다.');
  }
  return config;
}

function validateNavigationUrl(rawUrl) {
  const parsed = new URL(rawUrl);
  if (parsed.protocol !== 'https:') {
    throw new Error('HTTPS 주소만 열 수 있습니다.');
  }
  if (!allowedHosts.has(parsed.hostname)) {
    throw new Error(`허용되지 않은 호스트입니다: ${parsed.hostname}`);
  }
  return parsed.href;
}

function resolveCapturePath(relativeFile) {
  if (!relativeFile || path.extname(relativeFile).toLowerCase() !== '.png') {
    throw new Error('캡처 파일은 captures/ 아래의 PNG 상대 경로여야 합니다.');
  }

  const target = path.resolve(capturesRoot, relativeFile);
  const boundary = `${capturesRoot}${path.sep}`;
  if (!target.startsWith(boundary)) {
    throw new Error('캡처 경로가 captures/ 폴더를 벗어났습니다.');
  }
  return target;
}

async function launchAccountContext(account, options = {}) {
  const config = requireAccount(account);
  const profileDir = path.join(getProfileRoot(), account);
  fs.mkdirSync(profileDir, { recursive: true });

  const context = await chromium.launchPersistentContext(profileDir, {
    channel: 'chrome',
    headless: options.headless === true,
    locale: 'ko-KR',
    viewport: options.headless ? { width: 1440, height: 900 } : null,
    args: options.headless ? [] : ['--start-maximized'],
    acceptDownloads: false,
  });

  let pages = context.pages();
  if (pages.length === 0) {
    pages = [await context.newPage()];
  }
  const page = pages[0];
  if (!options.skipStartNavigation) {
    await page.goto(config.startUrl, { waitUntil: 'domcontentloaded' });
  }
  return { config, context, page, profileDir };
}

function rootForFrameSelectors(page, frameSelector, frameSelectors) {
  const selectors = Array.isArray(frameSelectors)
    ? frameSelectors
    : frameSelector
      ? [frameSelector]
      : [];
  let root = page;
  for (const selector of selectors) {
    root = root.frameLocator(selector);
  }
  return root;
}

function locatorFromTarget(page, target) {
  if (!target || typeof target !== 'object') {
    throw new Error('target 객체가 필요합니다.');
  }

  const root = rootForFrameSelectors(page, target.frameSelector, target.frameSelectors);
  const exact = target.exact !== false;
  if (target.role && target.name) {
    return root.getByRole(target.role, { name: target.name, exact });
  }
  if (target.label) {
    return root.getByLabel(target.label, { exact });
  }
  if (target.placeholder) {
    return root.getByPlaceholder(target.placeholder, { exact });
  }
  if (target.text) {
    return root.getByText(target.text, { exact });
  }
  if (target.selector) {
    return root.locator(target.selector);
  }
  throw new Error('role+name, label, placeholder, text 또는 selector가 필요합니다.');
}

async function requireUniqueLocator(page, target) {
  let locator = locatorFromTarget(page, target);
  const count = await locator.count();
  if (count === 0) {
    throw new Error('대상 요소를 찾지 못했습니다. snapshot 또는 inspect로 다시 확인하세요.');
  }
  if (target.index !== undefined) {
    if (!Number.isInteger(target.index) || target.index < 0 || target.index >= count) {
      throw new Error(`index가 범위를 벗어났습니다. 후보 수: ${count}`);
    }
    return locator.nth(target.index);
  }
  if (count !== 1) {
    throw new Error(`대상 요소가 ${count}개입니다. target.index로 하나를 지정하세요.`);
  }
  return locator;
}

async function currentPage(context, state) {
  const pages = context.pages();
  if (pages.length === 0) {
    state.page = await context.newPage();
    return state.page;
  }
  if (!pages.includes(state.page) || state.page.isClosed()) {
    state.page = pages[pages.length - 1];
  }
  return state.page;
}

async function handleCommand(context, state, command) {
  const page = await currentPage(context, state);

  switch (command.op) {
    case 'status':
      return {
        url: page.url(),
        title: await page.title(),
        pages: context.pages().length,
      };

    case 'pages':
      return {
        pages: await Promise.all(
          context.pages().map(async (item, index) => ({
            index,
            url: item.url(),
            title: await item.title(),
          })),
        ),
      };

    case 'activate': {
      const pages = context.pages();
      const index = Number(command.index);
      if (!Number.isInteger(index) || index < 0 || index >= pages.length) {
        throw new Error(`페이지 index가 범위를 벗어났습니다. 페이지 수: ${pages.length}`);
      }
      state.page = pages[index];
      await state.page.bringToFront();
      return { index, url: state.page.url(), title: await state.page.title() };
    }

    case 'goto': {
      const url = validateNavigationUrl(command.url);
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      return { url: page.url(), title: await page.title() };
    }

    case 'wait': {
      const milliseconds = Math.min(Math.max(Number(command.ms) || 1000, 0), 30000);
      await page.waitForTimeout(milliseconds);
      return { waitedMs: milliseconds };
    }

    case 'snapshot': {
      const snapshotRoot = rootForFrameSelectors(
        page,
        command.frameSelector,
        command.frameSelectors,
      ).locator('body');
      const snapshot = await snapshotRoot.ariaSnapshot({ timeout: 15000 });
      return { url: page.url(), title: await page.title(), snapshot };
    }

    case 'scroll': {
      const scrollRoot = rootForFrameSelectors(
        page,
        command.frameSelector,
        command.frameSelectors,
      ).locator(command.selector || 'body');
      const count = await scrollRoot.count();
      if (count !== 1) {
        throw new Error(`스크롤 대상이 ${count}개입니다. selector로 하나를 지정하세요.`);
      }
      const top = Number(command.top);
      const left = Number(command.left);
      await scrollRoot.evaluate(
        (element, position) => {
          const scrollingElement = position.useElement
            ? element
            : element.ownerDocument.scrollingElement || element;
          scrollingElement.scrollTo({
            top: Number.isFinite(position.top) ? position.top : scrollingElement.scrollTop,
            left: Number.isFinite(position.left) ? position.left : scrollingElement.scrollLeft,
            behavior: 'instant',
          });
        },
        { top, left, useElement: Boolean(command.selector) && command.document !== true },
      );
      return { scrolled: true, top, left };
    }

    case 'inspect': {
      const locator = locatorFromTarget(page, command.target);
      const count = await locator.count();
      const candidates = [];
      const limit = Math.min(count, 20);
      for (let index = 0; index < limit; index += 1) {
        const item = locator.nth(index);
        candidates.push({
          index,
          text: (await item.innerText().catch(() => '')).slice(0, 500),
          visible: await item.isVisible().catch(() => false),
        });
      }
      return { count, candidates };
    }

    case 'scrollables': {
      const items = await rootForFrameSelectors(
        page,
        command.frameSelector,
        command.frameSelectors,
      ).locator('*').evaluateAll((elements) =>
        elements
          .map((element) => {
            const style = getComputedStyle(element);
            const vertical = element.scrollHeight > element.clientHeight + 2;
            const horizontal = element.scrollWidth > element.clientWidth + 2;
            const canScroll = /(auto|scroll)/.test(
              `${style.overflow} ${style.overflowX} ${style.overflowY}`,
            );
            if ((!vertical && !horizontal) || !canScroll || element.clientWidth < 200) {
              return null;
            }
            return {
              tag: element.tagName.toLowerCase(),
              id: element.id || '',
              className:
                typeof element.className === 'string'
                  ? element.className.slice(0, 300)
                  : '',
              ariaLabel: element.getAttribute('aria-label') || '',
              clientWidth: element.clientWidth,
              clientHeight: element.clientHeight,
              scrollWidth: element.scrollWidth,
              scrollHeight: element.scrollHeight,
              scrollLeft: element.scrollLeft,
              scrollTop: element.scrollTop,
            };
          })
          .filter(Boolean)
          .slice(0, 40),
      );
      return { count: items.length, items };
    }

    case 'click': {
      const descriptiveName =
        command.target?.name ||
        command.target?.label ||
        command.target?.text ||
        command.target?.placeholder ||
        '';
      if (blockedActionPattern.test(descriptiveName) && command.allowRisky !== true) {
        throw new Error(
          '게시·발송·공유·삭제·예약·결제 가능성이 있는 동작은 자동 실행하지 않습니다.',
        );
      }
      const locator = await requireUniqueLocator(page, command.target);
      await locator.click();
      return { clicked: descriptiveName || command.target.selector };
    }

    case 'fill': {
      if (typeof command.text !== 'string') {
        throw new Error('fill 명령에는 text 문자열이 필요합니다.');
      }
      const locator = await requireUniqueLocator(page, command.target);
      await locator.fill(command.text);
      return { filled: true, length: command.text.length };
    }

    case 'press': {
      if (typeof command.key !== 'string' || command.key.length > 50) {
        throw new Error('유효한 key 문자열이 필요합니다.');
      }
      if (command.target) {
        const locator = await requireUniqueLocator(page, command.target);
        await locator.press(command.key);
      } else {
        await page.keyboard.press(command.key);
      }
      return { pressed: command.key };
    }

    case 'shot': {
      const target = resolveCapturePath(command.file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      await page.screenshot({
        path: target,
        fullPage: command.fullPage === true,
        animations: 'disabled',
      });
      return {
        file: path.relative(workspaceRoot, target),
        url: page.url(),
        title: await page.title(),
      };
    }

    case 'stop':
      return { stop: true };

    default:
      throw new Error(`지원하지 않는 op입니다: ${command.op}`);
  }
}

async function runSession(account) {
  const { config, context, page, profileDir } = await launchAccountContext(account);
  const state = { page };
  emit({
    ok: true,
    type: 'ready',
    account,
    accountLabel: config.label,
    profileDir,
    url: page.url(),
    message: '로그인 화면이면 사용자가 직접 로그인하세요. JSON 명령을 한 줄씩 입력할 수 있습니다.',
  });

  const input = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
  try {
    for await (const line of input) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      let command;
      try {
        command = JSON.parse(trimmed);
      } catch (error) {
        emit({ ok: false, error: `JSON 해석 실패: ${error.message}` });
        continue;
      }

      try {
        const result = await handleCommand(context, state, command);
        emit({ ok: true, ...result });
        if (result.stop) break;
      } catch (error) {
        emit({ ok: false, error: error.message });
      }
    }
  } finally {
    await context.close();
  }
}

async function runSelfTest() {
  fs.mkdirSync(artifactsRoot, { recursive: true });
  const profileDir = path.join(artifactsRoot, 'selftest-profile');
  const screenshotPath = path.join(artifactsRoot, 'selftest.png');
  const context = await chromium.launchPersistentContext(profileDir, {
    channel: 'chrome',
    headless: true,
    locale: 'ko-KR',
    viewport: { width: 1280, height: 720 },
  });
  try {
    const pages = context.pages();
    const page = pages[0] || (await context.newPage());
    await page.goto('https://example.com/', { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: screenshotPath, animations: 'disabled' });
    emit({
      ok: true,
      type: 'selftest',
      title: await page.title(),
      screenshotPath,
    });
  } finally {
    await context.close();
  }
}

async function main() {
  const [, , command, account] = process.argv;
  if (command === 'selftest') {
    await runSelfTest();
    return;
  }
  if (command === 'session') {
    await runSession(account);
    return;
  }
  throw new Error('사용법: node capture.js selftest | session <edu|personal>');
}

main().catch((error) => {
  emit({ ok: false, fatal: true, error: error.message, stack: error.stack });
  process.exitCode = 1;
});
