---
layout: chapter
lang: en
date: 2026-04-17
title: "Business Data + Work IQ Combination Agent"
short_title: "Special Workshop: Business Agent"
description: "Hands-on lab for building an agent that combines internal business data with external economic indicators to support the CEO's strategic decision-making"
order: 1
category: special
parent: "sp1"
is_parent: true
---

# Special Workshop: Building a Business Data + Work IQ Combination Agent

## A management decision-support agent for CEOs

In this special workshop, you will build an agent that integrates **internal SharePoint documents, Microsoft 365 communication data, U.S. economic indicators, and IoT appliance data** in a single agent to support executive decision-making.

Unlike the foundational workshops, this workshop focuses on **complex analysis scenarios that combine multiple data sources**.

<br>

---

## 🎯 Implementation goals

| Item | Details |
|------|------|
| **Target users** | CEO / executives |
| **Core features** | Cross-analysis of internal documents + external economic indicators, email trend summaries, management decision email drafts, appliance control |
| **Architecture** | Autonomous orchestration based on Instructions + Tools (minimizing flows and topics) |
| **Deployment channel** | Microsoft Teams |

<br>

---

## 🔧 Tools used

| Tool type | Tool name | Purpose |
|-----------|--------|------|
| **Pre-built (Work IQ)** | Work IQ Mail MCP | Search emails, draft and send messages |
| **Pre-built (Work IQ)** | Work IQ Teams MCP | Teams messages and adaptive card notifications |
| **Pre-built (Work IQ)** | Work IQ Copilot MCP | M365 enterprise search (fallback) |
| **Custom MCP** | FRED Economic MCP | Query U.S. economic indicators (5 themes + search) |
| **Custom MCP** | ThinQ MCP | Query and control LG IoT appliances, analyze energy usage |
| **Knowledge source** | SharePoint | Internal strategy documents, reports, and market research |

<br>

---

## 📋 Lab agenda

| Part | Details | Duration |
|------|------|-----------|
| **Part 1** | [Create the agent and write Instructions]({{ '/en/chapters/sp1-1-instructions/' | relative_url }}) | 20 minutes |
| **Part 2** | [Add pre-built tools (Work IQ MCP)]({{ '/en/chapters/sp1-2-prebuilt-tools/' | relative_url }}) | 15 minutes |
| **Part 3** | [Add custom tools (FRED MCP + ThinQ MCP)]({{ '/en/chapters/sp1-3-custom-tools/' | relative_url }}) | 25 minutes |
| **Part 4** | [Add an email-received trigger]({{ '/en/chapters/sp1-4-trigger/' | relative_url }}) | 15 minutes |

<br>

---

## 🧠 Scenarios you can use after completion

After you finish building the agent, it can handle complex questions like these:

| Scenario | Example user question | Combined tools |
|----------|-----------------|--------------|
| **Market strategy review** | "Review our North America market strategy" | SharePoint + FRED (GDP, consumer sentiment) |
| **Cost policy planning** | "Reevaluate our pricing policy based on commodity price changes" | SharePoint + FRED (exchange rates, PPI) |
| **Investment decision-making** | "Is this the right timing for a factory expansion?" | SharePoint + FRED (interest rates, industrial production) |
| **Email trend validation** | "Summarize recent reporting emails and compare them with market conditions" | Mail MCP + FRED |
| **Management decision email** | "Draft an email with my decision opinion on this issue" | FRED + SharePoint + Mail MCP + Teams |
| **Automated email handling (trigger)** | Automatically analyze a new email → draft a response → notify in Teams | Trigger + FRED + SharePoint + Mail + Teams |

<br>

---

## ⚡ Prerequisites

| Item | Description |
|------|------|
| **Access to Copilot Studio** | [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com) |
| **Microsoft 365 account** | Organizational account with access to Teams, Outlook, and SharePoint |
| **FRED API Key** | Provided separately during the lab |
| **ThinQ PAT** | Provided separately during the lab |

> **Note:** API keys are provided separately for security reasons. In real production use, issue and use individual keys.

<br>

Now, let's start with Part 1! ➡️ [Part 1: Create the agent and write Instructions]({{ '/en/chapters/sp1-1-instructions/' | relative_url }})
