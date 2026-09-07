---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 1 · Why was it rebuilt?"
short_title: "Why was it rebuilt?"
description: "Classic's structural limits and why the core was rebuilt."
order: 1
category: "newcs"
parent: "ncs1"
---

## 0. Copilot Studio: why rebuild it?

<div class="info-box note" markdown="1">
**▶ Point** — Classic was a tool for "designing conversations," and that paradigm itself hit a ceiling for multi-step, long-running work. So Microsoft rebuilt not the UI, but the AI core itself on top of a coding harness.
</div>

### 0.1 Classic's structural limits

Classic Copilot Studio (formerly Power Virtual Agents) was essentially a **conversation flow design tool**. Makers had to draw these elements directly:

- **Topics** — trigger-response trees such as "if the user says X → node A → node B"
- **Prompts** — one-off AI calls from a specific input to a specific output
- **Branches, conditions, and variables** — connecting every possible case as nodes

The decisive weakness of this approach is that **people must imagine and draw every path in advance**. As soon as a scenario becomes even slightly complex, branches explode; when users say something unexpected, the flow breaks.

This model fit FAQ chatbots and structured scenarios well, but its limits were clear.

| Limitation | Symptom |
|---|---|
| Flow breaks | An unexpected input in the middle of a multi-step task cuts off the topic |
| Branch explosion | As scenarios become more complex, nodes and conditions increase exponentially |
| Rigid tool calls | The maker must predesign which tool to call and when |
| Long work is difficult | Long-horizon tasks such as "read these documents, analyze them, and write a report" are hard |

Anthropic summarized **exactly how** these limits surface in complex work as two failure modes in *Effective harnesses for long-running agents*—the same patterns that made Classic bots fall apart.

| Failure mode diagnosed by Anthropic | Symptom in Classic bots |
|---|---|
| Tries to do everything in one shot and runs out of context halfway through | A multi-step task stops midway and ends incomplete |
| Reports progress and declares the job done too early | The conversation ends even though core functionality does not work |

### 0.2 What changed — rebuilding the core

Customer feedback centered on three points (based on slide 4 of the blog and roadmap materials):

1. They want agents to become a **natural part of work**
2. They need a **reliable and scalable** agent platform
3. They want agents, apps, and **deterministic workflows to work well together**

So Microsoft's choice was not to tweak the UI, but to **rebuild the AI core (orchestrator) on a new coding harness and CLI layer**. The resulting capabilities are:

- **Stronger instruction adherence** — especially retaining the original instructions even in long conversations
- **Long-horizon, multi-step work** — continuing to completion without collapsing midway
- **Recursive task execution** — breaking complex problems into steps on its own and iterating
- **Large content + rich file generation** — producing Word, PowerPoint, Excel, CSV, and PDF outputs in a dedicated container

The build experience was also simplified: configuration tabs went from **nine to four** (Build, Test, Preview, Monitor); instructions, skills, tools, and knowledge are on one screen; and in full-page testing, you can observe the reasoning process (inline chain-of-thought) and tool calling in real time.

> **FAQ response:** "Isn't this just a UI reskin?" → **The improvements in reliability and multi-step processing come from the new AI core, not the UI.** The redesigned UI simply improves the maker authoring experience that supports that core.

---
