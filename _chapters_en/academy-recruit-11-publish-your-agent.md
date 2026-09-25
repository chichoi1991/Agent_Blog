---
layout: "chapter"
lang: en
date: 2026-08-06
title: "Publish your agent and deploy it to Teams and Microsoft 365 Copilot"
short_title: "Publish your agent"
description: "Deploy your agent to Microsoft Teams and Microsoft 365 Copilot."
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
**Translated article** — This article is based on [🚨 Mission 11: Publish Your Agent](https://microsoft.github.io/agent-academy/recruit/11-publish-your-agent/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

🎥 **Watch the walkthrough video**

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-11-publish-your-agent/video-thumbnail.jpg' | relative_url }}" alt="Publish agent video thumbnail" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption><a href="https://www.youtube.com/watch?v=eVZmljhYlSI">Watch the walkthrough on YouTube</a></figcaption></figure>

## 🎯 Mission briefing

Welcome back, Recruit. Now that you have built and tested your agent, it is ready to be published so users can access it in Microsoft Teams and Microsoft 365 Copilot.

With a clear mission, powerful tools, and key knowledge sources, your agent is ready to go into service. By deploying your agent with Microsoft Copilot Studio, real users can get help right where they work.

Let's put your agent into action.

<div class="info-box note" markdown="1">
**Important: This mission uses the classic Copilot Studio experience**

If your screenshots and Copilot Studio screens look different from this lab, turn off **New Experience** in the upper-right corner to switch to the **classic experience** used here.
</div>

## 🔎 Learning objectives

In this mission, you will learn:

1. Why publishing is required to make agent updates available to users
1. What happens when you publish an agent
1. How to add Microsoft Teams and Microsoft 365 Copilot as channels
1. How to add your agent in Microsoft Teams
1. How to make your agent available across your organization

## 🚀 Publish your agent

Whenever you work on an agent in Copilot Studio, you can update it by adding knowledge or tools. After you have finished all changes and tested them thoroughly, you are ready to publish. Publishing makes the latest updates live. Even if you update your agent with a new tool, it is not available to end users until you select the publish button.

To deliver updates to your agent users, always select the publish button. If channels have been added to the agent, publishing makes the updates available in every channel added to the agent.

<div class="info-box note" markdown="1">
**Important**

❗ Publishing is not allowed by default in Copilot Studio trial environments. You can turn it back on by adding yourself to the **Copilot Studio authors** tenant setting covered in [step 4 of course setup]({{ '/en/chapters/academy-recruit-00-course-setup/' | relative_url }}#step-4-enable-ability-to-publish-with-the-copilot-studio-trial). This step requires tenant admin permissions, so if you cannot change the setting yourself, see step 1 of that same lab to create a separate trial tenant. Publishing is not required to earn the badge.
</div>

## ⚙️ Configure channels

Channels determine where users can access and interact with your agent. After you publish an agent, you can make it available in multiple channels. Each channel may display agent content differently.

You can add your agent to the following channels.

- **Microsoft Teams and Microsoft 365 Copilot** - Makes the agent available in Teams chats and meetings, and in the Microsoft 365 Copilot experience. See [Publish an agent to Teams and Microsoft 365 Copilot](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-microsoft-teams).
- **Demo website** - Test the agent on the demo website provided by Copilot Studio. See [Connect your agent to web channels](https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-web-channels).
- **Custom website** - Embed the agent directly in your own website. See [Connect your agent to a custom website](https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-web-channels).
- **Mobile app** - Integrate the agent into a custom mobile application. See [Connect your agent to a mobile app](https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-custom-application).
- **SharePoint** - Add the agent to a SharePoint site to support documents and sites. See [Add an agent to SharePoint](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-sharepoint).
- **Facebook Messenger** - Connect with users through the Facebook messaging platform. See [Add an agent to Facebook](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-facebook).
- **Power Pages** - Integrate the agent into a Power Pages website. See [Add an agent to Power Pages](https://learn.microsoft.com/microsoft-copilot-studio/publication-add-bot-to-power-pages).
- **Azure Bot Service channels** - Access additional channels such as Slack, Telegram, and Twilio SMS. See [Connect an agent to Azure Bot Service channels](https://learn.microsoft.com/microsoft-copilot-studio/publication-connect-bot-to-azure-bot-service-channels).

To add a channel, go to the agent's **Channels** tab and select the channel you want to configure. Each channel has different configuration requirements and may require additional authentication or setup steps.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-11-publish-your-agent/channels.png' | relative_url }}" alt="Agent Channels tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Agent Channels tab</figcaption>
</figure>

## 📺 User experiences by channel

The user experience differs by channel. If you build an agent for multiple channels, you should understand the differences between them. Testing in multiple channels is always a good strategy to make sure the agent works as intended in the real world.

| Experience element | Website | Teams and Microsoft 365 Copilot | Facebook | Dynamics Omnichannel for Customer Service |
| :-- | :-- | :-- | :-- | :-- |
| Customer satisfaction survey | Adaptive card | Text-only | Text-only | Text-only |
| Multiple-choice options | Supported | [Up to 6 supported (hero card)][1] | [Up to 13 supported][3] | [Partially supported][5] |
| Markdown | Supported | [Partially supported][2] | [Partially supported][4] | [Partially supported][6] |
| Welcome message | Supported | Supported | Not supported | Supported in [Chat][7]. Not supported in other channels |
| Did-You-Mean | Supported | Supported | Supported | Supported in [Microsoft Teams][8], [Chat][7], Facebook, and text-only channels (short message service (SMS) via [TeleSign][9] and [Twilio][10], [WhatsApp][11], [WeChat][12], and [Twitter][13]). Suggested actions are displayed as a text-only list, and users must type the option again to respond |

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
**Note**

There are several examples of using different logic for different channels. You can find examples in the Power Platform Snippets repository.

The [Adaptive Card channel-logic example](https://github.com/pnp/powerplatform-snippets/blob/main/copilot-studio/multiple-topics-matched-topic/source/multiple-topics-matched.yaml#L40) shared by Henry Jammes shows how to display a different card when the channel is Microsoft Teams.
</div>

## 🧪 Lab 11: Publish your agent to Teams and Microsoft 365 Copilot

### 🎯 Use case

The Contoso IT Help Desk agent is now fully configured with powerful capabilities. It can access SharePoint knowledge sources, create support tickets, send proactive notifications, and respond intelligently to user questions. However, all these capabilities are currently available only in the development environment where the agent was built.

**Problem:** End users cannot benefit from the agent's capabilities until the agent is properly published and made accessible through the channels where users actually work.

**Solution:** Publishing the agent makes the latest version available to real users, including recent updates, new topics, enhanced knowledge sources, and configured flows. Without publishing, users may continue interacting with an older version of the agent that is missing important capabilities.

Adding the Teams and Microsoft 365 Copilot channel is just as important. Here's why:

- **Teams Integration**: Employees in your organization spend much of their day in Microsoft Teams for collaboration, meetings, and communication. Adding the agent to Teams lets users get IT support without leaving their primary work environment.

- **Microsoft 365 Copilot**: Users can directly access the specialized IT help desk agent inside the Microsoft 365 Copilot experience, naturally integrating it into daily workflows across Office applications.

- **Centralized Access**: Users can get IT support on a platform they already use, without having to remember a separate website or application. This reduces friction and increases adoption.

This mission turns your development work into a production-ready solution that delivers real value to your organization's end users.

### Prerequisites

Before starting this lab, make sure you have:

- ✅ Completed the previous labs and have a fully configured Contoso Helpdesk Agent
- ✅ Tested the agent and confirmed it is ready for production use
- ✅ Permission to publish the agent in your Copilot Studio environment
- ✅ Access to Microsoft Teams in your organization

### 11.1 Publish your agent

Now that you have finished all work on the agent, you need to make that work available to the end users who will use it. To make the content available to everyone, you must publish the agent.

1. Go to the Contoso Helpdesk Agent in Copilot Studio through the [Copilot Studio maker portal](https://copilotstudio.microsoft.com).

   Copilot Studio makes it easy to publish an agent. From the top of the agent overview, select the publish button.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/publish.png' | relative_url }}" alt="Publish button on the agent overview" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Publish button on the agent overview</figcaption>
   </figure>
1. Select the **Publish** button on the agent.

   This opens a publish popup asking you to confirm that you want to publish the agent.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/publish-popup.png' | relative_url }}" alt="Publish confirmation" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Publish confirmation</figcaption>
   </figure>
1. Select **Publish** to confirm publishing the agent.

   You will now see a message that the agent is being published. You do not need to keep this popup open. You will be notified when the agent is published.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/publishing.png' | relative_url }}" alt="Agent publishing in progress" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Agent publishing in progress</figcaption>
   </figure>
   When publishing completes, a notification appears at the top of the agent page.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/publish-notification.png' | relative_url }}" alt="Publishing complete notification" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Publishing complete notification</figcaption>
   </figure>
The agent has been published, but it is not yet available through a channel. Let's fix that now.

### 11.2 Add the Teams and Microsoft 365 Copilot channel

1. In the agent navigation, select **Channels**.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/channels-tab.png' | relative_url }}" alt="Channels tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Channels tab</figcaption>
   </figure>
   Here, you can see all channels that can be added to this agent.

1. Select **Teams and Microsoft 365**.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/teams-m365-copilot.png' | relative_url }}" alt="Select Teams and Microsoft 365" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Select Teams and Microsoft 365</figcaption>
   </figure>
1. Select **Add channel** to complete the wizard and add the channel to the agent.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/add-channel.png' | relative_url }}" alt="Select Add channel" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Select Add channel</figcaption>
   </figure>
   Adding the channel may take a little time. When it is ready, a success notification appears at the top of the sidebar.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/channel-added.png' | relative_url }}" alt="Channel added" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Channel added</figcaption>
   </figure>
1. Select **See agent in Teams** to open a new tab.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/see-agent-teams.png' | relative_url }}" alt="See agent in Teams" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>See agent in Teams</figcaption>
   </figure>
1. Select **Add** to add the Contoso Helpdesk Agent to Teams.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/add-teams.png' | relative_url }}" alt="Add the agent to Teams" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Add the agent to Teams</figcaption>
   </figure>
   This takes a little time. When it completes, you will see the following screen.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/teams-added.png' | relative_url }}" alt="Agent added successfully" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Agent added successfully</figcaption>
   </figure>
1. Select **Open** to open the agent in Teams.

   The agent opens as a Teams app.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/agent-teams-open.png' | relative_url }}" alt="Agent open in Microsoft Teams" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Agent open in Microsoft Teams</figcaption>
   </figure>
You have now published the agent so you can use it in Microsoft Teams. But you may want to make it available to more people.

### 11.3 Make the agent available to all tenant users

1. Close the browser tab where the Contoso Helpdesk Agent is open.

   This returns you to Copilot Studio, where the Teams and Microsoft 365 Copilot side panel is still open. You just opened the agent in Teams, but you can do much more from here. You can edit agent details, distribute the agent to more users, and more.

1. Select **Edit details**.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/m365-teams-edit-details.png' | relative_url }}" alt="Edit details" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Edit details</figcaption>
   </figure>
   This opens a window where you can change many details and settings for the agent. You can change basic details such as the icon, icon background color, and description. You can also change Teams settings here, such as whether users are allowed to add the agent to a team and whether the agent can be used in group and meeting chats. Select *more* to change developer details such as developer name, website, privacy policy, and terms of use.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/edit-details.png' | relative_url }}" alt="Edit details window" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Edit details window</figcaption>
   </figure>
1. Select **Cancel** to close the Edit details window.

1. Select **Availability options**.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/m365-teams-availability-options.png' | relative_url }}" alt="Availability options" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Availability options</figcaption>
   </figure>
   This opens the availability options window. Here you can copy a link to send to users so they can use the agent (note that you must also share the agent with users), and you can download a file for adding the agent to the Microsoft Teams or Microsoft 365 store. There are other options for showing the agent in the store as well: show it to teammates and shared users (in the *Built with Power Platform* section), or show it to everyone in the organization (requires admin approval).

1. Select **Show to everyone in my org**.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/availability-options.png' | relative_url }}" alt="Availability options" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Availability options</figcaption>
   </figure>
1. Select **Submit for admin approval**.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/submit-for-approval.png' | relative_url }}" alt="Submit for approval" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Submit for approval</figcaption>
   </figure>
   An admin now needs to approve the agent submission. The admin can go to the Teams Admin Center, find Contoso Helpdesk Agent under Apps, and approve it. The screenshot shows what the admin sees in the Teams Admin Center.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/pending-approval.png' | relative_url }}" alt="Teams app pending approval" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Teams app pending approval</figcaption>
   </figure>
   The admin must select Contoso Helpdesk Agent, then select *Publish* to publish Contoso Helpdesk Agent to everyone.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/teams-apps-publish.png' | relative_url }}" alt="Publish Teams app" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Publish Teams app</figcaption>
   </figure>
   After the admin publishes the agent submission, refresh Copilot Studio. The availability options show an *available in app store* banner.

   <figure class="screenshot">
     <img src="{{ '/assets/academy/recruit-11-publish-your-agent/available-in-app-store.png' | relative_url }}" alt="Available in app store" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
     <figcaption>Available in app store</figcaption>
   </figure>
There are more possibilities here. Admins can change the global setup policy to automatically install Contoso Helpdesk Agent for every user in the tenant. They can also pin Contoso Helpdesk Agent to the left rail so everyone can access it easily.

## ✅ Mission complete

You successfully completed the following:

- **Publishing**: Published the latest version of your agent.
- **Channels**: Added Microsoft Teams and Microsoft 365 Copilot.
- **Teams installation**: Added and tested the agent in Microsoft Teams.
- **Organizational availability**: Prepared the agent for admin approval and deployment.

Next, continue to [Mission 12: Understanding Licensing]({{ '/en/chapters/academy-recruit-12-understanding-licensing/' | relative_url }}).

## 📚 References

- [Publish agents and manage channels](https://learn.microsoft.com/microsoft-copilot-studio/publication-fundamentals-publish-channels)
