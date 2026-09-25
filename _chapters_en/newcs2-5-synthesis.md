---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 2 · Synthesis & Checklist"
short_title: "Synthesis & Checklist"
description: "How the six elements interact in one request, recommended build order, and common pitfalls."
order: 5
category: "newcs"
parent: "ncs2"
---

## 7. Synthesis — how the six elements interact in one agent

<div class="info-box note" markdown="1">
**▶ Point** — The six elements are not independent parts; they are **materials consumed by the agentic loop (Part 1, Chapter 2)**. When you see how a single request passes through all six elements, the overall picture becomes clear.
</div>

### 7.1 Flow of one request (general form)

Example request: **"Analyze this data, turn the results into a report, and email it to the owner."**

```
[Instructions] Always-loaded rules: calculate accurately / send only after confirmation / follow skills for format
   ↓
[Knowledge]    Retrieve connected knowledge (data files and documents)
   ↓
[Skill]        Load analysis skill → "calculate accurately, organize as tables"
[Tool]         Aggregate the full dataset with code execution (not RAG, Part 1 9.4)
   ↓
[Skill]        Load writing skill → apply format and design rules (single source of truth)
[Tool]         Generate report → upload to storage → draft email + attach link
   ↓
[Instructions] "Confirm recipients + preview before sending" → user approval gate
[Tool]         Send email after approval
   ↓
[Memory]       Conversation is recorded in session memory (used for follow-up questions); persistent output storage is the file store
```

### 7.2 Full composition at a glance

| Request stage | Active elements | Part 1 basis |
|---|---|---|
| Apply rules | Instructions | Chapters 1–2 |
| Acquire data | Knowledge + code interpreter | 9.4 |
| Exact aggregation | Analysis skill | Chapter 3 |
| Produce format | Writing skill + storage tool | Chapters 3–4 |
| Send safely | Instructions HITL + email tool | 10.2 |
| Maintain context | Memory | 9.6 |

### 7.3 Recommended build order

1. Start with **instructions** — role, guardrails, and HITL in plain language (short).
2. Connect **knowledge** — upload Excel and Word to SharePoint and connect Knowledge.
3. Create **one core skill** — start with the most important one as a single file.
4. Keep **tools minimal** — code interpreter + only the MCP tools the scenario truly needs.
5. **Expand skills** — bundle resources (templates) where quality is needed.
6. Split into connected agents **when needed**.

> **FAQ response:** "Shouldn't we have everything ready from the start?" → **No (Part 1, 1.4).** Start with instructions + one skill + minimum tools, run it, and add tools, skills, or agents only where you get blocked. Tools and exception rules are usually best added **after encountering the problem**.

---

---

## Appendix. Build checklist & common pitfalls

### Build checklist

- [ ] Are the instructions short and focused on "what"? (No implementation details.)
- [ ] Are details such as colors and procedures in skills, not instructions? (Single source of truth.)
- [ ] Is there a confirmation gate for irreversible actions such as sending?
- [ ] Does each skill have `name` and `description` in YAML?
- [ ] Does the `description` contain clear trigger keywords?
- [ ] Is `SKILL.md` at the zip root? (Zip the folder contents.)
- [ ] Does the skill `name` use only lowercase letters, numbers, and hyphens? (No underscores or uppercase.)
- [ ] **Are core design rules and requirements written directly in the SKILL.md body?** (Resource files are not automatically injected.)
- [ ] Are tools minimal? (No overlapping tools, and no tools for what code can do.)
- [ ] Are numbers separated into Excel, and tone/format into Word?

### Common pitfalls

| Pitfall | Symptom | Fix |
|---|---|---|
| Zip structure error | "missing root-level SKILL.md" | Zip the **contents**, not the folder |
| Skill name rule violation | "Name must use only lowercase..." | `name` uses **only lowercase letters, numbers, and hyphens** (no underscores or uppercase) |
| Reuploading with the same name | Old skill still recognized even after delete/reupload (as of 2026-06-14) | Use a **new name (`-v2`)** for the revision, and confirm it appears in preview |
| Partial bundle upload (preview) | UI looks normal, but only YAML is injected → resources ignored | Personal developer environment limitation — **develop in Sandbox**, verify with the `app/skills` prompt |
| Details only in resources | Agent says "no guide" → designs on its own | Put core rules directly in the **SKILL.md body** (resources are not automatically injected) |
| Colors embedded in instructions | Skill bypassed → design rules ignored | Instructions should **point to the skill** |
| Gradient only | White email text is invisible | Use a **solid background** (`bgcolor`) behind white text |
| Direct attachment | Base64 token explosion and failure | Upload to OneDrive → **attach as a link** |
| Tool duplication | Tool-selection confusion | Use **only one** per purpose |
| Over-engineering | Heavy instructions and multiple agents | **Start simple** and expand when blocked |

---
