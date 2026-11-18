---
layout: "chapter"
date: 2026-11-11
title: "Copilot Studio 에이전트에서 제출 후 Adaptive Card 비활성화하기"
short_title: "제출 후 Adaptive Card 비활성화"
description: "WebChat과 Microsoft Teams에서 Adaptive Card 제출 후 재제출을 막거나 확인 카드로 교체하는 두 가지 패턴."
order: 21
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/disable-adaptive-cards-after-submission/"
source_author: "mmonisha"
source_published: "2026-11-11"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/disable-adaptive-cards-after-submission/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 mmonisha(@mmonisha) 원문 [Disabling Adaptive Cards After Submission in Copilot Studio Agents](https://microsoft.github.io/mcscatblog/posts/disable-adaptive-cards-after-submission/)(2026-11-11)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/disable-adaptive-cards-after-submission/header.png' | relative_url }}" alt="제출 버튼을 눌렀지만 완료 표시가 없는 Adaptive Card" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

Adaptive Card 양식을 에이전트에 배포했다고 가정해 봅시다. 사용자가 값을 입력하고 제출을 누르자 방금 입력한 데이터가 사라집니다. 카드 자체는 여전히 입력할 수 있는 것처럼 보여 사용자는 제출이 실패했다고 생각합니다. 다시 작성해 제출하면 이미 대화가 다음 단계로 넘어가 오류가 발생합니다.

실제로는 문제가 없었습니다. 에이전트가 데이터를 받아 정상적으로 처리했지만 카드가 그 사실을 사용자에게 알려주지 않은 것입니다. 작은 차이지만 수천 명의 직원에게 에이전트를 배포하고 나면 실제 지원 문제로 이어집니다.

해결 방법은 있지만 에이전트가 실행되는 채널에 따라 달라집니다. 사용자 지정 웹 포털과 Microsoft Teams에서 사용할 수 있는 방법이 다르므로 각각 살펴보겠습니다.

## 발생 원인

Adaptive Card에는 기본적으로 “제출 후 비활성화” 기능이 없습니다. 사용자가 카드를 제출하면 다음과 같이 됩니다.

1. 입력 필드가 비워져 데이터가 화면에서 사라집니다.
2. 카드는 계속 상호 작용할 수 있는 상태로 남습니다.
3. 대화는 이미 다음 단계로 이동했으므로 재제출하면 오류가 발생합니다.

에이전트 로직의 버그가 아니라 플랫폼 동작입니다. 에이전트는 데이터를 정상적으로 받아 처리했지만 사용자는 이를 알 수 없습니다.

## 두 채널, 두 가지 패턴

해결 방법은 에이전트가 표시되는 채널에 따라 달라집니다.

| 채널 | 패턴 | 메커니즘 |
|---|---|---|
| Web 포털(WebChat) | Attachment middleware | 클라이언트에서 카드 비활성화 |
| Microsoft Teams | Universal Actions | 서버에서 카드 교체 |
| Microsoft 365 Copilot | 지원되는 해결 방법 없음 | `Action.Execute`가 처리되지 않음 |

먼저 두 가지 해결 방법을 살펴보고, 둘 다 적용할 수 없는 Microsoft 365 Copilot에서의 대응도 다룹니다.

## 패턴 1: 사용자 지정 웹 포털(BotFramework-WebChat)

> 이 패턴은 BotFramework-WebChat SDK를 사용하는 자체 웹 포털이나 셀프서비스 페이지처럼 클라이언트를 제어할 수 있는 환경에 적용됩니다.
>
> 이름이 비슷하더라도 Microsoft 365 Copilot 채널에서 실행되는 Microsoft 365 [Employee Self-Service(ESS) 에이전트](https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/overview)에는 적용되지 않습니다. 클라이언트를 호스팅하지 않으므로 미들웨어를 연결할 위치가 없습니다. 이 채널은 글의 뒷부분에서 다룹니다.

아이디어는 간단합니다. WebChat의 [attachment middleware](https://microsoft.github.io/mcscatblog/posts/webchat-middlewares/)가 카드가 가장 최근의 봇 메시지에 속하는지 확인하고, 그렇지 않으면(사용자가 이미 다음 메시지로 넘어갔다면) 카드를 비활성화해 렌더링합니다.

### 핵심 로직

미들웨어는 Adaptive Card 렌더링을 가로채 활동을 스토어의 최신 메시지와 비교합니다.

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

핵심은 `disabled={!recentBotMessage}`입니다. 봇이 새 메시지를 보내면 이전 카드가 비활성화됩니다. 입력은 읽기 전용이 되고 버튼은 작동하지 않습니다.

### CSS로 시각적 피드백 제공

버튼을 이미 사용했다는 점을 명확히 표시하도록 수행된 동작에 CSS 클래스를 적용합니다.

```css
#webchat .card__action--performed {
  background-color: #0063b1 !important;
  border-color: #0063b1 !important;
  color: White !important;
}
```

제출된 버튼을 파란색으로 표시해 사용자가 완료 상태를 쉽게 알 수 있습니다.

### WebChat에 연결

WebChat을 렌더링할 때 미들웨어를 전달합니다.

```javascript
<ReactWebChat
  attachmentMiddleware={attachmentMiddleware}
  directLine={directLine}
  store={store}
/>
```

> 이 방법은 **클라이언트 측** 해결책입니다. UI에서 재제출을 막지만 서버에서 강제하지는 않습니다. 대부분의 셀프서비스 포털에서는 충분합니다.

전체 샘플은 [BotFramework-WebChat 저장소](https://github.com/microsoft/BotFramework-WebChat/tree/main/samples/05.custom-components/l.disable-adaptive-cards)에서 확인할 수 있습니다.

## 패턴 2: Microsoft Teams(Universal Actions)

Teams에서는 클라이언트를 제어할 수 없으므로 WebChat 미들웨어를 적용할 수 없습니다. Teams용 에이전트 설계 전반은 [Teams 에이전트 패턴 글](https://microsoft.github.io/mcscatblog/posts/copilot-studio-teams-agent-patterns/)에서 다룹니다. 여기서는 카드 작업에 응답해 새 카드로 교체하는 [**Universal Actions**](https://learn.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model)을 사용합니다.

### Universal Actions 동작 방식

| 순서 | 처리 |
|---|---|
| 1 | 사용자가 Teams 카드의 필드를 작성하고 제출합니다. |
| 2 | Teams가 verb가 포함된 invoke 활동을 에이전트로 보냅니다. |
| 3 | 에이전트가 데이터를 처리하고 verb에 따라 분기합니다. |
| 4 | 에이전트가 HTTP 200과 교체 카드를 반환합니다. |
| 5 | Teams가 원래 카드를 확인 카드로 바꿉니다. |

`Action.Submit` 대신 고유한 **verb**가 있는 `Action.Execute`를 사용합니다. 사용자가 버튼을 누르면 Teams가 Copilot Studio에 invoke 활동을 보냅니다. 토픽이 이를 받아 데이터를 처리하고 새 카드를 반환하면 Teams가 기존 카드를 교체합니다.

사용자에게는 양식 대신 확인 카드가 표시됩니다. 모호함도 재제출도 없습니다.

### 1단계: `Action.Execute`로 카드 설계

Adaptive Card를 준비합니다. JSON을 직접 작성하고 싶지 않다면 [Copilot으로 카드 생성](https://microsoft.github.io/mcscatblog/posts/adaptive-card-generation/)을 한 뒤 동작을 조정할 수 있습니다. 중요한 부분은 버튼입니다. `Action.Submit`을 `Action.Execute`로 바꾸고 `verb`를 추가합니다.

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

> Universal Actions를 지원하지 않는 클라이언트에서도 정상적으로 동작하도록 `"fallback": "Action.Submit"`을 사용하세요.

### 2단계: "메시지 보내기" 노드로 전송

Copilot Studio에서 Adaptive Card JSON과 함께 [**메시지 보내기**](https://learn.microsoft.com/microsoft-copilot-studio/authoring-send-message) 노드를 사용합니다. [**Adaptive Card로 질문**](https://learn.microsoft.com/microsoft-copilot-studio/authoring-ask-with-adaptive-card) 노드는 내부적으로 `Action.Submit`을 사용하므로 invoke/refresh 흐름을 실행하지 않습니다.

### 3단계: 수신 토픽 만들기

invoke 활동에서 트리거되는 토픽을 만들고 다음 스키마로 들어오는 페이로드를 파싱해 verb를 추출합니다.

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

응답은 Universal Action 형식이어야 합니다.

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

원래 카드는 버튼이나 입력 필드가 없는 간결한 확인 카드로 교체됩니다.

> Copilot Studio 테스트 캔버스가 아니라 Teams에서 직접 테스트하세요. 테스트 패널에서는 invoke/refresh 흐름이 동작하지 않을 수 있습니다.

[CopilotStudioSamples 저장소](https://github.com/microsoft/CopilotStudioSamples/tree/main/authoring/solutions/adaptive-card-refresh)에서 Nghiem Doan이 만든 패턴의 전체 가져오기 가능 솔루션을 확인할 수 있습니다.

## Microsoft 365 Copilot 채널에서는?

앞의 두 패턴은 클라이언트를 직접 제어하거나(웹 포털) Teams를 사용한다는 전제입니다. **Microsoft 365 Copilot** 채널은 둘 다 해당하지 않습니다. Microsoft의 [Employee Self-Service(ESS) 에이전트](https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/overview)처럼 이 채널에 게시되는 에이전트가 늘어나면서 이 차이가 중요해졌습니다.

2026년 7월 현재 상황은 다음과 같습니다.

- **WebChat 미들웨어를 적용할 수 없습니다.** 클라이언트를 호스팅하지 않아 attachment middleware를 연결할 곳이 없습니다.
- **Universal Actions가 실행되지 않습니다.** Adaptive Card의 `Action.Execute`는 [Microsoft 365 Copilot 채널에서 지원하지 않는 노드 유형](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-microsoft-teams#known-limitations)에 포함되므로 카드를 바꾸는 invoke/refresh 흐름이 실행되지 않습니다.

현재 Microsoft 365 Copilot에서 제출 후 카드를 비활성화하거나 교체하는 지원 방법은 없습니다. 대신 카드에 정보를 제공하고, 제출 중심 카드보다 Question 노드나 대화형 입력으로 정보를 수집하며, 클릭 후 아무 변화가 없어도 요청이 접수된 것으로 이해할 수 있도록 카드 문구를 작성하세요.

> ESS는 혼동하기 쉬운 사례입니다. 사용자 지정 포털과 비슷해 보여 WebChat 해결책이 적용될 것 같지만, ESS는 클라이언트 측 Hook을 사용할 수 없는 Microsoft 365 Copilot 채널에서 실행되고 Teams 카드 교체도 지원하지 않습니다. 비슷해 보이는 문제라도 채널에 따라 규칙이 다릅니다.

## 핵심 요점

- Adaptive Cards는 제출 후 기본적으로 비활성화되지 않으므로 직접 구현해야 합니다.
- **사용자 지정 웹 포털**에서는 WebChat attachment middleware로 클라이언트 측 카드를 비활성화합니다.
- **Microsoft Teams**에서는 `Action.Execute`와 verb를 사용하는 Universal Actions를 적용합니다. Copilot Studio 토픽이 invoke를 받아 처리하고 교체 카드를 반환합니다.
- 두 패턴은 같은 UX 문제를 서로 다른 방식으로 해결합니다. 에이전트가 실행되는 채널에 따라 방법을 선택하세요.
- ESS가 사용하는 **Microsoft 365 Copilot** 채널에는 두 패턴 모두 적용되지 않습니다. `Action.Execute` 카드가 지원되지 않으므로 제출 이후의 경험을 다른 방식으로 설계하세요.
- 호환성을 위해 Universal Action 카드에는 항상 `"fallback": "Action.Submit"`을 포함합니다.

## 완성도 높은 에이전트는 작은 순간들의 합

Adaptive Cards는 에이전트에서 실제 입력을 받는 좋은 방법 중 하나지만, 피드백이 없는 입력은 사용자에게 추측만 남깁니다. 에이전트가 고장 난 것처럼 보이는지 완성된 것처럼 느껴지는지는 사용자가 제출을 누른 직후 무엇을 보는가에 달려 있는 경우가 많습니다. WebChat에서 클라이언트 측으로든 Teams에서 서버 측으로든 그 순간을 보완하면, 버그를 신고하기도 전에 신뢰를 떨어뜨리는 작지만 지속적인 불편을 줄일 수 있습니다.

다음 카드를 배포하기 전에 직접 제출 버튼을 눌러 보세요. 아무 일도 일어나지 않는다면 이제 해결 방법을 알게 된 것입니다.

여러분의 에이전트에서는 제출 이후의 경험을 어떻게 처리하고 있나요? 댓글로 의견을 들려주세요.
