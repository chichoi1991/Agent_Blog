---
layout: chapter
lang: en
date: 2026-09-05
title: "Cowork Lab — Following a Day at Aurora Dynamics"
short_title: "Cowork Lab (Sample Data)"
description: "A seven-step lab that lets you experience Copilot Cowork end to end with sample data from the fictional company Aurora Dynamics. Copy prompts with one button and paste them right away."
order: 20
category: cowork
parent: "cowork-lab"
is_parent: true
tags: ["Copilot Cowork", "Hands-on", "Sample data", "Lab guide"]
---

<div class="info-box note" markdown="1">

**▶ One-line summary** — You can show the real value of Copilot Cowork without any real company data. This lab seeds a tenant with 30 emails, calendar items, Teams messages, and documents from a fictional company called **Aurora Dynamics**, then follows **a day in the life of Ava Nakamura**, a sales representative, as you delegate real work to Cowork.
</div>

---

## Why this lab is different

Typical demos stop at "upload one file and summarize it." That is a summarization tool, not an agent.

The data in this lab is **intentionally scattered.** To find the answers, Cowork must **read emails, Teams channels, and SharePoint documents separately and connect them on its own.** For example, the dataset includes facts like these.

| Seeded fact | Where it exists | Step where it appears |
|---|---|---|
| The true cause of the incident | **One line** in a Teams war-room conversation | Step 4 |
| Two toxic contract clauses | RFP document, **pages 13 and 18** | Step 3 |
| Conflict between the promised SLA and actual performance | **Two documents in different folders** | Step 3 |
| Double-booked calendar | Two calendar events | Step 5 |

You cannot find these by skimming only the beginning or reading a single file. The highlight of this lab is **the moment Cowork discovers these connections by itself.**

---

## Fictional world setup

<div class="info-box warning" markdown="1">

**Everything is fictional** — All companies, people, events, and numbers that appear here are invented. No real customer names or internal data are included. External domains use the RFC 2606 reserved TLD (`.example`).
</div>

**Aurora Dynamics** — A Singapore-headquartered industrial IoT predictive maintenance SaaS company (1,240 employees)
Flagship product: **Aurora Sentinel** · Slogan: *"See the failure before it happens."*

| Role | Person | Purpose in the lab |
|---|---|---|
| **Main character** | **Ava Nakamura** — Enterprise Account Executive | The account you sign in with. Owner of all emails, calendar events, and Teams activity |
| Manager | Lena Hoffmann — VP Sales | Requests executive reporting |
| Technical | Marcus Bello — Solution Engineer | RFP technical section |
| Delivery | Priya Raman — Delivery Manager | Project status and risks |
| Support | Tom Okafor — Incident Commander | Incident response |
| Legal | Noah Lindqvist — Legal Counsel | Contract review |
| New hire | Alex Chen — Starts next Monday | Onboarding scenario |

**Customers** — Meridian Bank (largest account, deployment in progress) · Halcyon Energy (issued the RFP) · Kestrel Logistics (contract renewal negotiation) · Solstice Retail (renewal at risk)

**Work in progress** — Project Northstar (USD 4.2M, 1,870 of 3,200 devices across 14 countries completed) · Halcyon RFP (EUR 2.6M, due in 18 days) · INC-4471 incident (occurred six days ago, post-incident report needed)

---

## Lab structure — Ava's day

<p class="steps-note">Each step can be completed independently, but if you follow the sequence, outputs from earlier steps become input for later steps.</p>

| Step | Timing | What you do | Duration |
|---|---|---|---|
| **[Step 0 — Setup]({{ '/en/chapters/cowork-lab-0-setup/' | relative_url }})** | Before the lab | Allocate credits and deploy sample files | Admin: 20 min |
| **[Step 1 — Morning 08:30]({{ '/en/chapters/cowork-lab-1-morning/' | relative_url }})** | Right after starting work | Email triage, prioritization, reply tracking | 10 min |
| **[Step 2 — Before the meeting 13:30]({{ '/en/chapters/cowork-lab-2-briefing/' | relative_url }})** | 30 minutes before the QBR | Meeting briefing synthesized from six sources | 8 min |
| **[Step 3 — Afternoon]({{ '/en/chapters/cowork-lab-3-documents/' | relative_url }})** | Document work | Deep RFP analysis → proposal deck → contract review | 20 min |
| **[Step 4 — Incident response]({{ '/en/chapters/cowork-lab-4-incident/' | relative_url }})** | Post-incident follow-up | Cross-check three sources and create a communication package | 15 min |
| **[Step 5 — Weekly wrap-up]({{ '/en/chapters/cowork-lab-5-weekly/' | relative_url }})** | Friday | Calendar cleanup and new-hire onboarding | 12 min |
| **[Step 6 — Automation]({{ '/en/chapters/cowork-lab-6-automation/' | relative_url }})** | Wrap-up | Scheduled runs, event triggers, governance | 8 min |

**Total time** — About **75 minutes**, excluding setup. If you are short on time, Steps 2, 3, and 4 still deliver the core experience.

---

## How to run the lab

Each step repeats the following format.

1. **📌 Scenario** — What situation you are in and how long it would take manually
2. **🎯 Expected output** — What Cowork will produce
3. **💡 Efficiency point** — Where time is saved and why it is hard for one person alone
4. **💬 Prompt** — Click the large button to copy, then paste into Cowork
5. **✅ What to verify** — Criteria for judging whether the result is correct

<div class="info-box tip" markdown="1">

**Use the copy button for prompts** — Each prompt has a **Copy prompt** button below it. Click it to copy the prompt to the clipboard, then paste it into the Cowork input box with `Ctrl+V`. You do not need to type it manually.
</div>

---

## Before you start

<ul class="checklist">
<li>Do you have a <strong>Microsoft 365 Copilot license</strong>?</li>
<li>Has an admin <strong>enabled Anthropic models</strong>? (Cowork depends on this model.)</li>
<li>Is the tenant participating in the <strong>Microsoft 365 Frontier preview</strong>?</li>
<li>Has an admin assigned <strong>pay-as-you-go (PAYG) billing and credits</strong>? → <a href="{{ '/en/chapters/cowork-lab-0-setup/' | relative_url }}">Step 0</a></li>
<li>Has the <strong>sample data</strong> been deployed to SharePoint and OneDrive? → <a href="{{ '/en/chapters/cowork-lab-0-setup/' | relative_url }}">Step 0</a></li>
</ul>

When setup is complete, go to **[Step 0 — Prepare the lab environment]({{ '/en/chapters/cowork-lab-0-setup/' | relative_url }})**.

---

## References

- 📖 [Copilot Cowork overview — Microsoft Learn](https://learn.microsoft.com/copilot/microsoft-365/cowork/)
- 📖 [Get started with Copilot Cowork](https://learn.microsoft.com/copilot/microsoft-365/cowork/get-started)
- 🚀 [Microsoft 365 Copilot Frontier program](https://adoption.microsoft.com/copilot/frontier-program/)
- 🧩 [Cowork Collective mission collection]({{ '/en/chapters/cowork0-overview/' | relative_url }}) — Shorter single-scenario labs
