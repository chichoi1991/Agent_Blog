---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 2 · Skills"
short_title: "Skills"
description: "Load-on-demand instruction packages — SKILL.md format, packaging, and preview pitfalls."
order: 2
category: "newcs"
parent: "ncs2"
---

## 2. Skills — load-on-demand instruction packages

<div class="info-box note" markdown="1">
**▶ Point** — A skill is a reusable asset that records "how to do X" in one markdown file (+ optional resources) and is **loaded only when needed** (Part 1, Chapter 3). The keys to using skills effectively are (1) start simple, (2) encode what the model cannot do alone, and (3) use the `description` well as a trigger.
</div>

### 2.1 Concept — what is a skill?

- **A reusable bundle of markdown instructions.** It is not in the context by default; it is **loaded on demand** when that work is needed (Part 1, 3.1).
- Once created, it can be reused by multiple agents. GitHub Copilot and Claude skills can also be imported (industry-compatible, Part 1, 3.3).
- Effect: instructions stay light and clean at all times = just-in-time context (Part 1, 3.2).

### 2.2 SKILL.md structure — required format

A skill zip must have **`SKILL.md` at the root**, and that file must contain **`name` and `description` in YAML front matter**.

```markdown
---
name: excel-analysis
description: Use when analyzing sales Excel data. Calculate exact values
  instead of estimating by eye, and organize results in tables. For requests involving "analysis, aggregation, average, ranking, trend."
---

# Sales data analysis rules

## When to use
[Situations that trigger this skill]

## Rules
[Core principles to follow — what to do, in plain language]

## Examples
[Common usage examples]
```

| Part | Role | Authoring tip |
|---|---|---|
| `name` | Skill identifier | Short English slug |
| `description` | **Trigger for when to load it** | "Use when ~" + core keywords |
| Body | Actual instructions | when-to-use → rules → examples |

> **Remember:** `description` is the most important part. The orchestrator looks at this one line and decides whether to "pull out this skill now." Include **use situations + trigger keywords** clearly so it loads at the right time.
>
> - ❌ Vague: "data helper" → does not know when to use it → not called
> - ✅ Clear: "Use when analyzing sales Excel. For requests involving 'analysis, aggregation, average, ranking, trend.'" → trigger is clear

### 2.3 How to use skills effectively — three principles

**① Start simple (Part 1, 1.4).**
Do not build a huge skill from the start. **Start with a single SKILL.md file** and add resources only when needed. Skills usually grow through these three stages.

| Stage | Composition | When |
|---|---|---|
| Stage 1 | **One SKILL.md file** | When rules and format are enough |
| Stage 2 | SKILL.md + supporting explanation document | When terminology or context needs explanation |
| Stage 3 | SKILL.md + templates and resources | When output quality must be fixed (Skills with resources, Part 1, 3.4) |

Most skills can start at Stage 1. Add resources only where quality requires them.

**② Encode "what the model cannot do alone."**
The essence of a skill is to record **knowledge the agent cannot solve on its own**. For example, attaching a large file to an email:

```
Problem: attach a large HTML file directly to email → converting the file to Base64 causes token explosion → failure
Solution (encoded in the skill): upload to file storage (OneDrive, etc.) → attach as a link
```

This is knowledge the agent is unlikely to find without trial and error, so write the **exact tools and order** in the skill. (In instructions, abstract it only as "attach as a link" — 1.4.)

> This is exactly the definition from Part 1, 1.4: *"Every component in a harness encodes an assumption about what the model cannot do on its own."* A skill is where that encoding lives.

**③ Keep a single source of truth.**
Keep details such as design colors and procedures **in only that one skill**, and do not duplicate them in instructions or other skills. That way, you only need to edit one place when they change, and the agent always follows the same rules (see 1.5).

### 2.4 Single-file skills — register directly in Copilot Studio

The easiest skill is **one `SKILL.md` file with no resources**. This form can be **pasted directly into the Copilot Studio UI when creating a skill and registered immediately**—no zip file or upload process is needed.

For example, a skill that "always summarizes analysis results in the same format":

```markdown
---
name: result-brief
description: Use when summarizing analysis results in the same short format every time.
  For requests involving "summary, briefing, recap."
---
# Result briefing
## What it does — always organize in this fixed format
  One-line summary / key numbers / notable points / next actions
## Rules
  Use only numbers from the analysis results; keep it around five lines; express changes with +/-
```

→ With only two YAML lines (`name`, `description`) plus "when, what, rules," it becomes a skill. This makes the Part 1 Chapter 3 message—"skill = one reusable instruction sheet"—very clear.

> **Remember:** When learning skills for the first time, start with this single-file form. It can be registered directly in the UI, so feedback is fast, and you can most clearly feel the essence of skills: reusable instructions.

### 2.5 Skill packaging — high-performance skills with resources

When creating a skill in the Copilot Studio UI, you can add **only a single skill (one file)**. But with **skill packaging (ZIP upload)**, you can bundle **resources such as reference Python code, HTML forms, and design guidelines** together with the `SKILL.md` instructions. In other words, it becomes a **high-performance skill** the agent can reference during work (Part 1, 3.4 "Skills with resources").

| Category | Single-file skill | Packaged (ZIP) skill |
|---|---|---|
| Registration method | Paste directly into UI | Upload ZIP |
| Composition | One `SKILL.md` | `SKILL.md` + resources (.py, .html, .md, etc.) |
| Best for | Rules and formats are enough | Code, templates, and design must be fixed |
| Example | Summary rules for output format | Data processing code + email HTML form + brand design guidelines |

**What to bundle (examples):**
- **Python code** — standard patterns for data processing and calculation (recipes the agent can reference)
- **HTML forms** — email and report templates (fill the blanks and the design is applied automatically)
- **Design guidelines** — collect color and formatting rules in one file as the single source of truth

> **Tip — make it more sophisticated with AI tools:** Skill packaging can be designed much more precisely with help from **AI tools such as Copilot**. Ask for things like "turn this task into a skill," "separate this HTML into a template," or "refine the description so triggers work well," and the tool can organize the SKILL.md structure, resource separation, and trigger keywords together. The maker only needs to say *what* they want (Part 1, 0.2 "the core writes the code").

> **⚠️ Important — resources are not automatically injected:** When a skill is triggered, the only thing **automatically injected into the agent is the body of `SKILL.md`**. Bundled files such as `design-set.md`, templates, and `.py` files are only stored; they are read only when **the agent decides they are needed and opens them directly**. Therefore, if the core rule only points to "see design-set.md for details," the agent may not open that file and may instead conclude "there is no guide → I'll handle it myself."
>
> **Principle: write the minimum rules that must be followed—palette values, prohibitions, and "use the template"—directly in the SKILL.md body.** Separate only extended explanations and full references into resource files.
>
> This differs from the "single source of truth" between instructions and skills (1.5). For instructions vs skills, *avoid duplication*; for SKILL.md vs resources, *put the essentials in the body and the details in resources*.

### 2.6 Skill packaging — zip pitfalls (must watch)

When uploading a skill as a ZIP, **this is the most common failure**.

```
File requirements
- The .zip must contain SKILL.md
- SKILL.md must contain name and description in YAML
```

| Incorrect zip | Correct zip |
|---|---|
| `my-skill/SKILL.md` (zipped with the folder) | `SKILL.md` (root) |
| → "Bundle is missing a root-level SKILL.md" | → passes |

**Core rule: zip the contents *inside* the folder, not the folder itself.**

- File Explorer: enter the folder → select all files → right-click and compress. (If you right-click and compress the folder itself, it fails.)
- PowerShell: `Compress-Archive -Path "skill-folder\*" -DestinationPath out.zip` (`\*` = contents)

> **FAQ response:** "I definitely put SKILL.md in it, so why does it fail?" → Nine times out of ten, it is **one level down (`folder-name/SKILL.md`)**. Open the zip and check whether SKILL.md appears **at the top level (root)**.

**Pitfall — skill name (`name`) rules:** `name` allows **only lowercase letters, numbers, and hyphens (`-`)**, and cannot start or end with a hyphen. If you violate this, upload is rejected with *"Name must use only lowercase letters, numbers, and hyphens..."*

| ❌ Incorrect name | Reason | ✅ Correct name |
|---|---|---|
| `brand_comms` | Underscores (`_`) not allowed | `brand-comms` |
| `brand-comms_v2` | Contains underscore | `brand-comms-v2` |
| `Brand-Comms` | Uppercase not allowed | `brand-comms` |
| `-brand` / `brand-` | Starts/ends with hyphen | `brand` |

### 2.7 ⚠️ Preview issue — New CLI agents do not work properly in personal developer environments (as of 2026-06-14)

> New Copilot Studio is currently in preview, and **New (CLI) agents do not work properly in personal developer environments**. Broken skill package uploads are only **one symptom** of a broader personal developer environment issue. This section summarizes the symptoms, cause, and workaround based on actual measurements.

**Confirmed issues (personal developer environment)**
- **Skill package import unavailable** — the ZIP looks normal in the UI, but in reality only the SKILL.md YAML (name and description) is uploaded, while the body and resources are missing (details below).
- **Errors in the Copilot app** — after publishing, the agent throws errors in the M365 Copilot app.
- **Random abnormal behavior in Teams chatbot** — behavior varies for the same input.

**Missing skill package content — what actually gets uploaded (BIC processing)**
Normally, when a skill is called, the SKILL.md body + resources should be injected into context. But in personal developer environments, only **YAML metadata (name and description)** remains, and the body is replaced by an internal bundle pointer (BIC) and **is not injected**.

```yaml
# SKILL.md confirmed in a personal developer environment (body disappears and only a pointer remains)
---
name: default-...-skill-brand-comms-v2
description: Default_...skill.brand-comms-v2
---
<!-- bic:bundle=crskill_brand_comms_v2_zip_... -->   ← body and resources are replaced here
```

- Symptom: the agent **selects the skill**, but does not follow the design or procedure (it says "there is no detailed guide" and designs on its own). **The UI looks as if four files were uploaded normally.**
- Verification (do not trust the UI): use a test prompt to verify actual injection.
  ```
  "Show me all subfolders under app/skills that you have"
  ```
  - ✅ Normal: `SKILL.md` + resources are **all** visible under the skill folder.
  - ❌ Problem: only `SKILL.md` is visible, and even that has **an empty body with only a `bic:bundle` pointer**.

**Cause — environment type**
It is unrelated to whether the agent is published or what language the skill package uses. **Even with the same ZIP and the same agent, results differ by environment**—it breaks only in personal developer environments, while it **works normally in Sandbox/general environments**. In other words, this is not a skill or agent design problem; it is **a preview limitation of the personal developer environment itself**.

**Workaround — develop in a Sandbox environment**
- **Do not develop New (CLI) UI agents in a personal developer environment. Develop and test them in a Sandbox environment instead.**
- After creating the agent and importing the ZIP in Sandbox, verify that **all resources were injected** with the "show app/skills" prompt above before starting work.

> **FAQ response:** "All four files show in the UI, so why doesn't it work?" → This may be a preview limitation or bug. It currently occurs often in personal developer environments, and changing the skill does not resolve it. **The standard approach is to create it again in a Sandbox environment**, and you must verify it by actual measurement with the `app/skills` prompt.

---

