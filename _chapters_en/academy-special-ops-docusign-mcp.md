---
layout: "chapter"
lang: en
date: 2026-06-16
title: "Microsoft Copilot Studio + Docusign MCP"
short_title: "Docusign MCP"
description: "A hands-on lab for connecting the Docusign MCP Demo server to a Copilot Studio agent and triggering Workflow Builder agreement automation. Learn how to automate an end-to-end employment agreement workflow."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/docusign-mcp/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-10"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/docusign-mcp/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [📄 Microsoft Copilot Studio + Docusign MCP](https://microsoft.github.io/agent-academy/special-ops/docusign-mcp/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

# 📄 Microsoft Copilot Studio + Docusign MCP

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/Academy-Docusign_Badge.png' | relative_url }}" alt="Docusign MCP Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Docusign MCP Badge</figcaption></figure>

Welcome, agent. Your objective is to reuse what already works: connect the Docusign MCP Demo server to your Copilot Studio agent and trigger an existing Workflow Builder workflow. Your agent gathers inputs. Workflow Builder executes the agreement process.

## 🔎 Objectives

In this mission, you'll learn how to:

- Create Docusign Web Forms, document templates, and a Workflow Builder workflow
- Add the Docusign MCP Demo tool to your agent
- Invoke the Workflow Builder workflow from the agent
- Provide inputs in natural language for the workflow start step when testing the agent
- _Bonus_: add your first Microsoft MCP tool (Work IQ Calendar) to extend the agent with multi-MCP capabilities

## ❓ What is Docusign?

[Docusign](https://www.docusign.com) is an agreement execution engine.

It enables organizations to create, send, sign, and manage agreements digitally, reducing manual and paper-based work. Beyond eSignatures, Docusign is an [Intelligent Agreement Management (IAM) platform](https://www.docusign.com/intelligent-agreement-management) that supports the full agreement lifecycle, from creation to tracking and storage.

### 💼 Why it matters

Agreements are business-critical, but manual handling causes delays and inconsistency. Docusign makes agreement processes faster, trackable, and scalable.

## 🏗️ What is Docusign Workflow Builder?

Workflow Builder is where agreements become automated workflows.

It defines how agreements move from data collection to document generation and signing, without manual coordination. You design a workflow once and run it consistently.

### 💡 Common use cases

- Employee onboarding
- Sales agreements
- Procurement approvals
- NDAs and compliance workflows

### ⚙️ What Workflow Builder does

- Structure multi-step workflows
- Collect inputs through Web Forms
- Generate agreements from templates and data
- Route documents between participants in the right order
- Connect to third-party applications and services
- Provide visibility into workflow progress

### 🧩 Key Workflow Builder capabilities

#### Identity Verification
Confirm signer identity before agreement completion.

#### Web Forms
Collect structured browser-based input before agreement generation. Captured data can automatically populate documents.

#### Document Generation
Automatically generate agreements and documents using collected data and reusable templates.

#### eSignature
Enable legally recognized electronic signatures in workflows.

#### App Center
Connect Workflow Builder to third-party apps and services.

#### Workflow Templates
Use pre-built templates for common scenarios to deploy standardized agreement flows quickly.

#### Agreement Desk
Centralize agreement preparation, review, and collaboration across teams.

### 🚀 How this works with your agent

A Copilot Studio agent _does not_ replace the workflow — it triggers it. You are not rebuilding agreement logic from scratch. You are reusing a workflow already built in Docusign. The agent collects inputs in natural language, then Workflow Builder runs the agreement process end to end.

## 🛡️ Certified MCP spotlight: Docusign MCP Demo

The Docusign MCP Demo server is supported in Copilot Studio and is published as a certified MCP integration in Microsoft's connector ecosystem.

Why this matters for your mission:

- **Enterprise trust signal**: Certified MCP servers go through Microsoft validation and review stages before broad availability.
- **Security and compliance alignment**: Certification includes checks for packaging quality, behavior validation, and security/compliance readiness.
- **Responsible AI expectations**: Certification review includes safety evaluation, but safe usage in your tenant still depends on implementation choices.

In practical terms, this means you are not connecting to an unknown endpoint. You are integrating a reviewed MCP server that can expose Docusign capabilities to your agent through natural language.

### 🔐 Security and governance guidance for this mission

Treat it as safe by design, not safe by default:

- Use the correct account and connector pairing:
  - Docusign developer account (also called a demo or sandbox account) with Docusign MCP Demo
  - Docusign production account with Docusign MCP
- Use OAuth and least-privilege accounts wherever possible.
- Keep a human in the loop for high-impact actions.
- Validate prompts and outputs before scaling into production scenarios.

<div class="info-box note" markdown="1">
**Warning**: Certification does not remove your organization's responsibility to configure and govern safe usage. You still need to apply least privilege, monitor usage, and retain human review for high-impact workflows.
</div>

### ✍️ Docusign MCP Demo connector notes

The Docusign MCP Demo connector is intended for sandbox testing. It is separate from the Docusign MCP production connector, and workflows do not automatically migrate between Demo and Production environments.

For this Special Ops lab, that is exactly what you want: a safe development space to test prompt-driven agreement workflows before a production rollout.

### 📚 Learn more about Docusign MCP and Microsoft MCP server certification

- [Microsoft MCP server certification](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-certification)
- [Docusign MCP Demo connector (Microsoft Learn)](https://learn.microsoft.com/en-us/connectors/docusignmcpdemo/)
- [Docusign MCP overview](https://support.docusign.com/s/document-item?language=en_US&bundleId=ug3906200f-95c6-4a6b-90b1-f928c85961c6&topicId=con1438e5dd-ae84-435f-8b2e-028117782a6d.html&_LANG=enus)

## 🧪 Docusign MCP Lab

In this Special Ops mission, you'll work through two practical use cases:

- First, automate a complete employment agreement flow in Docusign.
- Second, optionally extend the flow with calendar follow-up using a second MCP tool.

### ✨ Use case scenario

#### Use case 1: Core hiring workflow (Labs 1.1–1.5)

**As a recruiter**,

**I want to digitally deliver an employment agreement and employee offer letter**,

**so that** candidates can review and complete signatures faster.

To complete this scenario:

- 1.1 Create a Docusign Web Form
- 1.2 Create document templates
- 1.3 Create a Docusign Workflow Builder workflow
- 1.4 Test the workflow
- 1.5 Build a custom agent in Microsoft Copilot Studio, connect Docusign MCP Demo, and trigger the workflow

**Outcome**: The agent collects inputs and triggers the Docusign Workflow Builder workflow you already built, end to end.

#### Use case 2: Multi-MCP extension (Lab 1.6)

Use case for Lab 1.6:

**As a hiring manager**,

**I want to automatically schedule a prep meeting before the new employee's start date**,

**so that** I have dedicated calendar time to complete onboarding tasks.

### 🪾 Solution diagram

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/0.0_02_SolutionDiagram.png' | relative_url }}" alt="Solution diagram showing a Copilot Studio agent triggering Docusign Workflow Builder through MCP and extending the work with Work IQ Calendar" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Solution architecture diagram</figcaption></figure>

The agent is the control layer.

- The user interacts with the Copilot Studio agent, and the agent collects inputs and triggers a Docusign Workflow Builder workflow through MCP.
- Docusign handles the agreement process end to end, and additional tools such as Work IQ Calendar can extend the flow with supporting tasks.

One prompt. Multiple systems. Orchestrated execution.

### ✅ Prerequisites

#### Docusign

- Sign up for a free **Docusign developer account** if you don't already have one:
  - Go to [https://developers.docusign.com](https://developers.docusign.com) and select **Create Account** in the upper-right corner.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/0.0_01_CreateDeveloperAccount.png' | relative_url }}" alt="Select Create Account" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create a Docusign developer account</figcaption></figure>

#### Microsoft

- Copilot Studio license
- Access to a Copilot Studio developer environment
- Administrator permissions to create solutions and agents
- A SharePoint site where you have permission to create a new folder in the Documents library

<div class="info-box note" markdown="1">
**Tip**: If you need help setting up a Copilot Studio license, see the [Recruit course setup lab](https://microsoft.github.io/agent-academy/recruit/00-course-setup/).
</div>

#### Two email addresses

To complete this lab, you need two different email addresses:

- An email address to use as the employee
- An email address to use as the hiring manager

## 🧪 1.1 Create a Docusign Web Form

<div class="info-box note" markdown="1">

**Warning**: To complete this Docusign lab exercise, you need a Docusign developer account. Follow the steps in the **Prerequisites** section above.

</div>

Web Forms let organizations collect information through secure browser-based forms, which can automatically populate agreements and workflows with data. They help reduce manual data entry, improve accuracy, and streamline processes such as onboarding, registration, approvals, and agreement generation.

To learn more about **Web Forms**, expand the additional learning block below.

<div class="info-box note" markdown="1">

**Web Forms: collecting pre-agreement data**

🤔 **What are Web Forms?**

Within Workflow Builder, Web Forms provide a way to collect user input before an agreement is generated or sent.

Examples:

- Customer application forms
- Employee onboarding questionnaires
- Supplier registration forms
- Service request forms
- Intake forms for legal or HR teams

Instead of manually entering information into an agreement, users enter details directly into a form.

The captured data can:

- Automatically populate an agreement
- Trigger a workflow
- Feed information into business systems
- Start the signature process

🌱 Web Forms support:

- Text fields
- Dropdowns
- Checkboxes
- Conditional logic
- Required inputs
- Template field mapping

💡 **This helps minimize**

- Manual data entry
- Copy/paste errors
- Delays caused by incomplete submissions

</div>

1. On the Docusign developer portal home page, select **Templates**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_01_Templates.png' | relative_url }}" alt="Select Templates" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Templates</figcaption></figure>

1. In the left navigation pane, select **Start**. Select **Web Forms**, then select **Create Web Form**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_02_CreateWebForm.png' | relative_url }}" alt="Select Create Web Forms" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create a Web Form</figcaption></figure>

1. You are asked how you want to create the Web Form. Select **Start From Scratch**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_03_StartFromScratch.png' | relative_url }}" alt="Select Start from Scratch" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Start from scratch</figcaption></figure>

1. Enter a name for the Web Form. For example:

    ```text
    Request for your contact information
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_04_NameWebForm.png' | relative_url }}" alt="Enter the Web Form name" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Enter the Web Form name</figcaption></figure>

1. The Web Form designer appears. By default, there are three pages: Welcome page, Untitled page, and Thank you page.

    On the **Welcome page**, update the following fields:

    **Page title**

    ```text
    👋🏻 Hey there!
    ```

    **Page subtitle**

    ```text
    As we kick-off the next stage in sending you an offer, we need some details from you.

    Please complete this form and shortly after you'll receive an Employment Agreement and Offer Letter.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_05_WelcomePageDetails.png' | relative_url }}" alt="Update Welcome page details" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Welcome page details</figcaption></figure>

1. Select the **Untitled** page and update the following fields:

    **Page title**

    ```text
    Your name
    ```

    **Page subtitle**

    ```text
    Please provide us with your name
    ```

    **API reference name**

    ```text
    Step_CandidateName
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_06_YourNamePage.png' | relative_url }}" alt="Update Your Name page details" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Your Name page</figcaption></figure>

1. Add fields to this page. Select the **plus icon** below the page title section in the middle of the designer.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_07_AddField.png' | relative_url }}" alt="Select the plus icon to add a field" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a field</figcaption></figure>

1. Select **Text Field**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_08_SelectTextField.png' | relative_url }}" alt="Select Text Field" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Text Field</figcaption></figure>

1. The field attributes appear. Update the following attributes:

    | Field name    | Field description | Required field | API reference name    |
    |---------------|-------------------|----------------|-----------------------|
    | `First Name`  | `Your first name` | Yes            | `TextBox_FirstName`   |

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_09_FirstNameField.png' | relative_url }}" alt="Update field attributes" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>First Name field attributes</figcaption></figure>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_10_FirstNameField.png' | relative_url }}" alt="Update field attributes" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>First Name field settings</figcaption></figure>

1. Repeat the same steps to add the remaining **Text Fields**. Select the **plus icon** and add new **Text Fields** with the following attributes:

    | Field name    | Field description  | Required field | API reference name   |
    |---------------|--------------------|----------------|----------------------|
    | `Middle Name` | `Your middle name` | No             | `TextBox_MiddleName` |
    | `Surname`     | `Your surname`     | Yes            | `TextBox_Surname`    |
    | `Full Name`   | `Your full name`   | Yes            | `TextBox_FullName`   |

    After adding the **Text Fields**, select the **plus icon** in the left pane and select **New Blank Page**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_12_AddNewBlankPage.png' | relative_url }}" alt="Add New Blank Page" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a new blank page</figcaption></figure>

1. Update the following fields on the new page:

    **Page title**

    ```text
    Address
    ```

    **Page subtitle**

    ```text
    Please provide us with your physical address
    ```

    **API reference name**

    ```text
    Step_CandidateAddress
    ```

    Repeat the same steps to add the remaining **Text Fields**. Select the **plus icon** and add new **Text Fields** with the following attributes:

    <div class="info-box note" markdown="1">

    **Note**: The table below shows a generic address format. You can adjust it, but keep track of any changes because you will need them in a later step. To avoid issues in later steps, use the following address format.

    </div>
    | Field name       | Field description | Required field | API reference name      |
    |------------------|-------------------|----------------|-------------------------|
    | `Address Line 1` | `Street Address`  | Yes            | `TextBox_AddressLine1`  |
    | `Address Line 2` | `Suburb/District` | Yes            | `TextBox_AddressLine2`  |
    | `City`           | `City`            | Yes            | `TextBox_City`          |
    | `Post Code`      | `Post Code`       | Yes            | `TextBox_PostCode`      |

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_13_AddressPage.png' | relative_url }}" alt="Update Address page details" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Address page</figcaption></figure>

1. After adding the **Text Fields**, select **Thank you page** in the left pane.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_14_FieldsAddedToAddressPage.png' | relative_url }}" alt="Select Thank you page" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Address page fields added</figcaption></figure>

1. Update the following fields on the **Thank you page**:

    **Page title**

    ```text
    ✨ Thank you
    ```

    **Page subtitle**

    ```text
    We've received your form. Expect an email soon with documents to sign.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_15_ThankYouPageDetails.png' | relative_url }}" alt="Update Thank you page details" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Thank you page details</figcaption></figure>

1. Your Web Form configuration is complete. To view the end-user experience, select **Preview**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_16_PreviewWebForm.png' | relative_url }}" alt="Select Preview" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview the Web Form</figcaption></figure>

1. The Web Form opens in preview mode. You can enter the required information on each page. Enter a name on the **Your Name page** and select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_17_CompleteYourNamePage.png' | relative_url }}" alt="Complete the Your Name page" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Complete the name page</figcaption></figure>

1. Next, complete the **Address page**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_18_AddressPage.png' | relative_url }}" alt="Address page in the Web Form" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Address page</figcaption></figure>

1. Enter information on the **Address page** and select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_19_CompleteAddressPage.png' | relative_url }}" alt="Complete the Address page" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Complete the address page</figcaption></figure>

1. A summary of the information entered on both pages is shown.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_20_Review.png' | relative_url }}" alt="Review entered information" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Review entered information</figcaption></figure>

1. Scroll down and select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_21_NextPage.png' | relative_url }}" alt="Select Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Next</figcaption></figure>

1. An error appears next. This is expected because the Web Form is in preview mode. Select **Create**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_22_Error.png' | relative_url }}" alt="Select Create" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview mode error (expected)</figcaption></figure>

1. Now activate the Web Form. In the upper-right corner of the designer, select **Activate**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_23_Activate.png' | relative_url }}" alt="Select Activate" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Activate the Web Form</figcaption></figure>

1. A confirmation modal appears with an **Access setting** field. Leave it set to **Public** because it will be used in a workflow step later in the lab, and select **Activate**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_24_Activate.png' | relative_url }}" alt="Select Activate" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Confirm activation</figcaption></figure>

1. A confirmation message appears indicating that the Web Form was activated successfully. Select **Go to Web Forms**.

    <div class="info-box note" markdown="1">

    **Tip**: If the **Go to Web Forms** button is not visible, navigate back to the Web Forms page.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_25_GoToWebForms.png' | relative_url }}" alt="Select Go to Web Forms" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Go to Web Forms</figcaption></figure>

1. The Web Form is shown with an **Active** status. You successfully built a Web Form 👏🏻

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_26_ActiveWebForm.png' | relative_url }}" alt="Web Form with Active status" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Active Web Form</figcaption></figure>

## 🧪 1.2 Create document templates

Document templates are reusable settings for sending agreements. They let you predefine documents, recipient roles, routing order, and messages. This helps you quickly create and send consistent agreement envelopes without starting from scratch every time.

To learn more about **Document Templates**, expand the additional learning block below.

<div class="info-box note" markdown="1">

**Using Document Templates**

📄 Workflow Builder works closely with document templates.

Templates let organizations standardize frequently used agreements, such as:

- NDAs
- Employment agreements
- Purchase forms
- Customer agreements
- Approval documents

📦 Templates can include:

- Preconfigured documents
- Signer roles
- Signature fields
- Approval flows
- Workflow logic

This means teams do not have to recreate documents every time.

Example:

- A customer completes a Web Form
- That information automatically populates an agreement template
- Workflow Builder routes the agreement for approval
- The document is sent for eSignature
- A signed copy is saved automatically

💡 All of this can happen with minimal manual intervention.

</div>

In this lab exercise, you will create two document templates:

1. Employment Agreement
1. Employee Offer Letter

Download both sample files. These two document templates will be used in the next lab exercise when you create a workflow in Workflow Builder.

Let's get started. ⤵️

1. Go to **Templates**, and in the left menu pane, select **Document Templates**. Select **Create**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_01_SelectDocumentTemplates.png' | relative_url }}" alt="Create a new document template" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create a document template</figcaption></figure>

1. You can select the file to upload. Select **Upload**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_02_SelectUpload.png' | relative_url }}" alt="Select Upload" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Upload a file</figcaption></figure>

1. Select the **Sample Employment Agreement** file.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_03_SelectSampleEmploymentAgreement.png' | relative_url }}" alt="Select the Sample Employment Agreement file" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the sample employment agreement</figcaption></figure>

1. The **Name** field is automatically populated with the file name. In the **Agreement Type** field, select the **chevron icon**, scroll down to the **Human Resources** list, and select **Offer Letter**.

    <div class="info-box note" markdown="1">

    **Tip**: Type **Offer Letter** to find it quickly.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_04_AgreementType.png' | relative_url }}" alt="Select Offer Letter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the agreement type</figcaption></figure>

1. Next, define the roles for the document template. In the **Fields** left pane, select the **chevron icon** next to **Sender 1**, then select **Edit recipients** to update the signer roles.

    <div class="info-box note" markdown="1">

    **What is a role in a template? 🤔**

    A role is a placeholder in a template that represents the person who will take action on the document, such as signing or approving. Roles define who participates and what actions they take, even before you know the actual recipient.

    🐦 **What roles are used for**

    - Defining who participates in an agreement
    - Reusing templates across multiple envelopes
    - Preparing documents and fields before final recipients are known

    When the template is used, an actual person (name and email) is assigned to each predefined role.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_05_EditRecipients.png' | relative_url }}" alt="Edit recipients" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Edit recipients</figcaption></figure>

1. Change the **Signer 1** role name to:

    ```text
    Hiring Manager
    ```

    Add a new recipient and set the role name to:

    ```text
    Employee
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_06_EditAndAddRecipients.png' | relative_url }}" alt="Edit and add recipients" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Set recipient roles</figcaption></figure>

1. Next, replace the placeholders in the document with fields. Start by switching to the **Sender** role.

    <div class="info-box note" markdown="1">

    **What is a field in a template? 🤔**

    Fields are interactive elements added to a document so recipients can take action, such as signing or entering information.

    🐦 **What fields are used for**

    - Collecting recipient input, such as a signature or typed information
    - Assigning actions to specific recipients or roles
    - Pre-filling information in the document when the template is set up

    In summary: fields define where and how recipients interact with the document during the signing process.

    The two field types used in this lab exercise are:

    - Standard Fields: built-in field sets you can add to a document
    - Custom Fields: fields you create to capture specific data not covered by the standard options

    </div>
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_07_SelectSender.png' | relative_url }}" alt="Select the Sender role" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add fields as the Sender role</figcaption></figure>

1. Highlight the first placeholder, `{EffectiveDate}`, and select the standard **Effective Date** field in the left menu.

    <div class="info-box note" markdown="1">

    **Warning**: The blue text in the sample document is used only to make it easier to identify placeholders where fields should be added. It is for learning purposes only; real **production** templates do not contain colored placeholder text.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_08_EffectiveDate.png' | relative_url }}" alt="Effective Date field" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add the Effective Date field</figcaption></figure>

1. When selected, the **Effective Date** field is added to the template.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_09_EffectiveDateAdded.png' | relative_url }}" alt="Effective Date added" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Effective Date field added</figcaption></figure>

1. Next, add a custom field. Highlight the `{EmployeeFullName}` placeholder, select the **+ icon** in the **Fields** panel, then select **Field**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_10_AddedEmployeeFullNameCustomField.png' | relative_url }}" alt="Add the Employee Full Name custom field" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a custom field</figcaption></figure>

1. In the field properties flyout, enter the following for **Field Name**:

    ```text
    Employee Full Name
    ```

    When you enter a value in **Field Name**, the template designer searches for existing fields with the same name. If no results are found, an option appears to create a new custom field using the value you entered.

    Select the **plus icon** to create a new custom field for Employee Full Name.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_11_CreateEmployeeFullNameCustomField.png' | relative_url }}" alt="Create a new Employee Full Name custom field" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create a custom field</figcaption></figure>

1. Configure the remaining properties. Enter the following for **Field Description**:

    ```text
    The full name of the employee
    ```

    Turn on the **Required Field** option.

    By default, **Field type** is **Text**. Keep it as **Text**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_12_ConfigureEmployeeFullNameCustomField.png' | relative_url }}" alt="Configure the Employee Full Name field" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Configure the custom field</figcaption></figure>

1. **Save** the **Employee Full Name** custom field.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_13_SaveEmployeeFullNameCustomField.png' | relative_url }}" alt="Save Employee Full Name" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Save the custom field</figcaption></figure>

1. Repeat the same steps to add the remaining custom fields. Use them for the Sender role placeholders.

    | Placeholder              | Field name             | Field description                      | Required field | Field Type         |
    |--------------------------|------------------------|----------------------------------------|----------------|--------------------|
    | **{EmployeePosition}**   | `Employee Position`    | `Position the employee is fulfilling`  | Yes            | Text               |
    | **{EmployeeStartDate}**  | `Start Date`           | `The start date of the employee`       | Yes            | Date               |
    | **{SalaryAmount}**       | `Salary`               | `The salary of the employee`           | Yes            | Text               |

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_14_CreateRemainingCustomFields.png' | relative_url }}" alt="Create the remaining custom fields" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Remaining custom fields</figcaption></figure>

1. Next, add the **Employee Full Name** field to the template's _**16. Signatures**_ section. Highlight the `{EmployeeFullName}` placeholder and select the field in the **Fields** left pane.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_15_AddEmployeeFullNameField.png' | relative_url }}" alt="Add the Employee Full Name field" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add the Employee Full Name field</figcaption></figure>

1. Now switch to the **Hiring Manager** role to define the fields this recipient needs to complete. In the **Fields** left pane, select the **chevron icon** next to **Sender** and select **Hiring Manager**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_16_SwitchToHiringManagerRole.png' | relative_url }}" alt="Select the Hiring Manager role" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Switch to the Hiring Manager role</figcaption></figure>

1. Highlight the `{ManagerSignature}` placeholder and select **Signature** in the **Fields** left pane.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_17_AddSignatureField.png' | relative_url }}" alt="Select the signature field for the Manager Signature placeholder" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a signature field</figcaption></figure>

1. The **Signature** field is added.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_18_SignatureFieldAdded.png' | relative_url }}" alt="Signature field added" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Signature field added</figcaption></figure>

1. Repeat the same steps to add the remaining fields for the **Hiring Manager** and **Employee** roles.

    <div class="info-box note" markdown="1">

    **Tip**: 🖱️ Don't forget to switch roles

    Use the chevron icon in the Fields left pane to switch to the Employee role.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_19_SwitchToEmployeeRole.png' | relative_url }}" alt="Switch to the Employee role" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Switch to the Employee role</figcaption></figure>

    </div>

    | Role            | Placeholder                          | Field       |
    |-----------------|--------------------------------------|-------------|
    | Hiring Manager  | **{ManagerFullNameSignature}**       | Name        |
    | Hiring Manager  | **{ManagerSignedDateSignature}**     | Date Signed |
    | Employee        | **{EmployeeSignature}**              | Signature   |
    | Employee        | **{EmployeeFullNameSignature}**      | Name        |
    | Employee        | **{EmployeeSignedDateSignature}**    | Date Signed |

1. After the fields for the **Hiring Manager** and **Employee** roles are added, the template looks like this.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_20_FieldsAddedForRoles.png' | relative_url }}" alt="Fields added for all roles" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>All role fields added</figcaption></figure>

1. In the upper-right corner, select **Save as Draft**. You are redirected to the document templates page, and a confirmation message appears in the lower-left corner. Then select the **ellipsis icon (...)** and select **Publish**.

    <div class="info-box note" markdown="1">

    **Tip**: If you do not see the **Save As Draft** button and instead see **Save and Publish**, select **Save and Publish**.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_21_PublishDocumentTemplate.png' | relative_url }}" alt="Publish the document template" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Publish the document template</figcaption></figure>

1. A confirmation message appears in the lower-left corner indicating that the draft template was published.

    Now create the second document template using the **Sample Offer Letter** file.

    Select **+ Create new**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_22_CreateNewDocumentTemplate.png' | relative_url }}" alt="Create a new document template" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create a new document template</figcaption></figure>

1. Repeat the previous steps to upload the **Sample Offer Letter** file and select **Offer Letter** as the **Agreement Type**.

    Select **Continue**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_23_OfferLetterAgreementType.png' | relative_url }}" alt="Upload the Sample Offer Letter file" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Offer Letter agreement type</figcaption></figure>

1. Repeat the previous steps to create two roles in the document template: Hiring Manager and Employee.

    In the **Fields** left pane, select the **chevron icon** next to **Sender 1**, then select **Edit recipients**.

    Change the **Signer 1** role name to:

    ```text
    Hiring Manager
    ```

    Add a new recipient and set the role name to:

    ```text
    Employee
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_24_Roles.png' | relative_url }}" alt="Add roles" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add roles</figcaption></figure>

1. Next, replace the placeholders in the document with fields. Start by switching to the **Sender** role. Highlight the `{EmployeeFullName}` placeholder and select the Employee Full Name field in the left menu. The field now appears in place of the placeholder.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_25_ConfigureFields.png' | relative_url }}" alt="Configure Sender fields" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Configure Sender fields</figcaption></figure>

1. Repeat the same steps for the remaining placeholders for the **Sender** role. Select existing fields from the left menu or create new fields.

    | Placeholder                    | Field name                    | Create New Field | Field description                          | Required field | Field Type |
    |--------------------------------|-------------------------------|------------------|--------------------------------------------|----------------|------------|
    | **{EmployeeAddressLine1}**     | `Employee Address Line 1`     | Yes              | `Apt or House No. and street name`         | Yes            | Text       |
    | **{EmployeeAddressLine2}**     | `Employee Address Line 2`     | Yes              | `Suburb`                                   | Yes            | Text       |
    | **{EmployeeAddressCity}**      | `Employee Address City`       | Yes              | `City`                                     | Yes            | Text       |
    | **{Employee AddressPostCode}** | `Employee Address Post Code`  | Yes              | `Post code`                                | Yes            | Text       |
    | **{EmployeePosition}**         | `Employee Position`           | No               |                                            |                |            |
    | **{EmployeeStartDate}**        | `Start Date`                  | No               |                                            |                |            |
    | **{DueDate}**                  | `Signed Due Date`             | Yes              | `Due date of signed agreement by employee` | Yes            | Date       |

    <div class="info-box note" markdown="1">

    **Tip**: If you accidentally create a new field with the wrong field type (for example, if you create **Signed Due Date** as `Text`), you cannot change the field type. However, you can rename the field to `[Don't use] Signed Due Date`.

    </div>

1. Next, use the same steps as before to add the fields for the **Hiring Manager** and **Employee** roles.

    <div class="info-box note" markdown="1">

    **Tip**: 🖱️ Don't forget to switch roles

    Use the chevron icon in the Fields left pane to switch to the Employee role.

    </div>

    | Role            | Placeholder                          | Field       |
    |-----------------|--------------------------------------|-------------|
    | Hiring Manager  | **{ManagerSignature}**               | Signature   |
    | Hiring Manager  | **{ManagerFullNameSignature}**       | Name        |
    | Employee        | **{EmployeeSignature}**              | Signature   |
    | Employee        | **{EmployeeFullNameSignature}**      | Name        |
    | Employee        | **{EmployeeSignedDateSignature}**    | Date Signed |

    Your second document template configuration is now complete 👏🏻

    Select **Preview** in the upper-right corner to view the document template preview mode.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_28_FieldsConfigured.png' | relative_url }}" alt="All role fields configured" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Role fields configured</figcaption></figure>

1. When you enter values in the fields, they appear in the template viewer.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_29_PreviewMode.png' | relative_url }}" alt="Document Template preview mode" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Document template preview</figcaption></figure>

1. Select the **X icon** in the upper-left corner to exit **Preview** mode, then select **Save As Draft**.

    <div class="info-box note" markdown="1">

    **Tip**: If you do not see the **Save As Draft** button and instead see **Save and Publish**, select **Save and Publish** and skip the next two publishing steps.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_30_SaveAsDraft.png' | relative_url }}" alt="Select Save as Draft" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Save as draft</figcaption></figure>

1. A confirmation message appears in the lower-left corner indicating that the template was saved as Draft. Next, select the **ellipsis icon (...)** and select **Publish**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_31_Publish.png' | relative_url }}" alt="Publish the Sample Offer Letter document template" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Publish the Offer Letter</figcaption></figure>

1. The **Sample Offer Letter** document template is now published.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_32_Published.png' | relative_url }}" alt="Sample Offer Letter document published" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Offer Letter published</figcaption></figure>

🏃🏻‍♀️‍➡️ Next, let's create a workflow in Workflow Builder.

## 🧪 1.3 Create a Docusign Workflow Builder workflow

A Docusign Workflow Builder workflow is a tool for automating document processing, signing, and data collection. Once a workflow is configured, Workflow Builder automatically handles complex agreement processes such as notifying participants, collecting signatures, and routing data.

1. In the Docusign developer portal, select **Agreements** from the left menu. Select **Workflows**. Then select **Create Workflow**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_01_CreateWorkflow.png' | relative_url }}" alt="Select Create Workflow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create a workflow</figcaption></figure>

1. Select **+ Blank Workflow**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_02_BlankWorkflow.png' | relative_url }}" alt="Select Blank Workflow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select a blank workflow</figcaption></figure>

1. Select the **ellipsis icon (...)** > **Rename**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_03_RenameWorkflow.png' | relative_url }}" alt="Rename the workflow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Rename the workflow</figcaption></figure>

1. Enter a workflow name and select **Save**. For example:

    ```text
    Docusign MCP Demo
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_04_SaveWorkflowName.png' | relative_url }}" alt="Enter the workflow name" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Save the workflow name</figcaption></figure>

1. Select **Add workflow start**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_05_AddWorkflowStart.png' | relative_url }}" alt="Select Add workflow start" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add workflow start</figcaption></figure>

1. Select **From an API Call** and select **Apply**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_06_WorkflowStartMethod.png' | relative_url }}" alt="Select From an API Call and Apply" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Start the workflow from an API call</figcaption></figure>

1. Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_07_NextConfigurationStep.png' | relative_url }}" alt="Select Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Next</figcaption></figure>

1. The next step is to configure workflow variables. Variables are used to store data and pass it between workflow steps. Select **+ Add variable** and create a variable of type **Text**. Name it:

    ```text
    Employee Full Name
    ```

    Select **Add Variable**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_08_NewTextVariable.png' | relative_url }}" alt="Add a variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a workflow variable</figcaption></figure>

1. Repeat the same steps for the remaining variables of type **Text**:

    ```text
    Employee Email
    ```

    ```text
    Hiring Manager Full Name
    ```

    ```text
    Hiring Manager Email
    ```

    ```text
    Employee Position
    ```

    ```text
    Start Date
    ```

    ```text
    Effective Date
    ```

    ```text
    Salary
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_09_WorkflowStartVariables.png' | relative_url }}" alt="All variables added" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>All workflow variables</figcaption></figure>

1. Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_10_SelectNext.png' | relative_url }}" alt="Select Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Next</figcaption></figure>

1. Select **Automated process** and select **Apply**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_11_SelectAutomatedProcess.png' | relative_url }}" alt="Select Automated process and Apply" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select automated process</figcaption></figure>

1. Select **Add a step**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_12_AddWorkflowStep.png' | relative_url }}" alt="Select Add a step" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a step</figcaption></figure>

1. Select **Set Up Invite**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_13_SetUpInvite.png' | relative_url }}" alt="Select Set Up Invite" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Set up invite</figcaption></figure>

1. Select **Configure**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_14_SelectConfigure.png' | relative_url }}" alt="Select Configure" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Configure</figcaption></figure>

1. Select **Add Participant**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_15_SelectAddParticipant.png' | relative_url }}" alt="Select Add Participant" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a participant</figcaption></figure>

1. Enter the following and select **Add**:

    ```text
    Employee
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_16_EmployeeParticipant.png' | relative_url }}" alt="Enter Employee and select Add" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add the Employee participant</figcaption></figure>

1. The **Employee Name** and **Employee Email** fields appear.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_17_SelectVariables.png' | relative_url }}" alt="Employee participant fields shown" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee participant fields</figcaption></figure>

1. Select the **Employee Full Name** variable.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_18_EmployeeFullNameVariable.png' | relative_url }}" alt="Select the Employee Full Name variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee Full Name variable</figcaption></figure>

1. Select the **Employee Email** variable.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_19_EmployeeEmailVariable.png' | relative_url }}" alt="Select the Employee Email variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee Email variable</figcaption></figure>

1. Select **Apply**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_20_Apply.png' | relative_url }}" alt="Select Apply" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Apply</figcaption></figure>

1. Select **Add a step**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_21_AddStep.png' | relative_url }}" alt="Select Add a step" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a step</figcaption></figure>

1. Select **Collect Data with Web Forms**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_22_SelectCollectDataWithWebForms.png' | relative_url }}" alt="Select Collect Data with Web Forms" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Collect data with Web Forms</figcaption></figure>

1. Select **Configure**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_23_SelectConfigure.png' | relative_url }}" alt="Select Configure" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Configure Web Forms</figcaption></figure>

1. Select the **Request for your contact information** Web Form you created earlier.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_24_ChooseForm.png' | relative_url }}" alt="Select the Web Form" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the Web Form</figcaption></figure>

1. Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_25_NextConfigurationStep.png' | relative_url }}" alt="Select Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Next</figcaption></figure>

1. Select the **Employee** participant.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_26_SelectEmployeeParticipant.png' | relative_url }}" alt="Select the Employee participant" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the Employee participant</figcaption></figure>

1. Select **Continue to map data fields**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_27_ContinueToMapDataFields.png' | relative_url }}" alt="Continue to map data fields" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Map data fields</figcaption></figure>

1. Select the **Employee Full Name** variable.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_28_EmployeeFullNameVariable.png' | relative_url }}" alt="Select the Employee Full Name variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Map Employee Full Name</figcaption></figure>

1. Select **Apply**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_29_Apply.png' | relative_url }}" alt="Select Apply" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Apply</figcaption></figure>

1. Select **Add a step**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_30_AddAStep.png' | relative_url }}" alt="Select Add a step" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a step</figcaption></figure>

1. Select **Prepare a Document Template**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_31_SelectPrepareDocumentTemplate.png' | relative_url }}" alt="Select Prepare a Document Template" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Prepare a document template</figcaption></figure>

1. Select **Configure**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_32_SelectConfigure.png' | relative_url }}" alt="Select Configure" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Configure</figcaption></figure>

1. Update **Step Name**:

    ```text
    Employment Agreement
    ```

    Select the **Sample Employment Agreement** document template.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_33_SelectSampleEmploymentAgreement.png' | relative_url }}" alt="Select the Employment Agreement template" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the employment agreement template</figcaption></figure>

1. Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_34_SelectNext.png' | relative_url }}" alt="Select Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Next</figcaption></figure>

1. Next, configure the field values. Select **Next** to accept the fields that were populated automatically.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_35_SelectNext.png' | relative_url }}" alt="Select Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Next</figcaption></figure>

1. Select the **Effective Date** variable.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_36_SelectEffectiveDate.png' | relative_url }}" alt="Select the Effective Date variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the Effective Date variable</figcaption></figure>

1. Repeat the same steps to map the remaining fields to variables. Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_37_AgreementFieldsConfigured.png' | relative_url }}" alt="Map the remaining fields and select Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Map the remaining fields</figcaption></figure>

1. Use variables in the **Title** field. Select the **Employee Full Name** variable to add it.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_38_TitleBuilder.png' | relative_url }}" alt="Use variables in the Title field" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Configure the Title variable</figcaption></figure>

1. Select the **+ icon** next to the **Effective Date** variable.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_39_SelectEffectiveDate.png' | relative_url }}" alt="Add the Effective Date variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add the date variable</figcaption></figure>

1. Add a separator and update the format. Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_40_TitleBuilderFieldConfigured.png' | relative_url }}" alt="Add a separator and update the format" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Set the separator and format</figcaption></figure>

1. Select **Apply**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_41_SelectApply.png' | relative_url }}" alt="Select Apply" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Apply</figcaption></figure>

1. Select **Add a step**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_42_AddAStep.png' | relative_url }}" alt="Select Add a step" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a step</figcaption></figure>

1. Select **Prepare a Document Template**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_43_SelectPrepareDocumentTemplate.png' | relative_url }}" alt="Select Prepare a Document Template" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Prepare a document template</figcaption></figure>

1. Update **Step Name**:

    ```text
    Offer Letter
    ```

    Select the **Sample Offer Letter** document template. Repeat the same steps to configure the fields for the Offer Letter template and select **Apply**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_44_ConfigureAgreementFields.png' | relative_url }}" alt="Configure the Offer Letter template" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Configure the Offer Letter</figcaption></figure>

1. Confirm the named document configuration.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_45_NameDocumentConfigurationStep.png' | relative_url }}" alt="Confirm the document configuration" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Document configuration</figcaption></figure>

1. Select **Add a step**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_46_AddAStep.png' | relative_url }}" alt="Select Add a step" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a step</figcaption></figure>

1. Select **Send Documents for Signature**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_47_SendDocumentsForSignature.png' | relative_url }}" alt="Select Send Documents for Signature" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Send documents for signature</figcaption></figure>

1. Select **Configure**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_48_SelectConfigure.png' | relative_url }}" alt="Select Configure" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Configure</figcaption></figure>

1. Select the **Employment Agreement** document.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_49_SelectGenerateDocumentEmploymentAgreement.png' | relative_url }}" alt="Select the Employment Agreement document" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the employment agreement</figcaption></figure>

1. Select **Add Document**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_50_SelectAddDocument.png' | relative_url }}" alt="Select Add Document" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add document</figcaption></figure>

1. Select the **Offer Letter** document.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_51_SelectGenerateDocumentOfferLetter.png' | relative_url }}" alt="Select the Offer Letter document" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the Offer Letter</figcaption></figure>

1. Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_52_SelectNext.png' | relative_url }}" alt="Select Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Next</figcaption></figure>

1. Select **Next**. (It will be sent automatically.)

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_53_SendEnvelopeAutomatically.png' | relative_url }}" alt="Select Next (send automatically)" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Next</figcaption></figure>

1. Enable **Set a signing order**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_54_SetASigningOrder.png' | relative_url }}" alt="Enable Set a signing order" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Set a signing order</figcaption></figure>

1. Set **Hiring Manager** to **2**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_55_SetHiringManagerAs2.png' | relative_url }}" alt="Set the Hiring Manager signing order to 2" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Hiring Manager signing order</figcaption></figure>

1. Set **Employee** to **1**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_56_SetEmployeeAs1.png' | relative_url }}" alt="Set the Employee signing order to 1" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee signing order</figcaption></figure>

1. Select the **Employee** variable.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_57_SelectEmployee.png' | relative_url }}" alt="Select the Employee variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the Employee variable</figcaption></figure>

1. The Employee participant fields are mapped.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_58_MappedParticipantFields.png' | relative_url }}" alt="Employee participant fields mapped" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee field mapping</figcaption></figure>

1. Select **Add Participant**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_59_AddParticipant.png' | relative_url }}" alt="Select Add Participant" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a participant</figcaption></figure>

1. Enter the following and select **Add**:

    ```text
    Hiring Manager
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_60_HiringManager.png' | relative_url }}" alt="Enter Hiring Manager and select Add" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add the Hiring Manager</figcaption></figure>

1. Select the **Hiring Manager Full Name** variable.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_61_MapHiringManagerName.png' | relative_url }}" alt="Select the Hiring Manager Full Name variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Hiring Manager name variable</figcaption></figure>

1. Select the **Hiring Manager Email** variable and select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_62_MapHiringManagerEmail.png' | relative_url }}" alt="Select the Hiring Manager Email variable and Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Hiring Manager email variable</figcaption></figure>

1. For the signing session, keep the default selection: **Use a direct signing session**. Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_63_UseADirectSigningSession.png' | relative_url }}" alt="Select Use a direct signing session" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Direct signing session</figcaption></figure>

1. Finally, configure the message the Hiring Manager will see.

    **Message title**:

    ```text
    Complete with Docusign: Employment Agreement and Offer Letter
    ```

    **Message**:

    ```text
    Please review and sign the Employment Agreement and Offer Letter.
    ```

    Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_106_AddMessage.png' | relative_url }}" alt="Add a message and select Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Configure the message</figcaption></figure>

1. Select **Apply** to complete the workflow step configuration.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_107_SelectApply.png' | relative_url }}" alt="Select Apply" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Apply</figcaption></figure>

1. Select **Add a step**. Next, add a **Confirmation Screen** that appears to the Employee participant after signing is complete.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_65_AddAStep.png' | relative_url }}" alt="Add a step to add a Confirmation Screen" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a step</figcaption></figure>

1. Select **Show a Confirmation Screen**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_66_SelectShowAConfirmationScreen.png' | relative_url }}" alt="Select Show a Confirmation Screen" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Show a confirmation screen</figcaption></figure>

1. Select **Configure**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_67_SelectConfigure.png' | relative_url }}" alt="Select Configure" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Configure</figcaption></figure>

1. Select **Employee**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_68_SelectEmployee.png' | relative_url }}" alt="Select Employee" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Employee</figcaption></figure>

1. Select **Apply**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_69_SelectApply.png' | relative_url }}" alt="Select Apply" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Apply</figcaption></figure>

1. Select **App Center**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_70_SelectAppCenter.png' | relative_url }}" alt="Select App Center" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select App Center</figcaption></figure>

1. Select **SharePoint**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_71_SelectSharePoint.png' | relative_url }}" alt="Select SharePoint" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select SharePoint</figcaption></figure>

1. Select **Install App**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_72_SelectInstallApp.png' | relative_url }}" alt="Select Install App" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Install the app</figcaption></figure>

1. Select **Install and Authorize**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_73_SelectInstallAndAuthorize.png' | relative_url }}" alt="Select Install and Authorize" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Install and authorize</figcaption></figure>

1. Select **Connect Account**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_74_ConnectAccount.png' | relative_url }}" alt="Select Connect Account" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Connect account</figcaption></figure>

1. Select **Private**, then select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_75_SelectPrivateAndNext.png' | relative_url }}" alt="Select Private and Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Private connection</figcaption></figure>

1. Enter a name and select **Log In**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_76_NameTheSharePointConnection.png' | relative_url }}" alt="Enter a name and select Log In" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Log in</figcaption></figure>

1. Enter credentials and select **Accept**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_77_Consent.png' | relative_url }}" alt="Enter credentials and select Accept" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Enter credentials</figcaption></figure>

1. Select the **X icon** to exit App Center.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_78_SelectUseThisApp.png' | relative_url }}" alt="Exit App Center" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Exit App Center</figcaption></figure>

1. Select **Add a step**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_79_SelectAddAStep.png' | relative_url }}" alt="Select Add a step" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a step</figcaption></figure>

1. Select **Store files in SharePoint**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_80_SelectStoreFilesInSharePoint.png' | relative_url }}" alt="Select Store files in SharePoint" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Store files in SharePoint</figcaption></figure>

1. Select **Configure**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_81_SelectConfigure.png' | relative_url }}" alt="Select Configure" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Configure</figcaption></figure>

1. Select **Combined Envelope File**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_82_SelectCombinedEnvelopFile.png' | relative_url }}" alt="Select Combined Envelope File" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the combined envelope file</figcaption></figure>

1. Select the connection.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_83_SelectConnection.png' | relative_url }}" alt="Select the connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the connection</figcaption></figure>

1. Select the SharePoint site.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_84_SelectHRTeam.png' | relative_url }}" alt="Select the SharePoint site" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the SharePoint site</figcaption></figure>

1. Select the **Documents** drive.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_85_SelectDocuments.png' | relative_url }}" alt="Select the Documents drive" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the drive</figcaption></figure>

1. Select the folder.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_86_SelectSignedEmployees.png' | relative_url }}" alt="Select the folder" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the folder</figcaption></figure>

1. Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_87_SelectNext.png' | relative_url }}" alt="Select Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Next</figcaption></figure>

1. In the file name field, select the **Envelope ID** variable.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_88_SelectEnvelopeIDVariable.png' | relative_url }}" alt="Select the Envelope ID variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Envelope ID variable</figcaption></figure>

1. Select **Add Text**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_89_SelectText.png' | relative_url }}" alt="Select Add Text" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add text</figcaption></figure>

1. Enter a separator and select **Add**:

    ```text
    _
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_90_AddUnderscoreCharacter.png' | relative_url }}" alt="Enter the separator and select Add" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a separator</figcaption></figure>

1. Select **Add Variable** and select the **Full Name** variable.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_91_SelectFullName.png' | relative_url }}" alt="Add the Full Name variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the Full Name variable</figcaption></figure>

1. Select **Apply**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_92_SelectApply.png' | relative_url }}" alt="Select Apply" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Apply</figcaption></figure>

1. Select **Save Draft**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_93_SelectSaveDraft.png' | relative_url }}" alt="Select Save Draft" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Save draft</figcaption></figure>

1. Select **Review & Publish**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_94_SelectReviewAndPublish.png' | relative_url }}" alt="Select Review & Publish" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Review and publish</figcaption></figure>

1. Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_95_SelectNext.png' | relative_url }}" alt="Select Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Next</figcaption></figure>

1. Select the **+ icon** next to the variable.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_96_InsertVariable.png' | relative_url }}" alt="Select the + icon to add a variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a variable</figcaption></figure>

1. Select the **Instance ID** variable.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_97_SelectInstanceIDVariable.png' | relative_url }}" alt="Select the Instance ID variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Instance ID variable</figcaption></figure>

1. Select the **Start Date and Time** variable.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_98_SelectStartDateAndTimeVariable.png' | relative_url }}" alt="Select the Start Date and Time variable" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Start date variable</figcaption></figure>

1. Enter a separator and select **Done**:

    ```text
    _
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_99_InsertUnderscoreCharacter.png' | relative_url }}" alt="Enter the separator and select Done" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Set the separator</figcaption></figure>

1. Select **Publish**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_100_SelectPublish.png' | relative_url }}" alt="Select Publish" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Publish</figcaption></figure>

1. Select **Authorize My Account**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_101_SelectAuthorizeMyAccount.png' | relative_url }}" alt="Select Authorize My Account" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Authorize account</figcaption></figure>

1. Select **Allow Access**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_102_SelectAllowAccess.png' | relative_url }}" alt="Select Allow Access" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Allow access</figcaption></figure>

1. Select **Publish**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_103_SelectPublish.png' | relative_url }}" alt="Select Publish" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Publish</figcaption></figure>

1. Select **Go to Workflows**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_104_SelectGoToWorkflow.png' | relative_url }}" alt="Select Go to Workflows" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Go to workflows</figcaption></figure>

1. The workflow is shown with a **Published** status. You successfully built the workflow 👏🏻

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_105_WorkflowPublished.png' | relative_url }}" alt="Published workflow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Workflow published</figcaption></figure>

## 🧪 1.4 Test the workflow

Before building the agent in Microsoft Copilot Studio, it is a good practice to test the workflow by running it. You can start a new instance and run the workflow manually.

1. Open the workflow and select **Start Instance** in the upper-right corner.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_01_StartInstance.png' | relative_url }}" alt="Select Start Instance" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Start a workflow instance</figcaption></figure>

1. A modal appears where you enter values for the workflow start step variables. Fill the fields with sample data.

    <div class="info-box note" markdown="1">

    **Note**: Use two different email addresses that you can access for Employee and Hiring Manager.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_02_EnterValuesForWorkflowStartVariables.png' | relative_url }}" alt="Enter workflow start variable values" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Workflow start variables</figcaption></figure>

1. After entering the variable values, select **Start**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_03_EnterValuesForWorkflowStartVariables.png' | relative_url }}" alt="Enter workflow start variable values and Start" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Start</figcaption></figure>

1. A confirmation message appears indicating that the workflow instance has started.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_04_ConfirmationOfInstance.png' | relative_url }}" alt="Workflow instance start confirmation" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Instance confirmation</figcaption></figure>

1. Go to the inbox for the Employee participant email address and open the Docusign email. The subject is `***Test Email*** Review and complete workflow`. Select **Review**.

    <div class="info-box note" markdown="1">

    **Warning**: If the email is not visible in the main inbox, check the spam folder.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_05_SelectReview.png' | relative_url }}" alt="Select Review" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Review</figcaption></figure>

1. The first page of the Web Form loads. Select **Start**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_06_SelectStart.png' | relative_url }}" alt="Select Start" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Start</figcaption></figure>

1. The **Your Name** page of the Web Form appears. Enter the Employee name you used in the workflow start sample data.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_07_ProvideNameInformation.png' | relative_url }}" alt="Enter name information" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Enter name information</figcaption></figure>

1. Enter sample address information on the **Address** page of the Web Form.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_08_ProvideAddressInformation.png' | relative_url }}" alt="Enter address information" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Enter address information</figcaption></figure>

1. The final step in the Web Form is to review the information you entered. Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_09_SelectNextToCompleteWebForm.png' | relative_url }}" alt="Select Next to complete the Web Form" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Next</figcaption></figure>

1. After the Web Form is submitted, the next workflow steps run automatically: using the form data to generate the employment agreement and offer letter, then requesting the Employee participant's signature.

    Select the **terms agreement checkbox** and select **Continue**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_10_AgreeAndContinue.png' | relative_url }}" alt="Agree and continue" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Agree and continue</figcaption></figure>

1. The employment agreement appears. The blue text shows values entered from the **workflow start variables** and the **Web Form**. Review the agreement, then select **Start** to sign it.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_11_ReviewDocumentAgreements.png' | relative_url }}" alt="Review document agreements" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Review the agreements</figcaption></figure>

1. Select the **Sign** icon to sign the employment agreement.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_12_SignEmploymentAgreement.png' | relative_url }}" alt="Sign the employment agreement" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Sign the agreement</figcaption></figure>

1. A modal appears to confirm signature details and style. Keep the default style and select **Adopt and Sign**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_13_AdoptAndSign.png' | relative_url }}" alt="Select Adopt and Sign" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Adopt the signature</figcaption></figure>

1. Next, review the Offer Letter. Notice that the address information now appears. Select the **Sign** tab icon, then select the **Sign** icon on the Offer Letter.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_14_SignOfferLetter.png' | relative_url }}" alt="Sign the Offer Letter" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Sign the Offer Letter</figcaption></figure>

1. Select **Adopt and Sign** for the Offer Letter, then select **Finish**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_15_SelectFinish.png' | relative_url }}" alt="Select Finish" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Finish</figcaption></figure>

1. The Confirmation Screen you configured earlier appears.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_16_ConfirmationScreen.png' | relative_url }}" alt="Confirmation screen shown" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Confirmation screen</figcaption></figure>

1. Next, go to the inbox for the Hiring Manager participant email address and open the Docusign email. The subject is `Complete with Docusign: Employment Agreement and Offer Letter`. Select **Review Documents**.

    <div class="info-box note" markdown="1">

    **Warning**: If the email is not visible in the main inbox, check the spam folder.

    </div>

1. Sign the employment agreement and Offer Letter, then select **Finish**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_18_SelectFinish.png' | relative_url }}" alt="Select Finish" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Finish</figcaption></figure>

1. If you are using the same email address as your Docusign developer account, the following modal may appear. Select **No Thanks**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_19_OptionToLogIntoDocusign.png' | relative_url }}" alt="Select No Thanks" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select No Thanks</figcaption></figure>

1. Confirmation appears that the documents were signed successfully.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_20_Configrmation.png' | relative_url }}" alt="Documents signed successfully confirmation" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Signing confirmation</figcaption></figure>

1. Go to the inbox for your Docusign developer account email address to find the signed agreements email.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_21_DocusignDeveloperUserAccount.png' | relative_url }}" alt="Signed agreements received" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Agreements received</figcaption></figure>

1. The last step of the workflow was to upload the signed agreements to SharePoint. Go to the SharePoint folder, and the PDF file of the signed agreements appears in the list.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_22_SignedDocumentAgreementsUploadedToSharePoint.png' | relative_url }}" alt="Signed agreements uploaded to SharePoint" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>SharePoint upload</figcaption></figure>

1. Open the PDF file to review the document. You successfully completed the end-to-end manual workflow test 🎉 Next, build the agent in Microsoft Copilot Studio.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_23_ViewSignedDocumentAgreements.png' | relative_url }}" alt="View the signed agreements" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>View the agreements</figcaption></figure>

## 🧪 1.5 Build a custom agent in Microsoft Copilot Studio, connect Docusign MCP Demo, and trigger the workflow

### Prerequisites

- **New solution**: As a best practice, create a new solution before creating the agent.
- **Use the new experience**: This lab intentionally uses the new Copilot Studio experience. The Docusign MCP Demo tool is available there. If you switched to the classic experience for another Agent Academy lesson, turn **New Experience** back on before continuing.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_00_ToggleNewExperience.png' | relative_url }}" alt="New Experience toggle" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>New Experience toggle</figcaption></figure>

Let's get started!

1. Go to [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com) and sign in with your Microsoft 365 work or school account.

    <div class="info-box note" markdown="1">

    **Warning**: You must be in a tenant where Copilot Studio is enabled.

    </div>

1. Confirm that you are in the developer environment and select **Agent**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_01_SelectAgent.png' | relative_url }}" alt="Create a blank agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Agent</figcaption></figure>

1. Enter the following as the agent name:

    ```text
    Offer Management Agent
    ```

    Next, enter the agent instructions:

    ```text
    You are the Offer Management Agent, an HR onboarding agent that automates offer workflows.

    Your goal is to streamline the process of sending, signing, and finalizing Employment Agreements and Offer Letters using Docusign Workflow Builder.

    ## Docusign Workflow Builder

    Assist users by identifying the correct workflow, collecting required inputs, and triggering document delivery to recipients.

    Be concise, professional, and proactive. Ask for missing information before proceeding, and confirm actions before triggering workflows.

    If the request cannot be fulfilled using available workflows or tools, clearly explain the limitation and suggest next steps.

    If the user needs to provide missing information, provide the field name from the variables of the workflow with a corresponding field description.

    Confirm with the user that all information is correct before triggering the workflow. If the user confirms the information is correct, trigger the workflow. If the user confirms the information is incorrect, do not trigger the workflow.
    ```

    <div class="info-box note" markdown="1">

    **Tip**: These instructions define the Offer Management Agent's role, tone, and decision flow.

    </div>

    Next, add the **Docusign MCP Demo** tool to the agent. Under **Tools** in the right panel, select the **plus icon**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_02_AgentNameInstructionsAddTool.png' | relative_url }}" alt="Enter the agent name and instructions, then add a tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Agent settings</figcaption></figure>

1. Select the **Model Context Protocol (MCP)** category to filter the tool list to MCP tools. Scroll and select **Docusign MCP Demo**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_03_SelectDocusignMCPDemo.png' | relative_url }}" alt="Select Docusign MCP Demo" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Docusign MCP Demo</figcaption></figure>

    <div class="info-box note" markdown="1">

    **Warning**: Searching for `Docusign MCP Demo` or `docusign` in the new UI may return **Docusign MCP**, the production tool.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_03_Warning_DoNotSearch.png' | relative_url }}" alt="Do not search - select Docusign MCP Demo instead of Docusign MCP" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Do-not-search warning</figcaption></figure>

    Do not select Docusign MCP. Clear the search field and scroll to select **Docusign MCP Demo**.

    </div>

1. Select **Docusign MCP Server**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_04_SelectDocusignMCPServer.png' | relative_url }}" alt="Select Docusign MCP Server" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select MCP server</figcaption></figure>

1. You need to add a new connection for your Docusign developer account. Select the **chevron** icon and select **Create new connection**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_05_SelectCreateNewConnection.png' | relative_url }}" alt="Select Create new connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create a new connection</figcaption></figure>

1. Select **Create** to enter your Docusign developer account credentials.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_06_SelectCreate.png' | relative_url }}" alt="Select Create" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Create</figcaption></figure>

1. Enter the username and password for your Docusign developer account.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_07_LogIn.png' | relative_url }}" alt="Enter credentials" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Log in</figcaption></figure>

1. The connection is created and a green check icon appears. Select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_08_ConnectionCreated.png' | relative_url }}" alt="Connection created" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Connection created</figcaption></figure>

1. A list of supported actions for the Docusign MCP Demo tool appears. Scroll to review the workflow actions. Select **Confirm**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_09_ReviewDocusignMCPDemoCapabilities.png' | relative_url }}" alt="Review Docusign MCP Demo capabilities" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Review MCP capabilities</figcaption></figure>

1. The tool is added to the agent.

    Next, change this agent's solution in **Settings**. In the upper-right corner, select the **ellipsis icon**, then select **Settings**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_10_SelectSettings.png' | relative_url }}" alt="Select Settings" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Settings</figcaption></figure>

1. In the dropdown field, select the new solution you created earlier to change the agent's solution.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_11_Solution.png' | relative_url }}" alt="Select the target solution" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select solution</figcaption></figure>

1. **Save** and test the agent. Select the **Preview** tab, then enter and submit the following:

    ```text
    Send an employment agreement and offer letter to [employee name], [email address]
    ```

    - Replace `[employee name]` with a name.
    - Replace `[email address]` with the Employee participant email address.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_12_TestOfferManagementAgent.png' | relative_url }}" alt="Test the Offer Management Agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Test the agent</figcaption></figure>

1. The orchestrator uses the **Docusign MCP Demo** tool and the instructions you added to find the workflow requirements needed to **send the employment agreement and Offer Letter**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_13_OrchestratorInProgress.png' | relative_url }}" alt="Orchestrator in progress" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Orchestrator working</figcaption></figure>

1. Because you provided only the Employee name and email address, the agent response asks for the remaining information required by the workflow.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_14_WorkflowTriggerRequirementsIdentified.png' | relative_url }}" alt="Workflow trigger requirements identified" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Requirements identified</figcaption></figure>

1. Enter and submit the following text. Replace the bracketed values with real values:

    ```text
    employee position is [position], effective date and start date is [MMMM d], salary is [salary dollar amount], reporting to [manager full name] [manager email address], and due signed date is [MMMM d]
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_15_VariablesProvided.png' | relative_url }}" alt="Variable values provided" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Variables provided</figcaption></figure>

1. The agent provides a summary of the variables based on the information you provided and asks you to confirm whether the information is correct. This is based on the instructions you entered when creating the agent.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_16_ReviewMappedInformation.png' | relative_url }}" alt="Review mapped information" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Review information</figcaption></figure>

1. Enter and submit the following text:

    ```text
    Yes, information is correct.
    ```

    The orchestrator triggers the workflow next.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_17_ConfirmInformationIsCorrect.png' | relative_url }}" alt="Confirm the information is correct" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Enter confirmation</figcaption></figure>

1. When the workflow is triggered, a confirmation and summary appear.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_18_WorkflowSuccessfullyTriggered.png' | relative_url }}" alt="Workflow successfully triggered" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Workflow triggered</figcaption></figure>

1. Follow the same steps as before to complete the workflow:

    - Go to the Employee participant email inbox, open the Docusign email, complete the Web Form, and sign the agreements.
    - Go to the Hiring Manager participant email inbox and sign the agreements.
    - Finally, the signed agreements are uploaded to SharePoint.

    <div class="info-box note" markdown="1">

    **Warning**: If the email is not visible in the main inbox, check the spam folder.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_19_SignedAgreementsUploadedToSharePoint.png' | relative_url }}" alt="Signed agreements uploaded to SharePoint" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>SharePoint upload</figcaption></figure>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_20_ReviewAgreements.png' | relative_url }}" alt="Review agreements" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Review agreements</figcaption></figure>

1. You can also review the workflow instance in the Docusign developer portal, where the progress status is shown as **Completed**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_21_WorkflowProgressStatus.png' | relative_url }}" alt="Workflow progress status" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Completed status</figcaption></figure>

**Congratulations!** 🥳 You learned how to invoke a Workflow Builder workflow from an agent through the **Docusign MCP Demo** tool.

## 🧪🌟 1.6 Bonus - Add the Work IQ Calendar tool (multi-MCP capabilities)

If your tenant and user are enabled for Frontier capabilities, try the following exercise to combine a second MCP server, **Work IQ Calendar**, with the agent.

You will update the agent to automatically create an Outlook meeting on the calendar to review the HR onboarding pre-checklist after the Docusign Workflow Builder workflow succeeds.

Download and extract `sample-skill.zip`, then upload the `sample-skill-outlook-pre-onboarding-checklist-meeting.zip` file to the agent.

1. Update the agent instructions to include details for creating an Outlook meeting after the Workflow Builder workflow is successfully triggered. In the second paragraph of the instructions, add the following as a new line:

    ```text
    When the workflow has successfully been triggered, schedule an Outlook meeting.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_01_UpdateInstructions.png' | relative_url }}" alt="Update agent instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Update instructions</figcaption></figure>

1. Next, add an Outlook meeting scheduling section below the **Docusign Workflow Builder** section.

    <div class="info-box note" markdown="1">

    **Tip**: Agent instructions define what the agent should do and when it should do it. A skill defines how to perform a specific task reliably and consistently.

    </div>

    ```text
    ## Schedule Outlook meeting
    When the workflow has successfully been triggered, use the `outlook-pre-onboarding-checklist-meeting` skill to create the Outlook meeting.
    ```

    After updating the agent instructions, select **Save**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_02_UpdateInstructionsToIncludeOutlookMeetingHeader.png' | relative_url }}" alt="Update instructions to include the Outlook meeting header" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Update instructions</figcaption></figure>

1. In the right panel, under **Skills**, select the **plus icon** to upload the skill file.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_03_AddSkill.png' | relative_url }}" alt="Select the add skill icon" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a skill</figcaption></figure>

1. Click to upload the file.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_04_ClickToUploadSkill.png' | relative_url }}" alt="Upload file" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Upload file</figcaption></figure>

1. Download and extract `sample-skill.zip`, then upload the `sample-skill-outlook-pre-onboarding-checklist-meeting.zip` file to the agent.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_05_SelectSkillFile.png' | relative_url }}" alt="Select the skill file" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the skill file</figcaption></figure>

1. The skill is added to the agent.

    <div class="info-box note" markdown="1">

    **Tip**: This skill is the agent's automation recipe for scheduling an Outlook pre-onboarding meeting after the Docusign Workflow Builder workflow succeeds.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_06_SkillAdded.png' | relative_url }}" alt="Skill added" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Skill added</figcaption></figure>

1. Next, add the **Work IQ Calendar (Preview)** tool. Under **Tools** in the right panel, select the **plus icon**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_07_AddWorkIQCalendarTool.png' | relative_url }}" alt="Add a new tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add the Work IQ Calendar tool</figcaption></figure>

1. Select the **Model Context Protocol (MCP)** category to filter the tool list to MCP tools. Select the **Work IQ Calendar (Preview)** tool.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_08_SelectWorkIQCalendar.png' | relative_url }}" alt="Select Work IQ Calendar (Preview)" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Work IQ Calendar</figcaption></figure>

1. Create a connection for the tool using the signed-in account in your developer environment. Select the **chevron icon** and select **Create new connection**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_09_CreateNewConnection.png' | relative_url }}" alt="Select Create new connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create a new connection</figcaption></figure>

1. Select **Create**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_10_SelectCreate.png' | relative_url }}" alt="Select Create" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Create</figcaption></figure>

1. Select the signed-in account, then select **Next**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_11_SelectNext.png' | relative_url }}" alt="Select Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Next</figcaption></figure>

1. A list of supported actions for the **Work IQ Calendar (Preview)** tool appears. Select **Confirm** to add the tool.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_12_ReviewAndConfirm.png' | relative_url }}" alt="Select Confirm" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Confirm</figcaption></figure>

1. The tool is added. Select **Preview** and start a new test session with **+ New chat**. Enter and submit the following text:

    ```text
    Send an employment agreement and offer letter to [employee name], [email address]
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_13_TestWorkIQCalendarTool.png' | relative_url }}" alt="Test the Work IQ Calendar tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Test the tool</figcaption></figure>

1. Next, the orchestrator calls the **Docusign MCP Demo** tool to retrieve the workflow and workflow trigger requirements. Repeat the same steps as in the previous exercise: replace the placeholders, then submit the information to the agent.

    To verify that the instruction to create the meeting two business days earlier is followed, use an effective date and start date that fall on a Monday or Tuesday.

    ```text
    employee position is [position], effective date and start date is [MMMM d], salary is [salary dollar amount], reporting to [manager full name] [manager email address], and due signed date is [MMMM d]
    ```

1. After you provide the information required to trigger the workflow, the orchestrator confirms that the workflow was successfully triggered, processes the skill, and calls the **Work IQ Calendar (Preview)** tool to create an Outlook meeting two business days before the effective date.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_14_LoadedSkill.png' | relative_url }}" alt="Loaded skill" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Load the skill</figcaption></figure>

1. After the Outlook meeting is created, a summary is provided.

    First, confirmation appears that the workflow was successfully triggered.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_15_CompletionOfWorkflowAndOutlookMeeting.png' | relative_url }}" alt="Workflow and Outlook meeting completed" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Completion confirmation</figcaption></figure>

1. A second confirmation provides the details of the Outlook meeting that was created.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_16_ConfirmationOfOutlookMeeting.png' | relative_url }}" alt="Outlook meeting confirmation" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Meeting confirmation</figcaption></figure>

1. Go to your Outlook calendar to confirm the meeting invitation. In the screenshot below, the meeting was created on Friday, two business days before the Tuesday effective date.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_17_OutlookCalendar.png' | relative_url }}" alt="Confirm the meeting in Outlook calendar" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Outlook calendar</figcaption></figure>

1. You can also expand the skill details in the test session to inspect the reasoning the orchestrator applied in more detail.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_18_AgentReasoningUsingSkill.png' | relative_url }}" alt="Agent reasoning using the skill" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Agent reasoning</figcaption></figure>

1. When you complete the workflow process, the signed documents are uploaded back to SharePoint.

## ✅ Mission complete

Congratulations, agent - you completed **Operation Docusign MCP**! You have now mastered the following skills:

✅ **Workflow foundation**: You built a Docusign Web Form, created reusable document templates, and configured an end-to-end Workflow Builder process.

✅ **Process validation**: You manually tested the workflow by running a real instance, collecting participant input, capturing signatures, and confirming document delivery.

✅ **Agent integration**: You built a custom Copilot Studio agent, connected the Docusign MCP Demo tool, and triggered Workflow Builder through natural language.

✅ **Input-driven orchestration**: You provided workflow start variables through conversational prompts and validated a successful workflow invocation.

✅ **Multi-MCP extension (bonus)**: You added Work IQ Calendar (Preview) to combine Microsoft first-party and third-party MCP tools in one agent experience.

## 🏅 Claim your completion badge

Congratulations, agent - mission complete! Now it's time to claim your badge.

Submit the badge request form and answer all required questions:

[https://aka.ms/agent-academy-special-ops/docusign-mcp/form](https://aka.ms/agent-academy-special-ops/docusign-mcp/form)

After your submission is reviewed, you will receive an email from the Global AI Community with instructions for claiming your badge.

<div class="info-box note" markdown="1">

**Tip**: If you do not see the email, check your spam or junk folder.

</div>

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/Academy-Docusign_Badge.png' | relative_url }}" alt="Docusign completion badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Docusign completion badge</figcaption></figure>

## 📚 Tactical resources

🔗 [Docusign for developers](https://developers.docusign.com)

🔗 [Create a developer account](https://www.docusign.com/developers/sandbox)

🔗 [Build with the Docusign MCP server](https://developers.docusign.com/platform/mcp-server/microsoft-copilot)

🔗 [Docusign MCP overview](https://support.docusign.com/s/document-item?language=en_US&bundleId=ug3906200f-95c6-4a6b-90b1-f928c85961c6&topicId=con1438e5dd-ae84-435f-8b2e-028117782a6d.html&_LANG=enus)

🔗 [Connect your Docusign account to Copilot Studio](https://support.docusign.com/s/document-item?language=en_US&elqTrackId=92dab223e52c434bb4d719365ec42701&elqTrack=true&bundleId=ug3906200f-95c6-4a6b-90b1-f928c85961c6&topicId=tsk6894353c-47ad-4dc9-8867-8a26ea379a65.html&_LANG=enus)

📖 [Microsoft MCP server certification](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-certification)

📖 [Docusign MCP Demo connector (Microsoft Learn)](https://learn.microsoft.com/en-us/connectors/docusignmcpdemo/)
