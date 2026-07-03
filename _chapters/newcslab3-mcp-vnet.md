---
layout: "chapter"
date: 2026-02-01
title: "Lab 3 · VNet 프라이빗 엔드포인트로 MCP 서버 연결"
short_title: "Lab 3 · MCP over VNet"
description: "Azure Virtual Network의 프라이빗 엔드포인트 뒤에 있는 MCP 서버에, Power Platform VNet 지원을 통해 Copilot Studio를 안전하게 연결하는 방법을 다룹니다. 공개 노출 없이 엔터프라이즈급 네트워크 격리를 구현합니다."
order: 3
category: "newcslab"
parent: "ncslab3"
is_parent: true
tags: ["New Copilot Studio", "Power Platform admin"]
source_url: "https://github.com/fooshen/MCPwithVnet/tree/main"
source_author: "fooshen (Foo Shen)"
source_blog: "GitHub · fooshen/MCPwithVnet"
canonical_url: "https://github.com/fooshen/MCPwithVnet/blob/main/README.md"
---

<div class="info-box note" markdown="1">
**원문 번역 안내 · 출처** — 이 글은 **fooshen(Foo Shen)** 님의 GitHub 저장소 [fooshen/MCPwithVnet](https://github.com/fooshen/MCPwithVnet)의 [README](https://github.com/fooshen/MCPwithVnet/blob/main/README.md)를 한국어로 옮긴 것입니다(MIT License). 세부 구현 단계(Part 1·Part 2)는 원문 저장소를 따라 주세요. 원문 표현이 우선합니다.

- 원본 저장소: <https://github.com/fooshen/MCPwithVnet>
- Part 1(MCP 서버 배포·테스트): <https://github.com/fooshen/MCPwithVnet/blob/main/MCPServer.md>
- Part 2(Power Platform ↔ VNet 연결): <https://github.com/fooshen/MCPwithVnet/blob/main/VNET.md>
</div>

> 난이도 ★★★★☆ · Power Platform 관리자 · Azure 네트워킹

---

## 0. 개요 — VNet을 통해 Copilot Studio를 MCP 서버에 연결하기

이 가이드는 **Azure Virtual Network(VNet)의 프라이빗 엔드포인트 뒤에 위치한 MCP 서버**에 Copilot Studio가 어떻게 안전하게 연결하는지를 단계별로 설명합니다.

Microsoft Copilot Studio는 **Microsoft Power Platform** 위에 직접 구축됩니다. 즉, 전 세계 조직이 이미 대규모로 검증한 것과 **동일한 엔터프라이즈급 보안·거버넌스·컴플라이언스·네트워킹 제어**를 그대로 상속합니다. Copilot Studio가 MCP 서버에 연결할 때는 Power Platform의 **사용자 지정 커넥터(Custom Connector) 프레임워크**를 통해 이루어집니다. MCP는 프로토콜과 도구 시맨틱을 정의하지만, **전송·인증·거버넌스는 모두 커넥터 계층**에서 동작합니다. 그 결과 모든 MCP 도구는 오늘날 기업이 신뢰하는 강력한 제어(안전한 인증 흐름, 네트워크 격리, DLP 적용, ALM 파이프라인, 중앙 집중식 관리 거버넌스)의 혜택을 그대로 받습니다.

<div class="info-box note" markdown="1">
이 가이드는 MCP 서버 연결을 예로 들지만, **동일한 단계가 Power Platform의 다른 지원 커넥터 연결에도 적용**되며 Power Apps·Power Automate에도 똑같이 적용됩니다.
</div>

---

## 1. 왜 중요한가 (Why This Matters)

최근의 에이전트는 재고·재무·운영·사내 업무(LOB) API 같은 **내부 시스템 접근**이 점점 더 필요해집니다. 그런데 이런 시스템은 대개 **VNet 안, 프라이빗 엔드포인트 뒤**에 있고, 이를 공개적으로 노출하는 것은 선택지가 될 수 없습니다.

MCP 서버를 프라이빗 엔드포인트 뒤에 두고 Power Platform의 VNet 지원을 사용하면 다음을 얻습니다.

1. **공개 노출 제로(Zero Public Exposure)**
   - MCP 서버가 공용 인터넷에 전혀 닿지 않습니다.
   - 위임된 서브넷(delegated subnet)을 통한 **Power Platform 관리형 런타임만** 접근할 수 있습니다.

2. **엔터프라이즈급 네트워크 격리** — 트래픽이 전적으로 다음을 통해 흐릅니다.
   - 프라이빗 엔드포인트(Private endpoints)
   - 프라이빗 DNS 영역(Private DNS zones)
   - 필요 시 VNet ↔ VNet 라우팅

---

## 2. 이 가이드에서 다루는 것

- Azure Functions에 샘플 **MCP 서버 배포**
- **프라이빗 엔드포인트**로 보안 적용
- **위임된 VNet**을 통해 Power Platform이 도달하도록 구성

---

## 3. 사전 요구 사항

- **Visual Studio Code** (선택 — 샘플 MCP 서버 생성·배포용)
- **Power Platform 환경**
- Power Platform과 **동일한 테넌트**의 **Azure 구독**
- **PowerShell**

---

## 4. 시작하기 전에

1. 아직 환경이 없다면 [Power Platform 환경을 생성](https://learn.microsoft.com/ko-kr/power-platform/admin/create-environment)합니다. Production·Sandbox·Developer 환경을 만들 수 있습니다. **Trial 환경은 VNet을 지원하지 않습니다.**
2. 해당 환경에 **Managed Environment(관리형 환경)** 기능을 활성화합니다.

<div class="info-box note" markdown="1">
**중요 — 먼저 Azure 리전을 확인하세요.** Power Platform 환경이 어느 **Azure 리전**에 있는지 먼저 식별해야 합니다.

- PowerShell [Get-EnvironmentRegion](https://learn.microsoft.com/en-us/powershell/module/microsoft.powerplatform.enterprisepolicies/get-environmentregion)로 확인하거나,
- [메이커 포털](https://make.powerapps.com/)에서 **Azure Synapse Link**(내비게이션에 없으면 "More" → "Discover All"에서 검색)로 이동해 **New Link**를 클릭하면 현재 Azure 리전이 표시됩니다.

Power Platform 환경은 하나 이상의 Azure 리전에 매핑되는 **지역(geography)** 에 속할 수 있습니다. 예를 들어 환경이 호주(Australia) 지역이면 리전은 Australia East 또는 Australia Southeast일 수 있습니다. 매핑된 리전 목록은 [지원 리전 문서](https://learn.microsoft.com/en-us/power-platform/admin/vnet-support-overview#supported-regions)를 참고하세요. 기존 환경을 다른 리전으로 이동해야 한다면 Microsoft 지원에 문의하세요.

새 환경 생성 시 리전을 지정하려면 PowerShell [New-AdminPowerAppEnvironment](https://learn.microsoft.com/en-us/powershell/module/microsoft.powerapps.administration.powershell/new-adminpowerappenvironment)의 [RegionName](https://learn.microsoft.com/en-us/powershell/module/microsoft.powerapps.administration.powershell/new-adminpowerappenvironment?view=pa-ps-latest#-regionname) 매개변수 또는 [Power Platform API](https://learn.microsoft.com/en-us/rest/api/power-platform/)를 사용합니다.
</div>

---

## 5. 구성 (Part 1 · Part 2)

전체 실습은 두 부분으로 나뉩니다. 각 단계의 명령·스크린샷은 원문 저장소를 따라 주세요.

| 파트 | 내용 | 링크 |
| --- | --- | --- |
| **Part 1** | Azure Functions에 간단한 MCP 서버를 만들고 배포한 뒤, Copilot Studio에서 테스트 | [MCPServer.md ↗](https://github.com/fooshen/MCPwithVnet/blob/main/MCPServer.md) |
| **Part 2** | Power Platform을 VNet에 설정하고 연결(프라이빗 엔드포인트·위임 서브넷) | [VNET.md ↗](https://github.com/fooshen/MCPwithVnet/blob/main/VNET.md) |

---

## 6. 참고 문서

- [Power Platform Virtual Network support — 개요](https://learn.microsoft.com/en-us/power-platform/admin/vnet-support-overview)
- [Power Platform Virtual Network support — 백서(Whitepaper)](https://learn.microsoft.com/en-us/power-platform/admin/virtual-network-support-whitepaper)
- [Power Platform Virtual Network support — 설정 가이드](https://learn.microsoft.com/en-us/power-platform/admin/vnet-support-setup-configure)
- [문제 해결 팁(Troubleshooting)](https://learn.microsoft.com/en-us/troubleshoot/power-platform/administration/virtual-network)

---

*원저자: fooshen(Foo Shen) · [fooshen/MCPwithVnet](https://github.com/fooshen/MCPwithVnet) (MIT License). 이 번역은 이해를 돕기 위한 것으로, 최신·정확한 내용은 원문 저장소를 확인하세요.*
