---
layout: "chapter"
title: "Copilot Studio 라이선싱 이해하기"
short_title: "라이선싱 이해"
description: "Copilot Studio의 라이선싱과 과금 방식이 어떻게 동작하는지 배웁니다."
order: 12
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/12-understanding-licensing/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-11"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/12-understanding-licensing/"
---

<div class="info-box note translated-post" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 12: Understanding Licensing](https://microsoft.github.io/agent-academy/recruit/12-understanding-licensing/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

## 🎯 미션 브리핑

에이전트를 실환경에 배포하려면 프롬프트와 응답 품질만으로는 충분하지 않습니다. **어떻게 측정되고 어떻게 과금되는지** 명확히 알아야 합니다. 라이선싱 문제는 보통 agent가 배포된 뒤 사용량이 늘어나면서 뒤늦게 드러납니다.

이번 미션은 그런 상황을 피하기 위한 비용 통제 브리핑입니다. Copilot Studio 사용량이 어떻게 추적되는지, 배포 방식에 따라 비용이 어떻게 달라지는지, 게시 전에 왜 계획이 중요한지를 이해하게 됩니다.

## 🔎 학습 목표

이 레슨에서는 다음을 배웁니다.

1. Copilot Credits 소비 모델을 기준으로 Copilot Studio 라이선싱이 어떻게 동작하는지
1. pay-as-you-go, capacity pack, 선결제 약정으로 Copilot Credits를 확보하는 방법
1. Microsoft 365 Copilot 사용자 라이선스에 포함되는 범위와 여전히 Copilot Studio credit이 필요한 경우
1. 내부/외부/자동화/통합 시나리오에 따라 credit 소비가 어떻게 달라지는지
1. 대규모 배포 시 예상치 못한 비용을 피하기 위한 계획, 추정, 모니터링 방법

## �� Copilot Credits란?

Copilot Credits는 Copilot Studio에서 **사용량을 측정하는 통화 단위** 입니다. 전기나 수도 계량기처럼, agent가 더 많은 일을 할수록 더 많이 소모됩니다.

[Copilot Credits는 정보 검색, 프롬프트 응답, action 또는 custom skill 사용에 필요한 시간과 노력을 측정합니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing) agent가 정보를 찾고, 질문에 답하고, 워크플로/액션을 실행할 때마다 credit이 소비됩니다. topic invocation, tool call, grounding, custom skill 모두 Copilot Credits를 사용합니다. 단순한 답변은 적게, 복잡한 다단계 동작은 더 많이 소모합니다.

내장 테스트 채팅에서의 테스트를 제외하면, agent가 실제 작업을 수행할 때마다 Copilot Credits가 사용됩니다.

<div class="info-box note" markdown="1">
**참고**

[2025년 9월 1일부터 agent 공통 과금 단위가 *messages* 에서 *Copilot Credits* 로 바뀌었습니다. 다만 선불 pack 수량이나 pay-as-you-go 단가는 바뀌지 않았습니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing)
</div>

## Copilot Studio 라이선싱은 어떻게 동작하나요?

[Copilot Credits는 pay-as-you-go meter, 사전 구매 플랜, Copilot Credit 선불 pack 구독으로 제공됩니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing)

### 1. Copilot Studio Pay-As-You-Go (PAYGO) Meter

[Pay-as-you-go는 Azure 구독을 사용해 Copilot Studio를 선구매 약정 없이 시작할 수 있는 방식입니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing) 매달 말 실제로 사용한 Copilot Credits만큼만 과금됩니다.

- 선불 약정 없음
- Azure를 통해 **Copilot Credit당 $0.01** 청구
- billing policy를 통해 Power Platform 환경과 연결된 **활성 Azure 구독** 필요
- 초기 개발, 사용량 변동이 큰 경우, 월 사용량 예측이 어려운 경우에 적합

### 2. Copilot Studio License (Copilot Credit Capacity Pack)

- 월 구독: pack당 **25,000 Copilot Credits**, **$200/pack/month**
- 용량은 tenant 수준에서 풀링되며 여러 pack을 추가 구매해 누적 가능
- [사용하지 않은 credit은 다음 달로 이월되지 않음](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing)
- 예측 가능한 운영 환경에 적합
- pack을 초과해도 agent가 계속 동작하도록 PAYGO를 백업으로 함께 구성하는 것이 Microsoft 권장 사항

### 3. Copilot Credit Pre-Purchase Plan (P3)

[1년 선결제 방식으로 Copilot Credits를 구매하는 옵션입니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing) Copilot Credit Commit Units(CCCUs) 풀을 Copilot Studio, Dynamics 365 first-party agent, Copilot Chat 등 여러 제품에서 사용할 수 있습니다.

- Credit은 **Copilot Credit Commit Units (CCCUs)** 로 구매
- CCCU 1개는 **$1** 가치이며 **Copilot Credits 100개** 로 환산
- 연 단위 tier 할인으로 대규모 운영 시 가장 경제적
- 사용하지 않은 CCCU는 **연간 계약 종료 시 만료** (capacity pack은 월 단위 만료)
- 대규모 agent fleet 또는 다중 워크로드 거버넌스를 단순화하려는 조직에 적합

## 📌 Copilot Studio 사용자 라이선스

용량을 확보했더라도 maker는 올바른 접근 권한이 필요합니다.

- **Copilot Studio Tenant License** (credit capacity pack 또는 pay-as-you-go) — tenant에서 Copilot Studio 사용 가능하게 함
- **Copilot Studio User License** (무료) — agent를 만들거나 관리할 사용자에게 할당해야 함

이 구조 덕분에 관리자는 용량을 통제하면서도 개별 maker가 독립적으로 agent를 만들 수 있습니다.

<div class="info-box note" markdown="1">
**P3 고객 참고**

Pre-Purchase Plan을 사용할 때는 Power Platform Admin Center의 **Copilot Studio Author** 설정으로 builder 접근을 부여합니다. Azure/Entra에서 보안 그룹을 만들고 maker를 넣은 뒤, 해당 그룹을 Copilot Studio Author 설정에 연결합니다. 개별 사용자 라이선스를 따로 할당하지 않습니다.
</div>

## 🧠 Microsoft 365 Copilot 라이선스에 포함되는 것

Microsoft 365 Copilot($30/user/month) 라이선스가 있으면 다음을 사용할 수 있습니다.

- Word, Teams, Outlook, Excel 등 Microsoft 365 앱의 Copilot
- [Microsoft 365 Copilot, Teams, SharePoint에서 사용하는 Copilot Studio agent 기능](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing) — fair use 제한 내에서 추가 비용 없음

### M365 Copilot 라이선스 사용자는 언제 실제로 무료인가요?

Microsoft Learn의 billing rates 표를 보면 거의 모든 기능이 "No charge" 로 보입니다. 하지만 중요한 각주가 있습니다.

["No charge"는 employee-facing(Business to Employee) 시나리오에서 **두 조건을 모두 만족할 때만** 적용됩니다. 첫째, agent와 상호작용하는 사용자가 Microsoft 365 Copilot 라이선스를 가지고 있어야 합니다. 둘째, agent가 그 사용자의 인증된 Microsoft 365 Copilot ID로 동작해야 합니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management) 이 역시 fair use 제한이 적용됩니다.

따라서 핵심 질문은 "어떤 기능을 썼는가"가 아니라 "누가, 어떤 ID로 agent를 사용했는가" 입니다.

**Copilot Studio credits가 소비되는 경우**

- agent와 상호작용하는 사용자가 M365 Copilot 라이선스가 없음
- agent가 **외부 채널**(웹사이트, 앱, 소셜 플랫폼)에 게시되어 인증된 M365 Copilot 사용자 ID로 동작할 수 없음
- agent가 **자율적으로** 실행됨(라이선스를 가진 사용자의 직접 상호작용 없이 동작)

**Copilot Studio credits가 소비되지 않는 경우**

- M365 Copilot 라이선스가 있는 사용자가 Teams, SharePoint, Microsoft 365 Copilot Chat을 통해 자신의 인증된 ID로 agent를 사용할 때 — classic answer, generative answer, agent flow, AI tool 사용 여부와 관계없이 추가 과금 없음

### 간단한 판단 기준

- **M365 Copilot 라이선스 사용자 + 인증된 내부 채널** → Copilot Studio credit 사용 안 함 (fair use 적용)
- **비라이선스 사용자, 외부 채널, 또는 자율 trigger** → Copilot Studio credit 사용

## 💰 기능별 credit 과금 요약

[agent가 소비하는 Copilot Credits는 설계 방식, 상호작용 빈도, 사용 기능에 따라 달라집니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management)

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

한 번의 agent 상호작용이 여러 과금 항목을 동시에 만들 수 있습니다. 예를 들어 [tenant graph로 grounding된 agent가 복잡한 프롬프트 하나에 응답할 때 12 Copilot Credits(tenant graph grounding 10 + generative answer 2)를 쓸 수 있습니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management)

<div class="info-box note" markdown="1">
**참고**

reasoning 모델을 쓰면 [실행된 표준 기능 요금과 더불어, 심층 추론·다단계 추론 계산 비용으로 premium AI tools 요금(응답 10건당 100 credits)이 추가 적용됩니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management)

Azure Foundry의 사용자 지정 모델은 별도 과금이며 위 요금표에 포함되지 않습니다.
</div>

## ⚠️ 초과 사용(Overage) 제한

용량은 월 단위로 강제됩니다. 구매한 credit을 초과하면 다음이 발생합니다.

- [tenant가 선결제 용량의 125%에 도달하면 제한이 시작됩니다.](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management)
- custom agent가 비활성화됩니다. 진행 중인 대화는 마무리되지만 이후 호출은 거부됩니다.
- 최종 사용자는 "This agent is currently unavailable. It has reached its usage limit." 같은 메시지를 보게 됩니다.
- tenant 관리자는 이메일과 Power Platform Admin Center 알림을 받습니다.

해결 방법은 기존 tenant 용량 재할당, pack 추가 구매, 또는 PAYGO를 안전망으로 설정하는 것입니다.

## 📊 용량 계획 팁

agent를 출시하기 전에 다음을 권장합니다.

- [Copilot Studio Agent Usage Estimator](https://aka.ms/copilotstudioestimator)로 월간 credit 소비량 추정
- **사용하지 않는 tool 비활성화** — 켜 둔 tool은 실제 사용 시 credit을 소모할 수 있음
- **credit pack + PAYGO 병행** — pack 소진 시 서비스 중단 방지
- **모든 builder에게 Copilot Studio User License 할당**
- Power Platform Admin Center의 **Billing > Licenses > Copilot Studio** 에서 사용량 모니터링

<div class="info-box note" markdown="1">
**팁**

기획 초기에 Usage Estimator를 한 번 돌리고, agent를 만든 뒤 다시 실행해 예상치와 실제치를 비교해 보세요. 보통 그 차이에서 많은 인사이트가 나옵니다.
</div>

## 🧠 실제 라이선싱 시나리오

| Scenario | Licensing / Credits |
| -------- | ------------------- |
| M365 Copilot 라이선스 사용자가 내부 Teams agent와 상호작용 (classic/generative answer, tenant graph grounding 포함) | M365 Copilot 라이선스로 커버됨 (fair use 적용) |
| M365 Copilot 라이선스 사용자가 내부 채널에서 Power Automate/connector action이 있는 agent 사용 | 추가 과금 없음 (fair use 적용) |
| 비라이선스 사용자 또는 외부 채널에서 Power Automate/connector action이 있는 agent 사용 | Copilot Credits 사용 |
| 자율형 agent (인증된 M365 Copilot 사용자 ID 없음) | Copilot Credits 사용 |
| 외부 웹 또는 시스템에 게시됨 | Copilot Credits 사용 |
| M365 Copilot 비라이선스 사용자가 agent와 상호작용 | Copilot Credits 사용 |
| reasoning 모델을 사용하는 agent | 표준 기능 요금 + premium AI tools 요금 사용 |
| agent를 만드는 maker | Copilot Studio User License(무료) 필요 |

## 🏁 Mission Complete

이제 여러분은 다음을 이해했습니다.

- **Copilot Credits** 가 무엇이며 2025년 9월에 무엇이 바뀌었는지
- Microsoft 365 Copilot 라이선스가 어디까지 포함하고 어디서 끝나는지
- capacity pack, pay-as-you-go, Pre-Purchase Plan 중 무엇을 선택해야 하는지
- 각 기능의 비용과 초과 사용 제한이 어떻게 동작하는지

이제는 청구서를 받고 나서가 아니라, 설계 단계부터 비용을 고려해 agent를 만들 수 있습니다.

## 📚 Tactical Resources

- [Copilot Studio Licensing & Billing](https://learn.microsoft.com/microsoft-copilot-studio/billing-licensing?WT.mc_id=power-170631-apdunnam)
- [Billing Rates and Management](https://learn.microsoft.com/microsoft-copilot-studio/requirements-messages-management?WT.mc_id=power-170631-apdunnam)
- [Power Platform Licensing Guide (November 2025)](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/bade/documents/products-and-services/en-us/bizapps/Power-Platform-Licensing-Guide-November-2025.pdf?WT.mc_id=power-170631-apdunnam)
- [Message Management & Capacity Monitoring](https://learn.microsoft.com/power-platform/admin/manage-copilot-studio-messages-capacity?WT.mc_id=power-170631-apdunnam)
