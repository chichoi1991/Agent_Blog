---
layout: chapter
title: '반개발형 Agent 만들기'
short_title: "반개발형 Agent"
description: "Copilot Studio의 대화 설계 방식, 변수·상태 관리, Action 기반 처리 흐름, Generative Orchestration 활용까지 단계별로 안내합니다."
order: 3
icon: "⚙️"
category: guide
---

## 1. 이 챕터의 목표

이 챕터에서는 Copilot Studio로 실제 Agent를 만드는 과정을 단계별로 안내합니다. **대화 설계 → 변수 관리 → Action 연결 → Generative Orchestration**까지, 현장 워크샵에서 검증된 실전 방법론을 공유합니다.

---

## 2. 대화 설계 방식 선택하기

Copilot Studio에서 Agent의 대화를 설계하는 방법은 크게 두 가지입니다. 둘은 배타적이지 않으며, **하나의 Agent 안에서 자유롭게 조합**합니다.

### 2.1 Instructions(지침) 기반 설계

Agent의 **Overview 탭**에서 자연어로 지침을 작성하면, LLM이 이를 기반으로 자율적으로 대화를 이끌어갑니다.

**이런 경우에 적합합니다:**
- 질문이 **열려 있고 다양**할 때
- "지식 → 판단 → 액션" 순으로 흘러야 할 때
- B2E(내부 직원 대상) 업무 지원, 지식 + 자동화 혼합 시나리오

**권장 지침 구조 (실전 템플릿):**

```
## 3. 역할
너는 [조직명]의 [업무 도메인] 전문 에이전트야.

## 4. 행동 순서
1. 질문 의도를 먼저 분류한다
2. 명확하지 않으면 추가 질문을 한다
3. 답변 가능하면 Knowledge 기반으로 답변한다
4. 작업이 필요하면 적절한 Action/Flow를 호출한다
5. 결과를 요약해서 사용자에게 설명한다

## 5. 제약 조건
- 내부 정책 문서에 근거한 답변만 제공
- 근거가 없으면 "확인이 필요합니다"라고 안내
- 이메일/메시지를 보내기 전 반드시 내용 확인 요청

## 6. 사용 가능한 도구
- [HR 정책 검색] — SharePoint Knowledge
- [이메일 발송] — Outlook 커넥터
- [IT 티켓 생성] — ServiceNow Flow
```

> 📖 **참조**: [Generative orchestration guidance](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/guidance/generative-mode-guidance)

<div class="info-box tip">
<b>💡 실무 팁 — "무엇을 할 수 있는지"를 지침에 명시하세요</b><br>
에이전트가 <b>사용할 수 있는 도구 목록</b>을 지침에 적어주면, LLM이 더 자연스럽게 질문을 이어가고 적절한 Action을 선택합니다. "알아서 해"보다 <b>"이 도구들로 이런 범위 안에서 해"</b>가 훨씬 좋은 결과를 만듭니다.
</div>

### 6.1 Topic 기반 설계

정형화된 업무 처리가 필요한 경우, **Topics 탭**에서 트리거 → 노드 흐름으로 대화를 설계합니다.

**이런 경우에 적합합니다:**
- 업무 **절차가 고정**되어 있을 때 (헬프데스크, 승인 프로세스)
- **분기/조건**이 명확할 때
- **"틀리면 안 되는 영역"**일 때

**Topic 설계 흐름:**

```
트리거 문구 정의 (또는 Generative 모드에서 Topic 이름/설명으로 자동 매칭)
  → 질문 노드 (필요 정보 수집 → 변수에 저장)
    → 조건 노드 (변수 값에 따라 분기)
      → Action 노드 (외부 시스템 호출)
        → 출력 변수로 결과 반환 (메시지 노드 ❌)
```

> 📖 **참조**: [Create and edit topics](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-create-edit-topics)

<div class="info-box warning">
<b>⚠️ 가장 빈번한 실수 — Topic 마지막에 메시지 노드 넣기</b><br>
Generative Orchestration 모드에서 Topic 마지막에 고정 메시지를 넣으면, LLM이 <b>해당 Topic 이후의 판단을 하지 못합니다</b>. 대신 <b>출력 변수(Output Variable)</b>로만 결과를 반환하고, 최종 답변은 에이전트가 자율적으로 생성하도록 위임하세요.
</div>

### 6.2 어떤 방식을 선택할까? — 판단 기준

| 판단 기준 | Topic 기반 | Instructions(Generative) 기반 |
|---|---|---|
| **질문 유형** | 정형화·고정 | 자유·다양 |
| **제어 수준** | 높음 (예측 가능) | 유연 (자율 판단) |
| **유지보수** | 초기 설계 부담 | 문서/지침 관리 중요 |
| **적합 시나리오** | 정책·프로세스·절차 안내 | FAQ·문서 질의·요약·혼합 업무 |
| **핵심 원칙** | **"틀리면 안 되면 Topics"** | **"유연해야 하면 Generative"** |

---

## 7. 변수(Variable) 사용법

대화 중 데이터를 저장하고 전달하기 위해 **변수(Variable)** 시스템을 활용합니다.

### 7.1 변수 유형

| 유형 | 범위 | 용도 |
|---|---|---|
| **Topic 변수** | 해당 Topic 내에서만 유효 | 질문 응답 저장, 중간 계산값 |
| **전역 변수 (Global)** | 전체 대화 세션에서 유효 | Topic 간 데이터 전달, 상태 유지 |
| **시스템 변수** | Copilot Studio 기본 제공 | 사용자 이름, 채널 정보 등 |

> 📖 **참조**: [Work with variables](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-variables) · [Variables overview](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-variables-about)

### 7.2 자주 사용하는 변수 패턴

| 목적 | 변수명 관례 | 설명 |
|---|---|---|
| 사용자 입력 | `varUserInput` | 질문 노드에서 자동 생성 |
| 분류 결과 | `varIntent`, `varCategory` | 조건 분기에 활용 |
| 첨부 파일 | `varAttachments` | `Activity.Attachments` 시스템 변수 참조 |
| Flow 결과 | `varResult`, `varRequestId` | Action 출력값 매핑 |
| 수신자 정보 | `varRecipient`, `varEmail` | 이메일/메시지 발송 시 |

### 7.3 주요 시스템 변수

| 변수명 | 타입 | 설명 |
|---|---|---|
| `Activity.Text` | string | 사용자가 가장 최근에 보낸 메시지 |
| `Activity.Channel` | choice | 현재 대화 채널 (Teams, Web 등) |
| `Activity.From.Id` | string | 사용자의 채널별 고유 ID |
| `Activity.From.Name` | string | 사용자의 표시 이름 |
| `System.User.DisplayName` | string | 로그인한 사용자의 표시 이름 |

> 📖 **참조**: [System variables list](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-variables-about#system-variables)

### 7.4 변수 매핑 순서 (실전 필수)

변수를 사용할 때는 **반드시 다음 순서**를 지켜야 합니다. 순서를 무시하면 런타임에 값이 비어 있는 오류가 발생합니다.

```
1. Variable 먼저 생성 (이름, 타입 정의)
2. System / Topic / Prompt 출력 → Variable에 저장
3. Variable → Flow Input에 매핑
4. Flow Output → Variable로 다시 받기
5. Variable 값을 메시지/조건에서 활용
```

<div class="info-box warning">
<b>⚠️ 흔한 실수</b><br>
Flow Input에서 System 변수를 <b>바로 참조하면 런타임에 값이 비어 있습니다</b>. 반드시 Topic 변수에 먼저 저장한 후, 그 변수를 Flow Input에 매핑하세요.
</div>

### 7.5 Topic 간 변수 전달

Topic 간에 데이터를 전달할 때는 **전역 변수 대신 Redirect + 반환 변수** 패턴을 권장합니다.

1. **보내는 Topic**: Redirect 노드에서 값을 전달
2. **받는 Topic**: 변수 속성에서 "Receive values from other topics" 체크
3. **반환**: 변수 속성에서 "Return values to original topics" 체크

이렇게 하면 전역 변수 남용 없이도 깔끔한 데이터 흐름을 구성할 수 있습니다.

> 📖 **참조**: [Pass variables between topics](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-variables#pass-variables-between-topics)

### 7.6 외부 소스에서 변수 초기화

웹사이트에 Agent를 임베드할 때, 사용자 정보를 미리 전달할 수 있습니다.

1. 전역 변수 생성 → **"External sources can set values"** 체크
2. URL 쿼리 파라미터로 전달: `botURL?UserName=홍길동`

> 📖 **참조**: [Set global variables from external sources](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-variables-bot#set-global-variables-from-external-sources)

### 7.7 Power Fx 수식 활용

Copilot Studio는 **Power Fx** 수식 언어를 지원하여 복잡한 연산과 데이터 변환을 처리할 수 있습니다.

```
// 문자열 결합
Concatenate(VarFirstName, " ", VarLastName)

// 조건부 메시지
If(VarRequestType = "긴급", "긴급 처리팀에 전달합니다.", "일반 접수되었습니다.")

// 날짜 계산
DateAdd(Now(), 3, TimeUnit.Days)
```

> 📖 **참조**: [Create expressions using Power Fx](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-power-fx)

---

## 8. Action 기반 처리 흐름

**Action**은 Agent가 대화 중에 외부 시스템을 호출하여 **실제 업무를 수행**하는 핵심 기능입니다. "답변하는 Copilot"에서 **"일을 하는 Agent"**로 전환되는 지점입니다.

### 8.1 Action 연결 방식 비교

| 방식 | 적합한 경우 | 특징 | 참조 |
|---|---|---|---|
| **커넥터 기반** | Outlook, Teams 등 표준 서비스 | 설정만으로 즉시 사용 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-plugin-actions) |
| **Power Automate 플로우** | 복잡한 다단계 처리 | 오류 처리, 루프 지원 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-flow) |
| **MCP 서버** | 자체 개발 도구/서비스 | 유연한 외부 도구 연동 | |
| **AI Prompt** | 맞춤형 AI 응답 생성 | 프롬프트 완전 제어 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/prompts-overview) |

### 8.2 Power Automate Flow 설계 실전 팁

**권장 아키텍처:**

```
Copilot Studio Agent
  └─ Action 호출 (판단/분기는 Agent가 담당)
       └─ Power Automate Cloud Flow (정형 작업만 실행)
            └─ (필요 시) Desktop Flow / 외부 API / MCP
```

**설계 핵심 원칙:**

| 원칙 | 설명 |
|---|---|
| **100초 제한** | Flow는 100초 내에 완료되어야 합니다. 오래 걸리는 로직은 분리하세요 |
| **판단은 Agent, 실행은 Flow** | if/else 분기는 Agent의 Topic/LLM에서 처리하고, Flow는 실행만 담당 |
| **결과만 반환** | Flow는 결과값만 출력 변수로 반환하고, 답변 작성은 Agent에게 위임 |
| **같은 환경** | Flow와 Agent는 **동일한 Power Platform 환경**에 있어야 연결 가능 |

<div class="info-box warning">
<b>⚠️ 실패 패턴 — Flow 안에서 모든 로직 처리</b><br>
Flow 안에서 if/else + 텍스트 조합까지 모두 처리하면 <b>디버깅 지옥, 유지보수 불가</b> 상태에 빠집니다. Flow는 <b>"명령을 받아 실행하고 결과만 돌려주는"</b> 역할에 집중하세요.
</div>

### 8.3 커넥터 기반 Action 설정 (단계별)

1. **Actions 탭** → **Add an action** 클릭
2. 사용할 커넥터 검색 (예: "Office 365 Outlook")
3. 작업 선택 (예: "Send an email (V2)")
4. 입력 파라미터를 변수 또는 고정값으로 설정
5. 인증 방식 선택

| 인증 방식 | 설명 | 사용 시나리오 |
|---|---|---|
| **최종 사용자 인증** | 사용자 본인 계정으로 실행 | 개인 메일 발송, 본인 일정 조회 |
| **작성자 제공 인증** | Agent 작성자의 서비스 계정으로 실행 | 공용 알림, 서비스 계정 활용 |

> 📖 **참조**: [Use actions with custom agents](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-plugin-actions)

---

## 9. Generative Orchestration 실전 가이드

### 9.1 활성화 방법

1. **Settings** 버튼 → **Generative AI** 선택
2. **Generative** 라디오 버튼 선택 (기본값: Classic)
3. 콘텐츠 모더레이션 수준 설정
4. **Save** 클릭

> 📖 **참조**: [Orchestrate agent behavior with generative AI](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-generative-actions)

### 9.2 Generative 모드에서의 설계 핵심

Generative 모드에서는 트리거 문구보다 **Topic/Action의 이름과 설명**이 더 중요합니다. LLM이 이를 기반으로 어떤 도구를 사용할지 판단합니다.

**좋은 Topic 이름/설명 예시:**

```
이름: IT 장비 신청
설명: 직원이 노트북, 모니터, 키보드 등 IT 장비를 신청할 때 사용합니다.
      필요한 장비 종류와 사용 목적을 수집하여 SharePoint에 등록합니다.
```

**좋은 Action 설명 예시:**

```
이름: 이메일 발송 (Outlook)
설명: 지정된 수신자에게 이메일을 발송합니다.
      사용자가 요청한 경우에만 호출하며, 발송 전 반드시 내용을 확인받습니다.
```

### 9.3 테스트 및 디버깅

- **Activity Map**: 테스트 패널에서 활성화하면 Agent가 어떤 Topic을 선택하고 어떤 Action을 호출했는지 시각적으로 추적할 수 있습니다.
- **변수 감시(Watch)**: 테스트 패널 사이드의 **Test** 탭에서 현재 변수 값을 실시간으로 확인할 수 있습니다.

<div class="info-box tip">
<b>💡 테스트 패널 vs 실제 동작의 차이</b><br>
테스트 패널은 실제 채널(Teams, Web)과 <b>동작이 다를 수 있습니다</b>. 특히 인증 관련 Action, 채널별 Adaptive Card 렌더링, Fallback 동작에서 차이가 발생합니다. 반드시 <b>게시(Publish) 후 실제 채널에서도 테스트</b>하세요.
</div>

---

## 10. 워크샵에서 가장 많이 나오는 실수 TOP 7

현장 워크샵에서 반복적으로 관찰된 실수 패턴입니다. 이것만 피해도 Agent 품질이 크게 올라갑니다.

| # | 실수 | 해결 방법 |
|---|---|---|
| 1 | **Topic과 Generative를 섞어 쓰면서 역할 충돌** | Topic은 정형, Generative는 자유영역으로 역할 분리 |
| 2 | **Flow 안에서 모든 로직(분기+텍스트) 처리** | 판단은 Agent, 실행만 Flow |
| 3 | **변수 생성 없이 바로 System 변수 참조** | 반드시 Topic 변수에 먼저 저장 후 매핑 |
| 4 | **지침을 한 문장으로 끝냄** ("도와줘") | 역할·행동순서·제약조건·도구목록 명시 |
| 5 | **Knowledge 소스 설명(Description) 미작성** | Generative 모드에서 LLM이 소스 선택의 기준으로 활용 |
| 6 | **테스트 패널 = 실제 동작이라고 오해** | 반드시 Publish 후 실제 채널에서 검증 |
| 7 | **크레딧 구조 모르고 Prompt/Action 남발** | Ch1의 과금 구조 참고, Estimator로 사전 예측 |

---

## 11. Agent 설계 모범 사례 요약

| 원칙 | 설명 |
|---|---|
| **Topics는 최소한으로** | 정형 업무만 Topic으로, 나머지는 Generative Answers |
| **지침은 정책처럼 작성** | 역할·목표·제약이 명확한 구체적 규칙 |
| **변수 이름을 의미있게** | `VarRequestType` > `Var1` |
| **Action 설명을 상세히** | Generative 모드에서 LLM 판단의 기준 |
| **Topic 끝에 메시지 노드 ❌** | 출력 변수로 반환, 최종 답변은 LLM에게 |
| **Flow는 결과만 반환** | 판단/분기는 Agent, 실행은 Flow |
| **보안 Action에 제약 추가** | 이메일, 데이터 수정 등은 사용자 확인 필수 |
| **지침에 도구 목록 명시** | LLM이 더 정확하게 Action을 선택 |

<div class="info-box note">
<b>📌 다음 챕터 미리보기</b><br>
이번 챕터에서 Agent를 만드는 핵심 방법론을 익혔습니다. 다음 <b>Chapter 4</b>에서는 만들어진 Agent를 외부 시스템(Power Automate, API, MCP)과 연동하는 구체적인 방법과 인증 설정을 다룹니다.
</div>
