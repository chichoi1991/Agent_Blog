---
layout: chapter
date: 2026-08-05
title: "Lab WIQ02 — Work IQ A2A 프로토콜"
short_title: "WIQ02 · A2A 프로토콜"
description: "Agent-to-Agent(A2A) 프로토콜로 Work IQ와 통신합니다. 에이전트 카드 탐색, Entra ID 인증, 스트리밍 메시지, 프로토콜 트래픽 검사, Copilot Studio에서 A2A 에이전트 소비까지 다룹니다."
order: 5
category: m365
tags: ["Work IQ", "A2A", "멀티 에이전트", "Copilot Studio", "JSON-RPC"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — A2A는 에이전트를 "무상태 도구"로 감싸지 않고 **동등한 주체로 협업**하게 하는 개방형 표준입니다. 이 랩에서는 `a2a-consumer` 도구로 Work IQ의 **에이전트 카드**를 조회하고, 스트리밍으로 프롬프트를 보내고, 와이어 트래픽을 검사한 뒤, **Copilot Studio 에이전트**에서 Work IQ를 A2A로 소비합니다.

**레벨** 300 · **소요 시간** 약 40분 · **배지** WorkIQ-Expert
</div>

> 이 글은 Microsoft 공식 [Copilot Developer Camp](https://microsoft.github.io/copilot-camp/pages/work-iq/02-work-iq-a2a/)의 **Lab WIQ02** 를 한국어로 옮긴 것입니다. [Lab WIQ01]({{ '/chapters/m365-4-work-iq-setup-and-cli/' | relative_url }})의 Entra ID 앱 등록이 선행되어야 합니다.

## 시나리오

여러분의 조직은 에이전트들이 매끄럽게 협업하는 **멀티 에이전트 시스템**을 구축하고 있습니다. WIQ01에서 Microsoft Entra ID에 Work IQ 에이전트를 등록했고, 이제 다른 에이전트가 **A2A(Agent-to-Agent) 프로토콜**로 Work IQ의 기능을 소비하도록 만들어야 합니다.

A2A는 복잡한 통합 없이 AI 에이전트가 Work IQ와 통신·협업할 수 있게 하는 개방형 표준입니다. 이 랩에서 배울 내용은 다음과 같습니다.

- **에이전트 카드**를 통한 Work IQ 기능 탐색
- Entra ID 토큰을 사용한 안전한 인증
- A2A로 단순 프롬프트와 복잡한 프롬프트 전송
- 프로토콜 트래픽을 검사해 에이전트 간 정보 교환 방식 이해
- **Copilot Studio**에서 Work IQ A2A 소비

## 랩 목표

- A2A 프로토콜을 설명하고 기존 도구 기반 통합과의 차이 이해
- `a2a-consumer` 도구로 Work IQ에 연결하고 에이전트 카드 검사
- 기본 질의 실행 ("Who am I?", "Who is my manager?")
- 복잡한 다단계 프롬프트 작성
- A2A 프로토콜 트래픽 검사 및 메시지 흐름·스트리밍·태스크 라이프사이클 이해
- Work IQ에 작업을 위임할 수 있는 에이전트 구축

---

## 실습 1: A2A 프로토콜 이해하기

### 1단계: A2A 기본 개념

**A2A(Agent-to-Agent) 프로토콜**은 AI 에이전트들이 매끄럽게 통신·협업하게 해주는 개방형 표준입니다. 에이전트를 무상태 도구로 감싸는 전통적 통합과 달리, A2A에서는 에이전트가 **일급 시민(first-class citizen)** 으로 상호작용합니다. 협상하고, 작업을 위임하고, 멀티턴 대화에서 컨텍스트를 유지할 수 있습니다.

**MCP와의 핵심 차이**

| 프로토콜 | 특징 |
|----------|------|
| **MCP** (Model Context Protocol) | LLM을 **도구·데이터에 연결**. 도구는 무상태이며 특정 기능을 수행 |
| **A2A** | **에이전트 간 협업**을 가능하게 함. 에이전트는 자율성을 유지하고 상태를 보존하며 풍부한 구조화 메시지를 교환 |

**Work IQ에서 A2A가 중요한 이유**

- Work IQ는 Microsoft 365 데이터(메일·회의·파일·Teams 메시지·사람 등)를 이해하는 **에이전트**입니다
- 다른 에이전트가 Work IQ를 도구로 감싸지 않고 **작업을 위임**할 수 있습니다
- 장시간 실행 작업, 스트리밍, 복잡한 멀티턴 상호작용을 지원합니다

### 2단계: A2A 요청 라이프사이클

모든 A2A 상호작용은 다음 라이프사이클을 따릅니다.

1. **에이전트 탐색(Agent Discovery)** — 클라이언트가 `/.well-known/agent-card.json`에서 원격 에이전트 카드를 가져옴
2. **인증(Authentication)** — 클라이언트가 Entra ID로 원격 에이전트 호출 권한을 가진 액세스 토큰 획득
3. **SendMessage API** — 클라이언트가 사용자 메시지를 담은 JSON-RPC 요청 전송
4. **SendMessageStream API** — 실시간 태스크 업데이트와 아티팩트를 위한 스트리밍 채널 개설

**Work IQ A2A 엔드포인트**

| 용도 | URL |
|------|-----|
| 기본 에이전트 카드 | `https://workiq.svc.cloud.microsoft/a2a/.well-known/agent-card.json` |
| 특정 에이전트 카드 | `https://workiq.svc.cloud.microsoft/a2a/{agent-id}/.well-known/agent-card.json` |
| 메시지 엔드포인트 | `POST https://workiq.svc.cloud.microsoft/a2a/` |

**A2A 버전** — Work IQ는 A2A v1.0과 v0.3을 모두 지원합니다. `SendMessage` 같은 v1.0 기능을 쓰려면 `A2A-Version: 1.0` 헤더를 사용하세요.

### 3단계: 인증과 권한 이해

Work IQ와의 A2A 통신에는 다음이 필요합니다.

- **Entra ID 위임 인증** — 요청은 로그인한 사용자 컨텍스트에서 실행됩니다(앱 전용 아님)
- **액세스 토큰** — `Authorization` 헤더에 Bearer 토큰으로 전달
- **권한 트리밍** — Work IQ가 사용자의 Microsoft 365 권한과 규정 준수 정책을 자동으로 존중
- **OBO(On-behalf-of) 흐름** — 에이전트가 다른 에이전트·서비스를 대신해 동작하는 시나리오 지원

이 랩에서는 Entra ID 인증과 토큰 교환을 내부적으로 처리하는 **a2a-consumer** 도구를 사용합니다.

---

## 실습 2: A2A로 Work IQ에 연결하기

### 1단계: a2a-consumer 도구 준비

**a2a-consumer**는 다음을 할 수 있는 테스트·검사 도구입니다.

- 에이전트 탐색 및 에이전트 카드 검사
- 동기·비동기 메시지 전송
- 스트리밍 응답 실시간 모니터링
- JSON-RPC 요청/응답 트래픽 검사

[a2a-consumer 저장소](https://github.com/PaoloPia/a2a-consumer)를 클론합니다.

```bash
git clone https://github.com/PaoloPia/a2a-consumer
cd a2a-consumer
npm install
npm run dev
```

A2A 테스트용 로컬 웹 서버가 시작됩니다. 실행되면 브라우저에서 [http://localhost:5173/](http://localhost:5173/)을 엽니다.

### 2단계: 인증 구성

Work IQ와 통신하려면 다음을 갖춘 Entra ID 앱 등록이 필요합니다.

- WIQ01에서 확보한 **Tenant ID**, **Application ID**, **Client Secret**
- **리디렉션 URI**: `http://localhost:5173/oauth/callback` (환경에 따라 a2a-consumer의 실제 URL)
- **권한 스코프**: `api://workiq.svc.cloud.microsoft/WorkIQAgent.Ask`

a2a-consumer 인터페이스에서:

1. **Connection**에 다음 URL을 설정: `https://workiq.svc.cloud.microsoft/a2a/.well-known/agent-card.json`
2. **Authentication** 패널에서 다음을 구성:
    - **OAuth Flow**
    - **Client Secret** (dev proxy)
    - **Tenant Id** — WIQ01에서 저장한 Tenant Id
    - **Client Id** — WIQ01에서 저장한 Application Id
    - **Redirect URI** — `http://localhost:5173/oauth/callback` (WIQ01의 Entra ID 앱에 **웹 콜백 URL**로 등록되어 있어야 함)
    - **Client Secret** — WIQ01에서 저장한 Client Secret
3. **Authorize & Get Token**을 선택해 인증 흐름을 진행합니다. 토큰이 획득되면 `Token acquired (expires ...)` 메시지가 표시됩니다.

이제 도구가 사용자를 대신해 액세스 토큰을 획득했고, 모든 A2A 요청에 이를 포함합니다.

### 3단계: Work IQ 에이전트 카드 가져오기

**에이전트 카드**는 Work IQ의 기능, 인증 요구사항, 엔드포인트를 기술하는 JSON 문서입니다.

1. **Connect** 버튼을 눌러 A2A로 Work IQ에 연결합니다. **Status**가 **Connected**가 되어야 합니다.
2. **Summary & Validation** 섹션의 **Agent Card** 패널에서 다음을 확인합니다.
    - Name: `Microsoft Copilot`
    - Version: `1.0.0`
    - URL: `https://workiq.svc.cloud.microsoft/a2a`

**Raw JSON** 명령으로 원본 JSON을, **Settings Table** 명령으로 정리된 표 형태를 볼 수 있습니다.

**에이전트 카드 구조 예시**

```json
{
  "name": "Microsoft Copilot",
  "description": "An AI-powered assistant that helps users with business-related tasks such as managing emails, scheduling meetings, and organizing documents.",
  "url": "https://workiq.svc.cloud.microsoft/a2a",
  "iconUrl": "https://copilot.microsoft.com",
  "provider": {
    "organization": "Microsoft",
    "url": "https://www.microsoft.com"
  },
  "version": "1.0.0",
  "protocolVersion": "0.3.0",
  "capabilities": {
    "streaming": true,
    "pushNotifications": false,
    "stateTransitionHistory": false,
    "extensions": []
  },
  "defaultInputModes": [
    "text"
  ],
  "defaultOutputModes": [
    "text"
  ],
  "skills": [],
  "supportsAuthenticatedExtendedCard": false,
  "additionalInterfaces": [],
  "preferredTransport": "JSONRPC",
  "supportedInterfaces": [
    {
      "url": "https://workiq.svc.cloud.microsoft/a2a",
      "protocolBinding": "JSONRPC",
      "protocolVersion": "1.0"
    }
  ]
}
```

### 4단계: 에이전트 카드 응답 해석

**Raw JSON**에서 주요 필드를 살펴봅니다.

| 필드 | 의미 |
|------|------|
| `supportedInterfaces` | 엔드포인트 URL과 프로토콜 바인딩(JSONRPC) |
| `capabilities.streaming` | `true` — Work IQ가 실시간 스트리밍 응답을 지원 |
| `securitySchemes` | Entra ID 권한 부여 URL과 토큰 엔드포인트 |
| `defaultInputModes` / `defaultOutputModes` | 둘 다 `["text"]` — 텍스트 메시지로 통신 |

이 카드는 소비자 에이전트에게 **어떻게 인증하고, 어디로 요청을 보내고, 어떤 기능을 기대할 수 있는지**를 알려줍니다.

---

## 실습 3: 기본 프롬프트 보내기

### 1단계: 단순 JSON-RPC 메시지 작성

a2a-consumer의 **A2A Messaging & Operations** 패널로 이동해 **Chat** 섹션에 다음 프롬프트를 입력합니다.

```text
Who am I?
```

**Stream** 옵션을 체크한 상태로 **Send**를 선택합니다. 잠시 후 Work IQ A2A 서버가 **Chat** 영역에 답변을 반환합니다.

### 2단계: 응답 검사

인터페이스를 아래로 스크롤해 **Responses** 패널을 펼칩니다. **Streaming Events** 섹션에서 Work IQ가 A2A로 반환한 `SendStreamingMessage` 메시지들을 확인할 수 있으며, **Chat**에 렌더링된 응답의 모든 청크를 볼 수 있습니다.

**On-Wire Communication** 패널을 펼치면 a2a-consumer가 Work IQ A2A 서버로 실제 전송한 요청을 볼 수 있습니다. 최소 3개의 요청이 있습니다.

| 요청 | 역할 |
|------|------|
| **GetAgentCardDocument** | 에이전트 카드를 가져오는 최초 요청 |
| **SendStreamingMessage** | A2A 서버에 프롬프트를 제출하는 요청 |
| **SubscribeToTask** | 태스크 업데이트를 구독하는 요청 |

확인 후 **Hide Wire Inspector**와 **Hide Responses**를 선택해 **Chat** 영역으로 돌아갑니다.

### 3단계: 컨텍스트를 유지한 후속 질문

같은 컨텍스트에서 관리자에 대해 물어봅니다.

```text
Who is my manager?
```

<div class="info-box warning" markdown="1">

**중요** — 두 번째 `SendStreamingMessage`를 검사하면 `contextId` 값이 **이전 응답과 동일**한 것을 볼 수 있습니다. 이 값이 Work IQ에게 대화 연속성을 유지하라고 알려줍니다.
</div>

응답은 이전 메시지를 인지한 상태로 돌아옵니다. Work IQ는 "Who am I?"의 맥락에서 여러분을 이해했기 때문에 "Who is my manager?"에 관련 정보를 담아 답합니다.

**멀티턴의 이점** — 신원 정보를 매번 다시 보내지 않고도 후속 질문·명확화·관련 질의를 이어갈 수 있습니다. `contextId`가 상태를 보존합니다.

### 4단계: 복잡한 프롬프트 작성

A2A는 **구조화된 출력**을 요청할 때 진가를 발휘합니다. 다가오는 회의 목록을 요청해 봅시다.

```text
Create a list of all my upcoming meetings in the next 10 days. Include meeting title, attendees, time, and a brief description. For each meeting, suggest me topics that I should dig into, to be more effective. Format it professionally.
```

Work IQ가 캘린더를 추론하고, 회의를 가져와, 구조화된 출력을 생성합니다. 응답에는 **OneDrive for Business에 저장된 생성 문서 링크**가 포함됩니다.

---

## 실습 4: Copilot Studio 에이전트에서 A2A로 Work IQ 사용하기

### 1단계: Copilot Studio에서 새 에이전트 만들기

[Copilot Studio](https://copilotstudio.microsoft.com)를 엽니다. 대상 환경을 선택하고 UI에서 새 에이전트를 만듭니다.

<div class="info-box note" markdown="1">

**환경이 없다면** — 기본 환경을 쓰거나 새 환경을 만들 수 있습니다. 새 환경 생성 방법은 [Agent Academy](https://aka.ms/agentacademy)의 [Recruit — Course Setup](https://microsoft.github.io/agent-academy/recruit/00-course-setup/#trial-environment-setup-steps-14) 문서 중 **Trial Environment Setup** 섹션의 1~3단계를 따르세요.
</div>

1. **Agents**를 선택하고 **+ Create blank agent** 클릭
2. 이름을 `WorkIQ Consumer Agent`로 지정
3. 지침을 `Process all the user's requests relying on the Work IQ Agent and then give to the user the received answer`로 입력
4. 기본 설정 저장

외부 시스템 호출을 오케스트레이션할 준비가 된 Copilot Studio 에이전트가 생겼습니다.

### 2단계: A2A로 Work IQ에 인증된 연결 추가

1. **Agents** 탭 선택
2. **+ Add an agent**로 새 연결 에이전트 추가
3. 팝업에서 **Connect to an external agent**를 선택하고 **Agent2Agent** 옵션 선택

<figure class="screenshot">
  <img src="{{ '/assets/image/workiq/workiq-02-01-mcs-add-agent.png' | relative_url }}" alt="Copilot Studio의 'Connect to an external agent' 드롭다운에서 Agent2Agent 옵션 선택">
  <figcaption>외부 에이전트 연결 → <strong>Agent2Agent</strong> 선택</figcaption>
</figure>

4. **Connect Agent2Agent** 대화 상자에서 다음을 구성합니다.

    - **Agent endpoint URL**: `https://workiq.svc.cloud.microsoft/a2a/.well-known/agent-card.json`
    - **Name**: `Work IQ Agent`
    - **Description**: `Provides access to the intelligent layer of your organization`
    - **Authentication**: `OAuth 2.0`
        - **Type**: `Manual`
        - **Client ID** — WIQ01에서 등록한 Entra ID 앱의 Client ID
        - **Client Secret** — WIQ01의 Client Secret
        - **Authorization URL** — WIQ01의 Authorization URL
        - **Token URL template** — WIQ01의 Token URL
        - **Refresh URL** — WIQ01의 Token URL
        - **Scopes**: `api://workiq.svc.cloud.microsoft/WorkIQAgent.Ask`
        - **Redirect URL** — 에이전트 연결을 저장하면 Copilot Studio가 제공

<figure class="screenshot">
  <img src="{{ '/assets/image/workiq/workiq-02-02-mcs-add-agent.png' | relative_url }}" alt="Work IQ용 수동 OAuth 2.0 설정이 입력된 Connect Agent2Agent 대화 상자">
  <figcaption>수동 OAuth 2.0 설정 — 엔드포인트 URL, 클라이언트 ID/시크릿, 권한 부여·토큰 URL, 스코프</figcaption>
</figure>

5. **Create**를 선택해 에이전트 연결 생성
6. Copilot Studio가 연결을 만들고 사용할 **Redirect URL**을 돌려줍니다
7. 그 **Redirect URL**을 복사해 Entra ID 애플리케이션에 **웹 리디렉션 URI**로 구성하고, 설정이 저장되도록 몇 초 기다립니다
8. Copilot Studio로 돌아와 **Next**를 선택하고 Copilot Studio 인증 절차로 Work IQ에 연결합니다

<figure class="screenshot">
  <img src="{{ '/assets/image/workiq/workiq-02-03-mcs-add-agent.png' | relative_url }}" alt="Agent2Agent 연결 생성 후 인증 단계를 안내하는 Copilot Studio 확인 화면">
  <figcaption>연결 생성 완료 — 인증 후 설정을 계속 진행합니다</figcaption>
</figure>

이제 Work IQ가 A2A로 Copilot Studio에 연결되었습니다.

### 3단계: 단순 프롬프트로 에이전트 테스트

**Test your agent** 패널을 열고 다음 프롬프트를 입력합니다.

```text
Who am I? Who is my manager? What is my role in the organization?
```

<figure class="screenshot">
  <img src="{{ '/assets/image/workiq/workiq-02-04-mcs-a2a-agent.png' | relative_url }}" alt="WorkIQ Consumer Agent가 A2A로 조회한 상세 답변을 반환하는 Copilot Studio 테스트 패널">
  <figcaption>A2A 프로토콜을 통해 조회된 답변이 테스트 패널에 표시됩니다</figcaption>
</figure>

보안상의 이유로 Work IQ를 A2A로 호출할지 **확인**해야 합니다. 처음 사용할 때는 테스트 채팅에서 계정 연결도 필요합니다.

### 4단계: 복잡한 프롬프트로 테스트

이번에는 Work IQ가 구조화된 데이터를 만들고 **Word 문서(.docx)** 를 출력하도록 요청하는 복잡한 프롬프트를 테스트합니다.

```text
Create a list of all my upcoming meetings in the next 10 days. Include meeting title, attendees, time, and a brief description. For each meeting, suggest me topics that I should dig into, to be more effective. Format it professionally. Create a Word document as the output.
```

응답에 Work IQ가 즉석에서 생성한 Word 문서 링크가 포함된 것을 확인할 수 있습니다.

---

## 🎉 완료

축하합니다! **Work IQ A2A 프로토콜** 랩을 완료했습니다. 배운 내용은 다음과 같습니다.

- ✅ **A2A 기본** — 에이전트가 A2A로 통신하는 방식과, 에이전트를 도구로 감싸는 것보다 나은 이유
- ✅ **에이전트 탐색** — 에이전트 카드를 가져와 기능·인증을 이해하는 방법
- ✅ **기본 프롬프트** — 단순 질의 전송과 멀티턴 컨텍스트 유지
- ✅ **복잡한 프롬프트** — 아티팩트(Word 문서) 생성 요청과 장시간 작업에서의 스트리밍 활용
- ✅ **프로토콜 검사** — 원시 A2A 트래픽 모니터링, 요청/응답 흐름 이해, 디버깅
- ✅ **멀티 에이전트 아키텍처** — Copilot Studio에서 A2A로 Work IQ 소비

👉 [Lab WIQ03 — Work IQ MCP 프로토콜]({{ '/chapters/m365-6-work-iq-mcp/' | relative_url }})

---

## 📚 참고 자료

- 💾 [a2a-consumer 도구 저장소](https://github.com/PaoloPia/a2a-consumer)
- 🎓 [Agent Academy — 환경 설정 가이드](https://microsoft.github.io/agent-academy/recruit/00-course-setup/#trial-environment-setup-steps-14)
- 🏕️ [원문: Copilot Developer Camp — Lab WIQ02](https://microsoft.github.io/copilot-camp/pages/work-iq/02-work-iq-a2a/)
