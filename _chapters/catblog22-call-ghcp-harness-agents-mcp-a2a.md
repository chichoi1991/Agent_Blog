---
layout: "chapter"
title: "MCP와 A2A로 다른 Copilot Studio 에이전트에서 Microsoft Copilot 하네스 에이전트 호출"
short_title: "MCP·A2A 에이전트 연결"
description: "표준 에이전트에서 MCP로 Microsoft Copilot 하네스 에이전트를 호출하고, OBO 로그인 및 A2A 연결을 구성하는 방법"
order: 22
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/"
source_author: "ssivaraman"
source_published: "2026-11-12"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/) (Microsoft Copilot Studio CAT)의 ssivaraman(@ssivaraman) 원문 [Call Microsoft Copilot Harness Agents from Other Copilot Studio Agents with MCP and A2A](https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/)(2026-11-12)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/header.png' | relative_url }}" alt="중앙의 Microsoft Copilot 하네스 에이전트가 두 엔드포인트를 노출하고, 표준 에이전트와 다른 환경의 Microsoft Copilot 하네스 에이전트가 각각 MCP와 A2A를 통해 연결된 모습" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

프로덕션에서 표준 Copilot Studio 에이전트를 운영 중이라고 가정해 보겠습니다. 잘 작동하고 사용자도 쓰고 있으며, 누구도 다시 만들고 싶어 하지 않습니다. 한편 새로운 에이전트는 다른 팀이 다른 환경에서 [Microsoft Copilot 하네스](https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview)(이전 GitHub Copilot 하네스)를 기반으로 만들고 있습니다.

자연스럽게 두 가지 질문이 생깁니다.

1. 기존 표준 에이전트를 다시 만들지 않고 **새 Microsoft Copilot 하네스 에이전트를 사용할 수 있을까요?**
2. 한 팀의 Microsoft Copilot 하네스 에이전트가 다른 환경에 있는 다른 팀의 에이전트를 복사하지 않고 **호출할 수 있을까요?**

두 방법 모두 현재 가능합니다. 모든 Microsoft Copilot 하네스 에이전트가 노출하는 [MCP 및 A2A 채널](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent)을 사용합니다. 이 글에서는 호출자와 대상이 모두 Copilot Studio 에이전트인 상황에서 OAuth 값, 리디렉션 URI, 연결, 라우팅, 다른 사용자가 사용하기 전에 필요한 설정을 안내합니다.

자체 앱이나 스크립트에서 에이전트를 호출한다면 CATBOT의 [MCP 및 A2A 문서를 대신 읽고 만든 Python 클라이언트](https://microsoft.github.io/mcscatblog/posts/grumpy-protocol-clients/) 글에서 Python 클라이언트와 Entra 로그인을 확인할 수 있습니다.

> MCP 및 A2A 채널은 미리 보기 상태입니다. 세 테넌트에서 이 절차를 테스트했으며 일반 공급 전에 세부 정보가 바뀔 수 있습니다.

## 구성 요소

호출되는 에이전트는 항상 Microsoft Copilot 하네스 에이전트입니다. 구성 요소 세 가지와 각 담당자를 먼저 파악해야 합니다.

| 구성 요소 | 설명 | 설정 담당 |
|---|---|---|
| **호출 대상 에이전트** | 크레딧이 있는 **Early** 환경에 게시된 에이전트 | 에이전트 제작자와 Power Platform 관리자 |
| **앱 등록** | 호출자를 위한 Entra 앱 하나 | ID 관리자 |
| **호출 에이전트** | 커넥터와 연결을 보유 | 에이전트 제작자 |

앱 등록 생성은 Learn 문서의 [사전 요구 사항: 앱 등록 만들기](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent#prerequisite-create-an-app-registration)를 따릅니다. 테스트에서 확인한 다음 사항도 시작 전에 알아 두면 좋습니다.

- **호출 대상 에이전트만 Early 환경이 필요합니다.** 호출자는 기본 환경과 같은 Standard release 환경에 있어도 됩니다.
- **앱 등록은 호출자만 필요합니다.** 호출 대상 에이전트의 엔드포인트는 일반적으로 테넌트에 이미 존재하는 Copilot Studio 채널 API로 보호됩니다. 애플리케이션 ID로 검색해도 나오지 않으면 호출 대상 에이전트의 MCP 또는 A2A 대화 상자를 한 번 열어 테넌트에 추가합니다.
- **API 이름은 달라질 수 있습니다.** 채널 API가 *Microsoft Copilot Studio Agent as MCP channel* 또는 *Microsoft Copilot Studio Agent MCP and A2A channels*로 표시될 수 있습니다. 애플리케이션 ID `6f46e6ed-07bf-4616-80f0-47546850f654`로 검색하면 찾을 수 있습니다.
- **동의는 프로토콜별로 필요합니다.** 사용자가 연결을 만들고 로그인할 때는 사용자 동의로 충분합니다. 시나리오 1의 7단계 OBO 구성에는 관리자 동의가 필요합니다. MCP 권한에 동의해도 A2A까지 동의한 것은 아닙니다.
- **호출자에게는 게시된 버전이 제공됩니다.** 저장했지만 게시되지 않은 변경 사항은 호출되지 않습니다.

다음 설정이 필요한 이유는 다음과 같습니다.

- **클라이언트 암호**: Copilot Studio 커넥터는 서버 측 웹 앱입니다. 서버에서 로그인 코드를 토큰으로 교환하며, 암호는 요청이 앱 등록에서 왔음을 증명합니다.
- **커넥터마다 리디렉션 URI 필요**: Entra는 앱에 등록된 주소로만 로그인 결과를 반환합니다.
- **OAuth 모드 "Manual"**: Entra는 동적 클라이언트 등록을 지원하지 않습니다. 테스트에서 "Dynamic"은 404를 반환했습니다. [Jira 원격 MCP 글](https://microsoft.github.io/mcscatblog/posts/atlassian-jira-remote-mcp-copilot-studio/)처럼 동적 등록을 지원하는 서버를 연결한다면 이 설정이 달라집니다.

## 호출 대상 에이전트의 URL 찾기

Early 환경에서 게시된 Microsoft Copilot 하네스 에이전트를 열고 **Triggers** 옆의 **+**를 선택한 다음 **MCP protocol** 또는 **A2A protocol**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/add-trigger.png' | relative_url }}" alt="Recurrence, Copilot, Microsoft Teams, Office 365 Outlook 등의 트리거와 Preview로 표시된 MCP protocol 및 A2A protocol이 보이는 Add a trigger 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Add a trigger 대화 상자의 MCP protocol 및 A2A protocol. Early release 환경에서만 표시됩니다.</figcaption>
</figure>

각 대화 상자에서 에이전트 URL을 확인할 수 있습니다.

```text
MCP:  https://api.powerplatform.com/copilotstudio-mcp/tenants/{tenantId}/environments/{environmentId}/agents/{agentSchemaName}
A2A:  https://api.powerplatform.com/copilotstudio-a2a/tenants/{tenantId}/environments/{environmentId}/agents/{agentSchemaName}
Card: {A2A URL}/.well-known/agent-card.json
```

대화 상자를 열어도 에이전트는 변경되지 않습니다. URL만 표시됩니다. A2A 대화 상자에서는 에이전트가 하는 작업의 이름과 설명인 **skills**도 입력하며 이 설정은 에이전트와 함께 저장됩니다. 테스트에서는 로그인한 클라이언트가 읽는 전체 에이전트 세부 정보에는 나타났지만 공개 Agent Card에는 표시되지 않았습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-endpoint-dialog.png' | relative_url }}" alt="에이전트 URL, Agent Card URL, hr-policy-questions 스킬이 표시된 A2A 클라이언트 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>A2A 대화 상자에 표시된 엔드포인트, Agent Card URL, 에이전트 스킬</figcaption>
</figure>

> [공식 문서](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent)는 같은 항목을 **Channels → Add a channel → MCP client / A2A client** 아래에 안내합니다. 해당 위치에서 볼 수도 있습니다. 어느 경로를 사용하든 호출 대상 에이전트에는 Early release 환경이 필요합니다. 게시 대화 상자에 "트리거를 추가할 때까지 실행되지 않음" 경고가 표시될 수 있지만 MCP 및 A2A 호출은 정상 작동했습니다.

## 시나리오 1: 표준 에이전트 → Microsoft Copilot 하네스 에이전트 (MCP)

프로덕션 표준 에이전트에 새 에이전트를 도구로 추가하면 됩니다. 표준 에이전트를 다시 만들 필요가 없습니다.

### 1. 앱 등록 준비

1. 앱 등록에서 채널 API의 위임 권한 **`MCS.InvokeAsMCP`**를 추가합니다.
2. **Certificates & secrets**에서 클라이언트 암호를 만들고 값을 복사합니다.

### 2. 표준 에이전트에 MCP 도구 추가

표준 에이전트에서 **Tools → Add a tool**로 이동하고 **Create new**에서 **Model Context Protocol**을 선택합니다. 그러면 [기존 MCP 서버를 에이전트에 추가](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent)할 때와 같은 **Add a Model Context Protocol server**가 열립니다.

| 필드 | 값 |
|---|---|
| Server name | 호출 대상 에이전트 이름(예: *HR Policy*) |
| Server description | 호출 대상 에이전트가 담당하는 작업(5단계 참고) |
| Server URL | 호출 대상 에이전트의 **MCP** URL |
| Authentication | **OAuth 2.0**을 선택한 후 기본 **Dynamic discovery** 대신 **Manual**을 선택 |

### 3. OAuth 값 입력

| 필드 | 값 |
|---|---|
| Client ID | 앱 등록의 Application (client) ID |
| Client secret | 1단계의 암호 값 |
| Authorization URL | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize` |
| Token URL template | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` |
| Refresh URL | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` |
| Scopes | `https://api.powerplatform.com/copilotstudio-mcp/MCS.InvokeAsMCP offline_access` |

`{tenantId}`를 Directory (tenant) ID로 바꿉니다. 연결이 토큰을 갱신할 수 있도록 범위에 `offline_access`를 포함해야 합니다. 토큰 없이 호출하면 서버가 광고하는 범위와 같습니다. 로그인 요청에 PKCE가 자동으로 포함되므로 별도 구성은 필요하지 않습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/mcp-oauth-manual.png' | relative_url }}" alt="OAuth 2.0 유형 Manual을 선택하고 client ID, authorization URL, token URL template, refresh URL, scopes를 입력한 MCP 서버 추가 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Manual OAuth를 사용하는 MCP 마법사. 여기서 tenant ID는 `{tenantId}`로 바꿨습니다.</figcaption>
</figure>

### 4. 리디렉션 URI 등록 및 연결 생성

1. 도구를 만들면 `https://global.consent.azure-apim.net/redirect/`로 시작하는 리디렉션 URL이 표시됩니다. 커넥터마다 다릅니다.
2. 앱 등록의 **Authentication → Add Redirect URI**(이전 환경에서는 **Add a platform**)에서 **Web**을 선택하고 URL을 정확하게 붙여 넣습니다.
3. Copilot Studio로 돌아와 연결을 만들고 로그인합니다. 사용자가 `MCS.InvokeAsMCP`에 동의하지 않았다면 Entra가 동의를 요청합니다. 관리자가 테넌트 전체에 동의를 부여한 경우 이 권한 동의 메시지는 표시되지 않습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/entra-web-redirect.png' | relative_url }}" alt="https://global.consent.azure-apim.net/redirect/로 시작하는 Web 리디렉션 URI가 등록된 앱 등록의 Authentication 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>커넥터의 리디렉션 URL을 앱 등록에 Web 리디렉션 URI로 추가</figcaption>
</figure>

도구 패널에는 `send-message`라는 도구 하나가 표시됩니다. 같은 환경의 여러 에이전트에서 커넥터와 연결을 공유할 수 있습니다. 테스트한 표준 에이전트는 이미 다른 에이전트에 생성해 둔 연결을 재사용했습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/standard-agent-mcp-tool.png' | relative_url }}" alt="연결과 send-message 도구 하나가 표시된 표준 에이전트의 MCP 도구 세부 정보 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Microsoft Copilot 하네스 에이전트를 MCP 도구로 추가한 표준 에이전트. 서버는 `send-message` 도구 하나를 노출합니다. 연결 계정은 자리 표시자로 바꿨습니다.</figcaption>
</figure>

### 5. 호출 에이전트에 사용 시점 안내

`send-message` 도구 설명은 호출 대상 에이전트 이름을 바탕으로 자동 생성됩니다. 예를 들어 "HR Policy 에이전트에 메시지를 보내 답변을 받습니다."처럼 표시됩니다. 에이전트 담당 업무는 설명에 포함되지 않으므로 **Server description**이 라우팅을 결정할 것이라 생각하기 쉽습니다. 원문에서는 두 구성을 비교했습니다.

- 구체적인 설명("휴가, 출장, 경비 및 기타 HR 정책 질문에 답변…"), 서버 이름 *HR Policy*
- 일반적인 설명("Model Context Protocol server endpoint."), 이전 도구를 삭제한 뒤 이름이 예약되어 있어 서버 이름은 *HR Policy MCP*

그 외 설정은 모두 같았습니다. 지침이 없는 동일한 표준 에이전트, 동일한 호출 대상, 동일한 `send-message` 도구를 사용하고, 일반 설명 테스트에서는 질문마다 새 세션을 시작했습니다. 설명이 어느 쪽이든 "육아휴직을 몇 주 받을 수 있나요?"와 "연차를 며칠까지 이월할 수 있나요?"는 도구를 호출했습니다. 활동 추적에는 설정된 설명이 표시됐으며 두 질문 모두 상세 설명을 필요로 하지 않았습니다.

다만 라우팅이 보장되는 것은 아닙니다. "7시간 비행에서 프리미엄 이코노미를 예약해도 되나요?"라는 질문이 도구 대신 기본 웹 검색으로 라우팅된 경우가 있었습니다. 웹 검색, 지식 또는 겹치는 도구가 있다면 표준 에이전트 지침에 호출 대상 에이전트를 언제 사용할지 명시합니다.

```text
For questions about leave, travel, expenses or other HR policies, use the
HR Policy tool. Don't answer HR policy questions from general knowledge
or web search.
```

**Server description**에도 에이전트의 담당 업무를 명확히 적어야 합니다. 이 값은 도구를 추가할 때 에이전트에 복사되며, 커넥터를 나중에 편집해도 바뀌지 않습니다. 설명을 바꾸려면 도구를 제거한 뒤 다시 추가해야 합니다.

### 6. 제작자로 테스트

호출 대상만 아는 내용을 표준 에이전트에 질문합니다. 활동 추적에 **Used tool: send-message**가 표시되며 테스트에서는 약 9~17초 뒤 답변이 돌아왔습니다. Copilot Studio가 반환된 `conversationId`를 자동 전달하므로 후속 질문에서도 대화 맥락이 유지됩니다. MCP 커넥터가 처음이라면 [첫 MCP 커넥터까지 5분](https://microsoft.github.io/mcscatblog/posts/hello-world-mcp-copilot-studio/)을 참고하세요.

### 7. 커넥터를 OBO 로그인으로 전환

기본 설정은 **End user credentials**이므로 표준 에이전트와 대화하는 각 사용자는 자신의 자격 증명으로 Microsoft Copilot 하네스 에이전트를 호출합니다. **Manual** OAuth에서 MCP 마법사는 일반 OAuth 2 ID 공급자를 사용하는 커넥터를 만들며, 사용자는 별도의 연결 관리자 페이지에서 다시 로그인해야 합니다. OBO(on-behalf-of) 로그인으로 전환하면 이미 수행한 로그인을 재사용하므로 대화 중 **Allow**를 한 번만 선택하면 됩니다. 일반 커넥터의 OBO는 [사용자 지정 커넥터에서 원활한 SSO](https://microsoft.github.io/mcscatblog/posts/obo-for-custom-connectors/)에서 다룹니다. 여기서는 사용자 지정 커넥터의 표준 OBO 설정을 사용하며 MCP 채널에 특화된 부분은 **Resource URL**과 `MCS.InvokeAsMCP` 권한입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-flow.png' | relative_url }}" alt="Mario가 IT Helpdesk 표준 에이전트에 질문하고 Allow를 선택하면 HR Policy 커넥터가 Mario의 토큰과 앱 정보를 Entra ID에 보내 MCP 엔드포인트용 사용자 토큰을 얻고, 에이전트는 Mario의 권한으로 호출을 받는 OBO 흐름" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>모든 단계가 로그인한 사용자로 실행됩니다. 커넥터 암호는 사용자 토큰을 교환할 수 있음을 증명합니다.</figcaption>
</figure>

먼저 [사용자 지정 커넥터의 OBO 인증 구성](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-custom-connector-on-behalf-of)에 따라 1단계의 앱 등록에 OBO를 추가합니다.

1. **Expose an API → Add a scope**에서 기본 Application ID URI (`api://{client-id}`)를 수락하고 범위 이름을 `access_as_user`로 지정합니다. **Who can consent**는 **Admins and users**, 상태는 **Enabled**로 둡니다.
2. **Authorized client applications → Add a client application**에서 `fe053c5f-3692-4f14-aef2-ee34fc081cae`(Azure API Connections)를 입력하고 `access_as_user`를 선택합니다. 그러면 Power Platform이 로그인 화면 없이 사용자를 대신해 커넥터 토큰을 가져올 수 있습니다.
3. **API permissions → Grant admin consent**에서 `MCS.InvokeAsMCP`에 관리자 동의를 부여합니다. 토큰 교환은 백그라운드에서 실행되므로 사용자에게 권한을 요청할 시점이 없습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-expose-api.png' | relative_url }}" alt="access_as_user 범위, 관리자와 사용자 동의 허용, 승인된 클라이언트 애플리케이션 fe053c5f-3692-4f14-aef2-ee34fc081cae가 표시된 앱 등록의 Expose an API 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>앱 등록의 클라이언트 ID는 `{client-id}` 자리 표시자로 바꿨습니다.</figcaption>
</figure>

그런 다음 Power Apps의 **Custom connectors**에서 MCP 마법사가 만든 커넥터의 연필 아이콘을 선택합니다. **2. Security**를 열고 **OAuth 2.0**의 **Edit**에서 다음을 지정합니다.

| 필드 | 값 |
|---|---|
| Identity Provider | **Azure Active Directory** (Microsoft Entra ID) |
| Enable Service Principal support | Off |
| Client ID | 앱 등록의 Application (client) ID |
| Client secret | 암호 값. ID 공급자를 바꾸면 지워지므로 다시 입력 |
| Authorization URL | 기본값 `https://login.microsoftonline.com` |
| Tenant ID | Directory (tenant) ID |
| Resource URL | `https://api.powerplatform.com/copilotstudio-mcp` |
| Enable on-behalf-of login | `true` |
| Scope | 3단계의 값(`…/MCS.InvokeAsMCP offline_access`) 유지 |

> **Resource URL**은 채널 API 식별자인 `https://api.powerplatform.com/copilotstudio-mcp`입니다. `https://api.powerplatform.com`은 별개의 Power Platform API이며, 그 대상으로 발급된 토큰은 MCP 엔드포인트에서 사용할 수 없습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-connector-security.png' | relative_url }}" alt="Azure Active Directory ID 공급자, Service Principal 비활성화, 자리 표시자 client 및 tenant ID, 기본 authorization URL, MCP Resource URL, OBO 로그인 활성화가 표시된 커넥터 Security 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>ID는 자리 표시자로 대체했습니다.</figcaption>
</figure>

**Update connector**를 선택합니다. 테스트에서는 리디렉션 URL이 동일하게 유지되어 앱 등록에 새 URI를 추가할 필요가 없었습니다. 전환 후 표준 에이전트에서 도구의 **Tools → MCP 도구 → Create new connection**을 선택해 새 연결을 만들고 지정합니다. 이 변경은 커넥터를 사용하는 모든 에이전트에 적용되므로 각 에이전트에서 같은 절차를 수행합니다.

### 8. 다른 사용자와 공유하고 테스트

각 사용자는 다음 항목이 필요합니다. 첫 세 항목은 한 명씩 공유하기보다 보안 그룹에 공유합니다.

- [에이전트 공유 문서](https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-share-bots)에 따라 게시된 표준 에이전트를 공유합니다.
- MCP 마법사가 만든 **사용자 지정 커넥터**를 **Can view** 권한으로 공유합니다(Power Apps → **Custom connectors** → **⋯** → **Invite another user**). 공유하지 않으면 *"does not have ReadAccess … connector"* 오류가 발생했습니다.
- **호출 대상 Microsoft Copilot 하네스 에이전트**도 공유해야 합니다. 공유하지 않은 테스트 사용자는 HR Policy 답변 대신 일반 답변을 받았습니다.
- 기본 환경이 아닌 경우 **호출 에이전트 환경의 보안 역할**이 필요합니다. **Basic User**로 충분했습니다. 역할이 없으면 동의 카드가 표시되더라도 **Allow**를 누르면 *"I couldn't connect. Open connection manager…"*가 발생하고 연결되지 않았습니다.

표준 에이전트를 Microsoft 365 Copilot에 게시하고 커넥터 연결이 없는 다른 사용자로 테스트했습니다. 두 에이전트는 모두 기본 환경이 아닌 동일한 Early 환경에 있어 보안 역할 요구 사항이 드러났습니다. 반면 호출 에이전트가 기본 환경에 있는 교차 환경 구성에서는 호출 대상의 Early 환경에서 에이전트를 공유하는 것으로 충분했습니다. 도구가 필요한 질문을 처음 했을 때 Microsoft 365 Copilot에 **Connect to continue** 카드가 표시됐습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-consent-card.png' | relative_url }}" alt="Allow 및 Cancel 버튼과 HR Policy 연결을 요청하는 Connect to continue 카드가 표시된 Microsoft 365 Copilot의 IT Helpdesk 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>연결 관리자 페이지 없이 대화 안에서 표시되는 동의 카드</figcaption>
</figure>

**Allow**를 선택하면 사용자의 연결이 만들어지고 호출 대상 에이전트의 답변을 반환합니다. 이후 질문에서는 동의 카드 없이 같은 연결을 사용합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-answer-after-allow.png' | relative_url }}" alt="HR 정책에서 가져온 세부 정보와 함께 유급 육아휴직이 26주라고 답변하는 IT Helpdesk 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Allow 이후의 답변. 세부 내용은 호출 대상 에이전트의 HR 핸드북에서 제공됩니다.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-followup-no-prompt.png' | relative_url }}" alt="연차 이월 후속 질문에 최대 5일이며 3월 31일에 만료된다고 동의 카드 없이 답변하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>동의 카드 없이 이어지는 후속 질문</figcaption>
</figure>

> 커넥터의 일반 OAuth 설정을 유지하면 도구는 작동하지만 사용자마다 *"Let's get you connected first… Open connection manager"*가 표시됩니다. 사용자는 직접 **Manage your connections** 페이지를 열어 연결한 뒤 돌아와 **Retry**를 선택해야 합니다.

## 시나리오 2: 환경 간 Microsoft Copilot 하네스 에이전트 (A2A)

필요한 에이전트를 다른 팀이 별도 환경에서 관리하는 경우 복사하지 않고 게시된 에이전트를 호출할 수 있습니다. 시나리오 1처럼 MCP도 환경 간 호출을 지원합니다. 여기서는 Microsoft Copilot 하네스 호출자가 Agent Card에서 다른 에이전트를 연결 에이전트로 추가할 수 있으므로 A2A를 사용합니다. 테스트에서는 호출자가 기본 환경, 호출 대상은 Early 환경에 있었습니다.

### 1. 앱 등록 준비

위임 권한 **`MCS.InvokeAsA2A`**를 추가합니다. 시나리오 1의 앱 등록과 암호를 재사용할 수 있지만 사용자는 A2A 권한에 별도로 동의해야 합니다.

### 2. 호출 에이전트에 A2A 에이전트 추가

1. [A2A 에이전트를 연결 에이전트로 추가](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-agent-to-agent)하는 방법에 따라 **Connected agents → + Add → Add A2A agent**로 이동합니다.
2. 호출 대상 에이전트의 **agent card URL**을 붙여 넣습니다.
3. **Get the name and description from**에서 **The agent's full details (Recommended)**를 유지합니다. 연결 후 전체 세부 정보를 읽으므로 이 화면에서 이름이나 설명을 입력하지 않습니다.
4. **OAuth 2.0**을 선택합니다. Copilot Studio는 일반적으로 Agent Card에서 **Authorization URL**, **Token URL**, **Refresh token URL**, **Scopes**를 가져옵니다. 비어 있다면 시나리오 1의 Entra URL을 입력합니다.
5. 클라이언트 ID와 암호를 입력합니다.
6. **Scopes**에 `MCS.InvokeAsA2A`는 있지만 `offline_access`가 빠져 있는지 확인합니다. 토큰 갱신을 위해 이를 추가합니다.

```text
https://api.powerplatform.com/copilotstudio-a2a/MCS.InvokeAsA2A offline_access
```

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/add-a2a-agent.png' | relative_url }}" alt="OAuth 2.0과 authorization, token, refresh token URL 및 offline_access가 추가된 MCS.InvokeAsA2A 범위를 설정한 A2A 에이전트 연결 양식" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>범위에 `offline_access`를 추가한 A2A 양식. ID는 자리 표시자로 바꿨습니다.</figcaption>
</figure>

### 3. 리디렉션 URI 등록 및 연결 생성

1. **Next**를 선택합니다. Copilot Studio가 커넥터를 만들고 `https://global.consent.azure-apim.net/redirect/`로 시작하는 리디렉션 URL을 표시합니다.
2. 시나리오 1과 같이 앱 등록에 **Web** 리디렉션 URI로 추가합니다.
3. Copilot Studio에서 **Connection** 목록을 열고 **Create new connection**, **Create**를 선택한 뒤 로그인합니다. 로그인은 `MCS.InvokeAsA2A offline_access` 권한을 요청합니다.

### 4. 설명 확인

**Next**를 선택해 에이전트에서 이름과 설명을 가져오는 **Review and add**로 이동합니다. 설명은 호출자가 라우팅에 사용하므로 추가 전에 검토해야 합니다. **The agent's full details**를 선택해도 테스트한 HR Policy 에이전트에는 *"Microsoft Copilot Studio agent 'HR Policy'."*라는 일반 설명만 표시됐습니다. (**공개 Agent Card**도 비슷한 일반 설명만 제공하며 앞서 추가한 스킬은 공개 카드에 포함되지 않습니다.)

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-review-description.png' | relative_url }}" alt="HR Policy라는 이름과 From the agent로 표시된 일반 설명 Microsoft Copilot Studio agent 'HR Policy'를 보여주는 Review and add 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>에이전트에서 가져온 설명. Add to agent를 선택하기 전에 바꿔야 합니다.</figcaption>
</figure>

Copilot Studio는 연결된 에이전트의 이름과 설명, 사용자 메시지 및 대화 맥락, 호출 에이전트 지침을 바탕으로 [A2A 에이전트에 라우팅](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-agent-to-agent#how-the-orchestrator-routes-to-the-a2a-agent)합니다. 따라서 다음처럼 에이전트 사용 시점을 설명하도록 바꿉니다.

```text
HR policy agent owned by the People team. Answers questions about leave,
travel, expenses and other HR policies. Use it for any HR policy question.
```

이 설명만 있고 호출 에이전트 지침이 없는 경우 "육아휴직을 몇 주 받을 수 있나요?"는 HR Policy로 라우팅됐습니다. 호출 에이전트에 자체 지침이나 겹치는 도구가 있다면 MCP 예시처럼 HR 정책 질문을 연결 에이전트로 보내도록 명시합니다.

### 5. 테스트

**Add to agent**를 선택해 저장한 뒤 호출 대상만 아는 내용을 질문합니다. 호출 대상 에이전트가 게시돼 있으면 호출 에이전트 게시 전에도 **Preview**에서 테스트할 수 있습니다. 추적에는 입력 및 출력과 함께 **Used tool: {your A2A agent}**가 표시되며 첫 답변은 테스트에서 약 17초 걸렸습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-call-trace.png' | relative_url }}" alt="context ID, HR Policy 에이전트의 26주 유급 육아휴직 답변, 17.5초 지연 시간과 호출 에이전트 답변을 표시한 A2A 도구 추적" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>호출 에이전트 추적의 출력: context ID와 호출된 에이전트의 답변, 이어지는 호출 에이전트의 응답</figcaption>
</figure>

> A2A 도구의 기본 안내는 후속 질문에서 모델이 `context_id`와 `task_id`를 모두 전달하도록 합니다. 그러나 모든 응답은 완료된 작업이므로 `task_id`를 전달하면 *"Task is in a terminal state"*라는 `-32004` 오류가 발생합니다. 후속 질문에는 `context_id`만 전달해야 합니다. 테스트 두 건에서는 호출 에이전트 모델이 자동으로 `task_id` 없이 재시도해 대화 맥락을 유지했습니다. 추적에서 해당 오류가 보인다면 이런 상황일 수 있습니다.

두 에이전트가 동일한 환경의 Microsoft Copilot 하네스 에이전트라면 어느 채널도 필요하지 않습니다. [연결 에이전트](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-add-other-agents)에 URL, 앱 등록, OAuth 없이 직접 등록할 수 있습니다.

## 두 채널의 차이

두 채널 모두 **같은 게시 에이전트**를 호출합니다. 채널에 따라 에이전트의 기능이나 답변은 달라지지 않습니다. 환경 간 액세스, 다른 팀 소유 에이전트 호출, 위임된 ID, Hooks, 과금은 동일하며 크레딧은 호출 대상 에이전트의 환경에서 소비됩니다. 달라지는 것은 호출자의 검색, 호출, 응답 수신 방식입니다.

| 항목 | MCP | A2A |
|---|---|---|
| Copilot Studio 호출자 | 표준 및 Microsoft Copilot 하네스 에이전트 | Microsoft Copilot 하네스 에이전트 |
| 프로토콜 버전 | MCP `2025-06-18` | A2A **1.0**만 지원 |
| 응답 | `send-message`의 완료된 응답 | 스트리밍 지원 |
| 검색 메타데이터 | 에이전트 이름으로 설명되는 도구 하나 | 스킬이 있는 Agent Card |
| 후속 질문 | `conversationId` | `context_id` |

각 항목을 조금 더 살펴보겠습니다.

- **표준 에이전트는 여기서 A2A를 사용할 수 없습니다.** 표준 하네스의 Agent2Agent 양식은 A2A 0.x 카드 형식을 기대하지만 Copilot Studio는 1.0 카드를 제공합니다. 테스트에서는 양식이 카드를 불러왔지만 커넥터를 만들지 못했습니다. 현재 표준 에이전트에서 사용할 수 있는 경로는 MCP뿐입니다.
- **기능보다 클라이언트 호환성이 중요합니다.** A2A 채널은 A2A 1.0 클라이언트만 허용합니다. Copilot Studio의 Microsoft Copilot 하네스는 1.0을 사용하지만 다른 A2A 클라이언트는 호환성을 확인해야 합니다.
- **스트리밍은 채널 기능입니다.** A2A 채널은 `SendStreamingMessage`로 응답을 스트리밍하지만 MCP의 `send-message`는 완료된 응답을 반환합니다. 사용자 지정 클라이언트에서 특히 중요한 차이로, [CATBOT 글](https://microsoft.github.io/mcscatblog/posts/grumpy-protocol-clients/)에서 두 방법을 다룹니다.
- **검색 정보가 곧 라우팅 정보는 아닙니다.** Agent Card와 스킬은 A2A 클라이언트가 에이전트를 찾는 데 사용하는 메타데이터입니다. Copilot Studio 라우팅은 연결 에이전트 이름과 설명, 대화, 호출 에이전트 지침을 사용합니다. 따라서 시나리오 2의 4단계 설명이 중요합니다.

> 호출 대상 에이전트의 [Agent hooks](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/hooks-overview)는 두 채널 모두에서 실행됩니다. `metadata.channel`은 `mcs-agent-as-mcp` 또는 `mcs-agent-as-a2a`이며 `userAadObjectId`는 로그인한 호출자를 나타냅니다. Hook에서 에이전트 호출과 직접 대화하는 사람을 다르게 처리할 수 있습니다. Hooks를 처음 사용한다면 [Copilot Studio의 Hooks](https://microsoft.github.io/mcscatblog/posts/hooks-in-copilot-studio/)부터 확인하세요.

## 핵심 요약

- **표준** 에이전트는 다시 만들지 않고 **MCP 도구**로 Microsoft Copilot 하네스 에이전트를 사용할 수 있습니다.
- **Microsoft Copilot 하네스** 에이전트는 복사하지 않고 **A2A 연결 에이전트**로 다른 환경의 에이전트를 호출할 수 있습니다.
- 두 방법 모두 호출 대상 에이전트의 Early 환경, 클라이언트 암호가 있는 앱 등록, 커넥터별 Web 리디렉션 URI가 필요합니다. MCP에는 **Manual** OAuth도 필요합니다.
- MCP 테스트에서는 구체적 설명과 일반 설명 모두 라우팅됐습니다. 명확한 이름과 설명을 사용하고 웹 검색이나 다른 도구가 겹치면 호출 에이전트 지침에 사용 시점을 추가합니다.
- MCP 커넥터를 **on-behalf-of** 로그인으로 전환하면 다른 사용자는 연결 관리자 대신 대화 중 **Allow**를 한 번 선택하면 됩니다.
- 채널은 호출 가능한 에이전트, 프로토콜 버전, 스트리밍 및 검색 메타데이터에서 차이가 있으며 호출 대상의 기능 자체는 달라지지 않습니다.

가장 먼저 어떤 프로덕션 에이전트를 Microsoft Copilot 하네스 에이전트에 연결하시겠어요? 댓글로 알려 주세요.
