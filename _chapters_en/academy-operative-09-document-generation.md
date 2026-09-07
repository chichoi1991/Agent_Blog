---
layout: "chapter"
lang: en
date: 2026-03-11
title: "Mission 09: Generate a Candidate Interview Questions Document"
short_title: "09. Document Generation"
description: "Implement document generation from AI prompts"
order: 9
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/09-document-generation/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-11"
canonical_url: "https://microsoft.github.io/agent-academy/operative/09-document-generation/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🚨 Mission 09: Generate a Candidate Interview Questions Document](https://microsoft.github.io/agent-academy/operative/09-document-generation/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

<figure class="screenshot">
  <a href="https://youtu.be/GYSEI0jbCvk?si=lYPZ4cmlxZ8-XBmi" target="_blank" rel="noopener">
    <img src="{{ '/assets/academy/operative-09-document-generation/09-doc-gen_thumbnail_PlayButton.png' | relative_url }}" alt="Document generation walkthrough video thumbnail" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
</figure>

## 🎯 Mission Briefing

Welcome, Operative. In the previous missions, you saw the power of prompts. You learned how to analyze multimodal documents and ground prompts with Dataverse data. Now it is time to unlock another prompt capability: **document generation**.

This operation is called **Operation Doc Assembly**. In this task, you will use a prompt to create a Word document with interview preparation questions, then call that document from your agent.

<div class="info-box note" markdown="1">
**Note** — If the screenshots in this lesson look different from your Copilot Studio screens, turn off **New Experience** in the upper-right corner to switch to the **classic experience** used here.
</div>

## 🔎 Objectives

In this mission, you will learn how to:

1. Configure a prompt to output a Word document
1. Format a Word template for use in a prompt
1. Run a prompt from an agent

## 🧪 Lab 9 - Generate an interview document

When a job application is added, you want to automate the process of preparing a detailed interview document. This should be a Word document that summarizes key candidate information such as name, current role, and experience; role information such as job title and requirements; and generates specific, tailored interview questions based on the candidate's background and the role they applied for.

### Prerequisites for completing this mission

1. Before starting this mission, you need the following:

    - Complete **[Mission 08]({{ '/en/chapters/academy-operative-08-dataverse-grounding/' | relative_url }})**, have your agent ready, and understand Dataverse grounding.

### 9.1 Create the prompt

The first objective is to create a prompt that can analyze a job posting and candidate profile and generate tailored interview questions.

1. Sign in to [Copilot Studio](https://copilotstudio.microsoft.com), then select **Tools** from the left navigation.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/ToolsSelect.png' | relative_url }}" alt="Select Tools" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **+ New tool** button.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/NewToolBtn.png' | relative_url }}" alt="New tool button" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Prompt**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/NewPromptBtn.png' | relative_url }}" alt="Select new prompt" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Rename** the default timestamp name (for example, *Custom prompt 09/04/2025, 04:59:11 PM*) to `Interview Question Document Prep`.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/PromptName.png' | relative_url }}" alt="Rename prompt" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Add the following prompt to the Instructions field.

    ```text
    You are tasked with evaluating a candidate’s resume against a specific job listing description and generating a targeted set of interview questions to support structured candidate screening.
    ### Instructions
    
    1. **Extract Candidate Details:**
        - Identify and extract the candidate’s full name.
        - Extract contact information, specifically the email address.
        - Identify the candidate’s current or most recent job title.
        - Extract location if present.
        - Estimate total years of experience only if supported by resume dates.
    
    2. **Analyze the Job Listing Description:**
        - Review the job description to identify:
        - Must-have requirements
        - Nice-to-have requirements
        - Key responsibilities
        - Required tools and technologies
        - Treat must-have requirements as the highest priority for evaluation.
    
    3. **Evaluate Resume Against Job Requirements:**
        - Compare the resume content against each must-have requirement.
        - For each requirement, determine:
            - Evidence level: Strong, Moderate, Weak, or Missing
            - A confidence score from 0–100
            - Supporting evidence using short phrases grounded in the resume text only
        - Do not infer or invent experience.
    
    4. **Assess Overall Candidate Fit:**
        - Identify:
            - Top strengths (up to 5)
            - Key gaps (up to 5)
            - Risks or concerns only when supported by missing or unclear evidence
            - Provide a concise one-paragraph summary suitable for recruiter review.
    
    5. **Generate Interview Questions (Exactly 10):**
        - Generate exactly 10 interview questions based on the job requirements and resume evaluation.
        - Distribute the questions as follows:
            - 5 Core Requirement Questions focused on the most critical must-have requirements.
            - 3 Gap or Clarification Questions targeting weak, missing, or ambiguous areas.
            - 2 Scenario-Based Questions derived directly from key job responsibilities.
        - Avoid generic or culture-only questions unless explicitly required by the job description.
    
    **Interview Question Requirements:**
        - Each question must include:
            - The interview question
            - The job requirement it maps to
         - Questions must be specific, non-duplicative, and grounded in the provided inputs.
         - Produce questions in numbered format (1, 2, 3)
    
    ### Input Data
    
    Application Number:  /ApplicationNumber
    Candidate Details (Name, Email): /CandidateDetails
    Resume Details: /Resume Details
    Job Details (Job Number, Title, Description and Requirements): /JobDetails
    Evaluation Criteria (Weighting, Evaluation Criteria): /Criteria
    ```

1. In a new tab, go to make.powerapps.com and find the **Job Application** table. Note one job application number from that table to use for testing.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/JobAppTable.png' | relative_url }}" alt="Job Application table" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Return to the prompt and scroll down to the prompt's **input data** section. Find the **/ApplicationNumber** text, delete it, and type a **slash (/)** to open the add input panel. Configure the input as follows.

    | Parameter Name | Type | Sample Data |
    |-----------|------|-------------|
    | ApplicationNumber | Text  | Enter the job application number you copied in the previous step |

1. Now that you have an input for passing the Job Application number, use Dataverse Grounding to retrieve the other related information this prompt needs from Dataverse.

    <div class="info-box note" markdown="1">
    **Tip** — If you want to understand Dataverse Grounding more deeply, be sure to complete [Module 8]({{ '/en/chapters/academy-operative-08-dataverse-grounding/' | relative_url }}).
    </div>

    In the prompt's **Input Data** section, find the remaining slashes and replace them according to the table below to configure Dataverse grounding.

    | Parameter Name | Table | Columns | Filter attribute | Filter value |
    | -------------- | ----- | ------- | ---------------- | ------------ |
    | CandidateDetails | Dataverse -> Job Application -> Candidate (Candidate)| Candidate Name, Email | Application Number |Add Value -> Application Number |
    | ResumeDetails | Dataverse -> Job Application -> Resume (Resume)| Cover Letter, Resume Number, Resume Title, Summary | Application Number |Add Value -> Application Number |
    | JobDetails | Dataverse -> Job Application -> Job Role (Job Role)| Description, Job Role Number, Job Title | Application Number |Add Value -> Application Number |
    | Evaluation Criteria | Dataverse -> Job Application -> Job Role (Job Role) -> Job Role (Evaluation Criteria)| Criteria Name, Description, Weighting | Application Number |Add Value -> Application Number |

    When the input section is complete, it should look similar to the screenshot below.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/PromptFIlled.png' | relative_url }}" alt="Completed prompt inputs" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Testing as you go is always a good practice. Select **Test** to confirm that the prompt shows an initial text output and retrieves the correct information from Dataverse.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/FirstTest.png' | relative_url }}" alt="First test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. To make this prompt generate a document, you must change the prompt model to one that supports multimodal input and output. Select the **model dropdown** and change it to **GPT-4.1**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/ModelSelect.png' | relative_url }}" alt="Select model" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. To have the prompt fill a Word document as output, you need a Word template where the content will be inserted. A template is provided for you. [Download the template file here](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/operative/09-document-generation/assets/Interview_Questions_Template.docx), then open it.

    <div class="info-box note" markdown="1">
    **Note** — The template itself is a basic Word document. The key point here is how to add placeholders where the prompt should insert text. Wherever the prompt needs to insert text, add placeholder text for the item you want to fill and wrap it in **double curly braces, such as `{{ JobTitle }}`**, as shown below.
    </div>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/Template.png' | relative_url }}" alt="Word template" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. So far, you have created a prompt that generates text output. To change it to Word document output, select the **Output** dropdown in the upper-right corner of the results panel and choose **Document (preview)**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/OutputSelect.png' | relative_url }}" alt="Select output format" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. To connect the template file to the prompt, select the **Document settings** button, then drag and drop the downloaded file or browse to upload it.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/DocumentSettings.png' | relative_url }}" alt="Document settings" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. After uploading the file, it should recognize 19 identified fields (identified by finding all curly-brace placeholders). Select the **test** button again to confirm that the prompt outputs a Word document.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/DocTest.png' | relative_url }}" alt="Document test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. You should see a response similar to the following. A link to download the document appears at the top. Select the link and confirm that the document is filled correctly.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/DocOutputBtn.png' | relative_url }}" alt="Document output download button" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/DocFilled.png' | relative_url }}" alt="Example filled document" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Click **Save** to save the new prompt.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SavePrompt.png' | relative_url }}" alt="Save prompt" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

### 9.2 Create an agent flow that calls the prompt

Now connect the prompt to your agent. To do this, you need to add an agent flow that calls the prompt and returns the file to the agent.

You may wonder why this step is required and why the agent does not call the prompt directly. Currently, it is difficult to reliably retrieve a file's contentBytes—the actual file content—and return it from the agent as a file item. Using an agent flow lets you extract the file predictably and return it to the agent.

Now create the agent flow.

1. In Copilot Studio, select the **Tools** tab.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/ToolsTab.png' | relative_url }}" alt="Tools tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **New tool** button.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/NewTool.png' | relative_url }}" alt="New tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Agent Flow** option.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/AgentFlowBtn.png' | relative_url }}" alt="Agent Flow button" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Click the **When an agent calls the flow** trigger to expand it, then select the **Add an input** button.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/AddInputBtn.png' | relative_url }}" alt="Add input" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Text** as the user input type.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SelectInputType.png' | relative_url }}" alt="Select input type" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Set the input name to **ApplicationNumber** and enter **What's the job application number** as the description.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/TriggerInputFilled.png' | relative_url }}" alt="Trigger input properties" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **+ plus button** below the When an agent calls the flow trigger and add the **Run a prompt** action.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/AddAction.png' | relative_url }}" alt="Add action" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Interview Question Document Prep** prompt from the dropdown list.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SelectPromptName.png' | relative_url }}" alt="Select prompt" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Click the **ApplicationNumber** input field and select the **lightning bolt icon**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/inputlightningbolt.png' | relative_url }}" alt="Lightning bolt icon" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **ApplicationNumber** input you created earlier.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/MapInput.png' | relative_url }}" alt="Map input" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Expand the **Respond to the agent** action, then select **Add an output**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/AddOutput.png' | relative_url }}" alt="Add output" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **File** from the output type list.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/FileType.png' | relative_url }}" alt="Select file type" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Set the property name to **InterviewFile**. For the value, click the **fx icon**, enter the following formula, and select **Add**.

    ```text
    binary(outputs('Run_a_prompt')?['body/responsev2/predictionOutput/documentOutput/contentBytes'])
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/Formula.png' | relative_url }}" alt="Enter formula" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    <div class="info-box note" markdown="1">
    **Note** — This formula is required to process the output correctly, extract the file, and return it to the agent.
    </div>

1. Select **Save Draft** to save the flow.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SaveDraft.png' | relative_url }}" alt="Save draft" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Overview** tab.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/OverviewTab.png' | relative_url }}" alt="Overview tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Edit** button next to Details.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/EditName.png' | relative_url }}" alt="Edit name" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Enter **Doc Prep** for Flow name and **Creates an interview prep document and returns to the agent** for description, then click **Save**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/FlowName.png' | relative_url }}" alt="Flow name" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Designer** tab.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/Designer.png' | relative_url }}" alt="Designer tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Publish** button to publish the flow.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/PublishFlowBtn.png' | relative_url }}" alt="Publish flow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

### 9.3 Create a topic

Now add a topic to connect all of this to the agent.

The reason you need a topic instead of adding this work to the agent instructions is that, currently, a topic is the only way to guarantee that the file object is returned every time.

Now create the topic.

1. In Copilot Studio, click the **Agents** tab, select **Interview Agent**, and then select the **Topics** tab.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SelectTopicsTab.png' | relative_url }}" alt="Select Topics tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Add a Topic** button and choose **From blank**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/AddTopic.png' | relative_url }}" alt="Add topic" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Rename the Topic name from "Untitled" to **Generate Interview Doc**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/RenameTopic.png' | relative_url }}" alt="Rename topic" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In Topic Trigger, enter the following in **description**.

    ```text
    This topic generates an interview prep document with applicant details, role details and interview questions.
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/TopicDescription.png' | relative_url }}" alt="Topic description" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. This topic must be able to receive the Job Application Number for generating the interview prep file. To do that, use Copilot Studio's AI-powered slot filling. This lets the language model's generative orchestration identify the value that should be brought into the topic.

    To do this, select the **Details** button in the topic.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/DetailsBTN.png' | relative_url }}" alt="Details button" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the details panel, select the **Input** tab, then select **Create a new variable**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/InputNewVariable.png' | relative_url }}" alt="Create new variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Change **Variable name** to **VarApplicationNumber**. In **Description**, enter the following.

    ```text
    Fill with the Job Application Number referenced in the chat. The number always starts with a A followed by at least 5 digits.
    ```

    Leave all other properties unchanged.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/InputFilled.png' | relative_url }}" alt="Completed input variable settings" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **+ plus icon** after the trigger, choose **Add a Tool**, find the **Doc Prep** flow you created earlier in the list, and select it.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SelectFlow.png' | relative_url }}" alt="Select Flow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Click the action's **ApplicationNumber** input field, select **... three dots**, and choose the **VarApplicationNumber** variable to map it to the input.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/MapVariable.png' | relative_url }}" alt="Map variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Now add a message node to return the file to the user. Click the **+ plus icon** below the action you just added and select **Send a message**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/AddMessageNode.png' | relative_url }}" alt="Add message node" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Enter **Here is your interview prep file:** in the text box. Then click the **Add** button and select the **File** option.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/MessageFill.png' | relative_url }}" alt="Compose message" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Click the **Content** input field, select **... three dots**, and choose the **InterviewFile** property.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/MapFile.png' | relative_url }}" alt="Select file" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Click the **Name** input field, select **... three dots**, and then select the **Formula** tab.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SelectNameInput.png' | relative_url }}" alt="Formula tab for name input" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Enter the following formula in the formula pane and select **Insert**.

    ```text
    Topic.VarApplicationNumber&"InterviewPrep.docx"
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/InsertNameFormula.png' | relative_url }}" alt="Insert name formula" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Save** to save the topic.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SaveTopic.png' | relative_url }}" alt="Save topic" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Now test whether the new topic works correctly. Open the test panel and enter the following (the example says A01001; replace it with an appropriate job application number from your Job Application table).

    ```text
    Create an interview prep file for job application A01001
    ```

    Press **Enter**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/TestPanel.png' | relative_url }}" alt="Test panel" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Confirm that the topic is called, the application number is passed, the flow runs, and the file is returned. Click the document link and confirm that the interview prep document downloads to your local drive.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/TestResult.png' | relative_url }}" alt="Test result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Open the document and confirm that it is filled correctly.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/OutputTest.png' | relative_url }}" alt="Check output document" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

Congratulations! You have successfully added document generation to your agent.

## 🎉 Mission complete

Well done, Operative! **Operation Doc Assembly** is now complete. You have successfully enhanced your agent with document generation.

🚀 **Next step:** In the next mission, you will learn how to use the power of MCP servers to add interview scheduling and planning capabilities.

⏩ Go to [Mission 10: MCP integration]({{ '/en/chapters/academy-operative-10-mcp/' | relative_url }}).

## 📚 Tactical resources

📖 [Document output in prompts](https://learn.microsoft.com/microsoft-copilot-studio/generate-document-output-prompt?WT.mc_id=power-182762-apdunnam)

📖 [Use your own data in a prompt](https://learn.microsoft.com/ai-builder/use-your-own-prompt-data?WT.mc_id=power-182762-apdunnam)

📖 [Create a custom prompt](https://learn.microsoft.com/ai-builder/create-a-custom-prompt?WT.mc_id=power-182762-apdunnam)

📖 [Work with Dataverse in Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-dataverse?WT.mc_id=power-182762-apdunnam)

📖 [AI Builder custom prompts overview](https://learn.microsoft.com/ai-builder/prompts-overview?WT.mc_id=power-182762-apdunnam)

📖 [Training: Create AI Builder prompts using your own Dataverse data](https://learn.microsoft.com/training/modules/ai-builder-grounded-prompts/?WT.mc_id=power-182762-apdunnam)
