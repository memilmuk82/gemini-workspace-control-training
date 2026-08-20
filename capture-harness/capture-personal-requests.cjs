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
const captureRoot = path.join(workspaceRoot, 'captures', 'course-aligned', '05-classic-gems');
const profileRoot = path.join(
  process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'),
  'CodexEvidenceCapture',
  'profiles',
  'personal',
);

(async () => {
  fs.mkdirSync(captureRoot, { recursive: true });
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
    await page.goto('https://gemini.google.com/app?hl=ko', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(6000);
    await page.getByRole('button', { name: '설정', exact: true }).click();
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(captureRoot, '05-00_personal_gemini-settings-menu_20260820.png'),
      animations: 'disabled',
    });
    const personalIntelligence = page.getByText('개인 인텔리전스', { exact: true });
    if (await personalIntelligence.count() === 1) {
      await personalIntelligence.click();
      await page.waitForTimeout(1200);
    }
    const menuText = await page.locator('body').innerText();
    const requestItem = page.getByText(/Gemini 요청 ?사항/, { exact: true });
    const requestButton = page.getByRole('button', { name: /Gemini 요청 ?사항/ });
    const requestLink = page.getByRole('link', { name: /Gemini 요청 ?사항/ });
    const requestCount = await requestItem.count();
    await page.screenshot({
      path: path.join(captureRoot, '05-00_personal-intelligence-menu_20260820.png'),
      animations: 'disabled',
    });
    if (requestCount === 1) {
      if (await requestButton.count() === 1) await requestButton.click();
      else if (await requestLink.count() === 1) await requestLink.click();
      else await requestItem.locator('..').click();
      await page.waitForTimeout(5000);
      await page.screenshot({
        path: path.join(captureRoot, '05-00_personal_gemini-requests_20260820.png'),
        animations: 'disabled',
      });
    }
    const requestText = await page.locator('body').innerText();
    process.stdout.write(`${JSON.stringify({ title: await page.title(), url: page.url(), requestCount, menuText: menuText.slice(0, 8000), requestText: requestText.slice(0, 8000) }, null, 2)}\n`);
  } finally {
    await context.close();
  }
})().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exitCode = 1;
});
