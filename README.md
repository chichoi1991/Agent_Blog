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
5. **이미 영문인 이미지는 공유한다.** 실제 영문 UI를 별도로 촬영한 이미지는
   `assets/image/en/...`에 보관하고 영문 챕터에서만 참조한다. 한국어 원본 파일은
   덮어쓰지 않으며, `alt`와 `<figcaption>`도 실제 캡처 내용에 맞게 작성한다.

### 검사

```pwsh
node tools/i18n/check-parity.mjs           # 짝 누락 · 프론트매터 불일치 리포트
node tools/i18n/check-parity.mjs --strict  # 문제가 있으면 exit 1
```

PR 에서는 `.github/workflows/i18n-parity.yml` 이 자동으로 돈다.
그 PR 에서 **새로 추가된** 챕터에 짝이 없으면 실패한다(기존 미번역분은 막지 않는다).

### 이미지 경로와 공개 접근

GitHub 첨부 URL은 원본 저장소가 비공개이면 로그인하지 않은 독자에게 404를 반환할 수 있다.
게시할 수 있는 이미지는 이 저장소의 `assets/`에 보관하고, 두 언어에서
`{{ '/assets/...' | relative_url }}`로 참조한다. `/en/assets/`나 `../assets/`는 사용하지 않는다.
복구한 첨부 이미지의 원본 URL·SHA-256·크기는 `assets/image/github-attachments/manifest.json`에 기록한다.
비공개 원본에서 가져온 이미지는 개인정보·내부 정보와 공개 가능 여부를 확인한 뒤 게시한다.
실제 영문 재촬영본은 `assets/image/en/caldova/manifest.json`에 촬영 시각·크기·SHA-256을
기록한다. 픽셀 위 번역문 합성이나 미실행 결과를 실제 캡처처럼 사용하지 않는다.

```pwsh
bundle exec jekyll build
node tools/check-images.mjs --site _site           # 렌더된 모든 페이지의 로컬 이미지 경로 검사
node tools/check-images.mjs --site _site --remote  # 외부 URL의 비로그인 GET·이미지 응답도 검사
```

Pages 배포는 이미지 검사가 통과해야 진행된다. 파일명 대소문자, 누락 파일, 언어별
상대경로 오류와 접근 불가능한 외부 이미지를 검사하며, 실패한 이미지와 해당 페이지를 출력한다.
새 챕터·번역·동기화 PR에서도 같은 명령으로 검사한다.

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
