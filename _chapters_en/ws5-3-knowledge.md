---
layout: chapter
lang: en
date: 2026-04-23
title: "Add Knowledge"
short_title: "Add Knowledge"
description: "[Renewal] Explore the basic features of Copilot Studio - Connect Knowledge such as SharePoint and web sources"
order: 3
category: workshop
parent: "ws5"
---

## Step 3: Add Knowledge

# Add Knowledge to the agent

In this lab, configure Knowledge so the agent can answer based on web search information and PDF data sheets stored in SharePoint in advance.

## 📚 The role of Knowledge in Copilot Studio
In Copilot Studio, **Knowledge** is a core feature that helps agents generate accurate and reliable answers based on internal company documents or external information.

The table below briefly explains its role.

| Item | Description |
|:------:|------|
| **Definition** | External information sources such as connected documents, webpages, and data that the agent can reference when generating answers |
| **Key capability** | Helps generate **accurate and grounded answers** to user questions |
| **Formats** | Supports documents in various formats such as PDF, HTML, Word, Excel, and web links |
| **Examples** | - Search manuals stored in SharePoint<br>- Summarize internal reports<br>- Provide insights based on statistical data |
| **Importance** | Without Knowledge, the agent answers only from general knowledge, making it **difficult to provide company-specific information** |
| **Configuration location** | Can be connected from the **Knowledge** tab in Copilot Studio |

<br><br>

In a custom engine agent in Copilot Studio, you can use not only data in Microsoft 365,
but also information stored in various data sources as Knowledge for answers.

## 📥 Summary of Knowledge data source types available in Copilot Studio
| Category | Data source | Description |
|:----------:|:--------------:|------|
| **Document-based** | Uploaded files such as PDF, Word, and Excel | Uploaded to Dataverse, automatically indexed, and searchable |
| **Cloud storage** | SharePoint, OneDrive | Can directly reference document stores within the organization |
| **Web-based** | Public website URLs | References webpage content through Bing search |
| **Enterprise systems** | ServiceNow, Salesforce, Confluence, ZenDesk, etc. | References knowledge bases or ticket information from external systems through real-time connectors |
| **Table data** | Dataverse tables | Supports question answering based on structured table data |
| **API-based** | External HTTP APIs, YAML definitions | Supports real-time API calls through the OnKnowledgeRequested trigger |


<img width="1023" height="742" alt="image" src="https://github.com/user-attachments/assets/b01a1a1c-75cd-46ec-9daa-015792a8f561" />
<img width="1023" height="740" alt="image" src="https://github.com/user-attachments/assets/566c5a93-4c17-4a44-a229-35d3eb43ca51" />

---

## Lab

First, scroll down in the agent overview to find the Knowledge tab. <br>

Click **+ Add Knowledge** so the agent can reference data in SharePoint. <br>
<img width="512" height="254" alt="image" src="https://github.com/user-attachments/assets/5e796dd8-8272-4486-b465-028dbdcf5f4e" />
<br><br>

> The **Web search** feature below Knowledge is an optional setting that lets the agent answer user questions based on Bing search information. <br>


When you click the button, a pop-up appears asking where the Knowledge you want to add is stored. <br>

Because this lab references data in SharePoint, select SharePoint. <br>

<img width="554" height="404" alt="image" src="https://github.com/user-attachments/assets/05fe197d-56ef-4af7-b481-2f186c10be93" />


<br>

Then either enter the SharePoint site address directly, or click **Browse items** to select a site you accessed recently.

<img width="538" height="392" alt="image" src="https://github.com/user-attachments/assets/87cc18ab-1ed9-444d-ba8e-dc86efe8ff84" />

In this lab, we will reference only files inside a specific library folder in a SharePoint site or Teams channel, so enter the SharePoint folder path.

To find the exact site address, go to the SharePoint site. <br>
Then navigate to the folder library you want to add and click **Details** on the right to open the details side panel. <br>
Finally, copy the **Path** at the bottom to get the library folder location.

<img width="1380" height="1278" alt="image" src="https://github.com/user-attachments/assets/b4e30695-2f74-4c3d-a374-cdf90102e24d" />
<br>
Select the site and library through Browse items, or paste the link you copied into the site input box and add it. It will appear as shown below. <br>
> For the lab, select the SharePoint site or Teams channel where the provided SpecSheet folder is stored.

<img width="1092" height="792" alt="image" src="https://github.com/user-attachments/assets/02429176-066d-47c3-b1e9-f16f1fbe89f4" />
<br>

Finally, add the following content to the description field to provide more detail about what this Knowledge source contains.
```
This Knowledge source provides Spec Sheet information for refrigerators and dishwashers.
The data is in PDF format, and filenames are saved in the format model-name_product-type_spec sheet.
Example: LSSB2692ST_Core_Refrig-Spec_Sheet -> Product name: LSSB2692ST, product type: Core_Refrig (refrigerator), document content: Spec_Sheet

```

Then click the **"Add to agent"** button. The agent can now answer based on PDF files in the SharePoint site.

<img width="1720" height="1392" alt="image" src="https://github.com/user-attachments/assets/ac38d914-1667-4872-a022-2a63d237f5f4" />

<br>
<br>

> Important! SharePoint Knowledge searches document content based on Microsoft Search. Therefore, it is effective for text-centric content retrieval, but when Excel data analysis is required, the structural limitations of LLMs and RAG prevent it from providing accurate answers.

Therefore, if you need to generate answers by referencing Excel data, see the Excel data reference session at the end of the workshop.

---

**Congratulations!** <br>
By adding Knowledge, you have finished configuring the agent to answer questions about internal company data. <br>
Next, practice adding tools so the agent can send email and create Teams posts.

---

← [Previous: Step 2. Configure basic Instructions]({{ '/en/chapters/ws5-2-instructions/' | relative_url }}) | [Next: Step 4. Add MCP tools]({{ '/en/chapters/ws5-4-tool-mcp/' | relative_url }}) →
