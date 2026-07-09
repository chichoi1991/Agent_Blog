---
layout: chapter
date: 2026-07-06
title: "A365 CLI를 이용한 Enterprise MCP 배포"
short_title: "A365 CLI · Enterprise MCP 배포"
description: "Agent 365 CLI로 자체 제작(BYO) MCP 서버를 엔터프라이즈에 등록하고, Entra OAuth 인증 구성부터 관리자 승인·활용까지 중앙 거버넌스 하에 배포하는 방법을 안내합니다."
order: 1
category: updates
tags: ["Agent 365", "MCP", "Enterprise", "Copilot Studio", "Entra OAuth"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — **Agent 365 CLI**로 자체 제작(BYO) MCP 서버를 엔터프라이즈에 등록하면, 모든 도구 호출이 **Agent 365 Tooling Gateway**를 경유해 IT 관리자가 가시성과 제어권을 갖고, 관리자 승인 후 제작자는 **추가 URL·인증 구성 없이** Copilot Studio에서 바로 사용할 수 있습니다. 이 글은 특히 **Entra OAuth 인증 구성**과 **등록 시 자주 겪는 오류**를 실측 기준으로 정리합니다.
</div>

> ⚠️ 이 문서의 기능·화면은 모두 **미리 보기(Preview)** 기준이며 변경될 수 있습니다(subject to change).

---

## 1. 개요 (Enterprise Registration — BYO MCP Server)

프로덕션 배포에서 중앙 집중식 거버넌스가 필요한 경우, Agent 365 CLI를 통해 MCP 서버를 등록합니다. 이 방식은 모든 도구 호출(tool invocation)을 **Agent 365 Tooling Gateway**를 경유하도록 라우팅하여, IT 관리자가 가시성과 제어권을 확보할 수 있게 합니다.

**개발자 → 관리자 → 사용자** 흐름은 다음과 같습니다.

1. **개발자**가 원격 MCP 서버를 Agent 365 CLI로 등록합니다(서버 URL·인증 유형·도구 선언).
2. **IT 관리자**가 Microsoft 365 관리 센터에서 서버·도구를 검토하고 승인하며, 필요한 Entra 권한에 동의합니다.
3. **제작자(maker)**가 Copilot Studio 등에서 승인된 서버를 호출해 에이전트를 구성합니다.
4. **보안팀**이 Microsoft Defender advanced hunting으로 도구 호출을 모니터링합니다.

> ⚠️ **참고:** BYO MCP 서버는 현재 **미리 보기(Preview)** 단계입니다.
> **지원 클라이언트:** Copilot Studio, VS Code, Claude Code, GitHub Copilot CLI
> **미지원:** Azure AI Foundry, Microsoft 365 Declarative Agents

---

## 2. 사전 준비

### 2.1 Agent 365 CLI 설치

Agent 365 CLI는 .NET 전역 도구입니다.

```bash
dotnet tool install -g Microsoft.Agents.A365.DevTools.Cli
# 이미 설치된 경우 업데이트
dotnet tool update  -g Microsoft.Agents.A365.DevTools.Cli
```

버전 **1.1.165 이상**인지 확인합니다.

```bash
a365 --version
```

### 2.2 서비스 주체(Service Principal) 확인

Agent 365 서비스 주체가 테넌트에 프로비저닝되어 있어야 합니다. 다음 앱 ID를 확인합니다.

```bash
az ad sp show --id "ea9ffc3e-8a23-4a7d-836d-234d7c7565c1" --query "displayName" -o tsv
# 결과 예: Agent Tools
```

해당 서비스 주체를 찾을 수 없다면, Agent 365 문서의 *Set up service principal* 절차(전역 관리자 권한 필요)를 따라 프로비저닝합니다.

### 2.3 지원 인증 유형

원격 MCP 서버는 다음 중 하나로 구성되어 있어야 합니다.

| 인증 유형 | 설명 |
| --- | --- |
| **NoAuth** | 인증 없음(공개 엔드포인트) |
| **APIKey** | Header 또는 Query 파라미터로 API 키 전달 |
| **ExternalOAuth** | 외부 IdP의 OAuth |
| **EntraOAuth** | Microsoft Entra ID 기반 OAuth |

이 글에서는 엔터프라이즈에서 가장 많이 쓰는 **EntraOAuth**를 중심으로 다룹니다.

---

## 3. Entra OAuth 인증 구성 (가장 헷갈리는 부분)

<div class="info-box note" markdown="1">

**핵심** — `EntraOAuth` 등록은 **위임(delegated) 흐름**입니다. Gateway가 사용자를 대신해 내 API를 호출하므로, 내 MCP 서버용 Entra 앱에는 **"앱 역할(App Role)"이 아니라 "위임 스코프(Delegated Scope, `oauth2PermissionScopes`)"** 가 정의되어 있어야 합니다. 이 부분을 놓치면 등록이 실패합니다.
</div>

### 3.1 앱 등록 및 Application ID URI

먼저 MCP 서버(API)를 대표하는 Entra 앱을 등록하고, **Application ID URI**를 `api://<clientId>` 로 설정합니다. 이 URI가 발급 토큰의 **audience**가 됩니다.

```bash
# 1) 앱 등록 생성 (단일 테넌트)
appId=$(az ad app create --display-name "byo-mcp-test-api" \
  --sign-in-audience AzureADMyOrg --query appId -o tsv)
objId=$(az ad app show --id "$appId" --query id -o tsv)

# 2) Application ID URI = api://<appId>
az ad app update --id "$objId" --identifier-uris "api://$appId"
```

### 3.2 위임 스코프란 무엇이고 왜 필요한가

**위임 스코프(delegated permission / OAuth2 permission scope)** 는 *"이 API가 외부 클라이언트에게 **사용자를 대신해** 허용하는 작업의 단위"* 를 정의한 것입니다. 역할은 다음과 같습니다.

1. **API가 제공하는 권한의 카탈로그** — 클라이언트(여기서는 Gateway의 프록시 앱)는 이 카탈로그에 있는 스코프만 요청할 수 있습니다. 카탈로그에 없는 이름을 요청하면 *"scope not found"* 로 거부됩니다.
2. **동의(consent)의 단위** — 관리자/사용자가 "이 클라이언트가 내 API를 사용자 대신 호출해도 좋다"고 동의할 때, 그 대상이 바로 이 위임 스코프입니다.
3. **토큰의 권한 표식** — 발급된 access token의 `scp`(scope) 클레임에 스코프 이름이 실립니다. 내 MCP 서버는 이 값으로 정당한 위임 호출임을 확인합니다.

> **App Role vs 위임 스코프**
> - **App Role**: 애플리케이션이 *자기 자신의 신원*으로 호출(client-credentials, 사용자 없음). 토큰에 `roles` 클레임.
> - **위임 스코프**: 애플리케이션이 *사용자를 대신해* 호출(delegated). 토큰에 `scp` 클레임.
> - **BYO MCP의 EntraOAuth는 위임 스코프**를 사용합니다.

### 3.3 위임 스코프 추가 (포털)

Entra 포털에서 앱 등록 → **관리 → API 표시(Expose an API)** 로 이동합니다. **애플리케이션 ID URI**가 `api://<appId>` 로 설정되어 있고, 하단 목록에 정의된 위임 스코프가 표시됩니다. 화면 설명에 *"여기에 범위를 추가하면 위임된 권한만 만들어집니다"* 라고 명시되어 있는 점에 주목하세요 — 이것이 EntraOAuth가 요구하는 바로 그 권한 유형입니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/updates/up1-09.jpg' | relative_url }}" alt="API 표시(Expose an API) — Application ID URI와 위임 스코프 목록" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>API 표시(Expose an API) — Application ID URI와 위임 스코프(access_as_user) 목록</figcaption>
</figure>

**+ 범위 추가(Add a scope)** 를 눌러 위임 스코프를 정의합니다. 이 예시에서는 스코프 이름을 `access_as_user` 로 하고, **동의할 수 있는 사람**을 *관리자 및 사용자*로 설정했습니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/updates/up1-10.jpg' | relative_url }}" alt="범위 추가 대화 상자 — access_as_user 위임 스코프 정의" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>범위 추가(Add a scope) — access_as_user 위임 스코프 정의</figcaption>
</figure>

> 💡 CLI(`az`)로 위임 스코프를 넣으려면 Microsoft Graph를 PATCH합니다. `az ad app update`의 `--identifier-uris`·`--app-roles`로는 위임 스코프가 설정되지 않으니 주의하세요.
>
> ```bash
> az rest --method PATCH \
>   --url "https://graph.microsoft.com/v1.0/applications/$objId" \
>   --headers "Content-Type=application/json" \
>   --body '{"api":{"oauth2PermissionScopes":[{
>     "id":"'"$(python -c 'import uuid;print(uuid.uuid4())')"'",
>     "value":"access_as_user","type":"User","isEnabled":true,
>     "adminConsentDisplayName":"Access BYO MCP server as user",
>     "adminConsentDescription":"Allows the app to invoke BYO MCP server tools on behalf of the signed-in user."
>   }]}}'
> ```

### 3.4 등록 시 사용할 remote-scopes

등록 명령의 `--remote-scopes` 값은 **위에서 정의한 실제 위임 스코프 이름**을 사용합니다.

```
api://<appId>/access_as_user
```

> ⚠️ `.default` 를 쓰면 `Scope '.default' not found on resource <appId>` 오류가 납니다. `.default`는 실제 스코프 이름이 아니라 client-credentials(앱 권한)용 가상 스코프이기 때문입니다.

---

## 4. MCP 서버 등록 (a365 CLI)

인증 방식에 따라 다음 예시 중 하나를 사용합니다.

### 4.1 Entra OAuth

```bash
a365 develop-mcp register-external-mcp-server \
  --server-name "ext_MyMcp" \
  --server-url "https://my-mcp-server.example.com/mcp" \
  --publisher "Contoso" \
  --description "Internal MCP server" \
  --auth-type EntraOAuth \
  --remote-scopes "api://<appId>/access_as_user" \
  --tools "tool1,tool2"
```

### 4.2 인증 없음 / API 키

```bash
# NoAuth
a365 develop-mcp register-external-mcp-server \
  --server-name "ext_MyMcp" --server-url "https://my-mcp-server.example.com/mcp" \
  --publisher "Contoso" --description "Internal MCP server" \
  --auth-type "NoAuth" --tools "tool1,tool2"

# API 키 (Header)
a365 develop-mcp register-external-mcp-server \
  --server-name "ext_MyMcp" --server-url "https://my-mcp-server.example.com/mcp" \
  --publisher "Contoso" --description "Internal MCP server" \
  --auth-type APIKey --api-key-location Header --api-key-name "X-API-Key" \
  --tools "tool1,tool2"
```

### 4.3 JSON 파일로 등록 (권장)

도구가 많거나 설명이 길면 JSON 파일이 편리합니다(대화형 입력이 줄어듭니다).

```json
{
  "serverName": "ext_MyMcp",
  "serverUrl": "https://my-mcp-server.example.com/mcp",
  "authType": "EntraOAuth",
  "description": "Internal MCP server",
  "publisherName": "Contoso",
  "tools": [
    { "name": "tool1", "description": "First tool" },
    { "name": "tool2", "description": "Second tool" }
  ],
  "remoteScopes": "api://<appId>/access_as_user"
}
```

```bash
a365 develop-mcp register-external-mcp-server -f register.json
```

### 4.4 등록 결과 확인

CLI는 **등록 요약(Registration Summary)** 을 출력하고, 확인 프롬프트에 `y` 를 입력하면 프록시 Entra 앱 생성과 API 권한 부여가 진행됩니다. 마지막에 **테넌트 관리자 승인 요청** 안내가 표시됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/updates/up1-01.jpg' | relative_url }}" alt="CLI 등록 요약 및 완료 메시지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>CLI 등록 요약 및 완료 메시지</figcaption>
</figure>

> 💡 **주의:** 도구 이름(tool names)은 원격 MCP 서버가 실제로 노출하는 이름과 정확히 일치해야 합니다. 이름이 일치하지 않으면 런타임에 도구 호출이 실패합니다.

---

## 5. 관리자 승인

등록 후에는 IT 관리자가 서버를 승인해야 합니다. 승인·동의에는 **AI 관리자** 또는 **전역 관리자** 권한이 필요합니다.

1. **Microsoft 365 관리 센터**([admin.microsoft.com](https://admin.microsoft.com))에 로그인합니다.
2. **Agents → Tools → Requests** 로 이동합니다.
3. 서버 세부 정보와 선언된 도구를 검토합니다.
4. **승인(Approve)** 후 필요한 **Microsoft Entra 권한에 동의**합니다.

### 5.1 요청 목록 확인

관리 센터의 **Tools → Requests (preview)** 탭에서 등록된 MCP 서버 요청을 확인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/updates/up1-02.jpg' | relative_url }}" alt="Tools > Requests 요청 목록" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Tools &gt; Requests 요청 목록</figcaption>
</figure>

### 5.2 요청 세부 정보 검토 (Overview)

요청을 선택하면 서버의 설명, 상태, 게시자, 유형, 애플리케이션 ID, URL 등 세부 정보를 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/updates/up1-03.jpg' | relative_url }}" alt="요청 세부 정보 — Overview" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>요청 세부 정보 — Overview</figcaption>
</figure>

### 5.3 선언된 도구 검토 (Tools)

**Tools** 탭에서 서버가 선언한 각 도구의 이름과 설명을 검토합니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/updates/up1-04.jpg' | relative_url }}" alt="요청 세부 정보 — Tools" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>요청 세부 정보 — Tools</figcaption>
</figure>

### 5.4 승인 및 권한 동의

**Approve**를 누르면 승인 절차가 진행됩니다. 승인을 완료하기 전, 최대 3회까지 권한을 검토하고 동의해야 합니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/updates/up1-05.jpg' | relative_url }}" alt="승인 진행" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>승인 진행</figcaption>
</figure>

관리자 계정으로 로그인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/updates/up1-06.jpg' | relative_url }}" alt="계정 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>계정 선택</figcaption>
</figure>

요청된 권한을 검토하고 동의합니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/updates/up1-07.jpg' | relative_url }}" alt="요청된 권한 동의" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>요청된 권한 동의</figcaption>
</figure>

승인이 완료되면 서버가 **Registry**에 나타나며, 에이전트 제작자(maker)가 Copilot Studio에서 사용할 수 있게 됩니다. 전파에는 최대 **30분**이 걸릴 수 있습니다.

---

## 6. Copilot Studio에서 승인된 서버 사용

관리자 승인 이후, 제작자는 자신의 에이전트에 서버를 추가할 수 있습니다.

1. 에이전트의 **Tools** 페이지 → **Add a tool** 로 이동합니다.
2. 등록된 MCP 서버가 도구 카탈로그에 나타납니다.
3. 서버를 선택해 에이전트에 추가합니다. **추가 URL이나 인증 구성은 필요 없습니다.**

<figure class="screenshot">
  <img src="{{ '/assets/image/updates/up1-08.jpg' | relative_url }}" alt="Copilot Studio — 도구 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio — 도구 추가</figcaption>
</figure>

---

## 7. 트러블슈팅 & 서버 등록 시 주의할 점

등록은 여러 단계를 순차로 수행합니다. **어느 단계에서 실패했는지**가 원인 파악의 핵심입니다. 아래는 실제로 자주 겪는 오류를 정리한 것입니다.

### 7.1 등록 실패 지점별 원인 지도

| 실패 메시지(예) | 원인 | 해결 |
| --- | --- | --- |
| `Scope '.default' not found on resource <appId>` | EntraOAuth인데 위임 스코프 미정의 / `.default` 사용 | API 앱에 위임 스코프 추가 후 `api://<appId>/<scope>` 사용 (3장) |
| `Another object with the same value for property identifierUris already exists` | 같은 서버명 재등록 → 서버측 프록시 앱의 identifierUri 충돌 | 고아 앱 정리 후 **새 서버명**으로 재등록 |
| `Short description exceeds the maximum length of 80 characters` | `description`(short description)이 80자 초과 | 설명을 **80자 이내**로 축약 |
| `A server named '<name>' already exists` | 레지스트리(Dataverse) 레벨의 이름 중복 | **서버명을 변경**해 재등록 |
| `Failed to create connector shared_<name>P ... BadRequest (HTTP 400)` | 커넥터 생성 실패 — 서버명 규칙 등 | 아래 7.3 참고 |

### 7.2 서버 등록 시 주의할 점 (체크리스트)

<div class="info-box note" markdown="1">

- ✅ **서버 이름**: `ext_` 접두사 + **20자 이내**. `ext_` 뒤에는 **언더스코어·특수문자 없이 영숫자(camelCase)** 를 권장합니다. 이름에 언더스코어가 있으면 커넥터 생성 단계에서 `HTTP 400` 이 발생할 수 있습니다.
- ✅ **설명(description)**: **80자 이내**. 초과 시 등록이 거부됩니다.
- ✅ **EntraOAuth**: `--remote-scopes` 는 API 앱에 실제로 정의된 **위임 스코프**(`api://<appId>/access_as_user`)를 사용합니다. `.default` 사용 금지.
- ✅ **도구 이름**: 원격 서버가 실제 노출하는 이름과 **정확히 일치**해야 합니다.
- ✅ **재시도 시 고아 앱 정리**: 등록이 실패해도 CLI가 만든 프록시 Entra 앱(`<name>-A365Proxy` / `-RemoteProxy` / `-PublicClients`, `<name> - BYO`)은 **자동 롤백되지 않습니다**. 재시도 전에 정리하거나, **새 서버명**을 사용하세요.
- ✅ **BYO MCP는 삭제·재게시 미지원**(Preview). 이름을 신중히 정하세요.
</div>

### 7.3 커넥터 생성 400 오류 진단 순서

`Failed to create connector ... BadRequest (HTTP 400)` 은 등록 후반의 **커넥터 생성** 단계에서 발생합니다. 실측상 다음 순서로 좁히는 것을 권장합니다.

1. **description을 80자 이내로** 축약합니다(선결 조건).
2. **서버명에서 언더스코어를 제거**한 이름(예: `ext_myMcp`)으로 재시도합니다 — 실측에서 이 조합으로 해결됐습니다.
3. 그래도 실패하면 대상 **Power Platform 환경의 커넥터 잔재/정책**을 점검합니다.

> 참고: **서버 URL 경로(루트 `/` vs `/mcp`)** 와 **DLP 정책**은 등록 성공 여부와 무관함이 실측으로 확인됐습니다(DLP를 적용한 상태에서도 정상 등록됨). 원인을 URL·DLP로 넘겨짚기 전에 **이름·설명 규칙**을 먼저 확인하세요.

### 7.4 CLI 로그 위치

등록의 상세 단계·오류는 CLI 로그에 남습니다(**명령을 실행한 PC/사용자 프로필별**). 성공은 조용히, 실패만 상세히 기록됩니다.

```
%LOCALAPPDATA%\Microsoft.Agents.A365.DevTools.Cli\logs\a365.develop-mcp.log
```

---

## 8. 도구 품질 평가 (선택 사항)

등록 전에 Agent 365 CLI로 도구 정의(이름·설명·매개변수 스키마)의 품질을 평가할 수 있습니다.

```bash
a365 develop-mcp evaluate --server-url "http://localhost:3000/mcp"
```

이 명령은 로컬에 설치된 코딩 에이전트 CLI(GitHub Copilot CLI 또는 Claude Code)로 시맨틱 채점을 수행하고, 도구 품질 리포트(HTML/JSON)를 생성합니다. 도구 스키마 데이터는 Microsoft로 전송되지 않습니다.

---

## 참고 링크

- [Manage tools for agents in Microsoft 365 admin center](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-tools-for-agent) — BYO MCP 서버 등록·승인·거버넌스 개요
- [Add and manage tools (Agent 365 developer)](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/tooling) — Tooling 매니페스트·서비스 주체 설정
- [Install the Agent 365 CLI](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/agent-365-cli) — CLI 설치
- [Agent 365 tooling servers overview](https://learn.microsoft.com/en-us/microsoft-agent-365/tooling-servers-overview) — 사용 가능한 MCP 서버 카탈로그
- [Configure a client application to access a web API (Entra)](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-configure-app-expose-web-apis) — Expose an API / 위임 스코프
- [Grant tenant-wide admin consent to an application (Entra)](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent) — 관리자 동의
- [Microsoft Defender advanced hunting](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-overview) — 도구 호출 모니터링
