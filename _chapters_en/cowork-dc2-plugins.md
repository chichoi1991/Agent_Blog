---
layout: chapter
lang: en
date: 2026-08-05
title: "Lab CWRK2 — Create your first Cowork plugin"
short_title: "Create a Cowork plugin"
description: "Create a Copilot Cowork plugin package that contains multiple skills and an MCP connector, automate packaging, and deploy it from the Microsoft 365 admin center."
order: 2
category: cowork
parent: "cowork-devcamp"
tags: ["Copilot Cowork", "Plugins", "MCP", "manifest.json"]
---

<div class="info-box note" markdown="1">

**▶ One-line summary** — A Cowork plugin is a **Microsoft 365 app package (`.zip`)** that contains `manifest.json` (required), zero or more skills (`SKILL.md`), and optional remote MCP connectors. In this lab, you will create a plugin with three skills and one connector, package it with `npm run package`, and deploy it from the admin center.
</div>

> **Translated article** — This article is based on [Copilot Developer Camp — Lab CWRK2](https://microsoft.github.io/copilot-camp/pages/copilot-cowork/02-cowork-plugins/) from Microsoft. The original wording takes precedence. We recommend completing [Lab CWRK1]({{ '/en/chapters/cowork-dc1-skills/' | relative_url }}) first.

In this lab, you will learn how Copilot Cowork plugins extend Cowork with **packaged skills and connectors**, and how to build and deploy a plugin yourself.

At a high level, a Cowork plugin is a Microsoft 365 app package (`.zip`) that can include:

- A **required manifest** (`manifest.json`) — describes how Cowork loads and uses plugin assets
- **Zero or more custom skills** (`SKILL.md` files)
- An **optional remote MCP server connector**

By the end of this lab, you will be able to:

- Understand what a Cowork plugin is and where it fits in the Cowork experience
- Explore available Microsoft and partner plugins and how users/admins manage them
- Build a custom plugin package that contains multiple skills and an MCP connector
- Automate packaging with `package.json` scripts
- Deploy the plugin from the Microsoft 365 admin center

---

## Exercise 1: Understand the plugin model in Copilot Cowork

In this exercise, you will build a practical mental model of plugins and how reusable skills are combined with optional connectors.

### Step 1: Components of a Cowork plugin

Cowork plugins are deployed as Microsoft 365 app packages and can include:

- **Skills** — instruction-based workflows that tell Cowork how to execute domain tasks
- **Connectors** — remote MCP endpoints that expose tools and data

This enables a flexible packaging model.

| Packaging type | Description |
|-------------|------|
| **Skills only** | Provides workflow guidance without an external system |
| **Connector only** | Provides only external tools that built-in skills can use |
| **Combined** | A custom skill orchestrates external tools |

This plugin model aligns with the Microsoft 365 app ecosystem and follows the **same enterprise governance patterns** used for Teams apps and agents.

### Step 2: Compare plugin categories and management boundaries

The Copilot Cowork plugin catalog can include:

- **Microsoft plugins** (for example, Dynamics 365 and Fabric IQ scenarios)
- **Partner plugins** (third-party publishers)
- **Custom plugins** (built by your organization)

Use this strategy:

- If an existing use case is already covered, start with **Microsoft and partner plugins**
- If you need company-specific process logic, terminology, or integrations, build a **custom plugin**

Also keep the management boundaries in mind.

| Actor | What they can do |
|------|---------------|
| **User** | Discover and acquire allowed plugins, enable/disable them per session, remove plugins they acquired directly |
| **Admin** | Control availability, deployment scope, and governance from the Microsoft 365 admin center |

For plugins that require connector authentication, **each user must complete the first-time sign-in/consent flow** themselves.

---

## Exercise 2: Review plugin structure and design decisions

In this exercise, you will analyze the architecture of a [real plugin example](https://github.com/PaoloPia/CopilotDevCamp-for-cowork) and understand why packaging multiple skills with a connector is valuable.

### Step 1: Production-grade plugin layout

Use the following folder model as the baseline for every plugin.

```text
plugin-root-folder/
├── manifest.json
├── color.png
├── outline.png
└── skills/
    ├── skill-01/
    │   ├── references/
    │   │   ├── reference-file-01.md
    │   │   └── reference-file-02.md
    │   ├── scripts/
    │   │   └── script-file-01.py
    │   └── SKILL.md
    ├── skill-02/
    │   └── SKILL.md
    ...
    └── skill-NN/
        └── SKILL.md
```

The plugin you will create in this lab **processes content from Copilot Dev Camp labs and creates a PowerPoint presentation or Word document for a specific lab**. It also uses the **Microsoft Learn MCP server** (`https://learn.microsoft.com/api/mcp`) to provide technical information about Microsoft Foundry.

The plugin consists of three skills.

| Skill | Role | Trigger examples |
|------|------|-------------|
| **foundry-research** | Researches and summarizes information about Microsoft Foundry documentation, architecture, models, and deployment options | "research Microsoft Foundry", "Foundry architecture", "how to deploy with Foundry" |
| **dev-camp-deck** | Creates a professional PowerPoint presentation for a Copilot Dev Camp lab/topic, including speaker notes | "create a presentation on", "make a deck about", "generate slides about" |
| **dev-camp-document** | Authors a Word document for a Copilot Dev Camp lab/topic, such as a one-pager or detailed guide | "write a document about", "create a guide for", "author a one-pager on" |

The plugin folder structure is as follows.

```text
CopilotDevCamp-for-cowork/
├── manifest.json
├── color.png
├── outline.png
├── package.json
└── skills/
    ├── foundry-research/
    │   └── SKILL.md
    ├── dev-camp-deck/
    │   └── SKILL.md
    └── dev-camp-document/
        └── SKILL.md
```

This structure makes the plugin **composable and maintainable**. Each skill has a focused purpose, while the manifest and scripts provide shared packaging and deployment metadata.

### Step 2: Value of multiple skills and connectors

Bundling several related skills into one plugin provides these benefits:

- **Modularity** — separate workflows for research, slide creation, and document authoring
- **Reusability** — one plugin package handles multiple user intents in the same domain
- **Consistency** — shared naming, metadata, and publishing lifecycle
- **Scalability** — gradually enrich skills with accompanying files such as `references/` and `scripts/`

As a skill grows, keep the **main `SKILL.md` focused on activation conditions and workflow**, and move deeper knowledge into companion files (`references/*.md`, `scripts/*`) so prompts remain efficient and maintainable.

Connectors let skills **call tools on remote MCP servers** at runtime. This is the point where you move from static instructions to live, data-driven execution.

Common authentication types include:

| `authorization.type` | Description |
|----------------------|------|
| `None` | Access to anonymous/public endpoints |
| `OAuthPluginVault` | OAuth 2.0 plus secure credential store reference |
| `ApiKeyPluginVault` | API key approach plus stored secure reference |

Choose based on security level and data sensitivity. **In production, authenticated connectors are the common pattern**.

---

## Exercise 3: Create a custom plugin package

In this exercise, you will create a plugin similar to the Copilot Dev Camp sample: three skills plus one connector. Create a new `CopilotDevCamp-for-cowork` folder in the file system and open it with Visual Studio Code or your preferred editor.

### Step 1: Author a manifest with skills and connectors

Create `manifest.json` in the plugin root. Use a schema compatible with Cowork plugin packaging and include the `agentSkills` and `agentConnectors` sections.

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.28/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview",
  "version": "1.5.0",
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "developer": {
    "name": "Paolo Pialorsi",
    "websiteUrl": "https://github.com/PaoloPia",
    "privacyUrl": "https://github.com/PaoloPia",
    "termsOfUseUrl": "https://github.com/PaoloPia"
  },
  "name": {
    "short": "Copilot Dev Camp",
    "full": "Copilot Dev Camp for Cowork - Copilot Dev Camp and Microsoft Foundry Content Creation & Research"
  },
  "description": {
    "short": "Copilot Dev Camp and Microsoft Foundry presentations and documentation",
    "full": "Comprehensive Cowork plugin for Copilot Dev Camp with skills to research Microsoft Foundry documentation, create professional PowerPoint presentations on Dev Camp topics, and author Word documents with technical guides and one-pagers. Powered by the Microsoft Learn MCP Server."
  },
  "icons": {
    "color": "color.png",
    "outline": "outline.png"
  },
  "accentColor": "#000000",
  "agentSkills": [
    { "folder": "./skills/foundry-research" },
    { "folder": "./skills/dev-camp-deck" },
    { "folder": "./skills/dev-camp-document" }
  ],
  "agentConnectors": [
    {
      "id": "microsoft-learn-mcp",
      "displayName": "Microsoft Learn MCP Server",
      "description": "Access to Microsoft's official documentation for research and content generation. Provides search and fetch capabilities for Microsoft Learn articles and code samples.",
      "toolSource": {
        "remoteMcpServer": {
          "mcpServerUrl": "https://learn.microsoft.com/api/mcp",
          "authorization": {
            "type": "None"
          }
        }
      }
    }
  ]
}
```

- `agentSkills` — defines the **skills** connected to the custom plugin
- `agentConnectors` — defines the **MCP servers** and authentication model used by the plugin

<div class="info-box warning" markdown="1">

**Required validation checks**

- Each `agentSkills[].folder` path must actually exist inside the package
- Each skill folder must contain `SKILL.md`
- The `name` in skill front matter must be **kebab-case** and **match the folder name**
- Connector `id` values must be **unique**
</div>

You also need to prepare the app package icons, `color.png` and `outline.png`. You can download them from the following URLs.

- [color.png](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/CopilotDevCamp-for-cowork/color.png)
- [outline.png](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/CopilotDevCamp-for-cowork/outline.png)

You may replace the `developer` section in the manifest with your own information.

### Step 2: Create three skill folders and SKILL.md files

Create the following folders under `skills/`.

- `foundry-research`
- `dev-camp-deck`
- `dev-camp-document`

In each `SKILL.md`, follow these rules:

- Add **valid YAML front matter** with `name` and `description`
- Include **explicit trigger phrases** in the description (`Use when user asks to ...`)
- Define a **clear workflow and output format**
- If a connector is required, **reference the tool explicitly**

You can copy the three skill contents from:

- [foundry-research](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/CopilotDevCamp-for-cowork/skills/foundry-research/SKILL.md)
- [dev-camp-deck](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/CopilotDevCamp-for-cowork/skills/dev-camp-deck/SKILL.md)
- [dev-camp-document](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/CopilotDevCamp-for-cowork/skills/dev-camp-document/SKILL.md)

This design improves Cowork's **activation accuracy** and makes results more consistent.

### Step 3: (Optional) Add companion references and scripts

For complex skills, keep `SKILL.md` concise and add these supporting files:

- `references/*.md` — domain-specific details and standards
- `scripts/*` — reusable utilities

Then reference those files from the skill body so Cowork loads them when needed. This pattern improves maintainability and lets you evolve the plugin without rewriting every skill.

---

## Exercise 4: Automate packaging and validate the plugin

In this exercise, you will add packaging automation and create the plugin `.zip`.

### Step 1: Add a packaging script to package.json

Add `package.json` to the plugin root and define scripts like these.

```json
{
  "name": "copilot-dev-camp-cowork-plugin",
  "version": "1.0.0",
  "description": "Copilot Dev Camp plugin for Cowork - Research Microsoft Foundry, create presentations and documentation",
  "main": "manifest.json",
  "scripts": {
    "package": "PowerShell -Command \"Compress-Archive -Path manifest.json, color.png, outline.png, skills -DestinationPath copilot-dev-camp.zip -Force; Write-Host 'Plugin packaged: copilot-dev-camp.zip'\"",
    "package:unix": "zip -r copilot-dev-camp.zip manifest.json color.png outline.png skills/"
  },
  "license": "MIT"
}
```

This enables **consistent, repeatable packaging** across environments.

### Step 2: Package the plugin

Run the packaging command from the plugin root.

```powershell
# Windows
npm run package
```

```bash
# macOS / Unix
npm run package:unix
```

**Expected result** — A `.zip` package is created at the root level containing `manifest.json`, the icons, and the full `skills/` folder.

If needed, open the ZIP contents before upload to prevent structure-related validation failures.

### Step 3: Validate common packaging issues

Before deployment, check the following:

- Does each referenced folder contain `SKILL.md`?
- Is the YAML front matter valid?
- Does each `name` value match the skill folder name?
- Is the connector URL **HTTPS**, and are authentication settings consistent?
- Are the icon file names and sizes correct (`color.png`, `outline.png`)?

---

## Exercise 5: (Optional) Vibe-code the full plugin with GitHub Copilot

In this exercise, you will use GitHub Copilot to scaffold and complete the plugin with **one high-quality prompt**. This is an alternative path that replaces Exercises 3 and 4.

### Step 1: Use the vibe-coding prompt

If you prefer a prompt-driven approach, you can ask GitHub Copilot in **Agent mode** in Visual Studio Code to scaffold the full plugin structure, create skills, prepare packaging scripts, and draft deployment documentation.

Use the following prompt exactly as written.

```text
# Vibe Coding Prompt for GitHub Copilot

Use this prompt as-is in GitHub Copilot Chat (Agent mode) to scaffold and complete the plugin.

## Prompt

You are GitHub Copilot acting as a senior Microsoft 365 + Copilot Cowork plugin engineer.

Goal: Build a **new Copilot Cowork plugin** in this repository, following the same project structure and engineering style as:
- https://github.com/PaoloPia/CopilotDevCamp-for-cowork

and grounded in official guidance from:
- https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-plugin-development

### Mandatory requirements

1. Implement plugin capabilities
- Add a skill with name `foundry-research` with support for **Microsoft Foundry** content (both documentation and samples) using this MCP server:
	- https://learn.microsoft.com/api/mcp
- Add a skill with name `dev-camp-deck` to create a **PowerPoint presentation** about one Copilot Dev Camp lab/topic.
- Add a skill with name `dev-camp-document` to author a **Word document** about one Copilot Dev Camp lab/topic.
- Use Copilot Dev Camp content as source context:
	- https://microsoft.github.io/copilot-camp/
- Register the MCP server https://learn.microsoft.com/api/mcp in the manifest, with anonymous access

2. Keep repository conventions
- Reuse the same folder organization patterns, naming style, and manifest conventions used by this repo.
- Do not break existing files unless replacement is necessary.
- Prefer additive changes and keep the plugin maintainable.

3. Update docs and ignores
- Update `README.md` with:
	- Plugin overview and feature list
	- Skills documentation and examples
	- Packaging process
	- Deployment process for Cowork
	- Any prerequisites and environment variables
- Update `.gitignore` as needed for generated artifacts and packaging outputs.

4. Packaging automation
- Create or update `package.json` scripts so packaging can be run with a single command.
- The packaging process must generate a `.zip` file suitable for upload in Cowork.
- Include scripts for clean/build/package where appropriate.

5. Icons generation
- Generate plugin icons required by the plugin structure:
	- `color.png`
	- `outline.png`
- Visual requirements:
	- Subject: a **book inside/with a camp tent** motif
	- Tent color: **purple**
	- Book color: **white**
	- Background: **black**
- Ensure dimensions and style are compliant with Cowork plugin requirements.

### Implementation instructions

- First inspect current workspace files to align with existing conventions.
- If the repo already contains reusable scripts/utilities (for example icon generation), reuse them.
- Create or update the plugin manifest and any skill metadata files needed for Cowork.
- For the Foundry feature:
	- Implement a skill/integration that can retrieve or reference both docs and samples via the MCP endpoint.
	- Add clear prompt instructions and usage examples.
- For the PowerPoint and Word skills:
	- Create dedicated skill folders/files with clear instructions, expected inputs, and generated outputs.
	- Ensure prompts are practical for Copilot users and tied to Copilot Dev Camp topics.

### README packaging + deployment documentation (must include)

Add a concise section with:
- Prerequisites
- Install dependencies
- Build/package commands
- Output zip path
- How to upload/install in Copilot Cowork
- How to validate skills after deployment

### Quality bar

- Keep changes production-quality and self-consistent.
- Validate JSON/manifest files.
- Ensure all referenced files exist.
- Ensure scripts run on Windows PowerShell and common cross-platform shells when feasible.

### Deliverables checklist (must complete all)

- Updated manifest and skill definitions
- Foundry MCP support (docs + samples)
- PowerPoint skill
- Word skill
- Updated `README.md`
- Updated `.gitignore`
- Working `package.json` packaging scripts
- Generated `color.png` and `outline.png`
- A final short summary listing all changed files and exact package command(s)

### Execution mode

Proceed autonomously: inspect, implement, run packaging command, verify outputs, then summarize.
If a required file is missing, create it following this repo's conventions.
If assumptions are required, choose sensible defaults and document them in README.
```

When generation is complete, review `manifest.json`, validate the front matter in each `SKILL.md`, then run packaging to create the final plugin ZIP.

---

## Exercise 6: Deploy and test from the Microsoft 365 admin center

In this exercise, you will upload the plugin package and validate end-to-end behavior in Cowork.

### Step 1: Upload the plugin from the admin center

1. Open the **Microsoft 365 admin center**
2. Go to **Agents**
3. Select **All Agents**
4. Select **Upload Agent**
5. Upload the plugin `.zip` package

After upload, confirm that the package metadata and availability scope match your target users.

Admins decide the rollout using one of these options:

- Make it available to all users
- Make it available only to specific users/groups
- Block it if it is not approved

Remember that users can **turn active plugins on and off per session**, while admin deployment controls **tenant availability and lifecycle**.

### Step 2: Enable and validate plugin behavior in Cowork

Open Copilot Cowork and confirm the following:

- Does the plugin appear in the plugin inventory?
- Can you install and activate it from the plugin detail page?
- Are the **three related skills activated** by the relevant prompts?
- Is the connector discovered, and does it request authentication if needed? (The MCP server in this sample is a public server with anonymous access.)

Run scenario-based tests.

```text
Research Microsoft Foundry deployment options
```

```text
Create a presentation about Copilot Dev Camp lab: https://microsoft.github.io/copilot-camp/pages/extend-m365-copilot/08-mcp-server/
```

```text
Write a one-pager about Copilot Dev Camp lab: https://microsoft.github.io/copilot-camp/pages/extend-m365-copilot/11-mcp-app/
```

<div class="info-box warning" markdown="1">

**Caution** — Testing this plugin's custom skills in Copilot Cowork **consumes Copilot Credits**.
</div>

---

## 🎉 Congratulations!

You have completed **Lab CWRK2 — Create your first Cowork plugin**!

In the next lab, you will add **Entra SSO authentication** to a Cowork plugin.

👉 [Lab CWRK3 — Add Entra SSO authentication to a Cowork plugin]({{ '/en/chapters/cowork-dc3-plugins-sso/' | relative_url }})

---

## 📚 Resources

- 📖 [Cowork plugin development — Microsoft Learn](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-plugin-development)
- 💾 [Sample plugin repository (PaoloPia/CopilotDevCamp-for-cowork)](https://github.com/PaoloPia/CopilotDevCamp-for-cowork)
- 💾 [Source in copilot-camp (src/cowork/CopilotDevCamp-for-cowork)](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/CopilotDevCamp-for-cowork)
- 🏕️ [Original: Copilot Developer Camp — Lab CWRK2](https://microsoft.github.io/copilot-camp/pages/copilot-cowork/02-cowork-plugins/)
