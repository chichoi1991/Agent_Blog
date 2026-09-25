---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 2 · Tools & Knowledge"
short_title: "Tools & Knowledge"
description: "Minimum curation for hands and feet (connectors, MCP), and knowledge that shifted from RAG to code execution."
order: 3
category: "newcs"
parent: "ncs2"
---

## 3. Tools — the agent's hands and feet

<div class="info-box note" markdown="1">
**▶ Point** — Tools are the channels through which the agent actually acts outside itself (Part 1, Chapter 4). Understand them through two axes—**connectors (Microsoft assets) + MCP (industry standard)**—and follow **minimum curation** (no overlapping tools). Adding more tools does not make the agent better; it can make it worse.
</div>

### 3.1 Concept — tools = action channels

If the loop is "observe → judge," tools are the agent's **real actions**: sending email, uploading files, querying databases, and so on. Without tools, it is only a "head that thinks."

### 3.2 Which tools should you attach? Selection criteria

Judge tools by whether they are truly needed for the work. Common types:

| Type | Need assessment | Notes |
|---|---|---|
| **Code execution (code interpreter)** | ✅ Required when data calculation or file generation is involved | Engine for Excel aggregation and document generation (Part 1, 9.4·9.5) |
| **Knowledge connection (SharePoint, etc.)** | ✅ When there are files or documents to reference | Channel through which materials come in (Chapter 4) |
| **Email/messages (MCP, connectors)** | ✅ When something must be sent externally | Confirmation gate required for sending |
| **File storage (OneDrive, etc.)** | ✅ When sharing/attaching outputs as links | Used to work around large file attachments |
| **Document generation connector** | Usually ❌ | Generate docx/pptx/HTML directly with code (Part 1, 9.5) |
| **A second tool that does the same thing** | ❌ Prohibited | Functional duplication → selection confusion |

### 3.3 Core principle — minimum curation

> **Remember:** Anthropic's warning from Part 1, 4.2 — "if even an engineer cannot confidently say which tool to use, the agent certainly cannot do better."

- **Use only the minimum tools per purpose.** If there are ten tools, the agent spends every turn confused about "which one to use."
- **No functional duplication.** If you attach two tools that do the same thing (for example, an email connector + email MCP), it becomes ambiguous which one to use. Use one per purpose.
- **Do not attach tools for things code can do.** The container's preinstalled libraries are enough to generate docx/pptx/HTML (Part 1, 9.5) → no connector needed.

### 3.4 Connectors vs MCP

| Axis | Identity | Examples |
|---|---|---|
| **Connectors** | 1,000+ proven Power Platform connections | SharePoint, Outlook |
| **MCP** | Industry standard for agent-tool connections | Work IQ Mail, OneDrive |

Both run within the same Microsoft security and governance boundary. Thanks to MCP, tools that connectors cannot reach can also be attached in a standard way.

> **Practical lesson:** Tools such as file storage are often **added while solving the problem**, not planned from the beginning—for example, direct attachment hits token limits, so the agent works around it by attaching a link. The standard approach is to add tools minimally at the point where the scenario gets blocked.

---

---

## 4. Knowledge — from RAG to code execution

<div class="info-box note" markdown="1">
**▶ Point** — Knowledge is what the agent reads: Excel files and documents. The biggest change in the New CLI core is here (Part 1, 9.4): Classic answered from *search snippets*, but the new core **opens the original file directly and processes it with code**. That is why Excel aggregation becomes accurate.
</div>

### 4.1 Concept — two kinds of knowledge

| Type | Nature | How it is used |
|---|---|---|
| **Data files (Excel, CSV)** | Numbers — answers require aggregation | Calculate exact values with code |
| **Documents (Word, PDF)** | Format, tone, policy — for reference | Cite wording and rules (with source) |

Rule: **Numbers always come from data files; tone and format come from documents.** Do not mix them.

### 4.2 Why code execution is accurate — limits of RAG

Classic (RAG) does not receive the whole file; it retrieves only **chunks** similar to the question and answers from them.

```
Classic (RAG):  "Average price by manufacturer?" → related text fragments → approximation ❌
New CLI:        "Average price by manufacturer?" → aggregate the full original Excel file with code → exact value ✅
```

Questions that require summing or averaging an entire table are structurally wrong with chunk search. The new core opens the original and **calculates all rows**, so it is accurate (Part 1, 9.4).

### 4.3 Handling large files without worrying about tokens

"Won't tokens explode if it reads thousands of rows?" → **No.** The agent does not pour the file into context; it **processes it with code and reads only the summary** (Part 1, 9.4).

- The maker's job: write only "**calculate the actual values instead of estimating by eye**" in the instructions.
- The rest—selective loading, aggregation, summarization—is handled by the agent.

### 4.4 When uploading to SharePoint

- Put Excel and Word files in a SharePoint site, then connect that site as Knowledge.
- Excel (binary) has empty search snippets and only returns a path → this is normal. The agent downloads it and processes it with code.
- If column meanings may be ambiguous, bundling a supporting document such as "column descriptions" in a skill improves quality (it still works without one).

---
