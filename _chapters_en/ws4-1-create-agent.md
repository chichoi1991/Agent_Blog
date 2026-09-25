---
layout: chapter
lang: en
date: 2026-05-09
title: "Create an agent and write Instructions"
short_title: "Create an agent and write Instructions"
description: "Create an agent with Agent Builder - Create an agent and write Instructions"
order: 1
category: workshop
parent: "ws4"
---

## Step 1: Create an agent and write Instructions

## 🔍 Where do you create an agent in Agent Builder?
The simplest and easiest way to create **your own Agent** in Copilot is to use Agent Builder.
Agent Builder is available in Teams or the M365 Copilot App, and you can create an agent from **[Create an agent]** on the left side of the Copilot window.

<img width="1314" height="974" alt="image" src="{{ '/assets/image/github-attachments/3ee3b7af-994c-41ec-9ee4-dda3f95ec23b.png' | relative_url }}" />


If the Copilot app does not appear in the left tab of Teams, add and pin the Copilot app as shown below, then use it.

<img width="1323" height="974" alt="image" src="{{ '/assets/image/github-attachments/cc3a453f-9e2e-41bc-b006-a6fb32d960c5.png' | relative_url }}" />


## Are Instructions important? <br>
- **Core element that determines agent behavior**: Instructions define what tasks Copilot performs and how it responds.
- **Improve user experience**: Clear and specific Instructions provide accurate answers and consistent results.
- **Maintain security and compliance**: Instructions can clearly set data access scope and processing rules.

---

## 🛠 Principles for writing effective Instructions <br>
<br>

| Principle | Description |
|------|------|
| **Clarity** | Avoid ambiguous expressions and specify concrete tasks and conditions. |
| **Conciseness** | Reduce unnecessary sentences and include only the core rules. |
| **Context** | Include required information such as data sources, output format, and exception handling. |
| **User friendliness** | Instruct the agent to provide results in intuitive formats such as tables and Markdown. |
| **Safety** | Specify compliance and security policies when handling sensitive data. |

---

## ✅ Example
**Purpose**: Search and summarize documents in SharePoint  
**Example Instructions**:
- Search SharePoint documents using the keyword requested by the user.
- Select the most relevant document from the search results.
- Summarize the key content in 3-5 lines, and show the original document name and location.
- Provide the output in Markdown table format.

---

📌 Reference:  
[Declarative Agent Instructions – Microsoft Docs](https://learn.microsoft.com/ko-kr/microsoft-365-copilot/extensibility/declarative-agent-tool-comparison)

---

# ✅ Lab

## 1. Create an agent in Copilot Agent Builder

In this lab, before preparing for a meeting, you will create a **Partner Insight Agent** that analyzes information about the person you are meeting with by combining information about you, your organization, and external data, helping you prepare for an effective meeting.

<img width="1200" height="666" alt="image" src="{{ '/assets/image/github-attachments/ac8ac136-d80c-44d6-8312-c14dfc5c2a68.png' | relative_url }}" />


First, select Copilot in the Teams app or browser to create the agent. <br>
> This lab is based on creating and sharing the agent in **web browser-based Teams**.

Site links <br>
- Microsoft Teams: [https://teams.microsoft.com/v2/](https://teams.microsoft.com/v2/)
- Microsoft 365 Copilot app: [https://m365.cloud.microsoft/chat/](https://m365.cloud.microsoft/chat/)

In Copilot, expand the left tab and select **Create an agent** to move to the agent creation screen.

<img width="1195" height="672" alt="image" src="{{ '/assets/image/github-attachments/9071c76e-3cfc-4a68-9621-2a0d1438957e.png' | relative_url }}" />



## 2. Configure basic agent settings and Instructions

There are two ways to create and edit an agent. <br>
1. Describe the desired agent conversationally so Copilot automatically adds and edits Instructions and materials
2. Manually add and edit Instructions, materials, and capabilities in the configuration screen

By using both methods appropriately, you can first describe the agent conversationally to create a draft, then enter detailed Instructions and information through manual settings. This helps you build the agent faster and in a more structured way.

In this session, you will use both methods to configure the agent's basic settings and Instructions.

### 2-1. Draft the agent conversationally

In the prompt box in the center of the agent creation screen, define the concept and purpose of the **Partner Insight Agent** as shown below. <br> 
After you enter it and wait, the name changes and the name, description, Instructions, and sample prompts are added.

```
I want to create a Partner Insight Agent.
Its purpose is to provide related information and insights about users who have upcoming meetings or need relationship building, so it can provide data that helps users communicate effectively with the other party before the meeting.
```
<br>

<img width="1606" height="1039" alt="image" src="{{ '/assets/image/github-attachments/03f89d56-5a00-4311-82ea-ddf617173980.png' | relative_url }}" />

After you enter it, Copilot writes the agent's basic information, example prompts, and Instructions based on the user's intent.

<img width="1197" height="674" alt="image" src="{{ '/assets/image/github-attachments/8f7a0ea0-6ac6-4c7d-a368-6f84cd0ffbc6.png' | relative_url }}" />

### 2-2. Adjust detailed Instructions and tasks through manual configuration

After the agent's basic settings are automatically created through conversational input, add detailed Instructions and reference materials through manual settings.


First, to apply detailed Instructions that prioritize reference materials around comprehensive insight analysis,
copy the Instructions below and overwrite the existing Instructions.

<img width="1200" height="638" alt="image" src="{{ '/assets/image/github-attachments/3810c2a8-65b6-483e-a902-0a13e9701bf3.png' | relative_url }}" />


```
# Purpose
Before meeting with a customer, provide related **business relationships, insights, proposal keywords, and actions** in advance,  
helping the team and executives **understand the customer quickly and accurately** and make effective decisions.  
Actively use web search to reflect the latest information,  
and clearly notify the user in advance when there may be a connection to internal policies such as entertainment or hospitality.

---

# General Instructions
- When an information lookup is requested, analyze it using the **comprehensive insight analysis** approach.
- **Actively use web search**, and combine it with internal information (email, chats, Teams, etc.) to comprehensively look up customer information.
- For external person information lookup or meeting preparation,  
  refer to the **internal external-person meeting (entertainment/hospitality) policy** in SharePoint and **notify the user of cautions as well**.
- Clearly show information sources and connections to increase reliability.
- Always communicate in a friendly and professional tone.
- Do not share sensitive or confidential information.
- Also present **key keywords and actionable action ideas** that are directly connected to work.
- Provide the latest information, and  
  if an information source is more than one year old, show the warning below as a note.  
  > ⚠️ This information source is more than one year old and may not be up to date.

---

# Skills
- Actively explore the latest industry trends, customer news, and competitor information through web search.
- From internal information (email, chats, Teams, internal sites, etc.),  
  identify conversations, requests, issues, and business relationships related to the customer.
- Based on the information found, provide **work-relevant insights, proposal keywords, and actionable action lists**.
- When providing comprehensive insight analysis, follow the **"Comprehensive information output format"** rules.
- **When the user requests it**, provide infographic and HTML outputs.  
  Follow the **"Infographic and HTML output rules"** for detailed presentation.

---

# Step-by-step guide
1. First, check key related information centered on the customer name.  
   (Actively use LinkedIn if related person information exists there)
2. Use web search to explore the customer's latest news, issues, industry trends, and competitor information.
3. Look up customer-related information and work context from internal systems such as email, chats, and Teams.
4. Summarize business relationships, related projects, issues, and major conversation records.
5. Also provide **key keywords and proposed actions** that the team can use.

---

# Comprehensive information output format
- Use Markdown and tables to improve readability.
- **Person information**
  - Name, title, company, recent interest keywords
- **Recent news**
  - Latest news mentioning the person or their company
  - Related news with high relevance to the work
- **Relationship to work**
  - Summary of related information found in internal systems
  - Priority:  
    ① Direct mention of the person  
    ② The person's department  
    ③ Company name and department work criteria

---

# Infographic and HTML output rules
- You can visualize comprehensive insight analysis results in an **HTML-based infographic format**.
- Main components:
  - Person information
  - Recent news and issues
  - Internal relationships
  - Key keywords
  - Proposed actions
- Use visual elements such as graphs, tables, and icons so the information can be **understood at a glance**.
- Use a concise and readable layout.

## Link presentation principles (required)
- When producing infographic and HTML output, provide all external and internal links as **hyperlinks**.
- Do not expose full URLs (https://, etc.) directly on the screen.
- Use the following standards for link text.
  - News → article title
  - Person information → person name or profile source
  - Company information → company name or official material name
- Examples:
  - ✅ [OOO CEO interview – 2025 industry outlook]
  - ❌ https://news.site.com/article/123456

---

# Additional suggestions after results (required)
- After providing comprehensive insight analysis results,  
  also provide a **follow-up suggestion** such as the following.

> 📊 If you want, I can organize this content into  
> **an executive briefing infographic / HTML report. Would you like that?**

---

# Examples
- "Based on the customer's recent industry news and internal meeting records, the following collaboration proposals are possible."
- "The main requests found in email and Teams chats are as follows, and the actions the team can execute immediately are listed below."

---

# Feedback and follow-up
- If the request is unclear or the customer name is missing, ask for additional information.
- If the results are insufficient, suggest additional web search or internal information lookup.
- After comprehensive analysis, suggest whether the user wants an **HTML-based infographic report**.

---

# Limitations and error handling
- Consolidate duplicate information and present it only once.
```

You can continue changing and testing conversational and manual Instructions while configuring and testing the agent.

When you finish, move to the next lab step to add reference materials and capabilities.

[**Go to Add reference material capabilities**]({{ '/en/chapters/ws4-2-ref-feature/' | relative_url }})
