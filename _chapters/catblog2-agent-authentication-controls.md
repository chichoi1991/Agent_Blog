---
layout: "chapter"
date: 2026-06-14
title: "\"안녕하세요\" 이전에 문을 닫는 관리자 컨트롤"
short_title: "에이전트 인증 관리 컨트롤"
description: "Power Platform 관리자 컨트롤 '에이전트 Microsoft 인증 필수'가 DLP 채널 차단으로는 해결하지 못했던 내부 직원용 에이전트 인증 경계 문제를 어떻게 해결하는지 설명합니다."
order: 2
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/agent-authentication-controls/"
source_author: "adilei"
source_published: "2026-06-14"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/agent-authentication-controls/"
image: "/assets/catblog/agent-authentication-controls/header.png"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 adilei(@adilei) 원문 [The Admin Control That Closes the Door Before "Hello"](https://microsoft.github.io/mcscatblog/posts/agent-authentication-controls/)(2026-06-14)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/agent-authentication-controls/header.png' | relative_url }}" alt="때로는 인사조차 너무 많은 것일 수 있다." loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

비교적 알려지지 않았지만 주목할 만한 기능을 소개합니다. Copilot Studio의 [**에이전트 인증(Authentication for agents)**](https://learn.microsoft.com/en-us/power-platform/admin/security/configure-authentication-controls-for-agents) 관리자 컨트롤에 새 옵션 **Microsoft 인증 필수(Require Microsoft authentication)**가 추가되었습니다. 조직에서 메이커들이 빌드한 에이전트, 특히 내부 직원용 에이전트에 사용자가 *어떻게* 로그인하는지를 관리하고 싶다면 이 글을 읽어보세요.

이 문제는 겉보기보다 미묘한 거버넌스 질문과 연결되어 있습니다. 인증 요구 자체는 어렵지 않습니다. 에이전트를 `manual auth with Entra ID`로 설정하면 사용자는 사용 전에 로그인해야 합니다. 그러나 이것만으로 '문을 닫는' 것은 아닙니다. `manual auth`를 사용하면 채팅을 여는 사람은 누구든 Direct Line 대화를 시작하고, 인증 **이전에** 메이커가 편집 가능한 로그인 안내 메시지를 보게 됩니다. 진짜 목표는 인증되지 않은 방문자나 이 에이전트를 사용할 권한이 없는 방문자에게 **아무것도** 노출하지 않는 것입니다. 인사말조차도요. 이것이 왜 까다로웠는지, 그리고 새 옵션이 어떻게 이를 해결하는지 이해하려면 DLP(데이터 손실 방지)의 특이한 동작 방식을 먼저 살펴봐야 합니다.

## 하나의 레버, 두 개의 전혀 다른 API

DLP와 미리 보기의 신규 에이전트 설정은 관리자가 채널을 차단하는 방법을 제공합니다. 가장 쉬운 첫 번째 조치는 [DLP 커넥터](https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention?tabs=webapp#block-publishing-to-specific-channels) **Microsoft Entra ID 인증 없는 채팅(Chat without Microsoft Entra ID authentication)**을 차단해 익명 에이전트를 막는 것입니다. 많은 조직이 이 설정을 하고 멈춥니다.

그러나 대부분은 **Direct Line 채널**은 활성 상태로 둡니다. 이유가 있습니다. 직원용 커스텀 UI에 권장되는 경로는 **M365 Agents SDK Copilot Studio 클라이언트**입니다. 이 결정에 대한 내용은 [Copilot Studio 에이전트 통합 경로의 모든 것](https://microsoft.github.io/mcscatblog/posts/copilot-studio-api-decision-guide/)에서, 인증 패턴은 [Manual 인증이 필요하지 않은 이유](https://microsoft.github.io/mcscatblog/posts/you-dont-need-manual-auth/)에서 다뤘습니다. 문제는 SDK 클라이언트의 위임 인증(delegated-auth) 경로가 동일한 **Direct Line 채널** 레버에 묶여 있다는 점입니다. 이 레버를 끄면 **SDK 클라이언트도 함께 끊깁니다**.

동시에 직원용 에이전트에서 순수한 `Direct Line`을 비활성화하고 싶은 이유도 있습니다. `Direct Line`에는 소규모 인증 전 콘텐츠 노출 영역이 있습니다. 사용자가 `Direct Line` / WebChat 경험을 열면, 로그인 전에 연결이 성공하는 즉시 대화가 시작됩니다. 에이전트가 인증을 요구하면 로그인 프롬프트가 표시되는데, 이 메시지 텍스트는 메이커가 편집할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/agent-authentication-controls/on-sign-in-message.png' | relative_url }}" alt="메이커가 편집 가능한 텍스트가 포함된 Copilot Studio 로그인 토픽의 메시지 노드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>On Sign In 토픽. 이 인사말은 메이커가 작성하며, 사용자가 인증하기 전에 표시될 수 있습니다.</figcaption>
</figure>

이 노출 영역은 이미 공개 콘텐츠가 있는 고객 대상 에이전트에서는 무방합니다. 공개 은행 웹사이트는 모든 방문자를 반길 수 있고, 로그인 후에만 계좌 정보를 보여주면 됩니다. 직원용 경험은 다릅니다. 신원 경계 앞에 공개 콘텐츠가 없이, 처음부터 끝까지 인증된 상태여야 합니다.

**M365 Agents SDK Copilot Studio 클라이언트**는 다르게 동작합니다. 인증 전에는 Copilot Studio로부터 응답을 받을 수 없으므로, 인증 전 대화도 없고 메이커가 작성한 콘텐츠가 유출될 일도 없습니다. 그래서 직원용 앱에 이상적으로 맞습니다.

따라서 진짜 요구 사항은 명확합니다. SDK 클라이언트는 유지하되, 순수한 `Direct Line`의 인증 전 노출 영역을 닫는 것입니다. 현재의 공유된 **Direct Line 채널** 레버는 이 두 연결 방식을 동시에 제어하기 때문에 이를 표현할 수 없습니다.

## 새 컨트롤이 문제를 해결하는 방법

[Power Platform 관리 센터](https://admin.powerplatform.microsoft.com/)에서 **보안 > ID 및 액세스** 아래의 [**에이전트 인증(Authentication for agents)** (미리 보기)](https://learn.microsoft.com/en-us/power-platform/admin/security/configure-authentication-controls-for-agents) 창은 메이커가 Copilot Studio에서 *선택할 수 있는* 인증 방법을 환경 수준 정책으로 설정합니다. 최근 새 옵션이 추가되었습니다.

> 이 글 작성 시점(2026년 6월) 기준으로 미리 보기 기능이며 변경될 수 있습니다.

네 가지 옵션 중 하나를 선택하면 메이커의 선택지도 그에 맞게 줄어듭니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/agent-authentication-controls/authentication-for-agents-pane.png' | relative_url }}" alt="Power Platform 관리 센터의 에이전트 인증 창, 'Microsoft 인증 필수'가 선택된 상태" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>보안 &gt; ID 및 액세스 아래에 있습니다. "Microsoft 인증 필수"는 사용자 대상으로 가장 엄격한 새 보안 태세입니다.</figcaption>
</figure>

| 관리자 정책 | 메이커가 구성할 수 있는 내용 | 차단 대상 |
| --- | --- | --- |
| **인증 없음** | 익명 포함 모든 방법 | 없음 |
| **Microsoft 인증 필수** | `Authenticate with Microsoft`만 | `manual auth` 및 익명 액세스 |
| **Entra 인증 필수** | `Authenticate with Microsoft` 또는 `manual auth with Entra ID` | 익명 액세스 및 `manual Generic OAuth 2` |
| **모든 지원 방법 허용** | Microsoft, `manual Entra ID`, `manual Generic OAuth 2` | 익명 액세스 |

핵심 차이점은 다음과 같습니다. 관리자는 이미 **Entra 인증 필수**를 적용할 수 있었지만, 이 경우에도 메이커는 `manual auth with Entra ID`를 선택할 수 있었고, 바로 이 `manual auth`가 인증 전 로그인 화면을 열어둡니다. 새로운 **Microsoft 인증 필수** 옵션은 더 엄격합니다. 통합 `Authenticate with Microsoft` 모드만 강제하며 다른 선택지는 없습니다. 메이커의 선택지는 처음부터 인증 전 콘텐츠 노출 영역이 없는 단 하나의 모드로 좁혀지며, 어떤 커넥터가 어떤 채널 뒤에 있는지 신경 쓸 필요가 없습니다.

이것이 앞서 언급한 Direct Line 문제를 조용히 해결합니다. 순수한 `Direct Line`은 `Authenticate with Microsoft`를 지원하지 않습니다. 이를 적용하면 엔드포인트는 계속 접근 가능하지만, `Direct Line` 클라이언트는 콘텐츠가 공유되기 전에 오류를 받습니다. 메이커가 작성한 로그인 메시지를 포함해서요. SDK 클라이언트는 동일한 채널을 통해 계속 작동하며, 인증 전 노출 영역은 다른 모든 클라이언트에 대해 닫힙니다. **Direct Line 채널** 레버를 건드릴 필요가 없었습니다.

정책 적용은 실질적입니다. 정책을 강화하면 더 이상 준수하지 않는 이미 게시된 에이전트는 **게시가 차단되고 응답이 중단됩니다**. 메이커가 에이전트를 정책에 맞게 업데이트할 때까지요.

## DLP 설정을 더 세분화하지 않는 이유 (현재로서는)

Direct Line 커넥터와 SDK 클라이언트를 분리해달라는 요청이 자연스럽게 나올 수 있습니다. 나중에 그런 방향으로 갈 수도 있지만(약속은 아닙니다), 이 문제를 해결하기 위해 그것이 반드시 필요하지는 않습니다. 직원용 커스텀 웹 앱이나 네이티브 앱을 개발하는 경우, **Direct Line 채널**을 활성 상태로 유지해 SDK 클라이언트가 작동하게 하고, **Microsoft 인증 필수**를 적용해 인증 전 노출을 닫으면 됩니다. 채널은 켜져 있고, 허점은 닫힙니다.

이것이 컨트롤이 채널이 아닌 인증 방법을 중심으로 구성된 이유이기도 합니다. 관리자는 실제로 프로토콜로서 Direct Line 대 SDK에 관심이 없습니다. 그것은 *개발자* 개념입니다. 관리자가 원하는 것은 **신원 보안 태세**입니다. "여기의 에이전트는 실제 Microsoft 로그인을 요구해야 한다." 결정을 인증 방법 측에 두면 API는 개발자의 관심사로, 신원 요구 사항은 관리자의 관심사로 남습니다.

## 이 설정으로 나아가는 방법

직원용 에이전트만 호스팅하는 모든 새 환경에서는 처음부터 **Microsoft 인증 필수**를 설정해두세요. 환경의 모든 에이전트가 이 설정을 통과할 수 있는지 자신이 없다면, 보통 환경 전략을 재검토해야 한다는 신호입니다. 직원용과 고객용 시나리오는 처음부터 같은 환경을 공유해서는 안 되기 때문입니다.

## 기존 에이전트: 영향 범위 평가

이미 에이전트를 호스팅하는 환경에서는 주의가 필요합니다. 정책 적용은 소급 적용됩니다. **Microsoft 인증 필수**를 켜는 즉시, 이미 `Authenticate with Microsoft`를 사용하지 않는 게시된 에이전트는 모두 게시가 차단되고 메이커가 업데이트하기 전까지 응답을 중단합니다. 그러므로 스위치를 켜기 전에 얼마나 많은 에이전트가 영향을 받는지 파악해야 합니다.

현재 가장 실용적인 방법은 [Copilot Studio Kit](https://marketplace.microsoft.com/en-us/product/dynamics-365/microsoftpowercatarch.copilotstudiokit2?tab=overview)입니다. Kit의 인벤토리 모듈이 환경을 스캔하고 각 에이전트의 인증 구성을 포함한 에이전트 세부 정보를 Dataverse에 기록합니다. **에이전트 세부 정보(Agent Details)** 테이블을 열어 **최종 사용자 인증 유형(End User Authentication Type)** 열을 확인하세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/agent-authentication-controls/agent-details-authentication.png' | relative_url }}" alt="Copilot Studio Kit의 에이전트 세부 정보 테이블, 최종 사용자 인증 유형 열에 'Custom Entra ID' 값이 표시된 상태" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio Kit 인벤토리는 각 에이전트의 인증 유형을 기록합니다. `Integrated`가 아닌 모든 값은 Microsoft 인증 필수를 적용하면 차단될 에이전트입니다.</figcaption>
</figure>

규칙은 간단합니다. `Integrated` 이외의 모든 값(빈 값 포함)은 `Authenticate with Microsoft`를 적용하면 차단될 에이전트입니다. `Integrated`는 인벤토리에서 `Authenticate with Microsoft`의 레이블이며, 그 외의 모든 것(`Custom Entra ID`, `Generic OAuth 2`, 인증 없음을 의미하는 빈 값 등)은 새 정책 적용 범위 밖에 있습니다. 해당 열을 필터링하고 `Integrated`가 아닌 행 수를 세면 영향 범위와 함께 적용 전에 메이커들에게 알려야 할 대상 목록도 얻을 수 있습니다.

Kit의 인벤토리 및 거버넌스 모듈에 대한 자세한 설명은 [Copilot Studio Kit: 테스트 자동화를 넘어서](https://microsoft.github.io/mcscatblog/posts/copilot-studio-kit/)를 참고하세요.

## 핵심 요약

- **새 컨트롤:** **Microsoft 인증 필수**(보안 > ID 및 액세스 아래)는 메이커를 `Authenticate with Microsoft`로만 강제해, manual Entra 인증도 열어두는 인증 전 콘텐츠 노출 영역을 완전히 닫습니다.
- **존재 이유:** **Direct Line 채널**을 차단하면 SDK 클라이언트의 위임 인증 경로도 끊어지므로, DLP는 권장 통합 방식을 깨뜨리지 않고서는 인증 전 노출 영역을 닫을 수 없습니다. 인증 방법 컨트롤은 가능합니다.
- **기본 보안 태세:** 직원용 에이전트만 호스팅하는 환경(시나리오를 섞지 말 것)에서는 처음부터 **Microsoft 인증 필수**를 기본값으로 설정하세요. M365 Agents SDK 클라이언트를 통한 커스텀 웹 UI는 완전히 지원됩니다.
- **적용 전:** 적용은 소급 적용되므로, Copilot Studio Kit 인벤토리를 사용해 **최종 사용자 인증 유형**이 `Integrated`가 아닌 에이전트 수를 파악하세요. 그것이 영향 범위입니다.

고객 피드백을 바탕으로 향후 Direct Line과 SDK 클라이언트 관련 DLP 세분화가 추가될 수 있습니다(어떤 방향으로도 약속은 아닙니다). 그때까지, 직원용 에이전트에 접근할 수 있는 사람을 관리하고 싶다면 채널 토글보다 인증 요구 사항에서 시작하는 것이 더 명확한 방법입니다.

여러분의 조직에서는 현재 직원용과 고객용 에이전트를 어떻게 구분하고 있나요? 댓글로 의견을 나눠주세요.
