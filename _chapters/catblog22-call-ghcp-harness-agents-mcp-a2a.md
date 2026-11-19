---
layout: "chapter"
date: 2026-11-12
title: "MCP와 A2A로 다른 Copilot Studio 에이전트에서 Microsoft Copilot 하네스 에이전트 호출하기"
short_title: "MCP와 A2A로 에이전트 연결"
description: "표준 에이전트에서 MCP로, Copilot 하네스 에이전트 간에는 A2A로 다른 환경의 에이전트를 호출하고 OBO 로그인을 구성하는 방법"
order: 22
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/"
source_author: "ssivaraman"
source_published: "2026-11-12"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 ssivaraman(@ssivaraman)이 작성한 원문 [Call Microsoft Copilot Harness Agents from Other Copilot Studio Agents with MCP and A2A](https://microsoft.github.io/mcscatblog/posts/call-ghcp-harness-agents-mcp-a2a/)(2026-11-12)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/header.png' | relative_url }}" alt="Microsoft Copilot 하네스 에이전트가 MCP와 A2A 엔드포인트를 통해 다른 환경의 에이전트와 연결되고 Microsoft Entra ID로 로그인한 사용자 권한으로 호출됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

프로덕션에서 표준 Copilot Studio 에이전트를 사용하고 있고, 잘 작동하며 사용자도 익숙해져 있어 다시 만들고 싶지 않다고 해 보겠습니다. 한편 다른 팀은 다른 환경에서 [Microsoft Copilot 하네스](https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview)(이전 GitHub Copilot 하네스)를 기반으로 새 에이전트를 만들고 있습니다.

곧 두 가지 질문이 생깁니다.

1. **기존 표준 에이전트를 다시 만들지 않고 새 Microsoft Copilot 하네스 에이전트와 연결할 수 있을까요?**
2. **내 Microsoft Copilot 하네스 에이전트가 다른 환경에 있는 다른 팀의 에이전트를 복사하지 않고 호출할 수 있을까요?**

두 방법 모두 현재 사용할 수 있습니다. 모든 Microsoft Copilot 하네스 에이전트가 노출하는 [MCP 및 A2A 채널](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent)을 이용합니다. 이 글에서는 **호출자와 대상이 모두 Copilot Studio 에이전트인 상황**에서 각 연결을 구성하기 위해 사용한 OAuth 값, 리디렉션 URI, 연결, 라우팅, 다른 사용자가 연결을 사용하기 전에 필요한 사항을 설명합니다.

앱이나 스크립트에서 에이전트를 호출하려면 CATBOT의 [Adi 대신 MCP와 A2A 문서를 읽어 봤습니다](https://microsoft.github.io/mcscatblog/posts/grumpy-protocol-clients/)에서 Python 클라이언트와 Entra 로그인을 확인하세요.

> MCP 및 A2A 채널은 미리 보기 상태입니다. 세 테넌트에서 이 안내를 테스트했습니다. 정식 출시 전 세부 사항은 변경될 수 있습니다.

## 구성 요소의 역할

세 부분으로 이루어지며, 각 부분을 누가 설정하는지 알면 도움이 됩니다. 호출 대상 에이전트는 항상 Microsoft Copilot 하네스 에이전트입니다.

| 구성 요소 | 설명 | 설정 담당자 |
|---|---|---|
| **호출 대상 에이전트** | 크레딧이 있는 **Early** 환경에 게시된 에이전트 | 해당 제작자 및 Power Platform 관리자 |
| **앱 등록** | **호출자**를 위한 단일 Entra 앱 | ID 관리자 |
| **호출 에이전트** | 커넥터와 연결이 구성된 에이전트 | 해당 제작자 |

앱 등록은 Learn 문서의 [사전 요구 사항: 앱 등록 만들기](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent#prerequisite-create-an-app-registration)를 따라 만듭니다. 테스트 과정에서 확인한 다음 세부 정보를 미리 알아 두면 좋습니다.

- **호출 대상 에이전트만 Early 환경에 있으면 됩니다.** 호출자는 기본 환경과 같은 Standard 릴리스 환경에 둘 수 있습니다.
- **앱 등록은 호출자만 합니다.** 호출 대상 에이전트의 엔드포인트는 Copilot Studio 채널 API로 보호되며 이 API는 보통 테넌트에 이미 있습니다. 애플리케이션 ID로 검색해도 나오지 않으면 호출 대상 에이전트의 MCP 또는 A2A 대화 상자를 한 번 열어 테넌트에 추가합니다.
- **API 이름은 달라질 수 있습니다.** 채널 API가 *Microsoft Copilot Studio Agent as MCP channel* 또는 *Microsoft Copilot Studio Agent MCP and A2A channels*로 표시될 수 있습니다. 애플리케이션 ID `6f46e6ed-07bf-4616-80f0-47546850f654`로 검색하면 어느 이름이든 찾을 수 있습니다.
- **동의는 프로토콜별로 필요합니다.** 연결을 만들고 로그인할 때는 사용자 동의만으로 충분하지만 시나리오 1의 7단계인 OBO 설정에는 관리자 동의가 필요합니다. MCP 권한에 동의해도 A2A 권한에는 적용되지 않습니다.
- **호출자는 게시된 버전을 사용합니다.** 호출 대상 에이전트에서 저장했지만 게시하지 않은 변경 사항은 제공되지 않습니다.

설정이 이렇게 구성되는 이유는 다음과 같습니다.

- Copilot Studio 커넥터는 서버 측 웹 앱이므로 **클라이언트 암호**가 필요합니다. 서버에서 로그인 코드를 토큰으로 교환할 때 이 암호로 요청이 앱 등록에서 온 것임을 증명합니다.
- Entra는 앱에 등록된 주소로만 로그인 결과를 반환하므로 **커넥터별 리디렉션 URI**가 필요합니다.
- Entra는 동적 클라이언트 등록을 지원하지 않으므로 OAuth 모드를 **Manual**로 설정합니다. 테스트에서는 **Dynamic**이 404를 반환했습니다. [Jira 원격 MCP 게시물](https://microsoft.github.io/mcscatblog/posts/atlassian-jira-remote-mcp-copilot-studio/)처럼 동적 등록을 지원하는 서버를 연결하는 경우 이 단계가 달라집니다.

## 호출 대상 에이전트 URL 찾기

Early 환경에서 게시된 Microsoft Copilot 하네스 에이전트를 열고 **Triggers** 옆의 **+**를 선택한 다음 **MCP protocol** 또는 **A2A protocol**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/add-trigger.png' | relative_url }}" alt="Recurrence, Copilot, Microsoft Teams, Office 365 Outlook 등의 트리거와 Preview 표시가 있는 MCP 및 A2A 프로토콜을 보여 주는 Add a trigger 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>MCP protocol과 A2A protocol은 Early 릴리스 환경에서만 Add a trigger 대화 상자에 표시됩니다.</figcaption>
</figure>

각 대화 상자에 에이전트 URL이 표시됩니다.

```text
MCP:  https://api.powerplatform.com/copilotstudio-mcp/tenants/{tenantId}/environments/{environmentId}/agents/{agentSchemaName}
A2A:  https://api.powerplatform.com/copilotstudio-a2a/tenants/{tenantId}/environments/{environmentId}/agents/{agentSchemaName}
Card: {A2A URL}/.well-known/agent-card.json
```

대화 상자를 여는 것만으로 에이전트가 변경되지는 않으며 URL만 표시됩니다. A2A 대화 상자에서는 에이전트가 수행하는 작업을 나타내는 Skill의 이름과 설명도 입력하며 이 값은 에이전트에 저장됩니다. 테스트에서는 로그인한 클라이언트가 읽는 전체 에이전트 세부 정보에 Skill이 표시되지만 공개 Agent Card에는 표시되지 않았습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-endpoint-dialog.png' | relative_url }}" alt="에이전트의 A2A URL, Agent Card URL, hr-policy-questions Skill을 보여 주는 A2A 클라이언트 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>엔드포인트, Agent Card URL, 에이전트 Skill을 보여 주는 A2A 대화 상자</figcaption>
</figure>

> [공식 문서](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-mcp-agent-to-agent)에는 **Channels → Add a channel → MCP client / A2A client** 아래에 같은 항목이 나옵니다. 환경에 따라 이 경로에서 찾을 수 있습니다. 어느 경로를 이용해도 호출 대상 에이전트는 Early 릴리스 환경에 있어야 합니다. Publish 대화 상자에는 “트리거를 추가하기 전에는 에이전트가 실행되지 않는다”는 경고가 표시될 수 있지만 MCP 및 A2A 호출은 정상 작동했습니다.

## 시나리오 1: 표준 에이전트 → Microsoft Copilot 하네스 에이전트(MCP)

프로덕션 표준 에이전트에 새 에이전트를 도구 하나처럼 추가합니다. 기존 표준 에이전트를 다시 만들 필요가 없습니다.

### 1. 앱 등록 준비

1. 앱 등록에 채널 API의 위임된 권한 **`MCS.InvokeAsMCP`**를 추가합니다.
2. **Certificates & secrets**에서 클라이언트 암호를 만들고 값을 복사합니다.

### 2. 표준 에이전트에 MCP 도구 추가

표준 에이전트에서 **Tools → Add a tool**로 이동하고 **Create new**에서 **Model Context Protocol**을 선택합니다. 그러면 [기존 MCP 서버를 에이전트에 추가](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent)하는 절차에 설명된 **Add a Model Context Protocol server**가 열립니다. 다음을 입력합니다.

| 필드 | 값 |
|---|---|
| Server name | *HR Policy*와 같은 호출 대상 에이전트 이름 |
| Server description | 호출 대상 에이전트의 기능(5단계 참고) |
| Server URL | 호출 대상 에이전트의 **MCP** URL |
| Authentication | **OAuth 2.0**을 선택한 후 기본 **Dynamic discovery** 대신 **Manual** 선택 |

### 3. OAuth 값 입력

| 필드 | 값 |
|---|---|
| Client ID | 앱 등록의 애플리케이션(클라이언트) ID |
| Client secret | 1단계의 암호 값 |
| Authorization URL | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize` |
| Token URL template | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` |
| Refresh URL | `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` |
| Scopes | `https://api.powerplatform.com/copilotstudio-mcp/MCS.InvokeAsMCP offline_access` |

`{tenantId}`를 디렉터리(테넌트) ID로 바꿉니다. 연결이 토큰을 갱신할 수 있도록 범위에 `offline_access`를 포함해야 합니다. 범위는 토큰 없이 서버를 호출했을 때 서버가 알리는 값과 일치합니다. 로그인 요청에 PKCE가 자동으로 포함되므로 따로 구성하지 않아도 됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/mcp-oauth-manual.png' | relative_url }}" alt="OAuth 2.0 Manual 유형, 클라이언트 ID, 권한 부여 URL, 토큰 URL 템플릿, 새로 고침 URL 및 범위가 입력된 Add a Model Context Protocol server 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Manual OAuth를 선택한 MCP 마법사입니다. 여기서는 테넌트 ID를 `{tenantId}`로 바꿨습니다.</figcaption>
</figure>

### 4. 리디렉션 URI 등록 및 연결 만들기

1. 도구를 만들 때 Copilot Studio에 `https://global.consent.azure-apim.net/redirect/`로 시작하는 리디렉션 URL이 표시됩니다. 커넥터마다 고유합니다.
2. 앱 등록에서 **Authentication → Add Redirect URI**(이전 환경에서는 **Add a platform**)로 이동하고 **Web**을 선택해 표시된 URL을 그대로 입력합니다.
3. Copilot Studio로 돌아와 연결을 만들고 로그인합니다. 사용자가 아직 `MCS.InvokeAsMCP`에 동의하지 않았다면 Entra에서 동의를 요청합니다. 관리자가 테넌트 전체에 동의를 이미 부여한 경우 이 권한 동의 메시지는 표시되지 않습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/entra-web-redirect.png' | relative_url }}" alt="https://global.consent.azure-apim.net/redirect/로 시작하는 Web 리디렉션 URI가 등록된 앱 등록의 Authentication 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>커넥터 리디렉션 URL을 앱 등록에 Web 리디렉션 URI로 추가합니다.</figcaption>
</figure>

그런 다음 도구 패널에 `send-message` 도구 하나가 표시됩니다. 같은 환경의 여러 에이전트에서 커넥터와 연결을 공유할 수 있습니다. 제 표준 에이전트는 다른 에이전트에 이미 만든 연결을 재사용했습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/standard-agent-mcp-tool.png' | relative_url }}" alt="연결과 send-message 도구 하나가 표시된 표준 에이전트의 MCP 도구 세부 정보 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Microsoft Copilot 하네스 에이전트를 MCP 도구로 추가한 표준 에이전트입니다. 서버에서 `send-message` 도구 하나를 노출합니다. 화면에서는 연결 계정이 자리 표시자로 바뀌어 있습니다.</figcaption>
</figure>

### 5. 호출 에이전트에 사용 시점 알리기

`send-message` 도구의 설명은 호출 대상 에이전트 이름에서 자동 생성되며 “*HR Policy* 에이전트에 메시지를 보내 답변을 받습니다”와 같이 표시됩니다. 에이전트가 무엇을 처리하는지는 나타나지 않으므로 라우팅에 **Server description**이 사용된다고 생각하기 쉽습니다. 두 설정을 비교해 봤습니다.

- **구체적인 설명**(“휴가, 출장, 경비 및 기타 HR 정책 질문에 답변합니다…”), 서버 이름 *HR Policy*
- **일반적인 설명**(“Model Context Protocol 서버 엔드포인트.”), 첫 도구를 삭제했지만 이름이 예약된 상태여서 서버 이름 *HR Policy MCP*

그 외에는 모두 같았습니다. 지침이 없는 동일한 표준 에이전트와 호출 대상 에이전트, `send-message` 도구를 사용했고 일반 설정을 테스트할 때마다 새 세션을 시작했습니다. 두 설명 모두 “육아휴직을 몇 주 받을 수 있나요?”와 “연차를 며칠까지 이월할 수 있나요?” 질문에서 도구가 호출되었습니다. 활동 추적에는 설정한 설명이 표시되었으며 두 질문 모두 상세한 설명이 필요하지 않았습니다.

하지만 라우팅이 보장되는 것은 아닙니다. “7시간 비행에 프리미엄 이코노미를 예약할 수 있나요?”라는 질문은 한 번 기본 웹 검색으로 전달되었습니다. 웹 검색, 지식, 겹치는 도구가 있다면 표준 에이전트 지침에 호출 대상 에이전트를 언제 사용할지 명시하세요.

```text
휴가, 출장, 경비 또는 기타 HR 정책 질문에는 HR Policy 도구를 사용하세요.
일반 지식이나 웹 검색으로 HR 정책 질문에 답하지 마세요.
```

**Server description**에는 여전히 에이전트가 다루는 내용을 작성하세요. 도구를 추가할 때 설명이 에이전트에 복사되며 이후 커넥터에서 설명을 수정해도 바뀌지 않습니다. 변경하려면 도구를 제거하고 다시 추가해야 합니다.

### 6. 제작자로 테스트

표준 에이전트에 호출 대상 에이전트만 알 수 있는 내용을 질문합니다. 활동 추적에는 **Used tool: send-message**가 표시되며 테스트에서는 약 9~17초 뒤 응답을 받았습니다. Copilot Studio가 반환된 `conversationId`를 전달하므로 후속 질문에서도 맥락이 유지됩니다. MCP 커넥터가 처음이라면 [첫 MCP 커넥터까지 5분](https://microsoft.github.io/mcscatblog/posts/hello-world-mcp-copilot-studio/)을 참고하세요.

### 7. OBO(On-Behalf-Of) 로그인으로 커넥터 전환

기본적으로 도구는 **End user credentials**를 사용하므로 표준 에이전트와 채팅하는 각 사용자는 자신의 계정으로 Microsoft Copilot 하네스 에이전트를 호출합니다. **Manual** OAuth를 사용하면 MCP 마법사가 일반 OAuth 2 ID 공급자를 사용하는 커넥터를 만들고 각 사용자는 별도의 연결 관리자 페이지에서 한 번 더 로그인해야 합니다. 커넥터를 OBO(On-Behalf-Of) 로그인으로 전환하면 기존 로그인 정보를 재사용하므로 사용자는 대화에서 **Allow**를 한 번만 선택하면 됩니다. 일반적인 커넥터 OBO는 [사용자 지정 커넥터에서 원활한 SSO](https://microsoft.github.io/mcscatblog/posts/obo-for-custom-connectors/)를 참고하세요. 여기서는 사용자 지정 커넥터의 표준 OBO 설정을 다루며 MCP 채널에 맞는 **Resource URL**과 `MCS.InvokeAsMCP` 권한이 추가로 필요합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-flow.png' | relative_url }}" alt="Microsoft 365 Copilot에서 IT Helpdesk 표준 에이전트에 질문한 Mario가 연결 확인 카드에서 Allow를 선택하고, HR Policy 커넥터가 커넥터 앱의 토큰과 클라이언트 ID 및 암호를 Entra ID로 보내 Copilot Studio MCP 엔드포인트용 Mario 토큰을 받고, HR Policy 에이전트가 Mario로 호출되는 OBO 흐름" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>모든 단계가 로그인한 사용자로 실행됩니다. 커넥터 암호는 사용자의 토큰을 교환할 권한을 증명할 뿐입니다.</figcaption>
</figure>

먼저 [사용자 지정 커넥터 OBO 인증 구성](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-custom-connector-on-behalf-of)에 따라 1단계에서 만든 앱 등록에 OBO를 추가합니다.

1. **Expose an API → Add a scope**를 선택합니다. 기본 Application ID URI(`api://{client-id}`)를 사용하고 범위를 `access_as_user`로 지정합니다. **Who can consent**는 **Admins and users**로 설정하고 **Enabled** 상태를 유지합니다.
2. **Authorized client applications → Add a client application**을 선택하고 `fe053c5f-3692-4f14-aef2-ee34fc081cae`(Azure API Connections)를 입력한 뒤 `access_as_user`를 선택합니다. 이 설정으로 Power Platform은 로그인 페이지 없이 사용자를 대신해 커넥터용 토큰을 받을 수 있습니다.
3. **API permissions → Grant admin consent**에서 `MCS.InvokeAsMCP`에 관리자 동의를 부여합니다. 토큰 교환은 백그라운드에서 이루어지므로 사용자에게 이 권한을 요청할 순간이 없습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-expose-api.png' | relative_url }}" alt="access_as_user 범위와 관리자 및 사용자 동의 설정, 권한 있는 클라이언트 앱 fe053c5f-3692-4f14-aef2-ee34fc081cae를 보여 주는 앱 등록의 Expose an API 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>화면에서는 클라이언트 ID가 `{client-id}`로 바뀌어 있습니다.</figcaption>
</figure>

그런 다음 Power Apps의 **Custom connectors**로 이동해 MCP 마법사에서 만든 커넥터의 연필 아이콘을 선택합니다. **2. Security**를 열고 **OAuth 2.0** 아래의 **Edit**를 선택한 후 다음을 설정합니다.

| 필드 | 값 |
|---|---|
| Identity Provider | **Azure Active Directory**(Microsoft Entra ID) |
| Enable Service Principal support | 끔 |
| Client ID | 앱 등록의 애플리케이션(클라이언트) ID |
| Client secret | 암호 값. ID 공급자를 바꾸면 지워지므로 다시 입력합니다. |
| Authorization URL | `https://login.microsoftonline.com`(기본값) |
| Tenant ID | 디렉터리(테넌트) ID |
| Resource URL | `https://api.powerplatform.com/copilotstudio-mcp` |
| Enable on-behalf-of login | `true` |
| Scope | 3단계 값을 유지(`…/MCS.InvokeAsMCP offline_access`) |

> **Resource URL**은 채널 API 식별자인 `https://api.powerplatform.com/copilotstudio-mcp`입니다. 일반 `https://api.powerplatform.com`은 별개의 Power Platform API이며 이 API용 토큰은 MCP 엔드포인트에서 사용할 수 없습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-connector-security.png' | relative_url }}" alt="Azure Active Directory를 ID 공급자로 선택하고 Service Principal 지원은 끄고 클라이언트 ID, 테넌트 ID, 기본 권한 부여 URL, Resource URL https://api.powerplatform.com/copilotstudio-mcp와 OBO 로그인을 활성화한 커넥터 Security 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>ID는 자리 표시자로 바꿔 표시했습니다.</figcaption>
</figure>

**Update connector**를 선택합니다. 테스트에서는 리디렉션 URL이 동일하게 유지되어 앱 등록에 새 리디렉션 URI를 추가할 필요가 없었습니다. 변경 후 표준 에이전트에서 도구의 새 연결을 만듭니다(**Tools** → MCP 도구 → **Create new connection**). 커넥터를 사용하는 모든 에이전트에 변경 사항이 적용되므로 각 에이전트에서 새 연결을 선택해야 합니다.

### 8. 공유하고 다른 사용자로 테스트

각 사용자는 다음 항목이 필요합니다. 처음 세 항목은 한 명씩 공유하기보다 보안 그룹에 공유하세요.

- 게시된 에이전트와 마찬가지로 공유된 **표준 에이전트**. 자세한 내용은 [다른 사용자와 에이전트 공유](https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-share-bots)를 참고하세요.
- MCP 마법사에서 만든 **사용자 지정 커넥터**의 **Can view** 권한(Power Apps → **Custom connectors** → **⋯** → **Invite another user**). [조직의 사용자 지정 커넥터 공유](https://learn.microsoft.com/en-us/connectors/custom-connectors/share) 참고. 권한이 없으면 연결 시 *“does not have ReadAccess … connector”* 오류가 발생했습니다.
- 공유된 **호출 대상 Microsoft Copilot 하네스 에이전트**. 공유되지 않았을 때 테스트 사용자는 HR Policy 답변 대신 일반 응답을 받았습니다.
- 기본 환경이 아닌 경우 **호출 에이전트 환경의 보안 역할**. **Basic User**면 충분했습니다. 역할이 없으면 동의 카드가 표시되지만 **Allow**를 누른 뒤 *“I couldn't connect. Open connection manager…”*가 표시되고 연결이 만들어지지 않았습니다.

표준 에이전트를 Microsoft 365 Copilot에 게시하고 커넥터 연결이 없는 제작자가 아닌 두 번째 사용자로 테스트했습니다. 두 에이전트가 기본 환경이 아닌 동일한 Early 환경에 있어 보안 역할 요건이 드러났습니다. 호출 에이전트가 기본 환경에 있는 환경 간 설정에서는 호출 대상 에이전트를 공유하는 것만으로 해당 Early 환경의 요건을 충족했습니다. 사용자가 처음 도구 호출이 필요한 질문을 하면 Microsoft 365 Copilot에 **Connect to continue** 카드가 표시됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-consent-card.png' | relative_url }}" alt="Allow 및 Cancel 버튼이 있는 HR Policy 연결 확인 카드를 보여 주는 Microsoft 365 Copilot의 IT Helpdesk 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>대화 안에서 표시되는 동의 카드입니다. 연결 관리자 페이지로 이동하지 않습니다.</figcaption>
</figure>

**Allow**를 선택하면 사용자의 연결이 만들어지고 에이전트는 호출 대상 에이전트의 답변을 전달합니다. 이후 질문에서는 같은 연결을 사용하므로 카드가 다시 표시되지 않습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-answer-after-allow.png' | relative_url }}" alt="HR 정책에서 세부 정보를 가져와 Mario에게 전액 유급 육아휴직 26주(6개월)를 안내하는 IT Helpdesk 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Allow를 선택한 뒤 받은 답변입니다. 세부 정보는 호출 대상 에이전트의 HR 안내서에서 가져옵니다.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/obo-followup-no-prompt.png' | relative_url }}" alt="최대 미사용 일수 5일과 3월 31일 만료를 알려 주는 연차 이월 후속 답변" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>동의 카드 없이 이어지는 후속 질문</figcaption>
</figure>

> 커넥터를 일반 OAuth 설정으로 유지해도 도구는 작동하지만 각 사용자에게 *“Let's get you connected first… Open connection manager”*가 표시됩니다. 사용자는 직접 **Manage your connections** 페이지를 열어 연결한 뒤 돌아와 **Retry**를 선택해야 합니다.

## 시나리오 2: 서로 다른 환경의 Microsoft Copilot 하네스 에이전트(A2A)

필요한 에이전트를 다른 팀이 자체 환경에서 소유하고 있습니다. 복사하는 대신 게시된 에이전트를 호출합니다. 시나리오 1처럼 MCP로도 환경 간 호출은 가능하지만, 여기서는 Microsoft Copilot 하네스 호출자가 Agent Card에서 연결된 에이전트를 추가할 수 있으므로 A2A를 사용합니다. 테스트에서는 호출자가 기본 환경, 호출 대상이 Early 환경에 있었습니다.

### 1. 앱 등록 준비

위임된 권한 **`MCS.InvokeAsA2A`**를 추가합니다. 시나리오 1에서 사용한 등록과 암호를 재사용할 수 있지만 사용자는 A2A에 별도로 동의해야 합니다.

### 2. 호출 에이전트에 A2A 에이전트 추가

1. 호출 에이전트에서 [Agent2Agent(A2A) 에이전트를 연결된 에이전트로 추가](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-agent-to-agent)하는 안내에 따라 **Connected agents → + Add → Add A2A agent**로 이동합니다.
2. 호출 대상 에이전트의 **Agent Card URL**을 붙여 넣습니다.
3. **Get the name and description from**에서 **The agent's full details (Recommended)**를 유지합니다. 연결한 다음 전체 세부 정보를 읽으므로 이 양식에서는 아직 이름과 설명을 입력하지 않습니다.
4. **OAuth 2.0**을 선택합니다. Copilot Studio는 보통 Agent Card에서 **Authorization URL**, **Token URL**, **Refresh token URL**, **Scopes**를 가져옵니다. 비어 있다면 시나리오 1과 같은 Entra URL을 입력합니다.
5. 클라이언트 ID와 암호를 입력합니다.
6. **Scopes**를 확인합니다. Agent Card의 값에는 `MCS.InvokeAsA2A`가 있지만 `offline_access`는 없습니다. 연결이 토큰을 갱신할 수 있도록 추가합니다. 전체 값은 다음과 같습니다.

   ```text
   https://api.powerplatform.com/copilotstudio-a2a/MCS.InvokeAsA2A offline_access
   ```

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/add-a2a-agent.png' | relative_url }}" alt="OAuth 2.0으로 설정하고 권한 부여, 토큰, 새로 고침 토큰 URL을 입력한 뒤 MCS.InvokeAsA2A 범위에 offline_access를 추가한 Connect to an A2A agent 양식" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>`offline_access`를 범위에 추가한 A2A 양식입니다. ID는 자리 표시자로 바꿔 표시했습니다.</figcaption>
</figure>

### 3. 리디렉션 URI 등록 및 연결 만들기

1. **Next**를 선택합니다. Copilot Studio에서 커넥터를 만들고 `https://global.consent.azure-apim.net/redirect/`로 시작하는 리디렉션 URL을 표시합니다.
2. 시나리오 1과 같이 이 주소를 앱 등록의 **Web** 리디렉션 URI로 추가합니다.
3. Copilot Studio로 돌아와 **Connection** 목록에서 **Create new connection**, **Create**를 선택하고 로그인합니다. 로그인 요청에서 `MCS.InvokeAsA2A offline_access`를 요구합니다.

### 4. 설명 확인

**Next**를 선택해 에이전트에서 가져온 이름과 설명이 표시되는 **Review and add**로 이동합니다. 설명은 호출 에이전트가 라우팅할 때 사용하므로 추가하기 전에 확인합니다. **The agent's full details**를 선택했어도 HR Policy 에이전트 설명은 *“Microsoft Copilot Studio agent 'HR Policy'.”*처럼 언제 사용할지 알 수 없는 내용으로 표시되었습니다. (**공개 Agent Card**에도 비슷한 일반 설명만 표시되며 앞에서 추가한 Skill도 포함되지 않습니다.)

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-review-description.png' | relative_url }}" alt="에이전트에서 가져온 일반 설명 “Microsoft Copilot Studio agent 'HR Policy'.”와 HR Policy 이름이 표시된 Review and add 단계" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>에이전트에서 가져온 설명입니다. Add to agent를 선택하기 전에 바꾸세요.</figcaption>
</figure>

Copilot Studio는 연결된 에이전트의 이름과 설명, 사용자 메시지와 대화 맥락, 호출 에이전트 지침을 바탕으로 [A2A 에이전트에 라우팅](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-agent-to-agent#how-the-orchestrator-routes-to-the-a2a-agent)합니다. 따라서 다음처럼 에이전트를 언제 사용할지 설명을 바꾸세요.

```text
People 팀이 소유한 HR 정책 에이전트입니다. 휴가, 출장, 경비 및 기타 HR 정책 질문에 답변합니다. 모든 HR 정책 질문에 이 에이전트를 사용하세요.
```

이 설명과 호출 에이전트의 지침만으로도 “육아휴직을 몇 주 받을 수 있나요?”라는 질문이 HR Policy로 전달되었습니다. 호출 에이전트에 자체 지침이나 겹치는 도구가 있다면 앞의 MCP 예시처럼 HR 정책 질문을 연결된 에이전트로 전달하도록 한 줄을 추가하세요.

### 5. 테스트

**Add to agent**를 선택하고 저장한 다음 호출 에이전트에 호출 대상만 알 수 있는 내용을 질문합니다. 호출 에이전트 게시 전 **Preview**에서 테스트할 수 있지만 호출 대상 에이전트는 이미 게시되어 있어야 합니다. 추적에는 입력 및 출력과 함께 **Used tool: {A2A 에이전트 이름}**이 표시됩니다. 첫 답변은 테스트에서 약 17초 걸렸습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/call-ghcp-harness-agents-mcp-a2a/a2a-call-trace.png' | relative_url }}" alt="컨텍스트 ID, HR Policy 에이전트의 육아휴직 26주 답변, 17.5초 지연 및 호출 에이전트의 답변이 보이는 A2A 도구 출력 추적" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>도구 추적 출력에는 컨텍스트 ID와 호출 대상 에이전트 답변, 호출 에이전트의 응답이 표시됩니다.</figcaption>
</figure>

> A2A 도구의 기본 지침은 후속 호출에 `context_id`와 `task_id`를 모두 전달하도록 모델에 안내합니다. 하지만 각 응답이 완료된 작업이므로 `task_id`를 전달하면 오류 `-32004`(*“Task is in a terminal state”*)가 발생합니다. 후속 질문에는 `context_id`만 전달하면 됩니다. 테스트 두 번 모두 호출 에이전트 모델이 자동으로 `task_id` 없이 재시도해 맥락을 유지했습니다. 추적에서 이 오류를 보면 이러한 동작이 발생한 것입니다.

두 에이전트가 같은 환경에 있는 Microsoft Copilot 하네스 에이전트라면 어느 채널도 필요하지 않습니다. [연결된 에이전트](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-add-other-agents) 목록에서 바로 추가할 수 있으며 URL, 앱 등록, OAuth가 필요하지 않습니다.

## 두 채널의 차이

두 채널 모두 **같은 게시된 에이전트**를 호출합니다. 채널에 따라 해당 에이전트의 기능과 답변은 달라지지 않습니다. 환경 간 액세스, 다른 팀 에이전트 호출, 위임 ID, Hook, 청구는 두 채널에서 동일하며 크레딧은 호출 대상 에이전트의 환경에서 소비됩니다. 달라지는 것은 호출자가 에이전트를 검색하고 호출하며 응답을 받는 방식입니다.

| 구분 | MCP | A2A |
|---|---|---|
| Copilot Studio 호출자 | 표준 및 Microsoft Copilot 하네스 에이전트 | Microsoft Copilot 하네스 에이전트 |
| 프로토콜 버전 | MCP `2025-06-18` | A2A **1.0**만 지원 |
| 응답 | `send-message`의 완료된 응답 | 스트리밍 지원 |
| 검색 메타데이터 | 에이전트 이름으로 설명되는 단일 도구 | Skill이 포함된 Agent Card |
| 후속 대화 | `conversationId` | `context_id` |

몇 가지 항목은 따로 설명할 가치가 있습니다.

- **표준 에이전트에서는 A2A를 사용할 수 없습니다.** 표준 하네스의 Agent2Agent 양식은 A2A 0.x Agent Card 형식을 기대하지만 Copilot Studio는 1.0 카드를 제공합니다. 테스트에서 양식이 카드를 불러오기는 했지만 커넥터는 생성하지 못했습니다. 현재 표준 에이전트에서 사용할 수 있는 경로는 MCP뿐입니다.
- **기능보다 클라이언트 호환성이 중요합니다.** A2A 채널은 A2A 1.0 클라이언트만 허용합니다. Copilot Studio의 Microsoft Copilot 하네스는 1.0을 사용하지만 다른 A2A 클라이언트의 호환성은 미리 확인하세요.
- **스트리밍은 채널 기능입니다.** A2A 채널은 `SendStreamingMessage`로 응답을 스트리밍하지만 MCP `send-message`는 완료된 응답을 반환합니다. 사용자 지정 클라이언트에서 특히 중요한 차이로, [CATBOT 글](https://microsoft.github.io/mcscatblog/posts/grumpy-protocol-clients/)에서 두 방식을 볼 수 있습니다.
- **검색 정보가 곧 라우팅은 아닙니다.** Agent Card와 Skill은 A2A 클라이언트가 에이전트를 검색하는 데 사용하는 메타데이터입니다. Copilot Studio의 라우팅은 연결된 에이전트의 이름과 설명, 대화, 호출 에이전트 지침을 사용합니다. 그래서 시나리오 2의 4단계가 중요합니다.

> 호출 대상 에이전트의 [Agent Hook](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/hooks-overview)은 두 채널 모두에서 실행됩니다. `metadata.channel`은 `mcs-agent-as-mcp` 또는 `mcs-agent-as-a2a`이며 `userAadObjectId`는 로그인한 호출자입니다. 따라서 Hook에서 에이전트 호출자와 직접 대화하는 사용자를 다르게 처리할 수 있습니다. Hook을 처음 사용한다면 [Copilot Studio Hooks](https://microsoft.github.io/mcscatblog/posts/hooks-in-copilot-studio/)부터 살펴보세요.

## 핵심 요점

- **표준** 에이전트는 다시 만들지 않고도 **MCP 도구**로 Microsoft Copilot 하네스 에이전트를 호출할 수 있습니다.
- **Microsoft Copilot 하네스** 에이전트는 복사하지 않고도 **A2A 연결 에이전트**로 다른 환경에 있는 다른 팀의 에이전트를 호출할 수 있습니다.
- 두 방식 모두 호출 대상 에이전트의 Early 환경, 클라이언트 암호가 있는 앱 등록, 커넥터마다 등록한 Web 리디렉션 URI가 필요합니다. MCP에는 **Manual** OAuth도 필요합니다.
- MCP 테스트에서 구체적 설명이나 일반적인 Server description 모두 라우팅이 작동했습니다. 이름과 설명을 명확히 작성하고 웹 검색이나 다른 도구와 겹치는 경우 호출 에이전트 지침에 연결된 에이전트를 사용하도록 추가하세요.
- MCP 커넥터를 **OBO** 로그인으로 전환하면 다른 사용자도 연결 관리자를 거치지 않고 대화에서 **Allow**를 한 번 선택하면 됩니다.
- 두 채널은 호출할 수 있는 에이전트, 프로토콜 버전, 스트리밍, 검색 메타데이터는 다르지만 호출 대상 에이전트의 기능은 바꾸지 않습니다.

프로덕션 에이전트 중 어떤 에이전트를 Microsoft Copilot 하네스 에이전트에 가장 먼저 연결하시겠어요? 댓글로 알려 주세요.
