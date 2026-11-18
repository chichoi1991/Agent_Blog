---
layout: "chapter"
date: 2026-11-12
title: "모델을 바꾸기 전에: Model Assessment로 Copilot Studio 에이전트 평가하기"
short_title: "Model Assessment"
description: "공유 평가 검사, 회귀 결과, Copilot Credits를 함께 비교해 Copilot Studio 에이전트에 적합한 모델을 평가하는 방법."
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

<figure class="screenshot"><img src="{{ '/assets/catblog/model-assessment/header.png' | relative_url }}" alt="모델 변경 전 Model Assessment로 비교하고 조사하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"></figure>

에이전트 모델을 바꾸는 것은 몇 번 클릭이면 됩니다. 변경을 유지할 가치가 있는지 아는 데는 더 많은 작업이 필요합니다.

에이전트의 모델 수명 주기는 “설정하고 잊어버리는” 일이 아닙니다. 프런티어 연구소에서 새 모델을 출시할 때마다 Copilot Studio에서 선택 가능한 모델도 바뀝니다. [Copilot Studio 에이전트의 AI 모델 수명 주기 관리](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/plan-agent-model-lifecycle) 지침에 따라 변경 사항을 정기적으로 살펴보고 모델 마이그레이션이 필요한지 판단하세요. Model Assessment는 새 모델에서 에이전트를 테스트하고 현재 모델의 결과와 비교해 마이그레이션을 준비하는 데 도움을 줍니다.

새 모델은 설명을 더 잘 쓸 수 있지만 도구 기반 답변의 세부 정보를 놓칠 수 있습니다. 같은 테스트를 통과해도 크레딧을 더 사용할 수도 있습니다. 좋은 대화 몇 건만으로는 어떤 절충이 있는지 알기 어렵습니다.

[Copilot Agent Kit](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/kit-overview)의 **Model Assessment**는 에이전트 테스트를 사용해 모델 변경 여부를 평가합니다. 평가 기록, 나란히 비교한 결과, 모델 추천, 보고된 Copilot Credits를 한 작업 공간에 모읍니다.

중요한 질문은 전반적으로 어떤 모델이 가장 좋은지가 아닙니다. **이 에이전트를 사용하는 사람들이 수행해야 할 작업에서 어떤 모델이 더 잘 작동하는가?**

테스트 세트와 결과를 다루는 데모 에이전트 **Zava Kit Test Automation**을 살펴보겠습니다. 이 에이전트의 평가 결과는 모델 선택에 통과율 이상의 근거가 필요한 이유를 보여 줍니다.

## 좋은 대화만으로 모델을 선택할 수 없음

사용자가 의존하는 작업을 테스트하세요. 지원 에이전트라면 올바른 문제 해결 안내를 찾고, 온보딩 에이전트라면 정책 질문에 정확히 답해야 할 수 있습니다. 모델 변경은 다른 작업을 손상시키지 않으면서 해당 작업을 개선할 때 의미가 있습니다.

Model Assessment는 **Microsoft Copilot 하네스**와 **Standard 하네스** 에이전트를 지원하며 두 가지 테스트 경로를 제공합니다.

- **Copilot Studio 평가**는 두 하네스에서 모두 지원됩니다. 이름에 `MODELCHECK`를 포함한 평가 테스트 세트를 만들고 활성 상태로 유지합니다. 저장된 초안을 평가합니다.
- **Copilot Agent Kit 테스트 자동화**는 현재 Standard 하네스 에이전트에서만 대안으로 사용할 수 있습니다. 파이프라인이 활성화된 **Agent Configuration**과 Kit 테스트 세트를 구성합니다. 게시된 에이전트를 평가합니다.

[설정 안내](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#2-prerequisites)에는 필요한 역할, 연결, 흐름, 용량이 나와 있습니다.

시작점은 [기준선 평가](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#43-capture-a-baseline)입니다. 이후 평가에서는 기억이나 자주 쓰는 프롬프트 몇 개에 의존하지 않고 모델 변경 전후를 구체적으로 비교할 수 있습니다.

Model Assessment는 **Copilot Agent Kit**의 **Advanced Testing** 아래에 있습니다. 개요에서 이전 및 현재 모델과 에이전트별 최신 평가 상태를 볼 수 있어 조사할 에이전트를 찾기 쉽습니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/model-assessment/01-zava-agents.png' | relative_url }}" alt="GPT-6 Luna와 GPT-6.1 Sol 및 평가 상태를 보여 주는 Model Assessment 개요" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>모델 변경과 에이전트의 최신 평가 결과를 연결하는 개요.</figcaption></figure>

개별 에이전트의 **Model history**에는 실행 날짜, 결과, 확인 가능한 경우 보고된 크레딧을 포함해 이전 평가가 보존됩니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/model-assessment/02-model-history.png' | relative_url }}" alt="GPT-6.1 Sol 모델 선택과 GPT-6 Luna로 실행한 최신 기록을 보여 주는 Zava Kit Test Automation" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트가 진화해도 이전 모델 평가 결과를 확인할 수 있습니다.</figcaption></figure>

### 평가 중 발생하는 일

비교를 통제하려면 지침, 지식, 도구, 테스트 사례, 평가 기준을 그대로 유지합니다. 다른 항목이 바뀌면 결과와 함께 기록하세요. 그렇지 않으면 모델 개선처럼 보이는 것이 테스트 변경일 수 있고, 회귀처럼 보이는 결과에도 다른 원인이 있을 수 있습니다.

> Model Assessment에서 모델을 바꾸면 원본 에이전트에 저장됩니다. Kit 테스트 경로에서는 게시도 수행합니다. 사용자가 의존하는 에이전트가 바뀌지 않도록 개발 또는 테스트 환경의 에이전트에서 모델 변경을 시도하세요.

평가는 즉시 끝나지 않습니다. 진행 패널에서 **Initializing**, **Running evaluations**(또는 **Running Kit tests**), **Scoring results**, **Generating AI analysis** 단계를 확인할 수 있습니다. 에이전트가 테스트 응답 중인지 분석을 준비 중인지 파악할 수 있습니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/model-assessment/08-assessment-progress.png' | relative_url }}" alt="평가 초기화, 실행, 점수 계산, AI 분석, 완료를 보여 주는 진행 상태" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>평가의 현재 단계를 보여 주는 진행 패널. 패널을 닫아도 평가는 계속 실행됩니다.</figcaption></figure>

## 품질과 사용량을 함께 살펴보기

예시에서는 2026년 11월 16일에 완료된 Copilot Studio 평가 실행을 사용해 **GPT-6 Luna**와 **GPT-6.1 Sol**을 비교합니다. 두 모델은 [Microsoft Copilot 하네스 모델 지침](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-agent-model-availability#model-lifecycle-summary)에 일반 공급으로 소개된 OpenAI 모델입니다. 이는 하나의 에이전트를 자체 테스트로 평가하는 예시이지 벤치마크나 일반 모델 순위가 아닙니다.

비교 작업 영역에서 결과를 나란히 살펴봅니다. 같은 테스트 엔진을 사용해 완료한 실행이 정확히 두 개일 때 모델 추천이 제공됩니다.

| 관찰 결과 | GPT-6 Luna | GPT-6.1 Sol |
|---|---:|---:|
| 실행 날짜 | 2026년 11월 16일 | 2026년 11월 16일 |
| 통과 검사 | 14 | 12 |
| 실패 검사 | 4 | 6 |
| 오류 / 제외 | 0 / 0 | 0 / 0 |
| 실행 평가 배지 | Critical | Critical |
| 공유 검사 통과율 | 77.8% | 66.7% |
| 보고된 평가 크레딧(추정) | 77.68 | 71.13 (부분) |
| 응답 / 채점 크레딧 | 64.87 / 12.81 | 58.29 / 12.84 |

이 실행에서 GPT-6 Luna가 검사를 두 개 더 통과했습니다. 앱은 공유 검사 품질의 차이( Luna만 통과하고 Sol은 실패한 검사가 두 개이며 반대는 없음)를 바탕으로 **GPT-6 Luna, Medium confidence**를 추천합니다.

크레딧 수치는 별도로 해석해야 합니다. Sol의 보고 합계에는 **partial** 표시가 있으므로 더 적은 수치가 전체적으로 더 저렴하다는 근거가 되지 않습니다. 불완전한 사용량을 절감으로 단정하지 말고, 바뀐 두 검사를 조사하는 것이 다음 단계입니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/model-assessment/03-model-comparison.png' | relative_url }}" alt="Luna 추천, Medium confidence, 공유 검사 18개, Sol의 부분 크레딧 표시를 보여 주는 모델 비교" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>비교에서 선호 모델과 신뢰도 및 절충점을 보여 줍니다. 두 실행 모두 Critical 평가 배지입니다.</figcaption></figure>

비교 대상은 대화 18개가 아니라 **공유 검사 18개**입니다. 평가 테스트 사례 하나에 여러 채점 지표가 있을 수 있습니다. 공유 검사는 두 실행 모두 Pass 또는 Fail인 검사이며 누락, 오류, 제외 결과는 비교 가능한 통과로 취급하지 않습니다.

공유 검사 18개는 Medium confidence가 나온 이유를 설명합니다. 해당 작업에 유용한 증거이지만 프로덕션 결정을 내리기 전에 중요한 차이를 재현해야 합니다.

추천은 다른 모델의 단순한 의견이 아닙니다. [앱 코드에서 판정과 신뢰도를 계산](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#63-recommend-model-from-assessment-comparison)하고 AI 프롬프트가 이유와 절충점을 설명합니다. 이는 규칙을 확인할 수 있는 [근거 기반 LLM 채점 패턴](https://microsoft.github.io/mcscatblog/posts/better-llm-scoring/)과 마찬가지로, 검토 가능한 결정에 설명을 더합니다.

### 평가 사용량과 평가 분석을 구분

표의 수치는 보고된 평가 구성 요소인 **응답**(에이전트가 테스트 사례에 답함)과 **채점**(답변을 평가함)을 합산합니다. partial 표시가 나타내듯 Sol 수치는 불완전합니다. 두 열은 평가 워크플로 전체 합계가 아닙니다.

[실행별 크레딧 보고](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#52-copilot-credits)는 Microsoft Copilot 하네스 기반 에이전트의 Copilot Studio 평가가 반환하는 사용량을 활용합니다. Kit 테스트는 Copilot Credits를 보고하지 않으며 부분 사용량은 표시됩니다.

평가에는 결과를 분석하는 AI 프롬프트도 사용됩니다. 관찰한 AI 분석 실행에서는 테스트 사례 실행 시 에이전트가 소비한 양과 별개로 평가당 약 **120–150 Copilot Credits**가 사용됐습니다. 이는 계획 수립을 위한 관찰 추정치입니다.

어떤 수치도 프로덕션 비용 절감을 예측하지 않습니다. 자세한 통제 방법은 [사용량 거버넌스 글](https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/)을 참고하세요.

## AI 요약으로 결과 맥락 파악

검사 수는 통과한 항목의 개수를 알려 줍니다. **AI summary**는 그 결과가 에이전트 작업에 어떤 의미인지 설명합니다.

실행 카드 아래의 **AI summary**에는 모델 추천과 각 실행에 대한 별도 분석이 표시됩니다. [실행별 요약](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#46-compare-model-runs)은 합계를 넘어 **Works well**에서 강점, **Needs attention**에서 우려 사항, **What changed**에서 개선 또는 회귀를 설명합니다. 가능한 경우 **Overall** 평가와 **Evidence limits**도 맥락을 제공합니다.

Zava Kit Test Automation의 요약에서는 Dataverse 도구 사용 작업이 강점인 반면, 테스트와 에이전트 기능에 대한 여러 설명은 계속 분류 검사에 실패합니다. GPT-6.1 Sol 요약은 특정 테스트 세트의 테스트 목록 응답 품질 회귀와 테스트 실행 시작의 키워드 검사 실패도 강조합니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/model-assessment/07-ai-summary.png' | relative_url }}" alt="Zava 에이전트의 강점, 분류 관련 문제와 회귀 검사를 보여 주는 GPT-6 모델별 AI 요약" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>지속적인 분류 실패와 바뀐 검사 등 조사할 강점과 우려 사항을 보여 주는 요약.</figcaption></figure>

이것은 “검사 6개가 실패했다”는 말보다 유용한 출발점입니다. 제작자는 에이전트가 안정적으로 수행하는 부분과 더 면밀히 살펴야 할 답변 유형을 파악할 수 있습니다. 다만 생성된 문구를 기록된 결과와 대조해야 합니다. 여기서 Luna 요약은 **Warning**이라고 하지만 실행 카드에는 **Critical**이 표시됩니다. 생성된 설명이 실행 상태를 덮어쓰지는 않습니다.

추천은 선택한 두 실행을 비교하고 각 실행의 요약은 기준선과의 비교를 설명합니다. 선택 쌍을 바꿔도 **What changed**가 그 두 실행의 새로운 비교로 바뀌지는 않습니다. 요약은 조사할 위치를 알려 주지만 근본 원인을 확정하지는 않습니다. 개별 검사를 살펴보겠습니다.

## 가장 유용한 결과는 실패한 검사 하나일 수 있음

요약의 응답 품질 문제는 구체적인 예로 이어집니다. **Test runs**에서는 테스트 세트별 결과가 지표 단위로 나란히 표시됩니다. **Regressed** 보기에서 달라진 검사 두 개를 확인할 수 있습니다. 다음 요청부터 살펴보겠습니다.

> Show the tests in the Customer Support Case Agent test set.

**Response Quality** 검사는 GPT-6 Luna에서는 통과했지만 GPT-6.1 Sol에서는 실패했습니다. 전체 비교에서는 **Tool and Capability Use**가 두 실행 모두 통과했습니다. 따라서 근거는 도구 사용 실패가 아니라 응답 품질 문제를 가리킵니다.

다른 변경 검사는 "Start a test run"의 **Required Information Coverage**입니다. 키워드 검사 실패만으로 에이전트가 실행을 시작하지 못했다고 단정할 수는 없습니다. 진단하기 전에 기대 문구와 응답을 확인하세요.

<figure class="screenshot"><img src="{{ '/assets/catblog/model-assessment/05-regressed-check.png' | relative_url }}" alt="GPT-6 Luna의 Pass에서 GPT-6.1 Sol의 Fail로 바뀐 두 검사를 보여 주는 Regressed 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>선택한 실행 간 차이 두 개가 추가 실패를 설명합니다. 행에는 테스트 사례별 보고 크레딧이 남아 있습니다.</figcaption></figure>

실패 검사는 조사할 지점을 알려 줍니다. 테스트의 기대 결과와 평가 기준을 검토한 뒤 통제된 조건에서 시나리오를 다시 실행해 실패 원인을 확인하세요.

이제 한 모델이 덜 안정적이라는 인상 대신 재현해 볼 가치가 있는 결과가 생겼습니다.

### 해당 작업의 사용량 확인

**Test runs** 보기에서는 채점 결과와 테스트 세트 소계 외에 테스트 사례별 보고 **Copilot Credits**도 표시합니다.

테스트 목록 요청에 보고된 사용량은 GPT-6 Luna에서 **10.85 크레딧**, GPT-6.1 Sol에서 **13.46 크레딧**입니다. 각 지표 행에 따로 부과되는 값이 아니라 테스트 사례에 해당하는 수치입니다. Response Quality 결과와 함께 읽고 Sol의 실행 수준 사용량이 부분적이라는 경고를 유지하세요. 완전한 비용 비교를 입증하지는 않습니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/model-assessment/04-test-results.png' | relative_url }}" alt="테스트 사례별 Copilot Credits 및 테스트 세트 소계를 포함한 평가 결과" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>테스트 사례별 사용량을 품질 결과와 함께 비교할 수 있습니다.</figcaption></figure>

## 추천 모델에도 해결되지 않은 문제가 있을 수 있음

비교에서 중요한 점이 하나 더 있습니다. **두 실행 모두 Critical**입니다.

**Needs attention** 보기에서는 선호 모델을 추천받았다고 조사가 끝난 것이 아님을 확인할 수 있습니다. 달라진 검사 두 개와 함께 **Business Classification** 검사 네 개가 두 실행 모두에서 실패했습니다. 테스트 실행 결과 해석, 테스트 세트 실행, 에이전트 기능 설명, 테스트 유형 설명과 관련된 항목입니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/model-assessment/06-needs-attention.png' | relative_url }}" alt="회귀 검사와 두 실행에서 실패한 Business Classification 검사를 표시하는 Needs attention 필터" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Pass에서 Fail로 바뀐 결과와 Fail이 유지된 결과는 서로 다른 조사가 필요합니다.</figcaption></figure>

**Recommended**는 어느 실행을 선호하는지에 대한 상대적 질문에 답합니다. **Critical**은 실행의 실패 상태를 설명합니다. 두 실행 모두 문서화된 [실행 상태 규칙](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#51-regression-status)의 실패 검사 임계값을 넘었습니다.

GPT-6 Luna를 선택해도 네 가지 실패는 해결되지 않습니다. 분류 기준과 기대 레이블을 저장된 근거와 비교해야 합니다. 에이전트 설정을 수정해야 할 수도 있고 평가를 수정해야 할 수도 있으며 둘 다 필요할 수도 있습니다.

Model Assessment는 [Agent Review Tool](https://microsoft.github.io/mcscatblog/posts/agent-review-tool/)을 보완합니다. Model Assessment는 여러 모델에서 테스트 결과를 보여 줍니다. Agent Review Tool은 지침, Skill, 도구, 평가 범위의 구성 위험을 조사합니다. 런타임 실패는 구성 검토의 출발점이 될 수 있습니다.

## 근거를 바탕으로 모델 결정

이 예시에서는 해당 작업에 GPT-6 Luna를 추가 조사 후보로 두고, 바뀐 두 검사를 재현하며, 지속된 분류 실패를 검토하겠습니다. 비용에 따라 결정하기 전에 부분 사용량 보고도 해결하겠습니다. 추천은 작업의 우선순위를 정하는 데 도움이 되지만 문제가 없다는 보증은 아닙니다.

[PDF 내보내기](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/db22736e71bf6acb813e2e9dd2491e489a8c0f92/MODEL_ASSESSMENT.md#48-review-test-results-and-export)를 사용하면 비교 내용을 변경 검토자와 공유할 수 있습니다. 검토자는 아직 주의가 필요한 결과와 함께 추천 및 신뢰도를 살펴볼 수 있습니다.

Model Assessment는 [Microsoft Marketplace의 Copilot Agent Kit](https://marketplace.microsoft.com/en-us/product/dynamics-365/microsoftpowercatarch.copilotstudiokit2)에서 사용할 수 있습니다.

다음 모델 변경 전 후보 모델이 무엇을 더 잘해야 하며 무엇을 손상시키면 안 되는지 정하세요. 그런 다음 평가를 통해 그 기대를 테스트하세요.

**새 모델을 에이전트에 신뢰하고 맡기기 전에 어떤 작업을 반드시 잘 수행해야 할까요?**
