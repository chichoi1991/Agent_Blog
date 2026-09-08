---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 3 — Afternoon, find toxic clauses in a 20-page contract"
short_title: "Step 3. Deep document analysis"
description: "Find RFP toxic clauses, draft a proposal deck, and translate contract SLA clauses into plain language. Cowork finds clauses buried near the end and conflicts across documents."
order: 904
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "RFP analysis", "Contract review", "Document generation", "Hands-on"]
---

<div class="info-box note" markdown="1">

**▶ What you learn** — What it means to read a document **to the end**. And the ability to connect **two conflicting numbers in different folders**.
</div>

**Afternoon.** Two document tasks are waiting.

1. **Halcyon Energy RFP** — EUR 2.6M, D-18. You still have not read the 20 pages.
2. **Kestrel Logistics contract renewal** — You need to make Legal's review readable for the delivery team.

---

## 3-1. Find RFP toxic clauses first

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 6 · Core</span>

### 📌 What is happening

The tender document is 20 pages, clauses §1–§14. The most dangerous RFP review mistake is **reading only the front before starting the proposal**. Toxic clauses are always near the back.

<dl>
<dt>🎯 Expected output</dt>
<dd>One <strong>table</strong> of unfavorable clauses — clause number · content · why it is risky</dd>

<dt>💡 Efficiency point</dt>
<dd>For a person, extracting toxic clauses from a 20-page legal document takes <strong>2–3 hours</strong>, and attention drops near the end. Cowork reads to the end with <strong>consistent attention</strong>.</dd>

<dt>⚠️ What to check</dt>
<dd>Check whether <strong>§9.4 and §12.2</strong> are identified. They are <strong>intentionally buried</strong> on pages 13 and 18.</dd>
</dl>

</div>

<div class="info-box tip" markdown="1">

**Why not ask for 6 items at once** — Overview, schedule, scoring, clauses, references, and documents make Cowork scan the document six times. Get **the most important thing first**, then ask only what you need.
</div>

<div class="prompt-box" markdown="1">

~~~text
In the Halcyon Energy RFP in the SharePoint 01_RFP folder, find only clauses that are unfavorable to us.
Check all the way to the back of the document and answer only as a 3-column table: clause number / content / why it is risky.
Do not create a file.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check — The highlight of this step**

| Clause | Content | Why it is toxic |
|---|---|---|
| **§9.4** Limitation of liability | Supplier liability for indirect and consequential damages is **unlimited**, with no aggregate cap | Contract value is EUR 2.6M, but damages are unlimited |
| **§12.2** Source code escrow | Source code is released if SLA is missed for **2 consecutive months** | Puts an SLA miss on the same level as bankruptcy or business abandonment |

These two clauses are on **pages 13 and 18** of a 20-page document. They are not in the summary or near the front. A tool that reads only the first 5 pages cannot find them.

</div>

<div class="info-box warning" markdown="1">

**Also check the scoring-table trap** — RFP body §7.1 says *Price 30 / Technical 45 / References 15 / ESG 10*, but the separate file `HAL_EvaluationCriteria.xlsx` says *Price 40 / Technical 35 / References 15 / ESG 10*. They are **different.**

This is intentional. Ask: *"Are the scoring weights in the RFP body the same as the scoring table file?"* If it points out the mismatch, it **compared two documents**.
</div>

<div class="info-box tip" markdown="1">

**If you need the rest, ask one by one** — *"Tell me only the submission schedule and D-day for this RFP"* / *"Only the required-documents checklist as a table."*
</div>

---

## 3-2. Draft a proposal deck

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 7</span>

### 📌 What is happening

Now you need to turn the analysis into a customer-facing proposal while following the brand guide and slide master.

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>6 PowerPoint slides</strong> — summary / pain points / proposal / expected outcomes / schedule / references</dd>

<dt>💡 Efficiency point</dt>
<dd>The previous analysis <strong>remains in the session.</strong> It does not need to be read again. If you reference the brand guide, you get a <strong>draft that also follows the format</strong>.</dd>

<dt>⚠️ What to check</dt>
<dd>Check whether it uses <strong>navy (#1B3A5C) and amber (#F2A900)</strong>, and avoids prohibited <strong>gradients and 3D charts</strong>.</dd>
</dl>

</div>

<div class="info-box tip" markdown="1">

**Fewer slides means less time** — 12–15 slides take minutes. 6 slides are enough to check structure and design. If you like it, say *"Expand it in the same style."*
</div>

<div class="prompt-box" markdown="1">

~~~text
Using the analysis you just made and the Aurora brand guide in 05_Templates,
create a 6-slide draft PPT proposal for Halcyon Energy.
One slide each: summary / Pain Point / proposal / expected outcomes / schedule / references. Keep text under 5 lines per slide.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- Were **6 slides** created?
- Were the brand colors applied?
- Were the **toxic clauses found earlier reflected** (as negotiation items)?

</div>

---

## 3-3. Translate contract SLA clauses into plain language

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 8 · Core</span>

### 📌 What is happening

You are renewing the Kestrel Logistics contract (USD 890,000 per year). **The delivery team does not read legal language.** Someone has to translate it.

<dl>
<dt>🎯 Expected output</dt>
<dd>A <strong>penalty table</strong> and <strong>breach-risk clauses flagged</strong> in chat</dd>

<dt>💡 Efficiency point</dt>
<dd>The real work is not translation but <strong>comparison</strong>. It must compare contract-required numbers with <strong>actual performance</strong>, and those two are in <strong>different documents in different folders</strong>.</dd>

<dt>⚠️ What to check</dt>
<dd>Check whether it finds the <strong>99.9% vs 99.82%</strong> conflict on its own. Those numbers are not in the prompt.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
From the Kestrel Logistics MSA renewal in 02_Contracts, summarize only the SLA penalty structure in plain language as a table.
Then compare it with our actual operational performance and flag any clauses we are currently at risk of breaching.
Do not create a Word document. Answer in chat.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check — The second highlight**

**① SLA conflict**

| Where | Number |
|---|---|
| `02_Contracts/KES_SLA_Appendix_A.docx` | **99.9%** availability commitment, **15%** monthly fee credit if missed |
| `03_Project_Northstar/NS_StatusReport_W-1.docx` | Quarterly actual availability **99.82%** |

**99.82% < 99.9%** — We are already in breach. The two numbers are in **different folders, different documents**, and neither mentions the other.

**② Notification-deadline contradiction**

| Where | Commitment |
|---|---|
| `KES_MSA_Renewal_v3.docx` §11.3 | Notify the customer of a breach within **24 hours** |
| `KES_VendorRisk_CobaltCloud.docx` | Subcontractor Cobalt Cloud notifies us within **72 hours** |

If the subcontractor tells us after 72 hours, we cannot notify the customer within 24 hours. It is a **physically impossible commitment**.

If ② does not appear — *"Compare the personal-data breach notification deadline with the subcontractor contract too."*

</div>

---

## What this step demonstrates

<div class="info-box tip" markdown="1">

**Consistent attention** — People cannot read page 18 of a 20-page contract with the same focus as page 1. A 4 PM contract review is not the same quality as a 10 AM review. Cowork has no such difference.

And people must remember both documents to think of comparing them. Cowork opens both and checks.
</div>

---

## What you verified in this step

- ✅ It reads a 20-page document **to the end** and finds toxic clauses near the back
- ✅ It detects **scoring inconsistency between two documents** by comparison
- ✅ It connects **two numbers in different folders** and points out a breach
- ✅ It carries analysis forward and repurposes it into another format (PPT)

Go to **[Step 4 — Incident response, finding the cause in one channel line]({{ '/en/chapters/cowork-lab-4-incident/' | relative_url }})**.
