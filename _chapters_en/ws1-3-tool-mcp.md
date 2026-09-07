---
layout: chapter
lang: en
date: 2026-04-08
title: "Add a tool (MCP connector)"
short_title: "Tools: MCP connector"
description: "Fundamentals #1: Blog Post Agent - Add a tool (MCP connector)"
order: 3
category: workshop
parent: "ws1"
---

## Step 3: Add a tool (MCP connector)

# Add a tool to the agent #1 (MCP connector)

## ✅ The role of Tools in Copilot Studio

**Tools** are **additional capabilities** that extend what Copilot can do by default.  
Simply put, they are a key element for upgrading **Copilot from a conversational AI into an AI that can execute work**.

---

## **1. Core role of Tools**
|Role|Description|
|------|---|
|Connect to external services|CRM, ERP, databases, API calls|
|Automate work|Send email, create schedules, write reports|
|Process data|Analyze Excel, summarize PDFs, transform data|
|Integrate systems|Integrate with Microsoft 365, Teams, Power Automate|

---

## **2. Why are Tools needed?**


- Copilot is basically a **conversational AI** → it cannot look up data or execute system commands by itself  
- **By connecting Tools, Copilot can execute actual tasks**  

---

## **3. Understand through an example**

- **Without a tool**  
  > "Tell me this week's sales."  
  → Copilot: "I can't access the data directly."

- **With a tool connected**  
  > "Tell me this week's sales."  
  → Copilot: (calls the ERP API) → "This week's sales are **₩120,000,000**."

---

## **4. Summary**


✔ Tools are key to **extending Copilot capabilities**  
✔ They enable **work automation + data connections + system integration**  
✔ They make it possible to **execute real business processes**  

---
<br> <br> <br> 

## Workshop

In this workshop, you will add a tool that lets the agent send generated blog/newsletter drafts by email on behalf of the user.

### 1. Add an email-sending tool
In the agent settings window, select [Tools] - [+ Add a tool].
<img width="970" height="589" alt="image" src="https://github.com/user-attachments/assets/4ff4e0b4-8fd1-4bb0-9c79-9097c94156ff" />

Under Model Context Protocol, select "Email Management MCP Server." 
<img width="543" height="396" alt="image" src="https://github.com/user-attachments/assets/9d324745-f91b-4588-9729-df8fa9cb315e" />

When you select the tool, an OAuth connection window appears so you can use the Office 365 Outlook connector. <br>
Use [Create new connection], enter the sign-in information for the connected account, and click Create. <br>
<img width="548" height="406" alt="image" src="https://github.com/user-attachments/assets/d4260866-c5ea-48fb-aaad-3a9d9f2552ec" />
<br> 
<img width="1022" height="738" alt="image" src="https://github.com/user-attachments/assets/599eb77c-27b3-4ca8-834e-47078913cd4d" />
<br> <br> 
When the connection is complete, the connected account information and a green icon appear as shown below. <br> 
Select [Add and configure] to go to the detailed settings for the email-sending connector. <br> 
<img width="1044" height="768" alt="image" src="https://github.com/user-attachments/assets/a669d0f8-228c-429f-88d2-93c7351db777" />
<br> 
<br> 
<br> 
## 2. Configure the email-sending connector basics
Next, specify the settings required for the agent to send email.<br> 

By default, the first thing to do after adding a tool is to enter when and how this tool should be used in the **Description** field. <br> 

This description is referenced when the agent needs to choose a tool, so it should explain the situation in as much detail as possible to help the agent follow instructions accurately.<br> 

However, for the MCP server added here, the server description and each tool description have already been written and updated at the MCP server level, so you do not need to add a separate description.<br> 
<br> 
<br> 
Next, open the additional details pane and change the authentication policy to **[Maker-provided credentials]**.
<img width="1056" height="694" alt="image" src="https://github.com/user-attachments/assets/e9ab862e-b6bf-473b-969f-bf1e92c9c5c6" />

By default, "End-user credentials" is selected. In this case, users of the agent complete a one-time sign-in flow when they use the action.

Keep this setting when the user's permissions should be used to search their mailbox or retrieve data.
When only a limited account can access a specific system (for example, SAP or DB access), 
change it to maker-provided credentials so users can access the data without signing in.

---
## 3. Configure the tools used by the Email Management MCP Server

Enable only the tools provided by the MCP server that you will actually use. <br>
This step is optional, but if there are tools that are not defined in the Instructions, they can reduce the agent's accuracy when selecting tools. Enable only the tools you need whenever possible.

If you turn off the option to enable all functions in the tool, you can selectively allow individual tools. <br>
In this scenario, only email sending is needed, so disable every function except the SendEmail tool. <br>
<img width="1055" height="980" alt="image" src="https://github.com/user-attachments/assets/fc646c29-01d3-45bb-a25f-9c8670385adf" />

After that, click the **Save** button at the top. The email-sending tool is now ready.
Next, write Instructions that tell the agent how to send emails.


## 4. Modify the agent Instructions
The email-sending tool setup is complete, 
but if a user enters "send this by email," the agent may select and run the tool, while detailed instructions such as who the recipient is, what the subject should be, and what to include in the body are not defined.

Therefore, return to the **Overview** and enter Instructions for the added tool.

<img width="1094" height="828" alt="image" src="https://github.com/user-attachments/assets/0e13eae5-14b5-4374-9788-b815e090596e" />


Add the following under the 1) Supported capabilities section in the Instructions.
```
### 1.6 Send email
- Send the completed blog draft as an email newsletter
- For Subject, ask the user for the email newsletter title
- For To, ask the user to enter the email address
- Important! For Body, apply HTML and CSS styles to add layout and design

```
Add the following to 3) Example workflow (including the original scenario) in the Instructions.
```
User: "Send this content by email"
Agent: "Yes, I will apply HTML and CSS styles to this content and send it by email."
```
Add the following at the bottom of the Instructions.
```
## 8) Email sending format guide
 - to: Enter the recipient mail address
 - subject: Email subject. Draft an email subject by summarizing the body content and present it to the user, then ask the user to finalize the email subject. 
 - body: The email body. Write the body with HTML and CSS styles applied to add design elements

---
```
After you finish editing the Instructions and save them, test whether the email is sent correctly.
Test prompt
```
Create a newsletter about dishwasher product lines and send it by email to **[email address]**
```
Copilot Studio test screen
<img width="1704" height="1259" alt="image" src="https://github.com/user-attachments/assets/1b8124ba-fd06-4167-877a-22ab78461c49" />

> Following the Instructions, the agent creates and suggests a document format and draft, then sends the email

Email inbox screen
<img width="1544" height="1528" alt="image" src="https://github.com/user-attachments/assets/a9879c4f-8caf-47b0-935d-47e89498d4a3" />


---
The agent can now use additional actions through Tools. <br>
Next, add a tool that posts the same content to a Teams channel.


---
---

← [Previous: Step 2. Add reference materials]({{ '/en/chapters/ws1-2-knowledge/' | relative_url }}) | [Next: Step 4. Tools: plugin connector]({{ '/en/chapters/ws1-4-tool-plugin/' | relative_url }}) →
