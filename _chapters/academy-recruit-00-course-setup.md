---
layout: "chapter"
date: 2026-03-16
title: "미션 00: 과정 준비"
short_title: "과정 준비"
description: "개발 환경, Copilot Studio 체험판, SharePoint 사이트를 준비해 Recruit 과정을 시작합니다."
order: 0
category: "academy-courses"
parent: "arecruit"
source_url: "https://microsoft.github.io/agent-academy/recruit/00-course-setup/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-03-16"
canonical_url: "https://microsoft.github.io/agent-academy/recruit/00-course-setup/"
image: "/assets/academy/recruit-00-course-setup/m365-freetrial.png"
---

<div class="info-box note translated-post" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🚨 Mission 00: Course Setup](https://microsoft.github.io/agent-academy/recruit/00-course-setup/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

## 미션 브리핑

Copilot Studio Agent 훈련의 첫 미션에 오신 것을 환영합니다.  
첫 AI 에이전트를 만들기 전에, 먼저 **실전에 바로 쓸 수 있는 개발 환경**을 갖춰야 합니다.

이 브리핑에서는 Microsoft 365 생태계에서 작업을 시작하는 데 필요한 시스템, 접근 권한, 설정 단계를 안내합니다.

<div class="info-box note translated-post" markdown="1">
**중요**  
이 수업은 클래식 Copilot Studio 환경을 기준으로 진행합니다. Microsoft Copilot Studio에는 새 작성 환경이 순차적으로 배포되고 있지만, 이 수업의 스크린샷과 단계는 **클래식 환경**을 사용합니다. 화면이 다르게 보이면 오른쪽 위의 **New Experience**를 끄고 진행하세요. 새 환경용 안내는 추후 제공될 예정이지만, 이 수업 자체는 클래식 환경에서도 그대로 유효합니다.
</div>

## 목표

이 미션에서 수행할 작업은 다음과 같습니다.

1. Microsoft 365 계정 준비  
2. Microsoft Copilot Studio 접근 권한 확보  
3. (선택) 운영 게시를 위한 Microsoft 365 Copilot 라이선스 준비  
4. Copilot Studio 빌드용 개발 환경 생성  
5. 이후 미션에서 데이터 원본으로 사용할 SharePoint 사이트 생성

<div class="info-box note" markdown="1">
**중요**  
이미 Microsoft 365, Power Platform, Copilot Studio에 접근할 수 있다면 아래 1~4단계는 **새 체험 환경을 처음부터 만드는 절차**이므로 건너뛰어도 됩니다. 기존 비즈니스 테넌트에서 Power Platform과 Copilot Studio를 사용할 수 있다면 5단계: 새 SharePoint 사이트 만들기부터 바로 시작하세요. 1~4단계는 전용 체험 환경을 따로 구성해 기능을 시험하려는 경우에만 필요합니다.
</div>

## 사전 준비

시작하기 전에 다음을 확인하세요.

1. **회사 또는 학교 이메일 주소** (`@outlook.com`, `@gmail.com` 같은 개인 메일은 지원되지 않음)
2. 인터넷 연결과 최신 브라우저(권장: Edge, Chrome, Firefox)
3. Microsoft 365 기본 사용 경험(예: Office 앱 또는 Teams 로그인)
4. (선택) 유료 라이선스를 구매할 계획이 있다면 신용카드 또는 결제 수단

## 체험 환경 설정 (1~4단계)

## 1단계: Microsoft 365 계정 준비

Copilot Studio는 Microsoft 365 안에서 동작하므로, 먼저 Microsoft 365 계정이 필요합니다. 기존 계정이 있다면 그대로 써도 되고, 없다면 아래 단계에 따라 적절한 라이선스를 준비하세요.

1. **유료 Microsoft 365 Business 구독 준비**  
   1. [Microsoft 365 Business Plans and Pricing](https://www.microsoft.com/microsoft-365/business/microsoft-365-plans-and-pricing) 페이지로 이동합니다.
   2. 가장 저렴하게 시작하려면 Microsoft 365 Business Basic 플랜을 선택하면 됩니다. `Try for free`를 누르고 안내 양식에 따라 구독, 계정, 결제 정보를 입력합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/m365-freetrial.png' | relative_url }}" alt="Microsoft 365 체험 구독 신청 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Microsoft 365 체험 구독 신청 화면</figcaption>
</figure>

   3. 새 계정을 만들었다면 로그인합니다.

<div class="info-box note" markdown="1">
**팁**  
에이전트를 Microsoft 365 Copilot Chat에 게시하거나 SharePoint, OneDrive, Dataverse 같은 조직 데이터를 연결하려면 Microsoft 365 Copilot 라이선스가 필요합니다. 이는 추가 라이선스이며, 자세한 내용은 [라이선스 안내 페이지](https://www.microsoft.com/microsoft-365/copilot#plans)에서 확인할 수 있습니다.
</div>

## 2단계: Copilot Studio 체험판 시작

Microsoft 365 테넌트를 준비했다면 이제 Copilot Studio 접근 권한을 확보해야 합니다. 다음 단계로 30일 무료 체험판을 시작할 수 있습니다.

1. [aka.ms/TryCopilotStudio](https://aka.ms/TryCopilotStudio)로 이동합니다.  
2. 앞 단계에서 만든 새 계정의 이메일 주소를 입력하고 `Next`를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/mcs-trial-screen.png' | relative_url }}" alt="Copilot Studio 체험판 시작 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio 체험판 시작 화면</figcaption>
</figure>

3. 계정이 인식되면 `Sign In`을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/mcs-trial-signin.png' | relative_url }}" alt="Copilot Studio 체험판 로그인 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio 체험판 로그인 화면</figcaption>
</figure>

4. `Start Free Trial`을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/mcs-start-trial.png' | relative_url }}" alt="Copilot Studio 무료 체험 시작 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Copilot Studio 무료 체험 시작 버튼</figcaption>
</figure>

<div class="info-box note" markdown="1">
**체험판 참고 사항**

1. 무료 체험판에서도 **Copilot Studio의 전체 기능**을 사용할 수 있습니다.
2. 체험판 만료가 다가오면 이메일 알림을 받습니다. 30일 단위로 연장할 수 있으며, 최대 90일의 에이전트 런타임을 확보할 수 있습니다.
3. 테넌트 관리자가 셀프 서비스 가입을 막아 두었다면 오류가 표시됩니다. 이 경우 Microsoft 365 관리자에게 해당 설정을 다시 활성화해 달라고 요청하세요.
</div>

## 3단계: 새 개발자 환경 만들기

### Power Apps Developer Plan 등록

1단계에서 사용한 동일한 Microsoft 365 테넌트로 Power Apps Developer Plan에 등록하면, Copilot Studio를 빌드하고 테스트할 무료 개발 환경을 만들 수 있습니다.

1. [Power Apps Developer Plan](https://aka.ms/PowerAppsDevPlan) 사이트에서 등록합니다.

   - 이메일 주소를 입력합니다.
   - 체크박스를 선택합니다.
   - **Start free**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/0.3_01_SignUp.png' | relative_url }}" alt="Power Apps Developer Plan 등록 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Power Apps Developer Plan 등록 화면</figcaption>
</figure>

2. Developer Plan 등록이 끝나면 [Power Apps](https://make.powerapps.com/)로 이동합니다. 환경 이름은 보통 사용자 이름을 기반으로 하며, 예를 들어 **Adele Vance's environment**처럼 표시됩니다. 같은 이름의 환경이 이미 있다면 **Adele Vance's (1)**처럼 번호가 붙습니다.

3. 이후 실습에서는 Copilot Studio에서 이 개발자 환경을 사용합니다.

<div class="info-box note" markdown="1">
**참고**  
기존 Microsoft 365 계정을 사용하면서 1단계에서 새 계정을 만들지 않았다면, 예를 들어 회사 계정을 쓰는 경우 테넌트/환경을 관리하는 IT 관리자 팀이 등록 절차를 막아 두었을 수 있습니다. 이 경우 관리자에게 문의하거나 1단계처럼 테스트 테넌트를 새로 만드세요.

조직의 기존 환경을 사용할 때는 해당 환경이 **관리형 환경(managed environment)** 이 아닌지 확인하세요. 관리형 환경의 제한 때문에 Power Automate 흐름을 에이전트 도구로 추가하는 기능 등이 제대로 동작하지 않을 수 있습니다.
</div>

## 4단계: Copilot Studio 체험판에서 게시 권한 활성화

최근 Copilot Studio 체험판은 기본 상태에서 에이전트 게시를 허용하지 않습니다. 게시를 가능하게 하려면 Power Platform 관리 센터에서 자신을 Copilot Studio Authors 역할에 추가해야 합니다.

먼저 게시 권한이 필요한 사용자를 담을 보안 그룹을 만들어야 합니다. 이 그룹을 Copilot Studio Authors 역할에 연결하게 됩니다.

1. [admin.cloud.microsoft](https://admin.cloud.microsoft)로 이동합니다.
2. **Teams & groups** 탭을 펼치고 **Active teams & groups**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-teams-groups.png' | relative_url }}" alt="Teams 및 그룹 메뉴" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Teams 및 그룹 메뉴</figcaption>
</figure>

3. **Security groups** 탭으로 이동한 뒤 **Add a security group**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-securitygroup-tab.png' | relative_url }}" alt="보안 그룹 탭과 추가 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>보안 그룹 탭과 추가 버튼</figcaption>
</figure>

4. 보안 그룹 이름을 **AgentCreators**처럼 입력하고 **Next**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-securitygroup-name.png' | relative_url }}" alt="보안 그룹 이름 입력 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>보안 그룹 이름 입력 화면</figcaption>
</figure>

5. 이름을 확인한 뒤 **Create group**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-creategroup.png' | relative_url }}" alt="보안 그룹 생성 확인 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>보안 그룹 생성 확인 화면</figcaption>
</figure>

6. 목록에서 방금 만든 보안 그룹을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-selectgroup.png' | relative_url }}" alt="생성한 보안 그룹 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>생성한 보안 그룹 선택</figcaption>
</figure>

7. **members** 탭을 선택하고 **view all and manage members**를 누릅니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-viewmembers.png' | relative_url }}" alt="멤버 관리 진입 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>멤버 관리 진입 화면</figcaption>
</figure>

8. **add members**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-addmember.png' | relative_url }}" alt="멤버 추가 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>멤버 추가 버튼</figcaption>
</figure>

9. 목록에서 자신의 이름을 선택한 뒤 **Add**를 누르고, 다시 한 번 **Add**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/admin-selectname.png' | relative_url }}" alt="보안 그룹에 사용자 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>보안 그룹에 사용자 추가</figcaption>
</figure>

10. **admin.powerplatform.com**으로 이동합니다.
11. **manage** 탭을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-admin-managetab.png' | relative_url }}" alt="Power Platform 관리 센터의 manage 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Power Platform 관리 센터의 manage 탭</figcaption>
</figure>

12. **tenant settings** 탭을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-admin-tenantsettings.png' | relative_url }}" alt="tenant settings 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>tenant settings 화면</figcaption>
</figure>

13. **copilot studio authors** 항목을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-authors.png' | relative_url }}" alt="copilot studio authors 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>copilot studio authors 설정</figcaption>
</figure>

14. **연필 아이콘**을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-pencil.png' | relative_url }}" alt="편집용 연필 아이콘" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>편집용 연필 아이콘</figcaption>
</figure>

15. 목록에서 방금 만든 보안 그룹을 선택하고 **Done**을 클릭합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-securitygroup.png' | relative_url }}" alt="보안 그룹 선택 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>보안 그룹 선택 화면</figcaption>
</figure>

16. 보안 그룹이 추가된 것을 확인한 뒤 **Save**를 클릭합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/pp-save.png' | relative_url }}" alt="저장 버튼으로 Authors 설정 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>저장 버튼으로 Authors 설정 저장</figcaption>
</figure>

## 모두에게 필요한 설정

체험 환경을 쓰든 기존 환경을 쓰든, 아래 단계는 모두에게 필요합니다.

## 5단계: 새 SharePoint 사이트 만들기

새 SharePoint 사이트는 이후 [Lesson 06](https://microsoft.github.io/agent-academy/recruit/06-create-agent-from-conversation/#62-add-an-internal-knowledge-source-using-a-sharepoint-site)에서 사용됩니다.

1. Microsoft Copilot Studio 왼쪽 위의 와플 아이콘을 눌러 메뉴를 열고 SharePoint를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/0.4_01_SelectSharePoint.png' | relative_url }}" alt="SharePoint 메뉴 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>SharePoint 메뉴 선택</figcaption>
</figure>

2. SharePoint가 열리면 **+ Create site**를 선택해 새 사이트를 만듭니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/0.4_02_CreateSite.png' | relative_url }}" alt="새 사이트 만들기 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>새 사이트 만들기 버튼</figcaption>
</figure>

3. 생성 대화상자가 뜨면 **Team site**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/0.4_03_SelectTeamOrCommunicationSite.png' | relative_url }}" alt="Team site 선택 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Team site 선택 화면</figcaption>
</figure>

4. 기본으로 Microsoft 템플릿 목록이 로드되면 아래로 스크롤해 **IT help desk** 템플릿을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/0.4_04_SelectITHelpDeskTemplate.png' | relative_url }}" alt="IT help desk 템플릿 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>IT help desk 템플릿 선택</figcaption>
</figure>

5. **Use template**를 선택해 IT help desk 템플릿으로 새 SharePoint 사이트를 만듭니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/0.4_05_SelectUseTemplate.png' | relative_url }}" alt="Use template 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Use template 버튼</figcaption>
</figure>

6. 사이트 정보를 입력합니다. 아래는 예시입니다.

   | 항목 | 값 |
   | --- | --- |
   | Site name | Contoso IT |
   | Site description | Copilot Studio for Beginners |
   | Site address | ContosoIT |

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/0.4_06_SiteDetails.png' | relative_url }}" alt="SharePoint 사이트 정보 입력 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>SharePoint 사이트 정보 입력 화면</figcaption>
</figure>

7. 마지막 단계에서 SharePoint 사이트 언어를 선택할 수 있습니다. 기본값은 **English**입니다. 언어를 **English**로 둔 채 **Create site**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/0.4_07_LanguageOtherOptions.png' | relative_url }}" alt="언어 및 추가 옵션 선택 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>언어 및 추가 옵션 선택 화면</figcaption>
</figure>

8. 몇 초 동안 SharePoint 사이트가 프로비저닝됩니다. 그 사이 **Add members** 필드에 이메일 주소를 입력해 다른 사용자를 사이트에 추가할 수 있습니다. 완료되면 **Finish**를 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/0.4_08_SelectFinish.png' | relative_url }}" alt="사이트 생성 완료 후 Finish 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>사이트 생성 완료 후 Finish 선택</figcaption>
</figure>

9. 이어서 SharePoint 사이트 홈이 열리면 사이트 URL을 **복사**해 둡니다.
10. 이 템플릿에는 다양한 IT 정책 예시 페이지와 샘플 목록 두 개(Tickets, Devices)가 함께 제공됩니다.

### Devices SharePoint 목록 사용

Mission 07에서는 **Devices** 목록을 사용합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/devices-list.png' | relative_url }}" alt="Devices SharePoint 목록" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Devices SharePoint 목록</figcaption>
</figure>

### 새 열 추가

목록의 맨 오른쪽으로 이동해 **+ Add column** 버튼을 선택합니다.

<figure class="screenshot">
  <img src="{{ '/assets/academy/recruit-00-course-setup/add-column.png' | relative_url }}" alt="Devices 목록의 Add column 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Devices 목록의 Add column 버튼</figcaption>
</figure>

열 형식으로 **hyperlink**를 선택하고, 열 이름에 **Image**를 입력한 뒤 추가합니다.

### Devices SharePoint 목록에 샘플 데이터 만들기

이 목록에는 최소 4개의 샘플 데이터를 채우고, 추가 열 하나도 반드시 포함해야 합니다.  
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

필요한 기기 이미지는 아래 GitHub raw 링크에서 직접 내려받을 수 있습니다.

| Device | URL |
| ------ | --- |
| Surface Laptop 13 | [https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Laptop-13.png](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Laptop-13.png) |
| Surface Laptop 15 | [https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Laptop-15.png](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Laptop-15.png) |
| Surface Pro | [https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Pro-12.png](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Pro-12.png) |
| Surface Studio | [https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Studio.png](https://raw.githubusercontent.com/microsoft/agent-academy/refs/heads/main/docs/recruit/00-course-setup/images/device-images/Surface-Studio.png) |

## 미션 완료

다음 작업을 성공적으로 마쳤습니다.

- Microsoft 365 개발 환경 준비
- Copilot Studio 체험판 활성화
- 에이전트 grounding용 SharePoint 사이트 생성
- 이후 미션에서 사용할 Devices 목록 데이터 채우기

이제 [미션 01: 에이전트 소개]({{ '/chapters/academy-recruit-01-introduction-to-agents/' | relative_url }})로 넘어가 Recruit 과정의 본격적인 학습을 시작하세요.
