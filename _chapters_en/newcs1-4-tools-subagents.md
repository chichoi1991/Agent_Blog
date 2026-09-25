---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 1 · Tools, MCP & Sub-agents"
short_title: "Tools, MCP & Sub-agents"
description: "The two axes of tools—connectors and MCP—and sub-agents for context isolation."
order: 4
category: "newcs"
parent: "ncs1"
---

## 4. Tools / connectors (+ the MCP industry standard)

<div class="info-box note" markdown="1">
**▶ Point** — Tools are the agent's hands and feet for taking real action in the outside world. Understand them through two axes: **"connectors (Microsoft assets) + MCP (industry standard)."** And remember Anthropic's warning: attaching more tools is not better; it can actually ruin the agent.
</div>

### 4.1 Tools = the agent's hands and feet

If the loop is "observe → judge," tools are the channels through which the agent actually acts: sending email, querying a database, creating a ticket, processing an approval, and so on. Without tools, the agent is only a "head that thinks."

### 4.2 Anthropic's three principles for tool design — what makers must remember

> **Remember:** Bloated tool additions are the most common cause of failure.

*Effective context engineering* addresses tool design directly, and the same guidance applies to the hands-on work in Part 2 (attaching tools).

- **Tools must be token-efficient** — return concise results
- **Capabilities must not overlap** — "if even an engineer cannot confidently say which tool to use, the agent certainly cannot do better."
- **Curate the minimum viable toolset** — the most common failure is a bloated toolset with too many capabilities and ambiguous choice points

→ **Hands-on implication:** Do not attach every connector/tool indiscriminately. Use the minimum tools per purpose. If there are ten tools, the agent spends every turn confused about "which one to use."

### 4.3 Two axes — connectors and MCP

| Axis | Identity | Nature |
|---|---|---|
| **Connectors** | 1,000+ Power Platform connectors | Microsoft-owned assets — proven enterprise connections |
| **MCP (Model Context Protocol)** | Industry standard for agent-tool connections | Not Microsoft-proprietary — connects external tools through a standard protocol |

**Why MCP matters:** MCP is the specification proposed by Anthropic that became an industry standard for "how agents connect to tools and data." New Copilot Studio's support for the **MCP server ecosystem (Preview)** means that a broad range of tools and apps not reachable through connectors can be attached in a standard way, while still running within Microsoft's security, permission, and compliance boundaries.

### 4.4 Inside workflows as well

Workflow nodes can call MCP tools and, when needed, include user approval (human-in-the-loop) before execution (Preview 06/2026).

> **One-line summary:** "Tools = connectors (Microsoft assets) + MCP (industry standard)." Both sit within the same governance boundary. And **fewer is better.**

---

---

## 5. Sub-agents — connected agents + skills

<div class="info-box note" markdown="1">
**▶ Point** — The essence of sub-agents is "context isolation." When a specialist agent works deeply in a clean context and returns only a summary, the main agent stays clean. New Copilot Studio moves away from Classic's child agent model and reconfigures this as **"skills + connected agents."**
</div>

### 5.1 Industry principle — why use sub-agents?

> **Remember:** To avoid polluting the main agent's context.

> *The main agent handles the high-level plan, while specialist sub-agents focus on work in clean contexts. Each sub-agent may explore deeply using tens of thousands of tokens, but returns only a compressed summary (usually 1,000–2,000 tokens). The detailed exploration context is isolated inside the sub-agent, and the main agent focuses on synthesis and analysis → "separation of concerns."*
> — Anthropic, *Effective context engineering* / *Multi-agent research system*

The **planner, generator, evaluator** three-agent structure (GAN-style) in the *harness design* documents is also the standard pattern for role separation. Each agent is designed to cover a specific weakness found in the previous execution.

### 5.2 Mental model shift in New Copilot Studio

Classic's child agent concept did not carry over unchanged. Instead:

- **Skill** = packages a reusable capability
- **Connected agents** = brings in other agents for collaboration

**Why this is better:** Child agents ran only inside their own context and were weak at interruptions and intent shifts. Skill-based composition responds much more naturally to interruptions, intent shifts, and multi-intent questions such as "do A and also do B."

### 5.3 Current constraints 

- **At GA, only Copilot Studio agents can connect to each other**
- External agent connections based on **Microsoft Foundry, M365 Agents SDK, and the A2A protocol** are coming soon (for external materials, say only "planned for expansion")

---
