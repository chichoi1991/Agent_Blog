# HANDOFF — New Copilot Studio (CLI Agent) 콘텐츠 이식

> 작성일: 2026-06-14
> 대상 레포: **Agent_Blog** (이 레포, Jekyll/GitHub Pages 블로그)
> 목적: 외부에서 작성한 **1·2·3부 교육 문서**를 이 블로그에 포스팅하고, **기존 콘텐츠를 "Classic"으로 재라벨링**한다.
> 다음 세션은 이 파일만 읽고 바로 작업을 이어갈 수 있도록 작성됨.

---

## 0. 한 줄 요약

이 블로그는 지금까지 **Classic Copilot Studio** 기준의 가이드·워크샵을 다뤘다. 이제 두 가지를 한다:
1. **기존 콘텐츠를 "Classic" 버전으로 재라벨링** (guide·workshop·special·cowork = 전부 Classic).
2. **"New Copilot Studio (CLI Agent)" 신규 카테고리**를 만들고, 1·2·3부 문서를 포스팅.

---

## 1. 소스 문서 (다른 워크스페이스에 있음)

> ⚠️ Agent_Blog 레포 **밖**에 있다. 절대경로로 접근할 것.

| 부 | 소스 파일 (절대경로) | 내용 |
|---|---|---|
| **1부** | `C:\Users\chiwonchoi\OneDrive - Microsoft\Documents\Microsoft Scout\New Copilot Studio_업데이트\New-Copilot-Studio_1부_Whats-New.md` | 개념편 — 하네스·에이전틱 루프·스킬·툴/MCP·서브에이전트·메모리·워크플로우·클래식→뉴 매핑·CLI 런타임 해부·Claude Code 비교 + 부록(공급망 보안) |
| **2부** | `...\New Copilot Studio_업데이트\New-Copilot-Studio_2부_에이전트-생성.md` | 빌드 개념편 — 6요소(지침·스킬·도구·참고자료·연결된 에이전트·메모리) 작성법·함정 |
| **3부** | `...\New Copilot Studio_업데이트\New-Copilot-Studio_3부_에이전트-실습.md` | 실습편 — 통신사 세일즈 어시스턴트 따라 만들기 (생성→지침→스킬→패키지→도구→테스트→배포) |
| 이미지 | `...\New Copilot Studio_업데이트\images\` (`3_1.png`~`3_10.png`) | 3부 스크린샷. 1·2부는 아직 이미지 없음(추가 시 `1_N`,`2_N` 규칙) |

참고 자산(스킬 패키지 실물, 원하면 예제로 인용): `...\New Copilot Studio_업데이트\CLI-Agent-Demo\` (instructions.md, skills/*, *.zip)

---

## 2. 블로그 구조 핵심 (이 레포)

- **Jekyll + GitHub Pages.** baseurl `/Agent_Blog`, 공개 URL `https://chichoi1991.github.io/Agent_Blog/`.
- 콘텐츠 = **`_chapters/` 컬렉션**. 파일마다 frontmatter 필수:
  ```yaml
  ---
  layout: chapter
  title: "전체 제목"
  short_title: "사이드바용 짧은 제목"
  description: "한 줄 설명"
  order: 0            # 카테고리 내 정렬
  category: guide     # nav_sections의 key
  # (워크샵형 계층은 is_parent: true / parent: ws1-0-overview 사용)
  ---
  ```
- **카테고리는 `_config.yml`의 `nav_sections`** 에 정의 (key·title·icon). 현재: `guide`, `workshop`, `special`, `cowork`, `updates`.
- **사이드바·이전/다음 네비는 frontmatter에서 자동 생성** (`_layouts/chapter.html`이 `category`+`order`로 정렬). → 챕터 파일만 잘 만들면 사이드바는 자동.
- **`index.html`(홈)은 수동 HTML.** 챕터 카드가 손으로 박혀 있다. → 신규 콘텐츠는 **index.html에도 카드 섹션을 직접 추가**해야 홈에 노출됨.
- 마크다운: **kramdown + GFM**. (Mermaid 기본 미지원 — 4장 참조)
- 로컬 미리보기: VS Code Task **"Jekyll Serve"** (`bundle exec jekyll serve --livereload`).

---

## 3. 작업 1 — 기존 콘텐츠 "Classic" 재라벨링

기존 guide(ch0~8)·workshop(ws1~5)·special(sp1)·cowork = **전부 Classic Copilot Studio** 기준.

**권장 방식 (최소 변경, 데이터 주도):** `_config.yml`의 `nav_sections` **title만** 손본다. 챕터 파일 본문은 건드리지 않아도 사이드바·홈 그룹명이 바뀐다.
```yaml
nav_sections:
  - key: guide
    title: "Copilot Studio 실무 가이드 (Classic)"   # ← "(Classic)" 추가
    icon: "📘"
  - key: workshop
    title: "핸즈온 워크샵 (Classic)"
    icon: "🛠️"
  - key: special
    title: "특별 워크샵 (Classic)"
    icon: "⭐"
  - key: cowork
    title: "Cowork Collective (Classic)"
    icon: "🤝"
  # updates 는 공통 → 유지
```
- **index.html** 홈의 각 섹션 `<h2>` 제목에도 동일하게 "(Classic)"을 반영(수동).
- (선택) 각 Classic 챕터 상단에 "이 문서는 Classic Copilot Studio 기준입니다. New(CLI)는 → 신규 카테고리 참조" 안내 배너를 넣고 싶으면 챕터별 본문 상단에 한 줄 추가. 전부 손대긴 많으니 **우선은 nav title만 권장**.

> 결정 필요: "(Classic)"을 **카테고리 제목에만** 둘지, **각 챕터 제목/배너까지** 반영할지. 우선 제목만으로 시작 권장.

---

## 4. 작업 2 — "New Copilot Studio (CLI Agent)" 신규 카테고리

### 4.1 카테고리 등록 (`_config.yml`)
`nav_sections`에 **맨 앞 또는 updates 앞**에 추가:
```yaml
  - key: newcs
    title: "New Copilot Studio (CLI Agent)"
    icon: "⚡"      # 또는 🆕
```

### 4.2 챕터 파일 — 1부:1챕터 매핑 (권장 시작안)

`_chapters/` 에 아래 4개 생성. 접두사 `newcs`, category `newcs`.

| 파일 | order | short_title | 소스 | 비고 |
|---|---|---|---|---|
| `newcs0-overview.md` | 0 | 개요 | (신규 작성) | 왜 CLI 에이전트인가 + 1·2·3부 안내 |
| `newcs1-whats-new.md` | 1 | What's New (개념) | **1부** | 하네스·루프·스킬·메모리·매핑 |
| `newcs2-build.md` | 2 | 에이전트 빌드 | **2부** | 6요소 작성법·함정 |
| `newcs3-handson.md` | 3 | 실습 — 세일즈 어시스턴트 | **3부** | 따라 만들기 |

- 각 부가 길다 → **우선 "부=1챕터"로 통째 이식**(빠르고 단순). 나중에 트래픽 보고 sub-chapter로 쪼개도 됨(워크샵처럼 `is_parent`/`parent` 패턴 사용 가능).
- frontmatter 예시(`newcs1`):
  ```yaml
  ---
  layout: chapter
  title: "New Copilot Studio — 1부 What's New"
  short_title: "What's New (개념)"
  description: "하네스 설계 원리로 다시 읽는 New Copilot Studio — 스킬·툴·메모리·CLI 런타임."
  order: 1
  category: newcs
  ---
  ```
- 본문은 소스 md의 `##`(h2)부터 붙여넣되, 소스의 **문서 제목(h1)·작성일·자료취급 박스**는 frontmatter로 대체하거나 제거.

### 4.3 index.html 홈 카드 추가
홈 최상단(또는 updates 위)에 새 섹션 블록을 **수동 추가**. 기존 `<div class="home-section">` 패턴 복사 → `📘 ... 가이드` 카드 구조 그대로, 링크는 `{{ '/chapters/newcs1-whats-new/' | relative_url }}` 형식.

---

## 5. ⚠️ 공개 전 필수 — NDA·내부 정보 제거 (가장 중요)

소스 1·2·3부는 **내부 교육용**이라 외부 블로그에 그대로 올리면 안 되는 내용이 섞여 있다. 각 문서 끝의 **"자료 취급 가이드"** 표가 기준이다. 포스팅 전 아래를 **제거/추상화**할 것:

| 항목 | 처리 |
|---|---|
| 내부 평가 수치 (+11점, 대용량 +8.3, 코드 인터프리터 +41.8 등 NDA) | **삭제** |
| 엔진 코드네임 `dracarys`, 내부 경로 `/app/...`·`/dracarys/`·`/opt/...` | "AI 엔진"·"작업 공간" 등 **일반 명칭으로 추상화** |
| 번들 내부 식별자 `bic:bundle`, `crskill_..._zip_...` | **삭제** (프리뷰 버그 설명은 "리소스가 일부만 주입됨" 수준으로 일반화) |
| 컨테이너 inspection 세부(OS 빌드·`blob_id` 등) | **삭제/요약** |
| Launch FAQ (Internal, "Do not distribute"), NDA 로드맵, Custom Autopilots | **삭제** (GA 항목만) |
| Preview·"GA TBD"·날짜 | "프리뷰", "subject to change"로만. 구체 월/수치 빼기 |
| 데모의 실제 메일주소(`admin@ABSx67373023...`)·테넌트·고객ID | **삭제/가명** |
| 내부 도구 정확명(`createSmallTextFileInMyOnedrive` 등) | 외부 공개판은 "OneDrive에 업로드 후 링크 첨부"로 **개념화** (정확 도구명은 내부판에만) |

> 원칙: **GA·공개 가능한 개념·작성법·함정**은 살리고, **내부 관찰·NDA 수치·내부 식별자**는 뺀다. 1부 본문의 ⚠️ 경고 박스와 "자료 취급 가이드" 표를 그대로 참고.

---

## 6. 변환 주의사항

- **Mermaid:** 3부 0.1에 Mermaid `flowchart`가 있음. 이 블로그는 kramdown+GFM이라 **Mermaid가 그대로 렌더링되지 않을 가능성**이 큼(레이아웃에 mermaid.js 없음). 두 옵션:
  1. `_layouts/chapter.html` 또는 default에 mermaid.js CDN + 초기화 스크립트 추가(전역 지원), 또는
  2. 다이어그램을 **PNG 이미지로 캡처해 삽입**(가장 안전). → 우선 이미지 권장.
- **이미지 경로:** 소스 3부는 `images/3_N.png` 상대경로. 블로그는 보통 `assets/`를 씀. 결정:
  - 권장: `assets/newcs/` 폴더 만들고 `3_1.png`… 복사 → 본문 링크 `/Agent_Blog/assets/newcs/3_1.png`(또는 `{{ '/assets/newcs/3_1.png' | relative_url }}`).
  - 소스 `images/` 폴더(README 포함)에서 실제 png를 가져와 넣을 것(현재 png는 아직 없을 수 있음 — 자리표시만 있는 경우 캡처 채워지면 이식).
- **링크:** 부 간 상호참조("1부 9.4")는 블로그 챕터 링크(`/chapters/newcs1-whats-new/#...`)로 바꾸거나 텍스트로 유지.
- **h1 중복:** 챕터 본문은 h2부터. 소스의 맨 위 `#`/`##(부제)`는 frontmatter title로 흡수.

---

## 7. 작업 순서 체크리스트 (다음 세션)

- [ ] `_config.yml` `nav_sections`: 기존 4개 title에 "(Classic)" 추가 + `newcs` 카테고리 추가
- [ ] `index.html`: 기존 섹션 제목 "(Classic)" 반영 + 신규 "New Copilot Studio (CLI Agent)" 카드 섹션 추가
- [ ] `_chapters/newcs0-overview.md` 작성(개요)
- [ ] `_chapters/newcs1-whats-new.md` ← 1부 (NDA/내부 정보 제거 후)
- [ ] `_chapters/newcs2-build.md` ← 2부 (정제 후)
- [ ] `_chapters/newcs3-handson.md` ← 3부 (정제 후, Mermaid→이미지, 이미지 `assets/newcs/`로)
- [ ] `assets/newcs/` 에 3부 스크린샷 배치 + 본문 경로 수정
- [ ] `bundle exec jekyll serve`(Jekyll Serve 태스크)로 로컬 확인 — 사이드바·홈 카드·이미지·내부 링크
- [ ] 공개 전 5장 NDA 체크리스트 최종 재검토

---

## 8. 열린 결정사항 (작업 전 확인하면 좋음)

1. **"부 = 1챕터"** 로 갈지, **sub-chapter로 분할**(워크샵형 parent/child)할지. → 우선 1챕터 권장.
2. "(Classic)" 표기를 **카테고리 제목만** vs **챕터 제목/배너까지**.
3. Mermaid: **이미지 대체** vs **mermaid.js 전역 도입**.
4. 신규 카테고리 노출 순서: **맨 위**(최신 강조) vs updates 근처.
5. 1·2부 스크린샷 추가 여부(현재 3부만 이미지 자리 있음).

---

## 부록 — 참고 파일 위치 (이 레포)

- `_config.yml` — `nav_sections`(카테고리 정의)
- `index.html` — 홈(수동 카드)
- `_layouts/chapter.html` — 사이드바/네비 자동 생성 로직(frontmatter 기반)
- `_chapters/up1-2026h1-updates.md` — 단순 frontmatter 예시
- `_chapters/ws1-0-overview.md` 등 — 워크샵 parent/child 계층 예시(분할 시 참고)
