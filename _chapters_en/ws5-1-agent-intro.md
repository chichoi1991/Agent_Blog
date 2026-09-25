---
layout: chapter
lang: en
date: 2026-04-22
title: "Agent introduction"
short_title: "Agent introduction"
description: "[Renewal] Explore the basic features of Copilot Studio - Introduction to the lab scenario and completed agent structure"
order: 1
category: workshop
parent: "ws5"
---

## Step 1: Agent introduction

# Copilot Studio custom engine agent — Extend the blog posting agent

This integrated workshop extends the [**blog posting agent**](https://github.com/chichoi1991/Copilot_Agent/tree/main/%EC%BD%94%ED%8C%8C%EC%9D%BC%EB%9F%BF%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20%EC%9B%8C%ED%81%AC%EC%83%B5/%EC%BD%94%ED%8C%8C%EC%9D%BC%EB%9F%BF%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20Lite) from the Copilot Studio lite lab
into a **custom engine agent** that covers **email sending, Teams posts, external MCP calls, Flows/Triggers, prompt tools, and Excel data usage** all at once.

<img width="1861" height="1392" alt="image" src="{{ '/assets/image/github-attachments/dd2943fa-454d-4d49-ada3-f9df313cf34a.png' | relative_url }}" />

<br><br>

This workshop proceeds through the following tasks in order.

1. **Create an agent** and configure basic Instructions
2. Add **Knowledge** — SharePoint, web
3. Add **Tools** — MCP tools, connectors, external (private) MCP
4. **Automation** — Connect Power Automate Flows + Triggers
5. Generate consistent HTML responses with a **prompt tool**
6. Combine **Excel-based data filtering** + an analysis prompt
7. **Publish and deploy to Teams channels**

<br>

---

## ✅ What is a custom engine agent?

| Item | Description |
|------|------|
| **Definition** | An agent that directly uses LLM orchestration inside Copilot Studio. It works as a combination of **Instructions + tools + Knowledge** |
| **Difference from declarative agents** | Declarative agents are lightweight agents that run on Microsoft 365 Copilot. Custom engine agents can freely configure **their own model/tools/Flows** |
| **Advantages** | Use rich tools such as MCP, connectors, Flows, prompts, and code interpreter. Deployable to Teams/Web/Custom channels |
| **Example uses** | Blog/newsletter writing, internal document search, appliance/IoT control, time-series data analysis, automated email sending, and more |

<br>

> You can find details about the differences between custom engine agents and declarative agents in the [workshop overview](https://github.com/chichoi1991/Copilot_Agent/blob/main/%EC%BD%94%ED%8C%8C%EC%9D%BC%EB%9F%BF%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20%EC%9B%8C%ED%81%AC%EC%83%B5/README.md).

<br>

---

## 📋 Preview of next steps

| | Step | Description |
|--|------|------|
| ⚙️ | [Step 2. Basic Instructions setup]({{ '/en/chapters/ws5-2-instructions/' | relative_url }}) | Write the agent name, description, and basic Instructions |
| 📚 | [Step 3. Add Knowledge]({{ '/en/chapters/ws5-3-knowledge/' | relative_url }}) | Connect SharePoint and web search |
| 🔗 | [Step 4. Add MCP tools]({{ '/en/chapters/ws5-4-tool-mcp/' | relative_url }}) | Built-in MCP (email management) |
| 🔌 | [Step 5. Connector (send email)]({{ '/en/chapters/ws5-5-tool-connector/' | relative_url }}) | Add a general plugin connector |
| 🌐 | [Step 6. External MCP tool]({{ '/en/chapters/ws5-6-external-mcp/' | relative_url }}) | Connect a URL-based private MCP server |
| 🔁 | [Step 7. Flow]({{ '/en/chapters/ws5-7-tool-flow/' | relative_url }}) | Add a Power Automate Flow |
| ⏰ | [Step 8. Trigger]({{ '/en/chapters/ws5-8-trigger/' | relative_url }}) | Event-based automatic execution |
| 🤖 | [Step 9. Prompt tool]({{ '/en/chapters/ws5-9-ai-prompt/' | relative_url }}) | Standardize HTML responses with AI Prompt |
| 📊 | [Step 10. Excel data]({{ '/en/chapters/ws5-10-excel-filter/' | relative_url }}) | Combine Excel filtering + analysis prompt |
| 🚀 | [Step 11. Deployment]({{ '/en/chapters/ws5-11-deploy/' | relative_url }}) | Publish and connect a Teams channel |

---

← [Back to overview]({{ '/en/chapters/ws5-0-overview/' | relative_url }}) | [Next: Step 2. Basic Instructions setup]({{ '/en/chapters/ws5-2-instructions/' | relative_url }}) →
