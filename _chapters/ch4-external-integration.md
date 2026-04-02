---
layout: chapter
title: "외부(사내/대외) 시스템 연동 방식"
short_title: "외부 시스템 연동"
description: "Power Automate 연계, 표준 커넥터 활용, HTTP 기반 API 연동, 인증 방식 등 외부 시스템 연동 전략을 다룹니다."
order: 4
---

## Power Automate 연계

Power Automate는 Copilot Studio와 **가장 자연스럽게 통합**되는 자동화 도구입니다. 복잡한 비즈니스 로직, 다단계 승인, 외부 시스템 호출 등 Agent 단독으로 처리하기 어려운 작업을 Power Automate 플로우로 분리할 수 있습니다.

### 커넥터 vs Power Automate 플로우

| 구분 | 커넥터 (직접 호출) | Power Automate 플로우 |
|---|---|---|
| **복잡도** | 단일 작업 (1개 API 호출) | 다단계 처리 (조건, 루프, 병렬) |
| **오류 처리** | 기본 제공 | Try-Catch 등 세밀한 제어 가능 |
| **데이터 변환** | 제한적 | JSON 파싱, 배열 처리 등 유연 |
| **적합 시나리오** | 메일 발송, 메시지 전송 | 승인 워크플로우, 데이터 집계 |

### Power Automate 플로우 생성 및 연결

**Step 1: 플로우 생성**

Power Automate에서 새 플로우를 만들 때, 트리거로 **"Run a flow from Copilot"**을 선택합니다.

**Step 2: 입출력 변수 정의**

```
[입력 변수]
  - to (텍스트): 수신자 이메일
  - subject (텍스트): 제목
  - body (텍스트): 본문 내용
  - cc (텍스트): 참조 (선택)

[출력 변수]
  - result (텍스트): 처리 결과 메시지
```

**Step 3: Copilot Studio에서 호출**

Topic의 Action 노드에서 생성한 플로우를 선택하고, Topic 변수를 플로우 입력 변수에 매핑합니다.

<div class="info-box tip">
<strong>💡 실무 팁</strong>
Power Automate 플로우는 <strong>Copilot Studio와 동일한 환경(Environment)</strong>에 생성해야 연결할 수 있습니다. 환경이 다르면 플로우 목록에 표시되지 않으니 주의하세요.
</div>

---

## 표준 커넥터 활용

Copilot Studio는 **1,000개 이상의 표준/프리미엄 커넥터**를 지원하며, 별도 코딩 없이 다양한 서비스와 연동할 수 있습니다.

### 주요 표준 커넥터

| 커넥터 | 주요 작업 | 활용 시나리오 |
|---|---|---|
| **Office 365 Outlook** | 이메일 발송, 일정 조회 | 알림 메일, 회의 일정 안내 |
| **Microsoft Teams** | 채널 메시지 전송, 멤버 조회 | 팀 알림, 공지 전달 |
| **SharePoint** | 목록 항목 CRUD, 파일 조회 | 데이터 조회, 요청 등록 |
| **Dataverse** | 테이블 레코드 CRUD | 사내 데이터 관리 |
| **Excel Online** | 테이블 데이터 읽기/쓰기 | 보고서 데이터, 로그 기록 |
| **Approvals** | 승인 요청 및 결과 확인 | 결재 프로세스 |

### 커넥터 추가 절차

1. **Actions 탭** → **Add an action** → 커넥터 검색
2. 원하는 작업(Operation) 선택
3. 입력 파라미터를 Topic 변수 또는 고정값으로 지정
4. 인증 방식 설정 (최종 사용자 / 작성자 인증)
5. 테스트 패널에서 동작 확인

### Teams 채널 메시지 전송 예시

**커넥터**: Microsoft Teams  
**작업**: Post message in a chat or channel

| 파라미터 | 값 |
|---|---|
| Posting as | Flow bot |
| Post in | Channel |
| Team | (대상 팀 선택) |
| Channel | (대상 채널 선택) |
| Message | `변수: VarMessageContent` |

---

## HTTP 기반 API 연동

표준 커넥터가 제공되지 않는 **사내 시스템이나 외부 공공 API**와 연동하려면, 커스텀 커넥터 또는 HTTP 요청을 활용합니다.

### 커스텀 커넥터 생성

**Step 1: Power Apps 또는 Power Automate에서 커스텀 커넥터 생성**

1. 커넥터 → 새 커스텀 커넥터 → "빈 커넥터부터 만들기"
2. **일반 정보**: 호스트 URL, Base URL 설정
3. **보안**: 인증 방식 선택 (API Key, OAuth 등)
4. **정의**: API 엔드포인트, 메서드, 파라미터 정의
5. **테스트**: 실제 API 호출하여 응답 확인

**Step 2: 요청/응답 정의**

```
[요청 예시]
GET /api/v1/countries?name={country_name}
Host: api.example.com
Authorization: Bearer {api_key}

[응답 예시]
{
  "country_name": "대한민국",
  "country_code": "KR",
  "population": 51740000,
  "capital": "서울"
}
```

**Step 3: 응답에서 값 추출**

응답 JSON의 각 필드를 출력 변수로 매핑하면, Copilot Studio의 Topic 내에서 해당 값을 활용할 수 있습니다.

### MCP (Model Context Protocol) 연동

Copilot Studio는 **MCP 프로토콜**을 통해 외부 서비스를 도구(Tool)로 연결할 수 있습니다. MCP 서버를 구성하면, Agent가 해당 서버의 기능을 자율적으로 호출합니다.

1. **Actions 탭** → **Add an action** → **MCP Server** 선택
2. MCP 서버 URL 입력 (예: `https://my-mcp-server.azurewebsites.net/sse`)
3. 인증 정보 설정 (API Key 등)
4. 사용 가능한 도구 목록이 자동 로드됨
5. 필요한 도구를 선택하여 활성화

<div class="info-box note">
<strong>📌 참고</strong>
MCP 연동을 활용하면 별도의 커스텀 커넥터나 Power Automate 플로우 없이도 외부 시스템의 기능을 Agent에서 바로 사용할 수 있습니다. 다만, MCP 서버를 별도로 개발·운영해야 하므로, 개발 리소스가 필요합니다.
</div>

---

## 인증 방식 개요

외부 시스템 연동 시 가장 중요한 고려사항 중 하나가 **인증(Authentication)** 입니다.

### 인증 방식별 특징

| 인증 방식 | 설명 | 적합한 시나리오 |
|---|---|---|
| **API Key** | 고정된 키를 헤더/쿼리에 포함 | 공공 데이터 API, 내부 마이크로서비스 |
| **OAuth 2.0** | 사용자/앱 인증 후 토큰 발급 | Microsoft 365, Google, Salesforce 등 |
| **Entra ID (Azure AD)** | Microsoft 조직 인증 체계 | M365 서비스, 사내 Azure 리소스 |
| **기본 인증 (Basic Auth)** | 사용자명:비밀번호 Base64 인코딩 | 레거시 시스템 (보안 유의) |

### Copilot Studio에서의 인증 설정

커넥터 또는 커스텀 커넥터에서 인증을 설정할 때, **"누구의 자격 증명으로 실행할 것인가"**를 결정해야 합니다.

| 설정 | 설명 | 사용 시나리오 |
|---|---|---|
| **최종 사용자 인증 (End User)** | Agent 사용자 본인의 계정으로 인증 | 개인별 메일/일정 접근, 본인 권한 내 데이터 |
| **작성자 제공 인증 (Connection Creator)** | Agent 작성자(관리자)의 계정으로 인증 | 공용 API 호출, 서비스 계정 사용 |

<div class="info-box warning">
<strong>⚠️ 주의</strong>
작성자 제공 인증을 사용하면 모든 사용자가 작성자의 권한으로 외부 시스템에 접근합니다. <strong>최소 권한 원칙</strong>을 적용하고, 서비스 전용 계정을 사용하여 보안 리스크를 최소화하세요.
</div>
