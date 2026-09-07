---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 1 · Memory, Workflows & Mapping"
short_title: "Memory, Workflows & Mapping"
description: "The three major memory techniques, agent + workflow composition, and the Classic → New mapping table."
order: 5
category: "newcs"
parent: "ncs1"
---

## 6. Memory & context engineering

<div class="info-box note" markdown="1">
**▶ Point** — Memory is not an abstract concept; it is a concrete technique of "structured note-taking." The agent records progress in files outside the context and reads them again when needed, so it does not lose its goal during long-running work. Skills (Chapter 3) and memory are actually **two faces of the same principle: context engineering**.
</div>

### 6.1 Industry principle — the three major memory techniques (Anthropic)

Anthropic defines memory not as a vague "recollection," but as three concrete techniques.

**① Compaction.** When context approaches its limit, summarize and compress the conversation, then restart in a new window. Preserve architectural decisions, unresolved bugs, and implementation details; discard duplicate tool output. The lightest form is "clearing tool results that have already been used."

**② Structured note-taking (= agentic memory).** The agent records progress in files outside the context and reloads them later. Examples:

- `claude-progress.txt` + git logs from the *long-running agents* document
- *Claude plays Pokémon*: maintaining precise tracking across thousands of game steps, such as "trained on Route 1 for the last 1,234 steps; Pikachu gained 8 levels"
- Continuing multi-hour work after a context reset by reading its own notes

**③ Sub-agent architecture.** (See Chapter 5.) Isolate context to keep the main agent clean.

The selection criteria are also clear: **compaction** for conversations with many round trips, **note-taking** for iterative development with clear milestones, and **multi-agent** for research where parallel exploration pays off.

### 6.2 The overarching principle

> *"Context is a precious and finite resource." As models improve, human curation decreases, and design converges on just-in-time loading.*
> — Anthropic, *Effective context engineering*

### 6.3 New Copilot Studio's response

- The agent maintains context across conversations and work, so it does not lose goals or instructions in long-horizon tasks
- **Skill load-on-demand = just-in-time context** → this is why skills (Chapter 3) and memory (Chapter 6) are two faces of one principle: "context engineering"

### 6.4 Future direction — Custom Autopilots 

This is a **future roadmap**, not a currently available feature.

- An independent class of agents with their own **identity, inbox, M365 services, and persistent memory**
- Persistent collaborators that go beyond "acting on behalf of the user," learning over time and working across multiple users and processes
- Examples: new-hire onboarding, standup coordination, community channel management, budget processes

---

---

## 7. Automation / workflows

<div class="info-box note" markdown="1">
**▶ Point** — Agents handle "open-ended work," while workflows handle "deterministic, repeatable, controllable work." Combining the two on one canvas is the core of New Copilot Studio, and it exactly matches Anthropic's guidance to **"start from the simplest solution"**: use deterministic steps cheaply for predictable work, and spend agent reasoning only where judgment is needed.
</div>

### 7.1 Why separate the two? A practical version of the "simplicity" principle

Agents take on open-ended work, while workflows take on deterministic, repeatable, and controllable work. New Copilot Studio combines the two on one canvas.

This is the practical version of Anthropic's broad principle: "start from the simplest solution and add complexity only when needed." If you hand everything to an agent, it becomes expensive and unpredictable. **The right answer is to handle predictable steps cheaply and reliably with deterministic workflows, and delegate only the parts that require judgment and flexibility to the agent.**

### 7.2 Workflow designer essentials

- **Integrated visual canvas** — compose steps with drag and drop and see the whole flow at a glance
- **Inline node testing** — test only the broken step without running the entire workflow (the evaluator-separation principle from Chapter 2 implemented in the UI)
- **Version history** — track changes and publish with confidence
- **Analytics** — end-to-end process visibility and performance monitoring

### 7.3 Mechanisms that connect with agents

| Mechanism | Description | Timing (planned) |
|---|---|---|
| **Agent node** | Calls an agent as one workflow step. Deterministic for predictable steps; delegate only the flexible parts | GA 06/2026 |
| **MCP tools in workflows** | Workflows call MCP tools and apps | Preview 06/2026 |
| **Natural-language entry point** | "Describe the automation you want in words" → generate, configure, validate | Preview 06/2026 |
| **M365 Copilot node** | Directly calls Researcher, Analyst, and custom M365 agents | — |
| **Classify / Extract intelligent actions** | Use classification and extraction for inline decision-making | — |
| **Computer-using agents** | UI automation for desktop and browser apps without APIs | Preview 06/2026 |
| **Classic agent flows → workflow upgrade** | Convert existing flows | GA 06/2026 |

> **Note:** Anthropic harnesses using Playwright/Puppeteer MCP to click through a browser like a person for E2E validation, and Copilot Studio's computer-using agents / node testing, belong to the same lineage. "Claude mistakenly thought it was done with a unit test or curl, but when it clicked through the browser like a person, it found the real bug"—the lesson is that validation should use the actual user path, not just code.

### 7.4 Two-way composition

- **Workflow → agent:** delegate through an agent node
- **Agent → workflow:** register a workflow that has a "when the agent calls this flow" trigger as a tool for the agent

> **"How is this different from Power Automate?" (FAQ):** Workflows blend agent capabilities—agent nodes, intelligent actions, and versioning—into deterministic automation. Classic flows (= agent flows) continue to work and can also be converted.

---

---

## 8. Classic → New mapping table

<div class="info-box note" markdown="1">
**▶ Point** — The key change is that "Topics, Prompts, and Child agents" have been reorganized into "skills, workflows, and connected agents." There is no forced migration, and Classic and New coexist side by side.
</div>

| Classic | New Copilot Studio | Notes |
|---|---|---|
| **Topics** | Skills + workflows | Some extensibility, such as message interception, is coming later |
| **Prompts** | Skills (agents) / agent nodes (workflows) | Replaced by the new core |
| **Child agents** | Connected agents + skills | Stronger for interruptions and multi-intent requests |
| **Agent flows** | Workflows | Can be upgraded/converted |
| **9 configuration tabs** | 4 tabs (Build, Test, Preview, Monitor) | Knowledge, Tools, Channels, and Agents are components in Build |
| **Separate instructions/knowledge/tools** | Unified on one screen | Full-page testing + inline CoT and tool calls |

**Coexistence & migration:**

- **Classic and New run side by side.** New is opt-in (home "Try now"), off by default, with no forced migration
- Recommended path: turn on New and build your next production agent/workflow there, while keeping Classic running as-is. An official migration guide will come later

---
