---
layout: "chapter"
title: "Copilot & Agents Bootcamp 살펴보기: 바로 실행할 수 있는 모든 세션과 실습"
short_title: "Copilot & Agents Bootcamp"
description: "새로워진 Copilot & Agents Bootcamp의 3일 과정, 17개 모듈과 11개 실습, 조직에서 재사용하는 방법을 소개함"
order: 26
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/copilot-agents-bootcamp/"
source_author: "chrisgarty"
source_published: "2026-11-21"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/copilot-agents-bootcamp/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/) (Microsoft Copilot Studio CAT)의 chrisgarty(@chrisgarty) 원문 [Inside the Copilot & Agents Bootcamp: Every Session and Lab, Ready for You to Run](https://microsoft.github.io/mcscatblog/posts/copilot-agents-bootcamp/)(2026-11-21)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-agents-bootcamp/header.png' | relative_url }}" alt="Copilot & Agents Bootcamp: Copilot Chat의 지원 작업, Cowork의 반복 작업, Copilot Studio 에이전트의 프로덕션 작업을 보여주는 실습 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

사람들은 종종 같은 질문을 합니다. "우리 직원들은 Copilot Chat, Cowork, 에이전트를 사용하고 있습니다. 일부는 프롬프트와 스킬을 공유하고 일부 제작자는 에이전트를 만들고 있습니다. Copilot 생태계의 다양한 기능을 더 많은 조직 구성원이 이해하도록 돕고, 조직 전체가 신뢰할 수 있는 것으로 만들려면 어떻게 해야 할까요?"

이 질문을 바탕으로 지난주 11월 10~12일 애틀랜타에서 제가 Copilot Acceleration Team (CAT)의 AI Architect 동료와 Copilot Agents and Platform Ecosystem (CAPE) 팀 동료들과 함께 진행한 [Copilot & Agents Bootcamp](https://microsoft.github.io/mcs-labs/events/architecture-bootcamp/)가 만들어졌습니다. 3일 동안 17개 모듈, 11개 실습, 많은 유익한 대화를 진행했습니다.

CAT 및 CAPE 팀은 여러 지역에서 긴밀히 협력하는 고객을 대상으로 오프라인 부트캠프를 제공합니다. 하지만 콘텐츠를 활용하기 위해 비행기를 탈 필요는 없습니다. 모든 모듈, 슬라이드 덱, 실습이 온라인에 공개되어 있어 자신의 속도에 맞춰 학습하거나 조직 내 세션을 진행할 수 있습니다. 이 글에서는 최근 변경 사항, 부트캠프의 전체 흐름과 일정, CAT의 도움을 받아 학습 내용을 공유하거나 적용하는 방법을 소개합니다.

## Architecture Bootcamp에서 Copilot & Agents Bootcamp로

이전 CAT 부트캠프에 참여했다면 **Copilot Studio Architecture Bootcamp**라는 이름을 기억할 것입니다. 새 이름인 **Copilot & Agents Bootcamp**는 더 넓어진 범위를 반영합니다. Copilot Studio는 여전히 중심이지만 사용자가 처음부터 Copilot Studio에서 시작하지는 않습니다. Copilot Chat에서 시작하고, 점점 더 많은 다단계 작업을 Copilot Cowork에서 수행하며, 일부는 Copilot Code로 앱을 만듭니다. 아키텍트가 에이전트를 어디에 둘지 올바르게 결정하려면 이 전체 환경을 이해해야 합니다.

새로워진 부트캠프에는 다음 세션과 실습이 포함됩니다.

- **Copilot Chat 및 Work IQ:** 웹과 업무 맥락에 근거한 응답, 응답 모드, Researcher, Analyst
- **Copilot Cowork:** 다단계 작업을 위한 스킬, 플러그인, 코드
- **Copilot Code:** 간단한 웹 앱 만들기 및 게시
- **하네스:** Microsoft Copilot 하네스(이전 GitHub Copilot 또는 GHCP 하네스), Copilot Chat 하네스(선언형 에이전트), Standard 하네스, Customer Conversation 하네스, Microsoft Copilot Managed Runtime의 앱
- **FinOps 및 거버넌스:** 크레딧 소비 계획, 에이전트 ID, ALM, 평가, Copilot Agent Kit

애틀랜타 세션을 위해 모든 기존 세션과 실습을 새로 검토해 스크린샷, 단계, 안내가 현재 제품에 맞도록 업데이트했습니다.

## 내러티브: 지원, 반복 가능, 프로덕션 준비

3일간 계속 돌아온 아이디어는 *진행 단계*였습니다. 대부분의 조직에는 이미 각 단계의 사용자가 있습니다. 작업이 어느 단계에 해당하는지 파악하고 의도적으로 다음 단계로 발전시키는 것이 목표입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-agents-bootcamp/assisted-repeatable-production.png' | relative_url }}" alt="Copilot Chat 요약, Copilot Cowork 생성 슬라이드, 스킬을 불러오는 Copilot Studio 에이전트를 보여주는 세 가지 실습 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실습에서 경험하는 같은 단계: 근거 기반 요약을 위한 Copilot Chat, 반복 가능한 결과를 위한 Cowork, 프로덕션 결과물을 위한 Copilot Studio 에이전트</figcaption>
</figure>

**Copilot Chat에서 지원받는 작업.** 사용자가 질문하면 Copilot은 Work IQ를 통해 웹과 업무 맥락에 근거한 답변을 만들고 사용자가 활용할 수 있는 요약을 제공합니다. 빠르고 개인화됐지만 매번 사용자가 적절한 질문을 해야 합니다. 업무 맥락을 검색하고 제어하는 방법은 [Work IQ: 사용, 라이선스, 제어](https://microsoft.github.io/mcscatblog/posts/work-iq-context-layer-you-already-have/)를 참고하세요.

**Copilot Cowork에서 반복 가능한 작업.** 계정 브리핑 작성이나 영업 인사이트를 후속 조치로 바꾸는 등 같은 다단계 작업이 반복된다면 Cowork에서 절차를 스킬이나 플러그인으로 패키징할 수 있습니다. 작업이 매번 같은 방식으로 실행되고 다른 사람도 같은 작업을 수행하도록 스킬이나 플러그인을 공유할 수 있습니다.

**Copilot Studio에서 프로덕션 준비 작업.** 출력 품질이 프로덕션 수준이어야 하고, 팀 전체에서 사용하고, 한 번 버전 관리·업데이트해 모두에게 적용하며 거버넌스해야 할 때 에이전트를 만들 차례입니다. Copilot Studio는 지침, 스킬, 지식, 도구, Hooks, 평가, 워크플로, 수명 주기 관리, 모니터링, 거버넌스를 제공합니다. 에이전트를 사용하면 개인 프롬프트 수십 개 대신 하나의 일관되고 근거에 기반한 동작을 모두가 활용할 수 있습니다.

### 실습도 같은 내러티브를 따름

첫날부터 둘째 날 오전까지의 흐름을 살펴보겠습니다.

**실습 1**에서는 Copilot Chat과 Work IQ를 사용해 업로드한 보고서 및 회사 정책에 근거한 비즈니스 요약을 준비합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-agents-bootcamp/lab1-chat-preread.webp' | relative_url }}" alt="세 가지 주요 결과와 인용을 포함한 분기별 비즈니스 리뷰 사전 자료를 보여주는 Copilot Chat 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실습 1: Copilot Chat에서 인용이 포함된 비즈니스 리뷰 사전 자료 생성</figcaption>
</figure>

**실습 2**에서는 일반 영업 작업에 Copilot Chat, 영업 에이전트, Cowork를 비교해 적절한 도구를 선택하는 연습을 합니다. 특정 팀용 스킬을 묶은 Cowork 플러그인도 사용합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-agents-bootcamp/lab2-cowork-sales-plugin.webp' | relative_url }}" alt="zava-sales 및 daily-crm-update 스킬이 있는 Zava Sales Cowork 플러그인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실습 2: 매번 동일하게 작업하도록 영업 스킬을 패키징한 Cowork 플러그인</figcaption>
</figure>

**실습 4**에서는 Cowork 스킬을 Copilot Chat 하네스 에이전트(선언형 에이전트)에 업로드해 반복 작업을 공유 작업으로 발전시키는 방법을 다룹니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-agents-bootcamp/lab4-upload-skill.webp' | relative_url }}" alt="hotel-operations-briefing zip 파일을 선택한 Agent Builder의 스킬 업로드 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실습 4: Cowork 스킬을 선언형 에이전트에서 재사용</figcaption>
</figure>

**실습 6**에서는 제안 요청서(RFP)에 응답하는 Microsoft Copilot 하네스 에이전트를 만들고 지침과 스킬을 함께 사용합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-agents-bootcamp/lab6-skill-load-trace.webp' | relative_url }}" alt="rfp-response 스킬이 로드되는 Microsoft Copilot 하네스 에이전트 활동" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실습 6: 요청과 일치해 rfp-response 스킬을 선택하는 에이전트</figcaption>
</figure>

스킬이 처음이라면 둘째 날 전에 [이제 에이전트에도 스킬이 있음](https://microsoft.github.io/mcscatblog/posts/modern-mcs-agent-skills/)을 먼저 읽어 보세요.

## 3일 전체 일정

각 모듈 링크에는 슬라이드 덱이 포함된 해당 페이지가 연결됩니다. 난이도는 입문 100부터 고급 300까지입니다.

### 1일차: 프레이밍, 입문, 하네스

1일차에는 Copilot 생태계를 소개하고 다양한 환경에서 실습을 시작합니다.

| 세션 | 수준 |
|---|---:|
| 실습 소개 (실습 환경 및 테넌트 설정) | |
| [모듈 1: Microsoft Copilot 에이전트 생태계](https://microsoft.github.io/mcs-labs/modules/agents-workflows-making-them-real-latest/?event=architecture-bootcamp) | 100 |
| [모듈 2: Copilot Chat 및 Work IQ](https://microsoft.github.io/mcs-labs/modules/m365-copilot-latest/?event=architecture-bootcamp) + [실습 1](https://microsoft.github.io/mcs-labs/labs/copilot-chat-workiq/?event=architecture-bootcamp) | 100 |
| [모듈 3: Cowork: 스킬, 플러그인, 코드](https://microsoft.github.io/mcs-labs/modules/cowork-latest/?event=architecture-bootcamp) + [실습 2: 인사이트에서 작업으로](https://microsoft.github.io/mcs-labs/labs/cowork-zava-sales/?event=architecture-bootcamp) | 100–200 |
| [실습 3: Copilot Code로 간단한 웹 앱 만들기](https://microsoft.github.io/mcs-labs/labs/copilot-code-web-app/?event=architecture-bootcamp) | 100 |
| [모듈 4: Copilot Chat 하네스: 선언형 에이전트](https://microsoft.github.io/mcs-labs/modules/copilot-harness-latest/?event=architecture-bootcamp) + [실습 4: Cowork 스킬 재사용](https://microsoft.github.io/mcs-labs/labs/declarative-agent-skill-reuse/?event=architecture-bootcamp) | 200 |
| [모듈 5: Standard 하네스: 구성 요소 모델](https://microsoft.github.io/mcs-labs/modules/standard-harness/?event=architecture-bootcamp) + [실습 5](https://microsoft.github.io/mcs-labs/labs/standard-harness-components/?event=architecture-bootcamp) | 200 |

실습 3은 특히 인기 있습니다. 참석자는 Copilot Code로 부트캠프 실습 추적기를 만들고 게시한 뒤 후속 프롬프트로 개선합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-agents-bootcamp/lab3-code-lab-tracker.webp' | relative_url }}" alt="셋째 날 일정과 완료된 실습을 보여주는 부트캠프 실습 추적기 웹 앱" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실습 3: Copilot Code로 만들고 게시한 부트캠프 실습 추적기</figcaption>
</figure>

### 2일차: 지식, 도구, 전용 하네스

2일차에는 Copilot Studio 에이전트의 구성 방식과 각 하네스의 사용 시점을 자세히 살펴봅니다. 새 Microsoft Copilot 하네스 기능은 [새 하네스, 새로운 규칙? CAT이 안내합니다](https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/)를 참고하세요.

| 세션 | 수준 |
|---|---:|
| [모듈 6: 하네스, 오케스트레이션, 구성 요소 모델](https://microsoft.github.io/mcs-labs/modules/harnesses-and-component-models-latest/?event=architecture-bootcamp) | 200 |
| [모듈 7: 심층 분석: 지침 및 스킬](https://microsoft.github.io/mcs-labs/modules/instructions-and-skills/?event=architecture-bootcamp) + [실습 6](https://microsoft.github.io/mcs-labs/labs/instructions-skills-authoring/?event=architecture-bootcamp) | 300 |
| [모듈 8: 심층 분석: 지식, 도구, Hooks](https://microsoft.github.io/mcs-labs/modules/knowledge-and-tools-deep-dive/?event=architecture-bootcamp) + [실습 7: 여행 정책 에이전트](https://microsoft.github.io/mcs-labs/labs/hooks-knowledge-travel-policy/?event=architecture-bootcamp) | 200–300 |
| [모듈 9: Customer Conversation 하네스](https://microsoft.github.io/mcs-labs/modules/customer-conversation-harness/?event=architecture-bootcamp) + [실습 8](https://microsoft.github.io/mcs-labs/labs/customer-assist-agent/?event=architecture-bootcamp) | 200 |
| [모듈 10: Microsoft Copilot Managed Runtime 앱](https://microsoft.github.io/mcs-labs/modules/managed-apps/?event=architecture-bootcamp) + [실습 9](https://microsoft.github.io/mcs-labs/labs/managed-apps-build/?event=architecture-bootcamp) | 200 |

실습 7에서는 세션 시작 Hook으로 사용자의 위치에 맞게 답변을 조정하고, 선택적 확장에서는 도구 실행 전 Hook으로 예약 항공사가 승인된 항공사인지 확인합니다. 더 자세한 내용은 [Copilot Studio의 Hooks](https://microsoft.github.io/mcscatblog/posts/hooks-in-copilot-studio/)에서 확인하세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-agents-bootcamp/lab7-hooks-travel-policy.webp' | relative_url }}" alt="모의 항공편 예약 전에 UserPromptSubmitted 및 PreTool Hooks를 실행한 Travel Policy Agent 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실습 7: 예약 도구 전에 Hooks를 실행하고 적절한 여행 정책을 인용하는 답변</figcaption>
</figure>

실습 8은 고객 대면 시나리오를 다룹니다. 기본 에이전트가 특정 요청을 전문 하위 에이전트에 넘기며 채팅과 음성으로 테스트할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-agents-bootcamp/lab8-customer-assist-canvas.webp' | relative_url }}" alt="구독 취소 하위 에이전트로 라우팅하는 기본 에이전트가 있는 Customer Conversation 에이전트 캔버스" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실습 8: 취소 요청을 하위 에이전트에 전달하는 Customer Conversation 에이전트</figcaption>
</figure>

### 3일차: 워크플로 및 운영

3일차에는 에이전트 구축을 넘어 자동화, 통합, 책임 있는 에이전트 운영에 필요한 내용을 다룹니다.

| 세션 | 수준 |
|---|---:|
| [모듈 11: 워크플로](https://microsoft.github.io/mcs-labs/modules/workflows-latest/?event=architecture-bootcamp) + [실습 10](https://microsoft.github.io/mcs-labs/labs/workflows-autonomous/?event=architecture-bootcamp) | 300 |
| [모듈 12: 에이전트 통합 (A2A 포함)](https://microsoft.github.io/mcs-labs/modules/agent-integration/?event=architecture-bootcamp) + [실습 11](https://microsoft.github.io/mcs-labs/labs/agent-integration-team/?event=architecture-bootcamp) | 200 |
| [모듈 13: ALM, 분석, 평가](https://microsoft.github.io/mcs-labs/modules/alm-and-analytics/?event=architecture-bootcamp) | 300 |
| [모듈 14: 코딩 에이전트: 플러그인, 마이그레이션, 생성](https://microsoft.github.io/mcs-labs/modules/coding-agents/?event=architecture-bootcamp) | 300 |
| [모듈 15: AI FinOps](https://microsoft.github.io/mcs-labs/modules/ai-finops/?event=architecture-bootcamp) | 200 |
| [모듈 16: 에이전트 ID](https://microsoft.github.io/mcs-labs/modules/agent-identity/?event=architecture-bootcamp) | 200 |
| [모듈 17: Copilot Agent Kit](https://microsoft.github.io/mcs-labs/modules/copilot-agent-kit/?event=architecture-bootcamp) | 200 |

실습 10에서는 워크플로가 수신 이메일을 분류하고 답장을 작성한 뒤, 전송 전에 사람의 검토를 기다립니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-agents-bootcamp/lab10-workflow-run.webp' | relative_url }}" alt="답장을 보내기 전에 Copilot, Human review, If/Else 노드를 완료하는 워크플로 실행" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실습 10: 사람의 검토 단계를 포함한 워크플로 실행</figcaption>
</figure>

실습 11은 운영 에이전트를 전문 에이전트에 연결하고 어떤 작업을 위임했는지 보여 줍니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-agents-bootcamp/lab11-specialist-trace.webp' | relative_url }}" alt="Zava Operations Assistant가 Zava Stock & Policy Specialist에 위임한 작업을 보여주는 활동 기록" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>실습 11: 재고 요청을 전문 에이전트에 위임</figcaption>
</figure>

운영 모듈은 최근 게시물과 함께 살펴보면 좋습니다. 통합은 [MCP와 A2A로 다른 Copilot Studio 에이전트에서 Microsoft Copilot 하네스 에이전트 호출](https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/), Copilot Agent Kit은 [Model Assessment로 Copilot Studio 에이전트 평가](https://microsoft.github.io/mcscatblog/posts/model-assessment/)를 참고하세요.

## 조직에서 부트캠프 운영하기

콘텐츠는 재사용을 염두에 두고 제작했습니다. 부트캠프를 진행하며 얻은 제안은 다음과 같습니다.

- **실습 환경을 미리 준비합니다.** 각 실습에 사전 요구 사항이 있습니다. 세션 전에 테넌트, 라이선스, 환경을 준비해 참석자가 실습에 집중하도록 합니다.
- **내러티브를 강조합니다.** 지원, 반복 가능, 프로덕션 준비 단계는 새 아이디어를 어디에 둘지 결정하는 사고 모델이 됩니다. 매일 시작할 때 되짚어 볼 가치가 있습니다.
- **질의응답 시간을 마련합니다.** 애틀랜타에서 가장 유익한 대화 중 일부는 질의응답 시간에 나왔습니다. 게시된 일정에 제안된 질의응답 블록을 활용하세요.
- **문제를 알려 주세요.** 실습 단계가 화면과 다르면 [이슈를 보고](https://github.com/microsoft/mcs-labs/issues)해 모두가 더 나은 경험을 할 수 있게 해 주세요.

> 제품은 빠르게 바뀌므로 Power Platform Community Conference (PPCC), Microsoft Ignite, Microsoft Build 같은 주요 행사 이후 부트캠프를 자주 업데이트합니다. 부트캠프 페이지에서 마지막 업데이트 날짜를 확인하고, 세션 진행 전 슬라이드 덱을 최신 버전으로 새로 받으세요.

## CAT이란?

[Copilot Acceleration Team (CAT)](https://aka.ms/WhoIsCAT)은 Microsoft Copilot 엔지니어링 팀의 일부입니다. Microsoft 365 Copilot과 Copilot Studio 도입 및 성공을 가속화하는 것이 목표입니다. 실제 고객 경험을 기반으로 다음 리소스, 도구, 프로그램, 지침을 제공합니다.

- **도구:** [Copilot Agent Kit](https://aka.ms/copilotagentkit), [Copilot Studio용 Skills](https://github.com/microsoft/skills-for-copilot-studio), [Agent Skills & Plugins Gallery](https://aka.ms/catagentskills)
- **프로그램:** Copilot & Agents Bootcamp, [Agent In A Day](https://aka.ms/agiad), [Microsoft Copilot Agents Labs](https://microsoft.github.io/mcs-labs/)
- **지침:** [Power Platform Architecture Center](https://aka.ms/powerarchitecture), [Copilot Studio guidance](https://aka.ms/copilotstudioguidance), [Copilot Studio Samples](https://microsoft.github.io/CopilotStudioSamples/)
- **인사이트:** 이 블로그 [The Custom Engine](https://aka.ms/catblog)

## Microsoft 계정 팀과 CAT의 협력 방식

CAT은 Microsoft 계정 팀을 보완하며 대체하지 않습니다. 계정 팀은 조직과 우선순위, Microsoft와의 전반적인 협력 관계를 파악하고 있습니다. CAT은 Copilot 엔지니어링 팀과 긴밀히 협력하고 비슷한 문제를 해결하는 고객을 지원하면서 축적한 제품 및 아키텍처 전문성을 제공합니다.

실제 협업에서는 계정 팀이 주 연락 창구를 유지하고 CAT은 아키텍처 및 설계 검토, 도입 및 활성화, 제품 피드백을 엔지니어링으로 전달하는 일을 돕습니다.

## CAT 지원 요청

Copilot Chat, Cowork, Copilot Studio 프로젝트를 계획 중이며 CAT의 참여를 원한다면 Microsoft 계정 팀과 논의하거나 [CAT 지원을 직접 요청](https://aka.ms/GetCAT)하세요. 시나리오, 지원·반복 가능·프로덕션 준비 여정의 현재 단계, 막혀 있는 점을 알려 주세요.

## 핵심 요약

- **Copilot Studio Architecture Bootcamp**가 **Copilot & Agents Bootcamp**로 바뀌며 Copilot Chat, Copilot Cowork, Copilot Code, 최신 에이전트 하네스, FinOps, 거버넌스 관련 콘텐츠가 추가됐습니다.
- 17개 모듈과 11개 실습 모두 [온라인](https://microsoft.github.io/mcs-labs/events/architecture-bootcamp/)에서 자기 주도 학습이나 조직 내 교육에 활용할 수 있습니다.
- 핵심 내러티브는 작업을 Copilot Chat의 **지원**, Copilot Cowork의 **반복 가능**, Copilot Studio 에이전트의 **프로덕션 준비** 단계로 발전시키는 것입니다.
- CAT은 계정 팀과 협력하며 프로젝트에 대한 [지원 요청](https://aka.ms/GetCAT)이 가능합니다.

현재 대부분의 사용자는 어느 단계에 있으며, 다음 단계로 작업을 발전시키지 못하는 원인은 무엇인가요? 댓글로 의견을 들려주세요.
