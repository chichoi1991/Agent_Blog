---
layout: chapter
title: "3부 · 사전 준비 & 에이전트 생성·지침"
short_title: "사전 준비 & 생성·지침"
description: "프리뷰 진입, 빈 에이전트 생성, 6요소의 뼈대인 지침 작성."
order: 1
category: newcs
parent: "ncs3"
---

## 1. 사전 준비

> **▶ 목표:** New Copilot Studio(프리뷰)에 진입합니다.

### 1.1 New 환경 진입 — 두 가지 방법

| 방법 | 경로 |
|---|---|
| **A. 직접 이동** | 브라우저에서 New Copilot Studio 프리뷰 URL 접속 |
| **B. Try now** | 기존 Copilot Studio 홈에서 **"Try now"** 버튼 클릭 |

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3_2.png' | relative_url }}" alt="프리뷰 접속 화면 / Try now 버튼 위치" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>프리뷰 접속 화면 / Try now 버튼 위치</figcaption>
</figure>

### 1.2 진입 후 확인

- 좌측/상단에서 **새 빌드 화면(Build·Test·Preview·Monitor 탭)**이 보이면 New 환경입니다.
- 프리뷰는 opt-in이며 클래식과 나란히 동작합니다. 강제 전환 없음.

<div class="info-box warning" markdown="1">
**⚠️ 중요 — Sandbox 환경에서 실습하세요:** 현재 프리뷰에서는 **개인 개발환경에서 New(CLI) 에이전트가 정상 작동하지 않습니다**(스킬 패키지 임포트 불가·Copilot 앱 오류·Teams 랜덤 오동작). **실습은 반드시 Sandbox 환경에서 진행**하세요.
</div>

---

## 2. 에이전트 생성 + 지침 작성

> **▶ 목표:** 빈 에이전트를 만들고, 6요소의 뼈대인 **지침**을 작성합니다.

### 2.1 에이전트 만들기

1. **Create / New agent** 클릭.
2. 이름·설명 입력 (예: 이름 `통신사 세일즈 어시스턴트`).
3. 생성되면 **Build** 화면으로 진입 — 여기에 지침·지식·도구·스킬이 한 화면에 모입니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3_3.png' | relative_url }}" alt="새 에이전트 생성 다이얼로그 / Build 화면 개요" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새 에이전트 생성 다이얼로그 / Build 화면 개요</figcaption>
</figure>

### 2.2 지침 작성 — 뼈대

지침 칸에 아래를 붙여넣습니다. **"무엇을"만 쉬운 말로, "어떻게"는 에이전트에 맡깁니다.**

```
당신은 팀의 판매 데이터를 분석하고, 그 결과로 메일과 보고서를 만들어 주는 어시스턴트입니다.
SharePoint에 올라온 판매 엑셀과 안내용 Word 문서를 참고합니다.

## 분석할 때
- 엑셀 숫자는 눈대중으로 답하지 말고 실제로 계산해서 정확한 값을 알려주세요.
- 답하기 전에 "무엇을 계산할지" 한 줄로 먼저 알려주세요.
- 결과는 표로 깔끔하게 정리하고, 한·두 줄로 핵심을 짚어주세요.
- 데이터에 없는 숫자는 만들지 마세요.

## 메일·보고서를 만들 때
- 메일·보고서는 회사 디자인 규칙(메일·보고서 스킬)을 그대로 따르세요. (색·서식 임의 변경 금지)
- 안내용 Word 문서가 있으면 그 말투와 형식을 따르세요. (숫자는 항상 엑셀에서)
- 보고서는 HTML 형식으로 만들고, 다운로드할 수 있게 해주세요.
- 큰 HTML 보고서를 메일에 첨부할 때는 파일을 그대로 붙이지 말고 링크로 첨부하세요.

## 메일 보낼 때 (중요)
- 받는 사람을 알려주지 않으면 먼저 물어보세요.
- 보내기 전에 받는 사람·제목·내용을 미리 보여주고, 확인을 받은 뒤에만 보내세요.
- 사외 주소가 섞이면 한 번 더 확인하세요.

## 지킬 점
- 숫자는 항상 분석 결과만 쓰고, 지어내지 않습니다.
- 디자인은 회사 규칙(스킬)을 따르고 임의로 바꾸지 않습니다.
- 메일은 항상 확인을 받은 뒤에만 보냅니다.
```

### 2.3 지침 작성 팁

- **무엇을만, 어떻게는 맡긴다** — 코드·경로·라이브러리는 적지 않는다.
- **단일 출처** — 색·절차 같은 세부는 지침에 박지 말고 **"스킬을 따르라"고 가리키기**.
- **비가역 행동엔 확인 게이트** — 메일 발송은 "확인 후에만".
- **가드레일은 부정형으로** — "없는 숫자 만들지 않기", "확인 전 발송 금지".
- **짧게** — 지침은 항상 로드되니 길면 핵심이 묽어진다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3_4.png' | relative_url }}" alt="지침 입력 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>지침 입력 화면</figcaption>
</figure>

> **짚고 가기:** 지침은 "회사 디자인 규칙은 스킬을 따르라"고만 적고, 실제 색·템플릿은 2·3단계의 스킬에 둡니다. 이렇게 해야 에이전트가 메일·보고서를 만들 때 **반드시 스킬을 펼쳐** 디자인·안전 규칙까지 함께 적용합니다.
