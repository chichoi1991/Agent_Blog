---
layout: "chapter"
title: "Lab 1 · 보고서 자료 브리핑 에이전트 (w/ Workflow)"
short_title: "Lab 1 · 보고서 브리핑 (Workflow)"
description: "워크플로를 활용해 보고서 자료를 수집·요약하고 브리핑을 생성하는 New Copilot Studio 에이전트를 만듭니다."
order: 1
category: "newcslab"
parent: "ncslab1"
is_parent: true
---

<div class="info-box note" markdown="1">

**▶ 이 Lab 한 줄 요약** — **참고자료에 SharePoint 폴더를 연결**하고, **스킬(요약·키워드 추출·브리핑 디자인)**으로 보고자료를 정리한 뒤, **워크플로(폴더 감지 트리거)**로 새 문서가 올라오면 자동으로 요약해 **Teams 브리핑**을 보내는 New Copilot Studio(CLI Agent) 에이전트를 만듭니다.
</div>

> ⚠️ 이 문서의 기능·화면·일정은 모두 프리뷰 기준이며 변경될 수 있습니다(subject to change).

> 난이도 ★★★★☆

---

## 0. 목표 및 결과물

> **▶ 이 Lab에서 만들 것:** SharePoint 보고자료 폴더를 지켜보다가, **새 보고서(PDF·문서·Confluence 링크 등)가 올라오면 자동으로 요약**하고 **핵심 내용·리스크 키워드를 추출**해, **보기 좋게 디자인된 브리핑을 Teams로 발송**하는 에이전트.

### 0.1 시나리오

조직의 보고자료는 **OneDrive/SharePoint의 특정 폴더**에 모입니다. 담당자가 매번 열어 읽고 요약하는 대신, 에이전트가 다음을 대신합니다.

1. **참고자료(Knowledge)** — SharePoint 보고자료 폴더를 에이전트의 지식 소스로 연결합니다.
2. **스킬(Skills)** — ① 문서 **요약**, ② 핵심·**리스크 키워드 추출**, ③ 브리핑 **디자인**(서식·강조 규칙)을 패키지로 묶습니다.
3. **워크플로(Workflow)** — 폴더에 새 파일이 **업로드되면 감지(트리거)** → 요약·키워드 추출 → **Teams 브리핑 메시지** 전송.

<div class="info-box note" markdown="1">
**Classic과 무엇이 다른가** — Classic에서는 토픽·플로우 노드를 일일이 그렸지만, New(CLI Agent)에서는 **참고자료로 위치만 알려주고, "무엇을 할지"는 지침과 스킬로 기술**하면 에이전트가 스스로 단계를 조립합니다. 폴더 감지 같은 **자동 실행만 워크플로**가 담당합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/image/newcslab1/00-scenario-overview.png' | relative_url }}" alt="시나리오 다이어그램 — SharePoint 폴더 → 참고자료/스킬 → 워크플로 → Teams 브리핑" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>전체 흐름: SharePoint 보고자료 폴더 → 참고자료·스킬 → 워크플로 트리거 → Teams 브리핑</figcaption>
</figure>

### 0.2 사용하는 6요소 구성

| 요소 | 이 Lab에서의 역할 |
| --- | --- |
| 지침 (Instructions) | "보고자료가 올라오면 요약·키워드·리스크를 뽑아 브리핑한다"는 역할·규칙 정의 |
| 스킬 (Skills) | **요약 / 키워드·리스크 추출 / 브리핑 디자인** 3개 스킬 패키지 |
| 참고자료 (Knowledge) | **SharePoint 보고자료 폴더** 위치 연결 |
| 도구 (Tools) | Teams 메시지 발송(브리핑 전달) |
| 워크플로 (Workflow) | **폴더 새 파일 감지** 트리거 → 자동 실행 |
| 메모리 (Memory) | (선택) 이미 브리핑한 문서 기록 — 중복 브리핑 방지 |

---

## 1. 사전 준비

> **▶ 목표:** 실습 환경과 보고자료 폴더를 준비한다.

- New Copilot Studio(프리뷰) 접근 권한 — `copilotstudio.preview.microsoft.com` 또는 기존 홈화면서에 **Try now** 버튼을 클릭하여 New Copilot Studio UI로 전환합니다.
- **Sandbox 환경**에서 실습하세요(개인 개발환경에서는 CLI 에이전트 동작 이슈가 있습니다).
- 보고자료를 모을 **SharePoint(또는 OneDrive) 폴더** 1개 — 예: `Documents/보고자료`.
- 테스트용 샘플 보고서 1~2개(PDF/Word) 준비.

<figure class="screenshot">
  <img src="{{ '/assets/image/newcslab1/01-sharepoint-folder.png' | relative_url }}" alt="보고자료를 모을 SharePoint 폴더와 샘플 파일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>보고자료를 모을 SharePoint 폴더 (예: Documents/보고자료)</figcaption>
</figure>

---

## 2. 에이전트 생성 + 지침 작성

> **▶ 목표:** 빈 에이전트를 만들고, 역할·규칙을 지침으로 적는다.

1. **Create / New agent** 클릭 후 이름·설명 입력 (예: 이름 `보고자료 브리핑 에이전트`).
2. **Build** 화면에서 지침 칸에 아래 초안을 붙여넣습니다.

```
당신은 SharePoint 보고자료 폴더에 올라오는 문서를 정리해 팀에 브리핑하는 어시스턴트입니다.

## 무엇을 하는가
- 폴더에 새 보고서가 올라오면 내용을 요약합니다.
- 핵심 내용과 함께 "리스크/주의" 키워드를 따로 뽑습니다.
- 결과를 정해진 브리핑 형식(디자인 스킬)에 맞춰 정리해 Teams로 보냅니다.

## 요약·키워드 규칙
- 요약은 5줄 이내, 의사결정에 필요한 핵심만 담습니다.
- 키워드는 핵심 키워드와 리스크 키워드를 구분해 보여줍니다.
- 문서에 없는 내용은 추측하거나 지어내지 않습니다. 모르면 모른다고 합니다.

## 브리핑·발송 규칙
- 브리핑 서식은 디자인 스킬의 규칙을 그대로 따릅니다. (색·서식 임의 변경 금지)
- Teams로 보내기 전, 받는 채널/사람과 내용을 먼저 보여주고 확인을 받습니다. (자동 트리거 시에는 지정된 채널로 발송)
- 원문 문서 링크를 함께 첨부합니다.
```

<figure class="screenshot">
  <img src="{{ '/assets/image/newcslab1/02-create-agent-instructions.png' | relative_url }}" alt="에이전트 생성 다이얼로그와 지침 입력 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새 에이전트 생성 + 지침 입력</figcaption>
</figure>

---

## 3. 참고자료 연결 — SharePoint 폴더

> **▶ 목표:** 에이전트가 읽을 보고자료의 **위치**를 알려준다.

1. Build 화면에서 **참고자료(Knowledge) 추가** → **SharePoint/OneDrive** 선택.
2. 1장에서 준비한 **보고자료 폴더 URL**을 입력해 연결합니다.
3. 색인이 완료되면 에이전트가 해당 폴더의 문서를 검색·인용할 수 있습니다.

<div class="info-box tip" markdown="1">
**팁** — New(CLI Agent)에서는 폴더 **위치만** 참고자료로 주면 됩니다. "어떤 문서를 어떻게 읽을지"는 지침·스킬이 처리합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/image/newcslab1/03-knowledge-sharepoint.png' | relative_url }}" alt="참고자료로 SharePoint 폴더 URL을 연결하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>참고자료에 SharePoint 보고자료 폴더 연결</figcaption>
</figure>

---

## 4. 스킬 추가 — 요약 · 키워드 추출 · 디자인

> **▶ 목표:** 반복되는 처리 로직을 **스킬(SKILL.md)**로 패키징한다.

스킬은 [Anthropic의 Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) 형식을 따릅니다 — `SKILL.md` 한 장에 **YAML 머리말(`name`·`description`) + 본문(언제 쓰나·무엇을 하나·규칙·예시)**을 담고, 서식 템플릿처럼 부가 자료는 별도 파일로 분리해 **필요할 때만 읽도록(progressive disclosure)** 둡니다.

<div class="info-box tip" markdown="1">
**핵심 — `description`이 트리거다.** New(CLI Agent)는 매 대화에서 모든 스킬의 `name`·`description`만 먼저 봅니다. 그래서 `description`에 **"언제 쓰는지 + 트리거 표현"**을 명확히 적어야 에이전트가 알맞은 스킬을 골라 본문을 읽습니다.
</div>

세 가지 스킬을 추가합니다.

| 스킬 | `name` | 하는 일 |
| --- | --- | --- |
| **요약** | `report-summary` | 보고서 본문을 5줄 이내 핵심 요약으로 압축 |
| **키워드·리스크 추출** | `risk-keyword-extract` | 핵심 키워드 / 리스크·주의 키워드를 구분해 추출 |
| **브리핑 디자인** | `briefing-design` | 요약·키워드를 정해진 브리핑 카드 서식으로 정리. 색·타입·레이아웃은 `design.md` 토큰을 그대로 적용 (텍스트·Adaptive Card 템플릿 번들) |

> 완성된 스킬 원본은 **작성 허브 repo `blog-content` 의 `projects/newcs-labs/skills/`** 에 가이드와 함께 있습니다(각 폴더의 zip도 동봉 — `build-skill-zips.ps1` 로 재생성). 발행되면 zip은 블로그의 `assets/newcs/labs/newcslab1/skills/` 에서 다운로드할 수 있습니다. 업로드 시 그대로 쓰면 됩니다(디자인 스킬은 템플릿이 함께 들어가야 하므로 반드시 zip).

### 4.1 스킬 추가 방법
1. **스킬(Skills) 추가**에서 각 스킬을 만들고 `SKILL.md`(또는 zip)를 업로드합니다.
2. 디자인 스킬은 `design.md`·`briefing-card.md`가 함께 있어야 하므로 **폴더째 zip**으로 올립니다. (Adaptive Card JSON은 별도 `.json` 파일이 아니라 `briefing-card.md` 안 코드블록으로 둡니다 — 일부 임포터가 zip 안 `.json`을 매니페스트로 오인식해 에러를 내는 것을 피함.)
3. 단일 파일로 올리면 토큰·템플릿이 빠져 디자인이 깨집니다 → "리소스 없는 단일 파일" 경고 시 zip으로 재업로드.

<div class="info-box tip" markdown="1">
**디자인 스킬은 `design.md`로 분리한다 (Anthropic 방식).** Anthropic의 `canvas-design`은 **디자인 철학을 `.md`로 먼저** 만들고 다음 단계가 그걸 표현하게 하고, `frontend-design`은 **토큰 시스템(색 4~6개 named hex · 타입 역할 · 레이아웃 · 시그니처 요소)을 명시**하며 크림 배경·보라 그라데이션 같은 **"AI slop" 기본값을 피하라**고 합니다. 그대로 차용해 `briefing-design/design.md`에 **고정 색 토큰·타이포·레이아웃·채널 매핑(텍스트 HEX ↔ Adaptive Card 의미 색)**을 담았습니다. SKILL.md는 lean하게 두고 **색이 필요할 때만 `design.md`를 읽도록**(progressive disclosure) 했습니다.
</div>

### 4.2 각 스킬이 필요로 하는 도구
스킬 자체는 **지침(텍스트)**이라 도구 없이도 동작하지만, 입력을 받고 결과를 전달하려면 다음이 필요합니다.

| 스킬 | 필요한 도구 / 연동 | 비고 |
| --- | --- | --- |
| `report-summary` | **참고자료(Knowledge): SharePoint/OneDrive 폴더** | 문서 본문을 읽는 출처. 별도 외부 도구 불필요 |
| `risk-keyword-extract` | 위와 동일(문서 텍스트 입력) | 외부 도구 불필요 |
| `briefing-design` | 없음(본문만 생성) | 발송은 워크플로의 **Teams 발송 도구**가 담당 |
| (워크플로 전체) | **SharePoint/OneDrive 트리거**("파일이 만들어질 때") + **Microsoft Teams**("채널/채팅에 메시지 게시") | 5장에서 연결 |

<div class="info-box note" markdown="1">
**스킬 vs 도구 경계** — 요약·키워드·디자인은 **추론(생각)**이라 스킬로, "폴더 감지·Teams 발송"은 **외부 동작**이라 도구/워크플로로 나눕니다. 스킬은 "무엇을 어떻게 정리할지", 도구는 "어디서 읽고 어디로 보낼지"를 맡습니다.
</div>

1. **스킬(Skills) 추가**에서 각 스킬을 만들고, 이름·설명·지침(프롬프트)을 작성합니다.
2. 디자인 스킬에는 브리핑 카드의 **고정 서식**을 직접 적지 말고 `design.md`(색 토큰·타이포·레이아웃·시그니처)에 모아 두고, SKILL.md는 "design.md를 따른다"고만 가리킵니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/newcslab1/04-skills-summary-keyword-design.png' | relative_url }}" alt="요약·키워드 추출·디자인 스킬 3개를 추가한 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>요약 · 키워드/리스크 추출 · 브리핑 디자인 스킬 구성</figcaption>
</figure>

---

## 5. 워크플로 — 폴더 감지 트리거 → Teams 브리핑

> **▶ 목표:** 새 파일이 올라오면 **자동 실행**되도록 워크플로를 만든다.

1. **워크플로(Workflow) 추가** → 트리거를 **"SharePoint/OneDrive 폴더에 파일이 추가될 때"**로 설정.
2. 트리거 대상 폴더를 1장의 보고자료 폴더로 지정합니다.
3. 동작 흐름: **요약 스킬 → 키워드/리스크 추출 스킬 → 디자인 스킬 → Teams 메시지 발송**.
4. 발송 대상 **Teams 채널/대상**과 메시지 본문(브리핑 카드)을 구성합니다.

<div class="info-box note" markdown="1">
**자동 실행 vs 수동 호출** — 이 워크플로는 **문서 중심·자동 실행**입니다. 미팅 맥락 중심으로 사람이 직접 부르는 "Prep Meeting" 류와 달리, 트리거가 알아서 돕니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/image/newcslab1/05-workflow-trigger.png' | relative_url }}" alt="폴더 파일 추가 트리거와 요약→키워드→디자인→Teams 발송 흐름" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>폴더 감지 트리거 → 요약·키워드·디자인 → Teams 브리핑 발송</figcaption>
</figure>

---

## 6. 테스트 & 결과 확인

> **▶ 목표:** 실제 파일을 올려 자동 브리핑을 확인한다.

1. 보고자료 폴더에 **샘플 보고서**를 업로드합니다.
2. 워크플로가 트리거되어 요약·키워드를 추출하고 Teams로 브리핑이 도착하는지 확인합니다.
3. 요약 길이·키워드 구분·디자인 서식이 의도대로인지 점검하고, 어긋나면 지침/스킬을 다듬습니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/newcslab1/06-teams-briefing-result.png' | relative_url }}" alt="Teams에 도착한 브리핑 카드 결과 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Teams에 자동 도착한 브리핑 결과</figcaption>
</figure>

---

## 7. 마무리 & 다음 단계

- **참고자료(SharePoint 폴더) + 스킬(요약·키워드·디자인) + 워크플로(폴더 감지)** 조합으로, 보고자료가 올라오는 즉시 팀이 핵심을 받아보는 에이전트를 완성했습니다.
- **확장 아이디어**
  - 메모리로 **중복 브리핑 방지**(이미 처리한 문서 기록).
  - 리스크 키워드가 감지되면 **담당자 멘션/에스컬레이션** 추가.
  - 주간 단위 **요약 다이제스트** 워크플로 추가.
