---
layout: "chapter"
date: 2026-07-02
title: "미션 02: 에이전트 지침 작성"
short_title: "02. 에이전트 지침 작성"
description: "정교한 Agent 커뮤니케이션과 동작 제어를 익힙니다"
order: 2
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/02-agent-instructions/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: ""
canonical_url: "https://microsoft.github.io/agent-academy/operative/02-agent-instructions/"
image: "/assets/academy/operative-02-agent-instructions/02-instructions-thumbnail_PlayButton.png"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🕵️‍♂️ Mission 02: Authoring Agent Instructions](https://microsoft.github.io/agent-academy/operative/02-agent-instructions/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

🎥 **워크스루 보기**

<a href="https://www.youtube.com/watch?v=h_pgKSKHlIU" target="_blank" rel="noopener">
  <figure class="screenshot">
    <img src="{{ '/assets/academy/operative-02-agent-instructions/02-instructions-thumbnail_PlayButton.png' | relative_url }}" alt="에이전트 지침 작성 동영상 썸네일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  </figure>
</a>

## 🎯 미션 브리핑

Agent, 다음 임무는 **Operation Secret Directive**입니다. 이 미션은 Agent 커뮤니케이션과 제어에 초점을 맞춘 집중 훈련입니다.

이 미션은 직접 실습하는 랩이 아닙니다. 대신 이후 실습에서 Agent를 위해 명확하고 효과적인 instructions를 작성하는 데 필요한 기초 지식을 제공합니다. 잘 작성된 instructions가 Agent의 동작, 의사 결정, 도구 사용 방식에 어떤 영향을 미치는지, 그리고 작은 표현 차이만으로도 결과가 크게 달라질 수 있는 이유를 배우게 됩니다.

목표는 Agent가 자신의 역할을 해석하고, 적절한 도구와 지식 소스를 선택하며, 사용자 질의에 정확하게 응답할 수 있도록 돕는 정밀하고 실행 가능한 instructions와 고품질 설명을 작성하는 방법을 이해하는 것입니다. 이러한 역량은 앞으로 만들 모든 성공적인 Agent의 기반이 됩니다.

이 과정을 Agent의 동작과 의도 형성을 다루는 고급 훈련이라고 생각해 보세요. 현장 요원이 명확한 임무 파라미터에 의존하듯, AI Agent도 실제 시나리오에서 명확성, 일관성, 목적 의식을 갖고 행동하려면 세심하게 작성된 instructions가 필요합니다.

## 🔎 목표

이 미션에서 배우는 내용은 다음과 같습니다.

1. Copilot Studio에서 Agent instructions를 작성하는 기술과 원리
1. Agent가 도구, 지식 소스, 다른 Agent와 협업하도록 유도하는 방법
1. Agent가 정확성, 투명성, 효율성을 갖추고 동작하도록 보장하는 방법

## 📝 Agent instructions 작성

효과적인 Agent instructions를 작성하는 것은 성공적인 Agent 동작의 핵심입니다. Agent는 instructions를 사용해 다음을 수행합니다.

- 사용자 질의 또는 자율 트리거에 대해 어떤 도구, topic, 지식 소스를 사용할지 결정합니다.
- 사용 가능한 컨텍스트를 바탕으로 각 도구의 입력값을 채웁니다.
- 최종 사용자에게 보낼 응답을 생성합니다.

### instructions가 작동하는 방식

instructions는 Agent에 구성된 도구, topics, 지식 소스를 기반으로 해야 합니다. Agent는 자신이 갖고 있지 않은 리소스에 대한 instructions를 실행할 수 없습니다. 예를 들어 Agent에게 웹 사이트 FAQ를 검색하라고 지시하려면, 해당 FAQ를 지식 소스로 추가해야 합니다.

instructions에서 `/`를 사용하면 특정 도구, topic, 변수 또는 Power Fx 식을 참조할 수 있습니다. 이렇게 하면 Agent가 무엇을 언제 사용해야 하는지 더 정확히 이해할 수 있습니다.

### instructions에 포함할 내용

- Agent의 선택을 유도하고 싶을 때, 특히 모호성이 생길 수 있는 경우에는 instructions를 추가합니다.
- topics를 제한하거나 응답 형식을 지정하는 것처럼 가드레일을 설정하는 데 instructions를 사용합니다.
- 예를 들어 "사용자가 이메일 초안을 작성하도록 도울 때는 lead의 contact field에 있는 이메일 주소를 사용합니다."처럼 도구 입력값을 채우는 힌트를 제공합니다.
- 예를 들어 "주문 상태에 대한 응답은 항상 표 형식으로 제공합니다."처럼 응답 형식을 지정합니다.
- 예를 들어 "직원 복리후생 관련 요청에만 응답합니다."처럼 Agent의 동작 범위를 제한하는 제약을 둡니다.

### 실전 예시

- "질문이 Hours, Appointments, Billing과 관련이 없을 때만 FAQ 문서를 사용합니다."
- "티켓 생성에는 ticket creation topic만 사용하고, 문제 해결과 관련된 다른 요청에는 troubleshooting topic을 사용합니다."
- "주문 상태에 대한 응답은 항상 표 형식으로 제공합니다."

### 테스트하고 다듬기

- instructions를 편집한 뒤에는 test pane을 사용해 Agent 동작을 검증합니다.
- 필요에 따라 변경 내용을 업데이트하고 게시합니다.

### 고급 가이드

- instructions를 번호 목록 또는 글머리표 목록으로 작성하고, 반드시 순서대로 따라야 한다고 명시합니다.
- 가독성을 높이고 generative AI가 instructions를 더 잘 처리할 수 있도록 markdown formatting을 사용합니다.
- Agent가 매우 구체적으로 동작해야 한다면 해당 사용 사례를 위한 topic을 만드는 것을 고려합니다.
- 혼동을 피하려면 instructions에서 tools와 topics의 정확한 이름을 사용합니다.

### 안전 및 검열

- 지식 소스를 참조할 때 Agent가 사용해야 할 도구를 제한합니다.
- 도구에 사용할 매개변수를 제한합니다(예: 지정된 목록의 개인에게만 이메일 전송).
- 원치 않는 동작이나 콘텐츠 필터링 문제를 방지하도록 instructions를 사용합니다.

## ✍️ 도구, topic, Agent 설명 작성

고품질 설명은 generative orchestration에 필수적입니다. Agent는 이러한 설명을 사용해 사용자 질의와 트리거에 응답할 적절한 도구, topics, Agent를 선택합니다. 다음 모범 사례를 따르세요.

- **단순하고 직접적인 언어 사용**: 전문 용어, 속어, 지나치게 기술적인 표현은 피합니다. 능동태와 현재형으로 작성합니다.
- **구체적이고 관련성 있게 작성**: 기능과 사용자 의도에 관련된 키워드를 포함합니다. 비슷한 도구나 topic을 명확히 구분할 수 있도록 설명을 작성해 모호성을 줄입니다.
- **짧지만 충분한 정보 제공**: 설명은 한두 문장으로 제한합니다. 도구, topic, Agent가 무엇을 하고 사용자에게 어떤 이점을 주는지 요약합니다.
- **고유하고 설명적인 이름 사용**: 일반적인 이름은 피합니다. 예를 들어 단순히 "Weather" 대신 "Weather Forecast for Tomorrow"를 사용합니다.
- **작업 또는 고려 사항 나열**: 여러 기능이나 단계를 설명할 때는 글머리표 또는 번호 목록을 사용해 명확성을 높입니다.
- **중복 여부 테스트**: 여러 topic의 설명이 비슷하면 Agent가 모두 호출할 수 있습니다. 중복을 방지하도록 테스트하고 수정합니다.

<div class="info-box note" markdown="1">
**좋은 설명과 나쁜 설명 예시**

- **좋음:** 이 topic은 전 세계 어느 위치에 대해서든 다음 날의 날씨 정보를 제공합니다. 기온을 알려 주며, 오늘의 현재 날씨는 제공하지 않습니다.
- **나쁨:** 이 도구는 질문에 답할 수 있습니다. *(너무 모호함)*
</div>

## 🛠️ instructions와 설명을 위한 모범 사례

instructions와 설명을 정말 효과적으로 만들려면 다음 원칙을 기억하세요.

- 능동태와 현재형을 사용합니다(예: "이 도구는 날씨 정보를 제공합니다").
- 대상에게 꼭 필요하지 않다면 전문 용어, 속어, 불필요한 기술 용어를 피합니다.
- 작업, 기능, 고려 사항을 구분하려면 글머리표 또는 번호 목록을 사용합니다.
- 사용자 의도와 도구 또는 topic의 기능에 맞는 키워드를 포함합니다.
- 비슷한 리소스가 혼동되거나 중복되지 않도록 이름과 설명을 서로 구분되게 작성합니다.

## 🗂️ 예시 instruction 구조

instructions를 작성할 때는 명확성과 완전성을 위해 다음 구조를 고려해 보세요.

1. **개요**: Agent의 임무와 역할을 간단히 설명합니다.
1. **프로세스 단계**: Agent가 따라야 할 주요 단계를 나열합니다.
1. **협업 지점**: 다른 Agent를 호출하거나 특정 도구를 사용해야 하는 시점을 나타냅니다.
1. **안전 및 검열**: 준수 또는 안전 요구 사항을 포함합니다.
1. **피드백 루프**: Agent가 피드백을 수집하거나 문제를 에스컬레이션하는 방법을 지정합니다.

## 🎉 미션 완료

Mission 02를 완료했습니다! 이제 다음을 갖추게 되었습니다.

✅ **Instruction 숙련도**: 명확하고 실행 가능한 Agent instructions를 작성하는 방법을 익혔습니다  
✅ **전략적 가이드**: Agent가 도구를 사용하고 효과적으로 협업하도록 안내할 수 있습니다  
✅ **운영 명확성**: Agent가 정확성과 투명성을 갖추고 동작하도록 설계할 수 있습니다

이제 곧 이어지는 학습에서 새롭게 익힌 instruction 작성 역량을 실제로 활용하게 됩니다.

다음은 [Mission 03: 멀티 에이전트 시스템]({{ '/chapters/academy-operative-03-multi-agent/' | relative_url }})입니다.

## 📚 전술 자료

📖 [Microsoft Copilot Studio - Authoring Instructions](https://learn.microsoft.com/microsoft-copilot-studio/authoring-instructions)
📖 [Guidance for Generative Mode](https://learn.microsoft.com/microsoft-copilot-studio/guidance/generative-mode-guidance)
