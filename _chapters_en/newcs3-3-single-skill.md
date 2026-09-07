---
layout: "chapter"
lang: en
date: 2026-06-15
title: "Part 3 · Create a single skill"
short_title: "Create a single skill"
description: "Create a one-page SKILL.md skill that you can paste directly into the UI."
order: 3
category: "newcs"
parent: "ncs3"
---

## 4. Create a single skill

> **▶ Goal:** Create a **one-page SKILL.md** skill that can be pasted directly into the UI (Part 2, section 2.4). Experience skills in the simplest form and understand the workflow.

### 4.1 What is a single skill?

It is a skill made only of one `SKILL.md` file, with no resources. It can be **registered directly in the UI**, so feedback is fast. There is no ZIP or upload process.

> **Instructions vs. skills — when to use each:** Instructions (Chapter 2) are **always-on top-level rules** (the constitution), while skills are **reusable instructions pulled in only when needed**. Put the "method and format" for a specific task (for example, always summarizing results in the same format) in a skill instead of hard-coding it into Instructions. This keeps Instructions lightweight and makes reuse easier.

### 4.2 Build it — weekly sales briefing skill

The **actual single skill** used in this lab is the demo's one-page `weekly-sales-brief/SKILL.md`. It turns results calculated by `excel-analysis` into a **short "weekly briefing" in the same format every time**.

1. On the Build page, select **Skills → Add skill (single/inline)**.
2. Paste the `SKILL.md` content below exactly as-is.

````markdown
---
name: weekly-sales-brief
description: 판매 데이터 분석 결과를 매번 똑같은 짧은 형식의 "주간 브리핑"으로 정리할 때 사용. "주간 요약·브리핑·정리·한 장 요약" 요청 시.
---

# 주간 판매 브리핑

분석 결과를 **늘 같은 형식의 짧은 요약**으로 정리하는 스킬입니다.
(파일은 이 SKILL.md 한 장뿐입니다. 별도 자료·코드 필요 없음.)

## 언제 쓰나
"이번 주 요약", "브리핑으로 정리", "한 장으로 요약" 같은 요청.

## 무엇을 하나
분석 결과를 아래 **고정 형식**으로 정리합니다. 항상 이 순서·이 항목을 지킵니다.

```
📊 주간 판매 브리핑 — [기간]

한 줄 요약: [가장 중요한 결론 한 문장]

핵심 숫자
- 총매출: [값] (전주 대비 [+/-%])
- 1위 제조사: [이름] ([값])
- 베스트 모델: [이름] ([값])

눈에 띄는 점
- [관찰 1]
- [관찰 2]

다음 액션(제안)
- [할 일 1]
```

## 규칙
1. **숫자는 분석 결과만** 사용하고 지어내지 않습니다. 없으면 "데이터 없음"으로 둡니다.
2. 항목은 **5줄 안팎**으로 짧게. 길어지면 핵심만 남깁니다.
3. 증감은 **+/-**와 함께 표시합니다(예: +12%).
4. "다음 액션"은 데이터에서 자연스럽게 나오는 제안만 적습니다.
````

> **Checkpoint:** The key is only three things: **"when to use it (trigger) + what it does (fixed format) + rules."** With this one page and no resources or code, you have a single skill.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3-single-skill.png' | relative_url }}" alt="Add single skill screen" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Add single skill screen</figcaption>
</figure>

### 4.3 Skill-writing tips (summary of Part 2, Chapter 2)

- **Two YAML lines are required** — `name` (lowercase letters, numbers, and hyphens only) and `description`.
- **`description` = trigger** — clearly state "when to use it + keywords." The orchestrator uses this one line to decide whether to load (use) the skill.
- **Start simple** — if rules and format are enough, keep it as a single file. Add resources later if needed, as in Chapter 5.

> **Checkpoint:** `name` can contain only **lowercase letters, numbers, and hyphens (`-`)**. Underscores (`_`), uppercase letters, and spaces cause the upload to be rejected (covered again in the Chapter 5 pitfalls).

---
