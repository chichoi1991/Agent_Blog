---
layout: "chapter"
date: 2026-06-03
title: "Copilot Studio 에이전트 ALM의 기초"
short_title: "Copilot Studio 에이전트 ALM 기초"
description: "Copilot Studio 에이전트를 위한 애플리케이션 수명 주기 관리(ALM)의 핵심 — 환경, 솔루션, 게시자, 파이프라인으로 구성되는 안전한 베이스라인."
order: 4
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/alm-copilot-studio-agents-foundation/"
source_author: "jpapadimitriou"
source_published: "2026-06-03"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/alm-copilot-studio-agents-foundation/"
image: "/assets/catblog/alm-copilot-studio-agents-foundation/header.png"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 jpapadimitriou(@jpapadimitriou) 원문 [ALM for Copilot Studio Agents: The Foundation](https://microsoft.github.io/mcscatblog/posts/alm-copilot-studio-agents-foundation/)(2026-06-03)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/alm-copilot-studio-agents-foundation/header.png' | relative_url }}" alt="Copilot Studio 에이전트를 위한 ALM 기초" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

## 왜 중요한가

Copilot Studio는 아이디어에서 작동하는 에이전트까지의 속도가 놀랍도록 빠릅니다. 이 속도는 플랫폼의 가장 큰 강점 중 하나지만, 동시에 아무도 안전한 변경 방법을 생각하기 전에 에이전트가 실제 사용자 앞에 놓일 수 있다는 의미이기도 합니다. 이미 사람들이 사용하는 *버전 1*을 깨뜨리지 않으면서 *버전 2*를 개발하고 싶은 순간, 프로덕션이 아닌 곳에서 변경 작업을 할 공간과 그 변경을 안정적으로 이동할 방법이 필요해집니다.

그것이 바로 ALM(애플리케이션 수명 주기 관리)이 제공하는 것입니다. 이 글은 **기초**를 다룹니다. 에이전트가 본인 외에 누군가에게 중요해지기 전에 모든 메이커가 갖춰야 할 안전한 베이스라인이죠. 의도적으로 완전한 가이드가 아닙니다. 문제에 빠지지 않게 해주는 결정들을 Power Platform 배경 없이도 이해할 수 있도록 설명합니다.

> 이것은 짧은 시리즈의 첫 번째 글입니다. 여기서 목표는 안전한 베이스라인이며 모든 고급 패턴을 다루지는 않습니다. 이후 글에서 더 깊이 들어갈 예정입니다.

---

## 환경부터 시작하라

ALM 전략의 기초는 환경 격리입니다. Power Platform에서 가장 검증된 패턴은 세 개의 환경입니다: **개발(Development)**, **테스트(Test)**, **프로덕션(Production)**. 개발 환경은 메이커가 작업하는 곳, 테스트는 검증하는 곳, 프로덕션은 사용자가 라이브 에이전트와 상호작용하는 곳입니다. 변경은 한 방향으로만 흐릅니다 — 개발에서 테스트로, 테스트에서 프로덕션으로 — 이것이 프로덕션을 안정적이고 예측 가능하게 유지합니다.

플랫폼이 처음이라면 [Power Platform 환경 개요](https://learn.microsoft.com/en-us/power-platform/admin/environments-overview)를 통해 환경이 실제로 무엇인지 이해하세요. 환경은 [Power Platform 관리 센터](https://learn.microsoft.com/en-us/power-platform/admin/create-environment)에서 만들며, 그 과정은 간단합니다.

이 3환경 모델은 **플랫폼이 강제하는 필수 요건이 아닙니다**. 일회성 개념 증명(PoC)이라면 단일 환경으로 충분합니다. 하지만 현재 버전이 사용자들을 계속 서비스하는 동안 다음 버전을 개발하고 싶은 순간부터 분리는 그 비용을 충분히 보상합니다. 없으면, 매 수정이 곧 프로덕션 수정입니다.

> **시리즈 후속 글:** 개발/테스트/프로덕션이 갖춰지면, 성숙한 에이전트는 흔히 플랫폼 회귀를 프로덕션 도달 전에 잡아내기 위한 *미리 보기* 환경과 진행 중인 작업을 방해하지 않는 긴급 핫픽스용 *프로덕션 정렬* 환경을 추가합니다. 이는 복원력 패턴이지 기초가 아니므로 별도 글에서 다룹니다.

| 환경 | 위치하는 내용 | 이유 |
|---|---|---|
| 개발 | 비관리 솔루션 (활성 작업) | 일상적인 작성 |
| 테스트 | 관리 솔루션 | 검증, UAT |
| 프로덕션 | 관리 솔루션 | 라이브 사용자 |

여기서 시작하세요. 실제 문제가 생길 때만 환경을 추가하세요.

---

## 솔루션: 배포의 단위

환경이 에이전트가 사는 곳이라면, **솔루션**은 환경 사이를 이동하는 방법입니다. 솔루션은 에이전트가 의존하는 모든 구성 요소를 담는 컨테이너로, 전체 집합을 하나의 단위로 이식 가능하게 만듭니다.

소프트웨어 개발 배경이 있다면, 솔루션은 개념적으로 프로젝트나 패키지와 비슷합니다. 관련 자산을 그룹화해 하나의 일관된 산출물로 버전 관리, 내보내기, 가져오기가 가능합니다. [Power Platform ALM의 솔루션 개념](https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm)에서 전체 모델을 확인하세요.

### 먼저 게시자를 만들어라

솔루션을 만들기 전에 **커스텀 접두사**가 있는 **커스텀 게시자**를 만드세요. 이는 단순한 형식이 아니라 진짜 모범 사례입니다. 게시자의 접두사(예: `contoso_`)는 생성하는 모든 것의 스키마 이름에 찍히며, 구성 요소를 명확하게 식별할 수 있게 해주고 일반적인 기본 게시자를 피하게 합니다. 접두사는 한 번 설정하면 구성 요소 전체 생애에 따라다니므로, 신중하게 결정할 가치가 있습니다. [솔루션 게시자 만들기](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-solution#create-a-solution-publisher)를 참고하세요.

### 솔루션 안에 들어가는 것들

에이전트가 의존하는 모든 것은 하나의 솔루션 안에 있어야 합니다. 실제로는 Copilot Studio 메이커 경험에서 보이는 에이전트와 그 **구성 요소**를 의미합니다:

- **토픽** — 대화 로직
- **도구** — 에이전트가 호출할 수 있는 액션
- **지식 소스** — 에이전트가 답변을 근거할 콘텐츠

이와 함께 몇 가지 Power Platform 구성 요소도 함께 이동합니다:

- **커스텀 커넥터** — 에이전트나 플로우가 호출하는 자체 API 정의
- **연결 참조(Connection references)** — 연결에 대한 솔루션 인식 포인터로, 실제 자격 증명이 하드코딩되지 않고 환경별로 바인딩됨
- **환경 변수** — 환경마다 다른 구성 값 (아래 참조)
- **워크플로** — 에이전트를 대신해 로직을 실행하는 Power Automate 플로우

솔루션 *외부*에서 만든 것은 배포 파이프라인에서 보이지 않으며 깔끔하게 승격될 수 없습니다. 이것이 팀이 초반에 가장 많이 저지르는 실수입니다. 기본 솔루션에서 구성 요소를 만들고, 나중에 이동할 수 없다는 것을 발견하는 것이죠. 먼저 솔루션을 만들고, 그 안에서 모든 것을 작성해 이를 피하세요. [솔루션에서 에이전트 작성 방법](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-solutions-overview)을 참고하세요.

### 관리 vs. 비관리

솔루션은 두 가지 형태로 존재합니다:

| 유형 | 위치 | 사용 방법 |
|---|---|---|
| **비관리(Unmanaged)** | 개발 | 작성하는 동안 구성 요소를 자유롭게 추가, 편집, 제거 |
| **관리(Managed)** | 테스트, 프로덕션 | 배포 가능한 산출물 — 작성하지 않고 가져옴 |

<figure class="screenshot">
  <img src="{{ '/assets/catblog/alm-copilot-studio-agents-foundation/alm-solution-evolution-diagram.png' | relative_url }}" alt="Power Platform 관리 솔루션 배포 모델을 설명하는 다이어그램" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>개발 환경에서 에이전트, 워크플로, 변수 같은 구성 요소는 메이커가 자유롭게 편집할 수 있는 비관리 솔루션 안에 있습니다. 솔루션은 버전이 붙은 관리 패키지로 내보내져 테스트와 프로덕션으로 배포됩니다. 변경은 개발에서 패키지를 거쳐 하위 환경으로 한 방향으로만 흐릅니다.</figcaption>
</figure>

에이전트를 발전시킬 때의 모범 사례는 개발에서 **관리** 패키지로 내보내고 테스트와 프로덕션에 가져오는 것입니다. 관리 솔루션은 읽기 전용 배포 가능 산출물입니다. 변경이 필요하면 개발에서 수정, 다시 내보내기, 재배포합니다.

> 관리 솔루션이 완전히 봉인된 것은 아닙니다. 대상 환경에서도 관리 구성 요소 위에 **비관리 레이어**를 만들어 로컬에서 재정의할 수 있습니다. 가능한 일이며, 최악의 ALM 혼란의 원인입니다. 로컬 편집은 다음 배포 시 조용히 덮어씌워지기 때문입니다. 두 가지가 안전을 지켜줍니다: 테스트와 프로덕션에서 [**비관리 사용자 지정 차단**](https://learn.microsoft.com/en-us/power-platform/alm/block-unmanaged-customizations) 환경 설정을 켜고, 아무도 그 환경에서 편집하지 않도록 메이커/관리자 액세스를 제거하세요. (차단 설정도 플로우 켜기/끄기 같은 몇 가지 작업은 허용하므로 액세스 위생도 중요합니다.)

### 기본 솔루션으로 설정하라

개발 환경에서 에이전트 자산을 만들기 **전에** 솔루션을 만들고, [기본 솔루션(preferred solution)](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/preferred-solution)으로 설정해 새 구성 요소가 자동으로 그 안에 들어가게 하세요. 그러지 않으면 잊혀지는 기본 솔루션에 떠다니게 됩니다.

---

## 파이프라인: 솔루션을 안전하게 이동하기

환경이 준비되고 솔루션이 모든 에이전트 자산을 담고 있다면, 다음 질문은 솔루션이 실제로 개발에서 테스트로, 테스트에서 프로덕션으로 어떻게 이동하느냐입니다.

*수동으로* 할 수도 있습니다 — 개발에서 .zip을 내보내고 테스트에 가져오고, 프로덕션에 반복합니다. 가능은 하지만 오류가 발생하기 쉽고 무엇이 언제 누가 배포했는지 기록이 남지 않습니다.

[Power Platform 파이프라인](https://learn.microsoft.com/en-us/power-platform/alm/pipelines)이 이를 해결합니다. 파이프라인은 환경을 순서대로 연결하는 미리 구성된 승격 경로입니다. 승격은 단일 액션으로 이루어집니다: 솔루션 선택, 다음 단계 선택, 배포. 중요한 점은 **테스트에 배포된 솔루션 버전이 그대로 프로덕션으로 승격된다는 것**입니다 — 파이프라인은 개발에서 다시 내보내는 것이 아니라 정확히 그 산출물을 전달합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/alm-copilot-studio-agents-foundation/alm_solution_pipeline_flow.png' | relative_url }}" alt="Power Platform 파이프라인 자동 배포 프로세스를 보여주는 다이어그램" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>개발의 솔루션은 관리 패키지로 내보내져 파이프라인에 투입됩니다. 파이프라인은 이것을 테스트와 프로덕션에 배포합니다. 파이프라인은 배포 중 환경별 구성을 해결하고 각 배포를 기록합니다.</figcaption>
</figure>

배포는 **구성이 대상 환경에 바인딩되는** 시점이기도 합니다. 파이프라인 배포 중에 환경마다 다른 값을 제공할 수 있습니다:

- 도구, 커스텀 커넥터, MCP 서버, 워크플로를 위한 **연결** — 연결 참조를 통해 매핑되어 각 환경이 자체 자격 증명을 사용
- 대상 환경을 위한 **환경 변수 값**

**파이프라인이 주는 것:**

- **반복 가능성** — 매번 동일한 프로세스, 잊어버릴 수동 단계 없음
- **감사 추적** — 누가, 무엇을, 언제, 어느 환경에 배포했는지
- **버전 가시성** — 배포 기록으로 각 환경에 어떤 버전이 있는지 확인 가능
- **가드레일** — 다음 단계 배포 전에 승인을 요구할 수 있음

> 배포 기록은 버전에 대한 *가시성*을 제공하지만, 원클릭 롤백은 아닙니다. 관리 솔루션을 제거하면 에이전트를 포함한 구성 요소도 제거됩니다. "롤백"은 보통 이전 관리 버전을 배포하거나 환경 백업을 복원하는 것을 의미하므로, 단순히 되돌릴 수 있다고 가정하는 것이 아니라 계획을 세워야 합니다.

설정 세부 사항은 [Power Platform에서 파이프라인 설정](https://learn.microsoft.com/en-us/power-platform/alm/set-up-pipelines)을 참고하세요.

---

## 구성: 환경 변수

원칙은 간단합니다: 환경별 내용은 하드코딩하지 않습니다. API 엔드포인트, SharePoint URL, 임계값, 기능 플래그 — 모두 [환경 변수](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables)에 넣습니다.

환경 변수는 두 부분으로 구성됩니다:

- **정의** — 스키마(이름, 데이터 유형, 설명). 항상 솔루션과 함께 이동합니다.
- **값** — 특정 환경의 실제 내용.

기본적으로 값을 솔루션 *밖에* 두어 각 환경이 자체 값을 제공하게 하며, 이것이 진정한 환경별 내용(테스트 엔드포인트가 프로덕션으로 전달되어서는 안 됨)에 올바른 접근 방식입니다. 그러나 강제는 아닙니다. 솔루션에 값을 포함해 함께 이동시킬 수도 있습니다. 어디서나 동일한 기본값은 포함하기 좋은 후보입니다.

값은 솔루션이 도착하기 전이 아니라 **배포 시점에** 제공됩니다. 순서가 중요합니다. 아직 없는 변수에는 값을 설정할 수 없고, 정의는 솔루션 가져오기 시 나타납니다. 따라서 파이프라인은 배포 중 값을 묻거나, 자동화 시나리오의 경우 배포 설정 파일에서 읽습니다. *첫 번째* 배포에서는 정의가 솔루션과 함께 도착하며, 이후 업그레이드에서는 정의가 이미 있으므로 값은 미리 구성될 수 있습니다.

> **비밀** — API 키, 토큰, 자격 증명 — 은 [Azure Key Vault에, 비밀 환경 변수를 통해 참조해서](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables-azure-key-vault-secrets) 보관하세요. 에이전트는 이름으로 비밀을 참조하고 플랫폼이 런타임에 해결하므로, 키를 교체할 때는 Key Vault만 업데이트하면 되며 재배포가 필요 없습니다. 파이프라인은 환경별로 *참조*를 매핑하며, 비밀 값 자체는 저장하지 않습니다.

> **시리즈 후속 글:** 완전 자동화 CI/CD(Azure DevOps 또는 GitHub Actions)의 경우, 값은 `pac solution`으로 생성된 배포 설정 파일에서 옵니다. 이 메커니즘과 연결 참조 관련 내용은 별도의 구성 중심 글에서 다룹니다.

---

## 작동 여부 확인: 평가

올바르게 배포했다고 해서 *올바르게 동작*함을 보장하지는 않습니다. [평가(evaluation)](https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-intro)는 에이전트가 올바른 도구를 선택하고 수용 가능한 응답을 생성하는지 측정하는 정의된 테스트 입력 및 예상 출력 집합입니다. 품질 게이트로 취급하세요: 내보내기 전에 개발에서 평가를 실행하고, 가져온 후 대상에서 다시 실행해 배포가 깔끔하게 이루어졌는지 확인합니다.

직접 할 필요는 없습니다. [에이전트 개선 루프](https://microsoft.github.io/mcscatblog/posts/agentic-improvement-loop/)에서는 품질 반복 방법을, [Azure DevOps 자동화 평가](https://microsoft.github.io/mcscatblog/posts/copilot-studio-eval-gate-azure-devops/)에서는 품질이 떨어질 때 변경을 차단하는 강제 게이트로 평가를 전환하는 방법을 보여줍니다. 평가를 승격 흐름에 연결하는 것은 이 시리즈의 자동화 글 주제입니다.

---

## 승격 전 체크리스트

- [ ] 커스텀 게시자와 접두사가 준비되어 있다
- [ ] 모든 에이전트 자산이 하나의 솔루션 안에 있다
- [ ] 그 솔루션이 개발에서 기본 솔루션으로 설정되어 있다
- [ ] 환경별 값은 하드코딩되지 않고 환경 변수에 있다
- [ ] 비밀은 Key Vault에 있고 비밀 환경 변수를 통해 참조된다
- [ ] 테스트와 프로덕션에서 비관리 사용자 지정을 차단하고 메이커/관리자 액세스를 제거했다
- [ ] 파이프라인이 올바른 단계 순서로 구성되어 있다
- [ ] 테스트와 프로덕션 배포용으로 솔루션을 관리로 내보냈다
- [ ] 개발에서 내보내기 전, 가져온 후 대상에서 평가가 통과되었다

---

## 투자의 보상

기초가 갖춰지면 에이전트를 발전시키는 것은 단일 파이프라인 액션입니다. 아무도 프로덕션을 직접 편집하지 않으므로 프로덕션은 안정적으로 유지됩니다. 구성은 올바른 환경에 자동으로 바인딩됩니다. 비밀은 재배포 없이 교체됩니다. 그리고 언제나 어디에 어떤 버전이 실행 중인지 정확히 알 수 있습니다.

이것이 베이스라인입니다. 이것을 탄탄하게 만들면, 이 시리즈의 나머지 고급 패턴 — 조기 배포 검증, 핫픽스 환경, 소스 제어, 자동화 품질 게이트 — 이 의존할 수 있는 안정적인 토대가 생깁니다.

여러분의 ALM 설정은 현재 어떻게 되어 있나요? 기초 중 어떤 부분이 먼저 발목을 잡았나요? 댓글로 알려주세요.
