---
layout: chapter
date: 2026-09-05
title: "Step 5 — 금요일, 일정 정리와 신규 입사자 맞이"
short_title: "Step 5. 주간 정리·온보딩"
description: "거절해도 되는 회의 찾기, 이중 예약 탐지, 다음 주 입사자를 위한 온보딩 준비."
order: 906
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "캘린더 관리", "온보딩", "실습"]
---

<div class="info-box note" markdown="1">

**▶ 배우는 것** — Cowork가 **일정을 읽고 판단**하고 **여러 사람의 시간을 맞춰 회의를 잡습니다.** 지금까지가 읽고 쓰기였다면 여기부터는 스케줄링입니다.
</div>

**금요일 오후.** 다음 주 일정이 회의로 꽉 찼고, **월요일에 신규 입사자 Alex Chen이 옵니다.**

---

## 5-1. 거절해도 되는 회의 찾아내기

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 12</span>

### 📌 어떤 상황인가

앞으로 2주 회의가 **34건**입니다. 안건이 없거나, 참석자가 18명이거나, 내 역할과 무관한 것이 섞여 있습니다. 문제는 **하나씩 열어봐야 판단이 된다**는 것입니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>거절 후보 <strong>목록 표</strong>(사유 포함) · <strong>일정 충돌 표시</strong></dd>

<dt>💡 효율화 포인트</dt>
<dd>회의 정리는 <strong>다들 필요하다 하지만 아무도 안 하는</strong> 일입니다. 34건을 열어보는 데 30분이 들고, 거절 메일 쓰기가 껄끄러워 결국 참석합니다.</dd>

<dt>⚠️ 확인할 것</dt>
<dd><strong>이중 예약 1건</strong>을 심어두었습니다. 찾아내는지 보세요.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
다음 주 내 일정만 보고 거절해도 되는 회의를 표로 알려줘.
기준: 안건 없음 / 참석자 과다 / 내 역할과 무관. 일정 충돌도 표시해줘.
포커스 타임은 건드리지 말고, 메일 초안은 아직 만들지 마.
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인**

- ⭐ **이중 예약** — Northstar 스티어링과 Halcyon 내부 리뷰가 **같은 시간대**
- 안건 없는 반복 회의 **3종**(18명 주간 Ops Sync, 격주 툴링 리뷰, 주간 All-Hands 재방송)
- **포커스 타임 블록**을 건드리지 않았는가

</div>

<div class="info-box tip" markdown="1">

**거절문이 필요하면** — *"위 목록 중 Ops Sync 하나만 정중한 거절 메일 초안. 회의록으로 팔로우업하겠다는 말 넣어줘."* 3~5건을 한꺼번에 쓰는 것보다 빠릅니다.
</div>

---

## 5-2. 신규 입사자 온보딩

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 13</span>

### 📌 어떤 상황인가

**Alex Chen**이 월요일에 Solution Engineer로 입사합니다. 필독 문서, 인사 미팅, 환영 메시지, 30/60/90일 계획이 필요합니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>필독 문서 목록 + <strong>30/60/90일 계획 뼈대</strong></dd>

<dt>💡 효율화 포인트</dt>
<dd>30/60/90 계획은 <strong>직무기술서 기반</strong>이라 형식적이지 않습니다. 대부분은 시간이 없어 대충 만듭니다.</dd>

<dt>⚠️ 확인할 것</dt>
<dd>직무기술서의 <strong>책임 6개와 90일 기대치 3개</strong>가 반영됐는지 보세요.</dd>
</dl>

</div>

<div class="info-box tip" markdown="1">

**다섯 가지를 한 번에 시키지 마세요** — 목록·미팅 6건·환영 메시지·소개글·계획서를 동시에 요구하면 캘린더 조회와 문서 생성이 겹쳐 가장 오래 걸립니다. **읽기 작업 먼저, 쓰기 작업 나중**입니다.
</div>

<div class="prompt-box" markdown="1">

~~~text
월요일 입사하는 Alex Chen(Solution Engineer)용으로 두 가지만 채팅으로 정리해줘.
① 07_Onboarding과 06_Policies 기준 필독 문서 목록 (Day 1에 읽을 것 표시)
② 직무기술서 기반 30/60/90일 계획 뼈대 — 구간마다 목표 3개씩
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인**

| 항목 | 기대값 |
|---|---|
| 필독 목록 | `Onboarding_ReadingList.xlsx` 기준 6종. **정보보안 정책이 Day 1** |
| 30/60/90 | 직무기술서의 **책임 6개·90일 기대치 3개**가 반영 |

</div>

<div class="info-box tip" markdown="1">

**이어서 하나씩** — *"Marcus, Priya, Lena 3명과 다음 주 30분 인사 미팅 잡아줘. 예약 전에 보여줘."* / *"Day-1 환영 메시지 초안."* / *"팀 채널 소개글 초안."*
</div>

---

## 5-3. 빈 30/60/90 문서 채우기 (선택)

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 14 · 선택</span>

### 📌 어떤 상황인가

Step 4의 RCA처럼, OneDrive의 `Alex_Chen_30-60-90_draft.docx`가 **제목만 있고 비어** 있습니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>세 구간이 채워진 계획 문서</dd>

<dt>💡 효율화 포인트</dt>
<dd>새 파일을 만드는 것과 <strong>기존 파일 형식에 맞춰 채우는 것</strong>은 다른 작업입니다.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
내 OneDrive의 Cowork-demo/OneDrive_Ava 폴더에 있는 Alex_Chen_30-60-90_draft.docx를
방금 만든 계획으로 채워줘. 구간마다 목표 3개와 확인 근거 한 줄씩. 기존 파일에 써줘.
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인**

- 세 구간이 모두 채워졌는가
- 각 구간에 **측정 가능한 근거**가 있는가
- 새 파일이 아니라 **기존 파일이 수정**되었는가

</div>

---

## 이 단계에서 확인한 것

- ✅ 일정을 읽고 **거절 후보를 판단**한다
- ✅ **이중 예약 같은 충돌**을 탐지한다
- ✅ **여러 사람의 캘린더**를 조회해 빈 시간을 찾는다
- ✅ 직무기술서를 근거로 **형식적이지 않은 계획서**를 만든다
- ✅ 회의 예약·게시 같은 행동은 **승인을 거친다**

**[Step 6 — 자동화, 매주 알아서 돌게 만들기]({{ '/chapters/cowork-lab-6-automation/' | relative_url }})** 로 이동하세요.
