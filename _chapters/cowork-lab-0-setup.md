---
layout: chapter
date: 2026-09-05
title: "Step 0 — 실습 환경 준비 (관리자용)"
short_title: "Step 0. 준비사항"
description: "실습 시작 전 관리자가 해야 할 4가지: 크레딧·PAYG 할당, 샘플 파일 업로드, OneDrive 배포 안내, SharePoint/Teams 채널 배치"
order: 901
category: cowork
parent: "cowork-lab"
tags: ["Copilot Cowork", "관리자", "PAYG", "SharePoint", "OneDrive"]
---

<div class="info-box warning" markdown="1">

**이 페이지는 관리자용입니다** — 실습 참가자가 아니라 **실습을 준비하는 관리자**가 미리 끝내야 하는 작업입니다. 소요 시간은 약 20분이며, 이 단계를 건너뛰면 참가자가 Step 1에서 바로 막힙니다.
</div>

---

## 준비 작업 4가지

| # | 작업 | 담당 | 소요 |
|---|---|---|---|
| 1 | 비용 관리 센터에서 **크레딧·PAYG 할당** | Copilot 관리자 | 10분 |
| 2 | **샘플 파일 업로드** — 참가자가 다운로드할 수 있게 | 관리자 | 5분 |
| 3 | **OneDrive 파일 배포 안내** — 참가자가 직접 올려야 함 | 관리자 → 참가자 | 안내만 |
| 4 | **SharePoint 문서를 실습 사이트/Teams 채널에 배치** | 관리자 | 5분 |

---

## 1. 크레딧과 사용량 기반 과금 할당

Copilot Cowork는 **에이전트 실행 단위로 소비되는 크레딧**을 사용합니다. 라이선스만으로는 부족하며, 실습 그룹에 사용량이 할당되어 있지 않으면 참가자가 프롬프트를 넣어도 **"사용량 한도를 초과했습니다"** 로 멈춥니다.

### 1-1. 사용량 기반 과금(PAYG) 활성화

<ul class="checklist">
<li><a href="https://admin.microsoft.com/" target="_blank">Microsoft 365 관리 센터</a> → <strong>결제</strong> → <strong>사용량 기반 서비스</strong> 로 이동</li>
<li><strong>Copilot Credits</strong> 항목에서 <strong>Azure 구독을 연결</strong> — 크레딧 소비분이 이 구독으로 청구됩니다</li>
<li>연결할 <strong>리소스 그룹</strong>을 선택하거나 새로 만듭니다 (예: <code>rg-copilot-cowork-lab</code>)</li>
<li>상태가 <strong>활성(Active)</strong> 으로 바뀌었는지 확인</li>
</ul>

<div class="info-box note" markdown="1">

**왜 Azure 구독이 필요한가** — Cowork의 에이전트 실행은 라이선스에 포함된 대화형 채팅과 달리 **실행량에 비례해 과금**됩니다. 사전 결제된 크레딧 팩을 쓰거나, 초과분을 사용량 기반으로 청구하는 두 가지 방식이 있으며, 실습에서는 후자가 관리하기 쉽습니다.
</div>

### 1-2. 실습 그룹에 크레딧 할당

전사 대상으로 열어두면 실습과 무관한 소비가 섞여 비용 추적이 어렵습니다. **실습 참가자만 담긴 보안 그룹**을 만들고 거기에만 할당하세요.

<ul class="checklist">
<li>Entra ID에서 보안 그룹 생성 — 예: <code>Cowork-Lab-Participants</code></li>
<li>실습 참가자 계정을 그룹에 추가</li>
<li>관리 센터 → <strong>설정</strong> → <strong>Copilot</strong> → <strong>에이전트 및 크레딧 관리</strong></li>
<li>Cowork 액세스 범위를 <strong>선택한 그룹</strong>으로 지정하고 위 그룹을 선택</li>
<li>그룹별 <strong>월 크레딧 상한</strong>을 설정 (실습 1회당 참가자 1인 기준 넉넉히 잡아도 됩니다)</li>
</ul>

### 1-3. Anthropic 모델 활성화

Cowork는 Anthropic 모델에 의존합니다. **이것이 꺼져 있으면 Cowork 탭 자체가 보이지 않습니다.**

<ul class="checklist">
<li>관리 센터 → <strong>설정</strong> → <strong>조직 설정</strong> → <strong>Copilot</strong></li>
<li><strong>Anthropic 모델 사용</strong> 을 켜고, 하위 처리자 조건에 동의</li>
<li>참가자 계정으로 <a href="https://m365.cloud.microsoft/chat/" target="_blank">m365.cloud.microsoft/chat</a> 에 들어가 <strong>Cowork</strong> 탭이 보이는지 확인</li>
</ul>

<div class="info-box warning" markdown="1">

**반영에 시간이 걸립니다** — 라이선스·모델·크레딧 설정은 즉시 적용되지 않을 수 있습니다. **실습 최소 하루 전에** 마치고, 실습 계정 하나로 실제 프롬프트를 한 번 돌려 보세요. 당일 아침에 설정하면 "왜 안 보이죠?"로 30분을 씁니다.
</div>

---

## 2. 샘플 파일 업로드 — 참가자가 다운로드할 수 있게

실습에 쓰는 파일은 **30개**입니다. SharePoint 24개 + OneDrive 6개.

| 폴더 | 파일 수 | 내용 |
|---|---|---|
| `01_RFP` | 3 | Halcyon Energy 입찰 문서(20p), 평가 배점표, 제출 체크리스트 |
| `02_Contracts` | 3 | Kestrel MSA 갱신본, SLA 부속서, 벤더 리스크 |
| `03_Project_Northstar` | 6 | 주간 상태보고, 회의록, 3안 비교, 배포 트래커, 아키텍처 덱, 고객 QBR 덱 |
| `04_Incidents_INC-4471` | 3 | 엔지니어링 노트, 지표 워크북, 고객 통보 이력 |
| `05_Templates` | 3 | 브랜드 가이드, 슬라이드 마스터, 제안서 템플릿 |
| `06_Policies` | 3 | 정보보안, 개인정보보호, 출장·경비 정책 |
| `07_Onboarding` | 3 | 팀 차터, 직무기술서, 필독 목록 |
| `OneDrive_Ava` | 6 | Ava의 개인 작업 파일 (초안 4 + 빈 파일 2) |

### 2-1. 배포용 위치에 올리기

참가자가 **다운로드할 수 있어야** 하므로, 읽기 권한이 열린 곳에 원본을 둡니다.

<ul class="checklist">
<li>실습용 SharePoint 사이트를 만듭니다 — 예: <code>/sites/Cowork-demo</code></li>
<li>문서 라이브러리에 <strong>폴더 구조 그대로</strong> 30개를 업로드합니다 (하위 폴더 유지가 중요합니다)</li>
<li>사이트 권한을 실습 그룹에 <strong>읽기 이상</strong>으로 부여</li>
<li>참가자에게 사이트 URL을 공지</li>
</ul>

<div class="info-box tip" markdown="1">

**폴더 이름을 바꾸지 마세요** — 실습 프롬프트가 `01_RFP`, `04_Incidents_INC-4471` 같은 폴더명을 **직접 지목**합니다. 이름을 바꾸면 Cowork가 파일을 못 찾습니다.
</div>

---

## 3. OneDrive 파일 — 참가자가 직접 올려야 합니다

<div class="info-box warning" markdown="1">

**관리자가 참가자에게 반드시 안내해야 하는 부분입니다** — SharePoint 파일은 관리자가 한 번 올리면 모두가 공유합니다. 하지만 **OneDrive 파일 6개는 각 참가자가 자기 OneDrive에 직접 업로드해야 합니다.** 이 안내가 빠지면 참가자는 Step 3과 Step 4에서 "파일을 찾을 수 없다"는 답을 받게 됩니다.
</div>

### 왜 각자 올려야 하나

이 6개는 시나리오상 **"Ava의 개인 작업 파일"** 입니다. 남과 공유하지 않은 초안이라는 설정이고, 실습에서 Cowork가 *"공유된 문서와 내 개인 초안을 구분해서 다룬다"* 는 것을 보여주는 장치입니다. 관리자의 OneDrive에 있으면 참가자 계정에서는 보이지 않습니다.

### 참가자 안내문 (그대로 복사해 공지하세요)

<div class="prompt-box" data-label="참가자에게 보낼 안내 메시지" markdown="1">

~~~text
[Copilot Cowork 실습 사전 준비 — 5분 소요]

실습 시작 전에 각자 아래를 완료해 주세요. 이 작업을 안 하면 실습 중간에 막힙니다.

1. 실습 자료 사이트에 접속합니다.
   → (관리자가 공지한 SharePoint 사이트 URL)

2. OneDrive_Ava 폴더에서 파일 6개를 모두 다운로드합니다.
   - Halcyon_pricing_scratch.xlsx
   - QBR_talking_points.docx
   - Q3_forecast_working.xlsx
   - Solstice_save_plan_draft.docx
   - Alex_Chen_30-60-90_draft.docx
   - Meridian_RCA_outline.docx

3. 본인 OneDrive를 열고 다음 경로에 폴더를 만듭니다.
   내 파일 > 문서 > Cowork-demo > OneDrive_Ava

4. 다운로드한 6개 파일을 그 폴더에 업로드합니다.

5. 확인: OneDrive에서 파일 6개가 모두 보이면 준비 완료입니다.

참고 - 마지막 두 파일(Alex_Chen_30-60-90_draft.docx,
Meridian_RCA_outline.docx)은 제목만 있고 내용이 비어 있습니다.
고장난 파일이 아니라 실습에서 Cowork가 직접 채울 파일입니다.
~~~

</div>

<ul class="checklist">
<li>위 안내문을 메일 또는 Teams 채널로 <strong>실습 최소 하루 전</strong> 공지</li>
<li>실습 시작 직후 "OneDrive 업로드 하신 분?" 으로 한 번 더 확인</li>
<li>못 한 참가자를 위해 다운로드 링크를 화면에 띄워 둘 것</li>
</ul>

---

## 4. SharePoint 문서를 실습 사이트 또는 Teams 채널에 배치

Cowork가 문서를 찾으려면 **참가자 계정에서 접근 가능한 SharePoint 위치**에 있어야 합니다. 두 가지 방법 중 하나를 선택하세요.

### 방법 A — 전용 SharePoint 사이트 (권장)

<ul class="checklist">
<li>SharePoint 관리 센터 또는 Teams에서 사이트 생성 — 예: <code>Cowork-demo</code></li>
<li>기본 문서 라이브러리(<code>Documents</code>)에 폴더 7개 + 파일 24개 업로드</li>
<li>사이트 구성원으로 실습 그룹 추가 (또는 조직 전체 읽기)</li>
<li>참가자 계정 하나로 로그인해 <strong>실제로 파일이 열리는지</strong> 확인</li>
</ul>

**장점** — 구조가 깔끔하고, 실습 후 사이트째로 삭제하면 정리가 끝납니다.

### 방법 B — 기존 Teams 채널의 파일 탭

<ul class="checklist">
<li>실습용 Teams 팀·채널을 만들거나 기존 채널을 사용</li>
<li>채널의 <strong>파일</strong> 탭에서 폴더 구조 그대로 업로드</li>
<li>참가자를 팀 구성원으로 추가</li>
</ul>

**장점** — 참가자가 이미 Teams에 있으므로 접근이 자연스럽고, 실습 중 질문도 같은 채널에서 받을 수 있습니다.
**주의** — 비공개 채널은 별도 사이트를 쓰므로 권한을 다시 확인해야 합니다.

<div class="info-box note" markdown="1">

**Teams 채널 대화도 실습 데이터입니다** — Step 4(장애 대응)의 핵심은 Cowork가 **Teams 채널 메시지 한 줄**에서 장애 원인을 찾아내는 것입니다. 완전한 실습을 하려면 `INC-4471 War Room` 채널에 시드 대화도 함께 넣어야 합니다. 파일만 올리면 Step 4의 하이라이트가 사라집니다.
</div>

---

## 준비 완료 점검

실습 시작 전 참가자 계정 **하나로 직접** 아래를 확인하세요. 관리자 계정으로는 권한 문제가 안 보입니다.

<ul class="checklist">
<li>Copilot 화면에 <strong>Cowork</strong> 탭이 보인다</li>
<li>Cowork에 아무 프롬프트나 넣었을 때 크레딧 오류 없이 실행된다</li>
<li>SharePoint 실습 사이트가 열리고 폴더 7개가 보인다</li>
<li><code>01_RFP</code> 안의 문서를 열 수 있다</li>
<li>본인 OneDrive의 <code>Cowork-demo/OneDrive_Ava</code> 에 파일 6개가 있다</li>
<li>(선택) Teams에 <code>INC-4471 War Room</code> 채널 대화가 보인다</li>
</ul>

여섯 개 모두 통과했다면 **[Step 1 — 아침 08:30]({{ '/chapters/cowork-lab-1-morning/' | relative_url }})** 로 이동하세요.

---

## 자주 겪는 문제

| 증상 | 원인 | 해결 |
|---|---|---|
| Cowork 탭이 안 보임 | Anthropic 모델 미활성화 또는 Frontier 미참여 | 1-3 확인, 반영에 수 시간 소요 |
| "사용량 한도 초과" | PAYG 미연결 또는 그룹에 크레딧 미할당 | 1-1, 1-2 확인 |
| "파일을 찾을 수 없습니다" | 폴더명 변경 또는 참가자 권한 없음 | 폴더명 원복, 실습 그룹 권한 확인 |
| OneDrive 파일만 못 찾음 | 참가자가 3번을 안 함 | 안내문 재공지 |
| 빈 문서가 열림 | 정상 동작 | 실습에서 Cowork가 채울 파일입니다 |
| 장애 원인을 못 찾음 | Teams 채널 시드 데이터 누락 | 방법 B 참고 |
