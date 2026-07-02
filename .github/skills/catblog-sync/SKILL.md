---
name: catblog-sync
description: The Custom Engine(microsoft/mcscatblog) 공개 블로그의 신규 글을 한글로 번역해 Agent_Blog 의 catblog 챕터(_chapters/catblog*.md)로 게시한다. USE WHEN "CAT 블로그 업데이트", CAT 블로그 신규 글 번역·게시, incoming 스테이징 글을 번역, catblog 메뉴에 글 추가가 필요할 때. 키워드 catblog, CAT 블로그, mcscatblog, The Custom Engine, 번역 게시, incoming, state.json, 원문 출처.
---

# catblog-sync — CAT 블로그 신규 글 한글 번역·게시 스킬

공개 블로그 **The Custom Engine**(microsoft/mcscatblog)의 신규 글을 한글로 번역해
`Agent_Blog/_chapters/catblog*.md` 챕터로 게시한다. 사이드바 메뉴 **"CAT 블로그 업데이트"**
(`category: catblog`)에 노출된다.

> **역할 분담**: 감지·스테이징·이미지 다운로드는 자동(`fetch.mjs` + `catblog-sync.yml`).
> 번역은 두 방식으로 수행할 수 있다:
> - **A 방식(완전 자동, 현재 기본)**: 워크플로가 신규 글을 main 에 스테이징한 뒤
>   `assign-copilot.mjs` 로 번역 이슈를 만들어 **Copilot coding agent(copilot-swe-agent)**
>   에게 할당 → Copilot 이 번역 PR 을 자동 생성.
> - **B 방식(반자동)**: 사람이 VS Code 에서 이 스킬을 호출해 incoming 글을 직접 번역.
>   A 가 실패하거나 수동 보정이 필요할 때 사용.

## 언제 쓰나
- "catblog-sync 로 신규 글 번역해줘"
- "CAT 블로그 최신 글 한글로 올려줘"
- 워크플로가 연 PR(`auto/catblog-incoming`)의 incoming 글을 번역할 때

## 구성 (산출물 위치)
- 감지·스테이징·이미지 다운로드: `tools/catblog-sync/fetch.mjs` (Node 18+, 의존성 없음)
- Copilot 위임(A): `tools/catblog-sync/assign-copilot.mjs` — 번역 이슈 생성 + Copilot 할당
- 상태(진실원천): `tools/catblog-sync/state.json` — 이미 게시한 slug 목록
- 스테이징: `tools/catblog-sync/incoming/<slug>.md`(원문 EN) + `incoming/_manifest.json`(메타·이미지)
- 감지·위임 워크플로: `.github/workflows/catblog-sync.yml` (cron 감지 → main 커밋 → Copilot 이슈)
- 게시물: `_chapters/catblogNN-<slug>.md` (`category: catblog`)
- 원문 이미지: `assets/catblog/<slug>/`

## 전체 흐름

```
mcscatblog feed.xml ──cron──▶ fetch.mjs (신규 감지) ──▶ incoming/<slug>.md (EN) + PR
                                                              │  ← 이 스킬(Copilot 번역)
                                                              ▼
                          _chapters/catblogNN-<slug>.md (KO) + state.json 갱신 + incoming 제거
                                                              │  사람 검수 merge
                                                              ▼
                                          Deploy Jekyll site to Pages → 블로그 반영
```

## 워크플로 (스킬 실행 순서)

### 1) 신규 글 확인 / 스테이징
```pwsh
cd "c:/Users/chiwonchoi/OneDrive - Microsoft/Develop/chichoi1991/Agent_Blog"
node tools/catblog-sync/fetch.mjs --check     # 신규 목록만(드라이런)
node tools/catblog-sync/fetch.mjs             # incoming/ 에 원문 스테이징
```
- 워크플로 PR(`auto/catblog-incoming`)을 받은 경우 이미 `incoming/*.md` 가 있다 → 바로 2)로.

### 2) 번역 (Copilot 이 각 incoming 글을 처리)
`incoming/_manifest.json` 의 각 item 에 대해:
1. `incoming/<slug>.md` 원문을 읽는다(원문 frontmatter 에 title·date·author·categories 있음).
2. **order 번호 할당**: 기존 `_chapters/catblog*.md` 를 스캔해 최대 `order`+1 (없으면 1).
3. `_chapters/catblogNN-<slug>.md` 생성 — 아래 **출력 규칙** 준수.
4. 번역 완료 후 `incoming/<slug>.md` 를 삭제하고 `state.json` 의 `processed` 에 `<slug>` 추가.
5. 처리한 item 을 `incoming/_manifest.json` 에서 제거(또는 status 를 `published` 로).

### 3) 빌드 검증 (필수)
```pwsh
bundle exec jekyll build
```
- `_chapters/catblog*.md` 가 모두 생성됐는지, 리터럴 `**`/`##` 누출 0 확인.
- ⚠️ 서버를 끈 뒤 `_site` 삭제 후 빌드(파일 잠금 → 스타일 깨짐 방지).

### 4) 반영
- 로컬 작업이면 커밋·푸시 → `Deploy Jekyll site to Pages` 자동 배포.
- 워크플로 PR 브랜치면 같은 브랜치에 push → PR 검수 merge.

## 출력 규칙 (_chapters/catblogNN-<slug>.md)

### frontmatter (원문 출처·원저자 필수)
```yaml
---
layout: "chapter"
title: "<한글 번역 제목>"
short_title: "<사이드바용 짧은 제목>"
description: "<한글 요약 1문장>"
order: <숫자>
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/<slug>/"
source_author: "<원저자 — 원문 author 그대로>"
source_published: "<YYYY-MM-DD>"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/<slug>/"
---
```
- `order` 는 **숫자**로(문자열이면 Liquid `sort` 가 10<2 로 깨짐).
- `source_url`·`source_author`·`source_published` 는 `_manifest.json`/원문 frontmatter 값 사용.

### 본문 최상단 — 원문 안내 콜아웃 (필수)
frontmatter 바로 다음, 본문 맨 위에 삽입:
```markdown
<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)
(Microsoft Copilot Studio CAT)의 <원저자>(@<author>) 원문
[<원문 제목>](<source_url>)(<YYYY-MM-DD>)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>
```

### 본문 번역 규칙
- 원문의 `## 제목` 섹션 구조·표·코드블록·순서를 유지한 채 **자연스러운 한국어**로 번역.
- 원문 frontmatter(`layout: post` 등)와 Jekyll 전용 태그는 **본문에서 제거**한다:
  - `{: .shadow }`, `{: .prompt-warning }`, `{: .text-center }` 등 Chirpy kramdown IAL → 제거.
  - **이미지**: `fetch.mjs` 가 원문 이미지를 `assets/catblog/<slug>/<file>` 로 이미 내려받아
    `_manifest.json` 의 `images[]`(`{ src, local }`)에 기록해 둔다. 각 이미지는 기존 컨벤션대로
    `<figure class="screenshot">` 로 삽입하고 캡션(`_..._`)은 `<figcaption>` 으로 한글 번역:
    ```html
    <figure class="screenshot">
      <img src="{{ '/assets/catblog/<slug>/<file>.png' | relative_url }}" alt="<한글 alt>" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
      <figcaption><한글 캡션></figcaption>
    </figure>
    ```
    `_manifest.json` 에 해당 이미지가 없으면(다운로드 실패) `> 🖼️ (원문 이미지: <원문 링크>)` 로 대체.
  - `{% post_url YYYY-MM-DD-slug %}` 링크 → 해당 원문 절대 URL(`https://microsoft.github.io/mcscatblog/posts/<slug>/`)로 치환.
- `mermaid` 코드블록: 그대로 두면 렌더 안 됨 → **ASCII 다이어그램으로 재작도**하거나
  핵심을 한글 설명 + 표로 대체(newcs-sync 규칙과 동일).
- 고유명사(Copilot Studio, Skill, MCP, orchestrator 등)는 원어 유지하되 첫 등장 시 병기 가능.
- 코드·명령·경로·JSON 키는 번역하지 않는다.

## state.json / incoming 규칙
- `state.json` `processed` 에 slug 가 있으면 `fetch.mjs` 가 **다시 감지하지 않는다** → 게시 완료 시 반드시 추가.
- 번역이 끝난 `incoming/<slug>.md` 는 삭제. 남겨두면 다음 PR 에 계속 따라온다.
- 재번역이 필요하면 `state.json` 에서 slug 제거 후 `fetch.mjs` 재실행.

## 함정 / 주의
- **원저자·출처 누락 금지** — frontmatter + 상단 콜아웃 둘 다 필수(조직 내부 공개 게시 정책).
- **order 충돌**: 새 글은 항상 기존 최대 order+1. 수동으로 재정렬 시 전 챕터 order 재계산.
- **slug 파일명**: `_posts` 날짜-slug 규칙. raw 404 나면 published 날짜와 `_posts` 파일명이
  다른 경우 → `fetch.mjs` 의 날짜(`published`)를 실제 `_posts` 날짜로 맞춰 재시도.
- **빌드 스타일 깨짐**: 서버 끄고 → `_site` 삭제 → 빌드 순서 엄수.
- **CRLF/BOM**: 원문이 CRLF 여도 무방하나, 생성 파일은 LF 로 저장 권장.
