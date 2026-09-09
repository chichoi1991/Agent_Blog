---
layout: chapter
lang: en
date: 2026-04-17
title: "Excel data filtering (advanced)"
short_title: "Excel filtering"
description: "Basics #3: Autonomous agent - Excel data filtering (advanced)"
order: 6
category: workshop
parent: "ws3"
---

## Step 6: Excel data filtering (advanced)

# 6. Excel data filtering + AI Prompt integration (advanced)

> **Previous step:** [5. Add an AI Prompt tool](./5.%20AI%20Prompt%20도구%20추가.md) | **Next step:** [7. Deploy to Teams channels](./7.%20Teams%20배포.md)

> ⚠️ **This is an advanced lab.** Proceed after completing the basic labs (Steps 1-5).

---

## Goal of this lab

Implement a pattern that filters **data rows that match the user's situation and level** from an Excel file stored in SharePoint,  
and passes that data to an **AI Prompt tool** to generate a personalized response.

```
User question
    ↓
Agent identifies the user's level and situation
    ↓
Filtering-based data lookup through the Excel connector (List rows present in a table)
    ↓
Filtered data → passed to the AI Prompt tool
    ↓
Personalized HTML response generated
```

<br>

---

## 1. Prepare Excel data

### 1-1. Design the Excel file structure

The Excel file for the lab is currently uploaded to SharePoint.
The Excel range must be converted to a table. (Ctrl + T)

Example

| Column | Description | Example value |
|-----------|------|---------|
| `ID` | Unique identifier | 1, 2, 3 ... |
| `Category` | Data category | New hire, intermediate user, expert |
| `Level` | Difficulty/level | Basic, intermediate, advanced |
| `Title` | Item title | "Excel basics" |
| `Content` | Details | Description text |
| `Tags` | Search tags | "Excel, productivity tools, basics" |

> In the actual lab, use the Excel file provided by the instructor.

<br>

### 1-2. Upload Excel to SharePoint

1. Go to the SharePoint site → document library
2. Upload the Excel file with the **Upload** button
3. Note the file path (required when registering the Knowledge source)

<br>

---

## 2. Query the table through the Excel connector

Go to agent overview → **Tools** → **+ Add a tool** → select **Excel Online (Business)**.
Next, select **List rows present in a table**.
> If the table is large and you are using filtering, you can also consider using **Get a row** or a script to retrieve data.

Add the tool, then enter the connector name and description in the detailed information.

| Setting | Value |
|-----------|------|
| `Name` | Seoul regional electricity fee lookup | 
| `Description` | Use this when you need analysis of electricity usage by district in Seoul and need to query the source time-series data.
 | 

![1]({{ '/assets/image/ws3/6-2.png' | relative_url }})



Next, in the **Inputs** pane, enter the SharePoint path and table for the uploaded Excel file, then save.
| Setting | Fill using | Value |
|-----------|------|---------|
| `Location` | Custom value | SharePoint site |
| `Document Library` | Custom value | SharePoint file library |
| `File` | Custom value | File title |
| `Table` | Custom value | "Table name" |


![1]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20024129.png)

After entering the basic information, click [+ Add input] as shown below to add Filter Query.

![1]({{ site.baseurl }}/assets/image/ws3/6-1.png)

The purpose of the filter query is to retrieve only the required data, because if the Excel file contains too much data it cannot be processed due to token limits.

The AI writes the query automatically, but it needs descriptions of the columns and keys to use. Enter the following in Additional details.

```
An ODATA filter query to restrict the entries returned.
Target column: select one of [YearMonth | District].
Target Key Value: The input value changes depending on the Key Column.
YearMonth uses the YYYYMM format.
For District, select one of the following: [All, Gangnam-gu, Gangdong-gu, Gangbuk-gu, Gangseo-gu, Gwanak-gu, Gwangjin-gu, Guro-gu, Geumcheon-gu, Nowon-gu, Dobong-gu, Dongdaemun-gu, Dongjak-gu, Mapo-gu, Seodaemun-gu, Seocho-gu, Seongdong-gu, Seongbuk-gu, Songpa-gu, Yangcheon-gu, Yeongdeungpo-gu, Yongsan-gu, Eunpyeong-gu, Jongno-gu, Jung-gu, Jungnang-gu] 
```

![1]({{ site.baseurl }}/assets/image/ws3/6-2.png)

After that, if you query with a prompt to confirm that it works, you can see that the agent correctly writes the query and retrieves the data.
```
Compare electricity usage between Dongdaemun-gu and Seoul
```

![1]({{ site.baseurl }}/assets/image/ws3/6-3.png)


<br>

---

## 3. Use the AI Prompt tool

Add a separate AI Prompt tool that receives Excel data and generates a personalized response for the user.

### 3-1. Add a new AI Prompt tool

Select Tools → **+ Add a tool** → **Prompt**, and configure it as follows.

**Tool name:**
```
Time-series data analysis prompt
```
**Model:**
```
Choose any model you want
```

**Output format**
```
On the right side of the model response pane, change the output from basic text to JSON.
```
![1]({{ '/assets/image/ws3/6-8.png' | relative_url }})


**Important! How to enter variables** <br>
The prompt below requires data that the agent enters. (User request and time-series data) After entering the prompt below into the window,
delete the [Request] and [RAW_Data] parts and press / as shown in the image to specify them as text variables.

![1]({{ site.baseurl }}/assets/image/ws3/6-4.png)

![1]({{ site.baseurl }}/assets/image/ws3/6-5.png)

> Sample values are listed below after you scroll down in the prompt.

**Prompt:**

```
You are a time-series data analysis expert.
Based on the raw data imported from an Excel table, extract data insights that match the user's request.

Create two outputs: one in a text format that the user can read immediately,
and one in an HTML format that can be sent directly by email.
Respond in JSON format.



## Input
- User request: [Request]
- Time-series raw data: [RAW_Data]

## Analysis rules
1. First identify the user's request, and select only data rows related to the request.
2. Derive insights from the selected data using the following perspectives:
   - Sum, average, maximum/minimum values and the corresponding time points
   - Trend judgment (increase/decrease/stable)
   - Identify outliers (values deviating by ±30% or more from the average)
   - Major patterns (by day of week, month, season, and so on)
3. Never guess or generate values that do not exist in the data.
4. Include thousands separators in numbers and clearly indicate units.

## Output format
Respond using the following structure.

### 📊 Analysis overview
- Analysis target: [Data range or topic]
- Analysis period: [Start date ~ end date]
- Data count: [Number of selected rows]

### 📋 Key summary
| Metric | Value |
|------|-----|
| Sum | [Value + unit] |
| Average | [Value + unit] |
| Maximum | [Value + unit] ([Time point]) |
| Minimum | [Value + unit] ([Time point]) |

### 💡 Insights
Write each insight in exactly the following format:

**[Insight 1 title]**
- Details: [Description of analysis result]
- Supporting data: [Specific data value and time point used to derive the insight]

**[Insight 2 title]**
- Details: [Description of analysis result]
- Supporting data: [Specific data value and time point used to derive the insight]

(Write only as many insights as the data supports)

### 📈 Visualization (if applicable)
If there is a chart generated by the code interpreter, include it here.

### ⚠️ Outliers / notes
- [Outlier value], [Time point] — [Deviation from average %]

### 🔍 Supporting data details
Summarize the key data used for analysis in a table:

| [Time column] | [Value column] | Notes |
|-----------|---------|------|
| [Time point] | [Value] | [Above/below average/outlier, etc.] |

## Notes
- If the user specifies a region, period, or condition, analyze only that scope.
- If there is not enough data to perform a reliable analysis, state that limitation.
- If the supporting data details table exceeds 20 rows, show only the top/bottom key items and summarize the rest with counts and averages.

```

<br>

Sample data - request

```
Compare and analyze electricity usage for all of Seoul and Dongdaemun-gu
```

Sample data - RAW_Data
```
[
  {
    "@odata.etag": "",
    "ItemInternalId": "a9a7125c-6b1a-42ac-9b45-ad1a3efa6861",
    "Average household electricity bill (KRW)": "30,224 ",
    "Average household electricity usage (kWh)": "232 ",
    "YearMonth": "202301",
    "Households covered": "194,302 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "70f81c9a-98fb-487b-b427-f62050c27e9a",
    "Average household electricity bill (KRW)": "30,163 ",
    "Average household electricity usage (kWh)": "222 ",
    "YearMonth": "202302",
    "Households covered": "195,983 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "17eee3cc-2b36-4776-be0d-0c05935a29f3",
    "Average household electricity bill (KRW)": "23,822 ",
    "Average household electricity usage (kWh)": "190 ",
    "YearMonth": "202303",
    "Households covered": "196,079 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "84d58cb9-8957-45cf-a80a-1d49087b87ed",
    "Average household electricity bill (KRW)": "24,622 ",
    "Average household electricity usage (kWh)": "195 ",
    "YearMonth": "202304",
    "Households covered": "196,216 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "3dd404bb-982c-47e7-9a95-0b3cd60f7fcd",
    "Average household electricity bill (KRW)": "23,181 ",
    "Average household electricity usage (kWh)": "186 ",
    "YearMonth": "202305",
    "Households covered": "196,276 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "708bea58-396a-4cd9-bd3a-e66f2898f4f2",
    "Average household electricity bill (KRW)": "26,628 ",
    "Average household electricity usage (kWh)": "200 ",
    "YearMonth": "202306",
    "Households covered": "196,327 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "fc18e187-a144-4c49-b28c-f93627fd0ccd",
    "Average household electricity bill (KRW)": "34,178 ",
    "Average household electricity usage (kWh)": "245 ",
    "YearMonth": "202307",
    "Households covered": "196,389 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "c689efb0-ed7a-40bf-bd9c-611818d11ede",
    "Average household electricity bill (KRW)": "46,034 ",
    "Average household electricity usage (kWh)": "312 ",
    "YearMonth": "202308",
    "Households covered": "196,419 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "be881ac8-9ec2-4901-9a00-7632705accb9",
    "Average household electricity bill (KRW)": "41,215 ",
    "Average household electricity usage (kWh)": "282 ",
    "YearMonth": "202309",
    "Households covered": "196,956 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "d86b40d9-804c-4092-a932-a4be47152e96",
    "Average household electricity bill (KRW)": "28,995 ",
    "Average household electricity usage (kWh)": "210 ",
    "YearMonth": "202310",
    "Households covered": "196,957 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "36dfb5ad-71a9-47ea-a06b-ebdfa7ec37e6",
    "Average household electricity bill (KRW)": "26,603 ",
    "Average household electricity usage (kWh)": "198 ",
    "YearMonth": "202311",
    "Households covered": "197,132 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "43a9b3fc-e849-44a5-9dee-c78365c00a83",
    "Average household electricity bill (KRW)": "29,087 ",
    "Average household electricity usage (kWh)": "211 ",
    "YearMonth": "202312",
    "Households covered": "197,700 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "f9e2261d-7541-4733-a87f-db920c7a2fb1",
    "Average household electricity bill (KRW)": "33,259 ",
    "Average household electricity usage (kWh)": "229 ",
    "YearMonth": "202401",
    "Households covered": "197,901 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "6d642c15-d3ff-4455-827a-145b9f4e8e18",
    "Average household electricity bill (KRW)": "32,109 ",
    "Average household electricity usage (kWh)": "223 ",
    "YearMonth": "202402",
    "Households covered": "198,194 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "7f3dd0d1-112a-4e4f-9272-4fd30ff0286d",
    "Average household electricity bill (KRW)": "27,388 ",
    "Average household electricity usage (kWh)": "201 ",
    "YearMonth": "202403",
    "Households covered": "198,314 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "dd235af7-88eb-4cc6-aa00-712aac8a6ae3",
    "Average household electricity bill (KRW)": "27,263 ",
    "Average household electricity usage (kWh)": "200 ",
    "YearMonth": "202404",
    "Households covered": "199,178 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "0f197c03-e6d6-4b62-be5b-8087f08f1cb3",
    "Average household electricity bill (KRW)": "24,417 ",
    "Average household electricity usage (kWh)": "184 ",
    "YearMonth": "202405",
    "Households covered": "201,848 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "493046b6-4a8e-41dc-a043-78974111c8cf",
    "Average household electricity bill (KRW)": "27,357 ",
    "Average household electricity usage (kWh)": "201 ",
    "YearMonth": "202406",
    "Households covered": "201,939 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "bb1a1e1b-0394-4299-9543-292ef306bbe5",
    "Average household electricity bill (KRW)": "34,833 ",
    "Average household electricity usage (kWh)": "247 ",
    "YearMonth": "202407",
    "Households covered": "202,080 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "6fbaf371-c2ea-4683-8a14-f0c54d842b91",
    "Average household electricity bill (KRW)": "50,115 ",
    "Average household electricity usage (kWh)": "328 ",
    "YearMonth": "202408",
    "Households covered": "202,180 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "046988e3-246c-4770-9623-fa8c489b06ac",
    "Average household electricity bill (KRW)": "52,793 ",
    "Average household electricity usage (kWh)": "330 ",
    "YearMonth": "202409",
    "Households covered": "202,506 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "e874ec4c-0f21-4f8b-826a-7d27de0fe2c9",
    "Average household electricity bill (KRW)": "33,768 ",
    "Average household electricity usage (kWh)": "231 ",
    "YearMonth": "202410",
    "Households covered": "202,742 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "ef619fb3-6c22-4a08-9f9d-917602a5fb46",
    "Average household electricity bill (KRW)": "25,785 ",
    "Average household electricity usage (kWh)": "192 ",
    "YearMonth": "202411",
    "Households covered": "203,408 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "992eb523-daf5-4ba5-8b68-a2fdd728d070",
    "Average household electricity bill (KRW)": "27,517 ",
    "Average household electricity usage (kWh)": "201 ",
    "YearMonth": "202412",
    "Households covered": "205,337 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "d7b3994c-63d1-454c-9f55-280245b2a58a",
    "Average household electricity bill (KRW)": "32,231 ",
    "Average household electricity usage (kWh)": "222 ",
    "YearMonth": "202501",
    "Households covered": "205,164 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "f820a952-572e-4802-9e71-e48d8118177e",
    "Average household electricity bill (KRW)": "32,319 ",
    "Average household electricity usage (kWh)": "222 ",
    "YearMonth": "202502",
    "Households covered": "204,677 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "4ce58f24-1149-44be-98e6-2db1a61b0574",
    "Average household electricity bill (KRW)": "26,712 ",
    "Average household electricity usage (kWh)": "196 ",
    "YearMonth": "202503",
    "Households covered": "204,617 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "4842fd4a-fbbb-4ddc-880a-f9e06d5dbce2",
    "Average household electricity bill (KRW)": "27,237 ",
    "Average household electricity usage (kWh)": "200 ",
    "YearMonth": "202504",
    "Households covered": "204,190 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "bbfb90a6-86ed-49cf-816d-5c56af806a70",
    "Average household electricity bill (KRW)": "24,931 ",
    "Average household electricity usage (kWh)": "187 ",
    "YearMonth": "202505",
    "Households covered": "204,016 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "66a8ffbf-2322-439d-af80-9148b21ed0df",
    "Average household electricity bill (KRW)": "27,877 ",
    "Average household electricity usage (kWh)": "205 ",
    "YearMonth": "202506",
    "Households covered": "203,946 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "5a79e04a-9c2b-4918-9b78-a9bc54216806",
    "Average household electricity bill (KRW)": "39,365 ",
    "Average household electricity usage (kWh)": "268 ",
    "YearMonth": "202507",
    "Households covered": "203,891 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "199cd259-a7b2-41c8-8439-e205e50d90e9",
    "Average household electricity bill (KRW)": "53,497 ",
    "Average household electricity usage (kWh)": "344 ",
    "YearMonth": "202508",
    "Households covered": "203,974 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "af5aec09-9950-45ce-9cbb-8bbeb2147bcf",
    "Average household electricity bill (KRW)": "49,015 ",
    "Average household electricity usage (kWh)": "316 ",
    "YearMonth": "202509",
    "Households covered": "204,025 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "ddcb252d-dba8-4859-8640-b8ae84c943d4",
    "Average household electricity bill (KRW)": "29,609 ",
    "Average household electricity usage (kWh)": "211 ",
    "YearMonth": "202510",
    "Households covered": "209,568 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "f54527e4-9a46-4043-85e6-297ce19a35fd",
    "Average household electricity bill (KRW)": "26,430 ",
    "Average household electricity usage (kWh)": "195 ",
    "YearMonth": "202511",
    "Households covered": "209,734 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "b25469c0-e33d-406c-95e9-b545706db0a6",
    "Average household electricity bill (KRW)": "27,894 ",
    "Average household electricity usage (kWh)": "202 ",
    "YearMonth": "202512",
    "Households covered": "209,627 ",
    "District": "Dongdaemun-gu",
    "City/Province": "Seoul"
  }
]

[
  {
    "@odata.etag": "",
    "ItemInternalId": "6939a4c2-678b-4a93-9107-c5f7448306ab",
    "Average household electricity bill (KRW)": "33,227 ",
    "Average household electricity usage (kWh)": "247 ",
    "YearMonth": "202301",
    "Households covered": "4,807,229 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "d32622b9-7f28-4018-87ce-cc07f817ca64",
    "Average household electricity bill (KRW)": "32,909 ",
    "Average household electricity usage (kWh)": "238 ",
    "YearMonth": "202302",
    "Households covered": "4,813,757 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "10c974c4-cb64-40cf-bdb9-5e3d865de5db",
    "Average household electricity bill (KRW)": "26,256 ",
    "Average household electricity usage (kWh)": "204 ",
    "YearMonth": "202303",
    "Households covered": "4,818,859 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "d62630a0-8cf8-4551-a0cc-7751035f3491",
    "Average household electricity bill (KRW)": "27,168 ",
    "Average household electricity usage (kWh)": "210 ",
    "YearMonth": "202304",
    "Households covered": "4,821,114 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "78f83354-e009-4e16-88ca-4a745cad6f99",
    "Average household electricity bill (KRW)": "25,795 ",
    "Average household electricity usage (kWh)": "201 ",
    "YearMonth": "202305",
    "Households covered": "4,825,130 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "256af787-78fc-486c-b846-0aa53bd6021e",
    "Average household electricity bill (KRW)": "29,845 ",
    "Average household electricity usage (kWh)": "216 ",
    "YearMonth": "202306",
    "Households covered": "4,828,850 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "73ed35ac-fd59-48b7-8237-a9eceb719ed7",
    "Average household electricity bill (KRW)": "38,599 ",
    "Average household electricity usage (kWh)": "266 ",
    "YearMonth": "202307",
    "Households covered": "4,834,192 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "ca72f819-f4da-4fa2-8097-81c7cf9223a7",
    "Average household electricity bill (KRW)": "52,895 ",
    "Average household electricity usage (kWh)": "340 ",
    "YearMonth": "202308",
    "Households covered": "4,838,055 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "e1b6e367-578b-4864-8b5b-58e49363985a",
    "Average household electricity bill (KRW)": "43,930 ",
    "Average household electricity usage (kWh)": "",
    "YearMonth": "202309",
    "Households covered": "4,843,078 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "923f18bd-d11d-4975-82a0-a34cd2665360",
    "Average household electricity bill (KRW)": "28,357 ",
    "Average household electricity usage (kWh)": "216 ",
    "YearMonth": "202310",
    "Households covered": "4,848,664 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "db877330-fef3-4fbf-b054-cc24895d98a5",
    "Average household electricity bill (KRW)": "29,064 ",
    "Average household electricity usage (kWh)": "211 ",
    "YearMonth": "202311",
    "Households covered": "4,857,156 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "f36922ea-9878-440c-8553-452936872c54",
    "Average household electricity bill (KRW)": "31,804 ",
    "Average household electricity usage (kWh)": "224 ",
    "YearMonth": "202312",
    "Households covered": "4,870,737 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "4537edd5-7670-49f2-a900-3f99072fa1d0",
    "Average household electricity bill (KRW)": "35,834 ",
    "Average household electricity usage (kWh)": "242 ",
    "YearMonth": "202401",
    "Households covered": "4,874,414 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "392bb5a9-6aed-452b-ba63-34b881ae86b3",
    "Average household electricity bill (KRW)": "34,401 ",
    "Average household electricity usage (kWh)": "235 ",
    "YearMonth": "202402",
    "Households covered": "4,877,485 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "c7bb47af-b643-4ce9-a6d9-84011eab5ff3",
    "Average household electricity bill (KRW)": "29,629 ",
    "Average household electricity usage (kWh)": "213 ",
    "YearMonth": "202403",
    "Households covered": "4,880,106 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "c184a54d-d4c3-4126-88c6-4f2d0e9bf822",
    "Average household electricity bill (KRW)": "29,231 ",
    "Average household electricity usage (kWh)": "211 ",
    "YearMonth": "202404",
    "Households covered": "4,882,040 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "7915016c-e157-4bad-aa1d-6a958d2b4e89",
    "Average household electricity bill (KRW)": "26,766 ",
    "Average household electricity usage (kWh)": "198 ",
    "YearMonth": "202405",
    "Households covered": "4,885,748 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "657c09fe-4a5b-4848-bb4a-4acd3d48a868",
    "Average household electricity bill (KRW)": "30,627 ",
    "Average household electricity usage (kWh)": "218 ",
    "YearMonth": "202406",
    "Households covered": "4,890,087 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "51398cd9-ba01-4cb4-b70f-3e4d0a0db209",
    "Average household electricity bill (KRW)": "38,917 ",
    "Average household electricity usage (kWh)": "267 ",
    "YearMonth": "202407",
    "Households covered": "4,890,640 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "6ef64d6c-b105-4f3b-a38d-1be9b81b88ed",
    "Average household electricity bill (KRW)": "59,337 ",
    "Average household electricity usage (kWh)": "364 ",
    "YearMonth": "202408",
    "Households covered": "4,893,594 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "60f23d24-5715-4b74-b56b-35169a0b5275",
    "Average household electricity bill (KRW)": "57,155 ",
    "Average household electricity usage (kWh)": "346 ",
    "YearMonth": "202409",
    "Households covered": "4,897,255 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "0fa5f9c6-49b5-451f-80e1-e95e51b54013",
    "Average household electricity bill (KRW)": "34,668 ",
    "Average household electricity usage (kWh)": "236 ",
    "YearMonth": "202410",
    "Households covered": "4,902,482 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "ee142ab4-944f-4ec7-8481-1b282c351b51",
    "Average household electricity bill (KRW)": "28,440 ",
    "Average household electricity usage (kWh)": "207 ",
    "YearMonth": "202411",
    "Households covered": "4,911,167 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "0523f470-8839-4fda-a902-843a1a28f7ad",
    "Average household electricity bill (KRW)": "31,022 ",
    "Average household electricity usage (kWh)": "219 ",
    "YearMonth": "202412",
    "Households covered": "4,916,320 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "9df71363-8148-44a6-b8b2-35885297729a",
    "Average household electricity bill (KRW)": "35,727 ",
    "Average household electricity usage (kWh)": "241 ",
    "YearMonth": "202501",
    "Households covered": "4,917,321 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "3af629b7-e36f-4059-963b-6ff552375fc9",
    "Average household electricity bill (KRW)": "35,495 ",
    "Average household electricity usage (kWh)": "240 ",
    "YearMonth": "202502",
    "Households covered": "4,922,253 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "6eeb9c27-eb09-4372-ac23-68d592aafbc2",
    "Average household electricity bill (KRW)": "29,199 ",
    "Average household electricity usage (kWh)": "210 ",
    "YearMonth": "202503",
    "Households covered": "4,924,777 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "2fe4fea9-a293-4f1d-850d-75dbdc9b6a4e",
    "Average household electricity bill (KRW)": "29,483 ",
    "Average household electricity usage (kWh)": "212 ",
    "YearMonth": "202504",
    "Households covered": "4,930,624 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "b09054a8-e6ca-42cd-80fe-aaa595776b86",
    "Average household electricity bill (KRW)": "27,122 ",
    "Average household electricity usage (kWh)": "200 ",
    "YearMonth": "202505",
    "Households covered": "4,933,187 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "8948f142-3fb2-4f74-95d2-7bb281e72d68",
    "Average household electricity bill (KRW)": "30,966 ",
    "Average household electricity usage (kWh)": "220 ",
    "YearMonth": "202506",
    "Households covered": "4,933,796 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "400c854e-7211-440f-8522-da9e55e01652",
    "Average household electricity bill (KRW)": "44,646 ",
    "Average household electricity usage (kWh)": "293 ",
    "YearMonth": "202507",
    "Households covered": "4,935,855 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "81f19c56-1201-4123-b782-a68d7cfce172",
    "Average household electricity bill (KRW)": "60,145 ",
    "Average household electricity usage (kWh)": "370 ",
    "YearMonth": "202508",
    "Households covered": "4,935,553 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "17201432-204d-40aa-ace7-81f6ae193260",
    "Average household electricity bill (KRW)": "51,218 ",
    "Average household electricity usage (kWh)": "323 ",
    "YearMonth": "202509",
    "Households covered": "4,937,802 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "772455fe-150f-4e2a-9c1d-b6f93cc0c0e3",
    "Average household electricity bill (KRW)": "31,304 ",
    "Average household electricity usage (kWh)": "222 ",
    "YearMonth": "202510",
    "Households covered": "4,948,833 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "4dbc4820-9a4c-42e6-9306-925379bbdc9e",
    "Average household electricity bill (KRW)": "29,340 ",
    "Average household electricity usage (kWh)": "212 ",
    "YearMonth": "202511",
    "Households covered": "4,952,949 ",
    "District": "All",
    "City/Province": "Seoul"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "e48302c6-b05e-41f5-b7af-ca9c8d9caeb2",
    "Average household electricity bill (KRW)": "31,411 ",
    "Average household electricity usage (kWh)": "222 ",
    "YearMonth": "202512",
    "Households covered": "4,952,068 ",
    "District": "All",
    "City/Province": "Seoul"
  }
]

```


After entering the input, test it, save it, and add the tool.

Add the tool and variable descriptions as follows.

**Tool description:**
```
Receives the user's level and situational information, then restructures data filtered from Excel into a personalized learning/work guide.
Use this tool when you need to provide content tailored to the user's level.
```

**Input variables:**

| Variable name | Type | Description |
|--------|------|------|
| `Request` | Text | The request and context the user wants analyzed. |
| `RAW_Data` | Text | The raw time-series data. |
---

![6-9]({{ site.baseurl }}/assets/image/ws3/6-9.png)


## 4. Update Instructions

Add the following workflow to the agent Instructions.


```
### 📊 When a regional electricity usage analysis is requested
When the user requests regional electricity usage analysis:
1. Identify the user's level. 
- If the user explicitly states a level: use that level.   
- If not stated: infer it from the conversation context or ask the user.      
Example: "What level of detail would you like? (New hire / intermediate user / expert)"

2. Call "List rows present in a table" to collect the source data from the Seoul regional electricity usage table.
3. Pass the collected raw data, user request, and context to the "Time-series data analysis prompt" tool. *Important!: You must enter the raw data exactly as-is.
4. Deliver the generated answer to the user.
```

![5]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20092506.png)

<br>

---

## 5. Verify behavior

**Level specified test:**
```
I need an analysis of electricity usage in Dongdaemun-gu. I want to know how different it is compared with Seoul. 
```
→ The agent queries Excel data → calls "Time-series data analysis prompt" → returns an answer

![6-10]({{ site.baseurl }}/assets/image/ws3/6-10.png)

If needed, you can also implement sending the generated HTML directly by email through the email sending tool.

![6-11]({{ site.baseurl }}/assets/image/ws3/6-11.png)

![6-12]({{ site.baseurl }}/assets/image/ws3/6-12.png)



---



> **Learning point:** You learned a pattern for connecting structured data (Excel row/column structure) with generative AI (AI Prompt tool).  
> If you specify the conditions for filtering data (user level, situation) in the Instructions,  
> the agent can provide dynamic, data-driven personalized responses without Power Automate.

<br>



---

> **Next step:** [7. Deploy and test Teams channels](./7.%20Teams%20배포.md)


---

---

← [Previous: Step 5. AI Prompt tool]({{ '/en/chapters/ws3-5-ai-prompt/' | relative_url }}) | [Next: Step 7. Teams deployment]({{ '/en/chapters/ws3-7-teams-deploy/' | relative_url }}) →
