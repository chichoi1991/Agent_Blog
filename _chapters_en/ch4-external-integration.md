---
layout: chapter
lang: en
date: 2026-04-08
title: "Integration methods for external (internal/external) systems"
short_title: "External system integration"
description: "Covers external system integration strategies from a practical perspective, including Power Automate integration, use of standard connectors, HTTP-based API integration, and authentication methods."
order: 4
category: guide
---

## 1. Power Automate integration

Power Automate is the automation tool that integrates **most naturally** with Copilot Studio. You can separate work that is difficult for an agent alone to handle, such as complex business logic, multi-step approvals, and external system calls.

> 📖 **Reference**: [Call Power Automate flows](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-flow) · [Agent flows overview](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/flows-overview)

### 1.1 Direct connector calls vs Power Automate flows

| Category | Direct connector call | Power Automate flow |
|---|---|---|
| **Complexity** | Single task (one API call) | Multi-step processing (conditions, loops, parallelism) |
| **Error handling** | Basic support | Fine-grained control such as try-catch |
| **Response speed** | Several to dozens of ms | Hundreds of ms to several seconds |
| **Suitable scenarios** | Send mail, send messages, simple lookup | Approval workflows, data aggregation, multi-system integration |

### 1.2 Key cautions when connecting Power Automate

| Caution | Description |
|---|---|
| **100-second limit** | Agent → Flow execution must return results within 100 seconds. Timeout if exceeded |
| **Same environment required** | Agent and Flow must be in the **same Power Platform environment** to connect |
| **Trigger** | When creating a flow, you must use the **"Run a flow from Copilot"** trigger |
| **Include in solution** | Include the Flow in a solution for managed deployment |
| **Billing rail change** | After conversion to Copilot Studio Plan, it **cannot be reverted to a PA license** (see Ch1) |

<div class="info-box tip">
<b>💡 Practical tip — Flow optimization</b><br>
<ul>
<li><b>Remove unnecessary Flow calls</b>. If a task can be handled with a connector alone, calling it directly from Copilot Studio is faster.</li>
<li>If you need to call external APIs sequentially, use <b>parallel branches</b> to shorten response time.</li>
<li>Handle judgment/branching logic in the <b>agent (Topic/LLM)</b>, and let Flow handle only <b>execution + result return</b>.</li>
</ul>
</div>

---

## 2. Using standard connectors

Copilot Studio supports **more than 1,000 standard and premium connectors**.

### 2.1 Frequently used connectors

| Connector | Main operations | Usage scenarios | Reference |
|---|---|---|---|
| **Office 365 Outlook** | Send email, query calendar | Notification mail, meeting guidance | [Learn](https://learn.microsoft.com/ko-kr/connectors/office365/) |
| **Microsoft Teams** | Send channel messages, query members | Team notifications, announcements | [Learn](https://learn.microsoft.com/ko-kr/connectors/teams/) |
| **SharePoint** | List item CRUD, file lookup | Data lookup, request registration | [Learn](https://learn.microsoft.com/ko-kr/connectors/sharepointonline/) |
| **Dataverse** | Table record CRUD | Internal data management | [Learn](https://learn.microsoft.com/ko-kr/connectors/commondataserviceforapps/) |
| **HTTP** | Direct REST API calls | External system integration | [Learn](https://learn.microsoft.com/ko-kr/connectors/webcontents/) |

> 📖 **Reference**: [Connector reference (full list)](https://learn.microsoft.com/ko-kr/connectors/connector-reference/)

---

## 3. HTTP-based API integration

To integrate with systems that do not have standard connectors, use **custom connectors** or **direct HTTP calls**.

### 3.1 When should you choose each method?

| Method | Suitable when |
|---|---|
| **Direct HTTP call** | Simple REST calls, latency-sensitive search/lookup, PoC or pilot stage |
| **Custom connector** | Repeated calls, common use by multiple agents, need to standardize authentication (OAuth/Entra ID) |

> 📖 **Reference**: [Custom connectors overview](https://learn.microsoft.com/ko-kr/connectors/custom-connectors/) · [Custom connectors FAQ](https://learn.microsoft.com/ko-kr/connectors/custom-connectors/faq)

### 3.2 MCP (Model Context Protocol) integration

Copilot Studio can connect external services as tools through the **MCP protocol**.

1. Go to the **Actions tab** → **Add an action** → select **MCP Server**
2. Enter the MCP server URL (for example, `https://my-mcp-server.azurewebsites.net/sse`)
3. Configure authentication information (API key, etc.)
4. The list of available tools is loaded automatically

---

## 4. Overview of authentication methods

When integrating external systems, **authentication** configuration is critical.

### 4.1 Comparison by authentication method

| Authentication method | Description | Suitable scenarios | Security level |
|---|---|---|---|
| **No authentication** | For testing only | Internal PoC | ❌ |
| **API Key** | Includes a fixed key in the header | Public APIs, internal microservices | ⚠️ |
| **OAuth 2.0** | Token-based authentication | SaaS such as ServiceNow and Salesforce | ✅ |
| **Entra ID** | Microsoft organizational authentication | M365 services, internal Azure resources | ✅✅ |

> 📖 **Reference**: [Configure end-user authentication](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/configuration-end-user-authentication)

### 4.2 Authentication settings in Copilot Studio

| Setting | Description | Usage scenarios |
|---|---|---|
| **End-user authentication (End User)** | Authenticate with the agent user's own account | Per-user mail/calendar, data within the user's permissions |
| **Author-provided authentication (Connection Creator)** | Authenticate with the agent author/admin account | Shared API calls, service account |

<div class="info-box warning">
<b>⚠️ Security guidance for authentication</b><br>
<ul>
<li><b>Hardcoding API keys is prohibited</b>. Use environment variables or Azure Key Vault.</li>
<li><b>Anonymous authentication is prohibited by default</b>. Use it only in test environments.</li>
<li>When using author-provided authentication, apply the <b>principle of least privilege</b> and use a dedicated service account.</li>
</ul>
</div>

<div class="info-box note">
<b>📌 Next chapter preview</b><br>
In this chapter, we learned how to integrate external systems. In the next <b>Chapter 5</b>, we cover a selection guide for deciding "Is Copilot Studio enough, or is custom development needed?"
</div>
