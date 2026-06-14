# tools/newcs-sync — 결정적 변환기

소스 1·2·3부 MD를 블로그 `_chapters/newcs*.md` 계층 챕터로 **결정적(deterministic)** 변환한다.
판단이 필요한 작업(표현 다듬기 등)은 하지 않고, 규칙 기반 변환만 수행한다.

## 사용

```bash
node tools/newcs-sync/convert.mjs --source "<소스폴더>" [--out "_chapters"] [--check]
```

- `--source` : 1·2·3부 MD가 있는 폴더(또는 `SOURCE_DIR` 환경변수).
- `--out`    : 출력 폴더(기본 `../../​_chapters`).
- `--check`  : 드라이런(파일 미작성, 생성 목록만 출력).

의존성 없음(Node 18+ 내장 모듈만 사용).

## 무엇을 변환하나 (결정적)

| 변환 | 규칙 |
|---|---|
| 챕터 분할 | `mapping.json` 의 `sections` 인덱스(`## N.`)로 부모/자식 분리 |
| frontmatter | `layout/title/short_title/description/order/category/parent/is_parent` 주입 |
| 콜아웃 | `> **▶ 포인트:** …` 블록인용 → `<div class="info-box note">` |
| 명칭 | `MS` → `Microsoft` (단어 경계) |
| 조사 공백 | 닫는 강조(`**`/`*`) 뒤 한글 조사 앞 공백 제거 |
| 스크린샷 | `![..](images/N_M.png)` → `<figure class="screenshot">` |
| 다이어그램 | ```` ```mermaid ```` 블록 제거(렌더 깨짐 방지) |

## 무엇을 안 하나 (사람/AI 후처리 몫)

- 표현·문장 다듬기, Mermaid→ASCII 재작도, 이미지 캡션 의역
- `newcs0-overview.md`(수기 인트로)는 건드리지 않음 — 소스에 대응 섹션이 없음

## 구조가 바뀌면

`mapping.json` 의 `parts[].children[].sections` 만 고치면 분할이 바뀐다.
소스에 `## 11.` 섹션이 추가되면 해당 child 에 `"sections": [11]` 추가.
