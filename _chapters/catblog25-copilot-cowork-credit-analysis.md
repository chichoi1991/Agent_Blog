---
layout: "chapter"
title: "Copilot Cowork로 Power Platform 크레딧 사용량 데이터 자세히 살펴보기"
short_title: "Cowork 크레딧 분석"
description: "Power Platform Admin 플러그인으로 환경별 Copilot Credit 사용량을 탐색하고 차트를 만들며 정기 보고서를 예약하는 방법"
order: 25
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/copilot-cowork-credit-analysis/"
source_author: "giorgioughini"
source_published: "2026-11-20"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/copilot-cowork-credit-analysis/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/) (Microsoft Copilot Studio CAT)의 giorgioughini(@giorgioughini) 원문 [Use Copilot Cowork to dig deep into your Power Platform credit consumption data](https://microsoft.github.io/mcscatblog/posts/copilot-cowork-credit-analysis/)(2026-11-20)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-cowork-credit-analysis/header.png' | relative_url }}" alt="관리 센터, Cowork, Power Platform 로고와 함께 Power Platform 사용량을 탐색하는 Copilot Cowork" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

어느 환경에서 Copilot Credits를 소비하고 있나요? 어느 환경을 자세히 살펴봐야 할까요? Power Platform 관리자라면 매번 보고서 프로젝트를 시작하지 않고도 동료에게 공유할 수 있는 답을 얻어야 합니다.

새 [Copilot Credit 사용량 보고서 API (미리 보기)](https://learn.microsoft.com/en-us/power-platform/admin/programmability-tutorial-download-copilot-credit-usage-reports?tabs=power-automate)를 사용하면 Power Platform 관리 센터에서 자격 및 소비량 데이터를 프로그래밍 방식으로 다운로드할 수 있습니다. 통합을 구축하거나 자체 보고 기록을 유지하려는 경우 유용한 출발점입니다.

하지만 조직에서 이미 **Copilot Cowork**를 사용한다면 데이터를 대화형으로 탐색하는 더 간단한 방법이 있습니다. **Power Platform Admin (Preview)** 플러그인을 활성화하고 자연어로 질문하면 됩니다.

## Power Platform Admin 활성화

[Power Platform Admin 플러그인](https://learn.microsoft.com/en-us/power-platform/admin/power-platform-admin-cowork)은 인벤토리, 사용량, 거버넌스, 용량, 라이선스 등 폭넓은 관리 정보를 Cowork에 제공합니다. 크레딧 사용량은 특히 유용한 시작점입니다.

> 플러그인은 현재 미리 보기 상태입니다. 읽기 전용 인사이트와 안내를 제공하며 Power Platform 관리 센터에서 관리 변경을 독립적으로 실행하지는 않습니다.

조직에서 플러그인을 사용할 수 있다면 설정은 간단합니다.

1. Cowork의 **Customize** 아래 플러그인 영역을 열고 **Power Platform Admin (Preview)**을 찾습니다.
2. 플러그인을 열어 활성화합니다.
3. 메시지가 표시되면 **Connect**를 선택하고 **OAuth Connection**을 사용해 **Power Platform for Admins V2** 연결을 완료합니다.

아래 스크린샷에서는 플러그인이 활성화됐고 연결이 준비된 상태를 보여 줍니다. 플러그인 이름은 **Power Platform Admin (Preview)**이고 연결 이름은 **Power Platform for Admins V2**입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-cowork-credit-analysis/power-platform-admin-plugin.png' | relative_url }}" alt="연결된 Power Platform for Admins V2 연결과 인벤토리, 사용량, 거버넌스 스킬이 표시된 Cowork의 Power Platform Admin Preview" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>활성화된 플러그인은 연결된 Power Platform 계정을 통해 관리 인사이트를 제공합니다.</figcaption>
</figure>

Cowork 액세스와 **Power Platform Administrator**, **Dynamics 365 Administrator**, **Global Administrator** 역할 중 하나를 보유한 연결 계정이 필요합니다. 플러그인을 찾을 수 없다면 Microsoft 365 관리자에게 사용 가능 여부를 문의합니다. 설치 및 연결 방법은 [설치 및 연결 가이드](https://learn.microsoft.com/en-us/power-platform/admin/power-platform-admin-cowork)를 확인하세요.

## 크레딧 요약을 요청하고 차트 만들기

데모 테넌트에서 다음처럼 간단한 질문으로 시작했습니다.

> How many credits did I have consumed per environment in Power Platform so far?

Cowork는 환경별 소비량, 할당된 크레딧, 스냅샷 날짜가 있는 요약과 표를 반환했습니다. Cowork가 요청하면 플러그인의 데이터 액세스 요청을 검토하고 승인합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-cowork-credit-analysis/credit-consumption-summary.png' | relative_url }}" alt="Power Platform 크레딧 소비량을 묻는 질문에 요약과 환경별 표로 답하는 Cowork" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>자연어 질문으로 크레딧 사용량 분석을 생성합니다. 표시된 데이터는 모두 데모 테넌트에서 가져왔습니다.</figcaption>
</figure>

그다음에는 이렇게 요청했습니다.

> Make a chart.

Cowork는 대화에 이미 포함된 결과를 바탕으로 시각적 비교를 만들었습니다. 소비량이 집중된 곳을 확인하거나 다른 사람과 결과를 공유할 때 유용한 다음 단계입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-cowork-credit-analysis/credit-consumption-chart.png' | relative_url }}" alt="Make a chart 프롬프트 뒤 데모 테넌트의 크레딧 사용량 표를 가로 막대 차트로 바꾼 Cowork" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>수동으로 내보내고 다시 구성하지 않아도 후속 요청으로 같은 데모 데이터를 차트로 바꿀 수 있습니다.</figcaption>
</figure>

이 두 가지 프롬프트만 사용할 수 있는 것은 아닙니다. 특정 환경을 요청하고 다른 시각화를 만들거나 보고 기간을 좁힐 수 있습니다. 날짜는 명확하게 지정해야 합니다. 위 예는 **누적 스냅샷**이지 주간 소비량 보고서가 아닙니다. "지금까지"라는 말이 이번 달을 뜻한다고 가정하지 말고 Cowork에 보고 기간과 데이터 최신성을 확인하도록 요청하세요.

조사가 필요한 환경을 찾았다면 [Copilot Studio 소비량 제어 가이드](https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/)에서 할당과 제한을 설정하는 방법을 확인할 수 있습니다.

## 매주 반복하기

Cowork에 작업 반복을 요청할 수도 있습니다. [예약 프롬프트](https://support.microsoft.com/en-us/microsoft-365-copilot/cowork-manage-tasks-schedule-prompts)는 반복 작업을 지원하며 일정을 활성화하기 전에 승인을 받습니다. 예를 들면 다음과 같습니다.

> Every Monday at 9 AM, prepare a Power Platform Copilot Credit consumption report by environment for the previous complete week. Include a chart, the reporting dates, and the data freshness. Email it to me if email delivery is available; otherwise, tell me what connection or approval is needed.

승인 전에 제안된 일정, 시간대, 전송 설정을 검토합니다. 이메일 전송은 Cowork 설정에서 사용할 수 있는 도구, 권한, 승인에 따라 달라집니다. Power Platform Admin 플러그인은 관리 인사이트를 제공하지만 이메일 기능은 제공하지 않습니다.

팀의 Cowork 액세스를 설정하려면 [Work IQ 라이선스 및 제어 가이드](https://microsoft.github.io/mcscatblog/posts/work-iq-context-layer-you-already-have/)도 참고하세요.

가장 먼저 무엇을 질문하시겠어요? 크레딧 분석, 환경 인벤토리, 아니면 주간 거버넌스 브리핑인가요?
