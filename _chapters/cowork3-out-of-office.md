---
layout: chapter
date: 2026-05-30
title: "Out of Office Vacation Handoff — 휴가 인수인계 미션"
short_title: "Out of Office Handoff"
description: "휴가 전 인수인계 체크리스트 전체를 한 번의 대화로 Cowork에게 위임하고, 매주 자동 점검까지 설정"
order: 3
category: cowork
parent: "cowork"
---

> **미션: Operation Clean Getaway**
> 휴가 전 처리해야 할 모든 항목을 한 번의 대화로 Copilot Cowork에게 위임하고, 자리를 비운 동안 빠뜨리는 일이 없도록 만듭니다.

---

## 🔍 문제 상황

휴가는 쉬는 시간이어야 하지만, 그 준비 과정은 전혀 그렇지 않습니다. 대부분 떠나기 5분 전에 급하게 부재중(OOF) 메시지를 작성하고, 공항에서 휴대폰으로 회의를 거절하며, 누가 무엇을 맡는지 동료들이 추측하게 둡니다.

부재중 준비에는 보통 다음이 포함됩니다.

- Outlook 설정에서 OOO 자동 회신 작성
- 일정을 하나씩 보며 회의 거절 또는 위임
- 인수인계 요약 문서를 처음부터 작성
- 팀에 "휴가 갑니다" Teams 메시지 발송
- 이 모든 것을 이미 휴가 모드인 머리로 처리

Copilot Cowork는 이 전체 흐름을 처리합니다. 원하는 결과("일주일 휴가를 갈 건데 준비해줘")를 설명하면 계획을 세우고 각 단계를 진행하며, 발송·변경 전에 승인을 요청합니다.

## 📋 완성 결과물

이 미션을 마치면 Copilot Cowork가 다음을 수행합니다.

- ✅ Outlook OOF 자동 회신 설정(승인 하에)
- ✅ 다가오는 회의에 대한 일정 조치 제안(거절, 위임, 일정 변경)
- ✅ 누가 무엇을 맡는지 요약한 Teams 메시지 초안 작성
- ✅ 수행한 모든 작업의 단계별 감사 기록 제공

## ⚙️ 전제 조건

- **Microsoft 365 Copilot 라이선스**: Copilot Cowork 접근에 필요 ([자세히](https://learn.microsoft.com/copilot/microsoft-365/microsoft-365-copilot-licensing))
- **Microsoft 365 라이선스**: Outlook, Teams, Microsoft Planner 연동용
- **Anthropic 모델 활성화**: 관리자가 [Microsoft 365 관리 센터](https://admin.microsoft.com/)에서 활성화
- **Copilot Cowork 액세스**: [Microsoft 365 Frontier 프로그램](https://adoption.microsoft.com/copilot/frontier-program/)을 통해 제공

## 📝 실제 데이터 vs. 시드 데이터

Copilot Cowork는 사용자의 실제 M365 환경(실제 메일·작업·일정)을 읽을 때 가장 잘 동작합니다. 진행 중인 실제 업무로 이 랩을 실행하면 출력이 구체적이고 바로 유용합니다.

데모 테넌트나 깨끗한 환경이라면, Lab 1의 **시드 데이터**가 현실적인 작업 거리를 제공합니다. 작업과 메일은 기한 초과 항목, 위험 마감, 잊기 쉬운 항목을 포함하도록 설계되어 있습니다.

## 🎯 시나리오

중견 기술 컨설팅 회사 Zava의 프로젝트 매니저입니다. 다음 주 월–금 일주일 휴가를 떠납니다. 지금은 목요일 오후이고 퇴근까지 약 30분 남았습니다. 진행 중인 프로젝트, 다음 주 일정의 회의, 부재중 상황을 알아야 할 팀원들이 있습니다. 떠나기 전 체크리스트 전체를 Copilot Cowork에게 넘기고 퇴근합니다.

---

## 🧪 Lab 1.1 — M365 환경에 시드 데이터 넣기

> **참고**: 사용할 실제 진행 업무와 데이터가 있다면 이 단계를 건너뛰고 Lab 2.1로 바로 가세요.

이 단계는 Copilot Cowork가 발견할 현실적인 데이터를 4개 M365 표면(Planner, Outlook, Teams, 일정)에 설정합니다. 더 많이 채울수록 출력이 풍부해집니다.

### ✅ 1.2 — Planner(또는 To Do)에 작업 추가

`Zava PM Tasks` 플랜(없으면 생성)에 다음 작업을 추가합니다. Planner가 없으면 Microsoft To Do에 추가하세요. 일부는 휴가 주에, 일부는 이미 기한 초과, 일부는 복귀 직후에 걸리도록 설계되어 있습니다.

> **참고**: 기한에서 "OOO Monday"는 부재 첫 월요일, "Return +1"은 복귀 후 화요일을 뜻합니다. 다음 주 기준으로 날짜를 설정하세요.

| 작업 | 기한 | 우선순위 | 메모 |
|------|------|----------|------|
| 수정된 프로젝트 일정 Morgan Connors에게 발송 — Clearwater | OOO Monday | Urgent | 지난 금요일에 나갔어야 함 |
| Phase 3 킥오프 덱 검토·승인 — Northgate | OOO Tuesday | High | Priya가 목요일 발표 전 사인오프 필요 |
| Q4 리소스 예측 재무팀 제출 | OOO Wednesday | High | 재무 마감 — 미룰 수 없음 |
| 계약 갱신 후속 조치 — Summit Financial | OOO Thursday | Medium | 법무팀이 승인 메일 대기 중 |
| UAT 피드백 요약 작성 — Summit Financial | OOO Friday | High | Jordan Lee가 UAT 담당, 요약 템플릿 필요 |
| 연례 컴플라이언스 교육 완료 | OOO Wednesday | Medium | 이미 3일 초과. 7일 시 자동 플래그 |
| 5월 전사 회의 안건 초안 | Return +1 | Medium | Priya가 복귀 첫날까지 필요 |
| 프로젝트 리스크 로그 업데이트 — Clearwater | Return +2 | Low | 운영위 전 예산 초과 플래그 추가 |

> **팁**: 8개를 모두 넣을 필요는 없습니다. 4–5개만으로도 의미 있는 위험 항목을 충분히 도출합니다.

### 📧 1.3 — Outlook에 초안 메일 생성

다음 3개 메일을 Outlook **초안** 폴더에 만듭니다. **발송하지 말고 초안으로 둡니다.** Copilot Cowork가 이를 찾아 "떠나기 전 발송해야 할 항목"으로 표시합니다.

- **초안 1** — 받는 사람: 본인 / 제목: `Revised Project Timeline — Clearwater Health Intranet` / 본문: 콘텐츠 동결에 따른 2주 연장이 반영된 수정 일정 안내(콘텐츠 승인 5/9, 개발 완료 5/23, UAT 5/26–30, 출시 6/6).
- **초안 2** — 받는 사람: 본인 / 제목: `Contract Renewal — Approval to Proceed` / 본문: 논의된 조건으로 진행 승인 확인, 양측 법무 참여 요청, 목표 서명일 5/15.
- **초안 3** — 받는 사람: 본인 / 제목: `Q2 Resource Forecast — Draft for Review` / 본문: 재무 제출 전 검토 요청, 입력이 필요한 2개 항목(Clearwater 계약 연장으로 6월까지 0.5 FTE 추가, Q3 신규 채용 1명 사인오프 필요), 내일 EOD까지 검토 요청, 수요일 제출.

### 💬 1.4 — Teams 스레드 심기

사용하는 Teams 채널(또는 `Zava PM Team` 채널 생성)에 본인 명의로 다음 메시지를 게시합니다. 떠나기 전 응답이 필요한 미해결 스레드를 시뮬레이션합니다.

> 빠른 질문 — Phase 3 예산 최종 사인오프 받았나요? 지난주에 Dana가 확인해주기로 했는데 메일에 안 보이네요. 목요일 범위 검토 전에 알아야 합니다.

응답하지 않은 채로 둡니다. Copilot Cowork가 이를 찾아 미해결 항목으로 표시합니다.

### 📅 1.5 — 일정에 회의 추가

다음 5개 회의를 다음 주 월–금 Outlook 일정에 추가합니다. 참석자 이름을 조직의 실제 인물로 바꾸거나, 데모 테넌트라면 본인 이메일을 사용하세요.

| 요일 | 시간 | 회의 | 참석자 |
|------|------|------|--------|
| 월 | 10:00–10:30 | Clearwater Health — 주간 점검 | 본인 + 고객 담당 |
| 화 | 9:00–9:30 | Phase 3 범위 검토 | 본인 + Priya + Marcus |
| 수 | 15:00–15:30 | Summit Financial — UAT 검토 | 본인 + Jordan + 고객 담당 |
| 목 | 14:00–15:00 | Priya Nair와 1:1 | 본인 + Priya |
| 금 | 11:00–12:00 | Zava PM 팀 회고 | 본인 + PM 팀 전원 |

> **주의**: 이벤트를 추가하기 전에 모든 참석자 이름과 이메일을 조직의 실제 인물로 바꾸세요. Copilot Cowork가 이들에게 거절·위임 메시지 초안을 작성하므로, 가짜 주소는 반송됩니다.

### 🗓️ 1.6 — 일정에 PTO 블록 추가

Copilot Cowork의 스케줄 자동화가 결국 감지할 이벤트입니다.

- 제목: `[본인 이름] PTO — Out of Office`
- 날짜: 다음 주 월–금(종일, Out of Office로 표시)
- 메모: `[다음 주 월요일] 복귀. 메일 접근 불가.`

---

## 🧪 Lab 2.1 — Copilot Cowork 디스커버리

여기서는 프로젝트가 무엇인지 알려주는 대신, M365 데이터 전반을 살펴 **스스로 찾아내도록** 요청합니다. 부재 전 마무리해야 할 것을 발견하는 단계입니다.

1. [m365.cloud.microsoft](https://m365.cloud.microsoft/)로 이동하거나 데스크톱 앱을 엽니다.
2. 좌측 사이드바의 **Agents**에서 **Cowork**를 선택합니다.

   ![Cowork 선택](https://microsoft.github.io/agent-academy/assets/select-cowork.BrBq5Ltl.png)

3. **파일을 첨부하지 않습니다.** Copilot Cowork가 실시간 M365 데이터(메일, 일정, 작업, Teams)를 읽길 원하기 때문입니다. 다음 프롬프트를 붙여 넣고 전송합니다.

   ```text
   다음 주 월–금 휴가를 갑니다. 무언가를 설정하기 전에, 제 업무 전반을 살펴 위험에 처한 것들의
   전체 그림을 보여주세요.

   다음을 검색해 주세요:
   - 제 Outlook 메일 — 미응답 스레드, 대기 중인 회신, 초안 폴더에서 아직 발송되지 않은 메일
   - 제 일정 — 부재 주에 잡힌 회의 중 결정(거절·위임·일정 변경)이 필요한 것
   - 제 Planner와 To Do 작업 — 부재 주 또는 복귀 후 3일 내 마감 작업, 특히 기한 초과/미배정 항목
   - 최근 Teams 대화 — 제가 참여한 미해결 질문이나 스레드 중 부재 중 문제가 될 수 있는 것

   찾은 항목을 세 가지로 분류해 주세요:
   🔴 떠나기 전 반드시 처리 — 24시간 내 처리하지 않으면 문제가 될 것
   🟡 위임 필요 — 진행 중이며 부재 중 누군가 맡아야 할 것
   🟢 나중에 처리 가능 — 복귀 후 처리해도 안전한 것

   아직 어떤 조치도 취하지 마세요. 먼저 전체 그림만 보여주세요.
   ```

   > **참고**: "아직 어떤 조치도 취하지 마세요"라는 문구가 중요합니다. 실행 전에 발견된 모든 항목을 먼저 볼 수 있는 순수 디스커버리 단계로 유지합니다.

   ![프롬프트 전송](https://microsoft.github.io/agent-academy/assets/send-first-prompt.zX8dimqT.png)

   Copilot Cowork가 세 가지 분류로 구조화된 위험 리포트를 반환합니다. 관련 항목(실제 업무 또는 추가한 시드 데이터)이 모두 반영됐는지 검토합니다.

   ![응답](https://microsoft.github.io/agent-academy/assets/FirstPromptResponse.MkA0fvl3.png)

---

## 🧪 Lab 3.1 — 실행

전체 그림을 확보했으니 이제 조치 항목을 Copilot Cowork에게 넘깁니다.

1. 다음 프롬프트를 전송합니다.

   ```text
   맞아 보입니다. 전부 처리해 주세요. 나가기 전에 모든 것을 보여주고,
   발송·게시 전에 제 승인을 받으세요.
   ```

2. Copilot Cowork가 구조화된 계획을 보여준 뒤 단계별로 실행하며, 각 조치 전에 승인을 기다립니다. 초안 메일을 찾아 발송 허가를 요청하면 **Send as is**를 선택합니다.

   ![메일 발송](https://microsoft.github.io/agent-academy/assets/draftsignoff.CQKuHHJC.png)

3. 충돌하는 회의에 대해 일정 변경/취소/위임 중 무엇을 할지 묻습니다. **cancel outright**(완전 취소)를 선택하고 **Next**를 클릭합니다.

   ![회의 옵션](https://microsoft.github.io/agent-academy/assets/rescheduleretro.DFl6LB1R.png)

4. 부재 중 마감인 작업에 대해 팀원 목록에서 위임 대상을 묻습니다. 한 명을 선택하고 **Next**를 클릭합니다.

   ![위임](https://microsoft.github.io/agent-academy/assets/delegateowner-next.cXjq_IDy.png)

5. 지정한 사람을 대리자로 하여, 작업과 마감일을 나열한 메일 초안을 작성합니다. 검토 후 **Send**를 누릅니다.

   ![대리 메일 발송](https://microsoft.github.io/agent-academy/assets/send-cover-email.Dq2hgBl9.png)

6. 이어서 충돌 이벤트를 한 줄씩 취소합니다. 초안 메시지와 작성된 취소 사유를 검토합니다.

   ![회의 취소](https://microsoft.github.io/agent-academy/assets/cancel-event.kOvU5NHL.png)

7. **Cancel** 옆 드롭다운에는 "always allow cancel event" 옵션이 있습니다. 이 과정에서 발견되는 이후 이벤트에 대해 매번 묻지 않고 취소 권한을 부여합니다.

   ![항상 허용](https://microsoft.github.io/agent-academy/assets/always-allow-cancel-event.CofHzavZ.png)

8. Copilot Cowork가 외부용·내부용 부재중 메시지를 각각 작성해 검토용으로 제시합니다. 위험 수준을 확인하고 **Approve**로 설정합니다.

   ![OOO 메시지](https://microsoft.github.io/agent-academy/assets/setup-ooo-auto-reply-approve.CO3VYfuu.png)

9. 완료되면 수행한 모든 작업의 요약을 제공합니다.

   ![작업 개요](https://microsoft.github.io/agent-academy/assets/overview-actions.DGX3R_fP.png)

---

## 🧪 보너스 랩 — 자동 2일 점검 설정

이제 스케줄에 맞춰 실행되도록 설정합니다. Copilot Cowork가 매주 월요일 아침 일정을 점검해, 영업일 2일 내 시작하는 PTO 블록이 있으면 디스커버리 패스를 실행하고 리포트를 가져옵니다.

1. 새 Cowork 대화에서 다음 메시지를 전송합니다.

   ```text
   반복 스케줄 점검을 설정하고 싶습니다. 매주 월요일 아침 8:00에 다음 주 일정을 보고,
   영업일 2–3일 내 시작하는 PTO·휴가·부재중 블록이 있는지 확인해 주세요.

   영업일 2일 내 시작하는 PTO 블록을 찾으면, 제 업무 전반을 살펴 위험에 처한 것들의
   전체 그림을 보여주세요.

   다음을 검색해 주세요:
   - 제 Outlook 메일 — 미응답 스레드, 대기 중인 회신, 초안 폴더에서 아직 발송되지 않은 메일
   - 제 일정 — 부재 주에 잡힌 회의 중 결정이 필요한 것
   - 제 Planner와 To Do 작업 — 부재 주 또는 복귀 후 3일 내 마감 작업, 특히 기한 초과/미배정 항목
   - 최근 Teams 대화 — 미해결 질문이나 스레드

   찾은 항목을 세 가지로 분류해 주세요:
   🔴 떠나기 전 반드시 처리  🟡 위임 필요  🟢 나중에 처리 가능

   다가오는 PTO가 없으면: 아무것도 하지 말고 알리지 마세요.

   이것을 반복 스케줄 프롬프트로 설정해 주세요.
   ```

   ![반복 프롬프트](https://microsoft.github.io/agent-academy/assets/recurring-prompt.DOS1qsg8.png)

2. Copilot Cowork가 스케줄 자동화 검토 패널을 제시합니다. 필요한 내용이 모두 있는지 확인하고 **Activate and run**을 클릭합니다. 지금 즉시 실행해 출력을 검증할 수 있습니다.

   ![자동화 실행](https://microsoft.github.io/agent-academy/assets/activate-run-weekly.DPVRNM3s.png)

3. 위험 점검 항목을 수집하는 과정을 지켜봅니다. **Details** 패널에 "Scheduled" 헤더와 Active On 표시가 나타나 반복 자동화임을 알려줍니다.
4. 자동 실행이 목적이므로, Teams에 평가를 게시할지 물으면 **Always allow post message**를 선택해 매번 묻지 않게 합니다.

   ![항상 발송](https://microsoft.github.io/agent-academy/assets/post-teams-message.DCIOCES2.png)

5. 결과를 검토합니다. 이제 스케줄 작업이 매주 월요일 아침 자동으로 실행됩니다.

---

## 🏆 미션 완료

Operation Clean Getaway 완료!

만든 것:

- ✅ **실행 전 디스커버리**: 실시간 M365 환경을 스캔해 위험 항목을 수동 정리 없이 도출
- ✅ **모든 단계 승인**: 사용자 사인오프 없이는 어떤 것도 발송·게시·변경되지 않음
- ✅ **자동 월요일 점검**: 매주 월요일 아침 일정을 확인하고, 다가오는 PTO가 있으면 스스로 디스커버리 리포트 실행
- ✅ **재사용 가능한 패턴**: 디스커버리 우선 프롬프트와 스케줄 점검은 OOO 준비뿐 아니라 반복 개인 워크플로 전반에 활용 가능

## 🏅 배지 받기

미션 완료 후 배지를 신청할 수 있습니다: [배지 신청 폼](https://aka.ms/cowork-collective/ooo-prep/form)

---

> **출처 안내**
> 이 콘텐츠는 Microsoft **Agent Academy**의 [Out of Office Vacation Handoff](https://microsoft.github.io/agent-academy/cowork-collective/out-of-office-prep/) 실습을 한국어로 현지화한 것입니다. 이미지는 원본 사이트의 자산을 링크합니다. 최신 내용과 랩 에셋은 원문을 참고하세요.
> 원문 출처: <https://microsoft.github.io/agent-academy/cowork-collective/out-of-office-prep/>
