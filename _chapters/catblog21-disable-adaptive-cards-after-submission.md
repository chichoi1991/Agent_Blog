---
layout: "chapter"
title: "Copilot Studio 에이전트에서 제출 후 Adaptive Card 비활성화하기"
short_title: "제출 후 카드 비활성화"
description: "WebChat과 Microsoft Teams에서 Adaptive Card 제출 후 재제출을 막는 두 가지 패턴과 Microsoft 365 Copilot의 제약을 살펴봅니다."
order: 21
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/disable-adaptive-cards-after-submission/"
source_author: "mmonisha"
source_published: "2026-11-11"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/disable-adaptive-cards-after-submission/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)
(Microsoft Copilot Studio CAT)의 mmonisha(@mmonisha) 원문
[Disabling Adaptive Cards After Submission in Copilot Studio Agents](https://microsoft.github.io/mcscatblog/posts/disable-adaptive-cards-after-submission/)(2026-11-11)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/disable-adaptive-cards-after-submission/header.png' | relative_url }}" alt="제출을 눌렀습니다. 카드가 입력을 받았지만 사용자에게 알리는 것을 잊었습니다." loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

Adaptive Card 양식을 사용하는 에이전트를 배포했다고 가정해 봅시다. 사용자가 내용을 입력하고 Submit을 누르자 방금 입력한 데이터가 사라집니다. 카드는 여전히 입력할 수 있을 것처럼 보여 사용자는 제출이 실패했다고 생각합니다. 다시 입력해 두 번째로 Submit을 누르면 이미 대화가 진행된 탓에 오류가 발생합니다.

실제로 잘못된 것은 없습니다. 에이전트는 데이터를 받아 정상적으로 처리했습니다. 다만 카드가 사용자에게 그 사실을 알려주지 않았습니다. 직원 수천 명에게 에이전트를 배포하면 이 작은 간극이 실제 지원 문제로 이어집니다.

다행히 해결할 수 있습니다. 단, 적절한 해결책은 에이전트가 어디에서 동작하는지에 따라 완전히 달라집니다. 사용자 지정 웹 포털과 Microsoft Teams에서 사용할 수 있는 방법이 다르므로 이 글에서는 두 가지를 모두 살펴봅니다.

## 이런 현상이 발생하는 이유

Adaptive Card에는 기본적으로 "제출 후 비활성화" 기능이 없습니다. 사용자가 카드를 제출하면 다음과 같은 일이 일어납니다.

1. 입력 필드가 지워집니다(화면에서 데이터가 사라짐).
2. 카드는 계속 상호 작용할 수 있는 상태로 남습니다.
3. 대화가 이미 진행된 상태에서 다시 제출하면 오류가 발생합니다.

이는 에이전트 로직의 버그가 아니라 플랫폼 동작입니다. 에이전트는 데이터를 정상적으로 수신하고 처리했지만 사용자는 이를 알지 못합니다.

## 채널별로 다른 두 가지 패턴

해결 방법은 에이전트가 노출되는 채널에 따라 달라집니다.

| 채널 | 패턴 | 방법 |
|---|---|---|
| 웹 포털(WebChat) | Attachment middleware | 클라이언트에서 카드 비활성화 |
| Microsoft Teams | Universal Actions | 서버에서 카드 교체 |
| Microsoft 365 Copilot | 지원되는 해결 방법 없음 | `Action.Execute`가 처리되지 않음 |

두 가지 우회 방법을 살펴본 뒤, 어느 쪽도 적용되지 않는 Microsoft 365 Copilot 채널에서 에이전트를 사용할 때의 대응 방법을 설명합니다.

## 패턴 1: 사용자 지정 웹 포털(BotFramework-WebChat)

> 이 패턴은 BotFramework-WebChat SDK를 사용해 자체 사용자 지정 웹 포털이나 셀프서비스 페이지에 에이전트를 포함하고 클라이언트를 제어할 수 있을 때 사용할 수 있습니다.
>
> Microsoft 365 [Employee Self-Service(ESS) 에이전트](https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/overview)에는 적용되지 않습니다. 이름은 비슷하지만 ESS는 Microsoft 365 Copilot 채널에서 실행되고 클라이언트를 호스팅하지 않으므로 미들웨어를 연결할 곳이 없습니다. 글의 뒷부분에서 해당 채널을 다룹니다.

간단한 방법은 WebChat의 **[attachment middleware](https://microsoft.github.io/mcscatblog/posts/2026-02-02-webchat-middlewares/)**에서 카드가 가장 최근 봇 메시지에 속하는지 확인하는 것입니다. 그렇지 않다면(사용자가 이미 다음 대화로 넘어갔다면) 카드를 비활성화 상태로 렌더링합니다.

### 핵심 로직

미들웨어는 Adaptive Card 렌더링을 가로채 스토어의 최신 메시지와 활동을 비교합니다.

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

버튼이 이미 사용되었다는 사실을 분명히 알 수 있도록 실행된 작업을 표시하는 CSS 클래스를 추가합니다.

```css
#webchat .card__action--performed {
  background-color: #0063b1 !important;
  border-color: #0063b1 !important;
  color: White !important;
}
```

제출된 버튼이 파란색으로 표시되어 완료 상태를 명확히 전달합니다.

### 마운트

WebChat을 렌더링할 때 미들웨어를 전달합니다.

```javascript
<ReactWebChat
  attachmentMiddleware={attachmentMiddleware}
  directLine={directLine}
  store={store}
/>
```

> 이는 **클라이언트 측** 해결책입니다. UI에서 재제출을 막지만 서버에서 이를 강제하지는 않습니다. 대부분의 셀프서비스 포털 시나리오에는 충분합니다.

전체 동작 샘플은 [BotFramework-WebChat 리포지토리](https://github.com/microsoft/BotFramework-WebChat/tree/main/samples/05.custom-components/l.disable-adaptive-cards)에서 확인할 수 있습니다.

## 패턴 2: Microsoft Teams(Universal Actions)

Teams에서는 클라이언트를 제어할 수 없으므로 WebChat 미들웨어를 적용할 수 없습니다. Teams용 에이전트 설계 전반은 [Teams 에이전트 패턴 글](https://microsoft.github.io/mcscatblog/posts/2026-04-07-copilot-studio-teams-agent-patterns/)에서 다룹니다. 여기서는 카드 작업에 응답하고 새 카드를 대신 반환하는 **[Universal Actions](https://learn.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model)**를 사용합니다.

### Universal Actions 작동 방식

```text
사용자 → Teams: 카드 작성 후 Submit 클릭
Teams → 에이전트: verb가 포함된 invoke 활동 전송
에이전트 → 에이전트: 데이터 처리 후 verb에 따라 분기
에이전트 → Teams: 대체 카드 반환(HTTP 200)
Teams → 사용자: 원본 카드가 확인 카드로 교체
```

`Action.Submit` 대신 고유한 **verb**가 있는 `Action.Execute`를 카드에 사용합니다. 사용자가 버튼을 누르면 Teams가 invoke 활동을 Copilot Studio로 보냅니다. 토픽이 이를 받아 데이터를 처리하고 새 카드를 반환하면 Teams가 원본 카드를 교체합니다.

사용자에게는 양식 대신 확인 카드가 표시됩니다. 모호함도 재제출도 없습니다.

### 1단계: `Action.Execute`로 카드 설계

Adaptive Card에서 시작합니다. JSON을 직접 작성하지 않으려면 [Copilot이 카드를 생성하도록](https://microsoft.github.io/mcscatblog/posts/2026-01-02-adaptive-card-generation/) 한 다음 작업을 수정할 수 있습니다. 중요한 변경 사항은 작업 버튼입니다. `Action.Submit`을 `Action.Execute`로 바꾸고 `verb`를 추가합니다.

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

> Universal Actions를 지원하지 않는 클라이언트에서도 카드가 정상적으로 동작하도록 `"fallback": "Action.Submit"`을 사용합니다.

### 2단계: "Send a message" 노드로 전송

Copilot Studio에서 Adaptive Card JSON과 함께 [**Send a message**](https://learn.microsoft.com/microsoft-copilot-studio/authoring-send-message) 노드를 사용합니다. [**Ask with Adaptive Card**](https://learn.microsoft.com/microsoft-copilot-studio/authoring-ask-with-adaptive-card) 노드는 사용하지 마세요. 내부적으로 `Action.Submit`을 사용하므로 invoke/refresh 흐름을 트리거하지 않습니다.

### 3단계: 수신 토픽 만들기

invoke 활동에서 트리거되는 토픽을 만듭니다. 다음 스키마로 들어오는 페이로드를 분석해 verb를 추출합니다.

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

<details>
<summary>대체 카드가 포함된 Universal Action 응답</summary>

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

원본 카드는 교체됩니다. 버튼과 입력란 대신 깔끔한 확인 메시지만 남습니다.

> Copilot Studio 테스트 캔버스가 아니라 Teams에서 직접 테스트하세요. 테스트 패널에서는 invoke/refresh 흐름이 동작하지 않을 수 있습니다.

이 패턴의 완전한 가져오기 가능 버전(Nghiem Doan 제작)은 바로 가져올 수 있는 [CopilotStudioSamples 리포지토리](https://github.com/microsoft/CopilotStudioSamples/tree/main/authoring/solutions/adaptive-card-refresh)에서 제공됩니다.

## Microsoft 365 Copilot 채널은 어떨까요?

앞의 두 패턴은 클라이언트를 제어(WebChat)하거나 Teams를 사용한다는 전제입니다. **Microsoft 365 Copilot** 채널은 둘 다 해당하지 않습니다. 이 채널에 노출되는 에이전트가 늘고 있으며 Microsoft의 [Employee Self-Service(ESS) 에이전트](https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/overview)도 여기에 포함되므로 이 차이는 중요합니다.

2026년 7월 현재 상황은 다음과 같습니다.

- **WebChat 미들웨어를 적용할 수 없습니다.** 클라이언트를 호스팅하지 않으므로 attachment middleware를 연결할 곳이 없습니다.
- **Universal Actions가 실행되지 않습니다.** Adaptive Card의 `Action.Execute`는 [Microsoft 365 Copilot 채널에서 지원하지 않는 노드 유형](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-microsoft-teams#known-limitations)에 해당하므로 카드를 교체하는 invoke/refresh 흐름이 실행되지 않습니다.

현재 Microsoft 365 Copilot에서는 제출 후 카드를 비활성화하거나 교체하는 지원 방법이 없습니다. 현실적인 대응은 카드 설계로 보완하는 것입니다. 가능한 경우 카드는 정보 제공 용도로 유지하고, 제출 중심 카드 대신 Question 노드나 대화로 입력을 받으며, 클릭 후 아무 동작이 없어 보여도 카드 문구가 "접수됨"으로 이해되도록 작성합니다.

> ESS는 혼동하기 쉽습니다. 사용자 지정 포털 시나리오와 비슷해 보여 WebChat 해결책이 적용될 것 같지만 ESS는 Microsoft 365 Copilot 채널에서 동작합니다. 클라이언트 측 훅이 접근할 수 없고 Teams 카드 교체도 적용되지 않습니다. 겉으로는 같은 문제지만 규칙은 다릅니다.

## 핵심 요약

- Adaptive Cards는 제출 후 기본적으로 비활성화되지 않으므로 직접 구현해야 합니다.
- **사용자 지정 웹 포털**에서는 WebChat attachment middleware를 사용해 클라이언트에서 카드를 비활성화할 수 있습니다. 깔끔하고 시각적이며 간단합니다.
- **Microsoft Teams**에서는 `Action.Execute`와 verb를 사용하는 Universal Actions를 활용합니다. Copilot Studio 토픽이 invoke를 받아 데이터를 처리하고 대체 카드를 반환합니다.
- 두 패턴은 서로 다른 방법으로 같은 UX 문제를 해결합니다. 채널에 따라 적용 방법이 달라지므로 에이전트가 있는 위치를 기준으로 선택합니다.
- ESS가 있는 **Microsoft 365 Copilot** 채널에서는 현재 어느 패턴도 적용되지 않습니다. `Action.Execute` 카드는 지원되지 않으므로 제출 후 상황을 설계로 보완해야 합니다.
- 이전 버전 호환성을 위해 Universal Action 카드에는 항상 `"fallback": "Action.Submit"`을 포함합니다.

## 완성도 높은 에이전트는 작은 순간들이 모여 만들어집니다

Adaptive Cards는 에이전트에서 실제 입력을 수집하는 가장 좋은 방법 중 하나지만, 피드백이 없는 입력은 사용자에게 추측만 하게 만듭니다. 제대로 동작하지 않는 것처럼 보이는 에이전트와 완성도 높은 에이전트의 차이는 사용자가 Submit을 누르는 순간 무엇을 보느냐에 달려 있는 경우가 많습니다. WebChat의 클라이언트 측이든 Teams의 서버 측이든 그 순간을 보완하면 사용자가 버그를 신고하기도 전에 신뢰를 떨어뜨리는 작지만 반복적인 불편을 없앨 수 있습니다.

다음 카드를 배포하기 전에 직접 Submit을 눌러 어떤 일이 일어나는지 확인하세요. 아무 일도 일어나지 않는다면 이제 어떻게 고칠지 알게 되었습니다.

에이전트에서 제출 후 상황을 어떻게 처리하고 계신가요? 댓글로 알려주세요.
