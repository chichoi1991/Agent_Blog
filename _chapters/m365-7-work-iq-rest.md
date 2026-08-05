---
layout: chapter
date: 2026-08-05
title: "Lab WIQ04 — Work IQ REST 프로토콜"
short_title: "WIQ04 · REST 프로토콜"
description: "OAuth 2.0 인증으로 Work IQ REST API를 소비합니다. 멀티턴 대화 생성, 엔터프라이즈 검색·웹 그라운딩 제어, SharePoint 파일 컨텍스트를 PowerShell·Bash 예제로 다룹니다."
order: 7
category: m365
tags: ["Work IQ", "REST API", "OAuth 2.0", "PowerShell", "curl"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — A2A(에이전트↔에이전트)나 MCP(에이전트↔도구)와 달리, REST API는 **사람/디바이스 → 에이전트** 통합용입니다. OAuth 2.0 인증 코드 흐름으로 토큰을 받아 대화를 만들고, **엔터프라이즈 검색 + 웹 그라운딩**을 메시지 단위로 제어합니다.

**레벨** 300 · **소요 시간** 약 60분 · **배지** WorkIQ-Expert
</div>

> 이 글은 Microsoft 공식 [Copilot Developer Camp](https://microsoft.github.io/copilot-camp/pages/work-iq/04-work-iq-rest/)의 **Lab WIQ04** 를 한국어로 옮긴 것입니다. [Lab WIQ01]({{ '/chapters/m365-4-work-iq-setup-and-cli/' | relative_url }})의 Entra ID 앱 등록이 선행되어야 합니다.

## 시나리오

여러분은 Microsoft 365 Copilot 기능을 프로그래밍 방식으로 통합해야 하는 커스텀 애플리케이션을 만들고 있습니다. A2A나 MCP 대신 **REST API 직접 접근**으로 멀티턴 대화를 처리하면서 엔터프라이즈 검색과 웹 검색 그라운딩을 존중해야 합니다. WIQ01의 Entra ID 애플리케이션으로 OAuth 2.0 인증을 설정하고, PowerShell(Windows)과 Bash + curl(macOS/Linux)로 요청을 구성합니다. HTTP 수준에서 Work IQ가 어떻게 동작하는지 학습하기 위한 저수준 시뮬레이션입니다.

## 랩 목표

- Work IQ REST API의 기능과 제약 이해
- Entra ID에서 OAuth 2.0 토큰 획득 구성
- 프로그래밍 방식으로 멀티턴 대화 생성
- 그라운딩 전략(엔터프라이즈 전용 / 웹 포함 / 커스텀 컨텍스트)별 메시지 전송
- PowerShell과 Bash/curl 양쪽으로 Work IQ 상호작용
- 메시지 단위로 웹 검색 그라운딩 토글

---

## 실습 1: Work IQ REST API 이해하기

### 1단계: REST API 기본

**Work IQ REST API**는 커스텀 애플리케이션이 보안·규정 준수 경계를 유지하면서 Microsoft 365 Copilot과 멀티턴 대화를 할 수 있게 합니다. 에이전트 간 통신인 A2A와 달리, REST API는 **사람/디바이스 → 에이전트** 통합을 위해 설계되었습니다.

**핵심 기능**

| 기능 | 설명 |
|------|------|
| **엔터프라이즈 검색 그라운딩** | 답변이 Microsoft 365 데이터(메일·파일·회의·Teams)에 근거함 |
| **웹 검색 그라운딩** | 공개 웹 검색 결과를 선택적으로 통합 |
| **멀티턴 대화** | 여러 메시지에 걸쳐 컨텍스트 유지 |
| **권한 트리밍** | Microsoft 365 사용자 권한을 자동 존중 |
| **규정 준수 인지** | 데이터 분류와 규정 준수 설정을 보존 |

**REST API 엔드포인트**

- **Production**: `https://workiq.svc.cloud.microsoft/rest/conversations`
- **Beta**: `https://workiq.svc.cloud.microsoft/rest/beta/conversations` (프로덕션 비권장)

**핵심 오퍼레이션**

| 작업 | 엔드포인트 |
|------|-----------|
| 대화 생성 | `POST /conversations` |
| 채팅 (동기) | `POST /conversations/{id}/chat` |
| 채팅 (스트리밍) | `POST /conversations/{id}/chatoverstream` |

### 2단계: OAuth 2.0 인증 이해

Work IQ REST API는 **OAuth 2.0 위임 인증**을 사용합니다.

- 앱이 로그인한 사용자를 대신해 **액세스 토큰**을 획득합니다
- 요청은 앱이 아니라 **사용자의 보안 컨텍스트**에서 실행됩니다
- 토큰에는 스코프 `api://workiq.svc.cloud.microsoft/WorkIQAgent.Ask`가 포함되어야 합니다
- 토큰은 만료되며(보통 1시간) 갱신이 필요합니다

**토큰 획득 흐름**

1. Entra ID에 애플리케이션 등록 (WIQ01 실습 4에서 완료)
2. 디바이스 코드·인증 코드·클라이언트 자격 증명 흐름으로 리프레시 토큰 획득
3. 리프레시 토큰을 액세스 토큰으로 교환
4. `Authorization: Bearer <access_token>` 헤더에 액세스 토큰 포함

**WIQ01에서 준비되어 있어야 할 값** — Tenant ID, Client ID, Client Secret(또는 인증서), 스코프 `api://workiq.svc.cloud.microsoft/WorkIQAgent.Ask`

### 3단계: 그라운딩 전략 이해

REST API는 메시지 단위로 제어 가능한 두 가지 그라운딩 모드를 지원합니다.

**엔터프라이즈 검색 그라운딩** (기본 활성)

- 사용자가 접근 가능한 Microsoft 365 데이터를 검색
- 보안 트리밍과 권한을 준수
- 조직 데이터에서 가장 최신 결과 제공
- 모든 메시지에 자동 적용

**웹 검색 그라운딩** (기본 활성, 토글 가능)

- 공개 웹 검색 결과로 엔터프라이즈 데이터를 보완
- **메시지 단위**로 끌 수 있음
- 웹 검색 끄기는 **단일 턴 동작**이므로 메시지마다 다시 지정해야 함

**추가 컨텍스트 지원**

- OneDrive·SharePoint 파일을 추가 컨텍스트로 제공 가능
- 파일은 절대 URL 또는 SharePoint 항목 ID로 전달
- Copilot이 메시지를 처리할 때 파일 콘텐츠를 포함

### 4단계: 제약 사항 이해

<div class="info-box warning" markdown="1">

**REST API 제약**

- **액션 생성 불가** — 파일 생성, 메일 발송, 회의 예약을 할 수 없음
- **텍스트 전용 응답** — 그래픽·차트·코드 아티팩트 없음
- **장시간 작업 불가** — 게이트웨이 제한을 초과하면 타임아웃 발생
- **도구 없음** — 코드 인터프리터·그래픽 도구 사용 불가
- **시맨틱 인덱스 제한** — Microsoft 365 Copilot 시맨틱 인덱스 제약을 따름
- **AI 생성 콘텐츠** — 응답은 AI가 생성하므로 사용 전 정확성 검증 필요
</div>

---

## 실습 2: OAuth 2.0 설정과 대화 생성·관리

### 1단계: 액세스 토큰 획득

OAuth 2.0 **인증 코드 흐름(authorization code flow)** 으로 위임 액세스 토큰을 얻습니다.

먼저 다음 URL을 브라우저에서 열고(자리 표시자 교체), 로그인한 뒤 리디렉션 URL의 쿼리스트링에서 `code` 값을 복사합니다.

```text
https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/authorize?
  client_id={CLIENT_ID}
  &response_type=code
  &redirect_uri=https%3A%2F%2Fmicrosoft.github.io%2Fcopilot-camp%2F
  &scope=api%3A%2F%2Fworkiq.svc.cloud.microsoft%2FWorkIQAgent.Ask+offline_access
  &response_mode=query
```

그런 다음 인증 코드를 액세스 토큰으로 교환합니다.

**PowerShell (Windows)**

```powershell
# 실행 전 자리 표시자를 교체하세요
$TENANT_ID = "{your-tenant-id}"
$CLIENT_ID = "{your-client-id}"
$CLIENT_SECRET = "{your-client-secret}"
$AUTH_CODE = "{code-from-redirect-url}"

$body = @{
    grant_type    = "authorization_code"
    client_id     = $CLIENT_ID
    client_secret = $CLIENT_SECRET
    code          = $AUTH_CODE
    redirect_uri  = "https://microsoft.github.io/copilot-camp/"
    scope         = "api://workiq.svc.cloud.microsoft/WorkIQAgent.Ask offline_access"
}

$response = Invoke-RestMethod `
    -Method Post `
    -Uri "https://login.microsoftonline.com/$TENANT_ID/oauth2/v2.0/token" `
    -ContentType "application/x-www-form-urlencoded" `
    -Body $body

$ACCESS_TOKEN = $response.access_token

Write-Host "Access token stored in `$ACCESS_TOKEN"
```

**Bash (macOS / Linux)**

```bash
# 실행 전 자리 표시자를 교체하세요
TENANT_ID="{your-tenant-id}"
CLIENT_ID="{your-client-id}"
CLIENT_SECRET="{your-client-secret}"
AUTH_CODE="{code-from-redirect-url}"

RESPONSE=$(curl -s -X POST \
  "https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "client_id=${CLIENT_ID}" \
  -d "client_secret=${CLIENT_SECRET}" \
  -d "code=${AUTH_CODE}" \
  -d "redirect_uri=https://microsoft.github.io/copilot-camp/" \
  -d "scope=api://workiq.svc.cloud.microsoft/WorkIQAgent.Ask+offline_access")

ACCESS_TOKEN=$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

echo "Access token stored in \$ACCESS_TOKEN"
```

이제 `ACCESS_TOKEN` 변수를 셸 세션에서 사용할 수 있으며, 이후 REST 호출에서 재사용합니다.

### 2단계: 새 대화 만들기

유효한 액세스 토큰이 있으면 Work IQ와 멀티턴 대화를 시작할 수 있습니다. 먼저 대화 세션을 생성합니다.

**PowerShell (Windows)**

```powershell
# 대화 생성
$conversationUrl = "https://workiq.svc.cloud.microsoft/rest/conversations"
$headers = @{
    "Authorization" = "Bearer $ACCESS_TOKEN"
    "Content-Type"  = "application/json"
}

$response = Invoke-RestMethod -Uri $conversationUrl -Method Post -Headers $headers -Body "{}"

# 대화 정보 출력
$conversationId = $response.id
Write-Host "Conversation created successfully!"
Write-Host "Conversation ID: $conversationId"
Write-Host "Created: $($response.createdDateTime)"
Write-Host "Status: $($response.status)"
Write-Host "Turn Count: $($response.turnCount)"
```

**Bash (macOS / Linux)**

```bash
# 대화 생성
CONVERSATION_URL="https://workiq.svc.cloud.microsoft/rest/conversations"

CONVERSATION_RESPONSE=$(curl -s -X POST "$CONVERSATION_URL" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{}")

# 대화 ID 추출
CONVERSATION_ID=$(echo "$CONVERSATION_RESPONSE" | jq -r '.id')
CREATED_TIME=$(echo "$CONVERSATION_RESPONSE" | jq -r '.createdDateTime')
STATUS=$(echo "$CONVERSATION_RESPONSE" | jq -r '.status')
TURN_COUNT=$(echo "$CONVERSATION_RESPONSE" | jq -r '.turnCount')

echo "Conversation created successfully!"
echo "Conversation ID: $CONVERSATION_ID"
echo "Created: $CREATED_TIME"
echo "Status: $STATUS"
echo "Turn Count: $TURN_COUNT"
```

**기대 응답**

```json
{
  "id": "0d110e7e-2b7e-4270-a899-fd2af6fde333",
  "createdDateTime": "2025-09-30T15:28:46.1560062Z",
  "displayName": "",
  "status": "active",
  "turnCount": 0
}
```

### 3단계: 단순 채팅 메시지 보내기

이제 첫 메시지를 보냅니다. 이 메시지는 기본 동작에 따라 **엔터프라이즈 검색과 웹 검색 모두**에 근거합니다.

**PowerShell (Windows)**

```powershell
# 채팅 엔드포인트
$chatUrl = "https://workiq.svc.cloud.microsoft/rest/conversations/$conversationId/chat"
$headers = @{
    "Authorization" = "Bearer $ACCESS_TOKEN"
    "Content-Type"  = "application/json"
}

# 메시지 정의
$chatBody = @{
    message      = @{ text = "Who am I? What is my role in the company?" }
    locationHint = @{ timeZone = "America/New_York" }
} | ConvertTo-Json -Depth 3

# 메시지 전송
$chatResponse = Invoke-RestMethod -Uri $chatUrl -Method Post -Headers $headers -Body $chatBody

# 응답 출력
Write-Host "Message sent successfully!"
Write-Host "Response: $($chatResponse.messages[-1].text)"
Write-Host "Turn Count: $($chatResponse.turnCount)"
```

**Bash (macOS / Linux)**

```bash
# 채팅 엔드포인트
CHAT_URL="https://workiq.svc.cloud.microsoft/rest/conversations/${CONVERSATION_ID}/chat"

# 메시지 정의
CHAT_BODY='{
    "message": {
      "text": "Who am I? What is my role in the company?"
    },
    "locationHint": {
      "timeZone": "America/New_York"
    }
  }'

# 메시지 전송
CHAT_RESPONSE=$(curl -s -X POST "$CHAT_URL" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$CHAT_BODY")

# 응답 출력
LAST_MESSAGE=$(echo "$CHAT_RESPONSE" | jq -r '.messages[-1].text')
TURN_COUNT=$(echo "$CHAT_RESPONSE" | jq -r '.turnCount')

echo "Message sent successfully!"
echo "Response: $LAST_MESSAGE"
echo "Turn Count: $TURN_COUNT"
```

<div class="info-box tip" markdown="1">

**시간대(`locationHint`)** — 사용자의 IANA 시간대를 지정하면 "내일 회의", "이번 주" 같은 상대적 시간 표현을 Work IQ가 정확히 해석합니다. 한국이라면 `Asia/Seoul`을 사용하세요.
</div>

---

## 실습 3: 그라운딩 전략별 채팅

### 1단계: 엔터프라이즈 검색만 사용 (웹 그라운딩 비활성)

기본적으로 Work IQ는 엔터프라이즈와 웹 검색 그라운딩을 모두 사용합니다. 조직 데이터에만 집중하려면 웹 그라운딩을 끕니다.

**PowerShell (Windows)**

```powershell
$chatUrl = "https://workiq.svc.cloud.microsoft/rest/conversations/$conversationId/chat"
$headers = @{
    "Authorization" = "Bearer $ACCESS_TOKEN"
    "Content-Type"  = "application/json"
}

# 웹 그라운딩을 끈 메시지
$chatBody = @{
    message      = @{ text = "What are our company policies on remote work?" }
    locationHint = @{ timeZone = "America/New_York" }
    contextualResources = @{
        webContext = @{
            isWebEnabled = $false
        }
    }
} | ConvertTo-Json -Depth 3

$chatResponse = Invoke-RestMethod -Uri $chatUrl -Method Post -Headers $headers -Body $chatBody

Write-Host "Enterprise-only message sent!"
Write-Host "Response: $($chatResponse.messages[-1].text)"
```

**Bash (macOS / Linux)**

```bash
CHAT_URL="https://workiq.svc.cloud.microsoft/rest/conversations/${CONVERSATION_ID}/chat"

# 웹 그라운딩을 끈 메시지
CHAT_BODY='{
  "message": "What are our company policies on remote work?",
  "locationHint": "America/New_York",
  "contextualResources": {
    "webContext": {
        "isWebEnabled": false
    }
  }
}'

CHAT_RESPONSE=$(curl -s -X POST "$CHAT_URL" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$CHAT_BODY")

LAST_MESSAGE=$(echo "$CHAT_RESPONSE" | jq -r '.messages[-1].text')

echo "Enterprise-only message sent!"
echo "Response: $LAST_MESSAGE"
```

<div class="info-box warning" markdown="1">

**참고** — 웹 그라운딩은 **메시지 단위**로 토글됩니다. 다음 메시지에서 다시 켜려면 `contextualResources.webContext.isWebEnabled` 파라미터를 **생략**하면 됩니다(기본값 `true`).
</div>

### 2단계: (선택) SharePoint 라이브러리 그라운딩 준비

SharePoint Online 문서 라이브러리를 추가 컨텍스트로 제공하려면 먼저 사이트를 만들고 샘플 문서를 업로드합니다.

**사전 준비: SharePoint Online 사이트 만들기**

1. [Microsoft 365 포털](https://m365.cloud.microsoft/)로 이동
2. **Apps**를 클릭하고 **SharePoint** 선택
3. **Create Site → Team site → Standard team** 템플릿 → **Use Template**
4. 사이트 이름 지정 (예: "Copilot Dev Camp - Knowledge Base") 후 **Next**
5. 개인정보·언어 설정을 선택하고 **Create Site**
6. 프로비저닝이 끝나면 **Finish** 선택

**사전 준비: 샘플 문서 업로드**

1. 샘플 문서 [HR-documents.zip](https://download-directory.github.io/?url=https://github.com/microsoft/copilot-camp/tree/main/src/make/copilot-studio/HR-documents&filename=hr-documents) 다운로드
2. 로컬에 압축 해제
3. SharePoint 사이트에서 **Documents** 라이브러리 열기 ("See all" 선택)
4. **Upload → Files** 선택
5. 추출한 폴더의 모든 문서를 선택하고 **Open**

<div class="info-box warning" markdown="1">

**중요: 시맨틱 인덱싱 대기** — 문서를 업로드한 뒤 Work IQ REST 호출에서 참조하기까지 **4~12시간**을 기다려야 합니다. Microsoft 365 시맨틱 인덱스가 문서를 처리·색인해야 Copilot 그라운딩에 사용할 수 있습니다.
</div>

### 3단계: SharePoint 컨텍스트로 채팅 (인덱싱 완료 후)

문서가 색인되면 SharePoint 파일 URL을 컨텍스트로 제공합니다.

**PowerShell (Windows)**

```powershell
$chatUrl = "https://workiq.svc.cloud.microsoft/rest/conversations/$conversationId/chat"
$headers = @{
    "Authorization" = "Bearer $ACCESS_TOKEN"
    "Content-Type"  = "application/json"
}

# SharePoint 파일 컨텍스트를 포함한 메시지
# 실제 SharePoint 사이트·문서 URL로 교체하세요
$chatBody = @{
    message      = @{ text = "Based on the HR documents, how can I improve my career?" }
    locationHint = @{ timeZone = "America/New_York" }
    contextualResources = @{
        files = @(
            @{
                uri = "https://tenant.sharepoint.com/sites/knowledge-base/Documents/Career Path Options.docx"
            },
            @{
                uri = "https://tenant.sharepoint.com/sites/knowledge-base/Documents/Career Path Options in the USA.pptx"
            }
        )
    }
} | ConvertTo-Json -Depth 10

$chatResponse = Invoke-RestMethod -Uri $chatUrl -Method Post -Headers $headers -Body $chatBody

Write-Host "SharePoint-grounded message sent!"
Write-Host "Response: $($chatResponse.messages[-1].text)"
```

**Bash (macOS / Linux)**

```bash
CHAT_URL="https://workiq.svc.cloud.microsoft/rest/conversations/${CONVERSATION_ID}/chat"

# SharePoint 파일 컨텍스트를 포함한 메시지
CHAT_BODY='{
  "message": "Based on the HR documents, what are the steps to request paid time off?",
  "contextualResources": {
    "files": [
        {
            "uri": "https://tenant.sharepoint.com/sites/knowledge-base/Documents/Career Path Options.docx"
        },
        {
            "uri": "https://tenant.sharepoint.com/sites/knowledge-base/Documents/Career Path Options in the USA.pptx"
        }
    ]
  }
}'

CHAT_RESPONSE=$(curl -s -X POST "$CHAT_URL" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$CHAT_BODY")

LAST_MESSAGE=$(echo "$CHAT_RESPONSE" | jq -r '.messages[-1].content')

echo "SharePoint-grounded message sent!"
echo "Response: $LAST_MESSAGE"
```

---

## 🎉 랩 완료

축하합니다! **네 개의 Work IQ 랩을 모두 완료**하고 다양한 소비 패턴을 마스터했습니다.

| 랩 | 내용 |
|----|------|
| [**WIQ01**]({{ '/chapters/m365-4-work-iq-setup-and-cli/' | relative_url }}) | 테넌트에 Work IQ 설정 및 CLI 소비 |
| [**WIQ02**]({{ '/chapters/m365-5-work-iq-a2a/' | relative_url }}) | 에이전트 간 협업을 위한 A2A 프로토콜 |
| [**WIQ03**]({{ '/chapters/m365-6-work-iq-mcp/' | relative_url }}) | LLM 툴링을 위한 MCP 통합 |
| **WIQ04** | 커스텀 애플리케이션 통합을 위한 REST API |

이제 명령줄 도구부터 멀티 에이전트 시스템, REST 기반 애플리케이션까지 다양한 시나리오에 Microsoft 365 Copilot과 Work IQ를 통합하는 방법을 완전히 이해했습니다. 유스케이스에 맞는 소비 패턴을 자신 있게 선택하고, 조직 데이터와 안전하고 규정에 부합하는 통합을 구현할 수 있습니다.

---

## 📚 참고 자료

- 📖 [Work IQ 소개]({{ '/chapters/m365-3-work-iq-overview/' | relative_url }})
- 📖 [Microsoft Entra OAuth 2.0 인증 코드 흐름](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow)
- 🏕️ [원문: Copilot Developer Camp — Lab WIQ04](https://microsoft.github.io/copilot-camp/pages/work-iq/04-work-iq-rest/)
