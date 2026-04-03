---
layout: chapter
title: "Copilot Studio 화면 구성 이해"
short_title: "화면 구성 이해"
description: "Agent 개념과 Copilot Studio의 주요 메뉴 및 핵심 구성 요소(Topics, Generative Answers, Actions, Knowledge)를 실무 관점에서 알아봅니다."
order: 2
icon: "🖥️"
category: guide
---

## 1. Agent란 무엇인가

Copilot Studio에서 "Agent"는 **사용자와 대화하며 특정 업무를 수행하는 AI 기반 봇**입니다. 과거 "Copilot" 또는 "Bot"이라 불리던 단위가 현재는 "Agent"로 통일되었습니다.

Agent는 단순히 질문에 답변하는 것을 넘어, **지침(Instructions)과 컨텍스트를 기반으로 최적의 행동을 자율적으로 결정**할 수 있습니다. 언어 모델, 지침, Knowledge, Topics, 도구(Tools), 트리거를 조합하여 목표를 달성합니다.

> 📖 **참조**: [What is an agent?](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/fundamentals-what-is-copilot-studio#what-is-an-agent)

### 1.1 Agent의 핵심 속성

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
<b>📌 Agent = 대화 + 지식 + 행동</b><br>
Agent는 단순한 챗봇이 아닙니다. <b>지침(Instructions)</b>으로 성격을 부여하고, <b>Knowledge</b>로 지식을 연결하며, <b>Actions</b>로 실제 업무를 수행할 수 있는 통합 단위입니다.
</div>

### 1.2 Agent의 두 가지 동작 모드

| 모드 | 설명 | 입출력 |
|---|---|---|
| **대화형 (Conversational)** | 사용자의 질문에 실시간으로 답변하고 가이드를 제공 | 입력: 텍스트 → 출력: 응답, Adaptive Card |
| **자율형 (Autonomous)** | 이벤트(새 레코드, 폼 제출 등)에 자동 반응하여 작업 수행 | 입력: 트리거 → 출력: 자동화된 Action 실행 |

---

## 2. 주요 메뉴 및 구성 요소

### 2.1 좌측 네비게이션

| 메뉴 | 설명 |
|---|---|
| **Agents** | 생성된 Agent 목록 확인 및 관리 |
| **환경 선택** | 상단에서 Power Platform 환경을 전환 (Dev / Test / Prod) |

### 2.2 Agent 편집 화면 (6개 탭)

Agent를 선택하면 아래 탭이 제공됩니다. 각 탭의 역할을 명확히 이해하면 Agent 설계가 훨씬 쉬워집니다.

| 탭 | 핵심 역할 | 실무 포인트 |
|---|---|---|
| **Overview** | Agent의 정체성 정의 — 이름, 설명, **지침(Instructions)**, 언어, AI 모델 선택 | 이후 Topics·Knowledge·Actions의 **해석 기준**이 됨 |
| **Knowledge** | 데이터 소스 연결 — SharePoint, OneDrive, 웹사이트, 파일, Dataverse | Generative Answers의 RAG 기반. **"정답의 출처"** |
| **Topics** | 대화 흐름 설계 — 트리거 → 노드(질문·조건·Action·메시지) | **"틀리면 안 되는 영역"**에 사용 |
| **Actions** | 외부 연동 — Power Automate, 커넥터, HTTP, MCP, AI Prompt | **"답변을 넘어 일을 시키는"** 핵심 기능 |
| **Publish** | 게시 및 채널 배포 — Teams, 웹, M365 Copilot 등 | Publish 전/후 응답이 다르므로 반드시 게시 후 테스트 |
| **Analytics** | 사용 현황 분석 — 세션 수, 해결률, 미응답 질문, CSAT | **운영 단계**에서 진짜 가치가 발생하는 탭 |

> 📖 **참조**: [Create and edit topics](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-create-edit-topics) · [Knowledge sources](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-copilot-studio) · [Use actions](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-plugin-actions)

<div class="info-box warning">
<b>⚠️ PoC에서 가장 빈번한 실수</b><br>
"편집은 했는데 왜 안 바뀌지?" — <b>Publish를 하지 않으면</b> 변경사항이 실제 채널에 반영되지 않습니다. 편집 중인 내용은 테스트 패널에서만 확인 가능하며, 기존 게시 버전이 유지됩니다.
</div>

---

## 3. 오케스트레이션 모드: Classic vs Generative

Agent의 핵심 동작 방식을 결정하는 설정이 **Settings > Generative AI**에 있습니다. 이 선택이 Agent의 전체 행동 방식을 좌우합니다.

| 구분 | Classic 모드 | Generative 모드 |
|---|---|---|
| **의도 인식** | 트리거 문구 기반 NLU 매칭 | LLM이 자연어로 의도 파악 |
| **다중 의도** | 하나의 발화 → 하나의 Topic | 하나의 발화 → 여러 의도 동시 처리 |
| **Topic 선택** | 트리거 문구 유사도 | Topic의 **이름과 설명** 기반 LLM 판단 |
| **Action 호출** | Topic 내 명시적 노드 배치 | LLM이 자율적으로 적절한 Action 선택 |
| **제어력** | ✅ 높음 (예측 가능) | ⚠️ 유연하지만 테스트 필요 |
| **적합 시나리오** | 정형화된 대화, 정책·프로세스 안내 | 유연한 대화, 다중 의도, FAQ |

> 📖 **참조**: [Orchestrate agent behavior with generative AI](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-generative-actions)

<div class="info-box tip">
<b>💡 실무 권장 — Hybrid 모델</b><br>
실무에서 가장 잘 동작하는 구조는 <b>Generative 모드를 기본으로 켜되, 핵심 업무는 Topic으로 설계</b>하는 하이브리드 방식입니다.
<ul>
<li><b>1차</b>: Topic 매칭 시도 → 매칭 성공 시 정형 흐름 실행</li>
<li><b>2차</b>: 매칭 실패 시 → Generative Answers (Knowledge 기반 AI 답변)</li>
<li><b>3차</b>: 그래도 실패 시 → Fallback Topic (에스컬레이션 안내)</li>
</ul>
이렇게 하면 <b>"틀리면 안 되는 건 Topics, 유연해야 하는 건 Generative"</b>로 역할이 명확히 나뉩니다.
</div>

---

## 4. Topics 상세

**Topics**는 **특정 사용자 의도(Intent)에 대한 대화 흐름**을 정의하는 핵심 단위입니다.

### 4.1 Topic 생성 방식 3가지

| 방식 | 설명 | 적합 대상 |
|---|---|---|
| **수동 생성** | 빈 Topic에서 노드를 하나씩 추가 | 세밀한 제어가 필요할 때 |
| **자연어 생성 (Generative Builder)** | "이런 Topic을 만들어줘"라고 설명하면 AI가 생성 | 빠른 프로토타이핑 |
| **기존 Topic 수정** | Copilot 도움으로 기존 Topic을 자연어로 수정 | 반복 개선 |

> 📖 **참조**: [Create and edit topics with Copilot](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/nlu-authoring)

### 4.2 Topic의 구성 요소

1. **트리거(Trigger)**: 사용자가 특정 문구를 입력하면 해당 Topic이 활성화됩니다.
   - Classic 모드: 트리거 문구 유사도로 매칭
   - Generative 모드: Topic의 **이름과 설명**을 기반으로 LLM이 자동 매칭

2. **노드(Node)**: Topic 내부의 처리 단계

| 노드 유형 | 설명 | 활용 예시 |
|---|---|---|
| **메시지 노드** | 사용자에게 텍스트/카드를 표시 | 안내 메시지, 결과 출력 |
| **질문 노드** | 사용자에게 정보를 요청 (선택지, 텍스트 등) | 이름, 유형, 날짜 입력 |
| **조건 노드** | 조건 분기 처리 (if/else) | 유형별 다른 처리 |
| **Action 노드** | 외부 시스템 호출 | API 호출, 이메일 발송 |
| **Topic 리다이렉트** | 다른 Topic으로 흐름 전환 | 모듈화된 대화 구조 |
| **Generative Answers 노드** | Knowledge 기반 AI 답변 생성 | 특정 소스에서 동적 응답 |

### 4.3 시스템 Topic vs 사용자 Topic

| 구분 | 설명 | 예시 |
|---|---|---|
| **시스템 Topic** | 기본 제공. 수정 가능하나 삭제 불가. | Greeting, Escalation, End of Conversation, **Conversational Boosting**, Fallback |
| **사용자 Topic** | 사용자가 직접 생성하는 커스텀 대화 흐름. | 휴가 신청, IT 요청, 제품 문의 |

### 4.4 Conversational Boosting — 기본 제공 "AI 답변 엔진"

Agent를 생성하면 자동으로 **Conversational Boosting** 시스템 Topic이 만들어집니다. 이 Topic에 **Generative Answers 노드**가 기본 포함되어 있어, Knowledge 소스를 연결하기만 하면 바로 AI 답변이 시작됩니다.

```
사용자 질문 → Topic 매칭 시도
  ├─ 매칭 성공 → 해당 Topic 실행 (정형 흐름)
  └─ 매칭 실패 → Conversational Boosting Topic
       → Generative Answers 노드 (Knowledge 기반 답변)
            ├─ 답변 생성 성공 → 출처(Citation)와 함께 응답
            └─ 생성 실패 → Fallback Topic (에스컬레이션/안내)
```

<div class="info-box tip">
<b>💡 실무 팁 — Topic 설계 원칙</b><br>
<ul>
<li>모든 질문에 Topic을 만들 필요 없습니다. <b>정형 업무 처리(휴가 신청, IT 요청 등)만 Topic으로</b>, 나머지는 Generative Answers에 맡기세요.</li>
<li>Generative 모드에서는 트리거 문구보다 <b>Topic의 이름과 설명이 더 중요</b>합니다. LLM이 이를 기준으로 어떤 Topic을 호출할지 판단합니다.</li>
<li><b>"틀리면 안 되면 Topics, 유연해야 하면 Generative"</b> — 이 판단 기준을 먼저 세우세요.</li>
</ul>
</div>

---

## 5. Generative Answers 상세

**Generative Answers**는 사전 정의된 Topic에 매칭되지 않는 사용자 질문에 대해, 연결된 **Knowledge 소스를 기반으로 LLM이 자동 생성한 답변**을 제공하는 기능입니다.

### 5.1 동작 방식

1. 사용자 질문 입력
2. Topic 매칭 시도 → 매칭 실패
3. Knowledge 소스에서 관련 문서/정보 검색 (시맨틱 검색)
4. 검색 결과를 LLM에 전달 (RAG 패턴)
5. LLM이 컨텍스트에 맞는 자연스러운 답변 생성
6. 결과 검증 및 콘텐츠 안전성 확인
7. **출처(Citation)**와 함께 답변 제공

> 📖 **참조**: [Use generative answers in a topic](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/nlu-boost-node)

### 5.2 Generative Answers 배치 위치

Generative Answers 노드는 **여러 위치에 배치**할 수 있어 유연한 답변 전략을 구성할 수 있습니다.

| 배치 위치 | 설명 | 사용 시나리오 |
|---|---|---|
| **Conversational Boosting Topic** (기본) | Topic 매칭 실패 시 자동 실행 | 일반적인 FAQ, 문서 기반 Q&A |
| **특정 Topic 내** | Topic 흐름 중간에 삽입 | 특정 맥락에서 추가 정보 제공 |
| **Fallback 이전** | 에스컬레이션 전 마지막 시도 | 미해결 질문 최소화 |

### 5.3 주요 설정

| 설정 | 설명 | 참조 |
|---|---|---|
| **응답 범위 제한** | "Search only selected sources" — 특정 Knowledge 소스만 사용 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/nlu-boost-node) |
| **일반 지식 사용** | Use general knowledge — Knowledge 외 일반 정보 활용 여부 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-copilot-studio#allow-the-agent-to-use-general-knowledge) |
| **콘텐츠 모더레이션** | 응답의 엄격도 수준 설정 (높음/보통/낮음) | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/nlu-gpt-quickstart) |

---

## 6. Actions 상세

**Actions**는 Agent가 **외부 시스템과 상호작용**하기 위한 기능입니다. "답변하는 Copilot"에서 **"업무를 처리하는 Agent"**로 바뀌는 지점이며, 대부분 고객 PoC에서 **가장 임팩트가 큰 기능**입니다.

### 6.1 Action 유형

| 유형 | 설명 | 예시 | 참조 |
|---|---|---|---|
| **Power Automate 플로우** | 기존 PA 플로우를 호출 | 승인 요청, 이메일 발송 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-flow) |
| **커넥터 액션** | 표준/커스텀 커넥터 직접 호출 | SharePoint 조회, Outlook 메일 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-plugin-actions) |
| **HTTP 요청** | REST API 직접 호출 | 외부 ERP/CRM 데이터 | [Learn](https://learn.microsoft.com/ko-kr/connectors/custom-connectors/) |
| **MCP 서버** | Model Context Protocol 서버 연결 | 자체 MCP 서버의 도구 호출 | |
| **AI Prompt** | AI 모델에 맞춤형 프롬프트 실행 | HTML 카드 생성, 데이터 요약 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/prompts-overview) |

### 6.2 Classic vs Generative 모드에서의 Action 실행

| 구분 | Classic 모드 | Generative 모드 |
|---|---|---|
| **호출 방식** | Topic 내 Action 노드에서 명시적 호출 | LLM이 자율적으로 판단하여 호출 |
| **매개변수 수집** | 질문 노드로 사전 수집 | 부족한 정보만 사용자에게 질의 |
| **결과 처리** | 변수에 저장 후 수동 활용 | 자동 요약하여 응답에 반영 |

> 📖 **참조**: [Orchestrate agent behavior with generative AI](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-generative-actions)

<div class="info-box warning">
<b>⚠️ Generative Actions 사용 시 주의</b><br>
Generative 모드에서 Agent가 의도치 않게 Action을 호출할 수 있습니다. 이메일 발송, 데이터 수정 등 <b>부수효과(Side Effect)가 있는 Action</b>은 지침에서 호출 조건을 명확히 제한하세요. 예: <em>"이메일을 보내기 전에 반드시 사용자에게 수신자, 제목, 본문을 확인받아."</em>
</div>

---

## 7. Knowledge 상세

**Knowledge**는 Agent가 **답변을 생성할 때 참고하는 데이터 소스**입니다. Generative Answers의 핵심 기반이며, Agent의 전문성과 정확도를 결정합니다.

### 7.1 지원 Knowledge 소스

| 소스 유형 | 설명 | 동기화 | 참조 |
|---|---|---|---|
| **SharePoint 사이트** | 사이트 URL 연결 | 4~6시간 자동 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-add-sharepoint) |
| **OneDrive** | 개인/공유 OneDrive 파일 | 4~6시간 자동 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-unstructured-data) |
| **웹사이트 URL** | 공개 웹사이트 크롤링 | 주기적 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-copilot-studio) |
| **파일 업로드** | PDF, Word, Excel, PPT 직접 업로드 | 수동 갱신 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-unstructured-data) |
| **Dataverse** | Power Platform 테이블 데이터 | 실시간 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-copilot-studio) |

<div class="info-box tip">
<b>💡 실무 팁 — "문서 품질 = 에이전트 품질"</b><br>
Agent의 응답 품질이 낮을 때, LLM 문제라고 생각하기 쉬우나 <b>대부분은 문서 품질 문제</b>입니다.
<ul>
<li><b>✅ 권장</b>: 제목·목차가 명확한 문서, 하나의 문서 = 하나의 주제, 최신 문서만 유지</li>
<li><b>❌ 비권장</b>: PPT 슬라이드 그대로 업로드, 중복/초안 문서 혼합, 권한 불명확한 문서</li>
<li><b>Knowledge 없이 Instructions만 넣으면</b> 응답 품질이 급격히 흔들립니다. 반드시 함께 구성하세요.</li>
</ul>
</div>

### 7.2 Knowledge 접근 권한

- **SharePoint Knowledge**: 사용자의 Entra ID 권한을 **그대로 상속**합니다. 접근 권한이 없는 문서는 응답에 포함되지 않습니다.
- **파일 업로드**: Agent에 접근할 수 있는 모든 사용자가 해당 파일 내용을 받아볼 수 있습니다. 민감 정보 포함 시 주의하세요.

---

## 8. Instructions(지침) 작성 가이드

**Instructions**는 Agent의 Overview 탭에서 설정하는 가장 중요한 요소입니다. Agent의 성격, 역할, 제약 조건을 자연어로 정의하며, Generative Orchestration에서 **모든 판단의 최상위 제어 레이어** 역할을 합니다.

### 8.1 권장 구조

```
## 9. 역할 (Role)
너는 [조직명]의 [업무 도메인] 전문 에이전트야.

## 10. 목표 (Goal)  
[핵심 목적을 1~2문장으로]

## 11. 톤 & 스타일
- 친근하지만 전문적인 톤으로 답변
- 기술 용어는 쉬운 설명과 함께 제공

## 12. 제약 조건 (Do / Don't)
- ✅ 반드시 Knowledge에 있는 정보만 참고해
- ✅ 확실하지 않으면 "확인이 필요합니다"라고 안내해
- ❌ 사내 정책과 무관한 질문에는 답변하지 마
- ❌ 근거 없이 추측하지 마

## 13. Action 관련 제약
- 이메일을 보내기 전에 반드시 수신자/제목/본문을 사용자에게 확인받아
```

> 📖 **참조**: [Quickstart: Create an agent](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/fundamentals-get-started)

<div class="info-box note">
<b>📌 Instructions는 "프롬프트가 아니라 정책"입니다</b><br>
길어도 괜찮습니다. 모호하면 안 됩니다. Instructions는 Agent가 <b>모든 대화에서 참고하는 운영 정책</b>이므로, 명확하고 구체적으로 작성해야 합니다. 특히 <b>하지 말아야 할 것(Don't)</b>은 가능한 한 구체적으로 기술하세요.
</div>

---

## 14. Analytics — 운영 개선의 핵심

Analytics 탭은 Agent의 배포 이후 **지속적인 품질 개선**을 위한 데이터를 제공합니다.

| 지표 | 설명 | 개선 액션 |
|---|---|---|
| **총 세션 수** | 일정 기간 내 대화 횟수 | 사용량 트렌드 파악 |
| **해결률(Resolution Rate)** | 사용자 질문을 성공적으로 해결한 비율 | 낮으면 Knowledge/Topic 보강 |
| **에스컬레이션 비율** | 상담원 전환이 발생한 비율 | 높으면 Fallback Topic 개선 |
| **Thumbs up/down** | 사용자 만족도 피드백 | 낮은 점수 질문 분석 |
| **미응답 질문** | 답변하지 못한 질문 목록 | → Topic 추가 or Knowledge 보강 |
| **Knowledge 소스별 사용량** | 어떤 소스가 많이 참조되는지 | 불필요한 소스 정리 / 핵심 소스 강화 |

> 📖 **참조**: [Analytics overview](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/analytics-overview)

<div class="info-box tip">
<b>💡 실무 팁 — 미응답 질문 활용법</b><br>
Analytics의 <b>미응답 질문 목록</b>은 "금광"입니다. 사용자들이 실제로 물어보는데 답변하지 못한 질문을 정기적으로 리뷰하여:
<ul>
<li>반복되는 질문 → <b>새 Topic 추가</b> (정형 답변이 필요한 경우)</li>
<li>문서에 답이 있는 질문 → <b>Knowledge 소스 점검</b> (파싱 이슈 가능)</li>
<li>답변 불가능한 질문 → <b>Fallback 메시지 개선</b> ("이 질문은 [담당자]에게 문의해 주세요")</li>
</ul>
</div>

---

## 15. Responsible AI 및 보안

Copilot Studio의 모든 생성형 AI 기능은 **Microsoft의 Responsible AI 표준**에 따라 운영됩니다.

| 영역 | 조치 | 참조 |
|---|---|---|
| **응답 검증** | Data Grounding으로 환각(Hallucination) 감소 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/responsible-ai-overview) |
| **콘텐츠 모더레이션** | 유해/규정 위반 콘텐츠 자동 필터링 | |
| **데이터 보호** | 대화 데이터는 운영 지원 목적으로만 임시 저장 | |
| **모델 훈련 미사용** | 고객 데이터를 모델 훈련에 사용하지 않음 | |
| **Customer Lockbox** | 지원 접근 시 고객 승인 필요 | |

<div class="info-box note">
<b>📌 다음 챕터 미리보기</b><br>
이번 챕터에서 Copilot Studio의 UI 구성과 핵심 개념을 파악했습니다. 다음 <b>Chapter 3</b>에서는 실제로 Agent를 만들어보는 과정 — 대화 설계, 변수 관리, Action 연결, Generative Orchestration 활용 — 을 단계별로 살펴봅니다.
</div>
