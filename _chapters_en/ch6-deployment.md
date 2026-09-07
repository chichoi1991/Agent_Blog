---
layout: chapter
lang: en
date: 2026-04-08
title: "Deployment and usage scope configuration"
short_title: "Deployment and scope configuration"
description: "A step-by-step guide to Teams deployment, Web App deployment, and how to manage usage scope by user and organization."
order: 6
category: guide
---

## 1. Pre-deployment checklist

Before deployment, check the following items.

| Item | What to check |
|---|---|
| **Instructions** | Are the agent's role, goals, and constraints clearly configured? |
| **Knowledge** | Are connected data sources up to date, and are their descriptions meaningful? |
| **Actions** | Are connector/flow authentication settings complete, and is the Flow in the same environment? |
| **Testing** | Have key scenarios been validated in the test panel, and has behavior been checked with Activity Map? |
| **Error messages** | Is an appropriate guidance message configured in the Fallback Topic? |
| **Security** | Is the authentication method appropriate, and is Anonymous access intentional? |

---

## 2. Teams deployment

Microsoft Teams is the **most common deployment channel** for Copilot Studio agents.

> 📖 **Reference**: [Publish and deploy your agent](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/publication-fundamentals-publish-channels)

### 2.1 Publish procedure

1. Click the **Publish** button at the top of Copilot Studio
2. Review the change summary and run **Publish**
3. Confirm the publish completion message

<div class="info-box warning">
<b>⚠️ You must publish for changes to take effect</b><br>
Edits can be <b>checked only in the test panel</b>. Until you publish, the previous version remains in real channels. Most "I changed it, so why didn't it update?" issues are caused by <b>not publishing</b>.
</div>

### 2.2 Teams channel settings

1. Select **Publish tab** → **Channels** → **Microsoft Teams**
2. Enable **Turn on Teams**
3. Click **Open agent** to check the agent in Teams

### 2.3 Teams deployment scope

| Deployment method | Description | Admin approval |
|---|---|---|
| **Individual/link sharing** | Share with individual users through a link | Not required |
| **Team-level** | Install as an app in a specific Teams team | Not required |
| **Company-wide deployment** | Deploy across the organization from Teams Admin Center | **Required** |

For company-wide deployment, select the **"Show to everyone in my org"** option and set the app to **Allowed** in Teams Admin Center. If needed, use **Setup policies** to specify user groups for automatic installation.

---

## 3. Web App deployment

Through the web channel, you can embed an agent in an **external website** or **internal portal**.

1. Select **Publish tab** → **Channels** → **Custom website**
2. Copy the provided **embed code (iframe)**
3. Insert the code into the target website's HTML

<div class="info-box tip">
<b>💡 Practical tip — web deployment security</b><br>
Web channels are divided into <b>public mode</b> (access without authentication) and <b>authenticated mode</b> (requires Entra ID). Agents that handle internal information must use <b>authenticated mode</b>. For external customer-facing deployment, <b>review the authentication method and data exposure scope with the security team in advance</b>.
</div>

### 3.1 Other deployment channels

| Channel | Characteristics | Reference |
|---|---|---|
| **Microsoft 365 Copilot** | Integrates the agent as a plugin inside Copilot Chat | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/microsoft-copilot-extend-copilot-extensions) |
| **Facebook Messenger** | B2C customer engagement | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/publication-fundamentals-publish-channels) |
| **Direct Line API** | Custom app integration | |

---

## 4. Managing usage scope by user/organization

### 4.1 Sharing settings

**Agent-level sharing (edit permission)**:
- **Co-author**: can edit and publish the agent
- **Viewer**: can view agent settings but cannot edit

### 4.2 Management by environment

| Environment type | Purpose | Access scope |
|---|---|---|
| **Development (Dev)** | Agent development and testing | Development team only |
| **Test (UAT)** | User acceptance testing | Development team + business validators |
| **Production** | Real service environment | All users |

<div class="info-box warning">
<b>⚠️ Caution for Knowledge access permissions</b><br>
Even if users can access the agent, if they <b>do not have access permissions to Knowledge sources such as SharePoint, that information is not included in responses</b>. Design appropriate document permissions with this in mind.
</div>

<div class="info-box note">
<b>📌 Next chapter preview</b><br>
Now that you have learned deployment methods, the next <b>Chapter 7</b> covers governance, registration processes, and cautions for operating shared organizational agents.
</div>
