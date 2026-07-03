---
layout: "chapter"
date: 2026-06-15
title: "3부 · 스킬 패키지 임포트"
short_title: "스킬 패키지 임포트"
description: "GitHub의 2개 ZIP 고성능 스킬 + 프리뷰 함정."
order: 4
category: "newcs"
parent: "ncs3"
image: "/assets/newcs/3-skill-package.png"
---

## 5. 고급 스킬 — 스킬 패키지 임포트

> **▶ 목표:** `SKILL.md` + **리소스(디자인 지침·HTML 템플릿)**를 묶은 ZIP을 임포트해 **고성능 스킬**을 만든다(2부 2.5).

### 5.1 왜 패키지인가

UI 단일 스킬은 파일 하나만 됩니다. 하지만 메일·보고서처럼 **디자인·템플릿을 고정**하려면 리소스를 함께 묶어야 합니다. ZIP 패키지가 그 방법입니다.

**이 실습은 아래에서 바로 받을 수 있는 2개의 ZIP 파일을 업로드**합니다(직접 만들어도 됨). 각 패키지의 역할:

| 패키지(ZIP) | 구성 | 역할 |
|---|---|---|
| **분석 규칙 스킬** (`excel-analysis.zip`) | `SKILL.md` + `데이터-설명(선택).md` | 엑셀을 정확히 집계·표로 정리하는 규칙(다관점 구매의향 분석) |
| **메일·보고서 스킬** (`brand-comms.zip`) | `SKILL.md` + `design-set.md` + `email_template.html` + `report_template.html` | 회사 디자인(아이보리·마젠타)으로 메일·HTML 대시보드 생성 |

**📦 ZIP 바로 받기** — 압축을 풀지 말고 받은 파일 그대로 업로드하세요.

- [`excel-analysis.zip` 다운로드]({{ '/assets/newcs/skills/excel-analysis.zip' | relative_url }}) — 분석 규칙 스킬
- [`brand-comms.zip` 다운로드]({{ '/assets/newcs/skills/brand-comms.zip' | relative_url }}) — 메일·보고서 스킬

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3-skill-package.png' | relative_url }}" alt="패키지 폴더 구조 / 임포트 버튼 위치" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>패키지 폴더 구조 / 임포트 버튼 위치</figcaption>
</figure>

### 5.2 임포트 절차

1. Build 화면 **Skills → Import (ZIP)** 선택.
2. 위에서 받은 **`excel-analysis.zip`** · **`brand-comms.zip`**을 각각 업로드(스킬 2개).
3. 업로드 후 **Instructions 미리보기**에 SKILL.md 본문(예: 색상 HEX 표)이 보이는지 확인.

### 5.3 스킬 패키지 작성 팁 (2부 2.5·2.6)

- **ZIP 루트에 `SKILL.md`** — 폴더째 압축하면 `폴더명/SKILL.md`가 되어 *"Bundle is missing a root-level SKILL.md"*로 거부됩니다. **폴더 안 내용물**을 압축하세요.
  - PowerShell: `Compress-Archive -Path "스킬폴더\*" -DestinationPath out.zip`
- **이름 규칙** — `name`은 소문자·숫자·하이픈만. 버전은 `-v2`처럼 **하이픈**으로.
- **핵심 규칙은 SKILL.md 본문에** — `design-set.md` 같은 리소스는 **자동 주입되지 않습니다.** 팔레트 HEX·"새로 디자인 말고 템플릿을 써라" 같은 필수 규칙은 SKILL.md 본문에 직접 적고, 상세만 리소스로 분리하세요(2부 2.5).
- **AI 도구로 정교하게** — "이 작업을 스킬로 만들어 줘 / 이 HTML을 템플릿으로 분리해 줘"처럼 Copilot에 맡기면 구조·트리거를 함께 정리해 줍니다.

### 5.4 ⚠️ 프리뷰 이슈 — 개인 개발환경에서는 스킬 패키지가 제대로 안 올라감 (2026-06-14 기준)

> 현재 프리뷰에서는 **개인 개발환경에서 New(CLI) 에이전트가 정상 작동하지 않습니다.** 그 증상 중 하나로, ZIP이 **UI에는 정상으로 보이지만 실제로는 SKILL.md의 YAML(이름·설명)만 올라가고 본문·리소스가 누락**됩니다.

- **증상:** 에이전트가 스킬을 선택은 하는데 디자인·절차를 안 따름("상세 가이드가 없다"며 마음대로 디자인).
- **원인:** 개인 개발환경 자체의 프리뷰 제약. 게시 여부·스킬 언어와 무관하며, **같은 ZIP도 Sandbox 환경에선 정상 동작**합니다(스킬·설계 문제 아님).
- **확인법 (UI를 믿지 말 것):** 테스트 창에 다음을 입력합니다.
  ```
  네가 가진 app/skills 의 하위 폴더까지 모두 보여줘
  ```
  - ✅ 정상: 스킬 폴더 아래 `SKILL.md` + 리소스가 모두 보임.
  - ❌ 문제: `SKILL.md`만, 그나마 본문이 비고 내부 번들 포인터만 보임.
- **해결:** **Sandbox 환경에서 에이전트를 만드세요.** 개인 개발환경에서는 재업로드·이름 변경으로도 잘 안 풀립니다. Sandbox에서 임포트 후 위 프롬프트로 검증하고 시작하세요.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3-skills-verify.png' | relative_url }}" alt="app/skills 확인 프롬프트 결과 — 정상 vs 문제" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>app/skills 확인 프롬프트 결과 — 정상 vs 문제</figcaption>
</figure>

---
