---
layout: chapter
lang: en
date: 2026-08-05
title: "Lab WIQ04 — Work IQ REST protocol"
short_title: "WIQ04 · REST protocol"
description: "Consume the Work IQ REST API with OAuth 2.0 authentication. This lab covers multi-turn conversation creation, enterprise search and web grounding controls, and SharePoint file context with PowerShell and Bash examples."
order: 7
category: m365
tags: ["Work IQ", "REST API", "OAuth 2.0", "PowerShell", "curl"]
---

<div class="info-box note" markdown="1">

**▶ One-line summary** — Unlike A2A (agent-to-agent) or MCP (agent-to-tool), the REST API is for **human/device → agent** integrations. Use the OAuth 2.0 authorization code flow to obtain a token, create conversations, and control **enterprise search + web grounding** at the message level.

**Level** 300 · **Duration** about 60 minutes · **Badge** WorkIQ-Expert
</div>

> **Translated article** — This article is based on **Lab WIQ04** from Microsoft official [Copilot Developer Camp](https://microsoft.github.io/copilot-camp/pages/work-iq/04-work-iq-rest/). The Entra ID app registration from [Lab WIQ01]({{ '/en/chapters/m365-4-work-iq-setup-and-cli/' | relative_url }}) must be completed first.

## Scenario

You are building a custom application that needs to integrate Microsoft 365 Copilot capabilities programmatically. Instead of using A2A or MCP, you will handle multi-turn conversations through **direct REST API access** while respecting enterprise search and web search grounding. You will set up OAuth 2.0 authentication with the Entra ID application from WIQ01 and construct requests with PowerShell (Windows) and Bash + curl (macOS/Linux). This is a low-level simulation for learning how Work IQ behaves at the HTTP layer.

## Lab goals

- Understand Work IQ REST API capabilities and limitations
- Configure OAuth 2.0 token acquisition in Entra ID
- Create multi-turn conversations programmatically
- Send messages using different grounding strategies (enterprise only / with web / custom context)
- Interact with Work IQ using both PowerShell and Bash/curl
- Toggle web search grounding at the message level

---

## Exercise 1: Understand the Work IQ REST API

### Step 1: REST API basics

The **Work IQ REST API** lets custom applications have multi-turn conversations with Microsoft 365 Copilot while maintaining security and compliance boundaries. Unlike A2A, which is for agent-to-agent communication, the REST API is designed for **human/device → agent** integrations.

**Key capabilities**

| Capability | Description |
|------|------|
| **Enterprise search grounding** | Answers are grounded in Microsoft 365 data (mail, files, meetings, Teams) |
| **Web search grounding** | Public web search results can be integrated selectively |
| **Multi-turn conversations** | Maintains context across multiple messages |
| **Permission trimming** | Automatically honors Microsoft 365 user permissions |
| **Compliance-aware** | Preserves data classification and compliance settings |

**REST API endpoints**

- **Production**: `https://workiq.svc.cloud.microsoft/rest/conversations`
- **Beta**: `https://workiq.svc.cloud.microsoft/rest/beta/conversations` (not recommended for production)

**Core operations**

| Operation | Endpoint |
|------|-----------|
| Create conversation | `POST /conversations` |
| Chat (synchronous) | `POST /conversations/{id}/chat` |
| Chat (streaming) | `POST /conversations/{id}/chatoverstream` |

### Step 2: Understand OAuth 2.0 authentication

The Work IQ REST API uses **OAuth 2.0 delegated authentication**.

- The app obtains an **access token** on behalf of the signed-in user
- Requests run in the **user's security context**, not the app's
- The token must include the scope `api://workiq.svc.cloud.microsoft/WorkIQAgent.Ask`
- Tokens expire (usually after one hour) and must be refreshed

**Token acquisition flow**

1. Register an application in Entra ID (completed in WIQ01 Exercise 4)
2. Obtain a refresh token through the device code, authorization code, or client credentials flow
3. Exchange the refresh token for an access token
4. Include the access token in the `Authorization: ******` header

**Values prepared in WIQ01** — Tenant ID, Client ID, Client Secret (or certificate), and scope `api://workiq.svc.cloud.microsoft/WorkIQAgent.Ask`

### Step 3: Understand grounding strategies

The REST API supports two grounding modes that can be controlled per message.

**Enterprise search grounding** (enabled by default)

- Searches Microsoft 365 data that the user can access
- Honors security trimming and permissions
- Provides the freshest results from organizational data
- Automatically applies to every message

**Web search grounding** (enabled by default, toggleable)

- Supplements enterprise data with public web search results
- Can be turned off **per message**
- Turning off web search is a **single-turn behavior**, so you must specify it again for each message

**Additional context support**

- OneDrive and SharePoint files can be provided as additional context
- Files are passed as absolute URLs or SharePoint item IDs
- Copilot includes file content when processing the message

### Step 4: Understand limitations

<div class="info-box warning" markdown="1">

**REST API limitations**

- **Cannot create actions** — cannot create files, send mail, or schedule meetings
- **Text-only responses** — no graphics, charts, or code artifacts
- **No long-running work** — timeouts occur if gateway limits are exceeded
- **No tools** — no code interpreter or graphics tools
- **Semantic index limitations** — follows Microsoft 365 Copilot semantic index constraints
- **AI-generated content** — responses are generated by AI, so verify accuracy before use
</div>

---

## Exercise 2: OAuth 2.0 setup and conversation creation/management

### Step 1: Obtain an access token

Obtain a delegated access token through the OAuth 2.0 **authorization code flow**.

First, open the following URL in a browser (replace placeholders), sign in, and copy the `code` value from the query string in the redirect URL.

```text
https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/authorize?
  client_id={CLIENT_ID}
  &response_type=code
  &redirect_uri=https%3A%2F%2Fmicrosoft.github.io%2Fcopilot-camp%2F
  &scope=api%3A%2F%2Fworkiq.svc.cloud.microsoft%2FWorkIQAgent.Ask+offline_access
  &response_mode=query
```

Then exchange the authorization code for an access token.

**PowerShell (Windows)**

```powershell
# Replace the placeholders before running
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
# Replace the placeholders before running
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

Now the `ACCESS_TOKEN` variable is available in your shell session and reused in later REST calls.

### Step 2: Create a new conversation

With a valid access token, you can start a multi-turn conversation with Work IQ. First create a conversation session.

**PowerShell (Windows)**

```powershell
# Create a conversation
$conversationUrl = "https://workiq.svc.cloud.microsoft/rest/conversations"
$headers = @{
    "Authorization" = "Bearer $ACCESS_TOKEN"
    "Content-Type"  = "application/json"
}

$response = Invoke-RestMethod -Uri $conversationUrl -Method Post -Headers $headers -Body "{}"

# Print the conversation info
$conversationId = $response.id
Write-Host "Conversation created successfully!"
Write-Host "Conversation ID: $conversationId"
Write-Host "Created: $($response.createdDateTime)"
Write-Host "Status: $($response.status)"
Write-Host "Turn Count: $($response.turnCount)"
```

**Bash (macOS / Linux)**

```bash
# Create a conversation
CONVERSATION_URL="https://workiq.svc.cloud.microsoft/rest/conversations"

CONVERSATION_RESPONSE=$(curl -s -X POST "$CONVERSATION_URL" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{}")

# Extract the conversation ID
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

**Expected response**

```json
{
  "id": "0d110e7e-2b7e-4270-a899-fd2af6fde333",
  "createdDateTime": "2025-09-30T15:28:46.1560062Z",
  "displayName": "",
  "status": "active",
  "turnCount": 0
}
```

### Step 3: Send a simple chat message

Now send your first message. By default, this message is grounded in **both enterprise search and web search**.

**PowerShell (Windows)**

```powershell
# Chat endpoint
$chatUrl = "https://workiq.svc.cloud.microsoft/rest/conversations/$conversationId/chat"
$headers = @{
    "Authorization" = "Bearer $ACCESS_TOKEN"
    "Content-Type"  = "application/json"
}

# Define the message
$chatBody = @{
    message      = @{ text = "Who am I? What is my role in the company?" }
    locationHint = @{ timeZone = "America/New_York" }
} | ConvertTo-Json -Depth 3

# Send the message
$chatResponse = Invoke-RestMethod -Uri $chatUrl -Method Post -Headers $headers -Body $chatBody

# Print the response
Write-Host "Message sent successfully!"
Write-Host "Response: $($chatResponse.messages[-1].text)"
Write-Host "Turn Count: $($chatResponse.turnCount)"
```

**Bash (macOS / Linux)**

```bash
# Chat endpoint
CHAT_URL="https://workiq.svc.cloud.microsoft/rest/conversations/${CONVERSATION_ID}/chat"

# Define the message
CHAT_BODY='{
    "message": {
      "text": "Who am I? What is my role in the company?"
    },
    "locationHint": {
      "timeZone": "America/New_York"
    }
  }'

# Send the message
CHAT_RESPONSE=$(curl -s -X POST "$CHAT_URL" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$CHAT_BODY")

# Print the response
LAST_MESSAGE=$(echo "$CHAT_RESPONSE" | jq -r '.messages[-1].text')
TURN_COUNT=$(echo "$CHAT_RESPONSE" | jq -r '.turnCount')

echo "Message sent successfully!"
echo "Response: $LAST_MESSAGE"
echo "Turn Count: $TURN_COUNT"
```

<div class="info-box tip" markdown="1">

**Time zone (`locationHint`)** — If you specify the user's IANA time zone, Work IQ can correctly interpret relative time expressions such as "tomorrow's meetings" and "this week." For Korea, use `Asia/Seoul`.
</div>

---

## Exercise 3: Chat by grounding strategy

### Step 1: Use enterprise search only (disable web grounding)

By default, Work IQ uses both enterprise and web search grounding. To focus only on organizational data, turn off web grounding.

**PowerShell (Windows)**

```powershell
$chatUrl = "https://workiq.svc.cloud.microsoft/rest/conversations/$conversationId/chat"
$headers = @{
    "Authorization" = "Bearer $ACCESS_TOKEN"
    "Content-Type"  = "application/json"
}

# Message with web grounding turned off
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

# Message with web grounding turned off
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

**Note** — Web grounding is toggled **per message**. To turn it back on for the next message, simply **omit** the `contextualResources.webContext.isWebEnabled` parameter (default value: `true`).
</div>

### Step 2: Prepare SharePoint library grounding (optional)

To provide a SharePoint Online document library as additional context, first create a site and upload sample documents.

**Prerequisite: create a SharePoint Online site**

1. Go to the [Microsoft 365 portal](https://m365.cloud.microsoft/)
2. Click **Apps** and select **SharePoint**
3. Select **Create Site → Team site → Standard team** template → **Use Template**
4. Name the site (for example, "Copilot Dev Camp - Knowledge Base"), then click **Next**
5. Select privacy and language settings, then **Create Site**
6. When provisioning completes, select **Finish**

**Prerequisite: upload sample documents**

1. Download the sample document [HR-documents.zip](https://download-directory.github.io/?url=https://github.com/microsoft/copilot-camp/tree/main/src/make/copilot-studio/HR-documents&filename=hr-documents)
2. Extract it locally
3. Open the **Documents** library in the SharePoint site (select "See all")
4. Select **Upload → Files**
5. Select all documents in the extracted folder and click **Open**

<div class="info-box warning" markdown="1">

**Important: wait for semantic indexing** — After uploading documents, you must wait **4–12 hours** before referencing them in Work IQ REST calls. Microsoft 365 semantic index must process and index the documents before they can be used for Copilot grounding.
</div>

### Step 3: Chat with SharePoint context (after indexing completes)

After the documents are indexed, provide SharePoint file URLs as context.

**PowerShell (Windows)**

```powershell
$chatUrl = "https://workiq.svc.cloud.microsoft/rest/conversations/$conversationId/chat"
$headers = @{
    "Authorization" = "Bearer $ACCESS_TOKEN"
    "Content-Type"  = "application/json"
}

# SharePoint Message including file context
# Replace with your real SharePoint site and document URL
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

# SharePoint Message including file context
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

## 🎉 Lab complete

Congratulations! You have **completed all four Work IQ labs** and mastered a range of consumption patterns.

| Lab | Content |
|----|------|
| [**WIQ01**]({{ '/en/chapters/m365-4-work-iq-setup-and-cli/' | relative_url }}) | Set up Work IQ in a tenant and consume it with the CLI |
| [**WIQ02**]({{ '/en/chapters/m365-5-work-iq-a2a/' | relative_url }}) | A2A protocol for agent-to-agent collaboration |
| [**WIQ03**]({{ '/en/chapters/m365-6-work-iq-mcp/' | relative_url }}) | MCP integration for LLM tooling |
| **WIQ04** | REST API for custom application integration |

You now fully understand how to integrate Microsoft 365 Copilot and Work IQ into scenarios ranging from command-line tools to multi-agent systems and REST-based applications. You can confidently choose the consumption pattern that fits your use case and implement safe, compliant integrations with organizational data.

---

## 📚 References

- 📖 [Introducing Work IQ]({{ '/en/chapters/m365-3-work-iq-overview/' | relative_url }})
- 📖 [Microsoft Entra OAuth 2.0 authorization code flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow)
- 🏕️ [Original: Copilot Developer Camp — Lab WIQ04](https://microsoft.github.io/copilot-camp/pages/work-iq/04-work-iq-rest/)
