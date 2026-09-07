---
layout: chapter
lang: en
date: 2026-04-08
title: "Create agents with Agent Builder"
short_title: "Create agents with Agent Builder"
description: "Hands-on lab for declarative agents using Agent Builder"
order: 4
icon: "🤖"
category: workshop
parent: "ws4"
is_parent: true
---

# Copilot Studio lab - Create a declarative agent
---

# ✅ What is a declarative agent?

A **declarative agent** is an agent provided by the Microsoft 365 Copilot extensibility model that **defines behavior without code, using only Instructions**. It is designed so developers can run agents in the Copilot environment by **declaratively describing the rules and data source connections for handling user requests**, without complex programming.

In this section, you will create a declarative agent in Copilot Studio so beginners can easily build and operate an AI Agent for a specialized purpose.

---

## 🔍 Key characteristics
<br>

| Characteristic | Description |
|------|------|
| **Low-Code / No-Code** | Define behavior based on **Instructions** instead of code |
| **Microsoft 365 integration** | Connect naturally with SharePoint, OneDrive, Teams, and more |
| **Extensibility** | Integrate with various data sources and APIs |
| **Security** | Apply Microsoft 365 security and compliance policies as-is |

<br>

---

## 🛠 Main components
- **Instructions**: Rules that define what tasks the agent performs
- **Data source connections**: Search and summarize data from SharePoint, Dataverse, and more
- **Output formatting**: Provide user-friendly results such as Markdown, tables, and text

---

## ✅ Example uses
- **Document search agent**: Find and summarize specific reports in SharePoint
- **Statistical analysis agent**: Analyze Excel-based time-series data and provide insights
- **Business automation agent**: Handle repetitive tasks such as approval requests and email sending


## 🛠 Tools you can use to build declarative agents

The following table compares various tools for building declarative agents, including their characteristics and recommended use cases.

## 1. Tools and recommended use

| Tool | Coding level | Description | Recommended users |
|------|----------|------|-------------|
| **Copilot Agent Builder** | No-code | Create agents with simple configuration | Can be created directly from Copilot in Teams; suitable for general business users without code-centric development experience (onboarding, document Q&A, etc.) |
| **SharePoint Agents** | No-code | Agents that run in SharePoint/Teams | Business users who prioritize use of specific sites, libraries, and documents |
| **Copilot Studio** | Low-code | Drag-and-drop interface, Power Platform integration, advanced task support | Information workers who need business automation |
| **Microsoft 365 Agents Toolkit** | Pro-code | Includes advanced features (custom API actions, Adaptive Card, CI/CD, etc.) | Developers, or cases that require API extensions and source code control |

---

## 2. Requirements and deployment methods

<br>

| Tool | Requirements | Deployment target |
|------|----------|-----------|
| **Copilot Agent Builder** | Microsoft 365 Copilot license | Use within Microsoft 365 Copilot / Teams |
| **SharePoint Agents** | Microsoft 365 Copilot license + SharePoint site access | Direct deployment within a SharePoint site |
| **Copilot Studio** | Copilot Studio license (web-based, no separate installation required) | Deployable to Teams, web, and various channels |
| **Agents Toolkit** | Microsoft 365 subscription + sideloading enabled + Visual Studio/VS Code + Azure subscription (optional) | Deploy to organizations with Microsoft 365 Copilot licenses |


---

## 3. Pros and cons by tool

| Tool | ✅ Pros | ⚠️ Cons |
|------|---------|----------|
| **Copilot Agent Builder** | • Very simple setup<br>• Fast and simple RAG-based agent development | • Advanced settings such as actions and automation are not available<br>• Limited functionality |
| **SharePoint Agents** | • Can be customized around a specific library<br>• Instantly integrated with SharePoint and Teams | • Difficult to use outside SharePoint |
| **Copilot Studio** | • Low-code UI (drag and drop)<br>• Power Platform connections available | • Limited code control<br>• Weak CI/CD source management <br> |
| **Agents Toolkit** | • Environment for professional developers<br>• Flexible custom API support<br>• Adaptive Card support and CI/CD<br>• Early access to new features | • Limited Power Platform connection support<br>• Requires JSON editing without a UI<br>• Steep learning curve |


---

## ✅ Summary

- **No coding experience**: `Copilot Agent Builder` or `SharePoint Agents` – handle business tasks with simple configuration
- **Information workers/business domain experts**: `Copilot Studio Full` – implement complex logic with low code
- **Developers**: `Agents Toolkit` – suited to customization and CI/CD environments
- 
# ✅ Why effective Instructions matter and how to write them

## 🔍 Why are Instructions important?
- **Core element that determines agent behavior**: Instructions define what tasks Copilot performs and how it responds.
- **Improve user experience**: Clear and specific Instructions provide accurate answers and consistent results.
- **Maintain security and compliance**: Instructions can clearly set data access scope and processing rules.

---

## 🛠 Principles for writing effective Instructions <br>

| Principle | Description |
|------|------|
| **Clarity** | Avoid ambiguous expressions and specify concrete tasks and conditions. |
| **Conciseness** | Reduce unnecessary sentences and include only the core rules. |
| **Context** | Include required information such as data sources, output format, and exception handling. |
| **User friendliness** | Instruct the agent to provide results in intuitive formats such as tables and Markdown. |
| **Safety** | Specify compliance and security policies when handling sensitive data. |

---

## ✅ Example
<br>

**Purpose**: Search and summarize documents in SharePoint  
**Example Instructions**:
- Search SharePoint documents using the keyword requested by the user.
- Select the most relevant document from the search results.
- Summarize the key content in 3-5 lines, and show the original document name and location.
- Provide the output in Markdown table format.
<br>
---

## 📋 Lab sequence

| Step | Content | Link |
|------|------|------|
| **Step 1** | Create an agent and write Instructions | [Go now]({{ '/en/chapters/ws4-1-create-agent/' | relative_url }}) |
| **Step 2** | Add reference materials and capabilities | [Go now]({{ '/en/chapters/ws4-2-ref-feature/' | relative_url }}) |
| **Step 3** | Test and share the agent | [Go now]({{ '/en/chapters/ws4-3-test-share/' | relative_url }}) |
