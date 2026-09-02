---
layout: "chapter"
date: 2026-09-01
title: "Copilot Studio의 SharePoint 메타데이터 필터링: 토픽 로직에서 에이전트 판단으로"
short_title: "SharePoint 메타데이터 필터링"
description: "GitHub Copilot 하네스 에이전트가 SharePoint 메타데이터로 적용 대상 문서를 찾고, 지식 검색 범위를 좁히고, 하드코딩된 라우팅 로직 없이 답하는 방법을 설명합니다."
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
  <img src="{{ '/assets/catblog/sharepoint-metadata-filtering/header.png' | relative_url }}" alt="자신만만해 보이는 점쟁이가 메타데이터로 SharePoint 문서를 분류해 주는 삽화. 드디어 쓸모 있는 수정구슬이 등장했습니다." loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

SharePoint 라이브러리에는 겉보기엔 비슷하지만 실제로는 서로 다른 대상에게 적용되는 문서가 자주 섞여 있습니다. 복리후생 정책이 국가별로 다를 수 있고, 제품 안내서가 한 시장에만 적용될 수 있으며, 절차 문서는 상태가 **승인됨(Approved)**일 때만 유효할 수 있습니다.

사람들은 영원할 것처럼 느껴질 만큼 오랫동안 지식 검색에서 SharePoint 메타데이터를 간단히 활용하는 방법을 요청해 왔습니다. 대략 억겁의 시간이 걸렸을 뿐입니다. 안심하세요, 이제 준비됐습니다.

표준 하네스에서는 사용자의 의도에서 SharePoint 메타데이터를 거쳐 일치하는 문서의 URL로 이어지는 간단하고 구성 가능한 경로가 없었습니다. 메이커는 여러 개의 토픽과 범위가 지정된 **생성형 답변 만들기(Create generative answers)** 노드로 이러한 라우팅을 근사할 수 있었지만, 이 노드들은 문서 라이브러리의 메타데이터가 아니라 구성된 원본이나 URL로 검색 범위를 한정했습니다. 새로운 국가, 부서, 문서 상태가 추가될 때마다 유지 관리해야 할 구성이 늘어났습니다.

이제 [GitHub Copilot 하네스](https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/)로 구동되는 에이전트는 이 간극을 메울 수 있습니다. 에이전트는 요청을 해석하고, 메타데이터로 SharePoint 파일을 필터링하고, 일치하는 문서 URL을 수집한 뒤, 그 문서들만 검색할 수 있습니다.

## 사용 사례로 시작하기

모든 SharePoint 문서 라이브러리에는 작성자, 수정 날짜 같은 기본 제공 열이 이미 있으며, 국가·상태·부서 같은 필드를 위한 사용자 지정 열도 추가할 수 있습니다. 라이브러리를 지식 원본으로 추가하고 에이전트에게 질문하면 됩니다. 메이커가 구성해야 할 별도의 메타데이터 도구는 없습니다. 메타데이터가 관련 있을 때 에이전트는 사용 가능한 열을 스스로 파악하고, 기록된 값을 사용해 올바른 파일을 식별하고, 그 문서 집합에서 답할 수 있습니다. 표준 하네스처럼 브랜치마다 토픽을 만드는 방식은 필요하지 않습니다.

`Country` 열이 있는 라이브러리를 예로 들어 보겠습니다. 사용자가 "캐나다에서는 어떤 육아휴직 혜택이 적용되나요?"라고 묻습니다. 에이전트는 `Country` 값이 `Canada`로 기록된 모든 문서를 찾은 다음, 그 파일들 안에서만 육아휴직 관련 정보를 검색할 수 있습니다.

이 점이 중요한 이유는 "캐나다"라는 단어가 정책 본문에는 나타나지 않을 수도 있기 때문입니다. 그 단어는 라이브러리 메타데이터에만 존재할 수 있습니다. 따라서 콘텐츠만 보는 검색은 올바른 문서를 놓치거나, 서로 다른 국가를 위한 정책의 정보를 뒤섞을 수 있습니다.

같은 패턴은 다음과 같은 메타데이터에도 적용됩니다.

- 승인 상태와 검토 날짜
- 부서, 사업부, 대상 독자
- 제품, 서비스, 시장
- 문서 유형, 소유자, 최종 수정 날짜
- 폴더 위치와 파일 유형

끝입니다. 이것이 설정의 전부입니다. SharePoint 문서 라이브러리를 지식 원본으로 추가하세요. 그 외에 구성할 것은 없습니다. 이 글의 나머지를 읽지 않아도 바로 시도해 볼 수 있습니다. 비디오 게임을 하러 가거나, 산악자전거를 타거나, 하고 싶은 걸 하세요.

그래도 계속 읽고 계신가요? 좋습니다, 여기 세부 사항이 있습니다.

## 두 가지 기본 제공 도구, 두 가지 다른 역할

GitHub Copilot 하네스 에이전트는 현재 SharePoint 지식을 위한 두 가지 기본 제공 도구를 받습니다. 각 도구는 고유한 스키마를 가지므로, 에이전트는 둘 중 하나를 호출할지 둘 다 연결해서 호출할지 스스로 판단할 수 있습니다.

| 도구 | 주요 입력 | 반환하는 정보 |
| --- | --- | --- |
| `sharepoint_metadata_filter` | 작성자, 편집자, 날짜, 파일 유형, 폴더, 사용자 지정 열 필터, 포함할 열, 그룹화할 열 | 일치하는 파일 이름과 URL, 열 값, 사용 가능한 열, 실제 일치 건수, 빈 값 건수, 그룹화된 합계 |
| `knowledge_search_sharepoint` | 필수 `query`, 선택적으로 재작성된 `search_query`, 선택적 `scopeUrls` | 선택된 SharePoint 범위 내 검색 결과(문서 제목, URL, 참조 ID 포함) |

메타데이터 도구는 단독으로도 동작할 수 있습니다. 예를 들어 에이전트는 모든 파일을 열어 검색하지 않고도 "국가별로 몇 개의 문서가 배정돼 있나요?"에 답할 수 있습니다. 이를 위해 에이전트는 `sharepoint_metadata_filter`에 다음 입력을 보냅니다.

```json
{
  "groupByColumn": "Country"
}
```
*(에이전트가 sharepoint_metadata_filter에 보낸 입력)*

이 도구는 에이전트에게 표시되는 행뿐 아니라 서버에서 계산된 합계도 반환합니다.

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
*(sharepoint_metadata_filter가 에이전트에 반환한 출력)*

메타데이터가 필요 없는 콘텐츠 질문이라면, 에이전트는 구성된 SharePoint 지식 원본 전체에서 `knowledge_search_sharepoint`를 직접 호출할 수 있습니다.

더 흥미로운 경우는 두 도구를 연결하는 것입니다. `Country` 열이 있는 라이브러리와 "Contoso는 미국에서 어떤 직원 복리후생을 제공하나요?"라는 질문을 예로 들어 보겠습니다. 에이전트는 먼저 `Country = US`로 `sharepoint_metadata_filter`를 호출합니다. 이 호출은 일치하는 파일과 그 URL을 반환합니다. 그런 다음 에이전트는 그 URL들을 지식 검색 도구에 전달할 수 있습니다.

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
*(에이전트가 knowledge_search_sharepoint에 보낸 입력)*

이 도구는 전달된 URL 범위 안에서 검색하고 일치하는 문서를 반환합니다.

```text
[2 results]

Title: Contoso Benefits.docx
URL: https://pplatform.sharepoint.com/.../Contoso Benefits.docx
ReferenceId: turn1doc1

Title: Contoso HR policies.docx
URL: https://pplatform.sharepoint.com/.../Contoso HR policies.docx
ReferenceId: turn1doc2
```
*(knowledge_search_sharepoint가 에이전트에 반환한 출력)*

에이전트가 매번 두 도구를 연결해야 하는 것은 아닙니다. 목록 조회나 집계 질문에는 메타데이터 필터링만, 일반적인 콘텐츠 질문에는 지식 검색만 사용할 수 있고, 메타데이터가 올바른 문서 범위를 결정할 때는 둘 다 사용할 수 있습니다.

## 모든 판단을 스크립트로 짜지 않고도 에이전트를 안내할 수 있습니다

[Knowledge Source Router skill](https://microsoft.github.io/cat-agent-skills/skills/knowledge-source-router/)은 의도적으로 엄격한 국가별 라우팅 워크플로를 보여줍니다. 이 skill은 에이전트에게 라이브러리의 메타데이터를 확인하고, 일치하는 모든 파일을 가져오고, 그 파일 URL들만 검색하고, 배정되지 않았거나 제외된 문서를 보고하도록 지시합니다.

이러한 수준의 안내는 순서가 반드시 반복 가능하고 검사하기 쉬워야 할 때 유용합니다. 하지만 **모든 에이전트에 필요한 것은 아닙니다**. 명확한 에이전트 지침과 잘 설명된 지식 원본이 있다면, 메타데이터 필터링이 언제 관련 있는지, 지식 검색과 어떻게 조합할지를 에이전트가 스스로 판단하도록 둘 수도 있습니다.

사용 사례에 신뢰할 수 있는 결과를 내는 가장 가벼운 안내부터 시작하세요. 테스트 결과 에이전트에 더 엄격한 단계가 필요하다는 것이 확인되면 그때 추가하세요. 재사용 가능한 형태로 안내를 패키징하고 싶다면 [GitHub Copilot 하네스 에이전트에서 Skill이 동작하는 방식](https://microsoft.github.io/mcscatblog/posts/modern-mcs-agent-skills/)을 참고하세요.

<div class="info-box warning" markdown="1">
기본 제공 메타데이터 도구와 지식 검색 도구는 구현 세부 사항이지 공개 API가 아닙니다. 이름, 매개변수, 동작은 예고 없이 변경될 수 있습니다. 특정 내부 도구 계약에 의존하기보다는, 지원되는 Copilot Studio 기능을 기준으로 설계하세요.
</div>

메타데이터 필터링은 답변에 고려되는 콘텐츠 범위를 좁힙니다. SharePoint 권한을 대체하거나 사용자가 읽을 수 없는 문서에 대한 접근을 부여하지 않습니다. SharePoint 권한 트리밍(permission trimming)은 로그인한 사용자에 대해 계속 적용됩니다.

좋은 메타데이터 역시 여전히 필수적입니다. 에이전트는 파일 이름이나 문서 본문에서 국가·상태·소유자를 추측하는 대신, 라이브러리에 기록된 값을 사용해야 합니다.

## 이것으로 무엇이 가능해지나

**라이프사이클을 인식하는 답변.** 라이브러리가 해당 상태를 기록하고 있다면, 에이전트는 승인되고 최신인 문서를 우선하고 초안이나 폐기된 자료를 피할 수 있습니다.

**대상별 맞춤 안내.** 같은 SharePoint 사이트에 여러 부서, 제품, 시장을 위한 자료를 두면서도, 각각에 별도의 지식 원본을 두지 않아도 됩니다.

**라이브러리 인벤토리 질문.** 에이전트는 문서 텍스트에서 답을 추론하려 하는 대신, 라이브러리 메타데이터로부터 "소유자별로 몇 개의 정책이 배정돼 있나요?" 또는 "Country 값이 없는 파일은 어떤 것인가요?" 같은 질문에 답할 수 있습니다.

중요한 변화는 구성할 도구가 하나 더 늘었다는 것이 아닙니다. **어떤 문서가 적용되는지**와 **그 문서가 무엇을 말하는지**를 분리하는 더 단순한 방법이 생겼다는 것입니다. 이는 모든 변형을 또 다른 하드코딩된 라우팅 분기로 만들지 않고도 메타데이터를 인식하는 지식 시나리오를 열어 줍니다.

여러분은 어떤 메타데이터 기반 시나리오를 구축하고 싶으셨나요?
