---
layout: chapter
title: "에이전트 소개"
short_title: "에이전트 소개"
description: "[리뉴얼] Copilot Studio 기본 기능 살펴보기 - 실습 시나리오와 완성된 에이전트 구조 소개"
order: 1
category: workshop
parent: "ws5"
---

## Step 1: 에이전트 소개

# Copilot Studio 커스텀 엔진 에이전트 — 블로그 포스팅 에이전트 확장

이번 통합 워크샵은 Copilot Studio lite에서 실습한 [**블로그 포스팅 에이전트**](https://github.com/chichoi1991/Copilot_Agent/tree/main/%EC%BD%94%ED%8C%8C%EC%9D%BC%EB%9F%BF%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20%EC%9B%8C%ED%81%AC%EC%83%B5/%EC%BD%94%ED%8C%8C%EC%9D%BC%EB%9F%BF%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20Lite) 를
**메일 발송, 팀즈 게시물, 외부 MCP 호출, 플로우/트리거, 프롬프트 도구, Excel 데이터 활용**까지 한 번에 다루는 **커스텀엔진 에이전트**로 확장하는 실습입니다.

<img width="1861" height="1392" alt="image" src="https://github.com/user-attachments/assets/dd2943fa-454d-4d49-ada3-f9df313cf34a" />

<br><br>

이 워크샵에서는 다음 작업들이 순차적으로 진행됩니다.

1. **에이전트 생성** 및 기본 지침 설정
2. **참조 자료(Knowledge)** 추가 — SharePoint, 웹
3. **도구(Tools)** 추가 — MCP 도구, 커넥터, 외부(사설) MCP
4. **자동화** — Power Automate 플로우 + 트리거 연결
5. **프롬프트 도구**로 일관된 HTML 응답 생성
6. **Excel 기반 데이터 필터링** + 분석 프롬프트 결합
7. **게시 및 Teams 채널 배포**

<br>

---

## ✅ 커스텀 엔진 에이전트(Custom Engine Agent)란?

| 항목 | 설명 |
|------|------|
| **정의** | Copilot Studio 안에서 LLM 오케스트레이션을 직접 사용하는 에이전트. **지침 + 도구 + 참조자료** 의 조합으로 동작 |
| **선언형과의 차이** | 선언형(Declarative)은 Microsoft 365 Copilot 위에서 동작하는 가벼운 형태. 커스텀 엔진은 **자체 모델/도구/플로우**까지 자유롭게 구성 |
| **장점** | MCP·커넥터·플로우·프롬프트·코드 인터프리터 등 풍부한 도구 사용. Teams/Web/Custom 채널 배포 가능 |
| **활용 예시** | 블로그/뉴스레터 작성, 사내 문서 검색, 가전·IoT 제어, 시계열 데이터 분석, 메일 자동 발송 등 |

<br>

> 커스텀 엔진 에이전트와 선언형 에이전트의 차이는 [워크샵 개요](https://github.com/chichoi1991/Copilot_Agent/blob/main/%EC%BD%94%ED%8C%8C%EC%9D%BC%EB%9F%BF%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20%EC%9B%8C%ED%81%AC%EC%83%B5/README.md) 에서 자세히 확인할 수 있습니다.

<br>

---

## 📋 다음 단계 미리보기

| | 단계 | 설명 |
|--|------|------|
| ⚙️ | [Step 2. 기본 지침 설정]({{ '/chapters/ws5-2-instructions/' | relative_url }}) | 에이전트 이름·설명·기본 지침 작성 |
| 📚 | [Step 3. 참조자료 추가]({{ '/chapters/ws5-3-knowledge/' | relative_url }}) | SharePoint·웹 검색 연결 |
| 🔗 | [Step 4. MCP 도구 추가]({{ '/chapters/ws5-4-tool-mcp/' | relative_url }}) | 빌트인 MCP(이메일 관리) |
| 🔌 | [Step 5. 커넥터(메일 발송)]({{ '/chapters/ws5-5-tool-connector/' | relative_url }}) | 일반 플러그인 커넥터 추가 |
| 🌐 | [Step 6. 외부 MCP 도구]({{ '/chapters/ws5-6-external-mcp/' | relative_url }}) | URL 기반 사설 MCP 서버 연결 |
| 🔁 | [Step 7. 플로우]({{ '/chapters/ws5-7-tool-flow/' | relative_url }}) | Power Automate 흐름 추가 |
| ⏰ | [Step 8. 트리거]({{ '/chapters/ws5-8-trigger/' | relative_url }}) | 이벤트 기반 자동 실행 |
| 🤖 | [Step 9. 프롬프트 도구]({{ '/chapters/ws5-9-ai-prompt/' | relative_url }}) | AI Prompt로 HTML 응답 표준화 |
| 📊 | [Step 10. Excel 데이터]({{ '/chapters/ws5-10-excel-filter/' | relative_url }}) | Excel 필터링 + 분석 프롬프트 결합 |
| 🚀 | [Step 11. 배포]({{ '/chapters/ws5-11-deploy/' | relative_url }}) | 게시 및 Teams 채널 연결 |

---

← [개요로 돌아가기]({{ '/chapters/ws5-0-overview/' | relative_url }}) | [다음: Step 2. 기본 지침 설정]({{ '/chapters/ws5-2-instructions/' | relative_url }}) →
