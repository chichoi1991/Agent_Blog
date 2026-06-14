---
layout: chapter
title: "3부 · 배포 & 트러블슈팅"
short_title: "배포 & 트러블슈팅"
description: "게시·채널 제약·게시 후 주의 + 실습 체크리스트·트러블슈팅."
order: 6
category: newcs
parent: "ncs3"
---

## 7. 배포 및 실제 테스트

<div class="info-box note" markdown="1">
**▶ 목표** — 에이전트를 게시(배포)하고 실제 채널에서 확인합니다.
</div>

### 7.1 게시(Publish)

1. 상단 **Publish** 클릭 → 게시 완료까지 대기.
2. 게시 후 채널 설정에서 사용할 채널을 켭니다.

<figure class="screenshot">
  <img src="{{ '/assets/newcs/3_10.png' | relative_url }}" alt="Publish 버튼 / 채널 설정 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Publish 버튼 / 채널 설정 화면</figcaption>
</figure>

### 7.2 ⚠️ 현재 채널 제약 (프리뷰)

> 개인 개발환경에서 만든 에이전트는 게시 후에도 **제대로 동작하지 않습니다** — **M365 Copilot 앱에서 오류**, **Teams 챗봇에서 랜덤 비정상 동작**이 관찰됩니다(스킬 패키지 단계 4.4와 같은 개인 개발환경 제약).

- 해결: 에이전트를 **Sandbox 환경에서 개발·게시** 하면 각 채널이 정상 동작합니다.
- 참고: M365 Copilot 앱 정식 연동 범위는 프리뷰라 계속 변할 수 있습니다("subject to change").

### 7.3 게시 후 주의 — 스킬 변경 시

- 게시 이후 스킬을 수정하면 변경이 바로 반영되지 않을 수 있습니다. **수정 후 재게시** 하고, "스킬 폴더 보여줘" 프롬프트로 반영을 검증하세요.
- 스킬 버전을 올릴 땐 같은 이름 대신 **새 이름(`-v2`)**으로 올리는 게 안전합니다.

---

## 부록. 실습 체크리스트 & 트러블슈팅

### 실습 체크리스트

- [ ] New 환경(프리뷰 URL 또는 Try now)에 진입했는가
- [ ] 지침이 "무엇을"에 집중하고, 디자인은 스킬을 가리키는가
- [ ] 단일 스킬(`result-brief`)이 UI에 등록됐는가
- [ ] 스킬 패키지 ZIP **루트에 SKILL.md**가 있는가
- [ ] 스킬 `name`이 소문자·숫자·하이픈만 쓰는가
- [ ] **스킬 폴더 확인 프롬프트로 리소스까지 주입됐는지 검증** 했는가
- [ ] Mail·OneDrive MCP가 연결됐는가 (겹치는 도구 없음)
- [ ] 메일이 OneDrive 링크로 첨부되고, 발송 전 확인을 거치는가
- [ ] 게시 후 채널 이슈(개인 개발환경 제약)를 인지했는가

### 트러블슈팅

| 증상 | 원인 | 해결 |
|---|---|---|
| ZIP 업로드 거부 | 폴더째 압축 | 폴더 **내용물**을 압축(루트 SKILL.md) |
| "Name must use only lowercase..." | 이름에 `_`·대문자 | 소문자·숫자·하이픈만 |
| 디자인 무시·제멋대로 | 스킬 리소스 미주입(개인 개발환경 제약) | 스킬 폴더 검증 → **Sandbox 환경에서 개발** |
| Copilot 앱 오류·Teams 랜덤 오동작 | 개인 개발환경에서 New CLI 에이전트 미지원 | **Sandbox 환경에서 개발·게시** |
| 수정해도 옛 동작 | 같은 이름 캐시 / 게시 후 미반영 | 새 이름(`-v2`) / 재게시 후 검증 |
| 메일 첨부 실패 | OneDrive 도구 미연결 / 직접 첨부 | 도구 재연결 / 링크 첨부 방식 |

---

## 참조

- [1부 · What's New (개념편)]({{ '/chapters/newcs1-whats-new/' | relative_url }}) — 하네스·루프·스킬·메모리 원리
- [2부 · 에이전트 생성 (빌드 개념편)]({{ '/chapters/newcs2-build/' | relative_url }}) — 6요소 빌드 개념·작성 팁·함정

> 처음으로 → [New Copilot Studio 개요]({{ '/chapters/newcs0-overview/' | relative_url }})
