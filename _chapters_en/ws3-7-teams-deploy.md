---
layout: chapter
lang: en
date: 2026-04-08
title: "Deploy to Teams"
short_title: "Deploy to Teams"
description: "Basics #3: Autonomous agent - Teams deployment"
order: 7
category: workshop
parent: "ws3"
---

## Step 7: Deploy to Teams

# 7. Deploy and test in a Teams channel

> **Previous step:** [6. Excel data filtering (advanced)](./6.%20Excel%20데이터%20필터링.md) | **Start over:** [README](./README.md)

---

## Final checks before deployment

Before deploying the agent to Teams, review the checklist below.

- [ ] Agent Instructions saved
- [ ] SharePoint Knowledge source connection verified
- [ ] Email connector authentication completed
- [ ] ThinQ MCP tool connection verified
- [ ] Work IQ MCP tool connection verified
- [ ] AI Prompt tool (HTML_Response_Generator) saved
- [ ] Basic behavior verified in the test panel

<br>

---

## 1. Publish the agent

### 1-1. Start publishing

Click the **Publish** button in the upper-right corner of the agent overview page.

<br>

### 1-2. Confirm publishing

Review the contents in the publish popup and click **Publish**.

> Publishing saves the agent's current settings and makes it ready for deployment.  
> You can continue editing the agent after publishing. Republish after editing to apply changes.

Publishing may take 1-2 minutes to complete.

<br>

---

## 2. Deploy to a Teams channel

### 2-1. Configure channel deployment

After publishing is complete, go to **Settings** → **Channels** in the left menu.  
Alternatively, find the **Channels** section on the agent overview page.

<br>

### 2-2. Select the Microsoft Teams channel

From the channel list, select **Microsoft Teams**.

<br>

### 2-3. Configure the Teams channel

| Item | Setting |
|------|------|
| **Deployment target** | Teams channel (including group chat) |
| **Sharing scope** | Lab team or entire organization (follow instructor guidance) |
| **Teams app name** | Automatically set to the same name as the agent |

<br>

### 2-4. Add the agent to Teams

Click the **Open in Teams** button, or add the agent to Teams using one of the methods below.

**Method A — Add from the app store (for organization deployment):**
1. Open the Microsoft Teams app
2. Click **Apps** in the lower-left → **Built for your org** tab
3. Search for the agent name and click **Add**

**Method B — Add with a direct link:**
1. Copy the direct Teams add link provided by Copilot Studio
2. Paste it in Teams chat and install

<br>

### 2-5. Register the agent in a Teams channel

To register the agent in a specific Teams channel:
1. Go to the target Teams channel
2. Click **+** (add a tab) at the top of the channel
3. Select **App tab** or search for the agent
4. Complete installation

<br>

---

## 3. Test behavior in Teams

After the agent is added to Teams, validate the end-to-end flow with the scenarios below.

### Scenario 1 — Look up appliance information (ThinQ MCP)
```
@[Agent name] Recommend an LG robot vacuum model
```
→ ThinQ MCP lookup → HTML card response

### Scenario 2 — Today's work briefing (Work IQ MCP)
```
Summarize my schedule and tasks for today
```
→ Work IQ MCP lookup → HTML report card response

### Scenario 3 — Search internal documents (SharePoint)
```
Find internal documents related to [search keyword]
```
→ SharePoint search → response with citations

### Scenario 4 — Look up and send email
```
Check my recent emails and send my team lead an email saying today's work is complete
```
→ Email lookup → draft creation → send after approval

### Scenario 5 — Personalized content (Excel + AI Prompt, advanced)
```
I'm a new employee. Teach me how to use Teams
```
→ Excel filtering → Personalized_Content_Generator → HTML response

<br>

---

## 4. (Optional) Copilot Studio monitoring

If you have time left in the lab, review conversation logs in Copilot Studio.

### 4-1. Open the monitoring tab

Copilot Studio → select the agent → click **Monitoring** in the left menu

<br>

### 4-2. Items to check

| Item | What to check |
|------|-----------|
| **Conversation history** | Full flow of user questions and agent responses |
| **Tool call logs** | Which tools were called and in what order |
| **Error logs** | Tool call failures, authentication errors, and more |
| **Performance metrics** | Average response time, number of sessions, and more |

<br>

> **💡 Monitoring tips**
> - If the agent calls the wrong tool or does not follow the Instructions, analyze the cause in the conversation logs and update the Instructions.
> - If the tool call order is not what you intended, make the workflow description in the Instructions more specific.

<br>

---

## Lab complete 🎉

Congratulations! You have completed all steps.

Here is a summary of what you implemented in this lab.

| Step | Implementation |
|------|-----------|
| Step 1 | Created a custom engine agent and wrote Instructions |
| Step 2 | Connected SharePoint Knowledge source + email connector |
| Step 3 | Retrieved appliance product data with ThinQ MCP |
| Step 4 | Configured a multi-step workflow based on Work IQ MCP + Instructions |
| Step 5 | Implemented HTML card response formatting with an AI Prompt tool |
| Step 6 | Excel data filtering + personalized content generation (advanced) |
| Step 7 | Deployed to Microsoft Teams channels and ran end-to-end tests |

<br>

> **Key takeaway:** You can implement complex business automation using only **Instructions + tools + MCP**, without Flows, variables, or Topics.  
> The quality of an agent's autonomous orchestration is proportional to the specificity of its **Instructions**.

<br>

---

> [← Back to README](./README.md)

---

← [Previous: Step 6. Excel filtering]({{ '/en/chapters/ws3-6-excel-filter/' | relative_url }}) | [Back to overview]({{ '/en/chapters/ws3-0-overview/' | relative_url }})
