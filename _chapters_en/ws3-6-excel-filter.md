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
Target column: select one of [년월 | 시군구].
Target Key Value: The input value changes depending on the Key Column.
년월 uses the YYYYMM format.
For 시군구, select one of the following: [전체, 강남구, 강동구, 강북구, 강서구, 관악구, 광진구, 구로구, 금천구, 노원구, 도봉구, 동대문구, 동작구, 마포구, 서대문구, 서초구, 성동구, 성북구, 송파구, 양천구, 영등포구, 용산구, 은평구, 종로구, 중구, 중랑구] 
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
delete the [요청사항] and [RAW_Data] parts and press / as shown in the image to specify them as text variables.

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
- User request: [요청사항]
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
    "가구당 평균 전기요금(원)": "30,224 ",
    "가구당 평균 전력 사용량(kWh)": "232 ",
    "년월": "202301",
    "대상가구수(호)": "194,302 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "70f81c9a-98fb-487b-b427-f62050c27e9a",
    "가구당 평균 전기요금(원)": "30,163 ",
    "가구당 평균 전력 사용량(kWh)": "222 ",
    "년월": "202302",
    "대상가구수(호)": "195,983 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "17eee3cc-2b36-4776-be0d-0c05935a29f3",
    "가구당 평균 전기요금(원)": "23,822 ",
    "가구당 평균 전력 사용량(kWh)": "190 ",
    "년월": "202303",
    "대상가구수(호)": "196,079 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "84d58cb9-8957-45cf-a80a-1d49087b87ed",
    "가구당 평균 전기요금(원)": "24,622 ",
    "가구당 평균 전력 사용량(kWh)": "195 ",
    "년월": "202304",
    "대상가구수(호)": "196,216 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "3dd404bb-982c-47e7-9a95-0b3cd60f7fcd",
    "가구당 평균 전기요금(원)": "23,181 ",
    "가구당 평균 전력 사용량(kWh)": "186 ",
    "년월": "202305",
    "대상가구수(호)": "196,276 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "708bea58-396a-4cd9-bd3a-e66f2898f4f2",
    "가구당 평균 전기요금(원)": "26,628 ",
    "가구당 평균 전력 사용량(kWh)": "200 ",
    "년월": "202306",
    "대상가구수(호)": "196,327 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "fc18e187-a144-4c49-b28c-f93627fd0ccd",
    "가구당 평균 전기요금(원)": "34,178 ",
    "가구당 평균 전력 사용량(kWh)": "245 ",
    "년월": "202307",
    "대상가구수(호)": "196,389 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "c689efb0-ed7a-40bf-bd9c-611818d11ede",
    "가구당 평균 전기요금(원)": "46,034 ",
    "가구당 평균 전력 사용량(kWh)": "312 ",
    "년월": "202308",
    "대상가구수(호)": "196,419 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "be881ac8-9ec2-4901-9a00-7632705accb9",
    "가구당 평균 전기요금(원)": "41,215 ",
    "가구당 평균 전력 사용량(kWh)": "282 ",
    "년월": "202309",
    "대상가구수(호)": "196,956 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "d86b40d9-804c-4092-a932-a4be47152e96",
    "가구당 평균 전기요금(원)": "28,995 ",
    "가구당 평균 전력 사용량(kWh)": "210 ",
    "년월": "202310",
    "대상가구수(호)": "196,957 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "36dfb5ad-71a9-47ea-a06b-ebdfa7ec37e6",
    "가구당 평균 전기요금(원)": "26,603 ",
    "가구당 평균 전력 사용량(kWh)": "198 ",
    "년월": "202311",
    "대상가구수(호)": "197,132 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "43a9b3fc-e849-44a5-9dee-c78365c00a83",
    "가구당 평균 전기요금(원)": "29,087 ",
    "가구당 평균 전력 사용량(kWh)": "211 ",
    "년월": "202312",
    "대상가구수(호)": "197,700 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "f9e2261d-7541-4733-a87f-db920c7a2fb1",
    "가구당 평균 전기요금(원)": "33,259 ",
    "가구당 평균 전력 사용량(kWh)": "229 ",
    "년월": "202401",
    "대상가구수(호)": "197,901 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "6d642c15-d3ff-4455-827a-145b9f4e8e18",
    "가구당 평균 전기요금(원)": "32,109 ",
    "가구당 평균 전력 사용량(kWh)": "223 ",
    "년월": "202402",
    "대상가구수(호)": "198,194 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "7f3dd0d1-112a-4e4f-9272-4fd30ff0286d",
    "가구당 평균 전기요금(원)": "27,388 ",
    "가구당 평균 전력 사용량(kWh)": "201 ",
    "년월": "202403",
    "대상가구수(호)": "198,314 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "dd235af7-88eb-4cc6-aa00-712aac8a6ae3",
    "가구당 평균 전기요금(원)": "27,263 ",
    "가구당 평균 전력 사용량(kWh)": "200 ",
    "년월": "202404",
    "대상가구수(호)": "199,178 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "0f197c03-e6d6-4b62-be5b-8087f08f1cb3",
    "가구당 평균 전기요금(원)": "24,417 ",
    "가구당 평균 전력 사용량(kWh)": "184 ",
    "년월": "202405",
    "대상가구수(호)": "201,848 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "493046b6-4a8e-41dc-a043-78974111c8cf",
    "가구당 평균 전기요금(원)": "27,357 ",
    "가구당 평균 전력 사용량(kWh)": "201 ",
    "년월": "202406",
    "대상가구수(호)": "201,939 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "bb1a1e1b-0394-4299-9543-292ef306bbe5",
    "가구당 평균 전기요금(원)": "34,833 ",
    "가구당 평균 전력 사용량(kWh)": "247 ",
    "년월": "202407",
    "대상가구수(호)": "202,080 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "6fbaf371-c2ea-4683-8a14-f0c54d842b91",
    "가구당 평균 전기요금(원)": "50,115 ",
    "가구당 평균 전력 사용량(kWh)": "328 ",
    "년월": "202408",
    "대상가구수(호)": "202,180 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "046988e3-246c-4770-9623-fa8c489b06ac",
    "가구당 평균 전기요금(원)": "52,793 ",
    "가구당 평균 전력 사용량(kWh)": "330 ",
    "년월": "202409",
    "대상가구수(호)": "202,506 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "e874ec4c-0f21-4f8b-826a-7d27de0fe2c9",
    "가구당 평균 전기요금(원)": "33,768 ",
    "가구당 평균 전력 사용량(kWh)": "231 ",
    "년월": "202410",
    "대상가구수(호)": "202,742 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "ef619fb3-6c22-4a08-9f9d-917602a5fb46",
    "가구당 평균 전기요금(원)": "25,785 ",
    "가구당 평균 전력 사용량(kWh)": "192 ",
    "년월": "202411",
    "대상가구수(호)": "203,408 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "992eb523-daf5-4ba5-8b68-a2fdd728d070",
    "가구당 평균 전기요금(원)": "27,517 ",
    "가구당 평균 전력 사용량(kWh)": "201 ",
    "년월": "202412",
    "대상가구수(호)": "205,337 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "d7b3994c-63d1-454c-9f55-280245b2a58a",
    "가구당 평균 전기요금(원)": "32,231 ",
    "가구당 평균 전력 사용량(kWh)": "222 ",
    "년월": "202501",
    "대상가구수(호)": "205,164 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "f820a952-572e-4802-9e71-e48d8118177e",
    "가구당 평균 전기요금(원)": "32,319 ",
    "가구당 평균 전력 사용량(kWh)": "222 ",
    "년월": "202502",
    "대상가구수(호)": "204,677 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "4ce58f24-1149-44be-98e6-2db1a61b0574",
    "가구당 평균 전기요금(원)": "26,712 ",
    "가구당 평균 전력 사용량(kWh)": "196 ",
    "년월": "202503",
    "대상가구수(호)": "204,617 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "4842fd4a-fbbb-4ddc-880a-f9e06d5dbce2",
    "가구당 평균 전기요금(원)": "27,237 ",
    "가구당 평균 전력 사용량(kWh)": "200 ",
    "년월": "202504",
    "대상가구수(호)": "204,190 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "bbfb90a6-86ed-49cf-816d-5c56af806a70",
    "가구당 평균 전기요금(원)": "24,931 ",
    "가구당 평균 전력 사용량(kWh)": "187 ",
    "년월": "202505",
    "대상가구수(호)": "204,016 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "66a8ffbf-2322-439d-af80-9148b21ed0df",
    "가구당 평균 전기요금(원)": "27,877 ",
    "가구당 평균 전력 사용량(kWh)": "205 ",
    "년월": "202506",
    "대상가구수(호)": "203,946 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "5a79e04a-9c2b-4918-9b78-a9bc54216806",
    "가구당 평균 전기요금(원)": "39,365 ",
    "가구당 평균 전력 사용량(kWh)": "268 ",
    "년월": "202507",
    "대상가구수(호)": "203,891 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "199cd259-a7b2-41c8-8439-e205e50d90e9",
    "가구당 평균 전기요금(원)": "53,497 ",
    "가구당 평균 전력 사용량(kWh)": "344 ",
    "년월": "202508",
    "대상가구수(호)": "203,974 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "af5aec09-9950-45ce-9cbb-8bbeb2147bcf",
    "가구당 평균 전기요금(원)": "49,015 ",
    "가구당 평균 전력 사용량(kWh)": "316 ",
    "년월": "202509",
    "대상가구수(호)": "204,025 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "ddcb252d-dba8-4859-8640-b8ae84c943d4",
    "가구당 평균 전기요금(원)": "29,609 ",
    "가구당 평균 전력 사용량(kWh)": "211 ",
    "년월": "202510",
    "대상가구수(호)": "209,568 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "f54527e4-9a46-4043-85e6-297ce19a35fd",
    "가구당 평균 전기요금(원)": "26,430 ",
    "가구당 평균 전력 사용량(kWh)": "195 ",
    "년월": "202511",
    "대상가구수(호)": "209,734 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "b25469c0-e33d-406c-95e9-b545706db0a6",
    "가구당 평균 전기요금(원)": "27,894 ",
    "가구당 평균 전력 사용량(kWh)": "202 ",
    "년월": "202512",
    "대상가구수(호)": "209,627 ",
    "시군구": "동대문구",
    "시도": "서울특별시"
  }
]

[
  {
    "@odata.etag": "",
    "ItemInternalId": "6939a4c2-678b-4a93-9107-c5f7448306ab",
    "가구당 평균 전기요금(원)": "33,227 ",
    "가구당 평균 전력 사용량(kWh)": "247 ",
    "년월": "202301",
    "대상가구수(호)": "4,807,229 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "d32622b9-7f28-4018-87ce-cc07f817ca64",
    "가구당 평균 전기요금(원)": "32,909 ",
    "가구당 평균 전력 사용량(kWh)": "238 ",
    "년월": "202302",
    "대상가구수(호)": "4,813,757 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "10c974c4-cb64-40cf-bdb9-5e3d865de5db",
    "가구당 평균 전기요금(원)": "26,256 ",
    "가구당 평균 전력 사용량(kWh)": "204 ",
    "년월": "202303",
    "대상가구수(호)": "4,818,859 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "d62630a0-8cf8-4551-a0cc-7751035f3491",
    "가구당 평균 전기요금(원)": "27,168 ",
    "가구당 평균 전력 사용량(kWh)": "210 ",
    "년월": "202304",
    "대상가구수(호)": "4,821,114 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "78f83354-e009-4e16-88ca-4a745cad6f99",
    "가구당 평균 전기요금(원)": "25,795 ",
    "가구당 평균 전력 사용량(kWh)": "201 ",
    "년월": "202305",
    "대상가구수(호)": "4,825,130 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "256af787-78fc-486c-b846-0aa53bd6021e",
    "가구당 평균 전기요금(원)": "29,845 ",
    "가구당 평균 전력 사용량(kWh)": "216 ",
    "년월": "202306",
    "대상가구수(호)": "4,828,850 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "73ed35ac-fd59-48b7-8237-a9eceb719ed7",
    "가구당 평균 전기요금(원)": "38,599 ",
    "가구당 평균 전력 사용량(kWh)": "266 ",
    "년월": "202307",
    "대상가구수(호)": "4,834,192 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "ca72f819-f4da-4fa2-8097-81c7cf9223a7",
    "가구당 평균 전기요금(원)": "52,895 ",
    "가구당 평균 전력 사용량(kWh)": "340 ",
    "년월": "202308",
    "대상가구수(호)": "4,838,055 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "e1b6e367-578b-4864-8b5b-58e49363985a",
    "가구당 평균 전기요금(원)": "43,930 ",
    "가구당 평균 전력 사용량(kWh)": "",
    "년월": "202309",
    "대상가구수(호)": "4,843,078 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "923f18bd-d11d-4975-82a0-a34cd2665360",
    "가구당 평균 전기요금(원)": "28,357 ",
    "가구당 평균 전력 사용량(kWh)": "216 ",
    "년월": "202310",
    "대상가구수(호)": "4,848,664 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "db877330-fef3-4fbf-b054-cc24895d98a5",
    "가구당 평균 전기요금(원)": "29,064 ",
    "가구당 평균 전력 사용량(kWh)": "211 ",
    "년월": "202311",
    "대상가구수(호)": "4,857,156 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "f36922ea-9878-440c-8553-452936872c54",
    "가구당 평균 전기요금(원)": "31,804 ",
    "가구당 평균 전력 사용량(kWh)": "224 ",
    "년월": "202312",
    "대상가구수(호)": "4,870,737 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "4537edd5-7670-49f2-a900-3f99072fa1d0",
    "가구당 평균 전기요금(원)": "35,834 ",
    "가구당 평균 전력 사용량(kWh)": "242 ",
    "년월": "202401",
    "대상가구수(호)": "4,874,414 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "392bb5a9-6aed-452b-ba63-34b881ae86b3",
    "가구당 평균 전기요금(원)": "34,401 ",
    "가구당 평균 전력 사용량(kWh)": "235 ",
    "년월": "202402",
    "대상가구수(호)": "4,877,485 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "c7bb47af-b643-4ce9-a6d9-84011eab5ff3",
    "가구당 평균 전기요금(원)": "29,629 ",
    "가구당 평균 전력 사용량(kWh)": "213 ",
    "년월": "202403",
    "대상가구수(호)": "4,880,106 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "c184a54d-d4c3-4126-88c6-4f2d0e9bf822",
    "가구당 평균 전기요금(원)": "29,231 ",
    "가구당 평균 전력 사용량(kWh)": "211 ",
    "년월": "202404",
    "대상가구수(호)": "4,882,040 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "7915016c-e157-4bad-aa1d-6a958d2b4e89",
    "가구당 평균 전기요금(원)": "26,766 ",
    "가구당 평균 전력 사용량(kWh)": "198 ",
    "년월": "202405",
    "대상가구수(호)": "4,885,748 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "657c09fe-4a5b-4848-bb4a-4acd3d48a868",
    "가구당 평균 전기요금(원)": "30,627 ",
    "가구당 평균 전력 사용량(kWh)": "218 ",
    "년월": "202406",
    "대상가구수(호)": "4,890,087 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "51398cd9-ba01-4cb4-b70f-3e4d0a0db209",
    "가구당 평균 전기요금(원)": "38,917 ",
    "가구당 평균 전력 사용량(kWh)": "267 ",
    "년월": "202407",
    "대상가구수(호)": "4,890,640 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "6ef64d6c-b105-4f3b-a38d-1be9b81b88ed",
    "가구당 평균 전기요금(원)": "59,337 ",
    "가구당 평균 전력 사용량(kWh)": "364 ",
    "년월": "202408",
    "대상가구수(호)": "4,893,594 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "60f23d24-5715-4b74-b56b-35169a0b5275",
    "가구당 평균 전기요금(원)": "57,155 ",
    "가구당 평균 전력 사용량(kWh)": "346 ",
    "년월": "202409",
    "대상가구수(호)": "4,897,255 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "0fa5f9c6-49b5-451f-80e1-e95e51b54013",
    "가구당 평균 전기요금(원)": "34,668 ",
    "가구당 평균 전력 사용량(kWh)": "236 ",
    "년월": "202410",
    "대상가구수(호)": "4,902,482 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "ee142ab4-944f-4ec7-8481-1b282c351b51",
    "가구당 평균 전기요금(원)": "28,440 ",
    "가구당 평균 전력 사용량(kWh)": "207 ",
    "년월": "202411",
    "대상가구수(호)": "4,911,167 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "0523f470-8839-4fda-a902-843a1a28f7ad",
    "가구당 평균 전기요금(원)": "31,022 ",
    "가구당 평균 전력 사용량(kWh)": "219 ",
    "년월": "202412",
    "대상가구수(호)": "4,916,320 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "9df71363-8148-44a6-b8b2-35885297729a",
    "가구당 평균 전기요금(원)": "35,727 ",
    "가구당 평균 전력 사용량(kWh)": "241 ",
    "년월": "202501",
    "대상가구수(호)": "4,917,321 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "3af629b7-e36f-4059-963b-6ff552375fc9",
    "가구당 평균 전기요금(원)": "35,495 ",
    "가구당 평균 전력 사용량(kWh)": "240 ",
    "년월": "202502",
    "대상가구수(호)": "4,922,253 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "6eeb9c27-eb09-4372-ac23-68d592aafbc2",
    "가구당 평균 전기요금(원)": "29,199 ",
    "가구당 평균 전력 사용량(kWh)": "210 ",
    "년월": "202503",
    "대상가구수(호)": "4,924,777 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "2fe4fea9-a293-4f1d-850d-75dbdc9b6a4e",
    "가구당 평균 전기요금(원)": "29,483 ",
    "가구당 평균 전력 사용량(kWh)": "212 ",
    "년월": "202504",
    "대상가구수(호)": "4,930,624 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "b09054a8-e6ca-42cd-80fe-aaa595776b86",
    "가구당 평균 전기요금(원)": "27,122 ",
    "가구당 평균 전력 사용량(kWh)": "200 ",
    "년월": "202505",
    "대상가구수(호)": "4,933,187 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "8948f142-3fb2-4f74-95d2-7bb281e72d68",
    "가구당 평균 전기요금(원)": "30,966 ",
    "가구당 평균 전력 사용량(kWh)": "220 ",
    "년월": "202506",
    "대상가구수(호)": "4,933,796 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "400c854e-7211-440f-8522-da9e55e01652",
    "가구당 평균 전기요금(원)": "44,646 ",
    "가구당 평균 전력 사용량(kWh)": "293 ",
    "년월": "202507",
    "대상가구수(호)": "4,935,855 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "81f19c56-1201-4123-b782-a68d7cfce172",
    "가구당 평균 전기요금(원)": "60,145 ",
    "가구당 평균 전력 사용량(kWh)": "370 ",
    "년월": "202508",
    "대상가구수(호)": "4,935,553 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "17201432-204d-40aa-ace7-81f6ae193260",
    "가구당 평균 전기요금(원)": "51,218 ",
    "가구당 평균 전력 사용량(kWh)": "323 ",
    "년월": "202509",
    "대상가구수(호)": "4,937,802 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "772455fe-150f-4e2a-9c1d-b6f93cc0c0e3",
    "가구당 평균 전기요금(원)": "31,304 ",
    "가구당 평균 전력 사용량(kWh)": "222 ",
    "년월": "202510",
    "대상가구수(호)": "4,948,833 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "4dbc4820-9a4c-42e6-9306-925379bbdc9e",
    "가구당 평균 전기요금(원)": "29,340 ",
    "가구당 평균 전력 사용량(kWh)": "212 ",
    "년월": "202511",
    "대상가구수(호)": "4,952,949 ",
    "시군구": "전체",
    "시도": "서울특별시"
  },
  {
    "@odata.etag": "",
    "ItemInternalId": "e48302c6-b05e-41f5-b7af-ca9c8d9caeb2",
    "가구당 평균 전기요금(원)": "31,411 ",
    "가구당 평균 전력 사용량(kWh)": "222 ",
    "년월": "202512",
    "대상가구수(호)": "4,952,068 ",
    "시군구": "전체",
    "시도": "서울특별시"
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
| `요청 사항` | Text | The request and context the user wants analyzed. |
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
