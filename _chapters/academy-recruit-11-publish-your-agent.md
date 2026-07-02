---
layout: "chapter"
title: "에이전트를 게시하고 Teams와 Microsoft 365 Copilot에 배포하기"
short_title: "에이전트 게시"
description: "에이전트를 Microsoft Teams와 Microsoft 365 Copilot에 배포합니다."
order: 11
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/11-publish-your-agent/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-01-14"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/11-publish-your-agent/"
---

<div class="info-box note translated-post" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 11: Publish Your Agent](https://microsoft.github.io/agent-academy/recruit/11-publish-your-agent/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

🎥 [YouTube 워크스루 보기](https://www.youtube.com/watch?v=eVZmljhYlSI)

## 🎯 미션 브리핑

여러 모듈을 마쳤다면 이제 가장 중요한 단계인 **게시(publish)** 가 남았습니다. 이제 만든 agent를 Microsoft Teams와 Microsoft 365 Copilot에서 실제 사용자가 쓸 수 있도록 배포할 차례입니다.

명확한 목적, 강력한 tool, 유용한 지식 소스를 갖춘 agent라도 게시하지 않으면 사용자에게 보이지 않습니다. 이번 미션에서는 Copilot Studio에서 agent를 배포하고 실제 업무 채널에 연결하는 방법을 익힙니다.

<div class="info-box note" markdown="1">
**참고**

이 실습의 스크린샷과 Copilot Studio 화면이 다르면 오른쪽 위의 **New Experience**를 꺼서 여기에서 사용하는 **classic experience**로 전환하세요.
</div>

## 🔎 학습 목표

이 레슨에서는 다음을 다룹니다.

1. agent를 publish해야 하는 이유
1. publish 시 실제로 일어나는 일
1. channel(Microsoft Teams & Microsoft 365 Copilot) 추가 방법
1. Microsoft Teams에서 agent를 추가하는 방법
1. 조직 전체에 agent를 배포하는 방법

## 🚀 agent 게시하기

Copilot Studio에서 agent를 작업하다 보면 지식이나 tool을 계속 추가하게 됩니다. 변경을 충분히 테스트했고 사용자에게 반영할 준비가 되었다면 이제 publish해야 합니다. **publish를 눌러야 최신 업데이트가 라이브로 반영** 됩니다.

새 tool이나 변경사항을 넣고도 publish하지 않으면 최종 사용자는 여전히 이전 버전의 agent를 사용하게 됩니다. agent에 여러 channel이 연결되어 있다면 publish 시점에 그 모든 channel에 최신 변경이 반영됩니다.

<div class="info-box note" markdown="1">
**중요**

최근 Copilot Studio Trial 환경 정책이 바뀌어 trial 환경에서는 agent publish가 제한됩니다. Trial 환경이라면 이 모듈의 게시 단계는 완료할 수 없고, 실제 게시에는 유료 환경이 필요합니다. 다만 배지를 받기 위해 게시 자체가 필수는 아닙니다.
</div>

## ⚙️ channel 구성하기

channel은 사용자가 agent에 접근하고 상호작용하는 위치를 뜻합니다. agent를 publish한 뒤 여러 channel에 노출할 수 있으며, channel마다 표시 방식이 조금씩 다를 수 있습니다.

추가할 수 있는 대표 channel은 다음과 같습니다.

- **Microsoft Teams and Microsoft 365 Copilot** - Teams 채팅/회의와 Microsoft 365 Copilot 환경에서 사용 가능 ([Learn more](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-microsoft-teams))
- **Demo website** - Copilot Studio가 제공하는 데모 웹사이트에서 테스트 ([Learn more](https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-web-channels))
- **Custom website** - 자체 웹사이트에 agent 내장 ([Learn more](https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-web-channels))
- **Mobile app** - 커스텀 모바일 앱에 통합 ([Learn more](https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-custom-application))
- **SharePoint** - SharePoint 사이트에 agent 추가 ([Learn more](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-sharepoint))
- **Facebook Messenger** - Facebook 메시징 채널과 연결 ([Learn more](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-facebook))
- **Power Pages** - Power Pages 사이트에 통합 ([Learn more](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-power-pages))
- **Azure Bot Service channels** - Slack, Telegram, Twilio SMS 등 추가 채널 연결 ([Learn more](https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-azure-bot-service-channels))

channel을 추가하려면 agent의 **Channels** 탭으로 이동해 원하는 channel을 선택하면 됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-11-publish-your-agent/channels.png' | relative_url }}" alt="Channels 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Channels 탭</figcaption>
</figure>
## 📺 channel별 사용자 경험

channel마다 사용자 경험이 다릅니다. 여러 channel에서 agent를 운영한다면 각 차이를 알고, 실제로 의도한 대로 동작하는지 직접 테스트하는 것이 좋습니다.

| 경험 요소 | Website | Teams and Microsoft 365 Copilot | Facebook | Dynamics Omnichannel for Customer Service |
| :-- | :-- | :-- | :-- | :-- |
| 고객 만족도 설문 | Adaptive card | Text-only | Text-only | Text-only |
| 객관식 옵션 | 지원됨 | [최대 6개까지 지원(hero card 기준)][1] | [최대 13개까지 지원][3] | [부분 지원][5] |
| Markdown | 지원됨 | [부분 지원][2] | [부분 지원][4] | [부분 지원][6] |
| 환영 메시지 | 지원됨 | 지원됨 | 지원되지 않음 | [Chat][7]에서는 지원. 다른 채널은 지원되지 않음 |
| Did-You-Mean | 지원됨 | 지원됨 | 지원됨 | [Microsoft Teams][8], [Chat][7], Facebook 및 텍스트 전용 채널(short message service (SMS) via [TeleSign][9] and [Twilio][10], [WhatsApp][11], [WeChat][12], and [Twitter][13])에서 지원. Suggested actions는 텍스트 목록으로만 표시되며, 사용자가 옵션을 다시 입력해야 응답할 수 있음 |

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

channel에 따라 다른 로직을 보여줘야 하는 경우가 있습니다. 예를 들어 Microsoft Teams 채널일 때만 다른 Adaptive Card를 보여주는 예시는 Power Platform Snippets 저장소의 [예제](https://github.com/pnp/powerplatform-snippets/blob/main/copilot-studio/multiple-topics-matched-topic/source/multiple-topics-matched.yaml#L40)에서 확인할 수 있습니다.
</div>

## 🧪 Lab 11: agent를 Teams와 Microsoft 365 Copilot에 게시하기

### 🎯 사용 사례

Contoso IT Help Desk agent는 이제 SharePoint 지식 소스 조회, 지원 티켓 생성, 사전 알림 전송, 사용자 질의 응답까지 가능한 상태입니다. 하지만 지금은 개발 환경 안에서만 사용할 수 있습니다.

**문제:** 사용자가 실제로 일하는 채널에 agent를 publish하고 연결하지 않으면 최종 사용자는 이 기능을 전혀 활용할 수 없습니다.

**해결:** agent를 publish하면 최근에 추가한 topic, 지식 소스, flow, tool이 포함된 최신 버전이 실제 사용자에게 전달됩니다. Teams와 Microsoft 365 Copilot channel을 추가하면 사용자는 익숙한 업무 공간 안에서 바로 IT 지원을 받을 수 있습니다.

### Prerequisites

- ✅ 이전 실습을 마치고 Contoso Helpdesk Agent가 준비되어 있음
- ✅ agent를 충분히 테스트했고 실사용 배포가 가능한 상태임
- ✅ Copilot Studio 환경에서 agent를 publish할 권한이 있음
- ✅ 조직의 Microsoft Teams에 접근 가능함

### 11.1 agent 게시하기

이제 agent 구성이 끝났으므로 최종 사용자가 최신 버전을 쓸 수 있게 publish합니다.

1. [Copilot Studio maker portal](https://copilotstudio.microsoft.com)에서 Contoso Helpdesk Agent를 엽니다.

   Copilot Studio에서는 agent 개요 상단의 publish 버튼으로 쉽게 게시할 수 있습니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/publish.png' | relative_url }}" alt="Agent 개요의 Publish 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Agent 개요의 Publish 버튼</figcaption>
   </figure>
1. agent에서 **Publish** 버튼을 선택합니다.

   그러면 정말 게시할 것인지 확인하는 팝업이 열립니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/publish-popup.png' | relative_url }}" alt="Publish 확인 팝업" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Publish 확인 팝업</figcaption>
   </figure>
1. 다시 **Publish** 를 눌러 게시를 확정합니다.

   게시 진행 메시지가 표시됩니다. 팝업을 계속 열어 둘 필요는 없고, 완료되면 알림이 옵니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/publishing.png' | relative_url }}" alt="게시 진행 중" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>게시 진행 중</figcaption>
   </figure>
   게시가 끝나면 agent 상단에 완료 알림이 표시됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/publish-notification.png' | relative_url }}" alt="게시 완료 알림" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>게시 완료 알림</figcaption>
   </figure>
이제 agent는 publish되었지만 아직 channel에 추가되지 않았으므로 이어서 channel을 연결합니다.

### 11.2 Teams and Microsoft 365 Copilot channel 추가하기

1. agent 상단 탐색에서 **Channel** 을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/channels-tab.png' | relative_url }}" alt="Channels 탭 열기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Channels 탭 열기</figcaption>
   </figure>
   여기에서 이 agent에 추가할 수 있는 channel 목록을 볼 수 있습니다.

1. **Teams and Microsoft 365** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/teams-m365-copilot.png' | relative_url }}" alt="Teams and Microsoft 365 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Teams and Microsoft 365 선택</figcaption>
   </figure>
1. **Add channel** 을 선택해 마법사를 완료합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/add-channel.png' | relative_url }}" alt="Add channel 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Add channel 선택</figcaption>
   </figure>
   추가에는 약간의 시간이 걸립니다. 완료되면 사이드바 상단에 초록색 알림이 표시됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/channel-added.png' | relative_url }}" alt="Channel 추가 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Channel 추가 완료</figcaption>
   </figure>
1. **See agent in Teams** 를 선택해 새 탭을 엽니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/see-agent-teams.png' | relative_url }}" alt="Teams에서 agent 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Teams에서 agent 보기</figcaption>
   </figure>
1. **Add** 를 눌러 Contoso Helpdesk Agent를 Teams에 추가합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/add-teams.png' | relative_url }}" alt="Teams에 agent 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Teams에 agent 추가</figcaption>
   </figure>
   잠시 후 아래와 같은 화면이 표시됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/teams-added.png' | relative_url }}" alt="Teams 추가 성공" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Teams 추가 성공</figcaption>
   </figure>
1. **Open** 을 선택해 Teams에서 agent를 엽니다.

   그러면 Teams 앱으로 agent가 열립니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/agent-teams-open.png' | relative_url }}" alt="Teams에서 열린 agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Teams에서 열린 agent</figcaption>
   </figure>
이제 내 Teams에서는 사용할 수 있게 되었지만, 더 많은 사용자에게 공개하려면 추가 구성이 필요합니다.

### 11.3 테넌트 전체 사용자에게 agent 제공하기

1. Contoso Helpdesk Agent가 열린 브라우저 탭을 닫습니다.

   그러면 Copilot Studio의 Teams and Microsoft 365 Copilot 측면 패널로 돌아옵니다. 여기서 세부 정보 편집, 추가 사용자 배포 등 더 많은 작업을 할 수 있습니다.

1. **Edit details** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/m365-teams-edit-details.png' | relative_url }}" alt="Edit details 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Edit details 선택</figcaption>
   </figure>
   아이콘, 배경색, 설명, Teams 설정(팀/그룹 채팅/회의 채팅 사용 여부), 개발자 정보, 웹사이트, 개인정보처리방침, 이용 약관 등을 편집할 수 있습니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/edit-details.png' | relative_url }}" alt="Edit details 패널" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Edit details 패널</figcaption>
   </figure>
1. **Cancel** 을 눌러 Edit details 패널을 닫습니다.

1. **Availability options** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/m365-teams-availability-options.png' | relative_url }}" alt="Availability options 열기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Availability options 열기</figcaption>
   </figure>
   이 패널에서는 사용자에게 보낼 링크를 복사하거나, Teams/Microsoft 365 스토어 등록용 파일을 다운로드할 수 있습니다. 또한 *Built with Power Platform* 섹션에 팀원과 공유 사용자에게 노출하거나, 관리자 승인을 거쳐 조직 전체에 노출할 수도 있습니다.

1. **Show to everyone in my org** 를 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/availability-options.png' | relative_url }}" alt="조직 전체 노출 옵션" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>조직 전체 노출 옵션</figcaption>
   </figure>
1. **Submit for admin approval** 을 선택합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/submit-for-approval.png' | relative_url }}" alt="관리자 승인 제출" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>관리자 승인 제출</figcaption>
   </figure>
   이제 관리자는 Teams Admin Center의 Apps에서 Contoso Helpdesk Agent를 찾아 승인해야 합니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/pending-approval.png' | relative_url }}" alt="승인 대기 중인 Teams 앱" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>승인 대기 중인 Teams 앱</figcaption>
   </figure>
   관리자는 Contoso Helpdesk Agent를 선택한 뒤 *Publish* 를 눌러 모든 사용자에게 배포할 수 있습니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/teams-apps-publish.png' | relative_url }}" alt="Teams 앱 게시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Teams 앱 게시</figcaption>
   </figure>
   관리자가 게시를 마치면 Copilot Studio를 새로고침했을 때 availability options에 *available in app store* 배너가 표시됩니다.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/available-in-app-store.png' | relative_url }}" alt="App Store 사용 가능 표시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>App Store 사용 가능 표시</figcaption>
   </figure>
추가로 관리자는 전역 setup policy를 변경해 tenant 전체에 Contoso Helpdesk Agent를 자동 설치하거나, 왼쪽 레일에 고정해 접근성을 높일 수도 있습니다.

## ✅ Mission Complete

축하합니다! agent를 publish하고 Teams 및 Microsoft 365 Copilot에 추가했습니다. 이제 Recruit 과정의 마지막 미션인 라이선싱 이해만 남았습니다.

⏭️ [다음: Understanding licensing]({{ '/chapters/academy-recruit-12-understanding-licensing/' | relative_url }})

## 📚 Tactical Resources

- [Publish channels documentation](https://learn.microsoft.com/microsoft-copilot-studio/publication-fundamentals-publish-channels)
