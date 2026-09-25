---
layout: chapter
lang: en
date: 2026-08-05
title: "Lab WIQ01 — Work IQ setup and CLI usage"
short_title: "WIQ01 · Setup and CLI"
description: "Enable Work IQ in your tenant, configure a Copilot Credits billing profile, install and query with the Work IQ CLI, and connect GitHub Copilot CLI and Entra ID app registration."
order: 4
category: m365
tags: ["Work IQ", "CLI", "GitHub Copilot", "Entra ID", "MCP"]
---

<div class="info-box note" markdown="1">

**▶ One-line summary** — Create the Work IQ service principal in your tenant (one time), turn on a Copilot Credits billing profile, install the CLI with `npm i -g @microsoft/workiq`, and query with `workiq ask`. Then connect the Work IQ plugin to GitHub Copilot CLI and register an Entra ID app for programmatic consumption.

**Level** 200 · **Duration** about 75 minutes · **Badge** WorkIQ-Expert
</div>

> **Translated article** — This article is based on **Lab WIQ01** from Microsoft official [Copilot Developer Camp](https://microsoft.github.io/copilot-camp/pages/work-iq/01-work-iq-setup-and-cli/). For concepts, read [Introducing Work IQ]({{ '/en/chapters/m365-3-work-iq-overview/' | relative_url }}) first.

Work IQ is a workplace intelligence layer that lets agents and developers **securely access and reason over** Microsoft 365 organizational data. In this lab, you will set up Work IQ in a tenant, explore CLI consumption, integrate with GitHub Copilot CLI, and register an application for programmatic access.

## Scenario

You are a developer responsible for enabling your organization to use Work IQ through various consumption patterns. You need to set up the infrastructure, validate CLI access, integrate GitHub Copilot CLI, and prepare programmatic consumption through a registered application.

## Lab goals

By the end of this lab, you will be able to:

- Enable Work IQ in a Microsoft 365 tenant
- Configure a **Copilot Credits billing profile** for usage-based AI services
- Install and configure the **Work IQ CLI**
- Connect **GitHub Copilot CLI** to Work IQ
- Register an **Entra ID application** for secure API consumption

---

## Exercise 1: Enable the Work IQ API in your tenant

The Work IQ API requires organization-wide enablement through **service principal registration** in Entra ID.

### Step 1: Prepare prerequisites

Before enabling Work IQ, make sure you have the following:

- A **usage-based billing plan** configured in the tenant (see Step 4 below)
- **Global Administrator** or **Privileged Role Administrator** permissions in the Microsoft Entra tenant
- The Work IQ service principal ID: `fdcc1f02-fc51-4226-8753-f668596af7f7`

### Step 2: Create the Work IQ service principal

The easiest approach is to use Graph Explorer.

1. Go to [Graph Explorer](https://aka.ms/ge) and sign in with an admin account
2. Change the HTTP method to **POST**
3. Set the URL to `https://graph.microsoft.com/v1.0/servicePrincipals`
4. Select **Modify permissions** and consent to `Application.ReadWrite.All` (one-time admin task)
5. Paste the following request body

    ```json
    {
      "appId": "fdcc1f02-fc51-4226-8753-f668596af7f7"
    }
    ```

6. Click **Run query** and confirm the **201 Created** response

**Alternative (Azure CLI):**

```bash
az ad sp create --id fdcc1f02-fc51-4226-8753-f668596af7f7
```

### Step 3: Confirm tenant readiness

After you create the service principal, your tenant is ready to use Work IQ. Remember:

- Service principal creation is a **one-time organization-wide** task
- Now **all users** in the tenant can authenticate and use Work IQ
- Billing is **usage-based** according to the configured plan

### Step 4: Configure a Copilot Credits billing profile

<div class="info-box warning" markdown="1">

**Important** — A **Microsoft 365 Copilot license** and an **active Copilot Credits billing profile** are **required prerequisites** for consuming usage-based AI services such as Work IQ and Cowork. A billing profile enables pay-as-you-go or prepaid credit consumption.
</div>

The Copilot Credits billing setup process is as follows:

1. Go to the [Microsoft 365 admin center](https://go.microsoft.com/fwlink/p/?linkid=2024339)
2. Go to **Copilot → Cost Management**
3. Select **Get Started** to enable usage-based billing
4. The **Activate the default spending policy for your organization** panel opens
5. **Choose a billing method:**
    - **Use existing Azure subscription** (recommended) — select a subscription from the dropdown. If prepaid Copilot Credits (P3) are linked, they are labeled and **consumed first**.
    - **Create a new Azure subscription** — if there is no Azure subscription, the system creates one for you (global admin required).
    - **Purchase prepaid credits** — optionally purchase Copilot Pre-Purchase Plan (P3) credits at a discounted rate
6. **Set spending limits:**
    - For unlimited use, choose **Don't limit monthly spending**; for budget control, choose **Limit monthly spending**
    - You can also set a **monthly limit per user** to prevent excessive individual consumption
7. **Define notifications:** choose email recipients and notification thresholds (weekly alerts when approaching limits)
8. **Review and activate:** the default policy applies to the entire tenant. Complete with **Activate**, then check the Cost Management dashboard under **Manage Configuration**.

Your organization is now ready to consume usage-based AI services such as Work IQ and Cowork. Charges are billed to the selected Azure subscription based on consumption, and prepaid credits are applied first if available.

**Note:** For detailed cost management and policy customization, see [Copilot Credits usage-based billing and cost management](https://learn.microsoft.com/microsoft-365/copilot/usage-based-billing-overview-copilot-credits).

---

## Exercise 2: Install and use the Work IQ CLI

The Work IQ CLI lets you query Microsoft 365 data directly from the terminal.

### Step 1: Install Work IQ

Choose one installation method.

**Option A: npm (recommended for global use)**

```bash
npm install -g @microsoft/workiq
```

Update: `npm update -g @microsoft/workiq`

**Option B: via GitHub Copilot CLI**

```bash
copilot
/plugin marketplace add github/copilot-plugins
/plugin install workiq@copilot-plugins
```

**Option C: npx (no installation required)**

```bash
npx -y @microsoft/workiq
```

### Step 2: Accept the EULA

Before your first query, accept the End User License Agreement. Run the following in your terminal.

```bash
workiq accept-eula
```

This is a **one-time per-user** task.

### Step 3: Run your first query

Run your first Work IQ CLI query against your personal context.

```bash
workiq ask -q "Who am I? What is my role in the company?"
```

Work IQ returns personalized information from the Microsoft 365 tenant, demonstrating **permission-aware, safe data access**. Try a few other queries as well.

```bash
workiq ask -q "When is my next meeting?"
workiq ask -q "Summarize my recent emails from the engineering team"
```

### Step 4: Use interactive mode

For multi-turn conversations, use interactive mode.

```bash
workiq ask
```

This starts an interactive prompt where you can ask follow-up questions.

```text
> What meetings do I have this week?
> Tell me more about the one at 2 PM.
> Who is attending from the client side?
```

---

## Exercise 3: Integrate with GitHub Copilot

Access Work IQ data from GitHub Copilot (CLI or VS Code) through **MCP (Model Context Protocol)**.

### Step 1: Prepare GitHub Copilot CLI

If it is not installed yet, install GitHub Copilot CLI by following the [official documentation](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli).

Start Copilot CLI.

```bash
copilot
```

If you see a sign-in prompt, run:

```bash
/login
```

### Step 2: Add the Work IQ plugin marketplace

Run the one-time setup command.

```bash
/plugin marketplace add microsoft/work-iq
```

The Work IQ plugin marketplace is registered in the Copilot CLI instance.

### Step 3: Install the Work IQ plugin

```bash
/plugin install workiq@work-iq
```

Follow the on-screen prompts; the browser popup will show **Authorization Successful**.

### Step 4: Validate the integration

Check that the Work IQ MCP server is loaded.

```bash
/mcp show
```

`workiq` should appear with the endpoint `https://workiq.svc.cloud.microsoft/mcp`. Press `ESC` to exit.

Check the available skill as well.

```bash
/skills info workiq
```

You should see details for the `workiq` skill.

### Step 5: Query Microsoft 365 with Copilot

Now ask Copilot to query Microsoft 365 data through Work IQ.

```text
Summarize my upcoming meetings for today.
```

```text
Find recent messages about the Contoso account.
```

```text
Retrieve the latest email related to the quarterly business review.
```

Copilot CLI automatically calls the Work IQ MCP tools, and the results **comply with Microsoft 365 permissions and tenant policies**. Depending on the size of the output returned by Work IQ, you may need to approve data processing or multiple request execution.

---

## Exercise 4: Register an Entra ID application for API consumption

To consume Work IQ programmatically from your own application through REST, A2A, or MCP, register a consumer application in Entra ID.

### Step 1: Create an app registration

1. Go to the [Azure Portal](https://portal.azure.com/)
2. Go to **Microsoft Entra ID → App registrations → New registration**
3. Set the name to `Work IQ Consumer`
4. Under **Supported account types**, select **Accounts in this organizational directory only (single tenant)**
5. Click **Register**

### Step 2: Configure a client secret

1. In the new app registration, go to **Certificates & secrets → Client secrets → New client secret**
2. Enter a description (for example, `Client Secret`)
3. Choose an expiration period (for example, 12 months)
4. Click **Add**
5. **Immediately copy the secret value and store it somewhere safe** — you cannot see it again after leaving the page

### Step 3: Add API permissions

1. Go to **API permissions → Add a permission**
2. Select the **APIs my organization uses** tab
3. Search for `Work IQ`
4. Select **Delegated permissions**
5. Check the **WorkIQAgent.Ask** permission
6. Click **Add permissions**

### Step 4: Grant admin consent

The `WorkIQAgent.Ask` permission requires admin consent.

1. On the **API permissions** page, click **Grant admin consent for `<tenant>`**
2. Confirm with **Yes** in the dialog
3. Verify that **WorkIQAgent.Ask** shows a green check mark ✓

### Step 5: Collect credentials for API consumption

On the app registration's **Overview** page, collect the following values (used for REST, A2A, and MCP consumption).

| Value | Location |
|----|------|
| **TENANT_ID** | Directory (tenant) ID |
| **CLIENT_ID** | Application (client) ID |
| **CLIENT_SECRET** | Secret value saved earlier |
| **AUTHORIZATION_URL** | OAuth 2.0 authorization endpoint (v2) |
| **TOKEN_RETRIEVAL_URL** | OAuth 2.0 token endpoint (v2) |

The two URLs are available from the **Endpoints** command on the **Overview** page.

<div class="info-box warning" markdown="1">

**Security note** — Store client secrets in a secure configuration management system such as Azure Key Vault. Never commit them to source code or a repository.
</div>

### Step 6: Configure redirect URIs (optional)

If you plan to use the OAuth 2.0 authorization code flow:

1. Go to **Authentication → Add a platform → Web**
2. Enter the application callback URL in **Redirect URI** (for example, `https://myapp.example.com/callback`)
3. Also register `https://microsoft.github.io/copilot-camp/` as a callback URL
4. Click **Configure**

---

## 🎉 Complete

Congratulations! You successfully completed the following:

- ✅ Enabled Work IQ in a Microsoft 365 tenant
- ✅ Installed the Work IQ CLI and queried data
- ✅ Integrated GitHub Copilot with Work IQ (workplace context)
- ✅ Registered an Entra ID application for programmatic access

You are now ready to:

- Build **custom agents** that consume Work IQ data
- Develop web applications using the Work IQ **REST API**
- Implement agent-to-agent workflows using the **A2A protocol**
- Extend third-party tools with **Work IQ MCP** integrations

👉 [Lab WIQ02 — Consume Work IQ with the A2A protocol]({{ '/en/chapters/m365-5-work-iq-a2a/' | relative_url }})

---

## 📚 References

- 📖 [Copilot Credits usage-based billing and cost management](https://learn.microsoft.com/microsoft-365/copilot/usage-based-billing-overview-copilot-credits)
- 📖 [How to use GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- 🏕️ [Original: Copilot Developer Camp — Lab WIQ01](https://microsoft.github.io/copilot-camp/pages/work-iq/01-work-iq-setup-and-cli/)
