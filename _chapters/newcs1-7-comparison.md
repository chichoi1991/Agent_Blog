---
layout: chapter
title: "1부 · Claude Code 비교 & 참조"
short_title: "Claude Code 비교 & 참조"
description: "같은 하네스 철학, 다른 목적 — 그리고 클래식 대비 강화점·참조 자료."
order: 7
category: newcs
parent: "ncs1"
---

<div class="info-box note" markdown="1">
**▶ 포인트** — 둘 다 같은 하네스 철학의 산물입니다. 차이는 **목적**입니다 — Claude Code는 *개발자 자율 실행*을, Studio CLI 에이전트는 *M365 데이터 연동 + 사람 개입 보장*을 극대화한 "Enterprise 하네스"입니다.
</div>

## 10.1 둘 다 하네스다 — 요소 대조

하네스 5요소(Tool Loop·Sandbox·Persistence·Observation·Interruption)를 Studio CLI 에이전트에 대조하면:

| 하네스 요소 | Studio CLI 에이전트 | 근거 |
|---|---|---|
| **Tool Loop** | ✅ | 셸·검색·파일·코드 도구 반복 호출 |
| **Sandbox 격리** | ✅ | 격리 컨테이너 · 최소 권한 사용자 · 엔진 보호 영역 차단 |
| **Persistence** | ✅ 부분 | 세션 메모리로 세션 내 유지, 세션 간은 M365 의존 |
| **Observation** | ✅ | 도구 결과가 컨텍스트로 피드백 |
| **Human-in-the-loop** | ✅ 강함 | 매 응답마다 사용자 확인, 무단 자동 실행 없음 |
| **Skills/특화** | ✅ | 특화 스킬 모듈 분리 |
| **Memory 계층** | ✅ | 단기(세션 메모리) + 장기(M365 클라우드) 분리 |

→ 결론: **"하네스 엔지니어링에 입각한 에이전트"가 맞습니다.**

## 10.2 결정적 차이 — 같은 철학, 다른 목적

| 항목 | Claude Code 하네스 | Studio CLI 에이전트 |
|---|---|---|
| **자율 실행** | 사람 승인 없이 멀티스텝 자동 실행 | 매 턴 사람이 트리거(HITL) |
| **에이전트 간 통신** | Multi-agent 오케스트레이션 | (현재) 단일 에이전트 중심 → connected agents로 확장 |
| **저장소 연동** | Git 기반 작업 중심 | Git 없음, **M365 생태계 중심** |
| **루프 종료 판단** | 에이전트가 완료 여부 자체 판단 | 사용자가 턴 종료 결정 |
| **최적화 목적** | 개발 자동화 극대화 | 기업 데이터 연동 + 사람 개입 보장 |

```
Claude Code 하네스   →  개발 자동화 극대화 (Agentic)
Studio CLI 에이전트  →  기업 데이터 연동 + 사람 개입 (Enterprise)
```

> **한 줄 정리:** 같은 하네스 철학을 **다른 목적**으로 구현했습니다. 우열이 아니라 **용도 차이**입니다.

## 10.3 기존(클래식) Studio 에이전트 대비 강화점

같은 "Copilot Studio" 이름이지만 **실행 모델 자체가 다릅니다.** 런타임 구조로 본 강화점:

| 영역 | 클래식 Studio | New Studio CLI 에이전트 | 강화 효과 |
|---|---|---|---|
| **실행 모델** | 토픽 트리(대화 흐름 설계) | 격리 컨테이너 + 에이전틱 루프 | 다단계·장기 작업, 분기 폭발 해소 |
| **참조자료 처리** | 검색 스니펫 기반 답변 | 실파일 다운로드 + Python 대용량 처리 | 대용량·정확 집계 |
| **산출물** | 텍스트 응답 위주 | Word/PPT/Excel/PDF 등 리치 파일 | 산출 형식 대폭 확장 |
| **도구 실행** | 사전 설계된 액션 호출 | 셸·코드·검색 실시간 도구 루프 | 적응·재시도·재귀 실행 |
| **코드 실행** | 없음/제한적 | 사전 설치 Python 런타임(격리) | 대용량 데이터 분석 |
| **메모리** | 변수·토픽 상태 | 단기 세션 메모리 + 장기 M365 | 컨텍스트 추적·체크포인트 |
| **보안 경계** | 플랫폼 거버넌스 | 세션별 격리 컨테이너 + 최소 권한 + 엔진 차단 | 세션 격리·최소 권한 |

> **반론 대응(FAQ):** "이름만 같지 결국 옛날 봇 아니냐?" → **아니다.** 클래식이 *대화 흐름을 그리는* 도구였다면, New CLI 에이전트는 *세션마다 격리 컨테이너에서 실제 도구·코드·파일을 돌리는* 런타임입니다.

---

## 참조 자료

### 업계(공개) — 1차 출처

- Anthropic Engineering, **Effective context engineering for AI agents** — attention budget·context rot·just-in-time·compaction·note-taking·sub-agents·tool design
- Anthropic Engineering, **Effective harnesses for long-running agents** — initializer+coding agent·feature list·증분 진행·clean state·브라우저 E2E 검증
- Anthropic Engineering, **Designing harnesses for long-running apps** — planner·generator·evaluator(GAN형)·"가장 단순한 해법에서 출발"
- Anthropic, **Building Effective Agents / Multi-agent research system / Writing tools for AI agents** — 보조
- 사례: Claude Code, GitHub Copilot CLI, OpenAI Codex CLI

### Microsoft — 제품 출처

- Copilot Studio Blog, **Meet the new Copilot Studio**
- [Copilot Studio 공식 문서](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/)

---

> 다음 → [2부 · 에이전트 생성 (빌드 개념편)]({{ '/chapters/newcs2-build/' | relative_url }})
