---
layout: "chapter"
lang: en
date: 2026-08-06
title: "Mission 08: Enhance user interactions in Topics with Adaptive Cards"
short_title: "Add Adaptive Cards"
description: "Build Adaptive Cards using Power Fx and SharePoint"
order: 8
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/08-add-adaptive-card/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/08-add-adaptive-card/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🚨 Mission 08: Enhance user interactions in Topics with Adaptive Cards](https://microsoft.github.io/agent-academy/recruit/08-add-adaptive-card/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

🎥 **Watch the Walkthrough**

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/video-thumbnail.jpg' | relative_url }}" alt="Video walkthrough: Enhance Topics with Adaptive Cards" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption><a href="https://www.youtube.com/watch?v=RhIlzYHPCXo">Watch the walkthrough on YouTube</a></figcaption></figure>

## 🎯 Mission Brief

Welcome back, Recruit. Your mission is to replace static interactions with rich, actionable Adaptive Cards. You’ll use JSON payloads and Power Fx formulas to gather input, present data, and guide conversations.

<div class="info-box note" markdown="1">
**Important** — This mission uses the classic Copilot Studio experience
If your Copilot Studio screen looks different from the screenshots in this mission, turn off **New Experience** in the upper-right corner to switch back to the **classic experience** used here.
</div>
## 🔎 Objectives

In this mission, you’ll learn:

1. What Adaptive Cards are and how they enhance agent interactions
1. How JSON and Power Fx create dynamic card content
1. How to use the Adaptive Card Designer
1. How to collect user input within an agent topic
1. How to design responsive and accessible Adaptive Cards

## 🤔 What is an Adaptive Card?

An **Adaptive Card** is a way to create interactive, visually rich UI elements that can be embedded in apps like Microsoft Teams, Microsoft Outlook, or agents. It is a structured JSON object that defines the layout and content of a card:

- What elements appear on the card - text, images, buttons
- How those elements are arranged
- What actions users can take such as submitting a form or opening a link

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.0_01_AdaptiveCard.png' | relative_url }}" alt="Adaptive Card" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Adaptive Card</figcaption></figure>

### Why Adaptive Cards matter in Copilot Studio

Imagine you're building an agent that asks users for their name, email, or feedback. If you just use plain text, the conversation can feel boring or hard to follow. That’s where Adaptive Cards come in!

1. **Makes conversations interactive** - instead of sending text as messages to the user, you can show buttons, forms, images and more.
    - Example: a card can ask the user to fill in their name and email in a clean form.

1. **Look great everywhere** - Adaptive Cards automatically match the style of the app they're in, such as Microsoft 365 Copilot chat or Microsoft Teams. You don't need to worry about dark mode, font, or layouts - it adapts.

1. **Easy to build with JSON** - you define the card using JSON code (think _recipe_ for the UI). Copilot Studio helps you preview your card before adding it to the topic.

1. **Collect and use data** - you can use the card to ask questions, collect answers, and use that data in the conversation flow.
    - Example: Ask for a user's phone number, then show a confirmation card with their phone number.

1. **Boost user experience** - cards make your agent feel more interactive. It's a more clean, clickable, and user-friendly type of interface.

## 🐱 Is _JSON_ a person?

Pronounced as "Jason," it's not a person 😅

JSON, otherwise known as _JavaScript Object Notation_ is a lightweight format used to structure data. It's easy to read and write, and looks like a series of key-value pairs inside curly braces {}.

This is one of the options to use when adding an adaptive card to your topic.

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.0_02_AdaptiveCardPropertiesPane.png' | relative_url }}" alt="Adaptive card node properties" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Adaptive card node properties</figcaption></figure>

## 👀 I see another option for building an adaptive card using _formula_

Remember how we learned about Power Fx in [Mission 07 - Using Power Fx in your nodes]({{ '/en/chapters/academy-recruit-07-add-new-topic-with-trigger/' | relative_url }})? The same concepts apply to Adaptive Cards in Copilot Studio.

As a recap,

<div class="info-box note" markdown="1">
**Note** — Power Fx is a low-code programming language used to add logic and dynamic behavior to your agent. It's the same language used in Microsoft Power Apps, and it's designed to be simple and Excel-like, making it easy for developers and non-developers.
</div>
### How Power Fx works in Adaptive Cards

When you design an Adaptive Card in Copilot Studio, you can use Power Fx formulas to:

- Dynamically insert values such as user names, dates or status.
- Format text or numbers such as show currency or round numbers.
- Show or hide elements based on conditions.
- Customize responses based on user input, variables, outputs from conversation nodes.

For example,

"`Hello`" & `System.User.DisplayName`

This formula combines the word "Hello" with the user's name dynamically.

### Why it's useful

1. **Personalization**

    You can tailor message to each user, making interactions feel more natural and relevant.

1. **Dynamic content**

    Cards can display real data from variables and outputs from conversation nodes.

1. **Smart logic**

    You can control what users see or interact with based on conditions, improving usability and reducing errors.

1. **Low-code friendly**

    Power Fx is a low-code programming language. As mentioned earlier, it's readable, intuitive and similar to Excel formulas.

## 👷🏻‍♀️ Building with the Adaptive Card Designer

The **Adaptive Card Designer** is a visual tool that lets you build interactive message cards using drag-and-drop elements like text, images, buttons, and inputs. Its purpose is to help you create rich, dynamic messages without writing complex code, making it easier to design user-friendly interfaces.

The designer tool helps you build the card visually, but behind the scenes, it’s generating the JSON object for you. You can also switch to _formula_ which enables Power Fx expressions to be used in the card to display data from else where.

## 🎨 Understanding the Adaptive Card Designer

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.0_03_AdaptiveCardPropertiesPane.png' | relative_url }}" alt="Adaptive Card Designer" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Adaptive Card Designer</figcaption></figure>

### A) Card Elements

These are the building blocks of your adaptive card. You can drag and drop elements such as the following:

- **TextBlock** to display text.
- **Image** to show pictures.
- **FactSet** for key-value pairs.
- **Input fields** to display text boxes, date pickers, toggles.
- **Actions** to display buttons such as _Submit_, _Open URL_, or _Show Card_.

Each element has its own purpose and can be styled or configured.

### B) Card Viewer

This is the **Preview** area where you see how your card will look like in real time. As you add or edit elements, the viewer updates instantly to reflect changes. This enables you to make iterative updates and see the design output at the same time.

### C) Card Structure

This shows the **hierarchy and layout** of your card. For example:

- A card might start with a **TextBlock** for the title.
- Then a **ColumnSet** with an image on one side and text on the other.
- Followed by a **FactSet** and some **Action buttons**.

It helps you understand how elements are nested and organized.

### D) Element Properties

When you select an element in the card, this panel lets you **customize its settings**:

- Change text size, weight, or color.
- Set image URLs or alt text.
- Configure input options like placeholder text or default values.

This is where you fine-tune each element.

### E) Card Payload Editor

This is the **raw JSON code** behind your card. Advanced users can edit this directly to:

- Use templating features.
- Copy/paste card definitions.

Even if you're new to the Adaptive Card designer, it's helpful to see how the visual design translates into codes.

<div class="info-box note" markdown="1">
**TIP** — Tip - Check out the Adaptive Card samples
1. Browse to [https://adaptivecards.microsoft.com/designer](https://adaptivecards.microsoft.com/designer).
1. Select **New card** to see a list of samples you can choose and modify.
1. Note that this designer is external (web-based). When you build your card in the web-based Adaptive Card Designer, copy the JSON from the Card Payload Editor.
1. Paste the JSON into your adaptive card in your agent in Copilot Studio.
</div>
<figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.0_04_AdaptiveCardDesignerSamples.png' | relative_url }}" alt="Adaptive Card Designer Samples" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Adaptive Card Designer Samples</figcaption></figure>

## 🌵 Common use cases

The following are common use cases for Adaptive Cards in Copilot Studio when used in the **Send a message** or **Ask a question** nodes.

1. **Forms and data collection**

    Use adaptive cards to collect structured input from users, such as:

    - Leave requests
    - Feedback forms
    - Contact information
    - Appointment scheduling

1. **Displaying dynamic information**

    Shows users personalized or real-time data in a clean, readable format from enterprise sources such as ServiceNow, SAP, Dynamics 365, SharePoint etc.

    - Order summaries
    - Account balances
    - Ticket or case status
    - Upcoming events or deadlines

1. **Interactive choices**

    Let users make selections directly in the conversation:

    - Choose from a list of options, for example product categories, support topics.
    - Confirm or cancel action.
    - Rate a service or experience.

1. **Triggering actions**

    Include buttons that trigger further steps in the conversation internally or externally.

    - "Submit request"
    - "View details"

## ⭐ Best practices

Here are some best practices for creating Adaptive Cards for agents in Copilot Studio.

1. **Keep it simple and focused**

    - Design cards with a clear purpose, don’t overload them with too many elements.
    - Use concise text and intuitive layouts to guide users through the interaction.

1. **Be intentional with inputs**

    - Include only the necessary input elements such as text, date choices, to avoid overwhelming users.
    - Use labels to make inputs easy to understand.

1. **Structure for readability**

    - Use **TextBlocks** for headings and instructions.
    - Group related elements using **Containers** or **ColumnSets** to improve visual flow.

1. **Make Action elements clear**

    - Use **Action.Submit** and or **Action.OpenUrl** with clear button titles like "Submit Request" or "View Details"
    - Avoid vague labels like "Click here"

1. **Design for adaptability**

    - Assume the card may be viewed on different screen sizes.
    - Avoid fixed widths and use flexible layouts like **ColumnSets** for responsiveness.

1. **Use dynamic content when possible**

    - Bind card elements to variables or outputs from nodes using Power Fx to personalize the user experience.
    - For example, show the user's name or current status dynamically.

## 🧪 Lab 08 - Add adaptive cards and enhance topic capabilities

We're now going to learn how to enhance our topic with adaptive cards and using advanced functionality of topics and nodes.

### ✨ Use case

**As an** employee

**I want to** request a device

**So that I** can request a device from the list of available devices

Let's begin!

### Prerequisites

1. **SharePoint list**

    We'll be using the **Devices** SharePoint list from [Mission 00 - Course Setup - Step 5: Create new SharePoint site]({{ '/en/chapters/academy-recruit-00-course-setup/' | relative_url }}).

    If you have not set up the **Devices** SharePoint list, return to [Mission 00 - Course Setup - Step 5: Create new SharePoint site]({{ '/en/chapters/academy-recruit-00-course-setup/' | relative_url }}).

1. **Contoso Helpdesk Copilot**

    We're going to use the same agent created previously in [Lesson 06 - Create a custom agent using natural language with AI and grounding it with your data]({{ '/en/chapters/academy-recruit-06-create-agent-from-conversation/' | relative_url }}).

### 8.1 Create a new topic with an adaptive card for user to submit their request

We'll create a new topic that will handle a user's device request. This new topic will contain an **Ask with adaptive card** node to enable user interaction with the agent.

Let's begin!

1. Select the **Topics** tab, then select **+ Add a topic from blank**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_01_NewTopic.png' | relative_url }}" alt="Select Topics tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Topics tab</figcaption></figure>

1. Name the topic as the following,

    ```text
    Request device
    ```

    Enter the following as the description for the trigger.

    ```text
    This topic helps users request a device when they answer yes to the question that asks the user if they would like to request one of these devices.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_02_TopicNameAndTriggerDescription.png' | relative_url }}" alt="Topic Name and trigger Description" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Topic Name and trigger Description</figcaption></figure>

1. Next, add an **Ask with adaptive card** node. This node will display an interactive card for the user to select which device they would like to request.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_03_AddAskWithAdaptiveCard.png' | relative_url }}" alt="Select Ask with adaptive card node" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Ask with adaptive card node</figcaption></figure>

1. Select the node and the **Adaptive Card Node properties** pane will appear. We're now going to edit the JSON. Select **Edit adaptive card**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_04_EditAdaptiveCard.png' | relative_url }}" alt="Edit adaptive card" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Edit adaptive card</figcaption></figure>

1. This is the **Adaptive Card Designer** where you can design your card and see the card design in-real time.

    Try dragging and dropping the **TextBlock** and **FactSet** card elements to the authoring canvas, the card viewer area. Notice how the card structure and card payload editor updates as the two card elements were added. You can directly update the card payload editor and the element properties pane.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_05_DragAndDropCardElements.png' | relative_url }}" alt="Drag and drop card elements" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Drag and drop card elements</figcaption></figure>

1. Select **Preview** to view the card in different widths.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_06_PreviewAdaptiveCard.png' | relative_url }}" alt="Select preview" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select preview</figcaption></figure>

1. The preview will load where you'll see different card outputs by width.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_07_PreviewCardWidths.png' | relative_url }}" alt="Preview card at different widths" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview card at different widths</figcaption></figure>

1. Select **Close** (X icon) to exit **Preview**, then select **Undo** in the designer to remove the two card elements previously added.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_08_Undo.png' | relative_url }}" alt="Undo" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Undo</figcaption></figure>

1. Place focus in the **Card payload editor** and select all lines using the Windows keyboard shortcut of _Ctrl + A_ or using the Mac keyboard shortcut of _Command + A_, followed by deleting the lines. **Paste** the JSON from the [Request devices JSON file](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/08-add-adaptive-card/assets/8.1_RequestDevice.json).

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_09_SelectAll.png' | relative_url }}" alt="Clear card payload editor" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Clear card payload editor</figcaption></figure>

1. Notice how the **Card Preview** now includes elements that display some text and a list of available devices.

    This JSON is currently a placeholder and preview to what we'll use as the base for our card but in the form of a formula rather than JSON since we're going to reference the **global variable**, `Global.VarDevices.value`, that stores the response of the **Get items** SharePoint connector action.

    Select **Save** and select **Close** to exit from the Adaptive card designer modal.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_10_DeviceRequestCard.png' | relative_url }}" alt="Select Save" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Save</figcaption></figure>

1. Select **Close** (X icon) in the **Adaptive Card Node properties** panel.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_11_ExitAdaptiveCardNodeProperties.png' | relative_url }}" alt="Close Adaptive Card Node properties panel" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Close Adaptive Card Node properties panel</figcaption></figure>

1. In the authoring canvas of the topic, you'll see the adaptive card.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_12_DeviceRequestCard.png' | relative_url }}" alt="Device request adaptive card" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Device request adaptive card</figcaption></figure>

1. Scroll to the bottom of the node and you'll see output variables. The `commentsId` and the `deviceSelectionId` were defined in the element properties. These two variables will store values from the card elements the users interact with. These values will be used downstream in the topic, which we'll learn about in the next lesson's lab.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_13_DeviceRequestCardOutputs.png' | relative_url }}" alt="Node variable outputs" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Node variable outputs</figcaption></figure>

1. Let's next update the card from JSON to formula as we'll use Power Fx again to loop through the items returned in the **Get items** SharePoint connector action, stored in the **global variable**, `Global.VarDevices.value`, via the `value` property of the JSON response.

    > [!NOTE]
    > We created this global variable in Lab 07

    Select the card in the **Ask with Adaptive Card** node, followed by selecting the **chevron** icon and select **Formula**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_14_ChangeToFormula.png' | relative_url }}" alt="Change to formula" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Change to formula</figcaption></figure>

1. Select **Expand** to enlarge the **Formula** field.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_15_SelectExpand.png' | relative_url }}" alt="Formula field with Expand control" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Formula field with Expand control</figcaption></figure>

1. Place focus in the **Card payload editor** and select all lines using the Windows keyboard shortcut of _Ctrl + A_ or using the Mac keyboard shortcut of _Command + A_, followed by deleting the lines.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_16_SelectAll.png' | relative_url }}" alt="Formula text selected in card payload editor" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Formula text selected in card payload editor</figcaption></figure>

    Paste the Formula from the [Request Devices formula file](https://raw.githubusercontent.com/microsoft/agent-academy/main/docs/recruit/08-add-adaptive-card/assets/8.1_RequestDeviceFormula.txt).

1. In the formula, we'll loop through each SharePoint list item using the `For All` function to display the values of `Model` in the title of the choice option, and the SharePoint item `ID` is referenced as the value. We're also wrapping the values with the `If(IsBlank()` functions as the formula expects a value in order to render the adaptive card in the authoring canvas of the topic. Otherwise you'll see a message appear, "Property cannot be null"

    **Close** the card modal.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_17_PowerFxFormula.png' | relative_url }}" alt="Power Fx Formula" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Power Fx Formula</figcaption></figure>

1. **Close** the **Adaptive Card Node properties** pane.

1. **Save** the topic.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_18_SaveTopic.png' | relative_url }}" alt="Save topic" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Save topic</figcaption></figure>

### 8.2 Update agent instructions to invoke Request device topic

Now that we created the new topic that handles the device requests, we need to update the **agent instructions** to invoke the topic.

1. Select the **Overview** tab and in the **agent instructions** select **Edit**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_01_EditInstructions.png' | relative_url }}" alt="Edit instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Edit instructions</figcaption></figure>

1. Add a new line below the previous instruction from [Lab 07 - Add a new topic with conversation nodes, 7.3 Add a tool using a connector]({{ '/en/chapters/academy-recruit-07-add-new-topic-with-trigger/' | relative_url }}).

    ```text
    2. If the user answers yes to the question of requesting a device, trigger [Request device]. Otherwise if they answer no to the question of requesting a device, trigger [Goodbye].
    ```

    Select the entire topic placeholder in square brackets and delete the placeholder.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_02_ReplaceRequestDevicePlaceholder.png' | relative_url }}" alt="Request device placeholder" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Request device placeholder</figcaption></figure>

1. Type in `/Req` and select the **Request devices** topic.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_03_ReferenceRequestDeviceTopic.png' | relative_url }}" alt="Redirect to Request devices topic" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Redirect to Request devices topic</figcaption></figure>

1. Repeat the same steps for the next topic placeholder, **[Goodbye]**. Select the entire topic placeholder in square brackets and delete the placeholder. Type in `/Goodbye` and select the **Goodbye** topic.

    - When the user answers **Yes** to the agent asking if they would like request a device, the agent will redirect from the **Available devices** topic to the **Request devices** topic.

    - Otherwise if the user answers **No**, the agent redirect from the **Available devices** topic to the **Goodbye** topic.

    **Save** the updated instructions.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_04_ReferenceGoodbyeTopic.png' | relative_url }}" alt="Redirect to Goodbye topic" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Redirect to Goodbye topic</figcaption></figure>

1. Let's now test our the redirection from the _Available devices_ topic to the _Request devices_ topic. Select the **Test** to load the testing pane and select **Refresh**.

    Then select the **Activity map** icon in the test pane, followed by enabling **Track between topics**. This will allow us to see the _Available devices_ topic has redirected to the _Request devices_ topic.

    OK, we're good to test! Enter the following in the test pane.

    ```text
    I need a laptop
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_05_TestAgent.png' | relative_url }}" alt="Test agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Test agent</figcaption></figure>

1. The agent will respond with the list of available devices followed by the question of asking the user if they would like to request a device. Copy and paste the following,

    ```text
    yes please
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_06_TestRequestDeviceTopic.png' | relative_url }}" alt="Test Request device" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Test Request device</figcaption></figure>

1. We'll next see that the agent has redirected to the **Request device** topic. The agent invoked this topic as per the instructions we added.

    The adaptive card with the interactive elements will now be displayed as message to the user.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_07_AdaptiveCardQuestion.png' | relative_url }}" alt="Question node" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Question node</figcaption></figure>

1. We've now successfully tested 😄 our _Available devices_ topic redirecting to the _Request devices_ topic. We'll be adding more enhancements to this topic in the next lesson's lab.

    Refresh the test pane.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_08_RefreshTestPane.png' | relative_url }}" alt="Refresh test pane" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Refresh test pane</figcaption></figure>

## ✅ Mission Complete

You’ve successfully:

- **Adaptive Card design**: Created an interactive device request card
- **Power Fx**: Used a formula to display data stored in variables
- **User input**: Collected a device selection and additional comments
- **Topic redirection**: Connected the available-device and request-device topics

Next, continue to [Mission 09: Add an Agent Flow]({{ '/en/chapters/academy-recruit-09-add-an-agent-flow/' | relative_url }}).

## 📚 Tactical Resources

- [Using Adaptive Cards in Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/guidance/adaptive-cards-overview?WT.mc_id=power-172619-ebenitez)

- [Add an adaptive card in a Send a message node](https://learn.microsoft.com/microsoft-copilot-studio/authoring-send-message#add-an-adaptive-card?WT.mc_id=power-172619-ebenitez)

- [Create expressions using Power Fx](https://learn.microsoft.com/microsoft-copilot-studio/advanced-power-fx?WT.mc_id=power-172619-ebenitez)

- [Build Adaptive Cards with Power Fx](https://aka.ms/ai-in-action/copilot-studio/ep8)
