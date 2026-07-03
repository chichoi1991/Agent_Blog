---
layout: "chapter"
date: 2026-03-11
title: "미션 11: 사용자로부터 피드백 수집하기"
short_title: "11. 사용자 피드백 수집"
description: "지속적인 개선을 위해 사용자 피드백을 수집하고 처리합니다"
order: 11
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/11-obtain-user-feedback/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-11"
canonical_url: "https://microsoft.github.io/agent-academy/operative/11-obtain-user-feedback/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 11: Collecting feedback from users](https://microsoft.github.io/agent-academy/operative/11-obtain-user-feedback/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <a href="https://youtu.be/QRBimOsgKEQ?si=05sjJwz6tv4MO6Z6" target="_blank" rel="noopener">
    <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11-collecting-feedback_Thumbnail_PlayButton.png' | relative_url }}" alt="피드백" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
</figure>

## 🎯 미션 개요

다시 오신 것을 환영합니다, Agent. [미션 10]({{ '/chapters/academy-operative-10-mcp/' | relative_url }})에서는 MCP 서버와 통합하여 여러분의 agent를 확장하는 방법을 배웠습니다.

이번 임무의 코드명은 **Operation Echo**입니다. 배포된 AI agent에서 실행 가능한 피드백을 추출하는 데 초점을 맞춘, 매우 중요한 정보 수집 임무입니다. 대화형 인텔리전스의 세계에서 사용자 만족도 데이터는 매우 가치 있습니다. 이 미션에서는 정보를 수집하는 두 가지 핵심 방법을 배웁니다.

**1단계: 감시** - 기본 제공 반응 메커니즘(👍🏻/👎🏻)을 배포해 사용자 감정을 모니터링합니다.

**2단계: 능동적 참여** - 더 깊은 인사이트가 필요할 때를 대비해, 목표 지향형 정보 수집을 위한 맞춤형 Adaptive Card 피드백 시스템을 구현합니다.

*듣고, 분석하고, 적응하라* — 이것이 사용자 인텔리전스를 처리하는 operative의 신조입니다.

<div class="info-box note" markdown="1">
**참고** — 이 강의의 스크린샷과 Copilot Studio 화면이 다르게 보인다면, 오른쪽 상단의 **New Experience**를 꺼서 여기서 사용하는 **classic experience**로 전환하세요.
</div>

## 🔎 목표

이 미션에서 배우게 될 내용은 다음과 같습니다.

1. 기본 제공 thumbs up/down 반응을 사용해 사용자 피드백을 수집하는 방법
1. Copilot Studio의 Analytics 대시보드를 사용해 피드백 데이터를 분석하는 방법
1. Adaptive Cards를 사용해 맞춤형 피드백 수집을 만드는 방법
1. CSAT 평점에 따라 조건부 피드백 흐름을 구현하는 방법
1. 고급 피드백 추적을 위해 Azure Application Insights에 맞춤형 telemetry 이벤트를 기록하는 방법

## 🐿️ 사용자 피드백의 중요성

사용자 피드백 수집은 대화형 agent의 성능과 사용자 만족도를 개선하는 데 매우 중요합니다. Microsoft Copilot Studio에서는 사용자가 AI가 생성한 응답을 받은 뒤 피드백을 수집하는 대표적인 메커니즘이 두 가지 있습니다.

- **기본 제공 thumbs up/down 반응** - 사용자가 각 응답에 대해 👍🏻 또는 👎🏻를 클릭할 수 있는 기본 제공 기능입니다.
- **Adaptive Cards를 통한 맞춤형 피드백** - 개발자가 대화 중 Adaptive Card를 삽입해 피드백(예: 평점 또는 의견)을 요청하는 사용자 지정 방식입니다.

### 왜 피드백을 수집해야 할까요?

agent 응답 뒤에 사용자 피드백을 수집하는 것은 지속적인 개선에 중요합니다. 이를 통해 만족도를 수치화하고, 지식의 공백을 식별하며, Copilot agent의 답변을 어떻게 다듬어야 하는지 직접적인 근거를 얻을 수 있습니다. 피드백 추세와 의견을 분석하면 더 나은 사용자 경험으로 이어질 개선 사항의 우선순위를 정할 수 있습니다.

## 💬 기본 제공 thumbs up/down 반응

Copilot Studio는 최종 사용자가 각 agent 응답에 대해 thumbs-up 또는 thumbs-down으로 반응할 수 있게 해 주는 기본 제공 reactions 기능을 제공합니다. 이 기능은 모든 신규 및 기존 Copilot Studio custom agent에서 기본적으로 활성화되어 있으며, agent가 사용되는 일반적인 채널 전반에 표시됩니다.

- Test Chat(Copilot Studio 작성 캔버스 안)
- Web(데모 또는 임베드된 웹사이트)
- Microsoft Teams(agent가 Teams 앱으로 배포된 경우)
- Custom Web chat SDK 통합
- Power Apps/Dynamics 365 채널(예: 라이브 채팅 위젯)

각 AI 응답 뒤에 사용자는 👍🏻/👎🏻 아이콘이 있는 작은 UI를 보게 됩니다. 사용자는 이 아이콘 중 하나를 클릭해 간단히 피드백을 제공할 수 있습니다. 필요하면 반응을 남긴 뒤 평점 이유를 설명하는 의견을 추가하라는 안내를 받습니다(예: 왜 thumbs down을 눌렀는지). 이러한 의견은 정성적 인사이트를 제공하며, 검토를 위해 대화 transcript(Dataverse)에 저장됩니다.

- Copilot Studio Analytics 페이지는 전체 반응 수와 긍정/부정 피드백 비율을 집계합니다.
- 사용자가 평점과 함께 의견을 남기면 그 내용은 대화 transcript에 저장됩니다. 이러한 의견은 analytics UI 또는 Dataverse 레코드(`conversationtranscript` 테이블)를 통해 확인할 수 있으며, 예를 들어 무엇이 "유용하지 않았는지" 같은 맥락을 파악하는 데 도움이 됩니다.

## 🪣 thumbs 반응의 목적과 가치

thumbs up/down 시스템의 주된 목적은 응답 단위에서 사용자 만족도를 측정하는 것입니다. 각 답변이 사용자의 요구를 충족했는지 여부에 대한 즉각적이고 세밀한 피드백을 제공합니다. 핵심 이점은 다음과 같습니다.

- **빠른 감정 신호**: thumbs-up은 사용자가 만족했음을 의미하고, thumbs-down은 불만족을 나타냅니다. 이 이진 신호는 사용자가 제공하기 쉽고, 개발자가 대규모로 해석하기도 쉽습니다.
- **집계된 “만족도” 지표**: *Copilot Studio Analytics*의 "Reactions" 섹션(더 넓은 Satisfaction analytics 아래)은 수집된 모든 피드백을 집계합니다. 시간 경과에 따라 긍정/부정으로 표시된 응답 수를 빠르게 확인할 수 있습니다. 이는 agent 응답에 대한 만족도 점수판 역할을 합니다.
- **개선 영역 식별**: thumbs-down 사례와 함께 남겨진 의견을 검토하거나 필터링하면 패턴을 발견할 수 있습니다. 예를 들어 특정 주제나 질문이 자주 부정적인 피드백을 받는다면, 지식 베이스를 개선하거나 프롬프트를 정교화할 좋은 후보입니다.
- **코딩 불필요**: 기본 제공 기능이므로 makers는 이 피드백을 수집하기 위해 별도 설정을 할 필요가 없습니다(설정은 기본적으로 켜져 있습니다). 데이터는 Copilot Studio analytics 대시보드에서 자동으로 확인할 수 있습니다.

### 왜 중요한가

이 반응 메커니즘은 사용자 관점에서 agent가 얼마나 잘 작동하는지에 대한 즉각적이고 객관적인 인사이트를 제공합니다. 사용자 피드백을 검토하면 새로운 사용자 시나리오와 문제를 식별하고, 사용자가 실제로 무엇을 요구하는지에 기반해 개선할 수 있습니다. 요약하면, thumbs up/down 피드백은 각 답변의 유용성을 빠르게 점검하는 수단입니다.

## 📊 피드백 Analytics 보기와 해석

Copilot Studio는 수집된 반응을 이해할 수 있도록 전용 analytics 보기를 제공합니다.

- **Reactions 차트**: agent의 **Analytics** 탭에서 **Satisfaction** 섹션에는 선택한 기간 동안 사용자가 👍🏻 또는 👎🏻를 몇 번 클릭했는지 집계하는 **Reactions** 차트가 있습니다. 이를 통해 긍정 대 부정 피드백 비율을 한눈에 파악할 수 있습니다. 예를 들어 전체 반응 100건 중 78건이 thumbs-up, 22건이 thumbs-down이면 응답당 만족도는 78%라고 해석할 수 있습니다.
- **필터와 세부 정보**: Reactions 차트에서 "See details"를 선택하면 더 깊게 확인할 수 있습니다. 일반적으로 여기에서 피드백 유형(전체/thumbs-up/thumbs-down)별로 필터링하고, 각 피드백에 연결된 사용자 의견 목록을 볼 수 있습니다. 의견은 매우 유용합니다. thumbs-down 자체는 문제를 알리지만, 사용자의 의견이 `"The answer was incorrect"` 또는 `"Didn't address my question"`처럼 이유를 설명해 줄 수 있기 때문입니다.
- **시간에 따른 추세**: analytics는 서로 다른 날짜 범위(최근 7일, 30일 등 최대 90일)로 볼 수 있습니다. 추세를 모니터링하면 최근 agent 변경이 만족도 향상으로 이어졌는지 확인할 수 있습니다. 예를 들어 새 지식 소스를 추가한 뒤 thumbs-up 비율이 높아졌는지 볼 수 있습니다.
- **세션 CSAT와 응답별 Reactions**: **Satisfaction** analytics에는 세션 종료 시점의 고객 만족도(CSAT) 설문을 위한 **Survey results** 섹션도 포함됩니다. 이것을 응답별 thumbs reactions와 혼동하지 마세요.
      - *Reactions*: 개별 답변에 대한 피드백(이 글의 초점)
      - *Survey Results*: 대화 끝에서 받는 선택적 전체 평점(1~5점 별점 설문)

  둘 다 **Satisfaction** analytics 아래에 표시되지만, thumbs reactions는 구체적으로 **Reactions** 차트를 채웁니다.

데이터 해석: 👍🏻 대 👎🏻 비율이 높다면 대부분의 답변이 적절하다는 뜻입니다. 특정 질문에서 👎🏻가 급증하면 AI의 오해나 지식 공백을 드러낼 수 있습니다. 예를 들어 많은 사용자가 "pricing" 관련 질문 뒤에 thumbs down을 남긴다면, 가격에 대한 agent의 답변이 오래되었거나 불완전하다는 신호일 수 있습니다. 개발자는 이런 채팅 transcript를 조사하고 해당 주제의 콘텐츠를 개선해야 합니다.

<div class="info-box note" markdown="1">
**모범 사례** — thumbs-down 피드백 의견을 정기적으로 검토하세요. `"The agent gave the wrong definition"` 또는 `"It didn't cite a source"`처럼 지식 베이스를 업데이트하거나 프롬프트를 다듬어 해결할 수 있는 직접적인 힌트를 담고 있는 경우가 많습니다.
</div>

## 📒 reactions 기능 관리

이 기능은 기본적으로 켜져 있으므로, makers는 이를 어떻게 관리할지 알고 있어야 합니다.

- 사용자 피드백 reactions를 비활성화할 수 있습니다. 예를 들어 이 데이터를 수집하고 싶지 않거나 테스트 기간 동안만 끄고 싶을 수 있습니다. agent의 **Generative AI Settings** 아래 **User feedback**에서 `Collect user reactions to agent messages` 토글을 `Off` 또는 `On`으로 전환할 수 있습니다. 기본값은 `On`입니다.
- 피드백 사용에 대한 **disclaimer**를 사용자에게 제공할 수도 있습니다. 예를 들어 `"Your feedback will be used to improve the service. Please do not include sensitive information in comments."` 같은 문구를 추가할 수 있습니다. 이는 특히 공개용 agent에서 투명성과 규정 준수를 위해 중요합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.0_01_UserFeedbackSettings.png' | relative_url }}" alt="사용자 피드백 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

- **데이터 저장소**: 사용자 의견을 포함한 모든 피드백 레코드는 agent의 Dataverse 환경에 대화 세션과 연결되어 저장됩니다. 필요하다면 고급 사용자는 Dataverse의 `conversationtranscript` 테이블을 직접 조회할 수도 있습니다. 예를 들어 모든 피드백 데이터를 오프라인 분석용으로 내보낼 수 있습니다. 하지만 대부분의 경우에는 기본 제공 analytics UI면 충분합니다.

<div class="info-box note" markdown="1">
**모범 사례** — agent가 공개용 또는 고객 대면용이라면 피드백 기능을 반드시 `On`으로 유지하세요. 매우 중요한 인사이트를 제공합니다. 반대로 제한된 파일럿 또는 내부 전용 agent라면 테스트 사용자를 혼란스럽게 하지 않도록 잠시 꺼 둘 수 있고, 실제 사용자 대상 시점에 다시 켤 수 있습니다. 항상 사용자 피드백 개인정보 보호 지침을 준수하세요(그래서 선택적 disclaimer가 중요합니다).
</div>

## 📇 Adaptive Cards를 통한 피드백 수집 - 맞춤형 접근 방식

기본 제공 기능의 대안으로 Adaptive Card를 이용한 맞춤형 피드백 프롬프트를 만들 수 있습니다. Adaptive Card는 [Recruit](https://microsoft.github.io/agent-academy/recruit/10-add-event-triggers/)에서 이미 다뤘습니다. 다시 정리하면, Adaptive Cards는 JSON으로 정의되는 UI 패널이며, agent의 대화에 삽입해 입력을 수집하거나 정보를 표시할 수 있습니다. 이 문맥에서는 예를 들어 `"Please rate this answer"` 같은 문구와 함께 드롭다운 또는 라디오 버튼 형태의 **Input.ChoiceSet element**를 보여 주는 카드를 설계하고, 사용자의 응답을 구조화된 데이터로 agent에 전달하게 됩니다.

기본 제공 reactions와 달리, 이 방법은 개발자 또는 maker가 agent의 topics를 구성해 카드를 삽입하고 응답을 처리해야 합니다. Copilot Studio에서는 topic 내 다음 노드들에서 Adaptive Card를 추가할 수 있습니다.

- **Ask a question**
- **Ask with adaptive card**
- **Send a message**

즉, agent가 답변을 생성한 직후 대화가 계속되기 전에 맞춤형 Adaptive Card를 이어서 표시해 피드백을 요청할 수 있습니다.

### 작동 방식

1. **답변 생성 및 저장**: 먼저 카드를 구성할 때 포함할 agent의 답변을 사용할 수 있어야 합니다. 예를 들어 Copilot Studio 가이드는 **Generative Answers** 노드를 사용해 답변을 만들고 이를 변수(예: `Global.VarStoreAnswer`)에 저장하는 방식을 제안합니다. 이 변수는 AI의 응답 텍스트를 담습니다.

1. **피드백 옵션이 있는 Adaptive Card 표시**: 답변 직후, Adaptive Card를 지원하는 노드를 추가해 답변 텍스트를 보여 주고 피드백을 요청합니다. 카드의 JSON은 사용자가 보게 될 내용을 정의합니다. 예를 들어 답변 텍스트, `"Was this answer helpful?"` 같은 프롬프트, 그리고 👍🏻 "Useful" / 👎🏻 "Not useful" 두 개의 액션 버튼을 둘 수 있습니다. 5점 평점, 의견용 텍스트 상자, 다중 선택 옵션 같은 다른 입력 형식을 설계할 수도 있습니다. Adaptive Cards는 매우 유연하므로 요구 사항에 맞게 피드백 질문 형식을 조정할 수 있습니다.

1. **사용자가 옵션 선택**: 사용자가 버튼을 클릭하거나 카드를 제출하면 그 동작은 payload를 agent에 반환합니다. 일반적으로 카드의 버튼은 사용자 지정 데이터를 담은 `Action.Submit`을 사용합니다. 예를 들어 한 버튼은 `{ "Feedback": "Useful" }`, 다른 버튼은 `{ "Feedback": "NotUseful" }` 값을 반환할 수 있습니다. 흔한 구현 패턴은 `"This generated answer was useful"` 또는 `"This generated answer wasn't useful"`처럼 제출 payload에 명시적인 값을 넣어 topic 로직이 안정적으로 분기하도록 하는 것입니다. 이 데이터가 사용자의 응답으로 돌아옵니다.

1. **Agent가 피드백 데이터 처리**: 이제 이 피드백으로 무엇을 할지는 agent 로직에 달려 있습니다. 제출된 응답을 topic 또는 trigger로 받아 처리할 수 있습니다. 예를 들어 adaptive card의 입력이 `This generated answer wasn't useful`와 같으면 특정 topic을 트리거해 `"Sorry to hear that. Could you tell me what was wrong?"` 같은 추가 질문을 하도록 구성할 수 있습니다. 또는 더 단순하게는 데이터 소스에 기록하고 `"Thanks for your feedback!"`라고 응답할 수도 있습니다.

1. **(선택 사항) 피드백 저장 또는 전달**: Adaptive Card로 수집한 피드백은 기본 제공 reactions처럼 Analytics에 자동 저장되지는 않습니다. 분석용으로 유지하려면 명시적으로 저장해야 합니다. 예를 들어 Power Automate 흐름이나 API를 호출해 데이터베이스 또는 SharePoint 목록에 피드백을 기록하고, 어떤 질문에 대한 피드백인지 같은 맥락도 함께 저장할 수 있습니다. 또는 이 피드백은 대화 transcript의 일부로 남기 때문에(사용자 선택이 사실상 사용자 메시지이기 때문) Dataverse 대화에는 저장됩니다. 다만 원시 텍스트/JSON 형태이므로 보고용으로는 직접 추출해야 합니다.

<div class="info-box note" markdown="1">
**모범 사례** — Copilot Studio의 Adaptive Cards는 agent가 지원하는 모든 채널에서 사용할 수 있지만, Adaptive Card 스키마 버전 차이에 유의해야 합니다. Copilot Studio는 웹 test chat에서 Adaptive Cards v1.6을 사용하지만, Microsoft Teams와 일부 다른 채널은 **v1.5**까지만 지원합니다. 즉 1.6 전용 기능으로 카드를 설계하면 Microsoft Teams에서는 렌더링되지 *않을 수 있습니다*. 가장 좋은 방법은 폭넓은 호환성을 위해 v1.5 기능만 사용하거나, 채널별로 직접 테스트하는 것입니다. 다행히 일반적인 피드백 카드(텍스트, 버튼)는 기본적인 구성이라 대부분의 채널에서 잘 동작합니다.
</div>

## 🦜 피드백에 Adaptive Cards를 사용하는 이유

피드백용 Adaptive Card를 사용하려면 추가 설정이 필요하지만, 더 큰 유연성과 제어력을 얻을 수 있습니다. 이 접근 방식을 선택할 만한 이유는 다음과 같습니다.

- **맞춤형 질문과 UI**: 단순 thumbs up/down에만 제한되지 않습니다. 사용자에게 1~5 점수로 평가하게 하거나, 답변을 좋아하거나 싫어한 이유의 범주를 고르게 하거나, 여러 선택지 중에서 고르게 하거나, 자세한 의견을 위한 개방형 질문을 던질 수도 있습니다. 시나리오에 맞게 카드 내용을 설계할 수 있습니다.
- **맥락 기반 또는 조건부 피드백**: 모든 응답 뒤에 피드백을 요청하고 싶지 않을 수 있습니다(사용자를 귀찮게 만들 수 있으므로). 자체 로직을 사용하면 특정 종류의 답변 뒤에만 요청하도록 제어할 수 있습니다. 예를 들어 긴 설명 뒤에만, 또는 세션이 끝나기 직전에만 물어볼 수 있습니다. 표현도 맞춤화할 수 있습니다. 답변이 오류 메시지였다면 카드에서 `"Sorry I couldn't help - was this error explanation useful?"`처럼 구체적으로 물어볼 수 있습니다. 이런 세밀함은 일반적인 thumbs UI로는 구현할 수 없습니다.
- **통합 워크플로**: 맞춤형 피드백 데이터는 다른 프로세스와 직접 통합할 수 있습니다. 예를 들어 사용자가 답변이 유용하지 않았다고 표시하면, 이후 인간 전문가가 검토할 수 있도록 자동으로 티켓을 만들 수 있습니다. 또는 **Azure Application Insights telemetry**에 기록해 고급 분석에 활용할 수도 있습니다. 즉 adaptive card 피드백은 자체 analytics 또는 DevOps 주기에 더 쉽게 연결됩니다. 기본 제공 thumbs 데이터는 Copilot analytics 대시보드 안에 어느 정도 고립되어 있지만, 사용자 지정 수집 데이터는 원하는 곳으로 라우팅할 수 있습니다.
- **브랜딩과 톤**: Adaptive Card 디자인 한도 내에서 피드백 카드를 agent의 성격이나 조직의 브랜딩에 맞게 꾸밀 수 있습니다. 텍스트도 `"Rate this response"`처럼 바꾸거나 버튼에 emoji를 사용해 일관된 사용자 경험을 만들 수 있습니다.
- **추가 피드백 수집**: 카드는 단순 감정 신호 이상을 수집할 수 있습니다. 예를 들어 하나의 카드에서 `"Was this helpful? (Yes/No)"`를 묻고, `"No"`인 경우 `"What was missing?"`라는 짧은 텍스트 박스도 함께 제공할 수 있습니다. 제출 시 모두 함께 처리할 수 있습니다. 이는 더 고급 방식이지만 유연성을 잘 보여 줍니다.

요약하면, 피드백용 Adaptive Cards는 이진 신호 이상이 필요하거나 피드백을 사용자 정의 방식으로 처리하고 싶을 때 이상적입니다. 기본 기능을 넘어서는 피드백 수집을 실험하려는 개발자들이 자주 사용하는 방식입니다.

## ⭐ Adaptive Card 피드백 모범 사례

1. **짧고 거슬리지 않게 유지하기**: 매번 설문을 작성해야 한다면 사용자는 쉽게 피로해집니다. 카드는 보통 두 개의 버튼이나 짧은 평점 척도가 있는 간단한 질문 정도로 유지하세요. 실무적으로는 생성된 답변 아래에 `"Generated answer, please rate it."` 같은 미묘한 프롬프트를 더하는 패턴이 좋습니다. 문구는 짧고 정중하게 유지하세요. 일상적인 피드백에 지나치게 크거나 복잡한 카드는 피하세요.

1. **응답을 자연스럽게 처리하기**: 사용자가 피드백 버튼을 눌렀을 때, 매번 `"Thanks for your feedback"`라고 말할 필요 없이 조용히 처리할 수도 있습니다. 지원 시나리오에서 누군가 답변이 유용하지 않았다고 하면, `"Sorry about that. Let me clarify or escalate your question."`처럼 후속 조치를 제공할 수 있습니다. 이는 부정적 피드백을 만족도 회복의 기회로 바꾸어 줍니다.

1. **데이터 처리와 개인정보 보호**: adaptive card의 피드백 데이터는 저장 관점에서 대화의 일부일 뿐입니다. 따라서 Copilot Studio Analytics 대시보드에는 *표시되지 않습니다*(해당 대시보드는 기본 제공 피드백 반응 메커니즘만 추적합니다). 또한 일반적인 compliance 감사에는 자동으로 별도 표시되지 않습니다(대개 사용자 메시지가 전송되었다는 사실은 기록하지만, Adaptive Card 제출 내용 자체를 구체적으로 기록하지는 않습니다). 따라서 이 피드백 분석이 중요하다면 수집 계획을 세워야 합니다. 대화에 의해 트리거되는 agent flow를 만들어 각 피드백 항목을 별도 Dataverse 테이블이나 외부 저장소에 기록하고, 사용자 ID·질문 내용 등 관련 정보도 함께 저장할 수 있습니다. 이렇게 하면 자체 보고 체계를 만들 수 있습니다.

1. **중복을 피하려면 기본 제공 reactions 비활성화**: 모든 답변에 대해 맞춤형 피드백 카드를 완전히 사용한다면, agent 설정에서 기본 thumbs 피드백을 꺼 두는 것이 좋을 수 있습니다. 그렇지 않으면 사용자에게 동일한 응답에 대해 두 번 피드백을 요청하게 되어 혼란스럽고 과도합니다. 대부분의 구현은 운영 환경에서 한 가지 방법만 선택합니다. 다만 서로 다른 맥락에서 둘 다 사용할 수도 있습니다. 예를 들어 Teams 사용자에게는 thumbs를 유지하고, 사용자 지정 웹사이트에서는 맞춤형 카드를 사용할 수 있습니다. 어떤 경우든 사용자가 중복된 피드백 프롬프트에 시달리지 않게 해야 합니다.

1. **모든 채널에서 테스트하기**: Adaptive Cards는 Teams와 웹 채팅에서 렌더링 방식이 조금씩 다를 수 있으므로, 배포된 각 채널에서 피드백 흐름을 테스트하세요. 카드가 의도대로 보이고 제출이 agent에 정상 수신되는지 확인해야 합니다. 예를 들어 Teams를 사용한다면 앞서 말했듯 카드 스키마가 *1.5 이하*인지 확인하세요. 또한 Teams 모바일 버전이나 웹 채팅에서도 adaptive card가 쉽게 사용 가능한지 검증하세요.

<div class="info-box note" markdown="1">
**참고** — 유용한 구현 패턴 중 하나는 `useful/not useful` 같은 adaptive card 값을 특정 처리 topic으로 라우팅하는 것입니다. 피드백 값을 의도 신호처럼 다뤄 후속 조치(예: 복구 또는 escalation)를 트리거하거나 단순히 상호작용을 종료하게 할 수 있습니다. 실제로는 agent의 topics(또는 코드)를 수정해 이러한 JSON 응답을 포착하고 처리한다는 뜻입니다.
</div>

## 🧇 비교 요약: thumbs reactions vs Adaptive Card 피드백

두 피드백 수집 방법 모두 사용자 입력을 통해 Copilot agent를 개선하는 것을 목표로 하지만, 서로 다른 요구를 충족합니다. 언제 무엇을 써야 할지 이해할 수 있도록 나란히 비교해 보겠습니다.

| 기능/측면 | 기본 제공 thumbs up/down reactions | Adaptive Card를 통한 맞춤형 피드백 |
| ---------- | ------------ | --------- |
| **설정과 노력** | 별도 설정이 필요 없습니다. 모든 agent에서 기본 활성화되어 있습니다. agent를 배포하기만 하면 사용자는 각 응답에서 👍🏻/👎🏻를 볼 수 있습니다. | 구성이 필요합니다. topics에 Adaptive Card 노드를 추가하고 JSON을 정의한 뒤 제출된 데이터를 처리해야 합니다. 개발자에게는 중간 정도의 노력이 듭니다. |
| **피드백 형식** | 이진 감정 신호(Positive 또는 Negative). 사용자는 선택적으로 의견을 추가할 수 있습니다. | 완전히 사용자 지정 가능합니다. 이진형일 수도 있고, 다중 선택, 평점 척도, 텍스트 입력 또는 그 조합일 수도 있습니다. 형식은 카드 JSON이 정의합니다. |
| **사용자 경험** | 단순하고 방해가 적습니다. thumbs up/down 한 번 클릭이면 됩니다. 모든 채널에서 동일한 방식(아이콘 버튼)으로 제공됩니다. | 더 풍부한 상호작용이 가능하지만 과도하게 사용하면 방해가 될 수 있습니다. 표현과 외형을 직접 제어할 수 있습니다. 채팅 UI를 압도하지 않도록 카드를 간결하게 유지해야 합니다. |
| **수집 데이터** | 반응(+ 선택적 의견). 예: `"thumbs down (with comment: 'irrelevant answer')"`. up/down 외의 구조화된 범주는 없습니다. | 설계한 모든 데이터. 예: `"Rating: 3 stars"` 또는 `"FeedbackChoice: NotUseful + Reason: Outdated info"`. 카드 제출은 파싱 가능한 JSON payload(키-값 쌍)로 수신됩니다. |
| **분석 및 가시성** | Copilot Studio **Analytics**의 **Satisfaction** 섹션에 자동 집계됩니다. 👍🏻 대 👎🏻 총계와 의견 필터/조회 기능을 제공합니다. | 기본적으로 Copilot Studio Analytics에는 표시되지 않습니다. 이러한 응답은 대화 흐름의 일부로 저장될 뿐이며 기본 대시보드에 집계되지 않습니다. 요약 보고가 필요하다면 직접 보고 메커니즘을 만들어야 합니다. |
| **확장성** | 제한적입니다(thumbs UI는 고정). 질문을 바꾸거나 추가 옵션을 넣을 수 없습니다. 켜고 끄는 것만 가능합니다. | 확장 가능합니다. Adaptive Card를 직접 설계하고 진화시킬 수 있습니다. 예를 들어 `"Partially helpful"` 같은 세 번째 옵션을 추가하거나 부정 응답 시 후속 질문을 할 수 있습니다. 언제 호출할지도 직접 정합니다(매 턴일 필요 없음). |
| **이상적인 사용 사례** | agent 답변의 전반적인 만족도 모니터링. 각 응답의 품질을 빠르게 측정하고 시간에 따라 추적할 간단한 성공 지표가 필요할 때 적합합니다. 최소 노력으로 폭넓은 피드백을 수집해야 하는 초기 배포에 특히 좋습니다. | 심층 피드백 또는 맞춤형 워크플로. 예를 들어 여러 답변 중 어느 것이 더 나은지, 또는 피드백을 다른 시스템(버그 리포트 생성, 사람 검토 트리거 등)과 통합해야 할 때 유용합니다. 기본 제공 reactions가 지원하지 않는 *category tags* 형식으로 피드백을 수집하고 싶을 때도 가치가 있습니다. |

말장난은 아니지만(no pun intended 😆), **새 agent라면 기본 제공 thumbs 피드백부터 시작**하는 것이 좋습니다. 시작이 쉽고, 사용자 만족도를 이해하는 데 즉각적인 가치를 제공합니다. 솔루션이 성숙해지면서 더 정교한 피드백이 필요하다고 느껴지면 Adaptive Card 접근 방식을 실험해 보세요.

고급 구현에서는 두 가지를 함께 쓰기도 합니다. 예를 들어 thumbs up/down은 *활성화*해 두되, 세션 끝에서 adaptive card를 통해 목표 지향형 질문(짧은 설문 등)을 추가로 던질 수 있습니다. 이 경우 응답별 감정 정보(reactions)와 세션 전체 평점 또는 의견(카드)을 모두 얻을 수 있습니다. 다만 기본 제공 CSAT도 앞서 설명한 대로 Copilot Studio Analytics에 포함된다는 점을 기억하세요. 따라서 이 미션에서 배운 것처럼, adaptive card의 응답은 직접 기록해 사용자 정의 보고 체계를 구축해야 합니다.

결국 대부분의 시나리오에서는 한 번에 한 가지 방법만 사용하는 편이 더 명확합니다. 맞춤형 adaptive cards를 선택한다면, 사용자에게 일관된 하나의 피드백 채널을 제공하기 위해 기본 제공 reactions를 비활성화하는 것이 합리적일 때가 많습니다.

## 🎀 마무리(요약)

| ⚡ **기본 제공 reactions: 빠른 성과** | 🛠️ **Adaptive cards: 맞춤형 적합성** |
| ------------ | ------------ |
| 기본 제공 👍🏻/👎🏻 reactions를 활성화해 각 답변에 대한 사용자 만족도를 빠르게 파악하세요. 이는 즉시 analytics를 제공하며(코딩 불필요), 문제 지점을 조기에 식별하는 데 도움이 됩니다. | `yes/no` 이상의 피드백이 필요할 때는 adaptive cards를 사용하세요. 맞춤형 질문을 던지고, 더 깊은 분석과 후속 조치를 위해 피드백을 자체 데이터 저장소나 워크플로로 연결할 수 있습니다. |

## 🧪 실습 11 - 기본 제공 상호작용과 adaptive cards(사용자 지정)를 사용한 피드백 제공

이제 다음 두 가지 방법으로 실제 사용자 입장에서 피드백을 제공해 보겠습니다.

1. 기본 제공 사용자 상호작용을 사용하고, agent의 Analytics 페이지에서 이를 검토합니다.
1. 사용자가 CSAT 설문에서 1점 또는 2점을 주어 불만족을 표시했을 때 피드백을 수집하는 맞춤형 adaptive card를 만듭니다. 보너스 실습으로 이 데이터를 Azure Application Insights에 telemetry 이벤트로 기록합니다.

### ✨ 이 미션을 완료하기 위한 사전 준비

기본 제공 상호작용이 agent의 Analytics 페이지에 표시되려면 agent가 게시되어 있어야 합니다. **Interview Agent**가 게시되었는지 확인하세요.

### 11.1 기본 제공 상호작용을 통한 사용자 피드백

1. Microsoft Teams에서 Interview Agent를 열고 질문을 시작합니다.

1. 응답에서 메시지 옆의 **thumbs up** 아이콘을 선택해 긍정적 피드백과 의견을 남기거나, **thumbs down**을 선택해 부정적 피드백과 의견을 남깁니다.

    1. 긍정적 피드백 의견 예시

        ```text
        Clear and Concise: The response was easy to understand and well-structured.
        ```

        ```text
        Accurate and Relevant: The information provided was correct and directly addressed the question.
        ```

        ```text
        Helpful and Actionable: The response included practical steps or examples that I could apply.
        ```

        ```text
        Comprehensive: The answer covered all aspects of the question without leaving gaps.
        ```

        ```text
        Engaging and Professional Tone: The response was friendly, respectful, and appropriate for the context.
        ```

        ```text
        Adapted to Context: The response considered the specific scenario and provided tailored guidance.
        ```

    1. 부정적 피드백 의견 예시

        ```text
        Incomplete or Vague: The response lacked detail or didn’t fully answer the question.
        ```

        ```text
        Inaccurate or Misleading: The information provided was incorrect or not relevant to the query.
        ```

        ```text
        Overly Complex or Hard to Follow: The explanation was confusing or used unnecessary jargon.
        ```

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.1_01_SubmitPositiveFeedback.png' | relative_url }}" alt="작성된 의견과 함께 긍정적 피드백 제출" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 작성형 피드백이 포함된 reactions를 여러 건 제출할 때까지 반복합니다.

### 11.2 기본 제공 analytics 검토

이제 agent의 **Analytics** 페이지에서 방금 제출한 피드백을 검토해 보겠습니다.

<div class="info-box note" markdown="1">
**참고** — 제출한 reactions와 작성형 피드백이 Analytics 페이지에 표시되기까지 약간의 시간이 걸릴 수 있습니다. 즉시 보이지 않더라도 잠시 후 다시 확인해 보세요.
</div>

1. agent의 **Analytics** 탭으로 이동한 다음 **Satisfaction** 섹션까지 스크롤합니다. **Reactions** 섹션에서 **See details**를 선택합니다. 그러면 **Reactions** 창이 열리고, 해당 기간의 모든 thumbs up / thumbs down과 작성형 피드백을 볼 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.2_01_Reactions.png' | relative_url }}" alt="제출된 reactions와 작성형 피드백" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

### 11.3 맞춤형 피드백 수집용 adaptive card 만들기

이 실습에서는 **Hiring Agent**에 기본 제공 CSAT 설문 응답에 대응하는 맞춤형 피드백 수집 프로세스를 구현합니다. 사용자가 CSAT 설문에서 1점 또는 2점을 선택했을 때, 왜 불만족했는지 이해하기 위해 추가 피드백을 수집하고자 합니다. 또한 기존 system topic을 수정하는 실전 경험도 얻게 됩니다.

여기서 배우게 될 내용은 다음과 같습니다.

1. 맞춤형 adaptive card를 포함하여 피드백을 수집하는 새 custom topic 만들기
1. 기존 System topic인 **End of conversation**을 수정해, 조건에 따라 맞춤형 피드백을 처리하는 새 custom topic으로 라우팅하기

시작해 봅시다!

#### 11.3.1 새 custom topic 만들기

1. **Hiring Agent**에서 **Topics** 탭으로 이동합니다. **+Add a topic**을 선택한 뒤 **From blank**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.1_01_AddTopicFromBlank.png' | relative_url }}" alt="빈 상태에서 새 topic 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. topic 이름을 다음과 같이 지정합니다.

    ```text
    Capture CSAT dissatisfied feedback
    ```

    Trigger 노드에서 **Change trigger** 화살표 아이콘을 선택한 다음 **It's redirected to**를 선택합니다. 이 새 topic은 기존 topic에서 **Go to another topic** 노드를 통해 명시적으로 호출될 때 트리거됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.1_02_RenameTopicAndConfigureTrigger.png' | relative_url }}" alt="topic 이름 변경 및 trigger 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 다음으로 사용자에게 맞춤형 adaptive card를 표시할 새 노드를 추가합니다. 이 카드는 CSAT 설문 응답에 기반한 불만족 피드백을 수집합니다. **+ 아이콘**을 선택한 다음 **Ask with adaptive card** 노드를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.1_03_AskWithAdaptiveCardNode.png' | relative_url }}" alt="Ask with Adaptive Card 노드 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 adaptive card를 구성할 차례입니다 😊 노드를 선택하면 **Adaptive Card Node properties** 창이 나타납니다. 이제 JSON을 편집하겠습니다. **Edit adaptive card**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.1_04_EditAdaptiveCard.png' | relative_url }}" alt="Adaptive Card 편집" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 여기는 **Adaptive Card Designer**이며, 카드를 설계하면서 실시간으로 결과를 볼 수 있습니다. **Card payload editor**를 클릭한 뒤 Windows 단축키 *Ctrl + A* 또는 Mac 단축키 *Command + A*로 전체 선택 후 내용을 삭제합니다. 그런 다음 [CSAT Feedback JSON file](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/operative/11-obtain-user-feedback/assets/11.3.1_CSATFeedback.json)의 JSON을 **붙여넣기** 하세요.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.1_05_UpdateJSON.png' | relative_url }}" alt="기본 JSON 값을 지우고 CSATFeedback.json 파일 내용 붙여넣기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 **Card Preview**에 텍스트와 사용 가능한 디바이스 목록을 보여 주는 요소들이 포함된 것을 확인할 수 있습니다. **Save**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.1_06_CardUpdated.png' | relative_url }}" alt="업데이트된 카드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **Preview**를 선택해 카드가 다양한 너비에서 어떻게 보이는지 확인합니다. 미리 보기 화면이 열리면 너비에 따라 다른 카드 출력이 표시됩니다. 이 JSON은 반응형 디자인을 고려하고 있으므로, 좁은 너비에서는 표준 너비와 다른 레이아웃이 표시됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.1_08_PreviewCardWidths.png' | relative_url }}" alt="다양한 너비에서 카드 미리 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **Preview** 화면에서 **x 아이콘** 또는 **Close**를 선택해 빠져나옵니다. 그런 다음 **Adaptive Card Node properties** 패널에서 **X Close**를 선택해 패널을 닫습니다.

1. topic의 작성 캔버스에서 adaptive card가 표시됩니다. 노드 하단으로 스크롤하면 출력 변수를 볼 수 있습니다. `notesId`와 `ratingId`는 element 속성에서 정의된 값입니다. 이 두 변수는 사용자가 카드 요소와 상호작용하며 입력한 값을 저장합니다. 이 값들은 이 랩의 보너스 실습에서 사용합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.1_09_CardOutputs.png' | relative_url }}" alt="카드 출력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

#### 11.3.2 End of Conversation system topic 수정

이제 **End of Conversation** system topic을 업데이트하여, 앞서 만든 **Capture CSAT dissatisfied feedback** custom topic으로 리디렉션되도록 하겠습니다.

1. **Topics** 탭으로 이동합니다. **System**을 선택한 다음 **End of Conversation** system topic을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_01_SelectEndOfConversationTopic.png' | relative_url }}" alt="End of Conversation system topic 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. `SurveyResponse` 변수를 검사하는 **Condition** 노드까지 아래로 스크롤합니다. 해당 노드 아래의 **+ 아이콘**을 선택하고 **Add node**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_02_AddNode.png' | relative_url }}" alt="노드 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **Variable management**를 선택한 뒤 **Set a variable value**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_03_SelectSetAVariableValue.png' | relative_url }}" alt="Set a variable value 노드 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **Create a new variable**를 선택합니다. 이는 사용자의 CSAT 질문 응답을 저장할 변수를 선언하기 위한 단계입니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_04_SelectCreateANewVariable.png' | relative_url }}" alt="새 변수 만들기 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 변수를 선택한 뒤 **Variable properties** 창에서 변수 이름을 다음과 같이 변경합니다.

    ```text
    VarCSATRating
    ```

    **To value** 필드에는 `0`을 입력합니다.

<div class="info-box note" markdown="1">
**참고** — **To value** 필드의 목적은 이렇습니다. 이 변수는 CSAT 평점을 저장할 숫자형 변수입니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_05_ConfigureVariableProperties.png' | relative_url }}" alt="Variable properties 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **CSAT Question** 노드에서 **... ellipsis** 아이콘을 선택한 뒤 **Properties**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_06_CSATQuestionProperties.png' | relative_url }}" alt="CSAT Question 노드 속성 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **CSAT Question properties** 패널에는 최종 사용자가 선택한 응답 평점을 저장할 변수를 참조하는 필드가 표시됩니다. 앞서 만든 변수를 참조하도록 다음 값을 입력합니다.

    ```text
    Topic.VarCSATRating
    ```

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_07_CSATQuestionProperties.png' | relative_url }}" alt="CSAT Question properties에서 변수 참조" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 다음으로 사용자가 1점 또는 2점으로 응답했을 때 **Capture CSAT dissatisfied feedback** custom topic으로 리디렉션되는 로직을 추가합니다. **CSAT Question** 노드 아래의 **+ 아이콘**을 선택하고 **Add a condition**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_08_AddAConditionNode.png' | relative_url }}" alt="Condition 노드 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 **Condition** 노드가 system topic에 추가되었습니다.

<div class="info-box note" markdown="1">
**참고** — Condition 노드에 적용할 로직은 다음과 같습니다.

- 사용자의 CSAT 평점이 `3`, `4`, `5`이면 대화 흐름은 이 조건에 연결된 분기를 따라갑니다. 이는 `3` 이상 점수에 대한 긍정적(만족) 피드백 경로가 됩니다.
- 평점이 `1` 또는 `2`이면 대화 흐름은 **All other conditions** 분기로 이동합니다. 이는 `3` 미만 점수에 대한 부정적(불만족) 피드백 경로가 됩니다.
</div>

    **Condition** 노드에서 **greater than** 아이콘을 선택해 변수를 정의합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_09_SelectAVariable.png' | relative_url }}" alt="변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **VarCSATRating** 변수를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_10_SelectVarCSATRating.png' | relative_url }}" alt="VarCSATRating 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 조건의 **operator**로 `is greater or equal to`를 선택합니다.

<div class="info-box note" markdown="1">
**참고** — 이 연산자는 VarCSATRating 값이 지정된 기준값 이상인지 확인합니다.
</div>

    **Value**에는 다음 정수를 입력합니다.

    ```text
    3
    ```

<div class="info-box note" markdown="1">
**참고** — 이 값은 기준 숫자입니다. VarCSATRating이 `3` 이상이면 조건은 `true`가 됩니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_11_AddIntegerValue.png' | relative_url }}" alt="정수 값 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 평점이 `3` 미만일 때(사용자가 1점 또는 2점을 선택했을 때)의 로직을 완성하겠습니다. **All other conditions** 분기에서 **+ 아이콘**을 선택해 새 노드를 추가합니다. **Topic management**를 선택한 뒤 **Go to another topic >**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_12_AddNodeInOtherConditionsPath.png' | relative_url }}" alt="Other Conditions 경로에 새 노드 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 앞서 만든 **Capture CSAT dissatisfied** custom topic을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_13_SelectCaptureCSATDissatisfiedFeedbackTopic.png' | relative_url }}" alt="Capture CSAT dissatisfied custom topic 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 해당 topic이 분기에 추가됩니다. 사용자가 CSAT 질문에 1점 또는 2점으로 응답하면 **End of Conversation** topic이 **Capture CSAT dissatisfied** custom topic을 명시적으로 호출하게 됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_14_RedirectNodeAdded.png' | relative_url }}" alt="Capture CSAT dissatisfied custom topic으로 리디렉션 노드 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. topic을 **Save**합니다.

1. 이제 **new test session** 아이콘을 선택해 agent를 테스트해 보겠습니다. 질문은 아무 것이나 입력해도 됩니다. 이 테스트의 목적은 3점 미만 평점에 대한 피드백을 수집하기 위해 CSAT 응답을 제출하는 것입니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_15_NewTestAndAskQuestion.png' | relative_url }}" alt="새 테스트 세션 시작 및 질문 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. agent가 응답을 반환합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_16_AgentResponse.png' | relative_url }}" alt="agent 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **End of Conversation** system topic을 트리거하기 위해 다음 문구를 입력합니다.

    ```text
    end conversation
    ```

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_17_EndConversation.png' | relative_url }}" alt="End of Conversation system topic 트리거" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 **End of Conversation** topic이 트리거되고, topic의 **Ask a question node**에 있는 텍스트(질문)가 표시됩니다. 대화를 종료할지 묻는 질문에 **Yes**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_18_YesEndConversation.png' | relative_url }}" alt="대화 종료에 Yes 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 다음으로, system topic의 다음 질문인 "질문이 해결되었는가"가 표시됩니다. **Yes**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_19_YesToAnsweringQuestion.png' | relative_url }}" alt="질문이 해결되었는지 묻는 질문에 Yes 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 CSAT 질문이 표시됩니다. 평점으로 1점 또는 2점을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_20_CSATSurvey.png' | relative_url }}" alt="CSAT 평점" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 제출한 CSAT 평점이 3 미만이므로, 이제 **End of Conversation** topic이 **Capture CSAT dissatisfied feedback** custom topic으로 리디렉션된 것을 볼 수 있습니다. 두 옵션 중 하나를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_21_RedirectToTopicForCustomFeedback.png' | relative_url }}" alt="맞춤형 피드백용 topic으로 리디렉션" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **Add comment** 또는 **^ caret** 아이콘을 선택해 작성형 피드백을 추가합니다. 다음은 선택한 이유별 예시 의견입니다.

    - agent가 내 응답이나 질문을 정확하게 이해하지 못함

        ```text
        I tried to explain my situation clearly, but the agent kept giving irrelevant answers. It felt like it wasn’t interpreting my input correctly.
        ```

    - 프로세스가 혼란스럽거나 따라가기 어려웠음

        ```text
        I wasn’t sure what to do next during the interaction. The conversation flow wasn’t intuitive, and I had to guess how to proceed.
        ```

    - 상호작용 중 기술적 문제가 있었음(예: 오류, 지연)

        ```text
        The agent froze midway and didn’t respond for a while. I also experienced delays and had to refresh the page to continue.
        ```

    - 위의 모든 문제

        ```text
        The experience was frustrating overall. The agent misunderstood my questions, the interface was hard to follow, and I ran into multiple technical glitches.
        ```

    다음으로 **Submit**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_22_WrittenFeedbackAndSubmit.png' | relative_url }}" alt="작성형 피드백 입력 및 제출" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **Capture CSAT dissatisfied** topic의 작업이 완료되면 agent는 다시 **End of Conversation** topic으로 돌아갑니다. 이어서 추가로 도와줄 일이 있는지 묻는 질문이 표시되며, 여기서는 **No**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_23_ResumesEndOfConversationTopic.png' | relative_url }}" alt="End of Conversation system topic 재개" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 마지막 노드가 최종 메시지를 보내고, **End of Conversation** topic이 완료됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_24_EndOfConversationTopicCompleted.png' | relative_url }}" alt="End of Conversation system topic 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

훌륭합니다! 🙌🏻 이제 `3` 미만의 CSAT 평점에 대해 작성형 피드백을 처리하는 adaptive card가 포함된 custom topic을 추가했습니다. 다음으로는 이 정보를 **Azure Application Insights**의 이벤트로 기록해 보겠습니다.

### 11.4 보너스: Azure Application Insights에 telemetry 기록하기

이 실습에서는 **Log custom telemetry event** 노드를 사용해 **Azure Application Insights**에 이벤트를 기록하는 방법을 배웁니다.

#### 사전 준비

- **Azure**에 [Application Insights resource](https://learn.microsoft.com/azure/azure-monitor/app/create-workspace-resource?tabs=portal#create-an-application-insights-resource)가 설정되어 있어야 합니다.
- **Connection string** 값을 가져오기 위해 해당 Application Insights resource에 접근할 수 있어야 합니다.

시작해 봅시다!

1. **Capture CSAT dissatisfied** custom topic으로 이동한 다음 **Ask with adaptive card** 노드 아래의 **+ 아이콘**을 선택합니다.

    **Advanced**를 선택한 뒤 **Log a custom telemetry event**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_01_AddLogACustomTelemetryEvent.png' | relative_url }}" alt="Log a Custom Telemetry Event 노드 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **... ellipsis**를 선택하고 **Properties**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_02_SelecProperties.png' | relative_url }}" alt="속성 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 Event name을 다음과 같이 정의합니다.

    ```text
    CSAT Dissatisfied
    ```

    Properties에는 다음 단계에서 평점과 작성형 피드백을 참조하는 Power Fx 수식을 사용합니다. **... ellipsis** 아이콘을 선택합니다.

    이에 대해 더 알아보려면 아래 추가 학습 블록을 펼쳐 보세요.

<details>
<summary>추가 학습: Event name과 Properties</summary>

🏷️ **Event name**

- 기록하려는 telemetry 이벤트의 **식별자**입니다.
- 나중에 analytics나 모니터링 도구에서 쉽게 인식하고 필터링할 수 있도록 붙이는 "라벨"이라고 생각하면 됩니다.

🦋 **예시**

- 사용자가 부정적인 피드백을 제출하는 순간을 추적하려면 이벤트 이름을 `CSAT Dissatisfied`로 지정할 수 있습니다.

🌿 **Properties**

- 추적할 속성으로, 변수·사용자 입력·오류 세부 정보 등 이벤트와 관련된 구체적인 데이터를 뜻합니다.

🦋 **예시**

- adaptive card를 통해 제출된 값을 조합한 데이터를 여기에 담을 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_03_EnterEventName.png' | relative_url }}" alt="Log custom telemetry event 속성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>
</details>

1. **Formula** 탭을 선택하고 다음 Power Fx 수식을 입력합니다.

    ```text
    "Feedback: " & Text(Topic.ratingId) & ", " & "Comment: " & If(IsBlank(Topic.notesId), "NA", Topic.notesId)
    ```

<div class="info-box note" markdown="1">
**참고** — 이 수식은 다음과 같이 해석할 수 있습니다.

1. `"Feedback: "`
    - 시작 부분에 `"Feedback: "` 라벨을 추가합니다.
1. `Text(Topic.ratingId):`
    - `Topic.ratingId`(사용자의 평점, 예: 1~5 숫자)를 텍스트로 변환해 이어 붙입니다.
1. `", "`
    - 구분을 위해 쉼표와 공백을 추가합니다.
1. `"Comment: "`
    - `Comment: ` 라벨을 추가합니다.
1. `If(IsBlank(Topic.notesId), "NA", Topic.notesId)`
    - `Topic.notesId`(사용자의 작성형 의견)가 비어 있는지 확인합니다. 비어 있으면 `"NA"`(없음)를 추가하고, 아니면 실제 의견을 추가합니다.

**예시**

- 사용자가 2점을 주고 `Too slow`라고 적었다면 결과는 `Feedback: 2, Comment: Too slow`가 됩니다.

**요약**

- 이 수식은 숫자형 피드백과 작성형 의견을 한 줄로 명확하게 묶어 기록하거나 표시할 때 사용하며, 의견이 없을 수 있는 경우도 처리합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_04_EnterFormula.png' | relative_url }}" alt="수식 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. topic을 **Save**합니다.

1. 다음으로 agent를 Application Insights resource와 연결합니다. **Settings**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_05_AgentSettings.png' | relative_url }}" alt="agent 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **Advanced**를 선택한 뒤 **Application Insights**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_06_ApplicationInsightSettings.png' | relative_url }}" alt="Application Insights 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 새 브라우저 창에서 Application Insights resource를 열고 **Overview** 아래 **Connection string** 필드의 복사 아이콘을 선택합니다. 그러면 connection string 값이 복사됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_07_CopyConnectionStringValue.png' | relative_url }}" alt="Connection string 값 복사" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. Copilot Studio로 돌아와 복사한 connection string 값을 **Connection string** 필드에 붙여넣습니다.

    업데이트된 설정을 **Save**합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_08_PasteConnectionStringAndSave.png' | relative_url }}" alt="Connection string 붙여넣기 및 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 CSAT 평점이 1점 또는 2점일 때 telemetry 이벤트가 Application Insights에 기록되는지 테스트할 수 있습니다. 앞서와 같은 단계를 반복하면서 agent에 질문을 하고, agent가 응답한 뒤 **End of conversation** topic을 트리거하기 위해 다음 문구를 입력합니다.

    ```text
    end conversation
    ```

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_17_EndConversation.png' | relative_url }}" alt="End of Conversation system topic 트리거" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 대화 종료를 묻는 질문에 **Yes**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_18_YesEndConversation.png' | relative_url }}" alt="대화 종료에 Yes 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 다음으로, 질문이 해결되었는지 묻는 system topic의 다음 질문에 **Yes**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_19_YesToAnsweringQuestion.png' | relative_url }}" alt="질문이 해결되었는지에 Yes 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 CSAT 질문이 표시됩니다. 평점으로 1점 또는 2점을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_20_CSATSurvey.png' | relative_url }}" alt="CSAT 평점" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **End of Conversation** topic이 **Capture CSAT dissatisfied feedback** custom topic으로 리디렉션됩니다.

    두 옵션 중 하나를 고르고, **Add comment** 또는 **^ caret** 아이콘을 눌러 작성형 피드백을 추가합니다.

    그런 다음 **Submit**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_14_SubmitFeedback.png' | relative_url }}" alt="피드백 제출" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **Capture CSAT dissatisfied** topic의 작업이 끝나면 agent는 다시 **End of Conversation** topic으로 돌아갑니다. 이어서 추가 도움이 필요한지 묻는 질문이 표시되면 **No**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_23_ResumesEndOfConversationTopic.png' | relative_url }}" alt="End of Conversation system topic 재개" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 마지막 노드가 최종 메시지를 보내고, **End of Conversation** topic이 완료됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.3.2_24_EndOfConversationTopicCompleted.png' | relative_url }}" alt="End of Conversation system topic 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 Application Insights에 기록된 custom event를 확인해 봅시다.

    Application Insights resource가 열려 있는 브라우저로 돌아가, 왼쪽 메뉴에서 **Events**를 선택합니다. **Who used** 드롭다운 필드에서는 `Any Custom Event`를 선택하고, **Events** 드롭다운에서는 앞서 Copilot Studio에서 만든 이벤트인 **CSAT Dissatisfied**를 선택합니다. 그러면 이벤트 이름이 **CSAT Dissatisfied**인 custom events만 표시됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_17_Events.png' | relative_url }}" alt="Application Insights 이벤트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 아래로 스크롤해 **View More Insights**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_18_ViewMoreInsights.png' | relative_url }}" alt="추가 인사이트 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 여기에서 agent가 기록한 custom event에 대한 더 자세한 정보를 볼 수 있습니다.

<div class="info-box note" markdown="1">
**참고** — 이 custom event가 agent와 연결되는 방식은 다음과 같습니다. 우리의 **CSAT Dissatisfied** custom event는 사용자가 adaptive card를 통해 피드백을 제출한 뒤, CSAT 설문에서 불만족을 보고했다는 telemetry 신호를 나타냅니다. Application Insights에 custom telemetry event를 기록하면 Copilot Studio로 만든 agent에서 발생한 특정 사용자 행동이나 피드백 신호를 추적하는 데 도움이 됩니다.
</div>

    **Event Statistics** 섹션으로 내려가 **CSAT Dissatisfied**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_19_ViewEventInsights.png' | relative_url }}" alt="이벤트 인사이트 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 **end-to-end transaction details**를 보고 있습니다. 이 화면은 이벤트 관련 telemetry를 깊이 있게 보여 주며, Traces & events 탭에 1개의 Event가 기록되었음을 나타냅니다.

    - 왼쪽 **Event Summary** 패널에는 로컬 시간, 유형, 이벤트 세부 정보가 표시됩니다. Details 열은 일반적으로 `event name`과 관련 `customDimensions`(메타데이터)를 참조합니다.
    - 오른쪽 **Event Properties** 패널에는 이벤트의 세부 분해 정보가 표시됩니다. **Custom properties**는 이벤트와 함께 전송된 사용자 지정 dimensions입니다.
        - `SerializedData` 속성에는 실제 피드백 메시지가 저장되며, 여기에는 기술적 문제와 사용자 의견이 포함됩니다.
        - `DesignMode`, `channelId`, `conversationId` 같은 다른 속성은 이벤트가 어디서 어떤 방식으로 발생했는지에 대한 맥락을 제공합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_20_CustomEventInformation.png' | relative_url }}" alt="custom event 정보" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 Application Insights에 기록된 이벤트를 조회하는 또 다른 방법을 배워 보겠습니다. 시간이 지나면 여러 서비스에서 발생한 이벤트가 Application Insights에 매우 많이 쌓일 수 있습니다. 이벤트를 조회하려면 app insights 데이터에 대해 Kusto query(Kusto 쿼리 언어)를 실행할 수 있습니다.

    왼쪽 메뉴에서 **Logs**를 선택하면 **Queries hub** 대화 상자가 자동으로 열립니다. **X 아이콘**을 선택해 닫습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_21_QueryLogs.png' | relative_url }}" alt="Queries hub 대화 상자 닫기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 기본적으로 이전에 실행한 Queries 목록이 표시됩니다. 데이터를 조회하려면 **Select a table**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_22_SelectATable.png' | relative_url }}" alt="조회할 테이블 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. `customEvents` 테이블을 선택하고 **Run**을 선택합니다. 그러면 `customEvents` 테이블에 대한 쿼리가 실행됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_23_RunCustomEvents.png' | relative_url }}" alt="customEvents 쿼리 실행" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 쿼리 결과가 표시됩니다. 기본값으로 최근 *24시간*의 이벤트가 보이며, *1000건*의 결과만 표시됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_24_customEventsResults.png' | relative_url }}" alt="customEvents 결과" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 현재 표시된 뷰는 **Simple mode**입니다. 이제 Kusto query를 적용할 수 있도록 **KQL mode**로 변경해 보겠습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_25_SelectKQLmode.png' | relative_url }}" alt="KQL 모드 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. Kusto query에는 다음을 입력합니다.

    ```text
    customEvents
    | extend FeedbackData = customDimensions['SerializedData']
    | where name == "CSAT Dissatisfied"
    ```

    쿼리를 **Run**합니다.

<div class="info-box note" markdown="1">
**참고** — 이 쿼리는 다음과 같이 해석할 수 있습니다.

- `customEvents`
  - Application Insights에서 모든 custom telemetry event를 저장하는 테이블을 가리킵니다.

- `| extend FeedbackData = customDimensions['SerializedData']`
  - 각 행에 `FeedbackData`라는 새 열을 추가하고, `customDimensions` 속성(이벤트에 붙은 사용자 지정 데이터 사전) 내부의 `SerializedData` 필드 값을 추출합니다.

- `| where name == "CSAT Dissatisfied"`
  - 이벤트 이름이 정확히 `CSAT Dissatisfied`인 항목만 포함하도록 결과를 필터링합니다. 즉, 불만족 CSAT 평점에 대한 피드백 이벤트만 보여 줍니다.

**요약**

이 쿼리는 `CSAT Dissatisfied`라는 이름의 custom telemetry event를 모두 가져오고, 추가 분석을 위해 직렬화된 피드백 데이터를 추출합니다. 사용자가 제출한 부정적 피드백을 검토할 때 유용합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_26_KustoQuery.png' | relative_url }}" alt="Kusto 쿼리" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 쿼리 결과가 표시됩니다. 결과 중 하나를 펼쳐 보세요.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_27_Results.png' | relative_url }}" alt="쿼리 결과" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 아래로 스크롤하면 Kusto query에서 정의한 새 `FeedbackData` 열을 볼 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-11-obtain-user-feedback/11.4_28_ExtendSerializedData.png' | relative_url }}" alt="FeedbackData 열" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

## ✅ 미션 완료

축하합니다! 👏🏻 정말 훌륭했습니다, Operative.

이번 마지막 미션에서 여러분은 agent의 피드백 루프를 닫는 방법을 배웠습니다.

**✅ 기본 제공 피드백**
사용자 피드백을 직접 제공하는 방법과, 피드백 analytics를 어디에서 검토하는지 배웠습니다.

**✅ Adaptive cards(사용자 지정)**
Adaptive card를 사용해 피드백을 수집하고 Azure Application Insights에 telemetry를 기록하는 방법을 배웠습니다.

피드백은 agent를 반복적으로 개선하는 데 핵심입니다. 선택 사항이 아닙니다. 좋은 agent가 위대한 agent가 되는 방식이 바로 이것입니다.

## 🎯 다음 단계

이제 여러분은 agent를 **프로토타입에서 운영 단계까지** 끌어올리는 데 필요한 모든 것을 갖추었습니다.

여기서 게시 과정을 다시 자세히 안내하지는 않겠습니다. **Recruit** 과정에서 이미 익혔기 때문입니다. 동일한 단계가 그대로 적용됩니다.

- agent를 **Microsoft Teams**에 게시하기
- 실제 사용자와 공유하기
- 피드백 수집 시작하기
- 반복 개선하기

복습이 필요하다면 [Recruit 게시 모듈](https://microsoft.github.io/agent-academy/recruit/11-publish-your-agent/)을 다시 보고, 곧바로 돌아와 마무리하세요.

<div class="info-box note" markdown="1">
**중요** — 과정을 완료하기 위해 체험판 라이선스를 사용 중이라면 게시할 수 없습니다. 이 랩의 배지를 받기 위해 게시가 필수는 아닙니다.
</div>

## 🏁 마지막 단계: 배포하고 배지 획득하기

🚀 **agent 게시하기**  
📊 **피드백이 실제로 유입되는지 확인하기**  
🏅 **Operative 배지 획득하기**

여러분은 Agent Academy: Operative를 완료했고, 실제 환경에서 동작하는 multi-agent system을 구축하는 방법을 이해하게 되었습니다.

이제 현장은 여러분의 것입니다.

👉 **[Operative 배지 받기]({{ '/chapters/academy-operative-course-completion-badges-operative/' | relative_url }})**

## 📚 전술 자료

📖 [agent에 대한 thumbs up/down 피드백과 의견 수집하기](https://learn.microsoft.com/power-platform/release-plan/2025wave1/microsoft-copilot-studio/collect-thumbs-up-or-down-feedback-comments-agents?source=recommendations?WT.mc_id=power-188561-ebenitez)

📖 [Copilot 및 관련 환경에서 향상된 사용자 피드백 사용 설정](https://learn.microsoft.com/dynamics365/fin-ops-core/dev-itpro/copilot/enable-copilot-feedback?WT.mc_id=power-188561-ebenitez)

📖 [대화형 agent의 효과 분석](https://learn.microsoft.com/microsoft-copilot-studio/analytics-improve-agent-effectiveness?WT.mc_id=power-188561-ebenitez)

📖 [Microsoft Copilot Studio와 Application Insights telemetry](https://learn.microsoft.com/dynamics365/guidance/resources/copilot-studio-appinsights?WT.mc_id=power-188561-ebenitez)

📖 [Adaptive Cards로 질문하기](https://learn.microsoft.com/microsoft-copilot-studio/authoring-ask-with-adaptive-card?WT.mc_id=power-188561-ebenitez)
