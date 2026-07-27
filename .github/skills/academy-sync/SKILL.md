---
name: academy-sync
description: Agent Academy(microsoft/agent-academy)의 코스(recruit/operative/commander)·랩(special-ops) 페이지를 한글로 번역해 Agent_Blog 의 academy 계층 챕터(_chapters/academy-*.md)로 게시한다. USE WHEN "Agent Academy 번역", 코스/랩 신규·변경 페이지 번역, academy incoming 스테이징 글을 번역, academy-courses/academy-labs 메뉴에 글 추가가 필요할 때. 키워드 agent academy, academy-sync, recruit, operative, special-ops, VitePress, 번역 게시, incoming, 원문 출처.
---

# academy-sync — Agent Academy 코스·랩 한글 번역·게시 스킬

공개 repo **microsoft/agent-academy**(MIT)의 코스·랩 페이지를 한글로 번역해
`Agent_Blog/_chapters/academy-*.md` 계층 챕터로 게시한다. 사이드바 메뉴 **🎓 Agent Academy · 코스**
(`category: academy-courses`)와 **🎯 Agent Academy · 랩**(`category: academy-labs`)에 노출된다.

> **역할 분담(A 방식 기본)**: 감지·스테이징·이미지 다운로드는 자동(`fetch.mjs` + `academy-sync.yml`).
> 번역은 Copilot coding agent 위임(`assign-copilot.mjs`) 또는 VS Code 에서 이 스킬로 직접 수행.

## 구성
- 소스 설정: `tools/academy-sync/sources.json` (repo·섹션·parent·category)
- 감지·이미지: `tools/academy-sync/fetch.mjs` (git tree + blob sha 로 신규/변경 감지)
- 상태: `tools/academy-sync/state.json` — `processed: { "<src_path>": "<sha>" }`
- 스테이징: `tools/academy-sync/incoming/<slug>.md` + `incoming/_manifest.json`
- Copilot 위임: `tools/academy-sync/assign-copilot.mjs` (parent/랭크별 이슈)
- 머지 후 정리: `tools/academy-sync/reconcile.mjs` (state.json 갱신·manifest 항목 제거·incoming 삭제, master 단독)
- 워크플로: `.github/workflows/academy-sync.yml`(감지·위임), `.github/workflows/academy-reconcile.yml`(머지 후 정리)
- 게시물: `_chapters/academy-<slug>.md` + 부모 랜딩 `_chapters/academy-<parent>.md`
- 이미지: `assets/academy/<slug>/`

## 전체 흐름
```
git tree(agent-academy) ──fetch.mjs(sha 비교)──▶ incoming/<slug>.md(EN)+이미지 ──main 커밋──▶
   assign-copilot.mjs(랭크별 이슈) ──▶ Copilot 번역 PR(_chapters/*.md 만) ──사람 검수 merge──▶
   reconcile.mjs(state/manifest/incoming 정리, master) ──▶ Pages 배포
```

## 워크플로 (스킬 실행 순서)
### 1) 감지 / 스테이징
```pwsh
cd "c:/Users/chiwonchoi/OneDrive - Microsoft/Develop/chichoi1991/Agent_Blog"
node tools/academy-sync/fetch.mjs --category academy-courses --check   # 코스 신규/변경 목록
node tools/academy-sync/fetch.mjs --category academy-courses           # 코스 스테이징
node tools/academy-sync/fetch.mjs --section special-ops                # 랩만
```
### 2) 번역 (Copilot 또는 직접)
`incoming/_manifest.json` 의 각 item 에 대해:
1. `incoming/<slug>.md` 원문을 읽는다.
2. 부모 랜딩(`_chapters/academy-<parent>.md`)이 없으면 생성(`is_parent: true`).
3. `_chapters/academy-<slug>.md` 생성 — 아래 **출력 규칙** 준수.

> **⚠️ 상태파일은 건드리지 않는다(B 방식).** 번역 작업(특히 Copilot PR)은 **`_chapters/academy-*.md` 생성까지만** 한다.
> `state.json` 갱신 · `_manifest.json` 항목 제거 · `incoming/<slug>.md` 삭제는 **머지 후 master 에서 `reconcile.mjs` 가 자동 수행**한다.
> PR 브랜치가 `state.json`/`_manifest.json`/`incoming/` 을 수정하면 매일 도는 `academy-sync` 스케줄 커밋과 충돌하므로 금지.
### 3) 빌드 검증 → 반영 (catblog 와 동일; 서버 끄고 `_site` 삭제 후 `bundle exec jekyll build`)

## 출력 규칙 (_chapters/academy-<slug>.md)
### frontmatter (원문 출처·원저자 필수)
```yaml
---
layout: "chapter"
title: "<한글 제목>"
short_title: "<사이드바 짧은 제목>"
description: "<한글 요약>"
order: <숫자 = manifest.order>
category: "academy-courses"      # 또는 academy-labs
parent: "<manifest.parent>"      # 예: arecruit
source_url: "<manifest.source_url>"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "<YYYY-MM-DD>"
canonical_url: "<manifest.source_url>"
---
```
- 부모 랜딩(`academy-<parent>.md`)에는 위 대신 `is_parent: true`, `order: <parentOrder>`, `short_title: <parentShort>` 을 넣고 출처 필드는 생략 가능.

### 본문 최상단 — 원문 안내 콜아웃 (필수)
```markdown
<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [<원문 제목>](<source_url>)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>
```

### VitePress 정리 규칙 (중요 — CAT/Chirpy 와 다름)
- **알림(alert)**: `> [!TIP]` / `> [!INFO]` / `> [!WARNING]` / `> [!NOTE]` / `> [!IMPORTANT]` →
  블로그 콜아웃 `<div class="info-box note" markdown="1"> ... </div>` 로 변환(제목은 볼드로).
- **커스텀 컴포넌트 제거**: `<mission-meta />`, `<analytics-tag ... />`, `<mission-card ...>`,
  `<ActionButton .../>`, `<DownloadFiles .../>` 등 → 제거하거나 의미를 텍스트/링크로 대체.
  다운로드 컴포넌트는 원문 다운로드 링크로 대체.
- **제목 앵커**: `## 제목 {#anchor}` → `## 제목` (앵커 제거).
- **상대 링크**: `[..](../02-.../index.md)` / `/recruit/02-...` → 제거하거나 원문 절대 URL
  (`https://microsoft.github.io/agent-academy/<section>/<module>/`)로 치환. 챕터 간 링크가 필요하면
  블로그 챕터 URL(`/chapters/academy-<slug>/`)로.
- **이미지**: manifest.images 의 `local` 경로를 `<figure class="screenshot"><img src="{{ '/assets/academy/<slug>/<file>' | relative_url }}" alt="..." loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>...</figcaption></figure>` 로 삽입. manifest 에 없으면 `> 🖼️ (원문 이미지: <source_url>)`.
- **frontmatter(prev/next 등)·`<script setup>`·`:::` 컨테이너**: 블로그에 맞게 제거/변환.
- 코드·명령·경로·JSON·번호목록은 유지. 고유명사(Copilot Studio, MCP, Dataverse 등)는 원어 유지.

## state.json / 감지 규칙
- `processed["<src_path>"]` 값이 tree 의 blob sha 와 **같으면** fetch 가 건너뛴다.
  원문이 갱신되면 sha 가 바뀌어 다시 감지된다 → 재번역 대상.
- **`processed` 갱신은 사람/Copilot 이 하지 않는다.** 번역 PR 이 master 로 머지되면
  `reconcile.mjs`(`academy-reconcile.yml`)가 `_chapters/academy-<slug>.md` 존재를 근거로
  `processed` 에 `"<src_path>": "<sha>"`(manifest 값)를 추가하고 manifest 항목·incoming 파일을 정리한다.
- 재번역이 필요하면 해당 키를 state 에서 제거 후 fetch 재실행.

## 함정 / 주의
- **원저자·출처 누락 금지**(frontmatter + 상단 콜아웃).
- **계층**: 각 랭크(recruit/operative/…)마다 부모 랜딩 1개 + 모듈 자식들. `parent` 값 일치 필수.
- **order**: 숫자(모듈 번호). 부모 랜딩은 `parentOrder`(랭크 순서).
- **commander** 는 현재 섹션 루트 index.md 뿐(모듈 없음) → 감지 대상 0. 모듈이 추가되면 자동 감지.
- **이미지 상대경로**: 원문은 `./images/..`(모듈 로컬). fetch 가 이미 `assets/academy/<slug>/` 로 평탄화해 저장.
- **빌드 스타일 깨짐**: 서버 끄고 → `_site` 삭제 → 빌드 순서 엄수.
