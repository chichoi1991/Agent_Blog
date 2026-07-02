---
layout: "chapter"
title: "Copilot Studio에서 Snowflake 관리형 MCP 서버 연결하기"
short_title: "Snowflake MCP 서버 연결"
description: "Microsoft Entra ID를 통한 위임 사용자 OAuth를 사용해 Snowflake 관리형 MCP 서버를 Copilot Studio 에이전트에 연결하는 엔드투엔드 가이드."
order: 3
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/snowflake-mcp-copilot-studio/"
source_author: "Microsoft Copilot Studio CAT"
source_published: "2026-05-22"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/snowflake-mcp-copilot-studio/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 Microsoft Copilot Studio CAT(@Microsoft Copilot Studio CAT) 원문 [Wiring up a Snowflake-managed MCP server in Copilot Studio](https://microsoft.github.io/mcscatblog/posts/snowflake-mcp-copilot-studio/)(2026-05-22)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/header.png' | relative_url }}" alt="MCP 링크를 통해 Snowflake에 연결된 Copilot Studio 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

저희는 최근 Snowflake 관리형 MCP 서버를 Copilot Studio 에이전트에 엔드투엔드로 연결해봤습니다. 공식 문서는 개별 구성 요소를 잘 다루지만, 이것들을 실제로 연결하려고 하면 비로소 드러나는 세부 사항들이 있습니다. manual OAuth가 필수라는 것, 리디렉션 URI 순서 함정이 있다는 것, 테스트 창에 별도의 최종 사용자 연결이 필요하다는 것, 그리고 Cortex Agent가 트라이얼 계정을 조용히 차단하는 숨은 전제 조건이라는 것입니다. 이 글은 처음부터 갖고 싶었던 가이드입니다.

> 아래의 모든 샘플 ID, 비밀, 호스트명, 테넌트, 이메일 주소는 플레이스홀더입니다. 모든 `<PLACEHOLDER>`를 본인의 값으로 교체하세요.

## 무엇을 만드는가

Snowflake 관리형 MCP 서버를 통해 Snowflake와 통신하는 Copilot Studio 에이전트입니다. 토큰은 위임 사용자 OAuth를 사용해 Entra ID를 통해 흐르므로, 모든 쿼리가 서비스 주체가 아닌 로그인한 사용자로 실행됩니다.

## 요점 정리

이 글에서 다섯 가지만 가져간다면 다음입니다:

1. Snowflake 관리형 MCP는 런타임에 항상 Cortex Agent를 통해 라우팅됩니다. 계정에서 Cortex가 차단되어 있으면(트라이얼에서 흔한 경우), 도구 발견은 작동하지만 모든 호출이 실패합니다.
2. Snowflake는 OAuth 동적 클라이언트 등록을 지원하지 않습니다. 처음부터 Copilot Studio에서 **Manual** OAuth를 사용하세요.
3. 커넥터 리디렉션 URI는 MCP 도구를 만든 후에야 존재합니다. Copilot Studio가 생성한 후에 Azure에 추가합니다, 그 전이 아니라.
4. 메이커 연결과 테스트 창(최종 사용자) 연결은 다른 것입니다. 둘 다 성공해야 합니다.
5. `ALTER USER ... SET DEFAULT_SECONDARY_ROLES = ('ALL')`은 대부분의 블로그 포스트가 빠뜨리는 줄입니다. 없으면 `session:role-any` 스코프가 런타임에 역할에 바인딩할 수 없습니다.

## Cortex Agent: 숨은 전제 조건

Snowflake 관리형 MCP 서버는 기본 도구가 `CORTEX_SEARCH_SERVICE_QUERY`, `GENERIC` 저장 프로시저, `SYSTEM_EXECUTE_SQL` 중 무엇이든 런타임에 항상 Cortex Agent를 통해 도구를 호출합니다. Cortex Agent는 모든 MCP 호출의 런타임 오케스트레이터입니다.

Snowflake 계정에서 두 가지가 참이어야 합니다:

- Cortex Agent가 귀하의 Snowflake 지역에서 활성화되어 있어야 합니다.
- 계정이 Cortex Agent를 호출할 수 있어야 합니다. 표준 30일 트라이얼 계정은 Cortex가 조직 수준에서 차단되어 있습니다. 발견은 성공하지만 모든 호출이 `MCP Server tool error: No tool result received calling Cortex Agent`로 실패합니다.

트라이얼을 사용 중이라면 계속하기 전에 Snowflake 지원에 Cortex 활성화를 요청하거나 유료 계정으로 전환하세요. 이 글의 다른 모든 것은 여전히 작동하지만 에이전트가 실제로 답변하지 않습니다.

## 플레이스홀더 치트 시트

전체 가이드에서 이 플레이스홀더들을 사용합니다. 백트래킹하지 않도록 진행하면서 수집하세요.

| 플레이스홀더 | 찾는 위치 |
| --- | --- |
| `<TENANT_ID>` | Entra > 개요 > 테넌트 ID |
| `<TENANT_NAME>` | Entra > 개요 > 기본 도메인 |
| `<RESOURCE_APP_CLIENT_ID>` | 리소스 앱 등록 > 개요 > 애플리케이션(클라이언트) ID |
| `<CLIENT_APP_CLIENT_ID>` | 클라이언트 앱 등록 > 개요 > 애플리케이션(클라이언트) ID |
| `<CLIENT_SECRET_VALUE>` | 클라이언트 앱 > 인증서 및 비밀(생성 시에만 표시) |
| `<SNOWFLAKE_ACCOUNT_HOST>` | Snowsight > 관리자 > 계정(`<accountid>.snowflakecomputing.com` 형태) |
| `<USER_UPN@yourtenant.onmicrosoft.com>` | 최종 사용자의 Entra UPN |

## 1단계: Snowflake에 샘플 데이터 만들기

에이전트가 실제로 쿼리할 무언가가 필요합니다. Snowsight를 열고, **프로젝트 > 워크스페이스 > 새 SQL 파일**로 이동해 실행합니다:

```sql
CREATE DATABASE IF NOT EXISTS PRODUCT_CUSTOMER_DB;
CREATE SCHEMA IF NOT EXISTS PRODUCT_CUSTOMER_DB.STORE_SCHEMA;

CREATE TABLE IF NOT EXISTS PRODUCT_CUSTOMER_DB.STORE_SCHEMA.PRODUCTS (
    PRODUCT_ID INT AUTOINCREMENT PRIMARY KEY,
    PRODUCT_NAME VARCHAR(255) NOT NULL,
    DESCRIPTION VARCHAR(1000),
    CATEGORY VARCHAR(100),
    PRICE DECIMAL(10,2) NOT NULL,
    STOCK_QUANTITY INT DEFAULT 0,
    CREATED_AT TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP(),
    UPDATED_AT TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE IF NOT EXISTS PRODUCT_CUSTOMER_DB.STORE_SCHEMA.CUSTOMERS (
    CUSTOMER_ID INT AUTOINCREMENT PRIMARY KEY,
    FIRST_NAME VARCHAR(100) NOT NULL,
    LAST_NAME VARCHAR(100) NOT NULL,
    EMAIL VARCHAR(255) UNIQUE NOT NULL,
    PHONE VARCHAR(20),
    ADDRESS VARCHAR(500),
    CITY VARCHAR(100),
    STATE VARCHAR(100),
    ZIP_CODE VARCHAR(20),
    CREATED_AT TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP(),
    UPDATED_AT TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

-- 각 테이블에 수십 개의 행을 삽입합니다.
```

Snowsight의 소소한 특이점: **실행** 버튼이 때로 커서 아래 구문만 실행합니다. 모든 구문이 실행되도록 전체 스크립트를 선택한 후 **Cmd/Ctrl+Enter**를 누르세요.

간단한 확인:

```sql
SELECT COUNT(*) AS PRODUCTS FROM PRODUCT_CUSTOMER_DB.STORE_SCHEMA.PRODUCTS;
SELECT COUNT(*) AS CUSTOMERS FROM PRODUCT_CUSTOMER_DB.STORE_SCHEMA.CUSTOMERS;
```

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/01-sample-data-result.png' | relative_url }}" alt="샘플 데이터 스크립트가 성공적으로 실행된 Snowsight 결과 창" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>두 개의 채워진 테이블이 Cortex Search를 켜기 전에 필요한 전부입니다.</figcaption>
</figure>

## 2단계: Cortex Search 서비스와 MCP 서버 만들기

Snowflake가 무거운 작업을 합니다. 검색 가능한 테이블마다 Cortex Search Service를 하나씩 만들고, 두 서비스를 LLM이 읽을 도구 사양을 가진 단일 MCP 서버로 래핑합니다.

```sql
CREATE OR REPLACE CORTEX SEARCH SERVICE PRODUCT_CUSTOMER_DB.STORE_SCHEMA.CUSTOMER_SEARCH
  ON customer_info
  ATTRIBUTES CITY, STATE
  WAREHOUSE = COMPUTE_WH
  TARGET_LAG = '1 hour'
AS (
  SELECT
    CUSTOMER_ID,
    FIRST_NAME || ' ' || LAST_NAME || ' - ' || EMAIL || ' - ' || CITY || ', ' || STATE AS customer_info,
    FIRST_NAME, LAST_NAME, EMAIL, CITY, STATE
  FROM PRODUCT_CUSTOMER_DB.STORE_SCHEMA.CUSTOMERS
);

CREATE OR REPLACE CORTEX SEARCH SERVICE PRODUCT_CUSTOMER_DB.STORE_SCHEMA.PRODUCT_SEARCH
  ON product_info
  ATTRIBUTES CATEGORY
  WAREHOUSE = COMPUTE_WH
  TARGET_LAG = '1 hour'
AS (
  SELECT
    PRODUCT_ID,
    PRODUCT_NAME || ' - ' || CATEGORY AS product_info,
    PRODUCT_NAME, CATEGORY, PRICE, STOCK_QUANTITY
  FROM PRODUCT_CUSTOMER_DB.STORE_SCHEMA.PRODUCTS
);

CREATE OR REPLACE MCP SERVER PRODUCT_CUSTOMER_DB.STORE_SCHEMA.MY_MCP_SERVER
FROM SPECIFICATION $$
  tools:
    - name: "customer_search"
      type: "CORTEX_SEARCH_SERVICE_QUERY"
      identifier: "PRODUCT_CUSTOMER_DB.STORE_SCHEMA.CUSTOMER_SEARCH"
      title: "Customer Search"
      description: "Search customers by name, email, city, or state."
    - name: "product_search"
      type: "CORTEX_SEARCH_SERVICE_QUERY"
      identifier: "PRODUCT_CUSTOMER_DB.STORE_SCHEMA.PRODUCT_SEARCH"
      title: "Product Search"
      description: "Search products by name or category."
$$;

DESCRIBE MCP SERVER PRODUCT_CUSTOMER_DB.STORE_SCHEMA.MY_MCP_SERVER;
```

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/02-describe-mcp-server.png' | relative_url }}" alt="번들된 도구 사양을 나열하는 DESCRIBE MCP SERVER 출력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>DESCRIBE 출력은 LLM과의 계약입니다. name과 description 필드가 에이전트 모델이 도구를 호출할지 결정할 때 보는 내용이므로, snake_case로 유지하고 설명을 정확하게 작성하세요.</figcaption>
</figure>

## 3단계: Snowflake 사용자를 Entra ID에 매핑하기

올바른 권한을 가진 역할과 `LOGIN_NAME`이 Entra UPN과 일치하는 Snowflake 사용자가 필요합니다. 나중에 설정하는 `EXTERNAL_OAUTH` 통합이 들어오는 `upn` 클레임을 해당 `LOGIN_NAME`에 매핑하므로 두 값이 정확히 일치해야 합니다(대소문자 무시).

```sql
CREATE ROLE IF NOT EXISTS SALESPROFESSIONAL;
GRANT USAGE ON DATABASE PRODUCT_CUSTOMER_DB TO ROLE SALESPROFESSIONAL;
GRANT USAGE ON SCHEMA PRODUCT_CUSTOMER_DB.STORE_SCHEMA TO ROLE SALESPROFESSIONAL;
GRANT USAGE ON CORTEX SEARCH SERVICE PRODUCT_CUSTOMER_DB.STORE_SCHEMA.CUSTOMER_SEARCH TO ROLE SALESPROFESSIONAL;
GRANT USAGE ON CORTEX SEARCH SERVICE PRODUCT_CUSTOMER_DB.STORE_SCHEMA.PRODUCT_SEARCH TO ROLE SALESPROFESSIONAL;
GRANT USAGE ON MCP SERVER PRODUCT_CUSTOMER_DB.STORE_SCHEMA.MY_MCP_SERVER TO ROLE SALESPROFESSIONAL;
GRANT USAGE ON WAREHOUSE COMPUTE_WH TO ROLE SALESPROFESSIONAL;
```

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/03-grant-usage-role.png' | relative_url }}" alt="역할과 USAGE 권한 부여가 적용된 것을 확인하는 Snowsight 결과 창" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>읽기 전용 에이전트 사용 사례를 위해 여섯 개의 GRANT USAGE 줄과 웨어하우스 권한 부여로 충분합니다.</figcaption>
</figure>

이제 위임 사용자:

```sql
CREATE USER IF NOT EXISTS SNOWSQL_DELEGATE_USER
  LOGIN_NAME = '<USER_UPN@yourtenant.onmicrosoft.com>'
  DISPLAY_NAME = 'SnowSQL Delegated User'
  COMMENT = 'Delegate user for SnowSQL/MCP OAuth-based connectivity';

GRANT ROLE SALESPROFESSIONAL TO USER SNOWSQL_DELEGATE_USER;

-- OAuth 스코프가 session:role-any일 때 선택 사항(any-role 모드는 아래 보조 역할로 역할을 해결)
ALTER USER SNOWSQL_DELEGATE_USER SET DEFAULT_ROLE       = SALESPROFESSIONAL;
ALTER USER SNOWSQL_DELEGATE_USER SET DEFAULT_WAREHOUSE  = COMPUTE_WH;

-- OAuth 스코프가 session:role-any일 때 필수
ALTER USER SNOWSQL_DELEGATE_USER SET DEFAULT_SECONDARY_ROLES = ('ALL');

SHOW GRANTS TO USER SNOWSQL_DELEGATE_USER;
SHOW GRANTS TO ROLE SALESPROFESSIONAL;
```

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/04-create-delegate-user.png' | relative_url }}" alt="Snowsight 워크시트에서 위임 사용자 생성과 역할 바인딩이 완료된 모습" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>단일 Snowsight 워크시트에서 위임 사용자를 만들고 역할을 바인딩합니다.</figcaption>
</figure>

마지막 `ALTER USER` 줄이 계속 빠뜨리던 것입니다. `session:role-any` 스코프에서 Snowflake는 세션 시작 시 보조 역할 해결을 통해 역할을 활성화하며, 이 해결은 `DEFAULT_SECONDARY_ROLES`가 `('ALL')`로 설정된 경우에만 작동합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/05-show-grants-user.png' | relative_url }}" alt="위임 사용자의 SALESPROFESSIONAL 역할을 나열하는 SHOW GRANTS TO USER 출력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>이 목록에 역할이 없으면 OAuth 핸드셰이크는 성공하지만 도구 호출은 "insufficient privileges"로 실패합니다.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/06-show-grants-role.png' | relative_url }}" alt="SALESPROFESSIONAL 역할의 모든 USAGE 권한을 나열하는 SHOW GRANTS TO ROLE 출력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>계속하기 전에 역할이 데이터베이스, 스키마, Cortex Search 서비스, 웨어하우스를 볼 수 있는지 확인하세요.</figcaption>
</figure>

## 4단계: 두 개의 Entra 앱 등록 만들기

Entra 테넌트에서 **두 개**의 앱 등록이 필요합니다. Snowflake의 공식 가이드를 끝까지 따르세요:

- [Snowflake 문서: Microsoft Entra ID에서 OAuth 클라이언트 만들기](https://docs.snowflake.com/en/user-guide/oauth-azure#create-an-oauth-client-in-microsoft-entra-id)
- [Snowflake 문서: Snowflake를 위한 Azure AD 정보 수집](https://docs.snowflake.com/en/user-guide/oauth-azure#collect-azure-ad-information-for-snowflake)

### 리소스 앱: `Snowflake OAuth Resource`

- **API 노출** 아래에서 애플리케이션 ID URI를 `api://<RESOURCE_APP_CLIENT_ID>`로 설정합니다.
- `session:role-any`라는 위임 스코프를 추가합니다. 에이전트를 특정 Snowflake 역할에 고정하려면 대신 더 좁은 스코프를 사용하세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/09-resource-app-expose-api.png' | relative_url }}" alt="애플리케이션 ID URI와 session:role-any 스코프를 보여주는 리소스 앱 등록 'API 노출' 블레이드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>이것이 액세스 토큰이 전달할 대상(audience)입니다. Snowflake 통합의 EXTERNAL_OAUTH_AUDIENCE_LIST와 정확히 일치해야 합니다.</figcaption>
</figure>

### 클라이언트 앱: `Snowflake OAuth Client`

- **인증서 및 비밀** 아래에서 클라이언트 비밀을 만들고 즉시 값을 복사하세요. 한 번만 표시됩니다.
- **API 권한** 아래에서 권한 추가를 클릭하고, **내 API**를 선택한 후 리소스 앱을 선택하고 `session:role-any` 위임 권한을 선택합니다.
- **`<TENANT_NAME>`에 대한 관리자 동의 부여**를 클릭하세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/07-client-app-overview.png' | relative_url }}" alt="애플리케이션(클라이언트) ID와 테넌트를 보여주는 클라이언트 앱 등록 개요 블레이드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>이 개요 탭에서 애플리케이션(클라이언트) ID와 디렉터리(테넌트) ID를 복사하세요. 6단계의 Copilot Studio MCP 폼에 둘 다 붙여넣게 됩니다.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/08-client-app-api-permissions.png' | relative_url }}" alt="관리자 동의가 부여된 session:role-any 위임 권한을 보여주는 클라이언트 앱 API 권한 블레이드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>관리자 동의 없이는 첫 번째 사용자 로그인이 일반적인 "관리자 승인 필요" 페이지로 실패합니다.</figcaption>
</figure>

리디렉션 URI는 7단계에서 Copilot Studio가 생성한 후 같은 클라이언트 앱에 추가합니다. 지금은 건너뛰세요.

## 5단계: Snowflake에서 Entra 발급 토큰 신뢰하도록 설정

`EXTERNAL_OAUTH` 보안 통합은 Snowflake에게 액세스 토큰을 유효성 검사하는 방법과 `upn` 클레임을 Snowflake 사용자에게 매핑하는 방법을 알려줍니다.

```sql
USE ROLE ACCOUNTADMIN;

CREATE OR REPLACE SECURITY INTEGRATION external_oauth_azure_1
  TYPE = EXTERNAL_OAUTH
  ENABLED = TRUE
  EXTERNAL_OAUTH_TYPE = AZURE
  EXTERNAL_OAUTH_ISSUER = 'https://sts.windows.net/<TENANT_ID>/'
  EXTERNAL_OAUTH_JWS_KEYS_URL = 'https://login.microsoftonline.com/<TENANT_ID>/discovery/v2.0/keys'
  EXTERNAL_OAUTH_AUDIENCE_LIST = ('api://<RESOURCE_APP_CLIENT_ID>')
  EXTERNAL_OAUTH_TOKEN_USER_MAPPING_CLAIM = 'upn'
  EXTERNAL_OAUTH_SNOWFLAKE_USER_MAPPING_ATTRIBUTE = 'LOGIN_NAME'
  EXTERNAL_OAUTH_ANY_ROLE_MODE = ENABLE;     -- 스코프가 session:role-any일 때 필수

DESCRIBE INTEGRATION external_oauth_azure_1;
```

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/10-describe-integration.png' | relative_url }}" alt="ENABLED = true, Azure 발급자 URL, JWKS URL, 대상 목록이 구성된 DESCRIBE INTEGRATION 출력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>계속하기 전에 ENABLED = true와 일치하는 대상만 확인하면 됩니다.</figcaption>
</figure>

## 6단계: Copilot Studio에서 에이전트와 MCP 도구 만들기

1. **Copilot Studio**로 이동한 후 **에이전트 > 에이전트 만들기**를 클릭합니다. *Snowflake Sales Helper* 같은 이름과 짧은 설명을 입력합니다.
2. 에이전트를 열고 **도구** 탭으로 이동한 후 **도구 추가 > MCP > 새 MCP 추가**를 클릭합니다.
3. MCP 폼을 작성합니다:
   - **이름**: *Snowflake MCP* 같은 이름.
   - **설명**: 짧고 최종 사용자 친화적인 문장.
   - **서버 URL**:
     ```
     https://<SNOWFLAKE_ACCOUNT_HOST>/api/v2/databases/PRODUCT_CUSTOMER_DB/schemas/STORE_SCHEMA/mcp-servers/MY_MCP_SERVER
     ```
     여기서 `<SNOWFLAKE_ACCOUNT_HOST>`는 `<accountid>.snowflakecomputing.com` 형태입니다. 후행 슬래시 없음, `/sse` 없음, `/mcp` 없음.
   - **인증**: OAuth 2.0.
   - **동적 검색(Dynamic Discovery)**에서 **수동(Manual)**으로 전환. Snowflake는 OAuth 동적 클라이언트 등록을 지원하지 않아 동적 검색은 조용히 실패합니다.

4. 수동 OAuth 필드를 작성합니다:

   | 필드 | 값 |
   | --- | --- |
   | 클라이언트 ID | `<CLIENT_APP_CLIENT_ID>` |
   | 클라이언트 비밀 | `<CLIENT_SECRET_VALUE>` |
   | 권한 부여 URL | `https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/authorize` |
   | 토큰 URL | `https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token` |
   | 새로 고침 URL | `https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token` |
   | 스코프 | `api://<RESOURCE_APP_CLIENT_ID>/session:role-any offline_access` |

5. **만들기**를 클릭합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/11-cs-create-mcp-form.png' | relative_url }}" alt="필드가 채워지고 OAuth 2.0이 선택된 Copilot Studio '새 MCP 추가' 폼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>서버 URL 필드가 대부분의 사람이 실수하는 부분입니다. 위 표의 정확한 패턴을 사용하세요. `/api/v2/databases/.../mcp-servers/<MCP_SERVER_NAME>` 접미사를 포함해서요.</figcaption>
</figure>

한 가지 특이점: 서버 URL 필드가 URL이 올바른데도 *"계속하려면 완전한 서버 경로를 입력하세요"*를 계속 표시하고 **만들기** 버튼이 비활성화된 것처럼 보일 수 있습니다. 보통 실제로는 활성화되어 있습니다. 일반 클릭에 반응하지 않으면 필드의 오래된 유효성 검사로 인해 포커스를 잃은 것입니다. 필드 외부를 클릭한 후 다시 **만들기**를 클릭하세요.

**만들기**를 클릭하면 Copilot Studio가 Power Platform 환경에서 MCP 도구와 동일한 이름의 커스텀 커넥터를 자동 생성합니다. 생성된 리디렉션 URL을 찾으려면:

1. [Power Apps](https://make.powerapps.com)를 열고 우측 상단의 환경 전환기를 사용해 Copilot Studio에서 사용한 **동일한 환경**으로 전환합니다.
2. 왼쪽 탐색에서 **더 보기 > 커스텀 커넥터**로 이동합니다.
3. 목록에서 Snowflake MCP 커넥터를 찾아 열기(연필/편집 아이콘)를 클릭합니다.
4. **2. 보안** 탭으로 이동합니다.
5. OAuth 2.0 섹션 맨 아래로 스크롤해 **리디렉션 URL**을 복사합니다. 다음과 같은 형태입니다:

```
https://global.consent.azure-apim.net/redirect/<connector-slug>
```

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/12a-powerapps-custom-connectors.png' | relative_url }}" alt="자동 생성된 Snowflake MCP 커넥터를 보여주는 Power Apps 커스텀 커넥터 목록" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>커넥터는 에이전트와 동일한 환경의 Power Apps 더 보기 > 커스텀 커넥터에 나타납니다.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/12b-connector-security-redirect-url.png' | relative_url }}" alt="보안 탭 하단에 OAuth 2.0 리디렉션 URL이 표시된 커스텀 커넥터" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>리디렉션 URL 필드는 보안 탭 맨 아래에 있습니다. 복사하세요 — 다음 단계에서 클라이언트 앱 인증 블레이드에 붙여넣게 됩니다.</figcaption>
</figure>

## 7단계: Azure에서 OAuth 루프 닫기

리디렉션 URL은 Power Platform이 커스텀 커넥터를 생성한 후에야 존재하므로, 이전에 Azure 앱에 추가할 수 없었습니다. 없이 연결을 시도하면 OAuth 왕복이 `AADSTS50011: redirect URI mismatch`로 실패합니다.

**클라이언트 앱** 등록을 열고, **인증**으로 이동한 후 **플랫폼 추가 > 웹**을 선택하고, 이전 단계의 리디렉션 URL을 붙여넣은 후 **구성**을 클릭합니다. *"<클라이언트 앱 이름>이 성공적으로 업데이트되었습니다"*가 표시되어야 합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/16-azure-add-redirect-uri.png' | relative_url }}" alt="웹 플랫폼 아래에 Power Platform 리디렉션 URI가 추가된 클라이언트 앱 등록 인증 블레이드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>리디렉션 URI는 SPA나 공용 클라이언트가 아닌 웹 플랫폼 아래에 추가하세요. 다른 곳에 추가하면 토큰 교환 시 조용히 실패합니다.</figcaption>
</figure>

## 8단계: 연결, 도구 발견, 그리고 (별도로) 다시 연결

메이커 연결과 테스트 창 연결은 다른 것입니다. 둘 다 성공해야 합니다.

### 메이커 연결

에이전트의 MCP 도구 세부 정보로 돌아가서:

1. **연결되지 않음** 아래에서 **새 연결 만들기**를 선택한 후 **만들기**를 클릭합니다.
2. 동일한 테넌트에 이미 로그인되어 있으면 OAuth 팝업이 나타나지 않을 수 있습니다. 정상입니다. 연결 레이블이 UPN으로 바뀌는 것을 확인하세요.
3. **추가 및 구성**을 클릭합니다.
4. Copilot Studio가 MCP 서버를 호출해 도구(`customer_search`, `product_search`)를 자동 발견합니다. YAML 사양의 설명과 함께 도구 블레이드에 나타납니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/18-cs-add-tool-filter-mcp.png' | relative_url }}" alt="MCP 필터가 적용된 Copilot Studio '도구 추가' 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>도구 선택기를 모델 컨텍스트 프로토콜(Model Context Protocol)로 필터링해 새로 만든 MCP 도구를 빠르게 찾으세요.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/19-cs-add-tool-picker.png' | relative_url }}" alt="발견된 customer_search와 product_search 도구를 보여주는 Copilot Studio 도구 선택기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>여기서 도구 목록이 비어 있으면 발견이 실패한 것입니다. 계속하기 전에 서버 URL과 연결 상태를 다시 확인하세요.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/20-cs-tools-in-agent.png' | relative_url }}" alt="Snowflake MCP 도구가 나열된 Copilot Studio 에이전트 도구 블레이드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>여기에 도구가 나타나면 Snowflake 연결이 올바르게 설정된 것입니다.</figcaption>
</figure>

### 최종 사용자(테스트 창) 연결

Copilot Studio 테스트 창은 메이커가 아닌 최종 사용자로 실행됩니다. MCP 도구를 트리거하는 무언가를 처음 물어보면 다음이 표시됩니다:

> *먼저 연결되어야 합니다. **연결 관리자 열기**를 클릭해 자격 증명을 확인하세요.*

1. **연결 관리자 열기**를 클릭합니다. 브라우저의 로그인된 사용자가 에이전트 테넌트와 다르면 잠시 *"테넌트 ID 불일치"*가 표시될 수 있습니다.
2. 잘못된 계정에서 로그아웃한 후, Snowflake `LOGIN_NAME`과 일치하는 UPN을 가진 사용자로 다시 로그인합니다.
3. MCP 항목 옆의 **연결**을 클릭합니다. 동일 테넌트 SSO의 경우 보통 조용히 완료됩니다.
4. 테스트 창으로 돌아가 이전 메시지에서 **다시 시도**를 클릭합니다.

## 9단계: 에이전트 테스트

도구에 깔끔하게 매핑되는 프롬프트를 몇 가지 시도해보세요:

- *"캘리포니아 고객 찾아줘"*는 `query=California`로 `customer_search`를 호출해야 합니다.
- *"전자제품은 어떤 게 있어?"*는 `query=electronics`로 `product_search`를 호출해야 합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/21-cs-agent-test.png' | relative_url }}" alt="Snowflake MCP 도구를 호출해 에이전트가 답변하는 Copilot Studio 테스트 창" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>도구 호출을 보여주는 활동 맵과 함께 근거 있는 답변이 표시되어야 합니다. 도구 활동 없이 평범한 LLM 답변은 에이전트가 실제로 Snowflake를 사용하지 않은 것입니다.</figcaption>
</figure>

에이전트가 도구를 호출하는 대신 일반 지식에서 답변한다면, **개요** 탭을 열어 다음과 같은 지침을 추가하세요:

> 사용자가 고객이나 제품에 대해 물으면 Snowflake MCP 도구를 사용하세요. 일반 지식으로 답변하지 마세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/22-cs-agent-instructions.png' | relative_url }}" alt="Snowflake MCP 도구를 사용하도록 에이전트에게 지시하는 지침이 표시된 Copilot Studio 에이전트 개요 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>지침에 한 줄의 명시적인 문장으로 보통 모델이 일반 지식에서 답변하는 것을 막기에 충분합니다.</figcaption>
</figure>

더 엄격하게 하려면 에이전트의 생성형 설정에서 **웹 검색**과 **일반 지식 사용**을 비활성화할 수도 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/23-cs-agent-knowledge-settings.png' | relative_url }}" alt="웹 검색과 일반 지식 사용이 꺼진 Copilot Studio 에이전트 생성형 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>이중 안전장치: 이것들을 끄면 에이전트가 모든 답변을 도구에 기반하도록 강제합니다.</figcaption>
</figure>

### Snowflake에서 실제로 실행됐는지 확인

작동 여부를 증명하기 위해 두 가지 쿼리만 실행한다면 다음입니다:

```sql
-- OAuth 핸드셰이크가 성공했는가?
SELECT EVENT_TIMESTAMP, USER_NAME, IS_SUCCESS, ERROR_MESSAGE
FROM SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY
WHERE USER_NAME = 'SNOWSQL_DELEGATE_USER'
  AND EVENT_TIMESTAMP > DATEADD(hour, -1, CURRENT_TIMESTAMP())
ORDER BY EVENT_TIMESTAMP DESC;

-- SQL이 실제로 위임 사용자로 실행됐는가?
SELECT QUERY_ID, USER_NAME, ROLE_NAME, EXECUTION_STATUS, ERROR_MESSAGE,
       LEFT(QUERY_TEXT, 200) AS QT, START_TIME
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE USER_NAME = 'SNOWSQL_DELEGATE_USER'
  AND START_TIME > DATEADD(hour, -1, CURRENT_TIMESTAMP())
ORDER BY START_TIME DESC;
```

`ACCOUNT_USAGE` 뷰는 약 45분의 지연이 있습니다. 실시간 검사를 위해서는 `ACCOUNTADMIN` 워크시트에서 `INFORMATION_SCHEMA.QUERY_HISTORY`와 `INFORMATION_SCHEMA.LOGIN_HISTORY`를 사용하세요.

## 트러블슈팅

### 항상 활동 탭부터

가장 유용한 진단은 에이전트의 **활동** 탭입니다. 테스트 대화를 클릭한 후 도구 노드(예: `customer_search`)를 클릭합니다. 오른쪽 창에 다음이 표시됩니다:

- **입력**: LLM이 도구로 보낸 것(예: `query: California`).
- **출력**: `isError: true`와 MCP 서버의 실제 오류 문자열.
- **추론**: LLM의 도구 선택 근거.

열 번 중 아홉 번은 실제 오류 문자열이 정확히 어떤 단계가 잘못됐는지 알려줍니다.

### 일반적인 오류

| 증상 | 가능한 원인 | 해결 방법 |
| --- | --- | --- |
| `MCP Server tool error: No tool result received calling Cortex Agent` | 이 Snowflake 계정에서 Cortex Agent 비활성화(트라이얼에서 흔함). | Cortex 활성화 또는 유료 계정 사용. 전제 조건 섹션 참고. |
| 연결 중 `AADSTS50011: redirect URI mismatch` | 커넥터 리디렉션 URI가 Azure 클라이언트 앱에 추가되지 않음. | 7단계. |
| 커스텀 커넥터에서 **테스트 작업 실행** 시 `Schema validation` 경고(`Property "" type mismatch, Expected: "object", Actual: "string"`)와 함께 `Operation failed (405)` | MCP 커넥터에서 예상되는 동작. 커넥터 테스트 창이 MCP 엔드포인트가 405로 거부하는 평범한 GET을 전송하며, 응답 본문이 커넥터 스키마가 예상하는 JSON 객체가 아닙니다. 에이전트의 실제 호출에는 영향 없음. | 무시하고 대신 Copilot Studio 테스트 창에서 엔드투엔드로 유효성 검사. |
| Snowflake의 `Insufficient privileges` | 역할 또는 권한 누락, 또는 기본 역할이 부여된 역할이 아닌 경우. | 3단계의 `GRANT` 구문을 다시 실행하고 `DEFAULT_ROLE`과 `DEFAULT_SECONDARY_ROLES = ('ALL')` 모두 확인. |
| OAuth 팝업이 나타나지 않고 상태가 "연결되지 않음"으로 유지 | 브라우저가 팝업을 차단하거나 이미 조용히 로그인됨. | 버튼 레이블 확인. 동일 테넌트 SSO는 보통 팝업을 완전히 건너뜁니다. 새로 고침 후 상태 확인. |
| **추가 및 구성** 후 MCP 도구 목록이 채워지지 않음 | 서버 URL 잘못됨, OAuth 스코프 잘못됨, 또는 계정에 Cortex Agent 없음. | 6단계의 URL 패턴 재확인 후 `DESCRIBE INTEGRATION external_oauth_azure_1`. |
| `LOGIN_HISTORY`는 성공을 보여주지만 `QUERY_HISTORY`에 위임 사용자 행 없음 | SQL이 실행되기 전에 Cortex Agent 내부에서 도구 호출이 실패. | 첫 번째 행과 같은 근본 원인. |

### 커스텀 커넥터 재확인

에이전트가 도구조차 발견하지 못할 때 커넥터 자체로 내려가보세요.

1. **Power Apps**를 열고 올바른 환경으로 전환한 후 **더 보기 > 커스텀 커넥터**로 이동합니다.
2. Snowflake MCP 커넥터를 열고 **테스트** 탭으로 이동하고, 연결을 선택한 후 작업을 실행합니다.
3. IP 관련 오류가 발생하면 Snowflake의 네트워크 정책이 Power Platform 지역의 이그레스 IP를 허용하는지 확인합니다.
4. 역할 또는 ACL 오류가 발생하면 스코프가 `session:role-any`이고 `EXTERNAL_OAUTH_ANY_ROLE_MODE = ENABLE`인지 확인합니다.

MCP 지원 커넥터에서 **테스트 작업 실행**을 처음 누르면 `Schema validation` 경고와 함께 빨간색 `Operation failed (405)` 배너를 예상하세요. 정상입니다. 테스트 창이 MCP 엔드포인트가 거부하는 평범한 GET을 전송하므로 응답 본문이 커넥터의 예상 스키마와 일치하지 않습니다. OAuth 핸드셰이크가 완료되고 연결이 연결됨으로 표시되는 한, 커넥터는 올바르게 연결된 것입니다. 에이전트 UI에서가 아닌 Copilot Studio 테스트 창에서 실제 도구 호출을 유효성 검사하세요.

아래 스크린샷은 기본 커스텀 커넥터 페이지를 보여줍니다. 에이전트 UI 외부에서 OAuth 왕복을 검사하거나 재테스트할 때 유용합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/13-custom-connector-general.png' | relative_url }}" alt="Snowflake 계정을 가리키는 커넥터 스키마와 호스트를 보여주는 Power Apps 커스텀 커넥터 일반 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>자동 생성된 커넥터는 HTTPS와 Snowflake 계정 호스트를 사용합니다. 스키마는 그대로 두고 호스트만 확인하세요.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/14-custom-connector-host.png' | relative_url }}" alt="Snowflake 계정 호스트가 채워진 Power Apps 커스텀 커넥터 일반 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>호스트가 `&lt;orgname&gt;-&lt;accountname&gt;.snowflakecomputing.com`과 정확히 일치하는지 확인하세요 — 후행 경로 없음, 프로토콜 없음.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/15-custom-connector-security.png' | relative_url }}" alt="Azure AD로 OAuth 2.0이 구성되고 클라이언트 ID, 비밀, 리소스 URI가 표시된 Power Apps 커스텀 커넥터 보안 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>리소스 URL은 api://&lt;RESOURCE_APP_CLIENT_ID&gt;와 일치해야 하며 스코프는 session:role-any여야 합니다. 여기서 잘못된 대상(audience)이 토큰 거부의 가장 흔한 원인입니다.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/17-custom-connector-test.png' | relative_url }}" alt="성공적인 서버 호출을 보여주는 Power Apps 커스텀 커넥터 테스트 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>녹색 "서버 호출" 응답은 OAuth 핸드셰이크가 완료되고 베어러 토큰이 MCP 엔드포인트에 도달했음을 의미합니다.</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/snowflake-mcp-copilot-studio/24-troubleshooting-test-section.png' | relative_url }}" alt="예상되는 스키마 유효성 검사 오류 응답을 보여주는 Power Apps 커스텀 커넥터 테스트 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>405 + 스키마 유효성 검사 경고는 MCP 지원 커넥터에서 예상됩니다. 연결 자체가 연결됨으로 표시되는 한 무시하세요.</figcaption>
</figure>

### OAuth 왕복 재확인

모든 것이 올바르게 보이지만 토큰이 계속 거부된다면, Power Platform이 Snowflake에 전송하는 JWT를 디코딩하고(네트워크 추적 또는 커넥터 진단) 다음을 확인하세요:

- `aud`가 `api://<RESOURCE_APP_CLIENT_ID>`와 같은지.
- `iss`가 `https://sts.windows.net/<TENANT_ID>/`와 같은지.
- `upn`이 `SNOWSQL_DELEGATE_USER.LOGIN_NAME`과 일치하는지.

이 셋 중 하나라도 통합과 다르면 Snowflake가 일반적인 오류로 토큰을 거부합니다.

## 교훈

진행하면서 놀랐던 몇 가지 사항:

- Snowflake 관리형 MCP는 단순한 패스스루가 아닙니다. 모든 호출은 Cortex Agent를 통해 가므로, 계정 수준의 Cortex 제한은 에이전트를 조용히 죽입니다.
- Snowflake의 경우 항상 Copilot Studio에서 Manual OAuth를 선택하세요. 동적 검색은 작동해야 할 것처럼 보이며 실패했다고 절대 알려주지 않습니다.
- 리디렉션 URI는 설계상 닭이 먼저냐 달걀이 먼저냐 문제입니다. Azure를 두 번 통과할 계획을 세우세요: 리소스 및 클라이언트 앱을 위한 한 번, 커넥터가 존재한 후 짧은 두 번째 통과.
- 메이커 연결과 최종 사용자 연결은 별도로 추적됩니다. 테스트 창 실패는 거의 항상 두 번째 연결이 설정되지 않은 것으로 추적됩니다.
- `DEFAULT_SECONDARY_ROLES = ('ALL')`은 `session:role-any`가 실제로 작동하는지 결정하는 단 한 줄입니다. 체크리스트에 고정할 가치가 있습니다.

## 마무리

이것이 갖춰지면 자연어를 받아 올바른 Cortex Search 도구를 선택하고, 로그인한 사용자로 실행되며, 하나의 Snowflake 역할에 부여한 테이블만 볼 수 있는 에이전트가 생깁니다. 여기서부터 발견이 다음 연결 시 자동으로 도구를 선택하므로 Copilot Studio나 Entra에서 아무것도 건드리지 않고 동일한 MCP 서버에 더 많은 도구(Cortex Analyst, 일반 저장 프로시저, `SYSTEM_EXECUTE_SQL`)를 추가하기 쉽습니다.

같은 서버에 다른 MCP 도구(Cortex Analyst, 일반 저장 프로시저, `SYSTEM_EXECUTE_SQL`)를 연결하고 있나요? 어떤 조합을 사용해봤고 무엇이 놀라웠는지 댓글로 알려주세요.
