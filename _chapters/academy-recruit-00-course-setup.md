---
layout: "chapter"
date: 2026-08-06
title: "미션 00: 과정 준비"
short_title: "과정 준비"
description: "개발 환경, Copilot Studio 체험판, SharePoint 사이트를 준비해 Recruit 과정을 시작합니다."
order: 0
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/00-course-setup/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-06"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/00-course-setup/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 00: Course Setup](https://microsoft.github.io/agent-academy/recruit/00-course-setup/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

## 미션 브리핑

환영합니다, Recruit. 첫 AI 에이전트를 만들기 전에 먼저 **현장에서 바로 사용할 수 있는 개발 환경**을 갖춰야 합니다.

이 브리핑에서는 Microsoft 365 생태계에서 성공적으로 작업하는 데 필요한 시스템, 접근 자격 증명, 설정 단계를 안내합니다.

<div class="info-box note" markdown="1">
**중요 — 이 미션은 클래식 Copilot Studio UI를 사용합니다**<br>
Microsoft Copilot Studio에는 새 사용자 환경(UI)이 순차적으로 배포되고 있습니다. 이 미션의 스크린샷과 단계는 **클래식 환경**을 기준으로 합니다. 화면이 다르게 보이면 계속하기 전에 오른쪽 위에서 **New Experience**를 끄세요.
</div>

## 목표

이 미션에서 배울 내용은 다음과 같습니다.

1. Microsoft 365 계정을 얻는 방법
1. Microsoft Copilot Studio 접근 권한을 얻는 방법
1. 운영 환경 게시에 Microsoft 365 Copilot 라이선스가 필요한 시점
1. Copilot Studio용 개발자 환경을 만드는 방법
1. 이후 미션에서 데이터 원본으로 사용할 SharePoint 사이트를 만드는 방법

<div class="info-box note" markdown="1">
**중요**  
**이미 Microsoft 365, Power Platform, Copilot Studio에 접근할 수 있나요?**<br>
아래 1~4단계는 **새 체험 환경을 처음부터 만드는 절차**입니다. 이미 Power Platform과 Copilot Studio에 접근할 수 있는 Microsoft 365 비즈니스 테넌트가 있다면 **[5단계: 새 SharePoint 사이트 만들기](#5단계-새-sharepoint-사이트-만들기)**로 바로 건너뛰어도 됩니다. 1~4단계는 이러한 기능을 시험하기 위한 전용 체험 환경을 따로 구성하려는 경우에만 필요합니다.
</div>

## 사전 준비

시작하기 전에 다음을 확인하세요.

1. **회사 또는 학교 이메일 주소**(`@outlook.com`, `@gmail.com` 같은 개인 메일은 지원되지 않음)
1. 인터넷 연결과 최신 브라우저(권장: Edge, Chrome, Firefox)
1. Microsoft 365 기본 사용 경험(예: Office 앱 또는 Teams 로그인)
1. (선택) 유료 라이선스를 구매할 계획이 있다면 신용카드 또는 결제 수단

## 체험 환경 설정(1~4단계)

## 1단계: Microsoft 365 계정 준비

Copilot Studio는 Microsoft 365 안에 있으므로 접근하려면 Microsoft 365 계정이 필요합니다. 기존 계정이 있다면 사용할 수 있고, 없다면 아래 단계에 따라 적절한 라이선스를 준비하세요.

**유료 Microsoft 365 Business 구독 준비:**

1. [Microsoft 365 Business Plans and Pricing](https://www.microsoft.com/microsoft-365/business/microsoft-365-plans-and-pricing) 페이지로 이동합니다.
1. Microsoft 365 Business Basic 플랜을 선택한 다음 **Try for free**를 선택합니다. 안내 양식에 따라 구독, 계정, 결제 정보를 입력합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/m365-freetrial.png' | relative_url }}" alt="Microsoft 365 Business Basic 체험판 등록 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Microsoft 365 Business Basic 체험판 등록 페이지</figcaption>
</figure>

1. 설정이 완료되면 새 계정으로 로그인합니다.

<div class="info-box note" markdown="1">
**팁**  
에이전트를 Microsoft 365 Copilot Chat에 게시하거나 조직 데이터(SharePoint, OneDrive, Dataverse)에 연결하려면 Microsoft 365 Copilot 라이선스가 필요합니다. 이 추가 라이선스에 대한 자세한 내용은 [Microsoft 365 Copilot 플랜 페이지](https://www.microsoft.com/microsoft-365/copilot#plans)에서 확인하세요.
</div>

## 2단계: Copilot Studio 체험판 시작

Microsoft 365 테넌트를 준비했다면 이제 Copilot Studio 접근 권한을 얻어야 합니다. 다음 단계에 따라 30일 무료 체험판을 시작할 수 있습니다.

1. [Copilot Studio 체험판 등록 페이지](https://aka.ms/TryCopilotStudio)로 이동합니다.
1. 앞 단계에서 구성한 새 계정의 이메일 주소를 입력하고 **Next**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/mcs-trial-screen.png' | relative_url }}" alt="Copilot Studio 무료 체험판 시작 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio 무료 체험판 시작 화면</figcaption>
</figure>

1. Copilot Studio가 계정을 인식했는지 확인한 다음 **Sign in**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/mcs-trial-signin.png' | relative_url }}" alt="Copilot Studio용 Microsoft 계정 로그인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio용 Microsoft 계정 로그인</figcaption>
</figure>

1. **Start free trial**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/mcs-start-trial.png' | relative_url }}" alt="Copilot Studio 무료 체험 시작 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio 무료 체험 시작 페이지</figcaption>
</figure>

<div class="info-box note" markdown="1">
**체험판 참고 사항**

1. 무료 체험판에서도 **Copilot Studio의 전체 기능**을 사용할 수 있습니다.
1. 체험판 만료가 다가오면 이메일 알림을 받습니다. 30일 단위로 연장할 수 있으며, 최대 90일의 에이전트 런타임을 확보할 수 있습니다.
1. 테넌트 관리자가 셀프 서비스 가입을 비활성화했다면 오류가 표시됩니다. 이 경우 Microsoft 365 관리자에게 다시 활성화해 달라고 요청하세요.
</div>

## 3단계: 새 개발자 환경 만들기

### Power Apps Developer Plan 등록

1단계에서 사용한 동일한 Microsoft 365 테넌트로 Power Apps Developer Plan에 등록하면, Copilot Studio로 빌드하고 테스트할 무료 개발 환경을 만들 수 있습니다.

1. [Power Apps Developer Plan 웹 사이트](https://aka.ms/PowerAppsDevPlan)에서 등록합니다.

   - 이메일 주소를 입력합니다.
   - 체크박스를 선택합니다.
   - **Start free**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/0.3_01_SignUp.png' | relative_url }}" alt="Power Apps Developer Plan 등록 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Power Apps Developer Plan 등록 화면</figcaption>
</figure>

1. Developer Plan 등록이 끝나면 [Power Apps](https://make.powerapps.com/)로 리디렉션됩니다. 환경 이름은 사용자 이름을 기반으로 하며, 예를 들어 **Adele Vance's environment**처럼 표시됩니다. 같은 이름의 환경이 이미 있다면 새 개발자 환경은 **Adele Vance's (1)** 환경처럼 이름이 지정됩니다.

   실습을 완료할 때 Copilot Studio에서 이 개발자 환경을 사용합니다.

<div class="info-box note" markdown="1">
**참고**  
기존 Microsoft 365 계정을 사용하면서 1단계에서 새 계정을 만들지 않은 경우(예: 회사 조직의 본인 계정 사용), 테넌트/환경을 관리하는 IT 관리자 또는 이에 준하는 팀이 등록 절차를 꺼 두었을 수 있습니다. 이 경우 관리자에게 문의하거나 1단계에 따라 테스트 테넌트를 만드세요.

조직의 기존 환경을 사용할 때는 해당 환경이 **관리형 환경(managed environment)** 이 아닌지 확인하세요. 관리형 환경의 제한 때문에 Power Automate 흐름을 에이전트 도구로 추가하는 기능 등이 제대로 동작하지 않을 수 있습니다.
</div>

## 4단계: Copilot Studio 체험판에서 게시 권한 활성화

최근 Copilot Studio 체험판이 변경되어 기본적으로 에이전트 게시가 허용되지 않습니다. 게시를 가능하게 하려면 Power Platform 관리 센터에서 자신을 Copilot Studio Authors 역할에 추가해야 합니다.

먼저 게시 권한을 부여할 사람들을 담을 보안 그룹이 필요합니다. 이 그룹을 Copilot Studio Authors 역할에 연결하게 됩니다.

1. [Microsoft 365 관리 센터](https://admin.cloud.microsoft)로 이동합니다.
1. **Teams & groups** 탭을 펼치고 **Active teams & groups**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-teams-groups.png' | relative_url }}" alt="관리 센터의 Teams 및 그룹" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>관리 센터의 Teams 및 그룹</figcaption>
</figure>

1. **Security groups** 탭을 선택한 다음 **Add a security group**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-securitygroup-tab.png' | relative_url }}" alt="관리 센터의 보안 그룹 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>관리 센터의 보안 그룹 탭</figcaption>
</figure>

1. 보안 그룹 이름을 **AgentCreators**처럼 입력하고 **Next** 버튼을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-securitygroup-name.png' | relative_url }}" alt="보안 그룹 이름 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>보안 그룹 이름 입력</figcaption>
</figure>

1. 이름을 확인한 뒤 **Create group**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-creategroup.png' | relative_url }}" alt="구성한 보안 그룹 만들기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>구성한 보안 그룹 만들기</figcaption>
</figure>

1. 목록에서 방금 만든 보안 그룹을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-selectgroup.png' | relative_url }}" alt="새로 만든 보안 그룹 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새로 만든 보안 그룹 선택</figcaption>
</figure>

1. **members** 탭을 선택하고 **view all and manage members**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-viewmembers.png' | relative_url }}" alt="보안 그룹 멤버 열기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>보안 그룹 멤버 열기</figcaption>
</figure>

1. **add members**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-addmember.png' | relative_url }}" alt="보안 그룹에 멤버 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>보안 그룹에 멤버 추가</figcaption>
</figure>

1. 목록에서 자신의 이름을 선택한 뒤 **Add**를 선택하고, 다시 한 번 **Add**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-selectname.png' | relative_url }}" alt="그룹 멤버로 본인 계정 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>그룹 멤버로 본인 계정 선택</figcaption>
</figure>

1. [Power Platform 관리 센터](https://admin.powerplatform.com)로 이동합니다.
1. **manage** 탭을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-admin-managetab.png' | relative_url }}" alt="Power Platform 관리 센터의 manage 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Power Platform 관리 센터의 manage 탭</figcaption>
</figure>

1. **tenant settings** 탭을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-admin-tenantsettings.png' | relative_url }}" alt="Power Platform 관리 센터의 tenant settings" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Power Platform 관리 센터의 tenant settings</figcaption>
</figure>

1. **Copilot Studio authors** 옵션을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-authors.png' | relative_url }}" alt="Copilot Studio authors 보안 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio authors 보안 설정</figcaption>
</figure>

1. **Copilot Studio authors** 설정에서 **Edit**(연필 아이콘)을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-pencil.png' | relative_url }}" alt="Copilot Studio authors 보안 설정 편집" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio authors 보안 설정 편집</figcaption>
</figure>

1. 목록에서 보안 그룹을 선택하고 **Done**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-securitygroup.png' | relative_url }}" alt="Copilot Studio authors에 사용할 보안 그룹 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio authors에 사용할 보안 그룹 선택</figcaption>
</figure>

1. 보안 그룹이 표시되는지 확인한 뒤 **Save**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-save.png' | relative_url }}" alt="Copilot Studio authors 보안 설정 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio authors 보안 설정 저장</figcaption>
</figure>

## 모두에게 필요한 설정

체험 환경을 쓰든 기존 환경을 쓰든, 아래 단계는 모두에게 필요합니다.

## 5단계: 새 SharePoint 사이트 만들기

새 SharePoint 사이트를 만들어야 합니다. 이 사이트는 이후 [미션 06]({{ '/chapters/academy-recruit-06-create-agent-from-conversation/' | relative_url }})에서 SharePoint 지식 원본을 추가할 때 사용됩니다.

1. [Power Apps](https://make.powerapps.com/) 또는 [Microsoft 365 관리 센터](https://admin.cloud.microsoft)에서 **App launcher**(격자 아이콘)를 선택해 앱 메뉴를 연 다음 **SharePoint**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-select-sharepoint-in-power-apps.png' | relative_url }}" alt="Power Apps에서 SharePoint 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Power Apps에서 SharePoint 선택</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-select-sharepoint-in-microsoft-365-admin-center.png' | relative_url }}" alt="Microsoft 365 관리 센터에서 SharePoint 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Microsoft 365 관리 센터에서 SharePoint 선택</figcaption>
</figure>

1. SharePoint가 로드되면 왼쪽 탐색 메뉴에서 **Build**를 선택한 다음, 새 SharePoint 사이트를 만들기 위해 **Site**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-create-a-new-sharepoint-site.png' | relative_url }}" alt="새 SharePoint 사이트 만들기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새 SharePoint 사이트 만들기</figcaption>
</figure>

1. 사이트 생성을 안내하는 대화상자가 나타납니다. **Team site** 옵션 아래에서 **IT help desk**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-select-it-help-desk-site-template.png' | relative_url }}" alt="IT help desk 사이트 템플릿 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>IT help desk 사이트 템플릿 선택</figcaption>
</figure>

1. IT help desk 템플릿으로 새 SharePoint 사이트를 만들기 위해 **Use template**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-use-the-it-help-desk-template.png' | relative_url }}" alt="IT help desk 템플릿 사용" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>IT help desk 템플릿 사용</figcaption>
</figure>

1. 사이트 정보를 입력합니다. 예시는 다음과 같습니다.

   | 필드 | 값 |
   | --- | --- |
   | Site name | Contoso IT |
   | Site description | Copilot Studio Agent Academy |
   | Site address | ContosoIT |

   **Create site**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-configure-the-new-sharepoint-site-details.png' | relative_url }}" alt="새 SharePoint 사이트 세부 정보 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새 SharePoint 사이트 세부 정보 구성</figcaption>
</figure>

1. **Create site**를 선택한 뒤 SharePoint가 프로비저닝을 마칠 때까지 몇 초 걸릴 수 있습니다. 그동안 필요하면 **Add members** 필드에 이메일 주소를 입력해 사용자를 추가할 수 있습니다.

   사이트가 준비되었다는 확인 메시지가 보이면 **Go to site**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/00-open-the-newly-created-sharepoint-site.png' | relative_url }}" alt="새로 만든 SharePoint 사이트 열기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새로 만든 SharePoint 사이트 열기</figcaption>
</figure>

1. SharePoint 사이트 홈 페이지가 로드되면 SharePoint 사이트 URL을 **복사**합니다.
1. 이 템플릿은 여러 IT 정책에 대한 샘플 데이터가 들어 있는 페이지와 두 개의 샘플 목록(Tickets, Devices)을 제공합니다.

### Devices SharePoint 목록 사용

미션 07에서는 **Devices** 목록을 사용합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/devices-list.png' | relative_url }}" alt="Devices 목록" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Devices 목록</figcaption>
</figure>

### 새 열 추가

**Devices** 목록에서 열의 맨 끝으로 이동해 **+ Add column**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/add-column.png' | relative_url }}" alt="열 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>열 추가</figcaption>
</figure>

**hyperlink** 형식을 선택하고 열 이름에 **Image**를 입력한 다음 add를 선택합니다.

### Devices SharePoint 목록에 샘플 데이터 만들기

이 목록에는 최소 4개의 샘플 데이터 항목을 채우고, 추가 열 하나도 반드시 포함해야 합니다.<br>
샘플 데이터를 입력할 때는 다음 필드를 모두 채우세요.

- Device photo - 아래 기기 이미지를 사용
- Title
- Status
- Manufacturer
- Model
- Asset Type
- Color
- Serial Number
- Purchase Date
- Purchase Price
- Order #
- Image - 아래 링크 사용

필요한 기기 이미지는 원문에서 제공하는 아래 링크를 사용해 내려받을 수 있습니다.

| Device | URL |
| ------ | --- |
| Surface Laptop 13 | [Surface Laptop 13 image](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Laptop-13.png) |
| Surface Laptop 15 | [Surface Laptop 15 image](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Laptop-15.png) |
| Surface Pro | [Surface Pro image](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Pro-12.png) |
| Surface Studio | [Surface Studio image](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Studio.png) |

## 미션 완료

다음 작업을 성공적으로 마쳤습니다.

- **개발 환경**: Microsoft 365 개발 환경을 설정했습니다.
- **Copilot Studio 접근 권한**: Copilot Studio 체험판을 활성화했습니다.
- **SharePoint 사이트**: 에이전트 grounding에 사용할 사이트를 만들었습니다.
- **기기 데이터**: 이후 미션에서 사용할 Devices 목록을 채웠습니다.

다음으로 [미션 01: 에이전트 소개]({{ '/chapters/academy-recruit-01-introduction-to-agents/' | relative_url }})를 계속 진행하세요.

## 참고 자료

- [Power Apps Developer Plan](https://learn.microsoft.com/power-platform/developer/plan)
- [Copilot Studio licensing](https://learn.microsoft.com/microsoft-copilot-studio/requirements-licensing-subscriptions)
- [Create a team site in SharePoint](https://support.microsoft.com/office/create-a-team-site-in-sharepoint-ef10c1e7-15f3-42a3-98aa-b5972711777d)
