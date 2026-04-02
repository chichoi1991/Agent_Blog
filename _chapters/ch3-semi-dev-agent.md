---
layout: chapter
title: '반개발형 Agent 만들기'
short_title: "반개발형 Agent"
description: "Copilot Studio의 기본 대화 설계 방식, 변수·상태 관리, Action 기반 처리 흐름을 단계별로 알아봅니다."
order: 3
---

## 기본 대화 설계 방식

Copilot Studio에서 Agent의 대화는 크게 **두 가지 방식**으로 설계합니다.

### 1. 지침(Instructions) 기반 설계

Agent의 **Overview 탭**에서 자연어로 지침을 작성하면, LLM이 이를 기반으로 자율적으로 대화를 이끌어갑니다. 코드 없이 Agent의 성격과 행동 규칙을 정의할 수 있습니다.

**지침 작성 5대 요소:**

| 요소 | 설명 | 예시 |
|---|---|---|
| **역할(Role)** | Agent의 정체성 정의 | "너는 HR 정책 안내 전문 에이전트야" |
| **목표(Goal)** | 달성해야 할 핵심 목적 | "직원의 인사 관련 질문에 정확하게 답변해" |
| **톤 & 스타일** | 대화의 어조와 형식 | "친절하고 공식적인 톤으로 답변해" |
| **제약 조건** | 하지 말아야 할 것 | "사내 정책과 무관한 질문에는 답변하지 마" |
| **예시** | 이상적인 응답 패턴 | "Q: 연차 잔여일 확인 → A: 연차 관련 안내..." |

<div class="info-box tip">
<strong>💡 실무 팁</strong>
지침은 "짧고 명확하게" 작성하는 것이 핵심입니다. 지침이 너무 길면 LLM이 우선순위를 혼동할 수 있습니다. 핵심 규칙 5~10개를 명확하게 기술하세요.
</div>

### 2. Topic 기반 설계

정형화된 업무 처리가 필요한 경우, **Topics 탭**에서 트리거 → 노드 흐름으로 대화를 설계합니다.

**Topic 설계 흐름:**

```
트리거 문구 정의
  → 질문 노드 (필요 정보 수집)
    → 조건 노드 (분기 처리)
      → Action 노드 (외부 시스템 호출)
        → 메시지 노드 (결과 안내)
```

**Topic이 적합한 시나리오:**
- 휴가 신청, IT 요청 등 **절차**가 정해진 업무
- 사용자 입력을 받아 **외부 시스템에 데이터를 전달**해야 하는 경우
- **분기 처리**가 필요한 업무 (예: 유형별 안내)

**Generative Answers가 적합한 시나리오:**
- 사내 문서 기반 **자유 질의응답**
- 정형화되지 않은 **일반적인 안내**

---

## 변수, 상태 관리 개요

Copilot Studio에서 대화 중 데이터를 저장하고 전달하기 위해 **변수(Variable)** 시스템을 활용합니다.

### 변수 유형

| 유형 | 범위 | 용도 |
|---|---|---|
| **Topic 변수** | 해당 Topic 내에서만 유효 | 질문 노드 응답 저장, 중간 계산값 |
| **전역 변수 (Global)** | 전체 대화 세션에서 유효 | Topic 간 데이터 전달, 사용자 상태 유지 |
| **시스템 변수** | Copilot Studio 기본 제공 | 사용자 이름, 채널 정보 등 |

### 변수 데이터 타입

- **텍스트(String)**: 문자열 데이터
- **숫자(Number)**: 정수 및 실수
- **부울(Boolean)**: 참/거짓
- **테이블(Table)**: 여러 행·열 데이터
- **레코드(Record)**: 키-값 쌍 데이터 (JSON 유사)

### 변수 활용 예시

```
[질문 노드] "어떤 유형의 요청인가요?" → 답변을 Topic 변수 VarRequestType에 저장
  ↓
[조건 노드] VarRequestType = "IT 장애" → IT 처리 흐름으로 분기
[조건 노드] VarRequestType = "시설 요청" → 시설 처리 흐름으로 분기
  ↓
[Action 노드] VarRequestType을 Power Automate 플로우에 입력값으로 전달
```

<div class="info-box note">
<strong>📌 참고</strong>
전역 변수는 대화 세션이 유지되는 동안만 값이 보존됩니다. 세션이 종료되면 초기화되므로, 영구적인 데이터 저장이 필요하면 Dataverse나 SharePoint 등 외부 저장소를 활용하세요.
</div>

---

## Action 기반 처리 흐름

**Action**은 Agent가 대화 중에 외부 시스템을 호출하여 실제 업무를 수행하는 핵심 기능입니다.

### Action 연결 방식

Copilot Studio에서 Action을 연결하는 방법은 크게 세 가지입니다.

| 방식 | 적합한 경우 | 특징 |
|---|---|---|
| **커넥터 기반** | 표준 서비스(Outlook, Teams 등) | 설정만으로 즉시 사용 가능 |
| **Power Automate 플로우** | 복잡한 다단계 처리 | 입출력 변수 매핑, 오류 처리 유연 |
| **HTTP 요청 (커스텀 커넥터)** | 사내/외부 REST API 호출 | API 스펙에 맞게 직접 구성 |

### 커넥터 기반 Action 설정

1. **Actions 탭** → **Add an action** 클릭
2. 사용할 커넥터 검색 (예: "Office 365 Outlook")
3. 작업 선택 (예: "Send an email (V2)")
4. 입력 파라미터 설정
   - **To**: 수신자 이메일 (변수 또는 고정값)
   - **Subject**: 제목
   - **Body**: 본문 (HTML 지원)
5. 인증 방식 선택
   - **최종 사용자 인증**: 사용자 본인 계정으로 실행
   - **작성자 제공 인증**: Agent 작성자의 계정으로 실행

### Power Automate 플로우 연결

Topic 내에서 Power Automate 플로우를 호출하여 복잡한 자동화를 처리할 수 있습니다.

**연결 절차:**

1. Power Automate에서 플로우 생성 (트리거: Copilot Studio)
2. 입력 변수 정의 (예: `to`, `subject`, `body`)
3. 플로우 로직 구성 (이메일 발송, 데이터 기록 등)
4. 출력 변수 정의 (결과를 Agent에 반환)
5. Copilot Studio의 Topic → Action 노드에서 해당 플로우 선택
6. Topic 변수와 플로우 입력 변수 매핑

```
[Topic 변수]           [Power Automate 입력]
VarRecipient    →     to
VarSubject      →     subject  
VarBody         →     body
```

### Generative Actions (자율 호출)

**Generative Orchestration**을 활성화하면, Agent가 지침과 사용자 입력을 기반으로 **어떤 Action을 호출할지 자율적으로 판단**합니다. Topic에서 명시적으로 Action 노드를 배치하지 않아도, LLM이 적절한 시점에 자동으로 Action을 호출합니다.

<div class="info-box warning">
<strong>⚠️ 주의</strong>
Generative Actions는 편리하지만, 에이전트가 의도치 않게 Action을 호출할 수 있습니다. 이메일 발송, 데이터 수정 등 <strong>부수효과(Side Effect)가 있는 Action</strong>은 지침에서 호출 조건을 명확히 제한하세요.
</div>
