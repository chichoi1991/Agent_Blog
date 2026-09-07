---
layout: chapter
lang: en
date: 2026-04-23
title: "Add MCP tools"
short_title: "Add MCP tools"
description: "[Renewal] Explore the basic features of Copilot Studio - Add a built-in MCP (email management) tool"
order: 4
category: workshop
parent: "ws5"
---

## Step 4: Add MCP tools

# Add tools to the agent #1 (MCP tools)

## ✅ The role of Tools in Copilot Studio

**Tools** are **additional capabilities** that extend what Copilot can do by default.  
Simply put, they are a core element that **upgrades Copilot from a conversational AI into an AI that can execute work**.

---

## **1. Core roles of Tools**

|Role|Description|
|------|---|
|Connect external services|Call CRM, ERP, databases, and APIs|
|Automate work|Send emails, create schedules, write reports|
|Process data|Analyze Excel files, summarize PDFs, transform data|
|Integrate systems|Integrate with Microsoft 365, Teams, and Power Automate|

---

## **2. Why are they needed?**


- By default, Copilot is a **conversational AI** → it cannot query data or execute system commands  
- **When you connect tools, Copilot can execute real tasks**  

---

## **3. Understand through examples**

- **Without tools**  
  > “Tell me this week's sales”  
  → Copilot: “I can't access the data directly.”

- **With tools connected**  
  > “Tell me this week's sales”  
  → Copilot: (calls ERP API) → “This week's sales are **₩120,000,000**.”

---

## **4. Summary**


✔ Tools are central to **extending Copilot's capabilities**  
✔ They enable **work automation + data connections + system integration**  
✔ They make it possible to **execute real business processes**  

---
<br><br><br>

## Lab

In this lab, add an MCP tool that lets the agent send spec sheet content by email on behalf of the user.

### 1. Add an email-sending tool
In the agent settings window, select **Tools** - **+ Add a tool**.
<img width="970" height="589" alt="image" src="https://github.com/user-attachments/assets/4ff4e0b4-8fd1-4bb0-9c79-9097c94156ff" />

Under Model Context Protocol, select **Email Management MCP Server**.
<img width="543" height="396" alt="image" src="https://github.com/user-attachments/assets/9d324745-f91b-4588-9729-df8fa9cb315e" />

When you select the tool, an OAuth connection window appears for using the Office 365 Outlook connector. <br>
Use **Create a new connection**, enter the sign-in information for the connected account, and click Create. <br>
<img width="548" height="406" alt="image" src="https://github.com/user-attachments/assets/d4260866-c5ea-48fb-aaad-3a9d9f2552ec" />
<br>
<img width="1022" height="738" alt="image" src="https://github.com/user-attachments/assets/599eb77c-27b3-4ca8-834e-47078913cd4d" />
<br><br>
When the connection is complete, the connected account information and a green icon appear as shown below. <br>
Select **Add and configure** to move to the detailed settings for the email-sending connector. <br>
<img width="1044" height="768" alt="image" src="https://github.com/user-attachments/assets/a669d0f8-228c-429f-88d2-93c7351db777" />
<br>
<br>
<br>
## 2. Configure basic settings for the email-sending connector
Next, specify the settings required for the agent to send email.<br>

By default, the first thing to do after adding a tool is to enter when and how this tool should be used in the **Description** field. <br>

The agent references this description when deciding which tool to select, so the situation must be described in as much detail as possible for it to follow instructions accurately.<br>

However, for the MCP server added here, the server description and the descriptions for each tool have already been written and updated on the MCP server side, so you do not need to add a separate description.<br>
<br>
<br>
Next, open the additional details pane and change the authentication policy to **Maker-provided credentials**.
<img width="1056" height="694" alt="image" src="https://github.com/user-attachments/assets/e9ab862e-b6bf-473b-969f-bf1e92c9c5c6" />

By default, **End-user credentials** is selected. In this case, the user of the agent goes through a one-time sign-in process when using the action.

Keep this setting if the agent needs to search mailboxes or retrieve data with the user's permissions.
If access is limited to a specific account for a particular system (for example, SAP or database access),
change it to Maker-provided credentials so users can access the data without signing in.

---
## 3. Configure tools used by the Email Management MCP Server

Enable only the tools provided by the MCP server that you will actually use. <br>
This step is optional, but if tools not defined in the instructions are available, they can reduce the agent's accuracy when selecting tools. Therefore, enable only the tools you need whenever possible.

If you turn off the option to enable all functions for the tool, you can selectively allow individual tools. <br>
In this scenario, only email sending is required, so disable all functions except the SendEmail tool. <br>
<img width="1055" height="980" alt="image" src="https://github.com/user-attachments/assets/fc646c29-01d3-45bb-a25f-9c8670385adf" />

Then click the **Save** button at the top. The email-sending tool is now ready.
Next, write instructions for how the agent should send email when it uses the tool.


## 4. Edit the agent Instructions
The email-sending tool configuration is complete.
If the user enters “send an email,” the tool will likely be selected and run,
but detailed instructions are not yet specified, such as who the recipient is, what the subject should be, and what to enter in the body.

Therefore, return to the **Overview** and enter instructions for the added tool.

![4-1]({{ site.baseurl }}/assets/image/ws5/4-1.png)


```

## Email sending format guide
 - to: Enter the recipient's email address.
 - subject: Email subject. Draft an email subject that summarizes the body content and present it to the user, but ask the user to confirm or provide the final subject.
 - body: Email body. Write the body with design elements by applying HTML and CSS styles.

```
After finishing the Instructions edit and saving, test whether the email is sent successfully.
Test prompt
```
Create a newsletter about the dishwasher product line and email it to me.
```
Copilot Studio test screen
<img width="1704" height="1259" alt="image" src="https://github.com/user-attachments/assets/1b8124ba-fd06-4167-877a-22ab78461c49" />

> The agent creates and proposes a document format and draft according to the instructions, then sends the email.

Email received screen
<img width="1544" height="1528" alt="image" src="https://github.com/user-attachments/assets/a9879c4f-8caf-47b0-935d-47e89498d4a3" />


---
With this, the agent can use additional actions through tools. <br>
Next, add email and Teams post tools using standard connectors.

---

← [Previous: Step 3. Add Knowledge]({{ '/en/chapters/ws5-3-knowledge/' | relative_url }}) | [Next: Step 5. Add connector (send email)]({{ '/en/chapters/ws5-5-tool-connector/' | relative_url }}) →
