---
layout: "chapter"
date: 2026-07-15
title: "새 Copilot Studio 경험으로 문서 레드라이닝하기"
short_title: "Copilot Studio 문서 레드라이닝"
description: "Microsoft Word의 변경 내용 추적(Track Changes)을 활용해 문서를 비교하는 레드라이닝 Skill을 새 Copilot Studio 오케스트레이터 위에서 구현한 과정을 소개합니다."
order: 9
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/redlining-documents-new-copilot-studio-experience/"
source_author: "AndrewHessMSFTraemone"
source_published: "2026-07-15"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/redlining-documents-new-copilot-studio-experience/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 AndrewHessMSFT, raemone(@AndrewHessMSFTraemone) 원문 [Redlining Documents with the New Copilot Studio Experience](https://microsoft.github.io/mcscatblog/posts/redlining-documents-new-copilot-studio-experience/)(2026-07-15)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/redlining-documents-new-copilot-studio-experience/header.png' | relative_url }}" alt="빨간 펜으로 종이에 그림을 그리는 고양이" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

> **Skill 다운로드:** CAT Agent Skills 갤러리에서 [redlining-content](https://microsoft.github.io/cat-agent-skills/skills/redlining-content/)를 다운로드해 설치할 수 있습니다.

"무엇이 바뀌었나요?" 벤더가 어딘가에 수정 내용이 묻혀 있는 계약서를 이메일로 보내왔고, 여러분은 승인(Accept)하거나 거절(Reject)할 수 있는 변경 내용 추적으로 모든 차이를 선명하게 표시해 보고 싶습니다. 간단하게 들리죠? 손으로 작업하면 몇 시간이 걸릴 수 있고, 첫 번째 자동화 시도도 괴롭도록 느렸습니다. 결국 100페이지 문서를 몇 초 만에 처리할 수 있게 됐습니다.

먼저 변경 내용 추적이 실제로 어떻게 동작하는지 살펴보겠습니다. Word `.docx` 파일은 사실 텍스트를 설명하는 태그로 감싼 XML이 가득한 zip 파일입니다. 변경 내용 추적을 켜고 편집하면, Word는 단순히 텍스트를 바꾸는 것이 아니라 편집 내용을 특수 XML 태그로 감쌉니다. 추가한 내용은 `w:ins`로, 삭제한 내용은 `w:del`로 감싸집니다(삭제된 단어는 취소선으로 표시된 채 유지됩니다). 각 태그에는 변경자와 변경 시간도 기록됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/redlining-documents-new-copilot-studio-experience/xml_for_redlining.png' | relative_url }}" alt=".docx 파일 내부의 w:ins 및 w:del 변경 내용 추적 태그를 보여주는 OOXML 마크업" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>`.docx` 내부에서 추적된 변경은 `w:ins`와 `w:del` 태그로 감싼 텍스트에 불과합니다.</figcaption>
</figure>

"추적된 변경"이란 결국 이것입니다. Word가 변경 내용으로 표시해 승인 또는 거절할 수 있도록 하는 OOXML 마크업으로 태그된 텍스트.

설명은 단순하지만 구현은 복잡합니다. 출력물은 각 편집이 진짜 OOXML 마크업, 즉 삽입은 `w:ins`, 삭제는 `w:del`로 배치된 `.docx`여야 하며, 원본의 정확한 서식이 유지되어 Microsoft Word에서 깔끔하게 열려야 합니다. 가운데 정렬된 제목은 가운데 정렬로, 14pt 제목은 14pt로, 표는 표로 남아야 합니다. 충실도가 틀어지면 "레드라인"은 그냥 문서의 열화 복사본에 불과합니다.

이것은 [새 Copilot Studio 오케스트레이터](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/agents-experience/overview)를 위한 redlining-content [Skill](https://microsoft.github.io/mcscatblog/posts/skills-for-copilot-studio/)을 구축한 이야기입니다. 첫 번째 작동 버전은 문서당 15분이 걸렸습니다. 최종 버전은 15초입니다. [에이전틱 루프(agentic loop)](https://microsoft.github.io/mcscatblog/posts/agentic-improvement-loop/)가 어떻게 그 간격을 좁혔는지 소개합니다.

## 루프가 자체 Python 참조 스크립트를 작성한 방법

우리에게 필요한 것은 `.docx` 또는 `.dotx` 파일을 `.docx` 또는 `.pdf` 파일과 비교할 수 있는 프로세스였습니다. 이를 위해 Python을 사용했습니다.
가장 중요하게 만든 것은 Python 자체가 아니었습니다. Python을 *발견하는 과정*이었습니다. 우리는 빈 파일에서 레드라인 엔진을 직접 작성하려고 앉은 적이 없습니다. 에이전틱 루프에 맡기고, 그 결과에서 살아남은 것을 코드화했습니다.

네 가지 뚜렷한 단계로 진행됐으며, 각 단계가 다음 단계를 가르쳐 주었습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/redlining-documents-new-copilot-studio-experience/phases.png' | relative_url }}" alt="레드라이닝 Skill 구축의 네 단계" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>빈 파일에서 코드화된 참조 스크립트까지, Skill을 발전시킨 네 단계.</figcaption>
</figure>

### 1단계: 코드 없이 시작하기

최선의 첫 수는 **코드 없이** 시작하는 것이었습니다.

에이전트는 의존할 스크립트 없이 두 파일을 추론해 레드라인을 직접 생성하려 했습니다. 레드라인이 틀렸습니다. 최악의 실패는 두 파일 형식을 연결하기 위해 PDF로 *변환*하려 했다는 점입니다. 즉, DOCX 템플릿과 업로드된 PDF 모두 형식 변환을 거쳤습니다. DOCX에서 PDF로, 다시 되돌아가는 과정에서 서식이 완전히 망가졌습니다. 레이아웃이 바뀌고, 간격이 달라졌으며, 그 엉망진창이 된 결과물 위에서 변경 내용 추적을 실행하자, 사람이 실제로 수정하지 않은 단락 나누기와 간격 차이를 "레드라인"으로 표시했습니다. 출력물은 노이즈로 가득 찼고, 검토자가 신뢰할 수 없는 결과였습니다. 원하던 것이 아니었지만, 피해야 할 것을 정확히 알려줬습니다. 형식 변환은 절대 하지 말 것.

우리에게는 DOCX 또는 DOTX 형태의 템플릿이 있습니다. 그 초기 템플릿을 그대로 사용하고 변경 사항만 업데이트하면 됩니다!

### 2단계: 루프에 맡기기

변환이 해롭다는 것을 알게 된 후, 에이전트에게 **직접 레드라인을 작성하는 Python을 짜도록** 풀어주고 루프를 돌게 했습니다. 이것이 에이전틱 루프가 그 이름을 얻는 지점입니다. 에이전트는 스크립트를 작성하고, 실행하고, 오류에 부딪히고, 트레이스백을 읽고, 다시 작성하고, 다시 실행하기를 우리의 개입 없이 반복합니다. 각 실패가 스승이었습니다. `lxml` 충돌, 잘못된 XML, 잘못된 엘리먼트 중첩, 충돌하는 리비전 ID 등의 크래시를 거치며 실패/재작성 사이클이 약 **15분** 동안 계속됐습니다. 그리고 마침내 한 번의 실행에서 깔끔하게 열리는 `.docx`가, 진짜 변경 내용 추적과 실제로 올바른 레드라인과 함께 출력됐습니다.

> 실패는 낭비가 아니라 반복 그 자체입니다. 루프가 읽는 모든 트레이스백은 올바른 코드의 공간을 좁혀줍니다. 우리의 역할은 엔진을 작성하는 것이 아니라, 루프에 명확한 목표를 제시하고 시행착오를 통해 구현에 수렴하도록 두는 것이었습니다.

### 3단계: 하드코딩 제거하기

마침내 에이전트는 올바른 레드라인 문서를 출력했습니다. 하지만 특정 단락 인덱스, 리터럴 문자열, 고정 ID, 하드코딩된 파일 경로로 가득 차 있었습니다. 업로드된 파일 이름과 템플릿 파일 이름이 스크립트에 직접 박혀 있었습니다. 그래서 에이전트에게 한 가지 지시를 더 했습니다. **모든 하드코딩된 값을 제거하고 범용화하라.** 특정 단락 인덱스는 "이 단어가 속하는 단락"이 됐고, 리터럴 치환 문자열은 템플릿과 제출물 사이의 차이(diff)가 됐습니다.

### 4단계: 의사 코드(Pseudocode)

상수를 제거한 결과물은 본질적으로 **하드코딩된 값 없는 가벼운 의사 코드**였습니다. 특정 파일에 종속된 실제 코드가 아니라, 에이전트가 무엇을 작성할지 파악하려 할 때의 재사용 가능한 출발점이었습니다. 이것이 바로 `scripts/redline.py`라는 이름으로 Skill에 포함됐습니다. 이것이 핵심 트릭입니다. 이전에는 에이전트가 매 요청마다 그 실패/재작성 루프를 통해 해법을 재발견해야 했습니다. 이후에는 에이전트가 코드화된 스크립트를 *실행*하기만 하면 됩니다. 비용이 큰 부분, 즉 올바른 코드를 작성하려는 에이전틱 실험 루프가 이제는 의사 코드의 실제 지침으로 미리 처리됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/redlining-documents-new-copilot-studio-experience/meta-lesson.png' | relative_url }}" alt="에이전틱 루프의 발견을 재사용 가능한 스크립트로 코드화하는 메타 교훈" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>메타 교훈: 에이전틱 루프가 발견한 것을 재사용 가능한 스크립트로 코드화합니다.</figcaption>
</figure>

> 동일한 출력, 약 60배 빠름. 루프의 발견을 스크립트로 코드화하면 15분짜리 추론 마라톤이 15초짜리 함수 호출로 바뀝니다.

## 장벽: pip install 불가

이 프로젝트의 모든 흥미로운 제약은 하나의 사실에서 비롯됩니다. 새 Copilot Studio 런타임은 Python 패키지 설치를 허용하지 않습니다. 컨테이너에 있는 것이 전부입니다. `pdf2docx`가 유용했을 수 있지만 사용할 수 없었습니다. 없는 것이고, `pip install`도 없습니다.

다음은 출시 전에 시도한 모든 PDF→DOCX 접근 방식과 각각의 결과입니다.

| 접근 방식 | 서식 | 표 | 정렬 | 결론 |
|---|---|---|---|---|
| 텍스트 추출 → 문서 재구성 | 손실 | 단순 텍스트 | 손실 | 실패 |
| `pdf2docx` | N/A | N/A | N/A | 사용 불가 |
| `pymupdf` | N/A | N/A | N/A | 사용 불가 |
| `python-docx` (출력 구성) | 양호 | 보통 | 스타일 초기화 | 추상화 과다 |
| `pypdfium2` + 재구성 | 정확 | 실제 표 | 정확 | 이미지만 |
| **템플릿 + 단어 차이(`pdfplumber`로 PDF 읽기, 변환 없음)** | 바이트 단위 완벽 | 셀 단위 | 네이티브 | **채택** |

_PDF를 레드라인으로 변환하려 시도한 접근 방식. DOCX로 변환하는 방법은 실패했거나 사용 불가였으며, `pdfplumber`로 PDF 텍스트를 읽고 템플릿과 차이를 비교하는 방법이 효과적이었습니다._

반복하는 과정에서 PDF를 DOCX로 변환하기 위해 여러 Python 패키지를 시도했습니다. 하지만 명백한 답이 처음부터 있었습니다. `pdfplumber`는 *사용 가능했고*, PDF 텍스트를 직접 읽을 수 있습니다. 그러니 단순하게 가면 됩니다. 초기 템플릿은 전혀 변환하지 않습니다. DOTX 또는 DOCX로 유지하고, `pdfplumber`를 사용해 제출물의 단어를 가져온 뒤, 레드라이닝 변경 사항으로 템플릿을 업데이트합니다.

> Copilot Studio에서 현재 사용 가능한 Skill은 향후 변경될 수 있습니다.

PDF를 Word 문서로 *변환*하려고 계속 시도했습니다. 처음에는 그것이 문제처럼 보였는데, 사실은 전혀 변환할 필요가 없다는 것을 깨달았습니다. 사용 가능한 것은 `pdfplumber`입니다. 이것은 레이아웃 인식 텍스트 추출기로([페이지 단위 PDF 인용](https://microsoft.github.io/mcscatblog/posts/pdf-page-level-citations/)의 기반과 동일), 필요한 것이 바로 이것이었습니다. Skill은 아무것도 변환하지 않습니다. `pdfplumber`로 제출물의 *단어*를 읽고, 이미 보유한 Word 템플릿에 직접 레드라인을 구성합니다.

## 돌파구 이후

이 재구성이 오늘 출시되는 Skill이 됐습니다. 출력물은 *실제 초기 템플릿* 그 자체이며, 리비전이 `w:ins` / `w:del` 엘리먼트로 직접 삽입됩니다. 변환 없음, 골치 없음, 불필요한 레드라이닝을 유발할 수 있는 상속된 스타일도 없습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/redlining-documents-new-copilot-studio-experience/folder-structure.png' | relative_url }}" alt="redlining-content Skill의 폴더 구조" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>redlining-content Skill의 최종 폴더 구조.</figcaption>
</figure>

최종 파일 구조는 다음과 같습니다.
- **Assets 폴더** — `template.dotx`
- **References 폴더** — `docx-submissions.md`, `pdf-submissions.md`
- **Scripts 폴더** — `redline.py`
- **SKILL.MD** — 전체를 묶어주는 지침

런타임에서 Skill이 실제로 하는 일은 다음과 같습니다.
1. 두 파일을 사용합니다. Skill Assets 폴더에 번들된 기준선인 템플릿(DOTX 또는 DOCX)과, 사용자가 업로드하는 제출물(DOCX 또는 PDF).
2. 각 파일에서 단어를 읽습니다. Word 파일은 단순 단락 텍스트로, PDF는 `pdfplumber`로 텍스트 추출합니다(PDF를 Word로 변환하지 않음).
3. 제출된 문서 유형에 따라 포함된 참조 중 하나(`docx-submissions.md` 또는 `pdf-submissions.md`)를 읽도록 에이전트에게 지시합니다.
4. `difflib.SequenceMatcher`를 사용해 두 파일을 두 개의 평탄한 단어 목록으로 한 번에 비교하므로, 줄 바꿈과 페이지 나누기가 거짓 차이를 만들지 않습니다. 실제 단어 변경만 카운트됩니다.
5. 변경되지 않은 단락은 바이트 단위로 유지하고(모든 원본 서식 보존), 실제로 변경된 단락만 재구성합니다.
6. 모든 차이를 Word 변경 내용 추적으로 표시합니다. 삽입은 `<w:ins>`, 삭제는 `<w:del>`로 감쌉니다.
7. 모든 변경은 "Copilot Studio AI"가 작성한 것으로 기록됩니다.
8. 표(DOCX 제출의 경우)는 각 셀의 너비/테두리/음영을 유지하면서 셀 단위로 차이를 비교합니다. PDF 표는 그대로 통과합니다.
9. 변경 내용 추적이 켜진 일반 DOCX를 출력합니다. 모든 변경과 삭제가 표시됩니다.

> PDF 레드라인은 검토용 최선 초안으로 취급하세요. 문자 단위의 완벽한 비교가 필요하다면 `.docx` 제출이 고충실도 경로입니다. 실제 구조를 담고 있기 때문입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/redlining-documents-new-copilot-studio-experience/document-redlined.png' | relative_url }}" alt="레드라이닝된 문서의 직접 결과물" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>이 Skill은 100페이지 이상의 문서에서도 테스트됐습니다.</figcaption>
</figure>

## 이것은 Copilot Studio용인가, Cowork용인가?

대략적으로 말하면, 작업 주변에 비즈니스 프로세스가 감싸여 있는지 여부에 따라 다릅니다. "이 두 문서를 비교해서 레드라인 해줘"가 전부이고 더 큰 워크플로가 없다면, [Cowork](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/cowork/)가 더 적합할 수 있습니다. 파일을 가리키고 작업하게 두면 됩니다.

하지만 특정 문서와 특정 프로세스의 맥락에서 운영하는 순간, Copilot Studio가 앞서나갑니다. 항상 레드라인 처리하는 고정된 템플릿이 있거나, 이메일에서 수신된 제출물을 가로채 라우팅하고, 규칙을 적용하고, 매번 변경 내용이 추적된 문서를 반환해야 하는 경우를 생각해보세요. 일회성이 아니라 반복 가능한 파이프라인이며, 이것이 바로 작성된 MCS Skill이 빛을 발하는 곳입니다.

그래서 이것은 의도적으로 Copilot Studio입니다. 에이전틱 루프가 개발 중에 Cowork 스타일의 발견을 한 번 하게 두고, 그것을 매 요청마다 동일한 방식으로 실행되는 결정적인 Skill로 고정했습니다. 그렇다고 Cowork에서 동일한 접근 방식을 취하는 것을 막는 것은 없습니다. 비즈니스 요구에 맞는 방법을 사용하세요.

## 핵심 교훈

- **루프가 올바른 코드를 작성하게 하라.** 코드 없이 먼저 실행하고, 에이전트가 실패 루프를 거쳐 작동하는 스크립트에 도달하게 두세요. 실패가 이 반복적 접근의 핵심입니다.

- **그런 다음 하드코딩을 제거하고 코드화하라.** 작동하는 스크립트는 하나의 입력에 하드코딩됩니다. 모든 리터럴을 로직으로 바꾸고, 범용화된 의사 코드를 Skill에 업로드해 에이전트가 재발견 대신 실행하게 하세요. **그것이 15분을 15초로 만드는 방법입니다.**

- **네이티브 승인/거절 사용.** 모든 변경은 "Copilot Studio AI"에 의해 레드라인 처리되며 승인 또는 거절할 수 있습니다.

- **이미 완벽한 것은 변환하지 마라.** 템플릿은 완벽한 Word 문서입니다. 리비전을 삽입하거나 변환하는 것이 항상 필요한 것은 아니며, 매번 재구성하는 것보다 낫습니다.

직접 스크립트를 작성하는 대신 에이전틱 루프에 맡겨본 경험이 있으신가요? 댓글로 어떻게 됐는지 알려주세요.
