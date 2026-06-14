---
layout: "chapter"
title: "1부 · CLI 런타임 구조"
short_title: "CLI 런타임 구조"
description: "하네스의 실물 — 격리 컨테이너·참조자료 처리·Python 런타임·메모리 아키텍처."
order: 6
category: "newcs"
parent: "ncs1"
---

## 9. CLI 에이전트 런타임 해부 — 하네스의 "실물"

<div class="info-box note" markdown="1">
**▶ 포인트** — 1장의 "하네스"는 추상 개념이 아니라 **실제로 돌아가는 격리 리눅스 컨테이너**다. 세션마다 새 컨테이너가 프로비저닝되고, 그 안에서 2장의 에이전틱 루프가 진짜 도구(bash·grep·python)를 돌린다. 이 장은 그 실물을 파일시스템 수준에서 해부해, "왜 신뢰성·대용량·리치 산출이 가능한가"를 보여준다.
</div>

> **짚고 가기:** 아래 컨테이너 내부 구조(엔진 코드네임·OS 빌드 등)는 **런타임 관찰(runtime inspection) 결과**입니다. 이는 프롬프트 인젝션과 유사한 방식으로 내부를 파악하여 일반적인 에이전트 아키텍쳐의 컴포넌트 구조와 역할을 매치하여 추측한 내용이며, 공식 가이드가 아닙니다. 코드네임 및 디렉토리 구조, 처리방식등을 변경될 수 있습니다.

### 9.1 한 줄로 — 에이전트는 어디서 도는가

- **세션 = 1개의 격리 컨테이너.** OS는 **Microsoft Azure Linux 3.0**(Microsoft가 직접 만든 컨테이너 OS). 세션마다 새로 프로비저닝되고 종료되면 통째로 폐기.
- 이 컨테이너 안에서 LLM이 **낮은 권한(`sandbox` 유저)**으로 에이전틱 루프를 돌리며 `bash`·`grep`·`view`·`edit`·`python` 같은 실제 도구를 호출한다.
- 즉, 1장에서 말한 "coding harness + CLI layer"가 **여기서 물리적으로 구현**된다.

### 9.2 루트 디렉토리 구조

```
/
├── app/                        ← AI 작업 공간 (에이전트가 쓰는 영역)
│   ├── uploads/                ← 외부에서 들어온 파일 (KnowledgeSearch 다운로드)
│   ├── created/                ← AI가 생성한 최종 결과물 (사용자 다운로드)
│   ├── workspace/              ← AI 작업용 임시 공간·전처리 아티팩트
│   ├── copilot/                ← AI 시스템 내부 상태
│   │   └── session-store.db    ← (SQLite) 세션 내 메모리
│   ├── skills/                 ← AI 스킬(도구) 모음
│   └── data/                   ← Node.js 런타임 캐시
├── dracarys/                   ← 🔒 AI 엔진 핵심 (sandbox 접근 차단)
├── opt/                        ← AI 모델 캐시
│   ├── fastembed_cache/        ← 임베딩 모델 (bge-small-en 등)
│   └── hf_cache/               ← HuggingFace 모델 캐시 (xet 스토리지 포함)
├── usr/
│   ├── bin/                    ← 시스템 실행 파일
│   ├── lib/python3.12/         ← 파이썬 표준 라이브러리
│   ├── local/bin/              ← sandbox-exec 등 커스텀 도구
│   └── share/{fonts, jupyter}/ ← 시스템 폰트(noto-cjk 등)·Jupyter 데이터
├── etc/{ssl, adc}/             ← SSL 인증서·Azure 자격증명 설정
├── home/{sandbox, nonroot}/    ← 실행 사용자 홈·비루트 사용자 홈
├── run/dracarys/               ← AI 엔진과 통신하는 런타임 소켓
├── var/{log, lib/rpm}/         ← 시스템 로그·패키지 DB
└── tmp, dev, boot, mnt, proc, sys/   ← 임시·장치·커널 가상 FS
```

**주목할 점:**

| 항목 | 의미 |
|---|---|
| **OS** | Microsoft Azure Linux 3.0 — Microsoft가 직접 만든 컨테이너 OS |
| **/dracarys/** | AI 에이전트 엔진 본체 — sandbox에서는 권한 제어로 접근 불가 🔒 |
| **/run/dracarys/** | 에이전트(앱)와 엔진이 통신하는 런타임 소켓 |
| **/opt/fastembed_cache/** | KnowledgeSearch 벡터 임베딩용 **로컬** 모델 |
| **/opt/hf_cache/** | HuggingFace 모델 캐시 |
| **사용자** | `sandbox`(현재 실행) · `nonroot` 2개 계정 |

### 9.3 보안·격리 모델 — 1장 "Sandbox"의 구현

```
sandbox 사용자
   ↓ 접근 가능
 /app/   /tmp/   /home/sandbox/
   ↓ 접근 차단 🔒
 /dracarys/   ← AI 엔진 본체 (핵심 보호 영역)
```

- 에이전트(LLM 주도)는 **최소 권한 `sandbox` 유저**로 동작. 작업·산출은 `/app`에서만.
- **엔진 본체(`/dracarys/`)는 에이전트조차 못 읽는다.** 프롬프트 인젝션으로 에이전트가 탈취를 시도하더라도 다른 엔진·다른 세션엔 닿지 못함.
- 전형적인 **Azure Container Instance 기반 격리 실행 환경**. 4장에서 말한 "같은 거버넌스 경계 안에서 실행"이 이 컨테이너 경계로 물리화된 것.

> **비유:** 에이전트는 "샌드박스에서 노는 인턴", 엔진은 "잠긴 기계실"이다. 인턴이 실수하거나 누가 인턴을 꾀어도 기계실 문은 안 열린다.

### 9.4 참조자료 처리 — 가장 크게 개선된 부분

CLI·컨테이너 전환의 최대 수혜는 **참조자료(지식) 처리 방식**입니다. `/app` 하위가 세션 단위로 생성·관리됩니다.

| 폴더 | 역할 |
|---|---|
| `uploads/` | KnowledgeSearch로 다운로드된 원본 파일 (SharePoint·OneDrive 등) |
| `workspace/` | 작업용 임시 파일·전처리 아티팩트(`_artifacts/`) |
| `created/` | 최종 결과물(HTML·PPTX·PDF 등) — **사용자가 다운로드하는 공간** |
| `copilot/` | 세션 상태·플랜 파일(`plan.md`)·내부 로그 |
| `skills/` | 분석 스킬 스크립트(xlsx·pdf·csv·docx·pptx 등) |
| `data/` | Node.js 컴파일 캐시 |

**무엇이 달라졌나 — 단순 검색 결과 참조에서 실제 파일을 열어 분석:**

1. KnowledgeSearch(SharePoint 참조)는 여전히 **Graph API 기반 Copilot Search**를 사용 — 여기까진 동일.
2. **(신규)** Search 결과 메타데이터로 *답변 + 다운로드 URL*을 함께 반환.
3. **(신규)** 필요하면 그 URL로 **실제 파일을 컨테이너(`/app/uploads`)에 내려받아** 처리.
4. **(신규)** 내려받은 파일을 **Python 라이브러리로 대용량 처리** — "코드를 짤 토큰만 충분하면 대용량 데이터도 문제없이"(Gemini의 코드 기반 처리와 같은 선상).

→ 클래식이 *검색 스니펫*만으로 답했다면, New CLI 에이전트는 **원본 파일 자체를 열어** 수만 행 엑셀·수백 쪽 PDF를 코드로 집계·변환합니다. 2장의 *대용량 파일 +8.3점 / 코드 인터프리터 +41.8점*이 **왜** 가능한지가 여기서 드러납니다.

**왜 클래식은 엑셀을 제대로 못 다뤘나 — RAG(검색 기반)의 한계:**

클래식 Copilot Studio는 파일을 **검색(RAG) 파이프라인**으로 처리했습니다.

```
사용자 질문
   ↓ 검색 쿼리 생성
Azure AI Search / SharePoint Search
   ↓ 청크(chunk) 단위 텍스트만 반환
LLM 컨텍스트에 청크 삽입 → 답변 생성
```

핵심은 **파일을 통째로 받지 않는다**는 것입니다.

- 파일을 미리 **인덱싱(벡터화)** 해두고
- 질문과 유사한 **청크(보통 512~2048 토큰)만 Top-K**로 꺼내 LLM에 투입
- 원본 파일에는 직접 접근하지 않음 ❌

그래서 엑셀처럼 **표 전체를 집계해야 답이 나오는 질문**에 구조적으로 약합니다. 행이 청크 경계로 잘리면 합계·평균이 어긋나고, 필요한 행이 Top-K에 안 들어오면 아예 답을 못 합니다. "파일이 아무리 커도 LLM에 들어가는 건 항상 Top-K 청크뿐"이라는 점이 강점이자 동시에 한계였습니다.

**같은 질문, 다른 처리 — 근사치 vs 정확값:**

```
클래식(RAG):
  "제조사별 평균 가격은?"
  → 청크 검색 → 관련 텍스트 조각 → 근사치
  → 청크에 없으면 답 못함 ❌

New CLI(코드 실행):
  "제조사별 평균 가격은?"
  → Python: df.groupby('Manufacturer')['Price'].mean()
  → 전체 행 집계 → 정확한 수치 ✅ (정렬·필터도 가능)
```

**두 패러다임 비교:**

| 항목 | 클래식 Studio (RAG) | New CLI (코드 실행) |
|---|---|---|
| 파일 처리 | 청크 검색(인덱스 경유) | 다운로드 후 Python 직접 처리 |
| 원본 접근 | ❌ 인덱스 경유 | ✅ 직접 접근 |
| 대용량 | 청크 크기로 제한 | Python이 처리 → 유연 |
| 정확도 | 청크 누락 가능성 | 전체 데이터 집계 |
| 코드 실행 | ❌ 불가 | ✅ 가능 |
| 파일 생성 | ❌ 불가 | ✅ PPT·HTML·CSV 등 |
| 토큰 관리 | 청크로 자동 제한 | AI가 직접 관리 |

> **한 줄 정리:** 클래식은 **"검색 기반(RAG)"** — 파일을 인덱스로 바꿔 청크로 답한다. New CLI는 **"실행 기반(Code+Tool)"** — 파일을 직접 받아 Python으로 정확히 처리한다. 같은 M365 데이터에 닿지만 **처리 패러다임이 근본적으로 다르다.**

**그럼 대용량 파일을 받으면 토큰이 터지지 않나?:**

자연스러운 의문이지만 답은 "안 터진다" — 애초에 **LLM이 파일을 직접 읽지 않기 때문**입니다. KnowledgeSearch가 실제 반환하는 것을 보면:

```
Title:     02. telecom_device_analysis_dummy_data.xlsx
파일 경로:  /app/uploads/02. telecom_device_analysis_dummy_data.xlsx
Snippets:  (비어있음 — 바이너리라 텍스트 추출 불가)
```

xlsx·pptx·pdf 같은 **바이너리는 스니펫이 비어** 있고 파일 경로만 옵니다(텍스트 문서만 일부 내용 포함). 그래서 LLM은 파일을 컨텍스트에 퍼붓는 대신 **Python에게 처리를 시킵니다.**

```python
# ❌ 나쁜 패턴: 파일 → LLM 컨텍스트 직접 투입 → 💥 토큰 초과
# ✅ 좋은 패턴: 파일 → Python 처리 → 결과 요약만 → LLM

df = pd.read_excel('large_file.xlsx')           # 파이썬 메모리에서 처리
result = df.groupby('col').agg({'val': 'sum'})  # 연산도 파이썬이
print(result)   # ← LLM이 읽는 건 이 요약(수십 토큰)뿐
```

보조 전략(자세한 건 2부 실습):

- **컬럼/시트 선택 로드** — `usecols`·`sheet_name`·`nrows`로 필요한 부분만
- **청크 처리** — `pd.read_csv(..., chunksize=10000)`로 수백만 행도 분할
- **메타데이터 우선** — 시트 목록·`dtypes`·5행 샘플만 먼저 보고 다음 스크립트를 결정

> **핵심 원칙:** 파일 크기와 토큰 소비는 "Python이 처리하는 한" 무관하다. LLM이 읽는 건 오직 `print()` 출력뿐이다. 실제로 1,000행 × 34컬럼 엑셀도 원본을 LLM이 직접 읽지 않고 집계 결과(수백 토큰)만 읽어 토큰 낭비가 없었다.

> **참고:** 세션이 끝나면 `/app/uploads`의 원본·산출물은 컨테이너와 함께 삭제됩니다(9.6). 자료는 "처리"되지만 컨테이너에 "잔류"하지 않습니다.

### 9.5 Python 런타임 — 코드 인터프리터의 실체

**보안상 외부 사이트 접속·패키지 설치(`pip install`)는 불가**합니다. 대신 풍부한 패키지가 **사전 설치**돼 있습니다.

| 카테고리 | 사전 설치 패키지 |
|---|---|
| 데이터 분석 | pandas, numpy, pyarrow |
| 시각화 | matplotlib, seaborn, plotly |
| 웹/HTTP | requests, httpx, fastapi, uvicorn, starlette |
| AI/ML | onnxruntime, fastembed, tokenizers, huggingface_hub |
| 문서 처리 | openpyxl, xlsxwriter, pypdf, pdfplumber, pdfminer, python-docx, pptx, mammoth, markitdown |
| 이미지 처리 | Pillow(PIL), OpenCV(cv2), rapidocr_onnxruntime |
| 수학/과학 | sympy, mpmath, scipy |
| 직렬화 | json, orjson, yaml, csv, xml |
| 비동기 | asyncio, anyio, uvloop, websockets |
| 보안/인증 | cryptography, jwt, certifi, ssl |
| 유틸리티 | tqdm, rich, click, typer, loguru, tabulate |
| 웹 스크래핑 | BeautifulSoup(bs4), lxml |
| 그래프/도형 | shapely, fontTools |
| 기타 | pydantic, jinja2, markdown, dotenv, grpc, mcp 등 |

→ 0장의 "전용 컨테이너에서 Word/PPT/Excel/CSV/PDF 산출"이 **이 사전 설치 스택**으로 실현됩니다. 설치를 막아 보안을 지키되, 실무에 필요한 라이브러리는 미리 다 넣어둔 절충입니다.

### 9.6 메모리 아키텍처 — 6장의 구현체

6장(메모리)의 "구조화된 노트·계층 메모리"가 실제로는 **`/app/copilot/session-store.db`(SQLite)**로 구현됩니다.

**DB 테이블 구조:**

| 테이블 | 역할 |
|---|---|
| `sessions` | 세션 메타데이터(ID·작업 디렉토리·요약·생성시각) |
| `turns` | 대화 턴 — 사용자 메시지 + AI 응답 전체 |
| `checkpoints` | 작업 중간 저장점(제목·개요·작업내역·다음단계) |
| `session_files` | 세션 중 접근한 파일 목록 |
| `session_refs` | 세션 내 참조 URL·경로 |
| `forge_trajectory_events` | 도구 호출·명령 실행 이력(tool call 로그) |
| `search_index` | 대화 전문 검색용 FTS5 인덱스 |
| `dynamic_context_items` | 저장소 브랜치별 동적 컨텍스트 항목 |

이 테이블들은 6장 원리와 정확히 대응합니다 — `checkpoints` = Anthropic의 **구조화된 노트(`claude-progress.txt`)**, `forge_trajectory_events` = **도구 궤적 로그**, `search_index` = 지난 맥락을 **다시 꺼내 쓰는 just-in-time 회상**.

**메모리 흐름:**

```
사용자 메시지 입력
   ↓  turns 테이블 저장
session-store.db
   ↓  LLM 컨텍스트로 활용 → AI 응답 생성
응답도 turns 테이블 저장
   ↓
search_index에 FTS 인덱싱 (이후 검색 가능)
```

**두 계층으로 나뉜 메모리 (핵심):**

```
┌──────────────────────────────────────────┐
│   Microsoft 365 클라우드 (영구)            │ ← 세션 간 유지
│   · Copilot 메모리(서버사이드)             │
│   · 사용자 프로필·설정                      │
│   · SharePoint / Exchange 데이터           │
└───────────────────┬──────────────────────┘
                    │ 세션 시작 시 주입
┌───────────────────▼──────────────────────┐
│   컨테이너 /app/ (임시·세션 한정)          │ ← 세션 종료 시 소멸
│   · session-store.db (대화 턴 기록)        │
│   · uploads/ workspace/ created/           │
│   · 처리한 파일·아티팩트                    │
└──────────────────────────────────────────┘
```

| 구분 | 저장 위치 | 세션 종료 후 |
|---|---|---|
| 현재 대화 턴 | `/app/copilot/session-store.db` | ❌ 소멸 |
| 생성 파일 | `/app/created/` | ❌ 소멸 |
| Copilot 메모리 | M365 클라우드 | ✅ 유지 |
| SharePoint 데이터 | M365 테넌트 | ✅ 유지 |

**한계(반드시 인지):**

- `session-state/`·`config.json`은 **root 소유 → sandbox 접근 차단** 🔒
- 세션 종료 시 DB까지 **삭제** — 영구 메모리가 아니라 **세션 범위 메모리**
- `session-store.db-wal`(write-ahead log)은 세션이 살아있는 동안 계속 커짐

> **비유:** `/app/`은 **RAM(임시)**, M365 클라우드는 **HDD(영구)**. 컨테이너는 매 세션 새로 켜지는 RAM이라, 세션 간 기억은 반드시 클라우드(M365) 쪽에 있어야 합니다. 6장의 *compaction/note-taking*이 RAM 안의 절약 기법이라면, M365 영속 계층은 그 위의 장기 기억입니다.

### 9.7 fastembed_cache — 대화에 RAG를 적용한 메모리 강화

> **짚고 가기:** 9.6의 `search_index`는 단순 저장이 아니다. 컨텍스트 윈도우가 넘칠 때 과거 턴을 **검색해 꺼내오는** 장치이며, 그 검색을 가능케 하는 로컬 임베딩 엔진이 `/opt/fastembed_cache`다. 즉 **대화 자체에 RAG를 적용**한 구조다.

**두 임베딩 캐시의 역할 분리:**

`/opt` 아래 두 모델 캐시(9.2)는 이름이 비슷하지만 역할이 완전히 다릅니다.

| 캐시 | 정체 | 역할 |
|---|---|---|
| `fastembed_cache` | bge-small-en-v1.5 (ONNX 양자화, 65MB) | **세션 대화**를 로컬 벡터화 → `search_index` 생성 |
| `hf_cache` | HuggingFace xet 전송 클라이언트 (로그 ~56KB) | 빌드 시 모델 다운로드 흔적 (모델 본체 없음) |

- **`fastembed_cache`** = 실제 쓰는 로컬 임베딩 엔진. 인터넷 없이 컨테이너 내부에서 사용자 메시지를 벡터로 바꿔 `search_index`(FTS5)에 넣습니다.
- **`hf_cache`** = 모델 저장소가 아니라, 빌드 타임에 모델을 받아온 **전송 로그 찌꺼기**(xet 프로토콜 로그)일 뿐. 56KB밖에 안 되는 이유.

```
사용자 메시지 → fastembed(bge-small) → 벡터 → search_index 저장
                     ↑
            인터넷 없이 컨테이너 내부에서 실행 (오프라인)
```

**두 개의 임베딩, 두 개의 목적 — 문서 RAG vs 대화 RAG:**

이 컨테이너에는 **서로 다른 두 임베딩**이 공존합니다. 4·9.4장의 KnowledgeSearch(문서 검색)와 헷갈리면 안 됩니다.

```
┌─────────────────────────────────────────────────┐
│  KnowledgeSearch  (M365 Semantic Index, 클라우드) │
│  · SharePoint 문서 벡터 인덱스                    │ ← 파일 검색용
│  · Azure 대형 임베딩(text-embedding-ada 등)       │
└───────────────────────┬─────────────────────────┘
                        │ 검색 결과 반환
┌───────────────────────▼─────────────────────────┐
│  현재 컨테이너 로컬                               │
│  · fastembed (bge-small-en, ONNX, 65MB)          │ ← 대화 검색용
│  · session-store.db의 search_index               │
│    └ 세션 내 턴(turn) 전문·의미 검색             │
└─────────────────────────────────────────────────┘
```

| | M365 Semantic Index | fastembed (로컬) |
|---|---|---|
| 위치 | Azure 클라우드 | 컨테이너 내부 |
| 대상 | SharePoint 문서·파일 | 현재 세션 대화 내용 |
| 목적 | 파일 검색·다운로드 | 세션 내 컨텍스트 검색 |
| 모델 | Azure 대형 임베딩 | bge-small (경량·오프라인) |
| 네트워크 | 필요 | 불필요(로컬) |

> **비유:** M365 Semantic Index = **파일 창고의 색인**, fastembed 로컬 = **현재 대화의 메모지 색인**. 둘은 완전히 다른 데이터를 다른 목적으로 인덱싱하므로 둘 다 존재합니다.

**왜 필요한가 — 컨텍스트 윈도우를 검색으로 보강:**

핵심은 "저장"이 아니라 **컨텍스트 윈도우 초과 보완**입니다. 세션이 길어지면 앞 턴이 윈도우 밖으로 밀려납니다.

```
Turn 0  ████
Turn 1  ████
...
Turn 50 ████
Turn 51 ████  ← 컨텍스트 윈도우 초과! 앞 내용이 잘림
```

이때 "아까 만든 PPT 파일명이 뭐였지?" 같은 질문을 `search_index`가 해결합니다.

```
사용자: "아까 만든 PPT 파일명이 뭐였지?"
   ↓ 컨텍스트 윈도우엔 이미 없음
search_index에 FTS/벡터 검색  ("PPT 파일명" → turn 4 매칭)
   ↓ 해당 턴을 컨텍스트에 동적 삽입
"telecom_executive_report.pptx 입니다"
```

**3계층 메모리 강화 구조 (9.6 + fastembed 통합):**

```
┌─────────────────────────────────────┐
│      컨텍스트 윈도우 (단기)          │  최근 N턴만 유지, 가장 빠름
│      Turn N-5 ~ Turn N               │
└──────────────┬──────────────────────┘
               │ 초과 시
┌──────────────▼──────────────────────┐
│  search_index + fastembed (중기)     │  세션 전체 턴 검색
│  FTS5 + 로컬 벡터 검색               │  관련 턴만 꺼내옴
└──────────────┬──────────────────────┘
               │ 세션 종료 후
┌──────────────▼──────────────────────┐
│      M365 클라우드 (장기)            │  영구 보존·다음 세션 활용
│      Copilot 메모리·요약             │
└─────────────────────────────────────┘
```

> **결론:** "메모리 강화"가 맞다. 단 **저장**이 목적이 아니라, **컨텍스트 윈도우가 부족할 때 과거 턴을 정확히 검색해 꺼내오는 것**이 핵심이다. RAG가 문서에 적용된 것처럼(9.4), **대화 자체에 RAG를 적용**한 구조다 — 6장 "구조화된 노트·just-in-time 회상"의 로컬 구현체.

---
