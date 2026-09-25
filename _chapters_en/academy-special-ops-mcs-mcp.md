---
layout: "chapter"
lang: en
date: 2026-08-04
title: "🤖 Microsoft Copilot Studio ❤️ MCP"
short_title: "Copilot Studio + MCP"
description: "A hands-on lab for deploying an MCP server and connecting it to Microsoft Copilot Studio. Deploy a Node.js MCP server locally or to Azure, then integrate it with GitHub Copilot and Copilot Studio."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/mcs-mcp/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-10"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/mcs-mcp/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🤖 Microsoft Copilot Studio ❤️ MCP](https://microsoft.github.io/agent-academy/special-ops/mcs-mcp/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

# 🤖 Microsoft Copilot Studio ❤️ MCP

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/MCP_Joker_Badge.png' | relative_url }}" alt="MCP Joker Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP Joker Badge</figcaption></figure>

Welcome, agent. Your mission — should you choose to accept it — is to deploy an **MCP Server** behind enemy lines and wire it up to **Microsoft Copilot Studio**. Expect turbulence. Trust the protocol. Leave no endpoint unconfigured. 🎯

<div class="info-box note" markdown="1">
**Important**: This mission uses the GitHub Copilot harness
The Copilot Studio steps require an agent powered by the **GitHub Copilot harness**. Turn on **New Experience** before you create the agent. GitHub Copilot in Visual Studio Code is also used separately to test the MCP server.
</div>

## 🎯 Mission objectives

In this mission, you'll learn how to:

- Run an MCP server locally or deploy it to Azure
- Connect and test the MCP server with GitHub Copilot in Visual Studio Code
- Add the MCP server to an agent powered by the GitHub Copilot harness in Copilot Studio
- Remove the Azure resources after completing the mission

## ❓ What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) is an open protocol that standardizes how applications provide context to LLMs, defined by [Anthropic](https://www.anthropic.com/). MCP provides a standardized way to connect AI models to different data sources and tools. MCP allows makers to seamlessly integrate existing knowledge servers and APIs directly into Copilot Studio.

## 🆚 MCP vs Connectors

When do you use MCP? And when do you use connectors? Will MCP replace connectors?

MCP servers are made available to Copilot Studio using connector infrastructure, so these questions are not really applicable. The fact that MCP servers use the connector infrastructure means they can employ enterprise security and governance controls such as [Virtual Network](https://learn.microsoft.com/power-platform/admin/vnet-support-overview) integration, [Data Loss Prevention](https://learn.microsoft.com/power-platform/admin/wp-data-loss-prevention) controls, [multiple authentication methods](https://learn.microsoft.com/connectors/custom-connectors/#2-secure-your-api)—all of which are available in this release—while supporting real-time data access for AI-powered agents.

So, MCP and connectors are really **better together**.

## ⚙️ Prerequisites

- Visual Studio Code installed ([download](https://code.visualstudio.com/download))
- Node v22 (ideally installed via [nvm for Windows](https://github.com/coreybutler/nvm-windows) or [nvm](https://github.com/nvm-sh/nvm))
- Docker installed ([download](http://aka.ms/azure-dev/docker-install))
- Azure Developer CLI installed ([download](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd))
- Azure Subscription (with payment method added)
- Copilot Studio trial or developer account with access to the **GitHub Copilot harness**

<div class="info-box note" markdown="1">
**Important**: GitHub Copilot harness billing
This mission uses the **GitHub Copilot harness in Microsoft Copilot Studio**, which uses usage-based billing. Building, testing in Preview, evaluating, and using the agent might consume **Copilot Credits**. Review the [Copilot Credits billing overview](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/billing-credit-overview) before you begin.
</div>

## 🧪 Lab 1.1 - Set Up the MCP Server

Now you have a choice! You either run the server locally - or you can deploy it to Azure.

There are a couple of steps that you need to do for both:

1. Download the Jokes MCP Server

    Download link: [Download Jokes MCP Server](https://download-directory.github.io/?url=https://github.com/microsoft/agent-academy/tree/main/docs/special-ops/mcs-mcp/source&filename=jokes-mcp-server)

1. Unpack the zip-file

1. Open Visual Studio Code and open the unpacked folder

1. Open the terminal in Visual Studio Code by pressing `ctrl` + `` ` `` (Windows/Linux) or `cmd` + `` ` `` (Mac)

### 🏃‍♀️ Run the MCP Server Locally

1. Run the following command to install the dependencies:

    ```bash
    npm install
    ```

1. Run the following command to build and start the server:

    ```bash
    npm run build && npm run start
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/vscode-terminal-run-start.png' | relative_url }}" alt="Terminal view after building and starting the server" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Terminal view after building and starting the server</figcaption></figure>

1. Select **PORTS** at the top of the Visual Studio Code Terminal

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/vscode-terminal-ports.png' | relative_url }}" alt="Image of VS Code where the terminal is open and the PORTS tab is highlighted" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Image of VS Code where the terminal is open and the PORTS tab is highlighted</figcaption></figure>

1. Select the green **Forward a Port** button

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/vscode-terminal-ports-forward.png' | relative_url }}" alt="Image of VS Code where the PORTS tab is open and the green `Forward a Port` button is highlighted" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Image of VS Code where the PORTS tab is open and the green `Forward a Port` button is highlighted</figcaption></figure>

1. Enter `3000` as the port number (this should be the same as the port number you see when you ran the command in step 5). You might be prompted to sign in to GitHub, if so please do this, since this is required to use the port forwarding feature.

1. Right-click the row you just added and select **Port visibility** > **Public** to make the server publicly available

1. Ctrl + click on the **Forwarded address**, which should be something like: `https://something-3000.something.devtunnels.ms`

1. Select **Copy** on the following pop-up to copy the URL

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/vscode-terminal-ports-setup.png' | relative_url }}" alt="View of the PORTS setup with highlighted the port, the forwarded address and the visibility" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>View of the PORTS setup with highlighted the port, the forwarded address and the visibility</figcaption></figure>

1. Open to the browser of your choice and paste the URL in the address bar, type `/mcp` behind it and hit enter

If all went well, you will see the following error message:

```json
{"jsonrpc":"2.0","error":{"code":-32000,"message":"Method not allowed."},"id":null}
```

Don't worry - this error message is nothing to be worried about!

### 🌎 Deploy to Azure

<div class="info-box note" markdown="1">
**Important**
As listed in the [prerequisites](#prerequisites), the [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd) needs to be installed on your machine for this part.
</div>

Make sure to login to Azure Developer CLI if you haven't done that yet.

```bash
azd auth login
```

<div class="info-box note" markdown="1">
**Warning**
After running `azd up`, you will have an MCP Server running on Azure that is publicly available. Ideally, you don't want that. Make sure to run `azd down` after finishing the lab to delete all the resources from your Azure subscription. Learn how to run `azd down` by going to [this section](#lab-14-remove-the-azure-resources).
</div>

Run the following command in the terminal:

```bash
azd up
```

For the unique environment name, enter `mcsmcplab` or something similar. Select the Azure Subscription to use and select a value for the location. After that, it will take a couple of minutes before the server has been deployed. When it's done - you should be able to go to the URL that's listed at the end and add `/mcp` to the end of that URL.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/azd-deploy-server.png' | relative_url }}" alt="Azd deploy server output" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Azd deploy server output</figcaption></figure>

You should again see the following error:

```json
{"jsonrpc":"2.0","error":{"code":-32000,"message":"Method not allowed."},"id":null}
```

## 🧪 Lab 1.2 - Use the Jokes MCP Server in Visual Studio Code

To use the Jokes MCP Server, you need to use the URL of your server (can be either your devtunnel URL or your deployed Azure Container App) with the `/mcp` part at the end and add it as an MCP Server in Visual Studio Code.

1. Press either `ctrl` + `shift` + `P` (Windows/Linux) or `cmd` + `shift` + `P` (Mac) and type `MCP`

1. Select **MCP: Add Server...**

1. Select **HTTP (HTTP or Server-Sent Events)**

1. Paste the URL of your server in the input box (make sure `/mcp` in the end is included)

1. Press `Enter`

1. Enter a name for the server, for instance `JokesMCP`

1. Select **User Settings** to save the MCP Server settings in your user settings

    This will add an MCP Server to your `settings.json` file. It should look like this:
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/settings.png' | relative_url }}" alt="settings.json file" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>settings.json file</figcaption></figure>

1. Open **GitHub Copilot**

1. Make sure you are in **Agent** mode

1. Make sure the **JokesMCP** server actions are selected when you select the tools icon:

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/tools-menu.png' | relative_url }}" alt="Tools menu in GitHub Copilot" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Tools menu in GitHub Copilot</figcaption></figure>

1. Ask the following question:

    ```text
    Get a chuck norris joke from the Dev category
    ```

This should give you a response like this:

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/github-copilot-get-joke.png' | relative_url }}" alt="Screenshot of question to provide a joke from the dev category and the answer from GitHub Copilot" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Screenshot of question to provide a joke from the dev category and the answer from GitHub Copilot</figcaption></figure>

Now you have added the `JokesMCP` server to Visual Studio Code!

## 🧪 Lab 1.3 - Use the Jokes MCP Server in Microsoft Copilot Studio

To use the Jokes MCP Server in Microsoft Copilot Studio, you need to create an agent and then add it as an MCP server.

### Create an agent and add the MCP server as a tool

1. Go to [Copilot Studio](https://copilotstudio.microsoft.com/)

1. Select the environment picker at the bottom left corner and select the environment you want to use

1. Select **Agents** in the left navigation

1. Select the either the **New Agent** or the **Create your first agent** button (both do the same thing)

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/newagent.png' | relative_url }}" alt="New agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>New agent</figcaption></figure>

    > [!NOTE]
    > This will start creating your agent, usually within 10 seconds your agent will be visible.

1. Now you'll be able to change the name to **Jokester**

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/editname.png' | relative_url }}" alt="Edit name" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Edit name</figcaption></figure>

1. Change the name to:

    ```text
    Jokester
    ```

1. Add the following **Instructions**

    ```text
    You are a joke-telling assistant. Your sole purpose is to deliver appropriate, clever, and engaging jokes upon request. Follow these rules:
    
    * Respond only when the user asks for a joke or something related (e.g., "Tell me something funny").
    * Match the tone and humor preference of the user based on their input—clean, dark, dry, pun-based, dad jokes, etc.
    * Never break character or provide information unrelated to humor.
    * Keep jokes concise and clearly formatted.
    * Avoid offensive, discriminatory, or NSFW content.
    * When unsure about humor preference, default to a clever and universally appropriate joke.
    * Do not repeat jokes within the same session.
    * Avoid explaining the joke unless explicitly asked.
    * Be responsive, witty, and quick.
    ```

1. Select **Save** to save the instructions

1. Select **Tools** in the menu on the right

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/tools.png' | relative_url }}" alt="Tools" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Tools</figcaption></figure>

1. Select **Add** and then **Model Context Protocol MCP**

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/create-mcp.png' | relative_url }}" alt="Create MCP" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create MCP</figcaption></figure>

    This will open a wizard where you can create a new MCP server. You will need to provide the following information:

1. Enter the name:

    ```text
    Jokes MCP Server
    ```

1. Enter the description:

    ```text
    MCP server that fetches Chuck Norris and dad jokes on demand.
    ```

1. Enter the URL of the devtunnel. This should be something like `https://something-3000.something.devtunnels.ms/mcp` or the URL of your deployed MCP server in Azure

1. Select **Add** to create the MCP Server

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/add-mcp.png' | relative_url }}" alt="Creating MCP Server" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Creating MCP Server</figcaption></figure>

    This will take a couple of seconds, because Copilot Studio is now creating a connector behind the scenes.

1. Select **Not connected** (1) and **Create new Connection** (2)

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/create-connection-mcp-create.png' | relative_url }}" alt="Action and connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Action and connection</figcaption></figure>

1. Enter a **display name** (1) if you want and select **Create** (2)

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/create-connection-mcp-create-name.png' | relative_url }}" alt="Create connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create connection</figcaption></figure>

1. Select **Add** to add the MCP Server to the agent

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/create-connection-mcp-create-add.png' | relative_url }}" alt="Add MCP Server to agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add MCP Server to agent</figcaption></figure>

    > [!TIP]
    > This will add your MCP server to the agent.
    >
    > <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/tools-mcp-server.png' | relative_url }}" alt="MCP Server Tools" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP Server Tools</figcaption></figure>

1. Switch from *Build mode* to *Preview mode* by selecting **Preview** in the top middle.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/preview-mode.png' | relative_url }}" alt="Preview mode" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview mode</figcaption></figure>

1. In the Preview mode send the following message:

    ```text
    Can I get a Chuck Norris joke?
    ```
  
    This will show you a message that permission for the agent is required.

1. Select **Allow**

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/connection-allow.png' | relative_url }}" alt="Allow agent to use connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Allow agent to use connection</figcaption></figure>
  
    This will allow the agent to use the MCP server and display a joke.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/joke-result.png' | relative_url }}" alt="Joke result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Joke result</figcaption></figure>

1. Now try the following message:

    ```text
    Can I get a Dad joke?
    ```

    This will now show a Dad joke.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/dad-joke-result.png' | relative_url }}" alt="Dad joke" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Dad joke</figcaption></figure>

And that was the Jokes MCP Server working in Microsoft Copilot Studio.

## 🧪 Lab 1.4 - Remove the Azure Resources

If you have deployed the MCP server to Azure, don't forget to remove the Azure resources. To remove the Azure resources after finishing the lab, run the following command in the terminal:

```bash
azd down
```

This command will show you the resources that will be deleted and then ask you to confirm. Confirm with `y` and the resources will be deleted. This can take a couple of minutes, but at the end you will see a confirmation:

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/azd-down-confirmation.png' | relative_url }}" alt="resources deleted" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>resources deleted</figcaption></figure>

## ✅ Mission Accomplished

Congrats, agent — mission complete! You've built and deployed an MCP server and connected it to both GitHub Copilot and Microsoft Copilot Studio.

In this mission, you accomplished:

✅ **MCP Server Deployment**: Built and deployed a custom MCP server using Node.js and Docker

✅ **Local & Cloud Hosting**: Ran the server locally with port forwarding and deployed to Azure using Azure Developer CLI

✅ **GitHub Copilot Integration**: Connected the MCP server to Visual Studio Code and used it with GitHub Copilot Agent Mode

✅ **Copilot Studio Integration**: Wired the MCP server into a Copilot Studio agent with custom instructions and tool orchestration

## 🏅 Claim your completion badge
<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/MCP_Joker_Badge.png' | relative_url }}" alt="MCP Joker Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP Joker Badge</figcaption></figure>

Congrats, agent — mission accomplished! Now it's time to claim your badge.

Simply submit the badge request form and answer all required questions:

[https://aka.ms/agent-academy-special-ops/mcsmcp/form](https://aka.ms/agent-academy-special-ops/mcsmcp/form)

Once your submission is reviewed, you will receive an email from Global AI Community with instructions to claim your badge.

<div class="info-box tip" markdown="1">
**Tip**
If you do not see the email, check your spam or junk folder.
</div>

## 📚 Tactical Resources

📖 [Microsoft Copilot Studio MCP announcement blog](https://aka.ms/mcsmcp)
  
📖 [Microsoft Copilot Studio MCP docs](http://aka.ms/mcsmcpdocs)
  
📖 [Model Context Protocol overview](https://modelcontextprotocol.io/introduction)
