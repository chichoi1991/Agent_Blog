---
layout: chapter
title: "Copilot Studio 개요 및 접속"
short_title: "개요 및 접속"
description: "Copilot Studio에 접속하는 방법, 필요한 라이선스, 그리고 유사 서비스와의 차이를 설명합니다."
order: 1
---

## Copilot Studio URL

Copilot Studio는 웹 브라우저에서 직접 접속할 수 있는 클라우드 서비스입니다.

| 항목 | 내용 |
|---|---|
| **접속 URL** | [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com) |
| **지원 브라우저** | Microsoft Edge, Google Chrome (최신 버전 권장) |
| **로그인 계정** | 조직의 Microsoft 365 / Entra ID 계정 |

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

### 권한 구조

- **환경(Environment)**: Copilot Studio는 Power Platform 환경 위에서 동작합니다. 환경별로 Agent를 생성·관리합니다.
- **역할(Role)**:
  - **환경 관리자**: 환경 설정, 사용자 관리, Agent 배포 권한
  - **환경 작성자(Maker)**: Agent 생성 및 편집 권한
  - **사용자**: 배포된 Agent 이용

<div class="info-box warning">
<strong>⚠️ 주의</strong>
평가판은 기능 제한 없이 사용할 수 있지만, 60일 종료 후 자동으로 비활성화됩니다. 운영 환경에서의 사용은 정식 라이선스를 확보한 후 진행하세요.
</div>

---

## Copilot Chat / App Builder / Copilot Studio 차이

Microsoft는 다양한 AI/자동화 도구를 제공하고 있어, 각 도구의 역할과 차이를 이해하는 것이 중요합니다.

| 구분 | Copilot Chat (BizChat) | App Builder | Copilot Studio |
|---|---|---|---|
| **목적** | 일상 업무 보조 (검색, 요약, 작성) | 데이터 기반 업무 앱 빌드 | 대화형 Agent 구축 |
| **사용자** | 최종 사용자 (직원) | 시민 개발자 / 현업 | 시민 개발자 / 개발자 |
| **인터페이스** | 채팅 (M365 앱 내 통합) | 앱 화면 (폼, 테이블) | 대화 흐름 디자이너 |
| **주요 기능** | 문서 요약, 이메일 작성, 질의응답 | CRUD 앱 빌드, 워크플로우 | 토픽 설계, Knowledge, Action |
| **데이터 연결** | M365 Graph 기반 | Dataverse, SharePoint 등 | 다양한 커넥터 + API |
| **커스터마이징** | 제한적 (프롬프트 수준) | 앱 레벨 커스터마이징 | Agent 로직 전체 제어 |
| **배포 대상** | M365 앱 내 자동 통합 | Teams, 웹 등 | Teams, 웹, 커스텀 채널 |

### 언제 어떤 도구를 선택할까?

- **"직원들이 문서를 빠르게 찾고 요약했으면 좋겠다"** → **Copilot Chat**
- **"현업에서 간단한 데이터 관리 앱이 필요하다"** → **App Builder**
- **"사용자와 자연어로 대화하며 업무를 처리하는 Agent가 필요하다"** → **Copilot Studio**

<div class="info-box tip">
<strong>💡 실무 팁</strong>
이 세 가지 도구는 경쟁 관계가 아니라 <strong>보완 관계</strong>입니다. 예를 들어, Copilot Studio로 만든 Agent가 내부적으로 Power Automate 흐름을 호출하고, 그 결과를 Copilot Chat에서 활용하는 등의 통합 구성이 가능합니다.
</div>
