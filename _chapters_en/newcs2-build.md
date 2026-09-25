---
layout: "chapter"
lang: en
date: 2026-06-15
title: "New Copilot Studio — Part 2: Creating Agents (Build Concepts)"
short_title: "Part 2: Build Concepts"
description: "The six elements of an agent — instructions, skills, tools, knowledge, connected agents, and memory."
order: 2
category: "newcs"
parent: "ncs2"
is_parent: true
---

<div class="info-box note" markdown="1">
**▶ Part 2 in one sentence** — Part 2 organizes the six components you need to understand when building a real agent from the Part 1 principles—harnesses, skills, tools, memory, and context engineering—from concept to authoring method to pitfalls. The concrete hands-on work is covered in Part 3.
</div>

> ⚠️ The features, screens, and timelines in this document are based on preview and may change (subject to change).

---

## 0. Introduction — from Part 1 to Part 2

<div class="info-box note" markdown="1">
**▶ Point** — Part 1 said that the maker's job changes from drawing flows to designing a harness. Part 2 explains how to assemble that harness in practice. Remember one core mental model: **people write the "what," and the agent handles the "how."**
</div>

### 0.1 The six elements of a build

In New Copilot Studio, one agent consists of six parts. They map one-to-one to the chapters in Part 1.

| Element | One-line definition | Part 1 basis |
|---|---|---|
| **Instructions** | Always-on top-level rules (constitution) | Chapters 1–2 |
| **Skills** | Reusable instruction bundles pulled out only when needed | Chapter 3 |
| **Tools** | Hands and feet for taking real action outside the agent | Chapter 4 |
| **Knowledge** | Knowledge the agent reads (Excel, documents) | Chapter 9.4 |
| **Connected agents** | Collaborative agents that delegate specialized work | Chapter 5 |
| **Memory** | Maintains context across conversations and work | Chapters 6, 9.6, 9.7 |

### 0.2 If the six elements were a new employee

The six elements are like assigning work to a capable new employee. You provide the environment and let **the new employee (agent) decide how to work**.

| Element | Analogy | Role |
|---|---|---|
| **Instructions** | Work rules | Top-level rules that must always be followed |
| **Skills** | Work manuals | Documents that describe how to perform specific tasks (opened when needed) |
| **Tools** | Tools | Means for actually executing something |
| **Knowledge** | Reference documents and library | Knowledge to read and use as evidence |
| **Connected agents** | Specialist colleagues | Collaborators to delegate deep work to |
| **Memory** | Work notes | Stores context from conversations and work |

> **Core mental model:** People write the "what," and the agent handles the "how." Instructions and skills focus on *what*; the core handles *how*—code, paths, libraries, and so on (Part 1, 1.4).

### 0.3 How to read this document

- Chapters 1–6 cover the six elements in the order **concept → authoring method → pitfalls**. They explain **instructions (Chapter 1) and skills (Chapter 2)** in the most depth because these determine build quality.
- Chapter 7 synthesizes **how the six elements interact in a single request**.
- The **hands-on build of a real agent from start to finish is in Part 3**. Part 2 is the conceptual foundation for understanding that hands-on work.

---

---

## What this part covers

| # | Topic | Key point |
|---|---|---|
| 1 | [Instructions]({{ '/en/chapters/newcs2-1-instructions/' | relative_url }}) | Always-loaded top-level rules — short and clear |
| 2 | [Skills]({{ '/en/chapters/newcs2-2-skills/' | relative_url }}) | Reusable instruction packages loaded only when needed |
| 3 | [Tools & knowledge]({{ '/en/chapters/newcs2-3-tools-knowledge/' | relative_url }}) | Hands and feet (connectors, MCP) and readable knowledge (RAG → code) |
| 4 | [Connected agents & memory]({{ '/en/chapters/newcs2-4-connected-memory/' | relative_url }}) | Context isolation and two-layer short-term/long-term memory |
| 5 | [Synthesis & checklist]({{ '/en/chapters/newcs2-5-synthesis/' | relative_url }}) | How the six elements interact in one request + pitfalls |

> Read them in order for the most natural progression, or open the topic you need first.
