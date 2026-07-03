---
layout: "chapter"
date: 2026-02-01
title: "Lab 3 · VNet 프라이빗 엔드포인트로 MCP 서버 연결"
short_title: "Lab 3 · MCP over VNet"
description: "Azure Virtual Network의 프라이빗 엔드포인트 뒤에 있는 MCP 서버에, Power Platform VNet 지원을 통해 Copilot Studio를 안전하게 연결하는 전체 실습(Part 1 서버 배포·테스트 + Part 2 VNet 연결)을 한국어로 옮겼습니다."
order: 3
category: "newcslab"
parent: "ncslab3"
is_parent: true
tags: ["Power Platform", "Administrator"]
source_url: "https://github.com/fooshen/MCPwithVnet/tree/main"
source_author: "fooshen (Foo Shen)"
source_blog: "GitHub · fooshen/MCPwithVnet"
canonical_url: "https://github.com/fooshen/MCPwithVnet/blob/main/README.md"
---

<div class="info-box note" markdown="1">
### 📎 원작자 및 출처

이 문서는 **fooshen(Foo Shen)** 님의 GitHub 저장소 원문을 한국어로 옮긴 것입니다(MIT License). **모든 저작권은 원작자에게** 있으며, 최신·정확한 내용과 스크린샷은 아래 원문을 확인하세요.

- **원작자**: fooshen (Foo Shen)
- **원본 저장소**: [fooshen/MCPwithVnet ↗](https://github.com/fooshen/MCPwithVnet)
- **Introduction(README)**: [README.md ↗](https://github.com/fooshen/MCPwithVnet/blob/main/README.md)
- **Part 1 — MCP 서버 배포·테스트**: [MCPServer.md ↗](https://github.com/fooshen/MCPwithVnet/blob/main/MCPServer.md)
- **Part 2 — Power Platform ↔ VNet 연결**: [VNET.md ↗](https://github.com/fooshen/MCPwithVnet/blob/main/VNET.md)
- 라이선스: MIT

> 아래 본문의 이미지는 원작자 저장소의 스크린샷을 그대로 가져온 것입니다. 최신 화면은 원문 저장소를 확인하세요.
</div>

> 난이도 ★★★★☆ · Power Platform 관리자 · Azure 네트워킹

---

## 0. 소개 — VNet을 통해 Copilot Studio를 MCP 서버에 연결하기

이 가이드는 **Azure Virtual Network(VNet)의 프라이빗 엔드포인트 뒤에 위치한 MCP 서버**에 Copilot Studio가 어떻게 안전하게 연결하는지를 단계별로 설명합니다.

Microsoft Copilot Studio는 **Microsoft Power Platform** 위에 직접 구축됩니다. 즉, 전 세계 조직이 이미 대규모로 검증한 것과 **동일한 엔터프라이즈급 보안·거버넌스·컴플라이언스·네트워킹 제어**를 그대로 상속합니다. Copilot Studio가 MCP 서버에 연결할 때는 Power Platform의 **사용자 지정 커넥터(Custom Connector) 프레임워크**를 통해 이루어집니다. MCP는 프로토콜과 도구 시맨틱을 정의하지만, **전송·인증·거버넌스는 모두 커넥터 계층**에서 동작합니다. 그 결과 모든 MCP 도구는 오늘날 기업이 신뢰하는 강력한 제어(안전한 인증 흐름, 네트워크 격리, DLP 적용, ALM 파이프라인, 중앙 집중식 관리 거버넌스)의 혜택을 그대로 받습니다.

<div class="info-box note" markdown="1">
이 가이드는 MCP 서버 연결을 예로 들지만, **동일한 단계가 Power Platform의 다른 지원 커넥터 연결에도 적용**되며 Power Apps·Power Automate에도 똑같이 적용됩니다.
</div>

### 참고 문서

- [Power Platform Virtual Network support — 개요](https://learn.microsoft.com/en-us/power-platform/admin/vnet-support-overview)
- [Power Platform Virtual Network support — 백서(Whitepaper)](https://learn.microsoft.com/en-us/power-platform/admin/virtual-network-support-whitepaper)
- [Power Platform Virtual Network support — 설정 가이드](https://learn.microsoft.com/en-us/power-platform/admin/vnet-support-setup-configure)
- [문제 해결 팁(Troubleshooting)](https://learn.microsoft.com/en-us/troubleshoot/power-platform/administration/virtual-network)

### 왜 중요한가 (Why This Matters)

최근의 에이전트는 재고·재무·운영·사내 업무(LOB) API 같은 **내부 시스템 접근**이 점점 더 필요해집니다. 그런데 이런 시스템은 대개 **VNet 안, 프라이빗 엔드포인트 뒤**에 있고, 이를 공개적으로 노출하는 것은 선택지가 될 수 없습니다.

MCP 서버를 프라이빗 엔드포인트 뒤에 두고 Power Platform의 VNet 지원을 사용하면 다음을 얻습니다.

1. **공개 노출 제로(Zero Public Exposure)**
   - MCP 서버가 공용 인터넷에 전혀 닿지 않습니다.
   - 위임된 서브넷(delegated subnet)을 통한 **Power Platform 관리형 런타임만** 접근할 수 있습니다.
2. **엔터프라이즈급 네트워크 격리** — 트래픽이 전적으로 다음을 통해 흐릅니다.
   - 프라이빗 엔드포인트(Private endpoints)
   - 프라이빗 DNS 영역(Private DNS zones)
   - 필요 시 VNet ↔ VNet 라우팅

### 이 가이드에서 다루는 것

- Azure Functions에 샘플 **MCP 서버 배포**
- **프라이빗 엔드포인트**로 보안 적용
- **위임된 VNet**을 통해 Power Platform이 도달하도록 구성

### 사전 요구 사항

- **Visual Studio Code** (선택 — 샘플 MCP 서버 생성·배포용)
- **Power Platform 환경**
- Power Platform과 **동일한 테넌트**의 **Azure 구독**
- **PowerShell**

### 시작하기 전에

1. 아직 환경이 없다면 [Power Platform 환경을 생성](https://learn.microsoft.com/ko-kr/power-platform/admin/create-environment)합니다. Production·Sandbox·Developer 환경을 만들 수 있습니다. **Trial 환경은 VNet을 지원하지 않습니다.**
2. 해당 환경에 **Managed Environment(관리형 환경)** 기능을 활성화합니다.

<div class="info-box note" markdown="1">
**중요 — 먼저 Azure 리전을 확인하세요.** Power Platform 환경이 어느 **Azure 리전**에 있는지 먼저 식별해야 합니다.

- PowerShell [Get-EnvironmentRegion](https://learn.microsoft.com/en-us/powershell/module/microsoft.powerplatform.enterprisepolicies/get-environmentregion)로 확인하거나,
- [메이커 포털](https://make.powerapps.com/)에서 **Azure Synapse Link**(내비게이션에 없으면 "More" → "Discover All"에서 검색)로 이동해 **New Link**를 클릭하면 현재 Azure 리전이 표시됩니다.

원문 예시에서는 환경이 **Australia Southeast**에 있습니다. Power Platform 환경은 하나 이상의 Azure 리전에 매핑되는 **지역(geography)** 에 속할 수 있습니다. 예를 들어 환경이 호주(Australia) 지역이면 리전은 Australia East 또는 Australia Southeast일 수 있습니다. 매핑된 리전 목록은 [지원 리전 문서](https://learn.microsoft.com/en-us/power-platform/admin/vnet-support-overview#supported-regions)를 참고하세요. 기존 환경을 다른 리전으로 이동해야 한다면 Microsoft 지원에 문의하세요.

새 환경 생성 시 리전을 지정하려면 PowerShell [New-AdminPowerAppEnvironment](https://learn.microsoft.com/en-us/powershell/module/microsoft.powerapps.administration.powershell/new-adminpowerappenvironment)의 [RegionName](https://learn.microsoft.com/en-us/powershell/module/microsoft.powerapps.administration.powershell/new-adminpowerappenvironment?view=pa-ps-latest#-regionname) 매개변수 또는 [Power Platform API](https://learn.microsoft.com/en-us/rest/api/power-platform/)를 사용합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/intro-region.png' | relative_url }}" alt="메이커 포털에서 Power Platform 환경의 Azure 리전 확인" loading="lazy">
</figure>

---

## Part 1 · Azure Functions에 MCP 서버 배포하고 Copilot Studio에서 테스트

이 예제에서는 Visual Studio Code로 아주 기본적인(no-frills) **HelloWorld MCP 서버**를 C#으로 만들어 Azure Function에 배포합니다.

<div class="info-box tip" markdown="1">
이미 사용할 MCP 서버가 있거나 다른 샘플을 쓴다면 **Part 1은 건너뛰어도 됩니다.** 이 파트는 MCP 서버 작성 자체가 목적이 아니라, 서버가 없을 때 빠르게 VNet 파트로 넘어가기 위한 것입니다. Azure Functions에서 MCP 서버를 작성하는 예는 [Tutorial: Host an MCP server on Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-mcp-tutorial?tabs=mcp-extension&pivots=programming-language-csharp)와 [mcp-dotnet-samples](https://github.com/microsoft/mcp-dotnet-samples)를 참고하세요.
</div>

**필요한 것**: Visual Studio Code · Azure 구독 · Copilot Studio가 있는 Power Platform 환경.

### C#으로 간단한 Hello World MCP 서버 만들기

1. Visual Studio Code에 [Azure Functions 확장](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)을 설치합니다.
2. `Ctrl+Shift+P` 또는 `F1`을 눌러 **Azure Functions: Create New Project**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-01.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-02.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
3. 새 폴더 `HelloWorldMCPServer`를 만듭니다.
4. 런타임은 **C# → .NET 8.0 Isolated LTS**, 프로젝트 템플릿은 **McpToolTrigger**를 선택합니다.

<div class="info-box note" markdown="1">
이는 MCP 도구 엔드포인트 생성에 필요한 모든 것을 세팅해 주는 **Azure Functions MCP Extension** 프로젝트 스캐폴딩을 사용합니다. 자세한 내용은 [문서](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-mcp?pivots=programming-language-csharp)를 참고하세요.
</div>

5. 함수 이름은 `SayHello`, 네임스페이스는 예시로 `fsdemo`를 사용합니다.
6. 기본 MCP 서버 파일이 생성됩니다. 테스트를 단순화하기 위해 `host.json`에서 `webhookAuthorizationLevel`을 **Anonymous**로 바꾸고, `HelloWorldMCPServer`의 instructions·serverName 속성을 수정합니다.

```json
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "excludedTypes": "Request"
      },
      "enableLiveMetricsFilters": true
    }
  },
  "extensions": {
    "mcp": {
      "instructions": "Greet the user with a simple 'Hello, World!' message.",
      "serverName": "HelloWorldMCPServer",
      "serverVersion": "2.0.0",
      "encryptClientState": true,
      "messageOptions": {
        "useAbsoluteUriForEndpoint": false
      },
      "system": {
        "webhookAuthorizationLevel": "Anonymous"
      }
    }
  }
}
```

7. 이 샘플에는 도구가 하나(`SayHello`)뿐이며, 사용자에게 "Hello {user}! This is an MCP Tool." 로 인사합니다. `SayHello.cs`를 열어 응답에 타임스탬프를 추가합니다. Azure Function MCP Extension 스캐폴딩 덕분에 **McpToolTrigger**·**McpToolProperty** 어트리뷰트만 붙이면 됩니다.

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Mcp;
using Microsoft.Extensions.Logging;

namespace fsdemo;

public class SayHello
{
    private ILogger<SayHello> _logger;

    public SayHello(ILogger<SayHello> logger)
    {
        _logger = logger;
    }

    [Function(nameof(SayHello))]
    public object Run(
        [McpToolTrigger("Say Hello", "Responds to the user with a hello message.")] ToolInvocationContext context,
        [McpToolProperty("Name", "The name of the person to greet.")] string? name
    )
    {
        _logger.LogInformation("C# MCP tool trigger function processed a request.");
        return new
        {
            content = new[]
            {
                new
                {
                    type = "text",
                    text = $"Hello, {name ?? "world"}! This is an MCP Tool! Time now is {DateTime.Now}"
                }
            }
        };
    }
}
```

<div class="info-box note" markdown="1">
**원시 문자열(raw string)을 반환하지 마세요.** 기본 함수는 raw string을 반환하는데, JSON 객체를 반환하도록 바꿔야 합니다. Copilot Studio는 raw string에 diff 스타일 렌더러를 사용하므로, "Hello, this is MCP tool. ~Time now is {now}~" 처럼 **취소선** 형식이 보인다면 도구가 raw string을 반환하고 있기 때문입니다.
</div>

8. 로컬 테스트: `F5`를 누르고 프롬프트에서 **"Use Local Emulator"** 를 선택하면 Azure Blob Storage용 로컬 에뮬레이터(Azurite)가 세팅됩니다. `AzureWebJobStorage` 연결 확인 실패가 뜨면 **"Run Emulator"** 를 클릭해 시작합니다. 빌드 완료를 기다립니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-03.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
9. 로컬 서버가 실행되는 것을 확인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-04.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
10. VS Code의 GitHub Copilot 채팅에서 **`use #SayHello`** 를 입력하고 SayHello 도구를 선택한 뒤 사용자 이름을 파라미터로 추가해 로컬 테스트합니다. 프롬프트가 뜨면 **"Allow"** 를 선택합니다(선택하지 않으면 호출이 차단됨).

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-05.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-06.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>

### Function Apps에 배포

11. Azure Function으로 배포합니다. `Ctrl+Shift+P`/`F1` → **"Azure Functions: Deploy to Function Apps..."** 를 선택합니다.
12. **"+ Create new function app..."** (또는 기존 앱 사용)을 선택합니다. 단, Function App은 반드시 **Power Platform 환경과 동일한 리전**이어야 합니다. 이름(예: `HelloWorldMCPDemo`)을 입력하고, 새로 만들 경우 환경과 같은 리전을 선택합니다(원문 예시는 Australia Southeast).

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-07.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
13. **".NET 8 Isolated"** 와 리소스 인증 유형 **Secrets**(Blob Storage·App Insights와 통신 필요)를 선택합니다.

<div class="info-box tip" markdown="1">
**Consumption 플랜에 Azure Function을 만들지 마세요.** Flex Consumption 등 다른 플랜을 사용하세요. Consumption 플랜은 Virtual Network 통합을 지원하지 않아 이 실습에서 사용할 수 없습니다. 플랜별 네트워킹 기능은 [문서](https://learn.microsoft.com/en-us/azure/azure-functions/functions-scale#networking-features)를 참고하세요.
</div>

14. Azure Portal에서 Function App이 실행 중인지 확인하고, **도메인 URL과 리전**을 메모합니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-08.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>

### Copilot Studio에서 테스트

15. MCP 도구를 Copilot Studio에서 테스트합니다. VNet 연결을 설정할 **올바른 환경**에 있는지 확인하세요. 테스트 에이전트에서 **Tools → "+ Add Tool"** 을 클릭합니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-09.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
16. "Add Tool" 대화상자에서 **"Model Context Protocol"** 을 선택합니다.
17. 서버 이름·설명을 입력합니다. Server URL에는 Function App URL을 `https://<functionapp>/runtime/webhooks/mcp` 형식으로 입력합니다(VS Code의 `mcp.json`에서 URL 확인 가능).

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-10.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>

<div class="info-box note" markdown="1">
Azure Function MCP Extension 프로젝트는 항상 **http-streamable**로 생성합니다. SSE 프로토콜은 MCP에서 더 이상 사용되지 않습니다(deprecated). Azure Functions는 Streamable HTTP에 `/mcp` 경로를, SSE에 `/mcp/sse` 경로를 사용합니다.
</div>

18. 연결(connection) 생성을 요청받으면 **"Create new connection"** → **"Add and configure"** 를 클릭합니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-11.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
19. 이제 <https://make.powerapps.com> 의 **Custom Connectors**로 이동하면 MCP 도구가 사용자 지정 커넥터로 표시됩니다. Swagger 보기로 전환하면 `x-agentic-protocol` 어트리뷰트를 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-12.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-13.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
20. Copilot Studio로 돌아오면 도구 "Say Hello"가 검색됩니다. Test Pane에서 사용자 이름으로 인사하도록 프롬프트를 주고 테스트합니다(연결 선택 프롬프트가 뜰 수 있음).

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-14.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-15.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
21. 이로써 MCP 서버가 실행 중이고 Copilot Studio에 연결됨을 확인했습니다. **이제 MCP 서버를 공개 접근에서 제거합니다.**
22. Azure Function App에서 **Settings → Networking**으로 이동하면 Public network access가 활성화되어 있습니다. **"Enabled with no access restrictions"** 를 클릭해 **Disabled**로 바꾸고 **Save**합니다(체크박스로 변경 동의). 이제 Function App은 공용 네트워크로 접근할 수 없습니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-16.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-17.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-18.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
23. Copilot Studio로 돌아가 도구 목록을 새로고침하면 **"Connector request failed"** 오류로 도구 목록을 가져오지 못합니다. 채팅 테스트에서도 MCP 도구 응답 대신 일반적인 Hello가 나옵니다 — 공개 네트워크 접근을 비활성화해 더 이상 연결할 수 없음을 확인한 것입니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p1-19.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
24. 이제 [Part 2](https://github.com/fooshen/MCPwithVnet/blob/main/VNET.md)로 진행합니다.

---

## Part 2 · Power Platform을 VNet에 설정·연결

MCP 서버를 Azure Function에 배포·연결하고 공개 접근을 비활성화했으니, 이제 환경이 **VNet을 통해** MCP 서버에 프라이빗 엔드포인트로 계속 접근하도록 설정합니다.

### Azure Virtual Network 설정

1. Azure 구독에서 새 **Virtual Network** 리소스를 만듭니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-01.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
2. 이름을 지정하고 Power Platform 환경에 해당하는 **리전**을 선택합니다(예: `mydemo-vnet-australiasoutheast`). 최소 예제에서는 Azure Bastion·Firewall 등은 필요 없습니다. Power Platform 지역이 둘 이상의 리전을 가지면 **리전마다 VNet을 하나씩** 만들어야 합니다. 원문 예시(Australia)는 `australiaeast`·`australiasoutheast` 두 리전에 매핑되므로 VNet을 두 개 만듭니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-02.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
3. VNet에 **Power Platform용으로 위임할 서브넷**을 만듭니다. 기본 VNet(환경과 같은 리전, 예시는 `australiasoutheast`)에는 최소 **두 개**의 서브넷이 필요합니다 — Subnet1(예: `fsdemomcp-subnet`)은 Azure Function의 MCP 서버용, Subnet2(예: `pp-vnet`)는 Power Platform용.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-03.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>

<div class="info-box note" markdown="1">
**서브넷 크기가 중요합니다.** 서브넷 크기 추정 가이드는 [문서](https://learn.microsoft.com/en-us/power-platform/admin/vnet-support-overview#estimating-subnet-size-for-power-platform-environments)를 참고하세요. 경험칙: 일반적인 프로덕션 환경에는 **25-30개 IP**를 계획하세요. 프로덕션 환경의 VNet 정책을 다른 환경과 **공유하지 마세요.**
</div>

4. 매우 중요한 단계 — Power Platform 위임 서브넷은 다른 용도로 공유·사용하면 안 됩니다. 두 번째 서브넷 `pp-vnet`의 **"Subnet Delegation"** 을 **`Microsoft.PowerPlatform/enterprisePolicies`** 로 설정합니다. 이러면 Power Platform이 이 서브넷을 관리하고, 런타임에 이 위임 서브넷에서 컨테이너를 실행해 같은 VNet 내 리소스에 연결할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-04.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
5. `HelloWorldMCPDemo` Function App으로 돌아가 **Settings → Network**에서 private endpoints를 클릭해 하나 만듭니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-05.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
6. **"+ Add"** 를 클릭하고 Express 또는 Advanced 방식으로 이름을 지정한 뒤, Step 3에서 만든 VNet과 서브넷을 선택합니다. **Power Platform에 위임된 서브넷은 사용하지 마세요.**

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-06.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
7. 이제 MCP 서버 Function App이 이 VNet 안에 프라이빗 엔드포인트를 갖습니다. 프라이빗 엔드포인트 이름을 클릭합니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-07.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
8. 프라이빗 엔드포인트 설정에서 **"DNS configuration"** 으로 이동하면 Private DNS zone이 생성되어 있습니다. Private DNS Zone(`privatelink.azurewebsites.net`)을 클릭합니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-08.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
9. Private DNS Zone의 **DNS Management → "Virtual Network Links"** 에서 다른 리전의 VNet을 이 영역에 연결합니다. **"+ Add"** 를 클릭합니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-09.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
10. 링크 이름을 지정하고 다른 서브넷을 선택합니다. 원문 예시는 환경이 Australia 지역(australiaeast·australiasoutheast 두 리전)이라 각 리전에 VNet을 만들었고, Function App·프라이빗 엔드포인트·Private DNS Zone은 southeast(환경 리전)에 있습니다. australiaeast의 서브넷을 이 Private DNS Zone에 연결합니다([참고](https://learn.microsoft.com/en-us/troubleshoot/power-platform/administration/virtual-network#azure-resource-with-a-private-endpoint)).

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-10.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
11. 이제 MCP 서버 Function App에 프라이빗 엔드포인트가 활성화되어 같은 VNet 내에서 도달할 수 있습니다. 같은 VNet의 VM/컨테이너에서 Function App 도메인에 `nslookup`으로 빠르게 확인할 수 있습니다(원문 예시는 프라이빗 엔드포인트에 해당하는 `10.2.2.7`로 확인됨).

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-11.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-12.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
12. 다음은 **Enterprise Policy**를 만들고 Power Platform을 이 정책에 연결하는 단계입니다. Azure 구독 ID(GUID), VNet이 있는 리소스 그룹 이름, 모든 VNet의 Resource ID(리전마다 하나)를 준비합니다. VNet 리소스의 JSON View에서 구독 ID와 Resource ID를 복사할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-13.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-14.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
13. PowerShell에서 다음을 실행합니다.

```powershell
Install-Module Microsoft.PowerPlatform.EnterprisePolicies
Import-Module Microsoft.PowerPlatform.EnterprisePolicies
New-SubnetInjectionEnterprisePolicy -SubscriptionId "YourAzureSubscriptionId" -ResourceGroupName "YourAzureResourceGroupName" -PolicyName "giveThePolicyAName" -PolicyLocation "australia" -VirtualNetworkId "resourceIdForVNet1" -SubnetName "pp-vnet" -VirtualNetworkId2 "ResourceIdForVNet2" -SubnetName2 "pp-vnet"
```

<div class="info-box note" markdown="1">
**`New-SubnetInjectionEnterprisePolicy` 매개변수**
- `SubscriptionId` — 앞 단계에서 복사한 GUID 값
- `ResourceGroupName` — VNet이 있는 Azure 리소스 그룹의 표시 이름(문자열)
- `PolicyName` — 정책 이름(문자열, 예: `PowerPlatformVNetPolicyTest`)
- `VirtualNetworkId`, `VirtualNetworkId2` — 각 VNet의 Resource ID(첫 번째는 Power Platform 환경과 같은 리전의 VNet)
- `SubnetName`, `SubnetName2` — 각 VNet에서 Power Platform용으로 위임한 서브넷 이름(Step 5)
- (선택) 여러 구독·로그인이 있으면 `-ForceAuth` 를 추가해 선택기를 강제합니다.
</div>

14. `Get-SubnetInjectionEnterprisePolicy -SubscriptionId "YourSubscriptionId"` (선택 `-ForceAuth`)로 상태를 확인하고 Enterprise Policy의 ResourceId를 복사합니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-15.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>

정책을 제거하려면 `Remove-SubnetInjectionPolicy`를 사용합니다.

```powershell
Remove-SubnetInjectionPolicy -PolicyResourceId "yourEnterprisePolicyResourceId"
```

15. 정책이 생성되면 환경을 이 정책에 추가합니다. **PowerShell** 또는 **Power Platform 관리 센터(PPAC)** 로 할 수 있습니다.

PowerShell — `Enable-SubnetInjection`으로 환경을 정책에 추가:

```powershell
Enable-SubnetInjection -EnvironmentId "YourEnvironmentId" -PolicyArmId "yourEnterprisePolicyResourceId"
```

환경을 제거하려면 `Disable-SubnetInjection`:

```powershell
Disable-SubnetInjection -EnvironmentId "YourEnvironmentId"
```

PPAC 사용 시 — **"Security" → "Data and privacy" → "Azure Virtual Network polices"** 로 이동해 원하는 Power Platform을 선택하고 **Next**를 클릭하면, 방금 만든 Enterprise Policy 이름을 할당할 수 있습니다. 몇 초 후 환경이 성공적으로 할당되면 페이지를 새로고침해 정책 이름이 환경에 연결된 것을 확인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-16.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-17.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-18.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>

16. MCP 도구를 Enterprise Policy가 환경에 할당되기 **전에** 만들었다면, 기본 사용자 지정 커넥터를 다시 저장해야 할 수 있습니다. Custom Connector로 가서 편집하고 **"Update custom connector"** 를 클릭합니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-19.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
17. 이제 Copilot Studio에서 다시 시도합니다. 도구 목록을 새로고침하면 연결·도구 목록이 정상적으로 해석되고, Test Pane 프롬프트에서도 MCP 도구 응답을 받습니다. 이 시점에 연결이 stale일 수 있어 연결 관리자에서 재선택 후 재시도하라는 프롬프트가 뜰 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-20.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>
18. MCP 서버 Function App으로 돌아가면 **공개 네트워크 접근이 비활성화**된 상태에서 **프라이빗 엔드포인트**를 사용함을 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/labs/newcslab3/p2-21.png' | relative_url }}" alt="MCP over VNet 실습 스크린샷" loading="lazy">
</figure>

<div class="info-box note" markdown="1">
**주의** — Power Platform 환경을 Enterprise Policy에 할당하면 **지원되는 모든 커넥터가 위임된 VNet을 사용**합니다. 같은 환경의 같은 커넥터로 인터넷 리소스에도 연결해야 한다면, Network Security Group·NAT Gateway 등 VNet에 추가 리소스를 구성해야 합니다. 자세한 내용은 [Virtual Network support 백서](https://learn.microsoft.com/en-us/power-platform/admin/virtual-network-support-whitepaper#configuration-considerations)를 참고하세요.
</div>

### 참고 문서

- [Power Platform Virtual Network support — 개요](https://learn.microsoft.com/en-us/power-platform/admin/vnet-support-overview)
- [Power Platform Virtual Network support — 백서](https://learn.microsoft.com/en-us/power-platform/admin/virtual-network-support-whitepaper)
- [Power Platform Virtual Network support — 설정 가이드](https://learn.microsoft.com/en-us/power-platform/admin/vnet-support-setup-configure)
- [문제 해결 팁](https://learn.microsoft.com/en-us/troubleshoot/power-platform/administration/virtual-network)

---

*원작자: fooshen(Foo Shen) · [fooshen/MCPwithVnet](https://github.com/fooshen/MCPwithVnet) (MIT License). 이 번역은 이해를 돕기 위한 것으로, 최신·정확한 내용과 스크린샷은 [원문 저장소](https://github.com/fooshen/MCPwithVnet)를 확인하세요.*
