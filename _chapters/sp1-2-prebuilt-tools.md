---
layout: chapter
title: "Part 2: Pre-built 도구 추가"
short_title: "Pre-built 도구"
description: "특별 워크샵 - Work IQ MCP (Mail, Teams, Copilot) Pre-built 도구 추가"
order: 2
category: special
parent: "sp1"
---

## Part 2: Pre-built 도구 추가 (Work IQ MCP)

> **이전 단계:** [Part 1: 지침 작성]({{ '/chapters/sp1-1-instructions/' | relative_url }}) | **다음 단계:** [Part 3: 커스텀 도구 추가]({{ '/chapters/sp1-3-custom-tools/' | relative_url }})

---

이번 파트에서는 Microsoft가 기본 제공하는 **Work IQ MCP** 도구 3종을 에이전트에 추가합니다.
이 도구들은 사용자의 Microsoft 365 환경(메일, Teams, Copilot 검색)에 접근할 수 있게 해줍니다.

<br>

---

## 1. Work IQ 활성화

에이전트 개요 화면 **도구** 하단의 **Work IQ**를 활성화합니다.

이 기능을 활성화하면:
- 참조자료에 없는 정보도 M365 Copilot의 엔터프라이즈 검색을 통해 탐색 가능 (Fallback)
- Work IQ 기반 MCP 도구들을 카탈로그에서 바로 추가 가능

<br>

---

## 2. Work IQ Mail MCP 추가

### 2-1. 도구 추가 시작

1. 상단 **도구** 섹션 → **+ 도구 추가** → **MCP** 탭을 선택합니다.
2. 스크롤하여 **WorkIQ Mail MCP** 를 선택합니다.

### 2-2. 연결 설정

최초 연결 시 새로운 연결이 필요합니다:
1. **연결** 을 클릭합니다.
2. 현재 로그인된 Microsoft 365 계정으로 인증합니다.
3. **추가 및 구성** 을 선택합니다.

### 2-3. 도구 목록 확인

연결 성공 시 아래 도구들이 활성화됩니다:

| 도구명 | 설명 | 이 에이전트에서의 용도 |
|--------|------|----------------------|
| `SearchMessagesQueryParameters` | 검색 쿼리 기반 메일 검색 | 보고·동향 메일 조회 |
| `CreateDraft` | 메일 초안 생성 | 경영 판단 의견 메일 작성 |
| `UpdateDraft` | 초안 업데이트 | 초안 수정 |
| `AddDraftAttachments` | 초안에 첨부 파일 추가 | 보고서 첨부 |
| `SendEmailWithAttachments` | 첨부 파일과 함께 발송 | 최종 발송 시 |

> **Tip:** 모든 도구를 활성화 상태로 유지합니다. 지침에서 어떤 도구를 사용할지 이미 정의했으므로, 에이전트가 자율적으로 적절한 도구를 선택합니다.

<br>

---

## 3. Work IQ Teams MCP 추가

### 3-1. 도구 추가

1. **+ 도구 추가** → **MCP** 탭 → **WorkIQ Teams MCP** 를 선택합니다.
2. 앞서와 동일하게 연결을 설정합니다.

### 3-2. 핵심 도구

| 도구명 | 설명 | 이 에이전트에서의 용도 |
|--------|------|----------------------|
| `SendMessageToSelf` | 사용자 자신에게 메시지 발송 | **어댑티브 카드 알림 발송** (모든 시나리오의 마지막 단계) |
| `SearchMessages` | Teams 메시지 검색 | 팀 간 커뮤니케이션 내용 파악 |
| `GetChannelMessages` | 채널 메시지 조회 | 특정 채널의 논의 내용 수집 |

> **핵심:** `SendMessageToSelf`는 이 에이전트의 모든 복합 시나리오(A~E)에서 마지막 단계로 사용됩니다. CEO가 Teams에서 어댑티브 카드 형태로 분석 결과를 즉시 확인할 수 있게 합니다.

<br>

---

## 4. Work IQ Copilot MCP 추가

### 4-1. 도구 추가

1. **+ 도구 추가** → **MCP** 탭 → **WorkIQ Copilot MCP** 를 선택합니다.
2. 연결을 설정합니다.

### 4-2. 역할

| 도구명 | 설명 | 이 에이전트에서의 용도 |
|--------|------|----------------------|
| `CopilotSearch` | M365 전체 범위 검색 | **Fallback**: SharePoint + Teams/Mail 에서 답을 찾지 못했을 때 |

> **주의:** 지침에서 이 도구는 **2순위**로 정의했습니다. 1순위(SharePoint + Teams/Mail)에서 적절한 답을 찾지 못한 경우에만 호출됩니다.

<br>

---

## 5. 지식 소스(Knowledge) 연결

SharePoint 사이트의 문서 라이브러리를 지식 소스로 추가합니다.

### 5-1. 지식 소스 추가

에이전트 설정 → **지식** 섹션 → **+ 지식 추가** → **SharePoint** 를 선택합니다.

### 5-2. 추가할 SharePoint 사이트

| 지식 소스명 | SharePoint 경로 | 포함 문서 |
|------------|----------------|-----------|
| **General** | General Shared Documents | 내부 규정, 일반 자료 |
| **Marketing** | Marketing Shared Documents | 마케팅 전략, 캠페인 자료 |
| **Sales** | Sales Shared Documents | 매출 보고, 영업 전략 |
| **Market Research** | Market Research Shared Documents | 시장 조사, 경쟁사 분석 |
| **Project Collaboration** | Project Collaboration Shared Documents | 프로젝트 계획, CAPEX 문서 |

각 사이트의 URL을 입력하고 **추가** 를 클릭합니다.

<br>

---

## ✅ Part 2 완료 체크리스트

- [ ] Work IQ가 활성화되었는가?
- [ ] Work IQ Mail MCP가 연결되고 모든 도구가 활성화되었는가?
- [ ] Work IQ Teams MCP가 연결되고 `SendMessageToSelf` 도구가 활성화되었는가?
- [ ] Work IQ Copilot MCP가 연결되었는가?
- [ ] SharePoint 지식 소스 5개가 모두 추가되었는가?

다음 단계에서 커스텀 MCP 도구를 추가합니다. ➡️ [Part 3: 커스텀 도구 추가]({{ '/chapters/sp1-3-custom-tools/' | relative_url }})
