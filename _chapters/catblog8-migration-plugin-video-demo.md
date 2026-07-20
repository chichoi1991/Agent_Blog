---
layout: "chapter"
date: 2026-07-14
title: "비디오 데모: Classic Agent를 Modern Orchestration으로 마이그레이션하기"
short_title: "Classic→Modern 마이그레이션 비디오"
description: "Copilot Studio plugin과 GitHub Copilot CLI를 사용해 classic agent를 modern orchestration으로 마이그레이션하는 전 과정을 영상으로 살펴봅니다."
order: 8
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/migration-plugin-video-demo/"
source_author: "giorgioughini"
source_published: "2026-07-14"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/migration-plugin-video-demo/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 giorgioughini(@giorgioughini) 원문 [Video Demo: Migrating a Classic Agent to Modern Orchestration](https://microsoft.github.io/mcscatblog/posts/migration-plugin-video-demo/)(2026-07-14)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/migration-plugin-video-demo/header.png' | relative_url }}" alt="GitHub Copilot CLI로 classic Copilot Studio travel agent를 modern orchestration으로 마이그레이션하는 모습" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

> **참고:** 이 글은 **영상 중심** 게시물입니다. 영상은 plugin이 이미 설치된 상태에서 시작하며, 전체 마이그레이션 과정과 결과 modern agent 검토를 순서대로 보여줍니다.

classic agent를 마이그레이션하는 일은 단순히 기존 컴포넌트를 새 형식으로 복사하는 작업이 아닙니다. modern orchestration은 다른 컴포넌트 모델을 사용하므로, 핵심은 각 기능을 유지하면서도 기능별로 가장 적합한 modern 아키텍처를 선택하는 데 있습니다.

이전의 [새 오케스트레이터 리소스 소개 글](https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/)에서 [Copilot Studio plugin](https://github.com/microsoft/copilot-studio-plugin)의 마이그레이션 기능을 소개했습니다. 이번 보조 영상에서는 [GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)를 사용해 그 기능이 엔드 투 엔드로 동작하는 모습을 확인할 수 있습니다.

## 데모에서 다루는 내용

영상은 약 10~20분 분량이며, 가상의 여행사 시나리오 하나를 따라 진행됩니다.

1. **classic agent 둘러보기.** 이 agent에는 이탈리아 도시/여행지를 추천하는 child agent와, 피자 주문 및 주문 오류·누락 시 환불 요청 기능이 포함되어 있습니다.
2. **전체 마이그레이션 실행.** migration 명령을 실행하고, plugin이 classic agent를 가져오고 기능을 분석해 modern 설계를 제안한 뒤, 마이그레이션된 agent를 생성하는 전 단계를 설명합니다.
3. **결과 검토.** 생성된 modern agent를 열어 포팅된 Skills와 tools를 확인하고, 원래 기능이 어디로 매핑됐는지 점검합니다.

예전에 올린 [plugin으로 agent 작성하기 영상](https://microsoft.github.io/mcscatblog/posts/claude-copilot-skills-copilot-studio-plugin-demo/)을 보셨다면, 이번 영상은 그 다음 단계입니다. 빈 agent에서 시작하는 대신, 기존 classic 구현을 출발점으로 삼아 modern orchestration에 맞게 재설계합니다.

## 마이그레이션 영상 보기

- [영상 재생 링크](https://github.com/GiorgioUghini/WebVideos/releases/download/video-6-1.0.0/Video.Project.23.mp4)
> 🖼️ (원문 이미지: https://microsoft.github.io/mcscatblog/assets/posts/migration-plugin-video-demo/header-video.png)

## 가장 중요한 아키텍처 선택

이 마이그레이션에서 classic travel-advice child agent는 modern agent의 **Skill**로 변환됩니다. 이는 이 기능에 대해 plugin이 선택한 최적안이며, 모든 child agent를 항상 Skill로 바꿔야 한다는 보편 규칙은 아닙니다.

plugin은 컴포넌트를 1:1로 치환하는 것이 아니라 **기능(capability)과 결과(outcome)**를 마이그레이션합니다. 각 기능이 실제로 무엇을 하는지 분석해 modern 모델에서 어떤 책임 단위가 가장 적합한지 제안합니다. 시나리오가 다르면 child agent의 최적 설계도 달라질 수 있습니다.

이 차이는 매우 중요합니다. 구조를 그대로 복사하면 과거 설계는 보존해도 새 orchestration 모델의 장점을 살리지 못할 수 있습니다. 반면 기능 중심 마이그레이션은 설계를 단순화하고, 각 책임을 더 적절한 컴포넌트로 재배치할 수 있는 여지를 만듭니다.

## 직접 따라 해보기

영상은 설정이 끝난 지점에서 시작합니다. 직접 따라 하려면 버전 2.9.3보다 최신의 [Power Platform CLI](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction)를 설치한 뒤, AI 코딩 도우미에 최신 plugin을 추가하세요.

```text
/plugin marketplace add microsoft/copilot-studio-plugin
/plugin install mcs-assistant@copilot-studio-plugin
```

성능이 좋은 AI 모델을 사용하고, 본인 환경/agent/tenant ID를 넣어 migration을 실행합니다.

```text
/mcs-assistant:migrate Migrate this agent to modern orchestration: https://copilotstudio.microsoft.com/environments/<ENV_ID>/bots/<BOT_ID> from tenant <TENANT_ID>
```

이 터미널 기반 접근이 시작된 배경은 [Skills for Copilot Studio](https://microsoft.github.io/mcscatblog/posts/skills-for-copilot-studio/)에서 확인할 수 있습니다. 최신 명령 및 사전 요구사항은 항상 [plugin README](https://github.com/microsoft/copilot-studio-plugin#readme)를 기준으로 확인하세요.

## 점검, 테스트, 검증

> 이 plugin은 공식 지원되는 Microsoft 제품이 아니라 실험적 연구 프로젝트입니다. 데모에서는 수동 수정 없이 마이그레이션이 동작했지만, 이는 항상 보장되지 않습니다. 결과물을 그대로 신뢰하지 말고 반드시 검토하고 필요한 수정을 반영하세요.

마이그레이션 결과는 강력한 초안으로 보는 것이 좋습니다. modern agent 동작을 classic agent와 비교하고, 생성된 모든 Skill과 tool을 검토하며, 정상/비정상 입력을 함께 테스트하고, 액션에 필요한 보호 장치가 올바른지 확인해야 합니다.

## 왜 중요한가

마이그레이션의 가장 어려운 부분은 "modern agent를 어떤 형태로 설계할 것인가"를 결정하는 일입니다. plugin은 반복적인 기계 작업을 빠르게 줄이고 일관된 출발 아키텍처를 제시하면서도, 최종 설계를 사람이 검토할 수 있게 해줍니다. 덕분에 메이커는 모든 기능을 손으로 다시 만드는 대신, 동작 품질과 검증에 더 많은 시간을 쓸 수 있습니다.

여러분의 classic agent 중에서, modern orchestration에 맞게 가장 먼저 재설계해 보고 싶은 기능은 무엇인가요?
