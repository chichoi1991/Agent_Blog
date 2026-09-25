---
layout: "chapter"
lang: en
date: 2026-03-17
title: "Mission 04: Add Event Triggers to act autonomously"
short_title: "04. Add Event Triggers"
description: "Implement autonomous agent behavior with event-driven triggers"
order: 4
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/04-automate-triggers/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-17"
canonical_url: "https://microsoft.github.io/agent-academy/operative/04-automate-triggers/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🚨 Mission 04: Add Event Triggers to act autonomously](https://microsoft.github.io/agent-academy/operative/04-automate-triggers/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

🎥 **Watch the Walkthrough**

<figure class="screenshot">
  <a href="https://youtu.be/lXdlj4DjR28?si=32nUxgFNUv2VVmTD" target="_blank" rel="noopener">
    <img src="{{ '/assets/academy/operative-04-automate-triggers/04-automate-triggers_thumbnail_PlayButton.png' | relative_url }}" alt="Automate-Triggers" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
</figure>

## 🎯 Mission Brief

Welcome back, Agent. In [Mission 03]({{ '/en/chapters/academy-operative-03-multi-agent/' | relative_url }}) - you learned how to build an Application Intake child agent and an Interview Prep connected agent to broaden your main Hiring Agent's capabilities.

Your assignment, should you choose to accept it, is **Operation Signal Point** - diving deeper into **event triggers** - elevating your agent system from reactive to **autonomous operation**. You'll transform your agents from waiting for human input to proactively responding to external events and taking intelligent action without supervision.

Think of it as upgrading from agents that _answer questions_ to agents that _anticipate needs_ and _act independently_. Through event triggers and automated workflows, your Hiring Agent will detect incoming resume emails, process attachments automatically, store data in Dataverse, and notify your HR recruitment team via Microsoft Teams - all while you focus on higher-value tasks.

Welcome to the world where automation meets intelligence.

<div class="info-box note" markdown="1">
If your Copilot Studio screen looks different from the screenshots in this lesson, turn off **New Experience** in the upper-right corner to switch back to the **classic experience** used here.
</div>

## 🔎 Objectives

In this mission, you'll learn:

1. How event triggers enable autonomous agent behavior without user interaction
1. The differences between interactive and autonomous agents in Copilot Studio
1. How to create event triggers that automatically process email attachments and upload files to Dataverse
1. How to build agent flows that post adaptive cards to Teams channels for notifications
1. How to pass data between event triggers and agent flows for end-to-end automation

## 🤔 What is an Event trigger?

Previously in [Recruit]({{ '/en/chapters/academy-recruit-10-add-event-triggers/' | relative_url }}), we learned about event triggers. Let's do a quick recap on this in case you missed it.

**Event triggers** let an agent _act_ on _its_ own when something happens in another system - no user message required. When the configured event fires - such as “new SharePoint item,” “new email,” “Planner task assigned,” or even a time‑based recurrence, a connector sends a trigger payload to your agent. The agent then follows your instructions to decide which actions or topics to call.

### Key characteristics

- **Autonomous activation:**
      - Unlike topic triggers that start when a user types to the agent, event triggers fire from external events, enabling proactive behavior.

- **Payload-driven:**
      - Each event delivers a payload (variables + optional instructions) through a connector. The agent uses your defined instructions and the payload to choose what to do next.
      - For example, _call a topic_ or _execute actions defined by Tools_.

- **Examples out-of-the-box:**
      - SharePoint/OneDrive file or item created
      - Planner task completed/assigned
      - Microsoft Forms response submitted
      - Recurrence/schedule

    Availability depends on your organization’s data policies configured in Power Automate.

- **Requires generative orchestration:**
      - Event triggers are available only when generative orchestration is enabled for the agent.

- **Billing/usage:**
      - Each trigger delivery counts as a message toward Copilot Studio capacity.
      - For example a 10‑minute recurrence sends a message every 10 minutes.

- **Auth model and setup:**
      - You add triggers within the agent Overview, under _Triggers_. Authentication for the trigger connector uses the agent maker’s account (“agent author authentication”).
      - You can edit trigger parameters and payload in the Power Automate maker portal.

- **Testing & observability:**
      - You can test triggers from the agent's test pane and inspect behavior with the activity map before publishing.

<div class="info-box note" markdown="1">
**TL;DR for developers**

Think of event triggers as **webhook-like signals** that push a structured payload into your agent, letting it _initiate_ work and chain actions across systems - without waiting for a user to ask.
</div>

### Topic triggers - how they differ

Previously you learned about topic triggers in [Recruit]({{ '/en/chapters/academy-recruit-07-add-new-topic-with-trigger/' | relative_url }}), however you might still be wondering how _Topic_ triggers differ from _Event_ triggers, and why that distinction matters for understanding what makes an agent autonomous.

Topic triggers control _when a topic runs_, usually in response to a user message.

- In generative orchestration, the default trigger is **By agent** - the planner chooses a topic whose name/description best matches the user’s message.
- In classic orchestration, the default is **Phrases** - the planner chooses a topic when one or several trigger phrases best match the user's message.

Other trigger types include `Message received`, `Event received`, `Activity received`, `Conversation update`, `Invoke received`, `On redirect`, `Inactivity`, and `Plan complete`.

<div class="info-box note" markdown="1">
**Core difference**

Topic triggers are _conversation activity_ starters inside the chat.

Event triggers are system _event_ starters delivered via connectors that can run the agent without any conversation at all.
</div>

### Quick guide of Topic trigger vs Event trigger

- **Topic trigger:** User (or chat activity) said/did X ➡️ run Topic T.
- **Event trigger:** SharePoint/Planner/Email/Timer fired with payload P ➡️ agent evaluates instructions ➡️ call Actions/Topics accordingly.

## 🏓 Interactive agent vs Autonomous agent - comparison

Now that you know the difference between event triggers and topics triggers, let's next learn about the difference between an interactive agent vs an autonomous agent.

In Copilot Studio terms, "interactive" maps to agents that primarily engage via **topics** in a chat or channel. "Autonomous" maps to agents that also leverage **event triggers** to run without user input.

The following table summarizes their differences and similarities.

| Dimension                           | Interactive agent     | Autonomous agent                                                                                              |
|-------------------------------------|-----------------------|---------------------------------------------------------------------------------------------------------------|
| How it starts                       | User (or chat activity) triggers a topic. Example: By agent, Phrases, Message received.   | External event trigger sends a payload via connector to the agent. Example: SharePoint, Planner, email, schedule, etc. |
| Primary use                         | Q&A, guided workflows, request-driven actions in chat - Teams, web, etc.  | Proactive operations and background automation - react to system changes and then notify, file, or orchestrate tasks. |
| Trigger surface                     | Topic triggers: By agent / Phrases / Message received / Activity types / Invoke / Inactivity / Plan complete | Event triggers library via connectors; payload includes event data + optional instructions. |
| Planner (generative orchestration)  | Strongly leveraged for By agent and Plan complete triggers to select/sequence topics. | Required for event triggers; the agent uses instructions + payload to decide which actions/topics to call. |
| Typical example                     | User asks "What's our refund policy?" → Topic runs, queries knowledge, response. | New Planner task assigned → Event trigger fires → Agent posts a Teams message, updates a record, or calls a topic. |
| Setup path                          | Create topics, define trigger type, author dialog/actions; publish to channels. | Add event trigger (Overview → Triggers), authenticate connector with agent author credentials, configure payload/instructions; test via test pane; publish. |
| Auth and governance                 | Runs under channel/auth context; topic triggers respond to chat activities in allowed channels. | Trigger availability depends on Power Automate data policies; connectors run under the agent maker’s account. |
| Observability                       | Test topics within Copilot Studio, inspect conversation transcripts/activities. | Use Test trigger and activity map to validate execution before publishing, monitor activity after publishing. |
| Capacity impact                     | Each user message/agent response is a message consuming capacity. | Each event delivery is also a message, plus any subsequent actions. Example: a 10‑minute recurrence = 6 messages/hour |

### When to use which?

- Choose **topic triggers (interactive)** when users initiate the agent conversation - FAQ, guided intake, or command‑style tasks inside chat. The planner’s By agent trigger reduces manual phrase curation.
- Add **event triggers (autonomous)** when the agent should start the conversation or take action itself - on updates in SharePoint/Dataverse, incoming email, or on a schedule. This moves you from reactive to proactive operations.

## Developer tips & gotchas

1. **Enable generative orchestration** for any agent you want to make autonomous. Event triggers won’t show up otherwise.

1. **Model the payload early.** Decide what minimal fields your agent needs from the trigger such as `itemId`, `assignedTo`, `dueDate` and add concise instructions that tell the agent which action/topic to call based on payload values.

1. **Auth scope matters.** Triggers authenticate using the agent maker’s account. Ensure that account has the right connector permissions and complies with Power Automate data policies.

1. **Control cost and noise.** High‑frequency recurrences or highly chatty sources can rack up message consumption quickly - throttle where possible or add conditions in the trigger to filter events.

1. **Test before publishing.** Use **Test trigger** and the activity map to watch the plan and called actions - iterate on instructions/payload until behavior is stable.

## 🧪 Lab 4 - Automating candidate application emails

We're next going to add an event trigger to the **Hiring Agent** and build an agent flow in the child **Application Intake Agent** to handle further processing for autonomy.

### ✨ Use case scenario

**As an** HR Recruiter

**I want to** be notified when an email with a resume arrives in my Inbox and is automatically uploaded to Dataverse

**So that I can** stay notified of resumes sent by email for applications automatically uploaded to Dataverse

We'll be achieving this using two techniques

1. An event trigger for when the email arrives,
    1. Check the `contentType` of the file equals `PDF` as the format type.
    1. Extract the file and upload to Dataverse using actions through the Dataverse connector.
    1. Then send a prompt to the agent for further processing by passing input parameters from the Dataverse actions.

1. An agent flow will be added to the child **Application Intake Agent** which is invoked by the prompt in the event trigger.
    1. Use the input parameters passed from the prompt of the event trigger in an adaptive card posted to a channel in Microsoft Teams to notify the HR Recruitment team. The adaptive card will have a link to the Dataverse row which can be viewed in the **Hiring Agent**.

Let's begin!

### ✨ Prerequisites to complete this mission

To complete this lab you will need to:

- **Have completed [Mission 01]({{ '/en/chapters/academy-operative-01-get-started/' | relative_url }}) and [Mission 03]({{ '/en/chapters/academy-operative-03-multi-agent/' | relative_url }})** and have your Hiring Agent ready.
- You'll also need access to **Microsoft Teams** to complete the second lab exercise of posting an adaptive card to Microsoft Teams.

### 🧪 Lab 4.1 - Automate uploading resumes to Dataverse received by email

1. In the Hiring Agent, scroll down in the **Overview tab** to the **Triggers and Channels** section and select **+ Add**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_addTrigger.png' | relative_url }}" alt="Add trigger to agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. A list of triggers will appear. Select **When a new email arrives (V3)** and select **Next**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_selectTrigger.png' | relative_url }}" alt="Select When a new email arrives (V3) trigger" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We'll now see the **Trigger name** and the **Sign in** connection references for the apps listed. Rename the trigger name to the following:

    ```text
    When a new email arrives from an applicant
    ```

    NOTE: Make sure you see a green check by each of the connection references for the apps listed. If you don't see a green check, sign in through the ellipsis (...) and select **+ New connection reference** to create a new connection reference.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_triggerName.png' | relative_url }}" alt="Update details for trigger name and check connection references" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The final step is to set the input properties of the trigger. Update the following properties to the following,

     | Property | How to Set | Details |
     |----------|------------|---------|
     | **Include Attachments (Optional)** | Dropdown | Yes |
     | **Subject Filter (Optional)** | Type/Enter with keyboard | Application |
     | **Only with Attachments (Optional)** | Dropdown | Yes |

    Select **Create trigger**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_triggerSettings.png' | relative_url }}" alt="Configure trigger inputs" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Once created, a confirmation message will appear that the trigger has been added to the agent. Select **Close** and the trigger will be listed in the **Triggers** section.
1. We're now going to update the event trigger to add some more automation capabilities. Select the **ellipsis (...)** by the trigger and select **Edit in Power Automate**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_editInPowerAutomate.png' | relative_url }}" alt="Select Edit in Power Automate" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The trigger will then load as a flow in the Power Automate maker portal. It will open to the flow designer where we can add further logic and actions for more automation. The trigger will appear at the top, followed by **Sends a prompt to the specified copilot for processing** as the last action in the flow.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_06_EditInPowerAutomate.png' | relative_url }}" alt="Flow designer in Power Automate maker portal" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. By default, the **When a new email arrives** trigger in Power Automate may process multiple emails together if several arrive at once, running the flow only once for the batch.

    To ensure the flow runs separately for each email, enable the **Split On** setting in the trigger’s settings and select `@triggerOutputs()?['body/value']` in the dropdown array field.

    With **Split On** turned on and the array field set to `@triggerOutputs()?['body/value']`, the flow will run individually for each message, even if many arrive simultaneously.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_07_UpdateTriggerSettings.png' | relative_url }}" alt="Turn on Split On settings in the trigger" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Let's next add some logic to check the file type of the attachment, we only want to upload .PDF file attachments and not images (these could come from email signatures). Select the **+** icon below the trigger and select **Control** under the **Built in tools** section.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_08_Control.png' | relative_url }}" alt="Select Control" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Condition** action.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_09_AddConditionAction.png' | relative_url }}" alt="Select Condition action" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Now we configure the condition to check if the file attachment’s type is .PDF. In the **Choose a value** field on the left, select the **lightning bolt icon**.

1. In the **Search** field type the following,

    ```text
    content type
    ```

1. Then select the **Attachments Content-Type** parameter from the trigger.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_flowconditionval.png' | relative_url }}" alt="Condition" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Let's pause here for a moment, you probably noticed that the **For each** action automatically appeared.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_flowforeach.png' | relative_url }}" alt="For each" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    This action represents looping through each attachment in the email, since the **Attachments Content-Type** parameter is tied to each attachment.

    Underneath the hood, it's an array and that's why the **For each** action was automatically added when we selected the **Attachments Content-Type** parameter in the **Condition** action.

    To learn more about this, expand the following additional learning block.

    ::: details Additional Learning: For each action automatically appearing
    🤔 **Why does "Apply to each" or "For each" Automatically Appear?**

    When you select a parameter (dynamic content) that represents a list or array of items - for example, a list of attachments, emails, or rows - Power Automate recognizes that you might want to process each item individually.

    To help you do this, Power Automate automatically adds an **“Apply to each”** (or **For each**) loop around your action. This ensures that your action will run once for every item in the list, rather than trying to process the whole list at once (which could cause errors).

    🦋 **Example**

    - If you select "Attachments" from a previous action (which is an array), and try to use it in an action that expects a single file, Power Automate wraps your action in an **"Apply to each"** (or **For each**) loop.
    - This way, your action will run for **each attachment** - one at a time.

    💡 **Key Points**

    - **Automatic:** The loop appears automatically to help you process each item in a collection.
    - **Prevents errors:** Without the loop, your action might fail because it can't handle multiple items at once.
    - **Visual cue:** It's a visual way to show that your flow will repeat the action for every item in the list.
    :::

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_11_ForEach.png' | relative_url }}" alt="For Each action explained" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    ::: details Additional Learning: Use Trigger Conditions instead of Conditional Control Logic
    **Trigger conditions extend the trigger itself with the ability to selectively fire**
    💡 As a performant alternative to doing the branching logic inside the flow, triggers in Power Automate can also contain trigger conditions themselves.
    Trigger conditions can access the triggers payload. In our case the attachments are in an array inside the trigger body called `attachments`
    The following expression will check if the attachments array is not empty **AND** if the first item's content type is `application/pdf`. Note that this checks only the first attachment in the array.

    ```text
        @and(not(empty(triggerOutputs()?['body/attachments'])),equals(toLower(first(triggerOutputs()?['body/attachments'])?['contentType']),'application/pdf'))
    ```

    This condition can be specified in the **Settings** tab when selecting the trigger
    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1.11.1_triggercondition.png' | relative_url }}" alt="Trigger Conditions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    :::

1. Next, in the other **Choose a value** field to the right in the **Condition** block, type the following,

    ```text
    application/pdf
    ```

    This will ensure that for each file attachment, it will check the file extension format is .PDF.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_12_EqualToValue.png' | relative_url }}" alt="EqualToValue" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Now we'll configure the **True** path to extract the file from the email and upload it into the **Resume** Dataverse table.

    Add a new action below in the **True** path and search for `html to text`. Select the **Html to text** action.

    To learn more about the **Html to text** action, expand the following additional learning block.

    ::: details Additional Learning: Html to text action
    🤔 **What is the "HTML to text" Action?**

    The **HTML to text** action in Power Automate is used to convert HTML-formatted content into plain text. This is especially useful when you receive data (like emails, web content, or API responses) that contains HTML tags, and you want to extract just the readable text without any formatting or code.

    ⚙️ **How does it work?**

    - **Input:** You provide a string of HTML content (for example, the body of an email).
    - **Output:** The action removes all HTML tags and returns only the plain text.

    👍🏻 **When should you use it?**

    - When you want to extract readable text from emails, web pages, or API responses that contain HTML.
    - Before sending content to systems that don’t support HTML formatting (like SMS, Teams messages, or databases).
    - To clean up data for further processing or analysis.

    🔭 **Where to find it?**

    - In Agent Flows, search for the action called `HTML to text`. It's under the **Data Operations** connector.

    💡 **Key Points**

    - It removes all HTML tags and leaves only the text.
    - It does not interpret or execute scripts/styles - just strips tags.
    - Useful for data cleaning and preparing content for plain-text outputs.
    :::

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_13_AddHTMLToTextAction.png' | relative_url }}" alt="Add HTML to text action" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Next, we need to create a new connection reference for the **Html to text** action by selecting **Create new**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_createnewhtmlconnection.png' | relative_url }}" alt="Add new connection reference" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The action can now be configured. Let's add the **Body** parameter from the trigger. In the **Content** field, select the **lightning bolt icon** or **fx icon** to the right.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_15_AddDynamicContent.png' | relative_url }}" alt="Add Dynamic Content" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the **Dynamic content** tab, search for `body` and select the **Body** parameter, followed by selecting **Add**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_16_AddDynamicContent.png' | relative_url }}" alt="Add Body parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We've completed configuring this action so let's exit from the action by selecting the two angle brackets («) pointing to the left to collapse the panel.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_17_CollapseAction.png' | relative_url }}" alt="Collapse action panel" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We'll add a new action by selecting the **+ icon** underneath the **Html to text** action which will load the panel to add actions. Search for **Dataverse add**.Select the **Add a new row** action.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_19_AddANewRow.png' | relative_url }}" alt="Add a new row action" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Rename the action by pasting the following as the name in the upper left hand corner of the properties panel,

    ```text
    Add a new Resume row
    ```

    For the **Table name** parameter, search for `res` and select the **Resumes** table.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_20_RenameAndSelectResumesTable.png' | relative_url }}" alt="Rename action and configure Table name parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Resume Title** field next and select the **fx icon** to the right.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_21_AddDynamicContent.png' | relative_url }}" alt="Configure Resume Title parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the **Function tab**, enter the following expression that uses the `item()` function.

    ```text
    item()?['name']
    ```

    Select **Add** to add the expression to the **Resume Title** parameter.

    To learn more about the `item ()` function, expand the following additional learning block.

    ::: details Additional Learning: item() function
    🤔 **What is the `item()` function?**

    - When you use an **Apply to each** action, Power Automate goes through each element in a collection (array).
    - It’s most often used inside actions like **Apply to each** (or **For each**), **Select**, or **Filter array**.

    ⚙️ **How does it work?**

    - `item()` is a function that returns the current item being processed in a loop or array operation.
    - Inside that loop, `item()` refers to the _current element_ being processed.

    📌 **Where do you use it?**

    - **Apply to each:** to access properties of the current item.
    - **Select:** to transform each item in an array.
    - **Filter array:** to reference the current item being evaluated.

    🦋 **Example**

    - Expression inside a loop:
            -  `item()?['Email']`
    - This gets the `Email` property of the current item.

    💡 **Key Points**

    - `item()` is _context-sensitive_: it always refers to the current item in the loop or array operation you're in.
    - If you nest loops, you can use `items('LoopName')` to refer to items in a specific loop.
    :::

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_22_ResumeTitleParameter.png' | relative_url }}" alt="Add expression for Resume Title parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We still need to configure several more parameters, select **Show all** and in the **Cover Letter** field, select the **fx icon** to the right.

    In the **Function tab**, enter the following expression that uses the same expression in the previous [mission]({{ '/en/chapters/academy-operative-03-multi-agent/' | relative_url }}).

    ```text
    if(greater(length(body('Html_to_text')), 2000), substring(body('Html_to_text'), 0, 2000), body('Html_to_text'))
    ```

    This expression checks if the _text_ from the **Html to text** action is longer than 2000 characters, and if so, returns only the first 2000 characters; otherwise, it returns the full text.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_23_CoverLetterParameter.png' | relative_url }}" alt="Add expression for Cover Letter parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The expression will now be added to the **Cover Letter** field.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_24_ExpressionForCoverLetter.png' | relative_url }}" alt="Expression added to the Cover Letter parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. For the **Source Email Address** field, select the **lightning bolt icon** and search for `from` and select the **From** parameter from the trigger as this contains the email address value.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_25_FromParameter.png' | relative_url }}" alt="Source Email Address parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. For the **Upload Date** field, select the **fx icon** to the right. In the **Function tab**, enter the following expression that uses the `utcNow()` function.

    ```text
    utcNow()
    ```

    To learn more about the `utcNow` function, expand the following additional learning block.

    ::: details Additional Learning: utcNow function
    🤔 **What is the `utcNow()` function?**

    - The utcnow() function in Power Automate returns the current date and time in Coordinated Universal Time (UTC) in an ISO 8601 format, like: `2025-09-23T04:32:14Z`

    🦋 **Example**

    - Expression:
            -  `concat('Report generated on ', utcnow())`
    - Output is:
            - Report generated on `2025-09-23T04:32:14Z`

    💡 **Key Points**

    - **No arguments (input parameters) required:** it always gives the current UTC timestamp.
        - **Use cases**
            - Adding timestamps to logs or file names
            - Comparing current time with other dates
            - Scheduling or time-based conditions
    :::

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_26_UploadDateParameter.png' | relative_url }}" alt="Upload Date Parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We've now completed configuring the **Add a new Resume row** action so let's exit from the panel by collapsing it.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_27_CollapseAction.png' | relative_url }}" alt="Exit from action panel" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We'll add a new action by selecting the **+ icon** underneath the **Add a new Resume row** action which will load the panel to add actions. Search for **Dataverse Upload**. Select the **Upload a file or an image** action.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_29_AddUploadAFileOrAnImage.png' | relative_url }}" alt="Add the Upload a file or an image action" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Rename the action by pasting the following as the name,

    ```text
    Upload Resume File
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_30_RenameAction.png' | relative_url }}" alt="Rename action" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Content name** field next and select the **fx icon** to the right.

    In the **Function tab**, enter the following expression that uses the `item ()` function. This gets the `name` property of the current item (the attachment file).

    ```text
    item()?['name']
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_31_ContentNameParameter.png' | relative_url }}" alt="Configure Content name parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. For the **Table name** parameter, search for `resumes` and select the **Resumes** table.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_32_SelectResumesTable.png' | relative_url }}" alt="Configure Table name parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Row ID** field next and select the **lightning bolt icon** to the right.

    Search for `ID` and select the **Resume** parameter from the _Add a new row_ Dataverse action as this contains the ID value of the row to upload the PDF file to.

    Select **Add**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_33_RowIDParameter.png' | relative_url }}" alt="Select Row ID" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Column name** field and select the **Resume PDF** option.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_34_ColumnNameParameter.png' | relative_url }}" alt="Configure Column name parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Content** field and select the **fx icon** to the right.

    In the **Function tab**, enter the following expression that uses the `item ()` function. This gets the `contentBytes` property of the current item (the attachment file). `contentBytes` refers to the raw binary data of a file or attachment, encoded as a Base64 string.

    ```text
    item()?['contentBytes']
    ```

1. We've completed configuring this action so let's exit from the action by selecting the two angle brackets («) pointing to the left to collapse the panel.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_36_CollapseAction.png' | relative_url }}" alt="Collapse action panel" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Next, select the **Sends a prompt to the specified copilot for processing**, then drag and drop this action to be below the **Upload Resume File** action in the _True_ path of the condition.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_37_DragAndDropAction.png' | relative_url }}" alt="Drag and drop action in True path" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Sends a prompt to the specified copilot for processing** to configure it.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_38_SelectAction.png' | relative_url }}" alt="Select action" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the **Body/message** field, select all of the field content and clear/delete it.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_39_ClearBodyParameter.png' | relative_url }}" alt="Clear Body parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Copy and paste the following text into the **Body/message** field and highlight the `RESUME ID PLACEHOLDER`.

    ```text
    Send [ResumeId (text)] = "RESUME ID PLACEHOLDER" and [ResumeTitle (text_1)] = "RESUME TITLE PLACEHOLDER" and [ResumeNumber (text_2)]= "RESUME NUMBER PLACEHOLDER" to the Tool "Notify Teams Applicant channel" in the child agent "Application Intake Agent"
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_40_ReplaceResumeIDPlaceholder.png' | relative_url }}" alt="Replace Resume ID Placeholder text" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **lightning bolt icon**  to the right.

    Search for `resume` and select the **Resume** parameter from the _Add a new row Dataverse_ action as this contains the `ID` value of the Resume row created.

    Select **Add**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_41_SelectResumeParameter.png' | relative_url }}" alt="Select Resume parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Highlight the `RESUME TITLE PLACEHOLDER`. Select the **lightning bolt icon** to the right.

    Search for `title` and select the **Resume Title** parameter from the _Add a new row Dataverse_ action as this contains the `resume title` value of the Resume row created.

    Select **Add**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_42_SelectResumeTitleParameter.png' | relative_url }}" alt="Select Resume parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Highlight the `RESUME NUMBER PLACEHOLDER`. Select the **lightning bolt icon** to the right.

      Search for `resume number` and select the **Resume Number** parameter from the _Add a new row Dataverse_ action as this contains the `Resume Number` value of the Resume row created.

    Select **Add**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_43_SelectResumeNumberParameter.png' | relative_url }}" alt="Select Resume parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We've completed configuring this action and our agent flow 🙌🏻 You're doing great! Now let's save our event trigger flow by selecting **Save**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_saveTriggerFlow.png' | relative_url }}" alt="Save" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We now need to edit the details of the agent flow, select **Back**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_45_Back.png' | relative_url }}" alt="Select Back" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Edit** in the **Details** section and update the **Plan** to the **Copilot Studio** option.

    > [!NOTE]
    > Converting the plan to Copilot Studio allows you to manage the event trigger flow in Copilot Studio and consume Copilot Studio capacity instead of Power Automate billing.

    Select **Save**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_46_ChangePlanDetails.png' | relative_url }}" alt="Change Copilot Studio plan" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. A modal will appear to ask you to confirm to switch to Copilot Studio plan. Select **Confirm**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_47_ConfirmCopilotStudioPlan.png' | relative_url }}" alt="Confirm Copilot Studio plan change" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The plan is now updated to **Copilot Studio**. Select **Edit** as we need to publish the event trigger flow for our agent.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_48_PlanChangedAndEdit.png' | relative_url }}" alt="Edit flow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Publish**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_49_Publish.png' | relative_url }}" alt="Publish" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    Hooray! The event trigger flow is now Published 😃

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.1_50_Published.png' | relative_url }}" alt="Published" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

Let's proceed in creating a new agent flow that will be invoked by the child **Intake Application Agent**.

### 🧪 Lab 4.2 - Notify a Teams channel using an adaptive card

We're now going to create a new agent flow for the child **Intake Application Agent** that uses the values passed by the event trigger, to post an adaptive card to a Teams channel. This adaptive card will alert the HR recruitment team about the PDF that was automatically uploaded so that they can review it.

Let's begin!

1. In the **Hiring Agent** select the **Agents** tab and select the **Application Intake Agent**

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_selectAppIntakeAgent.png' | relative_url }}" alt="Select Application Intake Agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Scroll down to **Tools** and select **+ Add**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_addToolHiring.png' | relative_url }}" alt="Add Tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The **Add tool** modal will appear. Select **+ New tool**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_newToolbtn.png' | relative_url }}" alt="Select New Tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Agent flow**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_agentflowselect.png' | relative_url }}" alt="Select Agent flow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The **agent flow designer** will next load. In the **When an agent calls the flow** trigger, select **+ Add an input**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_05_SelectAddAnInput.png' | relative_url }}" alt="Select add an input" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Text** as the type of user input.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_06_SelectText.png' | relative_url }}" alt="Select Text" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the input text field, copy and paste the following for the input parameter name.

    ```text
    ResumeId
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_07_ResumeIdInput.png' | relative_url }}" alt="ResumeId input" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Repeat the same steps to add a second text input. Copy and paste the following for the input parameter name.

    ```text
    ResumeTitle
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_08_ResumeTitleInput.png' | relative_url }}" alt="ResumeTitle input" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Repeat the same steps to add a third text input. Copy and paste the following for the input parameter name.

    ```text
    ResumeNumber
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_09_ResumeNumberInput.png' | relative_url }}" alt="ResumeNumber input" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Remember how in [Recruit]({{ '/en/chapters/academy-recruit-08-add-adaptive-card/#create-a-new-topic-with-an-adaptive-card-for-user-to-submit-their-request' | relative_url }}) we added an adaptive card within a Topic for our agent? This time round, we're going to add an adaptive card in an agent flow. We're now going to add another action to our agent flow that will post an adaptive card to a Teams channel.

    Select the **+ icon** below the trigger.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_10_AddNewAction.png' | relative_url }}" alt="Add new action" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Search for **Microsoft Teams post** and select the **Post card in a chat or channel** action.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_11_SelectPostCardInAChatOrChannel.png' | relative_url }}" alt="Select post card in a chat or channel action" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. A connection reference to Microsoft Teams needs to be created with your signed in user account. Select **Sign in**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_12_SignInToCreateConnectionReference.png' | relative_url }}" alt="Select sign in" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select your user account and then select **Allow access**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_13_AllowAccess.png' | relative_url }}" alt="Select Allow access" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Configure according to the following input parameters:

    | Parameter | How to Set | Details |
    |----------|------------|---------|
    | **Post as** | Dropdown | Select the `Flow bot` option |
    | **Post in** | Dropdown | Select the `Channel` option |
    | **Team** | Dropdown | Select a team that's available in your environment that you have access to for the purpose of completing this lab exercise |
    | **Channel** | Dropdown | Select a channel that's available in your environment that you have access to for the purpose of completing this lab exercise |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_14_ConfigureParameters.png' | relative_url }}" alt="Configure input parameters" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Next, we'll configure the **Adaptive Card** field. Select the **Adaptive Card** field.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_15_SelectAdaptiveCardParameter.png' | relative_url }}" alt="Select Adaptive Card field" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Open the [Resume Table Updated JSON file](https://raw.githubusercontent.com/microsoft/agent-academy/main/docs/operative/04-automate-triggers/assets/3.2_ResumeTableUpdated.json), copy its entire contents, and paste them into the Adaptive Card field.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_16_JSON.png' | relative_url }}" alt="Copy and paste JSON" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Similar to what we did in [Recruit]({{ '/en/chapters/academy-recruit-08-add-adaptive-card/#create-a-new-topic-with-an-adaptive-card-for-user-to-submit-their-request' | relative_url }}), we're going to replace existing values in the JSON payload with actual values or dynamic content.

    First, let's update the URL for the `url` property within the `selectAction` property. This URL will be replaced with the URL of the Resumes system view in the **Hiring Hub** model-driven app. This will allow the Recruiter to select the action and be directed to the Resumes system view in the model-driven app.

    Highlight the current URL value and delete it.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_17_SystemViewURL.png' | relative_url }}" alt="Select URL value" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the **Hiring Hub** model-driven app, navigate to the **Resumes** system view using the left hand side menu and copy the URL. Then navigate back to the agent flow, and paste the copied URL into the **url** property of the within the `selectAction property`.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_18_CopyResumesSystemViewURL.png' | relative_url }}" alt="Copy Resumes system view URL" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. You should see the following where highlighted in Yellow is your environment details of the **Hiring Hub** model-driven app.

    | Parameter | Value | Explanation |
    |----------|------------|---------|
    | **Organization URI** | GUID | The Dataverse/Dynamics 365 environment organization URL |
    | **appid** | GUID | To open a specific model-driven app, the query parameter of either appid or appname is used. In this case, the appid is used |
    | **viewid** | GUID | The query parameter which is the id of the view |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_19_PasteURL.png' | relative_url }}" alt="Paste URL" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Next, we'll add dynamic content values for several properties. Let's start with the text that will display the Resume Number reference of the row that was created by the event trigger autonomously.

      Select the **panel** icon to load the action panel.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_20_SelectPannelIcon.png' | relative_url }}" alt="Select panel icon" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Scroll down to the line where you see the `text` property for `RESUME NUMBER PLACEHOLDER`. Highlight the placeholder value and delete it.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_21_DeleteResumeNumberPlaceholder.png' | relative_url }}" alt="Delete placeholder" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Click in-between the double quotation marks and select the **lightning bolt icon** or **fx icon** to the right.

      In the **Dynamic Content** tab select the **ResumeNumber** parameter and select **Add**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_22_SelectResumeNumberParameter.png' | relative_url }}" alt="SAdd ResumeNumber parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The **ResumeNumber** parameter will now be added as dynamic content to the `text` property.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_23_ResumeNumberDynamicContent.png' | relative_url }}" alt="ResumeNumber dynamic content" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We'll repeat the same steps for the `RESUME NAME PLACEHOLDER`. Scroll down to the line where you see the `text` property for `RESUME NAME PLACEHOLDER`. Highlight the placeholder value and delete it.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_24_ResumeNamePlaceholder.png' | relative_url }}" alt="Resume Name Placeholder" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Click in-between the double quotation marks and select the select the **lightning bolt icon** or **fx icon** to the right.

      In the **Dynamic Content** tab select the **ResumeTitle** parameter and select **Add**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_25_SelectResumeTitleParameter.png' | relative_url }}" alt="SAdd ResumeNumber parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The **ResumeTitle** parameter will now be added as dynamic content to the `text` property.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_26_ResumeTitleDynamicContent.png' | relative_url }}" alt="ResumeNumber dynamic content" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We'll repeat the same steps for the **Due Date** value that represents when a recruiter should review the resume by. Scroll down to the line where you see the `text` property for `May 21, 2023`.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_27_DueDatePlaceholder.png' | relative_url }}" alt="Select Allow access" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Delete this date placeholder value and click in-between the double quotation marks.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_28_DeleteDueDatePlaceholder.png' | relative_url }}" alt="Delete" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **lightning bolt icon** or **fx icon** to the right and in the **Function** tab, enter the following expression and select **Add**.

    ```text
    addDays(utcNow(), 3, 'MMM dd, yyyy')
    ```

    This expression utilizes two functions.

    | Function | Explanation |
    |----------|------------|
    | **addDays** | Adds a specified number of days to a given date and returns the resulting date in string format |
    | **utcNow** | Returns the current date and time in Coordinated Universal Time (UTC) format as a string. |

    For the utcNow value, we are formatting the date to be month and date, followed by the year.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_29_01_ExpressionDueDate.png' | relative_url }}" alt="Expression Due Date" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    The expression will now be added to the `text` property.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_29_02_ExpressionDueDate.png' | relative_url }}" alt="Expression Due Date" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Lastly, we'll update the URL for the `url` property within the `actions` array property at the bottom of the JSON payload. This current placeholder URL will be replaced with the URL of the Resume row in the **Hiring Hub** model-driven app. This will allow the Recruiter to select the `Action.OpenURL` action of the adaptive card and be directed to the Resume in the model-driven app.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_30_ViewResumeURLPlaceholder.png' | relative_url }}" alt="Delete View Resume URL placeholder" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the **Hiring Hub** model-driven app, open a row in the **Resumes** system view using the left hand side menu. The resume row will load as a form in the model-driven app.

    Copy the URL for the Resume row.

    ::: details How to navigate back to the Hiring Hub model-driven app in case you exited/closed it
    1. Browse to [https://make.powerapps.com](https://make.powerapps.com) and make sure you are in your developer environment that you're using for these lab exercises, otherwise switch to it.

        <figure class="screenshot">
          <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_31_Note_01_BrowseToURL.png' | relative_url }}" alt="Browse to make.powerapps.com" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
        </figure>

    1. Select **Apps** in the left hand side menu pane and for the **Hiring Hub** model-driven app, select the **Play** icon to load it in your browser.

        <figure class="screenshot">
          <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_31_Note_02_HiringHubApp.png' | relative_url }}" alt="Select Hiring Hub model-driven app" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
        </figure>
    :::

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_31_CopyResumeURL.png' | relative_url }}" alt="Copy Resume row URL" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Then navigate back to the agent flow, highlight the current placeholder URL value and delete it.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_32_SelectResumeURLPlaceHolder.png' | relative_url }}" alt="Delete Resume row URL placeholder" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Then paste the copied URL into the **url** property of the within the `url property`.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_33_PasteResumeRowURL.png' | relative_url }}" alt="Paste the copied Resume row URL" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. You should see the following. Delete the `GUID` id value at the end. We'll replace this dynamic content - the **ResumeId** parameter.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_34_DeleteViewResumePlaceholderURL.png' | relative_url }}" alt="Delete View Resume URL placeholder" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **lightning bolt icon** or **fx icon** to the right.

    In the **Dynamic Content** tab select the **ResumeId** parameter and select **Add**..

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_35_ResumeIdParameter.png' | relative_url }}" alt="ResumeId parameter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The **ResumeId** will be added as dynamic content. The following highlighted in Yellow is your environment details of the **Hiring Hub** model-driven app.

     | Parameter | Value | Explanation |
     |----------|------------|---------|
     | **Organization URI** | GUID | The Dataverse/Dynamics 365 environment organization URL |
     | **appid** | GUID | To open a specific model-driven app, the query parameter of either appid or appname is used. In this case, the appid is used |
     | **id** | GUID | The query parameter which is the id of the Resume row |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_36_ResumeIdDynamicContent.png' | relative_url }}" alt="ResumeId dynamic content" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We've completed configuring the **Post card in a chat or channel** action 👏🏻 Exit from the action configuration panel by selecting the **x** icon.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_37_CloseActionPanel.png' | relative_url }}" alt="Close panel" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Finally, we'll configure the last action, **Respond to the agent** by sending a text back to the agent to end the processing.

      In the **Respond to the agent** action, select **+Add an output**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_38_AddAnOutput.png' | relative_url }}" alt="Select Add an output" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Text** as the type of output.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_39_SelectText.png' | relative_url }}" alt="Select test as the type output" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Enter the following as the name of the output: ```EndConversation```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_40_EndConversationOutput.png' | relative_url }}" alt="End Conversation Output" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Enter the following as the value for the output.

    ```text
    Finished
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_41_EndConversationOutputValue.png' | relative_url }}" alt="End Conversation Output value" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We've now completed configuring the agent flow. Select **Save draft** to save the agent flow. A confirmation message will appear once saved.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_42_SaveDraft.png' | relative_url }}" alt="Save draft" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Before publishing the agent flow, we need to update the details for the agent flow. Select the **Overview** tab and select **Edit**.

    In the flow name field, enter the following.

    ```text
    Notify Teams Applicant channel
    ```

    Afterwards, select the **Refresh** icon to update the description of the agent flow using AI.

    Then select **Save** to save the updated details for the agent flow.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_43_EditDetails.png' | relative_url }}" alt="Edit and save details" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Navigate back to the **Designer** tab and select **Publish** to publish the agent flow. A confirmation message will appear once saved.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_44_PublishAgentFlow.png' | relative_url }}" alt="Publish agent flow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The agent flow now needs to be added as a tool in the **Application Intake Agent**. Navigate back to the **Hiring Agent** and select the **Agents** tab, then select the **Application Intake Agent**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_45_ApplicationIntakeAgent.png' | relative_url }}" alt="Select Application Intake Agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the **Details** section of the agent, we'll update the **Description** field. Copy the following and paste and the end of the description text.

    ```text
    and also notifies the Teams Applicant channel
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_46_UpdateAgentDescription.png' | relative_url }}" alt="Update Agent Description" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Next, we'll add the agent flow as a tool. Scroll down to the **tools** section and select **+ Add**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_47_AddTools.png' | relative_url }}" alt="Select Add" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Flow** tab and choose the agent flow created earlier, **Notify Teams Applicant Channel**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_48_NotifyTeamsApplicantChannelAgentFlow.png' | relative_url }}" alt="Select agent flow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Add and configure** next.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/03_addAndConfig.png' | relative_url }}" alt="Select Add and configure" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the **Inputs** section, the three inputs we configured earlier in the agent flow are visible. By default, the **Fill using** configuration is set to **Dynamically fill with AI**. We'll keep this setting as-is as the prompt from the event trigger (in the last action, **Sends a prompt to the specified copilot for processing** - this is steps 38 - 44 of **Lab 4.1 - Automate uploading resumes to Dataverse received by email**) will contain the parameter values that AI will extract.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_50_Inputs.png' | relative_url }}" alt="Tool agent flow inputs" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Now that the tool has been added to the **Application Intake Agent**, the instructions of the agent needs to be updated. Select the **back arrow** icon to return to the list of agents.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_51_SelectBack.png' | relative_url }}" alt="Select back arrow icon" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Application Intake Agent** in the **Agents** tab of the **Hiring Agent**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_52_SelectApplicationIntakeAgent.png' | relative_url }}" alt="Select Application Intake Agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the **Instructions** field, enter a new line after `2.Post-Upload` instructions. Copy and paste the following instructions.

    ```text
    Process for Resume Upload via Email
    1. When you receive a message, **Send [ResumeId (text)] = "1680265f-5793-f011-b41b-7c1e525be9f7" and [ResumeTitle (text_1)] = "TAYLOR TESTPERSON (FICTITIOUS).pdf" and [ResumeNumber (text_2)]= "R01026" to the Tool "Notify Teams Applicant channel"** in the child agent "Application Intake Agent", call [AGENT FLOW PLACEHOLDER]
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_53_PasteCopiedInstructions.png' | relative_url }}" alt="Update instructions of Application Intake Agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Highlight the `[AGENT FLOW PLACEHOLDER` text.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_54_HighlightPlaceholder.png' | relative_url }}" alt="Highlight placeholder" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Enter the forward slash character, `/`, and select the **Notify Teams Applicant Channel** tool.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_55_NotifyTeamsApplicatnChannelTool.png' | relative_url }}" alt="Select Notify Teams Applicant Channel tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The agent flow will now be invoked by the **Application Intake Agent** as per the instructions, after the last action (**Sends a prompt to the specified copilot for processing**) in the event trigger sends the prompt that contains the parameter values back to the agent.

    Select **Save** to save the updated instructions for the **Application Intake Agent**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_56_Save.png' | relative_url }}" alt="Select Save" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The instructions will now be updated once the agent has been saved.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_57_InstructionsUpdated.png' | relative_url }}" alt="Instructions updated" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. We now need to **Publish** the **Hiring Agent**. Select **Publish** on the upper right, and in the _Publish this agent modal_ that appears select **Publish**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_58_PublishAgent.png' | relative_url }}" alt="Publish Hiring Agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Once published, a confirmation message will appear that the agent has been published.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.2_59_AgentPublished.png' | relative_url }}" alt="Confirmation message" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

We can now test the agent!

### 🧪 Lab 4.3 - Test event trigger

1. To execute the event trigger, an email needs to be sent with a Resume pdf file. In Outlook, compose a new email message.

     | Email Component | Details |
     |----------|------------|
     | **To recipient** | Use your signed in user account as the value |
     | **File attachment** | Upload the [TAYLOR TESTPERSON (FICTITIOUS)](https://raw.githubusercontent.com/microsoft/agent-academy/main/docs/operative/test-data/resumes/TAYLOR%20TESTPERSON%20(FICTITIOUS).pdf) file  |
     |**Subject**| Job Application|
     |**Body** | Copy and paste the following below as the body of the email  |

    ```text
    Dear Hiring Manager,

    I am writing to express my interest in the Senior Power Platform Engineer position at your organization. With over nine years of experience delivering secure and scalable solutions on Microsoft cloud platforms, I am confident in my ability to contribute effectively to your team.

    In my most recent role as Lead Power Platform Engineer, I developed an automated resume-intake pipeline, reducing manual triage and improving searchability. I have delivered HR case management applications, introduced solution-aware flows, and implemented PR checks to enhance deployment lead times. My expertise includes Power Apps, Power Automate, Power Pages, Dataverse, and a range of Microsoft 365 services, as well as integration with Graph/REST APIs and Azure Functions.

    Previously, I developed Teams approvals with adaptive cards, cutting approval times to the same day, and created robust error-handling frameworks. My background also includes migrating legacy workflows to Power Automate and building self-service portals adopted by hundreds of employees.

    I hold a B.Sc. in Computer Science and am certified as a Power Platform Developer (PL-400) and Solution Architect (PL-600). I am also passionate about mentoring and have volunteered with local maker groups.

    Please find my CV attached for your consideration. I would welcome the opportunity to discuss how my skills and experience align with your needs.

    Thank you for your time and consideration.

    Kind regards,
    Taylor Testperson
    ```

    **Send** the email once composed.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_01_ComposeEmailWithAttachment.png' | relative_url }}" alt="Compose email with PDF file attachment" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the [Power Automate maker portal](https://make.powerautomate.com/) for the event trigger flow, select the **Refresh** icon to view the flow run that succeeded for the sent email.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_02_FlowRun.png' | relative_url }}" alt="Select refresh icon to view flow run" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Back in Copilot Studio in the **Hiring Agent** select the **Activity** tab.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_03_SelectActivity.png' | relative_url }}" alt="Select Activity tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. The **Activity** tab will load which will display all the activities of the **Hiring Agent**. There will be an activity with the name value of **Automated** that has a status of **Complete**. This activity represents the event trigger and the agent flow that was invoked.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_04_StatusComplete.png' | relative_url }}" alt="Activity completed" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the activity, and select the event trigger in the activity map. On the right hand side panel, notice how the input parameters in the prompt contain the `Resume Id`, `Resume Title` and `Resume Number` parameter values from the **Dataverse** row that was created. This was from the dynamic content values configured earlier in steps 38 - 44 of **Lab 4.1 - Automate uploading resumes to Dataverse received by email**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_05_EventTrigger.png' | relative_url }}" alt="Event trigger" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Navigate back to the **Hiring Hub** model-driven app and in the **Resumes system view**, select **Refresh** to refresh the view. The newly created row for the resume that was sent by email will now be listed as it was created through the event trigger.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_06_ResumeRowCreated.png' | relative_url }}" alt="Resume row created" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Navigate back to Copilot Studio and select the **Notify Teams Applicant Channel** agent flow within the **Application Intake Agent** in the activity map. On the right hand side panel, notice how the inputs have values from the Dataverse row. This was from the prompt sent by the last action (**Sends a prompt to the specified copilot for processing**) in the event trigger that contains the parameter values from the newly created Dataverse row. This is how we can pass parameter values from event triggers to agent flows.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_07_NotifyTeamsApplicantChannel.png' | relative_url }}" alt="Select agent flow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Finally, let's take a look at the adaptive card posted to the channel in **Microsoft Teams**. In the channel, we'll see the adaptive card that displays the information about the newly created Resume row in Dataverse. Hover over the hyperlink at the start of the adaptive card, notice how the URL is the Resumes system view URL that we configured earlier in the JSON (steps 15 - 19 of **Lab 4.2 - Notify a Teams channel using an adaptive card**) payload of the adaptive card.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_08_AdaptiveCardResumeTableURL.png' | relative_url }}" alt="Adaptive Card Resume Table system view URL" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the hyperlink, and you'll be directed to the Resumes system view in the **Hiring Hub** model-driven app on your browser.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_09_ResumeTableSystemView.png' | relative_url }}" alt="Resume system view in Hiring Hub model-driven app" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Navigate back to the adaptive card posted to the channel in Microsoft Teams. This time, hover over **View Resume** which is the `Action.OpenURL` action of the adaptive card. Notice how the URL is the Resumes row that we configured earlier in the JSON (steps 30 - 36 of **Lab 4.2 - Notify a Teams channel using an adaptive card**) payload of the adaptive card.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_10_AdaptiveCardResumeRowURL.png' | relative_url }}" alt="Adaptive Card Resume row URL" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the action, and you'll be directed to the Resume row form in the **Hiring Hub** model-driven app on your browser.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-04-automate-triggers/3.3_11_ResumeRow.png' | relative_url }}" alt="Resume row in Hiring Hub model-driven app" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

## ✅ Mission Complete

Congratulations! 👏🏻 Excellent work, Operative.

✅ Event trigger: you've created an event trigger that passes Dataverse parameter values to an agent flow.
✅ Built an agent flow: consumes the Dataverse parameter values to post an adaptive card to a channel in Microsoft Teams to alert the HR recruitment team.
✅ Updated child agent instructions: to invoke the flow once the event trigger has completed.

This enables the **Hiring Agent** to work autonomously whenever resumes are received as email attachments and notify the HR recruitment team for manual review.

This is the end of **Lab 04 - Automating candidate application emails**, select the link below to move to the next mission.

⏭️ Move to mission [**Understanding Agent Models and Response Formatting**]({{ '/en/chapters/academy-operative-05-model-selection/' | relative_url }})

## 📚 Tactical Resources

📖 [Make your agent autonomous in Copilot Studio](https://learn.microsoft.com/training/modules/autonomous-agents-online-workshop/?WT.mc_id=power-188561-ebenitez)

📖 [Add an event trigger](https://learn.microsoft.com/microsoft-copilot-studio/authoring-trigger-event?WT.mc_id=power-188561-ebenitez)

📖 [Use agent flows with your agent](https://learn.microsoft.com/microsoft-copilot-studio/advanced-flow?WT.mc_id=power-188561-ebenitez)

📖 [Power Automate triggers introduction](https://learn.microsoft.com/power-automate/triggers-introduction?WT.mc_id=power-188561-ebenitez)

📖 [Using Power Automate flows with agents](https://learn.microsoft.com/microsoft-copilot-studio/advanced-flow-create?WT.mc_id=power-188561-ebenitez)

📖 [Data loss prevention for Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/admin-data-loss-prevention?WT.mc_id=power-188561-ebenitez)

