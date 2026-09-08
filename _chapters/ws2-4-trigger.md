---
layout: chapter
date: 2026-04-08
title: "트리거 추가"
short_title: "트리거 추가"
description: "기초편 #2: 문서검색 & 에스컬레이션 - 트리거 추가"
order: 4
category: workshop
parent: "ws2"
---

## Step 4: 트리거 추가

에이전트가 스스로 시작하게 만들기
===

✅ 트리거란,

지금까지 만든 기능은 모두 **사용자가 물어봐야** 동작합니다. **트리거(Trigger)** 는 이 관계를 뒤집습니다. 새 메일 도착, SharePoint 항목 생성, Teams 채널 게시글, 일정 등 **외부 이벤트**가 발생하면 에이전트가 스스로 일을 시작합니다.

**도구 vs 트리거 비교**

|구분|도구(Tool)|트리거(Trigger)|
|:---|:---|:---|
|시작 주체|오케스트레이터가 선택한 사용자 요청|사용자 없이 발생하는 외부 이벤트|
|**실행 시점**|대화 중|이벤트 발생 시점, 대화 밖에서도|
|**대표 용례**|"이 내용을 담당자에게 메일 보내줘"|"문의 메일이 오면 분석해서 담당자에게 알려줘"|
|**관계**|트리거는 발동 후 대개 **도구를 호출**한다|트리거로 시작된 실행이 실제로 하는 일이 도구다|

<br>

요약하면, 도구는 "**무엇을 할 수 있는가**"를, 트리거는 "**언제 시작하는가**"를 정의합니다.

---

실습
===

<div class="info-box warning" markdown="1">
**이 페이지는 다시 작성되었습니다.** 이전 버전은 제목만 "트리거 추가"이고 본문은 Step 3의 플로우 생성 내용을 그대로 반복하고 있었습니다. 저작 과정의 복사 실수였습니다. 이 페이지는 현재 UI 기준의 실제 트리거 절차를 다룹니다.
</div>

<div class="info-box note" markdown="1">
**화면은 영문 데모 환경 촬영본입니다(2026년 9월 8일).** 한국어 환경에서도 흐름과 항목 위치는 같고 표시 문자열만 한국어입니다. **트리거를 활성 상태로 두거나 메시지를 발송하지는 않았습니다.**
</div>

이번 실습에서는 누군가 질문을 입력하기를 기다리는 대신, **새 메일이 도착하면 에이전트가 스스로 시작**하도록 만듭니다.

## 1. 트리거 섹션 열기

트리거는 에이전트 **개요(Overview)** 페이지의 **도구(Tools)** 카드 아래 별도 카드에 있습니다. **[트리거 추가]** 를 선택합니다.

![개요 페이지의 Triggers 카드]({{ '/assets/image/en/caldova/ws2-trigger-overview.png' | relative_url }})

<div class="info-box note" markdown="1">
**트리거는 과금 대상입니다.** 대화상자에 "This is a billable feature and will consume messages"라고 명시돼 있습니다. 이벤트가 발생할 때마다 메시지를 소비하므로, 들어오는 모든 메일에 반응하게 두지 말고 조건을 좁게 잡으세요.
</div>

## 2. 생성형 오케스트레이션 켜기

트리거는 **생성형 오케스트레이션**이 켜져 있어야 사용할 수 있습니다. 아직 클래식 오케스트레이션이면 목록 대신 안내 화면이 나옵니다.

![생성형 오케스트레이션을 요구하는 Add trigger 화면]({{ '/assets/image/en/caldova/ws2-trigger-catalog.png' | relative_url }})

**[Turn it on]** 을 선택하면 "Changes saved." 배너가 뜹니다.

<div class="info-box tip" markdown="1">
**안내 화면이 계속 다시 나온다면** — 이 환경에서는 **설정 → 오케스트레이션**에 이미 **Yes(동적 응답)** 가 선택돼 있는데도 다시 방문하면 안내 화면이 또 나왔습니다. 설정은 실제로 저장돼 있었고, 대화상자가 그 값을 읽지 못한 것입니다. 대화상자 안에서 **[Turn it on]** 을 누르면 해결됩니다. 같은 증상을 만나면 먼저 설정을 확인해, 이미 올바른 값을 쫓아다니지 않도록 하세요.

![설정에 이미 Yes로 선택돼 있는 생성형 오케스트레이션]({{ '/assets/image/en/caldova/ws2-trigger-orchestration.png' | relative_url }})
</div>

## 3. 이벤트 선택

오케스트레이션을 켜면 사용 가능한 트리거 목록이 나옵니다. **Featured** 에 11개가 있고, **Library** 에 전체 목록이 있습니다.

![트리거 라이브러리]({{ '/assets/image/en/caldova/ws2-trigger-library.png' | relative_url }})

|트리거|원본|
|---|---|
|Recurrence|일정(Schedule)|
|When a new response is submitted|Microsoft Forms|
|When an item is created / created or modified|SharePoint|
|When a file is created|OneDrive for Business|
|When a new channel message is added|Microsoft Teams|
|When a row is added, modified or deleted|Microsoft Dataverse|
|**When a new email arrives (V3)**|**Office 365 Outlook**|
|When a task is completed|Planner|
|When a file is created (properties only)|SharePoint|
|When an item or a file is modified|SharePoint|

검색으로 목록을 좁힐 수 있습니다. `email` 을 입력하면 Outlook 트리거만 남습니다.

![email로 검색한 트리거 목록]({{ '/assets/image/en/caldova/ws2-trigger-search.png' | relative_url }})

**When a new email arrives (V3)** 를 선택하고 **[Next]** 를 누릅니다.

## 4. Power Automate 연결 동의

트리거는 Power Automate 위에서 동작하므로, 다음 화면은 Copilot Studio 안에 포함된 Power Automate 동의 단계입니다. 어떤 이벤트인지 다시 알려주고, 약관 동의와 사용자·테넌트 정보 조회 허용을 요청합니다.

![Power Automate 동의 화면]({{ '/assets/image/en/caldova/ws2-trigger-config.png' | relative_url }})

**[Continue]** 를 선택합니다. 동의 후에는 트리거 자체를 구성합니다.

|항목|설정할 내용|
|---|---|
|연결(Connection)|트리거가 로그인에 사용할 Office 365 Outlook 연결|
|폴더(Folder)|감시할 메일 폴더 — 보통 받은 편지함|
|조건(Conditions)|범위를 좁히는 조건 — 보낸 사람, 제목 필터, 중요도, 첨부 유무|
|에이전트에게 전달할 메시지|트리거 발동 시 에이전트가 받는 프롬프트. 메일의 각 필드를 동적 콘텐츠로 넣을 수 있습니다|

에이전트가 받을 지시문은 "이 메일이 실제로 처리가 필요한지"를 스스로 판단하도록 작성합니다. 예를 들어 핵심 이슈를 추출하고, 연결된 지식 원본을 검색한 뒤, 정말로 의사결정이 필요한 메일일 때만 담당자에게 에스컬레이션하고 뉴스레터·공지는 무시하도록 씁니다.

<div class="info-box warning" markdown="1">
**이 실습은 여기서 멈춥니다 — 있는 그대로 밝힙니다.** 촬영에 사용한 데모 환경에서 동의 화면의 **[Continue]** 버튼이 다음 단계로 넘어가지 않았습니다. 여러 번 시도하고 페이지를 새로 고쳐도 동의 화면에 머물렀습니다. 따라서 위 표에서 설명한 매개변수 화면은 **스크린샷이 없습니다.** 촬영하지 못했기 때문입니다. 이 상자 위의 모든 이미지는 실제로 완료된 단계를 찍은 것입니다.
</div>

## 5. 신뢰하기 전에 검증하기

<div class="info-box tip" markdown="1">
**저장이 반영됐는지 확인하세요** — 트리거를 구성한 뒤 페이지를 새로고침하고 다시 열어보세요. 이 환경에서는 저장이 조용히 되돌아간 경우가 여러 번 있었고, 새로고침 전 화면이 멀쩡해 보여도 실제로 저장된 것은 아닙니다.
</div>

트리거는 실제 이벤트로만 증명됩니다. 조건에 맞는 테스트 메일을 한 통 보내고, **활동(Activity)** 에서 에이전트가 실행됐는지 확인하고, 의도한 동작을 했는지 봅니다. 무시했어야 할 메일에는 **실행되지 않았는지**도 함께 확인해야 합니다. 두 결과를 모두 눈으로 보기 전까지 그 트리거는 "구성됨"일 뿐 "검증됨"이 아닙니다.

<div class="info-box note" markdown="1">
**끝나면 꺼두세요.** 살아 있는 트리거는 조건에 맞는 이벤트마다 계속 메시지를 소비합니다. 실습 목적으로만 만들었다면 마친 뒤 비활성화하세요.
</div>

---
---

← [이전: Step 3. 도구 추가(Flow)]({{ '/chapters/ws2-3-tool-flow/' | relative_url }}) | [다음: Step 5. 게시 및 공유]({{ '/chapters/ws2-5-publish/' | relative_url }}) →
