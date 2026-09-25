---
layout: chapter
lang: en
date: 2026-04-22
title: "Add external MCP tools"
short_title: "Add external MCP tools"
description: "[Renewal] Explore the basic features of Copilot Studio - Connect a URL-based private MCP server"
order: 6
category: workshop
parent: "ws5"
---

## Step 6: Add external MCP tools

# Add an external MCP tool: overseas news lookup MCP

In Copilot Studio, in addition to MCPs provided through the catalog as in the previous steps, you can add all tools provided by an internal or private MCP server to an agent by entering only the **URL and authentication token** in the GUI.

In this lab, connect a private MCP server called **External News MCP** to the agent and use it as a tool to look up overseas news information by keyword or region.

> This MCP is built using the API provided by [NewsAPI.org](https://newsapi.org/). <br> This MCP server was developed by Microsoft Korea and is deployed to Azure Container Apps, so the service may not be available depending on resource conditions. <br> If the connection does not work smoothly, we recommend that you refer to the [News API MCP server deployment guide](https://github.com/chichoi1991/Demo-MCP-Server/blob/main/News-api-mcp/README.md), deploy it yourself, and then connect it.

![1]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20002502.png)

<br>

---

## Introduction to News API MCP

**News API MCP** is a custom MCP server built on the [NewsAPI.org](https://newsapi.org/) API.
You can use this server to look up news information from around the world.  
When connected to an agent, the agent automatically calls News API MCP when users ask for news information in natural language, then answers and configures settings for the related information.


| Item | Details |
|------|------|
| **Language** | Python 3.12 |
| **Transport method** | stdio + Streamable HTTP |
| **Authentication** | News API Key (`x-news-api-key` header) |
| **Deployment** | `azd up` → Azure Container Apps |

### Tools

| Tool name | Description |
|--------|------|
| `search-news` | Search news articles by keyword |
| `get-top-headlines` | Top headlines by country/category |
| `get-news-sources` | Retrieve a list of news sources |

📄 Details: [News-api-mcp/README.md](https://github.com/chichoi1991/Demo-MCP-Server/tree/master/News-api-mcp)

<br>

---

## 1. Start adding an MCP tool

On the agent overview screen, go to the **Tools** section and click **+ Add a tool**.

![4-1]({{ site.baseurl }}/assets/image/ws3/4-1.png)

In the Add tool pop-up, select the **MCP** tab or the **Model Context Protocol (MCP)** option.

![4-2]({{ site.baseurl }}/assets/image/ws3/4-2.png)

<br>

---

## 2. Connect an external MCP server

### 2-1. Enter the server URL and information

Enter the **News API MCP server URL** for the lab below.

> <b>Important!</b> This MCP is built using the API provided by [NewsAPI.org](https://newsapi.org/). <br> Because it is deployed to Azure Container Apps, the service may not be available depending on resource conditions. <br> If the connection does not work smoothly, we recommend that you refer to the [News API MCP server deployment guide](https://github.com/chichoi1991/Demo-MCP-Server/blob/main/News-api-mcp/README.md), deploy it yourself, and then connect it.


| Item | Value | Description |
|-----------|---|---|
| **Server name** | `News_API_MCP_[name]` | Name used to identify the tool within the agent |
| **Server description** | `This is an MCP (Model Context Protocol) server that lets AI agents search and use news from around the world. Through News API, it provides capabilities to search news articles, retrieve top headlines, and retrieve a list of news sources.` | Description used to identify the tool within the agent. Describe the tools and scenarios provided by this MCP server in detail so the agent behaves correctly. |
| **Server URL** | `https://newsapi-mcp-python.politeglacier-1c138199.koreacentral.azurecontainerapps.io/mcp` | Endpoint URL of the News API MCP server provided for the demo |
| **Authentication** | `API key` | Uses the API key issued by newsapi.org. |
| **Authentication type** | `Header` | Authenticates by including the API key in the HTTP request header. |
| **Header name** | `x-news-api-key` | HTTP header name used to pass the API key. |


![4-3]({{ site.baseurl }}/assets/image/ws3/4-3.png)
![4-4]({{ site.baseurl }}/assets/image/ws3/4-4.png)


> The server URL and information may differ depending on the lab environment.

When you have finished entering the information, click **Create** to connect the external MCP server to the agent.

<br>

### 2-2. Confirm the connection

When the connection window appears, proceed with the new connection in order as shown below.
![4-5]({{ site.baseurl }}/assets/image/ws3/4-5.png)

![4-6]({{ site.baseurl }}/assets/image/ws3/4-6.png)



After the connection is complete, click the **Add and configure** button.  
When complete, the **list of tools** exposed by the external MCP server is displayed.

![4-7]({{ site.baseurl }}/assets/image/ws3/4-7.png)




| Tool name | Description |
|--------|------|
| `search-news` | Search news articles by keyword |
| `get-top-headlines` | Top headlines by country/category |
| `get-news-sources` | Retrieve a list of news sources |

![4-8]({{ site.baseurl }}/assets/image/ws3/4-8.png)

---

## 3. Update Instructions

After News API MCP has been added, you must update the Instructions so the agent can use the tool. Even one line in the Instructions that states when and how to use the tool greatly improves call accuracy.

<br>

---

## 4. Verify operation

To use the MCP, first go to **Settings** → **Connection settings** in the upper-right corner and allow the connection for the added MCP.

![8]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20013436.png)
![4-9]({{ site.baseurl }}/assets/image/ws3/4-9.png)

<br>

When the connection is complete, exit the settings window and enter the questions below in the test panel on the right to verify that the MCP works.

```
Tell me today's global IT headlines.
```
```
Search for 5 recent news articles with the keyword "Microsoft Copilot".
```

This step is complete when the agent calls the external MCP tool and responds with news information.

> **Learning point:** You connected an external data source as an agent tool simply by registering the MCP server URL, without writing a single line of code. This pattern applies equally to any MCP server.

<br>

---

← [Previous: Step 5. Connector (send email)]({{ '/en/chapters/ws5-5-tool-connector/' | relative_url }}) | [Next: Step 7. Connector-centric flow]({{ '/en/chapters/ws5-7-tool-flow/' | relative_url }}) →
