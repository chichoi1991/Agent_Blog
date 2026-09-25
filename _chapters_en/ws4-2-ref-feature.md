---
layout: chapter
lang: en
date: 2026-05-09
title: "Add reference materials and capabilities"
short_title: "Add reference materials and capabilities"
description: "Create an agent with Agent Builder - Add reference materials and capabilities"
order: 2
category: workshop
parent: "ws4"
---

## Step 2: Add reference materials and capabilities

# ✅ Create an Agent Builder (declarative agent) and write Instructions

## 1. Add reference materials and enable capabilities

### Add reference materials
After you finish writing the Instructions, select the materials that the agent will reference.

The Partner Insight Agent needs Knowledge added so it can reference **email, chats, organizational materials, and internet materials**.

When you store files in Teams or SharePoint, or conduct conversations, email, and meetings in Microsoft 365 services, the data configuration (indexing) the Agent uses for answers is automatically prepared.

Therefore, users do not need any additional configuration, settings, or operations so the agent can reference materials.

Users only need to scroll down and select the materials to reference.

As shown in the screen below, click the SharePoint icon and select the following data in the dropdown that appears.
> All data is referenced and used for answers only if the user has access to it. <br> If the user does not have access to the data or site, the Copilot agent also cannot access or reference that data.

<br>

| Display name | Reference data |
| ---- | ---- | 
| My Teams chats and meetings | References chat and meeting information in Teams |
| My SharePoint files, folders, and sites | References files in SharePoint and Teams channels |  
| My email | Email information in the Outlook mailbox | 

<br>

<img width="484" height="584" alt="image" src="{{ '/assets/image/github-attachments/529e30fb-9921-4715-bc59-fea300237eca.png' | relative_url }}" />

<br>

After adding them, scroll down and turn on the toggle to enable internet material search. <br>

```
Optional) If internal organizational user information is registered (name, title, skills, org relationships, etc.), <br> enabling "Reference org chart and profile information" as well can let the agent reference information about nearby coworkers and provide more personalized answers. 
```

<br>

<img width="462" height="385" alt="image" src="{{ '/assets/image/github-attachments/c52f2980-c35c-41d3-b32c-b35162d982af.png' | relative_url }}" />
<br>

### Enable capabilities

Agents in Agent Builder can use not only answers based on reference materials, but also capabilities such as image generation and Python Code execution.
In particular, Python code execution (code interpreter) can be used in many scenarios, including document generation, chart generation, and HTML document generation.

Enable the code interpreter toggle in the current agent as shown below.
<br>

<img width="472" height="225" alt="image" src="{{ '/assets/image/github-attachments/534c11d4-1d4a-4fc9-a04b-d81885663a41.png' | relative_url }}" />

Then enter the following request asking it to add a scenario to the Instructions to support an infographic creation skill.
<br>

```
Based on the current Instructions, after comprehensive insight analysis, add a capability that uses the code interpreter when the user requests it to create an HTML-format infographic dashboard based on the analysis and provide it as a downloadable file. 
```

<br>

<img width="496" height="473" alt="image" src="{{ '/assets/image/github-attachments/49811973-e4bf-4395-881e-9fb6a0099ec6.png' | relative_url }}" />
<br>


The final Instructions for the agent are as follows.
> Because automatically added parts may exist, they may not be perfectly identical.

When writing is complete, click the Create button to create the agent. <br>


<img width="940" height="544" alt="image" src="{{ '/assets/image/github-attachments/427958d7-0b8c-4de8-b1b9-02be34d21871.png' | relative_url }}" />
<img width="966" height="543" alt="image" src="{{ '/assets/image/github-attachments/aa750bfd-1347-44e3-820b-5120ccdc459f.png' | relative_url }}" />



**Final Instructions for reference**

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

Next, you will learn how to test and share the agent.


[**Go to 3. Test and share the agent**]({{ '/en/chapters/ws4-3-test-share/' | relative_url }})
