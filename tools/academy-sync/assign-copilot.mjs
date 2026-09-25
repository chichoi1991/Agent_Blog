// academy-sync/assign-copilot.mjs — 스테이징된 Agent Academy 페이지 번역을
// Copilot coding agent(copilot-swe-agent)에게 위임한다. (A 방식 완전 자동화)
//
// incoming/_manifest.json 의 pending 항목을 **parent(랭크/섹션)별로 묶어** 이슈를 만들고,
// 각 이슈를 Copilot 봇에게 할당한다. 랭크당 1 PR 이 나와 검수가 수월하다.
//
// 필요 env:
//   - GH_TOKEN 또는 GITHUB_TOKEN : issues:write + Copilot 할당 가능한 토큰
//   - GITHUB_REPOSITORY : "owner/repo" (Actions 자동 제공, 로컬은 기본값 사용)
//
//   node tools/academy-sync/assign-copilot.mjs             # parent별 이슈 생성 + Copilot 할당
//   node tools/academy-sync/assign-copilot.mjs --dry-run    # 만들 이슈만 출력
//   node tools/academy-sync/assign-copilot.mjs --parent arecruit  # 특정 parent만

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const MANIFEST_PATH = join(HERE, "incoming", "_manifest.json");

const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const REPO = process.env.GITHUB_REPOSITORY || "chichoi1991/Agent_Blog";
const [OWNER, NAME] = REPO.split("/");
const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const pIdx = args.indexOf("--parent");
const ONLY_PARENT = pIdx >= 0 ? args[pIdx + 1] : null;
const API = "https://api.github.com";

function pendingByParent() {
  if (!existsSync(MANIFEST_PATH)) return {};
  const m = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  const groups = {};
  for (const it of m.items || []) {
    if (it.status === "published") continue;
    if (ONLY_PARENT && it.parent !== ONLY_PARENT) continue;
    (groups[it.parent] ||= []).push(it);
  }
  for (const k of Object.keys(groups)) groups[k].sort((a, b) => a.order - b.order);
  return groups;
}

function buildIssue(items) {
  const p = items[0];
  const title = `Agent Academy 번역: ${p.parentTitle} (${items.length}개 페이지)`;
  const list = items
    .map((it) => `- [ ] \`${it.slug}\` (order ${it.order}) — [${it.title}](${it.source_url})` +
      (it.images?.length ? ` · 이미지 ${it.images.length}` : ""))
    .join("\n");

  const body = `Agent Academy(microsoft/agent-academy)의 **${p.parentTitle}** 코스/랩 페이지를 **한국어판과 영문판 두 벌**로 게시해줘.

## 대상 (원문 EN 은 \`tools/academy-sync/incoming/<slug>.md\` 에 스테이징됨)
${list}

## 계층 구조
- 카테고리: \`${p.category}\` · parent: \`${p.parent}\` (\`${p.parentShort}\`)
- **부모 랜딩 페이지**가 없으면 한/영 둘 다 생성: \`_chapters/academy-${p.parent}.md\`, \`_chapters_en/academy-${p.parent}.md\`
  - frontmatter: \`category: ${p.category}\`, \`parent: "${p.parent}"\`, \`is_parent: true\`, \`order: ${p.parentOrder}\`, \`short_title: "${p.parentShort}"\`, \`title\`, \`description\`. 영문판에는 \`lang: en\` 추가.
  - 본문: 코스/랩 소개 + 모듈 목록.
- 각 모듈: \`_chapters/academy-<slug>.md\` + \`_chapters_en/academy-<slug>.md\` (\`parent: "${p.parent}"\`, \`is_parent\` 없음, \`order\`=manifest의 order).

## 작업 지침
반드시 \`.github/skills/academy-sync/SKILL.md\` 규칙을 따를 것. 각 대상마다:
1. \`tools/academy-sync/incoming/<slug>.md\` 원문을 읽는다.
2. \`_chapters/academy-<slug>.md\` 생성(자연스러운 한국어).
   - frontmatter **원문 출처·원저자 필수**: \`source_url\`, \`source_author\`, \`source_blog\`, \`source_published\`, \`canonical_url\`, \`category\`, \`parent\`, \`order\`.
   - 본문 최상단에 "원문 번역 게시물" 콜아웃(원문 링크 명시).
   - **VitePress 정리**: \`> [!TIP]\`/\`[!INFO]\`/\`[!WARNING]\` → 블로그 콜아웃(\`<div class="info-box note" markdown="1">\`)로 변환. \`<mission-meta />\`·\`<analytics-tag .../>\` 등 커스텀 컴포넌트 제거. 제목 앵커 \`{#...}\` 제거. 상대 링크(\`../02-.../index.md\`)는 제거하거나 원문 절대 URL로.
   - 이미지는 이미 \`assets/academy/<slug>/\` 에 다운로드됨(manifest의 images 참조). 기존 컨벤션대로 \`<figure class="screenshot"><img src="{{ '/assets/academy/<slug>/<file>' | relative_url }}" ...><figcaption>...</figcaption></figure>\` 로 삽입.
3. **\`_chapters_en/academy-<slug>.md\` 생성(영어, 파일명은 한국어판과 완전히 동일).**
   - 한국어판을 되옮기지 말고 **원문(EN)을 그대로 살려** 작성한다. VitePress 정리 규칙은 동일하게 적용.
   - frontmatter 에 \`lang: en\` 필수. \`order\`·\`category\`·\`parent\`·\`is_parent\`·\`source_*\` 는 한국어판과 **동일한 값**.
     (하나라도 어긋나면 한/영 사이드바 계층·정렬이 달라진다.)
   - 본문 최상단 콜아웃은 영문으로:
     \`**Translated article** — This article is based on [<원문 제목>](<source_url>) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.\`
   - 이미지는 한국어판과 **같은 \`assets/academy/<slug>/\` 경로**를 쓰고 \`alt\`·\`figcaption\` 만 영문으로.
   - 사이트 내부 링크는 \`/en\` 접두사: \`/chapters/academy-<slug>/\` → \`/en/chapters/academy-<slug>/\` (슬러그 자체는 변경 금지).
4. \`node tools/i18n/check-parity.mjs\` 로 한/영 짝을 확인한다.

> ⚠️ **이 PR 은 \`_chapters/academy-*.md\` 와 \`_chapters_en/academy-*.md\` (번역본)만 생성/수정한다.**
> \`tools/academy-sync/state.json\`, \`incoming/_manifest.json\`, \`incoming/<slug>.md\` 는 **절대 수정·삭제하지 마.**
> 이 파일들은 매일 도는 \`academy-sync\` 스케줄이 master 에서 갱신하므로, PR 이 건드리면 충돌한다.
> 상태 반영(state 갱신·manifest 항목 제거·incoming 삭제)은 **머지 후 \`reconcile.mjs\` 가 master 에서 자동 수행**한다.

> ⚠️ **한 벌만 만들면 안 된다.** \`_chapters/\` 와 \`_chapters_en/\` 에 **같은 파일명**으로 둘 다 있어야
> 언어 토글이 동작하고 \`i18n-parity\` 체크가 통과한다.

완료되면 이 이슈를 참조하는 PR 을 열어줘.

<!-- academy-parent:${p.parent} -->`;
  return { title, body };
}

async function gh(path, init = {}) {
  const res = await fetch(`${API}${path}`, { ...init, headers: {
    Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json", ...(init.headers || {}),
  }});
  if (!res.ok) throw new Error(`${init.method || "GET"} ${path} → ${res.status} ${await res.text()}`);
  return res.json();
}
async function graphql(query, variables) {
  const res = await fetch(`${API}/graphql`, { method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }) });
  const j = await res.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors));
  return j.data;
}
async function copilotBotId() {
  const data = await graphql(
    `query ($o: String!, $n: String!) { repository(owner: $o, name: $n) {
      suggestedActors(capabilities: [CAN_BE_ASSIGNED], first: 50) {
        nodes { login __typename ... on Bot { id } ... on User { id } } } } }`,
    { o: OWNER, n: NAME });
  const node = data.repository.suggestedActors.nodes.find((x) => x.login === "copilot-swe-agent");
  if (!node) throw new Error("copilot-swe-agent 를 찾지 못함 — Copilot coding agent 활성화 필요.");
  return node.id;
}

// parent 당 이미 열린 이슈가 있으면 중복 생성하지 않도록, 열린 academy-sync 이슈들이 커버하는
// parent 집합을 구한다. (body 의 <!-- academy-parent:xxx --> 마커 우선, 없으면 제목 접두 매칭으로 폴백)
async function openCoveredParents(parentTitleByParent) {
  const issues = await gh(`/repos/${OWNER}/${NAME}/issues?state=open&labels=academy-sync&per_page=100`);
  const covered = new Set();
  for (const it of Array.isArray(issues) ? issues : []) {
    if (it.pull_request) continue; // PR 제외(이슈만)
    const m = (it.body || "").match(/<!--\s*academy-parent:([\w-]+)\s*-->/);
    if (m) covered.add(m[1]);
    for (const [parent, ptitle] of Object.entries(parentTitleByParent)) {
      if ((it.title || "").startsWith(`Agent Academy 번역: ${ptitle} (`)) covered.add(parent);
    }
  }
  return covered;
}

async function main() {
  const groups = pendingByParent();
  const parents = Object.keys(groups);
  if (parents.length === 0) { console.log("대기 중인 번역 항목 없음."); return; }

  if (DRY || !TOKEN) {
    if (!TOKEN) console.log("※ GH_TOKEN 미설정 — 드라이런 출력만.\n");
    for (const p of parents) {
      const { title, body } = buildIssue(groups[p]);
      console.log(`\n===== [${p}] =====\n# ${title}\n\n${body}`);
    }
    return;
  }

  const parentTitleByParent = Object.fromEntries(parents.map((p) => [p, groups[p][0].parentTitle]));
  const covered = await openCoveredParents(parentTitleByParent);
  const botId = await copilotBotId();
  for (const p of parents) {
    if (covered.has(p)) { console.log(`이미 열린 이슈 존재 — [${p}] 건너뜀(중복 방지).`); continue; }
    const { title, body } = buildIssue(groups[p]);
    const issue = await gh(`/repos/${OWNER}/${NAME}/issues`, {
      method: "POST", body: JSON.stringify({ title, body, labels: ["automated", "academy-sync"] }) });
    await graphql(
      `mutation ($a: ID!, $ids: [ID!]!) { replaceActorsForAssignable(input: { assignableId: $a, actorIds: $ids }) { assignable { ... on Issue { number } } } }`,
      { a: issue.node_id, ids: [botId] });
    console.log(`이슈 #${issue.number} 생성 + Copilot 할당 [${p}] → ${issue.html_url}`);
  }
}

main().catch((err) => { console.error(`::error::${err.message}`); process.exit(1); });
