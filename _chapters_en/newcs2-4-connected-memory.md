---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 2 · Connected Agents & Memory"
short_title: "Connected Agents & Memory"
description: "Connected agents for context isolation, and two-layer short-term/long-term memory."
order: 4
category: "newcs"
parent: "ncs2"
---

## 5. Connected agents — context isolation

<div class="info-box note" markdown="1">
**▶ Point** — The essence of sub-agents is "context isolation" (Part 1, Chapter 5). When a specialist agent works deeply in a clean context and **returns only a summary**, the main agent stays clean. Instead of Classic child agents, compose with **"skills + connected agents."**
</div>

### 5.1 Concept — why split work?

- If the main agent handles everything in its own context, that context becomes polluted during long and complex work.
- Even if a specialist sub-agent explores deeply using tens of thousands of tokens, it **returns only a compressed summary (1–2K tokens)** → the main agent focuses on synthesis (Part 1, 5.1, "separation of concerns").

### 5.2 When to split — separation signals

A single agent is often enough, but split into specialist agents when you see the following signals.

```
Main (orchestrator)
├── Analysis specialist   ← digs deeply into data and returns only a "key summary"
└── Writing specialist    ← handles formats and templates and returns only the "finished output"
```

| Signal that splitting may help | Description |
|---|---|
| One task consumes a large amount of context | Broad, multi-angle data analysis |
| Specialist rules are thick | Extensive design or policy rules |
| Parallelism pays off | Two tasks can proceed at the same time |

The key is that the specialist agent **works deeply but returns only a summary**, keeping the main agent's context clean (Part 1, 5.1).

### 5.3 Current guidance

- First **separate into skills** (lightest option), and if context is still heavy, promote to **connected agents**.
- Child agents were weak at interruptions and intent shifts, but skill + connected composition is strong for multi-intent requests such as "do A and also B" (Part 1, 5.2).

> **Remember:** Do not over-engineer with multiple agents from the start (Part 1, 1.4). Start with a single agent + skills, and split only when context actually becomes heavy.

---

---

## 6. Memory — two short-term/long-term layers

<div class="info-box note" markdown="1">
**▶ Point** — Memory has two layers (Part 1, 9.6). **Short-term** = conversation history inside the session container (destroyed when the session ends); **long-term** = M365 cloud (maintained across sessions). Makers only need to remember one thing: "cross-session memory lives on the M365 side."
</div>

### 6.1 Concept — two-layer structure

```
M365 cloud (long-term, persistent)      ← maintained across sessions: profile, settings, Copilot memory
        │  injected at session start
Container /app (short-term, per session)← destroyed when session ends: conversation turns, processed files
```

| Category | Location | After session ends |
|---|---|---|
| Current conversation turns | Session container | ❌ destroyed |
| Generated files | Session container | ❌ destroyed |
| User profile and memory | M365 cloud | ✅ retained |

> **Analogy:** Container = RAM (temporary), M365 = HDD (persistent). The container is RAM that starts fresh for each session, so memory that must continue must live in the cloud (Part 1, 9.6).

### 6.2 RAG is applied to conversations too (Part 1, 9.7)

When a session becomes long and old conversation turns are pushed out of context, the agent **searches and retrieves in-session conversations** ("what was the filename of the PPT we made earlier?" → search past turns). The goal is not storage, but **augmenting the context window**.

### 6.3 What makers actually need to do

- In most cases, **there is nothing to worry about** — the core automatically maintains in-session context.
- **If memory must persist across sessions**, design so that data lives in M365 (profile, SharePoint, etc.).
- Example: analysis results and generated files are session-scoped, so to keep outputs permanently, **save them to OneDrive/SharePoint** (connected to the tools in Chapter 3).

> **Remember:** Do not misunderstand "memory enhancement" as a feature toggle. Its essence is two things: (1) automatic tracking within the session, and (2) placing data in M365 when persistence is needed.

---
