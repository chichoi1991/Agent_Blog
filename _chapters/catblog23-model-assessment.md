---
layout: "chapter"
title: "모델을 바꾸기 전에 Copilot Studio 에이전트를 Model Assessment로 평가하기"
short_title: "Model Assessment"
description: "Copilot Studio Model Assessment로 모델별 평가를 비교하고 회귀를 조사하며 보고된 Copilot Credits를 고려하는 방법"
order: 23
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/model-assessment/"
source_author: "patilravikiran"
source_published: "2026-11-12"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/model-assessment/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/) (Microsoft Copilot Studio CAT)의 patilravikiran(@patilravikiran) 원문 [Before you switch models: Assess your Copilot Studio agent with Model Assessment](https://microsoft.github.io/mcscatblog/posts/model-assessment/)(2026-11-12)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/header.png' | relative_url }}" alt="모델 변경 전 평가를 위해 모델 기록, 품질 및 크레딧 비교, 개별 테스트 결과를 활용하는 Model Assessment" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

에이전트 모델을 몇 번 클릭만으로 바꿀 수는 있지만, 변경을 유지할 가치가 있는지 확인하려면 더 많은 작업이 필요합니다.

에이전트 모델 수명 주기 관리는 "한 번 설정하고 잊어버리는" 작업이 아닙니다. 프런티어 연구소에서 새 모델을 출시할 때마다 Copilot Studio에서 선택 가능한 모델도 바뀝니다. [Copilot Studio 에이전트의 AI 모델 수명 주기 관리](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/plan-agent-model-lifecycle)의 지침에 따라 변경 사항을 정기적으로 검토하고 에이전트 모델을 마이그레이션해야 하는지 결정해야 합니다. Model Assessment는 다른 모델에서 에이전트를 테스트하고 결과를 현재 모델과 비교해 마이그레이션을 준비하도록 돕습니다.

다른 모델은 설명을 더 잘 작성하면서 도구를 사용하는 답변에서 세부 사항을 놓칠 수 있습니다. 같은 테스트를 통과하면서 크레딧을 더 사용할 수도 있습니다. 대화 몇 건만으로는 어떤 절충을 하는지 알 수 없습니다.

[Copilot Agent Kit](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/kit-overview)의 일부인 **Model Assessment**는 에이전트 테스트를 활용해 이 결정을 평가할 수 있도록 합니다. 평가 기록, 나란히 비교하는 결과, 모델 추천, 보고된 Copilot Credits를 하나의 작업 공간에 모읍니다.

핵심 질문은 일반적으로 어떤 모델이 최고인지가 아닙니다. **이 에이전트에서 사용자가 필요로 하는 작업을 어느 모델이 더 잘 수행하는가?**

테스트 세트와 결과를 다루는 데모 에이전트 **Zava Kit Test Automation**을 살펴보겠습니다. 평가 결과는 통과율만으로 모델을 선택해서는 안 되는 이유를 보여 줍니다.

## 좋은 대화만으로 모델을 선택할 수 없음

사용자가 의존하는 작업을 테스트해야 합니다. 지원 에이전트라면 올바른 문제 해결 지침을 찾는 것일 수 있고, 온보딩 에이전트라면 정책 질문에 정확히 답하는 것일 수 있습니다. 모델 변경은 다른 작업을 손상하지 않으면서 그러한 작업을 개선할 때 의미가 있습니다.

Model Assessment는 **Microsoft Copilot 하네스**와 **Standard 하네스** 에이전트를 모두 지원하며, [두 가지 테스트 경로](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#33-make-an-agent-eligible)를 제공합니다.

**Copilot Studio 평가**는 두 하네스를 모두 지원합니다. 평가 테스트 세트를 만들고 이름에 `MODELCHECK`를 포함하며 활성 상태로 둡니다. 이 평가는 저장된 초안을 평가합니다.

**Copilot Agent Kit 테스트 자동화**는 현재 Standard 하네스 에이전트만 지원하며 Copilot Studio 평가의 대안으로 사용할 수 있습니다. 파이프라인이 활성화된 **Agent Configuration**과 Kit 테스트 세트를 구성합니다. Kit 테스트는 게시된 에이전트를 평가합니다.

필요한 역할, 연결, 흐름, 용량은 [설정 가이드](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#2-prerequisites)를 참고합니다.

시작점은 [기준 평가](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#43-capture-a-baseline)입니다. 이후 평가를 통해 모델 변경 후 기억이나 자주 사용하는 프롬프트 몇 개에 의존하지 않고 구체적인 비교를 할 수 있습니다.

Model Assessment는 **Copilot Agent Kit**의 **Advanced Testing** 아래에 있습니다. 개요 화면에서 각 에이전트의 최신 평가 상태와 이전·현재 모델을 함께 볼 수 있어 조사가 필요한 에이전트를 쉽게 찾을 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/01-zava-agents.png' | relative_url }}" alt="GPT-6 Luna와 GPT-6.1 Sol, 평가 상태, 최신 결과를 보여주는 Zava Kit Test Automation으로 필터링된 Model Assessment" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>모델 변경과 에이전트 최신 평가 결과를 연결하는 개요</figcaption>
</figure>

개별 에이전트의 **Model history**에는 실행 날짜, 결과, 제공되는 경우 보고된 크레딧을 포함해 이전 평가가 보존됩니다. 최신 실행뿐 아니라 이전 평가도 다시 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/02-model-history.png' | relative_url }}" alt="모델 선택기에서 GPT-6.1 Sol을 선택하고 GPT-6 Luna의 최신 모델 기록 항목을 보여주는 Zava Kit Test Automation" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>에이전트가 발전하는 동안 이전 모델 결과도 평가 기록에 남습니다.</figcaption>
</figure>

### 평가 중 진행 과정

통제된 비교를 위해 지침, 지식, 도구, 테스트 사례, 평가 기준을 동일하게 유지해야 합니다. 다른 항목을 변경했다면 결과와 함께 기록합니다. 그렇지 않으면 모델 개선처럼 보이는 것이 실제로는 테스트 변경일 수 있고, 회귀처럼 보이는 현상에도 다른 원인이 있을 수 있습니다.

> Model Assessment에서 모델을 바꾸면 해당 선택이 원본 에이전트에 저장됩니다. Kit 테스트 경로에서는 에이전트도 게시됩니다. 사용자가 의존하는 에이전트를 바꾸지 않도록 개발 또는 테스트 환경의 에이전트에서 모델 변경을 시도하세요.

평가는 즉시 끝나지 않습니다. 진행 패널에서 **Initializing**, **Running evaluations**(또는 **Running Kit tests**), **Scoring results**, **Generating AI analysis** 단계가 차례로 표시됩니다. 따라서 에이전트가 테스트 사례에 답하는 중인지, 분석을 준비 중인지 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/08-assessment-progress.png' | relative_url }}" alt="초기화, 평가 실행, 결과 채점, AI 분석 생성, 완료 단계를 보여주는 Zava Kit Test Automation의 평가 진행 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>진행 패널에 현재 평가 단계가 표시됩니다. 패널을 닫아도 평가는 계속 실행됩니다.</figcaption>
</figure>

## 품질과 사용량을 함께 살펴보기

예제에서는 2026년 11월 16일 완료된 Copilot Studio 평가 실행을 사용해 **GPT-6 Luna**와 **GPT-6.1 Sol**을 비교합니다. 두 모델은 모두 [Microsoft Copilot 하네스 모델 지침](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-agent-model-availability#model-lifecycle-summary)에 일반 공급으로 표시된 OpenAI 모델입니다. 이는 한 에이전트의 테스트 결과를 평가하는 예이지, 모델 벤치마크나 일반적인 순위가 아닙니다.

비교 작업 공간에서 결과를 나란히 볼 수 있습니다. 모델 추천은 동일한 테스트 엔진을 사용하는 완료된 실행 두 건이 있을 때 제공됩니다.

| 관찰 결과 | GPT-6 Luna | GPT-6.1 Sol |
|---|---:|---:|
| 실행 날짜 | 2026년 11월 16일 | 2026년 11월 16일 |
| 통과한 검사 | 14 | 12 |
| 실패한 검사 | 4 | 6 |
| 오류 / 제외 | 0 / 0 | 0 / 0 |
| 실행 평가 배지 | Critical | Critical |
| 공통 검사 통과율 | 77.8% | 66.7% |
| 보고된 평가 크레딧 (추정) | 77.68 | 71.13 (부분) |
| 응답 생성 / 채점 크레딧 | 64.87 / 12.81 | 58.29 / 12.84 |

이 실행에서 GPT-6 Luna는 검사를 두 개 더 통과했습니다. 앱은 공통 검사에서의 품질 차이, 즉 Luna가 통과하고 Sol이 실패한 두 항목과 반대 결과가 없는 점을 근거로 **GPT-6 Luna, Medium confidence**를 추천합니다.

크레딧 수치는 별도로 해석해야 합니다. Sol의 보고 합계에는 **partial** 표시가 있으므로 더 낮은 수치가 전체 비용이 낮다는 것을 의미하지 않습니다. 불완전한 사용량 데이터를 절감 근거로 삼아서는 안 됩니다. 여기서 다음으로 할 일은 변경된 검사 두 항목을 조사하는 것입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/03-model-comparison.png' | relative_url }}" alt="Luna 추천, Medium confidence, 공통 검사 18개, Sol의 부분 크레딧 표시가 포함된 GPT-6 Luna와 GPT-6.1 Sol 결과 비교" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>추천 모델과 신뢰도 및 절충점을 보여주는 비교 화면. 두 실행 모두 Critical 평가 배지로 표시됩니다.</figcaption>
</figure>

비교 대상은 대화 18건이 아니라 **공통 검사 18개**입니다. 평가 테스트 사례 하나에 채점된 지표가 여러 개 포함될 수 있습니다. 두 실행에서 모두 Pass 또는 Fail인 검사만 공통 검사에 포함합니다. 누락, 오류, 제외 결과는 비교 가능한 통과로 보지 않습니다.

공통 검사 18개는 Medium confidence를 설명합니다. 해당 작업에 유용한 근거는 있지만 프로덕션을 결정하기 전 중요한 차이를 재현하는 단계를 건너뛸 만큼 충분하지는 않습니다.

추천은 다른 모델의 단순한 의견이 아닙니다. 앱이 [평결과 신뢰도를 코드로 계산](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#63-recommend-model-from-assessment-comparison)합니다. AI 프롬프트는 이유와 절충점을 설명합니다. [근거 기반 LLM 채점 패턴](https://microsoft.github.io/mcscatblog/posts/better-llm-scoring/)과 마찬가지로, 규칙을 확인할 수 있는 결정을 설명으로 뒷받침합니다.

### 평가 사용량과 평가 분석 분리

표의 수치에는 보고된 평가 구성 요소 두 가지가 포함됩니다. **응답 생성**은 에이전트가 테스트 사례에 답하는 과정이고, **채점**은 응답을 평가하는 과정입니다. partial 표시가 보여 주듯 Sol 수치는 불완전합니다. 어느 열도 평가 워크플로 전체 합계는 아닙니다.

[실행별 크레딧 보고](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#52-copilot-credits)는 Microsoft Copilot 하네스로 구동되는 에이전트의 Copilot Studio 평가에서 반환한 사용량을 사용합니다. Kit 테스트는 Copilot Credits를 보고하지 않으며, 부분 사용량은 별도로 표시됩니다.

평가에서는 결과 분석을 위한 AI 프롬프트도 사용합니다. 관찰한 AI 분석 실행에서 테스트 사례 실행에 사용된 에이전트 크레딧을 제외하고 평가당 약 **120–150 Copilot Credits**가 소비됐습니다. 이는 계획 수립을 위한 관찰 추정치이며 보고된 응답 생성 및 채점 수치와 별개입니다.

이 수치로 프로덕션 비용 절감을 예측할 수는 없습니다. 더 폭넓은 제어 방법은 [소비량 거버넌스 글](https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/)을 참고하세요.

## AI 요약으로 결과 맥락 파악

통과한 검사 수는 수량을 알려 줍니다. **AI summary**는 그 결과가 에이전트 작업에 어떤 의미인지 설명하는 데 도움을 줍니다.

실행 카드 아래의 **AI summary**에는 모델 추천과 각 실행에 대한 별도 분석이 표시됩니다. [실행별 요약](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#46-compare-model-runs)은 총계 이상을 설명합니다. **Works well**은 강점, **Needs attention**은 우려 사항, **What changed**는 개선 또는 회귀를 짚습니다. **Overall** 평가와 해당하는 경우 **Evidence limits**도 결과 맥락에 도움이 됩니다.

Zava Kit Test Automation의 요약은 유용한 대조를 보여 줍니다. Dataverse 도구 사용 작업은 강점이지만 테스트와 에이전트 기능에 관한 일부 설명은 여전히 분류 검사를 통과하지 못합니다. GPT-6.1 Sol 요약은 특정 테스트 세트에서 테스트를 나열할 때의 응답 품질 회귀와 테스트 실행 시작에 대한 키워드 검사 실패도 강조합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/07-ai-summary.png' | relative_url }}" alt="Zava Kit Test Automation의 GPT-6 Luna 및 GPT-6.1 Sol 실행별 AI 요약으로 강점, 분류 관련 문제, 회귀 검사 두 건을 보여주는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>생성된 요약이 지속되는 분류 검사 실패와 변경된 두 검사를 포함해 조사할 강점과 우려 사항을 드러냅니다.</figcaption>
</figure>

"검사 6개가 실패했다"는 말보다 더 유용한 시작점입니다. 제작자는 에이전트가 여전히 안정적으로 수행하는 영역과 자세히 살펴볼 답변을 확인할 수 있습니다. 다만 생성된 문구는 기록된 결과와 대조해 검증해야 합니다. 여기서 Luna의 요약은 **Warning**이라고 하지만 실행 카드에는 **Critical**이 표시됩니다. 생성된 설명이 실행 상태를 덮어쓰지는 않습니다.

추천은 선택한 두 실행을 비교하지만, 각 실행 요약은 해당 평가와 기록된 기준 비교를 설명합니다. 선택한 쌍을 바꾼다고 **What changed**가 그 두 실행의 새로운 비교로 바뀌지는 않습니다.

요약은 어디를 살펴볼지 알려 줄 뿐 근본 원인을 밝히지는 않습니다. 이를 확인하려면 개별 검사를 살펴봐야 합니다.

## 가장 유용한 결과는 실패한 검사 하나일 수 있음

요약에서 지적한 응답 품질 문제는 구체적인 사례로 확인할 수 있습니다. **Test runs**에서 결과는 테스트 세트별로 그룹화되고 각 지표는 나란히 표시됩니다. **Regressed** 보기에는 변경된 검사 두 개가 표시됩니다. 다음 요청부터 살펴봅니다.

> Show the tests in the Customer Support Case Agent test set.

**Response Quality** 검사는 GPT-6 Luna에서 통과하고 GPT-6.1 Sol에서 실패했습니다. 전체 비교를 보면 **Tool and Capability Use**는 두 실행 모두 통과했습니다. 이 차이는 조사의 방향을 바꿉니다. 근거가 가리키는 것은 응답 품질 문제이지 도구 사용 실패가 아닙니다.

다른 변경 항목은 "Start a test run." 요청의 **Required Information Coverage**입니다. 키워드 검사 실패만으로 에이전트가 테스트 실행을 시작하지 못했다고 단정할 수 없습니다. 결론을 내리기 전에 기대 문구와 응답을 확인해야 합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/05-regressed-check.png' | relative_url }}" alt="GPT-6 Luna의 Pass에서 GPT-6.1 Sol의 Fail로 변경된 Response Quality 및 Required Information Coverage 검사를 보여주는 Regressed 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>선택한 두 실행에서 달라진 검사가 추가 실패를 설명합니다. 행에 테스트 사례별 보고 크레딧도 표시됩니다.</figcaption>
</figure>

실패한 검사는 조사가 필요한 위치를 알려 줍니다. 테스트의 기대 결과와 평가 기준을 검토한 뒤 통제된 조건에서 시나리오를 다시 실행해 실패 원인을 확인합니다.

이제 한 모델이 덜 안정적이라는 막연한 인상 대신 재현해 볼 결과가 생겼습니다.

### 해당 작업의 사용량 확인

**Test runs** 보기에서는 채점 결과와 테스트 세트 소계뿐만 아니라 테스트 사례별 보고 **Copilot Credits**도 확인할 수 있습니다.

테스트 나열 요청의 보고 사용량은 GPT-6 Luna에서 **10.85 크레딧**, GPT-6.1 Sol에서 **13.46 크레딧**입니다. 이 수치는 각 지표 행에 따로 부과된 크레딧이 아니라 테스트 사례 하나의 사용량입니다. Response Quality 결과와 함께 확인하고 Sol 실행의 사용량이 부분적이라는 경고도 고려해야 합니다. 완전한 비용 비교를 입증하지는 않습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/04-test-results.png' | relative_url }}" alt="테스트 사례별 Copilot Credits와 테스트 세트 소계가 포함된 Zava Kit Test Automation의 평가 결과 비교" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>테스트 사례별 사용량을 통해 실행 총계에 세부 맥락을 더하고 작업의 크레딧과 결과 품질을 비교할 수 있습니다.</figcaption>
</figure>

## 추천 모델에도 해결되지 않은 문제가 있을 수 있음

비교에서 중요한 점이 또 있습니다. **두 실행 모두 Critical**입니다.

**Needs attention** 보기는 선호 모델이 조사 종료를 뜻하지 않는 이유를 보여 줍니다. 변경된 두 검사 외에 두 실행 모두에서 실패한 Business Classification 검사 네 개가 있습니다. 테스트 실행 결과 해석, 테스트 세트 실행, 에이전트 기능 설명, 테스트 형식 설명에 관한 항목입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/model-assessment/06-needs-attention.png' | relative_url }}" alt="회귀 검사와 두 실행에서 모두 실패한 Business Classification 검사를 표시하는 GPT-6 Luna 및 GPT-6.1 Sol의 Needs attention 필터" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Needs attention은 더 넓은 실패 패턴을 드러냅니다. Pass에서 Fail로 바뀐 결과와 Fail이 유지된 결과는 서로 다른 조사가 필요합니다.</figcaption>
</figure>

**Recommended**는 어느 실행을 더 선호할지 상대적 질문에 답합니다. **Critical**은 실행의 실패 상태를 설명합니다. 두 실행 모두 문서화된 [실행 상태 규칙](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#51-regression-status)에 따라 실패 검사 임계값을 초과합니다.

GPT-6 Luna를 선택해도 지속되는 네 가지 실패가 해결되지는 않습니다. 저장된 근거를 기준으로 분류 기준과 기대 레이블을 확인해야 합니다. 에이전트를 수정해야 할 수도 있고 평가를 수정해야 할 수도 있으며 둘 다 손봐야 할 수도 있습니다.

여기서 Model Assessment는 [Agent Review Tool](https://microsoft.github.io/mcscatblog/posts/agent-review-tool/)을 보완합니다. Model Assessment는 여러 모델에서 테스트 결과를 보여 줍니다. Agent Review Tool은 지침, 스킬, 도구, 평가 범위의 구성 위험을 조사하는 데 도움을 줍니다. 런타임 실패는 구성 검토의 출발점이 될 수 있습니다.

## 근거를 바탕으로 모델 결정

이 예에서는 해당 작업에서 GPT-6 Luna를 추가 조사할 후보로 유지하고, 변경된 검사 두 건을 재현하며, 지속되는 분류 검사 실패를 검토하겠습니다. 비용에 근거해 결정을 내리기 전에는 부분 사용량 보고도 해결해야 합니다. 추천은 작업의 우선순위를 정하는 데 도움이 되지만, 에이전트가 정상이라는 보증은 아닙니다.

[PDF 내보내기](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#48-review-test-results-and-export)를 사용하면 변경을 검토하는 사람과 비교 결과를 공유할 수 있습니다. 남은 주의 사항과 함께 추천, 신뢰도, 결과를 살펴볼 수 있습니다.

Model Assessment는 [Microsoft Marketplace의 Copilot Agent Kit](https://marketplace.microsoft.com/en-us/product/dynamics-365/microsoftpowercatarch.copilotstudiokit2)에서 사용할 수 있습니다.

다음 모델을 바꾸기 전에 후보 모델이 무엇을 더 잘해야 하며 무엇을 손상하면 안 되는지 정하세요. 그런 다음 평가로 기대 사항을 검증하면 됩니다.

**새 모델을 신뢰하기 전에 에이전트에서 어떤 작업을 반드시 성공해야 할까요?**
