---
layout: "chapter"
title: "MCP와 A2A로 다른 Copilot Studio 에이전트에서 Microsoft Copilot 하네스 에이전트 호출하기"
short_title: "하네스 에이전트 연결"
description: "표준 에이전트에서 MCP로, 하네스 에이전트 사이에서는 A2A로 다른 Copilot Studio 에이전트를 호출하고 OBO 로그인을 구성합니다."
order: 22
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/"
source_author: "ssivaraman"
source_published: "2026-11-12"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)
(Microsoft Copilot Studio CAT)의 ssivaraman(@ssivaraman) 원문
[Call Microsoft Copilot Harness Agents from Other Copilot Studio Agents with MCP and A2A](https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/)(2026-11-12)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/header.png' | relative_url }}" alt="가운데의 Microsoft Copilot 하네스 에이전트가 두 엔드포인트를 노출하고, 표준 에이전트는 MCP로, 다른 환경의 Microsoft Copilot 하네스 에이전트는 A2A로 호출하며, 두 호출 모두 로그인한 사용자로 Microsoft Entra ID를 거침" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

프로덕션에서 표준 Copilot Studio 에이전트를 운영 중이라고 가정해 봅시다. 에이전트는 잘 작동하고 사용자도 사용하고 있으니 다시 만들고 싶지 않을 것입니다. 한편 새 에이전트는 다른 팀과 환경에서 [Microsoft Copilot 하네스](https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview)(이전 GitHub Copilot 하네스)를 기반으로 만들고 있습니다.

자연히 두 가지 질문이 생깁니다.

1. **기존 표준 에이전트를 다시 만들지 않고도 새 Microsoft Copilot 하네스 에이전트를 사용할 수 있을까요?**
2. **내 Microsoft Copilot 하네스 에이전트가 다른 환경에 있는 다른 팀의 에이전트를 복사하지 않고 호출할 수 있을까요?**

두 방법 모두 Microsoft Copilot 하네스 에이전트가 노출하는 [MCP 및 A2A 채널](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent)을 통해 현재 사용할 수 있습니다. 이 글은 **호출하는 쪽과 대상이 모두 Copilot Studio 에이전트일 때** 각 방법을 작동시킨 설정입니다. OAuth 값, 리디렉션 URI, 연결, 라우팅, 다른 사용자가 이용하기 전에 필요한 사항을 다룹니다.

자체 앱이나 스크립트에서 에이전트를 호출한다면 CATBOT의 [MCP 및 A2A 문서를 Adi 대신 읽어봤다](https://microsoft.github.io/mcscatblog/posts/grumpy-protocol-clients/)에서 Python 클라이언트와 Entra 로그인을 확인하세요.

> MCP 및 A2A 채널은 프리뷰 상태입니다. 세 테넌트에서 이 안내를 테스트했습니다. 정식 출시 전 세부 사항이 달라질 수 있습니다.

## 구성 요소의 역할

세 부분으로 구성되며 각 부분을 누가 설정하는지 알아두면 편리합니다. 호출 대상 에이전트는 항상 Microsoft Copilot 하네스 에이전트입니다.

| 구성 요소 | 설명 | 설정 담당 |
|---|---|---|
| **호출 대상 에이전트** | 크레딧이 있는 **Early** 환경에 게시된 에이전트 | 에이전트 작성자와 Power Platform 관리자 |
| **앱 등록** | 호출자용 Entra 앱 하나 | ID 관리자 |
| **호출 에이전트** | 커넥터와 연결이 있는 에이전트 | 에이전트 작성자 |

앱 등록은 Learn 문서의 [사전 요구 사항: 앱 등록 만들기](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent#prerequisite-create-an-app-registration)를 따릅니다. 테스트에서 확인한 다음 사항을 먼저 알아두면 좋습니다.

- **호출 대상 에이전트만 Early 환경이 필요합니다.** 기본 환경과 같은 Standard release 환경에 호출 에이전트를 둘 수 있습니다.
- **등록은 호출자만 필요합니다.** 호출 대상 에이전트의 엔드포인트는 Copilot Studio 채널 API로 보호되며 이 API는 보통 테넌트에 이미 있습니다. 애플리케이션 ID로 검색되지 않으면 호출 대상 에이전트의 MCP 또는 A2A 대화 상자를 한 번 열어 테넌트에 추가합니다.
- **API 이름은 다를 수 있습니다.** 채널 API는 *Microsoft Copilot Studio Agent as MCP channel* 또는 *Microsoft Copilot Studio Agent MCP and A2A channels*로 표시될 수 있습니다. 애플리케이션 ID `6f46e6ed-07bf-4616-80f0-47546850f654`로 검색하면 어느 이름이든 찾을 수 있습니다.
- **동의는 프로토콜별로 필요합니다.** 사용자가 연결을 만들고 로그인할 때는 사용자 동의로 충분합니다. 시나리오 1의 7단계 OBO 구성에는 관리자 동의가 필요합니다. MCP 권한에 동의해도 A2A 동의까지 완료되는 것은 아닙니다.
- **호출자는 게시된 버전을 사용합니다.** 호출 대상 에이전트에서 저장했지만 게시하지 않은 변경 사항은 제공되지 않습니다.

설정 방식이 다음과 같은 이유도 알아두면 좋습니다.

- **클라이언트 암호**가 필요한 이유는 Copilot Studio 커넥터가 서버 측 웹 앱이기 때문입니다. 서버에서 로그인 코드를 토큰으로 교환하며 암호로 해당 요청이 앱 등록에서 왔음을 증명합니다.
- **커넥터별 리디렉션 URI**가 필요한 이유는 Entra가 앱에 등록된 주소로만 로그인 결과를 반환하기 때문입니다.
- **OAuth 모드 "Manual"**을 사용하는 이유는 Entra가 동적 클라이언트 등록을 지원하지 않기 때문입니다. 테스트에서 "Dynamic"은 404를 반환했습니다. [Jira 원격 MCP 글](https://microsoft.github.io/mcscatblog/posts/2026-05-15-atlassian-jira-remote-mcp-copilot-studio/)처럼 이를 지원하는 서버를 연결했다면 이 부분이 달라집니다.

## 호출 대상 에이전트 URL 찾기

Early 환경에서 게시된 Microsoft Copilot 하네스 에이전트를 열고 **Triggers** 옆의 **+**를 선택한 뒤 **MCP protocol** 또는 **A2A protocol**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/add-trigger.png' | relative_url }}" alt="Recurrence, Copilot, Microsoft Teams, Office 365 Outlook 등의 트리거와 Preview 표시가 있는 MCP protocol, A2A protocol이 나열된 Add a trigger 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Add a trigger 대화 상자에서 **MCP protocol**과 **A2A protocol**을 선택할 수 있습니다. Early release 환경에서만 표시됩니다.</figcaption>
</figure>

각 대화 상자에서 에이전트 URL을 확인할 수 있습니다.

```text
MCP:  https://api.powerplatform.com/copilotstudio-mcp/tenants/{tenantId}/environments/{environmentId}/agents/{agentSchemaName}
A2A:  https://api.powerplatform.com/copilotstudio-a2a/tenants/{tenantId}/environments/{environmentId}/agents/{agentSchemaName}
Card: {A2A URL}/.well-known/agent-card.json
```

대화 상자를 열어도 URL이 표시될 뿐 에이전트가 변경되지는 않습니다. A2A 대화 상자에는 에이전트가 수행하는 각 작업의 이름과 설명인 **skills**도 있으며, 이 설정은 에이전트와 함께 저장됩니다. 테스트에서는 로그인한 클라이언트가 읽는 전체 에이전트 세부 정보에는 나타났지만 공개 에이전트 카드에는 표시되지 않았습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-endpoint-dialog.png' | relative_url }}" alt="A2A URL, 에이전트 카드 URL, hr-policy-questions라는 skill 하나가 표시된 A2A 클라이언트 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>A2A 대화 상자: 엔드포인트, 에이전트 카드 URL, 에이전트의 기술</figcaption>
</figure>

> [공식 문서](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent)에는 **Channels → Add a channel → MCP client / A2A client** 아래에 같은 항목이 설명되어 있으며 이 경로에서 확인할 수도 있습니다. 어느 경로든 호출 대상 에이전트는 Early release 환경에 있어야 합니다. Publish 대화 상자에서 "트리거를 추가할 때까지 실행되지 않습니다"라는 경고가 표시될 수 있지만 MCP와 A2A 호출은 정상 작동했습니다.

## 시나리오 1: 표준 에이전트 → Microsoft Copilot 하네스 에이전트(MCP)

프로덕션 표준 에이전트에 새 에이전트가 도구로 하나 추가됩니다. 표준 에이전트를 다시 만들 필요가 없습니다.

### 1. 앱 등록 준비

1. 앱 등록에 채널 API의 위임 권한 **`MCS.InvokeAsMCP`**를 추가합니다.
2. **Certificates & secrets**에서 클라이언트 암호를 만들고 값을 복사합니다.

### 2. 표준 에이전트에 MCP 도구 추가

표준 에이전트에서 **Tools → Add a tool**로 이동하고 **Create new**에서 **Model Context Protocol**을 선택합니다. 그러면 [기존 MCP 서버를 에이전트에 추가하기](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent)에 설명된 **Add a Model Context Protocol server**가 열립니다. 다음을 입력합니다.

| 필드 | 값 |
|---|---|
| Server name | 호출 대상 에이전트의 이름(예: *HR Policy*) |
| Server description | 호출 대상 에이전트의 기능 설명(5단계 참고) |
| Server URL | 호출 대상 에이전트의 **MCP** URL |
| Authentication | **OAuth 2.0**을 선택하고 기본 **Dynamic discovery** 대신 **Manual**을 선택 |

### 3. OAuth 값 입력

| 필드 | 값 |
|---|---|
| Client ID | 앱 등록의 Application (client) ID |
| Client secret | 1단계의 암호 값 |
| Authorization URL | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize` |
| Token URL template | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` |
| Refresh URL | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` |
| Scopes | `https://api.powerplatform.com/copilotstudio-mcp/MCS.InvokeAsMCP offline_access` |

`{tenantId}`를 디렉터리(테넌트) ID로 바꿉니다. 연결에서 토큰을 갱신할 수 있도록 `offline_access`를 포함해야 합니다. 토큰 없이 서버에 호출할 때 서버가 광고하는 범위와 같습니다. PKCE를 설정할 필요는 없습니다. 로그인 요청에 자동 포함됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/mcp-oauth-manual.png' | relative_url }}" alt="OAuth 2.0 유형 Manual을 선택하고 client ID, authorization URL, token URL template, refresh URL, scopes를 입력한 Add a Model Context Protocol server 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>**Manual** OAuth가 설정된 MCP 마법사. 여기서 테넌트 ID는 `{tenantId}`로 바꿨습니다.</figcaption>
</figure>

### 4. 리디렉션 URI 등록 및 연결 만들기

1. 도구를 만들 때 `https://global.consent.azure-apim.net/redirect/`로 시작하는 리디렉션 URL이 표시됩니다. 커넥터마다 고유합니다.
2. 앱 등록에서 **Authentication → Add Redirect URI**(이전 환경에서는 **Add a platform**)로 이동하고 **Web**을 선택한 뒤 표시된 URL을 정확히 붙여넣습니다.
3. Copilot Studio로 돌아와 연결을 만들고 로그인합니다. 사용자가 `MCS.InvokeAsMCP`에 아직 동의하지 않았다면 Entra가 동의를 요청합니다. 관리자가 테넌트 전체 동의를 미리 부여했다면 사용자에게 권한 동의 메시지가 표시되지 않습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/entra-web-redirect.png' | relative_url }}" alt="https://global.consent.azure-apim.net/redirect/로 시작하는 Web 리디렉션 URI가 표시된 앱 등록의 Authentication 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>커넥터의 리디렉션 URL을 앱 등록에 **Web** 리디렉션 URI로 추가</figcaption>
</figure>

그다음 도구 패널에 `send-message` 도구 하나가 표시됩니다. 커넥터와 연결 하나를 같은 환경의 여러 에이전트에서 사용할 수 있습니다. 표준 에이전트는 다른 에이전트용으로 만들어 둔 연결을 재사용했습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/standard-agent-mcp-tool.png' | relative_url }}" alt="연결과 send-message 도구 하나가 표시된 표준 에이전트의 MCP 도구 세부 정보 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Microsoft Copilot 하네스 에이전트를 MCP 도구로 추가한 표준 에이전트. 서버는 `send-message` 도구 하나를 노출하며 연결 계정은 자리 표시자로 바꿨습니다.</figcaption>
</figure>

### 5. 호출 에이전트에 도구 사용 시점 안내

`send-message` 도구 설명은 호출 대상 에이전트의 이름을 사용해 자동 생성됩니다. 예를 들어 "HR Policy 에이전트에 메시지를 보내고 답변을 받습니다."라고 표시됩니다. 에이전트의 담당 영역은 알려주지 않으므로 라우팅이 **Server description**에 달려 있다고 생각하기 쉽습니다. 두 설정을 비교했습니다.

- 구체적인 설명("휴가, 출장, 경비 및 기타 HR 정책 질문에 답변…"), 서버 이름 *HR Policy*
- 일반적인 설명("Model Context Protocol server endpoint."), 이전 도구 삭제 후 기존 이름이 예약된 탓에 서버 이름 *HR Policy MCP*

그 외에는 동일했습니다. 지침이 없는 동일한 표준 에이전트, 동일한 호출 대상 에이전트, 동일한 `send-message` 도구를 사용했고 일반 설명 테스트에서는 질문마다 새 세션을 시작했습니다. 어느 설명을 사용해도 "육아 휴직은 몇 주인가요?"와 "연차를 며칠까지 이월할 수 있나요?" 질문이 도구를 호출했습니다. 활동 추적에 설정된 설명이 표시되었으며 두 질문 모두에 상세한 설명이 필수는 아니었습니다.

다만 라우팅이 보장되지는 않습니다. 한 번은 "7시간 비행에 프리미엄 이코노미를 예약할 수 있나요?"라는 질문이 도구 대신 에이전트의 기본 웹 검색으로 라우팅됐습니다. 에이전트에 웹 검색, 지식 또는 겹치는 도구가 있다면 표준 에이전트 지침에 호출 대상 에이전트의 사용 시점을 명시하세요.

```text
휴가, 출장, 경비 또는 기타 HR 정책 질문에는 HR Policy 도구를 사용합니다.
일반 지식이나 웹 검색으로 HR 정책 질문에 답하지 않습니다.
```

담당 영역이 명시된 **Server description**도 작성해야 합니다. 처음에 올바르게 작성하세요. 도구를 추가할 때 에이전트에 복사되며, 이후 커넥터를 편집해도 설명은 바뀌지 않습니다. 설명을 바꾸려면 도구를 제거한 뒤 다시 추가해야 합니다.

### 6. 제작자로 테스트

호출 대상 에이전트만 아는 내용을 표준 에이전트에 질문합니다. 활동 추적에 **Used tool: send-message**가 표시되고, 테스트에서는 답변이 약 9~17초 내에 돌아왔습니다. Copilot Studio가 반환된 `conversationId`를 자동 전달하므로 후속 질문에서도 문맥이 유지됩니다. MCP 커넥터가 처음이라면 [첫 MCP 커넥터 만들기 5분 가이드](https://microsoft.github.io/mcscatblog/posts/2026-04-10-hello-world-mcp-copilot-studio/)에서 기본 사항을 확인하세요.

### 7. 커넥터를 OBO 로그인으로 전환

도구는 기본적으로 **End user credentials**를 사용하므로 표준 에이전트와 채팅하는 각 사용자는 본인으로 Microsoft Copilot 하네스 에이전트를 호출합니다. **Manual** OAuth에서 MCP 마법사는 일반 OAuth 2 ID 공급자를 사용하는 커넥터를 만듭니다. 따라서 사용자마다 별도의 연결 관리자 페이지에서 다시 로그인해야 합니다. 커넥터를 OBO(on-behalf-of) 로그인으로 전환하면 기존 로그인 정보를 재사용하므로 대화 중 **Allow**를 한 번만 선택하면 됩니다. 일반 커넥터의 OBO는 [사용자 지정 커넥터의 원활한 SSO](https://microsoft.github.io/mcscatblog/posts/2025-12-05-obo-for-custom-connectors/)에서 다룹니다. 다음은 사용자 지정 커넥터의 표준 OBO 설정이며 MCP 채널에 특화된 항목은 **Resource URL**과 `MCS.InvokeAsMCP` 권한입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-flow.png' | relative_url }}" alt="Mario가 Microsoft 365 Copilot에서 IT Helpdesk 표준 에이전트에게 질문하고 Connect to continue 카드에서 Allow를 선택함. HR Policy 커넥터는 커넥터 앱용 Mario 토큰, client ID 및 secret을 Microsoft Entra ID에 보내고 Copilot Studio MCP 엔드포인트용 Mario 토큰을 받음. HR Policy 에이전트는 Mario로 호출을 받음." loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>각 단계는 로그인한 사용자로 실행됩니다. 커넥터 암호는 사용자 토큰을 교환할 수 있다는 사실만 증명합니다.</figcaption>
</figure>

먼저 [사용자 지정 커넥터에 OBO 인증 구성](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced/custom-connector-on-behalf-of)에 따라 1단계에서 만든 앱 등록에 OBO를 추가합니다.

1. **Expose an API → Add a scope**를 선택합니다. 기본 Application ID URI(`api://{client-id}`)를 사용하고 범위 이름을 `access_as_user`로 지정합니다. **Who can consent**는 **Admins and users**로 설정하고 **Enabled** 상태를 유지합니다.
2. **Authorized client applications → Add a client application**을 선택합니다. `fe053c5f-3692-4f14-aef2-ee34fc081cae`(Azure API Connections)를 입력하고 `access_as_user`를 선택합니다. 이를 통해 Power Platform이 로그인 화면 없이 사용자를 대신해 커넥터 토큰을 가져옵니다.
3. **API permissions → Grant admin consent**에서 `MCS.InvokeAsMCP`에 관리자 동의를 부여합니다. 토큰 교환은 백그라운드에서 진행되므로 사용자에게 권한을 묻는 단계가 없습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-expose-api.png' | relative_url }}" alt="access_as_user 범위와 동의 가능 대상 Admins and users, 승인된 클라이언트 애플리케이션 fe053c5f-3692-4f14-aef2-ee34fc081cae가 표시된 앱 등록의 Expose an API 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>여기서 클라이언트 ID는 `{client-id}`로 바꿨습니다.</figcaption>
</figure>

그런 다음 Power Apps의 **Custom connectors**에서 MCP 마법사가 만든 커넥터의 연필 아이콘을 선택합니다. **2. Security**를 열고 **OAuth 2.0** 아래에서 **Edit**를 선택한 다음 설정합니다.

| 필드 | 값 |
|---|---|
| Identity Provider | **Azure Active Directory**(Microsoft Entra ID) |
| Enable Service Principal support | 끔 |
| Client ID | 앱 등록의 Application (client) ID |
| Client secret | 암호 값. ID 공급자를 바꾸면 지워지므로 다시 입력합니다. |
| Authorization URL | `https://login.microsoftonline.com`(기본값) |
| Tenant ID | 디렉터리(테넌트) ID |
| Resource URL | `https://api.powerplatform.com/copilotstudio-mcp` |
| Enable on-behalf-of login | `true` |
| Scope | 3단계의 값(`…/MCS.InvokeAsMCP offline_access`) 유지 |

> **Resource URL**은 채널 API 식별자인 `https://api.powerplatform.com/copilotstudio-mcp`입니다. `https://api.powerplatform.com`은 별도의 Power Platform API이며 해당 API용 토큰은 MCP 엔드포인트에서 사용할 수 없습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-connector-security.png' | relative_url }}" alt="Azure Active Directory ID 공급자, 꺼진 Service Principal 지원, 자리 표시자 client ID와 tenant ID, 기본 authorization URL, Resource URL https://api.powerplatform.com/copilotstudio-mcp, true로 설정된 Enable on-behalf-of login이 표시된 커넥터 Security 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>ID는 자리 표시자로 바꿨습니다.</figcaption>
</figure>

**Update connector**를 선택합니다. 테스트에서 리디렉션 URL은 그대로 유지되어 앱 등록에 새 리디렉션 URI를 추가할 필요가 없었습니다. 전환 후 표준 에이전트의 도구에서 (**Tools** → MCP 도구 → **Create new connection**) 새 연결을 만들고 선택합니다. 전환은 이 커넥터를 사용하는 모든 에이전트에 적용되므로 각 에이전트에서도 같은 작업을 합니다.

### 8. 공유하고 다른 사용자로 테스트

각 사용자에게 다음 항목이 필요합니다. 처음 세 항목은 사용자별이 아니라 보안 그룹에 공유합니다.

- [다른 사용자와 에이전트 공유](https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-share-bots)에 따라 게시된 에이전트에 일반적인 방식으로 **표준 에이전트**를 공유합니다.
- MCP 마법사가 만든 **사용자 지정 커넥터**를 **Can view** 권한으로 공유합니다(Power Apps → **Custom connectors** → **⋯** → **Invite another user**). [조직의 사용자 지정 커넥터 공유](https://learn.microsoft.com/en-us/connectors/custom-connectors/share)를 참고하세요. 공유하지 않으면 *"does not have ReadAccess … connector"* 오류로 연결에 실패했습니다.
- **호출 대상 Microsoft Copilot 하네스 에이전트**도 사용자에게 공유합니다. 공유 전에는 테스트 사용자가 HR Policy 답변이 아닌 일반적인 답변을 받았습니다.
- 기본 환경이 아니라면 **호출 에이전트 환경의 보안 역할**도 필요합니다. **Basic User**면 충분했습니다. 역할이 없으면 동의 카드가 표시되지만 **Allow**를 누른 뒤 *"I couldn't connect. Open connection manager…"* 오류가 발생하고 연결이 만들어지지 않았습니다.

표준 에이전트를 Microsoft 365 Copilot에 게시하고 커넥터 연결이 없는 두 번째 사용자로 테스트했습니다. 작성자가 아닌 해당 사용자에게 두 에이전트를 기본 환경이 아닌 동일한 Early 환경에 두어 보안 역할 요구 사항이 드러났습니다. 호출 에이전트가 기본 환경에 있는 교차 환경 설정에서는 호출 대상 에이전트의 Early 환경에서 공유만 하면 됐습니다. 도구가 필요한 질문을 처음 했을 때 Microsoft 365 Copilot에 **Connect to continue** 카드가 표시됐습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-consent-card.png' | relative_url }}" alt="Allow 및 Cancel 버튼이 있는 HR Policy Connect to continue 카드가 표시된 Microsoft 365 Copilot의 IT Helpdesk 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>대화 안에서 표시되는 동의 카드. 별도의 연결 관리자 페이지가 없습니다.</figcaption>
</figure>

**Allow**를 선택하면 사용자의 연결이 만들어지고 에이전트가 호출 대상 에이전트의 답변을 반환합니다. 이후 질문에서는 같은 연결을 사용하므로 카드가 다시 표시되지 않습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-answer-after-allow.png' | relative_url }}" alt="Mario가 완전 유급 육아 휴직 26주(6개월)를 받을 수 있다고 HR 정책 세부 정보와 함께 답변하는 IT Helpdesk 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>**Allow**를 선택한 후의 답변. 세부 내용은 호출 대상 에이전트의 HR 핸드북에서 제공됩니다.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-followup-no-prompt.png' | relative_url }}" alt="연차 이월에 대한 후속 질문에 최대 5일이며 3월 31일에 만료된다고 직접 답변하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>후속 질문에는 동의 카드가 다시 표시되지 않습니다.</figcaption>
</figure>

> 커넥터를 일반 OAuth 설정으로 두어도 도구는 작동하지만 각 사용자에게 *"Let's get you connected first… Open connection manager"*가 표시됩니다. 사용자는 직접 **Manage your connections** 페이지를 열어 연결한 뒤 돌아와 **Retry**를 선택해야 합니다.

## 시나리오 2: 환경 간 Microsoft Copilot 하네스 에이전트(A2A)

다른 팀이 자체 환경에서 필요한 에이전트를 소유하고 있습니다. 복사하는 대신 게시된 에이전트를 호출합니다. 시나리오 1처럼 MCP로 환경 간 호출도 가능하지만, 이 시나리오에서는 호출 에이전트가 Microsoft Copilot 하네스 에이전트이므로 에이전트 카드를 통해 연결 에이전트로 추가할 수 있는 A2A를 사용합니다. 테스트에서는 호출 에이전트가 기본 환경에, 호출 대상 에이전트는 Early 환경에 있었습니다.

### 1. 앱 등록 준비

위임 권한 **`MCS.InvokeAsA2A`**를 추가합니다. 시나리오 1의 앱 등록과 암호를 재사용할 수 있지만 사용자는 A2A에 별도로 동의해야 합니다.

### 2. 호출 에이전트에 A2A 에이전트 추가

1. [Agent2Agent(A2A) 에이전트를 연결 에이전트로 추가](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-agent-to-agent)에 따라 호출 에이전트에서 **Connected agents → + Add → Add A2A agent**로 이동합니다.
2. 호출 대상 에이전트의 **agent card URL**을 붙여넣습니다.
3. **Get the name and description from**에서 **The agent's full details (Recommended)**를 유지합니다. 해당 정보는 연결 후 읽기 때문에 이 양식에는 이름이나 설명 입력란이 아직 표시되지 않습니다.
4. **OAuth 2.0**을 선택합니다. Copilot Studio는 보통 카드에서 **Authorization URL**, **Token URL**, **Refresh token URL**, **Scopes**를 가져옵니다. 비어 있다면 시나리오 1과 같은 Entra URL을 입력합니다.
5. client ID와 암호를 입력합니다.
6. **Scopes**를 확인합니다. 카드의 값에 `MCS.InvokeAsA2A`는 있지만 `offline_access`는 없습니다. 연결이 토큰을 갱신할 수 있도록 시나리오 1처럼 `offline_access`를 추가합니다. 전체 값은 다음과 같습니다.

   ```text
   https://api.powerplatform.com/copilotstudio-a2a/MCS.InvokeAsA2A offline_access
   ```

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/add-a2a-agent.png' | relative_url }}" alt="OAuth 2.0을 선택하고 authorization, token, refresh token URL을 입력했으며 MCS.InvokeAsA2A 범위에 offline_access를 추가한 A2A 에이전트 연결 양식" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>범위에 `offline_access`를 추가한 A2A 양식. ID는 자리 표시자로 바꿨습니다.</figcaption>
</figure>

### 3. 리디렉션 URI 등록 및 연결 만들기

1. **Next**를 선택합니다. Copilot Studio가 커넥터를 만들고 `https://global.consent.azure-apim.net/redirect/`로 시작하는 리디렉션 URL을 표시합니다.
2. 시나리오 1처럼 앱 등록에 **Web** 리디렉션 URI로 추가합니다.
3. Copilot Studio로 돌아와 **Connection** 목록을 열고 **Create new connection**, **Create**를 선택한 뒤 로그인합니다. 로그인 요청은 `MCS.InvokeAsA2A offline_access`를 요구합니다.

### 4. 설명 확인

**Next**를 눌러 에이전트 이름과 설명이 표시되는 **Review and add**로 이동합니다. 설명은 호출 에이전트의 라우팅에 사용되므로 추가 전에 읽어야 합니다. **The agent's full details**를 선택했는데도 테스트의 HR Policy 에이전트 설명은 *"Microsoft Copilot Studio agent 'HR Policy'."*뿐이어서 사용 시점을 알려주지 않았습니다. (**공개 에이전트 카드**에도 비슷한 일반 텍스트만 있고 추가한 기술은 표시되지 않습니다.)

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-review-description.png' | relative_url }}" alt="HR Policy라는 이름과 Microsoft Copilot Studio agent 'HR Policy.'라는 일반 설명, From the agent 표시가 있는 Review and add 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>에이전트에서 가져온 설명. **Add to agent**를 누르기 전에 교체합니다.</figcaption>
</figure>

Copilot Studio는 에이전트 이름과 설명, 사용자 메시지 및 대화 문맥, 호출 에이전트 지침을 기준으로 [A2A 에이전트에 라우팅](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-agent-to-agent#how-the-orchestrator-routes-to-the-a2a-agent)합니다. 따라서 사용 시점이 명시된 설명으로 바꿉니다. 예를 들면 다음과 같습니다.

```text
HR policy agent owned by the People team. Answers questions about leave,
travel, expenses and other HR policies. Use it for any HR policy question.
```

이 설명만 입력하고 호출 에이전트에는 지침을 설정하지 않았을 때 "육아 휴직은 몇 주인가요?"가 HR Policy로 라우팅됐습니다. 호출 에이전트에 자체 지침이나 겹치는 도구가 있으면 위 MCP 예와 마찬가지로 HR 정책 질문을 연결 에이전트에 전달하도록 추가합니다.

### 5. 테스트

**Add to agent**를 선택하고 저장한 다음, 호출 대상 에이전트만 아는 내용을 호출 에이전트에 질문합니다. 호출 대상 에이전트가 이미 게시되어 있다면 호출 에이전트를 게시하기 전에 **Preview**에서 테스트할 수 있습니다. 추적에는 입력 및 출력과 함께 **Used tool: {A2A 에이전트 이름}**이 표시됩니다. 첫 답변은 테스트에서 약 17초 만에 돌아왔습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-call-trace.png' | relative_url }}" alt="문맥 ID, 육아 휴직 26주 답변, 17.5초 지연 시간, 호출 에이전트의 답변이 표시된 A2A 도구 출력 추적" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>호출 에이전트 추적의 출력 부분: 문맥 ID, 호출된 에이전트의 답변, 호출 에이전트의 응답</figcaption>
</figure>

> A2A 도구의 기본 안내는 후속 요청에 `context_id`와 `task_id`를 모두 전달하도록 모델에 지시합니다. 그러나 각 응답은 완료된 작업이므로 `task_id`를 전달하면 *"Task is in a terminal state"*라는 오류 `-32004`가 발생합니다. 후속 요청에는 `context_id`만 전달하면 됩니다. 두 번의 테스트에서 호출 에이전트 모델이 자동으로 `task_id` 없이 재시도해 문맥을 유지했습니다. 추적에 해당 오류가 보인다면 이런 상황입니다.

같은 환경의 두 에이전트가 모두 Microsoft Copilot 하네스라면 어느 채널도 필요 없습니다. [연결 에이전트](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-add-other-agents)에 URL, 앱 등록, OAuth 없이 직접 표시됩니다.

## 두 채널의 차이

두 채널 모두 **같은 게시된 에이전트**를 호출합니다. 채널에 따라 에이전트의 기능이나 답변은 달라지지 않습니다. 환경 간 접근, 다른 팀 소유 에이전트 호출, 위임된 ID, 훅, 요금 처리는 모두 같으며 크레딧은 호출 대상 에이전트의 환경에서 사용됩니다. 달라지는 점은 호출자가 에이전트를 검색하고 호출하며 응답을 받는 방식입니다.

|  | MCP | A2A |
|---|---|---|
| Copilot Studio 호출자 | 표준 및 Microsoft Copilot 하네스 에이전트 | Microsoft Copilot 하네스 에이전트 |
| 프로토콜 버전 | MCP `2025-06-18` | A2A **1.0**만 지원 |
| 응답 | `send-message`의 완료된 응답 | 스트리밍 지원 |
| 검색 메타데이터 | 에이전트 이름으로 설명되는 도구 하나 | 기술이 포함된 에이전트 카드 |
| 후속 대화 | `conversationId` | `context_id` |

몇 가지 항목은 추가 설명이 필요합니다.

- **표준 에이전트에서는 A2A를 사용할 수 없습니다.** 표준 하네스의 Agent2Agent 양식은 A2A 0.x 카드 형식을 기대하지만 Copilot Studio는 1.0 카드를 제공합니다. 테스트에서는 양식이 카드를 읽었지만 커넥터를 만들지 못했습니다. 현재 표준 에이전트에서 사용할 수 있는 경로는 MCP뿐입니다.
- **기능보다 클라이언트 호환성이 중요합니다.** A2A 채널은 A2A 1.0 클라이언트만 허용합니다. Copilot Studio의 Microsoft Copilot 하네스는 1.0을 사용하지만 다른 A2A 클라이언트는 사전에 확인해야 합니다.
- **스트리밍은 채널 기능입니다.** A2A 채널은 `SendStreamingMessage`로 응답을 스트리밍하지만 MCP의 `send-message`는 완료된 응답을 반환합니다. 사용자 지정 클라이언트에서 특히 중요한 차이로, [CATBOT 글](https://microsoft.github.io/mcscatblog/posts/grumpy-protocol-clients/)에서 두 방법을 다룹니다.
- **검색 정보와 라우팅은 다릅니다.** 에이전트 카드와 기술은 A2A 클라이언트가 에이전트를 찾는 데 사용하는 메타데이터입니다. Copilot Studio 라우팅은 연결 에이전트의 이름과 설명, 대화, 호출 에이전트 지침을 사용합니다. 따라서 시나리오 2의 4단계는 기술을 잘 작성했더라도 중요합니다.

> 호출 대상 에이전트의 [Agent hooks](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/hooks-overview)는 두 채널 모두에서 실행됩니다. `metadata.channel`은 `mcs-agent-as-mcp` 또는 `mcs-agent-as-a2a`이며 `userAadObjectId`는 로그인한 호출자이므로 훅에서 에이전트 호출자와 직접 대화하는 사용자를 다르게 처리할 수 있습니다. 훅을 처음 사용한다면 [Copilot Studio의 Hooks](https://microsoft.github.io/mcscatblog/posts/2026-10-12-hooks-in-copilot-studio/)를 참고하세요.

## 핵심 요약

- **표준** 에이전트는 다시 만들지 않고도 Microsoft Copilot 하네스 에이전트를 **MCP 도구**로 사용할 수 있습니다.
- **Microsoft Copilot 하네스** 에이전트는 복사하지 않고도 다른 환경에 있는 다른 팀의 에이전트를 **A2A 연결 에이전트**로 호출할 수 있습니다.
- 호출 대상 에이전트용 Early 환경, 클라이언트 암호가 있는 앱 등록, 커넥터마다 Web 리디렉션 URI가 필요합니다. MCP에는 **Manual** OAuth도 필요합니다.
- MCP 테스트에서는 구체적인 Server description과 일반적인 Server description 모두 라우팅이 작동했습니다. 이름과 설명을 명확히 작성하고, 웹 검색이나 다른 도구가 겹치면 호출 에이전트 지침을 추가합니다.
- MCP 커넥터를 **OBO** 로그인으로 전환하면 다른 사용자는 연결 관리자 대신 대화에서 **Allow**를 한 번 선택하면 됩니다.
- 두 채널은 호출 대상 에이전트의 기능이 아니라 호출자, 프로토콜 버전, 스트리밍, 검색 메타데이터가 다릅니다.

프로덕션 에이전트 중 어떤 것을 Microsoft Copilot 하네스 에이전트에 가장 먼저 연결하시겠어요? 댓글로 알려주세요.
