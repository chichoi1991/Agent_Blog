---
layout: "chapter"
date: 2026-11-11
title: "Copilot Studio 에이전트에서 제출 후 Adaptive Card 비활성화하기"
short_title: "제출 후 카드 비활성화"
description: "WebChat 첨부 파일 미들웨어와 Teams Universal Actions로 제출된 Adaptive Card를 비활성화하거나 교체하는 방법을 설명합니다."
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
  <img src="{{ '/assets/catblog/disable-adaptive-cards-after-submission/header.png' | relative_url }}" alt="제출 버튼을 눌렀습니다. 카드는 접수했지만, 그 사실을 알려주는 걸 깜빡했습니다." loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

Adaptive Card 양식을 포함한 에이전트를 배포했다고 가정해 봅시다. 사용자가 값을 입력하고 제출을 누르자 방금 입력한 데이터가 사라집니다. 카드는 여전히 입력할 수 있어 보이므로 사용자는 실패한 줄 알고 다시 작성해 제출합니다. 이번에는 대화가 이미 진행된 탓에 오류가 발생합니다.

실제로 잘못된 것은 없습니다. 에이전트는 데이터를 받아 정상적으로 처리했습니다. 다만 카드가 사용자에게 그 사실을 알려주지 않았을 뿐이며, 직원 수천 명에게 에이전트를 배포하고 나면 이 작은 간극이 실제 지원 문제로 이어집니다.

해결 방법은 있습니다. 다만 에이전트가 어디에서 실행되는지에 따라 올바른 해결책이 달라집니다. 사용자 지정 웹 포털과 Microsoft Teams에서 사용할 수 있는 방법이 다르므로 이 글에서는 두 가지를 모두 살펴봅니다.

## 이런 문제가 생기는 이유

Adaptive Cards에는 기본적으로 "제출 후 비활성화" 기능이 없습니다. 사용자가 카드를 제출하면 다음과 같이 됩니다.

1. 입력 필드가 지워져 데이터가 화면에서 사라집니다.
2. 카드가 계속 상호 작용 가능한 상태로 남습니다.
3. 대화가 이미 다음 단계로 진행됐기 때문에 두 번째 제출은 오류를 일으킵니다.

에이전트 로직의 버그가 아니라 플랫폼 동작입니다. 에이전트는 데이터를 정상 수신·처리했지만 사용자는 그 사실을 알 수 없습니다.

## 두 채널, 두 가지 패턴

해결책은 에이전트가 표시되는 위치에 따라 달라집니다.

| 채널 | 패턴 | 메커니즘 |
|---|---|---|
| 웹 포털(WebChat) | 첨부 파일 미들웨어 | 클라이언트에서 카드 비활성화 |
| Microsoft Teams | Universal Actions | 서버에서 카드 교체 |
| Microsoft 365 Copilot | 지원되는 우회 방법 없음 | `Action.Execute`가 처리되지 않음 |

먼저 두 가지 우회 방법을 살펴본 다음, 어느 쪽도 적용되지 않는 Microsoft 365 Copilot에서 어떻게 해야 하는지 설명합니다.

## 패턴 1: 사용자 지정 웹 포털(BotFramework-WebChat)

> 이 패턴은 클라이언트를 직접 제어하는 BotFramework-WebChat SDK 기반 사용자 지정 웹 포털 또는 셀프서비스 페이지에 에이전트를 포함할 때 사용할 수 있습니다.
>
> Microsoft 365 [Employee Self-Service(ESS) 에이전트](https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/overview)에는 적용되지 않습니다. 이름은 비슷해도 ESS는 Microsoft 365 Copilot 채널에서 실행되고 클라이언트를 직접 호스팅하지 않으므로 미들웨어를 연결할 위치가 없습니다. 해당 채널에 관한 내용은 글의 뒷부분에서 다룹니다.

핵심은 간단합니다. WebChat의 **[첨부 파일 미들웨어](https://microsoft.github.io/mcscatblog/posts/webchat-middlewares/)**에서 카드가 가장 최근의 봇 메시지에 속하는지 확인합니다. 그렇지 않다면(즉 사용자가 이미 다음 메시지로 넘어갔다면) 비활성화된 카드로 렌더링합니다.

### 핵심 로직

미들웨어는 Adaptive Card 렌더링을 가로채 활동이 스토어의 최신 메시지인지 비교합니다.

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

핵심은 `disabled={!recentBotMessage}` 줄입니다. 봇이 새 메시지를 보내면 이전 카드는 비활성화됩니다. 입력은 읽기 전용이 되고 버튼은 작동하지 않습니다.

### CSS로 시각적 피드백 추가

버튼을 이미 사용했다는 점을 분명히 하려면 수행된 작업을 스타일링하는 CSS 클래스를 추가합니다.

```css
#webchat .card__action--performed {
  background-color: #0063b1 !important;
  border-color: #0063b1 !important;
  color: White !important;
}
```

제출한 버튼에 파란색 배경이 적용되어 사용자가 상태를 명확히 확인할 수 있습니다.

### 연결하기

WebChat을 렌더링할 때 미들웨어를 전달합니다.

```javascript
<ReactWebChat
  attachmentMiddleware={attachmentMiddleware}
  directLine={directLine}
  store={store}
/>
```

> 이 방법은 **클라이언트 측** 해결책입니다. UI에서 재제출을 막지만 서버 측에서 강제하지는 않습니다. 대부분의 셀프서비스 포털에서는 충분합니다.

전체 동작 샘플은 [BotFramework-WebChat 저장소](https://github.com/microsoft/BotFramework-WebChat/tree/main/samples/05.custom-components/l.disable-adaptive-cards)에서 확인할 수 있습니다.

## 패턴 2: Microsoft Teams(Universal Actions)

Teams에서는 클라이언트를 제어할 수 없으므로 WebChat 미들웨어를 사용할 수 없습니다. Teams 에이전트 설계 전반은 [Teams 에이전트 패턴 글](https://microsoft.github.io/mcscatblog/posts/copilot-studio-teams-agent-patterns/)에서 다룹니다. 여기서는 카드 작업에 응답하고 그 자리에 새 카드를 반환하는 모델인 [**Universal Actions**](https://learn.microsoft.com/en-us/adaptive-cards/authoring-cards/universal-action-model)를 사용합니다.

### Universal Actions 작동 방식

| 순서 | 작업 |
|---|---|
| 1 | 사용자가 Teams에서 카드를 작성하고 제출합니다. |
| 2 | Teams가 verb가 포함된 invoke 활동을 에이전트에 보냅니다. |
| 3 | 에이전트가 데이터를 처리하고 verb에 따라 분기합니다. |
| 4 | 에이전트가 교체 카드를 반환합니다(HTTP 200). |
| 5 | Teams가 원래 카드를 확인 카드로 교체해 사용자에게 표시합니다. |

`Action.Submit` 대신 고유한 **verb**를 지정한 `Action.Execute`를 카드에서 사용합니다. 사용자가 버튼을 누르면 Teams가 Copilot Studio에 invoke 활동을 보냅니다. 토픽이 해당 활동을 받아 데이터를 처리한 뒤 새 카드를 반환하면 Teams가 원래 카드를 교체합니다.

사용자에게는 양식 대신 확인 메시지가 표시됩니다. 혼란도, 재제출도 없습니다.

### 1단계: `Action.Execute`로 카드 설계

기존 Adaptive Card에서 시작하면 됩니다. JSON을 직접 작성하고 싶지 않다면 [Copilot이 카드를 생성하도록](https://microsoft.github.io/mcscatblog/posts/adaptive-card-generation/) 한 뒤 작업을 수정할 수 있습니다. 중요한 부분은 버튼입니다. `Action.Submit`을 `Action.Execute`로 바꾸고 `verb`를 추가합니다.

<details>
<summary><code>Action.Execute</code>를 사용하는 Adaptive Card 버튼</summary>

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

> Universal Actions를 지원하지 않는 클라이언트에서도 카드가 자연스럽게 작동하도록 `"fallback": "Action.Submit"`을 사용하세요.

### 2단계: "메시지 보내기" 노드로 카드 전송

Copilot Studio에서 Adaptive Card JSON을 사용하는 [**메시지 보내기**](https://learn.microsoft.com/microsoft-copilot-studio/authoring-send-message) 노드를 사용합니다. [**Adaptive Card로 질문하기**](https://learn.microsoft.com/microsoft-copilot-studio/authoring-ask-with-adaptive-card) 노드는 사용하지 마세요. 이 노드는 내부적으로 `Action.Submit`을 사용하기 때문에 invoke/refresh 흐름을 실행하지 않습니다.

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

### 4단계: 교체 카드 반환

응답은 Universal Action 응답 형식을 따라야 합니다.

<details>
<summary>교체 카드를 포함한 Universal Action 응답</summary>

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

원래 카드는 교체됩니다. 버튼이나 입력 필드 대신 깔끔한 확인 메시지만 남습니다.

> Copilot Studio 테스트 캔버스가 아니라 Teams에서 직접 테스트하세요. 테스트 패널에서는 invoke/refresh 흐름이 작동하지 않을 수 있습니다.

[Nghiem Doan](https://github.com/nghiemdoan-msft)이 만든 이 패턴의 완전한 가져오기 가능 버전은 [CopilotStudioSamples 저장소](https://github.com/microsoft/CopilotStudioSamples/tree/main/authoring/solutions/adaptive-card-refresh)에서 솔루션으로 제공됩니다.

## Microsoft 365 Copilot 채널은 어떨까요?

위의 두 패턴은 클라이언트를 직접 제어하는 WebChat 또는 Teams를 전제로 합니다. **Microsoft 365 Copilot** 채널은 어느 쪽에도 해당하지 않습니다. Microsoft 자체 [Employee Self-Service(ESS) 에이전트](https://learn.microsoft.com/microsoft-365/copilot/employee-self-service/overview)를 비롯해 이곳에 표시되는 에이전트가 늘고 있어 중요한 차이입니다.

2026년 7월 현재 상황은 다음과 같습니다.

- **WebChat 미들웨어는 적용되지 않습니다.** 클라이언트를 호스팅하지 않으므로 첨부 파일 미들웨어를 연결할 곳이 없습니다.
- **Universal Actions는 실행되지 않습니다.** Adaptive Cards의 `Action.Execute`는 [Microsoft 365 Copilot 채널에서 지원되지 않는 노드 유형](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-microsoft-teams#known-limitations)에 해당하므로 카드를 교체하는 invoke/refresh 흐름이 실행되지 않습니다.

현재 Microsoft 365 Copilot에서는 제출 후 카드를 비활성화하거나 교체하는 지원 방법이 없습니다. 실용적인 방법은 설계를 조정하는 것입니다. 가능한 경우 카드는 정보 제공용으로 두고, 제출 중심 카드 대신 질문 노드나 대화형 입력을 사용합니다. 사용자가 눌렀을 때 아무 일도 없어 보이더라도 텍스트를 통해 입력이 접수된 것으로 이해할 수 있게 합니다.

> ESS는 여기서 혼동하기 쉽습니다. 사용자 지정 포털 시나리오와 유사해 WebChat 해결책이 통할 것처럼 보이지만, ESS는 클라이언트 측 연결 지점에 접근할 수 없는 Microsoft 365 Copilot 채널에서 실행됩니다. Teams 카드 교체도 적용되지 않습니다. 비슷해 보이는 문제라도 규칙은 다릅니다.

## 핵심 요약

- Adaptive Cards는 제출 후 기본적으로 비활성화되지 않으므로 직접 구현해야 합니다.
- **사용자 지정 웹 포털**에서는 WebChat 첨부 파일 미들웨어로 클라이언트 측 카드를 비활성화합니다. 명확하고 시각적인 방법입니다.
- **Microsoft Teams**에서는 `Action.Execute`와 verb를 사용하는 Universal Actions를 활용합니다. Copilot Studio 토픽이 invoke를 받아 데이터를 처리하고 교체 카드를 반환합니다.
- 두 패턴은 같은 UX 문제를 서로 다른 방식으로 해결합니다. 채널에 따라 적용 방법이 달라지므로 에이전트가 실행되는 위치를 기준으로 선택합니다.
- ESS 에이전트가 실행되는 **Microsoft 365 Copilot** 채널에는 현재 두 패턴 모두 적용되지 않습니다. `Action.Execute` 카드는 지원되지 않으므로 제출 후 상황을 고려해 설계해야 합니다.
- 이전 버전과의 호환성을 위해 Universal Action 카드에는 항상 `"fallback": "Action.Submit"`을 포함합니다.

## 세심하게 다듬은 에이전트는 작은 순간들이 모여 완성됩니다

Adaptive Cards는 에이전트에서 실제 입력을 받는 좋은 방법 중 하나지만, 피드백이 없는 입력은 사용자를 추측하게 만듭니다. 에이전트가 고장 난 듯한 느낌과 완성된 느낌의 차이는 사용자가 제출을 누르는 순간 보게 되는 화면 하나에 달려 있는 경우가 많습니다. WebChat에서는 클라이언트 측으로, Teams에서는 서버 측으로 그 순간을 보완하면 사용자의 신뢰를 서서히 깎아내리는 작고 조용한 불편을 없앨 수 있습니다.

그러니 다음 카드를 배포하기 전에 직접 제출 버튼을 눌러 보세요. "아무 일도 일어나지 않음"이 답이라면, 이제 어떻게 고칠지 알게 됐습니다.

여러분의 에이전트에서는 제출 후 상황을 어떻게 처리하시나요? 댓글로 의견을 들려주세요.
