---
layout: chapter
title: "커스텀 에이전트 만들기 기초편 #1"
short_title: "기초편 #1: 블로그 포스트 에이전트"
description: "Copilot Studio에서 블로그 포스팅 에이전트를 만들어보는 핸즈온 실습입니다. 에이전트 생성, 참조자료 추가, 도구(MCP/커넥터) 추가, 게시 및 배포까지 단계별로 진행합니다."
order: 1
icon: "🎯"
category: workshop
---

---

## 실습 개요

# 커스텀 엔진 에이전트 만들기 기초편 #1

## 블로그 포스팅 에이전트 확장

이번 실습은 Copilot Studio lite에서 실습한 [**블로그 포스팅 에이전트**](https://github.com/chichoi1991/Copilot_Agent/tree/main/%EC%BD%94%ED%8C%8C%EC%9D%BC%EB%9F%BF%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20%EC%9B%8C%ED%81%AC%EC%83%B5/%EC%BD%94%ED%8C%8C%EC%9D%BC%EB%9F%BF%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20Lite) 를 메일 발송, 팀즈 게시물 생성 기능까지 제공하는 커스텀엔진 에이전트로 만들어 보도록 하겠습니다.

<img width="1861" height="1392" alt="image" src="https://github.com/user-attachments/assets/dd2943fa-454d-4d49-ada3-f9df313cf34a" />

<br> <br> 

이 실습에서는 다음의 작업들이 진행됩니다.

1. 에이전트 생성 및 기본 설정
2. 참고자료 및 도구 추가 (MCP, 커넥터)
3. 테스트, 게시 및 공유


커스텀 엔진 에이전트와 선언형 에이전트의 차이는 워크샵 개요 페이지에서 확인할 수 있습니다. <br>
[**워크샵 개요**](https://github.com/chichoi1991/Copilot_Agent/blob/main/%EC%BD%94%ED%8C%8C%EC%9D%BC%EB%9F%BF%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20%EC%9B%8C%ED%81%AC%EC%83%B5/README.md) 




---

## Step 1: 에이전트 생성 및 기본 설정

# Custom Engine Agent 생성 및 지침 작성 실습


## 1. Copilot Studio 사이트 접속

### 에이전트 생성을 위해 [Copilot Studio 페이지: copilotstudio.preview.microsoft.com ](https://copilotstudio.preview.microsoft.com) 에 접속 합니다.
![image](https://github.com/user-attachments/assets/27577404-175d-4646-9caa-72be7e07b94d)

> 실습은 preview 사이트 (copilotstudio.preview.microsoft.com) 에서 진행합니다.

<br>

## 2. 개발환경 변경
사이트에 접속이 되면, 우측 상단에 환경을 선택하여 사전에 전달받은 실습 환경을 선택하여 이동합니다.
<img width="1524" height="1392" alt="image" src="https://github.com/user-attachments/assets/68e1bdfd-bec8-4ca7-881b-56a0cbb4f1cf" />

<br> <br> 

만약 아래와 같은 화면이 처음 떴다면, 우측 상단의 ... 선택하여 에이전트 **생성 취소** 를 누르면 위의 화면으로 돌아가게 됩니다.
<img width="1524" height="561" alt="image" src="https://github.com/user-attachments/assets/4794e942-e580-437b-ab0f-2388c6ef330d" />

<br> <br> 

## 3. 에이전트 만들기
환경을 이동하고 나면 에이전트 만들기를 시작합니다. <br>
좌측 패널의 +Create 를 선택한 후, + New Agent를 클릭합니다.
<img width="1528" height="469" alt="image" src="https://github.com/user-attachments/assets/dd5962f6-f5a4-4ddd-ad82-90683227473d" />

<br> <br> 

이후, 아래와 같은 에이전트 만들기 창이 나옵니다. 우측 ... 선택하여 언어가 Ko-Kr로 되어있는지 확인합니다. <br>
만약 안되어 있을 경우 선택하여 언어를 변경해 줍니다.

<img width="1524" height="755" alt="image" src="https://github.com/user-attachments/assets/5e562739-0f9f-4462-bda1-5146f5857766" />

<br> <br> 

이후 최초 화면에서는 자연어를 통해 에이전트의 기본 설정들을 작성하는데 도움을 받을 수 있습니다. <br> 
이번 실습에서는 따로 진행하지 않고 곧바로 만들기를 눌러 에이전트를 생성합니다. <br>
<img width="1248" height="1261" alt="image" src="https://github.com/user-attachments/assets/ebe5a018-c2c1-4a0b-9fc5-b1be25928015" />
<br> <br> 

## 4. 에이전트 기본 설정

만들기를 누르고 나면 다음과 같이 에이전트 설정 페이지가 표시됩니다.
이제 이곳에 기본적인 에이전트의 이름과 설명, 지침을 입력합니다.

먼저 우측 상단의 [설정] 을 선택하여 에이전트의 기본 설정들을 확인 및 구성합니다.
<img width="1524" height="454" alt="image" src="https://github.com/user-attachments/assets/4dffbd0f-4bd3-4f64-8f5f-e4c9f84106a4" />
<br> <br>


설정에서는 생성형 오케스트레이션 사용여부, 추론 모델 이용, 언어 모델등 에이전트의 다양한 기능들을 설정할 수 있습니다.
이번 실습에서는 다음의 기능들을 활성화 처리 합니다. <br>

| 기능 | 설정 |
| :---: | --- |
|생성형 오케스트레이션 이용 여부 | 활성화 |
|에이전트 언어모델| GPT-4.1 |
|일반 참조 자료 사용| 활성화|
|웹의 정보 사용| 활성화 |
|코드 인터프리터| 활성화 |
|의미 체계 검색을 통한 테넌트 그래프 접지| 활성화 |

> 클래식 vs 생성형의 차이는 [여기](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-generative-actions)를 참고할 수 있습니다.

<img width="1524" height="1050" alt="image" src="https://github.com/user-attachments/assets/3c1e81c2-6bdf-41d7-a987-7462d75a0d4b" />
<br> <br> 
설정을 모두 마쳤으면, 중앙 하단의 **저장** 버튼을 눌러 설정 저장하고 닫습니다.
<img width="1504" height="1035" alt="image" src="https://github.com/user-attachments/assets/2220a13c-3551-4c14-b6f0-f52013d8c997" />

<br> <br> 

## 5. 에이전트 이름, 설명 및 지침 설정

다음은 에이전트의 이름, 설명 및 지침을 설정합니다.

상세정보 탭과 지침 탭 우측의 [Edit] 을 선택하여 에이전트의 정보를 수정할 수 있습니다.
<img width="1504" height="1035" alt="image" src="https://github.com/user-attachments/assets/ca8cb7e1-945e-40a0-9439-dac772520caa" />

<br> <br> 


입력할 정보는 다음과 같습니다.


### 에이전트 이름
```
블로그 포스트 에이전트 - [여러분의 이름]
```

### 에이전트 설명
```
인터넷, 쉐어포인트 자료를 참고해 블로그 포스트 작성, 초안 검토, 이미지 생성을 지원하는 에이전트 입니다
```

### 지침
```
## 0) 에이전트 역할 정의
당신은 사용자가 블로그 포스트 작성·검토·메일 발송, 이미지 생성을 위한 지침 작성을 효율적으로 수행할 수 있도록 돕는 선언형 에이전트입니다.  
모든 답변은 한국어로 작성합니다.
---

## 1) 지원 능력

### 1.1 블로그 글 작성(Authoring)
- 글감/프롬프트 제안, 구조(아웃라인) 추천, 아이디어 브레인스토밍
- 문법·스타일 제안(가독성, 참여도 향상)
- 본문을 기반으로 서론/결론 자동 생성
- (확장) SEO 키워드/메타설명 제안, 제목·슬러그 후보 생성
- (확장) 톤 & 보이스 프리셋(예: 전문가형, 친근형, 저널리즘형)

### 1.2 블로그 글 검토(Reviewing)
- 명료성/응집성/논리성 중심의 초안 리뷰
- 개선 포인트 하이라이트 + 구체적 수정안 제시(문장/단락 단위)
- 표절 가능성 신호를 검토하고 재서술(Paraphrase) 제안
- (확장) 독자 페르소나 기준의 난이도/용어 통일성 점검 체크리스트

### 1.3 이미지 생성용 프롬프트 작성(Create prompt for Image Creation)
- 본문 주제와 맥락에 맞는 헤더/썸네일/인포그래픽/차트 생성용 프롬프트 제시
- 스타일(일러스트/실사/플랫/3D 등), 비율(16:9, 4:3, 1:1), 해상도 정보도 프롬프트에 함께 추가
- 웹 최적화(용량, 포맷) 및 라이선스/출처 안내
- 접근성 텍스트(ALT) 자동 생성, 색상 팔레트/브랜드 가이드 준수

### 1.4 코드 해석(Code Interpretation)
- 본문 내 코드 스니펫 자동 감지
- 문법 하이라이팅, 구문 오류 체크(언어 감지 포함)
- 성능·가독성 개선 제안, 복잡도/시간복잡도 주석 보강
- 실행 예시 입출력/테스트 케이스 초안, 보안 취약점 주의사항


### 1.5 자료 검색(Enterprise Search)
 - Sharepoint에 저장된 제품의 Specsheet를 찾아 제품 정보를 제공합니다.
 - 현재 저장되어있는 제품 리스트를 테이블 형태로 제공
 - 블로그 초안 작성을 위한 특정 제품 기술 정보 제공

---


## 2) 사용 지침

### 2.1 작성 모드 설정(Choose writing mode)
- SEO 모드: 키워드 난이도/검색 의도/LSI 키워드 추천
- 간결 모드: 3문단 요약 + 핵심 불릿 5개
- 튜토리얼 모드: 단계별(1→N) 지시 + 스크린샷 캡션 자리표시자
- 뉴스레터 변환: 700~900자 요약 + CTA + 관련 링크 3


### 2.2 새 블로그 글 시작(Starting a New Blog Post)
중요! 반드시 작성모드를 어떻게 할지 질의하고 이후 작업을 진행합니다.
1) 작성 모드 설정 질의
2) 주제/핵심 아이디어 질의  
3) 아웃라인 제안(섹션 구조 + 각 섹션 포인트)  
4) 관련 키워드/구문 추천(SEO/독자 검색 의도 반영)  
5) 선택한 아웃라인 기반 서론 초안 생성

### 2.3 초안 검토(Reviewing a Draft)
1) 문법/스타일/논리 흐름 분석  
2) 문장별 수정 제안과 대안 표현 제시  
3) 잠재적 표절 리스크 신호 표시 및 재서술 제안  
4) 요약/메타디스크립션/슬러그 추천(선택)


### 2.4 이미지 생성용 프롬프트 작성(Create prompt for Image Creation)
0) 이 에이전트는 이미지 생성이 불가하며, 프롬프트만 작성한다는 점을 고지. 고지 이후 이미지 생성은 Copilot app에서 할수 있음을 리다이렉트 링크와 함께 설명 링크: 
1) 원하는 이미지 설명/스타일/비율/해상도 요청  
2) 여러 시안용 프롬프트 제시 후 선택 유도  
3) 웹 최적화 및 출처/라이선스 안내  
4) 접근성(ALT) 텍스트 생성
5) 최종 이미지 생성용 프롬프트 작성


### 2.5 코드 해석(Interpreting Code)
1) 코드 스니펫 자동 감지  
2) 언어 식별 → 하이라이팅/오류 체크  
3) 효율성/가독성 개선 제안  
4) 안전/보안 관련 주의사항(입력 검증, 비밀정보 제거 등)


---

## 3) 예시 워크플로우(원문 시나리오 포함)

사용자: "Microsoft 365 환경에서의 AI가 가지는 장점에 대한 블로그를 작성하고 싶어”  
에이전트: “좋습니다! 먼저 어떤 모드로 블로그를 작성하시고 싶으신지 알려주세요. 
- SEO 모드: 키워드 난이도/검색 의도/LSI 키워드 추천합니다
- 간결 모드: 3문단 요약 + 핵심 불릿 5개을 뽑아냅니다
- 튜토리얼 모드: 단계별(1→N) 지시 + 스크린샷 캡션 자리표시합니다
- 뉴스레터 변환: 700~900자 요약 + CTA + 관련 링크 3개를 제공합니다.
사용자: "1"
에이전트: “좋습니다! SEO 모드를 선택하셨네요. 추천 아웃라인은 다음과 같습니다:  
- Introduction(서론)  
- Benefits of AI in Microsoft 365(이점)  
- Case Studies(사례)  
- Challenges and Considerations(과제·고려사항)  
- Conclusion(결론)  
서론부터 시작할까요?”

사용자: “응”  
에이전트: “초안 서론입니다:  
‘Artificial Intelligence (AI) is revolutionizing the IT industry by improving diagnostics, plans, and outcomes. In this blog post, we will explore the various benefits of AI in Microsoft 365 and examine real-world case studies.’  
어떠신가요?”

사용자: “블로그 로봇 이미지를 만들어줄래?”  
에이전트: “죄송하지만 저는 이미지 생성을 지원하지 않습니다. 하지만 이미지 생성을 위한 전문 프롬프트를 작성할 수 있습니다.  ‘블로그 로봇’ 이미지 프롬프트를 다음 3가지 스타일로 제안드립니다(16:9 웹 최적화).  
1) 일러스트(플랫, 라인 아트)  
2) 3D 렌더(메탈릭 질감, 소프트 조명)  
3) 아이소메트릭(노트북·에디터 UI 포함)  
어떤 걸 원하시나요?”

사용자: “두 번째 옵션으로 할께”  
에이전트: “두 번째 옵션으로 진행했습니다. ALT 텍스트도 함께 제안드립니다:  
‘노트북 화면 앞에서 글을 쓰는 귀여운 3D 로봇, 파란 계열의 조명과 금속 질감 디테일’  
다음 섹션 ‘Benefits of AI in Microsoft 365’로 이어가겠습니다. 포함할 핵심 포인트는 …(요약 항목 제시)”

---

## 4) 상호작용 프롬프트(운영 팁)

- 주제 파악: “작성할 주제/핵심 메시지는 무엇인가요? 대상 독자와 톤도 알려주세요(예: 전문가/일반, 친근/공식).”
- 아웃라인 제안: “다음 중 어떤 구조가 좋을까요? (A/B/C) 필요하면 혼합도 가능합니다.”
- 스타일 가이드: “문체(반말/존댓말), 문장 길이, 이모지 사용 여부, 표/코드블록 허용 여부를 알려주세요.”
- 이미지 요구사항: “스타일(일러스트/실사), 비율(16:9 등), 키워드, 색감, 텍스트 포함 여부를 알려주세요.”
- 코드 스니펫: “사용 언어/버전, 실행 환경(예: Python 3.11), 기대 출력/성능 제약이 있나요?”


---

## 5) 출력 형식 가이드(마크다운 중심)

- 헤딩: `#, ##, ###` 일관 사용
- 목록: 핵심 메시지는 불릿 → 필요 시 번호 목록으로 절차화
- 표: 비교/체크리스트는 표로 제공
- 코드: ```lang 블록 + 주석 + 개선 전/후 비교
- 이미지: 캡션 + ALT 텍스트 + 권장 크기/비율
- 출처: 인용·차용 시 출처 표기

---
## 6) 검수 체크리스트

- 목적/독자/톤 일치 여부
- 서론-본문-결론의 논리적 연결성
- 문장 간 중복·장황성 제거, 문장 길이 균형
- 표절 신호(특정 표현·구조 과다 유사) 점검 → 재서술
- SEO(제목/요약/키워드/내·외부 링크) 점검
- 이미지 라이선스/ALT 텍스트/용량 최적화
- 코드 정확성, 보안/성능 주의사항

---

## 7) 안전/윤리 가이드(필수)

- 개인·민감 정보 포함 금지(PII 제거)
- 저작권·라이선스 준수, 출처 명확화
- 의도적 오정보, 혐오·차별·유해 행위 조장 금지
- 코드 예시는 안전한 기본값 채택(비밀키 하드코딩 금지)

---

```

<br> <br> 

입력을 모두 마치고 Save 버튼을 눌러 에이전트 기본 정보와 지침을 저장합니다.

<img width="1504" height="1035" alt="image" src="https://github.com/user-attachments/assets/813f3b32-d16b-44d2-bea0-98473b152280" />


---
**축하합니다!**

에이전트의 기본 지침 설정이 완료되었습니다.
다음은 에이전트가 이용할 참조자료와 도구를 추가하도록 합니다.


---

## Step 2: 참조 자료 추가

# 에이전트에 참조 자료 추가

이번 실습은, 에이전트가 웹 서치 정보와 함께 쉐어포인트에 미리 저장해둔 PDF형태의 데이터시트를 기반으로 답변을 할 수 있도록
참조자료를 설정해 주도록 합니다.

## 📚 Copilot Studio의 참조자료(Knowledge) 역할
Copilot Studio에서 **참조자료(Knowledge)**는 에이전트가 기업 내부 문서나 외부 정보에 기반해 정확하고 신뢰할 수 있는 답변을 생성할 수 있도록 돕는 핵심 기능입니다.

아래 표는 그 역할을 간단히 설명해주는 표 입니다.

| 항목 | 설명 |
|:------:|------|
| **정의** | 에이전트가 답변을 생성할 때 참고할 수 있도록 연결된 문서, 웹페이지, 데이터 등 외부 정보 소스 |
| **주요 기능** | 사용자 질문에 대해 **정확하고 근거 있는 답변**을 생성할 수 있도록 지원 |
| **형식** | PDF, HTML, Word, Excel, 웹 링크 등 다양한 형식의 문서를 지원 |
| **활용 예시** | - SharePoint에 저장된 매뉴얼 검색<br>- 내부 보고서 요약<br>- 통계 자료 기반 인사이트 제공 |
| **중요성** | 참조자료가 없으면 에이전트는 일반적인 지식만으로 답변하며, **기업 맞춤형 정보 제공이 어려움** |
| **설정 위치** | Copilot Studio의 **"Knowledge" 탭**에서 연결 가능 |

<br> <br> 

Copilot studio의 커스텀 엔진 에이전트에서는 Microsoft 365 내의 데이터 뿐만 아니라,
다양한 데이터 소스에 저장되어 있는 정보를 참조자료로 활용하여 답변에 이용할 수 있습니다.

## 📥 Copilot Studio에서 활용 가능한 참조자료(Knowledge) 데이터 소스 유형 요약
| 카테고리 | 데이터 소스 | 설명 |
|:----------:|:--------------:|------|
| **문서 기반** | PDF, Word, Excel 등 업로드 파일 | Dataverse에 업로드 후 자동 색인화되어 검색 가능 |
| **클라우드 저장소** | SharePoint, OneDrive | 조직 내 문서 저장소에서 직접 참조 가능 |
| **웹 기반** | 공개 웹사이트 URL | Bing 검색을 통해 웹페이지 내용 참조 |
| **엔터프라이즈 시스템** | ServiceNow, Salesforce, Confluence, ZenDesk 등 | 실시간 커넥터를 통해 외부 시스템의 지식 기반 또는 티켓 정보 참조 |
| **테이블 데이터** | Dataverse 테이블 | 구조화된 테이블 데이터를 기반으로 질의 응답 가능 |
| **API 기반** | 외부 HTTP API, YAML 정의 | OnKnowledgeRequested 트리거를 통해 실시간 API 호출 가능 |


<img width="1023" height="742" alt="image" src="https://github.com/user-attachments/assets/b01a1a1c-75cd-46ec-9daa-015792a8f561" />
<img width="1023" height="740" alt="image" src="https://github.com/user-attachments/assets/566c5a93-4c17-4a44-a229-35d3eb43ca51" />

---

## 실습

먼저 에이전트 개요에서 스크롤을 내리면 참조자료 탭이 있습니다. <br>
이곳에서 **웹 검색** 토글을 활성화 시켜 줍니다. <br> 
<img width="512" height="254" alt="image" src="https://github.com/user-attachments/assets/c2b81140-34b5-46ba-935e-3d0c991b775c" />
<br> 
해당 기능을 활성화 하면 Agent는 Bing search 정보를 기반으로 사용자의 질문에 답변을 할 수 있습니다. <br>

이어서 쉐어포인트의 데이터를 참조할 수 있도록 **+참조 자료 추가** 를 클릭합니다. <br>
<img width="512" height="254" alt="image" src="https://github.com/user-attachments/assets/5e796dd8-8272-4486-b465-028dbdcf5f4e" />
<br> <br> 

버튼을 클릭하면 어디에 저장되어 있는 참조 자료를 추가할지 팝업창이 나오게 됩니다. <br> 
이번 실습은 쉐어포인트의 데이터를 참고할 것이므로, SharePoint를 선택합니다. <br>
<img width="538" height="392" alt="image" src="https://github.com/user-attachments/assets/87cc18ab-1ed9-444d-ba8e-dc86efe8ff84" />
<br> <br> 

이후 쉐어포인트 사이트 주소를 직접 입력하거나, **항목 찾아보기** 를 클릭하여 최근에 접근한 사이트를 선택합니다.
<img width="554" height="404" alt="image" src="https://github.com/user-attachments/assets/05fe197d-56ef-4af7-b481-2f186c10be93" />

 
이번 실습은 이전 Copilot studio lite와 마찬가지로 쉐어포인트 사이트의 특정 라이브러리 폴더 내부 파일만 참고할 예정이기에 쉐어포인트 폴더의 path를 입력합니다.

정확한 사이트 주소를 알기위해 쉐어포인트 사이트로 이동합니다. <br>
이후 추가할 폴더 라이브러리를 이동, 우측에 **세부 정보** 를 클릭하여 오른쪽 사이드에 세부 정보 사이드 패널을 활성화시킵니다. <br>
마지막으로 하단의 **경로** 를 복사하면 라이브러리 폴더의 위치를 확보 할 수 있습니다.

<img width="1380" height="1278" alt="image" src="https://github.com/user-attachments/assets/b4e30695-2f74-4c3d-a374-cdf90102e24d" />
<br> 
항목 찾기를 통해 사이트, 라이브러리를 선태하거나  사이트 입력창 확보한 링크를 붙여넣고 추가를 하면 아래와 같이 표시가 됩니다. <br>
<img width="1092" height="792" alt="image" src="https://github.com/user-attachments/assets/02429176-066d-47c3-b1e9-f16f1fbe89f4" />
<br> 

마지막으로 설명란에 아래 내용을 추가하여 이 참조자료가 무엇에 관한 자료인지 설명을 보강 합니다.
```
이 참조 자료 원본은 냉장고, 식기세척기에 대한 Spec Sheet 정보를 제공합니다.
데이터는 PDF형식으로 되어 있으며, 모델명_제품타입_spec sheet 형식으로 파일명이 저장되어 있습니다.
예: LSSB2692ST_Core_Refrig-Spec_Sheet -> 제품명: LSSB2692ST, 제품타입: Core_Refrig(냉장고), 문서내용: Spec_Sheet

```

이후 **"에이전트 추가"** 버튼을 클릭하면 에이전트는 쉐어포인트 사이트의 PDF파일과 웹정보를 기반으로 답변을 할 수 있게 됩니다.

<img width="1720" height="1392" alt="image" src="https://github.com/user-attachments/assets/ac38d914-1667-4872-a022-2a63d237f5f4" />

<br>
<br>
---

**축하합니다!** <br>
참조자료를 추가를 통해 에이전트가 사내 데이터에 대한 답변을 할 수 있도록 구성을 마쳤습니다. <br>
다음은 도구 추가를 통해 에이전트가 메일 발송, 팀즈 게시물 등록을 할 수 있도록 실습해 봅니다.


---

## Step 3: 도구 추가 (MCP 커넥터)

# 에이전트에 도구 추가#1 (MCP 커넥터)

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
<br> <br> <br> 

## 실습

이번 실습에서는 에이전트가 사용자를 대신하여 생성된 블로그/뉴스레터 초안을 메일로 발송해주기 위한 도구를 추가해보도록 합니다.

### 1. 메일 발송 도구 추가
에이전트 설정창에서 [도구] - [+ 도구 추가] 를 선택합니다.
<img width="970" height="589" alt="image" src="https://github.com/user-attachments/assets/4ff4e0b4-8fd1-4bb0-9c79-9097c94156ff" />

모던 컨텍스트 프로토콜에서 "이메일 관리 MCP 서버"를 선택합니다. 
<img width="543" height="396" alt="image" src="https://github.com/user-attachments/assets/9d324745-f91b-4588-9729-df8fa9cb315e" />

도구를 선택하면, Office 365 outlook 커넥터를 이용하기 위한 OAuth 연결 창이 뜨며, <br>
[새 연결 만들기]를 통해 접속한 계정의 로그인 정보를 입력후 만들기를 클릭합니다. <br>
<img width="548" height="406" alt="image" src="https://github.com/user-attachments/assets/d4260866-c5ea-48fb-aaad-3a9d9f2552ec" />
<br> 
<img width="1022" height="738" alt="image" src="https://github.com/user-attachments/assets/599eb77c-27b3-4ca8-834e-47078913cd4d" />
<br> <br> 
연결이 완료되면 아래 화면과 같이 연결된 계정 정보와 초록색 아이콘이 표시됩니다. <br> 
[추가 및 구성] 을 선택하여, 메일 발송 커넥터의 상세 설정으로 이동합니다. <br> 
<img width="1044" height="768" alt="image" src="https://github.com/user-attachments/assets/a669d0f8-228c-429f-88d2-93c7351db777" />
<br> 
<br> 
<br> 
## 2. 메일 발송 커넥터 기본 설정
다음은 Agent가 메일을 발송하기 위해 필요한 설정들을 지정합니다.<br> 

기본적으로 도구가 추가되면 가장 먼저 해야하는 작업은 **설명** 란에 이 도구가 언제, 어떻게 사용되는지를 입력합니다. <br> 

이 설명은 Agent가 도구를 선택해야할 때 참조하는 설명으로 상황이 최대한 자세하게 설명되어 있어야 정확한 지시에 맞추어 동작합니다.<br> 

다만, 추가한 MCP 서버의 경우 이미 MCP 서버단에서 서버의 설명과 각 도구의 설명들을 미리 작성을하여 업데이트가 된 상태이기 때문에 별도의 설명을 추가하는 작업을 하지 않아도 됩니다.<br> 
<br> 
<br> 
다음으로 추가 세부 정보창을 열어 인증 정책을 **[제작자 제공 자격 증명]** 으로 변경합니다.
<img width="1056" height="694" alt="image" src="https://github.com/user-attachments/assets/e9ab862e-b6bf-473b-969f-bf1e92c9c5c6" />

기본적으로 "최종 사용자 자격 증명" 으로 선택되어 있으며, 이 경우 에이전트를 사용하는 사용자가 액션을 이용할 때 로그인 절차를 1회 거치게 되어있습니다.

사용자의 권한으로 메일박스를 검색하거나, 데이터를 조회해야할 경우 그대로 유지하고
특정 시스템에 접근이 가능한 계정이 한정되어 있을 경우(예, SAP, DB 접근 등) 
제작자 제공 자격 증명으로 변경하여 사용자들이 로그인을 하지 않더라도 데이터 접근이 가능토록 구성합니다.

---
## 3. 메일 관리 MCP 서버 사용 도구 설정

MCP서버에서 제공되는 도구들 중, 실제로 사용할 도구들만 활성화 시키는 작업을 합니다. <br>
이작업은 옵션이나, 지침에 정의되지 않은 도구들이 있을 경우, Agent가 도구를 선택함에 있어 정확도를 낮출수 있기 떄문에 가급적 필요한 도구만 활성화 시키도록 합니다.

도구에서 기능 전체 기능 활성화 옵션을 끄게되면, 각각의 도구들만 선택적으로 허용할 수 있습니다. <br>
이번 시나리오에서는 메일 발송만 필요하기 때문에 SendEmail 도구 이외에 다른 기능은 모두 비활성화 처리 합니다. <br>
<img width="1055" height="980" alt="image" src="https://github.com/user-attachments/assets/fc646c29-01d3-45bb-a25f-9c8670385adf" />

이후 상단의 **저장** 버튼을 클릭하면 이메일 발송도구가 준비되었으며,
다음은 에이전트가 메일을 발송할 때, 어떻게 보내야하는지에 대한 지침을 작성하도록 합니다.


## 4. 에이전트 지침 수정
메일 발송 도구 설정이 완료되었으나, 
'사용자가 메일을 발송해줘' 라고 입력을 할 경우 도구가 선택하여 동작을 하겠지만
담당자가 누구인지, 제목을 어떻게 해야하는지, 본문은 무엇을 입력해야하는지와 같은 상세 지침이 지정되어 있지 않습니다.

따라서, 다시 **개요**로 돌아가, 추가된 도구에 대한 지침을 입력해 주도록 합니다.

<img width="1094" height="828" alt="image" src="https://github.com/user-attachments/assets/0e13eae5-14b5-4374-9788-b815e090596e" />


지침 내 1) 지원 능력 파트아래에 추가
```
### 1.6 메일 발송(send a mail)
- 작성된 블로그 초안을 메일 뉴스레터로 발송합니다
- Subject는 사용자에게 질의하여 메일 뉴스레터 제목을 받습니다
- To는 사용자에게 질의하여 메일주소를 입력 받습니다
- 중요! Body에는 HTML, CSS 스타일을 적용하여 레이아웃과 디자인을 적용합니다

```
지침 내 3) 예시 워크플로우(원문 시나리오 포함) 에 추가
```
사용자: "이 내용으로 메일을 보내줘"
에이전트: "네 해당 내용을 HTML과 CSS 스타일을 적용하여 메일을 발송하겠습니다."
```
지침 하단에 추가
```
## 8) 메일 발송 형식 가이드
 - to: 수신자, mail address를 입력
 - subject: 메일 제목, 본문 내용을 요약하여 메일 제목 초안을 작성하여 사용자에 제시하되, 사용자에게 질의를 하여 메일 제목을 작성. 
 - body: 메일 본문이며, HTML과 CSS 스타일 형식을 적용하여 디자인적 요소를 추가하여 본문을 작성

---
```
지침 편집을 마치고 저장을 한 후, 테스트를 하여 메일이 정상적으로 발송되는지 확인해 봅니다.
테스트 프롬프트
```
식기세척기 제품군들에 대해 뉴스레터를 만들어서 **[메일 주소]** 에게 메일로 보내줘
```
Copilot Studio 테스트 화면
<img width="1704" height="1259" alt="image" src="https://github.com/user-attachments/assets/1b8124ba-fd06-4167-877a-22ab78461c49" />

> 지침에 따라 맞추어 문서 형식과 초안을 만들어 제안후 메일을 발송

메일 수신 화면
<img width="1544" height="1528" alt="image" src="https://github.com/user-attachments/assets/a9879c4f-8caf-47b0-935d-47e89498d4a3" />


---
이로서 도구를 통해 에이전트가 추가적인 액션을 이용할 수 있게 되었습니다. <br>
다음은 동일한 내용으로 팀즈 채널에 메세지를 게시하는 도구를 추가해 보도록 합니다.


---

## Step 4: 도구 추가 (플러그인 커넥터)

# 에이전트에 도구 추가#2 (플러그인 커넥터)

이번에는 MCP서버가 아닌, 일반 플러그인 커넥터를 도구로 추가해 보도록 하겠습니다. <br>
MCP서버의 경우 각 도구의 설명이나 Input 변수에 대한 설명이 미리 작성되어 추가적인 작업을 할게 없었지만,
일반 커넥터를 도구로 호출하게 될 경우, 이에 대한 설명들을 직접 작성해 주어야 합니다. <br>

부가적인 작업이 될 수 있으나, 커넥터에 입력되는 변수, 시나리오등이 복잡하거나 일반적이지 않을 경우, <br> 
일반 커넥터를 이용하여 위와 같은 작업을 하면 더 명확하게 지침을 줄수 있다는 장점이 있습니다.


---

## 실습
이번 실습은 에이전트가 뉴스레터 또는 블로그 글을 팀즈의 특정 채널에 게시물로 등록하도록 구현해 보도록 하겠습니다. <br>

### 팀즈 채널에 메세지 게시 도구 추가

마찬가지로 **개요** 에서 **+도구 추가** 를 선택합니다.
<img width="1186" height="686" alt="image" src="https://github.com/user-attachments/assets/68cf3d4d-bdf0-48a0-bfe7-28a368670d33" />
<br> <br> 
추천 또는 도구 검색에서** Microsoft Teams**를 검색하여 선택합니다.
<img width="746" height="464" alt="image" src="https://github.com/user-attachments/assets/f72d7d76-da73-43a1-8845-adf372f94009" />
<br> <br>

팀즈 도구 모음중에, **채팅 또는 채널에서 메세지 게시** 도구를 선택합니다.
<img width="715" height="455" alt="image" src="https://github.com/user-attachments/assets/56fda9c2-bdc6-4214-b817-38e500dacacb" />
<br> <br> 

이전과 마찬가지로 연결이 안되어 있을 경우, **새 연결 만들기**를 통해 에이전트와 도구를 연결하고 <br>
**추가 및 구성** 을 선택에 도구를 추가 및 설정을 계속합니다. <br>

<img width="697" height="451" alt="image" src="https://github.com/user-attachments/assets/6fe1a004-f626-421f-9ac2-d569287f7b1d" />
<br> <br> <br> 
### 도구 설정
도구 추가가 완료되었으면 아래와같은 세부정보 페이지가 표시되며, 
이전 MCP 서버 도구와 다르게 이름, 설명, 입력 등에 대한 정보를 설정할 수 있음을 볼 수 있습니다.
<img width="1111" height="1101" alt="image" src="https://github.com/user-attachments/assets/44b46518-e066-4c2e-beda-d70959129104" />
<br> <br> 
여기서 설명, 입력, 완료 설정들을 아래와 같이 변경 합니다.

**설명**
```
사용자가 팀즈, 팀즈 채널에 게시물을 게시,등록을 요청할 경우 이 도구를 이용합니다.
```
<img width="1021" height="529" alt="image" src="https://github.com/user-attachments/assets/43630d5b-9f26-48c9-9a45-961f8983dafb" />

<br> <br> 

----
**입력**
<br> <br>
입력 탭에서 다음을 사용하여 채우기 필드의 값을 선택하면 다음과 같이 AI로 동적으로 채우기, 사용자 지정값 두개중 하나를 선택 할 수 있습니다.
<br> 
Post as, Post in 모두 사용자 지정값을 선택합니다. <br> 
<img width="495" height="239" alt="image" src="https://github.com/user-attachments/assets/d9228dec-3709-4f7a-b574-40827b817c54" />
<br> <br> 
이후 값을 선택하면 다음과 같이 선택할수 있는 옵션이 나오며, <br> 
Post as에는 User를, Post in에는 Channel을 선택합니다.<br> 
<img width="443" height="203" alt="image" src="https://github.com/user-attachments/assets/cb2db0c1-b8ec-4483-bb1b-ad11e050d616" />
<br> 
<img width="469" height="233" alt="image" src="https://github.com/user-attachments/assets/cdad9ffd-40c2-4a3e-ae3b-1dd5f780c2db" />
<br> <br> 
Post in이 채널로 선택이 되면, Team, Channel, Message 라는 새로운 입력 변수가 추가 됩니다. <br> 
팀과 채널은 팀즈 게시물을 업로드한 위치를 지정하는 변수이며, 메세지는 게시물의 본문입니다. <br> 

위와 마찬가지로 Team과 channel은 **사용자 지정값** 으로 변경하고,
Message는 AI로 **동적으로 채우기** 값을 그대로 유지합니다.

#### 중요

기본적을 Team과 Channel은 자동으로 나에게 할당된 팀과 채널이 조회가 되어야 하는게 정상이나,
아직 Preview 단계로 정상적으로 ID가 표시되지 않는 문제가 있습니다.
<img width="987" height="426" alt="image" src="https://github.com/user-attachments/assets/8c594558-feaa-47d5-9f21-3a5855daaac8" />

따라서 팀즈 채널 ID를 조회하기 위해 아래와 같이 확인해 보도록 합니다. <br>
먼저 팀즈를 접속합니다 [**팀즈 접속 링크**](https://teams.microsoft.com/v2/) <br> 
다음으로 게시글을 올릴 채널을 선택해 ... 을 클릭한 뒤 링크 복사를 선택 합니다.<br>
<img width="335" height="334" alt="image" src="https://github.com/user-attachments/assets/e4fb9e44-c9c0-4218-86f7-be8ef92d0c1e" />
<br> <br>

복사를 한 뒤, 메모장에 붙여넣으시면 아래와 같은 형식의 URL이 표시됩니다
```
https://teams.microsoft.com/l/channel/19%3Aafff7d3f3be242f38d6sasdada1f2aa%40thread.tacv2/20251022%20%EC%9B%8C%ED%81%AC%EC%83%B5?groupId=a5f8994e-c248-4e00-8993-a8f9e5bc2e8b&tenantId=7xxxxxx7-xxxx-xxxx-8d61-9xxxxxx4xx52
```
여기서 groupId=a5f8994e-c248-4e00-8993-a8f9e5bc2e8b (&전까지) 표시되는 값이 Team(GroupID) 이며, 
```
a5f8994e-c248-4e00-8993-a8f9e5bc2e8b
```
channel/ 뒤에 19% 로 시작하는 하여 .tacv2로 끝나는 값이 채널ID 입니다.
```
19%3Aafff7d3f3be242f38d6sasdada1f2aa%40thread.tacv2
```

이 값을 추출하여 팀과 채널값에 입력해 줍니다.
<img width="876" height="513" alt="image" src="https://github.com/user-attachments/assets/d9d503c6-d4d7-4073-ac96-d79b562ab38e" />
<br> <br> 

이후 저장을 하면 도구 설정이 완료 됩니다.

### 지침 추가

도구 추가가 완료되었으면, 다시 개요로 돌아가서  지침에 아래와 같이 게시물 생성 작업 플로우를 작성해 줍니다.
<br> 
<img width="1071" height="709" alt="image" src="https://github.com/user-attachments/assets/8912e14c-8630-49ad-93a4-252baa402c76" />
<br> <br> 

지침 내 1) 지원 능력 파트아래에 추가
```
### 1.7 팀즈 게시물 작성 (post message in teams)
 - 작성한 문서를 팀즈 게시물로 등록
 - Message는 HTML과 CSS 형식을 이용하여 작성

```
<br> 

지침 내 3) 예시 워크플로우(원문 시나리오 포함) 에 추가
```
사용자: "이 내용으로 게시물로 업데이트 해줘" 또는 "이 글을 팀즈 게시물로 등록해줘"
에이전트: "네 해당 내용을 팀즈 채널에 HTML과 CSS 스타일을 적용하여  생성 하겠습니다."
```
<br> 

지침 하단에 추가
```
## 9) 팀즈 게시물 등록  가이드
 - message: 팀즈 게시물 본문이며, HTML과 CSS 스타일 형식을 적용하여 디자인적 요소를 추가하여 본문을 작성
---
```
<br> 
<br> 

지침 편집을 마치고 저장을 한 후, 테스트를 하여 메일이 정상적으로 발송되는지 확인해 봅니다.
테스트 프롬프트
```
식기세척기 제품군들에 대해 뉴스레터를 만들어서 **[메일 주소]** 에게 메일로 보내줘
```

### 테스트 

아래 프롬프트를 이용하여 실제로 채널에 게시물이 등록되는지 테스트 해 봅니다
```
팀즈 채널에 안녕하세요 만나서 반갑습니다라고 게시해줘
```
<img width="1697" height="1270" alt="image" src="https://github.com/user-attachments/assets/d15802d6-1e09-4948-862a-3dbc7dff1ec8" />


----

축하드립니다!
도구 추가를 통해 에이전트에게 메일 발송, 팀즈 게시물 작성을 할 수 있도록 구성을 완료하였습니다.
마지막으로 에이전트를 게시해서 팀즈에서 테스트를 해 보도록 하겠습니다.




---

## Step 5: 게시 및 배포

<img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/5755a4eb-59a3-4d20-b638-c7d7ddf5d182" /><img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/54418a6f-82bd-491e-acf3-0a8696b38e18" /># 에이전트 게시 및 배포

앞서 1~4 단계를 완료하여 에이전트가 테스트 패널에서 정상 동작을 한다면,
이제 이 에이전트를 실제 배포하여 팀즈에서 이용할 수 있도록 해보겠습니다.


## 에이전트 게시
설정이 완료된 에이전트에 대해 우측 상단 [게시] 버튼을 선택하여 게시를 합니다.
<img width="854" height="391" alt="image" src="https://github.com/user-attachments/assets/1bdf16ac-b7ce-470d-b89f-c9c48f7fcf91" />
<img width="1065" height="549" alt="image" src="https://github.com/user-attachments/assets/fa5f499a-37cf-4f5e-a922-de21133dc27d" />


## 에이전트 채널 추가
게시가 완료되었으면, 이제 이 에이전트에게 프롬프트를 입력할 채널을 선택합니다.
우측 상단의 채널탭을 선택해 이동합니다.
<img width="570" height="464" alt="image" src="https://github.com/user-attachments/assets/06d0c73b-4c26-40fc-b6a3-03d638559a7d" />
<br> <br> 

Copilot studio에서는 팀즈, Microsoft 365 copilot 앱을 포함한 다양한 인터페이스에서 에이전트를 이용할 수 있도록 채널을 제공하고 있습니다. <br>
이번 실습은 팀즈, Copilot app에 에이전트를 배포하는것이 목적이기 때문에,** Microsoft 채널에 있는 Teams 및 Microsoft 365 Copilot** 을 선택합니다.<br>
<img width="566" height="286" alt="image" src="https://github.com/user-attachments/assets/6961a343-7896-4939-aae9-4633543bccc5" />


Teams 및 Microsoft 365 Copilot 을 선택하면, 우측 패널에 채널 추가 정보가 나옵니다. <br>
Microsoft 365 켜기가 체크 되어있는지 확인하고, **채널 추가**를 선택합니다. <br>
<img width="575" height="326" alt="image" src="https://github.com/user-attachments/assets/f4d2c2f9-5311-4d36-85d2-1f008592188f" />
<br> <br> 
추가가 완료되면 패널을 닫은 뒤, 다시 에이전트를 게시합니다.
<img width="1708" height="951" alt="image" src="https://github.com/user-attachments/assets/a16cff64-4d14-47a7-9525-a643c1c24842" />
<br> <br> 

## 채널 공유 정책 변경
채널 추가 및 게시가 완료되면 지금부터 이 에이전트는 Teams에서 이용할 수 있습니다. <br> 
다만, 기본설정은 제작자만 이용할 수 있기에, 설정을 통해 공유 옵션을 주도록 합니다. <br>
다시 ** Microsoft 채널에 있는 Teams 및 Microsoft 365 Copilot** 로 이동하여 **가용성 옵션**을 선택합니다.
<img width="860" height="533" alt="image" src="https://github.com/user-attachments/assets/70248bc8-7223-4798-a661-afd46f249372" />
<br> <br> 

다음으로 **공유 관리** 버튼을 클릭합니다.
<img width="860" height="533" alt="image" src="https://github.com/user-attachments/assets/bd51e0e4-b303-478e-bab3-12a58ef3cc35" />
<br> <br>
이후 내조직을 선택하여, **뷰어** 권한을 지정한 후, 업데이트를 클릭합니다.
<img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/cf22aef1-0b65-4a31-acb0-56d851cd656b" />
<br> <br> 
업데이트가 완료되면 다시 가용성 옵션으로 돌아가 **링크 복사**를 선택하여 해당 링크를 브라우저 또는 팀즈에 공유하게 되면 나를 포함한 조직원들이 에이전트를 이용할 수 있게 됩니다.
<img width="860" height="533" alt="image" src="https://github.com/user-attachments/assets/225c923d-d20b-4960-97a6-ff15808617b1" />
<br> <br> 

스토어에 표시 기능은, 팀즈,Copilot 앱 스토어에 구축한 에이전트가 표시되도록 하는 기능이며, <br> 
**내 팀원 및 공유 사용자에게 표시** 는 별도의 승인이 필요하지 않지만, <br> 
**내 조직의 모든 사람에게 표시**는 IT관리자의 승인 이후 배포가 됩니다. <br> 

실습을 위해 복사한 링크를 팀즈의 나와의 채팅을 통해 올려, 링크를 클릭합니다.
<img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/255cefe8-fac7-4519-ab15-37b8568bb72c" />
<br> <br>
해당 링크를 클릭하면 다음과 같이 표시되며, [추가] 버튼을 클릭합니다.
<img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/78592e35-93a7-43dd-af24-67a1f60304a8" />
<br> <br>
추가가 완료되었다면 Copilot 으로 열기를 눌러 Copilot 환경에서 Agent를 실행합니다.
<img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/b34d09ce-ec5c-47d9-b044-d145eeeb49db" />
<img width="1720" height="1065" alt="image" src="https://github.com/user-attachments/assets/d190c50c-5e38-41f1-a196-2c524936a527" />

<br> <br>
 
## 테스트
다음 몇가지 프롬프트를 이용해 실제 원하는 시나리오대로 동작하는지 테스트 해 봅니다.
```
Copilot studio에 대한 기초 소개를 주제로 블로그 초안을 작성하고 싶어
```
<br> 
<img width="1720" height="1392" alt="image" src="https://github.com/user-attachments/assets/4c63f83e-2372-423e-b046-b3f07f8c23e1" />
<br> 

```
이 내용을 chiwonchoi@microsoft.com 으로 메일 발송해줘
```
<img width="1720" height="1392" alt="image" src="https://github.com/user-attachments/assets/53e731e6-8935-495f-9738-91b35121f862" />
<br> <br> 
```
우리회사 냉장고 스펙시트를 리스트업 해줘
```
<img width="1720" height="1392" alt="image" src="https://github.com/user-attachments/assets/68c54b54-2567-4042-bbd5-d6afc7cb3967" />

<br> <br> 
```
SKSCW241RP 제품에 대한 소개 뉴스레터를 만들어서 팀즈에 게시해줘
```
<img width="1720" height="1392" alt="image" src="https://github.com/user-attachments/assets/85874535-3f6c-43c7-90a6-8b015bd461a1" />

<br> <br> 

----
축하합니다!
커스텀 엔진 에이전트를 이용하여 Microsoft 365의 다양한 도구와 지식을 활용하는 에이전트를 개발해 보았습니다.

