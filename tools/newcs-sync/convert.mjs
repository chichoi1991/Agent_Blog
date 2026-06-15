#!/usr/bin/env node
/*
 * newcs-sync — 소스 1·2·3부 MD를 Agent_Blog 의 newcs 계층 챕터(_chapters/newcs*.md)로
 * 결정적(deterministic) 변환한다. AI 판단이 필요 없는 기계적 변환만 수행한다:
 *   - 부모 랜딩 + 하위 챕터 분할(mapping.json 기준)
 *   - frontmatter 주입(layout/category/parent/is_parent/order/short_title/description)
 *   - "> **▶ 포인트:**" 블록인용 → note 콜아웃(div.info-box)
 *   - "MS" → "Microsoft" (단어 경계)
 *   - 닫는 강조(**·*) 뒤 한글 조사 앞 공백 제거
 *   - 스크린샷 ![..](images/N_M.png) → <figure class="screenshot"> (3부)
 *   - ```mermaid 블록 제거(렌더 깨짐 방지)
 *   - scrub.deny 정규식 라인 제거(옵션, 기본 비어 있음)
 *
 * 사용:
 *   node convert.mjs --source <소스폴더> [--out <_chapters>] [--check]
 *   SOURCE_DIR 환경변수로 --source 대체 가능.
 *   --check: 파일을 쓰지 않고 생성 결과만 보고(드라이런).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---- args ----
const args = process.argv.slice(2);
const getArg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const sourceDir = getArg('--source') || process.env.SOURCE_DIR;
const outDir = getArg('--out') || path.resolve(__dirname, '../../_chapters');
const dryRun = args.includes('--check') || args.includes('--dry-run');

if (!sourceDir) {
  console.error('ERROR: --source <소스폴더> 또는 SOURCE_DIR 환경변수가 필요합니다.');
  process.exit(2);
}

const mapping = JSON.parse(fs.readFileSync(path.join(__dirname, 'mapping.json'), 'utf8'));

// ---- text transforms ----
const PARTICLES = ['하세요', '합니다', '입니다', '이며', '이고', '으로', '로', '가', '이', '를', '을', '은', '는', '와', '과', '에', '의', '도'];
const particleAlt = PARTICLES.join('|');
const RE_PARTICLE_SPACE = new RegExp('(\\S)(\\*{1,2}) (?=(' + particleAlt + ')([\\s.,)\\]·]|$))', 'g');
const RE_MS = /(?<![A-Za-z])MS(?![A-Za-z])/g;

function applyScrub(text, scrub) {
  let t = text;
  // rename pairs (e.g. MS -> Microsoft) — word-boundary aware for MS
  for (const [from, to] of scrub.rename || []) {
    if (from === 'MS') t = t.replace(RE_MS, to);
    else t = t.split(from).join(to);
  }
  // deny regex lines removed (optional; default none)
  for (const pat of scrub.deny || []) {
    const re = new RegExp(pat, 'i');
    t = t.split('\n').filter((ln) => !re.test(ln)).join('\n');
  }
  // particle spacing after emphasis
  t = t.replace(RE_PARTICLE_SPACE, '$1$2');
  return t;
}

// "> **▶ 포인트:** ..." 블록인용 → note 콜아웃
function pointBlockquoteToCallout(body) {
  const lines = body.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^>\s*\*\*▶\s*포인트/.test(lines[i])) {
      // collect contiguous blockquote lines
      const buf = [];
      while (i < lines.length && /^>/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      i--; // step back; for-loop will ++
      let inner = buf.join('\n').trim();
      inner = inner.replace(/^\*\*▶\s*포인트:?\*\*\s*[—-]?\s*/, '**▶ 포인트** — ');
      out.push('<div class="info-box note" markdown="1">');
      out.push(inner);
      out.push('</div>');
    } else {
      out.push(lines[i]);
    }
  }
  return out.join('\n');
}

// ![alt](images/3_1.png) → figure.screenshot
function imagesToFigures(body) {
  return body.replace(/!\[([^\]]*)\]\(images\/([A-Za-z0-9_-]+)\.png\)/g, (_m, alt, id) => {
    const caption = String(alt).replace(/^\s*\d+_\d+[.\s]*/, '').trim() || id;
    return [
      '<figure class="screenshot">',
      `  <img src="{{ '/assets/newcs/${id}.png' | relative_url }}" alt="${caption}" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">`,
      `  <figcaption>${caption}</figcaption>`,
      '</figure>'
    ].join('\n');
  });
}

// remove ```mermaid fenced blocks (won't render in kramdown)
function stripMermaid(body) {
  return body.replace(/```mermaid[\s\S]*?```/g, '> _(다이어그램은 이미지/ASCII로 대체 예정)_');
}

function transformBody(body, scrub) {
  let t = body;
  t = pointBlockquoteToCallout(t);
  t = imagesToFigures(t);
  t = stripMermaid(t);
  t = applyScrub(t, scrub);
  return t.trim();
}

// ---- source section parser: split by "## " level-2 headings ----
function parseSections(md) {
  const lines = md.split('\n');
  const sections = []; // { num: int|null, name: string, heading: string, body: string[] }
  let cur = null;
  let inFence = false;
  for (const ln of lines) {
    // Numbered '## N.' headings are always real sections (never inside code),
    // so re-sync fence parity to avoid drops from unbalanced source fences.
    if (/^##\s+\d+\./.test(ln)) inFence = false;
    else if (/^```/.test(ln)) inFence = !inFence;
    const m = !inFence && ln.match(/^##\s+(.*)$/);
    if (m) {
      if (cur) sections.push(cur);
      const title = m[1].trim();
      const nm = title.match(/^(\d+)\.\s*/);
      cur = {
        num: nm ? parseInt(nm[1], 10) : null,
        name: title,
        heading: '## ' + title,
        body: []
      };
    } else if (cur) {
      cur.body.push(ln);
    }
  }
  if (cur) sections.push(cur);
  return sections;
}

function getNumbered(sections, idx) {
  return sections.find((s) => s.num === idx);
}
function getNamed(sections, namePrefix) {
  return sections.find((s) => s.num === null && s.name.startsWith(namePrefix));
}

function sectionMarkdown(sec) {
  return [sec.heading, ...sec.body].join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function fm(obj) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (typeof v === 'boolean') lines.push(`${k}: ${v}`);
    else if (typeof v === 'number') lines.push(`${k}: ${v}`);
    else lines.push(`${k}: ${JSON.stringify(String(v))}`);
  }
  lines.push('---');
  return lines.join('\n');
}

// ---- generate ----
const results = [];

for (const part of mapping.parts) {
  const srcPath = path.join(sourceDir, part.source);
  if (!fs.existsSync(srcPath)) {
    console.error(`WARN: source not found, skipping part ${part.part}: ${srcPath}`);
    continue;
  }
  const raw = fs.readFileSync(srcPath, 'utf8');
  const md = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const sections = parseSections(md);

  // ---- parent landing ----
  const tableRows = part.children
    .map((c) => `| ${c.order} | [${c.short}]({{ '/chapters/${c.slug}/' | relative_url }}) | ${c.question || ''} |`)
    .join('\n');

  let landingBody = '';
  landingBody += `<div class="info-box note" markdown="1">\n**▶ ${part.part}부 한 줄 요약** — ${part.summary}\n</div>\n\n`;
  landingBody += `> ⚠️ 이 문서의 기능·화면·일정은 모두 프리뷰 기준이며 변경될 수 있습니다(subject to change).\n\n---\n\n`;
  // optional folded intro section(s) (e.g. "0. 들어가며 / 목표")
  for (const idx of part.parentSections || []) {
    const sec = getNumbered(sections, idx);
    if (sec) landingBody += transformBody(sectionMarkdown(sec), mapping.scrub) + '\n\n---\n\n';
  }
  landingBody += `## 이 부에서 다루는 내용\n\n| # | 주제 | 핵심 |\n|---|---|---|\n${tableRows}\n\n> 순서대로 읽으면 자연스럽게 이어집니다. 필요한 주제부터 펼쳐 보셔도 됩니다.`;

  const parentFm = fm({
    layout: 'chapter',
    title: part.parentTitle,
    short_title: part.parentShort,
    description: part.parentDesc,
    order: part.part,
    category: mapping.category,
    parent: part.group,
    is_parent: true
  });
  results.push({ slug: part.parentSlug, content: parentFm + '\n\n' + landingBody + '\n' });

  // ---- children ----
  for (const child of part.children) {
    const blocks = [];
    for (const idx of child.sections) {
      const sec = getNumbered(sections, idx);
      if (sec) blocks.push(transformBody(sectionMarkdown(sec), mapping.scrub));
      else console.error(`WARN: part ${part.part} section ${idx} not found for ${child.slug}`);
    }
    for (const nm of child.appendSections || []) {
      const sec = getNamed(sections, nm);
      if (sec) blocks.push(transformBody(sectionMarkdown(sec), mapping.scrub));
    }
    const childFm = fm({
      layout: 'chapter',
      title: child.title,
      short_title: child.short,
      description: child.desc,
      order: child.order,
      category: mapping.category,
      parent: part.group
    });
    results.push({ slug: child.slug, content: childFm + '\n\n' + blocks.join('\n\n---\n\n') + '\n' });
  }
}

// ---- write ----
if (dryRun) {
  console.log(`[dry-run] would write ${results.length} files to ${outDir}:`);
  for (const r of results) console.log('  ' + r.slug + '.md  (' + r.content.length + ' bytes)');
} else {
  fs.mkdirSync(outDir, { recursive: true });
  const written = new Set(results.map((r) => r.slug + '.md'));
  // --clean (default on): remove orphan generated chapter files so renamed/removed
  // slugs don't linger. Only touches files matching a part's slug prefix (e.g. newcs3-*),
  // never the hand-written overview (newcs0-*) or unrelated chapters.
  if (!args.includes('--no-clean')) {
    const prefixes = mapping.parts.map((p) => p.parentSlug.replace(/-.*$/, '') + '-'); // e.g. "newcs3-"
    const keep = new Set([...written, ...mapping.parts.map((p) => p.parentSlug + '.md')]);
    for (const f of fs.readdirSync(outDir)) {
      if (!f.endsWith('.md')) continue;
      const isGenerated = prefixes.some((pre) => f.startsWith(pre)) && /^newcs\d+-\d+-/.test(f);
      if (isGenerated && !keep.has(f)) {
        fs.rmSync(path.join(outDir, f));
        console.log('  [clean] removed orphan ' + f);
      }
    }
  }
  for (const r of results) {
    fs.writeFileSync(path.join(outDir, r.slug + '.md'), r.content, 'utf8');
  }
  console.log(`[newcs-sync] wrote ${results.length} files to ${outDir}`);
}

