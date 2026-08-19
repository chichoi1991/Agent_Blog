---
layout: "chapter"
date: 2026-08-18
title: "출시 전 검토: Copilot Studio 에이전트를 위한 Agent Review Tool 활용"
short_title: "Agent Review Tool"
description: "Copilot Studio 에이전트를 출시하기 전에 Agent Review Tool로 검토 결과를 조사하고, Skill 품질과 구성 요소 간 관계를 이해하는 방법을 설명합니다."
order: 13
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/agent-review-tool/"
source_author: "ramakrishnan24689"
source_published: "2026-08-18"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/agent-review-tool/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 ramakrishnan24689(@ramakrishnan24689) 원문 [Review Before Release: Using Agent Review Tool for Copilot Studio Agents](https://microsoft.github.io/mcscatblog/posts/agent-review-tool/)(2026-08-18)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/agent-review-tool/header-v2.png' | relative_url }}" alt="Copilot Studio 에이전트 검토와 Agent map을 보여주는 Agent Review Tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

에이전트는 **미리 보기(Preview)** 탭에서 기대한 대로 동작합니다. 예상한 질문에 답하고, 올바른 도구를 호출하며, 다음 환경으로 이동할 준비가 된 것처럼 보입니다.

하지만 출시 전에 지침, Skill, 도구, 지식 원본, 평가 범위, 연결된 에이전트 아키텍처를 어떻게 체계적으로 검토할 수 있을까요?

에이전트에 지침 하나와 Skill 하나만 있다면 모든 것을 쉽게 살펴볼 수 있습니다. 하지만 에이전트는 좀처럼 그렇게 작게 머물러 주지 않습니다.

에이전트가 성장할수록 구성은 여러 화면에 분산됩니다. 한 Skill 자체는 완벽히 타당해도 다른 Skill과 중복될 수 있습니다. 도구는 올바르게 구성됐지만 모호하게 참조될 수 있습니다. 지식 원본은 존재하지만 Skill이 에이전트에 이를 사용할 충분한 방향을 제공하지 않을 수 있습니다. 미리 보기에서는 적절한 입력 조합이 나타날 때까지 이런 문제를 드러내지 못할 수 있습니다.

[Copilot Agent Kit](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/kit-overview)의 일부인 [Agent Review Tool](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/kit-overview)은 이런 위험을 반복 가능하게 검사하는 방법을 제공합니다. 이 글에서는 GitHub Copilot 하네스로 구동되는 Copilot Studio 에이전트인 가상의 소매 시각 상품화 에이전트 **ZAVA Visual Merchandiser**를 사용합니다. 다음 세 가지 기능에 초점을 맞춰, 출시 전 실무 워크플로를 살펴봅니다.

1. 심각도와 규칙군별로 근거 있는 검사를 정리하는 **검토 결과(Review findings)**
2. 개별 Skill 품질과 Skill 간 오케스트레이션을 평가하는 **Skill evaluator**
3. 검토한 Skill이 도구, 지식 원본 및 기타 구성 요소와 어떻게 관련되는지 검사하는 **Agent map**

이 글은 Agent Review Tool의 모든 버튼을 둘러보는 안내가 아닙니다. 에이전트가 동작은 하지만 출시 전인 시점에 메이커가 무엇을 검사하고 개선해야 하는지라는 한 가지 질문에 집중합니다.

<div class="info-box note" markdown="1">
2026년 8월 18일 기준 Agent Review Tool은 미리 보기 환경으로 제공됩니다. 평가기와 표시 방식은 변경될 수 있습니다.
</div>

## 미리 보기 탭만으로는 검토가 충분하지 않은 이유

대화를 테스트하는 일은 필수지만, 대화는 해당 입력에 선택된 경로만 실행합니다. 다음 사항을 자동으로 알려 주지는 않습니다.

- 두 Skill의 책임이 겹치는지
- Skill 설명이 에이전트가 사용 시점을 결정하도록 돕는지
- 지침이 경계와 에스컬레이션 동작을 정의하는지
- 구성된 기능에 대표적인 평가 범위가 있는지
- Skill이 도구 또는 지식 원본을 유지 관리 가능할 만큼 명확히 참조하는지
- 아키텍처 관계가 구성된 것인지, 작성된 텍스트에서 추론된 것인지, 실제 런타임에 관찰된 것인지

Agent Review Tool은 저장된 구성을 검사하고 메이커가 조사할 수 있는 결과를 생성해 런타임 테스트를 보완합니다.

| 검토 방법 | 답하는 데 도움이 되는 질문 |
| --- | --- |
| 미리 보기 및 평가 | 이 대화에서 에이전트가 예상대로 동작했는가? |
| Agent Review | 저장된 구성에 품질, 명확성, 범위 또는 유지 관리 위험이 있는가? |

어느 방법도 에이전트가 프로덕션 준비를 마쳤다고 보증하지는 않습니다. 함께 사용하면 어느 하나만 쓸 때보다 유용한 그림을 제공합니다.

더 넓은 도구 키트가 처음이라면, 앞서 연결한 개요에서 메이커와 관리자의 환경이 어떻게 조화를 이루는지 설명합니다.

## 기준선 검토 수립

ZAVA Visual Merchandiser는 이 안내를 위해 만든 가상 에이전트이며 다운로드 가능한 샘플이 아닙니다. 스크린샷에는 가상의 이름을 사용하고 테넌트별 세부 정보는 제외했습니다. 2026년 8월 18일 검토를 선택한 이유는 결과가 이해하고, 변경하고, 다시 검토하기에 충분히 구체적이었기 때문입니다.

**Agent Review Tool**에서 에이전트를 찾아 검토를 시작합니다. 검토는 사용 가능한 구성에 대해 [결정론적 검사와 AI 지원 분석](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/2e1a9883f73669d410d33c38a3a4527744df90a4/AGENTREVIEWTOOL_REFERENCE_GUIDE.md#capability-summary)을 결합합니다. 결과는 해당 검토에서 수집한 근거에 기반합니다.

완료된 검토는 세 개의 주요 섹션이 있는 작업 영역을 엽니다.

- 결과, Skill evaluator, 평가 범위, 전체 검사 목록을 포함하는 **Review**
- 검토한 아키텍처를 그래프와 목록으로 보여 주는 **Agent map**
- 제한된 관찰 활동 신호, 개선 및 검증 지침, 계획 범위를 제공하는 **Cost & efficiency**

이 글은 처음 두 섹션만 다룹니다. 비용 및 효율성은 구성 검토와 근거의 경계가 다른 계획 범위와 관찰 활동을 다루므로 별도 논의가 필요합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/agent-review-tool/zava-review-summary.png' | relative_url }}" alt="완료된 ZAVA 에이전트 검토 요약" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>이 안내의 스냅샷에서 기준선 검토는 54개 검사 중 39개 통과로 63%를 기록했습니다.</figcaption>
</figure>

## 결과부터 시작하되 점수에서 멈추지 마세요

검토 요약은 점수와 오류, 경고, 정보 결과의 분류를 보여 줍니다. 점수는 유용한 요약이지만, 조사하고 개선할 대상을 알려 주는 것은 개별 결과와 근거입니다.

GitHub Copilot 하네스로 구동되는 에이전트에서 [근거 점수](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/2e1a9883f73669d410d33c38a3a4527744df90a4/AGENTREVIEWTOOL_REFERENCE_GUIDE.md#github-copilot-agent-score)는 평가 준비 상태와 지침에 대해 결정론적 규칙 기반 축을 사용하고, 에이전트에 Skill, 도구, 지식 원본 또는 연결된 에이전트가 있으면 추가 축을 사용합니다. AI 지원 결과는 보조 검토 근거로 표시되지만 결정론적 축 점수는 바꾸지 않습니다.

<div class="info-box warning" markdown="1">
높은 점수가 런타임 품질을 증명하지 않으며, 낮은 점수가 에이전트 실패를 증명하지도 않습니다. 결과를 사용해 조사할 대상과 다음에 실행할 평가를 결정하세요.
</div>

무엇을 바꾸기 전에 다음 기준선을 기록하세요.

- 전체 점수
- 오류와 경고
- 평가된 Skill 수
- 가장 약한 Skill 차원
- Skill 간 오케스트레이션 결과
- 구성된 기능의 평가 범위

이렇게 하면 다시 검토할 때 단순히 “더 좋아 보인다”보다 유용한 비교 기준을 갖게 됩니다.

### 검토 결과 보기로 분류하기

먼저 **Review findings**를 엽니다. 기능 인벤토리는 캡처한 내용을 요약하고, 심각도 필터는 결과 범위를 좁힙니다. 결과는 규칙군별로 묶이며, 하나를 선택하면 근거, 근거 설명, 권장 사항, 가능한 수정 단계 및 참고 자료가 열립니다.

이 화면에서 다음 세 가지 초기 질문에 가장 빨리 답할 수 있습니다.

1. 이번 출시 전에 어떤 결과를 처리해야 하는가?
2. 어떤 기능 또는 구성 영역이 결과를 만들었는가?
3. 근거가 에이전트에서 검증할 만큼 구체적인가?

<figure class="screenshot">
  <img src="{{ '/assets/catblog/agent-review-tool/zava-review-findings.png' | relative_url }}" alt="ZAVA 에이전트의 근거 기반 검토 결과" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>검토 결과는 심각도, 근거, 권장 사항, 참고 자료를 한 작업 영역에서 제공하는 초기 분류 화면입니다.</figcaption>
</figure>

Review findings는 **조사가 필요한 대상**을 알려 줍니다. Skill evaluator는 문제가 한정적인지 Skill 집합 전반에 반복되는지 판단하게 하고, Agent map은 주변 구성 맥락을 제공합니다.

## 패턴으로 Skill 품질 검사

**Skill evaluator**를 엽니다. 기본 **Group by pattern** 보기는 평가된 모든 Skill의 결과를 정리하고 평균 품질, 안전 플래그, 가장 약한 루브릭 차원, Skill 간 오케스트레이션 결과를 요약합니다.

지침 품질은 네 가지 루브릭 차원으로 평가됩니다.

| 차원 | 확인할 사항 |
| --- | --- |
| 명확성 | 설명이 구체적이고 모호하지 않은 언어로 Skill을 언제 선택해야 하는지 말하는가? |
| 실행 가능성 | 단계가 실행 가능하고 순서가 있으며, 필수 입력·출력·예외 상황·검증을 명확히 하는가? |
| 범위 규율 | Skill이 명확한 경계를 두고 관련 없는 책임 없이 하나의 일관된 작업을 수행하는가? |
| 조합성 | 부모 지침과 동급 Skill에 중복, 모순 또는 숨은 종속성 없이 함께 동작할 수 있는가? |

같은 화면에서 Bundle 무결성, 리소스 안전성, 운영 준비 상태도 보고합니다. 이 결과들은 네 가지 지침 품질 차원과 별개입니다.

GitHub Copilot 하네스로 구동되는 에이전트에서는 Skill 품질이 한 `SKILL.md` 안의 내용만을 뜻하지 않으므로 특히 중요합니다. 에이전트는 사용 가능한 모든 대안 중에서 해당 Skill을 다른 것과 구별할 수 있어야 합니다.

GitHub Copilot 하네스로 구동되는 에이전트의 Skill에 관한 자세한 소개는 [Agents Have Skills Now](https://microsoft.github.io/mcscatblog/posts/modern-mcs-agent-skills/)를 참조하세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/agent-review-tool/zava-skill-evaluator.png' | relative_url }}" alt="패턴별로 묶은 ZAVA Skill Evaluator" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Skill 결과를 패턴별로 묶으면 Skill 전반의 반복되는 약점이 보입니다.</figcaption>
</figure>

### “By skill”로 실제 변경 위치 찾기

그룹화된 화면은 약점이 반복되는지를 알려 주고, **By skill**은 변경할 위치를 알려 줍니다.

ZAVA에서는 `display-audit`가 문제였습니다. 다섯 단계 중 두 단계가 **Merchandising Scorecard**와 **Regional Escalation Agent**를 언급하지만, 어느 기능도 에이전트에 구성되어 있지 않았습니다. Agent Review는 이를 **Skill References a Capability the Agent Does Not Have** 오류로 표시했습니다. 이 Skill은 실행 가능성에서 **4/10**, 지침 품질에서 **61%**를 기록했습니다.

따라서 해결할 문제가 명확했습니다. 작성된 대로라면 에이전트는 컴플라이언스 점수 산정 또는 에스컬레이션 단계를 완료할 수 없었습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/agent-review-tool/zava-skill-finding-before.png' | relative_url }}" alt="개선 전 Skill 결과" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>선택한 결과는 Skill 품질 판단을 제한된 구성 근거와 연결합니다.</figcaption>
</figure>

유용한 결과는 문제를 일으킨 지침 또는 Skill 텍스트를 가리키므로 메이커가 검증하고 수정하기 쉽습니다. AI 지원 평가를 사용할 수 없으면 Agent Review는 이를 통과로 처리하는 대신 해당 상태를 표시합니다.

## Agent map으로 주변 아키텍처 검사

Skill 결과는 아키텍처 맥락에서 보면 더 잘 이해할 수 있습니다. **Agent map**을 열어 저장된 검토에서 캡처한 구성 요소를 검사하세요.

맵에는 검토에서 캡처한 지원되는 구성 요소가 포함됩니다. 검색과 필터는 그래프를 좁히고, **Map**과 **List**는 동일하게 필터링된 정보를 시각적·의미적 보기로 제공합니다.

ZAVA 결과에서는 맵을 영향받은 Skill 및 관련 도구 또는 지식 원본으로 필터링한 뒤 다음을 질문합니다.

1. 참조한 기능이 실제로 에이전트에 구성되어 있는가?
2. Skill이 기능의 구성된 이름을 명확하고 일관되게 사용하는가?
3. 다른 메이커도 Skill이 해당 기능을 언제, 왜 쓰는지 이해할 수 있는가?

<figure class="screenshot">
  <img src="{{ '/assets/catblog/agent-review-tool/zava-agent-map.png' | relative_url }}" alt="ZAVA Visual Merchandiser의 Agent map" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Agent map은 네 가지 Skill 및 작성된 참조의 구성 맥락을 제공하지만 런타임 실행을 주장하지는 않습니다.</figcaption>
</figure>

<div class="info-box note" markdown="1">
Agent map은 검토한 구성과 제한된 작성 참조를 설명합니다. 도구, 지식 원본, Skill 또는 연결된 에이전트가 호출됐음을 증명하거나 에이전트의 런타임 계획을 재구성하지는 않습니다.
</div>

## 하나의 개선에 집중

근거가 가리킨 지침이나 구성만 변경하세요. ZAVA를 수정하기 전에 의도한 수정 사항을 기록하고 관련 없는 동작을 바꾸지 않는지 확인했습니다.

`display-audit`에서는 새 기능을 추가하는 대신 Skill을 다시 쓰기로 했습니다.

정확한 단계 텍스트는 보존되지 않았으므로, 다음 표는 변경 전후를 그대로 전사한 것이 아니라 검증한 변경을 개념적으로 요약합니다. 이는 개선 패턴을 보여 주지만 그대로 복사할 수 있는 Skill 지침은 아닙니다.

| 기준선 문제 | 적용한 수정 |
| --- | --- |
| Skill이 에이전트에 구성되지 않은 **Merchandising Scorecard**와 **Regional Escalation Agent**를 참조했습니다. | 영향받은 단계가 구성된 기능인 **Planogram Archive**, **Display Photo Library**, **ZAVA visual-merchandising standards** 지식 원본 및 **ZAVA Store Ops Assistant**를 사용합니다. |

이 변경은 참조한 모든 기능이 이제 에이전트에 존재하므로 근거를 직접 해결합니다. 또한 디스플레이를 검사하고, 사용 가능한 상품화 표준에 따라 평가하며, 구성된 지원 도우미를 통해 후속 조치를 전달한다는 원래 목적을 보존합니다.

업데이트 후에는 다음을 수행하세요.

1. 변경한 Skill을 실행할 가능성이 가장 높은 대화와 평가를 실행합니다.
2. 라우팅과 출력이 여전히 의도대로 동작하는지 확인한 다음 Agent Review를 다시 실행합니다.
3. Skill 차원, 오케스트레이션 결과, 뒷받침 근거를 기준선과 비교합니다.
4. Agent map을 다시 열어 구성 보기가 의도한 아키텍처를 여전히 반영하는지 확인합니다.

| 지표 | 기준선 검토 | 두 번째 검토 |
| --- | ---: | ---: |
| 근거 기반 구성 점수 | 63% | 67% |
| 통과한 검사 | 54개 중 39개 | 54개 중 51개 |
| 오류 | 8 | 0 |
| 경고 | 7 | 2 |
| 평균 Skill 품질 | 64% | 90% |
| 평가 범위 | 7개 중 0개 | 7개 중 0개 |

대상인 사용할 수 없는 기능 결과는 더 이상 나타나지 않았습니다. 그러나 평가는 축 가중치 기반 근거 점수에서 고정된 **30%** 비중을 유지하므로, 54개 중 51개를 통과했어도 누락된 테스트 범위는 결과를 계속 제한했습니다.

최종 `display-audit` 지침 품질 결과는 보존된 근거에 포함되지 않았으므로, 비교에서 정확한 Skill별 변화를 주장하지 않습니다. 이 안내에서는 런타임 평가 결과도 보존되지 않았습니다. 근거는 구성 결과가 해결됐음을 보여 줄 뿐 런타임 동작이 향상됐음을 증명하지는 않습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/agent-review-tool/zava-review-summary-after.png' | relative_url }}" alt="두 번째 ZAVA 에이전트 검토 요약" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>두 번째 검토는 67%에 도달했으며, 54개 중 51개 통과, 오류 없음, 경고 두 개, 평가 범위는 여전히 7개 중 0개였습니다.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/agent-review-tool/zava-skill-evaluator-after.png' | relative_url }}" alt="두 번째 ZAVA Skill evaluator 결과" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>두 번째 Skill evaluator 결과는 평균 품질 90%, 안전 플래그 없음, Skill 간 오케스트레이션 결과 하나를 보여 줍니다.</figcaption>
</figure>

사용할 수 없는 기능 오류를 해결하자 다음 검토 우선순위가 드러났으며, 결과 목록이 비어 있지는 않았습니다. 남은 두 경고는 누락된 평가 테스트 집합과 지침 문자 위생에 관한 것이었습니다. Skill evaluator는 네 Skill 전반에서 **Capability Coverage Gap** 하나도 표시했습니다. 이 항목들은 이 안내의 집중된 변경 범위 밖입니다.

결과가 사라져도 런타임 평가가 퇴보한다면 검토 결과만 개선한 것이지 에이전트를 개선한 것은 아닙니다. 목표는 점수를 얻는 일이 아니라, 다음 메이커가 더 명확하게 이해하고 더 안정적으로 사용할 수 있는 에이전트를 만드는 것입니다.

이것이 단일 모델 생성 평점만으로 충분하지 않은 이유이기도 합니다. [더 나은 LLM 점수 산정 패턴](https://microsoft.github.io/mcscatblog/posts/better-llm-scoring/)은 하나의 불투명한 점수를 모델에 요청하는 것보다, 더 작은 근거 기반 검사와 결정론적 결합 규칙이 왜 더 방어 가능한지를 설명합니다.

## Agent Review Tool이 주장하지 않는 것

Agent Review Tool은 조사를 안내합니다. 에이전트가 프로덕션 준비를 마쳤다고 인증하지 않고, 원본 에이전트를 수정하지 않으며, 대표 테스트 사례나 사람의 검토를 대체하지 않고, 구성된 기능이 실행됐음을 증명하지도 않습니다. 비용 계획과 관찰 활동 보기도 실제 청구 금액을 보고하거나 절감을 보장하지 않습니다.

## 결론

미리 보기 탭에서 예상대로 동작하는 에이전트는 출시 준비가 끝난 것이 아니라 더 깊은 검토를 할 준비가 된 것입니다. Agent Review Tool은 결과, 뒷받침 근거, Skill 품질, 평가 공백, 구성 관계를 하나의 워크플로로 가져와 메이커가 “문제없어 보인다”에서 집중되고 추적 가능한 개선으로 나아가게 합니다.

Agent Review Tool은 Microsoft Marketplace의 [Copilot Agent Kit](https://marketplace.microsoft.com/en-us/product/dynamics-365/microsoftpowercatarch.copilotstudiokit2)를 통해 사용할 수 있습니다. 설치 및 액세스 요구 사항은 [Agent Review Tool 참조 가이드](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/2e1a9883f73669d410d33c38a3a4527744df90a4/AGENTREVIEWTOOL_REFERENCE_GUIDE.md)에 설명되어 있으므로, 이 워크플로에서는 도구 키트 설정이 아닌 에이전트 검토에 집중할 수 있습니다.

대표적인 평가와 함께 사용하세요. 기준선을 수립하고, 근거를 검사하고, 한 가지에 집중해 변경한 뒤 다시 검토합니다. 점수보다 결과가 중요합니다. 구성이 더 명확해져야 하며 런타임 동작은 별도로 검증해야 합니다.

여러분의 에이전트에서 출시 전 검토 중 가장 어려운 부분은 무엇인가요? Skill 경계, 평가 범위, 아니면 구성된 아키텍처의 이해인가요?
