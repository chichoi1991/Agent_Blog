---
layout: "chapter"
date: 2026-03-17
title: "Microsoft Copilot Studio ❤️ MCP"
short_title: "Copilot Studio + MCP"
description: "MCP 서버를 배포하고 Microsoft Copilot Studio에 연결하는 실전 랩입니다. Node.js MCP 서버를 로컬 또는 Azure에 배포하고 GitHub Copilot 및 Copilot Studio와 연동합니다."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/mcs-mcp/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-17"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/mcs-mcp/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🤖 Microsoft Copilot Studio ❤️ MCP](https://microsoft.github.io/agent-academy/special-ops/mcs-mcp/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# 🤖 Microsoft Copilot Studio ❤️ MCP

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/MCP_Joker_Badge.png' | relative_url }}" alt="MCP Joker Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP Joker Badge</figcaption></figure>

에이전트 여러분, 임무를 받아들인다면 — **MCP 서버**를 배포하고 **Microsoft Copilot Studio**에 연결하세요. 험난한 길이 될 수 있지만 프로토콜을 믿으세요. 엔드포인트 하나도 미설정으로 두지 마세요. 🎯

<div class="info-box note" markdown="1">
**이 미션은 현재 클래식 Copilot Studio 환경을 사용합니다**

Microsoft Copilot Studio는 새로운 작성 환경을 롤아웃 중입니다. 이 미션의 Copilot Studio 관련 스크린샷과 단계는 **클래식 환경**을 사용합니다. 화면이 다르게 보인다면 계속하기 전에 오른쪽 상단에서 **New Experience**를 끄세요.
</div>

## ❓ MCP란 무엇인가요?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)은 [Anthropic](https://www.anthropic.com/)이 정의한 오픈 프로토콜로, 애플리케이션이 LLM에 컨텍스트를 제공하는 방법을 표준화합니다. MCP는 AI 모델을 다양한 데이터 소스 및 도구와 연결하는 표준화된 방법을 제공합니다. MCP를 통해 메이커는 기존 지식 서버와 API를 Copilot Studio에 직접 원활하게 통합할 수 있습니다.

## 🆚 MCP vs 커넥터

MCP와 커넥터 중 언제 무엇을 사용해야 할까요? MCP가 커넥터를 대체할까요?

MCP 서버는 커넥터 인프라를 사용해 Copilot Studio에서 사용 가능하므로, 이 질문들은 사실 적용되지 않습니다. MCP 서버가 커넥터 인프라를 사용한다는 사실은 [Virtual Network](https://learn.microsoft.com/power-platform/admin/vnet-support-overview) 통합, [데이터 손실 방지](https://learn.microsoft.com/power-platform/admin/wp-data-loss-prevention) 제어, [다양한 인증 방법](https://learn.microsoft.com/connectors/custom-connectors/#2-secure-your-api) 등 엔터프라이즈 보안 및 거버넌스 제어를 활용할 수 있음을 의미합니다. 따라서 MCP와 커넥터는 **함께 쓸 때 더 강력**합니다.

## ⚙️ 사전 요구사항

- Visual Studio Code 설치 ([다운로드](https://code.visualstudio.com/download))
- Node v22 (가능하면 [nvm for Windows](https://github.com/coreybutler/nvm-windows) 또는 [nvm](https://github.com/nvm-sh/nvm)으로 설치)
- Docker 설치 ([다운로드](http://aka.ms/azure-dev/docker-install))
- Azure Developer CLI 설치 ([다운로드](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd))
- Azure 구독 (결제 수단 추가된 것)
- Copilot Studio 체험판 또는 개발자 계정

## 🧪 Lab 1.1 - MCP 서버 설정

이제 선택지가 있습니다! 서버를 로컬에서 실행하거나 Azure에 배포할 수 있습니다.

두 방법 모두에 필요한 공통 단계가 있습니다:

1. Jokes MCP Server를 다운로드합니다.

    다운로드 링크: [https://download-directory.github.io/?url=https://github.com/microsoft/agent-academy/tree/main/docs/special-ops/mcs-mcp/source&filename=jokes-mcp-server](https://download-directory.github.io/?url=https://github.com/microsoft/agent-academy/tree/main/docs/special-ops/mcs-mcp/source&filename=jokes-mcp-server)

1. zip 파일을 압축 해제합니다.

1. Visual Studio Code를 열고 압축 해제한 폴더를 엽니다.

1. `ctrl` + `` ` `` (Windows/Linux) 또는 `cmd` + `` ` `` (Mac)을 눌러 Visual Studio Code에서 터미널을 엽니다.

### 🏃‍♀️ MCP 서버 로컬 실행

1. 다음 명령어를 실행해 의존성을 설치합니다:

    ```bash
    npm install
    ```

1. 다음 명령어를 실행해 서버를 빌드하고 시작합니다:

    ```bash
    npm run build && npm run start
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/vscode-terminal-run-start.png' | relative_url }}" alt="서버 빌드 및 시작 후 터미널 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>서버 빌드 및 시작 후 터미널 화면</figcaption></figure>

1. Visual Studio Code 터미널 상단에서 **PORTS**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/vscode-terminal-ports.png' | relative_url }}" alt="터미널이 열려 있고 PORTS 탭이 강조된 VS Code 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>터미널의 PORTS 탭</figcaption></figure>

1. 녹색 **Forward a Port** 버튼을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/vscode-terminal-ports-forward.png' | relative_url }}" alt="Forward a Port 버튼이 강조된 PORTS 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Forward a Port 버튼</figcaption></figure>

1. 포트 번호로 `3000`을 입력합니다 (5단계에서 실행했을 때 표시된 포트와 같아야 합니다). GitHub 로그인을 요청받으면 로그인하세요. 포트 포워딩 기능을 사용하려면 필요합니다.

1. 방금 추가한 행을 오른쪽 클릭하고 **Port visibility** > **Public**을 선택해 서버를 공개적으로 사용 가능하게 합니다.

1. **Forwarded address**를 Ctrl + 클릭합니다 (`https://something-3000.something.devtunnels.ms` 형식).

1. 팝업에서 **Copy**를 선택해 URL을 복사합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/vscode-terminal-ports-setup.png' | relative_url }}" alt="포트, 포워드된 주소, 가시성이 강조된 PORTS 설정 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>PORTS 설정 화면</figcaption></figure>

1. 브라우저 주소창에 URL을 붙여넣고 뒤에 `/mcp`를 추가한 후 Enter를 누릅니다.

모두 정상적으로 진행되면 다음 오류 메시지가 표시됩니다:

```json
{"jsonrpc":"2.0","error":{"code":-32000,"message":"Method not allowed."},"id":null}
```

걱정하지 마세요 - 이 오류 메시지는 정상입니다!

### 🌎 Azure에 배포

<div class="info-box note" markdown="1">
**중요**: [사전 요구사항](#prerequisites)에 나와 있듯이 이 부분을 진행하려면 [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd)가 머신에 설치되어 있어야 합니다.
</div>

아직 로그인하지 않았다면 Azure Developer CLI에 로그인합니다:

```bash
azd auth login
```

<div class="info-box note" markdown="1">
**경고**: `azd up`을 실행하면 Azure에서 공개적으로 사용 가능한 MCP 서버가 실행됩니다. 이상적으로는 원하지 않는 상황입니다. 랩을 완료한 후에는 반드시 `azd down`을 실행해 Azure 구독에서 모든 리소스를 삭제하세요.
</div>

터미널에서 다음 명령어를 실행합니다:

```bash
azd up
```

고유한 환경 이름으로 `mcsmcplab` 또는 비슷한 이름을 입력합니다. 사용할 Azure 구독을 선택하고 위치 값을 선택합니다. 서버 배포에 몇 분이 걸립니다. 완료되면 마지막에 표시된 URL에 `/mcp`를 추가해 접속할 수 있습니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/azd-deploy-server.png' | relative_url }}" alt="Azd 서버 배포 출력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Azd 서버 배포 출력</figcaption></figure>

다시 다음 오류가 표시됩니다:

```json
{"jsonrpc":"2.0","error":{"code":-32000,"message":"Method not allowed."},"id":null}
```

## 🧪 Lab 1.2 - Visual Studio Code에서 Jokes MCP Server 사용

Jokes MCP Server를 사용하려면 서버 URL(devtunnel URL 또는 배포된 Azure Container App URL)에 `/mcp`를 붙인 것을 MCP 서버로 Visual Studio Code에 추가해야 합니다.

1. `ctrl` + `shift` + `P` (Windows/Linux) 또는 `cmd` + `shift` + `P` (Mac)를 누르고 `MCP`를 입력합니다.

1. **MCP: Add Server...**를 선택합니다.

1. **HTTP (HTTP or Server-Sent Events)**를 선택합니다.

1. 입력 상자에 서버 URL을 붙여넣습니다 (끝에 `/mcp` 포함).

1. `Enter`를 누릅니다.

1. 서버 이름을 입력합니다 (예: `JokesMCP`).

1. **User Settings**를 선택해 MCP 서버 설정을 사용자 설정에 저장합니다.

    이렇게 하면 `settings.json` 파일에 MCP 서버가 추가됩니다:
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/settings.png' | relative_url }}" alt="settings.json 파일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>settings.json 파일</figcaption></figure>

1. **GitHub Copilot**을 엽니다.

1. **Agent** 모드에 있는지 확인합니다.

1. 도구 아이콘을 선택할 때 **JokesMCP** 서버 액션이 선택되어 있는지 확인합니다:

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/tools-menu.png' | relative_url }}" alt="GitHub Copilot의 도구 메뉴" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>GitHub Copilot의 도구 메뉴</figcaption></figure>

1. 다음 질문을 입력합니다:

    ```text
    Get a chuck norris joke from the Dev category
    ```

다음과 같은 응답이 표시됩니다:

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/github-copilot-get-joke.png' | relative_url }}" alt="Dev 카테고리 농담 요청과 GitHub Copilot의 응답 스크린샷" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Dev 카테고리 농담 요청과 응답</figcaption></figure>

이제 Visual Studio Code에 `JokesMCP` 서버가 추가되었습니다!

## 🧪 Lab 1.3 - Microsoft Copilot Studio에서 Jokes MCP Server 사용

Microsoft Copilot Studio에서 Jokes MCP Server를 사용하려면 에이전트를 만들고 MCP 서버를 추가해야 합니다.

### 에이전트 생성 및 MCP 서버 도구 추가

1. [Copilot Studio](https://copilotstudio.microsoft.com/)로 이동합니다.

1. 오른쪽 상단의 환경 선택기를 선택합니다.

1. 왼쪽 탐색에서 **Agents**를 선택합니다.

1. **Create blank agent** 버튼을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/newagent.png' | relative_url }}" alt="새 에이전트 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 에이전트 생성</figcaption></figure>

    <div class="info-box note" markdown="1">
    **참고**: 에이전트 생성이 시작됩니다. 보통 10초 이내에 에이전트가 표시되지만, 모든 것이 프로비저닝되려면 약 1분이 걸립니다. 프로비저닝이 완료되면 상단에 녹색 바와 함께 `Your agent has been provisioned.` 메시지가 표시됩니다.
    </div>

1. 프로비저닝이 완료되면 개요 페이지의 세부 정보 카드에서 **Edit**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/editname.png' | relative_url }}" alt="이름 편집" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>이름 편집</figcaption></figure>

1. 이름을 다음으로 변경합니다:

    ```text
    Jokester
    ```

1. 다음 **Description**을 추가합니다:

    ```text
    A humor-focused agent that delivers concise, engaging jokes only upon user request, adapting its style to match the user's tone and preferences. It remains in character, avoids repetition, and filters out offensive content to ensure a consistently appropriate and witty experience.
    ```

1. **Save**를 선택해 변경사항을 저장합니다.

1. 개요 페이지의 instructions 카드에서 **Edit**를 선택합니다.

1. 다음 **Instructions**를 추가합니다:

    ```text
    You are a joke-telling assistant. Your sole purpose is to deliver appropriate, clever, and engaging jokes upon request. Follow these rules:
    
    * Respond only when the user asks for a joke or something related (e.g., "Tell me something funny").
    * Match the tone and humor preference of the user based on their input—clean, dark, dry, pun-based, dad jokes, etc.
    * Never break character or provide information unrelated to humor.
    * Keep jokes concise and clearly formatted.
    * Avoid offensive, discriminatory, or NSFW content.
    * When unsure about humor preference, default to a clever and universally appropriate joke.
    * Do not repeat jokes within the same session.
    * Avoid explaining the joke unless explicitly asked.
    * Be responsive, witty, and quick.
    ```

1. **Save**를 선택해 Instructions를 저장합니다.

1. 상단 메뉴에서 **Tools**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/tools.png' | relative_url }}" alt="Tools 메뉴" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Tools 메뉴</figcaption></figure>

1. 파란색 **Add a tool** 버튼을 선택합니다.

1. **Create new** 텍스트 아래의 **Model Context Protocol** 버튼을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/create-mcp.png' | relative_url }}" alt="MCP 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 생성</figcaption></figure>

1. 이름을 입력합니다:

    ```text
    Jokes MCP Server
    ```

1. 설명을 입력합니다:

    ```text
    MCP server that fetches Chuck Norris and dad jokes on demand.
    ```

1. devtunnel URL을 입력합니다 (`https://something-3000.something.devtunnels.ms/mcp` 또는 Azure에 배포된 MCP 서버 URL).

1. **Create**를 선택해 MCP 서버를 만듭니다.

    Copilot Studio가 내부적으로 커넥터를 만들고 있어 몇 초가 걸립니다.

1. **Not connected** (1)와 **Create new Connection** (2)을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/create-connection-mcp-create.png' | relative_url }}" alt="액션 및 연결" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>액션 및 연결</figcaption></figure>

1. **Create**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/create-connection-action-create.png' | relative_url }}" alt="연결 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 생성</figcaption></figure>

1. **Add and configure**를 선택해 도구를 에이전트에 추가합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/add-tool-to-agent.png' | relative_url }}" alt="에이전트에 도구 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트에 도구 추가</figcaption></figure>

    <div class="info-box note" markdown="1">
    **팁**: 이렇게 하면 MCP 서버가 에이전트에 추가됩니다. **Add and configure**를 선택한 후 나타나는 페이지에서 Copilot Studio 내 MCP 서버의 도구들을 확인할 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/mcp-server-tools.png' | relative_url }}" alt="MCP 서버 도구들" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 서버 도구들</figcaption></figure>
    </div>

1. **Test your agent** 패널의 **+ 아이콘**을 선택해 새 테스트 세션을 시작합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/start-new-testing-session.png' | relative_url }}" alt="테스트 패널 새로고침" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>테스트 패널 새로고침</figcaption></figure>

1. **화살표 아이콘**을 선택해 테스트 패널을 확장합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/expand-test-pane.png' | relative_url }}" alt="테스트 패널 확장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>테스트 패널 확장</figcaption></figure>

1. **Test your agent** 패널에 다음 메시지를 입력합니다:

    ```text
    Can I get a Chuck Norris joke?
    ```

    먼저 연결이 필요하다는 메시지가 표시됩니다.

1. **Open connection manager**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/connection-prompt.png' | relative_url }}" alt="추가 권한" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 프롬프트</figcaption></figure>

1. **Jokes MCP Server** 옆의 **Connect**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/mcp-server-connect.png' | relative_url }}" alt="JokesMCP에 연결" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>JokesMCP에 연결</figcaption></figure>

1. 연결이 생성될 때까지 기다린 후 **Submit**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/mcp-server-connect-submit.png' | relative_url }}" alt="연결 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 제출</figcaption></figure>

1. 연결 상태가 **Connected**로 표시되어야 합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/mcp-server-connected.png' | relative_url }}" alt="Connected 상태" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Connected 상태</figcaption></figure>

1. 브라우저에서 연결 관리 탭을 닫습니다. 이제 Jokester 에이전트 화면으로 돌아왔어야 합니다.

1. **Test your agent** 패널의 **+ 아이콘**을 선택해 새 테스트 세션을 시작합니다.

1. **Test your agent** 패널에 다음 메시지를 입력합니다:

    ```text
    Can I get a Chuck Norris joke?
    ```

    이제 추가 권한 요청 대신 Chuck Norris 농담이 표시됩니다. 트리거된 도구(get-chuck-joke)와 에이전트가 받은 출력도 확인할 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/chucknorrisjoke.png' | relative_url }}" alt="Chuck Norris 농담" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Chuck Norris 농담 응답</figcaption></figure>

1. **Test your agent** 패널에 다음 메시지를 입력합니다:

    ```text
    Can I get a Dad joke?
    ```

    이제 아빠 개그가 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/dadjoke.png' | relative_url }}" alt="아빠 개그" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>아빠 개그 응답</figcaption></figure>

이로써 Jokes MCP Server가 Microsoft Copilot Studio에서 동작하는 것을 확인했습니다.

## 🧪 Lab 1.4 - Azure 리소스 제거

Azure에 MCP 서버를 배포했다면 Azure 리소스를 반드시 제거하세요. 터미널에서 다음 명령어를 실행합니다:

```bash
azd down
```

이 명령어는 삭제될 리소스를 보여주고 확인을 요청합니다. `y`로 확인하면 리소스가 삭제됩니다. 몇 분이 걸릴 수 있지만 최종적으로 확인 메시지가 표시됩니다:

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/azd-down-confirmation.png' | relative_url }}" alt="리소스 삭제 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>리소스 삭제 완료</figcaption></figure>

## ✅ 미션 완료

축하합니다, 에이전트 — 미션 완료! MCP 서버를 빌드·배포하고 GitHub Copilot과 Microsoft Copilot Studio에 연결했습니다.

이 미션에서 달성한 것:

✅ **MCP 서버 배포**: Node.js와 Docker를 사용해 커스텀 MCP 서버를 빌드하고 배포했습니다.

✅ **로컬 & 클라우드 호스팅**: 포트 포워딩으로 로컬에서 서버를 실행하고 Azure Developer CLI를 사용해 Azure에 배포했습니다.

✅ **GitHub Copilot 통합**: MCP 서버를 Visual Studio Code에 연결하고 GitHub Copilot Agent Mode에서 사용했습니다.

✅ **Copilot Studio 통합**: MCP 서버를 커스텀 Instructions와 도구 오케스트레이션을 갖춘 Copilot Studio 에이전트에 연결했습니다.

## 🏅 완료 배지 받기

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/MCP_Joker_Badge.png' | relative_url }}" alt="MCP Joker Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP Joker Badge</figcaption></figure>

배지 요청 양식을 제출하고 모든 필수 질문에 답하세요:

[https://aka.ms/agent-academy-special-ops/mcsmcp/form](https://aka.ms/agent-academy-special-ops/mcsmcp/form)

제출이 검토되면 Global AI Community에서 배지 수령 안내 이메일을 받게 됩니다.

<div class="info-box note" markdown="1">
**팁**: 이메일이 보이지 않으면 스팸 또는 정크 폴더를 확인하세요.
</div>

## 📚 전술 자료

📖 [Microsoft Copilot Studio MCP 발표 블로그](https://aka.ms/mcsmcp)

📖 [Microsoft Copilot Studio MCP 문서](http://aka.ms/mcsmcpdocs)

📖 [Model Context Protocol 개요](https://modelcontextprotocol.io/introduction)
