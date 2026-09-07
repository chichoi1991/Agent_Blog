---
layout: "chapter"
lang: en
date: 2026-03-17
title: "Microsoft Learn MCP Server"
short_title: "MS Learn MCP"
description: "A Special Ops lab that connects the Microsoft Learn Docs MCP Server to a Copilot Studio agent for real-time documentation-grounded answers."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/ms-learn-mcp/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-10"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/ms-learn-mcp/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [📚 Microsoft Learn MCP Server](https://microsoft.github.io/agent-academy/special-ops/ms-learn-mcp/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

# 📚 Microsoft Learn MCP Server

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/Academy_LearnMCP_Badge.png' | relative_url }}" alt="Microsoft Learn MCP Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Microsoft Learn MCP Badge</figcaption></figure>

In this mission, **Operation Open Book**, you will connect the **Microsoft Learn Docs MCP Server** to a Copilot Studio agent so it can search Microsoft Learn documentation in real time. Instead of relying only on the model's internal memory, your agent can ground its answers in current official documentation.

<div class="info-box note" markdown="1">
**Important**: This mission is based on the Copilot Studio **New Experience**. If your screen looks different, turn on New Experience in the upper-right corner before continuing.
</div>

## 🔧 What you will build in this lab

- A Copilot Studio agent connected to the Microsoft Learn Docs MCP Server
- A connection that can use MCP tools such as `microsoft_docs_search`
- An agent that answers Microsoft product questions based on official documentation

## ⚙️ Prerequisites

- Microsoft Copilot Studio trial or paid account
- If you do not have an account, see [course setup](https://microsoft.github.io/agent-academy/recruit/00-course-setup/)

<div class="info-box note" markdown="1">
**Note**: No local tool installation is required. The Microsoft Learn MCP Server is a remote server hosted by Microsoft.
</div>

### What is the Microsoft Learn MCP Server?

The Microsoft Learn MCP Server is like giving your agent real-time access to a live documentation library. Instead of manually adding individual documents as knowledge, the agent can search and use documentation at the moment a user asks a question.

Server endpoint:

```text
https://learn.microsoft.com/api/mcp
```

This server implements the Model Context Protocol (MCP), an open standard that lets AI models call external tools in a consistent way.

### What can it do?

The primary tool, `microsoft_docs_search`, searches the Microsoft Learn index to find relevant documentation.

- Answer product questions about Power Platform, Azure, Microsoft 365, and more
- Provide links to official, up-to-date documentation
- Reduce hallucinations by grounding responses in real documentation

You can also use the `microsoft_code_sample_search` tool to find code samples.

### Why this matters

Without external grounding, agents rely only on model memory, which can become outdated. Connecting an MCP server enables real-time search at response time, so the agent can generate answers based on the latest documentation.

## 🎯 Scenario

The Zava team is building an internal support agent for Microsoft 365, Azure, and Power Platform questions. Instead of maintaining a manual knowledge base, they want to improve accuracy and freshness by searching Microsoft Learn in real time. You are the agent builder implementing this connection.

## 🧪 Lab 1.1 - Create the support agent

1. Sign in to [Microsoft Copilot Studio](https://copilotstudio.microsoft.com) and make sure New Experience is turned on in the upper-right corner.
1. On the home screen, under **select what you want to build**, select **Agent**.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.1.01_new.png' | relative_url }}" alt="Create an agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create an agent</figcaption></figure>

1. In **Name your agent** at the upper left, enter the following name.

```text
Microsoft Product Support
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-02.png' | relative_url }}" alt="Name your agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Enter the agent name</figcaption></figure>

1. The agent is saved automatically. If needed, select **Save** in the upper-right corner to save it manually.

## 🧪 Lab 1.2 - Connect the Microsoft Learn Docs MCP Server

1. In the right configuration panel, under **Tools**, select **+ Add tool**.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-03.png' | relative_url }}" alt="Add Tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a tool</figcaption></figure>

1. On the **Model Context Protocol (MCP)** tab, search for `Microsoft Learn`, then select **Microsoft Learn Docs MCP Server**.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-04.png' | relative_url }}" alt="Select MCP server" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the MCP server</figcaption></figure>

1. If you do not already have a connection, open the **Not connected** dropdown and select **Create new connection**.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-05.png' | relative_url }}" alt="Create new connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create a new connection</figcaption></figure>

1. Select **Create** to create the connection.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-06.png' | relative_url }}" alt="Create connection confirm" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Confirm connection creation</figcaption></figure>

1. Select **Add**.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-07.png' | relative_url }}" alt="Add" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Tool added</figcaption></figure>

1. In the Tools panel, select the server chip to open **Edit**. Confirm that `microsoft_docs_search`, `microsoft_code_sample_search`, and `microsoft_docs_fetch` are enabled, then select **Confirm**.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-08.png' | relative_url }}" alt="Observe MCP tools" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Review the MCP tools</figcaption></figure>

## 🧪 Lab 1.3 - Add instructions

1. Select the **Instructions** field on the Build tab and paste the following content.

```text
You are a helpful Microsoft documentation assistant. When a user asks a question about any Microsoft product, service, or technology, use the microsoft_docs_search tool to find relevant, accurate information from Microsoft Learn. If a user asks a question about a code sample, use the microsoft_code_sample_search tool to find a relevant code sample. Always cite the source documentation URL in your response. If the search does not return a relevant result, tell the user and suggest they visit https://learn.microsoft.com directly.
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-09.png' | relative_url }}" alt="Enter instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Enter the instructions</figcaption></figure>

<div class="info-box note" markdown="1">
**Tip**: Explicitly naming the MCP tools in the instructions helps the agent call them before relying on general knowledge.
</div>

1. Select **Save** in the upper-right corner.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-10.png' | relative_url }}" alt="Save" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Save</figcaption></figure>

## 🧪 Lab 1.4 - Test the agent

1. Go to the **Preview** tab at the top.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-11.png' | relative_url }}" alt="Open Preview tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview tab</figcaption></figure>

1. Send the following message in the chat input.

```text
What types of agents can I build in Copilot Studio?
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-12.png' | relative_url }}" alt="Send test message" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>First test message</figcaption></figure>

1. If a **Permission Required** card appears on the first call, select **Allow**.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-13.png' | relative_url }}" alt="Allow MCP connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Allow the MCP connection</figcaption></figure>

1. In the response, confirm that `microsoft_docs_search` was called and that documentation citations appear.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-14.png' | relative_url }}" alt="Grounded test result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Confirm the grounded response</figcaption></figure>

<div class="info-box note" markdown="1">
**Tip**: The default Preview mode is a test mode that shows tool calls and planning. Turn on **End user preview** to see the experience as an end user would.
</div>

1. Turn on **End user preview** and send a follow-up question.

```text
What are the licensing requirements for Copilot Studio?
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-15.png' | relative_url }}" alt="Second test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Test a follow-up question</figcaption></figure>

1. Confirm that the response is again citation-based.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-16.png' | relative_url }}" alt="Follow-up cited result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Confirm the follow-up response</figcaption></figure>

<div class="info-box note" markdown="1">
**Note**: A brief delay while the MCP tool is called is expected.
</div>

1. Select **New chat**, turn **End user preview** back off, and send the following message.

```text
Find a good code sample for creating a PCF control
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-17.png' | relative_url }}" alt="New chat" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Start a new chat</figcaption></figure>

1. This time, confirm that `microsoft_code_sample_search` is called.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-18.png' | relative_url }}" alt="Code sample result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Code sample search result</figcaption></figure>

## 🧪 Lab 1.5 - Test fallback behavior

Confirm that the fallback rule in the instructions (`if there is no relevant result, suggest visiting learn.microsoft.com`) works as expected.

<div class="info-box note" markdown="1">
**Note**: In the new Copilot Studio experience, the older **Use general knowledge** and **Use information from the web** toggles are no longer available. Web grounding is controlled by removing the **Search all websites** knowledge source on the Build tab.
</div>

1. On the Build tab, under **Knowledge**, remove the **Search all websites** source by selecting X (Remove).

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-19.png' | relative_url }}" alt="Remove Search all websites" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Remove the web search knowledge source</figcaption></figure>

1. Select **Save** at the top.
1. Go to the Preview tab, select **New chat**, and send the following message.

```text
What is the recipe for chocolate cake?
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-20.png' | relative_url }}" alt="Fallback test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Fallback test question</figcaption></figure>

1. Confirm that the agent either indicates that no relevant Microsoft Learn result was found or redirects the user to the scope of Microsoft documentation.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-21.png' | relative_url }}" alt="Fallback test result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Confirm fallback behavior</figcaption></figure>

## 🧪 Lab 1.6 - Bonus: Extend with a Skill

So far, the agent can retrieve up-to-date technical answers and code samples from the Microsoft Learn MCP Server. In this bonus lab, you will add a reusable **Skill** so the agent can provide guided learning experiences such as lessons, study guides, and quizzes.

### What is a Skill?

A **Skill** is a reusable set of instructions that the agent loads when a request matches that Skill's purpose. The name and description help the orchestrator decide when to use it, and the full Skill instructions define how to complete the task. In this lab, the `teach` Skill implements a repeatable learning process.

Think of the agent's core instructions as an employee handbook that applies to every conversation. A Skill is a procedure card the agent pulls out only for a specific task. Skills guide *how* the agent handles the task, while MCP tools provide access to external capabilities and current information.

1. On the agent's **Build** tab, select **Add (+)** next to **Skills**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_AddSkill.png' | relative_url }}" alt="Add a Skill from the Build tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add a Skill from the Build tab</figcaption></figure>

1. In the **Add skill** dialog, select **Create from blank**.

1. Fill in the fields with the following content:

    **Name**:

    ```text
    teach
    ```

    **Description**:

    ```text
    Teach a user a new skill or concept through short, goal-focused lessons, practice, feedback, retrieval, and adaptive progression. Use when a user asks to learn, understand, practice, or become proficient in a topic over one or more conversations.
    ```

    **Instructions** (paste the following exactly):

    ````markdown
    # Teach

    Act as an adaptive teacher. Help the user build knowledge they can apply and retain—not merely read an explanation.

    ## Core approach

    - Tie teaching to a concrete real-world goal.
    - Teach one tightly scoped concept or skill at a time.
    - Keep explanations short enough to fit working memory.
    - Follow explanation with active practice and immediate feedback.
    - Adjust difficulty so the work is challenging but achievable.
    - Prefer trustworthy, current sources over unsupported claims.
    - Build long-term retention through retrieval, spacing, and interleaving.

    ## Start a learning journey

    Before teaching, determine:

    1. What the user wants to learn.
    2. Why they want to learn it and what they need to accomplish.
    3. What they already know or can already do.
    4. Their constraints, such as time, tools, accessibility, budget, or deadline.
    5. How they prefer to learn, if relevant.

    Do not conduct a long intake interview. Ask only the smallest number of questions needed to choose a useful first lesson. If the user's goal and level are already clear, begin immediately.

    Summarize the learning mission in this compact form:

    ```markdown
    **Goal:** {real-world outcome}
    **Success:** {observable abilities or deliverables}
    **Current level:** {relevant prior knowledge}
    **Constraints:** {important boundaries}
    ```

    Treat this mission as the compass for future lessons. If the goal changes, confirm the change with the user and update the summary.

    ## Choose what to teach next

    Select the smallest useful next step that:

    - directly supports the learning mission;
    - builds on demonstrated knowledge;
    - corrects an important misconception; or
    - removes the most immediate blocker.

    Do not reteach material the user has already demonstrated. Do not jump so far ahead that success depends on several unexplained concepts.

    If the user requests a specific lesson, honor that request unless a missing prerequisite makes it impractical. In that case, explain the prerequisite briefly and teach only what is necessary.

    ## Lesson pattern

    Use this sequence by default:

    1. **Outcome** — State what the user will be able to do by the end.
    2. **Explain** — Teach only the knowledge required for that outcome.
    3. **Example** — Show one concrete, mission-relevant example.
    4. **Practice** — Ask the user to retrieve, decide, create, explain, or perform something.
    5. **Feedback** — Identify what was correct, what needs adjustment, and why.
    6. **Transfer** — Give a slightly different scenario so the user applies the idea rather than copying it.
    7. **Recap** — Compress the lesson into a few durable takeaways.
    8. **Next step** — Recommend the next lesson or a short practice task.

    Keep each lesson focused on one tangible win. Break broad topics into multiple lessons.

    ## Teaching knowledge

    Make new information easy to acquire:

    - Use plain language before specialized terminology.
    - Connect unfamiliar ideas to something the user already knows.
    - Prefer examples from the user's stated goal or environment.
    - Distinguish facts, conventions, opinions, and uncertainty.
    - Cite high-quality sources when factual accuracy matters or when tools allow research.
    - Prefer primary documentation, peer-reviewed research, recognized experts, and strongly moderated practitioner communities.
    - Never invent a citation, source, or claim of consensus.

    When recommending a source, say what it is useful for. A short, curated list is better than a large link dump.

    ## Building durable skill

    Do not mistake recognition for mastery. Use active recall and application:

    - Ask the user to explain an idea in their own words.
    - Ask them to choose between plausible options and justify the choice.
    - Use realistic scenarios, exercises, simulations, or step-by-step performance.
    - Revisit important ideas after other material has intervened.
    - Mix related skills once each has been taught independently.
    - Give feedback as soon as possible.

    For multiple-choice questions:

    - Make distractors plausible.
    - Avoid clues from answer length, grammar, formatting, or position.
    - Keep answer choices similar in length when practical.
    - Explain why the selected answer is right or wrong after the user responds.

    Do not reveal an exercise's answer before the user attempts it unless they explicitly ask.

    ## Adapt to the learner

    Increase difficulty when the user can:

    - retrieve the concept without hints;
    - apply it in a new scenario;
    - explain their reasoning accurately; or
    - complete the skill with few errors.

    Reduce or restructure difficulty when the user:

    - repeatedly makes the same error;
    - cannot identify the first step;
    - is overloaded by terminology;
    - succeeds only by copying the example; or
    - says the pace or format is not working.

    When the user is stuck, provide the smallest useful hint first. Escalate from a hint, to a partial example, to a full explanation only as needed.

    ## Track learning in conversation

    Maintain a concise internal learning state from the conversation:

    - mission and success criteria;
    - concepts or skills the user has demonstrated;
    - misconceptions that were corrected;
    - unresolved questions or weak areas;
    - teaching preferences and constraints;
    - the most useful next step.

    Treat coverage and demonstrated learning differently. Record something as learned only when the user provides evidence through recall, explanation, application, or performance.

    When continuity may be lost or the user asks for a progress summary, provide:

    ```markdown
    ## Learning checkpoint

    **Mission:** {goal}
    **Demonstrated:** {what the user can now do}
    **Still developing:** {gaps or misconceptions}
    **Useful terms:** {term — concise definition}
    **Trusted resources:** {source — when to use it}
    **Recommended next step:** {next lesson or practice}
    ```

    The user can paste this checkpoint into a future conversation to resume.

    ## Terminology

    Build a glossary only when specialized terms genuinely help. Add a term after the user understands it, not as a substitute for teaching it.

    Each entry should use:

    ```markdown
    **Term:** One- or two-sentence definition.
    ```

    Use the chosen terminology consistently. If a field uses a term ambiguously, state what it means in this learning journey.

    ## Real-world wisdom

    Some judgment can only come from practice with real people and real conditions. When appropriate:

    - suggest a safe real-world exercise, project, or experiment;
    - recommend a reputable community, class, mentor, or practitioner;
    - distinguish general guidance from professional advice;
    - respect the user's choice not to join a community.

    ## Response style

    - Be encouraging but honest and specific.
    - Lead with the lesson or next action, not a lecture about the teaching process.
    - Ask one question or give one exercise at a time when awaiting the user's response.
    - Do not overwhelm the user with a full curriculum unless they ask for one.
    - Do not generate unnecessary files, elaborate course infrastructure, or decorative output.
    - Always invite relevant follow-up questions.

    ## Completion

    The learning journey is complete when the user can meet the observable success criteria in a realistic scenario with appropriate independence. End with:

    - a concise summary of demonstrated abilities;
    - a final transfer task or capstone, when useful;
    - a maintenance plan using spaced review or real-world practice; and
    - recommended advanced topics only if they support the user's goal.

    ````

1. Select **Create** to add the Skill. The new Skill appears in the **Skills** section of the **Build** tab.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_SkillConfig.png' | relative_url }}" alt="Skill configuration complete" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Completed fields in the Add skill dialog</figcaption></figure>

    <div class="info-box note" markdown="1">
    **Tip**: The Skill description helps the agent decide when to load the Skill. Because the description identifies learning-related requests, you do not need to modify the core instructions for the Skill to be called.
    </div>

1. Select the **Preview** tab at the top of the page. Keep **End user preview** turned off so you can see Skill and tool activity.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_PreviewTab.png' | relative_url }}" alt="Preview tab with End user preview off" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview tab with End user preview off</figcaption></figure>

1. In the conversation input, enter the following prompt and press **Enter**:

    ```text
    Quiz me on the fundamentals of Power Automate
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_quizPrompt.png' | relative_url }}" alt="Power Automate quiz prompt" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Power Automate quiz prompt in Preview</figcaption></figure>

1. In the activity trace, confirm that the agent loads the **teach** Skill. The exact response may vary, but the agent should ask about your experience level or learning goal before starting the quiz. Enter `Beginner` and press **Enter**.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_quizSkillLevel.png' | relative_url }}" alt="Teach Skill asks for experience level" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>teach Skill asks for the experience level</figcaption></figure>

1. Answer the first quiz question. Confirm that the agent provides feedback and an explanation before presenting the next question.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_quizresult.png' | relative_url }}" alt="Interactive quiz question with answer choices" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Interactive quiz with answer choices</figcaption></figure>

1. Select **New chat**, enter the broader learning request below, and press **Enter**:

    ```text
    Help me learn everything I need to know about Copilot Cowork
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_prompt2.png' | relative_url }}" alt="Copilot Cowork learning prompt" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Copilot Cowork learning prompt in Preview</figcaption></figure>

1. In the activity trace, confirm that the agent loads the **teach** Skill and calls `microsoft_docs_search`. The order and exact labels may vary, and the agent should ask about current experience and learning goals.

1. Enter the following and press **Enter**:

    ```text
    I'm a complete beginner. I am familiar with M365 Copilot but not Copilot Cowork. My goal is to find out how what Copilot Cowork can do and how I can use it in my day to day work as a project manager.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_prompt2response.png' | relative_url }}" alt="Learner experience and project manager goal input" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Response with learner experience and goals</figcaption></figure>

1. Review the response. The exact content may vary, but the agent should summarize the learning goal, provide a high-level explanation, and present a knowledge-check question or practice activity.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_prompt2output.png' | relative_url }}" alt="Personalized Copilot Cowork lesson response" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Personalized Copilot Cowork lesson response</figcaption></figure>

## ✅ Mission complete

Congratulations! **Operation Open Book** is complete. Your Copilot Studio agent can now access the full Microsoft Learn documentation library through a live MCP connection.

In this lab, you accomplished:

✅ **MCP fundamentals**: Understood how the Model Context Protocol gives AI agents real-time access to tools  
✅ **Remote MCP connection**: Registered and connected a hosted MCP server in Copilot Studio without local deployment  
✅ **Tool activation**: Enabled MCP-exposed tools in a Copilot Studio agent  
✅ **Instruction engineering**: Wrote instructions that direct MCP tool use and control fallback responses  
✅ **Skill authoring**: Created and tested a reusable teach Skill that combines guided learning with current Microsoft Learn content

## 🏅 Claim your completion badge

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/Academy_LearnMCP_Badge.png' | relative_url }}" alt="Learn MCP Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Learn MCP Badge</figcaption></figure>

Badge request form:

[https://aka.ms/agent-academy-special-ops/ms-learn-mcp/form](https://aka.ms/agent-academy-special-ops/ms-learn-mcp/form)

After review, Global AI Community will send an email with badge instructions.

<div class="info-box note" markdown="1">
**Tip**: If you do not see the email, check your spam or junk folder.
</div>

## 📚 Tactical resources

- 🔗 [Microsoft Copilot Studio ❤️ MCP]({{ '/en/chapters/academy-special-ops-mcs-mcp/' | relative_url }})
- 🔗 [Power Platform CLI MCP Server]({{ '/en/chapters/academy-special-ops-pac-cli-mcp/' | relative_url }})
- 📖 [Microsoft Learn MCP Server docs](https://learn.microsoft.com/microsoft-copilot-studio/connections-mcp)
- 📖 [Model Context Protocol overview](https://modelcontextprotocol.io/introduction)
- 📖 [Copilot Studio MCP connections](https://learn.microsoft.com/microsoft-copilot-studio/connections-mcp)
