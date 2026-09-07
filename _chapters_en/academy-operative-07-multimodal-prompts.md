---
layout: "chapter"
lang: en
date: 2026-03-11
title: "Mission 07: Extract Resume Contents with Multimodal Prompts"
short_title: "07. Multimodal Prompts"
description: "Process documents and images with advanced AI capabilities"
order: 7
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/07-multimodal-prompts/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-11"
canonical_url: "https://microsoft.github.io/agent-academy/operative/07-multimodal-prompts/"
---
<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🚨 Mission 07: Extracting Resume Contents with Multimodal Prompts](https://microsoft.github.io/agent-academy/operative/07-multimodal-prompts/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

<figure class="screenshot">
  <a href="https://youtu.be/icP_qH8LFK8?si=VJjtdVi-ytUq0ymg" target="_blank" rel="noopener">
    <img src="{{ '/assets/academy/operative-07-multimodal-prompts/07-multi-modal-prompts-thumbnail.png' | relative_url }}" alt="Multimodal" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
</figure>

## 🎯 Mission Brief

Welcome, Operative. Through the previous missions, you have mastered powerful agent orchestration techniques. Now it is time to unlock a game-changing capability: **multimodal document analysis**.

This mission is code-named **Document Resume Recon**. The objective is to extract structured data from any document with precision. Agents can process text easily, but in the real world we work with PDFs, images, and complex documents every day. Resumes pile up, invoices need to be processed, and forms must be digitized immediately.

By the end of this mission, you will evolve from a text-only agent builder into a **multimodal specialist**. You will learn how to read and understand documents like a human analyst, while processing them with the speed and consistency of AI. By the end, you will have built a complete resume extraction system that integrates with your hiring workflow.

The techniques you learn here are the foundation for the advanced data grounding work covered in the next mission.

<div class="info-box note" markdown="1">
**Note** — If the screenshots in this lab look different from your Copilot Studio screens, turn off **New Experience** in the upper-right corner to switch to the **classic experience** used here.
</div>

## 🔎 Objectives

In this mission, you will learn how to:

1. Understand what multimodal prompts are and which AI model to use for each situation
1. Configure prompts that include image and document inputs
1. Format prompt output as JSON for structured data extraction
1. Apply prompt engineering best practices for document analysis
1. Integrate multimodal prompts with Agent Flows

## 🧠 Understanding multimodal prompts

### What does it mean for a prompt to be "multimodal"?

Traditional prompts process text only. Multimodal prompts, however, can process multiple types of content:

- **Text**: written instructions and content
- **Images**: photos, screenshots, charts, and diagrams (.PNG, .JPG, .JPEG)
- **Documents**: invoices, resumes, and forms (.PDF)

This capability unlocks powerful scenarios such as resume analysis, invoice processing, and form data extraction.

### Why multimodal matters in workflows

Organizations face document processing challenges every day:

- **Resume screening**: manually reading hundreds of resumes takes a lot of time
- **Invoice processing**: vendor information, amounts, and dates must be extracted from documents with inconsistent formats
- **Form analysis**: paper forms must be converted into digital data

Multimodal prompts remove these bottlenecks by combining AI language understanding with visual analysis. In other words, AI can process documents as effectively as it processes text.

### Common business scenarios

Here are examples where multimodal prompts can be applied.

| Scenario | Task | Example output fields |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| **Resume screening** | Extract the candidate's name, email, phone number, current title, years of experience, and key skills. | Candidate Name, Email Address, Phone Number, Current Job Title, Years of Experience, Key Skills |
| **Invoice processing** | Extract vendor information, invoice date, total amount, and line items from this invoice. | Vendor Name, Invoice Date, Total Amount, Invoice Line Items |
| **Form analysis** | Analyze this application form and extract all entered fields. | Field Name (e.g., Applicant Name), Entered Value (e.g., John Doe), ... |
| **ID document verification** | Extract the name, ID number, expiration date, and address from this identity document. Verify that all text is clearly readable and flag any unclear sections. | Full Name, Identification Number, Expiration Date, Address, Unclear Sections Flag |

## ⚙️ Selecting a model in AI Builder

AI Builder provides several models optimized for specific tasks. Understanding which model to use is critical to success.

<div class="info-box note" markdown="1">
**Note: as of September 2025** — AI Builder models are updated regularly, so check the latest [AI Builder model settings documentation](https://learn.microsoft.com/ai-builder/prompt-modelsettings) for currently available models.
</div>

### Model comparison

All of the models below support vision and document processing.

| Model | 💰Cost | ⚡Speed | ✅Best for |
|-------|------|-------|----------|
| **GPT-4.1 mini** | Basic (most cost-effective) | Fast | Standard document processing, summarization, budget-conscious projects |
| **GPT-4.1** | Standard | Moderate | Complex documents, advanced content creation, high accuracy needs |
| **o3** | Premium | Slow (reasons first) | Data analysis, critical thinking, sophisticated problem-solving |
| **GPT-5 chat** | Standard | Enhanced | Latest document understanding, highest response accuracy |
| **GPT-5 reasoning** | Premium | Slow (complex analysis) | Most sophisticated analysis, planning, advanced reasoning |

### Understanding Temperature settings

Temperature controls how creative or predictable AI responses are.

- **Temperature 0**: most predictable and consistent results (best for data extraction)
- **Temperature 0.5**: balances creativity and consistency
- **Temperature 1**: maximum creativity (best for content generation)

For document analysis, use **temperature 0** for consistent data extraction.

## 📊 Output format: Text vs JSON

Choosing the right output format is essential, depending on what later processing steps will do.

### When to use Text output

Text output is appropriate for:

- Human-readable summaries
- Simple classification
- Content that does not require structured processing

### When to use JSON output

JSON output is required for:

- Structured data extraction
- Integration with databases or systems
- Power Automate flow processing
- Consistent field mapping

### JSON best practices

1. **Define clear field names**: Use descriptive, consistent names.
1. **Provide examples**: Include sample outputs and values for each field.
1. **Specify data formats**: Include examples for dates, numbers, and text.
1. **Handle missing data**: Design in advance how null or empty values should be handled.
1. **Validate the structure**: Test with different document types.

### Document quality considerations

- **Resolution**: Make sure images are clear and readable.
- **Orientation**: Rotate documents to the correct orientation before processing.
- **Format support**: Test with the document formats you use (PDF, JPG, PNG).
- **Size limits**: Know the file size limits in your environment.

### Performance optimization

- **Choose the right model**: Upgrade to higher-end models only when needed.
- **Optimize prompts**: Shorter, clearer instructions usually perform better.
- **Error handling**: Plan how to handle documents that cannot be processed.
- **Monitor costs**: Different models consume different amounts of AI Builder credits.

## 🧪 Lab 7 - Build a resume extraction system

Now it is time to apply your multimodal knowledge. You will build a comprehensive resume extraction system that analyzes candidate documents and converts them into structured data for the hiring workflow.

### Prerequisites for completing this mission

1. You need the following:

    - **Complete Mission 06** so the multi-agent hiring system is ready.
    - Download sample resume documents from [Test Resumes](https://download-directory.github.io/?url=https://github.com/microsoft/agent-academy/tree/main/docs/operative/test-data/resumes).

### 7.1 Create a multimodal prompt

The first objective is to create a prompt that can analyze resume documents and extract structured data.

1. Sign in to [Copilot Studio](https://copilotstudio.microsoft.com), then select **Tools** from the left navigation menu.

1. Select **+ New tool**, then select **Prompt**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-new-prompt.png' | relative_url }}" alt="New prompt" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Rename** the prompt from the default timestamp name (for example, *Custom prompt 09/04/2025, 04:59:11 PM*) to `Summarize Resume`.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-promptname.png' | relative_url }}" alt="Rename" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Add the following prompt to the Instructions field.

    ```text
    You are tasked with extracting key candidate information from a resume and cover letter to facilitate matching with open job roles and creating a summary for application review.
    
    Instructions:
    1. Extract Candidate Details:
        - Identify and extract the candidate’s full name.
        - Extract contact information, specifically the email address.
    2. Create Candidate Summary:
        - Summarize the candidate’s profile as multiline text (max 2000 characters) with the following sections:
            - Candidate name
            - Role(s) applied for if present
            - Contact and location
            - One-paragraph summary
            - Experience snapshot (last 2–3 roles with outcomes)
            - Key projects (1–3 with metrics)
            - Education and certifications
            - Top skills (Top 10)
            - Availability and work authorization
    
    Guidelines:
    - Extract information only from the provided resume and cover letter documents.
    - Ensure accuracy in identifying all details such as contact details and skills.
    - The summary should be concise but informative, suitable for quick application review.
    
    Resume: /document
    CoverLetter: /text
    ```

    <div class="info-box note" markdown="1">
    **Tip: Use Copilot** — To generate a prompt in natural language, you can use "Get started with Copilot." Ask Copilot to create a prompt that summarizes a resume.
    </div>

1. **Configure** the input parameters.

    | Parameter | Type | Name | Sample Data |
    |-----------|------|------|-------------|
    | Resume | Image or document | Resume | Upload a sample resume from the test-data folder |
    | CoverLetter | Text | CoverLetter | Here is a Resume! |

1. Select **Test** to check the prompt's initial Text output.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-prompt-parameters.png' | relative_url }}" alt="Configure parameters and test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

### 7.2 Configure JSON output

Now update the prompt so that it outputs structured JSON data instead of plain text.

1. Add the following JSON format specification to the end of the prompt Instructions.

    Output Format:
    Provide the output in valid JSON format with the following structure:

    ```text
    
    {
    "CandidateName": "string",
    "Email": "string",
    "Summary": "string max 2000 characters",
    "Skills": [{"item": "Skill 1"}, {"item": "Skill 2"}],
    "Experience": [{"item": "Experience 1"}, {"item": "Experience 2"}]
    }
    ```

1. Change the **Output** setting from "Text" to **JSON**.

1. Select **Test** again and confirm that the output is now in JSON format.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-json-prompt.png' | relative_url }}" alt="Set the prompt to JSON" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Optional:** Try different AI models to see how the output changes, then switch back to the default model.

1. Select **Save** to create the prompt.

1. When the **Configure for use in Agent** dialog opens, select **Cancel**.

    <div class="info-box note" markdown="1">
    **Note: why we are not adding this as a tool yet** — Instead of adding this prompt directly as a tool, you will use it inside an Agent Flow. This gives you finer control over the data processing workflow.
    </div>

### 7.3 Add the prompt to an Agent Flow

Now create an Agent Flow that will process resumes stored in Dataverse.

<div class="info-box note" markdown="1">
**Tip: Agent Flow expressions** — Node names and expression inputs reference previous node names, so follow the names and expressions in the instructions exactly. For a quick review, see Recruit's [Agent Flow mission]({{ '/en/chapters/academy-recruit-09-add-an-agent-flow/' | relative_url }}).
</div>

1. In Copilot Studio, go to **Hiring Agent**.

1. Select the **Agents** tab, then select the child agent **Application Intake Agent**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-AppIntakeAgentSelect.png' | relative_url }}" alt="Select agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the **Tools** panel, select **+ Add** → **+ New tool** → **Agent flow**.

1. On the When an agent calls the flow node, use **+ Add an input** to add the following parameter.

    | Type | Name | Description |
    |------|------|-------------|
    | Text | ResumeNumber | Be sure to use [ResumeNumber]. This must always start with the letter R |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-AgentFlowTrigger.png' | relative_url }}" alt="Trigger" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **+** Insert action icon below the first node, search for **Dataverse list rows**, and select the **List rows** action.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-AddListRows.png' | relative_url }}" alt="Add List rows" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **ellipsis (...)** on the List rows node, use **Rename** to rename it `Get Resume Record`, and configure it as follows.

    | Property | How to Set | Value |
    |----------|------------|-------|
    | **Table name** | Select | Resumes |
    | **Filter rows** | Dynamic data (thunderbolt icon) | `ppa_resumenumber eq 'ResumeNumber'` Replace **ResumeNumber** with **When an agent calls the flow** → **ResumeNumber** |
    | **Row count** | Enter | 1 |

    <div class="info-box note" markdown="1">
    **Tip: optimize the query!** — When using this pattern in a production environment, always limit the query to select only the columns the Agent Flow needs.
    </div>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-1.png' | relative_url }}" alt="Get resume record" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **+** Insert action icon below the Get Resume Record node, search for **Dataverse download**, and then select **Download a file or an image**.

    <div class="info-box note" markdown="1">
    **Tip: choose the correct action!** — Be careful not to select the action whose name ends with "from selected environment."
    </div>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-DataverseDownload.png' | relative_url }}" alt="Dataverse download" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. As before, rename the action to `Download Resume` and set the following parameters.

    | Property | How to Set | Value |
    |----------|------------|-------|
    | **Table name** | Select | Resumes |
    | **Row ID** | Expression (fx icon) | `first(body('Get_Resume_Record')?['value'])?['ppa_resumeid']` |
    | **Column name** | Select | Resume PDF |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-2.png' | relative_url }}" alt="Download resume" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Now select the **+** Insert action icon below Download Resume, and under **AI capabilities**, select **Run a prompt**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-RunPrompt.png' | relative_url }}" alt="Run prompt" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Rename the action to `Summarize Resume` and set the following parameters.

    | Property | How to Set | Value |
    |----------|------------|-------|
    | **Prompt** | Select | Summarize Resume |
    | **CoverLetter** | Expression (fx icon) | `first(body('Get_Resume_Record')?['value'])?['ppa_coverletter']` |
    | **Resume** | Dynamic data (thunderbolt icon) | Download Resume → File or image content |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-3.png' | relative_url }}" alt="Summarize resume prompt" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    <div class="info-box note" markdown="1">
    **Tip: prompt parameters** — Notice that the parameters you fill in here are the same items you configured as input parameters when creating the prompt.
    </div>

### 7.4 Create a candidate record

In the next step, use the information returned by the prompt to create a new candidate record if that candidate does not already exist.

1. Select the **+** Insert action icon below the Summarize Resume node, search for **Dataverse list**, and select **List rows**.

1. Rename the node to `Get Existing Candidate` and configure it as follows.

    | Property | How to Set | Value |
    |----------|------------|-------|
    | **Table name** | Select | Candidates |
    | **Filter rows** | Dynamic data (thunderbolt icon) | `ppa_email eq 'Email'`  **Replace** `Email` with **Summarize Resume → Email** |
    | **Row count** | Enter | 1 |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-4.png' | relative_url }}" alt="Get existing candidate" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **+** Insert action icon below the Get Existing Candidate node, search for **Control**, and then select **See more** to find the **Condition** action.

1. In the Condition properties, configure the following condition.

    | Condition | Operator | Value |
    |-----------|----------|-------|
    | Expression (fx icon): `length(outputs('Get_Existing_Candidate')?['body/value'])` | is equal to | 0 |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-5.png' | relative_url }}" alt="Existing candidate condition" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In the **True** branch, select the **+** Insert action icon, search for **Dataverse add**, and select **Add a new row**.

1. Rename the node to `Add a New Candidate` and configure it as follows.

    | Property | How to Set | Value |
    |----------|------------|-------|
    | **Table name** | Select | Candidates |
    | **Candidate Name** | Dynamic data (thunderbolt icon) | Summarize Resume → `CandidateName` |
    | **Email** | Dynamic data (thunderbolt icon) | Summarize Resume → `Email` |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-6.png' | relative_url }}" alt="Add new candidate" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

### 7.5 Update the resume and configure Flow output

Now update the resume record and configure what data to return to the agent to complete the Flow.

1. Select the **+** Insert action icon below the Condition, search for **Dataverse update**, and select **Update a row**.

1. Select the title to rename the node to `Update Resume`, select **Show all**, and then set the following parameters.

    | Property | How to Set | Value |
    |----------|------------|-------|
    | **Table name** | Select | Resumes |
    | **Row ID** | Expression (fx icon) | `first(body('Get_Resume_Record')?['value'])?['ppa_resumeid']` |
    | **Summary** | Dynamic data (thunderbolt icon) | Summarize Resume → Text |
    | **Candidate (Candidates)** | Expression (fx icon) | `concat('ppa_candidates/',if(equals(length(outputs('Get_Existing_Candidate')?['body/value']), 1), first(outputs('Get_Existing_Candidate')?['body/value'])?['ppa_candidateid'], outputs('Add_a_New_Candidate')?['body/ppa_candidateid']))` |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-7.png' | relative_url }}" alt="Update resume" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Respond to the agent** node, then use **+ Add an output** to configure the following outputs.

    | Type | Name | How to Set | Value | Description |
    | ---- | ---- | ---------- | ----- | ----------- |
    | Text | `CandidateName` | Dynamic data (thunderbolt icon) | Summarize Resume → See more → CandidateName | The [CandidateName] given on the Resume |
    | Text | `CandidateEmail` | Dynamic data (thunderbolt icon) | Summarize Resume → See more → Email | The [CandidateEmail] given on the Resume |
    | Text | `CandidateNumber` | Expression (fx icon) | `if(equals(length(outputs('Get_Existing_Candidate')?['body/value']), 1), first(outputs('Get_Existing_Candidate')?['body/value'])['ppa_candidatenumber'], outputs('Add_a_New_Candidate')?['body/ppa_candidatenumber'])` | The [CandidateNumber] of the new or existing candidate |
    | Text | `ResumeSummary` | Dynamic data (thunderbolt icon) | Summarize Resume → See more → body/responsev2/predictionOutput/structuredOutput | The resume summary and details in JSON form |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-8.png' | relative_url }}" alt="Respond to the agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Save draft** in the upper-right corner. The Agent Flow should look similar to the image below. Make sure the Update Resume step is outside the Condition block.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-9.png' | relative_url }}" alt="Summarize Resume Agent Flow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Overview** tab, then select **Edit** in the **Details** panel.

    1. **Flow name**:`Summarize Resume`
    1. **Description**:

    ```text
    Summarize an existing Resume stored in Dataverse using a [ResumeNumber] as input, return the [CandidateNumber], and resume summary JSON
    ```

1. Select **Save**.

1. Return to the **Designer** tab and select **Publish**.

### 7.6 Connect the Flow to the agent

Now add the Flow as a tool and configure the agent to use it.

1. In Copilot Studio, open **Hiring Agent**.

1. Select the **Agents** tab and open **Application Intake Agent**.

1. In the **Tools** panel, select **+ Add a tool** -> **Flow** -> **Summarize Resume** **(Agent Flow)**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-SummarizeResumeFlowselect.png' | relative_url }}" alt="Select Summarize Resume Agent Flow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Add and configure**.

1. Configure the tool settings as follows.

    | Setting | Value |
    |---------|-------|
    | **Description** | Summarize an existing Resume stored in Dataverse using a [ResumeNumber] as input, return the [CandidateNumber], and resume summary JSON |
    | **When this tool may be used** | Only when referenced by topics or agents |

1. Select **Save**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-configure-summarize-resume-tool.png' | relative_url }}" alt="Configure Summarize Resume tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. In Hiring Agent, select Tools. Both tools are now shown as available to **Application Intake Agent**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-agent-tools.png' | relative_url }}" alt="Agent tools" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Go to the Instructions for the **Application Intake Child** agent and **delete** the two paragraphs that begin with:

    - `2.Post-Upload`
    - `Process for Resume Upload via Email`

1. **Add** the following instructions to the end of the remaining Instructions.

    ```text
    2. Post-Upload Processing  
        - After uploading, be sure to also output the [ResumeNumber] in all messages
        - Pass [ResumeNumber] to /Summarize Resume  - Be sure to use the correct value that will start with the letter R.
        - Be sure to also output the [CandidateNumber] in all messages
        - Use the [ResumeSummary] to output a summary of the processed Resume and candidate
    ```

    Replace `/Summarize Resume` by typing a slash (`/`) or selecting `/Summarize` to insert a reference to the **Summarize Resume agent flow**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-instructions-update.png' | relative_url }}" alt="Update instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Save**.

### 7.7 Test the agent

Now test whether the full multimodal system works correctly.

1. **Start the test**:

    - Select **Test** to open the test panel.
    - Enter: `Here is a candidate Resume`
    - Upload one of the sample resumes from [Test Resumes](https://download-directory.github.io/?url=https://github.com/microsoft/agent-academy/tree/main/docs/operative/test-data/resumes).

1. **Verify the result**:
    - After sending the message and resume, confirm that you receive a Resume Number (format: R#####).
    - Confirm that you also receive the Candidate Number and summary.
    - Open the activity map and confirm that both the Resume upload tool and Summarize Resume tool run, and that the Summary Prompt output is passed to the agent.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-test-result.png' | relative_url }}" alt="Test result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Verify data persistence**:
    - Go to [Power Apps](https://make.powerapps.com).
    - Open **Apps** → **Hiring Hub** → **Play**.
    - Go to **Resumes** and confirm that the resume was uploaded and processed. It should have both summary information and a linked candidate record.
    - Check the extracted candidate information in **Candidates**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-resume-in-dataverse.png' | relative_url }}" alt="Resume with candidate and summary" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    - If you run the process again, it should use the existing Candidate based on the email extracted from the resume instead of creating a new record.

<div class="info-box note" markdown="1">
**Troubleshooting** —

- **Resume is not processed**: Make sure the file is a PDF and is under the size limit.
- **Candidate is not created**: Make sure the email was extracted correctly from the resume.
- **JSON formatting errors**: Make sure the prompt instructions include the exact JSON structure.
- **Flow errors**: Check that all Dataverse connections and expressions are configured correctly.
</div>

### Production readiness

This item is not required for this mission, but to make this Agent Flow production-ready, consider the following:

1. **Error handling** - Add error handling that returns a clear error to the agent if the Resume Number cannot be found or the prompt cannot parse the document.
1. **Update existing Candidates** - After finding a candidate by email, you can update the name to match the name on the resume.
1. **Separate resume summarization and Candidate creation** - You can split this capability into smaller, easier-to-maintain Agent Flows and instruct the agent to use them in sequence.

## 🎉 Mission complete

Excellent work, Operative! The **Document Resume Recon** mission is complete. You have successfully mastered multimodal prompts and can now extract structured data from any document with precision.

In this mission, you accomplished the following:

**✅ Multimodal prompt mastery**  
You now understand what multimodal prompts are and can choose the right AI model for each situation to achieve the best results.

**✅ Document processing expertise**  
You learned how to configure prompts with image and document inputs and format outputs as JSON for structured data extraction.

**✅ Resume extraction system built**  
You built a complete resume extraction system that processes candidate documents and integrates with the hiring workflow.

**✅ Best practices applied**  
You applied prompt engineering best practices for document analysis and integrated multimodal prompts with Agent Flows.

**✅ Foundation for advanced processing**  
You strengthened your document analysis capabilities for the advanced data grounding features you will add in future missions.

🚀 **Next mission:** In Mission 08, you will learn how to strengthen prompts with real-time data from Dataverse and create dynamic AI solutions that adapt to changing business requirements.

⏩ [Go to Mission 08]({{ '/en/chapters/academy-operative-08-dataverse-grounding/' | relative_url }}): Strengthen prompts with Dataverse grounding

## 📚 Tactical resources

📖 [Create a prompt](https://learn.microsoft.com/ai-builder/create-a-custom-prompt?WT.mc_id=power-power-182762-scottdurow)

📖 [Add text, image, or document input to your prompt](https://learn.microsoft.com/ai-builder/add-inputs-prompt?WT.mc_id=power-182762-scottdurow)

📖 [Process responses with JSON output](https://learn.microsoft.com/ai-builder/process-responses-json-output?WT.mc_id=power-182762-scottdurow)

📖 [Model selection and temperature settings](https://learn.microsoft.com/ai-builder/prompt-modelsettings?WT.mc_id=power-182762-scottdurow)

📖 [Use your prompt in Power Automate](https://learn.microsoft.com/ai-builder/use-a-custom-prompt-in-flow?WT.mc_id=power-182762-scottdurow)

📺 [AI Builder: JSON outputs in prompt builder](https://www.youtube.com/watch?v=F0fGnWrRY_I)
