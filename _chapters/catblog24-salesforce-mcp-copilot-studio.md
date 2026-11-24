---
layout: "chapter"
title: "Salesforce 호스팅 MCP 서버를 Copilot Studio에 연결하기"
short_title: "Salesforce MCP 연결"
description: "External Client App과 수동 OAuth를 사용해 Salesforce 호스팅 MCP 서버를 Copilot Studio 에이전트에 연결하고 읽기와 통제된 업데이트를 검증하는 방법"
order: 24
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/salesforce-mcp-copilot-studio/"
source_author: "Marcus Castro"
source_published: "2026-10-14"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/salesforce-mcp-copilot-studio/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/) (Microsoft Copilot Studio CAT)의 Marcus Castro(@Marcus Castro) 원문 [Connecting Salesforce’s Hosted MCP Server to Copilot Studio](https://microsoft.github.io/mcscatblog/posts/salesforce-mcp-copilot-studio/)(2026-10-14)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/header.png' | relative_url }}" alt="OAuth 2.0 인증을 사용해 MCP로 연결된 Salesforce와 Copilot Studio" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

영업팀에서 채팅과 Salesforce를 오가지 않고 에이전트에 최신 영업 기회를 묻고, 종료 날짜를 바꾸고, 메모를 추가하고 싶어 합니다. 흥미로운 점은 CRM 데이터를 검색하는 것뿐 아니라 에이전트가 올바른 사용자의 권한으로 데이터에 작업하도록 하는 것입니다.

Salesforce 호스팅 Model Context Protocol (MCP) 서버는 Salesforce 레코드 작업을 위한 도구를 제공합니다. 이 안내에서는 Salesforce **External Client App**과 **수동 OAuth 2.0 구성**을 사용해 **SObject All**을 Copilot Studio 에이전트에 직접 연결합니다. 그런 다음 읽기, 통제된 업데이트, Salesforce에서 결과 확인을 수행합니다.

> 스크린샷은 Copilot Studio의 [GitHub Copilot 하네스](https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview)를 사용합니다. 링크된 MCP 온보딩 문서에서는 Standard 하네스를 다루므로 탐색 경로와 버튼 이름이 다를 수 있습니다. 이 절차는 캡처한 Build 환경을 따르며 OAuth 설정을 명시합니다.

## 시작하기 전에

필요한 항목은 다음과 같습니다.

- External Client App을 만들고 호스팅 MCP 서버 설정에 액세스할 수 있는 Salesforce System Administrator 또는 동등한 권한
- 대상 Copilot Studio 환경 및 에이전트에 액세스할 수 있는 권한
- 테스트에 필요한 객체, 필드, 레코드 액세스 권한이 있는 Salesforce 사용자
- 안전하게 수정할 수 있는 통제된 테스트용 영업 기회

인증 사전 요구 사항은 Salesforce의 [조직 설정 가이드](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/setup-overview.html)를 참고합니다. 도구, 엔드포인트, 권한 모델은 [SObject All 참조](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/sobject-all.html)에 설명돼 있습니다.

**SObject All은 삭제를 포함해 읽기와 쓰기를 지원합니다.** Salesforce는 인증된 사용자의 객체 권한, 필드 수준 보안, 공유 규칙을 계속 적용합니다. 테스트 전에 에이전트에 공개하는 도구도 제한합니다.

> 프로덕션 영업 기회로 시작하지 마세요. 통제된 레코드와 최소 권한의 Salesforce 계정을 사용하세요. Consumer secret, 액세스 토큰, 새로 고침 토큰을 스크린샷, 프롬프트, 소스 제어에 남기지 마세요.

### 올바른 엔드포인트 선택

이 안내는 Developer Edition 조직에서 구현했습니다. 프로덕션과 Developer Edition은 다음 프로덕션 엔드포인트를 사용합니다. Sandbox에서는 **MCP 서버 URL과 OAuth 엔드포인트를 모두** 바꿔야 합니다.

| 설정 | Production / Developer Edition | Sandbox |
|---|---|---|
| MCP 서버 URL | `https://api.salesforce.com/platform/mcp/v1/platform/sobject-all` | `https://api.salesforce.com/platform/mcp/v1/sandbox/platform/sobject-all` |
| Authorization URL | `https://login.salesforce.com/services/oauth2/authorize` | `https://test.salesforce.com/services/oauth2/authorize` |
| Token URL | `https://login.salesforce.com/services/oauth2/token` | `https://test.salesforce.com/services/oauth2/token` |
| Refresh token URL | `https://login.salesforce.com/services/oauth2/token` | `https://test.salesforce.com/services/oauth2/token` |
| Scopes | `mcp_api refresh_token` | `mcp_api refresh_token` |

MCP 엔드포인트는 [SObject All 참조](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/sobject-all.html)에서 확인합니다. Salesforce의 프로덕션 및 샌드박스 로그인 호스트는 [OAuth 웹 서버 흐름 가이드](https://help.salesforce.com/s/articleView?id=xcloud.remoteaccess_oauth_web_server_flow.htm&type=5)를 참고하세요.

## 1. Salesforce External Client App 만들기

External Client App은 Salesforce에 Copilot Studio를 OAuth 클라이언트로 등록합니다. 클라이언트 자격 증명을 제공하고 Salesforce가 인증 응답을 보낼 위치를 지정합니다.

다음 단계와 Salesforce의 [External Client App 설정 안내](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/create-external-client-app.html)를 함께 확인합니다. Salesforce 호스팅 MCP 연결에는 **External Client App**이 필요하며 이 흐름에서는 Connected Apps를 지원하지 않습니다.

### 기본 정보 입력

1. **Salesforce Setup**에서 **Quick Find**에 **external**을 입력합니다.
2. **Apps > External Client Apps > External Client App Manager**를 선택합니다.
3. **New External Client App**을 선택합니다.
4. `Copilot Studio MCP Client`와 같은 **External Client App Name**을 입력합니다.
5. `Copilot_Studio_MCP_Client` 같은 **API Name**과 **Contact Email**을 입력합니다.
6. **Distribution State**를 **Local**로 유지합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/external-client-app-manager.png' | relative_url }}" alt="New External Client App이 강조된 Salesforce External Client App Manager" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>External Client App Manager를 열고 New External Client App 선택</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/app-basic-information.png' | relative_url }}" alt="External Client App 기본 정보 필드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>앱 이름, API 이름, 연락처 이메일을 입력하고 Local 배포를 선택</figcaption>
</figure>

### OAuth 활성화 및 범위 선택

**API (Enable OAuth Settings)**를 펼치고 **Enable OAuth**를 선택합니다.

**Callback URL**은 필수지만 아직 Copilot Studio가 리디렉션 URL을 만들지 않았습니다. 이 단계에서는 `https://microsoft.com`처럼 임시 HTTPS 값을 사용합니다. 연결을 만들기 전에 실제 URL로 바꿉니다. 자리 표시자로 인증을 시도하면 안 됩니다.

다음 항목을 **Selected OAuth Scopes**로 이동합니다.

- **Perform requests at any time** (`refresh_token`, `offline_access`)
- **Access Salesforce hosted MCP servers** (`mcp_api`)

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/app-oauth-scopes.png' | relative_url }}" alt="임시 콜백 URL과 MCP 및 refresh token 범위를 설정한 OAuth 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>OAuth를 활성화하고 임시 콜백을 입력한 뒤 refresh token 및 호스팅 MCP 범위를 선택</figcaption>
</figure>

### 보안 설정 확인

**Security**에서 **Issue JSON Web Token (JWT)-based access tokens for named users**를 선택합니다.

구성 당시 **Require Proof Key for Code Exchange (PKCE)**, **Enable Refresh Token Rotation**, **Limit idle Refresh Token Time-to-Live (TTL) to 30 Days**가 이미 선택돼 있었고 Salesforce 지원 없이 변경할 수 없다는 안내가 표시됐습니다. 해당 설정을 유지합니다. **Flow Enablement** 옵션은 선택하지 않고 나머지 보안 설정은 Salesforce 안내에 따릅니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/app-security-settings.png' | relative_url }}" alt="JWT 기반 액세스 토큰이 선택된 External Client App 보안 옵션" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>PKCE, refresh token rotation, JWT 기반 액세스 토큰, 30일 비활성 refresh token TTL을 사용한 구성</figcaption>
</figure>

아래로 이동해 **Create**를 선택해 앱을 저장합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/create-app.png' | relative_url }}" alt="Salesforce의 Cancel 및 Create 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>OAuth와 보안 설정을 마친 뒤 Create를 선택</figcaption>
</figure>

### 클라이언트 자격 증명 가져오기

앱을 만든 다음 **Settings** 탭에서 **OAuth Settings**를 펼치고 **App Settings** 아래의 **Consumer Key and Secret**을 선택합니다. 값을 표시하기 전에 신원 확인을 요청할 수 있습니다.

필드 이름은 Copilot Studio에서 다음과 같이 대응됩니다.

| Salesforce | Copilot Studio |
|---|---|
| Consumer Key | Client ID |
| Consumer Secret | Client secret |

값을 안전하게 보관합니다. 에이전트 지침이 아니라 Copilot Studio에 입력합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/consumer-key-and-secret.png' | relative_url }}" alt="Consumer Key and Secret 버튼이 강조된 OAuth Settings" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Consumer Key and Secret 버튼에서 자격 증명을 확인합니다. 스크린샷에는 실제 값이 표시되지 않습니다.</figcaption>
</figure>

> 새 External Client App이 작동하기까지 **최대 30분** 걸릴 수 있다고 Salesforce는 안내합니다. 테스트 시 지연을 고려하되 설정 확인 없이 실패 원인을 전파 지연으로 단정하지 마세요.

## 2. 호스팅 MCP 서버 활성화

**Salesforce Setup**에서 **MCP**를 검색하고 **Integrations > API Catalog** 아래의 **MCP Servers**를 엽니다.

**Salesforce Servers** 탭에서 **SObject All**을 찾아 서버나 해당 행 작업 메뉴에서 활성화합니다. 계속하기 전에 **Server Status**가 **Active**인지 확인합니다. 조직 설정은 Salesforce의 [호스팅 MCP 문서](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/setup-overview.html)를, 서버 작업은 [SObject All 참조](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/sobject-all.html)를 확인하세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/active-sobject-all.png' | relative_url }}" alt="Active 상태의 SObject All이 표시된 Salesforce MCP Servers 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>서버 목록 아래쪽에 Active 상태의 SObject All이 표시됩니다.</figcaption>
</figure>

## 3. Copilot Studio 에이전트에 서버 추가

이제 Copilot Studio로 이동합니다. Microsoft의 [MCP 온보딩 가이드](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent)는 Standard 하네스의 수동 OAuth 필드와 콜백 절차를 설명합니다. 아래 단계와 스크린샷은 구현에서 사용한 GitHub Copilot 하네스 구성입니다.

MCP 온보딩 소개는 [첫 MCP 커넥터 안내](https://microsoft.github.io/mcscatblog/posts/hello-world-mcp-copilot-studio/)에서 확인하세요.

1. 대상 에이전트를 엽니다.
2. 여기서 보여 주는 UI에서는 **Build**를 열고 **Tools** 옆의 **+**를 선택합니다. 전용 **Tools** 페이지가 있다면 그곳에서 **Add a tool**을 선택합니다.
3. **Add a tool**에서 **+ Add**, **Model Context Protocol (MCP)**를 차례로 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/add-mcp-tool.png' | relative_url }}" alt="MCP 옵션이 강조된 Copilot Studio Add a tool 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Model Context Protocol 옵션으로 호스팅 서버를 추가</figcaption>
</figure>

### 서버 및 인증 정보 입력

**Add MCP server**의 첫 번째 부분을 다음과 같이 작성합니다.

| 필드 | 값 |
|---|---|
| Server name | `Salesforce MCP Server` |
| Server URL | 앞 표의 조직 유형별 MCP 엔드포인트 |
| Authentication | **OAuth 2.0** |
| Configuration type | **Manual** |
| Client ID | External Client App의 **Consumer Key** |
| Client secret | External Client App의 **Consumer Secret** |

에이전트가 언제 사용할지 설명에 명시합니다. 예를 들면 다음과 같습니다.

> Use this Salesforce MCP server to work with live Salesforce CRM data and records. Use it when the user asks to find, retrieve, create, or update Salesforce records, including accounts, contacts, leads, opportunities, cases, and related CRM data.

설명은 활성화하려는 도구와 일치시킵니다. 설명은 권한 제어가 아니므로 도구 권한은 별도로 구성합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/mcp-server-details.png' | relative_url }}" alt="Salesforce 엔드포인트와 수동 OAuth 구성이 포함된 MCP 서버 추가 양식" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>서버 세부 정보와 OAuth 2.0 Manual 구성을 입력합니다. 클라이언트 자격 증명은 마스킹됩니다.</figcaption>
</figure>

아래로 이동해 엔드포인트 표의 **Authorization URL**, **Token URL**, **Refresh token URL**, 공백으로 구분한 **Scopes**를 입력합니다.

여기서 보여 주는 Production / Developer Edition 구성의 범위는 `mcp_api refresh_token`이고 두 Token 필드에는 `https://login.salesforce.com/services/oauth2/token`을 사용합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/mcp-oauth-endpoints.png' | relative_url }}" alt="Salesforce 엔드포인트와 범위가 입력된 수동 OAuth 필드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Salesforce의 authorization 및 token 엔드포인트와 MCP 및 refresh token 범위를 사용한 OAuth 구성</figcaption>
</figure>

**Add**를 선택해 서버 정의를 만듭니다. 현재 문서에서는 이 작업을 **Create**라고 부를 수 있습니다.

### 생성된 리디렉션 URL 복사

Copilot Studio에 **Save your redirect URL**이 표시됩니다. 화면에서 필드가 잘릴 수 있으므로 **Copy**를 선택해 전체 URL을 복사합니다.

**아직 Next를 선택하지 마세요.** 연결을 만들기 전에 Salesforce에 이 URL을 정확하게 등록해야 합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/copy-redirect-url.png' | relative_url }}" alt="Copy가 강조된 Save your redirect URL 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>생성된 리디렉션 URL을 복사합니다. 스크린샷은 인스턴스별 부분을 가렸으므로 예시를 복사하면 안 됩니다.</figcaption>
</figure>

## 4. 콜백 완료 및 로그인

**Salesforce Setup > External Client App Manager**로 돌아가 앱을 열고 **Settings** 탭에서 **Edit**를 선택합니다.

**OAuth Settings**를 펼치고 임시 **Callback URL**을 Copilot Studio에서 복사한 전체 리디렉션 URL로 바꿉니다. **Save**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/update-callback-url.png' | relative_url }}" alt="Copilot Studio 리디렉션 URL로 바뀐 Salesforce 콜백 필드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>자리 표시자를 자체 Copilot Studio 리디렉션 URL로 바꾸고 정확하게 유지</figcaption>
</figure>

그런 다음 Copilot Studio로 돌아갑니다.

1. **Save your redirect URL**에서 **Next**를 선택합니다.
2. 새 연결을 만듭니다.
3. 사용할 Salesforce 계정으로 로그인하고 요청된 액세스를 승인합니다.
4. UI에 해당 단계가 나오면 **Add to agent**를 완료합니다.

### 리디렉션 오류가 발생한 경우

콜백이 일치하지 않으면 Salesforce가 다음 오류를 반환할 수 있습니다.

```text
error=redirect_uri_mismatch&error_description=redirect_uri must match configuration
```

Salesforce 콜백과 Copilot Studio 리디렉션이 스킴, 경로, 끝의 슬래시까지 문자 단위로 일치하는지 비교합니다. Copilot Studio에 입력한 Consumer Key에 대응하는 External Client App을 수정했는지도 확인합니다.

> **콜백 URL 변경이 즉시 적용되지 않을 수 있습니다.** URL이 정확히 일치하고 방금 저장했다면 설정이 잘못됐다고 판단하기 전에 변경 사항 적용에 **최대 30분**이 걸릴 수 있습니다. 테스트에서는 약 **10분** 후 작동했습니다. 실패한 로그인 창을 닫고 전파를 기다린 뒤 다시 시도합니다. Salesforce의 [External Client App 설정 가이드](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/create-external-client-app.html)도 새 앱의 사용 가능 상태 전환에 최대 30분이 걸릴 수 있다고 안내합니다.

오류만으로 전파 지연이 원인이라고 단정할 수는 없으므로 콜백과 클라이언트 자격 증명을 먼저 확인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/redirect-uri-mismatch.png' | relative_url }}" alt="redirect_uri_mismatch가 표시된 Salesforce 로그인 창" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>리디렉션 불일치로 연결 생성이 차단된 경우 재시도 전에 저장된 콜백을 확인합니다.</figcaption>
</figure>

## 5. 검색된 도구 검토

인증이 성공하면 에이전트의 **Tools** 목록에서 MCP 서버를 엽니다.

**Edit tool** 패널에서 **Connection**이 연결됐는지 확인하고 **Tool permissions**를 살펴봅니다. 구성에서 다음 도구를 확인했습니다.

- **Get object schema**, **Get user info**, **Find**, **Soql query**
- **Get related records**, **List recent sobject records**
- **Create sobject record**, **Update sobject record**, 관련 레코드 작업
- **Delete sobject record**, **Delete related record**

이 도구는 [SObject All 도구 참조](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/sobject-all.html)의 작업과 일치합니다.

이 안내에서는 먼저 읽기 및 스키마 도구를 활성화합니다. 통제된 쓰기 테스트에 필요한 생성/업데이트 도구만 켜고 삭제 도구는 비활성화합니다. **Allow all**이 선택돼 있다면 끈 후 개별 도구를 선택합니다. **Done**을 눌러 저장합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/discovered-tools.png' | relative_url }}" alt="연결된 Salesforce MCP 서버와 검색된 도구를 보여주는 Edit tool 패널" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>연결에 성공하면 SObject All 도구가 표시됩니다. 캡처된 구성은 Allow all을 켠 상태이므로 테스트에서는 권한을 좁혀야 합니다.</figcaption>
</figure>

호스팅 서비스를 추가하는 또 다른 예는 [Jira 원격 MCP 안내](https://microsoft.github.io/mcscatblog/posts/atlassian-jira-remote-mcp-copilot-studio/)에서 확인할 수 있습니다. 다른 OAuth 등록 방식을 사용하므로 Salesforce 인증 설정에 그대로 재사용하면 안 됩니다.

## 6. 읽기를 테스트하고 통제된 쓰기 수행

연결 상태만으로는 부족합니다. 의도한 Salesforce 조직에서 실제 작업이 성공하는지 확인해야 합니다.

### 최근 영업 기회 읽기

에이전트의 **Preview** 창에서 다음을 입력합니다.

```text
List the latest 10 opportunities we have, ordered by created date.
Include the account, amount, stage, close date, and created date.
```

결과가 의도한 조직의 레코드인지, 로그인한 사용자가 액세스할 수 있는 레코드인지 확인합니다.

### 테스트용 영업 기회 업데이트

테스트 전용 레코드를 선택하고 가능하면 레코드 ID를 사용해 모호하지 않게 지정합니다. 예를 들어 테스트 영업 기회를 바꾼 뒤 단계와 종료 날짜를 업데이트하고 메모를 추가하도록 요청합니다.

```text
Update the test opportunity "Contoso - MCP Validation" to Closed Won
and set its Close Date to today. Add a note saying:
"Controlled MCP validation: stage and close date updated."
```

위 이름은 예시일 뿐 실제 레코드가 존재한다고 가정하면 안 됩니다. 쓰기를 허용하기 전에 대상 레코드가 맞는지 확인합니다.

원문에서 캡처한 순서는 영업 기회를 조회한 다음 **Microsoft - New Pilot**이라는 기회의 종료 날짜를 바꾸고 메모를 추가하는 것이었습니다. 스크린샷은 테스트 상호 작용을 보여 주며 실제 업무에서 따라 해야 할 변경 사항은 아닙니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/opportunity-conversation.png' | relative_url }}" alt="영업 기회를 조회하고 업데이트를 확인하는 Copilot Studio 에이전트 대화" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>원래 테스트 대화에서 조회 후 단계, 종료 날짜, 메모를 업데이트한 모습</figcaption>
</figure>

### Salesforce에서 결과 확인

에이전트의 확인 메시지에서 멈추지 말고 Salesforce에서 영업 기회를 열어 다음을 확인합니다.

- **Stage**가 **Closed Won**인지 확인합니다.
- **Close Date**가 의도한 날짜인지 확인합니다.
- 새 메모가 올바른 영업 기회에 첨부됐는지 확인합니다.
- **Last Modified By**가 예상한 Salesforce 사용자인지 확인합니다.

다음 스크린샷은 10월 13일 테스트를 캡처한 것입니다. 날짜는 테스트 당시 날짜이며 자체 레코드에서 입력할 날짜가 아닙니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/verified-opportunity.png' | relative_url }}" alt="Closed Won, 업데이트된 종료 날짜, 첨부된 메모가 표시된 Salesforce 영업 기회" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>업데이트 후 단계, 종료 날짜, 첨부 메모를 확인하는 영업 기회 레코드</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/salesforce-mcp-copilot-studio/verified-note.png' | relative_url }}" alt="테스트 대화에서 추가한 메모가 포함된 Salesforce 메모 레코드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>메모 레코드에서 저장된 텍스트와 영업 기회 연결을 확인할 수 있습니다.</figcaption>
</figure>

> Salesforce 권한이 최종 통제 경계입니다. 에이전트의 성공 메시지와 레코드의 Last Modified By 필드는 유용한 확인 수단이지만, 지원하려는 실제 사용자 권한으로 테스트하는 것을 대신하지 못합니다.

## 최종 확인 및 문제 해결

다른 테스터와 공유하기 전에 다음을 확인합니다.

- SObject All이 **Active**인지 확인
- External Client App에 `mcp_api`와 `refresh_token`이 있는지 확인
- 콜백에 Copilot Studio 리디렉션 URL이 정확하게 입력됐는지 확인
- MCP 및 OAuth 엔드포인트가 조직 유형과 일치하는지 확인
- 인증이 성공하고 예상 도구가 표시되는지 확인
- 쓰기 도구를 활성화하기 전에 읽기를 성공적으로 수행
- 쓰기 작업을 Salesforce에서 확인
- 필요하지 않은 도구, 특히 삭제 도구 비활성화

| 증상 | 확인할 항목 |
|---|---|
| `redirect_uri_mismatch` | 전체 콜백 및 리디렉션 URL, 올바른 External Client App, 저장 여부, 변경 적용 시간 확인 |
| 로그인에서 사용자를 인식하지 못함 | 조직 유형과 OAuth 호스트 `login.salesforce.com` 또는 `test.salesforce.com` 확인 |
| OAuth는 성공하지만 도구 호출 실패 | MCP 엔드포인트, 서버 활성화, 앱 정책, Salesforce 사용자 권한 확인 |
| 도구가 표시되지 않음 | SObject All 엔드포인트와 Active 상태, 연결 오류 세부 정보 확인 |
| 토큰 만료 후 연결 실패 | refresh 범위와 엔드포인트, Salesforce 토큰 정책 확인. 액세스가 취소됐거나 토큰이 만료됐다면 다시 인증 |

핵심 순서는 간단합니다. **External Client App 등록, SObject All 활성화, 수동 OAuth 구성, 정확한 콜백 저장, 쓰기 테스트 전에 읽기로 도구 확인**입니다.

연결이 작동하면 채팅 요청에서 Salesforce의 검증된 변경까지 이어지는 경로가 생깁니다. 어떤 Salesforce 워크플로를 먼저 연결하고, 어떤 도구는 의도적으로 비활성화해 두시겠어요?
