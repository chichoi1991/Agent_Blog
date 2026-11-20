---
layout: "chapter"
date: 2026-11-20
title: "Copilot Cowork로 Power Platform 크레딧 사용량 자세히 살펴보기"
short_title: "Cowork로 크레딧 사용량 분석"
description: "Copilot Cowork의 Power Platform Admin 플러그인으로 환경별 Copilot 크레딧 소비량을 살펴보고 차트와 정기 보고서를 만드는 방법."
order: 25
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/copilot-cowork-credit-analysis/"
source_author: "giorgioughini"
source_published: "2026-11-20"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/copilot-cowork-credit-analysis/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 giorgioughini(@giorgioughini) 원문 [Use Copilot Cowork to dig deep into your Power Platform credit consumption data](https://microsoft.github.io/mcscatblog/posts/copilot-cowork-credit-analysis/)(2026-11-20)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-cowork-credit-analysis/header.png' | relative_url }}" alt="관리 센터, Cowork, Power Platform 로고와 함께 Power Platform 사용량을 탐색하는 Copilot Cowork" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

어떤 환경에서 Copilot 크레딧을 소비하고 있을까요? 어느 환경을 자세히 살펴봐야 할까요? Power Platform 관리자라면 동료와 공유할 수 있는 답이 필요합니다. 매번 질문에 답하기 위해 별도의 보고서 프로젝트를 시작하지 않고도 말입니다.

새로운 [Copilot 크레딧 사용량 보고서 API(미리 보기)](https://learn.microsoft.com/en-us/power-platform/admin/programmability-tutorial-download-copilot-credit-usage-reports?tabs=power-automate)는 Power Platform 관리 센터에서 자격 및 소비 데이터를 다운로드하는 프로그래밍 방법을 제공합니다. 통합을 구축하거나 자체 보고 기록을 유지하려는 경우 유용한 출발점입니다.

하지만 조직에서 이미 **Copilot Cowork**를 사용한다면 데이터를 대화형으로 탐색하는 더 간단한 방법이 있습니다. **Power Platform Admin(미리 보기)** 플러그인을 활성화하고 평이한 영어로 질문하면 됩니다.

## Power Platform Admin 사용

[Power Platform Admin 플러그인](https://learn.microsoft.com/en-us/power-platform/admin/power-platform-admin-cowork)은 인벤토리, 사용량, 거버넌스, 용량 및 라이선스 등 다양한 관리 정보를 Cowork에 제공합니다. 그중 크레딧 소비량을 살펴보는 것이 특히 유용합니다.

> 플러그인은 현재 미리 보기 상태입니다. 읽기 전용 인사이트와 지침을 제공하며, Power Platform 관리 센터에서 독립적으로 관리 변경을 실행하지 않습니다.

조직에서 플러그인을 사용할 수 있다면 설정은 간단합니다.

1. **Customize** 아래의 Cowork 플러그인 영역을 열고 **Power Platform Admin (Preview)**을 찾습니다.
2. 플러그인을 열어 활성화합니다.
3. 메시지가 표시되면 **Connect**를 선택하고 **OAuth Connection**을 사용해 **Power Platform for Admins V2** 연결을 완료합니다.

아래 스크린샷은 연결을 완료한 플러그인이 활성화된 모습을 보여 줍니다. 플러그인 이름은 **Power Platform Admin (Preview)**이고 그 아래 연결 이름은 **Power Platform for Admins V2**입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-cowork-credit-analysis/power-platform-admin-plugin.png' | relative_url }}" alt="Cowork에서 활성화된 Power Platform Admin Preview와 연결된 Power Platform for Admins V2 연결 및 인벤토리, 사용량, 거버넌스 스킬" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>연결된 Power Platform 계정을 통해 관리 인사이트를 제공하는 활성 플러그인.</figcaption>
</figure>

Cowork 액세스와 **Power Platform 관리자**, **Dynamics 365 관리자** 또는 **전역 관리자** 역할이 있는 연결 계정이 필요합니다. 플러그인이 보이지 않으면 Microsoft 365 관리자에게 사용 가능하도록 요청하세요. [설치 및 연결 가이드](https://learn.microsoft.com/en-us/power-platform/admin/power-platform-admin-cowork)에서 설정을 확인할 수 있습니다.

## 크레딧 요약을 요청하고 차트 만들기

데모 테넌트에서 다음처럼 간단한 질문으로 시작했습니다.

> 지금까지 Power Platform에서 환경별로 몇 개의 크레딧을 사용했나요?

Cowork는 요약과 함께 각 환경의 소비량, 할당된 크레딧, 스냅샷 날짜가 포함된 표를 반환했습니다. Cowork에서 요청하면 플러그인의 데이터 액세스 요청을 검토하고 승인하세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-cowork-credit-analysis/credit-consumption-summary.png' | relative_url }}" alt="Power Platform 크레딧 소비량 질문에 요약과 환경별 표를 제공하는 Cowork" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>평이한 언어로 질문하면 크레딧 소비량을 환경별로 분석합니다. 표시된 데이터는 데모 테넌트에서 가져왔습니다.</figcaption>
</figure>

그다음에는 이렇게 요청했습니다.

> 차트를 만들어 주세요.

Cowork는 대화에 이미 포함된 결과를 사용해 시각적 비교를 만들었습니다. 소비량이 집중된 곳을 파악하거나 결과를 다른 사람과 공유할 때 유용한 다음 단계입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-cowork-credit-analysis/credit-consumption-chart.png' | relative_url }}" alt="Make a chart 요청 후 데모 테넌트의 크레딧 소비량 표를 가로 막대 차트로 변환한 Cowork" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>후속 요청으로 같은 데모 데이터를 직접 내보내고 재구성하지 않고도 차트로 만들 수 있습니다.</figcaption>
</figure>

이 두 가지 요청만 가능한 것은 아닙니다. 특정 환경을 요청하거나 다른 시각화를 요청하고 보고 기간을 좁힐 수도 있습니다. 날짜를 명확히 지정하세요. 위 예제는 **누적 스냅샷**이지 주간 소비량 보고서가 아닙니다. "지금까지"가 이번 달을 의미한다고 가정하지 말고 Cowork에 보고 기간과 데이터 최신 시점을 확인하도록 요청하세요.

살펴볼 환경을 찾았다면 [Copilot Studio 소비량 제어 가이드](https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/)에서 할당량과 제한을 적용하는 방법을 확인할 수 있습니다.

## 매주 반복하기

Cowork에 이 작업을 반복하도록 요청할 수도 있습니다. [예약된 프롬프트](https://support.microsoft.com/en-us/microsoft-365-copilot/cowork-manage-tasks-schedule-prompts)는 반복 작업을 지원하며, 일정을 활성화하기 전에 승인을 받습니다. 예를 들면 다음과 같습니다.

> 매주 월요일 오전 9시에 직전 완료된 주의 환경별 Power Platform Copilot 크레딧 소비량 보고서를 준비해 주세요. 차트, 보고 날짜, 데이터 최신 시점을 포함해 주세요. 이메일 전송이 가능하면 저에게 보내고, 그렇지 않다면 어떤 연결이나 승인이 필요한지 알려 주세요.

승인 전에 제안된 일정, 시간대 및 전송 설정을 확인하세요. 이메일 전송은 Cowork 설정에서 사용할 수 있는 도구, 권한 및 승인에 따라 달라집니다. Power Platform Admin 플러그인은 관리 인사이트를 제공하지만 이메일 기능을 제공하지는 않습니다.

팀의 Cowork 액세스를 설정하려면 [Work IQ 라이선스 및 제어 가이드](https://microsoft.github.io/mcscatblog/posts/work-iq-context-layer-you-already-have/)에서도 Cowork 액세스 제어를 확인할 수 있습니다.

어떤 질문부터 하시겠어요? 크레딧 분석, 환경 인벤토리, 아니면 주간 거버넌스 브리핑인가요?
