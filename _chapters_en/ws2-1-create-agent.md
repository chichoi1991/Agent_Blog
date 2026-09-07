---
layout: chapter
lang: en
date: 2026-04-08
title: "Create an agent and write Instructions"
short_title: "Create an agent"
description: "Fundamentals #2: Document search & escalation - Create an agent and write Instructions"
order: 1
category: workshop
parent: "ws2"
---

## Step 1: Create an agent and write Instructions

Create a Custom Engine Agent and write Instructions
===

### 1. Go to the URL [here](https://copilotstudio.preview.microsoft.com), then select **Create** on the left.
![image](https://github.com/user-attachments/assets/27577404-175d-4646-9caa-72be7e07b94d)
    > https://copilotstudio.preview.microsoft.com/

<br/>


### 2. Create an agent draft with natural language
Create an agent draft using Copilot capabilities.   
This is where you create a draft, but you can also simply **click Create** and configure it yourself.
<img width="1248" height="1261" alt="image" src="https://github.com/user-attachments/assets/ebe5a018-c2c1-4a0b-9fc5-b1be25928015" />



Enter the following prompts.

```
I want to create an agent that answers questions based on internal site information
```

```
Yes
```

```
I also want to implement email-based escalation to the business owner when needed.
If the agent cannot find materials and information suitable for the user's question, it can escalate the inquiry to the owner.
Add a question that asks: Would you like to escalate this?
```

After the interactive setup is complete, you can review the currently configured agent information under [Configure].
Click the [Create] button to create the agent.
<img width="1247" height="1204" alt="image" src="https://github.com/user-attachments/assets/0f0121e0-a5f4-46c5-a15d-e0cd8becf117" />

</br>

### 3. Enable generative AI orchestration
Enable the feature to test here. For the difference between classic and generative orchestration, see [here](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-generative-actions).

<img width="688" height="419" alt="image" src="https://github.com/user-attachments/assets/bf0ab9b1-9e19-4318-b035-d1909fd8d8e5" />
</br>
</br>
You can also change the "response model" in Settings.


<img width="1176" height="714" alt="image" src="https://github.com/user-attachments/assets/1e6ae064-65ad-4b83-9a27-5436c2647fe2" />
</br>

```
As of August 10, 2025, GPT-4o and GPT-5 are available
```

### 4. Add more description to Knowledge
On the Knowledge screen, add a more detailed description to the website URL that was automatically connected above, then save it.
<img width="1262" height="575" alt="image" src="https://github.com/user-attachments/assets/f9431b04-3eb9-44ea-8c62-e43e19235470" />



```
This Knowledge source is a site that provides a consolidated view of media news information from LG Innotek. You can check press releases, news, announcements, and other information related to LG Innotek.
Use it when users request searches for news or disclosure materials related to LG Innotek or LG이노텍.
```

<img width="1167" height="978" alt="image" src="https://github.com/user-attachments/assets/352ffe92-dd52-42dd-9aa6-1339254f9a6e" />


---
You have finished setting the agent's basic Instructions.
Next, configure the tools and triggers the agent will use.


---
---

← [Back to overview]({{ '/en/chapters/ws2-0-overview/' | relative_url }}) | [Next: Step 2. Tools: connector]({{ '/en/chapters/ws2-2-tool-connector/' | relative_url }}) →
