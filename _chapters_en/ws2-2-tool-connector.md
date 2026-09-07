---
layout: chapter
lang: en
date: 2026-04-08
title: "Add a Tool (connector)"
short_title: "Tools: connector"
description: "Fundamentals #2: Document search & escalation - Add a Tool (connector)"
order: 2
category: workshop
parent: "ws2"
---

## Step 2: Add a Tool (connector)

# Add a Tool to the agent
===
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
## Workshop
===
In this workshop, you will add an email-sending tool so the agent can send an email to the owner when users need to make additional inquiries about retrieved information.

## 1. Add an email-sending tool
In the agent settings window, select [Tools] - [+ Add a tool].
<img width="1166" height="598" alt="image" src="https://github.com/user-attachments/assets/671c05ef-8a90-4001-8ed0-a70f57bf84a8" />

Search for and select "Office 365 Outlook" from recommended connectors or tool search.
<img width="1063" height="779" alt="image" src="https://github.com/user-attachments/assets/eb82dc7b-5d2b-454d-bcfb-8d27948be6f7" />

Then select the "Send an email (V2)" action.
<img width="1063" height="779" alt="image" src="https://github.com/user-attachments/assets/1f89de44-65f9-4b70-b4c2-8963a507d00f" />

When you select the tool, an OAuth connection window appears so you can use the Office 365 Outlook connector.
Use [Create new connection], enter the sign-in information for the connected account, and click Create.
<img width="1009" height="738" alt="image" src="https://github.com/user-attachments/assets/d9b5c7f9-04cc-43da-b6a0-f32af54d6b6f" />

<img width="1022" height="738" alt="image" src="https://github.com/user-attachments/assets/599eb77c-27b3-4ca8-834e-47078913cd4d" />

When the connection is complete, the connected account information and a green icon appear as shown below.
Select [Add and configure] to go to the detailed settings for the email-sending connector.
<img width="1004" height="732" alt="image" src="https://github.com/user-attachments/assets/e27dc93e-d282-48dc-bcc9-a52b9bb0ddbe" />

## 2. Configure the email-sending connector basics
Next, specify the settings required for the agent to send email.

The first thing to do is to enter when and how this tool should be used in the **Description** field. 

This description is referenced when the agent needs to choose a tool, so it should explain the situation in as much detail as possible to help the agent follow instructions accurately.

<img width="1181" height="460" alt="image" src="https://github.com/user-attachments/assets/af5fd88b-afb1-4832-a465-4d2040e5114e" />


```
Use this tool when there is a task that requires sending email on behalf of the user.
Use it when an escalation email needs to be sent to the business owner.
```

Next, open the additional details pane and change the authentication policy to **[Maker-provided credentials]**.

By default, "End-user credentials" is selected. In this case, users of the agent complete a one-time sign-in flow when they use the action.

Keep this setting when the user's permissions should be used to search their mailbox or retrieve data.
When only a limited account can access a specific system (for example, SAP or DB access), 
change it to maker-provided credentials so users can access the data without signing in.

<img width="801" height="336" alt="image" src="https://github.com/user-attachments/assets/3d359fd6-7af5-49c0-b1e7-99347b5e36f6" />

---
## 3. Configure input parameters
For sending email, specify the required input parameters and write descriptions for each parameter.

|Input<br>name|Fill using|Value|
|:---:|:---:|:---:|
|To|Dynamically fill with AI|This is the recipient. Refer to the owner list and enter the email address of the user responsible for the relevant business area. <br>Email addresses follow the someone@contoso.com format. If there are multiple people, separate them with ;. |
|Subject|Dynamically fill with AI|This is the email subject. Write it in the format [Business inquiry] summary of inquiry. |
|Body|Dynamically fill with AI|This is the email body. Enter a summary of the actual inquiry to the owner.<br> The inquiry date and time, requester, inquiry details, and other information must be entered in HTML format.|
|CC|Custom value|User.Email|

You can add parameters by selecting **[Add input]** on the right.
<img width="839" height="480" alt="image" src="https://github.com/user-attachments/assets/21c78018-79a4-42ab-aaa0-fc97f0a32c35" />

Then, for parameters set to Dynamically fill with AI, select **Custom** to enter that parameter's description.

<img width="792" height="642" alt="image" src="https://github.com/user-attachments/assets/d42a0d11-da72-430b-b683-02af538aace7" />

For parameters set to **Custom value**, you can enter them manually or click ... to enter system/environment variables or formulas.
In this workshop, select **User.Email** from system variables so the requester's email address can be entered as a reference.

Finally, in **[Completion]**, configure the message shown when the tool finishes running so users can more easily recognize that the email was sent during their conversation with the agent.

For the post-run action, select **Send a specific response (specified below)**,
then specify the following message.

<img width="846" height="397" alt="image" src="https://github.com/user-attachments/assets/fa991646-b33f-4dc1-b676-c1a85fa3fa1d" />

```
As requested, I sent this content to the owner by email.
The owner will contact you separately as soon as possible.
```
<br>

After finishing all tasks, click **[Save]** at the top to complete the email-sending connector setup.


## 4. Modify the agent Instructions
The email-sending tool setup is complete, 
but if a user enters "send an email," the tool may be selected and run, while detailed instructions such as who the owner is, what the subject should be, and what to include in the body are not defined.

Therefore, return to the **Overview** and enter Instructions for the added tool.
When editing Instructions, enter ** / ** to explicitly mention Tools, agents, or Topics.

<img width="972" height="707" alt="image" src="https://github.com/user-attachments/assets/3f41fb6f-62c0-482c-9d3e-109ddc49fd03" />


```

##Send email##
If the user wants escalation because they could not get an accurate answer, or if direct communication with an owner is needed, use the Send an email (V2) feature.

The contact information for each business owner is as follows.
- Marketing, press releases, website management > admin@M365CPI45255191.onmicrosoft.com
- Technical inquiries > chiwonchoi@microsoft.com

The email body and subject follow the rules below.
Subject: [Marketing inquiry|Press release inquiry|Website management inquiry|Technical inquiry] Summary of inquiry
Example) [Press release inquiry] Inquiry about correcting a typo in the August 10 press release

Body
---
Inquiry date: Enter in the format August 10, 2025, 15:10, based on UTC+9
Requester: Enter in the format "variable System.User.DisplayName" (variable System.User.PrincipalName).
## The above variables were entered through / as the system variables User.DisplayName and User.PrincipalName
Inquiry details: Enter a detailed summary of the user's inquiry.
---
```

After you finish editing the Instructions and save them, test whether the email is sent correctly.

<img width="1195" height="1156" alt="image" src="https://github.com/user-attachments/assets/0459dfa8-5ae9-4bb6-b952-d89e6945e352" />

<img width="580" height="614" alt="image" src="https://github.com/user-attachments/assets/59b02d08-861b-4c4a-994f-5820f7e3675e" />

---
The agent can now use additional actions through Tools. <br>
Next, combine multiple tasks like these into one Flow and work with it.


---
---

← [Previous: Step 1. Create an agent]({{ '/en/chapters/ws2-1-create-agent/' | relative_url }}) | [Next: Step 3. Tools: Flow]({{ '/en/chapters/ws2-3-tool-flow/' | relative_url }}) →
