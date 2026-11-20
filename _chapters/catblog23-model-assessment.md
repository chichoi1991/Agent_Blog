---
layout: "chapter"
date: 2026-11-12
title: "모델을 바꾸기 전에: Model Assessment로 Copilot Studio 에이전트 평가하기"
short_title: "Model Assessment"
description: "Model Assessment에서 Copilot Studio 에이전트를 여러 모델로 평가하고 공통 테스트 결과, 회귀, 보고된 Copilot 크레딧을 비교하는 방법."
order: 23
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/model-assessment/"
source_author: "patilravikiran"
source_published: "2026-11-12"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/model-assessment/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 patilravikiran(@patilravikiran) 원문 [Before you switch models: Assess your Copilot Studio agent with Model Assessment](https://microsoft.github.io/mcscatblog/posts/model-assessment/)(2026-11-12)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/header.png' | relative_url }}" alt="모델 기록, 품질 및 크레딧 비교와 개별 테스트 결과로 모델을 평가하고 비교하는 Model Assessment" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

에이전트 모델을 바꾸는 것은 클릭 몇 번이면 됩니다. 그 변경을 유지할 가치가 있는지 확인하려면 더 많은 노력이 필요합니다.

에이전트 모델 수명 주기 관리는 "한 번 설정하고 잊어버리는" 작업이 아닙니다. 선도적인 AI 연구소가 새 모델을 출시하면서 Copilot Studio에서 선택할 수 있는 모델도 계속 달라집니다. [Copilot Studio 에이전트 AI 모델 수명 주기 관리](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/plan-agent-model-lifecycle) 지침에 따라 정기적으로 변경 사항을 검토하고 에이전트 모델을 마이그레이션해야 하는지 결정해야 합니다. Model Assessment는 다른 모델에서 에이전트 성능을 테스트하고 현재 모델의 결과와 비교해 마이그레이션을 준비하도록 돕습니다.

다른 모델은 설명을 더 잘 작성하는 대신 도구 기반 답변의 세부 정보를 놓칠 수 있습니다. 같은 테스트를 통과하면서 크레딧을 더 사용할 수도 있습니다. 좋은 대화 몇 건만으로는 어떤 절충이 발생하는지 알기 어렵습니다.

[Copilot Agent Kit](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/kit-overview)의 일부인 **Model Assessment**는 에이전트 테스트를 사용해 이 결정을 평가하도록 돕습니다. 평가 기록, 나란히 비교하는 결과, 모델 추천 및 보고된 Copilot 크레딧을 한 작업 공간에 제공합니다.

질문은 어떤 모델이 전반적으로 가장 좋은지가 아닙니다. **사용자가 수행해야 하는 작업에서 이 에이전트에 더 잘 맞는 모델은 무엇인가?**입니다.

테스트 세트와 결과를 다루는 데모 에이전트인 **Zava Kit Test Automation**을 살펴보겠습니다. 이 에이전트의 평가는 모델 선택에 통과율 이상의 정보가 필요한 이유를 보여 줍니다.

## 좋은 대화만으로 모델을 선택할 수 없는 이유

사용자가 의존하는 작업을 테스트해야 합니다. 지원 에이전트라면 올바른 문제 해결 지침을 찾는 것이고 온보딩 에이전트라면 정책 질문에 정확히 답하는 것일 수 있습니다. 모델 변경은 다른 작업을 깨뜨리지 않으면서 해당 작업을 개선할 때만 가치가 있습니다.

Model Assessment는 Microsoft Copilot 하네스 에이전트와 **Standard harness** 에이전트를 모두 지원하며 [두 가지 테스트 경로](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#33-make-an-agent-eligible)를 제공합니다.

**Copilot Studio 평가**는 두 하네스 모두 지원합니다. 평가 테스트 세트를 만들고 이름에 `MODELCHECK`를 포함하며 활성 상태로 유지합니다. 이 평가는 저장된 초안을 평가합니다.

대안인 **Copilot Agent Kit 테스트 자동화**는 현재 Standard harness 에이전트만 지원합니다. 파이프라인을 사용할 수 있는 **Agent Configuration**과 Kit 테스트 세트를 구성합니다. Kit 테스트는 게시된 에이전트를 평가합니다.

[설정 가이드](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#2-prerequisites)에는 필요한 역할, 연결, 흐름 및 용량이 안내되어 있습니다.

시작점은 [기준선 평가](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#43-capture-a-baseline)입니다. 이후 평가를 통해 모델 변경 후 기억이나 자주 사용하는 프롬프트 몇 개에 의존하지 않고 구체적으로 비교할 수 있습니다.

Model Assessment는 **Copilot Agent Kit**의 **Advanced Testing** 아래에 있습니다. 개요 화면에서는 이전 모델과 현재 모델을 비교하고 각 에이전트의 최신 평가 상태를 확인해 조사해야 할 에이전트를 쉽게 찾을 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/01-zava-agents.png' | relative_url }}" alt="GPT-6 Luna 및 GPT-6.1 Sol, 평가 상태와 최신 결과가 표시된 Model Assessment의 Zava Kit Test Automation 필터" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>모델 변경과 에이전트의 최신 평가 결과를 연결하는 개요.</figcaption>
</figure>

개별 에이전트의 **Model history**에는 실행 날짜, 결과 및 사용 가능한 경우 보고된 크레딧을 포함한 이전 평가가 보존됩니다. 최신 실행뿐 아니라 과거 평가도 다시 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/02-model-history.png' | relative_url }}" alt="모델 선택기에서 GPT-6.1 Sol을 선택하고 GPT-6 Luna에서 실행한 최신 모델 기록 항목을 보여 주는 Zava Kit Test Automation" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>에이전트가 발전하는 동안 이전 평가 결과를 계속 확인할 수 있습니다.</figcaption>
</figure>

### 평가 중 진행되는 작업

통제된 비교를 하려면 지침, 지식, 도구, 테스트 사례 및 채점 기준을 동일하게 유지해야 합니다. 다른 항목이 바뀌면 결과와 함께 기록합니다. 그렇지 않으면 모델 개선처럼 보이는 것이 테스트 변경일 수 있고 회귀처럼 보이는 결과에도 다른 설명이 있을 수 있습니다.

> Model Assessment에서 모델을 바꾸면 해당 선택이 원본 에이전트에 저장됩니다. Kit 테스트 경로에서는 에이전트도 게시됩니다. 사용자가 의존하는 에이전트를 바꾸지 않도록 개발 또는 테스트 환경의 에이전트에서 모델 변경을 시도하세요.

평가는 즉시 끝나지 않습니다. 진행 패널에서 **Initializing**, **Running evaluations**(또는 **Running Kit tests**), **Scoring results**, **Generating AI analysis** 단계가 표시됩니다. 에이전트가 테스트 사례에 답변하는 중인지 분석을 준비하는 중인지 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/08-assessment-progress.png' | relative_url }}" alt="Zava Kit Test Automation의 초기화, 평가 실행, 점수 계산, AI 분석 생성 및 완료 단계가 표시된 평가 진행 패널" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>진행 패널에 현재 평가 단계가 표시됩니다. 패널을 닫아도 평가 실행은 계속됩니다.</figcaption>
</figure>

## 품질과 사용량은 함께 검토해야 합니다

이 예제에서는 2026년 11월 16일에 완료된 Copilot Studio 평가 실행을 사용해 **GPT-6 Luna**와 **GPT-6.1 Sol**을 비교합니다. 두 모델은 [Microsoft Copilot 하네스 모델 지침](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-agent-model-availability#model-lifecycle-summary)에 일반 공급으로 표시된 OpenAI 모델입니다. 이 예제는 하나의 에이전트를 테스트로 평가하는 데모이지 모델의 벤치마크나 일반 순위가 아닙니다.

비교 작업 공간에는 결과가 나란히 표시됩니다. 모델 추천은 동일한 테스트 엔진을 사용한 완료 실행이 정확히 두 개 있을 때 제공됩니다.

두 실행의 결과는 다음과 같습니다.

| 관찰 결과 | GPT-6 Luna | GPT-6.1 Sol |
|---|---:|---:|
| 실행 날짜 | 2026년 11월 16일 | 2026년 11월 16일 |
| 통과한 검사 | 14 | 12 |
| 실패한 검사 | 4 | 6 |
| 오류 / 제외 | 0 / 0 | 0 / 0 |
| 실행 평가 배지 | Critical | Critical |
| 공통 검사 통과율 | 77.8% | 66.7% |
| 보고된 평가 크레딧(추정) | 77.68 | 71.13 (부분) |
| 응답 / 채점 크레딧 | 64.87 / 12.81 | 58.29 / 12.84 |

이 실행에서 GPT-6 Luna는 검사를 두 개 더 통과했습니다. 앱은 공통 검사 품질 차이( Luna는 통과, Sol은 실패한 검사가 두 개이며 반대 결과는 없음)를 바탕으로 **GPT-6 Luna, Medium confidence**를 추천합니다.

크레딧 수치는 별도로 해석해야 합니다. Sol의 보고된 합계는 **부분**으로 표시되어 있으므로 더 적은 수치가 전체적으로 더 저렴하다는 근거가 되지 않습니다. 불완전한 소비량 데이터로 절약을 주장하지 마세요. 여기서 유용한 다음 단계는 변경된 검사 두 개를 조사하는 것입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/03-model-comparison.png' | relative_url }}" alt="Luna 추천, Medium confidence, 공통 검사 18개, Sol의 부분 크레딧 표시를 포함한 GPT-6 Luna와 GPT-6.1 Sol 결과 비교" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>추천 모델과 비교에 대한 신뢰도 및 절충 사항. 두 실행 모두 Critical 평가 배지를 표시합니다.</figcaption>
</figure>

비교에는 별도의 대화 18개가 아니라 **공통 검사 18개**가 사용됩니다. 평가 테스트 사례 하나에 채점 지표가 여러 개 포함될 수 있습니다. 공통 검사란 두 실행에서 모두 Pass 또는 Fail인 검사입니다. 누락, 오류 및 제외 결과는 비교 가능한 통과로 취급되지 않습니다.

공통 검사 18개는 Medium confidence가 의미하는 바를 설명합니다. 해당 작업에 유용한 근거이지만 프로덕션 결정을 내리기 전에 중요한 차이를 재현하는 단계를 건너뛸 만큼 충분하지는 않습니다.

추천은 단순히 다른 모델의 의견을 전달하는 것이 아닙니다. [앱 코드에서 판정과 신뢰도를 계산합니다](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#63-recommend-model-from-assessment-comparison). AI 프롬프트는 이유와 절충 사항을 설명합니다. [근거 기반 LLM 점수 계산 패턴](https://microsoft.github.io/mcscatblog/posts/better-llm-scoring/)과 마찬가지로 설명은 규칙을 검사할 수 있는 결정을 지원합니다.

### 평가 소비량과 평가 분석 분리

표의 수치는 보고된 평가 구성 요소 두 가지, 즉 에이전트가 테스트 사례에 답하는 **응답**과 답변을 평가하는 **채점**을 합친 것입니다. 부분 플래그가 나타내듯 Sol의 수치는 불완전합니다. 어느 열도 평가 워크플로 전체 합계는 아닙니다.

[실행별 크레딧 보고](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#52-copilot-credits)는 Microsoft Copilot 하네스로 구동되는 에이전트의 Copilot Studio 평가가 반환한 소비량을 사용합니다. Kit 테스트는 Copilot 크레딧을 보고하지 않으며 부분 소비량은 별도로 표시됩니다.

평가는 AI 프롬프트로 결과를 분석하기도 합니다. 관찰한 AI 분석 실행에서 테스트 사례 실행에 든 에이전트 소비량을 제외한 분석 처리에 평가당 약 **120~150 Copilot 크레딧**이 사용되었습니다. 이는 계획용으로 관찰된 추정치이며 보고된 응답 및 채점 수치와 별개입니다.

이 수치로 프로덕션 절약량을 예측할 수는 없습니다. 더 폭넓은 제어 방법은 [소비량 거버넌스 글](https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/)에서 다룹니다.

## AI 요약으로 결과 맥락 파악

검사 수는 몇 개가 통과했는지 알려 줍니다. **AI summary**는 그 결과가 에이전트의 작업에서 어떤 의미인지 설명하는 데 도움을 줍니다.

실행 카드 아래의 **AI summary**에는 모델 추천과 각 실행에 대한 개별 분석이 표시됩니다. [실행별 요약](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#46-compare-model-runs)은 합계를 넘어 **Works well**에 강점, **Needs attention**에 우려 사항, **What changed**에 개선이나 회귀를 표시합니다. 해당하는 경우 **Overall** 평가와 **Evidence limits**를 통해 결과를 맥락에 맞게 해석할 수 있습니다.

Zava Kit Test Automation의 요약에서는 Dataverse 도구 사용 작업이 강점인 반면 테스트와 에이전트 기능을 설명하는 일부 응답은 분류 검사에서 계속 실패하는 차이를 보여 줍니다. GPT-6.1 Sol 요약은 특정 테스트 세트의 테스트 목록 응답 품질 회귀와 테스트 실행 시작에 대한 키워드 검사 실패도 강조합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/07-ai-summary.png' | relative_url }}" alt="Zava Kit Test Automation의 GPT-6 Luna 및 GPT-6.1 Sol 실행별 AI 요약과 강점, 분류 우려 사항, 회귀 검사 두 건" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>생성된 요약은 지속되는 분류 실패와 변경된 두 검사를 포함해 조사할 강점과 우려 사항을 보여 줍니다.</figcaption>
</figure>

"검사 여섯 개가 실패했다"는 일반적인 설명보다 더 유용한 출발점입니다. 메이커는 에이전트가 어떤 작업에 계속 신뢰할 만한지, 어떤 답변을 더 살펴봐야 하는지 확인할 수 있습니다. 다만 생성된 문구를 기록된 결과와 대조해야 합니다. 여기서 Luna의 요약은 **Warning**이라고 하지만 실행 카드에는 **Critical**이 표시됩니다. 생성된 설명이 실행 상태를 덮어쓰지는 않습니다.

추천은 선택한 두 실행을 비교하지만 각 실행의 요약은 자체 평가 및 기록된 기준선 비교를 설명한다는 점도 기억해야 합니다. 비교 대상을 바꿔도 **What changed**가 해당 두 실행의 새로운 비교로 바뀌지는 않습니다.

요약은 어디를 살펴볼지 알려 주지만 근본 원인을 입증하지는 않습니다. 이를 확인하려면 개별 검사를 살펴봐야 합니다.

## 가장 유용한 결과는 실패한 검사 하나일 수 있습니다

요약에서 언급된 응답 품질 우려를 구체적인 예로 살펴보겠습니다. **Test runs**에서는 테스트 세트별로 결과가 그룹화되고 지표가 나란히 표시됩니다. **Regressed** 보기에는 변경된 검사 두 개가 나타납니다. 다음 요청부터 시작합니다.

> Customer Support Case Agent 테스트 세트의 테스트를 보여 주세요.

**Response Quality** 검사는 GPT-6 Luna에서 통과했지만 GPT-6.1 Sol에서는 실패했습니다. 전체 비교에서는 **Tool and Capability Use**가 두 실행 모두 통과한 것으로 나타납니다. 이 차이가 조사 방향을 바꿉니다. 근거는 도구 사용 실패가 아니라 응답 품질 문제를 가리킵니다.

다른 변경 검사 하나는 "테스트 실행 시작"에 대한 **Required Information Coverage**입니다. 키워드 검사 실패만으로 에이전트가 실행을 시작하지 못했다고 단정할 수는 없습니다. 진단하기 전에 예상 문구와 응답을 확인하세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/05-regressed-check.png' | relative_url }}" alt="GPT-6 Luna에서 Pass, GPT-6.1 Sol에서 Fail로 변경된 Response Quality 및 Required Information Coverage 검사" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>선택한 두 실행에서 변경된 결과가 추가 실패를 설명합니다. 각 행에는 테스트 사례별 보고 크레딧이 유지됩니다.</figcaption>
</figure>

실패한 검사는 조사할 지점을 알려 줍니다. 테스트의 기대 결과와 평가 기준을 검토한 뒤 통제된 조건에서 시나리오를 다시 실행해 실패 원인을 확인합니다.

이제 한 모델이 덜 안정적이라는 일반적인 인상 대신 재현해 볼 결과가 생겼습니다.

### 해당 작업의 소비량 확인

**Test runs** 보기에서는 채점 결과 및 테스트 세트 소계와 함께 **테스트 사례별 Copilot 크레딧**도 보여 줍니다.

테스트 목록 요청에 보고된 소비량은 GPT-6 Luna **10.85 크레딧**, GPT-6.1 Sol **13.46 크레딧**입니다. 이 수치는 각 지표 행에 따로 부과된 비용이 아니라 테스트 사례에 해당합니다. 응답 품질 결과와 함께 읽고 Sol의 실행 수준 소비량이 부분적이라는 경고도 고려해야 합니다. 전체 비용 비교의 근거로 삼을 수는 없습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/04-test-results.png' | relative_url }}" alt="테스트 사례별 Copilot 크레딧과 테스트 세트 소계를 포함한 Zava Kit Test Automation 평가 결과 비교" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>테스트 사례 소비량은 실행 합계에 세부 정보를 더합니다. 메이커는 작업별 크레딧과 결과 품질을 비교할 수 있습니다.</figcaption>
</figure>

## 추천 모델에 해결되지 않은 문제가 남아 있을 수 있습니다

비교 결과에서 또 하나 중요한 점은 **두 실행 모두 Critical**이라는 것입니다.

**Needs attention** 보기는 선호 모델이 있다고 조사가 끝난 것이 아님을 보여 줍니다. 변경된 두 검사 외에도 Business Classification 검사 네 개가 두 실행에서 모두 실패합니다. 테스트 실행 결과 해석, 테스트 세트 실행, 에이전트 기능 설명 및 테스트 유형 설명에 관한 검사입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/06-needs-attention.png' | relative_url }}" alt="회귀 검사와 두 실행에서 모두 실패한 Business Classification 검사를 표시하는 GPT-6 Luna 및 GPT-6.1 Sol Needs attention 필터" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Needs attention은 더 폭넓은 실패 패턴을 보여 줍니다. Pass에서 Fail로 바뀐 결과와 Fail이 유지된 결과는 각각 다르게 조사해야 합니다.</figcaption>
</figure>

**Recommended**는 두 실행 중 무엇을 선호하는지에 대한 상대적 질문에 답합니다. **Critical**은 실행의 실패 상태를 설명합니다. 두 실행 모두 문서화된 [실행 상태 규칙](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#51-regression-status)의 실패 검사 임계값을 초과합니다.

GPT-6 Luna를 선택해도 해당 검사 네 개가 해결되지는 않습니다. 분류 기준 및 예상 레이블을 저장된 근거와 대조해야 합니다. 에이전트를 수정해야 할 수도 있고 평가를 수정해야 할 수도 있으며 둘 다 필요할 수도 있습니다.

Model Assessment는 [Agent Review Tool](https://microsoft.github.io/mcscatblog/posts/agent-review-tool/)을 보완합니다. Model Assessment는 모델별 테스트에서 에이전트가 어떻게 동작했는지 보여 줍니다. Agent Review Tool은 지침, 스킬, 도구 및 평가 범위의 구성 위험을 조사하도록 돕습니다. 런타임 실패는 구성 검토의 출발점이 될 수 있습니다.

## 근거를 바탕으로 모델 결정

이 예제에서는 해당 작업에서 GPT-6 Luna를 추가 조사할 후보로 유지하고 변경된 검사 두 개를 재현하며 지속되는 분류 실패를 검토하겠습니다. 비용에 근거한 결정을 내리기 전에 부분 소비량 보고도 해결하겠습니다. 추천은 조사 우선순위를 정하는 데 도움이 되지만 모든 문제가 해결됐다는 보증은 아닙니다.

[PDF 내보내기](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#48-review-test-results-and-export)를 사용하면 변경 사항을 검토하는 사람과 비교 결과를 공유할 수 있습니다. 이들은 여전히 주의가 필요한 결과와 함께 추천 및 신뢰도를 검토할 수 있습니다.

Model Assessment는 [Microsoft Marketplace의 Copilot Agent Kit](https://marketplace.microsoft.com/en-us/product/dynamics-365/microsoftpowercatarch.copilotstudiokit2)에서 사용할 수 있습니다.

다음 모델 변경을 하기 전에 후보 모델이 무엇을 더 잘해야 하고 무엇을 깨뜨리면 안 되는지 결정하세요. 그런 다음 평가로 그 기대를 테스트하세요.

**에이전트에 새 모델을 적용할 때 신뢰하기 전에 반드시 올바르게 수행하길 원하는 작업은 무엇인가요?**
