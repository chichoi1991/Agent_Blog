---
layout: "chapter"
date: 2026-06-13
title: "Lab 2 · Daily Brief 뉴스 브리핑 워크플로"
short_title: "Lab 2 · Daily Brief (Workflow)"
description: "Researcher 노드와 멀티 에이전트 파이프라인(Prep·Critic·Analyst·Composer)으로 매일 특정 회사 뉴스를 자동 수집·검증·분석해 SharePoint 저장 + 메일 발송까지 자동화하는 New Copilot Studio 워크플로입니다."
order: 2
category: "newcslab"
parent: "ncslab2"
is_parent: true
tags: ["New Copilot Studio", "New Work Flow"]
source_url: "https://baby-crows.github.io/Copilot-Studio-Handson-Blog/labs/daily-brief-kr/"
source_author: "이영서 (Youngseo Lee)"
source_blog: "Copilot Studio Hands-on"
source_published: "2026-06-13"
canonical_url: "https://baby-crows.github.io/Copilot-Studio-Handson-Blog/labs/daily-brief-kr/"
---

<div class="info-box note" markdown="1">
**원문 안내 · 출처** — 이 랩은 **이영서(Youngseo Lee)** 님의 [Copilot Studio Hands-on](https://baby-crows.github.io/Copilot-Studio-Handson-Blog/) 블로그에 게시된 [Daily Brief Workflow (한국어)](https://baby-crows.github.io/Copilot-Studio-Handson-Blog/labs/daily-brief-kr/)를 소개하는 큐레이션 페이지입니다. 전체 단계·프롬프트·JSON 스키마 등 **상세 실습 내용은 원문**을 따라 주세요. 모든 저작권은 원저자에게 있습니다.

- 원문(한국어): <https://baby-crows.github.io/Copilot-Studio-Handson-Blog/labs/daily-brief-kr/>
- 원본 저장소: <https://github.com/baby-crows/Copilot-Studio-Hands-on>
</div>

> ⚠️ 이 실습은 Copilot Studio의 프리뷰 기능(Workflow · Custom Structured Output · Researcher 노드)을 사용합니다. 화면·동작·일정은 변경될 수 있습니다(subject to change).

> 난이도 ★★★☆☆ · 소요 30분 · Level 300

---

## 0. 이 Lab이 흥미로운 이유

Copilot Studio의 **신규 Workflow** 기능으로, 매일(또는 수동 트리거 시) 특정 회사에 대한 뉴스를 **자동 수집 → 검증 → 분석 → 브리핑 생성 → SharePoint 저장 → 메일 발송**까지 한 번에 처리하는 파이프라인을 만듭니다. 세 가지 신규 요소를 실제로 조합해 보는 좋은 예제입니다.

- **Researcher 노드(M365 Copilot)** — 실제 웹에서 최신 뉴스를 심층 조사(deep research)
- **멀티 에이전트 파이프라인** — 역할이 나뉜 여러 Agent 노드가 순차 협업
- **Structured Output(JSON Schema)** — 각 단계 출력을 정해진 스키마로 고정해 다음 단계가 안정적으로 소비

---

## 1. 아키텍처 — 8개 노드 파이프라인

```
[Trigger: Manual — researchTopic(회사명) 입력]
        ↓
[Prep — M365 Copilot]        오늘 주목할 2~3개 각도(angle)·키워드 추출 (가벼움, 5~10초)
        ↓
[Researcher — M365 Copilot]  각도별 실제 뉴스 6~8건 웹 조사 (deep search, 1~6분 · Prefer async ON)
        ↓
[Critic — Agent]             URL/게시일 검증으로 신뢰 기사만 필터링 · Structured Output(JSON)
        ↓
[Analyst — Agent]            테마/KPI/인사이트로 분석 · Structured Output(JSON)
        ↓
[Composer — Agent]           컨설팅 리포트 스타일 HTML 메일 본문 생성
        ↓
[SharePoint — Create item]   BriefArchive 리스트에 원본·결과 저장
        ↓
[Send email V2]              HTML 브리핑 메일 발송
```

각 노드의 **역할**과 **왜 나누는지**가 이 랩의 핵심입니다. 가벼운 발상(Prep)과 무거운 웹 조사(Researcher)를 분리하고, 검증(Critic)·분석(Analyst)·표현(Composer)을 각각 독립 Agent로 두어 **출력 스키마를 고정**하는 설계입니다.

---

## 2. 사전 준비

| 항목 | 내용 |
| --- | --- |
| 라이선스 | Microsoft 365 Copilot(Researcher 노드), Copilot Studio 액세스 |
| 권한 | SharePoint 사이트(List 생성), Outlook 메일 발송 |
| 미리 정할 값 | 대상 회사명(예: `Microsoft`), SharePoint 사이트 URL, 메일 수신자 |

**SharePoint 리스트(`BriefArchive`)** 를 먼저 만들고 컬럼(Title·RunDate·Topic·PrepRawText·ResearcherRawText·ValidatedJson·AnalystJson·FinalHtml·Status)을 정의합니다. 원문에서는 준비된 CSV를 가져오기(import)해 리스트를 빠르게 생성하는 팁을 제공합니다.

---

## 3. 핵심 포인트 (원문에서 꼭 확인할 것)

<div class="info-box tip" markdown="1">
**Prefer async는 Researcher에서 필수** — deep search는 30초~6분까지 걸립니다. `Prefer Async`가 OFF면 약 120초에서 timeout, ON이면 백그라운드 polling으로 끝까지 대기합니다. Researcher·Analyst 노드는 ON을 권장합니다.
</div>

<div class="info-box note" markdown="1">
**노드 이름은 한 단어 영문으로** — `Prep`, `Researcher`, `Critic`, `Analyst`, `Composer`. 이후 SharePoint 매핑에서 `outputs('Prep')`처럼 이름으로 참조하기 때문입니다. 공백·콜론이 들어가면 `outputs('m365Copilot-xxxx')` 같은 내부 ID로 바뀌어 식이 지저분해집니다.
</div>

- **Critic**은 "관대하게, 기본은 통과" 규칙으로 URL 존재·게시일 범위만 검증하고, 나머지 품질 판단은 하지 않습니다(과잉 필터 방지).
- **Analyst/Composer**의 강한 규칙: 입력에 없는 사실은 만들지 말 것(날조 금지), KPI는 출처 URL 인용, Composer는 입력 텍스트를 **의역·축약 없이** 그대로 렌더링.
- **Composer**는 McKinsey/BCG 스타일의 인라인 CSS HTML만 출력(스크립트·외부 리소스 금지)해 메일 본문에 바로 삽입 가능하게 합니다.

---

## 4. 전체 단계 따라 하기 (원문)

프롬프트 전문, Critic/Analyst의 **JSON Schema**, SharePoint 컬럼 매핑 식, Send email 설정, 결과 스크린샷 등 **모든 상세 단계는 원문**에 있습니다.

<div class="info-box tip" markdown="1">
**▶ 원문에서 전체 실습 진행하기** — [Daily Brief Workflow (한국어) · Copilot Studio Hands-on ↗](https://baby-crows.github.io/Copilot-Studio-Handson-Blog/labs/daily-brief-kr/)
</div>

---

## 5. 마무리 & 연계

- 이 랩은 **Lab 1(보고서 브리핑 에이전트)** 과 짝을 이룹니다. Lab 1이 "폴더 감지 트리거 → 에이전트 브리핑"이라면, 이 랩은 "수동/일정 트리거 → 멀티 에이전트 리서치 파이프라인 → 메일 발송"으로, **Workflow와 Structured Output의 조합**을 더 깊이 다룹니다.
- 확장: 트리거를 일정(Recurrence)으로 바꿔 매일 자동 발송, 대상 회사 리스트를 순회, 결과를 Teams 채널로도 발송.

*원저자: 이영서(Youngseo Lee) · Copilot Studio Hands-on. 원문 표현이 우선합니다.*
