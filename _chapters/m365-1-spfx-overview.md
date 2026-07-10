---
layout: chapter
date: 2026-07-10
title: "SharePoint Framework(SPFx) 개요와 아키텍처"
short_title: "SPFx 개요·아키텍처"
description: "SPFx가 무엇이고 언제 쓰며, 어떤 아키텍처로 동작하는지 — 클라이언트 사이드 실행·자동 SSO·데이터 호출·과금까지 실무 관점에서 정리합니다."
order: 1
category: m365
tags: ["SPFx", "SharePoint"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — SPFx는 SharePoint(+Teams+Viva)를 **클라이언트 사이드에서 확장**하는 Microsoft 공식 웹 파트/페이지 개발 프레임워크입니다. 서버 코드 없이, **로그인 사용자 컨텍스트 + 자동 SSO**로 리스트·Graph 데이터를 직접 호출합니다.
</div>

---

## 1. SharePoint Framework(SPFx)란?

**SharePoint Framework(SPFx)는 페이지 및 웹 파트(web part) 모델**로, SharePoint를 클라이언트 사이드에서 확장·커스터마이즈하기 위한 Microsoft 공식 개발 프레임워크입니다.

- 표준 웹 기술(TypeScript, JavaScript, HTML, CSS)과 도구(Node, npm, Yeoman, Heft)로 SharePoint를 확장합니다.
- **SharePoint Add-in 모델의 대체 기술**이자 현재 Microsoft가 권장하는 확장 모델입니다.
- SharePoint Online뿐 아니라 **Microsoft Teams, Viva Connections**까지 동일 컴포넌트로 확장 가능합니다.

### 핵심 특징
- 브라우저에서 **현재 사용자 컨텍스트**로 실행되며, iframe 없이 JavaScript가 페이지 DOM에 직접 렌더링됩니다.
- **프레임워크 비종속(framework-agnostic)** — React, Angular, Vue 등 사용 가능(React가 사실상 표준).
- **자동 SSO(Single Sign-On)** — 별도 사용자 동의 없이 Microsoft 365 전반에서 자동 인증.
- **자동 호스팅** — 컴포넌트를 SharePoint에 안전하게 자동 호스팅. 별도 서버/인프라 불필요.

---

## 2. 언제 사용하는가?

| 상황 | SPFx 활용 |
|------|-----------|
| 모던/클래식 페이지에 커스텀 UI가 필요할 때 | **Web Part** 개발 |
| 사이트 헤더/푸터, 리스트 뷰 등 페이지 요소 확장 | **Extension**(확장) |
| Microsoft Graph로 M365 데이터를 끌어와 콘텐츠 앱 구성 | Content-driven App |
| Microsoft Teams 탭·개인 앱으로 재사용 | 동일 SPFx 웹 파트 배포 |
| Viva Connections 대시보드 카드 구현 | **Adaptive Card Extension(ACE)** |

**요약:** "코드 없는 설정으로는 부족하고, 표준 기능을 넘는 맞춤형 UI/로직이 필요하며, 그 결과물을 SharePoint·Teams·Viva에 재사용하고 싶을 때" 사용합니다.

---

## 3. 아키텍처

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-1-01.png' | relative_url }}" alt="SPFx 아키텍처 다이어그램">
  <figcaption>SPFx 실행·인증·배포 아키텍처 — 클라이언트 사이드 실행, 자동 SSO, App Catalog 배포</figcaption>
</figure>

### 아키텍처 핵심 포인트
- **완전한 클라이언트 사이드 실행**: 서버 코드 없음. 컴포넌트 JS가 페이지에 직접 임베드되어 브라우저에서 실행됩니다.
- **컨텍스트 & 인증**: 프레임워크가 제공하는 `HttpClient`/`SPHttpClient`/`MSGraphClientV3`가 호출 시 인증을 자동 처리 → **자동 SSO**.
- **자동 호스팅 & CDN**: 빌드된 자산은 SharePoint(또는 Office 365 CDN)에 자동 호스팅되어 별도 웹서버 비용이 없습니다.
- **패키징·배포 파이프라인**: 소스 → `bundle`/`package-solution` → **.sppkg** → **App Catalog** 업로드 → 관리자 승인 → 사이트 배포.

<div class="info-box note" markdown="1">

**왜 서버가 없어도 리스트를 읽나?** 웹 파트는 **이미 로그인한 사용자의 신분(OAuth 토큰)** 을 그대로 물고 실행됩니다. 그래서 별도 인증 서버 없이 그 사용자 권한으로 SharePoint/Graph를 직접 호출합니다.
</div>

---

## 4. 데이터 호출 — Graph는 "필수"가 아니다

데이터를 끌어오는 방법은 **데이터가 어디에 있느냐**로 갈립니다. Microsoft Graph는 기본값이 아닙니다.

| 데이터 위치 | 쓰는 방법 | 관리자 API 승인 |
|-------------|-----------|-----------------|
| **같은 사이트**의 리스트 | **SharePoint REST** (`SPHttpClient` 또는 **PnPjs**) | 불필요 |
| 다른 사이트·Teams·사용자·메일 등 M365 전반 | **Microsoft Graph** (`MSGraphClient`) | **필요** |
| 외부 시스템/커스텀 백엔드 | `HttpClient` / AAD-secured API | 경우에 따라 |

같은 사이트 리스트라면 **PnPjs** 한 블록이면 충분합니다:

```typescript
const sp = spfi().using(SPFx(context));
const items = await sp.web.lists.getByTitle("Project Status").items
  .select("Title", "Owner", "PStatus", "Progress").top(500)();
```

> 한 줄 결론: **사이트 안 리스트 → SharePoint REST(PnPjs), 사이트 밖 M365 데이터 → Graph.**

---

## 5. 라이선스·과금 (개발 관점)

- **SPFx 자체·개발도구(Node/npm/Yeoman/VS Code/Heft)는 전부 무료.**
- 단 **SharePoint Online(M365 구독)은 전제 조건**. (개발/테스트는 M365 개발자 프로그램 테넌트 무료)
- 외부 Azure 백엔드·유료 API·프리미엄 라이선스를 얹으면 **그것만 별도 과금**.

> "SPFx = 무료, SharePoint/M365 구독 = 필요, 외부에 얹은 리소스 = 그것만 별도 과금."

---

## 참고 링크

- [SharePoint Framework 개요](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [개발 환경 구성](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)
- [PnPjs 라이브러리](https://pnp.github.io/pnpjs/)
- 다음 글 → **실전: 리스트 → 대시보드 앱 → 페이지 삽입**
