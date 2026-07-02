---
layout: "chapter"
title: "에이전트를 위한 솔루션 만들기"
short_title: "솔루션 만들기"
description: "환경 간 관리와 배포를 위해 에이전트를 재사용 가능한 솔루션으로 패키징하는 방법."
order: 4
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/04-creating-a-solution/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-06-10"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/04-creating-a-solution/"
---

<div class="info-box note translated-post" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 04: Creating a Solution for Your Agent](https://microsoft.github.io/agent-academy/recruit/04-creating-a-solution/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# 미션 04: 에이전트를 위한 솔루션 만들기

🎥 **실습 영상**

<figure class="screenshot">
  <a href="https://www.youtube.com/watch?v=1iATbkgfcpU" target="_blank" rel="noopener noreferrer">
    <img src="{{ '/assets/academy/recruit-04-creating-a-solution/video-thumbnail.jpg' | relative_url }}" alt="솔루션 만들기 실습 영상 썸네일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
  <figcaption>YouTube에서 실습 영상 보기</figcaption>
</figure>

## 미션 브리프

Agent Maker, 다음 작전에 오신 것을 환영합니다. 이번 미션에서는 Microsoft Copilot Studio로 만든 IT Helpdesk Agent를 위한 공식 배포 단위인 **Solution**을 구성합니다. 솔루션은 에이전트와 관련 아티팩트를 담는 디지털 서류 가방이라고 생각하면 됩니다.

모든 에이전트에는 구조화된 집이 필요하며, Power Platform solution이 바로 그 역할을 합니다. 정리, 이동성, 운영 준비 상태를 모두 제공합니다.

이제 패키징을 시작해 봅시다.

<div class="info-box note" markdown="1">
**참고**
이 실습의 스크린샷과 Copilot Studio 화면이 다르게 보인다면, 오른쪽 위의 **New Experience**를 꺼서 여기서 사용하는 **classic experience**로 전환하세요.
</div>

## 목표

이번 미션에서 배우는 내용은 다음과 같습니다.

1. Power Platform solutions가 무엇이며 에이전트 개발에서 어떤 역할을 하는지 이해하기
2. 솔루션을 사용해 에이전트를 구성하고 배포하는 장점 이해하기
3. solution publisher와 컴포넌트 관리에서의 중요성 이해하기
4. 개발부터 운영까지 이어지는 Power Platform solution lifecycle 이해하기
5. IT Helpdesk Agent용 custom publisher와 custom solution 만들기

## 솔루션이란 무엇인가요?

Microsoft Power Platform에서 solution은 앱이나 에이전트를 구성하는 모든 요소를 담는 컨테이너 또는 패키지입니다. 예를 들어 tables, forms, flows, custom logic이 포함될 수 있습니다. 솔루션은 Application Lifecycle Management (ALM)의 핵심이며, 아이디어에서 개발, 테스트, 배포, 업데이트까지 전체 흐름을 관리할 수 있게 해줍니다.

Copilot Studio에서 만드는 모든 에이전트는 Power Platform solution 안에 저장됩니다. 기본적으로는 **Default solution**에 저장되지만, 원하는 경우 새 custom solution을 만들어 그 안에서 에이전트를 구축할 수 있습니다.

전통적으로 솔루션은 **Power Apps maker portal**에서 만들었습니다. 이 웹 기반 인터페이스에서 앱을 만들고, Dataverse와 flows를 구성하고, AI 구성 요소도 탐색할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.0_01_Solutions.png' | relative_url }}" alt="Power Apps maker portal의 솔루션 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Power Apps maker portal의 솔루션</figcaption>
</figure>

이제 Copilot Studio에는 **Solution Explorer**가 있어 솔루션을 직접 관리할 수 있습니다. Power Apps maker portal로 이동하지 않고도 Copilot Studio 안에서 솔루션 작업을 수행할 수 있습니다.

즉, 다음과 같은 일반적인 솔루션 작업을 Copilot Studio 안에서 처리할 수 있습니다.

- **Create a solution** - custom solution을 만들면 에이전트를 환경 간 export/import할 수 있습니다.
- **Set your preferred solution** - agents, apps 등이 기본으로 생성될 솔루션을 지정할 수 있습니다.
- **Add or remove components** - 에이전트가 environment variables나 cloud flows 같은 다른 구성 요소를 참조할 때 같은 솔루션에 포함할 수 있습니다.
- **Export solutions** - 다른 대상 환경으로 이동할 수 있습니다.
- **Import solutions** - 다른 곳에서 만든 솔루션을 가져오고 업그레이드/업데이트할 수 있습니다.
- **Create and manage solution pipelines** - 환경 간 배포를 자동화할 수 있습니다.
- **Git integration** - 개발 환경에서 솔루션을 Git 리포지토리와 연결해 버전 관리와 협업을 수행할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.0_02_CopilotStudioSolutionExplorer.png' | relative_url }}" alt="Copilot Studio의 Solution Explorer 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio의 Solution Explorer</figcaption>
</figure>

솔루션에는 두 가지 유형이 있습니다.

- **Unmanaged solutions** - 개발 단계에서 사용하며 자유롭게 편집하고 사용자 지정할 수 있습니다.
- **Managed solutions** - 테스트나 프로덕션 배포 시 사용하며, 실수로 변경되지 않도록 잠금에 가깝게 관리됩니다.

## 왜 에이전트에 솔루션을 써야 할까요?

솔루션은 _도구 상자_와 같습니다. 다른 위치(환경)에서 무언가를 만들거나 고치려면 필요한 도구(구성 요소)를 상자(솔루션)에 담아 옮겨야 합니다. 새 환경으로 가져간 뒤 그대로 쓰거나, 새로운 구성 요소를 더해 에이전트를 확장할 수 있습니다.

<div class="info-box note" markdown="1">
**참고**
원문에서는 “Be a tidy Kiwi!”라는 뉴질랜드 표현을 예로 듭니다. 에이전트도 같은 맥락으로, 관련 요소를 깔끔하게 정리하고 이동 가능하게 유지하면 환경 관리가 훨씬 수월해집니다.
</div>

개발자 환경(source environment)에서는 에이전트를 전용 솔루션 안에 만드는 것이 좋은 습관입니다. 이유는 다음과 같습니다.

### Organized development

- Default solution의 다른 자산과 섞이지 않고, 에이전트 관련 구성 요소를 한곳에 모을 수 있습니다.
- 필요한 모든 요소가 하나의 솔루션에 있으므로 대상 환경으로 export/import하기 쉽고, 이는 ALM의 좋은 습관입니다.

### Safe deployment

- 앱이나 에이전트를 managed solution으로 내보내 테스트나 프로덕션 환경에 배포할 수 있으며, 실수로 편집될 위험을 줄일 수 있습니다.

### Version control

- patches(목표 수정), updates(보다 넓은 범위의 변경), upgrades(기능 추가나 대규모 변경을 포함한 교체)를 만들 수 있습니다.
- 변경 사항을 통제된 방식으로 배포하는 데 도움이 됩니다.

### Dependency management

- 어떤 구성 요소가 다른 구성 요소에 의존하는지 추적해, 변경으로 인해 예기치 않게 깨지는 일을 줄일 수 있습니다.

### Team collaboration

- 개발 단계에서는 unmanaged solution으로 함께 작업하고, 배포 단계에서는 managed solution을 넘기는 방식으로 makers와 developers가 협업할 수 있습니다.

## Solution Publisher 이해하기

Power Platform의 Solution Publisher는 솔루션을 만든 주체를 식별하는 라벨 또는 브랜드와 같습니다. 팀 단위 개발이나 여러 환경에서 작업할 때 특히 중요합니다.

솔루션을 만들 때 publisher를 선택해야 하며, publisher는 다음을 정의합니다.

- 모든 custom component에 붙는 prefix
- 솔루션 소유 조직 또는 담당자의 이름과 연락처 정보

### 왜 중요할까요?

1. **식별이 쉽다** - `new_`, `abc_` 같은 prefix를 보면 어떤 솔루션/팀의 구성 요소인지 빠르게 구분할 수 있습니다.
2. **충돌을 막는다** - 두 팀이 같은 이름의 column을 만들더라도 `teamA_status`, `teamB_status`처럼 충돌을 피할 수 있습니다.
3. **ALM을 지원한다** - Dev → Test → Prod로 솔루션을 이동할 때 소유권과 일관성을 유지하는 데 도움이 됩니다.

<div class="info-box note" markdown="1">
**예시**

`cts_` prefix를 가진 `Contoso Solutions` publisher를 만든다고 가정해 봅시다.

여기에 _Priority_ 라는 custom column을 추가하면 솔루션에는 `cts_Priority`로 저장됩니다.

어떤 환경에서 보더라도 이것이 Contoso Solutions와 연결된 column임을 쉽게 알 수 있습니다.
</div>

## Power Platform solution lifecycle

이제 솔루션의 목적을 이해했으니 lifecycle을 살펴보겠습니다.

1. **Create Solution in Development environment** - Development 환경에서 새 솔루션을 만듭니다.
2. **Add Components** - apps, flows, tables 등 필요한 요소를 추가합니다.
3. **Export as Managed solution** - 배포용으로 패키징합니다.
4. **Import to Test environment** - Test 환경에서 동작을 검증합니다.
5. **Import to Production environment** - 검증이 끝난 솔루션을 운영 환경에 배포합니다.
6. **Apply Patches, Updates or Upgrades** - 수정과 개선을 적용하고 이 주기를 반복합니다.

<div class="info-box note" markdown="1">
**예시**

직원의 device 문제, network troubleshooting, printer setup 등을 처리하는 IT helpdesk agent를 만든다고 가정해 봅시다.

- 먼저 Development 환경의 unmanaged solution에서 작업합니다.
- 준비가 끝나면 managed solution으로 export하고, System Test나 UAT 환경으로 import합니다.
- 테스트가 끝나면 원래 개발 버전을 건드리지 않고 Production 환경으로 이동합니다.
</div>

## 실습 04: 새 솔루션 만들기

이제 다음 두 가지를 배웁니다.

- Solution publisher 만들기
- Solution 만들기

앞에서 이어진 예시대로, 전용 Copilot Studio 환경 안에서 IT helpdesk agent를 구축할 솔루션을 만들어 보겠습니다.

시작해 보겠습니다.

### 사전 준비

#### Security role

Copilot Studio에서 Solution Explorer로 할 수 있는 작업은 사용자 security role에 따라 달라집니다. Power Apps admin center에서 솔루션을 관리할 권한이 없다면, Copilot Studio 안에서도 같은 작업을 수행할 수 없습니다.

원활한 진행을 위해 적절한 security roles와 permissions가 있는지 확인하세요. 조직에서 직접 환경을 관리하지 않는다면 tenant/environment를 관리하는 IT 관리자에게 문의하세요.

다음 security role이 있으면 환경에서 솔루션을 만들 수 있습니다.

| Security role | Description |
|---|---|
| Environment Maker | 특정 환경에서 solutions를 포함한 리소스를 만들고 사용자 지정하고 관리하는 데 필요한 권한 제공 |
| System Customizer | Environment Maker보다 넓은 권한 제공, 환경 사용자 지정과 security roles 관리 포함 |
| System Administrator | 최고 수준의 권한으로 security roles 생성 및 할당을 포함해 환경 전반 관리 가능 |

#### Developer environment

<div class="info-box note" markdown="1">
**주의**
반드시 전용 developer environment로 전환하세요. 자세한 내용은 [/chapters/academy-recruit-00-course-setup/#step-3-create-new-developer-environment](/chapters/academy-recruit-00-course-setup/#step-3-create-new-developer-environment)를 참고하세요.
</div>

1. Copilot Studio 왼쪽 탐색에서 **environment** 아이콘을 선택하고 기본 환경에서 자신의 환경(예: **Adele Vance's environment**)으로 전환합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.0_03_DeveloperEnvironment.png' | relative_url }}" alt="Developer environment 전환 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>전용 개발 환경으로 전환</figcaption>
</figure>

### 4.1 Solution publisher 만들기

1. 왼쪽 탐색 아래쪽의 **ellipsis** 아이콘을 선택하고, **Explore** 아래의 **Solutions**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_01_Solutions.png' | relative_url }}" alt="Solutions 메뉴 진입 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Solutions 메뉴 열기</figcaption>
</figure>

2. Copilot Studio의 **Solution Explorer**가 열리면 **+ New solution**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_02_NewSolution.png' | relative_url }}" alt="새 솔루션 생성 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새 솔루션 만들기</figcaption>
</figure>

3. **New solution** pane에서 먼저 새 publisher를 만듭니다. **+ New publisher**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_03_NewPublisher.png' | relative_url }}" alt="새 publisher 생성 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새 publisher 만들기</figcaption>
</figure>

4. **New publisher** pane의 **Properties** 탭에서 다음 필드를 채웁니다.

   | Property | Description | Required |
   |---|---|:---:|
   | Display name | publisher의 표시 이름 | Yes |
   | Name | publisher의 고유 이름 및 schema name | Yes |
   | Description | 솔루션 목적 설명 | No |
   | Prefix | 새 구성 요소에 적용될 publisher prefix | Yes |
   | Choice value prefix | choices 옵션에 사용되는 숫자 접두 값 | Yes |

   **Display name**

   ```text
   Contoso Solutions
   ```

   **Name**

   ```text
   ContosoSolutions
   ```

   **Description**

   ```text
   Copilot Studio Agent Academy
   ```

   **Prefix**

   ```text
   cts
   ```

   기본 **Choice value** prefix는 정수로 표시됩니다. 이 값을 가장 가까운 천 단위로 바꿉니다. 예를 들어 `77074`였다면 `77000`으로 바꿉니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_04_PublisherProperties.png' | relative_url }}" alt="Publisher 속성 입력 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Publisher 속성 입력</figcaption>
</figure>

5. 필요하면 **Contact** 탭에서 솔루션 연락처 정보를 입력합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_05_Contact.png' | relative_url }}" alt="Publisher 연락처 입력 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Publisher 연락처 정보</figcaption>
</figure>

6. 다시 **Properties** 탭으로 돌아가 **Save**를 선택해 publisher를 생성합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_06_SavePublisher.png' | relative_url }}" alt="Publisher 저장 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Publisher 저장</figcaption>
</figure>

7. New publisher pane이 닫히고, **New solution** pane으로 돌아오면 방금 만든 Publisher가 선택된 상태로 표시됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_07_PublisherSelected.png' | relative_url }}" alt="새 publisher가 선택된 상태의 New solution 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새 Publisher 선택 완료</figcaption>
</figure>

잘하셨습니다. 이제 Solution Publisher를 만들었습니다. 다음으로 새 custom solution을 만듭니다.

### 4.2 새 Solution 만들기

1. 이제 **New solution** pane의 나머지 필드를 채웁니다.

   **Display name**

   ```text
   Contoso Helpdesk Agent
   ```

   **Name**

   ```text
   ContosoHelpdeskAgent
   ```

   새 솔루션이므로 [**Version** number](https://learn.microsoft.com/power-apps/maker/data-platform/update-solutions#understanding-version-numbers-for-updates/?WT.mc_id=power-172615-ebenitez)는 기본적으로 `1.0.0.0`입니다.

   그리고 **Set as your preferred solution** 체크박스를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.2_01_SolutionDetails_.png' | relative_url }}" alt="솔루션 세부 정보 입력 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>솔루션 세부 정보 입력</figcaption>
</figure>

2. **More options**를 펼쳐 추가로 입력할 수 있는 정보를 확인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.2_02_MoreOptions.png' | relative_url }}" alt="More options 펼친 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>추가 옵션 확인</figcaption>
</figure>

3. 여기에는 다음 항목이 있습니다.

   - **Installed on** - 솔루션이 설치된 날짜
   - **Configuration page** - 사용자에게 앱/에이전트/도구 사용을 안내하는 HTML web resource
   - **Description** - 솔루션 또는 configuration page에 대한 설명

   이번 실습에서는 모두 비워 둡니다.

   마지막으로 **Create**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.2_03_Create.png' | relative_url }}" alt="솔루션 생성 버튼 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>솔루션 생성</figcaption>
</figure>

4. **Contoso Helpdesk Agent** 솔루션이 생성됩니다. 아직 Copilot Studio에서 에이전트를 만들지 않았으므로 구성 요소 수는 0입니다.

   **back arrow** 아이콘을 선택해 Solution Explorer로 돌아갑니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.2_04_SolutionCreated.png' | relative_url }}" alt="새 솔루션 생성 완료 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>솔루션 생성 완료</figcaption>
</figure>

5. 앞서 **Set as your preferred solution**를 선택했기 때문에, **Contoso Helpdesk Agent**가 이제 **Current preferred solution**으로 표시됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.2_05_CurrentPreferredSolutionSelected.png' | relative_url }}" alt="현재 기본 솔루션으로 선택된 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>기본 솔루션 설정 확인</figcaption>
</figure>

## 미션 완료

축하합니다. Publisher를 만들고, 그 Publisher를 사용해 에이전트 구축용 새 Solution을 만들었습니다.

이제 여러분은 규모 있는 운영을 위한 첫걸음인 깔끔한 디지털 기반을 마련했습니다. 정리된 구조와 배포 가능한 패키징 방식은 엔터프라이즈급 에이전트 개발의 핵심입니다.

이로써 **Lab 04 - Creating a Solution**를 마칩니다. 다음 학습은 [/chapters/academy-recruit-05-using-prebuilt-agents/](/chapters/academy-recruit-05-using-prebuilt-agents/)에서 이어집니다. 이번 실습에서 만든 솔루션은 다음 실습에서도 사용됩니다.

## 참고 자료

- [Create a solution](https://learn.microsoft.com/power-apps/maker/data-platform/create-solution/?WT.mc_id=power-172615-ebenitez)
- [Create and manage solutions in Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/authoring-solutions-overview/?WT.mc_id=power-172615-ebenitez)
- [Share agents with other users](https://learn.microsoft.com/microsoft-copilot-studio/admin-share-bots/?WT.mc_id=power-172615-ebenitez)
- [Summary of resources available to predefined security roles](https://learn.microsoft.com/power-platform/admin/database-security#summary-of-resources-available-to-predefined-security-roles/?WT.mc_id=power-172615-ebenitez)
- [Upgrade or update a solution](https://learn.microsoft.com/power-apps/maker/data-platform/update-solutions/?WT.mc_id=power-172615-ebenitez)
- [Overview of pipelines in Power Platform](https://learn.microsoft.com/power-platform/alm/pipelines/?WT.mc_id=power-172615-ebenitez)
- [Overview of Git integration in Power Platform](https://learn.microsoft.com/power-platform/alm/git-integration/overview/?WT.mc_id=power-172615-ebenitez)
