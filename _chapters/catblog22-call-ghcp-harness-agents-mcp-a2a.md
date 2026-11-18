---
layout: "chapter"
date: 2026-11-12
title: "MCP와 A2A로 다른 Copilot Studio 에이전트에서 Microsoft Copilot 하네스 호출하기"
short_title: "MCP와 A2A 에이전트 연결"
description: "Standard 에이전트에서 MCP로, Microsoft Copilot 하네스 에이전트 간에는 A2A로 연결하고 OBO 로그인을 구성하는 방법."
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

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/header.png' | relative_url }}" alt="MCP와 A2A로 연결되는 Copilot Studio 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"></figure>

프로덕션에서 Standard Copilot Studio 에이전트를 운영 중이라고 가정해 봅시다. 에이전트는 잘 작동하고 사용자도 쓰고 있으며, 누구도 다시 만들고 싶어 하지 않습니다. 한편 다른 팀은 다른 환경에서 [Microsoft Copilot 하네스](https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview)(이전 GitHub Copilot 하네스) 기반 새 에이전트를 만들고 있습니다.

두 가지 질문이 생깁니다.

1. 기존 Standard 에이전트를 다시 만들지 않고 새 Microsoft Copilot 하네스 에이전트를 사용할 수 있을까요?
2. Microsoft Copilot 하네스 에이전트가 다른 환경에 있는 다른 팀의 에이전트를 복사 없이 호출할 수 있을까요?

두 경우 모두 모든 Microsoft Copilot 하네스 에이전트가 제공하는 [MCP 및 A2A 채널](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent)을 통해 가능합니다. 여기서는 호출자와 대상이 모두 Copilot Studio 에이전트일 때의 OAuth 값, 리디렉션 URI, 연결, 라우팅, 다른 사용자가 사용할 때 필요한 설정을 설명합니다.

앱이나 스크립트에서 호출한다면 CATBOT의 [MCP와 A2A 문서를 대신 읽어봤습니다](https://microsoft.github.io/mcscatblog/posts/grumpy-protocol-clients/)에서 Python 클라이언트와 Entra 로그인을 확인하세요.

> MCP 및 A2A 채널은 미리 보기 상태입니다. 세 테넌트에서 아래 절차를 테스트했습니다. 정식 출시 전 세부 내용이 변경될 수 있습니다.

## 구성 요소의 역할

호출되는 에이전트는 항상 Microsoft Copilot 하네스 에이전트입니다.

| 구성 요소 | 설명 | 설정 담당자 |
|---|---|---|
| **호출 대상 에이전트** | 크레딧이 있는 **Early** 환경에 게시된 에이전트 | 제작자 및 Power Platform 관리자 |
| **앱 등록** | 호출자를 위한 Entra 앱 하나 | ID 관리자 |
| **호출 에이전트** | 커넥터와 연결을 보유 | 제작자 |

[앱 등록 사전 요구 사항](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent#prerequisite-create-an-app-registration)을 따라 앱을 만듭니다. 테스트에서 확인한 사항은 다음과 같습니다.

- **Early 환경은 호출 대상 에이전트에만 필요합니다.** 호출 에이전트는 기본 환경 같은 Standard 릴리스 환경에 있어도 됩니다.
- **앱을 등록하는 주체는 호출자뿐입니다.** 대상 엔드포인트는 보통 테넌트에 이미 존재하는 Copilot Studio 채널 API로 보호됩니다. 애플리케이션 ID를 검색해도 나오지 않으면 대상 에이전트의 MCP 또는 A2A 대화상자를 한 번 열어 테넌트에 추가합니다.
- **API 이름은 달라질 수 있습니다.** 채널 API는 *Microsoft Copilot Studio Agent as MCP channel* 또는 *Microsoft Copilot Studio Agent MCP and A2A channels*로 표시될 수 있습니다. 애플리케이션 ID `6f46e6ed-07bf-4616-80f0-47546850f654`로 검색하면 찾을 수 있습니다.
- **동의는 프로토콜별로 필요합니다.** 사용자가 연결을 만들며 로그인할 때 사용자 동의로 충분하지만 시나리오 1의 7단계 OBO 구성에는 관리자 동의가 필요합니다. MCP 동의는 A2A 동의를 포함하지 않습니다.
- **호출자는 게시된 버전을 사용합니다.** 저장했지만 게시하지 않은 변경 사항은 제공되지 않습니다.

구성이 이렇게 필요한 이유도 알아둘 만합니다.

- **클라이언트 암호**: Copilot Studio 커넥터는 서버 측 웹 앱이므로 서버에서 로그인 코드를 토큰으로 교환하고 앱 등록을 증명해야 합니다.
- **커넥터마다 리디렉션 URI 필요**: Entra는 앱에 등록된 주소로만 로그인 결과를 반환합니다.
- **OAuth 모드는 "Manual"**: Entra는 동적 클라이언트 등록을 지원하지 않습니다. 테스트에서 "Dynamic"은 404를 반환했습니다. [Jira 원격 MCP 글](https://microsoft.github.io/mcscatblog/posts/atlassian-jira-remote-mcp-copilot-studio/)처럼 동적 등록을 지원하는 서버를 연결한다면 이 단계가 다릅니다.

## 호출 대상 에이전트 URL 찾기

Early 환경의 게시된 Microsoft Copilot 하네스 에이전트에서 **Triggers** 옆의 **+**를 선택한 뒤 **MCP protocol** 또는 **A2A protocol**을 선택합니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/add-trigger.png' | relative_url }}" alt="미리 보기로 표시된 MCP 및 A2A 프로토콜 트리거 목록" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Early 릴리스 환경에서만 표시되는 MCP 및 A2A 프로토콜.</figcaption></figure>

각 대화상자에서 에이전트 URL을 확인할 수 있습니다.

```text
MCP:  https://api.powerplatform.com/copilotstudio-mcp/tenants/{tenantId}/environments/{environmentId}/agents/{agentSchemaName}
A2A:  https://api.powerplatform.com/copilotstudio-a2a/tenants/{tenantId}/environments/{environmentId}/agents/{agentSchemaName}
Card: {A2A URL}/.well-known/agent-card.json
```

대화상자를 열어도 에이전트는 변경되지 않습니다. A2A 대화상자에서는 에이전트의 기능을 설명하는 Skill 이름과 설명을 추가하며, 이 값은 에이전트에 저장됩니다. 테스트에서는 로그인한 클라이언트의 상세 정보에 표시됐지만 공개 Agent Card에는 표시되지 않았습니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-endpoint-dialog.png' | relative_url }}" alt="A2A URL, Agent Card URL, Skill을 표시하는 A2A 클라이언트 대화상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>엔드포인트, Agent Card URL 및 Skill을 보여 주는 A2A 대화상자.</figcaption></figure>

> [공식 문서](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent)에는 **Channels → Add a channel → MCP client / A2A client** 아래에 같은 항목이 표시될 수 있습니다. 어느 경로를 사용하든 호출 대상은 Early 릴리스 환경에 있어야 합니다. 게시 대화상자에 "트리거를 추가할 때까지 실행되지 않음"이라는 경고가 표시되더라도 MCP 및 A2A 호출은 동작했습니다.

## 시나리오 1: Standard 에이전트 → Microsoft Copilot 하네스 에이전트(MCP)

프로덕션 Standard 에이전트에 새 에이전트를 도구 하나처럼 추가합니다. Standard 에이전트를 다시 만들 필요가 없습니다.

### 1. 앱 등록 준비

1. 앱 등록에 채널 API의 위임 권한 **`MCS.InvokeAsMCP`**를 추가합니다.
2. **Certificates & secrets**에서 클라이언트 암호를 만들고 값을 복사합니다.

### 2. Standard 에이전트에 MCP 도구 추가

Standard 에이전트에서 **Tools → Add a tool**로 이동하고 **Create new**에서 **Model Context Protocol**을 선택합니다. [기존 MCP 서버 추가](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent) 안내의 **Add a Model Context Protocol server**가 열리면 다음을 설정합니다.

| 필드 | 값 |
|---|---|
| Server name | 대상 에이전트 이름(예: *HR Policy*) |
| Server description | 대상 에이전트가 하는 일(5단계 참고) |
| Server URL | 대상 에이전트의 **MCP** URL |
| Authentication | **OAuth 2.0** 선택 후 **Type**을 기본 **Dynamic discovery**에서 **Manual**로 변경 |

### 3. OAuth 값 입력

| 필드 | 값 |
|---|---|
| Client ID | 앱 등록의 Application (client) ID |
| Client secret | 1단계의 암호 값 |
| Authorization URL | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize` |
| Token URL template | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` |
| Refresh URL | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` |
| Scopes | `https://api.powerplatform.com/copilotstudio-mcp/MCS.InvokeAsMCP offline_access` |

`{tenantId}`를 Directory (tenant) ID로 바꿉니다. 연결이 토큰을 갱신하려면 Scope에 `offline_access`가 있어야 합니다. 서버가 토큰 없이 호출될 때 광고하는 값과 일치합니다. PKCE는 로그인 요청에 자동 포함되므로 설정하지 않아도 됩니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/mcp-oauth-manual.png' | relative_url }}" alt="Manual 유형으로 OAuth 2.0 설정을 마친 MCP 서버 대화상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Manual OAuth를 사용하는 MCP 마법사. 테넌트 ID는 예시에서 자리 표시자로 바꿨습니다.</figcaption></figure>

### 4. 리디렉션 URI 등록 및 연결 생성

1. 도구를 만들 때 `https://global.consent.azure-apim.net/redirect/`로 시작하는 리디렉션 URL이 표시됩니다. 커넥터마다 다릅니다.
2. 앱 등록에서 **Authentication → Add Redirect URI**(이전 화면에서는 **Add a platform**)로 이동하고 **Web**을 선택한 뒤 URL을 그대로 붙여 넣습니다.
3. Copilot Studio로 돌아와 연결을 만들고 로그인합니다. 사용자가 `MCS.InvokeAsMCP`에 동의하지 않았다면 Entra에서 동의를 요청합니다. 관리자가 테넌트 전체에 동의했다면 해당 요청은 표시되지 않습니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/entra-web-redirect.png' | relative_url }}" alt="Web 리디렉션 URI를 추가한 Entra 앱 등록 인증 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>커넥터의 리디렉션 URL을 앱 등록의 Web 리디렉션 URI로 추가합니다.</figcaption></figure>

이후 도구 창에 `send-message` 도구 하나가 표시됩니다. 커넥터와 연결 하나를 같은 환경의 여러 에이전트에서 사용할 수 있습니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/standard-agent-mcp-tool.png' | relative_url }}" alt="send-message 도구와 연결을 표시하는 Standard 에이전트 MCP 도구 세부 정보" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Microsoft Copilot 하네스 에이전트를 MCP 도구로 추가한 Standard 에이전트. 계정 이름은 자리 표시자로 바꿨습니다.</figcaption></figure>

### 5. 호출 에이전트에 사용 시점 안내

`send-message` 도구 설명은 대상 에이전트 이름으로 생성됩니다. 예를 들어 “HR Policy 에이전트에 메시지를 보내고 답변을 받습니다.”라고 표시됩니다. 에이전트가 다루는 주제는 설명하지 않기 때문에 **Server description**이 라우팅을 결정한다고 생각하기 쉽습니다. 테스트에서는 상세 설명과 일반 설명 모두 leave 및 annual leave 질문에 도구 호출을 일으켰습니다. 테스트 활동 추적에도 설정된 설명이 표시됐으며 해당 질문에 상세 설명이 필수는 아니었습니다.

라우팅이 보장되는 것은 아닙니다. 프리미엄 이코노미 항공편 질문이 도구 대신 기본 웹 검색으로 전달된 경우도 있었습니다. 웹 검색, 지식 또는 다른 도구가 겹친다면 Standard 에이전트 지침에 호출 대상을 명시하세요.

```text
For questions about leave, travel, expenses or other HR policies, use the
HR Policy tool. Don't answer HR policy questions from general knowledge
or web search.
```

**Server description**에도 에이전트가 담당하는 내용을 분명히 적으세요. 도구를 추가할 때 설명이 에이전트에 복사되며, 커넥터를 나중에 편집해도 바뀌지 않습니다. 변경하려면 도구를 제거하고 다시 추가해야 합니다.

### 6. 제작자로 테스트

호출 대상 에이전트만 알 수 있는 내용을 Standard 에이전트에 질문합니다. 활동 추적에는 **Used tool: send-message**가 표시되고, 테스트에서는 약 9~17초 후 답변이 돌아왔습니다. Copilot Studio가 반환된 `conversationId`를 전달하므로 후속 질문도 맥락을 유지합니다. MCP 커넥터가 처음이라면 [첫 MCP 커넥터까지 5분](https://microsoft.github.io/mcscatblog/posts/hello-world-mcp-copilot-studio/)을 참고하세요.

### 7. 커넥터를 OBO 로그인으로 전환

기본적으로 도구는 **End user credentials**를 사용하므로 각 사용자가 자신의 계정으로 대상 에이전트를 호출합니다. **Manual** OAuth 마법사는 일반 OAuth 2 ID 공급자를 사용하는 커넥터를 만듭니다. 이 상태에서는 사용자가 별도의 연결 관리자 페이지에서 다시 로그인해야 합니다. OBO(on-behalf-of) 로그인으로 전환하면 기존 로그인 정보를 재사용해 대화에서 **Allow**를 한 번만 선택하면 됩니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-flow.png' | relative_url }}" alt="사용자 토큰을 Entra에서 MCP 엔드포인트용 토큰으로 교환하는 OBO 흐름" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>모든 단계가 로그인 사용자로 실행됩니다. 커넥터 암호는 사용자의 토큰을 교환할 수 있음을 증명합니다.</figcaption></figure>

[사용자 지정 커넥터용 OBO 구성](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-custom-connector-on-behalf-of) 안내에 따라 앱 등록에 OBO를 추가합니다.

1. **Expose an API → Add a scope**에서 기본 Application ID URI(`api://{client-id}`)를 사용하고 Scope 이름을 `access_as_user`로 지정합니다. **Who can consent**는 **Admins and users**, 상태는 **Enabled**로 둡니다.
2. **Authorized client applications → Add a client application**에서 `fe053c5f-3692-4f14-aef2-ee34fc081cae`(Azure API Connections)를 입력하고 `access_as_user`를 선택합니다.
3. **API permissions → Grant admin consent**에서 `MCS.InvokeAsMCP` 관리자 동의를 부여합니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-expose-api.png' | relative_url }}" alt="access_as_user 범위와 승인된 Azure API Connections 클라이언트가 표시된 API 공개 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>클라이언트 ID는 `{client-id}` 자리 표시자로 바꿨습니다.</figcaption></figure>

그런 다음 Power Apps의 **Custom connectors**에서 MCP 마법사가 만든 커넥터를 편집하고 **2. Security → OAuth 2.0**에 다음 값을 설정합니다.

| 필드 | 값 |
|---|---|
| Identity Provider | **Azure Active Directory** (Microsoft Entra ID) |
| Enable Service Principal support | Off |
| Client ID | 앱 등록의 Application (client) ID |
| Client secret | 앱 등록 암호(공급자를 변경하면 지워지므로 다시 입력) |
| Authorization URL | `https://login.microsoftonline.com` |
| Tenant ID | Directory (tenant) ID |
| Resource URL | `https://api.powerplatform.com/copilotstudio-mcp` |
| Enable on-behalf-of login | `true` |
| Scope | 3단계 값(`…/MCS.InvokeAsMCP offline_access`) 유지 |

> **Resource URL**은 채널 API 식별자인 `https://api.powerplatform.com/copilotstudio-mcp`입니다. `https://api.powerplatform.com`은 별도의 Power Platform API이므로 해당 대상으로 발급된 토큰은 MCP 엔드포인트에서 유효하지 않습니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-connector-security.png' | relative_url }}" alt="Azure Active Directory와 MCP Resource URL, OBO 로그인을 설정한 커넥터 보안 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>ID는 자리 표시자로 표시했습니다.</figcaption></figure>

**Update connector**를 선택합니다. 테스트에서는 리디렉션 URL이 그대로 유지되어 앱 등록에 새 URI를 추가할 필요가 없었습니다. 전환 후 Standard 에이전트의 **Tools → MCP 도구 → Create new connection**에서 새 연결을 만들고 선택합니다. 이 변경은 커넥터를 사용하는 모든 에이전트에 적용되므로 각 에이전트에서도 연결을 바꿉니다.

### 8. 다른 사용자와 공유하고 테스트

각 사용자에게 다음 항목이 필요합니다. 처음 세 항목은 한 명씩 공유하기보다 보안 그룹에 공유하세요.

- 게시된 에이전트와 [에이전트 공유](https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-share-bots)
- MCP 마법사가 만든 커스텀 커넥터의 **Can view** 권한. 공유하지 않으면 *"does not have ReadAccess … connector"* 오류가 발생했습니다.
- 호출 대상 Microsoft Copilot 하네스 에이전트 공유
- 기본 환경이 아니라면 호출 에이전트 환경의 보안 역할. **Basic User**로 충분했습니다.

Standard 에이전트를 Microsoft 365 Copilot에 게시하고, 제작자가 아니며 커넥터 연결도 없는 두 번째 사용자로 테스트했습니다. 첫 도구 호출 때 **Connect to continue** 카드가 표시됐습니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-consent-card.png' | relative_url }}" alt="HR Policy 연결을 허용하거나 취소하는 Microsoft 365 Copilot 동의 카드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 관리자 페이지를 거치지 않는 대화 내 동의 카드.</figcaption></figure>

**Allow**를 누르면 사용자 연결이 생성되고 대상 에이전트의 답변이 반환됩니다. 이후 질문에서는 동의 카드가 다시 표시되지 않습니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-answer-after-allow.png' | relative_url }}" alt="HR 정책에서 확인한 유급 육아휴직 기간에 답하는 IT Helpdesk 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Allow 이후 대상 에이전트의 HR 안내를 바탕으로 반환된 답변.</figcaption></figure>

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-followup-no-prompt.png' | relative_url }}" alt="추가 동의 없이 연차 이월 가능 일수를 답하는 후속 질문" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>동의 카드 없이 이어지는 후속 질문.</figcaption></figure>

> 커넥터를 일반 OAuth 설정으로 두면 도구는 작동하지만 사용자는 *"Let's get you connected first… Open connection manager"* 메시지를 받습니다. **Manage your connections** 페이지를 직접 열어 연결한 뒤 돌아와 **Retry**를 눌러야 합니다.

## 시나리오 2: 환경 간 Microsoft Copilot 하네스 에이전트(A2A)

다른 팀이 소유한 다른 환경의 에이전트를 복사하지 않고 호출할 수 있습니다. 시나리오 1처럼 MCP로 환경 간 호출도 가능합니다. 여기서는 Microsoft Copilot 하네스 호출 에이전트가 Agent Card로 연결 에이전트를 추가할 수 있으므로 A2A를 사용합니다. 테스트에서는 호출 에이전트가 기본 환경, 대상은 Early 환경에 있었습니다.

### 1. 앱 등록 준비

위임 권한 **`MCS.InvokeAsA2A`**를 추가합니다. 시나리오 1의 앱 등록과 암호를 재사용할 수 있지만 사용자는 A2A에 별도로 동의해야 합니다.

### 2. 호출 에이전트에 A2A 에이전트 추가

1. 호출 에이전트에서 **Connected agents → + Add → Add A2A agent**를 선택합니다.
2. 대상 에이전트의 **Agent Card URL**을 붙여 넣습니다.
3. **Get the name and description from**에서 **The agent's full details (Recommended)**를 선택합니다.
4. **OAuth 2.0**을 선택합니다. 보통 Agent Card에서 URL과 Scope를 채워 줍니다. 비어 있다면 시나리오 1과 같은 Entra URL을 입력합니다.
5. Client ID와 암호를 입력합니다.
6. 카드에서 가져온 Scope에는 `MCS.InvokeAsA2A`만 있고 `offline_access`가 빠져 있습니다. 토큰 갱신을 위해 추가합니다.

```text
https://api.powerplatform.com/copilotstudio-a2a/MCS.InvokeAsA2A offline_access
```

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/add-a2a-agent.png' | relative_url }}" alt="offline_access가 추가된 OAuth 2.0 A2A 에이전트 연결 양식" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Scope에 `offline_access`를 추가한 A2A 연결 설정. ID는 자리 표시자로 표시했습니다.</figcaption></figure>

### 3. 리디렉션 URI 등록 및 연결 만들기

1. **Next**를 선택하면 `https://global.consent.azure-apim.net/redirect/`로 시작하는 리디렉션 URL이 표시됩니다.
2. 시나리오 1처럼 앱 등록의 **Web** 리디렉션 URI에 추가합니다.
3. Copilot Studio의 **Connection** 목록에서 **Create new connection → Create**를 선택하고 로그인합니다. 로그인은 `MCS.InvokeAsA2A offline_access`를 요청합니다.

### 4. 설명 확인

**Next**를 눌러 **Review and add**로 이동하고 에이전트에서 가져온 이름과 설명을 확인합니다. 호출 에이전트는 설명을 기준으로 라우팅하므로 추가 전에 검토해야 합니다. **The agent's full details**를 선택해도 HR Policy 에이전트 설명이 *"Microsoft Copilot Studio agent 'HR Policy'."*처럼 일반적으로 표시됐습니다. 공개 Agent Card도 비슷하며, 추가한 Skill도 공개 카드에는 없습니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-review-description.png' | relative_url }}" alt="HR Policy 에이전트의 일반 설명을 보여 주는 검토 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트에서 가져온 설명. **Add to agent**를 선택하기 전에 구체적으로 바꾸세요.</figcaption></figure>

Copilot Studio는 에이전트 이름과 설명, 사용자 메시지와 대화 맥락, 호출 에이전트 지침을 이용해 [A2A 에이전트를 선택](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-agent-to-agent#how-the-orchestrator-routes-to-the-a2a-agent)합니다. 따라서 언제 사용할지 설명에 명시합니다.

```text
HR policy agent owned by the People team. Answers questions about leave,
travel, expenses and other HR policies. Use it for any HR policy question.
```

호출 에이전트에 지침이 없어도 이 설명이면 육아휴직 질문이 HR Policy로 전달됐습니다. 지침이나 겹치는 도구가 있다면 MCP 예제와 같이 HR 정책 질문을 연결 에이전트에 보내도록 추가합니다.

### 5. 테스트

**Add to agent**를 선택하고 저장한 뒤 대상 에이전트만 답할 수 있는 질문을 합니다. 호출 에이전트를 게시하기 전에도 **Preview**에서 테스트할 수 있지만 대상은 이미 게시돼 있어야 합니다. 추적에는 입력 및 출력과 함께 **Used tool: {A2A 에이전트 이름}**이 표시됩니다.

<figure class="screenshot"><img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-call-trace.png' | relative_url }}" alt="HR Policy 응답과 context ID를 보여 주는 A2A 호출 추적" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>호출 에이전트 추적의 A2A 도구 출력과 대상 에이전트 답변.</figcaption></figure>

> A2A 도구의 기본 안내는 후속 요청에 `context_id`와 `task_id`를 모두 전달하도록 합니다. 그러나 응답이 완료된 작업이므로 `task_id`를 전달하면 `-32004`("Task is in a terminal state") 오류가 발생합니다. 후속 질문에는 `context_id`만 전달하면 됩니다. 테스트에서는 호출 에이전트 모델이 `task_id` 없이 재시도해 맥락을 유지했습니다.

두 에이전트가 **같은 환경**의 Microsoft Copilot 하네스 에이전트라면 URL, 앱 등록, OAuth 없이 [연결 에이전트](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-add-other-agents)에서 바로 추가할 수 있습니다.

## 두 채널의 차이

두 채널은 **동일한 게시 에이전트**를 호출하므로 에이전트의 기능과 답변은 같습니다. 환경 간 액세스, 다른 팀 에이전트 호출, 위임 ID, Hooks, 과금 방식도 같으며 크레딧은 호출 대상 환경에서 차감됩니다. 달라지는 점은 호출자가 에이전트를 검색하고 호출하며 응답을 받는 방식입니다.

| 항목 | MCP | A2A |
|---|---|---|
| Copilot Studio 호출자 | Standard 및 Microsoft Copilot 하네스 | Microsoft Copilot 하네스 |
| 프로토콜 버전 | MCP `2025-06-18` | A2A **1.0**만 |
| 응답 | `send-message` 완료 응답 | 스트리밍 지원 |
| 검색 메타데이터 | 에이전트 이름으로 설명되는 도구 하나 | Skill이 포함된 Agent Card |
| 후속 대화 | `conversationId` | `context_id` |

- **Standard 에이전트는 여기서 A2A를 사용할 수 없습니다.** Standard 하네스의 A2A 양식은 A2A 0.x 카드를 기대하지만 Copilot Studio는 1.0 카드를 제공합니다. 현재 Standard 에이전트에서 사용할 방법은 MCP뿐입니다.
- **기능보다 클라이언트 호환성이 중요합니다.** A2A 채널은 A2A 1.0 클라이언트만 허용합니다. 다른 클라이언트를 사용할 때 호환성을 먼저 확인하세요.
- **스트리밍은 채널 기능입니다.** A2A는 `SendStreamingMessage`로 응답을 스트리밍하고 MCP의 `send-message`는 완료된 응답을 반환합니다.
- **검색 정보가 곧 라우팅은 아닙니다.** Agent Card와 Skill은 A2A 클라이언트의 검색 메타데이터입니다. Copilot Studio는 연결 에이전트의 이름과 설명, 대화, 호출 에이전트 지침을 바탕으로 라우팅하므로 시나리오 2의 설명 단계가 중요합니다.

> 대상 에이전트의 [Agent Hooks](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/hooks-overview)는 두 채널 모두에서 실행됩니다. `metadata.channel`은 `mcs-agent-as-mcp` 또는 `mcs-agent-as-a2a`이며 `userAadObjectId`는 로그인한 호출자입니다. 이를 통해 사람의 직접 대화와 에이전트 호출을 구분할 수 있습니다. [Copilot Studio의 Hooks](https://microsoft.github.io/mcscatblog/posts/hooks-in-copilot-studio/)를 참고하세요.

## 핵심 요점

- **Standard** 에이전트는 다시 만들지 않고 **MCP 도구**로 Microsoft Copilot 하네스 에이전트를 호출할 수 있습니다.
- **Microsoft Copilot 하네스** 에이전트는 다른 환경의 다른 팀 에이전트를 **A2A 연결 에이전트**로 호출할 수 있습니다.
- 대상 에이전트에는 Early 환경이 필요합니다. 앱 등록, 클라이언트 암호, 커넥터별 Web 리디렉션 URI도 필요하며 MCP는 **Manual** OAuth를 사용합니다.
- MCP 테스트에서는 구체적 설명과 일반 설명 모두 라우팅됐습니다. 명확한 이름과 설명을 사용하고 웹 검색이나 다른 도구가 겹치면 호출 에이전트 지침을 추가하세요.
- MCP 커넥터를 **on-behalf-of** 로그인으로 전환하면 다른 사용자는 연결 관리자 대신 대화에서 한 번 **Allow**를 선택합니다.
- 두 채널의 차이는 호출 가능한 에이전트, 프로토콜 버전, 스트리밍, 검색 메타데이터에 있으며 호출 대상의 기능에는 없습니다.

프로덕션 에이전트 중 어떤 에이전트를 Microsoft Copilot 하네스 에이전트에 먼저 연결하시겠어요? 댓글로 알려주세요.
