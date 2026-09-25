---
layout: chapter
lang: en
date: 2026-06-15
title: "New Copilot Studio — CLI Agent Overview"
short_title: "Overview"
description: "Why it was rebuilt as a CLI agent — a guide to New Copilot Studio across Parts 1, 2, and 3."
order: 0
category: newcs
---

## What this series is about

**New Copilot Studio** is not just a UI redesign. It is a **rebuild of the AI core** that brings the **"harness design"** principles Anthropic, OpenAI, and GitHub have validated in coding agents into an enterprise agent platform.

This series explains that change in three parts: **concepts → build → hands-on**. You will understand it much more accurately if you read every capability not as "a feature Microsoft added," but as **"industry principle → Microsoft implementation."**

> ⚠️ This series focuses on publicly discussable concepts, authoring patterns, and pitfalls. Preview-stage features, screens, and timelines are all subject to change.

---

## 📎 Complete slide deck (Parts 0–3)

This is a **60-slide deck** that consolidates the entire Parts 0–3 series into one file. It includes the article screenshots and hands-on attachment guidance, so you can use it directly for internal sharing or presentations.

<div class="info-box note" markdown="1">
- [Download **`New Copilot Studio Parts 0-3 Complete.pptx`**]({{ '/assets/newcs/deck/NewCopilotStudio-0-3.pptx' | relative_url }}) — 60 slides · editable
- [Download **`New Copilot Studio Parts 0-3 Complete.pdf`**]({{ '/assets/newcs/deck/NewCopilotStudio-0-3.pdf' | relative_url }}) — 60 slides · for viewing and distribution

**Structure** — Cover / Part 0 overview (3 slides) / Part 1 concepts (16 slides) / Part 2 build concepts (17 slides) / Part 3 hands-on (21 slides) / Attachment inventory and wrap-up (2 slides)
</div>

> The data and skill packages used in the hands-on exercises can be downloaded from [Part 3, Chapter 2 · Add knowledge sources]({{ '/en/chapters/newcs3-2-knowledge/' | relative_url }}) and [Part 3, Chapter 4 · Import the skill package]({{ '/en/chapters/newcs3-4-skill-package/' | relative_url }}), respectively.

---

## Why it was rebuilt — at a glance

Classic Copilot Studio was essentially a **conversation flow design tool**. Makers had to draw every path in advance, and as scenarios became complex, branches exploded and the flow broke down during multi-step, long-running work.

New Copilot Studio **rebuilds the AI core (orchestrator) on top of a coding harness**, shifting the maker's job from *"drawing flows"* to **"designing the harness."** The core mental model is simple: **people write the "what," and the agent handles the "how."**

| Category | Classic Copilot Studio | New Copilot Studio (CLI Agent) |
|---|---|---|
| Paradigm | Conversation flow (Topics) design | Harness design + agentic loop |
| Maker's job | Draw branches and nodes directly | Design instructions, skills, and tools |
| Multi-step, long-running work | Flows are easy to break | Runs recursively to completion |
| Knowledge handling | Based on search snippets (RAG) | Processes original files directly as code |
| Outputs | Mostly text responses | Rich files such as Word, PowerPoint, Excel, and PDF |
| Authoring surface | Spread across nine tabs | Consolidated into Build, Test, Preview, and Monitor |

> Classic and New **coexist side by side**. New is opt-in, and there is no forced migration.

---

## Structure of the three parts

<div class="info-box note" markdown="1">
**Recommended reading order:** Part 1 (principles) → Part 2 (build concepts) → Part 3 (guided hands-on). If you want to build quickly, read only Part 1 Chapters 1 and 2, jump to Part 3, and refer back to Part 2 where you get stuck.
</div>

### [Part 1 · What's New (Concepts)]({{ '/en/chapters/newcs1-whats-new/' | relative_url }})

Starting with the industry principle of harness engineering, this part walks through the agentic loop, skills, tools (MCP), sub-agents, memory, and workflows. It also covers the Classic → New mapping table and the structural runtime behavior of the CLI agent.

### [Part 2 · Creating an agent (Build concepts)]({{ '/en/chapters/newcs2-build/' | relative_url }})

This part organizes the **six components** of an agent—instructions, skills, tools, knowledge, connected agents, and memory—in the order **concept → authoring method → pitfalls**. It goes especially deep on instructions and skills.

### [Part 3 · Creating an agent (Hands-on)]({{ '/en/chapters/newcs3-handson/' | relative_url }})

You will build a **telecom sales assistant** from start to finish. The agent analyzes a SharePoint Excel file, creates an HTML dashboard, and sends it in an email with the company's design applied. You assemble it in the order **instructions → skill → package → tools → test → deploy**.

---

## Key terms at a glance

| Term | One-line definition |
|---|---|
| **Harness** | A runtime that wraps an LLM in an execution loop and enables it to use tools |
| **Agentic loop** | The core loop that repeats intent interpretation → tool selection → execution → observation → judgment |
| **Skill** | A reusable bundle of markdown instructions loaded only when needed |
| **Tool** | The agent's hands and feet for taking real action outside itself (connectors + MCP) |
| **MCP** | The industry-standard protocol for agent-tool connections |
| **Connected agent** | A collaborative agent that delegates specialized work with isolated context |
| **Context engineering** | Designing "the smallest high-signal set of tokens that will produce the desired result" |

> Next → [Part 1 · What's New (Concepts)]({{ '/en/chapters/newcs1-whats-new/' | relative_url }})

