---
layout: chapter
lang: en
date: 2026-04-08
title: 'Building a semi-development agent'
short_title: "Semi-development agent"
description: "A step-by-step guide to Copilot Studio conversation design, variable and state management, action-based processing flows, and using Generative Orchestration."
order: 3
category: guide
---

## 1. Goal of this chapter

This chapter walks through the process of creating an actual agent with Copilot Studio. From **conversation design → variable management → action connections → Generative Orchestration**, it shares a practical methodology validated in field workshops.

---

## 2. Choosing a conversation design approach

There are two main ways to design an agent's conversation in Copilot Studio. They are not mutually exclusive; you can **freely combine them within a single agent**.

### 2.1 Instructions-based design

When you write instructions in natural language on the agent's **Overview tab**, the LLM autonomously leads the conversation based on them.

**Suitable when:**
- Questions are **open-ended and varied**
- The flow should follow "knowledge → judgment → action"
- B2E (internal employee-facing) work support, or mixed knowledge + automation scenarios

**Recommended instruction structure (practical template):**

```
## 3. Role
You are an expert [business domain] agent for [organization name].

## 4. Order of behavior
1. First classify the intent of the question
2. If it is unclear, ask follow-up questions
3. If you can answer, answer based on Knowledge
4. If work is needed, call the appropriate Action/Flow
5. Summarize the result and explain it to the user

## 5. Constraints
- Provide only answers grounded in internal policy documents
- If there is no basis, say "confirmation is needed"
- Before sending an email/message, always ask the user to confirm the content

## 6. Available tools
- [HR policy search] — SharePoint Knowledge
- [Send email] — Outlook connector
- [Create IT ticket] — ServiceNow Flow
```

> 📖 **Reference**: [Generative orchestration guidance](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/guidance/generative-mode-guidance)

<div class="info-box tip">
<b>💡 Practical tip — state "what the agent can do" in the instructions</b><br>
If you include the <b>list of tools the agent can use</b> in the instructions, the LLM can continue the conversation more naturally and select appropriate actions. <b>"Use these tools within this scope"</b> produces much better results than "figure it out."
</div>

### 6.1 Topic-based design

When structured business processing is needed, design the conversation in the **Topics tab** as a trigger → node flow.

**Suitable when:**
- The work **procedure is fixed** (help desk, approval process)
- **Branches/conditions** are clear
- It is an **"area that must not be wrong"**

**Topic design flow:**

```
Define trigger phrases (or automatically match by topic name/description in Generative mode)
  → Question node (collect required information → store in variables)
    → Condition node (branch based on variable values)
      → Action node (call external system)
        → Return result through output variables (message node ❌)
```

> 📖 **Reference**: [Create and edit topics](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-create-edit-topics)

<div class="info-box warning">
<b>⚠️ Most common mistake — adding a message node at the end of a topic</b><br>
In Generative Orchestration mode, if you place a fixed message at the end of a topic, the LLM <b>cannot make decisions after that topic</b>. Instead, return only the result through an <b>output variable</b>, and delegate the final answer to the agent to generate autonomously.
</div>

### 6.2 Which approach should you choose? — decision criteria

| Decision criterion | Topic-based | Instructions (Generative)-based |
|---|---|---|
| **Question type** | Structured/fixed | Open/varied |
| **Control level** | High (predictable) | Flexible (autonomous judgment) |
| **Maintenance** | More upfront design effort | Document/instruction management is important |
| **Suitable scenarios** | Policy/process/procedure guidance | FAQs, document Q&A, summaries, mixed work |
| **Core principle** | **"Topics if it must not be wrong"** | **"Generative if it must be flexible"** |

---

## 7. How to use variables

Use the **Variable** system to store and pass data during conversations.

### 7.1 Variable types

| Type | Scope | Purpose |
|---|---|---|
| **Topic variable** | Valid only within that topic | Store question responses, intermediate calculated values |
| **Global variable** | Valid across the entire conversation session | Pass data between topics, maintain state |
| **System variable** | Provided by Copilot Studio by default | User name, channel information, etc. |

> 📖 **Reference**: [Work with variables](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-variables) · [Variables overview](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-variables-about)

### 7.2 Common variable patterns

| Purpose | Variable naming convention | Description |
|---|---|---|
| User input | `varUserInput` | Automatically created from question nodes |
| Classification result | `varIntent`, `varCategory` | Used for conditional branching |
| Attachments | `varAttachments` | References the `Activity.Attachments` system variable |
| Flow result | `varResult`, `varRequestId` | Maps action output values |
| Recipient information | `varRecipient`, `varEmail` | For sending emails/messages |

### 7.3 Key system variables

| Variable name | Type | Description |
|---|---|---|
| `Activity.Text` | string | The most recent message sent by the user |
| `Activity.Channel` | choice | Current conversation channel (Teams, Web, etc.) |
| `Activity.From.Id` | string | User's channel-specific unique ID |
| `Activity.From.Name` | string | User's display name |
| `System.User.DisplayName` | string | Signed-in user's display name |

> 📖 **Reference**: [System variables list](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-variables-about#system-variables)

### 7.4 Variable mapping order (practical must-follow)

When using variables, you **must follow this order**. If you ignore the order, values can be empty at runtime.

```
1. Create the variable first (define name and type)
2. System / Topic / Prompt output → store in variable
3. Variable → map to Flow input
4. Flow output → receive back into variable
5. Use variable values in messages/conditions
```

<div class="info-box warning">
<b>⚠️ Common mistake</b><br>
If you <b>directly reference a system variable</b> from Flow input, the value is empty at runtime. Always store it in a topic variable first, then map that variable to the Flow input.
</div>

### 7.5 Passing variables between topics

When passing data between topics, the **Redirect + return variable** pattern is recommended instead of global variables.

1. **Sending topic**: pass values from the Redirect node
2. **Receiving topic**: check "Receive values from other topics" in variable properties
3. **Return**: check "Return values to original topics" in variable properties

This lets you create clean data flows without overusing global variables.

> 📖 **Reference**: [Pass variables between topics](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-variables#pass-variables-between-topics)

### 7.6 Initializing variables from external sources

When embedding an agent in a website, you can pass user information in advance.

1. Create a global variable → check **"External sources can set values"**
2. Pass via URL query parameter: `botURL?UserName=AlexKim`

> 📖 **Reference**: [Set global variables from external sources](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-variables-bot#set-global-variables-from-external-sources)

### 7.7 Using Power Fx formulas

Copilot Studio supports the **Power Fx** formula language to handle complex operations and data transformations.

```
// Concatenate strings
Concatenate(VarFirstName, " ", VarLastName)

// Conditional message
If(VarRequestType = "긴급", "긴급 처리팀에 전달합니다.", "일반 접수되었습니다.")

// Date calculation
DateAdd(Now(), 3, TimeUnit.Days)
```

> 📖 **Reference**: [Create expressions using Power Fx](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-power-fx)

---

## 8. Action-based processing flow

An **Action** is the core capability for an agent to call external systems during a conversation and **perform real work**. It is the point where an "answering Copilot" turns into a **"working agent."**

### 8.1 Comparing action connection methods

| Method | Best suited for | Characteristics | Reference |
|---|---|---|---|
| **Connector-based** | Standard services such as Outlook and Teams | Immediately usable with configuration only | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-plugin-actions) |
| **Power Automate flow** | Complex multi-step processing | Supports error handling and loops | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-flow) |
| **MCP server** | Custom-built tools/services | Flexible external tool integration | |
| **AI Prompt** | Custom AI response generation | Full prompt control | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/prompts-overview) |

### 8.2 Practical tips for designing Power Automate flows

**Recommended architecture:**

```
Copilot Studio Agent
  └─ Action call (Agent handles judgment/branching)
       └─ Power Automate Cloud Flow (executes only structured work)
            └─ (if needed) Desktop Flow / external API / MCP
```

**Core design principles:**

| Principle | Description |
|---|---|
| **100-second limit** | Flows must complete within 100 seconds. Separate long-running logic |
| **Agent decides, Flow executes** | Handle if/else branching in the agent's topic/LLM, and let Flow handle execution only |
| **Return only results** | Flow returns only result values through output variables; delegate answer writing to the agent |
| **Same environment** | Flow and agent must be in the **same Power Platform environment** to connect |

<div class="info-box warning">
<b>⚠️ Failure pattern — handling all logic inside Flow</b><br>
If you handle if/else plus text composition entirely inside Flow, you fall into <b>debugging hell and unmaintainable flows</b>. Keep Flow focused on <b>"receiving commands, executing them, and returning only results."</b>
</div>

### 8.3 Connector-based action setup (step by step)

1. Click the **Actions tab** → **Add an action**
2. Search for the connector to use (for example, "Office 365 Outlook")
3. Select an operation (for example, "Send an email (V2)")
4. Set input parameters to variables or fixed values
5. Select an authentication method

| Authentication method | Description | Usage scenario |
|---|---|---|
| **End-user authentication** | Runs under the user's own account | Sending personal mail, querying the user's own calendar |
| **Author-provided authentication** | Runs under the agent author's service account | Shared notifications, service account use |

> 📖 **Reference**: [Use actions with custom agents](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-plugin-actions)

---

## 9. Practical guide to Generative Orchestration

### 9.1 How to enable it

1. Select the **Settings** button → **Generative AI**
2. Select the **Generative** radio button (default: Classic)
3. Set the content moderation level
4. Click **Save**

> 📖 **Reference**: [Orchestrate agent behavior with generative AI](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-generative-actions)

### 9.2 Core design points in Generative mode

In Generative mode, **topic/action names and descriptions** are more important than trigger phrases. The LLM uses them to decide which tool to use.

**Example of a good topic name/description:**

```
Name: IT equipment request
Description: Used when employees request IT equipment such as laptops, monitors, and keyboards.
             Collects the required equipment type and purpose of use, then registers them in SharePoint.
```

**Example of a good action description:**

```
Name: Send email (Outlook)
Description: Sends an email to the specified recipient.
             Calls this only when requested by the user, and always confirms the content before sending.
```

### 9.3 Testing and debugging

- **Activity Map**: When enabled in the test panel, you can visually trace which topic the agent selected and which action it called.
- **Variable watch**: In the **Test** tab on the side of the test panel, you can check current variable values in real time.

<div class="info-box tip">
<b>💡 Difference between the test panel and real behavior</b><br>
The test panel may <b>behave differently</b> from real channels (Teams, Web). Differences occur especially with authentication-related actions, channel-specific Adaptive Card rendering, and fallback behavior. Be sure to <b>test in real channels after publishing</b>.
</div>

---

## 10. Top 7 mistakes from workshops

These are mistake patterns repeatedly observed in field workshops. Avoiding just these significantly improves agent quality.

| # | Mistake | Solution |
|---|---|---|
| 1 | **Role conflicts from mixing Topic and Generative usage** | Separate roles: Topics for structured areas, Generative for free-form areas |
| 2 | **Handling all logic (branching + text) inside Flow** | Agent decides, Flow only executes |
| 3 | **Directly referencing system variables without creating variables** | Always store in topic variables first, then map |
| 4 | **Ending instructions with one sentence** ("help me") | Specify role, behavior order, constraints, and tool list |
| 5 | **Not writing Knowledge source descriptions** | In Generative mode, the LLM uses them as criteria for source selection |
| 6 | **Mistaking the test panel for real behavior** | Always validate in real channels after publishing |
| 7 | **Overusing prompts/actions without understanding the credit structure** | Refer to the billing structure in Ch1 and estimate in advance with the Estimator |

---

## 11. Summary of agent design best practices

| Principle | Description |
|---|---|
| **Keep topics minimal** | Use topics only for structured work; leave the rest to Generative Answers |
| **Write instructions like policy** | Specific rules with clear roles, goals, and constraints |
| **Use meaningful variable names** | `VarRequestType` > `Var1` |
| **Describe actions in detail** | Criteria for LLM judgment in Generative mode |
| **No message node at the end of a topic ❌** | Return through output variables; final answer by LLM |
| **Flows return only results** | Agent decides/branches; Flow executes |
| **Add constraints to security-sensitive actions** | User confirmation is required for email, data modification, etc. |
| **List tools in instructions** | Helps the LLM select actions more accurately |

<div class="info-box note">
<b>📌 Next chapter preview</b><br>
In this chapter, we learned the core methodology for building agents. In the next <b>Chapter 4</b>, we cover specific methods and authentication settings for integrating the created agent with external systems (Power Automate, APIs, MCP).
</div>
