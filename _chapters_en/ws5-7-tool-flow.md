---
layout: chapter
lang: en
date: 2026-04-22
title: "Connector-centric flow"
short_title: "Connector flow"
description: "[Renewal] Explore the basic features of Copilot Studio - Chain email and Teams posting automation with a Power Automate flow"
order: 7
category: workshop
parent: "ws5"
---

## Step 7: Connector-centric flow

Add a flow to the agent
===
✅ What is a Flow?

A **Flow** is a Power Automate-based automation process: a workflow that runs a series of tasks in response to a specific event, such as user input from Copilot.

**Key capabilities:**
- Interact with external systems based on data received from Copilot
- Process business logic such as conditional branching, loops, and data transformation
- Implement work automation by connecting to various services

**Flow vs Connector comparison**

|Category|Flow|Connector|
|:---|:---|:---|
|Role|Runs automation logic based on events generated in Copilot|Handles data communication with external systems|
|**Core<br>capabilities**| Conditional processing, loops, data transformation, task orchestration | API calls, authentication processing, data schema definition |
|**Usage<br>examples**| - Vacation request → Register a request in the HR system<br>- Customer inquiry → Create a CRM ticket | - Get SharePoint document list<br>- Send Outlook email |
|**Relationship**| A Flow **uses connectors** to interact with external systems | A Connector serves as a **data source in a Flow** |

<br>

**Summary of the key difference**
- Flow = automation logic
- Connector = means of connecting to external services
  
In other words, a Flow defines “what to do,” and a Connector handles “where to get data from and where to send it.”

---

Lab
===
In this lab, extend the email-sending connector scenario you created earlier to build a work flow that sends an email and also notifies Teams about the sent content.

## 1. Create a Flow

To create a Flow, select **Overview** → **+ Add a tool** → **+ New tool**.
<img width="1081" height="779" alt="image" src="{{ '/assets/image/github-attachments/d963a73a-b1e3-4471-8547-e99663380b18.png' | relative_url }}" />

Next, select **Agent flow** to move to the designer page for creating a new Flow.
<img width="1063" height="783" alt="image" src="{{ '/assets/image/github-attachments/605cccab-5010-442e-9b80-7d7d8c786b70.png' | relative_url }}" />

When you move to the flow designer, two actions are added by default.
- When an agent calls the flow: Acts as the trigger, and you can specify the input variables to use here.
- Respond to the Agent: If you need to call the agent with result values after the work is complete, you can create and pass output variables through this action.

In this scenario, we only need input values for the email address, CC, subject, and body required to send email and create a post.<br>
Because there is no need to return a separate output result, add only input variables under "When an agent calls the flow".
<br>
<img width="675" height="395" alt="image" src="{{ '/assets/image/github-attachments/722d2663-b985-4f0e-8117-347ffb671346.png' | relative_url }}" />
<br>
To add input variables, select "When an agent calls the flow" and click **+ Add an input**.<br>
Add input variables as follows.

<img width="648" height="225" alt="image" src="{{ '/assets/image/github-attachments/4585ee60-3a34-481b-b959-8416ce75efc2.png' | relative_url }}" />

<br>
<img width="666" height="275" alt="image" src="{{ '/assets/image/github-attachments/6833cedd-c723-408f-8f36-66ae1c114cf0.png' | relative_url }}" />

|Variable name|Type|
|---|---|
|to|text|
|Subject|text|
|CC|text|
|Body|text|

---
## 2. Add an action connector (email)

When variable input is complete, add and configure the following two tasks in order inside the flow based on the received variable values.
1. Send email
2. Publish a post to a Teams channel

First, click the **+** button below "When an agent calls the flow" to browse tasks you can add.<br>
<img width="976" height="845" alt="image" src="{{ '/assets/image/github-attachments/281c490c-f6a5-4f0e-9d45-d889db12748d.png' | relative_url }}" />

In search or from the connector list at the bottom, select **Office 365 Outlook**, <br>then, as before, select **Send an email (V2)**.
<img width="601" height="522" alt="image" src="{{ '/assets/image/github-attachments/d0053a79-95b1-491d-a4c6-40ab7946b7c5.png' | relative_url }}" />

When the email-sending connector is added, a UI similar to the one used in the previous session is displayed.<br>
Select advanced parameters and add CC.
<img width="758" height="703" alt="image" src="{{ '/assets/image/github-attachments/7997a038-ca65-43b0-b5b2-6da15c198873.png' | relative_url }}" />
<br>

Then, to enter variables, select the **gear** in the upper-right corner of the email-sending connector and click **Use dynamic content**.
<img width="797" height="218" alt="image" src="{{ '/assets/image/github-attachments/c68a61b3-b360-47d3-a5b4-438e9391e183.png' | relative_url }}" />

Then type / in each parameter value and insert the variable names declared under "When an agent calls the flow".
<img width="427" height="359" alt="image" src="{{ '/assets/image/github-attachments/fa2921eb-1cd4-455d-9abd-f100ce4fb41b.png' | relative_url }}" />

<img width="883" height="783" alt="image" src="{{ '/assets/image/github-attachments/2cde6243-e7a3-40ad-88fb-2b2b37548717.png' | relative_url }}" />

<img width="821" height="783" alt="image" src="{{ '/assets/image/github-attachments/a74ee7b7-c4a6-48ca-9c1b-b301b1cb22f1.png' | relative_url }}" />

After all variables are declared, the send email flow task is complete.<br>
When the flow is called, each variable value passed by the agent is mapped to the parameters of the email-sending connector, and the email is sent.
<br>

---
## 3. Add an action connector (post a message to a Teams channel)

Next, add a new connector so that a message can be automatically posted to a Teams channel after the email is sent.<br>
As in the previous task, click the **+** button below the Send an email action and add the
**Microsoft Teams - Post message in a chat or channel** action.

<img width="762" height="683" alt="image" src="{{ '/assets/image/github-attachments/3c7439ac-5fdf-402f-9780-1e1a9d12323e.png' | relative_url }}" />

Specify the channel where the notification message will be uploaded with the settings below.

|Parameter|Value|Description|
|---|---|---|
|Post as|Flow bot|Specifies whether to post under the user name or on behalf of Flow bot.<br> The name displayed in the channel will be different.
|Post in|Channel|Specifies whether to receive the message through chat or channel communication.|
|Team|Team to upload the post to|Specifies the team that contains the channel where the post will be uploaded. <br>When selected, teams I can access are displayed automatically.
|Channel|Upload channel|Selects the channel where the post is actually uploaded|
|Message|Text + body variable value| Enter the contents of the post. Here, enter it based on the Body entered in the email|

<br>

In the message, add a dynamic variable so you can use the phrase used when sending the email together with a fixed message.
> Similarly, you can add a dynamic variable by typing / inside the message text.
```
A new inquiry has arrived. Please check it!<br> @{triggerBody()?['text_3']}
```

<img width="695" height="583" alt="image" src="{{ '/assets/image/github-attachments/1ee9844e-50e0-4752-b185-da3a89fd1d08.png' | relative_url }}" />
<br>

When the task is complete, click the **Publish** button at the top to publish the Flow. Then select **Return to agent** to automatically view the added flow on the Agent overview page.
<img width="813" height="393" alt="image" src="{{ '/assets/image/github-attachments/a3910866-899d-42ec-82fc-b8147b630d2e.png' | relative_url }}" />
<br>
<img width="981" height="408" alt="image" src="{{ '/assets/image/github-attachments/b6fabf2c-cf60-469b-934f-b9c84f150b96.png' | relative_url }}" />

---
## 4. Apply the flow
Next, add Instructions and parameter descriptions so the flow can actually run.<br>

When you go to **Tools**, you can see that the Flow you created earlier has been added with the name **Untitled**.

However, because the current configuration duplicates the email-sending work done earlier, first disable the toggle for the **Send an email (V2)** task in **Tools**.
<img width="1258" height="379" alt="image" src="{{ '/assets/image/github-attachments/69e1c73e-aaae-4a62-bb5b-9b7c22a941d4.png' | relative_url }}" />

Then go to the **Untitled** Flow and apply the same type of work you performed for **Send an email (V2)**.
|Parameter|Value|
|---|---|
|Name|Send email and notification flow|
|Description|Use this when there is a task that requires sending an email on behalf of the user. <br>Use this when you need to send an escalation email to the person in charge.|
|To|Dynamically fill with AI - This is the recipient. Refer to the person-in-charge list and enter the email address of the user related to the task. The email address follows the format someone@contoso.com. If there are multiple people, separate them with ;.|
|Subjuect|Dynamically fill with AI - This is the email subject. Write it in the format [Work inquiry] Summary of inquiry.|
|Body|Dynamically fill with AI - This is the email body. Enter a summary of what you are asking the actual person in charge. <br>The inquiry date and time, requester, inquiry content, and similar details must be entered in HTML format.|
|CC|Custom value - User.Email|
|After run|Send specific response - As instructed, I have emailed this content to the person in charge. <br>The person in charge will contact you separately as soon as possible.|
<br>
<img width="1181" height="1145" alt="image" src="{{ '/assets/image/github-attachments/7d09943b-5053-4853-9cae-a95ed665b2db.png' | relative_url }}" />

<br>

When configuration is complete, click **Save**, then go to **Overview** and edit the Instructions.

The existing Instructions were configured to use the **Send an email (V2)** tool when an escalation occurs,
so remove the declaration of that tool from the Instructions, declare **Send email and notification flow**, and save.

<img width="1010" height="639" alt="image" src="{{ '/assets/image/github-attachments/e56bbe69-d6e2-4bd5-b90c-280c0e7b226a.png' | relative_url }}" />

---

Use a test to verify that the flow actually works.

<img width="1278" height="1169" alt="image" src="{{ '/assets/image/github-attachments/fbcf1326-89f0-4f7b-b3d9-bf84977d0f43.png' | relative_url }}" />
<br>
<br>

<img width="1803" height="526" alt="image" src="{{ '/assets/image/github-attachments/a7341ff1-eb08-4bb1-a339-3fbd029d338d.png' | relative_url }}" />
<br>
<br>

<img width="633" height="705" alt="image" src="{{ '/assets/image/github-attachments/c4d2c9bd-d5a3-4d38-92b2-7778793fdc4a.png' | relative_url }}" />
<br>
<br>

---

← [Previous: Step 6. Add external MCP tools]({{ '/en/chapters/ws5-6-external-mcp/' | relative_url }}) | [Next: Step 8. Add Triggers]({{ '/en/chapters/ws5-8-trigger/' | relative_url }}) →
