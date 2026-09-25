---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 1 · Claude Code Comparison & References"
short_title: "Claude Code Comparison & References"
description: "Same harness philosophy, different purpose — plus improvements over Classic and reference materials."
order: 7
category: "newcs"
parent: "ncs1"
---

## 10. Claude Code vs Studio CLI agent

<div class="info-box note" markdown="1">
**▶ Point** — Both are products of the same harness philosophy (Chapter 1). The difference is **purpose**: Claude Code maximizes *developer autonomous execution*, while the Studio CLI agent is an "enterprise harness" that maximizes *M365 data integration + guaranteed human intervention*. This chapter summarizes (1) their shared harness, (2) the decisive differences, and (3) **improvements over Classic Studio**.
</div>

### 10.1 Both are harnesses — element comparison

Comparing Claude Code's five harness elements (Tool Loop, Sandbox, Persistence, Observation, Interruption) with the current CLI agent:

| Harness element | Studio CLI agent | Evidence |
|---|---|---|
| **Tool Loop** | ✅ | Repeated calls to `bash`, `grep`, `view`, `edit`, and `python` |
| **Sandbox isolation** | ✅ | Azure Linux container, `sandbox` user, `/dracarys/` blocked |
| **Persistence** | ✅ partial | Maintained within a session through `session-store.db`; cross-session depends on M365 |
| **Observation** | ✅ | Tool results feed back into context (including preToolUse hooks) |
| **Human-in-the-loop** | ✅ strong | User confirmation for every response; no unauthorized automatic execution |
| **Skills/specialization** | ✅ | `/app/skills/` — specialized skill modules separated |
| **Memory layers** | ✅ | Short-term (DB) + long-term (M365 cloud) separated |

→ Conclusion: this is indeed **"an agent based on harness engineering."**

### 10.2 Decisive differences — same philosophy, different targets, purposes, and governance

> **Remember:** It is a misconception that the Studio CLI agent is a tool "only for HITL, where a person must intervene every time." **When connected to workflows (Chapter 7), it becomes autonomous automation as-is.** So the difference is not *whether automation is possible*, but **who uses it (target), for what (purpose), and under what controls (governance).**

The two harnesses share **the same philosophy**: isolated sandbox + tool loop + observation and iteration. They diverge along three axes.

| Comparison axis | Claude Code harness | Studio CLI agent |
|---|---|---|
| **Target — who uses it** | Developer-centered | General users and semi-developers (business users) |
| **Purpose — what for** | Maximize local, project-level development automation | Organization-level deployment and frontline work improvement |
| **Governance and control** | Relatively free — local-centered work is possible; enterprises must provide controls separately | Only inside enterprise-controlled infrastructure — works with centrally deployed resources (knowledge, data, tools) |
| **Automation method** | Agent executes autonomously across multiple steps and judges completion itself | Default is human intervention (HITL); **autonomous execution when connected to workflows** (Chapter 7) — choose intervention or automation |
| **Inter-agent communication** | Multi-agent orchestration | Expands through connected agents (Chapter 5) |
| **Data and development integration** | Git-centered work | M365 ecosystem-centered (+ for developers, Git CI/CD and VS Code Extension support instructions and skill development) |

```
Claude Code harness   →  developers · free autonomous local execution (Agentic)
Studio CLI agent      →  business users · data integration inside enterprise governance + optional automation (Enterprise)
```

> **One-line summary:** The same harness philosophy is implemented for **different targets, purposes, and governance models**. Claude Code lets *developers execute autonomously and freely on their local projects*; Studio CLI lets *business users connect to data inside enterprise-controlled infrastructure and automate with workflows when needed*. This is not a superiority contest between HITL and automation; it is a difference in who uses it, for what, and under what controls.

### 10.3 Improvements over existing (Classic) Studio agents

They share the "Copilot Studio" name, but **the execution model itself is different.** Improvements visible from the runtime evidence in Chapter 9:

| Area | Classic Studio | New Studio CLI agent | Improvement |
|---|---|---|---|
| **Execution model** | Topic tree (conversation flow design) | Isolated container + agentic loop | Multi-step and long-running work; branch explosion resolved |
| **Knowledge handling** | Answers based on search snippets | Real-file download + Python large-scale processing | Large files +8.3, code interpreter +41.8 (NDA) |
| **Outputs** | Mostly text responses | Rich files such as Word/PPT/Excel/PDF (`created/`) | Dramatically broader output formats |
| **Tool execution** | Calls predesigned actions | Real-time tool loop with `bash`, `python`, and `grep` | Adaptation, retry, recursive execution |
| **Code execution** | None/limited | Preinstalled Python runtime (isolated) | Large-scale data analysis |
| **Memory** | Variables and topic state | Short-term `session-store.db` + long-term M365 | Context tracking and checkpoints |
| **Security boundary** | Platform governance | Per-session isolated container + sandbox user + engine blocking | Session isolation and least privilege |

> **FAQ response:** "Isn't it just an old bot with the same name?" → **No.** Classic was a tool for *drawing conversation flows*, while the New CLI agent is a runtime that *runs real tools, code, and files inside an isolated container for each session*. The "AI core rebuild" from Chapter 0 is evidenced by the container in Chapter 9.

---

---

## References

### Industry (public) — primary sources

- Anthropic Engineering, **Effective context engineering for AI agents** — attention budget, context rot, just-in-time, compaction, note-taking, sub-agents, tool design
- Anthropic Engineering, **Effective harnesses for long-running agents** — initializer + coding agent, feature list, incremental progress, clean state, browser E2E validation
- Anthropic Engineering, **Designing harnesses for long-running apps** — planner, generator, evaluator (GAN-style), "start from the simplest solution"
- Anthropic, **Building Effective Agents / Multi-agent research system / Writing tools for AI agents** — supplementary
- Anthropic Learn (anthropic.com/learn) — learning course
- Examples: Claude Code, GitHub Copilot CLI, OpenAI Codex CLI

---
