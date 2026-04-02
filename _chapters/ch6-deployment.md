---
layout: chapter
title: "배포 및 사용 범위 설정"
short_title: "배포 및 범위 설정"
description: "Teams 배포, Web App 배포, 사용자·조직별 사용 범위 관리 방법을 단계별로 안내합니다."
order: 6
icon: "🚀"
---

## Teams 배포

Microsoft Teams는 Copilot Studio Agent의 **가장 대표적인 배포 채널**입니다. 조직 내 직원들이 일상적으로 사용하는 환경에서 바로 Agent를 활용할 수 있습니다.

### 배포 전 체크리스트

배포 전에 다음 항목을 확인하세요.

| 항목 | 확인 내용 |
|---|---|
| **지침(Instructions)** | Agent의 역할, 목표, 제약 조건이 명확히 설정되었는가 |
| **Knowledge** | 연결된 데이터 소스가 최신 상태인가 |
| **Actions** | 커넥터/플로우의 인증 설정이 완료되었는가 |
| **테스트** | 테스트 패널에서 주요 시나리오를 검증했는가 |
| **오류 메시지** | Fallback 토픽에 적절한 안내 메시지가 설정되었는가 |

### 게시(Publish) 절차

1. Copilot Studio 상단의 **Publish** 버튼 클릭
2. 변경 사항 요약 확인 후 **Publish** 실행
3. 게시 완료 메시지 확인

<div class="info-box note">
<strong>📌 참고</strong>
Publish를 실행해야 최신 변경 사항이 실제 채널에 반영됩니다. 편집 중인 내용은 테스트 패널에서만 확인할 수 있으며, 게시 전까지 기존 배포 버전이 유지됩니다.
</div>

### Teams 채널 설정

1. **Publish 탭** → **Channels** → **Microsoft Teams** 선택
2. **Turn on Teams** 활성화
3. **Open agent** 클릭하여 Teams에서 Agent 확인
4. 필요 시 **Availability options**에서 조직 내 공유 범위 설정

### Teams 관리 센터 등록 (조직 전체 배포)

조직 전체에 Agent를 배포하려면 Teams 관리 센터에서 추가 설정이 필요합니다.

1. **Teams Admin Center** 접속
2. **Teams apps** → **Manage apps**에서 Agent 앱 검색
3. 앱 상태를 **Allowed**로 설정
4. 필요 시 **Setup policies**에서 자동 설치 대상 사용자 그룹 지정

---

## Web App 배포

웹 채널을 통해 Agent를 **외부 웹사이트**나 **사내 포털**에 임베드할 수 있습니다.

### 웹 채널 활성화

1. **Publish 탭** → **Channels** → **Custom website** 선택
2. 제공되는 **임베드 코드(iframe)** 복사
3. 대상 웹사이트의 HTML에 코드 삽입

### 임베드 코드 구조

```html
<iframe
  src="https://copilotstudio.microsoft.com/environments/.../bots/.../webchat"
  frameborder="0"
  style="width: 100%; height: 600px;">
</iframe>
```

### 웹 채널 커스터마이징

| 설정 항목 | 설명 |
|---|---|
| **테마 색상** | Agent 채팅 창의 기본 색상 변경 |
| **환영 메시지** | 처음 접속 시 표시할 인사말 설정 |
| **아바타** | Agent의 프로필 이미지 변경 |
| **위치** | 페이지 내 임베드 위치 및 크기 조정 |

<div class="info-box tip">
<strong>💡 실무 팁</strong>
웹 채널은 인증 없이도 접근 가능한 <strong>공개 모드</strong>와 Entra ID 인증이 필요한 <strong>인증 모드</strong>로 구분됩니다. 사내 정보를 다루는 Agent는 반드시 인증 모드를 사용하세요.
</div>

### 기타 배포 채널

Teams와 웹 외에도 다양한 채널을 지원합니다.

| 채널 | 특징 |
|---|---|
| **Microsoft 365 Copilot** | M365 Copilot 앱 내에서 Agent를 플러그인으로 연동 |
| **Facebook Messenger** | B2C 고객 대응 시나리오 |
| **Slack** | Slack 워크스페이스 통합 |
| **모바일 앱** | Direct Line API를 통한 커스텀 모바일 앱 연동 |

---

## 사용자/조직별 사용 범위 관리

Agent를 배포한 후, **누가 이 Agent를 사용할 수 있는지** 관리하는 것이 중요합니다.

### 공유 설정

Copilot Studio에서 Agent를 공유하는 방법은 크게 두 가지입니다.

**1. Agent 수준 공유 (편집 권한)**

| 대상 | 역할 | 설명 |
|---|---|---|
| **공동 작성자(Co-author)** | Maker | Agent를 편집하고 게시할 수 있음 |
| **뷰어(Viewer)** | Read-only | Agent 설정을 볼 수 있으나 편집 불가 |

**2. 채널 수준 공유 (사용 권한)**

| 범위 | 설정 방법 |
|---|---|
| **특정 사용자** | Teams에서 1:1 채팅으로 Agent 링크 공유 |
| **특정 팀/그룹** | Teams 앱으로 설치 후 해당 팀에 배포 |
| **전체 조직** | Teams Admin Center에서 조직 전체에 배포 |

### 환경(Environment)별 관리

Power Platform 환경을 활용하면 Agent의 사용 범위를 체계적으로 관리할 수 있습니다.

| 환경 유형 | 용도 | 접근 범위 |
|---|---|---|
| **개발(Dev)** | Agent 개발 및 테스트 | 개발팀만 |
| **테스트(Test/UAT)** | 사용자 인수 테스트 | 개발팀 + 현업 검증자 |
| **운영(Production)** | 실제 서비스 환경 | 전체 사용자 |

<div class="info-box warning">
<strong>⚠️ 주의</strong>
Agent에 연결된 Knowledge(SharePoint 등)는 <strong>Entra ID 기반 권한</strong>을 따릅니다. Agent에 접근할 수 있더라도, Knowledge 소스에 대한 접근 권한이 없는 사용자에게는 해당 정보가 응답에 포함되지 않습니다. 이를 고려하여 적절한 권한 설계가 필요합니다.
</div>
