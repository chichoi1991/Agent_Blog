코파일럿 에이전트 블로그 입니다.

- 한국어: https://chichoi1991.github.io/Agent_Blog/
- English: https://chichoi1991.github.io/Agent_Blog/en/

## 한/영 이중 언어 구조

이 사이트는 한국어를 기본으로 하고, 영문판을 `/en/` 아래에 병행 게시한다.
헤더 우측의 **KO / EN** 토글이 같은 글의 반대 언어 페이지로 이동한다.

| | 한국어 | English |
|---|---|---|
| 홈 | `/` | `/en/` |
| 챕터 소스 | `_chapters/<slug>.md` | `_chapters_en/<slug>.md` |
| 챕터 URL | `/chapters/<slug>/` | `/en/chapters/<slug>/` |
| 목록 페이지 | `updates.html`, `catblog.html`, `m365.html`, `scout.html`, `resources.html` | 같은 이름으로 `en/` 아래 |
| 리소스 허브 | `agent-resources.html`, `agent-resources/*.html` | `en/agent-resources.html`, `en/agent-resources/*.html` |
| 검색 인덱스 | `search.json` | `en/search.json` |

### 지켜야 할 규약

1. **파일명이 같아야 한다.** 언어 토글은 slug 로 짝을 찾는다.
   `_chapters/foo.md` ↔ `_chapters_en/foo.md`. 짝이 없으면 토글이 반대 언어 홈으로 폴백한다.
2. **영문 챕터에는 `lang: en` 이 있어야 한다.** 없으면 영문 레이아웃·사이드바가 적용되지 않는다.
3. **`order` · `category` · `parent` · `is_parent` 는 한/영이 같은 값이어야 한다.**
   다르면 사이드바 계층과 정렬이 언어별로 어긋난다.
4. **본문의 사이트 내부 링크에는 `/en` 접두사를 붙인다.**
   `/chapters/foo/` → `/en/chapters/foo/`. **슬러그 자체는 번역하지 않는다.**
5. **이미지는 공유한다.** 영문 페이지도 `assets/...` 의 같은 파일을 참조하고
   `alt` 와 `<figcaption>` 만 영문으로 쓴다.

### 검사

```pwsh
node tools/i18n/check-parity.mjs           # 짝 누락 · 프론트매터 불일치 리포트
node tools/i18n/check-parity.mjs --strict  # 문제가 있으면 exit 1
```

PR 에서는 `.github/workflows/i18n-parity.yml` 이 자동으로 돈다.
그 PR 에서 **새로 추가된** 챕터에 짝이 없으면 실패한다(기존 미번역분은 막지 않는다).

### UI 문자열

레이아웃·인클루드의 화면 문구는 `_data/i18n.yml` 의 `ko` / `en` 사전에서 가져온다.
새 문구를 추가할 때는 반드시 양쪽에 모두 넣는다. 사이드바 섹션 제목은 `_config.yml` 의
`nav_sections[].title_en` 을 쓴다.

## 자동 동기화 파이프라인

세 개의 sync 파이프라인이 외부 소스를 감지해 챕터를 생성한다. **모두 한/영 두 벌을 만든다.**

| 파이프라인 | 소스 | 원문 언어 | 영문판 생성 방식 |
|---|---|---|---|
| `catblog-sync` | microsoft/mcscatblog | 영어 | 원문(EN)을 그대로 정리 — 되옮기지 않음 |
| `academy-sync` | microsoft/agent-academy | 영어 | 원문(EN)을 그대로 정리 — 되옮기지 않음 |
| `newcs-sync` | blog-content 허브 | 한국어 | 한국어판을 번역 (PR 본문의 체크리스트로 안내) |

각 파이프라인의 상세 규칙은 `.github/skills/<이름>/SKILL.md` 에 있다.
