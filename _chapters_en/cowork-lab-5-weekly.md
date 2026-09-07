---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 5 — Friday: Calendar Cleanup and Welcoming a New Hire"
short_title: "Step 5. Weekly wrap-up and onboarding"
description: "Find meetings you can decline, detect double bookings, and create an onboarding package for next week's new hire all at once."
order: 906
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "Calendar management", "Onboarding", "Hands-on"]
---

<div class="info-box note" markdown="1">

**▶ What you learn in this step** — Cowork can **read and judge your calendar**, and even **schedule meetings by matching multiple people's availability**. Up to now, you have seen "read and write." From here, it becomes **scheduling**.
</div>

**Friday afternoon.** Two tasks remain. Your next two weeks are packed with meetings and need cleanup, and **Alex Chen, a new hire, starts next Monday.**

---

## 5-1. Find meetings you can decline

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 11</span>

### 📌 What is the situation?

There are **34 meetings** on your calendar over the next two weeks. Many have no agenda, include 18 attendees, or have little to do with your role. The problem is that **you have to open them one by one to decide**.

<dl>
<dt>🎯 Expected output</dt>
<dd>List of meeting-decline candidates with reasons · <strong>calendar conflicts flagged</strong> · 3–5 decline-email drafts · action plan</dd>

<dt>💡 Efficiency point</dt>
<dd>Meeting cleanup is something <strong>everyone thinks is necessary but nobody does</strong>. It takes 30 minutes to open 34 meetings one by one, and writing decline emails feels awkward, so people end up attending anyway. Cowork handles the judgment and <strong>writes the decline language</strong> at the same time.</dd>

<dt>⚠️ What to verify</dt>
<dd>One <strong>double booking</strong> is seeded in the calendar. Check whether Cowork finds it.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Review my calendar for the next two weeks and find meetings I can decline.
Criteria: no agenda / too many attendees / low relevance to my role.
Protect existing focus time, and flag calendar conflicts separately.
For low-priority meetings, also draft decline emails and show them as an action plan.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- ⭐ **Did it find the double booking?** — The Northstar steering meeting and Halcyon internal review are scheduled for **the same time slot**
- Did it identify **three types** of recurring meetings without agendas? (18-person weekly Ops Sync, biweekly tooling review, weekly All-Hands replay)
- Did it leave the **four focus-time blocks** untouched?
- Were decline-email drafts created and **not sent**?
</div>

<div class="info-box tip" markdown="1">

**Check the tone of the decline email** — A good decline message gives a brief reason, suggests an alternative, and mentions a substitute attendee if needed. If Cowork's draft feels too blunt, revise it by saying: *"Make it more polite and add that I will follow up through the meeting notes."*
</div>

---

## 5-2. New-hire onboarding package

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 12</span>

### 📌 What is the situation?

**Alex Chen** starts next Monday as a Solution Engineer. There is a lot to prepare: a required-reading list, six introductory meetings, a welcome message, a team-channel introduction, and a 30/60/90-day plan.

In particular, a proper **30/60/90-day plan** requires reading the job description and team charter, but most people do not have enough time and create a superficial version.

<dl>
<dt>🎯 Expected output</dt>
<dd>Required-reading list · <strong>six 30-minute introductory meetings scheduled</strong> · Day-1 welcome message · team-channel introduction · <strong>30/60/90-day plan document</strong></dd>

<dt>💡 Efficiency point</dt>
<dd>This is the first time the lab <strong>checks multiple people's calendars at once</strong>. Looking at six people's schedules for next week and finding 30-minute openings is one of the <strong>most tedious tasks</strong> for a person. And because the 30/60/90 plan is based on the <strong>job description</strong>, it is not just a formality.</dd>

<dt>⚠️ What to verify</dt>
<dd>Check whether the plan actually reflects the <strong>six responsibilities and three 90-day expectations</strong> from the job description.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Create an onboarding package for Alex Chen (Solution Engineer), who starts next Monday.
- Required-reading list from the 07_Onboarding folder and 06_Policies
- Schedule six 30-minute introductory meetings during the first week (Marcus, Priya, Diego, Lena, Tom, Sofia)
- Draft a Day-1 welcome message
- Draft an introduction post for the team channel
- Create a 30/60/90-day plan based on the job description and team charter
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

| Item | Expected value |
|---|---|
| Required-reading list | Six items based on `Onboarding_ReadingList.xlsx`. The **Information Security Policy must be scheduled for Day 1** |
| Introductory meetings | 30 minutes with each of six people. **Calendars are tightly packed**, so finding openings is not easy |
| 30/60/90 plan | Reflects the **six responsibilities, five competencies, and three 90-day expectations** from the job description |
| Welcome message | Draft for Day-1 sending, not sent yet |
| Channel introduction | Draft for posting to the team channel |

**⭐ Additional check** — If Cowork reports constraints such as *"some of the six people have packed calendars next week, making it difficult to find time,"* it actually checked the calendars. If it simply created six meetings at arbitrary times, it did not check.
</div>

---

## 5-3. Fill in the empty 30/60/90 document (optional)

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 13 · Optional</span>

### 📌 What is the situation?

Like the RCA document in Step 4, there is an `Alex_Chen_30-60-90_draft.docx` file in OneDrive that has **only the title and is otherwise empty**.

<dl>
<dt>🎯 Expected output</dt>
<dd>A plan document with all three periods filled in: First 30 days / Days 31-60 / Days 61-90</dd>

<dt>💡 Efficiency point</dt>
<dd>Cowork moves the onboarding-package content you just created into the <strong>existing file format</strong>. Creating a new file and <strong>filling an existing file</strong> are different tasks.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
There is an Alex_Chen_30-60-90_draft.docx file in my OneDrive Cowork-demo/OneDrive_Ava folder.
It has only a title and three section headings, with the body empty.
Fill each period with the onboarding plan you just created.
For each period, include three goals and the evidence that can verify those goals were achieved.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- Are all three periods filled in?
- Does each period include **measurable evidence**? (The job description's 90-day expectations are written in an evidence-based way.)
- Was the existing file **overwritten**?
</div>

---

## What you verified in this step

- ✅ It reads your calendar and **judges decline candidates** (agenda, attendee count, role relevance)
- ✅ It detects **conflicts such as double bookings**
- ✅ It checks **multiple people's calendars at once** to find open times
- ✅ It creates a **non-generic plan** grounded in a document (job description)
- ✅ Actions such as scheduling meetings and posting messages **go through approval**

Go to **[Step 6 — Automation: make it run every week on its own]({{ '/en/chapters/cowork-lab-6-automation/' | relative_url }})**.
