---
layout: chapter
date: 2026-08-05
title: "Lab CWRK3 — Cowork 플러그인에 Entra SSO 인증 추가하기"
short_title: "Cowork 플러그인 SSO"
description: "인증이 필요한 Zava Claims MCP 서버를 Cowork 플러그인에 연결하고, Microsoft Entra SSO로 시크릿 없이 사용자 토큰을 흘려보내는 방법을 단계별로 구성합니다."
order: 3
category: cowork
parent: "cowork-devcamp"
tags: ["Copilot Cowork", "Entra ID", "SSO", "MCP", "OAuthPluginVault"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — Lab E10의 **Zava Claims MCP 서버**를 Cowork 플러그인에 연결하고 **Microsoft Entra SSO**로 인증합니다. 사용자는 기존 Microsoft 365 자격 증명을 그대로 쓰고, **추가 로그인 프롬프트도, 평문 시크릿도 없습니다.** 매니페스트에는 `OAuthPluginVault`의 **참조 ID만** 들어갑니다.
</div>

> 이 글은 Microsoft 공식 [Copilot Developer Camp](https://microsoft.github.io/copilot-camp/pages/copilot-cowork/03-cowork-plugins-sso/)의 **Lab CWRK3** 를 한국어로 옮긴 것입니다.

여기서 사용하는 패턴은 **Entra로 보호되는 모든 API에 그대로 적용**됩니다. 앱을 등록하고 → SSO 인증 구성을 만들고 → 새 URI로 앱 등록을 업데이트한 뒤 → 플러그인이 그것을 가리키게 합니다. Zava 클레임 시나리오는 구체적인 예시일 뿐입니다.

<div class="info-box tip" markdown="1">

**사전 요건**

- 앱 등록을 관리할 수 있는 권한의 [Azure Portal](https://portal.azure.com/) 접근
- [Teams 개발자 포털](https://dev.teams.microsoft.com/) 접근
- Copilot Cowork 접근
</div>

---

## 이 랩이 중요한 이유

대부분의 조직은 민감한 데이터를 인증된 API 뒤에 두고 있습니다 — 보험 청구 기록, 금융 거래, 환자 데이터 같은 것들이죠. 그 데이터를 쓸 만한 형태로 꺼내려면 보통 **수동 내보내기 → 복사/붙여넣기 → 스프레드시트 서식 수작업**을 매번 반복해야 합니다.

이 랩에서는 세 가지 문제를 한 번에 해결합니다.

- **마찰 없는 보안 접근** — 사용자는 Microsoft Entra SSO로 한 번만 인증합니다. 클라이언트 시크릿도, 설정 파일 속 API 키도, 추가 로그인 프롬프트도 없습니다. 이후 토큰이 조용히 흐르고, 접근 권한은 기존 Entra ID 정책이 관장합니다.
- **일관되게 데이터를 변환하는 스킬** — 사용자가 서식 규칙이나 계산 로직을 기억할 필요 없이, 그 지식을 Cowork **스킬**에 인코딩합니다. 스킬은 원시 클레임 데이터를 받아 **매번 동일한 계산으로 구조화된 Excel 리포트**를 만듭니다.
- **팀을 넘어 재사용되는 가치** — 진짜 보상은 여기입니다. 스킬을 한 번 만들면 어느 부서든 쓸 수 있습니다. 재무팀이 같은 데이터를 자기 형식으로 원한다? 법무팀이 컴플라이언스 뷰를 원한다? 새 스킬을 만들거나 기존 스킬을 재사용하면 됩니다. **보안 MCP 연결과 플러그인 인프라는 그대로**입니다. 한 번의 투자, 여러 소비자.

Zava Insurance는 인증된 MCP 서버로 클레임 데이터를 제공합니다. Cowork를 SSO로 그 서버에 연결한 뒤, 스킬로 원시 데이터를 서식 있는 Excel 리포트로 변환합니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/cowork/cwrk3-01-before-skill.png' | relative_url }}" alt="스킬 적용 전 — 원시로 내보낸 데이터">
  <figcaption><strong>Before</strong> — 원시로 내보낸 클레임 데이터</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/image/cowork/cwrk3-02-after-skill.png' | relative_url }}" alt="스킬 적용 후 — 서식이 적용된 Excel 리포트">
  <figcaption><strong>After</strong> — 스킬이 생성한 서식 있는 Excel 리포트</figcaption>
</figure>

---

## 조각들이 어떻게 맞물리는가

단계로 들어가기 전에, 무엇을 만드는지 이해해 봅시다. 토큰 흐름은 다음과 같습니다.

| # | 흐름 | 설명 |
|---|------|------|
| 1 | 사용자 → Copilot | 플러그인을 호출 |
| 2 | Copilot → **Enterprise Token Store** | "이 인증 구성 ID에 대한 토큰을 다오" |
| 3 | Token Store → **Microsoft Entra ID** | 사용자를 대신한(on-behalf-of) SSO 토큰 요청 |
| 4 | Entra ID → Token Store | 액세스 토큰 발급 (audience = 내 API) |
| 5 | Token Store → Copilot | 액세스 토큰 전달 |
| 6 | Copilot → **내 MCP 서버 / API** | API 호출 + Bearer 토큰 |
| 7 | API 내부 | 토큰 검증 (audience · scope · issuer) |
| 8 | API → Copilot → 사용자 | 응답 데이터 → 서식 있는 답변 |

구성해야 할 것은 세 가지입니다.

| 구성 요소 | 역할 | 구성 위치 |
|-----------|------|-----------|
| **Entra 앱 등록** | API의 신원, 스코프, 호출 허용 대상 정의 | Azure Portal / Entra 관리 센터 |
| **인증 구성(SSO 등록)** | 토큰 저장소가 내 API용 토큰을 어떻게 얻을지 지정 | Teams 개발자 포털 |
| **API의 토큰 검증** | 도착한 토큰을 수락·검증 | 서버 코드의 환경 설정 |

---

## 실습 1: 프로젝트 준비

이 실습에서는 인증된 MCP 서버를 실행하고, SSO로 연결할 플러그인 소스 코드를 가져옵니다.

### 1단계: MCP 서버 코드 가져오기

Lab E10의 Zava MCP 서버가 이미 있다면 그 디렉터리로 이동하세요. 없다면 저장소를 클론합니다.

```bash
git clone https://github.com/microsoft/copilot-camp.git
cd copilot-camp/src/extend-m365-copilot/path-e-lab10-mcp-auth/zava-mcp-server
npm install
```

VS Code로 이 폴더를 엽니다.

```bash
code .
```

이 창이 **MCP 서버 창**입니다. 랩이 끝날 때까지 열어 두세요.

### 2단계: 서버와 Dev Tunnel 실행

Cowork가 접근할 수 있도록 서버를 공개 URL로 노출해야 합니다.

1. 터미널 하나에서 Azurite(로컬 스토리지 에뮬레이터)를 시작합니다.

    ```bash
    npm run start:azurite
    ```

2. 샘플 데이터를 로드합니다(아직 안 했다면).

    ```bash
    npm run init-data
    ```

3. VS Code 터미널 패널에서 **Ports** 탭을 선택해 포트 `3001`을 포워딩하고, 주소를 우클릭해 **Port Visibility → Public**으로 설정합니다. 터널 URL을 복사해 두세요.

4. MCP 서버를 빌드·시작합니다.

    ```bash
    npm run build
    npm run start:mcp-http
    ```

`http://127.0.0.1:3001/health`에 접속해 응답에 `"authentication": "OAuth enabled"`가 보이면 정상입니다.

<div class="info-box note" markdown="1">

**터널 URL을 저장해 두세요** — 이후 실습에서 여러 번 사용합니다. 예: `https://abc123def456.use.devtunnels.ms`
</div>

### 3단계: 플러그인 소스 가져오기

플러그인 코드는 같은 저장소의 `src/cowork/zava-claims-sso`에 있습니다. **별도의 VS Code 창**에서 엽니다(첫 번째 창은 MCP 서버 실행 유지).

```bash
cd copilot-camp/src/cowork/zava-claims-sso
code .
```

구조는 다음과 같습니다.

```text
zava-claims-sso/
├── manifest.json
├── color.png
├── outline.png
├── package.json
└── skills/
    └── zava-claims-export/
        └── SKILL.md
```

매니페스트 + 아이콘 + 원시 클레임 데이터를 서식 있는 Excel 리포트로 바꿀 줄 아는 스킬 하나로 이루어진 **표준 Cowork 플러그인**입니다.

### 4단계: 플러그인의 MCP 서버 URL 수정

`manifest.json`을 열고 `agentConnectors` 섹션을 찾아, `mcpServerUrl` 값을 **Dev Tunnel URL + `/mcp/messages`** 로 바꿉니다.

```json
"mcpServerUrl": "https://<YOUR_DEVTUNNEL>.devtunnels.ms/mcp/messages"
```

`authorization` 섹션은 아직 건드리지 마세요 — 실습 3에서 다룹니다.

---

## 실습 2: Entra SSO 앱 등록 만들기

여기가 ID 배관 작업입니다. Microsoft Entra에게 "이게 내 API이고, 이런 사람들이 호출할 수 있고, 이 스코프가 필요하다"고 알려주는 과정입니다. Lab E10에서 만든 Entra 앱 등록이 이미 있다면 재사용해도 됩니다 — 리디렉션 URI와 스코프만 아래대로 구성되어 있는지 확인하세요.

### 1단계: Entra ID에 앱 등록

1. [Azure Portal](https://portal.azure.com/) → **Microsoft Entra ID** → **앱 등록**
2. **새 등록** 클릭
3. 다음과 같이 구성합니다.
    - **이름**: `Zava Claims MCP Server` (또는 Lab E10의 기존 등록 재사용)
    - **지원되는 계정 유형**: 모든 조직 디렉터리의 계정 (모든 Microsoft Entra ID 테넌트 — 다중 테넌트)
    - **리디렉션 URI**: 플랫폼 = **웹**, URI = `https://teams.microsoft.com/api/platform/v1.0/oAuthConsentRedirect`
4. **등록** 클릭
5. **애플리케이션(클라이언트) ID**를 복사 — 다음 단계에서 필요합니다

<div class="info-box tip" markdown="1">

**왜 다중 테넌트인가?** — 다중 테넌트로 두면 어떤 Microsoft 365 조직의 사용자든 인증할 수 있습니다. 내부 전용 시나리오라면 나중에 자신의 테넌트로 제한하면 됩니다.
</div>

### 2단계: Teams 개발자 포털에서 SSO 등록 만들기

API 스코프를 노출하기 전에, Teams 개발자 포털이 생성하는 **애플리케이션 ID URI**가 필요합니다. 이 URI가 API의 신원이 되므로, 여기서 값을 받은 **뒤에** Entra에 설정합니다.

1. [Teams 개발자 포털](https://dev.teams.microsoft.com/) → **Tools** → **Microsoft Entra SSO client ID registration**
2. **Register client ID** (기존 등록이 있으면 **New client registration**) 클릭
3. 다음을 입력합니다.
    - **Registration name**: `zava-cowork-sso`
    - **Base URL**: `https://<YOUR_DEVTUNNEL>.devtunnels.ms/mcp/messages` (터널 URL + 경로)
    - **Restrict usage by organization**: Any Microsoft 365 organization
    - **Restrict usage by Teams app**: Any Teams app (테스트 및 스토어 검증 전용)
    - **Client (application) ID**: Entra 앱 등록의 클라이언트 ID 붙여넣기
4. **Save** 클릭
5. 포털이 생성한 **Application ID URI**를 복사

<div class="info-box warning" markdown="1">

**Application ID URI 복사를 건너뛰지 마세요** — 다음 단계에서 Entra 앱 등록의 "API 노출"을 설정할 때 필요합니다. 토큰이 발급될 대상이 되는 URI입니다.
</div>

### 3단계: Application ID URI로 API 노출

이제 Entra 앱이 Teams 개발자 포털의 Application ID URI를 사용하도록 설정하고 스코프를 노출합니다.

1. [Azure Portal](https://portal.azure.com/) → 내 앱 등록으로 이동
2. **API 노출**로 이동
3. **애플리케이션 ID URI** 옆의 **추가** 클릭. 기본값을 **2단계에서 복사한 Application ID URI**로 교체
4. **저장** 클릭
5. **범위 추가** 클릭:
    - **범위 이름**: `access_as_user`
    - **동의할 수 있는 사람**: 관리자 및 사용자
    - **관리자 동의 표시 이름**: `Access Zava Claims`
    - **관리자 동의 설명**: `Allows the app to access Zava Claims data on behalf of the signed-in user`
    - **사용자 동의 표시 이름**: `Access Zava Claims`
    - **사용자 동의 설명**: `Allows this app to access your Zava Claims data on your behalf`
    - **상태**: 사용
6. **범위 추가** 클릭
7. **클라이언트 애플리케이션 추가**를 클릭하고 다음을 추가: `ab3be6b7-f5df-413d-ac2d-abf1e3fd9c0b`

    `access_as_user` 스코프 체크박스를 선택하고 **애플리케이션 추가** 클릭

<div class="info-box note" markdown="1">

**저 클라이언트 ID는 무엇인가요?** — `ab3be6b7-f5df-413d-ac2d-abf1e3fd9c0b`는 **Microsoft Enterprise token store**입니다. Cowork가 사용자를 대신해 토큰을 획득할 때 사용하는 서비스이며, **항상 이 값**입니다(Microsoft가 하드코딩).
</div>

전체 스코프 값은 `<APPLICATION_ID_URI>/access_as_user` 형태가 됩니다. 다음 단계를 위해 복사해 두세요.

### 4단계: 스코프로 SSO 등록 완성

1. [Teams 개발자 포털](https://dev.teams.microsoft.com/) → **Tools** → **Microsoft Entra SSO client ID registration**
2. `zava-cowork-sso` 등록 열기
3. 이전 단계의 전체 스코프 값을 **Scope** 필드에 붙여넣기 (예: `<APPLICATION_ID_URI>/access_as_user`)
4. **Save** 클릭
5. **Microsoft Entra SSO registration ID**를 복사 — 이것이 `OAuthPluginVault`의 **참조 ID**입니다

이 참조 ID가 플러그인 매니페스트에 들어갑니다. **코드에는 시크릿이 없고**, 실제 자격 증명이 있는 곳을 가리키는 포인터만 있습니다.

---

## 실습 3: 플러그인에 인증 적용

익명에서 인증으로 가는 데 세 번의 조작이면 충분합니다.

### 1단계: manifest.json에 참조 ID 넣기

`zava-claims-sso` 폴더의 `manifest.json`을 열고, `agentConnectors`의 `authorization` 섹션에서 자리 표시자를 교체합니다.

```json
"authorization": {
    "type": "OAuthPluginVault",
    "referenceId": "<YOUR_SSO_REGISTRATION_ID>"
}
```

`type`은 이미 `OAuthPluginVault`이므로, 실제 Microsoft Entra SSO registration ID만 채워 넣으면 됩니다.

### 2단계: 플러그인 패키징

플러그인 폴더의 **내용물**(폴더 자체가 아님)을 압축합니다.

```bash
# macOS / Linux
npm run package:unix
```

```powershell
# Windows
npm run package
```

루트 레벨에 `manifest.json`, 아이콘, `skills/` 폴더가 들어간 `zava-claims-cowork-plugin.zip`이 생성됩니다.

<div class="info-box tip" markdown="1">

**업로드 전 검증** — 압축을 풀어 `manifest.json`이 **루트에 있는지**(하위 폴더 안이 아닌지) 확인하세요. 중첩된 폴더 구조는 업로드 실패의 원인입니다.
</div>

---

## 실습 4: Cowork에서 인증된 플러그인 테스트

이제 동작을 확인할 차례입니다. MCP 서버가 SSO 토큰을 수락하도록 구성한 뒤 플러그인을 업로드해 테스트합니다.

### 1단계: MCP 서버 환경을 SSO용으로 업데이트

Zava MCP 서버 디렉터리로 이동해 `env/.env.dev` 파일을 SSO 값으로 업데이트합니다.

```ini
# OAuth 2.0 Resource Server
OAUTH_ACCEPTED_ISSUERS=https://login.microsoftonline.com/common/v2.0
OAUTH_ACCEPTED_AUDIENCES=<APPLICATION_ID_URI_FROM_TEAMS_PORTAL>
OAUTH_REQUIRED_SCOPES=<FULL_SCOPE_VALUE>
OAUTH_VALIDATE_ISSUER=false
OAUTH_ACCEPTED_TENANT_IDS=<YOUR_TENANT_ID>
OAUTH_JWKS_URIS=https://login.microsoftonline.com/common/discovery/v2.0/keys

# Authorization endpoints for MCP client discovery
OAUTH_AUTHORIZATION_ENDPOINT=https://login.microsoftonline.com/common/oauth2/v2.0/authorize
OAUTH_TOKEN_ENDPOINT=https://login.microsoftonline.com/common/oauth2/v2.0/token

# Server
RESOURCE_IDENTIFIER=https://<YOUR_DEVTUNNEL>.devtunnels.ms
SERVER_BASE_URL=https://<YOUR_DEVTUNNEL>.devtunnels.ms
PORT=3001
HOST=127.0.0.1
NODE_ENV=development

# CORS (comma-separated origins)
ADDITIONAL_ALLOWED_ORIGINS=http://localhost:6274,https://<YOUR_DEVTUNNEL>.devtunnels.ms

# Azure Table Storage (Azurite for local dev)
AZURE_STORAGE_CONNECTION_STRING="UseDevelopmentStorage=true"
```

자리 표시자를 다음 값으로 교체합니다.

| 자리 표시자 | 값 |
|---|---|
| `<APPLICATION_ID_URI_FROM_TEAMS_PORTAL>` | 실습 2 · 2단계에서 생성된 Application ID URI |
| `<FULL_SCOPE_VALUE>` | 실습 2 · 3단계의 전체 스코프 (예: `<APPLICATION_ID_URI>/access_as_user`) |
| `<YOUR_TENANT_ID>` | Microsoft 365 테넌트 ID |
| `<YOUR_DEVTUNNEL>` | Dev Tunnel URL (끝에 슬래시 없이) |

<div class="info-box note" markdown="1">

**단일 audience** — 기본값 `api://<client-id>` 대신 Teams 개발자 포털의 Application ID URI를 Entra 앱에 직접 설정했으므로, 토큰은 **항상 그 단일 audience**로 도착합니다. 여러 값을 나열할 필요가 없습니다.
</div>

업데이트 후 MCP 서버를 재시작합니다.

```bash
npm run build
npm run start:mcp-http
```

### 2단계: Cowork에 플러그인 업로드

1. [Copilot Cowork](https://m365.cloud.microsoft/cowork/) 열기
2. **+** 아이콘 클릭
3. 아래로 스크롤해 **Customize**(스킬·플러그인 관리) 선택
4. Customize 페이지에서 `zava-claims-cowork-plugin.zip` 업로드

별도의 연결 단계는 없습니다. 업로드하면 Cowork가 즉시 인식합니다.

### 3단계: 인증이 필요한 프롬프트로 테스트

Cowork에 다음 프롬프트를 입력합니다.

```text
Create a claims report in Excel
```

Cowork가 **도구 승인 대화 상자**를 표시합니다. Cowork가 사용자를 대신해 MCP 서버의 도구를 호출하도록 승인하는 **최초 1회 동의 단계**입니다. **Approve**를 눌러 계속합니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/cowork/cwrk3-03-approval.png' | relative_url }}" alt="Cowork의 도구 승인 대화 상자">
  <figcaption>최초 1회 도구 승인 — Approve 클릭</figcaption>
</figure>

승인하면 흐름이 엔드투엔드로 완결됩니다. Cowork가 SSO로 인증하고 → 유효한 토큰으로 Zava MCP 서버를 호출하고 → 클레임 데이터를 가져오고 → 스킬이 이를 서식 있는 Excel 리포트로 변환합니다. **수동 내보내기도, 재서식도 없이** 완성된 결과물만 남습니다.

<div class="info-box tip" markdown="1">

**로그인이 실패한다면** 세 가지를 확인하세요.

1. Dev Tunnel이 여전히 실행 중이며 **Public** 상태인가
2. `.env.dev`의 `OAUTH_ACCEPTED_AUDIENCES`가 Teams 개발자 포털의 Application ID URI와 **일치**하는가
3. Entra 앱의 **인증(Authentication)** 섹션에 리디렉션 URI `https://teams.microsoft.com/api/platform/v1.0/oAuthConsentRedirect`가 구성되어 있는가
</div>

---

## 🎉 축하합니다!

**Lab CWRK3 — Cowork 플러그인에 Entra SSO 인증 추가하기**를 완료했습니다!

이로써 Copilot Cowork 개발 랩 시리즈(CWRK0 ~ CWRK3)를 모두 마쳤습니다. 👉 [Cowork 랩 시리즈 처음으로]({{ '/chapters/cowork-dc0-setup/' | relative_url }})

---

## 📚 참고 자료

- 📖 [Cowork 플러그인 개발 — Microsoft Learn](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-plugin-development)
- 🧪 [Lab E10 — MCP 서버에 인증 추가하기 (원문)](https://microsoft.github.io/copilot-camp/pages/extend-m365-copilot/10-mcp-auth/?bundle=a)
- 💾 [zava-claims-sso 소스](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/zava-claims-sso)
- 🏕️ [원문: Copilot Developer Camp — Lab CWRK3](https://microsoft.github.io/copilot-camp/pages/copilot-cowork/03-cowork-plugins-sso/)
