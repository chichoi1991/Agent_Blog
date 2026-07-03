---
layout: "chapter"
date: 2026-03-11
title: "미션 07: 멀티모달 프롬프트로 이력서 내용 추출하기"
short_title: "07. 멀티모달 프롬프트"
description: "고급 AI 기능으로 문서와 이미지를 처리합니다"
order: 7
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/07-multimodal-prompts/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-11"
canonical_url: "https://microsoft.github.io/agent-academy/operative/07-multimodal-prompts/"
image: "/assets/academy/operative-07-multimodal-prompts/07-multi-modal-prompts-thumbnail.png"
---
<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 07: Extracting Resume Contents with Multimodal Prompts](https://microsoft.github.io/agent-academy/operative/07-multimodal-prompts/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <a href="https://youtu.be/icP_qH8LFK8?si=VJjtdVi-ytUq0ymg" target="_blank" rel="noopener">
    <img src="{{ '/assets/academy/operative-07-multimodal-prompts/07-multi-modal-prompts-thumbnail.png' | relative_url }}" alt="멀티모달" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
</figure>

## 🎯 미션 브리프

환영합니다, Operative. 이전 미션들을 통해 강력한 Agent 오케스트레이션 기술을 익혔지만, 이제는 판도를 바꿀 핵심 역량인 **멀티모달 문서 분석**을 잠금 해제할 시간입니다.

이번 임무의 코드명은 **Document Resume Recon**입니다. 목표는 어떤 문서에서든 구조화된 데이터를 정밀하게 추출하는 것입니다. Agent는 텍스트를 쉽게 처리할 수 있지만, 현실에서는 PDF, 이미지, 복잡한 문서를 매일 다뤄야 합니다. 이력서는 계속 쌓이고, 인보이스는 처리해야 하며, 각종 양식은 즉시 디지털화해야 합니다.

이 미션을 마치면 여러분은 텍스트 전용 Agent 빌더에서 **멀티모달 전문가**로 진화하게 됩니다. 사람 분석가처럼 문서를 읽고 이해하면서도, AI의 속도와 일관성으로 처리하는 방법을 배우게 됩니다. 미션이 끝날 무렵에는 채용 워크플로와 통합되는 완전한 이력서 추출 시스템을 구축하게 됩니다.

여기서 배우는 기술은 다음 미션에서 다루는 고급 데이터 grounding 작업의 핵심 기반이 됩니다.

<div class="info-box note" markdown="1">
**참고** — 이 실습의 스크린샷과 Copilot Studio 화면이 다르게 보인다면, 오른쪽 위의 **New Experience**를 꺼서 여기서 사용하는 **classic experience**로 전환하세요.
</div>

## 🔎 목표

이 미션에서는 다음을 배우게 됩니다.

1. multimodal prompts가 무엇인지, 그리고 상황에 따라 어떤 AI 모델을 사용해야 하는지
1. 이미지 및 문서 입력을 포함한 프롬프트를 구성하는 방법
1. 구조화된 데이터 추출을 위해 프롬프트 출력을 JSON으로 형식화하는 방법
1. 문서 분석을 위한 프롬프트 엔지니어링 모범 사례
1. multimodal prompts를 Agent Flow와 통합하는 방법

## 🧠 multimodal prompts 이해하기

### 프롬프트가 "멀티모달"이라는 것은 무엇일까요?

기존 프롬프트는 텍스트만 처리합니다. 하지만 multimodal prompts는 여러 유형의 콘텐츠를 처리할 수 있습니다.

- **Text**: 작성된 지침과 콘텐츠
- **Images**: 사진, 스크린샷, 차트, 다이어그램 (.PNG, .JPG, .JPEG)
- **Documents**: 인보이스, 이력서, 양식 (.PDF)

이 기능을 사용하면 이력서 분석, 인보이스 처리, 양식 데이터 추출 같은 강력한 시나리오를 구현할 수 있습니다.

### 워크플로에서 멀티모달이 중요한 이유

조직은 매일 다음과 같은 문서 처리 과제를 마주합니다.

- **Resume screening**: 수백 개의 이력서를 수동으로 읽는 데 많은 시간이 소요됨
- **Invoice processing**: 형식이 제각각인 문서에서 공급업체 정보, 금액, 날짜를 추출해야 함
- **Form analysis**: 종이 양식을 디지털 데이터로 전환해야 함

multimodal prompts는 AI의 언어 이해 능력과 시각 분석 기능을 결합해 이러한 병목을 제거합니다. 즉, AI가 텍스트만큼 효과적으로 문서도 처리할 수 있게 됩니다.

### 일반적인 비즈니스 시나리오

다음은 multimodal prompts를 적용할 수 있는 예시입니다.

| 시나리오 | 작업 | 예시 출력 필드 |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| **Resume screening** | 후보자의 이름, 이메일, 전화번호, 현재 직함, 경력 연수, 핵심 기술을 추출합니다. | Candidate Name, Email Address, Phone Number, Current Job Title, Years of Experience, Key Skills |
| **Invoice processing** | 이 인보이스에서 공급업체 정보, 인보이스 날짜, 총금액, 품목 내역을 추출합니다. | Vendor Name, Invoice Date, Total Amount, Invoice Line Items |
| **Form analysis** | 이 신청서를 분석하고 입력된 모든 필드를 추출합니다. | Field Name (e.g., Applicant Name), Entered Value (e.g., John Doe), ... |
| **ID document verification** | 이 신분증 문서에서 이름, ID 번호, 만료일, 주소를 추출합니다. 모든 텍스트가 명확히 읽히는지 확인하고, 불명확한 구간이 있으면 표시합니다. | Full Name, Identification Number, Expiration Date, Address, Unclear Sections Flag |

## ⚙️ AI Builder에서 모델 선택하기

AI Builder는 특정 작업에 최적화된 여러 모델을 제공합니다. 어떤 모델을 써야 하는지 이해하는 것은 성공에 매우 중요합니다.

<div class="info-box note" markdown="1">
**참고: 2025년 9월 기준** — AI Builder 모델은 정기적으로 업데이트되므로, 현재 사용 가능한 모델은 최신 [AI Builder model settings documentation](https://learn.microsoft.com/ai-builder/prompt-modelsettings)에서 확인하세요.
</div>

### 모델 비교

아래의 모든 모델은 vision 및 문서 처리를 지원합니다.

| Model | 💰Cost | ⚡Speed | ✅Best for |
|-------|------|-------|----------|
| **GPT-4.1 mini** | Basic (most cost-effective) | Fast | Standard document processing, summarization, budget-conscious projects |
| **GPT-4.1** | Standard | Moderate | Complex documents, advanced content creation, high accuracy needs |
| **o3** | Premium | Slow (reasons first) | Data analysis, critical thinking, sophisticated problem-solving |
| **GPT-5 chat** | Standard | Enhanced | Latest document understanding, highest response accuracy |
| **GPT-5 reasoning** | Premium | Slow (complex analysis) | Most sophisticated analysis, planning, advanced reasoning |

### Temperature 설정 이해하기

Temperature는 AI 응답이 얼마나 창의적이거나 예측 가능할지를 제어합니다.

- **Temperature 0**: 가장 예측 가능하고 일관된 결과(데이터 추출에 가장 적합)
- **Temperature 0.5**: 창의성과 일관성의 균형
- **Temperature 1**: 최대 창의성(콘텐츠 생성에 가장 적합)

문서 분석에는 일관된 데이터 추출을 위해 **temperature 0**을 사용하세요.

## 📊 출력 형식: Text vs JSON

후속 처리 단계에서 무엇을 할지에 따라 올바른 출력 형식을 고르는 것이 매우 중요합니다.

### Text 출력을 사용할 때

Text 출력은 다음과 같은 경우에 적합합니다.

- 사람이 읽기 쉬운 요약
- 단순 분류
- 구조화된 처리가 필요 없는 콘텐츠

### JSON 출력을 사용할 때

JSON 출력은 다음과 같은 경우에 필수적입니다.

- 구조화된 데이터 추출
- 데이터베이스 또는 시스템과의 통합
- Power Automate 흐름 처리
- 일관된 필드 매핑

### JSON 모범 사례

1. **명확한 필드 이름 정의**: 설명적이고 일관된 이름을 사용합니다.
1. **예시 제공**: 각 필드에 대한 샘플 출력과 값을 포함합니다.
1. **데이터 형식 지정**: 날짜, 숫자, 텍스트에 대한 예시를 포함합니다.
1. **누락 데이터 처리**: null 또는 빈 값 처리 방식을 미리 설계합니다.
1. **구조 검증**: 다양한 문서 유형으로 테스트합니다.

### 문서 품질 고려 사항

- **해상도**: 이미지가 선명하고 읽을 수 있는지 확인합니다.
- **방향**: 처리 전에 문서를 올바른 방향으로 회전합니다.
- **형식 지원**: 사용하는 문서 형식(PDF, JPG, PNG)으로 테스트합니다.
- **크기 제한**: 환경의 파일 크기 제한을 인지합니다.

### 성능 최적화

- **적절한 모델 선택**: 필요할 때만 상위 모델로 업그레이드합니다.
- **프롬프트 최적화**: 대개 더 짧고 명확한 지침이 더 좋은 성능을 냅니다.
- **오류 처리**: 처리할 수 없는 문서에 대한 대응 방안을 마련합니다.
- **비용 모니터링**: 모델마다 소비하는 AI Builder 크레딧이 다릅니다.

## 🧪 Lab 7 - 이력서 추출 시스템 구축하기

이제 멀티모달 지식을 실제로 적용할 차례입니다. 후보자 문서를 분석하고 이를 채용 워크플로에 사용할 구조화된 데이터로 변환하는 종합적인 이력서 추출 시스템을 만들어 보겠습니다.

### 이 미션을 완료하기 위한 사전 준비

1. 다음이 필요합니다.

    - **Mission 06을 완료**하여 멀티 Agent 채용 시스템이 준비되어 있어야 합니다.
    - [Test Resumes](https://download-directory.github.io/?url=https://github.com/microsoft/agent-academy/tree/main/docs/operative/test-data/resumes)에서 샘플 이력서 문서를 다운로드합니다.

### 7.1 멀티모달 프롬프트 만들기

첫 번째 목표는 이력서 문서를 분석하고 구조화된 데이터를 추출할 수 있는 프롬프트를 만드는 것입니다.

1. [Copilot Studio](https://copilotstudio.microsoft.com)에 로그인한 다음, 왼쪽 탐색 메뉴에서 **Tools**를 선택합니다.

1. **+ New tool**을 선택한 뒤 **Prompt**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-new-prompt.png' | relative_url }}" alt="새 프롬프트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 기본 타임스탬프 이름(예: *Custom prompt 09/04/2025, 04:59:11 PM*)에서 프롬프트 이름을 `Summarize Resume`으로 **변경**합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-promptname.png' | relative_url }}" alt="이름 바꾸기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Instructions 필드에 다음 프롬프트를 추가합니다.

    ```text
    You are tasked with extracting key candidate information from a resume and cover letter to facilitate matching with open job roles and creating a summary for application review.
    
    Instructions:
    1. Extract Candidate Details:
        - Identify and extract the candidate’s full name.
        - Extract contact information, specifically the email address.
    2. Create Candidate Summary:
        - Summarize the candidate’s profile as multiline text (max 2000 characters) with the following sections:
            - Candidate name
            - Role(s) applied for if present
            - Contact and location
            - One-paragraph summary
            - Experience snapshot (last 2–3 roles with outcomes)
            - Key projects (1–3 with metrics)
            - Education and certifications
            - Top skills (Top 10)
            - Availability and work authorization
    
    Guidelines:
    - Extract information only from the provided resume and cover letter documents.
    - Ensure accuracy in identifying all details such as contact details and skills.
    - The summary should be concise but informative, suitable for quick application review.
    
    Resume: /document
    CoverLetter: /text
    ```

    <div class="info-box note" markdown="1">
    **팁: Copilot 활용하기** — 자연어로 프롬프트를 생성하려면 "Get started with Copilot"을 사용할 수 있습니다. Copilot에게 이력서를 요약하는 프롬프트를 만들어 달라고 요청해 보세요.
    </div>

1. 입력 매개변수를 **구성**합니다.

    | Parameter | Type | Name | Sample Data |
    |-----------|------|------|-------------|
    | Resume | Image or document | Resume | Upload a sample resume from the test-data folder |
    | CoverLetter | Text | CoverLetter | Here is a Resume! |

1. **Test**를 선택해 프롬프트의 초기 Text 출력을 확인합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-prompt-parameters.png' | relative_url }}" alt="매개변수 설정 및 테스트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

### 7.2 JSON 출력 구성하기

이제 프롬프트가 일반 텍스트가 아니라 구조화된 JSON 데이터를 출력하도록 바꿔 보겠습니다.

1. 프롬프트 Instructions 끝에 다음 JSON 형식 명세를 추가합니다.

    Output Format:
    Provide the output in valid JSON format with the following structure:

    ```text
    
    {
    "CandidateName": "string",
    "Email": "string",
    "Summary": "string max 2000 characters",
    "Skills": [{"item": "Skill 1"}, {"item": "Skill 2"}],
    "Experience": [{"item": "Experience 1"}, {"item": "Experience 2"}]
    }
    ```

1. **Output** 설정을 "Text"에서 **JSON**으로 변경합니다.

1. 다시 **Test**를 선택해 출력이 이제 JSON 형식인지 확인합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-json-prompt.png' | relative_url }}" alt="프롬프트를 JSON으로 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **선택 사항:** 서로 다른 AI 모델을 시험해 출력이 어떻게 달라지는지 확인한 뒤, 다시 기본 모델로 되돌립니다.

1. **Save**를 선택해 프롬프트를 생성합니다.

1. **Configure for use in Agent** 대화 상자가 열리면 **Cancel**을 선택합니다.

    <div class="info-box note" markdown="1">
    **참고: 아직 이것을 도구로 추가하지 않는 이유** — 이 프롬프트는 도구로 직접 추가하는 대신 Agent Flow 안에서 사용합니다. 이렇게 하면 데이터 처리 워크플로를 더 세밀하게 제어할 수 있습니다.
    </div>

### 7.3 프롬프트를 Agent Flow에 추가하기

이제 Dataverse에 저장된 이력서를 처리하는 데 사용할 Agent Flow를 만듭니다.

<div class="info-box note" markdown="1">
**팁: Agent Flow 식(Expression)** — 노드 이름과 식 입력은 이전 노드 이름을 참조하므로, 지시에 나온 이름과 식을 정확히 따라야 합니다. 빠르게 복습하려면 Recruit의 [Agent Flow 미션]({{ '/chapters/academy-recruit-09-add-an-agent-flow/' | relative_url }})을 참고하세요.
</div>

1. Copilot Studio 안에서 **Hiring Agent**로 이동합니다.

1. **Agents** 탭을 선택한 뒤, 자식 Agent인 **Application Intake Agent**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-AppIntakeAgentSelect.png' | relative_url }}" alt="Agent 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Tools** 패널에서 **+ Add** → **+ New tool** → **Agent flow**를 선택합니다.

1. When an agent calls the flow 노드에서 **+ Add an input**을 사용해 다음 매개변수를 추가합니다.

    | Type | Name | Description |
    |------|------|-------------|
    | Text | ResumeNumber | Be sure to use [ResumeNumber]. This must always start with the letter R |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-AgentFlowTrigger.png' | relative_url }}" alt="트리거" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 첫 번째 노드 아래의 **+** Insert action 아이콘을 선택하고, **Dataverse list rows**를 검색한 뒤 **List rows** 작업을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-AddListRows.png' | relative_url }}" alt="List Rows 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. List rows 노드의 **ellipsis (...)**를 선택해 **Rename**으로 `Get Resume Record`로 이름을 바꾼 다음, 아래와 같이 설정합니다.

    | Property | How to Set | Value |
    |----------|------------|-------|
    | **Table name** | Select | Resumes |
    | **Filter rows** | Dynamic data (thunderbolt icon) | `ppa_resumenumber eq 'ResumeNumber'` Replace **ResumeNumber** with **When an agent calls the flow** → **ResumeNumber** |
    | **Row count** | Enter | 1 |

    <div class="info-box note" markdown="1">
    **팁: 쿼리를 최적화하세요!** — 이 방법을 실제 운영 환경에서 사용할 때는 Agent Flow에 필요한 열만 선택하도록 항상 제한해야 합니다.
    </div>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-1.png' | relative_url }}" alt="이력서 레코드 가져오기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Get Resume Record 노드 아래의 **+** Insert action 아이콘을 선택하고, **Dataverse download**를 검색한 다음 **Download a file or an image** 작업을 선택합니다.

    <div class="info-box note" markdown="1">
    **팁: 올바른 작업을 선택하세요!** — 이름 끝에 "from selected environment"가 붙은 작업은 선택하지 않도록 주의하세요.
    </div>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-DataverseDownload.png' | relative_url }}" alt="Dataverse 다운로드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이전과 마찬가지로 작업 이름을 `Download Resume`으로 바꾸고, 다음 매개변수를 설정합니다.

    | Property | How to Set | Value |
    |----------|------------|-------|
    | **Table name** | Select | Resumes |
    | **Row ID** | Expression (fx icon) | `first(body('Get_Resume_Record')?['value'])?['ppa_resumeid']` |
    | **Column name** | Select | Resume PDF |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-2.png' | relative_url }}" alt="이력서 다운로드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 Download Resume 아래의 **+** Insert action 아이콘을 선택하고, **AI capabilities** 아래에서 **Run a prompt**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-RunPrompt.png' | relative_url }}" alt="프롬프트 실행" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 작업 이름을 `Summarize Resume`으로 바꾸고 다음 매개변수를 설정합니다.

    | Property | How to Set | Value |
    |----------|------------|-------|
    | **Prompt** | Select | Summarize Resume |
    | **CoverLetter** | Expression (fx icon) | `first(body('Get_Resume_Record')?['value'])?['ppa_coverletter']` |
    | **Resume** | Dynamic data (thunderbolt icon) | Download Resume → File or image content |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-3.png' | relative_url }}" alt="이력서 요약 프롬프트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    <div class="info-box note" markdown="1">
    **팁: 프롬프트 매개변수** — 여기서 채우는 매개변수는 프롬프트를 만들 때 입력 매개변수로 구성했던 항목과 동일하다는 점에 주목하세요.
    </div>

### 7.4 후보자 레코드 만들기

다음 단계에서는 Prompt가 반환한 정보를 이용해, 해당 후보자가 아직 없다면 새 candidate 레코드를 생성해야 합니다.

1. Summarize Resume 노드 아래의 **+** Insert action 아이콘을 선택하고, **Dataverse list**를 검색한 뒤 **List rows** 작업을 선택합니다.

1. 노드 이름을 `Get Existing Candidate`로 바꾸고 아래와 같이 설정합니다.

    | Property | How to Set | Value |
    |----------|------------|-------|
    | **Table name** | Select | Candidates |
    | **Filter rows** | Dynamic data (thunderbolt icon) | `ppa_email eq 'Email'`  **Replace** `Email` with **Summarize Resume → Email** |
    | **Row count** | Enter | 1 |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-4.png' | relative_url }}" alt="기존 후보자 가져오기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Get Existing Candidate 노드 아래의 **+** Insert action 아이콘을 선택하고, **Control**을 검색한 다음 **See more**를 선택해 **Condition** 작업을 찾습니다.

1. Condition 속성에서 다음 조건을 설정합니다.

    | Condition | Operator | Value |
    |-----------|----------|-------|
    | Expression (fx icon): `length(outputs('Get_Existing_Candidate')?['body/value'])` | is equal to | 0 |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-5.png' | relative_url }}" alt="기존 후보자 조건" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **True** 분기에서 **+** Insert action 아이콘을 선택하고, **Dataverse add**를 검색한 뒤 **Add a new row** 작업을 선택합니다.

1. 노드 이름을 `Add a New Candidate`로 바꾸고 다음과 같이 설정합니다.

    | Property | How to Set | Value |
    |----------|------------|-------|
    | **Table name** | Select | Candidates |
    | **Candidate Name** | Dynamic data (thunderbolt icon) | Summarize Resume → `CandidateName` |
    | **Email** | Dynamic data (thunderbolt icon) | Summarize Resume → `Email` |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-6.png' | relative_url }}" alt="새 후보자 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

### 7.5 이력서 업데이트 및 Flow 출력 구성하기

이제 이력서 레코드를 업데이트하고 Agent에 어떤 데이터를 반환할지 구성해 Flow를 완성합니다.

1. Condition 아래의 **+** Insert action 아이콘을 선택하고, **Dataverse update**를 검색한 뒤 **Update a row** 작업을 선택합니다.

1. 제목을 선택해 노드 이름을 `Update Resume`으로 바꾸고, **Show all**을 선택한 다음 다음 매개변수를 설정합니다.

    | Property | How to Set | Value |
    |----------|------------|-------|
    | **Table name** | Select | Resumes |
    | **Row ID** | Expression (fx icon) | `first(body('Get_Resume_Record')?['value'])?['ppa_resumeid']` |
    | **Summary** | Dynamic data (thunderbolt icon) | Summarize Resume → Text |
    | **Candidate (Candidates)** | Expression (fx icon) | `concat('ppa_candidates/',if(equals(length(outputs('Get_Existing_Candidate')?['body/value']), 1), first(outputs('Get_Existing_Candidate')?['body/value'])?['ppa_candidateid'], outputs('Add_a_New_Candidate')?['body/ppa_candidateid']))` |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-7.png' | relative_url }}" alt="이력서 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Respond to the agent** 노드를 선택한 뒤 **+ Add an output**을 사용해 다음과 같이 구성합니다.

    | Type | Name | How to Set | Value | Description |
    | ---- | ---- | ---------- | ----- | ----------- |
    | Text | `CandidateName` | Dynamic data (thunderbolt icon) | Summarize Resume → See more → CandidateName | The [CandidateName] given on the Resume |
    | Text | `CandidateEmail` | Dynamic data (thunderbolt icon) | Summarize Resume → See more → Email | The [CandidateEmail] given on the Resume |
    | Text | `CandidateNumber` | Expression (fx icon) | `if(equals(length(outputs('Get_Existing_Candidate')?['body/value']), 1), first(outputs('Get_Existing_Candidate')?['body/value'])['ppa_candidatenumber'], outputs('Add_a_New_Candidate')?['body/ppa_candidatenumber'])` | The [CandidateNumber] of the new or existing candidate |
    | Text | `ResumeSummary` | Dynamic data (thunderbolt icon) | Summarize Resume → See more → body/responsev2/predictionOutput/structuredOutput | The resume summary and details in JSON form |

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-8.png' | relative_url }}" alt="Agent에 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 오른쪽 위의 **Save draft**를 선택합니다. Agent Flow는 아래 이미지와 비슷해야 합니다. Update Resume 단계가 Condition 블록 바깥에 있는지 반드시 확인하세요.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-resume-9.png' | relative_url }}" alt="이력서 요약 Agent Flow" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Overview** 탭을 선택한 다음 **Details** 패널에서 **Edit**를 선택합니다.

    1. **Flow name**:`Summarize Resume`
    1. **Description**:

    ```text
    Summarize an existing Resume stored in Dataverse using a [ResumeNumber] as input, return the [CandidateNumber], and resume summary JSON
    ```

1. **Save**를 선택합니다.

1. 다시 **Designer** 탭으로 돌아가 **Publish**를 선택합니다.

### 7.6 Flow를 Agent에 연결하기

이제 Flow를 도구로 추가하고, Agent가 이를 사용하도록 구성합니다.

1. Copilot Studio 안에서 **Hiring Agent**를 엽니다.

1. **Agents** 탭을 선택하고 **Application Intake Agent**를 엽니다.

1. **Tools** 패널에서 **+ Add a tool** -> **Flow** -> **Summarize Resume** **(Agent Flow)**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-SummarizeResumeFlowselect.png' | relative_url }}" alt="이력서 요약 Agent Flow 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Add and configure**를 선택합니다.

1. 도구 설정을 다음과 같이 구성합니다.

    | Setting | Value |
    |---------|-------|
    | **Description** | Summarize an existing Resume stored in Dataverse using a [ResumeNumber] as input, return the [CandidateNumber], and resume summary JSON |
    | **When this tool may be used** | Only when referenced by topics or agents |

1. **Save**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-configure-summarize-resume-tool.png' | relative_url }}" alt="이력서 요약 도구 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Hiring Agent 안에서 Tools를 선택하면, 이제 두 도구 모두 **Application Intake Agent**에서 사용할 수 있는 것으로 표시됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-agent-tools.png' | relative_url }}" alt="Agent 도구" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Application Intake Child** Agent의 Instructions로 이동해, 다음으로 시작하는 두 문단을 **삭제**합니다.

    - `2.Post-Upload`
    - `Process for Resume Upload via Email`

1. 남아 있는 Instructions 끝에 다음 지침을 **추가**합니다.

    ```text
    2. Post-Upload Processing  
        - After uploading, be sure to also output the [ResumeNumber] in all messages
        - Pass [ResumeNumber] to /Summarize Resume  - Be sure to use the correct value that will start with the letter R.
        - Be sure to also output the [CandidateNumber] in all messages
        - Use the [ResumeSummary] to output a summary of the processed Resume and candidate
    ```

    `/Summarize Resume`는 슬래시(`/`)를 입력하거나 `/Summarize`를 선택해 **Summarize Resume agent flow** 참조를 삽입하는 방식으로 바꿔 넣습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-summarize-instructions-update.png' | relative_url }}" alt="지침 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Save**를 선택합니다.

### 7.7 Agent 테스트하기

이제 전체 멀티모달 시스템이 올바르게 동작하는지 테스트합니다.

1. **테스트 시작**:

    - **Test**를 선택해 테스트 패널을 엽니다.
    - 다음을 입력합니다: `Here is a candidate Resume`
    - [Test Resumes](https://download-directory.github.io/?url=https://github.com/microsoft/agent-academy/tree/main/docs/operative/test-data/resumes)에서 샘플 이력서 중 하나를 업로드합니다.

1. **결과 확인**:
    - 메시지와 이력서를 전송한 뒤 Resume Number(형식: R#####)를 받는지 확인합니다.
    - Candidate Number와 요약도 함께 받는지 확인합니다.
    - 활동 맵을 열어 Resume upload 도구와 Summarize Resume 도구가 모두 실행되는지, 그리고 Summary Prompt의 출력이 Agent에 전달되는지 확인합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-test-result.png' | relative_url }}" alt="테스트 결과" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **데이터 지속성 확인**:
    - [Power Apps](https://make.powerapps.com)로 이동합니다.
    - **Apps** → **Hiring Hub** → **Play**를 엽니다.
    - **Resumes**로 이동해 이력서가 업로드되고 처리되었는지 확인합니다. 요약 정보와 연결된 candidate 레코드가 모두 있어야 합니다.
    - **Candidates**에서 추출된 후보자 정보를 확인합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-07-multimodal-prompts/7-resume-in-dataverse.png' | relative_url }}" alt="후보자 및 요약이 포함된 이력서" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    - 프로세스를 다시 실행하면 새 레코드를 만드는 대신, 이력서에서 추출한 이메일을 기준으로 기존 Candidate를 사용해야 합니다.

<div class="info-box note" markdown="1">
**문제 해결** —

- **이력서가 처리되지 않음**: 파일이 PDF이며 크기 제한 이하인지 확인합니다.
- **후보자가 생성되지 않음**: 이력서에서 이메일이 올바르게 추출되었는지 확인합니다.
- **JSON 형식 오류**: 프롬프트 지침에 정확한 JSON 구조가 포함되어 있는지 확인합니다.
- **Flow 오류**: 모든 Dataverse 연결과 식이 올바르게 구성되었는지 점검합니다.
</div>

### 운영 환경 준비

이 항목은 이번 미션의 필수 범위는 아니지만, 이 Agent Flow를 운영 환경 수준으로 준비하려면 다음 사항도 고려할 수 있습니다.

1. **오류 처리** - Resume Number를 찾지 못했거나 프롬프트가 문서를 파싱하지 못한 경우, Agent에 명확한 오류를 반환하도록 오류 처리를 추가해야 합니다.
1. **기존 Candidates 업데이트** - 이메일로 후보자를 찾은 뒤, 이름을 이력서에 있는 이름에 맞춰 업데이트할 수 있습니다.
1. **Resume 요약과 Candidate 생성 분리** - 이 기능을 더 유지보수하기 쉬운 작은 Agent Flow로 나누고, Agent가 이를 순서대로 사용하도록 지시할 수 있습니다.

## 🎉 미션 완료

훌륭합니다, Operative! **Document Resume Recon** 임무가 완료되었습니다. 이제 여러분은 multimodal prompts를 성공적으로 익혔고, 어떤 문서에서도 구조화된 데이터를 정밀하게 추출할 수 있게 되었습니다.

이번 미션에서 달성한 내용은 다음과 같습니다.

**✅ multimodal prompt 숙련**  
이제 multimodal prompts가 무엇인지 이해하고, 최적의 결과를 위해 상황에 맞는 AI 모델을 선택할 수 있습니다.

**✅ 문서 처리 전문성 확보**  
이미지와 문서 입력을 포함한 프롬프트를 구성하고, 구조화된 데이터 추출을 위해 출력을 JSON으로 형식화하는 방법을 익혔습니다.

**✅ 이력서 추출 시스템 구축**  
후보자 문서를 처리하고 채용 워크플로와 통합하는 완전한 이력서 추출 시스템을 만들었습니다.

**✅ 모범 사례 적용**  
문서 분석을 위한 프롬프트 엔지니어링 모범 사례를 적용하고, multimodal prompts를 Agent Flows와 통합했습니다.

**✅ 고급 처리의 기반 마련**  
향후 미션에서 추가할 고급 데이터 grounding 기능을 위해 문서 분석 역량을 한층 강화했습니다.

🚀 **다음 미션:** 미션 08에서는 Dataverse의 실시간 데이터를 활용해 프롬프트를 강화하고, 변화하는 비즈니스 요구 사항에 적응하는 동적 AI 솔루션을 만드는 방법을 배우게 됩니다.

⏩ [미션 08로 이동]({{ '/chapters/academy-operative-08-dataverse-grounding/' | relative_url }}): Dataverse grounding으로 프롬프트 강화하기

## 📚 전술 자료

📖 [Create a prompt](https://learn.microsoft.com/ai-builder/create-a-custom-prompt?WT.mc_id=power-power-182762-scottdurow)

📖 [Add text, image, or document input to your prompt](https://learn.microsoft.com/ai-builder/add-inputs-prompt?WT.mc_id=power-182762-scottdurow)

📖 [Process responses with JSON output](https://learn.microsoft.com/ai-builder/process-responses-json-output?WT.mc_id=power-182762-scottdurow)

📖 [Model selection and temperature settings](https://learn.microsoft.com/ai-builder/prompt-modelsettings?WT.mc_id=power-182762-scottdurow)

📖 [Use your prompt in Power Automate](https://learn.microsoft.com/ai-builder/use-a-custom-prompt-in-flow?WT.mc_id=power-182762-scottdurow)

📺 [AI Builder: JSON outputs in prompt builder](https://www.youtube.com/watch?v=F0fGnWrRY_I)
