---
layout: chapter
title: "참고 자료 및 확장 방향"
short_title: "참고 자료"
description: "Copilot Studio 공식 문서, Power Automate 연계 자료, 외부 시스템 연동 참고 자료, 향후 확장 아키텍처 방향을 정리합니다."
order: 8
icon: "📚"
category: guide
---

## 1. Copilot Studio 공식 문서

### 1.1 핵심 문서

| 문서 | 설명 | 링크 |
|---|---|---|
| **Copilot Studio 개요** | 제품 소개 및 기능 개요 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/fundamentals-what-is-copilot-studio) |
| **빠른 시작 가이드** | 첫 Agent 만들기 튜토리얼 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/fundamentals-get-started) |
| **AI 기능 탐색** | Generative Orchestration, Answers, Builder 등 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/guidance/ai-capabilities) |
| **Topics 설계** | Topic 생성 및 대화 흐름 설계 가이드 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-create-edit-topics) |
| **Knowledge 설정** | 데이터 소스 연결 및 관리 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-copilot-studio) |
| **Actions 구성** | 커넥터, 플로우, HTTP 연동 가이드 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-plugin-actions) |
| **변수 사용법** | Topic/Global/System 변수 가이드 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-variables) |
| **Generative Orchestration** | LLM 기반 자율 오케스트레이션 가이드 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-generative-actions) |
| **게시 및 배포** | 채널별 배포 방법 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/publication-fundamentals-publish-channels) |
| **분석 및 모니터링** | Analytics 활용법 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/analytics-overview) |
| **과금 및 라이선스** | Copilot Credits 과금 요율 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/requirements-messages-management) |
| **Quotas and limits** | 기능별 제한 사항 및 할당량 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/requirements-quotas) |
| **라이선스 가이드** | 라이선스 유형별 상세 정보 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/billing-licensing) |
| **Responsible AI FAQ** | 책임감 있는 AI 사용 관련 FAQ | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/responsible-ai-overview) |

### 1.2 거버넌스 및 보안

| 문서 | 링크 |
|---|---|
| **Copilot Studio 거버넌스 원칙** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/copilot-studio-experience#copilot-studio-governance-principles) |
| **DLP(Data Loss Prevention) 정책** | [Learn](https://learn.microsoft.com/ko-kr/power-platform/admin/wp-data-loss-prevention) |
| **인증 설정** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/configuration-end-user-authentication) |

### 1.3 개발자 도구

| 문서 | 링크 |
|---|---|
| **VS Code 확장** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/visual-studio-code-extension-overview) |
| **Power Fx 수식** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-power-fx) |
| **Agent usage estimator** | [Tool](https://microsoft.github.io/copilot-studio-estimator/) |

---

## 2. Power Automate 연계 문서

| 문서 | 링크 |
|---|---|
| **Power Automate 개요** | [Learn](https://learn.microsoft.com/ko-kr/power-automate/) |
| **Copilot Studio 연동 플로우** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-flow) |
| **커넥터 레퍼런스** | [Learn](https://learn.microsoft.com/ko-kr/connectors/connector-reference/) |
| **커스텀 커넥터 만들기** | [Learn](https://learn.microsoft.com/ko-kr/connectors/custom-connectors/) |

### 2.1 자주 사용하는 커넥터

| 커넥터 | 링크 |
|---|---|
| **Office 365 Outlook** | [Learn](https://learn.microsoft.com/ko-kr/connectors/office365/) |
| **Microsoft Teams** | [Learn](https://learn.microsoft.com/ko-kr/connectors/teams/) |
| **SharePoint** | [Learn](https://learn.microsoft.com/ko-kr/connectors/sharepointonline/) |
| **Dataverse** | [Learn](https://learn.microsoft.com/ko-kr/connectors/commondataserviceforapps/) |

---

## 3. 외부 시스템 연동 참고 자료

### 3.1 MCP (Model Context Protocol)

| 자료 | 설명 |
|---|---|
| **MCP 공식 사이트** | MCP 프로토콜 스펙 및 가이드 — [modelcontextprotocol.io](https://modelcontextprotocol.io) |
| **Copilot Studio MCP 연동** | Copilot Studio에서 MCP 서버를 도구로 연결하는 방법 |

### 3.2 도구 선택 비교

| 자료 | 링크 |
|---|---|
| **Copilot Studio vs Agent Builder vs Agents Toolkit** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/declarative-agent-tool-comparison) |
| **Copilot Studio vs M365 Copilot 선택 가이드** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/copilot-studio-experience) |
| **Agent Builder에서 Studio로 확장** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/copy-agent-to-copilot-studio) |

---

## 4. 향후 확장 시 아키텍처 방향

Copilot Studio를 기반으로 조직의 AI Agent 역량을 확장해 나갈 때의 단계별 아키텍처를 안내합니다.

### 4.1 Phase 1: 단일 Agent (초기 도입)

```
[사용자] → [Copilot Studio Agent]
                 ↓
         [Knowledge] + [Actions]
```

하나의 Agent가 특정 업무를 담당합니다. Knowledge + 표준 커넥터로 기본 기능을 구현합니다.

### 4.2 Phase 2: 다중 Agent + 자동화 (중기 확장)

```
[사용자] → [HR Agent] ← SharePoint (인사 정책)
         → [IT Agent] ← ServiceNow API
         → [Finance Agent] ← ERP 커넥터
                 ↓
         [Power Automate 자동화 플로우]
```

업무 도메인별 **전문 Agent**를 구축하고, Power Automate를 통한 크로스 시스템 자동화를 추가합니다.

### 4.3 Phase 3: 통합 오케스트레이션 (장기 전략)

```
[사용자] → [통합 Agent (라우터)]
                 ↓ (의도 분류)
         [HR Agent] [IT Agent] [Finance Agent]
                 ↓
         [MCP 서버] + [Azure Functions] + [Custom Engine]
                 ↓
         [사내 DB] [외부 API] [IoT 디바이스]
```

하나의 **통합 Agent가 사용자 의도를 판별**하고 전문 Agent에 라우팅합니다. MCP 프로토콜로 다양한 외부 도구를 유연하게 연결하고, 필요한 영역에만 Custom Engine Agent를 적용합니다.

### 4.4 확장 시 핵심 원칙

| 원칙 | 설명 |
|---|---|
| **점진적 확장** | 성공 사례를 기반으로 단계별 확장 |
| **도메인 분리** | Agent별 명확한 업무 도메인 정의 |
| **재사용 설계** | Knowledge, Action, 플로우를 재사용 가능한 단위로 설계 |
| **거버넌스 우선** | 확장 전에 관리 체계(소유권, 변경 관리, 모니터링)를 먼저 수립 |
| **보안 내재화** | 모든 연동 지점에서 최소 권한 원칙 + 인증 적용 |

<div class="info-box tip">
<b>💡 실무 팁 — 확장의 판단 기준</b><br>
아키텍처 확장은 <b>"기술적으로 가능한가"</b>보다 <b>"조직이 관리할 수 있는가"</b>를 기준으로 판단하세요. 10개의 Agent를 만들 수 있더라도, 유지보수할 인력과 프로세스가 없다면 오히려 혼란을 초래합니다. <b>관리 역량과 함께 성장</b>하는 것이 핵심입니다.
</div>

<div class="info-box note">
<b>📌 이 가이드에 대하여</b><br>
이 가이드는 Microsoft Copilot Studio를 활용한 Agent 구축의 <b>실무적 관점</b>에서 작성되었습니다. 제품의 기능은 지속적으로 업데이트되므로, 최신 정보는 <a href="https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/" target="_blank">공식 문서</a>를 함께 참고하시기 바랍니다. 2025 Release Wave 및 2026 Release Wave의 <a href="https://learn.microsoft.com/ko-kr/power-platform/release-plan/2025wave1/microsoft-copilot-studio/" target="_blank">새로운 기능 계획</a>도 확인해 보세요.
</div>
