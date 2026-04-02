---
layout: chapter
title: '반개발형 Agent 만들기'
short_title: "반개발형 Agent"
description: "Copilot Studio의 대화 설계 방식, 변수·상태 관리, Action 기반 처리 흐름, 그리고 Generative Orchestration까지 단계별로 심층 안내합니다."
order: 3
---

## 기본 대화 설계 방식

Copilot Studio에서 Agent의 대화는 크게 **세 가지 방식**으로 설계할 수 있습니다. 각 방식은 배타적이지 않으며, 하나의 Agent 안에서 자유롭게 조합하여 사용합니다.

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

**지침 작성 실전 예시:**

```
## 역할
너는 한국 마이크로소프트의 사내 IT 헬프데스크 에이전트야.

## 목표
직원들의 IT 관련 질문에 정확하고 신속하게 답변해.
해결이 어려운 문제는 IT 서비스 데스크 티켓 생성을 안내해.

## 톤 & 스타일
- 친근하지만 전문적인 톤으로 답변
- 단계별 안내가 필요하면 번호 매기기 사용
- 기술 용어는 쉬운 설명과 함께 제공

## 제약 조건
- IT와 무관한 질문에는 답변하지 마
- 보안 관련 민감 정보(비밀번호, 인증서 등)를 직접 제공하지 마
- 확실하지 않은 정보는 "확인이 필요합니다"라고 안내해

## 이메일 작성 규칙 (Action 관련)
- 이메일을 보낼 때는 반드시 사용자에게 수신자, 제목, 본문을 확인받아
- HTML 형식으로 이메일 본문을 작성하되, 가독성을 우선해
```

<div class="info-box tip">
<strong>💡 실무 팁</strong>
지침은 "짧고 명확하게" 작성하는 것이 핵심입니다. 지침이 너무 길면 LLM이 우선순위를 혼동할 수 있습니다. 핵심 규칙 5~10개를 명확하게 기술하세요. 특히 <strong>제약 조건</strong>은 구체적으로 작성해야 에이전트가 의도치 않은 행동을 하지 않습니다.
</div>

### 2. Topic 기반 설계

정형화된 업무 처리가 필요한 경우, **Topics 탭**에서 트리거 → 노드 흐름으로 대화를 설계합니다.

**Topic 설계 흐름:**

```
트리거 문구 정의 (또는 Generative 모드에서 Topic 이름/설명으로 자동 매칭)
  → 질문 노드 (필요 정보 수집 → 변수에 저장)
    → 조건 노드 (변수 값에 따라 분기 처리)
      → Action 노드 (외부 시스템 호출, 입력 변수 매핑)
        → 메시지 노드 (결과 안내, 변수 값 포함)
          → (선택) 다른 Topic으로 리다이렉트
```

**Topic 구성 실전 예시 — IT 장비 신청:**

```
[트리거] "노트북 신청", "장비 요청", "새 장비"

[질문 노드 1] "어떤 장비가 필요하신가요?"
  → 변수: VarEquipmentType (선택지: 노트북, 모니터, 키보드/마우스)

[질문 노드 2] "사용 목적을 간단히 알려주세요."
  → 변수: VarPurpose (텍스트)

[조건 노드] VarEquipmentType = "노트북"
  → 추가 질문: "Windows / macOS 중 어느 것을 원하시나요?"
  → 변수: VarOSType

[Action 노드] Power Automate 플로우 호출
  → 입력: VarEquipmentType, VarPurpose, VarOSType, System.User.DisplayName
  → SharePoint 목록에 신청 건 등록
  → 출력: VarRequestId (신청 번호)

[메시지 노드] "신청이 완료되었습니다! 신청번호: {VarRequestId}
              담당자가 확인 후 연락드리겠습니다."
```

### 3. Generative Builder 기반 설계

자연어로 원하는 Topic을 설명하면 **AI가 자동으로 대화 흐름을 생성**합니다.

**사용 방법:**
1. **Topics 탭** → **Add a topic** → **Create from description with Copilot**
2. Topic 이름 입력 (예: "장비 신청")
3. 원하는 동작을 자연어로 설명:
   > "사용자에게 필요한 장비 종류와 사용 목적을 질문하고, 답변을 변수에 저장해. 노트북인 경우 OS 종류도 추가로 질문해. 모든 정보를 수집한 후 확인 메시지를 보여줘."
4. **Create** 클릭 → 트리거 문구, 노드 구성이 자동 생성됨

<div class="info-box note">
<strong>📌 참고</strong>
Generative Builder가 생성한 Topic은 <strong>초안</strong>입니다. 반드시 생성된 결과를 검토하고, 필요한 부분을 수정하세요. 특히 변수명, 조건 분기, Action 연결은 수동으로 확인·조정이 필요합니다.
</div>

---

## Topic과 Generative Answers 적합 시나리오 비교

| 구분 | Topic | Generative Answers |
|---|---|---|
| **적합 시나리오** | 절차가 정해진 업무, 외부 시스템 연동, 분기 처리 | 자유 질의응답, 문서 기반 정보 검색 |
| **대화 흐름** | 미리 설계된 정형 흐름 | AI가 자율 생성 |
| **데이터 처리** | 변수에 저장, Action으로 전달 | Knowledge 소스에서 검색·요약 |
| **유지보수** | Topic별 수동 관리 | Knowledge 소스 업데이트만으로 자동 반영 |
| **예시** | 휴가 신청, IT 요청, 경비 정산 | "회사 복리후생 뭐가 있어?", "출장비 규정 알려줘" |

---

## 변수, 상태 관리 개요

Copilot Studio에서 대화 중 데이터를 저장하고 전달하기 위해 **변수(Variable)** 시스템을 활용합니다.

### 변수 유형

| 유형 | 범위 | 용도 | 설정 방법 |
|---|---|---|---|
| **Topic 변수** | 해당 Topic 내에서만 유효 | 질문 노드 응답 저장, 중간 계산값 | 질문/Action 노드에서 자동 생성 |
| **전역 변수 (Global)** | 전체 대화 세션에서 유효 | Topic 간 데이터 전달, 사용자 상태 유지 | 변수 속성에서 "Global" 체크 |
| **시스템 변수** | Copilot Studio 기본 제공 | 사용자 이름, 채널 정보 등 | 자동 (수정 불가) |

### 변수 데이터 타입

| 데이터 타입 | 설명 | 활용 예시 |
|---|---|---|
| **텍스트(String)** | 문자열 데이터 | 사용자 이름, 이메일, 설명 |
| **숫자(Number)** | 정수 및 실수 | 수량, 금액, 점수 |
| **부울(Boolean)** | 참/거짓 | 동의 여부, 조건 충족 여부 |
| **날짜(DateTime)** | 날짜 및 시간 | 신청일, 마감일 |
| **선택(Choice)** | 미리 정의된 선택지 | 요청 유형, 카테고리 |
| **테이블(Table)** | 여러 행·열 데이터 | API 응답 결과, 목록 데이터 |
| **레코드(Record)** | 키-값 쌍 데이터 (JSON 유사) | 복합 데이터 구조 |

### 주요 시스템 변수

| 변수명 | 타입 | 설명 |
|---|---|---|
| `Activity.Text` | string | 사용자가 가장 최근에 보낸 메시지 |
| `Activity.Channel` | choice | 현재 대화의 채널 (Teams, Web 등) |
| `Activity.From.Id` | string | 사용자의 채널별 고유 ID |
| `Activity.From.Name` | string | 사용자의 표시 이름 |
| `Activity.Attachments` | table | 사용자가 첨부한 파일 목록 |
| `System.User.DisplayName` | string | 로그인한 사용자의 표시 이름 |

### 변수 간 전달 (Topic 간 데이터 흐름)

Copilot Studio에서는 **Topic 간 변수 전달**이 핵심 설계 패턴입니다.

#### 값 받기 (Receive values from other topics)

```
[Greeting Topic]
  → Redirect → [Talk to Customer Topic]
     ← 반환값: customerCity

[Talk to Customer Topic]
  [질문 노드] "어디 사세요?" → 변수: customerCity
  → 변수 속성에서 "Return values to original topics" 체크
  → [Redirect 노드의 출력으로 customerCity 반환]
```

이 패턴을 활용하면:
- **중복 질문 방지**: 이미 수집한 정보를 다른 Topic에 전달
- **모듈화**: 공통 정보 수집 로직을 별도 Topic으로 분리
- **전역 변수 남용 방지**: 필요한 경우에만 값을 전달하여 깔끔한 구조 유지

#### 외부 소스에서 변수 초기화

전역 변수를 **외부 소스에서 초기화**할 수 있습니다. 예를 들어 웹사이트에 Agent를 임베드할 때 사용자 이름이나 컨텍스트 정보를 미리 전달할 수 있습니다.

1. 전역 변수 하나를 선택
2. **Variable properties** 패널에서 **"External sources can set values"** 체크
3. 웹 임베드 시 URL 쿼리 파라미터로 전달: `botURL?UserName=홍길동`
4. 또는 JavaScript API를 통해 프로그래밍 방식으로 전달

```javascript
// 웹 임베드 시 변수 전달 예시
// URL 방식: https://web.powerva.microsoft.com/webchat/bots/12345?UserName=홍길동
// 파라미터 이름은 대소문자 구분 없음 (username=홍길동도 동작)
```

### Power Fx 수식 활용

Copilot Studio는 **Power Fx** 수식 언어를 지원하여, 변수에 대한 복잡한 연산과 데이터 변환을 처리할 수 있습니다.

```
// 문자열 결합
Concatenate(VarFirstName, " ", VarLastName)

// 조건부 메시지
If(VarRequestType = "긴급", "긴급 처리팀에 전달합니다.", "일반 접수되었습니다.")

// 날짜 계산
DateAdd(Now(), 3, TimeUnit.Days)  // 3일 후 날짜

// 테이블 필터링
Filter(VarResultTable, Status = "완료")
```

<div class="info-box note">
<strong>📌 참고</strong>
전역 변수는 대화 세션이 유지되는 동안만 값이 보존됩니다. 세션이 종료되면 초기화되므로, 영구적인 데이터 저장이 필요하면 Dataverse나 SharePoint 등 외부 저장소에 Action을 통해 저장하세요. 시스템 변수를 Power Fx에서 사용할 때는 <code>System.</code> 접두사를 붙여야 합니다. (예: <code>System.User.DisplayName</code>)
</div>

### 변수 테스트 및 디버깅

Copilot Studio는 **테스트 패널 내 변수 감시(Watch) 기능**을 제공합니다.

- 테스트 패널에서 대화 진행 시, 사이드 패널의 **Test** 탭에서 현재 Topic 변수와 전역 변수의 값을 실시간으로 확인할 수 있습니다.
- **Activity Map**을 활성화하면, Agent가 어떤 Topic을 선택하고 어떤 Action을 호출했는지 추적할 수 있습니다.

---

## Action 기반 처리 흐름

**Action**은 Agent가 대화 중에 외부 시스템을 호출하여 실제 업무를 수행하는 핵심 기능입니다.

### Action 연결 방식 비교

| 방식 | 적합한 경우 | 특징 | 복잡도 |
|---|---|---|---|
| **커넥터 기반** | 표준 서비스(Outlook, Teams 등) | 설정만으로 즉시 사용 가능 | ⭐ 낮음 |
| **Power Automate 플로우** | 복잡한 다단계 처리 | 입출력 변수 매핑, 오류 처리 유연 | ⭐⭐ 보통 |
| **MCP 서버** | 자체 개발 도구/서비스 | 유연한 외부 도구 연동 | ⭐⭐⭐ 높음 |
| **HTTP 요청 (커스텀 커넥터)** | 사내/외부 REST API 호출 | API 스펙에 맞게 직접 구성 | ⭐⭐⭐ 높음 |
| **AI Prompt** | 맞춤형 AI 응답 생성 | 프롬프트 완전 제어 | ⭐⭐ 보통 |

### 커넥터 기반 Action 설정 (단계별)

1. **Actions 탭** → **Add an action** 클릭
2. 사용할 커넥터 검색 (예: "Office 365 Outlook")
3. 작업 선택 (예: "Send an email (V2)")
4. 입력 파라미터 설정
   - **To**: 수신자 이메일 (변수 또는 고정값)
   - **Subject**: 제목
   - **Body**: 본문 (HTML 지원)
   - **CC**: 참조 (선택)
5. 인증 방식 선택

| 인증 방식 | 설명 | 사용 시나리오 |
|---|---|---|
| **최종 사용자 인증 (End User)** | 사용자 본인 계정으로 실행 | 개인 메일 발송, 본인 일정 조회 |
| **작성자 제공 인증 (Connection Creator)** | Agent 작성자의 계정/서비스 계정으로 실행 | 공용 알림, 서비스 계정 활용 |

### Power Automate 플로우 연결 (단계별)

Topic 내에서 Power Automate 플로우를 호출하여 복잡한 자동화를 처리할 수 있습니다.

**Step 1: Power Automate에서 플로우 생성**
- 트리거: **"Run a flow from Copilot"** 선택
- 동일한 Power Platform **환경(Environment)**에서 작성

**Step 2: 입출력 변수 정의**

```
[입력 변수]
  - to (텍스트): 수신자 이메일
  - subject (텍스트): 제목
  - body (텍스트): 본문 내용
  - cc (텍스트): 참조 (선택)

[출력 변수]
  - result (텍스트): 처리 결과 메시지
  - requestId (텍스트): 생성된 요청 ID
```

**Step 3: 플로우 로직 구성**
- 이메일 발송, SharePoint 목록 등록, Teams 채널 메시지 전송 등
- Try-Catch 패턴으로 오류 처리
- 조건 분기, 루프, 병렬 실행 등 고급 패턴 활용

**Step 4: Copilot Studio에서 호출**
- Topic → Action 노드에서 해당 플로우 선택
- Topic 변수와 플로우 입력 변수 매핑

```
[Topic 변수]           [Power Automate 입력]
VarRecipient    →     to
VarSubject      →     subject  
VarBody         →     body
VarCC           →     cc
```

**Step 5: 결과 활용**
- 플로우 출력 변수를 Topic 변수에 매핑
- 후속 메시지 노드에서 결과 표시

<div class="info-box tip">
<strong>💡 실무 팁</strong>
Power Automate 플로우는 <strong>Copilot Studio와 동일한 환경(Environment)</strong>에 생성해야 연결할 수 있습니다. 환경이 다르면 플로우 목록에 표시되지 않으니 주의하세요. 또한, Copilot Studio Plan으로 변경한 Flow는 <strong>Power Automate User/Process 라이선스로 되돌릴 수 없으므로</strong>, 변경 전에 충분히 검토하세요.
</div>

---

## Generative Orchestration (자율 오케스트레이션)

### Classic vs Generative 비교

| 구분 | Classic 모드 | Generative 모드 |
|---|---|---|
| **의도 인식** | 트리거 문구 기반 NLU 매칭 | LLM이 자연어로 의도 파악 |
| **다중 의도** | 하나의 발화 → 하나의 Topic | 하나의 발화 → 여러 의도 동시 처리 |
| **Topic 선택** | 트리거 문구 유사도 | Topic 이름·설명 기반 LLM 판단 |
| **Action 호출** | Topic 흐름 내 명시적 배치 | LLM이 자율적으로 적절한 Action 선택 |
| **정보 수집** | 질문 노드를 반드시 거침 | 부족한 정보만 사용자에게 질의 |
| **결과 처리** | 메시지 노드에서 수동 출력 | 자동 요약 후 응답 |

### Generative Orchestration 활성화

1. **Settings** 버튼 → **Generative AI** 선택
2. **Generative** 라디오 버튼 선택 (기본값: Classic)
3. 콘텐츠 모더레이션 수준 설정
4. **Save** 클릭

### Generative Orchestration에서의 작성 핵심

Generative 모드에서는 **트리거 문구보다 Topic/Action의 이름과 설명이 더 중요**합니다. LLM이 이를 기반으로 어떤 도구를 사용할지 판단하기 때문입니다.

**좋은 Topic 이름/설명 예시:**

```
이름: IT 장비 신청
설명: 직원이 노트북, 모니터, 키보드 등 IT 장비를 신청할 때 사용합니다.
      필요한 장비 종류, 용도, 옵션(OS 등)을 수집하여 SharePoint에 등록합니다.
```

**좋은 Action 설명 예시:**

```
이름: 이메일 발송 (Outlook)
설명: 지정된 수신자에게 이메일을 발송합니다. 
      사용자가 요청한 경우에만 호출하며, 발송 전 반드시 수신자와 내용을 확인받습니다.
```

### Generative 모드에서의 실행 추적

테스트 패널에서 **Activity Map**을 활성화하면:
- Agent가 어떤 Topic을 선택했는지
- 어떤 Knowledge 소스를 참조했는지  
- 어떤 Action을 호출했는지
- **Tracking between topics**로 Topic 간 전환을 시각적으로 확인

<div class="info-box warning">
<strong>⚠️ 주의</strong>
Generative Actions는 편리하지만, 에이전트가 의도치 않게 Action을 호출할 수 있습니다. 이메일 발송, 데이터 수정 등 <strong>부수효과(Side Effect)가 있는 Action</strong>은 지침에서 호출 조건을 명확히 제한하세요. 예: "이메일을 보내기 전에 반드시 사용자에게 수신자, 제목, 본문을 확인받아."
</div>

---

## Agent 설계 모범 사례 요약

| 원칙 | 설명 |
|---|---|
| **Topics는 최소한으로** | 정형 업무만 Topic으로, 나머지는 Generative Answers |
| **지침은 구체적으로** | 역할·목표·제약이 명확한 5~10개 규칙 |
| **변수 이름을 의미있게** | `VarRequestType` > `Var1` |
| **Action 설명을 상세히** | Generative 모드에서 LLM 판단의 기준 |
| **전역 변수는 최소화** | 가능하면 Topic 간 값 전달 사용 |
| **테스트를 자주** | Activity Map으로 LLM 판단 과정 확인 |
| **보안 Action에 제약 추가** | 이메일, 데이터 수정 등은 사용자 확인 필수 |
