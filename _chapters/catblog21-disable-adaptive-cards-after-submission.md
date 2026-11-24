---
layout: "chapter"
title: "제출 후 Copilot Studio 에이전트의 Adaptive Card 비활성화"
short_title: "제출 후 카드 비활성화"
description: "WebChat과 Microsoft Teams에서 Adaptive Card를 제출한 뒤 비활성화하거나 교체하는 두 가지 방법과 Microsoft 365 Copilot의 제약을 설명함"
order: 21
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/disable-adaptive-cards-after-submission/"
source_author: "mmonisha"
source_published: "2026-11-11"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/disable-adaptive-cards-after-submission/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/) (Microsoft Copilot Studio CAT)의 mmonisha(@mmonisha) 원문 [Disabling Adaptive Cards After Submission in Copilot Studio Agents](https://microsoft.github.io/mcscatblog/posts/disable-adaptive-cards-after-submission/)(2026-11-11)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/disable-adaptive-cards-after-submission/header.png' | relative_url }}" alt="제출 버튼을 눌렀는데 카드가 사용자의 입력은 받았지만 이를 알리지 않은 상황" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

Adaptive Card 양식을 포함한 에이전트를 출시했다고 가정해 보겠습니다. 사용자가 내용을 입력하고 제출을 누르자 방금 입력한 값이 사라집니다. 카드는 여전히 입력 가능한 것처럼 보이므로 사용자는 제출이 실패했다고 생각해 내용을 다시 입력하고 제출합니다. 이번에는 이미 대화가 진행돼 오류가 발생합니다.

실제로는 아무 문제도 없습니다. 에이전트가 데이터를 받아 정상적으로 처리했습니다. 다만 카드가 사용자에게 그 사실을 알려주지 않았을 뿐이며, 수천 명의 직원에게 에이전트를 배포하고 나면 이 작은 간극이 실제 지원 문제로 이어집니다.

해결 방법은 있지만 에이전트가 실행되는 채널에 따라 적절한 방법이 다릅니다. 사용자 지정 웹 포털과 Microsoft Teams에서 사용할 수 있는 수단이 다르므로 두 방법을 차례로 살펴봅니다.

## 이런 현상이 발생하는 이유

Adaptive Card에는 기본 제공되는 "제출 후 비활성화" 동작이 없습니다. 사용자가 카드를 제출하면 다음과 같이 됩니다.

1. 입력 필드가 지워져 입력 내용이 화면에서 사라집니다.
2. 카드는 계속 상호 작용할 수 있는 상태로 남습니다.
3. 대화가 이미 다음 단계로 넘어갔기 때문에 두 번째 제출은 오류를 일으킵니다.

이는 에이전트 로직의 버그가 아니라 플랫폼 동작입니다. 에이전트는 데이터를 정상적으로 받았지만, 사용자에게는 이를 알릴 방법이 필요합니다.

## 채널별로 다른 두 가지 패턴

해결 방법은 에이전트가 제공되는 채널에 따라 달라집니다.

| 채널 | 패턴 | 메커니즘 |
|---|---|---|
| 웹 포털 (WebChat) | Attachment middleware | 클라이언트에서 카드 비활성화 |
| Microsoft Teams | Universal Actions | 서버에서 카드 교체 |
| Microsoft 365 Copilot | 지원되는 해결 방법 없음 | `Action.Execute`가 적용되지 않음 |

먼저 두 가지 우회 방법을 살펴보고, 어느 방법도 적용되지 않는 Microsoft 365 Copilot 채널에서 고려할 점을 다룹니다.

## 패턴 1: 사용자 지정 웹 포털 (BotFramework-WebChat)

> 이 패턴은 클라이언트를 직접 제어하는 BotFramework-WebChat SDK를 사용해 자체 웹 포털이나 셀프 서비스 페이지에 에이전트를 포함한 경우에 적용됩니다.
>
> Microsoft 365 [Employee Self-Service (ESS) 에이전트](https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/overview)에는 적용되지 않습니다. 이름은 비슷하지만 ESS는 Microsoft 365 Copilot 채널에서 실행되고 클라이언트를 호스팅하지 않으므로 미들웨어를 연결할 위치가 없습니다. 해당 채널은 글의 뒷부분에서 다룹니다.

핵심은 WebChat의 **[attachment middleware](https://microsoft.github.io/mcscatblog/posts/webchat-middlewares/)**에서 카드가 가장 최근 봇 메시지에 속하는지 확인하는 것입니다. 그렇지 않다면(즉 사용자가 이미 다음 메시지로 넘어갔다면) 카드를 비활성화된 상태로 렌더링합니다.

### 핵심 로직

미들웨어는 Adaptive Card 렌더링을 가로채 활동을 저장소의 최신 메시지와 비교합니다.

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

핵심 줄은 `disabled={!recentBotMessage}`입니다. 봇이 새 메시지를 보내면 이전 카드가 비활성화됩니다. 입력은 읽기 전용이 되고 버튼은 작동하지 않습니다.

### CSS로 시각적 피드백 추가

버튼이 이미 사용됐음을 명확히 표시하도록 수행된 동작에 CSS 클래스를 적용합니다.

```css
#webchat .card__action--performed {
  background-color: #0063b1 !important;
  border-color: #0063b1 !important;
  color: White !important;
}
```

제출한 버튼이 단색 파란색 "완료" 스타일로 표시돼 사용자에게 명확한 피드백을 제공합니다.

### 미들웨어 연결

WebChat을 렌더링할 때 미들웨어를 전달합니다.

```javascript
<ReactWebChat
  attachmentMiddleware={attachmentMiddleware}
  directLine={directLine}
  store={store}
/>
```

> 이 방법은 **클라이언트 측** 해결책입니다. UI에서 재제출을 방지하지만 서버에서 강제하지는 않습니다. 대부분의 셀프 서비스 포털 시나리오에는 충분합니다.

전체 동작 샘플은 [BotFramework-WebChat 저장소](https://github.com/microsoft/BotFramework-WebChat/tree/main/samples/05.custom-components/l.disable-adaptive-cards)에서 확인할 수 있습니다.

## 패턴 2: Microsoft Teams (Universal Actions)

Teams에서는 클라이언트를 제어할 수 없으므로 WebChat 미들웨어를 사용할 수 없습니다. Teams용 에이전트 설계 전반은 [Teams 에이전트 패턴 글](https://microsoft.github.io/mcscatblog/posts/copilot-studio-teams-agent-patterns/)에서 다룹니다. 이 문제에는 에이전트가 카드 동작에 응답하고 새 카드로 교체할 수 있는 **[Universal Actions](https://learn.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model)**을 사용합니다.

### Universal Actions 작동 방식

| 순서 | 처리 |
|---|---|
| 1 | 사용자가 카드를 작성하고 Submit을 누름 |
| 2 | Teams가 verb를 포함한 invoke 활동을 에이전트로 보냄 |
| 3 | 에이전트가 데이터를 처리하고 verb에 따라 분기함 |
| 4 | 에이전트가 교체 카드를 반환함 (HTTP 200) |
| 5 | Teams가 원래 카드를 확인 카드로 교체함 |

`Action.Submit` 대신 고유한 **verb**를 지정한 `Action.Execute`를 카드에 사용합니다. 사용자가 버튼을 누르면 Teams가 Copilot Studio에 invoke 활동을 보냅니다. 토픽이 이를 받아 데이터를 처리한 뒤 새 카드를 반환하면 Teams가 원래 카드를 교체합니다.

사용자에게는 양식 대신 확인 카드가 표시됩니다. 혼란이나 중복 제출이 사라집니다.

### 1단계: `Action.Execute`로 카드 설계

기존 Adaptive Card에서 버튼의 동작을 바꿉니다. JSON을 직접 작성하고 싶지 않다면 [Copilot이 카드를 만들도록](https://microsoft.github.io/mcscatblog/posts/adaptive-card-generation/) 한 뒤 동작을 수정할 수 있습니다. 핵심은 `Action.Submit`을 `Action.Execute`로 바꾸고 `verb`를 추가하는 것입니다.

```json
{
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
```

> Universal Actions를 지원하지 않는 클라이언트에서 카드가 정상적으로 작동하도록 `"fallback": "Action.Submit"`을 사용합니다.

### 2단계: "Send a message" 노드로 카드 전송

Copilot Studio에서 Adaptive Card JSON을 사용하는 [**Send a message**](https://learn.microsoft.com/microsoft-copilot-studio/authoring-send-message) 노드를 사용합니다. [**Ask with Adaptive Card**](https://learn.microsoft.com/microsoft-copilot-studio/authoring-ask-with-adaptive-card) 노드는 내부적으로 `Action.Submit`을 사용하므로 invoke/refresh 흐름을 시작하지 않습니다.

### 3단계: 수신 토픽 만들기

invoke 활동으로 트리거되는 토픽을 만들고, 다음 스키마로 들어오는 페이로드를 분석해 verb를 추출합니다.

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
- `feedbackSkipForm` → 건너뜀 확인 카드 반환

### 4단계: 교체 카드 반환

응답은 Universal Action 응답 형식을 따라야 합니다.

```json
{
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
```

원래 카드는 교체됩니다. 버튼이나 입력 필드가 없는 깔끔한 확인 카드만 표시됩니다.

> Copilot Studio 테스트 캔버스가 아니라 Teams에서 직접 테스트해야 합니다. 테스트 패널에서는 invoke/refresh 흐름이 작동하지 않을 수 있습니다.

[CopilotStudioSamples 저장소](https://github.com/microsoft/CopilotStudioSamples/tree/main/authoring/solutions/adaptive-card-refresh)에서 Nghiem Doan이 만든 이 패턴의 전체 가져오기 가능 솔루션을 확인할 수 있습니다.

## Microsoft 365 Copilot 채널에서는?

앞의 두 패턴은 클라이언트를 제어하거나(웹 포털), Teams에 있다는 전제에 기반합니다. **Microsoft 365 Copilot** 채널에는 어느 전제도 적용되지 않습니다. Microsoft의 [Employee Self-Service (ESS) 에이전트](https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/overview)를 비롯해 이 채널에서 실행되는 에이전트가 늘어나는 만큼 중요한 제약입니다.

2026년 7월 기준 상황은 다음과 같습니다.

- **WebChat 미들웨어를 적용할 수 없습니다.** 클라이언트를 호스팅하지 않으므로 attachment middleware를 연결할 위치가 없습니다.
- **Universal Actions가 실행되지 않습니다.** Adaptive Card의 `Action.Execute`는 [Microsoft 365 Copilot 채널에서 지원하지 않는 노드 형식](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-microsoft-teams#known-limitations)에 속하므로 카드를 교체하는 invoke/refresh 흐름이 실행되지 않습니다.

현재 Microsoft 365 Copilot에서 제출 후 카드를 비활성화하거나 교체하는 지원 방법은 없습니다. 가능한 경우 카드를 정보 제공용으로 유지하고, 제출 중심 카드 대신 Question 노드나 대화 흐름으로 입력을 받으며, 클릭 후 아무 변화가 없어 보이더라도 "접수됨"으로 이해할 수 있도록 카드 문구를 작성하는 편이 현실적입니다.

> ESS는 혼동하기 쉬운 예입니다. 사용자 지정 포털 시나리오와 비슷해 보여 WebChat 방법이 적용될 것 같지만 ESS는 Microsoft 365 Copilot 채널에서 실행되므로 클라이언트 측 연결 지점도 없고 Teams 카드 교체도 적용되지 않습니다. 겉으로 같은 문제라도 규칙은 다릅니다.

## 핵심 요약

- Adaptive Cards는 제출 후 자동으로 비활성화되지 않으므로 직접 구현해야 합니다.
- **사용자 지정 웹 포털**에서는 WebChat attachment middleware로 클라이언트 측에서 카드를 비활성화합니다.
- **Microsoft Teams**에서는 `Action.Execute`와 verb를 사용하는 Universal Actions를 씁니다. Copilot Studio 토픽이 invoke를 받아 데이터를 처리하고 교체 카드를 반환합니다.
- 두 패턴은 서로 다른 메커니즘으로 같은 UX 문제를 해결합니다. 에이전트가 있는 채널에 따라 적절한 방법을 선택해야 합니다.
- **Microsoft 365 Copilot** 채널(ESS 에이전트가 실행되는 곳)에는 두 방법 모두 적용되지 않습니다. 현재 `Action.Execute` 카드는 지원되지 않으므로 제출 후 상황을 고려해 설계해야 합니다.
- 이전 버전 호환성을 위해 Universal Action 카드에 `"fallback": "Action.Submit"`을 포함합니다.

## 완성도 높은 에이전트는 작은 순간들의 합

Adaptive Cards는 에이전트에서 실제 입력을 받는 훌륭한 방법이지만, 피드백 없는 입력은 사용자에게 추측만 남깁니다. 에이전트가 고장 난 것처럼 느껴지는지 완성된 것처럼 느껴지는지는 사용자가 Submit을 누른 직후 무엇을 보는지에 달려 있을 때가 많습니다. WebChat의 클라이언트 측이든 Teams의 서버 측이든 그 순간을 매끄럽게 만들면 신뢰를 떨어뜨리는 작은 불편을 줄일 수 있습니다.

다음 카드를 출시하기 전에 직접 Submit 버튼을 눌러 보세요. 아무 일도 일어나지 않는다면 이제 해결 방법을 알게 된 것입니다.

여러분의 에이전트에서는 제출 후 상황을 어떻게 처리하고 있나요? 댓글로 의견을 나눠 주세요.
