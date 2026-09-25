---
layout: "chapter"
lang: en
date: 2026-03-16
title: "Mission 01: Get started with the Hiring Agent"
short_title: "01. Get started"
description: "Deploy the core infrastructure for a hiring management system and create the central orchestrator agent"
order: 1
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/01-get-started/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-16"
canonical_url: "https://microsoft.github.io/agent-academy/operative/01-get-started/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🚨 Mission 01: Get started with the Hiring Agent](https://microsoft.github.io/agent-academy/operative/01-get-started/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

🎥 **Watch the hands-on video**

<figure class="screenshot">
  <a href="https://www.youtube.com/watch?v=VaEy6ux2sQs" target="_blank" rel="noopener">
    <img src="{{ '/assets/academy/operative-01-get-started/01-get-started-thumbnail_PlayButton.png' | relative_url }}" alt="Get started with the Hiring Agent video thumbnail" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
</figure>

## 🎯 Mission briefing

Welcome, Agent. Your first assignment is **Operation Talent Scout**. In this mission, you will establish the foundational infrastructure for an AI-powered hiring system that transforms how organizations find and hire top talent.

The goal of this mission is to use Microsoft Copilot Studio to deploy and configure a comprehensive hiring management system. You will import a prebuilt solution that includes all required data structures, then create your first AI agent, the **Hiring Agent**, which will oversee all future hiring activities.

This initial deployment gives you the solution you will expand throughout the Agent Academy Operative course. Think of it as the base of operations for the missions ahead. It is the foundation on which you will build a network of specialized agents in later missions.

<div class="info-box note" markdown="1">
**This lab uses the classic Copilot Studio experience** — Microsoft Copilot Studio is rolling out a new authoring experience. The screenshots and steps in this lab are based on the **classic experience**. If your screen looks different, turn off **New Experience** in the upper-right corner before continuing. Updated guidance for the new experience will also be provided, but this lab remains valid in the classic experience.
</div>

## 🔎 Objectives

In this mission, you will learn how to:

1. Understand the hiring automation scenario's challenges and solution, and grasp the overall context
1. Successfully import and configure the base components of the hiring management system
1. Create the hiring agent that serves as the starting point for the scenario you will build as an Agent Academy Operative

## 🔍 Prerequisites

Before starting this mission, prepare the following:

- A Copilot Studio license
- Access to a Microsoft Power Platform environment that is **not a managed environment**
- Admin permissions to create solutions and agents

<div class="info-box note" markdown="1">
**Prerequisite help** — If you need help preparing a Copilot Studio license, see the [Recruit course setup lab]({{ '/en/chapters/academy-recruit-00-course-setup/' | relative_url }}), which walks through setting up a Power Platform environment and Copilot Studio trial.
</div>

## 🏢 Understanding the hiring automation scenario

This scenario shows how an organization can use Microsoft Copilot Studio to improve and automate the hiring process. In this course, you will learn an architecture in which multiple agents collaborate to handle tasks such as reviewing resumes, recommending suitable roles, preparing interview materials, and evaluating candidates.

### Business value

This solution helps HR teams save time and make better decisions in the following ways:

- Automatically process resumes received by email.
- Suggest suitable roles based on candidate profiles.
- Generate job applications and interview guides tailored to each candidate.
- Support fair and compliant hiring processes through built-in safety and moderation features.
- Collect feedback to improve the solution.

### How it works

- The central **Hiring Agent** coordinates the overall process and stores data in Microsoft Dataverse.
- The **Application Intake Agent** reads resumes and creates job applications.
- The **Interview Prep Agent** generates interview questions and documents based on a candidate's background.
- The system can be published to a demo website so stakeholders can interact with it directly.

This scenario is well suited for organizations that want to modernize hiring workflows with AI-powered automation while maintaining transparency, fairness, and efficiency.

## 🧪 Lab 1 - Set up the Hiring Agent

In this hands-on lab, you will lay the foundation for the hiring automation system. First, you will import a preconfigured solution containing the Dataverse tables and data structures required to manage candidates, roles, and hiring workflows. Next, you will populate those tables with sample data that supports the learning throughout this module and provides realistic test scenarios. Finally, you will create the Hiring Agent in Copilot Studio, setting up the basic conversation interface that all functionality added in later missions will build on.

### 🧪 Lab 1.1 - Import the solution

1. Go to **[Copilot Studio](https://copilotstudio.microsoft.com)**.
1. In the left navigation menu, select **...**, then select **Solutions**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-solutionstab.png' | relative_url }}" alt="Solutions tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Import Solution** button at the top.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-importsolution.png' | relative_url }}" alt="Import Solution" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **[Download](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/operative/01-get-started/assets/Operative_1_0_0_0.zip)** the prepared solution.
1. Select **Browse**, then select the solution you downloaded in the previous step.
1. Select **Next**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-nextsolution.png' | relative_url }}" alt="Browse for solution" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Import**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-import.png' | relative_url }}" alt="Import solution" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    <div class="info-box note" markdown="1">
    **Note** — When the import succeeds, a green notification bar displays the message `Solution "Operative" imported successfully.` after completion.
    </div>

1. When you see the `imported successfully` message, select the solution display name, `Operative`, from the Solutions list to review the imported contents.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-01-get-started/01-selectsolution.png' | relative_url }}" alt="Open solution" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

Review the imported solution and confirm that it contains the following components.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-01-get-started/components.png' | relative_url }}" alt="Imported tables" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

| Display name | Type | Description |
| ----------- | ---- | ----------- |
| Candidate | Table | Candidate information |
| Evaluation Criteria | Table | Evaluation criteria for the role |
| Hiring Hub | Model-Driven App | Application that manages the hiring process |
| Hiring Hub | Site Map | Navigation structure for the Hiring Hub app |
| Job Application | Table | Job application |
| Job Role | Table | Job role |
| Resume | Table | Candidate resume |

As the final task in this lab, select the **Publish all customizations** button at the top of the page.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-01-get-started/01-pubcustomizations.png' | relative_url }}" alt="Publish all customizations" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

### 🧪 Lab 1.2 - Import sample data

In this lab, you will add sample data to some of the tables imported in Lab 1.1.

#### Download the files to import

> 📥 The sample files needed for the lab can be downloaded from the [original mission page](https://microsoft.github.io/agent-academy/operative/01-get-started/).

#### Import Job Role sample data

1. Return to the solution you imported in the previous lab.
1. Select the check mark in front of the row to select the **Hiring Hub** model-driven app.
1. Select the **Play** button at the top.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-playhiringhubapp.png' | relative_url }}" alt="Run app" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    <div class="info-box note" markdown="1">
    **Warning** — You may be prompted to sign in again. If so, sign in. After signing in, the Hiring Hub app should be displayed.
    </div>

1. In the left navigation menu, select **Job Roles**.
1. In the command bar, select the **More** icon (three vertical dots).
1. Select the **right arrow** next to **Import from Excel**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/import-from-excel.png' | relative_url }}" alt="Import from Excel" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Import from CSV**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/import-from-csv.png' | relative_url }}" alt="Import from CSV" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Choose File** button, select the **job-roles.csv** file you just downloaded, then select **Open**.
1. Select **Next**.
1. Leave the next step unchanged and select **Review Mapping**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/import-from-csv-job-roles.png' | relative_url }}" alt="Review mapping" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Confirm that the mapping is correct, then select **Finish Import**.

    <div class="info-box note" markdown="1">
    **Note** — This starts the import. You can track its progress or select **Done** to finish this process immediately.
    </div>

1. Select **Done**.

This may take a little while, but you can select **Refresh** to confirm that the import succeeded.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-01-get-started/job-roles-import-successful.png' | relative_url }}" alt="Job Roles import successful" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

#### Import Evaluation Criteria sample data

1. In the left navigation menu, select **Evaluation Criteria**.
1. In the command bar, select the **More** icon (three vertical dots).
1. Select the **right arrow** next to **Import from Excel**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/import-from-excel.png' | relative_url }}" alt="Import from Excel" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Import from CSV**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/import-from-csv.png' | relative_url }}" alt="Import from CSV" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the **Choose File** button, select the **evaluation-criteria.csv** file you just downloaded, then select **Open**.
1. Select **Next**.
1. Leave the next step unchanged and select **Review Mapping**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/import-from-csv-evaluation-criteria.png' | relative_url }}" alt="Review mapping" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Now you need to do a little more work in the mapping. Select the magnifying glass (🔎 icon) next to the **Job Role** field.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-jobrolemag.png' | relative_url }}" alt="Job Role" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Make sure **Job Title** is selected here, and add it if it is not.
1. Select **OK**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-jobtitle.png' | relative_url }}" alt="Job Title" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Confirm that the remaining mappings are correct, then select **Finish Import**.

    <div class="info-box note" markdown="1">
    **Note** — This starts the import again. You can track its progress or select **Done** to finish this process immediately.
    </div>

1. Select **Done**.

This may take a little while, but you can select **Refresh** to confirm that the import succeeded.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-01-get-started/evaluation-criteria-import-successful.png' | relative_url }}" alt="Evaluation Criteria import successful" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

### 🧪 Lab 1.3 - Create the Hiring Agent

Now that the prerequisite setup is complete, it is time to get to work. First, create the Hiring Agent.

1. Go to **[Copilot Studio](https://copilotstudio.microsoft.com)** and make sure you are in the same environment where you imported the solution and data.
1. In the left navigation menu, select **Agents**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-agenttab.png' | relative_url }}" alt="Agents tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select the down-arrow icon next to **Create blank agent**, then select **Advanced create**.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-newagent.png' | relative_url }}" alt="New agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. For **solution**, select **Operative**. This is the solution you just imported.
1. For **schema name**, enter **hiringagent** after the `ppa_` prefix.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-agentsettings.png' | relative_url }}" alt="Agent settings" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Confirm and create**.

    This creates the agent in the `Operative` solution. It is initially created with the name `Agent 1`, which is not very useful, so we will change it.

1. In the **Details** card at the top, select **Edit**.
1. In **Name**, enter the following.

    ```text
    Hiring Agent
    ```

1. In **Description**, enter the following.

    ```text
    Central orchestrator for all hiring activities
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-editdetails.png' | relative_url }}" alt="Configuration" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Select **Save** to save the agent. It may take a little while for the changes to appear.

You will continue using this agent in the other missions of the Operative course.

## 🎉 Mission complete

You have completed Mission 01. You have now learned:

✅ **Scenario understanding**: A comprehensive understanding of the hiring automation challenge and the solution you will build  
✅ **Solution deployment**: Successfully imported and configured the components of the hiring management system  
✅ **Agent creation**: Built the hiring agent that serves as the starting point for the scenario you will build as an Agent Academy Operative  

Continue to the next mission, [Mission 02: Write Agent Instructions]({{ '/en/chapters/academy-operative-02-agent-instructions/' | relative_url }}).

## 📚 Tactical resources

📖 [Microsoft Copilot Studio - Create an agent](https://learn.microsoft.com/microsoft-copilot-studio/authoring-first-bot)  
  
📖 [Microsoft Dataverse Documentation](https://learn.microsoft.com/power-apps/maker/data-platform)
