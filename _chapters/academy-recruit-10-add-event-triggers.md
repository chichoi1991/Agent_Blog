---
layout: "chapter"
date: 2026-08-06
title: "Event Trigger 추가로 자율형 에이전트 기능 활성화"
short_title: "Event Trigger 추가"
description: "이벤트 기반 로직으로 에이전트가 자율적으로 동작하도록 구성합니다."
order: 10
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/10-add-event-triggers/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/10-add-event-triggers/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 10: Add Event Triggers - Enable autonomous agent capabilities](https://microsoft.github.io/agent-academy/recruit/10-add-event-triggers/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

## 영상으로 보기

- YouTube walkthrough: https://www.youtube.com/watch?v=ZgwHL8PQ1nY

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/video-thumbnail.jpg' | relative_url }}" alt="Add Event Triggers 동영상 썸네일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Add Event Triggers 동영상 썸네일</figcaption>
</figure>

## 🎯 미션 브리핑

다시 오신 것을 환영합니다, Recruit. 이제 agent를 대화형 도우미에서 사용자 입력을 기다리지 않고 이벤트에 반응하는 자율형 agent로 끌어올릴 차례입니다.

Event Trigger를 사용하면 SharePoint, Teams, Outlook 같은 외부 시스템을 감시하고, 신호가 들어오는 즉시 지능형 작업을 실행하도록 agent를 훈련할 수 있습니다. 이 작업은 agent를 조용하고, 빠르며, 항상 감시하는 완전한 현장 운영 자산으로 바꿔 줍니다.

성공 기준은 단순히 가치에 응답하는 agent가 아니라, **스스로 가치를 시작하는 agent** 를 만드는 것입니다.

<div class="info-box note" markdown="1">
**중요**

이 미션은 classic Copilot Studio experience를 사용합니다.

이 미션의 스크린샷과 Copilot Studio 화면이 다르면 오른쪽 위의 **New Experience**를 꺼서 여기에서 사용하는 **classic experience**로 전환하세요.
</div>

## 🔎 학습 목표

이 미션에서 배우는 내용은 다음과 같습니다.

1. Event Trigger가 자율형 agent 동작을 가능하게 하는 방식
1. Event Trigger와 topic trigger의 차이
1. Event Trigger에 적합한 시나리오
1. 인증, 보안, 게시가 event 기반 agent에 미치는 영향
1. SharePoint 이벤트에 반응해 이메일 확인을 보내는 방법

## 🤔 Event Trigger란?

**Event Trigger** 는 직접적인 사용자 입력 없이도 외부 이벤트에 반응해 agent가 자율적으로 동작하게 만드는 메커니즘입니다. 즉 agent가 특정 이벤트를 "지켜보다가" 해당 이벤트가 발생하면 자동으로 행동하게 해줍니다.

Topic trigger가 사용자가 문장을 입력해야 대화를 시작하는 반면, Event Trigger는 연결된 시스템에서 실제 일이 벌어질 때 활성화됩니다. 예를 들어 다음과 같습니다.

- SharePoint 또는 OneDrive for Business에 새 파일이 만들어질 때
- Dataverse에 레코드가 생성될 때
- Planner 작업이 완료될 때
- Microsoft Forms 새 응답이 제출될 때
- Microsoft Teams 새 메시지가 추가될 때
- 반복 일정(예: 일일 리마인더)에 따라 실행될 때

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_AddTriggerDialog.png' | relative_url }}" alt="Add Trigger 대화상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Add Trigger 대화상자</figcaption>
</figure>

### 자율형 agent에서 왜 중요할까요?

Event Trigger는 agent를 반응형 도우미에서 사전 대응형 자율 도우미로 바꿔 줍니다.

1. **Autonomous operation**
   - 사람 개입 없이 24/7로 동작할 수 있습니다.
   - 예: 새 팀원이 추가되면 자동으로 환영 메시지를 보냄

1. **Real-time responsiveness**
   - 사용자가 묻기 전에 관련 이벤트에 즉시 반응할 수 있습니다.
   - 예: SharePoint 문서가 수정되면 IT 팀에 경고 보냄

1. **Workflow automation**
   - 하나의 trigger로 여러 작업을 연쇄 실행할 수 있습니다.
   - 예: 새 지원 티켓 생성 시 작업 생성, 관리자 알림, 대시보드 업데이트

1. **Consistent processes**
   - 중요한 단계가 빠지지 않도록 자동화합니다.
   - 예: 신규 입사자에게 온보딩 자료와 접근 요청 자동 전달

1. **Data-driven actions**
   - trigger payload 정보를 활용해 더 적절한 판단을 내릴 수 있습니다.
   - 예: 우선순위가 높은 티켓을 상급 담당자에게 자동 배정

## ⚙️ Event Trigger는 어떻게 동작하나요?

Event Trigger는 외부 이벤트에 자율적으로 반응할 수 있도록 다음 세 단계로 동작합니다.

### Trigger workflow

1. **Event Detection** - SharePoint, Teams, Outlook 등 연결된 시스템에서 특정 이벤트가 발생합니다.
1. **Trigger Activation** - Event Trigger가 이를 감지하고 Power Automate Cloud Flow를 통해 payload를 agent로 보냅니다.
1. **Agent Response** - agent가 payload를 받아 정의된 지침을 실행합니다.

### Event Trigger vs Topic Trigger

두 trigger 유형의 차이를 이해하는 것이 중요합니다.

| **Event Triggers** | **Topic Triggers** |
| -------------------- | -------------------- |
| 외부 시스템 이벤트로 활성화 | 사용자 입력/문구로 활성화 |
| 자율형 agent 동작 가능 | 대화형 응답 가능 |
| maker의 인증 사용 | 사용자 인증 선택 가능 |
| 사용자 상호작용 없이 실행 | 사용자가 대화를 시작해야 함 |
| 예: 파일 생성, 메일 수신 | 예: “What's the weather?” |

## 📦 trigger payload 이해하기

이벤트가 발생하면 trigger는 이벤트 정보와 응답 지침을 담은 **payload** 를 agent에 보냅니다.

### 기본 payload vs 사용자 지정 payload

각 trigger 유형에는 기본 payload 구조가 있지만 필요하면 사용자 지정할 수 있습니다.

**기본 payload** - `Use content from {Body}` 같은 표준 형식 사용

- 기본 이벤트 정보 포함
- 일반적인 처리 지침 사용
- 단순한 시나리오에 적합

**사용자 지정 payload** - 구체적인 지침과 데이터 포맷 추가

- agent에 더 자세한 방향 제시
- 어떤 데이터를 어떻게 사용할지 명시
- 복잡한 워크플로에 더 적합

### Agent Instructions vs Payload Instructions

Event Trigger에서 agent 동작을 유도하는 위치는 두 군데입니다.

**Agent Instructions** (전역)

- 모든 trigger에 적용되는 광범위한 지침
- 예: "티켓을 처리할 때는 항상 중복 여부를 먼저 확인하라"
- 일반적인 행동 패턴에 적합

**Payload Instructions** (trigger별)

- 특정 trigger에만 적용되는 세부 지침
- 예: "이번 SharePoint 업데이트는 프로젝트 채널에 요약을 보내라"
- 여러 trigger를 가진 복합 agent에 적합

💡 **팁**: 두 수준의 지침이 충돌하지 않게 하세요. 예상치 못한 동작의 원인이 될 수 있습니다.

## 🎯 대표적인 Event Trigger 시나리오

Event Trigger가 agent를 어떻게 향상할 수 있는지 보여 주는 실용적인 예시는 다음과 같습니다.

### IT Help Desk Agent

- **Trigger**: 새 SharePoint list item(지원 티켓)
- **Action**: 자동 분류, 우선순위 지정, 적절한 팀원에게 알림

### Employee Onboarding Agent

- **Trigger**: Dataverse에 새 사용자 추가
- **Action**: 환영 메시지 전송, 온보딩 작업 생성, 접근 권한 준비

### Project Management Agent

- **Trigger**: Planner 작업 완료
- **Action**: 프로젝트 대시보드 갱신, 이해관계자 알림, blocker 확인

### Document Management Agent

- **Trigger**: 특정 SharePoint 폴더에 파일 업로드
- **Action**: 메타데이터 추출, 태그 적용, 문서 소유자 알림

### Meeting Assistant Agent

- **Trigger**: 일정 이벤트 생성
- **Action**: 사전 알림과 아젠다 발송, 리소스 예약

## ⚠️ 게시 및 인증 고려 사항

실환경에서 Event Trigger를 사용하려면 인증과 보안 영향을 이해해야 합니다.

### Maker 인증

Event Trigger는 모든 인증에 대해 **agent 작성자의 자격 증명** 을 사용합니다.

- agent는 작성자의 권한으로 시스템에 접근합니다.
- 사용자가 작성자의 권한을 통해 데이터에 접근할 가능성이 있습니다.
- 사용자가 agent를 사용하더라도 실제 작업은 "작성자 권한으로" 수행됩니다.

### 데이터 보호 모범 사례

Event Trigger가 포함된 agent를 게시할 때는 다음을 점검하세요.

1. **Evaluate data access** - trigger가 어떤 시스템과 데이터에 접근하는지 검토
1. **Test thoroughly** - payload에 어떤 정보가 들어오는지 충분히 파악
1. **Narrow trigger scope** - trigger를 활성화하는 이벤트 범위를 가능한 한 좁게 설정
1. **Review payload data** - 민감한 정보가 노출되지 않는지 확인
1. **Monitor usage** - trigger 활동과 리소스 사용량 추적

## ⚠️ 문제 해결과 제한 사항

Event Trigger로 작업할 때는 다음 중요한 고려 사항을 염두에 두세요.

### Quota와 과금 영향

- trigger가 한 번 활성화될 때마다 메시지 사용량이 증가합니다.
- 1분마다 실행되는 반복 trigger처럼 잦은 trigger는 quota를 빠르게 소모할 수 있습니다.
- throttling을 피하려면 사용량을 모니터링하세요.

### 기술 요구 사항

- generative orchestration이 활성화된 agent에서만 사용할 수 있습니다.
- 환경에서 solution-aware cloud flow sharing이 활성화되어 있어야 합니다.

### Data Loss Prevention (DLP)

- 조직의 DLP 정책이 사용할 수 있는 trigger를 결정합니다.
- 관리자는 Event Trigger를 완전히 차단할 수 있습니다.
- 필요한 trigger가 보이지 않으면 관리자에게 문의하세요.

## 🧪 Lab 10 - 자율형 agent를 위한 Event Trigger 추가

### 🎯 사용 사례

IT Help Desk agent가 새 지원 요청에 자동으로 반응하도록 확장합니다. 누군가 SharePoint 지원 티켓 목록에 새 항목을 만들면 agent는 다음을 수행합니다.

1. SharePoint 티켓 생성 이벤트를 자율적으로 트리거합니다.
1. 티켓 정보와 수행 지침을 payload로 받습니다.
1. AI가 생성한 이메일로 제출자에게 자동 확인 메일을 보냅니다.

이 실습은 Event Trigger가 어떻게 진짜 자율형 agent 동작을 구현하는지 보여줍니다.

### Prerequisites

실습 전 다음을 준비하세요.

- ✅ 이전 실습 완료(특히 IT Help Desk agent를 만드는 Lab 6-8)
- ✅ IT 지원 티켓 list가 있는 SharePoint site 접근 권한
- ✅ Event Trigger가 활성화된 Copilot Studio 환경
- ✅ agent에 generative orchestration이 활성화되어 있음
- ✅ SharePoint 및 Copilot Studio 환경에 대한 적절한 권한

### 10.1 Generative AI를 켜고 SharePoint item creation trigger 만들기

1. **Copilot Studio** 에서 **Contoso Helpdesk agent** 를 엽니다.

1. 먼저 agent에 **Generative AI** 가 활성화되어 있는지 확인합니다.
   - **Settings** 선택
   - **Orchestration** 섹션에서 **Use generative AI orchestration for your agent's responses?** 가 **Yes** 인지 확인하고 아니라면 바꿉니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_EnableGenerativeAI.png' | relative_url }}" alt="Generative AI 활성화" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Generative AI 활성화</figcaption>
   </figure>
1. 필요하면 **Save** 를 누르고, 변경이 없으면 **Settings** 를 닫습니다.

1. **Overview** 탭으로 돌아가 **Triggers** 섹션을 찾습니다.

1. **+ Add trigger** 를 눌러 trigger library를 엽니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_NavigateToTrigger.png' | relative_url }}" alt="Triggers로 이동" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Triggers로 이동</figcaption>
   </figure>
1. 검색해 **When an item is created** (SharePoint)를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_SelectSharePointTrigger.png' | relative_url }}" alt="SharePoint trigger 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>SharePoint trigger 선택</figcaption>
   </figure>
1. trigger 이름과 연결을 구성합니다.

   - **Trigger name:** `New Support Ticket Created in SharePoint`

1. 연결 구성이 끝날 때까지 기다렸다가 **Next** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_ConfigureTriggerNameAndConnections.png' | relative_url }}" alt="Trigger 이름과 연결 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Trigger 이름과 연결 설정</figcaption>
   </figure>
1. trigger 파라미터를 설정합니다.

   - **Site Address**: `Contoso IT` SharePoint site 선택
   - **List Name**: `Tickets` list 선택
   - **Limit Columns by view (Optional)**: `Select an Item` 그대로 둠
   - **Additional instructions to the agent when it's invoked by the trigger:**

     ```text
     New Support Ticket Created in SharePoint: {Body}
     
     Use the 'Acknowledge SharePoint Ticket' tool to generate the email body automatically and respond.
     
     IMPORTANT: Do not wait for any user input. Work completely autonomously.
     ```

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_ConfigureTriggerParams.png' | relative_url }}" alt="Trigger 파라미터 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Trigger 파라미터 설정</figcaption>
   </figure>
1. **Create trigger** 를 선택합니다. 그러면 agent를 자율적으로 실행하는 Power Automate Cloud Flow가 자동 생성됩니다.

1. **Close** 를 선택합니다.

### 10.2 Trigger 편집하기

1. **Overview** 탭의 **Triggers** 섹션에서 **New Support Ticket Created in SharePoint** trigger의 **...** 메뉴를 선택합니다.

1. **Edit in Power Automate** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_EditTriggerInPowerAutomate.png' | relative_url }}" alt="Power Automate에서 trigger 편집" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Power Automate에서 trigger 편집</figcaption>
   </figure>
1. **New designer** 토글이 켜져 있는지 확인합니다.

1. **Sends a prompt to the specified copilot for processing** 노드를 선택합니다.

1. **Body/message** 필드에서 기존 Body 내용을 지우고, **슬래시 키(/)** 를 눌러 **Insert Expression** 을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_InsertExpressionForTrigger.png' | relative_url }}" alt="Trigger용 expression 삽입" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Trigger용 expression 삽입</figcaption>
   </figure>
1. 아래 expression을 입력해 티켓 세부 정보를 agent에 전달합니다.

   ```text
   concat('Submitted By Name: ', first(triggerOutputs()?['body/value'])?['Author/DisplayName'], '\nSubmitted By Email: ', first(triggerOutputs()?['body/value'])?['Author/Email'], '\nTitle: ', first(triggerOutputs()?['body/value'])?['Title'], '\nIssue Description: ', first(triggerOutputs()?['body/value'])?['Description'], '\nPriority: ', first(triggerOutputs()?['body/value'])?['Priority/Value'],'\nTicket ID : ', first(triggerOutputs()?['body/value'])?['ID'])
   ```

1. **Add** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_TriggerOutputExpression.png' | relative_url }}" alt="Trigger output expression" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Trigger output expression</figcaption>
   </figure>
1. 오른쪽 위 도구 모음에서 **Publish** 를 선택합니다.

### 10.3 이메일 확인용 tool 만들기

1. **Copilot Studio** 로 돌아갑니다.

1. agent의 **Tools** 탭으로 이동합니다.

1. **+ Add a tool** 을 클릭하고 **Connector** 를 선택합니다.

1. **Send an email (V2)** - **Office 365 Output** connector를 검색해 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_SelectOutlookConnector.png' | relative_url }}" alt="Outlook connector 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Outlook connector 선택</figcaption>
   </figure>
1. 연결 구성이 끝나면 **Add and configure** 를 선택합니다.

1. tool 설정을 다음처럼 입력합니다.

   - **Name**: `Acknowledge SharePoint ticket`
   - **Description**: `This tool sends an email acknowledgement that a ticket has been received.`

1. 입력 파라미터 옆 **Customize** 를 눌러 다음과 같이 설정합니다.

   **To**:

   - **Description**: SharePoint Ticket을 제출한 사람의 이메일 주소
   - **Identify as**: `Email`

   **Body**:

   - **Description**: 티켓이 접수되었고 3영업일 이내 응답 예정임을 알리는 확인 메일 본문

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_ConfigureInputParameters.png' | relative_url }}" alt="입력 파라미터 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>입력 파라미터 설정</figcaption>
   </figure>
1. **Save** 를 선택합니다.

### 10.4 Trigger 테스트하기

1. **Help Desk Agent** 내부에서 **Overview** 탭을 선택합니다.
1. **New Support Ticket Created in SharePoint** trigger 옆의 **Test Trigger** 아이콘을 클릭합니다. 그러면 **Test your trigger** 창이 열립니다.
1. 새 브라우저 탭에서 **SharePoint IT Support Tickets list** 로 이동합니다.
1. **+ Add new item** 을 눌러 테스트 티켓을 만듭니다.
   - **Title**: `Unable to connect to VPN`
   - **Description**: `Unable to connect to corporate WIFI network after recent update`
   - **Priority**: `Normal`

1. SharePoint item을 **Save** 합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_CreateTestTicket.png' | relative_url }}" alt="테스트 티켓 만들기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>테스트 티켓 만들기</figcaption>
   </figure>
1. **Copilot Studio** 로 돌아와 **Test your trigger** 패널에서 trigger 활성화를 확인합니다. 이벤트가 표시되기까지 몇 분 걸릴 수 있으므로 **Refresh** 아이콘으로 새로고침합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_MonitorTriggerTest.png' | relative_url }}" alt="Trigger 테스트 모니터링" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Trigger 테스트 모니터링</figcaption>
   </figure>
1. trigger가 표시되면 **Start testing** 을 선택합니다.

1. **Activity Map** 패널이 표시되고 agent가 테스트 이벤트를 처리합니다. **Connect to continue** 메시지가 나오면 **Allow** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_AllowConnector.png' | relative_url }}" alt="Connector 허용" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Connector 허용</figcaption>
   </figure>
1. agent가 다음을 수행했는지 확인합니다.
   - trigger payload를 수신함
   - `Acknowledge SharePoint ticket` tool을 호출함

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_TestTrigger.png' | relative_url }}" alt="Trigger 테스트 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Trigger 테스트 확인</figcaption>
   </figure>
1. 제출자의 이메일 받은 편지함을 확인해 확인 메일이 발송되었는지 확인합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_TestEmailSent.png' | relative_url }}" alt="확인 메일 발송 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>확인 메일 발송 확인</figcaption>
   </figure>
1. Copilot Studio의 **Activity** 탭에서 전체 trigger 및 tool 실행 내역을 검토합니다.

## ✅ Mission Complete

성공적으로 다음을 완료했습니다.

- **Event trigger**: 새 SharePoint item에 반응하도록 agent를 구성했습니다.
- **Trigger payload**: 티켓 세부 정보를 agent에 전달했습니다.
- **Connector tool**: 이메일 확인 tool을 추가했습니다.
- **Autonomous testing**: 대화형 입력 없이 trigger와 tool을 검증했습니다.

다음으로 [Mission 11: Publish Your Agent]({{ '/chapters/academy-recruit-11-publish-your-agent/' | relative_url }})를 계속 진행하세요.

## 📚 Tactical Resources

- [Make your agent autonomous in Copilot Studio](https://learn.microsoft.com/training/modules/autonomous-agents-online-workshop/?WT.mc_id=power-177340-scottdurow)
- [Add an event trigger](https://learn.microsoft.com/microsoft-copilot-studio/authoring-trigger-event?WT.mc_id=power-177340-scottdurow)
- [Power Automate triggers introduction](https://learn.microsoft.com/power-automate/triggers-introduction?WT.mc_id=power-177340-scottdurow)
- [Use Power Automate flows with agents](https://learn.microsoft.com/microsoft-copilot-studio/advanced-flow-create?WT.mc_id=power-177340-scottdurow)
- [Data loss prevention for Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/admin-data-loss-prevention?WT.mc_id=power-177340-scottdurow)
