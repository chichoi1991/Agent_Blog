---
layout: "chapter"
lang: en
date: 2026-11-12
title: "Call Microsoft Copilot Harness Agents from Other Copilot Studio Agents with MCP and A2A"
short_title: "Connect Agents with MCP and A2A"
description: "Connect Standard agents over MCP and Microsoft Copilot harness agents over A2A, including OBO sign-in."
order: 22
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/"
source_author: "ssivaraman"
source_published: "2026-11-12"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [Call Microsoft Copilot Harness Agents from Other Copilot Studio Agents with MCP and A2A](https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/) by ssivaraman (@ssivaraman) on [The Custom Engine](https://microsoft.github.io/mcscatblog/) (2026-11-12). The original wording takes precedence.
</div>

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/header.png' | relative_url }}" alt="A Microsoft Copilot harness agent connected through MCP and A2A" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"></figure>

You've got standard Copilot Studio agents in production. They work, people use them, and nobody wants to rebuild them. Meanwhile, your new agents are being built on the [Microsoft Copilot harness](https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview) (formerly the GitHub Copilot harness), often by other teams, in other environments.

Two questions follow quickly:

1. **Can my existing standard agent use a new Microsoft Copilot harness agent** without being rebuilt?
2. **Can my Microsoft Copilot harness agent call another team's agent** in a different environment, without copying it into mine?

Both work today, through the [MCP and A2A channels](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent) that every Microsoft Copilot harness agent exposes. This post is the configuration I used to get each one working **when both the caller and the target are Copilot Studio agents**: the OAuth values, the redirect URI, the connection, routing, and what other users need before they can use it.

If you're calling an agent from your own app or script instead, CATBOT's [I Read the MCP and A2A Docs So Adi Didn't Have To](https://microsoft.github.io/mcscatblog/posts/grumpy-protocol-clients/) covers the Python clients and Entra sign-in.

> The MCP and A2A channels are in preview. I tested these walkthroughs in three tenants. Details may change before general availability.

## How the pieces fit

There are three parts, and it helps to know who owns each one. The called agent is always a Microsoft Copilot harness agent:

| Part | What it is | Who sets it up |
|---|---|---|
| **Called agent** | Published, in an **Early** environment with credits | Its maker and a Power Platform admin |
| **App registration** | One Entra app for the **callers** | An identity admin |
| **Calling agent** | Has a connector and a connection | Its maker |

Follow [Prerequisite: Create an app registration](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent#prerequisite-create-an-app-registration) in the Learn article to create the app registration. These details from my tests are worth knowing before you start:

- **Only the called agent needs an Early environment.** The caller can sit in a Standard release environment, such as the default environment.
- **Only the caller registers.** The called agent's endpoint is protected by the Copilot Studio channel API, which usually already exists in your tenant. If searching by its application ID finds nothing, open the called agent's MCP or A2A dialog once, which adds it to your tenant.
- **The API name varies.** The channel API may appear as *Microsoft Copilot Studio Agent as MCP channel* or *Microsoft Copilot Studio Agent MCP and A2A channels*. Searching by its application ID, `6f46e6ed-07bf-4616-80f0-47546850f654`, finds it either way.
- **Consent is per protocol.** User consent is enough when someone creates a connection and signs in; the on-behalf-of setup in Scenario 1, step 7 needs admin consent. Consenting to the MCP permission doesn't cover A2A; each needs its own.
- **Callers get the published version.** A saved but unpublished change in the called agent isn't served.

And here's why the setup looks the way it does:

- **A client secret**, because a Copilot Studio connector is a server-side web app. It exchanges the sign-in code for a token on the server, and the secret proves the request comes from your registration.
- **A redirect URI for each connector**, because Entra only returns the sign-in result to addresses registered on the app.
- **OAuth mode "Manual"**, because Entra doesn't support dynamic client registration. "Dynamic" returned a 404 in my tests. If you've wired up a server that *does* support it, like the one in [the Jira remote MCP post](https://microsoft.github.io/mcscatblog/posts/atlassian-jira-remote-mcp-copilot-studio/), this is the step that's different.

## Find the called agent's URLs

Open the published Microsoft Copilot harness agent in its Early environment, select **+** next to **Triggers**, then pick **MCP protocol** or **A2A protocol**.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/add-trigger.png' | relative_url }}" alt="The Add a trigger dialog with MCP protocol and A2A protocol marked Preview" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>**MCP protocol** and **A2A protocol** in the Add a trigger dialog. They only appear in an Early release environment.</figcaption></figure>

Each dialog shows the agent's URL:

```text
MCP:  https://api.powerplatform.com/copilotstudio-mcp/tenants/{tenantId}/environments/{environmentId}/agents/{agentSchemaName}
A2A:  https://api.powerplatform.com/copilotstudio-a2a/tenants/{tenantId}/environments/{environmentId}/agents/{agentSchemaName}
Card: {A2A URL}/.well-known/agent-card.json
```

Opening a dialog doesn't change the agent: it shows the URL. The A2A dialog also takes **skills**, a name and description for each thing the agent does, and those are saved with the agent. In my tests they appeared in the full agent details that signed-in clients read, not on the public agent card.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-endpoint-dialog.png' | relative_url }}" alt="The A2A client dialog showing the agent's endpoint, agent card URL, and skills" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>The A2A dialog: the endpoint, the agent card URL, and the agent's skills.</figcaption></figure>

> The [official docs](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent) describe the same entries under **Channels → Add a channel → MCP client / A2A client**, and you may see them there instead. Either way, the called agent must be in an Early release environment. Also, the Publish dialog may warn that the agent "won't run until you add a trigger". MCP and A2A calls worked anyway.

## Scenario 1: Standard agent → Microsoft Copilot harness agent (MCP)

Your production standard agent gets the new agent as one more tool. Nothing about the standard agent is rebuilt.

### 1. Prepare the app registration

1. In the app registration, add the delegated permission **`MCS.InvokeAsMCP`** from the channel API.
2. Under **Certificates & secrets**, create a client secret and copy its value.

### 2. Add the MCP tool to the standard agent

In the standard agent, go to **Tools → Add a tool**, and under **Create new** choose **Model Context Protocol**. That opens **Add a Model Context Protocol server**, as described in [Add an existing MCP server to your agent](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent). Fill in:

| Field | Value |
|---|---|
| Server name | A name for the called agent, such as *HR Policy* |
| Server description | What the called agent does (see step 5) |
| Server URL | The **MCP** URL from the called agent |
| Authentication | **OAuth 2.0**, then change **Type** from the default **Dynamic discovery** to **Manual** |

### 3. Enter the OAuth values

| Field | Value |
|---|---|
| Client ID | The app registration's Application (client) ID |
| Client secret | The secret value from step 1 |
| Authorization URL | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize` |
| Token URL template | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` |
| Refresh URL | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` |
| Scopes | `https://api.powerplatform.com/copilotstudio-mcp/MCS.InvokeAsMCP offline_access` |

Replace `{tenantId}` with your Directory (tenant) ID. The scope must include `offline_access`, so the connection can refresh its token. The scope matches what the server advertises when you call it without a token. You don't need to configure PKCE: the sign-in request includes it automatically.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/mcp-oauth-manual.png' | relative_url }}" alt="The MCP server dialog with OAuth 2.0 type Manual and OAuth values filled in" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>The MCP wizard with **Manual** OAuth. The tenant ID is replaced with `{tenantId}` here.</figcaption></figure>

### 4. Register the redirect URI and create the connection

1. When you create the tool, Copilot Studio shows a redirect URL that starts with `https://global.consent.azure-apim.net/redirect/`. Each connector gets its own.
2. In the app registration, go to **Authentication → Add Redirect URI** (**Add a platform** in the older experience), choose **Web**, and paste it exactly as shown.
3. Back in Copilot Studio, create the connection and sign in. If the user hasn't consented to `MCS.InvokeAsMCP` yet, Entra asks them to. If an admin has already granted tenant-wide consent, users don't see that permission-consent prompt.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/entra-web-redirect.png' | relative_url }}" alt="The app registration Authentication page with a Web redirect URI" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>The connector's redirect URL added to the app registration as a **Web** redirect URI.</figcaption></figure>

The tool panel then shows a single tool, `send-message`. One connector and connection can serve several agents in the same environment.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/standard-agent-mcp-tool.png' | relative_url }}" alt="A standard agent's MCP tool details page, showing the connection and send-message tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>The standard agent with the Microsoft Copilot harness agent added as an MCP tool. The connection account is replaced with a placeholder.</figcaption></figure>

### 5. Tell the calling agent when to use it

The `send-message` tool's own description is generated from the called agent's name: "Send a message to the *HR Policy* agent and receive its reply." It doesn't say what the agent covers, so it's tempting to assume the **Server description** is what routing depends on. In my tests, both a specific and generic description routed questions about parental and annual leave to the tool.

Routing isn't guaranteed, though. In one run, "Can I book premium economy for a 7-hour flight?" went to the agent's default web search instead of the tool. If your agent has web search, knowledge or other tools that overlap, say when to use the called agent in the standard agent's instructions:

```text
For questions about leave, travel, expenses or other HR policies, use the
HR Policy tool. Don't answer HR policy questions from general knowledge
or web search.
```

Still write a **Server description** that says what the agent covers. Get it right the first time: it's copied into the agent when you add the tool, and editing the connector afterwards doesn't change it. To change it, you remove the tool and add it again.

### 6. Test it as the maker

Ask the standard agent something only the called agent knows. The activity trace shows **Used tool: send-message**, and the reply came back in about 9 to 17 seconds in my tests. Follow-up questions keep their context, because Copilot Studio passes the returned `conversationId` back for you. If MCP connectors are new to you, [Five Minutes to Your First MCP Connector](https://microsoft.github.io/mcscatblog/posts/hello-world-mcp-copilot-studio/) walks through the basics.

### 7. Switch the connector to on-behalf-of (OBO) sign-in

The tool uses **End user credentials** by default, so each person who chats with the standard agent calls the Microsoft Copilot harness agent as themselves. With **Manual** OAuth, the MCP wizard creates the connector with a generic OAuth 2 identity provider, and with that, every user has to sign in a second time on a separate connection manager page. Switching the connector to on-behalf-of (OBO) sign-in reuses the sign-in they already have, so they only select **Allow** once in the conversation.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-flow.png' | relative_url }}" alt="The on-behalf-of flow exchanging the user's token for a token to the MCP endpoint" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Every hop runs as the signed-in user. The connector's secret only proves it's allowed to swap the user's token.</figcaption></figure>

First, add OBO to the app registration from step 1, as described in [Configure OBO authentication for custom connectors](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-custom-connector-on-behalf-of):

1. **Expose an API → Add a scope.** Accept the default Application ID URI (`api://{client-id}`), name the scope `access_as_user`, set **Who can consent** to **Admins and users**, and keep it **Enabled**.
2. **Authorized client applications → Add a client application.** Enter `fe053c5f-3692-4f14-aef2-ee34fc081cae` (Azure API Connections) and tick `access_as_user`.
3. **API permissions → Grant admin consent** for `MCS.InvokeAsMCP`.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-expose-api.png' | relative_url }}" alt="The app registration exposing access_as_user and authorizing Azure API Connections" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>The client ID is replaced with `{client-id}` here.</figcaption></figure>

Then, in Power Apps, edit the connector created by the MCP wizard and set **2. Security → OAuth 2.0**:

| Field | Value |
|---|---|
| Identity Provider | **Azure Active Directory** (Microsoft Entra ID) |
| Enable Service Principal support | Off |
| Client ID | The app registration's Application (client) ID |
| Client secret | The secret value. Changing the identity provider clears it, so enter it again. |
| Authorization URL | `https://login.microsoftonline.com` (the default) |
| Tenant ID | Your Directory (tenant) ID |
| Resource URL | `https://api.powerplatform.com/copilotstudio-mcp` |
| Enable on-behalf-of login | `true` |
| Scope | Keep the value from step 3 (`…/MCS.InvokeAsMCP offline_access`) |

> The **Resource URL** is the channel API's identifier, `https://api.powerplatform.com/copilotstudio-mcp`. Plain `https://api.powerplatform.com` is a different API, the Power Platform API, and tokens issued for it aren't valid for the MCP endpoint.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-connector-security.png' | relative_url }}" alt="The connector Security tab configured for Azure Active Directory, the MCP resource URL, and OBO login" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>IDs are replaced with placeholders here.</figcaption></figure>

Select **Update connector**. The redirect URL stayed the same in my test, so the app registration needed no new redirect URI. After the switch, create a new connection for the tool in the standard agent (**Tools** → the MCP tool → **Create new connection**) and select it. The switch applies to every agent that uses this connector.

### 8. Share it and test with another user

Each user needs the following. Share the first three with a security group rather than one person at a time:

- **The standard agent**, shared as for any published agent.
- **The custom connector** the MCP wizard created, shared with **Can view**. Without it, the connection attempt failed with *"does not have ReadAccess … connector"*.
- **The called Microsoft Copilot harness agent**, shared with them. Until it was shared, my test user got a generic answer instead of the HR Policy reply.
- **A security role in the calling agent's environment**, if that isn't the default environment. **Basic User** was enough.

I published the standard agent to Microsoft 365 Copilot and tested it with a second user who wasn't the maker and had no connection to the connector. The first time the user asked something that needed the tool, Microsoft 365 Copilot showed a **Connect to continue** card:

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-consent-card.png' | relative_url }}" alt="A Connect to continue card for HR Policy with Allow and Cancel buttons" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>The in-conversation consent card. There's no connection manager page.</figcaption></figure>

Selecting **Allow** created the user's connection, and the agent answered with the called agent's reply. Later questions used the same connection without another card.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-answer-after-allow.png' | relative_url }}" alt="The IT Helpdesk agent answering with the paid parental-leave entitlement from HR policy" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>The answer after **Allow**. The details come from the called agent's HR handbook.</figcaption></figure>

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-followup-no-prompt.png' | relative_url }}" alt="A follow-up question about carrying over annual leave answered without another prompt" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>A follow-up question. No consent card this time.</figcaption></figure>

> If you leave the connector on the generic OAuth settings, the tool still works, but each user gets *"Let's get you connected first… Open connection manager"*. They connect on the **Manage your connections** page, which they have to open themselves, then go back and select **Retry**.

## Scenario 2: Microsoft Copilot harness agents across environments (A2A)

Another team owns the agent you need, in their own environment. Instead of copying it, you call their published agent. MCP would reach it across environments too, as Scenario 1 shows. This scenario uses A2A because the calling agent is a Microsoft Copilot harness agent, which can add it as a connected agent from its agent card.

### 1. Prepare the app registration

Add the delegated permission **`MCS.InvokeAsA2A`**. You can reuse the same registration and secret from Scenario 1, but users consent to A2A separately.

### 2. Add the A2A agent to the calling agent

1. In the calling agent, go to **Connected agents → + Add → Add A2A agent**.
2. Paste the called agent's **agent card URL**.
3. Under **Get the name and description from**, keep **The agent's full details (Recommended)**.
4. Choose **OAuth 2.0**. Copilot Studio usually fills in the authorization, token, refresh token URLs and scopes from the card.
5. Enter the client ID and secret.
6. Add `offline_access` to the scope so the connection can refresh its token:

   ```text
   https://api.powerplatform.com/copilotstudio-a2a/MCS.InvokeAsA2A offline_access
   ```

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/add-a2a-agent.png' | relative_url }}" alt="The Connect to an A2A agent form with offline_access added to the scope" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>The A2A form with `offline_access` added to the scope. IDs are replaced with placeholders here.</figcaption></figure>

### 3. Register the redirect URI and create the connection

1. Select **Next**. Copilot Studio creates the connector and shows its redirect URL, starting with `https://global.consent.azure-apim.net/redirect/`.
2. Add it to the app registration as a **Web** redirect URI, as in Scenario 1.
3. In Copilot Studio, select **Create new connection**, then **Create**, and sign in. The sign-in request asks for `MCS.InvokeAsA2A offline_access`.

### 4. Check the description

Select **Next** to reach **Review and add**, where the name and description come in from the agent. Read the description before you add it: it's what the calling agent routes on. Even with **The agent's full details**, my HR Policy agent came through as just *"Microsoft Copilot Studio agent 'HR Policy'."*

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-review-description.png' | relative_url }}" alt="The Review and add step showing HR Policy with a generic description" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>The description that came from the agent. Replace it before you select **Add to agent**.</figcaption></figure>

Copilot Studio [routes to an A2A agent](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-agent-to-agent#how-the-orchestrator-routes-to-the-a2a-agent) based on its name and description, the user's message and conversation context, and the calling agent's instructions. Replace the description with one that says when to use the agent:

```text
HR policy agent owned by the People team. Answers questions about leave,
travel, expenses and other HR policies. Use it for any HR policy question.
```

With that description and no instructions in the calling agent, "How many weeks of parental leave do I get?" went to HR Policy. If the calling agent has its own instructions or overlapping tools, add a line that points HR policy questions to the connected agent, as in the MCP example.

### 5. Test it

Select **Add to agent**, save, and ask the calling agent something only the called agent knows. You can test in **Preview** before publishing the caller; the called agent must already be published. The trace shows **Used tool: {your A2A agent}** with the input and output.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-call-trace.png' | relative_url }}" alt="The A2A call trace with context ID and the HR Policy agent reply" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>The output part of the calling agent's trace: the context ID and the called agent's reply, followed by the calling agent's answer.</figcaption></figure>

> The A2A tool's built-in guidance tells the model to pass both `context_id` and `task_id` back on follow-ups. Passing `task_id` fails with error `-32004` ("Task is in a terminal state"), because every reply is a completed task. Follow-ups work with `context_id` alone.

If both agents are Microsoft Copilot harness agents in the **same environment**, [connected agents](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-add-other-agents) lists them directly, with no URL, app registration or OAuth.

## How the two channels differ

Both channels invoke the **same published agent**. Its capabilities and answers don't change with the channel. Cross-environment access, calling an agent another team owns, delegated identity, hooks and billing work the same way for both, and credits are consumed in the called agent's environment. What changes is how the caller discovers the agent, calls it, and receives the reply:

| | MCP | A2A |
|---|---|---|
| Copilot Studio callers | Standard and Microsoft Copilot harness agents | Microsoft Copilot harness agents |
| Protocol version | MCP `2025-06-18` | A2A **1.0** only |
| Reply | Completed reply from `send-message` | Streaming supported |
| Discovery metadata | One tool, described by agent name | Agent card with skills |
| Follow-ups | `conversationId` | `context_id` |

- **Standard agents can't use A2A here.** The standard harness's Agent2Agent form expects the A2A 0.x card format, and Copilot Studio serves 1.0 cards. MCP is the only route from a standard agent today.
- **Client compatibility matters more than features.** The A2A channel accepts A2A 1.0 clients only. Check any other A2A client before you count on it.
- **Streaming is a channel capability.** The A2A channel streams replies through `SendStreamingMessage`, while MCP's `send-message` returns the completed reply. The [CATBOT post](https://microsoft.github.io/mcscatblog/posts/grumpy-protocol-clients/) shows both.
- **Discovery isn't routing.** The agent card and its skills are metadata that A2A clients use to discover the agent. Copilot Studio's routing uses the connected agent's name and description, the conversation, and the calling agent's instructions.

> [Agent hooks](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/hooks-overview) on the called agent fire for both channels. `metadata.channel` is `mcs-agent-as-mcp` or `mcs-agent-as-a2a`, and `userAadObjectId` is the signed-in caller. See [Hooks in Copilot Studio](https://microsoft.github.io/mcscatblog/posts/hooks-in-copilot-studio/).

## Key takeaways

- A **standard** agent can use a Microsoft Copilot harness agent today as an **MCP tool**, without being rebuilt.
- A **Microsoft Copilot harness** agent can call another team's agent in a **different environment** as an **A2A connected agent**, without copying it.
- The called agent needs an Early environment, and the setup needs an app registration, client secret, and a Web redirect URI per connector. MCP also needs **Manual** OAuth.
- Use clear names and descriptions, and add a line to the calling agent's instructions when web search or other tools overlap.
- Switch the MCP connector to **on-behalf-of** sign-in, so other users select **Allow** once in the conversation instead of using the connection manager.
- The channels differ in who can call, protocol version, streaming and discovery metadata, not in what the called agent can do.

Which of your production agents would you connect to a Microsoft Copilot harness agent first? Let me know in the comments.
