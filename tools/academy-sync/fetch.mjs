// academy-sync/fetch.mjs — Agent Academy(microsoft/agent-academy) 코스·랩 신규/변경 감지·스테이징
//
// 공개 repo 의 git tree 를 읽어 docs/<section>/**/index.md 를 열거하고, state.json 의
// blob sha 와 비교해 신규/변경된 페이지의 원문 Markdown·이미지를 스테이징한다.
// (Agent Academy 는 RSS 피드가 없어 tree+sha 로 변경을 감지한다.)
//
// 번역은 이 스크립트가 하지 않는다 — academy-sync 스킬(Copilot)이 incoming/*.md 를
// 계층 챕터(_chapters/academy-*.md)로 번역·생성하고, state.json 을 갱신한다.
//
// 의존성 없음(Node 18+ 전역 fetch).
//
//   node tools/academy-sync/fetch.mjs --check                  # 드라이런(신규/변경 목록만)
//   node tools/academy-sync/fetch.mjs --category academy-courses  # 코스만 스테이징
//   node tools/academy-sync/fetch.mjs --section recruit        # 특정 섹션만
//   node tools/academy-sync/fetch.mjs                          # 전체 스테이징

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, posix } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const INCOMING = join(HERE, "incoming");
const STATE_PATH = join(HERE, "state.json");
const SOURCES_PATH = join(HERE, "sources.json");
const MANIFEST_PATH = join(INCOMING, "_manifest.json");
const ASSETS_BASE = join(HERE, "..", "..", "assets", "academy"); // Agent_Blog/assets/academy/<slug>/

const cfg = JSON.parse(readFileSync(SOURCES_PATH, "utf8"));
const RAW = (p) => `https://raw.githubusercontent.com/${cfg.repo}/${cfg.branch}/${p}`;
const TREE_API = `https://api.github.com/repos/${cfg.repo}/git/trees/${cfg.branch}?recursive=1`;

// 무인증 GitHub API 는 IP당 60회/시간(러너 공용 IP 공유) 제한이라 간헐적 403 을 유발한다.
// GITHUB_TOKEN(또는 GH_TOKEN)이 있으면 인증해 5,000회/시간으로 올린다.
const GH_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const catIdx = args.indexOf("--category");
const CATEGORY = catIdx >= 0 ? args[catIdx + 1] : null;
const secIdx = args.indexOf("--section");
const SECTION = secIdx >= 0 ? args[secIdx + 1] : null;

function loadState() {
  if (!existsSync(STATE_PATH)) return { processed: {} };
  try { return JSON.parse(readFileSync(STATE_PATH, "utf8")); } catch { return { processed: {} }; }
}

function stagedSlugs() {
  if (!existsSync(INCOMING)) return new Set();
  return new Set(readdirSync(INCOMING).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")));
}

function activeSections() {
  return cfg.sections.filter(
    (s) => (!CATEGORY || s.category === CATEGORY) && (!SECTION || s.path === SECTION)
  );
}

// git tree 에서 docs/<section>/**/index.md 블롭을 찾는다.
async function treeEntries() {
  const res = await fetch(TREE_API, {
    headers: {
      "User-Agent": "academy-sync",
      Accept: "application/vnd.github+json",
      ...(GH_TOKEN ? { Authorization: `Bearer ${GH_TOKEN}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`git tree 조회 실패 ${res.status} ${TREE_API}`);
  const j = await res.json();
  if (j.truncated) console.warn("::warning::git tree 가 truncated 됨 — 일부 페이지가 누락될 수 있습니다.");
  return j.tree || [];
}

function moduleTitle(md) {
  const m = md.match(/^#\s+(.+?)\s*(\{#[^}]*\})?\s*$/m);
  return m ? m[1].trim() : "";
}
function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  const fm = {};
  if (m) for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-z0-9-]+):\s*(.+?)\s*$/i);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return fm;
}

function extractImageRefs(md) {
  const refs = new Set();
  for (const m of md.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) refs.add(m[1]);
  for (const m of md.matchAll(/<img[^>]*\ssrc=["']([^"']+)["']/gi)) refs.add(m[1]);
  return [...refs].filter((r) => !/^https?:\/\//i.test(r) && !r.startsWith("data:"));
}

// md 경로 기준으로 이미지 소스 repo 경로를 해석한다.
function resolveRepoPath(mdDir, ref) {
  const clean = ref.split("#")[0].split("?")[0];
  if (clean.startsWith("/")) return posix.normalize(`${cfg.docsBase}/public${clean}`);
  return posix.normalize(posix.join(mdDir, clean));
}

async function downloadImages(slug, mdDir, md) {
  const refs = extractImageRefs(md);
  if (refs.length === 0) return [];
  const outDir = join(ASSETS_BASE, slug);
  const mapped = [];
  for (const ref of refs) {
    const repoPath = resolveRepoPath(mdDir, ref);
    const res = await fetch(RAW(repoPath));
    if (!res.ok) { console.warn(`::warning::이미지 실패(${res.status}) ${repoPath} — 건너뜀`); continue; }
    mkdirSync(outDir, { recursive: true });
    const file = repoPath.split("/").pop();
    writeFileSync(join(outDir, file), Buffer.from(await res.arrayBuffer()));
    mapped.push({ src: ref, local: `assets/academy/${slug}/${file}` });
    console.log(`      🖼️ ${file}`);
  }
  return mapped;
}

async function main() {
  const sections = activeSections();
  if (sections.length === 0) { console.log("대상 섹션 없음(필터 확인)."); return; }

  const tree = await treeEntries();
  const state = loadState();
  const done = state.processed || {};
  const staged = stagedSlugs();

  // 감지: 각 섹션의 docs/<section>/<module...>/index.md (섹션 루트 index.md 제외)
  const found = [];
  for (const sec of sections) {
    const prefix = `${cfg.docsBase}/${sec.path}/`;
    for (const e of tree) {
      if (e.type !== "blob") continue;
      if (!e.path.startsWith(prefix) || !e.path.endsWith("/index.md")) continue;
      const after = e.path.slice(prefix.length);
      if (after === "index.md") continue; // 섹션 루트 index.md 제외(코스 랜딩은 별도 생성)
      const rel = after.replace(/\/index\.md$/, ""); // 모듈 경로
      const srcRel = `${sec.path}/${rel}`; // state 키 (docs 기준)
      const slug = `${sec.path}-${rel}`.replace(/\//g, "-");
      const mNum = rel.match(/^(\d+)/);
      found.push({ sec, srcRel, slug, mdRepoPath: e.path, mdDir: posix.dirname(e.path), sha: e.sha,
        order: mNum ? parseInt(mNum[1], 10) : 999 });
    }
  }

  const fresh = found.filter((f) => done[f.srcRel] !== f.sha && !staged.has(f.slug));
  if (fresh.length === 0) { console.log("신규/변경 페이지 없음 — 최신 상태입니다."); return; }

  console.log(`신규/변경 ${fresh.length}건:`);
  for (const f of fresh) console.log(`  • [${f.sec.path}] ${f.srcRel} → ${f.slug}`);
  if (CHECK) { console.log("\n(--check) 드라이런 — 다운로드하지 않았습니다."); return; }

  mkdirSync(INCOMING, { recursive: true });
  const manifest = existsSync(MANIFEST_PATH) ? JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) : { items: [] };

  for (const f of fresh) {
    const res = await fetch(RAW(f.mdRepoPath));
    if (!res.ok) { console.warn(`::warning::원문 MD 실패(${res.status}) ${f.mdRepoPath} — 건너뜀`); continue; }
    const md = await res.text();
    writeFileSync(join(INCOMING, `${f.slug}.md`), md, "utf8");
    const images = await downloadImages(f.slug, f.mdDir, md);
    const fm = frontmatter(md);
    manifest.items = manifest.items.filter((it) => it.slug !== f.slug);
    manifest.items.push({
      slug: f.slug,
      src_path: f.srcRel,
      sha: f.sha,
      title: moduleTitle(md),
      description: fm["short-description"] || "",
      category: f.sec.category,
      parent: f.sec.parent,
      parentTitle: f.sec.parentTitle,
      parentShort: f.sec.parentShort,
      parentOrder: f.sec.order,
      order: f.order,
      source_url: `${cfg.siteBase}/${f.srcRel}/`,
      source_author: cfg.source_author,
      source_blog: cfg.source_blog,
      source_published: fm["last-edited-date"] || fm["created-date"] || "",
      images,
      staged_at: new Date().toISOString(),
      status: "pending-translation",
    });
    console.log(`  ↓ staged incoming/${f.slug}.md${images.length ? ` (+이미지 ${images.length})` : ""}`);
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`\n스테이징 완료 → tools/academy-sync/incoming/  (총 대기 ${manifest.items.length}건)`);
}

main().catch((err) => { console.error(`::error::${err.message}`); process.exit(1); });
