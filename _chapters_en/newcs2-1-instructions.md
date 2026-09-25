---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 2 · Instructions"
short_title: "Instructions"
description: "Always-loaded top-level rules — six principles, single source of truth, and confirmation gates."
order: 1
category: "newcs"
parent: "ncs2"
---

## 1. Instructions — the agent's constitution

<div class="info-box note" markdown="1">
**▶ Point** — Instructions are **top-level rules that are always loaded into context**. Therefore, they must be short, clear, and focused on "what." The most common mistakes are (1) over-engineering and (2) embedding details in instructions so the agent bypasses skills.
</div>

### 1.1 Concept — what are instructions?

- The top-level rules the agent **always references in every conversation**. In company terms, they are the constitution or work rules.
- Unlike skills, which are loaded when needed, instructions are **always on**, so the longer they are, the heavier every response becomes and the more diluted the core becomes (Part 1, 3.2 attention budget).
- Therefore, instructions should contain only **a small number of principles that must always be followed**, while situation-specific details should move down into skills.

### 1.2 How to write them — six principles

These are authoring principles validated while building this demo.

**① Write only the "what"; leave the "how" to the agent.**
The maker writes goals and rules in plain language, and leaves implementation such as code, libraries, and paths to the agent (Part 1, 1.4 golden rule).

```
❌ "Use pandas to read_excel the xlsx in /app/uploads, then aggregate with groupby and print"
✅ "For Excel numbers, do not estimate by eye; calculate the actual values and report accurate numbers"
```

**② Make them readable for general users.**
Most makers are not developers. Remove directories, function names, and jargon; write in business language.

**③ Single Source of Truth — do not embed details in instructions.**
If detailed rules such as brand colors are written in both instructions and skills, **the agent thinks "it's already in the instructions" and skips the skill.** Put design and procedures only in skills, and make the instructions **point to the skill**.

```
❌ Instructions: "Use ivory (#FBF6EC) for the background and magenta (#C2185B) for accents"
   → The agent knows only the colors and does not read the skill containing templates and solid-color fallback rules

✅ Instructions: "For emails and reports, follow the company design rules (email/report skill) exactly"
   → To know the colors, the agent must open the skill → it also follows the templates and rules
```

> This is a common failure. If colors are embedded in the instructions, the agent may look only at the colors and skip the skill (templates and exception-handling rules), causing the design to break in parts (case in 1.5).

**④ Use confirmation gates (HITL) for irreversible actions.**
For work that is hard to undo, such as sending email or transmitting externally, explicitly require **execution only after user confirmation** (Part 1, 10.2).

**⑤ State guardrails clearly in negative form.**
Write clear boundaries such as "do not invent numbers that are not in the data" and "do not send before approval."

**⑥ Structure: role → task-specific rules → guardrails.**
Use short sections so the instructions are easy to scan.

### 1.3 Good instruction structure (template)

```
# [Agent name] — Instructions

[One paragraph: role and what the agent helps with]

## When doing [Task A]
- Rules (what, in plain language)
- Point to the skill for details

## When doing [Task B] (mark as "Important" if irreversible)
- Confirmation gate, boundaries

## Rules to follow (guardrails)
- 3–5 always/never rules
```

### 1.4 What belongs in instructions vs what belongs in skills

This is the decision people get stuck on most often. The criterion is **"is it always needed, or only sometimes?"**

| Category | Instructions (always loaded) | Skills (loaded when needed) |
|---|---|---|
| Nature | Principles that apply to every conversation | Methods and formats for specific tasks |
| Length | Short (scannable) | Can be long (loaded only then) |
| Examples | Role, tone, guardrails, HITL rules | Analysis methods, report formats, design rules, special procedures |
| Change frequency | Rare | Frequent (formats and rules evolve) |

**What to include in instructions (a small set):**
- The agent's **role** and what it helps with
- Guardrails that must **always** be followed, such as not inventing numbers
- **Confirmation gates for irreversible actions** (approval before sending)
- For tasks that need detail, **a pointer saying "follow that skill"**

**What to remove from instructions (→ move to skills):**
- Specific output formats and templates
- Design values such as colors and fonts
- Step-by-step procedures and tool usage
- Implementation details such as code, libraries, and paths

> **Remember:** If instructions feel long, nine times out of ten they contain *how*—implementation or format. Move that part to a skill, and the instructions become light again. When doing the task, the agent opens the relevant skill and follows it more accurately.

### 1.5 Why a single source of truth matters — a broken design case

When details are duplicated in instructions, the agent may skip the skill and quality may break. A representative example is **HTML email design**.

- Symptom: the email header text (white) is invisible.
- Surface cause: the header background was painted only with a gradient (`linear-gradient`), so in email apps that do not support gradients (such as Outlook), the background disappears and only white text remains.
- Root cause: the color values were **embedded in the instructions**, so the agent did not open the skill's safety rule ("use a solid background behind white text").
- Lesson: If design had existed **only in the skill** and the instructions had said only "follow the skill," the agent would have opened the skill and applied the safety rule (`bgcolor` solid color) as well.

> **FAQ response:** "Isn't it more reliable to write everything in the instructions?" → **No.** The more you write, the more bloated the instructions become and the more diluted the core becomes (attention budget). It can also bypass skills and reduce quality. Instructions should point; details belong in skills.

---
