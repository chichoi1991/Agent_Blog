---
layout: "chapter"
title: "사전 구축 에이전트 활용하기"
short_title: "사전 구축 에이전트"
description: "템플릿 에이전트를 사용하고 사용자 지정해 더 빠르게 시작하는 방법."
order: 5
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/05-using-prebuilt-agents/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-11"
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

Copilot Studio Agent Academy의 다음 미션에 오신 것을 환영합니다. 이번에는 Microsoft가 미리 만들어 둔 **pre-built agents**를 살펴봅니다. 이런 에이전트는 배포 속도를 높이고 가치를 더 빨리 확인할 수 있도록 설계된 목적형 템플릿입니다.

처음부터 직접 만들지 않아도, pre-built agents(또는 **agent templates**)는 바로 사용할 수 있는 시나리오를 제공하므로 몇 분 안에 사용자 지정하고 배포할 수 있습니다.

이번 미션에서는 **Safe Travels** agent를 배포합니다. 이 에이전트는 사용자가 출장 준비를 하고, 회사 정책을 이해하고, 계획을 더 쉽게 세울 수 있도록 도와줍니다.

<div class="info-box note" markdown="1">
**참고**
이 실습의 스크린샷과 Copilot Studio 화면이 다르게 보인다면, 오른쪽 위의 **New Experience**를 꺼서 여기서 사용하는 **classic experience**로 전환하세요.
</div>

## 목표

이번 미션의 목표는 다음과 같습니다.

1. pre-built agents가 무엇이며 왜 중요한지 이해하기
2. **Safe Travels** agent template 배포하기
3. 에이전트 응답과 콘텐츠 사용자 지정하기
4. 에이전트 테스트 및 게시하기

## Pre-Built Agents란?

Pre-built agents는 Microsoft가 만든 즉시 활용 가능한 AI 에이전트로, 다음과 같은 특징이 있습니다.

- travel, HR, IT support처럼 자주 쓰이는 비즈니스 시나리오를 다룹니다.
- 완성된 topics, trigger phrases, instructions, sample knowledge를 포함합니다.
- 필요에 따라 편집, 확장, 자체 데이터로 grounding할 수 있습니다.

따라서 빠르게 시작하거나, 에이전트가 어떻게 구성되는지 학습하기에 적합합니다.

## 실습 05: 사전 구축 에이전트로 빠르게 시작하기

이제 pre-built agent를 선택하고 사용자 지정하는 방법을 살펴보겠습니다.

앞선 예제와 이어서, 전용 Copilot Studio 환경에서 IT helpdesk agent를 만들기 위한 기반을 계속 사용합니다.

시작해 보겠습니다.

### 5.1 Copilot Studio 실행

1. [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com)으로 이동합니다.

2. Microsoft 365 회사 또는 학교 계정으로 로그인합니다.

<div class="info-box note" markdown="1">
**주의**
Copilot Studio가 활성화된 tenant여야 합니다. Copilot Studio가 보이지 않으면 [/chapters/academy-recruit-00-course-setup/](/chapters/academy-recruit-00-course-setup/)으로 돌아가 환경 구성을 먼저 완료하세요.
</div>

### 5.2 Safe Travels Agent Template 선택

1. Copilot Studio 홈에서 **+ Create**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/create.png' | relative_url }}" alt="Copilot Studio 홈에서 Create를 선택하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Create 선택</figcaption>
</figure>

2. **Start with an agent template** 섹션까지 아래로 스크롤합니다.

3. **Safe Travels**를 찾아 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/choose_template.png' | relative_url }}" alt="Safe Travels 템플릿 선택 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Safe Travels 템플릿 선택</figcaption>
</figure>

4. 이 템플릿에는 설명, instructions, knowledge가 이미 포함되어 있는 것을 확인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/template-setup.png' | relative_url }}" alt="Safe Travels 템플릿 구성 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>템플릿 기본 구성 확인</figcaption>
</figure>

5. **Create**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/create-agent-setup.png' | relative_url }}" alt="Safe Travels 에이전트 생성 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>템플릿에서 에이전트 생성</figcaption>
</figure>

그러면 현재 환경에 Safe Travels 구성을 기반으로 한 새 에이전트가 생성됩니다.

### 5.3 에이전트 사용자 지정

에이전트가 생성되었으니, 이제 조직에 맞게 조정해 보겠습니다.

1. 유럽 여행 관련 질문에도 답할 수 있도록 knowledge source를 하나 더 추가합니다. 아래로 내려가 **knowledge** 섹션에서 **Add knowledge**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/knowledge.png' | relative_url }}" alt="knowledge 섹션에서 Add knowledge를 선택하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>지식 소스 추가</figcaption>
</figure>

2. **Public websites**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/public-website.png' | relative_url }}" alt="Public websites 선택 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Public websites 선택</figcaption>
</figure>

3. 입력란에 **<https://european-union.europa.eu/>**를 붙여 넣고 **Add**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/paste-add.png' | relative_url }}" alt="공용 웹사이트 URL을 추가하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>유럽연합 웹사이트 추가</figcaption>
</figure>

4. **Add to agent**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/add-to-agent.png' | relative_url }}" alt="웹사이트를 에이전트에 연결하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>에이전트에 지식 연결</figcaption>
</figure>

### 5.4 테스트 및 게시

1. 오른쪽 위 **Test**를 선택해 테스트 창을 엽니다.

2. 다음과 같은 문장을 입력해 봅니다.

   - `“Do I need a visa to travel from the US to Amsterdam?”`
   - `“How long does it take to get a US Passport?”`
   - `“Where is the closest US embassy in Valencia, Spain?”`

3. 에이전트가 정확하고 도움이 되는 정보를 반환하는지 확인하고, Activity Map에서 어떤 정보를 참고했는지도 함께 살펴봅니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/response-passport.png' | relative_url }}" alt="Safe Travels 에이전트 테스트 응답 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>테스트 응답과 Activity Map 확인</figcaption>
</figure>

4. 준비가 되면 **Publish**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/publish-1.png' | relative_url }}" alt="에이전트 게시 첫 단계 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>게시 시작</figcaption>
</figure>

5. 대화 상자에서 다시 한 번 **Publish**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-05-using-prebuilt-agents/publish-2.png' | relative_url }}" alt="에이전트 게시 확인 대화상자 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>게시 확인</figcaption>
</figure>

6. 필요하다면 기본 제공 **Channels** 기능을 사용해 Microsoft Teams에도 에이전트를 추가할 수 있습니다.

<div class="info-box note" markdown="1">
**보너스 목표**
Safe Travels agent를 SharePoint 사이트나 FAQ 파일로 grounding해, 조직의 실제 출장 정책에 더 맞는 응답을 하도록 확장해 보세요.
</div>

## 미션 완료

이제 여러분은 다음 작업을 완료했습니다.

- Microsoft의 pre-built agent 배포
- 에이전트 사용자 지정
- **Safe Travels** agent template의 테스트 및 게시

다음 학습은 [/chapters/academy-recruit-06-create-agent-from-conversation/](/chapters/academy-recruit-06-create-agent-from-conversation/)에서 이어집니다.
