---
layout: chapter
date: 2026-09-05
title: "Step 1 — 아침 08:30, 밀린 것부터 걷어내기"
short_title: "Step 1. 아침 트리아지"
description: "출근 직후 30분을 잡아먹는 메일 정리를 Cowork에게 위임합니다. 트리아지, 우선순위, 미답장 추적 3가지."
order: 902
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "인박스 트리아지", "우선순위", "실습"]
---

<div class="info-box note" markdown="1">

**▶ 배우는 것** — Cowork는 "요약해줘"가 아니라 **"분류하고 정리해줘"** 를 받습니다. 읽는 도구와 행동하는 에이전트의 차이가 여기서 처음 드러납니다.
</div>

**08:30.** 여러분은 Aurora Dynamics의 영업 담당 Ava Nakamura입니다. 밤사이 메일이 쌓였고, 오늘 일정은 꽉 찼고, Teams에는 답을 기다리는 메시지가 있습니다.

---

## 1-1. 인박스 트리아지

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 1</span>

### 📌 어떤 상황인가

밤사이 메일 20통. 진짜 급한 건 두 통인데 뉴스레터 사이에 묻혀 있습니다. 매일 아침 20~30분이 여기 들어갑니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>긴급 메일 <strong>플래그</strong> · 뉴스레터 <strong>아카이브</strong> · 3줄 요약</dd>

<dt>💡 효율화 포인트</dt>
<dd>사람은 메일을 하나씩 열어야 급한지 압니다. Cowork는 발신자·제목·본문을 동시에 보고 판단하며 <strong>분류에서 끝나지 않고 실제로 처리</strong>합니다.</dd>

<dt>⚠️ 확인할 것</dt>
<dd>발송은 하지 않고 <strong>분류·아카이브만</strong> 하는지 보세요.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
최근 24시간 메일 20통만 확인해서 긴급 건은 플래그, 뉴스레터는 아카이브 해줘.
결과는 3줄로만 요약해줘. 답장 초안은 만들지 마.
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인**

- 긴급 **2통** — Rajiv Menon(Meridian Bank) 장애 후속, Ingrid Bauer(Halcyon Energy) RFP 질의 마감
- 아카이브된 뉴스레터 **6통**
- 요약이 3줄 안쪽

</div>

<div class="info-box tip" markdown="1">

**초안이 필요하면 이어서** — *"방금 긴급으로 분류한 2건만 3문장짜리 답장 초안 만들어줘. 발송은 하지 말고."* 처음부터 한꺼번에 시키는 것보다 빠릅니다.
</div>

---

## 1-2. 오늘의 우선순위 3가지

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 2</span>

### 📌 어떤 상황인가

메일은 정리됐지만 **"그래서 뭐부터 하지?"** 는 남습니다. 일정·인박스·Teams가 각각 다른 창에 있습니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>근거가 붙은 <strong>우선순위 3가지</strong>, 각 한 줄</dd>

<dt>💡 효율화 포인트</dt>
<dd>여기서 처음으로 <strong>캘린더 + 메일 + Teams</strong> 를 동시에 봅니다. 사람은 창을 세 번 옮기며 맥락을 잃습니다.</dd>

<dt>⚠️ 확인할 것</dt>
<dd>각 항목에 <strong>"왜 1번인지"</strong> 근거가 붙었는지 보세요.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
오늘 일정, 안 읽은 중요 메일, 답 안 한 Teams 메시지를 보고
오늘 아침 우선순위 3가지만 한 줄씩 알려줘. 근거도 한 줄씩. 초안은 만들지 마.
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인**

- **14:00 Meridian Bank QBR**이 우선순위에 들어갔는가
- Teams에서 **답장 대기 메시지 4건**을 찾았는가
- 각 항목에 근거(어느 메일·어느 일정)가 붙었는가

</div>

---

## 1-3. 내가 보내고 답 못 받은 것들

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 3</span>

### 📌 어떤 상황인가

받은 메일은 보이지만 **내가 보내고 답 안 온 메일**은 안 보입니다. 영업에서 가장 자주 새는 구멍입니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>미회신 메일 <strong>목록 표</strong> 1개</dd>

<dt>💡 효율화 포인트</dt>
<dd>사람이 <strong>구조적으로 놓치는</strong> 작업입니다. 보낸편지함을 뒤져도 스레드마다 답장 여부를 확인해야 합니다. Cowork는 <strong>스레드 단위로 대조</strong>합니다.</dd>

<dt>⚠️ 확인할 것</dt>
<dd>초안까지 요구하지 않았는데 만들어내지는 않는지 보세요.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
지난 일주일간 내가 보낸 메일 중 답장 못 받은 것만 표로 정리해줘.
수신자 / 소속 / 기다리는 내용 3개 컬럼이면 돼. 초안은 아직 만들지 마.
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인** — 미회신 **4건**이 나와야 합니다.

| 수신자 | 소속 | 기다리는 것 |
|---|---|---|
| Peter Novak | Kestrel Logistics | 계약 회신 |
| Claire Dubois | Ironwood Consulting | 리소스 확인 |
| Diego Ferrer | 사내 CSM | Solstice 갱신 데이터 |
| Yuki Tanaka | 사내 재무 | Q3 숫자 확인 |

</div>

<div class="info-box tip" markdown="1">

**팔로우업이 필요하면** — *"위 4건 중 Peter Novak 건만 정중한 팔로우업 초안 만들어줘."* 4건을 한꺼번에 쓰는 것보다 훨씬 빠릅니다.
</div>

---

## 이 단계에서 확인한 것

- ✅ 분류에서 끝나지 않고 아카이브·플래그 같은 **실제 동작**을 한다
- ✅ 메일·일정·Teams **세 저장소를 한 번에** 읽는다
- ✅ 외부로 나가는 행동은 **승인을 요구**한다
- ✅ 짧게 시키고 **이어서 확장**하는 편이 빠르다

**[Step 2 — 미팅 30분 전, 브리핑 만들기]({{ '/chapters/cowork-lab-2-briefing/' | relative_url }})** 로 이동하세요.
