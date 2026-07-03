---
layout: "chapter"
date: 2026-02-19
title: "토픽에 에이전트 흐름 추가해 자동화하기"
short_title: "에이전트 흐름 추가"
description: "Adaptive Card 입력으로 백엔드 흐름을 트리거하는 방법을 배웁니다."
order: 9
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/09-add-an-agent-flow/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-02-19"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/09-add-an-agent-flow/"
image: "/assets/academy/recruit-09-add-an-agent-flow/9.1_01_AddNewAgentFlow.png"
---

<div class="info-box note translated-post" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 09: Add an agent flow to your Topic for automation](https://microsoft.github.io/agent-academy/recruit/09-add-an-agent-flow/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

🎥 [YouTube 워크스루 보기](https://www.youtube.com/watch?v=vtLZJT3eBXg)

## 🎯 미션 브리핑

이제 에이전트는 사용자와 대화하고 정보를 제공할 수 있습니다. 하지만 실제 업무 가치를 만들려면 **행동**까지 해야 합니다. 이번 미션에서는 agent flow를 추가해 대화형 에이전트를 자동화 중심 에이전트로 확장합니다.

이번 미션이 끝나면 Adaptive Card로 입력을 받고, SharePoint에서 데이터를 조회하고, 관리자에게 이메일을 보내고, 사용자에게 자연스럽게 결과를 알려주는 **종단간 장치 요청 자동화**를 구성하게 됩니다.

<div class="info-box note" markdown="1">
**참고**

이 실습의 스크린샷과 Copilot Studio 화면이 다르면 오른쪽 위의 **New Experience**를 꺼서 여기에서 사용하는 **classic experience**로 전환하세요.
</div>

## 🔎 학습 목표

이번 미션에서는 다음을 배웁니다.

1. agent flow가 무엇인지, 자동화를 위한 Power Automate cloud flow와 어떻게 다른지 이해합니다.
1. AI 작업, 자연어 작성 등 agent flow를 강력하게 만드는 핵심 기능을 이해합니다.
1. agent flow 디자이너와 동적 데이터 처리를 위한 식(expression) 사용법을 익힙니다.
1. SharePoint 데이터와 이메일 알림을 연결하는 장치 요청 자동화를 완성합니다.

## 🤔 agent flow란?

agent flow는 반복 작업을 자동화하고 앱·서비스를 연결하는 강력한 방식입니다. 에이전트가 실행할 수 있는 **구조화된 단계별 워크플로**라고 생각하면 됩니다. 알림 전송, 레코드 업데이트, 이벤트 대응 같은 일을 자동으로 처리하게 해줍니다.

자율형 에이전트가 상황에 따라 AI로 판단하는 것과 달리, agent flow는 **결정적(deterministic) 워크플로**입니다. 즉 같은 입력이 들어오면 항상 같은 경로를 따라가므로 결과가 일관되고 신뢰할 수 있습니다.

간단히 말하면 다음과 같습니다.

- 사용자에게 _말만 하는_ 것이 아니라 실제로 _일을 처리_ 하게 도와줍니다.
- 여러 topic과 agent에서 재사용할 수 있고, 사용자 메시지·이벤트·다른 앱/서비스에서 트리거될 수 있습니다.

## 🙋🏽 그런데 Power Automate cloud flow와는 무엇이 다를까요?

agent flow와 Power Automate cloud flow는 모두 자동화를 돕지만, 목적과 동작 방식이 다릅니다.

### 🤖 Copilot Studio의 agent flow

**용도**

- Copilot Studio의 대화형·자율형 agent(에이전트 지침 기반)에 맞춰 설계되었습니다.
- 비즈니스 시스템과 상호작용하는 지능형 AI 자동화에 초점을 둡니다.

**장점**

- Copilot Studio 안에서 바로 만들고 관리하기 쉽습니다.
- 휴가 요청 제출처럼 _대화 중_ 발생하는 업무를 자동화하기 좋습니다.
- 별도의 Power Automate 라이선스가 없어도 Copilot Studio 사용량 기준으로 과금되므로 시간과 비용을 아낄 수 있습니다.

**제한 사항**

- 공유, 복사, 공동 소유자 지정이 불가합니다.
- Copilot Studio 안에서만 보이고 사용할 수 있습니다.
- 현재 agent의 event trigger는 Power Automate maker portal에서 편집할 수 있습니다.

### ☁️ Power Automate cloud flow

**용도**

- 다양한 앱과 서비스를 아우르는 범용 자동화에 적합합니다.
- 단독으로 실행되거나 agent flow와 함께 동작할 수 있습니다.

**장점**

- 폭넓은 커넥터를 제공합니다.
- agent 밖에서 돌아가는 프로세스 자동화에 적합합니다.
- 팀 간 공유, 재사용, 관리가 가능합니다.

**요구 사항**

- 사용하려면 Power Automate 라이선스가 필요합니다.

### 📗 요약

| 선택지 | 이런 경우에 적합 |
| :- | :- |
| Agent flow | agent 내부에서 작업을 자동화하고, AI를 활용하며, 모든 구성을 Copilot Studio 안에 유지하고 싶을 때 |
| Power Automate cloud flow | 여러 앱과 서비스를 연결하거나, agent 밖에서 동작하는 워크플로를 만들고 싶을 때 |

## 👍🏻 왜 agent flow를 사용할까요?

agent flow는 항상 **고정된 경로**를 따라가며, 같은 입력에 대해 같은 결과를 냅니다.

그래서 다음과 같은 장점이 있습니다.

- **신뢰성** — 매번 같은 방식으로 동작합니다.
- **예측 가능성** — 어떤 결과가 나올지 알 수 있습니다.
- **규칙 기반** — 직접 정의한 단계대로 움직입니다.

추가 장점도 있습니다.

- **자동화** — 양식 제출, 알림 발송 같은 반복 작업을 처리합니다.
- **연결성** — ServiceNow, SharePoint, Salesforce 등 1400개 이상의 커넥터와 연결할 수 있고, 필요하면 커스텀 커넥터도 만들 수 있습니다.
- **긴밀한 통합** — agent 로직 일부로 동작하며, 사용자 메시지나 대화 중 액션으로 직접 호출됩니다.
- **확장성** — 여러 agent나 시나리오에서 재사용할 수 있습니다.
- **노코드/로우코드** — 자연어 또는 시각적 디자이너로 구성할 수 있습니다.
- **올인원 플랫폼** — 설계, 테스트, 배포를 모두 Copilot Studio 안에서 처리합니다.

## 🏄🏻‍♂️ agent flow가 agent를 어떻게 강화할까요?

agent flow는 agent가 사용자와 대화하는 수준을 넘어 실제 시스템과 상호작용하며 일을 처리하도록 만들어 줍니다.

예를 들어 재무 부서에서 공급업체 청구서를 많이 받는다고 가정해 보겠습니다. 일반적으로는 사람이 청구서를 읽고, 금액·날짜·발신자 같은 핵심 정보를 추출하고, 내부 기록과 맞는지 확인한 다음, 승인자에게 전달해야 합니다.

Copilot Studio의 agent flow를 사용하면 이 과정을 자동화할 수 있습니다. 청구서가 들어오는 즉시 agent는 다음을 수행합니다.

1. 지능형 문서 처리로 핵심 정보를 읽어냅니다.
1. 엔터프라이즈 데이터와 대조해 내용이 올바른지 확인합니다.
1. 적절한 담당자에게 승인 요청을 보냅니다.

이렇게 하면 시간을 절약하고 오류를 줄이며 전체 프로세스를 훨씬 매끄럽게 만들 수 있습니다.

### 이렇게 생각해 보세요

- **Agents**: 똑똑하게 판단하는 의사결정자
- **Agent flows**: 안정적으로 실행하는 수행자

### 왜 중요할까요?

- 신뢰할 수 있는 자동화와 유연한 AI를 함께 얻을 수 있습니다.
- 비즈니스 요구가 바뀌어도 쉽게 수정하고 확장할 수 있습니다.
- 여러 팀으로 자동화를 확장할 수 있습니다.

## 🔌 agent flow를 강력하게 만드는 핵심 기능

1. **자연어 작성**
   - 하고 싶은 일을 평문 영어로 설명할 수 있습니다.
   - Copilot이 의도를 이해해 흐름을 구성합니다.
   - 코드를 직접 작성할 필요가 없습니다.

1. **AI actions**
   - 문서나 이미지를 읽고 이해합니다.
   - 긴 내용을 짧고 유용하게 요약합니다.
   - 더 나은 추천이나 판단을 지원합니다.

1. **Generative actions**
   - 흐름이 실시간으로 적응할 수 있게 합니다.
   - 바뀌는 정보에 따라 단계 계획을 조정할 수 있습니다.

1. **Integration actions**
   - Outlook, Microsoft Teams, ServiceNow, SharePoint 등과 연결합니다.
   - 기본 제공 1400+ 커넥터 또는 직접 만든 커스텀 커넥터를 사용할 수 있습니다.

1. **Human in the loop**
   - 사람이 검토하거나 승인해야 하는 단계를 추가할 수 있습니다.
   - [Advanced approvals](https://learn.microsoft.com/microsoft-copilot-studio/flows-advanced-approvals?WT.mc_id=power-172621-ebenitez)는 리마인더, 위임, 다단계 승인을 지원합니다.

## ⚙️ 동작 방식

1. **Trigger**

   질문, topic에서의 호출, 예약 시간, 다른 시스템의 이벤트 등으로 흐름이 시작됩니다.

1. **Actions**

   그다음 agent가 수행할 단계입니다. 예를 들어 이메일 보내기, API 호출, ServiceNow 티켓 업데이트 등이 여기에 해당합니다.

## 🧶 agent flow 만드는 방법

1. **Natural language**: agent가 무엇을 하길 원하는지 설명하면 Copilot이 흐름을 생성합니다.
1. **Designer canvas**: agent flow 디자이너에서 액션, 조건, 루프를 끌어다 놓아 구성합니다.

## 🎨 agent flow 디자이너란?

Copilot Studio의 시각적 도구로, 작업 수행에 필요한 단계별 흐름을 만들고 편집하고 관리할 수 있습니다. agent flow가 익숙하지 않아도 비교적 쉽게 사용할 수 있도록 설계되었습니다.

### agent flow 디자이너의 핵심 기능

1. **시각적 캔버스**
   - 흐름 전체를 다이어그램처럼 볼 수 있습니다.
   - 확대/축소, 화면 맞춤, 미니맵으로 큰 흐름도 탐색할 수 있습니다.

1. **액션 추가/삭제**
   - _plus (+)_ 버튼으로 새 액션을 추가합니다.
   - 커넥터 액션을 검색해 설정할 수 있습니다.
   - _three dots (⋮)_ 메뉴에서 _Delete_로 삭제할 수 있습니다.

1. **파라미터 확인**
   - 각 액션을 클릭해 _parameters_ 설정을 확인하거나 수정합니다.
   - 수동 값 또는 _expressions_ 를 사용할 수 있습니다.

1. **버전 기록**
   - 저장할 때마다 버전이 기록됩니다.
   - 필요하면 이전 버전을 확인하거나 복원할 수 있습니다.

1. **오류 검사**
   - _Flow Checker_ 가 오류를 강조 표시합니다.
   - 게시 전에 모든 오류를 해결해야 합니다.

1. **게시와 테스트**
   - 오류가 없으면 게시해 라이브로 전환합니다.
   - _Test_ 기능으로 수동 또는 자동 실행 후 동작을 검증할 수 있습니다.

### 왜 agent flow 디자이너를 사용할까요?

- **시각적이고 직관적** — 드래그와 클릭만으로 흐름을 만들 수 있습니다.
- **안전한 실험** — 버전 기록으로 언제든 되돌릴 수 있습니다.
- **내장 테스트** — 운영에 올리기 전에 검증할 수 있습니다.

## 🔤 expression이란 무엇인가요?

expression은 agent flow가 데이터를 다루도록 돕는 작은 수식 또는 명령입니다. 값 계산, 텍스트 서식 지정, 조건 판단, 특정 입력 추출 등에 사용합니다.

### 왜 expression을 쓰나요?

expression으로 다음을 할 수 있습니다.

- **데이터 처리 방식 사용자 지정** — 이름 합치기, 날짜 형식 바꾸기
- **판단 로직 구현** — 값이 10보다 크면 다른 동작 수행
- **데이터 변환** — 소문자 변환, 문자열 일부 추출
- **자동화 로직 구현** — 전체 코드를 쓰지 않고도 로직 구성

### expression은 어떻게 생겼나요?

expression은 함수(function)를 사용합니다. 아래 설명은 전 Microsoft MVP Jerry Weinstock의 설명을 바탕으로 정리한 것입니다.

<div class="info-box note" markdown="1">
**인용**

함수는 단순하거나 복잡한 연산을 통해 데이터를 변환하는 내장 로직입니다.

함수 덕분에 코드를 직접 작성하지 않고도 expression을 만들 수 있습니다.

제가 agent flow의 함수를 설명할 때 자주 드는 비유는 Excel 함수입니다. 표의 셀이나 범위 값을 입력으로 선택한 뒤 함수를 적용해 원하는 결과로 바꾸는 방식과 비슷합니다. 예를 들어 `COUNT` 함수는 숫자가 들어 있는 셀 개수를 계산합니다.

agent flow에서는 표의 셀 대신 trigger나 action의 출력 데이터를 참조해 expression을 만듭니다. 앞선 예를 이어가면, SharePoint의 _Get items_ 커넥터 액션이 반환한 항목 수를 구할 때 `length` 함수를 사용할 수 있습니다.
</div>

### 왜 함수가 중요할까요?

함수를 사용하면 agent flow는 다음과 같이 좋아집니다.

- **더 똑똑해짐** — 입력이나 조건에 따라 반응할 수 있습니다.
- **더 유연해짐** — 데이터 처리 방식을 원하는 대로 조정할 수 있습니다.
- **더 효율적임** — 수작업 단계를 자동화할 수 있습니다.

### 자주 쓰는 함수

아래는 agent flow에서 자주 쓰는 함수입니다. 전체 목록은 [reference guide](https://learn.microsoft.com/azure/logic-apps/workflow-definition-language-functions-reference?WT.mc_id=power-172621-ebenitez)를 참고하세요.

#### 🔡 텍스트

- `concat()` - 두 개 이상의 텍스트를 이어 붙입니다.
  - 예: `concat('Hello ', firstName)` → “Hello John”

- `toLower()` / `toUpper()` - 대소문자를 변환합니다.
  - 입력값 표준화에 유용합니다.

- `substring()` - 문자열 일부를 추출합니다.
  - 예: 이름 앞 세 글자 가져오기

- `trim()` - 텍스트 앞뒤 공백을 제거합니다.

#### 🔢 수학과 숫자

- `add()`, `sub()`, `mul()`, `div()` - 기본 사칙연산
  - 예: `add(5, 3)` → 8

#### 📅 날짜와 시간

- `utcNow()` - 현재 UTC 날짜/시간을 가져옵니다.
  - 타임스탬프에 적합합니다.

- `addDays()`, `addHours()` - 날짜에 시간을 더합니다.
  - 예: `addDays(utcNow(), 7)` → 지금부터 7일 후

- `formatDateTime()` - 날짜를 읽기 쉬운 문자열로 바꿉니다.
  - 예: Monday, July 7, 2025

#### ✅ 논리

- `if()` - 조건이 참일 때와 거짓일 때 다른 값을 반환합니다.
  - 예: `if(score > 50, 'Pass', 'Fail')`

- `equals()` - 두 값이 같은지 확인합니다.

- `and()`, `or()`, `not()` - 여러 조건을 결합합니다.

#### 🪣 기타 유용한 함수

- `coalesce()` - 비어 있지 않은 첫 값을 반환합니다.
  - 기본값/대체값 처리에 유용합니다.

- `guid()` - 고유 ID를 생성합니다.
  - 추적이나 로깅에 유용합니다.

- `length()` - 문자열이나 배열의 길이를 계산합니다.

## ⭐ 모범 사례

Copilot Studio에서 agent flow를 만들 때 다음을 권장합니다.

1. **단순하게 시작하고 점진적으로 확장하기**
   - 먼저 메시지 보내기처럼 작은 작업부터 시작합니다.
   - 기본 자동화를 테스트한 뒤 단계를 늘립니다.

1. **명확하고 설명적인 액션 이름 사용하기**
   - 각 단계가 무엇을 하는지 팀이 바로 이해할 수 있어야 합니다.
   - 예: SharePoint 커넥터의 기본 이름 "Update item" 대신 "Update device status"처럼 바꿉니다.

1. **게시 전 오류 확인하기**
   - **flow checker** 로 문제를 찾고 수정합니다.
   - 오류가 있으면 게시할 수 없습니다.

1. **충분히 테스트하기**
   - 저장·게시가 된다고 해서 원하는 대로 동작하는 것은 아닙니다.
   - _Test_ 기능으로 수동/자동 실행 후 결과를 확인하세요.

1. **Version History 활용하기**
   - 자주 저장해 이전 버전으로 돌아갈 수 있게 합니다.
   - _Version History_ 패널에서 확인·복원할 수 있습니다.

1. **파라미터와 expression을 현명하게 사용하기**
   - action을 동적으로 만들기 위해 파라미터를 적극 사용합니다.
   - 수동 값, expression, _dynamic content_ 를 조합할 수 있습니다.

1. **사용하지 않는 액션 삭제하기**
   - 더 이상 필요 없는 액션은 제거해 흐름을 깔끔하게 유지합니다.

## 🧪 Lab 09 - 자동화를 위한 agent flow 추가와 topic 기능 확장

이제 adaptive card와 topic/node의 고급 기능을 활용해 기존 topic을 더 강력하게 만들어 보겠습니다.

### ✨ 사용 사례

**역할**: 직원의 관리자

**원하는 것**: 장치 요청을 받기

**목적**: 직원이 요청한 장치를 검토하기

시작해 봅시다.

### Prerequisites

1. **SharePoint list**

   [Lesson 00 - Course Setup - Step 3: Create new SharePoint site]({{ '/chapters/academy-recruit-00-course-setup/' | relative_url }})에서 만든 **Devices** SharePoint list를 사용합니다.

   아직 **Devices** SharePoint list를 준비하지 않았다면 먼저 [Lesson 00 - Course Setup]({{ '/chapters/academy-recruit-00-course-setup/' | relative_url }})를 완료하세요.

1. **Contoso Helpdesk Agent**

   이전에 [Lesson 06 - Create a custom agent using natural language with AI and grounding it with your data]({{ '/chapters/academy-recruit-06-create-agent-from-conversation/' | relative_url }})에서 만든 agent를 계속 사용합니다.

### 9.1 agent flow 만들기

이번 실습에서는 선택한 장치의 SharePoint 항목을 조회하고, 장치 세부 정보를 관리자에게 이메일로 보내는 agent flow를 만듭니다.

1. **Request device** topic에서 **Ask with adaptive card** 노드 아래에 새 노드를 추가합니다. **Add a tool** 을 선택하고, 오른쪽 **Basic tools** 탭에서 **New Agent flow** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_01_AddNewAgentFlow.png' | relative_url }}" alt="새 Agent flow 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>새 Agent flow 추가</figcaption>
   </figure>
1. Agent flow **Designer** 가 trigger와 action을 포함한 상태로 열립니다.

   - **Trigger** - When an agent calls the flow
     - Copilot Studio agent가 이 흐름을 호출할 때 실행됩니다.

   - **Action** - Respond to the agent
     - Copilot Studio agent로 값을 다시 반환할 수 있는 응답 액션입니다.

   trigger를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_02_SelectTrigger.png' | relative_url }}" alt="트리거 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>트리거 선택</figcaption>
   </figure>
1. 이제 agent flow에 여러 입력값을 추가합니다.

   - `DeviceSharePointId` - 사용자가 **Ask with adaptive card** 노드에서 선택한 장치의 SharePoint item ID
   - `User` - agent의 system variable에서 가져올 사용자 이름
   - `AdditionalComments` - 사용자가 adaptive card에 입력한 추가 의견

   먼저 `DeviceSharePointId` 입력부터 추가합니다. **+ Add an input** 을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_03_AddInput.png' | relative_url }}" alt="입력 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>입력 추가</figcaption>
   </figure>
1. 입력 형식으로 **Text** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_04_SelectText.png' | relative_url }}" alt="Text 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Text 선택</figcaption>
   </figure>
1. 입력 이름으로 다음 값을 입력합니다.

   ```text
   DeviceSharePointId
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_05_DeviceSharePointIdInput.png' | relative_url }}" alt="DeviceSharePointId 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>DeviceSharePointId 입력</figcaption>
   </figure>
1. 두 번째 입력 `User` 를 추가합니다. 같은 방식으로 **+ Add an input** 과 **Text** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_06_AddInput.png' | relative_url }}" alt="입력 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>입력 추가</figcaption>
   </figure>
1. 입력 이름으로 다음 값을 입력합니다.

   ```text
   User
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_07_UserInput.png' | relative_url }}" alt="User 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>User 입력</figcaption>
   </figure>
1. 세 번째 입력 `AdditionalComments` 도 같은 방식으로 추가합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_08_AddInput.png' | relative_url }}" alt="입력 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>입력 추가</figcaption>
   </figure>
1. 입력 이름으로 다음 값을 입력합니다.

   ```text
   AdditionalComments
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_09_AdditionalComments.png' | relative_url }}" alt="AdditionalComments 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>AdditionalComments 입력</figcaption>
   </figure>
1. `AdditionalComments` 입력은 선택값으로 바꿉니다. **ellipsis (...)** 메뉴에서 **Make the field optional** 을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_10_Optional.png' | relative_url }}" alt="선택 입력으로 전환" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>선택 입력으로 전환</figcaption>
   </figure>
1. trigger 구성이 끝났습니다. trigger 아래 **plus +** 아이콘을 눌러 새 action을 추가합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_11_AddAction.png' | relative_url }}" alt="액션 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>액션 추가</figcaption>
   </figure>
1. **Actions pane** 에서 다음을 검색합니다.

   ```text
   Get item
   ```

   검색 결과에서 **SharePoint connector** 의 **Get item** action을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_12_AddGetItemAction.png' | relative_url }}" alt="Get item 액션 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Get item 액션 추가</figcaption>
   </figure>
1. 이제 **Get item** action을 구성합니다.

   **Get item** action의 **Ellipsis (...)** 아이콘을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_13_SelectEllipsis.png' | relative_url }}" alt="줄임표 메뉴 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>줄임표 메뉴 선택</figcaption>
   </figure>
1. **Rename** 을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_14_SelectRename.png' | relative_url }}" alt="Rename 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Rename 선택</figcaption>
   </figure>
1. action 이름을 다음처럼 바꿉니다.

   ```text
   Get Device
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_15_RenameAction.png' | relative_url }}" alt="액션 이름 변경" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>액션 이름 변경</figcaption>
   </figure>
1. **Site Address** 에는 [Lesson 00 - Course Setup]({{ '/chapters/academy-recruit-00-course-setup/' | relative_url }})에서 만든 Contoso IT SharePoint site를 선택합니다.

   **List Name** 에는 **Devices** SharePoint list를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_16_SharePointSiteAndListParameters.png' | relative_url }}" alt="사이트와 목록 파라미터 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>사이트와 목록 파라미터 설정</figcaption>
   </figure>
1. **Id** 필드 오른쪽의 **lightning bolt** 또는 **fx** 아이콘을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_17_InsertExpressionIcon.png' | relative_url }}" alt="동적 콘텐츠 선택기 열기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>동적 콘텐츠 선택기 열기</figcaption>
   </figure>
1. **Dynamic content** 탭에서 다음을 검색합니다.

   ```text
   id
   ```

   검색 결과에서 trigger의 **DeviceSharePointId** 파라미터를 선택한 뒤 **Add** 를 눌러 **Id** 파라미터에 넣습니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_18_DeviceSharePointId.png' | relative_url }}" alt="DeviceSharePointId 입력 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>DeviceSharePointId 입력 선택</figcaption>
   </figure>
1. 이제 고급 파라미터 하나를 조정합니다. **Show all** 을 선택해 고급 파라미터를 표시합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_19_AdvancedParameters.png' | relative_url }}" alt="고급 파라미터 표시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>고급 파라미터 표시</figcaption>
   </figure>
1. **Limit Columns by View** 는 기본값이 **Use all columns (Do not limit)** 입니다. 반환 열을 제한하기 위해 이 값을 view로 바꿉니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_20_LimitColumnsByView.png' | relative_url }}" alt="Limit Columns by View 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Limit Columns by View 선택</figcaption>
   </figure>
1. **All Items** view를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_21_SelectView.png' | relative_url }}" alt="All Items view 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>All Items view 선택</figcaption>
   </figure>
1. _Get Device_ action 아래 **plus +** 아이콘으로 새 action을 추가합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_22_AddAnAction.png' | relative_url }}" alt="새 액션 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>새 액션 추가</figcaption>
   </figure>
1. 검색 상자에 다음을 입력합니다.

   ```text
   send an email
   ```

   검색 결과에서 **Office 365 Outlook connector** 의 **Send an email (V2)** action을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_23_SendAnEmail.png' | relative_url }}" alt="Send an email 액션 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Send an email 액션 선택</figcaption>
   </figure>
1. 아직 연결이 없다면 **Sign in** 으로 연결을 만들고 현재 로그인 계정을 사용합니다.

   action 이름은 다음으로 바꿉니다.

   ```text
   Send an email to manager
   ```

   이어서 입력 파라미터를 설정합니다.

   - **To**: 실습에서는 자신을 선택합니다. 실제 환경이라면 관리자나 Entra ID 프로필에서 관리자 정보를 가져오는 다른 action을 사용할 수 있습니다.
   - **Subject**:

     ```text
     Request type: new device
     ```

   - **Body**:

     ```text
     Hi,

     New device requested from

     Manufacturer:
     Model:
     Link to item in SharePoint
     Additional comments from:

     This is an automated email from Contoso Helpdesk Agent
     ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_24_RenameAndConfigureParameters.png' | relative_url }}" alt="액션 이름과 입력값 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>액션 이름과 입력값 설정</figcaption>
   </figure>
1. 이제 **Body** 파라미터에 trigger 또는 **Get item** action의 동적 콘텐츠를 추가합니다. 둘째 줄 끝에 공백을 넣고 trigger 입력인 **User** 를 삽입합니다.

   오른쪽 **lightning bolt** 또는 **fx** 아이콘을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_25_AddUserInput.png' | relative_url }}" alt="User 입력 추가 준비" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>User 입력 추가 준비</figcaption>
   </figure>
1. **Dynamic content** 탭에서 trigger의 **User** 입력을 선택하고 **Add** 를 누릅니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_26_SelectUserInput.png' | relative_url }}" alt="User 입력 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>User 입력 선택</figcaption>
   </figure>
1. 같은 방식으로 본문 나머지 줄에도 동적 콘텐츠를 넣습니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_27_UserInputAdded.png' | relative_url }}" alt="User 입력 추가 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>User 입력 추가 완료</figcaption>
   </figure>
1. `Manufacturer:` 옆 공백을 클릭한 뒤 **lightning bolt** 또는 **fx** 아이콘을 선택합니다.

   **Dynamic content** 탭에서 다음을 검색합니다.

   ```text
   manufacturer
   ```

   **Manufacturer value** 를 선택하고 **Add** 를 누릅니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_28_ManufacturerValueAdded.png' | relative_url }}" alt="Manufacturer 동적 콘텐츠 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Manufacturer 동적 콘텐츠 추가</figcaption>
   </figure>
1. `Model:` 옆 공백에서도 같은 작업을 수행합니다.

   ```text
   model
   ```

   이번에는 **Get item** action의 **Model** 입력을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_29_ModelAdded.png' | relative_url }}" alt="Model 동적 콘텐츠 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Model 동적 콘텐츠 추가</figcaption>
   </figure>
1. `Link to item in SharePoint` 텍스트는 이메일 본문에서 하이퍼링크로 바꿉니다.

1. HTML 편집기로 전환하려면 **&lt;/&gt;** 아이콘을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_30_ToggleCodeView.png' | relative_url }}" alt="코드 보기 전환" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>코드 보기 전환</figcaption>
   </figure>
1. HTML 편집기가 켜지면 `Link to item in SharePoint` 앞에 다음 HTML anchor 태그를 붙여 넣습니다.

   ```text
   <a href="
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_31_AddHTMLTag.png' | relative_url }}" alt="HTML 태그 시작 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>HTML 태그 시작 추가</figcaption>
   </figure>
1. `&lt;a href="` 뒤를 클릭하고 **lightning bolt** 또는 **fx** 아이콘을 선택합니다.

   **Dynamic content** 탭에서 다음을 검색합니다.

   ```text
   link to item
   ```

   **Get item** action의 **Link to item** 을 선택하고 **Add** 를 누릅니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_32_AddLinkToItem.png' | relative_url }}" alt="Link to item 동적 콘텐츠 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Link to item 동적 콘텐츠 추가</figcaption>
   </figure>
1. 이제 **Body** 파라미터에 **Link to item** 값이 들어갑니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_33_LinkToItemAdded.png' | relative_url }}" alt="Link to item 추가 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Link to item 추가 완료</figcaption>
   </figure>
1. 이어서 다음 문자열을 붙여 넣습니다.

   ```text
   ">
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_34_AddHTMLTag.png' | relative_url }}" alt="링크 닫는 따옴표 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>링크 닫는 따옴표 추가</figcaption>
   </figure>
1. `Link to item in SharePoint` 텍스트 뒤를 클릭합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_35_ClickAfterText.png' | relative_url }}" alt="링크 텍스트 뒤 클릭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>링크 텍스트 뒤 클릭</figcaption>
   </figure>
1. 하이퍼링크를 완성하려면 아래 닫는 태그를 붙여 넣습니다.

   ```text
   </a>
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_36_ClosingAnchorTag.png' | relative_url }}" alt="anchor 태그 닫기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>anchor 태그 닫기</figcaption>
   </figure>
1. 링크 구성이 끝났습니다. 다시 **&lt;/&gt;** 아이콘을 눌러 코드 보기를 끕니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_37_ToggleCodeView.png' | relative_url }}" alt="코드 보기 되돌리기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>코드 보기 되돌리기</figcaption>
   </figure>
1. `Additional comments from` 텍스트에서 콜론(`:`) 앞을 클릭한 뒤 **lightning bolt** 또는 **fx** 아이콘을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_38_AddUserInput.png' | relative_url }}" alt="User 파라미터 추가 준비" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>User 파라미터 추가 준비</figcaption>
   </figure>
1. **Dynamic content** 탭에서 다음을 검색합니다.

   ```text
   user
   ```

   trigger의 **User** 파라미터를 선택하고 **Add** 를 누릅니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_39_AddUserDynamicContent.png' | relative_url }}" alt="User 파라미터 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>User 파라미터 추가</figcaption>
   </figure>
1. 이제 사용자가 **Ask with adaptive card** 노드에 의견을 입력했으면 그 값을, 입력하지 않았다면 `None` 을 표시하는 expression을 추가하겠습니다.

   콜론 뒤를 클릭하고 **lightning bolt** 또는 **fx** 아이콘을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_40_AddExpression.png' | relative_url }}" alt="Expression 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Expression 추가</figcaption>
   </figure>
1. **Function** 탭 상단 expression 필드에 다음을 입력합니다.

   ```text
   if(empty())
   ```

   이 식은 `if` 함수로 if-else를 만들고, `empty` 함수로 문자열 값이 비어 있는지 검사합니다. 검사 대상은 trigger의 `AdditionalComments` 입력입니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_41_IfEmptyFunctions.png' | relative_url }}" alt="if와 empty 함수 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>if와 empty 함수 입력</figcaption>
   </figure>
1. `empty` 함수 뒤 괄호 **안쪽** 을 클릭한 뒤 `AdditionalComments` 입력을 삽입합니다.

   **Dynamic content** 탭에서 다음을 검색합니다.

   ```text
   Additional
   ```

   아래로 스크롤해 trigger의 **AdditionalComments** 입력을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_42_AdditionalCommentsDynamicContent.png' | relative_url }}" alt="AdditionalComments 동적 콘텐츠 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>AdditionalComments 동적 콘텐츠 추가</figcaption>
   </figure>
1. 이제 **참(true)** 로직을 작성합니다. `AdditionalComments` 가 비어 있으면 `None` 을 표시하도록 다음을 입력합니다.

   ```text
   , 'None',
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_43_None.png' | relative_url }}" alt="true 로직 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>true 로직 입력</figcaption>
   </figure>
1. 마지막으로 **거짓(false)** 로직을 작성합니다. `AdditionalComments` 가 비어 있지 않으면 그 값을 그대로 표시하게 합니다.

   <div class="info-box note" markdown="1">
   **참고**

   이 값은 **Request device** topic의 **Ask with adaptive card** 노드에 있는 Additional Comments 필드에서 옵니다.
   </div>

   **Dynamic content** 탭에서 다시 다음을 검색합니다.

   ```text
   Additional
   ```

   trigger의 **AdditionalComments** 입력을 선택한 뒤 **Add** 를 누릅니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_44_AdditionalCommentsDynamicContent.png' | relative_url }}" alt="false 로직 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>false 로직 입력</figcaption>
   </figure>
1. 훌륭합니다. expression이 완성되었습니다. 마지막 줄은 *Italic* 으로 서식을 지정합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_45_Italics.png' | relative_url }}" alt="마지막 줄 기울임꼴 처리" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>마지막 줄 기울임꼴 처리</figcaption>
   </figure>
1. 이제 **Respond to the agent** action을 업데이트해 **Get item** action의 **Model value** 를 agent로 다시 보내겠습니다.

   디자이너 화면을 위로 이동해 **Respond to the agent** action이 보이게 합니다.

   action을 선택하고 출력 형식으로 **Text** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_46_RespondToTheAgentAction.png' | relative_url }}" alt="Text 출력 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Text 출력 선택</figcaption>
   </figure>
1. 출력 이름으로 다음을 입력합니다.

   ```text
   ModelValue
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_47_ModelValueInput.png' | relative_url }}" alt="ModelValue 출력 이름" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>ModelValue 출력 이름</figcaption>
   </figure>
1. 값 필드를 선택한 뒤 오른쪽 **lightning bolt** 또는 **fx** 아이콘을 누릅니다.

   **Dynamic content** 탭에서 다음을 검색합니다.

   ```text
   model
   ```

   **Get item** action의 **Model** 파라미터를 선택하고 **Add** 를 누릅니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_48_InsertModelDynamicContent.png' | relative_url }}" alt="Model 파라미터 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Model 파라미터 추가</figcaption>
   </figure>
1. **Model** 파라미터가 text 출력값이 되었습니다. **Save draft** 를 선택해 agent flow를 저장합니다.

   이제 agent flow 구성이 완료되었습니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_49_SaveDraftAgentFlow.png' | relative_url }}" alt="초안 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>초안 저장</figcaption>
   </figure>
1. 게시 전에 세부 정보를 한 번 더 수정합니다. **Overview** 탭에서 **Edit** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_50_EditAgentFlowDetails.png' | relative_url }}" alt="Edit 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Edit 선택</figcaption>
   </figure>
1. **Flow name** 에는 다음을 입력합니다.

   ```text
   Send device request email
   ```

   **Description** 에는 다음을 입력합니다.

   ```text
   This flow starts when an agent manually triggers it and provides device and user details. It retrieves device information from a SharePoint list using the provided device ID. After successfully getting the device details, it sends an email to a manager with the request information, and sends a value back to the agent.
   ```

   **Save** 를 눌러 이름과 설명을 저장합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_51_RenameAndDescription.png' | relative_url }}" alt="이름과 설명 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>이름과 설명 저장</figcaption>
   </figure>
1. **Designer** 탭으로 돌아가 **Publish** 를 선택합니다. 그러면 이 agent flow를 **Request device** topic의 노드로 추가할 수 있습니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_52_Publish.png' | relative_url }}" alt="Publish 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Publish 선택</figcaption>
   </figure>
1. 잠시 후 게시 완료 확인 메시지가 표시됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.1_53_Confirmation.png' | relative_url }}" alt="게시 확인 메시지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>게시 확인 메시지</figcaption>
   </figure>
### 9.2 topic에 agent flow 추가하기

이제 방금 만든 agent flow를 **Request device** topic에 연결합니다.

1. 왼쪽 메뉴에서 **Agents** 를 선택한 뒤 **Contoso Helpdesk Agent** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_01_SelectAgent.png' | relative_url }}" alt="Agents 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Agents 선택</figcaption>
   </figure>
1. **Topics** 탭을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_02_SelectTopics.png' | relative_url }}" alt="Topics 탭 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Topics 탭 선택</figcaption>
   </figure>
1. **Request device** topic을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_03_SelectRequestDevice.png' | relative_url }}" alt="Request device topic 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Request device topic 선택</figcaption>
   </figure>
1. **Ask with adaptive card** 노드 아래에 새 노드를 추가합니다.

   **Add a tool** 을 선택하고 **Basic tools** 탭에서 방금 게시한 **Send device request email** agent flow를 고릅니다. 앞서 입력한 설명도 함께 표시됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_04_SelectAgentFlow.png' | relative_url }}" alt="agent flow 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>agent flow 선택</figcaption>
   </figure>
1. 이제 agent flow의 trigger 입력값을 **Ask with adaptive card** 노드의 변수 출력과 연결합니다.

   먼저 **DeviceSharePointId** 입력의 **ellipsis (...)** 아이콘을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_05_SelectVariable.png' | relative_url }}" alt="변수 선택 메뉴 열기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>변수 선택 메뉴 열기</figcaption>
   </figure>
1. **Ask with adaptive card** 노드의 출력 변수 중 **deviceSelectionId** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_06_SelectdeviceSelectionIdVariable.png' | relative_url }}" alt="deviceSelectionId 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>deviceSelectionId 선택</figcaption>
   </figure>
1. 다음으로 **User** 입력의 **ellipsis (...)** 아이콘을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_07_SelectVariable.png' | relative_url }}" alt="변수 선택 메뉴 열기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>변수 선택 메뉴 열기</figcaption>
   </figure>
1. flyout 변수 창의 **System** 탭에서 **User.DisplayName** 을 선택합니다. 이 변수는 agent와 상호작용하는 내부 사용자의 표시 이름을 담습니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_08_SelectUser.DisplayNameVariable.png' | relative_url }}" alt="User.DisplayName 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>User.DisplayName 선택</figcaption>
   </figure>
1. **Advanced inputs** 의 **greater than** 아이콘을 눌러 **AdditionalComments** 입력을 펼칩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_09_ExpandAdvancedInputs.png' | relative_url }}" alt="Advanced inputs 펼치기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Advanced inputs 펼치기</figcaption>
   </figure>
1. **AdditionalComments** 입력의 **ellipsis (...)** 아이콘을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_10_SelectVariable.png' | relative_url }}" alt="AdditionalComments 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>AdditionalComments 변수 선택</figcaption>
   </figure>
1. flyout 변수 창에서 **Formula** 탭과 확장 아이콘을 선택합니다. 여기서는 Power Fx expression을 사용합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_11_SelectFormulaAndExpandIcon.png' | relative_url }}" alt="Formula 탭 열기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Formula 탭 열기</figcaption>
   </figure>
1. agent flow에서 `if` 함수로 조건식을 만든 것과 비슷하지만, 이번에는 **Power Fx** 함수로 `commentsId` 값을 비었는지 검사해 빈 문자열 또는 실제 값을 넣습니다.

   Power Fx 필드에 다음을 입력합니다.

   ```text
   If(IsBlank())
   ```

   이 식은 `If` 함수로 if-else를 만들고, `IsBlank` 로 문자열이 비어 있는지 검사합니다. 검사 대상은 **Ask with adaptive card** 노드의 `commentsId` 출력 변수입니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_12_IfIsBlank.png' | relative_url }}" alt="If와 IsBlank 함수" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>If와 IsBlank 함수</figcaption>
   </figure>
1. `IsBlank` 함수 괄호 안에 다음을 입력합니다.

   ```text
   Topic.commentsId
   ```

   그리고 괄호 뒤에 쉼표를 추가합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_13_Topic.commentsId.png' | relative_url }}" alt="commentsId 참조" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>commentsId 참조</figcaption>
   </figure>
1. 이어서 아래 논리를 완성합니다.

   - **참(true)**: `Topic.commentsId` 가 비어 있으면 아무 값도 넣지 않습니다.
   - **거짓(false)**: 비어 있지 않으면 `commentsId` 값을 넣습니다.

   따라서 식은 다음과 같습니다.

   ```text
   "", Topic.commentsId)
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_14_PowerFxExpression.png' | relative_url }}" alt="Power Fx 식 완성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Power Fx 식 완성</figcaption>
   </figure>
   최종 Power Fx expression은 다음과 같습니다.

   ```text
   If(IsBlank(Topic.commentsId), "", Topic.commentsId)
   ```

   완성되면 **Insert** 를 눌러 입력 파라미터에 적용합니다.

1. 그러면 **AdditionalComments** 입력에 Power Fx expression이 표시됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.2_15_PowerFxExpressionForAdditionalCommentsInput.png' | relative_url }}" alt="AdditionalComments에 Power Fx 적용" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>AdditionalComments에 Power Fx 적용</figcaption>
   </figure>
1. topic을 **Save** 합니다.

### 9.3 Request device topic에 노드 추가해 사용자 경험 개선하기

이제 노드 두 개를 더 추가합니다.

- **Send a message** — 선택한 장치와 요청 제출 완료를 알려주는 확인 메시지
- **Topic management** — **End of conversation** 노드로 리디렉션해 대화를 종료

시작합니다.

1. agent flow 노드 아래 **plus +** 아이콘을 눌러 **Send a message** 노드를 추가합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.3_01_AddSendAMessageNode.png' | relative_url }}" alt="Send a message 노드 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Send a message 노드 추가</figcaption>
   </figure>
1. 메시지 필드에 아래 내용을 입력합니다.

   ```text
   Thanks
   ```

   이어서 사용자 이름을 참조하기 위해 **Insert variable** 아이콘을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.3_02_InsertVariable.png' | relative_url }}" alt="변수 삽입" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>변수 삽입</figcaption>
   </figure>
1. **System** 탭에서 `User` 를 검색하고 **User.DisplayName** 변수를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.3_03_SelectSystemVariable.png' | relative_url }}" alt="시스템 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>시스템 변수 선택</figcaption>
   </figure>
1. 시스템 변수가 추가된 뒤, 메시지 필드에 다음을 이어서 입력합니다.

   ```text
   . Your selected device,
   ```

   다시 **Insert variable** 을 눌러 이번에는 **Custom** 탭에서 `Model` 을 검색하고 **ModelValue** 변수를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.3_04_SelectCustomVariable.png' | relative_url }}" alt="커스텀 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>커스텀 변수 선택</figcaption>
   </figure>
1. 마지막으로 다음 문장을 이어서 입력합니다.

   ```text
   , has been submitted and will be reviewed by your manager.
   ```

   최종 메시지는 아래와 비슷해야 합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.3_05_SendAMessage.png' | relative_url }}" alt="완성된 확인 메시지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>완성된 확인 메시지</figcaption>
   </figure>
1. 마지막으로 **Send a message** 노드 아래 **plus +** 아이콘을 눌러 **Topic management** → **Go to another topic** → **End of Conversation** 을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.3_06_EndOfConversation.png' | relative_url }}" alt="Topic management 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Topic management 설정</figcaption>
   </figure>
1. topic을 **Save** 합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.3_07_SaveTopic.png' | relative_url }}" alt="topic 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>topic 저장</figcaption>
   </figure>
### 9.4 여러 시나리오로 agent 테스트하기

수고하셨습니다. 이제 agent를 테스트해 보겠습니다.

#### 9.4.1 Adaptive Card에 의견을 입력하고 장치 요청하기

1. 테스트 창에서 **new test session** 을 시작하고, **ellipsis (. . .)** 메뉴에서 **Track between topics** 를 켭니다. 그러면 topic 리디렉션을 실시간으로 볼 수 있습니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_01_EnableTrackBetweenTopics.png' | relative_url }}" alt="Track between topics 켜기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Track between topics 켜기</figcaption>
   </figure>
1. 첫 번째 시나리오를 테스트합니다. agent에 다음 메시지를 보냅니다.

   ```text
   I need a laptop
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_02_TestAgent_RequestDevice_Yes.png' | relative_url }}" alt="첫 번째 시나리오 시작" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>첫 번째 시나리오 시작</figcaption>
   </figure>
1. agent가 **Available devices** 를 트리거하고 목록을 보여주면, 장치를 요청하겠다는 답으로 다음을 입력합니다.

   ```text
   yes please
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_03_RequestDevice_Yes.png' | relative_url }}" alt="yes please 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>yes please 응답</figcaption>
   </figure>
1. agent 지침에 따라 **Request device** topic이 실행되고 adaptive card가 표시됩니다.

   **Surface Laptop 13** 을 선택하고 다음 의견을 입력합니다.

   ```text
   I need 16GB of RAM please
   ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_04_SelectDeviceAndEnterComment.png' | relative_url }}" alt="장치 선택과 의견 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>장치 선택과 의견 입력</figcaption>
   </figure>
1. 아래로 내려 **Submit Request** 버튼을 눌러 adaptive card를 제출합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_05_SubmitRequest.png' | relative_url }}" alt="요청 제출" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>요청 제출</figcaption>
   </figure>
1. 두 커넥터 action의 인증에 사용자 자격 증명을 사용할 수 있도록 **Allow** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_06_SelectAllow.png' | relative_url }}" alt="Allow 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Allow 선택</figcaption>
   </figure>
1. 그러면 agent가 사용자 이름과 선택한 모델을 포함한 확인 메시지를 표시하고 **End of Conversation** topic으로 이동합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_07_RequestSubmitted.png' | relative_url }}" alt="요청 제출 완료 메시지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>요청 제출 완료 메시지</figcaption>
   </figure>
1. **End of Conversation** topic의 나머지 흐름을 확인하려면 **Yes** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_08_RedirectNode.png' | relative_url }}" alt="리디렉션 노드 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>리디렉션 노드 확인</figcaption>
   </figure>
1. 별점 카드에서 아무 별이나 선택해 경험을 평가합니다.

   그러면 agent가 마지막 **Question** 노드로 이동합니다. 여기서는 **No** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_09_EndOfConversation.png' | relative_url }}" alt="End of Conversation 흐름" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>End of Conversation 흐름</figcaption>
   </figure>
1. 최종 메시지가 표시되면 topic이 종료됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_10_EndOfConversation.png' | relative_url }}" alt="대화 종료 메시지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>대화 종료 메시지</figcaption>
   </figure>
1. 받은 편지함에서 manager에게 전송된 이메일을 확인합니다. 선택한 장치와 adaptive card에 입력한 메모가 포함되어 있어야 합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_11_ReviewEmailMessageWithComment.png' | relative_url }}" alt="이메일 수신 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>이메일 수신 확인</figcaption>
   </figure>
1. 이메일의 하이퍼링크를 클릭하면 해당 장치의 SharePoint item이 열립니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_12_SelectLinkInEmail.png' | relative_url }}" alt="이메일 링크 열기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>이메일 링크 열기</figcaption>
   </figure>
#### 9.4.2 Adaptive Card에 의견을 입력하지 않고 장치 요청하기

이번에는 의견을 입력하지 않는 시나리오를 테스트합니다.

1. 다음 단계를 반복합니다.

   - 테스트 창을 **Refresh** 하고 **activity map** 아이콘을 선택
   - `I need a laptop` 메시지 입력
   - 장치 요청 여부 질문에 `yes please` 응답

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_13_RequestDevice_Yes.png' | relative_url }}" alt="장치 요청 재시작" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>장치 요청 재시작</figcaption>
   </figure>
1. 이번에는 **Surface Laptop 15** 를 선택하고 의견은 입력하지 않습니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_14_SelectDevice.png' | relative_url }}" alt="장치만 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>장치만 선택</figcaption>
   </figure>
1. **Submit Request** 버튼을 눌러 요청을 제출합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_15_SubmitRequest.png' | relative_url }}" alt="요청 제출" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>요청 제출</figcaption>
   </figure>
1. 이번에 받은 이메일에는 의견 값으로 **None** 이 표시되어야 합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_16_ReviewEmailMessage.png' | relative_url }}" alt="의견 없음 이메일 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>의견 없음 이메일 확인</figcaption>
   </figure>
#### 9.4.3 장치를 요청하지 않기

마지막 시나리오는 장치를 요청하지 않는 경우입니다. 이때 agent 지침에 따라 **Goodbye** topic이 실행되어야 합니다.

1. 다음 단계를 반복합니다.

   - 테스트 창을 **Refresh** 하고 **activity map** 아이콘을 선택
   - `I need a laptop` 메시지 입력
   - 이번에는 장치 요청 질문에 `No` 로 응답

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_17_TestAgent_RequestDevice_No.png' | relative_url }}" alt="장치 요청 거부 시나리오" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>장치 요청 거부 시나리오</figcaption>
   </figure>
1. 그러면 agent가 **Goodbye** topic을 호출하고, 해당 topic에 정의된 질문이 표시됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-09-add-an-agent-flow/9.4_18_Goodbye.png' | relative_url }}" alt="Goodbye topic 호출" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Goodbye topic 호출</figcaption>
   </figure>
## ✅ Mission Complete

축하합니다! 기존 **Request device** topic에 agent flow를 만들고 연결하는 방법, 그리고 agent를 다른 topic으로 리디렉션하는 방법을 익혔습니다.

이제 **Lab 09 - 자동화를 위한 agent flow 추가와 topic 기능 확장**이 끝났습니다. 다음 단계에서는 이 시나리오를 더 확장합니다.

⏭️ [다음: Add Event Triggers - Enable autonomous agent capabilities]({{ '/chapters/academy-recruit-10-add-event-triggers/' | relative_url }})

## 📚 Tactical Resources

- [Introducing agent flows: Transforming automation with AI-first workflows](https://www.microsoft.com/microsoft-copilot/blog/copilot-studio/introducing-agent-flows-transforming-automation-with-ai-first-workflows/)
- [Agent flows overview](https://learn.microsoft.com/microsoft-copilot-studio/flows-overview?WT.mc_id=power-172621-ebenitez)
- [Use agent flows with your agent](https://learn.microsoft.com/microsoft-copilot-studio/advanced-flow?WT.mc_id=power-172621-ebenitez)
- [List of functions in the reference guide](https://learn.microsoft.com/azure/logic-apps/workflow-definition-language-functions-reference?WT.mc_id=power-172621-ebenitez)
- [Agent Flows in Copilot Studio](https://www.youtube.com/watch?v=VJTKyk3Pr7s)
