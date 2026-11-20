---
layout: "chapter"
date: 2026-11-12
title: "MCP 및 A2A로 다른 Copilot Studio 에이전트에서 Microsoft Copilot 하네스 에이전트 호출"
short_title: "MCP·A2A로 에이전트 연결"
description: "표준 Copilot Studio 에이전트에서 MCP로 Microsoft Copilot 하네스 에이전트를 호출하고, OBO 로그인 및 A2A로 서로 다른 환경의 에이전트를 연결하는 방법."
order: 22
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/"
source_author: "ssivaraman"
source_published: "2026-11-12"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 ssivaraman(@ssivaraman) 원문 [Call Microsoft Copilot Harness Agents from Other Copilot Studio Agents with MCP and A2A](https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/)(2026-11-12)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/header.png' | relative_url }}" alt="표준 에이전트가 MCP로, 다른 환경의 Microsoft Copilot 하네스 에이전트가 A2A로 호출하는 중앙 에이전트와 사용자 인증 흐름" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

프로덕션에 표준 Copilot Studio 에이전트를 운영 중이라고 가정해 봅시다. 에이전트는 잘 작동하고 사용자가 활용하고 있으며 누구도 이를 다시 만들고 싶어 하지 않습니다. 한편 새로운 에이전트는 [Microsoft Copilot 하네스](https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview)(이전 GitHub Copilot 하네스)를 기반으로, 다른 팀이 다른 환경에서 만들고 있습니다.

곧 두 가지 질문이 생깁니다.

1. 기존 표준 에이전트를 다시 만들지 않고 새 Microsoft Copilot 하네스 에이전트를 사용할 수 있을까요?
2. Microsoft Copilot 하네스 에이전트가 다른 환경에 있는 다른 팀의 에이전트를 복사하지 않고 호출할 수 있을까요?

두 방법 모두 [MCP 및 A2A 채널](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent)을 통해 현재 사용할 수 있습니다. 이 글에서는 **호출자와 대상이 모두 Copilot Studio 에이전트일 때** 두 방법을 작동시킨 설정, 즉 OAuth 값, 리디렉션 URI, 연결, 라우팅, 다른 사용자가 사용하기 전에 필요한 사항을 설명합니다.

자체 앱이나 스크립트에서 에이전트를 호출하려면 CATBOT의 [MCP와 A2A 문서를 대신 읽고 정리한 글](https://microsoft.github.io/mcscatblog/posts/grumpy-protocol-clients/)에서 Python 클라이언트와 Entra 로그인을 확인할 수 있습니다.

> MCP 및 A2A 채널은 미리 보기 상태입니다. 세 테넌트에서 이 안내를 테스트했습니다. 정식 출시 전 세부 사항은 변경될 수 있습니다.

## 구성 요소의 역할

세 부분으로 구성되며 각 부분을 누가 설정하는지 알아두면 편리합니다. 호출되는 에이전트는 항상 Microsoft Copilot 하네스 에이전트입니다.

| 구성 요소 | 내용 | 설정 담당자 |
|---|---|---|
| **호출되는 에이전트** | 크레딧이 있는 **Early** 환경에 게시된 에이전트 | 에이전트 메이커 및 Power Platform 관리자 |
| **앱 등록** | **호출자**를 위한 단일 Entra 앱 | ID 관리자 |
| **호출 에이전트** | 커넥터 및 연결을 보유 | 에이전트 메이커 |

앱 등록은 Learn 문서의 [사전 요구 사항: 앱 등록 만들기](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent#prerequisite-create-an-app-registration)를 따라 만듭니다. 시작하기 전에 알아두면 좋은 테스트 결과는 다음과 같습니다.

- **호출 대상 에이전트만 Early 환경이 필요합니다.** 호출자는 기본 환경과 같은 Standard 릴리스 환경에 있어도 됩니다.
- **등록은 호출자만 수행합니다.** 호출 대상 에이전트의 엔드포인트는 보통 테넌트에 이미 존재하는 Copilot Studio 채널 API로 보호됩니다. 애플리케이션 ID로 검색해도 보이지 않는다면 대상 에이전트의 MCP 또는 A2A 대화 상자를 한 번 열어 테넌트에 추가합니다.
- **API 이름은 달라질 수 있습니다.** 채널 API는 *Microsoft Copilot Studio Agent as MCP channel* 또는 *Microsoft Copilot Studio Agent MCP and A2A channels*로 표시될 수 있습니다. 애플리케이션 ID `6f46e6ed-07bf-4616-80f0-47546850f654`로 검색하면 찾을 수 있습니다.
- **동의는 프로토콜별로 필요합니다.** 사용자가 연결을 만들고 로그인할 때는 사용자 동의만으로 충분하지만 시나리오 1의 7단계 OBO 설정에는 관리자 동의가 필요합니다. MCP 동의는 A2A에 적용되지 않으며 각각 별도로 동의해야 합니다.
- **호출자는 게시된 버전을 사용합니다.** 호출 대상 에이전트에서 저장했지만 게시하지 않은 변경은 제공되지 않습니다.

이 설정이 필요한 이유는 다음과 같습니다.

- Copilot Studio 커넥터는 서버 측 웹 앱이므로 **클라이언트 암호**가 필요합니다. 서버가 로그인 코드를 토큰으로 교환하고, 암호는 요청이 앱 등록에서 왔음을 증명합니다.
- Entra는 앱에 등록된 주소로만 로그인 결과를 반환하므로 **커넥터마다 리디렉션 URI**가 필요합니다.
- Entra는 동적 클라이언트 등록을 지원하지 않으므로 OAuth 모드는 **"Manual"**입니다. 테스트에서 "Dynamic"은 404를 반환했습니다. [Jira 원격 MCP 글](https://microsoft.github.io/mcscatblog/posts/atlassian-jira-remote-mcp-copilot-studio/)처럼 이를 지원하는 서버를 연결했다면 이 단계가 달라집니다.

## 호출 대상 에이전트 URL 찾기

Early 환경에서 게시된 Microsoft Copilot 하네스 에이전트를 열고 **Triggers** 옆의 **+**를 선택한 다음 **MCP protocol** 또는 **A2A protocol**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/add-trigger.png' | relative_url }}" alt="미리 보기로 표시된 MCP 및 A2A 프로토콜을 포함한 트리거 추가 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>트리거 추가 대화 상자의 **MCP protocol** 및 **A2A protocol**. Early 릴리스 환경에서만 표시됩니다.</figcaption>
</figure>

각 대화 상자에 에이전트 URL이 표시됩니다.

```text
MCP:  https://api.powerplatform.com/copilotstudio-mcp/tenants/{tenantId}/environments/{environmentId}/agents/{agentSchemaName}
A2A:  https://api.powerplatform.com/copilotstudio-a2a/tenants/{tenantId}/environments/{environmentId}/agents/{agentSchemaName}
Card: {A2A URL}/.well-known/agent-card.json
```

대화 상자를 열어도 에이전트가 변경되지는 않으며 URL만 표시됩니다. A2A 대화 상자에는 에이전트가 수행하는 작업을 설명하는 스킬 이름과 설명도 포함되며 에이전트와 함께 저장됩니다. 테스트에서는 로그인한 클라이언트가 읽는 전체 에이전트 세부 정보에 나타났지만 공개 에이전트 카드에는 표시되지 않았습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-endpoint-dialog.png' | relative_url }}" alt="에이전트 A2A URL, 에이전트 카드 URL, hr-policy-questions 스킬을 보여 주는 A2A 클라이언트 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>엔드포인트, 에이전트 카드 URL 및 에이전트 스킬을 표시하는 A2A 대화 상자.</figcaption>
</figure>

> [공식 문서](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent)에는 **Channels → Add a channel → MCP client / A2A client**에서 같은 항목을 찾도록 안내되어 있으며 이 위치에서 보일 수도 있습니다. 어느 위치를 사용하든 호출 대상 에이전트는 Early 릴리스 환경에 있어야 합니다. 게시 대화 상자에서 "트리거를 추가할 때까지 에이전트가 실행되지 않는다"는 경고가 나올 수 있지만 MCP 및 A2A 호출은 정상 작동했습니다.

## 시나리오 1: 표준 에이전트 → Microsoft Copilot 하네스 에이전트(MCP)

프로덕션 표준 에이전트에 도구 하나를 추가하면 됩니다. 표준 에이전트를 다시 만들 필요가 없습니다.

### 1. 앱 등록 준비

1. 앱 등록의 채널 API에서 위임된 권한 **`MCS.InvokeAsMCP`**를 추가합니다.
2. **Certificates & secrets**에서 클라이언트 암호를 만들고 값을 복사합니다.

### 2. 표준 에이전트에 MCP 도구 추가

표준 에이전트에서 **Tools → Add a tool**로 이동하고 **Create new**에서 **Model Context Protocol**을 선택합니다. 그러면 [기존 MCP 서버를 에이전트에 추가](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent) 문서에 설명된 **Add a Model Context Protocol server**가 열립니다.

| 필드 | 값 |
|---|---|
| Server name | 호출되는 에이전트 이름(예: *HR Policy*) |
| Server description | 호출되는 에이전트가 수행하는 작업(5단계 참고) |
| Server URL | 호출 대상 에이전트의 **MCP** URL |
| Authentication | **OAuth 2.0**을 선택하고 기본 **Dynamic discovery**에서 **Manual**로 변경 |

### 3. OAuth 값 입력

| 필드 | 값 |
|---|---|
| Client ID | 앱 등록의 Application (client) ID |
| Client secret | 1단계의 암호 값 |
| Authorization URL | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize` |
| Token URL template | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` |
| Refresh URL | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` |
| Scopes | `https://api.powerplatform.com/copilotstudio-mcp/MCS.InvokeAsMCP offline_access` |

`{tenantId}`를 Directory (tenant) ID로 바꿉니다. 연결이 토큰을 갱신하려면 `offline_access` 범위가 필요합니다. 이 범위는 토큰 없이 서버를 호출했을 때 서버가 광고하는 값과 일치합니다. PKCE를 설정할 필요는 없습니다. 로그인 요청에 자동 포함됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/mcp-oauth-manual.png' | relative_url }}" alt="Manual OAuth 2.0 유형과 클라이언트 ID, 인증 URL, 토큰 URL, 갱신 URL 및 범위가 입력된 MCP 서버 추가 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>**Manual** OAuth가 설정된 MCP 마법사. 여기서 테넌트 ID는 `{tenantId}`로 표시됩니다.</figcaption>
</figure>

### 4. 리디렉션 URI 등록 및 연결 생성

1. 도구를 만들면 `https://global.consent.azure-apim.net/redirect/`로 시작하는 리디렉션 URL이 표시됩니다. 커넥터마다 URL이 다릅니다.
2. 앱 등록에서 **Authentication → Add Redirect URI**(이전 환경에서는 **Add a platform**)로 이동하고 **Web**을 선택해 정확히 붙여넣습니다.
3. Copilot Studio로 돌아와 연결을 만들고 로그인합니다. 사용자가 `MCS.InvokeAsMCP`에 동의하지 않았다면 Entra가 동의를 요청합니다. 관리자가 테넌트 전체에 동의했다면 해당 권한 동의 메시지는 표시되지 않습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/entra-web-redirect.png' | relative_url }}" alt="https://global.consent.azure-apim.net/redirect/로 시작하는 Web 리디렉션 URI가 등록된 앱 인증 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>커넥터의 리디렉션 URL을 앱 등록에 **Web** 리디렉션 URI로 추가한 모습.</figcaption>
</figure>

이후 도구 패널에 `send-message` 도구 하나가 표시됩니다. 하나의 커넥터와 연결을 같은 환경의 여러 에이전트에서 사용할 수 있습니다. 제 표준 에이전트는 다른 에이전트에 이미 만든 연결을 재사용했습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/standard-agent-mcp-tool.png' | relative_url }}" alt="연결과 단일 send-message 도구를 표시하는 표준 에이전트의 MCP 도구 세부 정보 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Microsoft Copilot 하네스 에이전트를 MCP 도구로 추가한 표준 에이전트. 서버는 `send-message` 도구 하나를 제공합니다. 연결 계정은 자리 표시자로 바꿨습니다.</figcaption>
</figure>

### 5. 호출 에이전트에 도구 사용 시점 안내

`send-message` 도구 자체의 설명은 호출되는 에이전트 이름을 기반으로 생성됩니다. 예를 들어 "HR Policy 에이전트에 메시지를 보내고 답변을 받습니다."라고 표시됩니다. 에이전트가 다루는 주제는 설명에 포함되지 않으므로 **Server description**이 라우팅에 쓰일 것이라고 생각하기 쉽습니다. 두 가지 설정을 비교했습니다.

- 구체적인 설명("휴가, 출장, 경비 및 기타 HR 정책 질문에 답변…"), 서버 이름 *HR Policy*
- 일반적인 설명("Model Context Protocol server endpoint."), 이전 도구 삭제 후에도 이름이 예약되어 있어 서버 이름은 *HR Policy MCP*

그 밖의 조건은 모두 동일했습니다. 지침이 없는 같은 표준 에이전트, 같은 호출 대상 에이전트, 같은 `send-message` 도구였으며 일반 설명 테스트에서는 질문마다 새 테스트 세션을 사용했습니다. 어느 설명을 사용해도 "육아 휴직은 몇 주인가요?"와 "연차를 며칠까지 이월할 수 있나요?"가 도구를 호출했습니다. 활동 추적에는 설정한 설명이 표시되었으며 두 질문 모두 상세 설명은 필요하지 않았습니다.

그렇다고 라우팅이 보장되는 것은 아닙니다. 한 테스트에서 "7시간 비행에 프리미엄 이코노미를 예약할 수 있나요?"라는 질문은 도구 대신 에이전트 기본 웹 검색으로 전달되었습니다. 에이전트에 웹 검색, 지식 또는 용도가 겹치는 도구가 있다면 표준 에이전트 지침에 호출 대상 에이전트를 사용할 때를 명시합니다.

```text
휴가, 출장, 경비 또는 기타 HR 정책 질문에는 HR Policy 도구를 사용합니다.
일반 지식이나 웹 검색으로 HR 정책 질문에 답하지 않습니다.
```

**Server description**에도 에이전트가 다루는 내용을 정확히 작성해야 합니다. 도구를 추가할 때 설명이 에이전트에 복사되며 이후 커넥터를 편집해도 바뀌지 않습니다. 변경하려면 도구를 삭제하고 다시 추가해야 합니다.

### 6. 메이커로 테스트

호출 대상 에이전트만 답할 수 있는 질문을 표준 에이전트에 합니다. 활동 추적에 **Used tool: send-message**가 표시되고, 테스트에서는 약 9~17초 내에 답변이 돌아왔습니다. Copilot Studio가 반환된 `conversationId`를 전달하므로 후속 질문에서도 맥락이 유지됩니다. MCP 커넥터가 처음이라면 [첫 MCP 커넥터를 5분 만에 만들기](https://microsoft.github.io/mcscatblog/posts/hello-world-mcp-copilot-studio/)에서 기본 사항을 확인하세요.

### 7. 커넥터를 OBO 로그인으로 전환

이 도구는 기본적으로 **End user credentials**를 사용하므로 표준 에이전트와 대화하는 각 사용자는 자신의 계정으로 Microsoft Copilot 하네스 에이전트를 호출합니다. **Manual** OAuth를 사용하면 MCP 마법사는 일반 OAuth 2 ID 공급자를 이용한 커넥터를 만들며 각 사용자는 별도의 연결 관리자 페이지에서 다시 로그인해야 합니다. OBO(on-behalf-of) 로그인으로 전환하면 기존 로그인을 재사용하므로 대화 중 **Allow**를 한 번만 선택하면 됩니다. 커넥터의 OBO는 [사용자 지정 커넥터의 원활한 SSO](https://microsoft.github.io/mcscatblog/posts/obo-for-custom-connectors/)에서 확인하세요. 다음은 사용자 지정 커넥터의 표준 OBO 설정이며 MCP 채널에 특화된 항목은 **Resource URL**과 `MCS.InvokeAsMCP` 권한입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-flow.png' | relative_url }}" alt="IT Helpdesk 표준 에이전트에서 Allow를 선택한 뒤 Entra가 사용자의 토큰을 Copilot Studio MCP용 토큰으로 교환하고 HR Policy 에이전트가 사용자 권한으로 호출되는 OBO 흐름" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>각 단계는 로그인한 사용자 권한으로 실행됩니다. 커넥터 암호는 사용자의 토큰을 교환할 권한을 증명할 뿐입니다.</figcaption>
</figure>

먼저 [사용자 지정 커넥터의 OBO 인증 구성](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-custom-connector-on-behalf-of)에 따라 1단계의 앱 등록에 OBO를 추가합니다.

1. **Expose an API → Add a scope.** 기본 Application ID URI(`api://{client-id}`)를 수락하고 범위 이름을 `access_as_user`로 지정합니다. **Who can consent**는 **Admins and users**로 설정하고 **Enabled**를 유지합니다.
2. **Authorized client applications → Add a client application.** `fe053c5f-3692-4f14-aef2-ee34fc081cae`(Azure API Connections)를 입력하고 `access_as_user`를 선택합니다. 이를 통해 Power Platform이 로그인 화면 없이 사용자를 대신해 커넥터 토큰을 받을 수 있습니다.
3. **API permissions → Grant admin consent**에서 `MCS.InvokeAsMCP`에 관리자 동의를 부여합니다. 토큰 교환은 백그라운드에서 발생하므로 사용자에게 해당 권한 동의를 요청할 시점이 없습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-expose-api.png' | relative_url }}" alt="관리자와 사용자가 동의할 수 있는 access_as_user 범위 및 승인된 클라이언트로 표시된 Azure API Connections 앱 등록" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>클라이언트 ID는 `{client-id}`로 바꿨습니다.</figcaption>
</figure>

그런 다음 Power Apps의 **Custom connectors**로 이동해 MCP 마법사에서 만든 커넥터의 연필 아이콘을 선택합니다. **2. Security**를 열고 **OAuth 2.0**의 **Edit**를 선택한 다음 다음과 같이 설정합니다.

| 필드 | 값 |
|---|---|
| Identity Provider | **Azure Active Directory**(Microsoft Entra ID) |
| Enable Service Principal support | Off |
| Client ID | 앱 등록의 Application (client) ID |
| Client secret | 암호 값. ID 공급자를 바꾸면 지워지므로 다시 입력 |
| Authorization URL | `https://login.microsoftonline.com`(기본값) |
| Tenant ID | Directory (tenant) ID |
| Resource URL | `https://api.powerplatform.com/copilotstudio-mcp` |
| Enable on-behalf-of login | `true` |
| Scope | 3단계 값(`…/MCS.InvokeAsMCP offline_access`) 유지 |

> **Resource URL**은 채널 API 식별자 `https://api.powerplatform.com/copilotstudio-mcp`입니다. `https://api.powerplatform.com`은 별도의 Power Platform API이며 해당 API용 토큰은 MCP 엔드포인트에서 사용할 수 없습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-connector-security.png' | relative_url }}" alt="Azure Active Directory 공급자, 서비스 주체 지원 꺼짐, 기본 인증 URL, copilotstudio-mcp 리소스 URL 및 활성화된 OBO 로그인을 보여 주는 커넥터 보안 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>ID는 자리 표시자로 바꿨습니다.</figcaption>
</figure>

**Update connector**를 선택합니다. 테스트에서 리디렉션 URL은 변경되지 않아 앱 등록에 새 URI를 추가할 필요가 없었습니다. 전환 후 표준 에이전트에서 해당 도구의 새 연결을 만들고(**Tools** → MCP 도구 → **Create new connection**) 선택합니다. 전환은 이 커넥터를 사용하는 모든 에이전트에 적용되므로 각 에이전트에서도 같은 연결을 선택해야 합니다.

### 8. 다른 사용자와 공유하고 테스트

각 사용자에게 다음 항목이 필요합니다. 처음 세 항목은 한 명씩 공유하는 대신 보안 그룹에 공유하세요.

- **표준 에이전트**: [다른 사용자와 에이전트 공유](https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-share-bots)에 따라 일반 게시 에이전트처럼 공유합니다.
- **사용자 지정 커넥터**: MCP 마법사가 만든 커넥터를 **Can view** 권한으로 공유합니다(Power Apps → **Custom connectors** → **⋯** → **Invite another user**). 공유하지 않으면 연결 시 *"does not have ReadAccess … connector"* 오류가 발생했습니다.
- **호출 대상 Microsoft Copilot 하네스 에이전트**: 해당 사용자에게 공유합니다. 공유 전 테스트 사용자는 HR Policy 답변 대신 일반 답변을 받았습니다.
- **호출 에이전트 환경의 보안 역할**: 기본 환경이 아닐 때 필요합니다. **Basic User**로 충분했습니다. 역할이 없으면 동의 카드가 표시되어도 **Allow** 선택 후 *"I couldn't connect. Open connection manager…"*라는 메시지가 나오고 연결은 만들어지지 않았습니다.

표준 에이전트를 Microsoft 365 Copilot에 게시하고 메이커가 아니며 커넥터 연결도 없는 두 번째 사용자로 테스트했습니다. 두 에이전트는 기본 환경이 아닌 같은 Early 환경에 두어 보안 역할 요구 사항이 드러났습니다. 호출 에이전트가 기본 환경에 있는 교차 환경 설정에서는 호출 대상 에이전트를 공유하는 것만으로 Early 환경 요구 사항을 충족했습니다. 사용자가 도구가 필요한 질문을 처음 했을 때 Microsoft 365 Copilot은 **Connect to continue** 카드를 표시했습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-consent-card.png' | relative_url }}" alt="Microsoft 365 Copilot의 IT Helpdesk 에이전트가 Allow 및 Cancel 버튼이 있는 HR Policy 연결 계속 카드를 표시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>대화 안에서 표시되는 동의 카드. 연결 관리자 페이지는 필요 없습니다.</figcaption>
</figure>

**Allow**를 선택하면 사용자의 연결이 만들어지고 에이전트가 호출된 에이전트의 답변을 반환합니다. 이후 질문에서는 동의 카드 없이 기존 연결을 사용합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-answer-after-allow.png' | relative_url }}" alt="Allow 선택 후 HR 정책에 따라 26주의 유급 육아 휴직 자격을 안내하는 IT Helpdesk 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>**Allow**를 선택한 뒤의 답변. 세부 내용은 호출된 에이전트의 HR 핸드북에서 가져왔습니다.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-followup-no-prompt.png' | relative_url }}" alt="연차 이월 질문에 최대 5일이며 3월 31일에 만료된다고 직접 답변하는 후속 대화" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>동의 카드 없이 처리된 후속 질문.</figcaption>
</figure>

> 커넥터를 일반 OAuth 설정으로 유지해도 도구는 작동하지만 각 사용자에게 *"Let's get you connected first… Open connection manager"*가 표시됩니다. 사용자는 직접 **Manage your connections** 페이지를 열어 연결한 뒤 대화로 돌아와 **Retry**를 선택해야 합니다.

## 시나리오 2: 환경 간 Microsoft Copilot 하네스 에이전트(A2A)

다른 팀이 자체 환경에서 소유한 에이전트가 필요할 때 복사하는 대신 게시된 에이전트를 호출할 수 있습니다. 시나리오 1에서 본 것처럼 MCP도 환경 간 호출을 지원합니다. 여기서는 호출 에이전트가 Microsoft Copilot 하네스 에이전트이고 에이전트 카드에서 연결된 에이전트로 추가할 수 있으므로 A2A를 사용합니다. 테스트에서는 호출자가 기본 환경, 대상 에이전트가 Early 환경에 있었습니다.

### 1. 앱 등록 준비

위임된 권한 **`MCS.InvokeAsA2A`**를 추가합니다. 시나리오 1의 앱 등록과 암호를 재사용할 수 있지만 사용자는 A2A에도 별도로 동의해야 합니다.

### 2. 호출 에이전트에 A2A 에이전트 추가

1. [Agent2Agent(A2A) 에이전트를 연결된 에이전트로 추가](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-agent-to-agent)에 따라 호출 에이전트에서 **Connected agents → + Add → Add A2A agent**로 이동합니다.
2. 호출 대상 에이전트의 **agent card URL**을 붙여넣습니다.
3. **Get the name and description from**에서 **The agent's full details (Recommended)**를 유지합니다. 세부 정보는 연결 후 읽기 때문에 이 단계에서 이름이나 설명을 묻지 않습니다.
4. **OAuth 2.0**을 선택합니다. Copilot Studio는 대개 카드에서 **Authorization URL**, **Token URL**, **Refresh token URL**, **Scopes**를 자동으로 채웁니다. 비어 있다면 시나리오 1과 같은 Entra URL을 입력합니다.
5. 클라이언트 ID와 암호를 입력합니다.
6. **Scopes**를 확인합니다. 카드 값에는 `MCS.InvokeAsA2A`가 있지만 `offline_access`가 없습니다. 연결이 토큰을 갱신할 수 있도록 시나리오 1처럼 `offline_access`를 추가합니다. 전체 값은 다음과 같습니다.

   ```text
   https://api.powerplatform.com/copilotstudio-a2a/MCS.InvokeAsA2A offline_access
   ```

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/add-a2a-agent.png' | relative_url }}" alt="OAuth 2.0 및 인증·토큰·갱신 URL과 offline_access가 추가된 MCS.InvokeAsA2A 범위를 입력한 A2A 에이전트 연결 양식" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>범위에 `offline_access`가 추가된 A2A 양식. ID는 자리 표시자로 바꿨습니다.</figcaption>
</figure>

### 3. 리디렉션 URI 등록 및 연결 생성

1. **Next**를 선택합니다. Copilot Studio가 커넥터를 만들고 `https://global.consent.azure-apim.net/redirect/`로 시작하는 리디렉션 URL을 표시합니다.
2. 시나리오 1과 같이 앱 등록에 **Web** 리디렉션 URI로 추가합니다.
3. Copilot Studio에서 **Connection** 목록을 열고 **Create new connection**, **Create**를 선택한 뒤 로그인합니다. 로그인 요청은 `MCS.InvokeAsA2A offline_access`를 요구합니다.

### 4. 설명 확인

**Next**를 선택해 에이전트 이름과 설명이 포함된 **Review and add**로 이동합니다. 호출 에이전트가 라우팅에 사용하는 설명이므로 추가하기 전에 확인합니다. **The agent's full details**를 선택했지만 제 HR Policy 에이전트는 *"Microsoft Copilot Studio agent 'HR Policy'."*라는 일반 설명으로 들어왔습니다. 이 문구만으로는 언제 사용해야 하는지 알 수 없습니다. (**공개 에이전트 카드**에도 비슷한 일반 문구만 표시되고 추가한 스킬은 공개 카드에 포함되지 않습니다.)

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-review-description.png' | relative_url }}" alt="From the agent로 표시된 일반 설명 Microsoft Copilot Studio agent 'HR Policy'가 포함된 Review and add 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>에이전트에서 가져온 설명. **Add to agent**를 선택하기 전에 바꾸세요.</figcaption>
</figure>

Copilot Studio는 에이전트 이름과 설명, 사용자 메시지 및 대화 맥락, 호출 에이전트 지침을 기준으로 [A2A 에이전트에 라우팅](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-agent-to-agent#how-the-orchestrator-routes-to-the-a2a-agent)합니다. 따라서 다음처럼 에이전트를 언제 사용할지 설명하도록 바꿉니다.

```text
HR policy agent owned by the People team. Answers questions about leave,
travel, expenses and other HR policies. Use it for any HR policy question.
```

호출 에이전트에 별도 지침이 없을 때 이 설명으로 "육아 휴직은 몇 주인가요?"가 HR Policy로 전달되었습니다. 호출 에이전트에 자체 지침이나 겹치는 도구가 있다면 위 MCP 예제와 같이 HR 정책 질문을 연결된 에이전트로 전달하도록 한 줄을 추가합니다.

### 5. 테스트

**Add to agent**를 선택하고 저장한 다음 호출 에이전트만 답할 수 있는 질문을 합니다. 호출 대상 에이전트가 게시된 상태라면 호출 에이전트를 게시하기 전에도 **Preview**에서 테스트할 수 있습니다. 추적에는 입력 및 출력과 함께 **Used tool: {your A2A agent}**가 표시됩니다. 첫 답변은 약 17초 걸렸습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-call-trace.png' | relative_url }}" alt="호출 에이전트 추적에 표시된 context ID, HR Policy 에이전트의 유급 육아 휴직 응답, 지연 시간 및 호출 에이전트 답변" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>호출 에이전트 추적의 출력에 context ID와 호출된 에이전트의 답변, 이어서 호출 에이전트의 답변이 표시됩니다.</figcaption>
</figure>

> A2A 도구의 기본 안내는 후속 요청에 `context_id`와 `task_id`를 모두 전달하도록 모델에 지시합니다. 그러나 각 응답은 완료된 작업이므로 `task_id`를 전달하면 오류 `-32004`("Task is in a terminal state")가 발생합니다. 후속 요청은 `context_id`만으로 작동합니다. 두 테스트 모두 호출 에이전트 모델이 `task_id` 없이 재시도해 대화 맥락을 유지했습니다. 추적에서 이 오류를 보면 해당 상황입니다.

두 에이전트가 **같은 환경**의 Microsoft Copilot 하네스 에이전트라면 어느 채널도 필요하지 않습니다. [연결된 에이전트](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-add-other-agents)에 URL, 앱 등록 또는 OAuth 없이 에이전트가 바로 표시됩니다.

## 두 채널의 차이

두 채널은 동일한 **게시된 에이전트**를 호출합니다. 기능과 답변은 채널에 따라 바뀌지 않습니다. 환경 간 접근, 다른 팀 소유 에이전트 호출, 위임 ID, 훅 및 과금은 양쪽에서 동일하게 작동하며 크레딧은 호출된 에이전트 환경에서 소비됩니다. 달라지는 것은 호출자의 검색, 호출, 응답 수신 방식입니다.

| 항목 | MCP | A2A |
|---|---|---|
| Copilot Studio 호출자 | 표준 및 Microsoft Copilot 하네스 에이전트 | Microsoft Copilot 하네스 에이전트 |
| 프로토콜 버전 | MCP `2025-06-18` | A2A **1.0**만 |
| 응답 | `send-message`의 완료된 응답 | 스트리밍 지원 |
| 검색 메타데이터 | 에이전트 이름으로 설명된 도구 하나 | 스킬이 포함된 에이전트 카드 |
| 후속 대화 | `conversationId` | `context_id` |

몇 가지 항목은 추가 설명이 필요합니다.

- **표준 에이전트는 여기서 A2A를 사용할 수 없습니다.** 표준 하네스의 Agent2Agent 양식은 A2A 0.x 카드 형식을 기대하지만 Copilot Studio는 1.0 카드를 제공합니다. 테스트에서는 양식이 카드를 읽었지만 커넥터를 만들지 못했습니다. 현재 표준 에이전트는 MCP로 연결해야 합니다.
- **기능보다 클라이언트 호환성이 중요합니다.** A2A 채널은 A2A 1.0 클라이언트만 허용합니다. Copilot Studio의 Microsoft Copilot 하네스는 1.0을 사용하지만 다른 A2A 클라이언트는 먼저 호환성을 확인해야 합니다.
- **스트리밍은 채널의 기능입니다.** A2A 채널은 `SendStreamingMessage`로 응답을 스트리밍하지만 MCP의 `send-message`는 완료된 응답을 반환합니다. 이는 특히 사용자 지정 클라이언트에서 중요하며 [CATBOT 글](https://microsoft.github.io/mcscatblog/posts/grumpy-protocol-clients/)에 두 방식이 소개되어 있습니다.
- **검색 정보가 곧 라우팅은 아닙니다.** 에이전트 카드와 스킬은 A2A 클라이언트가 에이전트를 찾는 데 쓰는 메타데이터입니다. Copilot Studio의 라우팅은 연결된 에이전트 이름과 설명, 대화 및 호출 에이전트의 지침을 사용합니다. 따라서 시나리오 2의 4단계가 중요합니다.

> 호출 대상 에이전트의 [에이전트 훅](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/hooks-overview)은 두 채널에서 모두 실행됩니다. `metadata.channel`은 `mcs-agent-as-mcp` 또는 `mcs-agent-as-a2a`이며 `userAadObjectId`는 로그인한 호출자이므로 훅에서 에이전트 호출자와 직접 대화하는 사용자를 구분할 수 있습니다. 훅을 처음 사용한다면 [Copilot Studio 훅](https://microsoft.github.io/mcscatblog/posts/hooks-in-copilot-studio/)부터 살펴보세요.

## 핵심 요점

- **표준** 에이전트는 다시 만들지 않고 **MCP 도구**로 Microsoft Copilot 하네스 에이전트를 사용할 수 있습니다.
- **Microsoft Copilot 하네스** 에이전트는 다른 환경의 다른 팀 에이전트를 복사하지 않고 **A2A 연결 에이전트**로 호출할 수 있습니다.
- 호출 대상 에이전트에는 Early 환경이 필요하며 앱 등록, 클라이언트 암호, 커넥터별 Web 리디렉션 URI도 필요합니다. MCP에는 **Manual** OAuth도 필요합니다.
- MCP 테스트에서 구체적 설명과 일반 설명 모두 라우팅이 작동했습니다. 이름과 설명을 명확히 작성하고 웹 검색 등 다른 도구와 겹치는 경우 호출 에이전트 지침에 명시합니다.
- MCP 커넥터를 **on-behalf-of** 로그인으로 전환하면 다른 사용자는 연결 관리자 대신 대화에서 **Allow**를 한 번 선택하면 됩니다.
- 두 채널은 호출 가능 에이전트, 프로토콜 버전, 스트리밍 및 검색 메타데이터에서 차이가 있지만 호출 대상 에이전트의 기능은 달라지지 않습니다.

프로덕션 에이전트 중 어떤 에이전트를 Microsoft Copilot 하네스 에이전트에 먼저 연결하시겠어요? 댓글로 알려 주세요.
