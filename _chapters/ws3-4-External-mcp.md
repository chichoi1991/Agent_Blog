---
layout: chapter
title: "외부 MCP 도구 추가"
short_title: "외부 MCP 도구 추가"
description: "기초편 #3: 자율동작 에이전트 - 외부 MCP 도구 추가"
order: 4
category: workshop
parent: "ws3"
---

## Step 4: 외부 MCP 도구 추가

# 3. 외부 MCP 도구 추가: 해외 뉴스 조회 MCP

> **이전 단계:** [3. Work IQ MCP 도구 추가](./3.%20Work%20IQ%20MCP%20도구%20추가.md) | **다음 단계:** [5. AI Prompt 도구 추가](./5.%20AI%20Prompt%20도구%20추가.md)

---

Copilot Studio에서는 앞선 실습과 같이 카탈로그 형식으로 제공되지 않는 기업내부, 사설 MCP 서버에 대해서도 GUI 방식으로 URL과 인증 토큰 입력하면 해당 서버가 제공하는 모든 도구를 에이전트에 추가할 수 있도록 제공합니다.

이번 실습에서는 사설 MCP 서버인 **외부 뉴스 MCP** 를 에이전트에 연결하여 키워드, 지역 기반으로 해외에서 제공되는 뉴스 정보를 조회하는 도구로 활용해보겠습니다.

> 이 MCP는 [NewsAPI.org](https://newsapi.org/) 에서 제공하는 API를 활용하여 구축된 MCP 서버 입니다. <br> 해당 MCP 서버는 Microsoft Korea에서 개발한 MCP 서버로, Azure Container Apps에 배포되어 있기에 리소스 상황에 따라 서비스가 제공되지 않을 수 있습니다. <br> 만약 연결이 원활하지 않을 경우, [News API MCP 서버 직접 배포 가이드](https://github.com/chichoi1991/Demo-MCP-Server/blob/main/News-api-mcp/README.md)를 참고하여 직접 배포 후 연결해보시길 권장드립니다. <br>

![1]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20002502.png)

<br>

---

## News API MCP 소개

**News API MCP** 는 [NewsAPI.org](https://newsapi.org/) API를 기반으로 커스텀으로 작성된 MCP 서버입니다.
해당 서버를 통해 전 세계 뉴스 정보를 조회할 수 있는 MCP 서버입니다.  
에이전트에 연결하면 사용자가 자연어로 뉴스 정보를 질의할 때 에이전트가 자동으로 News API MCP를 호출하여 관련된 정보에 대해 답변 및 설정을 진행합니다.


| 항목 | 내용 |
|------|------|
| **언어** | Python 3.12 |
| **전송 방식** | stdio + Streamable HTTP |
| **인증** | News API Key (`x-news-api-key` 헤더) |
| **배포** | `azd up` → Azure Container Apps |

### 도구

| 도구명 | 설명 |
|--------|------|
| `search-news` | 키워드로 뉴스 기사 검색 |
| `get-top-headlines` | 국가/카테고리별 톱 헤드라인 |
| `get-news-sources` | 뉴스 소스 목록 조회 |

📄 상세: [News-api-mcp/README.md](https://github.com/chichoi1991/Demo-MCP-Server/tree/master/News-api-mcp)

<br>

---

## 1. MCP 도구 추가 시작

에이전트 개요 화면에서 **도구** 섹션으로 이동 후 **+ 도구 추가** 를 클릭합니다.

![4-1]({{ site.baseurl }}/assets/image/ws3/4-1.png)

도구 추가 팝업에서 **MCP** 탭 또는 **모델 컨텍스트 프로토콜(MCP)** 옵션을 선택합니다.

![4-2]({{ site.baseurl }}/assets/image/ws3/4-2.png)

<br>

---

## 2. ThinQ MCP 서버 연결

### 2-1. 서버 URL 및 정보 입력

아래 실습을 위한  **ThinQ MCP 서버 URL** 을 입력합니다.

> <b>중요!</b> 이 MCP는 [NewsAPI.org](https://newsapi.org/) 에서 제공하는 API를 활용하여 구축된 MCP 서버 입니다. <br> 해당 MCP 서버는 Microsoft Korea에서 개발한 MCP 서버로, Azure Container Apps에 배포되어 있기에 리소스 상황에 따라 서비스가 제공되지 않을 수 있습니다. <br> 만약 연결이 원활하지 않을 경우, [News API MCP 서버 직접 배포 가이드](https://github.com/chichoi1991/Demo-MCP-Server/blob/main/News-api-mcp/README.md)를 참고하여 직접 배포 후 연결해보시길 권장드립니다. <br>


| 항목 | 값 | 설명 |
|-----------|---|---|
| **서버 이름** | `News_API_MCP_[이름]` | 에이전트 내에서 도구를 식별하기 위한 이름 |
| **서버 설명** | `전 세계 뉴스를 AI 에이전트에서 검색하고 활용할 수 있는 MCP(Model Context Protocol) 서버입니다. News API를 통해 뉴스 기사 검색, 톱 헤드라인 조회, 뉴스 소스 목록 조회 기능을 제공합니다.` | 에이전트 내에서 도구를 식별하기 위한 설명 입니다. 이 MCP 서버가 제공하는 도구 및 시나리오를 상세하게 적어야 에이전트가 올바르게 동작합니다. |
| **서버 URL** | `https://newsapi-mcp-python.politeglacier-1c138199.koreacentral.azurecontainerapps.io/mcp` | 데모용으로 제공되는 news api MCP 서버의 엔드포인트 URL 입니다 |
| **인증** | `API 키` | newsapi.org 에서 발급받은 API 키를 사용합니다. |
| **인증 유형** | `헤더` | API 키를 HTTP 요청 헤더에 포함하여 인증합니다. |
| **헤더 이름** | `x-news-api-key` | API 키를 전달할 HTTP 헤더 이름입니다. |
| **인증 키값** | (삭제예정)3189309744ce42bb894f67a2f6237f21  | API 키값 입니다. newsapi.org에서 발급받은 키를 사용합니다. |

![4-3]({{ site.baseurl }}/assets/image/ws3/4-3.png)
![4-4]({{ site.baseurl }}/assets/image/ws3/4-4.png)


> 서버 URL 및 정보는 실습 환경에 따라 다를 수 있습니다. 

입력이 완료되었으면 **만들기** 버튼을 클릭하여 ThinQ MCP 서버를 에이전트에 연결합니다.

<br>

### 2-2. 연결 확인

이후 연결창이 나오면, 아래와 같이 순서대로 새로운 연결을 진행합니다.
![4-5]({{ site.baseurl }}/assets/image/ws3/4-5.png)

![4-6]({{ site.baseurl }}/assets/image/ws3/4-6.png)



연결이 완료되고  **추가 및 구성** 버튼을 클릭합니다.  
완료되면  ThinQ MCP 서버가 노출하는 **도구 목록**이 표시됩니다.

![4-7]({{ site.baseurl }}/assets/image/ws3/4-7.png)




| 도구명 | 설명 |
|--------|------|
| `search-news` | 키워드로 뉴스 기사 검색 |
| `get-top-headlines` | 국가/카테고리별 톱 헤드라인 |
| `get-news-sources` | 뉴스 소스 목록 조회 |

![4-8]({{ site.baseurl }}/assets/image/ws3/4-8.png)

---

## 3. 지침 업데이트

News API MCP가 추가되었으면, 에이전트가 해당 도구를 활용할 수 있도록 지침을 업데이트해야 합니다. 이번 실습에는 이미 지침에 MCP 도구 활용 방법이 포함되어 있습니다.

<br>

---

## 4. 동작 확인

MCP동작을 위해 먼저 우측 상단의 **설정** → **연결 설정** 탭으로 이동하여 추가된 MCP의 연결을 허용합니다.

![8]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20013436.png)
![4-9]({{ site.baseurl }}/assets/image/ws3/4-9.png)

<br>

연결이 완료되었다면, 설정창을 빠져나와 우측 테스트 패널에서 아래 질문을 입력하여 ThinQ MCP 동작을 확인합니다.

```
내가 가진 가전 제품 목록을 나열해
```
![10]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20014327.png)
```
와인셀러 조명을 2단계로 변경해줘
```
![11]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20014600.png)
```
와인셀러 일간 에너지 사용량 알려줘
```

![12]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20014448.png)
에이전트가 ThinQ MCP 도구를 호출하여 제품 정보를 응답하면 4단계 완료입니다.

> **학습 포인트:** 코드 한 줄 없이 MCP 서버 URL 등록만으로 외부 데이터 소스를 에이전트 도구로 연결했습니다. 이 패턴은 어떤 MCP 서버에도 동일하게 적용됩니다.

<br>

---

> **다음 단계:** [5. AI Prompt 도구 추가](./5.%20AI%20Prompt%20도구%20추가.md)


---

---

← [이전: Step 3. Work IQ MCP]({{ '/chapters/ws3-3-workiq-mcp/' | relative_url }}) | [다음: Step 5. AI Prompt 도구]({{ '/chapters/ws3-5-ai-prompt/' | relative_url }}) →