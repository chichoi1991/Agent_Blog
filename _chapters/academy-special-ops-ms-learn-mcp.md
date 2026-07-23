---
layout: "chapter"
date: 2026-03-17
title: "Microsoft Learn MCP Server"
short_title: "MS Learn MCP"
description: "Microsoft Learn Docs MCP Server를 Copilot Studio 에이전트에 연결해 실시간 문서 기반 답변을 구현하는 Special Ops 랩입니다."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/ms-learn-mcp/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-17"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/ms-learn-mcp/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [📚 Microsoft Learn MCP Server](https://microsoft.github.io/agent-academy/special-ops/ms-learn-mcp/)를 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# 📚 Microsoft Learn MCP Server

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/Academy_LearnMCP_Badge.png' | relative_url }}" alt="Microsoft Learn MCP Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Microsoft Learn MCP Badge</figcaption></figure>

이번 미션 **Operation Open Book**에서는 **Microsoft Learn Docs MCP Server**를 Copilot Studio 에이전트에 연결해, Microsoft Learn 문서를 실시간으로 조회하도록 구성합니다. 모델 내부 기억에만 의존하지 않고 최신 공식 문서를 근거로 답변하게 만들 수 있습니다.

<div class="info-box note" markdown="1">
**중요**: 이 미션은 Copilot Studio **새 작성 환경(New Experience)** 기준입니다. 화면이 다르면 오른쪽 위에서 New Experience를 켜고 진행하세요.
</div>

## 🔧 이 랩에서 만들 것

- Microsoft Learn Docs MCP Server에 연결된 Copilot Studio 에이전트
- `microsoft_docs_search` 등 MCP 도구를 사용할 수 있는 연결
- Microsoft 제품 질문에 대해 공식 문서를 근거로 답변하는 에이전트

## ⚙️ 사전 요구사항

- Microsoft Copilot Studio 체험판 또는 유료 계정
- 계정이 없다면 [course setup](https://microsoft.github.io/agent-academy/recruit/00-course-setup/) 참고

<div class="info-box note" markdown="1">
**참고**: 로컬 도구 설치가 필요 없습니다. Microsoft Learn MCP Server는 Microsoft에서 호스팅하는 원격 서버입니다.
</div>

### Microsoft Learn MCP Server란?

Microsoft Learn MCP Server는 에이전트에게 "실시간 문서 라이브러리 접근권"을 부여하는 것과 같습니다. 개별 문서를 지식으로 수동 등록하는 대신, 사용자 질문 시점에 문서를 바로 검색해 활용할 수 있습니다.

서버 엔드포인트:

```text
https://learn.microsoft.com/api/mcp
```

이 서버는 Model Context Protocol(MCP)을 구현합니다. MCP는 AI 모델이 외부 도구를 일관된 방식으로 호출하게 해 주는 오픈 표준입니다.

### 무엇을 할 수 있나요?

주요 도구 `microsoft_docs_search`로 Microsoft Learn 인덱스를 검색해 관련 문서를 찾습니다.

- Power Platform, Azure, Microsoft 365 등 제품 질문 답변
- 공식 최신 문서 링크 제공
- 실제 문서 기반 응답으로 환각(hallucination) 감소

또한 코드 샘플 탐색용 `microsoft_code_sample_search` 도구도 사용할 수 있습니다.

### 왜 중요한가요?

외부 grounding 없이 모델 기억만 사용하면 최신성이 떨어질 수 있습니다. 반면 MCP 서버를 연결하면 응답 시점마다 실시간 검색이 이뤄져 최신 문서 기반 답변을 생성할 수 있습니다.

## 🎯 시나리오

Zava 팀은 Microsoft 365, Azure, Power Platform 관련 내부 지원 에이전트를 만들고 있습니다. 수동 지식 베이스 대신 Microsoft Learn 실시간 검색으로 정확도와 최신성을 높이려 합니다. 여러분은 이 연결을 구현하는 에이전트 빌더입니다.

## 🧪 Lab 1.1 - 지원 에이전트 만들기

1. [Microsoft Copilot Studio](https://copilotstudio.microsoft.com)에 로그인하고 오른쪽 위 New Experience가 켜져 있는지 확인합니다.
1. 홈 화면의 **select what you want to build**에서 **Agent**를 선택합니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-01.png' | relative_url }}" alt="Create Agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Agent 생성 시작</figcaption></figure>

1. 왼쪽 상단 **Name your agent**에 아래 이름을 입력합니다.

```text
Microsoft Product Support
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-02.png' | relative_url }}" alt="Name your agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 이름 입력</figcaption></figure>

1. 에이전트는 자동 저장되며, 필요하면 오른쪽 위 **Save**를 눌러 수동 저장할 수 있습니다.

## 🧪 Lab 1.2 - Microsoft Learn Docs MCP Server 연결

1. 오른쪽 구성 패널 **Tools**에서 **+ Add tool** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-03.png' | relative_url }}" alt="Add Tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>도구 추가</figcaption></figure>

1. **Model Context Protocol (MCP)** 탭에서 `Microsoft Learn` 검색 후 **Microsoft Learn Docs MCP Server** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-04.png' | relative_url }}" alt="Select MCP server" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 서버 선택</figcaption></figure>

1. 연결이 없다면 **Not connected** 드롭다운에서 **Create new connection** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-05.png' | relative_url }}" alt="Create new connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 연결 생성</figcaption></figure>

1. **Create**를 눌러 연결 생성

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-06.png' | relative_url }}" alt="Create connection confirm" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 생성 확인</figcaption></figure>

1. **Add** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-07.png' | relative_url }}" alt="Add" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>도구 추가 완료</figcaption></figure>

1. Tools 패널의 서버 칩을 선택해 **Edit**를 열고, `microsoft_docs_search`, `microsoft_code_sample_search`, `microsoft_docs_fetch` 활성화 상태를 확인한 뒤 **Confirm**

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-08.png' | relative_url }}" alt="Observe MCP tools" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 도구 확인</figcaption></figure>

## 🧪 Lab 1.3 - 지시문(Instructions) 추가

1. Build 탭의 **Instructions** 필드를 선택하고 아래 내용을 붙여넣습니다.

```text
You are a helpful Microsoft documentation assistant. When a user asks a question about any Microsoft product, service, or technology, use the microsoft_docs_search tool to find relevant, accurate information from Microsoft Learn. If a user asks a question about a code sample, use the microsoft_code_sample_search tool to find a relevant code sample. Always cite the source documentation URL in your response. If the search does not return a relevant result, tell the user and suggest they visit https://learn.microsoft.com directly.
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-09.png' | relative_url }}" alt="Enter instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Instructions 입력</figcaption></figure>

<div class="info-box note" markdown="1">
**팁**: MCP 도구 사용을 지시문에 명시해야 에이전트가 일반 지식 대신 MCP 도구를 우선 호출합니다.
</div>

1. 오른쪽 위 **Save**를 선택합니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-10.png' | relative_url }}" alt="Save" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>저장</figcaption></figure>

## 🧪 Lab 1.4 - 에이전트 테스트

1. 상단 **Preview** 탭으로 이동

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-11.png' | relative_url }}" alt="Open Preview tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview 탭</figcaption></figure>

1. 채팅 입력창에 아래 메시지 전송

```text
What types of agents can I build in Copilot Studio?
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-12.png' | relative_url }}" alt="Send test message" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>첫 테스트 메시지</figcaption></figure>

1. 최초 호출 시 **Permission Required** 카드가 보이면 **Allow** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-13.png' | relative_url }}" alt="Allow MCP connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 연결 허용</figcaption></figure>

1. 응답에서 `microsoft_docs_search` 호출과 문서 인용(Citations) 확인

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-14.png' | relative_url }}" alt="Grounded test result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>근거 기반 응답 확인</figcaption></figure>

<div class="info-box note" markdown="1">
**팁**: Preview 기본 모드는 도구 호출/계획을 보여주는 테스트 모드입니다. **End user preview**를 켜면 실제 최종 사용자 화면처럼 볼 수 있습니다.
</div>

1. **End user preview**를 켜고 후속 질문 전송

```text
What are the licensing requirements for Copilot Studio?
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-15.png' | relative_url }}" alt="Second test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>후속 질문 테스트</figcaption></figure>

1. 다시 인용 기반 응답을 확인합니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-16.png' | relative_url }}" alt="Follow-up cited result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>후속 질문 응답 확인</figcaption></figure>

<div class="info-box note" markdown="1">
**참고**: MCP 도구 호출 시 잠깐 지연이 발생할 수 있으며 정상 동작입니다.
</div>

1. **New chat**를 누르고 End user preview를 다시 끈 뒤 아래 메시지를 전송합니다.

```text
Find a good code sample for creating a PCF control
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-17.png' | relative_url }}" alt="New chat" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 채팅 시작</figcaption></figure>

1. 이번에는 `microsoft_code_sample_search`가 호출되는지 확인합니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-18.png' | relative_url }}" alt="Code sample result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>코드 샘플 검색 결과</figcaption></figure>

## 🧪 Lab 1.5 - 폴백 동작 테스트

지시문의 폴백 규칙(`관련 결과가 없으면 learn.microsoft.com 방문 안내`)이 실제로 동작하는지 확인합니다.

<div class="info-box note" markdown="1">
**참고**: 새 Copilot Studio에서는 기존의 **Use general knowledge**, **Use information from the web** 토글이 사라졌습니다. 웹 grounding은 Build 탭의 **Search all websites** 지식 소스 제거로 제어합니다.
</div>

1. Build 탭 **Knowledge**에서 **Search all websites** 소스를 X(제거)로 삭제

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-19.png' | relative_url }}" alt="Remove Search all websites" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>웹 검색 지식 소스 제거</figcaption></figure>

1. 상단 **Save** 선택
1. Preview 탭으로 이동해 **New chat** 후 아래 메시지 전송

```text
What is the recipe for chocolate cake?
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-20.png' | relative_url }}" alt="Fallback test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>폴백 테스트 질문</figcaption></figure>

1. 에이전트가 관련 Microsoft Learn 결과 없음 안내 또는 Microsoft 문서 범위로 유도하는지 확인

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-21.png' | relative_url }}" alt="Fallback test result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>폴백 동작 확인</figcaption></figure>

## ✅ 미션 완료

축하합니다! **Operation Open Book** 미션 완료입니다. 에이전트가 이제 Microsoft Learn MCP를 통해 실시간 문서 기반 답변을 수행합니다.

이번 랩에서 달성한 내용:

- ✅ MCP 기본 개념 이해
- ✅ 원격 MCP 서버 연결(로컬 배포 불필요)
- ✅ MCP 도구 활성화 및 사용
- ✅ 지시문으로 도구 호출/폴백 동작 제어

## 🏅 완료 배지 받기

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/Academy_LearnMCP_Badge.png' | relative_url }}" alt="Learn MCP Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Learn MCP Badge</figcaption></figure>

배지 신청 양식:

[https://aka.ms/agent-academy-special-ops/ms-learn-mcp/form](https://aka.ms/agent-academy-special-ops/ms-learn-mcp/form)

검토 후 Global AI Community에서 배지 안내 메일을 발송합니다.

<div class="info-box note" markdown="1">
**팁**: 메일이 보이지 않으면 스팸/정크 폴더를 확인하세요.
</div>

## 📚 전술 리소스

- 🔗 [Microsoft Copilot Studio ❤️ MCP]({{ '/chapters/academy-special-ops-mcs-mcp/' | relative_url }})
- 🔗 [Power Platform CLI MCP Server]({{ '/chapters/academy-special-ops-pac-cli-mcp/' | relative_url }})
- 📖 [Microsoft Learn MCP Server docs](https://learn.microsoft.com/microsoft-copilot-studio/connections-mcp)
- 📖 [Model Context Protocol overview](https://modelcontextprotocol.io/introduction)
- 📖 [Copilot Studio MCP connections](https://learn.microsoft.com/microsoft-copilot-studio/connections-mcp)
