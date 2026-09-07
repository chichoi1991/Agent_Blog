---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 1 · Harness Engineering"
short_title: "Harness Engineering"
description: "What a harness is, and why the industry converged on coding harnesses."
order: 2
category: "newcs"
parent: "ncs1"
---

## 1. Harness engineering — starting from industry knowledge

<div class="info-box note" markdown="1">
**▶ Point** — A "harness" is a runtime that wraps an LLM in an execution loop and enables it to use tools. The strongest agents in the industry have all converged on CLI coding harnesses, and New Copilot Studio brings that pattern directly into business agents. The maker's job now shifts from "drawing flows" to **"designing the harness."**
</div>

### 1.1 What is a harness? The most important definition

An LLM by itself only **predicts the next token**. It cannot read files, call APIs, or recover from failure. Anthropic's concise definition gets to the point:

> *Agent = LLMs autonomously using tools in a loop.*

The runtime that runs this loop is the **harness**. A harness provides four things to the model:

- **Tool access** — files, shell, search, APIs
- **Observation feedback** — feeding tool execution results back into the model input
- **Loop control** — repeating judgment → execution → observation until the work is done
- **Context management** — deciding what to show the model and when (covered in depth in Chapter 6)

### 1.2 The industry has already converged on this path

Through 2025, the most proven agents converged, without exception, on the shape of a **CLI-based coding harness**. This is not a coincidence.

| Example | Form | Characteristics |
|---|---|---|
| **Claude Code** (Anthropic) | Terminal agentic CLI | Reads, edits, and tests codebases. Loads only what it needs just in time with `glob`/`grep`/`head`/`tail` |
| **GitHub Copilot CLI** | Coding harness for shell, file, and tool calls | Completes work in the terminal |
| **OpenAI Codex CLI** | Code execution harness | Same family |
| **New Copilot Studio** | Enterprise agent platform | **Brings the same harness pattern into business agents** |

### 1.3 Why specifically a "coding" harness? The key insight

**Coding is the domain where agent capabilities were validated first and most rigorously.** To work with code, an agent inevitably has to do four things:

- Read multiple files and synthesize context
- Choose exactly which tools to use (compile, test, search)
- Reason across multiple steps
- When something fails (tests break), inspect the cause and recover

These four things are **exactly the capabilities every business agent needs**. Whether the task is invoice processing, report writing, or customer support, the underlying mechanism is the same. When Microsoft explicitly calls the core a "coding harness + CLI layer," it is declaring that an engine trained and hardened in coding has been brought into general business work.

### 1.4 The golden rule of harness engineering (Anthropic)

> **Remember:** "Do not over-engineer. As models improve, your scaffolding becomes obsolete."

> *Every component in a harness encodes an assumption about what the model cannot do on its own. That assumption may be wrong, or may become obsolete as models improve, so stress-test it continuously. ... Start from the simplest possible solution, and add complexity only when needed.*
> — Anthropic, *Designing harnesses for long-running apps* / *Building Effective Agents*

This is not abstract advice. Anthropic actually **removed** elaborate scaffolding built for Opus 4.5—such as sprint decomposition and context reset—in Opus 4.6. Once the model became better at planning on its own, the harness could become lighter.

**Teaching point (mental model shift):** The maker's job changes fundamentally. Before, you drew conversation flows (flowcharts) by hand. Now, you design the instructions, skills, and tools to give the harness, and you avoid over-engineering from the start. This is the philosophy running through all the hands-on work in Part 2.

---
