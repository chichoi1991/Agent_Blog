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

> **English UI screenshots, September 7, 2026:** These are actual captures from an English-language demo environment, not translated image overlays. The current preview navigation differs from the older Korean screenshots. Keep the agent private while completing the workshop.

## 1. Go to the Copilot Studio site

### To create an agent, go to the [Copilot Studio page: copilotstudio.preview.microsoft.com](https://copilotstudio.preview.microsoft.com).
![Copilot Studio home in the English-language demo environment]({{ '/assets/image/en/caldova/newcs-home.png' | relative_url }})

> This workshop uses the preview site (copilotstudio.preview.microsoft.com).

<br>

## 2. Change the development environment
Select the environment name near the bottom-left of the current navigation pane, then choose the workshop environment shared with you in advance. The picker below was opened in the same demo environment after agent creation; its location is the same on Home.
![Environment picker in the current English Copilot Studio navigation]({{ '/assets/image/en/caldova/classic-environment-picker.png' | relative_url }})

<br> <br> 

If a creation dialog is already open, select **Cancel** before switching environments.

<br> <br> 

## 3. Create an agent
After switching environments, start creating the agent. <br>
On **Home**, select **Other ways to build**, then select the **Agent** card marked **Standard**. This is the agent type used by this Classic workshop, rather than the newer GitHub Copilot-powered agent.
![Other ways to build, with the Standard Agent creation card]({{ '/assets/image/en/caldova/classic-create-entry.png' | relative_url }})

<br> <br> 

In **Name your agent**, enter `Blog Post Agent - [Your name]`. Expand **Agent settings (Optional)** and set **Language** to **English (United States)**. Keep the workshop's assigned solution, or the default solution if none was specified.

![Name your agent dialog with English (United States) selected]({{ '/assets/image/en/caldova/classic-create-english.png' | relative_url }})

<br> <br> 

Select **Create** and wait for provisioning to finish. The current Standard-agent creation dialog does not require the older conversational setup step.
<br> <br> 

## 4. Configure the agent basics

After selecting Create, the agent **Overview** page appears.
Now enter the agent's basic name, description, and Instructions here.

On **Overview**, use **Select your agent's model** to select **GPT-4.1**, if it is available in your environment. Model availability can change. Then select **Settings** at the top to review orchestration and knowledge capabilities.
![The agent model selector on Overview, showing GPT-4.1]({{ '/assets/image/en/caldova/classic-model-gpt41.png' | relative_url }})
<br> <br>


In **Settings**, review the following capabilities. Premium and preview features depend on the environment's licensing and policies; enable them only when permitted for your workshop. <br>

| Feature | Setting |
| :---: | --- |
| Use generative AI orchestration | Yes |
| Agent language model (on Overview) | GPT-4.1, where available |
| Allow ungrounded responses | On for this workshop |
| Use information from the Web | On |
| Code interpreter | Optional; enable only if permitted and needed |
| Tenant graph grounding with semantic search | On, where licensed and available |

> You can learn about the difference between classic and generative [here](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-generative-actions).

![English orchestration settings for the demo agent]({{ '/assets/image/en/caldova/classic-settings-orchestration.png' | relative_url }})
<br> <br> 
Scroll down to the knowledge, file processing, and search settings. The actual demo capture below shows **Code interpreter Off**; it was not enabled solely to take a screenshot. Select **Save** after any permitted changes, then return to **Overview**.
![Knowledge, file processing, and search settings, including the Save button]({{ '/assets/image/en/caldova/classic-settings-knowledge.png' | relative_url }})

<br> <br> 

## 5. Set the agent name, description, and Instructions

Next, set the agent name, description, and Instructions.

Select **Edit** on the **Details** and **Instructions** cards to edit the agent information. Save each card and wait for the save to complete before navigating away.
![Editing the name and description of the English demo agent]({{ '/assets/image/en/caldova/classic-details-edit.png' | relative_url }})

![Editing the actual agent instructions with English responses configured]({{ '/assets/image/en/caldova/classic-instructions-edit.png' | relative_url }})

<br> <br> 


The information to enter is as follows.


### Agent name
```
Blog Post Agent - [Your name]
```

### Agent description
```
An agent that uses web and SharePoint materials to help write blog posts, review drafts, and prepare prompts for image generation.
```

### Instructions
```
## 0) Define the agent role
You are a declarative agent that helps users efficiently write and review blog posts, send emails, create prompts for image generation, and create images.  
Write all responses in English.
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

![Saved English demo agent overview]({{ '/assets/image/en/caldova/classic-agent-overview.png' | relative_url }})

You can check the response language in **Test** before adding tools. For example: `I want to write a blog post about energy-efficient refrigerators. What writing modes can I choose?`

![Actual English test response describing the agent's writing modes]({{ '/assets/image/en/caldova/classic-test-english.png' | relative_url }})

> A new draft may show a warning that no evaluation has been run. Complete an evaluation before publishing; the screenshots here do not imply that the agent has been published or evaluated.


---
**Congratulations!**

You have finished setting the agent's basic Instructions.
Next, add the reference materials and tools that the agent will use.


---
---

← [Back to overview]({{ '/en/chapters/ws1-0-overview/' | relative_url }}) | [Next: Step 2. Add reference materials]({{ '/en/chapters/ws1-2-knowledge/' | relative_url }}) →
