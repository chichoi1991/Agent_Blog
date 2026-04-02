---
layout: chapter
title: "가이드의 전제"
short_title: "가이드의 전제"
description: "이 가이드가 전제하는 Copilot Studio의 가능 범위, 한계, 그리고 직접 개발(SI)과의 경계 기준을 정리합니다."
order: 0
---

## Copilot Studio로 가능한 범위

Microsoft Copilot Studio는 **로우코드(Low-Code) 기반의 Agent 빌더**로, 다음과 같은 시나리오를 코드 작성 없이 또는 최소한의 설정만으로 구현할 수 있습니다.

### 자연어 기반 대화형 Agent

- 사용자가 자연어로 질문하면, 사전 정의된 **Topics**(토픽) 또는 **Generative Answers**(생성형 응답)를 통해 답변을 제공합니다.
- FAQ 봇, 사내 가이드 봇, 고객 응대 봇 등 대화형 인터페이스에 적합합니다.

### 사내 데이터 기반 응답 (Knowledge)

- SharePoint, 웹사이트, 파일 업로드 등 다양한 소스를 **Knowledge**로 연결하면, Agent가 해당 데이터를 기반으로 생성형 응답을 제공합니다.
- 사내 문서, 정책, 매뉴얼 등을 빠르게 검색·요약해주는 Agent를 만들 수 있습니다.

### Power Platform 연계 자동화

- **Power Automate**와의 네이티브 연계를 통해 승인 요청, 이메일 발송, 데이터 기록 등의 자동화 워크플로우를 Agent에서 직접 실행할 수 있습니다.
- 표준 커넥터(Outlook, Teams, SharePoint, Dataverse 등)를 활용한 사내 시스템 연동이 가능합니다.

### 간단한 외부 API 연동

- HTTP 요청 기반으로 외부 REST API를 호출하거나, 커스텀 커넥터를 통해 사내·대외 시스템과 데이터를 주고받을 수 있습니다.

### 멀티 채널 배포

- 만들어진 Agent는 **Microsoft Teams, 웹사이트, 모바일 앱** 등 다양한 채널에 동시 배포가 가능합니다.

---

## Copilot Studio로는 한계가 있는 범위

Copilot Studio는 강력한 도구이지만, 모든 시나리오에 적합하지는 않습니다. 아래와 같은 요구사항은 Copilot Studio 단독으로 해결하기 어렵거나 불가능합니다.

### 복잡한 비즈니스 로직 처리

- 다단계 조건 분기, 복잡한 계산, 대규모 데이터 처리가 필요한 경우 Copilot Studio의 Topics 흐름만으로는 구현이 어렵습니다.
- 이 경우 **Power Automate** 또는 **Azure Functions** 등 외부 로직으로 분리해야 합니다.

### 실시간 양방향 데이터 동기화

- Copilot Studio는 기본적으로 **요청-응답(Request-Response)** 패턴으로 동작합니다.
- WebSocket 기반 실시간 동기화, 이벤트 스트리밍 등은 지원하지 않습니다.

### 고도화된 UI/UX 커스터마이징

- 대화 인터페이스의 디자인, 레이아웃, 인터랙션을 세밀하게 제어해야 하는 경우 제한이 있습니다.
- 기본 제공 Adaptive Card 외에 커스텀 렌더링이 필요하면 별도 프론트엔드 개발이 필요합니다.

### 대규모 동시 사용자 처리

- 수만 명 동시 접속과 같은 대규모 트래픽 처리에는 별도의 아키텍처 설계가 필요합니다.

### 온프레미스 전용 환경

- Copilot Studio는 **클라우드 기반 SaaS 서비스**이므로, 완전한 온프레미스 환경에서의 운영은 불가합니다.

---

## Copilot Studio ↔ 직접 개발(SI) 경계 기준

아래 표는 프로젝트 요구사항에 따라 Copilot Studio와 직접 개발(SI) 중 어느 쪽이 적합한지 판단할 수 있는 기준을 정리한 것입니다.

| 판단 기준 | Copilot Studio 적합 | 직접 개발(SI) 적합 |
|---|---|---|
| **대화 복잡도** | 단순 FAQ, 안내, 정보 조회 | 다단계 분기, 맥락 유지 필요 |
| **데이터 소스** | SharePoint, 웹사이트, 표준 커넥터 | 사내 DB 직접 연동, 레거시 시스템 |
| **비즈니스 로직** | 간단한 조건 분기, Action 호출 | 복잡한 트랜잭션, 계산 로직 |
| **UI/UX 요구** | 기본 채팅 UI, Adaptive Card | 커스텀 대시보드, 시각화 |
| **배포 채널** | Teams, 웹 (기본 제공) | 자체 앱, 키오스크, 임베디드 |
| **유지보수 주체** | 현업/시민개발자 | 전문 개발팀 |
| **구축 기간** | 수 일 ~ 수 주 | 수 주 ~ 수 개월 |
| **인증/보안** | Entra ID 기본 연동 | 커스텀 인증, mTLS 등 |

<div class="info-box tip">
<strong>💡 실무 팁</strong>
"어디까지 Copilot Studio로 할 수 있는가"는 기능의 존재 여부보다, <strong>유지보수 가능성</strong>과 <strong>확장 가능성</strong>을 기준으로 판단하는 것이 좋습니다. 70% 이상의 요구사항이 Studio로 커버된다면 Studio를 기본으로 택하되, 나머지 30%는 Power Automate나 Azure Functions로 보완하는 혼합 구조를 권장합니다.
</div>
