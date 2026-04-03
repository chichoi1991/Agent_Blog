---
layout: chapter
title: "배포 및 사용 범위 설정"
short_title: "배포 및 범위 설정"
description: "Teams 배포, Web App 배포, 사용자·조직별 사용 범위 관리 방법을 단계별로 안내합니다."
order: 6
icon: "🚀"
category: guide
---

## 배포 전 체크리스트

배포 전에 다음 항목을 확인하세요.

| 항목 | 확인 내용 |
|---|---|
| **지침(Instructions)** | Agent의 역할, 목표, 제약 조건이 명확히 설정되었는가 |
| **Knowledge** | 연결된 데이터 소스가 최신 상태인가, 설명(Description)이 유의미한가 |
| **Actions** | 커넥터/플로우의 인증 설정이 완료되었는가, Flow가 같은 환경에 있는가 |
| **테스트** | 테스트 패널에서 주요 시나리오를 검증했는가, Activity Map으로 동작 확인 |
| **오류 메시지** | Fallback Topic에 적절한 안내 메시지가 설정되었는가 |
| **보안** | 인증 방식이 적절한가, Anonymous 접근이 의도한 것인가 |

---

## Teams 배포

Microsoft Teams는 Copilot Studio Agent의 **가장 대표적인 배포 채널**입니다.

> 📖 **참조**: [Publish and deploy your agent](https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels)

### 게시(Publish) 절차

1. Copilot Studio 상단의 **Publish** 버튼 클릭
2. 변경 사항 요약 확인 후 **Publish** 실행
3. 게시 완료 메시지 확인

<div class="info-box warning">
<strong>⚠️ Publish를 해야 반영됩니다</strong>
편집 중인 내용은 <strong>테스트 패널에서만 확인 가능</strong>합니다. 게시(Publish) 전까지 실제 채널에는 이전 버전이 유지됩니다. "수정했는데 왜 안 바뀌지?"라는 이슈의 원인은 대부분 <strong>Publish 미실행</strong>입니다.
</div>

### Teams 채널 설정

1. **Publish 탭** → **Channels** → **Microsoft Teams** 선택
2. **Turn on Teams** 활성화
3. **Open agent** 클릭하여 Teams에서 Agent 확인

### Teams 배포 범위

| 배포 방식 | 설명 | Admin 승인 |
|---|---|---|
| **개인/링크 공유** | 링크를 통해 개별 사용자에게 공유 | 불필요 |
| **팀 단위** | 특정 Teams 팀에 앱으로 설치 | 불필요 |
| **전사 배포** | Teams Admin Center에서 조직 전체에 배포 | **필수** |

전사 배포 시에는 **"내 조직의 모든 사람에게 표시"** 옵션을 선택하고, Teams Admin Center에서 앱을 **Allowed** 상태로 설정해야 합니다. 필요 시 **Setup policies**로 자동 설치 대상 사용자 그룹을 지정할 수 있습니다.

---

## Web App 배포

웹 채널을 통해 Agent를 **외부 웹사이트**나 **사내 포털**에 임베드할 수 있습니다.

1. **Publish 탭** → **Channels** → **Custom website** 선택
2. 제공되는 **임베드 코드(iframe)** 복사
3. 대상 웹사이트의 HTML에 코드 삽입

<div class="info-box tip">
<strong>💡 실무 팁 — 웹 배포 보안</strong>
웹 채널은 <strong>공개 모드</strong>(인증 없이 접근)와 <strong>인증 모드</strong>(Entra ID 필요)로 구분됩니다. 사내 정보를 다루는 Agent는 반드시 <strong>인증 모드</strong>를 사용하세요. 외부 고객 대상 배포 시에는 <strong>인증 방식 + 데이터 노출 범위를 사전에 보안팀과 검토</strong>하세요.
</div>

### 기타 배포 채널

| 채널 | 특징 | 참조 |
|---|---|---|
| **Microsoft 365 Copilot** | Copilot Chat 내에서 Agent를 플러그인으로 연동 | [Learn](https://learn.microsoft.com/en-us/microsoft-copilot-studio/microsoft-copilot-extend-copilot-extensions) |
| **Facebook Messenger** | B2C 고객 대응 | [Learn](https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels) |
| **Direct Line API** | 커스텀 앱 연동 | |

---

## 사용자/조직별 사용 범위 관리

### 공유 설정

**Agent 수준 공유 (편집 권한)**:
- **공동 작성자(Co-author)**: Agent를 편집하고 게시할 수 있음
- **뷰어(Viewer)**: Agent 설정을 확인할 수 있으나 편집 불가

### 환경(Environment)별 관리

| 환경 유형 | 용도 | 접근 범위 |
|---|---|---|
| **개발(Dev)** | Agent 개발 및 테스트 | 개발팀만 |
| **테스트(UAT)** | 사용자 인수 테스트 | 개발팀 + 현업 검증자 |
| **운영(Production)** | 실제 서비스 환경 | 전체 사용자 |

<div class="info-box warning">
<strong>⚠️ Knowledge 접근 권한 주의</strong>
Agent에 접근할 수 있더라도, Knowledge 소스(SharePoint 등)에 대한 <strong>접근 권한이 없는 사용자에게는 해당 정보가 응답에 포함되지 않습니다</strong>. 이를 고려하여 적절한 문서 권한 설계가 필요합니다.
</div>

<div class="info-box note">
<strong>📌 다음 챕터 미리보기</strong>
배포 방법을 익혔으니, 다음 <strong>Chapter 7</strong>에서는 조직 공용 Agent를 운영할 때의 거버넌스, 등록 프로세스, 유의사항을 다룹니다.
</div>
