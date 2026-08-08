---
layout: "chapter"
date: 2026-08-06
title: "Copilot Studio 라이선싱 이해하기"
short_title: "라이선싱 이해"
description: "Copilot Studio의 라이선싱과 과금 방식이 어떻게 동작하는지 배웁니다."
order: 12
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/12-understanding-licensing/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/12-understanding-licensing/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 12: Understanding Licensing](https://microsoft.github.io/agent-academy/recruit/12-understanding-licensing/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

## 🎯 미션 브리핑

환영합니다, Recruit. 에이전트를 프로덕션에 배포하려면 작동하는 프롬프트와 다듬어진 응답만으로는 충분하지 않습니다. 그 에이전트가 **어떻게 측정되고 어떻게 과금되는지** 명확히 알아야 합니다. 라이선싱 관련 surprise는 보통 agent가 live된 뒤, 사용량이 늘고 비용이 예상보다 빠르게 올라갈 때 나타납니다.

이번 미션은 그런 순간을 막기 위해 준비되었습니다. Copilot Studio 사용량이 어떻게 추적되는지, 서로 다른 배포 선택이 비용에 어떤 영향을 주는지, 게시 전에 계획하는 일이 왜 중요한지 배우게 됩니다. 이 부분을 제대로 이해하면 효과적일 뿐 아니라 지속 가능한 agent를 설계할 수 있습니다.

비용 통제 브리핑이라고 생각하면 됩니다.

## 🔎 학습 목표

이 미션에서는 다음을 배웁니다.

1. Copilot Credits 소비 모델을 기준으로 Copilot Studio 라이선싱이 어떻게 동작하는지
1. pay-as-you-go, capacity pack, 선결제 약정으로 Copilot Credits를 확보하는 방법
1. Microsoft 365 Copilot 사용자 라이선스에 포함되는 범위와 여전히 Copilot Studio credits가 필요한 경우
1. 내부, 외부, 자동화, 통합 agent 시나리오에 따라 credit 소비가 어떻게 달라지는지
1. 대규모로 agent를 배포할 때 예상치 못한 비용을 피하도록 사용량을 계획, 추정, 모니터링하는 방법

## 🔎 Copilot Credits란?

Copilot Credits는 Copilot Studio에서 **사용량을 측정하는 통화 단위**입니다. 전기나 수도 계량기처럼, agent가 더 많은 일을 할수록 계량기가 더 많이 돌아간다고 생각하면 됩니다.

[Copilot Credits는 agent가 정보를 검색하고, 프롬프트에 응답하고, action이나 custom skill을 사용하는 데 필요한 시간과 노력을 측정합니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing) agent가 정보를 조회하고, 질문에 답하고, workflow와 action을 실행할 때마다 credit이 소비됩니다. 모든 topic invocation, tool call, grounding operation, custom skill은 Copilot Credits를 사용합니다. 단순한 답변은 적게, 복잡한 다단계 action은 더 많이 소모합니다.

내장 테스트 채팅에서의 테스트를 제외하면, agent가 실제 작업을 수행할 때마다 Copilot Credits가 사용됩니다.

<div class="info-box note" markdown="1">
**참고**

[2025년 9월 1일부터 agent의 공통 currency가 *messages*에서 *Copilot Credits*로 바뀌었습니다. 선불 pack당 수량이나 pay-as-you-go 단가는 바뀌지 않습니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing)
</div>

## Copilot Studio 라이선싱은 어떻게 동작하나요?

[Copilot Credits는 pay-as-you-go meter, 사전 구매 플랜, Copilot Credit 선불 pack 구독으로 제공됩니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing)

### 1. Copilot Studio Pay-As-You-Go (PAYGO) Meter

[Pay-as-you-go는 Azure 구독을 사용해 Copilot Studio 비용을 지불하는 방식으로, 라이선스 약정이나 선구매 없이 agent 만들기를 시작할 수 있습니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing) 매달 말 조직은 agent가 실제로 사용한 Copilot Credits만큼만 비용을 지불합니다.

- 선불 약정 없음
- Azure를 통해 **Copilot Credit당 $0.01** 청구
- billing policy를 통해 Power Platform 환경에 연결된 **활성 Azure 구독** 필요
- 초기 개발, 변동성이 큰 사용량, 또는 월간 볼륨을 아직 예측할 준비가 되지 않은 경우에 적합

### 2. Copilot Studio License (Copilot Credit Capacity Pack)

- 월 구독: pack당 **25,000 Copilot Credits**, **$200/pack/month**
- 용량은 tenant 수준에서 풀링되며 여러 pack을 구매해 누적 가능
- [사용하지 않은 credit은 다음 달로 이월되지 않음](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing)
- 예측 가능한 프로덕션 수준 사용량에 가장 적합
- 월중에 pack 용량을 초과해도 agent가 계속 실행되도록 PAYGO를 백업으로 함께 설정하는 것을 Microsoft는 강력히 권장합니다.

### 3. Copilot Credit Pre-Purchase Plan (P3)

[Copilot Credits를 1년 단위로 선결제하는 옵션입니다. Copilot Credit Commit Units(CCCUs) 풀을 Microsoft 적격 제품 전반에서 사용할 수 있습니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing) 여기에는 Copilot Studio, Dynamics 365 first-party agents, Copilot Chat이 포함됩니다.

- Credit은 **Copilot Credit Commit Units (CCCUs)** 로 구매
- 각 CCCU는 **$1** 가치이며 **100 Copilot Credits**로 전환
- 연 단위 tiered discount로 대규모 운영 시 가장 비용 효율적인 옵션
- 사용하지 않은 CCCU는 **연간 계약 종료 시 만료**됩니다(capacity pack은 월 단위로 만료되는 것과 다름).
- 대규모 agent fleet 또는 여러 workload 전반의 governance를 단순화하려는 조직에 적합

## 📌 Copilot Studio 사용자 라이선스

용량을 확보했더라도 maker는 올바른 접근 권한이 필요합니다.

- **Copilot Studio Tenant License**(credit capacity pack 또는 pay-as-you-go)는 tenant에서 Copilot Studio를 사용할 수 있게 합니다.
- **Copilot Studio User License**(무료)는 agent를 만들거나 관리할 사람에게 할당해야 합니다.

이 분리 덕분에 관리자는 용량을 통제하면서도 개별 maker가 독립적으로 agent를 만들 수 있습니다.

<div class="info-box note" markdown="1">
**P3 고객 참고**

Pre-Purchase Plan을 사용할 때 builder 접근 권한은 Power Platform Admin Center의 **Copilot Studio Author** 설정을 통해 부여됩니다. Azure/Entra에서 security group을 만들고 maker를 배정한 다음, 그 그룹을 Copilot Studio Author 설정에 할당합니다. 개별 사용자 라이선스는 할당하지 않습니다.
</div>

## 🧠 Microsoft 365 Copilot 라이선스에 포함되는 것

Microsoft 365 Copilot($30/user/month) 라이선스가 있으면 다음을 사용할 수 있습니다.

- Word, Teams, Outlook, Excel 및 기타 Microsoft 365 앱의 Copilot access
- [Microsoft 365 Copilot, Teams, SharePoint에서 사용되는 Copilot Studio의 agent 기능](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing). fair use 제한 내에서 추가 비용 없음

### M365 Copilot 라이선스 사용자는 언제 실제로 무료인가요?

Microsoft Learn의 billing rates 표를 보면 classic answers, generative answers, agent actions, agent flows, AI tools 등 모든 feature type에 걸쳐 "No charge"가 표시됩니다. 얼핏 전면 무료처럼 보일 수 있지만, 이 열에는 중요한 각주가 붙어 있습니다.

["No charge" rate는 employee-facing(Business to Employee) 시나리오에서 **두 조건을 모두 만족할 때** 적용됩니다. 첫째, agent와 상호작용하는 사용자가 Microsoft 365 Copilot 라이선스를 가지고 있어야 합니다. 둘째, agent가 그 사용자의 인증된 Microsoft 365 Copilot ID를 사용해 동작해야 합니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management) 사용량에는 fair use 제한도 적용됩니다.

따라서 핵심 질문은 "어떤 기능을 썼는가?"가 아니라 "누가, 어떤 ID로 agent를 사용했는가?"입니다.

**Copilot Studio credits가 소비되는 경우:**

- agent와 상호작용하는 사용자가 M365 Copilot 라이선스를 가지고 있지 않음
- agent가 **외부 채널**(웹사이트, 앱 또는 소셜 플랫폼)에 게시되어 인증된 M365 Copilot 사용자 ID로 동작할 수 없음
- agent가 **자율적으로** 실행됨(라이선스를 가진 사용자의 상호작용으로 trigger된 것이 아님)

**Copilot Studio credits가 소비되지 않는 경우:**

- M365 Copilot 라이선스가 있는 사용자가 Teams, SharePoint 또는 Microsoft 365 Copilot Chat을 통해 자신의 인증된 ID로 agent와 상호작용할 때 — agent가 classic answers, generative answers, agent flows, AI tools 중 무엇을 사용하든 관계없음

### 간단한 판단 기준

- **M365 Copilot 라이선스 사용자, 인증됨, 내부 채널** → Copilot Studio credits 사용 안 함(fair use 적용)
- **비라이선스 사용자, 외부 채널 또는 자율 trigger** → Copilot Studio credits 사용

## 💰 Credit Billing Rates 한눈에 보기

[agent가 소비하는 Copilot Credits 수는 agent의 설계, 고객이 상호작용하는 빈도, 사용하는 기능에 따라 달라집니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management) 각 feature type의 비용은 다음과 같습니다.

| Agent Feature | Cost | M365 Copilot Licensed User |
| ------------- | ---- | -------------------------- |
| Classic answer | 1 credit | No charge |
| Generative answer | 2 credits | No charge |
| Agent action | 5 credits | No charge |
| Tenant graph grounding | 10 credits | No charge |
| Agent flow actions (per 100 actions) | 13 credits | No charge |
| AI tools: basic (per 10 responses) | 1 credit | No charge |
| AI tools: standard (per 10 responses) | 15 credits | No charge |
| AI tools: premium / reasoning (per 10 responses) | 100 credits | No charge |
| Content processing tools (per page) | 8 credits | No charge |

한 번의 agent 상호작용이 여러 billing line에 동시에 해당할 수 있습니다. 예를 들어 [tenant graph로 grounding된 agent가 복잡한 프롬프트 하나에 응답할 때 12 Copilot Credits(tenant graph grounding 10 + generative answer 2)를 사용할 수 있습니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management)

<div class="info-box note" markdown="1">
**reasoning 모델 참고**

agent가 reasoning-capable model을 사용할 때는 [수행된 action의 표준 feature rate와 더불어, deep reasoning 및 multi-step inference에 필요한 추가 compute에 대해 premium AI tools rate(응답 10건당 100 credits)가 함께 적용됩니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management)

**bring-your-own model 참고**

Azure Foundry(custom) model은 별도로 과금되며 이 요금에 포함되지 않습니다.
</div>

## ⚠️ 초과 사용(Overage) 제한

용량은 월 단위로 적용됩니다. 구매한 credit을 초과하면 다음이 발생합니다.

- [tenant가 선결제 용량의 125%에 도달하면 enforcement가 trigger됩니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management)
- Custom agent가 비활성화됩니다. 진행 중인 대화는 마무리되지만, 이후 모든 invocation은 용량이 늘어나거나 reset될 때까지 거부됩니다.
- 최종 사용자는 "This agent is currently unavailable. It has reached its usage limit." 같은 메시지를 보게 됩니다.
- tenant admin은 Power Platform Admin Center의 이메일 알림과 notice를 받습니다.

해결 방법은 기존 tenant 용량을 재할당하거나, pack을 추가 구매하거나, PAYGO를 안전망으로 설정해 초과분이 차단되지 않고 과금되도록 하는 것입니다.

## 📊 용량 계획 팁

agent를 출시하기 전에 다음을 권장합니다.

- [Copilot Studio Agent Usage Estimator](https://aka.ms/copilotstudioestimator)를 사용해 agent별 월간 credit을 예측합니다.
- **사용하지 않는 tool 비활성화**: 사용하지 않는 tool도 켜 둔 상태라면 credit 비용이 발생할 수 있습니다.
- **credit pack + PAYGO 병행**으로 월중에 pack이 소진되더라도 서비스 중단을 피합니다.
- tool에 접근하기 전에 모든 builder에게 **Copilot Studio User Licenses**를 할당합니다.
- Power Platform Admin Center의 **Billing > Licenses > Copilot Studio**에서 소비량을 모니터링합니다.

<div class="info-box note" markdown="1">
**팁**

✅ 기획 초기에 Usage Estimator를 실행하고, agent를 만든 뒤 다시 실행해 예상 사용량과 실제 사용량을 비교하세요. 보통 그 차이에서 배울 점이 많습니다.
</div>

## 🧠 실제 라이선싱 시나리오

| Scenario | Licensing / Credits |
| -------- | ------------------- |
| M365 Copilot 라이선스 사용자가 내부 Teams agent와 상호작용(classic 또는 generative answers, tenant graph grounding 포함) | M365 Copilot 라이선스로 커버됨(fair use 제한 적용) |
| M365 Copilot 라이선스 사용자가 내부 채널에서 Power Automate/connector action이 있는 agent 사용 | No charge(fair use 적용) |
| 비라이선스 사용자 또는 외부 채널에서 Power Automate/connector action이 있는 agent 사용 | Copilot Credits 사용 |
| Autonomous agents(인증된 M365 Copilot 사용자 ID 없음) | Copilot Credits 사용 |
| 외부 웹 또는 시스템에 게시됨 | Copilot Credits 사용 |
| M365 Copilot 라이선스가 없는 사용자가 agent와 상호작용 | Copilot Credits 사용 |
| reasoning model을 사용하는 agent | 표준 feature rate + premium AI tools rate 사용 |
| agent를 만드는 maker | Copilot Studio User License(무료) 필요 |

## 🏁 Mission Complete

성공적으로 다음을 완료했습니다.

- **Copilot Credits**: agent 사용량이 어떻게 측정되는지 설명했습니다.
- **License coverage**: Microsoft 365 Copilot 라이선스에 포함되는 범위를 식별했습니다.
- **Purchasing options**: capacity pack, pay-as-you-go, prepaid commitment를 비교했습니다.
- **Cost planning**: agent 기능과 시나리오가 소비량에 어떤 영향을 주는지 평가했습니다.

다음으로 [Recruit Course Completion]({{ '/chapters/academy-recruit-course-completion-badges-recruit/' | relative_url }})으로 이동해 badge를 확보하세요.

## 📚 Tactical Resources

- [Copilot Studio licensing and billing](https://learn.microsoft.com/microsoft-copilot-studio/billing-licensing?WT.mc_id=power-170631-apdunnam)
- [Billing rates and management](https://learn.microsoft.com/microsoft-copilot-studio/requirements-messages-management?WT.mc_id=power-170631-apdunnam)
- [Power Platform Licensing Guide (November 2025)](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/bade/documents/products-and-services/en-us/bizapps/Power-Platform-Licensing-Guide-November-2025.pdf?WT.mc_id=power-170631-apdunnam)
- [Message management and capacity monitoring](https://learn.microsoft.com/power-platform/admin/manage-copilot-studio-messages-capacity?WT.mc_id=power-170631-apdunnam)
