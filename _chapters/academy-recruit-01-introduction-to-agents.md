---
layout: "chapter"
date: 2026-08-06
title: "미션 01: 에이전트 소개"
short_title: "에이전트 소개"
description: "대화형 AI, LLM, RAG, 대화형·자율형 에이전트의 핵심 차이를 이해합니다."
order: 1
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/01-introduction-to-agents/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/01-introduction-to-agents/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 01: Introduction to Agents](https://microsoft.github.io/agent-academy/recruit/01-introduction-to-agents/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

## 영상으로 보기

- YouTube walkthrough: https://www.youtube.com/watch?v=BhPz_zicUnM

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-01-introduction-to-agents/video-thumbnail.jpg' | relative_url }}" alt="Introduction to Agents 동영상 썸네일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Introduction to Agents 동영상 썸네일</figcaption>
</figure>

## 미션 브리핑

환영합니다, Recruit. 에이전트를 직접 만들기 전에 먼저 그 기반이 되는 AI 개념을 확실히 이해해야 합니다. 이 미션에서는 대화형 AI, 대규모 언어 모델(LLM), 검색 증강 생성(RAG), 그리고 Copilot Studio에서 만들 수 있는 에이전트 유형의 기초를 익힙니다.

## 목표

이 미션에서 배우는 내용은 다음과 같습니다.

1. 대화형 AI란 무엇인가  
2. LLM이 채팅 경험을 어떻게 구동하는가  
3. RAG가 어떤 가치를 더하는가  
4. 대화형 에이전트와 자율형 에이전트의 차이  
5. Copilot Studio의 에이전트가 위 개념을 어떻게 활용하는가

이제 시작해 봅시다.

## 대화형 AI란 무엇인가?

대화형 AI는 사람의 언어(텍스트 또는 음성)를 이해하고 처리해, 자연스럽게 느껴지는 방식으로 응답할 수 있는 시스템을 말합니다. 예를 들어 주문 상태를 알려 주는 웹사이트 챗봇이나 즐겨 쓰는 앱의 가상 비서가 여기에 해당합니다. 오늘날 대부분의 현대적인 대화형 AI는 내부적으로 대규모 언어 모델(LLM)에 의존합니다.

## LLM 기초

대부분의 대화형 AI 시스템 중심에는 **대규모 언어 모델(Large Language Models)** 이 있습니다. 이는 방대한 양의 텍스트로 학습된 신경망으로, 언어의 통계적 패턴을 학습해 자연스러운 문장을 만들고, 질문에 답하고, 아이디어를 브레인스토밍하거나 콘텐츠를 생성할 수 있습니다. 핵심 포인트는 다음과 같습니다.

1. **학습 데이터**: LLM은 웹 페이지, 책, 시, 기사 등 수 TB 규모의 텍스트를 학습합니다. 이런 “세상 지식” 덕분에 다양한 주제에 반응할 수 있습니다.  
2. **토큰화(Tokenization)**: 텍스트는 토큰이라는 더 작은 단위(단어, 서브워드, 문자)로 나뉘며, 모델은 한 번에 하나의 토큰을 예측합니다.  
3. **컨텍스트 윈도우(Context Window)**: 각 LLM은 한 번에 “볼 수 있는” 토큰 수에 한계가 있습니다. 이 한계를 넘어서면 앞선 토큰 정보는 줄어들거나 잘립니다.  
4. **프롬프팅(Prompting)**: 사용자는 프롬프트(질문이나 요청이 담긴 텍스트 블록)를 보내 LLM과 상호작용합니다. 프롬프트가 좋을수록 응답도 더 초점이 맞고 관련성이 높아집니다.

<div class="info-box note" markdown="1">
**프로 팁**  
LLM을 흔히 “매우 똑똑한 자동완성”에 비유합니다. 인간의 뇌처럼 의미를 진짜로 이해하는 것은 아니지만, 주어진 순서에서 다음에 올 가장 적절한 단어(또는 구문)를 예측하는 데 매우 뛰어납니다.
</div>

## 검색 증강 생성(RAG)

LLM이 정적인 학습 데이터에만 의존하면 환각(hallucination)을 일으키거나 최신성이 떨어질 수 있습니다. RAG는 답변을 만들기 전에 최신 정보를 “찾아보게” 함으로써 이 문제를 보완합니다. 높은 수준에서 보면 RAG는 다음과 같이 동작합니다.

1. **사용자 질의(User Query)**: 사용자가 질문합니다(예: “Contoso의 최신 분기 실적은 어때?”).  
2. **검색 단계(Retriever Step)**: 시스템이 문서, 공개 웹사이트, 내부 데이터베이스, SharePoint 라이브러리 등 지식 원본을 조회해 관련 정보를 찾습니다.  
3. **증강(Augmentation)**: 검색된 데이터를 LLM에 보내기 전 프롬프트 앞이나 뒤에 덧붙입니다.  
4. **생성(Generation)**: LLM이 사용자 질문과 검색된 컨텍스트를 함께 읽고, 최신 데이터에 근거한 답변을 생성합니다.

RAG를 사용하면 에이전트가 사내 위키, API, FAQ 지식 베이스 같은 곳을 조회해, 모델이 학습한 정적 데이터에만 갇히지 않는 답변을 제공할 수 있습니다.

## 대화형 에이전트 vs. 자율형 에이전트

Copilot Studio 맥락에서 **에이전트(agent)** 는 여러 형태의 AI 도우미를 의미할 수 있습니다. 특히 다음 둘을 구분해 두면 좋습니다.

**대화형 에이전트(Conversational Agents)**

- 동작하려면 사람과의 양방향 대화(텍스트 또는 음성)가 필요합니다.
- 여러 차례의 대화 턴에 걸쳐 컨텍스트를 유지합니다.
- 외부 도구나 API에 연결할 수 있습니다(예: Power Automate 흐름 호출, 일정 초대 전송, Dataverse 데이터 조작).
- 고객 지원, FAQ, 가이드형 상호작용, 단순 Q&A에 적합합니다.
- 예시:
  - Microsoft Teams 안에서 HR 정책 질문에 답하는 에이전트  
  - 제품 관련 질문에 답하는 공개 웹사이트용 에이전트

**자율형 에이전트(Autonomous Agents)**

- 단순한 질답을 넘어, 사용자를 대신해 작업을 시작하고 **행동을 수행**할 수 있습니다.
- LLM 추론 루프(예: “계획 → 실행 → 관찰 → 재계획”)를 사용해 작업을 완수합니다.
- 외부 도구나 API에 연결할 수 있습니다(예: Power Automate 흐름 호출, 일정 초대 전송, Dataverse 데이터 조작).
- 지속적인 사람 프롬프트 없이 동작합니다. 한 번 트리거되면 여러 단계의 프로세스를 스스로 처리할 수 있습니다.
- 예시:
  - 백엔드 시스템에 출장 요청이 들어오면 일정표를 만들고 항공편을 예약한 뒤 확인 메일까지 보내는 에이전트  
  - Teams 통화에 참여해 실시간으로 받아쓰기를 하고 OneNote에 임원용 요약을 작성하는 “Meeting Summarizer” 에이전트

<div class="info-box note" markdown="1">
**핵심 차이**  
대화형 에이전트는 사용자 입력을 기다리며, 주고받는 대화가 있어야 동작합니다. 자율형 에이전트는 외부 트리거를 바탕으로 사람 개입 없이도 작업을 실행할 수 있습니다.
</div>

## Copilot Studio의 에이전트

**Copilot Studio**는 대화형 시나리오와 자율형 시나리오를 하나의 프레임워크로 묶어 제공합니다. Copilot Studio가 에이전트 빌드를 돕는 방식은 다음과 같습니다.

1. **Visual Agent Designer**: 에이전트를 빌드, 테스트, 배포할 수 있는 드래그 앤 드롭 캔버스
2. **모델(LLM) 선택**: OpenAI, Anthropic, Custom Models 등 여러 AI 모델 중 시나리오에 맞는 LLM을 선택
3. **Knowledge**: SharePoint, OneDrive, Dataverse 등 기본 통합을 제공해 RAG를 바로 활용
4. **Tools**: 외부 도구나 API를 연결해 Power Automate 흐름 호출, 일정 초대 전송, Dataverse 데이터 조작 같은 작업 수행
5. **멀티모달 지원**: Copilot Studio 에이전트는 파일 업로드와 음성 대화를 지원
6. **게시 및 배포**: 완성된 에이전트를 Microsoft 365 Copilot에 게시하거나 웹사이트에 임베드하는 등 다양한 채널로 배포 가능

## 미션 완료

성공적으로 다음을 완료했습니다.

- **대규모 언어 모델**: LLM이 언어를 이해하고 생성하는 방식을 설명했습니다.
- **검색 증강 생성**: RAG가 최신 정보에 근거한 응답을 제공하는 방식을 설명했습니다.
- **에이전트 동작 방식**: 대화형 에이전트와 자율형 에이전트를 구분했습니다.
- **Copilot Studio**: Copilot Studio가 AI, 지식, 도구, 게시 채널을 결합하는 방식을 확인했습니다.

다음 단계에서는 [Copilot Studio 기초]({{ '/chapters/academy-recruit-02-copilot-studio-fundamentals/' | relative_url }})를 살펴봅니다.

## 참고 자료

- [Copilot Studio 설명서](https://learn.microsoft.com/microsoft-copilot-studio/)
