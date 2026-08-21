---
layout: "chapter"
date: 2026-08-06
title: "에이전트를 위한 솔루션 만들기"
short_title: "솔루션 만들기"
description: "환경 간 관리와 배포를 위해 에이전트를 재사용 가능한 솔루션으로 패키징하는 방법."
order: 4
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/04-creating-a-solution/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/04-creating-a-solution/"
---

<div class="info-box note" markdown="1">
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

Recruit, 다시 오신 것을 환영합니다. 이번 미션에서는 Microsoft Copilot Studio로 만든 IT helpdesk agent의 배포 수단인 솔루션을 구성합니다. 솔루션은 에이전트와 관련 구성 요소를 담는 디지털 서류 가방이라고 생각하면 됩니다.

모든 에이전트에는 구조화된 집이 필요하며, Power Platform solution이 바로 그 역할을 합니다. 정리, 이동성, 운영 준비 상태를 모두 제공합니다.

이제 패키징을 시작해 봅시다.

<div class="info-box note" markdown="1">
**중요**
이 미션은 classic Copilot Studio experience를 사용합니다. 이 미션의 스크린샷과 Copilot Studio 화면이 다르게 보인다면, 오른쪽 위의 **New Experience**를 꺼서 여기서 사용하는 **classic experience**로 전환하세요.
</div>

## 목표

이번 미션에서 배우는 내용은 다음과 같습니다.

1. Power Platform solutions가 무엇이며 에이전트 개발을 어떻게 지원하는지 이해하기
1. 솔루션이 에이전트 구성과 배포에 도움이 되는 이유 이해하기
1. solution publisher가 구성 요소를 식별하고 관리하는 방식 이해하기
1. 솔루션이 개발에서 프로덕션으로 이동하는 방식 이해하기
1. IT helpdesk agent용 publisher와 custom solution 만들기

## 솔루션이란 무엇인가요?

Microsoft Power Platform에서 solutions는 앱이나 에이전트의 모든 부분을 담는 컨테이너 또는 패키지와 같습니다. 예를 들어 tables, forms, flows, custom logic이 포함될 수 있습니다. Solutions는 Application Lifecycle Management (ALM)에 필수이며, 아이디어에서 개발, 테스트, 배포, 업데이트까지 앱과 에이전트를 관리할 수 있게 해줍니다.

Copilot Studio에서 만드는 모든 에이전트는 Power Platform solution 안에 저장됩니다. 기본적으로는 **Default solution**에 만들어지지만, 새 custom solution을 만들어 그 안에서 에이전트를 만들 수도 있습니다. 이번 lesson과 hands-on lab에서 바로 그것을 배웁니다 🤓

전통적으로 솔루션은 **Power Apps maker portal**에서 만들었습니다. 이 웹 기반 인터페이스에서 앱을 만들고 사용자 지정하고, Dataverse와 flows를 구성하고, AI 구성 요소 등을 탐색할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.0_01_Solutions.png' | relative_url }}" alt="Power Apps maker portal의 솔루션 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Power Apps maker portal의 솔루션</figcaption>
</figure>

이제 Copilot Studio에는 솔루션을 직접 관리할 수 있는 **Solution Explorer**가 있습니다. 더 이상 솔루션 관리를 위해 Power Apps maker portal로 전환할 필요가 없으며, Copilot Studio 안에서 바로 처리할 수 있습니다 🪄

즉, 다음과 같은 일반적인 솔루션 관련 작업을 수행할 수 있습니다.

- **솔루션 만들기** - custom solutions를 사용하면 에이전트를 환경 간 export/import할 수 있습니다.
- **기본 솔루션 설정** - agents, apps 등이 기본으로 생성될 솔루션을 선택할 수 있습니다.
- **구성 요소 추가 또는 제거** - 에이전트가 environment variables나 cloud flows 같은 다른 구성 요소를 참조할 수 있으므로, 이러한 구성 요소도 솔루션에 포함해야 합니다.
- **솔루션 내보내기** - 솔루션을 다른 대상 환경으로 이동합니다.
- **솔루션 가져오기** - 다른 곳에서 만든 솔루션을 가져오며, 솔루션 upgrade 또는 update도 포함됩니다.
- **솔루션 파이프라인 만들기 및 관리** - 환경 간 솔루션 배포를 자동화합니다.
- **Git 통합** - 개발자가 solutions를 Git repositories와 연결해 version control, collaboration, ALM에 활용할 수 있습니다. 개발 환경에서만 사용하도록 설계되었습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.0_02_CopilotStudioSolutionExplorer.png' | relative_url }}" alt="Copilot Studio에 포함된 Solution Explorer" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio에 포함된 Solution Explorer</figcaption>
</figure>

솔루션에는 두 가지 유형이 있습니다.

- **Unmanaged solutions** - 개발 중에 사용합니다. 필요에 따라 자유롭게 편집하고 사용자 지정할 수 있습니다.
- **Managed solutions** - 앱을 테스트 또는 프로덕션에 배포할 준비가 되었을 때 사용합니다. 실수로 변경되지 않도록 잠겨 있습니다.

## 왜 에이전트에 솔루션을 써야 할까요?

Solutions를 _도구 상자_라고 생각해 보세요. 다른 위치(환경)에서 무언가(에이전트)를 고치거나 만들 때, 필요한 도구(구성 요소)를 모두 모아 도구 상자(Solution)에 넣습니다. 그런 다음 이 도구 상자를 새 위치(환경)로 가져가 도구(구성 요소)를 사용해 작업을 완료하거나, 새 도구(구성 요소)를 더해 만들고 있는 에이전트나 프로젝트를 사용자 지정할 수 있습니다.

<div class="info-box note" markdown="1">
**참고**
여러분의 친근한 cloud advocate Elaiza가 잠시 등장해 몇 마디를 전합니다 🙋🏻‍♀️

뉴질랜드에는 “Be a tidy Kiwi!”라는 말이 있습니다. 뉴질랜드 사람들이 쓰레기를 올바르게 버리고 공공장소를 깨끗하게 유지해 환경을 책임지도록 독려하는 표현입니다 🥝 에이전트에도 같은 맥락을 적용할 수 있습니다. 에이전트와 관련된 모든 것을 정리하고 이동 가능하게 유지하면 깔끔한 환경을 관리하는 데 도움이 됩니다.
</div>

source(developer) environment에서는 에이전트를 전용 솔루션 안에 만드는 것이 좋은 습관입니다. 솔루션이 가치 있는 이유는 다음과 같습니다.

🧩 **체계적인 개발**

- 환경의 모든 것이 들어 있는 Default solution에서 에이전트를 분리해 관리합니다. 에이전트 구성 요소가 모두 한곳에 모입니다 🎯

- 에이전트에 필요한 모든 것이 솔루션 안에 있으므로 대상 환경으로 export/import하기 쉬워집니다 👉🏻 이는 ALM의 건강한 습관입니다.

🧩 **안전한 배포**

- 앱이나 에이전트를 managed solution으로 내보내 testing 또는 production 같은 다른 대상 환경에 배포할 수 있으며, 실수로 편집될 위험을 줄일 수 있습니다.

🧩 **버전 관리**

- patches(대상 수정), updates(더 포괄적인 변경), upgrades(솔루션 교체 - 일반적으로 큰 변경과 새 기능 도입)를 만들 수 있습니다.

- 변경 사항을 통제된 방식으로 배포하는 데 도움이 됩니다.

🧩 **종속성 관리**

- Solutions는 어떤 부분이 다른 부분에 의존하는지 추적합니다. 따라서 변경할 때 무언가를 깨뜨리는 일을 방지할 수 있습니다.

🧩 **팀 협업**

- Developers와 makers는 개발 중 unmanaged solutions를 사용해 함께 작업한 다음, 배포를 위해 managed solution을 넘길 수 있습니다.

## 솔루션 게시자 이해하기

Power Platform의 Solution Publisher는 솔루션을 만든 사람 또는 소유한 주체를 식별하는 라벨 또는 브랜드와 같습니다. 앱, 에이전트, flow 사용자 지정을 관리할 때 작지만 중요한 요소이며, 특히 팀으로 작업하거나 여러 환경을 오갈 때 중요합니다.

솔루션을 만들 때 publisher를 선택해야 하며, publisher는 다음을 정의합니다.

- 모든 custom component에 추가되는 prefix(tables, fields, flows를 떠올려 보세요).

- 솔루션을 소유한 조직 또는 사람의 이름과 연락처 정보

### 왜 중요할까요?

1. **식별이 쉽다** - prefix(예: `new_` 또는 `abc_`)를 보면 어떤 구성 요소가 어떤 솔루션 또는 팀에 속하는지 빠르게 식별할 수 있습니다.

1. **충돌을 막는다** - 두 팀이 `status`라는 column을 만들더라도 prefix(`teamA_status`, `teamB_status`)가 이름 충돌을 방지합니다.

1. **ALM을 지원한다** - Dev → Test → Prod로 솔루션을 이동할 때 publisher가 소유권을 추적하고 일관성을 유지하는 데 도움이 됩니다.

<div class="info-box note" markdown="1">
**예시**

`cts_` prefix를 가진 `Contoso Solutions`라는 publisher를 만든다고 가정해 봅시다.

_Priority_ 라는 custom column을 추가하면 솔루션에는 `cts_Priority`로 저장됩니다.

어떤 환경에서든 솔루션 수준에서 그 column을 보는 사람은 그것이 Contoso Solutions와 연결된 column임을 쉽게 식별할 수 있습니다.
</div>

## Power Platform 솔루션 수명 주기

이제 Solution의 목적을 이해했으니 다음으로 lifecycle을 살펴보겠습니다.

**1. Development 환경에서 Solution 만들기** - Development 환경에서 새 solution을 만드는 것부터 시작합니다.

**2. Components 추가** - apps, flows, tables 및 기타 요소를 solution에 추가합니다.

**3. Managed solution으로 내보내기** - managed solution으로 export해 배포용으로 package합니다.

**4. Test 환경으로 가져오기** - 별도의 Test 환경에서 solution을 테스트해 모든 것이 예상대로 작동하는지 확인합니다.

**5. Production 환경으로 가져오기** - 테스트된 solution을 실제 Production 환경에 배포합니다.

**6. Patches, Updates 또는 Upgrades 적용** - patches, updates, upgrades를 사용해 개선 또는 수정을 적용합니다. 🔁 이 주기를 반복하세요!

<div class="info-box note" markdown="1">
**예시**

직원의 device 문제, network troubleshooting, printer setup 등을 돕는 IT helpdesk agent를 만든다고 가정해 봅시다.

- 먼저 Development 환경에서 unmanaged solution을 사용해 시작합니다.

- 준비가 끝나면 managed solution으로 export하고, System Test 또는 User Acceptance Testing (UAT) 환경 같은 대상 환경으로 import합니다.

- 테스트가 끝나면 원래 개발 버전을 건드리지 않고 Production 환경으로 이동합니다.
</div>

## 실습 04: 새 솔루션 만들기

이제 다음 두 가지를 배웁니다.

- Solution publisher 만들기
- Solution 만들기

앞에서 이어진 예시대로, IT helpdesk agent를 구축할 전용 Copilot Studio 환경 안에 solution을 만들어 보겠습니다.

시작해 보겠습니다!

### 사전 준비

#### 보안 역할

Copilot Studio에서 Solution Explorer로 _할 수 있는_ 작업은 사용자의 security role에 따라 달라집니다. Power Apps admin center에서 솔루션을 관리할 권한이 없다면, Copilot Studio 안에서도 해당 작업을 수행할 수 없습니다.

원활하게 진행하려면 적절한 security roles와 permissions가 있는지 확인하세요. 조직에서 직접 environments를 관리하지 않는다면 tenant/environments를 관리하는 IT administrator(또는 이에 해당하는) 팀에 문의하세요.

다음은 사용자가 자신의 환경에서 solution을 만들 수 있게 하는 security roles입니다.

| Security role | Description |
| ---------- | ---------- |
| Environment Maker | solutions를 포함해 특정 환경 안의 resources를 만들고 사용자 지정하고 관리하는 데 필요한 권한을 제공합니다. |
| System Customizer | Environment Maker보다 넓은 권한을 제공하며, 환경 사용자 지정과 security roles 관리를 포함합니다. |
| System Administrator | 최고 수준의 권한을 가지며, security roles 생성 및 할당을 포함해 환경의 모든 측면을 관리할 수 있습니다. |

#### 개발자 환경

<div class="info-box note" markdown="1">
**주의: 환경 전환**
반드시 전용 developer environment로 전환하세요. 자세한 내용은 [Lesson 00 - Course Setup - Step 3: Create new developer environment]({{ '/chapters/academy-recruit-00-course-setup/' | relative_url }}#step-3-create-new-developer-environment)를 참고하세요.
</div>

1. Copilot Studio header에서 **Environment**를 선택하고, default environment에서 자신의 환경(예: **Adele Vance's environment**)으로 전환합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.0_03_DeveloperEnvironment.png' | relative_url }}" alt="Developer environment가 표시된 environment selector" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>전용 developer environment로 전환</figcaption>
</figure>

### 4.1 솔루션 게시자 만들기

1. Copilot Studio 왼쪽 메뉴에서 **ellipsis icon (...)**을 선택합니다. **Explore** header 아래의 **Solutions**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_01_Solutions.png' | relative_url }}" alt="Solutions 옵션이 있는 Explore Power Platform 메뉴" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Solutions 메뉴 열기</figcaption>
</figure>

1. Copilot Studio의 **Solution Explorer**가 로드됩니다. **+ New solution**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_02_NewSolution.png' | relative_url }}" alt="New solution 버튼이 있는 Solution Explorer" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새 solution 만들기</figcaption>
</figure>

1. **New solution** pane이 나타나며 여기에서 solution의 세부 정보를 정의할 수 있습니다. 먼저 새 publisher를 만들어야 합니다. **+ New publisher**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_03_NewPublisher.png' | relative_url }}" alt="New publisher 버튼이 있는 New solution pane" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새 publisher 만들기</figcaption>
</figure>

1. **New publisher** pane의 **Properties** 탭이 나타나고, **Properties** 탭에서 필수 및 선택 필드를 채울 수 있습니다. 여기에서 솔루션을 만든 사람 또는 소유자를 식별하는 라벨이나 브랜드로 사용될 publisher의 세부 정보를 지정합니다.

   | Property | Description | Required |
   |----------|----------|:----------:|
   | Display name | publisher의 표시 이름 | Yes |
   | Name | publisher의 고유 이름 및 schema name | Yes |
   | Description | 솔루션의 목적 설명 | No |
   | Prefix | 새로 만든 components에 적용될 publisher prefix | Yes |
   | Choice value prefix | publisher prefix를 기반으로 숫자를 생성합니다. 이 숫자는 choices에 옵션을 추가할 때 사용되며, 해당 옵션을 추가하는 데 어떤 solution이 사용되었는지 나타내는 지표를 제공합니다. | Yes |

   **Display name**으로 다음을 복사해 붙여 넣습니다.

   ```text
   Contoso Solutions
   ```

   **Name**으로 다음을 복사해 붙여 넣습니다.

   ```text
   ContosoSolutions
   ```

   **Description**으로 다음을 복사해 붙여 넣습니다.

   ```text
   Copilot Studio Agent Academy
   ```

   **Prefix**로 다음을 복사해 붙여 넣습니다.

   ```text
   cts
   ```

   기본적으로 **Choice value** prefix에는 정수 값이 표시됩니다. 이 정수 값을 가장 가까운 천 단위로 업데이트합니다. 예를 들어 아래 스크린샷에서는 처음에 `77074`였으므로 `77074`에서 `77000`으로 업데이트했습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_04_PublisherProperties.png' | relative_url }}" alt="Contoso 값이 입력된 Publisher properties" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Publisher properties 입력</figcaption>
</figure>

1. Solution의 연락처 정보를 제공하려면 **Contact** 탭을 선택하고 표시되는 다음 열을 채웁니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_05_Contact.png' | relative_url }}" alt="선택적 publisher contact fields" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Publisher contact fields</figcaption>
</figure>

1. **Properties** 탭을 선택한 뒤 **Save**를 선택해 Publisher를 만듭니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_06_SavePublisher.png' | relative_url }}" alt="Save 버튼이 있는 Publisher properties" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Publisher 저장</figcaption>
</figure>

1. New publisher pane이 닫히고, 방금 만든 Publisher가 선택된 상태로 **New solution** pane으로 돌아옵니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.1_07_PublisherSelected.png' | relative_url }}" alt="Contoso publisher가 선택된 New solution pane" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새 Publisher 선택 완료</figcaption>
</figure>

하이파이브, 이제 Solution Publisher를 만들었습니다! 🙌🏻 다음으로 새 custom solution을 만드는 방법을 배웁니다.

### 4.2 새 솔루션 만들기

1. 이제 solutions를 만들었으므로 **New solution** pane의 나머지 form을 완성할 수 있습니다.

   **Display name**으로 다음을 복사해 붙여 넣습니다.

   ```text
   Contoso Helpdesk Agent
   ```

   **Name**으로 다음을 복사해 붙여 넣습니다.

   ```text
   ContosoHelpdeskAgent
   ```

   새 solution을 만드는 것이므로 [**Version** number](https://learn.microsoft.com/power-apps/maker/data-platform/update-solutions#understanding-version-numbers-for-updates/?WT.mc_id=power-172615-ebenitez)는 기본적으로 `1.0.0.0`입니다.

   **Set as your preferred solution** 체크박스를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.2_01_SolutionDetails_.png' | relative_url }}" alt="Contoso Helpdesk Agent solution details" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Contoso Helpdesk Agent solution details</figcaption>
</figure>

1. 추가로 제공할 수 있는 세부 정보를 보려면 **More options**를 펼칩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.2_02_MoreOptions.png' | relative_url }}" alt="Expanded optional solution details" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>추가 solution details 확인</figcaption>
</figure>

1. 다음 항목이 표시됩니다.

   - **Installed on** - Solution이 설치된 날짜입니다.

   - **Configuration page** - developers가 사용자가 앱, 에이전트 또는 도구와 상호작용할 수 있도록 HTML web resource를 설정하는 항목입니다. 지침이나 버튼이 포함된 web page로 Information section에 표시됩니다. 주로 다른 사람들과 solutions를 만들고 공유하는 회사나 developers가 사용합니다.

   - **Description** - solution 또는 configuration page에 대한 설명이나 높은 수준의 설명입니다.

   이번 lab에서는 이 항목들을 비워 둡니다.

   **Create**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.2_03_Create.png' | relative_url }}" alt="Create 버튼이 있는 New solution pane" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Solution 생성</figcaption>
</figure>

1. 이제 Contoso Helpdesk Agent solution이 만들어졌습니다. Copilot Studio에서 agent를 만들기 전까지 components는 0개입니다.

   **Back**을 선택해 **Solution Explorer**로 돌아갑니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.2_04_SolutionCreated.png' | relative_url }}" alt="Created Contoso Helpdesk Agent solution" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Contoso Helpdesk Agent solution 생성 완료</figcaption>
</figure>

1. 앞서 **Set as your preferred solution** 체크박스를 선택했으므로, 이제 Contoso Helpdesk Agent가 **Current preferred solution**으로 표시됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-04-creating-a-solution/4.2_05_CurrentPreferredSolutionSelected.png' | relative_url }}" alt="Current preferred solution으로 표시된 Contoso Helpdesk Agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Current preferred solution 설정 확인</figcaption>
</figure>

## 미션 완료

성공적으로 완료한 내용은 다음과 같습니다.

- **Solution publisher**: custom prefix가 있는 publisher를 만들었습니다.
- **Custom solution**: Contoso Helpdesk Agent용 solution을 만들었습니다.
- **Preferred solution**: 새 components의 기본 위치로 solution을 설정했습니다.
- **Application lifecycle management**: environments 간에 agent를 이동하기 위한 기반을 마련했습니다.

다음으로 [미션 05: 사전 구축 에이전트 사용하기]({{ '/chapters/academy-recruit-05-using-prebuilt-agents/' | relative_url }})를 계속 진행하세요.

## 참고 자료

- [Create a solution](https://learn.microsoft.com/power-apps/maker/data-platform/create-solution/?WT.mc_id=power-172615-ebenitez)

- [Create and manage solutions in Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/authoring-solutions-overview/?WT.mc_id=power-172615-ebenitez)

- [Share agents with other users](https://learn.microsoft.com/microsoft-copilot-studio/admin-share-bots/?WT.mc_id=power-172615-ebenitez)

- [Summary of resources available to predefined security roles](https://learn.microsoft.com/power-platform/admin/database-security#summary-of-resources-available-to-predefined-security-roles/?WT.mc_id=power-172615-ebenitez)

- [Upgrade or update a solution](https://learn.microsoft.com/power-apps/maker/data-platform/update-solutions/?WT.mc_id=power-172615-ebenitez)

- [Overview of pipelines in Power Platform](https://learn.microsoft.com/power-platform/alm/pipelines/?WT.mc_id=power-172615-ebenitez)

- [Overview of Git integration in Power Platform](https://learn.microsoft.com/power-platform/alm/git-integration/overview/?WT.mc_id=power-172615-ebenitez)
