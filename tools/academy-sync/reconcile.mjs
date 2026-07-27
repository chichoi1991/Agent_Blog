// academy-sync/reconcile.mjs — 번역 PR 머지 후 master 에서 상태파일을 정리한다.
//
// B 방식(공유 상태파일 분리):
//   Copilot 번역 PR 은 `_chapters/academy-<slug>.md` (번역본)만 생성한다.
//   PR 이 머지되면(= _chapters/academy-*.md 가 master 에 push) 이 스크립트가 master 에서 단독으로
//     1) state.json 의 processed 에 "<src_path>": "<sha>" 추가
//     2) _manifest.json 에서 해당 항목 제거
//     3) incoming/<slug>.md 삭제
//   를 수행한다. 상태파일 쓰기 주체를 master 하나로 만들어(브랜치가 안 건드림)
//   매일 도는 academy-sync 스케줄 커밋과의 write-write 충돌을 원천 제거한다.
//
// 게시 판정: manifest item 의 slug 에 대응하는 `_chapters/academy-<slug>.md` 가 존재하면 "번역 완료"로 본다.
//
// 의존성 없음(Node 18+).
//
//   node tools/academy-sync/reconcile.mjs            # 정리 수행
//   node tools/academy-sync/reconcile.mjs --dry-run  # 변경 없이 대상만 출력

import { readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const INCOMING = join(HERE, "incoming");
const MANIFEST_PATH = join(INCOMING, "_manifest.json");
const STATE_PATH = join(HERE, "state.json");
const CHAPTERS = join(HERE, "..", "..", "_chapters"); // Agent_Blog/_chapters/academy-<slug>.md

const DRY = process.argv.includes("--dry-run");

function loadJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  try { return JSON.parse(readFileSync(path, "utf8")); } catch { return fallback; }
}

function main() {
  const manifest = loadJson(MANIFEST_PATH, { items: [] });
  const state = loadJson(STATE_PATH, { processed: {} });
  if (!state.processed) state.processed = {};

  const items = manifest.items || [];
  if (items.length === 0) { console.log("manifest 비어있음 — 정리할 항목 없음."); return; }

  const remaining = [];
  const finalized = [];
  for (const it of items) {
    const chapter = join(CHAPTERS, `academy-${it.slug}.md`);
    if (existsSync(chapter)) {
      // 번역본이 master 에 게시됨 → 상태 확정
      if (it.src_path && it.sha) state.processed[it.src_path] = it.sha;
      const inc = join(INCOMING, `${it.slug}.md`);
      if (existsSync(inc) && !DRY) rmSync(inc);
      finalized.push(it.slug);
    } else {
      remaining.push(it); // 아직 미번역 — manifest 유지
    }
  }

  if (finalized.length === 0) { console.log("게시 확인된 항목 없음 — 변경 없음."); return; }

  manifest.items = remaining;
  if (!DRY) {
    writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf8");
    writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n", "utf8");
  }
  console.log(`reconcile ${DRY ? "(dry-run) " : ""}완료: 확정 ${finalized.length}건 [${finalized.join(", ")}], 대기 ${remaining.length}건.`);
}

main();
