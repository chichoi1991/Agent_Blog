---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 6 — Automation: Make It Run Every Week on Its Own"
short_title: "Step 6. Scheduled runs and governance"
description: "Turn one-off tasks into scheduled runs and event triggers. Then define three governance zones for what to delegate to an agent and what not to delegate."
order: 907
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "Automation", "Scheduled runs", "Governance", "Hands-on"]
---

<div class="info-box note" markdown="1">

**▶ What you learn in this step** — Until now, tasks ran **whenever you asked for them**. Here, you make them **run even when you do not ask**. And you discuss why that requires care.
</div>

**This is the final part of the lab.** Many of the tasks you completed so far **repeat every week**: weekly status summaries, unanswered-reply tracking, priority extraction. Asking with a prompt every time eventually becomes work too.

---

## 6-1. Schedule a weekly status update

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 14 · Climax</span>

### 📌 What is the situation?

Project Northstar needs a status update posted to the team channel every Friday. Collecting and summarizing that week's emails, Teams conversations, and meetings takes **40 minutes every week**. And during busy weeks, it gets skipped.

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>One scheduled task</strong> registered on the Automations page — runs every Friday at 16:00</dd>

<dt>💡 Efficiency point</dt>
<dd>This is the difference between one-time delegation and <strong>ongoing delegation</strong>. Once registered, <strong>it runs even if you forget.</strong> The exact sweet spot for repetitive human work is: "it causes problems if skipped, but doing it every time is annoying."</dd>

<dt>⚠️ Must include</dt>
<dd>Do not omit <strong>"get my approval before posting"</strong> at the end of the prompt. Without it, a post may go up in the team channel while you are not looking.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Run every Friday at 4 PM.
Summarize that week's Project Northstar-related emails, Teams conversations, and meetings into:
- decisions confirmed this week
- open risks and owners
- milestones that moved
- risks for next week
Then post it as a status update in the Project Northstar channel. Get my approval before posting.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- Was a scheduled task registered on the **Automations** page?
- Is the cadence set to **every Friday at 16:00**?
- Is the **approval requirement** included in the task definition?
- Immediately after registration, test it once with "Run now"
</div>

---

## 6-2. Event trigger

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 15</span>

### 📌 What is the situation?

You can make Cowork respond not to a time, but to an **event**. It is rare to be mentioned in an incident channel, but missing it is risky.

<dl>
<dt>🎯 Expected output</dt>
<dd>One event trigger — sends a summary email when a mention occurs</dd>

<dt>💡 Efficiency point</dt>
<dd>If a schedule is a <strong>"specific time,"</strong> a trigger is a <strong>"specific condition."</strong> You already get notifications, but notifications arrive <strong>without context.</strong> A trigger arrives <strong>with a summary.</strong></dd>
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

## 6-3. Governance — what to delegate and what not to delegate

<div class="info-box warning" markdown="1">

**This is the most important conversation in the lab** — So far, participants have repeatedly said, "Wow, it can do that too." The last 10 minutes should be spent on **"So how far should we delegate?"** A demo that ends without this discussion will not be adopted in an organization.
</div>

When evaluating Cowork adoption, place each task into one of three zones.

| Zone | Criteria | Examples from this lab |
|---|---|---|
| 🟢 **Always okay** | Reversible, does not go outside the organization, and causes no harm if wrong | Inbox classification, newsletter archiving, briefing creation, document analysis, drafting in my OneDrive |
| 🟡 **Ask first** | Goes outside the organization, uses someone else's time, or is annoying to undo | Sending customer email, scheduling meetings, posting to a team channel, declining meetings |
| 🔴 **Never** | Legally or financially binding, or irreversible | Finalizing contract terms, approving pricing, HR decisions, compensation promises to customers |

### What you actually observed in this lab

- **Archiving** in Step 1 ran without asking → 🟢 (reversible)
- **Email drafts** in Steps 1, 2, and 4 were created but not sent → 🟡
- **Meeting scheduling** in Step 5 required approval → 🟡
- **Contract analysis** in Step 3 only flagged risky clauses; it **did not make negotiation decisions** → Did not cross into the 🔴 zone

<div class="info-box tip" markdown="1">

**Question for participants** — *"Of what you saw today, how many items could your organization classify as 🟢?"*

Most organizations start with only two or three 🟢 items. Even those two or three can save several hours per week. As trust builds, some 🟡 items move into 🟢. **Not opening everything at once** is the standard path for real adoption.
</div>

---

## Full lab recap

### What you delegated to Cowork today

| Step | Task | If a person does it | After delegation |
|---|---|---|---|
| 1 | Inbox triage + priorities + unanswered-reply tracking | 40 min | 5 min |
| 2 | Meeting briefing synthesized from six sources | 50 min | 3 min |
| 3 | 20-page RFP analysis + proposal deck + plain-language contract summary | 4 hours | 15 min |
| 4 | Three-part post-incident package | 2 hours | 8 min |
| 5 | Calendar cleanup + onboarding package | 90 min | 10 min |
| 6 | Weekly report automation | 40 min every week | 0 min |

### But the real point is not time

<div class="info-box note" markdown="1">

**More important than the time saved is what was not missed.**

- **§9.4 unlimited damages** — Page 13 of a 20-page document. You miss it when you are rushed
- **99.9% vs 99.82%** — Two documents in different folders. You must remember both to compare them
- **24 hours vs 72 hours** — A contradiction between our commitment and a subcontractor's commitment
- **Unfulfilled August commitment** — Inside meeting notes that nobody reopens
- **Threshold 8** — One line in a 3 AM chat

These five things are **not guaranteed to be found just because a person spends more time.** They require remembering and comparing multiple documents at the same time, which is a structural weakness for people.

Cowork's value is less *"it does things quickly"* and more *"it does not miss what I would miss."*
</div>

---

## Finishing the lab

<ul class="checklist">
<li>You ran all of Steps 1–6</li>
<li>Cowork found toxic clauses §9.4 and §12.2</li>
<li>Cowork connected the 99.9% vs 99.82% conflict</li>
<li>It found the incident cause (threshold 8) in the Teams channel</li>
<li>You registered a scheduled task and event trigger</li>
<li>You discussed your organization's 🟢 / 🟡 / 🔴 zones</li>
</ul>

### What to try next

- 🧩 [Cowork Collective missions]({{ '/en/chapters/cowork0-overview/' | relative_url }}) — Try changing the output format with a custom skill (`SKILL.md`)
- 🔧 [Cowork development lab]({{ '/en/chapters/cowork-dc0-setup/' | relative_url }}) — Extend Cowork with skills and plugins
- 📖 [Official Copilot Cowork documentation](https://learn.microsoft.com/copilot/microsoft-365/cowork/)

<div class="info-box tip" markdown="1">

**To adapt the sample data to your scenario** — The data in this lab was built around one principle: **"each fact exists in exactly one place."** If the answer exists in multiple places, you cannot prove that the agent really read multiple sources. When you create new data for your industry, you only need to keep this principle.
</div>
