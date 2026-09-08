---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 1 — 08:30, clear the backlog first"
short_title: "Step 1. Morning triage"
description: "Delegate the email cleanup that eats the first 30 minutes after sign-in to Cowork: triage, priorities, and unanswered-reply tracking."
order: 902
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "Inbox triage", "Priorities", "Hands-on"]
---

<div class="info-box note" markdown="1">

**▶ What you learn** — Cowork takes not "summarize this" but **"classify and organize this."** This is where the difference between a reading tool and an acting agent first appears.
</div>

**08:30.** You are Ava Nakamura, a sales rep at Aurora Dynamics. Email piled up overnight, today's calendar is packed, and Teams has messages waiting for replies.

---

## 1-1. Inbox triage

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 1</span>

### 📌 What is happening

Twenty emails arrived overnight. Only two are truly urgent, but they are buried among newsletters. This takes 20–30 minutes every morning.

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>Flag</strong> urgent emails · <strong>Archive</strong> newsletters · 3-line summary</dd>

<dt>💡 Efficiency point</dt>
<dd>A person must open emails one by one to judge urgency. Cowork sees sender, subject, and body together, and <strong>does not stop at classification; it actually handles them</strong>.</dd>

<dt>⚠️ What to check</dt>
<dd>Check that it only <strong>classifies and archives</strong>, without sending anything.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Review only 20 emails from the last 24 hours. Flag urgent items and archive newsletters.
Summarize the result in only 3 lines. Do not draft replies.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- **2 urgent emails** — Rajiv Menon (Meridian Bank) incident follow-up, Ingrid Bauer (Halcyon Energy) RFP question deadline
- **6 newsletters** archived
- Summary is within 3 lines

</div>

<div class="info-box tip" markdown="1">

**If you need drafts, continue with** — *"Draft 3-sentence replies only for the 2 items you just marked urgent. Do not send them."* It is faster than asking for everything at once.
</div>

---

## 1-2. Today's top three priorities

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 2</span>

### 📌 What is happening

Email is organized, but **"so what should I do first?"** remains. Calendar, inbox, and Teams are in separate windows.

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>Three priorities</strong> with evidence, one line each</dd>

<dt>💡 Efficiency point</dt>
<dd>This is the first time Cowork reads <strong>calendar + email + Teams</strong> together. People lose context while moving across three windows.</dd>

<dt>⚠️ What to check</dt>
<dd>Check whether each item includes evidence for <strong>"why it is number 1."</strong></dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Look at today's calendar, important unread emails, and Teams messages I have not replied to.
Tell me only my top 3 priorities for this morning, one line each. Add one line of evidence each. Do not draft anything.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- Is the **14:00 Meridian Bank QBR** included as a priority?
- Did it find **4 Teams messages waiting for a reply**?
- Does each item include evidence (which email or which event)?

</div>

---

## 1-3. Things I sent but never got a reply to

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 3</span>

### 📌 What is happening

Received email is visible, but **email I sent that never got a reply** is not. This is the most common leak in sales.

<dl>
<dt>🎯 Expected output</dt>
<dd>One <strong>table</strong> of unanswered emails</dd>

<dt>💡 Efficiency point</dt>
<dd>This is work people <strong>structurally miss</strong>. Even in Sent Items, you must check each thread for a reply. Cowork compares at the <strong>thread level</strong>.</dd>

<dt>⚠️ What to check</dt>
<dd>Check that it does not create drafts when you did not ask for them.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Make a table of only the emails I sent in the last week that have not received a reply.
Use 3 columns: recipient / organization / what I am waiting for. Do not draft anything yet.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check** — You should see **4 unanswered items**.

| Recipient | Organization | Waiting for |
|---|---|---|
| Peter Novak | Kestrel Logistics | Contract response |
| Claire Dubois | Ironwood Consulting | Resource confirmation |
| Diego Ferrer | Internal CSM | Solstice renewal data |
| Yuki Tanaka | Internal Finance | Q3 numbers confirmation |

</div>

<div class="info-box tip" markdown="1">

**If you need a follow-up** — *"For the Peter Novak item only, draft a polite follow-up."* This is much faster than drafting all 4 at once.
</div>

---

## What you verified in this step

- ✅ It does **real actions** such as archive and flag, not just classification
- ✅ It reads **three repositories at once**: email, calendar, and Teams
- ✅ External actions **require approval**
- ✅ Short prompts and **follow-up expansion** are faster

Go to **[Step 2 — 30 minutes before the meeting, create a briefing]({{ '/en/chapters/cowork-lab-2-briefing/' | relative_url }})**.
