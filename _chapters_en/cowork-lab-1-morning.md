---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 1 — 08:30 in the morning, clear the backlog first"
short_title: "Step 1. Morning triage"
description: "Delegate the email, calendar, and Teams cleanup that eats the first 30 minutes of the workday to Cowork: triage, priority discovery, and unanswered-message tracking."
order: 902
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "Inbox triage", "Prioritisation", "Hands-on"]
---

<div class="info-box note" markdown="1">

**▶ What you learn in this step** — Cowork can handle not just "summarize this," but **"classify, organize, and draft responses too."** This is where the difference between a read-only tool and an agent that acts first becomes clear.
</div>

**The current time is 08:30.** You are Ava Nakamura, a sales representative at Aurora Dynamics. You open your laptop to find overnight email piled up, today's calendar already packed, and Teams messages from yesterday still waiting for replies.

---

## 1-1. Inbox triage

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 1</span>

### 📌 What is happening

About 20 emails came in overnight. Only two are truly urgent, but they are buried among six newsletters and simple confirmation requests. This **daily morning classification work** usually takes 20–30 minutes.

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>Flag</strong> urgent emails · <strong>Archive</strong> newsletters · Create <strong>three reply drafts</strong> for items that need quick responses (not sent yet) · Overall summary</dd>

<dt>💡 Efficiency point</dt>
<dd>When a person does this, they must <strong>open emails one by one</strong> to know what is urgent. Cowork evaluates sender, subject, body, and thread context together, and it does not stop at classification — it also <strong>prepares reply drafts</strong>. 20 minutes → 2 minutes.</dd>

<dt>⚠️ What to check</dt>
<dd>Check that Cowork <strong>creates drafts only and does not send</strong>. Any action that leaves the organization always requires approval.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Review the emails I received over the last 24 hours and:
- flag urgent items
- archive newsletters and promotional emails
- draft replies for items that need a quick response.
When you are done, show me a summary.
~~~

</div>

<div class="expect" markdown="1">

**✅ Check the result** — It is successful if you see the following.

- **2 emails** classified as urgent — Rajiv Menon's incident follow-up request from Meridian Bank, and Ingrid Bauer's RFP question deadline notice from Halcyon Energy
- **6 newsletters** archived
- **3 reply drafts** created but **not sent**
</div>

<div class="info-box tip" markdown="1">

**If you do not like the classification, do not rerun everything** — In the same conversation, say something like *"Change the Ingrid Bauer email from urgent to normal."* Cowork will adjust only that part instead of doing everything again. Conversational correction is much faster than starting over.
</div>

---

## 1-2. Today's top three priorities

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 2</span>

### 📌 What is happening

Email is organized, but **"So what should I do first today?"** remains unanswered. The calendar, inbox, and Teams are each in different windows, and you have to combine all three in your head before you get the answer.

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>Top three priorities</strong> with evidence · <strong>Reply drafts within three sentences</strong> for the top two urgent items</dd>

<dt>💡 Efficiency point</dt>
<dd>This is the first time you look across <strong>three repositories at once</strong>: calendar + email + Teams. A person has to move between three windows and loses context while switching. Cowork reads them together and <strong>cross-compares</strong>.</dd>

<dt>⚠️ What to check</dt>
<dd>Check whether each priority includes evidence for <strong>"why this is number 1."</strong> A list without evidence cannot be trusted.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Combine today's calendar, important unread emails since yesterday, and Teams messages I have not replied to yet.
Recommend my top three priorities for this morning.
For the top two urgent items, also draft replies in three sentences or fewer. Do not send them.
~~~

</div>

<div class="expect" markdown="1">

**✅ Check the result**

- Is today's **14:00 Meridian Bank QBR** reflected in the priorities?
- Did Cowork find **4 Teams messages waiting for a reply**?
- Does each priority include evidence, such as which email or calendar item caused it?
</div>

---

## 1-3. Things I sent but never got a reply to

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 3</span>

### 📌 What is happening

Received emails are visible, but **emails I sent and never got a reply to** are not. This is one of the most common leaks in sales work: waiting for a contract response, partner resource confirmation, renewal data requests — all quietly forgotten.

<dl>
<dt>🎯 Expected output</dt>
<dd>A list of unanswered emails and <strong>four polite follow-up drafts</strong>, one for each item</dd>

<dt>💡 Efficiency point</dt>
<dd>This is work that people <strong>structurally miss</strong>. Unless you intentionally dig through Sent Items, you cannot see it. Even then, you must check each thread to see whether a reply came in. Cowork compares Sent Items and Inbox <strong>at the thread level</strong>.</dd>

<dt>⚠️ What to check</dt>
<dd>Check the <strong>tone</strong> of the drafts. They should be polite confirmations, not pressure. The recipients are customers and partners.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Find emails I sent over the last week that have not received a reply yet.
For each one, draft a polite follow-up. Show them to me before sending.
~~~

</div>

<div class="expect" markdown="1">

**✅ Check the result** — You should see **4 unanswered items**.

| Recipient | Organization | Waiting for |
|---|---|---|
| Peter Novak | Kestrel Logistics | Contract response |
| Claire Dubois | Ironwood Consulting | Resource confirmation |
| Diego Ferrer | Internal CSM | Solstice renewal data |
| Yuki Tanaka | Internal Finance | Q3 numbers confirmation |
</div>

---

## What you verified in this step

- ✅ Cowork does **not stop at classification**; it performs **real actions** such as archiving and flagging
- ✅ It reads and cross-compares **three repositories at once**: email, calendar, and Teams
- ✅ Actions that go outside the organization, such as sending email, **always require approval**
- ✅ When a result is wrong, **correcting it in conversation** is faster than asking again from scratch

<div class="info-box note" markdown="1">

**This is still the warm-up** — So far, the work has happened "inside the mailbox." Starting with the next step, Cowork begins **moving across documents and channels** to assemble scattered facts.
</div>

Go to **[Step 2 — 30 minutes before the meeting, create a briefing]({{ '/en/chapters/cowork-lab-2-briefing/' | relative_url }})**.
