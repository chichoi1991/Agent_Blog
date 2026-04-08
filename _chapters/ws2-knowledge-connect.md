---
layout: chapter
title: "커스텀 에이전트 만들기 기초편 #2"
short_title: "기초편 #2: 문서검색 & 에스컬레이션"
description: "Copilot Studio에서 사내 문서를 검색하고, 필요 시 담당자에게 메일 에스컬레이션하는 에이전트를 만드는 핸즈온 실습입니다. 커넥터, 플로우, 트리거를 활용합니다."
order: 2
icon: "📂"
category: workshop
---

---

## 실습 개요

Custom Engine Agent 알아보기
==
이 자료는
Copilot studio를 통해 Custom Engine Agent를 처음 만들어보는 사용자들을 위한 Step-by-Step Guide 입니다.
<br/>

**Agent 시나리오**
---
문서를 검색, 설명하고 필요시 문서 담당자, 관리자에게 연락을 할 수 있는 Agent를 구성해 봅니다.

**실습 내용**
- 지침 작성
- 지식 연결(SharePoint)
- 도구 추가 Pre-built Connector (메일 발송)
- 플로우 추가 (채널 알림 후 SPO 업데이트)
- 트리거 추가
- 에이전트 게시 및 공유
<br/>


---

## Step 1: Agent 생성 및 지침 작성

Custom Engine Agent 생성 및 지침 작성
===

### 1. [여기](https://copilotstudio.preview.microsoft.com) URL을 통해 접속 후 좌측에 있는 **만들기**를 누릅니다.
![image](https://github.com/user-attachments/assets/27577404-175d-4646-9caa-72be7e07b94d)
    > https://copilotstudio.preview.microsoft.com/

<br/>


### 2. 자연어 기반으로 에이전트 초안 생성
코파일럿 기능을 통해 에이전트 초안을 생성합니다.   
이건 초안을 작성하는 부분으로, 그냥 바로 **'만들기'를 클릭**해서 직접 설정할 수 있습니다.
<img width="1248" height="1261" alt="image" src="https://github.com/user-attachments/assets/ebe5a018-c2c1-4a0b-9fc5-b1be25928015" />



입력할 프롬프트는 아래와 같습니다.

```
사내 사이트 정보를 기반으로 질문에 답변하는 에이전트를 만들고 싶어
```

```
네
```

```
필요시 업무 담당자에게 메일을 통한 에스컬레이션도 가능하게끔 구현하고 싶습니다.
사용자의 질문에 적합한 자료와 정보를 찾지 못했다면 담당자에게 문의사항을 에스컬레이션을 할 수 있습니다.
에스컬레이션을 하시겠습니까? 라는 질문을 넣도록 합니다.
```

대화식 설정이 마무리가 되면 [구성] 에서 현재 설정된 에이전트 정보를 확인할 수 있습니다.
[만들기] 버튼을 클릭하여 에이전트를 생성합니다.
<img width="1247" height="1204" alt="image" src="https://github.com/user-attachments/assets/0f0121e0-a5f4-46c5-a15d-e0cd8becf117" />

</br>

### 3. 생성형 AI 오케스트레이션 기능 실행
여기서 테스트할 기능을 활성화합니다. 오케스트레이션 측면에서 클래식 vs 생성형의 차이는 [여기](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-generative-actions)를 참고할 수 있습니다.

<img width="688" height="419" alt="image" src="https://github.com/user-attachments/assets/bf0ab9b1-9e19-4318-b035-d1909fd8d8e5" />
</br>
</br>
또한 설정에서 "응답 모델" 을 변경할 수 있습니다.


<img width="1176" height="714" alt="image" src="https://github.com/user-attachments/assets/1e6ae064-65ad-4b83-9a27-5436c2647fe2" />
</br>

```
2025년 8월 10일 기준, GPT-4o 와 GPT-5 이용 가능
```

### 4. 참조자료에 추가적인 설명 추가
다음과 같이 참조 자료 화면에서, 위에서 자동으로 연결된 홈페이지 URL에 조금 더 상세한 설명을 추가하고 저장을 합니다.
<img width="1262" height="575" alt="image" src="https://github.com/user-attachments/assets/f9431b04-3eb9-44ea-8c62-e43e19235470" />



```
이 참조 자료는 LG Innotek에서 제공하는 미디어 뉴스 정보들을 종합하여 제공하는 사이트 입니다. LG Innotek과 관련된 보도자료, 뉴스, 소식등을 확인할 수 있습니다.
LG Innotek, LG이노텍과 관련된 뉴스,공시자료 검색을 요청할 경우 이용합니다.
```

<img width="1167" height="978" alt="image" src="https://github.com/user-attachments/assets/352ffe92-dd52-42dd-9aa6-1339254f9a6e" />


---
에이전트의 기본 지침 설정이 완료되었습니다.
다음은 에이전트가 이용할 도구와 트리거 설정을 합니다.


---

## Step 2: 도구(커넥터) 추가

# 에이전트에 도구 추가
===
## ✅ Copilot Studio에서 도구(Tool)의 역할

**도구(Tool)** 는 Copilot이 기본적으로 할 수 없는 기능을 확장해주는 **추가 능력**입니다.  
쉽게 말해, **Copilot을 단순한 대화형 AI에서 ‘업무 실행형 AI’로 업그레이드하는 핵심 요소**입니다.

---

## **1. 도구의 핵심 역할**
|역할|설명|
|------|---|
|외부 서비스 연결|CRM, ERP, 데이터베이스, API 호출|
|업무 자동화|이메일 전송, 일정 생성, 보고서 작성|
|데이터 처리|Excel 분석, PDF 요약, 데이터 변환|
|시스템 통합|Microsoft 365, Teams, Power Automate 연동|

---

## **2. 왜 필요한가?**


- Copilot은 기본적으로 **대화형 AI** → 데이터 조회나 시스템 명령 실행은 불가능  
- **도구를 연결하면 Copilot이 실제 작업을 실행**할 수 있음  

---

## **3. 예시로 이해하기**

- **도구 없음**  
  > “이번 주 매출 알려줘”  
  → Copilot: “제가 직접 데이터에 접근할 수 없어요.”

- **도구 연결**  
  > “이번 주 매출 알려줘”  
  → Copilot: (ERP API 호출) → “이번 주 매출은 **₩120,000,000**입니다.”

---

## **4. 정리**


✔ 도구는 **Copilot의 기능을 확장**하는 핵심  
✔ **업무 자동화 + 데이터 연결 + 시스템 통합** 가능  
✔ **실제 비즈니스 프로세스 실행**을 가능하게 함  

---
## 실습
===
이번 실습에서는 에이전트가 사용자를 대신하여 조회된 정보를 추가적으로 문의하기 위해 담당자에게 메일을 발송해주기 위한 작업을 할 수 있도록 메일 발송 도구를 추가해 보겠습니다.

## 1. 메일 발송 도구 추가
에이전트 설정창에서 [도구] - [+ 도구 추가] 를 선택합니다.
<img width="1166" height="598" alt="image" src="https://github.com/user-attachments/assets/671c05ef-8a90-4001-8ed0-a70f57bf84a8" />

추천 커넥터 또는 도구 검색에서 "Office 365 Outlook" 을 검색하여 선택합니다.
<img width="1063" height="779" alt="image" src="https://github.com/user-attachments/assets/eb82dc7b-5d2b-454d-bcfb-8d27948be6f7" />

이후 "메일 보내기(V2)" 액션을 선택합니다.
<img width="1063" height="779" alt="image" src="https://github.com/user-attachments/assets/1f89de44-65f9-4b70-b4c2-8963a507d00f" />

도구를 선택하면, Office 365 outlook 커넥터를 이용하기 위한 OAuth 연결 창이 뜨며,
[새 연결 만들기]를 통해 접속한 계정의 로그인 정보를 입력후 만들기를 클릭합니다.
<img width="1009" height="738" alt="image" src="https://github.com/user-attachments/assets/d9b5c7f9-04cc-43da-b6a0-f32af54d6b6f" />

<img width="1022" height="738" alt="image" src="https://github.com/user-attachments/assets/599eb77c-27b3-4ca8-834e-47078913cd4d" />

연결이 완료되면 아래 화면과 같이 연결된 계정 정보와 초록색 아이콘이 표시됩니다.
[추가 및 구성] 을 선택하여, 메일 발송 커넥터의 상세 설정으로 이동합니다.
<img width="1004" height="732" alt="image" src="https://github.com/user-attachments/assets/e27dc93e-d282-48dc-bcc9-a52b9bb0ddbe" />

## 2. 메일 발송 커넥터 기본 설정
다음은 Agent가 메일을 발송하기 위해 필요한 설정들을 지정합니다.

가장 먼저 해야하는 작업은 **설명** 란에 이 도구가 언제, 어떻게 사용되는지를 입력합니다. 

이 설명은 Agent가 도구를 선택해야할 때 참조하는 설명으로 상황이 최대한 자세하게 설명되어 있어야 정확한 지시에 맞추어 동작합니다.

<img width="1181" height="460" alt="image" src="https://github.com/user-attachments/assets/af5fd88b-afb1-4832-a465-4d2040e5114e" />


```
사용자를 대신하여 메일을 발송해야하는 작업이 있을 경우 이용합니다.
업무 담당자에게 에스컬레이션 메일을 전송해야할 때 이용합니다.
```

다음은 추가 세부 정보창을 열어 인증 정책을 **[제작자 제공 자격 증명]** 으로 변경합니다.

기본적으로 "최종 사용자 자격 증명" 으로 선택되어 있으며, 이 경우 에이전트를 사용하는 사용자가 액션을 이용할 때 로그인 절차를 1회 거치게 되어있습니다.

사용자의 권한으로 메일박스를 검색하거나, 데이터를 조회해야할 경우 그대로 유지하고
특정 시스템에 접근이 가능한 계정이 한정되어 있을 경우(예, SAP, DB 접근 등) 
제작자 제공 자격 증명으로 변경하여 사용자들이 로그인을 하지 않더라도 데이터 접근이 가능토록 구성합니다.

<img width="801" height="336" alt="image" src="https://github.com/user-attachments/assets/3d359fd6-7af5-49c0-b1e7-99347b5e36f6" />

---
## 3. 입력 파라미터 설정
메일 발송에 있어, 입력해야하는 파라미터 지정과 각 파라미터들의 설명을 작성합니다.

|입력<br>이름|다음을 사용하여 채우기|값|
|:---:|:---:|:---:|
|To|AI로 동적으로 채우기|수신자 입니다. 담당자 리스트를 참고하여 관련 업무에 해당하는 사용자의 메일주소를 입력합니다. <br>메일 주소는  someone@contoso.com 형식을 따릅니다. 여러명이 있을 경우 ; 을 이용하여 구분합니다. |
|Subject|AI로 동적으로 채우기|메일 제목입니다. [업무 문의] 문의 내용요약 형식으로 작성합니다. |
|Body|AI로 동적으로 채우기|메일의 본문입니다. 실제 담당자에게 문의하는 내용을 정리하여 입력합니다.<br> 문의일자 및 시각, 문의자, 문의 내용등이 HTML 형식으로 입력되어야 합니다.|
|CC|사용자 지정|User.Email|

파라미터 추가는  우측의 **[입력 추가]**를 선택하야 할 수 있습니다.
<img width="839" height="480" alt="image" src="https://github.com/user-attachments/assets/21c78018-79a4-42ab-aaa0-fc97f0a32c35" />

이후 AI로 동적으로 채우기로 설정된 파라미터의 경우 **사용자 지정**을 선택하면 해당 파라미터의 설명을 입력할 수 있습니다.

<img width="792" height="642" alt="image" src="https://github.com/user-attachments/assets/d42a0d11-da72-430b-b683-02af538aace7" />

**사용자 지정 값**으로 설정된 파라미터의 경우, 수동으로 입력 또는 ... 을 클릭하여 시스템,환경 변수나 수식으로 입력이 가능합니다.
이번 실습에서는 참조로 질문자의 이메일 주소를 입력할 수 있도록
시스템 변수에서 **User.Email**을 선택합니다.

마지막으로 **[완료]** 에서 해당 도구가 실행 완료되었을 때의 메세지등을 설정하면
사용자들이 에이전트와 상담중 메일이 발송되었다는것을 보다 쉽게 알아차릴수 있습니다.

실행후 액션을 **특정 응답 보내기(아래에 지정)** 으로 선택 후,
다음 메세지를 지정합니다.

<img width="846" height="397" alt="image" src="https://github.com/user-attachments/assets/fa991646-b33f-4dc1-b676-c1a85fa3fa1d" />

```
지시하신대로 해당 내용을 담당자에게 메일로 전송하였습니다.
빠른시일내로 담당자가 따로 연락을 드리겠습니다.
```
<br>

작업을 다 마치고 상단의 **[저장]**을 클릭하면 메일 발송 커넥터 설정이 완료됩니다.


## 4. 에이전트 지침 수정
메일 발송 도구 설정이 완료되었으나, 
'사용자가 메일을 발송해줘' 라고 입력을 할 경우 도구가 선택하여 동작을 하겠지만
담당자가 누구인지, 제목을 어떻게 해야하는지, 본문은 무엇을 입력해야하는지와 같은 상세 지침이 지정되어 있지 않습니다.

따라서, 다시 **개요**로 돌아가, 추가된 도구에 대한 지침을 입력해 주도록 합니다.
지침 수정 중 ** / ** 을 입력하면, 도구, 에이전트, 토픽을 직접 명시할 수 있습니다.

<img width="972" height="707" alt="image" src="https://github.com/user-attachments/assets/3f41fb6f-62c0-482c-9d3e-109ddc49fd03" />


```

##메일 발송##
정확한 답변을 얻지 못해 사용자가 에스컬레이션을 원하는 경우, 담당자와 직접 소통이 필요한 경우  메일 보내기(V2)  기능을 이용합니다.

각 업무 담당자 연락처는 다음과 같습니다.
- 마케팅, 보도자료,홈페이지 관리 > admin@M365CPI45255191.onmicrosoft.com
- 기술 문의 > chiwonchoi@microsoft.com

메일 본문과 제목은 아래 규칙을 따릅니다.
제목: [마케팅 문의|보도자료 문의|홈페이지 관리 문의|기술 문의] 문의 내용 요약
예) [보도자료 문의] 8월 10일 보도자료 오타로 인한 수정 문의 관련

본문
---
문의 일자: UTC+9 기준으로 2025년 8월 10일 15시 10분 형식으로 입력
문의자: "variable System.User.DisplayName" (variable System.User.PrincipalName) 형식으로 입력합니다.
## 위 변수는 / 를 통해 시스템 변수 User.DisplayName과 User.PrincipalName 을 입력하였습니다
문의 내용: 사용자가 문의한 내용을 상세하게 정리하여 입력합니다.
---
```

지침 편집을 마치고 저장을 한 후, 테스트를 하여 메일이 정상적으로 발송되는지 확인해 봅니다.

<img width="1195" height="1156" alt="image" src="https://github.com/user-attachments/assets/0459dfa8-5ae9-4bb6-b952-d89e6945e352" />

<img width="580" height="614" alt="image" src="https://github.com/user-attachments/assets/59b02d08-861b-4c4a-994f-5820f7e3675e" />

---
이로서 도구를 통해 에이전트가 추가적인 액션을 이용할 수 있게 되었습니다. <br>
다음은 이러한 작업들을 여러개 이어 하나의 Flow로 만들어 작업을 해보도록 합니다.


---

## Step 3: 도구(플로우) 추가

에이전트에 플로우 추가
===
✅ Flow(흐름)이란,

**Flow(흐름)** 는 Power Automate 기반의 자동화 프로세스로, 특정 이벤트(예: Copilot에서 사용자 입력 발생)에 따라 일련의 작업을 실행하는 워크플로우입니다.

**주요 기능:**
- Copilot에서 받은 데이터를 기반으로외부 시스템과 상호작용
- 조건 분기, 반복, 데이터 변환 등비즈니스 로직 처리
- 다양한 서비스와 연결하여 업무 자동화 구현

**Flow vs Connector 비교**

|구분|Flow|Connector|
|:---|:---|:---|
|역할|Copilot에서 발생한 이벤트를 기반으로 자동화 로직 실행|외부 시스템과 데이터 통신 담당|
|**핵심<br>기능**| 조건 처리, 반복, 데이터 변환, 작업 오케스트레이션 | API 호출, 인증 처리, 데이터 스키마 정의 |
|**사용<br>예시**| - 휴가 신청 → HR 시스템에 요청 등록<br>- 고객 문의 → CRM 티켓 생성 | - SharePoint 문서 목록 가져오기<br>- Outlook 이메일 전송 |
|**관계**| Flow는 **Connector를 활용**하여 외부 시스템과 상호작용 | Connector는 Flow에서 **데이터 소스 역할** 수행 |

<br>

**핵심 차이 요약**
- Flow = 자동화 로직
- Connector = 외부 서비스 연결 수단
  
즉, Flow는 “무엇을 할지”를 정의하고, Connector는 “어디서 데이터를 가져오고 보낼지”를 담당합니다.

---

실습
===
이번 실습에서는 앞에서 작성한 메일 발송 커넥터 시나리오를 확장하여 메일을 발송하고, 발송된 내용을 팀즈에도 알려주는 업무 흐름을 만들어 보겠습니다.

## 1. Flow 생성

Flow 생성을 위해 **[개요]** 에서 **[+도구 추가]** -> **[+새로운 도구]** 를 선택합니다.
<img width="1081" height="779" alt="image" src="https://github.com/user-attachments/assets/d963a73a-b1e3-4471-8547-e99663380b18" />

다음으로 **[에이전트 흐름]** 을 선택하여 신규 Flow를 생성하기 위한 디자이너 페이지로 이동합니다.
<img width="1063" height="783" alt="image" src="https://github.com/user-attachments/assets/605cccab-5010-442e-9b80-7d7d8c786b70" />

플로우 디자이너로 이동하면 기본적으로 2개의 액션이 추가되어 있습니다.
- 에이전트가 흐름을 호출 할 때: 트리거 역할을 하며, 이곳에서 사용할 Input 변수를 지정할 수 있습니다. 
- Respond to the Agent: 작업이 완료되고 Agent에게 결과값을 호출할 필요가 있을 경우, 이 액션을 통해 Output 변수를 만들어 전달할 수 있습니다

이번 시나리오에서는 메일 발송과 게시글 작성에 필요한 메일 주소,cc,제목,본문 값에 대한 입력만 필요하고<br>
별도의 output결과물을 반환할 필요하 없기 때문에 ""에이전트가 흐름을 호출 할 때"" 에서 Input 변수만 추가합니다.
<br>
<img width="675" height="395" alt="image" src="https://github.com/user-attachments/assets/722d2663-b985-4f0e-8117-347ffb671346" />
<br>
인풋 변수 추가는 ""에이전트가 흐름을 호출 할 때"" 를 선택하고 ""[+입력 추가]""를 클릭하여 추가할 수 있습니다.<br>
아래와 같이 입력 변수를 추가합니다.

<img width="648" height="225" alt="image" src="https://github.com/user-attachments/assets/4585ee60-3a34-481b-b959-8416ce75efc2" />

<br>
<img width="666" height="275" alt="image" src="https://github.com/user-attachments/assets/6833cedd-c723-408f-8f36-66ae1c114cf0" />

|변수명|타입|
|---|---|
|to|text|
|Subject|text|
|CC|text|
|Body|text|

---
## 2. 액션 커넥터 추가(메일)

변수 입력이 완료되면 다음은 입력받은 변수값을 기반으로 플로우안에서 진행될 2가지 작업을 순서대로 추가하여 설정합니다.
1. 메일 발송
2. 팀즈 채널에 게시물 게시

먼저 ""에이전트가 흐름을 호출할 때"" 하단에 [+] 버튼을 클릭하여 추가할 작업을 열람 할 수 있습니다.<br>
<img width="976" height="845" alt="image" src="https://github.com/user-attachments/assets/281c490c-f6a5-4f0e-9d45-d889db12748d" />

검색 또는 하단의 커넥터 리스트에서 ""Office 365 Outlook"" 을 선택, <br>이전과 마찬가지로 ""메일 보내기(V2)""를 선택합니다.
<img width="601" height="522" alt="image" src="https://github.com/user-attachments/assets/d0053a79-95b1-491d-a4c6-40ab7946b7c5" />

메일 보내기 커넥가 추가되면 앞 세션에서 실습한 내용과 유사한 UI가 표시 됩니다.<br>
고급 매개 변수를 선택하여 CC를 추가합니다
<img width="758" height="703" alt="image" src="https://github.com/user-attachments/assets/7997a038-ca65-43b0-b5b2-6da15c198873" />
<br>

이후 변수를 입력하기 위해 메일 보내기 커넥터 우측 상단에 **톱니 바퀴**를 선택하여 **동적 컨텐츠 사용** 을 클릭합니다.
<img width="797" height="218" alt="image" src="https://github.com/user-attachments/assets/c68a61b3-b360-47d3-a5b4-438e9391e183" />

이후 각 파라미터의 값에 /를 입력하 ""에이전트가 흐름을 호출할 때""에서 선언한 변수명들을 넣어줍니다.
<img width="427" height="359" alt="image" src="https://github.com/user-attachments/assets/fa2921eb-1cd4-455d-9abd-f100ce4fb41b" />

<img width="883" height="783" alt="image" src="https://github.com/user-attachments/assets/2cde6243-e7a3-40ad-88fb-2b2b37548717" />

<img width="821" height="783" alt="image" src="https://github.com/user-attachments/assets/a74ee7b7-c4a6-48ca-9c1b-b301b1cb22f1" />

변수를 모두 선언 하였다면, 메일보내기 흐름 작업은 완료가 되었습니다.<br>
이후 흐름을 호출하면, Agent가 전달한 각 변수의 값들이 메일 보내기 커넥터의 파라미터와 맵핑이 되어 메일이 발송되게 됩니다.
<br>

---
## 3. 액션 커넥터 추가 (팀즈 채널에 메세지 게시)

다음으로 메일 보내기가 완료되면 자동으로 팀즈 채널에 메세지가 게시될 수 있도록 새로운 커넥터를 추가합니다.<br>
앞선 작업과 마찬가지로 메일 보내기 액션 하단에  [+] 버튼을 클릭하여 
**[Microsoft Teams] - [채팅 또는 채널에서 메세지 게시]** 액션을 추가합니다.

<img width="762" height="683" alt="image" src="https://github.com/user-attachments/assets/3c7439ac-5fdf-402f-9780-1e1a9d12323e" />

아래와 같은 설정으로 알림 메세지를 업로드할 채널을 지정합니다

|파라미터|값|설명|
|---|---|---|
|Post as|Flow bot|사용자 이름으로 올릴지, Flow bot이 대신 올릴지 지정합니다.<br> 채널에 표시되는 이름이 달라집니다.
|Post in|채널|채팅,채널 중 어느 소통방식으로 메세지를 받을지 지정합니다.|
|Team|게시물을 업로드할 팀|게시물이 올라갈 채널이 소속된 팀을 지정합니다. <br>선택시 내가 접근가능한 팀이 자동으로 표시됩니다.
|Channel|업로드 채널|게시물이 실제 업로드되는 채널을 선택합니다|
|Message|텍스트 + body 변수값| 게시물의 내용물을 입력합니다. 이곳에서는 메일에서 입력된 Body을 기반으로 입력합니다|

<br>

메세지에는 고정된 메세지와 함께 메일 발송시 이용한 문구를 활용하기 위해
동적 변수를 추가토록 합니다.
> 동일하게 메세지 문구 내에서 / 를 입력하면 동적 변수를 추가할 수 있습니다.
```
새로운 문의사항이 도착했습니다. 확인해 주세요!<br> @{triggerBody()?['text_3']}
```

<img width="695" height="583" alt="image" src="https://github.com/user-attachments/assets/1ee9844e-50e0-4752-b185-da3a89fd1d08" />
<br>

작업이 완료되었으면 상단의 **게시** 버튼을 클릭하면 Flow가 게시되고 이후 [에이전트로 돌아가]를 선택시 자동으로 Agent 개요 페이지에서 추가된 흐름을 확인할 수 있습니다.. 
<img width="813" height="393" alt="image" src="https://github.com/user-attachments/assets/a3910866-899d-42ec-82fc-b8147b630d2e" />
<br>
<img width="981" height="408" alt="image" src="https://github.com/user-attachments/assets/b6fabf2c-cf60-469b-934f-b9c84f150b96" />

---
## 4. 플로우 적용
다음은 실제로 플로우가 동작할 수 있도록, 지침과 파라미터 설명을 추가토록 하겠습니다.<br>

**[도구]** 로 이동하면 앞서 생성한 Flow가 **제목 없음** 이라는 이름으로 추가가 되어있음을 확인 할 수 있습니다.

다만, 현재 구성은 이전에 했던 메일 보내기 작업과 중복되는 기능이기 때문에 먼저 **도구** 에서 **메일 보내기(v2)** 작업의 토글을 비활성화 처리를 합니다.
<img width="1258" height="379" alt="image" src="https://github.com/user-attachments/assets/69e1c73e-aaae-4a62-bb5b-9b7c22a941d4" />

이후 **제목 없음** Flow로 이동하여 **메일 보내기(v2)** 에서 진행한 작업과 동일한 작업을 적용해 줍니다.
|파라미터|값|
|---|---|
|이름|메일보내기 및 알림 흐름|
|설명|사용자를 대신하여 메일을 발송해야하는 작업이 있을 경우 이용합니다. <br> 업무 담당자에게 에스컬레이션 메일을 전송해야할 때 이용합니다.|
|To|AI로 동적으로 채우기 - 수신자 입니다. 담당자 리스트를 참고하여 관련 업무에 해당하는 사용자의 메일주소를 입력합니다. 메일 주소는  someone@contoso.com 형식을 따릅니다. 여러명이 있을 경우 ; 을 이용하여 구분합니다.|
|Subjuect|AI로 동적으로 채우기 - 메일 제목입니다. [업무 문의] 문의 내용요약 형식으로 작성합니다.|
|Body|AI로 동적으로 채우기 - 메일의 본문입니다. 실제 담당자에게 문의하는 내용을 정리하여 입력합니다. <br> 문의일자 및 시각, 문의자, 문의 내용등이 HTML 형식으로 입력되어야 합니다.|
|CC|사용자 지정 값 - User.Email|
|실행 후|특정 응답 보내기 - 지시하신대로 해당 내용을 담당자에게 메일로 전송하였습니다. <br> 빠른시일내로 담당자가 따로 연락을 드리겠습니다.|
<br>
<img width="1181" height="1145" alt="image" src="https://github.com/user-attachments/assets/7d09943b-5053-4853-9cae-a95ed665b2db" />

<br>

설정이 완료되면 **저장** 을 한 뒤 **개요** 로 이동하여 지침을 수정합니다.

기존 지침은, 에스컬레이션이 될 경우 **메일 보내기(V2)** 도구를 이용하라고 설정이 되어있었기에,
지침에서 해당 도구의 선언을 지우고, **메일 보내기 및 알림 흐름** 을 선언하고 저장을 합니다.

<img width="1010" height="639" alt="image" src="https://github.com/user-attachments/assets/e56bbe69-d6e2-4bd5-b90c-280c0e7b226a" />

---

테스트를 통해 실제로 플로우가 동작하는지 확인해 봅니다.

<img width="1278" height="1169" alt="image" src="https://github.com/user-attachments/assets/fbcf1326-89f0-4f7b-b3d9-bf84977d0f43" />
<br>
<br>

<img width="1803" height="526" alt="image" src="https://github.com/user-attachments/assets/a7341ff1-eb08-4bb1-a339-3fbd029d338d" />
<br>
<br>

<img width="633" height="705" alt="image" src="https://github.com/user-attachments/assets/c4d2c9bd-d5a3-4d38-92b2-7778793fdc4a" />
<br>
<br>


---

## Step 4: 트리거 추가

에이전트에 플로우 추가
===
✅ Flow(흐름)이란,

**Flow(흐름)** 는 Power Automate 기반의 자동화 프로세스로, 특정 이벤트(예: Copilot에서 사용자 입력 발생)에 따라 일련의 작업을 실행하는 워크플로우입니다.

**주요 기능:**
- Copilot에서 받은 데이터를 기반으로외부 시스템과 상호작용
- 조건 분기, 반복, 데이터 변환 등비즈니스 로직 처리
- 다양한 서비스와 연결하여 업무 자동화 구현

**Flow vs Connector 비교**

|구분|Flow|Connector|
|:---|:---|:---|
|역할|Copilot에서 발생한 이벤트를 기반으로 자동화 로직 실행|외부 시스템과 데이터 통신 담당|
|**핵심<br>기능**| 조건 처리, 반복, 데이터 변환, 작업 오케스트레이션 | API 호출, 인증 처리, 데이터 스키마 정의 |
|**사용<br>예시**| - 휴가 신청 → HR 시스템에 요청 등록<br>- 고객 문의 → CRM 티켓 생성 | - SharePoint 문서 목록 가져오기<br>- Outlook 이메일 전송 |
|**관계**| Flow는 **Connector를 활용**하여 외부 시스템과 상호작용 | Connector는 Flow에서 **데이터 소스 역할** 수행 |

<br>

**핵심 차이 요약**
- Flow = 자동화 로직
- Connector = 외부 서비스 연결 수단
  
즉, Flow는 “무엇을 할지”를 정의하고, Connector는 “어디서 데이터를 가져오고 보낼지”를 담당합니다.

---

실습
===
이번 실습에서는 앞에서 작성한 메일 발송 커넥터 시나리오를 확장하여 메일을 발송하고, 발송된 내용을 팀즈에도 알려주는 업무 흐름을 만들어 보겠습니다.

## 1. Flow 생성

Flow 생성을 위해 **[개요]** 에서 **[+도구 추가]** -> **[+새로운 도구]** 를 선택합니다.
<img width="1081" height="779" alt="image" src="https://github.com/user-attachments/assets/d963a73a-b1e3-4471-8547-e99663380b18" />

다음으로 **[에이전트 흐름]** 을 선택하여 신규 Flow를 생성하기 위한 디자이너 페이지로 이동합니다.
<img width="1063" height="783" alt="image" src="https://github.com/user-attachments/assets/605cccab-5010-442e-9b80-7d7d8c786b70" />

플로우 디자이너로 이동하면 기본적으로 2개의 액션이 추가되어 있습니다.
- 에이전트가 흐름을 호출 할 때: 트리거 역할을 하며, 이곳에서 사용할 Input 변수를 지정할 수 있습니다. 
- Respond to the Agent: 작업이 완료되고 Agent에게 결과값을 호출할 필요가 있을 경우, 이 액션을 통해 Output 변수를 만들어 전달할 수 있습니다

이번 시나리오에서는 메일 발송과 게시글 작성에 필요한 메일 주소,cc,제목,본문 값에 대한 입력만 필요하고<br>
별도의 output결과물을 반환할 필요하 없기 때문에 ""에이전트가 흐름을 호출 할 때"" 에서 Input 변수만 추가합니다.
<br>
<img width="675" height="395" alt="image" src="https://github.com/user-attachments/assets/722d2663-b985-4f0e-8117-347ffb671346" />
<br>
인풋 변수 추가는 ""에이전트가 흐름을 호출 할 때"" 를 선택하고 ""[+입력 추가]""를 클릭하여 추가할 수 있습니다.<br>
아래와 같이 입력 변수를 추가합니다.

<img width="648" height="225" alt="image" src="https://github.com/user-attachments/assets/4585ee60-3a34-481b-b959-8416ce75efc2" />

<br>
<img width="666" height="275" alt="image" src="https://github.com/user-attachments/assets/6833cedd-c723-408f-8f36-66ae1c114cf0" />

|변수명|타입|
|---|---|
|to|text|
|Subject|text|
|CC|text|
|Body|text|

---
## 2. 액션 커넥터 추가(메일)

변수 입력이 완료되면 다음은 입력받은 변수값을 기반으로 플로우안에서 진행될 2가지 작업을 순서대로 추가하여 설정합니다.
1. 메일 발송
2. 팀즈 채널에 게시물 게시

먼저 ""에이전트가 흐름을 호출할 때"" 하단에 [+] 버튼을 클릭하여 추가할 작업을 열람 할 수 있습니다.<br>
<img width="976" height="845" alt="image" src="https://github.com/user-attachments/assets/281c490c-f6a5-4f0e-9d45-d889db12748d" />

검색 또는 하단의 커넥터 리스트에서 ""Office 365 Outlook"" 을 선택, <br>이전과 마찬가지로 ""메일 보내기(V2)""를 선택합니다.
<img width="601" height="522" alt="image" src="https://github.com/user-attachments/assets/d0053a79-95b1-491d-a4c6-40ab7946b7c5" />

메일 보내기 커넥가 추가되면 앞 세션에서 실습한 내용과 유사한 UI가 표시 됩니다.<br>
고급 매개 변수를 선택하여 CC를 추가합니다
<img width="758" height="703" alt="image" src="https://github.com/user-attachments/assets/7997a038-ca65-43b0-b5b2-6da15c198873" />
<br>

이후 변수를 입력하기 위해 메일 보내기 커넥터 우측 상단에 **톱니 바퀴**를 선택하여 **동적 컨텐츠 사용** 을 클릭합니다.
<img width="797" height="218" alt="image" src="https://github.com/user-attachments/assets/c68a61b3-b360-47d3-a5b4-438e9391e183" />

이후 각 파라미터의 값에 /를 입력하 ""에이전트가 흐름을 호출할 때""에서 선언한 변수명들을 넣어줍니다.
<img width="427" height="359" alt="image" src="https://github.com/user-attachments/assets/fa2921eb-1cd4-455d-9abd-f100ce4fb41b" />

<img width="883" height="783" alt="image" src="https://github.com/user-attachments/assets/2cde6243-e7a3-40ad-88fb-2b2b37548717" />

<img width="821" height="783" alt="image" src="https://github.com/user-attachments/assets/a74ee7b7-c4a6-48ca-9c1b-b301b1cb22f1" />

변수를 모두 선언 하였다면, 메일보내기 흐름 작업은 완료가 되었습니다.<br>
이후 흐름을 호출하면, Agent가 전달한 각 변수의 값들이 메일 보내기 커넥터의 파라미터와 맵핑이 되어 메일이 발송되게 됩니다.
<br>

---
## 3. 액션 커넥터 추가 (팀즈 채널에 메세지 게시)

다음으로 메일 보내기가 완료되면 자동으로 팀즈 채널에 메세지가 게시될 수 있도록 새로운 커넥터를 추가합니다.<br>
앞선 작업과 마찬가지로 메일 보내기 액션 하단에  [+] 버튼을 클릭하여 
**[Microsoft Teams] - [채팅 또는 채널에서 메세지 게시]** 액션을 추가합니다.

<img width="762" height="683" alt="image" src="https://github.com/user-attachments/assets/3c7439ac-5fdf-402f-9780-1e1a9d12323e" />

아래와 같은 설정으로 알림 메세지를 업로드할 채널을 지정합니다

|파라미터|값|설명|
|---|---|---|
|Post as|Flow bot|사용자 이름으로 올릴지, Flow bot이 대신 올릴지 지정합니다.<br> 채널에 표시되는 이름이 달라집니다.
|Post in|채널|채팅,채널 중 어느 소통방식으로 메세지를 받을지 지정합니다.|
|Team|게시물을 업로드할 팀|게시물이 올라갈 채널이 소속된 팀을 지정합니다. <br>선택시 내가 접근가능한 팀이 자동으로 표시됩니다.
|Channel|업로드 채널|게시물이 실제 업로드되는 채널을 선택합니다|
|Message|텍스트 + body 변수값| 게시물의 내용물을 입력합니다. 이곳에서는 메일에서 입력된 Body을 기반으로 입력합니다|

<br>

메세지에는 고정된 메세지와 함께 메일 발송시 이용한 문구를 활용하기 위해
동적 변수를 추가토록 합니다.
> 동일하게 메세지 문구 내에서 / 를 입력하면 동적 변수를 추가할 수 있습니다.
```
새로운 문의사항이 도착했습니다. 확인해 주세요!<br> @{triggerBody()?['text_3']}
```

<img width="695" height="583" alt="image" src="https://github.com/user-attachments/assets/1ee9844e-50e0-4752-b185-da3a89fd1d08" />
<br>

작업이 완료되었으면 상단의 **게시** 버튼을 클릭하면 Flow가 게시되고 이후 [에이전트로 돌아가]를 선택시 자동으로 Agent 개요 페이지에서 추가된 흐름을 확인할 수 있습니다.. 
<img width="813" height="393" alt="image" src="https://github.com/user-attachments/assets/a3910866-899d-42ec-82fc-b8147b630d2e" />
<br>
<img width="981" height="408" alt="image" src="https://github.com/user-attachments/assets/b6fabf2c-cf60-469b-934f-b9c84f150b96" />

---
## 4. 플로우 적용
다음은 실제로 플로우가 동작할 수 있도록, 지침과 파라미터 설명을 추가토록 하겠습니다.<br>

**[도구]** 로 이동하면 앞서 생성한 Flow가 **제목 없음** 이라는 이름으로 추가가 되어있음을 확인 할 수 있습니다.

다만, 현재 구성은 이전에 했던 메일 보내기 작업과 중복되는 기능이기 때문에 먼저 **도구** 에서 **메일 보내기(v2)** 작업의 토글을 비활성화 처리를 합니다.
<img width="1258" height="379" alt="image" src="https://github.com/user-attachments/assets/69e1c73e-aaae-4a62-bb5b-9b7c22a941d4" />

이후 **제목 없음** Flow로 이동하여 **메일 보내기(v2)** 에서 진행한 작업과 동일한 작업을 적용해 줍니다.
|파라미터|값|
|---|---|
|이름|메일보내기 및 알림 흐름|
|설명|사용자를 대신하여 메일을 발송해야하는 작업이 있을 경우 이용합니다. <br> 업무 담당자에게 에스컬레이션 메일을 전송해야할 때 이용합니다.|
|To|AI로 동적으로 채우기 - 수신자 입니다. 담당자 리스트를 참고하여 관련 업무에 해당하는 사용자의 메일주소를 입력합니다. 메일 주소는  someone@contoso.com 형식을 따릅니다. 여러명이 있을 경우 ; 을 이용하여 구분합니다.|
|Subjuect|AI로 동적으로 채우기 - 메일 제목입니다. [업무 문의] 문의 내용요약 형식으로 작성합니다.|
|Body|AI로 동적으로 채우기 - 메일의 본문입니다. 실제 담당자에게 문의하는 내용을 정리하여 입력합니다. <br> 문의일자 및 시각, 문의자, 문의 내용등이 HTML 형식으로 입력되어야 합니다.|
|CC|사용자 지정 값 - User.Email|
|실행 후|특정 응답 보내기 - 지시하신대로 해당 내용을 담당자에게 메일로 전송하였습니다. <br> 빠른시일내로 담당자가 따로 연락을 드리겠습니다.|
<br>
<img width="1181" height="1145" alt="image" src="https://github.com/user-attachments/assets/7d09943b-5053-4853-9cae-a95ed665b2db" />

<br>

설정이 완료되면 **저장** 을 한 뒤 **개요** 로 이동하여 지침을 수정합니다.

기존 지침은, 에스컬레이션이 될 경우 **메일 보내기(V2)** 도구를 이용하라고 설정이 되어있었기에,
지침에서 해당 도구의 선언을 지우고, **메일 보내기 및 알림 흐름** 을 선언하고 저장을 합니다.

<img width="1010" height="639" alt="image" src="https://github.com/user-attachments/assets/e56bbe69-d6e2-4bd5-b90c-280c0e7b226a" />

---

테스트를 통해 실제로 플로우가 동작하는지 확인해 봅니다.

<img width="1278" height="1169" alt="image" src="https://github.com/user-attachments/assets/fbcf1326-89f0-4f7b-b3d9-bf84977d0f43" />
<br>
<br>

<img width="1803" height="526" alt="image" src="https://github.com/user-attachments/assets/a7341ff1-eb08-4bb1-a339-3fbd029d338d" />
<br>
<br>

<img width="633" height="705" alt="image" src="https://github.com/user-attachments/assets/c4d2c9bd-d5a3-4d38-92b2-7778793fdc4a" />
<br>
<br>


---

## Step 5: 에이전트 게시 및 공유


TBD

