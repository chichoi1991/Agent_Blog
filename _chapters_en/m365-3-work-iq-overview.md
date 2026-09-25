---
layout: chapter
lang: en
date: 2026-08-05
title: "Introducing Work IQ — organizational intelligence for every agent"
short_title: "Introducing Work IQ"
description: "Work IQ is the brain of organizational intelligence, understanding context, relationships, and work patterns. This article introduces its architecture, security and compliance, benefits, and the A2A, MCP, and REST lab series."
order: 3
category: m365
tags: ["Work IQ", "Microsoft IQ", "MCP", "A2A", "REST"]
---

<div class="info-box note" markdown="1">

**▶ One-line summary** — Work IQ is the **brain of organizational intelligence**, understanding your organization's context, relationships, and work patterns. It makes Copilot and agents faster, more accurate, and safer. **Any agent, on any technology stack**, can consume organizational intelligence through A2A, MCP, or REST.
</div>

> **Translated article** — This article is based on [Copilot Developer Camp — Work IQ](https://microsoft.github.io/copilot-camp/pages/work-iq/) from Microsoft.

Work IQ is the **"brain"** behind organizational intelligence, understanding context, relationships, and work patterns. As a result, Copilot and agents become faster, more accurate, and safer. With Work IQ, you can **open your organization's intelligence to every agent**, and in practice, any agent on any technology can consume organizational intelligence.

---

## Understanding Work IQ

<figure class="screenshot">
  <img src="{{ '/assets/image/workiq/workiq-00-architecture.png' | relative_url }}" alt="Work IQ architecture diagram">
  <figcaption>Work IQ architecture — Chat, Context, Tools, Workspaces, and the A2A / MCP / REST consumption paths</figcaption>
</figure>

From an architecture perspective, Work IQ consists of the following components.

| Component | Description |
|-----------|------|
| **Chat** | A chat experience optimized for conversational intelligence |
| **Context** | Understands user preferences, work style, and desired response format |
| **Tools** | Helps agents provide more relevant answers and perform composable actions that match the user's habits and expectations |
| **Workspaces** | Optimized for long-running agent workflows and reliable task progress |

Third-party agents can consume Work IQ through different protocols as needed.

| Protocol | Purpose |
|----------|------|
| **A2A** | Agent-to-agent patterns |
| **MCP** | Agent-to-tool patterns |
| **REST** | Human/device-to-agent patterns |

---

## Security, privacy, and compliance

Work IQ is designed from the ground up to respect enterprise security requirements.

- **Permission inheritance** — Honors existing user permissions, security group assignments, and sensitivity labels.
- **Data loss prevention (DLP)** — Complies with DLP policies across all Work IQ operations.
- **Regulatory compliance** — Complies with GDPR, the EU Data Boundary, and regional legal requirements.

---

## Benefits of Work IQ

| Benefit | Details |
|------|------|
| **Intelligence** | Goes beyond basic search. By combining semantic understanding, personal/organizational memory, structured file context, and domain tuning, agents reason with fresher and richer signals about people, roles, and collaboration. |
| **Speed** | Designed around agent response time. It reduces network hops, lowers context access latency, and simplifies tool use into **10 MCP-based primitives**, so agents move from analysis to action faster. |
| **Efficiency** | Performs more processing inside the runtime to reduce token consumption. Instead of dumping raw records, it returns **concise, structured output** that agents can easily consume and further cleans up noisy identifiers. |
| **Scale** | Designed for persistent, high-volume agent workloads. It supports deeper multi-step automation patterns and the throughput required as many agents come online. |
| **Security** | Keeps work **inside the Microsoft 365 trust boundary** with inherited permissions, auditability, and governance-ready controls. |

---

## Work IQ lab series

This series consists of hands-on labs that cover Work IQ across core development patterns. It walks through Work IQ setup and the CLI, using it with GitHub Copilot CLI, Work IQ A2A, Work IQ MCP, and Work IQ REST in order, exploring how to design, connect, and operate Work IQ capabilities for different integration models and agent architectures.

| Lab | Topic | Key content |
|----|------|-----------|
| 🧭 [WIQ01 — Setup and CLI]({{ '/en/chapters/m365-4-work-iq-setup-and-cli/' | relative_url }}) | Tenant setup + CLI | Install and authenticate the Work IQ CLI; connect it to GitHub Copilot CLI as an MCP server |
| 🤝 [WIQ02 — A2A protocol]({{ '/en/chapters/m365-5-work-iq-a2a/' | relative_url }}) | Agent-to-agent | Query Agent Cards, build a .NET client, consume an A2A agent from Copilot Studio |
| 🔌 [WIQ03 — MCP protocol]({{ '/en/chapters/m365-6-work-iq-mcp/' | relative_url }}) | Agent-to-tool | MCP Inspector and VS Code connections, 10 primitive tools, C# MCP client |
| 🌐 [WIQ04 — REST protocol]({{ '/en/chapters/m365-7-work-iq-rest/' | relative_url }}) | Human/device-to-agent | Create conversation threads, send messages, handle streaming responses |

As the platform evolves, more labs will be added. Future articles will include **Microsoft IQ integrated scenarios** spanning Work IQ, Foundry IQ, Fabric IQ, and Web IQ, as well as in-depth implementation guides for advanced enterprise use cases.

👉 Start with [Lab WIQ01 — Get started with Work IQ setup and CLI]({{ '/en/chapters/m365-4-work-iq-setup-and-cli/' | relative_url }}).

---

## 📚 References

- 📖 [Work IQ — Microsoft Learn](https://learn.microsoft.com/microsoft-365/work-iq/)
- 🏕️ [Original: Copilot Developer Camp — Work IQ](https://microsoft.github.io/copilot-camp/pages/work-iq/)
