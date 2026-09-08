---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 4 — Incident response, finding the cause in one Teams channel line"
short_title: "Step 4. Incident communications"
description: "The incident cause is not in any document; it exists only in one Teams war-room line. The answer appears only when Cowork cross-checks three sources."
order: 905
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "Incident response", "Cross-referencing", "Document generation", "Hands-on"]
---

<div class="info-box note" markdown="1">

**▶ What you learn** — This is **the most important step** in the lab. To find the answer, Cowork must read **all three places: Teams channel, email, and SharePoint**. If one is missing, there is no answer.
</div>

**Six days ago before dawn,** Aurora Sentinel alerts in Meridian Bank's production network were delayed by **4 hours 12 minutes**. 412 devices affected, 1,148 delayed alerts, 0 lost. Recovery is complete.

**But the post-incident report is still not done.** The customer will certainly ask in today's QBR.

---

## Why this is hard

Incident information is **split across three places**, and **the most important fact is in the least visible place**.

| Source | What it has | What it lacks |
|---|---|---|
| 📄 **SharePoint** engineering note | Timeline, symptoms, actions | **Root cause** — ends with *"under investigation"* |
| 📊 **SharePoint** metrics workbook | Queue depth, consumer-count trend | Numbers only, no interpretation |
| 📧 **Email** 5 messages | Customer notification history | No cause mentioned |
| 💬 **Teams** war room 18 messages | ⭐ **One root-cause line** | — |

The metrics workbook shows consumer count stuck at **8**, then jumping to **32** at 05:31, but it does not explain *"why it was 8."* That answer exists only in **one Teams war-room message**.

Real incident response often works this way. The true cause appears in a 3 AM chat and reaches documents days later.

---

## 4-1. Confirm cause and timeline first

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 9 · Biggest highlight</span>

### 📌 What is happening

Before writing post-incident documents, you must get **the facts right**. If the cause is wrong here, everything after it is wrong.

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>One root-cause line + timeline + impact numbers</strong> in chat</dd>

<dt>💡 Efficiency point</dt>
<dd>A person must <strong>scroll 18 war-room messages</strong> to find the cause and copy the timeline from documents. The bigger problem: <strong>the more urgent it is, the less people check the war room</strong>, so reports go out without the cause.</dd>

<dt>⚠️ What to check</dt>
<dd>Check whether it says <strong>"the consumer scale-out threshold was fixed at 8."</strong> This is the answer to the whole lab.</dd>
</dl>

</div>

<div class="info-box tip" markdown="1">

**Why not ask for email, report, and Excel at once** — Writing three outputs is slowest, and if the cause is wrong, all three must be rewritten. **Fact check → output** is faster overall.
</div>

<div class="prompt-box" markdown="1">

~~~text
Find the root cause of incident INC-4471 in the Teams war-room conversation.
Tell me only one cause line, 4 timeline lines, and 3 impact numbers in chat. Do not create a document.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check — The answer to this lab**

The answer should include a sentence like this.

> *"The scale-out threshold for queue consumers was fixed at 8, so consumers could not increase even as load increased."*

**If this sentence appears, it proves Cowork actually read the Teams channel.**

- ❌ Not in the engineering note (intentionally omitted)
- ❌ Not in the metrics workbook (only the number 8, no explanation)
- ❌ Not in email
- ✅ Only in exactly **one Teams `INC-4471 War Room` message**

| Item | Expected value |
|---|---|
| Timeline | 02:10 detected → 03:05 customer notified → 05:31 mitigated → 06:22 recovered |
| Impact | **412 devices**, **1,148 delayed alerts**, **0 lost** |
| Maximum delay | **4 hours 12 minutes** |

</div>

<div class="info-box warning" markdown="1">

**If the cause does not appear** — One of two things happened.

1. **Teams seed data is missing** — [Step 0, item 5](/en/chapters/cowork-lab-0-setup/) was not fully completed. Check whether the `INC-4471 War Room` channel has 18 messages.
2. **Cowork did not check the channel** — *"Check the war-room channel conversation again and find the root-cause hypothesis."*

The second case is actually **a good demo moment**. You can explain: *"Pointing to the source makes it much more accurate and faster."*
</div>

---

## 4-2. Customer email draft

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 10</span>

### 📌 What is happening

The cause is confirmed. Now write **the message to the customer**. Tone matters.

<dl>
<dt>🎯 Expected output</dt>
<dd>One <strong>email draft</strong> for Meridian Bank (before sending)</dd>

<dt>💡 Efficiency point</dt>
<dd>It carries over the facts from the previous step <strong>as-is.</strong> No need to investigate again, so drafting is fast.</dd>

<dt>⚠️ What to check</dt>
<dd>Check whether technical terms are <strong>explained at customer level</strong>, and whether it was not sent.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Using what you just summarized, draft an email to Meridian Bank.
Order: apology → cause → actions taken → prevention. Minimize technical terms. Keep it under 200 characters. Do not send.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- Does it follow the four-paragraph order?
- Are terms like threshold and consumer **translated into plain language**?
- Is it still a draft and **not sent**?

</div>

<div class="info-box tip" markdown="1">

**Ask for other outputs only when needed** — *"Same content, 3 lines for executives focused on numbers."* / *"Create an Excel action register with owner and due date columns for corrective actions."*
</div>

---

## 4-3. Fill the empty RCA document (optional)

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 11 · Optional</span>

### 📌 What is happening

`Meridian_RCA_outline.docx` is in OneDrive. It has **only a title and table of contents; the body is empty**.

<dl>
<dt>🎯 Expected output</dt>
<dd>An <strong>RCA document</strong> with five sections filled</dd>

<dt>💡 Efficiency point</dt>
<dd>It treats <strong>shared documents and my draft differently.</strong> It only reads official SharePoint documents, and <strong>directly fills my OneDrive draft.</strong></dd>

<dt>⚠️ What to check</dt>
<dd>Check whether the Root cause section includes <strong>threshold 8</strong>.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Fill Meridian_RCA_outline.docx in my OneDrive Cowork-demo/OneDrive_Ava folder
with the INC-4471 content you just summarized. Keep each section under 3 lines. Write into the existing file, not a new file.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- Are five sections (Summary / Timeline / Root cause / Impact / Corrective actions) filled?
- Does **Root cause** describe threshold 8?
- Was the **existing file edited**, not a new file created?

</div>

---

## What this step proves

<div class="info-box tip" markdown="1">

**How do you prove it read all 3 sources?** Usually you cannot. If a summary looks plausible, it seems like everything was read.

So this lab plants **each fact in only one place**. Timeline only in documents, number 8 only in the workbook, and the interpretation that *8 was the configured cap* only in the channel. It is **structured so it cannot be guessed by chance**.
</div>

---

## What you verified in this step

- ✅ It treats **Teams conversations** as information sources equal to documents
- ✅ It retrieves facts **from a channel** and reflects them even when documents omit them
- ✅ It writes the same event in **different tones by recipient**
- ✅ It finds and fills **an empty draft in my OneDrive**
- ✅ **Fact check → output** reduces rewrites

Go to **[Step 5 — Friday, calendar cleanup and a new hire]({{ '/en/chapters/cowork-lab-5-weekly/' | relative_url }})**.
