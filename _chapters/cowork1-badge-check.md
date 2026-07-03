---
layout: chapter
date: 2026-05-30
title: "Badge Check — 출입 기록 분석 미션"
short_title: "Badge Check"
description: "출입 배지 CSV를 분석해 미체크아웃 직원을 찾고, 커스텀 스킬로 스타일링된 HTML 리포트를 메일로 받기"
order: 1
category: cowork
parent: "cowork"
---

> **미션: Operation Badge Bandit**
> 배지를 찍고 퇴근하지 않은(체크아웃을 잊은) 직원을 추적해, 그 결과를 Copilot Cowork로 메일 받은 편지함에 전달합니다. 🔍

---

## 🔍 문제 상황

건물 보안은 정확한 배지 데이터에 의존하지만, 직원들은 종종 퇴근 시 체크아웃을 잊습니다. 반복적으로 누락하는 인원을 CSV에서 찾아내고, 리포트로 정리하고, 메일로 보내는 일은 생각보다 시간이 많이 걸립니다.

## 📋 완성 결과물

이 미션을 마치면 Copilot Cowork가 다음을 수행합니다.

- ✅ 배지 스캔 CSV를 분석해 체크아웃하지 않은 직원 식별
- ✅ 요약 리포트를 메일로 발송
- ✅ (커스텀 스킬 적용 시) 최다 누락자를 색상으로 강조한 스타일링된 HTML 리포트 발송

## ⚙️ 전제 조건

- **Microsoft 365 Copilot 라이선스**: Copilot Cowork 접근에 필요 ([자세히](https://learn.microsoft.com/copilot/microsoft-365/microsoft-365-copilot-licensing))
- **Microsoft 365 라이선스**: Outlook(리포트 수신) 및 OneDrive(커스텀 스킬 저장)용
- **Anthropic 모델 활성화**: 관리자가 [Microsoft 365 관리 센터](https://admin.microsoft.com/)에서 활성화
- **Copilot Cowork 액세스**: [Microsoft 365 Frontier 프로그램](https://adoption.microsoft.com/copilot/frontier-program/)을 통해 제공

## 🎯 시나리오

여러 도시에 사무실을 둔 회사의 시설 보안 담당자입니다. 모든 직원이 건물에 출입할 때 배지를 찍지만 일부는 퇴근 시 체크아웃을 잊습니다. 관리자는 보안팀이 후속 조치를 할 수 있도록 반복 누락자 리포트를 원합니다. 배지 시스템에서 추출한 CSV를 받았고, 체크아웃을 자주 잊는 사람을 찾아 결과를 메일로 보내야 합니다.

## 📁 랩 에셋

이 미션은 하나의 소스 파일을 사용합니다.

| 파일 | 설명 |
|------|------|
| `badge_check.csv` | 직원 이름, 배지 ID, 사무실 위치, 출입 시각이 담긴 출입 기록. `ExitDateTime`이 비어 있으면 체크아웃을 잊은 것입니다. |

📥 랩 에셋 다운로드: [badge_check.csv](https://raw.githubusercontent.com/microsoft/agent-academy/main/docs/cowork-collective/badge-check/assets/badge_check.csv)

---

## 🧪 Lab 1.1 — 누락자 찾기

첫 번째 랩에서는 배지 스캔 파일을 업로드하고 누가 체크아웃하지 않았는지 Copilot Cowork에게 분석을 요청합니다.

1. [Microsoft 365 Copilot](https://m365.cloud.microsoft/chat/) 열기
2. **Cowork (Frontier)** 선택 (보이지 않으면 먼저 **All agents** 선택)

   ![Copilot 좌측 사이드바에서 Cowork (Frontier) 선택](https://microsoft.github.io/agent-academy/assets/select-cowork.BkCBnr2H.png)

   Copilot Cowork 홈에서는 상단에 새 작업을 입력하거나, "Get to work" 샘플을 선택하거나, 최근 작업을 이어서 진행할 수 있습니다.

   ![Cowork 홈 화면](https://microsoft.github.io/agent-academy/assets/cowork-home.Cn2T_LLn.png)

3. `badge_check.csv` 파일을 대화창에 드래그 앤 드롭

   ![첨부된 badge_check.csv 파일](https://microsoft.github.io/agent-academy/assets/attachment-added.C-UuEtIb.png)

4. 첨부 뒤 `Shift + Enter`로 줄을 띄우고 다음 메시지를 입력합니다.

   ```text
   사무실 출입 배지 스캔 데이터가 담긴 CSV 파일을 첨부했습니다. ExitDateTime이 비어 있으면
   해당 직원이 체크아웃을 잊은 것입니다. 어떤 직원이 체크아웃하지 않았는지 알려주고,
   요약 리포트를 메일로 보내줄 수 있나요?
   ```

   ![프롬프트 입력 완료](https://microsoft.github.io/agent-academy/assets/full-prompt.CwoTVWam.png)

5. 화면과 비슷하면 우측 하단의 전송 버튼을 누릅니다.
6. Copilot Cowork가 파일을 분석하고 체크아웃하지 않은 인원을 식별한 뒤 결과 메일을 발송하는 과정을 확인합니다.

   ![Cowork 출력 — 12명, 누락 164건](https://microsoft.github.io/agent-academy/assets/cowork-output-first-email.DIxT_c9Q.png)

7. [outlook.office.com](https://outlook.office.com/)에서 받은 편지함을 확인합니다. 직원 목록, 배지 ID, 미체크아웃 횟수, 영향받은 사무실이 담긴 요약 표가 포함된 메일이 도착해 있어야 합니다.

   ![Outlook 요약 리포트 메일](https://microsoft.github.io/agent-academy/assets/first-email-light.CuUK3H-s.png)

   다음 항목을 검증합니다.

   - 요약 표에 12명의 직원
   - 미체크아웃 총 164건
   - 최다 누락자(38건)가 상단에 위치
   - 배지 ID, 영향받은 사무실 열 포함

> **팁**
> 리포트에 누락된 직원이 있거나 수치가 어긋나면 처음부터 다시 하지 마세요. 같은 대화에서 "리포트에 ○○○가 빠졌어요. 다시 확인해서 보내주세요"처럼 후속 요청을 보내면 전체를 재생성하지 않고 수정·재전송합니다.

---

## 🧪 Lab 1.2 — 커스텀 스킬로 업그레이드

Copilot Cowork는 OneDrive에 저장한 커스텀 스킬을 지원합니다. 스킬은 특정 작업에 대한 지침을 담은 `SKILL.md` 파일이며, 각 대화 시작 시 자동으로 검색되어 필요할 때 로드됩니다.

> **참고**: 커스텀 스킬은 최대 20개까지 만들 수 있고, 각 `SKILL.md` 파일은 최대 1 MB입니다.

### 커스텀 스킬 동작 방식

각 커스텀 스킬은 OneDrive의 `/Documents/Cowork/Skills/` 하위 폴더에 위치합니다. `SKILL.md` 파일은 두 부분으로 구성됩니다.

1. `name`과 `description`을 담은 **YAML frontmatter** — Copilot Cowork는 이 description을 보고 스킬을 언제 로드할지 판단합니다.
2. **Markdown 지침** — 스킬이 활성화됐을 때 따라야 할 실제 동작 규칙

```yaml
---
name: My Skill Name
description: 이 스킬을 언제, 왜 사용해야 하는지에 대한 짧은 설명.
---
스킬 지침을 일반 Markdown으로 작성합니다.
이 스킬이 활성화됐을 때 Cowork가 어떻게 동작해야 하는지 정확히 알려주세요.
```

### 스킬 추가하기

이 미션에서는 리포트 생성 시 세련된 자체 완결형 HTML 메일을 만들도록 지시하는 `frontend-design` 스킬을 추가합니다.

> **참고**: 이 미션의 frontend-design 스킬은 Anthropic이 만든 오픈소스 스킬([skills.sh](https://skills.sh/anthropics/skills/frontend-design))을 기반으로 하며, 메일 출력용 반응형 디자인 요건을 약간 추가한 버전입니다.

1. [SKILL.md](https://raw.githubusercontent.com/microsoft/agent-academy/main/docs/cowork-collective/badge-check/assets/SKILL.md) 파일을 다운로드해 PC에 저장합니다. 이 스킬은 시스템 기본 폰트 대신 실제 폰트 사용, 일관된 색상 체계, 데스크톱·모바일 모두에서 동작하는 레이아웃을 지시합니다.
2. OneDrive에서 `Documents`로 이동합니다.
3. 다음 폴더 구조를 만듭니다(없으면 각 폴더 생성).

   ```text
   Documents/Cowork/skills/frontend-design/
   ```

4. `frontend-design` 폴더에 `SKILL.md` 파일을 업로드합니다.
5. Copilot Cowork가 다음 대화 시작 시 이 스킬을 자동으로 인식합니다.

### 강화된 미션 실행

1. [Microsoft 365 Copilot](https://m365.cloud.microsoft/chat)을 열고 **Cowork (Frontier)**를 선택합니다.
2. 새 대화를 시작합니다.
3. 다음 프롬프트를 입력창에 붙여 넣습니다(아직 전송하지 않음).

   ```text
   [file]에는 여러 글로벌 사무실의 직원 출입 기록이 들어 있습니다. 각 행은 배지 스캔 이벤트이며
   다음 열을 포함합니다: PersonName, BadgeId, City, BuildingName, EntryDateTime, ExitDateTime.

   ExitDateTime이 비어 있으면 해당 직원이 체크아웃을 잊은 것입니다.

   다음을 수행해 주세요.

   1. 파일을 분석해 사람별 총 출입 횟수와 체크아웃 누락(ExitDateTime이 빈 값) 횟수를 계산합니다.
   2. 체크아웃 누락 횟수 기준 상위 10명을 이름, 배지 ID, 총 출입, 누락 횟수, 누락률(%)과 함께 순위로 정리합니다.
   3. frontend-design 스킬을 사용해, 요약 헤더와 누락 횟수 내림차순으로 정렬된 상위 10명 표를 포함하고
      누락률 50%를 초과하는 사람을 빨간색으로 강조한 자체 완결형(반응형) HTML 리포트를 생성합니다.
   4. 제목을 "Building Access – Top 10 Checkout Offenders"로 하여 리포트를 본문에 포함한 메일을 보냅니다.
   ```

4. `[file]` 자리표시자를 삭제합니다.
5. `+` > **Upload images and files**로 이전의 `badge_check.csv` 파일을 첨부합니다.

   ![강화된 프롬프트 입력](https://microsoft.github.io/agent-academy/assets/full-prompt-lab1-2.BjyHmhzk.png)

6. 우측 하단의 전송 버튼을 눌러 전송합니다.
7. 사이드 패널에서 frontend-design 스킬이 로드되는 것을 확인합니다. 이제 HTML 포맷 규칙이 적용됩니다.
8. [outlook.office.com](https://outlook.office.com/)에서 상위 10명, 누락률, 50% 초과자 빨간색 강조가 적용된 스타일링된 HTML 리포트를 확인합니다.

   ![스타일링된 HTML 리포트 메일](https://microsoft.github.io/agent-academy/assets/second-email-light.CQUmlTW2.png)

> **팁**
> 같은 대화에서 "빨간색 강조 기준을 50%에서 30%로 바꾸고, 각 사람이 가장 자주 방문한 사무실 열을 추가해줘"처럼 요청하면 리포트를 갱신해 재전송합니다.

### 무엇이 달라졌나?

두 메일을 나란히 열어 보세요. 첫 번째는 전 직원이 담긴 평범한 텍스트 표이고, 두 번째는 스타일이 적용된 행과 실제 타이포그래피, 최다 누락자 색상 코딩이 들어 있습니다. **같은 CSV, 같은 에이전트**입니다. 유일한 차이는 OneDrive에 추가한 스킬 파일뿐입니다.

---

## 🏆 미션 완료

Operation Badge Bandit 완료. CSV 하나, 리포트 둘, 커스텀 스킬 하나.

핵심 정리:

- ✅ **하나의 대화, 전체 워크플로**: 작업을 설명하면 분석·리포트 작성·메일 발송까지 수행
- ✅ **커스텀 스킬이 출력을 바꾼다**: 같은 CSV가 스킬 파일 하나로 평범한 표에서 스타일링된 HTML 리포트로
- ✅ **본인 앞 메일 자동 승인**: 본인 계정으로 보내는 메일은 수동 승인 없이 받은 편지함에 도착(다른 수신자는 여전히 승인 필요)

## 🏅 배지 받기

미션을 완료한 뒤 배지를 신청할 수 있습니다: [배지 신청 폼](https://aka.ms/cowork-collective/badge-check/form)

---

> **출처 안내**
> 이 콘텐츠는 Microsoft **Agent Academy**의 [Badge Check](https://microsoft.github.io/agent-academy/cowork-collective/badge-check/) 실습을 한국어로 현지화한 것입니다. 이미지는 원본 사이트의 자산을 링크합니다. 최신 내용과 랩 에셋은 원문을 참고하세요.
> 원문 출처: <https://microsoft.github.io/agent-academy/cowork-collective/badge-check/>
