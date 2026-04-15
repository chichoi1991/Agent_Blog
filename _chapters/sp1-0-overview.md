---
layout: chapter
title: "비즈니스 데이터 + Work IQ 조합 에이전트"
short_title: "특별 워크샵: 비즈니스 에이전트"
description: "내부 비즈니스 데이터와 외부 경제지표를 조합하여 CEO의 전략적 의사결정을 보조하는 에이전트 구축 실습"
order: 1
category: special
parent: "sp1"
is_parent: true
---

# 특별 워크샵: 비즈니스 데이터 + Work IQ 조합 에이전트 작성

## CEO를 위한 경영 의사결정 보조 에이전트

이번 특별 워크샵에서는 **내부 SharePoint 문서, Microsoft 365 커뮤니케이션 데이터, 미국 경제지표, IoT 가전 데이터**를 하나의 에이전트에서 통합하여 경영진의 의사결정을 보조하는 에이전트를 구축합니다.

기존 기초편 워크샵과 달리, **여러 데이터 소스를 조합한 복합 분석 시나리오**에 초점을 맞춥니다.

<br>

---

## 🎯 구현 목표

| 항목 | 내용 |
|------|------|
| **대상 사용자** | CEO / 경영진 |
| **핵심 기능** | 내부 문서 + 외부 경제지표 교차 분석, 메일 동향 정리, 경영 판단 메일 초안 작성, 가전 제어 |
| **아키텍처** | 지침(Instructions) + 도구(Tools) 기반 자율 오케스트레이션 (플로우·토픽 최소화) |
| **배포 채널** | Microsoft Teams |

<br>

---

## 🔧 사용 도구 구성

| 도구 유형 | 도구명 | 용도 |
|-----------|--------|------|
| **Pre-built (Work IQ)** | Work IQ Mail MCP | 메일 조회·초안 작성·발송 |
| **Pre-built (Work IQ)** | Work IQ Teams MCP | Teams 메시지·어댑티브 카드 알림 |
| **Pre-built (Work IQ)** | Work IQ Copilot MCP | M365 엔터프라이즈 검색 (Fallback) |
| **Custom MCP** | FRED Economic MCP | 미국 경제지표 조회 (5개 테마 + 검색) |
| **Custom MCP** | ThinQ MCP | LG IoT 가전 조회·제어·에너지 분석 |
| **지식 소스** | SharePoint | 내부 전략 문서·보고서·시장 조사 |

<br>

---

## 📋 실습 아젠다

| 파트 | 내용 | 소요 시간 |
|------|------|-----------|
| **Part 1** | [에이전트 생성 및 지침 작성]({{ '/chapters/sp1-1-instructions/' | relative_url }}) | 20분 |
| **Part 2** | [Pre-built 도구 추가 (Work IQ MCP)]({{ '/chapters/sp1-2-prebuilt-tools/' | relative_url }}) | 15분 |
| **Part 3** | [커스텀 도구 추가 (FRED MCP + ThinQ MCP)]({{ '/chapters/sp1-3-custom-tools/' | relative_url }}) | 25분 |
| **Part 4** | [메일 수신 트리거 추가]({{ '/chapters/sp1-4-trigger/' | relative_url }}) | 15분 |

<br>

---

## 🧠 완성 후 활용 시나리오

에이전트 구축이 완료되면 다음과 같은 복합 질의를 처리할 수 있습니다:

| 시나리오 | 사용자 질문 예시 | 조합되는 도구 |
|----------|-----------------|--------------|
| **시장 전략 검토** | "북미 시장 전략을 검토해줘" | SharePoint + FRED (GDP, 소비심리) |
| **원가 정책 수립** | "원자재 가격 변동에 따른 가격 정책을 재검토해줘" | SharePoint + FRED (환율, PPI) |
| **투자 의사결정** | "공장 증설 타이밍이 맞나?" | SharePoint + FRED (금리, 산업생산) |
| **메일 동향 검증** | "최근 보고 메일을 정리하고 시장 상황과 비교해줘" | Mail MCP + FRED |
| **경영 판단 메일** | "이 이슈에 대해 판단 의견 메일을 작성해줘" | FRED + SharePoint + Mail MCP + Teams |
| **메일 자동 처리 (트리거)** | 새 메일 수신 시 자동 분석 → 초안 작성 → Teams 알림 | 트리거 + FRED + SharePoint + Mail + Teams |

<br>

---

## ⚡ 사전 준비

| 항목 | 설명 |
|------|------|
| **Copilot Studio 접속** | [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com) |
| **Microsoft 365 계정** | Teams, Outlook, SharePoint 접근 가능한 조직 계정 |
| **FRED API Key** | `1fabe49779bd82ea8a3084354a89c038` (실습용 공유 키) |
| **ThinQ PAT** | `thinqpat_60c3ea2d060b6bfe8978cc946b12d52cb69adbdab51e788d53a3` (실습용 공유 키) |

> **참고:** 실습용 API 키는 워크샵 기간에만 유효합니다. 실제 운영 시에는 개별 키를 발급받아 사용하세요.

<br>

자, 이제 Part 1부터 시작하겠습니다! ➡️ [Part 1: 에이전트 생성 및 지침 작성]({{ '/chapters/sp1-1-instructions/' | relative_url }})
