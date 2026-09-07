---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 3 — Afternoon: Finding Toxic Clauses in a 20-Page Contract"
short_title: "Step 3. Deep document analysis"
description: "Analyze a 20-page RFP, automatically create a proposal deck, and translate contract SLA language into plain English. Cowork finds toxic clauses buried deep in documents and conflicts across documents on its own."
order: 904
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "RFP analysis", "Contract review", "Document generation", "Hands-on"]
---

<div class="info-box note" markdown="1">

**▶ What you learn in this step** — What it means to read a document **all the way to the end**, and the ability to connect **a conflict between two numbers in different folders** without being told.
</div>

**It is now afternoon.** Two document tasks are waiting.

1. **Halcyon Energy RFP** — EUR 2.6M opportunity, due in 18 days. You still have not properly read the 20-page tender document.
2. **Kestrel Logistics contract renewal** — Legal sent a review request, and you need to rewrite it so the delivery team can understand it.

---

## 3-1. Deep RFP analysis — six items

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 6 · Core</span>

### 📌 What is the situation?

The tender document is 20 pages long, with clauses from §1 through §14. It also has a separate **evaluation scoring table** and **submission document checklist**.

The riskiest mistake in an RFP review is **reading only the beginning before starting the proposal**. Toxic clauses are always near the back.

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>HTML analysis report</strong> — Six sections covering business overview, timeline, evaluation scoring, favorable and unfavorable clauses, references, and submission documents, with <strong>original RFP clause-number citations</strong> for each item</dd>

<dt>💡 Efficiency point</dt>
<dd>If a person reads a 20-page legal document and extracts toxic clauses, it takes <strong>2–3 hours</strong>. Even then, they often miss the later sections as attention drops. Cowork reads to the end with <strong>consistent attention</strong>. Page 12 and page 18 get the same treatment.</dd>

<dt>⚠️ What to verify</dt>
<dd>Check whether <strong>§9.4 and §12.2</strong> are flagged as toxic clauses. These two clauses are <strong>intentionally buried</strong> near the back of the document (around pages 13 and 18).</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Analyze the Halcyon Energy Smart Grid Analytics RFP in the 01_RFP folder on SharePoint and create an HTML report covering:
① overall business information ② schedule/D-day ③ evaluation scoring ④ clauses that are favorable or unfavorable to us, including toxic clauses
⑤ similar project references ⑥ submission document checklist.
For each item, cite the clause number from the original RFP.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check — The highlight of this step**

If it identifies both clauses **with their clause numbers**, it is a success.

| Clause | Content | Why it is toxic |
|---|---|---|
| **§9.4** Limitation of liability | *"The supplier's liability for indirect, consequential, and economic damages is **unlimited**, with no aggregate cap"* | There is no liability cap. The contract value is EUR 2.6M, but damages are unlimited |
| **§12.2** Source code escrow | *"If the SLA is missed for **two consecutive months**, the source code is released"* | An SLA miss is treated on the same level as bankruptcy or business abandonment |

**Why this is hard** — These two clauses are on **pages 13 and 18** of a 20-page document. They are not mentioned in the summary or anywhere near the beginning. A tool that reads only the first five pages will never find them.
</div>

<div class="info-box warning" markdown="1">

**Check the scoring-table trap too** — RFP body §7.1 says *Price 30 / Technical 45 / References 15 / ESG 10*, but the separate file `HAL_EvaluationCriteria.xlsx` says *Price 40 / Technical 35 / References 15 / ESG 10*. They are **different.**

This is not an error; it is an **intentional trap**. It reproduces a common situation in real bids: scoring changed through an addendum, but the body text was not updated. If Cowork points out this inconsistency, it means it **compared two documents**.

If it does not point it out, ask this: *"Are the scoring weights in the RFP body the same as the scoring table file?"*
</div>

---

## 3-2. Create a proposal deck from the analysis

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 7</span>

### 📌 What is the situation?

The analysis is complete. Now you need to turn it into a **customer-oriented proposal**, while following the company brand guide and slide master.

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>12–15 PowerPoint slides</strong> — Executive summary / customer pain points / proposed architecture / expected outcomes / implementation timeline / references</dd>

<dt>💡 Efficiency point</dt>
<dd>The analysis from the previous step <strong>remains in the session.</strong> Cowork does not need to read it again. If you also reference the brand guide (colors, fonts, restrictions) and template, you get a <strong>draft that follows the required format</strong>.</dd>

<dt>⚠️ What to verify</dt>
<dd>Check whether the slides use <strong>navy (#1B3A5C) and amber (#F2A900)</strong>, and whether they avoid the <strong>gradient backgrounds and 3D charts</strong> prohibited by the brand guide.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Using the RFP analysis you just created and the Aurora brand guide and slide master in the 05_Templates folder,
create a draft proposal deck for Halcyon Energy as a PowerPoint file.
Structure: executive summary / customer pain points / proposed architecture / expected outcomes / implementation timeline / references
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check**

- Were **12–15 slides** created?
- Were the brand colors applied?
- Were the **toxic clauses found in the previous step reflected in the proposal** (as response strategies or negotiation items)?
</div>

---

## 3-3. Translate contract SLA clauses into plain language

<div class="scenario" markdown="1">

<span class="scenario-tag">Scenario 8 · Core</span>

### 📌 What is the situation?

You are negotiating the renewal of the Kestrel Logistics contract (USD 890,000 per year). Legal sent a reviewed draft, but **the delivery team does not read legal language.** Someone needs to translate it.

<dl>
<dt>🎯 Expected output</dt>
<dd><strong>Word summary</strong> — Key operational requirements, <strong>penalty structure table</strong>, privacy clauses, and <strong>separately flagged clauses with breach risk</strong></dd>

<dt>💡 Efficiency point</dt>
<dd>The real work Cowork must do here is not translation, but <strong>comparison</strong>. It must compare the numbers required by the contract with <strong>the numbers we are actually delivering</strong>, and those two sources are in <strong>different documents in different folders</strong>.</dd>

<dt>⚠️ What to verify</dt>
<dd>Check whether it finds the <strong>conflict between 99.9% and 99.82%</strong> on its own. Neither number appears in the prompt.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
Analyze the Kestrel Logistics MSA renewal draft in the 02_Contracts folder and summarize
the key operational requirements, SLA penalty structure, and data privacy clauses
in plain language that the delivery team can immediately understand.
Put the penalties in a table, and separately flag any clauses that we are actually at risk of breaching.
~~~

</div>

<div class="expect" markdown="1">

**✅ Result check — The second highlight**

**① Did it find the SLA conflict?**

| Where | Number |
|---|---|
| `02_Contracts/KES_SLA_Appendix_A.docx` | Availability commitment of **99.9%**, **15%** monthly fee credit if missed, and **no annual cap** |
| `03_Project_Northstar/NS_StatusReport_W-1.docx` | Quarterly actual availability of **99.82%** |

**99.82% < 99.9%** — We are already in breach. The two numbers are in **different folders, different documents, and different project contexts**, and neither document mentions the other. If Cowork connects them, it means it **read and compared both documents**.

**② Did it also find the notification deadline contradiction?**

| Where | Commitment |
|---|---|
| `KES_MSA_Renewal_v3.docx` §11.3 | Notify the customer of a breach within **24 hours** |
| `KES_VendorRisk_CobaltCloud.docx` | Subcontractor Cobalt Cloud notifies us within **72 hours** |

If the subcontractor tells us after 72 hours, there is no way for us to notify the customer within 24 hours. It is a **physically impossible commitment**.

If it does not find both, ask this: *"Compare these SLA numbers against our actual operational performance."*
</div>

---

## What this step demonstrates

<div class="info-box tip" markdown="1">

**The value of consistent attention** — People cannot read page 18 of a 20-page contract with the same focus as page 1. A contract review at 4 PM is not the same quality as one at 10 AM. Cowork does not have that difference.

And for a person to think, **"I should compare this number with another document,"** they have to remember both documents. Cowork opens and reviews both.
</div>

---

## What you verified in this step

- ✅ It reads a 20-page document **all the way to the end** and finds toxic clauses near the back
- ✅ It detects **inconsistent scoring between two documents** through comparison
- ✅ It connects **two numbers in different folders** and points out a contract breach
- ✅ It carries the analysis forward **as-is** and repurposes it into another format (PPT)

Go to **[Step 4 — Incident response: finding the cause in one channel line]({{ '/en/chapters/cowork-lab-4-incident/' | relative_url }})**.
