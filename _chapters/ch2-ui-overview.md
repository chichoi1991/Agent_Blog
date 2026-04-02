---
layout: chapter
title: "Copilot Studio 화면 구성 이해"
short_title: "화면 구성 이해"
description: "Agent 개념과 Copilot Studio의 주요 메뉴 및 핵심 구성 요소(Topics, Generative Answers, Actions, Knowledge)를 심층적으로 알아봅니다."
order: 2
---

## Agent 개념

Copilot Studio에서 "Agent"는 **사용자와 대화하며 특정 업무를 수행하는 AI 기반 봇**을 의미합니다. 과거 "Copilot" 또는 "Bot"이라 불리던 단위가 현재는 "Agent"로 통일되었습니다.

Agent는 문제 해결을 위해 **복잡한 대화를 처리**하고, 지침(Instructions)과 컨텍스트를 기반으로 **최적의 행동을 자율적으로 결정**할 수 있습니다. 언어 모델, 지침, 컨텍스트, Knowledge, Topics, 도구(Tools), 입력, 트리거를 조합하여 목표를 달성합니다.

### Agent의 핵심 속성

| 속성 | 설명 | 설정 위치 |
|---|---|---|
| **이름 / 아이콘** | Agent의 식별 정보. 사용자에게 노출됩니다. | Overview 탭 |
| **설명(Description)** | Agent의 역할과 용도를 기술합니다. | Overview 탭 |
| **지침(Instructions)** | Agent의 동작 방식을 자연어로 정의합니다. LLM이 이 지침을 참고하여 응답합니다. | Overview 탭 |
| **Knowledge** | Agent가 참고할 데이터 소스를 연결합니다. | Knowledge 탭 |
| **Topics** | 특정 의도(Intent)에 대한 대화 흐름을 정의합니다. | Topics 탭 |
| **Actions** | 외부 시스템 호출, 자동화 플로우 등을 연결합니다. | Actions 탭 |
| **AI 모델** | Agent가 사용할 기본 LLM 모델을 선택합니다. | Settings > Generative AI |

<div class="info-box note">
<strong>📌 Agent = 대화 + 지식 + 행동</strong>
Agent는 단순한 챗봇이 아닙니다. <strong>지침(Instructions)</strong>으로 성격을 부여하고, <strong>Knowledge</strong>로 지식을 연결하며, <strong>Actions</strong>로 실제 업무를 수행할 수 있는 통합 단위입니다. 이전 대화의 <strong>컨텍스트를 유지</strong>하여 일관된 응답을 제공하고, 다단계 워크플로우를 계획하며 변화하는 입력에 따라 행동을 조정할 수 있습니다.
</div>

### Agent의 두 가지 동작 모드

#### 대화형 상호작용 (Conversational)
- 사용자의 질문에 답변하고, 가이드를 제공하는 **실시간 대화** 방식
- 입력: 사용자의 텍스트 프롬프트
- 출력: 텍스트 응답, Adaptive Card 등

#### 자동화 작업 (Autonomous)
- 이벤트(새 레코드 생성, 폼 제출 등)에 **자동으로 반응**하여 작업 수행
- 레코드 업데이트, 알림 발송, 워크플로우 트리거 등
- 입력: 시스템 이벤트, 트리거
- 출력: 자동화된 액션 실행

---

## 주요 메뉴 및 구성 요소

Copilot Studio에 접속하면 크게 다음과 같은 메뉴 구조로 되어 있습니다.

### 좌측 네비게이션

| 메뉴 | 설명 |
|---|---|
| **Agents** | 생성된 Agent 목록 확인 및 관리 |
| **환경 선택** | 상단에서 Power Platform 환경을 전환 (Dev / Test / Prod) |

### Agent 편집 화면 구조

Agent를 선택하면 아래와 같은 편집 탭이 제공됩니다.

| 탭 | 역할 | 핵심 기능 |
|---|---|---|
| **Overview** | Agent 기본 정보 | 이름, 설명, 지침(Instructions), AI 모델 선택 |
| **Knowledge** | 데이터 소스 연결 | SharePoint, 웹사이트, 파일, Dataverse 연결 |
| **Topics** | 대화 흐름 설계 | 트리거 → 노드 기반 흐름, 시스템/사용자 Topic |
| **Actions** | 외부 연동 액션 | Power Automate, 커넥터, HTTP, MCP, Copilot 커넥터 |
| **Publish** | Agent 배포 | 게시, Teams/웹/기타 채널 배포, 공유 설정 |
| **Analytics** | 사용 현황 분석 | 세션 수, 해결률, 에스컬레이션, CSAT, Knowledge 소스별 성능 |

### 오케스트레이션 모드 설정

Agent의 핵심 동작 방식을 결정하는 설정이 **Settings > Generative AI**에 있습니다.

| 모드 | 설명 | 적합 시나리오 |
|---|---|---|
| **Classic** | 전통적인 NLU 기반 의도 매칭 | 정형화된 대화, 예측 가능한 흐름 |
| **Generative** | LLM 기반 자율 오케스트레이션 | 유연한 대화, 다중 의도, 자동 도구 선택 |

**Generative 모드**에서는 Agent가 런타임에 **자율적으로 최적의 Topic, Action, Knowledge를 선택**하여 응답합니다. 트리거 문구에 의존하지 않고, Agent의 지침과 사용 가능한 도구의 설명을 기반으로 판단합니다.

---

## Topics

**Topics**는 Copilot Studio에서 **특정 사용자 의도(Intent)에 대한 대화 흐름**을 정의하는 핵심 단위입니다.

### Topic의 생성 방식

Copilot Studio에서 Topic을 만드는 방법은 크게 세 가지입니다.

| 방식 | 설명 | 적합 대상 |
|---|---|---|
| **수동 생성** | 빈 Topic에서 노드를 하나씩 추가 | 세밀한 제어 필요 시 |
| **자연어 생성 (Generative Builder)** | "이런 Topic을 만들어줘"라고 설명하면 AI가 생성 | 빠른 프로토타이핑 |
| **기존 Topic 수정** | Copilot 도움으로 기존 Topic을 자연어로 수정 | 반복 개선 |

### Topic의 구성 요소

1. **트리거(Trigger)**: 사용자가 특정 문구를 입력하면 해당 Topic이 활성화됩니다.
   - 트리거 문구 예: "휴가 신청 방법", "비밀번호 초기화"
   - Generative 모드에서는 트리거 문구 대신 **Topic의 이름과 설명**을 기반으로 LLM이 자동 매칭
2. **노드(Node)**: Topic 내부의 처리 단계

| 노드 유형 | 설명 | 활용 예시 |
|---|---|---|
| **메시지 노드** | 사용자에게 텍스트/카드를 표시 | 안내 메시지, 결과 출력 |
| **질문 노드** | 사용자에게 정보를 요청 | 이름, 유형, 날짜 입력 |
| **조건 노드** | 조건 분기 처리 (if/else) | 유형별 다른 처리 |
| **Action 노드** | 외부 시스템 호출 | API 호출, 이메일 발송 |
| **Topic 리다이렉트** | 다른 Topic으로 흐름 전환 | 모듈화된 대화 구조 |
| **Generative Answers 노드** | Knowledge 기반 AI 답변 생성 | 특정 소스에서 동적 응답 |
| **변수 관리 노드** | 변수 설정/초기화 | 전역 변수 세팅, 데이터 전달 |

### 시스템 Topic vs 사용자 Topic

| 구분 | 설명 | 예시 |
|---|---|---|
| **시스템 Topic** | 기본 제공. 수정 가능하나 삭제 불가. | Greeting, Escalation, End of Conversation, Conversational Boosting, Fallback |
| **사용자 Topic** | 사용자가 직접 생성하는 커스텀 대화 흐름. | 휴가 신청, IT 요청, 제품 문의 |

### Conversational Boosting 시스템 Topic

Agent를 생성하면 자동으로 **Conversational Boosting** 시스템 Topic이 만들어집니다. 이 Topic에는 **Generative Answers 노드**가 포함되어 있어, 별도 설정 없이도 Knowledge 소스를 기반으로 바로 답변을 시작할 수 있습니다.

```
사용자 질문 → Topic 매칭 시도
  ├─ 매칭 성공 → 해당 Topic 실행
  └─ 매칭 실패 → Conversational Boosting Topic
       → Generative Answers 노드 (Knowledge 기반 답변)
            ├─ 답변 생성 성공 → 출처와 함께 응답
            └─ 생성 실패 → Fallback Topic (에스컬레이션/안내)
```

### YAML 기반 Topic 편집

Copilot Studio는 **Fusion Team** 지원을 위해 GUI와 **YAML 코드 편집**을 동시에 제공합니다. GUI에서 설계한 대화 흐름을 코드 뷰(YAML)로 전환하여 직접 편집할 수 있으며, 실시간으로 양방향 반영됩니다.

<div class="info-box tip">
<strong>💡 실무 팁</strong>
모든 사용자 입력을 Topic으로 만들 필요는 없습니다. 정형화된 업무 처리(휴가 신청, IT 요청 등)만 Topic으로 설계하고, 나머지는 Generative Answers에 맡기는 것이 효율적입니다. Topic의 <strong>이름과 설명을 구체적으로 작성</strong>하면, Generative Orchestration 모드에서 LLM이 더 정확하게 Topic을 선택합니다.
</div>

---

## Generative Answers

**Generative Answers**는 사전 정의된 Topic에 매칭되지 않는 사용자 질문에 대해, 연결된 **Knowledge 소스를 기반으로 LLM이 자동 생성한 답변**을 제공하는 기능입니다.

### 동작 방식 (상세)

```
1. 사용자 질문 입력
2. Topic 매칭 시도 → 매칭 실패
3. Generative Answers 노드 실행
4. Knowledge 소스에서 관련 문서/정보 검색 (벡터 검색, 시맨틱 검색)
5. 검색 결과를 LLM에 전달 (RAG 패턴)
6. LLM이 컨텍스트에 맞는 자연스러운 답변 생성
7. 결과 검증 및 콘텐츠 안전성 확인
8. 출처(Citation)와 함께 답변 제공
```

### Generative Answers 배치 위치

Generative Answers 노드는 **여러 위치에 배치**할 수 있습니다.

| 배치 위치 | 설명 | 사용 시나리오 |
|---|---|---|
| **Conversational Boosting Topic** (기본) | Topic 매칭 실패 시 자동 실행 | 일반적인 FAQ, 문서 기반 Q&A |
| **특정 Topic 내** | Topic 흐름 중간에 삽입 | 특정 맥락에서 추가 정보 제공 |
| **Fallback 이전** | 에스컬레이션 전 마지막 시도 | 미해결 질문 최소화 |

### 주요 설정

| 설정 | 설명 |
|---|---|
| **응답 생성 활성화/비활성화** | Agent 수준에서 Generative Answers on/off 가능 |
| **응답 범위 제한** | 특정 Knowledge 소스로 답변 범위를 제한 가능 ("Search only selected sources") |
| **일반 지식 사용** | Use general knowledge 토글로 Knowledge 외 일반 정보 활용 여부 결정 |
| **응답 톤/스타일** | Instructions에서 자연어로 지시 가능 |
| **콘텐츠 모더레이션** | 응답의 엄격도 수준 설정 (높음/보통/낮음) |

### Analytics 활용

Generative Answers의 성능을 지속적으로 개선하기 위해, Analytics 탭에서 다음 지표를 확인할 수 있습니다.

- **생성형 답변 비율 및 품질**: 전체 응답 중 Generative Answers 비율과 사용자 만족도
- **Knowledge 소스별 사용량**: 어떤 소스가 가장 많이 참조되는지 분석
- **테마별 드릴다운**: 사용자 질문을 주제별로 분류하여 Knowledge 소스 성능 확인

---

## Actions

**Actions**는 Agent가 **외부 시스템과 상호작용**하기 위한 기능입니다. 대화 중 특정 시점에 데이터를 조회하거나, 자동화 워크플로우를 실행할 수 있습니다.

### Action 유형 (상세)

| 유형 | 설명 | 예시 | 특징 |
|---|---|---|---|
| **Power Automate 플로우** | 기존 Power Automate 플로우 호출 | 승인 요청, 이메일 발송, 데이터 기록 | 다단계 로직, Try-Catch 지원 |
| **커넥터 액션** | 표준/커스텀 커넥터의 작업 호출 | SharePoint 목록 조회, Outlook 메일 | 설정만으로 즉시 사용 |
| **HTTP 요청** | 직접 REST API 호출 | 외부 ERP/CRM 데이터 조회 | 커스텀 커넥터 생성 필요 |
| **MCP 서버** | Model Context Protocol 서버 연결 | 자체 MCP 서버의 도구 호출 | 유연한 외부 도구 연동 |
| **Copilot 커넥터** | Microsoft 365 Graph API 기반 | 일정 조회, 파일 검색, 메일 관리 | M365 데이터 범위 |
| **AI Prompt** | AI 모델에 맞춤형 프롬프트 실행 | HTML 카드 생성, 데이터 요약, 분석 보고서 | JSON 출력, 코드 인터프리터 지원 |

### Classic vs Generative Action 실행 방식

| 방식 | Classic 모드 | Generative 모드 |
|---|---|---|
| **Action 호출 시점** | Topic 내 Action 노드에서 명시적 호출 | LLM이 자율적으로 판단하여 호출 |
| **매개변수 수집** | 질문 노드로 사전 수집 | 부족한 정보만 사용자에게 질의 |
| **체이닝** | 수동 흐름 설계 필요 | 자동 체이닝 (여러 Action 순차 실행) |
| **결과 처리** | 변수에 저장 후 수동 활용 | 자동 요약하여 응답에 반영 |

### Action 흐름

**Classic 모드:**
```
사용자 질문 → Topic 트리거 → 질문 노드 (정보 수집) → Action 호출 → 결과 수신 → 메시지 노드
```

**Generative 모드:**
```
사용자 질문 → LLM이 의도 파악 → 적절한 Action 자동 선택 → 부족한 정보 질의 → Action 실행 → 결과 요약 응답
```

### AI Prompt (고급 Action)

**AI Prompt**는 Agent 내에서 AI 모델에게 **특정 지침을 주어 맞춤형 응답을 생성**하는 도구입니다. Generative Orchestration과 달리, **프롬프트의 톤, 제약, 예시, 출력 형식(JSON 등)**을 개발자가 완전히 제어할 수 있습니다.

| 기능 | 설명 |
|---|---|
| **입력 변수** | 대화 컨텍스트에서 값을 받아 프롬프트에 동적 삽입 |
| **모델 선택** | Microsoft Foundry 모델, Azure OpenAI 등 다양한 모델 사용 |
| **Dataverse Grounding** | Dataverse 데이터를 프롬프트 컨텍스트에 자동 포함 |
| **코드 인터프리터** | Python 코드 실행으로 데이터 분석, 차트 생성 |
| **구조화된 출력** | JSON, HTML 등 특정 형식으로 응답 생성 |

---

## Knowledge

**Knowledge**는 Agent가 **답변을 생성할 때 참고하는 데이터 소스**를 의미합니다. Generative Answers의 핵심 기반이며, Agent의 전문성과 정확도를 결정합니다.

### 지원 Knowledge 소스 (상세)

| 소스 유형 | 설명 | 연결 방식 | 동기화 |
|---|---|---|---|
| **SharePoint 사이트** | 사이트 또는 특정 문서 라이브러리 | URL 입력 (Shift+Enter로 복수 입력) | 자동 |
| **OneDrive** | 개인/공유 OneDrive 파일 | 파일/폴더 선택 | 자동 |
| **웹사이트 URL** | 공개 웹사이트 콘텐츠 크롤링 | URL 입력 | 주기적 |
| **파일 업로드** | PDF, Word, Excel, PPT 등 | 직접 업로드 | 수동 갱신 |
| **Dataverse** | Power Platform 테이블 데이터 | 테이블 선택 | 실시간 |

### Knowledge 소스 설정 모범 사례

1. **설명(Description)을 상세히 작성**: Generative Orchestration 모드에서 LLM이 어떤 Knowledge 소스를 참조할지 판단하는 데 설명이 핵심 역할을 합니다.
2. **범위를 적절히 제한**: 너무 넓은 범위를 연결하면 응답 정확도가 떨어집니다. 주제에 맞는 소스를 선별적으로 연결하세요.
3. **데이터 최신성 확인**: SharePoint 연결은 자동 동기화되지만, 파일 업로드는 수동 갱신이 필요합니다.
4. **접근 권한 확인**: SharePoint Knowledge에서 사용자 접근 권한은 **원본 데이터 권한을 그대로 상속**합니다.

### Knowledge 소스별 특성

| 특성 | SharePoint | 웹사이트 | 파일 업로드 | Dataverse |
|---|---|---|---|---|
| **권한 상속** | ✅ Entra ID 기반 | ❌ (공개) | ❌ (Agent 접근자 전체) | ✅ Dataverse 보안 |
| **자동 동기화** | ✅ | ⚠️ 주기적 | ❌ 수동 | ✅ |
| **파일 형식** | 다양 | HTML | PDF, DOCX, XLSX 등 | 테이블 데이터 |
| **용량 제한** | 사이트 제한 참고 | URL 수 제한 | 파일 크기 제한 | 테이블 크기 |

<div class="info-box warning">
<strong>⚠️ 주의</strong>
<ul>
<li>Knowledge로 연결한 데이터는 Agent의 응답 생성에만 사용되며, 원본 데이터가 외부로 유출되는 것은 아닙니다.</li>
<li>사내 민감 정보가 포함된 사이트를 연결할 때는 <strong>사용자별 접근 권한</strong>이 올바르게 설정되어 있는지 반드시 확인하세요.</li>
<li>현재 <strong>Loop 파일은 Knowledge 소스로 직접 사용할 수 없습니다</strong> (Feature In Review 상태).</li>
<li>Word 문서는 <strong>탐색 구조(목차, 제목 구분)</strong>가 잘 정리된 문서가 더 좋은 검색 결과를 제공합니다.</li>
<li>PPT는 <strong>마스터 레이아웃이 정리</strong>된 파일이 파싱 정확도가 높습니다.</li>
</ul>
</div>

---

## Responsible AI 및 보안

Copilot Studio의 모든 생성형 AI 기능은 **Microsoft의 Responsible AI 표준**에 따라 운영됩니다.

| 영역 | 조치 |
|---|---|
| **응답 검증** | 가능한 경우 Data Grounding으로 응답을 검증하여 환각(Hallucination) 감소 |
| **콘텐츠 모더레이션** | 유해하거나 규정 위반 콘텐츠를 자동 필터링 |
| **데이터 보호** | 대화 데이터는 운영 지원 목적으로만 임시 저장, Customer Lockbox로 접근 제어 |
| **모델 훈련 미사용** | 고객 데이터를 모델 훈련에 사용하지 않음 |
| **지역 데이터 이동** | 환경 설정으로 리전 간 데이터 이동이 필요한 기능을 비활성화 가능 |
