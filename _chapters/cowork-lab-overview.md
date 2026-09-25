---
layout: chapter
date: 2026-09-05
title: "Cowork 실습 — Aurora Dynamics 하루 따라가기"
short_title: "Cowork 실습 (샘플 데이터)"
description: "가상 회사 Aurora Dynamics의 샘플 데이터로 Copilot Cowork를 체험하는 7단계 실습. 프롬프트는 버튼 하나로 복사해 바로 붙여넣습니다."
order: 20
category: cowork
parent: "cowork-lab"
is_parent: true
tags: ["Copilot Cowork", "핸즈온", "샘플 데이터", "실습 가이드"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — 가상 회사 **Aurora Dynamics**의 메일·일정·Teams·문서 30종을 테넌트에 심고, 영업 담당자 **Ava Nakamura의 하루**를 따라가며 Cowork에게 일을 위임해 봅니다.
</div>

---

## 이 실습이 다른 이유

데이터를 **일부러 흩어놓았습니다.** 답을 찾으려면 Cowork가 메일·Teams·SharePoint를 각각 읽고 스스로 연결해야 합니다.

| 심어둔 사실 | 어디에만 있는가 | 드러나는 단계 |
|---|---|---|
| 장애의 진짜 원인 | Teams 워룸 대화 **한 줄** | Step 4 |
| 계약 독소조항 2건 | RFP **13p · 18p** | Step 3 |
| 약속 SLA와 실적의 충돌 | **다른 폴더의 두 문서** | Step 3 |
| 일정 이중 예약 | 캘린더 2건 | Step 5 |

앞부분만 훑어서는 못 찾습니다. **Cowork가 이걸 집어내는 순간**이 하이라이트입니다.

---

## 가상 세계 설정

<div class="info-box warning" markdown="1">

**모두 허구입니다** — 회사·인물·사건·숫자는 전부 만든 것입니다. 외부 도메인은 예약 TLD(`.example`)를 씁니다.
</div>

**Aurora Dynamics** — 싱가포르 본사의 산업용 IoT 예지보전 SaaS 기업(1,240명). 주력 제품 **Aurora Sentinel**.

| 역할 | 인물 | 쓸모 |
|---|---|---|
| **주인공** | **Ava Nakamura** — Enterprise AE | 로그인 계정. 모든 데이터의 주인 |
| 상사 | Lena Hoffmann — VP Sales | 경영진 보고 |
| 기술 | Marcus Bello — SE | RFP 기술 파트 |
| 딜리버리 | Priya Raman — Delivery Manager | 프로젝트 리스크 |
| 지원 | Tom Okafor — Incident Commander | 장애 대응 |
| 법무 | Noah Lindqvist — Legal Counsel | 계약 검토 |
| 신규 | Alex Chen — 다음 주 입사 | 온보딩 |

**고객사** — Meridian Bank(최대 매출처) · Halcyon Energy(RFP) · Kestrel Logistics(갱신 협상) · Solstice Retail(갱신 위험)

**진행 중** — Project Northstar(USD 4.2M, 3,200대 중 1,870대) · Halcyon RFP(EUR 2.6M, D-18) · INC-4471 장애(6일 전)

---

## 실습 구성 — Ava의 하루

<p class="steps-note">각 Step은 독립 실행이 가능하지만, 순서대로 하면 앞 산출물이 뒤 재료가 됩니다.</p>

| Step | 시점 | 무엇을 하나 | 소요 |
|---|---|---|---|
| **[Step 0 — 준비]({{ '/chapters/cowork-lab-0-setup/' | relative_url }})** | 실습 전 | 크레딧 할당, 샘플 배포 | 관리자 20분 |
| **[Step 1 — 아침]({{ '/chapters/cowork-lab-1-morning/' | relative_url }})** | 08:30 | 메일 트리아지, 우선순위, 미답장 | 6분 |
| **[Step 2 — 미팅 전]({{ '/chapters/cowork-lab-2-briefing/' | relative_url }})** | 13:30 | 여러 소스 종합 브리핑 | 5분 |
| **[Step 3 — 오후]({{ '/chapters/cowork-lab-3-documents/' | relative_url }})** | 문서 작업 | RFP 분석 → 덱 → 계약 검토 | 12분 |
| **[Step 4 — 장애 대응]({{ '/chapters/cowork-lab-4-incident/' | relative_url }})** | 사후 처리 | 3개 소스 교차조회, 사후 보고 | 10분 |
| **[Step 5 — 주간 정리]({{ '/chapters/cowork-lab-5-weekly/' | relative_url }})** | 금요일 | 일정 정리, 온보딩 | 8분 |
| **[Step 6 — 자동화]({{ '/chapters/cowork-lab-6-automation/' | relative_url }})** | 마무리 | 예약 실행, 트리거, 거버넌스 | 6분 |

**전체 소요** — 준비 제외 약 **45분**. 시간이 없다면 Step 2 · 3 · 4만 해도 핵심은 전달됩니다.

---

## 빠른 결과를 위한 원칙

이 실습의 프롬프트는 **속도 우선**으로 설계했습니다. 데모에서 몇 분씩 기다리지 않게 하는 규칙 4가지입니다.

| 원칙 | 왜 |
|---|---|
| **한 번에 한 가지만** | 요청이 3개면 실행 시간도 3배입니다 |
| **파일보다 채팅 답변** | HTML·PPT·Excel 생성이 가장 오래 걸립니다 |
| **범위를 숫자로 못 박기** | "최근 20통", "핵심 3가지"처럼 상한을 줍니다 |
| **소스를 지목하기** | 폴더·채널을 알려주면 탐색 단계가 사라집니다 |

<div class="info-box tip" markdown="1">

**깊이가 필요하면 이어서 물어보세요** — 각 단계에 *"더 깊게 보려면"* 후속 프롬프트를 함께 실었습니다. 짧게 받아보고, 필요할 때만 확장하는 편이 전체적으로 빠릅니다.
</div>

---

## 실습 진행 방식

각 Step은 같은 형식이 반복됩니다.

1. **📌 시나리오** — 지금 상황
2. **🎯 기대 산출물** — Cowork가 만들 것
3. **💡 효율화 포인트** — 어디서 시간이 줄어드나
4. **💬 프롬프트** — 버튼으로 복사 → 붙여넣기
5. **✅ 확인할 것** — 성공 판단 기준

<div class="info-box tip" markdown="1">

**프롬프트는 복사 버튼을 쓰세요** — 각 프롬프트 아래 **[프롬프트 복사하기]** 버튼을 누르고 Cowork 입력창에 `Ctrl+V` 하면 됩니다.
</div>

---

## 시작 전 확인

<ul class="checklist">
<li><strong>Microsoft 365 Copilot 라이선스</strong>가 있는가</li>
<li>관리자가 <strong>Anthropic 모델을 활성화</strong>했는가</li>
<li>테넌트가 <strong>Microsoft 365 Frontier 프리뷰</strong>에 참여 중인가</li>
<li><strong>PAYG와 크레딧</strong>이 할당되었는가 → <a href="{{ '/chapters/cowork-lab-0-setup/' | relative_url }}">Step 0</a></li>
<li><strong>샘플 데이터</strong>가 SharePoint·OneDrive에 배포되었는가 → <a href="{{ '/chapters/cowork-lab-0-setup/' | relative_url }}">Step 0</a></li>
</ul>

준비가 끝났다면 **[Step 0 — 실습 환경 준비]({{ '/chapters/cowork-lab-0-setup/' | relative_url }})** 로 이동하세요.

---

## 참고 자료

- 📖 [Copilot Cowork 개요 — Microsoft Learn](https://learn.microsoft.com/copilot/microsoft-365/cowork/)
- 📖 [Copilot Cowork 시작하기](https://learn.microsoft.com/copilot/microsoft-365/cowork/get-started)
- 🚀 [Microsoft 365 Copilot Frontier 프로그램](https://adoption.microsoft.com/copilot/frontier-program/)
- 🧩 [Cowork Collective 미션 모음]({{ '/chapters/cowork0-overview/' | relative_url }}) — 더 짧은 단일 시나리오 실습
