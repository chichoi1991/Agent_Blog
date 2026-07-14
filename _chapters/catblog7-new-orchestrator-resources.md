---
layout: "chapter"
date: 2026-07-07
title: "새 오케스트레이터, 새 규칙? CAT이 있습니다"
short_title: "새 오케스트레이터 리소스 가이드"
description: "새로운 Copilot Studio 경험의 개념을 이해하고, 실제 동작을 확인하고, 기존 classic 에이전트를 마이그레이션하는 세 가지 리소스를 소개합니다."
order: 7
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/"
source_author: "giorgioughini, roels, adilei, henryjammes, chrisgarty, lewisdoesdev, adrianatruji"
source_published: "2026-07-07"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 giorgioughini, roels, adilei, henryjammes, chrisgarty, lewisdoesdev, adrianatruji 원문 [New Orchestrator, New Rules? CAT's Got You](https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/)(2026-07-07)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/new-orchestrator-resources/header.png' | relative_url }}" alt="새로운 modern 에이전트를 위한 세 가지 리소스: 마이그레이션, 샘플, 새 스택 심층 분석 덱" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

새로운 Copilot Studio 경험과 그 아래를 받치는 오케스트레이션 스택은 큰 변화입니다. 에이전트와 워크플로를 위한 새로운 패러다임입니다. 에이전트는 훨씬 더 적응적이고 정교해졌고, 워크플로는 시각적 캔버스에서 자동화된 프로세스를 구축하면서 각 단계를 AI가 처리할지 여부를 훨씬 세밀하게 제어할 수 있게 해줍니다. 새로운 역량이 대거 추가된 만큼, 설계 방식도 달라집니다.

새로운 설계 공간, 새 스택, 새로운 질문들 — 무엇이 달라졌나? 무엇을 만들어야 하나? 기존 classic 에이전트는 어떻게 되나? CAT은 이 질문들에 답하기 위해 세 가지 리소스를 출시했습니다. 각각을 어떻게 활용하는지 소개합니다.

| 하고 싶은 것 | 사용할 리소스 |
| --- | --- |
| 무엇이 달라졌는지 이해하고 설명하기 | **[심층 분석 덱(Deep Dive deck)](https://aka.ms/CopilotStudioDeepDiveDeck)** |
| 실제로 동작하는 모습 보기 | **[미니 사이트(mini-site)](https://aka.ms/MCSTechGuide)** |
| classic 에이전트 마이그레이션하기 | **[플러그인(plugin)](https://github.com/microsoft/copilot-studio-plugin)** |

## 이해하기: 기술 심층 분석 덱

**활용 시점:** 무엇이 달라졌는지, 왜 달라졌는지 직접 배우거나 다른 사람에게 설명해야 할 때. [Copilot Studio Technical Deep Dive deck](https://aka.ms/CopilotStudioDeepDiveDeck)을 다운로드하세요. 에이전트·워크플로 빌더와 아키텍트를 위해 만들어졌으며, 기능 투어보다는 의사결정 프레임워크에 가깝습니다. 구체적으로는 다음 내용을 다룹니다:

- **어디에 무엇을 만들 것인가** — 에이전트 vs. 워크플로, 각 구성 요소의 역할
- **모던 에이전트·워크플로를 만드는 방법**
- **classic에서 modern으로 마이그레이션하는 방법** — 단순히 예전 설계를 그대로 옮기지 않고
- 개선된 점과 아직 지원되지 않는 부분에 대한 솔직한 평가

**핵심 아이디어 한 가지:** 모든 동작은 신뢰성과 가시성을 확보할 수 있는 가장 작은 컴포넌트에 배치해야 합니다. Instructions는 항상 사실인 것, Knowledge는 검색 가능한 사실, Tools는 시스템 액션, Memory는 영속 컨텍스트, Skills는 상황별 절차, 연결된 에이전트(connected agents)는 실제 전문 도메인을 담당합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/new-orchestrator-resources/componentslide.png' | relative_url }}" alt="심층 분석 덱의 새 컴포넌트 모델 슬라이드: instructions, knowledge, tools, memory, Skills, connected agents 각각의 역할" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>기술 심층 분석 덱의 새 컴포넌트 모델 슬라이드 — instructions, knowledge, tools, memory, Skills, connected agents가 각자의 역할을 맡습니다.</figcaption>
</figure>

## 확인하기: 미니 사이트와 샘플

**활용 시점:** "슬라이드는 이해했다"에서 "실제로 동작하는 모습을 보여줘"로 넘어갈 준비가 됐을 때. [기술 가이드 미니 사이트](https://aka.ms/MCSTechGuide)를 열어 빌딩 블록을 읽고, 시나리오 대화 기록을 실행해 보고, 솔루션을 다운로드해 자신의 Power Platform 환경에 배포하세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/new-orchestrator-resources/minisite.png' | relative_url }}" alt="BlastBox Omega 샘플과 두 가지 시나리오를 중심으로 구성된 미니 사이트 홈페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>미니 사이트 홈페이지 — BlastBox Omega 샘플과 두 가지 시나리오를 중심으로 구성되어 있습니다.</figcaption>
</figure>

이건 이야기를 곁들인 스크린샷이 아니라, 실제 배포 가능한 샘플입니다. 레트로-퓨처 게임 스토어를 에이전트로 운영하는 **BlastBox Omega**는 슬라이드가 약속만 할 수 있는 것들을 새 경험이 실제로 해내는 모습을 보여줍니다: 여러 턴에 걸쳐 추론하고, 전문 에이전트에게 위임하고, 실제 액션을 수행하고, 실제 산출물을 만들어 내는 에이전트들이죠. 두 가지 시나리오가 그 내용을 구체적으로 보여줍니다:

- **Self-Serve Card Reissue** — 에이전트가 회원 요청을 처음부터 끝까지 직접 처리하면서, 실제 쓰기 액션 전에 신원 확인을 거치고 생성된 파일을 돌려줍니다.
- **Block Party Trade-Up** — 핵심 시나리오로, 부모 에이전트가 전문 에이전트들을 조율해 복잡하고 다부분(multi-part) 요청을 풀어내고 다운로드 가능한 문서로 마무리합니다.

진정한 교훈은 각 책임이 어디에 위치하는지 보는 것입니다. 전문적 추론은 connected agents에, 액션은 tools에, 반복 가능한 절차는 Skills에, 정밀한 계산은 코드에. 모던 에이전트는 43개 도구와 기도로 버티는 하나의 instruction 덩어리가 되어서는 안 됩니다.

## 마이그레이션하기: Copilot Studio 플러그인

**활용 시점:** classic 에이전트가 있고 모던 버전으로의 출발점이 필요할 때. [AI 코딩 에이전트용 Copilot Studio 플러그인](https://github.com/microsoft/copilot-studio-plugin)을 설치한 뒤, 에이전트의 환경, 테넌트, Copilot Studio URL 및 제약 조건을 함께 `/migrate` 명령어로 전달하세요. 플러그인이 classic 에이전트를 가져와 구조를 분석하고 모던 아키텍처를 제안한 뒤, 테스트해 볼 수 있는 마이그레이션된 에이전트를 생성합니다. (이전 [Claude Code 플러그인 데모](https://microsoft.github.io/mcscatblog/posts/claude-copilot-skills-copilot-studio-plugin-demo/)와 같은 로컬 우선 방식을 그대로 유지하되, 새 스택 지원이 추가됐습니다.)

<figure class="screenshot">
  <img src="{{ '/assets/catblog/new-orchestrator-resources/plugin.png' | relative_url }}" alt="플러그인이 classic 에이전트를 분석하고 모던 아키텍처를 제안하며 마이그레이션된 에이전트를 생성하는 흐름" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>플러그인이 classic 에이전트를 분석하고 모던 아키텍처를 제안한 뒤, 테스트용 마이그레이션 에이전트를 생성합니다.</figcaption>
</figure>

> 시작 프롬프트 예시: `/mcs-assistant:migrate Migrate this agent to modern orchestration: https://copilotstudio.microsoft.com/environments/<ENV_ID>/bots/<BOT_ID> from tenant <TENANT_ID>`. 성능 좋은 AI 모델을 사용하세요.

핵심 단어는 **제안(propose)**입니다. 테스트에서 좋은 성능을 보였지만, 이 도구는 빠른 보조 도구이지 "아키텍처를 알아서 완벽하게 만들어 주는 버튼"이 아닙니다. 기존에 존재했다는 이유만으로 모든 토픽을 Skill로, 모든 변수를 memory로 바꾸지 마세요. 그건 YAML로 하는 고고학입니다. 과제를 이해하고, 반드시 작동해야 하는 결과를 유지하고, 각 책임을 모던 컴포넌트에 매핑한 뒤, 핵심 여정에 대해 평가(eval)를 돌려보세요.

> 결과물은 초안으로 취급하세요. 실행해 보고, 검토하고, 기존 eval과 비교한 뒤, 충분한지 판단하세요.

## 이것이 진입로입니다

새로운 경험은 단순히 새 UI가 아니라 다른 멘탈 모델이고, 그 점이 부담스럽게 느껴질 수 있습니다. 그래서 CAT은 세 단계로 정리했습니다: **덱**으로 개념을 잡고, **미니 사이트**로 동작을 확인하고, **플러그인**으로 실제 에이전트에 적용해 보세요. CAT이 함께합니다.

샘플이나 마이그레이션 Skill을 사용해 보셨나요? 어떤 점이 놀라웠는지, 플러그인이 제안한 아키텍처가 여러분이 직접 재설계했을 방식과 얼마나 일치했는지 의견을 나눠 주세요.
