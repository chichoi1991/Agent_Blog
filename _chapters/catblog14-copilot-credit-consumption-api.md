---
layout: "chapter"
date: 2026-08-25
title: "Copilot Credit는 어디로 가고 있을까? Power Platform API로 테넌트 전체 현황 만들기"
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
  <img src="{{ '/assets/catblog/copilot-credit-consumption-api/header.png' | relative_url }}" alt="Power Platform API를 거쳐 Dataverse와 사용자 지정 대시보드로 흘러가는 Copilot Credit 소비량" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

Power Platform 관리 센터는 **라이선싱 > Copilot Studio**([Copilot Credit 및 용량 관리](https://learn.microsoft.com/en-us/power-platform/admin/manage-copilot-studio-copilot-credits-capacity)) 아래에서 테넌트의 Copilot Credit 소비량에 대한 기본 제공 보고서를 제공합니다. 많은 조직에게 이 보고서가 출발점이 되어야 합니다. 읽을 수는 있지만, 형태를 바꾸거나 원본 행을 직접 소유할 수는 없습니다.

헤드라인 수치를 넘어선 무언가를 원하는 순간 문제가 생깁니다. 어떤 채널이 소비를 유발했는지 함께 보여주는 특정 에이전트의 추세선, 청구 대상과 비청구 대상의 구분, 또는 보고 기간을 넘어서는 이력 같은 것들입니다. GitHub Copilot 하네스가 에이전트가 프로덕션에서 실행될 때뿐 아니라 메이커가 에이전트를 빌드·미리 보기·평가하는 동안에도 크레딧을 청구한다는 점에서 이는 더욱 중요합니다.

이 글에서는 테넌트 용량과 리소스별 소비량을 노출하는 Power Platform 라이선싱 엔드포인트, 이를 호출할 때 중요한 세부 사항, 그리고 그 결과를 Dataverse의 일일 이력으로 바꾸는 커뮤니티 솔루션을 다룹니다.

<div class="info-box tip" markdown="1">
**함께 보면 좋은 글.** 비용 관리의 나머지 절반인 용량 할당, 에이전트별 한도 설정, 그리고 이를 강제하는 방법에 관해서는 동료 **Lewis Baybutt**가 쓴 [GitHub Copilot 하네스 도입: Copilot Studio의 비용 관리와 거버넌스](https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/)를 함께 읽어 보세요. 지금 보이게 만들려는 소비량에 어떻게 경계를 두는지 보여줍니다.
</div>

<div class="info-box tip" markdown="1">
**이 샘플에 대하여.** 이 커뮤니티 솔루션은 PPAC 보고서를 대체하지 않습니다. API 데이터를 가져와 Dataverse에 보관하고 자체 보고서를 만들어야 할 구체적인 이유가 있는 조직을 위한 것입니다. 여기서 다루는 모든 내용은 [copilot-credit-consumption](https://github.com/PetrosFeleskouras/copilot-credit-consumption)에 구현되어 있으며, 단일 솔루션 가져오기로 배포할 수 있는 일일 플로우, 세 개의 Dataverse 테이블, 보안 역할, Power Apps 코드 앱으로 구성됩니다. 검증된 V2 패키지는 [v2.0.0 릴리스](https://github.com/PetrosFeleskouras/copilot-credit-consumption/releases/tag/v2.0.0)에서 확인할 수 있습니다.
</div>

다루는 내용:

| | 주제 | 요약 |
|---|---|---|
| 1 | Power Platform API | 테넌트 용량과 에이전트별 일일 소비량 가져오기 |
| 2 | 커뮤니티 솔루션 | 데이터를 Dataverse에 보관하고 대시보드로 만들기 |

## #1 에이전트별 Copilot Credit 소비량 가져오고 이해하기

자체 보고 환경을 구축해야 할 때, [Microsoft Power Platform API](https://learn.microsoft.com/rest/api/power-platform/)는 `https://api.powerplatform.com`을 통해 테넌트 용량과 일일 리소스 소비량을 노출합니다.

**[테넌트 용량](https://learn.microsoft.com/rest/api/power-platform/licensing/entitlement/get-entitlement).** 이 경로는 Copilot Credit에 대한 자격 부여(entitled), 할당(allocated), 소비(consumed), 사용 가능(available), 상태, 종량제(pay-as-you-go) 값을 반환합니다.

```http
GET https://api.powerplatform.com/licensing/entitlements/MCSMessages?api-version=2024-10-01
```

응답에는 가장 최근에 완료된 사용 날짜도 포함되어 있어, 통합이 상세 소비 데이터의 최신성을 파악하는 데 도움이 됩니다.

**[에이전트별 소비량](https://learn.microsoft.com/rest/api/power-platform/licensing/entitlement-insight/get-tenant-resources-across-environments).** 이 경로는 지정한 날짜 범위에 대한 리소스 수준 소비량을 반환합니다. 한 번에 하루씩 요청하면 깔끔한 일일 이력을 얻을 수 있습니다.

```http
GET https://api.powerplatform.com/licensing/entitlements/MCSMessages/resources
    ?fromDate={yyyy-MM-dd}
    &toDate={yyyy-MM-dd}
    &includeFields=users%2Ctags%2CasOfDate
    &pageSize=5000
    &continuationtoken={token}
    &api-version=2024-10-01
```

채널, 기능, 모델, 환경 같은 차원이 서로 다르면 API는 같은 날짜에 대해 한 에이전트에 여러 행을 반환할 수 있습니다. 모든 페이지를 가져올 때까지 연속 토큰(continuation token)을 따라가고, 그런 다음 보고서가 답해야 하는 질문에 맞춰 행을 집계하세요.

**돌아오는 데이터.** 리소스 응답은 다음을 제공할 수 있습니다.

| 정보 | 도움이 되는 방식 |
|---|---|
| 에이전트 ID와 표시 이름 | 개별 에이전트를 식별하고 비교 |
| 환경 ID | 환경별로 소비량을 그룹화 |
| 사용 날짜 | 일일 추세를 만들고 이력을 보관 |
| 청구 대상과 비청구 대상 크레딧 | 용량을 소진하는 항목과 API가 별도로 보고하는 항목을 구분 |
| 보고된 사용자 | 반환된 행 단위로 도입 현황(adoption) 맥락을 추가 |
| 기능, 도구, 모델, 채널, 지식 원본 | 원본이 이러한 차원을 제공할 때 소비에 무엇이 기여했는지 설명 |

환경 이름은 소비량 행에 포함되지 않지만, [환경 관리 경로](https://learn.microsoft.com/rest/api/power-platform/environmentmanagement/environments/list-environments-for-user)로 해당 ID를 확인할 수 있습니다.

```http
GET https://api.powerplatform.com/environmentmanagement/environments?api-version=2024-10-01
```

이 엔드포인트들을 함께 사용하면 테넌트 전체의 일일 이력을 만들고, 에이전트와 환경을 비교하고, 청구 대상과 비청구 대상 소비량을 분리하고, 사용 가능한 곳에서는 채널 등 차원별 맥락을 추가할 수 있습니다.

<div class="info-box note" markdown="1">
**하네스별 원격 측정(telemetry).** 표준 하네스 에이전트는 기능, 도구, 모델, 채널, 지식 원본 세부 정보를 제공할 수 있습니다. GitHub Copilot 하네스 에이전트는 현재 기능을 `Process Agent`로 보고하며 도구·모델·지식 원본 값은 제공하지 않습니다. 이러한 필드가 비어 있는 것은 통합에서 데이터가 누락된 것이 아니라 원본 원격 측정을 그대로 반영한 것입니다.
</div>

<div class="info-box note" markdown="1">
**지원 범위.** 핵심 경로와 응답 모델은 Microsoft가 문서화합니다. 일부 선택적 상세 메타데이터는 공개 참조 문서에 완전히 설명되어 있지 않으므로, 통합을 업데이트할 때 보고서가 의존하는 필드를 직접 테스트하세요.
</div>

## #2 커뮤니티 솔루션으로 데이터를 보관하고 대시보드 만들기

API를 호출하면 오늘의 질문에 답할 수 있습니다. 그 응답을 보관하면 재사용하고 비교하고 시간에 따라 보고할 수 있는 이력이 생깁니다. [copilot-credit-consumption 커뮤니티 솔루션](https://github.com/PetrosFeleskouras/copilot-credit-consumption)은 이 패턴을 Power Platform 패키지로 만들어 줍니다.

큰 틀에서는 다음과 같이 동작합니다.

1. 예약된 Power Automate 플로우가 매일 용량, 리소스 소비량, 환경 엔드포인트를 호출합니다.
2. 첫 실행에서는 최대 180일치 이력을 가져옵니다. 이후 실행은 가장 최근 7일을 새로 고쳐 원본 업데이트를 자동으로 반영합니다.
3. Dataverse는 세 개의 전용 테이블에 상세 소비 이력, 테넌트 용량 스냅숏, 최신 동기화 상태를 저장합니다.
4. 포함된 Power Apps 코드 앱이 이 테이블을 읽어 저장된 데이터를 대화형 대시보드로 만듭니다.

데이터가 이제 Dataverse에 존재하므로 더 이상 하나의 API 응답이나 고정된 보고서 하나에 국한되지 않습니다. 자체 정책에 따라 이력을 보관하고, 읽기 전용 보안 역할로 접근을 제어하고, Power BI·Excel·다른 애플리케이션을 같은 테이블에 연결할 수 있습니다.

포함된 대시보드는 용량 상태, 청구 대상·비청구 대상 추세, 상위 에이전트와 환경, 유연한 필터, 상세 레코드, Excel 내보내기를 제공합니다. API가 채널 등 풍부한 메타데이터를 제공하는 경우, 이러한 차원을 사용해 시간에 따른 에이전트 소비량을 설명할 수도 있습니다.

일일 플로우, Dataverse 테이블, 보안 역할, 코드 앱을 포함한 전체 솔루션은 [v2.0.0 릴리스](https://github.com/PetrosFeleskouras/copilot-credit-consumption/releases/tag/v2.0.0)에서 확인할 수 있습니다.

<div class="info-box tip" markdown="1">
**커뮤니티 솔루션.** 표준 Power Platform 구성 요소만으로 만들어졌기 때문에, 가져오기 과정에서 패키지를 직접 살펴볼 수 있고 조직의 일반적인 Power Platform 프로세스를 통해 배포할 수 있습니다.
</div>

## 마무리

- **PPAC부터 시작하세요.** 기본 제공 보고서만으로도 많은 조직의 요구를 충족할 수 있습니다.
- **다른 것이 필요할 때 직접 만드세요.** 자체 보고 환경이 필요하다면 API와 커뮤니티 솔루션이 이를 만들 수 있는 경로를 제공합니다.
- **Power Platform API가 원본입니다.** 테넌트 용량, 에이전트별 일일 소비량, 크레딧이 어디에 쓰이는지 이해하는 데 필요한 차원을 노출합니다.
- **제공되는 상세 정보는 하네스에 따라 다릅니다.** 표준 하네스 에이전트는 더 풍부한 차원을 제공할 수 있고, GitHub Copilot 하네스 에이전트는 현재 더 제한적인 시야를 제공합니다.
- **커뮤니티 솔루션은 데이터를 재사용 가능하게 만듭니다.** 일일 플로우가 소비량·용량·동기화 정보를 Dataverse에 저장하므로 이력이 단일 API 호출을 넘어 계속 남아 있습니다.
- **보고 환경은 직접 선택합니다.** 포함된 코드 앱을 쓰거나, Power BI·Excel·다른 애플리케이션을 연결해 관리자에게 필요한 화면을 만드세요.

Copilot Studio를 대규모로 운영 중이신가요? 오늘 소비량을 어떻게 추적하고 계신가요, 관리 센터인가요 아니면 직접 만든 이력인가요?
