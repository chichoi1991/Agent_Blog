---
layout: "chapter"
date: 2026-06-15
title: "New Copilot Studio — 3부 에이전트 생성 (실습편)"
short_title: "3부 실습 — 세일즈 어시스턴트"
description: "통신사 세일즈 어시스턴트 따라 만들기 — 목표·시나리오·구성 안내."
order: 3
category: "newcs"
parent: "ncs3"
is_parent: true
image: "/assets/newcs/3-result-preview.png"
---

<div class="info-box note" markdown="1">
**▶ 3부 한 줄 요약** — 2부에서 익힌 6요소를 실제 클릭 순서로 조립해 "통신사 세일즈 어시스턴트"를 완성합니다. 순서는 지침 → 단일 스킬 → 스킬 패키지 → 도구 → 테스트 → 배포이며, 각 단계에 작성 팁과 프리뷰 함정을 붙였습니다.
</div>

> ⚠️ 이 문서의 기능·화면·일정은 모두 프리뷰 기준이며 변경될 수 있습니다(subject to change).

---

## 0. 목표 및 결과물

> **▶ 이 장에서 만들 것:** SharePoint에 올라온 **판매 엑셀을 분석**하고, **Word 안내 문서를 참조**해 답하며, 필요하면 **HTML 대시보드를 만들고 메일로 발송**하는 에이전트.

### 0.1 시나리오

> _(다이어그램은 이미지/ASCII로 대체 예정)_

> 한 흐름에 6요소가 모두 맞물립니다 — **참고자료**(엑셀) → **스킬+도구**(분석·디자인) → **확인 게이트**(지침) → **발송**(메일 도구). 각 단계는 2~8장에서 직접 만듭니다.

### 0.2 완성 에이전트의 6요소 구성

| 요소 | 이 실습에서의 구현 | 다루는 장 |
|---|---|---|
| **지침** | "정확히 계산 / 디자인은 스킬 / 보내기 전 확인" | 2장 |
| **참고자료** | SharePoint 판매 엑셀 + 안내 Word | 0·3장 |
| **단일 스킬** | 결과를 고정 형식으로 요약하는 브리핑 스킬 | 4장 |
| **스킬 패키지** | 분석 규칙 + 메일·보고서(디자인·템플릿 동봉) | 5장 |
| **도구** | Mail MCP · OneDrive MCP (+ 코드 인터프리터) | 6장 |
| **메모리** | 세션 내 대화 추적(코어 자동) | — |

### 0.3 결과물 미리보기

- **분석**: 여러 관점(구매 주기·이용 패턴·기기 상태 등)으로 본 **구매 의향 상위 고객** — 관점별 10명 + 인사이트
- **고객 선별**: 관점 교차로 추린 **최우선/우선 고객**(골프·저녁·사은품 대상)
- **주의사항**: 내부 정책 문서(Word) 기반 **접대·선물 가이드** 요약(출처 명시)
- **대시보드**: 관점별 현황·인사이트 + 우선·최우선 고객 + 이벤트 주의사항을 담은 단일 HTML(다운로드 가능)
- **메일**: 회사 디자인 본문 + 대시보드 링크 첨부, **나와 팀장님에게** 발송(발송 전 확인)

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3-result-preview.png' | relative_url }}" alt="완성된 대시보드 / 발송된 메일 스크린샷" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>완성된 대시보드 / 발송된 메일 스크린샷</figcaption>
</figure>

### 0.4 준비물

- New Copilot Studio 프리뷰 접근 권한
- SharePoint 사이트에 올린 **판매 엑셀**(예: 고객 1,000행 × 다수 열)과 **안내 Word**(선택)
- (선택) 미리 만든 스킬 패키지 ZIP — 5장에서 임포트

---

---

## 이 부에서 다루는 내용

| # | 주제 | 핵심 |
|---|---|---|
| 1 | [사전 준비 & 생성·지침]({{ '/chapters/newcs3-1-setup-agent/' | relative_url }}) | 프리뷰 진입 → 빈 에이전트 → 지침 작성 |
| 2 | [참조자료 추가]({{ '/chapters/newcs3-2-knowledge/' | relative_url }}) | SharePoint 폴더 연결 + 코드 처리 원리 |
| 3 | [단일 스킬 작성]({{ '/chapters/newcs3-3-single-skill/' | relative_url }}) | UI에 바로 붙여넣는 SKILL.md 한 장 |
| 4 | [스킬 패키지 임포트]({{ '/chapters/newcs3-4-skill-package/' | relative_url }}) | 디자인·템플릿을 묶은 ZIP 고성능 스킬 |
| 5 | [커넥터·MCP 추가]({{ '/chapters/newcs3-5-tools/' | relative_url }}) | Work IQ Mail·OneDrive MCP (최소 큐레이션) |
| 6 | [테스트]({{ '/chapters/newcs3-6-test/' | relative_url }}) | 프롬프트 #1~#5 실측 + 점검 |
| 7 | [배포 & 트러블슈팅]({{ '/chapters/newcs3-7-deploy/' | relative_url }}) | 게시·채널 제약·실채널 재반복 |

> 순서대로 읽으면 자연스럽게 이어집니다. 필요한 주제부터 펼쳐 보셔도 됩니다.
