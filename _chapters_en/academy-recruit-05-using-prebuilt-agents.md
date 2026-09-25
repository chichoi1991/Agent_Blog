---
layout: "chapter"
lang: en
date: 2026-08-06
title: "Using Prebuilt Agents"
short_title: "Prebuilt Agents"
description: "Learn how to use and customize template agents so you can get started faster."
order: 5
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/05-using-prebuilt-agents/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/05-using-prebuilt-agents/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🧰 Mission 05: Using a Pre-Built Agent](https://microsoft.github.io/agent-academy/recruit/05-using-prebuilt-agents/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

# Mission 05: Using a Prebuilt Agent

🎥 **Lab video**

<figure class="screenshot">
  <a href="https://www.youtube.com/watch?v=NmXsx8WjWuM" target="_blank" rel="noopener noreferrer">
    <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/video-thumbnail.jpg' | relative_url }}" alt="Prebuilt agent lab video thumbnail" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
  <figcaption>Watch the lab video on YouTube</figcaption>
</figure>

## Mission brief

Welcome to the next mission in Copilot Studio Agent Academy. This time, you will explore the world of intelligent, purpose-built **prebuilt agents** that Microsoft provides to help you deploy faster and see value sooner.

Instead of building everything from scratch, prebuilt agents, also called **agent templates**, give you ready-to-use scenarios that you can customize and deploy in minutes.

While you are preparing the Contoso IT helpdesk agent, another requirement comes in. Employees also need help preparing for business travel and finding travel policies. This is still employee support, but it has a clearly different purpose and knowledge domain. Instead of stretching the core responsibilities of the IT helpdesk agent, you can use an agent focused on the travel scenario.

In this mission, you will step away from the main helpdesk build for a moment and deploy the **Safe Travels** template. You will see how a prebuilt agent can quickly meet a new requirement while keeping each agent focused on a clear responsibility.

<div class="info-box note" markdown="1">
**Important: This mission uses the classic Copilot Studio experience**

If your Copilot Studio screens look different from the screenshots in this mission, turn off **New Experience** in the upper-right corner to switch back to the **classic experience** used here.
</div>

## Objectives

In this mission, you will learn:

1. Why prebuilt agents help you quickly start common business scenarios
1. How to deploy the **Safe Travels** agent template
1. How to customize an agent's Knowledge
1. How to test and publish a prebuilt agent

## What are prebuilt agents?

Prebuilt agents are ready-to-use AI agents created by Microsoft. They:

- Cover common business needs such as travel, HR, and IT support.
- Include completed topics, trigger phrases, instructions, and sample knowledge.
- Can be edited, extended, and grounded with your own data as needed.

They are useful both for getting started quickly and for learning how agents are structured.

## Lab 05: Start quickly with a prebuilt agent

In this lab, you will select and customize a prebuilt agent for the new travel-support requirement. The Safe Travels agent is not an extension of the Contoso IT helpdesk agent; it is a standalone, focused agent.

Let's get started.

### 5.1 Launch Copilot Studio

1. Go to [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com).

1. Sign in with your Microsoft 365 work or school account.

### 5.2 Select the Safe Travels agent template

1. In the left menu, select the **Agents** tab.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/5.1.01_agentstab.png' | relative_url }}" alt="Screen selecting the Agents tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select the Agents tab</figcaption>
</figure>

1. Scroll down to the **Start with an agent template** section. Find and select the **Safe Travels** template.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/5.1.02_templateselect.png' | relative_url }}" alt="Screen selecting the Safe Travels template" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select the Safe Travels template</figcaption>
</figure>

1. Notice that this template already includes a description, instructions, and knowledge.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/template-setup.png' | relative_url }}" alt="Safe Travels template configuration screen" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Review the template's default configuration</figcaption>
</figure>

1. Select **Create**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/create-agent-setup.png' | relative_url }}" alt="Safe Travels template screen with the Create button" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Create an agent from the template</figcaption>
</figure>

A new agent based on the Safe Travels configuration is created in the current environment.

### 5.3 Customize the agent

Now that the agent has been created, customize it for your organization.

1. Add another knowledge source so the agent can answer questions about travel in Europe. Scroll down to the **Knowledge** section and select **Add knowledge**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/knowledge.png' | relative_url }}" alt="Screen selecting Add knowledge in the Safe Travels Knowledge section" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Add a knowledge source</figcaption>
</figure>

1. Select **Public websites**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/public-website.png' | relative_url }}" alt="Screen selecting Public websites" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select Public websites</figcaption>
</figure>

1. Paste **<https://european-union.europa.eu/>** into the input field and select **Add**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/paste-add.png' | relative_url }}" alt="Screen adding the European Union URL to the public website field" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Add the European Union website</figcaption>
</figure>

1. Select **Add to agent**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/add-to-agent.png' | relative_url }}" alt="Screen ready to add the knowledge source to the agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Connect the knowledge source to the agent</figcaption>
</figure>

### 5.4 Test and publish

1. Select **Test** to open the test pane.

1. Try entering questions such as:

   - `“Do I need a visa to travel from the US to Amsterdam?”`
   - `“How long does it take to get a US Passport?”`
   - `“Where is the closest US embassy in Valencia, Spain?”`

1. Confirm that the agent responds with accurate, helpful information, and review the Activity Map to see where the information came from.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/response-passport.png' | relative_url }}" alt="Safe Travels responding to a passport question" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Review the test response and Activity Map</figcaption>
</figure>

1. When you are ready, select **Publish**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/publish-1.png' | relative_url }}" alt="Safe Travels agent screen with the Publish button" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Start publishing</figcaption>
</figure>

1. In the dialog box, select **Publish** again.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/publish-2.png' | relative_url }}" alt="Safe Travels publish confirmation dialog" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Confirm publishing</figcaption>
</figure>

1. If needed, you can also add the agent to Microsoft Teams using the built-in **Channels** feature.

<div class="info-box note" markdown="1">
**Note: 🧳 Bonus objective**

Ground the Safe Travels agent with a SharePoint site or FAQ file so it can provide answers that better match your organization's actual travel policies.
</div>

## Mission complete

You have now successfully completed the following tasks.

- **Template selection**: Selected a prebuilt agent that fits a focused business need.
- **Agent deployment**: Deployed the **Safe Travels** template.
- **Knowledge customization**: Added a public website as a knowledge source.
- **Testing and publishing**: Tested and published the customized agent.

By using a focused agent for the travel-support requirement, you do not need to add unrelated responsibilities to the Contoso IT helpdesk agent. In the next mission, you will return to the main course scenario and build a custom helpdesk agent from scratch.

Next, continue to [Mission 06: Build a Custom Agent]({{ '/en/chapters/academy-recruit-06-create-agent-from-conversation/' | relative_url }}).

## Resources

- [Create and delete agents](https://learn.microsoft.com/microsoft-copilot-studio/authoring-first-bot?WT.mc_id=power-172617-ebenitez)
- [Add knowledge to an agent](https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-existing-copilot)
- [Watch the Safe Travels walkthrough](https://www.youtube.com/watch?v=NmXsx8WjWuM)
