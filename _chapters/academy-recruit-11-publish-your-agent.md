---
layout: "chapter"
date: 2026-08-06
title: "에이전트를 게시하고 Teams와 Microsoft 365 Copilot에 배포하기"
short_title: "에이전트 게시"
description: "에이전트를 Microsoft Teams와 Microsoft 365 Copilot에 배포합니다."
order: 11
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/11-publish-your-agent/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/11-publish-your-agent/"
---

<div class="info-box note translated-post" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 11: Publish Your Agent](https://microsoft.github.io/agent-academy/recruit/11-publish-your-agent/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

🎥 **워크스루 영상 보기**

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-11-publish-your-agent/video-thumbnail.jpg' | relative_url }}" alt="Publish agent video thumbnail" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption><a href="https://www.youtube.com/watch?v=eVZmljhYlSI">YouTube에서 워크스루 보기</a></figcaption></figure>

## 🎯 미션 브리핑

다시 오신 것을 환영합니다, Recruit. agent를 빌드하고 테스트했다면 이제 Microsoft Teams와 Microsoft 365 Copilot에서 사용자가 쓸 수 있도록 게시할 준비가 되었습니다.

명확한 미션, 강력한 tool, 핵심 지식 소스를 갖춘 agent는 이제 서비스를 시작할 준비가 되어 있습니다. Microsoft Copilot Studio를 사용해 agent를 배포하면 실제 사용자가 일하는 바로 그곳에서 도움을 받을 수 있습니다.

이제 agent를 실행에 옮겨 봅시다.

<div class="info-box note" markdown="1">
**중요: 이 미션은 classic Copilot Studio experience를 사용합니다**

이 실습의 스크린샷과 Copilot Studio 화면이 다르면 오른쪽 위의 **New Experience**를 꺼서 여기에서 사용하는 **classic experience**로 전환하세요.
</div>

## 🔎 학습 목표

이 미션에서는 다음을 배웁니다.

1. agent 업데이트를 사용자에게 제공하려면 publish가 필요한 이유
1. agent를 publish하면 어떤 일이 일어나는지
1. Microsoft Teams와 Microsoft 365 Copilot을 channel로 추가하는 방법
1. Microsoft Teams에서 agent를 추가하는 방법
1. 조직 전체에서 agent를 사용할 수 있게 만드는 방법

## 🚀 agent 게시하기

Copilot Studio에서 agent를 작업할 때마다 지식이나 tool을 추가해 업데이트할 수 있습니다. 모든 변경을 마치고 충분히 테스트했다면 이제 publish할 준비가 된 것입니다. publish하면 최신 업데이트가 라이브로 반영됩니다. 새 tool로 agent를 업데이트했더라도 publish 버튼을 누르지 않으면 아직 최종 사용자에게 제공되지 않습니다.

agent 사용자에게 업데이트를 전달하려면 항상 publish 버튼을 눌러야 합니다. agent에 channel이 추가되어 있다면 publish할 때 agent에 추가한 모든 channel에서 업데이트를 사용할 수 있게 됩니다.

<div class="info-box note" markdown="1">
**중요**

❗ 최근 Copilot Studio Trial 환경 정책이 바뀌어 trial 환경에서는 agent publish가 제한됩니다. Trial 환경이라면 이 모듈에서 agent 게시를 완료할 수 없고, agent를 publish하려면 유료 환경이 필요합니다. 다만 배지를 받기 위해 agent 게시가 필수인 것은 아닙니다.
</div>

## ⚙️ channel 구성하기

channel은 사용자가 agent에 접근하고 상호작용할 수 있는 위치를 결정합니다. agent를 publish한 뒤 여러 channel에서 사용할 수 있게 만들 수 있습니다. channel마다 agent 콘텐츠가 표시되는 방식이 다를 수 있습니다.

agent를 다음 channel에 추가할 수 있습니다.

- **Microsoft Teams and Microsoft 365 Copilot** - Teams 채팅과 회의, Microsoft 365 Copilot 환경에서 agent를 사용할 수 있게 합니다. [Teams와 Microsoft 365 Copilot에 agent 게시](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-microsoft-teams)를 참고하세요.
- **Demo website** - Copilot Studio가 제공하는 데모 웹사이트에서 agent를 테스트합니다. [agent를 웹 channel에 연결](https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-web-channels)을 참고하세요.
- **Custom website** - 자체 웹사이트에 agent를 직접 포함합니다. [agent를 사용자 지정 웹사이트에 연결](https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-web-channels)을 참고하세요.
- **Mobile app** - 사용자 지정 모바일 애플리케이션에 agent를 통합합니다. [agent를 모바일 앱에 연결](https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-custom-application)을 참고하세요.
- **SharePoint** - 문서와 사이트 지원을 위해 SharePoint 사이트에 agent를 추가합니다. [SharePoint에 agent 추가](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-sharepoint)를 참고하세요.
- **Facebook Messenger** - Facebook 메시징 플랫폼을 통해 사용자와 연결합니다. [Facebook에 agent 추가](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-facebook)를 참고하세요.
- **Power Pages** - Power Pages 웹사이트에 agent를 통합합니다. [Power Pages에 agent 추가](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-power-pages)를 참고하세요.
- **Azure Bot Service channels** - Slack, Telegram, Twilio SMS 등 추가 channel에 접근합니다. [Azure Bot Service channel에 agent 연결](https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-azure-bot-service-channels)을 참고하세요.

channel을 추가하려면 agent의 **Channels** 탭으로 이동해 구성할 channel을 선택합니다. channel마다 설정 요구 사항이 다르며 추가 인증이나 구성 단계가 필요할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-11-publish-your-agent/channels.png' | relative_url }}" alt="Agent의 Channels 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Agent의 Channels 탭</figcaption>
</figure>

## 📺 channel별 사용자 경험

channel마다 사용자 경험이 다릅니다. 여러 channel용 agent를 빌드한다면 channel별 차이를 알고 있어야 합니다. agent가 의도한 대로 실제로 동작하는지 확인하려면 여러 channel에서 테스트하는 것이 항상 좋은 전략입니다.

| 경험 요소 | Website | Teams and Microsoft 365 Copilot | Facebook | Dynamics Omnichannel for Customer Service |
| :-- | :-- | :-- | :-- | :-- |
| 고객 만족도 설문 | Adaptive card | Text-only | Text-only | Text-only |
| 객관식 옵션 | 지원됨 | [최대 6개까지 지원(hero card 기준)][1] | [최대 13개까지 지원][3] | [부분 지원][5] |
| Markdown | 지원됨 | [부분 지원][2] | [부분 지원][4] | [부분 지원][6] |
| 환영 메시지 | 지원됨 | 지원됨 | 지원되지 않음 | [Chat][7]에서는 지원. 다른 channel에서는 지원되지 않음 |
| Did-You-Mean | 지원됨 | 지원됨 | 지원됨 | [Microsoft Teams][8], [Chat][7], Facebook 및 텍스트 전용 channel(short message service (SMS) via [TeleSign][9] and [Twilio][10], [WhatsApp][11], [WeChat][12], and [Twitter][13])에서 지원. Suggested actions는 텍스트 전용 목록으로 표시되며, 사용자가 응답하려면 옵션을 다시 입력해야 함 |

[1]: https://learn.microsoft.com/microsoftteams/platform/concepts/cards/cards-reference#hero-card
[2]: https://learn.microsoft.com/microsoftteams/platform/bots/how-to/format-your-bot-messages#text-only-messages
[3]: https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies/
[4]: https://www.facebook.com/help/147348452522644?helpref=related
[5]: https://learn.microsoft.com/dynamics365/customer-service/asynchronous-channels#suggested-actions-support
[6]: https://learn.microsoft.com/dynamics365/customer-service/asynchronous-channels#preview-support-for-formatted-messages
[7]: https://learn.microsoft.com/dynamics365/customer-service/set-up-chat-widget
[8]: https://learn.microsoft.com/dynamics365/customer-service/configure-microsoft-teams
[9]: https://learn.microsoft.com/dynamics365/customer-service/configure-sms-channel
[10]: https://learn.microsoft.com/dynamics365/customer-service/configure-sms-channel-twilio
[11]: https://learn.microsoft.com/dynamics365/customer-service/configure-whatsapp-channel
[12]: https://learn.microsoft.com/dynamics365/customer-service/configure-wechat-channel
[13]: https://learn.microsoft.com/dynamics365/customer-service/configure-twitter-channel

<div class="info-box note" markdown="1">
**참고**

channel별로 서로 다른 로직을 사용할 수 있는 예시가 몇 가지 있습니다. Power Platform Snippets 저장소에서 그 예시를 확인할 수 있습니다.

Henry Jammes가 공유한 [Adaptive Card channel-logic 예제](https://github.com/pnp/powerplatform-snippets/blob/main/copilot-studio/multiple-topics-matched-topic/source/multiple-topics-matched.yaml#L40)는 channel이 Microsoft Teams일 때 다른 card를 보여주는 방법을 설명합니다.
</div>

## 🧪 Lab 11: agent를 Teams와 Microsoft 365 Copilot에 게시하기

### 🎯 사용 사례

Contoso IT Help Desk agent는 이제 강력한 기능으로 완전히 구성되었습니다. SharePoint 지식 소스에 접근하고, 지원 티켓을 만들고, 사전 알림을 보내며, 사용자 질문에 지능적으로 응답할 수 있습니다. 하지만 현재 이 모든 기능은 agent를 만든 개발 환경에서만 사용할 수 있습니다.

**문제:** agent를 제대로 publish하고 사용자가 실제로 일하는 channel을 통해 접근할 수 있게 만들기 전까지 최종 사용자는 agent의 기능을 활용할 수 없습니다.

**해결:** agent를 publish하면 최근 업데이트, 새 topic, 향상된 지식 소스, 구성된 flow가 모두 포함된 최신 버전을 실제 사용자가 사용할 수 있습니다. publish하지 않으면 사용자는 중요한 기능이 빠진 이전 버전의 agent와 계속 상호작용할 수 있습니다.

Teams와 Microsoft 365 Copilot channel을 추가하는 것도 마찬가지로 중요합니다. 이유는 다음과 같습니다.

- **Teams Integration**: 조직의 직원들은 협업, 회의, 커뮤니케이션을 위해 하루 대부분을 Microsoft Teams에서 보냅니다. Teams에 agent를 추가하면 사용자는 주 업무 환경을 벗어나지 않고 IT 지원을 받을 수 있습니다.

- **Microsoft 365 Copilot**: 사용자는 Microsoft 365 Copilot experience 안에서 전문화된 IT help desk agent에 직접 접근할 수 있으므로 Office 애플리케이션 전반의 일상 워크플로에 자연스럽게 통합됩니다.

- **Centralized Access**: 사용자가 별도 웹사이트나 애플리케이션을 기억할 필요 없이 이미 사용하는 플랫폼에서 IT 지원을 이용할 수 있어 마찰이 줄고 도입률이 높아집니다.

이 미션은 여러분의 개발 결과를 조직의 최종 사용자에게 실제 가치를 제공하는 프로덕션 준비 솔루션으로 전환합니다.

### Prerequisites

이 실습을 시작하기 전에 다음을 확인하세요.

- ✅ 이전 실습을 완료했고 완전히 구성된 Contoso Helpdesk Agent가 있음
- ✅ agent를 테스트했으며 프로덕션 사용 준비가 되었음
- ✅ Copilot Studio 환경에서 agent를 publish할 권한이 있음
- ✅ 조직의 Microsoft Teams에 접근할 수 있음

### 11.1 agent 게시하기

이제 agent에 대한 모든 작업을 마쳤으므로 agent를 사용할 최종 사용자에게 우리의 작업이 제공되도록 해야 합니다. 모든 사용자가 콘텐츠를 사용할 수 있게 하려면 agent를 publish해야 합니다.

1. [Copilot Studio maker portal](https://copilotstudio.microsoft.com)을 통해 Copilot Studio에서 Contoso Helpdesk Agent로 이동합니다.

   Copilot Studio에서는 agent를 쉽게 publish할 수 있습니다. agent 개요 상단에서 publish 버튼을 선택하면 됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/publish.png' | relative_url }}" alt="Agent 개요의 Publish 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Agent 개요의 Publish 버튼</figcaption>
   </figure>
1. agent에서 **Publish** 버튼을 선택합니다.

   그러면 agent를 정말 publish할 것인지 확인하는 publish 팝업이 열립니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/publish-popup.png' | relative_url }}" alt="Publish 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Publish 확인</figcaption>
   </figure>
1. **Publish** 를 선택해 agent 게시를 확정합니다.

   이제 agent가 게시 중이라는 메시지가 표시됩니다. 이 팝업을 계속 열어 둘 필요는 없습니다. agent가 게시되면 알림을 받게 됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/publishing.png' | relative_url }}" alt="Agent 게시 중" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Agent 게시 중</figcaption>
   </figure>
   agent 게시가 완료되면 agent 페이지 상단에 알림이 표시됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/publish-notification.png' | relative_url }}" alt="게시 완료 알림" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>게시 완료 알림</figcaption>
   </figure>
agent는 게시되었지만 아직 channel을 통해 사용할 수 없습니다. 이제 그 부분을 해결해 봅시다.

### 11.2 Teams and Microsoft 365 Copilot channel 추가하기

1. agent 탐색에서 **Channels** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/channels-tab.png' | relative_url }}" alt="Channels 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Channels 탭</figcaption>
   </figure>
   여기에서 이 agent에 추가할 수 있는 모든 channel을 볼 수 있습니다.

1. **Teams and Microsoft 365** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/teams-m365-copilot.png' | relative_url }}" alt="Teams and Microsoft 365 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Teams and Microsoft 365 선택</figcaption>
   </figure>
1. **Add channel** 을 선택해 마법사를 완료하고 channel을 agent에 추가합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/add-channel.png' | relative_url }}" alt="Add channel 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Add channel 선택</figcaption>
   </figure>
   추가에는 약간의 시간이 걸릴 수 있습니다. 준비가 완료되면 사이드바 상단에 성공 알림이 표시됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/channel-added.png' | relative_url }}" alt="Channel 추가됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Channel 추가됨</figcaption>
   </figure>
1. **See agent in Teams** 를 선택해 새 탭을 엽니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/see-agent-teams.png' | relative_url }}" alt="Teams에서 agent 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Teams에서 agent 보기</figcaption>
   </figure>
1. **Add** 를 선택해 Contoso Helpdesk Agent를 Teams에 추가합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/add-teams.png' | relative_url }}" alt="Teams에 agent 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Teams에 agent 추가</figcaption>
   </figure>
   이 작업은 약간의 시간이 걸립니다. 완료되면 다음 화면이 표시됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/teams-added.png' | relative_url }}" alt="Agent 추가 성공" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Agent 추가 성공</figcaption>
   </figure>
1. **Open** 을 선택해 Teams에서 agent를 엽니다.

   그러면 agent가 Teams app으로 열립니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/agent-teams-open.png' | relative_url }}" alt="Microsoft Teams에서 열린 agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Microsoft Teams에서 열린 agent</figcaption>
   </figure>
이제 Microsoft Teams에서 여러분이 사용할 수 있도록 agent를 게시했습니다. 하지만 더 많은 사람이 사용할 수 있게 만들고 싶을 수 있습니다.

### 11.3 테넌트 전체 사용자에게 agent 제공하기

1. Contoso Helpdesk Agent가 열린 브라우저 탭을 닫습니다.

   그러면 Teams and Microsoft 365 Copilot 측면 패널이 아직 열려 있는 Copilot Studio로 돌아옵니다. 방금 agent를 Teams에서 열었지만, 여기에서 훨씬 더 많은 작업을 할 수 있습니다. agent 세부 정보를 편집하고, 더 많은 사용자에게 agent를 배포하는 등의 작업이 가능합니다.

1. **Edit details** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/m365-teams-edit-details.png' | relative_url }}" alt="Edit details" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Edit details</figcaption>
   </figure>
   그러면 agent의 여러 세부 정보와 설정을 변경할 수 있는 창이 열립니다. 아이콘, 아이콘 배경색, 설명 같은 기본 세부 정보를 변경할 수 있습니다. 또한 사용자가 agent를 팀에 추가하도록 허용할지, 그룹 및 회의 채팅에서 이 agent를 사용할 수 있게 할지 같은 Teams 설정도 여기에서 변경할 수 있습니다. *more*를 선택하면 개발자 이름, 웹사이트, 개인정보처리방침, 이용 약관 같은 개발자 세부 정보도 변경할 수 있습니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/edit-details.png' | relative_url }}" alt="Edit details 창" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Edit details 창</figcaption>
   </figure>
1. **Cancel** 을 선택해 Edit details 창을 닫습니다.

1. **Availability options** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/m365-teams-availability-options.png' | relative_url }}" alt="Availability options" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Availability options</figcaption>
   </figure>
   그러면 availability options 창이 열립니다. 여기에서 사용자에게 보내 agent를 사용하게 할 링크를 복사할 수 있고(사용자에게 agent도 공유해야 한다는 점에 유의하세요), Microsoft Teams 또는 Microsoft 365 store에 agent를 추가하기 위한 파일을 다운로드할 수 있습니다. store에 agent를 표시하려면 다른 옵션도 있습니다. 팀원과 공유 사용자에게 표시하거나(*Built with Power Platform* 섹션에 표시), 조직의 모든 사용자에게 표시할 수 있습니다(관리자 승인 필요).

1. **Show to everyone in my org** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/availability-options.png' | relative_url }}" alt="Availability options" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Availability options</figcaption>
   </figure>
1. **Submit for admin approval** 을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/submit-for-approval.png' | relative_url }}" alt="승인을 위해 제출" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>승인을 위해 제출</figcaption>
   </figure>
   이제 관리자가 agent 제출을 승인해야 합니다. 관리자는 Teams Admin Center로 이동해 Apps에서 Contoso Helpdesk Agent를 찾아 승인할 수 있습니다. 스크린샷에서는 관리자가 Teams Admin Center에서 보게 될 화면을 볼 수 있습니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/pending-approval.png' | relative_url }}" alt="승인 대기 중인 Teams app" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>승인 대기 중인 Teams app</figcaption>
   </figure>
   관리자는 Contoso Helpdesk Agent를 선택한 다음 *Publish* 를 선택해 Contoso Helpdesk Agent를 모두에게 publish해야 합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/teams-apps-publish.png' | relative_url }}" alt="Teams app 게시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Teams app 게시</figcaption>
   </figure>
   관리자가 agent 제출을 publish하면 Copilot Studio를 새로고침했을 때 availability options에 *available in app store* 배너가 표시됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/available-in-app-store.png' | relative_url }}" alt="App Store에서 사용 가능" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>App Store에서 사용 가능</figcaption>
   </figure>
여기에는 더 많은 가능성이 있습니다. 관리자는 global setup policy를 변경해 tenant의 모든 사용자에게 Contoso Helpdesk Agent를 자동 설치할 수 있습니다. 또한 Contoso Helpdesk Agent를 왼쪽 레일에 고정해 모든 사용자가 쉽게 접근하게 할 수도 있습니다.

## ✅ Mission Complete

성공적으로 완료한 내용은 다음과 같습니다.

- **Publishing**: agent의 최신 버전을 publish했습니다.
- **Channels**: Microsoft Teams와 Microsoft 365 Copilot을 추가했습니다.
- **Teams installation**: Microsoft Teams에서 agent를 추가하고 테스트했습니다.
- **Organizational availability**: 관리자 승인과 배포를 위해 agent를 준비했습니다.

다음으로 [Mission 12: Understanding Licensing]({{ '/chapters/academy-recruit-12-understanding-licensing/' | relative_url }})을 계속 진행하세요.

## 📚 Tactical Resources

- [agent publish 및 channel 관리](https://learn.microsoft.com/microsoft-copilot-studio/publication-fundamentals-publish-channels)
