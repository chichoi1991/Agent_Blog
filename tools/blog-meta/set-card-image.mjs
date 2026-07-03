#!/usr/bin/env node
// 각 _chapters/*.md 의 본문 첫 이미지(/assets/...)를 카드 썸네일용 image: 프론트매터로 지정한다.
// - 이미 image: 가 있으면 건너뜀
// - 본문에 /assets 이미지가 없으면 건너뜀(그라데이션 placeholder 유지)
// 사용: node tools/blog-meta/set-card-image.mjs [--force]
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const FORCE = process.argv.includes('--force');
const DIR = join(process.cwd(), '_chapters');
const IMG_RE = /\/assets\/[^'"\s)]+\.(?:png|jpe?g|gif|webp|svg)/i;
// 재생 버튼/플레이스홀더성 이미지는 대표 썸네일로 부적합 → 뒤로 미룸
const SKIP_HINT = /(playbutton|thumbnail_play|badge|logo-|icon-)/i;

let changed = 0, skipped = 0, noimg = 0;

for (const name of readdirSync(DIR)) {
  if (!name.endsWith('.md')) continue;
  const path = join(DIR, name);
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) { skipped++; continue; }
  const [, fm, body] = m;

  if (!FORCE && /^image:\s*\S/m.test(fm)) { skipped++; continue; }

  // 본문 전체 이미지 후보 수집
  const all = [...body.matchAll(new RegExp(IMG_RE, 'gi'))].map(x => x[0]);
  if (all.length === 0) { noimg++; continue; }
  // 대표성 낮은 이미지는 뒤로, 없으면 첫 번째
  const preferred = all.find(u => !SKIP_HINT.test(u)) || all[0];

  // 기존 image: 라인 제거 후 재삽입(FORCE 대비)
  let fmClean = fm.replace(/^image:\s*.*$\r?\n?/m, '');
  const nl = raw.includes('\r\n') ? '\r\n' : '\n';
  const newFm = `${fmClean}${nl}image: "${preferred}"`;
  const out = `---${nl}${newFm}${nl}---${nl}${body}`;
  writeFileSync(path, out, 'utf8');
  changed++;
}

console.log(`image 지정: ${changed} · 건너뜀(기존/무본문): ${skipped} · 본문이미지없음: ${noimg}`);
