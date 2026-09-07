---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 4 — Incident Response: Finding the Cause in One Teams Channel Line"
short_title: "Step 4. Incident communications"
description: "The incident cause is not in any document; it exists in only one line of a Teams war-room conversation. A post-incident reporting package that Cowork can complete only by cross-checking three sources."
order: 905
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "Incident response", "Cross-referencing", "Document generation", "Hands-on"]
---

<div class="info-box note" markdown="1">

**▶ What you learn in this step** — This is **the most important step** in the entire lab. To find the answer, Cowork must read **all three sources: a Teams channel, email, and SharePoint documents**. If it misses even one, it cannot produce the answer.
</div>

**Six days ago, before dawn,** Aurora Sentinel alerts in the Meridian Bank production network were delayed by **4 hours and 12 minutes**. The incident affected 412 pieces of equipment and delayed 1,148 alerts. Fortunately, zero alerts were lost and recovery is complete.

**But the post-incident report is still not done.** The customer will almost certainly ask about it in today's QBR.

---

## Why this is hard

Incident information is **split across three places**. And **the most important fact is in the least visible place**.

| Source | What it has | What it does not have |
|---|---|---|
| 📄 **SharePoint** engineering note | Timeline, symptoms, actions taken | **Root cause** — It ends with *"Under investigation. See hypothesis in war-room thread"* |
| 📊 **SharePoint** metrics workbook | Queue-depth graph and consumer-count trend | **Only numbers, no interpretation** |
| 📧 Five **emails** | Customer notifications by time | No mention of the cause |
| 💬 **Teams** war-room channel, 18 messages | ⭐ **One line with the root cause** | — |

**Key point** — The engineering note **intentionally does not include the cause.** The metrics workbook shows the consumer count stuck at **8** and then jumping to **32** at 05:31, but it does not explain *"why it was 8."*

The answer exists only in **one Teams war-room message**. Real incident response often flows this way: the true cause surfaces in a 3 AM chat, and the documents are updated only days later.

---

## 4-1. Create a post-incident communication package

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 9 · Biggest highlight</span>

### 📌 What is the situation?

Post-incident response usually requires a **three-part package**: a customer apology, an executive report, and an action tracker. Each has a different tone and level of detail.

<dl>
<dt>🎯 Expected output</dt>
<dd>① <strong>Communication email</strong> for the customer (Meridian Bank) ② internal <strong>executive update</strong> ③ <strong>action register Excel</strong> with owner, due date, and status columns</dd>

<dt>💡 Efficiency point</dt>
<dd>A person would <strong>scroll through 18 war-room messages</strong> to find the cause, copy the timeline from the documents, and write three separate outputs. It usually takes <strong>2 hours</strong>. The bigger problem is that <strong>the more urgent it is, the less likely people are to check the war room</strong> — which means the report goes out without the cause.</dd>

<dt>⚠️ What to verify</dt>
<dd>Check whether the outputs include the cause: <strong>"the consumer scale-out threshold was fixed at 8."</strong> This is the answer to the entire lab.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Combine the Teams war-room conversation, timeline emails,
and SharePoint engineering notes related to incident INC-4471, then create the following three outputs separately.
1) Communication email for the customer (Meridian Bank)
2) Internal executive update
3) Action register Excel (owner, due date, and status columns)
For the customer-facing version, use the order apology → cause → actions taken → prevention, and minimize technical jargon.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check — The answer to this lab**

### ⭐ Most important validation

Somewhere in the output, you should see a sentence with this meaning:

> *"The scale-out threshold for queue consumers was fixed at 8, so consumers could not increase even as load increased."*

**If this sentence appears, it proves that Cowork actually read the Teams channel.** This fact is:
- ❌ not in the engineering note (intentionally omitted)
- ❌ not in the metrics workbook (it has only the number 8, with no explanation)
- ❌ not in email
- ✅ in exactly **one Teams `INC-4471 War Room` message**

### Other checks

| Item | Expected value |
|---|---|
| Timeline | 02:10 detected → 03:05 customer notified → 05:31 mitigated → 06:22 recovered |
| Impact | **412** pieces of equipment, **1,148** delayed alerts, **0** lost |
| Maximum delay | **4 hours 12 minutes** |
| Customer notification timing | T+55 minutes |
| Outputs | Two email drafts (customer and executive) + Excel action register |
| Tone | Customer version minimizes technical terms; executive version is numbers-focused |
</div>

<div class="info-box warning" markdown="1">

**If the cause does not appear** — One of two things happened.

1. **Teams seed data is missing** — This means [Step 0, item 5](/en/chapters/cowork-lab-0-setup/) was not fully completed. Check whether the `INC-4471 War Room` channel has 18 messages.
2. **Cowork did not check the channel** — Ask again like this.

   *"Check the INC-4471 war-room channel conversation again and look for an engineering hypothesis about the root cause."*

The second case is actually **a good demo moment**. You can tell participants: *"See how that one sentence changed the answer — pointing to the source makes it much more accurate."*
</div>

---

## 4-2. Fill in the empty RCA document

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 10</span>

### 📌 What is the situation?

There is a file named `Meridian_RCA_outline.docx` in your OneDrive. When you open it, it has **only a title and table of contents, with the body completely empty**. It is a file you created a few days ago but could not finish.

<dl>
<dt>🎯 Expected output</dt>
<dd>An <strong>RCA document</strong> with all five sections completed: summary, timeline, root cause, impact, and corrective actions</dd>

<dt>💡 Efficiency point</dt>
<dd>This demonstrates that Cowork can <strong>distinguish between shared documents and your personal drafts</strong>. It only reads the official SharePoint documents, while it <strong>directly fills in the draft in your OneDrive.</strong> In other words, it pours the previously investigated content into an empty skeleton.</dd>

<dt>⚠️ What to verify</dt>
<dd>Check whether the Root cause section includes <strong>the threshold-8 fact found in 4-1</strong>.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
There is a file named Meridian_RCA_outline.docx in my OneDrive Cowork-demo/OneDrive_Ava folder.
It has only a title and table of contents and the body is empty. Fill each section with the INC-4471 content you just summarized.
In the root cause section, accurately describe the technical cause confirmed in the war room,
and for corrective actions, make the owner and deadline clear.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- Are all five sections (Summary / Timeline / Root cause / Impact / Corrective actions) **filled in**?
- Does the **Root cause** section mention the threshold-8 issue?
- Do the **Corrective actions** include owners and deadlines?
- Was the file **overwritten** (editing the existing file, not creating a new one)?
</div>

---

## What this step proves

<div class="info-box tip" markdown="1">

**How can you prove it read all three sources?** Usually, you cannot. If a summary looks plausible, it feels like everything was read.

That is why this lab plants **each fact in only one place**.
- The timeline is **only in the document**
- The number 8 is **only in the workbook**
- The interpretation that 8 was *a configured cap* is **only in the channel**

A report that includes all three can only be produced by reading all three places. It is **structured so it cannot be guessed by chance**.
</div>

---

## What you verified in this step

- ✅ It treats **Teams channel conversations** as information sources on the same level as documents
- ✅ It retrieves facts **from a channel even when they are not in documents** and reflects them in a report
- ✅ It writes about the same incident in **different tones for different recipients** (customer/executive)
- ✅ It finds and fills in **an empty draft in your OneDrive**
- ✅ It creates **three formats** at once: document, spreadsheet, and email

Go to **[Step 5 — Friday: calendar cleanup and a new hire]({{ '/en/chapters/cowork-lab-5-weekly/' | relative_url }})**.
