---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 2 — 30 minutes before the meeting, brief from multiple sources"
short_title: "Step 2. Meeting briefing"
description: "The quarterly review with your largest customer is in 30 minutes. Create a short briefing by combining email, meeting notes, status reports, and Teams."
order: 903
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "Meeting prep", "Cross-referencing", "Hands-on"]
---

<div class="info-box note" markdown="1">

**▶ What you learn** — Cowork reads **multiple repositories** and assembles them into one answer. This is the first point where it feels agentic.
</div>

**13:30.** In 30 minutes, you have the **Meridian Bank FY26 Q3 quarterly business review (QBR)**. It is your largest account, Project Northstar (USD 4.2M) is in progress, and there was an **incident six days ago.**

---

## If a person did it manually

| What to review | Where | Time |
|---|---|---|
| Attendees and agenda | Calendar invite | 2 min |
| Recent conversation | 3 email threads, 11 emails | 15 min |
| Commitments from last meeting | SharePoint meeting notes | 8 min |
| Project status | SharePoint status report | 8 min |
| Open commitments | SharePoint list | 5 min |
| Internal discussion | 22 Teams channel messages | 12 min |

**Total: 50 minutes.** You have 30 minutes left. So people usually skim only email and enter the meeting, then get called out for **forgetting last meeting's promises**.

---

## 2-1. Create a comprehensive briefing

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 4 · Core</span>

### 📌 What is happening

Within 30 minutes, you need to read multiple sources and decide what to say first.

<dl>
<dt>🎯 Expected output</dt>
<dd>A <strong>short briefing</strong> in chat — 3 conversation points · unfulfilled promise · 1 risk</dd>

<dt>💡 Efficiency point</dt>
<dd>The point is not speed but <strong>preventing omissions</strong>. When people are short on time, they drop sources. Items from documents no one reopens, especially <strong>unfulfilled promises from the last meeting</strong>, can decide the meeting.</dd>

<dt>⚠️ What to check</dt>
<dd>Check whether it includes the <strong>item the customer requested in the August meeting that is still unfulfilled</strong>. That is the answer.</dd>
</dl>

</div>

<div class="info-box tip" markdown="1">

**Why not create an HTML file** — File generation is the slowest part of this scenario. A chat briefing is faster to read and shows results immediately in a demo.
</div>

<div class="prompt-box" markdown="1">

~~~text
Create a short chat briefing for today's 14:00 Meridian Bank quarterly review.
You only need recent emails, the most recent meeting notes, and open action items.
① 3 conversation openers ② promises not yet fulfilled ③ 1 risk.
One or two lines for each item is enough. Do not create a file.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- Attendees **Helena Vargas** (Head of Infrastructure), **Rajiv Menon** (IT Operations Manager)
- Rollout progress **1,870 / 3,200 (58%)**
- Mention of **INC-4471 incident** six days ago, post-incident report not submitted
- ⭐ **Unfulfilled promise** — *"No response yet to the August request to convert downtime-avoidance impact into EUR"*

**The ⭐ item is the highlight.** This fact appears only as an "Open" item in the August meeting notes. It is not in email or the status report. If Cowork found it, it **actually opened the meeting notes**.

</div>

<div class="info-box tip" markdown="1">

**If you need likely questions** — *"Only 5 questions the customer may ask in this meeting."* Asking for 10 from the start is slower.
</div>

---

## 2-2. Tell your manager in 3 lines

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 5</span>

### 📌 What is happening

VP Sales Lena Hoffmann will attend. She does not want the full briefing; she wants **"the 3 lines I need to know."**

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>3 lines + 1 risk</strong> for an executive</dd>

<dt>💡 Efficiency point</dt>
<dd><strong>Rewriting the same information for each recipient</strong> takes time. Cowork keeps the briefing in the session, so it can change only the <strong>perspective</strong> without rereading.</dd>

<dt>⚠️ What to check</dt>
<dd>The executive version should focus on <strong>numbers and risk</strong>.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Reduce the briefing you just made to 3 lines for VP Sales Lena Hoffmann.
Add only 1 decision needed today and 1 risk. Do not create an email yet.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- Is it a **compressed 3 lines**, not the full briefing?
- Does it include **executive numbers** such as USD 4.2M and 58%?
- Are working-level details removed?

</div>

<div class="info-box tip" markdown="1">

**To send by email** — *"Turn the above into an email draft to Lena. Do not send it."*
</div>

---

## Why this step matters

<div class="info-box tip" markdown="1">

**It decides for itself "which sources to look at"** — The prompt does not say *"open the meeting notes file."* It only says "the most recent meeting notes." Cowork **found it in SharePoint, opened it, and picked out the unfulfilled item**.
</div>

Search requires you to know where to look. An agent finds it on its own.

---

## What you verified in this step

- ✅ It synthesizes **multiple repositories** at once
- ✅ It **decides for itself** which file to open
- ✅ It surfaces **unfulfilled promises from documents no one reads**
- ✅ It **rewrites the same information for the recipient**

Go to **[Step 3 — Afternoon, wrestle with the document pile]({{ '/en/chapters/cowork-lab-3-documents/' | relative_url }})**.
