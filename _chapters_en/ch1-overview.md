---
layout: chapter
lang: en
date: 2026-04-08
title: "Copilot Studio overview and access"
short_title: "Overview and access"
description: "Explains how to access Copilot Studio, required licenses and billing structure, and how it differs from similar services from a practical perspective."
order: 1
category: guide
---

## 1. What is Copilot Studio?

Microsoft Copilot Studio is a **graphical low-code tool for building AI agents**. Through an intuitive drag-and-drop interface, you can create conversational AI agents and Agent Flows (automation workflows).

> One-line summary: **"Copilot Studio is a tool for quickly productizing agents."** Its role is different from an AI engine (Azure Foundry) or system implementation (SI).

> 📖 **Reference**: [Copilot Studio overview](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/fundamentals-what-is-copilot-studio)

### 1.1 Key characteristics

| Characteristic | Description |
|---|---|
| **Agent creation and customization** | Build AI-powered agents and customize them for your organization's tone, workflows, and business rules |
| **Low-code + pro-code flexibility** | Start with intuitive low-code tools, then extend with APIs, custom connectors, and scripts |
| **Microsoft ecosystem integration** | Seamless integration with Teams, Power Platform, and Microsoft Graph |
| **External system connections** | Integrate with third-party systems through more than 1,000 connectors and APIs |
| **Triggers and autonomous agents** | Automatically perform tasks in response to events such as new records or customer inquiries |
| **Context retention** | Maintain previous conversation context to provide consistent responses |
| **Extensibility** | Extend functionality with custom plugins, connectors, and advanced logic |

> 📖 **Reference**: [Copilot Studio application card – Key features](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/system-service-card-copilot-studio#key-features-or-capabilities)

### 1.2 AI models used

Copilot Studio uses a variety of AI models to provide agent experiences.

- **OpenAI GPT series** (provided by Azure OpenAI Service)
- **Anthropic Claude Sonnet** family (can be allowed or blocked by organizational policy)
- **xAI Grok** family (can be allowed or blocked by organizational policy)

When creating an agent, you can **select the default model**, and performance and response characteristics vary by model. Microsoft does not use customer data to train foundation models.

> 📖 **Reference**:<br> 
> [Check which language models you can use by region](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-select-agent-model#model-availability-by-region)

<div class="info-box note">
<b>📌 Billing caution when using reasoning models</b><br>
When you use reasoning models (advanced reasoning), the base feature charge and the <b>Text and generative AI tools (premium)</b> charge are both applied. Example: using a reasoning model for Generative Answers = 2 credits (generative answer) + 100 credits (premium AI tool) = 102 credits total.
— <em><a href="https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/requirements-messages-management#reasoning-model-billing-rates" target="_blank">Learn: Reasoning model billing rates</a></em>
</div>

---

## 2. How to access Copilot Studio

Copilot Studio is a cloud service that you can access directly from a web browser.

| Item | Details |
|---|---|
| **Access URL** | [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com) |
| **Supported browsers** | Microsoft Edge, Google Chrome, Firefox (latest versions recommended) |
| **Sign-in account** | Your organization's Microsoft 365 / Entra ID account |
| **Preview site** | [copilotstudio.preview.microsoft.com](https://copilotstudio.preview.microsoft.com/) |

### 2.1 Differences by access method

| Access method | Purpose | Characteristics |
|---|---|---|
| **Web app** (copilotstudio.microsoft.com) | IT admins, agent builders | Full functionality, advanced configuration, use of entities/variables |
| **VS Code extension** | Developers | Edit agents in a local development environment, YAML-based |

Important! The Copilot Studio app inside the Teams app is a legacy feature that is not provided in Korea by default. For agent development, make sure to use the web app.

> 📖 **Reference**: [VS Code extension for Copilot Studio](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/visual-studio-code-extension-overview) · [Quickstart guide](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/nlu-gpt-quickstart)

<div class="info-box warning">
<b>⚠️ Things to check before access</b><br>
<ul>
<li>You must sign in with your organization's <b>Entra ID (formerly Azure AD)</b> account. You cannot access it with a personal Microsoft account such as @outlook.com or @hotmail.com.</li>
<li>Check that Power Platform-related URLs such as <b>*.powerva.microsoft.com</b> and <b>*.directline.botframework.com</b> are not blocked on the organization's network. Conflicts with Conditional Access / Proxy / MDCA are common.</li>
</ul>
</div>

> 📖 **Reference**: [Required services and network URLs](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/requirements-quotas#required-services)

---

## 3. Access permissions and licenses

### 3.1 License types

To use Copilot Studio, you need the appropriate license.

| License | Description | Included | Main audience |
|---|---|---|---|
| **Microsoft 365 Copilot** | Includes rights to use Copilot Studio with M365 Copilot | Free use for B2E scenarios | Organizations adopting Copilot |
| **Standalone Copilot Studio license** | Purchased per tenant, includes 25,000 credits/month | Default Dataverse capacity (5 GB DB + 20 GB file + 2 GB log) | Organizations building dedicated agents |
| **Copilot Studio User license** | Free per-user license | Agent authoring (Maker) permission | Citizen developers |
| **Trial** | Free for 60 days | No functional restrictions | PoC / testing |
| **PAYG (Pay-As-You-Go)** | Connects to an Azure subscription and bills for usage | Automatically handles excess credits | When flexible billing is needed |

> 📖 **Reference**: [Copilot Studio licensing](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/billing-licensing) · [Power Platform licensing FAQ](https://learn.microsoft.com/ko-kr/power-platform/admin/powerapps-flow-licensing-faq#microsoft-copilot-studio)

### 3.2 Permission structure

| Role | Permissions | Audience |
|---|---|---|
| **Environment Admin** | Environment settings, user management, agent deployment, DLP policies | IT admins |
| **Environment Maker** | Agent creation and editing, topic/action configuration, publishing | Citizen developers, business owners |
| **User** | Uses deployed agents | End users (employees, customers) |

- **Security structure**: Entra ID-based authentication, Dataverse security roles, and AAD security group-based access restrictions are applied.
- **Environment**: Copilot Studio runs on Power Platform environments, and agents are created and managed per environment.

> 📖 **Reference**: [Assign licenses and manage access](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/requirements-licensing)

<div class="info-box tip">
<b>💡 Practical tip — "authoring permission" and "usage billing" are separate</b><br>
<ul>
<li><b>Permission to create agents</b>: Copilot Studio User license (free) or Maker role</li>
<li><b>Billing when using agents</b>: Copilot Credits-based (free for B2E use by M365 Copilot users)</li>
</ul>
If you do not explain these two separately, people may misunderstand and ask, "If I have a license, isn't everything free?"
</div>

---

## 4. Billing structure details (Copilot Credits)

### 4.1 What are Copilot Credits?

**Copilot Credits** are the common billing unit for Copilot Studio. Credit consumption varies depending on the type of work an agent performs. Starting in September 2025, the billing unit changed from the previous "messages" unit to "Copilot Credits."

> 📖 **Reference**: [Billing rates and management](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/requirements-messages-management)

### 4.2 Credit consumption by feature
> As of April 7, 2026. For details, check the official reference document above.

| Agent behavior | Credits consumed | M365 Copilot users | Description |
|---|---|---|---|
| Classic Answer (predefined answer) | **1 credit** | ✅ Free | FAQ, fixed responses |
| Generative Answer (LLM-based generated answer) | **2 credits** | ✅ Free | GPT-based dynamic answers |
| Agent Action (agent task execution) | **5 credits** | ✅ Free | Flow calls, connector execution |
| Tenant Graph Grounding | **10 credits** | ✅ Free | M365 Graph-based RAG |
| Agent Flow execution (based on 100 actions) | **13 credits** | ✅ Free | Power Automate Flow |
| AI Tool – basic (10 responses) | **1 credit** | ✅ Free | Text generative |
| AI Tool – standard (10 responses) | **15 credits** | ✅ Free | Intermediate AI tool |
| AI Tool – premium (10 responses) | **100 credits** | ✅ Free | Reasoning models, etc. |
| Content Processing Tool (per page) | **8 credits** | ✅ Free | Document processing |

**Composite billing example**: Tenant Graph Grounding + Generative Answer combination = **12 credits** consumed (10 + 2)

> 💡 **Credit cost reference**: PAYG basis: **1 Copilot Credit = $0.01 USD**
>
> 📖 **Reference**: [Copilot Credits billing rates](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/requirements-messages-management#copilot-credits-billing-rates) · [Agent usage estimator](https://microsoft.github.io/copilot-studio-estimator/)

### 4.3 Free usage conditions for M365 Copilot users

When users with an M365 Copilot license use a Copilot Studio agent, under certain conditions they can **use it for free without consuming credits**.

**✅ Conditions for free usage (all must be met):**

| Condition | Required | Description |
|---|---|---|
| Has an M365 Copilot license | ✅ | The agent **user** has the license |
| Entra ID authentication | ✅ | The agent's authentication method is Entra ID-based |
| User is a person | ✅ | A real user, not a system account |
| Employee-facing (B2E) scenario | ✅ | Work for internal employees |
| Within Fair Use scope | ✅ | Reasonable usage scope defined by Microsoft |

**❌ Cases where free usage does not apply:**
- **Anonymous** or **Custom Token** authentication
- Cases where the M365 Copilot **User Identity cannot be verified**
- **B2C** (customer-facing) scenarios
- Automated execution based on a **system account** (schedule/trigger-based)
- **Autonomous/non-interactive** work

<div class="info-box tip">
<b>💡 One-line summary of billing</b><br>
The essence of billing is <b>"who uses it (user vs system), how it is used (conversation vs automation), and with what authentication (Entra ID vs Anonymous)."</b> Copilot-based work that a person uses directly has a broad free scope, but billing starts when the system does work on that person's behalf.
</div>

### 4.4 Relationship between Power Automate flows and billing

When you use Power Automate flows in Copilot Studio, the billing criteria change.

| Before (Power Automate flow) | After (Copilot Studio Agent Flow) |
|---|---|
| Power Automate Cloud Flow | Copilot Studio **Agent Flow** |
| Based on PA Premium / User license | **Copilot Credits**-based billing |
| Premium connector license required | Premium connectors can be used with credits |

**Key cautions:**
- If you **change a Cloud Flow to the Copilot Studio Plan**, it leaves PA license evaluation and moves to the Copilot Studio meter.
- In this case, you can use premium connectors without a separate PA Premium license, but they are **charged against Copilot Credits**.


<div class="info-box warning">
<b>⚠️ Caution! This setting cannot be reverted!</b><br>
A flow changed to the Copilot Studio Plan <b>cannot be reverted to a User/Process license</b>. <br> If needed, you must recreate the flow from scratch. Be sure to check the impact before changing it.
</div>

### 4.5 Credit monitoring and overage management

| Feature | Description | Reference |
|---|---|---|
| **Check consumption** | Power Platform Admin Center → Licensing → Copilot Studio | [Learn](https://learn.microsoft.com/ko-kr/power-platform/admin/manage-copilot-studio-messages-capacity) |
| **Set limits per agent** | Monthly credit caps can be set for individual agents | Admin Center → Manage Agents |
| **Overage behavior** | When prepaid credits are exhausted → automatic transition to PAYG (requires Azure subscription connection and explicit configuration) | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/requirements-messages-management#overage-enforcement) |
| **Agent Flow overage** | New executions are blocked when credits are exhausted (the agent itself is not disabled) | |
| **Usage estimation** | Use the Agent Usage Estimator tool | [Estimator](https://microsoft.github.io/copilot-studio-estimator/) |

<div class="info-box tip">
<b>💡 Practical tip — cost management strategy</b><br>
<ul>
<li><b>Use the estimator</b>: Before deploying an agent, be sure to check expected consumption with the <a href="https://microsoft.github.io/copilot-studio-estimator/" target="_blank">Microsoft Copilot Studio agent usage estimator</a>.</li>
<li><b>Set limits per agent</b>: For company-wide deployment, set monthly credit caps per agent to prevent unexpected cost spikes.</li>
<li><b>PAYG safety net</b>: If you configure both prepaid credit packs and PAYG (Azure subscription), the service will not stop even when credits are exhausted.</li>
<li><b>Watch Dataverse shadow cost</b>: Uploading files as Knowledge sources consumes Dataverse storage. For company-wide PoCs, be sure to check environment/capacity guidance.</li>
</ul>
</div>

---

## 5. Differences between Copilot Chat / Agent Builder / Copilot Studio

Microsoft provides a variety of AI and automation tools. "Which tool should we use?" is one of the most common questions in practice.

### 5.1 Tool comparison table

| Category | Copilot Chat (BizChat) | Agent Builder (inside M365) | Copilot Studio |
|---|---|---|---|
| **Purpose** | Daily work assistance (search, summarize, draft) | Fast, simple agent creation | Specialized conversational agent building |
| **Users** | All employees | Individuals/small teams | Citizen developers / developers |
| **Interface** | Chat (integrated into M365 apps) | Simple natural-language builder | Conversation flow designer (graphics + YAML) |
| **Key capabilities** | Document summaries, email drafting, Q&A | Knowledge connection, basic instructions | Topics, Knowledge, actions, triggers |
| **Action/Flow** | ❌ Not available | ❌ Not available | ✅ Available |
| **External API integration** | ❌ Not available | ❌ Not available | ✅ Available |
| **Customization** | Limited (prompt level) | Instructions + Knowledge | Full control of agent logic |
| **Deployment targets** | Inside M365 apps | Inside M365 Copilot | Teams, web, many custom channels |
| **Governance** | M365 administration | Basic | Environment management, DLP, analytics, audit logs |
| **Additional billing** | None | None | Credit-based (B2E free usage possible) |
| **AI model selection** | Provided by default | Provided by default | GPT, Claude, Grok, and others selectable |

> 📖 **Reference**: [Choose between Microsoft 365 Copilot and Copilot Studio](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/copilot-studio-experience) · [Copy agent to Copilot Studio](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/copy-agent-to-copilot-studio)

### 5.2 Key decision criteria

> **"If you only need to find information → Agent Builder; <br> if you want it to actually perform work (actions) or act directly depending on the situation → Copilot Studio."**

| Scenario | Recommended tool | Reason |
|---|---|---|
| "I want employees to quickly find and summarize documents" | **Copilot Chat** | Automatically integrated into M365 apps, no separate build required |
| "I personally want to quickly create an internal policy FAQ agent" | **Agent Builder** | Created directly with natural language, minimal setup |
| "It needs to take user input and send emails or register data in a system" | **Copilot Studio** | Action/Flow integration required |
| "It needs to call external APIs or connect custom connectors" | **Copilot Studio** | Only Studio supports external integration |
| "We need to formally deploy and manage an agent across the organization" | **Copilot Studio** | Built-in governance, analytics, and environment management |

### 5.3 Extending Agent Builder to Copilot Studio

Agent Builder is a tool for **quickly creating simple agents**, but when advanced capabilities are needed, you can extend it by using **Copy to Copilot Studio**.

Advanced capabilities available after copying:
- **Enhanced lifecycle management**: version control, staged deployment, rollback
- **Usage monitoring and analytics**: user engagement, query trends, performance insights
- **Governance controls**: role-based access, DLP policies, compliance
- **Environment management**: separation of development/test/production environments
- **Audit and compliance**: audit trails, compliance reporting
- **Organizational deployment**: publish to Teams app store, company-wide deployment through admin approval

<div class="info-box tip">
<b>💡 Practical tip — a phased approach is recommended</b><br>
Do not start with complex Copilot Studio work from the beginning. The most effective approach is to <b>quickly prototype with Agent Builder</b>, check user reactions, and then <b>extend to Copilot Studio</b> when more functionality is needed. "Start quickly → expand gradually" is a strategy proven in practice.
</div>

---

## 6. Ways to use agents

Agents created with Copilot Studio are used in two main ways.

### 6.1 1. Standalone agents

These agents **converse directly with users** in channels such as websites, Teams, and Facebook.

**Usage examples:**
- **Customer support**: order tracking, returns processing, automated FAQ answers
- **Internal FAQ**: HR policy guidance, IT manuals, benefits inquiries
- **IT help desk**: password resets, VPN connection, equipment requests
- **Business automation**: approval requests, email sending, data registration

> 📖 **Reference**: [Intended uses of Copilot Studio](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/system-service-card-copilot-studio#intended-uses)

### 6.2 2. Microsoft 365 Copilot extension

Integrate with M365 Copilot as a **plugin/extension agent** to add your organization's specialized knowledge and capabilities to the existing Copilot experience.

```
Example: An employee asks in Copilot Chat,
    "Tell me about our company's annual leave policy"
    → the connected HR Agent answers based on HR documents in SharePoint
```

> 📖 **Reference**: [Extend Microsoft 365 Copilot with agents](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/microsoft-copilot-extend-copilot-extensions)

### 6.3 3. Agent-to-agent integration (multi-agent)

Agents can not only be used directly, but also **provided as tools to other agents**.

```
[User] → [Integrated business agent]
               ├─ HR-related questions → call [HR Agent]
               ├─ IT-related questions → call [IT Agent]
               └─ Expense-related questions → call [Finance Agent]
```

Through this architecture, you can manage domain-specific expert agents independently while still providing users with a single integrated entry point.

<div class="info-box note">
<b>📌 Next chapter preview</b><br>
In this chapter, we covered what Copilot Studio is, how to access it, and how billing works. In the next <b>Chapter 2</b>, we will look one by one at the <b>screen layout</b> and core concepts (Agents, Topics, Knowledge, Actions) you see when you access Copilot Studio.
</div>
