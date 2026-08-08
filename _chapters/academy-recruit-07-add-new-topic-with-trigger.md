---
layout: "chapter"
date: 2026-08-06
title: "미션 07: 트리거와 노드가 있는 새 토픽 추가하기"
short_title: "토픽·트리거 추가"
description: "Topics로 커스텀 질문/답변 경로를 정의하는 방법"
order: 7
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/07-add-new-topic-with-trigger/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/07-add-new-topic-with-trigger/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 07: Add new topic with trigger and nodes](https://microsoft.github.io/agent-academy/recruit/07-add-new-topic-with-trigger/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

🎥 **워크스루 영상 보기**

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/video-thumbnail.jpg' | relative_url }}" alt="Trigger video thumbnail" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption><a href="https://www.youtube.com/watch?v=7iPAZaA8nJs">YouTube에서 워크스루 보기</a></figcaption></figure>

## 🎯 미션 브리핑

돌아오신 것을 환영합니다, Recruit. 여러분은 듣고, 배우고, 질문에 답하는 에이전트를 만들었습니다. 이제 특정 요청에 정확하게 응답하도록 에이전트를 가르칠 차례입니다.

Topics와 Trigger를 사용하면 에이전트는 다음을 할 수 있습니다:

<div class="info-box note" markdown="1">
**참고** — Copilot Studio 화면이 이 강의의 스크린샷과 다르게 보인다면, 오른쪽 상단의 **New Experience**를 꺼서 여기서 사용하는 **클래식 경험**으로 전환하세요.
</div>

- 의도(intent)를 인식
- 로직으로 대화를 라우팅
- 변수를 수집하고 저장
- 플로우를 트리거하고 동작 수행

여러분은 단순히 대화를 만드는 게 아니라, 에이전트의 의사 결정 중추를 배선하고 있는 것입니다. Neural Nexus에 오신 것을 환영합니다.

## 🔎 학습 목표

이번 미션에서 다음을 배웁니다:

1. 토픽이 무엇이고, 에이전트를 위한 구조화된 대화를 만드는 데 어떤 역할을 하는지 이해하기
1. 트리거 문구와 대화 노드를 포함한 토픽의 구조 알아보기
1. 다양한 종류의 대화 노드와 동적 로직을 위한 Power Fx 사용법 살펴보기
1. 특정 사용자 요청과 작업을 처리하는 커스텀 토픽을 처음부터 만들기
1. 커넥터와 도구를 사용해 SharePoint 데이터에 연결하는 기능적 토픽 구축하기

## 🤔 토픽이란?

토픽은 에이전트가 특정 사용자 질문이나 작업에 응답하도록 돕는 구조화된 대화입니다. 토픽을 에이전트가 처리할 수 있는 미니 대화나 작업이라고 생각하세요. 각 토픽은 특정 사용자 질문이나 요청에 응답하도록 설계됩니다.

### 🌌 토픽의 목적

사용자가 필요로 하는 것에 따라 토픽의 목적은 크게 세 가지로 나뉩니다:

**정보 제공(Informational)** - 다음과 같은 질문에 답합니다:

- `What is …?`
- `When will …?`
- `Why …?`
- `Can you tell me …?`

**작업 완료(Task completion)** - 사용자가 무언가를 _하도록_ 돕습니다:

- `"I want to …"`
- `"How do I …?"`
- `"I need …?"`

**트러블슈팅(Troubleshooting)** - 문제를 해결합니다:

- `Something isn't working …`
- `I'm encountering an error message …`
- `I'm seeing something unexpected …?`

`I need help`처럼 모호한 질문에 대해서도 토픽을 만들어, 계속 진행하기 전에 사용자에게 더 자세한 내용을 물어보게 할 수 있습니다.

## 🐦 토픽이 유용한 이유

토픽은 다음을 돕습니다:

- 에이전트의 지식을 체계적으로 정리
- 대화를 자연스럽게 느껴지도록 만듦
- 사용자 문제를 효과적으로 해결

## 🪺 토픽의 종류

1. **시스템 토픽** - 다음과 같은 공통 이벤트를 처리하는 내장 토픽입니다:
    - 대화 시작
    - 대화 종료
    - 오류 처리
    - 사용자 로그인 요청
    - 사람 상담원으로 에스컬레이션

1. **커스텀 토픽** - 다음과 같은 특정 작업이나 질문을 처리하기 위해 직접 만듭니다:
    - 직원 휴가 신청
    - 신규/교체 기기 요청

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.0_01_Topics.png' | relative_url }}" alt="Types of topics" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Types of topics</figcaption></figure>

## 🧬 토픽의 구조

각 토픽은 보통 다음을 포함합니다.

### 🗣️ 트리거 문구

사용자가 토픽을 시작하기 위해 말할 법한 단어나 문장입니다.

**예시:**

휴가 신청 토픽의 경우, 트리거 문구는 다음과 같을 수 있습니다.

- `I want to take vacation leave`
- `Request vacation`
- `Apply for time off`
- `How do I submit a leave request?`

기기 요청 토픽의 경우, 트리거 문구는 다음과 같을 수 있습니다.

- `I need a new device`
- `Can I request a device?`
- `Can you help me with a device request`

### 💬 대화 노드

토픽은 토픽이 트리거된 후 에이전트가 따르는 단계인 노드들로 구성됩니다. 이 단계들을 연결해 에이전트가 사용자와 상호작용할 때 따르는 대화 흐름을 만듭니다.

다음과 같은 지시나 동작이라고 생각하세요:

- 사용자에게 질문하기
- 메시지 보내기
- 휴가 관리 시스템 같은 외부 서비스 호출하기
- 변수 설정 또는 확인하기
- 조건을 사용해 대화 분기하기
- 다른 토픽으로 안내하기

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.0_03_ConversationNodes.png' | relative_url }}" alt="Conversation nodes" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Conversation nodes</figcaption></figure>

에이전트에 추가할 수 있는 주요 노드 유형은 다음과 같습니다:

#### 메시지 보내기(Send a message)

- **목적** - 사용자에게 메시지를 보냅니다.
- **예시** - `Thanks for your request! I'll help you with that.`

이 노드는 에이전트가 사용자에게 메시지를 보낼 수 있게 해주며, 단순 텍스트일 수도 있고 이미지, 비디오, 카드, 퀵 리플라이, adaptive card 같은 풍부한 콘텐츠일 수도 있습니다.

변수를 사용해 메시지를 개인화하고, 다양성을 위해 여러 메시지 변형을 추가하며, 음성 지원 채널을 위한 음성 출력도 커스터마이징할 수 있습니다.

<div class="info-box note" markdown="1">
**TIP** — 에이전트가 사용자와 명확하고 상호작용적으로 소통하도록 돕는 "무언가 말하기" 블록이라고 생각하세요.
</div>

#### 질문하기(Ask a question)

- **목적** - 사용자에게 질문하고 답변을 기다립니다.
- **예시** - `What are your vacation dates?`

이 노드는 대화 중 사용자에게 특정 정보를 요청하고, 나중에 사용할 수 있도록 응답을 변수에 저장하는 데 사용됩니다.

텍스트 입력 같은 질문 유형을 커스터마이징하거나, 사용자가 선택할 수 있는 정의된 값 목록을 위한 엔터티를 사용할 수 있으며, 사용자가 유효하지 않은 답변을 하거나 질문을 건너뛸 때 에이전트가 어떻게 동작할지도 정의할 수 있습니다.

이미지와 퀵 리플라이 같은 풍부한 콘텐츠도 지원하며, 대화가 원활히 흐르도록 유효성 검사, 재질문, 인터럽션(interruption) 설정을 세밀하게 조정할 수 있습니다.

<div class="info-box note" markdown="1">
**TIP** — 여러분이 정의한 구조화된 방식으로 에이전트가 사용자와 상호작용하도록 돕는 "묻고 듣기" 블록이라고 생각하세요.
</div>

#### Adaptive Card로 질문하기(Ask with adaptive card)

- **목적** - JSON을 사용해 풍부하고 인터랙티브한 카드를 전송합니다.
- **예시** - 사용자가 날짜를 선택할 수 있는 캘린더 날짜 선택기를 표시하는 카드.

이 노드는 텍스트 박스, 버튼, 이미지가 있는 폼처럼 사용자가 작성하고 제출할 수 있는 풍부하고 인터랙티브한 카드를 보여줍니다. 사용자의 입력을 캡처해 변수에 저장하며, 에이전트는 이후 대화에서 이를 사용할 수 있습니다.

<div class="info-box note" markdown="1">
**TIP** — 에이전트가 사용자로부터 세부 정보를 더 매력적으로 수집할 수 있게 해주는 커스터마이징 가능한 "폼 빌더" 블록이라고 생각하세요.
</div>

#### 조건 추가(Add a condition)

- **목적** - 대화에 로직을 추가합니다. 무언가를 확인하고 다음에 무엇을 할지 결정합니다.
- **예시** - 사용자가 `Yes`라고 말하면 다음 단계로, `No`라고 말하면 대화를 종료합니다.

이 노드는 변수가 특정 조건을 충족하는지 확인해 에이전트 대화 흐름에 결정 지점을 만듭니다. 조건이 참인지 거짓인지에 따라 에이전트는 다른 경로를 따릅니다.

<div class="info-box note" markdown="1">
**TIP** — 사용자 입력이나 변수에 저장된 데이터에 따라 에이전트가 결정을 내리도록 돕는 "if-else" 블록이라고 생각하세요.
</div>

#### 변수 관리(Variable management)

- **목적** - 대화 중 정보(변수)를 저장하거나 지웁니다.
- **예시** - adaptive card를 표시하는 Ask a question 노드에서 사용자가 선택한 날짜를 저장합니다.

이 노드는 대화 중 사용자 이름, 답변, 선호도 같은 정보를 저장하고 관리하게 해줍니다. 텍스트, 숫자, 날짜 같은 다양한 유형의 변수를 사용할 수 있으며, 하나의 토픽에 국한하거나, 토픽 간 공유(전역)하거나, 시스템·환경에서 가져올 수 있습니다.

<div class="info-box note" markdown="1">
**TIP** — 사용자와의 대화가 이어지는 동안 에이전트가 정보를 기억하고 사용하도록 돕는 "메모리 상자"라고 생각하세요.
</div>

#### 토픽 관리(Topic management)

- **목적** - 대화를 다른 토픽이나 토픽 내 다른 단계로 이동하거나, 대화를 전환하거나, 토픽/대화를 종료합니다.
- **예시** - "Leave Policy" 토픽으로 리다이렉트합니다.

이 노드는 대화를 다시 시작하지 않고도 한 토픽에서 다른 토픽으로 이동하거나, 토픽을 종료하거나, 대화를 전환·종료하거나, 같은 토픽 내 다른 단계로 이동할 수 있게 해줍니다. 토픽 간에 매끄럽게 전환하며 사용자를 대화 흐름의 여러 부분으로 안내하는 데 도움이 되며, 맥락을 유지하기 위해 토픽 간에 변수를 전달할 수 있습니다.

<div class="info-box note" markdown="1">
**TIP** — 에이전트가 사용자와 대화하며 유연하게 대처하도록 돕는 "다른 섹션/단계로 이동" 블록이라고 생각하세요.
</div>

#### 도구 추가(Add a tool)

- **목적** - 커넥터, 에이전트 플로우, 프롬프트, 커스텀 검색, 검색 쿼리, 스킬, model context protocol 등의 도구에 연결합니다.
- **예시** - 사용자가 휴가 신청을 제출한 후 실행되는 에이전트 플로우.

이 노드는 이메일 전송, 날씨 확인, 데이터베이스 접근 같은 외부 시스템과 상호작용하거나 특정 작업을 수행하는 능력을 에이전트에게 부여합니다. 내장 커넥터, 커스텀 API, 에이전트 플로우, 프롬프트를 사용하거나, Model Context Protocol(MCP) 서버에 연결하거나, computer use 도구를 통해 데스크톱 앱용 _그래픽 사용자 인터페이스_ 자동화까지 도구로 추가할 수 있습니다.

<div class="info-box note" markdown="1">
**TIP** — API 호출, 프로세스 실행, 사용자 입력 자동 수집 등 단순한 _대화_를 넘어서는 일을 할 수 있는 초능력을 에이전트에게 부여하는 "행동 블록"이라고 생각하세요.
</div>

#### 생성형 답변 노드(Generative answers node)

- **목적** - 대규모 언어 모델을 사용해 사용자의 질문과 연결된 데이터를 기반으로 자연스럽고 사람 같은 응답을 생성합니다.
- **예시** - 휴가 신청 관련 사용자 질문에 답하기 위해, 휴가 자격 정보를 담은 연결된 지식 소스를 사용합니다.

이 노드는 웹사이트, 문서, SharePoint, 커스텀 데이터 등 다양한 지식 소스의 정보를 사용해 에이전트가 사용자 질문에 응답하게 해줍니다. 일치하는 토픽을 찾지 못했을 때 폴백으로 사용되거나, 토픽 안에서 설정한 특정 소스에 기반해 더 상세하고 동적인 답변을 제공하는 데 사용될 수 있습니다.

<div class="info-box note" markdown="1">
**TIP** — 여러분이 정의한 신뢰할 수 있는 콘텐츠를 검색해 에이전트가 유용하고 정확한 응답을 하도록 돕는 "스마트 답변 블록"이라고 생각하세요.
</div>

#### HTTP 요청 노드(HTTP request node)

- **목적** - API 호출(예: `GET`이나 `POST`)을 보내 데이터를 가져오거나 업데이트함으로써 에이전트를 외부 시스템에 연결합니다.
- **예시** - 사용자가 남은 휴가 일수를 물으면, 에이전트는 휴가 관리 시스템에 `GET` 요청을 수행하고 API 응답에서 `remainingLeaveDays`를 추출해 사용자에게 값으로 응답합니다.

이 노드는 `GET`이나 `POST` 요청 같은 REST API 호출을 보내 에이전트를 외부 시스템에 연결하게 해줍니다. 헤더, 본문 콘텐츠로 요청을 커스터마이징하거나 Power Fx로 동적 데이터를 포함할 수 있으며, 응답을 변수에 저장해 대화 이후에 사용할 수 있습니다.

<div class="info-box note" markdown="1">
**TIP** — 사용자 세부 정보를 조회하거나 다른 시스템에 데이터를 전송하는 등 에이전트가 다른 서비스와 대화하도록 돕는 "연락해서 정보 얻기" 블록이라고 생각하세요.
</div>

#### 이벤트 전송(Send an event)

- **목적** - 시스템 업데이트나 도구 트리거 같은 비-메시지 동작을 클라이언트나 채널로 전송해, 작업을 수행하도록 돕습니다.
- **예시** - 사용자가 채팅에 참여했을 때 환영 메시지를 표시하는 반응.

이 노드는 에이전트가 외부 시스템이나 채널로 비-메시지 동작을 보낼 수 있게 해주며, 이후 어떻게 응답할지는 해당 시스템이 결정합니다. 각 이벤트에 이름을 부여하고, 단순 숫자나 텍스트, 변수, Power Fx 수식이 될 수 있는 값을 첨부하면 JSON 객체로 전송됩니다.

<div class="info-box note" markdown="1">
**TIP** — 사용자가 아무 말을 하지 않아도 에이전트가 뒤에서 작업을 처리하거나 외부 도구와 소통하도록 돕는 "조용한 트리거" 블록이라고 생각하세요.
</div>

## 🏋🏻‍♀️ 노드에서 Power Fx 사용하기

Copilot Studio에서 Power Fx는 에이전트에 로직과 동적 동작을 추가하는 데 사용되는 로우코드 프로그래밍 언어입니다. Microsoft Power Apps에서 사용하는 것과 같은 언어이며, 개발자와 비개발자 모두 쉽게 사용할 수 있도록 Excel과 비슷하게 단순하도록 설계되었습니다.

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_09_EnterFormula.png' | relative_url }}" alt="Power Fx expression" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Power Fx expression</figcaption></figure>

### 토픽에서 Power Fx가 할 수 있는 것

- 변수 설정 및 조작
    - 예시: `Set(userName, "Adele Vance")`
- 조건 생성
    - 예시: `If(score > 80, "Pass", "Fail")`
- 데이터 형식화 및 변환
    - 예시: `Text(DateValue, "dd/mm/yyyy")`

### Power Fx를 왜 사용하는가?

- **유연함:** 완전한 코드 줄을 작성하지 않고도 로직을 만들 수 있습니다.

- **친숙함:** Excel 수식을 사용해본 적이 있다면 매우 비슷하게 느껴집니다.

- **강력함:** 대화를 개인화하고, 입력을 검증하며, 사용자 데이터에 따라 에이전트 동작을 제어할 수 있습니다.

## 🏗️ 토픽을 어떻게 만들고 편집하나요?

에이전트의 토픽을 만들고 편집하는 방법은 두 가지입니다.

### 1. 빈 상태에서 만들기(Create from blank)

처음부터 커스텀 대화 흐름을 만들 수 있으며, 토픽을 편집하면서 필요에 따라 노드를 추가하거나 제거할 수 있습니다.

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.0_04_AddATopic.png' | relative_url }}" alt="Add a topic" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a topic</figcaption></figure>

#### 이 방식이 유용한 이유

- 에이전트가 어떻게 응답하는지 완전히 제어할 수 있습니다.
- 변수, Power Fx, 조건을 사용해 로직을 커스터마이징할 수 있습니다.
- 특정 비즈니스 요구에 맞춘 경험을 만드는 데 이상적입니다.

### 2. Copilot으로 설명에서 추가하기

원하는 것을 자연어로 설명하면 Copilot이 대화를 대신 만들어줍니다. 토픽을 편집할 때도 마찬가지로 자연어를 사용하면 Copilot이 검토하고 수정해줍니다.

#### Copilot이 지원하는 것

- 다음을 만들고 편집할 수 있습니다:
    - 메시지 노드
    - 질문 노드
    - 조건 노드
- 사용자가 응답하지 않을 때 재질문하는 방법이나 질문 중 인터럽션을 관리하는 방법 같은 고급 설정은 지원하지 않습니다. 필요하다면 이러한 설정은 수동으로 조정할 수 있습니다.

#### 이 방식이 유용한 이유

- AI의 도움으로 개발 속도가 빨라집니다.
- 반복적인 설정 대신 로직과 사용자 경험에 집중할 수 있습니다.
- 최소한의 노력으로 대화 흐름을 반복 개선하기 쉬워집니다.

#### ✨ 프롬프트 예시

- **토픽 만들기**
    - `Accept a user's name, age and date of birth and then repeat their responses back to them`
    - `Collect a user's street address, state and zip code. The user should be able to retry each question up to 4 times`

- **토픽 편집하기**
    - `Add a question asking for the user's date of birth`
    - `Summarize collected info in an Adaptive Card.`

## 👩🏻‍🎨 에이전트를 위한 토픽은 어떻게 설계하나요?

### 🧙🏻‍♂️ 1단계 - 사용자가 필요로 하는 것을 이해하기

먼저 사용자가 에이전트에게 물어볼 만한 공통 질문이나 작업을 파악하세요. 다음과 같은 것들입니다:

- 사용자가 자주 하는 질문, 예: `what's my entitlement for sick days?`
- 사용자가 완료하고 싶은 흔한 작업, 예: 양식 제출
- 사용자가 자주 겪는 문제, 예: 로그인 문제

### 📦 2단계 - 시나리오 그룹화

앞서 배운 토픽의 목적을 기준으로 사용자 요구를 세 가지 범주로 정리하세요:

- 정보 제공 - 사용자가 무언가 알고 싶어함
- 작업 완료 - 사용자가 무언가 하고 싶어함
- 트러블슈팅 - 사용자가 문제 해결을 위해 도움이 필요함

### 🗺️ 3단계 - 대화를 매핑하기

에이전트가 어떻게 응답해야 하는지 간단한 대화 흐름을 스케치하세요.

- 인사말이나 확인으로 시작
- 후속 질문으로 세부 정보 얻기
- 답변 제공 또는 동작 수행

<div class="info-box note" markdown="1">
**TIP** — 대화를 짧고 초점 있게 유지하세요. 꼭 필요한 것만 물어보세요.
</div>

### 🔀 4단계 - 다양한 대화 유형 처리하기

다음 두 가지 모두를 위해 설계하세요:

- **단일 턴(Single-turn)** - 질문 하나, 답변 하나

- **다중 턴(Multi-turn)** - 후속 질문이 있는 주고받는 대화

예시:

- 사용자: `I want to apply for vacation leave.`

- 에이전트: `Sure! What date would you like your leave to start?`

- 사용자: `July 15th`

- 에이전트: `Got it. And when will your leave end?`

- 사용자: `July 22nd.`

- 에이전트: `Thanks! What's the reason for your leave?`

- 사용자: `Family vacation.`

- 에이전트: `Thanks for the details. I've submitted your leave request from July 15th to July 22nd for a family vacation. You'll get a confirmation soon.`

### 🤖 5단계 - 예상치 못한 질문에 AI 활용하기

휴가 신청을 위한 토픽을 설계했더라도, 사용자는 직접 다루지 않은 질문을 할 수 있습니다. 이럴 때 _Conversational boosting_ 시스템 토픽 같은 AI 기능이 유용합니다.

이 토픽에는 생성형 답변 노드가 포함되어 있어, 에이전트가 연결된 지식 소스를 바로 사용하기 시작할 수 있습니다. 에이전트 레벨에서 추가된 모든 지식 소스는 _Conversational boosting_ 시스템 토픽 안의 생성형 답변 노드에 자동으로 포함됩니다.

#### 예시

- 사용자: `Can I carry over unused vacation days to next year?`

이 질문은 미리 정의된 토픽 흐름에 포함되지 않을 수 있습니다. 특히 토픽이 휴가 신청 제출만 처리한다면 더욱 그렇습니다.

#### AI가 돕는 방법

에이전트가 회사의 HR 정책 문서나 내부 웹사이트에 연결되어 있다면, AI는 다음을 할 수 있습니다:

- 관련 휴가 정책 검색
- 규칙 이해 및 요약
- 에이전트 응답: `According to the HR policy, you can carry over unused vacation days to the next calendar year. For more details, check the leave policy section on the HR portal.`

#### 이 방식이 유용한 이유

- 정책 관련 질문마다 토픽을 수동으로 만들 필요가 없습니다.
- AI가 신뢰할 수 있는 지식 소스에서 정확한 답을 가져올 수 있습니다.
- 에이전트가 더 똑똑하고 반응성 있게 느껴져 사용자 경험이 향상됩니다.

### 🔬 6단계 - 토픽과 대화 흐름 테스트하기

토픽을 게시하기 전에:

- 실제 질문이나 샘플 입력으로 테스트하세요.
- 자연스럽고 유용하게 들리는지 확인하세요.

<div class="info-box note" markdown="1">
**TIP** — 테스트하면서 노드를 추가하거나, 다른 토픽으로 리다이렉트하는 대신 노드를 제거하는 등 토픽을 개선해 나가세요.
</div>

### ⚠️ 7단계 - 웹사이트 콘텐츠 중복 피하기

이미 웹사이트에 있는 내용을 복사하지 마세요.

- 사용자가 자주 묻는 토픽에 집중하세요.
- 채팅 기록이나 지원 요청을 기반으로 새 토픽을 추가하세요.

### ✨ 대화 흐름 예시

아래는 휴가 신청을 처리하는 토픽의 예시입니다.

#### 1단계: 트리거 문구

사용자가 입력:

`I want to request vacation leave`

#### 2단계: 에이전트가 Adaptive card로 세부 정보를 요청

에이전트가 질문:

`Sure! What dates would you like to take off?`

Adaptive card에는 시작일과 종료일을 위한 캘린더 선택 컨트롤이 있습니다.

#### 3단계: 사용자가 날짜 제공

사용자가 시작일 2025년 8월 5일, 종료일 2025년 8월 10일을 선택하고 카드를 제출합니다. 날짜 값은 adaptive card의 출력값으로 변수에 저장됩니다.

#### 4단계: 클라우드 플로우 실행

Power Automate 클라우드 플로우가 실행되어 휴가 관리 시스템에 새 요청을 생성하고 매니저에게 휴가 신청 알림 이메일을 보냅니다.

#### 5단계: 사용자에게 확인 메시지 전송

에이전트가 응답:

`Your vacation leave request from August 5 to August 10 has been submitted. Your manager will review and get back to you shortly.`

## 🧪 랩 07 - 대화 노드가 있는 새 토픽 추가하기

이제 트리거와 도구가 있는 새 토픽을 추가하는 법을 배워봅시다. 이 랩에서는 필요에 맞게 토픽을 커스터마이징하는 법을 이해할 수 있도록 빈 토픽에서 만드는 것을 다룹니다.

### ✨ 사용 사례

**직원으로서**

**나는** 어떤 기기를 사용할 수 있는지 알고 싶습니다

**그래야** 사용 가능한 기기 목록을 볼 수 있습니다

시작해봅시다!

### 사전 준비 사항

1. **SharePoint 목록**

    [미션 00 - 코스 설정 - 5단계: 새 SharePoint 사이트 만들기]({{ '/chapters/academy-recruit-00-course-setup/' | relative_url }})에서 만든 **Devices** SharePoint 목록을 사용합니다.

    **Devices** SharePoint 목록을 아직 설정하지 않았다면, [미션 00 - 코스 설정 - 5단계: 새 SharePoint 사이트 만들기]({{ '/chapters/academy-recruit-00-course-setup/' | relative_url }})로 돌아가 설정하세요.

1. **Contoso Helpdesk Agent**

    [레슨 06 - 자연어와 AI로 커스텀 에이전트를 만들고 내 데이터로 그라운딩하기]({{ '/chapters/academy-recruit-06-create-agent-from-conversation/' | relative_url }})에서 이전에 만든 것과 같은 에이전트를 사용합니다.

### 7.1 빈 상태에서 새 토픽 추가

1. 에이전트 이름 근처의 **Topics** 탭을 선택합니다. **Topics**가 보이지 않으면 탭 오버플로 메뉴를 열고 **Topics**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.1_01_Topics.png' | relative_url }}" alt="Select Topics" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Topics</figcaption></figure>

1. **Topics** 탭이 로드되며 기본적으로 _Custom_ 토픽이 표시됩니다. All, Custom, System으로 토픽을 필터링할 수 있습니다. 현재 보이는 커스텀·시스템 토픽은 에이전트가 프로비저닝될 때 자동으로 생성된 것들입니다.

    **+ Add a topic**을 선택하고 **From blank**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.1_02_FromBlank.png' | relative_url }}" alt="Create topic from scratch" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create topic from scratch</figcaption></figure>

1. 토픽의 이름을 입력합니다. 다음을 복사해 붙여넣습니다.

    ```text
    Available devices
    ```

    토픽이 하는 일을 설명하는 트리거 설명을 입력합니다. 다음을 복사해 붙여넣습니다.

    ```text
    This topic helps users find devices that are available from our SharePoint Devices list. User can ask to see available devices and it will return a list of devices that are available which can include laptops, smartphones, accessories and more.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.1_03_TopicNameAndDescription.png' | relative_url }}" alt="Enter a name and description for trigger" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Enter a name and description for trigger</figcaption></figure>

### 7.2 트리거 입력과 출력 정의하기

1. 다음으로, 생성형 AI가 사용자 메시지에서 기기 유형 값을 추출하는 오케스트레이션에 사용할 새 입력 변수를 추가합니다. 토픽에서 **More ellipsis (...)**를 선택하고 **Details**를 선택해 토픽 세부 정보 패널을 봅니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.2_01_SelectTopicDetails.png' | relative_url }}" alt="Select Topic Details" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Topic Details</figcaption></figure>

1. **Topic details** 패널이 로드되었습니다. **Input** 탭을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.2_02_SelectInputTab.png' | relative_url }}" alt="Input tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Input tab</figcaption></figure>

1. **Create a new variable**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.2_03_CreateANewVariable.png' | relative_url }}" alt="Create new input variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create new input variable</figcaption></figure>

1. 변수 이름을 입력합니다. 다음을 복사해 붙여넣습니다.

    ```text
    VarDeviceType
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.2_04_VariableName.png' | relative_url }}" alt="Input variable name" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Input variable name</figcaption></figure>

1. 이제 입력·출력 변수를 정의해야 합니다. 토픽 입력/출력에 정의할 수 있는 속성은 다음과 같습니다.

    | 필드 | 값 |
    | ----- | ----- |
    | How will the agent fill this input? | 토픽 실행 전에 에이전트가 이 변수를 어떻게 채울지 결정합니다. 기본값은 _Dynamically fill with the best option_이며, 사용자에게 묻는 대신 값을 직접 지정해 입력을 재정의할 수도 있습니다 |
    | Variable data type | 변수의 데이터 유형입니다. 지원되는 데이터 유형은 `String`, `Boolean`, `Number`, `Date`, `DateTime`, `DateTimeNoTimeZone`, `Time`, `Record`, `Table`, `Unspecified`, `From sample data`입니다 |
    | Display name | 변수의 이름 |
    | Identify as | 에이전트가 올바른 값 유형을 캡처하기 위한 엔터티 유형 |
    | Description | 이 설명은 토픽 실행 전에 에이전트가 입력을 자동으로 채우거나, 값을 요청하는 질문을 생성하는 데 도움이 됩니다 |

    _How will the agent fill this input?_, _Variable data type_, _Display name_은 그대로 두고, **Identify as** 속성을 **User's entire response**로 업데이트합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.2_05_IdentifyAs.png' | relative_url }}" alt="Update Identify as" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Update Identify as</figcaption></figure>

1. 다음을 설명으로 복사해 붙여넣습니다.

    ```text
    List of possible values: Laptop, Desktop, Smartphone
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.2_06_InputDescription.png' | relative_url }}" alt="Description" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Description</figcaption></figure>

1. 이제 토픽의 출력을 정의합니다. **Output** 탭을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.2_07_SelectOutputTab.png' | relative_url }}" alt="Select Output tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Output tab</figcaption></figure>

1. **Create a new variable**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.2_08_CreateANewVariable.png' | relative_url }}" alt="Create new output variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create new output variable</figcaption></figure>

1. 다음 속성을 업데이트합니다.

    **Variable name** - 다음을 복사해 붙여넣습니다.

    ```text
    VarAvailableDevices
    ```

    **Variable data type** - 데이터 유형으로 **Table**을 선택합니다.

    **Variable description** - 다음을 복사해 붙여넣습니다.

    ```text
    List of available devices by device type
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.2_09_OutputVariable.png' | relative_url }}" alt="Output properties" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Output properties</figcaption></figure>

1. 이제 토픽의 입력·출력 정의를 완료했습니다. **X 아이콘**을 선택해 **Topic details** 패널에서 나갑니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.2_10_ExitTopicDetailsPane.png' | relative_url }}" alt="Exit from topic details pane." loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Exit from topic details pane.</figcaption></figure>

### 7.3 커넥터로 도구 추가하기

1. 이제 **Devices** SharePoint 목록에서 기기 목록을 가져올 수 있게 해주는 노드를 추가합니다. 트리거 아래의 **+ 아이콘**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_01_AddNode.png' | relative_url }}" alt="Add a tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a tool</figcaption></figure>

1. **Add a tool** 노드를 선택한 후 **Connector** 탭을 선택합니다. `Get items`를 검색해 **Get items** SharePoint 커넥터 액션을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_02_GetItems.png' | relative_url }}" alt="Select get items" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select get items</figcaption></figure>

1. 커넥터에는 여러분의 사용자 자격 증명이 사용되어 녹색 체크 아이콘이 표시됩니다. 필요하면 새 연결을 만드세요.

    **Get items** SharePoint 커넥터 액션을 토픽에 노드로 추가하려면 **Submit**을 선택합니다.

1. **Get items** SharePoint 커넥터 액션이 토픽에 추가되었습니다. 이제 액션의 입력을 구성할 수 있습니다. **ellipsis (...) 아이콘**을 선택하고 **Properties**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_04_GetItemsProperties.png' | relative_url }}" alt="Select Properties" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Properties</figcaption></figure>

1. **Get items** 구성 패널이 나타나며 기본으로 **Inputs** 탭이 표시됩니다. **Initiation** 탭을 선택하고 **Usage Description** 필드에 설명을 입력합니다. 다음을 복사해 붙여넣습니다.

    ```text
    Retrieves devices from SharePoint list
    ```

    <div class="info-box note" markdown="1">
    **참고** — 이 설명은 나중에 에이전트의 _Manage your connections_ 페이지를 볼 때 유용합니다. 곧 다시 다루겠습니다.
    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_05_UpdateDescription.png' | relative_url }}" alt="Get items description" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Get items description</figcaption></figure>

1. **Inputs** 탭을 선택하고, [미션 00 - 코스 설정 - 5단계: 새 SharePoint 사이트 만들기]({{ '/chapters/academy-recruit-00-course-setup/' | relative_url }})에서 설정한 **Contoso IT** 사이트와 **Devices** 목록을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_06_GetItemsInputs.png' | relative_url }}" alt="Configure Get items inputs" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Configure Get items inputs</figcaption></figure>

1. 이제 SharePoint 목록에서
    - 선택된 값을 기준으로,
    - 그리고 상태가 _Available_인 기기만

    표시하려면 필터를 적용해야 합니다. Power Fx의 도움을 받아 필터 쿼리를 입력하면 됩니다. **ellipsis (...) 아이콘**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_07_SelectVariable.png' | relative_url }}" alt="Select ellipsis icon" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select ellipsis icon</figcaption></figure>

1. 기본적으로 **Custom** 탭에 있습니다. **Formula** 탭을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_08_SelectFormula.png' | relative_url }}" alt="Select Formula tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Formula tab</figcaption></figure>

1. **expand** 아이콘을 선택해 **Formula** 필드를 확대합니다. 다음 Power Fx 표현식을 복사해 붙여넣습니다.

    `Concatenate` 함수를 사용해
    - SharePoint의 **Status** 열이 _Available_이고
    - SharePoint의 **Asset type** 열이 _질문 노드에서 선택한 기기_와 같은 항목만 필터링하는 표현식을 만듭니다.

    ```text
    Concatenate("Status eq 'Available' and AssetType eq '", Topic.VarDeviceType, "'")
    ```

    **Insert**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_09_EnterFormula.png' | relative_url }}" alt="Enter Power Fx expression and select insert" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Enter Power Fx expression and select insert</figcaption></figure>

1. 이제 Power Fx 표현식이 **Get items** 액션의 Filter Query 입력 파라미터에 적용됩니다. 다음으로 **Limit Columns by View**에서 **All items** 뷰를 선택합니다. 이렇게 하면 선택한 뷰에 있는 열만 목록에서 가져옵니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_10_LimitColumnsByView.png' | relative_url }}" alt="List Columns by View" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>List Columns by View</figcaption></figure>

1. 다음으로 출력 변수의 이름을 업데이트합니다. **Outputs** 탭을 선택하고 `GetItems` 변수를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_11_ConfigureOutputs.png' | relative_url }}" alt="Update variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Update variable</figcaption></figure>

1. 이름을 다음으로 업데이트합니다.

    ```text
    VarDevices
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_12_RenameVariable.png' | relative_url }}" alt="Update variable name" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Update variable name</figcaption></figure>

1. 아래로 스크롤해 **Usage** 섹션에서 **Global**을 선택합니다. 이렇게 하면 이 변수는 어떤 토픽에서든 접근할 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_13_UpdateToGlobalVariable.png' | relative_url }}" alt="Update to Global variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Update to Global variable</figcaption></figure>

1. **Variable properties** 패널을 **닫습니다(Close)**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_14_ExitVariablePropertiesPane.png' | relative_url }}" alt="Close Variable properties pane" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Close Variable properties pane</figcaption></figure>

1. **plus +** 아이콘을 선택해 새 노드를 삽입하고, **Variable management**를 선택한 뒤 **Set a variable value**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_15_AddSetAVariableValueNode.png' | relative_url }}" alt="Add Set a variable value node" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add Set a variable value node</figcaption></figure>

1. **Set variable** 입력 파라미터의 **greater than** 아이콘을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_16_SelectAVariable.png' | relative_url }}" alt="Set variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Set variable</figcaption></figure>

1. 앞서 만든 토픽 출력 변수, **VarAvailableDevices**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_17_SelectVarAvailableDevices.png' | relative_url }}" alt="Save topic" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Save topic</figcaption></figure>

1. 다음으로 변수의 값을 정의하기 위해 **ellipsis (...) 아이콘**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_18_SelectVariable.png' | relative_url }}" alt="Select variable value" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select variable value</figcaption></figure>

1. **Formula** 탭을 선택하고 **expand** 아이콘을 선택해 **Formula** 필드를 확대합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_19_SelectFormulaTab.png' | relative_url }}" alt="Select Formula tab and select expand icon" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Formula tab and select expand icon</figcaption></figure>

1. 이제 Power Fx 표현식을 사용해 변수 값을 **Get items** 응답에서 반환된 `value` 속성으로 설정하고, `Global` 접두어를 붙여 [변수의 범위](https://learn.microsoft.com/microsoft-copilot-studio/advanced-power-fx?WT.mc_id=power-172618-ebenitez)를 전역으로 만듭니다.

    **Insert**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_20_EnterFormula.png' | relative_url }}" alt="Power Fx formula for variable value" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Power Fx formula for variable value</figcaption></figure>

1. 이제 **To value** 필드가 Power Fx 수식으로 설정된 것을 볼 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_21_Formula.png' | relative_url }}" alt="To value field" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>To value field</figcaption></figure>

1. 다음으로 에이전트 지침을 업데이트해야 합니다. **Overview** 탭을 선택하고 **Edit**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_22_EditInstructions.png' | relative_url }}" alt="Edit instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Edit instructions</figcaption></figure>

1. **header** 아래에서 **기기 지원(device assistance)**에 관한 다음 지침을 선택해 삭제합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_23_ClearInstructions.png' | relative_url }}" alt="Add instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add instructions</figcaption></figure>

1. 지침에 새 줄을 추가하고, 다음을 복사해 붙여넣습니다.

    ```text
    1. Help find available devices and give full details using [Available devices]. Always extract the VarDeviceType from the inputs. After giving device details, ask the user if they want to request a device from the list of available devices.
    ```

    이 지침은 생성형 AI가 **Available devices** 트리거를 호출해 **Devices** SharePoint 목록에서 사용 가능한 기기 목록을 표시하도록 안내합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_24_UpdateInstructions.png' | relative_url }}" alt="Update instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Update instructions</figcaption></figure>

1. 대괄호로 된 토픽 자리표시자 전체를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_25_HighlightPlaceholder.png' | relative_url }}" alt="Highlight placeholder" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Highlight placeholder</figcaption></figure>

1. 슬래시 문자 `/`를 입력하면 토픽 목록이 나타납니다. **Available devices** 토픽을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_26_SelectAvailableDevicesTopic.png' | relative_url }}" alt="Reference trigger" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Reference trigger</figcaption></figure>

1. 이제 사용 가능한 기기에 대해 물으면 에이전트가 이 토픽을 호출합니다. 업데이트된 지침을 **Save**합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_27_SaveUpdatedInstructions.png' | relative_url }}" alt="Save instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Save instructions</figcaption></figure>

1. 이제 업데이트된 에이전트를 테스트합니다. 오른쪽 상단의 **Test**를 선택해 테스트 패널을 표시하고 테스트 패널을 **새로고침**합니다. 다음 메시지를 에이전트에 입력합니다.

    ```text
    I need a laptop
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_28_NewTestSession.png' | relative_url }}" alt="Test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Test</figcaption></figure>

1. 에이전트가 진행하기 전에 사용자는 연결 사용에 동의해야 합니다. **Allow**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_29_SelectAllow.png' | relative_url }}" alt="Select allow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select allow</figcaption></figure>

1. 에이전트는 사용한 Power Fx 표현식에 따라 기기 유형이 "laptop"이고 상태가 "available"인 필터링된 기기 목록을 가져오는 SharePoint 도구를 실행합니다. 사용자가 읽기 쉽게 글머리 기호 형식으로 응답이 반환됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_30_TestResponse.png' | relative_url }}" alt="Response of test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Response of test</figcaption></figure>

1. 마지막으로 배울 것은 에이전트의 _Manage your connections_ 페이지에서 사용된 연결을 확인하는 것입니다. **ellipsis (...)**를 선택하고 **Manage Connection**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_31_ManageConnections.png' | relative_url }}" alt="Manage connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Manage connection</figcaption></figure>

1. 이 페이지에서 에이전트가 사용하는 모든 연결을 볼 수 있습니다. 현재는 토픽에 추가된 SharePoint 도구와 관련된 연결 하나만 나열되어 있습니다. **Used By** 열에서 **1 tool**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_32_UsedBy.png' | relative_url }}" alt="Used By" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Used By</figcaption></figure>

1. 여기서 Get items 액션의 세부 정보를 볼 수 있으며, 앞서 입력했던 _사용 설명(usage description)_ 을 기억하시나요? 바로 여기서 이 사용 설명을 확인할 수 있습니다. **Close**를 선택합니다.

    <div class="info-box note" markdown="1">
    **참고** — 이를 통해 어떤 액션이 사용되고 그 목적이 무엇인지 알 수 있어, 연결을 체계적으로 관리하는 데 도움이 됩니다 📁.
    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-07-add-new-topic-with-trigger/7.3_33_UsedByInformation.png' | relative_url }}" alt="Usage description" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Usage description</figcaption></figure>

1. Copilot Studio가 있는 브라우저 탭으로 돌아가 테스트 패널을 **새로고침**해 테스트를 지웁니다.

## ✅ 미션 완료

성공적으로 완료했습니다:

- **토픽 설계**: 입력, 출력, 대화 노드가 있는 토픽 만들기
- **SharePoint 커넥터**: Devices 목록에서 기기 레코드 가져오기
- **Power Fx 필터링**: 사용 가능 여부와 기기 유형으로 레코드 필터링하기
- **에이전트 지침**: 적절한 시점에 토픽을 호출하도록 에이전트 구성하기

다음으로 [미션 08: Adaptive Card로 토픽 강화하기]({{ '/chapters/academy-recruit-08-add-adaptive-card/' | relative_url }})를 계속 진행하세요.

## 📚 전술 자료

🔗 [시스템 토픽 사용하기](https://learn.microsoft.com/microsoft-copilot-studio/authoring-system-topics?mc_id=power-172618-ebenitez)

🔗 [Microsoft Copilot Studio의 토픽](https://learn.microsoft.com/microsoft-copilot-studio/guidance/topics-overview?WT.mc_id=power-172618-ebenitez)

🔗 [토픽 트리거 설정하기](https://learn.microsoft.com/microsoft-copilot-studio/authoring-triggers?WT.mc_id=power-172618-ebenitez)

🔗 [에이전트 토픽 정의하기](https://learn.microsoft.com/microsoft-copilot-studio/guidance/defining-chatbot-topics?WT.mc_id=power-172618-ebenitez)

🔗 [Power Fx로 표현식 만들기](https://learn.microsoft.com/microsoft-copilot-studio/advanced-power-fx?WT.mc_id=power-172618-ebenitez)

📺 [자연어로 토픽 작성하기](https://aka.ms/ai-in-action/copilot-studio/ep6)

📺 [커넥터를 사용해 에이전트에 액션 추가하기](https://aka.ms/ai-in-action/copilot-studio/ep4)
