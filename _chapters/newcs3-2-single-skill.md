---
layout: chapter
title: "3부 · 단일 스킬 작성"
short_title: "단일 스킬 작성"
description: "UI에 바로 붙여넣는 SKILL.md 한 장짜리 스킬 만들기."
order: 2
category: newcs
parent: "ncs3"
---

<div class="info-box note" markdown="1">
**▶ 목표** — UI에 바로 붙여넣는 **SKILL.md 한 장짜리** 스킬을 만듭니다. 가장 쉬운 형태로 스킬을 체감합니다.
</div>

## 3.1 단일 스킬이란

리소스 없이 `SKILL.md` 한 장으로 끝나는 스킬입니다. **UI에서 바로 등록** 되어 피드백이 빠릅니다. ZIP·업로드 절차가 없습니다.

## 3.2 만들기 — 결과 브리핑 스킬

1. Build 화면에서 **Skills → Add skill (단일/인라인)** 선택.
2. 아래 내용을 붙여넣습니다.

```markdown
---
name: result-brief
description: 분석 결과를 매번 똑같은 짧은 형식으로 요약할 때.
  "요약·브리핑·정리" 요청 시.
---
# 결과 브리핑
## 무엇을 하나 — 항상 이 고정 형식으로 정리
  한 줄 요약 / 핵심 숫자 / 눈에 띄는 점 / 다음 액션
## 규칙
  숫자는 분석 결과만, 5줄 안팎으로 짧게, 증감은 +/-로
```

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3_5.png' | relative_url }}" alt="단일 스킬 추가 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>단일 스킬 추가 화면</figcaption>
</figure>

## 3.3 스킬 작성 팁

- **YAML 2줄 필수** — `name`(소문자·숫자·하이픈만)과 `description`.
- **`description`이 트리거다** — "언제 쓰는지 + 키워드"를 또렷이. 오케스트레이터가 이 한 줄로 로드 여부를 판단한다.
- **단순하게 시작** — 규칙·형식만으로 충분하면 단일 파일로 끝낸다. 필요해지면 다음 단계처럼 리소스를 더한다.

> **짚고 가기:** `name`은 **소문자·숫자·하이픈(`-`)** 만 됩니다. 언더스코어(`_`)·대문자·공백은 업로드가 거부됩니다(다음 단계 함정에서 다시).
