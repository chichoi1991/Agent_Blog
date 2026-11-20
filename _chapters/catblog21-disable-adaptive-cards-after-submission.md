---
layout: "chapter"
date: 2026-11-11
title: "Copilot Studio 에이전트에서 제출 후 Adaptive Cards 비활성화"
short_title: "제출 후 Adaptive Cards 비활성화"
description: "WebChat 포털에서는 클라이언트 미들웨어로, Microsoft Teams에서는 Universal Actions로 제출된 Adaptive Card를 비활성화하거나 교체하는 방법."
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
  <img src="{{ '/assets/catblog/disable-adaptive-cards-after-submission/header.png' | relative_url }}" alt="제출 버튼을 눌렀는데 카드가 응답하지 않은 듯 보이는 상황" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

Adaptive Card 양식을 포함한 에이전트를 배포했다고 가정해 봅시다. 사용자가 값을 입력하고 제출을 누르면 입력한 데이터가 사라집니다. 카드는 여전히 입력 가능한 것처럼 보이므로 사용자는 제출이 실패했다고 생각하고 다시 입력해 제출합니다. 이번에는 오류가 발생합니다.

실제로 잘못된 것은 없습니다. 에이전트는 데이터를 받아 정상적으로 처리했습니다. 다만 카드가 사용자에게 그 사실을 알려 주지 않았을 뿐입니다. 이 작은 간극이 에이전트를 수천 명의 직원에게 배포한 뒤에는 실제 지원 문제로 이어집니다.

다행히 해결할 수 있습니다. 단, 올바른 해결책은 에이전트가 어디에서 실행되는지에 따라 완전히 달라집니다. 사용자 지정 웹 포털과 Microsoft Teams에서 사용할 수 있는 방법이 다르므로 이 글에서는 두 가지를 모두 살펴봅니다.

## 이런 현상이 발생하는 이유

Adaptive Cards에는 기본적으로 "제출 후 비활성화" 기능이 없습니다. 사용자가 카드를 제출하면 다음과 같이 됩니다.

1. 입력 필드가 지워져 데이터가 시각적으로 사라집니다.
2. 카드는 계속 상호 작용할 수 있는 상태로 남습니다.
3. 대화는 이미 다음 단계로 진행되었으므로 두 번째 제출은 오류를 일으킵니다.

이는 에이전트 로직의 버그가 아니라 플랫폼 동작입니다. 에이전트는 데이터를 정상적으로 수신하고 처리했지만 사용자는 그 사실을 알 수 없습니다.

## 채널별로 다른 두 가지 패턴

해결 방법은 에이전트가 표시되는 위치에 따라 달라집니다.

| 채널 | 패턴 | 메커니즘 |
|---|---|---|
| 웹 포털(WebChat) | 첨부 파일 미들웨어 | 클라이언트에서 카드 비활성화 |
| Microsoft Teams | Universal Actions | 서버에서 카드 교체 |
| Microsoft 365 Copilot | 지원되는 해결 방법 없음 | `Action.Execute`가 처리되지 않음 |

먼저 두 가지 해결 방법을 살펴본 뒤, 둘 다 적용되지 않는 Microsoft 365 Copilot 에이전트에서 고려할 사항을 다룹니다.

## 패턴 1: 사용자 지정 웹 포털(BotFramework-WebChat)

> 이 패턴은 BotFramework-WebChat SDK를 사용해 자체 사용자 지정 웹 포털이나 셀프서비스 페이지에 에이전트를 임베드하고 클라이언트를 직접 제어하는 경우에 적용됩니다.
>
> 이름이 비슷하더라도 Microsoft 365 [Employee Self-Service(ESS) 에이전트](https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/overview)에는 적용되지 않습니다. ESS는 Microsoft 365 Copilot 채널에서 실행되고 클라이언트 호스트가 사용자에게 노출되지 않으므로 미들웨어를 연결할 곳이 없습니다. 이 채널은 글 뒤쪽에서 다룹니다.

아이디어는 간단합니다. WebChat의 **첨부 파일 미들웨어**를 사용해 카드가 가장 최근의 봇 메시지에 속하는지 확인합니다. 그렇지 않다면(사용자가 이미 다음 메시지로 넘어갔다면) 비활성화된 카드로 렌더링합니다.

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

핵심 줄은 `disabled={!recentBotMessage}`입니다. 봇이 새 메시지를 보내면 이전 카드는 비활성화됩니다. 입력은 읽기 전용이 되고 버튼은 작동하지 않습니다.

### CSS로 시각적 피드백 제공

버튼이 사용되었다는 사실을 분명히 표시하려면 수행된 작업을 스타일링하는 CSS 클래스를 추가합니다.

```css
#webchat .card__action--performed {
  background-color: #0063b1 !important;
  border-color: #0063b1 !important;
  color: White !important;
}
```

제출된 버튼이 파란색으로 표시되어 사용자에게 명확한 완료 신호를 제공합니다.

### 마운트

WebChat을 렌더링할 때 미들웨어를 전달합니다.

```javascript
<ReactWebChat
  attachmentMiddleware={attachmentMiddleware}
  directLine={directLine}
  store={store}
/>
```

> 이 방법은 **클라이언트 측** 해결책입니다. UI에서 재제출을 막지만 서버 측에서 강제하지는 않습니다. 대부분의 셀프서비스 포털 시나리오에는 충분합니다.

전체 작동 샘플은 [BotFramework-WebChat 저장소](https://github.com/microsoft/BotFramework-WebChat/tree/main/samples/05.custom-components/l.disable-adaptive-cards)에서 확인할 수 있습니다.

## 패턴 2: Microsoft Teams(Universal Actions)

WebChat 미들웨어는 클라이언트를 제어할 수 없는 Teams에는 적용되지 않습니다. Teams 전반에서 에이전트를 설계한다면 [Teams 에이전트 패턴 글](https://microsoft.github.io/mcscatblog/posts/copilot-studio-teams-agent-patterns/)에서 더 폭넓은 설계 고려 사항을 확인하세요. 이 문제에는 카드 동작에 응답하고 새 카드를 반환해 기존 카드를 교체할 수 있는 모델인 [**Universal Actions**](https://learn.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model)를 사용합니다.

### Universal Actions 작동 방식

```text
사용자                    Teams                   에이전트
  |                         |                        |
  | 카드 입력 후 제출       |                        |
  |------------------------>|                        |
  |                         | verb가 포함된 invoke   |
  |                         |----------------------->|
  |                         |                        | 데이터 처리,
  |                         |                        | verb에 따라 분기
  |                         | 대체 카드(HTTP 200)    |
  |                         |<-----------------------|
  | 확인 카드로 원본 교체   |                        |
  |<------------------------|                        |
```

`Action.Submit` 대신 고유한 **verb**가 포함된 `Action.Execute`를 카드에서 사용합니다. 사용자가 버튼을 누르면 Teams가 Copilot Studio에 invoke 활동을 보냅니다. 토픽이 이를 받아 데이터를 처리한 뒤 새 카드를 반환합니다. Teams는 원본 카드를 새 카드로 교체합니다.

사용자는 양식 대신 확인 메시지를 보게 됩니다. 모호함도 재제출도 없습니다.

### 1단계: `Action.Execute`로 카드 설계

어떤 Adaptive Card에서든 시작할 수 있습니다. JSON을 직접 작성하고 싶지 않다면 [Copilot으로 카드를 생성](https://microsoft.github.io/mcscatblog/posts/adaptive-card-generation/)한 뒤 작업을 수정할 수 있습니다. 중요한 변경은 작업 버튼에 있습니다. `Action.Submit`을 `Action.Execute`로 바꾸고 `verb`를 추가합니다.

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

> Universal Actions를 지원하지 않는 클라이언트에서도 카드가 정상적으로 작동하도록 `"fallback": "Action.Submit"`을 사용합니다.

### 2단계: "메시지 보내기" 노드로 전송

Copilot Studio에서 Adaptive Card JSON과 함께 [**메시지 보내기**](https://learn.microsoft.com/microsoft-copilot-studio/authoring-send-message) 노드를 사용합니다. [**Adaptive Card로 질문**](https://learn.microsoft.com/microsoft-copilot-studio/authoring-ask-with-adaptive-card) 노드는 사용하지 마세요. 이 노드는 내부적으로 `Action.Submit`을 사용하므로 invoke/refresh 흐름을 트리거하지 않습니다.

### 3단계: 수신 토픽 만들기

invoke 활동이 발생할 때 트리거되는 토픽을 만들고 다음 스키마로 들어오는 페이로드를 파싱해 verb를 추출합니다.

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

### 4단계: 대체 카드 반환

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

원본 카드가 교체됩니다. 버튼과 입력 필드는 사라지고 깔끔한 확인 메시지만 남습니다.

> 테스트는 Copilot Studio 테스트 캔버스가 아니라 Teams에서 직접 수행하세요. 테스트 패널에서는 invoke/refresh 흐름이 작동하지 않을 수 있습니다.

[Nghiem Doan](https://github.com/nghiemdoan-msft)이 만든 이 패턴의 전체 가져오기 가능 버전은 [CopilotStudioSamples 저장소](https://github.com/microsoft/CopilotStudioSamples/tree/main/authoring/solutions/adaptive-card-refresh)에서 가져오기 가능한 솔루션으로 제공됩니다.

## Microsoft 365 Copilot 채널은 어떨까요?

앞의 두 패턴은 클라이언트를 직접 제어하는 WebChat 또는 Teams를 전제로 합니다. **Microsoft 365 Copilot** 채널은 어느 쪽에도 해당하지 않습니다. Microsoft 자체 [Employee Self-Service(ESS) 에이전트](https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/overview)를 비롯해 이 채널을 사용하는 에이전트가 늘고 있어 이 차이가 중요해졌습니다.

2026년 7월 기준 상황은 다음과 같습니다.

- **WebChat 미들웨어를 적용할 수 없습니다.** 클라이언트를 호스트하지 않으므로 첨부 파일 미들웨어를 연결할 곳이 없습니다.
- **Universal Actions가 실행되지 않습니다.** Adaptive Cards의 `Action.Execute`는 Microsoft 365 Copilot 채널에서 [지원되지 않는 노드 유형](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-microsoft-teams#known-limitations)에 포함되므로 카드를 교체하는 invoke/refresh 흐름이 실행되지 않습니다.

현재 Microsoft 365 Copilot에서 제출 후 카드를 비활성화하거나 교체하는 지원 방법은 없습니다. 실용적인 대안은 이 상황을 고려해 설계하는 것입니다. 가능한 경우 카드를 정보 제공용으로 두고, 제출 중심 카드 대신 질문 노드나 대화 흐름으로 입력을 받습니다. 버튼을 눌러도 아무 일도 없는 듯 보이더라도 "받았습니다"로 이해할 수 있도록 카드 문구를 작성합니다.

> ESS는 흔히 혼동되는 사례입니다. 사용자 지정 포털 시나리오와 유사해서 WebChat 해결책이 적용될 것 같지만, ESS는 클라이언트 측 훅을 사용할 수 없는 Microsoft 365 Copilot 채널에서 실행되고 Teams 카드 교체도 적용되지 않습니다. 겉보기에는 같은 문제지만 규칙은 다릅니다.

## 핵심 요점

- Adaptive Cards는 제출 후 기본적으로 비활성화되지 않으므로 직접 구현해야 합니다.
- **사용자 지정 웹 포털**에서는 WebChat 첨부 파일 미들웨어를 사용해 클라이언트에서 카드를 비활성화합니다. 명확하고 시각적이며 간단합니다.
- **Microsoft Teams**에서는 `Action.Execute`와 verb를 사용하는 Universal Actions를 활용합니다. Copilot Studio 토픽이 invoke를 받아 데이터를 처리하고 대체 카드를 반환합니다.
- 두 패턴은 서로 다른 메커니즘으로 같은 UX 문제를 해결합니다. 에이전트가 실행되는 채널에 맞는 방법을 선택해야 합니다.
- ESS 에이전트가 있는 **Microsoft 365 Copilot** 채널에서는 두 패턴 모두 적용되지 않습니다. `Action.Execute` 카드는 지원되지 않으므로 제출 후 상황을 고려해 설계해야 합니다.
- 이전 버전과의 호환성을 위해 Universal Action 카드에는 항상 `"fallback": "Action.Submit"`을 포함합니다.

## 완성도 높은 에이전트는 작은 순간들이 모여 만들어집니다

Adaptive Cards는 에이전트에서 실제 입력을 수집하는 가장 좋은 방법 중 하나지만, 피드백 없는 입력은 사용자에게 추측을 맡기는 것과 같습니다. 고장 난 듯한 에이전트와 완성된 에이전트의 차이는 사용자가 제출을 누른 직후 무엇을 보는가에 달려 있는 경우가 많습니다. WebChat에서 클라이언트 측으로든 Teams에서 서버 측으로든 그 순간을 보완하면 사용자가 버그를 신고하기도 전에 신뢰를 떨어뜨리는 작고 조용한 불편을 없앨 수 있습니다.

따라서 다음 카드를 배포하기 전에 직접 제출 버튼을 눌러 보세요. "아무 일도 일어나지 않는다"면 이제 해결 방법을 알고 있습니다.

여러분의 에이전트에서는 제출 후 상황을 어떻게 처리하고 있나요? 댓글로 의견을 들려주세요.
