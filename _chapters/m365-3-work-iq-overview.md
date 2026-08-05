---
layout: chapter
date: 2026-08-05
title: "Work IQ 소개 — 조직 지능을 모든 에이전트에게"
short_title: "Work IQ 소개"
description: "Work IQ는 컨텍스트·관계·업무 패턴을 이해하는 조직 지능의 '두뇌'입니다. 아키텍처, 보안·규정 준수, 이점, 그리고 A2A·MCP·REST 랩 시리즈를 소개합니다."
order: 3
category: m365
tags: ["Work IQ", "Microsoft IQ", "MCP", "A2A", "REST"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — Work IQ는 조직의 컨텍스트·관계·업무 패턴을 이해하는 **조직 지능의 두뇌**입니다. Copilot과 에이전트가 더 빠르고, 더 정확하고, 더 안전해집니다. **어떤 에이전트든, 어떤 기술 스택이든** A2A·MCP·REST로 조직 지능을 소비할 수 있습니다.
</div>

> 이 글은 Microsoft 공식 [Copilot Developer Camp — Work IQ](https://microsoft.github.io/copilot-camp/pages/work-iq/) 섹션을 한국어로 옮긴 것입니다.

Work IQ는 조직 지능(organizational intelligence) 뒤에 있는 **"두뇌"** 로, 컨텍스트·관계·업무 패턴을 이해합니다. 덕분에 Copilot과 에이전트는 더 빠르고, 더 정확하며, 더 안전해집니다. Work IQ를 통해 조직의 지능을 **모든 에이전트에게 개방**할 수 있으며, 실제로 어떤 에이전트·어떤 기술에서든 조직 지능을 소비할 수 있습니다.

---

## Work IQ 이해하기

<figure class="screenshot">
  <img src="{{ '/assets/image/workiq/workiq-00-architecture.png' | relative_url }}" alt="Work IQ 아키텍처 다이어그램">
  <figcaption>Work IQ 아키텍처 — Chat · Context · Tools · Workspaces와 A2A / MCP / REST 소비 경로</figcaption>
</figure>

아키텍처 관점에서 Work IQ는 다음으로 구성됩니다.

| 구성 요소 | 설명 |
|-----------|------|
| **Chat** | 대화형 지능에 최적화된 채팅 경험 |
| **Context** | 사용자의 선호, 업무 스타일, 원하는 응답 방식을 이해 |
| **Tools** | 에이전트가 더 적절한 답변을 제공하고, 사용자의 습관·기대에 맞는 조합 가능한(composable) 액션을 수행하도록 지원 |
| **Workspaces** | 장시간 실행되는 에이전트 워크플로와 안정적인 작업 진행에 최적화 |

서드파티 에이전트는 필요에 따라 서로 다른 프로토콜로 Work IQ를 소비할 수 있습니다.

| 프로토콜 | 용도 |
|----------|------|
| **A2A** | 에이전트 ↔ 에이전트(agent-to-agent) 패턴 |
| **MCP** | 에이전트 ↔ 도구(agent-to-tool) 패턴 |
| **REST** | 사람/디바이스 ↔ 에이전트(human/device-to-agent) 패턴 |

---

## 보안 · 개인정보 보호 · 규정 준수

Work IQ는 처음부터 엔터프라이즈 보안 요구사항을 존중하도록 설계되었습니다.

- **권한 상속(Permission inheritance)** — 기존 사용자 권한, 보안 그룹 할당, 민감도 레이블을 그대로 준수합니다.
- **데이터 손실 방지(DLP)** — 모든 Work IQ 작업에서 DLP 정책을 준수합니다.
- **규제 준수** — GDPR, EU 데이터 경계(EU Data Boundary) 및 지역별 법적 요구사항을 준수합니다.

---

## Work IQ의 이점

| 이점 | 내용 |
|------|------|
| **Intelligence** (지능) | 기본 검색을 넘어섭니다. 의미 기반 이해 + 개인/조직 메모리 + 구조화된 파일 컨텍스트 + 도메인 튜닝을 결합해, 에이전트가 사람·역할·협업에 대한 더 신선하고 풍부한 신호로 추론합니다. |
| **Speed** (속도) | 에이전트 응답 시간을 기준으로 설계되었습니다. 네트워크 홉을 줄이고 컨텍스트 접근 지연을 낮추며, 도구 사용을 **10개의 MCP 기반 프리미티브**로 간소화해 분석에서 행동으로 더 빨리 이동합니다. |
| **Efficiency** (효율) | 런타임 내부에서 더 많은 처리를 수행해 토큰 소비를 줄입니다. 원시 레코드를 쏟아내는 대신, 에이전트가 소비하기 쉬운 **간결하고 구조화된 출력**을 반환하며 노이즈성 식별자도 추가로 정리합니다. |
| **Scale** (확장) | 지속적이고 대량인 에이전트 워크로드를 위해 설계되었습니다. 더 깊은 다단계 자동화 패턴과, 다수의 에이전트가 온라인이 될 때 필요한 처리량을 지원합니다. |
| **Security** (보안) | 상속된 권한, 감사 가능성, 거버넌스 준비 제어를 갖춘 상태로 **Microsoft 365 신뢰 경계 안**에서 작업을 유지합니다. |

---

## Work IQ 랩 시리즈

이 시리즈는 Work IQ를 핵심 개발 패턴 전반에서 다루는 핸즈온 랩으로 구성되어 있습니다. Work IQ 설정과 CLI·GitHub Copilot CLI 활용, Work IQ A2A, Work IQ MCP, Work IQ REST를 순서대로 다루며, 서로 다른 통합 모델과 에이전트 아키텍처에 맞춰 Work IQ 기능을 설계·연결·운영하는 방법을 탐색합니다.

| 랩 | 주제 | 핵심 내용 |
|----|------|-----------|
| 🧭 [WIQ01 — 설정과 CLI]({{ '/chapters/m365-4-work-iq-setup-and-cli/' | relative_url }}) | 테넌트 설정 + CLI | Work IQ CLI 설치·인증, GitHub Copilot CLI에 MCP 서버로 연결 |
| 🤝 [WIQ02 — A2A 프로토콜]({{ '/chapters/m365-5-work-iq-a2a/' | relative_url }}) | 에이전트 ↔ 에이전트 | Agent Card 조회, .NET 클라이언트, Copilot Studio에서 A2A 에이전트 소비 |
| 🔌 [WIQ03 — MCP 프로토콜]({{ '/chapters/m365-6-work-iq-mcp/' | relative_url }}) | 에이전트 ↔ 도구 | MCP Inspector·VS Code 연결, 10개 프리미티브 도구, C# MCP 클라이언트 |
| 🌐 [WIQ04 — REST 프로토콜]({{ '/chapters/m365-7-work-iq-rest/' | relative_url }}) | 사람/디바이스 ↔ 에이전트 | 대화 스레드 생성, 메시지 전송, 스트리밍 응답 처리 |

플랫폼이 발전함에 따라 랩은 계속 추가될 예정입니다. 향후에는 Work IQ, Foundry IQ, Fabric IQ, Web IQ를 아우르는 **Microsoft IQ 통합 시나리오**와 고급 엔터프라이즈 유스케이스에 대한 심층 구현 가이드가 다뤄질 예정입니다.

👉 [Lab WIQ01 — Work IQ 설정 및 CLI로 시작하기]({{ '/chapters/m365-4-work-iq-setup-and-cli/' | relative_url }})부터 시작하세요.

---

## 📚 참고 자료

- 📖 [Work IQ — Microsoft Learn](https://learn.microsoft.com/microsoft-365/work-iq/)
- 🏕️ [원문: Copilot Developer Camp — Work IQ](https://microsoft.github.io/copilot-camp/pages/work-iq/)
