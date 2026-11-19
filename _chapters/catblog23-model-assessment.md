---
layout: "chapter"
date: 2026-11-12
title: "모델을 바꾸기 전에 Copilot Studio 에이전트를 Model Assessment로 평가하기"
short_title: "Model Assessment로 모델 비교"
description: "Copilot Agent Kit의 Model Assessment로 테스트 결과, 회귀, Copilot Credits를 비교해 에이전트에 적합한 모델을 판단하는 방법"
order: 23
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/model-assessment/"
source_author: "patilravikiran"
source_published: "2026-11-12"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/model-assessment/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 patilravikiran(@patilravikiran)이 작성한 원문 [Before you switch models: Assess your Copilot Studio agent with Model Assessment](https://microsoft.github.io/mcscatblog/posts/model-assessment/)(2026-11-12)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/header.png' | relative_url }}" alt="Model Assessment로 모델 기록, 품질 및 크레딧 비교, 개별 테스트 결과를 사용해 모델 변경 전에 에이전트 평가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

모델을 바꾸는 것은 몇 번의 클릭이면 됩니다. 하지만 바꾼 모델을 계속 사용할 가치가 있는지 확인하려면 더 많은 작업이 필요합니다.

에이전트 모델의 수명 주기를 관리하는 일은 “설정하고 잊어버리는” 일이 아닙니다. 선도적인 AI 연구소에서 새 모델을 내놓으면서 Copilot Studio에서 선택할 수 있는 모델도 계속 달라집니다. [Copilot Studio 에이전트의 AI 모델 수명 주기 관리](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/plan-agent-model-lifecycle) 지침에 따라 변화를 정기적으로 검토하고 에이전트를 마이그레이션할지 판단하세요. Model Assessment는 다른 모델에서 에이전트를 테스트하고 현재 모델의 결과와 비교해 마이그레이션을 준비하도록 돕습니다.

다른 모델이 더 나은 설명을 작성할 수 있지만 도구 기반 답변에서 세부 정보를 빠뜨릴 수도 있습니다. 같은 테스트를 통과하면서 크레딧은 더 많이 사용할 수도 있습니다. 몇 차례 좋은 대화를 나누는 것만으로는 어떤 절충이 있는지 알 수 없습니다.

[Copilot Agent Kit](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/kit-overview)의 **Model Assessment**는 에이전트의 테스트를 사용해 이러한 선택을 평가하도록 돕습니다. 평가 기록, 나란히 비교한 결과, 모델 권장 사항, 보고된 Copilot Credits를 하나의 작업 공간에 모읍니다.

중요한 질문은 전반적으로 어떤 모델이 가장 좋은가가 아닙니다. **사용자가 수행해야 하는 작업에서 이 에이전트에 더 잘 맞는 모델은 무엇인가?**

데모 에이전트인 **Zava Kit Test Automation**은 제작자가 테스트 세트와 결과를 다루도록 돕습니다. 이 에이전트의 평가 결과는 모델 선택에 합격률 이상의 정보가 필요하다는 점을 보여 줍니다.

## 좋은 대화만으로 모델을 선택할 수는 없습니다

사용자가 의존하는 작업을 테스트하세요. 지원 에이전트라면 올바른 문제 해결 지침을 찾는 작업, 온보딩 에이전트라면 정책 질문에 정확히 답하는 작업일 수 있습니다. 모델 변경은 다른 작업을 손상시키지 않으면서 해당 작업을 개선해야 의미가 있습니다.

Model Assessment는 Microsoft Copilot 하네스와 표준 하네스 에이전트를 모두 지원하며, [두 가지 테스트 경로](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#33-make-an-agent-eligible)를 제공합니다.

**Copilot Studio 평가**는 두 하네스 모두에서 사용할 수 있습니다. 평가 테스트 세트를 만들고 이름에 `MODELCHECK`를 포함한 뒤 활성 상태를 유지합니다. 이 평가는 저장된 초안을 평가합니다.

대안인 **Copilot Agent Kit 테스트 자동화**는 현재 표준 하네스 에이전트만 지원합니다. 파이프라인이 활성화된 **Agent Configuration**과 Kit 테스트 세트를 구성하세요. Kit 테스트는 게시된 에이전트를 평가합니다.

필요한 역할, 연결, 흐름, 용량은 [설정 가이드](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#2-prerequisites)를 참고하세요.

먼저 [기준선 평가](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#43-capture-a-baseline)를 진행합니다. 이후 평가를 통해 모델 변경 후 기억이나 즐겨 쓰는 프롬프트에 의존하지 않고 구체적인 결과를 비교할 수 있습니다.

Model Assessment는 **Copilot Agent Kit**의 **고급 테스트**에서 사용할 수 있습니다. 개요에는 이전 모델과 현재 모델, 각 에이전트의 최신 평가 상태가 함께 표시되어 조사할 에이전트를 쉽게 찾을 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/01-zava-agents.png' | relative_url }}" alt="GPT-6 Luna와 GPT-6.1 Sol, 평가 상태, 최신 결과를 보여 주는 Zava Kit Test Automation 필터링 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>개요에서 모델 변경과 에이전트의 최신 평가 결과를 연결해 확인할 수 있습니다.</figcaption>
</figure>

개별 에이전트의 **모델 기록**에는 이전 평가, 실행 날짜, 결과, 제공되는 경우 보고된 크레딧이 저장됩니다. 최근 실행뿐 아니라 과거 평가도 다시 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/02-model-history.png' | relative_url }}" alt="모델 선택기에서 GPT-6.1 Sol을 선택하고 GPT-6 Luna의 최신 모델 기록을 보여 주는 Zava Kit Test Automation" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>평가 기록에서 에이전트가 발전하는 과정의 이전 모델 결과도 확인할 수 있습니다.</figcaption>
</figure>

### 평가 진행 과정

통제된 비교를 위해 지침, 지식, 도구, 테스트 사례, 채점 기준을 동일하게 유지합니다. 다른 항목이 변경되면 결과와 함께 기록하세요. 그렇지 않으면 모델이 개선된 것처럼 보이는 이유가 테스트 변경일 수 있고, 회귀처럼 보이는 현상에도 다른 원인이 있을 수 있습니다.

> Model Assessment에서 모델을 바꾸면 원본 에이전트에 해당 선택이 저장됩니다. Kit 테스트 경로에서는 에이전트도 게시됩니다. 사용자가 의존하는 에이전트를 변경하지 않도록 개발 또는 테스트 환경의 에이전트에서 모델 변경을 시도하세요.

평가는 즉시 끝나지 않습니다. 진행 패널에서 **초기화**, **평가 실행 중**(또는 **Kit 테스트 실행 중**), **결과 채점 중**, **AI 분석 생성 중** 단계를 확인할 수 있습니다. 에이전트가 테스트 사례에 답하는 중인지, 평가 분석을 준비하는 중인지 구분할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/08-assessment-progress.png' | relative_url }}" alt="초기화, 평가 실행, 채점, AI 분석 생성, 완료 단계를 보여 주는 Zava Kit Test Automation 평가 진행 상태" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>진행 패널에 현재 평가 단계가 표시됩니다. 패널을 닫아도 평가는 계속 실행됩니다.</figcaption>
</figure>

## 품질과 사용량을 함께 살펴보기

이 예시는 2026년 11월 16일에 완료된 Copilot Studio 평가 실행을 사용해 **GPT-6 Luna**와 **GPT-6.1 Sol**을 비교합니다. 두 모델은 모두 [Microsoft Copilot 하네스 모델 지침](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-agent-model-availability#model-lifecycle-summary)에 일반 공급으로 등록된 OpenAI 모델입니다. 이는 하나의 에이전트가 테스트에서 어떤 성능을 보이는지 평가하는 예시이지, 벤치마크나 일반적인 모델 순위가 아닙니다.

비교 작업 공간에는 결과가 나란히 표시됩니다. 같은 테스트 엔진을 사용하는 완료된 실행 두 건을 비교할 때 모델 권장 사항을 확인할 수 있습니다.

두 실행의 결과는 다음과 같습니다.

| 관찰 결과 | GPT-6 Luna | GPT-6.1 Sol |
|---|---:|---:|
| 실행 날짜 | 2026년 11월 16일 | 2026년 11월 16일 |
| 통과한 검사 | 14 | 12 |
| 실패한 검사 | 4 | 6 |
| 오류/제외 | 0 / 0 | 0 / 0 |
| 실행 평가 배지 | Critical | Critical |
| 공통 검사 통과율 | 77.8% | 66.7% |
| 보고된 평가 크레딧(추정) | 77.68 | 71.13 (일부만 보고됨) |
| 답변/채점 크레딧 | 64.87 / 12.81 | 58.29 / 12.84 |

이 실행에서 GPT-6 Luna는 검사를 두 개 더 통과했습니다. 앱은 공통 검사에서의 품질 차이, 즉 Luna가 통과하고 Sol이 실패한 검사가 두 개이며 반대 사례는 없다는 근거로 **GPT-6 Luna, 중간 신뢰도**를 권장합니다.

크레딧 수치는 별도로 해석해야 합니다. Sol의 보고 합계에는 **일부만 보고됨** 표시가 있으므로 더 낮은 수치가 전체적으로 더 저렴하다는 근거가 되지 않습니다. 불완전한 사용량 데이터를 절감 주장으로 바꾸지 마세요. 여기서 다음으로 할 일은 변경된 검사 두 개를 조사하는 것입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/03-model-comparison.png' | relative_url }}" alt="Luna 권장, 중간 신뢰도, 공통 검사 18개, Sol의 일부 크레딧 보고 표시를 보여 주는 GPT-6 Luna와 GPT-6.1 Sol 비교" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>권장 모델과 신뢰도, 절충점이 함께 표시됩니다. 두 실행 모두 Critical 평가 배지를 유지합니다.</figcaption>
</figure>

비교에는 별개의 대화 18개가 아니라 **공통 검사 18개**가 사용됩니다. 평가 테스트 사례 하나에 여러 채점 기준이 있을 수 있습니다. 공통 검사는 두 실행 모두 Pass 또는 Fail인 검사입니다. 누락, 오류, 제외 결과는 비교 가능한 통과로 처리되지 않습니다.

공통 검사 18개는 중간 신뢰도의 근거입니다. 해당 작업에 유용한 증거이지만 프로덕션을 결정하기 전 중요한 차이를 재현하지 않아도 될 만큼 충분하지는 않습니다.

이 권장 사항은 단순히 다른 모델의 의견이 아닙니다. 앱은 [판정과 신뢰도를 코드로 계산](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#63-recommend-model-from-assessment-comparison)합니다.

AI 프롬프트는 이유와 절충점을 설명합니다. [증거 기반 LLM 채점 패턴](https://microsoft.github.io/mcscatblog/posts/better-llm-scoring/)에서처럼 설명은 규칙을 검토할 수 있는 의사 결정을 보조합니다.

### 평가 사용량과 평가 분석 구분하기

표의 수치는 보고된 평가 요소 두 가지, 즉 에이전트가 테스트 사례에 응답하는 **답변**과 답변을 평가하는 **채점**을 합친 것입니다. Sol의 수치는 일부만 보고되었습니다. 어느 열도 평가 워크플로 전체의 총합이 아닙니다.

[실행별 크레딧 보고](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#52-copilot-credits)는 Microsoft Copilot 하네스 에이전트에 대해 Copilot Studio 평가가 반환한 사용량을 활용합니다. Kit 테스트는 Copilot Credits를 보고하지 않으며, 일부 사용량만 보고된 경우에는 별도 표시됩니다.

평가에서는 결과 분석을 위한 AI 프롬프트도 사용합니다. 제가 관찰한 AI 분석 실행에서는 테스트 사례를 실행하는 에이전트 사용량을 제외하고 평가당 약 **120–150 Copilot Credits**가 사용되었습니다. 이는 계획 수립을 위한 관찰 추정치이며 보고된 답변 및 채점 수치와는 별개입니다.

이 수치로 프로덕션 절감량을 예측할 수는 없습니다. 더 폭넓은 제어 방법은 [사용량 관리 글](https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/)을 참고하세요.

## AI 요약으로 결과 맥락 파악하기

검사 수는 통과한 항목의 개수를 알려 줍니다. **AI 요약**은 그 결과가 에이전트 작업에 어떤 의미인지 설명합니다.

실행 카드 아래의 **AI 요약**은 모델 권장 사항과 각 실행의 별도 분석을 보여 줍니다. [실행별 요약](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#46-compare-model-runs)은 합계를 넘어 **잘 작동하는 항목**에서 강점을, **주의가 필요한 항목**에서 우려를, **변경 사항**에서 개선 또는 회귀를 설명합니다. 해당하는 경우 **전체** 평가와 **증거의 한계**도 함께 제시합니다.

Zava Kit Test Automation의 요약에서는 Dataverse 도구 사용 작업이 강점인 반면 테스트와 에이전트 기능에 관한 일부 설명에서는 분류 검사가 계속 실패하는 점을 보여 줍니다. GPT-6.1 Sol 요약은 특정 테스트 세트의 테스트 목록을 반환하는 응답 품질 회귀와 테스트 실행 시작에 대한 키워드 검사 실패도 강조합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/07-ai-summary.png' | relative_url }}" alt="Zava Kit Test Automation의 GPT-6 Luna와 GPT-6.1 Sol별 AI 요약, 강점과 분류 우려, 회귀 검사 두 개 표시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>생성된 요약에서 지속적인 분류 실패와 변경된 검사 두 개 등 조사할 강점과 우려를 확인할 수 있습니다.</figcaption>
</figure>

이는 “검사 6개 실패”라는 막연한 결과보다 유용한 출발점입니다. 제작자는 에이전트가 계속 안정적으로 처리하는 작업과 더 자세히 살펴볼 답변 유형을 확인할 수 있습니다. 다만 생성된 문구는 기록된 결과와 대조해 검증하세요. 여기서 Luna 요약은 **Warning**이라고 표현하지만 실행 카드에는 **Critical**이 표시됩니다. 생성된 설명이 실행 상태를 덮어쓰지는 않습니다.

권장 사항은 선택한 두 실행을 비교하지만, 실행별 요약은 각 실행 자체의 평가와 기록된 기준선 비교를 설명한다는 차이가 있습니다. 선택한 쌍을 바꿔도 **변경 사항**이 그 두 실행의 새 비교 결과로 바뀌지는 않습니다.

요약은 어디를 살펴볼지 알려 줄 뿐 근본 원인을 밝히지는 않습니다. 이를 위해 개별 검사를 살펴보겠습니다.

## 가장 유용한 결과는 단 하나의 실패한 검사일 수 있습니다

요약에서 확인한 응답 품질 우려를 구체적인 예로 살펴보겠습니다. **테스트 실행** 화면에서는 테스트 세트별로 결과가 그룹화되고 각 지표가 나란히 표시됩니다. **회귀됨** 보기에서는 달라진 검사 두 개를 확인할 수 있습니다. 다음 요청부터 살펴보세요.

> Customer Support Case Agent 테스트 세트의 테스트를 보여 주세요.

이 요청의 **응답 품질** 검사는 GPT-6 Luna에서 통과하고 GPT-6.1 Sol에서 실패했습니다. 전체 비교에서는 **도구 및 기능 사용**이 두 실행에서 모두 통과했습니다. 이 차이는 조사 방향을 바꿉니다. 증거는 도구 사용 실패가 아니라 응답 품질 문제를 가리킵니다.

달라진 다른 검사는 “테스트 실행 시작”의 **필수 정보 포함 범위**입니다. 키워드 검사 실패만으로 에이전트가 실행을 시작하지 못했다고 단정할 수는 없습니다. 진단하기 전에 예상 문구와 응답을 확인하세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/05-regressed-check.png' | relative_url }}" alt="GPT-6 Luna에서는 통과했지만 GPT-6.1 Sol에서는 실패한 응답 품질 및 필수 정보 포함 범위 검사를 보여 주는 회귀 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>선택한 두 실행에서 달라진 검사 두 개가 추가 실패를 설명합니다. 각 행에는 테스트 사례의 보고된 크레딧도 표시됩니다.</figcaption>
</figure>

실패한 검사는 조사할 지점을 알려 줍니다. 테스트의 기대 결과와 평가 기준을 검토한 뒤 통제된 조건에서 시나리오를 다시 실행해 실패 원인을 파악하세요.

이제 한 모델이 덜 안정적이라는 인상 대신 재현할 가치가 있는 결과를 얻었습니다.

### 해당 작업의 사용량 확인하기

**테스트 실행** 보기에는 채점 결과와 테스트 세트 소계와 함께 테스트 사례별 보고된 **Copilot Credits**도 표시됩니다.

테스트 목록 요청에 보고된 사용량은 GPT-6 Luna가 **10.85 크레딧**, GPT-6.1 Sol이 **13.46 크레딧**입니다. 이 수치는 지표 행마다 별도로 부과되는 비용이 아니라 테스트 사례에 해당합니다. 응답 품질 결과와 함께 읽고 Sol의 실행 수준 사용량이 일부만 보고되었다는 점을 기억하세요. 완전한 비용 비교의 근거는 아닙니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/04-test-results.png' | relative_url }}" alt="Zava Kit Test Automation의 평가 결과와 테스트 사례별 Copilot Credits 및 테스트 세트 소계 비교" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>테스트 사례별 사용량을 통해 작업에 사용된 크레딧과 결과 품질을 함께 비교할 수 있습니다.</figcaption>
</figure>

## 권장 모델에도 해결되지 않은 문제가 있을 수 있습니다

비교 결과에는 중요한 세부 정보가 더 있습니다. **두 실행 모두 Critical입니다.**

**주의 필요** 보기에서는 선호 모델이 있다고 해서 조사가 끝난 것이 아닌 이유를 확인할 수 있습니다. 변경된 두 검사 외에도 두 실행에서 모두 실패한 Business Classification 검사가 네 개 있습니다. 이 검사에서는 테스트 실행 결과 해석, 테스트 세트 실행, 에이전트 기능 설명, 테스트 유형 설명을 확인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/06-needs-attention.png' | relative_url }}" alt="회귀 검사와 GPT-6 Luna 및 GPT-6.1 Sol 모두에서 실패한 Business Classification 검사를 보여 주는 주의 필요 필터" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>주의 필요 보기에서 더 넓은 실패 패턴을 확인할 수 있습니다. Pass에서 Fail로 바뀐 결과와 Fail이 계속된 결과는 서로 다른 조사가 필요합니다.</figcaption>
</figure>

**권장**은 두 실행 중 무엇을 선호하는지에 관한 상대적 질문에 답합니다. **Critical**은 실행의 실패 상태를 설명합니다. 두 실행이 모두 Critical인 것은 문서화된 [실행 상태 규칙](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#51-regression-status)의 실패 검사 임계값을 모두 넘었기 때문입니다.

GPT-6 Luna를 선택해도 기존 네 가지 실패가 해결되지는 않습니다. 기록된 증거를 토대로 분류 기준과 예상 레이블을 계속 확인해야 합니다. 에이전트를 수정해야 할 수도 있고 평가를 수정해야 할 수도 있으며 둘 다 손봐야 할 수도 있습니다.

Model Assessment는 [Agent Review Tool](https://microsoft.github.io/mcscatblog/posts/agent-review-tool/)을 보완합니다. Model Assessment는 여러 모델에서 테스트에 대한 에이전트 성능을 보여 줍니다. Agent Review Tool은 지침, Skill, 도구, 평가 범위의 구성 위험을 조사하도록 돕습니다. 런타임 실패 결과가 구성 검토의 출발점이 될 수 있습니다.

## 증거를 바탕으로 모델 결정하기

이 예시에서는 해당 작업에서 추가 조사할 후보로 GPT-6 Luna를 유지하고, 달라진 두 검사를 재현하며 지속되는 분류 실패를 검토하겠습니다. 비용을 근거로 판단하기 전에 일부만 보고된 사용량 문제도 해결하겠습니다. 권장 사항은 이러한 작업의 우선순위를 정하는 데 도움이 되지만, 에이전트가 완전히 정상이라는 보증은 아닙니다.

[PDF 내보내기](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#48-review-test-results-and-export)를 사용하면 비교 결과를 변경 검토자와 공유할 수 있습니다. 검토자는 아직 주의가 필요한 결과와 함께 권장 모델과 신뢰도를 살펴볼 수 있습니다.

Model Assessment는 [Microsoft Marketplace의 Copilot Agent Kit](https://marketplace.microsoft.com/en-us/product/dynamics-365/microsoftpowercatarch.copilotstudiokit2)에서 사용할 수 있습니다.

다음 모델을 바꾸기 전에 후보가 무엇을 더 잘해야 하고 무엇을 손상시키면 안 되는지 결정하세요. 그런 다음 평가로 그 기대를 확인하세요.

**새 모델을 에이전트에 적용할 때, 신뢰를 얻기 위해 반드시 성공해야 하는 작업은 무엇인가요?**
