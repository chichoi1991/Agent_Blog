---
layout: "chapter"
date: 2026-09-01
title: "Copilot Studio의 SharePoint 메타데이터 필터링: 토픽 로직에서 에이전트 판단으로"
short_title: "SharePoint 메타데이터 필터링"
description: "GitHub Copilot 하네스 에이전트가 SharePoint 메타데이터를 사용해 해당하는 문서를 찾고, 지식 검색 범위를 좁히고, 하드코딩된 라우팅 로직 없이 답하는 방법을 설명합니다."
order: 15
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/sharepoint-metadata-filtering/"
source_author: "adilei"
source_published: "2026-09-01"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/sharepoint-metadata-filtering/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 adilei(@adilei) 원문 [SharePoint Metadata Filtering in Copilot Studio: From Topic Logic to Agent Decisions](https://microsoft.github.io/mcscatblog/posts/sharepoint-metadata-filtering/)(2026-09-01)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/sharepoint-metadata-filtering/header.png' | relative_url }}" alt="자신만만해 보이는 점쟁이가 메타데이터로 SharePoint 문서를 분류해 준다. 드디어 쓸모 있는 수정 구슬이다." loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

SharePoint 라이브러리에는 겉보기에는 비슷하지만 대상 독자가 다른 문서가 흔히 섞여 있습니다. 복리후생 정책이 국가별로 다를 수 있고, 제품 가이드가 특정 시장에만 적용될 수 있으며, 절차 문서는 상태가 **승인됨(Approved)**일 때만 유효할 수 있습니다.

사람들은 지식 검색에서 SharePoint 메타데이터를 손쉽게 활용할 방법을 아주 오래전부터 요청해 왔습니다. 대략 억겁의 시간이 걸렸을 뿐이죠. 걱정 마세요, 이제 도착했습니다.

표준 하네스에서는 사용자 의도에서 SharePoint 메타데이터를 거쳐 일치하는 문서의 URL로 이어지는 간단하고 구성 가능한 경로가 없었습니다. 메이커는 여러 토픽과 범위가 지정된 **생성형 답변 만들기(Create generative answers)** 노드로 이 라우팅을 흉내 낼 수 있었지만, 이 노드들은 구성된 원본이나 URL로 검색 범위를 좁힐 뿐 문서 라이브러리 메타데이터로는 좁히지 못했습니다. 국가, 부서, 문서 상태가 새로 늘어날 때마다 유지 관리할 구성이 함께 늘어났습니다.

[GitHub Copilot 하네스](https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/)로 구동되는 에이전트는 이제 이 간극을 메울 수 있습니다. 에이전트는 요청을 해석하고, 메타데이터로 SharePoint 파일을 필터링하고, 일치하는 문서 URL을 모은 뒤 그 문서만 검색할 수 있습니다.

## 사용 사례부터 시작하기

모든 SharePoint 문서 라이브러리에는 작성자·수정 날짜 같은 기본 제공 열이 이미 있고, 국가·상태·부서 같은 필드를 위한 사용자 지정 열도 추가할 수 있습니다. 라이브러리를 지식 원본으로 추가하고 에이전트에게 질문하면 됩니다. 메이커가 별도로 구성해야 할 메타데이터 전용 도구는 없습니다. 메타데이터가 관련 있을 때 에이전트는 사용 가능한 열을 스스로 발견하려 시도하고, 기록된 값을 사용해 올바른 파일을 식별한 다음 그 문서 집합에서 답할 수 있습니다. 표준 하네스의 "분기당 토픽" 설정에 상응하는 것은 필요하지 않습니다.

`Country` 열이 있는 라이브러리를 예로 들어 보겠습니다. 사용자가 "캐나다에서는 어떤 육아휴직 복리후생이 적용되나요?"라고 묻습니다. 에이전트는 기록된 `Country` 값이 `Canada`인 모든 문서를 찾은 다음, 그 파일 안에서만 육아휴직 정보를 검색할 수 있습니다.

이것이 중요한 이유는 "Canada"라는 단어가 정책 본문에는 등장하지 않을 수도 있기 때문입니다. 오직 라이브러리 메타데이터에만 존재할 수 있습니다. 콘텐츠만 검색하면 올바른 문서를 놓치거나, 서로 다른 국가를 대상으로 한 정책의 정보를 뒤섞을 수 있습니다.

같은 패턴은 다음과 같은 메타데이터에도 적용됩니다.

- 승인 상태와 검토 날짜
- 부서, 사업 단위, 대상 독자
- 제품, 서비스, 시장
- 문서 유형, 소유자, 최종 수정 날짜
- 폴더 위치와 파일 형식

끝입니다. 필요한 설정은 이게 전부입니다. SharePoint 문서 라이브러리를 지식 원본으로 추가하기만 하면 됩니다. 그 외에는 구성할 게 없습니다. 이 글의 나머지를 읽지 않고도 바로 시도해 볼 수 있습니다. 이제 게임을 하러 가거나, 산악자전거를 타거나, 하고 싶은 걸 하세요.

아직 여기 계신가요? 좋습니다, 자세한 내용을 살펴보겠습니다.

## 두 개의 기본 제공 도구, 두 가지 다른 역할

GitHub Copilot 하네스 에이전트는 현재 SharePoint 지식을 위한 두 가지 기본 제공 도구를 받습니다. 각 도구는 자체 스키마를 가지고 있어, 에이전트는 둘 중 하나를 호출할지 아니면 둘을 연결해 사용할지 스스로 판단할 수 있습니다.

| 도구 | 주요 입력 | 반환하는 것 |
| --- | --- | --- |
| `sharepoint_metadata_filter` | 작성자, 편집자, 날짜, 파일 형식, 폴더, 사용자 지정 열 필터, 포함할 열, 그룹화 기준 열 | 일치하는 파일 이름과 URL, 열 값, 사용 가능한 열, 실제 일치 건수, 공백 건수, 그룹별 합계 |
| `knowledge_search_sharepoint` | 필수 `query`, 선택적으로 다시 작성된 `search_query`, 선택적 `scopeUrls` | 선택된 SharePoint 범위에서의 검색 결과(문서 제목, URL, 참조 ID 포함) |

메타데이터 도구는 단독으로도 동작할 수 있습니다. 예를 들어 에이전트는 모든 파일을 열어 검색하지 않고도 "국가별로 몇 개의 문서가 할당되어 있나요?"에 답할 수 있습니다. 이를 위해 에이전트는 `sharepoint_metadata_filter`에 다음 입력을 보냅니다.

*에이전트가 sharepoint_metadata_filter에 보내는 입력*
```json
{
  "groupByColumn": "Country"
}
```

이 도구는 에이전트에게 표시되는 행뿐 아니라 서버에서 계산한 합계도 반환합니다.

*sharepoint_metadata_filter가 에이전트에 반환하는 출력*
```json
{
  "aggregation": true,
  "groupBy": "Country",
  "totalMatched": 9,
  "blankCount": 6,
  "availableColumns": ["Image Tags", "Country", "Author", "Modified By"],
  "groups": [
    { "value": "US", "count": 2 },
    { "value": "EU", "count": 1 }
  ],
  "backend": "sharepoint_rest"
}
```

메타데이터가 필요 없는 콘텐츠 질문에는 에이전트가 구성된 SharePoint 지식 원본 전체를 대상으로 `knowledge_search_sharepoint`를 직접 호출할 수 있습니다.

더 흥미로운 경우는 두 도구를 연결하는 것입니다. `Country` 열이 있는 라이브러리와 "Contoso는 미국에서 어떤 직원 복리후생을 제공하나요?"라는 질문을 생각해 보세요. 에이전트는 먼저 `Country = US`로 `sharepoint_metadata_filter`를 호출할 수 있습니다. 이 호출은 일치하는 파일과 URL을 반환합니다. 그런 다음 에이전트는 이 URL을 지식 검색 도구에 전달할 수 있습니다.

*에이전트가 knowledge_search_sharepoint에 보내는 입력*
```json
{
  "search_query": "What employee benefits does Contoso offer in the US?",
  "query": "What employee benefits do we offer in the US?",
  "scopeUrls": [
    "https://pplatform.sharepoint.com/Shared%20Documents/Contoso%20HR%20Documents/Contoso%20Benefits.docx",
    "https://pplatform.sharepoint.com/Shared%20Documents/Contoso%20HR%20Documents/Contoso%20HR%20policies.docx"
  ]
}
```

이 도구는 지정된 URL 범위 안에서 검색해 일치하는 문서를 반환합니다.

*knowledge_search_sharepoint가 에이전트에 반환하는 출력*
```text
[2 results]

Title: Contoso Benefits.docx
URL: https://pplatform.sharepoint.com/.../Contoso Benefits.docx
ReferenceId: turn1doc1

Title: Contoso HR policies.docx
URL: https://pplatform.sharepoint.com/.../Contoso HR policies.docx
ReferenceId: turn1doc2
```

에이전트가 매번 두 도구를 반드시 연결해야 하는 것은 아닙니다. 재고·집계 질문에는 메타데이터 필터링만, 일반적인 콘텐츠 질문에는 지식 검색만 사용할 수 있고, 메타데이터가 올바른 문서 범위를 결정할 때만 둘 다 사용할 수도 있습니다.

## 모든 판단을 스크립트화하지 않고도 에이전트를 유도할 수 있습니다

[Knowledge Source Router Skill](https://microsoft.github.io/cat-agent-skills/skills/knowledge-source-router/)은 의도적으로 엄격한 국가별 라우팅 워크플로를 보여줍니다. 이 Skill은 에이전트에게 라이브러리 메타데이터를 검사하고, 일치하는 모든 파일을 가져오고, 그 파일 URL만 검색하고, 할당되지 않았거나 제외된 문서를 보고하라고 지시합니다.

순서가 반복 가능하고 검사하기 쉬워야 할 때는 이런 수준의 안내가 유용합니다. 하지만 **모든 에이전트에 필요한 것은 아닙니다.** 명확한 에이전트 지침과 잘 설명된 지식 원본이 있다면, 메타데이터 필터링이 언제 관련 있는지, 지식 검색과 어떻게 조합할지를 에이전트가 스스로 판단하도록 맡길 수도 있습니다.

사용 사례에 신뢰할 만한 결과를 내는 가장 가벼운 안내부터 시작하세요. 테스트 결과 에이전트에 더 엄격한 단계가 필요하다고 나타나면 그때 추가하세요. 재사용 가능한 안내를 패키지로 만들고 싶다면 [GitHub Copilot 하네스 에이전트에서 Skill이 동작하는 방식](https://microsoft.github.io/mcscatblog/posts/modern-mcs-agent-skills/)을 참고하세요.

<div class="info-box warning" markdown="1">
기본 제공 메타데이터·지식 검색 도구는 공개 API가 아니라 구현 세부 사항입니다. 이름, 매개변수, 동작은 예고 없이 바뀔 수 있습니다. 특정 내부 도구 계약에 의존하기보다는 지원되는 Copilot Studio 기능을 기준으로 설계하세요.
</div>

메타데이터 필터링은 답변에 고려되는 콘텐츠 범위를 좁힐 뿐입니다. SharePoint 권한을 대체하거나 사용자가 읽을 수 없는 문서에 대한 접근 권한을 부여하지 않습니다. SharePoint 권한 트리밍(permission trimming)은 로그인한 사용자에게 계속 적용됩니다.

좋은 메타데이터도 여전히 필수입니다. 에이전트는 파일 이름이나 문서 본문에서 국가·상태·소유자를 추측하는 것이 아니라, 라이브러리에 기록된 값을 사용해야 합니다.

## 이것으로 가능해지는 것

**수명 주기를 인식하는 답변.** 라이브러리가 해당 상태를 기록하고 있다면, 에이전트는 승인되고 최신인 문서를 우선하고 초안이나 폐기된 자료는 피할 수 있습니다.

**대상 독자별 안내.** 같은 SharePoint 사이트에 여러 부서·제품·시장을 위한 자료가 있어도 각각을 위한 별도 지식 원본을 만들 필요가 없습니다.

**라이브러리 재고 질문.** 에이전트는 "각 소유자에게 몇 개의 정책이 할당되어 있나요?" 또는 "어떤 파일에 Country 값이 없나요?" 같은 질문에, 문서 본문에서 답을 추론하려 하기보다 라이브러리 메타데이터로부터 답할 수 있습니다.

중요한 변화는 구성해야 할 도구가 하나 더 늘어난 것이 아닙니다. **어떤 문서가 해당하는지**와 **그 문서가 무엇을 말하는지**를 더 간단하게 분리하는 방법입니다. 이는 모든 변형을 또 다른 하드코딩된 라우팅 분기로 만들지 않고도 메타데이터를 인식하는 지식 시나리오를 열어 줍니다.

어떤 메타데이터 기반 시나리오를 만들고 싶으셨나요?
