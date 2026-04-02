---
layout: chapter
title: "Copilot Studio 화면 구성 이해"
short_title: "화면 구성 이해"
description: "Agent 개념과 Copilot Studio의 주요 메뉴 및 핵심 구성 요소(Topics, Generative Answers, Actions, Knowledge)를 알아봅니다."
order: 2
---

## Agent 개념

Copilot Studio에서 "Agent"는 **사용자와 대화하며 특정 업무를 수행하는 AI 기반 봇**을 의미합니다. 과거 "Copilot" 또는 "Bot"이라 불리던 단위가 현재는 "Agent"로 통일되었습니다.

### Agent의 핵심 속성

| 속성 | 설명 |
|---|---|
| **이름 / 아이콘** | Agent의 식별 정보. 사용자에게 노출됩니다. |
| **설명(Description)** | Agent의 역할과 용도를 기술합니다. |
| **지침(Instructions)** | Agent의 동작 방식을 자연어로 정의합니다. LLM이 이 지침을 참고하여 응답합니다. |
| **Knowledge** | Agent가 참고할 데이터 소스(SharePoint, 웹사이트, 파일 등)를 연결합니다. |
| **Topics** | 특정 의도(Intent)에 대한 대화 흐름을 정의합니다. |
| **Actions** | 외부 시스템 호출, 자동화 플로우 등을 연결합니다. |

<div class="info-box note">
<strong>📌 Agent = 대화 + 지식 + 행동</strong>
Agent는 단순한 챗봇이 아닙니다. <strong>지침(Instructions)</strong>으로 성격을 부여하고, <strong>Knowledge</strong>로 지식을 연결하며, <strong>Actions</strong>로 실제 업무를 수행할 수 있는 통합 단위입니다.
</div>

---

## 주요 메뉴 및 구성 요소

Copilot Studio에 접속하면 크게 다음과 같은 메뉴 구조로 되어 있습니다.

### 좌측 네비게이션

- **Agents**: 생성된 Agent 목록 확인 및 관리
- **환경 선택**: 상단에서 Power Platform 환경을 전환

### Agent 편집 화면 구조

Agent를 선택하면 아래와 같은 편집 탭이 제공됩니다.

| 탭 | 역할 |
|---|---|
| **Overview** | Agent 기본 정보, 지침(Instructions) 입력 |
| **Knowledge** | 데이터 소스 연결 (SharePoint, 웹사이트, 파일 등) |
| **Topics** | 대화 흐름 설계 (트리거 → 노드 기반 흐름) |
| **Actions** | 외부 연동 액션 (Power Automate, 커넥터, HTTP) |
| **Publish** | Agent 배포 (Teams, 웹 등) |
| **Analytics** | 사용 현황 및 성능 분석 |

---

## Topics

**Topics**는 Copilot Studio에서 **특정 사용자 의도(Intent)에 대한 대화 흐름**을 정의하는 핵심 단위입니다.

### Topic의 구성 요소

1. **트리거(Trigger)**: 사용자가 특정 문구를 입력하면 해당 Topic이 활성화됩니다.
   - 트리거 문구 예: "휴가 신청 방법", "비밀번호 초기화"
2. **노드(Node)**: Topic 내부의 처리 단계
   - **메시지 노드**: 사용자에게 텍스트/카드를 표시
   - **질문 노드**: 사용자에게 정보를 요청 (선택지, 텍스트 입력 등)
   - **조건 노드**: 조건 분기 처리
   - **Action 노드**: 외부 시스템 호출
   - **Topic 리다이렉트**: 다른 Topic으로 흐름 전환

### 시스템 Topic vs 사용자 Topic

| 구분 | 설명 |
|---|---|
| **시스템 Topic** | 기본 제공 (인사말, 에스컬레이션, 대화 종료 등). 수정 가능하나 삭제 불가. |
| **사용자 Topic** | 사용자가 직접 생성하는 커스텀 대화 흐름. |

<div class="info-box tip">
<strong>💡 실무 팁</strong>
모든 사용자 입력을 Topic으로 만들 필요는 없습니다. 정형화된 업무 처리(휴가 신청, IT 요청 등)만 Topic으로 설계하고, 나머지는 Generative Answers에 맡기는 것이 효율적입니다.
</div>

---

## Generative Answers

**Generative Answers**는 사전 정의된 Topic에 매칭되지 않는 사용자 질문에 대해, 연결된 **Knowledge 소스를 기반으로 LLM이 자동 생성한 답변**을 제공하는 기능입니다.

### 동작 방식

1. 사용자 질문 입력
2. Topic 매칭 시도 → 매칭 실패
3. Knowledge 소스에서 관련 정보 검색 (RAG 방식)
4. LLM이 검색된 정보를 바탕으로 답변 생성
5. 출처(Citation)와 함께 답변 제공

### 주요 설정

- **응답 생성 활성화/비활성화**: Agent 수준에서 Generative Answers on/off 가능
- **응답 범위 제한**: 특정 Knowledge 소스로 답변 범위를 제한 가능
- **응답 톤/스타일**: Instructions에서 자연어로 지시 가능

---

## Actions

**Actions**는 Agent가 **외부 시스템과 상호작용**하기 위한 기능입니다. 대화 중 특정 시점에 데이터를 조회하거나, 자동화 워크플로우를 실행할 수 있습니다.

### Action 유형

| 유형 | 설명 | 예시 |
|---|---|---|
| **Power Automate 플로우** | 기존 Power Automate 플로우를 호출 | 승인 요청, 이메일 발송 |
| **커넥터 액션** | 표준/커스텀 커넥터의 작업 호출 | SharePoint 목록 조회, Outlook 메일 발송 |
| **HTTP 요청** | 직접 REST API 호출 | 외부 ERP/CRM 데이터 조회 |
| **Copilot 커넥터** | Microsoft 365 Graph API 기반 조작 | 일정 조회, 파일 검색 |

### Action 흐름

```
사용자 질문 → Topic 트리거 → Action 호출 → 결과 수신 → 응답 생성
```

---

## Knowledge

**Knowledge**는 Agent가 **답변을 생성할 때 참고하는 데이터 소스**를 의미합니다. Generative Answers의 핵심 기반입니다.

### 지원 Knowledge 소스

| 소스 유형 | 설명 |
|---|---|
| **SharePoint 사이트** | SharePoint 사이트 또는 특정 문서 라이브러리 연결 |
| **웹사이트 URL** | 공개 웹사이트의 콘텐츠를 크롤링하여 참조 |
| **파일 업로드** | PDF, Word, Excel 등 파일을 직접 업로드 |
| **Dataverse** | Power Platform Dataverse 테이블 데이터 참조 |

### Knowledge 설정 시 고려사항

- **데이터 최신성**: SharePoint 연결은 자동 동기화되지만, 파일 업로드는 수동 갱신이 필요합니다.
- **데이터 양**: 너무 넓은 범위를 연결하면 응답 정확도가 떨어질 수 있습니다. 주제에 맞는 소스를 선별적으로 연결하세요.
- **보안**: 사용자의 Entra ID 권한에 따라 Knowledge 접근이 제어됩니다. 사용자가 접근 권한이 없는 문서는 응답에 포함되지 않습니다.

<div class="info-box warning">
<strong>⚠️ 주의</strong>
Knowledge로 연결한 데이터는 Agent의 응답 생성에만 사용되며, 원본 데이터가 외부로 유출되는 것은 아닙니다. 다만 사내 민감 정보가 포함된 사이트를 연결할 때는 <strong>사용자별 접근 권한</strong>이 올바르게 설정되어 있는지 반드시 확인하세요.
</div>
