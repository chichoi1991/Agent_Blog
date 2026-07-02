---
layout: "chapter"
title: "Copilot Studio에서 PDF 페이지 단위 인용 구현하기"
short_title: "PDF 페이지 단위 인용"
description: "SharePoint 및 업로드 파일 지식 소스를 사용하는 Copilot Studio에서 페이지 단위 PDF 인용을 구현해 사용자가 답변 근거가 된 정확한 페이지로 바로 이동하게 하는 방법."
order: 5
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/pdf-page-level-citations/"
source_author: "lewisdoesdevraemone"
source_published: "2026-06-02"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/pdf-page-level-citations/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 lewisdoesdevraemone(@lewisdoesdevraemone) 원문 [Page-Level PDF Citations in Copilot Studio](https://microsoft.github.io/mcscatblog/posts/pdf-page-level-citations/)(2026-06-02)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/pdf-page-level-citations/header.png' | relative_url }}" alt="PDF 문서에서 정확한 페이지를 찾는 모습" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

Copilot Studio는 긴 PDF 파일에서 답변을 제공할 수 있지만, 기본 인용은 문서의 처음으로 사용자를 돌려보냅니다. 유지보수 절차를 확인하는 현장 엔지니어, 정책 조항을 검증하는 컴플라이언스 담당자, 투약 지침을 확인하는 의료 종사자에게 이 차이는 답변을 신뢰하는 것과 소스를 찾느라 10분을 보내는 것 사이의 차이입니다.

페이지 단위 인용이 해답입니다. 문서 루트로 링크하는 대신, 답변 근거가 된 특정 페이지 번호를 포함한 인용 URL이 필요합니다.

이 글은 Copilot Studio에서 PDF 페이지 단위 인용을 구현하는 방법을 보여줍니다. 사용하는 지식 소스에 따라 두 가지 시나리오를 다루며, 페이지 마커 반환 방식의 차이점과 다른 모델로 테스트할 때 주의할 점도 살펴봅니다.

## 패턴

이 글의 두 접근 방식 모두 Copilot Studio의 동일한 인터셉션 메커니즘을 사용합니다. 생성형 오케스트레이션이 지식 기반의 응답을 생성할 때 `OnGeneratedResponse` 트리거가 발생합니다. 이 트리거에 반응하는 토픽을 사용하면 다음에 접근할 수 있습니다:

- **`System.Response.FormattedText`** — 인용 푸터를 포함한 전체 응답 텍스트
- **`System.Response.Citations`** — `Name`, `Url`, `Text` 열이 있는 인용 테이블

기본 인용 푸터는 다음과 같습니다:

```text
Here is the relevant information from the manual...

[1]: https://contoso.sharepoint.com/docs/manual.pdf "manual.pdf"
```

우리가 원하는 것:

```text
Here is the relevant information from the manual...

[1]: https://contoso.sharepoint.com/docs/manual.pdf#page=37 "manual.pdf"
```

두 시나리오 모두 접근 방식은 같습니다: 먼저 생성된 응답을 인터셉트하고, 인용 텍스트에서 페이지 마커를 파싱하며, PDF URL에 `#page=N`을 추가해 인용 푸터를 다시 빌드하고, `System.ContinueResponse = false`를 사용해 기본 응답을 억제합니다.

두 접근 방식이 다른 점은 **페이지 마커 형식**과 **URL 처리**입니다. SharePoint와 업로드 파일 지식 소스는 인용을 다르게 반환하기 때문입니다.

| | SharePoint 지식 소스 | 업로드 파일(비정형 데이터) |
|---|---|---|
| **페이지 마커 형식** | `<page_X>` | `<page value=X>` |
| **인용 URL** | 이미 SharePoint를 가리킴 | 외부 URL로 교체 필요 |
| **주요 샘플 사용 사례** | 기존 SharePoint 인용 개선 | 내부 인용을 외부 URL로 교체 |

## SharePoint를 지식 소스로 사용하는 경우

에이전트가 [SharePoint를 지식 소스로](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-sharepoint) 사용하는 경우, 인용은 이미 올바른 SharePoint 문서를 가리킵니다. 여기서 목표는 페이지 번호를 추가해 사용자가 클릭했을 때 올바른 페이지에 도달하게 하는 것뿐입니다.

### 모델 동작과 인용 출력

SharePoint의 PDF로 생성된 답변이 근거할 때, `System.Response.Citations` 테이블의 인용 텍스트에는 `<page_X>` 형식(X는 페이지 번호)의 페이지 마커가 포함될 수 있습니다.

> 페이지 마커가 모든 인용에 보장되는 것은 아닙니다. 이 샘플의 토픽 로직은 마커가 **있을 때** 감지하고, 없을 때는 문서 루트로 폴백합니다. 즉, 데이터가 있을 때는 페이지 단위 정밀도를 제공하고, 없을 때는 우아하게 폴백합니다.

인용 커스터마이즈 시 유의할 점이 있습니다. 다른 모델은 인용을 다르게 처리합니다. 2026년 5월 기준으로 GPT-5 Chat은 같은 PDF에서 여러 청크가 답변 근거로 사용되더라도 소스 파일당 단일 인용을 반환하는 경향이 있습니다. 반면 Claude Sonnet 4.6은 여러 청크가 사용될 때 같은 파일에 대한 여러 인용을 반환해, 근거에 사용된 페이지에 대해 파일당 여러 인용을 내보낼 수 있습니다.

> 인용 동작이 어떻게 달라지는지 이해하려면 다양한 모델로 에이전트를 평가하세요. 인용 형태는 페이지 단위 경험에 직접 영향을 미치므로, 프로덕션 모델 선택 시 고려해야 할 요소 중 하나입니다. 모델 동작은 시간이 지남에 따라 변할 수 있으므로 지속적인 평가를 유지하세요.

### 토픽이 하는 일

토픽은 생성된 응답을 인터셉트하고 각 인용에 대해:

1. 인용된 파일이 PDF인지 확인(파일 확장자 기반)
2. 인용 텍스트에서 `<page_X>` 마커 검색
3. 페이지 번호를 추출해 URL에 `#page=N` 추가
4. Office 파일의 경우 선택적으로 `?web=1` 추가해 브라우저에서 열기 강제

SharePoint를 지식 소스로 사용할 때 PDF 페이지 추출을 처리하는 PowerFx:

```javascript
resolvedUrl: If(
    EndsWith(citation.Name, ".pdf"),
    citation.Url & "#page=" &
    If(
        Find("<page_", citation.Text) > 0,
        Mid(
            citation.Text,
            Find("<page_", citation.Text) + Len("<page_"),
            Find(">", citation.Text, Find("<page_", citation.Text))
                - Find("<page_", citation.Text) - Len("<page_")
        ),
        "1"
    ),
    // ... Office 파일 처리
)
```

`Mid` 함수는 `<page_`와 `>` 사이에서 페이지 번호를 추출하며, 마커가 없으면 1페이지로 기본 설정합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/pdf-page-level-citations/page-citation-test-canvas.png' | relative_url }}" alt="Copilot Studio에서 페이지 단위 인용과 단일 PDF 파일에 대한 여러 인용을 표시하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio가 파일당 여러 참조를 포함한 페이지 단위 인용을 표시하는 모습</figcaption>
</figure>

### Office 파일: 브라우저에서 열기 vs. 데스크톱 앱?

샘플에는 구성 가능한 변수 `OpenOfficeFilesInWeb`도 포함되어 있습니다. `true`로 설정하면 Office 파일 URL(Word, Excel, PowerPoint)에 `?web=1`을 추가해 데스크톱 앱 대신 브라우저에서 열립니다.

### 전체 토픽 YAML

전체 토픽 YAML은 [CopilotStudioSamples 리포지토리](https://github.com/microsoft/CopilotStudioSamples/blob/main/authoring/snippets/topics/sharepoint-pdf-page-citations/sharepoint-pdf-citations.yml)에서 확인할 수 있습니다.

<details>
<summary>전체 토픽 YAML 펼치기</summary>
<pre><code class="language-yaml">kind: AdaptiveDialog
beginDialog:
  kind: OnGeneratedResponse
  id: main
  priority: -1
  actions:
    - kind: SetVariable
      id: setVariable_HJ0sml
      displayName: Control whether Office Files should open in the web
      variable: Topic.OpenOfficeFilesInWeb
      value: =true

    - kind: SetVariable
      id: rZYmg1
      displayName: Store citations table
      variable: Topic.SystemCitations
      value: =System.Response.Citations

    - kind: SetVariable
      id: MHFmGu
      displayName: Store orchestrators response
      variable: Topic.SystemResponseText
      value: =System.Response.FormattedText

    - kind: ConditionGroup
      id: has-answer-conditions
      conditions:
        - id: has-answer
          condition: =CountRows(System.Response.Citations)&gt;0
          displayName: Only customise when citations are present
          actions:
            - kind: SetVariable
              id: setVariable_responseBody
              displayName: Response with citations table removed
              variable: Topic.ResponseBodyWithoutCitations
              value: |-
                =If(
                    Find(Char(10) &amp; Char(10) &amp; "[1]:", System.Response.FormattedText) &gt; 0,
                    Left(
                        System.Response.FormattedText,
                        Find(Char(10) &amp; Char(10) &amp; "[1]:", System.Response.FormattedText) - 1
                    ),
                    If(
                        Find(Char(10) &amp; "[1]:", System.Response.FormattedText) &gt; 0,
                        Left(
                            System.Response.FormattedText,
                            Find(Char(10) &amp; "[1]:", System.Response.FormattedText) - 1
                        ),
                        System.Response.FormattedText
                    )
                )

            - kind: SetVariable
              id: setVariable_EjZ42D
              displayName: Customise citations with PDF page references
              variable: Topic.CitationsSnip
              value: |-
                =Concat(
                    Sequence(CountRows(System.Response.Citations)),
                    With(
                        {
                            citation: Last(FirstN(System.Response.Citations, Value)),
                            citationIndex: Text(Value)
                        },
                        With(
                            {
                                resolvedUrl: If(
                                    EndsWith(citation.Name, ".pdf"),
                                    citation.Url &amp; "#page=" &amp;
                                    If(
                                        Find("&lt;page_", citation.Text) &gt; 0,
                                        Mid(
                                            citation.Text,
                                            Find("&lt;page_", citation.Text) + Len("&lt;page_"),
                                            Find("&gt;", citation.Text, Find("&lt;page_", citation.Text)) - Find("&lt;page_", citation.Text) - Len("&lt;page_")
                                        ),
                                        "1"
                                    ),
                                      If(
                                        Topic.OpenOfficeFilesInWeb And
                                        Or(
                                          EndsWith(Lower(citation.Name), ".doc"),
                                          EndsWith(Lower(citation.Name), ".docx"),
                                          EndsWith(Lower(citation.Name), ".ppt"),
                                          EndsWith(Lower(citation.Name), ".pptx"),
                                          EndsWith(Lower(citation.Name), ".xls"),
                                          EndsWith(Lower(citation.Name), ".xlsx")
                                        ),
                                        If(
                                          Find("web=1", Lower(citation.Url)) &gt; 0,
                                          citation.Url,
                                          citation.Url &amp; If(Find("?", citation.Url) &gt; 0, "&amp;web=1", "?web=1")
                                        ),
                                        citation.Url
                                      )
                                )
                            },
                            "[" &amp; citationIndex &amp; "]: " &amp; resolvedUrl &amp; " """ &amp; citation.Name &amp; """"
                        )
                    ),
                    Char(10)
                )

            - kind: SendActivity
              id: sendActivity_FplCvD
              displayName: Respond with formatted response + new citations table
              activity: |-
                {
                  Topic.ResponseBodyWithoutCitations &amp; Char(10) &amp; Char(10) &amp; Text(Topic.CitationsSnip)
                }

            - kind: SetVariable
              id: setVariable_jrTAIw
              displayName: Prevent orchestrator from responding directly
              variable: System.ContinueResponse
              value: =false

            - kind: EndDialog
              id: end-topic
              clearTopicQueue: true
</code></pre>
</details>

### 사전 요건

- **생성형 오케스트레이션**이 활성화된 Copilot Studio 에이전트
- PDF 문서가 포함된 **SharePoint** 지식 소스 하나 이상

### 설정 단계

1. 에이전트에 SharePoint 지식 소스가 구성되어 있는지 확인하세요. 모범 사례 ALM을 위해 [Copilot Studio의 동적 지식 URL](https://microsoft.github.io/mcscatblog/posts/dynamic-knowledge-urls-copilot-studio/)을 사용할 수 있습니다.
2. 새 토픽을 만들고, **코드 편집기** 뷰로 전환한 후 [YAML 파일](https://github.com/microsoft/CopilotStudioSamples/blob/main/authoring/snippets/topics/sharepoint-pdf-page-citations/sharepoint-pdf-citations.yml) 내용을 붙여넣습니다.
3. `OpenOfficeFilesInWeb` 변수를 검토하세요. Office 파일을 데스크톱 앱 대신 브라우저에서 열고 싶으면 `true`로 설정합니다.
4. 토픽을 저장하고 PDF 문서를 인용할 질문으로 테스트합니다.

---

## 업로드 파일(비정형 데이터)을 지식 소스로 사용하는 경우

에이전트가 [업로드 파일을 지식 소스로](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-file-upload) 사용하는 경우(비정형 데이터), 기본 인용은 원본 문서가 아닌 Dataverse 호스팅 청크를 가리킵니다. 여기서 Remi의 [인용 교체 샘플](https://github.com/microsoft/CopilotStudioSamples/blob/main/authoring/snippets/topics/citation-swap/swap-citations.yml)이 더 유용한 솔루션을 제공합니다.

### 이 접근 방식을 사용하는 시기

업로드 파일 접근 방식은 특정 시나리오를 위해 설계되었습니다. Copilot Studio에 문서를 직접 업로드해 지식 소스로 사용하되, 인용이 공개 웹사이트처럼 최종 사용자가 실제로 접근할 수 있는 위치를 가리키기를 원하는 경우입니다. PDF의 경우 페이지 단위 정밀도도 원합니다.

> 업로드 파일을 사용하면 역할 기반 액세스 제어가 없습니다. 에이전트 사용자는 모든 업로드된 콘텐츠에서 생성된 답변에 접근할 수 있습니다. 콘텐츠에 액세스 제한이 필요한 경우 대신 SharePoint를 지식 소스로 사용하는 것을 고려하세요.

### 다른 마커 형식

업로드 파일 지식 소스는 SharePoint의 `<page_X>` 형식 대신 다른 페이지 마커 형식 `<page value=X>`를 사용합니다. 파싱 로직은 이 차이를 반영합니다.

업로드 파일을 지식 소스로 사용할 때 PDF 페이지 추출을 처리하는 PowerFx:

```javascript
If(
    And(
        EndsWith(currentRecord.Name, ".pdf"),
        StartsWith(currentRecord.Text, "<page value=")
    ),
    "#page=" & Mid(
        currentRecord.Text,
        Find("<page value=", currentRecord.Text)
            + Len("<page value=") + 1,
        Find(">", currentRecord.Text)
            - Len("<page value=") - 3
    )
)
```

### 토픽이 하는 일

각 인용에 대해 토픽은:

1. 인용 URL이 비어 있는지 확인(웹 소스가 아닌 업로드 파일을 나타냄)
2. 빈 URL을 파일 이름과 결합된 외부 웹사이트 URL로 교체
3. `<page value=X>` 마커가 있는 PDF의 경우 구성된 URL에 `#page=N` 추가
4. 파일 이름의 공백에 대한 URL 인코딩 처리

토픽에서 하나의 변수를 구성해야 합니다: `externalWebsiteURL`. 이를 디렉터리 경로를 포함한 문서가 호스팅된 웹사이트 기본 URL로 설정하세요. 예: `https://www.contoso.com/documents/policies/`.

> 웹사이트 디렉터리의 파일 이름은 Copilot Studio에 업로드된 파일 이름과 정확히 일치해야 합니다. 토픽은 기본 URL과 파일 이름을 연결해 URL을 구성합니다.

### 전체 토픽 YAML

전체 토픽 YAML은 [CopilotStudioSamples 리포지토리](https://github.com/microsoft/CopilotStudioSamples/blob/main/authoring/snippets/topics/citation-swap/swap-citations.yml)에서 확인할 수 있습니다.

<details>
<summary>전체 토픽 YAML 펼치기</summary>
<pre><code class="language-yaml">kind: AdaptiveDialog
beginDialog:
  kind: OnGeneratedResponse
  id: main
  condition: =CountRows(System.Response.Citations)&gt;0
  actions:
    - kind: SetVariable
      id: setVariable_xHJ4lf
      variable: Topic.Var1
      value: =System.Response.FormattedText

    - kind: SetVariable
      id: setVariable_wtNwaw
      variable: Topic.externalWebsiteURL
      value: https://yourwebsite.com/citations/

    - kind: SetVariable
      id: setVariable_9IFwdP
      variable: Topic.CitationsSnip
      value: |-
        =With(
            {CitationsTable: System.Response.Citations},
            Concat(
                ForAll(
                    Sequence(CountRows(CitationsTable)),
                    Value
                ),
                With(
                    {
                        currentRecord: Index(
                            CitationsTable,
                            Value
                        )
                    },
                //begin logic
                    "[" &amp; Text(Value) &amp; "]: " &amp; If(
                        IsBlank(currentRecord.Url),
                        If(
                            Left(
                                currentRecord.Name,
                                8
                            ) = "https://",
                            Substitute(
                                currentRecord.Name,
                                " ",
                                "%20"
                            ),
                            Substitute((Topic.externalWebsiteURL &amp; currentRecord.Name), " ", "%20") &amp;
                            If(
                                And(
                                    EndsWith(currentRecord.Name, ".pdf"),
                                    StartsWith(currentRecord.Text, "&lt;page value=")
                                ),
                                "#page=" &amp; Mid(
                                    currentRecord.Text,
                                    Find("&lt;page value=", currentRecord.Text
                                    ) + Len("&lt;page value=") + 1,
                                    Find(
                                        "&gt;",
                                        currentRecord.Text
                                    ) - Len("&lt;page value=")-3
                                )
                            )
                        ),
                        currentRecord.Url
                    ) &amp; " " &amp; """" &amp;
                    Substitute(
                        If(
                            Find(
                                "?",
                                Last(
                                    Split(
                                        currentRecord.Name,
                                        "/"
                                    )
                                ).Value
                            ) &gt; 0,
                            Left(
                                Last(
                                    Split(
                                        currentRecord.Name,
                                        "/"
                                    )
                                ).Value,
                                Find(
                                    "?",
                                    Last(
                                        Split(
                                            currentRecord.Name,
                                            "/"
                                        )
                                    ).Value
                                )
                            ),
                            Last(
                                Split(
                                    currentRecord.Name,
                                    "/"
                                )
                            ).Value
                        ),
                        "%20",
                        " "
                    ) &amp; """"
                //end logic
                ),
                Char(10) &amp; Char(10)
            )
        )

    - kind: SendActivity
      id: sendActivity_i4mW3G
      activity: |-
        {If(
            System.Activity.ChannelId = "msteams",
            System.Response.FormattedText &amp; Char(10) &amp; Char(10) &amp; Text(Topic.CitationsSnip),
            Left(System.Response.FormattedText, Find("[1]:", System.Response.FormattedText) + -1) &amp; Char(10) &amp; Char(10) &amp; Text(Topic.CitationsSnip)
        )}

    - kind: SetVariable
      id: setVariable_jVzQGX
      variable: System.ContinueResponse
      value: false

inputType: {}
outputType: {}
</code></pre>
</details>

### 사전 요건

- **생성형 오케스트레이션**이 활성화된 Copilot Studio 에이전트
- PDF 문서가 포함된 [업로드 파일 지식 소스](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-file-upload)
- 동일한 문서를 호스팅하는 접근 가능한 사이트

### 설정 단계

1. 에이전트에 PDF 파일을 지식 소스로 업로드합니다.
2. 동일한 파일이 일치하는 파일 이름으로 공개 URL에서 사용 가능한지 확인합니다.
3. 새 토픽을 만들고, **코드 편집기** 뷰로 전환한 후 [YAML 파일](https://github.com/microsoft/CopilotStudioSamples/blob/main/authoring/snippets/topics/citation-swap/swap-citations.yml) 내용을 붙여넣습니다.
4. `externalWebsiteURL` 변수를 디렉터리 경로를 포함한 웹사이트 기본 URL로 업데이트합니다.
5. 토픽을 저장하고 PDF 문서를 인용할 질문으로 테스트합니다.

---

## 올바른 접근 방식 선택

어떤 샘플을 사용할지 모르겠다면, 지식 소스에 따라 결정됩니다:

- **SharePoint 지식 소스** — [SharePoint PDF 페이지 인용 샘플](https://github.com/microsoft/CopilotStudioSamples/blob/main/authoring/snippets/topics/sharepoint-pdf-page-citations/sharepoint-pdf-citations.yml)을 사용하세요. 인용이 이미 SharePoint를 가리키므로, 토픽은 페이지 단위로만 만들면 됩니다.
- **업로드 파일** — [인용 교체 샘플](https://github.com/microsoft/CopilotStudioSamples/blob/main/authoring/snippets/topics/citation-swap/swap-citations.yml)을 사용하세요. 인용 URL을 완전히 교체해야 하며 그 과정에서 페이지 정밀도를 추가할 수 있습니다.

더 나아가고 싶다면, 커스텀 플랫폼을 위한 지식 및 커스터마이즈 인용을 처리하는 예시로 [Azure AI Search를 지식 소스로](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search) 고려하세요. 인덱스 수준에서 인용 URL을 매핑할 수 있습니다.

인용을 완전히 제거하고 싶다면, Henry가 [Copilot Studio 답변에서 인용 제거하기](https://microsoft.github.io/mcscatblog/posts/remove-citations-in-copilot-studio-answer/)에서 다뤘습니다.

## 요약

이 샘플들과 이 글의 가이드를 통해 커스터마이즈된 접근 방식으로 인용 데이터를 처리할 수 있습니다. 항상 PDF 1페이지에 착지하는 기본 방식 대신 페이지 단위 인용을 내보낼 수 있습니다. 파일을 뒤져가며 올바른 부분을 찾는 데 10분을 쓸 수 없는 시나리오에서 페이지 단위 인용 처리를 구현해 사용자가 필요한 콘텐츠에 빠르게 도달할 수 있게 하세요.

기억할 핵심 사항:

- **PDF 페이지 단위 인용**은 `System.Response.Citations` 테이블에서 페이지 마커를 파싱하고 인용 URL에 `#page=N`을 추가해 구현됩니다.
- **SharePoint와 업로드 파일은 다른 마커 형식을 사용합니다** — SharePoint는 `<page_X>`, 업로드 파일은 `<page value=X>`.
- **페이지 마커가 항상 반환되는 것은 아닙니다** — 토픽 로직은 문서 루트로 폴백해 우아하게 처리합니다.
- **모델 선택이 인용 동작에 영향을 미칩니다** — 2026년 5월 기준으로 Claude Sonnet 4.6은 파일당 여러 인용을 반환해(여러 페이지 참조 가능) GPT-5 Chat은 단일 인용으로 통합하는 경향이 있습니다. 다양한 모델로 평가하고 모델 선택에 인용 동작을 반영하세요.
- **PDF 외 파일도 인용을 받습니다** — 두 샘플 모두 PDF만이 아닌 모든 파일 유형에 대한 인용을 내보냅니다. SharePoint 샘플에는 `?web=1` 매개변수를 통해 Office 파일(Word, Excel, PowerPoint)을 브라우저에서 열게 하는 메서드도 포함되어 있습니다.
- 두 샘플 모두 동일한 기본 패턴을 사용합니다: `OnGeneratedResponse`로 인터셉트, 인용 푸터 재구성, `System.ContinueResponse = false`로 기본 응답 억제.

에이전트에서 인용 커스터마이즈를 시도해보셨나요? 시도한 다른 인용 커스터마이즈 시나리오를 댓글로 공유해주세요.
