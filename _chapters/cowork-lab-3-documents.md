---
layout: chapter
date: 2026-09-05
title: "Step 3 — 오후, 20페이지 계약서에서 독소조항 찾아내기"
short_title: "Step 3. 문서 심층 분석"
description: "RFP 독소조항 탐지, 제안서 덱 초안, 계약 SLA 평문화. 문서 뒤쪽에 숨긴 조항과 문서 간 충돌을 Cowork가 스스로 찾아냅니다."
order: 904
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "RFP 분석", "계약 검토", "문서 생성", "실습"]
---

<div class="info-box note" markdown="1">

**▶ 배우는 것** — 문서를 **끝까지** 읽는다는 것의 의미. 그리고 **다른 폴더에 있는 두 숫자의 충돌**을 스스로 연결하는 능력.
</div>

**오후.** 문서 작업 두 건이 밀려 있습니다.

1. **Halcyon Energy RFP** — EUR 2.6M, 마감 D-18. 20페이지를 아직 못 읽었습니다.
2. **Kestrel Logistics 계약 갱신** — 법무 검토본을 딜리버리 팀이 읽을 수 있게 풀어야 합니다.

---

## 3-1. RFP 독소조항 먼저 찾기

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 6 · 핵심</span>

### 📌 어떤 상황인가

입찰 문서 20페이지, 조항 §1~§14. RFP 검토에서 가장 위험한 실수는 **앞부분만 읽고 제안에 들어가는 것**입니다. 독소조항은 항상 뒤쪽에 있습니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>불리한 조항 <strong>표 하나</strong> — 조항 번호 · 내용 · 왜 위험한가</dd>

<dt>💡 효율화 포인트</dt>
<dd>사람이 20페이지 법률 문서에서 독소조항을 추리면 <strong>2~3시간</strong>이고, 집중력이 떨어지는 후반부를 놓칩니다. Cowork는 <strong>균일한 주의력</strong>으로 끝까지 읽습니다.</dd>

<dt>⚠️ 확인할 것</dt>
<dd><strong>§9.4와 §12.2</strong>가 지목되는지 보세요. 문서 13p·18p에 <strong>일부러 묻어두었습니다.</strong></dd>
</dl>

</div>

<div class="info-box tip" markdown="1">

**6개 항목을 한 번에 요구하지 않는 이유** — 개요·일정·배점·조항·레퍼런스·서류를 한꺼번에 시키면 문서를 여섯 번 훑습니다. **가장 중요한 것 하나부터** 받고 필요한 것만 이어서 물어보세요.
</div>

<div class="prompt-box" markdown="1">

~~~text
SharePoint 01_RFP 폴더의 Halcyon Energy RFP에서 우리에게 불리한 조항만 찾아줘.
문서 뒤쪽까지 다 확인하고, 조항 번호 / 내용 / 왜 위험한지 3개 컬럼 표로만 답해줘.
파일은 만들지 마.
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인 — 이 단계의 하이라이트**

| 조항 | 내용 | 왜 독소조항인가 |
|---|---|---|
| **§9.4** 책임 제한 | 간접·결과적 손해에 대한 공급자 책임 **무제한**, 총액 상한 없음 | 계약은 EUR 2.6M인데 손해배상은 무한대 |
| **§12.2** 소스코드 에스크로 | SLA **2개월 연속 미달** 시 소스코드 릴리스 | 파산·사업포기와 동일선상에 SLA 미달을 놓음 |

두 조항은 20페이지 문서의 **13p와 18p**에 있습니다. 요약문에도 앞부분에도 없습니다. 앞 5페이지만 읽는 도구는 못 찾습니다.

</div>

<div class="info-box warning" markdown="1">

**배점표 함정도 확인해 보세요** — RFP 본문 §7.1은 *가격 30 / 기술 45 / 레퍼런스 15 / ESG 10*, 별도 파일 `HAL_EvaluationCriteria.xlsx`는 *가격 40 / 기술 35 / 레퍼런스 15 / ESG 10* 으로 **다릅니다.**

의도한 함정입니다. 이렇게 물어보세요 — *"RFP 본문 배점과 배점표 파일 배점이 같아?"* 불일치를 지적하면 **문서 두 개를 대조한 것**입니다.
</div>

<div class="info-box tip" markdown="1">

**나머지가 필요하면 하나씩** — *"이 RFP의 제출 일정과 D-Day만 알려줘"* / *"구비서류 체크리스트만 표로."*
</div>

---

## 3-2. 제안서 덱 초안 만들기

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 7</span>

### 📌 어떤 상황인가

이제 고객 관점의 제안서로 바꿔야 하는데, 브랜드 가이드와 슬라이드 마스터를 지켜야 합니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd><strong>PowerPoint 6장</strong> — 요약 / Pain Point / 제안 / 기대 효과 / 일정 / 레퍼런스</dd>

<dt>💡 효율화 포인트</dt>
<dd>앞 단계 분석이 <strong>세션에 남아 있습니다.</strong> 다시 읽을 필요가 없습니다. 브랜드 가이드를 참조시키면 <strong>양식까지 맞춘 초안</strong>이 나옵니다.</dd>

<dt>⚠️ 확인할 것</dt>
<dd><strong>네이비(#1B3A5C)·앰버(#F2A900)</strong>를 쓰는지, 금지된 <strong>그라디언트·3D 차트</strong>가 없는지 보세요.</dd>
</dl>

</div>

<div class="info-box tip" markdown="1">

**장수를 줄이면 시간이 줄어듭니다** — 12~15장은 몇 분이 걸립니다. 6장이면 골격과 디자인 적용 여부를 확인하기에 충분하고, 마음에 들면 *"같은 스타일로 상세 버전 늘려줘"* 하면 됩니다.
</div>

<div class="prompt-box" markdown="1">

~~~text
방금 분석 결과와 05_Templates의 Aurora 브랜드 가이드를 참고해서
Halcyon Energy 제안서 초안을 PPT 6장으로 만들어줘.
요약 / Pain Point / 제안 / 기대 효과 / 일정 / 레퍼런스 한 장씩. 텍스트는 슬라이드당 5줄 이내.
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인**

- 슬라이드 **6장**이 생성되었는가
- 브랜드 색상이 적용되었는가
- 앞에서 찾은 **독소조항이 반영**되었는가 (협상 항목으로)

</div>

---

## 3-3. 계약서 SLA 조항 평문화

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 8 · 핵심</span>

### 📌 어떤 상황인가

Kestrel Logistics 계약(연 USD 890,000) 갱신 중입니다. **딜리버리 팀은 법률 문장을 읽지 않습니다.** 누군가 번역해야 합니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>채팅 안의 <strong>페널티 표</strong>와 <strong>위반 위험 조항 표시</strong></dd>

<dt>💡 효율화 포인트</dt>
<dd>진짜 일은 번역이 아니라 <strong>대조</strong>입니다. 계약이 요구하는 수치와 <strong>실제 실적</strong>을 비교해야 하는데, 이 둘은 <strong>다른 폴더의 다른 문서</strong>에 있습니다.</dd>

<dt>⚠️ 확인할 것</dt>
<dd><strong>99.9%와 99.82%의 충돌</strong>을 스스로 발견하는지 보세요. 프롬프트에는 이 숫자가 없습니다.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
02_Contracts의 Kestrel Logistics MSA 갱신본에서 SLA 페널티 구조만 평이한 말로 표로 정리해줘.
그리고 우리 실제 운영 실적과 비교해서 지금 위반 위험이 있는 조항이 있으면 표시해줘.
Word 문서는 만들지 말고 채팅으로 답해줘.
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인 — 두 번째 하이라이트**

**① SLA 충돌**

| 어디에 | 무슨 숫자 |
|---|---|
| `02_Contracts/KES_SLA_Appendix_A.docx` | 가용성 **99.9%** 약속, 미달 시 월 요금 **15%** 크레딧 |
| `03_Project_Northstar/NS_StatusReport_W-1.docx` | 분기 실적 가용성 **99.82%** |

**99.82% < 99.9%** — 이미 위반입니다. 두 숫자는 **다른 폴더, 다른 문서**에 있고 서로를 언급하지 않습니다.

**② 통보 시한 모순**

| 어디에 | 무슨 약속 |
|---|---|
| `KES_MSA_Renewal_v3.docx` §11.3 | 고객에게 **24시간** 내 침해 통보 |
| `KES_VendorRisk_CobaltCloud.docx` | 하청 Cobalt Cloud는 우리에게 **72시간** 내 통보 |

하청이 72시간 뒤 알려주는데 24시간 안에 고객에게 알릴 방법은 없습니다. **물리적으로 불가능한 약속**입니다.

②가 안 나왔다면 — *"개인정보 침해 통보 시한도 하청 계약과 비교해줘."*

</div>

---

## 이 단계가 보여주는 것

<div class="info-box tip" markdown="1">

**주의력이 균일하다** — 사람은 20페이지의 18페이지를 1페이지만큼 집중해 읽지 못합니다. 오후 4시의 계약 검토는 오전 10시와 품질이 다릅니다. Cowork는 그 차이가 없습니다.

그리고 사람은 두 문서를 모두 기억해야 비교할 생각을 합니다. Cowork는 둘 다 열어놓고 봅니다.
</div>

---

## 이 단계에서 확인한 것

- ✅ 20페이지 문서를 **끝까지** 읽고 뒤쪽 독소조항을 찾는다
- ✅ **두 문서의 배점 불일치**를 대조로 발견한다
- ✅ **다른 폴더의 두 숫자**를 연결해 계약 위반을 지적한다
- ✅ 분석 결과를 **이어받아** 다른 형식(PPT)으로 재가공한다

**[Step 4 — 장애 대응, 채널 한 줄에서 원인 찾기]({{ '/chapters/cowork-lab-4-incident/' | relative_url }})** 로 이동하세요.
