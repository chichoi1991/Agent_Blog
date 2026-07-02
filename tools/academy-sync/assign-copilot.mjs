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

  const body = `Agent Academy(microsoft/agent-academy)의 **${p.parentTitle}** 코스/랩 페이지를 한글로 번역해 게시해줘.

## 대상 (원문 EN 은 \`tools/academy-sync/incoming/<slug>.md\` 에 스테이징됨)
${list}

## 계층 구조
- 카테고리: \`${p.category}\` · parent: \`${p.parent}\` (\`${p.parentShort}\`)
- **부모 랜딩 페이지**가 없으면 하나 생성: \`_chapters/academy-${p.parent}.md\`
  - frontmatter: \`category: ${p.category}\`, \`parent: "${p.parent}"\`, \`is_parent: true\`, \`order: ${p.parentOrder}\`, \`short_title: "${p.parentShort}"\`, \`title\`(한글), \`description\`(한글).
  - 본문: 코스/랩 소개 + 모듈 목록.
- 각 모듈: \`_chapters/academy-<slug>.md\` (\`parent: "${p.parent}"\`, \`is_parent\` 없음, \`order\`=manifest의 order).

## 작업 지침
반드시 \`.github/skills/academy-sync/SKILL.md\` 규칙을 따를 것. 각 대상마다:
1. \`tools/academy-sync/incoming/<slug>.md\` 원문을 읽는다.
2. \`_chapters/academy-<slug>.md\` 생성(자연스러운 한국어).
   - frontmatter **원문 출처·원저자 필수**: \`source_url\`, \`source_author\`, \`source_blog\`, \`source_published\`, \`canonical_url\`, \`category\`, \`parent\`, \`order\`.
   - 본문 최상단에 "원문 번역 게시물" 콜아웃(원문 링크 명시).
   - **VitePress 정리**: \`> [!TIP]\`/\`[!INFO]\`/\`[!WARNING]\` → 블로그 콜아웃(\`<div class="info-box note" markdown="1">\`)로 변환. \`<mission-meta />\`·\`<analytics-tag .../>\` 등 커스텀 컴포넌트 제거. 제목 앵커 \`{#...}\` 제거. 상대 링크(\`../02-.../index.md\`)는 제거하거나 원문 절대 URL로.
   - 이미지는 이미 \`assets/academy/<slug>/\` 에 다운로드됨(manifest의 images 참조). 기존 컨벤션대로 \`<figure class="screenshot"><img src="{{ '/assets/academy/<slug>/<file>' | relative_url }}" ...><figcaption>...</figcaption></figure>\` 로 삽입.
3. \`tools/academy-sync/state.json\` 의 \`processed\` 에 \`"<src_path>": "<sha>"\` 추가(manifest 값 사용).
4. 번역한 \`incoming/<slug>.md\` 삭제 + \`_manifest.json\` 에서 항목 제거.

완료되면 이 이슈를 참조하는 PR 을 열어줘.`;
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

  const botId = await copilotBotId();
  for (const p of parents) {
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
