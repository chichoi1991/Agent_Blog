---
layout: "chapter"
date: 2026-03-16
title: "Mission 01: Hiring Agent 시작하기"
short_title: "01. 시작하기"
description: "채용 관리 시스템의 핵심 인프라를 배포하고 중앙 오케스트레이터 Agent를 만듭니다"
order: 1
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/01-get-started/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-16"
canonical_url: "https://microsoft.github.io/agent-academy/operative/01-get-started/"
image: "/assets/academy/operative-01-get-started/01-solutionstab.png"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 01: Get started with the Hiring Agent](https://microsoft.github.io/agent-academy/operative/01-get-started/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

🎥 **실습 영상 보기**

<figure class="screenshot">
  <a href="https://www.youtube.com/watch?v=VaEy6ux2sQs" target="_blank" rel="noopener">
    <img src="{{ '/assets/academy/operative-01-get-started/01-get-started-thumbnail_PlayButton.png' | relative_url }}" alt="Hiring Agent 시작하기 영상 썸네일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
</figure>

## 🎯 미션 브리핑

환영합니다, Agent. 첫 번째 임무는 **Operation Talent Scout**입니다. 이 임무에서는 조직이 최고의 인재를 발굴하고 채용하는 방식을 혁신할 AI 기반 채용 시스템의 기초 인프라를 구축합니다.

이번 미션의 목표는 Microsoft Copilot Studio를 사용해 포괄적인 채용 관리 시스템을 배포하고 구성하는 것입니다. 필요한 데이터 구조가 모두 포함된 사전 구축 Solution을 가져온 뒤, 앞으로의 모든 채용 작업을 총괄할 첫 번째 AI Agent인 **Hiring Agent**를 만듭니다.

이번 초기 배포로 Agent Academy Operative 과정 전반에 걸쳐 확장해 나갈 Solution이 마련됩니다. 이를 앞으로의 작전을 위한 기지라고 생각해 보세요. 이후 미션에서 여러 특화 Agent 네트워크를 구축하게 될 기반입니다.

<div class="info-box note" markdown="1">
**이 실습은 클래식 Copilot Studio 환경을 사용합니다** — Microsoft Copilot Studio에는 새로운 작성 환경이 순차적으로 도입되고 있습니다. 이 실습의 스크린샷과 단계는 **classic experience**를 기준으로 합니다. 화면이 다르게 보인다면 계속하기 전에 오른쪽 위에서 **New Experience**를 꺼 주세요. 새로운 환경에 맞춘 최신 지침도 제공될 예정이지만, 이 실습은 클래식 환경에서도 그대로 유효합니다.
</div>

## 🔎 목표

이 미션에서는 다음을 배우게 됩니다.

1. 채용 자동화 시나리오의 과제와 해결 방안을 이해하고 전체 맥락을 파악하는 방법
1. 채용 관리 시스템의 기본 구성을 성공적으로 가져와 설정하는 방법
1. Agent Academy Operative로서 앞으로 구축할 시나리오의 출발점이 되는 채용 Agent를 만드는 방법

## 🔍 사전 준비

이 미션을 시작하기 전에 다음 사항을 준비하세요.

- Copilot Studio 라이선스
- **관리형 환경이 아닌** Microsoft Power Platform 환경에 대한 액세스
- Solution과 Agent를 만들 수 있는 관리자 권한

<div class="info-box note" markdown="1">
**사전 준비 도움말** — Copilot Studio 라이선스를 준비하는 데 도움이 필요하다면, Power Platform 환경과 Copilot Studio 체험판 설정 과정을 안내하는 [Recruit 과정 설정 랩]({{ '/chapters/academy-recruit-00-course-setup/' | relative_url }})을 참고하세요.
</div>

## 🏢 채용 자동화 시나리오 이해하기

이 시나리오는 기업이 Microsoft Copilot Studio를 활용해 채용 프로세스를 개선하고 자동화하는 방법을 보여 줍니다. 이 과정에서는 이력서 검토, 적합한 직무 추천, 면접 자료 준비, 후보자 평가와 같은 작업을 처리하기 위해 여러 Agent가 협업하는 구조를 소개합니다.

### 비즈니스 가치

이 Solution은 HR 팀이 다음과 같은 방식으로 시간을 절약하고 더 나은 의사결정을 내리도록 돕습니다.

- 이메일로 접수된 이력서를 자동으로 처리합니다.
- 후보자 프로필을 기반으로 적합한 직무를 제안합니다.
- 각 후보자에 맞춘 Job Application과 면접 가이드를 생성합니다.
- 기본 제공 안전 및 조정 기능을 통해 공정하고 규정을 준수하는 채용 절차를 지원합니다.
- Solution을 개선하기 위한 피드백을 수집합니다.

### 작동 방식

- 중앙의 **Hiring Agent**가 전체 프로세스를 조정하고 데이터를 Microsoft Dataverse에 저장합니다.
- **Application Intake Agent**가 이력서를 읽고 Job Application을 생성합니다.
- **Interview Prep Agent**가 후보자의 배경 정보를 바탕으로 면접 질문과 문서를 생성합니다.
- 시스템은 데모 웹사이트로 게시할 수 있어 이해관계자가 직접 상호작용할 수 있습니다.

이 시나리오는 투명성, 공정성, 효율성을 유지하면서 AI 기반 자동화로 채용 워크플로를 현대화하려는 조직에 적합합니다.

## 🧪 랩 1 - Hiring Agent 설정

이 실습 랩에서는 채용 자동화 시스템의 기반을 마련합니다. 먼저 후보자, 직무, 채용 워크플로를 관리하는 데 필요한 Dataverse 테이블과 데이터 구조가 포함된 사전 구성 Solution을 가져옵니다. 다음으로 이 모듈 전반의 학습을 지원하고 현실적인 테스트 시나리오를 제공할 샘플 데이터를 이 테이블들에 채워 넣습니다. 마지막으로 Copilot Studio에서 Hiring Agent를 만들어, 이후 미션에서 추가할 모든 기능의 기반이 될 기본 대화 인터페이스를 설정합니다.

### 🧪 랩 1.1 - Solution 가져오기

1. **[Copilot Studio](https://copilotstudio.microsoft.com)**로 이동합니다.
1. 왼쪽 탐색 메뉴에서 **...**를 선택한 다음 **Solutions**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-solutionstab.png' | relative_url }}" alt="Solutions 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 상단의 **Import Solution** 버튼을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-importsolution.png' | relative_url }}" alt="Import Solution" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 준비된 Solution을 **[다운로드](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/operative/01-get-started/assets/Operative_1_0_0_0.zip)**합니다.
1. **Browse**를 선택한 다음, 이전 단계에서 다운로드한 Solution을 선택합니다.
1. **Next**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-nextsolution.png' | relative_url }}" alt="Solution 찾아보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Import**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-import.png' | relative_url }}" alt="Solution 가져오기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    <div class="info-box note" markdown="1">
    **참고** — 가져오기가 성공하면 완료 후 초록색 알림 막대에 `Solution "Operative" imported successfully.` 메시지가 표시됩니다.
    </div>

1. `imported successfully` 메시지가 보이면, Solutions 목록에서 Solution의 표시 이름인 `Operative`를 선택해 가져온 내용을 확인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-01-get-started/01-selectsolution.png' | relative_url }}" alt="Solution 열기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

가져온 Solution을 검토하고 다음 구성 요소가 포함되었는지 확인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-01-get-started/components.png' | relative_url }}" alt="가져온 테이블" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

| 표시 이름 | 유형 | 설명 |
| ----------- | ---- | ----------- |
| Candidate | Table | 후보자 정보 |
| Evaluation Criteria | Table | 해당 역할의 평가 기준 |
| Hiring Hub | Model-Driven App | 채용 프로세스를 관리하는 애플리케이션 |
| Hiring Hub | Site Map | Hiring Hub 앱의 탐색 구조 |
| Job Application | Table | 채용 지원서 |
| Job Role | Table | 직무 역할 |
| Resume | Table | 후보자의 이력서 |

이 랩의 마지막 작업으로 페이지 상단의 **Publish all customizations** 버튼을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-01-get-started/01-pubcustomizations.png' | relative_url }}" alt="사용자 지정 항목 모두 게시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

### 🧪 랩 1.2 - 샘플 데이터 가져오기

이 랩에서는 랩 1.1에서 가져온 일부 테이블에 샘플 데이터를 추가합니다.

#### 가져올 파일 다운로드

> 📥 실습에 필요한 샘플 파일은 [원문 미션 페이지](https://microsoft.github.io/agent-academy/operative/01-get-started/)에서 내려받을 수 있습니다.

#### Job Role 샘플 데이터 가져오기

1. 이전 랩에서 가져온 Solution으로 돌아갑니다.
1. 행 앞의 확인 표시를 선택해 **Hiring Hub** Model-Driven App을 선택합니다.
1. 상단의 **Play** 버튼을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-playhiringhubapp.png' | relative_url }}" alt="앱 실행" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    <div class="info-box note" markdown="1">
    **경고** — 다시 로그인하라는 메시지가 표시될 수 있습니다. 그 경우 로그인하세요. 로그인 후에는 Hiring Hub 앱이 표시되어야 합니다.
    </div>

1. 왼쪽 탐색 메뉴에서 **Job Roles**를 선택합니다.
1. 명령 모음에서 **More** 아이콘(세로 점 세 개)을 선택합니다.
1. **Import from Excel** 옆의 **right arrow**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/import-from-excel.png' | relative_url }}" alt="Excel에서 가져오기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Import from CSV**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/import-from-csv.png' | relative_url }}" alt="CSV에서 가져오기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Choose File** 버튼을 선택하고 방금 다운로드한 **job-roles.csv** 파일을 선택한 다음 **Open**을 선택합니다.
1. **Next**를 선택합니다.
1. 다음 단계는 그대로 두고 **Review Mapping**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/import-from-csv-job-roles.png' | relative_url }}" alt="매핑 검토" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 매핑이 올바른지 확인한 다음 **Finish Import**를 선택합니다.

    <div class="info-box note" markdown="1">
    **참고** — 그러면 가져오기가 시작되며, 진행 상황을 추적하거나 **Done**을 선택해 즉시 이 과정을 마칠 수 있습니다.
    </div>

1. **Done**을 선택합니다.

이 작업은 약간 시간이 걸릴 수 있지만, **Refresh** 버튼을 눌러 가져오기가 성공했는지 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-01-get-started/job-roles-import-successful.png' | relative_url }}" alt="Job Roles 가져오기 성공" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

#### Evaluation Criteria 샘플 데이터 가져오기

1. 왼쪽 탐색 메뉴에서 **Evaluation Criteria**를 선택합니다.
1. 명령 모음에서 **More** 아이콘(세로 점 세 개)을 선택합니다.
1. **Import from Excel** 옆의 **right arrow**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/import-from-excel.png' | relative_url }}" alt="Excel에서 가져오기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Import from CSV**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/import-from-csv.png' | relative_url }}" alt="CSV에서 가져오기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Choose File** 버튼을 선택하고 방금 다운로드한 **evaluation-criteria.csv** 파일을 선택한 다음 **Open**을 선택합니다.
1. **Next**를 선택합니다.
1. 다음 단계는 그대로 두고 **Review Mapping**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/import-from-csv-evaluation-criteria.png' | relative_url }}" alt="매핑 검토" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 이제 매핑에서 조금 더 작업해야 합니다. **Job Role** 필드 옆의 돋보기(🔎 아이콘)를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-jobrolemag.png' | relative_url }}" alt="Job Role" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 여기에서 **Job Title**이 선택되어 있는지 확인하고, 아니라면 추가합니다.
1. **OK**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-jobtitle.png' | relative_url }}" alt="Job Title" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 나머지 매핑도 올바른지 확인한 다음 **Finish Import**를 선택합니다.

    <div class="info-box note" markdown="1">
    **참고** — 그러면 다시 가져오기가 시작되며, 진행 상황을 추적하거나 **Done**을 선택해 즉시 이 과정을 마칠 수 있습니다.
    </div>

1. **Done**을 선택합니다.

이 작업은 약간 시간이 걸릴 수 있지만, **Refresh** 버튼을 눌러 가져오기가 성공했는지 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-01-get-started/evaluation-criteria-import-successful.png' | relative_url }}" alt="Evaluation Criteria 가져오기 성공" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

### 🧪 랩 1.3 - Hiring Agent 만들기

이제 사전 준비 설정이 끝났으니 본격적으로 작업할 시간입니다. 먼저 Hiring Agent를 추가해 보겠습니다.

1. **[Copilot Studio](https://copilotstudio.microsoft.com)**로 이동하고, Solution과 데이터를 가져온 것과 동일한 환경에 있는지 확인합니다.
1. 왼쪽 탐색 메뉴에서 **Agents**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-agenttab.png' | relative_url }}" alt="Agent 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Create blank agent** 옆의 아래쪽 화살표 아이콘을 선택한 다음 **Advanced create**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-newagent.png' | relative_url }}" alt="새 Agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **solution**에는 **Operative**를 선택합니다. 방금 가져온 Solution입니다.
1. **schema name**에는 `ppa_` 접두사 뒤에 **hiringagent**를 입력합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-agentsettings.png' | relative_url }}" alt="Agent 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Confirm and create**를 선택합니다.

    이렇게 하면 `Operative` Solution에 Agent가 생성됩니다. 처음에는 `Agent 1`이라는 이름으로 생성되는데, 그다지 유용한 이름은 아니므로 변경하겠습니다.

1. 상단의 **Details** 카드에서 **Edit**를 선택합니다.
1. **Name**에 다음을 입력합니다.

    ```text
    Hiring Agent
    ```

1. **Description**에 다음을 입력합니다.

    ```text
    Central orchestrator for all hiring activities
    ```

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-01-get-started/01-editdetails.png' | relative_url }}" alt="구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Save**를 선택해 Agent를 저장합니다. 변경 사항이 보이기까지 시간이 조금 걸릴 수 있습니다.

이 Agent는 Operative 과정의 다른 미션에서도 계속 사용하게 됩니다.

## 🎉 미션 완료

미션 01을 완료했습니다. 이제 다음 역량을 익혔습니다.

✅ **시나리오 이해**: 채용 자동화 과제와 앞으로 구축할 Solution에 대한 종합적인 이해  
✅ **Solution 배포**: 채용 관리 시스템의 구성 요소를 성공적으로 가져와 설정  
✅ **Agent 생성**: Agent Academy Operative로서 앞으로 구축할 시나리오의 출발점이 되는 채용 Agent 구축  

다음 미션인 [Mission 02: Agent Instructions 작성]({{ '/chapters/academy-operative-02-agent-instructions/' | relative_url }})으로 이어집니다.

## 📚 전술 리소스

📖 [Microsoft Copilot Studio - Create an agent](https://learn.microsoft.com/microsoft-copilot-studio/authoring-first-bot)  
  
📖 [Microsoft Dataverse Documentation](https://learn.microsoft.com/power-apps/maker/data-platform)
