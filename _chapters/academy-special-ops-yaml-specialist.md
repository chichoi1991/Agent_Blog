---
layout: "chapter"
title: "🧬 YAML Specialist"
short_title: "YAML Specialist"
description: "VS Code에서 YAML 에이전트 정의 언어를 사용해 Copilot Studio 에이전트를 완전히 코드로 빌드하고 확장하는 실전 랩입니다. GitHub Copilot과 전문 스킬을 활용한 AI 지원 YAML 작성을 다룹니다."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/yaml-specialist/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-04-02"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/yaml-specialist/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🧬 YAML Specialist](https://microsoft.github.io/agent-academy/special-ops/yaml-specialist/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# 🧬 YAML Specialist

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/YAML_Specialist_Badge.png' | relative_url }}" alt="YAML Specialist Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>YAML Specialist Badge</figcaption></figure>

에이전트 여러분, 여러분의 미션 — 받아들인다면 — 은 **YAML Specialist**가 되는 것입니다. Copilot Studio YAML 에이전트 정의 언어를 사용해 Visual Studio Code에서 완전히 Microsoft Copilot Studio 에이전트를 빌드하고 확장하는 오퍼레이티브가 되세요. 에이전트를 클론하고, 원시 YAML로 토픽을 작성하고, 지식 소스를 연결하고, 변경사항을 다시 클라우드에 푸시하세요 — 모두 로컬 명령 센터에서. GitHub Copilot을 핸들러로 활용하면 웹 UI가 따라올 수 없는 속도로 반복 작업을 할 수 있습니다.

<div class="info-box note" markdown="1">
**이 미션은 VS Code와 클래식 Copilot Studio 환경을 혼합합니다**

Microsoft Copilot Studio는 새로운 작성 환경을 롤아웃 중입니다. 이 미션의 스크린샷과 웹 UI 단계는 **클래식 환경**을 사용합니다. 화면이 다르게 보인다면 계속하기 전에 오른쪽 상단에서 **New Experience**를 끄세요.
</div>

**미션 목표:**

- Copilot Studio VS Code 확장을 설정하고 에이전트를 로컬 머신에 클론
- 토픽, 액션, 트리거, 지식이 포함된 YAML 에이전트 정의 파일 구조 이해
- IntelliSense 검증을 통해 YAML 토픽을 수작업으로 작성 및 편집
- 전문 스킬을 갖춘 GitHub Copilot Agent Mode를 활용해 에이전트 YAML 생성 및 개선
- 로컬 변경사항을 Copilot Studio에 동기화하고 클라우드에서 에이전트 테스트

## ⚙️ 사전 요구사항

이 미션은 여러분이 Operative 과정을 완료하고 작동하는 Copilot Studio 환경을 보유하고 있다고 가정합니다. 또한 다음이 설치되어 있어야 합니다:

- **Visual Studio Code** - [code.visualstudio.com](https://code.visualstudio.com/)에서 다운로드 및 설치
- **Node.js (LTS)** - Copilot Studio VS Code 확장에 필요. [nodejs.org](https://nodejs.org/)에서 다운로드. **LTS** 버전 선택. 터미널에서 `node --version`으로 확인.

<div class="info-box note" markdown="1">
**팁**: VS Code가 이미 설치되어 있다면 GitHub Copilot 및 Copilot Studio 확장을 나중에 실습 중에 설치할 수 있습니다. 각 확장 설치 단계는 랩에서 안내합니다.
</div>

## ❓ Copilot Studio용 YAML 작성이란?

<div class="info-box note" markdown="1">
**YAML이란?**

YAML은 구조화된 정보를 저장하는 간단한 텍스트 형식입니다. 잘 정리된 개요처럼 생각하세요 — 중괄호나 꺾쇠 괄호 대신 YAML은 **들여쓰기**(공백)를 사용해 중첩 방식을 표시합니다. 예:

```yaml
name: Travel Agent
language: English
settings:
  greeting: Hello! How can I help you travel safely?
  topics:
    - safety-tips
    - cultural-advice
```

`settings`가 기본 레벨 아래에 들여쓰기되어 있고, `greeting`과 `topics`가 `settings` 안에 더 들여쓰기된 것을 주목하세요. **왼쪽에 이름, 오른쪽에 값, 콜론으로 구분, 들여쓰기로 구조 표시**가 전부입니다. YAML 파일은 `.yaml` 또는 `.yml` 확장자를 사용합니다. Copilot Studio에서 에이전트의 모든 부분 — 토픽, 도구, 트리거, 설정 — 은 YAML 파일에 저장됩니다.
</div>

모든 Copilot Studio 에이전트에는 정의가 있습니다 — 에이전트의 개성, 토픽, 도구, 지식 소스, 트리거를 설명하는 YAML 파일 세트. Copilot Studio 웹 UI에서 에이전트를 빌드할 때 실제로는 이 YAML 파일들을 편집하고 있는 것입니다. 웹 캔버스는 시각적 표현을 제공하지만 **진실의 원천은 항상 YAML**입니다.

<div class="info-box note" markdown="1">
**팁**: 웹 캔버스에서 모든 토픽이나 도구 뒤의 YAML을 직접 볼 수 있습니다. 토픽을 열고 툴바에서 **Open code editor**를 선택하면 원시 YAML을 볼 수 있습니다. VS Code로 이동하기 전에 스키마를 배우는 좋은 방법입니다.
</div>

Visual Studio Code용 Copilot Studio 확장은 이 에이전트 정의 파일에 직접 접근할 수 있게 해줍니다:

- **Clone** - 클라우드에서 로컬 파일 시스템으로 에이전트 다운로드
- **Edit** - IntelliSense를 사용해 구조화된 YAML로 토픽, 지시사항, 지식, 도구 편집
- **Apply** - 변경사항을 클라우드에 업로드해 테스트
- **버전 관리** - Git으로 에이전트 정의를 코드로 관리

이것이 전문 에이전트 개발자들이 일하는 방식입니다 — 에이전트 정의를 코드로 취급하고, 풀 리퀘스트를 통해 협업하고, AI 지원으로 빠르게 반복합니다.

## 🆚 웹 UI vs YAML 작성: 언제 어떤 것을 사용할까

| 측면 | 웹 UI (Copilot Studio) | YAML 작성 (VS Code) |
| --- | --- | --- |
| **최적 용도** | 시각적 탐색, 빠른 프로토타입 | 대규모 개발, 팀 협업 |
| **편집 속도** | 포인트-앤-선택, 한 번에 한 노드 | 전체 텍스트 검색, 파일 전체 대량 편집 |
| **AI 지원** | 캔버스의 Copilot | 전문 스킬을 갖춘 GitHub Copilot Agent Mode |
| **협업** | 토픽당 한 명의 저자 | Git 브랜치를 통한 여러 개발자 |
| **테스트** | 내장 테스트 패널 | 변경사항 적용 후 Copilot Studio에서 테스트 |
| **학습 곡선** | 낮음 - 시각적이고 안내됨 | 중간 - YAML과 VS Code 친숙도 필요 |

<div class="info-box note" markdown="1">
**팁**: 하나를 선택해야 하는 것이 아닙니다. 많은 팀이 초기 프로토타입에는 웹 UI를 사용하고 프로덕션 수준 개발에는 YAML 작성으로 전환합니다. 웹 UI에서 변경한 내용은 **Get** 작업으로 다운로드할 수 있고, 로컬 YAML 변경사항은 **Apply**로 업로드할 수 있습니다.
</div>

## 📁 에이전트 정의 파일 구조

Copilot Studio 에이전트를 클론하면 확장이 머신에 구조화된 디렉터리를 만듭니다:

```text
my-agent/
├── actions/                  # 커넥터
│   ├── DevOpsAction.mcs.yml  
│   └── GetItems.mcs.yml      
├── knowledge/files/          # 지식 소스
│   ├── source1.mcs.yml
│   └── source2.mcs.yml
├── topics/                   # 대화 토픽
│   ├── greeting.mcs.yml
│   ├── help.mcs.yml
│   └── escalate.mcs.yml
├── variables/                # 전역 변수 정의
│   └── UserCountry.mcs.yml
├── workflows/                # 에이전트 도구 및 액션
│   └── GetDevOpsItems
│       ├── metadata.yaml
│       └── workflow.json
│   └── GetMeetings
│       ├── metadata.yaml
│       └── workflow.json
├── trigger/                  # 이벤트 트리거
│   └── welcometrigger.mcs.yml
├── agent.mcs.yml             # 메인 에이전트 정의
├── icon.png                  # 에이전트 아이콘
├── settings.mcs.yml          # 에이전트 구성 설정
└── connectionreferences.mcs.yml  # 커넥터에서 사용하는 연결 참조
```

**알아야 할 주요 파일:**

| 파일/폴더 | 목적 |
| --- | --- |
| `agent.mcs.yml` | 메인 에이전트 정의 - 이름, 설명, 지시사항, 스키마 |
| `topics/` | 각 `.mcs.yml` 파일은 트리거, 액션, 대화 로직이 있는 토픽 |
| `actions/` | 커넥터 도구 정의 - 커넥터, REST API, MCP 서버 |
| `knowledge/files/` | 업로드된 지식 문서 |
| `variables/` | 토픽 전체에서 사용되는 전역 변수 정의 |
| `settings.mcs.yml` | 에이전트 구성 및 오케스트레이션 설정 |
| `workflows/` | 도구로 사용되는 에이전트 흐름 |
| `trigger/` | 이벤트 기반 트리거 (일정, 조건) |
| `connectionreferences.mcs.yml` | 커넥터 및 기타 액션에서 사용하는 연결 참조 |

## 🔧 YAML 토픽 해부학

토픽은 에이전트의 대화 빌딩 블록입니다. 각 토픽은 YAML로 작성된 `AdaptiveDialog`입니다. 간단한 인사말 토픽의 해부학:

```yaml
kind: AdaptiveDialog
beginDialog:
  kind: OnConversationStart
  id: main
  actions:
    - kind: SendActivity
      id: sendMessage_greeting
      activity:
        text:
          - Hello, I'm {System.Bot.Name}. How can I help?
        speak:
          - Hello and thank you for calling {System.Bot.Name}.
```

**주요 YAML 요소:**

- **`kind`** - 노드 유형 (`AdaptiveDialog`, `SendActivity`, `Question`, `ConditionGroup` 등)
- **`id`** - 각 노드의 고유 식별자
- **`actions`** - 토픽이 실행하는 단계의 정렬된 목록
- **`variable`** - `init:Topic.VariableName` 구문을 사용한 변수 할당
- **`entity`** - 질문 노드의 엔티티 유형 (예: `BooleanPrebuiltEntity`, `StringPrebuiltEntity`)
- **`condition`** - 조건부 로직을 위한 Power Fx 표현식 (`=`로 시작)

### 질문과 변수

```yaml
- kind: Question
  id: question_askName
  alwaysPrompt: true
  variable: init:Topic.UserName
  prompt: What is your name?
  entity: StringPrebuiltEntity
```

### Power Fx를 사용한 조건부 로직

```yaml
- kind: ConditionGroup
  id: condition_checkResponse
  conditions:
    - id: condition_yes
      condition: =Topic.Continue = true
      actions:
        - kind: SendActivity
          id: sendMessage_continue
          activity: Go ahead. I'm listening.
    - id: condition_no
      condition: =Topic.Continue = false
      actions:
        - kind: SendActivity
          id: sendMessage_goodbye
          activity: Goodbye! Have a great day.
```

<div class="info-box note" markdown="1">
**참고**: 조건의 Power Fx 표현식에는 `=` 접두사를 붙여야 합니다. 이는 YAML 파서에게 값이 리터럴 문자열이 아닌 표현식임을 알려줍니다.
</div>

### 토픽 트리거 유형

토픽은 언제 실행되어야 하는지에 따라 다른 트리거 유형을 사용합니다:

- **`OnConversationStart`** - 대화 시작 시 자동으로 한 번 실행. 인사말 메시지에 사용.
- **`OnRecognizedIntent`** - 사용자가 트리거 구문과 일치하는 말을 할 때 실행.
- **`OnActivity`** - 특정 활동 유형에서 실행 (예: `Message`). 런타임 상태를 기반으로 조건을 제어하는 `condition` 속성을 포함할 수 있음.

<div class="info-box note" markdown="1">
**팁**: 사용자가 말한 내용이 아닌 런타임 상태(예: 전역 변수 확인)를 기반으로 토픽이 실행되어야 할 때는 `OnActivity`와 `condition`을 함께 사용하세요.
</div>

## 🧪 Lab 1.1 - 설정 및 에이전트 클론

이 섹션에서는 Copilot Studio에서 여행 에이전트를 만들고 VS Code 확장을 사용해 로컬 머신에 클론합니다.

### Lab 1.1: Copilot Studio에서 솔루션 및 에이전트 생성

먼저 전용 솔루션과 빈 여행 에이전트를 만듭니다. 이렇게 하면 미션 전체에서 사용할 실제 에이전트가 생깁니다.

1. [Copilot Studio](https://copilotstudio.microsoft.com)로 이동합니다.

1. 오른쪽 상단의 환경 선택기를 확인해 **환경**이 올바른지 확인합니다.

1. 왼쪽 탐색에서 **...**를 선택하고 **Solutions**를 선택합니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/select-solution.png' | relative_url }}" alt="왼쪽 탐색의 Solutions 메뉴" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Solutions 메뉴</figcaption></figure>

1. **New Solution**을 선택합니다.

1. 다음 설정으로 솔루션을 구성합니다:

    | 설정 | 값 |
    | --- | --- |
    | Display Name | `Travel Agent` |
    | Publisher | **New publisher** 선택 |

1. 새 퍼블리셔를 구성합니다:

    | 설정 | 값 |
    | --- | --- |
    | Display Name | `Travel Agent` |
    | Name | `TravelAgent` |
    | Prefix | `ta` |

1. 퍼블리셔 대화 상자에서 **Save**를 선택합니다.

1. **Set as your preferred solution**을 체크합니다.

1. **Create**를 선택합니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/new-solution.png' | relative_url }}" alt="Travel Agent 설정이 적용된 새 솔루션 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 솔루션 생성</figcaption></figure>

1. 왼쪽 상단의 **Copilot Studio** 로고를 선택해 Copilot Studio로 돌아갑니다.

1. 왼쪽 탐색에서 **Agents**를 선택합니다.

1. **+ Create blank agent**를 선택한 후 대화 상자 하단의 **Advanced Create**를 선택합니다.  
     <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/advanced-create.png' | relative_url }}" alt="Advanced Create" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Advanced Create</figcaption></figure>

1. 다음 설정으로 에이전트를 구성합니다:

     | 설정 | 값 |
     | --- | --- |
     | Language | `English (United States)` |
     | Solution | `Travel Agent` |
     | Schema name | `ta_travelagent` |

1. **Confirm and create**를 선택합니다.  
     <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/confirm-create.png' | relative_url }}" alt="에이전트 생성 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 생성 확인</figcaption></figure>

1. 에이전트 프로비저닝이 완료될 때까지 기다립니다 — 녹색 바에 **Your agent has been provisioned** 메시지가 표시됩니다.  
     <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/agent-provisioned.png' | relative_url }}" alt="에이전트 프로비저닝 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 프로비저닝 완료</figcaption></figure>

1. **Details** 섹션에서 **Edit**를 선택하고 이름을 `Travel Agent`로 업데이트합니다.

1. **Save**를 선택합니다.

1. 개요 페이지의 **Instructions** 섹션에서 **Edit**를 선택합니다.

1. 다음 지시사항을 입력합니다:

     ```text
     You are a travel assistant for company employees. Help them prepare for
     business trips by providing destination-specific travel advice, safety
     information, and cultural tips. Always be helpful, concise, and professional.
     ```

1. **Save**를 선택합니다.  
     <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/agent-details.png' | relative_url }}" alt="이름 및 지시사항 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 이름 및 지시사항 업데이트</figcaption></figure>

### Lab 1.2: Copilot Studio VS Code 확장 설치

1. **Visual Studio Code**를 엽니다.
1. 왼쪽의 Activity Bar에서 **Extensions** 아이콘을 선택합니다 (또는 `Ctrl+Shift+X`).
1. 검색 창에 **ms-copilotstudio.vscode-copilotstudio**를 입력합니다.
1. **Microsoft**가 게시한 확장을 찾아 **Install**을 선택합니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/install-copilot-studio-extension.png' | relative_url }}" alt="Copilot Studio 확장 설치" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Copilot Studio VS Code 확장 설치</figcaption></figure>

### Lab 1.3: 에이전트를 로컬 머신에 클론

1. 드롭다운 메뉴에서 대상 **환경**을 선택합니다.

1. 에이전트 목록에서 **Travel Agent**를 찾습니다.

    <div class="info-box note" markdown="1">
    **팁**: 환경과 에이전트 트리가 로드 중에 타임아웃될 수 있습니다. 목록이 비어 있거나 로드가 중단되면 Agents 패널 상단의 **Refresh** 버튼을 선택하고 다시 시도하세요.
    </div>

1. 에이전트 이름을 오른쪽 클릭하고 **Clone agent**를 선택합니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/clone-agent.png' | relative_url }}" alt="에이전트 클론" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 클론</figcaption></figure>

1. 파일 선택 대화 상자에서 적절한 폴더로 이동합니다 (또는 `travel-agent` 같은 새 폴더 생성).

1. **Select Folder** 버튼을 선택합니다.

1. 클론 프로세스가 완료될 때까지 기다립니다 — 진행 알림이 표시되고 이후 성공 메시지: **Agent Cloned successfully**가 표시됩니다. VS Code가 자동으로 선택한 폴더를 엽니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/cloning-agent.png' | relative_url }}" alt="에이전트 클론 중" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 클론 진행 중</figcaption></figure>

1. VS Code **Explorer** 패널에서 클론된 파일 구조를 확인합니다 — `agent.mcs.yml`, `topics/` 폴더, 기타 정의 파일이 보여야 합니다.

<div class="info-box note" markdown="1">
**참고**: 클론 작업은 전체 에이전트 정의 — 토픽, 액션, 지식, 워크플로우, 트리거, 구성 — 을 다운로드합니다. 이것이 로컬 작업 복사본입니다. 여기서 변경한 내용은 명시적으로 **Apply**할 때까지 클라우드 에이전트에 영향을 미치지 않습니다.
</div>

### Lab 1.4: 에이전트 정의 탐색

변경하기 전에 클론된 내용을 살펴봅니다.

1. Explorer에서 `agent.mcs.yml`을 엽니다 — 이것이 이름, 설명, 지시사항이 포함된 메인 에이전트 정의입니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/agent-cloned.png' | relative_url }}" alt="클론된 에이전트 YAML" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>클론된 에이전트 YAML</figcaption></figure>

1. `topics/` 폴더를 검토합니다 — 각 `.mcs.yml` 파일은 대화 토픽을 나타냅니다.

1. 기존 토픽 파일을 열고 YAML 구조를 살펴봅니다 — `kind`, `id`, `actions` 속성을 확인합니다.

1. `settings.mcs.yml`을 엽니다 — 오케스트레이션 및 구성 설정이 포함되어 있습니다.

1. YAML 파일 안에서 `Ctrl+Space`를 누르면 Copilot Studio 확장의 IntelliSense 제안을 볼 수 있습니다.

1. `Ctrl+Shift+M`을 눌러 **Problems** 패널을 엽니다 — 확장이 YAML을 실시간으로 검증하고 오류를 빨간 밑줄로 표시합니다.

<div class="info-box note" markdown="1">
**팁**: `Ctrl+F`를 사용해 전체 에이전트 정의에서 검색할 수 있습니다. 수십 개의 토픽과 도구가 있는 에이전트에서 특히 웹 UI에서 토픽 간을 탐색하는 것보다 훨씬 빠릅니다.
</div>

## 🧪 Lab 2.1 - Copilot Studio 스킬로 GitHub Copilot 활성화

GitHub Copilot은 강력한 AI 코딩 어시스턴트이지만 기본적으로 Copilot Studio YAML 스키마를 알지 못합니다. 전문 **에이전트 스킬**을 설치하면 GitHub Copilot에게 YAML 에이전트 정의 언어에 대한 깊은 지식을 줄 수 있습니다.

### Lab 2.1: GitHub Copilot CLI 설치 및 열기

1. [GitHub Copilot 구독](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot)이 있는지 확인합니다. **무료 플랜**(신용카드 불필요)이 이 미션에서 작동합니다 — Agent 모드, Copilot CLI, 월 50개의 채팅/에이전트 요청이 포함됩니다. 이 미션은 약 5-10개의 요청을 사용합니다.

1. VS Code를 열고 **Extensions** 아이콘(또는 `Ctrl+Shift+X`)을 선택하고 **github.copilot-chat**을 검색한 후 아직 설치되지 않았으면 **Install**을 선택합니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/install-github-copilot.png' | relative_url }}" alt="GitHub Copilot Chat 설치" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>GitHub Copilot Chat 설치</figcaption></figure>

1. 메뉴 바에서 **Terminal** → **New Terminal** (또는 `` Ctrl+` ``)로 터미널을 열고 터미널 탭 옆의 **+** 드롭다운을 선택한 후 **GitHub Copilot CLI**를 선택합니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/open-cli.png' | relative_url }}" alt="GitHub Copilot CLI 열기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>GitHub Copilot CLI 열기</figcaption></figure>

1. 터미널의 전체 화면 아이콘을 선택해 GitHub Copilot CLI를 확장할 수 있습니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/expand-cli.png' | relative_url }}" alt="GitHub Copilot CLI 확장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>GitHub Copilot CLI 확장</figcaption></figure>

### Lab 2.2: Copilot Studio 스킬 설치

[skills-for-copilot-studio](https://github.com/microsoft/skills-for-copilot-studio) 저장소에는 GitHub Copilot에게 유효한 Copilot Studio YAML을 작성하는 방법을 가르치는 전문 스킬이 포함되어 있습니다.

1. 2.1 섹션에서 열었던 **GitHub Copilot CLI** 터미널에서 마켓플레이스에서 스킬 패키지를 추가합니다:

    ```text
    /plugin marketplace add microsoft/skills-for-copilot-studio
    ```

1. 스킬을 설치합니다:

    ```text
    /plugin install copilot-studio@skills-for-copilot-studio
    ```

1. CLI 터미널에서 `/plugin list`를 입력해 스킬을 확인합니다 — `copilot-studio@skills-for-copilot-studio`가 표시되어야 합니다.

<div class="info-box note" markdown="1">
**팁**: 슬래시 명령을 통한 클론, 푸시, 테스트, 문제 해결을 포함한 추가 옵션은 전체 [설정 가이드](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md)를 참조하세요.
</div>

## 🧪 Lab 3.1 - AI로 ConversationInit 토픽 빌드

GitHub Copilot과 Copilot Studio 스킬을 사용해 `ConversationInit` 토픽을 생성합니다. 이 토픽은 시간대에서 사용자의 국가를 감지하고 여행 경험을 개인화합니다.

### Lab 3.1: ConversationInit 토픽 생성

1. 2.1 섹션에서 열었던 **GitHub Copilot CLI** 터미널에서 다음 프롬프트를 입력합니다:

    ```text
    /agent
    ```

1. GitHub Copilot이 **Select Agent**를 요청합니다. **Copilot Studio Author**를 선택합니다.

1. 변경할 때 GitHub Copilot이 파일을 만들고 접근할 때 확인을 요청합니다. Autopilot 모드로 실행하려면 `shift + tab`을 사용해 **Autopilot**으로 전환할 수 있습니다.

1. 다음 프롬프트를 입력합니다:

    ```text
    Create a ConversationInit topic that detects the user's country from
    System.Conversation.LocalTimeZone using AnswerQuestionWithAI, shows them
    the result, and asks them to confirm or correct it using AnswerQuestionWithAI. Store the confirmed
    country in Global.UserCountry. Update the agent instructions to use
    {Global.UserCountry} for tailored travel advice. Be sure to initialize the value of Global.UserCountry to be DEFAULT inside the ConversationStart Topic.
    ```

1. GitHub Copilot이 현재 폴더를 신뢰할지 묻습니다. **Yes, and add these directories to the allowed list**를 선택합니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/trust-directory.png' | relative_url }}" alt="디렉터리 신뢰" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>디렉터리 신뢰</figcaption></figure>

1. Autopilot 모드를 선택했다면 모든 권한을 활성화하라는 메시지가 표시됩니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/enable-autopilot.png' | relative_url }}" alt="Autopilot 모드 활성화" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Autopilot 모드 활성화</figcaption></figure>

1. GitHub Copilot이 YAML을 생성할 때까지 기다립니다 — `topics/` 폴더에 새 `.mcs.yml` 파일을 만들고 `agent.mcs.yml`을 편집하며 새 변수 정의를 추가할 것입니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/agent-complete.png' | relative_url }}" alt="편집된 파일로 완성된 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>GitHub Copilot이 생성한 에이전트 파일</figcaption></figure>

1. GitHub Copilot이 변경한 수를 보여주는 Copilot Studio 확장을 선택합니다. 생성된 토픽 파일을 검토하고 구조를 확인합니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/review-changes.png' | relative_url }}" alt="변경 사항 검토" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>변경 사항 검토</figcaption></figure>

1. 생성된 내용의 예시:

    ```yaml
    mcs.metadata:
      componentName: Conversation Init
      description: Detects user's country from timezone using AI and confirms with the user.
    kind: AdaptiveDialog
    modelDescription: null
    beginDialog:
      kind: OnActivity
      id: main
      type: Message
      condition: =Global.UserCountry = "DEFAULT" || IsBlank(Global.UserCountry)
      actions:
        - kind: AnswerQuestionWithAI
          id: answerWithAI_Jk7mPq
          userInput: ="The user's local timezone is " & System.Conversation.LocalTimeZone & ". Based on this timezone, what country is the user most likely located in? Respond with ONLY the country name, nothing else."
          autoSend: false
          variable: Topic.DetectedCountry
        - kind: SendActivity
          id: sendMessage_Xn4wBt
          activity:
            text:
              - "Based on your timezone ({System.Conversation.LocalTimeZone}), I believe you're located in {Topic.DetectedCountry}."
        - kind: Question
          id: question_Rm8kLp
          variable: init:Topic.UserResponse
          prompt: Is this correct? If not, please tell me your actual country.
          entity: StringPrebuiltEntity
        - kind: SetVariable
          id: setVariable_Hp6jKw
          variable: Global.UserCountry
          value: =Topic.ConfirmedCountry
        - kind: SendActivity
          id: sendMessage_Qv9dNw
          activity:
            text:
              - "Great! I'll tailor my travel advice for {Global.UserCountry}. How can I help you today?"
    ```

1. `Ctrl+Shift+M`으로 **Problems** 패널을 확인해 YAML 검증 오류가 있는지 확인합니다. 오류가 있으면 GitHub Copilot에게 수정을 요청하세요.

### Lab 3.2: 업데이트된 에이전트 지시사항 검토

GitHub Copilot이 `agent.mcs.yml` 파일도 업데이트해 지시사항에 `{Global.UserCountry}` 참조를 포함했어야 합니다.

1. Explorer에서 `agent.mcs.yml`을 엽니다.
1. `instructions` 섹션에서 `{Global.UserCountry}` 참조를 찾습니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/agent-instructions-updated.png' | relative_url }}" alt="업데이트된 에이전트 지시사항" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>업데이트된 에이전트 지시사항</figcaption></figure>

## 🧪 Lab 4.1 - 지식 소스 및 가드레일 추가

### Lab 4.1: AI를 통해 지식 소스 추가

1. 3섹션에서 사용했던 **GitHub Copilot CLI** 터미널에서 `/agents`로 **Copilot Studio Author** 에이전트를 다시 선택합니다.

1. 다음 프롬프트를 입력합니다:

    ```text
    Add public website knowledge sources for Lonely Planet, TripAdvisor,
    US State Department travel advisories (travel.state.gov), UK government
    foreign travel advice, and CDC travel health information. Add guardrails
    to the agent instructions: travel topics only, no bookings, no medical
    advice, cite sources for safety information.
    ```

1. 에이전트가 완료되면 GitHub Copilot이 제안하는 변경사항을 검토합니다 — 지식 구성 파일을 수정하고 에이전트 지시사항을 업데이트해야 합니다.  
   <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/knowledge-added.png' | relative_url }}" alt="지식 추가됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>지식 소스 추가됨</figcaption></figure>

## 🧪 Lab 5.1 - 변경사항 적용 및 테스트

### Lab 5.1: 변경사항 미리보기 및 적용

Copilot Studio 확장은 세 가지 동기화 작업을 제공합니다:

| 작업 | 방향 | 설명 |
| --- | --- | --- |
| **Preview** | 클라우드 → 로컬 | 로컬 파일을 수정하지 않고 원격 변경사항 확인 |
| **Get** | 클라우드 → 로컬 | 원격 변경사항 다운로드 및 적용 (충돌 해결 포함) |
| **Apply** | 로컬 → 클라우드 | 로컬 변경사항을 Copilot Studio에 업로드 (게시 아님) |

1. Activity Bar에서 **Copilot Studio** 아이콘을 선택합니다.
1. **Agent Changes** 패널에서 **Preview**를 선택해 클론 이후 원격 변경사항이 있는지 확인합니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/preview-changes.png' | relative_url }}" alt="변경사항 미리보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>변경사항 미리보기</figcaption></figure>
1. 확장이 **Successfully completed previewing changes**를 보고합니다. 원격 변경사항이 있으면 **Get**을 선택해 다운로드하고 충돌을 해결합니다.
1. **Apply changes**를 선택한 후 에이전트 이름을 선택합니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/apply-changes.png' | relative_url }}" alt="변경사항 적용" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>변경사항 적용</figcaption></figure>
1. 적용 작업이 완료될 때까지 기다립니다 — 성공 알림: **Successfully completed applying changes**가 표시됩니다.

<div class="info-box note" markdown="1">
**중요**: **Apply** 작업은 변경사항을 실시간 에이전트 정의에 업로드하지만 에이전트를 **게시하지는 않습니다**. 적용 후 바로 Copilot Studio 테스트 패널에서 테스트할 수 있습니다. 채널의 최종 사용자에게 에이전트를 사용 가능하게 하려면 여전히 Copilot Studio에서 **Publish**해야 합니다.
</div>

### Lab 5.2: Copilot Studio에서 에이전트 테스트

1. [Copilot Studio](https://copilotstudio.microsoft.com)로 이동합니다.

1. **Travel Agent**를 다시 엽니다.

1. 오른쪽의 **Test your agent** 패널을 선택합니다.

1. **+** 아이콘을 선택해 새 대화를 시작합니다.

1. 여행 관련 질문을 합니다:

    ```text
    I'm planning a business trip to Tokyo next month. What should I know about safety and cultural etiquette?
    ```

1. 에이전트가 목적지별 조언을 제공하고, 소스를 인용하고, 가드레일을 준수하는지 확인합니다.  
    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/test-agent.png' | relative_url }}" alt="업데이트된 에이전트 테스트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 테스트 결과</figcaption></figure>

<div class="info-box note" markdown="1">
**팁**: 에이전트가 예상대로 작동하지 않으면 VS Code로 돌아가 YAML을 조정하고 다시 **Apply**하세요. 한 번에 여러 관련 소스 파일을 반복적으로 편집하고 테스트하는 이 빠른 반복 주기가 YAML 작성의 핵심 전술적 이점 중 하나입니다.
</div>

## ✅ 미션 완료

축하합니다, 에이전트 — **Operation YAML Specialist** 완료! 이제 다음 스킬을 마스터했습니다:

✅ **로컬 에이전트 개발**: Copilot Studio 에이전트를 로컬 머신에 클론하고 VS Code에서 YAML 정의 파일을 직접 작업했습니다.

✅ **YAML 작성**: 에이전트 정의 파일 구조 — 토픽, 액션, 지식, 변수, 트리거, 구성 — 를 이해했습니다.

✅ **AI 지원 작성**: Copilot Studio 스킬을 갖춘 GitHub Copilot을 사용해 에이전트 YAML을 빠르게 생성하고 개선했습니다.

✅ **지식 및 가드레일**: 공개 웹사이트 지식 소스와 안전 가드레일을 추가해 에이전트 동작을 형성했습니다.

✅ **동기화 워크플로우**: 로컬 변경사항을 Copilot Studio에 적용하고 에이전트를 엔드-투-엔드로 테스트했습니다.

## 📚 전술 자료

📖 [Copilot Studio VS Code 확장 개요](https://learn.microsoft.com/microsoft-copilot-studio/visual-studio-code-extension-overview)

📖 [VS Code 확장 설치 및 구성](https://learn.microsoft.com/microsoft-copilot-studio/visual-studio-code-extension-install-configure)

📖 [VS Code에서 에이전트 클론](https://learn.microsoft.com/microsoft-copilot-studio/visual-studio-code-extension-clone-agent)

📖 [VS Code에서 에이전트 구성 요소 편집](https://learn.microsoft.com/microsoft-copilot-studio/visual-studio-code-extension-edit-agent-components)

📖 [변경사항 동기화](https://learn.microsoft.com/microsoft-copilot-studio/visual-studio-code-extension-synchronization)

📖 [토픽의 YAML 코드 편집기 사용](https://learn.microsoft.com/microsoft-copilot-studio/guidance/topics-code-editor)

🔗 [Skills for Copilot Studio - GitHub 저장소](https://github.com/microsoft/skills-for-copilot-studio)

🔗 [Copilot Studio 확장 - VS Code 마켓플레이스](https://marketplace.visualstudio.com/items?itemName=ms-CopilotStudio.vscode-copilotstudio)

## 🏅 완료 배지 받기

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-yaml-specialist/YAML_Specialist_Badge.png' | relative_url }}" alt="YAML Specialist Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>YAML Specialist Badge</figcaption></figure>

배지 요청 양식을 제출하고 모든 필수 질문에 답하세요:

[https://aka.ms/agent-academy-special-ops/yaml-specialist/form](https://aka.ms/agent-academy-special-ops/yaml-specialist/form)

제출이 검토되면 Global AI Community에서 배지 수령 안내 이메일을 받게 됩니다.

<div class="info-box note" markdown="1">
**팁**: 이메일이 보이지 않으면 스팸 또는 정크 폴더를 확인하세요.
</div>
