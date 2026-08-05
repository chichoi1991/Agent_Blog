---
layout: chapter
date: 2026-08-05
title: "Lab CWRK2 — 첫 번째 Cowork 플러그인 만들기"
short_title: "Cowork 플러그인 만들기"
description: "여러 개의 스킬과 MCP 커넥터를 담은 Copilot Cowork 플러그인 패키지를 만들고, 패키징을 자동화하고, Microsoft 365 관리 센터에서 배포합니다."
order: 2
category: cowork
parent: "cowork-devcamp"
tags: ["Copilot Cowork", "Plugins", "MCP", "manifest.json"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — Cowork 플러그인은 `manifest.json`(필수) + 0개 이상의 스킬(`SKILL.md`) + 선택적 원격 MCP 커넥터를 담은 **Microsoft 365 앱 패키지(`.zip`)** 입니다. 이 랩에서는 스킬 3개와 커넥터 1개를 가진 플러그인을 만들어 `npm run package`로 패키징하고, 관리 센터에서 배포합니다.
</div>

> 이 글은 Microsoft 공식 [Copilot Developer Camp](https://microsoft.github.io/copilot-camp/pages/copilot-cowork/02-cowork-plugins/)의 **Lab CWRK2** 를 한국어로 옮긴 것입니다. [Lab CWRK1]({{ '/chapters/cowork-dc1-skills/' | relative_url }})을 먼저 완료하는 것을 권장합니다.

이 랩에서는 Copilot Cowork 플러그인이 **패키지화된 스킬과 커넥터**로 Cowork를 어떻게 확장하는지, 그리고 직접 플러그인을 만들어 배포하는 방법을 배웁니다.

큰 그림에서 Cowork 플러그인은 다음을 포함할 수 있는 Microsoft 365 앱 패키지(`.zip`)입니다.

- **필수 매니페스트**(`manifest.json`) — Cowork가 플러그인 자산을 어떻게 로드·사용할지 기술
- **0개 이상의 커스텀 스킬**(`SKILL.md` 파일)
- **선택적 원격 MCP 서버 커넥터**

이 랩을 마치면 다음을 할 수 있습니다.

- Cowork 플러그인이 무엇이고 Cowork 경험에서 어디에 위치하는지 이해
- 사용 가능한 Microsoft·파트너 플러그인과 사용자/관리자의 관리 방식 탐색
- 여러 스킬과 MCP 커넥터를 담은 커스텀 플러그인 패키지 제작
- `package.json` 스크립트로 패키징 자동화
- Microsoft 365 관리 센터에서 플러그인 배포

---

## 실습 1: Copilot Cowork의 플러그인 모델 이해하기

이 실습에서는 플러그인에 대한 실무적 멘탈 모델과, 재사용 가능한 스킬을 선택적 커넥터와 결합하는 방식을 파악합니다.

### 1단계: Cowork 플러그인의 구성 요소

Cowork 플러그인은 Microsoft 365 앱 패키지로 배포되며 다음을 포함할 수 있습니다.

- **Skills** — Cowork가 도메인 작업을 어떻게 실행할지 알려주는 지침 기반 워크플로
- **Connectors** — 도구와 데이터를 노출하는 원격 MCP 엔드포인트

덕분에 유연한 패키징 모델이 가능합니다.

| 패키징 유형 | 설명 |
|-------------|------|
| **스킬 전용** | 외부 시스템 없이 워크플로 가이드만 제공 |
| **커넥터 전용** | 기본 제공 스킬이 사용할 외부 도구만 제공 |
| **결합형** | 커스텀 스킬이 외부 도구를 오케스트레이션 |

이 플러그인 모델은 Microsoft 365 앱 생태계와 정렬되어 있으며, Teams 앱·에이전트에 사용되는 것과 **동일한 엔터프라이즈 거버넌스 패턴**을 따릅니다.

### 2단계: 플러그인 범주와 관리 경계 비교

Copilot Cowork의 플러그인 카탈로그에는 다음이 포함될 수 있습니다.

- **Microsoft 플러그인** (예: Dynamics 365, Fabric IQ 시나리오)
- **파트너 플러그인** (서드파티 퍼블리셔)
- **커스텀 플러그인** (조직이 직접 제작)

전략 선택 기준은 다음과 같습니다.

- 이미 유스케이스를 커버한다면 **Microsoft·파트너 플러그인부터** 시작
- 회사 고유의 프로세스 로직·용어·통합이 필요하면 **커스텀 플러그인** 제작

관리 경계도 기억해 두세요.

| 주체 | 할 수 있는 일 |
|------|---------------|
| **사용자** | 허용된 플러그인 탐색·획득, 세션별 활성화/비활성화, 직접 획득한 플러그인 제거 |
| **관리자** | Microsoft 365 관리 센터에서 가용성·배포 범위·거버넌스 제어 |

커넥터 인증이 필요한 플러그인이라면 **각 사용자가 최초 1회 로그인/동의 플로**를 직접 완료해야 합니다.

---

## 실습 2: 플러그인 구조와 설계 결정 살펴보기

이 실습에서는 [실제 플러그인 예제](https://github.com/PaoloPia/CopilotDevCamp-for-cowork)의 아키텍처를 분석하고, 여러 스킬을 커넥터와 함께 패키징하는 것이 왜 가치 있는지 이해합니다.

### 1단계: 프로덕션급 플러그인 레이아웃

모든 플러그인의 기준으로 다음 폴더 모델을 사용하세요.

```text
plugin-root-folder/
├── manifest.json
├── color.png
├── outline.png
└── skills/
    ├── skill-01/
    │   ├── references/
    │   │   ├── reference-file-01.md
    │   │   └── reference-file-02.md
    │   ├── scripts/
    │   │   └── script-file-01.py
    │   └── SKILL.md
    ├── skill-02/
    │   └── SKILL.md
    ...
    └── skill-NN/
        └── SKILL.md
```

이 랩에서 만들 플러그인은 **Copilot Dev Camp 랩의 콘텐츠를 처리해 특정 랩에 대한 PowerPoint 프레젠테이션이나 Word 문서를 만들어 주는** 플러그인입니다. 또한 Microsoft Foundry에 대한 기술 정보를 제공하기 위해 **Microsoft Learn MCP 서버**(`https://learn.microsoft.com/api/mcp`)를 사용합니다.

플러그인은 다음 3개의 스킬로 구성됩니다.

| 스킬 | 역할 | 트리거 예시 |
|------|------|-------------|
| **foundry-research** | Microsoft Foundry에 대한 문서·아키텍처·모델·배포 옵션 정보를 조사·정리 | "research Microsoft Foundry", "Foundry architecture", "how to deploy with Foundry" |
| **dev-camp-deck** | Copilot Dev Camp 랩/주제에 대한 전문적인 PowerPoint 생성(발표자 노트 포함) | "create a presentation on", "make a deck about", "generate slides about" |
| **dev-camp-document** | Copilot Dev Camp 랩/주제에 대한 Word 문서(원페이저·상세 가이드) 작성 | "write a document about", "create a guide for", "author a one-pager on" |

플러그인 폴더 구조는 다음과 같습니다.

```text
CopilotDevCamp-for-cowork/
├── manifest.json
├── color.png
├── outline.png
├── package.json
└── skills/
    ├── foundry-research/
    │   └── SKILL.md
    ├── dev-camp-deck/
    │   └── SKILL.md
    └── dev-camp-document/
        └── SKILL.md
```

이 구조는 플러그인을 **조합 가능하고 유지보수하기 쉽게** 만듭니다. 각 스킬은 초점이 분명한 목적을 갖고, 매니페스트와 스크립트가 공통 패키징·배포 메타데이터를 제공합니다.

### 2단계: 여러 스킬과 커넥터의 가치

관련된 스킬 여러 개를 하나의 플러그인에 묶으면 다음 이점이 있습니다.

- **모듈성(Modularity)** — 리서치·슬라이드 생성·문서 작성이 각각 분리된 워크플로
- **재사용성(Reusability)** — 하나의 플러그인 패키지가 같은 도메인의 여러 사용자 의도를 처리
- **일관성(Consistency)** — 공통 네이밍·메타데이터·게시 라이프사이클
- **확장성(Scalability)** — `references/`, `scripts/` 동반 파일로 스킬을 점진적으로 강화

스킬이 커질수록 **메인 `SKILL.md`는 활성화 조건과 워크플로에 집중**시키고, 깊은 지식은 동반 파일(`references/*.md`, `scripts/*`)로 옮겨 프롬프트를 효율적이고 유지보수 가능하게 유지하세요.

커넥터는 스킬이 런타임에 **원격 MCP 서버의 도구를 호출**하게 해줍니다. 정적 지침에서 살아 있는 데이터 기반 실행으로 넘어가는 지점입니다.

일반적인 인증 유형은 다음과 같습니다.

| `authorization.type` | 설명 |
|----------------------|------|
| `None` | 익명/공개 엔드포인트 접근 |
| `OAuthPluginVault` | OAuth 2.0 + 보안 자격 증명 저장소 참조 |
| `ApiKeyPluginVault` | API 키 방식 + 보안 참조 저장 |

보안 수준과 데이터 민감도에 따라 선택하세요. **프로덕션에서는 인증된 커넥터가 일반적인 패턴**입니다.

---

## 실습 3: 커스텀 플러그인 패키지 만들기

이 실습에서는 Copilot Dev Camp 샘플과 유사한 플러그인(스킬 3개 + 커넥터 1개)을 만듭니다. 파일 시스템에 `CopilotDevCamp-for-cowork` 폴더를 새로 만들고 Visual Studio Code(또는 원하는 편집기)로 엽니다.

### 1단계: 스킬과 커넥터를 담은 매니페스트 작성

플러그인 루트에 `manifest.json`을 만듭니다. Cowork 플러그인 패키징과 호환되는 스키마를 사용하고 `agentSkills`, `agentConnectors` 섹션을 포함하세요.

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.28/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview",
  "version": "1.5.0",
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "developer": {
    "name": "Paolo Pialorsi",
    "websiteUrl": "https://github.com/PaoloPia",
    "privacyUrl": "https://github.com/PaoloPia",
    "termsOfUseUrl": "https://github.com/PaoloPia"
  },
  "name": {
    "short": "Copilot Dev Camp",
    "full": "Copilot Dev Camp for Cowork - Copilot Dev Camp and Microsoft Foundry Content Creation & Research"
  },
  "description": {
    "short": "Copilot Dev Camp and Microsoft Foundry presentations and documentation",
    "full": "Comprehensive Cowork plugin for Copilot Dev Camp with skills to research Microsoft Foundry documentation, create professional PowerPoint presentations on Dev Camp topics, and author Word documents with technical guides and one-pagers. Powered by the Microsoft Learn MCP Server."
  },
  "icons": {
    "color": "color.png",
    "outline": "outline.png"
  },
  "accentColor": "#000000",
  "agentSkills": [
    { "folder": "./skills/foundry-research" },
    { "folder": "./skills/dev-camp-deck" },
    { "folder": "./skills/dev-camp-document" }
  ],
  "agentConnectors": [
    {
      "id": "microsoft-learn-mcp",
      "displayName": "Microsoft Learn MCP Server",
      "description": "Access to Microsoft's official documentation for research and content generation. Provides search and fetch capabilities for Microsoft Learn articles and code samples.",
      "toolSource": {
        "remoteMcpServer": {
          "mcpServerUrl": "https://learn.microsoft.com/api/mcp",
          "authorization": {
            "type": "None"
          }
        }
      }
    }
  ]
}
```

- `agentSkills` — 커스텀 플러그인에 연결된 **스킬**을 정의
- `agentConnectors` — 플러그인이 사용하는 **MCP 서버**와 인증 모델을 정의

<div class="info-box warning" markdown="1">

**필수 검증 체크**

- `agentSkills[].folder` 경로가 패키지 안에 실제로 존재해야 함
- 각 스킬 폴더에 `SKILL.md`가 있어야 함
- 스킬 프런트매터의 `name`은 **kebab-case**이며 **폴더 이름과 일치**해야 함
- 커넥터 `id` 값은 **고유**해야 함
</div>

앱 패키지용 아이콘 `color.png`와 `outline.png`도 준비해야 합니다. 다음 URL에서 내려받을 수 있습니다.

- [color.png](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/CopilotDevCamp-for-cowork/color.png)
- [outline.png](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/CopilotDevCamp-for-cowork/outline.png)

매니페스트의 `developer` 섹션은 본인 정보로 바꿔도 됩니다.

### 2단계: 3개의 스킬 폴더와 SKILL.md 만들기

`skills/` 아래에 다음 폴더를 만듭니다.

- `foundry-research`
- `dev-camp-deck`
- `dev-camp-document`

각 `SKILL.md`에서는 다음을 지키세요.

- `name`과 `description`을 포함한 **유효한 YAML 프런트매터** 추가
- description에 **트리거 문구를 명시** (`Use when user asks to ...`)
- **명확한 워크플로와 출력 형식** 정의
- 커넥터가 필요한 경우 **도구를 명시적으로 참조**

세 스킬의 내용은 다음에서 복사할 수 있습니다.

- [foundry-research](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/CopilotDevCamp-for-cowork/skills/foundry-research/SKILL.md)
- [dev-camp-deck](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/CopilotDevCamp-for-cowork/skills/dev-camp-deck/SKILL.md)
- [dev-camp-document](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/CopilotDevCamp-for-cowork/skills/dev-camp-document/SKILL.md)

이 설계는 Cowork의 **활성화 정확도**를 높이고 결과를 더 일관되게 만듭니다.

### 3단계: (선택) 동반 references·scripts 추가

복잡한 스킬이라면 `SKILL.md`를 간결하게 유지하고 다음 지원 파일을 추가하세요.

- `references/*.md` — 도메인 세부 지식과 표준
- `scripts/*` — 반복 사용 유틸리티

그런 다음 스킬 본문에서 해당 파일을 참조하면 Cowork가 필요할 때 로드합니다. 이 패턴은 유지보수성을 높이고, 모든 스킬을 다시 쓰지 않고도 플러그인을 발전시킬 수 있게 합니다.

---

## 실습 4: 패키징 자동화 및 플러그인 검증

이 실습에서는 패키징 자동화를 추가하고 플러그인 `.zip`을 생성합니다.

### 1단계: package.json에 패키징 스크립트 추가

플러그인 루트에 `package.json`을 추가하고 다음과 같은 스크립트를 정의합니다.

```json
{
  "name": "copilot-dev-camp-cowork-plugin",
  "version": "1.0.0",
  "description": "Copilot Dev Camp plugin for Cowork - Research Microsoft Foundry, create presentations and documentation",
  "main": "manifest.json",
  "scripts": {
    "package": "PowerShell -Command \"Compress-Archive -Path manifest.json, color.png, outline.png, skills -DestinationPath copilot-dev-camp.zip -Force; Write-Host 'Plugin packaged: copilot-dev-camp.zip'\"",
    "package:unix": "zip -r copilot-dev-camp.zip manifest.json color.png outline.png skills/"
  },
  "license": "MIT"
}
```

환경에 상관없이 **일관되고 반복 가능한 패키징**이 가능해집니다.

### 2단계: 플러그인 패키징

플러그인 루트에서 패키징 명령을 실행합니다.

```powershell
# Windows
npm run package
```

```bash
# macOS / Unix
npm run package:unix
```

**기대 결과** — 루트 레벨에 `manifest.json`, 아이콘, 전체 `skills/` 폴더가 담긴 `.zip` 패키지가 생성됩니다.

필요하다면 업로드 전에 ZIP 내용을 열어 구조 관련 검증 실패를 예방하세요.

### 3단계: 흔한 패키징 문제 검증

배포 전에 다음을 확인합니다.

- 참조된 각 폴더에 `SKILL.md`가 존재하는가
- YAML 프런트매터가 유효한가
- `name` 값이 스킬 폴더 이름과 일치하는가
- 커넥터 URL이 **HTTPS**이고 인증 설정이 일관적인가
- 아이콘 파일 이름과 크기가 정확한가 (`color.png`, `outline.png`)

---

## 실습 5: (선택) GitHub Copilot으로 플러그인 전체 바이브 코딩

이 실습에서는 GitHub Copilot을 사용해 **하나의 고품질 프롬프트로** 플러그인을 스캐폴딩하고 완성합니다. 실습 3·4를 대신하는 대안 경로입니다.

### 1단계: 바이브 코딩 프롬프트 사용

프롬프트 주도 방식을 선호한다면 GitHub Copilot(Visual Studio Code의 **Agent 모드**)에게 전체 플러그인 구조 스캐폴딩, 스킬 생성, 패키징 스크립트 준비, 배포 문서 초안까지 요청할 수 있습니다.

다음 프롬프트를 그대로 사용하세요.

```text
# Vibe Coding Prompt for GitHub Copilot

Use this prompt as-is in GitHub Copilot Chat (Agent mode) to scaffold and complete the plugin.

## Prompt

You are GitHub Copilot acting as a senior Microsoft 365 + Copilot Cowork plugin engineer.

Goal: Build a **new Copilot Cowork plugin** in this repository, following the same project structure and engineering style as:
- https://github.com/PaoloPia/CopilotDevCamp-for-cowork

and grounded in official guidance from:
- https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-plugin-development

### Mandatory requirements

1. Implement plugin capabilities
- Add a skill with name `foundry-research` with support for **Microsoft Foundry** content (both documentation and samples) using this MCP server:
	- https://learn.microsoft.com/api/mcp
- Add a skill with name `dev-camp-deck` to create a **PowerPoint presentation** about one Copilot Dev Camp lab/topic.
- Add a skill with name `dev-camp-document` to author a **Word document** about one Copilot Dev Camp lab/topic.
- Use Copilot Dev Camp content as source context:
	- https://microsoft.github.io/copilot-camp/
- Register the MCP server https://learn.microsoft.com/api/mcp in the manifest, with anonymous access

2. Keep repository conventions
- Reuse the same folder organization patterns, naming style, and manifest conventions used by this repo.
- Do not break existing files unless replacement is necessary.
- Prefer additive changes and keep the plugin maintainable.

3. Update docs and ignores
- Update `README.md` with:
	- Plugin overview and feature list
	- Skills documentation and examples
	- Packaging process
	- Deployment process for Cowork
	- Any prerequisites and environment variables
- Update `.gitignore` as needed for generated artifacts and packaging outputs.

4. Packaging automation
- Create or update `package.json` scripts so packaging can be run with a single command.
- The packaging process must generate a `.zip` file suitable for upload in Cowork.
- Include scripts for clean/build/package where appropriate.

5. Icons generation
- Generate plugin icons required by the plugin structure:
	- `color.png`
	- `outline.png`
- Visual requirements:
	- Subject: a **book inside/with a camp tent** motif
	- Tent color: **purple**
	- Book color: **white**
	- Background: **black**
- Ensure dimensions and style are compliant with Cowork plugin requirements.

### Implementation instructions

- First inspect current workspace files to align with existing conventions.
- If the repo already contains reusable scripts/utilities (for example icon generation), reuse them.
- Create or update the plugin manifest and any skill metadata files needed for Cowork.
- For the Foundry feature:
	- Implement a skill/integration that can retrieve or reference both docs and samples via the MCP endpoint.
	- Add clear prompt instructions and usage examples.
- For the PowerPoint and Word skills:
	- Create dedicated skill folders/files with clear instructions, expected inputs, and generated outputs.
	- Ensure prompts are practical for Copilot users and tied to Copilot Dev Camp topics.

### README packaging + deployment documentation (must include)

Add a concise section with:
- Prerequisites
- Install dependencies
- Build/package commands
- Output zip path
- How to upload/install in Copilot Cowork
- How to validate skills after deployment

### Quality bar

- Keep changes production-quality and self-consistent.
- Validate JSON/manifest files.
- Ensure all referenced files exist.
- Ensure scripts run on Windows PowerShell and common cross-platform shells when feasible.

### Deliverables checklist (must complete all)

- Updated manifest and skill definitions
- Foundry MCP support (docs + samples)
- PowerPoint skill
- Word skill
- Updated `README.md`
- Updated `.gitignore`
- Working `package.json` packaging scripts
- Generated `color.png` and `outline.png`
- A final short summary listing all changed files and exact package command(s)

### Execution mode

Proceed autonomously: inspect, implement, run packaging command, verify outputs, then summarize.
If a required file is missing, create it following this repo's conventions.
If assumptions are required, choose sensible defaults and document them in README.
```

생성이 끝나면 `manifest.json`을 검토하고, 각 `SKILL.md`의 프런트매터를 검증한 뒤, 패키징을 실행해 최종 플러그인 ZIP을 만드세요.

---

## 실습 6: Microsoft 365 관리 센터에서 배포 및 테스트

이 실습에서는 플러그인 패키지를 업로드하고 Cowork에서 엔드투엔드 동작을 검증합니다.

### 1단계: 관리 센터에서 플러그인 업로드

1. **Microsoft 365 관리 센터** 열기
2. **Agents** 이동
3. **All Agents** 선택
4. **Upload Agent** 선택
5. 플러그인 `.zip` 패키지 업로드

업로드 후 패키지 메타데이터와 가용성 범위가 대상 사용자와 맞는지 확인합니다.

관리자는 다음 중 하나로 롤아웃을 결정합니다.

- 모든 사용자에게 제공
- 특정 사용자/그룹에게만 제공
- 차단(승인되지 않은 경우)

사용자는 **세션별로 활성 플러그인을 켜고 끌 수 있고**, 관리자 배포는 **테넌트 가용성과 라이프사이클**을 제어한다는 점을 기억하세요.

### 2단계: Cowork에서 플러그인 동작 활성화 및 검증

Copilot Cowork를 열고 다음을 확인합니다.

- 플러그인이 플러그인 인벤토리에 나타나는가
- 플러그인 상세 페이지에서 설치·활성화가 되는가
- 관련 프롬프트로 **3개 스킬이 활성화**되는가
- 커넥터가 검색되고, 필요한 경우 인증을 요구하는가 (이 샘플의 MCP 서버는 익명 접근이 가능한 공개 서버입니다)

시나리오 기반 테스트를 실행해 보세요.

```text
Research Microsoft Foundry deployment options
```

```text
Create a presentation about Copilot Dev Camp lab: https://microsoft.github.io/copilot-camp/pages/extend-m365-copilot/08-mcp-server/
```

```text
Write a one-pager about Copilot Dev Camp lab: https://microsoft.github.io/copilot-camp/pages/extend-m365-copilot/11-mcp-app/
```

<div class="info-box warning" markdown="1">

**주의** — 이 플러그인의 커스텀 스킬을 Copilot Cowork에서 테스트하면 **Copilot Credits가 소모**됩니다.
</div>

---

## 🎉 축하합니다!

**Lab CWRK2 — 첫 번째 Cowork 플러그인 만들기**를 완료했습니다!

다음 랩에서는 Cowork 플러그인에 **Entra SSO 인증**을 추가합니다.

👉 [Lab CWRK3 — Cowork 플러그인에 Entra SSO 인증 추가하기]({{ '/chapters/cowork-dc3-plugins-sso/' | relative_url }})

---

## 📚 참고 자료

- 📖 [Cowork 플러그인 개발 — Microsoft Learn](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-plugin-development)
- 💾 [샘플 플러그인 저장소 (PaoloPia/CopilotDevCamp-for-cowork)](https://github.com/PaoloPia/CopilotDevCamp-for-cowork)
- 💾 [copilot-camp 내 소스 (src/cowork/CopilotDevCamp-for-cowork)](https://github.com/microsoft/copilot-camp/tree/main/src/cowork/CopilotDevCamp-for-cowork)
- 🏕️ [원문: Copilot Developer Camp — Lab CWRK2](https://microsoft.github.io/copilot-camp/pages/copilot-cowork/02-cowork-plugins/)
