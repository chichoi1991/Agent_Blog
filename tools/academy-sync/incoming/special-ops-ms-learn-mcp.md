---
tags:
  - mcp
difficulty: 1
time: 15
description: >-
  Connect the Microsoft Learn Docs MCP Server to a Copilot Studio agent for
  real-time documentation access.
badge: ./assets/Academy_LearnMCP_Badge.png
products:
  - copilot-studio
  - microsoft-learn
industries:
  - it
created-date: 2026-03-12
last-edited-date: 2026-03-17
---

# 📚 Microsoft Learn MCP Server {#microsoft-learn-mcp-server}

<mission-meta />

<!-- markdownlint-disable-next-line MD033 -->
<p align="center"><img src="./assets/Academy_LearnMCP_Badge.png" alt="Microsoft Learn MCP Badge" width="220" /></p>

Welcome, agent. This mission is **Operation Open Book** where you'll connect the **Microsoft Learn Docs MCP Server** to a Copilot Studio agent, giving it real-time access to the entire Microsoft Learn documentation library. No more agents responding with outdated or hallucinated product information. Your agent is about to become the most well-read operative in the field.

> [!IMPORTANT] Copilot Studio is rolling out a new authoring experience. The screenshots and steps in this mission use the **new experience**. If your screen looks different, turn on **New Experience** in the upper-right corner before you continue.

## 🔧 What You'll Build {#what-youll-build}

- A Copilot Studio agent connected to the hosted Microsoft Learn Docs MCP Server
- A working MCP connection that surfaces `microsoft_docs_search` and related tools to your agent
- An agent capable of accurately answering questions about any Microsoft product using live documentation

## ⚙️ Prerequisites {#prerequisites}

- Microsoft Copilot Studio trial or paid account. If you don't have an account, check out the [course setup](https://microsoft.github.io/agent-academy/recruit/00-course-setup/) instructions to see how to get a free trial.

> [!NOTE]
> No local tooling required. The Microsoft Learn MCP Server is a **remote, hosted server**. This is one of the easiest ways to get started with MCP in Copilot Studio.

### What is the Microsoft Learn MCP Server?

Think of the Microsoft Learn MCP Server as a **live library card for your agent**. Instead of painstakingly adding individual Microsoft documentation sources as knowledge, you hand the agent a permanent card that lets it walk into the Microsoft Learn library and look anything up — right when a user asks.

The server is openly hosted by Microsoft at:

```text
https://learn.microsoft.com/api/mcp
```

It implements the Model Context Protocol (MCP), an open standard that gives AI models a consistent way to call external tools. Because the Microsoft Learn server is **remote and publicly accessible**, you don't need to write a single line of backend code to use it. You just point Copilot Studio at the endpoint and start querying.

### What can it do?

Once connected, the server exposes tools your agent can invoke during a conversation. The primary tool is `microsoft_docs_search`, which queries the full Microsoft Learn documentation index and returns relevant content. Your agent can use this to:

- Answer questions about Power Platform, Azure, Microsoft 365, and more
- Return links to official, up-to-date documentation pages
- Reduce hallucinations by grounding responses in real Microsoft content

There is also a `microsoft_code_sample_search` tool which browses Learn for relevant sample code to use.

### Why this matters

Without external grounding, agents rely on model memory, which can be outdated. But even adding the Microsoft Learn root URL as static knowledge has limits: it depends on periodic indexing, may miss deep or newly published pages, and does not perform live, intent-based retrieval for each question. The Microsoft Learn MCP Server solves that by letting your agent run real-time documentation searches at response time, so answers are based on the latest relevant pages, including newly released guidance and product updates.

## 🎯 The Scenario {#the-scenario}

Zava is building an internal agent to support employees with Microsoft 365, Azure, and Power Platform questions. Rather than manually curating a knowledge base of Microsoft product docs, the team wants their agent to pull answers directly from Microsoft Learn in real time — always accurate, always current. You are the agent builder tasked with wiring this up.

## 🧪 Lab 1.1 - Create the Support Agent {#lab-11-create-the-support-agent}

The first step is to create a new Copilot Studio agent that will serve as the foundation for your Microsoft Learn-powered support agent.

1. Navigate to [Microsoft Copilot Studio](https://copilotstudio.microsoft.com) and sign in. Ensure that the **New Experience** option is toggled on in the upper right hand corner.

1. Select **Agent** under the **select what you want to build** section on the home page.

    ![Create Agent](./assets/step-01.png)

1. Copy and paste the following in the **Name your agent** value at the top left of the screen.

    ```text
    Microsoft Product Support
    ```

    ![Name your agent](./assets/step-02.png)

1. The agent saves automatically as you build; you can also select **Save** in the top-right toolbar at any time.

## 🧪 Lab 1.2 - Connect the Microsoft Learn Docs MCP Server {#lab-12-connect-the-microsoft-learn-docs-mcp-server}

Next, you'll add the Microsoft Learn Docs MCP Server as a tool in Copilot Studio, making its tools available to your agent.

1. In the right-hand configuration panel, on the **Tools** section, select **+ Add tool**.

    ![Add Tool](./assets/step-03.png)

1. In the **Add a tool** dialog, select the **Model Context Protocol (MCP)** tab and search for `Microsoft Learn`. Select the **Microsoft Learn Docs MCP Server** from the list of options.

    ![Select the MCP server](./assets/step-04.png)

1. If you don't already see a connection, select the **Not connected** dropdown next to **Connection** and select **Create new connection** to create a new connection to the MCP server.

    ![Create new connection](./assets/step-05.png)

1. Select **Create** to create the connection.

    ![Create connection confirm](./assets/step-06.png)

1. Select **Add**.

    ![Add](./assets/step-07.png)

1. Select the **Microsoft Learn Docs MCP Server** tool chip in the **Tools** panel to open the **Edit** dialog. Notice that this server comes with three separate tools — `microsoft_docs_search`, `microsoft_code_sample_search`, and `microsoft_docs_fetch` — and how you can enable and disable which tools the agent may use by toggling them on and off. Select **Confirm**.

    ![Observe the MCP tools](./assets/step-08.png)

## 🧪 Lab 1.3 - Add Instructions {#lab-13-add-instructions}

Now that we have the Learn MCP server added, we need to add instructions for the agent so it knows what it's supposed to do.

1. Select the **Instructions** field on the Build tab and copy and paste the following as the **Instructions**:

    ```text
    You are a helpful Microsoft documentation assistant. When a user asks a question about any Microsoft product, service, or technology, use the microsoft_docs_search tool to find relevant, accurate information from Microsoft Learn. If a user asks a question about a code sample, use the microsoft_code_sample_search tool to find a relevant code sample. Always cite the source documentation URL in your response. If the search does not return a relevant result, tell the user and suggest they visit https://learn.microsoft.com directly.
    ```

![Enter the instructions](./assets/step-09.png)

> [!TIP]
> Strong instructions are critical when using MCP tools. The instruction to "use the microsoft_docs_search tool" explicitly tells the agent to invoke the MCP tool rather than relying on any built-in knowledge you might have added.

1. Select **Save** in the top-right toolbar.

    ![Save](./assets/step-10.png)

## 🧪 Lab 1.4 - Test Your Agent {#lab-14-test-your-agent}

Time to see your Microsoft Learn MCP powered agent in action!

1. Select the **Preview** tab at the top of the agent designer.

    ![Open the Preview tab](./assets/step-11.png)

1. In the Preview chat box (**Ask a question or describe what you need**), send the following message:

    ```text
    What types of agents can I build in Copilot Studio?
    ```

    ![Send a test message](./assets/step-12.png)

1. The first time the agent calls the MCP server, an inline **Permission Required** card appears in the chat. Select **Allow**. The agent connects and continues automatically.

    ![Allow the MCP connection](./assets/step-13.png)

1. Observe the agent's response. It should:
    - Invoke the `microsoft_docs_search` tool from the MCP server and return a grounded answer with a **Citations** section linking to the Microsoft Learn documentation page.

    ![Grounded test result](./assets/step-14.png)

    > [!TIP]
    > The default mode in the Preview section is testing mode which shows you what tools are being called and what the agent is planning. You can toggle on the End User preview mode to mimic what it would look like to the end user.

1. Toggle on the **End user preview** mode to see what it would look like to an end user. Send a follow-up question:

    ```text
    What are the licensing requirements for Copilot Studio?
    ```

    ![New test](./assets/step-15.png)

1. Confirm that the agent again searches Microsoft Learn and returns accurate, cited content.

    ![Follow-up cited result](./assets/step-16.png)

    > [!NOTE]
    > You may notice a brief pause while the agent calls the MCP tool. This is expected since the agent is making a live HTTP call to the Microsoft Learn MCP Server and returning real results.

1. Select **New chat**, toggle **End user preview** back to off and send the following message:

    ```text
    Find a good code sample for creating a PCF control
    ```

    ![New chat](./assets/step-17.png)

1. Notice how this time it calls a different tool in the MCP Server, the `microsoft_code_sample_search` tool, to find a relevant code sample.

    ![Code sample result](./assets/step-18.png)

## 🧪 Lab 1.5 - Test the fallback behavior {#lab-15-test-the-fallback-behavior}

In our instructions, we defined what's called "fallback behavior", meaning, what should happen if the agent can't find an answer. We did this by adding this line to the instruction: ``If the search does not return a relevant result, tell the user and suggest they visit https://learn.microsoft.com directly.``.

Instructions are one way to limit the scope of what your agent should and shouldn't do. We can also adjust the agent settings to control this further. Every agent includes out-of-the-box knowledge from the model that it's using as well as the ability to use information from the web. This can be useful when you want your agent to have vast general knowledge and to perform basic chit chat. But, when you want to make sure your agent is only pulling from the explicit knowledge sources and tools that you configure, this capability could lead to hallucinations and incorrect answers.

Let's remove the web knowledge source so the agent relies only on the Microsoft Learn MCP tools and its instructions.

> [!NOTE]
> In the new Copilot Studio experience, the classic **Use general knowledge** and **Use information from the web** settings toggles no longer exist. Web grounding is now controlled by the **Search all websites** knowledge source on the Build tab, and general model scope is governed through your instructions.

1. On the Build tab, in the **Knowledge** section, remove the **Search all websites** source by selecting its **X** (Remove) to disable web grounding.

    ![Remove the Search all websites source](./assets/step-19.png)

1. Select **Save** in the top toolbar to apply the change.

1. Now it's time to test that your fallback logic is working. Go to the **Preview** tab, select **New chat**, and send the following message:

    ```text
    What is the recipe for chocolate cake?
    ```

    ![Fallback test](./assets/step-20.png)

1. Confirm that the agent responds appropriately, either indicating no relevant Microsoft Learn result was found or redirecting you to Microsoft products and documentation.

    ![Fallback test result](./assets/step-21.png)

## ✅ Mission Accomplished {#mission-accomplished}

Congrats, agent, **Operation Open Book** is complete! Your Copilot Studio agent is now wired to the full Microsoft Learn documentation library through a live MCP connection.

In this mission, you accomplished:

✅ **MCP Fundamentals**: Understood how the Model Context Protocol enables real-time tool access for AI agents  
✅ **Remote MCP Connection**: Registered and connected a hosted MCP server in Copilot Studio without any local deployment  
✅ **Tool Activation**: Enabled MCP-exposed tools on a Copilot Studio agent  
✅ **Instruction Engineering**: Crafted agent instructions that direct MCP tool use and control fallback responses

## 🏅 Claim your completion badge {#claim-your-completion-badge}
<!-- markdownlint-disable-next-line MD033 -->
<p align="center"><img src="./assets/Academy_LearnMCP_Badge.png" alt="Learn MCP Badge" width="220" /></p>

Congrats, agent - mission accomplished! Now it's time to claim your badge.

Simply submit the badge request form and answer all required questions:

[https://aka.ms/agent-academy-special-ops/ms-learn-mcp/form](https://aka.ms/agent-academy-special-ops/ms-learn-mcp/form)

Once your submission is reviewed, you will receive an email from Global AI Community with instructions to claim your badge.

> [!TIP]
> If you do not see the email, check your spam or junk folder.

## 📚 Tactical Resources {#tactical-resources}

🔗 [Microsoft Copilot Studio ❤️ MCP](../mcs-mcp/index.md) — Build and deploy your own custom MCP server and connect it to Copilot Studio

🔗 [Power Platform CLI MCP Server](../pac-cli-mcp/index.md) — Use MCP to control your Power Platform tenant with natural language

📖 [Microsoft Learn MCP Server docs](https://learn.microsoft.com/microsoft-copilot-studio/connections-mcp)

📖 [Model Context Protocol overview](https://modelcontextprotocol.io/introduction)

📖 [Copilot Studio MCP connections](https://learn.microsoft.com/microsoft-copilot-studio/connections-mcp)

<analytics-tag section="special-ops" mission="ms-learn-mcp" />
