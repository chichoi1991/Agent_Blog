---
layout: chapter
date: 2026-09-05
title: "Step 1 — 아침 08:30, 밀린 것부터 걷어내기"
short_title: "Step 1. 아침 트리아지"
description: "출근 직후 30분을 잡아먹는 메일·일정·Teams 정리를 Cowork에게 위임합니다. 트리아지, 우선순위 도출, 미답장 추적 3가지."
order: 902
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "인박스 트리아지", "우선순위", "실습"]
---

<div class="info-box note" markdown="1">

**▶ 이 단계에서 배우는 것** — Cowork는 "요약해줘"가 아니라 **"분류하고, 정리하고, 초안까지 만들어줘"** 를 받을 수 있습니다. 읽기만 하는 도구와 행동하는 에이전트의 차이가 여기서 처음 드러납니다.
</div>

**지금 시각 08:30.** 여러분은 Aurora Dynamics의 영업 담당 Ava Nakamura입니다. 노트북을 열었더니 밤사이 메일이 쌓였고, 오늘 일정은 이미 꽉 찼으며, Teams에는 어제부터 답을 기다리는 메시지가 있습니다.

---

## 1-1. 인박스 트리아지

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 1</span>

### 📌 어떤 상황인가

밤사이 들어온 메일이 20통 남짓입니다. 그중 진짜 급한 건 두 통인데, 뉴스레터 여섯 통과 단순 확인 요청 사이에 묻혀 있습니다. **매일 아침 반복되는 이 분류 작업**에 보통 20~30분이 들어갑니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>긴급 메일 <strong>플래그 표시</strong> · 뉴스레터 <strong>아카이브 처리</strong> · 단답 가능한 건에 대한 <strong>답장 초안 3건</strong>(발송 전 상태) · 전체 요약</dd>

<dt>💡 효율화 포인트</dt>
<dd>사람이 하면 <strong>메일을 하나씩 열어봐야</strong> 급한지 알 수 있습니다. Cowork는 발신자·제목·본문·스레드 맥락을 동시에 보고 판단하며, <strong>분류에서 끝나지 않고 답장 초안까지</strong> 만들어 둡니다. 20분 → 2분.</dd>

<dt>⚠️ 확인할 것</dt>
<dd>Cowork가 <strong>발송은 하지 않고 초안만</strong> 만드는지 보세요. 외부로 나가는 행동은 항상 승인을 요구합니다.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
지난 24시간 동안 온 메일을 확인해서
- 긴급한 건은 플래그
- 뉴스레터·광고성 메일은 아카이브
- 빠른 답장이 필요한 건은 초안 작성
해줘. 끝나면 요약해서 보여줘.
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인** — 아래가 나오면 성공입니다.

- 긴급으로 분류된 메일 **2통** — Rajiv Menon(Meridian Bank)의 장애 후속 요구, Ingrid Bauer(Halcyon Energy)의 RFP 질의 마감 통보
- 아카이브된 뉴스레터 **6통**
- 답장 초안 **3건**이 만들어졌지만 **발송되지 않은** 상태
</div>

<div class="info-box tip" markdown="1">

**분류가 마음에 안 들면 다시 시키지 마세요** — 같은 대화에서 *"Ingrid Bauer 메일은 긴급이 아니라 보통으로 바꿔줘"* 처럼 말하면 전체를 다시 하지 않고 그 부분만 수정합니다. 대화형 수정이 처음부터 다시 하는 것보다 훨씬 빠릅니다.
</div>

---

## 1-2. 오늘의 우선순위 3가지

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 2</span>

### 📌 어떤 상황인가

메일은 정리됐지만 **"그래서 오늘 뭐부터 하지?"** 는 여전히 남습니다. 일정표, 인박스, Teams가 각각 다른 창에 있고, 셋을 머릿속에서 합쳐야 답이 나옵니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>근거가 붙은 <strong>우선순위 3가지</strong> · 급한 상위 2건에 대한 <strong>3문장 이내 답장 초안</strong></dd>

<dt>💡 효율화 포인트</dt>
<dd>여기서 처음으로 <strong>세 개의 저장소를 동시에</strong> 봅니다. 캘린더 + 메일 + Teams. 사람은 창을 세 번 옮겨야 하고, 옮기는 사이에 맥락을 잃습니다. Cowork는 한 번에 읽고 <strong>교차 비교</strong>합니다.</dd>

<dt>⚠️ 확인할 것</dt>
<dd>우선순위에 <strong>"왜 이게 1번인지"</strong> 근거가 붙어 있는지 보세요. 근거 없는 목록은 신뢰할 수 없습니다.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
오늘 일정, 어제부터 안 읽은 중요 메일, 아직 답 안 한 Teams 메시지를 종합해서
오늘 아침 우선순위 3가지를 추천해줘.
급한 항목 상위 2개는 3문장 이내 답장 초안도 만들어줘. 발송은 하지 말고.
~~~

</div>

<div class="expect" markdown="1">

**✅ 결과 확인**

- 오늘 **14:00 Meridian Bank QBR**이 우선순위에 반영되어 있는가
- Teams에서 **답장을 기다리는 메시지 4건**을 찾아냈는가
- 각 우선순위에 근거(어느 메일·어느 일정 때문인지)가 붙어 있는가
</div>

---

## 1-3. 내가 보내고 답 못 받은 것들

<div class="scenario" markdown="1">

<span class="scenario-tag">시나리오 3</span>

### 📌 어떤 상황인가

받은 메일은 눈에 보이지만, **내가 보내놓고 답이 안 온 메일**은 보이지 않습니다. 이게 영업에서 가장 자주 새는 구멍입니다. 계약 회신을 기다리는 건, 파트너 리소스 확인, 갱신 데이터 요청 — 모두 조용히 잊힙니다.

<dl>
<dt>🎯 기대 산출물</dt>
<dd>미회신 메일 목록과 각각에 대한 <strong>정중한 팔로우업 초안 4건</strong></dd>

<dt>💡 효율화 포인트</dt>
<dd>이건 사람이 <strong>구조적으로 놓치는</strong> 작업입니다. 보낸편지함을 일부러 뒤지지 않는 한 알 수 없고, 뒤져도 "답이 왔는지"를 스레드마다 확인해야 합니다. Cowork는 보낸편지함과 받은편지함을 <strong>스레드 단위로 대조</strong>합니다.</dd>

<dt>⚠️ 확인할 것</dt>
<dd>초안의 <strong>톤</strong>을 보세요. 독촉이 아니라 정중한 확인이어야 합니다. 상대는 고객이고 파트너입니다.</dd>
</dl>

</div>

<div class="prompt-box" markdown="1">

~~~text
지난 일주일간 내가 보낸 메일 중 아직 답장을 못 받은 것들을 찾아서
각각 정중한 팔로우업 초안을 작성해줘. 보내기 전에 나한테 먼저 보여줘.
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

---

## 이 단계에서 확인한 것

- ✅ Cowork는 **분류하고 끝나지 않고** 아카이브·플래그 같은 **실제 동작**을 수행한다
- ✅ 메일·일정·Teams **세 저장소를 한 번에** 읽고 교차 비교한다
- ✅ 외부로 나가는 행동(메일 발송)은 **반드시 승인을 요구**한다
- ✅ 결과가 틀렸을 때 **대화로 수정**하는 편이 다시 시키는 것보다 빠르다

<div class="info-box note" markdown="1">

**아직은 워밍업입니다** — 여기까지는 "메일함 안에서" 벌어지는 일입니다. 다음 단계부터는 Cowork가 **문서와 채널을 넘나들며** 흩어진 사실을 조립하기 시작합니다.
</div>

**[Step 2 — 미팅 30분 전, 브리핑 만들기]({{ '/chapters/cowork-lab-2-briefing/' | relative_url }})** 로 이동하세요.
