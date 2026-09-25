---
layout: chapter
lang: en
date: 2026-04-08
title: "References and extension directions"
short_title: "References"
description: "Summarizes Copilot Studio official documentation, Power Automate integration resources, external system integration references, and future extension architecture directions."
order: 8
category: guide
---

## 1. Copilot Studio official documentation

### 1.1 Core documents

| Document | Description | Link |
|---|---|---|
| **Copilot Studio overview** | Product introduction and feature overview | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/fundamentals-what-is-copilot-studio) |
| **Quickstart guide** | Tutorial for creating your first agent | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/fundamentals-get-started) |
| **Explore AI capabilities** | Generative Orchestration, Answers, Builder, and more | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/guidance/ai-capabilities) |
| **Topic design** | Guide to topic creation and conversation flow design | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-create-edit-topics) |
| **Knowledge configuration** | Connect and manage data sources | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-copilot-studio) |
| **Actions configuration** | Guide to connectors, flows, and HTTP integration | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-plugin-actions) |
| **Using variables** | Topic/global/system variable guide | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-variables) |
| **Generative Orchestration** | Guide to LLM-based autonomous orchestration | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-generative-actions) |
| **Publish and deploy** | Deployment methods by channel | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/publication-fundamentals-publish-channels) |
| **Analytics and monitoring** | How to use Analytics | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/analytics-overview) |
| **Billing and licensing** | Copilot Credits billing rates | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/requirements-messages-management) |
| **Quotas and limits** | Feature-specific limits and quotas | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/requirements-quotas) |
| **Licensing guide** | Details by license type | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/billing-licensing) |
| **Responsible AI FAQ** | FAQ related to responsible AI usage | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/responsible-ai-overview) |

### 1.2 Governance and security

| Document | Link |
|---|---|
| **Copilot Studio governance principles** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/copilot-studio-experience#copilot-studio-governance-principles) |
| **DLP (Data Loss Prevention) policies** | [Learn](https://learn.microsoft.com/ko-kr/power-platform/admin/wp-data-loss-prevention) |
| **Authentication settings** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/configuration-end-user-authentication) |

### 1.3 Developer tools

| Document | Link |
|---|---|
| **VS Code extension** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/visual-studio-code-extension-overview) |
| **Power Fx formulas** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-power-fx) |
| **Agent usage estimator** | [Tool](https://microsoft.github.io/copilot-studio-estimator/) |

---

## 2. Power Automate integration documents

| Document | Link |
|---|---|
| **Power Automate overview** | [Learn](https://learn.microsoft.com/ko-kr/power-automate/) |
| **Copilot Studio integration flows** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-flow) |
| **Connector reference** | [Learn](https://learn.microsoft.com/ko-kr/connectors/connector-reference/) |
| **Create custom connectors** | [Learn](https://learn.microsoft.com/ko-kr/connectors/custom-connectors/) |

### 2.1 Frequently used connectors

| Connector | Link |
|---|---|
| **Office 365 Outlook** | [Learn](https://learn.microsoft.com/ko-kr/connectors/office365/) |
| **Microsoft Teams** | [Learn](https://learn.microsoft.com/ko-kr/connectors/teams/) |
| **SharePoint** | [Learn](https://learn.microsoft.com/ko-kr/connectors/sharepointonline/) |
| **Dataverse** | [Learn](https://learn.microsoft.com/ko-kr/connectors/commondataserviceforapps/) |

---

## 3. References for external system integration

### 3.1 MCP (Model Context Protocol)

| Resource | Description |
|---|---|
| **MCP official site** | MCP protocol specification and guide — [modelcontextprotocol.io](https://modelcontextprotocol.io) |
| **Copilot Studio MCP integration** | How to connect MCP servers as tools in Copilot Studio |

### 3.2 Tool selection comparison

| Resource | Link |
|---|---|
| **Copilot Studio vs Agent Builder vs Agents Toolkit** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/declarative-agent-tool-comparison) |
| **Copilot Studio vs M365 Copilot selection guide** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/copilot-studio-experience) |
| **Extend from Agent Builder to Studio** | [Learn](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/copy-agent-to-copilot-studio) |

---

## 4. Architecture directions for future extension

This section guides the phased architecture for expanding an organization's AI agent capabilities based on Copilot Studio.

### 4.1 Phase 1: Single agent (initial adoption)

```
[User] → [Copilot Studio Agent]
                 ↓
         [Knowledge] + [Actions]
```

One agent handles a specific business task. Implement basic capabilities with Knowledge + standard connectors.

### 4.2 Phase 2: Multiple agents + automation (mid-term extension)

```
[User] → [HR Agent] ← SharePoint (HR policies)
         → [IT Agent] ← ServiceNow API
         → [Finance Agent] ← ERP connector
                 ↓
         [Power Automate automation flow]
```

Build **specialized agents** for each business domain and add cross-system automation through Power Automate.

### 4.3 Phase 3: Integrated orchestration (long-term strategy)

```
[User] → [Integrated Agent (router)]
                 ↓ (intent classification)
         [HR Agent] [IT Agent] [Finance Agent]
                 ↓
         [MCP server] + [Azure Functions] + [Custom Engine]
                 ↓
         [Internal DB] [External API] [IoT devices]
```

A single **integrated agent identifies user intent** and routes to specialized agents. Connect a variety of external tools flexibly through the MCP protocol, and apply a Custom Engine Agent only where needed.

### 4.4 Core principles for extension

| Principle | Description |
|---|---|
| **Gradual extension** | Expand step by step based on success cases |
| **Domain separation** | Define a clear business domain for each agent |
| **Reusable design** | Design Knowledge, actions, and flows as reusable units |
| **Governance first** | Establish the management framework (ownership, change management, monitoring) before extension |
| **Security by design** | Apply the principle of least privilege + authentication at every integration point |

<div class="info-box tip">
<b>💡 Practical tip — decision criterion for extension</b><br>
Judge architecture extension based on <b>"can the organization manage it?"</b>, not <b>"is it technically possible?"</b> Even if you can create 10 agents, without the people and processes to maintain them, they will create confusion instead. The key is to <b>grow together with management capability</b>.
</div>

<div class="info-box note">
<b>📌 About this guide</b><br>
This guide was written from a <b>practical perspective</b> on building agents with Microsoft Copilot Studio. Because product capabilities are continuously updated, also refer to the latest <a href="https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/" target="_blank">official documentation</a>. Also check the <a href="https://learn.microsoft.com/ko-kr/power-platform/release-plan/2025wave1/microsoft-copilot-studio/" target="_blank">new feature plans</a> for the 2025 Release Wave and 2026 Release Wave.
</div>
