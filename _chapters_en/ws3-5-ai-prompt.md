---
layout: chapter
lang: en
date: 2026-04-08
title: "Add an AI Prompt tool"
short_title: "AI Prompt tool"
description: "Basics #3: Autonomous agent - Add an AI Prompt tool"
order: 5
category: workshop
parent: "ws3"
---

## Step 5: Add an AI Prompt tool

# 5. Add an AI Prompt tool and design HTML responses

> **Previous step:** [4. Add the ThinQ MCP tool](./4.%20ThinQ%20MCP%20도구%20추가.md) | **Next step:** [6. Excel data filtering (advanced)](./6.%20Excel%20데이터%20필터링.md)

---

## What is an AI Prompt tool (Generative Actions)?

For code writing or sending email in HTML format, an agent can generate code and process the task by default. In that case, however, code with a different style is generated every time the task runs.

This consumes many tokens because code patterns must be placed in the Instructions context for orchestration, and it is difficult to guarantee consistency in the generated code.

An **AI Prompt tool** is a Copilot Studio feature that registers a predefined prompt as an agent tool.  

With this tool, the agent can call it based on the user request and obtain **AI-generated output in a fixed format (text, HTML, and so on)**.

| Item | Description |
|------|------|
| **Registration location** | Agent → Tools → AI Prompt |
| **Input** | Prompt template + runtime variables |
| **Output** | AI-generated text (HTML, Markdown, JSON, and other formats can be specified freely) |
| **Example uses** | Generate product comparison table HTML, draft reports, generate summary cards, and more |

<br>

---

## 1. Add an AI Prompt tool

### 1-1. Start adding the tool

On the agent overview page, click **Tools** section → **+ Add a tool**.  
From the tool type list, select **Prompt**.
![1]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20020111.png)


<br>

### 1-2. Configure the prompt editor

When the prompt editor opens, enter the following items.

**Tool name:**
```
HTML_Response_Generator
```

### 1-3. Define input variables

Add the input variables to use in the prompt.
You can create variables by typing / or by clicking **Add input variable** at the bottom of the Instructions.

| Variable name | Type | Description |
|--------|------|------|
| `content` | Text | Original response content to convert to HTML |
| `card_type` | Text | Card type (info / warning / product / report) |


![2]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20021214.png)



<br>

### 1-4. Write the prompt

Enter the prompt below.

```
You are an expert HTML card generator. Generate HTML in a Microsoft Teams adaptive-card style with an appropriate design based on the email subject.


## Input information
- Card type: {{card_type}}
- Content: {{content}}

## Style rules by card type
- info: blue header (#0078D4), for general information
- warning: orange header (#F7630C), emphasize cautions
- product: green header (#107C10), product information card
- report: gray header (#605E5C), business report format

## Output rules
- Output only complete HTML code. Do not include explanatory text.
- Use a maximum width of 600px and 16px internal padding.
- Display the title in the header as bold white text.
- Convert lists in the content to <ul><li> tags.
- Convert table data to <table> tags and apply a striped style.
- Use inline styles only (no external CSS).

## Output HTML structure #1 - example business status report type

<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; color: #000000;">
  
  <!-- Header -->
  <div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #1976d2;">
    <h1 style="color: #1565c0; margin: 0; font-size: 24px;">📊 {{보고서_제목}}</h1>
    <p style="color: #424242; margin: 10px 0 0 0; font-size: 14px;">Report date: {{보고일}}</p>
  </div>

  <!-- Greeting -->
  <div style="padding: 15px; margin-bottom: 20px;">
    <p style="color: #212121; font-size: 15px; line-height: 1.6;">Hello, {{수신자}} 👋</p>
    <p style="color: #212121; font-size: 15px; line-height: 1.6;">{{인사말_본문}}</p>
  </div>

  <!-- Urgent tasks -->
  {{#each 긴급_업무}}
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 15px; border: 2px solid #ef5350;">
    <h2 style="color: #c62828; font-size: 18px; margin: 0 0 15px 0;">🔴 Urgent tasks</h2>
    
    <div style="padding: 15px; background-color: #ffebee; border-radius: 5px; margin-bottom: 10px;">
      <h3 style="color: #d32f2f; font-size: 16px; margin: 0 0 10px 0;">{{순번}} {{업무명}}</h3>
      <p style="color: #212121; margin: 5px 0; font-size: 14px;"><strong style="color: #1a237e;">⏰ Deadline:</strong> {{마감일}}</p>
      <p style="color: #212121; margin: 5px 0; font-size: 14px;"><strong style="color: #1a237e;">📋 Status:</strong></p>
      <ul style="color: #212121; margin: 5px 0; font-size: 14px; padding-left: 20px;">
        {{#each 현황_목록}}
        <li style="margin: 5px 0;">{{this}}</li>
        {{/each}}
      </ul>
      {{#if 조치_사항}}
      <p style="color: #212121; margin: 10px 0 5px 0; font-size: 14px;"><strong style="color: #1a237e;">✅ Action items:</strong></p>
      <div style="background-color: #e8f5e9; padding: 12px; border-radius: 5px; border-left: 4px solid #4caf50;">
        <p style="color: #1b5e20; margin: 5px 0; font-size: 14px;"><strong>{{조치_제목}}</strong></p>
        <ul style="color: #212121; margin: 5px 0; font-size: 13px; padding-left: 20px;">
          {{#each 조치_목록}}
          <li style="margin: 3px 0;">{{this}}</li>
          {{/each}}
        </ul>
      </div>
      {{/if}}
      <p style="color: #212121; margin: 10px 0 0 0; font-size: 14px;"><strong style="color: #c62828;">🎯 {{목표_액션}}</strong></p>
    </div>
  </div>
  {{/each}}

  <!-- Important tasks -->
  {{#each 중요_업무}}
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 15px; border: 2px solid #ffa726;">
    <h2 style="color: #e65100; font-size: 18px; margin: 0 0 15px 0;">🟡 Important tasks</h2>
    
    <div style="padding: 15px; background-color: #fff3e0; border-radius: 5px;">
      <h3 style="color: #ef6c00; font-size: 16px; margin: 0 0 10px 0;">{{순번}} {{업무명}}</h3>
      <p style="color: #212121; margin: 5px 0; font-size: 14px;"><strong style="color: #1a237e;">⏰ {{마감_라벨}}:</strong> {{마감일}}</p>
      <p style="color: #212121; margin: 5px 0; font-size: 14px;"><strong style="color: #1a237e;">📋 Status:</strong></p>
      <ul style="color: #212121; margin: 5px 0; font-size: 14px; padding-left: 20px;">
        {{#each 현황_목록}}
        <li style="margin: 5px 0;">{{this}}</li>
        {{/each}}
      </ul>
      <p style="color: #212121; margin: 10px 0 0 0; font-size: 14px;"><strong style="color: #e65100;">🎯 {{목표_액션}}</strong></p>
    </div>
  </div>
  {{/each}}

  <!-- Other tasks -->
  {{#if 기타_업무}}
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 2px solid #66bb6a;">
    <h2 style="color: #2e7d32; font-size: 18px; margin: 0 0 15px 0;">🟢 Other tasks</h2>
    
    <div style="padding: 15px; background-color: #e8f5e9; border-radius: 5px;">
      {{#each 기타_업무}}
      <p style="color: #212121; margin: 5px 0; font-size: 14px;">
        <strong style="color: #1b5e20;">{{순번}} {{업무명}}</strong> - {{설명}}
      </p>
      {{/each}}
    </div>
  </div>
  {{/if}}

  <!-- Priority summary -->
  <div style="background-color: #fff9c4; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 5px solid #f57f17;">
    <h2 style="color: #f57f17; font-size: 18px; margin: 0 0 15px 0;">📌 Priorities for this week</h2>
    <table style="width: 100%; border-collapse: collapse; color: #212121; font-size: 14px;">
      <thead>
        <tr style="background-color: #fff59d;">
          <th style="padding: 10px; text-align: left; border: 1px solid #f9a825; color: #212121;">Priority</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #f9a825; color: #212121;">Task</th>
          <th style="padding: 10px; text-align: center; border: 1px solid #f9a825; color: #212121;">Deadline</th>
          <th style="padding: 10px; text-align: center; border: 1px solid #f9a825; color: #212121;">Status</th>
        </tr>
      </thead>
      <tbody>
        {{#each 우선순위_목록}}
        <tr style="background-color: {{줄_배경색}};">
          <td style="padding: 10px; border: 1px solid #f9a825; color: #212121;">{{순위}}</td>
          <td style="padding: 10px; border: 1px solid #f9a825; color: #212121;">{{업무명}}</td>
          <td style="padding: 10px; text-align: center; border: 1px solid #f9a825; color: {{마감_색상}};"><strong>{{마감일}}</strong></td>
          <td style="padding: 10px; text-align: center; border: 1px solid #f9a825; color: #212121;">{{상태}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
  </div>

  <!-- Closing -->
  <div style="padding: 15px; background-color: #e1f5fe; border-radius: 8px; margin-bottom: 20px;">
    <p style="color: #212121; font-size: 14px; line-height: 1.6; margin: 0;">
      <strong style="color: #01579b;">💡 Notes:</strong><br>
      {{특이사항}}
    </p>
  </div>

  <!-- Signature -->
  <div style="padding: 15px; border-top: 2px solid #e0e0e0; margin-top: 20px;">
    <p style="color: #212121; font-size: 14px; margin: 5px 0;">Thank you. 😊</p>
    <p style="color: #616161; font-size: 13px; margin: 5px 0;">{{발신자_이름}}</p>
    <p style="color: #616161; font-size: 13px; margin: 5px 0;">{{발신자_이메일}}</p>
  </div>

</div>

## Output HTML structure #2 - example energy usage report type

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    </style>
</head>
<body>
    <div style="max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

            <h1 style="color: #2c3e50; text-align: center; margin-bottom: 10px;">🍷 {{디바이스명}} Energy Usage Report</h1>
            <p style="color: #7f8c8d; text-align: center; font-size: 14px; margin-bottom: 30px;">Period: {{조회_시작일}} ~ {{조회_종료일}} ({{조회_일수}} days)</p>

            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="color: #000000; margin-top: 0; font-size: 18px;">📊 Summary</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; color: #000000; font-weight: bold;">⚡ Total energy usage:</td>
                        <td style="padding: 10px; color: #000000; font-size: 20px; font-weight: bold; text-align: right;">{{총_사용량}} Wh</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; color: #000000; font-weight: bold;">📈 Daily average usage:</td>
                        <td style="padding: 10px; color: #000000; font-size: 18px; text-align: right;">{{일평균_사용량}} Wh/day</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; color: #000000; font-weight: bold;">🔝 Maximum usage:</td>
                        <td style="padding: 10px; color: #000000; text-align: right;">{{최대_사용량}} Wh ({{최대_사용일}})</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; color: #000000; font-weight: bold;">🔻 Minimum usage:</td>
                        <td style="padding: 10px; color: #000000; text-align: right;">{{최소_사용량}} Wh ({{최소_사용일}})</td>
                    </tr>
                </table>
            </div>

            <h2 style="color: #2c3e50; margin-top: 30px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">📅 Daily energy usage details</h2>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background-color: #ffffff;">
                <thead>
                    <tr style="background-color: #3498db;">
                        <th style="padding: 12px; text-align: left; color: #000000; border: 1px solid #ddd;">Date</th>
                        <th style="padding: 12px; text-align: right; color: #000000; border: 1px solid #ddd;">Usage (Wh)</th>
                        <th style="padding: 12px; text-align: center; color: #000000; border: 1px solid #ddd;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each 일별_데이터}}
                    <tr style="background-color: {{줄_배경색}};">
                        <td style="padding: 10px; color: #2c3e50; border: 1px solid #ddd;{{#if 강조}} font-weight: bold;{{/if}}">{{날짜}} ({{요일}})</td>
                        <td style="padding: 10px; color: #2c3e50; text-align: right; border: 1px solid #ddd;{{#if 강조}} font-weight: bold;{{/if}}">{{사용량}}</td>
                        <td style="padding: 10px; color: {{상태_색상}}; text-align: center; border: 1px solid #ddd;">{{상태_아이콘}} {{상태_텍스트}}</td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>

            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 30px; border-radius: 5px;">
                <h3 style="color: #2c3e50; margin-top: 0;">💡 Analysis and recommendations</h3>
                <p style="color: #2c3e50; line-height: 1.6;">
                    {{분석_내용}}
                </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <p style="color: #7f8c8d; font-size: 12px;">This report was automatically generated by the LG ThinQ system.</p>
                <p style="color: #7f8c8d; font-size: 12px;">Please contact us anytime if you have questions! 🙂</p>
            </div>

        </div>
    </div>
</body>
</html>

```

<br>

### 1-5. Save

After writing the prompt, scroll down, click **Save**, and then click **Add and configure** to finish registering the tool.
![3]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20021621.png)
<br>

## 1-6. Add descriptions for tool input variables

After the tool has been added, scroll down and add descriptions for each input variable in the input tab.
By default, values are set to fill dynamically with AI. Select **Custom** in the value field, update the descriptions below, and save.

| Variable name | Type | Description |
|--------|------|------|
| `content` | Text | Original response content to convert to HTML. |
| `card_type` | Text | Card type. (info / report) Use info for an energy usage report and report for a general work briefing. |

![4]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022018.png)

---

## 2. Update Instructions

Modify the `#Email writing rules` section of the agent Instructions as follows.

```
#Email writing rules
To generate the HTML output, call /HTML_Response_Generator and send the email based on the returned HTML code.
The content to pass to the tool is as follows.
- content: The original values received through data lookup
- card_type: Enter either report or info based on the content.  
-- Work briefing → card_type: "report"
-- General notice → card_type: "info"

```

When you type / in the Instructions, the prompt template for calling the tool is inserted automatically.
![5]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022433.png)
![6]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022448.png)

<br>

---

## 3. Verify behavior

Enter the following questions in the test panel.

**Product information HTML card test:**
```
Summarize the wine cellar energy usage report and send it to "email address"
```
→ The agent retrieves data with ThinQ MCP → calls HTML_Response_Generator → sends the email in HTML card format.

![7]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022837.png)
![8]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022851.png)

**Work briefing HTML card test:**
```
Summarize today's work status and send it to me
```
→ After looking up Work IQ MCP → it should send the email as a report-type HTML card.
![9]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20023607.png)

<br>

> **💡 Tip:** In the agent test screen, HTML may appear as code instead of being rendered.  
> When you receive the actual email, the HTML is rendered correctly and displayed as a card.

<br>

---

> **Next step:** [6. Excel data filtering (advanced)](./6.%20Excel%20데이터%20필터링.md)


---

---

← [Previous: Step 4. ThinQ MCP]({{ '/en/chapters/ws3-4-thinq-mcp/' | relative_url }}) | [Next: Step 6. Excel filtering]({{ '/en/chapters/ws3-6-excel-filter/' | relative_url }}) →
