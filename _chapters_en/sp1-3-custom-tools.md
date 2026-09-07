---
layout: chapter
lang: en
date: 2026-04-17
title: "Part 3: Add custom tools (FRED MCP + ThinQ MCP)"
short_title: "Custom tools"
description: "Special workshop - Add the FRED Economic MCP and ThinQ MCP custom tools"
order: 3
category: special
parent: "sp1"
---

## Part 3: Add custom tools (FRED MCP + ThinQ MCP)

> **Previous step:** [Part 2: Add pre-built tools]({{ '/en/chapters/sp1-2-prebuilt-tools/' | relative_url }}) | **Back to start:** [Overview]({{ '/en/chapters/sp1-0-overview/' | relative_url }})

---

In this part, you will add two **custom MCP servers** that are not provided by Microsoft by default.

- **FRED Economic MCP** — U.S. Federal Reserve economic data
- **ThinQ MCP** — query and control LG IoT appliances

Both servers are private MCP servers deployed to Azure Container Apps. You connect by entering the URL and API key directly.

<br>

---

## 1. How to add an MCP tool (common steps)

On the agent overview screen, click the **Tools** section → **+ Add a tool**.

In the add-tool popup, select the **MCP** tab → the **Model Context Protocol (MCP)** option at the bottom.

> **Pre-built vs Custom:** The Work IQ tools added in Part 2 were selected from the catalog, but for custom MCP you **enter the URL and authentication information directly**.

<br>

---

## 2. Connect the FRED Economic MCP server

### 2-1. Introduction to FRED MCP

**FRED (Federal Reserve Economic Data)** is a database of more than 810,000 economic time series provided by the Federal Reserve Bank of St. Louis. Through this MCP server, the agent can query and analyze economic indicators in real time.

| Item | Details |
|------|------|
| **Data source** | [FRED (Federal Reserve Economic Data)](https://fred.stlouisfed.org/) |
| **Number of series** | 810,000+ economic time series |
| **Provided tools** | 6 theme tools + 1 search tool |
| **Transport** | Streamable HTTP |
| **Deployment environment** | Azure Container Apps (Korea Central) |

### 2-2. Enter the server URL and authentication information

Enter the information below exactly:

| Item | Value |
|------|-----|
| **Server name** | `FRED_Economic_MCP` |
| **Server description** | `An MCP server for querying U.S. Federal Reserve (FRED) economic data. It provides economic indicators across six themes: consumer demand, commodities and exchange rates, macroeconomy, industrial production, EV and energy markets, and robotics and actuators. It can also search more than 810,000 time series by keyword.` |
| **Server URL** | `https://fred-mcp-python.purplehill-ba85d6d0.koreacentral.azurecontainerapps.io/mcp` |
| **Authentication** | `API key` |
| **Authentication type** | `Header` |
| **Header name** | `x-fred-api-key` |
| **API key value** | *(Provided separately during the lab)* |

After entering the information, click **Create**.

> **Why the server description matters:** Copilot Studio's generative AI orchestrator uses the server description to decide when to call this tool. The description must be specific enough for the agent to behave correctly.

### 2-3. Check the tool list

When the connection succeeds, the seven tools below are displayed:

| Tool name | Description | Key series |
|--------|------|------------|
| `get-consumer-demand` | Consumer demand indicators | PCEDG (durable goods consumption), UMCSENT (consumer sentiment), HOUST (housing starts), HSN1F (home sales), TOTALSA (auto sales) |
| `get-cost-pressure` | Cost/margin pressure indicators | DEXKOUS (KRW/USD exchange rate), DCOILWTICO (WTI oil price), WPUSI019011 (copper PPI), WPU101 (steel PPI), PCU325211325211 (synthetic resin PPI) |
| `get-macro-environment` | Macroeconomic environment | GDPC1 (real GDP), CPIAUCSL (CPI), CUSR0000SAD (durable goods CPI), FEDFUNDS (federal funds rate), UNRATE (unemployment rate), DGS10 (10-year Treasury), DGS2 (2-year Treasury) |
| `get-industry-production` | Industry/manufacturing trends | INDPRO (industrial production index), DGORDER (durable goods orders), AMTMNO (manufacturing orders), IPMAN (manufacturing production) |
| `get-ev-energy-market` | EV/energy market | TOTALSA (auto sales), AISRSA (inventory-to-sales ratio), DCOILWTICO (oil price), GASREGW (retail gasoline price), IPG3361T3S (auto production) |
| `get-robotics-actuator` | Robotics & actuators | NASDAQNQROBO (AI Robotics Global), NASDAQNQROBOUS (AI Robotics US), PCU333995333995 (actuator PPI), WPU114303 (actuator and parts PPI), IPG3332S (industrial machinery production), A33ENO (industrial machinery orders), IPG3336S (power transmission equipment production), ATGPNO (power transmission equipment orders) |
| `search-fred-series` | Search FRED series | Explore 810,000+ time series by keyword |

### 2-4. Tool parameters

All theme tools (`get-*`) use the same parameters:

| Parameter | Type | Default | Description |
|----------|------|--------|------|
| `indicator` | string (optional) | Query all | Query only a specific series ID (for example, `FEDFUNDS`) |
| `period` | enum | `1y` | Query period: `6m`, `1y`, `3y`, `5y` |
| `units` | enum | `lin` | Data transformation: `lin` (raw), `chg` (change), `pch` (% change), `pc1` (year-over-year %), `pca` (annualized), `log` (natural log) |

Parameters for the `search-fred-series` tool:

| Parameter | Type | Default | Description |
|----------|------|--------|------|
| `query` | string (required) | — | Search keyword (for example, `semiconductor production`) |
| `limit` | integer | `10` | Number of search results (1-50) |

> **Lab test:** In the agent test pane, enter "Show me the U.S. unemployment-rate trend over the last 3 years." The agent should call `get-macro-environment(indicator="UNRATE", period="3y")`.

<br>

---

## 3. Connect the ThinQ MCP server

### 3-1. Introduction to ThinQ MCP

**ThinQ MCP** is an MCP server that queries and controls IoT appliances registered in the LG ThinQ platform.

| Item | Details |
|------|------|
| **Target devices** | Air conditioners, washing machines, refrigerators, air purifiers, dryers, and more |
| **Provided features** | Device query, status check, control commands, energy usage query |
| **Transport** | Streamable HTTP |
| **Deployment environment** | Azure Container Apps (Korea Central) |

### 3-2. Enter the server URL and authentication information

Select **+ Add a tool** → **MCP** → **Model Context Protocol (MCP)** again, and enter the information below:

| Item | Value |
|------|-----|
| **Server name** | `ThinQ_MCP` |
| **Server description** | `An MCP server for querying and controlling smart appliances on the LG ThinQ IoT platform. It provides features for checking the status of air conditioners, washing machines, refrigerators, and other devices, executing control commands, and querying energy usage.` |
| **Server URL** | `https://thinqmcp-http-typescript.kindmoss-12649bc0.koreacentral.azurecontainerapps.io/mcp` |
| **Authentication** | `API key` |
| **Authentication type** | `Header` |
| **Header name** | `x-pat-token` |
| **API key value** | *(Provided separately during the lab)* |

After entering the information, click **Create**.

### 3-3. Check the tool list

When the connection succeeds, the tools below are displayed:

| Tool name | Description |
|--------|------|
| `getDevices` | Query the list of all registered devices |
| `getDeviceStatus` | Query the current status of a specific device (operation mode, temperature, whether it is running, and so on) |
| `controlDevice` | Execute device control commands (change air conditioner temperature, start a washing machine, and so on) |
| `getEnergyUsage` | Query energy usage by device |

### 3-4. Tool parameters

`getDeviceStatus` / `controlDevice` / `getEnergyUsage`:

| Parameter | Type | Description |
|----------|------|------|
| `deviceId` | string (required) | Unique device ID (queried with `getDevices`) |

Additional parameters for `controlDevice`:

| Parameter | Type | Description |
|----------|------|------|
| `command` | string (required) | Control command (for example, `setTemperature`, `start`, `stop`) |
| `value` | string/number | Value for the command (for example, temperature `24`) |

> **Lab test:** Enter "Show me the list of registered appliances." The agent calls `getDevices`.

<br>

---

## 4. Check all tools

After all tools are added, you should see the following in the agent's **Tools** section:

| Tool group | Number of tools | Type |
|-----------|---------|------|
| Work IQ Mail MCP | 4-5 | Pre-built |
| Work IQ Teams MCP | 3-4 | Pre-built |
| Work IQ Copilot MCP | 1-2 | Pre-built |
| FRED Economic MCP | 7 | Custom |
| ThinQ MCP | 4 | Custom |

<br>

---

## 5. Integration tests

### 5-1. Single-tool tests — check basic behavior

In the agent test chat, first use **simple prompts** to confirm that each tool is called correctly:

**FRED macroeconomy (get-macro-environment):**

| # | Test question | Expected parameters |
|---|------------|--------------|
| 1 | "Show me the U.S. unemployment-rate trend." | `indicator=UNRATE, period=1y` |
| 2 | "Show me the 3-year CPI trend as a year-over-year change rate." | `indicator=CPIAUCSL, period=3y, units=pc1` |
| 3 | "Query 5-year federal funds rate data as raw values." | `indicator=FEDFUNDS, period=5y, units=lin` |
| 4 | "Compare 10-year and 2-year Treasury yields and check whether the yield curve is inverted." | Query all without `indicator` → compare DGS10, DGS2 |
| 5 | "Show me the 3-year trend for durable goods CPI (CUSR0000SAD). Analyze whether monitor and display product prices are rising." | `indicator=CUSR0000SAD, period=3y` |

**FRED consumer demand (get-consumer-demand):**

| # | Test question | Expected parameters |
|---|------------|--------------|
| 6 | "Show me U.S. durable goods consumption expenditures for the last 1 year." | `indicator=PCEDG, period=1y` |
| 7 | "Show me the 3-year trend for the consumer sentiment index as a year-over-year change rate." | `indicator=UMCSENT, period=3y, units=pc1` |
| 8 | "Are new housing starts increasing? Tell me using the latest 6 months of data." | `indicator=HOUST, period=6m` |
| 9 | "Show me the year-over-year change rate for total U.S. auto sales." | `indicator=TOTALSA, units=pc1` |

**FRED cost pressure (get-cost-pressure):**

| # | Test question | Expected parameters |
|---|------------|--------------|
| 10 | "Tell me the KRW/USD exchange-rate trend over the last 6 months." | `indicator=DEXKOUS, period=6m` |
| 11 | "How has the WTI crude oil price moved recently?" | `indicator=DCOILWTICO` |
| 12 | "Compare copper PPI and steel PPI." | Query all without `indicator` |
| 13 | "Show me the synthetic resin PPI trend. Analyze how monitor housing and plastic component costs are changing." | `indicator=PCU325211325211` |

**FRED industry/manufacturing (get-industry-production):**

| # | Test question | Expected parameters |
|---|------------|--------------|
| 14 | "Query the 3-year U.S. industrial production index trend as a year-over-year change rate." | `indicator=INDPRO, period=3y, units=pc1` |
| 15 | "Are new durable goods orders increasing? Analyze whether B2B orders related to IT equipment and displays are recovering." | `indicator=DGORDER` |
| 16 | "Analyze factory operating conditions by combining the manufacturing production index and new orders." | Query all without `indicator` |

**FRED EV/energy (get-ev-energy-market):**

| # | Test question | Expected parameters |
|---|------------|--------------|
| 17 | "What is the auto inventory-to-sales ratio? Are inventories building up?" | `indicator=AISRSA` |
| 18 | "Show me WTI oil prices and retail gasoline prices together." | Query all without `indicator` |

**FRED series search (search-fred-series):**

| # | Test question | Expected keyword |
|---|------------|------------|
| 19 | "Search for FRED series related to semiconductor production." | `semiconductor production` |
| 20 | "Search for series related to computer and electronic product manufacturing." | `computer electronic product manufacturing` |
| 21 | "Search whether FRED has data related to display panel or flat panel." | `display panel` / `flat panel` |
| 22 | "Find indicators related to information processing equipment." | `information processing equipment` |

**FRED robotics & actuators (get-robotics-actuator):**

| # | Test question | Expected parameters |
|---|------------|---------------|
| 23 | "Query all economic indicators related to robotics and actuators." | Query all without `indicator` |
| 24 | "Show me the Nasdaq AI Robotics Index trend over the last 3 years." | `indicator=NASDAQNQROBO, period=3y` |
| 25 | "How has actuator PPI changed recently? Judge whether demand is increasing." | `indicator=PCU333995333995` |
| 26 | "Show me industrial machinery new orders and the production index. Check whether demand for robotic equipment is recovering." | Query all without `indicator` → check IPG3332S, A33ENO |
| 27 | "Show me 5-year power transmission equipment new orders data as a year-over-year change rate. I want to understand the demand trend for servo motors and reducers." | `indicator=ATGPNO, period=5y, units=pc1` |
| 28 | "Show me the year-over-year change rate for fluid power cylinder and actuator PPI." | `indicator=WPU114303, units=pc1` |

**Work IQ (Mail/Teams/Copilot):**

| # | Test question | Expected called tool |
|---|------------|---------------|
| 29 | "Summarize emails related to 'market analysis' that I received in the last week." | Work IQ Mail |
| 30 | "Search recent Teams conversations with the keyword 'display costs'." | Work IQ Teams |
| 31 | "Find whether there are consulting reports or market reports among my recently received emails." | Work IQ Mail |

**ThinQ (IoT):**

| # | Test question | Expected called tool |
|---|------------|---------------|
| 32 | "Show me the list of registered appliances." | ThinQ `getDevices` |

---

### 5-2. FRED complex analysis tests — multiple-tool combinations

Check whether **multiple FRED tools are called sequentially** from a single question. The tests are sorted by difficulty (⭐).

**⭐ Two-tool combinations (basic):**

| # | Test question | Expected call order |
|---|------------|---------------|
| 1 | "Analyze exchange rates and oil prices together and tell me the impact on import costs." | `get-cost-pressure` (DEXKOUS + DCOILWTICO) → synthesize |
| 2 | "Evaluate U.S. economic conditions by combining GDP and the unemployment rate." | `get-macro-environment` (GDPC1 + UNRATE) → synthesize |
| 3 | "Look at copper and synthetic resin PPI together with exchange rates, and diagnose the level of import cost pressure for display components." | `get-cost-pressure` (DEXKOUS + WPUSI019011 + PCU325211325211) → synthesize |
| 4 | "Compare durable goods CPI with durable goods consumption expenditures, and analyze whether consumption is increasing relative to monitor and display prices." | `get-macro-environment` (CUSR0000SAD) + `get-consumer-demand` (PCEDG) → compare |
| 5 | "Combine the consumer sentiment index and durable goods consumption to analyze the consumption outlook for IT electronics (monitors, TVs)." | `get-consumer-demand` (UMCSENT + PCEDG) → outlook |
| 6 | "Analyze the AI Robotics Index and actuator PPI together to compare market sentiment and real demand in the Physical AI market." | `get-robotics-actuator` (NASDAQNQROBO + PCU333995333995) → compare |
| 7 | "Combine industrial machinery new orders and actuator PPI to judge whether this is the time to expand investment in robotic automation equipment." | `get-robotics-actuator` (A33ENO + PCU333995333995) → investment judgment |

**⭐⭐ Three-tool combinations (intermediate):**

| # | Test question | Expected call order |
|---|------------|---------------|
| 6 | "Analyze the display margin outlook by reviewing cost trends from exchange rates, copper, and synthetic resin PPI, then checking price pass-through with durable goods CPI." | `get-cost-pressure` → `get-macro-environment` (CUSR0000SAD) → margin analysis |
| 7 | "Check yield-curve inversion, GDP, and unemployment, then add industrial production index and durable goods orders trends to evaluate recession risk and manufacturing impact." | `get-macro-environment` → `get-industry-production` → comprehensive judgment |
| 8 | "Combine housing starts, consumer sentiment, and durable goods consumption expenditures to analyze the demand outlook for home monitors and TV displays." | `get-consumer-demand` (HOUST + UMCSENT + PCEDG) → demand outlook |
| 9 | "Check the interest-rate and GDP environment, then add durable goods orders trends to diagnose the B2B display equipment investment environment." | `get-macro-environment` → `get-industry-production` (DGORDER) → B2B investment judgment |
| 10 | "Combine robotics and actuator indicators with industrial production and macroeconomic data to evaluate the industrial robot equipment investment environment." | `get-robotics-actuator` → `get-industry-production` → `get-macro-environment` → comprehensive evaluation |
| 11 | "Analyze power transmission equipment new orders, the AI Robotics Index, and interest rates together to diagnose the servo motor and reducer market outlook." | `get-robotics-actuator` (ATGPNO + NASDAQNQROBO) → `get-macro-environment` (FEDFUNDS) → outlook |

**⭐⭐⭐ Four or more tool combinations (advanced):**

| # | Test question | Expected call order |
|---|------------|---------------|
| 10 | "Review display cost trends using exchange rates, copper, and synthetic resin PPI, then analyze durable goods CPI and consumer sentiment together to evaluate the monitor market profitability outlook." | `get-cost-pressure` → `get-macro-environment` → `get-consumer-demand` → comprehensive profitability |
| 11 | "Combine yield-curve inversion, GDP, unemployment, and the industrial production index, then add exchange rates and commodity PPI to evaluate this year's display manufacturing investment environment." | `get-macro-environment` → `get-industry-production` → `get-cost-pressure` → comprehensive judgment |
| 12 | "After searching for computer and electronic product manufacturing series, combine the related indicators with exchange-rate and commodity data and durable goods CPI to comprehensively diagnose display industry conditions." | `search-fred-series` → `get-cost-pressure` → `get-macro-environment` → comprehensive diagnosis |
| 13 | "Query all robotics and actuator indicators, add exchange rates, commodity PPI, interest rates, and industrial production data, and create a briefing that comprehensively evaluates the Physical AI business investment environment." | `get-robotics-actuator` → `get-cost-pressure` → `get-macro-environment` → `get-industry-production` → comprehensive briefing |

---

### 5-3. FRED + Work IQ complex analysis tests — macroeconomy × internal communications

These scenarios combine FRED economic data with **email, Teams conversations, and consulting materials** for practical business judgment.

**⭐ Simple — FRED + email/chat combinations:**

| # | Test question | Expected behavior |
|---|------------|-----------|
| 1 | "Summarize recently received emails related to 'market analysis,' and also show U.S. unemployment-rate and GDP trends." | Work IQ Mail → `get-macro-environment` → provide information in parallel |
| 2 | "Search recent Teams conversations related to 'commodity prices,' and show actual copper, steel, and synthetic resin PPI trends together." | Work IQ Teams → `get-cost-pressure` → compare conversation content vs actual data |
| 3 | "Find content in recent emails that includes the keyword 'exchange rate,' and also query KRW/USD exchange-rate data for the last 6 months." | Work IQ Mail → `get-cost-pressure` (DEXKOUS) → compare email content with actual trends |

**⭐⭐ Intermediate — internal-material validation + economic-data cross-analysis:**

| # | Test question | Expected behavior |
|---|------------|-----------|
| 4 | "Find recently received consulting report emails, summarize the key points, and validate the economic indicators mentioned in the reports with actual data from FRED." | Work IQ Mail (consulting email search) → related FRED tools → cross-validation |
| 5 | "Search recent Teams discussions related to the 'display market,' and fact-check the team discussion using durable goods consumption, consumer sentiment, and durable goods CPI data." | Work IQ Teams → `get-consumer-demand` + `get-macro-environment` → fact check |
| 6 | "Reevaluate the pricing policy based on commodity price changes. Find related internal emails and Teams conversations, and strengthen the rationale with FRED exchange-rate and commodity PPI data." | Work IQ Mail + Teams → `get-cost-pressure` → pricing policy review |
| 7 | "Find and summarize recent email reports related to the 'North America market,' then add GDP, unemployment-rate, and interest-rate data to evaluate whether the report content matches current economic conditions." | Work IQ Mail → `get-macro-environment` → compare report vs actual economy |

**⭐⭐⭐ Advanced — comprehensive judgment + communication deliverables:**

| # | Test question | Expected behavior |
|---|------------|-----------|
| 8 | "Summarize recent reporting emails, query exchange rates, commodity PPI, durable goods CPI, and the industrial production index, compare and analyze them against market conditions, then summarize the key risk points and share them to Teams as a card." | Work IQ Mail → `get-cost-pressure` + `get-macro-environment` + `get-industry-production` → risk analysis → Teams card |
| 9 | "Search Teams discussions related to 'rising display costs,' analyze the level of cost pressure using copper and synthetic resin PPI and exchange-rate data, then write an opinion email with response options." | Work IQ Teams → `get-cost-pressure` → analysis → Work IQ Mail (write email) |
| 10 | "Comprehensively search internal consulting-material emails and Teams discussions, query GDP, interest rates, durable goods orders, and exchange-rate data from FRED, and write a briefing email on this year's display business unit investment environment." | Work IQ Mail + Teams → `get-macro-environment` + `get-industry-production` + `get-cost-pressure` → write briefing email |
| 11 | "Write a decision-opinion email about entering a new market. Find related internal materials in email and Teams, then combine GDP, interest rates, consumer sentiment, industrial production index, and exchange-rate data to build the rationale." | Work IQ Mail + Teams → `get-macro-environment` + `get-consumer-demand` + `get-industry-production` + `get-cost-pressure` → write decision email |
| 12 | "Search FRED for computer and electronic product manufacturing series, summarize related Teams discussions and email reports together, and share a display-industry business outlook report as a Teams card." | `search-fred-series` → Work IQ Teams + Mail → comprehensive report → Teams card |
| 13 | "Search Teams discussions related to 'robotics' or 'automation,' combine robotics and actuator indicators with industrial production and interest-rate data, and write a briefing email on the Physical AI business investment environment." | Work IQ Teams → `get-robotics-actuator` + `get-industry-production` + `get-macro-environment` → write briefing email |

---

### 5-4. Complex scenarios — full workflow tests

Check whether the **business scenarios defined in the agent's Instructions** work end to end:

| Test question | Expected behavior |
|------------|-----------|
| "Review the North America market strategy." | SharePoint search → FRED query → gap analysis → Teams adaptive card |
| "Reevaluate the pricing policy based on commodity price changes." | SharePoint search → FRED cost indicators → margin analysis → Teams notification |
| "Summarize recent reporting emails and compare them with market conditions." | Mail query → FRED validation → risk analysis → Teams notification |
| "Write a decision-opinion email about entering a new market." | FRED + SharePoint → decision email draft → Teams notification |
| "Judge whether this is the right time to expand investment in robotics and automation equipment." | FRED Tool 6 (robotics and actuators) + Tool 3 (interest rates) + Tool 4 (industrial production) → investment judgment |
| "Create a briefing on the investment environment for the Physical AI business." | FRED Tool 6 + Tool 2 (exchange rates and commodities) + Tool 3 (macroeconomy) → briefing → Teams card |

<br>

---

## ✅ Part 3 completion checklist

- [ ] Has FRED Economic MCP been connected, and are seven tools enabled?
- [ ] Has ThinQ MCP been connected, and are four tools enabled?
- [ ] Do all single-tool tests pass?
- [ ] Are multiple tools called sequentially in complex scenario tests?
- [ ] Are Teams adaptive card notifications sent correctly?

<br>

In the next step, you will add an email-received trigger. ➡️ [Part 4: Add an email-received trigger]({{ '/en/chapters/sp1-4-trigger/' | relative_url }})
