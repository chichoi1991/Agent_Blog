---
layout: chapter
lang: en
date: 2026-04-08
title: "Add a Tool (Flow)"
short_title: "Tools: Flow"
description: "Fundamentals #2: Document search & escalation - Add a Tool (Flow)"
order: 3
category: workshop
parent: "ws2"
---

## Step 3: Add a Tool (Flow)

Add a Flow to the agent
===
✅ What is a Flow?

A **Flow** is a Power Automate-based automation process: a workflow that runs a series of tasks based on a specific event, such as user input from Copilot.

**Main features:**
- Interact with external systems based on data received from Copilot
- Process business logic such as conditions, loops, and data transformations
- Connect to various services to implement work automation

**Flow vs. Connector comparison**

|Category|Flow|Connector|
|:---|:---|:---|
|Role|Runs automation logic based on events from Copilot|Handles data communication with external systems|
|**Core<br>function**| Condition handling, loops, data transformations, task orchestration | API calls, authentication handling, data schema definitions |
|**Usage<br>examples**| - Vacation request → register request in HR system<br>- Customer inquiry → create CRM ticket | - Get SharePoint document lists<br>- Send Outlook email |
|**Relationship**| Flow **uses Connectors** to interact with external systems | Connectors act as **data sources** in Flows |

<br>

**Summary of the key difference**
- Flow = automation logic
- Connector = means of connecting to external services
  
In other words, a Flow defines "what to do," while a Connector handles "where to get and send data."

---

Workshop
===
In this workshop, you will extend the email-sending connector scenario from earlier to create a work flow that sends an email and also notifies Teams about the sent content.

## 1. Create a Flow

To create a Flow, select **[+ Add tool]** -> **[+ New tool]** from **[Overview]**.
<img width="1081" height="779" alt="image" src="https://github.com/user-attachments/assets/d963a73a-b1e3-4471-8547-e99663380b18" />

Next, select **[Agent flow]** to move to the designer page for creating a new Flow.
<img width="1063" height="783" alt="image" src="https://github.com/user-attachments/assets/605cccab-5010-442e-9b80-7d7d8c786b70" />

When you move to the Flow designer, two actions are added by default.
- When an agent calls the flow: Acts as a trigger. You can specify the input variables to use here. 
- Respond to the Agent: If you need to call results back to the agent after the task is complete, you can create and pass output variables through this action

In this scenario, you only need inputs for the email address, cc, subject, and body values required for sending email and creating a post.<br>
Because there is no need to return a separate output result, add only input variables under "When an agent calls the flow."
<br>
<img width="675" height="395" alt="image" src="https://github.com/user-attachments/assets/722d2663-b985-4f0e-8117-347ffb671346" />
<br>
To add input variables, select "When an agent calls the flow" and click "[+ Add an input]."<br>
Add the input variables as shown below.

<img width="648" height="225" alt="image" src="https://github.com/user-attachments/assets/4585ee60-3a34-481b-b959-8416ce75efc2" />

<br>
<img width="666" height="275" alt="image" src="https://github.com/user-attachments/assets/6833cedd-c723-408f-8f36-66ae1c114cf0" />

|Variable name|Type|
|---|---|
|to|text|
|Subject|text|
|CC|text|
|Body|text|

---
## 2. Add an action connector (email)

After you finish entering variables, add and configure the two tasks to run in the Flow in order, based on the input variable values.
1. Send email
2. Post a message to a Teams channel

First, click the [+] button under "When an agent calls the flow" to view the tasks you can add.<br>
<img width="976" height="845" alt="image" src="https://github.com/user-attachments/assets/281c490c-f6a5-4f0e-9d45-d889db12748d" />

Select "Office 365 Outlook" from search or from the connector list at the bottom, <br>then select "Send an email (V2)" as before.
<img width="601" height="522" alt="image" src="https://github.com/user-attachments/assets/d0053a79-95b1-491d-a4c6-40ab7946b7c5" />

When the email connector is added, a UI similar to the previous session appears.<br>
Select advanced parameters and add CC.
<img width="758" height="703" alt="image" src="https://github.com/user-attachments/assets/7997a038-ca65-43b0-b5b2-6da15c198873" />
<br>

To enter variables, select the **gear icon** in the upper-right corner of the email connector and click **Use dynamic content**.
<img width="797" height="218" alt="image" src="https://github.com/user-attachments/assets/c68a61b3-b360-47d3-a5b4-438e9391e183" />

Then enter / in each parameter value and insert the variable names declared under "When an agent calls the flow."
<img width="427" height="359" alt="image" src="https://github.com/user-attachments/assets/fa2921eb-1cd4-455d-9abd-f100ce4fb41b" />

<img width="883" height="783" alt="image" src="https://github.com/user-attachments/assets/2cde6243-e7a3-40ad-88fb-2b2b37548717" />

<img width="821" height="783" alt="image" src="https://github.com/user-attachments/assets/a74ee7b7-c4a6-48ca-9c1b-b301b1cb22f1" />

After you declare all variables, the email-sending Flow task is complete.<br>
When the Flow is called, the values of each variable passed by the agent are mapped to the email connector parameters, and the email is sent.
<br>

---
## 3. Add an action connector (post a message to a Teams channel)

Next, add a new connector so a message can automatically be posted to a Teams channel after the email is sent.<br>
As in the previous task, click the [+] button under the email action and add the 
**[Microsoft Teams] - [Post message in a chat or channel]** action.

<img width="762" height="683" alt="image" src="https://github.com/user-attachments/assets/3c7439ac-5fdf-402f-9780-1e1a9d12323e" />

Specify the channel where the notification message will be uploaded with the following settings.

|Parameter|Value|Description|
|---|---|---|
|Post as|Flow bot|Specify whether to post under the user's name or on behalf of Flow bot.<br> The name displayed in the channel changes.|
|Post in|Channel|Specify whether to receive the message through a chat or channel.|
|Team|Team where the post will be uploaded|Specify the team that contains the channel where the post will appear. <br>When selected, teams you can access are displayed automatically.|
|Channel|Upload channel|Select the channel where the post will actually be uploaded|
|Message|Text + body variable value| Enter the post content. Here, enter it based on the Body used in the email|

<br>

For the message, add a dynamic variable so you can use the text used when sending the email together with a fixed message.
> Similarly, enter / inside the message text to add dynamic variables.
```
A new inquiry has arrived. Please check it!<br> @{triggerBody()?['text_3']}
```

<img width="695" height="583" alt="image" src="https://github.com/user-attachments/assets/1ee9844e-50e0-4752-b185-da3a89fd1d08" />
<br>

When the task is complete, click the **Publish** button at the top to publish the Flow. Then select [Back to agent], and you can automatically see the added Flow on the agent Overview page. 
<img width="813" height="393" alt="image" src="https://github.com/user-attachments/assets/a3910866-899d-42ec-82fc-b8147b630d2e" />
<br>
<img width="981" height="408" alt="image" src="https://github.com/user-attachments/assets/b6fabf2c-cf60-469b-934f-b9c84f150b96" />

---
## 4. Apply the Flow
Next, add Instructions and parameter descriptions so the Flow can actually run.<br>

When you go to **[Tools]**, you can see that the Flow you created earlier has been added with the name **Untitled**.

However, because the current configuration duplicates the email-sending task you did earlier, first turn off the **Send an email (V2)** task toggle in **Tools**.
<img width="1258" height="379" alt="image" src="https://github.com/user-attachments/assets/69e1c73e-aaae-4a62-bb5b-9b7c22a941d4" />

Then go to the **Untitled** Flow and apply the same work you did for **Send an email (V2)**.
|Parameter|Value|
|---|---|
|Name|Send email and notification flow|
|Description|Use this when there is a task that requires sending email on behalf of the user. <br> Use it when an escalation email needs to be sent to the business owner.|
|To|Dynamically fill with AI - This is the recipient. Refer to the owner list and enter the email address of the user responsible for the relevant business area. Email addresses follow the someone@contoso.com format. If there are multiple people, separate them with ;.|
|Subjuect|Dynamically fill with AI - This is the email subject. Write it in the format [Business inquiry] summary of inquiry.|
|Body|Dynamically fill with AI - This is the email body. Enter a summary of the actual inquiry to the owner. <br> The inquiry date and time, requester, inquiry details, and other information must be entered in HTML format.|
|CC|Custom value - User.Email|
|After running|Send a specific response - As requested, I sent this content to the owner by email. <br> The owner will contact you separately as soon as possible.|
<br>
<img width="1181" height="1145" alt="image" src="https://github.com/user-attachments/assets/7d09943b-5053-4853-9cae-a95ed665b2db" />

<br>

After configuration is complete, select **Save**, then go to **Overview** and modify the Instructions.

Because the existing Instructions were configured to use the **Send an email (V2)** tool when escalation occurs,
remove the declaration for that tool from the Instructions, declare **Send email and notification flow**, and save.

<img width="1010" height="639" alt="image" src="https://github.com/user-attachments/assets/e56bbe69-d6e2-4bd5-b90c-280c0e7b226a" />

---

Test whether the Flow actually runs.

<img width="1278" height="1169" alt="image" src="https://github.com/user-attachments/assets/fbcf1326-89f0-4f7b-b3d9-bf84977d0f43" />
<br>
<br>

<img width="1803" height="526" alt="image" src="https://github.com/user-attachments/assets/a7341ff1-eb08-4bb1-a339-3fbd029d338d" />
<br>
<br>

<img width="633" height="705" alt="image" src="https://github.com/user-attachments/assets/c4d2c9bd-d5a3-4d38-92b2-7778793fdc4a" />
<br>
<br>


---
---

← [Previous: Step 2. Tools: connector]({{ '/en/chapters/ws2-2-tool-connector/' | relative_url }}) | [Next: Step 4. Add a Trigger]({{ '/en/chapters/ws2-4-trigger/' | relative_url }}) →
