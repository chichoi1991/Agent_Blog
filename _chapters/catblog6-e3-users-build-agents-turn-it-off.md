---
layout: "chapter"
date: 2026-07-09
title: "왜 E3 사용자가 갑자기 Copilot Studio에서 에이전트를 만들 수 있게 되었을까 — 그리고 이를 끄는 방법"
short_title: "E3 사용자의 에이전트 생성 차단"
description: "최근 리디렉션 변경으로 기본 라이선스 사용자에게 classic agent 생성 기능이 더 잘 보이게 된 이유와, 이를 막기 위해 비활성화할 단일 서비스 플랜을 설명합니다."
order: 6
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/e3-users-build-agents-turn-it-off/"
source_author: "emdarcy"
source_published: "2026-07-09"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/e3-users-build-agents-turn-it-off/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 emdarcy(@emdarcy) 원문 [Why Your E3 Users Can Suddenly Build Agents in Copilot Studio — and How to Turn It Off](https://microsoft.github.io/mcscatblog/posts/e3-users-build-agents-turn-it-off/)(2026-07-09)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/e3-users-build-agents-turn-it-off/classic-agents-governance-hero.png' | relative_url }}" alt="기본 라이선스 사용자도 Copilot Studio에서 classic agent를 만들 수 있음을 보여주는 거버넌스 안내 이미지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

헬프데스크에 사용자가 스스로 만든 에이전트에 대한 문의가 들어오기 시작했거나, **E3** 같은 기본 Microsoft 365 라이선스만 가진 사용자에게도 **Copilot Studio 웹 앱**에서 **Teams용 에이전트 만들기(create an agent for Teams)** 경험이 보인다면, 착각이 아닙니다. 그리고 뭔가를 실수로 추가 구매한 것도 아닙니다.

이 글에서는 왜 이런 일이 생겼는지, 최근 무엇이 바뀌어 이 기능이 더 눈에 띄게 되었는지, 그리고 에이전트 작성 권한을 제거하려면 어떤 단일 라이선스 **service plan**을 비활성화해야 하는지를 설명합니다.

## 무엇이 달라졌나?

기본 라이선스 사용자가 **classic agents**를 만들 수 있는 기능은 **Copilot Studio for Microsoft Teams plan**의 일부로 제공되며, 이 플랜은 E3와 E5를 포함한 일부 Microsoft 365 구독에 번들되어 있습니다.

달라진 것은 그 기능이 **어디에서 보이느냐**입니다.

> 2026년 6월 말부터 독립형 **Copilot Studio for Teams** 앱으로는 더 이상 classic chatbot을 만들 수 없습니다. 이제 이 앱은 사용자를 **Copilot Studio 웹 앱**으로 리디렉션합니다.

이 지점이 대부분의 관리자에게 우려를 일으키는 부분입니다. 이전에는 비교적 눈에 띄지 않는 Teams 앱 안에서 에이전트를 만들던 사용자가, 이제는 곧바로 Copilot Studio 웹 앱으로 이동합니다. 그만큼 이 기능이 훨씬 더 쉽게 발견됩니다.

## 왜 기본 라이선스 사용자도 이 기능을 사용할 수 있나

Microsoft 365 엔터프라이즈 라이선스에는 [Copilot Studio for Microsoft Teams plan](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing-subscriptions#copilot-studio-for-microsoft-teams-plan)이 포함되어 있으며, 이를 통해 Copilot Studio의 **일부 기능**이 제공됩니다. 즉, **classic orchestration**을 사용하는 에이전트를 만들고 이를 Teams에 게시할 수 있습니다.

이 권한이 잘 눈에 띄지 않았던 이유도 있습니다. 실제로 이 권한은 **`Power Virtual Agents for Office 365`**라는 라이선스를 통해 제공됩니다. 사용자가 이런 에이전트를 만들면 Copilot Studio는 선택한 팀에 대해 자동으로 [**Dataverse for Teams** 환경을 프로비저닝](https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-get-started-teams)합니다.

모든 것을 당장 꺼버리기 전에, 먼저 다음 점을 기억해야 합니다.

> 이 권한은 **classic agents**에만 적용되며, **Dataverse for Teams** 환경과 **Teams 게시**로 범위가 제한됩니다. 생성형 오케스트레이션, 프리미엄 커넥터, 임의의 게시 채널까지 허용하는 것은 아니며, 그런 기능은 여전히 별도의 Copilot Studio 구독이 필요합니다.

또한 Teams 플랜 기반 에이전트는 Teams에서 사용될 때 **Copilot Credits를 소비하지 않습니다**. 따라서 이 문제는 과금보다는 **거버넌스와 환경 난립** 관점에서 보는 것이 더 적절합니다. 많은 관리자가 생각하는 것보다 기본 Microsoft 365 라이선스만으로도 더 많은 Copilot 기능이 제공된다는 점을 다시 상기시켜 줍니다. 이는 [에이전트를 Microsoft 365 Copilot에 배포할 때 실제로 Copilot 라이선스가 꼭 필요한 것은 아니라는 점](https://microsoft.github.io/mcscatblog/posts/no-copilot-license-m365-channel/)과도 비슷합니다.

## 제어 포인트: `Power Virtual Agents for Office 365` service plan 비활성화

영향을 받는 사용자가 **Copilot Studio 웹 앱**과 Teams 앱 **양쪽 모두에서** classic agent를 **생성하거나 편집하지 못하게** 하려면, 해당 사용자의 라이선스에서 **`Power Virtual Agents for Office 365`** service plan을 비활성화하면 됩니다. 사용자별로 할 수도 있고, 더 바람직하게는 대규모로 일괄 적용할 수도 있습니다.

### 옵션 1 — 사용자별

1. **Microsoft 365 관리 센터** → **Users** → **Active users**로 이동합니다.
2. 사용자를 선택한 뒤 **Licenses and apps**를 엽니다.
3. 사용자의 Microsoft 365 라이선스(E3 등)를 펼칩니다.
4. **Power Virtual Agents for Office 365**를 체크 해제합니다.
5. **Save changes**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/e3-users-build-agents-turn-it-off/Licence2.png' | relative_url }}" alt="사용자 라이선스에서 Power Virtual Agents for Office 365 서비스 플랜을 비활성화하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>사용자 라이선스에서 Power Virtual Agents for Office 365 service plan을 비활성화합니다.</figcaption>
</figure>

### 옵션 2 — 그룹 기반 라이선싱

소수의 사용자만 다루는 것이 아니라면, [Microsoft Entra ID의 그룹 기반 라이선싱](https://learn.microsoft.com/en-us/entra/identity/users/licensing-groups-assign)을 통해 관리하는 것이 좋습니다.

1. Entra ID에서 라이선스 할당에 사용하는 그룹을 엽니다.
2. 할당된 Microsoft 365 라이선스를 편집합니다.
3. 해당 그룹에 대해 **Power Virtual Agents for Office 365** service plan을 끕니다.
4. 구성원에게 할당이 반영될 때까지 기다립니다.

> 그룹 기반 라이선싱은 사용자가 그룹에 들어오거나 나갈 때도 정책을 일관되게 유지해 줍니다. 한 번 설정해 두면 계속 유지됩니다.

## 적용 후 기대할 수 있는 결과

- 영향 대상 사용자는 Copilot Studio 웹 앱과 Teams 앱에서 classic agent를 생성하거나 편집할 수 없게 됩니다.
- 이미 사용자가 만들어 둔 에이전트를 소급 삭제하지는 않으며, 이미 프로비저닝된 **Dataverse for Teams** 환경도 정리해 주지 않습니다.
- **별도 Copilot Studio** 또는 **Microsoft 365 Copilot** 라이선스를 가진 사용자에게는 영향을 주지 않습니다. 그 권한은 별개입니다.

## 다음 단계는 무엇인가?

service-plan 토글은 빠른 응급처치입니다. 그다음에는 더 오래가는 환경 수준 거버넌스 계획이 필요합니다.

- 제한을 강화하기 전에 먼저 **기존 Dataverse for Teams 환경을 감사**해 현재 얼마나 퍼져 있는지 파악합니다. 실제로 사용자에게 가치를 주는 것을 무심코 끄고 있지는 않은지 확인해야 합니다.
- Power Platform 관리 센터의 **Managed Environments**를 사용해 누가 어디에서 만들 수 있는지 통제합니다. 가능하다면 개발자 환경도 적극 활용합니다.
- 허용된 메이커도 가드레일 안에서 작업하도록 **DLP 정책**을 함께 적용합니다.

## 요약

E3와 E5에는 **classic** Teams 에이전트를 만들 권한이 조용히 포함되어 있었고, 2026년 6월 말의 리디렉션 변경이 그 기능을 웹 앱에서 더 많은 사용자에게 드러나게 만들었을 뿐입니다. 이것이 원하지 않는 동작이라면, 제어 포인트는 **`Power Virtual Agents for Office 365`**라는 단일 service plan입니다. 이를 사용자별로 끄거나, 더 바람직하게는 그룹 기반 라이선싱으로 관리할 수 있습니다. 여기에 Power Platform 거버넌스를 함께 적용하면, 큰 혼란 없이도 이 문제를 빠르게 통제할 수 있습니다.

### 참고 자료

- FAQ: [Why can Microsoft 365 users create agents in Copilot Studio, and how can I control this access?](https://learn.microsoft.com/en-us/microsoft-copilot-studio/faq-billing-licensing#why-can-microsoft-365-users-create-agents-in-copilot-studio-and-how-can-i-control-this-access)
- [Copilot Studio licensing and subscriptions](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing-subscriptions)
- [Quickstart: Create classic agents for Teams](https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-get-started-teams)
- [Assign licenses and manage access to Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing)
- [Group-based licensing in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/users/licensing-groups-assign)
