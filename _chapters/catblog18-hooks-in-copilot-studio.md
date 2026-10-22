---
layout: "chapter"
title: "Copilot Studio의 Hooks: 지침을 넘어 에이전트 확장하기"
short_title: "Copilot Studio Hooks"
description: "GitHub Copilot 하네스 에이전트에서 Hooks와 워크플로를 사용해 맥락 추가, 데이터 변환, 작업 실행 전 검증을 수행하는 방법을 설명합니다."
order: 18
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/hooks-in-copilot-studio/"
source_author: "PetrosFeleskouras"
source_published: "2026-10-12"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/hooks-in-copilot-studio/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 PetrosFeleskouras(@PetrosFeleskouras) 원문 [Hooks in Copilot Studio: Give Your Agent More Than Instructions](https://microsoft.github.io/mcscatblog/posts/hooks-in-copilot-studio/)(2026-10-12)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/background-image.png' | relative_url }}" alt="Copilot Studio 에이전트 오케스트레이션 앞뒤에서 입력을 처리하는 Hooks와 에이전트 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

GitHub Copilot 하네스로 구동되는 에이전트는 작업에 접근하는 방법과 호출할 도구를 추론합니다. 지침은 이러한 판단을 안내하지만, 특정 이벤트가 발생할 때마다 모델의 선택과 관계없이 실행해야 하는 단계도 있습니다. **Hooks는 런타임이 로직을 호출하는 예측 가능한 체크포인트를 제공합니다.**

HR 에이전트는 직원의 국가와 선호 언어를 미리 알고 대화를 시작할 수 있습니다. 비식별화 워크플로는 에이전트가 처리하기 전에 질문의 민감한 개인정보를 가릴 수 있습니다. 예약 워크플로는 예약 도구를 실행하기 전에 제안된 항공료가 직원의 예산에 맞는지 확인할 수 있습니다.

이 예제는 Hooks가 맥락을 추가하고, 데이터를 변환하고, 제안된 작업을 검증하는 방식을 보여 줍니다. 워크플로, 입력·출력 매핑, 실행 추적과 Hook 실패 시 동작을 살펴보겠습니다.

> Hooks는 현재 GitHub Copilot 하네스로 구동되는 에이전트에서 공개 미리 보기로 제공됩니다. 지금 Hooks를 사용하려면 [copilotstudio.preview.microsoft.com](https://copilotstudio.preview.microsoft.com/)으로 이동해 해당 환경에서 사용할 수 있는지 확인하세요.

## 토픽 트리거에서 Hooks로

표준 하네스 에이전트에서는 [토픽 트리거](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-triggers)를 사용해 대화의 정해진 시점에 응답할 수 있습니다. **메시지 수신(A message is received)**은 들어오는 메시지를 처리하고, **AI가 생성한 응답을 보내기 직전(An AI-generated response is about to be sent)**은 응답 단계를 처리합니다.

GitHub Copilot 하네스 에이전트는 세션 시작이나 도구 호출 직전처럼 실행 중 지정된 시점에 확장 지점으로 Hooks를 사용합니다. 모델의 선택에 기대지 않고 일치하는 이벤트가 발생하면 런타임이 구성된 로직을 호출합니다.

이 수명 주기 Hook 패턴은 [GitHub Copilot SDK](https://github.com/github/copilot-sdk/blob/main/docs/hooks/hooks-overview.md)에서도 사용할 수 있으며, 개발자는 `onSessionStart`, `onPreToolUse` 같은 코드 핸들러를 사용합니다.

Copilot Studio에서는 현재 워크플로로 Hook 처리기를 구현합니다. Hook은 이벤트 입력을 받고 맥락 추가, 값 대체, 제안된 도구 호출 거부 등에 사용할 출력을 반환합니다. Hook은 워크플로가 실행되는 시점을 결정하며, 에이전트는 그 결과 맥락과 판단을 바탕으로 작업 접근 방식을 계속 결정합니다.

[Agent Skill](https://microsoft.github.io/mcscatblog/posts/modern-mcs-agent-skills/)은 작업 지침을 제공하고, Hooks는 이벤트에 의해 실행됩니다. [GitHub Copilot 하네스로 구동되는 에이전트](https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/)도 참고하세요.

## Hook 구성하기

[Hook 추가](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/hooks-overview#add-a-hook) 안내에 따라 이벤트를 선택하고 호환되는 워크플로를 만들거나 선택한 다음 에이전트에 연결합니다. 동일한 워크플로를 여러 에이전트에서 재사용하면서 에이전트, 사용자, 채널 메타데이터에 따라 적용할 규칙을 선택할 수 있습니다.

## 1. 세션 시작 시 직원 맥락 불러오기

HR Buddy 에이전트는 직원의 복리후생과 온보딩 관련 질문에 답합니다. 유용한 답변을 하려면 맥락이 필요합니다. 직원의 국가는 적용할 지침을 찾는 데 도움이 되고, 고용 유형은 관련 정책에 영향을 주며, 선호 언어는 응답 언어를 결정합니다. 목표는 세션이 시작될 때 이러한 정보를 사용할 수 있게 하는 것입니다.

**시작(Start, pre-loop)**은 새 대화가 시작될 때 실행됩니다. 배포된 워크플로는 로그인한 직원의 프로필을 조회하고 `additionalContext`를 반환합니다. 이 텍스트는 세션의 첫 사용자 메시지에 추가 컨텍스트 블록으로 첨부되어 모델이 추론하고 응답할 때 활용할 수 있습니다. 예를 들어 "국가: 그리스"와 "선호 언어: 그리스어"는 HR Buddy가 관련 지침을 선택하고 그리스어로 답하는 데 도움이 됩니다.

블록이 사용자 메시지와 함께 전달되더라도 내용은 워크플로가 제공합니다. 사용자가 세부 정보를 직접 입력할 필요가 없습니다. 이는 에이전트의 지침과 대화 내용을 보완할 뿐입니다. HR 시스템은 여전히 데이터 권한을 적용하고 복리후생 자격을 판정합니다.

샘플 HR Buddy 에이전트에서 **직원 맥락 불러오기(Load employee context)**를 만들고 **시작(Start, pre-loop)**을 선택한 다음 워크플로를 연결합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/Example1_Hook_Creation.png' | relative_url }}" alt="샘플 HR Buddy 에이전트에 직원 맥락 불러오기 Hook 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Hook 생성 양식에서 세션 시작 이벤트와 직원 맥락 워크플로를 연결합니다.</figcaption>
</figure>

샘플 워크플로는 다음과 같이 진행됩니다.

| 단계 | 입력과 출력 |
|---|---|
| 직원 식별 | Hook 입력에서 `metadata.userAadObjectId`를 읽습니다. |
| 프로필 조회 | ID를 샘플 직원 레코드와 대조합니다. 적용할 프로필이 없으면 이유를 기록합니다. |
| 필드 선택 | `country`, `employmentCategory`, `preferredLanguage`, `onboardingStage`를 사용합니다. |
| 맥락 반환 | 해당 값들을 `additionalContext`로 구성합니다. 일치하는 ID가 없으면 빈 맥락을 반환합니다. |

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/Example1_Context_Workflow.png' | relative_url }}" alt="로그인 ID를 읽고 샘플 프로필을 확인해 에이전트에 응답하는 직원 맥락 워크플로" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>프로덕션에서는 샘플 프로필 단계를 인증되고 권한이 부여된 HR 조회로 바꾸세요.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/HR_Buddy_SessionStart.png' | relative_url }}" alt="직원 맥락과 이후 그리스어 응답이 표시된 HR Buddy SessionStart 추적" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>HR Buddy 실행: Hook이 `additionalContext`로 직원 맥락을 반환하고, 이어서 도구 호출과 그리스어 응답이 표시됩니다.</figcaption>
</figure>

## 2. Azure Language로 프롬프트 비식별화

**사용자 프롬프트 제출(User prompt submitted)**을 사용해 `prompt`를 Azure Language로 보내 개인정보(PII)를 탐지하고, 서비스가 비식별화한 텍스트를 `modifiedPrompt`로 반환합니다.

미리 보기 테스트에서는 Microsoft 문서에 나온 예시 사회보장번호가 포함된 육아휴직 질문을 제출합니다.

### 인증된 서비스 호출 구성

[Azure Cognitive Service for Language 커넥터](https://learn.microsoft.com/en-us/connectors/cognitiveservicestextanalytics/)의 **개인정보 탐지(Detect Personal Information, V3.1)**를 사용하고 단계를 **프롬프트 PII 분석(Analyze prompt PII)**이라고 지정합니다.

| 설정 | 값 |
|---|---|
| 엔드포인트 | 승인된 Azure Language 리소스의 HTTPS 엔드포인트 |
| 인증 | 보안 커넥터 연결에 저장된 계정 키 |
| 작업 | Text Analytics v3.1을 사용하는 `EntitiesRecognitionPIIV3_1` |
| PII 범주 | 이 예제에서는 `USSocialSecurityNumber` |
| 로깅 옵트아웃 | `true` |

자격 증명은 보안 연결에 보관하고 승인된 호출자만 접근하도록 제한합니다.

**프롬프트 PII 비식별화(Redact prompt PII)**를 만듭니다. `prompt`를 문서의 `text`에 매핑하고 ID는 `prompt-1`, 언어는 `en`으로 설정합니다. 커넥터가 따옴표와 줄 바꿈을 올바르게 직렬화하도록 문서 객체를 전달합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/Example2_PII_Workflow.png' | relative_url }}" alt="인증된 Azure Language 작업과 동적 프롬프트 매핑이 포함된 PII 워크플로" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>워크플로는 Hook의 프롬프트를 Azure Language로 보내고, 결과를 확인한 뒤 비식별화한 텍스트를 반환합니다.</figcaption>
</figure>

[개인정보 범주](https://learn.microsoft.com/en-us/azure/ai-services/language-service/personally-identifiable-information/concepts/entity-categories)와 언어를 정책에 맞게 구성하세요. 이 예제는 영어와 하나의 범주를 선택합니다. 기본 마스킹은 별표를 사용합니다.

### 서비스 결과를 Hook 출력에 매핑

커넥터 결과와 문서 결과를 확인합니다. `errors` 배열이 비어 있고, ID가 일치하는 문서가 정확히 하나이며, `redactedText`가 채워져 있고, 경고가 처리되었는지 확인합니다. 저장된 Parse JSON 스키마는 예상치 못한 문서, 비어 있는 비식별화 텍스트, 비어 있지 않은 오류나 경고를 거부합니다.

일치하는 문서의 `redactedText`를 **에이전트에 응답(Respond to the agent)**의 `modifiedPrompt`에 매핑한 뒤, 해당 워크플로를 샘플 HR Buddy 에이전트의 **사용자 프롬프트 제출(User prompt submitted)** Hook에 연결합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/Example2_PII_Preview.png' | relative_url }}" alt="원본 프롬프트와 Hook에서 반환된 비식별 modifiedPrompt를 보여 주는 샘플 HR Buddy 미리 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실제 미리 보기 실행: 사회보장번호는 별표로 바뀌고 육아휴직 질문과 요청한 응답 언어는 그대로 유지됩니다.</figcaption>
</figure>

비식별화한 텍스트만 전달하고 원래 값이 포함된 엔터티 세부 정보는 승인된 처리 경로 안에 보관합니다. 탐지 결과가 없으면 원래 문구가 반환됩니다. 탐지 범위에는 한계가 있으므로 민감한 값이 남을 수 있습니다.

**실패 경로:** Hook에서 오류가 발생하거나 시간 초과되면 원본 프롬프트가 에이전트 처리로 이어질 수 있습니다. 아래의 [비식별화와 데이터 보존](#비식별화와-데이터-보존)에 설명된 대로, 정제된 진단 정보를 기록하고 접근·보존 통제를 구성하세요.

## 3. 예산에 따라 예약 검증

여행 에이전트가 직원의 항공편 선택을 돕는다고 가정해 봅시다. 에이전트가 650달러 예약을 제안했지만 직원의 예산은 500달러입니다. 목표는 실제 예약 요청이 실행되기 전에 이를 확인하고, 예산 안의 항공편을 선택할 명확한 이유를 에이전트에 제공하는 것입니다.

**도구 사용 전(Pre tool use)**은 도구 호출 직전에 실행되며 `toolName`과 `parameters`를 전달합니다. 워크플로는 제안된 운임과 통화를 별도로 조회한 정책과 비교한 뒤 결정을 반환합니다. `deny` 응답은 해당 호출을 차단하고 모델이 한도를 설명하거나 다른 선택지를 고를 수 있는 이유를 제공합니다.

샘플 Travel Buddy 에이전트에는 비트랜잭션 **BookFlight** 워크플로 도구와 **예약 정책 확인(Check booking policy)** 사전 도구 Hook이 있으며, **도구(TOOLS)** 필드로 해당 도구에 범위를 지정합니다. Hook은 제안된 운임을 샘플 USD 500 한도와 비교합니다.

도구는 `quoteId`, `totalMinorUnits`, `currency`를 받습니다. USD 금액은 정수 센트로 표현하므로 `65000`은 650달러입니다. 미리 보기 채팅에서는 도구가 값을 텍스트로 직렬화했기 때문에 워크플로는 금액 비교 전에 `int()`로 변환했습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/Example3_Policy_Workflow.png' | relative_url }}" alt="USD 500 샘플 한도를 불러와 결정을 반환하는 예약 정책 워크플로" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>샘플 워크플로는 운임 형식을 정규화하고 한도와 비교합니다. 프로덕션에서는 아래의 ID, 정책, 백엔드 검증이 필요합니다.</figcaption>
</figure>

| 단계 | 입력과 판단 |
|---|---|
| 제안 검증 | 구성된 도구 이름, 로그인 ID, 값이 있는 견적 ID, 양의 정수 운임, `USD` 통화를 요구합니다. |
| 정책 조회 | 권한이 부여된 정책 조회에서 `metadata.userAadObjectId`를 사용합니다. 샘플 레코드는 50000 USD 센트 한도를 제공합니다. |
| 정책 검증 | 적용 가능한 정책이 하나이고, 한도가 음이 아닌 정수이며 통화가 일치해야 합니다. |
| 금액 비교 | 한도를 초과하는 운임은 거부합니다. 유효한 운임이 한도 이하이면 허용합니다. |
| 결정 반환 | `permissionDecision`과 `permissionDecisionReason`을 설정합니다. `modifiedParameters`는 비워 원래 인수를 유지합니다. |

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/Example3_Policy_Preview.png' | relative_url }}" alt="제안된 BookFlight 인수와 사전 도구 Hook의 거부 응답을 보여 주는 Travel Buddy 미리 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실제 미리 보기 실행: 650달러 제안이 이유와 함께 거부됩니다. 에이전트는 BookFlight를 호출하지 않고 더 저렴한 견적을 요청합니다.</figcaption>
</figure>

승인할 때는 두 권한 출력 값을 모두 비워 둡니다. 검증이나 정책 조회 오류를 처리할 때는 이유와 함께 `deny`를 반환합니다. 예: "검증된 정책이 필요합니다. 정책 검증이 성공한 뒤 다시 시도해 주세요." `additionalContext`는 비워 두고 `suppressOutput`은 `false`로 설정합니다.

**실패 경로:** 사전 도구 Hook이 실패하거나 시간 초과되면 예약 도구가 계속 실행될 수 있습니다. 프로덕션 예약 서비스는 예약을 생성하기 전에 호출자, 견적 가격, 예산을 독립적으로 검증해야 합니다.

## 다른 Hook 이벤트

| 이벤트 | 입력 | 용도 |
|---|---|---|
| **도구 사용 후(Post tool use)** | `toolName`, `parameters`, `result` | 성공한 도구 결과에서 승인된 필드를 선택해 모델 처리 전에 `modifiedResult`로 반환합니다. |
| **도구 실패 후(After tool failure)** | `toolName`, `parameters`, `error` | 도구와 오류를 판별한 다음 일시적인 조회 오류에 제한된 재시도 정책 같은 안내를 `additionalContext`로 반환합니다. 에이전트는 이를 바탕으로 다음 단계를 선택합니다. |
| **오류(Error)** | `error`, `errorContext`, `recoverable` | 도구 호출 외부의 오류를 `errorHandling`의 `retry`, `skip`, `abort`로 처리합니다. 제한된 `retryCount`와 안전한 `userNotification`을 사용합니다. |

모든 필드는 [이벤트 참조](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/hooks-overview#supported-hook-events)를 확인하세요.

## 현재 동작 및 구현 요구 사항

### Hook 실패와 필수 검사

[현재 런타임은 실패 시 허용(fail open)합니다](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/hooks-overview#things-to-know). Hook에서 오류가 발생하거나 시간 초과되거나 읽을 수 없는 응답을 반환하면 기본 동작으로 실행이 계속됩니다.

Hook 워크플로에는 워크플로 응답 기한이 적용됩니다. 시간 초과되면 미리 보기 채팅에 워크플로 시간 초과로 Hook이 실패했다는 메모가 표시됩니다.

| 예제 | Hook 실패 시 결과 |
|---|---|
| 직원 맥락 | 에이전트는 기존 맥락으로 계속 진행합니다. |
| 프롬프트 비식별화 | 원본 프롬프트가 에이전트 처리로 이어질 수 있습니다. |
| 예약 검증 | 백엔드에서 독립적으로 적용하는 통제에 따라 도구 실행이 계속됩니다. |

사전 도구 검사는 PII 탐지, 개인정보 보호 적용, 정책 검증, 권한 부여, 데이터 손실 방지 또는 기타 컴플라이언스 검사를 수행할 수 있습니다. 실패하면 민감한 데이터가 노출되거나 정책상 차단해야 할 작업이 허용될 수 있습니다.

**필수 검사는 검증에 실패하면 보호 대상 작업을 차단해야 합니다.** 이를 실패 시 거부(fail closed) 동작이라고 합니다. Copilot Studio Hooks는 현재 실패 시 허용하므로, 도구나 기반 서비스에서 필수 규칙을 독립적으로 적용하세요. 예를 들어 Hook을 사용할 수 없더라도 예약 서비스가 예산 초과 예약을 거부해야 합니다.

워크플로는 서비스 오류를 포착해 `deny`를 반환함으로써 도구 호출을 차단할 수 있습니다. 하지만 워크플로 자체가 실패하거나 시간 초과되면 도구가 계속 실행될 수 있습니다. 이 두 상황을 별도로 테스트하고, 도구 호출 차단과 백엔드에서 트랜잭션 거부를 구분하세요. 민감한 데이터를 전송하는 도구라면 해당 데이터가 시스템 밖으로 나가기 전에 검사가 성공해야 합니다. 로그와 알림은 실패를 식별하는 데 도움이 되지만 작업을 막지는 않습니다.

### 비식별화와 데이터 보존

Hooks는 세 체크포인트에서 데이터를 비식별화할 수 있습니다. **사용자 프롬프트 제출(User prompt submitted)**은 `modifiedPrompt`를 반환해 에이전트에 전달되는 메시지를 바꿉니다. **도구 사용 전(Pre tool use)**은 `modifiedParameters`를 반환해 도구로 보내는 인수를 바꿉니다. **도구 사용 후(Post tool use)**는 `modifiedResult`를 반환해 모델이 받는 성공한 도구 결과를 바꿉니다.

이러한 변환이 이미 수신·저장된 데이터를 지우지는 않습니다. PII 예제에서는 Copilot Studio와 Azure Language가 원본 프롬프트를 받으므로, 대화 기록과 로그에 대한 접근 및 보존을 별도로 구성하세요. `suppressOutput`은 사용자에게 표시되는 출력에 적용되며 데이터 저장을 제어하지 않습니다.

### 기본 제공 도구에 Hooks 적용

**Hooks는 `web_search` 같은 기본 제공 지식 도구와 `bash` 명령 같은 CLI 도구도 지원합니다.** 먼저 에이전트에 도구를 하나 이상 추가해야 Hook 구성에서 **도구(TOOLS)** 필드가 나타납니다. 기본 제공 도구 호출에 Hook을 적용하려면 **도구 전체(All tools)**를 사용하도록 **도구(TOOLS)** 필드를 비워 둡니다. 이러한 기본 제공 도구는 도구 필터에서 개별 선택 항목으로 제공되지 않습니다.

Hook 입력에는 `toolName`이 포함되므로 워크플로에서 호출된 도구를 식별해 관련 로직을 적용할 수 있습니다. **도구 전체(All tools)**는 다른 도구 호출도 포함하므로, 이름에 따라 분기하기 전에 미리 보기에서 실제 이름을 확인하세요.

## Hooks 활용하기

Hooks는 실행의 중요한 시점에 워크플로를 연결해 지침을 넘어 에이전트 동작을 확장합니다. 범위가 명확한 사용 사례로 시작하고, 미리 보기에서 결과를 확인하고, 워크플로가 실패할 때의 동작도 계획하세요.

에이전트에서 Hooks가 가장 큰 차이를 만들 지점은 어디일까요? 개인화, 개인정보 보호, 도구 사용 결정 중 어떤 시나리오를 살펴보고 싶으신가요? 의견과 함께 댓글로 공유해 주세요.
