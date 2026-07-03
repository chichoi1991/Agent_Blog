---
layout: "chapter"
date: 2026-03-17
title: "Power Platform CLI MCP Server"
short_title: "PAC CLI MCP"
description: "Power Platform CLI와 GitHub Copilot을 MCP로 연결해 자연어 명령으로 테넌트를 관리하는 실전 랩입니다. 환경 관리, 거버넌스 분석, AI 기반 전략 수립을 다룹니다."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/pac-cli-mcp/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-17"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/pac-cli-mcp/"
image: "/assets/academy/special-ops-pac-cli-mcp/powerplatform-cli-mcp-added-vs-code.png"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [⚡ Power Platform CLI MCP Server](https://microsoft.github.io/agent-academy/special-ops/pac-cli-mcp/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# ⚡ Power Platform CLI MCP Server

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-pac-cli-mcp/CommandLine_Badge.png' | relative_url }}" alt="Command Line Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Command Line Badge</figcaption></figure>

에이전트 여러분, 이 미션에서는 **Model Context Protocol (MCP)**를 사용해 Power Platform CLI와 AI 코파일럿 사이에 **보안 명령 채널**을 구축합니다. 복잡한 명령 구문을 외울 필요가 없습니다. 자연어로 명령을 내리면 AI 핸들러가 환경, 테넌트 설정, 거버넌스 정책에 정확한 작업으로 변환합니다. 🎯

**미션 목표:**

- Visual Studio Code와 GitHub Copilot에서 Power Platform CLI MCP 서버를 명령 릴레이로 구축
- Power Platform 테넌트 전반에 AI 기반 자연어 작업 배포
- 테넌트 구성에 대한 정찰 및 전략적 거버넌스 인텔 추출
- 조직 전체에 엔터프라이즈급 거버넌스 모범 사례 적용

**사전 요구사항:** Power Platform 관리자 액세스, Visual Studio Code, GitHub Copilot 확장.

## ❓ Microsoft Power Platform CLI란?

모든 에이전트에게는 믿음직한 도구가 필요합니다. Microsoft Power Platform CLI는 개발자와 ISV가 전체 Microsoft Power Platform 전반에 걸쳐 작업을 실행할 수 있는 강력한 명령줄 인터페이스입니다. 이 도구를 통해 다음을 관리하고 자동화할 수 있습니다:

- **환경 수명 주기** - Power Platform 환경 생성, 관리, 구성
- **인증** - 여러 테넌트에 대한 보안 연결 및 인증 프로필 처리
- **Microsoft Dataverse 환경** - 데이터, 테이블, 구성 작업
- **솔루션 패키지** - Power Platform 솔루션 가져오기, 내보내기, 관리
- **Power Pages** - Power Pages 웹사이트 구성 및 배포
- **코드 구성 요소** - 사용자 지정 PCF 컨트롤 생성 및 관리
- **그 외 많은 기능** - 포괄적인 Power Platform 개발을 위한 추가 기능

## 🧪 Lab 1.1 - Power Platform CLI 설치

.NET Tool 설치 방법을 사용하면 Windows의 PowerShell 및 CMD 셸에서 Power Platform CLI 명령을 배포할 수 있습니다.

### ✅ 사전 요구사항

- **.NET 10.0 이상** 설치 ([.NET 다운로드](https://dotnet.microsoft.com/download))
- NuGet 패키지 다운로드를 위한 **인터넷 연결**

### 🚀 설치 단계

Power Platform CLI MCP 서버를 사용하는 방법은 두 가지입니다:

- CLI를 시스템 전역에 설치해 명령 프롬프트나 PowerShell의 어느 디렉터리에서나 `pac` 명령을 실행할 수 있습니다.
- 또는 `dnx` 명령을 사용해 전역 설치 없이 MCP 서버를 직접 실행할 수 있지만, 전체 경험을 위해 CLI를 전역으로 설치하는 것을 권장합니다.

1. .NET tool install 명령을 사용해 **CLI를 전역으로 배포**합니다:

   ```bash
   dotnet tool install --global Microsoft.PowerApps.CLI.Tool
   ```

1. 버전을 확인해 **배포를 검증**합니다:

   ```bash
   pac
   ```

   다음과 비슷한 출력이 표시됩니다:

   ```text
   Microsoft PowerPlatform CLI
   Version: 2.4.1+g3799f3e (.NET 10.0.0)
   ```

### 🔧 도구 관리

**최신 버전으로 업그레이드:**

```bash
dotnet tool update --global Microsoft.PowerApps.CLI.Tool
```

**제거:**

```bash
dotnet tool uninstall --global Microsoft.PowerApps.CLI.Tool
```

### 📁 파일 위치

Power Platform CLI 실행 파일 위치:

- `%USERPROFILE%\.dotnet\tools`

이 위치는 자동으로 시스템 PATH에 추가되어 어느 디렉터리에서나 `pac` 명령을 실행할 수 있습니다.

## 🧪 Lab 2.1 - Power Platform CLI MCP 서버 구성

Power Platform CLI(버전 1.44+)에는 AI 어시스턴트와 Power Platform 환경 사이의 직접 통신 링크인 **Model Context Protocol (MCP) 서버**가 내장되어 있습니다. 이 통합을 통해 VS Code Copilot, Visual Studio 등 MCP 호환 애플리케이션에서 자연어로 명령을 내릴 수 있습니다.

### 🚀 MCP 통합이란?

MCP 서버는 AI 어시스턴트가 대신 호출할 수 있는 도구로 Power Platform CLI 명령을 노출합니다. 복잡한 CLI 구문을 외우는 대신 자연어로 미션 목표를 설명하면 AI가 적절한 명령을 실행합니다.

**주요 이점:**

- **자연어 인터페이스** - 복잡한 CLI 구문 대신 일반 영어로 명령
- **지능형 명령 선택** - AI 핸들러가 의도에 따라 적절한 명령을 선택
- **상황 인식 지원** - 명령 센터를 떠나지 않고 운영 지원 받기
- **선택적 도구 접근** - 운영 보안을 위해 어떤 CLI 명령을 노출할지 제어

### 📋 지원 작업

MCP 서버는 현재 **20개 이상의 Power Platform CLI 명령**을 지원합니다:

- **환경 관리** - Power Platform 환경 나열, 생성, 관리
- **솔루션 작업** - 솔루션 가져오기, 내보내기, 패키징
- **인증** - 인증 프로필 및 테넌트 연결 처리
- **Dataverse 작업** - 테이블, 데이터, 구성 작업
- **Power Pages** - 웹사이트 배포 및 구성 관리
- **구성 요소 관리** - PCF 컨트롤 및 기타 구성 요소 처리

### ⚙️ PAC CLI MCP 설정

#### Visual Studio Code에서 MCP 연결 구축

Visual Studio Code에서 Power Platform CLI MCP 서버를 연결하려면:

1. Visual Studio Code 명령 팔레트 열기 (Windows/Linux: `ctrl` + `shift` + `P`, Mac: `cmd` + `shift` + `P`)
1. "MCP"를 검색하고 `MCP: Add Server` 선택
1. `Command (stdio)` 선택
1. 다음 명령어를 붙여넣기:

    ```text
    pac copilot mcp --run
    ```

1. 서버 이름 입력 (예:):

    ```text
    Power Platform CLI MCP
    ```

이렇게 하면 Visual Studio Code의 MCP 구성에 MCP 서버가 추가되고 실행됩니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-pac-cli-mcp/powerplatform-cli-mcp-added-vs-code.png' | relative_url }}" alt="Visual Studio Code에서 실행 중인 Power Platform CLI MCP" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Visual Studio Code에서 실행 중인 Power Platform CLI MCP</figcaption></figure>

### 🛡️ 보안 및 도구 선택

운영 보안이 최우선입니다. MCP 통합을 통해 특정 CLI 명령을 **선택적으로 활성화**해 AI가 수행할 수 있는 작업을 완전히 제어할 수 있습니다.

**모범 사례:**

- 미션에 필요한 명령만 활성화
- 액세스 권한을 부여하기 전에 도구 권한 검토
- 다른 작업에 대해 환경별 구성 사용
- 실행된 모든 명령에 대해 MCP 서버 로그 모니터링

### 🔧 문제 해결

**일반적인 문제:**

1. **MCP 서버를 찾을 수 없음**
   - `pac copilot mcp`를 사용해 `pac-mcp.exe` 경로 확인
   - Power Platform CLI 버전 1.44+ 설치 확인

1. **인증 오류**
   - `pac auth list`를 실행해 인증 프로필 확인
   - 필요한 경우 `pac auth create`로 인증 설정

1. **도구 액세스 경고**
   - VS Code의 Output 창에서 MCP 관련 메시지 확인
   - MCP 서버 구성에서 도구 권한 확인

## 🧪 Lab 3.1 - 테넌트 설정 모범 사례 조언 받기

이제 더 깊이 들어갈 시간입니다. 테넌트 설정은 조직의 Power Platform 보안 상태의 근간입니다. 이 미션에서는 Visual Studio Code와 GitHub Copilot을 Power Platform CLI MCP 서버와 함께 사용해 테넌트를 분석하고 전략적 거버넌스 인텔을 추출합니다.

### ✅ 사전 요구사항

#### 필수 장비

- **Power Platform CLI (버전 1.44+)** - 위의 [Power Platform CLI 설치](#lab-1-1-install-the-power-platform-cli) 섹션의 배포 단계를 따르세요.
- **Visual Studio Code** - [code.visualstudio.com](https://code.visualstudio.com/)에서 다운로드
- **GitHub Copilot 확장** - VS Code 확장 마켓플레이스에서 설치

#### 인증 설정

- **Power Platform 인증 프로필** - `pac auth create`를 사용해 Power Platform 테넌트와 보안 연결 구축
- **관리자 권한** - 테넌트 설정을 보고 수정하려면 Power Platform 관리자 권한 필요

#### MCP 구성

- **Power Platform CLI MCP 서버** - 위의 [⚙️ PAC CLI MCP 설정](#setting-up-pac-cli-mcp) 섹션의 전체 설치 안내를 따르세요.

#### 검증 단계

1. **Power Platform CLI 배포 확인:**

   ```bash
   pac --version
   ```

1. **인증 상태 확인:**

   ```bash
   pac auth list
   ```

1. **MCP 서버 위치 확인:**

   ```bash
   pac copilot mcp
   ```

1. **명령 센터 테스트:**
   - VS Code 열기
   - MCP 구성에 Power Platform CLI MCP 서버가 표시되는지 확인
   - GitHub Copilot이 활성화되어 있는지 확인

### 🎯 CLI 기반 테넌트 설정 관리의 전술적 이점

Admin Center만 사용하는 것 대비 CLI를 통한 테넌트 설정 관리의 주요 이점입니다:

#### 종합적인 설정 접근

Power Platform Admin Center는 모든 사용 가능한 테넌트 설정을 UI에 노출하지 않습니다. `pac admin list-tenant-settings`를 사용하면 웹 포털에서 보이지 않는 설정을 포함한 전체 테넌트 구성 집합에 접근할 수 있습니다.

#### 대량 작업

Admin Center에서 수십 가지 설정을 수동으로 클릭하는 대신 CLI를 통해 단 한 번에 여러 테넌트 설정을 업데이트할 수 있습니다. 새 테넌트 구성, 여러 환경에 걸친 설정 표준화, 또는 조직 전체 정책 변경 시 매우 중요합니다.

#### 버전 관리 및 문서화

`pac admin list-tenant-settings --settings-file`을 사용해 테넌트 설정을 JSON 파일로 다운로드하면 다음이 가능합니다:

- Git 같은 버전 관리 시스템으로 시간에 따른 변경 사항 추적
- 규정 준수 감사를 위한 구성 스냅샷 유지
- 코드로 테넌트 구성 문서화
- 다른 환경이나 시점 간의 설정 비교

#### 자동화 및 DevOps 통합

CLI 명령을 자동화된 배포 파이프라인에 통합할 수 있습니다:

- 개발, 스테이징, 프로덕션 전반에 일관된 테넌트 구성 적용
- 테넌트 설정을 인프라-코드 전략의 일부로 포함
- 규정 준수 검사 및 정책 적용 자동화
- 구성 관리에서 사람의 실수 제거

#### 재해 복구

JSON 형식으로 문서화된 테넌트 설정은 문제 발생 시 신속하게 복원할 수 있는 신뢰할 수 있는 폴백을 제공합니다.

### 🤖 AI 핸들러 도입

Power Platform CLI MCP 서버는 복잡한 명령 구문과 매개변수 조합을 외울 필요를 없애 테넌트 설정 관리를 혁신합니다.

#### 예시 1: 정찰 — 현재 테넌트 설정 보기

테넌트 설정을 추출하는 정확한 CLI 구문을 외우는 대신 특정 인텔을 요청할 수 있습니다:

```text
Show me the current tenant settings for trial environment creation
```

출력 예시:

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-pac-cli-mcp/show-trial-env-creation-setting.png' | relative_url }}" alt="체험 환경 생성 설정 표시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>체험 환경 생성 설정</figcaption></figure>

#### 예시 2: 실행 — 테넌트 설정 업데이트

환경 생성 제한에 대한 올바른 매개변수를 찾는 대신 원하는 정책 변경을 설명합니다:

```text
Update my tenant to restrict developer environment creation to admins only
```

출력 예시:

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-pac-cli-mcp/restrict-developer-environments-to-admins-only.png' | relative_url }}" alt="개발자 환경 생성을 관리자로 제한" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>개발자 환경 생성 제한</figcaption></figure>

GitHub Copilot이 적절한 CLI 명령을 대신 실행합니다.

### 💡 테넌트 설정에 대한 전략적 조언

개별 테넌트 설정을 하나씩 업데이트하는 것이 유용할 수 있지만, Power Platform CLI와 AI를 결합할 때의 진정한 힘은 조직이나 클라이언트를 위한 포괄적인 거버넌스 전략을 개발해야 할 때 발휘됩니다.

다음 프롬프트를 GitHub Copilot에서 사용해보세요:

```text
Analyze my current Power Platform tenant settings and provide a strategic governance improvement plan. Please provide:

1. An assessment of my current tenant configuration against Microsoft's recommended best practices
2. A prioritized list of settings that should be updated for better security, governance, and user experience  
3. A phased implementation roadmap for the next 3-6 months with:
   - Priority levels (Critical/High/Medium/Low) for each change
   - Risk assessment and business impact for each setting
   - Recommended implementation sequence
   - Communication considerations for stakeholders
4. Specific CLI commands I can use to implement each recommended change
5. Key monitoring points to track after implementation

Focus on enterprise governance, security compliance, and developer productivity optimization. Provide the plan as structured guidance rather than creating files or executing commands.
```

### 📊 현장 보고서: 테넌트 분석 결과

이 종합 프롬프트를 실제 Power Platform 테넌트에 적용했을 때 GitHub Copilot이 상세한 전략적 거버넌스 개선 계획을 생성했습니다. 전체 현장 보고서는 마크다운 문서로 저장되었습니다: [Power Platform 거버넌스 계획 보기]({{ '/chapters/academy-special-ops-pac-cli-mcp-power-platform-plan/' | relative_url }}).

<div class="info-box note" markdown="1">
**경고**: 생성된 계획은 특정 조직 요구사항에 맞게 검토와 검증이 필요할 수 있지만, 일반적으로 수시간의 조사, 문서 검토, 전략 계획이 필요한 전술적 기반을 제공합니다. 이는 AI가 거버넌스 계획을 며칠에서 몇 분으로 압축할 수 있음을 보여줍니다.
</div>

## ✅ 미션 완료

축하합니다, 에이전트 — 미션 완료! Model Context Protocol을 사용해 Power Platform CLI와 GitHub Copilot 사이에 보안 명령 채널을 구축했습니다.

이 미션에서 달성한 것:

✅ **CLI 배포**: .NET 전역 도구로 Power Platform CLI를 설치하고 구성했습니다.

✅ **MCP 통합**: 자연어 작업을 위해 Power Platform CLI MCP 서버를 Visual Studio Code에 연결했습니다.

✅ **테넌트 정찰**: AI 기반 명령으로 테넌트 설정과 환경 구성을 분석했습니다.

✅ **거버넌스 전략**: AI를 활용해 실제 테넌트 데이터로 포괄적인 거버넌스 개선 계획을 생성했습니다.

## 🏅 완료 배지 받기

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-pac-cli-mcp/CommandLine_Badge.png' | relative_url }}" alt="Command Line Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Command Line Badge</figcaption></figure>

배지 요청 양식을 제출하고 모든 필수 질문에 답하세요:

[https://aka.ms/agent-academy-special-ops/cli-mcp/form](https://aka.ms/agent-academy-special-ops/cli-mcp/form)

제출이 검토되면 Global AI Community에서 배지 수령 안내 이메일을 받게 됩니다.

<div class="info-box note" markdown="1">
**팁**: 이메일이 보이지 않으면 스팸 또는 정크 폴더를 확인하세요.
</div>

## 📚 전술 자료

🧪 [Power Platform 거버넌스 계획 예시]({{ '/chapters/academy-special-ops-pac-cli-mcp-power-platform-plan/' | relative_url }}) — AI를 사용해 생성된 전략적 거버넌스 개선 계획 현장 보고서

📖 [Visual Studio Code에서 MCP 서버 추가](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)

📖 [Power Platform CLI 문서](https://learn.microsoft.com/power-platform/developer/cli/introduction)

📖 [GitHub 토론: PAC CLI MCP 미리보기](https://github.com/microsoft/powerplatform-build-tools/discussions/1182)
