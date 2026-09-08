---
layout: chapter
lang: en
date: 2026-09-05
title: "Cowork Lab — Following a Day at Aurora Dynamics"
short_title: "Cowork Lab (Sample Data)"
description: "A seven-step lab using sample data from the fictional company Aurora Dynamics. Copy short prompts with one button and paste them right away."
order: 20
category: cowork
parent: "cowork-lab"
is_parent: true
tags: ["Copilot Cowork", "Hands-on", "Sample data", "Lab guide"]
---

<div class="info-box note" markdown="1">

**▶ One-line summary** — Seed a tenant with 30 emails, calendar items, Teams messages, and documents from the fictional company **Aurora Dynamics**, then follow **Ava Nakamura's day** as a sales rep and delegate work to Cowork.
</div>

---

## Why this lab is different

The data is **intentionally scattered.** To find the answer, Cowork must read email, Teams, and SharePoint separately and connect them on its own.

| Seeded fact | Where it exists | Step where it appears |
|---|---|---|
| The true cause of the incident | **One line** in a Teams war-room conversation | Step 4 |
| Two toxic contract clauses | RFP **pages 13 and 18** | Step 3 |
| Conflict between promised SLA and actual performance | **Two documents in different folders** | Step 3 |
| Double-booked calendar | Two calendar events | Step 5 |

You cannot find these by skimming only the beginning. **The moment Cowork surfaces them** is the highlight.

---

## Fictional world setup

<div class="info-box warning" markdown="1">

**Everything is fictional** — All companies, people, events, and numbers are invented. External domains use the reserved TLD (`.example`).
</div>

**Aurora Dynamics** — A Singapore-based industrial IoT predictive maintenance SaaS company (1,240 employees). Flagship product: **Aurora Sentinel**.

| Role | Person | Purpose |
|---|---|---|
| **Main character** | **Ava Nakamura** — Enterprise AE | Login account. Owner of all data |
| Manager | Lena Hoffmann — VP Sales | Executive reporting |
| Technical | Marcus Bello — SE | RFP technical section |
| Delivery | Priya Raman — Delivery Manager | Project risk |
| Support | Tom Okafor — Incident Commander | Incident response |
| Legal | Noah Lindqvist — Legal Counsel | Contract review |
| New hire | Alex Chen — Starts next week | Onboarding |

**Customers** — Meridian Bank (largest account) · Halcyon Energy (RFP) · Kestrel Logistics (renewal negotiation) · Solstice Retail (renewal risk)

**In progress** — Project Northstar (USD 4.2M, 1,870 of 3,200 devices) · Halcyon RFP (EUR 2.6M, D-18) · INC-4471 incident (six days ago)

---

## Lab structure — Ava's day

<p class="steps-note">Each step can be run independently, but in sequence, earlier outputs become later inputs.</p>

| Step | Timing | What you do | Duration |
|---|---|---|---|
| **[Step 0 — Setup]({{ '/en/chapters/cowork-lab-0-setup/' | relative_url }})** | Before the lab | Allocate credits, deploy samples | Admin 20 min |
| **[Step 1 — Morning]({{ '/en/chapters/cowork-lab-1-morning/' | relative_url }})** | 08:30 | Email triage, priorities, unanswered replies | 6 min |
| **[Step 2 — Before the meeting]({{ '/en/chapters/cowork-lab-2-briefing/' | relative_url }})** | 13:30 | Briefing from multiple sources | 5 min |
| **[Step 3 — Afternoon]({{ '/en/chapters/cowork-lab-3-documents/' | relative_url }})** | Document work | RFP analysis → deck → contract review | 12 min |
| **[Step 4 — Incident response]({{ '/en/chapters/cowork-lab-4-incident/' | relative_url }})** | Follow-up | Cross-check 3 sources, post-incident report | 10 min |
| **[Step 5 — Weekly wrap-up]({{ '/en/chapters/cowork-lab-5-weekly/' | relative_url }})** | Friday | Calendar cleanup, onboarding | 8 min |
| **[Step 6 — Automation]({{ '/en/chapters/cowork-lab-6-automation/' | relative_url }})** | Wrap-up | Scheduled runs, triggers, governance | 6 min |

**Total time** — About **45 minutes**, excluding setup. If short on time, Steps 2 · 3 · 4 still deliver the core.

---

## Principles for fast results

These prompts are designed for **speed first**. Four rules keep demos from waiting minutes.

| Principle | Why |
|---|---|
| **One thing at a time** | Three requests take roughly three times longer |
| **Chat answers over files** | HTML, PPT, and Excel generation is slowest |
| **Set numeric limits** | Put caps like "recent 20 emails" and "top 3" |
| **Name the source** | Folders and channels remove the search step |

<div class="info-box tip" markdown="1">

**Ask follow-ups when you need depth** — Each step includes a *"to go deeper"* prompt. Get a short answer first, then expand only when needed.
</div>

---

## How to run the lab

Each step repeats the same format.

1. **📌 Scenario** — Current situation
2. **🎯 Expected output** — What Cowork should produce
3. **💡 Efficiency point** — Where time is saved
4. **💬 Prompt** — Copy with the button → paste
5. **✅ What to verify** — Success criteria

<div class="info-box tip" markdown="1">

**Use the copy button** — Click **Copy prompt** below each prompt and paste into Cowork with `Ctrl+V`.
</div>

---

## Before you start

<ul class="checklist">
<li>Do you have a <strong>Microsoft 365 Copilot license</strong>?</li>
<li>Has an admin <strong>enabled Anthropic models</strong>?</li>
<li>Is the tenant in the <strong>Microsoft 365 Frontier preview</strong>?</li>
<li>Have <strong>PAYG and credits</strong> been assigned? → <a href="{{ '/en/chapters/cowork-lab-0-setup/' | relative_url }}">Step 0</a></li>
<li>Has the <strong>sample data</strong> been deployed to SharePoint and OneDrive? → <a href="{{ '/en/chapters/cowork-lab-0-setup/' | relative_url }}">Step 0</a></li>
</ul>

When ready, go to **[Step 0 — Prepare the lab environment]({{ '/en/chapters/cowork-lab-0-setup/' | relative_url }})**.

---

## References

- 📖 [Copilot Cowork overview — Microsoft Learn](https://learn.microsoft.com/copilot/microsoft-365/cowork/)
- 📖 [Get started with Copilot Cowork](https://learn.microsoft.com/copilot/microsoft-365/cowork/get-started)
- 🚀 [Microsoft 365 Copilot Frontier program](https://adoption.microsoft.com/copilot/frontier-program/)
- 🧩 [Cowork Collective missions]({{ '/en/chapters/cowork0-overview/' | relative_url }}) — Shorter single-scenario labs
