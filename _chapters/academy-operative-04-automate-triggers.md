---
layout: "chapter"
title: "🚨 미션 04: 자율적으로 동작하도록 이벤트 트리거 추가"
short_title: "04. 이벤트 트리거 추가"
description: "이벤트 기반 트리거로 자율적인 에이전트 동작을 구현합니다"
order: 4
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/04-automate-triggers/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-17"
canonical_url: "https://microsoft.github.io/agent-academy/operative/04-automate-triggers/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 04: Add Event Triggers to act autonomously](https://microsoft.github.io/agent-academy/operative/04-automate-triggers/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

🎥 **워크스루 보기**

<figure class="screenshot">
  <a href="https://youtu.be/lXdlj4DjR28?si=32nUxgFNUv2VVmTD" target="_blank" rel="noopener">
    <img src="{{ '/assets/academy/operative-04-automate-triggers/04-automate-triggers_thumbnail_PlayButton.png' | relative_url }}" alt="Automate-Triggers 동영상 썸네일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
</figure>

## 🎯 미션 브리핑

다시 오신 것을 환영합니다, Agent. [Mission 03]({{ '/chapters/academy-operative-03-multi-agent/' | relative_url }})에서는 Application Intake 자식 에이전트와 Interview Prep 연결 에이전트를 만들어, 주 Hiring Agent의 역량을 더 넓히는 방법을 배웠습니다.

이번 임무의 이름은 **Operation Signal Point**입니다. 이제 **event triggers**를 더 깊이 다루며, 에이전트 시스템을 반응형에서 **자율 동작** 단계로 끌어올립니다. 사람의 입력을 기다리던 에이전트를, 외부 이벤트에 선제적으로 반응하고 감독 없이도 지능적으로 행동하는 에이전트로 바꾸게 됩니다.

즉, _질문에 답하는_ 에이전트에서 _필요를 먼저 감지하고_ _스스로 행동하는_ 에이전트로 업그레이드하는 것입니다. 이벤트 트리거와 자동화 워크플로를 통해 Hiring Agent는 들어오는 이력서 이메일을 감지하고, 첨부 파일을 자동 처리하며, Dataverse에 데이터를 저장하고, Microsoft Teams를 통해 HR 채용 팀에 알림을 보냅니다. 그동안 여러분은 더 높은 가치의 업무에 집중할 수 있습니다.

자동화와 지능이 만나는 세계에 오신 것을 환영합니다.

<div class="info-box note" markdown="1">
**참고** — 이 실습의 스크린샷과 Copilot Studio 화면이 다르게 보인다면, 오른쪽 위의 **New Experience**를 꺼서 여기서 사용하는 **classic experience**로 전환하세요.
</div>

## 🔎 목표

이 미션에서 배우게 될 내용은 다음과 같습니다.

1. 이벤트 트리거가 사용자 상호작용 없이 자율적인 에이전트 동작을 가능하게 하는 방법
1. Copilot Studio에서 interactive agent와 autonomous agent의 차이
1. 이메일 첨부 파일을 자동 처리하고 Dataverse에 파일을 업로드하는 이벤트 트리거를 만드는 방법
1. 알림을 위해 Teams 채널에 adaptive card를 게시하는 agent flow를 만드는 방법
1. 엔드투엔드 자동화를 위해 이벤트 트리거와 agent flow 사이에서 데이터를 전달하는 방법

## 🤔 Event trigger란 무엇인가요?

이전에 [Recruit](https://microsoft.github.io/agent-academy/recruit/10-add-event-triggers/)에서 event trigger를 배웠습니다. 놓치셨을 수 있으니 여기서 빠르게 다시 정리해보겠습니다.

**Event triggers**는 다른 시스템에서 어떤 일이 발생했을 때, 사용자 메시지 없이도 에이전트가 스스로 _행동_ 하도록 해줍니다. 예를 들어 “새 SharePoint 항목”, “새 이메일”, “Planner 작업 할당”, 시간 기반 반복 실행 같은 설정된 이벤트가 발생하면, 커넥터가 트리거 페이로드를 에이전트로 보냅니다. 그러면 에이전트는 여러분이 정의한 지침을 따라 어떤 액션이나 토픽을 호출할지 결정합니다.

### 주요 특징

- **자율 활성화:**
      - 사용자가 에이전트에 입력할 때 시작되는 topic trigger와 달리, event trigger는 외부 이벤트에서 발생하므로 선제적 동작이 가능합니다.

- **페이로드 기반:**
      - 각 이벤트는 커넥터를 통해 페이로드(변수 + 선택적 지침)를 전달합니다. 에이전트는 여러분이 정의한 지침과 페이로드를 사용해 다음에 무엇을 할지 결정합니다.
      - 예를 들어 _토픽 호출_ 또는 _Tools에 정의된 액션 실행_ 이 가능합니다.

- **기본 제공 예시:**
      - SharePoint/OneDrive 파일 또는 항목 생성
      - Planner 작업 완료/할당
      - Microsoft Forms 응답 제출
      - Recurrence/일정

    사용 가능 여부는 Power Automate에 구성된 조직의 데이터 정책에 따라 달라집니다.

- **생성형 오케스트레이션 필요:**
      - Event trigger는 에이전트에서 generative orchestration이 활성화된 경우에만 사용할 수 있습니다.

- **과금/사용량:**
      - 각 트리거 전달은 Copilot Studio 용량 기준에서 하나의 메시지로 계산됩니다.
      - 예를 들어 10분 간격 recurrence는 10분마다 메시지를 하나씩 보냅니다.

- **인증 모델 및 설정:**
      - 트리거는 에이전트 Overview의 _Triggers_ 아래에서 추가합니다. 트리거 커넥터 인증은 에이전트 작성자 계정(“agent author authentication”)을 사용합니다.
      - Power Automate maker portal에서 트리거 매개변수와 페이로드를 편집할 수 있습니다.

- **테스트 및 관찰 가능성:**
      - 게시 전에 에이전트의 테스트 창에서 트리거를 테스트하고 activity map으로 동작을 확인할 수 있습니다.

<div class="info-box note" markdown="1">
**개발자용 TL;DR** — Event trigger를 **webhook 같은 신호**로 생각하면 이해하기 쉽습니다. 구조화된 페이로드를 에이전트로 푸시해, 사용자가 먼저 요청하지 않아도 에이전트가 작업을 _시작_ 하고 여러 시스템에 걸쳐 액션을 연쇄적으로 실행할 수 있게 해줍니다.
</div>

### Topic trigger와의 차이

이전에 [Recruit](https://microsoft.github.io/agent-academy/recruit/07-add-new-topic-with-trigger/)에서 topic trigger를 배웠지만, 여전히 _Topic_ trigger와 _Event_ trigger가 어떻게 다른지, 그리고 이 구분이 에이전트를 자율적으로 이해하는 데 왜 중요한지 궁금할 수 있습니다.

Topic trigger는 _언제 토픽이 실행되는지_ 를 제어하며, 보통 사용자 메시지에 대한 응답으로 실행됩니다.

- Generative orchestration에서는 기본 트리거가 **By agent**이며, 플래너가 사용자 메시지에 가장 잘 맞는 이름/설명의 토픽을 선택합니다.
- Classic orchestration에서는 기본이 **Phrases**이며, 하나 이상의 트리거 구문이 사용자 메시지와 가장 잘 맞을 때 플래너가 토픽을 선택합니다.

다른 트리거 유형으로는 `Message received`, `Event received`, `Activity received`, `Conversation update`, `Invoke received`, `On redirect`, `Inactivity`, `Plan complete`가 있습니다.

<div class="info-box note" markdown="1">
**핵심 차이** — Topic trigger는 채팅 내부에서 대화 활동을 시작하는 장치입니다.

Event trigger는 커넥터를 통해 전달되는 시스템 _이벤트_ 로 시작되며, 대화가 전혀 없어도 에이전트를 실행할 수 있습니다.
</div>

### Topic trigger vs Event trigger 빠른 가이드

- **Topic trigger:** 사용자(또는 채팅 활동)가 X를 말하거나 수행함 ➡️ Topic T 실행
- **Event trigger:** SharePoint/Planner/Email/Timer가 payload P와 함께 실행됨 ➡️ 에이전트가 지침 평가 ➡️ 필요에 따라 Actions/Topics 호출

## 🏓 Interactive agent vs Autonomous agent 비교

이제 event trigger와 topic trigger의 차이를 알았으니, 다음으로 interactive agent와 autonomous agent의 차이를 살펴보겠습니다.

Copilot Studio 관점에서 "interactive"는 주로 채팅이나 채널에서 **topics**를 통해 상호작용하는 에이전트를 의미합니다. "autonomous"는 **event triggers**도 활용하여 사용자 입력 없이 실행되는 에이전트를 의미합니다.

다음 표는 두 방식의 차이점과 공통점을 요약합니다.

| 구분 | Interactive agent | Autonomous agent |
|---|---|---|
| 시작 방식 | 사용자(또는 채팅 활동)가 토픽을 트리거합니다. 예: By agent, Phrases, Message received | 외부 event trigger가 커넥터를 통해 에이전트로 payload를 보냅니다. 예: SharePoint, Planner, email, schedule 등 |
| 주요 용도 | Q&A, 안내형 워크플로, Teams·웹 등의 채팅에서 사용자가 요청해 실행하는 작업 | 선제적 운영과 백그라운드 자동화 — 시스템 변경에 반응한 뒤 알림, 파일 처리, 작업 오케스트레이션 수행 |
| 트리거 표면 | Topic triggers: By agent / Phrases / Message received / Activity types / Invoke / Inactivity / Plan complete | 커넥터 기반 Event triggers 라이브러리 사용, payload에는 이벤트 데이터와 선택적 지침 포함 |
| 플래너(generative orchestration) | By agent 및 Plan complete 트리거에서 토픽 선택·순서 결정에 적극 활용 | Event trigger에 필수이며, 에이전트는 지침 + payload를 바탕으로 어떤 action/topic을 호출할지 결정 |
| 대표 예시 | 사용자가 \"환불 정책이 무엇인가요?\"라고 묻는다 → Topic 실행 → 지식 조회 후 응답 | 새 Planner 작업이 할당된다 → Event trigger 실행 → 에이전트가 Teams 메시지를 게시하거나, 레코드를 업데이트하거나, 토픽을 호출 |
| 설정 경로 | 토픽 생성 → 트리거 유형 정의 → 대화/액션 작성 → 채널에 게시 | Event trigger 추가(Overview → Triggers) → 에이전트 작성자 자격 증명으로 커넥터 인증 → payload/지침 구성 → test pane에서 테스트 → 게시 |
| 인증 및 거버넌스 | 채널/인증 컨텍스트에서 실행되며, 허용된 채널의 채팅 활동에 응답 | 사용 가능 여부는 Power Automate 데이터 정책에 좌우되며, 커넥터는 에이전트 작성자 계정으로 실행 |
| 관찰 가능성 | Copilot Studio 안에서 토픽을 테스트하고 대화 기록/활동을 확인 | 게시 전 Test trigger와 activity map으로 실행 검증, 게시 후 활동 모니터링 |
| 용량 영향 | 사용자 메시지와 에이전트 응답 각각이 용량을 소비하는 메시지로 계산 | 각 이벤트 전달도 메시지로 계산되며 후속 액션 사용량이 추가됨. 예: 10분 recurrence = 시간당 6개 메시지 |

### 언제 무엇을 사용해야 할까요?

- 사용자가 에이전트 대화를 시작하는 FAQ, 단계형 인테이크, 채팅 내부의 명령형 작업에는 **topic triggers (interactive)** 를 선택하세요. 플래너의 By agent 트리거는 수동으로 트리거 구문을 관리하는 부담을 줄여줍니다.
- 에이전트가 스스로 대화를 시작하거나 행동해야 하는 SharePoint/Dataverse 변경, 수신 이메일, 예약 실행 시나리오에는 **event triggers (autonomous)** 를 추가하세요. 이렇게 하면 반응형 운영에서 선제적 운영으로 전환할 수 있습니다.

## 개발자 팁 & 주의사항

1. 에이전트를 자율형으로 만들고 싶다면 **generative orchestration**을 활성화하세요. 그렇지 않으면 event trigger가 표시되지 않습니다.

1. **페이로드를 초기에 설계**하세요. `itemId`, `assignedTo`, `dueDate`처럼 에이전트가 트리거에서 꼭 받아야 할 최소 필드를 먼저 정하고, payload 값에 따라 어떤 action/topic을 호출할지 간결한 지침을 추가하세요.

1. **인증 범위가 중요합니다.** 트리거는 에이전트 작성자 계정으로 인증됩니다. 이 계정이 적절한 커넥터 권한을 갖고 있으며 Power Automate 데이터 정책을 준수하는지 확인하세요.

1. **비용과 노이즈를 제어**하세요. 빈도가 높은 recurrence나 지나치게 많은 이벤트를 보내는 소스는 메시지 사용량을 빠르게 늘릴 수 있습니다. 가능하면 빈도를 낮추거나, 트리거 조건으로 이벤트를 필터링하세요.

1. **게시 전에 테스트**하세요. **Test trigger**와 activity map을 사용해 계획과 호출된 액션을 확인하고, 지침/페이로드를 반복 조정해 동작이 안정적이 되도록 만드세요.

## 🧪 Lab 4 - 지원자 신청 이메일 자동화

이제 **Hiring Agent**에 event trigger를 추가하고, 자율 처리를 위해 자식 **Application Intake Agent** 안에 agent flow를 만들어 추가 처리를 수행하겠습니다.

### ✨ 사용 사례 시나리오

**역할** HR Recruiter

**원하는 것** 내 Inbox에 이력서가 포함된 이메일이 도착하면 알림을 받고, 해당 이력서가 Dataverse에 자동 업로드되기를 원합니다.

**목적** 이메일로 전송된 이력서가 Dataverse에 자동 업로드되는 과정을 놓치지 않고 계속 파악할 수 있습니다.

이번 실습에서는 두 가지 기법을 사용합니다.

1. 이메일 도착 시 실행되는 event trigger
    1. 파일의 `contentType`이 형식상 `PDF`인지 확인합니다.
    1. 파일을 추출한 뒤 Dataverse 커넥터의 액션을 통해 업로드합니다.
    1. 그런 다음 Dataverse 액션의 입력 매개변수를 전달하여 에이전트에 후속 처리를 요청하는 프롬프트를 보냅니다.

1. 자식 **Application Intake Agent**에 agent flow를 추가합니다. 이 플로우는 event trigger의 프롬프트에 의해 호출됩니다.
    1. Event trigger 프롬프트에서 전달한 입력 매개변수를 사용해 Microsoft Teams 채널에 adaptive card를 게시하여 HR Recruitment 팀에 알립니다. 이 adaptive card에는 **Hiring Agent**에서 열 수 있는 Dataverse 행 링크가 포함됩니다.

시작해봅시다!

### ✨ 이 미션을 완료하기 위한 사전 준비

이 랩을 완료하려면 다음이 필요합니다.

- **[Mission 01](https://microsoft.github.io/agent-academy/operative/01-get-started/)과 [Mission 03]({{ '/chapters/academy-operative-03-multi-agent/' | relative_url }})을 완료하고 Hiring Agent가 준비되어 있어야 합니다.**
- 두 번째 실습인 Microsoft Teams 채널에 adaptive card 게시를 수행하려면 **Microsoft Teams**에 대한 액세스도 필요합니다.

### 🧪 Lab 4.1 - 이메일로 받은 이력서를 Dataverse에 자동 업로드하기

1. Hiring Agent에서 **Overview tab** 아래쪽의 **Triggers and Channels** 섹션으로 스크롤한 뒤 **+ Add**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_addTrigger.png' | relative_url }}" alt="에이전트에 트리거 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 트리거 목록이 나타나면 **When a new email arrives (V3)** 를 선택하고 **Next**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_selectTrigger.png' | relative_url }}" alt="When a new email arrives (V3) 트리거 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 **Trigger name**과 표시된 앱들의 **Sign in** connection reference를 보게 됩니다. 트리거 이름을 다음과 같이 바꾸세요.

    ```text
    When a new email arrives from an applicant
    ```

    참고: 나열된 앱의 connection reference마다 녹색 체크가 있는지 확인하세요. 녹색 체크가 없다면 줄임표(...)를 선택한 뒤 **+ New connection reference**를 선택해 새 connection reference를 만드세요.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_triggerName.png' | relative_url }}" alt="트리거 이름과 connection reference 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 마지막 단계는 트리거의 입력 속성을 설정하는 것입니다. 다음 속성을 아래와 같이 업데이트하세요.

     | Property | How to Set | Details |
     |----------|------------|---------|
     | **Include Attachments (Optional)** | Dropdown | Yes |
     | **Subject Filter (Optional)** | Type/Enter with keyboard | Application |
     | **Only with Attachments (Optional)** | Dropdown | Yes |

    그런 다음 **Create trigger**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_triggerSettings.png' | relative_url }}" alt="트리거 입력 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 생성이 완료되면 트리거가 에이전트에 추가되었다는 확인 메시지가 나타납니다. **Close**를 선택하면 **Triggers** 섹션에 트리거가 표시됩니다.
1. 이제 event trigger를 업데이트해 자동화 기능을 더 추가하겠습니다. 트리거 옆의 **ellipsis (...)** 를 선택하고 **Edit in Power Automate**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_editInPowerAutomate.png' | relative_url }}" alt="Edit in Power Automate 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 그러면 Power Automate maker portal에서 이 트리거가 하나의 flow로 로드됩니다. 추가 로직과 액션을 넣을 수 있는 flow designer가 열리며, 맨 위에는 트리거가, 맨 아래에는 **Sends a prompt to the specified copilot for processing** 액션이 표시됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_06_EditInPowerAutomate.png' | relative_url }}" alt="Power Automate maker portal의 플로우 디자이너" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 기본적으로 Power Automate의 **When a new email arrives** 트리거는 여러 이메일이 동시에 도착하면 이를 한 번에 묶어 처리하여, 배치 전체에 대해 flow를 한 번만 실행할 수 있습니다.

    각 이메일마다 flow가 별도로 실행되도록 하려면, 트리거 설정에서 **Split On** 옵션을 켜고 드롭다운 배열 필드에 `@triggerOutputs()?['body/value']`를 선택하세요.

    **Split On**을 켜고 배열 필드를 `@triggerOutputs()?['body/value']`로 설정하면, 많은 이메일이 동시에 도착해도 flow는 각 메시지마다 개별적으로 실행됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_07_UpdateTriggerSettings.png' | relative_url }}" alt="트리거에서 Split On 설정 켜기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음으로 첨부 파일의 형식을 확인하는 로직을 추가하겠습니다. 우리는 .PDF 첨부 파일만 업로드하고 이미지(예: 이메일 서명 이미지)는 제외하고자 합니다. 트리거 아래의 **+** 아이콘을 선택하고 **Built in tools** 섹션 아래에서 **Control**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_08_Control.png' | relative_url }}" alt="Control 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Condition** 액션을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_09_AddConditionAction.png' | relative_url }}" alt="Condition 액션 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 첨부 파일의 형식이 .PDF인지 확인하도록 조건을 구성합니다. 왼쪽의 **Choose a value** 필드에서 **lightning bolt icon**을 선택합니다.

1. **Search** 필드에 다음을 입력합니다.

    ```text
    content type
    ```

1. 그런 다음 트리거의 **Attachments Content-Type** 매개변수를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_flowconditionval.png' | relative_url }}" alt="조건 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 여기서 잠깐 멈춰보겠습니다. **For each** 액션이 자동으로 나타난 것을 보셨을 것입니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_flowforeach.png' | relative_url }}" alt="For each" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    이 액션은 이메일의 각 첨부 파일을 반복 처리한다는 의미입니다. **Attachments Content-Type** 매개변수가 각 첨부 파일에 연결되어 있기 때문입니다.

    내부적으로 이는 배열(array)이며, 바로 그 이유 때문에 **Condition** 액션에서 **Attachments Content-Type** 매개변수를 선택했을 때 **For each** 액션이 자동으로 추가된 것입니다.

    이에 대해 더 알고 싶다면 아래의 추가 학습 블록을 펼쳐 보세요.

<details>
<summary>추가 학습: For each 액션이 자동으로 나타나는 이유</summary>

🤔 **왜 "Apply to each" 또는 "For each"가 자동으로 나타날까요?**

Power Automate에서 첨부 파일 목록, 이메일 목록, 행 목록처럼 리스트나 배열을 나타내는 매개변수(동적 콘텐츠)를 선택하면, 시스템은 각 항목을 개별적으로 처리하려는 의도가 있을 수 있다고 판단합니다.

이를 돕기 위해 Power Automate는 액션 주위에 **“Apply to each”**(또는 **For each**) 루프를 자동으로 추가합니다. 이렇게 하면 액션이 목록 전체를 한꺼번에 처리하려다 오류를 내는 대신, 목록의 각 항목마다 한 번씩 실행됩니다.

🦋 **예시**

- 이전 액션에서 배열인 "Attachments"를 선택한 뒤, 단일 파일을 기대하는 액션에 사용하려고 하면 Power Automate는 자동으로 **"Apply to each"**(또는 **For each**) 루프를 감쌉니다.
- 따라서 액션은 **각 첨부 파일마다** 한 번씩 실행됩니다.

💡 **핵심 포인트**

- **자동 추가:** 컬렉션의 각 항목을 처리할 수 있도록 루프가 자동으로 나타납니다.
- **오류 방지:** 루프가 없으면 액션이 여러 항목을 한꺼번에 처리하지 못해 실패할 수 있습니다.
- **시각적 힌트:** 흐름이 목록의 각 항목에 대해 액션을 반복 실행한다는 것을 시각적으로 보여줍니다.
</details>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_11_ForEach.png' | relative_url }}" alt="For Each 액션 설명" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

<details>
<summary>추가 학습: 조건 분기 대신 Trigger Conditions 사용하기</summary>

**Trigger conditions는 트리거 자체를 선택적으로 실행할 수 있게 확장합니다.**

💡 흐름 내부에서 분기 로직을 처리하는 대신 더 효율적인 대안으로, Power Automate의 트리거는 자체적인 trigger conditions를 가질 수도 있습니다.

Trigger conditions는 트리거의 payload에 접근할 수 있습니다. 이 실습에서는 첨부 파일이 트리거 본문의 `attachments` 배열 안에 들어 있습니다.

다음 식은 attachments 배열이 비어 있지 않은지 **AND** 첫 번째 항목의 content type이 `application/pdf`인지 확인합니다. 이 식은 배열의 첫 번째 첨부 파일만 검사한다는 점에 유의하세요.

```text
    @and(not(empty(triggerOutputs()?['body/attachments'])),equals(toLower(first(triggerOutputs()?['body/attachments'])?['contentType']),'application/pdf'))
```

이 조건은 트리거를 선택했을 때 **Settings** 탭에서 지정할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1.11.1_triggercondition.png' | relative_url }}" alt="Trigger Conditions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>
</details>

1. 이제 오른쪽의 다른 **Choose a value** 필드에 다음을 입력합니다.

    ```text
    application/pdf
    ```

    이렇게 하면 각 첨부 파일에 대해 파일 형식이 .PDF인지 확인하게 됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_12_EqualToValue.png' | relative_url }}" alt="같은 값 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 **True** 경로를 구성해 이메일에서 파일을 추출하고 **Resume** Dataverse 테이블에 업로드하겠습니다.

    **True** 경로 아래에 새 액션을 추가하고 `html to text`를 검색한 뒤 **Html to text** 액션을 선택합니다.

    **Html to text** 액션에 대해 더 알고 싶다면 아래의 추가 학습 블록을 펼쳐 보세요.

<details>
<summary>추가 학습: Html to text 액션</summary>

🤔 **"HTML to text" 액션이란 무엇인가요?**

Power Automate의 **HTML to text** 액션은 HTML 형식의 콘텐츠를 일반 텍스트로 변환할 때 사용합니다. 이메일 본문, 웹 콘텐츠, API 응답처럼 HTML 태그를 포함한 데이터를 받아 사람이 읽을 수 있는 텍스트만 추출하고 싶을 때 특히 유용합니다.

⚙️ **어떻게 동작하나요?**

- **입력:** HTML 문자열(예: 이메일 본문)을 제공합니다.
- **출력:** 모든 HTML 태그를 제거하고 일반 텍스트만 반환합니다.

👍🏻 **언제 사용하면 좋나요?**

- HTML이 포함된 이메일, 웹 페이지, API 응답에서 읽을 수 있는 텍스트만 추출하고 싶을 때
- HTML을 지원하지 않는 시스템(SMS, Teams 메시지, 데이터베이스 등)으로 보내기 전에 내용을 정리할 때
- 후속 처리나 분석을 위해 데이터를 정제할 때

🔭 **어디에서 찾을 수 있나요?**

- Agent Flows에서 `HTML to text` 액션을 검색하세요. **Data Operations** 커넥터 아래에 있습니다.

💡 **핵심 포인트**

- 모든 HTML 태그를 제거하고 텍스트만 남깁니다.
- 스크립트나 스타일을 해석하거나 실행하지 않고 태그만 제거합니다.
- 데이터 정리와 일반 텍스트 출력 준비에 유용합니다.
</details>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_13_AddHTMLToTextAction.png' | relative_url }}" alt="HTML to text 액션 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음으로 **Html to text** 액션용 새 connection reference를 만들어야 합니다. **Create new**를 선택하세요.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_createnewhtmlconnection.png' | relative_url }}" alt="새 connection reference 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 액션을 구성할 수 있습니다. 트리거의 **Body** 매개변수를 추가하겠습니다. **Content** 필드에서 오른쪽의 **lightning bolt icon** 또는 **fx icon**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_15_AddDynamicContent.png' | relative_url }}" alt="동적 콘텐츠 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Dynamic content** 탭에서 `body`를 검색하고 **Body** 매개변수를 선택한 뒤 **Add**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_16_AddDynamicContent.png' | relative_url }}" alt="Body 매개변수 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이 액션 구성이 끝났으므로, 왼쪽을 가리키는 이중 꺾쇠 («)를 선택해 패널을 접고 액션 편집 화면에서 나옵니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_17_CollapseAction.png' | relative_url }}" alt="액션 패널 접기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Html to text** 액션 아래의 **+ icon**을 선택해 새 액션을 추가합니다. 액션 추가 패널이 열리면 **Dataverse add**를 검색하고 **Add a new row** 액션을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_19_AddANewRow.png' | relative_url }}" alt="Add a new row 액션" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 속성 패널 왼쪽 위의 이름 필드에 다음을 붙여 넣어 액션 이름을 바꿉니다.

    ```text
    Add a new Resume row
    ```

    **Table name** 매개변수에서는 `res`를 검색해 **Resumes** 테이블을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_20_RenameAndSelectResumesTable.png' | relative_url }}" alt="액션 이름 변경 및 Resumes 테이블 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음으로 **Resume Title** 필드를 선택하고 오른쪽의 **fx icon**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_21_AddDynamicContent.png' | relative_url }}" alt="Resume Title 매개변수 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Function tab**에 `item()` 함수를 사용하는 다음 식을 입력합니다.

    ```text
    item()?['name']
    ```

    **Add**를 선택해 이 식을 **Resume Title** 매개변수에 추가합니다.

    `item()` 함수에 대해 더 알고 싶다면 아래의 추가 학습 블록을 펼쳐 보세요.

<details>
<summary>추가 학습: item() 함수</summary>

🤔 **`item()` 함수란 무엇인가요?**

- **Apply to each** 액션을 사용하면 Power Automate는 컬렉션(배열)의 각 요소를 순차적으로 처리합니다.
- 이 함수는 주로 **Apply to each**(또는 **For each**), **Select**, **Filter array** 같은 액션 내부에서 사용됩니다.

⚙️ **어떻게 동작하나요?**

- `item()`은 루프나 배열 작업에서 현재 처리 중인 항목을 반환하는 함수입니다.
- 해당 루프 안에서 `item()`은 _현재 처리 중인 요소_ 를 가리킵니다.

📌 **어디에서 사용하나요?**

- **Apply to each:** 현재 항목의 속성에 접근할 때
- **Select:** 배열의 각 항목을 변환할 때
- **Filter array:** 현재 평가 중인 항목을 참조할 때

🦋 **예시**

- 루프 내부 식:
        - `item()?['Email']`
- 이는 현재 항목의 `Email` 속성을 가져옵니다.

💡 **핵심 포인트**

- `item()`은 _문맥 의존적_ 입니다. 항상 현재 루프 또는 배열 작업 안의 현재 항목을 가리킵니다.
- 루프를 중첩했다면 `items('LoopName')`을 사용해 특정 루프의 항목을 참조할 수 있습니다.
</details>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_22_ResumeTitleParameter.png' | relative_url }}" alt="Resume Title 매개변수 식 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 아직 구성할 매개변수가 몇 가지 더 있습니다. **Show all**을 선택하고 **Cover Letter** 필드에서 오른쪽의 **fx icon**을 선택합니다.

    **Function tab**에서 이전 [mission]({{ '/chapters/academy-operative-03-multi-agent/' | relative_url }})과 동일한 다음 식을 입력합니다.

    ```text
    if(greater(length(body('Html_to_text')), 2000), substring(body('Html_to_text'), 0, 2000), body('Html_to_text'))
    ```

    이 식은 **Html to text** 액션의 _텍스트_ 가 2000자를 초과하는지 확인하고, 초과하면 앞의 2000자만 반환하며, 그렇지 않으면 전체 텍스트를 반환합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_23_CoverLetterParameter.png' | relative_url }}" alt="Cover Letter 매개변수 식 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 이 식이 **Cover Letter** 필드에 추가됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_24_ExpressionForCoverLetter.png' | relative_url }}" alt="Cover Letter 매개변수에 식 추가됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Source Email Address** 필드에서는 **lightning bolt icon**을 선택하고 `from`을 검색한 뒤, 이메일 주소 값을 포함하는 트리거의 **From** 매개변수를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_25_FromParameter.png' | relative_url }}" alt="Source Email Address 매개변수" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Upload Date** 필드에서는 오른쪽의 **fx icon**을 선택합니다. **Function tab**에 `utcNow()` 함수를 사용하는 다음 식을 입력합니다.

    ```text
    utcNow()
    ```

    `utcNow` 함수에 대해 더 알고 싶다면 아래의 추가 학습 블록을 펼쳐 보세요.

<details>
<summary>추가 학습: utcNow 함수</summary>

🤔 **`utcNow()` 함수란 무엇인가요?**

- Power Automate의 utcNow() 함수는 현재 날짜와 시간을 UTC(협정 세계시) 기준 ISO 8601 형식으로 반환합니다. 예: `2025-09-23T04:32:14Z`

🦋 **예시**

- 식:
        - `concat('Report generated on ', utcnow())`
- 출력:
        - Report generated on `2025-09-23T04:32:14Z`

💡 **핵심 포인트**

- **인수(입력 매개변수)가 필요 없습니다.** 항상 현재 UTC 타임스탬프를 반환합니다.
    - **사용 사례**
        - 로그나 파일 이름에 타임스탬프 추가
        - 현재 시간을 다른 날짜와 비교
        - 스케줄링 또는 시간 기반 조건 처리
</details>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_26_UploadDateParameter.png' | relative_url }}" alt="Upload Date 매개변수" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 **Add a new Resume row** 액션 구성이 완료되었습니다. 패널을 접어 편집 화면에서 나옵니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_27_CollapseAction.png' | relative_url }}" alt="액션 패널 닫기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Add a new Resume row** 액션 아래의 **+ icon**을 선택해 새 액션을 추가합니다. 패널이 열리면 **Dataverse Upload**를 검색하고 **Upload a file or an image** 액션을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_29_AddUploadAFileOrAnImage.png' | relative_url }}" alt="Upload a file or an image 액션 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음 이름으로 액션을 변경합니다.

    ```text
    Upload Resume File
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_30_RenameAction.png' | relative_url }}" alt="액션 이름 변경" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음으로 **Content name** 필드를 선택하고 오른쪽의 **fx icon**을 선택합니다.

    **Function tab**에 `item ()` 함수를 사용하는 다음 식을 입력합니다. 이 식은 현재 항목(첨부 파일)의 `name` 속성을 가져옵니다.

    ```text
    item()?['name']
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_31_ContentNameParameter.png' | relative_url }}" alt="Content name 매개변수 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Table name** 매개변수에서는 `resumes`를 검색하고 **Resumes** 테이블을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_32_SelectResumesTable.png' | relative_url }}" alt="Resumes 테이블 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음으로 **Row ID** 필드를 선택하고 오른쪽의 **lightning bolt icon**을 선택합니다.

    `ID`를 검색하고 _Add a new row_ Dataverse 액션의 **Resume** 매개변수를 선택합니다. 이 값은 PDF 파일을 업로드할 대상 행의 ID를 포함합니다.

    **Add**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_33_RowIDParameter.png' | relative_url }}" alt="Row ID 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Column name** 필드를 선택하고 **Resume PDF** 옵션을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_34_ColumnNameParameter.png' | relative_url }}" alt="Column name 매개변수 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Content** 필드를 선택하고 오른쪽의 **fx icon**을 선택합니다.

    **Function tab**에 `item ()` 함수를 사용하는 다음 식을 입력합니다. 이 식은 현재 항목(첨부 파일)의 `contentBytes` 속성을 가져옵니다. `contentBytes`는 파일 또는 첨부 파일의 원시 바이너리 데이터를 Base64 문자열로 인코딩한 값을 의미합니다.

    ```text
    item()?['contentBytes']
    ```

1. 이 액션 구성도 끝났으니, 왼쪽을 가리키는 이중 꺾쇠 («)를 선택해 패널을 접습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_36_CollapseAction.png' | relative_url }}" alt="액션 패널 접기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음으로 **Sends a prompt to the specified copilot for processing**를 선택한 뒤 끌어다 놓아, 조건문의 _True_ 경로에서 **Upload Resume File** 액션 아래로 이동시킵니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_37_DragAndDropAction.png' | relative_url }}" alt="True 경로에서 액션 드래그 앤 드롭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Sends a prompt to the specified copilot for processing**를 선택해 구성합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_38_SelectAction.png' | relative_url }}" alt="액션 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Body/message** 필드의 내용을 모두 선택해 지웁니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_39_ClearBodyParameter.png' | relative_url }}" alt="Body 매개변수 지우기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음 텍스트를 **Body/message** 필드에 복사해 붙여 넣고 `RESUME ID PLACEHOLDER`를 강조 표시합니다.

    ```text
    Send [ResumeId (text)] = "RESUME ID PLACEHOLDER" and [ResumeTitle (text_1)] = "RESUME TITLE PLACEHOLDER" and [ResumeNumber (text_2)]= "RESUME NUMBER PLACEHOLDER" to the Tool "Notify Teams Applicant channel" in the child agent "Application Intake Agent"
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_40_ReplaceResumeIDPlaceholder.png' | relative_url }}" alt="Resume ID 자리표시자 텍스트 교체" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 오른쪽의 **lightning bolt icon**을 선택합니다.

    `resume`를 검색하고 _Add a new row Dataverse_ 액션의 **Resume** 매개변수를 선택합니다. 이 값은 생성된 Resume 행의 `ID` 값을 포함합니다.

    **Add**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_41_SelectResumeParameter.png' | relative_url }}" alt="Resume 매개변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. `RESUME TITLE PLACEHOLDER`를 강조 표시합니다. 오른쪽의 **lightning bolt icon**을 선택합니다.

    `title`을 검색하고 _Add a new row Dataverse_ 액션의 **Resume Title** 매개변수를 선택합니다. 이 값은 생성된 Resume 행의 `resume title` 값을 포함합니다.

    **Add**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_42_SelectResumeTitleParameter.png' | relative_url }}" alt="Resume Title 매개변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. `RESUME NUMBER PLACEHOLDER`를 강조 표시합니다. 오른쪽의 **lightning bolt icon**을 선택합니다.

      `resume number`를 검색하고 _Add a new row Dataverse_ 액션의 **Resume Number** 매개변수를 선택합니다. 이 값은 생성된 행의 `Resume Number` 값을 포함합니다.

    **Add**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_43_SelectResumeNumberParameter.png' | relative_url }}" alt="Resume Number 매개변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 이 액션과 event trigger flow 구성이 모두 완료되었습니다 🙌🏻 잘하고 계십니다! 이제 **Save**를 선택해 event trigger flow를 저장합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_saveTriggerFlow.png' | relative_url }}" alt="저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 agent flow의 세부 정보를 편집해야 합니다. **Back**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_45_Back.png' | relative_url }}" alt="Back 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Details** 섹션에서 **Edit**를 선택하고 **Plan**을 **Copilot Studio** 옵션으로 변경합니다.

    <div class="info-box note" markdown="1">
    **참고** — Plan을 Copilot Studio로 변환하면, event trigger flow를 Copilot Studio에서 관리할 수 있고 Power Automate 과금 대신 Copilot Studio 용량을 사용하게 됩니다.
    </div>

    그다음 **Save**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_46_ChangePlanDetails.png' | relative_url }}" alt="Copilot Studio 플랜으로 변경" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Copilot Studio plan으로 전환할지 확인하는 모달이 나타납니다. **Confirm**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_47_ConfirmCopilotStudioPlan.png' | relative_url }}" alt="Copilot Studio 플랜 변경 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 plan이 **Copilot Studio**로 업데이트되었습니다. 에이전트용 event trigger flow를 게시해야 하므로 **Edit**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_48_PlanChangedAndEdit.png' | relative_url }}" alt="플랜 변경 후 Edit" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Publish**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_49_Publish.png' | relative_url }}" alt="게시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    좋습니다! Event trigger flow가 이제 Published 상태가 되었습니다 😃

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_50_Published.png' | relative_url }}" alt="게시 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

이제 자식 **Intake Application Agent**에서 호출할 새 agent flow를 만들어 보겠습니다.

### 🧪 Lab 4.2 - Adaptive card로 Teams 채널에 알림 보내기

이제 자식 **Intake Application Agent**용 새 agent flow를 만들어, event trigger에서 전달된 값을 사용해 Teams 채널에 adaptive card를 게시하겠습니다. 이 adaptive card는 자동 업로드된 PDF에 대해 HR 채용 팀에게 알려주며, 팀이 이를 검토할 수 있게 해줍니다.

시작해봅시다!

1. **Hiring Agent**에서 **Agents** 탭을 선택하고 **Application Intake Agent**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_selectAppIntakeAgent.png' | relative_url }}" alt="Application Intake Agent 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Tools**까지 스크롤을 내리고 **+ Add**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_addToolHiring.png' | relative_url }}" alt="Tool 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Add tool** 모달이 나타나면 **+ New tool**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_newToolbtn.png' | relative_url }}" alt="New Tool 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Agent flow**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_agentflowselect.png' | relative_url }}" alt="Agent flow 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이어서 **agent flow designer**가 로드됩니다. **When an agent calls the flow** 트리거에서 **+ Add an input**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_05_SelectAddAnInput.png' | relative_url }}" alt="입력 추가 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 사용자 입력 유형으로 **Text**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_06_SelectText.png' | relative_url }}" alt="Text 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 입력 텍스트 필드에 다음 값을 붙여 넣어 입력 매개변수 이름으로 사용합니다.

    ```text
    ResumeId
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_07_ResumeIdInput.png' | relative_url }}" alt="ResumeId 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 같은 과정을 반복해 두 번째 text 입력을 추가합니다. 입력 매개변수 이름으로 다음을 붙여 넣으세요.

    ```text
    ResumeTitle
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_08_ResumeTitleInput.png' | relative_url }}" alt="ResumeTitle 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 같은 과정을 반복해 세 번째 text 입력을 추가합니다. 입력 매개변수 이름으로 다음을 붙여 넣으세요.

    ```text
    ResumeNumber
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_09_ResumeNumberInput.png' | relative_url }}" alt="ResumeNumber 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. [Recruit](https://microsoft.github.io/agent-academy/recruit/08-add-adaptive-card/#create-a-new-topic-with-an-adaptive-card-for-user-to-submit-their-request)에서 에이전트 토픽 안에 adaptive card를 추가했던 것 기억나시나요? 이번에는 agent flow 안에 adaptive card를 추가하겠습니다. 이제 Teams 채널에 adaptive card를 게시하는 또 다른 액션을 추가하겠습니다.

    트리거 아래의 **+ icon**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_10_AddNewAction.png' | relative_url }}" alt="새 액션 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Microsoft Teams post**를 검색하고 **Post card in a chat or channel** 액션을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_11_SelectPostCardInAChatOrChannel.png' | relative_url }}" alt="Post card in a chat or channel 액션 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Microsoft Teams용 connection reference를 현재 로그인한 사용자 계정으로 생성해야 합니다. **Sign in**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_12_SignInToCreateConnectionReference.png' | relative_url }}" alt="Sign in 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 사용자 계정을 선택한 뒤 **Allow access**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_13_AllowAccess.png' | relative_url }}" alt="Allow access 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음 입력 매개변수에 맞게 구성합니다.

    | Parameter | How to Set | Details |
    |----------|------------|---------|
    | **Post as** | Dropdown | Select the `Flow bot` option |
    | **Post in** | Dropdown | Select the `Channel` option |
    | **Team** | Dropdown | Select a team that's available in your environment that you have access to for the purpose of completing this lab exercise |
    | **Channel** | Dropdown | Select a channel that's available in your environment that you have access to for the purpose of completing this lab exercise |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_14_ConfigureParameters.png' | relative_url }}" alt="입력 매개변수 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음으로 **Adaptive Card** 필드를 구성합니다. **Adaptive Card** 필드를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_15_SelectAdaptiveCardParameter.png' | relative_url }}" alt="Adaptive Card 필드 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. [Resume Table Updated JSON file](https://raw.githubusercontent.com/microsoft/agent-academy/main/docs/operative/04-automate-triggers/assets/3.2_ResumeTableUpdated.json)을 열고 전체 내용을 복사한 뒤 Adaptive Card 필드에 붙여 넣습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_16_JSON.png' | relative_url }}" alt="JSON 복사 및 붙여넣기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. [Recruit](https://microsoft.github.io/agent-academy/recruit/08-add-adaptive-card/#create-a-new-topic-with-an-adaptive-card-for-user-to-submit-their-request)에서 했던 것과 비슷하게, JSON 페이로드의 기존 값을 실제 값 또는 동적 콘텐츠로 바꾸겠습니다.

    먼저 `selectAction` 속성 안의 `url` 속성 값을 업데이트합니다. 이 URL은 **Hiring Hub** model-driven app에 있는 Resumes system view의 URL로 바뀝니다. 이렇게 하면 Recruiter가 액션을 선택했을 때 model-driven app의 Resumes system view로 이동할 수 있습니다.

    현재 URL 값을 강조 표시한 뒤 삭제합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_17_SystemViewURL.png' | relative_url }}" alt="URL 값 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Hiring Hub** model-driven app에서 왼쪽 메뉴를 사용해 **Resumes** system view로 이동하고 URL을 복사합니다. 그다음 agent flow로 돌아와, 복사한 URL을 `selectAction` 속성 안 `url` 속성에 붙여 넣습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_18_CopyResumesSystemViewURL.png' | relative_url }}" alt="Resumes system view URL 복사" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음과 같은 형식이 보일 것입니다. 노란색으로 강조된 부분은 **Hiring Hub** model-driven app의 환경 세부 정보입니다.

    | Parameter | Value | Explanation |
    |----------|------------|---------|
    | **Organization URI** | GUID | The Dataverse/Dynamics 365 environment organization URL |
    | **appid** | GUID | To open a specific model-driven app, the query parameter of either appid or appname is used. In this case, the appid is used |
    | **viewid** | GUID | The query parameter which is the id of the view |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_19_PasteURL.png' | relative_url }}" alt="URL 붙여넣기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음으로 여러 속성에 동적 콘텐츠 값을 넣겠습니다. 먼저 event trigger가 자율적으로 만든 행의 Resume Number 참조를 표시하는 텍스트부터 설정합니다.

      액션 패널을 열기 위해 **panel** 아이콘을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_20_SelectPannelIcon.png' | relative_url }}" alt="패널 아이콘 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. `RESUME NUMBER PLACEHOLDER`의 `text` 속성이 보이는 줄까지 아래로 스크롤합니다. 자리표시자 값을 강조 표시하고 삭제합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_21_DeleteResumeNumberPlaceholder.png' | relative_url }}" alt="자리표시자 삭제" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 큰따옴표 사이를 클릭하고 오른쪽의 **lightning bolt icon** 또는 **fx icon**을 선택합니다.

      **Dynamic Content** 탭에서 **ResumeNumber** 매개변수를 선택하고 **Add**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_22_SelectResumeNumberParameter.png' | relative_url }}" alt="ResumeNumber 매개변수 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 `text` 속성에 **ResumeNumber** 매개변수가 동적 콘텐츠로 추가됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_23_ResumeNumberDynamicContent.png' | relative_url }}" alt="ResumeNumber 동적 콘텐츠" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 같은 과정을 `RESUME NAME PLACEHOLDER`에도 반복합니다. `RESUME NAME PLACEHOLDER`의 `text` 속성이 보이는 줄까지 스크롤하여 자리표시자 값을 강조 표시하고 삭제합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_24_ResumeNamePlaceholder.png' | relative_url }}" alt="Resume Name 자리표시자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 큰따옴표 사이를 클릭하고 오른쪽의 **lightning bolt icon** 또는 **fx icon**을 선택합니다.

      **Dynamic Content** 탭에서 **ResumeTitle** 매개변수를 선택하고 **Add**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_25_SelectResumeTitleParameter.png' | relative_url }}" alt="ResumeTitle 매개변수 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 `text` 속성에 **ResumeTitle** 매개변수가 동적 콘텐츠로 추가됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_26_ResumeTitleDynamicContent.png' | relative_url }}" alt="ResumeTitle 동적 콘텐츠" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이어서 Recruiter가 언제까지 이력서를 검토해야 하는지를 나타내는 **Due Date** 값에도 같은 과정을 반복합니다. `May 21, 2023`라는 `text` 속성이 있는 줄까지 스크롤합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_27_DueDatePlaceholder.png' | relative_url }}" alt="Due Date 자리표시자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 날짜 자리표시자 값을 삭제하고 큰따옴표 사이를 클릭합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_28_DeleteDueDatePlaceholder.png' | relative_url }}" alt="자리표시자 삭제" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 오른쪽의 **lightning bolt icon** 또는 **fx icon**을 선택하고 **Function** 탭에 다음 식을 입력한 뒤 **Add**를 선택합니다.

    ```text
    addDays(utcNow(), 3, 'MMM dd, yyyy')
    ```

    이 식은 두 가지 함수를 사용합니다.

    | Function | Explanation |
    |----------|------------|
    | **addDays** | Adds a specified number of days to a given date and returns the resulting date in string format |
    | **utcNow** | Returns the current date and time in Coordinated Universal Time (UTC) format as a string. |

    여기서 utcNow 값은 월, 일, 연도 형식으로 날짜가 표시되도록 포맷됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_29_01_ExpressionDueDate.png' | relative_url }}" alt="Due Date 식" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    이제 이 식이 `text` 속성에 추가됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_29_02_ExpressionDueDate.png' | relative_url }}" alt="Due Date 식 추가됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 마지막으로 JSON 페이로드 맨 아래 `actions` 배열 속성 안에 있는 `url` 속성을 업데이트합니다. 현재 자리표시자 URL은 **Hiring Hub** model-driven app의 Resume 행 URL로 대체됩니다. 이렇게 하면 Recruiter가 adaptive card의 `Action.OpenURL` 액션을 선택했을 때 model-driven app의 Resume로 이동할 수 있습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_30_ViewResumeURLPlaceholder.png' | relative_url }}" alt="View Resume URL 자리표시자 삭제" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Hiring Hub** model-driven app에서 왼쪽 메뉴를 사용해 **Resumes** system view의 한 행을 엽니다. 그러면 해당 resume 행이 model-driven app의 폼으로 로드됩니다.

    Resume 행의 URL을 복사합니다.

<details>
<summary>Hiring Hub model-driven app을 닫았거나 빠져나온 경우 다시 이동하는 방법</summary>

1. [https://make.powerapps.com](https://make.powerapps.com)으로 이동하고, 이 랩 실습에 사용 중인 개발자 환경에 있는지 확인하세요. 아니라면 해당 환경으로 전환합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_31_Note_01_BrowseToURL.png' | relative_url }}" alt="make.powerapps.com으로 이동" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 왼쪽 메뉴에서 **Apps**를 선택하고 **Hiring Hub** model-driven app의 **Play** 아이콘을 선택해 브라우저에서 앱을 엽니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_31_Note_02_HiringHubApp.png' | relative_url }}" alt="Hiring Hub model-driven app 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>
</details>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_31_CopyResumeURL.png' | relative_url }}" alt="Resume 행 URL 복사" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 그다음 agent flow로 돌아와 현재 자리표시자 URL 값을 강조 표시하고 삭제합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_32_SelectResumeURLPlaceHolder.png' | relative_url }}" alt="Resume 행 URL 자리표시자 삭제" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 그런 다음 복사한 URL을 `url` 속성 안에 붙여 넣습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_33_PasteResumeRowURL.png' | relative_url }}" alt="복사한 Resume 행 URL 붙여넣기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 다음과 같은 형식이 보일 것입니다. 끝에 있는 `GUID` id 값을 삭제합니다. 이를 동적 콘텐츠인 **ResumeId** 매개변수로 대체할 것입니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_34_DeleteViewResumePlaceholderURL.png' | relative_url }}" alt="View Resume URL 자리표시자 삭제" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 오른쪽의 **lightning bolt icon** 또는 **fx icon**을 선택합니다.

    **Dynamic Content** 탭에서 **ResumeId** 매개변수를 선택하고 **Add**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_35_ResumeIdParameter.png' | relative_url }}" alt="ResumeId 매개변수" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 **ResumeId**가 동적 콘텐츠로 추가됩니다. 노란색으로 강조된 부분은 **Hiring Hub** model-driven app의 환경 세부 정보입니다.

     | Parameter | Value | Explanation |
     |----------|------------|---------|
     | **Organization URI** | GUID | The Dataverse/Dynamics 365 environment organization URL |
     | **appid** | GUID | To open a specific model-driven app, the query parameter of either appid or appname is used. In this case, the appid is used |
     | **id** | GUID | The query parameter which is the id of the Resume row |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_36_ResumeIdDynamicContent.png' | relative_url }}" alt="ResumeId 동적 콘텐츠" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Post card in a chat or channel** 액션 구성이 완료되었습니다 ��🏻 **x** 아이콘을 선택해 액션 구성 패널을 닫습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_37_CloseActionPanel.png' | relative_url }}" alt="패널 닫기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 마지막으로 **Respond to the agent** 액션을 구성해, 에이전트에 텍스트를 되돌려 보내 처리 종료를 알리겠습니다.

      **Respond to the agent** 액션에서 **+Add an output**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_38_AddAnOutput.png' | relative_url }}" alt="출력 추가 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 출력 유형으로 **Text**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_39_SelectText.png' | relative_url }}" alt="출력 유형으로 Text 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 출력 이름으로 다음을 입력합니다. ```EndConversation```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_40_EndConversationOutput.png' | relative_url }}" alt="EndConversation 출력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 출력 값으로 다음을 입력합니다.

    ```text
    Finished
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_41_EndConversationOutputValue.png' | relative_url }}" alt="EndConversation 출력 값" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 agent flow 구성이 완료되었습니다. **Save draft**를 선택해 agent flow를 저장합니다. 저장이 완료되면 확인 메시지가 나타납니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_42_SaveDraft.png' | relative_url }}" alt="초안 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Agent flow를 게시하기 전에 세부 정보를 업데이트해야 합니다. **Overview** 탭으로 이동해 **Edit**를 선택합니다.

    flow name 필드에 다음을 입력합니다.

    ```text
    Notify Teams Applicant channel
    ```

    그다음 **Refresh** 아이콘을 선택해 AI로 agent flow 설명을 갱신합니다.

    이후 **Save**를 선택해 업데이트된 agent flow 세부 정보를 저장합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_43_EditDetails.png' | relative_url }}" alt="세부 정보 편집 및 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다시 **Designer** 탭으로 이동해 **Publish**를 선택하여 agent flow를 게시합니다. 게시가 완료되면 확인 메시지가 나타납니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_44_PublishAgentFlow.png' | relative_url }}" alt="agent flow 게시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 이 agent flow를 **Application Intake Agent**의 도구로 추가해야 합니다. **Hiring Agent**로 돌아가 **Agents** 탭에서 **Application Intake Agent**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_45_ApplicationIntakeAgent.png' | relative_url }}" alt="Application Intake Agent 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 에이전트의 **Details** 섹션에서 **Description** 필드를 업데이트합니다. 아래 텍스트를 복사하여 설명 끝에 붙여 넣습니다.

    ```text
    and also notifies the Teams Applicant channel
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_46_UpdateAgentDescription.png' | relative_url }}" alt="에이전트 설명 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음으로 agent flow를 도구로 추가합니다. **tools** 섹션으로 스크롤한 뒤 **+ Add**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_47_AddTools.png' | relative_url }}" alt="Add 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Flow** 탭을 선택하고 앞서 만든 agent flow **Notify Teams Applicant Channel**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_48_NotifyTeamsApplicantChannelAgentFlow.png' | relative_url }}" alt="agent flow 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음으로 **Add and configure**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_addAndConfig.png' | relative_url }}" alt="Add and configure 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Inputs** 섹션에서 앞서 agent flow에 구성한 세 개의 입력이 보입니다. 기본적으로 **Fill using** 설정은 **Dynamically fill with AI**로 되어 있습니다. 이 설정은 그대로 두겠습니다. event trigger의 마지막 액션인 **Sends a prompt to the specified copilot for processing**(즉, **Lab 4.1 - 이메일로 받은 이력서를 Dataverse에 자동 업로드하기**의 38~44단계)에서 보낼 프롬프트에, AI가 추출할 수 있는 매개변수 값이 포함되기 때문입니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_50_Inputs.png' | relative_url }}" alt="도구 agent flow 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 도구가 **Application Intake Agent**에 추가되었으므로, 에이전트의 instructions를 업데이트해야 합니다. **back arrow** 아이콘을 선택해 에이전트 목록으로 돌아갑니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_51_SelectBack.png' | relative_url }}" alt="뒤로 화살표 아이콘 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Hiring Agent**의 **Agents** 탭에서 **Application Intake Agent**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_52_SelectApplicationIntakeAgent.png' | relative_url }}" alt="Application Intake Agent 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Instructions** 필드에서 `2.Post-Upload` instructions 뒤에 새 줄을 추가합니다. 다음 지침을 복사해 붙여 넣습니다.

    ```text
    Process for Resume Upload via Email
    1. When you receive a message, **Send [ResumeId (text)] = "1680265f-5793-f011-b41b-7c1e525be9f7" and [ResumeTitle (text_1)] = "TAYLOR TESTPERSON (FICTITIOUS).pdf" and [ResumeNumber (text_2)]= "R01026" to the Tool "Notify Teams Applicant channel"** in the child agent "Application Intake Agent", call [AGENT FLOW PLACEHOLDER]
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_53_PasteCopiedInstructions.png' | relative_url }}" alt="Application Intake Agent 지침 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. `[AGENT FLOW PLACEHOLDER` 텍스트를 강조 표시합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_54_HighlightPlaceholder.png' | relative_url }}" alt="자리표시자 강조 표시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 슬래시(`/`)를 입력하고 **Notify Teams Applicant Channel** 도구를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_55_NotifyTeamsApplicatnChannelTool.png' | relative_url }}" alt="Notify Teams Applicant Channel 도구 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 event trigger의 마지막 액션인 **Sends a prompt to the specified copilot for processing**가 매개변수 값을 담은 프롬프트를 에이전트로 보내면, 그 지침에 따라 **Application Intake Agent**가 agent flow를 호출하게 됩니다.

    **Save**를 선택해 **Application Intake Agent**의 업데이트된 instructions를 저장합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_56_Save.png' | relative_url }}" alt="Save 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 에이전트 저장이 완료되면 instructions도 함께 업데이트됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_57_InstructionsUpdated.png' | relative_url }}" alt="지침 업데이트됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 **Hiring Agent**를 **Publish**해야 합니다. 오른쪽 위의 **Publish**를 선택하고, 이어서 나타나는 _Publish this agent_ 모달에서 다시 **Publish**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_58_PublishAgent.png' | relative_url }}" alt="Hiring Agent 게시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 게시가 완료되면 에이전트가 게시되었다는 확인 메시지가 나타납니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_59_AgentPublished.png' | relative_url }}" alt="확인 메시지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

이제 에이전트를 테스트할 수 있습니다!

### 🧪 Lab 4.3 - Event trigger 테스트

1. Event trigger를 실행하려면 Resume PDF 파일을 첨부한 이메일을 보내야 합니다. Outlook에서 새 이메일 메시지를 작성합니다.

     | Email Component | Details |
     |----------|------------|
     | **To recipient** | Use your signed in user account as the value |
     | **File attachment** | Upload the [TAYLOR TESTPERSON (FICTITIOUS)](https://raw.githubusercontent.com/microsoft/agent-academy/main/docs/operative/test-data/resumes/TAYLOR%20TESTPERSON%20(FICTITIOUS).pdf) file  |
     |**Subject**| Job Application|
     |**Body** | Copy and paste the following below as the body of the email  |

    ```text
    Dear Hiring Manager,

    I am writing to express my interest in the Senior Power Platform Engineer position at your organization. With over nine years of experience delivering secure and scalable solutions on Microsoft cloud platforms, I am confident in my ability to contribute effectively to your team.

    In my most recent role as Lead Power Platform Engineer, I developed an automated resume-intake pipeline, reducing manual triage and improving searchability. I have delivered HR case management applications, introduced solution-aware flows, and implemented PR checks to enhance deployment lead times. My expertise includes Power Apps, Power Automate, Power Pages, Dataverse, and a range of Microsoft 365 services, as well as integration with Graph/REST APIs and Azure Functions.

    Previously, I developed Teams approvals with adaptive cards, cutting approval times to the same day, and created robust error-handling frameworks. My background also includes migrating legacy workflows to Power Automate and building self-service portals adopted by hundreds of employees.

    I hold a B.Sc. in Computer Science and am certified as a Power Platform Developer (PL-400) and Solution Architect (PL-600). I am also passionate about mentoring and have volunteered with local maker groups.

    Please find my CV attached for your consideration. I would welcome the opportunity to discuss how my skills and experience align with your needs.

    Thank you for your time and consideration.

    Kind regards,
    Taylor Testperson
    ```

    작성이 끝나면 이메일을 **Send**합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_01_ComposeEmailWithAttachment.png' | relative_url }}" alt="PDF 파일 첨부 이메일 작성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Event trigger flow가 있는 [Power Automate maker portal](https://make.powerautomate.com/)에서 **Refresh** 아이콘을 선택해, 방금 보낸 이메일에 대해 성공적으로 실행된 flow run을 확인합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_02_FlowRun.png' | relative_url }}" alt="Refresh 아이콘을 선택해 flow run 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다시 Copilot Studio의 **Hiring Agent**로 돌아와 **Activity** 탭을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_03_SelectActivity.png' | relative_url }}" alt="Activity 탭 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Activity** 탭이 열리면 **Hiring Agent**의 모든 활동이 표시됩니다. 그중 이름이 **Automated**이고 상태가 **Complete**인 활동이 있을 것입니다. 이 활동이 바로 event trigger와, 그에 의해 호출된 agent flow를 의미합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_04_StatusComplete.png' | relative_url }}" alt="활동 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 해당 activity를 선택한 뒤 activity map에서 event trigger를 선택합니다. 오른쪽 패널에서 프롬프트의 입력 매개변수에 `Resume Id`, `Resume Title`, `Resume Number` 값이 들어 있는 것을 확인하세요. 이 값들은 **Lab 4.1 - 이메일로 받은 이력서를 Dataverse에 자동 업로드하기**의 38~44단계에서 구성했던 동적 콘텐츠 값이며, 생성된 **Dataverse** 행에서 가져온 것입니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_05_EventTrigger.png' | relative_url }}" alt="Event trigger" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다시 **Hiring Hub** model-driven app으로 이동해 **Resumes system view**에서 **Refresh**를 선택합니다. 이메일로 보낸 이력서에 대해 새로 생성된 행이 event trigger를 통해 만들어졌기 때문에, 이제 목록에 표시됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_06_ResumeRowCreated.png' | relative_url }}" alt="Resume 행 생성됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다시 Copilot Studio로 돌아와 activity map에서 **Application Intake Agent** 안의 **Notify Teams Applicant Channel** agent flow를 선택합니다. 오른쪽 패널에서 입력값이 Dataverse 행의 값으로 채워진 것을 확인하세요. 이는 event trigger의 마지막 액션인 **Sends a prompt to the specified copilot for processing**가 새로 만든 Dataverse 행의 매개변수 값을 담아 프롬프트를 보냈기 때문입니다. 이런 방식으로 event trigger에서 agent flow로 매개변수 값을 전달할 수 있습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_07_NotifyTeamsApplicantChannel.png' | relative_url }}" alt="agent flow 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 마지막으로 **Microsoft Teams** 채널에 게시된 adaptive card를 살펴보겠습니다. 채널에서는 Dataverse의 새 Resume 행 정보를 표시하는 adaptive card를 확인할 수 있습니다. adaptive card 시작 부분의 하이퍼링크에 마우스를 올려보면, URL이 adaptive card JSON의 15~19단계(**Lab 4.2 - Adaptive card로 Teams 채널에 알림 보내기**)에서 구성한 Resumes system view URL임을 알 수 있습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_08_AdaptiveCardResumeTableURL.png' | relative_url }}" alt="Adaptive Card Resume Table system view URL" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 해당 하이퍼링크를 선택하면 브라우저에서 **Hiring Hub** model-driven app의 Resumes system view로 이동합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_09_ResumeTableSystemView.png' | relative_url }}" alt="Hiring Hub model-driven app의 Resume system view" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다시 Microsoft Teams 채널의 adaptive card로 돌아갑니다. 이번에는 adaptive card의 `Action.OpenURL` 액션인 **View Resume** 위에 마우스를 올려보세요. URL이 adaptive card JSON의 30~36단계(**Lab 4.2 - Adaptive card로 Teams 채널에 알림 보내기**)에서 구성한 Resumes 행 URL임을 확인할 수 있습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_10_AdaptiveCardResumeRowURL.png' | relative_url }}" alt="Adaptive Card Resume 행 URL" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 해당 액션을 선택하면 브라우저에서 **Hiring Hub** model-driven app의 Resume 행 폼으로 이동합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_11_ResumeRow.png' | relative_url }}" alt="Hiring Hub model-driven app의 Resume 행" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

## ✅ 미션 완료

축하합니다! 👏🏻 훌륭한 작업이었습니다, Operative.

✅ Event trigger: Dataverse 매개변수 값을 agent flow로 전달하는 event trigger를 만들었습니다.
✅ Agent flow 구축: Dataverse 매개변수 값을 사용해 Microsoft Teams 채널에 adaptive card를 게시하고 HR 채용 팀에 알립니다.
✅ 자식 에이전트 instructions 업데이트: event trigger가 완료된 뒤 flow를 호출하도록 구성했습니다.

이제 **Hiring Agent**는 이력서가 이메일 첨부 파일로 도착할 때마다 자율적으로 동작하며, HR 채용 팀에게 수동 검토가 필요하다는 사실을 알릴 수 있습니다.

이로써 **Lab 04 - 지원자 신청 이메일 자동화**가 끝났습니다. 다음 미션으로 이동하려면 아래 링크를 선택하세요.

⏭️ 다음 미션으로 이동: [**에이전트 모델 이해와 응답 서식 지정**]({{ '/chapters/academy-operative-05-model-selection/' | relative_url }})

## 📚 전술 자료

📖 [Make your agent autonomous in Copilot Studio](https://learn.microsoft.com/training/modules/autonomous-agents-online-workshop/?WT.mc_id=power-188561-ebenitez)

📖 [Add an event trigger](https://learn.microsoft.com/microsoft-copilot-studio/authoring-trigger-event?WT.mc_id=power-188561-ebenitez)

📖 [Use agent flows with your agent](https://learn.microsoft.com/microsoft-copilot-studio/advanced-flow?WT.mc_id=power-188561-ebenitez)

📖 [Power Automate triggers introduction](https://learn.microsoft.com/power-automate/triggers-introduction?WT.mc_id=power-188561-ebenitez)

📖 [Using Power Automate flows with agents](https://learn.microsoft.com/microsoft-copilot-studio/advanced-flow-create?WT.mc_id=power-188561-ebenitez)

📖 [Data loss prevention for Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/admin-data-loss-prevention?WT.mc_id=power-188561-ebenitez)
