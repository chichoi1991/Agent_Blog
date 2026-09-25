---
layout: chapter
lang: en
date: 2026-04-08
title: "Operating shared organizational agents"
short_title: "Shared organizational agents"
description: "Summarizes the differences between personal agents and organizational agents, the organizational agent registration process, and cautions when operating company-wide shared agents."
order: 7
category: guide
---

## 1. Differences between personal agents and organizational agents

| Category | Personal agent | Organizational agent |
|---|---|---|
| **Purpose** | Improve individual work productivity | Support common work for teams, departments, or the whole company |
| **Author** | Individual (citizen developer) | Dedicated team or designated owner |
| **Management environment** | Personal/default environment | **Dedicated production environment** |
| **Knowledge** | Personal documents, small-scale data | Official internal documents and policies |
| **Deployment scope** | Self or shared with a small group | Specific department or entire organization |
| **Governance** | Loose | Strict approval/review process |
| **Maintenance** | The author | Dedicated operations team (IT/CoE) |

> 📖 **Reference**: [Copilot Studio governance principles](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/copilot-studio-experience#copilot-studio-governance-principles)

---

## 2. Organizational agent registration process

### 2.1 Recommended steps

```
1. Define and plan requirements → target work, users, Knowledge, success criteria (KPI)
2. PoC / prototype → implement core scenarios in the development environment + pilot testing
3. Internal review and approval → IT/security team, legal/compliance, admin approval
4. Deploy to production environment → move to Production environment, register in Teams Admin
5. Announce and train → internal announcement, distribute usage guide
6. Operational monitoring → use Analytics, review unanswered questions, continuously improve
```

---

## 3. Governance checklist

These are items you must check when operating shared organizational agents.

| Area | Checklist item | Reference |
|---|---|---|
| **Environment separation** | Manage Dev / Test / Prod environments separately | [Learn](https://learn.microsoft.com/ko-kr/power-platform/admin/environments-overview) |
| **Least privilege** | Grant agent edit permission (Maker) only to the minimum number of people | |
| **DLP policies** | Control connector usage and configure blocking for external data exfiltration | [Learn](https://learn.microsoft.com/ko-kr/power-platform/admin/wp-data-loss-prevention) |
| **Sensitive data control** | Agent access can be blocked based on MIP (Sensitivity Label) | |
| **Enforce authentication** | Prohibit Anonymous authentication; require Entra ID-based authentication | |
| **Clarify licensing/billing** | Distinguish Copilot Credits vs PA Premium paths | See Ch1 |
| **Audit logs** | Integrate Microsoft Purview Audit Log + Sentinel | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/analytics-overview) |
| **ALM** | Solution-level packaging, export/import between environments | |
| **Change management** | Review → approve → publish process when changing instructions or Knowledge | |

<div class="info-box tip">
<b>💡 Practical tip — start with one business area</b><br>
When first adopting a shared organizational agent, focus on <b>one business area</b>. An <b>"agent that reliably handles a specific task"</b> earns user trust faster than an "agent that solves everything." The most effective strategy is to create a success case first, then expand to other business areas.
</div>

---

## 4. Examples of using organizational agents

### 4.1 Example: HR guide agent

| Item | Configuration |
|---|---|
| **Role** | Agent specializing in HR policy guidance |
| **Knowledge** | HR policy documents, benefits guides, employment rules in SharePoint |
| **Main topics** | How to request annual leave, business trip expense settlement, benefits inquiries |
| **Actions** | Check remaining annual leave (HR system API), request congratulations/condolences support (Power Automate) |
| **Deployment channel** | Teams (company-wide deployment) |

### 4.2 Example: IT help desk agent

| Item | Configuration |
|---|---|
| **Role** | Agent for receiving IT incidents/requests and guiding self-resolution |
| **Knowledge** | IT FAQs, manuals, installation guides in SharePoint |
| **Main topics** | Password reset, VPN connection, printer setup, equipment request |
| **Actions** | Create IT ticket (ServiceNow API), request password reset (Power Automate) |
| **Deployment channel** | Teams (company-wide) + internal portal (web embed) |

### 4.3 Monitoring — Application Insights integration

When operating large-scale agents, you can connect **Application Insights** in addition to the default Analytics to collect more detailed logs.

- **Conversation logs**: track user questions, agent responses, and used Knowledge/actions
- **Performance monitoring**: response time, Flow execution time, external API latency
- **Audit support**: retain conversation history needed for security/compliance audits

<div class="info-box note">
<b>📌 Next chapter preview</b><br>
We learned how to operate organizational agents. In the final <b>Chapter 8</b>, we summarize official documentation links for reference and future architecture extension directions.
</div>
