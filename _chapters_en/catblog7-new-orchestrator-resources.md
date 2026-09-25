---
layout: "chapter"
lang: en
date: 2026-07-07
title: "New Orchestrator, New Rules? CAT's Got You"
short_title: "New Orchestrator Resource Guide"
description: "Introducing three resources to help you understand the concepts in the new Copilot Studio experience, see them in action, and migrate existing classic agents."
order: 7
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/"
source_author: "giorgioughini, roels, adilei, henryjammes, chrisgarty, lewisdoesdev, adrianatruji"
source_published: "2026-07-07"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [New Orchestrator, New Rules? CAT's Got You](https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/) by giorgioughini, roels, adilei, henryjammes, chrisgarty, lewisdoesdev, adrianatruji on [The Custom Engine](https://microsoft.github.io/mcscatblog/) (2026-07-07). The original wording takes precedence.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/new-orchestrator-resources/header.png' | relative_url }}" alt="Three resources for new modern agents: migration, samples, and a deep-dive deck on the new stack" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

The new Copilot Studio experience and the orchestration stack underneath it are a big shift. It is a new paradigm for agents and workflows. Agents are far more adaptive and sophisticated, and workflows let you build automated processes on a visual canvas with much more control over which steps are handled by AI. That is a lot of new capability, and it changes how you design.

New design space, new stack, new questions: What changed? What should you build? What happens to existing classic agents? CAT released three resources to answer these questions. Here is how to use each one.

| What you want to do | Resource to use |
| --- | --- |
| Understand and explain what changed | **[Deep Dive deck](https://aka.ms/CopilotStudioDeepDiveDeck)** |
| See it working in practice | **[mini-site](https://aka.ms/MCSTechGuide)** |
| Migrate classic agents | **[plugin](https://github.com/microsoft/copilot-studio-plugin)** |

## Understand it: the Technical Deep Dive deck

**Use it when:** you need to learn, or explain to others, what changed and why. Download the [Copilot Studio Technical Deep Dive deck](https://aka.ms/CopilotStudioDeepDiveDeck). It is built for agent and workflow builders and architects, and it works more as a decision framework than a feature tour. Specifically, it covers:

- **Where to build what** — agents vs. workflows, and the role of each component
- **How to build modern agents and workflows**
- **How to migrate from classic to modern** — without simply porting the old design
- An honest assessment of what has improved and what is not supported yet

**The one idea to take away:** every behavior belongs in the smallest component that makes it reliable and inspectable. Instructions carry what is always true, Knowledge carries searchable facts, Tools carry system actions, Memory carries persistent context, Skills carry situational procedures, and connected agents own real specialist domains.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/new-orchestrator-resources/componentslide.png' | relative_url }}" alt="A slide from the deep-dive deck showing the new component model and the roles of instructions, knowledge, tools, memory, Skills, and connected agents" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>A slide from the Technical Deep Dive deck showing the new component model — instructions, knowledge, tools, memory, Skills, and connected agents each have their own job.</figcaption>
</figure>

## See it: the mini-site and samples

**Use it when:** you are ready to move from "I understand the slide" to "show me it running." Open the [technical guide mini-site](https://aka.ms/MCSTechGuide), read the building blocks, run the scenario transcripts, then download the solution and deploy it into your own Power Platform environment.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/new-orchestrator-resources/minisite.png' | relative_url }}" alt="The mini-site homepage, built around the BlastBox Omega sample and two scenarios" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>The mini-site homepage — built around the BlastBox Omega sample and two scenarios.</figcaption>
</figure>

This is a real, deployable sample, not screenshots with a story. **BlastBox Omega**, a retro-future game store run by agents, shows what the new experience can actually do, things a slide can only promise: agents that reason across multiple turns, delegate to specialists, take real actions, and produce actual deliverables. Two scenarios make that concrete:

- **Self-Serve Card Reissue** — An agent handles a member request end to end, gating a real write action behind an identity check and returning a generated file.
- **Block Party Trade-Up** — The flagship scenario, where a parent agent coordinates specialist agents to untangle a complex, multi-part request and settle it with a downloadable document.

The real lesson is seeing where each responsibility lives: specialist reasoning in connected agents, actions in tools, repeatable procedures in Skills, exact math in code. A modern agent should not be one instruction blob with 43 tools and a prayer.

## Migrate it: the Copilot Studio plugin

**Use it when:** you have a classic agent and want a starting point for a modern version. Install the [Copilot Studio plugin for AI coding agents](https://github.com/microsoft/copilot-studio-plugin), then send the `/migrate` command with the agent's environment, tenant, Copilot Studio URL, and any constraints. The plugin pulls the classic agent, analyzes its structure, proposes a modern architecture, and creates a migrated agent you can test. (It keeps the same local-first approach as the earlier [Claude Code plugin demo](https://microsoft.github.io/mcscatblog/posts/claude-copilot-skills-copilot-studio-plugin-demo/), now with support for the new stack.)

<figure class="screenshot">
  <img src="{{ '/assets/catblog/new-orchestrator-resources/plugin.png' | relative_url }}" alt="The plugin analyzes a classic agent, proposes a modern architecture, and creates a migrated agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>The plugin analyzes a classic agent, proposes a modern architecture, and creates a migrated agent for testing.</figcaption>
</figure>

> Starter prompt: `/mcs-assistant:migrate Migrate this agent to modern orchestration: https://copilotstudio.microsoft.com/environments/<ENV_ID>/bots/<BOT_ID> from tenant <TENANT_ID>`. Use a capable AI model.

The key word is **propose**. It performed well in testing, but this tool is a fast assistant, not a "make my architecture correct" button. Do not turn every topic into a Skill and every variable into memory just because they existed. That is archaeology with YAML. Understand the task, keep the outcomes that must work, map each responsibility to the right modern component, then run evals against the core journeys.

> Treat the output as a first draft: run it, inspect it, compare it against your existing evals, and decide whether it is good enough.

## This is the on-ramp

The new experience is not just a new UI; it is a different mental model, and that can feel like a lot. So CAT organized it into three steps: use the **deck** to get the concepts, the **mini-site** to see it run, and the **plugin** to try it on a real agent. CAT's got you.

Have you tried the samples or the migration Skill? Share what surprised you, and how closely the architecture proposed by the plugin matched the way you would have redesigned it yourself.