---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 5 — Friday, calendar cleanup and welcoming a new hire"
short_title: "Step 5. Weekly wrap-up and onboarding"
description: "Find meetings you can decline, detect double bookings, and prepare onboarding for next week's new hire."
order: 906
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "Calendar management", "Onboarding", "Hands-on"]
---

<div class="info-box note" markdown="1">

**▶ What you learn** — Cowork **reads and judges your calendar** and **finds meeting times across multiple people**. Until now it read and wrote; from here, it schedules.
</div>

**Friday afternoon.** Next week's calendar is packed, and **new hire Alex Chen starts on Monday.**

---

## 5-1. Find meetings you can decline

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 12</span>

### 📌 What is happening

There are **34 meetings** over the next 2 weeks. Some have no agenda, some have 18 attendees, and some are unrelated to your role. The problem is you must **open them one by one to decide**.

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>Table</strong> of decline candidates with reasons · <strong>calendar conflict flagged</strong></dd>

<dt>💡 Efficiency point</dt>
<dd>Meeting cleanup is work <strong>everyone needs but nobody does</strong>. Opening 34 meetings takes 30 minutes, and decline emails feel awkward, so people just attend.</dd>

<dt>⚠️ What to check</dt>
<dd>One <strong>double booking</strong> is seeded. Check whether Cowork finds it.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Look only at my calendar for next week and show meetings I can decline as a table.
Criteria: no agenda / too many attendees / irrelevant to my role. Also flag calendar conflicts.
Do not touch focus time, and do not draft emails yet.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- ⭐ **Double booking** — Northstar steering and Halcyon internal review are in **the same time slot**
- **3 recurring meetings** with no agenda (18-person weekly Ops Sync, biweekly tooling review, weekly All-Hands replay)
- Did it leave **focus-time blocks** untouched?

</div>

<div class="info-box tip" markdown="1">

**If you need decline text** — *"Draft a polite decline email only for the Ops Sync item above. Say I will follow up through meeting notes."* This is faster than drafting 3–5 at once.
</div>

---

## 5-2. New-hire onboarding

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 13</span>

### 📌 What is happening

**Alex Chen** starts Monday as a Solution Engineer. You need required reading, intro meetings, a welcome message, and a 30/60/90-day plan.

<dl>
<dt>🎯 Expected output</dt>
<dd>Required-reading list + <strong>30/60/90-day plan outline</strong></dd>

<dt>💡 Efficiency point</dt>
<dd>The 30/60/90 plan is based on the <strong>job description</strong>, so it is not generic. Most people rush it because they lack time.</dd>

<dt>⚠️ What to check</dt>
<dd>Check whether it reflects the job description's <strong>6 responsibilities and 3 90-day expectations</strong>.</dd>
</dl>

</div>

<div class="info-box tip" markdown="1">

**Do not ask for five things at once** — Asking for lists, 6 meetings, welcome message, intro post, and plan together overlaps calendar checks and document creation. **Reading first, writing later.**
</div>

<div class="prompt-box" markdown="1">

~~~text
For Alex Chen (Solution Engineer), who starts Monday, summarize only two things in chat.
① Required-reading list based on 07_Onboarding and 06_Policies (mark what to read on Day 1)
② 30/60/90-day plan outline based on the job description — 3 goals per period
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

| Item | Expected value |
|---|---|
| Required reading | 6 items based on `Onboarding_ReadingList.xlsx`. **Information Security Policy is Day 1** |
| 30/60/90 | Reflects the job description's **6 responsibilities and 3 90-day expectations** |

</div>

<div class="info-box tip" markdown="1">

**Continue one by one** — *"Schedule 30-minute intro meetings next week with Marcus, Priya, and Lena. Show me before booking."* / *"Draft a Day-1 welcome message."* / *"Draft a team-channel introduction."*
</div>

---

## 5-3. Fill the empty 30/60/90 document (optional)

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 14 · Optional</span>

### 📌 What is happening

Like the RCA in Step 4, `Alex_Chen_30-60-90_draft.docx` in OneDrive has **only a title and is empty**.

<dl>
<dt>🎯 Expected output</dt>
<dd>A plan document with all three periods filled</dd>

<dt>💡 Efficiency point</dt>
<dd>Creating a new file and <strong>filling an existing file in its format</strong> are different tasks.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Fill Alex_Chen_30-60-90_draft.docx in my OneDrive Cowork-demo/OneDrive_Ava folder
with the plan you just made. For each period, include 3 goals and one line of evidence. Write into the existing file.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- Are all three periods filled?
- Does each period include **measurable evidence**?
- Was the **existing file edited**, not a new file created?

</div>

---

## What you verified in this step

- ✅ It reads the calendar and **judges decline candidates**
- ✅ It detects **conflicts such as double bookings**
- ✅ It checks **multiple people's calendars** to find open time
- ✅ It creates a **non-generic plan** grounded in the job description
- ✅ Actions such as booking and posting **go through approval**

Go to **[Step 6 — Automation, make it run every week on its own]({{ '/en/chapters/cowork-lab-6-automation/' | relative_url }})**.
