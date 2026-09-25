---
layout: "chapter"
lang: en
date: 2026-08-06
title: "Mission 10: Add Event Triggers - Enable autonomous agent capabilities"
short_title: "Add Event Triggers"
description: "Configure your agent to act autonomously with event-driven logic."
order: 10
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/10-add-event-triggers/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/10-add-event-triggers/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🚨 Mission 10: Add Event Triggers - Enable autonomous agent capabilities](https://microsoft.github.io/agent-academy/recruit/10-add-event-triggers/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

🎥 **Watch the Walkthrough**

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/video-thumbnail.jpg' | relative_url }}" alt="Video walkthrough: Add Event Triggers" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption><a href="https://www.youtube.com/watch?v=ZgwHL8PQ1nY">Watch the walkthrough on YouTube</a></figcaption>
</figure>

## 🎯 Mission Brief

Welcome back, Recruit. It’s time to elevate your agent from a conversational assistant to an autonomous agent that responds to events without waiting for user input.

With Event Triggers, you'll train your agent to monitor external systems like SharePoint, Teams, and Outlook, and execute intelligent actions the moment a signal is received. This operation transforms your agent into a fully operational field asset - silent, swift, and always watching.

Success means building agents that initiate value - not just respond to it.

<div class="info-box note" markdown="1">
**Important**

This mission uses the classic Copilot Studio experience

If your Copilot Studio screen looks different from the screenshots in this mission, turn off **New Experience** in the upper-right corner to switch back to the **classic experience** used here.
</div>
## 🔎 Objectives

In this mission, you’ll learn:

1. How event triggers enable autonomous agent behavior
1. How event triggers differ from topic triggers
1. Which scenarios are a good fit for event triggers
1. How authentication, security, and publishing affect event-driven agents
1. How to respond to SharePoint events with email acknowledgments

## 🤔 What is an Event Trigger?

An **Event Trigger** is a mechanism that allows your agent to act autonomously in response to external events, without requiring direct user input. Think of it as making your agent "watch" for specific events and automatically take action when those events occur.

Unlike topic triggers, which require users to type something to activate a conversation, event triggers activate based on things happening in your connected systems. E.g.:

- When a new file is created in SharePoint or OneDrive for Business
- When a record is created in Dataverse
- When a task is completed in Planner
- When a new Microsoft Form response is submitted
- When a new Microsoft Teams message is added
- Based on a recurring schedule (like daily reminders)  
<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_AddTriggerDialog.png' | relative_url }}" alt="Trigger library showing available event triggers" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Trigger library showing available event triggers</figcaption>
</figure>

### Why Event Triggers matter in autonomous agents

Event triggers transform your agent from a reactive assistant into a proactive, autonomous helper:

1. **Autonomous operation** - your agent can work 24/7 without human intervention, responding to events as they happen.
    - *Example:* Automatically welcome new team members when they're added to a team.

1. **Real-time responsiveness** - instead of waiting for users to ask questions, your agent responds immediately to relevant events.
    - *Example*: Alert the IT team when a SharePoint document is modified.

1. **Workflow automation** - chain together multiple actions based on a single trigger event.
    - *Example:* When a new support ticket is created, create a task, notify the manager, and update the tracking dashboard.

1. **Consistent processes** - ensure important steps never get missed by automating responses to key events.
    - *Example:* Every new employee automatically gets onboarding materials and access requests.

1. **Data-driven actions** - use information from the triggering event to make smart decisions and take appropriate actions.
    - *Example:* Route urgent tickets to senior staff based on priority level in the trigger payload.

## ⚙️ How do Event Triggers work?

Event triggers operate through a three-step workflow that enables your agent to respond autonomously to external events:

### The trigger workflow

1. **Event Detection** - A specific event occurs in a connected system (SharePoint, Teams, Outlook, etc.)
1. **Trigger Activation** - The event trigger detects this event and sends a payload to your agent via a Power Automate Cloud Flow.
1. **Agent Response** - Your agent receives the payload and executes the instructions you've defined

### Event vs Topic triggers

Understanding the difference between these two trigger types is crucial:

| **Event Triggers** | **Topic Triggers** |
| -------------------- | -------------------- |
| Activated by external system events | Activated by user input/phrases |
| Enable autonomous agent behavior | Enable conversational responses |
| Use maker's authentication | Option for user's authentication |
| Run without user interaction | Require user to start conversation |
| Examples: File created, email received | Example: "What's the weather?" |

## 📦 Understanding trigger payloads

When an event occurs, the trigger sends a **payload** to your agent containing information about the event and instructions on how to respond.

### Default vs custom payloads

Every trigger type comes with a default payload structure, but you can customize it:

**Default payload** - Uses the standard format like `Use content from {Body}`

- Contains basic event information
- Uses generic processing instructions
- Good for simple scenarios

**Custom payload** - Add specific instructions and data formatting

- Include detailed directions for your agent
- Specify exactly what data to use and how
- Better for complex workflows

### Agent instructions vs custom payload instructions

You have two places to guide your agent's behavior with event triggers:

**Agent Instructions** (Global)

- Broad guidance that applies to all triggers
- Example: "When processing tickets, always check for duplicates first"
- Best for general behavior patterns

**Payload Instructions** (Trigger-specific)

- Specific directions for individual trigger types  
- Example: "For this SharePoint update, send a summary to the project channel"
- Best for complex agents with multiple triggers

💡 **Pro tip**: Avoid conflicting instructions between these two levels, as this can cause unexpected behavior.

## 🎯 Common Event Trigger scenarios

Here are practical examples of how event triggers can enhance your agent:

### IT Help Desk Agent

- **Trigger**: New SharePoint list item (support ticket)
- **Action**: Automatically categorize, assign priority, and notify appropriate team members

### Employee Onboarding Agent

- **Trigger**: New user added to Dataverse
- **Action**: Send welcome message, create onboarding tasks, and provision access

### Project Management Agent

- **Trigger**: Task completed in Planner
- **Action**: Update project dashboard, notify stakeholders, and check for blockers

### Document Management Agent

- **Trigger**: File uploaded to specific SharePoint folder
- **Action**: Extract metadata, apply tags, and notify document owners

### Meeting Assistant Agent

- **Trigger**: Calendar event created
- **Action**: Send pre-meeting reminders and agenda, book resources

## ⚠️ Publishing and authentication considerations

Before your agent can use event triggers in production, you need to understand authentication and security implications.

### Maker authentication

Event triggers use the **agent creator's credentials** for all authentication:

- Your agent accesses systems using your permissions
- Users can potentially access data through your credentials
- All actions are performed "as you" even when users interact with the agent

### Data protection best practices

To maintain security when publishing agents with event triggers:

1. **Evaluate data access** - Review what systems and data your triggers can access
1. **Test thoroughly** - Understand what information triggers include in payloads
1. **Narrow trigger scope** - Use specific parameters to limit what events activate triggers
1. **Review payload data** - Ensure triggers don't expose sensitive information
1. **Monitor usage** - Track trigger activity and resource consumption

## ⚠️ Troubleshooting and limitations

Keep these important considerations in mind when working with event triggers:

### Quota and billing impacts

- Each trigger activation counts toward your message consumption
- Frequent triggers (like every-minute recurrence) can quickly consume quota
- Monitor usage to avoid throttling

### Technical requirements

- Only available for agents with generative orchestration enabled
- Requires solution-aware cloud flow sharing to be enabled in your environment

### Data Loss Prevention (DLP)

- Your organization's DLP policies determine which triggers are available
- Administrators can block event triggers entirely
- Contact your admin if expected triggers aren't available

## 🧪 Lab 10 - Add Event Triggers for autonomous agent behavior

### 🎯 Use case

You'll enhance your IT Help Desk agent to automatically respond to new support requests. When someone creates a new item in your SharePoint support tickets list, your agent will:

1. Trigger autonomously when the SharePoint ticket is created
1. Provide the ticket details and instructions on the steps that you want it to perform
1. Automatically acknowledge the ticket to the submitter via an AI generated email

This lab demonstrates how event triggers enable truly autonomous agent behavior.

### Prerequisites

Before starting this lab, ensure you have:

- ✅ Completed previous labs (especially Lab 6-8 for the IT Help Desk agent)
- ✅ Access to the SharePoint site with the IT support tickets list
- ✅ Copilot Studio environment with event triggers enabled
- ✅ Your agent has generative orchestration enabled
- ✅ Appropriate permissions in SharePoint and your Copilot Studio environment

### 10.1 Enable Generative AI and create a SharePoint item creation trigger

1. Open your **Contoso Helpdesk agent** in **Copilot Studio**

1. First, ensure **Generative AI** is enabled for your agent:
   - Select **Settings**
   - Under the **Orchestration** section, select **Yes** under **Use generative AI orchestration for your agent's responses?** if it's not already enabled  
     <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_EnableGenerativeAI.png' | relative_url }}" alt="Enable Generative AI" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Enable Generative AI</figcaption>
</figure>

1. Select **Save** if required, or close **Settings** if no changes were needed

1. Navigate to the **Overview** tab and locate the **Triggers** section

1. Select **+ Add trigger** to open the trigger library.
    <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_NavigateToTrigger.png' | relative_url }}" alt="Navigate to Triggers" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Navigate to Triggers</figcaption>
</figure>

1. Search for and select **When an item is created** (SharePoint)  
    <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_SelectSharePointTrigger.png' | relative_url }}" alt="Select SharePoint Trigger" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select SharePoint Trigger</figcaption>
</figure>

1. Configure the trigger name and connections:

   - **Trigger name:** New Support Ticket Created in SharePoint

1. Wait for the connections to configure, and select **Next** to proceed.  
   <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_ConfigureTriggerNameAndConnections.png' | relative_url }}" alt="Configure trigger name and connections" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Configure trigger name and connections</figcaption>
</figure>

1. Configure the trigger parameters:

   - **Site Address**: Select your "Contoso IT" SharePoint site

   - **List Name**: Choose your "Tickets" list

   - **Limit Columns by view (Optional)**: Leave this as `Select an Item`

   - **Additional instructions to the agent when it's invoked by the trigger:**

     ```text
     New Support Ticket Created in SharePoint: {Body}
     
     Use the 'Acknowledge SharePoint Ticket' tool to generate the email body automatically and respond.
     
     IMPORTANT: Do not wait for any user input. Work completely autonomously.
     ```

     <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_ConfigureTriggerParams.png' | relative_url }}" alt="Configure trigger parameters" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Configure trigger parameters</figcaption>
</figure>

1. Select **Create trigger** to complete the trigger creation. A Power Automate Cloud Flow is automatically created to trigger the agent autonomously.

1. Select **Close**.

### 10.2 Edit the Trigger

1. Inside the **Triggers** section of the **Overview** tab, Select the **...** menu on the **New Support Ticket Created in SharePoint** trigger

1. Select **Edit in Power Automate**  
   <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_EditTriggerInPowerAutomate.png' | relative_url }}" alt="Edit trigger in Power Automate" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Edit trigger in Power Automate</figcaption>
</figure>

1. Ensure you have the **New designer** toggle selected

1. Select the **Sends a prompt to the specified copilot for processing** node

1. In the **Body/message** field, remove the Body content, **press the forward slash key** (/) and select **Insert Expression**  
   <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_InsertExpressionForTrigger.png' | relative_url }}" alt="Insert expression for trigger" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Insert expression for trigger</figcaption>
</figure>

1. Enter the following expression to provide the agent with specific details about the ticket:

    ```text
   concat('Submitted By Name: ', first(triggerOutputs()?['body/value'])?['Author/DisplayName'], '\nSubmitted By Email: ', first(triggerOutputs()?['body/value'])?['Author/Email'], '\nTitle: ', first(triggerOutputs()?['body/value'])?['Title'], '\nIssue Description: ', first(triggerOutputs()?['body/value'])?['Description'], '\nPriority: ', first(triggerOutputs()?['body/value'])?['Priority/Value'],'\nTicket ID : ', first(triggerOutputs()?['body/value'])?['ID'])
   ```

1. Select **Add**  
   <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_TriggerOutputExpression.png' | relative_url }}" alt="Trigger output expression" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Trigger output expression</figcaption>
</figure>

1. Select **Publish** in the toolbar.

### 10.3 Create a tool for email acknowledgment

1. **Return** to your Agent in Copilot Studio

1. Navigate to the **Tools** tab in your agent

1. Select **+ Add a tool**, then select **Connector**.

1. Search for and select **Send an email (V2)** - **Office 365 Output** connector  
    <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_SelectOutlookConnector.png' | relative_url }}" alt="Select Outlook Connector" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select Outlook Connector</figcaption>
</figure>

1. Wait for the connection to configure, and then select **Add and configure**

1. Configure the tool settings:

   - **Name**: Acknowledge SharePoint ticket
   - **Description**: This tool sends an email acknowledgement that a ticket has been received.

1. Select **Customize** next to the input parameters and configure as follows:

    **To**:

    - **Description**: The email address of the person submitting the SharePoint Ticket
    - **Identify as**: Email

    **Body**:

    - **Description**: An acknowledgement that the Ticket was received, and we aim to respond within 3 working days.

    <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_ConfigureInputParameters.png' | relative_url }}" alt="Configure Input Parameters" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Configure Input Parameters</figcaption>
</figure>

1. Select **Save**

### 10.4 Test the trigger

1. Inside your **Help Desk Agent**, select the **Overview** tab
1. Select **Test trigger** next to the **New Support Ticket Created in SharePoint** trigger. This will load the **Test your trigger** window.
1. Open a new browser tab and navigate to your **SharePoint IT Support Tickets list**
1. Select **+ Add new item** to create a test ticket:
   - **Title**: "Unable to connect to VPN"
   - **Description**: "Unable to connect to corporate WIFI network after recent update"
   - **Priority**: "Normal"

1. **Save** the SharePoint item  
    <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_CreateTestTicket.png' | relative_url }}" alt="Create Test Ticket" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Create Test Ticket</figcaption>
</figure>
1. Return to **Copilot Studio** and monitor the **Test your trigger** panel for the trigger activation. Use the **Refresh** icon to load the trigger event, this may take a few minutes.  
    <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_MonitorTriggerTest.png' | relative_url }}" alt="Monitor Trigger Test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Monitor Trigger Test</figcaption>
</figure>
1. Once the trigger appears, select **Start testing**
1. The Activity Map panel will now show, and the agent will process the test event. When asked **Connect to continue**, select **Allow**  
    <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_AllowConnector.png' | relative_url }}" alt="Allow Connector" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Allow Connector</figcaption>
</figure>
1. Verify that your agent:
   - Received the trigger payload
   - Called the "Acknowledge SharePoint ticket" tool  
     <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_TestTrigger.png' | relative_url }}" alt="Test trigger" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Test trigger</figcaption>
</figure>
1. Check the email inbox of the submitter to confirm the acknowledgment email was sent  
    <figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-10-add-event-triggers/10_TestEmailSent.png' | relative_url }}" alt="Test email sent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Test email sent</figcaption>
</figure>
1. Review the **Activity** tab in Copilot Studio to see the complete trigger and tool execution

## ✅ Mission Complete

You’ve successfully:

- **Event trigger**: Configured the agent to respond to new SharePoint items
- **Trigger payload**: Passed ticket details to the agent
- **Connector tool**: Added an email acknowledgment tool
- **Autonomous testing**: Verified the trigger and tool without conversational input

Next, continue to [Mission 11: Publish Your Agent]({{ '/en/chapters/academy-recruit-11-publish-your-agent/' | relative_url }}).

## 📚 Tactical Resources

- [Make your agent autonomous in Copilot Studio](https://learn.microsoft.com/training/modules/autonomous-agents-online-workshop/?WT.mc_id=power-177340-scottdurow)
- [Add an event trigger](https://learn.microsoft.com/microsoft-copilot-studio/authoring-trigger-event?WT.mc_id=power-177340-scottdurow)
- [Power Automate triggers introduction](https://learn.microsoft.com/power-automate/triggers-introduction?WT.mc_id=power-177340-scottdurow)
- [Use Power Automate flows with agents](https://learn.microsoft.com/microsoft-copilot-studio/advanced-flow-create?WT.mc_id=power-177340-scottdurow)
- [Data loss prevention for Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/admin-data-loss-prevention?WT.mc_id=power-177340-scottdurow)
