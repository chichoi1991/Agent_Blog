---
layout: chapter
date: 2026-05-30
title: "The Compliance Packet — 감사 패키지 생성 미션"
short_title: "The Compliance Packet"
description: "4개의 내부 문서를 바탕으로 한 번의 Cowork 대화에서 감사 패키지(Word/Excel)와 브리핑 메일을 생성"
order: 2
category: cowork
parent: "cowork"
image: "/assets/select-cowork.BrBq5Ltl.png"
---

> **미션: Operation By the Book**
> Zava Financial Services에 2주 뒤 외부 감사관이 방문합니다. 정책 문서 2건, 미해결 항목이 담긴 리스크 레지스터, 감사 체크리스트 등 4개의 내부 문서를 가지고, 경영진 요약·갭 분석·감사관 커버레터와 검토 후 발송할 브리핑 메일까지 한 번의 대화로 만듭니다.

---

## 🔍 문제 상황

컴플라이언스 준비는 문서 중심이며 상호 참조가 많습니다. 여러 파일의 정보를 대조하고, 대상별로 다른 어조로 작성하며, 감사관이 잡아낼 만한 오류 없이 특정 형식의 결과물을 만들어야 합니다.

## 📋 완성 결과물

이 미션을 마치면 Copilot Cowork가 다음을 생성합니다.

- ✅ Zava의 컴플라이언스 현황을 4개 소스 파일 전체에서 종합한 **경영진 요약(Word)**
- ✅ 미해결 리스크 항목을 감사 체크리스트에 매핑하고 리스크 수준으로 정렬한 **갭 분석(Excel)**
- ✅ Hartwell & Associates 앞으로, 경영진이 서명한 **감사관 커버레터(Word)**
- ✅ 사용자가 검토 후 승인하여 Outlook에서 발송하는 **경영진 브리핑 메일**

## ⚙️ 전제 조건

- Copilot Cowork가 활성화된 **Microsoft 365 Copilot 라이선스**
- 이 랩의 `/assets/sample-files` 폴더에 있는 **4개 샘플 파일** 다운로드

> **주의**
> Copilot Cowork는 사용자 계정과 테넌트 모두 Frontier 등록이 필요합니다. [m365.cloud.microsoft](https://m365.cloud.microsoft/)에서 Cowork가 보이지 않으면 관리자가 Microsoft 365 관리 센터의 **Copilot → Settings → Frontier**에서 등록 상태를 확인하도록 요청하세요. 시작 전 4개 샘플 파일을 모두 열어 내용을 파악하세요.

## 🎯 시나리오

시카고에 본사를 둔 중견 금융 서비스 회사 Zava Financial Services의 컴플라이언스 분석가입니다. Hartwell & Associates LLP의 외부 감사가 **2026년 10월 14–18일** ISO 27001 및 SOC 2 Type II 통제를 대상으로 예정되어 있습니다. CISO는 주말까지 경영진 검토용 완전한 감사 패키지를 원합니다. Zava의 현재 컴플라이언스 현황을 설명하는 4개 내부 문서를 한 번의 Cowork 대화로 전문적인 감사 패키지로 바꾸는 것이 목표입니다.

## 📁 랩 에셋

이 미션은 4개의 소스 문서를 제공합니다.

| 파일 | 설명 |
|------|------|
| `data-retention-policy.docx` | Zava 데이터 보존 정책 v2.3 — 보존 일정 및 법적 보존 절차 |
| `access-control-policy.docx` | Zava 접근 통제 정책 v3.1 — IAM, MFA, 특권 접근 |
| `zava-risk-register.csv` | 미해결/부분 리스크 12건(R-001~R-012). 각각 Risk Level, Owner, Status, 조치 메모 포함 |
| `zava-audit-checklist.csv` | ISO 27001/SOC 2에 매핑된 감사 체크리스트 15건. 각각 준비 상태(Ready / In Progress / Not Ready) 포함 |

📥 랩 에셋은 [원문 사이트](https://microsoft.github.io/agent-academy/cowork-collective/compliance-packet/)에서 다운로드할 수 있습니다.

---

## 🧪 Lab 1.1 — Cowork 열고 파일 첨부

일찍 들여둘 좋은 습관: **첫 메시지를 보내기 전에 파일을 첨부**합니다. 시작 시 첨부한 파일은 대화의 모든 단계에서 사용할 수 있습니다. 나중에 추가한 파일은 그 시점부터만 적용됩니다.

1. [m365.cloud.microsoft](https://m365.cloud.microsoft/)로 이동하거나 Microsoft 365 Copilot 데스크톱 앱을 엽니다.
2. 좌측 내비게이션의 **Agents**에서 **Cowork**를 선택합니다.

   ![Cowork 선택](https://microsoft.github.io/agent-academy/assets/select-cowork.BrBq5Ltl.png)

3. 아무것도 입력하기 전에 4개 샘플 파일을 모두 첨부합니다.
   - **Upload images and files**로 PC에서 업로드, 또는
   - 이미 OneDrive/SharePoint로 옮겼다면 **Attach cloud files**

   ![파일 업로드](https://microsoft.github.io/agent-academy/assets/add-files.0utXzG4L.png)

> **참고**: 좌측에 Cowork가 보이지 않으면 **All agents**에서 검색하세요. 그래도 없으면 계정에 Frontier 액세스가 없을 수 있습니다(관리자에게 문의).

---

## 🧪 Lab 1.2 — 프롬프트 전송

4개 파일을 모두 첨부한 상태에서, 전체 작업을 하나의 메시지로 설명합니다. **무엇을** 원하는지 알려주고, **어떻게** 할지는 Copilot Cowork에게 맡깁니다.

다음 프롬프트를 복사해 붙여 넣고 전송합니다.

```text
저는 Zava Financial Services의 컴플라이언스 분석가로, Hartwell & Associates LLP의 외부 감사를
준비하고 있습니다. 감사는 2026년 10월 14–18일에 예정되어 있으며 ISO 27001과 SOC 2 Type II를 다룹니다.
CISO는 주말까지 경영진 검토용 완전한 감사 패키지를 원합니다.

현재 컴플라이언스 현황을 설명하는 4개 문서를 첨부했습니다.
이 파일들만을 유일한 근거로 사용하세요 — 첨부 파일에 없는 발견 사항, 담당자, 정책 세부 내용을 추가하지 마세요.

문서 3건과 메일 초안 1건을 만들어 주세요:

1. 경영진 요약 (Word, 저장명: zava-audit-executive-summary.docx)
   대상: CISO 및 C-레벨. 어조: 직접적이고 전문적이되 과장 없이.
   포함: 전반적 컴플라이언스 현황 평가, 실제 Risk ID가 있는 최고 위험 항목,
   체크리스트 상태별 준비 현황, 노출이 큰 통제 영역, 우선순위가 매겨진 2주 실행 계획.

2. 갭 분석 (Excel, 저장명: zava-gap-analysis.xlsx)
   리스크 레지스터의 각 미해결/부분 항목을 해당 감사 체크리스트 항목에 매핑.
   열: Risk ID | Risk Description | Risk Level | Related Audit Checklist Item |
   Audit Readiness Status | Gap Summary | Recommended Action Before Audit | Owner
   Risk Level 내림차순(Critical 먼저)으로 정렬. 하단에 리스크 수준별 개수 요약 행 추가.

3. 감사관 커버레터 (Word, 저장명: zava-audit-cover-letter.docx)
   수신: Hartwell & Associates LLP, Attention: Lead Auditor
   서명: Dana Olufsen (CCO), Priya Nair (VP Information Security)
   포함: 동봉된 감사 패키지 소개, 감사 범위 확인(ISO 27001 + SOC 2 Type II, 2026년 10월 14–18일),
   일부 조치 항목이 진행 중임을 명시(상세는 경영진 요약 참조).
   형식: 공식 비즈니스 레터, 오늘 날짜, 맺음말 "Respectfully submitted".

4. 경영진 브리핑 메일
   제목: Audit Package Ready for Review — October 14 Engagement
   포함: 10월 14일 감사 일자와 Hartwell & Associates 언급,
   경영진 주의가 필요한 가장 시급한 컴플라이언스 갭 상위 3건(레지스터의 실제 Risk ID 인용),
   전체 경영진 요약이 첨부되어 있다는 안내, 이번 주 30분 정렬 통화 요청.
   어조: 간결하게 — 짧은 문단 3개 이내.
```

![프롬프트 전송](https://microsoft.github.io/agent-academy/assets/send-prompt.DS7qP-KF.png)

> **팁**
> "이 파일들만을 유일한 근거로 사용하세요 — 첨부 파일에 없는 항목·담당자를 추가하지 마세요"라는 문구가 중요합니다. Copilot Cowork가 일반적인 컴플라이언스 내용을 임의로 채워 넣는 것을 막는 지침입니다. 정확성이 타협 불가능할 때 이 패턴을 사용하세요.

---

## 🧪 Lab 1.3 — 사이드 패널 확인 및 문서 검토

전송 후 사이드 패널을 열어 **Progress** 섹션이 실시간으로 갱신되는 것을 확인합니다. 활성화되는 스킬이 **Skills** 섹션에 칩으로 나타납니다. 각 문서가 완료되면 **Outputs** 폴더에 표시됩니다.

![Outputs](https://microsoft.github.io/agent-academy/assets/details-panel-shown.BrT4ocRD.png)

1. **경영진 요약** 출력을 열어 미리보기로 검토합니다. 소스 파일과 대조해 확인하세요.
   - 구체적 Risk ID(R-001~R-012)를 참조하는가?
   - 준비 상태 개수가 정확한가?
   - 정책 버전이 정확한가? (Data Retention v2.3, Access Control v3.1)

   ![경영진 요약 문서](https://microsoft.github.io/agent-academy/assets/exec-summary-doc.zo_NwHi4.png)

2. **갭 분석** 출력을 열어 검토합니다.
   - 모든 리스크 레지스터 항목이 반영됐는가?
   - Critical → High → Medium 순으로 정렬됐는가?
   - 각 행의 담당자가 정확한가?(레지스터와 교차 확인)
   - 하단 요약 행의 리스크 수준별 개수가 맞는가?

   ![갭 분석 문서](https://microsoft.github.io/agent-academy/assets/gap-analysis-doc.BoZdavOy.png)

3. **커버레터** 출력을 열어 검토합니다.
   - 수신자가 정확한가?(Hartwell & Associates LLP)
   - 서명자 2명이 모두 있는가?(Dana Olufsen, Priya Nair)
   - 감사 일자가 정확한가?(2026년 10월 14–18일)
   - 오늘 날짜가 들어간 공식 비즈니스 레터 형식인가?

   ![커버레터 문서](https://microsoft.github.io/agent-academy/assets/cover-letter-doc.Bp2GZUCp.png)

> **참고**: 잘못된 부분이 있으면 처음부터 다시 하지 말고 같은 대화에서 수정 요청을 보내세요. 예: "갭 분석에 R-012가 빠졌습니다. 감사 체크리스트 #7에 매핑하고 Risk Level High로 추가해 주세요." Copilot Cowork가 파일을 갱신해 보여줍니다.

---

## 🧪 Lab 1.4 — 메일 검토 및 승인

문서 3건이 완성되면 Copilot Cowork가 경영진 브리핑 메일 초안을 검토용으로 제시합니다.

1. 먼저 메일을 꼼꼼히 읽습니다.
   - 인용된 Risk ID가 레지스터의 최고 심각도 항목과 일치하는가?
   - 어조가 간결하고 전문적이며 과장이 없는가?
   - 행동 요청(이번 주 30분 정렬 통화)이 명확한가?
   - 감사 일자(10월 14일)가 정확한가?
2. 메일이 올바르면 다음 프롬프트로 발송을 요청합니다.

   ```text
   이 메일과 파일을 <본인 이메일 주소>로 보내주세요
   ```

   > **참고**: 수정이 필요하면 **Reject**를 선택하고 무엇을 고칠지 알려주세요.

3. Copilot Cowork가 파일이 첨부된 새 메일을 인라인으로 작성하면 검토 후 **Send**를 누릅니다.

   ![메일 검토](https://microsoft.github.io/agent-academy/assets/send-email-card.BARkN5ft.png)

   > **주의**: **승인하면 Outlook 계정에서 해당 수신자에게 실제로 메일이 발송됩니다.** 테스트 시에는 본인에게 보내도록 지시하세요.

4. 발송 확인 메시지를 받습니다.

   ![메일 발송 확인](https://microsoft.github.io/agent-academy/assets/email-sent.C9XX3Qi0.png)

5. 받은 편지함에서 발송된 메일을 확인합니다. 책임 있는 AI를 위해 "Sent by Copilot Cowork" 서명이 포함되며, 첨부 파일과 함께 높은 중요도로 표시됩니다.

   ![발송된 메일](https://microsoft.github.io/agent-academy/assets/email.BYuvKHiQ.png)

---

## 🏆 미션 완료

Operation By the Book 완료. 한 번의 Cowork 대화에서 4개의 감사 산출물.

핵심 정리:

- ✅ **근거 기반 출력**: 실제 Risk ID, 실제 정책 버전, 파일 속 실명을 참조
- ✅ **한 번의 프롬프트, 여러 문서**: 작업을 한 번 설명하면 문서 간 일관성까지 처리
- ✅ **발송 전 사용자 승인**: Risk ID 확인, 수신자 확인 후 승인할 때까지 메일 미발송
- ✅ **재시작 없이 즉시 수정**: 잘못된 부분은 타깃 후속 요청으로 부분 수정

## 🏅 배지 받기

미션 완료 후 배지를 신청할 수 있습니다: [배지 신청 폼](https://aka.ms/cowork-collective/compliance-packet/form)

---

> **출처 안내**
> 이 콘텐츠는 Microsoft **Agent Academy**의 [The Compliance Packet](https://microsoft.github.io/agent-academy/cowork-collective/compliance-packet/) 실습을 한국어로 현지화한 것입니다. 이미지는 원본 사이트의 자산을 링크합니다. 최신 내용과 랩 에셋은 원문을 참고하세요.
> 원문 출처: <https://microsoft.github.io/agent-academy/cowork-collective/compliance-packet/>
