---
layout: chapter
lang: en
date: 2026-04-08
title: "Add a tool (plugin connector)"
short_title: "Tools: plugin connector"
description: "Fundamentals #1: Blog Post Agent - Add a tool (plugin connector)"
order: 4
category: workshop
parent: "ws1"
---

## Step 4: Add a tool (plugin connector)

# Add a tool to the agent #2 (plugin connector)

This time, you will add a general plugin connector as a tool instead of an MCP server. <br>
For an MCP server, each tool description and input variable description is already written, so there is nothing more to do.
When you call a general connector as a tool, however, you must write those descriptions yourself. <br>

This can be extra work, but when the variables or scenarios entered into the connector are complex or uncommon, <br> 
using a general connector for this type of work has the advantage of letting you provide clearer instructions.


---

## Workshop
In this workshop, you will implement a tool that lets the agent publish a newsletter or blog post to a specific Teams channel as a post. <br>

### Add a tool for posting messages to a Teams channel

Similarly, select **+ Add tool** from the **Overview**.
<img width="1186" height="686" alt="image" src="https://github.com/user-attachments/assets/68cf3d4d-bdf0-48a0-bfe7-28a368670d33" />
<br> <br> 
Search for and select **Microsoft Teams** from recommendations or tool search.
<img width="746" height="464" alt="image" src="https://github.com/user-attachments/assets/f72d7d76-da73-43a1-8845-adf372f94009" />
<br> <br>

From the Teams tool collection, select the **Post message in a chat or channel** tool.
<img width="715" height="455" alt="image" src="https://github.com/user-attachments/assets/56fda9c2-bdc6-4214-b817-38e500dacacb" />
<br> <br> 

As before, if the connection is not already set up, use **Create new connection** to connect the tool to the agent. <br>
Then select **Add and configure** to add the tool and continue configuring it. <br>

<img width="697" height="451" alt="image" src="https://github.com/user-attachments/assets/6fe1a004-f626-421f-9ac2-d569287f7b1d" />
<br> <br> <br> 
### Tool settings
After the tool is added, the details page shown below appears. 
Unlike the earlier MCP server tool, you can see that you can configure information such as the name, description, and inputs.
<img width="1111" height="1101" alt="image" src="https://github.com/user-attachments/assets/44b46518-e066-4c2e-beda-d70959129104" />
<br> <br> 
Change the description, inputs, and completion settings as follows.

**Description**
```
Use this tool when the user asks to publish or post content to Teams or a Teams channel.
```
<img width="1021" height="529" alt="image" src="https://github.com/user-attachments/assets/43630d5b-9f26-48c9-9a45-961f8983dafb" />

<br> <br> 

----
**Inputs**
<br> <br>
On the Inputs tab, when you select the value for the Fill using field, you can choose one of two options: dynamically fill with AI or custom value.
<br> 
Select custom value for both Post as and Post in. <br> 
<img width="495" height="239" alt="image" src="https://github.com/user-attachments/assets/d9228dec-3709-4f7a-b574-40827b817c54" />
<br> <br> 
After selecting the value, the available options appear as shown below. <br> 
For Post as, select User. For Post in, select Channel.<br> 
<img width="443" height="203" alt="image" src="https://github.com/user-attachments/assets/cb2db0c1-b8ec-4483-bb1b-ad11e050d616" />
<br> 
<img width="469" height="233" alt="image" src="https://github.com/user-attachments/assets/cdad9ffd-40c2-4a3e-ae3b-1dd5f780c2db" />
<br> <br> 
When Post in is set to Channel, new input variables named Team, Channel, and Message are added. <br> 
Team and Channel specify where to upload the Teams post, and Message is the post body. <br> 

As above, change Team and channel to **custom value**,
and keep Message as **Dynamically fill with AI**.

#### Important

Normally, Team and Channel should automatically show the teams and channels assigned to you,
but because this is still in Preview, IDs may not display correctly.
<img width="987" height="426" alt="image" src="https://github.com/user-attachments/assets/8c594558-feaa-47d5-9f21-3a5855daaac8" />

Therefore, check the Teams channel ID as follows. <br>
First, go to Teams: [**Teams link**](https://teams.microsoft.com/v2/) <br> 
Next, select the channel where you will publish the post, click ..., and select Copy link.<br>
<img width="335" height="334" alt="image" src="https://github.com/user-attachments/assets/e4fb9e44-c9c0-4218-86f7-be8ef92d0c1e" />
<br> <br>

After copying it, paste it into Notepad. A URL in the following format appears.
```
https://teams.microsoft.com/l/channel/19%3Aafff7d3f3be242f38d6sasdada1f2aa%40thread.tacv2/20251022%20%EC%9B%8C%ED%81%AC%EC%83%B5?groupId=a5f8994e-c248-4e00-8993-a8f9e5bc2e8b&tenantId=7xxxxxx7-xxxx-xxxx-8d61-9xxxxxx4xx52
```
Here, the value shown after groupId= and before & is the Team (GroupID). 
```
a5f8994e-c248-4e00-8993-a8f9e5bc2e8b
```
The value after channel/ that starts with 19% and ends with .tacv2 is the channel ID.
```
19%3Aafff7d3f3be242f38d6sasdada1f2aa%40thread.tacv2
```

Extract these values and enter them in the Team and Channel fields.
<img width="876" height="513" alt="image" src="https://github.com/user-attachments/assets/d9d503c6-d4d7-4073-ac96-d79b562ab38e" />
<br> <br> 

Then save. The tool setup is complete.

### Add Instructions

After the tool is added, return to the Overview and write the post creation workflow in the Instructions as follows.
<br> 
<img width="1071" height="709" alt="image" src="https://github.com/user-attachments/assets/8912e14c-8630-49ad-93a4-252baa402c76" />
<br> <br> 

Add the following under the 1) Supported capabilities section in the Instructions.
```
### 1.7 Create Teams posts
 - Publish the written document as a Teams post
 - Write Message using HTML and CSS formats

```
<br> 

Add the following to 3) Example workflow (including the original scenario) in the Instructions.
```
User: "Update this content as a post" or "Publish this article as a Teams post"
Agent: "Yes, I will create it in the Teams channel with HTML and CSS styles applied."
```
<br> 

Add the following at the bottom of the Instructions.
```
## 9) Teams post publishing guide
 - message: The Teams post body. Write the body with HTML and CSS styles applied to add design elements
---
```
<br> 
<br> 

After you finish editing the Instructions and save them, test whether the email is sent correctly.
Test prompt
```
Create a newsletter about dishwasher product lines and send it by email to **[email address]**
```

### Test 

Use the prompt below to test whether a post is actually published to the channel.
```
Post "Hello, nice to meet you" to the Teams channel
```
<img width="1697" height="1270" alt="image" src="https://github.com/user-attachments/assets/d15802d6-1e09-4948-862a-3dbc7dff1ec8" />


----

Congratulations!
By adding Tools, you have configured the agent so it can send emails and create Teams posts.
Finally, publish the agent and test it in Teams.




---
---

← [Previous: Step 3. Tools: MCP connector]({{ '/en/chapters/ws1-3-tool-mcp/' | relative_url }}) | [Next: Step 5. Publish and deploy]({{ '/en/chapters/ws1-5-publish/' | relative_url }}) →
