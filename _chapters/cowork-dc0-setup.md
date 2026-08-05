---
layout: chapter
date: 2026-08-05
title: "Lab CWRK0 — Copilot Cowork 설정과 확장성"
short_title: "Cowork 개발 랩 (Dev Camp)"
description: "Copilot Cowork가 무엇인지, 테넌트를 어떻게 준비하는지, 그리고 조직에 맞게 Cowork를 확장하는 옵션은 무엇인지 알아봅니다. (Copilot Developer Camp 한국어판)"
order: 10
category: cowork
parent: "cowork-devcamp"
is_parent: true
tags: ["Copilot Cowork", "Work IQ", "확장성"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — Copilot Cowork는 "대화"가 아니라 **실행**을 위해 만들어진 에이전트입니다. 이 랩에서는 Cowork의 동작 모델을 이해하고, 테넌트 사전 요건(라이선스·사용량 기반 과금·Anthropic 하위 처리자)을 구성한 뒤, **스킬(Skills)과 플러그인(Plugins)** 이라는 두 가지 확장 옵션을 비교합니다.
</div>

> 이 글은 Microsoft 공식 [Copilot Developer Camp](https://microsoft.github.io/copilot-camp/pages/copilot-cowork/00-cowork-setup/)의 **Lab CWRK0** 를 한국어로 옮긴 것입니다.

이 랩에서는 Copilot Cowork가 무엇인지, Cowork를 위해 테넌트를 어떻게 준비하는지, 그리고 조직의 필요에 맞게 Cowork를 조정할 수 있는 확장성 옵션에는 어떤 것이 있는지 배웁니다.

큰 그림에서 보면 Cowork는 커뮤니케이션, 일정 작업, 문서 생성, 리서치, 자동화를 아우르는 **다단계 작업을 Microsoft 365 전반에서 오케스트레이션**합니다. Cowork는 Microsoft IQ 플랫폼의 일부인 **Work IQ**를 통해 Microsoft 365와 상호작용합니다. 순수한 Q&A 경험과 달리, Cowork는 사용자가 통제권을 유지한 상태에서 **의도(intent)를 행동(action)으로** 옮깁니다.

<div class="info-box note" markdown="1">

**참고** — Work IQ에 대해 더 알고 싶다면 Copilot Dev Camp의 [Work IQ 랩]({{ '/chapters/m365-3-work-iq-overview/' | relative_url }})을 살펴보세요.
</div>

---

## 실습 1: Copilot Cowork가 무엇인지 이해하기

이 실습에서는 Cowork의 핵심 경험을 살펴보고, 채팅 전용 AI 어시스턴트와 무엇이 다른지 이해합니다.

Copilot Cowork는 **대화가 아니라 실행**을 위해 설계되었습니다. 프롬프트에 답만 하는 대신, Cowork는 목표를 해석하고 → 작업 단위로 분해하고 → 필요한 스킬을 선택한 뒤 → Outlook, Teams, Word, Excel, PowerPoint, 엔터프라이즈 검색 같은 Microsoft 365 워크로드 전반에서 행동을 조율합니다. 운영 모델은 **목표 기반 오케스트레이션(goal-driven orchestration)** 입니다. 사용자는 의도를 제시하고, Cowork는 계획을 세워 실행하며, 사용자는 진행 중인 각 단계를 확인할 수 있습니다.

이 모델의 가장 큰 장점은 **실질적인 생산성 확장**입니다. 평소라면 컨텍스트 전환, 수동 복사/붙여넣기, 반복적인 조율이 필요한 다단계·앱 간 워크플로를 Cowork가 처리합니다. 동시에 민감한 작업에 대해서는 **승인 절차**를 통해 사람이 통제권을 유지합니다. 즉 가시성·거버넌스·신뢰를 잃지 않으면서 더 많은 운영 업무를 위임할 수 있습니다.

조직에 Cowork가 필요한 이유는, 현대의 업무가 도구·메시지·회의·문서로 파편화되어 있는 반면 실행 속도와 일관성은 그 어느 때보다 중요해졌기 때문입니다. Cowork는 기존 Microsoft 365의 보안·ID·규정 준수 경계 안에서 의도를 신뢰할 수 있는 행동으로 바꿔 이 문제를 해결합니다. 이 랩에서는 먼저 기반을 이해하고, 테넌트 사전 요건을 구성한 다음, 비즈니스 프로세스에 맞게 Cowork를 조정하는 확장성 옵션을 살펴봅니다.

<div class="info-box note" markdown="1">

**참고** — 최종 사용자 관점에서 Copilot Cowork를 더 알고 싶다면 Agent Academy의 [Cowork Collective]({{ '/chapters/cowork0-overview/' | relative_url }}) 미션도 함께 보세요.
</div>

### 1단계: Cowork가 할 수 있는 일 살펴보기

[Copilot Cowork 개요](https://learn.microsoft.com/microsoft-365/copilot/cowork/)에 설명된 기능을 확인하세요. 집필 시점 기준 주요 기능은 다음과 같습니다.

- **커뮤니케이션 작업** (메일, Teams 메시지)
- **회의·일정 작업** (예약, 업데이트, 일정 충돌 정리)
- **문서·파일 작업** (Word, Excel, PowerPoint, PDF)
- **리서치 및 엔터프라이즈 검색** (Microsoft 365 데이터 전반)
- **예약된 프롬프트** (반복 자동화)
- 그 외 다수…

이는 [Copilot Cowork: A new way of getting work done](https://www.microsoft.com/microsoft-365/blog/2026/03/09/copilot-cowork-a-new-way-of-getting-work-done/)에서 소개된 제품 비전, 즉 **의도에서 행동으로**라는 방향과 일치합니다.

상호작용 모델 관점에서 Cowork는 일회성 답변을 반환하는 것이 아니라 **일련의 행동을 실행**하도록 설계되었습니다. 커뮤니케이션 초안을 작성해 발송하고, 파일을 만들고, 회의를 조직하며, 메일·채팅·파일·회의의 컨텍스트를 하나의 일관된 실행 계획으로 결합합니다.

가장 큰 이점 중 하나는 **업무의 연속성**입니다. Outlook, Teams, OneDrive, SharePoint, Office 앱을 수동으로 오가는 대신 엔드투엔드 흐름을 Cowork에 위임하고 체크포인트만 감독하면 됩니다. 컨텍스트 전환이 줄고, 사용자는 가치가 높은 의사결정에 집중할 수 있습니다.

Cowork는 **통제권을 사용자에게** 남겨둡니다. 영향도가 큰 작업에 대해서는 실행 전에 멈추고 승인을 요청합니다. 이 패턴은 엔터프라이즈 신뢰에 결정적입니다. 사용자는 의도를 검토하고 승인·거부하며 책임 소재를 유지하면서도 자동화의 이점을 얻습니다.

조직 차원에서 Cowork의 목적은 사람을 대체하는 것이 아니라, **감사 가능하고 정책에 부합하는 자동화**로 실행 역량을 증폭하는 것이며, 스킬과 플러그인으로 확장할 수 있습니다.

---

## 실습 2: Copilot Cowork를 위한 테넌트 준비

이 실습에서는 Cowork를 안전하게 활성화하기 위한 핵심 테넌트 사전 요건을 구성합니다.

### 1단계: 사전 요건 확인

[Copilot Cowork 시작하기](https://learn.microsoft.com/microsoft-365/copilot/cowork/get-started)를 참고해 다음 사전 요건을 확인하세요.

- 실험·학습이 가능한 유효한 Microsoft 365 테넌트 — [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program)으로 만든 개발자 테넌트도 가능
- 일부 설정 관리를 위한 **테넌트 관리자 계정**
- 사용자에게 활성화된 **Microsoft 365 Copilot 라이선스**
- 테넌트에서 **Cowork 사용 가능** 상태
- Cowork에 대한 **사용량 기반 과금(usage-based billing)** 활성화
- 테넌트에서 **Anthropic을 하위 처리자(subprocessor)로 활성화**, 또는 Frontier 테넌트라면 대신 GPT 5.5 선택 가능
- 지원되는 클라이언트/브라우저 접근 (웹, 데스크톱 앱, 모바일)

<div class="info-box warning" markdown="1">

**Anthropic 하위 처리자 요건** — Cowork는 Microsoft 365 Copilot에서 Anthropic 모델을 하위 처리자로 사용합니다. 광범위한 롤아웃 전에 규정 준수·법무 검토 프로세스에 이 요건을 반드시 포함하세요. Frontier 테넌트에서는 대안으로 GPT 5.5를 사용할 수도 있습니다. 지원 모델은 [Copilot Cowork용 모델 선택](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-models) 문서를 참고하세요.
</div>

### 2단계: Copilot Credits와 사용량 기반 과금 구성

Microsoft 365 관리 센터에서 사용량 기반 과금의 비용 관리 화면을 열고, [Copilot Credits 사용량 기반 과금 및 비용 관리](https://learn.microsoft.com/microsoft-365/copilot/usage-based-billing-overview-copilot-credits)를 기준으로 과금 전략을 구성합니다.

최소한 다음을 정의하세요.

| 항목 | 내용 |
|------|------|
| **과금 모드** | 선불 크레딧 / 종량제(pay-as-you-go) / 기존 용량 사용 |
| **Azure 구독 연결** | 대규모 과금을 위한 구독 연결 |
| **지출 정책·한도** | 조직 단위 지출 정책과 상한 |
| **예산 보호 장치** | 알림(alert) 및 하드 캡(hard cap) |

<div class="info-box warning" markdown="1">

**파일럿 우선 권장** — 통제된 파일럿 대상과 엄격한 지출 정책으로 시작하세요. 실제 소비 추이와 비용 유발 요인을 검토한 뒤 점진적으로 확대합니다.
</div>

### 3단계: 파일럿 사용자 할당 및 액세스 검증

파일럿 그룹을 할당하고, 파일럿 사용자에게 Cowork를 열어 다음을 확인하도록 요청하세요.

- 대화를 시작할 수 있는가
- 승인이 필요한 작업을 최소 1건 실행할 수 있는가
- 작업 기록(task history)과 예약된 작업(scheduled tasks)을 볼 수 있는가

사용자가 Cowork에 접근하지 못한다면 **라이선스, 과금 구성, 테넌트 수준 활성화**를 다시 확인하세요.

---

## 실습 3: Copilot Cowork 사용 시작하기

이 실습에서는 제품 화면에서 Cowork를 직접 사용해 실행 모델을 관찰하고, 민감한 작업에 대한 승인 제어를 검증합니다.

### 1단계: Copilot Cowork 시작

[Microsoft 365 Copilot](https://m365.cloud.microsoft)을 열고 상단의 **Chat** 옆 토글에서 **Cowork**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/cowork/cwrk0-01-start.png' | relative_url }}" alt="Cowork 탭이 강조된 사이드바 — Home, New task, Search, Scheduled, Customize">
  <figcaption>상단 <strong>Cowork</strong> 탭(빨간 화살표)과 왼쪽 탐색 메뉴</figcaption>
</figure>

Cowork는 **위임된 실행**을 중심으로 구성되어 있습니다. 원하는 결과를 설명하면 Cowork가 Microsoft 365 전반에서 계획을 세우고 작업을 수행합니다.

왼쪽 탐색에는 다음 핵심 항목이 있습니다.

| 메뉴 | 설명 |
|------|------|
| **New task** | 새 프롬프트로 Cowork 실행을 처음부터 시작 |
| **My tasks** | 이전 작업을 찾아 빠르게 다시 열기 |
| **Scheduled** | 반복·예약된 Cowork 작업 검토 및 관리 |
| **Customize** | 사용 가능한 플러그인과 스킬 관리 |

### 2단계: 실행 모델 관찰하기

Cowork 홈에서 다음과 같은 간단한 프롬프트를 실행해 봅니다.

```text
Draft a status update email for my team based on this week's meetings and save a PDF copy in OneDrive.
```

> 한국어 예시: `이번 주 회의를 바탕으로 팀에 보낼 상태 업데이트 메일 초안을 작성하고, PDF 사본을 OneDrive에 저장해줘.`

<figure class="screenshot">
  <img src="{{ '/assets/image/cowork/cwrk0-02-prompt.png' | relative_url }}" alt="'Where should we start today?' 헤딩과 프롬프트 입력 박스">
  <figcaption>Cowork 홈 화면의 프롬프트 입력 — Ctrl+U 로 이미지·파일 업로드 가능</figcaption>
</figure>

Cowork가 실행되는 동안 **단계별 실행 과정, 로드된 스킬, 민감한 작업(발송·게시) 전의 승인 게이트**를 관찰하세요.

<figure class="screenshot">
  <img src="{{ '/assets/image/cowork/cwrk0-03-execution.png' | relative_url }}" alt="주간 회의 수집 → 메일 초안 작성 → PDF 저장 워크플로가 진행되는 화면">
  <figcaption>오른쪽 <strong>Workspace</strong> 패널에 진행 단계가 순차적으로 표시됩니다</figcaption>
</figure>

작업이 완료되면 실행된 모든 작업과 단계의 요약(recap)을 볼 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/cowork/cwrk0-04-execution-recap.png' | relative_url }}" alt="완료된 작업 요약 — 활동별로 묶인 주간 상태 업데이트 메일과 첨부된 PDF">
  <figcaption>완료 요약 — 메일 초안, 생성된 PDF, 실행된 단계 목록이 함께 표시됩니다</figcaption>
</figure>

보시다시피 Cowork는 여러 작업을 연달아 수행했습니다. 메일 초안을 만들고, PDF를 생성해 OneDrive for Business에 저장했습니다. 이 모든 과정은 **비동기로 실행**되므로 그동안 다른 일을 할 수 있습니다.

### 3단계: 승인 제어 테스트

Cowork에 민감한 작업을 요청해 봅니다.

```text
Schedule a 30-minute project sync with my team tomorrow and send a confirmation message in Teams.
```

> 한국어 예시: `내일 팀과 30분짜리 프로젝트 싱크를 잡고, Teams에 확인 메시지를 보내줘.`

<figure class="screenshot">
  <img src="{{ '/assets/image/cowork/cwrk0-05-approval.png' | relative_url }}" alt="'Project Sync' 제목의 Outlook 회의 초안과 참석자·안건이 표시된 승인 화면">
  <figcaption>발송 직전 승인을 요청하는 회의 초안</figcaption>
</figure>

민감한 작업이 실행되기 전에 Cowork가 **명시적인 승인을 요청**하는지 확인하세요.

---

## 실습 4: Cowork 확장성 옵션 살펴보기

Cowork에 관한 이 랩 시리즈는 **확장성 모델**에 초점을 맞춥니다. 이 실습에서는 주요 확장 옵션을 비교하고, 이미 존재하는 플러그인을 활성화해 봅니다.

### 1단계: Customize 화면 열기

Cowork에서 왼쪽 탐색의 **Customize**를 선택합니다. 두 개의 핵심 탭이 있습니다.

- **Plugins** — 설치됨(Installed), 검색 가능(Discoverable), 공유됨(Shared) 플러그인
- **Skills** — 기본 제공 스킬과 커스텀 스킬

계속하기 전에 다음 비교를 기억해 두세요.

| 구분 | Skills (스킬) | Plugins (플러그인) |
|------|---------------|--------------------|
| **정의** | Cowork가 특정 유형의 작업을 **어떻게 수행할지** 안내하는 작업 지침·행동 패턴 | 기능이나 외부 데이터 원본을 추가하는 **패키지형 통합/커넥터** |
| **언제 쓰나** | 행동과 작업 로직을 **형성**해야 할 때 | 도구·시스템·특수 기능을 **연결**해야 할 때 |

Cowork에는 이미 풍부한 기본 스킬이 포함되어 있습니다 — Word, Excel, PowerPoint, PDF, Email, Scheduling, Calendar Management, Meetings, Daily Briefing, Enterprise Search, Deep Research, Communications, Adaptive Cards 등. 이 스킬들은 대화 컨텍스트에 따라 **Cowork가 자동으로 활성화**하며, 어떤 스킬이 사용되었는지는 사이드 패널의 **Skills** 섹션에서 확인할 수 있습니다.

<div class="info-box note" markdown="1">

**참고** — Cowork 스킬에 대해 더 알고 싶다면 [Cowork skills](https://learn.microsoft.com/microsoft-365/copilot/cowork/use-cowork#cowork-skills) 문서를 참고하세요.
</div>

또한 현재 Cowork에 포함된 Microsoft 플러그인은 다음과 같습니다.

- **Dynamics 365 Customer Service**
- **Dynamics 365 ERP**
- **Dynamics 365 Sales**
- **Fabric IQ**

이 Microsoft 플러그인 외에도 Microsoft 365 App Store에는 이미 폭넓은 서드파티 파트너 플러그인 카탈로그가 있으며 계속 늘어나고 있습니다.

---

## 🎉 축하합니다!

**Lab CWRK0 — Copilot Cowork 설정과 확장성**을 완료했습니다!

다음 랩에서는 Copilot Cowork를 위한 **첫 번째 스킬**을 직접 만들어 봅니다.

👉 [Lab CWRK1 — 첫 번째 Cowork 스킬 만들기]({{ '/chapters/cowork-dc1-skills/' | relative_url }})

---

## 📚 참고 자료

- 📖 [Copilot Cowork 개요 — Microsoft Learn](https://learn.microsoft.com/microsoft-365/copilot/cowork/)
- 📖 [Copilot Cowork 시작하기](https://learn.microsoft.com/microsoft-365/copilot/cowork/get-started)
- 📖 [Copilot Cowork용 모델 선택](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-models)
- 🏕️ [원문: Copilot Developer Camp — Lab CWRK0](https://microsoft.github.io/copilot-camp/pages/copilot-cowork/00-cowork-setup/)
