---
layout: chapter
date: 2026-08-05
title: "Lab WIQ03 — Work IQ MCP 프로토콜"
short_title: "WIQ03 · MCP 프로토콜"
description: "Work IQ MCP 서버의 10개 통합 도구로 Microsoft 365 엔터티를 읽고 만들고 관리합니다. MCP Inspector 연결, ask·getSchema·fetch·create_entity 사용법을 다룹니다."
order: 6
category: m365
tags: ["Work IQ", "MCP", "MCP Inspector", "Microsoft Graph", "Entra ID"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — Work IQ MCP 서버는 수백 개의 Microsoft 365 오퍼레이션을 **단 10개의 범용 도구**로 압축합니다. 도구가 아니라 **리소스 경로(resource path)** 가 늘어나는 구조라 도구 표면(tool surface)이 절대 커지지 않습니다. 이 랩에서는 MCP Inspector로 연결해 `ask`, `getSchema`, `fetch`, `create_entity`를 실습합니다.

**레벨** 300 · **소요 시간** 약 90분 · **배지** WorkIQ-Expert
</div>

> 이 글은 Microsoft 공식 [Copilot Developer Camp](https://microsoft.github.io/copilot-camp/pages/work-iq/03-work-iq-mcp/)의 **Lab WIQ03** 을 한국어로 옮긴 것입니다.

Work IQ MCP(Model Context Protocol) 서버는 Microsoft 365 인텔리전스 기능을 **통합된 범용 도구 집합**으로 AI 에이전트에 노출합니다. Microsoft 365 API마다 별도 통합을 만들 필요 없이, 에이전트는 Work IQ에 한 번 연결해 메일·일정·파일·사람·채팅·사이트에 접근합니다. 모두 **리소스 경로 위에서 동작하는 일관된 도구 집합**을 통해서입니다.

## 사전 요건

- [Lab WIQ01 — Work IQ 설정과 CLI]({{ '/chapters/m365-4-work-iq-setup-and-cli/' | relative_url }}) 완료
- 프로그래밍 방식 접근용 Entra ID 애플리케이션 등록 완료 (WIQ01 실습 4)
- 앱 등록에서 확보한 자격 증명: **TENANT_ID**, **CLIENT_ID**, **CLIENT_SECRET**
- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) 로컬 설치
- 메일과 일정 항목이 최소 1개씩 있는 Microsoft 365 테넌트

## 시나리오

여러분은 Microsoft 365 데이터를 다루는 지능형 에이전트를 만드는 개발자입니다. 리소스마다 API 호출을 하드코딩하는 대신, Work IQ MCP 서버의 통합 도구 집합으로 **런타임에 스키마를 발견하고, 데이터를 가져오고, 엔터티를 생성**하는 방법을 이해해야 합니다.

## 랩 목표

- Work IQ MCP 통합 서버의 설계 원칙 이해
- `ask` 도구로 자연어 질의
- `getSchema` 도구로 런타임 스키마 발견
- `fetch` 도구로 받은 편지함 메일 조회
- `create_entity` 도구로 엔터티(예: 일정 이벤트) 생성
- WIQ01에서 등록한 Entra ID 앱으로 Work IQ MCP 인증

---

## 실습 1: Work IQ MCP 모델 이해하기

Work IQ MCP 서버는 수백 개의 Microsoft 365 오퍼레이션을 **10개의 범용 도구**로 압축하며, 이를 **엔터티 도구 / Copilot 도구 / 스키마 도구** 세 범주로 구성합니다.

### 설계 원칙

**① 도구는 적게, 경로는 많게(Fewer tools, more paths)** — Microsoft 365 엔터티 유형마다 별도 도구를 노출하는 대신, **리소스 경로**와 함께 동작하는 범용 동사(`fetch`, `create_entity`, `update_entity`, `delete_entity`, `do_action`, `call_function`)를 제공합니다. 새 워크로드는 **도구가 아니라 경로를 추가**하므로 도구 표면이 커지지 않습니다.

**② 열거보다 성찰(Introspection over enumeration)** — 에이전트가 수천 개의 타입 정의를 컨텍스트에 미리 올리는 대신, 런타임에 `getSchema`로 스키마를 요청합니다. 동적 발견과 적응이 가능해집니다.

**③ 설계에 의한 보안(Security by design)** — 4개의 광범위한 OAuth 권한이 전체 기능을 통제하고, 세밀한 접근 제어는 **경로·메서드·테넌트 정책 단위**로 강제됩니다. 권한 자동 상속, DLP, 규제 준수가 모든 계층에 내장되어 있습니다.

### 도구 범주

| 범주 | 도구 | 설명 |
|------|------|------|
| **Entity Tools** | `fetch` | Microsoft 365 리소스에서 엔터티 읽기 |
| | `create_entity` | 컬렉션에 새 엔터티 생성 |
| | `update_entity` | 기존 엔터티 수정 |
| | `delete_entity` | 엔터티 삭제 |
| | `do_action` | 부수 효과가 있는 액션 수행 (발송·복사·이동) |
| | `call_function` | 파생 데이터 계산 (일정, 델타, 검색) |
| **Copilot Tools** | `ask` | 자연어 질문으로 Microsoft 365 Copilot 질의 |
| | `list_agents` | 사용 가능한 Work IQ 에이전트 탐색 |
| **Schema Tools** | `get_schema` | 특정 오퍼레이션의 OpenAPI 스키마 조회 |
| | `search_paths` | 사용 가능한 리소스 경로 검색 |

모든 도구는 **리소스 경로**와 함께 동작합니다.

| 리소스 경로 | 용도 |
|---|---|
| `/me/messages` | 메일 읽기 |
| `/me/events` | 일정 이벤트 읽기 |
| `/me/chats/{id}/messages` | Teams 채팅 메시지 읽기 |
| `/me/sendMail` | 메일 발송 (액션) |

이 모델의 힘은 **동일한 `fetch` 도구**가 `/me/messages`, `/me/events`, `/users/{id}/files` 등 지원되는 어떤 경로와도 작동한다는 점입니다. 에이전트는 개별 API를 알 필요 없이 범용 도구와 경로만 다루면 됩니다.

---

## 실습 2: MCP Inspector 설정과 인증

MCP Inspector는 MCP 서버를 테스트하고 도구를 대화식으로 호출할 수 있는 웹 기반 도구입니다.

### 1단계: MCP Inspector 열기

<div class="info-box warning" markdown="1">

**사전 요건** — MCP Inspector는 **Node.js v22.7.5 이상**이 필요합니다. 진행 전 `node --version`으로 확인하세요.
</div>

1. 터미널에서 다음을 실행합니다.

    ```bash
    npx @modelcontextprotocol/inspector
    ```

2. MCP Inspector가 다운로드·실행됩니다. 터미널에 표시된 URL(보통 [http://localhost:6274](http://localhost:6274))을 브라우저에서 엽니다.
3. 왼쪽에 연결·인증 설정이 있는 웹 인터페이스가 보입니다.

### 2단계: Work IQ MCP 서버 연결 및 OAuth 2.0 인증 구성

<figure class="screenshot">
  <img src="{{ '/assets/image/workiq/workiq-03-01-mcp-inspector.png' | relative_url }}" alt="MCP Inspector의 연결·인증 설정 패널 — Transport Type, URL, OAuth 2.0 구성 필드">
  <figcaption>왼쪽 연결 설정 패널에서 번호 순서대로 구성합니다</figcaption>
</figure>

1. MCP Inspector 왼쪽의 연결 설정 패널을 찾습니다 1️⃣
2. 다음 파라미터를 설정합니다.
    - **Transport Type**: `Streamable HTTP`
    - **URL**: `https://workiq.svc.cloud.microsoft/mcp`
3. **Authentication** 2️⃣ 을 선택해 인증 설정을 펼칩니다
4. **OAuth 2.0 Flow**를 다음 값으로 구성합니다.
    - **Client ID**: WIQ01의 `CLIENT_ID`
    - **Client Secret**: WIQ01의 `CLIENT_SECRET`
    - **Scope**: `api://workiq.svc.cloud.microsoft/WorkIQAgent.Ask`
5. **Authentication** 설정을 접습니다
6. **Open Auth Settings** 3️⃣ 를 선택하고 **Quick OAuth Flow** 선택
7. 브라우저 팝업에서 Microsoft 365 계정으로 로그인합니다 (WIQ01과 동일한 계정)
8. 인증에 성공하면 **Authentication completed successfully** ✓ 메시지가 표시됩니다
9. **Connect** 4️⃣ 를 선택해 Work IQ MCP 서버와 실제 연결을 만듭니다
10. 연결에 성공하면 **Resources**, **Prompts**, **Tools**, **Apps** 등의 탭이 나타납니다
11. **Tools** 탭에서 **List tools**를 클릭해 Work IQ MCP 서버가 제공하는 도구 목록을 조회합니다
12. 앞 실습에서 설명한 도구 목록이 표시됩니다

<figure class="screenshot">
  <img src="{{ '/assets/image/workiq/workiq-03-02-mcp-inspector.png' | relative_url }}" alt="Work IQ 인증 성공과 활성 서버 연결이 표시된 MCP Inspector 화면">
  <figcaption>인증 완료 및 Work IQ MCP 서버 연결 성공</figcaption>
</figure>

---

## 실습 3: `ask` 도구 사용하기

`ask`는 Work IQ MCP에서 가장 강력한 도구 중 하나입니다. 조직 데이터에 대한 자연어 질문을 Microsoft 365 Copilot에 질의하며, 여러 Microsoft 365 API의 복잡성을 **하나의 대화형 인터페이스**로 추상화합니다.

### 1단계: `ask` 도구 살펴보기

1. MCP Inspector에서 **Tools** 탭 클릭
2. `ask` 도구를 찾아 클릭해 스키마 확인
3. 다음 파라미터를 받습니다.

| 파라미터 | 필수 | 설명 |
|----------|------|------|
| `question` | ✅ | 자연어 질문 |
| `agentId` | — | 특정 에이전트로 라우팅 |
| `fileUrls` | — | 컨텍스트로 사용할 OneDrive·SharePoint 파일 URL |
| `conversationId` | — | 멀티턴 대화용 |
| `timeZone` | — | IANA 시간대 식별자 |

### 2단계: 자연어 질문 던지기

1. `ask` 도구를 클릭해 도구 호출을 준비합니다
2. **question** 필드에 입력:

    ```text
    Who am I? What is my role in the company?
    ```

3. 나머지 필드는 비워 둡니다
4. **Run Tool** 클릭

### 3단계: 응답 관찰

실행 후 두 가지 응답 유형을 확인합니다.

- **Structured Content** — JSON 객체
    - `answer`: 서식이 적용된 응답
    - `conversationId`: 멀티턴 상호작용용 대화 ID
- **Unstructured Content** — 신원·역할 정보가 담긴 일반 텍스트 응답

### 4단계: 후속 질문 (멀티턴)

이전 응답의 `conversationId`로 멀티턴 대화가 가능합니다.

1. `ask` 도구를 다시 클릭
2. 다음 질문 입력:

    ```text
    Who is my manager?
    ```

3. **conversationId** 필드에 이전 응답의 대화 ID를 붙여넣기
4. **Run Tool** 클릭

Work IQ가 턴 간 컨텍스트를 유지하므로, 후속 질문이 이전 대화 맥락 안에서 이해됩니다.

---

## 실습 4: `getSchema`로 스키마 발견하기

`getSchema`는 에이전트가 **런타임에** Work IQ 오퍼레이션의 구조와 요구사항을 발견하게 해줍니다. 하드코딩된 지식에 의존하는 대신, 어떤 필드가 있고 무엇이 필수이며 어떤 데이터 타입을 기대하는지 질의할 수 있습니다. Work IQ를 **자기 기술적(self-describing)** 으로 만드는 도구입니다.

### 1단계: `getSchema` 도구 이해

| 파라미터 | 필수 | 설명 |
|----------|------|------|
| `path` | — | 스키마를 얻을 API 경로 (예: `/me/messages`) |
| `operationType` | ✅ | 오퍼레이션 유형 (`fetch`, `create`, `update`) |
| `format` | — | 출력 형식 (`jsonschema` 또는 `typescript`) |
| `agentId` | — | 향후 사용을 위해 예약됨 |

### 2단계: 메일 메시지 스키마 조회

1. `getSchema` 도구 클릭
2. 다음 파라미터 입력:
    - **path**: `/me/messages`
    - **operationType**: `fetch`
    - **format**: `jsonschema`
3. **Run Tool** 클릭

### 3단계: 메일 메시지 스키마 분석

상세한 OpenAPI 스키마가 반환됩니다.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "microsoft.graph.messageCollectionResponse",
  "type": "object",
  "properties": {
    "value": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/microsoft.graph.message"
      }
    }
  }
}
```

message 객체 안에서 다음과 같은 속성을 볼 수 있습니다.

| 그룹 | 속성 |
|------|------|
| **핵심 식별** | `id`, `subject`, `conversationId`, `internetMessageId` |
| **수신자·발신자** | `from`, `sender`, `toRecipients`, `ccRecipients`, `bccRecipients`, `replyTo` |
| **콘텐츠** | `body`(`content`·`contentType`), `bodyPreview`, `uniqueBody` |
| **타임스탬프** | `receivedDateTime`, `sentDateTime`, `createdDateTime`, `lastModifiedDateTime` |
| **상태 플래그** | `isRead`, `isDraft`, `hasAttachments`, `isDeliveryReceiptRequested`, `isReadReceiptRequested` |
| **메시지 속성** | `importance`, `inferenceClassification`, `categories` |
| **고급 기능** | `flag`, `internetMessageHeaders`, `webLink`, `parentFolderId` |

### 4단계: 일정 이벤트 스키마 조회

이번에는 일정 이벤트 **생성**용 스키마를 조회합니다.

1. `getSchema` 도구를 다시 클릭
2. 파라미터 입력:
    - **path**: `/me/events`
    - **operationType**: `create`
    - **format**: `jsonschema`
3. **Run Tool** 클릭

응답을 살펴 일정 이벤트 생성에 필요한 필수·선택 필드를 파악하세요(실습 6에서 사용합니다).

---

## 실습 5: `fetch`로 메일 조회하기

`fetch`는 리소스 경로로 하나 이상의 엔터티를 읽습니다. `$top`, `$select`, `$filter` 같은 Microsoft Graph 쿼리 파라미터를 지원해 반환 데이터를 제어할 수 있습니다.

### 1단계: `fetch` 도구 이해

| 파라미터 | 필수 | 설명 |
|----------|------|------|
| `entityUrls` | ✅ | 조회할 상대 리소스 경로의 배열 |
| `agentId` | — | 향후 사용을 위해 예약됨 |

### 2단계: 받은 편지함의 최근 메일 조회

1. `fetch` 도구 클릭
2. **entityUrls** 필드에서 **Add Item**을 선택하고 다음 항목을 추가합니다.

    ```text
    /me/messages?$top=5&$select=id,subject,from,receivedDateTime,isRead
    ```

3. **Run Tool** 클릭

이 쿼리는:

- 받은 편지함에서 **상위 5개** 메시지 조회
- `id`, `subject`, `from`, `receivedDateTime`, `isRead` 필드만 선택
- 불필요한 필드를 가져오지 않아 응답 크기 감소

**Switch to JSON**으로 전환해 저수준으로 정의할 수도 있습니다.

```json
["/me/messages?$top=5&$select=id,subject,from,receivedDateTime,isRead"]
```

### 3단계: 응답 분석

응답은 `entityUrl`당 하나의 객체를 담은 `results` 배열입니다.

```json
{
  "results": [
    {
      "data": {
        "value": [
          {
            "id": "AAMkADk0...",
            "subject": "Your weekly PIM digest for Contoso",
            "from": {
              "emailAddress": {
                "name": "Microsoft Security",
                "address": "MSSecurity-noreply@microsoft.com"
              }
            },
            "receivedDateTime": "2026-05-31T15:40:44Z",
            "isRead": false
          }
        ]
      },
      "statusCode": 200
    }
  ]
}
```

### 4단계: 다양한 쿼리 실험

**읽지 않은 메일만 조회**

```text
/me/messages?$top=10&$select=id,subject,from&$filter=isRead eq false
```

**특정 발신자의 메일 조회**

```text
/me/messages?$top=5&$select=id,subject,from,receivedDateTime&$filter=from/emailAddress/address eq 'user@example.com'
```

**여러 경로를 한 번에 조회** (배열에 여러 항목)

```json
[
  "/me/messages?$top=3&$select=id,subject",
  "/me/events?$top=3&$select=id,subject,start,end"
]
```

`fetch` 도구는 한 번의 호출에서 **여러 경로를 병렬 조회**할 수 있어, 여러 소스에서 데이터를 모아야 하는 에이전트에 효율적입니다.

---

## 실습 6: `create_entity`로 일정 이벤트 만들기

`create_entity`는 컬렉션에 새 엔터티를 만듭니다. 실습 4에서 발견한 스키마를 사용해 일정 이벤트를 생성해 봅니다.

### 1단계: `create_entity` 도구 이해

| 파라미터 | 필수 | 설명 |
|----------|------|------|
| `parentUrl` | ✅ | 컬렉션의 상대 리소스 경로 (예: `/me/events`) |
| `jsonBody` | ✅ | 엔터티 데이터를 **JSON 인코딩된 문자열**로 전달 |
| `agentId` | — | 향후 사용을 위해 예약됨 |

<div class="info-box warning" markdown="1">

**주의** — `jsonBody`는 JSON 객체가 아니라 **JSON 인코딩된 문자열**이어야 합니다. 즉 JSON을 문자열화(stringify)한 뒤 전달합니다.
</div>

### 2단계: 이벤트 데이터 준비

일정 이벤트의 필수 필드는 `subject`(제목), `start`(시간대 포함 시작 일시), `end`(시간대 포함 종료 일시)이며, `attendees`는 선택입니다.

```json
{
  "subject": "Team Standup - Work IQ MCP Lab",
  "start": {
    "dateTime": "2026-08-04T14:00:00",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2026-08-04T14:30:00",
    "timeZone": "UTC"
  },
  "isReminderOn": true,
  "reminderMinutesBeforeStart": 15,
  "categories": ["Work", "Lab"]
}
```

### 3단계: 일정 이벤트 생성

1. `create_entity` 도구 클릭
2. 파라미터 입력:
    - **parentUrl**: `/me/events`
    - **jsonBody**: 앞 단계에서 정의한 이벤트 JSON을 복사·붙여넣기
3. **Run Tool** 클릭

### 4단계: 생성 결과 확인

`201 Created` 응답과 함께 생성된 이벤트 객체가 반환됩니다.

```json
{
  "statusCode": 201,
  "data": {
    "id": "AAMkADk0...",
    "subject": "Team Standup - Work IQ MCP Lab",
    "start": {
      "dateTime": "2026-08-04T14:00:00.0000000",
      "timeZone": "UTC"
    },
    "end": {
      "dateTime": "2026-08-04T14:30:00.0000000",
      "timeZone": "UTC"
    }
  }
}
```

이벤트가 캘린더에 생성되었습니다. Microsoft 365 캘린더에서 직접 확인하거나, 반환된 이벤트 ID로 `fetch` 도구를 사용해 검증할 수 있습니다.

### 5단계: 참석자를 포함한 이벤트 생성

이번에는 참석자를 포함해 만들어 봅니다.

```json
{
  "subject": "Project Planning Meeting",
  "start": {
    "dateTime": "2026-08-05T10:00:00",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2026-08-05T11:00:00",
    "timeZone": "UTC"
  },
  "attendees": [
    {
      "emailAddress": {
        "address": "colleague@contoso.com",
        "name": "Colleague Name"
      },
      "type": "required"
    }
  ],
  "isReminderOn": true,
  "reminderMinutesBeforeStart": 30
}
```

3단계와 동일한 파라미터로 `create_entity`를 사용하고 `jsonBody`만 이 새 이벤트로 교체합니다. Work IQ MCP가 데이터를 **읽는 것뿐 아니라 생성·관리**까지 가능하게 한다는 것을 보여줍니다.

---

## 실습 7: MCP 모델의 힘 이해하기

핵심 도구들을 사용해 봤으니, 이 설계가 왜 강력한지 정리해 봅시다.

### 통합 도구 모델

리소스 유형마다 `read_messages`, `create_message`, `update_message` / `read_events`, `create_event`, `update_event` / `read_files`, … 를 각각 노출하는 대신, Work IQ MCP는 **6개의 엔터티 도구**(`fetch`, `create_entity`, `update_entity`, `delete_entity`, `do_action`, `call_function`)만으로 **리소스 경로** 위에서 동작합니다. 이점은 다음과 같습니다.

| 이점 | 설명 |
|------|------|
| **확장성** | 새 Microsoft 365 워크로드(Files, Teams, Sites 등)는 새 **경로**로 추가되며, 도구는 늘지 않습니다 |
| **일관성** | 에이전트는 패턴을 한 번 배워(읽기는 `fetch`, 생성은 `create_entity`) 어디에나 적용합니다 |
| **런타임 발견** | `getSchema`·`search_paths`로 모든 스키마를 미리 로드하지 않고 동적으로 발견합니다 |
| **거버넌스** | 관리자가 **경로 단위**로 접근을 제어해 OAuth 스코프를 넘어선 세밀한 정책이 가능합니다 |

### 에이전트가 얻는 이점

Work IQ MCP를 사용하는 AI 에이전트는 다음을 할 수 있습니다.

1. `ask`로 **자연스럽게 질문**
2. `search_paths`로 **사용 가능한 오퍼레이션 발견**
3. `getSchema`로 **데이터 구조 이해**
4. 범용 도구로 엔터티를 **조회·생성·수정**
5. 코드 수정 없이 Microsoft 365 API 변화에 **적응**

수백 개의 Microsoft 365 오퍼레이션을 **하나의 일관된 방식**으로 다루는 것 — 이것이 통합 MCP 인터페이스의 힘입니다.

---

## 🎉 완료

축하합니다! Work IQ MCP 프로토콜을 마스터했습니다.

- ✅ Work IQ MCP 통합 서버의 설계 원칙 이해
- ✅ Entra ID 자격 증명으로 Work IQ MCP 인증
- ✅ `ask` 도구로 자연어 질의
- ✅ `getSchema` 도구로 런타임 스키마 발견
- ✅ `fetch` 도구로 메일 조회
- ✅ `create_entity` 도구로 일정 이벤트 생성
- ✅ 통합 MCP 모델이 수백 개 오퍼레이션으로 확장되는 원리 학습

👉 [Lab WIQ04 — REST 프로토콜로 Work IQ 소비하기]({{ '/chapters/m365-7-work-iq-rest/' | relative_url }})

---

## 📚 참고 자료

- 📖 [MCP Inspector 문서](https://modelcontextprotocol.io/docs/tools/inspector)
- 📖 [Model Context Protocol 사양](https://modelcontextprotocol.io/)
- 🏕️ [원문: Copilot Developer Camp — Lab WIQ03](https://microsoft.github.io/copilot-camp/pages/work-iq/03-work-iq-mcp/)
