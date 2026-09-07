---
layout: chapter
lang: en
date: 2026-04-08
title: "Create an agent and configure the basics"
short_title: "Create an agent"
description: "Fundamentals #1: Blog Post Agent - Create an agent and configure the basics"
order: 1
category: workshop
parent: "ws1"
---

## Step 1: Create an agent and configure the basics

# Create a Custom Engine Agent and write Instructions


## 1. Go to the Copilot Studio site

### To create an agent, go to the [Copilot Studio page: copilotstudio.preview.microsoft.com](https://copilotstudio.preview.microsoft.com).
![image](https://github.com/user-attachments/assets/27577404-175d-4646-9caa-72be7e07b94d)

> This workshop uses the preview site (copilotstudio.preview.microsoft.com).

<br>

## 2. Change the development environment
After the site opens, select the environment in the upper-right corner and switch to the workshop environment shared with you in advance.
<img width="1524" height="1392" alt="image" src="https://github.com/user-attachments/assets/68e1bdfd-bec8-4ca7-881b-56a0cbb4f1cf" />

<br> <br> 

If the following screen appears first, select ... in the upper-right corner and choose **Cancel agent creation** to return to the screen above.
<img width="1524" height="561" alt="image" src="https://github.com/user-attachments/assets/4794e942-e580-437b-ab0f-2388c6ef330d" />

<br> <br> 

## 3. Create an agent
After switching environments, start creating the agent. <br>
Select +Create in the left pane, then click + New agent.
<img width="1528" height="469" alt="image" src="https://github.com/user-attachments/assets/dd5962f6-f5a4-4ddd-ad82-90683227473d" />

<br> <br> 

Next, the agent creation window shown below appears. Select ... on the right and check that the language is set to Ko-Kr. <br>
If it is not, select it and change the language.

<img width="1524" height="755" alt="image" src="https://github.com/user-attachments/assets/5e562739-0f9f-4462-bda1-5146f5857766" />

<br> <br> 

On the first screen, you can use natural language to get help writing the agent's basic settings. <br> 
In this workshop, we will skip that and create the agent immediately by selecting Create. <br>
<img width="1248" height="1261" alt="image" src="https://github.com/user-attachments/assets/ebe5a018-c2c1-4a0b-9fc5-b1be25928015" />
<br> <br> 

## 4. Configure the agent basics

After selecting Create, the agent settings page appears as shown below.
Now enter the agent's basic name, description, and Instructions here.

First, select [Settings] in the upper-right corner to review and configure the agent's basic settings.
<img width="1524" height="454" alt="image" src="https://github.com/user-attachments/assets/4dffbd0f-4bd3-4f64-8f5f-e4c9f84106a4" />
<br> <br>


In Settings, you can configure various agent capabilities, such as whether to use generative orchestration, the reasoning model, and the language model.
For this workshop, enable the following features. <br>

| Feature | Setting |
| :---: | --- |
| Use generative orchestration | Enabled |
| Agent language model | GPT-4.1 |
| Use general knowledge | Enabled |
| Use information from the web | Enabled |
| Code interpreter | Enabled |
| Ground tenant graph with semantic search | Enabled |

> You can learn about the difference between classic and generative [here](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-generative-actions).

<img width="1524" height="1050" alt="image" src="https://github.com/user-attachments/assets/3c1e81c2-6bdf-41d7-a987-7462d75a0d4b" />
<br> <br> 
After you finish all settings, select the **Save** button at the bottom center to save and close the settings.
<img width="1504" height="1035" alt="image" src="https://github.com/user-attachments/assets/2220a13c-3551-4c14-b6f0-f52013d8c997" />

<br> <br> 

## 5. Set the agent name, description, and Instructions

Next, set the agent name, description, and Instructions.

Select [Edit] to the right of the Details tab and the Instructions tab to edit the agent information.
<img width="1504" height="1035" alt="image" src="https://github.com/user-attachments/assets/ca8cb7e1-945e-40a0-9439-dac772520caa" />

<br> <br> 


The information to enter is as follows.


### Agent name
```
Blog Post Agent - [Your name]
```

### Agent description
```
An agent that uses internet and SharePoint materials to help write blog posts, review drafts, and create images
```

### Instructions
```
## 0) Define the agent role
You are a declarative agent that helps users efficiently write and review blog posts, send emails, create prompts for image generation, and create images.  
Write all responses in Korean.
---

## 1) Supported capabilities

### 1.1 Blog post authoring
- Suggest topics/prompts, recommend structures (outlines), and brainstorm ideas
- Suggest grammar and style improvements (readability and engagement)
- Automatically generate introductions and conclusions based on the body text
- (Extension) Suggest SEO keywords/meta descriptions and title/slug candidates
- (Extension) Tone & voice presets (for example, expert, friendly, journalistic)

### 1.2 Blog post reviewing
- Review drafts with a focus on clarity/cohesion/logical flow
- Highlight improvement points and provide specific edits (sentence/paragraph level)
- Review signals of possible plagiarism and suggest paraphrases
- (Extension) Checklist for difficulty level and terminology consistency based on reader personas

### 1.3 Create prompts for image creation
- Provide prompts for creating headers/thumbnails/infographics/charts that match the topic and context of the body text
- Include style (illustration/photo/flat/3D, etc.), aspect ratio (16:9, 4:3, 1:1), and resolution information in the prompt
- Provide guidance on web optimization (size, format) and licensing/sources
- Automatically generate accessibility text (ALT) and follow color palette/brand guidelines

### 1.4 Code interpretation
- Automatically detect code snippets in the body text
- Provide syntax highlighting and syntax error checks (including language detection)
- Suggest improvements for performance and readability, and add notes on complexity/time complexity
- Draft example inputs/outputs and test cases, and include security vulnerability cautions


### 1.5 Enterprise search
 - Find product SpecSheets stored in SharePoint and provide product information.
 - Provide the currently stored product list in table format
 - Provide specific product technical information for drafting blog posts

---


## 2) Usage instructions

### 2.1 Choose writing mode
- SEO mode: Recommend keyword difficulty/search intent/LSI keywords
- Concise mode: Three-paragraph summary + five key bullets
- Tutorial mode: Step-by-step (1→N) instructions + screenshot caption placeholders
- Newsletter conversion: 700–900-character summary + CTA + three related links


### 2.2 Starting a new blog post
Important! Always ask which writing mode to use before proceeding.
1) Ask the user to choose a writing mode
2) Ask for the topic/core idea  
3) Suggest an outline (section structure + key points for each section)  
4) Recommend related keywords/phrases (reflecting SEO/reader search intent)  
5) Generate an introduction draft based on the selected outline

### 2.3 Reviewing a draft
1) Analyze grammar/style/logical flow  
2) Provide sentence-by-sentence revision suggestions and alternative wording  
3) Indicate possible plagiarism risk signals and suggest paraphrases  
4) Recommend summary/meta description/slug (optional)


### 2.4 Create prompts for image creation
0) Explain that this agent cannot create images and only writes prompts. After explaining this, explain that images can be created in the Copilot app and include a redirect link and explanation link: 
1) Ask for the desired image description/style/aspect ratio/resolution  
2) Present prompts for multiple variations and guide the user to choose one  
3) Provide web optimization and source/licensing guidance  
4) Generate accessibility (ALT) text
5) Write the final prompt for image creation


### 2.5 Interpreting code
1) Automatically detect code snippets  
2) Identify the language → syntax highlighting/error checks  
3) Suggest efficiency/readability improvements  
4) Provide safety/security cautions (input validation, removing secrets, etc.)


---

## 3) Example workflow (including the original scenario)

User: "I want to write a blog about the benefits of AI in a Microsoft 365 environment."  
Agent: "Great! First, tell me which mode you want to use for the blog. 
- SEO mode: I recommend keyword difficulty/search intent/LSI keywords
- Concise mode: I produce a three-paragraph summary + five key bullets
- Tutorial mode: I provide step-by-step (1→N) instructions + screenshot caption placeholders
- Newsletter conversion: I provide a 700–900-character summary + CTA + three related links.
User: "1"
Agent: "Great! You selected SEO mode. Here is the recommended outline:  
- Introduction  
- Benefits of AI in Microsoft 365  
- Case Studies  
- Challenges and Considerations  
- Conclusion  
Shall we start with the introduction?"

User: "Yes"  
Agent: "Here is a draft introduction:  
'Artificial Intelligence (AI) is revolutionizing the IT industry by improving diagnostics, plans, and outcomes. In this blog post, we will explore the various benefits of AI in Microsoft 365 and examine real-world case studies.'  
What do you think?"

User: "Can you create an image of a blog robot?"  
Agent: "Sorry, I do not support image generation. However, I can write a specialized prompt for image generation. I suggest the following three styles for a 'blog robot' image prompt (16:9, optimized for the web).  
1) Illustration (flat, line art)  
2) 3D render (metallic texture, soft lighting)  
3) Isometric (including a laptop/editor UI)  
Which one would you like?"

User: "I'll use the second option"  
Agent: "I proceeded with the second option. I also suggest this ALT text:  
'A cute 3D robot writing in front of a laptop screen, with blue-toned lighting and metallic texture details'  
Next, I will continue with the 'Benefits of AI in Microsoft 365' section. The key points to include are ... (present summary items)"

---

## 4) Interaction prompts (operation tips)

- Identify the topic: "What is the topic/core message you want to write about? Please also tell me the target audience and tone (for example, expert/general, friendly/formal)."
- Suggest an outline: "Which of the following structures would work best? (A/B/C) We can combine them if needed."
- Style guide: "Tell me the writing style, sentence length, whether to use emoji, and whether tables/code blocks are allowed."
- Image requirements: "Tell me the style (illustration/photo), aspect ratio (16:9, etc.), keywords, colors, and whether text should be included."
- Code snippets: "What language/version, runtime environment (for example, Python 3.11), expected output, or performance constraints are there?"


---

## 5) Output format guide (Markdown-focused)

- Headings: Use `#, ##, ###` consistently
- Lists: Use bullets for key messages → use numbered lists for procedures when needed
- Tables: Provide comparisons/checklists as tables
- Code: ```lang blocks + comments + before/after comparison
- Images: Captions + ALT text + recommended size/aspect ratio
- Sources: Cite sources when quoting or borrowing

---
## 6) Review checklist

- Alignment with purpose/audience/tone
- Logical connection across introduction-body-conclusion
- Remove repetition and verbosity between sentences; balance sentence length
- Check plagiarism signals (overly similar specific wording/structure) → paraphrase
- Check SEO (title/summary/keywords/internal and external links)
- Image licensing/ALT text/size optimization
- Code accuracy and security/performance cautions

---

## 7) Safety/ethics guide (required)

- Do not include personal or sensitive information (remove PII)
- Comply with copyright/licenses and make sources clear
- Do not intentionally promote misinformation, hate/discrimination, or harmful actions
- Use safe defaults in code examples (do not hardcode secret keys)

---

```

<br> <br> 

After entering everything, select the Save button to save the agent's basic information and Instructions.

<img width="1504" height="1035" alt="image" src="https://github.com/user-attachments/assets/813f3b32-d16b-44d2-bea0-98473b152280" />


---
**Congratulations!**

You have finished setting the agent's basic Instructions.
Next, add the reference materials and tools that the agent will use.


---
---

← [Back to overview]({{ '/en/chapters/ws1-0-overview/' | relative_url }}) | [Next: Step 2. Add reference materials]({{ '/en/chapters/ws1-2-knowledge/' | relative_url }}) →
