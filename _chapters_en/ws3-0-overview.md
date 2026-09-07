---
layout: chapter
lang: en
date: 2026-04-08
title: "Custom Agent Fundamentals #3"
short_title: "Fundamentals #3: Autonomous agent"
description: "Hands-on workshop for an agent that operates autonomously using only Instructions, Tools, and MCP"
order: 3
category: workshop
parent: "ws3"
is_parent: true
---

# Custom Engine Agent Fundamentals #3

## Implement an autonomous agent centered on Instructions and Tools

In this workshop, you will **minimize the use of Flows, variables, and Topics** and build an autonomous custom engine agent that determines and executes its own flow using only agent Instructions, Tools, and MCP.

<br>

---

## 🎯 Implementation goals

| Item | Details |
|------|------|
| **Architecture direction** | Minimize use of Flows, variables, and Topics → autonomous orchestration based on Instructions + Tools + MCP |
| **Agent deployment** | Create and configure in Copilot Studio, then publish to a Microsoft Teams channel |
| **Monitoring** | Monitor conversations in Studio (if time allows) |

<br>

---

## 🧠 Agent knowledge sources

The agent uses the following knowledge sources to answer user questions.

| Knowledge source | Type | Notes |
|-----------|------|------|
| **Email** | Microsoft 365 connector | Search and send from the user's mailbox |
| **SharePoint (Word documents)** | SharePoint Knowledge connection | Basic workshop target |
| **SharePoint (Excel data)** | SharePoint + AI Prompt tool | Advanced workshop target |
| **ThinQ MCP** | MCP server connection | Look up LG home appliance product data |

<br>

---

## 📋 Workshop scenario and agenda

### Step 1 · Create an agent and configure the basics
- Create a new custom engine agent in Copilot Studio
- Set the agent name, icon, and default language
- Write agent Instructions
  - Define role and persona
  - Provide instructions for tool-use priority and response style
  - Write instruction patterns that encourage autonomous orchestration

### Step 2 · Connect knowledge sources
- Register SharePoint documents (Word) as a Knowledge source

### Step 3 · Add an MCP tool — ThinQ MCP
- Learn how to connect the ThinQ MCP server
- Review the MCP tool list and add tools to the agent
- Test home appliance product data lookup
- **Learning point:** Understand the pattern for connecting external data sources through MCP without code

### Step 4 · Add Work IQ MCP and configure the workflow
- Connect the Work IQ MCP server
- Practice controlling the order and conditions for MCP tool calls through Instructions
- Learn the pattern for configuring multi-step workflows using only Instructions, without Flows
- **Learning point:** How agents combine Tools on their own to execute workflows

### Step 5 · Add an AI Prompt tool — HTML response template
- Add an AI Prompt tool (Generative Actions)
- Design prompts that output a fixed HTML layout
- Apply HTML card-style answers to agent responses
- **Learning point:** Use AI Prompt tools to implement consistently designed response formats

### Step 6 · Excel data filtering + AI Prompt integration (advanced)
- Connect an Excel data source uploaded to SharePoint
- Implement row filtering logic in Instructions based on user level and context
- Pass filtered row data to the AI Prompt tool to generate customized answers
- **Learning point:** Pattern for connecting structured data (Excel) ↔ generative AI (AI Prompt)

### Step 7 · Deploy to a Teams channel
- Publish the agent and register it in a Teams channel
- Validate agent behavior in the channel
- (Optional) Check conversation logs on the Copilot Studio monitoring tab

<br>

---

## 🗂️ Workshop table of contents

| # | Workshop content | Time required |
|---|-----------|-----------|
| 1 | Create an agent and write Instructions | 15 min |
| 2 | Connect knowledge sources (SharePoint · email) | 10 min |
| 3 | Add the ThinQ MCP tool | 15 min |
| 4 | Configure Work IQ MCP and workflow | 20 min |
| 5 | Design AI Prompt tool and HTML response | 20 min |
| 6 | Excel data filtering + AI Prompt integration (advanced) | 20 min |
| 7 | Deploy and test in a Teams channel | 10 min |

<br>

---

## 💡 Differences from previous workshops

| | Fundamentals #2 | **Fundamentals #3 (this workshop)** |
|---|--------|------------------------|
| **Orchestration** | Topic- and Flow-centered | **Instructions-, Tools-, and MCP-centered** |
| **Logic implementation method** | Power Automate Flow | Autonomous decisions through agent Instructions |
| **Data sources** | SharePoint documents | SharePoint + MCP + Excel |
| **Response format** | Text | **HTML card template** |
| **Deployment target** | Teams (personal chat) | **Teams channel** |

<br>

---

## 🔧 Prerequisites

Before the workshop, check the following items.

- [ ] Microsoft 365 license (including Copilot Studio access)
- [ ] SharePoint site created and workshop Word/Excel files uploaded
- [ ] ThinQ MCP server connection information confirmed
- [ ] Work IQ MCP server connection information confirmed
- [ ] Microsoft Teams channel created (target deployment channel)

<br>

---

> Previous workshop materials:
> [Custom Agent Fundamentals #1](../커스텀%20에이전트%20만들기-기초%231/README.md) · [Custom Agent Fundamentals #2](../커스텀%20에이전트%20만들기-기초%232/readme.md)


---

---

## 📋 Workshop steps

| | Step | Description |
|--|------|------|
| ⚙️ | [Step 1. Create an agent]({{ '/en/chapters/ws3-1-create-agent/' | relative_url }}) | Create an agent and write Instructions |
| 📂 | [Step 2. Connect knowledge sources]({{ '/en/chapters/ws3-2-knowledge/' | relative_url }}) | Connect knowledge sources |
| 📧 | [Step 3. Work IQ MCP]({{ '/en/chapters/ws3-3-workiq-mcp/' | relative_url }}) | Add Work IQ MCP tools |
| 📱 | [Step 4. ThinQ MCP]({{ '/en/chapters/ws3-4-thinq-mcp/' | relative_url }}) | Add ThinQ MCP tools |
| 🤖 | [Step 5. AI Prompt tool]({{ '/en/chapters/ws3-5-ai-prompt/' | relative_url }}) | Add an AI Prompt tool |
| 📊 | [Step 6. Excel filtering]({{ '/en/chapters/ws3-6-excel-filter/' | relative_url }}) | Filter Excel data (advanced) |
| 🚀 | [Step 7. Teams deployment]({{ '/en/chapters/ws3-7-teams-deploy/' | relative_url }}) | Deploy to Teams |
