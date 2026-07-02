// catblog-sync/assign-copilot.mjs — 스테이징된 CAT 글 번역 작업을 Copilot coding agent
// (copilot-swe-agent)에게 위임하는 이슈를 생성·할당한다. (A 방식 완전 자동화)
//
// incoming/_manifest.json 의 pending 항목을 읽어 번역 지침 이슈를 만들고,
// 그 이슈를 Copilot 봇에게 할당한다. Copilot 이 번역 PR 을 자동 생성한다.
//
// 필요 env:
//   - GH_TOKEN 또는 GITHUB_TOKEN : issues:write + Copilot 할당 가능한 토큰
//       (기본 GITHUB_TOKEN 으로 Copilot 할당이 안 되면 PAT 을 CATBLOG_AGENT_TOKEN 으로)
//   - GITHUB_REPOSITORY : "owner/repo" (Actions 자동 제공, 로컬은 미지정 시 아래 기본값)
//
//   node tools/catblog-sync/assign-copilot.mjs           # 이슈 생성 + Copilot 할당
//   node tools/catblog-sync/assign-copilot.mjs --dry-run  # 만들 이슈 내용만 출력

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const MANIFEST_PATH = join(HERE, "incoming", "_manifest.json");

const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const REPO = process.env.GITHUB_REPOSITORY || "chichoi1991/Agent_Blog";
const [OWNER, NAME] = REPO.split("/");
const DRY = process.argv.includes("--dry-run");
const API = "https://api.github.com";

function pendingItems() {
  if (!existsSync(MANIFEST_PATH)) return [];
  const m = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  return (m.items || []).filter((it) => it.status !== "published");
}

function buildIssue(items) {
  const title = `CAT 블로그 번역: ${items.length}건 (${new Date().toISOString().slice(0, 10)})`;
  const list = items
    .map(
      (it) =>
        `- [ ] \`${it.slug}\` — [${it.title}](${it.source_url}) · @${it.source_author} · ${it.source_published}` +
        (it.images?.length ? ` · 이미지 ${it.images.length}` : "")
    )
    .join("\n");

  const body = `The Custom Engine(microsoft/mcscatblog)에서 감지된 신규 글을 한글로 번역해 게시해줘.

## 대상 (원문 EN 은 \`tools/catblog-sync/incoming/<slug>.md\` 에 스테이징됨)
${list}

## 작업 지침
반드시 \`.github/skills/catblog-sync/SKILL.md\` 의 규칙을 따를 것. 각 대상마다:

1. \`tools/catblog-sync/incoming/<slug>.md\` 원문을 읽는다.
2. 기존 \`_chapters/catblog*.md\` 의 최대 \`order\`+1 로 order 를 부여한다.
3. \`_chapters/catblog<order>-<slug>.md\` 를 생성한다 (자연스러운 한국어).
   - frontmatter 에 \`category: catblog\`, **원문 출처·원저자 필수**:
     \`source_url\`, \`source_author\`, \`source_published\`, \`source_blog\`, \`canonical_url\`.
   - 본문 최상단에 "원문 번역 게시물" 콜아웃(원저자·원문 링크 명시).
   - 이미지는 이미 \`assets/catblog/<slug>/\` 에 다운로드돼 있음. 기존 컨벤션대로
     \`<figure class="screenshot"><img src="{{ '/assets/catblog/<slug>/<file>' | relative_url }}" ...><figcaption>...</figcaption></figure>\` 로 삽입.
   - \`mermaid\` 코드블록은 ASCII 다이어그램 또는 표로 재작도. Chirpy IAL(\`{: .shadow }\` 등) 제거.
4. \`tools/catblog-sync/state.json\` 의 \`processed\` 에 \`<slug>\` 추가.
5. 번역 완료한 \`tools/catblog-sync/incoming/<slug>.md\` 를 삭제하고, \`_manifest.json\` 에서도 해당 항목 제거.

완료되면 이 이슈를 참조하는 PR 을 열어줘. 사람 검수 후 merge 하면 GitHub Pages 로 자동 배포된다.`;

  return { title, body };
}

async function gh(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`${init.method || "GET"} ${path} → ${res.status} ${await res.text()}`);
  return res.json();
}

async function graphql(query, variables) {
  const res = await fetch(`${API}/graphql`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const j = await res.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors));
  return j.data;
}

async function copilotBotId() {
  const data = await graphql(
    `query ($o: String!, $n: String!) {
      repository(owner: $o, name: $n) {
        suggestedActors(capabilities: [CAN_BE_ASSIGNED], first: 50) {
          nodes { login __typename ... on Bot { id } ... on User { id } }
        }
      }
    }`,
    { o: OWNER, n: NAME }
  );
  const node = data.repository.suggestedActors.nodes.find((x) => x.login === "copilot-swe-agent");
  if (!node) throw new Error("copilot-swe-agent 를 할당 가능한 액터에서 찾지 못함 — 저장소/조직에서 Copilot coding agent 를 활성화하세요.");
  return node.id;
}

async function main() {
  const items = pendingItems();
  if (items.length === 0) {
    console.log("대기 중인 번역 항목 없음 (_manifest.json).");
    return;
  }
  const { title, body } = buildIssue(items);

  if (DRY || !TOKEN) {
    if (!TOKEN) console.log("※ GH_TOKEN/GITHUB_TOKEN 미설정 — 드라이런으로 출력만 합니다.\n");
    console.log(`# ${title}\n\n${body}`);
    return;
  }

  const botId = await copilotBotId();
  const issue = await gh(`/repos/${OWNER}/${NAME}/issues`, {
    method: "POST",
    body: JSON.stringify({ title, body, labels: ["automated", "catblog-sync"] }),
  });
  console.log(`이슈 생성: #${issue.number} ${issue.html_url}`);

  await graphql(
    `mutation ($a: ID!, $ids: [ID!]!) {
      replaceActorsForAssignable(input: { assignableId: $a, actorIds: $ids }) {
        assignable { ... on Issue { number } }
      }
    }`,
    { a: issue.node_id, ids: [botId] }
  );
  console.log(`→ Copilot(copilot-swe-agent) 할당 완료. Copilot 이 번역 PR 을 생성합니다.`);
}

main().catch((err) => {
  console.error(`::error::${err.message}`);
  process.exit(1);
});
