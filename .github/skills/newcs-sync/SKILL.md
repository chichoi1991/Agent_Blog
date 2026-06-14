---
name: newcs-sync
description: New Copilot Studio_업데이트 소스 repo 의 1·2·3부 MD를 Agent_Blog 의 newcs 계층 챕터(_chapters/newcs*.md)로 변환·반영한다. USE WHEN 1·2·3부 원고가 갱신/푸시되어 블로그에 같은 구조로 추가·갱신해야 할 때, 챕터 분할 매핑을 바꿀 때, 변환 자동화를 점검/실행할 때. 키워드 newcs, 블로그 동기화, 챕터 변환, 부 분할, mapping.json, repository_dispatch, 발행, promote, _wip.
---

# newcs-sync — 소스 MD → 블로그 newcs 챕터 변환 스킬

콘텐츠 허브 repo `blog-content` 의 `projects/new-copilot-studio/` 1·2·3부 Markdown을 블로그
`Agent_Blog/_chapters/newcs*.md`(부모 랜딩 + 하위 챕터 계층)로 변환·반영한다.
**결정적 변환(CLI)** 으로 골격을 만들고, 필요하면 **AI 후처리**로 표현을 다듬는다.

> 소스 구조: `blog-content`(private 허브) → `projects/<프로젝트>/` 폴더마다 `blog-sync.json`
> 으로 발행 대상·파이프라인을 선언. 이 스킬은 `pipeline: newcs-sync` 프로젝트를 처리한다.

## 언제 쓰나
- "1부 원고를 고쳤는데 블로그에 반영해줘"
- "3부에 섹션을 추가했으니 하위 챕터로 쪼개줘"
- "소스가 푸시되면 블로그에 자동으로 PR 올라오게 해줘"
- mapping.json 분할 규칙을 바꿀 때 / 자동화 파이프라인을 점검할 때

## 구성 (산출물 위치)
- 변환기: `Agent_Blog/tools/newcs-sync/convert.mjs` (Node 18+, 의존성 없음)
- 매핑: `Agent_Blog/tools/newcs-sync/mapping.json` (부→하위챕터 구조 = 단일 진실원천)
- 수신 워크플로: `Agent_Blog/.github/workflows/newcs-sync.yml` (변환→PR, source_path 수용)
- 송신 워크플로: 허브 repo `.github/workflows/sync-to-blog.yml` (변경 프로젝트 감지→dispatch)
- 발행 설정: 허브 `projects/<프로젝트>/blog-sync.json` (blogRepo/pipeline/target)
- 스테이징: 허브 `projects/<프로젝트>/_wip/`(로컬 전용) + 루트 `promote.ps1`(승격)

## 전체 흐름

```
projects/<P>/_wip/ 초안 ──promote.ps1──▶ projects/<P>/ 발행본 ──git push──▶ sync-to-blog.yml
                                                                       │ (blog-sync.json 읽어)
                                                                       ▼ repository_dispatch(blog-content-updated)
                                       Agent_Blog newcs-sync.yml (변환기 실행 → PR)
                                                                       │ 사람 검수 merge
                                                                       ▼
                                       Deploy Jekyll site to Pages → 블로그 반영
```

## 워크플로 (스킬 실행 순서)

### A) 로컬에서 수동 변환 (가장 단순 — 자동화 미설정 시/검증용)
```vm
node tools/newcs-sync/convert.mjs --source "C:/Users/chiwonchoi/OneDrive - Microsoft/Develop/chichoi1991/blog-content/projects/new-copilot-studio" --check
```
- `--check` 로 먼저 드라이런(생성 목록·크기 확인). 이상 없으면 `--check` 빼고 실제 생성.
- 출력 후 **AI 후처리(선택)**: Mermaid→ASCII 재작도, 캡션 의역, 어색한 표현 다듬기.
- 빌드 검증 → 커밋·푸시(아래 C·D).

### B) 자동(권장): 소스 푸시 → 블로그 PR
1. 허브 repo 에서 `projects/<P>/_wip/` 초안 완성 → (허브 루트) `pwsh promote.ps1 -Project <P> -Part N -Commit` → `git push`.
2. 허브 `sync-to-blog.yml` 이 변경 프로젝트 감지·`blog-sync.json` 을 읽어 `repository_dispatch(blog-content-updated)` 를 대상 블로그로 전송(payload에 source_path).
3. Agent_Blog `newcs-sync.yml` 이 소스 checkout → `--source _src/<source_path>` 로 변환기 실행 → `assets/newcs` 이미지 복사 → **PR 생성**.
4. PR 에서 사람이 검수(분할·렌더·이미지) 후 **merge** → Pages 배포 자동 실행.

### C) 빌드 검증 (필수)
```vm
cd "c:/Users/chiwonchoi/OneDrive - Microsoft/Develop/chichoi1991/Agent_Blog"
bundle exec jekyll build
```
- `_chapters/newcs*.md` 가 모두 생성됐는지, 리터럴 `**` 누출 0, `MS` 0 확인.
- ⚠️ **서버를 끈 뒤 `_site` 삭제 후 빌드**(서버 켠 채 삭제 시 파일 잠금→스타일 깨짐, repo 메모 참조).

### D) 반영
- 로컬 변환이면 직접 커밋·푸시 → `Deploy Jekyll site to Pages` 자동 배포.
- 자동 파이프라인이면 PR merge 가 곧 배포.

## mapping.json — 분할 규칙(핵심)
- `parts[].children[].sections`: 소스의 `## N.`(숫자 섹션) 인덱스 배열. 이게 분할의 전부.
- `appendSections`: "참조"/"부록" 같은 **이름 섹션**을 마지막 child 에 덧붙임.
- `parentSections`: 부모 랜딩에 접어 넣을 도입부(예: 2·3부의 `## 0.`).
- `scrub.rename`: 기본 `MS→Microsoft`. `scrub.deny`: 라인 제거 정규식(기본 비어 있음 — NDA 없음 가정).
- **구조가 바뀌면 이 파일만 고친다.** 소스에 `## 11.` 추가 시 해당 child 에 `"sections":[11]`.

## 변환기가 자동 처리(결정적) vs 사람·AI 후처리
| 결정적(CLI) | 후처리(사람/AI) |
|---|---|
| 챕터 분할·frontmatter·order/parent | 챕터 분할 "지점" 자체 재설계(mapping 수정) |
| `▶ 포인트` → note 콜아웃 | Mermaid → ASCII 재작도 |
| `MS`→`Microsoft`, 조사 앞 공백 제거 | 캡션 의역·문장 다듬기 |
| 스크린샷 → `<figure class="screenshot">` | 표현 톤 정리 |
| ```` ```mermaid ```` 제거 | `newcs0-overview`(수기 인트로) 유지 |

## 트리거 설계 (소스는 blog-content 허브 repo)
- 권장: **허브를 private repo 로 운영**하고 `sync-to-blog.yml` 로 변경 프로젝트 감지→dispatch.
- 허브는 **여러 프로젝트**(`projects/<P>/`)를 담고, 각 프로젝트의 `blog-sync.json` 이 대상 블로그·파이프라인을 결정. 프로젝트마다 변환 방식이 달라도 됨.
- `_wip/` 는 `.gitignore`(`**/_wip/`) 대상 → 초안 변경은 **절대 트리거 안 됨**. 발행본(`projects/<P>/` MD) 푸시만 트리거.
- 수동만 원하면 워크플로 없이 A) 변환을 직접 실행해도 됨.

## 필요한 secret (자동 파이프라인 시)
| repo | secret | 용도 |
|---|---|---|
| blog-content(허브) | `BLOG_DISPATCH_TOKEN` | 대상 블로그 repo 에 repository_dispatch 전송(PAT) |
| Agent_Blog | `SOURCE_REPO` | 허브 repo 좌표(예: chichoi1991/blog-content) |
| Agent_Blog | `SOURCE_REPO_TOKEN` | 허브 private repo checkout 용 PAT(repo read) |

## 함정 / 주의
- **CRLF/BOM**: 변환기가 정규화한다(소스가 CRLF여도 OK).
- **펜스 파리티**: SKILL.md 예시의 `## 언제 쓰나` 가 코드블록 안에 있어 펜스 추적 필요. 변환기는 "숫자 섹션 `## N.`"에서 파리티를 리셋해 안전.
- **order 는 숫자**로 출력(문자열이면 Liquid `sort` 가 10<2 로 깨짐).
- **이미지 파일명 = `{부}_{순번}.png`**. 본문 참조와 일치해야 figure 가 뜬다(없으면 "준비 중" placeholder).
- **빌드 시 스타일 깨짐**: 서버 끄고 → `_site` 삭제 → 빌드 순서 엄수(중복 ruby 서버 금지).
