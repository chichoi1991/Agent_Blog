---
layout: chapter
title: "커스텀 에이전트 만들기 기초편 #3"
short_title: "기초편 #3: 자율동작 에이전트"
description: "플로우변수토픽 없이 지침과 도구(MCP)만으로 자율 동작하는 커스텀 엔진 에이전트를 구현하는 핸즈온 실습입니다. Work IQ, ThinQ MCP, AI Prompt, Excel 연동, Teams 배포까지 진행합니다."
order: 3
icon: "🔌"
category: workshop
---

---

## 실습 개요

# 커스텀 엔진 에이전트 만들기 기초편 #3

## 지침과 도구 중심의 자율 동작 에이전트 구현

이번 실습은 **플로우·변수·토픽 사용을 최소화**하고, 에이전트 지침(Instructions)과 도구(Tools), MCP만으로 에이전트가 스스로 흐름을 판단하고 동작하는 자율형 커스텀 엔진 에이전트를 만들어보는 실습입니다.

<br>

---

## 🎯 구현 목표

| 항목 | 내용 |
|------|------|
| **아키텍처 방향** | 플로우·변수·토픽 사용 최소화 → 지침 + 도구 + MCP 기반 자율 오케스트레이션 |
| **에이전트 배포** | Copilot Studio에서 생성·설정 후 Microsoft Teams 채널에 게시 |
| **모니터링** | Studio 내 대화 모니터링 (시간 여유 시 진행) |

<br>

---

## 🧠 에이전트 지식 소스

에이전트는 아래 지식 소스를 활용하여 사용자 질문에 답변합니다.

| 지식 소스 | 유형 | 비고 |
|-----------|------|------|
| **메일** | Microsoft 365 커넥터 | 사용자 메일함 조회·발송 |
| **SharePoint (Word 문서)** | SharePoint 지식 연결 | 기본 실습 대상 |
| **SharePoint (Excel 데이터)** | SharePoint + AI Prompt 도구 | 심화 실습 대상 |
| **ThinQ MCP** | MCP 서버 연결 | LG 가전 제품 데이터 조회 |

<br>

---

## 📋 실습 시나리오 및 아젠다

### 1단계 · 에이전트 생성 및 기본 설정
- Copilot Studio에서 커스텀 엔진 에이전트 신규 생성
- 에이전트 이름, 아이콘, 기본 언어 설정
- 에이전트 지침(Instructions) 작성
  - 역할 및 페르소나 정의
  - 도구 사용 우선순위 및 응답 방식 지시
  - 자율 오케스트레이션을 유도하는 지침 패턴 작성

### 2단계 · 지식 소스 연결
- SharePoint 문서(Word) 지식 소스로 등록

### 3단계 · MCP 도구 추가 — ThinQ MCP
- ThinQ MCP 서버 연결 방법 안내
- MCP 도구 목록 확인 및 에이전트에 추가
- 가전 제품 데이터 조회 테스트
- **학습 포인트:** 코드 없이 외부 데이터 소스를 MCP로 연결하는 패턴 이해

### 4단계 · Work IQ MCP 추가 및 워크플로우 구성
- Work IQ MCP 서버 연결
- 지침을 통해 MCP 도구 호출 순서·조건을 제어하는 방법 실습
- 플로우 없이 지침만으로 다단계 작업 흐름을 구성하는 패턴 학습
- **학습 포인트:** 에이전트가 도구를 스스로 조합하여 워크플로우를 실행하는 원리

### 5단계 · AI Prompt 도구 추가 — HTML 응답 템플릿
- AI Prompt 도구(Generative Actions) 추가
- 고정된 HTML 레이아웃을 출력하는 프롬프트 설계
- 에이전트 응답에 HTML 카드 형식 답변 적용
- **학습 포인트:** AI Prompt 도구를 활용해 일관된 디자인의 응답 포맷 구현

### 6단계 · Excel 데이터 필터링 + AI Prompt 연동 (심화)
- SharePoint에 업로드된 Excel 데이터 소스 연결
- 사용자 수준·상황에 맞는 데이터 행(Row) 필터링 로직 지침으로 구현
- 필터링된 Row 데이터를 AI Prompt 도구에 전달하여 맞춤형 답변 생성
- **학습 포인트:** 정형 데이터(Excel) ↔ 생성형 AI(AI Prompt)를 연결하는 패턴

### 7단계 · Teams 채널 배포
- 에이전트 게시(Publish) 및 Teams 채널 등록
- 채널에서 에이전트 동작 검증
- (선택) Copilot Studio 모니터링 탭에서 대화 로그 확인

<br>

---

## 🗂️ 실습 목차

| # | 실습 내용 | 소요 시간 |
|---|-----------|-----------|
| 1 | [에이전트 생성 및 지침 작성](./1.%20에이전트%20생성%20및%20지침%20작성.md) | 15분 |
| 2 | [지식 소스 연결 (SharePoint · 메일)](./2.%20지식%20소스%20연결.md) | 10분 |
| 3 | [ThinQ MCP 도구 추가](./3.%20ThinQ%20MCP%20도구%20추가.md) | 15분 |
| 4 | [Work IQ MCP 및 워크플로우 구성](./4.%20Work%20IQ%20MCP%20및%20워크플로우%20구성.md) | 20분 |
| 5 | [AI Prompt 도구 및 HTML 응답 설계](./5.%20AI%20Prompt%20도구%20추가.md) | 20분 |
| 6 | [Excel 데이터 필터링 + AI Prompt 연동 (심화)](./6.%20Excel%20데이터%20필터링.md) | 20분 |
| 7 | [Teams 채널 배포 및 테스트](./7.%20Teams%20배포.md) | 10분 |

<br>

---

## 💡 이전 실습과의 차이점

| | 기초#2 | **기초#3 (이번 실습)** |
|---|--------|------------------------|
| **오케스트레이션** | 토픽·플로우 중심 | **지침·도구·MCP 중심** |
| **로직 구현 방식** | Power Automate 플로우 | 에이전트 지침으로 자율 판단 |
| **데이터 소스** | SharePoint 문서 | SharePoint + MCP + Excel |
| **응답 포맷** | 텍스트 | **HTML 카드 템플릿** |
| **배포 대상** | Teams (개인 채팅) | **Teams 채널** |

<br>

---

## 🔧 사전 준비 사항

실습 전 아래 항목을 확인해 주세요.

- [ ] Microsoft 365 라이선스 (Copilot Studio 접근 권한 포함)
- [ ] SharePoint 사이트 생성 및 실습용 Word·Excel 파일 업로드 완료
- [ ] ThinQ MCP 서버 접속 정보 확인
- [ ] Work IQ MCP 서버 접속 정보 확인
- [ ] Microsoft Teams 채널 생성 (배포 대상 채널)

<br>

---

> 이전 실습 자료:
> [커스텀 에이전트 만들기-기초#1](../커스텀%20에이전트%20만들기-기초%231/README.md) · [커스텀 에이전트 만들기-기초#2](../커스텀%20에이전트%20만들기-기초%232/readme.md)


---

## Step 1: 에이전트 생성 및 지침 작성

# 1. 에이전트 생성 및 지침 작성

> **이전 단계:** [README - 실습 개요](./README.md) | **다음 단계:** [2. 지식 소스 연결](./2.%20지식%20소스%20연결.md)

---

## 1. Copilot Studio 접속 및 환경 선택

[Copilot Studio](https://copilotstudio.microsoft.com) 에 접속합니다.

접속 후 우측 상단 환경 선택 메뉴에서 로그인한 계정의 이름이 표시되는 **실습 환경**으로 전환되었는지 확인합니다

> 환경이 잘못 선택된 경우 에이전트가 다른 환경에 생성될 수 있으므로 반드시 확인해 주세요.

![Copilot Studio 환경 선택 화면]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20194438.png)

<br>

---

## 2. 커스텀 엔진 에이전트 생성

좌측 패널의 에 **에이전트** 를 클릭한 후 우측 상단의 **+ 빈 에이전트 만들기** 를 선택합니다.

![Copilot Studio 에이전트 만들기#1]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20194805.png)

> 만약 에이전트가 영어로 표시되는 경우, 빈 에이전트 만들기를 클릭하지 말고, 아래 꺽쇠를 클릭한 후 고급 만들기를 선택, 에이전트 설정 창에서 언어가 언어가 **ko-KR**  또는 **한국어** 로 설정되어 있는지 확인하고, 설정되어 있지 않다면 변경하고 확인 및 만들기를 선택합니다.

![Copilot Studio 에이전트 만들기#2]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20195027.png)

![Copilot Studio 에이전트 만들기#3]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20195117.png)


이번 실습은 자연어 마법사를 건너뛰고 곧바로 **만들기** 버튼을 클릭하여 에이전트를 생성합니다.

<br>

---

## 3. 에이전트 기본 설정

에이전트가 생성되면 다음과 같은 UI가 표시됩니다. 우측 상단의 **설정** 을 클릭하여 아래 항목을 구성합니다.

| 설정 항목 | 값 |
|-----------|-----|
| 생성형 오케스트레이션 | **활성화** |
| 일반 참조 자료 사용 | 활성화 |
| 웹의 정보 사용 | 비활성화 |
| 코드 인터프리터 | 활성화 |
| 작업 IQ 켜기 | 활성화 |

<br>

![에이전트 설정]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20203420.png)

설정을 완료한 후 하단의 **저장** 버튼을 누르고 우측 상단의 X 버튼을 눌러 기본 설정 창으로 돌아옵니다.
<br>

다음으로 Agent의 메인 언어모델을 선택합니다.
조직 설정에 따라 OpenAI의 GPT 모델 뿐만 아니라 Anthropic의 Claude, Opus모델도 선택 할 수 있습니다.
이번 실습에서는 **Claude Sonnet 4.6** 을 선택합니다.

![에이전트 설정 - 언어모델]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20200055.png)

---

## 4. 에이전트 이름 및 설명 입력

에이전트 개요 화면에서 **상세정보** 탭 우측의 **편집** 아이콘을 클릭하고 아래 내용을 입력합니다.

| 항목 | 예시 값 |
|------|---------|
| 이름 | `가전제품 컨트롤 및 리포트 에이전트` |
| 설명 | `가전 정보 조회, 사내 문서 검색, Excel 데이터 분석, 메일 발송을 하나의 대화로 처리하는 업무 도우미 에이전트입니다.` |
![에이전트 설정 - 기본정보]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20201338.png)

<br>

---

## 5. 에이전트 지침(Instructions) 작성

**지침** 탭 우측의 **편집** 을 클릭하여 아래 지침을 입력합니다.

지침은 에이전트의 역할, 도구 사용 방식, 응답 포맷을 자연어로 설명하는 핵심 설정입니다.  
플로우·토픽 없이 에이전트가 스스로 판단하도록 유도하려면 **명확하고 구체적인 지침**이 필요합니다.

![지침 추가]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20202704.png)

```
#역할
사용자의 질문과 요청사항에 친절히 답변하는 에이전트 입니다.

#스킬
1. ThinQ 디바이스 컨트롤- 사용자가 LG 가전제품 (ThinQ를 의미합니다)에 관한 질문, 요청을 하면 ThinkQ MCP를 호출하여 조회,답변합니다.- 조회된 데이터는 마크다운과 이모티콘을 활용하여 가독성을 높입니다.
2. 메일 관련 업무- 사용자가 메일 관련된 요청사항(메일 발송 요청 및 수신 조회 등)을 할 경우, Work IQ mail MCP 도구를 이용합니다.- 특히, 메일발송을 할 경우, 메일 작성 규칙 에 따라 HTML 형식으로 이모티콘과 스타일을 활용하여 디자인을 이쁘게 만들어 발송합니다. - 글씨와 배경은 보색을 이루어 가독성을 높이도록 합니다.
3.말장난- 말장난을 조회 하여 사용자들을 웃깁니다. 
- 주의사항- 가전제품 중 틔운 미니가 있습니다. 원문 그대로 "틔운 미니"로 출력합니다.- 작업을 완료하면 랜덤하게 개그를 조회하여 말장난을 출력하여 사용자를 웃깁니다.


#메일 작성 규칙
HTML 결과물 생성 시 다음을 반드시 준수하라.  
1. 모든 텍스트 색상은 검정 계열(#000000 ~ #333333)로 강제한다.  
2. 흰색(#ffffff) 텍스트 사용을 절대 금지한다.  
3. linear-gradient, 어두운 배경, 다크 테마 스타일을 사용하지 않는다.  
4. 모든 텍스트 요소(h1~p, li, td, th)에 인라인 style로 color를 명시한다.  
5. 메일/Outlook/모바일 환경에서도 가독성이 유지되어야 한다.  
6. 디자인보다 시인성과 안정성을 최우선으로 한다.


```

<br>

> **💡 지침 작성 팁**
> - 도구 이름을 지침에 직접 언급하면 에이전트의 도구 선택 정확도가 높아집니다.
> - 응답 포맷(HTML, 표, 목록 등)을 지침에 명시하면 일관된 답변을 받을 수 있습니다.
> - 지침은 에이전트 업데이트 후 테스트를 반복하며 개선해 나가는 것이 좋습니다.

<br>

---

## 6. 저장 및 동작 확인

지침 작성 후 **저장** 버튼을 눌러 저장합니다.

우측 테스트 패널에서 아래 질문을 입력하여 기본 동작을 확인합니다.

```
어떤 일을 도와줄 수 있나요?
```


![에이전트 테스트]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20203618.png)

에이전트가 역할에 맞는 인사와 안내를 응답하면 1단계 완료입니다.

<br>

---

> **다음 단계:** [2. 지식 소스 연결 (SharePoint · 메일)](./2.%20지식%20소스%20연결.md)


---

## Step 2: 지식 소스 연결

# 2. 지식 소스 연결 (SharePoint · 메일)

> **이전 단계:** [1. 에이전트 생성 및 지침 작성](./1.%20에이전트%20생성%20및%20지침%20작성.md) | **다음 단계:** [3. Work IQ MCP 도구 추가](./3.%20Work%20IQ%20MCP%20도구%20추가.md)

---

## Copilot Studio 지식 소스(Knowledge)란?

지식 소스는 에이전트가 사용자 질문에 답변할 때 참고하는 **내부 문서, 데이터 저장소**를 의미합니다.  
지식 소스를 연결하면 에이전트가 일반 언어 모델 지식 외에 **조직 내부 데이터**를 기반으로 답변할 수 있습니다.

| 지식 소스 유형 | 주요 사용 사례 |
|---------------|---------------|
| SharePoint | 사내 문서, 매뉴얼, 보고서 검색 |
| 파일 업로드 (PDF, Word 등) | 특정 문서 고정 참조 |
| 공개 웹 URL | 외부 웹페이지 참조 |
| Dataverse 테이블 | 구조화된 데이터 질의 |

이번 실습에서는 **SharePoint** 에서 등록된 문서를 연결합니다.

<br>

---

## 1. SharePoint 문서 지식 소스 연결

### 1-1. 참조 자료 추가 시작

에이전트 개요 화면에서 스크롤을 내려 **참조 자료** 섹션을 찾습니다.  
**+ 참조 자료 추가** 버튼을 클릭합니다.
![참조 자료 추가]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20220355.png)
<br>

### 1-2. SharePoint 선택

팝업 창에서 **SharePoint** 를 선택합니다.
![참조 자료 추가]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20220426.png)
<br>

### 1-3. SharePoint 경로 입력

SharePoint 사이트 주소 또는 특정 라이브러리 폴더 경로를 입력합니다.

정확한 경로를 확인하려면:
1. SharePoint 사이트 → 해당 라이브러리 폴더로 이동
2. 우측 상단 **세부 정보** 클릭
3. 사이드 패널 하단의 **경로** 복사

경로를 붙여넣고 **추가** 를 클릭합니다.

또는, 아래와 같이 **항목 찾아보기** 버튼을 클릭하여 탐색할 수도 있습니다.
여기서 Communication site → CopilotStudio_실습자료 → Spec Sheet 순으로 탐색하여 선택합니다.
![SharePoint 경로 입력#1]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20220442.png)
![SharePoint 경로 입력#2]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20220507.png)
<br>

### 1-4. 지식 소스 설명 입력

추가된 지식 소스의 **설명** 란에 아래 내용을 입력합니다.  
설명이 구체적일수록 에이전트가 해당 지식 소스를 적절한 상황에서 활용합니다.

```
이 참조 자료는 냉장고와 식기세척기에 대한 기술 제원 및 정보를 제공합니다. 
사용자가 냉장고와 식기세척기에 대한 기술 제원 및 정보를 질문할 때 이 자료를 우선 참고합니다.
```
![SharePoint 경로 입력#3]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20220600.png)

<br>

---

## 2. 동작 확인

우측 테스트 패널에서 아래 질문을 입력하여 정상적으로 참고하여 답변을 하는지 확인합니다.

**SharePoint 지식 소스 테스트:**

```
ThinQ 를 지원하는 식기세척기 라인업을 정리해줘
```

에이전트가 SharePoint 문서를 인용하여 답변을 하면 2단계 완료입니다.
![SharePoint 지식 소스 테스트]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20221651.png)

<br>

---

> **다음 단계:** [3. Work IQ MCP 도구 추가](./3.%20Work%20IQ%20MCP%20도구%20추가.md)


---

## Step 3: Work IQ MCP 도구 추가

# 3. Work IQ MCP 추가

> **이전 단계:** [2. 지식 소스 연결](./2.%20지식%20소스%20연결.md)  | **다음 단계:** [4. ThinQ MCP 도구 추가](./4.%20ThinQ%20MCP%20도구%20추가.md)

---

## MCP(Model Context Protocol)란?

**MCP(Model Context Protocol)** 는 AI 에이전트가 외부 도구, 데이터 소스, 서비스와 표준화된 방식으로 통신할 수 있도록 설계된 오픈 프로토콜입니다.

| 항목 | 설명 |
|------|------|
| **목적** | AI 모델 ↔ 외부 시스템 간 표준 인터페이스 제공 |
| **장점** | 코드 없이 외부 서비스의 기능을 에이전트 도구로 추가 가능 |
| **구조** | MCP 서버가 도구(Tools) 목록을 노출 → 에이전트가 필요 시 호출 |
| **활용 예시** | 가전 제품 데이터 조회, 업무 시스템 연동, 외부 API 호출 등 |

Copilot Studio에서는 MCP 서버 URL만 입력하면 해당 서버가 제공하는 모든 도구를 에이전트에 추가할 수 있습니다.

<br>

---

## Work IQ MCP 소개

**Work IQ MCP** 는 업무 생산성 데이터(일정, 할일, 회의, 팀 현황 등)에 접근할 수 있는 MCP 서버입니다.  
에이전트에 연결하면 사용자의 업무 컨텍스트를 파악하고, 여러 도구를 조합하여 다단계 업무 흐름을 자율적으로 처리할 수 있습니다.

| 항목 | 내용 |
|------|------|
| **제공 기능** | 일정 조회, 할일 관리, 팀원 현황, 업무 알림 등 |
| **연결 방식** | 도구 추가와 같이 카탈로그를 통해 간단하게 추가 가능|
| **핵심 학습 포인트 #1** | 지침만으로 Multi-step 워크플로우를 구성하는 방법 |
| **핵심 학습 포인트 #2** | 참조자료만으로 답변이 부족할 때, M365 Copilot의 엔터프라이즈 검색 기능 활용(Fallback 구현)|

<br>


---

## 1. Work IQ MCP 서버 연결

### 1-1. Work IQ 활성화

에이전트 개요 화면 **도구** 하단의 Work IQ를 활성화 합니다. 해당 기능이 활성화 되면, Fallback 시 Work IQ의 엔터프라이즈 검색 기능을 활용하여 참조자료에 없는 정보도 검색할 수 있습니다.

![2]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20222922.png)

### 1-2. Work IQ Mail 도구 추가

이후 상단의 **도구** 섹션 → **+ 도구 추가** → **MCP** 탭을 선택합니다.
![3]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20222958.png)

### 1-3. WorkIQ Mail MCP 도구 선택

스크롤을 내려 Microsoft가 기본으로 제공하는 WorkIQ Mail MCP 도구를 선택합니다. 
![4]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20223021.png)


### 1-4. 연결 정보 입력
최초 연결시, 아래와 같이 도구 사용을 위해 새로운 연결이 필요합니다.
가이드에 따라 차근차근 연결을 클릭하고, 현재 로그인된 정보를 기반으로 연결을 완료하고 마지막으로 **추가 및 구성** 을 선택합니다.
![5]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20223051.png)
![6]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20223110.png)
![7]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20223124.png)
![8]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20223139.png)




### 1-5. 도구 목록 확인 및 선택

연결이 성공 하면 아래와 같이 MCP서버에서 사용할 수 있는 도구 리스트가 표시되며, 기본적으로 모든 도구를 사용할 수 있습니다.
단, 필요에 따라 특정 도구는 비활성화 할 수 있습니다. 이번 실습에서는 모든 도구를 활성화 상태로 유지합니다.

| 도구 예시 | 설명 |
|-----------|------|
| `AddDraftAttachments` | 초안에 첨부 파일 추가 |
| `UpdateDraft` | 초안 업데이트 |
| `SendEmailWithAttachments` | 첨부 파일과 함께 이메일 발송 |
| `SearchMessagesQueryParameters` | 검색 쿼리기반 메일 검색 |
![9]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20223226.png)

<br>
도구 리스트를 확인 후, 상단의 도구 버튼을 눌러 나오게 되면 현재 이용할 수 있는 도구 목록에 Work IQ Mail과 Copilot 도구가 추가된 것을 확인할 수 있습니다.

![10]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20223327.png)
---

## 2. 지침 기반 워크플로우 구성

이번 단계의 핵심입니다.  
Power Automate 플로우 없이 **에이전트 지침만으로** 다단계 워크플로우를 어떻게 구성하는지 살펴봅니다.

### 기존 방식 vs 지침 기반 방식 비교

| 항목 | 기존 플로우 방식 | **지침 기반 방식 (이번 실습)** |
|------|-----------------|-------------------------------|
| 워크플로우 정의 위치 | Power Automate 플로우 캔버스 | 에이전트 지침(Instructions) |
| 조건 분기 | 조건 카드(If/Else) | 지침의 자연어 조건 설명 |
| 도구 호출 순서 | 플로우 단계 순서 | 지침의 "~한 경우 ~를 먼저 한다" |
| 변수 전달 | 플로우 변수 | 에이전트가 대화 맥락으로 자동 관리 |
| 유지보수 | 플로우 편집 | 지침 텍스트 수정 |

<br>

### 2-1. 지침에 워크플로우 시나리오 추가

에이전트 지침의 `## 도구 사용 원칙` 섹션에 아래 내용을 추가합니다.

```
## 업무 지원 워크플로우
### 📅 오늘의 업무 사항 정리 요청 시:
사용자가 "오늘 일정", "메일 업무 정리" 등을 요청하면 아래 순서로 진행합니다.
1. Work IQ Mail 도구로 메일을 조회합니다.
2. 메일 내용중에 식기세척기, 냉장고와 관련된 문의 및 협조 요청이 있을 경우 지식소스를 통해 답변 및 판단을 할 수 있는 기초 정보를 수집하여 제공합니다.
3. 조회된 정보를 종합하여 "오늘의 업무 브리핑" 형식으로 정리하여 답변합니다.
4. 내용이 부족할 경우, Work IQ Copilot을 이용하여 추가 질의를 통해 정보를 수집합니다

### 📧 업무 보고 메일 발송 요청 시:
사용자가 업무 보고 메일 발송을 요청하면 아래 순서로 진행합니다.
1. "오늘의 업무 사항 정리" 절차를 통해 해야할 업무들을 조회합니다.
2. 조회된 내용을 바탕으로 보고 메일 초안을 작성하여 사용자에게 확인을 받습니다.
3. 사용자가 승인하면 Work IQ Mail 도구로 메일을 발송합니다.
중요!  메일 발송시에는 **메일 발송 규칙** 을 반드시 준수해야 합니다.
```

<br>

> **💡 핵심 원리 이해**
>
> 에이전트는 지침을 읽고 사용자 요청에 맞는 워크플로우를 **스스로 판단하여 실행**합니다.  
> "1 → 2 → 3 순서로 도구를 호출하라"는 지침이 있으면, 별도 플로우 없이도 에이전트가 해당 순서를 따릅니다.  
> 이것이 **생성형 오케스트레이션(Generative Orchestration)** 의 핵심입니다.

<br>

---

## 3. 동작 확인

우측 테스트 패널에서 아래 시나리오를 순서대로 테스트합니다.

**시나리오 — 오늘의 업무 브리핑:**
```
지금까지 받은 메일을 기반으로 우선순위와 액션플랜을 정리해줘
```
→ 에이전트가 메일들을 조회하고 메일 내용을 기반으로 중요도 및 액션플랜을 제안합니다. 필요시에는 내부 검색을 활용하여 결정을 위한 기반 데이터도 함께 제안합니다.

![12]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20233330.png)

**시나리오 2 — 업무 보고 메일:**
```
이번 주 업무 현황을 팀장님(manager@company.com)께 메일로 보고해줘
```
→ 에이전트가 할일·일정을 조회 → 메일 초안 작성 → 사용자 확인 → 발송 흐름을 따라야 합니다.

![13]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-18%20233710.png)

<br>

---

> **학습 포인트:** Power Automate 플로우를 만들지 않았음에도, 지침의 워크플로우 설명만으로 에이전트가 다단계 작업을 순서대로 수행했습니다. 지침의 구체성이 높을수록 에이전트의 자율 오케스트레이션 품질이 향상됩니다.

<br>

---

> **다음 단계:** [4. ThinQ MCP 도구 추가](./4.%20ThinQ%20MCP%20도구%20추가.md)

---

## Step 4: ThinQ MCP 도구 추가

# 3. ThinQ MCP 도구 추가

> **이전 단계:** [3. Work IQ MCP 도구 추가](./3.%20Work%20IQ%20MCP%20도구%20추가.md) | **다음 단계:** [5. AI Prompt 도구 추가](./5.%20AI%20Prompt%20도구%20추가.md)

---

Copilot Studio에서는 앞선 실습과 같이 카탈로그 형식으로 제공되지 않는 기업내부, 사설 MCP 서버에 대해서도 GUI 방식으로 URL과 인증 토큰 입력하면 해당 서버가 제공하는 모든 도구를 에이전트에 추가할 수 있도록 제공합니다.

이번 실습에서는 사설 MCP 서버인 **ThinQ MCP** 를 에이전트에 연결하여 LG 가전 제품 정보를 조회하는 도구로 활용해보겠습니다.

![1]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20002502.png)

<br>

---

## ThinQ MCP 소개

**ThinQ MCP** 는 ThinQ API를 기반으로 커스텀으로 작성된 MCP 서버입니다.
해당 서버를 통해 내가 등록한 LG 가전 제품 정보를 조회할 수 있는 MCP 서버입니다.  
에이전트에 연결하면 사용자가 자연어로 가전 제품 정보를 질의할 때 에이전트가 자동으로 ThinQ MCP를 호출하여 관련된 정보에 대해 답변 및 설정을 진행합니다.

| 항목 | 내용 |
|------|------|
| **제공 데이터** | LG 가전 제품 사양, 모델 정보, 기능 설명 등 |
| **연결 방식** | MCP 서버 URL 등록 |
| **사용 예시** | "내가 가진 전자 제품 목록 보여줘", "와인셀러 온도 조절해줘" |

<br>

---

## 1. MCP 도구 추가 시작

에이전트 개요 화면에서 **도구** 섹션으로 이동 후 **+ 도구 추가** 를 클릭합니다.

도구 추가 팝업에서 **MCP** 탭 또는 **모델 컨텍스트 프로토콜(MCP)** 옵션을 선택합니다.

<br>

---

## 2. ThinQ MCP 서버 연결

### 2-1. 서버 URL 및 정보 입력

아래 실습을 위한  **ThinQ MCP 서버 URL** 을 입력합니다.

| 항목 | 값 | 설명 |
|-----------|---|---|
| **서버 이름** | `LG_ThinQ_MCP_Tool` | 에이전트 내에서 도구를 식별하기 위한 이름 |
| **서버 설명** | `이 MCP 서버는 ThinQ에 등록된 LG전자 가전 제품들에 대해 다음의 기능을 제공합니다. <br >- 가전 제품 조회 <br> - 가전 제품 설정 조회 변경 <br> - 가전 제품 에너지 사용량 조회` | 에이전트 내에서 도구를 식별하기 위한 설명 입니다. 이 MCP 서버가 제공하는 도구 및 시나리오를 상세하게 적어야 에이전트가 올바르게 동작합니다. |
| **서버 URL** | `https://thinqmcp-http-typescript.gentlewave-94164b21.koreacentral.azurecontainerapps.io/mcp` | ThinQ MCP 서버의 엔드포인트 URL |
| **인증** | `없음` | 이번 실습은 편의를 위해 없음으로 합니다. 필요시 API 키 또는 OAuth로 구성 가능 합니다. |



> 서버 URL은 실습 환경에 따라 다를 수 있습니다. 강사가 제공한 정보를 입력하세요.

입력이 완료되었으면 **만들기** 버튼을 클릭하여 ThinQ MCP 서버를 에이전트에 연결합니다.
![2]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20012243.png)

<br>

### 2-2. 연결 확인

이후 연결창이 나오면, 아래와 같이 순서대로 새로운 연결을 진행합니다.
![4]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20012841.png)

![5]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20012855.png)

![6]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20012907.png)

연결이 완료되고  **추가 및 구성** 버튼을 클릭합니다.  
완료되면  ThinQ MCP 서버가 노출하는 **도구 목록**이 표시됩니다.


| 도구 예시 | 설명 |
|-----------|------|
| `get-thinq-deviceso` | LG ThinQ 플랫폼에 등록된 디바이스 목록을 조회합니다. |
| `get-thinq-device-profile` | LG ThinQ 디바이스의 프로파일(속성, 제어 명령, 알림 정보 등)을 조회합니다. |
| `get-thinq-energy-usage` | 제LG ThinQ 디바이스의 에너지 사용량을 조회합니다. |

![7]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20013123.png)

---

## 3. 지침 업데이트

ThinQ MCP가 추가되었으면, 에이전트가 해당 도구를 활용할 수 있도록 지침을 업데이트해야 합니다. 이번 실습에는 이미 지침에 MCP 도구 활용 방법이 포함되어 있습니다.

<br>

---

## 4. 동작 확인

MCP동작을 위해 먼저 우측 상단의 **설정** → **연결 설정** 탭으로 이동하여 추가된 MCP의 연결을 허용합니다.

![8]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20013436.png)
![9]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20013423.png)

<br>

연결이 완료되었다면, 설정창을 빠져나와 우측 테스트 패널에서 아래 질문을 입력하여 ThinQ MCP 동작을 확인합니다.

```
내가 가진 가전 제품 목록을 나열해
```
![10]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20014327.png)
```
와인셀러 조명을 2단계로 변경해줘
```
![11]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20014600.png)
```
와인셀러 일간 에너지 사용량 알려줘
```

![12]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20014448.png)
에이전트가 ThinQ MCP 도구를 호출하여 제품 정보를 응답하면 4단계 완료입니다.

> **학습 포인트:** 코드 한 줄 없이 MCP 서버 URL 등록만으로 외부 데이터 소스를 에이전트 도구로 연결했습니다. 이 패턴은 어떤 MCP 서버에도 동일하게 적용됩니다.

<br>

---

> **다음 단계:** [5. AI Prompt 도구 추가](./5.%20AI%20Prompt%20도구%20추가.md)


---

## Step 5: AI Prompt 도구 추가

# 5. AI Prompt 도구 추가 및 HTML 응답 설계

> **이전 단계:** [4. ThinQ MCP 도구 추가](./4.%20ThinQ%20MCP%20도구%20추가.md) | **다음 단계:** [6. Excel 데이터 필터링 (심화)](./6.%20Excel%20데이터%20필터링.md)

---

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
도구 유형 목록에서  **프롬프트** 를 선택합니다.
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

  <!-- 긴급 업무 -->
  {{#each 긴급_업무}}
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 15px; border: 2px solid #ef5350;">
    <h2 style="color: #c62828; font-size: 18px; margin: 0 0 15px 0;">🔴 긴급 업무</h2>
    
    <div style="padding: 15px; background-color: #ffebee; border-radius: 5px; margin-bottom: 10px;">
      <h3 style="color: #d32f2f; font-size: 16px; margin: 0 0 10px 0;">{{순번}} {{업무명}}</h3>
      <p style="color: #212121; margin: 5px 0; font-size: 14px;"><strong style="color: #1a237e;">⏰ 마감:</strong> {{마감일}}</p>
      <p style="color: #212121; margin: 5px 0; font-size: 14px;"><strong style="color: #1a237e;">📋 현황:</strong></p>
      <ul style="color: #212121; margin: 5px 0; font-size: 14px; padding-left: 20px;">
        {{#each 현황_목록}}
        <li style="margin: 5px 0;">{{this}}</li>
        {{/each}}
      </ul>
      {{#if 조치_사항}}
      <p style="color: #212121; margin: 10px 0 5px 0; font-size: 14px;"><strong style="color: #1a237e;">✅ 조치 사항:</strong></p>
      <div style="background-color: #e8f5e9; padding: 12px; border-radius: 5px; border-left: 4px solid #4caf50;">
        <p style="color: #1b5e20; margin: 5px 0; font-size: 14px;"><strong>{{조치_제목}}</strong></p>
        <ul style="color: #212121; margin: 5px 0; font-size: 13px; padding-left: 20px;">
          {{#each 조치_목록}}
          <li style="margin: 3px 0;">{{this}}</li>
          {{/each}}
        </ul>
      </div>
      {{/if}}
      <p style="color: #212121; margin: 10px 0 0 0; font-size: 14px;"><strong style="color: #c62828;">🎯 {{목표_액션}}</strong></p>
    </div>
  </div>
  {{/each}}

  <!-- 중요 업무 -->
  {{#each 중요_업무}}
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 15px; border: 2px solid #ffa726;">
    <h2 style="color: #e65100; font-size: 18px; margin: 0 0 15px 0;">🟡 중요 업무</h2>
    
    <div style="padding: 15px; background-color: #fff3e0; border-radius: 5px;">
      <h3 style="color: #ef6c00; font-size: 16px; margin: 0 0 10px 0;">{{순번}} {{업무명}}</h3>
      <p style="color: #212121; margin: 5px 0; font-size: 14px;"><strong style="color: #1a237e;">⏰ {{마감_라벨}}:</strong> {{마감일}}</p>
      <p style="color: #212121; margin: 5px 0; font-size: 14px;"><strong style="color: #1a237e;">📋 현황:</strong></p>
      <ul style="color: #212121; margin: 5px 0; font-size: 14px; padding-left: 20px;">
        {{#each 현황_목록}}
        <li style="margin: 5px 0;">{{this}}</li>
        {{/each}}
      </ul>
      <p style="color: #212121; margin: 10px 0 0 0; font-size: 14px;"><strong style="color: #e65100;">🎯 {{목표_액션}}</strong></p>
    </div>
  </div>
  {{/each}}

  <!-- 기타 업무 -->
  {{#if 기타_업무}}
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 2px solid #66bb6a;">
    <h2 style="color: #2e7d32; font-size: 18px; margin: 0 0 15px 0;">🟢 기타 업무</h2>
    
    <div style="padding: 15px; background-color: #e8f5e9; border-radius: 5px;">
      {{#each 기타_업무}}
      <p style="color: #212121; margin: 5px 0; font-size: 14px;">
        <strong style="color: #1b5e20;">{{순번}} {{업무명}}</strong> - {{설명}}
      </p>
      {{/each}}
    </div>
  </div>
  {{/if}}

  <!-- 우선순위 요약 -->
  <div style="background-color: #fff9c4; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 5px solid #f57f17;">
    <h2 style="color: #f57f17; font-size: 18px; margin: 0 0 15px 0;">📌 이번 주 우선순위</h2>
    <table style="width: 100%; border-collapse: collapse; color: #212121; font-size: 14px;">
      <thead>
        <tr style="background-color: #fff59d;">
          <th style="padding: 10px; text-align: left; border: 1px solid #f9a825; color: #212121;">순위</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #f9a825; color: #212121;">업무</th>
          <th style="padding: 10px; text-align: center; border: 1px solid #f9a825; color: #212121;">마감</th>
          <th style="padding: 10px; text-align: center; border: 1px solid #f9a825; color: #212121;">상태</th>
        </tr>
      </thead>
      <tbody>
        {{#each 우선순위_목록}}
        <tr style="background-color: {{줄_배경색}};">
          <td style="padding: 10px; border: 1px solid #f9a825; color: #212121;">{{순위}}</td>
          <td style="padding: 10px; border: 1px solid #f9a825; color: #212121;">{{업무명}}</td>
          <td style="padding: 10px; text-align: center; border: 1px solid #f9a825; color: {{마감_색상}};"><strong>{{마감일}}</strong></td>
          <td style="padding: 10px; text-align: center; border: 1px solid #f9a825; color: #212121;">{{상태}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
  </div>

  <!-- 마무리 -->
  <div style="padding: 15px; background-color: #e1f5fe; border-radius: 8px; margin-bottom: 20px;">
    <p style="color: #212121; font-size: 14px; line-height: 1.6; margin: 0;">
      <strong style="color: #01579b;">💡 특이사항:</strong><br>
      {{특이사항}}
    </p>
  </div>

  <!-- 서명 -->
  <div style="padding: 15px; border-top: 2px solid #e0e0e0; margin-top: 20px;">
    <p style="color: #212121; font-size: 14px; margin: 5px 0;">감사합니다. 😊</p>
    <p style="color: #616161; font-size: 13px; margin: 5px 0;">{{발신자_이름}}</p>
    <p style="color: #616161; font-size: 13px; margin: 5px 0;">{{발신자_이메일}}</p>
  </div>

</div>

## 출력 HTML 구조#2 - 에너지 사용량 리포트 유형 예시

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    </style>
</head>
<body>
    <div style="max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

            <h1 style="color: #2c3e50; text-align: center; margin-bottom: 10px;">🍷 {{디바이스명}} 에너지 사용량 리포트</h1>
            <p style="color: #7f8c8d; text-align: center; font-size: 14px; margin-bottom: 30px;">조회 기간: {{조회_시작일}} ~ {{조회_종료일}} ({{조회_일수}}일간)</p>

            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="color: #000000; margin-top: 0; font-size: 18px;">📊 요약 정보</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; color: #000000; font-weight: bold;">⚡ 총 에너지 사용량:</td>
                        <td style="padding: 10px; color: #000000; font-size: 20px; font-weight: bold; text-align: right;">{{총_사용량}} Wh</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; color: #000000; font-weight: bold;">📈 일평균 사용량:</td>
                        <td style="padding: 10px; color: #000000; font-size: 18px; text-align: right;">{{일평균_사용량}} Wh/일</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; color: #000000; font-weight: bold;">🔝 최대 사용량:</td>
                        <td style="padding: 10px; color: #000000; text-align: right;">{{최대_사용량}} Wh ({{최대_사용일}})</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; color: #000000; font-weight: bold;">🔻 최소 사용량:</td>
                        <td style="padding: 10px; color: #000000; text-align: right;">{{최소_사용량}} Wh ({{최소_사용일}})</td>
                    </tr>
                </table>
            </div>

            <h2 style="color: #2c3e50; margin-top: 30px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">📅 일별 에너지 사용량 내역</h2>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background-color: #ffffff;">
                <thead>
                    <tr style="background-color: #3498db;">
                        <th style="padding: 12px; text-align: left; color: #000000; border: 1px solid #ddd;">날짜</th>
                        <th style="padding: 12px; text-align: right; color: #000000; border: 1px solid #ddd;">사용량 (Wh)</th>
                        <th style="padding: 12px; text-align: center; color: #000000; border: 1px solid #ddd;">상태</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each 일별_데이터}}
                    <tr style="background-color: {{줄_배경색}};">
                        <td style="padding: 10px; color: #2c3e50; border: 1px solid #ddd;{{#if 강조}} font-weight: bold;{{/if}}">{{날짜}} ({{요일}})</td>
                        <td style="padding: 10px; color: #2c3e50; text-align: right; border: 1px solid #ddd;{{#if 강조}} font-weight: bold;{{/if}}">{{사용량}}</td>
                        <td style="padding: 10px; color: {{상태_색상}}; text-align: center; border: 1px solid #ddd;">{{상태_아이콘}} {{상태_텍스트}}</td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>

            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 30px; border-radius: 5px;">
                <h3 style="color: #2c3e50; margin-top: 0;">💡 분석 및 권장사항</h3>
                <p style="color: #2c3e50; line-height: 1.6;">
                    {{분석_내용}}
                </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <p style="color: #7f8c8d; font-size: 12px;">본 리포트는 LG ThinQ 시스템에서 자동 생성되었습니다.</p>
                <p style="color: #7f8c8d; font-size: 12px;">문의사항이 있으시면 언제든지 연락 주세요! 🙂</p>
            </div>

        </div>
    </div>
</body>
</html>

```

<br>

### 1-5. 저장

프롬프트 작성 완료  스크롤을 내려  **저장** 버튼을 클릭하고 **추가 및 구성 버튼**을 눌러 도구 등록을 완료합니다.
![3]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20021621.png)
<br>

## 1-6. 도구 입력 변수 설명 추가

도구 추가가 완료 되었다면, 스크롤을 내려 입력 탭에 각 입력 변수에 대한 설명을 추가합니다.
기본적으로 AI로 동저으로 채우기가 되어있으며, 값 부분에 **사용자 지정** 을 선택하여 아래 설명으로 업데이트 하고 저장해 줍니다.

| 변수명 | 유형 | 설명 |
|--------|------|------|
| `content` | 텍스트 | HTML로 변환할 원본 응답 내용입니다. |
| `card_type` | 텍스트 | 카드 유형 입니다. (info / report) info는 에너지 사용량 보고서 일 경우, report는 일반 업무 브리핑일 경우 사용됩니다. |

![4]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022018.png)

---

## 2. 지침 업데이트

에이전트 지침의 `#메일 작성 규칙` 섹션을 아래와 같이 수정 합니다.

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

**제품 정보 HTML 카드 테스트:**
```
와인셀러 에너지 사용량 리포트 정리해서 "메일 주소"로 보내줘
```
→ 에이전트가 ThinQ MCP로 데이터 조회 후 → HTML_Response_Generator를 호출하여 HTML 카드 형식으로 메일을 발송합니다.

![7]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022837.png)
![8]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20022851.png)

**업무 브리핑 HTML 카드 테스트:**
```
오늘 업무 현황을 정리해서 나에게 보내줘
```
→ Work IQ MCP 조회 후 → report 유형 HTML 카드로 메일을 발송해야 합니다.
![9]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20023607.png)

<br>

> **💡 팁:** 에이전트 테스트 화면에서는 HTML이 렌더링되지 않고 코드로 보일 수 있습니다.  
> 실제 메일을 수신하였을 때에는 HTML이 정상 렌더링되어 카드 형태로 표시됩니다.

<br>

---

> **다음 단계:** [6. Excel 데이터 필터링 (심화)](./6.%20Excel%20데이터%20필터링.md)


---

## Step 6: Excel 데이터 필터링 (심화)

# 6. Excel 데이터 필터링 + AI Prompt 연동 (심화)

> **이전 단계:** [5. AI Prompt 도구 추가](./5.%20AI%20Prompt%20도구%20추가.md) | **다음 단계:** [7. Teams 채널 배포](./7.%20Teams%20배포.md)

> ⚠️ **심화 실습입니다.** 기본 실습(1~5단계)을 모두 완료한 후 진행하세요.

---

## 이번 실습의 목표

SharePoint에 저장된 Excel 파일에서 **사용자 상황·수준에 맞는 데이터 행(Row)을 필터링**하고,  
해당 데이터를 **AI Prompt 도구에 전달**하여 맞춤형 답변을 생성하는 패턴을 구현합니다.

```
사용자 질문
    ↓
에이전트가 사용자 수준·상황 파악
    ↓
Excel 데이터 조회 (SharePoint 연결)
    ↓
조건에 맞는 Row 필터링
    ↓
필터링된 데이터 → AI Prompt 도구 전달
    ↓
맞춤형 HTML 응답 생성
```

<br>

---

## 1. Excel 데이터 준비

### 1-1. Excel 파일 구조 설계

실습용 Excel 파일은 현재 SharePoint에 업로드되어있습니다.
엑셀은 반드시 테이블(표)로 변경해야합니다. (Ctrl + T)

| 열(Column) | 설명 | 예시 값 |
|-----------|------|---------|
| `ID` | 고유 식별자 | 1, 2, 3 ... |
| `Category` | 데이터 카테고리 | 신입사원, 중급자, 전문가 |
| `Level` | 난이도/수준 | 기초, 중급, 고급 |
| `Title` | 항목 제목 | "Excel 기초 사용법" |
| `Content` | 상세 내용 | 설명 텍스트 |
| `Tags` | 검색 태그 | "Excel, 업무도구, 기초" |

> 실제 실습에서는 강사가 제공한 Excel 파일을 사용합니다.

<br>

### 1-2. SharePoint에 Excel 업로드

1. SharePoint 사이트 → 문서 라이브러리 이동
2. **업로드** 버튼으로 Excel 파일 업로드
3. 파일 경로 메모 (지식 소스 등록 시 필요)

<br>

---

## 2. Excel 커넥터를 통한 테이블 조회

에이전트 개요 → **도구** → **+ 도구 추가** → **Excel Online(business)** 를 선택합니다.
다음으로 **테이블이 있는 행 나열** 을 선택합니다.
> 테이블의 사이즈가 크며, 필터 기반으로 진행할 경우, **행 가져오기** 또는 스크립트를 통해 데이터를 가져오는 방법도 고려할 수 있습니다.

도구를 추가하고 커넥터의 설명과 **입력** 창에 업로드한 Excel 파일이 있는 SharePoint 경로와 테이블을 입력하고 저장합니다

```
서울시 지역별 전력사용량에 대한 분석이 필요하여 시계열 데이터 원본을 조회할 때 사용합니다.
```

![1]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20024129.png)



<br>

---

## 3. Excel 필터링 전용 AI Prompt 도구 추가

Excel 데이터를 받아 사용자 맞춤형 응답을 생성하는 별도 AI Prompt 도구를 추가합니다.

### 3-1. 새 AI Prompt 도구 추가

도구 → **+ 도구 추가** → **프롬프트** 를 선택하고 아래와 같이 구성합니다.

**도구 이름:**
```
시계열 데이터 분석 프롬프트
```

**도구 설정:**

대규모 데이터를 분석하고 처리해야 하므로 설정에서 **코드 인터프리터 기능**을 활성화합니다.
![2]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20024833.png)


**프롬프트:**

```
당신은 시계열 데이터 분석 전문가입니다.
Excel 테이블에서 가져온 원본 데이터를 기반으로, 사용자의 요청에 맞는 데이터 인사이트를 추출합니다.

## 입력
- 사용자 요청: {User_Request}
- 시계열 데이터 원본: {RAW_Data}

## 분석 규칙
1. 사용자 요청을 먼저 파악하고, 요청과 관련된 데이터 행(Row)만 선별합니다.
2. 선별된 데이터에서 아래 관점의 인사이트를 도출합니다:
   - 합계, 평균, 최대/최소값 및 해당 시점
   - 추세(증가/감소/안정) 판단
   - 이상치(평균 대비 ±30% 이상 벗어난 값) 식별
   - 주요 패턴(요일별, 월별, 계절별 등)
3. 데이터에 존재하지 않는 값은 절대 추측하거나 생성하지 않습니다.
4. 숫자는 천 단위 쉼표를 포함하고, 단위를 명확히 표기합니다.

## 코드 인터프리터 활용
이 프롬프트에는 코드 인터프리터가 활성화되어 있습니다.
다음과 같은 경우 코드 인터프리터를 적극 활용하세요:
- 데이터 건수가 많아 직접 계산이 부정확할 수 있을 때 (합계, 평균, 표준편차 등)
- 추세선 회귀, 이동평균, 상관관계 등 통계 분석이 필요할 때
- 차트나 그래프로 시각화하면 인사이트 전달이 더 효과적일 때
- 데이터 정렬, 그룹핑, 피벗 등 복잡한 데이터 가공이 필요할 때

코드 인터프리터 사용 시 규칙:
1. Python(pandas, matplotlib 등)을 사용하여 정확한 수치 계산을 수행합니다.
2. 시각화가 유용한 경우 차트를 생성하여 응답에 포함합니다.
3. 코드 실행 결과(계산값)를 인사이트의 근거 데이터로 활용합니다.
4. 단순 질문에는 코드 실행 없이 직접 답변해도 됩니다.

## 출력 형식
아래 구조를 따라 응답합니다.

### 📊 분석 개요
- 분석 대상: [데이터 범위 또는 주제]
- 분석 기간: [시작일 ~ 종료일]
- 데이터 건수: [선별된 행 수]

### 📋 핵심 요약
| 지표 | 값 |
|------|-----|
| 합계 | [값 + 단위] |
| 평균 | [값 + 단위] |
| 최대 | [값 + 단위] ([시점]) |
| 최소 | [값 + 단위] ([시점]) |

### 💡 인사이트
각 인사이트는 반드시 아래 형식으로 작성합니다:

**[인사이트 1 제목]**
- 내용: [분석 결과 설명]
- 근거 데이터: [해당 인사이트를 도출한 구체적 데이터 값과 시점]

**[인사이트 2 제목]**
- 내용: [분석 결과 설명]
- 근거 데이터: [해당 인사이트를 도출한 구체적 데이터 값과 시점]

(인사이트 수는 데이터가 뒷받침하는 만큼만 작성합니다)

### 📈 시각화 (해당 시)
코드 인터프리터로 생성한 차트가 있으면 여기에 포함합니다.

### ⚠️ 이상치 / 특이사항
- [이상치 값], [시점] — [평균 대비 편차 %]

### 🔍 근거 데이터 상세
분석에 사용된 핵심 데이터를 표로 정리합니다:

| [시간 열] | [값 열] | 비고 |
|-----------|---------|------|
| [시점] | [값] | [평균 이상/이하/이상치 등] |

## 주의사항
- 사용자가 특정 지역, 기간, 조건을 지정하면 해당 범위만 분석합니다.
- 데이터가 부족하여 신뢰성 있는 분석이 어려운 경우, 그 한계를 명시합니다.
- 근거 데이터 상세 표는 행이 20개를 초과하면 상위/하위 주요 항목만 표시하고 나머지는 건수와 평균으로 요약합니다.

<br>

```
![3]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20092232.png)

**도구 설명:**
```
사용자의 수준과 상황 정보를 받아, Excel에서 필터링된 데이터를 맞춤형 학습/업무 가이드 형태로 재구성합니다.
사용자 수준에 맞는 콘텐츠를 제공해야 할 때 이 도구를 사용합니다.
```

**입력 변수:**

| 변수명 | 유형 | 설명 |
|--------|------|------|
| `User_Request` | 텍스트 | 사용자가 분석하길 희망하는 요청 사항과 컨텍스트 입니다. |
| `RAW_Data` | 텍스트 | 시계열 데이터 원본입니다 |
---

## 4. 지침 업데이트

에이전트 지침에 아래 워크플로우를 추가합니다.


```
### 📊 지역별 전기 사용량 분석 요청 시
사용자가 지역별 전기 사용량 분석을 요청하면:
1. 사용자의 수준을 파악합니다. 
- 사용자가 명시한 경우: 그 수준을 사용합니다.   
- 명시하지 않은 경우: 대화 맥락으로 추론하거나 사용자에게 질문합니다.     
예: "어떤 수준의 내용을 원하시나요? (신입사원 / 중급자 / 전문가)"

2.  "테이블에 있는 행 나열"  를 호출하여, 서울 지역 전기 사용량 테이블 원본을 수집합니다.
3. 수집된 데이터 원본과 사용자 요청사항 및 맥락을 "시계열 데이터 분석 프롬프트"  도구에 전달합니다.*중요!: 반드시 원본데이터 그대로 입려해야 합니다.
4. 생성된 답변을 기반으로 사용자에게 전달합니다.
```

![5]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20092506.png)

<br>

---

## 5. 동작 확인

**수준 명시 테스트:**
```
동대문구 전기 사용량 분석이 필요해. 서울과 비교해서 얼마나 차이가 나는지 알고 싶어. 
```
→ 에이전트가 엑셀 데이터를 조회 → "시계열 데이터 분석 프롬프트" 호출 → 답 반환

![6]({{ site.baseurl }}/assets/image/ws3/스크린샷%202026-03-19%20092951.png)
---

다만 이 경우, 데이터를 좋

> **학습 포인트:** 정형 데이터(Excel의 행/열 구조)와 생성형 AI(AI Prompt 도구)를 연결하는 패턴을 익혔습니다.  
> 에이전트가 데이터를 필터링하는 조건(사용자 수준, 상황)을 지침에 명시하면,  
> Power Automate 없이도 동적 데이터 기반 맞춤형 응답이 가능합니다.

<br>



---

> **다음 단계:** [7. Teams 채널 배포 및 테스트](./7.%20Teams%20배포.md)


---

## Step 7: Teams 배포

# 7. Teams 채널 배포 및 테스트

> **이전 단계:** [6. Excel 데이터 필터링 (심화)](./6.%20Excel%20데이터%20필터링.md) | **처음으로:** [README](./README.md)

---

## 배포 전 최종 확인

Teams에 에이전트를 배포하기 전, 아래 체크리스트를 확인합니다.

- [ ] 에이전트 지침(Instructions) 저장 완료
- [ ] SharePoint 지식 소스 연결 확인
- [ ] 메일 커넥터 인증 완료
- [ ] ThinQ MCP 도구 연결 확인
- [ ] Work IQ MCP 도구 연결 확인
- [ ] AI Prompt 도구(HTML_Response_Generator) 저장 완료
- [ ] 테스트 패널에서 기본 동작 확인 완료

<br>

---

## 1. 에이전트 게시(Publish)

### 1-1. 게시 시작

에이전트 개요 화면 우측 상단의 **게시** 버튼을 클릭합니다.

<br>

### 1-2. 게시 확인

게시 팝업에서 내용을 확인하고 **게시** 를 클릭합니다.

> 게시는 에이전트의 현재 설정을 저장하고 배포 가능한 상태로 만드는 작업입니다.  
> 게시 후에도 에이전트를 계속 수정할 수 있으며, 수정 후 재게시하면 변경 사항이 반영됩니다.

게시 완료까지 1~2분 소요될 수 있습니다.

<br>

---

## 2. Teams 채널 배포

### 2-1. 채널 배포 설정

게시 완료 후, 좌측 메뉴에서 **설정** → **채널** 탭으로 이동합니다.  
또는 에이전트 개요 화면에서 **채널** 섹션을 찾습니다.

<br>

### 2-2. Microsoft Teams 채널 선택

채널 목록에서 **Microsoft Teams** 를 선택합니다.

<br>

### 2-3. Teams 채널 구성

| 항목 | 설정 |
|------|------|
| **배포 대상** | Teams 채널 (그룹 채팅 포함) |
| **공유 범위** | 실습 팀 또는 전체 조직 (강사 안내에 따름) |
| **Teams 앱 이름** | 에이전트 이름과 동일하게 자동 설정 |

<br>

### 2-4. Teams에 에이전트 추가

**Teams에서 열기** 버튼을 클릭하거나, 아래 방법으로 Teams에 에이전트를 추가합니다.

**방법 A — 앱 스토어에서 추가 (조직 배포 시):**
1. Microsoft Teams 앱 실행
2. 좌측 하단 **앱** 클릭 → **조직용 앱** 탭
3. 에이전트 이름 검색 후 **추가** 클릭

**방법 B — 직접 링크로 추가:**
1. Copilot Studio에서 제공하는 Teams 직접 추가 링크 복사
2. Teams 채팅에서 붙여넣기 후 설치

<br>

### 2-5. Teams 채널에 에이전트 등록

특정 Teams 채널에 에이전트를 등록하려면:
1. Teams 대상 채널로 이동
2. 채널 상단 **+** (탭 추가) 클릭
3. **앱 탭** 또는 에이전트 검색
4. 설치 완료

<br>

---

## 3. Teams에서 동작 테스트

Teams에 에이전트가 추가되면 아래 시나리오로 전체 흐름을 검증합니다.

### 시나리오 1 — 가전 정보 조회 (ThinQ MCP)
```
@[에이전트 이름] LG 로봇청소기 모델 추천해줘
```
→ ThinQ MCP 조회 → HTML 카드 응답

### 시나리오 2 — 오늘의 업무 브리핑 (Work IQ MCP)
```
오늘 내 일정이랑 할 일 정리해줘
```
→ Work IQ MCP 조회 → HTML 보고서 카드 응답

### 시나리오 3 — 사내 문서 검색 (SharePoint)
```
[검색 키워드] 관련 사내 문서 찾아줘
```
→ SharePoint 검색 → 인용 포함 응답

### 시나리오 4 — 메일 조회 및 발송
```
최근 받은 메일 확인하고, 팀장님께 오늘 업무 완료 메일 보내줘
```
→ 메일 조회 → 초안 작성 → 승인 후 발송

### 시나리오 5 — 맞춤형 콘텐츠 (Excel + AI Prompt, 심화)
```
신입사원인데 Teams 활용법 알려줘
```
→ Excel 필터링 → Personalized_Content_Generator → HTML 응답

<br>

---

## 4. (선택) Copilot Studio 모니터링

실습 시간이 남는 경우 Copilot Studio에서 대화 로그를 확인합니다.

### 4-1. 모니터링 탭 접속

Copilot Studio → 해당 에이전트 선택 → 좌측 메뉴 **모니터링** 탭 클릭

<br>

### 4-2. 확인 항목

| 항목 | 확인 내용 |
|------|-----------|
| **대화 기록** | 사용자 질문과 에이전트 응답 전체 흐름 확인 |
| **도구 호출 로그** | 어떤 도구가 어떤 순서로 호출되었는지 확인 |
| **오류 로그** | 도구 호출 실패, 인증 오류 등 확인 |
| **성능 지표** | 평균 응답 시간, 세션 수 등 확인 |

<br>

> **💡 모니터링 활용 팁**
> - 에이전트가 엉뚱한 도구를 호출하거나 지침을 따르지 않는 경우, 대화 로그에서 원인을 분석하고 지침을 업데이트합니다.
> - 도구 호출 순서가 의도와 다른 경우, 지침의 워크플로우 설명을 더 구체적으로 수정합니다.

<br>

---

## 실습 완료 🎉

축하합니다! 모든 단계를 완료했습니다.

이번 실습에서 구현한 내용을 정리합니다.

| 단계 | 구현 내용 |
|------|-----------|
| 1단계 | 커스텀 엔진 에이전트 생성 및 지침 작성 |
| 2단계 | SharePoint 지식 소스 + 메일 커넥터 연결 |
| 3단계 | ThinQ MCP로 가전 제품 데이터 조회 |
| 4단계 | Work IQ MCP + 지침 기반 다단계 워크플로우 구성 |
| 5단계 | AI Prompt 도구로 HTML 카드 응답 포맷 구현 |
| 6단계 | Excel 데이터 필터링 + 맞춤형 콘텐츠 생성 (심화) |
| 7단계 | Microsoft Teams 채널 배포 및 엔드-투-엔드 테스트 |

<br>

> **핵심 takeaway:** 플로우·변수·토픽 없이 **지침 + 도구 + MCP** 만으로 복잡한 업무 자동화를 구현할 수 있습니다.  
> 에이전트의 자율 오케스트레이션 품질은 **지침의 구체성**에 비례합니다.

<br>

---

> [← README로 돌아가기](./README.md)

