---
layout: "chapter"
date: 2026-08-07
title: "GitHub Copilot 하네스 도입: Copilot Studio의 비용 통제와 거버넌스"
short_title: "하네스 비용 거버넌스"
description: "GitHub Copilot 하네스 에이전트를 찾아내고 해당 환경을 분류한 뒤, Power Platform 통제 수단으로 메이커 개발과 프로덕션 사용 단계의 Copilot Credit 소비를 관리하는 방법을 설명합니다."
order: 12
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/"
source_author: "lewisdoesdev"
source_published: "2026-08-07"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 lewisdoesdev(@lewisdoesdev) 원문 [Adopting the GitHub Copilot Harness: Cost Control and Governance in Copilot Studio](https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/)(2026-08-07)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-harness-cost-governance/header.png' | relative_url }}" alt="책상에 앉은 고양이 회계사가 AI 에이전트들의 예산 요청을 승인하는 삽화. 작은 로봇 에이전트들이 서류를 들고 줄을 서 있고, 예산 기록·거버넌스 체크리스트·소유권 폴더·메이커/부서/전사 에이전트 트레이가 비용 관리와 거버넌스 통제를 상징합니다." loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

AI 에이전트의 역량이 커질수록, 소비량(consumption)은 조직이 에이전트 활용을 계획하고 통제하는 데 있어 점점 더 중요한 요소가 되고 있습니다. [Copilot Studio의 GitHub Copilot 하네스](https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/)를 사용하는 메이커는 에이전트가 공식적인 프로덕션 라이프사이클에 들어가기 **전에**, 즉 빌드·미리보기·평가 과정에서 이미 Copilot Credit을 소비할 수 있습니다. 이는 관리자가 소비 통제를 적용해야 하는 시점 자체를 바꿔 놓습니다.

메이커의 탐색용으로 쓰이는 환경은 이제 그 안의 에이전트가 프로덕션용으로 게시되지 않더라도 소비를 발생시킬 수 있습니다. 메이커 개발과 예산이 배정된 프로덕션 사용은 용량, 소유권, 연속성 측면에서 서로 다른 접근이 필요하며, 이는 어떤 환경 유형을 쓰든 마찬가지입니다.

노출(exposure)을 줄이기 위한 현실적인 기준선은 다음과 같습니다.

1. GitHub Copilot 하네스 에이전트와 그 에이전트가 속한 환경을 찾는다.
2. 해당 환경을 **메이커 개발용**인지 **예산이 배정된 프로덕션용**인지 분류한다.
3. 할당량, 테넌트 풀 접근 권한, 종량제(pay-as-you-go) 과금, 시행 규칙을 검토한다.
4. 개별 소비에 더 엄격한 경계가 필요한 곳에는 에이전트 수준 한도를 적용한다.
5. 이 검토를 주기적으로 반복하거나, 새로 만들어지는 환경·에이전트 탐지를 자동화한다.

이 글에서는 Copilot Credit 소비를 통제하기 위한 반복 가능한 거버넌스 프로세스를 제안하고, 이를 Power Platform 관리 센터(PPAC)에서, 그리고 대규모로는 Power Platform API를 통해 구현하는 방법을 보여줍니다.

## 환경의 목적에 따라 통제 수단을 선택하세요

메이커가 에이전트를 탐색·빌드·미리보기·평가하는 환경에는 명확한 개발 경계가 필요합니다. 예산이 배정된 프로덕션 사용을 지원하는 환경에는 그 자금 조달 방식, 소유권, 예상 사용량, 중요도에 맞춘 통제가 필요합니다. 두 시나리오 모두 동일한 통제 수단을 쓸 수 있지만, **어떻게 적용하느냐**는 그 환경이 무엇을 지원하기 위해 존재하는지를 반영해야 합니다.

<div class="info-box warning" markdown="1">
이제 메이커 개발 단계에서도, 에이전트가 공식적인 프로덕션 라이프사이클에 들어가기 전에 Copilot Credit 소비가 발생할 수 있습니다.
</div>

어디서부터 시작할지는 환경의 목적으로 판단하세요.

### 메이커 개발

메이커가 에이전트를 탐색·빌드·미리보기·평가하는 환경에는, 그 에이전트가 공식 프로덕션 라이프사이클에 진입하기 전에 통제가 필요합니다. GitHub Copilot 하네스 에이전트를 탐지하고, 기본 에이전트 한도를 적용하고, 테넌트 풀 또는 종량제 접근이 적절한지 판단하고, 에이전트 소유자에게 그 경계를 알리고, 추가 용량을 요청하는 방법을 정의하세요.

### 예산이 배정된 프로덕션 사용

승인된 부서 단위 또는 전사 프로세스를 지원하는 환경에는 책임 있는 소유권과 의도적인 자금 배정이 필요합니다. 비용 소유자와 자금 조달 모델을 확인하고, 용량을 할당하거나 과금을 의도적으로 구성하고, 예상 사용량과 서비스 중요도에 근거해 한도를 설정하고, 프로덕션 서비스를 중단시킬 수 있는 소비를 모니터링하세요.

먼저 영향을 받는 에이전트와 환경을 찾은 다음, 그 목적에 맞는 통제를 적용하세요.

## 영향을 받는 에이전트와 환경 탐색·분류

이렇게 두 가지 시나리오가 생겼으니, 각각에 맞는 프로세스와 통제로 다뤄야 합니다. 거버넌스와 통제는 무엇을 만들고 있는지를 고려하지 않는 획일적인 접근으로는 결코 제대로 달성되지 않습니다.

각 GitHub Copilot 하네스 에이전트에 대해 먼저 다음을 파악하세요.

- 에이전트가 속한 환경
- 그 환경이 메이커 개발용인지 예산이 배정된 프로덕션 사용용인지
- 에이전트 소유자와 그 소비에 대해 책임지는 사람
- 현재 할당량, 초과분(overage) 설정, 실제 소비가 그 목적과 부합하는지

```text
[GitHub Copilot 하네스 에이전트 탐색]
              │
              ▼
[에이전트가 속한 환경 식별]
        │            │
        ▼            ▼
[환경을 메이커      [에이전트 소유자와
 개발/프로덕션으로   책임 비용 소유자
 분류]               식별]
        │            │
        └─────┬──────┘
              ▼
[환경·에이전트의 할당량과 소비 통제 검토]
```

이를 뒷받침하려면 [Power Platform 인벤토리](https://learn.microsoft.com/en-us/power-platform/admin/power-platform-inventory)에서 Copilot Studio 에이전트와 그 에이전트가 속한 환경을 찾는 것부터 시작하세요. 규모가 작다면 PPAC의 인벤토리만으로 충분할 수 있습니다. 대규모라면 [Azure Resource Graph](https://learn.microsoft.com/en-us/power-platform/admin/inventory-sample-queries)나 [Power Platform 인벤토리 API](https://learn.microsoft.com/en-us/power-platform/admin/inventory-api)를 사용해 검토를 반복 가능하게 만드세요.

`isCLIAgent` 속성으로 GitHub Copilot 하네스를 사용하는 에이전트를 식별할 수 있습니다. 이 에이전트들은 디자인 타임의 메이커 환경에서도 Copilot Credit을 소비할 수 있습니다. 아래 요청은 그런 에이전트를 환경 ID·소유자 ID와 함께 반환합니다.

```http
POST https://api.powerplatform.com/resourcequery/resources/query?api-version=2024-10-01
Content-Type: application/json

{
  "TableName": "PowerPlatformResources",
  "Clauses": [
    {
      "$type": "where",
      "FieldName": "type",
      "Operator": "==",
      "Values": ["'microsoft.copilotstudio/agents'"]
    },
    {
      "$type": "where",
      "FieldName": "properties.isCLIAgent",
      "Operator": "==",
      "Values": ["true"]
    },
    {
      "$type": "project",
      "FieldList": [
        "name",
        "properties.displayName",
        "properties.environmentId",
        "properties.ownerId",
        "properties.isCLIAgent"
      ]
    }
  ]
}
```

인벤토리는 에이전트·소유자·환경 사이의 기술적 관계를 반환합니다. 여기에 여러분의 환경 명명 규칙, 환경 그룹, 거버넌스 메타데이터, 승인 기록을 결합하면 분류에 필요한 비즈니스 맥락을 얻을 수 있습니다. 이미 [Copilot Agent Kit](https://microsoft.github.io/mcscatblog/posts/copilot-studio-kit/)이나 [Compliance Hub](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/kit-compliance-hub)를 쓰고 있다면, 그 인벤토리에 프로세스에서 사용하는 시나리오 및 비용 소유권 정보를 덧붙일 수 있습니다.

## 환경 수준 통제 적용

환경을 분류한 뒤에는, 그 환경이 Copilot Credit에 어떻게 접근할 수 있고 가용 용량이 소진되면 어떤 일이 일어나야 하는지 검토하세요.

| 결정 사항 | 사용 가능한 통제 |
|---|---|
| 이 환경에 선불(pre-paid) 용량을 예약해야 하는가? | 환경에 Copilot Credit 할당 |
| 이 환경이 테넌트 풀의 미할당 용량을 끌어다 쓸 수 있는가? | 테넌트 풀 사용(draw) 활성화/비활성화 |
| 승인된 Azure 구독을 통해 소비를 계속할 수 있는가? | 종량제(pay-as-you-go) 과금 활성화/비활성화 |
| 용량에 근접하거나 소진되면 어떻게 되는가? | 경고 알림 구성 또는 추가 소비 차단(Deny) |

메이커 개발 환경은 보통 탐색 활동이 다른 업무용 용량을 잠식하지 않도록 의도적인 경계가 필요합니다. 반면 예산이 배정된 프로덕션 사용에서는 테넌트 풀이나 종량제 접근이 오히려 그 에이전트에 자금을 대는 팀이 소유한 **의도적인 연속성 결정**일 수 있습니다.

적절한 통제를 선택했다면, PPAC 또는 Power Platform API로 구현하세요.

### PPAC에서 할당량과 시행 규칙 구성하기

환경에 선불 크레딧을 할당(예약)하려면 PPAC에서 **라이선스(Licensing)** > **Copilot Studio**로 이동한 뒤 **Copilot Credit 관리(Manage Copilot Credits)**를 선택합니다. 환경을 선택해 필요한 만큼 선불 용량을 할당하고, 그 용량이 소진됐을 때의 동작을 구성하세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-harness-cost-governance/manage-environment-capacity.png' | relative_url }}" alt="Copilot Credit을 할당하고 환경 초과분 통제를 구성하는 PPAC 용량 관리 창" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>관리자는 선택한 환경에 선불 Copilot Credit을 예약할 수 있습니다.</figcaption>
</figure>

누가 크레딧을 할당할 수 있는지는 테넌트의 [추가 기능 용량 할당 설정](https://learn.microsoft.com/en-us/power-platform/admin/tenant-settings)이 좌우합니다. 환경 관리자에게 할당 관리를 허용하면, 그들이 관리하는 환경으로 범위가 제한되지 않습니다. 테넌트 내 **모든** 환경에 대한 할당 권한이 주어집니다. 그런 테넌트 전역 접근이 의도된 것이 아니라면 할당 권한은 테넌트 관리자로 제한해 두세요.

### API로 할당량과 시행 규칙 구성하기

대규모로는 [Update Allocations By Environment](https://learn.microsoft.com/en-us/rest/api/power-platform/licensing/allocations-by-environment/update-allocations-by-environment)를 사용해 환경의 할당량과 시행 규칙을 한 번의 요청으로 구성하세요.

아래 요청은 Copilot Credit 10,000개를 할당하고, 관리자 알림을 켜고, 테넌트 풀 사용을 막고, 종량제 초과분을 허용하며, 추가 소비 차단(Deny)은 비활성 상태로 둡니다. 이 요청은 할당된 크레딧을 포함한 현재 구성을 패치(patch)합니다. 먼저 현재 할당 상태를 읽어 유지해야 할 값을 보존한 뒤, 의도한 전체 구성을 제출하세요.

```http
PATCH https://api.powerplatform.com/licensing/allocationsByEnvironment?api-version=2024-10-01
Content-Type: application/json

{
  "environmentId": "<environment-id>",
  "currencyAllocations": [
    {
      "currencyType": "MCSMessages",
      "allocated": 10000,
      "enforcementRules": [
        { "ruleType": "Alert", "enabled": true },
        { "ruleType": "TenantPool", "enabled": false },
        { "ruleType": "PayGo", "enabled": true },
        { "ruleType": "Deny", "enabled": false }
      ]
    }
  ]
}
```

<div class="info-box note" markdown="1">
이 예제는 프로그래밍 방식 통제를 보여주기 위해 원시 HTTP 호출을 사용했습니다. C#·Python SDK와 원시 HTTP를 쓰는 PowerShell 예제는 [크레딧 할당을 프로그래밍 방식으로 관리하는 Learn 튜토리얼](https://learn.microsoft.com/en-us/power-platform/admin/programmability-tutorial-manage-copilot-credit-allocations)을 참고하세요. [Power Platform for Admins V2 커넥터](https://learn.microsoft.com/en-us/connectors/powerplatformadminv2)의 액션도 곧 제공될 예정입니다.
</div>

### 신규·기존 환경의 통제 상태 점검하기

새 환경은 테넌트 풀 사용이 켜진 상태로 생성될 수 있고, 기존 환경의 구성은 승인된 통제 상태에서 이탈(drift)할 수 있습니다. 주기적인 점검·교정 프로세스는 다음과 같이 구성할 수 있습니다.

1. Power Platform 인벤토리에서 `microsoft.powerplatform/environments`를 조회합니다. 앞서 소개한 인벤토리 API 요청의 리소스 유형 필터만 바꾸면 됩니다.
2. 결과를 여러분의 거버넌스 환경 대장(register)과 비교합니다.
3. 새롭거나 미분류인 환경은 분류하고 승인된 통제를 기록합니다. 기존 환경은 기록된 분류와 승인된 통제를 가져옵니다.
4. [Get Allocations By Environment](https://learn.microsoft.com/en-us/rest/api/power-platform/licensing/allocations-by-environment/get-allocations-by-environment)로 그 환경의 현재 할당량과 시행 규칙을 읽습니다.
5. 현재 구성과 승인된 통제를 비교합니다.
6. 승인된 예외는 유지하고, 그 외의 불일치는 교정합니다.

```text
[환경 인벤토리 스캔]
        │
        ▼
   신규 또는 미분류인가?
     │            │
    예           아니오
     ▼            ▼
[분류하고 승인   [기존 분류와 승인된
 통제 기록]       통제 조회]
     │            │
     └─────┬──────┘
           ▼
[현재 할당량·시행 규칙 읽기]
           │
           ▼
   현재 통제가 일치하는가?
     │            │
    예           아니오
     ▼            ▼
[조치 없음]   승인된 예외인가?
                │        │
               예       아니오
                ▼        ▼
          [조치 없음]  [승인된 구성 적용]
```

4단계에서는 아래 읽기 엔드포인트로 현재 할당량과 시행 규칙을 확인한 뒤 교정이 필요한지 판단합니다.

```http
GET https://api.powerplatform.com/licensing/allocationsByEnvironment/<environment-id>?api-version=2024-10-01
```

## 에이전트 수준 한도 적용

환경 통제는 공유 용량의 경계를 설정합니다. 에이전트 수준 한도는 여기에 더해, 해당 환경이 선불 용량을 쓰든 종량제 과금을 쓰든 관계없이 **개별 사용 사례에 월 단위 경계**를 추가합니다.

메이커 개발 에이전트에서는 얼마나 소비할 수 있는지에 대한 기본값이 과소비를 막는 핵심 통제이며, 반복 가능한 프로세스는 다음과 같습니다.

1. 새로 생성된 GitHub Copilot 하네스 에이전트를 탐지합니다.
2. 그 에이전트가 메이커 개발 환경에 있는지 확인합니다.
3. 조직의 기본 개발 한도를 적용합니다.
4. 에이전트 소유자에게 한도와, 한도에 근접하거나 도달했을 때의 동작을 알립니다.
5. 추가 용량 요청은 적절한 승인 프로세스를 거치도록 라우팅합니다.
6. 에이전트가 예산 배정 프로덕션 사용으로 전환되면 개발 한도를 재검토하거나 교체합니다.

```text
[신규 하네스 에이전트 탐지]
        │
        ▼
   메이커 개발인가?
     │            │
    예           아니오
     ▼            ▼
[기본 개발      [예상 프로덕션
 한도 적용]      사용량에 맞춘 한도 설정]
     │            │
     ▼            │
[에이전트 소유자 통지]│
     │            │
     ▼            │
 추가 용량 요청?    │
   │      │       │
  예     아니오    │
   ▼      │       │
[승인 절차 │       │
 라우팅]   │       │
   └───┬──┴───────┘
       ▼
 [한도 주기적 재검토]
       │
       ▼
   목적이 바뀌었는가? ── 예 ──▶ (메이커 개발 판정으로 복귀)
       │
      아니오 ──▶ (계속 주기적 재검토)
```

이렇게 하면 메이커에게 탐색의 여지를 주면서도 소비가 무제한으로 열려 있지 않게 됩니다. 한도는 사용자가 아니라 **에이전트 단위**로 적용되므로, 기본값과 에스컬레이션 프로세스를 정의할 때 메이커 한 명이 만들 수 있는 에이전트 수를 함께 고려하세요.

프로덕션 에이전트에도 한도를 적용해 공유 용량을 보호할 수 있지만, 그 값은 메이커 개발 기본값을 그대로 물려받는 대신 예상 사용량과 서비스 중요도를 반영해야 합니다.

<div class="info-box note" markdown="1">
에이전트 수준 한도는 환경 전체의 **합산 소비**에는 상한을 두지 못합니다. 2026년 8월 기준으로 Microsoft는 메시지 센터 항목 [MC1451872](https://portal.office.com/adminportal/home/?l=en-US&ref=MessageCenter/:/messages/MC1451872)를 통해 환경 수준 한도를 발표했으며, 이것이 이 공백을 메워 줍니다. 그전까지는 [사용량을 검토하고 과금 정책 연결을 해제해 환경 수준의 추가 소비를 막는 방법](https://microsoft.github.io/mcscatblog/posts/managing-spend-pay-as-you-go/)을 쓸 수 있습니다.
</div>

### PPAC에서 에이전트 한도 구성하기

PPAC에서 **라이선스(Licensing)** > **Copilot Studio** > **에이전트 관리(Manage Agents)**로 이동합니다. 에이전트를 선택해 월별 Copilot Credit 한도를 설정하고, 소비가 한도에 근접할 때 관리자에게 알릴지, 한도에 도달하면 추가 사용을 중단할지 선택하세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-harness-cost-governance/set-agent-limit.png' | relative_url }}" alt="Copilot Credit 한도, 사용 중단 옵션, 알림 임계값이 표시된 PPAC 에이전트 용량 설정 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>관리자는 에이전트 수준 크레딧 한도를 설정하고, 소비가 한도에 근접하거나 도달했을 때의 동작을 선택할 수 있습니다.</figcaption>
</figure>

<div class="info-box warning" markdown="1">
기본 제공 한도 알림은 테넌트 관리자와 환경 관리자에게 전송되며, 반드시 에이전트 소유자에게 가는 것은 아닙니다. 누가 그 알림을 검토하고, 맥락이 필요할 때 누가 소유자에게 연락하며, 누가 한도 상향을 승인하거나 에이전트 중단을 허용할지 정의해 두세요.
</div>

한도 대비 소비 비율에 대한 제품 내장 알림 대신, 관리자가 자체 소비 검토·알림 프로세스를 구현할 수도 있습니다. [Get Many Environment Entitlements](https://learn.microsoft.com/en-us/rest/api/power-platform/licensing/entitlement/get-many-environment-entitlements)는 환경의 사용 권한(entitlement) 소비 데이터를 반환하므로, 이를 근거로 누구에게 무엇을 언제 알릴지 결정하는 모니터링 프로세스를 만들 수 있습니다.

```http
GET https://api.powerplatform.com/licensing/environments/<environment-id>/entitlements?api-version=2024-10-01
```

### API로 에이전트 한도 구성하기

대규모로는 [Update Resource Threshold](https://learn.microsoft.com/en-us/rest/api/power-platform/licensing/resource-threshold/upsert-resource-threshold)로 승인된 한도, 알림 임계값, 중단 동작을 적용하세요. 아래 요청은 한도를 1,000 크레딧으로 설정하고, 80%에서 관리자에게 알리며, 한도 도달 시 추가 소비를 막습니다.

```http
PUT https://api.powerplatform.com/licensing/environments/<environment-id>/entitlements/MCSMessages/resources/<agent-resource-id>/threshold?api-version=2024-10-01
Content-Type: application/json

{
  "stopResource": false,
  "limit": 1000,
  "stopIfOverCapacity": true,
  "notifyIfOverCapacity": true,
  "notificationThreshold": 80
}
```

<div class="info-box warning" markdown="1">
에이전트가 즉시 사용 중단되지 않도록 `stopResource`는 반드시 `false`로 설정하세요. 이 값은 한도와 무관하게 요청 시점에 사용을 중단시키는 용도이며, PPAC의 **에이전트 관리**에서 수행하는 에이전트 중단 액션과 동일하게 동작합니다.
</div>

## 요약

GitHub Copilot 하네스로 만든 에이전트는 크레딧 소비를 관리해야 할 새로운 시나리오를 만들어냅니다. 메이커 개발 시나리오에서는 어느 정도의 탐색을 허용하는 에이전트 한도를 설정하고, 예산이 배정된 프로덕션 사용에는 사용 사례에 맞는 통제와 한도를 시행하면서 통제와 활성화 사이의 균형을 세심하게 잡으세요. 이 프로세스 중 어느 부분을 PPAC에서 관리하고, 어느 부분을 Power Platform API로 자동화하시겠습니까?
