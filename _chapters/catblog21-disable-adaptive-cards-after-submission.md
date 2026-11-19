---
layout: "chapter"
date: 2026-11-11
title: "Copilot Studio 에이전트에서 제출 후 Adaptive Card 비활성화하기"
short_title: "Adaptive Card 제출 후 비활성화"
description: "WebChat을 쓰는 사용자 지정 포털과 Universal Actions를 쓰는 Teams에서 제출 후 Adaptive Card를 비활성화하거나 교체하는 방법"
order: 21
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/disable-adaptive-cards-after-submission/"
source_author: "mmonisha"
source_published: "2026-11-11"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/disable-adaptive-cards-after-submission/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 mmonisha(@mmonisha)가 작성한 원문 [Disabling Adaptive Cards After Submission in Copilot Studio Agents](https://microsoft.github.io/mcscatblog/posts/disable-adaptive-cards-after-submission/)(2026-11-11)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/disable-adaptive-cards-after-submission/header.png' | relative_url }}" alt="제출 버튼을 눌렀지만 카드가 완료되었다고 알려 주지 않는 상황" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

Adaptive Card 양식을 에이전트에 추가했다고 해 보겠습니다. 사용자가 값을 입력하고 제출을 누르자 방금 입력한 데이터가 사라집니다. 카드는 여전히 입력할 수 있는 것처럼 보이므로 사용자는 실패했다고 생각하고 다시 입력해 제출합니다. 이번에는 이미 대화가 다음 단계로 넘어가 오류가 발생합니다.

실제로 잘못된 것은 없습니다. 에이전트는 데이터를 받아 정상적으로 처리했습니다. 다만 카드가 사용자에게 그 사실을 알려 주지 않았을 뿐이고, 에이전트를 수천 명의 직원에게 배포하면 이 작은 간극이 실질적인 지원 문제로 커집니다.

다행히 해결할 수 있습니다. 단, 에이전트가 배치된 위치에 따라 적합한 해결 방법이 달라집니다. 사용자 지정 웹 포털과 Microsoft Teams에서 사용할 수 있는 방법이 서로 다르므로 두 가지를 모두 살펴보겠습니다.

## 발생 원인

Adaptive Card에는 기본 제공되는 “제출 후 비활성화” 동작이 없습니다. 사용자가 카드를 제출하면 다음과 같이 됩니다.

1. 입력 필드가 지워져 데이터가 화면에서 사라집니다.
2. 카드는 계속 상호 작용할 수 있는 상태로 남습니다.
3. 대화는 이미 다음 단계로 이동했으므로 두 번째 제출에서 오류가 발생합니다.

이는 에이전트 로직의 버그가 아니라 플랫폼 동작입니다. 에이전트는 데이터를 정상적으로 받아 처리했지만 사용자는 그 사실을 알 수 없습니다.

## 채널별로 다른 두 가지 패턴

해결 방법은 에이전트가 노출되는 위치에 따라 다릅니다.

| 채널 | 패턴 | 메커니즘 |
|---|---|---|
| 웹 포털(WebChat) | 첨부 파일 미들웨어 | 클라이언트에서 카드 비활성화 |
| Microsoft Teams | Universal Actions | 서버에서 카드 교체 |
| Microsoft 365 Copilot | 지원되는 해결 방법 없음 | `Action.Execute`가 처리되지 않음 |

먼저 두 가지 해결 방법을 살펴본 뒤 어느 방법도 적용되지 않는 Microsoft 365 Copilot 채널을 다루겠습니다.

## 패턴 1: 사용자 지정 웹 포털(BotFramework-WebChat)

> 이 패턴은 클라이언트를 직접 제어하는 BotFramework-WebChat SDK 기반 사용자 지정 웹 포털 또는 셀프 서비스 페이지에 에이전트를 포함할 때 적용됩니다.
>
> 이름이 비슷하더라도 Microsoft 365 [Employee Self-Service(ESS) 에이전트](https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/overview)에는 적용되지 않습니다. ESS는 클라이언트를 호스팅하지 않는 Microsoft 365 Copilot 채널에서 실행되므로 이 미들웨어를 연결할 위치가 없습니다. 해당 채널은 글의 마지막 부분에서 다룹니다.

아이디어는 간단합니다. WebChat의 **첨부 파일 미들웨어**를 사용해 카드가 가장 최근의 봇 메시지에 속하는지 확인합니다. 그렇지 않다면(사용자가 이미 다음 대화로 넘어갔다면) 비활성화된 카드로 렌더링합니다.

### 핵심 로직

미들웨어는 Adaptive Card 렌더링을 가로채 활동이 저장소의 최신 메시지인지 비교합니다.

```javascript
const attachmentMiddleware =
  () =>
  next =>
  ({ activity, attachment, ...others }) => {
    const { activities } = store.getState();
    const messageActivities = activities.filter(
      activity => activity.type === 'message'
    );
    const recentBotMessage = messageActivities.pop() === activity;

    switch (attachment.contentType) {
      case 'application/vnd.microsoft.card.adaptive':
        return (
          <AdaptiveCardContent
            actionPerformedClassName="card__action--performed"
            content={attachment.content}
            disabled={!recentBotMessage}
          />
        );

      default:
        return next({ activity, attachment, ...others });
    }
  };
```

핵심 줄은 `disabled={!recentBotMessage}`입니다. 봇이 새 메시지를 보내면 이전 카드는 비활성화됩니다. 입력은 읽기 전용이 되고 버튼은 작동하지 않습니다.

### CSS로 시각적 피드백 추가하기

버튼을 이미 사용했다는 점을 명확히 하려면 완료된 작업을 스타일링하는 CSS 클래스를 추가합니다.

```css
#webchat .card__action--performed {
  background-color: #0063b1 !important;
  border-color: #0063b1 !important;
  color: White !important;
}
```

제출한 버튼을 파란색으로 표시해 사용자가 명확하게 인식할 수 있게 합니다.

### 마운트하기

WebChat을 렌더링할 때 미들웨어를 전달합니다.

```javascript
<ReactWebChat
  attachmentMiddleware={attachmentMiddleware}
  directLine={directLine}
  store={store}
/>
```

> 이 방법은 **클라이언트 측** 해결책입니다. UI에서 재제출을 막지만 서버에서 이를 강제하지는 않습니다. 대부분의 셀프 서비스 포털 시나리오에는 충분합니다.

전체 동작 샘플은 [BotFramework-WebChat 리포지토리](https://github.com/microsoft/BotFramework-WebChat/tree/main/samples/05.custom-components/l.disable-adaptive-cards)에서 확인할 수 있습니다.

## 패턴 2: Microsoft Teams(Universal Actions)

WebChat 미들웨어는 Teams 클라이언트를 제어할 수 없으므로 Teams에는 적용되지 않습니다. Teams용 에이전트를 폭넓게 설계할 때는 [Teams 에이전트 패턴 글](https://microsoft.github.io/mcscatblog/posts/copilot-studio-teams-agent-patterns/)에서 전반적인 설계 고려 사항을 확인하세요. 이 문제에는 [**Universal Actions**](https://learn.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model)을 사용합니다. 이 모델을 통해 에이전트는 카드 작업에 응답하고 새 카드를 반환해 기존 카드를 교체할 수 있습니다.

### Universal Actions 작동 방식

| 순서 | 동작 |
|---|---|
| 1 | 사용자가 Teams에서 카드를 작성하고 제출합니다. |
| 2 | Teams가 `verb`가 포함된 invoke 활동을 에이전트로 보냅니다. |
| 3 | 에이전트가 데이터를 처리하고 `verb`에 따라 분기합니다. |
| 4 | 에이전트가 교체 카드를 반환합니다(HTTP 200). |
| 5 | Teams가 기존 카드를 확인 카드로 바꾸어 사용자에게 표시합니다. |

`Action.Submit` 대신 고유한 **verb**가 있는 `Action.Execute`를 카드에 사용합니다. 사용자가 버튼을 누르면 Teams가 invoke 활동을 Copilot Studio로 보냅니다. 토픽이 이를 받아 처리하고 새 카드를 반환하면 Teams가 기존 카드를 교체합니다.

사용자에게는 양식 대신 확인 카드가 표시됩니다. 혼동도 재제출도 없습니다.

### 1단계: `Action.Execute`로 카드 설계

Adaptive Card JSON을 직접 작성하기 어렵다면 [Copilot이 카드를 생성하도록](https://microsoft.github.io/mcscatblog/posts/adaptive-card-generation/) 한 다음 작업을 수정할 수 있습니다. 중요한 변경점은 작업 버튼입니다. `Action.Submit`을 `Action.Execute`로 바꾸고 `verb`를 추가합니다.

<details>
<summary><code>Action.Execute</code>를 사용하는 Adaptive Card 작업 버튼</summary>

<pre><code class="language-json">{
  "type": "ActionSet",
  "actions": [
    {
      "type": "Action.Execute",
      "title": "Submit",
      "verb": "feedbackSubmitForm",
      "data": { "actionType": "submitted" },
      "fallback": "Action.Submit",
      "style": "positive"
    },
    {
      "type": "Action.Execute",
      "title": "Skip",
      "verb": "feedbackSkipForm",
      "data": { "actionType": "skipped" },
      "associatedInputs": "none",
      "fallback": "Action.Submit"
    }
  ]
}
</code></pre>

</details>

> Universal Actions를 지원하지 않는 클라이언트에서도 카드가 정상적으로 작동하도록 `"fallback": "Action.Submit"`을 사용하세요.

### 2단계: “메시지 보내기” 노드로 전송

Copilot Studio에서 Adaptive Card JSON과 함께 [**메시지 보내기**](https://learn.microsoft.com/microsoft-copilot-studio/authoring-send-message) 노드를 사용합니다. [**Adaptive Card로 질문**](https://learn.microsoft.com/microsoft-copilot-studio/authoring-ask-with-adaptive-card) 노드는 사용하지 마세요. 이 노드는 내부적으로 `Action.Submit`을 사용하므로 invoke/refresh 흐름을 실행하지 않습니다.

### 3단계: 수신 토픽 만들기

invoke 활동에서 트리거되는 토픽을 만들고 다음 스키마로 들어오는 페이로드를 분석해 verb를 추출합니다.

```yaml
kind: Record
properties:
  action:
    type:
      kind: Record
      properties:
        data:
          type:
            kind: Record
            properties:
              userResponse: String
        id: String
        title: String
        type: String
        verb: String
  trigger: String
```

그런 다음 `resultData.action.verb`에 따라 분기합니다.

- `feedbackSubmitForm` → 입력을 처리하고 감사 카드 반환
- `feedbackSkipForm` → 건너뛰기 확인 카드 반환

### 4단계: 교체 카드 반환

응답은 Universal Action 응답 형식을 따라야 합니다.

<details>
<summary>교체 카드를 반환하는 Universal Action 응답</summary>

<pre><code class="language-json">{
  "statusCode": 200,
  "type": "application/vnd.microsoft.card.adaptive",
  "value": {
    "type": "AdaptiveCard",
    "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.5",
    "body": [
      {
        "type": "TextBlock",
        "text": "Thank you for your feedback!",
        "weight": "Bolder",
        "size": "Medium",
        "wrap": true
      },
      {
        "type": "TextBlock",
        "text": "Your response has been recorded.",
        "wrap": true,
        "isSubtle": true
      }
    ]
  }
}
</code></pre>

</details>

기존 카드가 교체됩니다. 버튼이나 입력 필드 없이 깔끔한 확인 메시지만 표시됩니다.

> Copilot Studio 테스트 캔버스가 아니라 Teams에서 직접 테스트하세요. 테스트 패널에서는 invoke/refresh 흐름이 작동하지 않을 수 있습니다.

[Nghiem Doan](https://github.com/nghiemdoan-msft)이 만든 이 패턴의 완전한 가져오기 가능 버전은 [CopilotStudioSamples 리포지토리](https://github.com/microsoft/CopilotStudioSamples/tree/main/authoring/solutions/adaptive-card-refresh)에서 솔루션으로 제공됩니다.

## Microsoft 365 Copilot 채널은 어떨까요?

앞의 두 패턴은 클라이언트를 직접 제어하거나(WebChat), Teams를 사용한다고 가정합니다. **Microsoft 365 Copilot** 채널은 어느 쪽에도 해당하지 않습니다. Microsoft 자체 [Employee Self-Service(ESS) 에이전트](https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/overview)를 비롯해 이곳에 표시되는 에이전트가 늘고 있어 이 차이가 중요합니다.

2026년 7월 현재 상황은 다음과 같습니다.

- **WebChat 미들웨어는 적용되지 않습니다.** 클라이언트를 호스팅하지 않으므로 첨부 파일 미들웨어를 연결할 위치가 없습니다.
- **Universal Actions는 실행되지 않습니다.** Adaptive Card의 `Action.Execute`는 [Microsoft 365 Copilot 채널에서 지원하지 않는 노드 형식](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-microsoft-teams#known-limitations)에 포함되므로 카드를 교체하는 invoke/refresh 흐름이 실행되지 않습니다.

현재 Microsoft 365 Copilot에서 제출 후 카드를 비활성화하거나 교체하는 지원 방법은 없습니다. 현실적인 방법은 설계를 조정하는 것입니다. 가능한 경우 카드는 정보 제공 용도로 유지하고, 제출이 많은 카드 대신 질문 노드나 대화 단계에서 입력을 받으세요. 클릭해도 아무 일도 없는 것처럼 보일 때를 대비해 카드 문구에 “접수됨”이 드러나도록 작성하세요.

> ESS는 혼동하기 쉬운 예입니다. 사용자 지정 포털 시나리오와 비슷해 보여 WebChat 해결책이 적용될 것 같지만, ESS는 클라이언트 측 확장이 닿지 않는 Microsoft 365 Copilot 채널에서 실행되며 Teams 카드 교체도 적용되지 않습니다. 같은 문제처럼 보여도 규칙은 다릅니다.

## 핵심 요점

- Adaptive Card는 제출 후 기본적으로 비활성화되지 않으므로 직접 구현해야 합니다.
- **사용자 지정 웹 포털**에서는 WebChat 첨부 파일 미들웨어를 사용해 클라이언트 측에서 카드를 비활성화할 수 있습니다. 깔끔하고 시각적이며 간단합니다.
- **Microsoft Teams**에서는 verb가 있는 `Action.Execute`와 Universal Actions를 사용합니다. Copilot Studio 토픽이 invoke를 받아 데이터를 처리하고 교체 카드를 반환합니다.
- 두 패턴은 같은 UX 문제를 서로 다른 방식으로 해결합니다. 채널에 따라 사용할 방법을 결정하세요.
- ESS가 실행되는 **Microsoft 365 Copilot** 채널에는 현재 어느 패턴도 적용되지 않습니다. `Action.Execute` 카드가 지원되지 않으므로 제출 후 상황을 고려해 설계하세요.
- 이전 버전과의 호환성을 위해 Universal Action 카드에는 `"fallback": "Action.Submit"`을 포함하세요.

## 완성도 높은 에이전트는 작은 순간들이 모여 만들어집니다

Adaptive Card는 에이전트에서 실제 입력을 받는 좋은 방법 중 하나입니다. 하지만 피드백 없는 입력은 사용자에게 추측만 하게 만듭니다. 고장 난 것처럼 느껴지는 에이전트와 완성된 에이전트의 차이는 사용자가 제출을 누르는 순간 화면에 무엇이 표시되는가에 달려 있기도 합니다. WebChat에서는 클라이언트 측에서, Teams에서는 서버 측에서 이 순간을 보완하면 사용자의 신뢰를 조금씩 떨어뜨리는 조용한 불편을 없앨 수 있습니다.

다음 카드를 배포하기 전에 직접 제출 버튼을 눌러 보세요. “아무 일도 없음”이 답이라면 이제 어떻게 고칠지 알게 되었습니다.

각자의 에이전트에서 제출 후 순간을 어떻게 처리하고 있나요? 댓글로 알려 주세요.
