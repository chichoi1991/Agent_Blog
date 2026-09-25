---
layout: "chapter"
lang: en
date: 2026-08-06
title: "Mission 00: Course Setup"
short_title: "Course Setup"
description: "Start the Recruit course by preparing your development environment, Copilot Studio trial, and SharePoint site."
order: 0
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/00-course-setup/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/00-course-setup/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🚨 Mission 00: Course Setup](https://microsoft.github.io/agent-academy/recruit/00-course-setup/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

## Mission Briefing

Welcome, Recruit. Before you build your first AI agent, you need a **development environment that is ready for field work**.

This briefing walks you through the systems, access credentials, and setup steps required to work successfully in the Microsoft 365 ecosystem.

<div class="info-box note" markdown="1">
**Important — This mission uses the classic Copilot Studio UI**<br>
Microsoft Copilot Studio is rolling out a new user experience (UI). The screenshots and steps in this mission are based on the **classic experience**. If your screen looks different, turn off **New Experience** in the upper-right corner before continuing.
</div>

## Objectives

In this mission, you will learn how to:

1. Get a Microsoft 365 account
1. Get access to Microsoft Copilot Studio
1. Understand when a Microsoft 365 Copilot license is required for publishing to production environments
1. Create a developer environment for Copilot Studio
1. Create a SharePoint site that will be used as a data source in later missions

<div class="info-box note" markdown="1">
**Important**  
**Do you already have access to Microsoft 365, Power Platform, and Copilot Studio?**<br>
Steps 1–4 below create a **new trial environment from scratch**. If you already have a Microsoft 365 business tenant with access to Power Platform and Copilot Studio, you can skip directly to **[Step 5: Create a new SharePoint site](#step-5-create-a-new-sharepoint-site)**. Steps 1–4 are only needed if you want to set up a dedicated trial environment for testing these capabilities.
</div>

## Prerequisites

Before you begin, make sure you have:

1. A **work or school email address** (personal email addresses such as `@outlook.com` or `@gmail.com` are not supported)
1. An internet connection and a modern browser (recommended: Edge, Chrome, or Firefox)
1. Basic experience using Microsoft 365, such as signing in to Office apps or Teams
1. (Optional) A credit card or payment method if you plan to purchase a paid license

## Set up a trial environment (Steps 1–4)

## Step 1: Prepare a Microsoft 365 account

Copilot Studio is part of Microsoft 365, so you need a Microsoft 365 account to access it. You can use an existing account, or follow the steps below to prepare the appropriate license.

**Prepare a paid Microsoft 365 Business subscription:**

1. Go to [Microsoft 365 Business Plans and Pricing](https://www.microsoft.com/microsoft-365/business/microsoft-365-plans-and-pricing).
1. Select the Microsoft 365 Business Basic plan, then select **Try for free**. Follow the forms to enter your subscription, account, and payment information.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/m365-freetrial.png' | relative_url }}" alt="Microsoft 365 Business Basic trial sign-up page" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Microsoft 365 Business Basic trial sign-up page</figcaption>
</figure>

1. When setup is complete, sign in with your new account.

<div class="info-box note" markdown="1">
**Tip**  
To publish agents to Microsoft 365 Copilot Chat or connect to organizational data such as SharePoint, OneDrive, and Dataverse, you need a Microsoft 365 Copilot license. For more information about this additional license, see the [Microsoft 365 Copilot plans page](https://www.microsoft.com/microsoft-365/copilot#plans).
</div>

## Step 2: Start a Copilot Studio trial

After preparing your Microsoft 365 tenant, you need access to Copilot Studio. Follow these steps to start a 30-day free trial.

1. Go to the [Copilot Studio trial sign-up page](https://aka.ms/TryCopilotStudio).
1. Enter the email address for the new account you configured in the previous step, then select **Next**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/mcs-trial-screen.png' | relative_url }}" alt="Copilot Studio free trial start screen" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio free trial start screen</figcaption>
</figure>

1. Confirm that Copilot Studio recognizes the account, then select **Sign in**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/mcs-trial-signin.png' | relative_url }}" alt="Microsoft account sign-in for Copilot Studio" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Microsoft account sign-in for Copilot Studio</figcaption>
</figure>

1. Select **Start free trial**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/mcs-start-trial.png' | relative_url }}" alt="Copilot Studio free trial start page" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio free trial start page</figcaption>
</figure>

<div class="info-box note" markdown="1">
**Trial notes**

1. The free trial gives you access to the **full capabilities of Copilot Studio**.
1. As the trial expiration approaches, you will receive email notifications. You can extend it in 30-day increments, for up to 90 days of agent runtime.
1. If your tenant admin has disabled self-service sign-up, you will see an error. In that case, ask your Microsoft 365 administrator to enable it again.
</div>

## Step 3: Create a new developer environment

### Sign up for the Power Apps Developer Plan

Sign up for the Power Apps Developer Plan with the same Microsoft 365 tenant you used in Step 1. This creates a free development environment where you can build and test with Copilot Studio.

1. Sign up from the [Power Apps Developer Plan website](https://aka.ms/PowerAppsDevPlan).

   - Enter your email address.
   - Select the checkbox.
   - Select **Start free**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/0.3_01_SignUp.png' | relative_url }}" alt="Power Apps Developer Plan sign-up screen" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Power Apps Developer Plan sign-up screen</figcaption>
</figure>

1. After Developer Plan sign-up is complete, you are redirected to [Power Apps](https://make.powerapps.com/). The environment name is based on your user name; for example, it may appear as **Adele Vance's environment**. If an environment with the same name already exists, the new developer environment is named something like **Adele Vance's (1)**.

   You will use this developer environment in Copilot Studio as you complete the labs.

<div class="info-box note" markdown="1">
**Note**  
If you are using an existing Microsoft 365 account and did not create a new account in Step 1, such as your account in your work organization, your IT admin or equivalent environment-management team may have disabled sign-up. In that case, contact your admin or create a test tenant by following Step 1.

When using an existing organizational environment, make sure the environment is not a **managed environment**. Restrictions in managed environments can prevent features such as adding Power Automate flows as agent tools from working correctly.
</div>

## Step 4: Enable publishing permissions in the Copilot Studio trial

Recent changes to Copilot Studio trials mean that agent publishing is not allowed by default. To enable publishing, add yourself to the Copilot Studio Authors role in the Power Platform admin center.

First, you need a security group containing the people who should have publishing permissions. You will connect this group to the Copilot Studio Authors role.

1. Go to the [Microsoft 365 admin center](https://admin.cloud.microsoft).
1. Expand the **Teams & groups** tab and select **Active teams & groups**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-teams-groups.png' | relative_url }}" alt="Teams and groups in the admin center" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Teams and groups in the admin center</figcaption>
</figure>

1. Select the **Security groups** tab, then select **Add a security group**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-securitygroup-tab.png' | relative_url }}" alt="Security groups tab in the admin center" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Security groups tab in the admin center</figcaption>
</figure>

1. Enter a security group name such as **AgentCreators**, then select **Next**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-securitygroup-name.png' | relative_url }}" alt="Enter the security group name" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Enter the security group name</figcaption>
</figure>

1. Confirm the name, then select **Create group**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-creategroup.png' | relative_url }}" alt="Create the configured security group" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Create the configured security group</figcaption>
</figure>

1. Select the security group you just created from the list.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-selectgroup.png' | relative_url }}" alt="Select the newly created security group" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select the newly created security group</figcaption>
</figure>

1. Select the **members** tab, then select **view all and manage members**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-viewmembers.png' | relative_url }}" alt="Open security group members" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Open security group members</figcaption>
</figure>

1. Select **add members**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-addmember.png' | relative_url }}" alt="Add members to the security group" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Add members to the security group</figcaption>
</figure>

1. Select your name from the list, select **Add**, then select **Add** again.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-selectname.png' | relative_url }}" alt="Select your account as a group member" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select your account as a group member</figcaption>
</figure>

1. Go to the [Power Platform admin center](https://admin.powerplatform.com).
1. Select the **manage** tab.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-admin-managetab.png' | relative_url }}" alt="Manage tab in the Power Platform admin center" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Manage tab in the Power Platform admin center</figcaption>
</figure>

1. Select the **tenant settings** tab.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-admin-tenantsettings.png' | relative_url }}" alt="Tenant settings in the Power Platform admin center" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Tenant settings in the Power Platform admin center</figcaption>
</figure>

1. Select the **Copilot Studio authors** option.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-authors.png' | relative_url }}" alt="Copilot Studio authors security setting" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio authors security setting</figcaption>
</figure>

1. In the **Copilot Studio authors** setting, select **Edit** (pencil icon).

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-pencil.png' | relative_url }}" alt="Edit Copilot Studio authors security setting" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Edit Copilot Studio authors security setting</figcaption>
</figure>

1. Select the security group from the list, then select **Done**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-securitygroup.png' | relative_url }}" alt="Select the security group to use for Copilot Studio authors" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select the security group to use for Copilot Studio authors</figcaption>
</figure>

1. Confirm that the security group is shown, then select **Save**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-save.png' | relative_url }}" alt="Save the Copilot Studio authors security setting" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Save the Copilot Studio authors security setting</figcaption>
</figure>

## Setup required for everyone

Whether you are using a trial environment or an existing environment, the following steps are required for everyone.

## Step 5: Create a new SharePoint site

You need to create a new SharePoint site. This site will be used in a later [Mission 06]({{ '/en/chapters/academy-recruit-06-create-agent-from-conversation/' | relative_url }}) when you add SharePoint as a knowledge source.

1. In [Power Apps](https://make.powerapps.com/) or the [Microsoft 365 admin center](https://admin.cloud.microsoft), select the **App launcher** (grid icon) to open the app menu, then select **SharePoint**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-select-sharepoint-in-power-apps.png' | relative_url }}" alt="Select SharePoint in Power Apps" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select SharePoint in Power Apps</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-select-sharepoint-in-microsoft-365-admin-center.png' | relative_url }}" alt="Select SharePoint in the Microsoft 365 admin center" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select SharePoint in the Microsoft 365 admin center</figcaption>
</figure>

1. When SharePoint loads, select **Build** from the left navigation menu, then select **Site** to create a new SharePoint site.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-create-a-new-sharepoint-site.png' | relative_url }}" alt="Create a new SharePoint site" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Create a new SharePoint site</figcaption>
</figure>

1. A dialog appears to guide site creation. Under the **Team site** option, select **IT help desk**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-select-it-help-desk-site-template.png' | relative_url }}" alt="Select the IT help desk site template" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Select the IT help desk site template</figcaption>
</figure>

1. Select **Use template** to create a new SharePoint site with the IT help desk template.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-use-the-it-help-desk-template.png' | relative_url }}" alt="Use the IT help desk template" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Use the IT help desk template</figcaption>
</figure>

1. Enter the site information. Example values are shown below.

   | Field | Value |
   | --- | --- |
   | Site name | Contoso IT |
   | Site description | Copilot Studio Agent Academy |
   | Site address | ContosoIT |

   Select **Create site**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-configure-the-new-sharepoint-site-details.png' | relative_url }}" alt="Configure the new SharePoint site details" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Configure the new SharePoint site details</figcaption>
</figure>

1. After selecting **Create site**, SharePoint may take a few seconds to finish provisioning. During this time, you can add users by entering email addresses in the **Add members** field if needed.

   When you see the confirmation message that the site is ready, select **Go to site**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-open-the-newly-created-sharepoint-site.png' | relative_url }}" alt="Open the newly created SharePoint site" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Open the newly created SharePoint site</figcaption>
</figure>

1. When the SharePoint site home page loads, **copy** the SharePoint site URL.
1. This template provides pages with sample data for several IT policies and two sample lists: Tickets and Devices.

### Use the Devices SharePoint list

In Mission 07, you will use the **Devices** list.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/devices-list.png' | relative_url }}" alt="Devices list" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Devices list</figcaption>
</figure>

### Add a new column

In the **Devices** list, go to the far end of the columns and select **+ Add column**.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/add-column.png' | relative_url }}" alt="Add column" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Add column</figcaption>
</figure>

Select the **hyperlink** type, enter **Image** as the column name, then select add.

### Create sample data in the Devices SharePoint list

Populate this list with at least four sample data items, and make sure to include the additional column.<br>
When entering sample data, fill in all of the following fields.

- Device photo - use the device images below
- Title
- Status
- Manufacturer
- Model
- Asset Type
- Color
- Serial Number
- Purchase Date
- Purchase Price
- Order #
- Image - use the links below

Use the links below from the original article to download the required device images.

| Device | URL |
| ------ | --- |
| Surface Laptop 13 | [Surface Laptop 13 image](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Laptop-13.png) |
| Surface Laptop 15 | [Surface Laptop 15 image](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Laptop-15.png) |
| Surface Pro | [Surface Pro image](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Pro-12.png) |
| Surface Studio | [Surface Studio image](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Studio.png) |

## Mission Complete

You have successfully completed the following tasks.

- **Development environment**: Set up a Microsoft 365 development environment.
- **Copilot Studio access**: Activated the Copilot Studio trial.
- **SharePoint site**: Created a site to use for agent grounding.
- **Device data**: Populated the Devices list for later missions.

Continue to [Mission 01: Introduction to Agents]({{ '/en/chapters/academy-recruit-01-introduction-to-agents/' | relative_url }}).

## Resources

- [Power Apps Developer Plan](https://learn.microsoft.com/power-platform/developer/plan)
- [Copilot Studio licensing](https://learn.microsoft.com/microsoft-copilot-studio/requirements-licensing-subscriptions)
- [Create a team site in SharePoint](https://support.microsoft.com/office/create-a-team-site-in-sharepoint-ef10c1e7-15f3-42a3-98aa-b5972711777d)
