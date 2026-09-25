---
layout: "chapter"
lang: en
date: 2026-07-02
title: "Mission 02: Authoring Agent Instructions"
short_title: "02. Authoring Agent Instructions"
description: "Learn refined agent communication and behavior control"
order: 2
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/02-agent-instructions/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-01-14"
canonical_url: "https://microsoft.github.io/agent-academy/operative/02-agent-instructions/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🕵️‍♂️ Mission 02: Authoring Agent Instructions](https://microsoft.github.io/agent-academy/operative/02-agent-instructions/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

🎥 **Watch the walkthrough**

<a href="https://www.youtube.com/watch?v=h_pgKSKHlIU" target="_blank" rel="noopener">
  <figure class="screenshot">
    <img src="{{ '/assets/academy/operative-02-agent-instructions/02-instructions-thumbnail_PlayButton.png' | relative_url }}" alt="Authoring Agent Instructions video thumbnail" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </figure>
</a>

## 🎯 Mission briefing

Agent, your next assignment is **Operation Secret Directive**. This mission is focused training on agent communication and control.

This mission is not a hands-on lab. Instead, it gives you the foundation you need to write clear and effective instructions for agents in later labs. You will learn how well-written instructions influence an agent's behavior, decision-making, and tool usage, and why small wording differences can significantly change the outcome.

The goal is to understand how to write precise, actionable instructions and high-quality descriptions that help an agent interpret its role, choose the right tools and knowledge sources, and respond accurately to user queries. These skills are the foundation for every successful agent you will build.

Think of this as advanced training in shaping an agent's behavior and intent. Just as field operatives rely on clear mission parameters, AI agents need carefully authored instructions to act with clarity, consistency, and purpose in real-world scenarios.

## 🔎 Objectives

In this mission, you will learn:

1. The techniques and principles for authoring agent instructions in Copilot Studio
1. How to guide agents to collaborate with tools, knowledge sources, and other agents
1. How to ensure agents operate with accuracy, transparency, and efficiency

## 📝 Authoring agent instructions

Effective agent instructions are central to successful agent behavior. Agents use instructions to:

- Decide which tools, topics, or knowledge sources to use for a user query or autonomous trigger.
- Fill in inputs for each tool based on available context.
- Generate responses for the end user.

### How instructions work

Instructions must be grounded in the tools, topics, and knowledge sources configured for the agent. An agent cannot execute instructions for resources it does not have. For example, if you instruct an agent to search a website FAQ, that FAQ must be added as a knowledge source.

Using `/` in instructions lets you reference specific tools, topics, variables, or Power Fx expressions. This helps the agent understand more precisely what it should use and when.

### What to include in instructions

- Add instructions when you want to guide the agent's choices, especially where ambiguity may occur.
- Use instructions to set guardrails, such as limiting topics or specifying response formats.
- Provide hints for filling tool inputs, such as "When helping a user draft an email, use the email address in the lead's contact field."
- Specify response formats, such as "Always provide order status responses in a table."
- Add constraints that limit the agent's scope, such as "Respond only to requests related to employee benefits."

### Practical examples

- "Use the FAQ document only when the question is not related to Hours, Appointments, or Billing."
- "Use only the ticket creation topic for creating tickets, and use the troubleshooting topic for other requests related to resolving issues."
- "Always provide order status responses in a table."

### Test and refine

- After editing instructions, use the test pane to validate agent behavior.
- Update and publish changes as needed.

### Advanced guidance

- Write instructions as numbered or bulleted lists, and state that they must be followed in order.
- Use markdown formatting to improve readability and help generative AI process the instructions more effectively.
- If the agent must behave very specifically, consider creating a topic for that use case.
- To avoid confusion, use the exact names of tools and topics in your instructions.

### Safety and moderation

- Restrict which tools the agent should use when referencing knowledge sources.
- Limit the parameters that can be used with tools (for example, send email only to people in a specified list).
- Use instructions to prevent unwanted behavior or content-filtering issues.

## ✍️ Authoring descriptions for tools, topics, and agents

High-quality descriptions are essential for generative orchestration. Agents use these descriptions to choose the right tools, topics, and agents in response to user queries and triggers. Follow these best practices.

- **Use simple, direct language**: Avoid jargon, slang, and overly technical wording. Write in active voice and present tense.
- **Be specific and relevant**: Include keywords related to the capability and user intent. Reduce ambiguity by writing descriptions that clearly distinguish similar tools or topics.
- **Keep it short but informative**: Limit descriptions to one or two sentences. Summarize what the tool, topic, or agent does and how it benefits the user.
- **Use unique, descriptive names**: Avoid generic names. For example, use "Weather Forecast for Tomorrow" instead of simply "Weather."
- **List tasks or considerations**: When describing multiple capabilities or steps, use bullets or numbered lists for clarity.
- **Test for overlap**: If descriptions for multiple topics are similar, the agent may call all of them. Test and revise to avoid overlap.

<div class="info-box note" markdown="1">
**Examples of good and bad descriptions**

- **Good:** This topic provides next-day weather information for any location worldwide. It provides temperature information, but not the current weather for today.
- **Bad:** This tool can answer questions. *(Too vague)*
</div>

## 🛠️ Best practices for instructions and descriptions

To make instructions and descriptions truly effective, keep these principles in mind.

- Use active voice and present tense (for example, "This tool provides weather information").
- Avoid jargon, slang, and unnecessary technical terms unless they are essential for the audience.
- Use bullets or numbered lists to separate tasks, capabilities, and considerations.
- Include keywords that match user intent and the capability of the tool or topic.
- Make names and descriptions distinct so similar resources are not confused or duplicated.

## 🗂️ Example instruction structure

When authoring instructions, consider the following structure for clarity and completeness.

1. **Overview**: Briefly describe the agent's mission and role.
1. **Process steps**: List the major steps the agent should follow.
1. **Collaboration points**: Indicate when to call other agents or use specific tools.
1. **Safety and moderation**: Include compliance or safety requirements.
1. **Feedback loop**: Specify how the agent collects feedback or escalates issues.

## 🎉 Mission complete

You have completed Mission 02! You now have:

✅ **Instruction proficiency**: You learned how to write clear and actionable agent instructions  
✅ **Strategic guidance**: You can guide agents to use tools and collaborate effectively  
✅ **Operational clarity**: You can design agents to operate with accuracy and transparency

You will soon apply your new instruction-authoring skills in the hands-on learning that follows.

Next up is [Mission 03: Multi-Agent System]({{ '/en/chapters/academy-operative-03-multi-agent/' | relative_url }}).

## 📚 Tactical resources

📖 [Microsoft Copilot Studio - Authoring Instructions](https://learn.microsoft.com/microsoft-copilot-studio/authoring-instructions)
📖 [Guidance for Generative Mode](https://learn.microsoft.com/microsoft-copilot-studio/guidance/generative-mode-guidance)
