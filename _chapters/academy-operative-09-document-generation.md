---
layout: "chapter"
title: "🚨 미션 09: 후보자 면접 질문 문서 생성"
short_title: "09. 문서 생성"
description: "AI 프롬프트에서 문서 생성을 구현합니다"
order: 9
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/09-document-generation/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-11"
canonical_url: "https://microsoft.github.io/agent-academy/operative/09-document-generation/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 09: Generate a Candidate Interview Questions Document](https://microsoft.github.io/agent-academy/operative/09-document-generation/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <a href="https://youtu.be/GYSEI0jbCvk?si=lYPZ4cmlxZ8-XBmi" target="_blank" rel="noopener">
    <img src="{{ '/assets/academy/operative-09-document-generation/09-doc-gen_thumbnail_PlayButton.png' | relative_url }}" alt="문서 생성 워크스루 영상 썸네일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
</figure>

## 🎯 미션 브리핑

환영합니다, Operative. 이전 미션들을 통해 프롬프트의 강력함을 확인했습니다. 멀티모달 문서 분석과 Dataverse 데이터로 프롬프트를 그라운딩하는 방법을 배웠습니다. 이제 프롬프트의 또 다른 기능인 **문서 생성**을 해제할 차례입니다.

이번 임무의 이름은 **Operation Doc Assembly** 입니다. 이 작업에서는 프롬프트로 면접 준비 질문 Word 문서를 만들고, 에이전트에서 그 문서를 호출하게 됩니다.

<div class="info-box note" markdown="1">
**참고** — 이 수업의 스크린샷과 Copilot Studio 화면이 다르게 보인다면 오른쪽 위의 **New Experience** 를 끄고, 여기서 사용하는 **classic experience** 로 전환하세요.
</div>

## 🔎 목표

이 미션에서는 다음을 배웁니다.

1. 프롬프트가 Word 문서로 출력되도록 구성하는 방법
1. 프롬프트에서 사용할 Word 템플릿을 서식 지정하는 방법
1. 에이전트에서 프롬프트를 실행하는 방법

## 🧪 랩 9 - 면접 문서 생성

채용 지원서가 추가되면, 상세한 면접 문서를 준비하는 과정을 자동화하고 싶습니다. 이 문서는 지원자의 핵심 정보(이름, 현재 역할, 경력 등), 역할 정보(직무명, 요구 사항)를 요약하고, 지원자의 배경과 지원한 역할을 바탕으로 구체적인 맞춤형 면접 질문을 생성하는 Word 문서여야 합니다.

### 이 미션을 완료하기 위한 사전 준비

1. 이 미션을 시작하기 전에 다음이 필요합니다.

    - **[미션 08]({{ '/chapters/academy-operative-08-dataverse-grounding/' | relative_url }})을 완료** 하고 에이전트를 준비해 두었으며, Dataverse 그라운딩을 충분히 이해하고 있어야 합니다.

### 9.1 프롬프트 만들기

첫 번째 목표는 채용 공고와 후보자 프로필을 분석하여 맞춤형 면접 질문을 생성할 수 있는 프롬프트를 만드는 것입니다.

1. [Copilot Studio](https://copilotstudio.microsoft.com) 에 로그인한 다음 왼쪽 탐색에서 **Tools** 를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/ToolsSelect.png' | relative_url }}" alt="Tools 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **+ New tool** 버튼을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/NewToolBtn.png' | relative_url }}" alt="새 도구 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Prompt** 를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/NewPromptBtn.png' | relative_url }}" alt="새 프롬프트 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 기본 타임스탬프 이름(예: *Custom prompt 09/04/2025, 04:59:11 PM*)을 `Interview Question Document Prep` 으로 **이름 변경** 합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/PromptName.png' | relative_url }}" alt="프롬프트 이름 변경" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Instructions 필드에 다음 프롬프트를 추가합니다.

    ```text
    You are tasked with evaluating a candidate’s resume against a specific job listing description and generating a targeted set of interview questions to support structured candidate screening.
    ### Instructions
    
    1. **Extract Candidate Details:**
        - Identify and extract the candidate’s full name.
        - Extract contact information, specifically the email address.
        - Identify the candidate’s current or most recent job title.
        - Extract location if present.
        - Estimate total years of experience only if supported by resume dates.
    
    2. **Analyze the Job Listing Description:**
        - Review the job description to identify:
        - Must-have requirements
        - Nice-to-have requirements
        - Key responsibilities
        - Required tools and technologies
        - Treat must-have requirements as the highest priority for evaluation.
    
    3. **Evaluate Resume Against Job Requirements:**
        - Compare the resume content against each must-have requirement.
        - For each requirement, determine:
            - Evidence level: Strong, Moderate, Weak, or Missing
            - A confidence score from 0–100
            - Supporting evidence using short phrases grounded in the resume text only
        - Do not infer or invent experience.
    
    4. **Assess Overall Candidate Fit:**
        - Identify:
            - Top strengths (up to 5)
            - Key gaps (up to 5)
            - Risks or concerns only when supported by missing or unclear evidence
            - Provide a concise one-paragraph summary suitable for recruiter review.
    
    5. **Generate Interview Questions (Exactly 10):**
        - Generate exactly 10 interview questions based on the job requirements and resume evaluation.
        - Distribute the questions as follows:
            - 5 Core Requirement Questions focused on the most critical must-have requirements.
            - 3 Gap or Clarification Questions targeting weak, missing, or ambiguous areas.
            - 2 Scenario-Based Questions derived directly from key job responsibilities.
        - Avoid generic or culture-only questions unless explicitly required by the job description.
    
    **Interview Question Requirements:**
        - Each question must include:
            - The interview question
            - The job requirement it maps to
         - Questions must be specific, non-duplicative, and grounded in the provided inputs.
         - Produce questions in numbered format (1, 2, 3)
    
    ### Input Data
    
    Application Number:  /ApplicationNumber
    Candidate Details (Name, Email): /CandidateDetails
    Resume Details: /Resume Details
    Job Details (Job Number, Title, Description and Requirements): /JobDetails
    Evaluation Criteria (Weighting, Evaluation Criteria): /Criteria
    ```

1. 새 탭에서 make.powerapps.com 으로 이동하여 **Job Application** 테이블을 찾습니다. 테스트에 사용할 해당 테이블의 job application number 하나를 메모해 둡니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/JobAppTable.png' | relative_url }}" alt="Job Application 테이블" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 프롬프트로 돌아와 프롬프트의 **input data** 섹션까지 아래로 스크롤합니다. **/ApplicationNumber** 텍스트를 찾은 다음 이를 삭제하고 **슬래시(/)** 를 입력하여 add input 패널을 엽니다. 그리고 다음과 같이 입력을 구성합니다.

    | Parameter Name | Type | Sample Data |
    |-----------|------|-------------|
    | ApplicationNumber | Text  | 이전 단계에서 복사한 job application number를 입력 |

1. 이제 Job Application number를 전달할 입력이 생겼으므로, Dataverse Grounding을 사용해 이 프롬프트에 필요한 다른 관련 정보도 Dataverse에서 가져오겠습니다.

    <div class="info-box note" markdown="1">
    **팁** — Dataverse Grounding을 더 깊이 이해하고 싶다면 꼭 [모듈 8]({{ '/chapters/academy-operative-08-dataverse-grounding/' | relative_url }})을 진행해 보세요.
    </div>

    프롬프트의 **Input Data** 섹션에서 남아 있는 슬래시들을 찾아 아래 표에 따라 바꿔 Dataverse grounding을 구성합니다.

    | Parameter Name | Table | Columns | Filter attribute | Filter value |
    | -------------- | ----- | ------- | ---------------- | ------------ |
    | CandidateDetails | Dataverse -> Job Application -> Candidate (Candidate)| Candidate Name, Email | Application Number |Add Value -> Application Number |
    | ResumeDetails | Dataverse -> Job Application -> Resume (Resume)| Cover Letter, Resume Number, Resume Title, Summary | Application Number |Add Value -> Application Number |
    | JobDetails | Dataverse -> Job Application -> Job Role (Job Role)| Description, Job Role Number, Job Title | Application Number |Add Value -> Application Number |
    | Evaluation Criteria | Dataverse -> Job Application -> Job Role (Job Role) -> Job Role (Evaluation Criteria)| Criteria Name, Description, Weighting | Application Number |Add Value -> Application Number |

    입력 섹션이 모두 완성되면 아래 스크린샷과 비슷하게 보여야 합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/PromptFIlled.png' | relative_url }}" alt="채워진 프롬프트 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 진행 중간마다 테스트하는 것은 항상 좋은 습관입니다. **Test** 를 선택해 프롬프트의 초기 텍스트 출력이 표시되는지 확인하고, Dataverse에서 올바른 정보를 가져오는지 검증합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/FirstTest.png' | relative_url }}" alt="첫 번째 테스트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이 프롬프트가 문서를 생성하도록 하려면, 멀티모달 입력과 출력을 지원하는 모델로 프롬프트의 모델을 바꿔야 합니다. **model dropdown** 을 선택하고 **GPT-4.1** 로 변경합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/ModelSelect.png' | relative_url }}" alt="모델 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 프롬프트가 출력으로 Word 문서를 채우도록 하려면, 내용을 채워 넣을 Word 템플릿이 필요합니다. 사용할 수 있도록 템플릿이 제공되어 있습니다. [여기에서 템플릿 파일을 다운로드](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/operative/09-document-generation/assets/Interview_Questions_Template.docx) 한 뒤 열어 보세요.

    <div class="info-box note" markdown="1">
    **참고** — 템플릿 자체는 기본 Word 문서입니다. 여기서 핵심은 프롬프트가 텍스트를 삽입할 위치에 플레이스홀더를 추가하는 방법입니다. 프롬프트가 텍스트를 넣어야 하는 모든 위치에는 채우고 싶은 항목의 플레이스홀더 텍스트를 넣고, 아래 예시처럼 **이중 중괄호 `{{ JobTitle }}`** 로 감싸야 합니다.
    </div>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/Template.png' | relative_url }}" alt="Word 템플릿" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 지금까지는 텍스트 출력을 생성하는 프롬프트를 만들었습니다. 이를 Word 문서 출력으로 바꾸려면 결과 패널 오른쪽 위의 **Output** 드롭다운을 선택하고 **Document (preview)** 옵션을 고릅니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/OutputSelect.png' | relative_url }}" alt="출력 형식 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 템플릿 파일을 프롬프트와 연결하려면 **Document settings** 버튼을 선택한 다음, 다운로드한 파일을 끌어다 놓거나 선택하여 찾아 업로드합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/DocumentSettings.png' | relative_url }}" alt="문서 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 파일을 업로드하면 19개의 식별된 필드(중괄호 플레이스홀더 전체를 찾는 방식으로 식별됨)를 인식해야 합니다. 다시 **test** 버튼을 선택해 프롬프트가 Word 문서로 출력되는지 확인합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/DocTest.png' | relative_url }}" alt="문서 테스트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 아래와 비슷한 응답이 표시될 것입니다. 상단에 문서를 다운로드할 수 있는 링크가 나타납니다. 그 링크를 선택하고 문서가 올바르게 채워졌는지 확인합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/DocOutputBtn.png' | relative_url }}" alt="문서 출력 다운로드 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/DocFilled.png' | relative_url }}" alt="채워진 문서 예시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 새 프롬프트를 저장하려면 **Save** 를 클릭합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SavePrompt.png' | relative_url }}" alt="프롬프트 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

### 9.2 프롬프트를 호출하는 agent flow 만들기

이제 프롬프트를 에이전트에 연결하겠습니다. 이를 위해 프롬프트를 호출하고 파일을 에이전트에 반환하는 agent flow를 추가해야 합니다.

왜 이 단계를 거쳐야 하고 프롬프트를 에이전트에서 직접 호출하지 않는지 궁금할 수 있습니다. 현재는 파일의 contentbytes(즉 실제 파일 콘텐츠)를 가져와서 에이전트에서 안정적으로 파일 항목으로 반환하기가 어렵기 때문입니다. agent flow를 사용하면 파일을 예측 가능하게 추출하여 에이전트로 돌려줄 수 있습니다.

그럼 agent flow를 만들어 보겠습니다.

1. Copilot Studio에서 **Tools** 탭을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/ToolsTab.png' | relative_url }}" alt="Tools 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **New tool** 버튼을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/NewTool.png' | relative_url }}" alt="새 도구" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Agent Flow** 옵션을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/AgentFlowBtn.png' | relative_url }}" alt="Agent Flow 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **When an agent calls the flow** 트리거를 클릭해 확장한 다음 **Add an input** 버튼을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/AddInputBtn.png' | relative_url }}" alt="입력 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 사용자 입력 형식으로 **Text** 를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SelectInputType.png' | relative_url }}" alt="입력 형식 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 입력 이름을 **ApplicationNumber** 로 지정하고 설명에는 **What's the job application number** 를 입력합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/TriggerInputFilled.png' | relative_url }}" alt="트리거 입력 속성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. when an agent calls the flow 트리거 아래의 **+ plus button** 을 선택하고 **Run a prompt** 작업을 추가합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/AddAction.png' | relative_url }}" alt="작업 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 드롭다운 목록에서 **Interview Question Document Prep** 프롬프트를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SelectPromptName.png' | relative_url }}" alt="프롬프트 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **ApplicationNumber** 입력란을 클릭하고 **lightning bolt icon** 을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/inputlightningbolt.png' | relative_url }}" alt="번개 아이콘" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 앞에서 만든 **ApplicationNumber** 입력을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/MapInput.png' | relative_url }}" alt="입력 매핑" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Respond to the agent** 작업을 펼친 뒤 **Add an output** 을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/AddOutput.png' | relative_url }}" alt="출력 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 출력 형식 목록에서 **File** 을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/FileType.png' | relative_url }}" alt="파일 형식 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 속성 이름을 **InterviewFile** 로 지정합니다. 값에는 **fx icon** 을 클릭한 뒤 다음 수식을 입력하고 **Add** 를 선택합니다.

    ```text
    binary(outputs('Run_a_prompt')?['body/responsev2/predictionOutput/documentOutput/contentBytes'])
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/Formula.png' | relative_url }}" alt="수식 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    <div class="info-box note" markdown="1">
    **참고** — 이 수식은 출력을 올바르게 처리해 파일을 추출하고, 이를 에이전트로 반환하기 위해 필요합니다.
    </div>

1. flow를 저장하려면 **Save Draft** 를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SaveDraft.png' | relative_url }}" alt="초안 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Overview** 탭을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/OverviewTab.png' | relative_url }}" alt="개요 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Details 옆의 **Edit** 버튼을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/EditName.png' | relative_url }}" alt="이름 편집" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Flow name에 **Doc Prep**, description에 **Creates an interview prep document and returns to the agent** 를 입력한 다음 **Save** 를 클릭합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/FlowName.png' | relative_url }}" alt="Flow 이름" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Designer** 탭을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/Designer.png' | relative_url }}" alt="Designer 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Publish** 버튼을 선택하여 flow를 게시합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/PublishFlowBtn.png' | relative_url }}" alt="Flow 게시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

### 9.3 토픽 만들기

이제 topic을 추가해 이 모든 것을 에이전트와 연결하겠습니다.

이 작업을 에이전트 지침에 추가하는 대신 topic이 필요한 이유는, 현재 파일 객체가 매번 반환되도록 보장할 수 있는 유일한 방법이 topic이기 때문입니다.

이제 topic을 만들어 보겠습니다.

1. Copilot Studio에서 **Agents** 탭을 클릭하고 **Interview Agent** 를 선택합니다. 이어서 **Topics** 탭을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SelectTopicsTab.png' | relative_url }}" alt="Topics 탭 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Add a Topic** 버튼을 선택하고 **From blank** 옵션을 고릅니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/AddTopic.png' | relative_url }}" alt="토픽 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Topic 이름의 "Untitled" 를 **Generate Interview Doc** 으로 바꿉니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/RenameTopic.png' | relative_url }}" alt="토픽 이름 변경" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. Topic Trigger에서 **description** 에 다음 내용을 입력합니다.

    ```text
    This topic generates an interview prep document with applicant details, role details and interview questions.
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/TopicDescription.png' | relative_url }}" alt="토픽 설명" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 이 topic에 면접 준비 파일을 생성할 Job Application Number를 전달할 수 있어야 합니다. 이를 위해 Copilot Studio의 AI 기능인 slot filling을 사용합니다. 이 기능을 사용하면 언어 모델의 generative orchestration이 topic으로 가져와야 할 값을 식별할 수 있습니다.

    이를 위해 topic에서 **Details** 버튼을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/DetailsBTN.png' | relative_url }}" alt="세부 정보 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 세부 정보 패널에서 **Input** 탭을 선택한 뒤 **Create a new variable** 버튼을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/InputNewVariable.png' | relative_url }}" alt="새 변수 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Variable name** 을 **VarApplicationNumber** 로 변경합니다. **Description** 에는 다음 내용을 입력합니다.

    ```text
    Fill with the Job Application Number referenced in the chat. The number always starts with a A followed by at least 5 digits.
    ```

    다른 속성은 모두 그대로 둡니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/InputFilled.png' | relative_url }}" alt="입력 변수 설정 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 트리거 뒤의 **+ plus icon** 을 선택한 다음 **Add a Tool** 을 고르고, 앞에서 만든 **Doc Prep** flow를 목록에서 찾아 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SelectFlow.png' | relative_url }}" alt="Flow 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 작업의 **ApplicationNumber** 입력란을 클릭하고 **... three dots** 를 선택한 뒤 **VarApplicationNumber** 변수를 골라 입력에 매핑합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/MapVariable.png' | relative_url }}" alt="변수 매핑" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 파일을 사용자에게 반환하기 위한 message node를 추가해야 합니다. 이를 위해 방금 추가한 작업 아래의 **+ plus icon** 을 클릭하고 **Send a message** 작업을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/AddMessageNode.png' | relative_url }}" alt="메시지 노드 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 텍스트 상자에 **Here is your interview prep file:** 을 입력합니다. 그런 다음 **Add** 버튼을 클릭하고 **File** 옵션을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/MessageFill.png' | relative_url }}" alt="메시지 작성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Content** 입력란을 클릭하고 **... three dots** 를 선택한 뒤 **InterviewFile** 속성을 고릅니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/MapFile.png' | relative_url }}" alt="파일 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Name** 입력란을 클릭하고 **... three dots** 를 선택한 다음 **Formula** 탭을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SelectNameInput.png' | relative_url }}" alt="이름 입력 수식 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 수식 창에 다음 수식을 입력하고 **Insert** 버튼을 선택합니다.

    ```text
    Topic.VarApplicationNumber&"InterviewPrep.docx"
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/InsertNameFormula.png' | relative_url }}" alt="이름 수식 삽입" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. topic을 저장하려면 **Save** 버튼을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/SaveTopic.png' | relative_url }}" alt="토픽 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 새 topic이 제대로 작동하는지 테스트해 봅시다. 테스트 패널을 열고 다음 내용을 입력합니다(여기서는 J1000이라고 되어 있지만, 실제로는 Job Application 테이블에 있는 적절한 job application number로 바꾸세요).

    ```text
    Create an interview prep file for job application A01001
    ```

    **Enter** 를 누릅니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/TestPanel.png' | relative_url }}" alt="테스트 패널" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. topic이 호출되고, application number가 전달되며, flow를 호출한 뒤 파일을 반환하는 모습을 확인할 수 있습니다. 문서 링크를 클릭하면 면접 준비 문서가 로컬 드라이브에 다운로드되는 것도 확인해 보세요.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/TestResult.png' | relative_url }}" alt="테스트 결과" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 문서를 열어 올바르게 채워졌는지 확인합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-09-document-generation/OutputTest.png' | relative_url }}" alt="출력 문서 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

축하합니다! 방금 에이전트에 문서 생성 기능을 성공적으로 추가했습니다.

## 🎉 미션 완료

잘하셨습니다, Operative! **Operation Doc Assembly** 가 이제 완료되었습니다. 문서 생성 기능으로 에이전트를 성공적으로 강화했습니다.

🚀 **다음 단계:** 다음 미션에서는 MCP 서버의 힘을 활용해 면접 일정 예약과 계획 기능을 추가하는 방법을 배우게 됩니다.

⏩ [미션 10: MCP 연동]({{ '/chapters/academy-operative-10-mcp/' | relative_url }})으로 이동하세요.

## 📚 전술 자료

📖 [Document output in prompts](https://learn.microsoft.com/microsoft-copilot-studio/generate-document-output-prompt?WT.mc_id=power-182762-apdunnam)

📖 [Use your own data in a prompt](https://learn.microsoft.com/ai-builder/use-your-own-prompt-data?WT.mc_id=power-182762-apdunnam)

📖 [Create a custom prompt](https://learn.microsoft.com/ai-builder/create-a-custom-prompt?WT.mc_id=power-182762-apdunnam)

📖 [Work with Dataverse in Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-dataverse?WT.mc_id=power-182762-apdunnam)

📖 [AI Builder custom prompts overview](https://learn.microsoft.com/ai-builder/prompts-overview?WT.mc_id=power-182762-apdunnam)

📖 [Training: Create AI Builder prompts using your own Dataverse data](https://learn.microsoft.com/training/modules/ai-builder-grounded-prompts/?WT.mc_id=power-182762-apdunnam)
