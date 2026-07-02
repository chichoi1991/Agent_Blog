// catblog-sync/fetch.mjs — CAT 블로그(The Custom Engine) 신규 글 감지·스테이징
//
// 공개 repo microsoft/mcscatblog 의 Atom 피드(feed.xml)를 읽어, 아직 처리하지 않은
// (state.json 에 없는) 신규 글의 원문 Markdown 을 GitHub raw 에서 받아
// tools/catblog-sync/incoming/<slug>.md 로 스테이징하고 _manifest.json 을 갱신한다.
//
// 번역은 이 스크립트가 하지 않는다 — VS Code 의 `catblog-sync` 스킬(GitHub Copilot)이
// incoming/*.md 를 읽어 한글 챕터(_chapters/catblog*.md)로 번역·생성하고,
// 처리한 slug 를 state.json 에 추가한 뒤 incoming 파일을 제거한다.
//
// 의존성 없음(Node 18+ 전역 fetch 사용).
//
//   node tools/catblog-sync/fetch.mjs --check     # 드라이런(신규 목록만)
//   node tools/catblog-sync/fetch.mjs             # 신규 글 원문 스테이징
//   node tools/catblog-sync/fetch.mjs --limit 3   # 최신 신규 N건만

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const INCOMING = join(HERE, "incoming");
const STATE_PATH = join(HERE, "state.json");
const MANIFEST_PATH = join(INCOMING, "_manifest.json");
const ASSETS_BASE = join(HERE, "..", "..", "assets", "catblog"); // Agent_Blog/assets/catblog/<slug>/

const FEED_URL = "https://microsoft.github.io/mcscatblog/feed.xml";
const SITE_BASE = "https://microsoft.github.io/mcscatblog";
const RAW_BASE = "https://raw.githubusercontent.com/microsoft/mcscatblog/main/_posts";
const POST_BASE = "https://microsoft.github.io/mcscatblog/posts";

const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const limitIdx = args.indexOf("--limit");
const LIMIT = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : Infinity;

function decodeXml(s) {
  return (s || "")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&").trim();
}

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decodeXml(m[1]) : "";
}

function parseFeed(xml) {
  const entries = [];
  const re = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const b = m[1];
    const linkM = b.match(/<link[^>]*href="([^"]+)"[^>]*rel="alternate"|<link[^>]*rel="alternate"[^>]*href="([^"]+)"/i);
    const link = decodeXml(linkM ? linkM[1] || linkM[2] : "");
    const slugM = link.match(/\/posts\/([^/]+)\/?$/);
    const slug = slugM ? slugM[1] : "";
    const published = tag(b, "published");
    const cats = [...b.matchAll(/<category[^>]*term="([^"]+)"/g)].map((c) => c[1]);
    entries.push({
      slug,
      title: tag(b, "title"),
      link,
      published,
      updated: tag(b, "updated"),
      author: tag(b, "name"),
      categories: cats,
      summary: tag(b, "summary").replace(/\s+/g, " "),
    });
  }
  return entries.filter((e) => e.slug);
}

function loadState() {
  if (!existsSync(STATE_PATH)) return { processed: [] };
  try {
    return JSON.parse(readFileSync(STATE_PATH, "utf8"));
  } catch {
    return { processed: [] };
  }
}

function stagedSlugs() {
  if (!existsSync(INCOMING)) return new Set();
  return new Set(
    readdirSync(INCOMING)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""))
  );
}

async function rawMarkdown(slug, published) {
  // _posts 파일명 = YYYY-MM-DD-<slug>.md (date 프론트매터 = published)
  const date = (published || "").slice(0, 10);
  const url = `${RAW_BASE}/${date}-${slug}.md`;
  const res = await fetch(url);
  if (res.ok) return { url, text: await res.text() };
  return { url, text: null, status: res.status };
}

// 원문 MD 에서 참조하는 이미지 경로를 추출한다.
// - 인라인: ![alt](/assets/posts/<slug>/<file>.png){: .shadow }
// - 헤더:   frontmatter image.path: /assets/posts/<slug>/header.png
function extractImagePaths(md) {
  const paths = new Set();
  for (const m of md.matchAll(/!\[[^\]]*\]\((\/assets\/[^)\s]+)\)/g)) paths.add(m[1]);
  for (const m of md.matchAll(/^\s*path:\s*(\/assets\/[^\s]+)\s*$/gm)) paths.add(m[1]);
  return [...paths];
}

// 원문 이미지를 Agent_Blog/assets/catblog/<slug>/<file> 로 내려받는다.
// 반환: [{ src: 원문경로, local: "assets/catblog/<slug>/<file>" }]
async function downloadImages(slug, md) {
  const refs = extractImagePaths(md);
  if (refs.length === 0) return [];
  const outDir = join(ASSETS_BASE, slug);
  mkdirSync(outDir, { recursive: true });
  const mapped = [];
  for (const src of refs) {
    const file = src.split("/").pop();
    const res = await fetch(`${SITE_BASE}${src}`);
    if (!res.ok) {
      console.warn(`::warning::이미지 다운로드 실패(${res.status}) ${SITE_BASE}${src} — 건너뜀`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(outDir, file), buf);
    mapped.push({ src, local: `assets/catblog/${slug}/${file}` });
    console.log(`    🖼️ ${file}`);
  }
  return mapped;
}

async function main() {
  const res = await fetch(FEED_URL);
  if (!res.ok) {
    console.error(`::error::피드 요청 실패 ${res.status} ${FEED_URL}`);
    process.exit(1);
  }
  const feed = await res.text();
  const entries = parseFeed(feed);

  const state = loadState();
  const done = new Set(state.processed || []);
  const staged = stagedSlugs();

  const fresh = entries.filter((e) => !done.has(e.slug) && !staged.has(e.slug)).slice(0, LIMIT);

  if (fresh.length === 0) {
    console.log("신규 글 없음 — 최신 상태입니다.");
    return;
  }

  console.log(`신규 글 ${fresh.length}건 발견:`);
  for (const e of fresh) console.log(`  • [${e.published?.slice(0, 10)}] ${e.title} (${e.slug}) — @${e.author}`);

  if (CHECK) {
    console.log("\n(--check) 드라이런 — 다운로드하지 않았습니다.");
    return;
  }

  mkdirSync(INCOMING, { recursive: true });
  const manifest = existsSync(MANIFEST_PATH)
    ? JSON.parse(readFileSync(MANIFEST_PATH, "utf8"))
    : { items: [] };

  for (const e of fresh) {
    const { url, text, status } = await rawMarkdown(e.slug, e.published);
    if (!text) {
      console.warn(`::warning::원문 MD 다운로드 실패(${status}) ${url} — 건너뜀`);
      continue;
    }
    writeFileSync(join(INCOMING, `${e.slug}.md`), text, "utf8");
    const images = await downloadImages(e.slug, text);
    manifest.items = manifest.items.filter((it) => it.slug !== e.slug);
    manifest.items.push({
      slug: e.slug,
      title: e.title,
      source_url: `${POST_BASE}/${e.slug}/`,
      source_author: e.author,
      source_published: e.published?.slice(0, 10) || "",
      source_updated: e.updated?.slice(0, 10) || "",
      categories: e.categories,
      summary: e.summary,
      raw_url: url,
      images,
      staged_at: new Date().toISOString(),
      status: "pending-translation",
    });
    console.log(`  ↓ staged incoming/${e.slug}.md${images.length ? ` (+이미지 ${images.length})` : ""}`);
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`\n스테이징 완료 → tools/catblog-sync/incoming/  (총 대기 ${manifest.items.length}건)`);
}

main().catch((err) => {
  console.error(`::error::${err.message}`);
  process.exit(1);
});
