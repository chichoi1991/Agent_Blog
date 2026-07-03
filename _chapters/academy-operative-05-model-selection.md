---
layout: "chapter"
date: 2026-03-11
title: "미션 05: Agent 모델과 응답 형식 이해"
short_title: "05. Agent 모델 이해"
description: "최대의 효과와 참여를 위해 agent 모델을 사용자 지정합니다"
order: 5
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/05-model-selection/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-11"
canonical_url: "https://microsoft.github.io/agent-academy/operative/05-model-selection/"
image: "/assets/academy/operative-05-model-selection/5.0_01_AgentModels.png"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 05: Understanding Agent Models and Response Formatting](https://microsoft.github.io/agent-academy/operative/05-model-selection/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <a href="https://youtu.be/c5rqNQt2Mmc?si=zrJ7nQYoto9UlHFj" target="_blank" rel="noopener">
    <img src="{{ '/assets/academy/operative-05-model-selection/05-model-selection_Thumbnail_PlayButton.png' | relative_url }}" alt="Model Selection 동영상 썸네일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </a>
</figure>

## 🎯 미션 브리프

다시 오신 것을 환영합니다, Agent. [Mission 02](https://microsoft.github.io/agent-academy/operative/02-agent-instructions/)에서는 강력한 instructions가 Agent의 동작을 어떻게 형성하는지 배웠습니다.

이제는 두뇌를 선택할 차례입니다.

**Operation Archetype**에서는 Agent에 적합한 AI 모델을 선택하는 방법과, 모델 변경이 응답 품질·구조·깊이에 어떤 영향을 주는지 테스트하는 방법을 배웁니다. 모델마다 응답 속도가 더 빠르거나 느릴 수 있고, 더 간결하거나 더 자세할 수 있으며, 복잡한 추론을 처리하는 방식도 다릅니다. 또한 사람의 관점에서 더 잘 와닿는 response formatting을 설계하는 방법도 배우게 됩니다.

이 미션을 마치면 시나리오에 맞춰 자신 있게 모델을 선택하고, 결과를 비교해 그 선택을 검증할 수 있게 됩니다.

## 🔎 목표

이 미션에서는 다음을 배웁니다.

1. Agent의 사용 사례에 맞는 최적의 AI 모델을 이해하고 선택하는 방법
1. 서로 다른 모델의 기능과 성능 특성을 비교하는 방법
1. Agent의 모델을 전환하는 방법
1. 가독성과 사용자 경험을 높이기 위해 response formatting을 구성하는 방법
1. 모델을 바꿨을 때 출력 차이를 테스트하고 평가하는 방법

## 🤔 Agent 모델이란 무엇인가요?

_agent model_은 Copilot Agent의 응답을 구동하는 기반 generative AI 엔진입니다. Copilot Studio에서는 Agent가 사용할 모델을 선택할 수 있으므로, 시나리오에 따라 서로 다른 강점(속도, 출력 품질, 비용 등)을 활용할 수 있습니다. 어떤 모델을 선택하느냐에 따라 Agent가 생각하고 응답하는 방식이 결정됩니다. 예를 들어 어떤 모델은 더 빠르게 응답하고, 다른 모델은 더 자세한 답변을 생성하며, 또 다른 모델은 복잡한 추론에 더 뛰어날 수 있습니다.

### 🎭 왜 중요한가요?

적절한 모델을 선택하면 사용 사례에 맞게 Agent가 최적으로 동작할 수 있습니다. 각 모델은 고유한 기능과 전문성을 갖고 있으므로, 요구 사항(예: 빠른 답변 vs. 심층 분석)에 맞춰 모델을 정렬하면 사용자 만족도를 높이고 비용도 관리할 수 있습니다.

### 🪁 사용 가능한 모델

Copilot Studio는 OpenAI 모델과 Anthropic 모델을 지원합니다. 각 모델에는 카테고리 태그와 가용성 태그가 표시됩니다.

#### 모델 사용 카테고리

각 모델은 특정 작업에 맞게 설계되었습니다. 올바른 모델을 선택하면 Agent의 성능이 향상됩니다. 예를 들어 복잡한 의사결정에는 Deep 모델을, 폭넓은 대화형 주제에는 General 모델을 사용할 수 있습니다.

아래 표는 모델 태그, 강점, 주요 고려 사항을 정리한 것입니다 - [source](https://learn.microsoft.com/microsoft-copilot-studio/authoring-select-agent-model#model-use-categories).

| Tag | Description | Strengths | Latency | Cost | Reasoning depth |
| ------- | ---------- | ---------- | ------------- | ----------- | ----------- |
| **Deep** | 신중한 다단계 추론과 도구 지원 워크플로에 최적화되었습니다. | 복잡한 분석, multi-hop reasoning, 정책 및 계약 분석, 여러 시스템 단계를 포함한 문제 해결, 인용이 포함된 장문 문서 종합 | Highest | Highest | Multi-step, tool-rich |
| **Auto** | 혼합 워크로드 전반의 커버리지에 최적화되어 있으며, 질의를 동적으로 라우팅합니다. | 혼합 의도를 가진 헬프데스크 및 직원 Agent, 지식과 작업의 결합, 예측 불가능한 복잡성을 가진 tier‑0 고객 지원 | Variable | Variable | Multi-step, tool-rich |
| **General** | 일상적인 채팅과 가벼운 grounding에서 속도와 비용에 최적화되었습니다. | 초안 작성, 재작성, 요약, 번역, FAQ 스타일의 grounded answer, 간단한 작업 자동화 | Lowest | Lowest | Shallow-to-moderate |

#### 모델 가용성

모델은 단계적으로 출시됩니다. Experimental 또는 Preview 모델처럼 최첨단 옵션을 살펴볼 수도 있고, 안정적이고 충분히 테스트된 Generally Available 모델을 사용할 수도 있습니다.

아래 표는 가용성 태그를 설명합니다 - [source](https://learn.microsoft.com/microsoft-copilot-studio/authoring-select-agent-model#model-use-categories).

| Tag | Description |
| ----- | ------------- |
| **Experimental** | 실험용으로 사용되며 프로덕션 사용은 권장되지 않습니다. Preview 약관의 적용을 받으며, 가용성과 품질에 제한이 있을 수 있습니다. [Limitations of experimental and preview models.](https://learn.microsoft.com/microsoft-copilot-studio/authoring-select-agent-model#limitations-of-experimental-and-preview-models)를 참조하세요. |
| **Preview** | 장차 generally available 모델이 될 예정이지만, 현재는 프로덕션 사용이 권장되지 않습니다. Preview 약관의 적용을 받으며, 가용성과 품질에 제한이 있을 수 있습니다. [Limitations of experimental and preview models.](https://learn.microsoft.com/microsoft-copilot-studio/authoring-select-agent-model#limitations-of-experimental-and-preview-models)를 참조하세요. |
| **No tag** | Generally available 상태입니다. 이 모델은 확장 및 프로덕션 용도로 사용할 수 있습니다. 대부분의 경우 generally available 모델은 가용성과 품질에 제한이 없지만, 일부는 지역 가용성과 같은 제한이 있을 수 있습니다. |
| **Default** | 모든 Agent의 기본 모델이며, 보통 가장 성능이 좋은 generally available 모델입니다. 새롭고 더 강력한 모델이 generally available이 되면 기본 모델은 주기적으로 업그레이드됩니다. 선택한 모델이 꺼져 있거나 사용할 수 없는 경우에도 Agent는 기본 모델을 대체(fallback)로 사용합니다. |
| **Retired** | 새 모델이 기본 모델이 되면 이전 기본 모델은 retired 상태가 됩니다. Retired 이후 최대 1개월 동안은 계속 사용할 수 있습니다. 자세한 내용은 [Continue using a retired AI model](https://learn.microsoft.com/microsoft-copilot-studio/authoring-retired-model)을 참조하세요. |

Copilot Studio가 지원하는 [공개 모델 가용성 목록](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-select-agent-model#public-availability)을 수시로 검토하는 것이 좋습니다.

#### OpenAI 모델

AI 기능은 빠르게 발전하고 있으며, Copilot Studio는 다양한 Azure OpenAI 모델을 제공함으로써 이에 발맞추고 있습니다. 2025년 기준 주요 선택지는 OpenAI의 GPT-4.1과 최신 GPT-5 계열 모델입니다. 아래 표는 주요 선택지와 각 모델이 가장 적합한 용도를 요약한 것입니다.

| Model Version | Category | Availability (United States) | Key Strengths | Ideal Use Cases |
| ------- | ---------- | ---------- | ------------- | ----------- |
| **GPT-4.1** | General | Default | GPT-4o보다 더 높은 정확도와 추론 성능을 제공하며, 복잡한 텍스트 분석에 탁월합니다(텍스트 전용 모델). | 상세 문서(정책, 보고서) 분석, 복잡한 knowledge-base Q&A, 정밀성이 중요한 시나리오 |
| **GPT‑5 Chat** | General | GA | 강력한 문맥 유지력을 갖춘 고급 대화 능력으로 사람 같은 대화를 생성합니다. | 직원 셀프서비스 챗봇, IT/HR 헬프데스크 도우미, 자연스럽고 사람 같은 응답이 필요한 인터랙티브 Agent |
| **GPT‑5 Auto** | Auto | Preview | 다단계 워크플로 orchestration에 최적화되어 있으며, 여러 시스템에 걸친 작업을 자동화할 수 있습니다(단순한 잡담에 그치지 않음). | 엔드투엔드 프로세스 자동화(예: 티켓 생성부터 해결까지), 앱 간 다단계 작업 시퀀스, “디지털 프로젝트 관리자” 시나리오 |
| **GPT‑5 Reasoning** | Deep | Preview | - 복잡한 추론에 최적화된 최신 모델(2024년 10월까지 학습) - 문서 이해 및 응답 정확도에서 높은 점수 | 최고 수준의 분석 역량이 필요한 고급 추론 작업(예: 대규모 계획 수립, 복잡한 데이터 해석). 다시 말해 Preview 모델이므로 테스트 시 신중하게 사용해야 합니다. |
| **GPT‑5.2 Chat** | General | Experimental | 문맥 인식이 더 향상된 최신 실험적 대화 모델로, 폭넓은 작업 숙련도를 제공합니다. | 최신 모델의 기능을 활용하는 범용 Q&A 및 대화 작업, 향상된 성능이 도움이 되는 복잡한 챗봇 상호작용 |
| **GPT‑5.2 Reasoning** | Deep | Experimental | 복잡한 작업에 대해 최대 수준의 깊이와 정확도를 제공하는 실험적 최상위 추론 모델입니다. | 가장 높은 정밀도가 필요한 초고난도 분석 질의 또는 의사결정 지원(예: 정교한 전략 수립, 고위험 데이터 분석) |

<div class="info-box note" markdown="1">
**경고** —

- GPT-5 Auto와 같은 Experimental/Preview 모델은 프로덕션 준비 이전에 새로운 기능을 테스트할 수 있도록 제공됩니다. 테스트 범위가 제한적일 수 있고 성능 변동성이 더 클 수 있습니다.
- 이러한 모델은 불안정성(가변적인 품질, 지연 시간, 심지어 time-out 가능성) 때문에 프로덕션 사용이 권장되지 않습니다. 항상 _Preview_ 모델의 제한 사항을 검토하고, _Sandbox_ 또는 _Developer_ 환경처럼 중요하지 않은 환경에서만 사용하는 것을 고려하세요. Experimental 모델이 적용된 Agent를 게시하더라도 사용량은 해당 모델의 정해진 요금으로 계속 청구됩니다.
</div>

#### Anthropic 모델(외부)

사용 가능한 Anthropic 모델은 두 가지입니다.

- **Claude Sonnet 4.5**는 Anthropic의 최신 코딩·Agent 중심 모델입니다.
- **Claude Opus 4.1**은 추론 중심 모델입니다.

Copilot Studio에서 새 Agent의 기본 모델은 여전히 OpenAI이며, 필요에 따라 이들 모델 중 하나를 선택할 수 있습니다.

두 모델 모두 Microsoft Copilot Studio에서 General Availability(GA)가 아니라 opt-in preview(Frontier Program) 모델로 제공됩니다. 즉, 조기 실험용이라는 의미입니다. 아래 표는 Copilot Studio 맥락에서 각 모델의 상태, 강점, 이상적인 사용 사례를 비교한 것입니다.

| Model Version | Category | Availability (United States) | Key Strengths | Ideal Use Cases |
| ------- | ---------- | ---------- | ------------- | ----------- |
| **Claude Sonnet 4.5** | General | Preview | 코드 관련 작업과 복잡한 “agent” 워크플로에 뛰어나며, 도구 사용과 단계별 추론에 강합니다. | 고급 소프트웨어 개발 지원(코드 생성 및 디버깅), 다단계 자율 Agent 구축, 외부 도구 또는 시스템과의 통합이 필요한 작업 |
| **Claude Opus 4.1** | Deep | Experimental | 집중적인 분석과 구조화된 문제 해결에 특화되어 있습니다. | 심층 데이터 분석 및 연구 프로젝트, 철저함이 중요한 복잡한 추론 시나리오(예: 규정 준수 감사, 정교한 계획 수립) |

<div class="info-box note" markdown="1">
**경고** —

- 이 모델들은 외부 모델이라는 점을 꼭 기억해야 합니다. Anthropic 모델은 Microsoft 외부에서 호스팅되며, maker가 사용하기 전에 Anthropic의 약관과 데이터 처리 방식을 검토하고 수락해야 합니다. 또한 공식 출시 전에 조기 접근과 [피드백 제공](https://community.powerplatform.com/forums/thread/?groupid=db8f53c2-767d-47d6-a1ae-fe4c828a6553)을 위해 제공되는 모델이므로, 프로덕션 사용은 권장되지 않습니다.
- 제한된 용량과 가용성 때문에 속도 저하나 time-out을 겪을 수 있으며, 향후 이 모델들이 계속 지원된다는 보장도 없습니다. 관리자는 이 기능에 대한 접근을 제어할 수 있습니다(이 미션을 진행하면서 곧 더 다루게 됩니다).
</div>

#### 🔢 컨텍스트 길이와 데이터 학습

위의 모든 모델은 큰 컨텍스트 윈도우를 처리할 수 있습니다. 예를 들어 GPT-4.1은 최대 128K 토큰의 컨텍스트를 지원합니다. 또한 모두 2024년 중반까지의 데이터로 학습되었고(GPT-5는 그보다 조금 더 최신 데이터까지 학습), 따라서 이 시점 이후 정보는 _알지 못할 수 있습니다_. 이는 답변 생성 시 모델의 지식 한계를 이해하는 데 도움이 됩니다.

### 🔧 Agent 모델 변경 및 업데이트

기본적으로 새 Copilot Agent는 대부분의 시나리오에 균형 잡힌 선택으로 최적화된 GPT-4.1 모델에서 시작합니다.

Agent의 **Overview** 탭에 있는 **Select your agent's model** 섹션에서 드롭다운을 사용하면 언제든지 기본 모델을 변경할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.0_01_AgentModels.png' | relative_url }}" alt="사용 가능한 Agent 모델" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

이런 유연성 덕분에 Agent를 만든 뒤에도 여러 모델을 실험해 볼 수 있습니다. 예를 들어 실험적 모델로 전환해, 내 시나리오에서 답변 품질이 향상되는지 평가할 수 있습니다.

## 📶 모델 업데이트와 retired 모델

Microsoft는 주기적으로 사용 가능한 모델을 최신 버전으로 업그레이드합니다. 특히 2025년 12월에는 몇몇 모델이 조기 릴리스 주기 환경에서 제공되기 시작했습니다.

- GPT-5.2 Chat
- GPT-5.2 Reasoning

GPT-5.1을 사용하던 Agent는 자동으로 GPT-5.2로 이동되었습니다. 자세한 내용은 [announcement blog post](https://www.microsoft.com/en-us/microsoft-365/blog/2025/12/11/available-today-gpt-5-2-in-microsoft-365-copilot/)를 참조하세요.

<div class="info-box note" markdown="1">
**참고** — [Model updates](https://learn.microsoft.com/ai-builder/prompt-modelsettings#model-updates)를 주기적으로 확인하여 Microsoft가 수행한 모델 업데이트를 파악하세요.
</div>

만약 Agent가 retired된 GPT-4o 모델을 사용하고 있었다면, 기본 OpenAI 모델인 **GPT-4.1**로 투명하게 이동되었을 것입니다.

### 🧶 왜 "Retired" 모델을 계속 사용할 수 있나요?

AI 모델 업그레이드가 자동으로 이뤄지는 상황에서 Copilot Studio는 연속성을 위한 안전장치를 제공합니다. 업그레이드 후에도 이전 모델을 잠시 유지해야 하는 경우가 있을 수 있습니다.

예를 들어 호환성을 유지해야 하거나, 규정 준수 요구 사항을 충족해야 하거나, 새 모델에서 솔루션 동작을 충분히 평가하기 전까지는 완전히 전환하고 싶지 않을 수 있습니다. Microsoft는 이런 현실을 고려해, 자동 업그레이드 후 최대 **30일** 동안 retired 모델을 계속 사용할 수 있도록 허용합니다.

- **호환성**: 새 모델의 출력 형식이나 내용이 달라질 수 있습니다. 후속 시스템이나 프롬프트가 이전 모델의 스타일을 기대한다면 로직을 조정할 시간이 필요할 수 있습니다. 유예 기간 동안 익숙한 모델에서 운영하면서, 통제된 방식으로 새 모델에 맞게 Agent를 업데이트하고 테스트할 수 있습니다. 사용자 경험을 해치지 않고 조정할 수 있습니다.

- **규정 준수 및 데이터 정책**: 일부 조직은 AI 모델에 대해 엄격한 검토 절차를 거칩니다. 실험적 새 모델이 아직 승인되지 않았거나, 데이터 처리 방식이 다를 수 있습니다(예: 다른 지역의 데이터 센터 사용). 이런 우려가 있다면 관리자는 규정 준수 검토가 끝날 때까지 전환을 미룰 수 있습니다.

- **특정 비즈니스 요구**: 제품 출시나 데모 같은 중요한 이벤트가 있을 때는 새로운 기능보다 안정성이 더 중요할 수 있습니다. 이 기간 동안은 이전 모델을 유지해 예기치 않은 변화를 피할 수 있습니다.

### 🌳 Retired 모델 사용 방법

Agent의 **Settings** 페이지에서 **Generative AI** 탭의 **Model** 섹션으로 이동하면 **"Continue using retired models"**라는 토글 옵션이 있습니다. 이 옵션은 모델 업데이트가 배포되면 사용할 수 있게 됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.0_02_ContinueUsingRetiredModels.png' | relative_url }}" alt="Continue using retired models 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

이 기능을 켜면 30일 동안 Agent가 이전 모델 버전에 머무르게 됩니다. 이 기간 동안 이전 모델과 새 모델 사이를 오가며 응답을 비교하고 점진적으로 전환할 수 있습니다. 30일이 지나면 이전 모델은 서비스에서 완전히 제거되므로, 그 전에 새 모델로 이동할 계획을 세워야 합니다. 실무적으로 보면 이 기능은 매끄러운 전환을 지원하는 완충 장치 역할을 합니다.

#### 예시

가령 Agent가 GPT-4o를 사용하고 있었는데 GPT-4.1로 업그레이드되었다고 해봅시다. AI의 어조가 달라졌거나, 기존 대화 스타일과 맞지 않는 표현을 사용한다면 “use retired model”을 켜서 일시적으로 GPT-4o로 되돌릴 수 있습니다.

그 후 몇 주 동안 GPT-4.1 스타일에 맞춰 프롬프트나 instructions를 업데이트할 수 있습니다(예: “응답은 간결하게 유지하라” 같은 지시 추가). 안전한 환경에서 GPT-4.1로 충분히 테스트한 뒤 확신이 생기면 retired model 토글을 끄면 됩니다. 이렇게 하면 전환 기간에도 최종 사용자에게 일관된 경험을 제공할 수 있습니다.

## 🔐 AI 모델 선택을 위한 관리자 제어

모든 copilot 환경에서 기본적으로 모든 모델 선택이 허용되는 것은 아닙니다. 테넌트 관리자가 제어하는 조직 수준 설정이 있으며, 이는 특히 실험적 모델과 관련해 중요합니다. 조직은 Preview AI 모델이 특정 지역 밖에서 데이터를 처리하거나 표준과 다른 방식으로 동작할 수 있기 때문에, 누가 이를 사용할 수 있는지 제한하고 싶어할 수 있습니다.

다음은 maker/developer가 Agent용 모델을 선택할 때 영향을 주는 주요 관리자 제어입니다.

- **Enable Anthropic as a Microsoft subprocessor subject to the above terms**: **Global administrator** 역할을 가진 관리자가 Microsoft 365 Admin Center에서 [Enable Anthropic as a Microsoft subprocessor subject to the above terms](https://learn.microsoft.com/en-us/copilot/microsoft-365/connect-to-ai-subprocessor) 설정을 활성화해야 합니다. 이 설정이 꺼져 있으면 선택 가능한 모델은 OpenAI 모델뿐입니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.0_05_AIProvidersOperatingAsMicrosoftSubProcessors.png' | relative_url }}" alt="Microsoft subprocessors로 동작하는 AI 공급자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

  관리자는 Power Platform admin center에서 특정 환경에 외부 모델을 허용할지 여부도 토글할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.0_03_EnableExternalModelsSetting.png' | relative_url }}" alt="외부 모델 설정 활성화" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

- **Allow Preview (Experimental) models to be used in Copilot Studio environments**: 관리자는 특정 환경에서 preview 및 experimental AI 모델을 사용할 수 있을지 토글할 수 있습니다. 이 설정을 **off**로 두면 maker/developer는 드롭다운에서 GPT-4.1 같은 generally-available 모델만 볼 수 있습니다.

  GPT-5 또는 향후 preview 모델을 사용하려면 관리자가 해당 환경에 대해 이 설정을 **on**으로 해야 합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.0_06_EnablePreviewAndExperimentalAIModelsSetting.png' | relative_url }}" alt="Preview 및 Experimental AI 모델 설정 활성화" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

- **Move data across regions**: Experimental 모델은 표준 모델과 같은 지역 데이터 센터에서 실행되지 않을 수 있으므로, 이를 활성화하려면 종종 지역 간 데이터 이동을 허용해야 합니다. Power Platform admin center의 환경 설정에는 **Move data across regions**라는 옵션이 있으며, Experimental 모델을 사용하려면 관리자가 이를 켜야 합니다. 이 설정은 해당 모델이 처리하는 데이터가 조직의 지리적 경계를 벗어날 수 있음을 인정하는 의미입니다.

  예를 들어 환경이 _Europe_에 있고 Experimental 모델이 _US_ 데이터센터에서만 호스팅된다면, 데이터가 이동할 수 있도록 이 설정을 켜야 합니다. 꺼져 있으면 Copilot은 해당 모델을 사용할 수 없습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.0_04_MoveDataAcrossRegions.png' | relative_url }}" alt="지역 간 데이터 이동 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

이러한 관리자 설정은 데이터 거주성이나 기능 안정성과 같은 민감한 요소를 **조직이 계속 통제**할 수 있도록 보장합니다. Agent를 만드는 개발자 입장에서 GPT-5 preview 모델 옵션이 보이지 않거나 generative AI를 사용할 수 없다는 경고가 표시된다면, 관리자가 experimental 모델을 비활성화했거나 지역 간 데이터 이동을 허용하지 않았을 수 있습니다. 이런 경우 experimental 기능이 필요하다면 테넌트 관리자에게 환경 설정 조정을 요청해야 합니다.

모델 선택과 관련된 관리자 제어를 빠르게 참고할 수 있도록 아래에 요약했습니다.

| Admin Setting | Effect on Model selection | Setting location |
| ---------- | ------------ | ------------ |
| **Enable Anthropic as a Microsoft subprocessor** | **Enabled** 상태이면 사용자는 Copilot Studio에서 만든 Agent에 Anthropic 외부 모델을 연결할 수 있습니다. **Disabled** 상태이면 OpenAI 모델만 사용할 수 있습니다. | Microsoft 365 Admin Center |
| **Allow Preview & Experimental Models** | **ON** 상태이면 maker는 Preview/Experimental AI 모델(예: GPT-5 Chat)을 Agent에 선택할 수 있습니다. **OFF** 상태이면 프로덕션 준비가 된 모델만 사용할 수 있습니다. | Power Platform admin center |
| **Move Data Across Regions** | Experimental 모델이 활성화된 경우 **ON**이어야 합니다. Agent의 데이터가 홈 리전 외부에서 처리·저장되는 것을 허용합니다. 이 설정이 **OFF**면 지역 간 데이터 흐름이 필요한 모델은 차단되고, 그 결과 Agent의 generative AI 기능을 사용할 수 없게 됩니다. 이 설정은 테넌트 관리자가 Power Platform admin centre에서 관리합니다. | Power Platform admin center |

<div class="info-box note" markdown="1">
**팁** —

- 데이터 규정 준수가 우려되는 **admin**이라면 Anthropic 모델 사용을 비활성화하고, preview 모델과 지역 간 데이터 이동도 꺼 두세요.
- 규제가 매우 엄격한 산업 환경의 **developer**라면, Preview 모델(OpenAI)이나 외부 Preview 모델(Anthropic)을 사용할 승인(clearance)을 받기 전까지는 General Availability(GA) 모델만 사용해야 할 수 있습니다.
</div>

## 🔠 응답 형식(Response Formatting)

적절한 모델을 선택하고 좋은 instructions를 제공하여 Agent가 _무엇을_ 말할지 정했다면, 다음으로는 그 답변이 사용자에게 전달될 때 _어떻게 보일지_에 초점을 맞춰야 합니다.

Copilot Studio에서 **Response Formatting**은 AI 응답의 스타일과 구조를 정의하는 기능을 뜻합니다. 예를 들어 텍스트를 굵게 또는 기울임꼴로 표시할지, 링크를 포함할지, 동적 콘텐츠/표현식을 삽입할지 등을 제어합니다.

### 🖼️ 왜 Response Formatting이 중요한가요?

핵심은 가독성과 사용자 경험입니다. 아무리 정확한 답변이라도 구조화되지 않은 텍스트 덩어리라면 사용자를 혼란스럽게 하거나 답답하게 만들 수 있습니다. 일관된 형식을 적용하면 중요한 정보가 눈에 띄고, 답변을 빠르게 훑어보기 쉬워집니다.

예를 들어,

- **bold** 텍스트는 중요한 숫자나 용어를 강조할 수 있습니다.
- **lists**는 복잡한 지시를 단계로 나눌 수 있습니다.
- **hyperlinks**는 답변을 과도하게 길게 만들지 않으면서 추가 자료로 사용자를 안내할 수 있습니다.

또한 formatting 선택에는 브랜드의 스타일과 어조도 반영되어야 합니다. 예를 들어 격식을 갖춘 Agent는 이모지를 피하고 강조를 위해 굵은 텍스트를 사용할 수 있고, 좀 더 유쾌한 Agent는 가벼운 농담이나 친근한 표현을 강조하기 위해 기울임꼴을 쓸 수 있습니다.

Copilot Studio의 generative answer 노드에서는 응답에서 허용할 formatting 요소를 설정할 수 있습니다. 어떤 옵션이 있는지, 그리고 이를 어떻게 효과적으로 사용할 수 있는지 살펴보겠습니다.

## 🖌️ 사용 가능한 formatting 옵션

Copilot Studio의 generative answers는 rich text를 위해 Markdown의 일부를 지원합니다. 아래는 AI 응답에서 활용할 수 있는 주요 formatting 요소와 그 역할입니다.

| Formatting Option | Purpose and Effect | Example Usage |
| ---------- | ------------ | --------- |
| **Bold** | 중요한 단어나 구문을 두드러지게 만듭니다. 핵심 정보나 중요한 값을 강조할 때 사용합니다. | **"Your account balance is $1,250."** - 금액이 굵게 표시되어 즉시 눈에 띕니다. |
| _Italics_ | 더 부드러운 강조를 더하거나 특별한 용어를 나타냅니다. 문서 제목이나 _구문_을 강조할 때 자주 사용합니다. | _"Please provide additional details for verification."_ - “additional details”가 기울임꼴로 표시되어 프롬프트 또는 플레이스홀더처럼 보이게 합니다. |
| Hyperlinks | 응답 텍스트에 클릭 가능한 링크를 삽입합니다. 외부 문서, 내부 knowledge base, 또는 자세한 참고 자료로 안내할 때 유용합니다. | "Refer to our [Microsoft Surface Warranty and Protection Plans](https://www.microsoft.com/surface/business/warranty-protection-plans-and-support) for more details." - "Microsoft Surface Warranty and Protection Plans" 텍스트가 웹 페이지로 연결되는 하이퍼링크입니다. |
| Power Fx expressions | 응답에 동적 콘텐츠 또는 로직 기반 텍스트를 삽입합니다. Power Fx는 변수 값을 가져오고, 계산을 수행하고, formatting을 강제할 수 있습니다(검증용 regex 포함). 이를 통해 응답의 일부를 실시간 데이터나 조건에 따라 결정할 수 있습니다. | "Today is `Text(Now(), "dddd, mmmm d, yyyy")`." - 이 예시는 Power Fx 수식을 사용해 현재 날짜를 `Friday, October 3, 2025` 같은 긴 형식으로 삽입합니다. 숫자를 formatting하거나, 출력이 특정 패턴을 따르도록 보장하는 데도 expressions를 사용할 수 있습니다. |

<div class="info-box note" markdown="1">
**팁** — Copilot Studio의 테스트 창을 사용해 response formatting을 항상 테스트하세요. 예시 사용자 질문을 입력하고, Agent의 응답이 기대한 형식으로 나오는지 확인합니다. Markdown 구문이 그대로 텍스트에 표시되는 등 예상과 다르다면 instructions를 조정해야 할 수 있습니다. 모델이 formatting 사용이 허용되었는지 확신하지 못해 원시 asterisk 같은 Markdown 문법을 그대로 보여 주며 “안전하게” 행동할 때가 있습니다. Formatting instructions를 더 명확히 하고, 만족할 때까지 테스트를 반복하세요.
</div>

## ⭐ 응답 형식 모범 사례

이제 _무엇을 할 수 있는지_ 알았으니, AI 응답을 명확하고 효과적으로 만들기 위해 _무엇을 해야 하는지_ 살펴보겠습니다. 다음은 Agent 동작을 설계하는 개발자를 위한 모범 사례입니다.

- **스타일 일관성 유지**: 비슷한 유형의 응답에는 일관된 형식을 정하세요.

  예를 들어 다음과 같은 instructions를 줄 수 있습니다. `Term in bold, followed by a colon, then the definition in regular text.`

  정의를 설명할 때마다 같은 방식을 사용하세요.

  또는 Agent가 여러 옵션을 나열할 때, 어떤 경우에는 bullet list를 쓰고 어떤 경우에는 문단을 쓰는 식으로 섞지 말고 항상 bullet list를 사용하도록 할 수 있습니다.

  일관성은 사용자가 응답 구조를 빠르게 이해하도록 돕습니다. 이를 instructions에 명시해 강제할 수 있습니다. 예: `"Always answer with bullet points when listing options."`

- **강조는 절제하되 의미 있게 사용**: **bold**는 사용자가 놓치면 안 되는 가장 중요한 정보에만 적용하세요. 보통 한두 단어 또는 짧은 구문이면 충분합니다. 문단 전체나 큰 텍스트 덩어리를 모두 굵게 만들면 오히려 강조 효과가 사라집니다.

  _italics_는 보조적인 강조나 예시 입력, 메모 같은 요소를 나타낼 때 사용하세요. 예를 들어 오류 메시지나 사용자가 제공한 텍스트를 기울임꼴로 표시하면 Agent의 나머지 출력과 구분할 수 있습니다.

- **구조를 위해 목록 활용**: 답변에 여러 정보 조각이나 단계별 절차가 들어 있다면 문장 속에 묻어 두지 마세요. 순서가 자연스럽다면 번호 목록(1, 2, 3, …)을 사용하고, 제품 기능처럼 순서가 없는 모음이라면 bullet points를 사용하세요.

- **형식과 함께 톤도 고려**: Formatting은 Agent의 톤을 보완해야 합니다. Agent의 persona가 매우 격식 있다면 느낌표나 지나치게 캐주얼한 강조는 피하는 편이 좋습니다. 반대로 친근한 Agent라면 가끔 **“Great choice!”**처럼 굵은 표현을 써도 괜찮습니다. 톤은 주로 언어가 결정하지만 formatting이 그것을 증폭할 수 있습니다. 친근하고 수다스러운 Agent는 필요하다면 이모티콘이나 이모지도 사용할 수 있지만, 반드시 사용 사례에 맞아야 하며 절제해서 사용해야 합니다.

- **하이퍼링크 텍스트 점검**: 응답에 하이퍼링크를 포함할 때는 링크 텍스트가 어디로 가는지 설명적으로 작성되었는지 확인하세요. 이는 더 전문적으로 보일 뿐 아니라 접근성에도 도움이 됩니다.

  예를 들어 `"download the report here"`보다, _"Quarterly Report"_에 링크를 거는 `"download the Quarterly Report"`가 더 좋습니다. URL이 정확한지, 그리고 내부 사이트라면 사용자가 접근 권한을 갖고 있는지도 확인하세요.

- **동적 formatting에 Power Fx 활용**: 개발자에게 특히 강력한 점은 generative answer와 Power Fx expressions를 조합해 출력을 다듬을 수 있다는 것입니다.

  예를 들어 초기 응답이 `"Your order total is 1250 usd.”`라고 가정해 봅시다. Power Fx 수식을 사용해 이 숫자를 미국 통화 형식으로 바꾸고 `"usd"`를 달러 기호로 치환하면 `"$1,250.00"`으로 만들 수 있습니다.

  예를 들어 다음과 같은 수식을 사용할 수 있습니다. `"$" & Text(ThisItem.OrderTotal, "[$-en-US]#,##0.00")`

  이 수식은 쉼표와 소수점 둘째 자리까지 포함하는 미국식 숫자 형식을 보장합니다.

  마찬가지로 generative AI가 바람직하지 않은 형식의 날짜를 제공하면, Power Fx expression으로 다시 formatting할 수 있습니다. 본질적으로 AI의 텍스트를 후처리하여 원하는 엄격한 패턴을 강제할 수 있습니다.

- **가독성 우선**: 위의 모든 요소를 적용한 뒤에는 항상 사용자의 관점에서 출력을 읽어 보세요. 핵심을 쉽게 찾을 수 있나요? 응답이 불필요하게 길지는 않나요? 많은 경우, 적을수록 좋습니다. AI가 지나치게 장황한 경향이 있다면 더 간결하게 답하도록 지시하거나 답변 범위를 제한하는 것을 고려하세요.

  반대로 답변이 너무 짧거나 세부 설명이 부족하다면 더 많은 설명이나 예시를 요청하는 instructions를 추가하는 것이 좋습니다.

  형식만으로 해결할 수 있는 일에는 한계가 있으며, 결국 콘텐츠 품질이 뒷받침되어야 합니다. 좋은 균형은 질문에 답하는 짧은 답변 뒤에 하이퍼링크나 추가 정보를 얻는 옵션을 붙이는 것입니다. 예를 들어 `"Your password was reset successfully. You will receive a confirmation email shortly. If you did not request this, please head to [https://support.example.com](https://support.microsoft.com)."` 같은 방식입니다. 이 표현은 명확하며, 추가 정보(지원 문의)는 긴 문단 대신 하이퍼링크로 제공됩니다.

요약하면 formatting은 주의를 분산시키기보다 명확성을 높이는 데 사용해야 합니다. 사용자는 Agent의 응답을 한눈에 보고 필요한 정보를 빠르게 파악할 수 있어야 합니다. 개발자는 Agent의 **Settings** 아래 **Generative AI** 탭에 있는 **Response Formatting**을 활용해 출력을 다듬으세요. 다양한 질문으로 항상 테스트해 formatting이 잘 유지되는지 확인하고, 필요하면 instructions를 조정하세요.

## 🧪 실습 5 - Interview Agent를 위한 모델 선택

이 실습에서는 같은 질문을 세 가지 다른 모델에 던져 응답과 formatting을 비교합니다. 다음 항목에서 어떤 차이가 나는지 관찰해 보세요.

- Depth
- Structure
- Tone
- Specificity

### 🧪 실습 5.1 - Interview Agent의 응답 형식

1. **Interview Agent's Settings**에서 아래로 스크롤해 **Response formatting** 섹션으로 이동한 다음 instructions를 업데이트합니다. Formatting instructions로 아래 내용을 사용하세요.

    ```text
    For all agent responses to questions, follow these rules exactly:

    # Dates

    - All dates MUST always be formatted as 'MMM dd, yyyy'. Example:  

    # Resume information

    - For resume information, start with the Resume Number as the header in bold, followed by bullet points.
    - All dates MUST always be formatted as 'MMM dd, yyyy'. Example:
    ```

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.1_01_SettingsResponses.png' | relative_url }}" alt="Agent의 response formatting instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. Instructions의 두 날짜 형식 예시에 대해 Power Fx 수식을 추가하겠습니다. 첫 번째 `Example:` 뒤를 클릭하고 **Power Fx** 아이콘을 선택합니다. 아래 수식을 복사해 붙여 넣은 뒤 **Insert**를 선택하세요.

    ```text
    Text(DateTimeValue("2026-01-06T13:45:54Z"), "MMM dd, yyyy")
    ```

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.1_02_PowerFxFormula.png' | relative_url }}" alt="Power Fx 수식 삽입" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 첫 번째 예시에 수식이 추가된 것을 볼 수 있습니다. 두 번째 `Example:`에도 같은 단계를 반복해 Power Fx 수식을 복사해 붙여 넣고, **Insert**를 선택한 다음 **Save**를 눌러 response formatting 설정을 저장합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.1_03_PowerFxFormulasAdded.png' | relative_url }}" alt="response formatting instructions에 추가된 Power Fx 수식" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. **Settings**를 종료합니다.

### 🧪 실습 5.2 - 모델 응답과 형식 비교

이제 기본 GPT-4.1 모델과 GPT-5 Chat preview 모델, 그리고 Claude Sonnet 4.5 experimental 모델의 응답을 비교해 보겠습니다.

<div class="info-box note" markdown="1">
**경고: 테스트 세션마다 응답이 다를 수 있습니다** — 선택한 generative AI 모델은 고정된 응답을 반환하는 것이 아니라 동적으로 답변을 생성하므로, 테스트 세션의 각 대화에서는 응답이 조금씩 달라질 수 있습니다.
</div>

1. **Interview Agent**에서 새 테스트 세션을 시작하고 아래 질문을 입력합니다. **Hiring Hub** model-driven app의 기존 활성 이력서에서 **Resume Number** 값을 사용하세요.

    ```text
    Summarize the key qualifications, experience, and skills of the candidate whose resume is identified as R#####. Focus on education, work history, relevant skills, and any notable achievements or certifications.
    ```

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_01_GPT4.1Model.png' | relative_url }}" alt="GPT-4.1 모델에 첫 번째 질문 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

  구성해 둔 Dataverse knowledge source를 통해 모델이 검색하는 것을 볼 수 있습니다. 이 설정은 원문 [Mission 03: Multi-Agent Systems](https://microsoft.github.io/agent-academy/operative/03-multi-agent/)에서 다룹니다.

1. 이어서 이력서 요약이 표시됩니다. response formatting과 얼마나 잘 맞는지 확인해 보세요. 출력은 Resume Number를 굵게 표시한 뒤 bullet points가 이어집니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_02_GPT4.1_FormatCheck.png' | relative_url }}" alt="GPT-4.1 모델의 첫 번째 질문 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

  Agent의 응답이 Dataverse의 resume row 및 PDF 파일 내용과 일치하는지도 확인하는 것이 좋습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_02_GPT4.1_Question1Response.png' | relative_url }}" alt="모델이 반환한 자격증" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

  연결된 Resume 파일을 검토해 보면 모델이 반환한 skills가 정확합니다. 자격증 정보도 해당 Resume 파일과 일치합니다. 훌륭합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_02_GPT4.1_Question1ResponseCheck.png' | relative_url }}" alt="Resume 파일에서 자격증 검증" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 다음으로 Agent가 날짜 형식을 지키는지 검증해 보겠습니다. 아래 질문을 입력하세요.

    ```text
    When was the upload date?
    ```

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_04_GPT4.1_Question2Response.png' | relative_url }}" alt="GPT-4.1 모델의 두 번째 질문 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

  이 모델은 날짜 형식을 정확히 따르지 못했다는 것을 볼 수 있습니다.

1. 이제 직무 역할의 evaluation criteria를 바탕으로 면접 질문을 제안하고, 가능한 답변도 제공하도록 또 다른 질문을 하겠습니다. 아래 질문을 입력하세요.

    ```text
    Can you provide suggestions of questions to ask in an interview for the Power Platform developer role (Job role number J1004) based on its associated evaluation criteria? Can you also please provide what the answers may be for each question?
    ```

  반환된 응답은 먼저 Power Platform Developer 역할의 evaluation criteria를 나열합니다(이는 Dataverse Job Role row에 정의됨). 각 criteria에는 가중치 비율이 포함됩니다. 그런 다음 각 criteria별 질문이 나열되고, 뒤이어 `Model Answer`가 표시됩니다. 답변이 _first person_으로 되어 있어, 질문에 대해 후보자가 할 수 있는 기대 답변을 설명하고 있다는 점에 주목하세요.

- 응답은 **criteria**, **question**, **answer** 아래로 구성됩니다.
    - **Criteria**:
        - 평가되는 criteria를 나타냅니다.
    - **Question**:
        - 평가되는 면접 질문입니다.
    - **Model Answer**:
        - 이 하위 섹션에는 후보자의 응답에서 Agent가 수용 가능한 강한 답변이라고 판단하는 포인트가 나열됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_05_GPT4.1_01_Question3Response.png' | relative_url }}" alt="GPT-4.1 모델의 세 번째 질문 응답 1" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_05_GPT4.1_02_Question3Response.png' | relative_url }}" alt="GPT-4.1 모델의 세 번째 질문 응답 2" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 Agent의 모델을 바꿔 보겠습니다. **Overview** 탭에서 **chevron** 아이콘을 선택하고, **OpenAI** 모델 목록에서 **GPT-5 Chat**을 선택하세요.

  잠시 후 Agent 모델이 업데이트되었다는 확인 메시지가 표시됩니다. 이제 새 테스트 세션을 시작해 이 모델의 응답을 테스트해 보겠습니다.

  아래 질문을 입력하세요. **Hiring Hub** model-driven app의 기존 활성 이력서에서 **Resume Number** 값을 사용합니다.

    ```text
    Summarize the key qualifications, experience, and skills of the candidate whose resume is identified as R#####. Focus on education, work history, relevant skills, and any notable achievements or certifications.
    ```

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_06_GPT5Model.png' | relative_url }}" alt="GPT-5 Chat 모델의 첫 번째 질문" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 요약된 이력서 응답이 반환됩니다. 이전 모델의 응답과 비교해 정보가 약간 다르며, 다음에 어떤 도움을 줄 수 있는지도 제안한다는 점에 주목하세요.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_07_GPT5_01_Question1Response.png' | relative_url }}" alt="GPT-5 Chat 모델의 첫 번째 질문 응답 1" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_07_GPT5_02_Question1Response.png' | relative_url }}" alt="GPT-5 Chat 모델의 첫 번째 질문 응답 2" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 이 모델이 이전 모델보다 날짜 형식 instructions를 더 잘 따르는지 확인해 보겠습니다. 아래 질문을 입력하세요.

    ```text
    When was the upload date?
    ```

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_08_GPT5_Question2Response.png' | relative_url }}" alt="GPT-5 Chat 모델의 두 번째 질문 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

  이번에는 모델이 날짜 형식을 올바르게 따랐음을 확인할 수 있습니다.

1. 같은 세 번째 질문을 다시 하여, 직무 역할의 evaluation criteria를 바탕으로 면접 질문 목록과 가능한 답변을 받아 보겠습니다. 아래 질문을 입력하세요.

    ```text
    Can you provide suggestions of questions to ask in an interview for the Power Platform developer role (Job role number J1004) based on its associated evaluation criteria? Can you also please provide what the answers may be for each question?
    ```

  이전 모델과 비슷하게, 반환된 응답은 먼저 Power Platform Developer 역할의 evaluation criteria와 각 비율 가중치를 나열합니다. 이번에는 각 criteria에 대한 설명도 일부 포함합니다. 역시 각 criteria마다 질문이 나열되고, 뒤이어 `Model Answer`가 표시됩니다. 답변은 _first person_으로 되어 있어, 질문에 대해 후보자가 할 수 있는 기대 답변을 설명합니다.

  이 모델 역시 각 criteria별 면접 질문과, 면접 중 후보자가 제시할 수 있는 잠재적 답변을 함께 제안합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_09_GPT5_01_Question3Response.png' | relative_url }}" alt="GPT-5 Chat 모델의 세 번째 질문 응답 1" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 또한 이 모델은 질문을 이력서에 맞게 조정하는 방법을 제안하고, 이력서에 대한 참조도 포함합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_09_GPT5_02_Question3Response.png' | relative_url }}" alt="모델이 다음 단계에서 제공할 수 있는 도움 제안" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이제 Agent의 모델을 외부 모델 중 하나로 변경해 보겠습니다.

<div class="info-box note" markdown="1">
**중요** — 이 미션 앞부분에서 설명한 관리자 제어 설정에 따라 `Allow Preview & Experimental Models`와 `Allow External Models`가 활성화되어 있는지 확인해야 합니다.

관리자 권한이 없어 해당 설정을 활성화할 수 없다면, 이 실습의 나머지 hands-on 단계는 건너뛰어도 됩니다.
</div>

  **Overview** 탭에서 **chevron** 아이콘을 선택하고, **Anthropic** 모델 목록에서 **Claude Sonnet 4.5 (Experimental)**를 선택하세요.

  잠시 후 Agent 모델이 업데이트되었다는 확인 메시지가 표시됩니다. 이제 새 테스트 세션을 시작해 이 모델의 응답을 테스트해 보겠습니다.

1. 아래 질문을 입력하세요. **Hiring Hub** model-driven app의 기존 활성 이력서에서 **Resume Number** 값을 사용합니다.

    ```text
    Summarize the key qualifications, experience, and skills of the candidate whose resume is identified as R#####. Focus on education, work history, relevant skills, and any notable achievements or certifications.
    ```

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_10_ClaudeSonnet4.5Model.png' | relative_url }}" alt="Claude Sonnet 4.5 모델의 첫 번째 질문" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

  또한 응답을 생성하는 동안 모델의 thought process도 볼 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_11_ThoughtProcess.png' | relative_url }}" alt="모델의 thought process" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 이번 응답은 더 간결하며, 요약에 날짜가 포함되어 있습니다. 날짜 형식이 올바르게 적용된 점에 주목하세요.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_12_Question1Response.png' | relative_url }}" alt="Claude Sonnet 4.5 모델의 첫 번째 질문 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

1. 앞선 두 모델과도 같은 기준으로 테스트했으므로, 날짜 형식이 올바르게 적용되는지 확인하기 위해 같은 두 번째 질문을 다시 하겠습니다.

    ```text
    When was the upload date?
    ```

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_13_Question2Response.png' | relative_url }}" alt="Claude Sonnet 4.5 모델의 두 번째 질문 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

  날짜 형식이 올바르게 지켜졌음을 확인할 수 있습니다.

1. 마지막으로, 같은 세 번째 질문을 다시 하여 직무 역할의 evaluation criteria를 기반으로 한 면접 질문 목록과 가능한 답변을 받아 보겠습니다. 아래 질문을 입력하세요.

    ```text
    Can you provide suggestions of questions to ask in an interview for the Power Platform developer role (Job role number J1004) based on its associated evaluation criteria? Can you also please provide what the answers may be for each question?
    ```

  제안된 면접 질문 목록이 포함된 응답이 반환되며, Job Role Dataverse row에 정의된 criteria별로 그룹화되고, 면접 중 후보자가 제시할 수 있는 잠재적 답변도 함께 제공됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_14_01_Question3Response.png' | relative_url }}" alt="Claude Sonnet 4.5 모델의 세 번째 질문 응답 1" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/academy/operative-05-model-selection/5.2_14_02_Question3Response.png' | relative_url }}" alt="Claude Sonnet 4.5 모델의 세 번째 질문 응답 2" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

  이것으로 이 실습은 끝입니다!

<div class="info-box note" markdown="1">
**참고 — 모델 탐색** — 다양한 모델을 실험해 보세요. 어떤 모델은 추론에 더 강하고, 어떤 모델은 창의성에 더 강하며, Anthropic 같은 모델은 상세한 response instructions를 따르는 데 특히 뛰어납니다. 따라서 내 시나리오에 가장 잘 맞는 모델을 찾으려면 여러 모델을 테스트해 보는 것이 중요합니다.
</div>

## ✅ 미션 완료

축하합니다! 👏🏻 훌륭하게 해냈습니다, Operative.

여러분은 response formatting, 다양한 사용 가능한 모델의 강점, 그리고 그러한 선택이 Agent 출력에 어떤 영향을 주는지를 배웠습니다. 이를 통해 **Interview Agent**는 선택한 모델의 힘을 활용해 질문과 문의에 더 효과적으로 응답할 수 있게 됩니다.

이로써 **Lab 05 - Understanding Agent Models**를 마쳤습니다. 아래 링크를 선택해 다음 미션으로 이동하세요.

⏭️ 다음 미션으로 이동 [**AI Safety and Content Moderation**]({{ '/chapters/academy-operative-06-ai-safety/' | relative_url }})

## 📚 전술 리소스

📖 [Multi-agent orchestration and more: Copilot Studio announcements](https://www.microsoft.com/microsoft-copilot/blog/copilot-studio/multi-agent-orchestration-maker-controls-and-more-microsoft-copilot-studio-announcements-at-microsoft-build-2025/#copilot-studio-enhancements)

📖 [Choose an external model as the primary AI model](https://learn.microsoft.com/microsoft-copilot-studio/authoring-select-external-response-model?WT.mc_id=power-188561-ebenitez)

📖 [Connect to Anthropic's AI models](https://learn.microsoft.com/copilot/microsoft-365/connect-to-ai-models?WT.mc_id=power-188561-ebenitez)

📖 [Allow external large language models (LLMs) for generative responses](https://learn.microsoft.com/power-platform/admin/allow-llm-generative-responses?WT.mc_id=power-188561-ebenitez)

📖 [Move data across regions for Copilots and generative AI features](https://learn.microsoft.com/power-platform/admin/geographical-availability-copilot?tabs=new#copilots-and-generative-ai-features-that-depend-on-data-movement-across-regions?WT.mc_id=power-188561-ebenitez)

📖 [Provide feedback on Anthropic models](https://community.powerplatform.com/forums/thread/?groupid=db8f53c2-767d-47d6-a1ae-fe4c828a6553)
