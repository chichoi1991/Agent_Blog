---
layout: chapter
title: "Copilot Studio 개요 및 접속"
short_title: "개요 및 접속"
description: "Copilot Studio에 접속하는 방법, 필요한 라이선스와 과금 구조, 그리고 유사 서비스와의 차이를 실무 관점에서 설명합니다."
order: 1
icon: "🌐"
category: guide
---

## Copilot Studio란?

Microsoft Copilot Studio는 **AI Agent를 구축하기 위한 그래픽 기반 로우코드 도구**입니다. 직관적인 드래그 앤 드롭 인터페이스를 통해 대화형 AI Agent와 Agent Flow(자동화 워크플로우)를 만들 수 있습니다.

> 한 줄 요약: **"Copilot Studio는 Agent를 빠르게 제품화하는 도구"**입니다. AI 엔진(Azure Foundry)이나 시스템 구축(SI)과는 역할이 다릅니다.

> 📖 **참조**: [Copilot Studio overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio)

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

> 📖 **참조**: [Copilot Studio application card – Key features](https://learn.microsoft.com/en-us/microsoft-copilot-studio/system-service-card-copilot-studio#key-features-or-capabilities)

### 사용되는 AI 모델

Copilot Studio는 다양한 AI 모델을 활용하여 Agent 경험을 제공합니다.

- **OpenAI GPT 시리즈** (Azure OpenAI Service 제공)
- **Anthropic Claude Sonnet** 계열
- **xAI Grok** 계열

Agent 생성 시 **기본 모델을 선택**할 수 있으며, 모델에 따라 성능과 응답 특성이 달라집니다. Microsoft는 고객 데이터를 사용하여 기반 모델을 훈련하지 않습니다.

> 📖 **참조**: [Select a primary model for agent](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-select-agent-model)

<div class="info-box note">
<strong>📌 Reasoning 모델 사용 시 과금 주의</strong>
Reasoning 모델(고급 추론)을 사용하면 기본 기능 요금 + <strong>Text and generative AI tools (premium)</strong> 요금이 함께 부과됩니다. 예: Generative Answer에 Reasoning 모델 사용 시 = 2 Credits (생성형 응답) + 100 Credits (프리미엄 AI 도구) = 총 102 Credits 소모.
— <em><a href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management#reasoning-model-billing-rates" target="_blank">Learn: Reasoning model billing rates</a></em>
</div>

---

## Copilot Studio 접속 방법

Copilot Studio는 웹 브라우저에서 직접 접속할 수 있는 클라우드 서비스입니다.

| 항목 | 내용 |
|---|---|
| **접속 URL** | [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com) |
| **지원 브라우저** | Microsoft Edge, Google Chrome, Firefox (최신 버전 권장) |
| **로그인 계정** | 조직의 Microsoft 365 / Entra ID 계정 |
| **데모/체험** | [copilotstudio.microsoft.com/tryit](https://copilotstudio.microsoft.com/tryit) |

### 접속 방식별 차이

| 접속 방식 | 용도 | 특징 |
|---|---|---|
| **웹 앱** (copilotstudio.microsoft.com) | IT 관리자, Agent 빌더 | 전체 기능, 고급 구성, 엔티티/변수 활용 |
| **Teams 앱** | 조직 내부 직원용 챗봇 | Teams 내에서 빠르게 생성, Classic Chatbot만 지원 |
| **VS Code 확장** | 개발자 | 로컬 개발 환경에서 Agent 편집, YAML 기반 |

> 📖 **참조**: [VS Code extension for Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/visual-studio-code-extension-overview) · [Quickstart guide](https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-gpt-quickstart)

<div class="info-box warning">
<strong>⚠️ 접속 전 확인사항</strong>
<ul>
<li>조직의 <strong>Entra ID(구 Azure AD)</strong> 계정으로 로그인해야 합니다. 개인 Microsoft 계정(@outlook.com, @hotmail.com 등)으로는 접속할 수 없습니다.</li>
<li>조직 네트워크에서 <strong>*.powerva.microsoft.com</strong>, <strong>*.directline.botframework.com</strong> 등 Power Platform 관련 URL이 차단되어 있지 않은지 확인하세요. Conditional Access / Proxy / MDCA와 충돌하는 사례가 빈번합니다.</li>
</ul>
</div>

> 📖 **참조**: [Required services and network URLs](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-quotas#required-services)

---

## 접근 권한 및 라이선스

### 라이선스 유형

Copilot Studio를 사용하려면 적절한 라이선스가 필요합니다.

| 라이선스 | 설명 | 포함 내용 | 주요 대상 |
|---|---|---|---|
| **Microsoft 365 Copilot** | M365 Copilot에 Copilot Studio 사용 권한 포함 | B2E 시나리오 무료 사용 | Copilot 도입 조직 |
| **Copilot Studio 독립 라이선스** | 테넌트당 구매, 25,000 Credits/월 포함 | Dataverse 기본 용량 (5GB DB + 20GB File + 2GB Log) | Agent 전용 구축 조직 |
| **Copilot Studio User 라이선스** | 사용자별 무료 라이선스 | Agent 작성(Maker) 권한 | 시민 개발자 |
| **평가판 (Trial)** | 60일간 무료 사용 | 기능 제한 없음 | PoC / 테스트 |
| **PAYG (Pay-As-You-Go)** | Azure 구독 연결, 사용한 만큼 과금 | 초과 크레딧 자동 처리 | 유연한 과금 필요 시 |

> 📖 **참조**: [Copilot Studio licensing](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing) · [Power Platform licensing FAQ](https://learn.microsoft.com/en-us/power-platform/admin/powerapps-flow-licensing-faq#microsoft-copilot-studio)

### 권한 구조

| 역할 | 권한 | 대상 |
|---|---|---|
| **환경 관리자** | 환경 설정, 사용자 관리, Agent 배포, DLP 정책 | IT 관리자 |
| **환경 작성자(Maker)** | Agent 생성 및 편집, Topic/Action 구성, 게시 | 시민 개발자, 현업 담당자 |
| **사용자** | 배포된 Agent 이용 | 최종 사용자 (직원, 고객) |

- **보안 구조**: Entra ID 기반 인증, Dataverse 보안 역할, AAD 보안 그룹 기반 접근 제한이 적용됩니다.
- **환경(Environment)**: Copilot Studio는 Power Platform 환경 위에서 동작하며, 환경별로 Agent를 생성·관리합니다.

> 📖 **참조**: [Assign licenses and manage access](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing)

<div class="info-box tip">
<strong>💡 실무 팁 — "제작 권한"과 "실행 과금"은 별개입니다</strong>
<ul>
<li><strong>Agent를 만드는 권한</strong>: Copilot Studio User 라이선스 (무료) 또는 Maker 역할</li>
<li><strong>Agent를 사용할 때 과금</strong>: Copilot Credits 기반 (M365 Copilot 사용자는 B2E 무료)</li>
</ul>
이 두 가지를 분리해서 설명하지 않으면, "라이선스가 있으면 다 무료인 거 아니냐?"는 오해가 생깁니다.
</div>

---

## 과금 구조 상세 (Copilot Credits)

### Copilot Credits란?

**Copilot Credits**는 Copilot Studio의 공통 과금 단위입니다. Agent가 수행하는 작업 유형에 따라 크레딧 소모가 달라집니다. 2025년 9월부터 기존 "메시지(messages)" 단위에서 "Copilot Credits" 단위로 변경되었습니다.

> 📖 **참조**: [Billing rates and management](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management)

### 기능별 크레딧 소모 기준

| 에이전트 동작 | 소모 크레딧 | M365 Copilot 사용자 | 설명 |
|---|---|---|---|
| Classic Answer (사전 정의 답변) | **1 Credit** | ✅ 무료 | FAQ, 고정 응답 |
| Generative Answer (LLM 기반 생성 답변) | **2 Credits** | ✅ 무료 | GPT 기반 동적 답변 |
| Agent Action (에이전트 작업 실행) | **5 Credits** | ✅ 무료 | Flow 호출, 커넥터 실행 |
| Tenant Graph Grounding | **10 Credits** | ✅ 무료 | M365 Graph 기반 RAG |
| Agent Flow 실행 (100 actions 기준) | **13 Credits** | ✅ 무료 | Power Automate Flow |
| AI Tool – 기본 (10 responses) | **1 Credit** | ✅ 무료 | 텍스트 생성형 |
| AI Tool – 표준 (10 responses) | **15 Credits** | ✅ 무료 | 중급 AI 도구 |
| AI Tool – 프리미엄 (10 responses) | **100 Credits** | ✅ 무료 | Reasoning 모델 등 |
| Content Processing Tool (페이지당) | **8 Credits** | ✅ 무료 | 문서 처리 |

**복합 과금 예시**: Tenant Graph Grounding + Generative Answer 조합 = **12 Credits** (10 + 2) 소모

> 💡 **크레딧 비용 참고**: PAYG 기준 **1 Copilot Credit = $0.01 USD**
>
> 📖 **참조**: [Copilot Credits billing rates](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management#copilot-credits-billing-rates) · [Agent usage estimator](https://microsoft.github.io/copilot-studio-estimator/)

### M365 Copilot 사용자 무료 사용 조건

M365 Copilot 라이선스를 보유한 사용자가 Copilot Studio Agent를 사용할 때, 특정 조건 하에서 **크레딧 차감 없이 무료로 이용**할 수 있습니다.

**✅ 무료 사용이 되는 조건 (모두 충족해야 함):**

| 조건 | 필수 여부 | 설명 |
|---|---|---|
| M365 Copilot 라이선스 보유 | ✅ | Agent **사용자**가 라이선스 보유 |
| Entra ID 인증 | ✅ | Agent의 인증 방식이 Entra ID 기반 |
| 사용 주체가 사람(User) | ✅ | 시스템 계정이 아닌 실제 사용자 |
| Employee-facing (B2E) 시나리오 | ✅ | 내부 직원 대상 업무 |
| Fair Use 범위 내 | ✅ | Microsoft가 정한 합리적 사용 범위 |

**❌ 무료 적용이 안 되는 경우:**
- **Anonymous**(익명) 또는 **Custom Token** 인증
- M365 Copilot **User Identity를 확인할 수 없는** 경우
- **B2C**(고객 대상) 시나리오
- **System account** 기반 자동 실행 (스케줄 / 트리거 기반)
- **Autonomous/Non-interactive** 작업

<div class="info-box tip">
<strong>💡 과금의 본질 한 줄 요약</strong>
<strong>"누가(사용자 vs 시스템), 어떻게(대화 vs 자동화), 어떤 인증으로(Entra ID vs Anonymous) 쓰느냐"</strong>가 과금의 핵심입니다. 사람이 직접 쓰는 Copilot 기반 업무는 무료 범위가 넓지만, 시스템이 대신 일을 하면 그때부터 과금이 발생합니다.
</div>

### Power Automate 플로우와 과금 관계

Power Automate 플로우를 Copilot Studio에서 사용할 때 과금 레일이 변경됩니다.

| 변경 전 | 변경 후 |
|---|---|
| Power Automate Cloud Flow | Copilot Studio **Agent Flow** |
| PA Premium / User 라이선스 기준 | **Copilot Credits** 기반 과금 |
| 프리미엄 커넥터 라이선스 필요 | 크레딧으로 프리미엄 커넥터 사용 가능 |

**핵심 주의사항:**
- Cloud Flow를 **Copilot Studio Plan으로 변경**하면 PA 라이선스 판정에서 벗어나 Copilot Studio Meter로 이동합니다.
- 이 경우 별도 PA Premium 없이도 프리미엄 커넥터 사용이 가능하나, **Copilot Credits으로 차감**됩니다.
- Copilot Credits는 **환경 할당이 필수가 아니며**, 테넌트 레벨에서 미할당 상태로 존재할 수 있습니다.

<div class="info-box warning">
<strong>⚠️ 되돌릴 수 없는 변경</strong>
Copilot Studio Plan으로 변경한 Flow는 <strong>User/Process 라이선스로 되돌릴 수 없습니다</strong>. 필요 시 Flow를 처음부터 재생성해야 합니다. 변경 전에 반드시 영향 범위를 확인하세요.
</div>

### 크레딧 모니터링 및 초과 관리

| 기능 | 설명 | 참조 |
|---|---|---|
| **소비량 확인** | Power Platform Admin Center → Licensing → Copilot Studio | [Learn](https://learn.microsoft.com/en-us/power-platform/admin/manage-copilot-studio-messages-capacity) |
| **Agent별 한도 설정** | 개별 Agent의 월간 크레딧 상한 설정 가능 | Admin Center → Manage Agents |
| **초과 시 동작** | Prepaid 소진 시 → PAYG 자동 전환 (Azure 구독 연결 필요) | [Learn](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management#overage-enforcement) |
| **Agent Flow 초과** | 크레딧 소진 시 새 실행 차단 (Agent 자체는 비활성화되지 않음) | |
| **사용량 예측** | Agent Usage Estimator 도구 활용 | [Estimator](https://microsoft.github.io/copilot-studio-estimator/) |

<div class="info-box tip">
<strong>💡 실무 팁 — 비용 관리 전략</strong>
<ul>
<li><strong>Estimator 활용</strong>: 에이전트 배포 전에 <a href="https://microsoft.github.io/copilot-studio-estimator/" target="_blank">Microsoft Copilot Studio agent usage estimator</a>로 예상 소비량을 반드시 확인하세요.</li>
<li><strong>Agent별 한도 설정</strong>: 전사 배포 시 Agent별 월간 크레딧 상한을 설정하여 예기치 않은 비용 폭증을 방지하세요.</li>
<li><strong>PAYG 안전망</strong>: Prepaid 크레딧 팩 + PAYG(Azure 구독)를 함께 설정하면, 크레딧 소진 시에도 서비스가 중단되지 않습니다.</li>
<li><strong>Dataverse Shadow Cost 주의</strong>: Knowledge 소스로 파일을 업로드하면 Dataverse 스토리지가 소비됩니다. 전사 PoC 시 환경/용량 가이드를 반드시 확인하세요.</li>
</ul>
</div>

---

## Copilot Chat / Agent Builder / Copilot Studio 차이

Microsoft는 다양한 AI/자동화 도구를 제공합니다. "어떤 도구를 써야 하는가?"는 실무에서 가장 빈번하게 받는 질문입니다.

### 도구 비교표

| 구분 | Copilot Chat (BizChat) | Agent Builder (M365 내) | Copilot Studio |
|---|---|---|---|
| **목적** | 일상 업무 보조 (검색, 요약, 작성) | 빠르고 간단한 Agent 생성 | 대화형 Agent 전문 구축 |
| **사용자** | 전 직원 | 개인/소규모 팀 | 시민 개발자 / 개발자 |
| **인터페이스** | 채팅 (M365 앱 내 통합) | 자연어 기반 간편 빌더 | 대화 흐름 디자이너 (그래픽 + YAML) |
| **주요 기능** | 문서 요약, 이메일 작성, 질의응답 | Knowledge 연결, 기본 지침 | 토픽, Knowledge, Action, 트리거 |
| **Action/Flow** | ❌ 불가 | ❌ 불가 | ✅ 가능 |
| **외부 API 연동** | ❌ 불가 | ❌ 불가 | ✅ 가능 |
| **커스터마이징** | 제한적 (프롬프트 수준) | 지침 + Knowledge | Agent 로직 전체 제어 |
| **배포 대상** | M365 앱 내 | M365 Copilot 내 | Teams, 웹, 커스텀 채널 다수 |
| **거버넌스** | M365 관리 | 기본 | 환경 관리, DLP, 분석, 감사 로그 |
| **추가 과금** | 없음 | 없음 | 크레딧 기반 (B2E 무료 가능) |
| **AI 모델 선택** | 기본 제공 | 기본 제공 | GPT, Claude, Grok 등 선택 가능 |

> 📖 **참조**: [Choose between Microsoft 365 Copilot and Copilot Studio](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/copilot-studio-experience) · [Copy agent to Copilot Studio](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/copy-agent-to-copilot-studio)

### 핵심 판단 기준

> **"정보를 찾기만 하면 → Agent Builder, 실제로 일을 시키면 → Copilot Studio"**

| 시나리오 | 추천 도구 | 이유 |
|---|---|---|
| "직원들이 문서를 빠르게 찾고 요약했으면 좋겠다" | **Copilot Chat** | M365 앱 내 자동 통합, 별도 구축 불필요 |
| "개인적으로 사내 정책 FAQ Agent를 빠르게 만들고 싶다" | **Agent Builder** | 자연어로 바로 생성, 설정 최소 |
| "사용자 입력을 받아 이메일을 보내거나 시스템에 데이터를 등록해야 한다" | **Copilot Studio** | Action/Flow 연동 필요 |
| "외부 API를 호출하거나 커스텀 커넥터를 연결해야 한다" | **Copilot Studio** | 외부 연동은 Studio만 가능 |
| "조직 전체에 정식으로 Agent를 배포하고 관리해야 한다" | **Copilot Studio** | 거버넌스, 분석, 환경 관리 내장 |

### Agent Builder → Copilot Studio 확장

Agent Builder는 **빠르게 간단한 Agent를 만들기** 위한 도구이지만, 고급 기능이 필요해지면 **Copilot Studio로 복사(Copy to Copilot Studio)**하여 확장할 수 있습니다.

복사 시 활용할 수 있는 고급 기능:
- **향상된 라이프사이클 관리**: 버전 관리, 단계별 배포, 롤백
- **사용 모니터링 및 분석**: 사용자 참여도, 쿼리 트렌드, 성능 인사이트
- **거버넌스 제어**: 역할 기반 접근, DLP 정책, 규정 준수
- **환경 관리**: 개발/테스트/운영 환경 분리
- **감사 및 규정 준수**: 감사 추적, 규정 준수 보고
- **조직 배포**: Teams 앱 스토어 게시, 관리자 승인을 통한 전사 배포

<div class="info-box tip">
<strong>💡 실무 팁 — 단계적 접근 권장</strong>
처음부터 Copilot Studio로 복잡하게 시작하지 마세요. <strong>Agent Builder로 빠르게 프로토타입</strong>을 만들어 사용자 반응을 확인한 후, 기능이 더 필요할 때 <strong>Copilot Studio로 확장</strong>하는 방식이 가장 효과적입니다. "빠르게 시작 → 점진적 확장"이 실무에서 검증된 전략입니다.
</div>

---

## Agent를 활용하는 방식

Copilot Studio로 만든 Agent는 크게 두 가지 방식으로 활용됩니다.

### 1. 독립형 Agent

웹사이트, Teams, Facebook 등의 채널에서 **사용자와 직접 대화**하는 Agent입니다.

**활용 예시:**
- **고객 지원**: 주문 추적, 반품 처리, FAQ 자동 응답
- **사내 FAQ**: HR 정책 안내, IT 매뉴얼, 복리후생 문의
- **IT 헬프데스크**: 비밀번호 초기화, VPN 연결, 장비 신청
- **업무 자동화**: 승인 요청, 이메일 발송, 데이터 등록

> 📖 **참조**: [Intended uses of Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/system-service-card-copilot-studio#intended-uses)

### 2. Microsoft 365 Copilot 확장

M365 Copilot에 **플러그인/확장 Agent**로 연동하여, 기존 Copilot 경험에 우리 조직만의 전문 지식과 기능을 추가합니다.

```
예: 직원이 Copilot Chat에서
    "우리 회사 연차 정책 알려줘" 라고 물으면
    → 연결된 HR Agent가 SharePoint의 HR 문서를 기반으로 답변
```

> 📖 **참조**: [Extend Microsoft 365 Copilot with agents](https://learn.microsoft.com/en-us/microsoft-copilot-studio/microsoft-copilot-extend-copilot-extensions)

### 3. Agent 간 연동 (Multi-Agent)

Agent는 단순 이용뿐 아니라, **다른 Agent에게 도구(Tool)로도 제공**될 수 있습니다.

```
[사용자] → [통합 업무 Agent]
              ├─ HR 관련 질문 → [HR Agent] 호출
              ├─ IT 관련 질문 → [IT Agent] 호출
              └─ 경비 관련 질문 → [Finance Agent] 호출
```

이 구조를 통해 도메인별 전문 Agent를 독립적으로 관리하면서도, 사용자에게는 하나의 통합 창구를 제공할 수 있습니다.

<div class="info-box note">
<strong>📌 다음 챕터 미리보기</strong>
이번 챕터에서 Copilot Studio가 무엇인지, 어떻게 접속하고, 과금이 어떻게 되는지를 파악했습니다. 다음 <strong>Chapter 2</strong>에서는 실제 Copilot Studio에 접속했을 때 보이는 <strong>화면 구성</strong>과 핵심 개념(Agent, Topics, Knowledge, Actions)을 하나씩 살펴봅니다.
</div>
