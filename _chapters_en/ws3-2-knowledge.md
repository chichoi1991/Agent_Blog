---
layout: chapter
lang: en
date: 2026-04-08
title: "Connect knowledge sources"
short_title: "Connect knowledge sources"
description: "Fundamentals #3: Autonomous agent - Connect knowledge sources"
order: 2
category: workshop
parent: "ws3"
---

## Step 2: Connect knowledge sources

# 2. Connect knowledge sources (SharePoint · email)

> **Previous step:** [1. Create an agent and write Instructions](./1.%20에이전트%20생성%20및%20지침%20작성.md) | **Next step:** [3. Add Work IQ MCP tools](./3.%20Work%20IQ%20MCP%20도구%20추가.md)

---

## What are Knowledge sources in Copilot Studio?

Knowledge sources are the **internal documents and data repositories** that an agent references when answering user questions.  
By connecting knowledge sources, the agent can answer based on **organizational internal data** in addition to general language model knowledge.

| Knowledge source type | Main use cases |
|---------------|---------------|
| SharePoint | Search internal documents, manuals, reports |
| File upload (PDF, Word, etc.) | Fixed reference for specific documents |
| Public web URL | Reference external webpages |
| Dataverse table | Query structured data |

In this workshop, you will connect documents registered in **SharePoint**.

<br>

---

## 1. Connect a SharePoint document Knowledge source

### 1-1. Start adding Knowledge

Scroll down on the agent Overview screen and find the **Knowledge** section.  
Click the **+ Add Knowledge** button.
![Add Knowledge]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20220355.png)
<br>

### 1-2. Select SharePoint

In the pop-up window, select **SharePoint**.
![Add Knowledge]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20220426.png)
<br>

### 1-3. Enter the SharePoint path

Enter the SharePoint site address or the path to a specific library folder.

To check the exact path:
1. Go to the SharePoint site → the relevant library folder
2. Click **Details** in the upper-right corner
3. Copy the **Path** at the bottom of the side panel

Paste the path and click **Add**.

Alternatively, you can navigate by clicking the **Browse items** button as shown below.
Here, browse and select Communication site → CopilotStudio_실습자료 → Spec Sheet in that order.
![Enter SharePoint path #1]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20220442.png)
![Enter SharePoint path #2]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20220507.png)
<br>

### 1-4. Enter a Knowledge source description

Enter the following content in the **Description** field for the added Knowledge source.  
The more specific the description is, the better the agent can use the Knowledge source in the appropriate situation.

```
This Knowledge source provides technical specifications and information about refrigerators and dishwashers. 
When users ask about technical specifications and information for refrigerators and dishwashers, reference this source first.
```
![Enter SharePoint path #3]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20220600.png)

<br>

---

## 2. Check behavior

In the test panel on the right, enter the question below and check whether the agent answers correctly by referencing the Knowledge source.

**SharePoint Knowledge source test:**

```
Summarize the dishwasher lineup that supports ThinQ
```

If the agent answers by citing SharePoint documents, step 2 is complete.
![SharePoint Knowledge source test]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20221651.png)

<br>

---

> **Next step:** [3. Add Work IQ MCP tools](./3.%20Work%20IQ%20MCP%20도구%20추가.md)


---
---

← [Previous: Step 1. Create an agent]({{ '/en/chapters/ws3-1-create-agent/' | relative_url }}) | [Next: Step 3. Work IQ MCP]({{ '/en/chapters/ws3-3-workiq-mcp/' | relative_url }}) →
