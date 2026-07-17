---
layout: "chapter"
date: 2026-07-14
title: "영상 데모: Classic 에이전트를 Modern Orchestration으로 마이그레이션하기"
short_title: "Classic → Modern 마이그레이션 영상 데모"
description: "GitHub Copilot CLI가 CAT 마이그레이션 플러그인으로 classic Copilot Studio 여행사 에이전트를 modern orchestration으로 마이그레이션하는 전 과정을 영상으로 확인합니다."
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
  <img src="{{ '/assets/catblog/migration-plugin-video-demo/header.png' | relative_url }}" alt="GitHub Copilot CLI가 classic Copilot Studio 여행사 에이전트를 modern orchestration으로 마이그레이션하는 모습" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

> **안내:** 이 글은 **영상 중심** 포스트입니다. 녹화 영상은 플러그인이 이미 설치된 상태에서 시작하며, 전체 마이그레이션 과정과 그 결과인 modern 에이전트를 검토하는 내용을 담고 있습니다.

Classic 에이전트 마이그레이션은 단순히 모든 구성 요소를 새 형식으로 복사하는 작업이 아닙니다. Modern orchestration은 다른 구성 요소 모델을 도입하기 때문에, 진짜 과제는 각 기능(capability)을 유지하면서 modern 아키텍처에 가장 적합한 구조를 선택하는 것입니다.

[새 오케스트레이터 리소스 포스트](https://microsoft.github.io/mcscatblog/posts/new-orchestrator-resources/)에서는 [Copilot Studio 플러그인](https://github.com/microsoft/copilot-studio-plugin)의 마이그레이션 기능을 소개했습니다. 이 영상은 [GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)를 사용해 해당 기능이 처음부터 끝까지 동작하는 모습을 보여줍니다.

## 데모 내용

녹화 영상은 약 10~20분 분량이며, 가상의 여행사 시나리오를 따릅니다.

1. **Classic 에이전트 둘러보기.** 이탈리아 도시와 여행지에 대해 고객에게 조언하는 자식 에이전트, 피자 주문 기능, 주문이 잘못되거나 누락됐을 때 환불을 요청하는 기능이 포함되어 있습니다.
2. **전체 마이그레이션 실행.** 마이그레이션 명령어를 호출하고, 플러그인이 classic 에이전트를 조회해 기능을 분석하고, modern 설계를 제안하고, 마이그레이션된 에이전트를 생성하는 각 단계마다 해설을 더합니다.
3. **결과 검토.** Modern 에이전트를 열고, 포팅된 Skill과 도구(tool)를 검토해 각 원본 기능이 어디에 배치됐는지 확인합니다.

[플러그인으로 에이전트를 직접 제작하는 이전 영상](https://microsoft.github.io/mcscatblog/posts/claude-copilot-skills-copilot-studio-plugin-demo/)을 보셨다면, 이번 영상은 그 다음 단계입니다. 빈 에이전트에서 시작하는 대신, 기존 classic 구현에서 출발해 modern orchestration에 맞게 재설계합니다.

## 마이그레이션 영상 보기

> 영상은 원문 포스트에서 직접 시청할 수 있습니다: [Video Demo: Migrating a Classic Agent to Modern Orchestration](https://microsoft.github.io/mcscatblog/posts/migration-plugin-video-demo/)
>
> 직접 링크: [Video.Project.23.mp4](https://github.com/GiorgioUghini/WebVideos/releases/download/video-6-1.0.0/Video.Project.23.mp4)

## 중요한 아키텍처 선택

이번 마이그레이션에서, classic 여행 조언 자식 에이전트는 modern 에이전트의 **Skill**이 됩니다. 이것은 플러그인이 이 특정 기능에 대해 선택한 최적의 배치이지, 모든 자식 에이전트가 Skill이 되어야 한다는 보편적인 규칙이 아닙니다.

플러그인은 **기능(capability)과 결과(outcome)**를 마이그레이션하며, 구성 요소를 일대일로 변환하지 않습니다. 각 기능이 무엇을 하는지 살펴보고, 그 책임이 modern 모델에서 어디에 속하는지를 제안합니다. 시나리오에 따라 다른 자식 에이전트는 다른 설계가 필요할 수 있습니다.

이 점이 중요합니다. 단순한 직접 변환은 어제의 구조를 그대로 유지할 수 있지만, 새로운 orchestration 모델의 장점을 활용하지 못합니다. 기능 중심의 마이그레이션은 설계를 단순화하고 각 책임을 가장 적합한 구성 요소에 배분할 여지를 만들어 줍니다.

## 직접 해보기

데모는 설치 이후 단계부터 시작합니다. 따라 해보려면 버전 2.9.3 이상의 [Power Platform CLI](https://learn.microsoft.com/ko-kr/power-platform/developer/cli/introduction)를 설치한 뒤, AI 코딩 어시스턴트에 현재 플러그인을 추가합니다.

```text
/plugin marketplace add microsoft/copilot-studio-plugin
/plugin install mcs-assistant@copilot-studio-plugin
```

성능 좋은 AI 모델을 사용하고, 자신의 환경·에이전트·테넌트 ID로 치환해 마이그레이션을 실행합니다.

```text
/mcs-assistant:migrate Migrate this agent to modern orchestration: https://copilotstudio.microsoft.com/environments/<ENV_ID>/bots/<BOT_ID> from tenant <TENANT_ID>
```

이 터미널 기반 접근 방식의 배경은 [Skills for Copilot Studio](https://microsoft.github.io/mcscatblog/posts/skills-for-copilot-studio/)를 참고하세요. 현재 명령어와 사전 요건은 항상 [플러그인 README](https://github.com/microsoft/copilot-studio-plugin#readme)에서 최신 정보를 확인하세요.

## 검토, 테스트, 검증

> 이 플러그인은 실험적 연구 프로젝트이며, 공식 Microsoft 지원 제품이 아닙니다. 이번 데모에서는 생성된 마이그레이션 결과물에 수동 보정 없이 동작했지만, 이것이 항상 보장되는 결과는 아닙니다. 결과를 맹목적으로 신뢰하기 전에 산출물을 반드시 검토하고, 필요하다면 조정하세요.

마이그레이션 결과물은 완성도 높은 초안으로 취급해야 합니다. Modern 에이전트의 동작을 classic 에이전트와 비교하고, 생성된 모든 Skill과 도구를 검토하고, 예상한 입력과 예상치 못한 입력을 모두 테스트하고, 액션에 적절한 안전장치가 있는지 확인하세요.

## 왜 중요한가

마이그레이션에서 가장 어려운 부분은 modern 에이전트가 무엇이 되어야 하는지를 결정하는 것입니다. 플러그인은 기계적인 작업을 가속하고 일관된 시작 아키텍처를 제안할 수 있으며, 설계를 사람이 검토할 수 있도록 가시적으로 유지합니다. 덕분에 개발자는 모든 기능을 손으로 다시 만드는 대신 동작, 품질, 검증에 더 많은 시간을 집중할 수 있습니다.

여러분의 classic 에이전트에서 어떤 기능을 modern orchestration으로 가장 먼저 재설계해보고 싶으신가요?
