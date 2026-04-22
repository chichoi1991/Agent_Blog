---
layout: chapter
title: "[리뉴얼] Copilot Studio 기본 기능 살펴보기"
short_title: "[리뉴얼] Copilot Studio 기본 기능"
description: "Copilot Studio에서 제공하는 기본 기능들을 처음부터 끝까지 한 번에 둘러보는 통합 핸즈온"
order: 5
icon: "🧭"
category: workshop
parent: "ws5"
is_parent: true
---

# [리뉴얼] Copilot Studio 기본 기능 살펴보기

## 🎯 워크샵 목표

Copilot Studio에서 제공하는 **기본 기능들을 이해하고 활용**해 봅니다.  
기존 기초편 #1·#2·#3 워크샵에서 핵심이 되는 내용을 하나의 흐름으로 재구성하여,  
**에이전트 생성 → 지침 → 참조자료 → MCP/커넥터 도구 → 플로우/트리거 → 프롬프트 도구 → Excel 데이터 활용 → 배포** 까지의 전체 라이프사이클을 한 번의 실습으로 경험합니다.

<br>

---

## 🧩 이 워크샵에서 다루는 주요 기능

| 카테고리 | 기능 |
|----------|------|
| **에이전트 기본** | 에이전트 생성, 환경/언어 설정, 기본 지침(Instructions) 작성 |
| **참조 자료(Knowledge)** | SharePoint 문서, 웹 검색 등 외부 지식 소스 연결 |
| **도구(Tools)** | 빌트인 MCP, 커넥터, 외부(사설) MCP 서버, 프롬프트 도구 |
| **자동화** | Power Automate 플로우, 트리거(이벤트 기반 자동 실행) |
| **데이터 활용** | Excel(SharePoint) 기반 시계열 데이터 필터링·분석 |
| **배포** | 게시(Publish), Microsoft Teams 채널 연결, 모니터링 |

<br>

---

## 📚 콘텐츠 순서

| 단계 | 주제 | 출처(원본) | 링크 |
|------|------|------------|------|
| **Step 1** | 에이전트 소개 | WS 1-0 | [바로가기]({{ '/chapters/ws5-1-agent-intro/' | relative_url }}) |
| **Step 2** | 기본 지침 설정 | WS 1-1 | [바로가기]({{ '/chapters/ws5-2-instructions/' | relative_url }}) |
| **Step 3** | 참조자료 추가 | WS 1-2 | [바로가기]({{ '/chapters/ws5-3-knowledge/' | relative_url }}) |
| **Step 4** | MCP 도구 추가 | WS 1-3 | [바로가기]({{ '/chapters/ws5-4-tool-mcp/' | relative_url }}) |
| **Step 5** | 커넥터(메일 발송) 추가 | WS 1-4 | [바로가기]({{ '/chapters/ws5-5-tool-connector/' | relative_url }}) |
| **Step 6** | 외부 MCP 도구 추가 | WS 3-4 | [바로가기]({{ '/chapters/ws5-6-external-mcp/' | relative_url }}) |
| **Step 7** | 커넥터 연결 중심 플로우 | WS 2-3 | [바로가기]({{ '/chapters/ws5-7-tool-flow/' | relative_url }}) |
| **Step 8** | 트리거 추가 | WS 2-4 | [바로가기]({{ '/chapters/ws5-8-trigger/' | relative_url }}) |
| **Step 9** | 프롬프트 도구 활용법 | WS 3-5 | [바로가기]({{ '/chapters/ws5-9-ai-prompt/' | relative_url }}) |
| **Step 10** | Excel 기반 데이터 활용법 | WS 3-6 | [바로가기]({{ '/chapters/ws5-10-excel-filter/' | relative_url }}) |
| **Step 11** | 배포 | WS 3-7 | [바로가기]({{ '/chapters/ws5-11-deploy/' | relative_url }}) |

<br>

---

## ✅ 사전 준비

- Copilot Studio 접근 권한 (실습용 환경 권장)
- Microsoft 365 계정 (SharePoint, Outlook, Teams 사용)
- 실습용 SharePoint 라이브러리 / Teams 팀·채널
- (Step 6) 외부 MCP 서버 URL 및 API Key (강사 안내 또는 직접 배포)
- (Step 10) SharePoint에 업로드된 Excel 파일(테이블화 완료)

<br>

> 💡 본 워크샵은 기존 **기초편 #1 / #2 / #3** 의 콘텐츠를 재구성한 통합 과정입니다.  
> 각 Step의 원본 워크샵 링크를 함께 표기해 두었으니, 더 깊은 내용이 필요할 때 원본 챕터를 참고하세요.
