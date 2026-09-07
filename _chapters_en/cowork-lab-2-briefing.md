---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 2 — 30 minutes before the meeting, create a briefing from six sources"
short_title: "Step 2. Meeting briefing"
description: "The quarterly review with your largest customer is in 30 minutes. Create a one-page briefing that synthesizes email, calendar, meeting notes, status reports, commitment lists, and Teams at once."
order: 903
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "Meeting prep", "Cross-referencing", "Hands-on"]
---

<div class="info-box note" markdown="1">

**▶ What you learn in this step** — Cowork reads **six different repositories** and assembles them into one document. This is the first point in the lab where it starts to feel truly agentic.
</div>

**The current time is 13:30.** In 30 minutes, you have an **FY26 Q3 quarterly business review (QBR) with Meridian Bank**. Meridian is Aurora's largest revenue account, Project Northstar (USD 4.2M) is underway, and there was an **incident six days ago**.

The problem is that you have only 30 minutes to prepare.

---

## What would a person have to review manually?

| What to review | Where it is | Time |
|---|---|---|
| Attendees and agenda | Calendar invite | 2 min |
| Recent conversation | 3 email threads / 11 emails | 15 min |
| Commitments from the last meeting | SharePoint meeting notes | 8 min |
| Current project status | SharePoint weekly status report | 8 min |
| Unfulfilled commitments | SharePoint list | 5 min |
| Internal team discussion | 22 Teams channel messages | 12 min |

**Total: 50 minutes.** You have 30 minutes left. So people usually skim only the emails before joining, then get called out by the customer for **forgetting what was promised in the previous meeting**.

---

## 2-1. Create a comprehensive briefing

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 4 · Core</span>

### 📌 What is happening

Within 30 minutes, you need to read six sources, decide what to say first, and anticipate the questions the customer may ask.

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>One-page HTML briefing</strong> — three conversation starters · ten expected questions · risk summary</dd>

<dt>💡 Efficiency point</dt>
<dd>The key is <strong>not speed, but preventing omissions</strong>. When people are short on time, they drop sources. Cowork can read all six in two minutes. Items surfaced from documents no one reopens — especially <strong>unfulfilled commitments from the previous meeting</strong> — can decide whether the meeting succeeds.</dd>

<dt>⚠️ What to check</dt>
<dd>Check whether the briefing includes the <strong>item the customer requested in the August meeting that has not yet been fulfilled</strong>. That is the answer for this scenario.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Prepare a briefing for today's 2 PM quarterly review meeting with Meridian Bank.
Use recent emails, open action items, the most recent meeting notes, current commitments,
and recent news mentions to identify three conversation starters I can use to open the discussion.
Also organize 10 likely questions and create a one-page HTML briefing.
~~~

</div>

<div class="expect" markdown="1">

**✅ Check the result** — The briefing should include the following.

- Attendees **Helena Vargas** (Head of Infrastructure) and **Rajiv Menon** (IT Operations Manager)
- Rollout progress: **1,870 / 3,200 (58%)**, 9 countries completed
- Mention of the **INC-4471 incident** from six days ago — post-incident report not yet submitted
- ⭐ **Unfulfilled commitment** — *"The customer asked in August for the downtime-avoidance impact to be converted into EUR, but no response has been sent yet"*
- 10 likely questions

**The ⭐ item is the highlight of this step.** This fact appears only as an "Open" item in the August meeting notes. It is not in email or the status report. If Cowork found it, that proves it **actually opened the meeting notes file**.
</div>

---

## 2-2. Send the briefing to your manager

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 5</span>

### 📌 What is happening

Lena Hoffmann, VP Sales, will attend this meeting. She does not want the full briefing; she wants **"the three lines I need to know."**

<dl>
<dt>🎯 Expected output</dt>
<dd>An <strong>email draft</strong> compressed for an executive audience, waiting for approval before sending</dd>

<dt>💡 Efficiency point</dt>
<dd><strong>Rewriting the same information for each recipient</strong> takes more time than you might expect. Cowork already has the briefing in the session, so it rewrites it by <strong>changing only the perspective</strong>, without reading everything again.</dd>

<dt>⚠️ What to check</dt>
<dd>The executive version should focus on <strong>numbers and risk</strong>. If it includes all the implementation details unchanged, the compression failed.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Based on the briefing you just created, draft a pre-read email to VP Sales Lena Hoffmann,
who will attend this meeting.
Include only a three-line executive summary, decisions needed today, and one risk.
Do not send it; show it to me as a draft.
~~~

</div>

<div class="expect" markdown="1">

**✅ Check the result**

- Does it start with a **compressed three-line summary**, not the full briefing?
- Does it include **executive-level numbers** such as contract size (USD 4.2M) and progress (58%)?
- Is it a draft and **not sent**?
</div>

---

## Why this step matters

The inbox triage in Step 1 is convenient, but a rules-based tool can imitate some of it. **Step 2 is different.**

<div class="info-box tip" markdown="1">

**It decides for itself "which sources to look at"** — The prompt does not say *"open the meeting notes file."* It only says "the most recent meeting notes." Cowork **found and opened the right file in SharePoint, then identified the unfulfilled item inside it**. You did not even tell it which folder to use.
</div>

This is the difference between search and an agent. With search, you need to know where to look. An agent finds it on its own.

---

## What you verified in this step

- ✅ It synthesizes **six repositories** at once: email, calendar, meeting notes, status reports, lists, and channels
- ✅ It **decides for itself** which file to open
- ✅ It surfaces **unfulfilled commitments from documents no one revisits**
- ✅ It **rewrites the same information for the recipient**

Go to **[Step 3 — In the afternoon, wrestle with the document pile]({{ '/en/chapters/cowork-lab-3-documents/' | relative_url }})**.
