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

# 2. Connect knowledge sources (SharePoint)

> **English UI screenshots, September 10, 2026.** Actual captures from an English-language demo
> environment, continuing on the agent built in
> [Step 1]({{ '/en/chapters/ws3-1-create-agent/' | relative_url }}).

---

## What are Knowledge sources in Copilot Studio?

Knowledge sources are the **internal documents and data repositories** an agent references when
answering. Connecting them lets the agent answer from **organizational data** rather than only from
the model's general knowledge.

| Knowledge source type | Main use cases |
|---------------|---------------|
| SharePoint | Search internal documents, manuals, reports |
| File upload (PDF, Word, etc.) | Fixed reference for specific documents |
| Public websites | Reference external webpages |
| Dataverse / Azure SQL | Query structured data |
| Salesforce, ServiceNow, Dynamics 365 | Query external business systems |

In this workshop you connect documents stored in **SharePoint**.

---

## 1. Connect a SharePoint knowledge source

### 1-1. Start adding Knowledge

Open the **Knowledge** tab and select **Add knowledge**.

![The empty Knowledge tab with the Add knowledge button]({{ '/assets/image/en/caldova/ws3-knowledge-empty.png' | relative_url }})

### 1-2. Select SharePoint

The catalog opens with a file drop zone at the top and the connectable sources below. Choose
**SharePoint**.

![The Add knowledge catalog]({{ '/assets/image/en/caldova/ws3-knowledge-catalog.png' | relative_url }})

### 1-3. Paste the SharePoint URL

You are offered two routes: **Browse items**, or pasting a URL and selecting **Add**.

**Paste the URL.** To find it, open the SharePoint library, select **Details** on the right, and copy
the **Path** from the bottom of the side panel. URL-encode any spaces.

```
https://<your-tenant>.sharepoint.com/Shared%20Documents/<Your%20Folder>
```

![Pasting the SharePoint folder URL into the knowledge dialog]({{ '/assets/image/en/caldova/ws3-knowledge-url.png' | relative_url }})

<div class="info-box warning" markdown="1">
**Do not use Browse items for a folder.** Browsing to a folder and selecting **Confirm selection**
creates a source of type **Power Platform connector** that uploads files to Dataverse — in this
demo tenant it stayed stuck on **Error** and never became usable. Pasting the same folder URL and
selecting **Add** creates a source of type **SharePoint**, which reached **Ready** in about two
minutes. If you already created the broken one, delete it from the row's **⋯** menu and re-add it
by URL.

![The Browse items view that produces the unusable source type]({{ '/assets/image/en/caldova/ws3-knowledge-browse.png' | relative_url }})
![A folder selected through Browse items]({{ '/assets/image/en/caldova/ws3-knowledge-selected.png' | relative_url }})
</div>

### 1-4. Enter a name and description

The dialog fills in defaults. Replace them — the agent reads the description when deciding whether
the source is relevant, so say what the folder actually holds.

```
Name
Product Spec Sheets

Description
Technical specifications for refrigerators and dishwashers. Reference this source first when users ask about refrigerator or dishwasher specifications.
```

![The knowledge source name and description entered]({{ '/assets/image/en/caldova/ws3-knowledge-description.png' | relative_url }})

Select **Add to agent**.

### 1-5. Wait for Ready

The source is listed immediately but is not usable until **Status** reads **Ready**. Reload the
Knowledge tab until it does.

![The knowledge source showing Ready status]({{ '/assets/image/en/caldova/ws3-knowledge-ready.png' | relative_url }})

---

## 2. Check behavior

In the **Test** panel, ask a question that can only be answered from the documents.

```
Summarize the dishwasher lineup covered by the spec sheets, with citations.
```

The first time the agent searches, it asks to use your credentials for the connection. Select
**Allow**.

![The agent asking to connect with your credentials before searching]({{ '/assets/image/en/caldova/ws3-knowledge-connect.png' | relative_url }})

The answer arrives with the figures from the PDFs and a **references** list naming the files used.

![The grounded answer with references to the source PDF]({{ '/assets/image/en/caldova/ws3-knowledge-grounded.png' | relative_url }})

<div class="info-box tip" markdown="1">
**Check the references, not the status chip.** **Ready** only means indexing finished. An answer
with no references did not come from your knowledge source, however healthy the status looks.
</div>

If the agent answers by citing the SharePoint documents, step 2 is complete.

---
---

← [Previous: Step 1. Create an agent]({{ '/en/chapters/ws3-1-create-agent/' | relative_url }}) | [Next: Step 3. Work IQ MCP]({{ '/en/chapters/ws3-3-workiq-mcp/' | relative_url }}) →
