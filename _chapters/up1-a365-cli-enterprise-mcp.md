---
layout: chapter
date: 2026-07-06
title: "A365 CLI를 이용한 Enterprise MCP 배포"
short_title: "A365 CLI · Enterprise MCP 배포"
description: "Agent 365 CLI로 자체 제작(BYO) MCP 서버를 엔터프라이즈에 등록하고, 중앙 거버넌스 하에 승인·배포·활용하는 방법을 안내합니다."
order: 1
category: updates
tags: ["Agent 365", "MCP", "Enterprise", "Copilot Studio"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — **Agent 365 CLI**로 자체 제작(BYO) MCP 서버를 엔터프라이즈에 등록하면, 모든 도구 호출이 **Agent 365 Tooling Gateway**를 경유해 IT 관리자가 가시성과 제어권을 갖고, 관리자 승인 후 제작자는 **추가 URL·인증 구성 없이** Copilot Studio에서 바로 사용할 수 있습니다.
</div>

> ⚠️ 이 문서의 기능·화면은 모두 **미리 보기(Preview)** 기준이며 변경될 수 있습니다(subject to change).

---

## 1. 개요 (Enterprise Registration — Path 2: BYO MCP Server)

프로덕션 배포에서 중앙 집중식 거버넌스가 필요한 경우, Agent 365 CLI를 통해 MCP 서버를 등록합니다. 이 방식은 모든 도구 호출(tool invocation)을 **Agent 365 Tooling Gateway**를 경유하도록 라우팅하여, IT 관리자가 가시성과 제어권을 확보할 수 있게 합니다.

> ⚠️ **참고:** BYO MCP 서버는 현재 **미리 보기(Preview)** 단계입니다.
> **지원 클라이언트:** Copilot Studio, VS Code, Claude Code, GitHub Copilot CLI

---

## 2. Agent 365 CLI 설치

CLI를 전역(global)으로 설치합니다.

```bash
npm install -g @microsoft/agent-365-cli
```

버전 **1.1.165 이상**인지 확인합니다.

```bash
a365 --version
```

---

## 3. 서비스 주체(Service Principal) 확인

Agent 365 서비스 주체가 테넌트에 프로비저닝되어 있어야 합니다. 다음 앱 ID를 확인하세요.

```
ea9ffc3e-8a23-4a7d-836d-234d7c7565c1
```

만약 해당 서비스 주체를 찾을 수 없다면, Agent 365 문서를 참고하여 프로비저닝합니다.

---

## 4. MCP 서버 등록

서버 정보를 담아 등록 명령을 실행합니다. 인증 방식에 따라 다음 예시 중 하나를 사용합니다.

### 4.1 인증 없음 (No Authentication)

```bash
a365 develop-mcp register-external-mcp-server \
  --server-name "ContosoDocs" \
  --server-url "https://mcp-document-search.victoriousisland-3125a493.centralus.azurecontainerapps.io/mcp" \
  --publisher "Contoso" \
  --description "Internal document search" \
  --auth-type "NoAuth" \
  --tools "search_documents,get_document"
```

### 4.2 API 키 (Header)

```bash
a365 develop-mcp register-external-mcp-server \
  --server-name "ContosoDocs" \
  --server-url "https://mcp-document-search.victoriousisland-3125a493.centralus.azurecontainerapps.io/mcp" \
  --publisher "Contoso" \
  --description "Internal document search" \
  --auth-type APIKey \
  --api-key-location Header \
  --api-key-name "X-API-Key" \
  --tools "search_documents,get_document"
```

### 4.3 Entra OAuth

```bash
a365 develop-mcp register-external-mcp-server \
  --server-name "ContosoDocs" \
  --server-url "https://mcp-document-search.victoriousisland-3125a493.centralus.azurecontainerapps.io/mcp" \
  --publisher "Contoso" \
  --description "Internal document search" \
  --auth-type EntraOAuth \
  --remote-scopes "api://my-app/.default" \
  --tools "search_documents,get_document"
```

### 4.4 대안: JSON 파일로 등록

등록 파일(`register.json`)을 생성합니다.

```json
{
  "serverName": "ContosoDocs",
  "serverUrl": "https://mcp-document-search.victoriousisland-3125a493.centralus.azurecontainerapps.io/mcp",
  "authType": "NoAuth",
  "description": "Internal document search for Copilot Studio agents",
  "publisherName": "Contoso",
  "tools": [
    { "name": "search_documents", "description": "Search docs by keyword" },
    { "name": "get_document", "description": "Get full document by ID" }
  ]
}
```

파일을 사용해 등록합니다.

```bash
a365 develop-mcp register-external-mcp-server -f register.json
```

### 4.5 등록 결과 확인

등록이 성공하면 CLI는 등록 요약(Registration Summary)을 출력하고, 확인 프롬프트에 `y`를 입력하면 Entra 앱 생성 및 API 권한 부여가 진행됩니다. 마지막에 `MCP server '...' has been registered successfully.` 메시지와 함께 **테넌트 관리자 승인 요청** 안내가 표시됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/updates/up1-01.jpg' | relative_url }}" alt="CLI 등록 요약 및 완료 메시지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>CLI 등록 요약 및 완료 메시지</figcaption>
</figure>

> 💡 **주의:** 도구 이름(tool names)은 원격 MCP 서버가 실제로 노출하는 이름과 정확히 일치해야 합니다. 이름이 일치하지 않으면 런타임에 도구 호출이 실패합니다.

---

## 5. 관리자 승인

등록 후에는 IT 관리자가 서버를 승인해야 합니다.

1. **Microsoft 365 관리 센터**([admin.microsoft.com](https://admin.microsoft.com))에 로그인합니다.
2. **Agents → Tools → Requests** 로 이동합니다.
3. 서버 세부 정보와 선언된 도구를 검토합니다.
4. 필요한 **Microsoft Entra 권한**을 부여합니다.
5. 요청을 **승인(Approve)** 합니다.

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

승인이 완료되면 서버가 **Registry**에 나타나며, 에이전트 제작자(maker)가 Copilot Studio에서 사용할 수 있게 됩니다.

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

## 7. 도구 품질 평가 (선택 사항)

등록 전에 Agent 365 CLI로 도구 정의의 품질을 평가할 수 있습니다.

```bash
a365 develop-mcp evaluate --server-url http://localhost:3000/mcp
```

이 명령은 도구 이름, 설명, 매개변수 스키마를 채점하는 품질 리포트를 생성합니다.
