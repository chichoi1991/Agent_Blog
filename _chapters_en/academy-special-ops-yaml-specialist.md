---
layout: "chapter"
lang: en
date: 2026-08-07
title: "YAML Specialist"
short_title: "YAML Specialist"
description: "A hands-on lab for building and extending Copilot Studio agents entirely as code in VS Code using the YAML agent definition language. Covers AI-assisted YAML authoring with GitHub Copilot and specialized skills."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/yaml-specialist/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-10"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/yaml-specialist/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🧬 YAML Specialist](https://microsoft.github.io/agent-academy/special-ops/yaml-specialist/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

# 🧬 YAML Specialist

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/YAML_Specialist_Badge.png' | relative_url }}" alt="YAML Specialist Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>YAML Specialist Badge</figcaption></figure>

Agents, your mission — should you choose to accept it — is to become a **YAML Specialist**. Become an operative who builds and extends Microsoft Copilot Studio agents entirely from Visual Studio Code using the Copilot Studio YAML agent definition language. Clone agents, author topics in raw YAML, connect knowledge sources, and push changes back to the cloud — all from your local command center. With GitHub Copilot as your handler, you can iterate faster than the web UI can keep up.

<div class="info-box note" markdown="1">
**This mission mixes VS Code with the classic Copilot Studio experience**

Microsoft Copilot Studio is rolling out a new authoring experience. The screenshots and web UI steps in this mission use the **classic experience**. If your screen looks different, turn off **New Experience** in the upper-right corner before continuing.
</div>

**Mission objectives:**

- Set up the Copilot Studio VS Code extension and clone an agent to your local machine
- Understand the YAML agent definition file structure, including topics, actions, triggers, and knowledge
- Write and edit YAML topics by hand with IntelliSense validation
- Use GitHub Copilot Agent Mode with specialized skills to generate and refine agent YAML
- Synchronize local changes back to Copilot Studio and test the agent in the cloud

## ⚙️ Prerequisites

This mission assumes you have completed the Operative course and have a working Copilot Studio environment. You also need the following installed:

- **Visual Studio Code** - Download and install from [code.visualstudio.com](https://code.visualstudio.com/)
- **Node.js (LTS)** - Required by the Copilot Studio VS Code extension. Download it from [nodejs.org](https://nodejs.org/). Choose the **LTS** version. Verify it in a terminal with `node --version`.

<div class="info-box note" markdown="1">
**Tip**: If VS Code is already installed, you can install the GitHub Copilot and Copilot Studio extensions later during the lab. Each extension installation step is covered in the lab.
</div>

## ❓ What is YAML authoring for Copilot Studio?

<div class="info-box note" markdown="1">
**What is YAML?**

YAML is a simple text format for storing structured information. Think of it as a well-organized outline — instead of curly braces or angle brackets, YAML uses **indentation** (spaces) to show nesting. For example:

```yaml
name: Travel Agent
language: English
settings:
  greeting: Hello! How can I help you travel safely?
  topics:
    - safety-tips
    - cultural-advice
```

Notice that `settings` is indented under the main level, while `greeting` and `topics` are indented further inside `settings`. That is the core pattern: **name on the left, value on the right, separated by a colon, with indentation showing structure**. YAML files use the `.yaml` or `.yml` extension. In Copilot Studio, every part of an agent — topics, tools, triggers, and settings — is stored in YAML files.
</div>

Every Copilot Studio agent has a definition: a set of YAML files that describes the agent's personality, topics, tools, knowledge sources, and triggers. When you build an agent in the Copilot Studio web UI, you are actually editing these YAML files. The web canvas gives you a visual representation, but **the source of truth is always YAML**.

<div class="info-box note" markdown="1">
**Tip**: You can view the YAML behind any topic or tool directly from the web canvas. Open a topic and select **Open code editor** on the toolbar to see the raw YAML. This is a good way to learn the schema before moving to VS Code.
</div>

The Copilot Studio extension for Visual Studio Code gives you direct access to these agent definition files:

- **Clone** - Download an agent from the cloud to your local file system
- **Edit** - Edit topics, instructions, knowledge, and tools as structured YAML with IntelliSense
- **Apply** - Upload changes to the cloud for testing
- **Version control** - Manage agent definitions as code with Git

This is how professional agent developers work: they treat agent definitions as code, collaborate through pull requests, and iterate rapidly with AI assistance.

## 🆚 Web UI vs YAML authoring: when to use each

| Aspect | Web UI (Copilot Studio) | YAML Authoring (VS Code) |
| --- | --- | --- |
| **Best for** | Visual exploration, quick prototypes | Large-scale development, team collaboration |
| **Editing speed** | Point-and-select, one node at a time | Full-text search and bulk edits across files |
| **AI assistance** | Copilot in the canvas | GitHub Copilot Agent Mode with specialized skills |
| **Collaboration** | One author per topic | Multiple developers through Git branches |
| **Testing** | Built-in test panel | Apply changes, then test in Copilot Studio |
| **Learning curve** | Low - visual and guided | Medium - requires familiarity with YAML and VS Code |

<div class="info-box note" markdown="1">
**Tip**: You do not have to choose only one. Many teams use the web UI for early prototypes and switch to YAML authoring for production-grade development. Changes made in the web UI can be downloaded with **Get**, and local YAML changes can be uploaded with **Apply**.
</div>

## 📁 Agent definition file structure

When you clone a Copilot Studio agent, the extension creates a structured directory on your machine:

```text
my-agent/
├── actions/                  # Connectors
│   ├── DevOpsAction.mcs.yml  
│   └── GetItems.mcs.yml      
├── knowledge/files/          # Knowledge sources
│   ├── source1.mcs.yml
│   └── source2.mcs.yml
├── topics/                   # Conversation topics
│   ├── greeting.mcs.yml
│   ├── help.mcs.yml
│   └── escalate.mcs.yml
├── variables/                # Global variable definitions
│   └── UserCountry.mcs.yml
├── workflows/                # Agent tools and actions
│   └── GetDevOpsItems
│       ├── metadata.yaml
│       └── workflow.json
│   └── GetMeetings
│       ├── metadata.yaml
│       └── workflow.json
├── trigger/                  # Event triggers
│   └── welcometrigger.mcs.yml
├── agent.mcs.yml             # Main agent definition
├── icon.png                  # Agent icon
├── settings.mcs.yml          # Agent configuration settings
└── connectionreferences.mcs.yml  # Connection references used by connectors
```

**Key files to know:**

| File / Folder | Purpose |
| --- | --- |
| `agent.mcs.yml` | Main agent definition - name, description, instructions, and schema |
| `topics/` | Each `.mcs.yml` file is a topic with triggers, actions, and conversation logic |
| `actions/` | Connector tool definitions - connectors, REST APIs, MCP servers |
| `knowledge/files/` | Uploaded knowledge documents |
| `variables/` | Global variable definitions used across topics |
| `settings.mcs.yml` | Agent configuration and orchestration settings |
| `workflows/` | Agent flows used as tools |
| `trigger/` | Event-based triggers (schedules, conditions) |
| `connectionreferences.mcs.yml` | Connection references used by connectors and other actions |

## 🔧 YAML topic anatomy

Topics are the conversation building blocks of an agent. Each topic is an `AdaptiveDialog` written in YAML. Here is the anatomy of a simple greeting topic:

```yaml
kind: AdaptiveDialog
beginDialog:
  kind: OnConversationStart
  id: main
  actions:
    - kind: SendActivity
      id: sendMessage_greeting
      activity:
        text:
          - Hello, I'm {System.Bot.Name}. How can I help?
        speak:
          - Hello and thank you for calling {System.Bot.Name}.
```

**Key YAML elements:**

- **`kind`** - Node type (`AdaptiveDialog`, `SendActivity`, `Question`, `ConditionGroup`, etc.)
- **`id`** - Unique identifier for each node
- **`actions`** - Ordered list of steps the topic executes
- **`variable`** - Variable assignment using the `init:Topic.VariableName` syntax
- **`entity`** - Entity type for question nodes (for example, `BooleanPrebuiltEntity`, `StringPrebuiltEntity`)
- **`condition`** - Power Fx expression for conditional logic (starts with `=`)

### Questions and variables

```yaml
- kind: Question
  id: question_askName
  alwaysPrompt: true
  variable: init:Topic.UserName
  prompt: What is your name?
  entity: StringPrebuiltEntity
```

### Conditional logic with Power Fx

```yaml
- kind: ConditionGroup
  id: condition_checkResponse
  conditions:
    - id: condition_yes
      condition: =Topic.Continue = true
      actions:
        - kind: SendActivity
          id: sendMessage_continue
          activity: Go ahead. I'm listening.
    - id: condition_no
      condition: =Topic.Continue = false
      actions:
        - kind: SendActivity
          id: sendMessage_goodbye
          activity: Goodbye! Have a great day.
```

<div class="info-box note" markdown="1">
**Note**: Power Fx expressions in conditions must be prefixed with `=`. This tells the YAML parser that the value is an expression, not a literal string.
</div>

### Topic trigger types

Topics use different trigger types depending on when they should run:

- **`OnConversationStart`** - Runs automatically once when the conversation starts. Used for greeting messages.
- **`OnRecognizedIntent`** - Runs when the user says something that matches a trigger phrase.
- **`OnActivity`** - Runs for a specific activity type, such as `Message`. It can include a `condition` property that controls execution based on runtime state.

<div class="info-box note" markdown="1">
**Tip**: Use `OnActivity` with `condition` when a topic should run based on runtime state, such as checking a global variable, rather than based on what the user said.
</div>

## 🧪 Lab 1.1 - Set up and clone the agent

In this section, you will create a travel agent in Copilot Studio and clone it to your local machine using the VS Code extension.

### Lab 1.1: Create a solution and agent in Copilot Studio

First, create a dedicated solution and a blank travel agent. This gives you a real agent to use throughout the mission.

1. Go to [Copilot Studio](https://copilotstudio.microsoft.com).

1. Check the environment selector in the upper-right corner and make sure the **environment** is correct.

1. In the left navigation, select **...**, then select **Solutions**.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/select-solution.png' | relative_url }}" alt="Solutions menu in the left navigation" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Solutions menu</figcaption></figure>

1. Select **New Solution**.

1. Configure the solution with the following settings:

    | Setting | Value |
    | --- | --- |
    | Display Name | `Travel Agent` |
    | Publisher | Select **New publisher** |

1. Configure the new publisher:

    | Setting | Value |
    | --- | --- |
    | Display Name | `Travel Agent` |
    | Name | `TravelAgent` |
    | Prefix | `ta` |

1. In the publisher dialog, select **Save**.

1. Check **Set as your preferred solution**.

1. Select **Create**.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/new-solution.png' | relative_url }}" alt="New solution dialog with Travel Agent settings" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create a new solution</figcaption></figure>

1. Select the **Copilot Studio** logo in the upper-left corner to return to Copilot Studio.

1. In the left navigation, select **Agents**.

1. Select **+ Create blank agent**, then select **Advanced Create** at the bottom of the dialog.  
     <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/advanced-create.png' | relative_url }}" alt="Advanced Create" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Advanced Create</figcaption></figure>

1. Configure the agent with the following settings:

     | Setting | Value |
     | --- | --- |
     | Language | `English (United States)` |
     | Solution | `Travel Agent` |
     | Schema name | `ta_travelagent` |

1. Select **Confirm and create**.  
     <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/confirm-create.png' | relative_url }}" alt="Confirm agent creation" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Confirm agent creation</figcaption></figure>

1. Wait until the agent finishes provisioning — a green bar displays **Your agent has been provisioned**.  
     <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/agent-provisioned.png' | relative_url }}" alt="Agent provisioning complete" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Agent provisioning complete</figcaption></figure>

1. In the **Details** section, select **Edit** and update the name to `Travel Agent`.

1. Select **Save**.

1. On the overview page, in the **Instructions** section, select **Edit**.

1. Enter the following instructions:

     ```text
     You are a travel assistant for company employees. Help them prepare for
     business trips by providing destination-specific travel advice, safety
     information, and cultural tips. Always be helpful, concise, and professional.
     ```

1. Select **Save**.  
     <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/agent-details.png' | relative_url }}" alt="Update name and instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Update the agent name and instructions</figcaption></figure>

### Lab 1.2: Install the Copilot Studio VS Code extension

Next, install the Copilot Studio extension for VS Code.

1. Open **Visual Studio Code**. If it is not installed, download it from [code.visualstudio.com](https://code.visualstudio.com/).
1. Select the **Extensions** icon in the Activity Bar on the left, or press `Ctrl+Shift+X`.
1. In the search box, enter **ms-copilotstudio.vscode-copilotstudio**.
1. Find the extension published by **Microsoft** and select **Install**.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/install-copilot-studio-extension.png' | relative_url }}" alt="Install the Copilot Studio extension" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Install the Copilot Studio VS Code extension</figcaption></figure>
1. Wait for installation to complete. VS Code may ask you to reload.
1. Select the new **Copilot Studio** icon in the Activity Bar.
1. If the popup notification says "The extension 'Copilot Studio' wants to sign in using Microsoft", select **Allow**.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/sign-in-copilot-studio.png' | relative_url }}" alt="Sign in to Copilot Studio" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Sign in to Copilot Studio</figcaption></figure>
1. Select the account to sign in with, enter your credentials, and complete multi-factor authentication if required.
1. Return to VS Code. In the **Copilot Studio** panel, collapse the **Getting Started** section and expand the **Agents** section.
1. After a short loading delay, the list of environments and agents appears.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/environment-list.png' | relative_url }}" alt="Environment list" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Environment list in VS Code</figcaption></figure>

### Lab 1.3: Clone the agent to your local machine

1. Select the target **environment** from the dropdown menu.

1. Find **Travel Agent** in the agent list.

    <div class="info-box note" markdown="1">
    **Tip**: The environment and agent tree can time out while loading. If the list is empty or stops loading, select **Refresh** at the top of the Agents panel and try again.
    </div>

1. Right-click the agent name and select **Clone agent**.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/clone-agent.png' | relative_url }}" alt="Clone agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Clone the agent</figcaption></figure>

1. In the file picker dialog, navigate to an appropriate folder, or create a new folder such as `travel-agent`.

1. Select the **Select Folder** button.

1. Wait for the clone process to complete. A progress notification appears, followed by the success message **Agent Cloned successfully**. VS Code automatically opens the selected folder.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/cloning-agent.png' | relative_url }}" alt="Cloning agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Agent clone in progress</figcaption></figure>

1. In the VS Code **Explorer** panel, verify the cloned file structure. You should see `agent.mcs.yml`, the `topics/` folder, and other definition files.

<div class="info-box note" markdown="1">
**Note**: The clone operation downloads the full agent definition — topics, actions, knowledge, workflows, triggers, and configuration. This is your local working copy. Changes made here do not affect the cloud agent until you explicitly select **Apply**.
</div>

### Lab 1.4: Explore the agent definition

Before making changes, explore the cloned content.

1. In Explorer, open `agent.mcs.yml`. This is the main agent definition that contains the name, description, and instructions.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/agent-cloned.png' | relative_url }}" alt="Cloned agent YAML" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Cloned agent YAML</figcaption></figure>

1. Review the `topics/` folder. Each `.mcs.yml` file represents a conversation topic.

1. Open an existing topic file and examine the YAML structure. Notice the `kind`, `id`, and `actions` properties.

1. Open `settings.mcs.yml`. It contains orchestration and configuration settings.

1. Press `Ctrl+Space` inside a YAML file to view IntelliSense suggestions from the Copilot Studio extension.

1. Press `Ctrl+Shift+M` to open the **Problems** panel. The extension validates YAML in real time and marks errors with red underlines.

<div class="info-box note" markdown="1">
**Tip**: Use `Ctrl+F` to search across the full agent definition. This is much faster than navigating between topics in the web UI, especially for agents with dozens of topics and tools.
</div>

## 🧪 Lab 2.1 - Enable GitHub Copilot with Copilot Studio skills

GitHub Copilot is a powerful AI coding assistant, but by default it does not know the Copilot Studio YAML schema. Installing a specialized **agent skill** gives GitHub Copilot deep knowledge of the YAML agent definition language.

### Lab 2.1: Install and open GitHub Copilot CLI

1. Make sure you have a [GitHub Copilot subscription](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot). The **free plan** (no credit card required) works for this mission. It includes Agent mode, Copilot CLI, and 50 chat/agent requests per month. This mission uses roughly 5 to 10 requests, so the free allocation is enough. If you have already used all requests for the month, wait for the allocation to reset or upgrade to [Copilot Pro](https://github.com/features/copilot/plans), which includes unlimited chat with GPT-5 mini and 300 premium requests. Verified students and teachers can use Copilot Pro for free.

1. Open VS Code, select the **Extensions** icon (or press `Ctrl+Shift+X`), search for **github.copilot-chat**, and select **Install** if it is not already installed.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/install-github-copilot.png' | relative_url }}" alt="Install GitHub Copilot Chat" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Install GitHub Copilot Chat</figcaption></figure>

1. If prompted, **sign in** to GitHub.

1. Open a terminal from the menu bar with **Terminal** → **New Terminal** or `` Ctrl+` ``, select the **+** dropdown next to the terminal tab, and choose **GitHub Copilot CLI**. If the CLI is not installed yet, VS Code will guide you through installation. Follow the prompts. For details, see [Installing GitHub Copilot in the CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli/installing-github-copilot-in-the-cli).  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/open-cli.png' | relative_url }}" alt="Open GitHub Copilot CLI" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Open GitHub Copilot CLI</figcaption></figure>

1. You can select the full-screen icon in the terminal to expand GitHub Copilot CLI.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/expand-cli.png' | relative_url }}" alt="Expand GitHub Copilot CLI" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Expand GitHub Copilot CLI</figcaption></figure>

### Lab 2.2: Install the Copilot Studio skill

The [skills-for-copilot-studio](https://github.com/microsoft/skills-for-copilot-studio) repository includes specialized skills that teach GitHub Copilot how to author valid Copilot Studio YAML.

1. In the **GitHub Copilot CLI** terminal you opened in section 2.1, add the skill package from the marketplace:

    ```text
    /plugin marketplace add microsoft/skills-for-copilot-studio
    ```

1. Install the skill:

    ```text
    /plugin install copilot-studio@skills-for-copilot-studio
    ```

1. In the CLI terminal, enter `/plugin list` to verify the skill. You should see `copilot-studio@skills-for-copilot-studio`.

<div class="info-box note" markdown="1">
**Tip**: For additional options including cloning, pushing, testing, and troubleshooting with slash commands, see the full [setup guide](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md).
</div>

## 🧪 Lab 3.1 - Build a ConversationInit topic with AI

Use GitHub Copilot and the Copilot Studio skill to generate a `ConversationInit` topic. This topic detects the user's country from their time zone and personalizes the travel experience.

### Lab 3.1: Generate the ConversationInit topic

1. In the **GitHub Copilot CLI** terminal you opened in section 2.1, enter the following prompt:

    ```text
    /agent
    ```

1. GitHub Copilot asks you to **Select Agent**. Select **Copilot Studio Author**.

1. When GitHub Copilot makes changes, it asks for confirmation when it creates and accesses files. To run in Autopilot mode, use `shift + tab` to switch to **Autopilot**.

1. Enter the following prompt:

    ```text
    Create a ConversationInit topic that detects the user's country from
    System.Conversation.LocalTimeZone using AnswerQuestionWithAI, shows them
    the result, and asks them to confirm or correct it using AnswerQuestionWithAI. Store the confirmed
    country in Global.UserCountry. Update the agent instructions to use
    {Global.UserCountry} for tailored travel advice. Be sure to initialize the value of Global.UserCountry to be DEFAULT inside the ConversationStart Topic.
    ```

1. GitHub Copilot asks whether you trust the current folder. Select **Yes, and add these directories to the allowed list**.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/trust-directory.png' | relative_url }}" alt="Trust directory" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Trust directory</figcaption></figure>

1. If you selected Autopilot mode, you are prompted to enable all permissions.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/enable-autopilot.png' | relative_url }}" alt="Enable Autopilot mode" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Enable Autopilot mode</figcaption></figure>

1. Wait for GitHub Copilot to generate the YAML. It creates a new `.mcs.yml` file in the `topics/` folder, edits `agent.mcs.yml`, and adds a new variable definition.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/agent-complete.png' | relative_url }}" alt="Completed agent with edited files" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Agent files generated by GitHub Copilot</figcaption></figure>

1. Select the Copilot Studio extension, which shows the number of changes made by GitHub Copilot. Review the generated topic file and verify its structure.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/review-changes.png' | relative_url }}" alt="Review changes" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Review changes</figcaption></figure>

1. Example generated content:

    ```yaml
    mcs.metadata:
      componentName: Conversation Init
      description: Detects user's country from timezone using AI and confirms with the user.
    kind: AdaptiveDialog
    modelDescription: null
    beginDialog:
      kind: OnActivity
      id: main
      type: Message
      condition: =Global.UserCountry = "DEFAULT" || IsBlank(Global.UserCountry)
      actions:
        - kind: AnswerQuestionWithAI
          id: answerWithAI_Jk7mPq
          userInput: ="The user's local timezone is " & System.Conversation.LocalTimeZone & ". Based on this timezone, what country is the user most likely located in? Respond with ONLY the country name, nothing else."
          autoSend: false
          variable: Topic.DetectedCountry
        - kind: SendActivity
          id: sendMessage_Xn4wBt
          activity:
            text:
              - "Based on your timezone ({System.Conversation.LocalTimeZone}), I believe you're located in {Topic.DetectedCountry}."
        - kind: Question
          id: question_Rm8kLp
          variable: init:Topic.UserResponse
          prompt: Is this correct? If not, please tell me your actual country.
          entity: StringPrebuiltEntity
        - kind: SetVariable
          id: setVariable_Hp6jKw
          variable: Global.UserCountry
          value: =Topic.ConfirmedCountry
        - kind: SendActivity
          id: sendMessage_Qv9dNw
          activity:
            text:
              - "Great! I'll tailor my travel advice for {Global.UserCountry}. How can I help you today?"
    ```

1. Check the **Problems** panel with `Ctrl+Shift+M` to verify that there are no YAML validation errors. If there are errors, ask GitHub Copilot to fix them.

### Lab 3.2: Review the updated agent instructions

GitHub Copilot should also have updated the `agent.mcs.yml` file so the instructions include a `{Global.UserCountry}` reference.

1. Open `agent.mcs.yml` in Explorer.
1. In the `instructions` section, find the `{Global.UserCountry}` reference.
1. This variable reference ensures the instructions are tailored to the current user's location.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/agent-instructions-updated.png' | relative_url }}" alt="Updated agent instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Updated agent instructions</figcaption></figure>

## 🧪 Lab 4.1 - Add knowledge sources and guardrails

### Lab 4.1: Add knowledge sources through AI

1. In the **GitHub Copilot CLI** terminal you used in section 3, or reopened from section 2.1 if you closed it, select the **Copilot Studio Author** agent again with `/agents`.

1. Enter the following prompt:

    ```text
    Add public website knowledge sources for Lonely Planet, TripAdvisor,
    US State Department travel advisories (travel.state.gov), UK government
    foreign travel advice, and CDC travel health information. Add guardrails
    to the agent instructions: travel topics only, no bookings, no medical
    advice, cite sources for safety information.
    ```

1. When the agent finishes, review the changes GitHub Copilot proposes. It should modify the knowledge configuration files and update the agent instructions.  
   <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/knowledge-added.png' | relative_url }}" alt="Knowledge added" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Knowledge sources added</figcaption></figure>

1. Browse the changes in the agent `yaml` files to see what was modified.

## 🧪 Lab 5.1 - Apply changes and test

### Lab 5.1: Preview and apply changes

The Copilot Studio extension provides three synchronization operations:

| Operation | Direction | Description |
| --- | --- | --- |
| **Preview** | Cloud → Local | Check remote changes without modifying local files |
| **Get** | Cloud → Local | Download and apply remote changes, including conflict resolution |
| **Apply** | Local → Cloud | Upload local changes to Copilot Studio (does not publish) |

1. Select the **Copilot Studio** icon in the Activity Bar.
1. In the **Agent Changes** panel, select **Preview** to check whether there are remote changes since the clone.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/preview-changes.png' | relative_url }}" alt="Preview changes" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview changes</figcaption></figure>
1. The extension reports **Successfully completed previewing changes**. If there are remote changes, select **Get** to download them and resolve conflicts.
1. Select **Apply changes**, then select the agent name.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/apply-changes.png' | relative_url }}" alt="Apply changes" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Apply changes</figcaption></figure>
1. Wait for the apply operation to complete. A success notification appears: **Successfully completed applying changes**.

<div class="info-box note" markdown="1">
**Important**: The **Apply** operation uploads changes to the live agent definition, but it does **not publish** the agent. After applying, you can test immediately in the Copilot Studio test panel. To make the agent available to end users in channels, you still need to select **Publish** in Copilot Studio.
</div>

### Lab 5.2: Test the agent in Copilot Studio

1. Go to [Copilot Studio](https://copilotstudio.microsoft.com).

1. Reopen **Travel Agent**.

1. Select the **Test your agent** panel on the right.

1. Select the **+** icon to start a new conversation.

1. Ask a travel-related question:

    ```text
    I'm planning a business trip to Tokyo next month. What should I know about safety and cultural etiquette?
    ```

1. Confirm that the agent provides destination-specific advice, cites sources, and follows the guardrails.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/test-agent.png' | relative_url }}" alt="Test the updated agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Agent test result</figcaption></figure>

<div class="info-box note" markdown="1">
**Tip**: If the agent does not work as expected, return to VS Code, adjust the YAML, and select **Apply** again. This fast cycle of repeatedly editing and testing multiple related source files at once is one of the key tactical advantages of YAML authoring.
</div>

## ✅ Mission complete

Congratulations, agent — **Operation YAML Specialist** is complete! You have now mastered these skills:

✅ **Local agent development**: You cloned a Copilot Studio agent to your local machine and worked directly with YAML definition files in VS Code.

✅ **YAML authoring**: You understood the agent definition file structure — topics, actions, knowledge, variables, triggers, and configuration.

✅ **AI-assisted authoring**: You used GitHub Copilot with Copilot Studio skills to quickly generate and refine agent YAML.

✅ **Knowledge and guardrails**: You added public website knowledge sources and safety guardrails to shape agent behavior.

✅ **Synchronization workflow**: You applied local changes to Copilot Studio and tested the agent end to end.

## 📚 Tactical resources

📖 [Overview of the Copilot Studio VS Code extension](https://learn.microsoft.com/microsoft-copilot-studio/visual-studio-code-extension-overview)

📖 [Install and configure the VS Code extension](https://learn.microsoft.com/microsoft-copilot-studio/visual-studio-code-extension-install-configure)

📖 [Clone an agent in VS Code](https://learn.microsoft.com/microsoft-copilot-studio/visual-studio-code-extension-clone-agent)

📖 [Edit agent components in VS Code](https://learn.microsoft.com/microsoft-copilot-studio/visual-studio-code-extension-edit-agent-components)

📖 [Synchronize changes](https://learn.microsoft.com/microsoft-copilot-studio/visual-studio-code-extension-synchronization)

📖 [Use the YAML code editor in topics](https://learn.microsoft.com/microsoft-copilot-studio/guidance/topics-code-editor)

🔗 [Skills for Copilot Studio - GitHub repository](https://github.com/microsoft/skills-for-copilot-studio)

🔗 [Copilot Studio extension - VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-CopilotStudio.vscode-copilotstudio)

## 🏅 Claim your completion badge

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/YAML_Specialist_Badge.png' | relative_url }}" alt="YAML Specialist Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>YAML Specialist Badge</figcaption></figure>

Congratulations, agents — mission accomplished! Now it is time to claim your badge.

Submit the badge request form and answer all required questions:

[https://aka.ms/agent-academy-special-ops/yaml-specialist/form](https://aka.ms/agent-academy-special-ops/yaml-specialist/form)

After your submission is reviewed, you will receive an email from Global AI Community with instructions to claim your badge.

<div class="info-box note" markdown="1">
**Tip**: If you do not see the email, check your spam or junk folder.
</div>
