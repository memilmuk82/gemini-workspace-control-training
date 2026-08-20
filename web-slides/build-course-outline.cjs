'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'design', 'deck-outline.md');
const target = path.join(__dirname, 'course-outline.generated.js');

const lines = fs.readFileSync(source, 'utf8').split(/\r?\n/);
const slides = [];
let section = '시작';

for (const line of lines) {
  const sectionMatch = line.match(/^###\s+(.+?)\s+·\s+\d/);
  if (sectionMatch) section = sectionMatch[1].trim();

  const row = line.match(/^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/);
  if (!row) continue;
  slides.push({
    number: Number(row[1]),
    section,
    type: row[2].trim(),
    overview: row[3].trim(),
  });
}

if (slides.length !== 172 || slides[0]?.number !== 1 || slides.at(-1)?.number !== 172) {
  throw new Error(`슬라이드 개요 파싱 오류: ${slides.length}장`);
}

const output = `// design/deck-outline.md에서 자동 생성됨. 직접 수정하지 마세요.\nwindow.COURSE_OUTLINE = ${JSON.stringify(slides, null, 2)};\n`;
fs.writeFileSync(target, output, 'utf8');
process.stdout.write(`${target} · ${slides.length}장\n`);
