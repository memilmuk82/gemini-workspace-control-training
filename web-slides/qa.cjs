'use strict';

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('C:/Users/memilmuk82/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'output', 'qa');

const expectedSlideCount = 153;
const slideArgument = process.argv.find((argument) => argument.startsWith('--slides='));
const selectedIndices = slideArgument
  ? new Set(slideArgument.split('=')[1].split(',').map(Number).filter(Number.isFinite))
  : new Set(Array.from({ length: expectedSlideCount }, (_, index) => index + 1));

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  const messages = [];
  page.on('console', (message) => {
    if (message.type() === 'error') messages.push(message.text());
  });
  page.on('pageerror', (error) => messages.push(error.message));

  const url = `${pathToFileURL(path.join(root, 'web-slides', 'index.html')).href}#/slide/1`;
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(300);

  const slides = await page.evaluate(() => window.TRAINING_SLIDES.map((slide, index) => ({
    index: index + 1,
    title: slide.title,
  })));

  const selected = slides.filter((slide) => selectedIndices.has(slide.index));
  for (const slide of selected) {
    await page.goto(`${url.split('#')[0]}#/slide/${slide.index}`, { waitUntil: 'load' });
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(output, `slide-${String(slide.index).padStart(2, '0')}.png`) });
  }

  const audit = await page.evaluate((expectedSlideCount) => {
    const sheets = [...document.querySelectorAll('.slide-sheet')];
    const brokenImages = [...document.images]
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.src);
    const textSelector = [
      '.slide-heading h1',
      '.slide-heading p',
      '.course-lead',
      '.course-prompt p',
      '.course-checks dt',
      '.course-checks dd',
      '.practice-content h2',
      '.practice-content li',
      '.practice-content p',
      '.section-hero p',
    ].join(',');
    const fontAuditSelector = [
      '.slide-sheet h1', '.slide-sheet h2', '.slide-sheet h3',
      '.slide-sheet p', '.slide-sheet li', '.slide-sheet dt', '.slide-sheet dd',
      '.slide-sheet span', '.slide-sheet b', '.slide-sheet strong', '.slide-sheet code',
    ].join(',');
    const overflows = [];
    const fontSizeViolations = [];
    const titleWraps = [];
    const fontRules = [
      ['.slide-heading h1', 35],
      ['.slide-heading p', 21],
      ['.course-lead', 30],
      ['.course-prompt p', 19],
      ['.course-checks dt', 19],
      ['.course-checks dd', 19],
      ['.practice-content h2', 37],
      ['.practice-content li', 23],
      ['.practice-content p', 23],
    ];
    sheets.forEach((sheet, index) => {
      const previousDisplay = sheet.style.display;
      const previousVisibility = sheet.style.visibility;
      sheet.style.display = 'block';
      sheet.style.visibility = 'hidden';
      const slideRect = sheet.querySelector('.slide').getBoundingClientRect();
      const offenders = [...sheet.querySelectorAll(textSelector)]
        .filter((element) => element.clientWidth > 0 && element.clientHeight > 0)
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.left < slideRect.left - 2 || rect.top < slideRect.top - 2 || rect.right > slideRect.right + 2 || rect.bottom > slideRect.bottom + 2;
        })
        .map((element) => ({
          element: element.className || element.tagName,
          text: element.textContent.trim().slice(0, 48),
        }));
      const clippedText = [...sheet.querySelectorAll(textSelector)]
        .filter((element) => element.clientWidth > 0 && element.clientHeight > 0)
        .filter((element) => element.scrollWidth > element.clientWidth + 16 || element.scrollHeight > element.clientHeight + 16)
        .map((element) => ({
          element: element.className || element.tagName,
          text: element.textContent.trim().slice(0, 48),
        }));
      if (offenders.length) overflows.push({ slide: index + 1, offenders });
      if (clippedText.length) overflows.push({ slide: index + 1, clippedText });
      fontRules.forEach(([selector, minimum]) => {
        [...sheet.querySelectorAll(selector)]
          .filter((element) => element.clientWidth > 0 && element.clientHeight > 0)
          .forEach((element) => {
            const size = Number.parseFloat(getComputedStyle(element).fontSize);
            if (size + 0.1 < minimum) {
              fontSizeViolations.push({
                slide: index + 1,
                selector,
                size,
                minimum,
                text: element.textContent.trim().slice(0, 48),
              });
            }
          });
      });
      const title = sheet.querySelector('.slide-heading h1');
      if (title?.clientHeight) {
        const style = getComputedStyle(title);
        const lineHeight = Number.parseFloat(style.lineHeight) || Number.parseFloat(style.fontSize) * 1.1;
        const lines = Math.round(title.getBoundingClientRect().height / lineHeight);
        if (lines > 2) titleWraps.push({ slide: index + 1, lines, text: title.textContent.trim() });
      }
      sheet.style.display = previousDisplay;
      sheet.style.visibility = previousVisibility;
    });
    return {
      slideCount: sheets.length,
      expectedSlideCount,
      slideCountMatches: sheets.length === expectedSlideCount,
      fontFamilies: [...new Set([...document.querySelectorAll(fontAuditSelector)].map((element) => getComputedStyle(element).fontFamily))],
      fontSizeViolations,
      titleWraps,
      figcaptionCount: document.querySelectorAll('figcaption').length,
      focusedCount: document.querySelectorAll('.focus-frame.is-focused').length,
      brokenImages,
      overflows,
    };
  }, expectedSlideCount);

  let pdfPath = null;
  if (process.argv.includes('--pdf')) {
    pdfPath = path.join(root, 'output', 'pdf', 'gemini-workspace-control-training.pdf');
    fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
    await page.goto(`${url.split('#')[0]}#/slide/1`, { waitUntil: 'load' });
    await page.waitForTimeout(350);
    await page.pdf({
      path: pdfPath,
      printBackground: true,
      preferCSSPageSize: true,
    });
  }

  const report = { selected, audit, messages, pdfPath };
  fs.writeFileSync(path.join(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
})().catch((error) => {
  const failure = `${error.stack || error}\n`;
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, 'failure.log'), failure);
  process.stderr.write(failure);
  process.exitCode = 1;
});
