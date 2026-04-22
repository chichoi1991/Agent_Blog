---
layout: chapter
title: "프롬프트 도구 활용법"
short_title: "프롬프트 도구 활용법"
description: "[리뉴얼] Copilot Studio 기본 기능 살펴보기 - AI Prompt 도구로 일관된 HTML 응답 설계"
order: 9
category: workshop
parent: "ws5"
---

## Step 9: 프롬프트 도구 활용법

# AI Prompt 도구 추가 및 HTML 응답 설계

## AI Prompt 도구(Generative Actions)란?

코드 작성, HTML 형식으로 메일 발송의 경우 기본적으로 Agent가 코드를 생성하여 처리할 수 있지만, 이 경우 작업이 수행될 때 마다 항상 새로운 스타일의 코드가 작성됩니다.

이 경우, 오케스트레이션을 위해 할당된 지침의 컨텍스트에 코드 패턴을 입력하는데 많은 토큰이 소모되고, 생성된 코드의 일관성도 보장하기 어렵습니다.

**AI Prompt 도구** 는 Copilot Studio에서 사전에 정의한 프롬프트를 에이전트의 도구로 등록하는 기능입니다.  

이 도구를 통해 에이전트는 사용자 요청에 따라 이 도구를 호출하여, **고정된 형식의 AI 생성 출력(텍스트·HTML 등)**을 얻을 수 있습니다.

| 항목 | 설명 |
|------|------|
| **등록 위치** | 에이전트 → 도구 → AI Prompt |
| **입력** | 프롬프트 템플릿 + 런타임 변수 |
| **출력** | AI가 생성한 텍스트 (HTML, Markdown, JSON 등 포맷 자유롭게 지정 가능) |
| **활용 예시** | 제품 비교표 HTML 생성, 보고서 초안 작성, 요약 카드 생성 등 |

<br>

---

## 1. AI Prompt 도구 추가

### 1-1. 도구 추가 시작

에이전트 개요 화면 **도구** 섹션 → **+ 도구 추가** 를 클릭합니다.  
도구 유형 목록에서 **프롬프트** 를 선택합니다.
![1]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20020111.png)


<br>

### 1-2. 프롬프트 편집기 구성

프롬프트 편집기가 열리면 아래 항목을 입력합니다.

**도구 이름:**
```
HTML_Response_Generator
```

### 1-3. 입력 변수 정의

프롬프트에서 사용할 입력 변수를 추가합니다.
변수는 / 를 입력하거나 지침 하단 **입력 변수 추가** 버튼을 클릭하여 생성할 수 있습니다.

| 변수명 | 유형 | 설명 |
|--------|------|------|
| `content` | 텍스트 | HTML로 변환할 원본 응답 내용 |
| `card_type` | 텍스트 | 카드 유형 (info / warning / product / report) |


![2]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20021214.png)

<br>

### 1-4. 프롬프트 작성

아래 프롬프트를 입력합니다.

```
당신은 HTML 카드 생성 전문가입니다. 메일 주제에 따라 적절한 스타일의 Microsoft Teams 적응형 카드 형식으로 HTML을 생성해 주세요.


## 입력 정보
- 카드 유형: {{card_type}}
- 내용: {{content}}

## 카드 유형별 스타일 규칙
- info: 파란색 헤더 (#0078D4), 일반 정보 표시
- warning: 주황색 헤더 (#F7630C), 주의사항 강조
- product: 초록색 헤더 (#107C10), 제품 정보 카드
- report: 회색 헤더 (#605E5C), 업무 보고서 형식

## 출력 규칙
- 반드시 완성된 HTML 코드만 출력합니다. 설명 텍스트는 포함하지 않습니다.
- 최대 너비 600px, 내부 패딩 16px 적용
- 제목은 굵은 흰색 텍스트로 헤더에 표시
- 내용의 목록은 <ul><li> 태그로 변환
- 표 데이터는 <table> 태그로 변환, 줄무늬 스타일 적용
- 모든 인라인 스타일 사용 (외부 CSS 금지)

## 출력 HTML 구조#1 - 업무 현황 보고서 유형 예시

<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; color: #000000;">
  <!-- 헤더 -->
  <div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #1976d2;">
    <h1 style="color: #1565c0; margin: 0; font-size: 24px;">📊 {{보고서_제목}}</h1>
    <p style="color: #424242; margin: 10px 0 0 0; font-size: 14px;">보고일: {{보고일}}</p>
  </div>
  <!-- 인사말 -->
  <div style="padding: 15px; margin-bottom: 20px;">
    <p style="color: #212121; font-size: 15px; line-height: 1.6;">안녕하세요, {{수신자}} 👋</p>
    <p style="color: #212121; font-size: 15px; line-height: 1.6;">{{인사말_본문}}</p>
  </div>
  <!-- 우선순위 요약 -->
  <div style="background-color: #fff9c4; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 5px solid #f57f17;">
    <h2 style="color: #f57f17; font-size: 18px; margin: 0 0 15px 0;">📌 이번 주 우선순위</h2>
    <table style="width: 100%; border-collapse: collapse; color: #212121; font-size: 14px;">
      <thead>
        <tr style="background-color: #fff59d;">
          <th style="padding: 10px; text-align: left; border: 1px solid #f9a825;">순위</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #f9a825;">업무</th>
          <th style="padding: 10px; text-align: center; border: 1px solid #f9a825;">마감</th>
          <th style="padding: 10px; text-align: center; border: 1px solid #f9a825;">상태</th>
        </tr>
      </thead>
      <tbody>
        {{#each 우선순위_목록}}
        <tr>
          <td style="padding: 10px; border: 1px solid #f9a825;">{{순위}}</td>
          <td style="padding: 10px; border: 1px solid #f9a825;">{{업무명}}</td>
          <td style="padding: 10px; text-align: center; border: 1px solid #f9a825;"><strong>{{마감일}}</strong></td>
          <td style="padding: 10px; text-align: center; border: 1px solid #f9a825;">{{상태}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
  </div>
  <!-- 서명 -->
  <div style="padding: 15px; border-top: 2px solid #e0e0e0; margin-top: 20px;">
    <p style="color: #212121; font-size: 14px;">감사합니다. 😊</p>
    <p style="color: #616161; font-size: 13px;">{{발신자_이름}}</p>
  </div>
</div>

## 출력 HTML 구조#2 - 데이터 리포트 유형 예시 (info)

<div style="max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
  <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <h1 style="color: #2c3e50; text-align: center;">📊 {{리포트_제목}}</h1>
    <p style="color: #7f8c8d; text-align: center; font-size: 14px;">조회 기간: {{조회_시작}} ~ {{조회_종료}}</p>
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 8px; margin-bottom: 30px;">
      <h2 style="color: #fff; font-size: 18px;">요약 정보</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px; color: #fff;">총합:</td><td style="padding: 10px; color: #fff; text-align: right;">{{총합}}</td></tr>
        <tr><td style="padding: 10px; color: #fff;">평균:</td><td style="padding: 10px; color: #fff; text-align: right;">{{평균}}</td></tr>
      </table>
    </div>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <thead>
        <tr style="background-color: #3498db;">
          <th style="padding: 12px; color: #fff; border: 1px solid #ddd;">기간</th>
          <th style="padding: 12px; color: #fff; border: 1px solid #ddd;">값</th>
          <th style="padding: 12px; color: #fff; border: 1px solid #ddd;">상태</th>
        </tr>
      </thead>
      <tbody>
        {{#each 데이터_목록}}
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">{{기간}}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">{{값}}</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{상태}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
  </div>
</div>
```

<br>

### 1-5. 저장

프롬프트 작성 완료 스크롤을 내려 **저장** 버튼을 클릭하고 **추가 및 구성** 버튼을 눌러 도구 등록을 완료합니다.
![3]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20021621.png)
<br>

## 1-6. 도구 입력 변수 설명 추가

도구 추가가 완료 되었다면, 스크롤을 내려 입력 탭에 각 입력 변수에 대한 설명을 추가합니다.
기본적으로 AI로 동적으로 채우기가 되어있으며, 값 부분에 **사용자 지정** 을 선택하여 아래 설명으로 업데이트 하고 저장해 줍니다.

| 변수명 | 유형 | 설명 |
|--------|------|------|
| `content` | 텍스트 | HTML로 변환할 원본 응답 내용입니다. |
| `card_type` | 텍스트 | 카드 유형 입니다. (info / report) info는 데이터 리포트일 경우, report는 일반 업무 브리핑일 경우 사용됩니다. |

![4]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022018.png)

---

## 2. 지침 업데이트

에이전트 지침의 `#메일 작성 규칙` 섹션을 아래와 같이 수정합니다.

```
#메일 작성 규칙
HTML 결과물 생성을 위해 /HTML_Response_Generator 를 호출하여 반환된 HTML 코드를 기반으로 메일 발송을 합니다.
도구에 들어가야할 내용은 다음과 같습니다.
- content : 데이터 조회를 통해 받은 원본 값 입니다
- card_type: content의 내용에 따라 report | info 둘 중 하나를 입력 합니다.  
-- 업무 브리핑 → card_type: "report"
-- 일반 안내 → card_type: "info"

```

지침에서 / 를 입력하면 도구 호출을 위한 프롬프트 템플릿이 자동으로 삽입됩니다.
![5]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022433.png)
![6]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022448.png)

<br>

---

## 3. 동작 확인

테스트 패널에서 아래 질문을 입력합니다.

**데이터 리포트 HTML 카드 테스트:**
```
이번 주 주요 이슈를 정리해서 "메일 주소"로 보내줘
```
→ 에이전트가 데이터 조회 후 → HTML_Response_Generator를 호출하여 HTML 카드 형식으로 메일을 발송합니다.

![7]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022837.png)
![8]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022851.png)

**업무 브리핑 HTML 카드 테스트:**
```
오늘 업무 현황을 정리해서 나에게 보내줘
```
→ Work IQ 등 데이터 조회 후 → report 유형 HTML 카드로 메일을 발송해야 합니다.
![9]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20023607.png)

<br>

> **💡 팁:** 에이전트 테스트 화면에서는 HTML이 렌더링되지 않고 코드로 보일 수 있습니다.  
> 실제 메일을 수신하였을 때에는 HTML이 정상 렌더링되어 카드 형태로 표시됩니다.

<br>

---

← [이전: Step 8. 트리거 추가]({{ '/chapters/ws5-8-trigger/' | relative_url }}) | [다음: Step 10. Excel 기반 데이터 활용법]({{ '/chapters/ws5-10-excel-filter/' | relative_url }}) →
