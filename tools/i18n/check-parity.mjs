#!/usr/bin/env node
/**
 * check-parity.mjs — 한국어(_chapters) / 영어(_chapters_en) 챕터 짝 검사기
 *
 * 이 블로그의 언어 토글은 "두 컬렉션에 같은 파일명이 존재한다"는 규약에 기대고 있다.
 * 파일명이 어긋나면 토글이 반대 언어 홈으로 폴백하고, order/parent 가 어긋나면
 * 사이드바 계층·정렬이 언어별로 달라진다. 이 스크립트가 그 두 가지를 잡는다.
 *
 * 사용법:
 *   node tools/i18n/check-parity.mjs                 # 전체 리포트, 항상 exit 0
 *   node tools/i18n/check-parity.mjs --strict        # 문제가 하나라도 있으면 exit 1
 *   node tools/i18n/check-parity.mjs --added a.md,b.md --strict
 *                                                    # 지정한 파일의 문제만 exit 1 대상
 *
 * 의존성 없음(Node 18+).
 */

import { readdirSync, readFileSync, existsSync, appendFileSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const KO_DIR = join(REPO, '_chapters');
const EN_DIR = join(REPO, '_chapters_en');

/** 의도적으로 영문판을 만들지 않는 파일(개인용 변형본 등). */
const IGNORE = new Set(['cowork-lab-0-setup-chichoi.md']);

/** 한/영이 반드시 같은 값이어야 하는 프론트매터 키. 다르면 사이드바가 어긋난다. */
const MUST_MATCH = ['order', 'category', 'parent', 'is_parent'];

const argv = process.argv.slice(2);
const strict = argv.includes('--strict');
const addedIdx = argv.indexOf('--added');
const added = addedIdx >= 0 && argv[addedIdx + 1]
  ? new Set(argv[addedIdx + 1].split(',').map((s) => basename(s.trim())).filter(Boolean))
  : null;

function listChapters(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.md') && !IGNORE.has(f)).sort();
}

/** 아주 단순한 프론트매터 파서 — 이 리포의 평평한 key: value 형태만 다룬다. */
function frontMatter(path) {
  const text = readFileSync(path, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"') && v.length > 1) ||
      (v.startsWith("'") && v.endsWith("'") && v.length > 1)
    ) {
      v = v.slice(1, -1);
    }
    out[kv[1]] = v;
  }
  return out;
}

const ko = listChapters(KO_DIR);
const en = listChapters(EN_DIR);
const koSet = new Set(ko);
const enSet = new Set(en);

const missingEn = ko.filter((f) => !enSet.has(f));
const orphanEn = en.filter((f) => !koSet.has(f));

const mismatches = [];
for (const f of ko) {
  if (!enSet.has(f)) continue;
  const a = frontMatter(join(KO_DIR, f));
  const b = frontMatter(join(EN_DIR, f));
  if (!a || !b) {
    mismatches.push({ file: f, problem: 'front matter를 파싱할 수 없음' });
    continue;
  }
  if (b.lang !== 'en') {
    mismatches.push({ file: f, problem: `영문판에 lang: en 이 없음 (현재: ${b.lang ?? '없음'})` });
  }
  for (const key of MUST_MATCH) {
    const av = a[key] ?? '';
    const bv = b[key] ?? '';
    if (av !== bv) {
      mismatches.push({ file: f, problem: `${key} 불일치 — ko="${av}" / en="${bv}"` });
    }
  }
}

const lines = [];
lines.push(`한국어 챕터 ${ko.length}개 · 영문 챕터 ${en.length}개`);
if (missingEn.length) {
  lines.push('', `### 영문판 누락 (${missingEn.length})`, ...missingEn.map((f) => `- \`_chapters_en/${f}\` 가 없습니다`));
}
if (orphanEn.length) {
  lines.push('', `### 한국어판 없는 영문판 (${orphanEn.length})`, ...orphanEn.map((f) => `- \`_chapters/${f}\` 가 없습니다`));
}
if (mismatches.length) {
  lines.push('', `### 프론트매터 불일치 (${mismatches.length})`, ...mismatches.map((m) => `- \`${m.file}\` — ${m.problem}`));
}
if (!missingEn.length && !orphanEn.length && !mismatches.length) {
  lines.push('', '한/영 짝이 모두 맞습니다.');
}

const report = lines.join('\n');
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## i18n parity\n\n${report}\n`);
}

if (!strict) process.exit(0);

// --added 가 주어지면 이번 변경분에서 생긴 문제만 실패 사유로 삼는다.
// (기존에 쌓여 있던 미번역 항목 때문에 무관한 PR 이 막히지 않도록.)
const relevant = (f) => (added ? added.has(f) : true);
const blocking = [
  ...missingEn.filter(relevant).map((f) => `영문판 누락: ${f}`),
  ...orphanEn.filter(relevant).map((f) => `한국어판 누락: ${f}`),
  ...mismatches.filter((m) => relevant(m.file)).map((m) => `${m.file}: ${m.problem}`),
];

if (blocking.length) {
  console.error('\n검사 실패:');
  for (const b of blocking) console.error(`  - ${b}`);
  process.exit(1);
}
console.log('\n이번 변경분에는 문제가 없습니다.');
