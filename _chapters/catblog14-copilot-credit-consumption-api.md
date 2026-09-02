---
layout: "chapter"
date: 2026-08-25
title: "Copilot Credit은 어디로 소비되고 있나요? Power Platform API로 테넌트 전체 뷰 만들기"
short_title: "Copilot Credit 소비 API"
description: "Power Platform API로 에이전트별 일일 Copilot Credit 소비량을 가져와 Dataverse에 저장하고, 테넌트 전체 대시보드를 구축하는 방법을 설명합니다."
order: 14
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/copilot-credit-consumption-api/"
source_author: "PetrosFeleskouras"
source_published: "2026-08-25"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/copilot-credit-consumption-api/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 PetrosFeleskouras(@PetrosFeleskouras) 원문 [Where Are Your Copilot Credits Going? Build a Tenant-Wide View with the Power Platform API](https://microsoft.github.io/mcscatblog/posts/copilot-credit-consumption-api/)(2026-08-25)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-credit-consumption-api/header.png' | relative_url }}" alt="Power Platform API를 통해 흘러들어온 Copilot Credit 소비 데이터가 Dataverse와 커스텀 대시보드로 이어지는 모습" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

Power Platform 관리 센터(Power Platform admin center)는 **라이선싱(Licensing) > Copilot Studio**([Copilot Credit 및 용량 관리](https://learn.microsoft.com/en-us/power-platform/admin/manage-copilot-studio-copilot-credits-capacity)) 아래에서 테넌트의 Copilot Credit 소비에 대한 기본 제공 보고서를 제공합니다. 많은 조직에게 이 보고서는 출발점이 되어야 합니다. 읽을 수는 있지만, 형태를 바꾸거나 원본 데이터를 직접 소유할 수는 없습니다.

이는 헤드라인 지표 이상의 것을 원하는 순간 문제가 됩니다. 예를 들어 특정 에이전트의 추세선과 함께 어떤 채널이 그 소비를 유발했는지 보여주거나, 과금/비과금 구분을 나누거나, 보고 기간을 넘어서는 이력을 원할 때입니다. GitHub Copilot 하네스가 프로덕션에서 에이전트가 실행 중일 때뿐 아니라 메이커가 에이전트를 빌드·미리보기·평가하는 동안에도 크레딧을 소비하는 지금, 이 문제는 더욱 중요해졌습니다.

이 글에서는 테넌트 용량과 리소스별 소비량을 노출하는 Power Platform 라이선싱 엔드포인트, 이를 호출할 때 중요한 세부 사항, 그리고 결과를 Dataverse의 일일 이력으로 바꿔주는 커뮤니티 솔루션을 다룹니다.

<div class="info-box note" markdown="1">
**관련 글.** 비용 관리의 나머지 절반인 용량 할당, 에이전트별 한도 설정, 시행에 대해서는 동료 **Lewis Baybutt**가 쓴 [Copilot Studio에서 GitHub Copilot 하네스 도입하기: 비용 통제와 거버넌스](https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/)를 함께 읽어 보세요. 지금 여러분이 가시화하려는 소비에 어떻게 경계를 두는지 보여줍니다.
</div>

<div class="info-box note" markdown="1">
**이 샘플에 대해.** 이 커뮤니티 솔루션은 PPAC 보고서를 대체하는 것이 아닙니다. API 데이터를 가져와 Dataverse에 보관하고 자체 보고서를 만들어야 할 구체적인 이유가 있는 조직을 위한 것입니다. 여기서 다루는 모든 내용은 [copilot-credit-consumption](https://github.com/PetrosFeleskouras/copilot-credit-consumption)에 구현돼 있습니다. 일일 플로우, 세 개의 Dataverse 테이블, 보안 역할, Power Apps Code App으로 구성되며 하나의 솔루션 가져오기로 배포할 수 있습니다. 검증된 V2 패키지는 [v2.0.0 릴리스](https://github.com/PetrosFeleskouras/copilot-credit-consumption/releases/tag/v2.0.0)에서 확인할 수 있습니다.
</div>

다룰 내용:

| | 주제 | 요약 |
|---|---|---|
| 1 | Power Platform API | 테넌트 용량과 에이전트별 일일 소비량 가져오기 |
| 2 | 커뮤니티 솔루션 | 데이터를 Dataverse에 보관하고 대시보드로 전환 |

## #1 에이전트별 Copilot Credit 소비량 가져오기와 이해

자체 보고 경험을 구축해야 할 때, [Microsoft Power Platform API](https://learn.microsoft.com/rest/api/power-platform/)는 `https://api.powerplatform.com`을 통해 테넌트 용량과 일일 리소스 소비량을 노출합니다.

**[테넌트 용량(Tenant capacity)](https://learn.microsoft.com/rest/api/power-platform/licensing/entitlement/get-entitlement).** 이 경로는 Copilot Credit에 대한 부여량, 할당량, 소비량, 사용 가능량, 상태, 종량제(pay-as-you-go) 값을 반환합니다.

```http
GET https://api.powerplatform.com/licensing/entitlements/MCSMessages?api-version=2024-10-01
```

응답에는 가장 최근에 완료된 사용 날짜도 포함되어, 통합이 세부 소비 데이터가 얼마나 최신인지 알 수 있게 해줍니다.

**[에이전트별 소비량(Per-agent consumption)](https://learn.microsoft.com/rest/api/power-platform/licensing/entitlement-insight/get-tenant-resources-across-environments).** 이 경로는 특정 날짜 범위에 대한 리소스 단위 소비량을 반환합니다. 한 번에 하루씩 요청하면 깔끔한 일일 이력을 얻을 수 있습니다.

```http
GET https://api.powerplatform.com/licensing/entitlements/MCSMessages/resources
    ?fromDate={yyyy-MM-dd}
    &toDate={yyyy-MM-dd}
    &includeFields=users%2Ctags%2CasOfDate
    &pageSize=5000
    &continuationtoken={token}
    &api-version=2024-10-01
```

채널, 기능, 모델, 환경 같은 차원이 다르면 API는 같은 날짜에 대해 한 에이전트에 여러 행을 반환할 수 있습니다. 모든 페이지를 가져올 때까지 연속 토큰(continuation token)을 따라가고, 보고서가 답해야 할 질문에 맞춰 행을 집계하세요.

**받게 되는 정보.** 리소스 응답은 다음을 제공할 수 있습니다.

| 정보 | 도움이 되는 방식 |
|---|---|
| 에이전트 ID와 표시 이름 | 개별 에이전트를 식별하고 비교 |
| 환경 ID | 환경별로 소비량을 그룹화 |
| 사용 날짜 | 일일 추세를 만들고 이력을 보존 |
| 과금/비과금 크레딧 | 용량을 차감하는 항목과 API가 별도로 보고하는 항목을 구분 |
| 보고된 사용자 | 반환된 행 단위로 도입(adoption) 맥락을 추가 |
| 기능, 도구, 모델, 채널, 지식 원본 | 원본이 해당 차원을 제공할 때 무엇이 소비에 기여했는지 설명 |

소비량 행에는 환경 이름이 포함되지 않지만, [환경 관리 경로](https://learn.microsoft.com/rest/api/power-platform/environmentmanagement/environments/list-environments-for-user)로 ID를 이름으로 변환할 수 있습니다.

```http
GET https://api.powerplatform.com/environmentmanagement/environments?api-version=2024-10-01
```

이 엔드포인트들을 함께 사용하면 테넌트 전체의 일일 이력을 만들고, 에이전트와 환경을 비교하고, 과금/비과금 소비를 분리하고, 사용 가능한 경우 채널이나 다른 차원 맥락을 추가할 수 있습니다.

<div class="info-box note" markdown="1">
**하네스별 텔레메트리.** 표준 하네스 에이전트는 기능, 도구, 모델, 채널, 지식 원본 세부 정보를 제공할 수 있습니다. GitHub Copilot 하네스 에이전트는 현재 기능을 `Process Agent`로 보고하며 도구, 모델, 지식 원본 값은 제공하지 않습니다. 이 필드들의 빈 값은 통합의 누락된 데이터가 아니라 원본 텔레메트리 자체를 반영한 것입니다.
</div>

<div class="info-box note" markdown="1">
**지원 경계.** 핵심 경로와 응답 모델은 Microsoft가 문서화합니다. 일부 선택적 상세 메타데이터는 공개 참조 문서에 완전히 설명돼 있지 않으므로, 통합을 업데이트할 때 여러분의 보고서가 의존하는 필드를 테스트하세요.
</div>

## #2 커뮤니티 솔루션으로 데이터를 보존하고 대시보드 구축하기

API를 호출하면 오늘의 질문에 답할 수 있습니다. 응답을 보존하면 재사용하고 비교하고 시간에 따라 보고할 수 있는 이력이 생깁니다. [copilot-credit-consumption 커뮤니티 솔루션](https://github.com/PetrosFeleskouras/copilot-credit-consumption)은 이 패턴을 Power Platform에 패키징합니다.

큰 틀에서 다음과 같이 동작합니다.

1. 예약된 Power Automate 플로우가 매일 용량, 리소스 소비, 환경 엔드포인트를 호출합니다.
2. 최초 실행에서는 최대 180일치 이력을 가져옵니다. 이후 실행은 최근 7일을 새로고침하여 원본 업데이트가 자동으로 반영되도록 합니다.
3. Dataverse는 세 개의 전용 테이블에 상세 소비 이력, 테넌트 용량 스냅샷, 최신 동기화 상태를 저장합니다.
4. 포함된 Power Apps Code App이 이 테이블을 읽어 대화형 대시보드로 전환합니다.

데이터가 이제 Dataverse에 있으므로, 하나의 API 응답이나 고정된 보고서 하나에 국한되지 않습니다. 여러분의 정책에 따라 이력을 보존하고, 읽기 전용 보안 역할로 접근을 통제하며, 같은 테이블에 Power BI, Excel 또는 다른 애플리케이션을 연결할 수 있습니다.

포함된 대시보드는 용량 상태, 과금/비과금 추세, 상위 에이전트와 환경, 유연한 필터, 상세 레코드, Excel 내보내기를 제공합니다. API가 채널이나 다른 상세 메타데이터를 제공하는 곳에서는 이 차원들을 사용해 시간에 따른 에이전트 소비를 설명할 수도 있습니다.

일일 플로우, Dataverse 테이블, 보안 역할, Code App을 포함한 전체 솔루션은 [v2.0.0 릴리스](https://github.com/PetrosFeleskouras/copilot-credit-consumption/releases/tag/v2.0.0)에서 확인할 수 있습니다.

<div class="info-box note" markdown="1">
**커뮤니티 솔루션.** 표준 Power Platform 구성 요소만으로 만들어졌기 때문에, 가져오기(import) 중에 패키지를 검사할 수 있고 조직의 일반적인 Power Platform 프로세스를 통해 배포할 수 있습니다.
</div>

## 마무리

- **PPAC부터 시작하세요.** 기본 제공 보고서만으로 많은 조직의 요구를 충족할 수 있습니다.
- **다른 것이 필요할 때 직접 구축하세요.** 자체 보고 경험이 필요하다면 API와 커뮤니티 솔루션이 그 길을 제공합니다.
- **Power Platform API가 원본입니다.** 테넌트 용량, 에이전트별 일일 소비량, 크레딧이 어디서 쓰이는지 이해하는 데 필요한 차원을 노출합니다.
- **제공되는 세부 정보는 하네스에 따라 다릅니다.** 표준 하네스 에이전트는 더 풍부한 차원을 제공할 수 있는 반면, GitHub Copilot 하네스 에이전트는 현재 더 제한적인 뷰를 제공합니다.
- **커뮤니티 솔루션이 데이터를 재사용 가능하게 만듭니다.** 일일 플로우가 소비, 용량, 동기화 정보를 Dataverse에 저장해 단일 API 호출을 넘어서는 이력을 남깁니다.
- **보고 경험은 여러분이 선택합니다.** 포함된 Code App을 쓰거나 Power BI, Excel, 또는 다른 애플리케이션을 연결해 관리자에게 필요한 뷰를 구축하세요.

Copilot Studio를 대규모로 운영하고 계신가요? 오늘날 소비를 어떻게 추적하고 계신가요, 관리 센터인가요 아니면 직접 구축한 이력인가요?
