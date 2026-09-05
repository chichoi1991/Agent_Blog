---
layout: chapter
date: 2026-09-05
title: "Cowork 실습 — Aurora Dynamics 하루 따라가기"
short_title: "Cowork 실습 (샘플 데이터)"
description: "가상 회사 Aurora Dynamics의 샘플 데이터로 Copilot Cowork를 처음부터 끝까지 체험하는 7단계 실습. 프롬프트는 버튼 하나로 복사해 바로 붙여넣을 수 있습니다."
order: 20
category: cowork
parent: "cowork-lab"
is_parent: true
tags: ["Copilot Cowork", "핸즈온", "샘플 데이터", "실습 가이드"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — 실제 회사 데이터 없이도 Copilot Cowork의 진가를 보여줄 수 있습니다. 이 실습은 **Aurora Dynamics**라는 가상 회사의 메일·일정·Teams·문서 30종을 테넌트에 심어두고, 영업 담당자 **Ava Nakamura의 하루**를 따라가며 Cowork에게 실제 업무를 위임해 봅니다.
</div>

---

## 이 실습이 다른 이유

일반적인 데모는 "파일 하나 올리고 요약해줘"에서 끝납니다. 그건 요약 도구지 에이전트가 아닙니다.

이 실습의 데이터는 **일부러 흩어놓았습니다.** 답을 찾으려면 Cowork가 메일과 Teams 채널과 SharePoint 문서를 **각각 읽고 스스로 연결**해야 합니다. 예를 들어 이런 것들이 심어져 있습니다.

| 심어둔 사실 | 어디에만 있는가 | 어느 단계에서 드러나는가 |
|---|---|---|
| 장애의 진짜 원인 | Teams 워룸 대화 **한 줄** | Step 4 |
| 계약의 독소조항 2건 | RFP 문서 **13페이지 · 18페이지** | Step 3 |
| 약속한 SLA와 실제 실적의 충돌 | **서로 다른 폴더의 두 문서** | Step 3 |
| 일정 이중 예약 | 캘린더 2건 | Step 5 |

앞부분만 훑거나 파일 하나만 읽어서는 절대 못 찾습니다. **Cowork가 이걸 스스로 집어내는 순간**이 이 실습의 하이라이트입니다.

---

## 가상 세계 설정

<div class="info-box warning" markdown="1">

**모두 허구입니다** — 여기 등장하는 회사·인물·사건·숫자는 전부 만들어낸 것입니다. 실제 고객사명이나 내부 데이터는 한 글자도 들어 있지 않습니다. 외부 도메인은 RFC 2606 예약 TLD(`.example`)를 사용합니다.
</div>

**Aurora Dynamics** — 싱가포르 본사의 산업용 IoT 예지보전 SaaS 기업 (1,240명)
주력 제품 **Aurora Sentinel** · 슬로건 *"See the failure before it happens."*

| 역할 | 인물 | 실습에서의 쓸모 |
|---|---|---|
| **주인공** | **Ava Nakamura** — Enterprise Account Executive | 여러분이 로그인하는 계정. 모든 메일·일정·Teams의 주인 |
| 상사 | Lena Hoffmann — VP Sales | 경영진 보고 요청자 |
| 기술 | Marcus Bello — Solution Engineer | RFP 기술 파트 |
| 딜리버리 | Priya Raman — Delivery Manager | 프로젝트 상태·리스크 |
| 지원 | Tom Okafor — Incident Commander | 장애 대응 |
| 법무 | Noah Lindqvist — Legal Counsel | 계약 검토 |
| 신규 입사자 | Alex Chen — 다음 주 월요일 입사 | 온보딩 시나리오 |

**고객사** — Meridian Bank(최대 매출처, 배포 진행 중) · Halcyon Energy(RFP 발주) · Kestrel Logistics(계약 갱신 협상) · Solstice Retail(갱신 위험)

**진행 중인 일** — Project Northstar(USD 4.2M, 14개국 3,200대 중 1,870대 완료) · Halcyon RFP(EUR 2.6M, 마감 D-18) · INC-4471 장애(6일 전 발생, 사후 보고 필요)

---

## 실습 구성 — Ava의 하루

<p class="steps-note">각 Step은 독립적으로도 진행할 수 있지만, 순서대로 하면 앞 단계의 산출물이 뒤 단계의 재료가 됩니다.</p>

| Step | 시점 | 무엇을 하나 | 소요 |
|---|---|---|---|
| **[Step 0 — 준비]({{ '/chapters/cowork-lab-0-setup/' | relative_url }})** | 실습 전 | 크레딧 할당, 샘플 파일 배포 | 관리자 20분 |
| **[Step 1 — 아침 08:30]({{ '/chapters/cowork-lab-1-morning/' | relative_url }})** | 출근 직후 | 메일 트리아지, 우선순위, 미답장 추적 | 10분 |
| **[Step 2 — 미팅 전 13:30]({{ '/chapters/cowork-lab-2-briefing/' | relative_url }})** | QBR 30분 전 | 6개 소스를 종합한 미팅 브리핑 | 8분 |
| **[Step 3 — 오후]({{ '/chapters/cowork-lab-3-documents/' | relative_url }})** | 문서 작업 | RFP 심층 분석 → 제안서 덱 → 계약 검토 | 20분 |
| **[Step 4 — 장애 대응]({{ '/chapters/cowork-lab-4-incident/' | relative_url }})** | 사후 처리 | 3개 소스 교차조회, 커뮤니케이션 패키지 | 15분 |
| **[Step 5 — 주간 정리]({{ '/chapters/cowork-lab-5-weekly/' | relative_url }})** | 금요일 | 일정 정리, 신규 입사자 온보딩 | 12분 |
| **[Step 6 — 자동화]({{ '/chapters/cowork-lab-6-automation/' | relative_url }})** | 마무리 | 예약 실행, 이벤트 트리거, 거버넌스 | 8분 |

**전체 소요** — 준비 제외 약 **75분**. 시간이 없다면 Step 2 · 3 · 4만 해도 핵심은 전달됩니다.

---

## 실습 진행 방식

각 Step은 다음 형식이 반복됩니다.

1. **📌 시나리오** — 지금 어떤 상황인지, 사람이 직접 하면 얼마나 걸리는지
2. **🎯 기대 산출물** — Cowork가 무엇을 만들어낼 것인지
3. **💡 효율화 포인트** — 어디서 시간이 절약되고, 왜 사람 혼자서는 어려운지
4. **💬 프롬프트** — 큰 버튼을 눌러 복사 → Cowork에 붙여넣기
5. **✅ 확인할 것** — 결과가 제대로 나왔는지 판단하는 기준

<div class="info-box tip" markdown="1">

**프롬프트는 복사 버튼을 쓰세요** — 각 프롬프트 아래에 **[프롬프트 복사하기]** 버튼이 있습니다. 클릭하면 클립보드에 복사되고, Cowork 입력창에서 `Ctrl+V`로 붙여넣으면 됩니다. 직접 타이핑할 필요가 없습니다.
</div>

---

## 시작 전 확인

<ul class="checklist">
<li><strong>Microsoft 365 Copilot 라이선스</strong>가 있는가</li>
<li>관리자가 <strong>Anthropic 모델을 활성화</strong>했는가 (Cowork는 이 모델에 의존합니다)</li>
<li>테넌트가 <strong>Microsoft 365 Frontier 프리뷰</strong>에 참여 중인가</li>
<li>관리자가 <strong>사용량 기반 과금(PAYG)과 크레딧</strong>을 할당했는가 → <a href="{{ '/chapters/cowork-lab-0-setup/' | relative_url }}">Step 0</a></li>
<li><strong>샘플 데이터</strong>가 SharePoint와 OneDrive에 배포되었는가 → <a href="{{ '/chapters/cowork-lab-0-setup/' | relative_url }}">Step 0</a></li>
</ul>

준비가 끝났다면 **[Step 0 — 실습 환경 준비]({{ '/chapters/cowork-lab-0-setup/' | relative_url }})** 로 이동하세요.

---

## 참고 자료

- 📖 [Copilot Cowork 개요 — Microsoft Learn](https://learn.microsoft.com/copilot/microsoft-365/cowork/)
- 📖 [Copilot Cowork 시작하기](https://learn.microsoft.com/copilot/microsoft-365/cowork/get-started)
- 🚀 [Microsoft 365 Copilot Frontier 프로그램](https://adoption.microsoft.com/copilot/frontier-program/)
- 🧩 [Cowork Collective 미션 모음]({{ '/chapters/cowork0-overview/' | relative_url }}) — 더 짧은 단일 시나리오 실습
