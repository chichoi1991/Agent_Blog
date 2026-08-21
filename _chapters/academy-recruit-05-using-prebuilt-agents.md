---
layout: "chapter"
date: 2026-08-06
title: "사전 구축 에이전트 활용하기"
short_title: "사전 구축 에이전트"
description: "템플릿 에이전트를 사용하고 사용자 지정해 더 빠르게 시작하는 방법."
order: 5
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/05-using-prebuilt-agents/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/05-using-prebuilt-agents/"
---

<div class="info-box note translated-post" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🧰 Mission 05: Using a Pre-Built Agent](https://microsoft.github.io/agent-academy/recruit/05-using-prebuilt-agents/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# 미션 05: 사전 구축 에이전트 활용하기

🎥 **실습 영상**

<figure class="screenshot">
  <a href="https://www.youtube.com/watch?v=NmXsx8WjWuM" target="_blank" rel="noopener noreferrer">
    <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/video-thumbnail.jpg' | relative_url }}" alt="사전 구축 에이전트 실습 영상 썸네일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
  <figcaption>YouTube에서 실습 영상 보기</figcaption>
</figure>

## 미션 브리프

Copilot Studio Agent Academy의 다음 미션에 오신 것을 환영합니다. 이번에는 Microsoft가 배포 속도를 높이고 가치를 더 빨리 확인할 수 있도록 만든, 지능적이고 목적 지향적인 **pre-built agents**의 세계를 살펴봅니다.

처음부터 직접 만들지 않아도, pre-built agents(또는 **agent templates**)는 바로 사용할 수 있는 시나리오를 제공하므로 몇 분 안에 사용자 지정하고 배포할 수 있습니다.

Contoso IT helpdesk agent를 준비하는 동안 또 다른 요구 사항이 들어왔습니다. 직원들이 출장 준비를 하고 출장 정책을 찾는 데도 도움이 필요합니다. 이는 직원 지원과 관련되어 있지만 목적과 지식 영역이 분명히 다릅니다. IT helpdesk agent의 핵심 책임을 넘어 확장하는 대신, 출장 시나리오에 초점을 맞춘 에이전트를 사용할 수 있습니다.

이번 미션에서는 main helpdesk 빌드에서 잠시 벗어나 **Safe Travels** template을 배포합니다. pre-built agent가 새 요구 사항을 빠르게 충족하면서도 각 에이전트가 명확한 책임에 집중하도록 유지하는 방법을 확인합니다.

<div class="info-box note" markdown="1">
**중요: 이 미션은 classic Copilot Studio experience를 사용합니다**

이 미션의 스크린샷과 Copilot Studio 화면이 다르게 보인다면, 오른쪽 위의 **New Experience**를 꺼서 여기서 사용하는 **classic experience**로 다시 전환하세요.
</div>

## 목표

이번 미션에서는 다음을 배웁니다.

1. pre-built agents가 일반적인 비즈니스 시나리오를 빠르게 시작하게 해 주는 이유
1. **Safe Travels** agent template을 배포하는 방법
1. 에이전트의 knowledge를 사용자 지정하는 방법
1. pre-built agent를 테스트하고 게시하는 방법

## 사전 구축 에이전트란?

Pre-built agents는 Microsoft가 만든 즉시 활용 가능한 AI 에이전트로, 다음과 같은 특징이 있습니다.

- travel, HR, IT support처럼 자주 쓰이는 비즈니스 요구 사항을 다룹니다.
- 완성된 topics, trigger phrases, instructions, sample knowledge를 포함합니다.
- 필요에 따라 편집, 확장하고 자체 데이터로 grounding할 수 있습니다.

따라서 빠르게 시작하거나, 에이전트가 어떻게 구성되는지 학습하기에 적합합니다.

## 실습 05: 사전 구축 에이전트로 빠르게 시작하기

이 실습에서는 새 travel-support 요구 사항에 대응하기 위해 pre-built agent를 선택하고 사용자 지정합니다. Safe Travels agent는 Contoso IT helpdesk agent의 확장이 아니라 독립적인, 초점이 분명한 에이전트입니다.

시작해 보겠습니다.

### 5.1 Copilot Studio 실행

1. [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com)으로 이동합니다.

1. Microsoft 365 회사 또는 학교 계정으로 로그인합니다.

### 5.2 Safe Travels 에이전트 템플릿 선택

1. 왼쪽 메뉴에서 **Agents** 탭을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/5.1.01_agentstab.png' | relative_url }}" alt="Agents 탭을 선택하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Agents 탭 선택</figcaption>
</figure>

1. **Start with an agent template** 섹션까지 아래로 스크롤합니다. **Safe Travels** template을 찾아 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/5.1.02_templateselect.png' | relative_url }}" alt="Safe Travels 템플릿 선택 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Safe Travels 템플릿 선택</figcaption>
</figure>

1. 이 템플릿에는 description, instructions, knowledge가 이미 포함되어 있는 것을 확인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/template-setup.png' | relative_url }}" alt="Safe Travels 템플릿 구성 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>템플릿 기본 구성 확인</figcaption>
</figure>

1. **Create**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/create-agent-setup.png' | relative_url }}" alt="Create 버튼이 있는 Safe Travels 템플릿 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>템플릿에서 에이전트 생성</figcaption>
</figure>

그러면 현재 환경에 Safe Travels 구성을 기반으로 한 새 에이전트가 생성됩니다.

### 5.3 에이전트 사용자 지정

에이전트가 생성되었으니, 이제 조직에 맞게 조정해 보겠습니다.

1. 유럽 여행 관련 질문에도 답할 수 있도록 agent에 knowledge source를 하나 더 추가합니다. 아래로 내려가 **knowledge** 섹션에서 **Add knowledge**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/knowledge.png' | relative_url }}" alt="Safe Travels Knowledge 섹션에서 Add knowledge를 선택하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>지식 소스 추가</figcaption>
</figure>

1. **Public websites**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/public-website.png' | relative_url }}" alt="Public websites 선택 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Public websites 선택</figcaption>
</figure>

1. 입력란에 **<https://european-union.europa.eu/>**를 붙여 넣고 **Add**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/paste-add.png' | relative_url }}" alt="European Union URL을 공용 웹사이트 필드에 추가하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>유럽연합 웹사이트 추가</figcaption>
</figure>

1. **Add to agent**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/add-to-agent.png' | relative_url }}" alt="Knowledge source를 agent에 추가할 준비가 된 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>에이전트에 지식 연결</figcaption>
</figure>

### 5.4 테스트 및 게시

1. **Test**를 선택해 테스트 창을 엽니다.

1. 다음과 같은 문장을 입력해 봅니다.

   - `“Do I need a visa to travel from the US to Amsterdam?”`
   - `“How long does it take to get a US Passport?”`
   - `“Where is the closest US embassy in Valencia, Spain?”`

1. 에이전트가 정확하고 도움이 되는 정보로 응답하는지 확인하고, Activity Map을 살펴보며 어디에서 정보를 가져왔는지도 확인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/response-passport.png' | relative_url }}" alt="Safe Travels가 여권 질문에 응답하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>테스트 응답과 Activity Map 확인</figcaption>
</figure>

1. 준비가 되면 **Publish**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/publish-1.png' | relative_url }}" alt="Publish 버튼이 있는 Safe Travels agent 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>게시 시작</figcaption>
</figure>

1. 대화 상자에서 다시 한 번 **Publish**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/publish-2.png' | relative_url }}" alt="Safe Travels 게시 확인 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>게시 확인</figcaption>
</figure>

1. 필요하다면 기본 제공 **Channels** 기능을 사용해 Microsoft Teams에도 에이전트를 추가할 수 있습니다.

<div class="info-box note" markdown="1">
**참고: 🧳 보너스 목표**

Safe Travels agent를 SharePoint 사이트나 FAQ 파일로 grounding해, 조직의 실제 출장 정책에 더 맞는 응답을 하도록 만들어 보세요.
</div>

## 미션 완료

이제 여러분은 다음 작업을 성공적으로 완료했습니다.

- **Template selection**: 초점이 분명한 비즈니스 요구 사항에 맞는 pre-built agent를 선택했습니다.
- **Agent deployment**: **Safe Travels** template을 배포했습니다.
- **Knowledge customization**: 공용 웹사이트를 knowledge source로 추가했습니다.
- **Testing and publishing**: 사용자 지정한 agent를 테스트하고 게시했습니다.

출장 지원 요구 사항을 해결하기 위해 초점이 분명한 agent를 사용했으므로, Contoso IT helpdesk agent에 관련 없는 책임을 추가하지 않아도 됩니다. 다음 미션에서는 main course scenario로 돌아가 custom helpdesk agent를 처음부터 빌드합니다.

다음은 [미션 06: Custom Agent 빌드]({{ '/chapters/academy-recruit-06-create-agent-from-conversation/' | relative_url }})로 이어집니다.

## 참고 자료

- [Create and delete agents](https://learn.microsoft.com/microsoft-copilot-studio/authoring-first-bot?WT.mc_id=power-172617-ebenitez)
- [Add knowledge to an agent](https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-existing-copilot)
- [Watch the Safe Travels walkthrough](https://www.youtube.com/watch?v=NmXsx8WjWuM)
