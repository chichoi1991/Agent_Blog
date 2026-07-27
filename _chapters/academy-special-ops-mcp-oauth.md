---
layout: "chapter"
title: "🔐 OAuth 2.0으로 보안 MCP 서버 연동하기"
short_title: "OAuth 2.0 MCP 서버"
description: "OAuth 2.0 인증으로 보호된 MCP 서버를 Microsoft Copilot Studio 에이전트에 연결하는 방법을 실습합니다."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/mcp-oauth/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-07-23"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/mcp-oauth/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🔐 Consuming a Secured MCP Server with OAuth 2.0](https://microsoft.github.io/agent-academy/special-ops/mcp-oauth/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# 🔐 OAuth 2.0으로 보안 MCP 서버 연동하기

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/mc-oauth-badge.png' | relative_url }}" alt="OAuth 2.0 MCP 배지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Operation Clearance 배지</figcaption></figure>

에이전트 여러분, 이번 미션 **Operation Clearance**의 목표는 **OAuth 2.0** 인증으로 보호된 **MCP 서버**를 Microsoft Copilot Studio 에이전트에 연결하는 것입니다. 토큰 없이는 접근 불가. Entra ID에 자격증명을 등록하고, Authorization Code Flow를 연결하고, 인증된 운영자만 HR 채용 후보 파일에 접근할 수 있음을 증명합니다. 🎯🔑

<div class="info-box note" markdown="1">
**참고**: 이 미션은 **새 Copilot Studio 작성 환경(New Experience)** 기준으로 업데이트되었습니다.
</div>

이 미션은 [Microsoft Copilot Studio ❤️ MCP](https://microsoft.github.io/agent-academy/special-ops/mcs-mcp/) 미션의 개념을 기반으로 합니다. 이전 미션에서는 인증이 없는 MCP 서버를 다뤘습니다. 여기서는 커스텀 MCP 서버를 OAuth 2.0 인증으로 보호합니다.

## 🔧 만들 것들

- OAuth 2.0 JWT ****** 검증하는 사전 제작 **HR MCP 서버** (.NET)
- 두 개의 **Microsoft Entra ID** 앱 등록 — 백엔드(API)용과 클라이언트(Copilot Studio)용
- **OAuth 2.0 인증**을 사용해 보안 MCP 도구를 호출하는 Copilot Studio 에이전트

## ⚙️ 사전 준비

- Microsoft Copilot Studio 체험판 또는 유료 계정. 계정이 없다면 [코스 설정](https://microsoft.github.io/agent-academy/recruit/00-course-setup/) 안내를 참고하세요.
- **Microsoft Entra ID**에 앱을 등록하고 관리자 동의를 부여할 수 있는 권한.
- 로컬에 **Visual Studio Code**, **.NET SDK**, **dev tunnel** CLI 설치.

<div class="info-box note" markdown="1">
**참고**: Lab 1.1과 1.2는 로컬 머신과 Entra 관리 센터에서 진행합니다. Lab 1.3–1.5는 Copilot Studio에서 진행합니다. 미션 전체에서 서버와 dev tunnel을 계속 실행 상태로 유지하세요.
</div>

### OAuth 2.0 Authorization Code Flow란?

OAuth 2.0을 에이전트의 **보안 검문소**로 생각하면 됩니다. 이 미션에서의 흐름은 다음과 같습니다.

1. **사용자 인증** — 에이전트에서 MCP 도구를 호출하면 Microsoft Entra ID 로그인을 요청합니다.
1. **인증 코드 발급** — 로그인 후 Entra ID가 리디렉션 URI를 통해 Copilot Studio로 인증 코드를 반환합니다.
1. **토큰 교환** — Copilot Studio가 그 코드(및 클라이언트 자격증명)를 액세스 토큰으로 교환합니다.
1. **API 접근** — Copilot Studio가 액세스 토큰을 MCP 서버에 전달하고, 서버는 처리 전 토큰을 검증합니다.

이를 통해 사용자 자격증명이 서버에 노출되지 않고, 토큰에 수명과 범위가 제한되며, 서버가 신원과 권한을 검증할 수 있습니다.

## 🎯 시나리오

Zava의 HR 팀은 민감한 인사 데이터를 노출하는 후보 관리 MCP 서버를 운영하고 있습니다. 비인증 엔드포인트는 프로덕션에 부적합합니다. 여러분의 임무: OAuth 2.0으로 보호하고, Copilot Studio 에이전트에 연결해 인증된 직원만 후보를 조회·검색·추가·수정·삭제할 수 있도록 만듭니다.

## 🧪 Lab 1.1 — 보안 MCP 서버 설정

보안 HR MCP 서버는 OAuth 2.0으로 보호된 표준 HR 후보 서버입니다. 동일한 도구를 제공합니다.

- **list_candidates** — 전체 후보 목록 반환
- **search_candidates** — 이름, 이메일, 기술, 역할로 검색
- **add_candidate** — 새 후보 추가
- **update_candidate** — 이메일로 기존 후보 정보 수정
- **remove_candidate** — 이메일로 후보 삭제

차이점: 모든 요청에 유효한 OAuth 2.0 액세스 토큰이 `Authorization` 헤더에 필요하며, Entra ID 테넌트에 대해 JWT로 검증됩니다.

1. `./assets/hr-mcp-server-secured/`에 있는 사전 제작 보안 HR MCP 서버 파일을 엽니다.

1. **Visual Studio Code**로 폴더를 엽니다. 서버에는 OAuth 2.0 보안이 이미 구현되어 있습니다.

    프로젝트의 주요 구성 요소:

    - `Configuration/HRMCPServerConfiguration.cs` — OAuth 포함 구성 설정
    - `Data/candidates.json` — 후보 목록
    - `Services/` — `ICandidateService.cs` / `CandidateService.cs`, `IAuthorizationService.cs` / `AuthorizationService.cs`
    - `Tools/HRTools.cs`, `Tools/Models.cs` — MCP 도구 및 데이터 모델
    - `appsettings.json.sample` — 구성 템플릿
    - `Program.cs` — 진입점. MCP 서버가 JWT 인증을 초기화하는 곳

<div class="info-box note" markdown="1">
**참고**: 서버에는 Entra ID 테넌트 기준으로 수신 토큰을 검증하는 JWT ****** 미들웨어가 포함되어 있습니다. 인증된 사용자만 HR 도구에 접근할 수 있습니다.
</div>

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/mcp-server-secured-01.png' | relative_url }}" alt="보안 MCP 서버 코드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>JWT 인증이 적용된 보안 MCP 서버 코드</figcaption></figure>

## 🧪 Lab 1.2 — Microsoft Entra ID 앱 등록 설정

두 개의 앱을 등록합니다. 하나는 HR MCP 서버(백엔드/API)용, 하나는 Copilot Studio 클라이언트(프런트엔드)용입니다.

### HR MCP 서버 앱 등록 (백엔드)

1. 회사 계정으로 [https://entra.microsoft.com](https://entra.microsoft.com)을 엽니다.

1. 왼쪽 탐색에서 **앱 등록** → **+ 새 등록**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/entra-app-registration-01.png' | relative_url }}" alt="Entra 앱 등록 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Entra ID 앱 등록 화면</figcaption></figure>

1. 다음 설정으로 앱을 구성합니다.

    - **이름**: `HR MCP Server`
    - **지원되는 계정 유형**: **이 조직 디렉터리의 계정만**
    - **리디렉션 URI**: 지금은 비워 둠(나중에 구성)

1. **등록**을 선택해 앱을 만듭니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/entra-app-registration-02.png' | relative_url }}" alt="앱 등록 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>앱 등록 완료 버튼</figcaption></figure>

### 백엔드에서 API 노출

1. **HR MCP Server** 앱에서 **API 노출**을 선택합니다.

1. **애플리케이션 ID URI** 옆의 **추가**를 선택하고, 기본값(`api://<client-id>`)을 그대로 수락한 뒤 **저장**합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/entra-expose-api-01.png' | relative_url }}" alt="API 노출 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>API 노출 및 애플리케이션 ID URI 저장</figcaption></figure>

1. **이 API에서 정의한 범위**에서 **+ 범위 추가**를 선택하고 다음을 설정합니다.

    - **범위 이름**: `HR.Manage`
    - **동의 가능 대상**: **관리자 및 사용자**
    - **관리자 동의 표시 이름**: `Manage HR data`
    - **관리자 동의 설명**: `Allows managing HR data as an Admin`
    - **사용자 동의 표시 이름**: `Manage HR data`
    - **사용자 동의 설명**: `Allows managing HR data as a user`
    - **상태**: **사용**

1. **범위 추가**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/entra-add-scope-01.png' | relative_url }}" alt="범위 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>HR.Manage 범위 추가</figcaption></figure>

1. **개요** 페이지에서 **애플리케이션(클라이언트) ID**와 **디렉터리(테넌트) ID**를 메모합니다 — 나중에 필요합니다.

### Copilot Studio 클라이언트 앱 등록 (프런트엔드)

이제 Copilot Studio가 HR MCP Server를 사용하는 클라이언트 앱을 만듭니다.

1. **앱 등록**에서 **+ 새 등록**을 선택합니다.

1. 다음 속성으로 구성하고 **등록**합니다.

    - **이름**: `HR MCP Consumer`
    - **지원되는 계정 유형**: **이 조직 디렉터리의 계정만**
    - **리디렉션 URI**: 비워 둠(Copilot Studio가 나중에 제공)

### 클라이언트 시크릿 만들기

1. **HR MCP Consumer** 앱에서 **인증서 및 비밀** → **+ 새 클라이언트 암호**를 선택합니다.

1. **설명**과 **만료** 기간(예: 12개월)을 설정하고 **추가**를 선택합니다.

<div class="info-box note" markdown="1">
**중요**: 비밀 **값**을 즉시 복사하고 안전하게 저장하세요 — 이후에는 다시 표시되지 않습니다.
</div>

### API 권한 구성

1. **API 권한** → **+ 권한 추가** → **내 조직에서 사용하는 API**를 선택하고 **HR MCP Server**를 검색해 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/entra-api-permissions-01.png' | relative_url }}" alt="API 권한 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>HR MCP Server API 선택</figcaption></figure>

1. **위임된 권한**을 선택하고 **HR.Manage**를 체크한 뒤 **권한 추가**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/entra-api-permissions-02.png' | relative_url }}" alt="권한 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>HR.Manage 위임된 권한 추가</figcaption></figure>

1. Microsoft Graph 위임된 권한도 추가합니다: **+ 권한 추가** → **Microsoft Graph** → **위임된 권한** → **email**, **openid**, **profile**, **User.Read** 선택 → **권한 추가**.

1. **[테넌트]에 대한 관리자 동의 부여**를 선택하고 **예**로 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/entra-admin-consent-01.png' | relative_url }}" alt="관리자 동의 부여" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>관리자 동의 부여 완료</figcaption></figure>

1. **개요** 페이지에서 **애플리케이션(클라이언트) ID**를 메모합니다(비밀 값은 이미 저장해 두었습니다).

### MCP 서버 구성 및 실행

1. `appsettings.json.sample`을 복사해 `appsettings.json`으로 만들고 `AzureAd` 섹션을 업데이트합니다.

    ```json
    {
      "AzureAd": {
        "Instance": "https://login.microsoftonline.com/",
        "TenantId": "[YOUR_TENANT_ID]",
        "ClientId": "[YOUR_HR_MCP_SERVER_CLIENT_ID]",
        "Audience": "[YOUR_HR_MCP_SERVER_CLIENT_ID]",
        "Scopes": "[YOUR_APPLICATION_ID_URI]/HR.Manage"
      }
    }
    ```

    `[YOUR_TENANT_ID]`, `[YOUR_HR_MCP_SERVER_CLIENT_ID]`는 백엔드 앱의 값으로, `[YOUR_APPLICATION_ID_URI]`는 애플리케이션 ID URI(예: `api://xxxxxxxx-...`)로 교체합니다.

1. 파일을 저장하고 서버를 시작합니다.

    ```bash
    dotnet run
    ```

    유효한 액세스 토큰 없이 들어오는 모든 요청은 이제 **401 Unauthorized**로 거부됩니다.

### dev tunnel로 서버 외부 노출

1. dev tunnel이 설치되어 있지 않다면 [dev tunnels 시작 가이드](https://learn.microsoft.com/azure/developer/dev-tunnels/get-started)를 참고해 설치한 후 터널을 호스팅합니다.

    <div class="info-box note" markdown="1">
    **중요**: `hr-mcp-secured`를 고유한 이름(예: `hr-mcp-secured-alex`)으로 교체하세요.
    </div>

    ```bash
    devtunnel create hr-mcp-secured -a --host-header unchanged
    devtunnel port create hr-mcp-secured -p 47002
    devtunnel host hr-mcp-secured
    ```

1. **브라우저를 통해 연결** URL을 복사해 저장합니다 — Copilot Studio와 Entra ID에서 사용합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/devtunnel-hosting-01.png' | relative_url }}" alt="dev tunnel 호스팅" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>dev tunnel 실행 및 연결 URL 확인</figcaption></figure>

<div class="info-box note" markdown="1">
**팁**: 미션 전체에서 서버(`dotnet run`)와 터널(`devtunnel host hr-mcp-secured`)을 모두 실행 상태로 유지하세요.
</div>

### 애플리케이션 ID URI 및 구성 업데이트

1. [Entra 관리 센터](https://entra.microsoft.com)에서 **HR MCP Server** 앱 → **API 노출** → **애플리케이션 ID URI** 옆 **편집**을 선택하고, `api://<guid>`를 dev tunnel URL(후행 슬래시 없이, 예: `https://hr-mcp-secured.devtunnels.ms`)로 교체하고 **저장**합니다.

1. `appsettings.json`의 `Scopes`가 dev tunnel URL을 사용하도록 업데이트합니다.

    ```json
    {
      "AzureAd": {
        "Instance": "https://login.microsoftonline.com/",
        "TenantId": "[YOUR_TENANT_ID]",
        "ClientId": "[YOUR_HR_MCP_SERVER_CLIENT_ID]",
        "Audience": "[YOUR_HR_MCP_SERVER_CLIENT_ID]",
        "Scopes": "[YOUR_DEVTUNNEL_URL]/HR.Manage"
      }
    }
    ```

1. 파일을 저장하고 서버를 중지(`Ctrl+C`)한 뒤 `dotnet run`으로 다시 시작합니다.

## 🧪 Lab 1.3 — Copilot Studio에서 에이전트 만들기

이제 보안 MCP 서버를 사용할 에이전트를 만듭니다.

1. [Microsoft Copilot Studio](https://copilotstudio.microsoft.com)로 이동해 로그인합니다. 홈 페이지에서 **또는 빌드할 항목 선택** 아래 **에이전트** 카드를 선택합니다. Build 편집기로 바로 이동됩니다.

1. **에이전트 이름 지정** 필드에 다음을 붙여넣습니다.

    ```text
    HR Candidate Management (Secured)
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/step-agent-name-annotated.png' | relative_url }}" alt="에이전트 이름 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 이름 입력 화면</figcaption></figure>

1. Build 탭의 **지침** 필드를 선택하고 다음을 붙여넣습니다.

    ```text
    You are a helpful HR assistant that specializes in secure candidate management. You can help users search for candidates, check their availability, get detailed candidate information, and add new candidates to the system.

    All operations require user authentication through OAuth 2.0 to ensure data security and compliance with enterprise policies.

    Always provide clear and helpful information about candidates, including their skills, experience, contact details, and availability status.
    ```

1. 오른쪽 구성 패널에서 **모델** 드롭다운을 열고 **GPT-5 Chat**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/step-model-dropdown.png' | relative_url }}" alt="모델 드롭다운" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>GPT-5 Chat 모델 선택</figcaption></figure>

1. 상단 도구 모음에서 **저장**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/step-agent-configured.png' | relative_url }}" alt="에이전트 구성 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 기본 구성 완료</figcaption></figure>

1. Build 탭의 **지식** 섹션에서 **모든 웹 사이트 검색** 소스의 **X**(제거)를 선택해 삭제합니다. 에이전트가 명시적으로 구성한 도구와 지식만 사용하도록 제한합니다.

1. 대화 시작 문구를 구성합니다. 상단 도구 모음에서 **추가 옵션(…)** → **설정** → **인사말 및 프롬프트** 탭 → **추천 프롬프트** 아래 **추천 프롬프트 추가**를 선택하고 각 **제목**과 **메시지**를 입력합니다.

    - 제목: `List all candidates` — 메시지: `Show me all candidates in the HR system`
    - 제목: `Search candidates` — 메시지: `Search for candidates with skills in [SKILL]`
    - 제목: `Add new candidate` — 메시지: `Add a new candidate with firstname [FIRSTNAME], lastname [LASTNAME], email [EMAIL], role [ROLE], languages [LANGUAGES], and skills [SKILLS]`

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/step-suggested-prompts-filled.png' | relative_url }}" alt="추천 프롬프트 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>추천 프롬프트 구성 완료</figcaption></figure>

1. **설정**을 닫고 **저장**을 선택합니다.

## 🧪 Lab 1.4 — OAuth 2.0으로 MCP 도구 등록

이제 보안 MCP 서버를 도구로 추가하고 OAuth 2.0을 연결합니다.

1. 오른쪽 구성 패널의 **도구** 섹션에서 **도구 추가**를 선택합니다. **도구 추가** 대화 상자에서 커스텀 **추가(+)** 컨트롤을 선택하고 **Model Context Protocol(MCP)** 을 선택해 새 커스텀 MCP 서버를 만듭니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/step-mcp-tab-annotated.png' | relative_url }}" alt="MCP 도구 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>커스텀 MCP 도구 추가 화면</figcaption></figure>

1. **MCP 서버 추가** 대화 상자에서 기본 설정을 입력합니다.

    - **서버 이름**: `HR MCP Server Secured`
    - **서버 설명**: `Securely manages HR candidates with OAuth 2.0 authentication for enterprise compliance`
    - **서버 URL**: 앞서 저장한 dev tunnel **브라우저를 통해 연결** URL

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/step-mcp-server-details.png' | relative_url }}" alt="MCP 서버 세부 정보" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 서버 이름, 설명, URL 입력</figcaption></figure>

1. **인증** 아래 **OAuth 2.0**을 선택하고 **구성 유형**을 **수동**으로 설정한 뒤 다음을 입력합니다.

    - **클라이언트 ID**: **HR MCP Consumer** 앱의 **애플리케이션(클라이언트) ID**
    - **클라이언트 시크릿**: 앞서 저장한 클라이언트 암호 **값**
    - **인증 URL**: `https://login.microsoftonline.com/[YOUR_TENANT_ID]/oauth2/v2.0/authorize`
    - **토큰 URL**: `https://login.microsoftonline.com/[YOUR_TENANT_ID]/oauth2/v2.0/token`
    - **새로 고침 토큰 URL**: `https://login.microsoftonline.com/[YOUR_TENANT_ID]/oauth2/v2.0/token`
    - **범위**: 공백으로 구분된 범위 입력

    <div class="info-box note" markdown="1">
    **중요**: 이 범위는 임시입니다 — 연결이 확립되면 보안 서버의 실제 범위(`[YOUR_DEVTUNNEL_URL]/HR.Manage`)로 교체합니다.
    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/step-oauth-config.png' | relative_url }}" alt="OAuth 2.0 수동 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>OAuth 2.0 수동 구성 화면</figcaption></figure>

1. **추가**를 선택해 MCP 서버 구성을 만듭니다.

1. 도구가 만들어지면 Copilot Studio가 **리디렉션 URL**을 생성합니다. 이를 복사한 뒤 [Entra 관리 센터](https://entra.microsoft.com)에서 **HR MCP Consumer** 앱 → **인증** → **+ 플랫폼 추가**/**+ 리디렉션 URI 추가** → **웹**을 선택하고 URL을 붙여넣어 **구성**합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/entra-redirect-uri-01.png' | relative_url }}" alt="리디렉션 URI 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Entra ID에 리디렉션 URI 등록</figcaption></figure>

1. *(선택 사항)* 환경에 Power Apps 커스텀 커넥터가 필요하다면, [Power Automate](https://make.powerautomate.com)에서 올바른 환경 선택 → **더 보기** → **모두 검색** → **커스텀 커넥터**로 이동해 **HR MCP Server Secured** 커넥터의 **보안** 탭에서 **클라이언트 시크릿**, **리소스 URL**(dev tunnel URL), **범위**(`HR.Manage`)를 설정하고 **커넥터 업데이트**를 선택합니다.

1. 연결 완료: 도구 구성에서 **연결 안 됨** → **새 연결 만들기** → **만들기**를 선택하고 유효한 회사 계정으로 인증한 뒤 동의를 부여합니다. 이후 **추가**를 선택합니다.

1. **HR MCP Server Secured** 도구 칩을 열어 `list_candidates`, `search_candidates`, `add_candidate`, `update_candidate`, `remove_candidate` 다섯 개 도구가 모두 표시되는지 확인합니다.

## 🧪 Lab 1.5 — 에이전트 테스트

이제 OAuth 2.0이 제대로 지키고 있는지 확인합니다.

1. 상단 도구 모음에서 **게시**를 선택하고 게시가 완료될 때까지 기다립니다.

1. **미리 보기** 탭을 선택합니다. 예를 들어 **List all candidates** 추천 프롬프트를 선택해 메시지를 전송합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/step-preview.png' | relative_url }}" alt="에이전트 미리 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>추천 프롬프트가 있는 미리 보기 화면</figcaption></figure>

1. 보안 도구가 처음 호출되면 외부 서버에 자격증명을 사용하겠냐는 인라인 **권한 필요** 카드가 표시됩니다. **허용**을 선택합니다.

    <div class="info-box note" markdown="1">
    **참고**: 연결이 없거나 토큰이 만료된 경우 **연결 관리자 열기** 메시지가 표시될 수 있습니다. 그러면 **연결**을 선택하고 회사 계정으로 로그인해 동의를 부여한 뒤 연결이 **연결됨** 상태인지 확인하고 메시지를 다시 전송합니다.
    </div>

1. 에이전트가 보안 MCP 서버를 호출하고 후보 목록을 반환하는지 확인합니다. 다른 도구도 테스트해 봅니다.

    ```text
    Search for candidates with Training skills
    ```

    ```text
    Get candidate with email bob.brown@example.com
    ```

    <div class="info-box note" markdown="1">
    **팁**: 첫 인증 이후 액세스 토큰이 캐시되므로 만료되거나 취소되지 않는 한 매 요청마다 재인증할 필요가 없습니다.
    </div>

<div class="info-box note" markdown="1">
**서버 모니터링**: 에이전트 실행 중 .NET 터미널에 각 도구 호출과 수신 `Authorization: Bearer` 헤더가 기록됩니다. 이를 통해 JWT 액세스 토큰이 전송·검증되는지 확인할 수 있습니다.
</div>

## ✅ 미션 완료!

축하합니다, 에이전트 여러분 — **Operation Clearance** 완료! Copilot Studio 에이전트가 이제 OAuth 2.0 검문소를 통과한 후에만 HR 후보 파일에 접근합니다.

이 미션에서 달성한 것들:

✅ **보안 MCP**: OAuth 2.0 JWT 토큰 검증이 적용된 MCP 서버 구성  
✅ **Entra ID 등록**: 안전한 API 접근을 위한 백엔드 및 클라이언트 앱 등록  
✅ **Authorization Code Flow**: Copilot Studio에서 OAuth 2.0 엔드투엔드 구성  
✅ **인증된 도구 사용**: 엔터프라이즈급 인증으로 보안 MCP 도구 사용

## 🏅 완료 배지 획득

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcp-oauth/mc-oauth-badge.png' | relative_url }}" alt="Operation Clearance 완료 배지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Operation Clearance 완료 배지</figcaption></figure>

## 📚 참고 자료

🔗 [Microsoft Learn MCP Server](https://microsoft.github.io/agent-academy/special-ops/ms-learn-mcp/) — 호스팅된 Microsoft Learn Docs MCP Server를 에이전트에 연결

🔗 [Microsoft Copilot Studio ❤️ MCP](https://microsoft.github.io/agent-academy/special-ops/mcs-mcp/) — 커스텀 MCP 서버 구축 및 배포

📖 [Copilot Studio MCP 연결](https://learn.microsoft.com/microsoft-copilot-studio/connections-mcp)

📖 [Microsoft Entra ID 앱 등록](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app)

📖 [OAuth 2.0 Authorization Code Flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow)

📖 [Model Context Protocol 개요](https://modelcontextprotocol.io/introduction)
