---
layout: "chapter"
date: 2026-02-19
title: "미션 06: 자연어와 AI로 커스텀 에이전트를 만들고 내 데이터로 그라운딩하기"
short_title: "대화형 에이전트 생성"
description: "자연어만으로 에이전트를 생성하고 SharePoint, 문서, 웹사이트 등 지식 소스로 그라운딩하는 방법"
order: 6
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/06-create-agent-from-conversation/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-02-19"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/06-create-agent-from-conversation/"
---

<div class="info-box note translated-post" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 06: Create a custom agent using natural language with AI and grounding it with your data](https://microsoft.github.io/agent-academy/recruit/06-create-agent-from-conversation/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

🎥 **워크스루 영상 보기**

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/video-thumbnail.jpg' | relative_url }}" alt="Create custom agent video thumbnail" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption><a href="https://www.youtube.com/watch?v=qZTtQVncGFg">YouTube에서 워크스루 보기</a></figcaption></figure>

## 🎯 미션 브리핑

돌아온 것을 환영합니다, 에이전트 메이커. 이번 미션에서는 Copilot Studio에서 가장 강력한 기능 — 오직 자연어만으로 커스텀 에이전트를 처음부터 만들고, 여러분의 데이터로 강화하는 작업을 지휘합니다.

이건 그냥 챗봇이 아닙니다. 여러분은 추론하고, 응답하고, 실제 엔터프라이즈 정보를 참조할 수 있는 지식 기반 디지털 동료를 만들고 있는 것입니다.

여러분의 무기는 자연어입니다. 여러분의 미션은 SharePoint, 업로드된 파일, 회사 URL을 활용해 IT 질문에 답하는 완전히 커스터마이징된 헬프데스크 에이전트를 설계·훈련·테스트하는 것입니다.

바닥부터 여러분의 에이전트를 만들어봅시다.

<div class="info-box note" markdown="1">
**참고** — Copilot Studio 화면이 이 강의의 스크린샷과 다르게 보인다면, 오른쪽 상단의 **New Experience**를 꺼서 여기서 사용하는 **클래식 경험**으로 전환하세요.
</div>

## 🔎 학습 목표

이번 미션에서 다음을 배웁니다:

1. 커스텀 에이전트가 무엇인지, 사전 빌드된 템플릿과 어떻게 다른지 이해하기
1. AI를 활용한 자연어 프롬프트로 에이전트 생성하기
1. SharePoint, 문서, 웹사이트를 포함한 엔터프라이즈 지식 소스로 에이전트 그라운딩하기
1. 생성형 오케스트레이션(generative orchestration)이 무엇이며, 에이전트가 여러 데이터 소스를 동적으로 검색·응답하는 방식 알아보기
1. 내 데이터로 질문에 답할 수 있는 완전한 기능의 IT 헬프데스크 에이전트를 빌드하고 테스트하기

## 🤔 커스텀 에이전트란 무엇인가?

커스텀 에이전트는 특정 작업이나 질문에 대해 사용자를 돕도록 Copilot Studio에서 직접 만들고 설계하는 챗봇 또는 가상 비서입니다. "커스텀"이라 불리는 이유는:

- **목적을 직접 정합니다** - 휴가 신청, 주문 상태 확인, IT 관련 질문 지원 등
- **대화를 직접 정의합니다** - 에이전트가 무엇을 말하고 어떻게 응답해야 하는지
- **여러분의 데이터로 그라운딩합니다** - 내장 지원되는 지식 리소스를 통해 엔터프라이즈 데이터에 연결
- **자체 시스템이나 애플리케이션과 연결합니다** - 커넥터, 플로우, REST API, model context protocol 서버 중 선택

<div class="info-box note" markdown="1">
**참고** — 이렇게 생각해보세요: 사용자와 대화하며 질문에 답하거나, 프로세스에 필요한 정보를 수집하거나, 엔터프라이즈 데이터에 연결하는 등의 작업을 대신 처리해주는 나만의 디지털 도우미를 만드는 것입니다.
</div>

### 🤖 커스텀 에이전트가 할 수 있는 일은?

커스텀 에이전트는 다음을 수행할 수 있습니다:

- 이름, 날짜, 선호도 등의 정보를 사용자에게 요청
- 해당 정보를 데이터베이스나 테이블에 저장
- 질문에 기반하여 데이터를 조회하고 답변
- 사용자가 직접 상호작용하지 않아도 자율적으로 동작
- 사용자 직접 요청 또는 이메일 전송·레코드 생성 같은 자율 동작을 트리거

### 👩🏻‍💻 커스텀 에이전트를 왜 사용하는가?

- 반복 작업을 자동화해 시간을 절약
- 사용자에게 친절하고 안내가 잘 된 경험을 제공
- 비즈니스나 프로젝트 요구에 맞게 맞춤화

### ✨ 예시

직원의 휴가 신청을 돕는 커스텀 에이전트를 만든다고 합시다.

이름, 휴가 날짜, 매니저 이름을 물어본 뒤, 휴가 요청을 관리하는 지정 시스템(예: SharePoint 목록)에 정보를 저장합니다.

이제 직원은 SharePoint 목록으로 이동해 새 항목을 만드는 대신, 에이전트와 채팅만 하면 됩니다.

## 🗣️ 자연어로 에이전트 생성하기

앞서 [레슨 05 - 사전 빌드된 에이전트로 빠르게 시작하기](/chapters/academy-recruit-05-using-prebuilt-agents/)에서 사전 빌드된 에이전트 템플릿으로 Copilot Studio에서 빠르게 에이전트를 만드는 법을 배웠습니다. 이번 레슨에서는 AI를 활용한 대화형 작성 경험을 살펴봅니다. Copilot Studio에서는 에이전트를 만들 때 코드를 작성할 필요가 없습니다. 여러분의 언어로 된 설명(자연어)만으로 에이전트를 쉽게 만들 수 있습니다.

자연어로 에이전트를 설명하며 시작하면, AI가 자동으로 에이전트의 이름, 설명, 지침(instructions)을 생성합니다. 또한 트리거, 채널, 지식 소스, 도구도 제안합니다. 이러한 제안은 수락하거나 무시할 수 있으며, 현재 세션 동안만 유지되고 저장되지는 않습니다.

## 🌱 "원하는 것을 설명하기"가 처음인데 어떻게 하나요?

자연어로 커스텀 에이전트를 만드는 것이 낯설게 느껴질 수 있습니다. Microsoft 제품과 서비스 전반에서 Copilot을 사용할 때마다, 여러분은 이미 _프롬프트_ 형태의 자연어를 사용하고 있습니다.

프롬프트란 AI 에이전트에게 원하는 작업을 알려주는 메시지나 지시입니다. 비서에게 방향을 알려주는 것이라고 생각하세요. 지시가 명확할수록 AI가 이해하고 실행하기 쉬워집니다.

### 🪄 프롬프트가 중요한 이유

- 에이전트의 동작을 안내합니다
- 어떤 종류의 대화를 해야 할지 에이전트가 이해하도록 돕습니다
- 좋은 프롬프트는 에이전트를 더 유용하고 정확하게 만듭니다

### 📝 좋은 프롬프트 작성 팁

- 명확하고 구체적으로 - 에이전트가 정확히 무엇을 하길 원하는지 말하세요
- 사용자 입장에서 생각하기 - 사용자가 뭐라고 말할까요? 에이전트는 뭐라고 답해야 할까요?
- 예시를 포함하기 - 가능하다면 샘플 상호작용을 제시하세요

<div class="info-box note" markdown="1">
**✨ 예시** — HR 팀이 휴가 신청을 돕는 에이전트가 필요하다고 합시다.

프롬프트는 다음과 같을 수 있습니다:

`I want to build an agent that helps users submit a vacation request. When a user says they want to request time off, the agent should ask for their name, the start date of their vacation, the end date of their vacation, and their manager's name. Once the user provides this information, the agent should save it to a SharePoint list called 'Vacation Requests' and post a notification in a dedicated Microsoft Teams channel.`

이 프롬프트가 잘 동작하는 이유:

- **목표를 명확히 제시** - 휴가 신청 제출
- **사용자 상호작용을 설명** - 사용자가 무엇을 말하고 에이전트가 무엇을 물어야 하는지
- **필요한 데이터를 나열** - 이름, 시작일, 종료일, 매니저
- **데이터가 저장될 위치를 명시** - Vacation Requests라는 SharePoint 목록
</div>

## 🔮 에이전트를 만들었으면, 다음엔 어떻게 지식으로 그라운딩하나요?

Copilot Studio에서 지식 소스란 에이전트가 더 나은 답변을 하기 위해 정보를 찾을 수 있는 장소입니다. 이러한 소스를 추가하면 에이전트는 Power Platform, Dynamics 365, 웹사이트 및 회사가 사용하는 다른 시스템·서비스의 엔터프라이즈 데이터를 가져올 수 있습니다.

이 소스들은 AI와 함께 동작하여 에이전트가 사용자 질문에 더 정확히 응답하도록 도우며, 이를 **생성형 오케스트레이션(generative orchestration)**이라고 합니다.

### 🌿 에이전트 맥락에서 생성형 오케스트레이션이란?

생성형 오케스트레이션은 에이전트가 내장된 언어 능력과 추가된 지식 소스의 정보를 결합하여 AI로 질문에 답하는 방식을 동적으로 결정하는 것을 의미합니다.

사용자가 질문하면 에이전트는:

- AI를 사용해 질문을 이해합니다
- 누락된 정보가 있으면 즉석에서 질문을 생성해 사용자에게 요청할 수 있습니다
- 가장 관련성 높은 지식 소스를 선택합니다
- 해당 소스에서 답을 검색합니다
- 찾은 정보를 사용해 자연스럽고 유용한 응답을 생성합니다

### 🏦 지식 소스가 중요한 이유

1. **더 똑똑한 답변** - 지식 소스를 추가하면 에이전트가 조직의 실제 데이터를 사용해 더 정확한 답을 줄 수 있습니다.

1. **수작업 감소** - 모든 가능한 응답을 직접 작성할 필요가 없습니다. 에이전트가 추가된 소스를 검색해 자동으로 응답합니다.

1. **신뢰할 수 있는 정보 사용** - Dataverse, SharePoint, 회사 웹사이트 등 이미 사용 중인 시스템에서 답을 가져와 사용자가 신뢰할 수 있는 정보의 출처를 갖게 됩니다.

1. **생성형 AI와 함께 동작** - 사전 프로그래밍되지 않았거나 시작 프롬프트로 추가되지 않은 질문이라도, 지식 소스와 AI가 함께 자연스럽게 이해하고 응답하도록 돕습니다.

1. **유연하고 확장 가능** - 설정 중이나 이후 언제든 지식 소스를 추가할 수 있어, 필요가 변하면 에이전트도 더 똑똑해집니다.

<div class="info-box note" markdown="1">
**✨ 예시** — 직원의 HR 질문을 돕는 에이전트를 만든다고 합시다. 회사의 HR 정책 문서와 SharePoint 사이트를 지식 소스로 추가합니다.

직원이 _"휴가는 며칠 받을 수 있나요?"_라고 물으면, 에이전트는 생성형 오케스트레이션을 사용해 해당 소스를 검색하고 여러분이 직접 답을 작성할 필요 없이 올바른 정책으로 응답합니다. 직원이 물어볼 수 있는 모든 질문을 미리 대비할 필요가 없어 시간이 절약됩니다.
</div>

## 추가할 수 있는 지식 소스 유형

1. **퍼블릭 웹사이트**
    - **하는 일:** Bing을 사용해 특정 웹사이트(예: 회사 사이트)를 검색합니다.
    - **유용한 이유:** FAQ나 제품 정보 같은 공개용 정보를 가져오는 데 좋습니다.

1. **문서**
    - **하는 일:** PDF나 Word 파일처럼 에이전트에 직접 업로드한 문서를 사용합니다. 업로드된 파일은 Dataverse에 안전하게 저장됩니다.
    - **유용한 이유:** 내부 가이드, 매뉴얼, 정책에 기반해 질문에 답할 수 있게 합니다.

1. **SharePoint**
    - **하는 일:** [Work IQ](https://www.microsoft.com/en-us/microsoft-365/blog/2025/11/18/microsoft-ignite-2025-copilot-and-agents-built-to-power-the-frontier-firm/#microsoft-365-copilot-with-work-iq-ai-built-for-work)로 구동되는 SharePoint 폴더나 파일에 연결합니다.
    - **유용한 이유:** SharePoint에 저장된 팀 문서, HR 정책, 프로젝트 파일에 접근하기 좋습니다.

1. **Dataverse**
    - **하는 일:** Dataverse 환경의 테이블·행에서 구조화된 데이터를 사용하며, 테이블·열에 대한 동의어와 용어집 정의를 적용해 에이전트 응답을 개선할 수 있습니다.
    - **유용한 이유:** 고객 정보 같은 Dataverse에 저장된 엔터프라이즈 데이터를 조회해야 할 때 유용합니다.

1. **커넥터를 통한 실시간 지식**
    - **하는 일:** Salesforce, ServiceNow, Dynamics 365, AzureSQL, Databricks 등 다른 엔터프라이즈 시스템의 실시간 데이터를 대화 중 사용자 권한으로 접근하게 합니다.
    - **유용한 이유:** 데이터를 저장·복제하지 않고도 최신의 안전하고 정확한 응답을 제공해 에이전트를 더 똑똑하고 안전하게 만듭니다.

1. **Azure AI Search**
    - **하는 일:** 시맨틱·벡터 검색을 사용해 Azure에 저장된 대량의 문서 집합을 검색하고 사용자 질문을 이해하게 합니다.
    - **유용한 이유:** 복잡한 데이터 소스에서 정확하고 신뢰할 수 있는 답변을 제공하고, 인용을 지원하며, 보안 접근 제어와 함께 대규모 문서 컬렉션에도 잘 확장됩니다.

## 🔒 보안 참고

### 지식 소스 인증

SharePoint나 Dataverse 같은 일부 소스는 사용자 인증이 필요합니다. 즉, 에이전트는 사용자가 볼 수 있도록 허용된 데이터만 응답에서 참조합니다. 반면 Azure AI Search처럼 Azure 계정과 인증 유형 지정이 필요한 등 추가 구성이 필요한 소스도 있습니다.

## Copilot Studio에서 에이전트 응답 개선하기

대화형 작성 경험으로 에이전트가 프로비저닝된 후에는, 프롬프트로부터 AI가 생성한 지침에 맞춰 에이전트를 테스트하고 싶을 것입니다. Copilot Studio에서 에이전트 응답을 개선하는 것은 목표를 명확히 이해시키고 적절한 정보를 갖추게 하는 것입니다.

1. **에이전트 지침 다듬기** - 에이전트가 어떻게 동작해야 하는지 알려주는 부분입니다. 명확하고 구체적인 언어를 사용하세요.

    예를 들어:

    ✅ "쉽게 설명하는 친절한 고객 지원 에이전트처럼 행동하세요."

    ❌ "도움이 되도록 하세요." (너무 모호함)

1. **톤과 언어 확인** - 에이전트의 톤이 대상 고객에 맞는지 확인하세요.

    다음과 같이 설정할 수 있습니다:

    - 친근하고 캐주얼한 톤
    - 전문적이고 간결한 톤
    - 지지적이고 인내심 있는 톤

1. **지식 소스 추가/업데이트** - 에이전트가 특정 주제에 답해야 한다면 올바른 정보에 접근할 수 있는지 확인하세요.

    - 웹사이트, 문서, FAQ 링크 추가
    - 콘텐츠를 최신 상태로 유지
    - 명확하고 잘 구조화된 정보 사용

1. **Topics와 Trigger 사용** - 에이전트가 특정 작업이나 대화를 처리해야 한다면, 트리거 문구가 있는 토픽을 만들 수 있습니다. 이는 대화를 더 정확하게 안내합니다. 다음 레슨에서 자세히 다룹니다.

1. **실제 질문으로 테스트** - 사용자가 물어볼 만한 종류의 질문을 에이전트에게 직접 던져보세요.

    답변이 좋지 않다면:

    - 시스템 지침을 조정하세요
    - 더 많은 예시나 지식을 추가하세요
    - 질문을 바꿔가며 응답을 확인하세요

1. **검토와 반복** - 에이전트 개선은 지속적인 과정입니다!

    게시 후:

    - 사용자 피드백을 수집하세요
    - 흔한 질문이나 혼란 지점을 관찰하세요
    - 에이전트 설정을 계속 다듬으세요

## 🧪 랩 06: Copilot Studio에서 커스텀 에이전트 만들기

이제 여러분의 데이터를 대상으로 채팅할 수 있는 커스텀 에이전트를 만드는 법을 배워봅시다.

### ✨ 사용 사례

[레슨 03 - Microsoft 365 Copilot용 선언형 에이전트 만들기](/chapters/academy-recruit-03-create-a-declarative-agent-for-M365Copilot/)와 같은 사용 사례를 사용합니다.

**직원으로서**

**나는** 기기 문제, 네트워크 트러블슈팅, 프린터 설정 같은 문제에 대해 IT 헬프데스크 에이전트로부터 빠르고 정확한 도움을 받고 싶습니다

**그래야** 지연 없이 생산성을 유지하고 기술 문제를 해결할 수 있습니다

시작해봅시다!

### ✨ 사전 준비 사항

- **SharePoint 사이트**

[레슨 00 - 코스 설정 - 3단계: 새 SharePoint 사이트 만들기](/chapters/academy-recruit-00-course-setup/)에서 만든 **Contoso IT** SharePoint 사이트를 사용합니다.

**Contoso IT** SharePoint 사이트를 아직 설정하지 않았다면, [레슨 00 - 코스 설정 - 3단계: 새 SharePoint 사이트 만들기](/chapters/academy-recruit-00-course-setup/)로 돌아가 설정하세요.

- **솔루션**

[레슨 04 - 에이전트용 솔루션 만들기](/chapters/academy-recruit-04-creating-a-solution/)에서 만든 **Contoso Helpdesk Agent** 솔루션을 사용합니다.

**Contoso Agent** 솔루션을 아직 설정하지 않았다면, [레슨 04 - 에이전트용 솔루션 만들기](/chapters/academy-recruit-04-creating-a-solution/)로 돌아가 설정하세요.

### 6.1 자연어와 AI로 에이전트 만들기

<div class="info-box note" markdown="1">
**⚠️ AI가 생성한 지침은 세션마다 다를 수 있음** — 자연어로 에이전트를 설명하며 시작하면, AI가 생성한 이름, 설명, 지침은 세션마다 달라질 수 있습니다. 제안되는 트리거, 채널, 지식 소스, 도구도 마찬가지입니다.
</div>

1. Copilot Studio의 홈 페이지로 이동해, 필드에 IT 헬프데스크 에이전트를 설명하는 다음 프롬프트를 입력합니다.

    ```text
    You are an IT Help Desk assistant that helps employees resolve common IT issues and find available devices. Be polite, concise, and helpful. Use Microsoft Support as the primary source: https://support.microsoft.com (and Microsoft Learn troubleshooting if needed: https://learn.microsoft.com/en-us/troubleshoot/). Do not invent steps - if you can't verify official guidance, say so and offer safe diagnostics + escalation.

    For troubleshooting:
    1) Ask ONE focused question if details are missing (goal, symptom/error, app/device).
    2) Try quick fixes first (restart, connectivity, sign-in, service status).
    3) Provide numbered step-by-step instructions (short, actionable).
    4) If not resolved, offer 1-2 alternative branches.
    5) After 2-3 branches, recommend escalation and provide a "ticket summary" of symptoms + error + device/app + what was tried.

    For devices:
    1) Ask what type of device do they need

    Never ask for passwords/OTP. Refuse requests to bypass security.
    Include relevant Microsoft Support links and preserve URLs.
    ```

    이 프롬프트는 다음을 포함합니다:

    - **역할과 목표:** IT 헬프데스크 어시스턴트
    - **주요 지식 소스** (웹사이트 지식 소스의 계층 포함)
    - **응답 스타일:** 정중하고, 간결하고, 도움이 되는
    - **트러블슈팅 흐름:** 질문 > 빠른 해결책 > 단계 > 분기 > 에스컬레이션
    - **에스컬레이션 산출물:** 티켓 요약
    - **기기 지원(기본)**
    - **보안 경계**: 비밀번호 없음, 보안 우회 없음
    - **링크 처리:** URL 보존, Microsoft Support 인용

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_01_Prompt.png' | relative_url }}" alt="Enter prompt" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Enter prompt</figcaption></figure>

1. [레슨 04 - 새 솔루션 만들기](/chapters/academy-recruit-04-creating-a-solution/)에서 선호 솔루션으로 선택한 솔루션에 에이전트가 만들어지는지 다시 한번 확인합니다.

    **wheel cog(톱니바퀴)** 아이콘을 선택하면 **Agent Settings** 모달이 나타나며, 앞서 만든 솔루션이 기본으로 선택되어 있는 것을 볼 수 있습니다. 이는 [레슨 04 - 새 솔루션 만들기](/chapters/academy-recruit-04-creating-a-solution/)에서 해당 솔루션을 선호 솔루션으로 선택했기 때문입니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_02_AgentSettings.png' | relative_url }}" alt="View of Agent Settings" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>View of Agent Settings</figcaption></figure>

1. **Cancel**을 선택합니다. 프롬프트 설명을 제출하면 Copilot Studio가 에이전트 프로비저닝을 시작합니다.

1. 에이전트가 프로비저닝되면 확인 메시지가 나타납니다. AI가 자동으로 에이전트의 **이름**, **설명**, **지침**을 생성한 것을 확인하세요. 오케스트레이션 모드는 기본으로 활성화되어 있고(**Settings**에서 확인 가능), 에이전트 응답 모델로는 기본 모델이 사용됩니다.

    <div class="info-box note" markdown="1">
    **⚠️ 알림: AI가 생성한 지침은 세션마다 다를 수 있음** — 자연어로 에이전트를 설명하며 시작하면, AI가 생성한 이름, 설명, 지침은 세션마다 달라질 수 있습니다. 제안되는 트리거, 채널, 지식 소스, 도구도 마찬가지입니다.
    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_03_AgentProvisioned.png' | relative_url }}" alt="Setting up agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Setting up agent</figcaption></figure>

1. 아래로 스크롤해 AI가 제안한 지식 소스, 도구, 트리거를 검토합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_04_KnowledgeAndTools.png' | relative_url }}" alt="Knowledge sources and tools sections with suggestions from AI" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Knowledge sources and tools sections with suggestions from AI</figcaption></figure>

1. 조금 더 스크롤해 Connected Agents, Topics, Suggested Prompts 섹션을 검토합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_05_ConnectedAgentsTopicsSuggestedPrompts.png' | relative_url }}" alt="Connected Agents, Topics and Suggested Prompts sections" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Connected Agents, Topics and Suggested Prompts sections</figcaption></figure>

1. 이제 에이전트가 `Contoso Helpdesk Agent` 솔루션에 올바르게 생성되었는지 다시 확인합니다. 오른쪽 상단의 **Settings**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_06_AgentSettings.png' | relative_url }}" alt="Select Settings" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Settings</figcaption></figure>

1. **Advanced**에서 에이전트가 `Contoso Helpdesk Agent` 솔루션에 생성된 것을 확인할 수 있습니다. 좋습니다! Settings에서 나갑니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_07_AdvancedSettings.png' | relative_url }}" alt="Solution created in Contoso Helpdesk Agent solution" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Solution created in Contoso Helpdesk Agent solution</figcaption></figure>

1. 이제 에이전트의 이름을 업데이트합니다. **Details** 섹션에서 **Edit**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_08_EditDetails.png' | relative_url }}" alt="Select Edit in Details section" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Edit in Details section</figcaption></figure>

1. 에이전트 이름으로 다음을 입력하고 업데이트된 세부 정보를 **Save**합니다.

    ```text
    Contoso Helpdesk Agent
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_09_AgentName.png' | relative_url }}" alt="Update agent name" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Update agent name</figcaption></figure>

1. 이제 제안된 지식 소스를 추가합니다. **Knowledge** 섹션에서 `https://support.microsoft.com` 웹사이트 URL에 대해 **+ Add**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_10_AddSuggestedWebsite.png' | relative_url }}" alt="Select add for the suggested website URL" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select add for the suggested website URL</figcaption></figure>

1. 해당 웹사이트 URL과 함께 **Add public websites** 모달이 나타납니다. **Add**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_11_AddWebsite.png' | relative_url }}" alt="Select add" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select add</figcaption></figure>

1. 아래 URL로 다른 웹사이트를 추가하고 **Add to agent**를 선택합니다.

    ```text
    https://learn.microsoft.com/troubleshoot/
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_12_AddAdditionalWebsite.png' | relative_url }}" alt="Add second website URL" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add second website URL</figcaption></figure>

1. 이제 두 웹사이트 URL이 에이전트의 지식 소스로 추가되었습니다. AI가 제안한 두 번째 항목을 제거하려면 **X Dismiss**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_13_SelectDismiss.png' | relative_url }}" alt="Select Dismiss" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Dismiss</figcaption></figure>

1. 기본적으로 **Web Search** 설정은 활성화되어 있습니다. 우리가 정의한 지식 소스만 사용하도록 **toggle**을 선택해 **Web Search** 기능을 비활성화합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_14_DisableWebSearch.png' | relative_url }}" alt="Disable Web Search" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Disable Web Search</figcaption></figure>

1. 이제 새로 만든 에이전트를 테스트해봅시다. 오른쪽 **Testing** 패널에서 **new test session** 아이콘을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_15_StartNewTestSession.png' | relative_url }}" alt="Select start new test session in testing pane" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select start new test session in testing pane</figcaption></figure>

1. **Testing** 패널에 다음 질문을 입력합니다.

    ```text
    How can I check the warranty status of my Surface?
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_16_EnterQuestion.png' | relative_url }}" alt="Test newly created agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Test newly created agent</figcaption></figure>

1. 이제 Activity map이 로드되어 에이전트가 처리하는 경로를 실시간으로 보여줍니다. 이 시나리오에서 에이전트는 질문을 이해하고 두 웹사이트 URL 지식 소스를 검색합니다.

    에이전트는 지침에 정의된 대로 번호가 매겨진 단계별 지침으로 정리된 답변으로 응답합니다. 응답에는 답변을 형성한 [https://support.microsoft.com](https://support.microsoft.com) 웹페이지에 대한 참조가 포함되어 있어, 사용자가 답변의 출처를 검증할 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_17_References.png' | relative_url }}" alt="References in response" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>References in response</figcaption></figure>

축하합니다! Copilot Studio에서 설명으로 시작해 첫 커스텀 에이전트를 만들었습니다 🙌🏻

### 6.2 SharePoint 사이트를 활용한 내부 지식 소스 추가

앞서 대화형 생성 경험 중에 외부 지식 소스로 퍼블릭 웹사이트를 추가했습니다. 이번에는 SharePoint 사이트를 활용한 내부 지식 소스를 추가합니다. [레슨 00 - 코스 설정](/chapters/academy-recruit-00-course-setup/)에서 만든 SharePoint 사이트를 사용합니다.

1. **Knowledge** 섹션에서 **+ Add knowledge**를 선택하고 **SharePoint**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.2_01_SelectSharePoint.png' | relative_url }}" alt="Select SharePoint" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select SharePoint</figcaption></figure>

1. [레슨 00 - 코스 설정](/chapters/academy-recruit-00-course-setup/)에서 만든 **SharePoint 사이트 주소**를 SharePoint URL 필드에 붙여넣고 **Add**를 선택합니다.

    SharePoint 사이트의 **이름**을 `Contoso IT`로 업데이트하고 **Add to agent**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.2_02_AddSharePointSite.png' | relative_url }}" alt="Update SharePoint site name and select Add to agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Update SharePoint site name and select Add to agent</figcaption></figure>

1. SharePoint 사이트가 이제 상태 _Ready_인 지식 소스로 추가되었습니다. Status 열은 지식 소스가 성공적으로 로드/연결되었는지, 문제가 있는지를 보여줍니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.2_03_SharePointSiteAdded.png' | relative_url }}" alt="SharePoint site status" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>SharePoint site status</figcaption></figure>

### 6.3 문서 업로드로 내부 지식 소스 추가

이제 에이전트에 문서를 직접 업로드하여 또 다른 내부 지식 소스를 추가합니다.

1. **Knowledge** 섹션에서 **+ Add knowledge**를 선택하고 **Upload file** 또는 **select to browse**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.3_01_SelectUploadFile.png' | relative_url }}" alt="Select upload files" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select upload files</figcaption></figure>

1. [샘플 파일](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/06-create-agent-from-conversation/assets/Contoso_Guest_WiFi_Connection_Guide.docx)을 다운로드해 파일 탐색기에서 선택합니다. **Open**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.3_02_SelectWordFile.png' | relative_url }}" alt="Select document" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select document</figcaption></figure>

1. 업로드할 파일이 선택되었습니다. 다음으로 **Add to agent**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.3_03_SelectAddToAgent.png' | relative_url }}" alt="Select Add to Agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Add to Agent</figcaption></figure>

1. 문서가 에이전트에 추가되는 중입니다. 업로드가 완료될 때까지 기다리고, 브라우저 창을 닫지 마세요.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.3_04_FileAdded.png' | relative_url }}" alt="Document added" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Document added</figcaption></figure>

1. 문서 상태는 처음에 _In progress_로 표시됩니다. 에이전트를 테스트하기 전에 상태가 **Ready**로 업데이트될 때까지 기다리세요.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.3_05_FileStatus.png' | relative_url }}" alt="File status" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>File status</figcaption></figure>

이제 에이전트를 테스트해봅시다!

### 6.4 에이전트 테스트

Contoso Helpdesk Agent에 질문을 하여 네 가지 지식 소스를 모두 테스트합니다.

1. 테스트 패널에서 **new test session** 아이콘을 선택합니다.

    퍼블릭 웹사이트(외부) 지식 소스를 테스트하기 위해 다음 질문을 입력합니다.

      ```text
      How can I find the serial number on my Surface device?
      ```

      <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_01_EnterQuestion1.png' | relative_url }}" alt="Select start a new test session icon" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select start a new test session icon</figcaption></figure>

1. 이제 에이전트가 지식 소스를 검토하고 웹사이트 지식 소스를 사용해 응답하는 것을 볼 수 있습니다.

    응답이 반환되며, 답을 형성한 웹페이지에 대한 참조가 있는 것을 확인하세요.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_02_Question1Response.png' | relative_url }}" alt="Question 1 response" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Question 1 response</figcaption></figure>

1. Activity map의 지식 모달을 아래로 스크롤하면 에이전트가 검색한 다른 지식 소스, 즉 다른 웹사이트 URL, SharePoint 사이트, 업로드된 파일을 볼 수 있습니다.

    다만 **Referenced sources** 섹션에는 첫 번째 웹사이트 지식 소스만 참조되었습니다. 답변은 첫 번째 웹사이트 지식 소스로 그라운딩되었습니다. 참조를 선택하면 해당 웹페이지로 이동합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_03_OtherSourcesSearchedOver.png' | relative_url }}" alt="Knowledge sources referenced and searched" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Knowledge sources referenced and searched</figcaption></figure>

1. 이제 SharePoint 사이트 지식 소스와 문서 지식 소스를 한 메시지로 함께 테스트해봅시다. 다음 질문을 입력합니다.

    ```text
    How can I access our company's Contoso VPN from my device? How do guests connect to the Contoso Guest wifi?
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_04_EnterQuestion2Question3.png' | relative_url }}" alt="Test SharePoint and document knowledge sources" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Test SharePoint and document knowledge sources</figcaption></figure>

1. 다시 한번 에이전트가 네 가지 지식 소스를 모두 검토해 한 메시지로 제출된 두 질문에 대한 응답을 생성하는 것을 볼 수 있습니다. 에이전트는 한 메시지 안에서 두 질문 모두에 답하고, 응답을 생성한 출처를 각각 별도로 제공합니다.

    Activity map의 지식 모달에서, Contoso VPN 접근에 관한 질문 1에 대해 SharePoint 사이트가 참조된 것을 볼 수 있습니다. Activity 모달에서 두 질문에 답하는 데 사용된 지식 소스를 전부 확인할 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_05_Question2Response.png' | relative_url }}" alt="Knowledge sources referenced for Question 1 and Question 2" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Knowledge sources referenced for Question 1 and Question 2</figcaption></figure>

1. Contoso Guest wifi에 관한 질문 2의 응답으로 아래로 스크롤합니다. 다시 한번, 해당 세부 정보를 담은 업로드된 파일로 그라운딩된 응답을 볼 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_06_Question3Response.png' | relative_url }}" alt="Question 3 response" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Question 3 response</figcaption></figure>

1. Activity 모달에서, 두 번째 웹사이트 URL도 참조되었지만 참조된 소스 중 하나로는 사용되지 않은 것을 확인하세요.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_07_OtherSourcesSearchedOver.png' | relative_url }}" alt="Activity modal of other sources searched over" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Activity modal of other sources searched over</figcaption></figure>

1. 생성된 응답이 올바른지 항상 검증하는 것이 좋습니다. 문서 참조를 선택하면 답변을 반영하는 문서 텍스트가 담긴 모달이 나타납니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_08_VerifyDocument.png' | relative_url }}" alt="Review document" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Review document</figcaption></figure>

에이전트는 한 메시지에서 여러 질문에 답하고, 지식 소스를 검색해 응답에 참조를 표시할 수 있습니다. 항상 참조를 검토해 응답이 올바른지 확인하세요.

## ✅ 미션 완료

축하합니다! 👏🏻 설명으로 시작해 나만의 커스텀 에이전트를 만드는 법을 배웠습니다. 여러분의 커스텀 에이전트는 네 가지 다른 지식 소스에 대해 채팅할 수 있습니다 🙌🏻

이것으로 **랩 06 - AI로 에이전트 만들기**가 끝났습니다. 다음 레슨으로 이동하려면 아래 링크를 선택하세요. 이 랩에서 만든 커스텀 에이전트는 다음 레슨의 랩에서 사용됩니다.

⏭️ [**새 토픽과 트리거 추가하기** 레슨으로 이동](/chapters/academy-recruit-07-add-new-topic-with-trigger/)

엘리트에 온 것을 환영합니다. 이제 여러분의 언어로 말하고, 여러분의 데이터를 참조하고, 팀을 지원하는 디지털 에이전트를 만드는 법을 알게 되었습니다. 계속 나아가세요—미션은 이제 막 시작되었습니다.

## 📚 전술 자료

🔗 [빠른 시작: 에이전트 만들고 배포하기](https://learn.microsoft.com/microsoft-copilot-studio/fundamentals-get-started?context=%2Fmicrosoft-365-copilot%2Fextensibility%2Fcontext/?WT.mc_id=power-172617-ebenitez)

🔗 [에이전트 만들고 삭제하기](https://learn.microsoft.com/microsoft-copilot-studio/authoring-first-bot?WT.mc_id=power-172617-ebenitez)

🔗 [핵심 개념 - 에이전트 작성](https://learn.microsoft.com/microsoft-copilot-studio/authoring-fundamentals/?WT.mc_id=power-172617-ebenitez)

📺 [자연어로 커스텀 에이전트 만들기](https://aka.ms/ai-in-action/copilot-studio/ep1)

📺 [에이전트에 지식 추가하기](https://aka.ms/ai-in-action/copilot-studio/ep2)
