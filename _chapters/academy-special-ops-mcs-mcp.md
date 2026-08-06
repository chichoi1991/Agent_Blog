---
layout: "chapter"
date: 2026-08-04
title: "🤖 Microsoft Copilot Studio ❤️ MCP"
short_title: "Copilot Studio + MCP"
description: "MCP 서버를 배포하고 Microsoft Copilot Studio에 연결하는 실전 랩입니다. Node.js MCP 서버를 로컬 또는 Azure에 배포하고 GitHub Copilot 및 Copilot Studio와 연동합니다."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/mcs-mcp/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-04"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/mcs-mcp/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🤖 Microsoft Copilot Studio ❤️ MCP](https://microsoft.github.io/agent-academy/special-ops/mcs-mcp/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# 🤖 Microsoft Copilot Studio ❤️ MCP

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/MCP_Joker_Badge.png' | relative_url }}" alt="MCP Joker Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP Joker Badge</figcaption></figure>

에이전트 여러분, 임무를 받아들인다면 — 적진 뒤에 **MCP 서버**를 배포하고 **Microsoft Copilot Studio**에 연결하세요. 난기류를 만날 수 있습니다. 프로토콜을 믿고, 어떤 엔드포인트도 설정되지 않은 채 남겨두지 마세요. 🎯

## ❓ MCP란 무엇인가요?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)는 [Anthropic](https://www.anthropic.com/)이 정의한 오픈 프로토콜로, 애플리케이션이 LLM에 컨텍스트를 제공하는 방식을 표준화합니다. MCP는 AI 모델을 다양한 데이터 소스 및 도구와 연결하는 표준화된 방법을 제공합니다. MCP를 사용하면 메이커가 기존 지식 서버와 API를 Copilot Studio에 직접 원활하게 통합할 수 있습니다.

## 🆚 MCP vs 커넥터

언제 MCP를 사용하고, 언제 커넥터를 사용해야 할까요? MCP가 커넥터를 대체할까요?

MCP 서버는 커넥터 인프라를 사용해 Copilot Studio에서 사용할 수 있으므로, 사실 이러한 질문은 크게 적용되지 않습니다. MCP 서버가 커넥터 인프라를 사용한다는 것은 [Virtual Network](https://learn.microsoft.com/power-platform/admin/vnet-support-overview) 통합, [데이터 손실 방지](https://learn.microsoft.com/power-platform/admin/wp-data-loss-prevention) 제어, [여러 인증 방법](https://learn.microsoft.com/connectors/custom-connectors/#2-secure-your-api) 같은 엔터프라이즈 보안 및 거버넌스 제어를 활용할 수 있음을 의미합니다. 이 기능들은 이번 릴리스에서 모두 사용할 수 있으며, AI 기반 에이전트를 위한 실시간 데이터 액세스도 지원합니다.

따라서 MCP와 커넥터는 **함께 사용할 때 더 강력**합니다.

## ⚙️ 사전 요구사항

- Visual Studio Code 설치 ([다운로드](https://code.visualstudio.com/download))
- Node v22 (가능하면 [nvm for Windows](https://github.com/coreybutler/nvm-windows) 또는 [nvm](https://github.com/nvm-sh/nvm)으로 설치)
- Docker 설치 ([다운로드](http://aka.ms/azure-dev/docker-install))
- Azure Developer CLI 설치 ([다운로드](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd))
- Azure 구독 (결제 수단 추가)
- Copilot Studio 평가판 또는 개발자 계정

## 🧪 Lab 1.1 - MCP 서버 설정

이제 선택지가 있습니다! 서버를 로컬에서 실행하거나 Azure에 배포할 수 있습니다.

두 방식 모두에 필요한 공통 단계가 몇 가지 있습니다:

1. Jokes MCP Server를 다운로드합니다.

    다운로드 링크: [https://download-directory.github.io/?url=https://github.com/microsoft/agent-academy/tree/main/docs/special-ops/mcs-mcp/source&filename=jokes-mcp-server](https://download-directory.github.io/?url=https://github.com/microsoft/agent-academy/tree/main/docs/special-ops/mcs-mcp/source&filename=jokes-mcp-server)

1. zip 파일의 압축을 풉니다.

1. Visual Studio Code를 열고 압축을 푼 폴더를 엽니다.

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

1. 포트 번호로 `3000`을 입력합니다. 5단계에서 명령을 실행했을 때 보인 포트 번호와 같아야 합니다. GitHub 로그인을 요청받으면 로그인하세요. 포트 포워딩 기능을 사용하려면 필요합니다.

1. 방금 추가한 행을 오른쪽 클릭하고 **Port visibility** > **Public**을 선택해 서버를 공개적으로 사용할 수 있게 합니다.

1. **Forwarded address**를 Ctrl + 클릭합니다. 주소는 `https://something-3000.something.devtunnels.ms` 같은 형식입니다.

1. 다음 팝업에서 **Copy**를 선택해 URL을 복사합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/vscode-terminal-ports-setup.png' | relative_url }}" alt="포트, 포워드된 주소, 가시성이 강조된 PORTS 설정 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>PORTS 설정 화면</figcaption></figure>

1. 원하는 브라우저를 열고 주소창에 URL을 붙여넣은 뒤 뒤에 `/mcp`를 추가하고 Enter를 누릅니다.

모두 정상적으로 진행되면 다음 오류 메시지가 표시됩니다:

```json
{"jsonrpc":"2.0","error":{"code":-32000,"message":"Method not allowed."},"id":null}
```

걱정하지 마세요. 이 오류 메시지는 문제될 것이 없습니다!

### 🌎 Azure에 배포

<div class="info-box note" markdown="1">
**중요**: 사전 요구사항에 나와 있듯이, 이 부분을 진행하려면 머신에 [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd)가 설치되어 있어야 합니다.
</div>

아직 로그인하지 않았다면 Azure Developer CLI에 로그인합니다.

```bash
azd auth login
```

<div class="info-box note" markdown="1">
**경고**: `azd up`을 실행하면 Azure에서 공개적으로 접근 가능한 MCP 서버가 실행됩니다. 이상적으로는 그대로 두면 안 됩니다. 랩을 완료한 뒤에는 반드시 `azd down`을 실행해 Azure 구독에서 모든 리소스를 삭제하세요. Azure 리소스 제거 방법은 아래 Lab 1.4 섹션을 참고하세요.
</div>

터미널에서 다음 명령어를 실행합니다:

```bash
azd up
```

고유한 환경 이름으로 `mcsmcplab` 또는 비슷한 이름을 입력합니다. 사용할 Azure 구독을 선택하고 위치 값을 선택합니다. 그러면 서버 배포에 몇 분이 걸립니다. 완료되면 마지막에 표시되는 URL 끝에 `/mcp`를 추가해 접속할 수 있습니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/azd-deploy-server.png' | relative_url }}" alt="Azd 서버 배포 출력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Azd 서버 배포 출력</figcaption></figure>

다시 다음 오류가 표시됩니다:

```json
{"jsonrpc":"2.0","error":{"code":-32000,"message":"Method not allowed."},"id":null}
```

## 🧪 Lab 1.2 - Visual Studio Code에서 Jokes MCP Server 사용

Jokes MCP Server를 사용하려면 서버 URL(devtunnel URL 또는 배포된 Azure Container App URL)에 `/mcp`를 붙인 값을 Visual Studio Code에 MCP 서버로 추가해야 합니다.

1. `ctrl` + `shift` + `P` (Windows/Linux) 또는 `cmd` + `shift` + `P` (Mac)를 누르고 `MCP`를 입력합니다.

1. **MCP: Add Server...**를 선택합니다.

1. **HTTP (HTTP or Server-Sent Events)**를 선택합니다.

1. 입력 상자에 서버 URL을 붙여넣습니다. 끝에 `/mcp`가 포함되어 있는지 확인하세요.

1. `Enter`를 누릅니다.

1. 서버 이름을 입력합니다. 예를 들어 `JokesMCP`를 사용할 수 있습니다.

1. **User Settings**를 선택해 MCP 서버 설정을 사용자 설정에 저장합니다.

    이렇게 하면 `settings.json` 파일에 MCP 서버가 추가됩니다. 다음과 비슷한 모습입니다:

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/settings.png' | relative_url }}" alt="settings.json 파일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>settings.json 파일</figcaption></figure>

1. **GitHub Copilot**을 엽니다.

1. **Agent** 모드인지 확인합니다.

1. 도구 아이콘을 선택했을 때 **JokesMCP** 서버 액션이 선택되어 있는지 확인합니다:

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/tools-menu.png' | relative_url }}" alt="GitHub Copilot의 도구 메뉴" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>GitHub Copilot의 도구 메뉴</figcaption></figure>

1. 다음 질문을 입력합니다:

    ```text
    Get a chuck norris joke from the Dev category
    ```

다음과 같은 응답이 표시됩니다:

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/github-copilot-get-joke.png' | relative_url }}" alt="Dev 카테고리 농담 요청과 GitHub Copilot의 응답 스크린샷" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Dev 카테고리 농담 요청과 응답</figcaption></figure>

이제 Visual Studio Code에 `JokesMCP` 서버를 추가했습니다!

## 🧪 Lab 1.3 - Microsoft Copilot Studio에서 Jokes MCP Server 사용

Microsoft Copilot Studio에서 Jokes MCP Server를 사용하려면 에이전트를 만들고 MCP 서버로 추가해야 합니다.

### 에이전트 생성 및 MCP 서버 도구 추가

1. [Copilot Studio](https://copilotstudio.microsoft.com/)로 이동합니다.

1. 왼쪽 아래의 환경 선택기를 선택하고 사용할 환경을 선택합니다.

1. 왼쪽 탐색에서 **Agents**를 선택합니다.

1. **New Agent** 또는 **Create your first agent** 버튼을 선택합니다. 둘 다 같은 동작을 합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/newagent.png' | relative_url }}" alt="새 에이전트 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 에이전트 생성</figcaption></figure>

    <div class="info-box note" markdown="1">
    **참고**: 에이전트 생성이 시작됩니다. 보통 10초 이내에 에이전트가 표시됩니다.
    </div>

1. 이제 이름을 **Jokester**로 변경할 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/editname.png' | relative_url }}" alt="이름 편집" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>이름 편집</figcaption></figure>

1. 이름을 다음으로 변경합니다:

    ```text
    Jokester
    ```

1. 다음 **Instructions**를 추가합니다.

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

1. 오른쪽 메뉴에서 **Tools**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/tools.png' | relative_url }}" alt="Tools 메뉴" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Tools 메뉴</figcaption></figure>

1. **Add**를 선택한 다음 **Model Context Protocol MCP**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/create-mcp.png' | relative_url }}" alt="MCP 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 생성</figcaption></figure>

    새 MCP 서버를 만들 수 있는 마법사가 열립니다. 다음 정보를 제공해야 합니다:

1. 이름을 입력합니다:

    ```text
    Jokes MCP Server
    ```

1. 설명을 입력합니다:

    ```text
    MCP server that fetches Chuck Norris and dad jokes on demand.
    ```

1. devtunnel URL을 입력합니다. 예: `https://something-3000.something.devtunnels.ms/mcp` 또는 Azure에 배포된 MCP 서버 URL.

1. **Add**를 선택해 MCP 서버를 만듭니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/add-mcp.png' | relative_url }}" alt="MCP 서버 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 서버 생성</figcaption></figure>

    Copilot Studio가 백그라운드에서 커넥터를 만들고 있으므로 몇 초가 걸립니다.

1. **Not connected** (1)와 **Create new Connection** (2)을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/create-connection-mcp-create.png' | relative_url }}" alt="액션 및 연결" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>액션 및 연결</figcaption></figure>

1. 원하는 경우 **display name** (1)을 입력하고 **Create** (2)를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/create-connection-mcp-create-name.png' | relative_url }}" alt="연결 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 생성</figcaption></figure>

1. **Add**를 선택해 MCP 서버를 에이전트에 추가합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/create-connection-mcp-create-add.png' | relative_url }}" alt="MCP 서버를 에이전트에 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 서버를 에이전트에 추가</figcaption></figure>

    <div class="info-box note" markdown="1">
    **팁**: 이렇게 하면 MCP 서버가 에이전트에 추가됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/tools-mcp-server.png' | relative_url }}" alt="MCP 서버 도구" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 서버 도구</figcaption></figure>
    </div>

1. 상단 가운데의 **Preview**를 선택해 *Build mode*에서 *Preview mode*로 전환합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/preview-mode.png' | relative_url }}" alt="Preview mode" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview mode</figcaption></figure>

1. Preview mode에서 다음 메시지를 보냅니다:

    ```text
    Can I get a Chuck Norris joke?
    ```

    에이전트 권한이 필요하다는 메시지가 표시됩니다.

1. **Allow**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/connection-allow.png' | relative_url }}" alt="에이전트가 연결을 사용하도록 허용" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 사용 허용</figcaption></figure>

    그러면 에이전트가 MCP 서버를 사용할 수 있게 되고 농담이 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/joke-result.png' | relative_url }}" alt="농담 결과" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>농담 결과</figcaption></figure>

1. 이제 다음 메시지를 시도합니다:

    ```text
    Can I get a Dad joke?
    ```

    이제 아빠 개그가 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/dad-joke-result.png' | relative_url }}" alt="아빠 개그" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>아빠 개그</figcaption></figure>

이로써 Jokes MCP Server가 Microsoft Copilot Studio에서 동작하는 것을 확인했습니다.

## 🧪 Lab 1.4 - Azure 리소스 제거

Azure에 MCP 서버를 배포했다면 Azure 리소스를 제거하는 것을 잊지 마세요. 랩을 마친 뒤 Azure 리소스를 제거하려면 터미널에서 다음 명령어를 실행합니다:

```bash
azd down
```

이 명령은 삭제될 리소스를 보여주고 확인을 요청합니다. `y`로 확인하면 리소스가 삭제됩니다. 몇 분이 걸릴 수 있지만, 마지막에 확인 메시지가 표시됩니다:

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/azd-down-confirmation.png' | relative_url }}" alt="리소스 삭제 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>리소스 삭제 완료</figcaption></figure>

## ✅ 미션 완료

축하합니다, 에이전트 — 미션 완료! MCP 서버를 빌드 및 배포하고 GitHub Copilot과 Microsoft Copilot Studio 모두에 연결했습니다.

이 미션에서 달성한 것:

✅ **MCP 서버 배포**: Node.js와 Docker를 사용해 커스텀 MCP 서버를 빌드하고 배포했습니다.

✅ **로컬 및 클라우드 호스팅**: 포트 포워딩으로 서버를 로컬에서 실행하고 Azure Developer CLI를 사용해 Azure에 배포했습니다.

✅ **GitHub Copilot 통합**: MCP 서버를 Visual Studio Code에 연결하고 GitHub Copilot Agent Mode에서 사용했습니다.

✅ **Copilot Studio 통합**: MCP 서버를 커스텀 Instructions와 도구 오케스트레이션을 갖춘 Copilot Studio 에이전트에 연결했습니다.

## 🏅 완료 배지 받기

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-mcs-mcp/MCP_Joker_Badge.png' | relative_url }}" alt="MCP Joker Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP Joker Badge</figcaption></figure>

축하합니다, 에이전트. 미션 완료입니다! 이제 배지를 받을 차례입니다.

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
