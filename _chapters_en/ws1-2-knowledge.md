---
layout: chapter
lang: en
date: 2026-04-08
title: "Add reference materials"
short_title: "Add reference materials"
description: "Fundamentals #1: Blog Post Agent - Add reference materials"
order: 2
category: workshop
parent: "ws1"
---

## Step 2: Add reference materials

# Add reference materials to the agent

In this workshop, you will configure Knowledge so the agent can answer based on web search information and PDF data sheets stored in SharePoint in advance.

## 📚 The role of Knowledge in Copilot Studio
In Copilot Studio, **Knowledge** is a core feature that helps agents generate accurate and reliable answers based on internal company documents or external information.

The table below briefly explains its role.

| Item | Description |
|:------:|------|
| **Definition** | External information sources, such as connected documents, webpages, and data, that the agent can reference when generating answers |
| **Main function** | Helps generate **accurate, grounded answers** to user questions |
| **Formats** | Supports documents in various formats, including PDF, HTML, Word, Excel, and web links |
| **Examples** | - Search manuals stored in SharePoint<br>- Summarize internal reports<br>- Provide insights based on statistical data |
| **Importance** | Without Knowledge, the agent answers only from general knowledge, making it **difficult to provide company-specific information** |
| **Configuration location** | Can be connected from the **Knowledge tab** in Copilot Studio |

<br> <br> 

In Copilot Studio custom engine agents, you can use not only data in Microsoft 365 but also information stored in various data sources as Knowledge for agent answers.

## 📥 Summary of Knowledge data source types available in Copilot Studio
| Category | Data source | Description |
|:----------:|:--------------:|------|
| **Document-based** | Uploaded files such as PDF, Word, and Excel | Uploaded to Dataverse, automatically indexed, and searchable |
| **Cloud storage** | SharePoint, OneDrive | Can directly reference document repositories in the organization |
| **Web-based** | Public website URLs | References webpage content through Bing Search |
| **Enterprise systems** | ServiceNow, Salesforce, Confluence, ZenDesk, etc. | References knowledge bases or ticket information from external systems through real-time connectors |
| **Table data** | Dataverse tables | Enables question answering based on structured table data |
| **API-based** | External HTTP APIs, YAML definitions | Enables real-time API calls through the OnKnowledgeRequested trigger |


<img width="1023" height="742" alt="image" src="https://github.com/user-attachments/assets/b01a1a1c-75cd-46ec-9daa-015792a8f561" />
<img width="1023" height="740" alt="image" src="https://github.com/user-attachments/assets/566c5a93-4c17-4a44-a229-35d3eb43ca51" />

---

## Workshop

First, scroll down in the agent overview to find the Knowledge tab. <br>
Turn on the **Web search** toggle here. <br> 
<img width="512" height="254" alt="image" src="https://github.com/user-attachments/assets/c2b81140-34b5-46ba-935e-3d0c991b775c" />
<br> 
When this feature is enabled, the agent can answer user questions based on Bing Search information. <br>

Next, click **+ Add Knowledge** so the agent can reference SharePoint data. <br>
<img width="512" height="254" alt="image" src="https://github.com/user-attachments/assets/5e796dd8-8272-4486-b465-028dbdcf5f4e" />
<br> <br> 

When you click the button, a pop-up appears asking where the Knowledge you want to add is stored. <br> 
Because this workshop uses SharePoint data, select SharePoint. <br>
<img width="538" height="392" alt="image" src="https://github.com/user-attachments/assets/87cc18ab-1ed9-444d-ba8e-dc86efe8ff84" />
<br> <br> 

Next, either enter the SharePoint site address directly or click **Browse items** and select a recently accessed site.
<img width="554" height="404" alt="image" src="https://github.com/user-attachments/assets/05fe197d-56ef-4af7-b481-2f186c10be93" />

  
As in the previous Copilot Studio lite workshop, this workshop will reference only the files inside a specific library folder on a SharePoint site, so enter the path to the SharePoint folder.

To find the exact site address, go to the SharePoint site. <br>
Then go to the library folder you want to add, click **Details** on the right, and open the details side panel on the right. <br>
Finally, copy the **Path** at the bottom to get the location of the library folder.

<img width="1380" height="1278" alt="image" src="https://github.com/user-attachments/assets/b4e30695-2f74-4c3d-a374-cdf90102e24d" />
<br> 
Select the site and library through Browse items, or paste the link you copied into the site input box and add it. It will appear as shown below. <br>
<img width="1092" height="792" alt="image" src="https://github.com/user-attachments/assets/02429176-066d-47c3-b1e9-f16f1fbe89f4" />
<br> 

Finally, add the following content to the description field to clarify what this Knowledge source is about.
```
This Knowledge source provides Spec Sheet information for refrigerators and dishwashers.
The data is in PDF format, and filenames are stored in the model name_product type_spec sheet format.
Example: LSSB2692ST_Core_Refrig-Spec_Sheet -> product name: LSSB2692ST, product type: Core_Refrig (refrigerator), document content: Spec_Sheet

```

Then click the **"Add agent"** button. The agent can now answer based on the PDF files in the SharePoint site and web information.

<img width="1720" height="1392" alt="image" src="https://github.com/user-attachments/assets/ac38d914-1667-4872-a022-2a63d237f5f4" />

<br>
<br>
---

**Congratulations!** <br>
You have configured the agent to answer questions about internal company data by adding Knowledge. <br>
Next, you will add tools so the agent can send emails and create Teams posts.


---
---

← [Previous: Step 1. Create an agent]({{ '/en/chapters/ws1-1-create-agent/' | relative_url }}) | [Next: Step 3. Tools: MCP connector]({{ '/en/chapters/ws1-3-tool-mcp/' | relative_url }}) →
