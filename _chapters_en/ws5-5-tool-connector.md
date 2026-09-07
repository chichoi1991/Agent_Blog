---
layout: chapter
lang: en
date: 2026-04-23
title: "Add connector (post Teams channel message)"
short_title: "Add connector (post Teams channel message)"
description: "[Renewal] Explore the basic features of Copilot Studio - Add a standard plugin connector (Teams channel post example)"
order: 5
category: workshop
parent: "ws5"
---

## Step 5: Add connector (send email)

# Add tools to the agent #2 (plugin connector)

This time, add a standard plugin connector as a tool, rather than an MCP server. <br>
For an MCP server, the descriptions of each tool and its input variables are already written, so there was no additional work to do.
When calling a standard connector as a tool, however, you must write these descriptions yourself. <br>

This can be extra work, but when the variables or scenario entered into the connector are complex or uncommon, <br>
using a standard connector for this kind of task has the advantage of letting you provide clearer instructions.

> 💡 In this step, we use the **Microsoft Teams post a message in a channel connector** as an example.  
> If you add the **Office 365 Outlook → Send an email (V2)** connector using the same procedure, you can use it as a standard connector for sending email.

---

## Lab
In this lab, implement the agent so it can create a newsletter or blog post as a post in a specific Teams channel. <br>

### Add a tool to post a message to a Teams channel

As before, select **+ Add a tool** from the **Overview**.
<img width="1186" height="686" alt="image" src="{{ '/assets/image/github-attachments/68cf3d4d-bdf0-48a0-bfe7-28a368670d33.png' | relative_url }}" />
<br><br>
In Recommendations or tool search, search for and select **Microsoft Teams**.
<img width="746" height="464" alt="image" src="{{ '/assets/image/github-attachments/f72d7d76-da73-43a1-8845-adf372f94009.png' | relative_url }}" />
<br><br>

From the Teams tool collection, select the **Post message in a chat or channel** tool.
<img width="715" height="455" alt="image" src="{{ '/assets/image/github-attachments/56fda9c2-bdc6-4214-b817-38e500dacacb.png' | relative_url }}" />
<br><br>

As before, if the connection is not already configured, use **Create a new connection** to connect the agent and tool, <br>
and select **Add and configure** to add the tool and continue configuration. <br>

<img width="697" height="451" alt="image" src="{{ '/assets/image/github-attachments/6fe1a004-f626-421f-9ac2-d569287f7b1d.png' | relative_url }}" />
<br><br><br>
### Tool settings
After the tool is added, the details page below appears.
Unlike the previous MCP server tool, you can see that you can configure information such as the name, description, and inputs.
<img width="1111" height="1101" alt="image" src="{{ '/assets/image/github-attachments/44b46518-e066-4c2e-beda-d70959129104.png' | relative_url }}" />
<br><br>
Here, change the description, inputs, and completion settings as follows.

**Description**
```
Use this tool when the user asks to post or publish a post to Teams or a Teams channel.
```
<img width="1021" height="529" alt="image" src="{{ '/assets/image/github-attachments/43630d5b-9f26-48c9-9a45-961f8983dafb.png' | relative_url }}" />

<br><br>

----
**Inputs**
<br><br>
On the Inputs tab, when you select a value for the Fill using field, you can choose either dynamic fill with AI or a custom value, as shown below.
<br>
Select custom value for both Post as and Post in. <br>
<img width="495" height="239" alt="image" src="{{ '/assets/image/github-attachments/d9228dec-3709-4f7a-b574-40827b817c54.png' | relative_url }}" />
<br><br>
Then, when you select a value, the available options appear as shown below. <br>
For Post as, select User; for Post in, select Channel.<br>
<img width="443" height="203" alt="image" src="{{ '/assets/image/github-attachments/cb2db0c1-b8ec-4483-bb1b-ad11e050d616.png' | relative_url }}" />
<br>
<img width="469" height="233" alt="image" src="{{ '/assets/image/github-attachments/cdad9ffd-40c2-4a3e-ae3b-1dd5f780c2db.png' | relative_url }}" />
<br><br>
When Post in is selected as Channel, new input variables named Team, Channel, and Message are added. <br>
Team and Channel specify the location where the Teams post will be uploaded, and Message is the body of the post. <br>

As above, change Team and Channel to **Custom value**,
and keep Message as **Dynamically fill with AI**.

#### Important

Normally, Team and Channel should automatically show the teams and channels assigned to you,
but because this is still in Preview, there is an issue where the IDs may not display correctly.
<img width="987" height="426" alt="image" src="{{ '/assets/image/github-attachments/8c594558-feaa-47d5-9f21-3a5855daaac8.png' | relative_url }}" />

Therefore, check the Teams channel ID as follows. <br>
First, access Teams: [**Teams access link**](https://teams.microsoft.com/v2/) <br>
Next, select the channel where you will post, click **...**, and select Copy link.<br>
<img width="335" height="334" alt="image" src="{{ '/assets/image/github-attachments/e4fb9e44-c9c0-4218-86f7-be8ef92d0c1e.png' | relative_url }}" />
<br><br>

After copying it, paste it into Notepad. A URL in the following format is displayed.
```
https://teams.microsoft.com/l/channel/19%3Aafff7d3f3be242f38d6sasdada1f2aa%40thread.tacv2/20251022%20%EC%9B%8C%ED%81%AC%EC%83%B5?groupId=a5f8994e-c248-4e00-8993-a8f9e5bc2e8b&tenantId=7xxxxxx7-xxxx-xxxx-8d61-9xxxxxx4xx52
```
Here, the value shown after groupId= and before & is the Team (GroupID),
```
a5f8994e-c248-4e00-8993-a8f9e5bc2e8b
```
The value after channel/ that starts with 19% and ends with .tacv2 is the channel ID.
```
19%3Aafff7d3f3be242f38d6sasdada1f2aa%40thread.tacv2
```

Extract these values and enter them for the Team and Channel values.
<img width="876" height="513" alt="image" src="{{ '/assets/image/github-attachments/d9d503c6-d4d7-4073-ac96-d79b562ab38e.png' | relative_url }}" />
<br><br>

Then save, and the tool configuration is complete.

### Add Instructions

After the tool has been added, return to the Overview and write the post creation workflow in the Instructions as follows.
<br>
<img width="1071" height="709" alt="image" src="{{ '/assets/image/github-attachments/8912e14c-8630-49ad-93a4-252baa402c76.png' | relative_url }}" />
<br><br>

Add the following under ## Step-by-step instructions in the Instructions.
```
6. Publish a Teams post
 - Register the content requested by the user as a Teams post.
 - Write the Message using HTML and CSS formats.

```


After finishing the Instructions edit and saving, test whether the email is sent successfully.
Test prompt
```
Create a newsletter about the dishwasher product line and email it to **[email address]**.
```

### Test 

Use the prompt below to test whether a post is actually created in the channel.
```
Post "Hello, nice to meet you" to the Teams channel.
```
<img width="1697" height="1270" alt="image" src="{{ '/assets/image/github-attachments/d15802d6-1e09-4948-862a-3dbc7dff1ec8.png' | relative_url }}" />


----

Congratulations!
By adding tools, you have finished configuring the agent so it can send email and create Teams posts.
Next, connect an external MCP server directly by URL to add a private MCP tool.

---

← [Previous: Step 4. Add MCP tools]({{ '/en/chapters/ws5-4-tool-mcp/' | relative_url }}) | [Next: Step 6. Add external MCP tools]({{ '/en/chapters/ws5-6-external-mcp/' | relative_url }}) →
