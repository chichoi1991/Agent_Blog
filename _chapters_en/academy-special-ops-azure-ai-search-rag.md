---
layout: "chapter"
lang: en
date: 2026-07-02
title: "Azure AI Search RAG"
short_title: "Azure AI Search RAG"
description: "A Special Ops lab that uses Azure AI Search vector search to build RAG, enabling a Copilot Studio agent to respond based on organizational documents."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/azure-ai-search-rag/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-10"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/azure-ai-search-rag/"
---

<div class="info-box note" markdown="1">
**Translated article** — This article is based on [🔎 Build a RAG Agent with Azure AI Search](https://microsoft.github.io/agent-academy/special-ops/azure-ai-search-rag/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

# 🔎 Azure AI Search RAG

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/ai-search-badge.png' | relative_url }}" alt="Azure AI Search RAG badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Azure AI Search RAG badge</figcaption></figure>

Agents, your objective in this mission, **Operation Vector Vault**, is to use **RAG (Retrieval-Augmented Generation)** based on Azure AI Search vector search so a Copilot Studio agent can answer from your organization's real documents. You will create a search service, vectorize and index resume documents, and connect them to an **HR Knowledge Agent** so it can answer semantically rather than by keyword and cite its sources.

<div class="info-box note" markdown="1">
**Important — this mission uses the GitHub Copilot harness**: The Copilot Studio steps require an agent powered by the **GitHub Copilot harness**. Turn on **New Experience** before creating the agent.
</div>

**Curriculum source**: This mission was adapted from materials in [Microsoft Copilot Developer Camp](https://aka.ms/copilot-camp). Thanks to [Paolo Pialorsi](https://github.com/PaoloPia), who created the original curriculum, and to the Copilot Camp contributors. The Agent Academy version updates the lab for the GitHub Copilot harness and the Special Ops format.

## 🎯 Mission objectives

In this mission, you will learn how to:

- Create and populate an Azure AI Search vector index
- Connect Azure AI Search to a Copilot Studio agent
- Ground agent responses in your own documents
- Test semantic search and document source citation

## ❓ What is Retrieval-Augmented Generation (RAG)?

RAG is a technique that helps a model create more accurate and trustworthy responses by retrieving relevant information before generating an answer.

It has two core steps.

- **Retrieval**: Find relevant information in a large data store
- **Generation**: Generate an answer based on the retrieved results

This makes it especially useful for Q&A, research, and internal knowledge search scenarios where answers should be based on real documents rather than only the model's internal memory.

## 🧠 Why vector search?

Vector search finds information by **semantic similarity**, not word matching. It converts documents into numeric vectors and finds content that is semantically close to the query, making it strong at:

- **Semantic matching**: Connecting the same concept even when the wording differs (for example, recruitment / hiring)
- **Multilingual search**: Finding equivalent meaning across languages
- **Diverse content formats**: Searching across text documents, PDFs, and other formats

It works as follows.

1. Convert documents into vectors with an embedding model
1. Store the vectors in an Azure AI Search index
1. Convert the user query into a vector as well, then return semantically close results

For example, if you search for "software engineering skills," it can find semantically similar candidates such as "programming expertise" or "development capabilities" even when the exact same words do not appear.

## ⚙️ Prerequisites

- A Microsoft Copilot Studio trial or paid account that can use the **GitHub Copilot harness**. If you do not have an account, see the [course setup guide](https://microsoft.github.io/agent-academy/recruit/00-course-setup/) for free trial options.
- An **Azure subscription** with permissions to create resources (Azure AI Search, Storage, Azure OpenAI/Microsoft Foundry)
- Basic experience creating Copilot Studio agents and managing Azure resources

<div class="info-box note" markdown="1">
**Important — GitHub Copilot harness billing**: This mission uses the **GitHub Copilot harness in Microsoft Copilot Studio**, which is billed based on usage. Creating the agent and testing, evaluating, and using it in Preview may consume **Copilot Credits**. Before you begin, review the [Copilot Credits billing overview](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/billing-credit-overview).
</div>

## 🎯 Scenario

The Contoso HR team needs to handle a large volume of resumes across multiple formats and languages. Recruiters need an agent that can answer accurately from real resume documents when they ask natural-language questions such as "Spanish speaker + Python experience." Your role is the agent builder who connects RAG with Azure AI Search.

## 🧪 Lab 1.1: Prepare the Azure AI Search service

### Step 1 — Create an Azure AI Search service

Create an Azure AI Search service in the [Azure Portal](https://portal.azure.com).

1. Search for `Azure AI Search` from **Create a resource**
1. Select **Azure AI Search**, then **Create**
1. Enter the values below, then select **Review + Create**
   - **Subscription**: Your Azure subscription
   - **Resource group**: An existing or new group (for example, `agent-academy-rg`)
   - **Service name**: A globally unique name (for example, `agentacademy-ai-search`)
   - **Location**: The same region as your other resources
   - **Pricing tier**: **Basic**

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-search-01.png' | relative_url }}" alt="Create an Azure AI Search service" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create an Azure AI Search service</figcaption></figure>

After creation, copy the values below.

1. **URL** on **Overview** (search endpoint)
1. **Primary admin key** under **Settings → Keys**

<div class="info-box note" markdown="1">
**Tip**: In Lab 1.3, you will need to paste the endpoint URL and admin key when creating the Azure AI Search **connection** in Copilot Studio, so keep them somewhere safe.
</div>

### Step 2 — Create an Azure Storage account

Create an Azure Storage account to store the documents before indexing.

1. In the Azure Portal, select **Create a resource** → search for `Storage Account`
1. Select **Storage Account**, then **Create**
1. Enter the values below, then select **Review + Create**
   - **Subscription**: Your Azure subscription
   - **Resource group**: The same group as Azure AI Search
   - **Storage account name**: A globally unique name (for example, `agentacademystorage`)
   - **Region**: The same region as Azure AI Search
   - **Performance**: Standard
   - **Redundancy**: LRS

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-storage-01.png' | relative_url }}" alt="Create an Azure Storage account" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create an Azure Storage account</figcaption></figure>

### Step 3 — Deploy a text embedding model

You need an embedding model for vector search.

1. If you do not have an Azure OpenAI service, create one first (Standard S0 recommended).
1. In [Microsoft Foundry](https://oai.azure.com/portal), select your Azure OpenAI instance.
1. Go to **Deployments** → **+ Deploy model** → **Deploy base model**
1. Search for `text-embedding-ada-002`, then select **Confirm**
1. Configure the deployment values
   - **Deployment name**: `text-embeddings`
   - **Deployment type**: Standard
   - **Model version**: 2 (Default)
   - **Content Filter**: DefaultV2
1. Select **Deploy** and wait for completion

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/openai-embedding-01.png' | relative_url }}" alt="Deploy the text embedding model" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Deploy text-embedding-ada-002</figcaption></figure>

<div class="info-box note" markdown="1">
**Role of `text-embedding-ada-002`**: It converts text into semantic numeric vectors, allowing you to find semantically similar documents even across different languages and wording. Combined with Azure AI Search, it enables context-based search instead of exact keyword matching.
</div>

## 🧪 Lab 1.2: Create a search index and load data

### Step 1 — Prepare sample documents

Download and extract the sample resume documents for the lab.

- [fictitious_resumes.zip](https://github.com/microsoft/agent-academy/raw/refs/heads/main/docs/special-ops/azure-ai-search-rag/assets/fictitious_resumes.zip)

The sample documents include information such as candidate names/contact details, technical skills, work experience, education, language abilities, and certifications. Even when the documents are written in multiple languages, embeddings + a vector index make them searchable.

### Step 2 — Upload sample documents to the Storage Account

1. Open your Storage Account instance in the [Azure Portal](https://portal.azure.com/).
1. Under **Data storage** on the left, select **Containers**
1. Select **+ Container**
1. Enter `resumes` as the container name, then select **Create**

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-storage-02.png' | relative_url }}" alt="Create a container" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create a storage container</figcaption></figure>

After creating the container, upload the files:

1. Select **Upload**
1. Drag and drop the resume files, or select them with **Browse for files**
1. Select **Upload** and wait for the upload to complete

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-storage-03.png' | relative_url }}" alt="Upload resume files" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Upload resume files</figcaption></figure>

### Step 3 — Populate the index with integrated vectorization

1. Return to your Azure AI Search instance and select **Import data (new)** at the top

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-search-02.png' | relative_url }}" alt="Start Import data" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Import data (new)</figcaption></figure>

1. Select **Azure Blob Storage** as the data source

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-search-03.png' | relative_url }}" alt="Select data source" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Azure Blob Storage</figcaption></figure>

1. Select **RAG** as the scenario

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-search-04.png' | relative_url }}" alt="Select the RAG scenario" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the RAG scenario</figcaption></figure>

Configure it as follows.

1. **Azure Blob Storage**
   1. Subscription: Your subscription
   1. Storage account: The account you created earlier
   1. Blob container: The container where you uploaded the resumes
   1. Blob folder: Leave blank if there is no folder structure
   1. Parsing mode: Default
1. **Vectorize your text**
   1. Kind: Azure OpenAI
   1. Azure OpenAI service: Your instance
   1. Model deployment: `text-embeddings`
   1. Authentication type: API Key (default)
   1. Acknowledge the additional cost notice, then select **Next**
1. **Vectorize your images**: Select **Next** if you do not need it
1. **Advanced ranking and relevancy**: Keep defaults and select **Next**
1. **Review and create**
   1. Enter a prefix for the index/indexer/data source/skill set (for example, `resumes`)
   1. Review the settings, then select **Create**

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-search-05.png' | relative_url }}" alt="Create a vector index" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create a vector index</figcaption></figure>

When creation completes, check the index with **Start searching**. You can see that a `text_vector` field has been created for each record and stores the embedding result.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-search-06.png' | relative_url }}" alt="Check index search" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Check index search</figcaption></figure>

## 🧪 Lab 1.3 — Build the RAG agent

### Step 1 — Create the HR Knowledge Agent

1. Sign in to [Microsoft Copilot Studio](https://copilotstudio.microsoft.com) and confirm that **New experience** is turned on

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/new-experience.png' | relative_url }}" alt="Enable New experience" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Check New experience</figcaption></figure>

1. Select **New Agent**

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/new-agent.png' | relative_url }}" alt="Create a new agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select New Agent</figcaption></figure>

1. Enter the name

```text
HR Knowledge Agent
```

1. Paste the text below into **Instructions**.

```text
You are an intelligent HR Knowledge Assistant specializing in candidate search. You have access to a database of candidate resumes indexed in Azure AI Search, which you can query using the Semantic Hybrid Search tool.

When a user asks a question, you should:
1. Call the Semantic Hybrid Search tool to retrieve the most relevant candidate documents using semantic (vector) understanding.
2. Provide detailed, accurate information based only on the retrieved documents.
3. Always cite the candidate name(s) and source documents your answer is based on.
4. Explain your reasoning when matching candidates to requirements.
5. Suggest alternative candidates when an exact match isn't available.
6. Help users understand the skills and qualifications of different candidates.

You excel at:
- Finding candidates with specific technical skills
- Matching language requirements with candidate profiles
- Identifying experience levels and career progression
- Understanding educational backgrounds and certifications
- Semantic search that goes beyond keyword matching

If the search returns no relevant results, say so clearly rather than guessing. Always be professional and respect candidate privacy.
```

1. Select **Save** in the upper-right corner

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/title-description.png' | relative_url }}" alt="Save the agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Save the agent name and Instructions</figcaption></figure>

### Step 2 — Connect Azure AI Search as a tool

<div class="info-box note" markdown="1">
**Important**: In agents powered by the **GitHub Copilot harness**, **Azure AI Search is not a Knowledge source**. The **Add knowledge** dialog shows only Public websites, SharePoint, and OneDrive. Azure AI Search must be connected as a **Connector Tool** so the agent can call it for search.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/rag-knowledge-no-azure-search.png' | relative_url }}" alt="Azure AI Search is not available in Add knowledge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add knowledge search results</figcaption></figure>
</div>

1. In the **Tools** card on the right **Agent configuration** panel, select **Add tool**
1. Search for `Azure AI Search` and review the connector action list
   - Semantic Hybrid Search
   - Search vectors with natural language
   - Get search indexes
   - Get index statistics

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/rag-tool-azure-search-actions.png' | relative_url }}" alt="Azure AI Search connector actions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select the Azure AI Search tool</figcaption></figure>

1. Select **Semantic Hybrid Search** and **Add**. This action performs semantic hybrid search, combining vector search and keyword search against the index. If you need a pure vector query, **Search vectors with natural language** is also a good option.
1. Open the added tool and configure Name/Description/Authentication mode (User or Maker) in **Tool details**
1. Create the connector **connection** using the **endpoint URL** and **admin key** you saved in Lab 1.1, then specify the `resumes` index

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/rag-tool-details-auth.png' | relative_url }}" alt="Tool details and authentication mode" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Tool details and authentication settings</figcaption></figure>

<div class="info-box note" markdown="1">
**Tip**: Select **User** if per-user credentials are required, or **Maker** if you want to share the maker's connection. For a shared HR knowledge base, **Maker** is usually appropriate.
</div>

1. Select **Save** and confirm that the button becomes disabled

<div class="info-box note" markdown="1">
**Caution**: If you leave the build screen without saving, your changes may be lost. Always confirm that the Save button is disabled.
</div>

## 🧪 Lab 1.4 — Test the agent

1. Go to the **Preview** tab
1. If you just added the tool, select **New chat** to refresh the tool context
1. Test the basic queries below

```text
Hello! Can you help me find candidates with software engineering experience?
```

```text
I'm looking for candidates who speak multiple languages. Can you help?
```

```text
Show me candidates with machine learning or AI experience.
```

Confirm whether Semantic Hybrid Search is called, whether sources are cited, and whether the search is semantic rather than keyword-only.

<div class="info-box note" markdown="1">
**Note**: On first run, you may see a prompt to approve/create the Azure AI Search connection. Complete the connection, then run the message again.
</div>

1. Next, test complex-condition queries

```text
Find candidates suitable for a senior role that requires 5+ years of Python experience and fluency in Spanish
```

```text
I need someone with both frontend and backend development skills. Who would be good for a full-stack position?
```

```text
Can you recommend candidates for a data science position that requires experience with machine learning frameworks?
```

```text
Who has project management experience combined with technical skills?
```

In the results, check for multi-condition matching, reasoning explanations, alternative candidate suggestions, and resume-based citations.

## ✅ Mission complete

Congratulations! You have completed **Operation Vector Vault**. Your Copilot Studio agent can now search organizational documents through Azure AI Search vector search and answer from grounded evidence.

In this lab, you accomplished:

- ✅ **Azure AI Search**: Created and configured a search service for enterprise knowledge
- ✅ **Integrated vectorization**: Built a PDF-based vector index with an embedding model
- ✅ **Connector-based RAG**: Connected Azure AI Search as a **tool** instead of the **Azure AI Search Knowledge source**, which is no longer available in GitHub Copilot harness agents
- ✅ **Instruction design**: Wrote Instructions that encourage search tool calls and source citation
- ✅ **Semantic testing**: Validated search quality with basic and complex queries

The RAG pattern you built here is not limited to HR. You can apply it to any area that needs to search large volumes of documents through natural-language conversation, such as customer support knowledge bases, technical documentation, and policy guides.

## 🏅 Claim your completion badge

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/ai-search-badge.png' | relative_url }}" alt="Azure AI Search RAG Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Azure AI Search RAG Badge</figcaption></figure>

Submit the required items in the badge request form.

[https://aka.ms/agent-academy-special-ops/vector-vanguard/form](https://aka.ms/agent-academy-special-ops/vector-vanguard/form)

After review, badge claim instructions will be sent by email from the Global AI Community.

<div class="info-box note" markdown="1">
**Tip**: If you do not see the email, check your spam/junk folder as well.
</div>

## 📚 Tactical resources

- 📖 [What is Azure AI Search?](https://learn.microsoft.com/azure/search/search-what-is-azure-search)
- 📖 [Integrated vectorization in Azure AI Search](https://learn.microsoft.com/azure/search/vector-search-integrated-vectorization)
- 📖 [Azure AI Search connector reference](https://learn.microsoft.com/connectors/azureaisearch/)
- 📖 [Add tools to a Copilot Studio agent](https://learn.microsoft.com/microsoft-copilot-studio/advanced-plugin-actions)
- 📖 [Retrieval-Augmented Generation (RAG) overview](https://learn.microsoft.com/azure/search/retrieval-augmented-generation-overview)
