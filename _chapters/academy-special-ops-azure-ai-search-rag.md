---
layout: "chapter"
date: 2026-07-02
title: "Azure AI Search RAG"
short_title: "Azure AI Search RAG"
description: "Azure AI Search 벡터 검색으로 RAG를 구성해 Copilot Studio 에이전트를 조직 문서 기반으로 응답하도록 만드는 Special Ops 랩입니다."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/azure-ai-search-rag/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-07-02"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/azure-ai-search-rag/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🔎 Azure AI Search RAG](https://microsoft.github.io/agent-academy/special-ops/azure-ai-search-rag/)를 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# 🔎 Azure AI Search RAG

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/ai-search-badge.png' | relative_url }}" alt="Azure AI Search RAG 배지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Azure AI Search RAG 배지</figcaption></figure>

에이전트 여러분, 이번 미션 **Operation Vector Vault**의 목표는 Azure AI Search 벡터 검색 기반 **RAG(Retrieval-Augmented Generation)** 를 사용해 Copilot Studio 에이전트가 조직의 실제 문서를 근거로 답변하게 만드는 것입니다. 검색 서비스를 만들고, 이력서 문서를 벡터화해 인덱싱하고, 이를 **HR Knowledge Agent**에 연결해 키워드가 아닌 의미 중심으로 답변하고 출처를 제시하도록 구성합니다.

<div class="info-box note" markdown="1">
**참고**: 이 미션은 **새 Copilot Studio 작성 환경(New Experience)** 기준으로 작성되었습니다(2026-07-02). 오른쪽 위에서 **New Experience**를 켜 둔 상태로 진행하세요. 기존 RAG 가이드와의 핵심 차이는 **Azure AI Search를 더 이상 Knowledge 소스로 추가하지 않고, 커넥터 도구(Connector Tool)로 연결**한다는 점입니다.
</div>

## ❓ Retrieval-Augmented Generation(RAG)이란?

RAG는 모델이 답변을 생성하기 전에 관련 정보를 먼저 검색해, 더 정확하고 신뢰할 수 있는 응답을 만들도록 돕는 기법입니다.

핵심은 두 단계입니다.

- **Retrieval(검색)**: 대규모 데이터에서 관련 정보를 찾음
- **Generation(생성)**: 검색 결과를 바탕으로 답변을 생성함

따라서 모델 내부 기억에만 의존하지 않고, 실제 문서 기반으로 답변해야 하는 Q&A, 리서치, 사내 지식 검색 시나리오에 특히 유용합니다.

## 🧠 왜 벡터 검색인가요?

벡터 검색은 단어 일치가 아니라 **의미 유사성**으로 정보를 찾습니다. 문서를 숫자 벡터로 변환해 질의와 의미적으로 가까운 콘텐츠를 찾아내므로 다음에 강합니다.

- **의미 기반 매칭**: 다른 표현이어도 같은 개념을 연결(예: recruitment / hiring)
- **다국어 검색**: 언어가 달라도 동등한 의미를 탐색
- **다양한 콘텐츠 형식**: 텍스트 문서, PDF 등 복수 형식 검색

동작 방식은 다음과 같습니다.

1. 임베딩 모델로 문서를 벡터로 변환
1. 벡터를 Azure AI Search 인덱스에 저장
1. 사용자 질의도 벡터로 변환해 의미적으로 가까운 결과를 반환

예를 들어 "software engineering skills"를 검색하면 정확히 같은 단어가 없어도 "programming expertise", "development capabilities" 같은 의미상 유사한 후보를 찾을 수 있습니다.

## ⚙️ 사전 요구사항

- **New Experience**가 활성화된 Microsoft Copilot Studio 계정(체험판/유료)
- 리소스 생성 권한이 있는 **Azure 구독**(Azure AI Search, Storage, Azure OpenAI/Microsoft Foundry)
- Copilot Studio 에이전트 생성 및 Azure 리소스 기본 관리 경험

<div class="info-box note" markdown="1">
**참고**: Exercise 1~2는 Copilot Studio 밖의 **Azure Portal** 및 **Microsoft Foundry**에서 진행합니다. Copilot Studio 변경점은 **Exercise 3**부터 반영됩니다.
</div>

## 🎯 시나리오

Contoso HR 팀은 여러 형식·여러 언어의 이력서를 대량으로 다뤄야 합니다. 채용 담당자가 "스페인어 가능 + Python 경험자"처럼 자연어로 질문하면, 실제 이력서 문서를 근거로 정확하게 답변하는 에이전트가 필요합니다. 여러분의 역할은 Azure AI Search 기반 RAG를 연결하는 에이전트 빌더입니다.

## 🧪 Exercise 1 — Azure AI Search 서비스 준비

### Step 1 — Azure AI Search 서비스 생성

[Azure Portal](https://portal.azure.com)에서 Azure AI Search 서비스를 생성합니다.

1. **Create a resource**에서 `Azure AI Search` 검색
1. **Azure AI Search** 선택 후 **Create**
1. 아래 값 입력 후 **Review + Create**
   - **Subscription**: 사용 중 Azure 구독
   - **Resource group**: 기존 그룹 또는 신규(예: `agent-academy-rg`)
   - **Service name**: 전역 고유 이름(예: `agentacademy-ai-search`)
   - **Location**: 다른 리소스와 동일 리전
   - **Pricing tier**: **Basic**

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-search-01.png' | relative_url }}" alt="Azure AI Search 서비스 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Azure AI Search 서비스 생성</figcaption></figure>

생성 후 아래 값을 복사해 둡니다.

1. **Overview**의 **URL**(검색 endpoint)
1. **Settings → Keys**의 **Primary admin key**

<div class="info-box note" markdown="1">
**팁**: Exercise 3에서 Copilot Studio Azure AI Search 연결을 만들 때 endpoint URL과 admin key가 필요합니다.
</div>

### Step 2 — Azure Storage 계정 생성

인덱싱 전 문서를 저장할 Azure Storage 계정을 생성합니다.

1. Azure Portal에서 **Create a resource** → `Storage Account` 검색
1. **Storage Account** 선택 후 **Create**
1. 아래 값 입력 후 **Review + Create**
   - **Subscription**: 사용 중 Azure 구독
   - **Resource group**: Azure AI Search와 동일 그룹
   - **Storage account name**: 전역 고유 이름(예: `agentacademystorage`)
   - **Region**: Azure AI Search와 동일 리전
   - **Performance**: Standard
   - **Redundancy**: LRS

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-storage-01.png' | relative_url }}" alt="Azure Storage 계정 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Azure Storage 계정 생성</figcaption></figure>

### Step 3 — 텍스트 임베딩 모델 배포

벡터 검색을 위해 임베딩 모델이 필요합니다.

1. Azure OpenAI 서비스가 없다면 먼저 생성합니다(Standard S0 권장).
1. [Microsoft Foundry](https://oai.azure.com/portal)에서 Azure OpenAI 인스턴스를 선택합니다.
1. **Deployments** → **+ Deploy model** → **Deploy base model**
1. `text-embedding-ada-002` 검색 후 **Confirm**
1. 배포값 설정
   - **Deployment name**: `text-embeddings`
   - **Deployment type**: Standard
   - **Model version**: 2 (Default)
   - **Content Filter**: DefaultV2
1. **Deploy**를 선택하고 완료까지 대기

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/openai-embedding-01.png' | relative_url }}" alt="텍스트 임베딩 모델 배포" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>text-embedding-ada-002 배포</figcaption></figure>

<div class="info-box note" markdown="1">
**`text-embedding-ada-002`의 역할**: 텍스트를 의미 기반 숫자 벡터로 변환해, 언어와 표현이 달라도 의미상 유사한 문서를 찾을 수 있게 합니다. Azure AI Search와 결합하면 키워드 정확 일치가 아닌 문맥 기반 검색이 가능합니다.
</div>

## 🧪 Exercise 2 — 검색 인덱스 생성 및 데이터 적재

### Step 1 — 샘플 문서 준비

실습용 이력서 문서를 다운로드해 압축 해제합니다.

- [fictitious_resumes.zip](https://microsoft.github.io/agent-academy/special-ops/azure-ai-search-rag/assets/fictitious_resumes%20(1).zip)

샘플 문서에는 후보자 이름/연락처, 기술 역량, 경력, 학력, 언어 능력, 자격증 같은 정보가 포함됩니다. 문서가 여러 언어로 작성되어 있어도 임베딩 + 벡터 인덱스에서 검색 가능합니다.

### Step 2 — Storage Account에 샘플 문서 업로드

1. [Azure Portal](https://portal.azure.com/)에서 Storage Account 인스턴스를 엽니다.
1. 왼쪽 **Data storage** 아래 **Containers** 선택
1. **+ Add container** 선택
1. 컨테이너 이름 입력(예: `resumes`) 후 **Create**

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-storage-02.png' | relative_url }}" alt="컨테이너 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>스토리지 컨테이너 생성</figcaption></figure>

컨테이너 생성 후 파일 업로드:

1. **Upload** 선택
1. 이력서 파일 드래그 앤 드롭 또는 **Browse for files**로 선택
1. **Upload**를 눌러 업로드 완료 대기

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-storage-03.png' | relative_url }}" alt="이력서 파일 업로드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>이력서 파일 업로드</figcaption></figure>

### Step 3 — 통합 벡터화(Integrated Vectorization)로 인덱스 채우기

1. Azure AI Search 인스턴스로 돌아가 상단 **Import data (new)** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-search-02.png' | relative_url }}" alt="Import data 시작" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Import data (new)</figcaption></figure>

1. 데이터 원본으로 **Azure Blob Storage** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-search-03.png' | relative_url }}" alt="데이터 원본 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Azure Blob Storage 선택</figcaption></figure>

1. 시나리오로 **RAG** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-search-04.png' | relative_url }}" alt="RAG 시나리오 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>RAG 시나리오 선택</figcaption></figure>

다음과 같이 구성합니다.

1. **Azure Blob Storage**
   1. Subscription: 사용 중 구독
   1. Storage account: 앞에서 만든 계정
   1. Blob container: 이력서를 업로드한 컨테이너
   1. Blob folder: 폴더 구조가 없으면 비워둠
   1. Parsing mode: Default
1. **Vectorize your text**
   1. Kind: Azure OpenAI
   1. Azure OpenAI service: 본인 인스턴스
   1. Model deployment: `text-embeddings`
   1. Authentication type: API Key(기본값)
   1. 추가 비용 안내 체크 후 **Next**
1. **Vectorize your images**: 필요 없으면 **Next**
1. **Advanced ranking and relevancy**: 기본값으로 **Next**
1. **Review and create**
   1. index/indexer/data source/skill set 접두사 입력(예: `resumes`)
   1. 설정 검토 후 **Create**

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-search-05.png' | relative_url }}" alt="벡터 인덱스 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>벡터 인덱스 생성</figcaption></figure>

생성이 완료되면 **Start searching**으로 인덱스를 확인합니다. 각 레코드에 `text_vector` 필드가 생성되어 임베딩 결과가 저장된 것을 볼 수 있습니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/azure-search-06.png' | relative_url }}" alt="인덱스 검색 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>인덱스 검색 확인</figcaption></figure>

## 🧪 Exercise 3 — RAG 에이전트 만들기

### Step 1 — HR Knowledge Agent 생성

1. [Microsoft Copilot Studio](https://copilotstudio.microsoft.com)에 로그인하고 **New experience**가 켜져 있는지 확인

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/new-experience.png' | relative_url }}" alt="New experience 활성화" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>New experience 확인</figcaption></figure>

1. **New Agent** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/new-agent.png' | relative_url }}" alt="새 에이전트 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>New Agent 선택</figcaption></figure>

1. 이름 입력

```text
HR Knowledge Agent
```

1. **Instructions**에 아래 텍스트를 붙여넣습니다.

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

1. 오른쪽 위 **Save** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/title-description.png' | relative_url }}" alt="에이전트 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 이름/지시문 저장</figcaption></figure>

### Step 2 — Azure AI Search를 도구로 연결

<div class="info-box note" markdown="1">
**중요**: 새 Copilot Studio 환경에서는 **Azure AI Search가 Knowledge 소스가 아닙니다**. **Add knowledge**에서는 Public websites, SharePoint, OneDrive만 보이며, Azure AI Search는 **커넥터 도구(Add tool)** 로 연결해야 합니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/rag-knowledge-no-azure-search.png' | relative_url }}" alt="Add knowledge에는 Azure AI Search가 없음" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add knowledge 검색 결과</figcaption></figure>
</div>

1. 오른쪽 **Agent configuration** 패널의 **Tools** 카드에서 **Add tool** 선택
1. `Azure AI Search` 검색 후 커넥터 액션 목록 확인
   - Semantic Hybrid Search
   - Search vectors with natural language
   - Get search indexes
   - Get index statistics

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/rag-tool-azure-search-actions.png' | relative_url }}" alt="Azure AI Search 커넥터 액션" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Azure AI Search 도구 선택</figcaption></figure>

1. **Semantic Hybrid Search**를 선택하고 **Add**
1. 추가된 도구를 열어 **Tool details**에서 Name/Description/Authentication mode(User 또는 Maker)를 설정
1. Exercise 1에서 저장한 **endpoint URL**, **admin key**로 연결을 만들고 `resumes` 인덱스 지정

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/rag-tool-details-auth.png' | relative_url }}" alt="도구 상세 및 인증 모드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Tool details 및 인증 설정</figcaption></figure>

<div class="info-box note" markdown="1">
**팁**: 사용자별 자격 증명이 필요하면 **User**, 제작자 연결을 공용으로 쓰려면 **Maker**를 선택하세요. 공유 HR 지식 베이스라면 보통 **Maker**가 적합합니다.
</div>

1. **Save**를 누르고 버튼이 비활성화(disabled)되는지 확인

<div class="info-box note" markdown="1">
**주의**: 저장하지 않고 빌드 화면을 벗어나면 변경 사항이 사라질 수 있습니다. 항상 Save 버튼 비활성화를 확인하세요.
</div>

## 🧪 Exercise 4 — 에이전트 테스트

1. **Preview** 탭으로 이동
1. 방금 도구를 추가했다면 **New chat**을 눌러 도구 컨텍스트를 새로고침
1. 아래 기본 질의를 테스트

```text
Hello! Can you help me find candidates with software engineering experience?
```

```text
I'm looking for candidates who speak multiple languages. Can you help?
```

```text
Show me candidates with machine learning or AI experience.
```

Semantic Hybrid Search 호출 여부, 출처 인용 여부, 키워드 일치가 아닌 의미 기반 검색 여부를 확인합니다.

<div class="info-box note" markdown="1">
**참고**: 첫 실행 시 Azure AI Search 연결 승인/생성 프롬프트가 나타날 수 있습니다. 연결을 완료한 뒤 메시지를 다시 실행하세요.
</div>

1. 이어서 복합 조건 질의를 테스트

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

결과에서 다중 조건 결합, 근거 설명, 대안 후보 제안, 이력서 기반 인용을 확인합니다.

## ✅ 미션 완료

축하합니다! **Operation Vector Vault** 완료입니다. 이제 Copilot Studio 에이전트가 Azure AI Search 벡터 검색을 통해 조직 문서를 검색하고 근거 기반으로 답변할 수 있습니다.

이번 랩에서 달성한 내용:

- ✅ Azure AI Search 서비스 생성/구성
- ✅ PDF 기반 통합 벡터화 인덱스 구축
- ✅ 새 Copilot Studio 환경에서 Azure AI Search를 Knowledge가 아닌 **도구**로 연결
- ✅ 검색 도구 호출 및 출처 인용을 유도하는 지시문 설계
- ✅ 기본/복합 질의로 의미 기반 검색 검증

## 🏅 완료 배지 받기

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-azure-ai-search-rag/ai-search-badge.png' | relative_url }}" alt="Azure AI Search RAG Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Azure AI Search RAG Badge</figcaption></figure>

배지 신청 폼에 필수 항목을 제출하세요.

[https://aka.ms/agent-academy-special-ops/azure-ai-search-rag/form](https://aka.ms/agent-academy-special-ops/azure-ai-search-rag/form)

검토 후 Global AI Community 이메일로 배지 수령 안내가 발송됩니다.

<div class="info-box note" markdown="1">
**팁**: 메일이 보이지 않으면 스팸/정크 폴더도 확인하세요.
</div>

## 📚 전술 리소스

- 📖 [What is Azure AI Search?](https://learn.microsoft.com/azure/search/search-what-is-azure-search)
- 📖 [Integrated vectorization in Azure AI Search](https://learn.microsoft.com/azure/search/vector-search-integrated-vectorization)
- 📖 [Azure AI Search connector reference](https://learn.microsoft.com/connectors/azureaisearch/)
- 📖 [Add tools to a Copilot Studio agent](https://learn.microsoft.com/microsoft-copilot-studio/advanced-plugin-actions)
- 📖 [Retrieval-Augmented Generation (RAG) overview](https://learn.microsoft.com/azure/search/retrieval-augmented-generation-overview)
