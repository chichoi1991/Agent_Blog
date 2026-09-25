---
layout: "chapter"
lang: en
date: 2026-08-06
title: "Understanding Copilot Studio licensing"
short_title: "Understanding licensing"
description: "Learn how licensing and billing work in Copilot Studio."
order: 12
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/12-understanding-licensing/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/12-understanding-licensing/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🚨 Mission 12: Understanding Licensing](https://microsoft.github.io/agent-academy/recruit/12-understanding-licensing/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

## 🎯 Mission briefing

Welcome, Recruit. Deploying an agent to production takes more than working prompts and polished responses. You also need a clear understanding of **how that agent is measured and billed**. Licensing surprises usually appear after an agent goes live, when usage grows and costs rise faster than expected.

This mission is designed to help you avoid that moment. You will learn how Copilot Studio usage is tracked, how different deployment choices affect cost, and why planning before publishing matters. When you understand this well, you can design agents that are not only effective, but sustainable.

Think of this as your cost-control briefing.

## 🔎 Learning objectives

In this mission, you will learn:

1. How Copilot Studio licensing works based on the Copilot Credits consumption model
1. How to acquire Copilot Credits through pay-as-you-go, capacity packs, and prepaid commitments
1. What is included with Microsoft 365 Copilot user licenses, and when Copilot Studio credits are still required
1. How credit consumption changes across internal, external, automated, and integrated agent scenarios
1. How to plan, estimate, and monitor usage to avoid unexpected costs when deploying agents at scale

## 🔎 What are Copilot Credits?

Copilot Credits are the **unit of currency for measuring usage** in Copilot Studio. Think of them like an electricity or water meter: the more work an agent does, the more the meter runs.

[Copilot Credits measure the time and effort required for an agent to retrieve information, respond to prompts, and use actions or custom skills.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing) Credits are consumed whenever an agent looks up information, answers questions, and runs workflows or actions. Every topic invocation, tool call, grounding operation, and custom skill uses Copilot Credits. Simple answers consume fewer credits; complex multi-step actions consume more.

Except for testing in the built-in test chat, Copilot Credits are used whenever an agent performs real work.

<div class="info-box note" markdown="1">
**Note**

[Starting September 1, 2025, the common currency for agents changed from *messages* to *Copilot Credits*. The quantity per prepaid pack and the pay-as-you-go price did not change.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing)
</div>

## How does Copilot Studio licensing work?

[Copilot Credits are available through a pay-as-you-go meter, prepurchased plans, and Copilot Credit prepaid pack subscriptions.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing)

### 1. Copilot Studio pay-as-you-go (PAYGO) meter

[Pay-as-you-go lets you pay for Copilot Studio through an Azure subscription, so you can start creating agents without a licensing commitment or upfront purchase.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing) At the end of each month, your organization pays only for the Copilot Credits actually used by its agents.

- No prepaid commitment
- Billed through Azure at **$0.01 per Copilot Credit**
- Requires an **active Azure subscription** connected to a Power Platform environment through a billing policy
- Best for early development, variable usage, or situations where you are not yet ready to predict monthly volume

### 2. Copilot Studio license (Copilot Credit capacity pack)

- Monthly subscription: **25,000 Copilot Credits** per pack, **$200/pack/month**
- Capacity is pooled at the tenant level, and multiple packs can be purchased and stacked
- [Unused credits do not roll over to the next month](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing)
- Best for predictable production-level usage
- Microsoft strongly recommends setting up PAYGO as a backup so agents can keep running if pack capacity is exceeded mid-month.

### 3. Copilot Credit prepaid plan (P3)

[This option lets you prepay for Copilot Credits annually. A pool of Copilot Credit Commit Units (CCCUs) can be used across eligible Microsoft products.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing) This includes Copilot Studio, Dynamics 365 first-party agents, and Copilot Chat.

- Credits are purchased as **Copilot Credit Commit Units (CCCUs)**
- Each CCCU is worth **$1** and converts to **100 Copilot Credits**
- The most cost-effective option for large-scale operations through annual tiered discounts
- Unused CCCUs **expire at the end of the annual contract** (unlike capacity packs, which expire monthly).
- Suitable for organizations that want to simplify governance across large agent fleets or multiple workloads

## 📌 Copilot Studio user licenses

Even if capacity is available, makers still need the right access.

- A **Copilot Studio Tenant License** (credit capacity pack or pay-as-you-go) enables Copilot Studio in the tenant.
- A **Copilot Studio User License** (free) must be assigned to people who will create or manage agents.

This separation lets admins control capacity while allowing individual makers to create agents independently.

<div class="info-box note" markdown="1">
**Note for P3 customers**

When using the Pre-Purchase Plan, builder access is granted through the **Copilot Studio Author** setting in the Power Platform Admin Center. Create a security group in Azure/Entra, assign makers to it, and then assign that group to the Copilot Studio Author setting. Do not assign individual user licenses.
</div>

## 🧠 What is included with a Microsoft 365 Copilot license

A Microsoft 365 Copilot ($30/user/month) license includes:

- Copilot access in Word, Teams, Outlook, Excel, and other Microsoft 365 apps
- [Copilot Studio agent features used in Microsoft 365 Copilot, Teams, and SharePoint](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing), at no additional cost within fair use limits

### When is an M365 Copilot licensed user actually free?

If you look at the billing rates table in Microsoft Learn, it shows "No charge" across feature types such as classic answers, generative answers, agent actions, agent flows, and AI tools. At first glance, it may look completely free, but this column has an important footnote.

[The "No charge" rate applies to employee-facing (Business to Employee) scenarios only when **both conditions** are met. First, the user interacting with the agent must have a Microsoft 365 Copilot license. Second, the agent must operate using that user's authenticated Microsoft 365 Copilot ID.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management) Usage is also subject to fair use limits.

So the key question is not "Which feature did the agent use?" but "Who used the agent, and under which identity?"

**Copilot Studio credits are consumed when:**

- The user interacting with the agent does not have an M365 Copilot license
- The agent is published to an **external channel** (website, app, or social platform) and cannot operate under an authenticated M365 Copilot user ID
- The agent runs **autonomously** (not triggered by interaction from a licensed user)

**Copilot Studio credits are not consumed when:**

- A user with an M365 Copilot license interacts with the agent through Teams, SharePoint, or Microsoft 365 Copilot Chat using their authenticated identity — regardless of whether the agent uses classic answers, generative answers, agent flows, or AI tools

### Simple decision rule

- **M365 Copilot licensed user, authenticated, internal channel** → No Copilot Studio credits used (fair use applies)
- **Unlicensed user, external channel, or autonomous trigger** → Copilot Studio credits used

## 💰 Credit billing rates at a glance

[The number of Copilot Credits an agent consumes depends on the agent's design, how often customers interact with it, and which features it uses.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management) Costs by feature type are as follows.

| Agent Feature | Cost | M365 Copilot Licensed User |
| ------------- | ---- | -------------------------- |
| Classic answer | 1 credit | No charge |
| Generative answer | 2 credits | No charge |
| Agent action | 5 credits | No charge |
| Tenant graph grounding | 10 credits | No charge |
| Agent flow actions (per 100 actions) | 13 credits | No charge |
| AI tools: basic (per 10 responses) | 1 credit | No charge |
| AI tools: standard (per 10 responses) | 15 credits | No charge |
| AI tools: premium / reasoning (per 10 responses) | 100 credits | No charge |
| Content processing tools (per page) | 8 credits | No charge |

A single agent interaction can map to multiple billing lines at once. For example, [an agent grounded on the tenant graph may use 12 Copilot Credits when responding to one complex prompt (tenant graph grounding 10 + generative answer 2).](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management)

<div class="info-box note" markdown="1">
**Note on reasoning models**

When an agent uses a reasoning-capable model, [the premium AI tools rate (100 credits per 10 responses) applies for the additional compute required for deep reasoning and multi-step inference, in addition to the standard feature rate for the action performed.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management)

**Note on bring-your-own models**

Azure Foundry (custom) models are billed separately and are not included in these rates.
</div>

## ⚠️ Overage limits

Capacity is applied monthly. If you exceed purchased credits, the following happens.

- [Enforcement is triggered when the tenant reaches 125% of prepaid capacity.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management)
- Custom agents are disabled. Active conversations can finish, but all subsequent invocations are rejected until capacity is increased or reset.
- End users see a message such as "This agent is currently unavailable. It has reached its usage limit."
- Tenant admins receive email alerts and notices in the Power Platform Admin Center.

To resolve this, reallocate existing tenant capacity, purchase additional packs, or set up PAYGO as a safety net so overage is billed instead of blocked.

## 📊 Capacity planning tips

Before launching an agent, Microsoft recommends that you:

- Use the [Copilot Studio Agent Usage Estimator](https://aka.ms/copilotstudioestimator) to estimate monthly credits per agent.
- **Disable unused tools**: Tools that are enabled but unused may still incur credit costs.
- Combine a **credit pack + PAYGO** to avoid service interruption if the pack is exhausted mid-month.
- Assign **Copilot Studio User Licenses** to all builders before they access tools.
- Monitor consumption in the Power Platform Admin Center under **Billing > Licenses > Copilot Studio**.

<div class="info-box note" markdown="1">
**Tip**

✅ Run the Usage Estimator early in planning, then run it again after creating the agent to compare expected and actual usage. The gap often teaches you a lot.
</div>

## 🧠 Real-world licensing scenarios

| Scenario | Licensing / Credits |
| -------- | ------------------- |
| M365 Copilot licensed user interacts with an internal Teams agent (including classic or generative answers and tenant graph grounding) | Covered by the M365 Copilot license (fair use limits apply) |
| M365 Copilot licensed user uses an agent with Power Automate/connector actions in an internal channel | No charge (fair use applies) |
| Unlicensed user or external channel uses an agent with Power Automate/connector actions | Copilot Credits used |
| Autonomous agents (no authenticated M365 Copilot user ID) | Copilot Credits used |
| Published to an external web or system | Copilot Credits used |
| User without an M365 Copilot license interacts with an agent | Copilot Credits used |
| Agent uses a reasoning model | Standard feature rate + premium AI tools rate used |
| Maker creating an agent | Copilot Studio User License (free) required |

## 🏁 Mission complete

You have successfully completed the following:

- **Copilot Credits**: Explained how agent usage is measured.
- **License coverage**: Identified what is included with a Microsoft 365 Copilot license.
- **Purchasing options**: Compared capacity packs, pay-as-you-go, and prepaid commitments.
- **Cost planning**: Evaluated how agent features and scenarios affect consumption.

Next, go to [Recruit Course Completion]({{ '/en/chapters/academy-recruit-course-completion-badges-recruit/' | relative_url }}) to claim your badge.

## 📚 References

- [Copilot Studio licensing and billing](https://learn.microsoft.com/microsoft-copilot-studio/billing-licensing?WT.mc_id=power-170631-apdunnam)
- [Billing rates and management](https://learn.microsoft.com/microsoft-copilot-studio/requirements-messages-management?WT.mc_id=power-170631-apdunnam)
- [Power Platform Licensing Guide (November 2025)](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/bade/documents/products-and-services/en-us/bizapps/Power-Platform-Licensing-Guide-November-2025.pdf?WT.mc_id=power-170631-apdunnam)
- [Message management and capacity monitoring](https://learn.microsoft.com/power-platform/admin/manage-copilot-studio-messages-capacity?WT.mc_id=power-170631-apdunnam)
