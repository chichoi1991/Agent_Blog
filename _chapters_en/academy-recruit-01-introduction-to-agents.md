---
layout: "chapter"
lang: en
date: 2026-08-06
title: "Mission 01: Introduction to Agents"
short_title: "Introduction to Agents"
description: "Understand the key differences between conversational AI, LLMs, RAG, and conversational and autonomous agents."
order: 1
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/01-introduction-to-agents/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/01-introduction-to-agents/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🚨 Mission 01: Introduction to Agents](https://microsoft.github.io/agent-academy/recruit/01-introduction-to-agents/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

## Watch the video

- [YouTube walkthrough](https://www.youtube.com/watch?v=BhPz_zicUnM)

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-01-introduction-to-agents/video-thumbnail.jpg' | relative_url }}" alt="Introduction to Agents video thumbnail" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Introduction to Agents video thumbnail</figcaption>
</figure>

## Mission Briefing

Welcome, Recruit. Before you build agents yourself, you need a solid understanding of the AI concepts they are built on. In this mission, you will learn the basics of conversational AI, large language models (LLMs), retrieval-augmented generation (RAG), and the types of agents you can create in Copilot Studio.

## Objectives

In this mission, you will learn:

1. What conversational AI is  
2. How LLMs power chat experiences  
3. What value RAG adds  
4. The difference between conversational agents and autonomous agents  
5. How agents in Copilot Studio use these concepts

Let's get started.

## What is conversational AI?

Conversational AI refers to systems that can understand and process human language, whether text or speech, and respond in a way that feels natural. Examples include a website chatbot that provides order status or a virtual assistant in an app you use every day. Most modern conversational AI systems today rely internally on large language models (LLMs).

## LLM basics

At the center of most conversational AI systems are **large language models (LLMs)**. These are neural networks trained on massive amounts of text. They learn statistical patterns in language, allowing them to produce natural-sounding sentences, answer questions, brainstorm ideas, and generate content. Key points include:

1. **Training data**: LLMs are trained on terabytes of text such as web pages, books, poems, and articles. This “world knowledge” allows them to respond to a wide range of topics.  
2. **Tokenization**: Text is split into smaller units called tokens, such as words, subwords, or characters, and the model predicts one token at a time.  
3. **Context window**: Each LLM has a limit on the number of tokens it can “see” at one time. When this limit is exceeded, earlier token information is reduced or truncated.  
4. **Prompting**: Users interact with an LLM by sending a prompt, which is a block of text containing a question or request. The better the prompt, the more focused and relevant the response.

<div class="info-box note" markdown="1">
**Pro tip**  
LLMs are often described as “very smart autocomplete.” They do not truly understand meaning the way a human brain does, but they are very good at predicting the most appropriate next word or phrase in a sequence.
</div>

## Retrieval-augmented generation (RAG)

When an LLM relies only on static training data, it can hallucinate or become outdated. RAG addresses this by letting the system “look up” current information before generating an answer. At a high level, RAG works as follows:

1. **User query**: The user asks a question, such as “How did Contoso perform in the latest quarter?”  
2. **Retriever step**: The system queries knowledge sources such as documents, public websites, internal databases, or SharePoint libraries to find relevant information.  
3. **Augmentation**: The retrieved data is appended before or after the prompt before it is sent to the LLM.  
4. **Generation**: The LLM reads both the user question and the retrieved context, then generates an answer grounded in current data.

With RAG, agents can query places such as internal wikis, APIs, or FAQ knowledge bases and provide answers that are not limited to the static data the model was trained on.

## Conversational agents vs. autonomous agents

In the context of Copilot Studio, an **agent** can refer to several types of AI assistants. It is especially useful to distinguish between the following two types.

**Conversational agents**

- Require a two-way conversation with a person, through text or speech, to operate.
- Maintain context across multiple conversation turns.
- Can connect to external tools or APIs, such as calling Power Automate flows, sending calendar invites, or manipulating Dataverse data.
- Are well suited for customer support, FAQs, guided interactions, and simple Q&A.
- Examples:
  - An agent in Microsoft Teams that answers HR policy questions  
  - A public website agent that answers product questions

**Autonomous agents**

- Go beyond simple question-and-answer interactions and can start work and **take action** on behalf of the user.
- Use LLM reasoning loops such as “plan → act → observe → replan” to complete work.
- Can connect to external tools or APIs, such as calling Power Automate flows, sending calendar invites, or manipulating Dataverse data.
- Operate without continuous human prompting. Once triggered, they can handle multi-step processes on their own.
- Examples:
  - An agent that creates an itinerary, books flights, and sends a confirmation email when a travel request arrives in a backend system  
  - A “Meeting Summarizer” agent that joins Teams calls, transcribes them in real time, and writes an executive summary in OneNote

<div class="info-box note" markdown="1">
**Key difference**  
Conversational agents wait for user input and require back-and-forth conversation to operate. Autonomous agents can execute work without human intervention based on an external trigger.
</div>

## Agents in Copilot Studio

**Copilot Studio** brings conversational and autonomous scenarios together in a single framework. Copilot Studio helps you build agents through:

1. **Visual Agent Designer**: A drag-and-drop canvas for building, testing, and deploying agents
2. **Model (LLM) selection**: Choose the right LLM for your scenario from models such as OpenAI, Anthropic, and Custom Models
3. **Knowledge**: Use built-in integrations such as SharePoint, OneDrive, and Dataverse to take advantage of RAG immediately
4. **Tools**: Connect external tools or APIs to perform actions such as calling Power Automate flows, sending calendar invites, or manipulating Dataverse data
5. **Multimodal support**: Copilot Studio agents support file upload and voice conversations
6. **Publishing and deployment**: Deploy finished agents to multiple channels, such as publishing them to Microsoft 365 Copilot or embedding them in a website

## Mission Complete

You have successfully completed the following.

- **Large language models**: Explained how LLMs understand and generate language.
- **Retrieval-augmented generation**: Explained how RAG provides responses grounded in current information.
- **Agent behavior**: Distinguished between conversational agents and autonomous agents.
- **Copilot Studio**: Reviewed how Copilot Studio combines AI, knowledge, tools, and publishing channels.

Next, explore [Copilot Studio Fundamentals]({{ '/en/chapters/academy-recruit-02-copilot-studio-fundamentals/' | relative_url }}).

## Resources

- [Copilot Studio documentation](https://learn.microsoft.com/microsoft-copilot-studio/)
