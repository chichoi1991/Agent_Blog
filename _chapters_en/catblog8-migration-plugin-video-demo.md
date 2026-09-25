---
layout: "chapter"
lang: en
date: 2026-07-14
title: "Video Demo: Migrating a Classic Agent to Modern Orchestration"
short_title: "Classic-to-Modern Migration Video"
description: "Watch an end-to-end video walkthrough of migrating a classic agent to modern orchestration using the Copilot Studio plugin and GitHub Copilot CLI."
order: 8
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/migration-plugin-video-demo/"
source_author: "giorgioughini"
source_published: "2026-07-14"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/migration-plugin-video-demo/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [Video Demo: Migrating a Classic Agent to Modern Orchestration](https://microsoft.github.io/mcscatblog/posts/migration-plugin-video-demo/) by giorgioughini (@giorgioughini) on [The Custom Engine](https://microsoft.github.io/mcscatblog/) (2026-07-14). The original wording takes precedence.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/migration-plugin-video-demo/header.png' | relative_url }}" alt="Migrating a classic Copilot Studio travel agent to modern orchestration with GitHub Copilot CLI" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

> **Heads up:** This is a **video-first** post. The video starts with the plugin already installed, then shows the full migration process and reviews the resulting modern agent.

Migrating a classic agent is not just a matter of copying existing components into a new format. Modern orchestration uses a different component model, so the real challenge is preserving each capability while choosing the modern architecture that best fits it.

The earlier [new orchestrator resources post](https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/) introduced the migration capability in the [Copilot Studio plugin](https://github.com/microsoft/copilot-studio-plugin). This companion video shows that capability working end to end with [GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli).

## What the demo covers

The video runs for roughly 10–20 minutes and follows one fictional travel agency scenario.

1. **Tour the classic agent.** This agent includes a child agent that recommends Italian cities and travel destinations, plus capabilities for ordering pizza and requesting a refund when an order is wrong or missing.
2. **Run the full migration.** The demo invokes the migration command and explains every step as the plugin retrieves the classic agent, analyzes its capabilities, proposes a modern design, and generates the migrated agent.
3. **Inspect the result.** It opens the generated modern agent, reviews the ported Skills and tools, and checks where each original capability was mapped.

If you watched the earlier [video about authoring an agent with the plugin](https://microsoft.github.io/mcscatblog/posts/claude-copilot-skills-copilot-studio-plugin-demo/), this video is the next step. Instead of starting from an empty agent, it starts with an existing classic implementation and redesigns it for modern orchestration.

## Watch the migration video

- [Play the video](https://github.com/GiorgioUghini/WebVideos/releases/download/video-6-1.0.0/Video.Project.23.mp4)
> 🖼️ (Original image: https://microsoft.github.io/mcscatblog/assets/posts/migration-plugin-video-demo/header-video.png)

## The most important architectural choice

In this migration, the classic travel-advice child agent becomes a **Skill** in the modern agent. That is the best fit the plugin selected for this specific capability; it is not a universal rule that every child agent should always become a Skill.

The plugin migrates **capabilities and outcomes**, not components one for one. It analyzes what each capability actually does and proposes which unit of responsibility fits best in the modern model. Depending on the scenario, a child agent might require a different optimal design.

That distinction matters. A literal structural copy can preserve the old design without taking advantage of the new orchestration model. A capability-led migration creates room to simplify the design and reassign each responsibility to a more appropriate component.

## Try it yourself

The video starts after setup. To follow along, install [Power Platform CLI](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction) newer than version 2.9.3, then add the latest plugin to your AI coding assistant.

```text
/plugin marketplace add microsoft/copilot-studio-plugin
/plugin install mcs-assistant@copilot-studio-plugin
```

Use a capable AI model and run the migration with your own environment, agent, and tenant IDs.

```text
/mcs-assistant:migrate Migrate this agent to modern orchestration: https://copilotstudio.microsoft.com/environments/<ENV_ID>/bots/<BOT_ID> from tenant <TENANT_ID>
```

For background on how this terminal-based approach began, see [Skills for Copilot Studio](https://microsoft.github.io/mcscatblog/posts/skills-for-copilot-studio/). For the latest commands and prerequisites, always use the [plugin README](https://github.com/microsoft/copilot-studio-plugin#readme) as the source of truth.

## Inspect, test, and validate

> This plugin is an experimental research project, not an officially supported Microsoft product. In the demo, the migration worked without manual correction, but that is not guaranteed. Do not blindly trust the output; always review it and make any necessary adjustments.

Treat the migration output as a strong first draft. Compare the modern agent's behavior with the classic agent, review every generated Skill and tool, test both expected and unexpected inputs, and confirm that the safeguards required for actions are correct.

## Why this matters

The hardest part of migration is deciding what shape the modern agent should take. The plugin quickly reduces repetitive mechanical work and proposes a coherent starting architecture, while keeping the final design visible for human review. That gives makers more time to focus on behavior quality and validation instead of rebuilding every capability by hand.

Which capability in your classic agents would you most like to redesign first for modern orchestration?