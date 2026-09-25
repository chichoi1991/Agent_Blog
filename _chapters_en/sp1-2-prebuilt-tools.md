---
layout: chapter
lang: en
date: 2026-04-16
title: "Part 2: Add pre-built tools"
short_title: "Pre-built tools"
description: "Special workshop - Add Work IQ MCP (Mail, Teams, Copilot) pre-built tools"
order: 2
category: special
parent: "sp1"
---

## Part 2: Add pre-built tools (Work IQ MCP)

> **Previous step:** [Part 1: Write Instructions]({{ '/en/chapters/sp1-1-instructions/' | relative_url }}) | **Next step:** [Part 3: Add custom tools]({{ '/en/chapters/sp1-3-custom-tools/' | relative_url }})

---

In this part, you will add three Microsoft-provided **Work IQ MCP** tools to the agent.
These tools let the agent access the user's Microsoft 365 environment (email, Teams, and Copilot search).

<br>

---

## 1. Enable Work IQ

On the agent overview screen, enable **Work IQ** under **Tools**.

When you enable this feature:
- The agent can also explore information that is not in references through M365 Copilot enterprise search (fallback)
- Work IQ-based MCP tools can be added directly from the catalog

<br>

---

## 2. Add Work IQ Mail MCP

### 2-1. Start adding the tool

1. In the top **Tools** section, select **+ Add a tool** → the **MCP** tab.
2. Scroll and select **WorkIQ Mail MCP**.

### 2-2. Configure the connection

A new connection is required the first time:
1. Click **Connect**.
2. Authenticate with the currently signed-in Microsoft 365 account.
3. Select **Add and configure**.

### 2-3. Check the tool list

When the connection succeeds, the tools below are enabled:

| Tool name | Description | Purpose in this agent |
|--------|------|----------------------|
| `SearchMessagesQueryParameters` | Search emails based on a search query | Search reporting and trend emails |
| `CreateDraft` | Create an email draft | Write management decision-opinion emails |
| `UpdateDraft` | Update a draft | Revise drafts |
| `AddDraftAttachments` | Add attachments to a draft | Attach reports |
| `SendEmailWithAttachments` | Send with attachments | Final sending |

> **Tip:** Keep all tools enabled. The Instructions already define which tools to use, so the agent autonomously selects the appropriate tool.

<br>

---

## 3. Add Work IQ Teams MCP

### 3-1. Add the tool

1. Select **+ Add a tool** → the **MCP** tab → **WorkIQ Teams MCP**.
2. Configure the connection the same way as before.

### 3-2. Key tools

| Tool name | Description | Purpose in this agent |
|--------|------|----------------------|
| `SendMessageToSelf` | Send a message to yourself | **Send adaptive card notifications** (last step in every scenario) |
| `SearchMessages` | Search Teams messages | Understand cross-team communication |
| `GetChannelMessages` | Get channel messages | Collect discussion content from a specific channel |

> **Key point:** `SendMessageToSelf` is used as the last step in all complex scenarios (A-E) for this agent. It lets the CEO immediately review the analysis results in Teams as an adaptive card.

<br>

---

## 4. Add Work IQ Copilot MCP

### 4-1. Add the tool

1. Select **+ Add a tool** → the **MCP** tab → **WorkIQ Copilot MCP**.
2. Configure the connection.

### 4-2. Role

| Tool name | Description | Purpose in this agent |
|--------|------|----------------------|
| `CopilotSearch` | Search across all of M365 | **Fallback**: when the answer cannot be found in SharePoint + Teams/Mail |

> **Caution:** In the Instructions, this tool is defined as **second priority**. It is called only when an appropriate answer cannot be found from the first priority sources (SharePoint + Teams/Mail).

<br>

---

## 5. Connect Knowledge sources

Add the SharePoint site's document libraries as Knowledge sources.

### 5-1. Add a Knowledge source

Go to agent settings → the **Knowledge** section → **+ Add knowledge** → select **SharePoint**.

### 5-2. SharePoint sites to add

| Knowledge source name | SharePoint path | Included documents |
|------------|----------------|-----------|
| **General** | General Shared Documents | Internal policies, general materials |
| **Marketing** | Marketing Shared Documents | Marketing strategy, campaign materials |
| **Sales** | Sales Shared Documents | Sales reports, sales strategy |
| **Market Research** | Market Research Shared Documents | Market research, competitor analysis |
| **Project Collaboration** | Project Collaboration Shared Documents | Project plans, CAPEX documents |

Enter the URL for each site and click **Add**.

<br>

---

## ✅ Part 2 completion checklist

- [ ] Has Work IQ been enabled?
- [ ] Has Work IQ Mail MCP been connected, and are all tools enabled?
- [ ] Has Work IQ Teams MCP been connected, and is the `SendMessageToSelf` tool enabled?
- [ ] Has Work IQ Copilot MCP been connected?
- [ ] Have all five SharePoint Knowledge sources been added?

In the next step, you will add custom MCP tools. ➡️ [Part 3: Add custom tools]({{ '/en/chapters/sp1-3-custom-tools/' | relative_url }})
