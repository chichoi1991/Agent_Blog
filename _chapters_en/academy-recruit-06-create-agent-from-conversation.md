---
layout: "chapter"
lang: en
date: 2026-08-06
title: "Mission 06: Create a Custom Agent with Natural Language and AI, and Ground It with Your Data"
short_title: "Create an Agent from Conversation"
description: "Learn how to create a new agent grounded with knowledge sources"
order: 6
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/06-create-agent-from-conversation/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/06-create-agent-from-conversation/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🚨 Mission 06: Create a custom agent using natural language with AI and grounding it with your data](https://microsoft.github.io/agent-academy/recruit/06-create-agent-from-conversation/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

🎥 **Watch the walkthrough video**

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/video-thumbnail.jpg' | relative_url }}" alt="Create custom agent video thumbnail" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption><a href="https://www.youtube.com/watch?v=qZTtQVncGFg">Watch the walkthrough on YouTube</a></figcaption></figure>

## 🎯 Mission briefing

Welcome back, Recruit. In this mission, you will work hands-on with one of Copilot Studio's powerful capabilities: creating a custom agent with natural language and grounding it with your data.

This is not just a chatbot. You are building a knowledge-powered digital teammate that can reason, respond, and reference real enterprise information.

Your weapon is natural language. Your mission is to design, train, and test a fully customized helpdesk agent that uses SharePoint, uploaded files, and company URLs to answer IT questions.

Let's build your agent from the ground up.

<div class="info-box note" markdown="1">
**Important: This mission uses the classic Copilot Studio experience**

If your Copilot Studio screens look different from the screenshots in this mission, turn off **New Experience** in the upper-right corner to switch to the **classic experience** used here.
</div>

## 🔎 Learning objectives

In this mission, you will learn how to:

1. Understand what a custom agent is and how it differs from a prebuilt template
1. Create an agent using a natural-language description
1. Ground an agent with enterprise knowledge sources, including SharePoint, documents, and websites
1. Learn how generative orchestration searches multiple data sources
1. Build and test an IT helpdesk agent grounded with enterprise data

## 🤔 What is a custom agent?

A custom agent is a chatbot or virtual assistant that you create and design directly in Copilot Studio to help users with specific tasks or questions. It is called "custom" because:

- **You define its purpose** - such as vacation requests, order status checks, or IT question support
- **You define the conversation** - what the agent should say and how it should respond
- **You ground it with your data** - by connecting to enterprise data through built-in knowledge resources
- **You connect it to your own systems or applications** - by choosing from connectors, flows, REST APIs, or Model Context Protocol servers

<div class="info-box note" markdown="1">
**Note** — Think of it this way: you are creating your own digital assistant that can chat with users, answer questions, collect information needed for a process, connect to enterprise data, and handle work on your behalf.
</div>

### 🤖 What can a custom agent do?

A custom agent can:

- Ask users for information such as names, dates, and preferences
- Store that information in a database or table
- Look up data based on a question and answer it
- Act autonomously without direct user interaction
- Trigger actions from a user request or autonomous behavior, such as sending email or creating a record

### 👩🏻‍💻 Why use a custom agent?

- Automate repetitive work and save time
- Provide users with a friendly, guided experience
- Tailor the experience to your business or project needs

### ✨ Example

Suppose you create a custom agent that helps employees request vacation.

It asks for their name, vacation dates, and manager name, then stores the information in the designated system that manages vacation requests, such as a SharePoint list.

Now employees can simply chat with the agent instead of going to the SharePoint list and creating a new item.

## 🗣️ Create an agent with natural language

In [Lesson 05 - Start quickly with a prebuilt agent]({{ '/en/chapters/academy-recruit-05-using-prebuilt-agents/' | relative_url }}), you learned how to quickly create an agent in Copilot Studio from a prebuilt agent template. In this lesson, you will explore the AI-powered conversational authoring experience. In Copilot Studio, you do not need to write code to create an agent. You can easily create one using only a description in your own words (natural language).

When you start by describing an agent in natural language, AI automatically generates the agent's name, description, and instructions. It also suggests triggers, channels, knowledge sources, and tools. You can accept or ignore these suggestions; they only persist during the current session and are not saved.

## 🌱 What if I am new to "describing what I want"?

Creating a custom agent with natural language may feel unfamiliar. But every time you use Copilot across Microsoft products and services, you are already using natural language in the form of a _prompt_.

A prompt is a message or instruction that tells an AI agent what you want it to do. Think of it as giving directions to an assistant. The clearer your instructions are, the easier it is for the AI to understand and execute them.

### 🪄 Why prompts matter

- They guide the agent's behavior
- They help the agent understand what kinds of conversations to have
- Good prompts make the agent more useful and accurate

### 📝 Tips for writing a good prompt

- Be clear and specific - say exactly what you want the agent to do
- Think from the user's point of view - what will the user say, and what should the agent answer?
- Include examples - provide sample interactions if possible

<div class="info-box note" markdown="1">
**✨ Example** — Suppose the HR team needs an agent that helps with vacation requests.

The prompt might look like this:

`I want to build an agent that helps users submit a vacation request. When a user says they want to request time off, the agent should ask for their name, the start date of their vacation, the end date of their vacation, and their manager's name. Once the user provides this information, the agent should save it to a SharePoint list called 'Vacation Requests' and post a notification in a dedicated Microsoft Teams channel.`

Why this prompt works well:

- **Clear goal** - submit a vacation request
- **Describes the user interaction** - what the user says and what the agent should ask
- **Lists the required data** - name, start date, end date, manager
- **Specifies where the data is stored** - a SharePoint list called Vacation Requests
</div>

## 🔮 After I create an agent, how do I ground it with knowledge?

In Copilot Studio, knowledge sources are places where an agent can find information to provide better answers. When you add these sources, the agent can retrieve enterprise data from Power Platform, Dynamics 365, websites, and other systems and services your company uses.

These sources work with AI to help the agent respond more accurately to user questions. This is called **generative orchestration**.

### 🌿 What is generative orchestration in an agent context?

Generative orchestration means that the agent dynamically decides how to answer a question with AI by combining its built-in language capabilities with information from added knowledge sources.

When a user asks a question, the agent can:

- Use AI to understand the question
- Generate a follow-up question on the fly if information is missing
- Select the most relevant knowledge sources
- Search those sources for an answer
- Use the information it finds to generate a natural, useful response

### 🏦 Why knowledge sources matter

1. **Smarter answers** - Adding knowledge sources lets the agent use your organization's real data to provide more accurate answers.

1. **Less manual work** - You do not have to write every possible response yourself. The agent searches the added sources and responds automatically.

1. **Use trusted information** - Answers come from systems you already use, such as Dataverse, SharePoint, and company websites, giving users a trusted source of information.

1. **Works with generative AI** - Even for questions that were not pre-programmed or added as starter prompts, knowledge sources and AI work together to understand and respond naturally.

1. **Flexible and extensible** - You can add knowledge sources during setup or later, so the agent gets smarter as needs change.

<div class="info-box note" markdown="1">
**✨ Example** — Suppose you create an agent that helps employees with HR questions. You add your company's HR policy documents and SharePoint site as knowledge sources.

When an employee asks, _"How many vacation days do I get?"_, the agent uses generative orchestration to search those sources and respond with the correct policy without you writing the answer manually. You save time because you do not need to anticipate every question an employee might ask.
</div>

## Types of knowledge sources you can add

1. **Public websites**
    - **What they do:** Use Bing to search a specific website, such as a company site.
    - **Why they are useful:** Good for retrieving public information such as FAQs or product information.

1. **Documents**
    - **What they do:** Use documents you upload directly to the agent, such as PDFs or Word files. Uploaded files are stored securely in Dataverse.
    - **Why they are useful:** Let the agent answer questions based on internal guides, manuals, and policies.

1. **SharePoint**
    - **What it does:** Connects to SharePoint folders or files powered by [Work IQ](https://www.microsoft.com/en-us/microsoft-365/blog/2025/11/18/microsoft-ignite-2025-copilot-and-agents-built-to-power-the-frontier-firm/#microsoft-365-copilot-with-work-iq-ai-built-for-work).
    - **Why it is useful:** Good for accessing team documents, HR policies, and project files stored in SharePoint.

1. **Dataverse**
    - **What it does:** Uses structured data from tables and rows in a Dataverse environment. You can apply synonyms and glossary definitions for tables and columns to improve agent responses.
    - **Why it is useful:** Useful when the agent needs to retrieve enterprise data stored in Dataverse, such as customer information.

1. **Real-time knowledge through connectors**
    - **What it does:** Lets the agent access real-time data from other enterprise systems, such as Salesforce, ServiceNow, Dynamics 365, AzureSQL, and Databricks, using the user's permissions during the conversation.
    - **Why it is useful:** Provides current, secure, accurate responses without storing or duplicating data, making the agent smarter and safer.

1. **Azure AI Search**
    - **What it does:** Uses semantic and vector search to search large document sets stored in Azure and understand user questions.
    - **Why it is useful:** Provides accurate, trustworthy answers from complex data sources, supports citations, and scales well for large document collections with secure access control.

## 🔒 Security note

### Knowledge source authentication

Some sources, such as SharePoint and Dataverse, require user authentication. This means the agent only references data in its responses that the user is allowed to see. Other sources, such as Azure AI Search, require additional configuration, including an Azure account and authentication type.

## Improve agent responses in Copilot Studio

After the conversational authoring experience provisions your agent, you will want to test it against the instructions generated by AI from your prompt. Improving agent responses in Copilot Studio is about making sure the agent clearly understands its goal and has the right information.

1. **Refine the agent instructions** - This tells the agent how it should behave. Use clear, specific language.

    For example:

    ✅ "Act like a friendly customer support agent who explains things clearly."

    ❌ "Be helpful." (too vague)

1. **Check tone and language** - Make sure the agent's tone fits your audience.

    You can set it to be:

    - Friendly and casual
    - Professional and concise
    - Supportive and patient

1. **Add or update knowledge sources** - If the agent needs to answer questions about a specific topic, make sure it has access to the right information.

    - Add websites, documents, and FAQ links
    - Keep content up to date
    - Use clear, well-structured information

1. **Use Topics and triggers** - If your agent needs to handle specific tasks or conversations, you can create topics with trigger phrases. This guides the conversation more precisely. You will learn more in the next lesson.

1. **Test with real questions** - Ask the agent the kinds of questions users are likely to ask.

    If the answers are not good:

    - Adjust the system instructions
    - Add more examples or knowledge
    - Rephrase questions and observe the responses

1. **Review and iterate** - Improving an agent is an ongoing process!

    After publishing:

    - Collect user feedback
    - Watch for common questions or points of confusion
    - Keep refining the agent settings

## 🧪 Lab 06: Create a custom agent in Copilot Studio

Now let's learn how to create a custom agent that can chat over your data.

### ✨ Use case

Use the same use case as [Lesson 03 - Create a declarative agent for Microsoft 365 Copilot]({{ '/en/chapters/academy-recruit-03-create-a-declarative-agent-for-m365copilot/' | relative_url }}).

**As an employee**

**I want** quick, accurate help from an IT helpdesk agent for issues such as device problems, network troubleshooting, and printer setup

**So that** I can stay productive and resolve technical issues without delay

Let's get started!

### ✨ Prerequisites

- **SharePoint site**

Use the **Contoso IT** SharePoint site you created in [Mission 00 - Course Setup - Step 5: Create a new SharePoint site]({{ '/en/chapters/academy-recruit-00-course-setup/' | relative_url }}).

If you have not set up the **Contoso IT** SharePoint site yet, go back to [Mission 00 - Course Setup - Step 5: Create a new SharePoint site]({{ '/en/chapters/academy-recruit-00-course-setup/' | relative_url }}) and set it up.

- **Solution**

Use the **Contoso Helpdesk Agent** solution you created in [Mission 04 - Create a new solution]({{ '/en/chapters/academy-recruit-04-creating-a-solution/' | relative_url }}).

If you have not set up the **Contoso Helpdesk Agent** solution yet, go back to [Mission 04 - Create a new solution]({{ '/en/chapters/academy-recruit-04-creating-a-solution/' | relative_url }}) and set it up.

### 6.1 Create an agent with natural language and AI

<div class="info-box note" markdown="1">
**⚠️ AI-generated instructions may vary by session** — When you start by describing an agent in natural language, the AI-generated name, description, and instructions may vary from session to session. Suggested triggers, channels, knowledge sources, and tools may vary too.
</div>

1. Go to the Copilot Studio home page and enter the following prompt describing the IT helpdesk agent in the field.

    ```text
    You are an IT Help Desk assistant that helps employees resolve common IT issues and find available devices. Be polite, concise, and helpful. Use Microsoft Support as the primary source: https://support.microsoft.com (and Microsoft Learn troubleshooting if needed: https://learn.microsoft.com/en-us/troubleshoot/). Do not invent steps - if you can't verify official guidance, say so and offer safe diagnostics + escalation.

    For troubleshooting:
    1) Ask ONE focused question if details are missing (goal, symptom/error, app/device).
    2) Try quick fixes first (restart, connectivity, sign-in, service status).
    3) Provide numbered step-by-step instructions (short, actionable).
    4) If not resolved, offer 1-2 alternative branches.
    5) After 2-3 branches, recommend escalation and provide a "ticket summary" of symptoms + error + device/app + what was tried.

    For devices:
    1) Ask what type of device do they need

    Never ask for passwords/OTP. Refuse requests to bypass security.
    Include relevant Microsoft Support links and preserve URLs.
    ```

    This prompt includes:

    - **Role and goal:** IT helpdesk assistant
    - **Primary knowledge sources** (including a hierarchy of website knowledge sources)
    - **Response style:** polite, concise, and helpful
    - **Troubleshooting flow:** question > quick fixes > steps > branches > escalation
    - **Escalation output:** ticket summary
    - **Device support (basic)**
    - **Security boundaries**: no passwords, no security bypasses
    - **Link handling:** preserve URLs and cite Microsoft Support

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_01_Prompt.png' | relative_url }}" alt="Enter prompt" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Enter prompt</figcaption></figure>

1. Confirm again that the agent will be created in the solution you selected as your preferred solution in [Mission 04 - Create a new solution]({{ '/en/chapters/academy-recruit-04-creating-a-solution/' | relative_url }}).

    Select **Agent Settings** (gear icon). In the dialog, confirm that the solution from Mission 04 is selected by default.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_02_AgentSettings.png' | relative_url }}" alt="View of Agent Settings" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>View of Agent Settings</figcaption></figure>

1. Select **Cancel**. When you submit the prompt description, Copilot Studio starts provisioning the agent.

1. When the agent is provisioned, a confirmation message appears. Notice that AI automatically generated the agent's **name**, **description**, and **instructions**. Orchestration mode is enabled by default (you can confirm this in **Settings**), and the default model is used as the agent response model.

    <div class="info-box note" markdown="1">
    **⚠️ Reminder: AI-generated instructions may vary by session** — When you start by describing an agent in natural language, the AI-generated name, description, and instructions may vary from session to session. Suggested triggers, channels, knowledge sources, and tools may vary too.
    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_03_AgentProvisioned.png' | relative_url }}" alt="Setting up agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Setting up agent</figcaption></figure>

1. Scroll down and review the knowledge sources, tools, and triggers suggested by AI.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_04_KnowledgeAndTools.png' | relative_url }}" alt="Knowledge sources and tools sections with suggestions from AI" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Knowledge sources and tools sections with suggestions from AI</figcaption></figure>

1. Scroll a little farther and review the Connected Agents, Topics, and Suggested Prompts sections.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_05_ConnectedAgentsTopicsSuggestedPrompts.png' | relative_url }}" alt="Connected Agents, Topics and Suggested Prompts sections" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Connected Agents, Topics and Suggested Prompts sections</figcaption></figure>

1. Now confirm again that the agent was created correctly in the `Contoso Helpdesk Agent` solution. Select **Settings** in the upper-right corner.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_06_AgentSettings.png' | relative_url }}" alt="Select Settings" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Settings</figcaption></figure>

1. Under **Advanced**, you can confirm that the agent was created in the `Contoso Helpdesk Agent` solution. Great! Exit Settings.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_07_AdvancedSettings.png' | relative_url }}" alt="Solution created in Contoso Helpdesk Agent solution" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Solution created in Contoso Helpdesk Agent solution</figcaption></figure>

1. Now update the agent name. In the **Details** section, select **Edit**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_08_EditDetails.png' | relative_url }}" alt="Select Edit in Details section" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Edit in Details section</figcaption></figure>

1. Enter the following as the agent name and **Save** the updated details.

    ```text
    Contoso Helpdesk Agent
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_09_AgentName.png' | relative_url }}" alt="Update agent name" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Update agent name</figcaption></figure>

1. Now add the suggested knowledge source. In the **Knowledge** section, select **+ Add** for the `https://support.microsoft.com` website URL.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_10_AddSuggestedWebsite.png' | relative_url }}" alt="Select add for the suggested website URL" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select add for the suggested website URL</figcaption></figure>

1. The **Add public websites** modal appears with that website URL. Select **Add**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_11_AddWebsite.png' | relative_url }}" alt="Select add" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select add</figcaption></figure>

1. Add another website with the URL below, then select **Add to agent**.

    ```text
    https://learn.microsoft.com/troubleshoot/
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_12_AddAdditionalWebsite.png' | relative_url }}" alt="Add second website URL" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add second website URL</figcaption></figure>

1. The two website URLs have now been added as knowledge sources for the agent. To remove the second AI-suggested item, select **X Dismiss**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_13_SelectDismiss.png' | relative_url }}" alt="Select Dismiss" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Dismiss</figcaption></figure>

1. By default, the **Web Search** setting is enabled. To use only the knowledge sources you defined, select the **toggle** to disable **Web Search**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_14_DisableWebSearch.png' | relative_url }}" alt="Disable Web Search" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Disable Web Search</figcaption></figure>

1. Now test the newly created agent. In the **Testing** panel, select **Start a new test session**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_15_StartNewTestSession.png' | relative_url }}" alt="Select start new test session in testing pane" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select start new test session in testing pane</figcaption></figure>

1. In the **Testing** panel, enter the following question.

    ```text
    How can I check the warranty status of my Surface?
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_16_EnterQuestion.png' | relative_url }}" alt="Test newly created agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Test newly created agent</figcaption></figure>

1. The Activity map now loads and shows the agent's processing path in real time. In this scenario, the agent understands the question and searches the two website URL knowledge sources.

    As defined in the instructions, the agent responds with numbered, step-by-step guidance. The response includes a reference to the [https://support.microsoft.com](https://support.microsoft.com) webpage that shaped the answer, so users can verify the source of the response.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.1_17_References.png' | relative_url }}" alt="References in response" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>References in response</figcaption></figure>

Congratulations! You have created your first custom agent in Copilot Studio, starting from a description 🙌🏻

### 6.2 Add an internal knowledge source using a SharePoint site

Earlier, during the conversational creation experience, you added public websites as external knowledge sources. Now you will add an internal knowledge source using a SharePoint site. Use the SharePoint site you created in [Mission 00 - Course Setup]({{ '/en/chapters/academy-recruit-00-course-setup/' | relative_url }}).

1. In the **Knowledge** section, select **+ Add knowledge**, then select **SharePoint**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.2_01_SelectSharePoint.png' | relative_url }}" alt="Select SharePoint" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select SharePoint</figcaption></figure>

1. Paste the site address you created in [Mission 00 - Course Setup]({{ '/en/chapters/academy-recruit-00-course-setup/' | relative_url }}) into the **SharePoint URL** field and select **Add**.

    Update the SharePoint site's **name** to `Contoso IT` and select **Add to agent**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.2_02_AddSharePointSite.png' | relative_url }}" alt="Update SharePoint site name and select Add to agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Update SharePoint site name and select Add to agent</figcaption></figure>

1. The SharePoint site has now been added as a knowledge source with the status _Ready_. The Status column shows whether the knowledge source was loaded/connected successfully or whether there is a problem.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.2_03_SharePointSiteAdded.png' | relative_url }}" alt="SharePoint site status" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>SharePoint site status</figcaption></figure>

### 6.3 Add an internal knowledge source by uploading a document

Now upload a document directly to the agent to add another internal knowledge source.

1. In the **Knowledge** section, select **+ Add knowledge**, then select **Upload file** or **select to browse**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.3_01_SelectUploadFile.png' | relative_url }}" alt="Select upload files" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select upload files</figcaption></figure>

1. Download the [sample file](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/06-create-agent-from-conversation/assets/Contoso_Guest_WiFi_Connection_Guide.docx) and select it in File Explorer. Select **Open**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.3_02_SelectWordFile.png' | relative_url }}" alt="Select document" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select document</figcaption></figure>

1. The file to upload is selected. Next, select **Add to agent**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.3_03_SelectAddToAgent.png' | relative_url }}" alt="Select Add to Agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Add to Agent</figcaption></figure>

1. The document is being added to the agent. Wait for the upload to complete, and do not close the browser window.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.3_04_FileAdded.png' | relative_url }}" alt="Document added" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Document added</figcaption></figure>

1. The document status initially appears as _In progress_. Before testing the agent, wait until the status updates to **Ready**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.3_05_FileStatus.png' | relative_url }}" alt="File status" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>File status</figcaption></figure>

Now let's test the agent!

### 6.4 Test the agent

Ask the Contoso Helpdesk Agent questions that test all four knowledge sources.

1. In the testing panel, select the **new test session** icon.

    To test the public website (external) knowledge source, enter the following question.

      ```text
      How can I find the serial number on my Surface device?
      ```

      <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_01_EnterQuestion1.png' | relative_url }}" alt="Select start a new test session icon" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select start a new test session icon</figcaption></figure>

1. You can now see the agent reviewing knowledge sources and responding using the website knowledge source.

    The response is returned, and you should see a reference to the webpage that shaped the answer.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_02_Question1Response.png' | relative_url }}" alt="Question 1 response" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Question 1 response</figcaption></figure>

1. If you scroll down in the Activity map's knowledge modal, you can see the other knowledge sources the agent searched: the other website URL, the SharePoint site, and the uploaded file.

    However, only the first website knowledge source was cited in the **Referenced sources** section. The answer was grounded in the first website knowledge source. Selecting the reference takes you to that webpage.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_03_OtherSourcesSearchedOver.png' | relative_url }}" alt="Knowledge sources referenced and searched" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Knowledge sources referenced and searched</figcaption></figure>

1. Now test the SharePoint site knowledge source and document knowledge source together in one message. Enter the following question.

    ```text
    How can I access our company's Contoso VPN from my device? How do guests connect to the Contoso Guest wifi?
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_04_EnterQuestion2Question3.png' | relative_url }}" alt="Test SharePoint and document knowledge sources" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Test SharePoint and document knowledge sources</figcaption></figure>

1. Again, you can see the agent review all four knowledge sources and generate responses to the two questions submitted in one message. The agent answers both questions in the same message and provides separate sources for each response.

    In the Activity map's knowledge modal, you can see that the SharePoint site was referenced for question 1 about Contoso VPN access. You can also see all knowledge sources used to answer both questions in the Activity modal.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_05_Question2Response.png' | relative_url }}" alt="Knowledge sources referenced for Question 1 and Question 2" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Knowledge sources referenced for Question 1 and Question 2</figcaption></figure>

1. Scroll down to the response for question 2 about Contoso Guest wifi. Again, you can see a response grounded in the uploaded file that contains those details.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_06_Question3Response.png' | relative_url }}" alt="Question 3 response" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Question 3 response</figcaption></figure>

1. In the Activity modal, notice that the second website URL was searched but was not used as one of the referenced sources.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_07_OtherSourcesSearchedOver.png' | relative_url }}" alt="Activity modal of other sources searched over" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Activity modal of other sources searched over</figcaption></figure>

1. It is always a good idea to validate that generated responses are correct. Selecting a document reference opens a modal with the document text reflected in the answer.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-06-create-agent-from-conversation/6.4_08_VerifyDocument.png' | relative_url }}" alt="Review document" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Review document</figcaption></figure>

The agent can answer multiple questions in one message, search knowledge sources, and show references in its responses. Always review the references to confirm the response is correct.

## ✅ Mission complete

Here is what you successfully completed:

- **Natural-language authoring**: Created a custom agent from a description.
- **Enterprise grounding**: Added SharePoint, file, and public website knowledge sources.
- **Generative orchestration**: Configured the agent to search multiple sources.
- **Testing**: Validated generated answers against source references.

Next, continue to [Mission 07: Add a Topic with a Trigger]({{ '/en/chapters/academy-recruit-07-add-new-topic-with-trigger/' | relative_url }}).

## 📚 Tactical resources

- [Quickstart: Create and deploy an agent](https://learn.microsoft.com/microsoft-copilot-studio/fundamentals-get-started?context=%2Fmicrosoft-365-copilot%2Fextensibility%2Fcontext/?WT.mc_id=power-172617-ebenitez)

- [Create and delete agents](https://learn.microsoft.com/microsoft-copilot-studio/authoring-first-bot?WT.mc_id=power-172617-ebenitez)

- [Key concepts: Authoring agents](https://learn.microsoft.com/microsoft-copilot-studio/authoring-fundamentals/?WT.mc_id=power-172617-ebenitez)

- [Create a custom agent with natural language](https://aka.ms/ai-in-action/copilot-studio/ep1)

- [Add knowledge to an agent](https://aka.ms/ai-in-action/copilot-studio/ep2)
