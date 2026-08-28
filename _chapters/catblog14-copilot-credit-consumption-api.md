---
layout: "chapter"
date: 2026-08-25
title: "Copilot Credit은 어디에 쓰이고 있나요? Power Platform API로 테넌트 전체 현황 구축하기"
short_title: "Copilot Credit 소비 현황"
description: "Power Platform API로 에이전트별 일일 Copilot Credit 소비량을 가져와 Dataverse에 저장하고 테넌트 전체 대시보드를 구축하는 방법을 설명합니다."
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
  <img src="{{ '/assets/catblog/copilot-credit-consumption-api/header.png' | relative_url }}" alt="Copilot Credit 소비 데이터가 Power Platform API를 거쳐 Dataverse와 사용자 지정 대시보드로 흐르는 모습" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

Power Platform 관리 센터는 **라이선싱 > Copilot Studio**에서 테넌트의 Copilot Credit 소비량에 대한 기본 보고서를 제공합니다([Copilot Credit 및 용량 관리](https://learn.microsoft.com/en-us/power-platform/admin/manage-copilot-studio-copilot-credits-capacity)). 많은 조직이 이 보고서에서 시작하는 것이 좋습니다. 보고서를 열람할 수는 있지만 원하는 형태로 바꾸거나 기반 데이터를 직접 소유할 수는 없습니다.

에이전트 하나의 추세와 어떤 채널이 소비를 유발했는지를 함께 보거나, 청구·비청구 소비를 구분하거나, 보고 기간보다 오래 이력을 보존하려는 순간 문제가 됩니다. 이제 GitHub Copilot 하네스가 프로덕션에서 에이전트를 실행할 때뿐 아니라 메이커가 에이전트를 빌드·미리 보기·평가할 때도 크레딧을 소비하므로 더욱 중요합니다.

이 글에서는 테넌트 용량과 리소스별 소비량을 제공하는 Power Platform 라이선싱 엔드포인트, 호출할 때 알아야 할 세부 사항, 그리고 결과를 Dataverse의 일일 이력으로 전환하는 커뮤니티 솔루션을 살펴봅니다.

<div class="info-box note" markdown="1">
**함께 읽을 글.** 비용 관리의 또 다른 축인 용량 할당, 에이전트별 한도 설정과 적용에 관해서는 동료 **Lewis Baybutt**이 [GitHub Copilot 하네스 도입: Copilot Studio의 비용 통제와 거버넌스](https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/)에 정리했습니다. 이 글과 함께 읽어 보세요. 이제부터 가시화할 소비량에 경계를 설정하는 방법을 설명합니다.
</div>

<div class="info-box note" markdown="1">
**샘플.** 이 커뮤니티 솔루션은 PPAC 보고서를 대체하지 않습니다. API 데이터를 가져와 Dataverse에 보존하고 자체 보고서를 구축해야 할 구체적인 이유가 있는 조직을 위한 솔루션입니다. 여기에서 다루는 모든 내용은 일일 흐름, Dataverse 테이블 세 개, 보안 역할, Power Apps Code App을 하나의 솔루션 가져오기로 배포할 수 있는 [copilot-credit-consumption](https://github.com/PetrosFeleskouras/copilot-credit-consumption)에 구현되어 있습니다. 검증된 V2 패키지는 [v2.0.0 릴리스](https://github.com/PetrosFeleskouras/copilot-credit-consumption/releases/tag/v2.0.0)에서 받을 수 있습니다.
</div>

다루는 내용은 다음과 같습니다.

| | 주제 | 요약 |
|---|---|---|
| 1 | Power Platform API | 테넌트 용량과 에이전트별 일일 소비량 가져오기 |
| 2 | 커뮤니티 솔루션 | 데이터를 Dataverse에 보존하고 대시보드로 전환하기 |

## #1 에이전트별 Copilot Credit 소비량 가져오기 및 이해하기

자체 보고 환경을 구축해야 할 때 [Microsoft Power Platform API](https://learn.microsoft.com/rest/api/power-platform/)를 사용하면 `https://api.powerplatform.com`을 통해 테넌트 용량과 일일 리소스 소비량을 확인할 수 있습니다.

**[테넌트 용량](https://learn.microsoft.com/rest/api/power-platform/licensing/entitlement/get-entitlement).** 이 경로는 Copilot Credit의 권한 부여량, 할당량, 소비량, 가용량, 상태, 종량제 값을 반환합니다.

```http
GET https://api.powerplatform.com/licensing/entitlements/MCSMessages?api-version=2024-10-01
```

응답에는 최근 처리가 완료된 사용 날짜도 포함되어 있어 통합에서 상세 소비 데이터가 얼마나 최신인지 판단할 수 있습니다.

**[에이전트별 소비량](https://learn.microsoft.com/rest/api/power-platform/licensing/entitlement-insight/get-tenant-resources-across-environments).** 이 경로는 지정한 기간의 리소스 수준 소비량을 반환합니다. 한 번에 하루씩 요청하면 깔끔한 일일 이력을 만들 수 있습니다.

```http
GET https://api.powerplatform.com/licensing/entitlements/MCSMessages/resources
    ?fromDate={yyyy-MM-dd}
    &toDate={yyyy-MM-dd}
    &includeFields=users%2Ctags%2CasOfDate
    &pageSize=5000
    &continuationtoken={token}
    &api-version=2024-10-01
```

채널, 기능, 모델, 환경 같은 차원이 서로 다르면 API가 같은 날 하나의 에이전트에 대해 여러 행을 반환할 수 있습니다. 모든 페이지를 가져올 때까지 연속 토큰을 따라간 뒤 보고서가 답해야 할 질문에 맞춰 행을 집계하세요.

**반환되는 정보.** 리소스 응답은 다음 정보를 제공할 수 있습니다.

| 정보 | 활용 방법 |
|---|---|
| 에이전트 ID와 표시 이름 | 개별 에이전트 식별 및 비교 |
| 환경 ID | 환경별 소비량 그룹화 |
| 사용 날짜 | 일일 추세 생성 및 이력 보존 |
| 청구·비청구 크레딧 | 용량을 차감하는 항목과 API가 별도로 보고하는 항목 파악 |
| 보고된 사용자 | 반환된 행의 세분성에 맞춰 도입 현황 맥락 추가 |
| 기능, 도구, 모델, 채널, 지식 원본 | 원본이 해당 차원을 제공할 때 소비에 기여한 요소 설명 |

소비량 행에는 환경 이름이 포함되지 않지만 [환경 관리 경로](https://learn.microsoft.com/rest/api/power-platform/environmentmanagement/environments/list-environments-for-user)를 통해 ID에 해당하는 이름을 확인할 수 있습니다.

```http
GET https://api.powerplatform.com/environmentmanagement/environments?api-version=2024-10-01
```

이 엔드포인트들을 함께 사용하면 테넌트 전체의 일일 이력을 만들고, 에이전트와 환경을 비교하고, 청구 소비와 비청구 소비를 구분하며, 제공되는 경우 채널이나 기타 차원 정보를 추가할 수 있습니다.

<div class="info-box note" markdown="1">
**하네스별 원격 분석.** 표준 하네스 에이전트는 기능, 도구, 모델, 채널, 지식 원본 세부 정보를 제공할 수 있습니다. 현재 GitHub Copilot 하네스 에이전트는 기능을 `Process Agent`로 보고하며 도구, 모델, 지식 원본 값은 제공하지 않습니다. 이 필드의 빈 값은 통합에서 데이터가 누락된 것이 아니라 원본 원격 분석의 특성을 반영합니다.
</div>

<div class="info-box note" markdown="1">
**지원 범위.** 핵심 경로와 응답 모델은 Microsoft에서 문서화합니다. 일부 선택적 상세 메타데이터는 공개 참조에 완전히 설명되어 있지 않으므로 통합을 업데이트할 때 보고에 필요한 필드를 테스트하세요.
</div>

## #2 커뮤니티 솔루션으로 데이터 보존 및 대시보드 구축하기

API를 호출하면 오늘의 질문에 답할 수 있습니다. 응답을 보존하면 시간이 지나도 다시 사용하고 비교하고 보고할 수 있는 이력이 됩니다. [copilot-credit-consumption 커뮤니티 솔루션](https://github.com/PetrosFeleskouras/copilot-credit-consumption)은 이 패턴을 Power Platform 솔루션으로 패키징합니다.

상위 수준에서는 다음과 같이 작동합니다.

1. 예약된 Power Automate 흐름이 매일 용량, 리소스 소비량, 환경 엔드포인트를 호출합니다.
2. 처음 실행할 때 최대 180일의 이력을 가져옵니다. 이후 실행에서는 원본 데이터의 업데이트가 자동으로 반영되도록 최근 7일을 새로 고칩니다.
3. Dataverse는 상세 소비 이력, 테넌트 용량 스냅샷, 최신 동기화 상태를 용도별 테이블 세 개에 저장합니다.
4. 포함된 Power Apps Code App이 이 테이블을 읽어 저장된 데이터를 대화형 대시보드로 전환합니다.

이제 데이터가 Dataverse에 있으므로 하나의 API 응답이나 고정된 보고서에 국한되지 않습니다. 자체 정책에 따라 이력을 보존하고, 읽기 전용 보안 역할로 접근을 제어하며, 같은 테이블에 Power BI, Excel 또는 다른 애플리케이션을 연결할 수 있습니다.

포함된 대시보드는 용량 상태, 청구·비청구 추세, 주요 에이전트와 환경, 유연한 필터, 상세 레코드, Excel 내보내기를 제공합니다. API가 채널이나 기타 상세 메타데이터를 제공하면 해당 차원을 사용해 시간에 따른 에이전트의 소비량을 설명할 수도 있습니다.

일일 흐름, Dataverse 테이블, 보안 역할, Code App을 포함한 전체 솔루션은 [v2.0.0 릴리스](https://github.com/PetrosFeleskouras/copilot-credit-consumption/releases/tag/v2.0.0)에서 받을 수 있습니다.

<div class="info-box note" markdown="1">
**커뮤니티 솔루션.** 이 패키지는 표준 Power Platform 구성 요소만으로 만들어져 가져오는 동안 내용을 검사할 수 있으며, 조직의 일반적인 Power Platform 프로세스를 통해 배포할 수 있습니다.
</div>

## 마무리

- **PPAC에서 시작하세요.** 기본 제공 보고서만으로 많은 조직의 요구 사항을 충족할 수 있습니다.
- **다른 방식이 필요할 때 구축하세요.** 자체 보고 환경이 필요하다면 API와 커뮤니티 솔루션을 활용해 만들 수 있습니다.
- **Power Platform API가 원본을 제공합니다.** 테넌트 용량, 에이전트별 일일 소비량, 크레딧이 어디에 쓰였는지 이해하는 데 필요한 차원을 제공합니다.
- **제공되는 세부 정보는 하네스에 따라 다릅니다.** 표준 하네스 에이전트는 더 풍부한 차원을 제공할 수 있지만, 현재 GitHub Copilot 하네스 에이전트가 제공하는 정보는 더 제한적입니다.
- **커뮤니티 솔루션은 데이터를 재사용할 수 있게 합니다.** 일일 흐름이 소비량, 용량, 동기화 정보를 Dataverse에 저장하므로 한 번의 API 호출 이후에도 이력을 계속 사용할 수 있습니다.
- **보고 환경은 직접 선택할 수 있습니다.** 포함된 Code App을 사용하거나 Power BI, Excel 또는 다른 애플리케이션을 연결해 관리자에게 필요한 보기를 만드세요.

Copilot Studio를 대규모로 운영하고 있나요? 현재 소비량을 어떻게 추적하고 계신가요? 관리 센터를 사용하나요, 아니면 직접 구축한 이력을 사용하나요?
