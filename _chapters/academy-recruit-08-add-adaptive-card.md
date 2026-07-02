---
layout: "chapter"
title: "미션 08: Adaptive Card로 Topics의 사용자 상호작용 강화하기"
short_title: "Adaptive Card 추가"
description: "Power Fx와 SharePoint를 사용해 Adaptive Card를 만드는 방법"
order: 8
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/08-add-adaptive-card/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-02-19"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/08-add-adaptive-card/"
---

<div class="info-box note translated-post" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 08: Enhance user interactions in Topics with Adaptive Cards](https://microsoft.github.io/agent-academy/recruit/08-add-adaptive-card/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

🎥 **워크스루 영상 보기**

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/video-thumbnail.jpg' | relative_url }}" alt="Adaptive cards video thumbnail" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption><a href="https://www.youtube.com/watch?v=RhIlzYHPCXo">YouTube에서 워크스루 보기</a></figcaption></figure>

## 🎯 미션 브리핑

에이전트 여러분, 여러분의 미션은 정적인 사용자 경험에 침투해 이를 풍부하고 동적이며 실행 가능한 Adaptive Card로 대체하는 것입니다. JSON 페이로드와 Power Fx 수식을 배치해 Copilot Studio 대화를 단순한 Q&A에서 완전한 인터랙티브 상호작용으로 변신시킵니다. 목표는 사용자 입력을 수집하고, 데이터를 아름답게 표시하며, 정확하고 스타일리시하게 대화를 안내하는 것입니다. 적응에 실패하면 사용자들은 덜 똑똑한 인터페이스로 이탈할 수 있습니다.

<div class="info-box note" markdown="1">
**참고** — Copilot Studio 화면이 이 강의의 스크린샷과 다르게 보인다면, 오른쪽 상단의 **New Experience**를 꺼서 여기서 사용하는 **클래식 경험**으로 전환하세요.
</div>

## 🔎 학습 목표

이번 미션에서 다음을 배웁니다:

1. Adaptive Card가 무엇이고 Copilot Studio에서 사용자 상호작용을 어떻게 강화하는지 이해하기
1. 동적 콘텐츠를 위한 JSON과 Power Fx 수식으로 인터랙티브 카드를 만드는 법 배우기
1. 비주얼 카드 제작을 위한 Adaptive Card Designer와 핵심 구성 요소 살펴보기
1. 에이전트 토픽 안에서 풍부하고 인터랙티브한 폼과 데이터 수집 경험 만들기
1. 반응형이고 사용자 친화적인 adaptive card를 설계하기 위한 모범 사례 적용하기

## 🤔 Adaptive Card란?

**Adaptive Card**는 Microsoft Teams, Microsoft Outlook, 에이전트 같은 앱에 삽입할 수 있는 인터랙티브하고 시각적으로 풍부한 UI 요소를 만드는 방법입니다. 카드의 레이아웃과 콘텐츠를 정의하는 구조화된 JSON 객체입니다:

- 카드에 어떤 요소(텍스트, 이미지, 버튼)가 표시되는지
- 이 요소들이 어떻게 배치되는지
- 사용자가 폼 제출이나 링크 열기 같은 어떤 동작을 할 수 있는지

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.0_01_AdaptiveCard.png' | relative_url }}" alt="Adaptive Card" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Adaptive Card</figcaption></figure>

### Copilot Studio에서 Adaptive Card가 중요한 이유

사용자에게 이름, 이메일, 피드백을 묻는 에이전트를 만든다고 상상해보세요. 단순 텍스트만 사용하면 대화가 지루하거나 따라가기 어려울 수 있습니다. 그럴 때 Adaptive Card가 필요합니다!

1. **대화를 인터랙티브하게 만듦** - 텍스트 메시지 대신 버튼, 폼, 이미지 등을 보여줄 수 있습니다.
    - 예시: 카드로 사용자에게 이름과 이메일을 깔끔한 폼에 입력하도록 요청할 수 있습니다.

1. **어디서든 보기 좋음** - Adaptive Card는 Microsoft 365 Copilot 채팅이나 Microsoft Teams 등 사용되는 앱의 스타일에 자동으로 맞춰집니다. 다크 모드, 글꼴, 레이아웃을 걱정할 필요 없이 알아서 적응합니다.

1. **JSON으로 쉽게 만들 수 있음** - JSON 코드로 카드를 정의합니다(UI의 _레시피_라고 생각하세요). Copilot Studio는 토픽에 추가하기 전에 카드를 미리 볼 수 있게 해줍니다.

1. **데이터 수집·활용** - 카드를 사용해 질문하고 답변을 수집한 뒤 대화 흐름에서 그 데이터를 사용할 수 있습니다.
    - 예시: 사용자의 전화번호를 물은 다음 전화번호가 포함된 확인 카드를 보여줍니다.

1. **사용자 경험 향상** - 카드는 에이전트를 더 인터랙티브하게 느끼도록 만듭니다. 더 깔끔하고, 클릭 가능하고, 사용자 친화적인 인터페이스입니다.

## 🐱 _JSON_은 사람 이름인가요?

"제이슨"이라고 발음되지만, 사람 이름이 아닙니다 😅

JSON, 즉 _JavaScript Object Notation_은 데이터를 구조화하는 데 사용되는 경량 포맷입니다. 읽고 쓰기 쉬우며, 중괄호 {} 안에 일련의 키-값 쌍처럼 보입니다.

이는 토픽에 adaptive card를 추가할 때 선택할 수 있는 방법 중 하나입니다.

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.0_02_AdaptiveCardPropertiesPane.png' | relative_url }}" alt="Adaptive card node properties" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Adaptive card node properties</figcaption></figure>

## 👀 _formula_로 adaptive card를 만드는 또 다른 방법도 있네요

[미션 07 - 노드에서 Power Fx 사용하기](/chapters/academy-recruit-07-add-new-topic-with-trigger/)에서 배운 Power Fx를 기억하시나요? Copilot Studio의 Adaptive Card에도 똑같이 적용할 수 있습니다.

요약하면,

<div class="info-box note" markdown="1">
**참고** — Power Fx는 에이전트에 로직과 동적 동작을 추가하는 데 사용되는 로우코드 프로그래밍 언어입니다. Microsoft Power Apps에서 사용하는 것과 같은 언어이며, 개발자와 비개발자 모두 쉽게 사용할 수 있도록 Excel과 비슷하게 단순하도록 설계되었습니다.
</div>

### Adaptive Card에서 Power Fx가 동작하는 방식

Copilot Studio에서 Adaptive Card를 디자인할 때 Power Fx 수식을 사용해 다음을 할 수 있습니다:

- 사용자 이름, 날짜, 상태 같은 값을 동적으로 삽입
- 통화 표시나 숫자 반올림 같은 텍스트·숫자 형식 지정
- 조건에 따라 요소를 표시하거나 숨기기
- 사용자 입력, 변수, 대화 노드의 출력을 기반으로 응답을 커스터마이징

예를 들어,

"`Hello`" & `System.User.DisplayName`

이 수식은 "Hello"라는 단어와 사용자 이름을 동적으로 결합합니다.

### 유용한 이유

1. **개인화**

    각 사용자에 맞춰 메시지를 조정해 상호작용을 더 자연스럽고 관련성 있게 만듭니다.

1. **동적 콘텐츠**

    카드는 변수와 대화 노드 출력의 실제 데이터를 표시할 수 있습니다.

1. **스마트 로직**

    조건에 따라 사용자가 무엇을 보고 상호작용할지 제어할 수 있어 사용성이 높아지고 오류가 줄어듭니다.

1. **로우코드 친화적**

    Power Fx는 로우코드 프로그래밍 언어입니다. 앞서 언급했듯 읽기 쉽고 직관적이며 Excel 수식과 유사합니다.

## 👷🏻‍♀️ Adaptive Card Designer로 만들기

**Adaptive Card Designer**는 텍스트, 이미지, 버튼, 입력 필드 같은 요소를 드래그 앤 드롭으로 사용해 인터랙티브 메시지 카드를 만들 수 있는 시각적 도구입니다. 복잡한 코드를 작성하지 않고도 풍부하고 동적인 메시지를 만들도록 도와, 사용자 친화적인 인터페이스를 더 쉽게 설계할 수 있게 합니다.

디자이너 도구는 카드를 시각적으로 만들도록 돕지만, 뒤에서는 JSON 객체를 자동 생성합니다. _formula_로 전환하면 다른 곳의 데이터를 표시하기 위해 카드에서 Power Fx 표현식을 사용할 수도 있습니다.

## 🎨 Adaptive Card Designer 이해하기

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.0_03_AdaptiveCardPropertiesPane.png' | relative_url }}" alt="Adaptive Card Designer" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Adaptive Card Designer</figcaption></figure>

### A) Card Elements(카드 요소)

adaptive card의 구성 요소입니다. 다음과 같은 요소를 드래그 앤 드롭할 수 있습니다:

- **TextBlock** - 텍스트를 표시
- **Image** - 이미지를 표시
- **FactSet** - 키-값 쌍
- **Input fields** - 텍스트 박스, 날짜 선택기, 토글을 표시
- **Actions** - _Submit_, _Open URL_, _Show Card_ 같은 버튼을 표시

각 요소는 고유한 목적이 있으며 스타일이나 구성을 지정할 수 있습니다.

### B) Card Viewer(카드 뷰어)

카드가 실시간으로 어떻게 보일지 확인하는 **미리보기** 영역입니다. 요소를 추가하거나 편집하면 뷰어가 즉시 업데이트되어 변경 사항을 반영합니다. 이를 통해 반복적으로 수정하면서 동시에 디자인 결과를 볼 수 있습니다.

### C) Card Structure(카드 구조)

카드의 **계층과 레이아웃**을 보여줍니다. 예를 들어:

- 카드는 제목을 위한 **TextBlock**으로 시작할 수 있습니다.
- 그다음 한쪽에는 이미지, 다른 쪽에는 텍스트가 있는 **ColumnSet**이 옵니다.
- 이어서 **FactSet**과 몇 개의 **Action 버튼**이 옵니다.

요소들이 어떻게 중첩되고 정리되는지 이해하는 데 도움이 됩니다.

### D) Element Properties(요소 속성)

카드에서 요소를 클릭하면, 이 패널에서 **설정을 커스터마이징**할 수 있습니다:

- 텍스트 크기, 굵기, 색상 변경
- 이미지 URL이나 대체 텍스트 설정
- 자리표시자 텍스트나 기본값 같은 입력 옵션 구성

각 요소를 세밀하게 조정하는 곳입니다.

### E) Card Payload Editor(카드 페이로드 편집기)

카드 뒤에 있는 **원본 JSON 코드**입니다. 고급 사용자는 다음을 위해 이를 직접 편집할 수 있습니다:

- 템플릿 기능 사용
- 카드 정의를 복사/붙여넣기

Adaptive Card Designer가 처음이더라도, 시각적 디자인이 코드로 어떻게 변환되는지 보는 것이 도움이 됩니다.

<div class="info-box note" markdown="1">
**TIP - Adaptive Card 샘플 확인하기**

1. [https://adaptivecards.microsoft.com/designer](https://adaptivecards.microsoft.com/designer)로 이동합니다.
1. **New card**를 선택하면 선택하고 수정할 수 있는 샘플 목록이 나타납니다.
1. 이 디자이너는 외부(웹 기반) 도구입니다. 웹 기반 Adaptive Card Designer에서 카드를 만든 후, Card Payload Editor에서 JSON을 복사하세요.
1. Copilot Studio 에이전트의 adaptive card에 해당 JSON을 붙여넣으세요.
</div>

<figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.0_04_AdaptiveCardDesignerSamples.png' | relative_url }}" alt="Adaptive Card Designer Samples" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Adaptive Card Designer Samples</figcaption></figure>

## 🌵 일반적인 사용 사례

**Send a message** 또는 **Ask a question** 노드에서 사용될 때 Copilot Studio에서 Adaptive Card의 일반적인 사용 사례는 다음과 같습니다.

1. **폼과 데이터 수집**

    다음과 같이 사용자로부터 구조화된 입력을 수집하는 데 adaptive card를 사용합니다:

    - 휴가 신청
    - 피드백 폼
    - 연락처 정보
    - 예약 일정 잡기

1. **동적 정보 표시**

    ServiceNow, SAP, Dynamics 365, SharePoint 같은 엔터프라이즈 소스에서 개인화되거나 실시간인 데이터를 깔끔하고 읽기 쉬운 형식으로 보여줍니다.

    - 주문 요약
    - 계좌 잔액
    - 티켓·케이스 상태
    - 다가오는 이벤트나 마감일

1. **인터랙티브 선택**

    사용자가 대화 안에서 직접 선택하도록 합니다:

    - 제품 카테고리, 지원 토픽 같은 옵션 목록에서 선택
    - 동작 확인 또는 취소
    - 서비스나 경험 평가

1. **동작 트리거**

    대화 내부 또는 외부에서 추가 단계를 트리거하는 버튼을 포함합니다.

    - "Submit request"
    - "View details"

## ⭐ 모범 사례

Copilot Studio에서 에이전트용 Adaptive Card를 만들 때의 모범 사례입니다.

1. **단순하고 초점을 명확히 유지하기**

    - 명확한 목적을 갖고 카드를 설계하고, 너무 많은 요소로 과부하시키지 마세요.
    - 간결한 텍스트와 직관적인 레이아웃을 사용해 사용자를 상호작용으로 안내하세요.

1. **입력을 의도적으로 구성하기**

    - 텍스트, 날짜 선택 같은 필요한 입력 요소만 포함해 사용자가 압도되지 않게 하세요.
    - 레이블을 사용해 입력을 이해하기 쉽게 만드세요.

1. **가독성을 위한 구조화**

    - 제목과 지침에는 **TextBlock**을 사용하세요.
    - 관련 요소는 **Container**나 **ColumnSet**으로 그룹화해 시각적 흐름을 개선하세요.

1. **Action 요소를 명확하게 만들기**

    - "Submit Request"나 "View Details" 같은 명확한 버튼 제목과 함께 **Action.Submit**, **Action.OpenUrl**을 사용하세요.
    - "Click here" 같은 모호한 레이블은 피하세요.

1. **적응력을 고려해 설계하기**

    - 카드가 다양한 화면 크기에서 보일 수 있다고 가정하세요.
    - 고정 너비를 피하고 반응형을 위해 **ColumnSet** 같은 유연한 레이아웃을 사용하세요.

1. **가능하면 동적 콘텐츠 사용하기**

    - Power Fx를 사용해 카드 요소를 변수나 노드 출력에 바인딩해 사용자 경험을 개인화하세요.
    - 예를 들어, 사용자 이름이나 현재 상태를 동적으로 표시하세요.

## 🧪 랩 08 - Adaptive Card 추가 및 토픽 기능 강화하기

이제 adaptive card로 토픽을 강화하고 토픽·노드의 고급 기능을 사용하는 법을 배워봅시다.

### ✨ 사용 사례

**직원으로서**

**나는** 기기를 요청하고 싶습니다

**그래야** 사용 가능한 기기 목록에서 기기를 요청할 수 있습니다

시작해봅시다!

### 사전 준비 사항

1. **SharePoint 목록**

    [레슨 00 - 코스 설정 - 3단계: 새 SharePoint 사이트 만들기](/chapters/academy-recruit-00-course-setup/)에서 만든 **Devices** SharePoint 목록을 사용합니다.

    **Devices** SharePoint 목록을 아직 설정하지 않았다면, [레슨 00 - 코스 설정 - 3단계: 새 SharePoint 사이트 만들기](/chapters/academy-recruit-00-course-setup/)로 돌아가 설정하세요.

1. **Contoso Helpdesk Copilot**

    [레슨 06 - 자연어와 AI로 커스텀 에이전트를 만들고 내 데이터로 그라운딩하기](/chapters/academy-recruit-06-create-agent-from-conversation/)에서 이전에 만든 것과 같은 에이전트를 사용합니다.

### 8.1 사용자가 요청을 제출할 수 있는 Adaptive Card가 있는 새 토픽 만들기

사용자의 기기 요청을 처리하는 새 토픽을 만듭니다. 이 새 토픽에는 사용자가 에이전트와 상호작용할 수 있도록 **Ask with adaptive card** 노드가 포함됩니다.

시작해봅시다!

1. **Topics** 탭을 선택한 뒤 **+ Add a topic from blank**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_01_NewTopic.png' | relative_url }}" alt="Select Topics tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Topics tab</figcaption></figure>

1. 토픽 이름을 다음과 같이 입력합니다,

    ```text
    Request device
    ```

    트리거 설명으로 다음을 입력합니다.

    ```text
    This topic helps users request a device when they answer yes to the question that asks the user if they would like to request one of these devices.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_02_TopicNameAndTriggerDescription.png' | relative_url }}" alt="Topic Name and trigger Description" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Topic Name and trigger Description</figcaption></figure>

1. 다음으로 **Ask with adaptive card** 노드를 추가합니다. 이 노드는 사용자가 요청할 기기를 선택할 수 있는 인터랙티브 카드를 표시합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_03_AddAskWithAdaptiveCard.png' | relative_url }}" alt="Select Ask with adaptive card node" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Ask with adaptive card node</figcaption></figure>

1. 노드를 선택하면 **Adaptive Card Node properties** 패널이 나타납니다. 이제 JSON을 편집합니다. **Edit adaptive card**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_04_EditAdaptiveCard.png' | relative_url }}" alt="Edit adaptive card" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Edit adaptive card</figcaption></figure>

1. 여기가 카드를 디자인하고 실시간으로 카드 디자인을 볼 수 있는 **Adaptive Card Designer**입니다.

    **TextBlock**과 **FactSet** 카드 요소를 작성 캔버스(카드 뷰어 영역)로 드래그 앤 드롭해보세요. 이 두 카드 요소를 추가하면 카드 구조와 카드 페이로드 편집기가 업데이트되는 것을 확인하세요. 카드 페이로드 편집기와 요소 속성 패널을 직접 업데이트할 수도 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_05_DragAndDropCardElements.png' | relative_url }}" alt="Drag and drop card elements" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Drag and drop card elements</figcaption></figure>

1. **Preview**를 선택해 다양한 너비로 카드를 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_06_PreviewAdaptiveCard.png' | relative_url }}" alt="Select preview" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select preview</figcaption></figure>

1. 미리보기가 로드되며 너비별로 다른 카드 출력을 볼 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_07_PreviewCardWidths.png' | relative_url }}" alt="Preview card at different widths" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview card at different widths</figcaption></figure>

1. **x 아이콘**을 선택해 **Preview**에서 나가고, 앞서 추가한 두 카드 요소를 제거하기 위해 디자이너에서 **Undo**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_08_Undo.png' | relative_url }}" alt="Undo" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Undo</figcaption></figure>

1. **Card payload editor**를 클릭하고 Windows 키보드 단축키 _Ctrl + A_ 또는 Mac 키보드 단축키 _Command + A_로 모든 줄을 선택한 뒤 삭제합니다. [Request devices .JSON 파일](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/08-add-adaptive-card/assets/8.1_RequestDevice.json)의 JSON을 **붙여넣습니다**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_09_SelectAll.png' | relative_url }}" alt="Clear card payload editor" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Clear card payload editor</figcaption></figure>

1. 이제 **Card Preview**에 텍스트와 사용 가능한 기기 목록을 표시하는 요소가 포함된 것을 확인하세요.

    이 JSON은 현재 자리표시자이자 미리보기로, 카드의 기반으로 사용할 것이지만 실제로는 JSON이 아니라 formula 형태로 사용합니다. **Get items** SharePoint 커넥터 액션의 응답을 저장하는 **전역 변수**인 `Global.VarDevices.value`를 참조할 것이기 때문입니다.

    **Save**를 선택하고 **Close**를 선택해 Adaptive card designer 모달에서 나갑니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_10_DeviceRequestCard.png' | relative_url }}" alt="Select Save" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Select Save</figcaption></figure>

1. **X** 아이콘을 선택해 **Adaptive Card Node properties** 패널을 닫습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_11_ExitAdaptiveCardNodeProperties.png' | relative_url }}" alt="Close Adaptive Card Node properties panel" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Close Adaptive Card Node properties panel</figcaption></figure>

1. 토픽의 작성 캔버스에서 adaptive card를 확인할 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_12_DeviceRequestCard.png' | relative_url }}" alt="Device request adaptive card" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Device request adaptive card</figcaption></figure>

1. 노드 하단으로 스크롤하면 출력 변수가 보입니다. `commentsId`와 `deviceSelectionId`는 요소 속성에서 정의되었습니다. 이 두 변수는 사용자가 상호작용한 카드 요소의 값을 저장합니다. 이 값들은 다음 레슨의 랩에서 배울, 토픽 뒷부분에서 사용됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_13_DeviceRequestCardOutputs.png' | relative_url }}" alt="Node variable outputs" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Node variable outputs</figcaption></figure>

1. 이제 JSON에서 formula로 카드를 업데이트하겠습니다. JSON 응답의 `value` 속성을 통해 **전역 변수**인 `Global.VarDevices.value`에 저장된, **Get items** SharePoint 커넥터 액션이 반환한 항목들을 다시 Power Fx로 순회할 것이기 때문입니다.

    <div class="info-box note" markdown="1">
    **참고** — 이 전역 변수는 랩 07에서 만들었습니다.
    </div>

    **Ask with Adaptive Card** 노드에서 카드를 선택한 뒤 **chevron** 아이콘을 선택하고 **Formula**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_14_ChangeToFormula.png' | relative_url }}" alt="Change to formula" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Change to formula</figcaption></figure>

1. **expand** 아이콘을 클릭해 Formula 필드를 확대합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_15_SelectExpand.png' | relative_url }}" alt="Click on expand icon" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Click on expand icon</figcaption></figure>

1. **Card payload editor**를 클릭하고 Windows 키보드 단축키 _Ctrl + A_ 또는 Mac 키보드 단축키 _Command + A_로 모든 줄을 선택한 뒤 삭제합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_16_SelectAll.png' | relative_url }}" alt="Click into payload card editor" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Click into payload card editor</figcaption></figure>

    [Request Devices formula 파일](https://raw.githubusercontent.com/microsoft/agent-academy/main/docs/recruit/08-add-adaptive-card/assets/8.1_RequestDeviceFormula.txt)에서 formula를 붙여넣습니다.

1. 이 수식에서는 `For All` 함수를 사용해 각 SharePoint 목록 항목을 순회하며, 선택 옵션의 제목에 `Model` 값을 표시하고 SharePoint 항목의 `ID`를 값으로 참조합니다. 또한 수식이 토픽의 작성 캔버스에서 adaptive card를 렌더링하려면 값이 필요하기 때문에, `If(IsBlank()` 함수로 값을 감쌉니다. 그렇지 않으면 "Property cannot be null"이라는 메시지가 나타납니다.

    카드 모달을 **닫습니다(Close)**.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_17_PowerFxFormula.png' | relative_url }}" alt="Power Fx Formula" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Power Fx Formula</figcaption></figure>

1. **Adaptive Card Node properties** 패널을 **닫습니다(Close)**.

1. 토픽을 **저장(Save)**합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.1_18_SaveTopic.png' | relative_url }}" alt="Save topic" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Save topic</figcaption></figure>

### 8.2 Request device 토픽을 호출하도록 에이전트 지침 업데이트하기

이제 기기 요청을 처리하는 새 토픽을 만들었으니, 이 토픽을 호출하도록 **에이전트 지침**을 업데이트해야 합니다.

1. **Overview** 탭을 선택하고 **agent instructions**에서 **Edit**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_01_EditInstructions.png' | relative_url }}" alt="Edit instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Edit instructions</figcaption></figure>

1. [랩 07 - 대화 노드가 있는 새 토픽 추가하기, 7.3 커넥터로 도구 추가하기](/chapters/academy-recruit-07-add-new-topic-with-trigger/)의 이전 지침 아래에 새 줄을 추가합니다.

    ```text
    2. If the user answers yes to the question of requesting a device, trigger [Request device]. Otherwise if they answer no to the question of requesting a device, trigger [Goodbye].
    ```

    대괄호로 된 토픽 자리표시자 전체를 선택하고 자리표시자를 삭제합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_02_ReplaceRequestDevicePlaceholder.png' | relative_url }}" alt="Request device placeholder" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Request device placeholder</figcaption></figure>

1. `/Req`를 입력하고 **Request devices** 토픽을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_03_ReferenceRequestDeviceTopic.png' | relative_url }}" alt="Redirect to Request devices topic" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Redirect to Request devices topic</figcaption></figure>

1. 다음 토픽 자리표시자인 **[Goodbye]**에 대해서도 같은 단계를 반복합니다. 대괄호로 된 토픽 자리표시자 전체를 선택하고 자리표시자를 삭제합니다. `/Goodbye`를 입력하고 **Goodbye** 토픽을 선택합니다.

    - 사용자가 에이전트의 기기 요청 여부 질문에 **Yes**로 답하면, 에이전트는 **Available devices** 토픽에서 **Request devices** 토픽으로 리다이렉트합니다.

    - 반대로 사용자가 **No**로 답하면, 에이전트는 **Available devices** 토픽에서 **Goodbye** 토픽으로 리다이렉트합니다.

    업데이트된 지침을 **Save**합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_04_ReferenceGoodbyeTopic.png' | relative_url }}" alt="Redirect to Goodbye topic" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Redirect to Goodbye topic</figcaption></figure>

1. 이제 _Available devices_ 토픽에서 _Request devices_ 토픽으로의 리다이렉션을 테스트해봅시다. **Test**를 선택해 테스트 패널을 로드하고 **Refresh**를 선택합니다.

    그다음 테스트 패널에서 **Activity map** 아이콘을 선택하고 **Track between topics**를 활성화합니다. 이렇게 하면 _Available devices_ 토픽이 _Request devices_ 토픽으로 리다이렉트한 것을 확인할 수 있습니다.

    좋습니다, 테스트할 준비가 됐습니다! 테스트 패널에 다음을 입력합니다.

    ```text
    I need a laptop
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_05_TestAgent.png' | relative_url }}" alt="Test agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Test agent</figcaption></figure>

1. 에이전트는 사용 가능한 기기 목록으로 응답한 뒤 기기를 요청하고 싶은지 사용자에게 묻습니다. 다음을 복사해 붙여넣습니다,

    ```text
    yes please
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_06_TestRequestDeviceTopic.png' | relative_url }}" alt="Test Request device" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Test Request device</figcaption></figure>

1. 다음으로 에이전트가 **Request device** 토픽으로 리다이렉트한 것을 볼 수 있습니다. 에이전트는 우리가 추가한 지침에 따라 이 토픽을 호출했습니다.

    이제 인터랙티브 요소가 있는 adaptive card가 사용자에게 메시지로 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_07_AdaptiveCardQuestion.png' | relative_url }}" alt="Question node" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Question node</figcaption></figure>

1. 이제 _Available devices_ 토픽이 _Request devices_ 토픽으로 리다이렉트하는 것을 성공적으로 테스트했습니다 😄. 다음 레슨의 랩에서 이 토픽에 더 많은 기능을 추가할 것입니다.

    테스트 패널을 새로고침하세요.

    <figure class="screenshot"><img src="{{ '/assets/academy/recruit-08-add-adaptive-card/8.2_08_RefreshTestPane.png' | relative_url }}" alt="Refresh test pane" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Refresh test pane</figcaption></figure>

## ✅ 미션 완료

축하합니다! 👏🏻 Power Fx 수식을 사용해 변수의 데이터를 표시하는 adaptive card를 추가하는 법과, 한 토픽에서 다른 토픽으로 리다이렉트하는 법을 배웠습니다. 작은 단위의 토픽을 만들면 에이전트가 더 체계적으로 구성될 뿐 아니라, 사용자를 에이전트와의 대화 흐름 여러 부분으로 안내하는 데도 도움이 됩니다.

이것으로 **랩 08 - Adaptive Card로 사용자 상호작용 강화하기**가 끝났습니다. 다음 레슨으로 이동하려면 아래 링크를 선택하세요. 이 랩의 사용 사례는 다음 레슨의 랩에서 확장됩니다.

⏭️ [**자동화를 위해 토픽에 에이전트 플로우 추가하기** 레슨으로 이동](https://microsoft.github.io/agent-academy/recruit/09-add-an-agent-flow/)

## 📚 전술 자료

🔗 [Copilot Studio에서 Adaptive Card 사용하기](https://learn.microsoft.com/microsoft-copilot-studio/guidance/adaptive-cards-overview?WT.mc_id=power-172619-ebenitez)

🔗 [Send a message 노드에 adaptive card 추가하기](https://learn.microsoft.com/microsoft-copilot-studio/authoring-send-message#add-an-adaptive-card?WT.mc_id=power-172619-ebenitez)

🔗 [Power Fx로 표현식 만들기](https://learn.microsoft.com/microsoft-copilot-studio/advanced-power-fx?WT.mc_id=power-172619-ebenitez)

📺 [Power FX로 Adaptive Card 만들기](https://aka.ms/ai-in-action/copilot-studio/ep8)
