---
layout: "chapter"
date: 2026-03-11
title: "미션 10: MCP 서버와 통합하기"
short_title: "10. MCP 서버 연동"
description: "기본 제공 MCP 서버와 통합합니다"
order: 10
category: "academy-courses"
parent: "aoperative"
source_url: "https://microsoft.github.io/agent-academy/operative/10-mcp/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-11"
canonical_url: "https://microsoft.github.io/agent-academy/operative/10-mcp/"
image: "/assets/academy/operative-10-mcp/tools.png"
---
<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 10: Integrate with MCP Servers](https://microsoft.github.io/agent-academy/operative/10-mcp/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <a href="https://youtu.be/kW2f8Z8fzBw?si=rDg7uFQCIDUe_Q_H" target="_blank" rel="noopener">
    <img src="{{ '/assets/academy/operative-10-mcp/10-mcp-thumbnail_PlayButton.png' | relative_url }}" alt="MCP" loading="lazy" onerror="this.style.display='none';this.closest('figure').classList.add('pending')">
  </a>
</figure>

## 🎯 미션 브리프

환영합니다, Operative. 이전 미션들을 통해 여러분은 프롬프트의 강력함을 확인했습니다. 멀티모달 문서 분석, Dataverse 데이터로 프롬프트를 grounding하는 방법, 그리고 문서 생성에 대해 배웠습니다. 이제 또 하나의 고급 기능인 **MCP (Model Context Protocol) 서버 통합**을 활용하게 됩니다.

이번 임무의 이름은 **Operation MCP Rendezvous**입니다. 이 작전에서는 Agent를 외부 MCP 서버에 연결해 기능을 확장하고, 면접 준비 미팅을 예약할 수 있도록 만들게 됩니다.

<div class="info-box note" markdown="1">
**참고** — 이 실습의 스크린샷과 Copilot Studio 화면이 다르게 보인다면, 오른쪽 상단의 **New Experience**를 끄고 여기서 사용하는 **classic experience**로 전환하세요.
</div>

## 🔎 학습 목표

이 미션에서는 다음을 배우게 됩니다:

1. Model Context Protocol (MCP) 표준을 이해하고 활용하는 방법
1. Agent 365를 사용해 Copilot Studio Agent에 MCP 서버를 통합하는 방법
1. Copilot Studio Agent를 MCP 서버에 연결하는 방법
1. Agent 내에서 MCP 서버 기능을 활용하는 방법

## 🔌 MCP란 무엇인가요?

**MCP (Model Context Protocol)** 는 AI 도우미가 외부 데이터 소스와 도구에 안전하게 연결할 수 있도록 해 주는 개방형 표준입니다. MCP를 **AI 통합의 USB-C**라고 생각해 보세요. USB-C가 다양한 장치와 주변기기를 위한 범용 커넥터를 제공하듯이, MCP는 AI 시스템이 여러 서비스, 데이터베이스, 애플리케이션에 연결할 수 있는 표준화된 방법을 제공합니다.

USB-C 이전에는 각 장치마다 자체적인 독점 커넥터가 있었습니다(서로 다른 충전 케이블들을 떠올려 보세요). 마찬가지로 MCP 이전에는 AI Agent를 외부 시스템에 연결하려면 서비스마다 별도의 맞춤형 통합이 필요했습니다. MCP는 범용 "plug-and-play" 프로토콜을 제공함으로써 이 문제를 해결합니다.

### ✨ MCP의 주요 이점

- **범용 연결성**: 하나의 표준 프로토콜이 다양한 AI 플랫폼과 데이터 소스 전반에서 작동합니다.
- **안전한 액세스**: 기본 제공 인증과 권한 제어가 데이터를 보호합니다.
- **확장성**: 핵심 로직을 다시 작성하지 않고도 Agent에 새 기능을 쉽게 추가할 수 있습니다.
- **상호 운용성**: MCP 서버는 여러 AI 도우미와 애플리케이션에서 함께 동작할 수 있습니다.

이 미션에서는 MCP를 사용해 Copilot Studio Agent를 외부 서비스에 연결하고, 기본 제공 기능을 넘어 Agent가 할 수 있는 일을 크게 확장하게 됩니다.

## 🛠️ Agent 365는 어떤 역할을 하나요?

**Agent 365**는 엔터프라이즈 규모에서 AI Agent를 관리하고 확장하기 위한 Microsoft의 종합 플랫폼입니다. 각 AI Agent에 고유한 **Microsoft Entra Agent ID**를 부여해 ID, 수명 주기, 액세스를 관리할 수 있게 하며, MCP 서버를 통해 Agent를 비즈니스 시스템에 안전하게 연결하는 인프라도 제공합니다.

Agent 365는 AI Agent를 위한 **엔터프라이즈 제어 평면(control plane)** 이라고 볼 수 있습니다. 보안, 거버넌스, 가시성을 처리하는 동시에, 표준화된 MCP tooling server를 통해 Agent가 Microsoft 365 및 비즈니스 애플리케이션과 상호 작용할 수 있도록 지원합니다.

### 👥 Agent 365가 다양한 역할을 지원하는 방식

Agent 365는 Agent 생태계에 참여하는 모든 사람의 요구를 충족합니다.

- **IT 관리자**: Microsoft 365 관리 센터를 통해 Agent 활동을 모니터링하고, 정책을 적용하고, 위협을 관리합니다.
- **보안 팀**: Microsoft Purview 및 Defender 통합을 통해 ID, 인증, 규정 준수를 위한 엔터프라이즈급 제어를 적용합니다.
- **개발자**: Copilot Studio 또는 Azure AI Foundry에서 통합 SDK, 사전 구축된 MCP 서버, 프레임워크를 사용해 Agent를 빌드하고 확장합니다.
- **비즈니스 의사결정자**: Agent를 안전하게 배포하고 생산성 및 비즈니스 성과에 미치는 영향을 측정합니다.
- **정보 근로자**: Agent와 자연스럽게 협업하여 생산성을 높입니다.

### 🔧 MCP 통합을 위한 Agent 365 tooling server

Agent 365는 Agent가 비즈니스 시스템에 안전하고 통제된 방식으로 접근할 수 있도록 **엔터프라이즈급 MCP 서버**를 제공합니다. 여기에는 다음이 포함됩니다.

**Microsoft 365 및 비즈니스 애플리케이션용 사전 구축된 MCP 서버**:

- **Outlook Calendar**: 일정 이벤트 생성, 업데이트, 관리
- **Outlook Mail**: 이메일 보내기, 읽기, 검색  
- **Teams**: 채팅 생성, 메시지 게시, 채널 관리
- **SharePoint & OneDrive**: 파일 업로드, 목록 관리, 문서 검색
- **Word**: 문서 생성 및 편집, 댓글 추가
- **Dataverse & Dynamics 365**: 비즈니스 데이터에 대한 CRUD 작업 수행
- **User Profile**: 사용자 정보, 관리자, 직속 보고자 조회
- **Copilot Search**: Microsoft 365 Copilot과 채팅하고 파일을 기반으로 응답 생성

**엔터프라이즈 보안 및 거버넌스**:

- **중앙 집중식 제어**: Microsoft 365 관리 센터를 통해 모든 MCP 서버를 관리하고 조직 전체에서 서버를 허용하거나 차단할 수 있습니다.
- **범위가 지정된 권한**: Agent는 Microsoft Entra scope에 따라 필요한 리소스에만 액세스합니다.
- **완전한 가시성**: Microsoft Defender Advanced Hunting을 사용해 모든 도구 호출을 모니터링하고 감사할 수 있습니다.
- **정책 적용**: 런타임에 DLP, MIP, 속도 제한, 보안 스캔을 적용할 수 있습니다.
- **위협 방어**: Microsoft Defender 통합으로 Agent를 대상으로 한 공격을 탐지하고 대응할 수 있습니다.

**사용자 지정 MCP 서버 생성**:

- **MCP Management Server**를 사용해 시나리오별 서버를 구축할 수 있습니다. 이는 사용자 지정 MCP 서버를 만들기 위한 API 우선 도구입니다.
- **1,500개 이상의 Power Platform 커넥터**(ServiceNow, JIRA 등)에 연결할 수 있습니다.
- **Microsoft Graph APIs**, **REST APIs**, **Dataverse custom APIs**를 통합할 수 있습니다.
- 조직용 사용자 지정 서버를 게시하고 인증할 수 있습니다.
- ISV가 인증된 서버를 빌드하고 게시할 수 있도록 지원합니다.

**개발자 경험**:

- **Copilot Studio**(low-code)와 **Azure AI Foundry**(pro-code) 모두에서 사용할 수 있습니다.
- 원활한 통합을 위해 **Agent 365 SDK**에 내장되어 있습니다.
- 사용자 지정 MCP 서버 생성 및 테스트를 위한 **Visual Studio Code** 통합을 제공합니다.
- 모든 tooling server 전반에서 일관되고 표준화된 인터페이스를 제공합니다.

### 💡 이것이 Agent에 중요한 이유

Agent 365는 MCP를 개방형 표준에서 엔터프라이즈에 바로 적용할 수 있는 플랫폼으로 바꿔 줍니다. 이를 통해 Agent는 다음과 같은 이점을 얻습니다.

- **결정론적이고 감사 가능한 작업** - 모든 도구 호출이 추적되고 통제됩니다.
- **프로덕션 수준의 안정성** - 모든 MCP 서버는 정확성, 지연 시간, 안정성에 대해 엄격한 테스트를 거칩니다.  
- **기본 제공 보안** - 엔터프라이즈 제어가 사후 덧붙이는 방식이 아니라 처음부터 내장됩니다.
- **빠른 개발** - 일반적인 시나리오를 위한 사전 구축 서버와, 특수한 요구를 위한 쉬운 사용자 지정이 가능합니다.
- **통합 관리** - Agent가 어디에서 만들어졌는지와 관계없이 하나의 제어 평면에서 모두 관리할 수 있습니다.

### 🎯 이번 미션에서 집중할 내용

Agent 365는 Agent 관리, 거버넌스, 사용자 지정 MCP 서버 개발을 위한 종합 플랫폼을 제공하지만, **이번 미션에서는 Copilot Studio에서 사전 구축된 MCP 서버를 사용하는 데 집중**합니다.

Outlook Calendar나 Teams 같은 즉시 사용할 수 있는 tooling server를 Agent에 연결하고, 사용자 지정 통합을 직접 만들지 않고도 Microsoft 365 애플리케이션에서 실제 작업을 수행하도록 만드는 방법을 배우게 됩니다. 이것은 나만의 도구를 만들기 전에, 먼저 이미 도구 상자에 들어 있는 도구를 활용하는 법을 배우는 과정이라고 생각하면 됩니다.

## 🧪 실습 10 - 면접 준비 미팅을 예약하기 위해 MCP 서버 추가하기

<div class="info-box note" markdown="1">
**중요** — 이 실습을 진행하려면 [Frontier preview program](https://adoption.microsoft.com/copilot/frontier-program/)에 참여해 Microsoft Agent 365에 대한 조기 액세스 권한을 받아야 합니다. Frontier는 Microsoft의 최신 AI 혁신 기능을 직접 체험할 수 있게 해 줍니다. Frontier 미리보기는 고객 계약에 포함된 기존 preview 약관의 적용을 받습니다. 이러한 기능은 아직 개발 중이므로, 제공 여부와 기능이 시간에 따라 달라질 수 있습니다.

Frontier 프로그램에 액세스할 수 없다면 이 실습은 건너뛰어도 괜찮습니다. 그래도 Operative 배지는 획득할 수 있습니다.
</div>

### 실습 10.1: Interview Agent에 MCP 서버 추가하기

<div class="info-box note" markdown="1">
**경고** — 이 실습에서는 *Work IQ User (Preview)* 와 *Work IQ Calendar (Preview) MCP* 두 개의 MCP 서버를 추가하는 방법을 배웁니다. 실습이 제대로 동작하려면 미리 테넌트에서 다음 항목을 구성해 두어야 합니다.

- 사용자 계정에 manager가 설정되어 있어야 하며, 이는 M365 Admin Center에서 구성할 수 있습니다.
- 향후 24시간 이내에 캘린더에 일정이 하나 이상 있어야 합니다. 이는 "Get my meetings for today"라고 요청해 MCP 서버를 테스트할 것이기 때문입니다.
- 테넌트에 추가 사용자가 하나 더 생성되어 있어야 합니다. 그래야 그 사용자를 면접 준비 미팅에 초대할 수 있습니다. ([How to create a user in M365](https://learn.microsoft.com/microsoft-365/admin/add-users/add-users?view=o365-worldwide&WT.mc_id=power-215684-dlaskewitz))
- 그 추가 사용자에 대해서는 mailbox가 프로비저닝되어 있어야 하며, 근무일과 근무 시간을 설정해 두면 좋습니다.
</div>

Agent에 MCP 서버를 추가하려면 MCP 서버마다 도구 하나만 추가하면 됩니다. 이는 커넥터 도구와 다릅니다. 커넥터 도구는 각 커넥터 작업마다 별도의 도구를 추가해야 합니다. 여러 작업을 처리하는 단일 도구를 추가할 수 있다는 점이 MCP Server를 훨씬 더 쉽게 다룰 수 있게 해 주는 요소 중 하나입니다.

#### Work IQ User (Preview) MCP Server 추가하기

1. [Copilot Studio](https://copilotstudio.microsoft.com)를 열고 이전에 만든 Interview Agent를 **엽니다**.
1. 상단 탐색에서 **Tools**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/tools.png' | relative_url }}" alt="Tools 탐색" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Add a tool**을 선택해 MCP Server 추가를 시작합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/add-a-tool.png' | relative_url }}" alt="도구 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 필터에서 **Model Context Protocol**을 선택해 도구를 MCP Server만 보이도록 필터링합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/filter-mcp.png' | relative_url }}" alt="도구를 MCP Server만 보이도록 필터링" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 도구 목록에서 **Work IQ User (Preview)** 를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/select-user-profile-mcp.png' | relative_url }}" alt="도구 목록에서 Work IQ User (Preview) 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 연결 드롭다운에서 **Create new connection**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/create-new-connection.png' | relative_url }}" alt="생성 드롭다운 - 연결 만들기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Create**를 선택해 연결 생성 프로세스를 시작합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/create-connection-create.png' | relative_url }}" alt="연결 생성 프로세스 시작" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 계정 선택 팝업에서 **your account**를 선택해 연결을 생성합니다.
1. 계정을 선택하면 다음 화면이 표시됩니다. **Add and configure**를 선택해 Work IQ User (Preview)를 Interview Agent에 추가합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/add-and-configure.png' | relative_url }}" alt="Work IQ User (Preview) 추가 및 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 도구 개요 페이지에서 아래로 스크롤하면 MCP server에 포함된 MCP 도구들을 확인할 수 있습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/user-profile-mcp-tools.png' | relative_url }}" alt="도구 개요" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음으로 **Test**를 선택해 새로 추가한 도구를 테스트합니다.
1. 테스트 창에서 Agent에 다음 프롬프트를 보냅니다.

    ```text
    Who is my manager?
    ```

1. Agent가 먼저 연결하라고 안내합니다. 자격 증명을 확인하려면 **Open connection manager**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/connection-manager.png' | relative_url }}" alt="자격 증명을 확인하기 위해 Open connection manager 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Manage your connections** 페이지에서 **Work IQ User MCP** 연결 옆의 **Connect**를 선택해 연결을 설정합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/connect-workiq-user-mcp.png' | relative_url }}" alt="Work IQ User MCP 연결 옆의 Connect 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Create or pick a connection** 대화 상자에서 Work IQ User MCP 연결에 초록색 체크 표시가 보이는지 확인한 다음 **Submit**을 선택합니다. 제출한 뒤 테스트 창으로 돌아가 **Retry**를 선택해 계속 진행합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/workiq-user-mcp-connection.png' | relative_url }}" alt="연결을 확인하기 위해 Submit 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    다음으로 Agent의 응답이 표시됩니다. 모든 것이 잘 진행되면 아래와 비슷한 결과를 볼 수 있습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/user-profile-manager-test.png' | relative_url }}" alt="Who is my manager 테스트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    *Test your agent* 창의 왼쪽을 보면 Agent가 MCP server를 초기화하고 *getMyManager* MCP 도구를 호출한 것을 확인할 수 있습니다. Agent가 MCP 도구에 무엇을 보내고 무엇을 받았는지에 대한 세부 정보도 볼 수 있습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/user-profile-manager-test-debug.png' | relative_url }}" alt="MCP 도구 디버그" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

실습의 첫 번째 파트가 끝났습니다. 이제 테넌트의 사용자에 대해 질문할 수 있습니다. 예를 들면 다음과 같습니다.

- Who is my manager?
- Who are my direct reports?
- Daniel Laskewitz의 직무 역할은 무엇인가요?
- 그 밖에도 훨씬 더 많은 질문을 할 수 있습니다...

원한다면 이제 다른 도구들도 시험해 볼 수 있습니다. 준비가 되었다면 다른 MCP server도 추가해 보겠습니다.

#### Work IQ Calendar (Preview) MCP server 추가하기

이전 섹션에서는 Work IQ User (Preview)를 추가해 테넌트의 사용자 세부 정보를 다룰 수 있게 했습니다. 이는 예를 들어 회의를 계획할 때 매우 유용합니다. Agent 사용자는 보통 회의 일정을 잡고 싶을 때 이메일 주소나 사용자 주체 이름(user principal name)을 포함한 프롬프트를 보내지 않기 때문입니다. 대신 다음과 같은 프롬프트를 보냅니다.

```text
meeting with Daniel Laskewitz tomorrow
```

이런 기능을 추가하려면 또 다른 MCP server인 Work IQ Calendar (Preview) MCP server를 추가해야 합니다. 이어지는 단계는 앞선 섹션과 매우 비슷하니 그대로 따라오면 됩니다.

1. 상단 탐색에서 **Tools**를 선택합니다.
1. **Add a tool**을 선택합니다.
1. **Model Context Protocol**을 선택해 도구를 필터링합니다.
1. 아래로 스크롤해 **Work IQ Calendar (Preview) MCP Server**를 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/select-outlook-calendar-mcp.png' | relative_url }}" alt="Work IQ Calendar (Preview) MCP Server 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 연결 드롭다운에서 **Create new connection**을 선택합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/create-new-connection-calendar.png' | relative_url }}" alt="Create new connection 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. **Create**를 선택해 연결 프로세스를 시작합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/create-new-connection-calendar-create.png' | relative_url }}" alt="연결 프로세스를 시작하기 위해 Create 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 계정 선택 팝업에서 **your account**를 선택해 연결을 생성합니다.
1. **Add and configure**를 선택해 Work IQ Calendar (Preview) MCP server를 Interview Agent에 추가합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/add-and-configure-calendar.png' | relative_url }}" alt="Add and configure 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    이제 다시 아래쪽으로 스크롤하면 Work IQ Calendar (Preview) MCP server의 도구들을 확인할 수 있습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-mcp-tools.png' | relative_url }}" alt="Work IQ Calendar (Preview) MCP Server 도구" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    이제 이 MCP server를 테스트해 보겠습니다.

1. 다음 프롬프트를 입력합니다.

    ```text
    Get my meetings for today
    ```

1. Agent가 동의 카드를 표시합니다. MCP server가 사용자 데이터를 사용할 수 있도록 **Allow**를 선택해 동의합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-test-allow.png' | relative_url }}" alt="동의 카드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 그러면 오늘 캘린더에 있는 회의 목록이 응답으로 표시됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-test-output.png' | relative_url }}" alt="Get my meetings for today 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

### 실습 10.2: 면접 준비 미팅 계획하기

이제 두 MCP server가 모두 동작하는 것을 확인했습니다. 하지만 우리가 정말 하고 싶은 것은 면접 준비 미팅을 계획하는 것입니다. 실제로도 잘 되는지 확인해 보겠습니다.

1. **New test session**을 선택해 새 테스트 세션을 시작합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/new-test-session.png' | relative_url }}" alt="새 테스트 세션" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

1. 다음 프롬프트를 입력합니다.

    ```text
    Can you find 3 meeting times for a 30 minute meeting with Jane Doe for an interview prep-meeting?
    ```

    그러면 *findMeetingTimes* MCP 도구가 호출되고, Agent 사용자와 Jane Doe 양쪽의 캘린더를 확인해 각자의 일정 가능 여부를 바탕으로 가능한 시간을 찾아냅니다. 그다음 회의 시간 후보 세 가지를 응답으로 제시합니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-meeting-test-output.png' | relative_url }}" alt="회의 시간 찾기 출력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    그리고 테스트 창에서 어떤 도구들이 호출되었는지도 확인할 수 있습니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-test-debug.png' | relative_url }}" alt="디버그" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    실제 회의를 예약하려면 이제 Agent에 한 번 더 응답해야 합니다.

1. 다음 프롬프트를 입력합니다(시간은 Agent가 제안한 회의 슬롯 중 하나로 바꿔 넣으세요).

    ```text
    Please schedule the one on 10:30 AM UTC
    ```

    그러면 *createEvent* MCP 도구가 호출되어 회의가 예약됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-meeting-create-event.png' | relative_url }}" alt="회의 예약" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

    Jane Doe의 mailbox에는 다음과 같은 회의 요청이 표시됩니다.

    <figure class="screenshot">
      <img src="{{ '/assets/academy/operative-10-mcp/outlook-calendar-meeting-schedule-meeting-request.png' | relative_url }}" alt="회의 요청" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
    </figure>

이제 이 실습이 끝났습니다. 이 과정이 MCP server가 Agent에서 얼마나 유용하게 활용될 수 있는지 잘 보여주었기를 바랍니다.

## 🎉 미션 완료

훌륭합니다, Operative! **Operation MCP Rendezvous**가 이제 완료되었습니다. 외부 MCP server를 Copilot Studio Agent와 성공적으로 통합하여, Agent 기능을 확장하는 강력한 새 역량을 해제했습니다.

🚀 **다음 단계:** 다음 미션에서는 사용자 피드백을 수집하고 분석하여 Agent 성능을 지속적으로 개선하는 방법을 배우게 됩니다.

⏩ [미션 11로 이동]({{ '/chapters/academy-operative-11-obtain-user-feedback/' | relative_url }}): 사용자로부터 피드백 수집하기

## 📚 전술 자료

📖 [Microsoft Copilot Studio ❤️ MCP Lab](https://aka.ms/mcsmcp/lab)

📖 [Model Context Protocol - Getting Started](https://modelcontextprotocol.io/docs/getting-started/intro)

📖 [Extend agents with MCP in Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/agent-extend-action-mcp?WT.mc_id=power-215684-dlaskewitz)

📖 [Microsoft Agent 365 Overview](https://learn.microsoft.com/microsoft-agent-365/overview?WT.mc_id=power-215684-dlaskewitz)

📖 [Microsoft Agent 365 Tooling Servers Overview](https://learn.microsoft.com/microsoft-agent-365/tooling-servers-overview?WT.mc_id=power-215684-dlaskewitz)

📖 [Work IQ User (Preview)](https://learn.microsoft.com/microsoft-agent-365/mcp-server-reference/me?WT.mc_id=power-215684-dlaskewitz)

📖 [Work IQ Calendar (Preview) MCP Server](https://learn.microsoft.com/microsoft-agent-365/mcp-server-reference/calendar?WT.mc_id=power-215684-dlaskewitz)

📖 [Add users and assign licenses](https://learn.microsoft.com/microsoft-365/admin/add-users/add-users?view=o365-worldwide&WT.mc_id=power-215684-dlaskewitz)
