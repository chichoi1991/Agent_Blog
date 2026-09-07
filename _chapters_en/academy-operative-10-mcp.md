---
layout: "chapter"
lang: en
date: 2026-03-11
title: "Mission 10: Integrate with MCP Servers"
short_title: "10. MCP server integration"
description: "Integrate with built-in MCP servers"
order: 10
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/10-mcp/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-11"
canonical_url: "https://microsoft.github.io/agent-academy/operative/10-mcp/"
---
<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🚨 Mission 10: Integrate with MCP Servers](https://microsoft.github.io/agent-academy/operative/10-mcp/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

<figure class="screenshot">
  <a href="https://youtu.be/kW2f8Z8fzBw?si=rDg7uFQCIDUe_Q_H" target="_blank" rel="noopener">
    <img src="{{ '/assets/academy/operative-10-mcp/10-mcp-thumbnail_PlayButton.png' | relative_url }}" alt="MCP" loading="lazy" onerror="this.style.display='none';this.closest('figure').classList.add('pending')">
  </a>
</figure>

## 🎯 Mission brief

Welcome, Operative. In previous missions, you saw how powerful prompts can be. You learned about multimodal document analysis, grounding prompts with Dataverse data, and generating documents. Now you will use another advanced capability: **MCP (Model Context Protocol) server integration**.

This mission is called **Operation MCP Rendezvous**. In this operation, you will connect the Agent to external MCP servers to extend its capabilities and enable it to schedule interview prep meetings.

<div class="info-box note" markdown="1">
**Note** — If the screenshots in this lab look different from your Copilot Studio experience, turn off **New Experience** in the upper-right corner and switch to the **classic experience** used here.
</div>

## 🔎 Learning objectives

In this mission, you will learn how to:

1. Understand and use the Model Context Protocol (MCP) standard
1. Integrate MCP servers with a Copilot Studio Agent by using Agent 365
1. Connect a Copilot Studio Agent to an MCP server
1. Use MCP server capabilities from within an Agent

## 🔌 What is MCP?

**MCP (Model Context Protocol)** is an open standard that enables AI assistants to connect securely to external data sources and tools. Think of MCP as the **USB-C for AI integrations**. Just as USB-C provides a universal connector for a wide range of devices and peripherals, MCP provides a standardized way for AI systems to connect to services, databases, and applications.

Before USB-C, every device had its own proprietary connector (think of all those different charging cables). Similarly, before MCP, connecting an AI Agent to external systems required a separate custom integration for each service. MCP solves this by providing a universal plug-and-play protocol.

### ✨ Key benefits of MCP

- **Universal connectivity**: One standard protocol works across many AI platforms and data sources.
- **Secure access**: Built-in authentication and permission controls protect your data.
- **Extensibility**: Add new capabilities to your Agent without rewriting its core logic.
- **Interoperability**: MCP servers can work with multiple AI assistants and applications.

In this mission, you will use MCP to connect a Copilot Studio Agent to external services, dramatically expanding what the Agent can do beyond its built-in capabilities.

## 🛠️ What role does Agent 365 play?

**Agent 365** is Microsoft's comprehensive platform for managing and scaling AI Agents at enterprise scale. It assigns each AI Agent a unique **Microsoft Entra Agent ID** so identity, lifecycle, and access can be managed, and it provides the infrastructure for securely connecting Agents to business systems through MCP servers.

Agent 365 is the **enterprise control plane** for AI Agents. It handles security, governance, and visibility while enabling Agents to interact with Microsoft 365 and business applications through standardized MCP tooling servers.

### 👥 How Agent 365 supports different roles

Agent 365 meets the needs of everyone involved in the Agent ecosystem.

- **IT administrators**: Monitor Agent activity, apply policies, and manage threats through the Microsoft 365 admin center.
- **Security teams**: Apply enterprise-grade controls for identity, authentication, and compliance through Microsoft Purview and Defender integrations.
- **Developers**: Build and extend Agents in Copilot Studio or Azure AI Foundry by using integrated SDKs, prebuilt MCP servers, and frameworks.
- **Business decision makers**: Deploy Agents securely and measure their impact on productivity and business outcomes.
- **Information workers**: Collaborate naturally with Agents to improve productivity.

### 🔧 Agent 365 tooling servers for MCP integration

Agent 365 provides **enterprise-grade MCP servers** that allow Agents to access business systems in a secure and controlled way. These include the following.

**Prebuilt MCP servers for Microsoft 365 and business applications**:

- **Outlook Calendar**: Create, update, and manage calendar events
- **Outlook Mail**: Send, read, and search email  
- **Teams**: Create chats, post messages, and manage channels
- **SharePoint & OneDrive**: Upload files, manage lists, and search documents
- **Word**: Create and edit documents, and add comments
- **Dataverse & Dynamics 365**: Perform CRUD operations on business data
- **User Profile**: Look up user information, managers, and direct reports
- **Copilot Search**: Chat with Microsoft 365 Copilot and generate responses grounded in files

**Enterprise security and governance**:

- **Centralized control**: Manage all MCP servers through the Microsoft 365 admin center, and allow or block servers across the organization.
- **Scoped permissions**: Agents access only the resources they need based on Microsoft Entra scopes.
- **Complete visibility**: Monitor and audit all tool calls by using Microsoft Defender Advanced Hunting.
- **Policy enforcement**: Apply DLP, MIP, rate limiting, and security scanning at runtime.
- **Threat protection**: Detect and respond to attacks targeting Agents through Microsoft Defender integration.

**Create custom MCP servers**:

- Use the **MCP Management Server** to build scenario-specific servers. It is an API-first tool for creating custom MCP servers.
- Connect to **1,500+ Power Platform connectors** such as ServiceNow and JIRA.
- Integrate **Microsoft Graph APIs**, **REST APIs**, and **Dataverse custom APIs**.
- Publish and certify custom servers for your organization.
- Help ISVs build and publish certified servers.

**Developer experience**:

- Available in both **Copilot Studio** (low-code) and **Azure AI Foundry** (pro-code).
- Built into the **Agent 365 SDK** for seamless integration.
- Provides **Visual Studio Code** integration for creating and testing custom MCP servers.
- Provides a consistent, standardized interface across all tooling servers.

### 💡 Why this matters for Agents

Agent 365 turns MCP from an open standard into an enterprise-ready platform. This gives Agents the following benefits.

- **Deterministic, auditable actions** - Every tool call is tracked and controlled.
- **Production-grade reliability** - Every MCP server is rigorously tested for accuracy, latency, and reliability.  
- **Built-in security** - Enterprise controls are built in from the start, not bolted on after the fact.
- **Fast development** - Use prebuilt servers for common scenarios and easy customization for specialized needs.
- **Unified management** - Manage every Agent from one control plane, no matter where it was created.

### 🎯 What this mission focuses on

Agent 365 provides a comprehensive platform for Agent management, governance, and custom MCP server development, but **this mission focuses on using prebuilt MCP servers in Copilot Studio**.

You will learn how to connect ready-to-use tooling servers such as Outlook Calendar and Teams to your Agent, and how to have it perform real actions in Microsoft 365 applications without building custom integrations yourself. Think of this as learning to use the tools already in your toolbox before you start building your own.

## 🧪 Exercise 10 - Add MCP servers to schedule an interview prep meeting

<div class="info-box note" markdown="1">
**Important** — To complete this exercise, you must join the [Frontier preview program](https://adoption.microsoft.com/copilot/frontier-program/) to get early access to Microsoft Agent 365. Frontier gives you hands-on access to Microsoft's latest AI innovations. Frontier previews are subject to existing preview terms in customer agreements. These features are still in development, so availability and functionality may change over time.

If you do not have access to the Frontier program, you can skip this exercise and still earn the Operative badge.
</div>

### Exercise 10.1: Add MCP servers to the Interview Agent

<div class="info-box note" markdown="1">
**Warning** — In this exercise, you will learn how to add two MCP servers: *Work IQ User (Preview)* and *Work IQ Calendar (Preview) MCP*. For the exercise to work correctly, the following items must already be configured in your tenant.

- The user account must have a manager configured. You can configure this in the M365 Admin Center.
- You must have at least one event on your calendar in the next 24 hours, because you will test the MCP server by asking "Get my meetings for today".
- Your tenant must have one additional user created so you can invite that user to the interview prep meeting. ([How to create a user in M365](https://learn.microsoft.com/microsoft-365/admin/add-users/add-users?view=o365-worldwide&WT.mc_id=power-215684-dlaskewitz))
- A mailbox must be provisioned for that additional user, and it is helpful to configure working days and working hours for the user.
</div>

To add an MCP server to an Agent, you only need to add one tool per MCP server. This is different from connector tools, where you must add a separate tool for each connector action. The ability to add a single tool that handles multiple actions is one of the things that makes MCP servers much easier to work with.

#### Add the Work IQ User (Preview) MCP Server

1. Open [Copilot Studio](https://copilotstudio.microsoft.com) and **open** the Interview Agent you created earlier.
1. Select **Tools** in the top navigation.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/tools.png' | relative_url }}" alt="Tools navigation" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Add a tool** to start adding the MCP Server.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/add-a-tool.png' | relative_url }}" alt="Add a tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the filters, select **Model Context Protocol** to show only MCP Server tools.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/filter-mcp.png' | relative_url }}" alt="Filter tools to show only MCP Servers" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the tool list, select **Work IQ User (Preview)**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/select-user-profile-mcp.png' | relative_url }}" alt="Select Work IQ User (Preview) from the tool list" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the connection dropdown, select **Create new connection**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/create-new-connection.png' | relative_url }}" alt="Create dropdown - create connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Create** to start the connection creation process.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/create-connection-create.png' | relative_url }}" alt="Start the connection creation process" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the account selection pop-up, select **your account** to create the connection.
1. After you select the account, the following screen appears. Select **Add and configure** to add Work IQ User (Preview) to the Interview Agent.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/add-and-configure.png' | relative_url }}" alt="Add and configure Work IQ User (Preview)" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. On the tool overview page, scroll down to see the MCP tools included in the MCP server.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/user-profile-mcp-tools.png' | relative_url }}" alt="Tool overview" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Next, select **Test** to test the newly added tool.
1. In the test pane, send the following prompt to the Agent.

    ```text
    Who is my manager?
    ```

1. The Agent first prompts you to connect. Select **Open connection manager** to confirm your credentials.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/connection-manager.png' | relative_url }}" alt="Select Open connection manager to confirm credentials" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. On the **Manage your connections** page, select **Connect** next to the **Work IQ User MCP** connection to set up the connection.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/connect-workiq-user-mcp.png' | relative_url }}" alt="Select Connect next to the Work IQ User MCP connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the **Create or pick a connection** dialog, confirm that the Work IQ User MCP connection has a green check mark, and then select **Submit**. After submitting, return to the test pane and select **Retry** to continue.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/workiq-user-mcp-connection.png' | relative_url }}" alt="Select Submit to confirm the connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    Next, the Agent's response appears. If everything went well, you should see a result similar to the following.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/user-profile-manager-test.png' | relative_url }}" alt="Who is my manager test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    On the left side of the *Test your agent* pane, you can see that the Agent initialized the MCP server and called the *getMyManager* MCP tool. You can also view details about what the Agent sent to and received from the MCP tool.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/user-profile-manager-test-debug.png' | relative_url }}" alt="MCP tool debug" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

You have completed the first part of the exercise. You can now ask questions about users in your tenant, such as:

- Who is my manager?
- Who are my direct reports?
- What is Daniel Laskewitz's job role?
- And many more...

If you want, you can try other tools now. When you are ready, let's add another MCP server.

#### Add the Work IQ Calendar (Preview) MCP server

In the previous section, you added Work IQ User (Preview), which lets you work with user details in your tenant. This is useful when you plan meetings, for example, because Agent users usually do not include an email address or user principal name in prompts when they want to schedule a meeting. Instead, they send prompts such as:

```text
meeting with Daniel Laskewitz tomorrow
```

To add this capability, you need to add another MCP server: Work IQ Calendar (Preview) MCP server. The following steps are very similar to the previous section, so follow along.

1. Select **Tools** in the top navigation.
1. Select **Add a tool**.
1. Select **Model Context Protocol** to filter the tools.
1. Scroll down and select **Work IQ Calendar (Preview) MCP Server**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/select-outlook-calendar-mcp.png' | relative_url }}" alt="Add Work IQ Calendar (Preview) MCP Server" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the connection dropdown, select **Create new connection**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/create-new-connection-calendar.png' | relative_url }}" alt="Select Create new connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Create** to start the connection process.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/create-new-connection-calendar-create.png' | relative_url }}" alt="Select Create to start the connection process" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the account selection pop-up, select **your account** to create the connection.
1. Select **Add and configure** to add the Work IQ Calendar (Preview) MCP server to the Interview Agent.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/add-and-configure-calendar.png' | relative_url }}" alt="Select Add and configure" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    Now scroll down again to see the tools for the Work IQ Calendar (Preview) MCP server.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-mcp-tools.png' | relative_url }}" alt="Work IQ Calendar (Preview) MCP Server tools" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    Now let's test this MCP server.

1. Enter the following prompt.

    ```text
    Get my meetings for today
    ```

1. The Agent displays a consent card. Select **Allow** to consent to the MCP server using your data.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-test-allow.png' | relative_url }}" alt="Consent card" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The response then displays the list of meetings on your calendar for today.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-test-output.png' | relative_url }}" alt="Get my meetings for today response" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

### Exercise 10.2: Plan an interview prep meeting

Now you have confirmed that both MCP servers work. But what we really want to do is plan an interview prep meeting. Let's verify that it works in practice.

1. Select **New test session** to start a new test session.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/new-test-session.png' | relative_url }}" alt="New test session" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Enter the following prompt.

    ```text
    Can you find 3 meeting times for a 30 minute meeting with Jane Doe for an interview prep-meeting?
    ```

    This calls the *findMeetingTimes* MCP tool, checks both the Agent user's and Jane Doe's calendars, and finds possible times based on their availability. It then responds with three suggested meeting times.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-meeting-test-output.png' | relative_url }}" alt="Find meeting times output" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    You can also see which tools were called in the test pane.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-test-debug.png' | relative_url }}" alt="Debug" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    To schedule the actual meeting, you now need to respond to the Agent once more.

1. Enter the following prompt (replace the time with one of the meeting slots suggested by the Agent).

    ```text
    Please schedule the one on 10:30 AM UTC
    ```

    This calls the *createEvent* MCP tool and schedules the meeting.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-meeting-create-event.png' | relative_url }}" alt="Schedule the meeting" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    Jane Doe's mailbox shows a meeting request like the following.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-meeting-schedule-meeting-request.png' | relative_url }}" alt="Meeting request" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

This completes the exercise. I hope it showed you how useful MCP servers can be in an Agent.

## 🎉 Mission complete

Excellent work, Operative! **Operation MCP Rendezvous** is now complete. You successfully integrated external MCP servers with your Copilot Studio Agent, unlocking powerful new capabilities that extend what the Agent can do.

🚀 **Next step:** In the next mission, you will learn how to collect and analyze user feedback to continuously improve Agent performance.

⏩ [Go to Mission 11]({{ '/en/chapters/academy-operative-11-obtain-user-feedback/' | relative_url }}): Collect feedback from users

## 📚 Tactical resources

📖 [Microsoft Copilot Studio ❤️ MCP Lab](https://aka.ms/mcsmcp/lab)

📖 [Model Context Protocol - Getting Started](https://modelcontextprotocol.io/docs/getting-started/intro)

📖 [Extend agents with MCP in Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/agent-extend-action-mcp?WT.mc_id=power-215684-dlaskewitz)

📖 [Microsoft Agent 365 Overview](https://learn.microsoft.com/microsoft-agent-365/overview?WT.mc_id=power-215684-dlaskewitz)

📖 [Microsoft Agent 365 Tooling Servers Overview](https://learn.microsoft.com/microsoft-agent-365/tooling-servers-overview?WT.mc_id=power-215684-dlaskewitz)

📖 [Work IQ User (Preview)](https://learn.microsoft.com/microsoft-agent-365/mcp-server-reference/me?WT.mc_id=power-215684-dlaskewitz)

📖 [Work IQ Calendar (Preview) MCP Server](https://learn.microsoft.com/microsoft-agent-365/mcp-server-reference/calendar?WT.mc_id=power-215684-dlaskewitz)

📖 [Add users and assign licenses](https://learn.microsoft.com/microsoft-365/admin/add-users/add-users?view=o365-worldwide&WT.mc_id=power-215684-dlaskewitz)
