---
layout: chapter
lang: en
date: 2026-09-05
title: "Step 0 — Prepare the lab environment (for admins)"
short_title: "Step 0. Prerequisites"
description: "Five things admins must do before the lab starts: assign credits and PAYG, upload sample files, provide OneDrive deployment instructions, place SharePoint content, and seed Teams channel conversations"
order: 901
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "Admin", "PAYG", "SharePoint", "OneDrive"]
---

<div class="info-box warning" markdown="1">

**This page is for admins** — These are tasks that the **admin preparing the lab**, not the lab participants, must complete in advance. It takes about 20 minutes. If you skip this step, participants will get stuck immediately in Step 1.
</div>

---

## Five preparation tasks

| # | Task | Owner | Time |
|---|---|---|---|
| 1 | **Assign credits and PAYG** in the cost management center | Copilot admin | 10 min |
| 2 | **Upload sample files** so participants can download them | Admin | 5 min |
| 3 | **Provide OneDrive file deployment instructions** — participants must upload them themselves | Admin → participants | Instructions only |
| 4 | **Place SharePoint documents in the lab site/Teams channel** | Admin | 5 min |
| 5 | **Inject seeded Teams channel conversations** — the answer for Step 4 is here | Admin | 10 min |

---

## 1. Assign credits and usage-based billing

Copilot Cowork uses **credits consumed per agent execution**. A license alone is not enough. If usage is not assigned to the lab group, participants will enter a prompt and be stopped by **"You have exceeded your usage limit."**

### 1-1. Enable usage-based billing (PAYG)

<ul class="checklist">
<li>Go to the <a href="https://admin.microsoft.com/" target="_blank">Microsoft 365 admin center</a> → <strong>Billing</strong> → <strong>Usage-based services</strong></li>
<li>Under <strong>Copilot Credits</strong>, <strong>connect an Azure subscription</strong> — credit consumption will be charged to this subscription</li>
<li>Select or create the <strong>resource group</strong> to connect (for example, <code>rg-copilot-cowork-lab</code>)</li>
<li>Confirm that the status changes to <strong>Active</strong></li>
</ul>

<div class="info-box note" markdown="1">

**Why an Azure subscription is required** — Unlike interactive chat included with a license, Cowork agent executions are **billed in proportion to execution volume**. You can use prepaid credit packs or bill overages through usage-based billing. For this lab, the latter is easier to manage.
</div>

### 1-2. Assign credits to the lab group

If you leave this open company-wide, consumption unrelated to the lab gets mixed in and cost tracking becomes difficult. Create a **security group that contains only lab participants** and assign usage only to that group.

<ul class="checklist">
<li>Create a security group in Entra ID — for example, <code>Cowork-Lab-Participants</code></li>
<li>Add the lab participant accounts to the group</li>
<li>Go to admin center → <strong>Settings</strong> → <strong>Copilot</strong> → <strong>Agent and credits management</strong></li>
<li>Set the Cowork access scope to <strong>Selected groups</strong> and select the group above</li>
<li>Set a <strong>monthly credit cap</strong> per group (you can be generous for one lab run per participant)</li>
</ul>

### 1-3. Enable Anthropic models

Cowork depends on Anthropic models. **If this is turned off, the Cowork tab itself will not appear.**

<ul class="checklist">
<li>Go to admin center → <strong>Settings</strong> → <strong>Org settings</strong> → <strong>Copilot</strong></li>
<li>Turn on <strong>Anthropic model usage</strong> and agree to the subprocessor terms</li>
<li>Sign in with a participant account at <a href="https://m365.cloud.microsoft/chat/" target="_blank">m365.cloud.microsoft/chat</a> and confirm that the <strong>Cowork</strong> tab is visible</li>
</ul>

<div class="info-box warning" markdown="1">

**Propagation takes time** — License, model, and credit settings may not apply immediately. Finish this **at least one day before the lab**, and run one real prompt with a lab account. If you configure it on the morning of the lab, you may spend 30 minutes answering "Why can't I see it?"
</div>

---

## 2. Upload sample files so participants can download them

The lab uses **30 files**: 24 in SharePoint and 6 in OneDrive.

| Folder | File count | Contents |
|---|---|---|
| `01_RFP` | 3 | Halcyon Energy RFP documents (20 pages), evaluation scoring sheet, submission checklist |
| `02_Contracts` | 3 | Kestrel MSA renewal, SLA appendix, vendor risk |
| `03_Project_Northstar` | 6 | Weekly status report, meeting notes, three-option comparison, rollout tracker, architecture deck, customer QBR deck |
| `04_Incidents_INC-4471` | 3 | Engineering notes, metrics workbook, customer notification history |
| `05_Templates` | 3 | Brand guide, slide master, proposal template |
| `06_Policies` | 3 | Information security, privacy, travel and expense policies |
| `07_Onboarding` | 3 | Team charter, job description, required reading list |
| `OneDrive_Ava` | 6 | Ava's personal working files (4 drafts + 2 blank files) |

### 2-1. Upload to the distribution location

Participants must be able to **download** the files, so place the source files somewhere with read access.

<ul class="checklist">
<li>Create a SharePoint site for the lab — for example, <code>/sites/Cowork-demo</code></li>
<li>Upload all 30 files to the document library with the <strong>folder structure unchanged</strong> (preserving subfolders is important)</li>
<li>Grant the lab group at least <strong>read</strong> permission to the site</li>
<li>Announce the site URL to participants</li>
</ul>

<div class="info-box tip" markdown="1">

**Do not rename folders** — The lab prompts **directly reference** folder names such as `01_RFP` and `04_Incidents_INC-4471`. If you rename them, Cowork cannot find the files.
</div>

---

## 3. OneDrive files — participants must upload these themselves

<div class="info-box warning" markdown="1">

**Admins must explicitly tell participants this part** — SharePoint files are uploaded once by the admin and shared with everyone. But **each participant must upload the six OneDrive files to their own OneDrive**. If this instruction is missed, participants will get "file not found" responses in Step 3 and Step 4.
</div>

### Why each person must upload them

In the scenario, these six files are **"Ava's personal working files."** They are drafts that have not been shared with others, and the lab uses them to show that Cowork *"distinguishes between shared documents and my personal drafts."* If the files are in the admin's OneDrive, participant accounts cannot see them.

### Participant instructions (copy and announce as-is)

<div class="prompt-box" data-label="Message to send to participants" markdown="1">

~~~text
[Copilot Cowork lab preparation — takes 5 minutes]

Before the lab starts, please complete the steps below. If you do not, you will get stuck during the lab.

1. Open the lab materials site.
   → (SharePoint site URL announced by the admin)

2. Download all six files from the OneDrive_Ava folder.
   - Halcyon_pricing_scratch.xlsx
   - QBR_talking_points.docx
   - Q3_forecast_working.xlsx
   - Solstice_save_plan_draft.docx
   - Alex_Chen_30-60-90_draft.docx
   - Meridian_RCA_outline.docx

3. Open your OneDrive and create a folder at this path.
   My files > Documents > Cowork-demo > OneDrive_Ava

4. Upload the six downloaded files to that folder.

5. Check: if you can see all six files in OneDrive, you are ready.

Note - The last two files (Alex_Chen_30-60-90_draft.docx,
Meridian_RCA_outline.docx) have titles only and their contents are blank.
They are not broken files; Cowork will fill them in during the lab.
~~~

</div>

<ul class="checklist">
<li>Announce the message above by email or in a Teams channel <strong>at least one day before the lab</strong></li>
<li>Right after the lab starts, ask once more: "Has everyone uploaded the OneDrive files?"</li>
<li>Keep the download link visible on screen for participants who have not done it yet</li>
</ul>

---

## 4. Place SharePoint documents in the lab site or Teams channel

For Cowork to find documents, they must be in a **SharePoint location accessible from participant accounts**. Choose one of the following two methods.

### Method A — Dedicated SharePoint site (recommended)

<ul class="checklist">
<li>Create a site in the SharePoint admin center or Teams — for example, <code>Cowork-demo</code></li>
<li>Upload 7 folders + 24 files to the default document library (<code>Documents</code>)</li>
<li>Add the lab group as site members (or grant org-wide read access)</li>
<li>Sign in with one participant account and confirm that the files <strong>actually open</strong></li>
</ul>

**Advantage** — The structure is clean, and cleanup is complete when you delete the entire site after the lab.

### Method B — Files tab in an existing Teams channel

<ul class="checklist">
<li>Create a Teams team/channel for the lab or use an existing channel</li>
<li>Upload the folder structure unchanged from the channel's <strong>Files</strong> tab</li>
<li>Add participants as team members</li>
</ul>

**Advantage** — Access feels natural because participants are already in Teams, and you can receive questions in the same channel during the lab.
**Caution** — Private channels use separate sites, so check permissions again.

---

## 5. Seeded Teams channel conversations — the answer for Step 4 is here

<div class="info-box warning" markdown="1">

**If you only upload files, Step 4 falls apart** — The highlight of Step 4 is that Cowork finds the incident cause from **one Teams channel message**. That sentence does not exist in any document or email. Without the channel conversation, participants receive an "unknown cause" answer, and the most impressive moment in the entire lab disappears.
</div>

### 5-1. What you need to create

You need **2 teams**, **6 channels**, and **58 messages**.

| Team | Channel | Messages | Role |
|---|---|---|---|
| Aurora Delivery | `INC-4471 War Room` | 18 | ⭐ **The one-line root cause exists only here** |
| Aurora Delivery | `Project Northstar` | 22 | Context for risks, milestones, and QBR preparation |
| Aurora Delivery | `General` | 2 | Announcement-style noise |
| Aurora Revenue | `Halcyon RFP Bid Team` | 14 | Poison-pill clauses §9.4 and §12.2 |
| Aurora Revenue | `Solution Engineering` | 1 | Mentions a new hire |
| Aurora Revenue | `Announcements` | 1 | Product launch announcement |

Senders must be scenario persona accounts (Ava, Marcus, Priya, Tom, Sofia, Noah, and so on). **It must not look like one account wrote everything** — the moment where Cowork cites "who said what" is what makes this lab convincing.

### 5-2. The one line that must be included

In the `INC-4471 War Room` channel, at 04:47 on the incident day, sent by **Marcus Bello**.

<div class="prompt-box" data-label="This message is the answer for the lab" markdown="1">

~~~text
Found it. The queue consumer scale-out threshold is pinned at 8 in the
production config. It was set as a temporary ceiling during the load test
in Q1 and never reverted, so the autoscaler physically cannot go past 8
consumers no matter what the queue depth is. Nothing was broken.
The ceiling was just too low for the new volume.
~~~

</div>

You also need the **two threaded replies** that follow this sentence (Priya and Marcus) to complete the causal story that this was a dormant issue.

### 5-3. Injection methods

<ul class="checklist">
<li><strong>Recommended — Graph migration API</strong>: With the <code>Teamwork.Migrate.All</code> application permission, create teams/channels in <em>migration mode</em> so you can preserve the <strong>original sender and original timestamp</strong>. This creates a war room that follows a realistic timeline from 02:12 to 06:22</li>
<li>After injection is complete, call <code>completeMigration</code> in channel → team order so the team becomes normal. <strong>Do not miss the <code>General</code> channel even if it has no messages</strong> — if even one remains, team migration fails</li>
<li>Finally, add the lab accounts as <strong>team owners</strong>. If they are not members, Cowork cannot read the channels</li>
<li><strong>Alternative — manual entry</strong>: Sign in with each persona account and paste at least the 18 war-room messages manually. The timestamp will be today, but Step 4 will still work</li>
</ul>

<div class="info-box note" markdown="1">

**Seed on the lab day** — The migration API **rejects future timestamps**. If you seed earlier than the scenario reference day (D0), messages from the most recent few days will be compressed around the seeding time. To keep the conversation naturally distributed, it is best to **inject it on the morning of the lab**.
</div>

---

## Readiness checklist

Before the lab starts, verify the following **directly with one participant account**. Permission problems do not appear when using an admin account.

<ul class="checklist">
<li>The <strong>Cowork</strong> tab is visible in Copilot</li>
<li>Any prompt in Cowork runs without a credit error</li>
<li>The SharePoint lab site opens and shows 7 folders</li>
<li>You can open documents inside <code>01_RFP</code></li>
<li>Your OneDrive contains six files in <code>Cowork-demo/OneDrive_Ava</code></li>
<li>Teams shows the <code>INC-4471 War Room</code> channel, with 18 conversation messages under <strong>multiple people's names</strong></li>
</ul>

If all six pass, go to **[Step 1 — Morning 08:30]({{ '/en/chapters/cowork-lab-1-morning/' | relative_url }})**.

---

## Common issues

| Symptom | Cause | Fix |
|---|---|---|
| Cowork tab is not visible | Anthropic models not enabled or not in Frontier | Check 1-3; propagation can take several hours |
| "Usage limit exceeded" | PAYG not connected or credits not assigned to the group | Check 1-1 and 1-2 |
| "Cannot find file" | Folder name changed or participants lack permissions | Restore folder names and check lab group permissions |
| Only OneDrive files cannot be found | Participant did not complete section 3 | Re-announce the instructions |
| Blank document opens | Expected behavior | Cowork will fill the file during the lab |
| Incident cause cannot be found | Teams channel seed data is missing | Check section 5 — there must be 18 messages in `INC-4471 War Room` |
| Channel conversation is all under the same person | Entered in bulk with the admin account | Send from each persona account or use the migration API |
| Team migration fails | `General` channel remains in migration state | Call `completeMigration` even for channels with no messages |
