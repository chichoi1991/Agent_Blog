---
layout: chapter
date: 2026-08-05
title: "Lab WIQ01 — Work IQ 설정과 CLI 활용"
short_title: "WIQ01 · 설정과 CLI"
description: "테넌트에 Work IQ를 활성화하고, Copilot Credits 과금 프로필을 구성하고, Work IQ CLI를 설치해 질의하며, GitHub Copilot CLI와 Entra ID 앱 등록까지 연결합니다."
order: 4
category: m365
tags: ["Work IQ", "CLI", "GitHub Copilot", "Entra ID", "MCP"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — Work IQ 서비스 주체를 테넌트에 생성하고(1회), Copilot Credits 과금 프로필을 켠 뒤, `npm i -g @microsoft/workiq`로 CLI를 설치해 `workiq ask`로 질의합니다. 이어서 GitHub Copilot CLI에 Work IQ 플러그인을 붙이고, 프로그래밍 방식 소비를 위한 Entra ID 앱을 등록합니다.

**레벨** 200 · **소요 시간** 약 75분 · **배지** WorkIQ-Expert
</div>

> 이 글은 Microsoft 공식 [Copilot Developer Camp](https://microsoft.github.io/copilot-camp/pages/work-iq/01-work-iq-setup-and-cli/)의 **Lab WIQ01** 을 한국어로 옮긴 것입니다. 개념은 [Work IQ 소개]({{ '/chapters/m365-3-work-iq-overview/' | relative_url }})를 먼저 읽어보세요.

Work IQ는 에이전트와 개발자가 Microsoft 365의 조직 데이터를 **안전하게 접근하고 추론**할 수 있게 해주는 워크플레이스 인텔리전스 계층입니다. 이 랩에서는 테넌트에 Work IQ를 설정하고, CLI 소비를 살펴보고, GitHub Copilot CLI와 통합하고, 프로그래밍 방식 접근을 위해 애플리케이션을 등록합니다.

## 시나리오

여러분은 조직이 다양한 소비 패턴으로 Work IQ를 사용할 수 있게 하는 임무를 맡은 개발자입니다. 인프라를 설정하고, CLI 접근을 검증하고, GitHub Copilot CLI를 통합하고, 등록된 애플리케이션을 통한 프로그래밍 방식 소비를 준비해야 합니다.

## 랩 목표

이 랩을 마치면 다음을 할 수 있습니다.

- Microsoft 365 테넌트에서 Work IQ 활성화
- 사용량 기반 AI 서비스를 위한 **Copilot Credits 과금 프로필** 구성
- **Work IQ CLI** 설치 및 구성
- **GitHub Copilot CLI**를 Work IQ에 연결
- 안전한 API 소비를 위한 **Entra ID 애플리케이션 등록**

---

## 실습 1: 테넌트에서 Work IQ API 활성화

Work IQ API는 Entra ID의 **서비스 주체(service principal) 등록**을 통해 조직 전체 수준의 활성화가 필요합니다.

### 1단계: 사전 요건 준비

Work IQ를 활성화하기 전에 다음을 확인하세요.

- 테넌트에 **사용량 기반 과금 플랜**이 구성되어 있을 것 (아래 4단계 참고)
- Microsoft Entra 테넌트에서 **전역 관리자** 또는 **권한 있는 역할 관리자** 권한
- Work IQ 서비스 주체 ID를 알고 있을 것: `fdcc1f02-fc51-4226-8753-f668596af7f7`

### 2단계: Work IQ 서비스 주체 생성

가장 쉬운 방법은 Graph Explorer를 사용하는 것입니다.

1. [Graph Explorer](https://aka.ms/ge)로 이동해 관리자 계정으로 로그인
2. HTTP 메서드를 **POST**로 변경
3. URL을 `https://graph.microsoft.com/v1.0/servicePrincipals`로 설정
4. **Modify permissions**를 선택해 `Application.ReadWrite.All`에 동의 (관리자 1회 작업)
5. 다음 요청 본문을 붙여넣기

    ```json
    {
      "appId": "fdcc1f02-fc51-4226-8753-f668596af7f7"
    }
    ```

6. **Run query**를 클릭하고 **201 Created** 응답을 확인

**대안 (Azure CLI):**

```bash
az ad sp create --id fdcc1f02-fc51-4226-8753-f668596af7f7
```

### 3단계: 테넌트 준비 상태 확인

서비스 주체를 만들면 테넌트가 Work IQ를 사용할 준비가 됩니다. 다음을 기억하세요.

- 서비스 주체 생성은 **조직 전체 1회성** 작업입니다
- 이제 테넌트의 **모든 사용자**가 인증하고 Work IQ를 사용할 수 있습니다
- 과금은 구성된 플랜에 따라 **사용량 기반**으로 이루어집니다

### 4단계: Copilot Credits 과금 프로필 구성

<div class="info-box warning" markdown="1">

**중요** — **Microsoft 365 Copilot 라이선스**와 **활성 Copilot Credits 과금 프로필**은 Work IQ 및 Cowork 같은 사용량 기반 AI 서비스를 소비하기 위한 **필수 사전 요건**입니다. 과금 프로필이 있어야 종량제 또는 선불 크레딧 소비가 가능합니다.
</div>

Copilot Credits 과금 설정 절차는 다음과 같습니다.

1. [Microsoft 365 관리 센터](https://go.microsoft.com/fwlink/p/?linkid=2024339)로 이동
2. **Copilot → Cost Management** 이동
3. **Get Started**를 선택해 사용량 기반 과금 활성화
4. **Activate the default spending policy for your organization** 패널이 열립니다
5. **과금 방법 선택:**
    - **기존 Azure 구독 사용** (권장) — 드롭다운에서 구독 선택. 선불 Copilot Credits(P3)가 연결되어 있으면 레이블이 붙고 **먼저 소진**됩니다.
    - **새 Azure 구독 만들기** — Azure 구독이 없으면 시스템이 대신 만들어 줍니다(전역 관리자 필요).
    - **선불 크레딧 구매** — 할인 요율의 Copilot Pre-Purchase Plan(P3) 크레딧을 선택적으로 구매
6. **지출 한도 설정:**
    - 무제한 사용은 **Don't limit monthly spending**, 예산 통제는 **Limit monthly spending** 선택
    - 과도한 개인 소비를 막기 위해 **사용자별 월 한도**도 설정 가능
7. **알림 정의:** 메일 수신자와 알림 임계값 선택(한도 접근 시 주간 알림)
8. **검토 및 활성화:** 기본 정책은 테넌트 전체에 적용됩니다. **Activate**로 완료하고, **Manage Configuration**에서 Cost Management 대시보드를 확인합니다.

이제 조직은 Work IQ, Cowork 등 사용량 기반 AI 서비스를 소비할 준비가 되었습니다. 과금은 선택한 Azure 구독에 소비 기준으로 청구되며, 선불 크레딧이 있다면 먼저 적용됩니다.

**참고:** 상세한 비용 관리와 정책 커스터마이징은 [Copilot Credits 사용량 기반 과금 및 비용 관리](https://learn.microsoft.com/microsoft-365/copilot/usage-based-billing-overview-copilot-credits)를 확인하세요.

---

## 실습 2: Work IQ CLI 설치 및 사용

Work IQ CLI를 사용하면 터미널에서 바로 Microsoft 365 데이터를 질의할 수 있습니다.

### 1단계: Work IQ 설치

설치 방법 하나를 선택하세요.

**옵션 A: npm (전역 사용에 권장)**

```bash
npm install -g @microsoft/workiq
```

업데이트: `npm update -g @microsoft/workiq`

**옵션 B: GitHub Copilot CLI 경유**

```bash
copilot
/plugin marketplace add github/copilot-plugins
/plugin install workiq@copilot-plugins
```

**옵션 C: npx (설치 불필요)**

```bash
npx -y @microsoft/workiq
```

### 2단계: EULA 수락

첫 질의 전에 최종 사용자 사용권 계약에 동의해야 합니다. 터미널에서 다음을 실행하세요.

```bash
workiq accept-eula
```

**사용자당 1회성** 작업입니다.

### 3단계: 첫 질의 실행

개인 컨텍스트를 조회하는 첫 Work IQ CLI 질의를 실행해 봅니다.

```bash
workiq ask -q "Who am I? What is my role in the company?"
```

Work IQ가 Microsoft 365 테넌트에서 개인화된 정보를 반환하며, **권한을 인지한 안전한 데이터 접근**을 보여줍니다. 다른 질의도 시도해 보세요.

```bash
workiq ask -q "When is my next meeting?"
workiq ask -q "Summarize my recent emails from the engineering team"
```

### 4단계: 대화형 모드 사용

멀티턴 대화가 필요하면 대화형 모드를 사용합니다.

```bash
workiq ask
```

후속 질문을 이어서 던질 수 있는 대화형 프롬프트가 실행됩니다.

```text
> What meetings do I have this week?
> Tell me more about the one at 2 PM.
> Who is attending from the client side?
```

---

## 실습 3: GitHub Copilot과 통합

GitHub Copilot(CLI 또는 VS Code)에서 **MCP(Model Context Protocol)** 를 통해 Work IQ 데이터에 접근합니다.

### 1단계: GitHub Copilot CLI 준비

아직 설치하지 않았다면 [공식 문서](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli)를 참고해 GitHub Copilot CLI를 설치합니다.

Copilot CLI를 시작합니다.

```bash
copilot
```

로그인 요청이 뜨면 다음을 실행합니다.

```bash
/login
```

### 2단계: Work IQ 플러그인 마켓플레이스 추가

1회성 설정 명령을 실행합니다.

```bash
/plugin marketplace add microsoft/work-iq
```

Copilot CLI 인스턴스에 Work IQ 플러그인 마켓플레이스가 등록됩니다.

### 3단계: Work IQ 플러그인 설치

```bash
/plugin install workiq@work-iq
```

화면 안내를 따르면 브라우저 팝업에 **Authorization Successful**이 표시됩니다.

### 4단계: 통합 검증

Work IQ MCP 서버가 로드되었는지 확인합니다.

```bash
/mcp show
```

`workiq`가 엔드포인트 `https://workiq.svc.cloud.microsoft/mcp`와 함께 표시되어야 합니다. `ESC`를 눌러 빠져나옵니다.

사용 가능한 스킬도 확인합니다.

```bash
/skills info workiq
```

`workiq` 스킬의 상세 정보가 보여야 합니다.

### 5단계: Copilot으로 Microsoft 365 질의

이제 Copilot에게 Work IQ를 통해 Microsoft 365 데이터를 조회하도록 요청합니다.

```text
Summarize my upcoming meetings for today.
```

```text
Find recent messages about the Contoso account.
```

```text
Retrieve the latest email related to the quarterly business review.
```

Copilot CLI가 자동으로 Work IQ MCP 도구를 호출하며, 결과는 **Microsoft 365 권한과 테넌트 정책을 준수**합니다. Work IQ가 반환하는 출력 크기에 따라 데이터 처리나 다중 요청 실행에 대한 승인이 필요할 수 있습니다.

---

## 실습 4: API 소비용 Entra ID 애플리케이션 등록

자체 애플리케이션에서 REST·A2A·MCP로 Work IQ를 프로그래밍 방식으로 소비하려면 Entra ID에 소비자 애플리케이션을 등록해야 합니다.

### 1단계: 앱 등록 만들기

1. [Azure Portal](https://portal.azure.com/)로 이동
2. **Microsoft Entra ID → 앱 등록 → 새 등록** 이동
3. 이름을 `Work IQ Consumer`로 설정
4. **지원되는 계정 유형**에서 **이 조직 디렉터리의 계정만 (단일 테넌트)** 선택
5. **등록** 클릭

### 2단계: 클라이언트 비밀 구성

1. 새 앱 등록에서 **인증서 및 비밀 → 클라이언트 비밀 → 새 클라이언트 비밀** 이동
2. 설명 입력 (예: `Client Secret`)
3. 만료 기간 선택 (예: 12개월)
4. **추가** 클릭
5. 비밀 값을 **즉시 복사해 안전한 곳에 저장** — 페이지를 벗어나면 다시 볼 수 없습니다

### 3단계: API 권한 추가

1. **API 권한 → 권한 추가** 이동
2. **조직에서 사용하는 API** 탭 선택
3. `Work IQ` 검색
4. **위임된 권한** 선택
5. **WorkIQAgent.Ask** 권한 체크
6. **권한 추가** 클릭

### 4단계: 관리자 동의 부여

`WorkIQAgent.Ask` 권한은 관리자 동의가 필요합니다.

1. **API 권한** 페이지에서 **`<테넌트>`에 대한 관리자 동의 부여** 클릭
2. 대화 상자에서 **예**로 확인
3. **WorkIQAgent.Ask**에 초록색 체크 ✓ 가 표시되는지 확인

### 5단계: API 소비용 자격 증명 수집

앱 등록의 **개요** 페이지에서 다음 값을 수집합니다(REST·A2A·MCP 소비에 사용).

| 값 | 위치 |
|----|------|
| **TENANT_ID** | 디렉터리(테넌트) ID |
| **CLIENT_ID** | 애플리케이션(클라이언트) ID |
| **CLIENT_SECRET** | 앞서 저장한 비밀 값 |
| **AUTHORIZATION_URL** | OAuth 2.0 권한 부여 엔드포인트(v2) |
| **TOKEN_RETRIEVAL_URL** | OAuth 2.0 토큰 엔드포인트(v2) |

URL 두 개는 **개요** 페이지의 **엔드포인트(Endpoints)** 명령에서 확인할 수 있습니다.

<div class="info-box warning" markdown="1">

**보안 주의** — 클라이언트 비밀은 Azure Key Vault 등 안전한 구성 관리 시스템에 저장하세요. 소스 코드나 저장소에 커밋해서는 안 됩니다.
</div>

### 6단계: (선택) 리디렉션 URI 구성

OAuth 2.0 인증 코드 흐름을 사용할 계획이라면:

1. **인증 → 플랫폼 추가 → 웹** 이동
2. **리디렉션 URI**에 애플리케이션 콜백 URL 입력 (예: `https://myapp.example.com/callback`)
3. 추가로 `https://microsoft.github.io/copilot-camp/` 값도 콜백 URL로 등록
4. **구성** 클릭

---

## 🎉 완료

축하합니다! 다음을 성공적으로 마쳤습니다.

- ✅ Microsoft 365 테넌트에 Work IQ 활성화
- ✅ Work IQ CLI 설치 및 데이터 질의
- ✅ GitHub Copilot과 Work IQ 통합 (워크플레이스 컨텍스트)
- ✅ 프로그래밍 방식 접근을 위한 Entra ID 애플리케이션 등록

이제 다음을 할 준비가 되었습니다.

- Work IQ 데이터를 소비하는 **커스텀 에이전트 구축**
- Work IQ **REST API**를 사용한 웹 애플리케이션 개발
- **A2A 프로토콜**을 사용한 에이전트 간 워크플로 구현
- **Work IQ MCP** 통합으로 서드파티 도구 확장

👉 [Lab WIQ02 — A2A 프로토콜로 Work IQ 소비하기]({{ '/chapters/m365-5-work-iq-a2a/' | relative_url }})

---

## 📚 참고 자료

- 📖 [Copilot Credits 사용량 기반 과금 및 비용 관리](https://learn.microsoft.com/microsoft-365/copilot/usage-based-billing-overview-copilot-credits)
- 📖 [GitHub Copilot CLI 사용법](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- 🏕️ [원문: Copilot Developer Camp — Lab WIQ01](https://microsoft.github.io/copilot-camp/pages/work-iq/01-work-iq-setup-and-cli/)
