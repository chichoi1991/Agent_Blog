---
layout: chapter
lang: en
date: 2026-04-23
title: "Configure basic Instructions"
short_title: "Configure basic Instructions"
description: "[Renewal] Explore the basic features of Copilot Studio - Create an agent and write basic instructions"
order: 2
category: workshop
parent: "ws5"
---

## Step 2: Configure basic Instructions

# Hands-on: Create a Custom Engine Agent and write Instructions


## 1. Access the Copilot Studio site

### To create an agent, go to the [Copilot Studio page: copilotstudio.preview.microsoft.com](https://copilotstudio.preview.microsoft.com).
![image](https://github.com/user-attachments/assets/27577404-175d-4646-9caa-72be7e07b94d)

<br>

## 2. Change the development environment
Once the site opens, select the environment in the upper-right corner and move to the lab environment you received in advance.
<img width="1524" height="1392" alt="image" src="https://github.com/user-attachments/assets/68e1bdfd-bec8-4ca7-881b-56a0cbb4f1cf" />

<br>

> If the screen below appears first, select **...** in the upper-right corner and choose **Cancel agent creation** to return to the screen above.

<img width="1524" height="561" alt="image" src="https://github.com/user-attachments/assets/4794e942-e580-437b-ab0f-2388c6ef330d" />

<br><br>

## 3. Create an agent


### 3-1. Configure language and schema

> **⚠️ If the screen is displayed in English**, complete the following settings before entering the prompt.


1. Click the **⚙️ gear** icon in the lower-left corner of the prompt input box.
2. Change **Language** to **Korean**.
3. Enter the **Schema name** directly (for example: `usa_economic_agent_[your-name]`).

![2-1]({{ site.baseurl }}/assets/image/ws5/2-1.png)

> **⚠️ Note:** The schema name must be entered **in English**. Korean characters, special characters, and spaces cannot be used.

4. Confirm the settings and return.

### 3-2. Create a new agent

1. On the home screen, in the **"What do you want to build?"** section, with the **Agent** tab selected, enter the following sentence in the prompt input box and click the **→** button:

```
Create an agent that answers user questions about technical documents stored in an internal SharePoint site,
and supports sending email and automatic responses when needed.
```
![2-2]({{ site.baseurl }}/assets/image/ws5/2-2.png)

2. Copilot Studio automatically generates the agent name, description, and initial instructions.
3. Change the generated agent name to `USA_Economic_Indicator_Analysis_Agent_[your-name]`.
4. Click **Create** to create the agent.

> **Tip:** The automatically generated instructions will be fully replaced in the next step, so just check the name and continue.

<br>


## 4. Configure basic agent settings

After you click Create, the agent settings page appears as shown below.
Now enter the agent's basic name, description, and instructions here.

First, select **Settings** in the upper-right corner to review and configure the agent's basic settings.
<img width="1524" height="454" alt="image" src="https://github.com/user-attachments/assets/4dffbd0f-4bd3-4f64-8f5f-e4c9f84106a4" />
<br><br>


In Settings, you can configure various agent features, such as whether to use generative orchestration, which reasoning model to use, and which language model to use.
For this lab, enable the following features. <br>

| Feature | Setting |
| :---: | --- |
|Use generative orchestration | Enabled |
|Agent language model| Claude Sonnet 4.6 |
|Allow ungrounded responses| Disabled |
|Use information from the web| Disabled |
|Code interpreter| Disabled |
|Turn on Work IQ| Enabled |

> For the difference between classic and generative, see [here](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-generative-actions).

<br><br>
After completing all settings, click the **Save** button at the bottom center to save the settings and close the dialog.
![2-3]({{ site.baseurl }}/assets/image/ws5/2-3.png)

<br><br>

## 5. Configure the agent name, description, and Instructions

Next, configure the agent name, description, and Instructions.

Select **Edit** to the right of the Details tab and Instructions tab to edit the agent information.
![2-4]({{ site.baseurl }}/assets/image/ws5/2-4.png)

<br><br>

Enter the following information.

### Agent name
```
Technical Document Support Agent-your name
```

### Agent description
```
Answers user questions based on technical documents stored in an internal SharePoint site, and supports sending email and automatic responses when needed.
```

### Instructions
```
# Purpose
This agent answers user questions accurately and quickly based on technical documents stored in an internal SharePoint site, and sends emails and provides automatic responses when needed.

## General instructions
- Accuracy: Always answer based on the latest technical documents.
- Clarity: Explain in concise, easy-to-understand language.
- Security compliance: Maintain the confidentiality of internal documents and do not disclose them externally.
- Tone: Maintain a professional and friendly tone.

## Skills
- Search and reference SharePoint documents
- Use email-sending capabilities
- Write automatic response messages

## Step-by-step instructions
1. Analyze the question
   - Extract the key keywords from the user's question.
   - Identify the scope of the question and related technical documents.

2. Search documents
   - Search `SharePoint` for related technical documents.
   - Prioritize the most relevant documents as references.

3. Generate an answer
   - Write a clear and concise answer based on the document content.
   - Provide examples or additional explanations when needed.

4. Send email (when needed)
   - Send an email when the user requests it or when the situation requires it.
   - Use the `Outlook send email` action to send it to the specified recipient.

5. Automatic response
   - Provide an automatic response message when the user is away or additional information is required.

## Error handling
- If SharePoint search fails: Inform the user that the search failed and ask them to recheck the keywords.
- If email sending fails: Provide the error message and explain the retry option.

## Interaction examples
- User: "Tell me the latest API guidelines"
- Agent: "I found the latest API guidelines in SharePoint. The key points are as follows..."

## Non-standard terms
- Technical documents: Technical documents stored in an internal SharePoint site

## Follow-up and wrap-up
- After answering, check whether the user has additional questions.
- Provide links to related documents when needed.

```

<br><br>

After entering everything, click the Save button to save the agent's basic information and instructions.

![2-5]({{ site.baseurl }}/assets/image/ws5/2-5.png)



---
**Congratulations!**

You have completed configuring the agent's basic Instructions.
Next, add the reference materials and tools that the agent will use.


---

← [Previous: Step 1. Agent introduction]({{ '/en/chapters/ws5-1-agent-intro/' | relative_url }}) | [Next: Step 3. Add reference materials]({{ '/en/chapters/ws5-3-knowledge/' | relative_url }}) →
