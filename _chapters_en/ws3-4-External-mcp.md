---
layout: chapter
lang: en
date: 2026-04-15
title: "Add an external MCP tool"
short_title: "Add an external MCP tool"
description: "Basics #3: Autonomous agent - Add an external MCP tool"
order: 4
category: workshop
parent: "ws3"
---

## Step 4: Add an external MCP tool

# 3. Add an external MCP tool: overseas news lookup MCP

> **Previous step:** [3. Add the Work IQ MCP tool](./3.%20Work%20IQ%20MCP%20도구%20추가.md) | **Next step:** [5. Add an AI Prompt tool](./5.%20AI%20Prompt%20도구%20추가.md)

---

In Copilot Studio, you can also add private or internal MCP servers that are not provided in catalog form, as in the previous lab. By entering the URL and authentication token in the GUI, you can add all tools exposed by that server to the agent.

In this lab, you will connect a private MCP server, **External News MCP**, to the agent and use it as a tool for retrieving overseas news information by keyword and region.

> This MCP server was built using the API provided by [NewsAPI.org](https://newsapi.org/). <br> It was developed by Microsoft Korea and is deployed to Azure Container Apps, so the service may be unavailable depending on resource conditions. <br> If the connection is not stable, we recommend following the [guide to deploy the News API MCP server yourself](https://github.com/chichoi1991/Demo-MCP-Server/blob/main/News-api-mcp/README.md) and then connecting to your own deployment. <br>

![1]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20002502.png)

<br>

---

## Introducing News API MCP

**News API MCP** is a custom MCP server based on the [NewsAPI.org](https://newsapi.org/) API.
You can use this MCP server to retrieve news information from around the world.  
When it is connected to an agent, the agent automatically calls News API MCP when users ask for news information in natural language, then responds with and configures the relevant information.


| Item | Details |
|------|------|
| **Language** | Python 3.12 |
| **Transport** | stdio + Streamable HTTP |
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

## 1. Start adding the MCP tool

On the agent overview page, go to the **Tools** section and click **+ Add a tool**.

![4-1]({{ site.baseurl }}/assets/image/ws3/4-1.png)

In the add tool popup, select the **MCP** tab or the **Model Context Protocol (MCP)** option.

![4-2]({{ site.baseurl }}/assets/image/ws3/4-2.png)

<br>

---

## 2. Connect the ThinQ MCP server

### 2-1. Enter the server URL and information

Enter the **ThinQ MCP server URL** for the lab below.

> <b>Important!</b> This MCP server was built using the API provided by [NewsAPI.org](https://newsapi.org/). <br> It was developed by Microsoft Korea and is deployed to Azure Container Apps, so the service may be unavailable depending on resource conditions. <br> If the connection is not stable, we recommend following the [guide to deploy the News API MCP server yourself](https://github.com/chichoi1991/Demo-MCP-Server/blob/main/News-api-mcp/README.md) and then connecting to your own deployment. <br>


| Item | Value | Description |
|-----------|---|---|
| **Server name** | `News_API_MCP_[Name]` | Name used to identify the tool in the agent |
| **Server description** | `An MCP (Model Context Protocol) server that lets an AI agent search and use news from around the world. It provides news article search, top headline lookup, and news source listing through News API.` | Description used to identify the tool in the agent. Describe the tools and scenarios provided by this MCP server in detail so the agent works correctly. |
| **Server URL** | `https://newsapi-mcp-python.politeglacier-1c138199.koreacentral.azurecontainerapps.io/mcp` | Endpoint URL of the demo news api MCP server |
| **Authentication** | `API key` | Uses an API key issued by newsapi.org. |
| **Authentication type** | `Header` | Authenticates by including the API key in an HTTP request header. |
| **Header name** | `x-news-api-key` | HTTP header name used to pass the API key. |


![4-3]({{ site.baseurl }}/assets/image/ws3/4-3.png)
![4-4]({{ site.baseurl }}/assets/image/ws3/4-4.png)


> The server URL and information may vary depending on your lab environment. 

When you finish entering the information, click **Create** to connect the ThinQ MCP server to the agent.

<br>

### 2-2. Confirm the connection

When the connection window appears, create a new connection in the order shown below.
![4-5]({{ site.baseurl }}/assets/image/ws3/4-5.png)

![4-6]({{ site.baseurl }}/assets/image/ws3/4-6.png)



After the connection is complete, click **Add and configure**.  
When it is complete, the **tool list** exposed by the ThinQ MCP server is displayed.

![4-7]({{ site.baseurl }}/assets/image/ws3/4-7.png)




| Tool name | Description |
|--------|------|
| `search-news` | Search news articles by keyword |
| `get-top-headlines` | Top headlines by country/category |
| `get-news-sources` | Retrieve a list of news sources |

![4-8]({{ site.baseurl }}/assets/image/ws3/4-8.png)

---

## 3. Update Instructions

After News API MCP is added, you need to update the Instructions so the agent can use this tool. In this lab, the Instructions already include how to use MCP tools.

<br>

---

## 4. Verify behavior

To run MCP, first go to **Settings** → **Connection settings** in the upper-right corner and allow the connection for the added MCP.

![8]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20013436.png)
![4-9]({{ site.baseurl }}/assets/image/ws3/4-9.png)

<br>

After the connection is complete, close the settings window and enter the following questions in the test panel on the right to verify that ThinQ MCP works.

```
List the home appliances I own
```
![10]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20014327.png)
```
Change the wine cellar light to level 2
```
![11]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20014600.png)
```
Tell me the daily energy usage of the wine cellar
```

![12]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20014448.png)
If the agent calls the ThinQ MCP tool and responds with product information, Step 4 is complete.

> **Learning point:** You connected an external data source as an agent tool just by registering an MCP server URL, without writing a single line of code. This pattern applies to any MCP server in the same way.

<br>

---

> **Next step:** [5. Add an AI Prompt tool](./5.%20AI%20Prompt%20도구%20추가.md)


---
---

← [Previous: Step 3. Work IQ MCP]({{ '/en/chapters/ws3-3-workiq-mcp/' | relative_url }}) | [Next: Step 5. AI Prompt tool]({{ '/en/chapters/ws3-5-ai-prompt/' | relative_url }}) →

