---
layout: chapter
date: 2026-09-05
title: "Step 2 — 미팅 30분 전, 여러 소스로 브리핑 만들기"
short_title: "Step 2. 미팅 브리핑"
description: "최대 고객사와의 분기 리뷰가 30분 뒤. 메일·회의록·상태보고·Teams를 한 번에 종합한 짧은 브리핑을 만듭니다."
order: 903
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "미팅 준비", "교차 조회", "실습"]
---

<div class="info-box note" markdown="1">

**▶ 배우는 것** — Cowork가 **여러 저장소**를 읽고 하나로 조립합니다. "에이전트답다"는 느낌이 처음 오는 지점입니다.
</div>

**13:30.** 30분 뒤 **Meridian Bank FY26 Q3 분기 리뷰(QBR)** 입니다. 최대 매출처이고, Project Northstar(USD 4.2M)가 진행 중이며, **6일 전 장애가 있었습니다.**

---

## 사람이 직접 하면

| 봐야 할 것 | 어디에 | 소요 |
|---|---|---|
| 참석자·안건 | 캘린더 초대 | 2분 |
| 최근 대화 | 메일 3스레드 11통 | 15분 |
| 지난 회의 약속 | SharePoint 회의록 | 8분 |
| 프로젝트 상태 | SharePoint 상태보고 | 8분 |
| 미이행 커밋먼트 | SharePoint 목록 | 5분 |
| 내부 논의 | Teams 채널 22건 | 12분 |

**합계 50분.** 남은 시간은 30분. 그래서 보통 메일만 훑고 들어가고, **지난 회의 약속을 잊은 채** 지적당합니다.

---

## 2-1. 종합 브리핑 생성

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 4 · 핵심</span>

### 📌 어떤 상황인가

30분 안에 여러 소스를 읽고, 무엇을 먼저 말할지 정해야 합니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>채팅 안의 <strong>짧은 브리핑</strong> — 대화 포인트 3가지 · 미이행 약속 · 리스크 1가지</dd>

<dt>💡 효율화 포인트</dt>
<dd>핵심은 속도가 아니라 <strong>누락 방지</strong>입니다. 사람은 시간이 없으면 소스를 버립니다. 특히 <strong>지난 회의의 미이행 약속</strong>처럼 아무도 다시 안 보는 문서에서 건져 올리는 항목이 회의의 성패를 가릅니다.</dd>

<dt>⚠️ 확인할 것</dt>
<dd><strong>8월 회의에서 고객이 요청했지만 미이행인 항목</strong>이 들어 있는지 보세요. 그게 정답입니다.</dd>
</dl>

</div>

<div class="info-box tip" markdown="1">

**HTML 파일로 만들지 않는 이유** — 문서 생성이 이 시나리오에서 가장 오래 걸리는 단계입니다. 브리핑은 채팅으로 받아 읽는 편이 훨씬 빠르고, 데모에서도 결과가 바로 보입니다.
</div>

<div class="prompt-box" markdown="1">

~~~text
오늘 14시 Meridian Bank 분기 리뷰 브리핑을 채팅으로 짧게 만들어줘.
최근 메일과 가장 최근 회의록, 오픈 액션 아이템만 보면 돼.
① 대화 시작 포인트 3가지 ② 아직 이행 안 된 약속 ③ 리스크 1가지.
각 항목 한두 줄이면 충분해. 파일은 만들지 마.
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인**

- 참석자 **Helena Vargas**(Head of Infrastructure), **Rajiv Menon**(IT Operations Manager)
- 배포 진척 **1,870 / 3,200 (58%)**
- 6일 전 **INC-4471 장애** 언급, 사후 보고서 미제출
- ⭐ **미이행 약속** — *"다운타임 회피 효과를 EUR로 환산해 달라는 8월 요청에 아직 회신 없음"*

**⭐ 항목이 하이라이트입니다.** 이 사실은 8월 회의록에 "Open" 상태로만 적혀 있습니다. 메일에도 상태보고서에도 없습니다. 집어냈다면 **회의록을 실제로 열어본 것**입니다.

</div>

<div class="info-box tip" markdown="1">

**예상 질문이 필요하면** — *"이 미팅에서 고객이 물을 만한 질문 5개만."* 처음부터 10개를 요구하면 그만큼 느려집니다.
</div>

---

## 2-2. 상사에게 3줄로 전달하기

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 5</span>

### 📌 어떤 상황인가

VP Sales Lena Hoffmann이 배석합니다. 그녀는 브리핑 전문이 아니라 **"알아야 할 3줄"** 을 원합니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>경영진용 <strong>3줄 + 리스크 1가지</strong></dd>

<dt>💡 효율화 포인트</dt>
<dd>같은 정보를 <strong>수신자에 따라 다시 쓰는</strong> 일은 시간을 많이 씁니다. Cowork는 브리핑을 세션에 들고 있으므로 다시 읽지 않고 <strong>관점만 바꿔</strong> 씁니다.</dd>

<dt>⚠️ 확인할 것</dt>
<dd>경영진용은 <strong>숫자와 리스크</strong> 중심이어야 합니다.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
방금 브리핑을 VP Sales Lena Hoffmann용으로 3줄로 줄여줘.
오늘 결정이 필요한 것 1개, 리스크 1개만 덧붙여줘. 메일은 아직 만들지 마.
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인**

- 전문이 아니라 **압축된 3줄**인가
- USD 4.2M, 58% 같은 **경영진이 볼 숫자**가 들어갔는가
- 실무 디테일이 빠졌는가

</div>

<div class="info-box tip" markdown="1">

**메일로 보내려면** — *"위 내용 그대로 Lena에게 보낼 메일 초안으로 만들어줘. 발송은 하지 말고."*
</div>

---

## 왜 이 단계가 중요한가

<div class="info-box tip" markdown="1">

**"어느 소스를 봐야 하는지"를 스스로 정한다** — 프롬프트에 *"회의록 파일을 열어봐"* 라는 말은 없습니다. "가장 최근 회의록"이라고만 했습니다. Cowork가 **SharePoint에서 찾아 열고 미이행 항목을 골라낸 것**입니다.
</div>

검색은 여러분이 찾을 곳을 알아야 하고, 에이전트는 스스로 찾습니다.

---

## 이 단계에서 확인한 것

- ✅ **여러 저장소**를 한 번에 종합한다
- ✅ 어느 파일을 열지 **스스로 판단**한다
- ✅ 아무도 안 보는 문서에서 **미이행 약속을 건져 올린다**
- ✅ 같은 정보를 **수신자에 맞춰 다시 쓴다**

**[Step 3 — 오후, 문서 더미와 씨름하기]({{ '/chapters/cowork-lab-3-documents/' | relative_url }})** 로 이동하세요.
