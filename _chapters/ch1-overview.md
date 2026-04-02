---
layout: chapter
title: "Copilot Studio 개요 및 접속"
short_title: "개요 및 접속"
description: "Copilot Studio에 접속하는 방법, 필요한 라이선스와 과금 구조, 그리고 유사 서비스와의 차이를 설명합니다."
order: 1
---

## Copilot Studio란?

Microsoft Copilot Studio는 **AI Agent를 구축하기 위한 그래픽 기반 로우코드 도구**입니다. 직관적인 드래그 앤 드롭 인터페이스를 통해 대화형 AI Agent와 Agent Flow(자동화 워크플로우)를 만들 수 있습니다.

### 핵심 특징

| 특징 | 설명 |
|---|---|
| **Agent 생성 및 커스터마이징** | AI 기반 Agent를 구축하고, 조직의 톤, 워크플로우, 비즈니스 규칙에 맞게 커스터마이징 |
| **로우코드 + 프로코드 유연성** | 직관적인 로우코드 도구로 시작하고, API·커스텀 커넥터·스크립트로 확장 가능 |
| **Microsoft 생태계 통합** | Teams, Power Platform, Microsoft Graph와 원활한 통합 |
| **외부 시스템 연결** | 1,000개 이상의 커넥터와 API로 서드파티 시스템 연동 |
| **트리거 및 자율 에이전트** | 이벤트(새 레코드, 고객 문의 등)에 반응하여 자동으로 작업 수행 |
| **컨텍스트 유지** | 이전 대화 맥락을 유지하여 일관된 응답 제공 |
| **확장성** | 커스텀 플러그인, 커넥터, 고급 로직으로 기능 확장 |

### 사용되는 AI 모델

Copilot Studio는 다양한 AI 모델을 활용하여 Agent 경험을 제공합니다.

- **OpenAI GPT 시리즈** (Azure OpenAI Service 제공)
- **Anthropic Claude Sonnet** 계열
- **xAI Grok** 계열

Agent 생성 시 **기본 모델을 선택**할 수 있으며, 모델에 따라 성능과 응답 특성이 달라집니다. Microsoft는 고객 데이터를 사용하여 기반 모델을 훈련하지 않습니다.

---

## Copilot Studio URL

Copilot Studio는 웹 브라우저에서 직접 접속할 수 있는 클라우드 서비스입니다.

| 항목 | 내용 |
|---|---|
| **접속 URL** | [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com) |
| **지원 브라우저** | Microsoft Edge, Google Chrome, Firefox (최신 버전 권장) |
| **로그인 계정** | 조직의 Microsoft 365 / Entra ID 계정 |
| **Teams 앱** | Teams 내 Copilot Studio 앱 (Classic Chatbot 전용) |

### 접속 방식별 차이

| 접속 방식 | 용도 | 특징 |
|---|---|---|
| **웹 앱** (copilotstudio.microsoft.com) | IT 관리자, Agent 빌더 | 전체 기능, 고급 구성, 엔티티/변수 활용 |
| **Teams 앱** | 조직 내부 직원용 챗봇 | Teams 내에서 빠르게 생성, Classic Chatbot만 지원 |
| **데모** | 체험/평가 | [copilotstudio.microsoft.com/tryit](https://copilotstudio.microsoft.com/tryit) |

<div class="info-box note">
<strong>📌 참고</strong>
접속 시 조직의 Entra ID(구 Azure AD) 계정으로 로그인해야 합니다. 개인 Microsoft 계정(@outlook.com, @hotmail.com 등)으로는 접속할 수 없습니다.
</div>

---

## 접근 권한 및 라이선스 개요

Copilot Studio를 사용하려면 적절한 라이선스가 필요합니다.

### 라이선스 유형

| 라이선스 | 설명 | 주요 대상 |
|---|---|---|
| **Microsoft 365 Copilot** | M365 Copilot 라이선스에 Copilot Studio 사용 권한 포함 | Copilot 도입 조직 |
| **Copilot Studio 독립 라이선스** | Copilot Studio만 별도 구매 가능 | Agent 전용 구축 조직 |
| **평가판 (Trial)** | 60일간 무료 사용 가능 | PoC / 테스트 용도 |

### 과금 구조 (Copilot Credits)

Copilot Studio는 **Copilot Credit**이라는 공통 단위로 과금됩니다. Agent가 수행하는 작업 유형에 따라 크레딧 소모가 달라집니다.

| 구분 | 기능 | 크레딧 소모 |
|---|---|---|
| 1 | Classic Answer (사전 정의 답변) | **1 Credit** |
| 2 | Generative Answer (LLM 기반 생성 답변) | **2 Credits** |
| 3 | Agent Action (에이전트 작업 실행) | **5 Credits** |
| 4 | Tenant Graph Grounding (Microsoft Graph RAG) | **10 Credits** |
| 5 | Agent Flow 실행 (100 actions 기준) | **13 Credits** |
| 6 | AI Tool – 텍스트/기본 생성형 (10 responses) | **1 Credit** |
| 7 | AI Tool – 표준 (10 responses) | **15 Credits** |
| 8 | AI Tool – 프리미엄 (10 responses) | **100 Credits** |
| 9 | Content Processing Tool (페이지당) | **8 Credits** |

### M365 Copilot 사용자 무료 사용 조건

M365 Copilot 라이선스를 보유한 사용자가 Copilot Studio Agent를 사용할 때, 특정 조건 하에서 **크레딧 차감 없이 무료로 이용**할 수 있습니다.

**무료 사용이 되는 조건:**
- Agent 사용자가 **Microsoft 365 Copilot 라이선스 보유**
- Agent가 해당 사용자의 **Entra ID 인증 기반으로 실행**
- Agent의 인증 방식이 **"Manual + Entra ID"**로 설정
- **Employee-facing (B2E) 시나리오**에 한정
- Copilot Studio에서 제공하는 **모든 채널(Teams, Web 등)** 포함

**무료 적용이 안 되는 경우:**
- 인증이 **Anonymous** 또는 **Custom Token**인 경우
- M365 Copilot **User Identity를 확인할 수 없는** 경우
- B2C(고객 대상) 시나리오

<div class="info-box tip">
<strong>💡 실무 팁</strong>
내부 직원용(B2E) 에이전트를 구축할 때, 직원들이 M365 Copilot 라이선스를 가지고 있다면 <strong>추가 크레딧 구매 없이 운영 가능</strong>합니다. 다만, Entra ID 인증이 반드시 설정되어 있어야 합니다.
</div>

### Power Automate 플로우와 과금 관계

Power Automate 플로우를 Copilot Studio에서 사용할 때의 과금 구조를 이해하는 것이 중요합니다.

- Cloud Flow를 **Copilot Studio Plan으로 변경**하면, Power Automate 라이선스 레일이 아니라 **Copilot Studio 과금 레일(Copilot Studio Meter)**로 이동합니다.
- 이 경우 별도의 Power Automate Premium 라이선스 없이도 프리미엄 커넥터를 사용할 수 있으나, **Copilot Credits으로 차감**됩니다.
- Copilot Credits는 **환경 할당이 필수가 아니며**, 테넌트 레벨에서 미할당 상태로 존재할 수 있습니다.

<div class="info-box warning">
<strong>⚠️ 주의</strong>
<ul>
<li>Copilot Studio Plan으로 변경한 Flow는 <strong>User/Process 라이선스로 되돌릴 수 없습니다</strong>. 필요 시 Flow를 재생성해야 합니다.</li>
<li>평가판은 기능 제한 없이 사용할 수 있지만, 60일 종료 후 자동으로 비활성화됩니다. 운영 환경에서의 사용은 정식 라이선스를 확보한 후 진행하세요.</li>
<li>메시지 수 모니터링은 <strong>Power Platform Admin Center</strong>에서 가능하며, 향후 M365 Admin Center 대시보드도 제공 예정입니다.</li>
</ul>
</div>

### 권한 구조

- **환경(Environment)**: Copilot Studio는 Power Platform 환경 위에서 동작합니다. 환경별로 Agent를 생성·관리합니다.
- **역할(Role)**:

| 역할 | 권한 | 대상 |
|---|---|---|
| **환경 관리자** | 환경 설정, 사용자 관리, Agent 배포 | IT 관리자 |
| **환경 작성자(Maker)** | Agent 생성 및 편집, Topic/Action 구성 | 시민 개발자, 현업 담당자 |
| **사용자** | 배포된 Agent 이용 | 최종 사용자 (직원, 고객) |

- **보안 구조**: Entra ID 기반 인증, Dataverse 보안 역할, AAD 보안 그룹 기반 접근 제한이 적용됩니다.

---

## Copilot Chat / Agent Builder / Copilot Studio 차이

Microsoft는 다양한 AI/자동화 도구를 제공하고 있어, 각 도구의 역할과 차이를 이해하는 것이 중요합니다.

### 도구 비교표

| 구분 | Copilot Chat (BizChat) | Agent Builder (M365 Copilot 내) | Copilot Studio |
|---|---|---|---|
| **목적** | 일상 업무 보조 (검색, 요약, 작성) | 빠르고 간단한 Agent 생성 | 대화형 Agent 전문 구축 |
| **사용자** | 최종 사용자 (직원) | 개인/소규모 팀 | 시민 개발자 / 개발자 |
| **인터페이스** | 채팅 (M365 앱 내 통합) | 자연어 기반 간편 빌더 | 대화 흐름 디자이너 (그래픽 + YAML) |
| **주요 기능** | 문서 요약, 이메일 작성, 질의응답 | Knowledge 연결, 기본 지침 설정 | 토픽 설계, Knowledge, Action, 트리거 |
| **데이터 연결** | M365 Graph 기반 | SharePoint, 파일 업로드 | 다양한 커넥터 + API + MCP |
| **커스터마이징** | 제한적 (프롬프트 수준) | 지침 + Knowledge 수준 | Agent 로직 전체 제어 (변수, 분기, Action) |
| **배포 대상** | M365 앱 내 자동 통합 | M365 Copilot 내 | Teams, 웹, 커스텀 채널 다수 |
| **거버넌스** | M365 관리 | 기본 (Copilot Studio로 복사하여 확장 가능) | 환경 관리, DLP, 분석, 감사 로그 |
| **AI 모델 선택** | 기본 제공 | 기본 제공 | GPT, Claude, Grok 등 선택 가능 |

### Agent Builder → Copilot Studio 확장

Agent Builder는 **빠르게 간단한 Agent를 만들기** 위한 도구이지만, 고급 기능이 필요해지면 **Copilot Studio로 복사(Copy)하여 확장**할 수 있습니다. 복사 시 다음과 같은 고급 기능을 활용할 수 있습니다:

- **향상된 라이프사이클 관리**: 버전 관리, 단계별 배포, 롤백 옵션
- **사용 모니터링 및 분석**: 사용자 참여도, 쿼리 트렌드, 성능 인사이트
- **거버넌스 제어**: 역할 기반 접근, 데이터 정책, 규정 준수 검사
- **환경 관리**: 개발/테스트/운영 환경 분리
- **감사 및 규정 준수**: 감사 추적, 규정 준수 보고

### 언제 어떤 도구를 선택할까?

| 시나리오 | 추천 도구 | 이유 |
|---|---|---|
| "직원들이 문서를 빠르게 찾고 요약했으면 좋겠다" | **Copilot Chat** | M365 앱 내 자동 통합, 별도 구축 불필요 |
| "개인적으로 간단한 FAQ Agent를 빠르게 만들고 싶다" | **Agent Builder** | 자연어로 바로 생성, 설정 최소 |
| "현업에서 간단한 데이터 관리 앱이 필요하다" | **App Builder** | CRUD 앱, 폼/테이블 기반 |
| "사용자와 자연어로 대화하며 업무를 처리하는 Agent가 필요하다" | **Copilot Studio** | 전체 로직 제어, 외부 연동, 멀티 채널 |
| "조직 전체에 정식으로 Agent를 배포하고 관리해야 한다" | **Copilot Studio** | 거버넌스, 분석, 환경 관리 내장 |

<div class="info-box tip">
<strong>💡 실무 팁</strong>
이 도구들은 경쟁 관계가 아니라 <strong>보완 관계</strong>입니다. 예를 들어, Copilot Studio로 만든 Agent가 내부적으로 Power Automate 흐름을 호출하고, 그 결과를 Copilot Chat에서 활용하는 등의 통합 구성이 가능합니다. <strong>Agent Builder로 빠르게 시작</strong>하고, 기능이 더 필요해지면 <strong>Copilot Studio로 확장</strong>하는 접근도 권장됩니다.
</div>

---

## Agent를 활용하는 방식

Copilot Studio로 만든 Agent는 크게 두 가지 방식으로 활용됩니다.

### 1. 독립형 Agent

- 웹사이트, Teams, Facebook 등의 채널에서 **사용자와 직접 대화**하는 Agent
- 고객 지원, 사내 FAQ, IT 헬프데스크 등

### 2. Microsoft 365 Copilot 확장

- M365 Copilot에 **플러그인/확장 Agent**로 연동
- 기존 Copilot 경험에 특정 도메인 지식이나 기능을 추가
- 예: Copilot에게 "우리 회사 연차 정책 알려줘"라고 물으면, 연결된 Agent가 SharePoint의 HR 문서를 기반으로 답변

### Agent 만들기 고려사항

| 고려사항 | 설명 |
|---|---|
| **M365 Copilot 확장** | 기존 Copilot 오케스트레이터를 활용하고 싶은 경우 |
| **독립형 Agent** | 회사 데이터 통합, 실시간 외부 API 연동, 이벤트 트리거 반응이 필요한 경우 |
| **커스텀 솔루션** | 웹/모바일 앱, 자동화 워크플로우에 임베디드, 브랜딩 완전 제어가 필요한 경우 |

<div class="info-box note">
<strong>📌 참고</strong>
Agent는 단순 이용뿐 아니라, <strong>다른 Agent에게 도구(Tool)로도 제공</strong>될 수 있습니다. 예를 들어, "HR Agent"를 만들어 놓으면 "통합 업무 Agent"가 HR 관련 질문을 받았을 때 HR Agent를 호출하는 구조가 가능합니다.
</div>
