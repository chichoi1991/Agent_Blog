---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 1 · Agentic Loop & Skills"
short_title: "Agentic Loop & Skills"
description: "The agentic loop at the heart of the core, and skills that are loaded only when needed."
order: 3
category: "newcs"
parent: "ncs1"
---

## 2. Orchestrator = agentic loop

<div class="info-box note" markdown="1">
**▶ Point** — The heart of the harness is the "agentic loop." Skills, tools, memory, and sub-agents are all just materials consumed by this loop. The New orchestrator strengthens this loop through **(1) tool-selection accuracy, (2) recursive execution, (3) failure adaptation, and (4) separated self-evaluation**.
</div>

### 2.1 The loop comes first; the materials come next

Skills (3), tools (4), sub-agents (5), and memory (6) may look like independent features, but they only have meaning inside this loop. Without the loop, everything else floats in midair.

**One turn of the loop:**

```
Interpret intent → Select tool/skill → Fill slots → Execute
        → Observe → Judge (done?) → Repeat if needed
```

### 2.2 Four things the new orchestrator strengthens

(The numbers in parentheses are **internal evaluations = NDA**; omit them from external materials.)

- **① Accurate tool selection + slot filling** — calls the right tool with the right inputs on the first try *(tool-selection/input accuracy +11 points)*
- **② Recursive task execution** — breaks problems into steps and iterates systematically to completion instead of "doing everything at once." This matches Anthropic's *feature list + one feature at a time* philosophy
- **③ Adaptation** — automatically retries or finds alternative paths when failures, unexpected results, or errors occur
- **④ Long-term instruction adherence** — keeps the original instructions throughout long sessions *(large files +8.3 points, code interpreter +41.8 points)*

### 2.3 The real reason the New AI core (orchestrator) focuses on "reliability" — Anthropic's two failure situations

> **Remember:** Agents fail for two reasons, and the new AI core (orchestrator) focused on improving both.

**Failure situation 1 — loss of context consistency + "context anxiety"**
As the context window fills up, the model loses consistency. Worse, when it senses that it is nearing the limit, it rushes to wrap up the task (context anxiety). There are two remedies:

- **Compaction** — summarize and compress the conversation so the same agent can continue with a shorter history
- **Context reset** — clear the context and start a new agent, while passing the previous state and next steps through a structured handoff (more powerful, but higher cost)

**Failure situation 2 — overly generous self-evaluation**
When asked to evaluate its own output, a model almost always overpraises it. The remedy is to **separate the worker (generator) from the evaluator**. Inspired by GANs, Anthropic built a generator↔evaluator loop and concluded that "it is much easier to tune a separate evaluator skeptically than to make a model criticize its own work."

→ This "evaluator separation" principle leads directly to New Copilot Studio's **full-page testing + node-level evals** (Part 2, Chapter 5).

### 2.4 What changes — a concrete example

| Category | How it works |
|---|---|
| Previous model | Branches "extract amount from invoice PDF → compare to threshold → approve/reject" node by node. It breaks when a new PDF form arrives. |
| New model | Give the agent only the goal ("review the invoice and decide whether to approve it") and tools (PDF reader, approval API). The loop extracts, compares, and judges on its own; if extraction fails, it retries or tries another method. |

> **Analogy:** Before, you drew a flowchart. Now, it is closer to giving a capable intern a goal and tools, letting them work, and assigning a separate reviewer. However, you still design what that intern can do (skills), what tools they have (tools), and what they remember (memory).

---

---

## 3. Skills — load-on-demand markdown

<div class="info-box note" markdown="1">
**▶ Point** — A skill is a reusable instruction that records "how to do X" once in markdown and loads it only when needed. This is not just a convenience feature; it is the enterprise implementation of Anthropic's **"just-in-time context"**, and it is an industry-compatible asset that can bring in external skills from GitHub Copilot and Claude as they are.
</div>

### 3.1 What is a skill?

A skill is a **reusable bundle of markdown instructions**. Its key characteristics are:

- It is not placed in context by default; it is **loaded on demand** when that work becomes necessary
- It packages when and how to ask for and present information for a specific use case
- Once created, it can be reused by multiple agents

### 3.2 Why "load only when needed"? The core of context engineering

> **Remember:** Do not put everything in. Context is a finite resource, and accuracy drops as tokens increase.

The load-on-demand design of skills directly implements the principles in Anthropic's *Effective context engineering*.

- **Context is a finite resource (attention budget)** — models have an "attention budget" just like people do. Because transformers compute n² pairwise relationships over n tokens, attention spreads thinner as context grows longer.
- **Context rot** — "as token count increases, the model's recall accuracy drops." A large context window is not the answer.
- **The goal is to find "the smallest high-signal set of tokens that will produce the desired result."**
- **Just-in-time retrieval** — do not cram all data in up front. Keep only lightweight identifiers such as file paths, queries, and links, then load only what is needed at runtime. Claude Code's `CLAUDE.md` + `glob`/`grep` is exactly this pattern.

→ **A skill is the enterprise version of this just-in-time pattern.** Because the agent pulls out "this skill for this task" only when needed, context stays light and clean.

### 3.3 Reusing external assets — industry compatibility

Because skills use the markdown standard, you can bring in assets you already have as they are:

- Import **GitHub Copilot skills**
- Import **Claude Code (Claude) skills**
- (FAQ) Skills from other platforms such as Copilot Cowork

For reference, Anthropic distributes skills such as frontend-design as public `SKILL.md` files. The fact that New Copilot Studio imports these skills means it **directly draws on open-source ecosystem assets outside Microsoft's walls**.

### 3.4 Skills roadmap 

| Item | Details | Timing |
|---|---|---|
| Reusable / Author from scratch or import | Author in the designer or import externally | Preview 06/2026, GA TBD |
| **Skills with resources** | Bundled resources such as documents, templates, and Python files | Preview 06/2026 |
| **Skill marketplace** | Sharing within the organization and automatic updates | Preview 06/2026 |

### 3.5 Relationship to Classic

- **Topics → replaced by skills + workflows.** Skills handle "how to respond in a particular situation," while workflows handle "connecting multiple actions"
- **Prompts → replaced by skills (agents) / agent nodes (workflows)**
- Some topic extensibility points, such as intercepting inbound/outbound messages, are planned for future releases. Classic topics remain in Classic agents

---
