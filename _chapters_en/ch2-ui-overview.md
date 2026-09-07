---
layout: chapter
lang: en
date: 2026-04-08
title: "Understanding the Copilot Studio UI"
short_title: "Understanding the UI"
description: "Explores the agent concept and Copilot Studio's main menus and core components (Topics, Generative Answers, Actions, Knowledge) from a practical perspective."
order: 2
category: guide
---

## 1. What is an agent?

In Copilot Studio, an "agent" is an **AI-powered bot that converses with users and performs specific tasks**. The unit formerly called a "Copilot" or "bot" is now standardized as an "agent."

Beyond simply answering questions, an agent can **autonomously decide the best action based on instructions and context**. It combines language models, instructions, Knowledge, Topics, tools, and triggers to achieve goals.

> 📖 **Reference**: [What is an agent?](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/fundamentals-what-is-copilot-studio#what-is-an-agent)

### 1.1 Core properties of an agent

| Property | Description | Where to configure |
|---|---|---|
| **Name / icon** | The agent's identifying information. Exposed to users. | Overview tab |
| **Description** | Describes the agent's role and purpose. | Overview tab |
| **Instructions** | Defines the agent's behavior in natural language. The LLM uses these instructions when responding. | Overview tab |
| **Knowledge** | Connects data sources the agent can reference. | Knowledge tab |
| **Topics** | Defines conversation flows for specific intents. | Topics tab |
| **Actions** | Connects external system calls, automation flows, and similar capabilities. | Actions tab |
| **AI model** | Selects the default LLM model the agent will use. | Settings > Generative AI |

<div class="info-box note">
<b>📌 Agent = conversation + knowledge + action</b><br>
An agent is not just a chatbot. It is an integrated unit that can be given a personality through <b>Instructions</b>, connected to knowledge through <b>Knowledge</b>, and perform real work through <b>Actions</b>.
</div>

### 1.2 Two operating modes of agents

| Mode | Description | Input/output |
|---|---|---|
| **Conversational** | Answers user questions in real time and provides guidance | Input: text → output: response, Adaptive Card |
| **Autonomous** | Automatically responds to events such as new records or form submissions to perform work | Input: trigger → output: automated action execution |

---

## 2. Main menus and components

### 2.1 Left navigation

| Menu | Description |
|---|---|
| **Agents** | View and manage the list of created agents |
| **Environment selection** | Switch Power Platform environments at the top (Dev / Test / Prod) |

### 2.2 Agent editing screen (six tabs)

When you select an agent, the tabs below are provided. Understanding the role of each tab clearly makes agent design much easier.

| Tab | Core role | Practical point |
|---|---|---|
| **Overview** | Define the agent's identity — name, description, **Instructions**, language, AI model selection | Becomes the **interpretation criteria** for Topics, Knowledge, and Actions |
| **Knowledge** | Connect data sources — SharePoint, OneDrive, websites, files, Dataverse | RAG foundation for Generative Answers. The **"source of truth"** |
| **Topics** | Design conversation flows — trigger → nodes (questions, conditions, actions, messages) | Use for **"areas that must not be wrong"** |
| **Actions** | External integration — Power Automate, connectors, HTTP, MCP, AI Prompt | Core capability for **"doing work beyond answering"** |
| **Publish** | Publish and deploy channels — Teams, web, M365 Copilot, etc. | Responses differ before/after publishing, so always test after publishing |
| **Analytics** | Analyze usage — session count, resolution rate, unanswered questions, CSAT | The tab where real value appears in the **operations stage** |

> 📖 **Reference**: [Create and edit topics](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-create-edit-topics) · [Knowledge sources](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-copilot-studio) · [Use actions](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-plugin-actions)

<div class="info-box warning">
<b>⚠️ Most common mistake in PoCs</b><br>
"I edited it, so why didn't it change?" — <b>If you do not publish</b>, changes are not reflected in real channels. Edits can be checked only in the test panel, while the previously published version remains in effect.
</div>

---

## 3. Orchestration modes: Classic vs Generative

The setting that determines the agent's core behavior is in **Settings > Generative AI**. This choice controls the agent's overall behavior.

| Category | Classic mode | Generative mode |
|---|---|---|
| **Intent recognition** | NLU matching based on trigger phrases | LLM understands intent from natural language |
| **Multiple intents** | One utterance → one topic | One utterance → multiple intents processed simultaneously |
| **Topic selection** | Trigger phrase similarity | LLM judgment based on the topic's **name and description** |
| **Action calls** | Explicit node placement inside topics | LLM autonomously selects appropriate actions |
| **Control** | ✅ High (predictable) | ⚠️ Flexible, but requires testing |
| **Suitable scenarios** | Structured conversations, policy/process guidance | Flexible conversations, multiple intents, FAQs |

> 📖 **Reference**: [Orchestrate agent behavior with generative AI](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-generative-actions)

<div class="info-box tip">
<b>💡 Practical recommendation — hybrid model</b><br>
The architecture that works best in practice is a hybrid approach: <b>turn on Generative mode by default, but design core work as topics</b>.
<ul>
<li><b>First</b>: attempt topic matching → if matched, run the structured flow</li>
<li><b>Second</b>: if matching fails → Generative Answers (Knowledge-based AI answer)</li>
<li><b>Third</b>: if that still fails → Fallback Topic (escalation guidance)</li>
</ul>
This clearly separates roles: <b>"Topics for what must not be wrong, Generative for what must be flexible."</b>
</div>

---

## 4. Topics in detail

**Topics** are the core unit that defines **conversation flows for specific user intents**.

### 4.1 Three ways to create topics

| Method | Description | Best suited for |
|---|---|---|
| **Manual creation** | Add nodes one by one from an empty topic | When fine-grained control is needed |
| **Natural-language creation (Generative Builder)** | AI creates it when you describe "create a topic like this" | Fast prototyping |
| **Modify an existing topic** | Modify an existing topic in natural language with Copilot assistance | Iterative improvement |

> 📖 **Reference**: [Create and edit topics with Copilot](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/nlu-authoring)

### 4.2 Components of a topic

1. **Trigger**: The topic is activated when the user enters specific phrases.
   - Classic mode: matches by trigger phrase similarity
   - Generative mode: the LLM automatically matches based on the topic's **name and description**

2. **Node**: A processing step inside a topic

| Node type | Description | Example use |
|---|---|---|
| **Message node** | Shows text/cards to the user | Guidance messages, result output |
| **Question node** | Requests information from the user (choices, text, etc.) | Name, type, date input |
| **Condition node** | Handles conditional branching (if/else) | Different processing by type |
| **Action node** | Calls external systems | API calls, email sending |
| **Topic redirect** | Switches the flow to another topic | Modular conversation structure |
| **Generative Answers node** | Generates Knowledge-based AI answers | Dynamic responses from specific sources |

### 4.3 System topics vs user topics

| Category | Description | Examples |
|---|---|---|
| **System topics** | Provided by default. Can be modified but not deleted. | Greeting, Escalation, End of Conversation, **Conversational Boosting**, Fallback |
| **User topics** | Custom conversation flows created directly by users. | Leave requests, IT requests, product inquiries |

### 4.4 Conversational Boosting — the built-in "AI answer engine"

When you create an agent, a **Conversational Boosting** system topic is automatically created. This topic includes a **Generative Answers node** by default, so AI answers start as soon as you connect Knowledge sources.

```
User question → attempt topic matching
  ├─ Matched → run that topic (structured flow)
  └─ Not matched → Conversational Boosting Topic
       → Generative Answers node (Knowledge-based answer)
            ├─ Answer generated successfully → respond with citation
            └─ Generation failed → Fallback Topic (escalation/guidance)
```

<div class="info-box tip">
<b>💡 Practical tip — topic design principles</b><br>
<ul>
<li>You do not need to create a topic for every question. Create topics only for <b>structured business processing (leave requests, IT requests, etc.)</b>, and leave the rest to Generative Answers.</li>
<li>In Generative mode, the <b>topic name and description are more important</b> than trigger phrases. The LLM uses them to decide which topic to call.</li>
<li><b>"Topics if it must not be wrong, Generative if it must be flexible"</b> — establish this decision criterion first.</li>
</ul>
</div>

---

## 5. Generative Answers in detail

**Generative Answers** is a feature that provides **LLM-generated answers based on connected Knowledge sources** for user questions that do not match predefined topics.

### 5.1 How it works

1. User enters a question
2. Attempt topic matching → matching fails
3. Search for related documents/information in Knowledge sources (semantic search)
4. Pass search results to the LLM (RAG pattern)
5. LLM generates a natural answer that fits the context
6. Validate results and check content safety
7. Provide the answer with a **citation**

> 📖 **Reference**: [Use generative answers in a topic](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/nlu-boost-node)

### 5.2 Where to place Generative Answers

Generative Answers nodes can be **placed in multiple locations**, allowing flexible answer strategies.

| Placement | Description | Use scenario |
|---|---|---|
| **Conversational Boosting Topic** (default) | Runs automatically when topic matching fails | General FAQs, document-based Q&A |
| **Inside a specific topic** | Inserted in the middle of a topic flow | Provide additional information in a specific context |
| **Before Fallback** | Last attempt before escalation | Minimize unresolved questions |

### 5.3 Key settings

| Setting | Description | Reference |
|---|---|---|
| **Limit response scope** | "Search only selected sources" — use only specific Knowledge sources | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/nlu-boost-node) |
| **Use general knowledge** | Use general knowledge — whether to use general information outside Knowledge | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-copilot-studio#allow-the-agent-to-use-general-knowledge) |
| **Content moderation** | Set the strictness level of responses (high/medium/low) | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/nlu-gpt-quickstart) |

---

## 6. Actions in detail

**Actions** are capabilities for an agent to **interact with external systems**. This is the point where a "Copilot that answers" becomes an **"agent that handles work"**, and in most customer PoCs it is the **highest-impact capability**.

### 6.1 Action types

| Type | Description | Example | Reference |
|---|---|---|---|
| **Power Automate flow** | Calls an existing PA flow | Approval requests, email sending | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-flow) |
| **Connector action** | Directly calls standard/custom connectors | SharePoint lookup, Outlook mail | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-plugin-actions) |
| **HTTP request** | Direct REST API call | External ERP/CRM data | [Learn](https://learn.microsoft.com/ko-kr/connectors/custom-connectors/) |
| **MCP server** | Connects a Model Context Protocol server | Calls tools from a custom MCP server | |
| **AI Prompt** | Runs a custom prompt against an AI model | Generate HTML cards, summarize data | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/prompts-overview) |

### 6.2 Action execution in Classic vs Generative mode

| Category | Classic mode | Generative mode |
|---|---|---|
| **Call method** | Explicit call from an action node inside a topic | LLM autonomously decides and calls |
| **Parameter collection** | Collected in advance with question nodes | Asks the user only for missing information |
| **Result handling** | Stored in variables and used manually | Automatically summarized and reflected in the response |

> 📖 **Reference**: [Orchestrate agent behavior with generative AI](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-generative-actions)

<div class="info-box warning">
<b>⚠️ Caution when using Generative Actions</b><br>
In Generative mode, the agent may call actions unintentionally. For <b>actions with side effects</b> such as sending email or modifying data, clearly restrict the call conditions in the instructions. Example: <em>"Before sending an email, always confirm the recipient, subject, and body with the user."</em>
</div>

---

## 7. Knowledge in detail

**Knowledge** is the **data source the agent references when generating answers**. It is the core foundation for Generative Answers and determines the agent's expertise and accuracy.

### 7.1 Supported Knowledge sources

| Source type | Description | Synchronization | Reference |
|---|---|---|---|
| **SharePoint site** | Site URL connection | Automatic every 4–6 hours | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-add-sharepoint) |
| **OneDrive** | Personal/shared OneDrive files | Automatic every 4–6 hours | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-unstructured-data) |
| **Website URL** | Crawl public websites | Periodic | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-copilot-studio) |
| **File upload** | Direct upload of PDF, Word, Excel, PPT | Manual refresh | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-unstructured-data) |
| **Dataverse** | Power Platform table data | Real time | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-copilot-studio) |

<div class="info-box tip">
<b>💡 Practical tip — "document quality = agent quality"</b><br>
When an agent's response quality is low, it is easy to think it is an LLM problem, but <b>most cases are document quality problems</b>.
<ul>
<li><b>✅ Recommended</b>: documents with clear titles and tables of contents, one document = one topic, keep only current documents</li>
<li><b>❌ Not recommended</b>: uploading PPT slides as-is, mixing duplicate/draft documents, documents with unclear permissions</li>
<li><b>If you only add Instructions without Knowledge</b>, response quality becomes highly unstable. Be sure to configure them together.</li>
</ul>
</div>

### 7.2 Knowledge access permissions

- **SharePoint Knowledge**: **Inherits** the user's Entra ID permissions **as-is**. Documents the user cannot access are not included in responses.
- **File upload**: All users who can access the agent can receive the contents of the file. Be careful if it includes sensitive information.

---

## 8. Instructions writing guide

**Instructions** are the most important element configured on the agent's Overview tab. They define the agent's personality, role, and constraints in natural language, and serve as the **top-level control layer for all decisions** in Generative Orchestration.

### 8.1 Recommended structure

```
## 9. Role
You are an expert [business domain] agent for [organization name].

## 10. Goal  
[Core purpose in 1–2 sentences]

## 11. Tone & style
- Answer in a friendly but professional tone
- Provide technical terms with easy explanations

## 12. Constraints (Do / Don't)
- ✅ Reference only information in Knowledge
- ✅ If you are not sure, say "confirmation is needed"
- ❌ Do not answer questions unrelated to internal policies
- ❌ Do not make unsupported guesses

## 13. Action-related constraints
- Before sending an email, always confirm the recipient/subject/body with the user
```

> 📖 **Reference**: [Quickstart: Create an agent](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/fundamentals-get-started)

<div class="info-box note">
<b>📌 Instructions are "policy," not just "prompts"</b><br>
It is okay for them to be long. They must not be ambiguous. Because Instructions are the <b>operating policy the agent references in every conversation</b>, they must be clear and specific. In particular, describe <b>what not to do (Don't)</b> as specifically as possible.
</div>

---

## 14. Analytics — the key to operational improvement

The Analytics tab provides data for **continuous quality improvement** after an agent is deployed.

| Metric | Description | Improvement action |
|---|---|---|
| **Total sessions** | Number of conversations within a given period | Understand usage trends |
| **Resolution Rate** | Percentage of user questions successfully resolved | If low, strengthen Knowledge/Topics |
| **Escalation rate** | Percentage of conversations transferred to an agent | If high, improve the Fallback Topic |
| **Thumbs up/down** | User satisfaction feedback | Analyze low-scoring questions |
| **Unanswered questions** | List of questions that could not be answered | → Add topics or strengthen Knowledge |
| **Usage by Knowledge source** | Which sources are referenced often | Remove unnecessary sources / strengthen core sources |

> 📖 **Reference**: [Analytics overview](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/analytics-overview)

<div class="info-box tip">
<b>💡 Practical tip — how to use unanswered questions</b><br>
The <b>unanswered questions list</b> in Analytics is a "gold mine." Regularly review questions users actually ask but the agent cannot answer:
<ul>
<li>Repeated questions → <b>add a new topic</b> (when a structured answer is needed)</li>
<li>Questions with answers in documents → <b>check Knowledge sources</b> (possible parsing issue)</li>
<li>Questions that cannot be answered → <b>improve the fallback message</b> ("For this question, contact [owner]")</li>
</ul>
</div>

---

## 15. Responsible AI and security

All generative AI capabilities in Copilot Studio are operated according to **Microsoft's Responsible AI standards**.

| Area | Measure | Reference |
|---|---|---|
| **Response validation** | Reduce hallucinations with data grounding | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/responsible-ai-overview) |
| **Content moderation** | Automatically filter harmful/non-compliant content | |
| **Data protection** | Conversation data is temporarily stored only for operational support purposes | |
| **Not used for model training** | Customer data is not used to train models | |
| **Customer Lockbox** | Customer approval required for support access | |

<div class="info-box note">
<b>📌 Next chapter preview</b><br>
In this chapter, we covered Copilot Studio's UI structure and core concepts. In the next <b>Chapter 3</b>, we will walk step by step through the process of actually creating an agent — conversation design, variable management, action connection, and use of Generative Orchestration.
</div>
