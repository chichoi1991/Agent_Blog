---
layout: "chapter"
title: "3부 · 커넥터·MCP 추가 (Mail · OneDrive)"
short_title: "커넥터·MCP 추가"
description: "메일 발송·첨부에 필요한 도구를 최소 큐레이션으로 추가."
order: 5
category: "newcs"
parent: "ncs3"
---

## 6. 커넥터·MCP 추가 (Mail · OneDrive)

> **▶ 목표:** 스킬에 인코딩된 작업(메일 발송·링크 첨부)을 실제로 수행하기 위해 필요한 도구를 붙인다. **최소 큐레이션**(겹치는 도구 금지, 2부 3장).

### 6.1 추가할 도구

| 도구 | 용도 | 비고 |
|---|---|---|
| **Work IQ Mail (MCP)** | 메일 초안·발송 | 메일 도구는 **하나만** |
| **OneDrive (MCP)** | 대시보드를 링크로 첨부 | 직접 첨부(Base64) 토큰 폭발 우회 |
| (자동) 코드 인터프리터 | 엑셀 분석·HTML 생성 | 새 코어 기본 역량, 별도 커넥터 불필요 |

1. **Tools → Add a tool** 에서 **Office 365 Outlook** · **비즈니스용 OneDrive**를 고릅니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3-tools-add.png' | relative_url }}" alt="Tools → Add a tool에서 Office 365 Outlook · 비즈니스용 OneDrive 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Tools → Add a tool에서 Office 365 Outlook · 비즈니스용 OneDrive 선택</figcaption>
</figure>

2. Office 365 Outlook 안에서 **Use an MCP server → Work IQ Mail MCP**를 선택합니다(단발 액션이 아니라 MCP 서버로).

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3-tools-mcp.png' | relative_url }}" alt="Office 365 Outlook → Use an MCP server → Work IQ Mail MCP 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Office 365 Outlook → Use an MCP server → Work IQ Mail MCP 선택</figcaption>
</figure>

### 6.2 절차

1. Build 화면 **Tools → Add tool**.
2. **Mail MCP** 추가 → 연결(로그인/권한 동의).
3. **OneDrive MCP** 추가 → 연결.
4. 세션에서 도구가 보이는지 확인.

### 6.3 도구 팁 (2부 3장)

- **겹치는 도구 금지** — 메일 커넥터를 두 개 붙이면 에이전트가 매번 헷갈립니다. Mail MCP 하나만.
- **코드로 되는 건 안 붙인다** — docx/pptx/HTML 생성은 코드 인터프리터로 충분 → 문서 생성 커넥터 불필요.
- **OneDrive는 첨부 토큰 우회용** — HTML을 그대로 붙이면 Base64 변환에 토큰이 터집니다. 업로드 → 링크 첨부가 표준(메일·보고서 스킬에 절차 인코딩됨).

> **짚고 가기:** 세션 시작 시 OneDrive 도구가 보이지 않으면 MCP 재연결이 필요합니다. 메일 첨부가 안 되면 가장 먼저 도구 연결을 확인하세요.

---
