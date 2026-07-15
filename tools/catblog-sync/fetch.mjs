// catblog-sync/fetch.mjs — CAT 블로그(The Custom Engine) 신규 글 감지·스테이징
//
// 공개 repo microsoft/mcscatblog 의 sitemap.xml(라이브 전수 목록)을 읽어, 기준일(CUTOFF)
// 이후 발행 & 아직 처리하지 않은(state.json 에 없는) 신규 글의 원문 Markdown 을 GitHub raw
// 에서 받아 tools/catblog-sync/incoming/<slug>.md 로 스테이징하고 _manifest.json 을 갱신한다.
// (제목/저자/요약 등 메타데이터는 feed.xml → 없으면 포스트 HTML 로 보강)
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
const SITEMAP_URL = "https://microsoft.github.io/mcscatblog/sitemap.xml";
const SITE_BASE = "https://microsoft.github.io/mcscatblog";
const RAW_BASE = "https://raw.githubusercontent.com/microsoft/mcscatblog/main/_posts";
const CONTENTS_API = "https://api.github.com/repos/microsoft/mcscatblog/contents/_posts?ref=main";
const POST_BASE = "https://microsoft.github.io/mcscatblog/posts";

// 기준일(컷오프): 이 날짜(포함) 이후 발행 글만 번역·게시한다. 이전 백로그는 무시.
// 환경변수 CATBLOG_CUTOFF 로 재정의 가능(YYYY-MM-DD).
const CUTOFF_DATE = process.env.CATBLOG_CUTOFF || "2026-07-01";

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

// sitemap.xml → 라이브 전체 글 목록 [{ slug, loc, lastmod }]
function parseSitemap(xml) {
  const out = [];
  const re = /<url>([\s\S]*?)<\/url>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const b = m[1];
    const loc = tag(b, "loc");
    const sm = loc.match(/\/posts\/([^/]+)\/?$/);
    if (!sm) continue;
    out.push({ slug: sm[1], loc, lastmod: tag(b, "lastmod") });
  }
  return out;
}

// feed 에 없는 후보의 메타데이터를 포스트 HTML(<meta>)에서 보강한다.
async function fetchPostMeta(slug) {
  const url = `${POST_BASE}/${slug}/`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const html = await res.text();
    const meta = (prop, attr = "property") => {
      const m =
        html.match(new RegExp(`<meta[^>]*${attr}=["']${prop}["'][^>]*content=["']([^"']*)["']`, "i")) ||
        html.match(new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${prop}["']`, "i"));
      return m ? decodeXml(m[1]) : "";
    };
    return {
      title: meta("og:title") || (html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "").trim(),
      author: meta("author", "name") || meta("article:author") || "The Custom Engine Team",
      published: meta("article:published_time"),
      summary: meta("og:description") || meta("description", "name"),
      categories: [],
    };
  } catch {
    return null;
  }
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
  // 폴백: _posts 파일명 날짜가 published 와 다를 수 있으므로 slug 로 조회한다.
  const idx = await postsIndex();
  const hit = idx.get(slug);
  if (hit) {
    const r2 = await fetch(hit);
    if (r2.ok) return { url: hit, text: await r2.text() };
  }
  return { url, text: null, status: res.status };
}

// _posts 디렉터리 목록을 1회 로드해 slug → download_url 맵을 만든다(파일명 날짜 무관).
let _postsIndex = null;
async function postsIndex() {
  if (_postsIndex) return _postsIndex;
  _postsIndex = new Map();
  const res = await fetch(CONTENTS_API);
  if (!res.ok) {
    console.warn(`::warning::_posts 목록 조회 실패(${res.status}) — slug 폴백 불가`);
    return _postsIndex;
  }
  for (const f of await res.json()) {
    const m = (f.name || "").match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
    if (m && f.download_url) _postsIndex.set(m[1], f.download_url);
  }
  return _postsIndex;
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
  // 1) 라이브 전체 글 목록: sitemap.xml (feed 5개 창 대신 전수)
  const smRes = await fetch(SITEMAP_URL);
  if (!smRes.ok) {
    console.error(`::error::sitemap 요청 실패 ${smRes.status} ${SITEMAP_URL}`);
    process.exit(1);
  }
  const posts = parseSitemap(await smRes.text());

  // 2) 최신 메타데이터(제목/저자/요약): feed.xml (최근 창) → slug 맵
  let feedMap = new Map();
  try {
    const fRes = await fetch(FEED_URL);
    if (fRes.ok) feedMap = new Map(parseFeed(await fRes.text()).map((e) => [e.slug, e]));
  } catch {
    /* feed 없어도 sitemap 기반으로 진행 */
  }

  const state = loadState();
  const done = new Set(state.processed || []);
  const staged = stagedSlugs();
  const cutoff = new Date(`${CUTOFF_DATE}T00:00:00Z`);

  // 3) 컷오프(포함) 이후 & 미처리 & 미스테이징 후보 (최신순)
  const candidates = posts
    .filter((p) => p.lastmod && new Date(p.lastmod) >= cutoff)
    .filter((p) => !done.has(p.slug) && !staged.has(p.slug))
    .sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod))
    .slice(0, LIMIT);

  console.log(`sitemap 총 ${posts.length}건 · 컷오프(${CUTOFF_DATE}) 이후 신규 후보 ${candidates.length}건`);

  if (candidates.length === 0) {
    console.log("신규 글 없음 — 최신 상태입니다.");
    return;
  }

  // 4) 후보별 메타데이터 확정 (feed 우선, 없으면 HTML 보강)
  const fresh = [];
  for (const p of candidates) {
    const meta = feedMap.get(p.slug) || (await fetchPostMeta(p.slug)) || {};
    const published = (meta.published || p.lastmod || "").slice(0, 10);
    fresh.push({
      slug: p.slug,
      title: meta.title || p.slug,
      author: meta.author || "The Custom Engine Team",
      published,
      // raw 파일명(YYYY-MM-DD-slug.md) 용 날짜: feed published → 없으면 sitemap lastmod
      dateForFile: (meta.published || p.lastmod || "").slice(0, 10),
      updated: (p.lastmod || "").slice(0, 10),
      categories: meta.categories || [],
      summary: (meta.summary || "").replace(/\s+/g, " "),
    });
  }

  console.log(`신규 글 ${fresh.length}건 발견:`);
  for (const e of fresh) console.log(`  • [${e.published}] ${e.title} (${e.slug}) — @${e.author}`);

  if (CHECK) {
    console.log("\n(--check) 드라이런 — 다운로드하지 않았습니다.");
    return;
  }

  mkdirSync(INCOMING, { recursive: true });
  const manifest = existsSync(MANIFEST_PATH)
    ? JSON.parse(readFileSync(MANIFEST_PATH, "utf8"))
    : { items: [] };

  for (const e of fresh) {
    const { url, text, status } = await rawMarkdown(e.slug, e.dateForFile);
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
      source_published: e.published || "",
      source_updated: e.updated || "",
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
