---
layout: chapter
lang: en
date: 2026-04-08
title: "Publish and deploy"
short_title: "Publish and deploy"
description: "Fundamentals #1: Blog Post Agent - Publish and deploy"
order: 5
category: workshop
parent: "ws1"
---

## Step 5: Publish and deploy

<img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/5755a4eb-59a3-4d20-b638-c7d7ddf5d182" /><img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/54418a6f-82bd-491e-acf3-0a8696b38e18" /># Publish and deploy the agent

If you completed steps 1 through 4 and the agent works correctly in the test panel,
now deploy this agent so it can be used in Teams.


## Publish the agent
For the configured agent, select the [Publish] button in the upper-right corner to publish it.
<img width="854" height="391" alt="image" src="https://github.com/user-attachments/assets/1bdf16ac-b7ce-470d-b89f-c9c48f7fcf91" />
<img width="1065" height="549" alt="image" src="https://github.com/user-attachments/assets/fa5f499a-37cf-4f5e-a922-de21133dc27d" />


## Add an agent channel
After publishing is complete, choose the channel where users will enter prompts for this agent.
Select the Channels tab in the upper-right corner to move there.
<img width="570" height="464" alt="image" src="https://github.com/user-attachments/assets/06d0c73b-4c26-40fc-b6a3-03d638559a7d" />
<br> <br> 

Copilot Studio provides channels so agents can be used from various interfaces, including Teams and the Microsoft 365 Copilot app. <br>
Because the goal of this workshop is to deploy the agent to Teams and the Copilot app, select **Teams and Microsoft 365 Copilot** under Microsoft channels.<br>
<img width="566" height="286" alt="image" src="https://github.com/user-attachments/assets/6961a343-7896-4939-aae9-4633543bccc5" />


When you select Teams and Microsoft 365 Copilot, channel add details appear in the right pane. <br>
Check that Turn on Microsoft 365 is selected, then select **Add channel**. <br>
<img width="575" height="326" alt="image" src="https://github.com/user-attachments/assets/f4d2c2f9-5311-4d36-85d2-1f008592188f" />
<br> <br> 
After adding the channel, close the pane and publish the agent again.
<img width="1708" height="951" alt="image" src="https://github.com/user-attachments/assets/a16cff64-4d14-47a7-9525-a643c1c24842" />
<br> <br> 

## Change the channel sharing policy
After the channel is added and published, this agent can be used in Teams. <br> 
However, the default setting allows only the maker to use it, so configure sharing options in Settings. <br>
Go back to **Teams and Microsoft 365 Copilot** under Microsoft channels and select **Availability options**.
<img width="860" height="533" alt="image" src="https://github.com/user-attachments/assets/70248bc8-7223-4798-a661-afd46f249372" />
<br> <br> 

Next, click the **Manage sharing** button.
<img width="860" height="533" alt="image" src="https://github.com/user-attachments/assets/bd51e0e4-b303-478e-bab3-12a58ef3cc35" />
<br> <br>
Then select My organization, assign **Viewer** permissions, and click Update.
<img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/cf22aef1-0b65-4a31-acb0-56d851cd656b" />
<br> <br> 
After the update is complete, return to Availability options and select **Copy link**. When you share that link in a browser or Teams, people in your organization, including you, can use the agent.
<img width="860" height="533" alt="image" src="https://github.com/user-attachments/assets/225c923d-d20b-4960-97a6-ff15808617b1" />
<br> <br> 

The Show in store feature makes the agent you built appear in the Teams and Copilot app stores. <br> 
**Show to my teammates and shared users** does not require separate approval, <br> 
but **Show to everyone in my org** is deployed after IT admin approval. <br> 

For the workshop, post the copied link in your Teams chat with yourself, then click the link.
<img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/255cefe8-fac7-4519-ab15-37b8568bb72c" />
<br> <br>
When you click the link, the following appears. Click the [Add] button.
<img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/78592e35-93a7-43dd-af24-67a1f60304a8" />
<br> <br>
After it is added, select Open in Copilot to run the agent in the Copilot experience.
<img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/b34d09ce-ec5c-47d9-b044-d145eeeb49db" />
<img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/d190c50c-5e38-41f1-a196-2c524936a527" />

<br> <br>
 
## Test
Use the following prompts to test whether the agent works as expected in the actual scenarios.
```
I want to write a blog draft introducing the basics of Copilot Studio
```
<br> 
<img width="1720" height="1392" alt="image" src="https://github.com/user-attachments/assets/4c63f83e-2372-423e-b046-b3f07f8c23e1" />
<br> 

```
Send this content by email to chiwonchoi@microsoft.com
```
<img width="1720" height="1392" alt="image" src="https://github.com/user-attachments/assets/53e731e6-8935-495f-9738-91b35121f862" />
<br> <br> 
```
List our company's refrigerator spec sheets
```
<img width="1720" height="1392" alt="image" src="https://github.com/user-attachments/assets/68c54b54-2567-4042-bbd5-d6afc7cb3967" />

<br> <br> 
```
Create an introduction newsletter for the SKSCW241RP product and post it to Teams
```
<img width="1720" height="1392" alt="image" src="https://github.com/user-attachments/assets/85874535-3f6c-43c7-90a6-8b015bd461a1" />

<br> <br> 

----
Congratulations!
You have developed an agent that uses various Microsoft 365 tools and knowledge through a custom engine agent.

---

← [Previous: Step 4. Tools: plugin connector]({{ '/en/chapters/ws1-4-tool-plugin/' | relative_url }}) | [Back to overview]({{ '/en/chapters/ws1-0-overview/' | relative_url }})
