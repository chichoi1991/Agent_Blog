---
layout: chapter
title: "외부(사내/대외) 시스템 연동 방식"
short_title: "외부 시스템 연동"
description: "Power Automate 연계, 표준 커넥터 활용, HTTP 기반 API 연동, 인증 방식 등 외부 시스템 연동 전략을 실무 관점에서 다룹니다."
order: 4
icon: "🔗"
category: guide
---

## Power Automate 연계

Power Automate는 Copilot Studio와 **가장 자연스럽게 통합**되는 자동화 도구입니다. 복잡한 비즈니스 로직, 다단계 승인, 외부 시스템 호출 등 Agent 단독으로 처리하기 어려운 작업을 분리할 수 있습니다.

> 📖 **참조**: [Call Power Automate flows](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-flow) · [Agent flows overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview)

### 커넥터 직접 호출 vs Power Automate 플로우

| 구분 | 커넥터 직접 호출 | Power Automate 플로우 |
|---|---|---|
| **복잡도** | 단일 작업 (1개 API 호출) | 다단계 처리 (조건, 루프, 병렬) |
| **오류 처리** | 기본 제공 | Try-Catch 등 세밀한 제어 |
| **응답 속도** | 수~수십 ms | 수백 ms~수 초 |
| **적합 시나리오** | 메일 발송, 메시지 전송, 단순 조회 | 승인 워크플로우, 데이터 집계, 다중 시스템 연동 |

### Power Automate 연결 시 핵심 주의사항

| 주의사항 | 설명 |
|---|---|
| **100초 제한** | Agent → Flow 실행은 100초 내에 결과를 반환해야 합니다. 초과 시 Timeout |
| **같은 환경 필수** | Agent와 Flow는 **동일한 Power Platform 환경**에 있어야 연결 가능 |
| **트리거** | Flow 생성 시 반드시 **"Run a flow from Copilot"** 트리거 사용 |
| **Solution 포함** | 관리형 배포를 위해 Flow를 Solution에 포함 |
| **과금 레일 변경** | Copilot Studio Plan으로 변환 시 **PA 라이선스로 되돌릴 수 없음** (Ch1 참조) |

<div class="info-box tip">
<strong>💡 실무 팁 — Flow 최적화</strong>
<ul>
<li><strong>불필요한 Flow 호출을 제거</strong>하세요. 커넥터만으로 충분한 작업은 Copilot Studio에서 직접 호출하는 것이 빠릅니다.</li>
<li>외부 API를 순차적으로 호출해야 한다면 <strong>병렬(Parallel) 분기</strong>를 활용하여 응답 시간을 단축하세요.</li>
<li>판단/분기 로직은 <strong>Agent(Topic/LLM)</strong>에서 처리하고, Flow는 <strong>실행 + 결과 반환</strong>만 담당하세요.</li>
</ul>
</div>

---

## 표준 커넥터 활용

Copilot Studio는 **1,000개 이상의 표준/프리미엄 커넥터**를 지원합니다.

### 자주 사용하는 커넥터

| 커넥터 | 주요 작업 | 활용 시나리오 | 참조 |
|---|---|---|---|
| **Office 365 Outlook** | 이메일 발송, 일정 조회 | 알림 메일, 회의 안내 | [Learn](https://learn.microsoft.com/en-us/connectors/office365/) |
| **Microsoft Teams** | 채널 메시지 전송, 멤버 조회 | 팀 알림, 공지 전달 | [Learn](https://learn.microsoft.com/en-us/connectors/teams/) |
| **SharePoint** | 목록 항목 CRUD, 파일 조회 | 데이터 조회, 요청 등록 | [Learn](https://learn.microsoft.com/en-us/connectors/sharepointonline/) |
| **Dataverse** | 테이블 레코드 CRUD | 사내 데이터 관리 | [Learn](https://learn.microsoft.com/en-us/connectors/commondataserviceforapps/) |
| **HTTP** | REST API 직접 호출 | 외부 시스템 연동 | [Learn](https://learn.microsoft.com/en-us/connectors/webcontents/) |

> 📖 **참조**: [Connector reference (전체 목록)](https://learn.microsoft.com/en-us/connectors/connector-reference/)

---

## HTTP 기반 API 연동

표준 커넥터가 없는 시스템과 연동하려면 **커스텀 커넥터** 또는 **HTTP 직접 호출**을 활용합니다.

### 언제 어떤 방식을 선택할까?

| 방식 | 적합한 경우 |
|---|---|
| **HTTP 직접 호출** | 단순 REST 호출, Latency 민감(검색/조회), PoC·파일럿 단계 |
| **커스텀 커넥터** | 반복 호출, 다수 Agent에서 공통 사용, 인증(OAuth/Entra ID) 표준화 필요 |

> 📖 **참조**: [Custom connectors overview](https://learn.microsoft.com/en-us/connectors/custom-connectors/) · [Custom connectors FAQ](https://learn.microsoft.com/en-us/connectors/custom-connectors/faq)

### MCP (Model Context Protocol) 연동

Copilot Studio는 **MCP 프로토콜**을 통해 외부 서비스를 도구(Tool)로 연결할 수 있습니다.

1. **Actions 탭** → **Add an action** → **MCP Server** 선택
2. MCP 서버 URL 입력 (예: `https://my-mcp-server.azurewebsites.net/sse`)
3. 인증 정보 설정 (API Key 등)
4. 사용 가능한 도구 목록이 자동 로드됨

---

## 인증 방식 개요

외부 시스템 연동 시 **인증(Authentication)** 설정이 핵심입니다.

### 인증 방식별 비교

| 인증 방식 | 설명 | 적합 시나리오 | 보안 수준 |
|---|---|---|---|
| **인증 없음** | 테스트용 only | 내부 PoC | ❌ |
| **API Key** | 고정 키를 헤더에 포함 | 공공 API, 내부 마이크로서비스 | ⚠️ |
| **OAuth 2.0** | 토큰 기반 인증 | ServiceNow, Salesforce 등 SaaS | ✅ |
| **Entra ID** | Microsoft 조직 인증 | M365 서비스, 사내 Azure 리소스 | ✅✅ |

> 📖 **참조**: [Configure end-user authentication](https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication)

### Copilot Studio에서의 인증 설정

| 설정 | 설명 | 사용 시나리오 |
|---|---|---|
| **최종 사용자 인증 (End User)** | Agent 사용자 본인의 계정으로 인증 | 개인별 메일/일정, 본인 권한 내 데이터 |
| **작성자 제공 인증 (Connection Creator)** | Agent 작성자(관리자)의 계정으로 인증 | 공용 API 호출, 서비스 계정 |

<div class="info-box warning">
<strong>⚠️ 인증 관련 보안 가이드</strong>
<ul>
<li><strong>API Key 하드코딩은 금지</strong>입니다. 환경 변수나 Azure Key Vault를 활용하세요.</li>
<li><strong>Anonymous 인증은 기본적으로 금지</strong>입니다. 테스트 환경에서만 사용하세요.</li>
<li>작성자 제공 인증 사용 시 <strong>최소 권한 원칙</strong>을 적용하고, 전용 서비스 계정을 사용하세요.</li>
</ul>
</div>

<div class="info-box note">
<strong>📌 다음 챕터 미리보기</strong>
이번 챕터에서 외부 시스템 연동 방법을 익혔습니다. 다음 <strong>Chapter 5</strong>에서는 "Copilot Studio로 충분한가, 직접 개발이 필요한가?"를 판단하는 선택 가이드를 다룹니다.
</div>
