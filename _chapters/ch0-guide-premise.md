---
layout: chapter
title: "가이드의 전제"
short_title: "가이드의 전제"
description: "이 가이드가 전제하는 Copilot Studio의 가능 범위, 한계, 그리고 직접 개발(SI)과의 경계 기준을 정리합니다."
order: 0
icon: "📋"
---

## Copilot Studio로 가능한 범위

Microsoft Copilot Studio는 **로우코드(Low-Code) 기반의 Agent 빌더**로, 대화형 AI Agent를 코드 작성 없이 또는 최소한의 설정만으로 구현할 수 있는 그래픽 도구입니다. 데이터 과학자나 전문 개발자 없이도 Agent를 쉽게 만들 수 있도록 설계되어 있으며, 필요에 따라 프로코드(Pro-Code) 확장도 가능합니다.

### 자연어 기반 대화형 Agent

- 사용자가 자연어로 질문하면, 사전 정의된 **Topics**(토픽) 또는 **Generative Answers**(생성형 응답)를 통해 답변을 제공합니다.
- FAQ 봇, 사내 가이드 봇, 고객 응대 봇 등 대화형 인터페이스에 적합합니다.
- **Generative Orchestration**을 활성화하면, 전통적인 NLU(Natural Language Understanding) 모델 대신 **LLM 기반 다중 의도 인식**이 작동하여, 하나의 발화에서 여러 의도를 동시에 파악하고 적절한 Topic/Action/Knowledge를 자동 체이닝합니다.

<div class="info-box note">
<strong>📌 참고</strong>
Copilot Studio는 더 이상 수백 개의 Topic을 일일이 작성하는 방식이 아닙니다. <strong>핵심 업무용 Topic</strong>만 설계하고, 나머지는 <strong>AI 기반 생성형 응답</strong>에 맡기는 하이브리드 방식으로 동작합니다. — <em>Microsoft Learn: Explore AI capabilities in Copilot Studio</em>
</div>

### 사내 데이터 기반 응답 (Knowledge)

- SharePoint, OneDrive, 웹사이트, 파일 업로드, Dataverse 등 다양한 소스를 **Knowledge**로 연결하면, Agent가 해당 데이터를 기반으로 생성형 응답을 제공합니다.
- RAG(Retrieval-Augmented Generation) 방식으로 동작하여, 검색된 콘텐츠를 요약하고 검증한 후 **출처(Citation)**와 함께 응답합니다.
- 사내 문서, 정책, 매뉴얼 등을 빠르게 검색·요약해주는 Agent를 만들 수 있습니다.
- **Enhanced Search**를 통해 연결된 SharePoint 등의 **원본 데이터 권한을 그대로 상속**하므로, 사용자가 접근 권한이 없는 문서는 응답에 포함되지 않습니다.

### Power Platform 연계 자동화

- **Power Automate**와의 네이티브 연계를 통해 승인 요청, 이메일 발송, 데이터 기록 등의 자동화 워크플로우를 Agent에서 직접 실행할 수 있습니다.
- 표준 커넥터(Outlook, Teams, SharePoint, Dataverse 등)를 활용한 사내 시스템 연동이 가능합니다.
- **Agent Flow**를 통해 Power Automate 플로우를 Copilot Studio 컨텍스트 내에서 실행하고, 결과를 대화에 반환할 수 있습니다.

### 외부 시스템 연동

- HTTP 요청 기반으로 외부 REST API를 호출하거나, **1,000개 이상의 표준/프리미엄 커넥터**를 통해 다양한 서비스와 연동합니다.
- **커스텀 커넥터**를 생성하여 사내·대외 시스템과 데이터를 주고받을 수 있습니다.
- **MCP(Model Context Protocol)** 프로토콜을 통해 외부 MCP 서버를 도구(Tool)로 직접 연결할 수 있습니다.

### AI 기반 고급 기능

Copilot Studio는 단순 챗봇을 넘어 다양한 AI 기능을 제공합니다.

| AI 기능 | 설명 | 제한/고려사항 |
|---|---|---|
| **Generative Orchestration** | 다중 의도 인식, Topic·Knowledge·Action 자동 체이닝 | 오케스트레이션 길이 제한, 복잡한 흐름은 테스트 필요 |
| **Generative Answers** | Knowledge 소스 기반 동적 답변 생성, 요약 및 출처 제공 | 데이터 품질에 따라 정확도 좌우 |
| **Generative Builder** | 자연어로 Topic 생성 및 업데이트 | 생성된 대화 흐름에 대한 사람의 검증 필요 |
| **Computer Use** | 화면을 시각적으로 해석하여 데스크톱 작업 자동화 | 전용 머신 프로비저닝 필요 |
| **AI Prompts** | AI 모델에 직접 지침을 주어 맞춤형 응답 생성 | 모델에 따라 성능 차이 |
| **AI Approvals** | 사전 정의 기준에 따른 승인 요청 자동 결정 | 아직 발전 중인 기능 |

### 멀티 채널 배포

- 만들어진 Agent는 **Microsoft Teams, 웹사이트, 모바일 앱, Facebook Messenger, Slack, WhatsApp, SharePoint** 등 다양한 채널에 동시 배포가 가능합니다.
- Azure Bot Service가 지원하는 모든 채널에서 사용할 수 있습니다.

### 다국어 지원

- **영어 최적화**이며, 한국어를 포함한 다수 언어를 지원합니다.
- 에이전트 생성 UI는 영어이지만, **실제 동작은 한국어 인식/응답이 가능**합니다.
- 한국어 참조 자료(Knowledge)도 문제 없이 잘 동작합니다.

---

## Copilot Studio로는 한계가 있는 범위

Copilot Studio는 강력한 도구이지만, 모든 시나리오에 적합하지는 않습니다. 아래는 공식 문서와 실무 경험, 내부 고객 사례에서 확인된 한계들입니다.

### 복잡한 비즈니스 로직 처리

- 다단계 조건 분기, 복잡한 계산, 대규모 데이터 처리가 필요한 경우 Copilot Studio의 Topics 흐름만으로는 구현이 어렵습니다.
- 이 경우 **Power Automate** 또는 **Azure Functions** 등 외부 로직으로 분리해야 합니다.
- Generative Orchestration의 오케스트레이션 길이에도 제한이 있으므로, 지나치게 복잡한 체이닝은 안정성이 떨어질 수 있습니다.

### 실시간 양방향 데이터 동기화

- Copilot Studio는 기본적으로 **요청-응답(Request-Response)** 패턴으로 동작합니다.
- WebSocket 기반 실시간 동기화, 이벤트 스트리밍 등은 지원하지 않습니다.
- 안정적인 인터넷 연결과 구성된 데이터 소스에 대한 접근이 필수이며, 연결 장애나 외부 API 변경 시 워크플로우가 실패할 수 있습니다.

### 고도화된 UI/UX 커스터마이징

- 대화 인터페이스의 디자인, 레이아웃, 인터랙션을 세밀하게 제어해야 하는 경우 제한이 있습니다.
- **Adaptive Card 지원이 제한적**이며, 기본 텍스트 포맷팅을 넘어서는 커스텀 렌더링이 필요하면 별도 프론트엔드 개발이 필요합니다.
- API 호출, Action, 응답 포맷팅에 대한 세밀한 개발자 제어가 제한됩니다.

### 데이터 처리 제약

- 커넥터 응답의 **500KB 크기 제한**이 있어, 대용량 데이터는 요약/분할/외부 스토리지를 통해 처리해야 합니다.
- **Loop 파일을 Knowledge 소스로 직접 사용할 수 없습니다** (현재 Feature In Review 상태).
- 비정형 데이터(이미지, 복잡한 표 등)의 파싱 성능에는 한계가 있을 수 있습니다.

### 대규모 동시 사용자 처리

- 수만 명 동시 접속과 같은 대규모 트래픽 처리에는 별도의 아키텍처 설계가 필요합니다.
- 사용량 제한(Usage limits) 또는 용량 스로틀링(Capacity throttling)이 적용될 수 있습니다.

### 온프레미스 전용 환경

- Copilot Studio는 **클라우드 기반 SaaS 서비스**이므로, 완전한 온프레미스 환경에서의 운영은 불가합니다.
- On-Premises Data Gateway를 활용한 하이브리드 구성은 가능하나, 제약이 있습니다.

### 소스 제어 및 CI/CD

- Azure DevOps, GitHub 등의 **소스 제어 시스템에 대한 기본 지원이 없습니다**.
- Pull Request나 자동 배포 파이프라인이 기본 제공되지 않아, 대규모 개발팀에서의 협업에는 한계가 있습니다.
- 다만 Power Platform의 **Solution** 기능을 활용한 패키징과 환경 간 이관은 가능합니다.

### 기타 고려사항

- AI 생성 콘텐츠의 **편향(Bias), 고정관념, 비근거 정보** 가능성이 있으므로, 민감하거나 중요한 시나리오에서는 항상 응답을 검토해야 합니다.
- **Lockbox** 및 **Customer Managed Keys(CMK)**는 Agent Builder로 생성한 Agent에서는 아직 지원되지 않습니다.
- 일부 고급 기능은 **Agents Toolkit에서 먼저 제공**되고, Copilot Studio에는 이후에 반영될 수 있습니다.

<div class="info-box warning">
<strong>⚠️ 실무 경험에서 확인된 주의사항</strong>
<ul>
<li>Copilot Studio 테스트 창(Test Panel)에서의 테스트는 <strong>크레딧이 차감되지 않습니다</strong>. 하지만 게시(Publish) 후 실제 채널에서의 사용은 차감됩니다.</li>
<li>답변 정확도와 무관하게, <strong>에이전트가 동작하면 크레딧이 차감</strong>됩니다 (답변 실패 시에도).</li>
<li>커넥터가 DLP(Data Loss Prevention)에 의해 차단될 수 있으며, 이는 <strong>테넌트/환경 수준 정책</strong> 확인이 필요합니다.</li>
</ul>
</div>

---

## Copilot Studio ↔ 직접 개발(SI) 경계 기준

아래 표는 프로젝트 요구사항에 따라 Copilot Studio와 직접 개발(SI) 중 어느 쪽이 적합한지 판단할 수 있는 기준을 정리한 것입니다.

### 판단 기준표

| 판단 기준 | Copilot Studio 적합 | 직접 개발(SI) 적합 |
|---|---|---|
| **대화 복잡도** | 단순 FAQ, 안내, 정보 조회, 3단계 이하 분기 | 다단계 분기, 장기 맥락 유지, 복잡한 대화 흐름 |
| **데이터 소스** | SharePoint, 웹사이트, Dataverse, 표준 커넥터 | 사내 DB 직접 연동, 레거시 시스템, 대량 비정형 데이터 |
| **비즈니스 로직** | 간단한 조건 분기, Action 호출, Agent Flow | 복잡한 트랜잭션, 계산 로직, 다중 시스템 정합성 |
| **UI/UX 요구** | 기본 채팅 UI, Adaptive Card | 커스텀 대시보드, 시각화, 키오스크/네이티브 앱 |
| **배포 채널** | Teams, 웹, SharePoint, Slack (기본 제공) | 자체 앱, 키오스크, 임베디드 |
| **유지보수 주체** | 현업/시민개발자/IT CoE | 전문 개발팀 |
| **구축 기간** | 수 일 ~ 수 주 | 수 주 ~ 수 개월 |
| **인증/보안** | Entra ID 기본 연동 | 커스텀 인증, mTLS, SAML 등 |
| **소스 제어** | Solution Export/Import | Git, Azure DevOps CI/CD |
| **AI 엔진** | Copilot Studio 기본 제공 LLM | 자체 모델, 특화 RAG 파이프라인 |

### 실무 의사결정 프레임워크

```
요구사항 분석
  ├─ ① 70% 이상 Studio로 커버 가능?
  │    ├─ Yes → Copilot Studio 기본 + 나머지 PA/Azure 보완
  │    └─ No → ② 대화형 UI가 핵심인가?
  │         ├─ Yes → 혼합 구조 (Studio 프론트 + Azure 백엔드)
  │         └─ No → 직접 개발 (SI)
  │
  ├─ ③ 유지보수 주체가 현업인가?
  │    ├─ Yes → Copilot Studio 우선 (시민개발자 자율 운영)
  │    └─ No → 직접 개발 가능성 높음
  │
  └─ ④ 전사 확산 계획이 있는가?
       ├─ Yes → Studio (거버넌스, 채널 관리 내장)
       └─ No → 목적에 따라 선택
```

### 실제 기업 도입 사례에서의 판단 기준

실제 기업 고객(예: 대기업 CX센터)에서 Copilot Studio 도입을 검토할 때 결정적인 판단 기준은 다음과 같습니다:

| 판단 요소 | Copilot Studio 선택 근거 | 직접 개발(Foundry 등) 선택 근거 |
|---|---|---|
| **프론트엔드 관리** | Microsoft가 담당 → 관리 부담 최소 | 커스텀 UI 필요 → 직접 구현 |
| **채널 관리** | Teams, 웹 등 내장 배포 | 자체 앱/키오스크 |
| **전사 확산** | Entra ID 기반 접근 제어, 환경 관리 | 팀 단위 독립 운영 |
| **데이터 규모** | SharePoint/웹 기반 문서 참조 | 대용량 CSV, DB 직접 분석 |
| **유지보수 인력** | 현업 담당자가 직접 관리 | 전담 개발팀 필요 |

<div class="info-box tip">
<strong>💡 실무 팁</strong>
"어디까지 Copilot Studio로 할 수 있는가"는 기능의 존재 여부보다, <strong>유지보수 가능성</strong>과 <strong>확장 가능성</strong>을 기준으로 판단하는 것이 좋습니다. 70% 이상의 요구사항이 Studio로 커버된다면 Studio를 기본으로 택하되, 나머지 30%는 Power Automate나 Azure Functions로 보완하는 혼합 구조를 권장합니다.
</div>

<div class="info-box note">
<strong>📌 Copilot Studio의 포지셔닝</strong>
Copilot Studio는 <strong>소규모~중규모 배포</strong>(부서 수준 솔루션 등)에 적합하게 설계되었습니다. Power Platform과의 자연스러운 통합, 내장 거버넌스/배포 도구, 빌트인 테스트 Agent 등이 강점입니다. 전문 개발자에게는 <strong>Agents Toolkit</strong>(VS Code 기반)이 더 높은 유연성을 제공하며, 두 도구는 상호 보완 관계입니다. — <em>Microsoft Learn: Choose the right tool to build your declarative agent</em>
</div>
