---
layout: "chapter"
date: 2026-10-12
title: "Copilot Studio의 Hooks: 지침 이상의 기능을 에이전트에 더하기"
short_title: "Copilot Studio Hooks"
description: "Copilot Studio의 Hooks가 이벤트 기반 워크플로로 에이전트에 맥락을 더하고 데이터를 변환하며 작업 실행 전 검증을 수행하는 방법을 알아봅니다."
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
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/background-image.png' | relative_url }}" alt="Copilot Studio 에이전트 오케스트레이션 전후에 Hooks를 거치는 사용자 입력과 에이전트 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

GitHub Copilot 하네스로 구동되는 에이전트는 작업에 접근하는 방법과 호출할 도구를 추론합니다. 지침은 그 결정을 이끌지만, 모델이 선택할 때만 실행되는 것이 아니라 특정 이벤트가 발생할 때마다 실행되어야 하는 단계도 있습니다. **Hooks는 런타임이 사용자 로직을 호출하는 예측 가능한 체크포인트를 제공합니다.**

HR 에이전트는 직원의 국가와 선호 언어를 미리 파악한 상태로 대화를 시작할 수 있습니다. 마스킹 워크플로는 에이전트가 처리하기 전에 사용자 질문의 민감한 개인 정보를 가릴 수 있습니다. 예약 워크플로는 예약 도구가 실행되기 전에 제안된 요금이 직원의 예산을 넘는지 확인할 수 있습니다.

이 예시들은 Hooks가 맥락을 더하고, 데이터를 변환하고, 제안된 작업을 검증하는 방법을 보여 줍니다. 워크플로, 입력·출력 매핑, 실행 추적과 Hook 실패 시 동작을 살펴보겠습니다.

> Hooks는 현재 GitHub Copilot 하네스로 구동되는 에이전트에서 공개 미리 보기로 제공됩니다. 현재 Hooks에 액세스하려면 [copilotstudio.preview.microsoft.com](https://copilotstudio.preview.microsoft.com/)으로 이동해 해당 환경에서 사용할 수 있는지 확인하세요.

## 토픽 트리거에서 Hooks로

Standard 하네스를 사용하는 에이전트에서는 [토픽 트리거](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-triggers)를 통해 대화의 정해진 시점에 반응할 수 있습니다. **메시지를 받음**은 들어오는 메시지를 처리하고, **AI가 생성한 응답을 보내기 직전**은 응답 단계를 처리합니다.

GitHub Copilot 하네스 기반 에이전트는 세션 시작이나 도구 호출 전처럼 실행의 정해진 시점에 Hooks를 확장 지점으로 사용합니다. 모델이 선택하기를 기다리지 않고, 일치하는 이벤트가 발생하면 런타임이 구성된 로직을 호출합니다.

이 수명 주기 Hook 패턴은 [GitHub Copilot SDK](https://github.com/github/copilot-sdk/blob/main/docs/hooks/hooks-overview.md)에서도 사용할 수 있으며, 개발자는 `onSessionStart`, `onPreToolUse`와 같은 코드 핸들러를 사용합니다.

Copilot Studio에서는 현재 워크플로로 Hook 핸들러를 구현합니다. 핸들러는 이벤트 입력을 받고, 맥락을 추가하거나 값을 바꾸거나 제안된 도구 호출을 거부하는 출력을 반환합니다. Hook은 워크플로가 실행될 시점을 결정하며, 에이전트는 그 결과로 얻은 맥락과 판단을 바탕으로 작업 접근 방식을 결정합니다.

[에이전트 Skill](https://microsoft.github.io/mcscatblog/posts/modern-mcs-agent-skills/)은 작업 지침을 제공하고, Hooks는 이벤트에 따라 실행됩니다. [GitHub Copilot 하네스 기반 에이전트](https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/)도 참고하세요.

## Hook 구성하기

[Hook 추가](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/hooks-overview#add-a-hook) 안내에 따라 이벤트를 선택하고, 호환되는 워크플로를 만들거나 선택한 다음 에이전트에 연결합니다. 같은 워크플로를 여러 에이전트에서 재사용하고 에이전트, 사용자 또는 채널의 메타데이터를 바탕으로 적용할 규칙을 정할 수 있습니다.

## 1. 세션 시작 시 직원 맥락 불러오기

HR Buddy 에이전트는 직원의 복리후생 및 온보딩 질문에 답합니다. 유용한 답변을 하려면 맥락이 필요합니다. 직원의 국가에 따라 관련 안내가 달라지고, 고용 유형은 적용되는 정책에 영향을 주며, 선호 언어는 응답 언어를 결정합니다. 목표는 세션이 시작될 때 이러한 사실을 사용할 수 있게 하는 것입니다.

**시작(Start, pre-loop)**은 새 대화가 시작될 때 실행됩니다. 배포된 워크플로는 로그인한 직원의 프로필을 가져와 `additionalContext`를 반환합니다. 이 텍스트는 세션의 첫 사용자 메시지에 추가 컨텍스트 블록으로 첨부되어 모델이 추론과 응답에 활용합니다. 예를 들어 “Country: Greece”와 “Preferred language: Greek”은 HR Buddy가 관련 안내를 선택하고 그리스어로 답변하는 데 도움을 줍니다.

블록은 사용자 메시지와 함께 전달되지만 워크플로가 내용을 제공하므로 사용자가 직접 입력할 필요는 없습니다. 이는 에이전트의 지침과 대화를 보완합니다. HR 시스템은 계속해서 데이터 권한을 적용하고 복리후생 자격을 판단합니다.

샘플 HR Buddy 에이전트에서 **Load employee context**를 만들고, **Start (pre-loop)**를 선택한 다음 워크플로를 연결합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/Example1_Hook_Creation.png' | relative_url }}" alt="샘플 HR Buddy 에이전트에 Load employee context Hook을 추가하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Hook 생성 양식에서 세션 시작 이벤트를 직원 맥락 워크플로에 연결합니다.</figcaption>
</figure>

샘플 워크플로는 다음과 같이 동작합니다.

| 단계 | 입력과 출력 |
|---|---|
| 직원 식별 | Hook 입력에서 `metadata.userAadObjectId`를 읽습니다. |
| 프로필 조회 | ID를 샘플 직원 레코드와 대조합니다. 일치하는 프로필이 없으면 사유를 기록합니다. |
| 필드 선택 | `country`, `employmentCategory`, `preferredLanguage`, `onboardingStage`를 사용합니다. |
| 맥락 반환 | 값을 `additionalContext` 형식으로 반환하고, 일치하는 ID가 없으면 빈 맥락을 반환합니다. |

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/Example1_Context_Workflow.png' | relative_url }}" alt="로그인한 식별자를 읽고 샘플 프로필을 조회한 뒤 에이전트에 응답하는 직원 맥락 워크플로" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>프로덕션 환경에서는 샘플 프로필 단계를 인증 및 권한이 적용된 HR 조회로 대체하세요.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/HR_Buddy_SessionStart.png' | relative_url }}" alt="직원 맥락과 그리스어 후속 응답을 보여 주는 HR Buddy SessionStart 추적" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>HR Buddy 실행: Hook이 `additionalContext`에 직원 맥락을 반환하고, 이어서 도구 호출과 그리스어 응답이 진행됩니다.</figcaption>
</figure>

## 2. Azure Language로 프롬프트 마스킹하기

**사용자 프롬프트 제출(User prompt submitted)** 이벤트를 사용해 `prompt`를 Azure Language로 보내 PII를 감지하고, 서비스에서 마스킹한 텍스트를 `modifiedPrompt`로 반환합니다.

미리 보기 테스트에서는 Microsoft 문서의 샘플 사회 보장 번호가 포함된 육아휴직 질문을 제출합니다.

### 인증된 서비스 호출 구성

[Azure Cognitive Service for Language 커넥터](https://learn.microsoft.com/en-us/connectors/cognitiveservicestextanalytics/)의 **Detect Personal Information (V3.1)**을 사용하고 단계를 **Analyze prompt PII**라고 지정합니다.

| 설정 | 값 |
|---|---|
| 엔드포인트 | 승인된 Azure Language 리소스의 HTTPS 엔드포인트 |
| 인증 | 보안 커넥터 연결에 저장된 계정 키 |
| 작업 | Text Analytics v3.1을 사용하는 `EntitiesRecognitionPIIV3_1` |
| PII 범주 | 이 예시에서는 `USSocialSecurityNumber` |
| 로깅 옵트아웃 | `true` |

자격 증명은 보안 연결에 보관하고 승인된 호출자만 액세스하도록 제한합니다.

**Redact prompt PII**를 만듭니다. `prompt`를 문서의 `text`에 매핑하고, ID는 `prompt-1`, 언어는 `en`으로 설정합니다. 문서 객체를 전달하면 커넥터가 따옴표와 줄바꿈을 올바르게 직렬화합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/Example2_PII_Workflow.png' | relative_url }}" alt="인증된 Azure Language 작업과 동적 프롬프트 매핑을 보여 주는 PII 워크플로" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>워크플로가 Hook의 프롬프트를 Azure Language로 보내 결과를 검증하고 마스킹된 텍스트를 반환합니다.</figcaption>
</figure>

[범주](https://learn.microsoft.com/en-us/azure/ai-services/language-service/personally-identifiable-information/concepts/entity-categories)와 언어는 정책에 맞게 구성합니다. 이 예시는 영어와 하나의 범주를 선택하며 기본 마스킹은 별표를 사용합니다.

### 서비스 결과를 Hook 출력에 매핑

커넥터 결과와 문서를 검증합니다. `errors` 배열이 비어 있고, 일치하는 문서 ID가 정확히 하나이며, `redactedText`가 채워져 있고, 경고가 처리되었는지 확인합니다. 저장된 Parse JSON 스키마는 예상하지 못한 문서, 비어 있는 마스킹 텍스트, 비어 있지 않은 오류나 경고를 거부합니다.

일치하는 문서의 `redactedText`를 **Respond to the agent**의 `modifiedPrompt`에 매핑한 다음, 샘플 HR Buddy 에이전트의 **User prompt submitted** Hook에 워크플로를 연결합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/Example2_PII_Preview.png' | relative_url }}" alt="원본 프롬프트와 Hook이 반환한 마스킹된 modifiedPrompt를 보여 주는 샘플 HR Buddy 미리 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실제 미리 보기 실행: 사회 보장 번호는 별표로 바뀌고 육아휴직 질문과 요청한 응답 언어는 유지됩니다.</figcaption>
</figure>

마스킹된 텍스트만 전달하고 원래 값이 포함된 엔터티 세부 정보는 승인된 처리 경로 안에 보관합니다. 감지 결과가 없으면 원래 문구가 반환됩니다. 감지 범위는 제한적이므로 민감한 값이 남을 수 있습니다.

**실패 경로:** Hook에서 오류가 발생하거나 시간 초과되면 원래 프롬프트가 에이전트에 전달될 수 있습니다. 실패를 안전하게 처리한 진단 정보와 아래의 마스킹 및 데이터 보존 관련 액세스 제어를 구성하세요.

## 3. 예약 예산 확인하기

여행 에이전트가 직원의 항공편 선택을 돕습니다. 에이전트가 650달러 예약을 제안했지만 직원의 예산은 500달러라고 가정해 보겠습니다. 목표는 실행 직전 제안된 실제 예약을 확인하고, 예산 안에 드는 항공편을 선택하도록 명확한 이유를 에이전트에 제공하는 것입니다.

**도구 사용 전(Pre tool use)**은 도구 호출 직전에 실행되며 `toolName`과 `parameters`를 전달합니다. 워크플로는 제안된 요금과 통화를 별도로 조회한 정책과 비교한 뒤 판단을 반환합니다. `deny` 응답은 제안된 호출을 차단하고, 모델이 한도를 설명하거나 다른 선택지를 고를 수 있도록 이유를 제공합니다.

샘플 Travel Buddy 에이전트에는 트랜잭션을 수행하지 않는 **BookFlight** 워크플로 도구와 **Tools** 필드로 범위를 지정한 **Check booking policy** 도구 사용 전 Hook이 있습니다. Hook은 제안된 요금을 샘플 USD 500 한도와 비교합니다.

도구는 `quoteId`, `totalMinorUnits`, `currency`를 받습니다. USD 금액은 정수 센트로 표시하므로 `65000`은 650달러입니다. 미리 보기 채팅에서 도구가 이 값을 텍스트로 직렬화했기 때문에 워크플로는 금액을 비교하기 전에 `int()`로 변환합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/Example3_Policy_Workflow.png' | relative_url }}" alt="샘플 USD 500 한도를 불러와 판단을 반환하는 예약 정책 워크플로" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>샘플 워크플로가 요금을 정규화하고 한도와 비교합니다. 프로덕션에서는 아래의 ID, 정책, 백엔드 검증이 필요합니다.</figcaption>
</figure>

| 단계 | 입력과 판단 |
|---|---|
| 제안 검증 | 구성된 도구 이름, 로그인 ID, 입력된 견적 ID, 양의 정수 요금, `USD` 통화를 확인합니다. |
| 정책 조회 | `metadata.userAadObjectId`를 사용해 권한이 적용된 정책을 조회합니다. 샘플 레코드에는 USD 센트 기준 50000 한도가 있습니다. |
| 정책 검증 | 적용 가능한 정책이 하나이고, 한도가 음이 아닌 정수이며, 통화가 일치하는지 확인합니다. |
| 금액 비교 | 한도를 초과하는 요금은 거부하고, 유효하며 한도 이하인 요금은 허용합니다. |
| 판단 반환 | `permissionDecision`과 `permissionDecisionReason`을 설정합니다. `modifiedParameters`는 비워 두어 원래 인수를 유지합니다. |

<figure class="screenshot">
  <img src="{{ '/assets/catblog/hooks-in-copilot-studio/Example3_Policy_Preview.png' | relative_url }}" alt="제안된 BookFlight 인수와 도구 사용 전 Hook의 거부 응답을 보여 주는 Travel Buddy 미리 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실제 미리 보기 실행: 650달러 제안이 사유와 함께 거부됩니다. BookFlight를 호출하지 않고 에이전트가 더 저렴한 견적을 요청합니다.</figcaption>
</figure>

승인을 위해서는 두 권한 출력을 모두 비워 둡니다. 처리된 검증 또는 정책 조회 오류는 사유와 함께 `deny`를 반환합니다. 예: “검증된 정책이 필요합니다. 정책 검증에 성공한 뒤 다시 시도하세요.” `additionalContext`는 비우고 `suppressOutput`은 `false`로 둡니다.

**실패 경로:** 도구 사용 전 Hook이 실패하거나 시간 초과되면 예약 도구가 계속 실행될 수 있습니다. 프로덕션에서는 예약 서비스가 예약을 만들기 전에 호출자, 견적 가격, 예산을 독립적으로 검증해야 합니다.

## 기타 Hook 이벤트

| 이벤트 | 입력 | 용도 |
|---|---|---|
| **도구 사용 후(Post tool use)** | `toolName`, `parameters`, `result` | 성공한 도구 결과에서 승인된 필드를 선택해 모델 처리 전에 `modifiedResult`로 반환합니다. |
| **도구 실패 후(After tool failure)** | `toolName`, `parameters`, `error` | 도구와 오류를 확인한 뒤 일시적 조회 오류에 대한 제한된 재시도 정책 등 다음 단계를 위한 `additionalContext`를 반환합니다. |
| **오류(Error)** | `error`, `errorContext`, `recoverable` | `errorHandling`의 `retry`, `skip`, `abort`를 사용해 도구 호출 외부의 오류를 처리합니다. 제한된 `retryCount`와 안전한 `userNotification`을 설정합니다. |

모든 필드는 [이벤트 참조](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/hooks-overview#supported-hook-events)를 확인하세요.

## 현재 동작 및 구현 요구 사항

### Hook 실패와 필수 검사

[현재 런타임은 fail-open 방식으로 동작](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/hooks-overview#things-to-know)합니다. Hook에 오류나 시간 초과가 발생하거나 읽을 수 없는 응답을 반환하면 기본 동작으로 실행이 계속됩니다.

Hook 워크플로는 워크플로 응답 기한을 따릅니다. 시간 초과되면 미리 보기 채팅에 워크플로 시간 초과로 Hook이 실패했다는 알림이 표시됩니다.

| 예시 | Hook 실패 시 결과 |
|---|---|
| 직원 맥락 | 에이전트가 기존 맥락으로 계속 실행됩니다. |
| 프롬프트 마스킹 | 원래 프롬프트가 에이전트 처리로 전달될 수 있습니다. |
| 예약 확인 | 독립적인 백엔드 검증을 전제로 도구 실행이 계속됩니다. |

도구 사용 전 검사는 PII 감지, 개인 정보 보호 적용, 정책 검증, 권한 부여, 데이터 손실 방지 및 기타 규정 준수 검사를 수행할 수 있습니다. 이 검사가 실패하면 민감한 데이터가 노출되거나 정책상 차단될 작업이 허용될 수 있습니다.

**필수 검사는 검증에 실패하면 보호 대상 작업을 막아야 합니다.** 이를 fail-closed 동작이라고 합니다. Copilot Studio Hooks는 현재 fail-open이므로 필수 규칙은 도구나 기반 서비스에서 별도로 적용하세요. 예를 들어 예약 서비스는 Hook을 사용할 수 없어도 예산을 초과하는 예약을 거부해야 합니다.

워크플로는 서비스 오류를 처리해 `deny`를 반환하고 도구 호출을 차단할 수 있습니다. 그러나 워크플로 자체가 실패하거나 시간 초과되면 도구는 계속 실행될 수 있습니다. 도구 호출을 막는 경우와 백엔드에서 트랜잭션을 거부하는 경우를 구분해 각각 테스트하세요. 민감한 데이터를 보내는 도구는 해당 데이터가 시스템을 벗어나기 전에 검사를 성공적으로 마쳐야 합니다. 로그와 경고는 실패를 알아차리는 데 도움이 되지만 작업을 차단하지는 않습니다.

### 마스킹과 데이터 보존

Hooks는 세 지점에서 데이터를 마스킹할 수 있습니다. **사용자 프롬프트 제출**은 에이전트에 전달되는 메시지를 대체하는 `modifiedPrompt`를 반환하고, **도구 사용 전**은 도구에 전달할 인수를 대체하는 `modifiedParameters`를 반환하며, **도구 사용 후**는 모델이 받기 전에 성공한 도구 결과를 대체하는 `modifiedResult`를 반환합니다.

이러한 변환은 이미 수신되거나 저장된 데이터를 지우지 않습니다. PII 예시에서는 Copilot Studio와 Azure Language가 원본 프롬프트를 받으므로 대화 기록과 로그의 액세스 및 보존 정책을 별도로 구성하세요. `suppressOutput`은 사용자에게 표시되는 출력을 제어할 뿐 데이터 저장을 제어하지 않습니다.

### 기본 제공 도구에 Hooks 적용

**Hooks는 `web_search`와 같은 기본 제공 지식 도구와 `bash` 명령과 같은 CLI 도구도 지원합니다.** Hook 구성에 **Tools** 필드가 표시되도록 먼저 에이전트에 도구를 하나 이상 추가하세요. 기본 제공 도구 호출에 Hook을 적용하려면 **All tools**를 사용하도록 **Tools** 필드를 비워 둡니다. 이러한 기본 제공 도구는 도구 필터에서 개별적으로 선택할 수 없습니다.

Hook 입력에는 `toolName`이 포함되므로 워크플로에서 호출된 도구를 확인하고 적절한 로직을 적용할 수 있습니다. **All tools**에는 다른 도구 호출도 포함되므로, 이름을 기준으로 분기하기 전에 미리 보기에서 실제 도구 이름을 확인하세요.

## Hooks 활용하기

Hooks는 워크플로를 실행의 주요 시점에 연결해 지침 이상의 에이전트 동작을 확장합니다. 범위가 명확한 사용 사례부터 시작하고, 미리 보기에서 결과를 확인하며, 워크플로 실패 시 동작도 계획하세요.

여러분의 에이전트에서 개인화, 개인정보 보호, 도구 사용 판단 중 Hooks가 가장 큰 차이를 만들 영역은 어디인가요? 의견과 더 살펴보고 싶은 시나리오를 댓글로 공유해 주세요.
