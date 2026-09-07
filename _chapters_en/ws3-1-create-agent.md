---
layout: chapter
lang: en
date: 2026-04-08
title: "Create an agent and write Instructions"
short_title: "Create an agent"
description: "Fundamentals #3: Autonomous agent - Create an agent and write Instructions"
order: 1
category: workshop
parent: "ws3"
---

## Step 1: Create an agent and write Instructions

# 1. Create an agent and write Instructions

> **Previous step:** [README - workshop overview](./README.md) | **Next step:** [2. Connect knowledge sources](./2.%20지식%20소스%20연결.md)

---

## 1. Go to Copilot Studio and select an environment

Go to [Copilot Studio](https://copilotstudio.microsoft.com).

After signing in, check that you are switched to the **workshop environment** where the name of the signed-in account appears in the environment selection menu in the upper-right corner.

> If the wrong environment is selected, the agent may be created in a different environment, so be sure to check it.

![Copilot Studio environment selection screen]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20194438.png)

<br>

---

## 2. Create a custom engine agent

Click **Agents** in the left pane, then select **+ Create a blank agent** in the upper-right corner.

![Copilot Studio create agent #1]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20194805.png)

> If the agent appears in English, do not click Create a blank agent. Instead, click the chevron below, select Advanced create, and check that the language is set to **ko-KR** or **Korean** in the agent settings window. If it is not set, change it and select Confirm and create.

![Copilot Studio create agent #2]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20195027.png)

![Copilot Studio create agent #3]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20195117.png)


In this workshop, skip the natural-language wizard and create the agent immediately by clicking the **Create** button.

<br>

---

## 3. Configure the agent basics

When the agent is created, the following UI appears. Click **Settings** in the upper-right corner and configure the following items.

| Setting item | Value |
|-----------|-----|
| Generative orchestration | **Enabled** |
| Use general knowledge | Enabled |
| Use information from the web | Disabled |
| Code interpreter | Enabled |
| Turn on Work IQ | Enabled |

<br>

![Agent settings]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20203420.png)

After completing the settings, press the **Save** button at the bottom and click the X button in the upper-right corner to return to the basic settings window.
<br>

Next, select the agent's main language model.
Depending on your organization settings, you can select not only OpenAI GPT models but also Anthropic Claude and Opus models.
In this workshop, select **Claude Sonnet 4.6**.

![Agent settings - language model]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20200055.png)

---

## 4. Enter the agent name and description

On the agent Overview screen, click the **Edit** icon to the right of the **Details** tab and enter the following. <br>

| Item | Example value |
|------|---------|
| Name | `Home Appliance Control and Report Agent` |
| Description | `A work assistant agent that handles home appliance information lookup, internal document search, Excel data analysis, and email sending in a single conversation.` |


![Agent settings - basic information]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20201338.png)

<br>

---

## 5. Write agent Instructions

Click **Edit** to the right of the **Instructions** tab and enter the Instructions below.

Instructions are the core setting that describes the agent's role, tool usage method, and response format in natural language.  
To guide the agent to make decisions on its own without Flows or Topics, you need **clear and specific Instructions**.

![Add Instructions]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20202704.png)

```
#Role
You are an agent that kindly answers user questions and requests.

#Skills
1. ThinQ device control - When the user asks questions or makes requests about LG home appliances (meaning ThinQ), call ThinQ MCP to look up and answer. - Use Markdown and emoji to make the retrieved data easier to read.
2. Email-related work - When the user makes email-related requests (such as sending email or checking received mail), use the Work IQ mail MCP tool. - In particular, when sending email, follow the email writing rules and use HTML format with emoji and styles to make the design attractive. - Use complementary text and background colors to improve readability.
3. Puns - Look up puns and make users laugh. 
- Cautions - Among home appliances, there is a product named 틔운 미니. Output it exactly as "틔운 미니". - When a task is complete, randomly look up a joke and output a pun to make the user laugh.


#Email writing rules
When generating HTML output, always follow these rules.  
1. Force all text colors to a black range (#000000 to #333333).  
2. Never use white (#ffffff) text.  
3. Do not use linear-gradient, dark backgrounds, or dark theme styles.  
4. Specify color with inline style for all text elements (h1~p, li, td, th).  
5. Readability must be maintained in email, Outlook, and mobile environments.  
6. Prioritize visibility and stability over design.


```

<br>

> **💡 Tips for writing Instructions**
> - Mentioning tool names directly in Instructions increases the agent's tool selection accuracy.
> - Specifying response formats (HTML, tables, lists, etc.) in Instructions helps you receive consistent answers.
> - It is best to improve Instructions by repeatedly testing after agent updates.

<br>

---

## 6. Save and check behavior

After writing the Instructions, press the **Save** button.

In the test panel on the right, enter the question below to check the basic behavior.

```
What can you help me with?
```


![Agent test]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20203618.png)

If the agent responds with a greeting and guidance that matches its role, step 1 is complete.

<br>

---

> **Next step:** [2. Connect knowledge sources (SharePoint · email)](./2.%20지식%20소스%20연결.md)


---

---

← [Back to overview]({{ '/en/chapters/ws3-0-overview/' | relative_url }}) | [Next: Step 2. Connect knowledge sources]({{ '/en/chapters/ws3-2-knowledge/' | relative_url }}) →
