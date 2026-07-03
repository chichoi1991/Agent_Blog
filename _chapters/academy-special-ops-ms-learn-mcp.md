---
layout: "chapter"
date: 2026-03-17
title: "Microsoft Learn MCP Server"
short_title: "MS Learn MCP"
description: "Microsoft Learn Docs MCP Server를 Copilot Studio 에이전트에 연결해 실시간 문서 접근을 구현하는 랩입니다. 로컬 배포 없이 바로 시작할 수 있는 가장 쉬운 MCP 연동 방법입니다."
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
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [📚 Microsoft Learn MCP Server](https://microsoft.github.io/agent-academy/special-ops/ms-learn-mcp/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# 📚 Microsoft Learn MCP Server

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/Academy_LearnMCP_Badge.png' | relative_url }}" alt="Microsoft Learn MCP Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Microsoft Learn MCP Badge</figcaption></figure>

에이전트 여러분, 임무를 받아들인다면 — **Operation Open Book**: **Microsoft Learn Docs MCP Server**를 Copilot Studio 에이전트에 연결해 전체 Microsoft Learn 문서 라이브러리에 실시간으로 접근하도록 만드세요. 더 이상 에이전트가 오래된 정보나 잘못된 제품 정보를 응답하지 않게 됩니다. 여러분의 에이전트는 이제 현장에서 가장 박식한 오퍼레이티브가 될 것입니다. 📖🎯

<div class="info-box note" markdown="1">
**이 미션은 현재 클래식 Copilot Studio 환경을 사용합니다**

Microsoft Copilot Studio는 새로운 작성 환경을 롤아웃 중입니다. 이 미션의 스크린샷과 단계는 **클래식 환경**을 사용합니다. 화면이 다르게 보인다면 계속하기 전에 오른쪽 상단에서 **New Experience**를 끄세요.
</div>

## 🔧 빌드할 것

- Microsoft Learn Docs MCP Server에 연결된 Copilot Studio 에이전트
- 에이전트에 `microsoft_docs_search` 및 관련 도구를 노출하는 MCP 연결
- 실시간 문서를 통해 모든 Microsoft 제품에 관한 질문에 정확하게 답변하는 에이전트

## ⚙️ 사전 요구사항

- Microsoft Copilot Studio 체험판 또는 유료 계정. 계정이 없다면 [코스 설정](https://microsoft.github.io/agent-academy/recruit/00-course-setup/) 안내를 확인하세요.

<div class="info-box note" markdown="1">
**참고**: 로컬 도구가 필요 없습니다. Microsoft Learn MCP Server는 **원격으로 호스팅되는 서버**입니다. Copilot Studio에서 MCP를 시작하는 가장 쉬운 방법 중 하나입니다.
</div>

### Microsoft Learn MCP Server란?

Microsoft Learn MCP Server를 에이전트의 **실시간 도서관 카드**로 생각하세요. 개별 Microsoft 문서 소스를 지식으로 힘들게 추가하는 대신, 사용자가 질문할 때 에이전트가 Microsoft Learn 라이브러리에 들어가 무엇이든 찾아볼 수 있는 영구적인 카드를 건네주는 것입니다.

서버는 Microsoft가 다음 주소에서 공개적으로 호스팅합니다:

```text
https://learn.microsoft.com/api/mcp
```

Model Context Protocol (MCP)을 구현하는 이 서버는 AI 모델이 외부 도구를 일관되게 호출하는 방법을 제공하는 오픈 표준입니다. Microsoft Learn 서버가 **원격으로 공개 접근 가능**하기 때문에 사용하기 위해 백엔드 코드를 한 줄도 작성할 필요가 없습니다. 그냥 Copilot Studio를 엔드포인트로 향하게 하고 쿼리를 시작하면 됩니다.

### 무엇을 할 수 있나요?

연결되면 서버는 대화 중 에이전트가 호출할 수 있는 도구를 노출합니다. 주요 도구는 `microsoft_docs_search`로, 전체 Microsoft Learn 문서 인덱스를 쿼리하고 관련 내용을 반환합니다. 에이전트는 이를 통해:

- Power Platform, Azure, Microsoft 365 등에 관한 질문에 답변
- 공식적이고 최신 문서 페이지 링크 반환
- 실제 Microsoft 콘텐츠로 답변을 grounding해 환각 감소

관련 샘플 코드를 찾기 위해 Learn을 탐색하는 `microsoft_code_sample_search` 도구도 있습니다.

### 왜 중요한가요?

외부 grounding 없이 에이전트는 모델 기억에 의존하는데, 이는 오래될 수 있습니다. 그러나 Microsoft Learn 루트 URL을 정적 지식으로 추가하는 것도 한계가 있습니다. 이는 주기적인 인덱싱에 의존하고, 깊거나 새로 게시된 페이지를 놓칠 수 있으며, 각 질문에 대해 실시간 의도 기반 검색을 수행하지 않습니다. Microsoft Learn MCP Server는 에이전트가 응답 시점에 실시간 문서 검색을 실행할 수 있게 해 이 문제를 해결합니다.

## 🎯 시나리오

Zava는 Microsoft 365, Azure, Power Platform 질문을 지원하는 내부 에이전트를 구축하고 있습니다. Microsoft 제품 문서 지식 베이스를 수동으로 큐레이팅하는 대신, 팀은 에이전트가 실시간으로 Microsoft Learn에서 직접 답변을 가져오기를 원합니다 — 항상 정확하고 항상 최신으로. 여러분은 이를 구현하는 에이전트 빌더입니다.

## 🧪 Lab 1.1 - 지원 에이전트 생성

첫 번째 단계는 Microsoft Learn 기반 헬프데스크의 기반이 될 새 Copilot Studio 에이전트를 만드는 것입니다.

1. [Microsoft Copilot Studio](https://copilotstudio.microsoft.com)로 이동해 로그인합니다.

1. 홈 페이지에서 **Create Agent**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/create-agent.png' | relative_url }}" alt="에이전트 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 생성</figcaption></figure>

1. Details 섹션에서 **Edit**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/edit-details.png' | relative_url }}" alt="세부 정보 편집" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>세부 정보 편집</figcaption></figure>

1. **Name** 필드에 다음을 입력합니다:

    ```text
    Microsoft Product Support Assistant
    ```

1. **Description** 필드에 다음을 입력합니다:

    ```text
    An agent that answers questions about Microsoft products by searching live Microsoft Learn documentation.
    ```

1. **Save**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/save-details.png' | relative_url }}" alt="저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>세부 정보 저장</figcaption></figure>

## 🧪 Lab 1.2 - Microsoft Learn Docs MCP Server 연결

다음으로 Microsoft Learn Docs MCP Server를 Copilot Studio의 도구로 추가해 에이전트에서 사용 가능하게 만듭니다.

1. Tools 섹션에서 **Add tool** 버튼을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/add-tool.png' | relative_url }}" alt="도구 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>도구 추가</figcaption></figure>

1. **Model Context Protocol** 탭을 선택하고 `Microsoft Learn`을 검색합니다. 옵션 목록에서 **Microsoft Learn Docs MCP Server**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/tool-search.png' | relative_url }}" alt="MCP 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 서버 검색</figcaption></figure>

1. **Connection** 옆의 드롭다운을 선택하고 **Create new connection**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/create-connection.png' | relative_url }}" alt="연결 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 생성</figcaption></figure>

1. **Create**를 선택해 연결을 만듭니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/create-connection-confirm.png' | relative_url }}" alt="연결 생성 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 생성 확인</figcaption></figure>

1. **Add and configure**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/add-configure.png' | relative_url }}" alt="추가 및 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>추가 및 구성</figcaption></figure>

1. MCP 세부 정보 화면으로 이동합니다. **Tools** 섹션으로 스크롤해 세 가지 도구가 포함되어 있으며 토글로 각 도구를 활성화/비활성화할 수 있음을 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/observe-tools.png' | relative_url }}" alt="도구 목록" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 서버 도구 목록</figcaption></figure>

## 🧪 Lab 1.3 - Instructions 추가

Learn MCP 서버가 추가되었으니 에이전트가 무엇을 해야 할지 알 수 있도록 Instructions를 추가합니다.

1. **Overview** 탭을 선택해 에이전트 개요 화면으로 돌아갑니다.

1. Instructions 섹션 옆의 **Edit**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/edit-instructions.png' | relative_url }}" alt="Instructions 편집" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Instructions 편집</figcaption></figure>

1. **Instructions** 필드에 다음을 입력합니다:

    ```text
    You are a helpful Microsoft documentation assistant. When a user asks a question about any Microsoft product, service, or technology, use the microsoft_docs_search tool to find relevant, accurate information from Microsoft Learn. If a user asks a question about a code sample, use the microsoft_code_sample_search tool to find a relevant code sample. Always cite the source documentation URL in your response. If the search does not return a relevant result, tell the user and suggest they visit https://learn.microsoft.com directly.
    ```

<div class="info-box note" markdown="1">
**팁**: MCP 도구를 사용할 때 강력한 Instructions가 매우 중요합니다. "microsoft_docs_search 도구를 사용하라"는 지시는 에이전트가 내장된 지식 대신 MCP 도구를 명시적으로 호출하도록 합니다.
</div>

1. **Save**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/save-instruction2.png' | relative_url }}" alt="저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Instructions 저장</figcaption></figure>

## 🧪 Lab 1.4 - 에이전트 테스트

문서 기반 에이전트가 실제로 동작하는지 확인할 시간입니다.

1. 오른쪽 상단의 **Test**를 선택해 테스트 패널을 엽니다.

1. 다음 메시지를 보냅니다:

    ```text
    What types of agents can I build in Copilot Studio?
    ```

1. 에이전트를 처음 실행할 때 MCP 서버 연결 확인을 요청할 수 있습니다. **Open Connection Manager** 텍스트를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/connection-manager.png' | relative_url }}" alt="연결 관리자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 관리자</figcaption></figure>

1. MCP 서버에 연결하려면 **Connect** 옵션을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/connect-manager-connect.png' | relative_url }}" alt="연결" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 서버 연결</figcaption></figure>

1. **Submit**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/submit-connection.png' | relative_url }}" alt="제출" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 제출</figcaption></figure>

1. **Connected** 상태를 확인합니다. 연결 창을 닫고 에이전트로 돌아갑니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/connected.png' | relative_url }}" alt="Connected" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Connected 상태</figcaption></figure>

1. 테스트 창에서 **Retry**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/retry.png' | relative_url }}" alt="재시도" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>재시도</figcaption></figure>

1. 에이전트의 응답을 확인합니다. 다음을 수행해야 합니다:
    - MCP 서버의 `microsoft_docs_search` 도구를 호출하고 Microsoft Learn 문서 페이지 링크가 포함된 grounded 답변을 반환합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/test-result-valid.png' | relative_url }}" alt="테스트 결과" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>테스트 결과</figcaption></figure>

1. 추가 질문을 보냅니다:

    ```text
    What are the licensing requirements for Copilot Studio?
    ```

1. 에이전트가 다시 Microsoft Learn을 검색하고 정확한 인용 콘텐츠를 반환하는지 확인합니다.

    <div class="info-box note" markdown="1">
    **참고**: 에이전트가 MCP 도구를 호출하는 동안 짧은 일시 정지가 있을 수 있습니다. 이는 예상된 동작입니다 — 에이전트가 Microsoft Learn MCP Server에 실시간 HTTP 호출을 하고 실제 결과를 반환하고 있습니다.
    </div>

1. 새 테스트 세션을 시작하고 다음 메시지를 보냅니다:

    ```text
    Find a good code sample for creating a PCF control
    ```

1. 이번에는 다른 MCP 서버 도구인 `microsoft_code_sample_search`를 호출해 관련 코드 샘플을 찾는 것을 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/test-code-sample.png' | relative_url }}" alt="코드 샘플 테스트 결과" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>코드 샘플 검색 결과</figcaption></figure>

## 🧪 Lab 1.5 - 폴백 동작 테스트

Instructions에서 "폴백 동작"을 정의했습니다. 즉, 에이전트가 답변을 찾지 못할 때 어떻게 해야 하는지를 지정했습니다. 이는 Instructions에 다음 줄을 추가해 구현했습니다: `If the search does not return a relevant result, tell the user and suggest they visit https://learn.microsoft.com directly.`

에이전트 설정을 조정해 이를 더 제어할 수 있습니다. 모든 에이전트에는 사용하는 모델의 기본 지식과 웹의 정보를 사용하는 기능이 포함되어 있습니다. 에이전트가 명시적으로 구성한 지식 소스와 도구만 사용하도록 하려면 이 기능을 끄는 것이 좋습니다.

1. **Overview** 탭에서 **Settings** 버튼을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/settings-btn.png' | relative_url }}" alt="Settings 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Settings 버튼</figcaption></figure>

1. **Knowledge** 섹션으로 스크롤해 **Use general knowledge**와 **Use information from the web** 옵션을 끕니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/settings-knowledge.png' | relative_url }}" alt="Settings 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>지식 설정 구성</figcaption></figure>

1. 오른쪽 상단의 **X**를 선택해 설정 화면을 닫습니다.

1. 이제 폴백 로직을 테스트합니다. 다음 메시지를 보냅니다:

    ```text
    What is the recipe for chocolate cake?
    ```

1. 에이전트가 적절하게 응답하는지 확인합니다 — 관련 Microsoft Learn 결과를 찾을 수 없거나 Microsoft Learn에서 직접 검색하도록 안내해야 합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/test-invalid.png' | relative_url }}" alt="폴백 테스트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>폴백 동작 테스트</figcaption></figure>

## ✅ 미션 완료

축하합니다, 에이전트 — **Operation Open Book** 완료! Copilot Studio 에이전트가 이제 실시간 MCP 연결을 통해 전체 Microsoft Learn 문서 라이브러리에 연결되었습니다.

이 미션에서 달성한 것:

✅ **MCP 기본 이해**: Model Context Protocol이 AI 에이전트에게 실시간 도구 접근을 가능하게 하는 방법을 이해했습니다.

✅ **원격 MCP 연결**: 로컬 배포 없이 Copilot Studio에서 호스팅된 MCP 서버를 등록하고 연결했습니다.

✅ **도구 활성화**: Copilot Studio 에이전트에 MCP 노출 도구를 활성화했습니다.

✅ **Instructions 엔지니어링**: MCP 도구 사용을 지시하고 폴백 응답을 제어하는 에이전트 Instructions를 작성했습니다.

## 🏅 완료 배지 받기

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/Academy_LearnMCP_Badge.png' | relative_url }}" alt="Learn MCP Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Learn MCP Badge</figcaption></figure>

배지 요청 양식을 제출하고 모든 필수 질문에 답하세요:

[https://aka.ms/agent-academy-special-ops/ms-learn-mcp/form](https://aka.ms/agent-academy-special-ops/ms-learn-mcp/form)

제출이 검토되면 Global AI Community에서 배지 수령 안내 이메일을 받게 됩니다.

<div class="info-box note" markdown="1">
**팁**: 이메일이 보이지 않으면 스팸 또는 정크 폴더를 확인하세요.
</div>

## 📚 전술 자료

🔗 [Microsoft Copilot Studio ❤️ MCP](https://microsoft.github.io/agent-academy/special-ops/mcs-mcp/) — 커스텀 MCP 서버를 빌드·배포하고 Copilot Studio에 연결합니다.

🔗 [Power Platform CLI MCP Server](https://microsoft.github.io/agent-academy/special-ops/pac-cli-mcp/) — MCP를 사용해 자연어로 Power Platform 테넌트를 제어합니다.

📖 [Microsoft Learn MCP Server 문서](https://learn.microsoft.com/microsoft-copilot-studio/connections-mcp)

📖 [Model Context Protocol 개요](https://modelcontextprotocol.io/introduction)

📖 [Copilot Studio MCP 연결](https://learn.microsoft.com/microsoft-copilot-studio/connections-mcp)
