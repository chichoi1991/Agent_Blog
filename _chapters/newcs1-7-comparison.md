---
layout: "chapter"
title: "1부 · Claude Code 비교 & 참조"
short_title: "Claude Code 비교 & 참조"
description: "같은 하네스 철학, 다른 목적 — 그리고 클래식 대비 강화점·참조 자료."
order: 7
category: "newcs"
parent: "ncs1"
---

## 10. Claude Code vs Studio CLI 에이전트

<div class="info-box note" markdown="1">
**▶ 포인트** — 둘 다 같은 하네스 철학(1장)의 산물이다. 차이는 **목적**이다 — Claude Code는 *개발자 자율 실행*을, Studio CLI 에이전트는 *M365 데이터 연동 + 사람 개입 보장*을 극대화한 "Enterprise 하네스"다. 이 장은 (1) 둘의 공통 하네스, (2) 결정적 차이, (3) **클래식 Studio 대비 강화점**을 정리한다.
</div>

### 10.1 둘 다 하네스다 — 요소 대조

Claude Code가 제시한 하네스 5요소(Tool Loop·Sandbox·Persistence·Observation·Interruption)를 현재 CLI 에이전트에 대조하면:

| 하네스 요소 | Studio CLI 에이전트 | 근거 |
|---|---|---|
| **Tool Loop** | ✅ | `bash`·`grep`·`view`·`edit`·`python` 반복 호출 |
| **Sandbox 격리** | ✅ | Azure Linux 컨테이너 · `sandbox` 유저 · `/dracarys/` 차단 |
| **Persistence** | ✅ 부분 | `session-store.db`로 세션 내 유지, 세션 간은 M365 의존 |
| **Observation** | ✅ | 도구 결과가 컨텍스트로 피드백(preToolUse hook 포함) |
| **Human-in-the-loop** | ✅ 강함 | 매 응답마다 사용자 확인, 무단 자동 실행 없음 |
| **Skills/특화** | ✅ | `/app/skills/` — 특화 스킬 모듈 분리 |
| **Memory 계층** | ✅ | 단기(DB) + 장기(M365 클라우드) 분리 |

→ 결론: **"하네스 엔지니어링에 입각한 에이전트"가 맞다.**

### 10.2 결정적 차이 — 같은 철학, 다른 타겟·목적·거버넌스

> **짚고 가기:** Studio CLI 에이전트가 "사람이 매번 개입해야만 하는(HITL 전용)" 도구라는 건 오해다. **워크플로우(7장)와 연동하면 그대로 자율 자동화**가 된다. 따라서 둘의 차이는 *자동화가 되느냐*가 아니라 — **누가 쓰고(타겟) · 무엇을 위해(목적) · 어떤 통제 아래(거버넌스)** 쓰느냐다.

두 하네스는 **같은 철학**(격리 샌드박스 + 도구 루프 + 관찰·반복)을 공유합니다. 갈리는 지점은 세 축입니다.

| 비교 축 | Claude Code 하네스 | Studio CLI 에이전트 |
|---|---|---|
| **타겟 — 누가 쓰나** | 개발자 중심 | 일반 사용자·준개발자(현업) 중심 |
| **목적 — 무엇을 위해** | 로컬·프로젝트 단위 개발 자동화 극대화 | 조직 단위 배포 · 현장 업무 개선 |
| **거버넌스·통제** | 비교적 자유 — 로컬 중심 작업 가능, 통제는 기업이 별도로 강구해야 함 | 기업이 통제하는 인프라 안에서만 — 중앙에서 배포한 리소스(지식·데이터·도구)로 작업 |
| **자동화 방식** | 에이전트가 멀티스텝 자율 실행, 완료도 자체 판단 | 기본은 사람 개입(HITL), **워크플로우 연동 시 자율 실행**(7장) — 개입·자동화를 선택 |
| **에이전트 간 통신** | Multi-agent 오케스트레이션 | connected agents로 확장(5장) |
| **데이터·개발 연동** | Git 기반 작업 중심 | M365 생태계 중심 (+ 개발자에겐 Git CI/CD·VS Code Extension으로 지침·스킬 개발 지원) |

```
Claude Code 하네스   →  개발자 · 로컬에서 자유로운 자율 실행 (Agentic)
Studio CLI 에이전트  →  현업 · 기업 거버넌스 안의 데이터 연동 + 선택적 자동화 (Enterprise)
```

> **한 줄 정리:** 같은 하네스 철학을 **다른 타겟·목적·거버넌스**로 구현했다. Claude Code는 *개발자가 로컬에서 자유롭게 자율 실행*, Studio CLI는 *현업이 기업 통제 인프라 안에서 데이터를 연동하고, 필요하면 워크플로우로 자동화*한다. **HITL이냐 자동화냐의 우열이 아니라, 누가·무엇을·어떤 통제 아래 쓰느냐의 용도 차이**다.

### 10.3 기존(클래식) Studio 에이전트 대비 강화점

같은 "Copilot Studio" 이름이지만 **실행 모델 자체가 다릅니다.** 9장의 런타임 증거로 본 강화점:

| 영역 | 클래식 Studio | New Studio CLI 에이전트 | 강화 효과 |
|---|---|---|---|
| **실행 모델** | 토픽 트리(대화 흐름 설계) | 격리 컨테이너 + 에이전틱 루프 | 다단계·장기 작업, 분기 폭발 해소 |
| **참조자료 처리** | 검색 스니펫 기반 답변 | 실파일 다운로드 + Python 대용량 처리 | 대용량 파일 +8.3 · 코드 인터프리터 +41.8 (NDA) |
| **산출물** | 텍스트 응답 위주 | Word/PPT/Excel/PDF 등 리치 파일(`created/`) | 산출 형식 대폭 확장 |
| **도구 실행** | 사전 설계된 액션 호출 | `bash`·`python`·`grep` 실시간 도구 루프 | 적응·재시도·재귀 실행 |
| **코드 실행** | 없음/제한적 | 사전 설치 Python 런타임(격리) | 대용량 데이터 분석 |
| **메모리** | 변수·토픽 상태 | 단기 `session-store.db` + 장기 M365 | 컨텍스트 추적·체크포인트 |
| **보안 경계** | 플랫폼 거버넌스 | 세션별 격리 컨테이너 + sandbox 유저 + 엔진 차단 | 세션 격리·최소 권한 |

> **반론 대응(FAQ):** "이름만 같지 결국 옛날 봇 아니냐?" → **아니다.** 클래식이 *대화 흐름을 그리는* 도구였다면, New CLI 에이전트는 *세션마다 격리 컨테이너에서 실제 도구·코드·파일을 돌리는* 런타임이다. 0장에서 말한 "AI 코어 재건축"이 9장의 컨테이너로 실증된다.

---

---

## 참조 자료

### 업계(공개) — 1차 출처

- Anthropic Engineering, **Effective context engineering for AI agents** — attention budget·context rot·just-in-time·compaction·note-taking·sub-agents·tool design
- Anthropic Engineering, **Effective harnesses for long-running agents** — initializer+coding agent·feature list·증분 진행·clean state·브라우저 E2E 검증
- Anthropic Engineering, **Designing harnesses for long-running apps** — planner·generator·evaluator(GAN형)·"가장 단순한 해법에서 출발"
- Anthropic, **Building Effective Agents / Multi-agent research system / Writing tools for AI agents** — 보조
- Anthropic Learn (anthropic.com/learn) — 학습 코스
- 사례: Claude Code, GitHub Copilot CLI, OpenAI Codex CLI

---
