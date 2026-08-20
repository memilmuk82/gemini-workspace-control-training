'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const { chromium } = require(path.join(
  os.homedir(),
  '.cache',
  'codex-runtimes',
  'codex-primary-runtime',
  'dependencies',
  'node',
  'node_modules',
  'playwright',
));

const workspaceRoot = path.resolve(__dirname, '..');
const reviewRoot = path.join(workspaceRoot, 'output', 'qa', 'recapture-review');
const profileRoot = path.join(
  process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'),
  'CodexEvidenceCapture',
  'profiles',
  'edu',
);

const conversations = [
  ['clarifying', 'https://gemini.google.com/app/d411ed38cefa96c8'],
  ['loop', 'https://gemini.google.com/app/550a91a13f24fb69?hl=ko'],
  ['before', 'https://gemini.google.com/app/8d9242d53b30bab8?hl=ko'],
  ['structured', 'https://gemini.google.com/app/3b5e9eccc2b97eb5?hl=ko'],
];
const requestedLabel = process.argv[2];
const targets = requestedLabel
  ? conversations.filter(([label]) => label === requestedLabel)
  : conversations;

(async () => {
  fs.mkdirSync(reviewRoot, { recursive: true });
  const context = await chromium.launchPersistentContext(profileRoot, {
    channel: 'chrome',
    headless: true,
    locale: 'ko-KR',
    viewport: { width: 1600, height: 1100 },
    deviceScaleFactor: 2,
    acceptDownloads: false,
  });
  try {
    const page = context.pages()[0] || (await context.newPage());
    for (const [label, url] of targets) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(6000);
      for (const [position, ratio] of [['start', 0], ['middle', 0.5], ['end', 1]]) {
        const scroll = await page.locator('*').evaluateAll((elements, scrollRatio) => {
          const candidates = elements
            .filter((element) => element.clientWidth > 700)
            .filter((element) => element.scrollHeight > element.clientHeight + 200)
            .sort((a, b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight));
          const target = elements.find((element) => element.tagName === 'INFINITE-SCROLLER')
            || candidates[0]
            || document.scrollingElement;
          target.scrollTop = (target.scrollHeight - target.clientHeight) * scrollRatio;
          return {
            tag: target.tagName,
            className: typeof target.className === 'string' ? target.className.slice(0, 180) : '',
            clientHeight: target.clientHeight,
            scrollHeight: target.scrollHeight,
            scrollTop: target.scrollTop,
          };
        }, ratio);
        await page.waitForTimeout(1200);
        await page.screenshot({
          path: path.join(reviewRoot, `${label}-${position}.png`),
          animations: 'disabled',
        });
        process.stdout.write(`${label}\t${position}\t${JSON.stringify(scroll)}\n`);
      }
      process.stdout.write(`${label}\t${await page.title()}\t${page.url()}\n`);
    }
  } finally {
    await context.close();
  }
})().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exitCode = 1;
});
