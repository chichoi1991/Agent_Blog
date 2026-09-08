---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 6 — Automation, make it run every week on its own"
short_title: "Step 6. Scheduled runs and governance"
description: "Turn one-off work into scheduled runs and event triggers. Then define three governance zones for what to delegate and what not to delegate."
order: 907
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "Automation", "Scheduled runs", "Governance", "Hands-on"]
---

<div class="info-box note" markdown="1">

**▶ What you learn** — Until now, tasks ran **each time you asked**. Here, you make them **run without being asked**. And you discuss why that requires care.
</div>

**This is the final step.** Much of what you did repeats **every week**: weekly status summaries, unanswered-reply tracking, priority extraction. Prompting every time is also work.

---

## 6-1. Schedule a weekly status update

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 15 · Climax</span>

### 📌 What is happening

Project Northstar needs a status update posted to the channel every Friday. It takes **40 minutes every week**, and busy weeks skip it.

<dl>
<dt>🎯 Expected output</dt>
<dd>One <strong>scheduled task</strong> on the Automations page — every Friday at 16:00</dd>

<dt>💡 Efficiency point</dt>
<dd>This is the difference between one-time delegation and <strong>ongoing delegation</strong>. Once registered, <strong>it runs even if you forget.</strong> This is exactly the zone of "bad if skipped, annoying to do every time."</dd>

<dt>⚠️ Must include</dt>
<dd>Do not omit <strong>"get my approval before posting"</strong> at the end. Without it, a channel post can go up while you are not watching.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Run every Friday at 16:00.
Collect that week's Project Northstar emails and Teams conversations,
summarize confirmed decisions / open risks / next week's risks in under 3 lines,
and post it in the Project Northstar channel. Get my approval before posting.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- Is a scheduled task registered on the **Automations** page?
- Is the cadence **every Friday at 16:00**?
- Is the **approval requirement** included in the task definition?
- Test once with "Run now" right after registration

</div>

---

## 6-2. Event trigger

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 16</span>

### 📌 What is happening

It can respond not to time but to an **event**. Mentions in an incident channel are rare, but missing one is risky.

<dl>
<dt>🎯 Expected output</dt>
<dd>One event trigger — summary email on mention</dd>

<dt>💡 Efficiency point</dt>
<dd>If a schedule is a <strong>"fixed time,"</strong> a trigger is a <strong>"fixed condition."</strong> Notifications already arrive, but <strong>without context.</strong> A trigger arrives <strong>with a summary.</strong></dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
When I am @mentioned in the INC channel, send me a one-line summary by email.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check** — Was **one condition-based trigger** added on the Automations page?

</div>

---

## 6-3. Governance — how far to delegate

<div class="info-box warning" markdown="1">

**This is the most important conversation in the lab** — So far, participants have said "it can do this too" again and again. Spend the last 10 minutes on **"so how far should we delegate?"** A demo without this discussion will not be adopted.
</div>

Put each task into one of three zones.

| Zone | Criteria | Examples from this lab |
|---|---|---|
| 🟢 **Always okay** | Reversible, does not go outside the organization, no harm if wrong | Inbox classification, archiving, briefing, document analysis, my OneDrive drafts |
| 🟡 **Ask first** | Goes outside the organization, uses someone else's time, or is annoying to undo | Customer email, meeting booking, channel posting, meeting decline |
| 🔴 **Never** | Legally or financially binding, or irreversible | Final contract terms, pricing approval, HR decisions, compensation promises |

### What you actually observed

- Step 1 **archive** ran without asking → 🟢 (reversible)
- Step 2 and 4 **email drafts** were created but not sent → 🟡
- Step 5 **meeting booking** required approval → 🟡
- Step 3 **contract analysis** only flagged issues and did not make negotiation decisions → did not cross into 🔴

<div class="info-box tip" markdown="1">

**Question for participants** — *"Of what you saw today, how many items could your organization classify as 🟢?"*

Most organizations start with only two or three. Even those save hours per week. As trust builds, some 🟡 items move into 🟢. **Do not open everything at once** is the standard adoption path.
</div>

---

## Full lab recap

### What you delegated today

| Step | Task | If a person does it | After delegation |
|---|---|---|---|
| 1 | Triage + priorities + unanswered replies | 40 min | 3 min |
| 2 | Briefing from multiple sources | 50 min | 2 min |
| 3 | RFP clause analysis + deck + contract plain language | 4 hours | 8 min |
| 4 | Incident cause + customer email | 2 hours | 5 min |
| 5 | Calendar cleanup + onboarding | 90 min | 6 min |
| 6 | Weekly report automation | 40 min every week | 0 min |

### The real point is not time

<div class="info-box note" markdown="1">

**More important than time saved is what was not missed.**

- **§9.4 unlimited damages** — Page 13 of 20. Easy to miss when rushed
- **99.9% vs 99.82%** — Two documents in different folders
- **24 hours vs 72 hours** — Contradiction between our promise and subcontractor promise
- **August unfulfilled promise** — Inside meeting notes no one reopens
- **Threshold 8** — One line in a 3 AM chat

These five are **not guaranteed to be found just because a person spends more time.** They require remembering and comparing multiple documents at once, which is structurally hard for people.

Cowork's value is less *"it does it fast"* and more *"it does not miss what I would miss."*
</div>

---

## Finishing the lab

<ul class="checklist">
<li>You ran all Steps 1–6</li>
<li>You found toxic clauses §9.4 · §12.2</li>
<li>You connected the 99.9% vs 99.82% conflict</li>
<li>You found the incident cause (threshold 8) in the Teams channel</li>
<li>You registered a scheduled task and event trigger</li>
<li>You discussed your organization's 🟢 / 🟡 / 🔴 zones</li>
</ul>

### What to try next

- 🧩 [Cowork Collective missions]({{ '/en/chapters/cowork0-overview/' | relative_url }}) — Change output format with a custom skill (`SKILL.md`)
- 🔧 [Cowork development lab]({{ '/en/chapters/cowork-dc0-setup/' | relative_url }}) — Extend with skills and plugins
- 📖 [Official Copilot Cowork documentation](https://learn.microsoft.com/copilot/microsoft-365/cowork/)

<div class="info-box tip" markdown="1">

**To adapt the sample data to your scenario** — The principle is simple: **"each fact exists in exactly one place."** If the answer exists in multiple places, you cannot prove the agent really read multiple sources.
</div>
