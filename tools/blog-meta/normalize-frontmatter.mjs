// tools/blog-meta/normalize-frontmatter.mjs
// 모든 _chapters/*.md 의 frontmatter 를 정규화한다:
//  1) date: 가 없으면 추가 — source_published 있으면 그 값, 없으면 git 최종 커밋일(%cs), 그래도 없으면 오늘.
//  2) title:/short_title: 앞머리의 이모지(❗🚨🎯🐱 등)를 제거한다.
// 본문은 건드리지 않는다. Node 18+.
//
//   node tools/blog-meta/normalize-frontmatter.mjs           # 적용
//   node tools/blog-meta/normalize-frontmatter.mjs --check   # 변경 예정만 출력

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const CHAPTERS = join(ROOT, "_chapters");
const CHECK = process.argv.includes("--check");
const TODAY = new Date().toISOString().slice(0, 10);

// 앞머리 이모지/기호 + 뒤따르는 공백 제거용(유니코드 이모지·기호 범위)
const LEAD_EMOJI = /^(?:[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FE0F}\u200D\u2122\u2139\u{1F1E6}-\u{1F1FF}\u2B50\u2B55]|\uFE0F)+\s*/u;

function stripLeadEmoji(v) {
  let s = v;
  for (let i = 0; i < 4; i++) {
    const n = s.replace(LEAD_EMOJI, "");
    if (n === s) break;
    s = n;
  }
  return s.trim();
}

function gitDate(file) {
  try {
    const d = execSync(`git log -1 --format=%cs -- "${file}"`, { cwd: ROOT, encoding: "utf8" }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : "";
  } catch {
    return "";
  }
}

const files = readdirSync(CHAPTERS).filter((f) => f.endsWith(".md"));
let changed = 0;

for (const f of files) {
  const path = join(CHAPTERS, f);
  const raw = readFileSync(path, "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;
  let lines = m[1].split(/\r?\n/);

  const get = (k) => {
    const line = lines.find((l) => new RegExp(`^${k}:\\s*`).test(l));
    if (!line) return null;
    return line.replace(new RegExp(`^${k}:\\s*`), "").replace(/^["']|["']$/g, "").trim();
  };
  const hasDate = lines.some((l) => /^date:\s*/.test(l));
  const srcPub = get("source_published");
  let dirty = false;

  // 1) date 추가
  if (!hasDate) {
    let date = "";
    if (srcPub && /^\d{4}-\d{2}-\d{2}/.test(srcPub)) date = srcPub.slice(0, 10);
    if (!date) date = gitDate(path);
    if (!date) date = TODAY;
    const idx = lines.findIndex((l) => /^layout:\s*/.test(l));
    const insertAt = idx >= 0 ? idx + 1 : 0;
    lines.splice(insertAt, 0, `date: ${date}`);
    dirty = true;
  }

  // 2) title/short_title 이모지 제거
  for (const key of ["title", "short_title"]) {
    const li = lines.findIndex((l) => new RegExp(`^${key}:\\s*`).test(l));
    if (li < 0) continue;
    const rawVal = lines[li].replace(new RegExp(`^${key}:\\s*`), "");
    const quoted = /^".*"$/.test(rawVal.trim());
    const val = rawVal.trim().replace(/^["']|["']$/g, "");
    const stripped = stripLeadEmoji(val);
    if (stripped !== val) {
      lines[li] = `${key}: ${quoted ? `"${stripped}"` : stripped}`;
      dirty = true;
    }
  }

  if (dirty) {
    changed++;
    if (CHECK) {
      console.log(`~ ${f}`);
    } else {
      writeFileSync(path, raw.replace(m[0], `---\n${lines.join("\n")}\n---`), "utf8");
    }
  }
}

console.log(`${CHECK ? "(check) " : ""}변경 ${changed} / 전체 ${files.length}`);
