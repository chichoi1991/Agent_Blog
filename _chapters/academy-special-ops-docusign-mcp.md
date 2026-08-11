---
layout: "chapter"
date: 2026-06-16
title: "Microsoft Copilot Studio + Docusign MCP"
short_title: "Docusign MCP"
description: "Docusign MCP Demo 서버를 Copilot Studio 에이전트에 연결하고 Workflow Builder 계약 자동화를 트리거하는 실전 랩입니다. 채용 계약서 워크플로우 전체를 자동화하는 방법을 다룹니다."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/docusign-mcp/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-10"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/docusign-mcp/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [📄 Microsoft Copilot Studio + Docusign MCP](https://microsoft.github.io/agent-academy/special-ops/docusign-mcp/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# 📄 Microsoft Copilot Studio + Docusign MCP

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/Academy-Docusign_Badge.png' | relative_url }}" alt="Docusign MCP Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Docusign MCP Badge</figcaption></figure>

에이전트 여러분, 이미 작동하는 것을 재사용하는 것이 목표입니다. Docusign MCP Demo 서버를 Copilot Studio 에이전트에 연결하고 기존 Workflow Builder 워크플로우를 트리거하세요. 에이전트는 입력을 수집하고, Workflow Builder는 계약 프로세스를 실행합니다.

## 🔎 목표

이 미션에서 배울 것:

- Docusign Web Forms, 문서 템플릿, Workflow Builder 워크플로우 만들기
- Docusign MCP Demo 도구를 에이전트에 추가하기
- 에이전트에서 Workflow Builder 워크플로우 호출하기
- 에이전트를 테스트할 때 워크플로우 시작 단계에 자연어로 입력 제공하기
- _보너스_: 첫 번째 Microsoft MCP 도구(Work IQ Calendar)를 추가해 멀티-MCP 기능 확장

## ❓ Docusign이란?

[Docusign](https://www.docusign.com)은 계약 실행 엔진입니다.

조직이 디지털로 계약을 생성, 전송, 서명, 관리할 수 있게 해 수동 작업과 종이 기반 작업을 줄입니다. 전자 서명을 넘어, Docusign은 생성부터 추적 및 저장까지 전체 계약 수명 주기를 지원하는 [Intelligent Agreement Management (IAM) 플랫폼](https://www.docusign.com/intelligent-agreement-management)입니다.

### 💼 왜 중요한가요?

계약은 비즈니스에 중요하지만 수동 처리는 지연과 불일관성을 유발합니다. Docusign은 계약 프로세스를 더 빠르고, 추적 가능하고, 확장 가능하게 만듭니다.

## 🏗️ Docusign Workflow Builder란?

Workflow Builder는 계약이 자동화된 워크플로우가 되는 곳입니다.

수동 조정 없이 데이터 수집에서 문서 생성과 서명까지 계약이 이동하는 방식을 정의합니다. 워크플로우를 한 번 설계하면 일관되게 실행됩니다.

### 💡 일반적인 사용 사례

- 직원 온보딩
- 영업 계약
- 구매 승인
- NDA 및 규정 준수 워크플로우

### ⚙️ Workflow Builder의 기능

- 다단계 워크플로우 구조화
- Web Forms를 통한 입력 수집
- 템플릿과 데이터로 계약 생성
- 올바른 순서로 참가자 간 문서 라우팅
- 서드파티 애플리케이션 및 서비스와 연결
- 워크플로우 진행 상황 가시성 제공

### 🧩 주요 Workflow Builder 기능

#### Identity Verification
계약 완료 전에 서명자 신원을 확인합니다.

#### Web Forms
계약 생성 전에 구조화된 브라우저 기반 입력을 수집합니다. 수집된 데이터가 문서를 자동으로 채울 수 있습니다.

#### Document Generation
수집된 데이터와 재사용 가능한 템플릿을 사용해 계약 및 문서를 자동으로 생성합니다.

#### eSignature
워크플로우에서 법적으로 인정되는 전자 서명을 활성화합니다.

#### App Center
Workflow Builder를 서드파티 앱 및 서비스에 연결합니다.

#### Workflow Templates
일반적인 시나리오를 위한 사전 빌드된 템플릿을 사용해 표준화된 계약 흐름을 빠르게 배포합니다.

#### Agreement Desk
팀 전반의 계약 준비, 검토, 협업을 한곳에 모읍니다.

### 🚀 에이전트와의 작동 방식

Copilot Studio 에이전트는 워크플로우를 _대체하지 않습니다_ — 트리거합니다. 계약 로직을 처음부터 다시 구축하는 것이 아닙니다. Docusign에서 이미 구축된 워크플로우를 재사용합니다. 에이전트는 자연어로 입력을 수집하고, Workflow Builder가 계약 프로세스를 처음부터 끝까지 실행합니다.

## 🛡️ 인증된 MCP 소개: Docusign MCP Demo

Docusign MCP Demo 서버는 Copilot Studio에서 지원되며 Microsoft의 커넥터 생태계에서 인증된 MCP 통합으로 게시됩니다.

이것이 미션에서 중요한 이유:

- **엔터프라이즈 신뢰 신호**: 인증된 MCP 서버는 광범위한 가용성 전에 Microsoft 검증 및 검토 단계를 거칩니다.
- **보안 및 규정 준수 정렬**: 인증에는 패키징 품질, 동작 검증, 보안/규정 준수 준비 상태 확인이 포함됩니다.
- **책임 있는 AI 기대**: 인증 검토에는 안전 평가가 포함되지만 테넌트에서의 안전한 사용은 여전히 구현 선택에 달려 있습니다.

실제로 이는 알 수 없는 엔드포인트에 연결하는 것이 아닙니다. 자연어를 통해 에이전트에 Docusign 기능을 노출할 수 있는 검토된 MCP 서버를 통합하는 것입니다.

### 🔐 이 미션의 보안 및 거버넌스 지침

기본적으로 안전한 것이 아니라 설계상 안전한 것으로 취급하세요:

- 올바른 계정과 커넥터 쌍을 사용하세요:
  - Docusign 개발자 계정(데모/샌드박스 계정이라고도 함)과 Docusign MCP Demo
  - Docusign 프로덕션 계정과 Docusign MCP
- 가능한 한 OAuth와 최소 권한 계정을 사용하세요.
- 높은 영향을 미치는 작업에는 사람이 루프에 있도록 유지하세요.
- 프로덕션 시나리오로 확장하기 전에 프롬프트와 출력을 검증하세요.

<div class="info-box note" markdown="1">
**경고**: 인증이 조직의 안전한 사용 구성 및 거버넌스 책임을 제거하지 않습니다. 여전히 최소 권한을 적용하고, 사용을 모니터링하고, 높은 영향의 워크플로우에서 사람의 검토를 유지해야 합니다.
</div>

### ✍️ Docusign MCP Demo 커넥터 참고사항

Docusign MCP Demo 커넥터는 샌드박스 테스트용입니다. Docusign MCP 프로덕션 커넥터와 별개이며 워크플로우는 Demo와 Production 환경 간에 자동으로 마이그레이션되지 않습니다.

이 Special Ops 랩의 경우, 이것이 정확히 원하는 것입니다: 프로덕션 롤아웃 전에 프롬프트 기반 계약 워크플로우를 테스트할 수 있는 안전한 개발 공간.

### 📚 Docusign MCP 및 Microsoft MCP 서버 인증에 대해 더 알아보기

- [Microsoft MCP 서버 인증](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-certification)
- [Docusign MCP Demo 커넥터 (Microsoft Learn)](https://learn.microsoft.com/en-us/connectors/docusignmcpdemo/)
- [Docusign MCP 개요](https://support.docusign.com/s/document-item?language=en_US&bundleId=ug3906200f-95c6-4a6b-90b1-f928c85961c6&topicId=con1438e5dd-ae84-435f-8b2e-028117782a6d.html&_LANG=enus)

## 🧪 Docusign MCP 랩

이 Special Ops 미션에서는 두 가지 실용적인 사용 사례를 진행합니다:

- 첫째, Docusign에서 완전한 채용 계약 흐름을 자동화합니다.
- 둘째, 선택적으로 두 번째 MCP 도구를 사용해 캘린더 후속 조치로 흐름을 확장합니다.

### ✨ 사용 사례 시나리오

#### 사용 사례 1: 핵심 채용 워크플로우 (Labs 1.1~1.5)

**채용 담당자로서**,

**고용 계약서와 직원 제안서를 디지털로 전달하고 싶습니다**,

**그래서** 후보자가 서명을 빠르게 검토하고 완료할 수 있도록.

이 시나리오를 완료하려면:

- 1.1 Docusign Web Form 생성
- 1.2 문서 템플릿 생성
- 1.3 Docusign Workflow Builder 워크플로우 생성
- 1.4 워크플로우 테스트
- 1.5 Microsoft Copilot Studio에서 맞춤형 에이전트 빌드, Docusign MCP Demo 연결, 워크플로우 트리거

**결과**: 에이전트가 입력을 수집하고 이미 구축된 Docusign Workflow Builder 워크플로우를 처음부터 끝까지 트리거합니다.

#### 사용 사례 2: 멀티-MCP 확장 (Lab 1.6)

Lab 1.6의 사용 사례:

**채용 담당자로서**,

**신입 직원 입사일 전에 준비 회의를 자동으로 예약하고 싶습니다**,

**그래서** 온보딩 작업을 완료하기 위한 전용 일정 시간이 생기도록.

### 🪾 솔루션 다이어그램

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/0.0_02_SolutionDiagram.png' | relative_url }}" alt="Copilot Studio 에이전트가 MCP를 통해 Docusign Workflow Builder를 트리거하고 Work IQ Calendar로 작업을 확장하는 솔루션 다이어그램" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>솔루션 아키텍처 다이어그램</figcaption></figure>

에이전트는 제어 레이어입니다.

- 사용자는 Copilot Studio 에이전트와 상호 작용하고, 에이전트는 입력을 수집해 MCP를 통해 Docusign Workflow Builder 워크플로우를 트리거합니다.
- Docusign이 계약 프로세스를 처음부터 끝까지 처리하며, Work IQ Calendar 같은 추가 도구가 지원 작업으로 흐름을 확장할 수 있습니다.

하나의 프롬프트. 여러 시스템. 조율된 실행.

### ✅ 사전 요구사항

#### Docusign

- 아직 없다면 무료 **Docusign 개발자 계정** 가입:
  - [https://developers.docusign.com](https://developers.docusign.com)으로 이동해 오른쪽 상단의 **Create Account**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/0.0_01_CreateDeveloperAccount.png' | relative_url }}" alt="Create Account 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Docusign 개발자 계정 생성</figcaption></figure>

#### Microsoft

- Copilot Studio 라이선스
- Copilot Studio 개발자 환경 접근
- 솔루션과 에이전트를 만들 수 있는 관리자 권한
- Documents 라이브러리에 새 폴더를 만들 수 있는 권한이 있는 SharePoint 사이트

<div class="info-box note" markdown="1">
**팁**: Copilot Studio 라이선스 설정 도움이 필요하면 [Recruit 코스 설정 랩](https://microsoft.github.io/agent-academy/recruit/00-course-setup/)을 참고하세요.
</div>

#### 두 개의 이메일 주소

이 랩을 완료하려면 두 가지 다른 이메일 주소가 필요합니다:

- 직원으로 사용할 이메일 주소
- 채용 관리자로 사용할 이메일 주소

## 🧪 1.1 Docusign Web Form 생성

<div class="info-box note" markdown="1">

**경고**: 이 Docusign 랩 연습을 완료하려면 Docusign 개발자 계정이 필요합니다. 위의 **사전 요구사항** 섹션의 단계를 따르세요.

</div>

Web Forms를 통해 조직은 안전한 브라우저 기반 양식을 통해 정보를 수집할 수 있으며, 이를 통해 계약 및 워크플로우에 데이터를 자동으로 입력할 수 있습니다. 수동 데이터 입력을 줄이고 정확도를 높이며, 온보딩·등록·승인·계약 생성 등의 프로세스를 간소화하는 데 도움이 됩니다.

**Web Forms**에 대해 더 알아보려면 다음 추가 학습 블록을 펼쳐보세요.

<div class="info-box note" markdown="1">

**Web Forms: 계약 전 데이터 수집**

🤔 **Web Forms란?**

Workflow Builder 내에서 Web Forms는 계약을 생성하거나 전송하기 전에 사용자 입력을 수집하는 방법을 제공합니다.

예시:

- 고객 신청 양식
- 직원 온보딩 설문지
- 공급업체 등록 양식
- 서비스 요청 양식
- 법무 또는 HR 팀을 위한 접수 양식

계약에 정보를 수동으로 입력하는 대신, 사용자가 양식에 직접 세부 정보를 입력합니다.

수집된 데이터는:

- 계약을 자동으로 채울 수 있음
- 워크플로우를 트리거할 수 있음
- 비즈니스 시스템에 정보를 제공할 수 있음
- 서명 프로세스를 시작할 수 있음

🌱 Web Forms 지원 항목:

- 텍스트 필드
- 드롭다운
- 체크박스
- 조건 논리
- 필수 입력
- 템플릿 필드 매핑

💡 **이를 통해 최소화할 수 있는 것**

- 수동 데이터 입력
- 복사/붙여넣기 오류
- 불완전한 제출로 인한 지연

</div>

1. Docusign 개발자 포털 홈 페이지에서 **Templates**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_01_Templates.png' | relative_url }}" alt="Templates 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Templates 선택</figcaption></figure>

1. 왼쪽 탐색 패널에서 **Start**를 선택합니다. **Web Forms**를 선택한 후 **Create Web Form**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_02_CreateWebForm.png' | relative_url }}" alt="Create Web Forms 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Form 생성</figcaption></figure>

1. Web Form 생성 방법을 묻습니다. **Start From Scratch**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_03_StartFromScratch.png' | relative_url }}" alt="Start from Scratch 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>처음부터 시작</figcaption></figure>

1. Web Form 이름을 입력합니다. 예:

    ```text
    Request for your contact information
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_04_NameWebForm.png' | relative_url }}" alt="Web Form 이름 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Form 이름 입력</figcaption></figure>

1. Web Form 디자이너가 나타납니다. 기본적으로 3페이지(Welcome page, Untitled page, Thank you page)가 있습니다.

    **Welcome page**에서 다음 필드를 업데이트합니다:

    **Page title**

    ```text
    👋🏻 Hey there!
    ```

    **Page subtitle**

    ```text
    As we kick-off the next stage in sending you an offer, we need some details from you.

    Please complete this form and shortly after you'll receive an Employment Agreement and Offer Letter.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_05_WelcomePageDetails.png' | relative_url }}" alt="Welcome page 세부 정보 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Welcome page 세부 정보</figcaption></figure>

1. **Untitled** 페이지를 선택하고 다음 필드를 업데이트합니다:

    **Page title**

    ```text
    Your name
    ```

    **Page subtitle**

    ```text
    Please provide us with your name
    ```

    **API reference name**

    ```text
    Step_CandidateName
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_06_YourNamePage.png' | relative_url }}" alt="Your Name 페이지 세부 정보 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Your Name 페이지</figcaption></figure>

1. 이 페이지에 필드를 추가합니다. 디자이너 중앙의 페이지 제목 섹션 아래의 **plus 아이콘**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_07_AddField.png' | relative_url }}" alt="필드 추가를 위한 plus 아이콘 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>필드 추가</figcaption></figure>

1. **Text Field**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_08_SelectTextField.png' | relative_url }}" alt="Text Field 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Text Field 선택</figcaption></figure>

1. 필드 속성이 표시됩니다. 다음 속성으로 업데이트합니다:

    | Field name    | Field description | Required field | API reference name    |
    |---------------|-------------------|----------------|-----------------------|
    | `First Name`  | `Your first name` | Yes            | `TextBox_FirstName`   |

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_09_FirstNameField.png' | relative_url }}" alt="필드 속성 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>First Name 필드 속성</figcaption></figure>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_10_FirstNameField.png' | relative_url }}" alt="필드 속성 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>First Name 필드 설정</figcaption></figure>

1. 같은 단계를 반복해 나머지 **Text Fields**를 추가합니다. **plus 아이콘**을 선택하고 다음 속성으로 새 **Text Fields**를 추가합니다:

    | Field name    | Field description  | Required field | API reference name   |
    |---------------|--------------------|----------------|----------------------|
    | `Middle Name` | `Your middle name` | No             | `TextBox_MiddleName` |
    | `Surname`     | `Your surname`     | Yes            | `TextBox_Surname`    |
    | `Full Name`   | `Your full name`   | Yes            | `TextBox_FullName`   |

    **Text Fields**를 추가한 후 왼쪽 패널의 **plus 아이콘**을 선택하고 **New Blank Page**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_12_AddNewBlankPage.png' | relative_url }}" alt="New Blank Page 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 빈 페이지 추가</figcaption></figure>

1. 새 페이지에 다음 필드를 업데이트합니다:

    **Page title**

    ```text
    Address
    ```

    **Page subtitle**

    ```text
    Please provide us with your physical address
    ```

    **API reference name**

    ```text
    Step_CandidateAddress
    ```

    같은 단계를 반복해 나머지 **Text Fields**를 추가합니다. **plus 아이콘**을 선택하고 다음 속성으로 새 **Text Fields**를 추가합니다:

    <div class="info-box note" markdown="1">

    **참고**: 아래 표는 일반적인 주소 형식을 보여줍니다. 조정할 수 있지만 나중 단계에서 필요하므로 변경 사항을 추적하세요. 이후 단계에서 문제를 방지하려면 다음 주소 형식을 사용하세요.

    </div>

    | Field name       | Field description | Required field | API reference name      |
    |------------------|-------------------|----------------|-------------------------|
    | `Address Line 1` | `Street Address`  | Yes            | `TextBox_AddressLine1`  |
    | `Address Line 2` | `Suburb/District` | Yes            | `TextBox_AddressLine2`  |
    | `City`           | `City`            | Yes            | `TextBox_City`          |
    | `Post Code`      | `Post Code`       | Yes            | `TextBox_PostCode`      |

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_13_AddressPage.png' | relative_url }}" alt="Address 페이지 세부 정보 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Address 페이지</figcaption></figure>

1. **Text Fields**를 추가한 후 왼쪽 패널에서 **Thank you page**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_14_FieldsAddedToAddressPage.png' | relative_url }}" alt="Thank you page 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Address 페이지 필드 추가 완료</figcaption></figure>

1. **Thank you page**에 다음 필드를 업데이트합니다:

    **Page title**

    ```text
    ✨ Thank you
    ```

    **Page subtitle**

    ```text
    We've received your form. Expect an email soon with documents to sign.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_15_ThankYouPageDetails.png' | relative_url }}" alt="Thank you page 세부 정보 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Thank you page 세부 정보</figcaption></figure>

1. Web Form 구성이 완료되었습니다. 최종 사용자 뷰를 보려면 **Preview**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_16_PreviewWebForm.png' | relative_url }}" alt="Preview 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Form 미리보기</figcaption></figure>

1. Web Form이 미리보기 모드로 활성화됩니다. 각 페이지에 필요한 정보를 입력할 수 있습니다. **Your Name page**에 이름을 입력하고 **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_17_CompleteYourNamePage.png' | relative_url }}" alt="Your Name 페이지 완성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>이름 페이지 완성</figcaption></figure>

1. 다음으로 완성할 페이지는 **Address page**입니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_18_AddressPage.png' | relative_url }}" alt="Web Form의 Address 페이지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Address 페이지</figcaption></figure>

1. **Address page**에 정보를 입력하고 **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_19_CompleteAddressPage.png' | relative_url }}" alt="Address 페이지 완성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>주소 페이지 완성</figcaption></figure>

1. 두 페이지에 입력한 정보 요약이 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_20_Review.png' | relative_url }}" alt="입력 정보 검토" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>입력 정보 검토</figcaption></figure>

1. 스크롤을 내리고 **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_21_NextPage.png' | relative_url }}" alt="Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Next 선택</figcaption></figure>

1. 다음으로 오류가 표시됩니다. Web Form이 미리보기 모드이기 때문에 정상입니다. **Create**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_22_Error.png' | relative_url }}" alt="Create 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>미리보기 모드 오류 (정상)</figcaption></figure>

1. 이제 Web Form을 활성화합니다. 디자이너 오른쪽 상단에서 **Activate**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_23_Activate.png' | relative_url }}" alt="Activate 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Form 활성화</figcaption></figure>

1. **Access setting** 필드가 있는 확인 모달이 나타납니다. 이후 랩에서 워크플로우 단계에 사용될 것이므로 **Public**으로 두고 **Activate**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_24_Activate.png' | relative_url }}" alt="Activate 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>활성화 확인</figcaption></figure>

1. Web Form이 성공적으로 활성화되었다는 확인 메시지가 나타납니다. **Go to Web Forms**를 선택합니다.

    <div class="info-box note" markdown="1">

    **팁**: **Go to Web Forms** 버튼이 보이지 않으면 Web Forms 페이지로 다시 이동하세요.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_25_GoToWebForms.png' | relative_url }}" alt="Go to Web Forms 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Forms로 이동</figcaption></figure>

1. Web Form이 **Active** 상태로 표시됩니다. Web Form을 성공적으로 빌드했습니다 👏🏻

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_26_ActiveWebForm.png' | relative_url }}" alt="Active 상태의 Web Form" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>활성 Web Form</figcaption></figure>

## 🧪 1.2 문서 템플릿 생성

문서 템플릿은 계약 전송을 위한 재사용 가능한 설정으로, 문서, 수신자 역할, 라우팅 순서, 메시지를 사전 정의할 수 있습니다. 매번 처음부터 시작하지 않고 일관된 계약 봉투를 빠르게 만들고 전송할 수 있습니다.

**Document Templates**에 대해 더 알아보려면 다음 추가 학습 블록을 펼쳐보세요.

<div class="info-box note" markdown="1">

**Document Templates 사용하기**

📄 Workflow Builder는 문서 템플릿과 긴밀하게 협력합니다.

템플릿을 통해 조직은 다음과 같이 자주 사용되는 계약을 표준화할 수 있습니다:

- NDA
- 고용 계약
- 구매 양식
- 고객 계약
- 승인 문서

📦 템플릿에 포함될 수 있는 것:

- 사전 구성된 문서
- 서명자 역할
- 서명 필드
- 승인 흐름
- 워크플로우 논리

즉, 팀은 매번 문서를 다시 만들 필요가 없습니다.

예시:

- 고객이 Web Form을 작성
- 해당 정보가 계약 템플릿을 자동으로 채움
- Workflow Builder가 승인을 위해 계약을 라우팅
- 문서가 전자 서명을 위해 전송
- 서명된 사본이 자동으로 저장

💡 이 모든 것이 최소한의 수동 개입으로 이루어질 수 있습니다.

</div>

이 랩 연습에서 두 가지 문서 템플릿을 만듭니다:

1. 고용 계약서
1. 직원 제안서

두 샘플 파일을 다운로드하세요. 이 두 문서 템플릿은 다음 랩 연습에서 Workflow Builder에 워크플로우를 만들 때 사용됩니다.

시작해 봅시다. ⤵️

1. **Templates**로 이동하고 왼쪽 메뉴 패널에서 **Document Templates**를 선택합니다. **Create**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_01_SelectDocumentTemplates.png' | relative_url }}" alt="새 문서 템플릿 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>문서 템플릿 생성</figcaption></figure>

1. 업로드할 파일을 선택할 수 있습니다. **Upload**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_02_SelectUpload.png' | relative_url }}" alt="Upload 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>파일 업로드</figcaption></figure>

1. **Sample Employment Agreement** 파일을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_03_SelectSampleEmploymentAgreement.png' | relative_url }}" alt="Sample Employment Agreement 파일 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>고용 계약서 샘플 선택</figcaption></figure>

1. **Name** 필드는 파일 이름으로 자동 채워집니다. **Agreement Type** 필드에서 **chevron 아이콘**을 선택하고 **Human Resources** 목록으로 스크롤해 **Offer Letter**를 선택합니다.

    <div class="info-box note" markdown="1">

    **팁**: **Offer Letter**를 입력하면 빠르게 찾을 수 있습니다.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_04_AgreementType.png' | relative_url }}" alt="Offer Letter 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>계약 유형 선택</figcaption></figure>

1. 다음으로 문서 템플릿의 역할을 정의합니다. **Fields** 왼쪽 패널에서 **Sender 1** 옆의 **chevron 아이콘**을 선택하고 **Edit recipients**를 선택해 서명자 역할을 업데이트합니다.

    <div class="info-box note" markdown="1">

    **템플릿에서 "역할"이란? 🤔**

    역할은 서명 또는 승인 등 문서에 대해 조치를 취할 개인을 나타내는 템플릿의 플레이스홀더입니다. 역할은 실제 수신자를 모르더라도 누가 참여하고 어떤 조치를 취하는지 정의합니다.

    🐦 **역할의 용도**

    - 계약에 참여하는 사람 정의
    - 여러 봉투에서 템플릿 재사용 가능
    - 최종 수신자를 모르는 상태에서 문서 및 필드 준비 가능

    템플릿을 사용할 때 실제 사람(이름과 이메일)을 각 사전 정의된 역할에 할당합니다.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_05_EditRecipients.png' | relative_url }}" alt="수신자 편집" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>수신자 편집</figcaption></figure>

1. **Signer 1** 역할 이름을 다음으로 변경합니다:

    ```text
    Hiring Manager
    ```

    새 수신자를 추가하고 역할 이름을 다음으로 지정합니다:

    ```text
    Employee
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_06_EditAndAddRecipients.png' | relative_url }}" alt="수신자 편집 및 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>수신자 역할 설정</figcaption></figure>

1. 다음으로 문서의 플레이스홀더를 필드로 교체합니다. **Sender** 역할로 전환하여 시작합니다.

    <div class="info-box note" markdown="1">

    **템플릿에서 "필드"란? 🤔**

    필드는 수신자가 서명하거나 정보를 입력하는 등 조치를 취할 수 있도록 문서에 추가되는 대화형 요소입니다.

    🐦 **필드의 용도**

    - 수신자 입력 수집 (예: 서명 또는 입력된 정보)
    - 특정 수신자나 역할에 조치 할당
    - 템플릿 설정 시 문서에 정보 미리 채우기

    요약: 필드는 서명 프로세스 중 수신자가 문서와 상호 작용하는 위치와 방법을 정의합니다.

    이 랩 연습에서 사용할 두 가지 필드 유형:

    - Standard Fields: 문서에 추가할 수 있는 기본 제공 필드 세트
    - Custom Fields: 표준 옵션으로 다루지 않는 특정 데이터를 캡처하기 위해 사용자 정의로 만든 필드

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_07_SelectSender.png' | relative_url }}" alt="Sender 역할 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Sender 역할로 필드 추가</figcaption></figure>

1. 첫 번째 플레이스홀더 `{EffectiveDate}`를 강조 표시하고 왼쪽 메뉴의 표준 필드 **Effective Date**를 선택합니다.

    <div class="info-box note" markdown="1">

    **경고**: 샘플 문서의 파란색 텍스트는 필드를 추가할 플레이스홀더를 쉽게 식별하기 위한 것입니다. 이는 학습 목적으로만 사용되며 실제 **프로덕션** 템플릿에는 색상 텍스트가 없습니다.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_08_EffectiveDate.png' | relative_url }}" alt="Effective Date 필드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Effective Date 필드 추가</figcaption></figure>

1. 선택하면 **Effective Date** 필드가 템플릿에 추가됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_09_EffectiveDateAdded.png' | relative_url }}" alt="Effective Date 추가됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Effective Date 필드 추가 완료</figcaption></figure>

1. 다음으로 사용자 정의 필드를 추가합니다. `{EmployeeFullName}` 플레이스홀더를 강조 표시하고 **Fields** 패널의 **+ 아이콘**을 선택한 후 **Field**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_10_AddedEmployeeFullNameCustomField.png' | relative_url }}" alt="Employee Full Name 사용자 정의 필드 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>커스텀 필드 추가</figcaption></figure>

1. 필드 속성 플라이아웃 패널에서 **Field Name**에 다음을 입력합니다:

    ```text
    Employee Full Name
    ```

    **Field Name**에 값을 입력하면 템플릿 디자이너가 동일한 이름의 기존 필드를 검색합니다. 결과가 없으면 입력한 값을 사용해 새 사용자 정의 필드를 만드는 옵션이 표시됩니다.

    Employee Full Name의 새 사용자 정의 필드를 만들기 위해 **plus 아이콘**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_11_CreateEmployeeFullNameCustomField.png' | relative_url }}" alt="Employee Full Name 새 사용자 정의 필드 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>커스텀 필드 생성</figcaption></figure>

1. 나머지 속성을 구성합니다. **Field Description**에 다음을 입력합니다:

    ```text
    The full name of the employee
    ```

    **Required Field** 옵션을 활성화합니다.

    기본적으로 **Field type**은 **Text**입니다. **Text**로 유지합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_12_ConfigureEmployeeFullNameCustomField.png' | relative_url }}" alt="Employee Full Name 필드 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>커스텀 필드 구성</figcaption></figure>

1. **Employee Full Name** 사용자 정의 필드를 **Save**합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_13_SaveEmployeeFullNameCustomField.png' | relative_url }}" alt="Employee Full Name 저장" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>커스텀 필드 저장</figcaption></figure>

1. 같은 단계를 반복해 나머지 사용자 정의 필드를 추가합니다. Sender 역할 플레이스홀더에 사용합니다.

    | Placeholder              | Field name             | Field description                      | Required field | Field Type         |
    |--------------------------|------------------------|----------------------------------------|----------------|--------------------|
    | **{EmployeePosition}**   | `Employee Position`    | `Position the employee is fulfilling`  | Yes            | Text               |
    | **{EmployeeStartDate}**  | `Start Date`           | `The start date of the employee`       | Yes            | Date               |
    | **{SalaryAmount}**       | `Salary`               | `The salary of the employee`           | Yes            | Text               |

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_14_CreateRemainingCustomFields.png' | relative_url }}" alt="나머지 사용자 정의 필드 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>나머지 커스텀 필드</figcaption></figure>

1. 다음으로 템플릿의 _**16. Signatures**_ 섹션에 **Employee Full Name** 필드를 추가합니다. `{EmployeeFullName}` 플레이스홀더를 강조 표시하고 **Fields** 왼쪽 패널에서 해당 필드를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_15_AddEmployeeFullNameField.png' | relative_url }}" alt="Employee Full Name 필드 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee Full Name 필드 추가</figcaption></figure>

1. 이제 **Hiring Manager** 역할로 전환해 이 수신자가 작성해야 하는 필드를 정의합니다. **Fields** 왼쪽 패널에서 **Sender** 옆의 **chevron 아이콘**을 선택하고 **Hiring Manager**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_16_SwitchToHiringManagerRole.png' | relative_url }}" alt="Hiring Manager 역할 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Hiring Manager 역할로 전환</figcaption></figure>

1. `{ManagerSignature}` 플레이스홀더를 강조 표시하고 **Fields** 왼쪽 패널에서 **Signature**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_17_AddSignatureField.png' | relative_url }}" alt="Manager Signature 플레이스홀더 서명 필드 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>서명 필드 추가</figcaption></figure>

1. **Signature** 필드가 추가됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_18_SignatureFieldAdded.png' | relative_url }}" alt="서명 필드 추가됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>서명 필드 추가 완료</figcaption></figure>

1. 같은 단계를 반복해 **Hiring Manager** 역할과 **Employee** 역할의 나머지 필드를 추가합니다.

    <div class="info-box note" markdown="1">

    **팁**: 🖱️ 역할 전환 잊지 마세요

    Fields 왼쪽 패널의 chevron 아이콘을 사용해 Employee 역할로 전환하세요.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_19_SwitchToEmployeeRole.png' | relative_url }}" alt="Employee 역할로 전환" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee 역할로 전환</figcaption></figure>

    </div>

    | Role            | Placeholder                          | Field       |
    |-----------------|--------------------------------------|-------------|
    | Hiring Manager  | **{ManagerFullNameSignature}**       | Name        |
    | Hiring Manager  | **{ManagerSignedDateSignature}**     | Date Signed |
    | Employee        | **{EmployeeSignature}**              | Signature   |
    | Employee        | **{EmployeeFullNameSignature}**      | Name        |
    | Employee        | **{EmployeeSignedDateSignature}**    | Date Signed |

1. **Hiring Manager**와 **Employee** 역할의 필드가 추가된 후 템플릿은 다음과 같이 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_20_FieldsAddedForRoles.png' | relative_url }}" alt="모든 역할의 필드 추가됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>모든 역할 필드 추가 완료</figcaption></figure>

1. 오른쪽 상단에서 **Save as Draft**를 선택합니다. 문서 템플릿 페이지로 리디렉션되고 왼쪽 하단에 확인 메시지가 표시됩니다. 그런 다음 **ellipsis 아이콘 (...)**을 선택하고 **Publish**를 선택합니다.

    <div class="info-box note" markdown="1">

    **팁**: **Save As Draft** 버튼이 보이지 않고 **Save and Publish**로 표시된 경우 **Save and Publish** 버튼을 선택하세요.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_21_PublishDocumentTemplate.png' | relative_url }}" alt="문서 템플릿 게시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>문서 템플릿 게시</figcaption></figure>

1. 왼쪽 하단에 Draft 템플릿이 Published되었다는 확인 메시지가 표시됩니다.

    이제 **Sample Offer Letter** 파일을 사용해 두 번째 문서 템플릿을 만듭니다.

    **+ Create new**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_22_CreateNewDocumentTemplate.png' | relative_url }}" alt="새 문서 템플릿 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 문서 템플릿 생성</figcaption></figure>

1. 이전 단계를 반복해 **Sample Offer Letter** 파일을 업로드하고 **Agreement Type**으로 **Offer Letter**를 선택합니다.

    **Continue**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_23_OfferLetterAgreementType.png' | relative_url }}" alt="Sample Offer Letter 파일 업로드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Offer Letter 계약 유형</figcaption></figure>

1. 이전 단계를 반복해 문서 템플릿에 두 개의 역할을 만듭니다: Hiring Manager와 Employee.

    **Fields** 왼쪽 패널에서 **Sender 1** 옆의 **chevron 아이콘**을 선택하고 **Edit recipients**를 선택합니다.

    **Signer 1** 역할 이름을 다음으로 변경합니다:

    ```text
    Hiring Manager
    ```

    새 수신자를 추가하고 역할 이름을 다음으로 지정합니다:

    ```text
    Employee
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_24_Roles.png' | relative_url }}" alt="역할 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>역할 추가</figcaption></figure>

1. 다음으로 문서의 플레이스홀더를 필드로 교체합니다. **Sender** 역할로 전환하여 시작합니다. `{EmployeeFullName}` 플레이스홀더를 강조 표시하고 왼쪽 메뉴에서 Employee Full Name 필드를 선택합니다. 필드가 이제 플레이스홀더 대신 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_25_ConfigureFields.png' | relative_url }}" alt="Sender 필드 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Sender 필드 구성</figcaption></figure>

1. **Sender** 역할의 나머지 플레이스홀더에 대해 같은 단계를 반복합니다. 왼쪽 메뉴에서 기존 필드를 선택하거나 새 필드를 만듭니다.

    | Placeholder                    | Field name                    | Create New Field | Field description                          | Required field | Field Type |
    |--------------------------------|-------------------------------|------------------|--------------------------------------------|----------------|------------|
    | **{EmployeeAddressLine1}**     | `Employee Address Line 1`     | Yes              | `Apt or House No. and street name`         | Yes            | Text       |
    | **{EmployeeAddressLine2}**     | `Employee Address Line 2`     | Yes              | `Suburb`                                   | Yes            | Text       |
    | **{EmployeeAddressCity}**      | `Employee Address City`       | Yes              | `City`                                     | Yes            | Text       |
    | **{Employee AddressPostCode}** | `Employee Address Post Code`  | Yes              | `Post code`                                | Yes            | Text       |
    | **{EmployeePosition}**         | `Employee Position`           | No               |                                            |                |            |
    | **{EmployeeStartDate}**        | `Start Date`                  | No               |                                            |                |            |
    | **{DueDate}**                  | `Signed Due Date`             | Yes              | `Due date of signed agreement by employee` | Yes            | Date       |

    <div class="info-box note" markdown="1">

    **팁**: 잘못된 필드 유형으로 새 필드를 실수로 만든 경우 (예: **Signed Due Date**를 `Text`로 만든 경우) 필드 유형을 변경할 수 없습니다. 하지만 필드 이름을 `[Don't use] Signed Due Date`로 변경할 수 있습니다.

    </div>

1. 다음으로 이전과 같은 단계를 사용해 **Hiring Manager**와 **Employee** 역할의 필드를 추가합니다.

    <div class="info-box note" markdown="1">

    **팁**: 🖱️ 역할 전환 잊지 마세요

    Fields 왼쪽 패널의 chevron 아이콘을 사용해 Employee 역할로 전환하세요.

    </div>

    | Role            | Placeholder                          | Field       |
    |-----------------|--------------------------------------|-------------|
    | Hiring Manager  | **{ManagerSignature}**               | Signature   |
    | Hiring Manager  | **{ManagerFullNameSignature}**       | Name        |
    | Employee        | **{EmployeeSignature}**              | Signature   |
    | Employee        | **{EmployeeFullNameSignature}**      | Name        |
    | Employee        | **{EmployeeSignedDateSignature}**    | Date Signed |

    이제 두 번째 문서 템플릿 구성이 완료되었습니다 👏🏻

    오른쪽 상단의 **Preview**를 선택하면 문서 템플릿 미리보기 모드를 볼 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_28_FieldsConfigured.png' | relative_url }}" alt="모든 역할 필드 구성됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>역할 필드 구성 완료</figcaption></figure>

1. 필드에 값을 입력하면 템플릿 뷰어에 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_29_PreviewMode.png' | relative_url }}" alt="Document Template 미리보기 모드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>문서 템플릿 미리보기</figcaption></figure>

1. 왼쪽 상단의 **X 아이콘**을 선택해 **Preview** 모드를 종료하고 **Save As Draft**를 선택합니다.

    <div class="info-box note" markdown="1">

    **팁**: **Save As Draft** 버튼이 보이지 않고 **Save and Publish**로 표시된 경우 **Save and Publish**를 선택하고 다음 두 게시 단계를 건너뜁니다.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_30_SaveAsDraft.png' | relative_url }}" alt="Save as Draft 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>초안으로 저장</figcaption></figure>

1. 왼쪽 하단에 템플릿이 Draft로 저장되었다는 확인 메시지가 표시됩니다. 다음으로 **ellipsis 아이콘 (...)**을 선택하고 **Publish**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_31_Publish.png' | relative_url }}" alt="Sample Offer Letter 문서 템플릿 게시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Offer Letter 게시</figcaption></figure>

1. **Sample Offer Letter** 문서 템플릿이 이제 게시되었습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_32_Published.png' | relative_url }}" alt="Sample Offer Letter 문서 게시됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Offer Letter 게시 완료</figcaption></figure>

🏃🏻‍♀️‍➡️ 다음으로 Workflow Builder에서 워크플로우를 만들겠습니다.

## 🧪 1.3 Docusign Workflow Builder 워크플로우 생성

Docusign Workflow Builder 워크플로우는 문서 처리, 서명, 데이터 수집을 자동화하는 도구입니다. 워크플로우가 구성되면 Workflow Builder는 참가자에게 알림을 보내고, 서명을 수집하며, 데이터를 라우팅하는 등 복잡한 계약 프로세스를 자동으로 처리합니다.

1. Docusign 개발자 포털에서 왼쪽 메뉴의 **Agreements**를 선택합니다. **Workflows**를 선택합니다. 그런 다음 **Create Workflow**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_01_CreateWorkflow.png' | relative_url }}" alt="Create Workflow 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 생성</figcaption></figure>

1. **+ Blank Workflow**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_02_BlankWorkflow.png' | relative_url }}" alt="Blank Workflow 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>빈 워크플로우 선택</figcaption></figure>

1. **ellipsis 아이콘(...)** > **Rename**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_03_RenameWorkflow.png' | relative_url }}" alt="워크플로우 이름 변경" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 이름 변경</figcaption></figure>

1. 워크플로우 이름을 입력하고 **Save**를 선택합니다. 예:

    ```text
    Docusign MCP Demo
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_04_SaveWorkflowName.png' | relative_url }}" alt="워크플로우 이름 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 이름 저장</figcaption></figure>

1. **Add workflow start**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_05_AddWorkflowStart.png' | relative_url }}" alt="Add workflow start 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 시작 추가</figcaption></figure>

1. **From an API Call**을 선택하고 **Apply**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_06_WorkflowStartMethod.png' | relative_url }}" alt="From an API Call 선택 및 Apply" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>API 호출로 워크플로우 시작</figcaption></figure>

1. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_07_NextConfigurationStep.png' | relative_url }}" alt="Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Next 선택</figcaption></figure>

1. 다음 단계는 워크플로우 변수를 구성하는 것입니다. 변수는 데이터를 저장하고 워크플로우 단계 간에 전달하는 데 사용됩니다. **+ Add variable**을 선택하고 **Text** 유형의 변수를 만드세요. 이름을 다음으로 지정합니다:

    ```text
    Employee Full Name
    ```

    **Add Variable**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_08_NewTextVariable.png' | relative_url }}" alt="변수 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 변수 추가</figcaption></figure>

1. 나머지 **Text** 유형의 변수에 대해 같은 단계를 반복합니다:

    ```text
    Employee Email
    ```

    ```text
    Hiring Manager Full Name
    ```

    ```text
    Hiring Manager Email
    ```

    ```text
    Employee Position
    ```

    ```text
    Start Date
    ```

    ```text
    Effective Date
    ```

    ```text
    Salary
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_09_WorkflowStartVariables.png' | relative_url }}" alt="모든 변수 추가됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>모든 워크플로우 변수</figcaption></figure>

1. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_10_SelectNext.png' | relative_url }}" alt="Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Next 선택</figcaption></figure>

1. **Automated process**를 선택하고 **Apply**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_11_SelectAutomatedProcess.png' | relative_url }}" alt="Automated process 선택 및 Apply" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>자동화 프로세스 선택</figcaption></figure>

1. **Add a step**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_12_AddWorkflowStep.png' | relative_url }}" alt="Add a step 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>단계 추가</figcaption></figure>

1. **Set Up Invite**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_13_SetUpInvite.png' | relative_url }}" alt="Set Up Invite 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>초대 설정</figcaption></figure>

1. **Configure**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_14_SelectConfigure.png' | relative_url }}" alt="Configure 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>구성</figcaption></figure>

1. **Add Participant**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_15_SelectAddParticipant.png' | relative_url }}" alt="Add Participant 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>참가자 추가</figcaption></figure>

1. 다음을 입력하고 **Add**를 선택합니다:

    ```text
    Employee
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_16_EmployeeParticipant.png' | relative_url }}" alt="Employee 입력 및 Add 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee 참가자 추가</figcaption></figure>

1. **Employee Name**과 **Employee Email** 필드가 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_17_SelectVariables.png' | relative_url }}" alt="Employee 참가자 필드 표시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee 참가자 필드</figcaption></figure>

1. **Employee Full Name** 변수를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_18_EmployeeFullNameVariable.png' | relative_url }}" alt="Employee Full Name 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee Full Name 변수</figcaption></figure>

1. **Employee Email** 변수를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_19_EmployeeEmailVariable.png' | relative_url }}" alt="Employee Email 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee Email 변수</figcaption></figure>

1. **Apply**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_20_Apply.png' | relative_url }}" alt="Apply 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Apply 선택</figcaption></figure>

1. **Add a step**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_21_AddStep.png' | relative_url }}" alt="Add a step 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>단계 추가</figcaption></figure>

1. **Collect Data with Web Forms**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_22_SelectCollectDataWithWebForms.png' | relative_url }}" alt="Collect Data with Web Forms 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Forms로 데이터 수집</figcaption></figure>

1. **Configure**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_23_SelectConfigure.png' | relative_url }}" alt="Configure 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Forms 구성</figcaption></figure>

1. 이전에 만든 **Request for your contact information** Web Form을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_24_ChooseForm.png' | relative_url }}" alt="Web Form 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Form 선택</figcaption></figure>

1. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_25_NextConfigurationStep.png' | relative_url }}" alt="Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Next 선택</figcaption></figure>

1. **Employee** 참가자를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_26_SelectEmployeeParticipant.png' | relative_url }}" alt="Employee 참가자 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee 참가자 선택</figcaption></figure>

1. **Continue to map data fields**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_27_ContinueToMapDataFields.png' | relative_url }}" alt="데이터 필드 매핑 계속" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>데이터 필드 매핑</figcaption></figure>

1. **Employee Full Name** 변수를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_28_EmployeeFullNameVariable.png' | relative_url }}" alt="Employee Full Name 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee Full Name 매핑</figcaption></figure>

1. **Apply**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_29_Apply.png' | relative_url }}" alt="Apply 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Apply 선택</figcaption></figure>

1. **Add a step**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_30_AddAStep.png' | relative_url }}" alt="Add a step 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>단계 추가</figcaption></figure>

1. **Prepare a Document Template**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_31_SelectPrepareDocumentTemplate.png' | relative_url }}" alt="Prepare a Document Template 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>문서 템플릿 준비</figcaption></figure>

1. **Configure**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_32_SelectConfigure.png' | relative_url }}" alt="Configure 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>구성</figcaption></figure>

1. **Step Name**을 업데이트합니다:

    ```text
    Employment Agreement
    ```

    **Sample Employment Agreement** 문서 템플릿을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_33_SelectSampleEmploymentAgreement.png' | relative_url }}" alt="Employment Agreement 템플릿 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>고용 계약서 템플릿 선택</figcaption></figure>

1. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_34_SelectNext.png' | relative_url }}" alt="Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Next 선택</figcaption></figure>

1. 다음으로 필드 값을 구성합니다. **Next**를 선택해 자동으로 채워진 필드를 수락합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_35_SelectNext.png' | relative_url }}" alt="Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Next 선택</figcaption></figure>

1. **Effective Date** 변수를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_36_SelectEffectiveDate.png' | relative_url }}" alt="Effective Date 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Effective Date 변수 선택</figcaption></figure>

1. 나머지 필드에도 같은 단계를 반복해 변수와 매핑합니다. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_37_AgreementFieldsConfigured.png' | relative_url }}" alt="나머지 필드 매핑 및 Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>나머지 필드 매핑</figcaption></figure>

1. **Title** 필드에 변수를 사용합니다. **Employee Full Name** 변수를 선택해 추가합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_38_TitleBuilder.png' | relative_url }}" alt="Title 필드에 변수 사용" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Title 변수 구성</figcaption></figure>

1. **Effective Date** 변수 옆의 **+ 아이콘**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_39_SelectEffectiveDate.png' | relative_url }}" alt="Effective Date 변수 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>날짜 변수 추가</figcaption></figure>

1. 구분자를 추가하고 형식을 업데이트합니다. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_40_TitleBuilderFieldConfigured.png' | relative_url }}" alt="구분자 추가 및 형식 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>구분자 및 형식 설정</figcaption></figure>

1. **Apply**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_41_SelectApply.png' | relative_url }}" alt="Apply 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Apply 선택</figcaption></figure>

1. **Add a step**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_42_AddAStep.png' | relative_url }}" alt="Add a step 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>단계 추가</figcaption></figure>

1. **Prepare a Document Template**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_43_SelectPrepareDocumentTemplate.png' | relative_url }}" alt="Prepare a Document Template 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>문서 템플릿 준비</figcaption></figure>

1. **Step Name**을 업데이트합니다:

    ```text
    Offer Letter
    ```

    **Sample Offer Letter** 문서 템플릿을 선택합니다. 같은 단계를 반복해 Offer Letter 템플릿의 필드를 구성하고 **Apply**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_44_ConfigureAgreementFields.png' | relative_url }}" alt="Offer Letter 템플릿 구성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Offer Letter 구성</figcaption></figure>

1. 이름 문서 구성을 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_45_NameDocumentConfigurationStep.png' | relative_url }}" alt="문서 구성 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>문서 구성</figcaption></figure>

1. **Add a step**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_46_AddAStep.png' | relative_url }}" alt="Add a step 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>단계 추가</figcaption></figure>

1. **Send Documents for Signature**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_47_SendDocumentsForSignature.png' | relative_url }}" alt="Send Documents for Signature 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>서명을 위한 문서 전송</figcaption></figure>

1. **Configure**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_48_SelectConfigure.png' | relative_url }}" alt="Configure 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>구성</figcaption></figure>

1. **Employment Agreement** 문서를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_49_SelectGenerateDocumentEmploymentAgreement.png' | relative_url }}" alt="Employment Agreement 문서 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>고용 계약서 선택</figcaption></figure>

1. **Add Document**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_50_SelectAddDocument.png' | relative_url }}" alt="Add Document 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>문서 추가</figcaption></figure>

1. **Offer Letter** 문서를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_51_SelectGenerateDocumentOfferLetter.png' | relative_url }}" alt="Offer Letter 문서 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Offer Letter 선택</figcaption></figure>

1. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_52_SelectNext.png' | relative_url }}" alt="Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Next 선택</figcaption></figure>

1. **Next**를 선택합니다. (자동으로 전송됩니다)

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_53_SendEnvelopeAutomatically.png' | relative_url }}" alt="Next 선택 (자동 전송)" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Next 선택</figcaption></figure>

1. **Set a signing order**를 활성화합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_54_SetASigningOrder.png' | relative_url }}" alt="Set a signing order 활성화" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>서명 순서 설정</figcaption></figure>

1. **Hiring Manager**를 **2**로 설정합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_55_SetHiringManagerAs2.png' | relative_url }}" alt="Hiring Manager 서명 순서 2 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Hiring Manager 서명 순서</figcaption></figure>

1. **Employee**를 **1**로 설정합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_56_SetEmployeeAs1.png' | relative_url }}" alt="Employee 서명 순서 1 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee 서명 순서</figcaption></figure>

1. **Employee** 변수를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_57_SelectEmployee.png' | relative_url }}" alt="Employee 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee 변수 선택</figcaption></figure>

1. Employee 참가자 필드가 매핑됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_58_MappedParticipantFields.png' | relative_url }}" alt="Employee 참가자 필드 매핑됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee 필드 매핑</figcaption></figure>

1. **Add Participant**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_59_AddParticipant.png' | relative_url }}" alt="Add Participant 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>참가자 추가</figcaption></figure>

1. 다음을 입력하고 **Add**를 선택합니다:

    ```text
    Hiring Manager
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_60_HiringManager.png' | relative_url }}" alt="Hiring Manager 입력 및 Add" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Hiring Manager 추가</figcaption></figure>

1. **Hiring Manager Full Name** 변수를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_61_MapHiringManagerName.png' | relative_url }}" alt="Hiring Manager Full Name 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Hiring Manager 이름 변수</figcaption></figure>

1. **Hiring Manager Email** 변수를 선택하고 **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_62_MapHiringManagerEmail.png' | relative_url }}" alt="Hiring Manager Email 변수 및 Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Hiring Manager 이메일 변수</figcaption></figure>

1. 서명 세션의 경우 기본 선택을 유지합니다: **Use a direct signing session**. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_63_UseADirectSigningSession.png' | relative_url }}" alt="직접 서명 세션 사용 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>직접 서명 세션</figcaption></figure>

1. 마지막으로 Hiring Manager가 볼 메시지를 구성합니다.

    **Message title**:

    ```text
    Complete with Docusign: Employment Agreement and Offer Letter
    ```

    **Message**:

    ```text
    Please review and sign the Employment Agreement and Offer Letter.
    ```

    **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_106_AddMessage.png' | relative_url }}" alt="메시지 추가 및 Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>메시지 구성</figcaption></figure>

1. **Apply**를 선택해 워크플로우 단계 구성을 완료합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_107_SelectApply.png' | relative_url }}" alt="Apply 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Apply 선택</figcaption></figure>

1. **Add a step**을 선택합니다. 다음으로 서명 완료 후 Employee 참가자에게 표시되는 **Confirmation Screen**을 추가합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_65_AddAStep.png' | relative_url }}" alt="Confirmation Screen 추가를 위한 Add a step" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>단계 추가</figcaption></figure>

1. **Show a Confirmation Screen**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_66_SelectShowAConfirmationScreen.png' | relative_url }}" alt="Show a Confirmation Screen 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>확인 화면 표시</figcaption></figure>

1. **Configure**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_67_SelectConfigure.png' | relative_url }}" alt="Configure 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>구성</figcaption></figure>

1. **Employee**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_68_SelectEmployee.png' | relative_url }}" alt="Employee 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Employee 선택</figcaption></figure>

1. **Apply**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_69_SelectApply.png' | relative_url }}" alt="Apply 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Apply 선택</figcaption></figure>

1. **App Center**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_70_SelectAppCenter.png' | relative_url }}" alt="App Center 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>App Center 선택</figcaption></figure>

1. **SharePoint**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_71_SelectSharePoint.png' | relative_url }}" alt="SharePoint 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>SharePoint 선택</figcaption></figure>

1. **Install App**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_72_SelectInstallApp.png' | relative_url }}" alt="Install App 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>앱 설치</figcaption></figure>

1. **Install and Authorize**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_73_SelectInstallAndAuthorize.png' | relative_url }}" alt="Install and Authorize 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>설치 및 권한 부여</figcaption></figure>

1. **Connect Account**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_74_ConnectAccount.png' | relative_url }}" alt="Connect Account 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>계정 연결</figcaption></figure>

1. **Private**을 선택하고 **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_75_SelectPrivateAndNext.png' | relative_url }}" alt="Private 선택 및 Next" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>프라이빗 연결</figcaption></figure>

1. 이름을 입력하고 **Log In**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_76_NameTheSharePointConnection.png' | relative_url }}" alt="이름 입력 및 Log In" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>로그인</figcaption></figure>

1. 자격 증명을 입력하고 **Accept**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_77_Consent.png' | relative_url }}" alt="자격 증명 입력 및 Accept" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>자격 증명 입력</figcaption></figure>

1. **X 아이콘**을 선택해 App Center를 종료합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_78_SelectUseThisApp.png' | relative_url }}" alt="App Center 종료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>App Center 종료</figcaption></figure>

1. **Add a step**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_79_SelectAddAStep.png' | relative_url }}" alt="Add a step 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>단계 추가</figcaption></figure>

1. **Store files in SharePoint**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_80_SelectStoreFilesInSharePoint.png' | relative_url }}" alt="Store files in SharePoint 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>SharePoint에 파일 저장</figcaption></figure>

1. **Configure**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_81_SelectConfigure.png' | relative_url }}" alt="Configure 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>구성</figcaption></figure>

1. **Combined Envelope File**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_82_SelectCombinedEnvelopFile.png' | relative_url }}" alt="Combined Envelope File 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>결합된 봉투 파일 선택</figcaption></figure>

1. 연결을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_83_SelectConnection.png' | relative_url }}" alt="연결 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 선택</figcaption></figure>

1. SharePoint 사이트를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_84_SelectHRTeam.png' | relative_url }}" alt="SharePoint 사이트 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>SharePoint 사이트 선택</figcaption></figure>

1. **Documents** 드라이브를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_85_SelectDocuments.png' | relative_url }}" alt="Documents 드라이브 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>드라이브 선택</figcaption></figure>

1. 폴더를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_86_SelectSignedEmployees.png' | relative_url }}" alt="폴더 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>폴더 선택</figcaption></figure>

1. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_87_SelectNext.png' | relative_url }}" alt="Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Next 선택</figcaption></figure>

1. 파일 이름 필드에서 **Envelope ID** 변수를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_88_SelectEnvelopeIDVariable.png' | relative_url }}" alt="Envelope ID 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Envelope ID 변수</figcaption></figure>

1. **Add Text**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_89_SelectText.png' | relative_url }}" alt="Add Text 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>텍스트 추가</figcaption></figure>

1. 구분자를 입력하고 **Add**를 선택합니다:

    ```text
    _
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_90_AddUnderscoreCharacter.png' | relative_url }}" alt="구분자 입력 및 Add" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>구분자 추가</figcaption></figure>

1. **Add Variable**을 선택하고 **Full Name** 변수를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_91_SelectFullName.png' | relative_url }}" alt="Full Name 변수 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Full Name 변수 선택</figcaption></figure>

1. **Apply**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_92_SelectApply.png' | relative_url }}" alt="Apply 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Apply 선택</figcaption></figure>

1. **Save Draft**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_93_SelectSaveDraft.png' | relative_url }}" alt="Save Draft 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>초안 저장</figcaption></figure>

1. **Review & Publish**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_94_SelectReviewAndPublish.png' | relative_url }}" alt="Review & Publish 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>검토 및 게시</figcaption></figure>

1. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_95_SelectNext.png' | relative_url }}" alt="Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Next 선택</figcaption></figure>

1. 변수 옆의 **+ 아이콘**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_96_InsertVariable.png' | relative_url }}" alt="변수 추가 + 아이콘 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>변수 추가</figcaption></figure>

1. **Instance ID** 변수를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_97_SelectInstanceIDVariable.png' | relative_url }}" alt="Instance ID 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Instance ID 변수</figcaption></figure>

1. **Start Date and Time** 변수를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_98_SelectStartDateAndTimeVariable.png' | relative_url }}" alt="Start Date and Time 변수 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>시작 날짜 변수</figcaption></figure>

1. 구분자를 입력하고 **Done**을 선택합니다:

    ```text
    _
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_99_InsertUnderscoreCharacter.png' | relative_url }}" alt="구분자 입력 및 Done" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>구분자 설정</figcaption></figure>

1. **Publish**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_100_SelectPublish.png' | relative_url }}" alt="Publish 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>게시</figcaption></figure>

1. **Authorize My Account**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_101_SelectAuthorizeMyAccount.png' | relative_url }}" alt="Authorize My Account 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>계정 권한 부여</figcaption></figure>

1. **Allow Access**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_102_SelectAllowAccess.png' | relative_url }}" alt="Allow Access 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>액세스 허용</figcaption></figure>

1. **Publish**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_103_SelectPublish.png' | relative_url }}" alt="Publish 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>게시</figcaption></figure>

1. **Go to Workflows**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_104_SelectGoToWorkflow.png' | relative_url }}" alt="Go to Workflows 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우로 이동</figcaption></figure>

1. 워크플로우가 **Published** 상태로 표시됩니다. 워크플로우를 성공적으로 빌드했습니다 👏🏻

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_105_WorkflowPublished.png' | relative_url }}" alt="게시된 워크플로우" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 게시 완료</figcaption></figure>

## 🧪 1.4 워크플로우 테스트

Microsoft Copilot Studio에서 에이전트를 빌드하기 전에 워크플로우를 실행하여 테스트하는 것이 좋은 관행입니다. 새 인스턴스를 시작해 워크플로우를 수동으로 실행할 수 있습니다.

1. 워크플로우를 열고 오른쪽 상단에서 **Start Instance**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_01_StartInstance.png' | relative_url }}" alt="Start Instance 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 인스턴스 시작</figcaption></figure>

1. 워크플로우 시작 단계의 변수 값을 입력하는 모달이 나타납니다. 샘플 데이터로 필드를 채우세요.

    <div class="info-box note" markdown="1">

    **참고**: Employee와 Hiring Manager에 액세스할 수 있는 서로 다른 두 이메일 주소를 사용하세요.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_02_EnterValuesForWorkflowStartVariables.png' | relative_url }}" alt="워크플로우 시작 변수 값 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 시작 변수</figcaption></figure>

1. 변수 값을 입력한 후 **Start**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_03_EnterValuesForWorkflowStartVariables.png' | relative_url }}" alt="워크플로우 시작 변수 값 입력 및 Start" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Start 선택</figcaption></figure>

1. 워크플로우 인스턴스가 시작되었다는 확인 메시지가 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_04_ConfirmationOfInstance.png' | relative_url }}" alt="워크플로우 인스턴스 시작 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>인스턴스 확인</figcaption></figure>

1. Employee 참가자 이메일 주소의 받은 편지함으로 이동해 Docusign 이메일을 엽니다. 제목은 `***Test Email*** Review and complete workflow`입니다. **Review**를 선택합니다.

    <div class="info-box note" markdown="1">

    **경고**: 이메일이 메인 받은 편지함에 보이지 않으면 스팸 폴더를 확인하세요.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_05_SelectReview.png' | relative_url }}" alt="Review 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Review 선택</figcaption></figure>

1. Web Form의 첫 번째 페이지가 로드됩니다. **Start**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_06_SelectStart.png' | relative_url }}" alt="Start 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Start 선택</figcaption></figure>

1. Web Form의 **Your Name** 페이지가 표시됩니다. 워크플로우 시작 샘플 데이터에서 사용한 Employee의 이름을 입력합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_07_ProvideNameInformation.png' | relative_url }}" alt="이름 정보 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>이름 정보 입력</figcaption></figure>

1. Web Form의 **Address** 페이지에 샘플 주소 정보를 입력합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_08_ProvideAddressInformation.png' | relative_url }}" alt="주소 정보 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>주소 정보 입력</figcaption></figure>

1. Web Form의 마지막 단계는 입력한 정보를 검토하는 것입니다. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_09_SelectNextToCompleteWebForm.png' | relative_url }}" alt="Web Form 완성을 위해 Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Next 선택</figcaption></figure>

1. Web Form 제출 후 다음 워크플로우 단계가 자동으로 실행됩니다: 양식 데이터를 사용해 고용 계약서 및 제안서를 생성하고 Employee 참가자 서명을 요청합니다.

    **약관 동의 체크박스**를 선택하고 **Continue**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_10_AgreeAndContinue.png' | relative_url }}" alt="동의 및 계속" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>동의 및 계속</figcaption></figure>

1. 고용 계약서가 표시됩니다. 파란색 텍스트는 **워크플로우 시작 변수** 및 **Web Form**에서 입력한 값을 보여줍니다. 계약서를 검토한 후 **Start**를 선택해 서명합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_11_ReviewDocumentAgreements.png' | relative_url }}" alt="문서 계약서 검토" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>계약서 검토</figcaption></figure>

1. **Sign** 아이콘을 선택해 고용 계약서에 서명합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_12_SignEmploymentAgreement.png' | relative_url }}" alt="고용 계약서 서명" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>계약서 서명</figcaption></figure>

1. 서명 세부 정보와 스타일을 확인하는 모달이 나타납니다. 기본 스타일을 유지하고 **Adopt and Sign**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_13_AdoptAndSign.png' | relative_url }}" alt="Adopt and Sign 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>서명 채택</figcaption></figure>

1. 다음으로 Offer Letter를 검토합니다. 주소 정보가 이제 표시되는 것을 확인하세요. **Sign** 탭 아이콘을 선택하고 Offer Letter의 **Sign** 아이콘을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_14_SignOfferLetter.png' | relative_url }}" alt="Offer Letter 서명" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Offer Letter 서명</figcaption></figure>

1. Offer Letter에 **Adopt and Sign**을 선택하고 **Finish**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_15_SelectFinish.png' | relative_url }}" alt="Finish 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Finish 선택</figcaption></figure>

1. 이전에 구성한 Confirmation Screen이 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_16_ConfirmationScreen.png' | relative_url }}" alt="확인 화면 표시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>확인 화면</figcaption></figure>

1. 다음으로 Hiring Manager 참가자 이메일 주소의 받은 편지함으로 이동해 Docusign 이메일을 엽니다. 제목은 `Complete with Docusign: Employment Agreement and Offer Letter`입니다. **Review Documents**를 선택합니다.

    <div class="info-box note" markdown="1">

    **경고**: 이메일이 메인 받은 편지함에 보이지 않으면 스팸 폴더를 확인하세요.

    </div>

1. 고용 계약서와 Offer Letter에 서명하고 **Finish**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_18_SelectFinish.png' | relative_url }}" alt="Finish 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Finish 선택</figcaption></figure>

1. Docusign 개발자 계정과 동일한 이메일 주소를 사용하는 경우 다음 모달이 표시될 수 있습니다. **No Thanks**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_19_OptionToLogIntoDocusign.png' | relative_url }}" alt="No Thanks 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>No Thanks 선택</figcaption></figure>

1. 문서가 성공적으로 서명되었다는 확인이 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_20_Configrmation.png' | relative_url }}" alt="문서 성공적으로 서명 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>서명 확인</figcaption></figure>

1. Docusign 개발자 계정 이메일 받은 편지함으로 이동하면 서명된 계약서 이메일을 확인할 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_21_DocusignDeveloperUserAccount.png' | relative_url }}" alt="서명된 계약서 수신" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>계약서 수신</figcaption></figure>

1. 워크플로우의 마지막 단계는 서명된 계약서를 SharePoint에 업로드하는 것이었습니다. SharePoint 폴더로 이동하면 서명된 계약서의 PDF 파일이 목록에 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_22_SignedDocumentAgreementsUploadedToSharePoint.png' | relative_url }}" alt="서명된 계약서 SharePoint 업로드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>SharePoint 업로드</figcaption></figure>

1. PDF 파일을 열어 문서를 검토합니다. 엔드-투-엔드 수동 워크플로우 테스트를 성공적으로 완료했습니다 🎉 다음으로 Microsoft Copilot Studio에서 에이전트를 빌드합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_23_ViewSignedDocumentAgreements.png' | relative_url }}" alt="서명된 계약서 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>계약서 보기</figcaption></figure>

## 🧪 1.5 Microsoft Copilot Studio에서 맞춤형 에이전트 빌드, Docusign MCP Demo 연결, 워크플로우 트리거

### 사전 요구사항

- **새 솔루션**: 에이전트를 만들기 전에 모범 관행으로 새 솔루션을 만드세요.
- **새 경험 사용**: 이 랩은 의도적으로 새 Copilot Studio 경험을 사용합니다. Docusign MCP Demo 도구는 그곳에서 사용 가능합니다. 다른 Agent Academy 레슨을 위해 클래식 경험으로 전환한 경우 계속하기 전에 **New Experience**를 다시 켜세요.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_00_ToggleNewExperience.png' | relative_url }}" alt="새 경험 토글" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 경험 토글</figcaption></figure>

시작해 봅시다!

1. [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com)으로 이동하여 Microsoft 365 업무 또는 학교 계정으로 로그인합니다.

    <div class="info-box note" markdown="1">

    **경고**: Copilot Studio가 활성화된 테넌트에 있어야 합니다.

    </div>

1. 개발자 환경에 있는지 확인하고 **Agent**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_01_SelectAgent.png' | relative_url }}" alt="빈 에이전트 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 선택</figcaption></figure>

1. 에이전트 이름으로 다음을 입력합니다:

    ```text
    Offer Management Agent
    ```

    다음으로 에이전트 지침을 입력합니다:

    ```text
    You are the Offer Management Agent, an HR onboarding agent that automates offer workflows.

    Your goal is to streamline the process of sending, signing, and finalizing Employment Agreements and Offer Letters using Docusign Workflow Builder.

    ## Docusign Workflow Builder

    Assist users by identifying the correct workflow, collecting required inputs, and triggering document delivery to recipients.

    Be concise, professional, and proactive. Ask for missing information before proceeding, and confirm actions before triggering workflows.

    If the request cannot be fulfilled using available workflows or tools, clearly explain the limitation and suggest next steps.

    If the user needs to provide missing information, provide the field name from the variables of the workflow with a corresponding field description.

    Confirm with the user that all information is correct before triggering the workflow. If the user confirms the information is correct, trigger the workflow. If the user confirms the information is incorrect, do not trigger the workflow.
    ```

    <div class="info-box note" markdown="1">

    **팁**: 이 지침은 Offer Management Agent의 역할, 톤, 결정 흐름을 정의합니다.

    </div>

    다음으로 **Docusign MCP Demo** 도구를 에이전트에 추가합니다. **Tools** 아래 오른쪽 패널의 **plus 아이콘**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_02_AgentNameInstructionsAddTool.png' | relative_url }}" alt="에이전트 이름, 지침 입력 및 도구 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 설정</figcaption></figure>

1. **Model Context Protocol (MCP)** 카테고리를 선택해 MCP 도구 목록으로 필터링합니다. 스크롤해 **Docusign MCP Demo**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_03_SelectDocusignMCPDemo.png' | relative_url }}" alt="Docusign MCP Demo 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Docusign MCP Demo 선택</figcaption></figure>

    <div class="info-box note" markdown="1">

    **경고**: 새 UI에서 `Docusign MCP Demo` 또는 `docusign`을 검색하면 프로덕션 도구인 **Docusign MCP**가 반환될 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_03_Warning_DoNotSearch.png' | relative_url }}" alt="검색 금지 - Docusign MCP 대신 Docusign MCP Demo 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>검색 금지 경고</figcaption></figure>

    Docusign MCP를 선택하지 마세요. 검색 필드를 지우고 스크롤해 **Docusign MCP Demo**를 선택하세요.

    </div>

1. **Docusign MCP Server**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_04_SelectDocusignMCPServer.png' | relative_url }}" alt="Docusign MCP Server 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 서버 선택</figcaption></figure>

1. Docusign 개발자 계정의 새 연결을 추가해야 합니다. **chevron** 아이콘을 선택하고 **Create new connection**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_05_SelectCreateNewConnection.png' | relative_url }}" alt="새 연결 생성 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 연결 생성</figcaption></figure>

1. **Create**를 선택해 Docusign 개발자 계정 자격 증명을 입력합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_06_SelectCreate.png' | relative_url }}" alt="Create 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create 선택</figcaption></figure>

1. Docusign 개발자 계정의 사용자 이름과 비밀번호를 입력합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_07_LogIn.png' | relative_url }}" alt="자격 증명 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>로그인</figcaption></figure>

1. 연결이 생성되고 초록색 체크 아이콘이 표시됩니다. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_08_ConnectionCreated.png' | relative_url }}" alt="연결 생성됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 생성 완료</figcaption></figure>

1. Docusign MCP Demo 도구에 대해 지원되는 작업 목록이 표시됩니다. 스크롤해 워크플로우 작업을 확인합니다. **Confirm**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_09_ReviewDocusignMCPDemoCapabilities.png' | relative_url }}" alt="Docusign MCP Demo 기능 검토" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 기능 검토</figcaption></figure>

1. 도구가 에이전트에 추가됩니다.

    다음으로 **Settings**에서 이 에이전트의 솔루션을 변경합니다. 오른쪽 상단의 **ellipsis 아이콘**을 선택하고 **Settings**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_10_SelectSettings.png' | relative_url }}" alt="Settings 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Settings 선택</figcaption></figure>

1. 드롭다운 필드에서 이전에 만든 새 솔루션을 선택해 에이전트의 솔루션을 변경합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_11_Solution.png' | relative_url }}" alt="대상 솔루션 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>솔루션 선택</figcaption></figure>

1. 에이전트를 **저장**하고 테스트합니다. **Preview** 탭을 선택하고 다음을 입력해 제출합니다:

    ```text
    Send an employment agreement and offer letter to [employee name], [email address]
    ```

    - `[employee name]`을 이름으로 교체합니다.
    - `[email address]`를 Employee 참가자 이메일 주소로 교체합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_12_TestOfferManagementAgent.png' | relative_url }}" alt="Offer Management Agent 테스트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 테스트</figcaption></figure>

1. 오케스트레이터가 **Docusign MCP Demo** 도구와 추가한 지침을 사용해 **고용 계약서 및 Offer Letter 전송**에 필요한 워크플로우 요구사항을 찾습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_13_OrchestratorInProgress.png' | relative_url }}" alt="오케스트레이터 진행 중" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>오케스트레이터 작동</figcaption></figure>

1. Employee 이름과 이메일 주소만 제공했기 때문에 에이전트 응답이 워크플로우에 필요한 나머지 정보를 요청합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_14_WorkflowTriggerRequirementsIdentified.png' | relative_url }}" alt="워크플로우 트리거 요구사항 식별됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>요구사항 식별</figcaption></figure>

1. 다음 텍스트를 입력하고 제출합니다. 대괄호 안의 내용을 실제 값으로 교체하세요:

    ```text
    employee position is [position], effective date and start date is [MMMM d], salary is [salary dollar amount], reporting to [manager full name] [manager email address], and due signed date is [MMMM d]
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_15_VariablesProvided.png' | relative_url }}" alt="변수 값 제공됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>변수 제공</figcaption></figure>

1. 에이전트가 제공된 정보를 기반으로 변수 요약을 제공하고 정보가 정확한지 확인을 요청합니다. 이는 에이전트 생성 시 입력한 지침에 기반합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_16_ReviewMappedInformation.png' | relative_url }}" alt="매핑된 정보 검토" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>정보 검토</figcaption></figure>

1. 다음 텍스트를 입력하고 제출합니다:

    ```text
    Yes, information is correct.
    ```

    오케스트레이터가 다음으로 워크플로우를 트리거합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_17_ConfirmInformationIsCorrect.png' | relative_url }}" alt="정보 정확성 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>확인 입력</figcaption></figure>

1. 워크플로우가 트리거되면 확인 및 요약이 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_18_WorkflowSuccessfullyTriggered.png' | relative_url }}" alt="워크플로우 성공적으로 트리거됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 트리거 완료</figcaption></figure>

1. 이전과 동일한 단계를 따라 워크플로우를 완료합니다:

    - Employee 참가자 이메일 받은 편지함으로 이동해 Docusign 이메일을 열고 Web Form을 완성한 후 계약서에 서명합니다.
    - Hiring Manager 참가자 이메일 받은 편지함으로 이동해 계약서에 서명합니다.
    - 마지막으로 서명된 계약서가 SharePoint에 업로드됩니다.

    <div class="info-box note" markdown="1">

    **경고**: 이메일이 메인 받은 편지함에 보이지 않으면 스팸 폴더를 확인하세요.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_19_SignedAgreementsUploadedToSharePoint.png' | relative_url }}" alt="서명된 계약서 SharePoint 업로드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>SharePoint 업로드</figcaption></figure>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_20_ReviewAgreements.png' | relative_url }}" alt="계약서 검토" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>계약서 검토</figcaption></figure>

1. Docusign 개발자 포털에서 워크플로우 인스턴스를 검토할 수도 있으며 진행 상태가 **Completed**로 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_21_WorkflowProgressStatus.png' | relative_url }}" alt="워크플로우 진행 상태" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>완료 상태</figcaption></figure>

**축하합니다!** 🥳 에이전트에서 **Docusign MCP Demo** 도구를 통해 Workflow Builder 워크플로우를 호출하는 방법을 배웠습니다.

## 🧪🌟 1.6 보너스 - Work IQ Calendar 도구 추가 (멀티-MCP 기능)

테넌트와 사용자가 Frontier 기능을 사용할 수 있도록 활성화된 경우 에이전트에 두 번째 MCP 서버인 **Work IQ Calendar**를 결합하는 다음 연습을 시도해 보세요.

에이전트는 Docusign Workflow Builder 워크플로우가 성공한 후 HR 온보딩 사전 체크리스트를 검토하기 위한 Outlook 미팅을 자동으로 캘린더에 생성하도록 업데이트됩니다.

`sample-skill.zip`을 다운로드하고 압축 해제한 후, `sample-skill-outlook-pre-onboarding-checklist-meeting.zip` 파일을 에이전트에 업로드합니다.

1. Workflow Builder 워크플로우가 성공적으로 트리거된 후 Outlook 미팅을 생성하는 세부 정보를 포함하도록 에이전트 지침을 업데이트합니다. 지침의 두 번째 단락에 새 줄로 다음을 입력합니다:

    ```text
    When the workflow has successfully been triggered, schedule an Outlook meeting.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_01_UpdateInstructions.png' | relative_url }}" alt="에이전트 지침 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>지침 업데이트</figcaption></figure>

1. 다음으로 **Docusign Workflow Builder** 섹션 아래에 Outlook 미팅 일정 섹션을 추가합니다.

    <div class="info-box note" markdown="1">

    **팁**: 에이전트 지침은 에이전트가 무엇을 해야 하는지와 언제 해야 하는지를 정의합니다. 기술(skill)은 특정 작업을 안정적이고 일관되게 수행하는 방법을 정의합니다.

    </div>

    ```text
    ## Schedule Outlook meeting
    When the workflow has successfully been triggered, use the `outlook-pre-onboarding-checklist-meeting` skill to create the Outlook meeting.
    ```

    에이전트 지침을 업데이트한 후 **Save**를 선택하세요.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_02_UpdateInstructionsToIncludeOutlookMeetingHeader.png' | relative_url }}" alt="Outlook 미팅 헤더 포함하도록 지침 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>지침 업데이트</figcaption></figure>

1. 오른쪽 패널의 **Skills** 아래 **plus 아이콘**을 선택해 기술 파일을 업로드합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_03_AddSkill.png' | relative_url }}" alt="기술 추가 아이콘 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>기술 추가</figcaption></figure>

1. 파일을 업로드하려면 클릭합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_04_ClickToUploadSkill.png' | relative_url }}" alt="파일 업로드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>파일 업로드</figcaption></figure>

1. `sample-skill.zip`을 다운로드하고 압축 해제한 후 `sample-skill-outlook-pre-onboarding-checklist-meeting.zip` 파일을 에이전트에 업로드합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_05_SelectSkillFile.png' | relative_url }}" alt="기술 파일 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>기술 파일 선택</figcaption></figure>

1. 기술이 에이전트에 추가되었습니다.

    <div class="info-box note" markdown="1">

    **팁**: 이 기술은 Docusign Workflow Builder 워크플로우가 성공한 후 Outlook 온보딩 사전 회의를 예약하는 에이전트의 자동화 레시피입니다.

    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_06_SkillAdded.png' | relative_url }}" alt="기술 추가됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>기술 추가 완료</figcaption></figure>

1. 다음으로 **Work IQ Calendar (Preview)** 도구를 추가합니다. **Tools** 아래 오른쪽 패널의 **plus 아이콘**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_07_AddWorkIQCalendarTool.png' | relative_url }}" alt="새 도구 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Work IQ Calendar 도구 추가</figcaption></figure>

1. **Model Context Protocol (MCP)** 카테고리를 선택해 MCP 도구 목록으로 필터링합니다. **Work IQ Calendar (Preview)** 도구를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_08_SelectWorkIQCalendar.png' | relative_url }}" alt="Work IQ Calendar (Preview) 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Work IQ Calendar 선택</figcaption></figure>

1. 개발자 환경의 로그인 계정을 사용해 도구에 대한 연결을 만듭니다. **chevron 아이콘**을 선택하고 **Create new connection**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_09_CreateNewConnection.png' | relative_url }}" alt="새 연결 생성 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 연결 생성</figcaption></figure>

1. **Create**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_10_SelectCreate.png' | relative_url }}" alt="Create 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Create 선택</figcaption></figure>

1. 로그인한 계정을 선택하고 **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_11_SelectNext.png' | relative_url }}" alt="Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Next 선택</figcaption></figure>

1. **Work IQ Calendar (Preview)** 도구에 대해 지원되는 작업 목록이 표시됩니다. **Confirm**을 선택해 도구를 추가합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_12_ReviewAndConfirm.png' | relative_url }}" alt="Confirm 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>확인 선택</figcaption></figure>

1. 도구가 추가되었습니다. **Preview**를 선택하고 **+ New chat**으로 새 테스트 세션을 시작합니다. 다음 텍스트를 입력하고 제출합니다:

    ```text
    Send an employment agreement and offer letter to [employee name], [email address]
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_13_TestWorkIQCalendarTool.png' | relative_url }}" alt="Work IQ Calendar 도구 테스트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>도구 테스트</figcaption></figure>

1. 다음으로 오케스트레이터가 **Docusign MCP Demo** 도구를 호출해 워크플로우와 워크플로우 트리거 요구사항을 검색합니다. 이전 연습과 동일한 단계를 반복해 자리 표시자를 바꾼 뒤 정보를 에이전트에 제출합니다.

    "2 영업일 전에 미팅을 생성한다"는 지시가 지켜지는지 확인하려면 월요일이나 화요일에 해당하는 유효 날짜(effective date)와 시작일(start date)을 사용하세요.

    ```text
    employee position is [position], effective date and start date is [MMMM d], salary is [salary dollar amount], reporting to [manager full name] [manager email address], and due signed date is [MMMM d]
    ```

1. 워크플로우 트리거에 필요한 정보를 제공하면 오케스트레이터가 워크플로우가 성공적으로 트리거되었음을 확인한 뒤 기술을 처리하며, **Work IQ Calendar (Preview)** 도구를 호출해 유효 날짜 2 영업일 전에 Outlook 미팅을 생성합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_14_LoadedSkill.png' | relative_url }}" alt="로드된 기술" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>기술 로드</figcaption></figure>

1. Outlook 미팅이 생성된 후 요약이 제공됩니다.

    먼저 워크플로우가 성공적으로 트리거되었다는 확인이 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_15_CompletionOfWorkflowAndOutlookMeeting.png' | relative_url }}" alt="워크플로우 및 Outlook 미팅 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>완료 확인</figcaption></figure>

1. 두 번째 확인으로 생성된 Outlook 미팅 세부 정보가 제공됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_16_ConfirmationOfOutlookMeeting.png' | relative_url }}" alt="Outlook 미팅 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>미팅 확인</figcaption></figure>

1. Outlook 캘린더로 이동해 미팅 초대를 확인합니다. 아래 스크린샷에서 미팅이 화요일 유효 날짜 2 영업일 전인 금요일에 생성되었습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_17_OutlookCalendar.png' | relative_url }}" alt="Outlook 캘린더에서 미팅 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Outlook 캘린더</figcaption></figure>

1. 테스트 세션에서 기술 세부 정보를 확장해 오케스트레이터가 적용한 추론을 더 자세히 살펴볼 수도 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_18_AgentReasoningUsingSkill.png' | relative_url }}" alt="기술을 사용한 에이전트 추론" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 추론</figcaption></figure>

1. 워크플로우 프로세스를 완료하면 서명된 문서가 다시 SharePoint에 업로드됩니다.

## ✅ 미션 완료

축하합니다, 에이전트 - **Operation Docusign MCP**를 완료했습니다! 이제 다음 기술을 마스터했습니다:

✅ **워크플로우 기반**: Docusign Web Form을 빌드하고, 재사용 가능한 문서 템플릿을 생성하며, 엔드-투-엔드 Workflow Builder 프로세스를 구성했습니다.

✅ **프로세스 검증**: 실제 인스턴스를 실행해 참가자 입력을 수집하고, 서명을 캡처하며, 문서 전송을 확인하는 방식으로 워크플로우를 수동으로 테스트했습니다.

✅ **에이전트 통합**: 맞춤형 Copilot Studio 에이전트를 빌드하고 Docusign MCP Demo 도구를 연결해 자연어로 Workflow Builder를 트리거했습니다.

✅ **입력 중심 오케스트레이션**: 대화형 프롬프트를 통해 워크플로우 시작 변수를 제공하고 성공적인 워크플로우 호출을 검증했습니다.

✅ **멀티-MCP 확장 (보너스)**: Work IQ Calendar (Preview)를 추가해 하나의 에이전트 경험에서 Microsoft 1st-party와 서드파티 MCP 도구를 결합했습니다.

## 🏅 완료 배지 받기

축하합니다, 에이전트 - 미션 완료! 이제 배지를 받을 시간입니다.

배지 요청 양식을 제출하고 필요한 모든 질문에 답하세요:

[https://aka.ms/agent-academy-special-ops/docusign-mcp/form](https://aka.ms/agent-academy-special-ops/docusign-mcp/form)

제출이 검토되면 Global AI Community에서 배지 수령 방법에 대한 이메일을 받게 됩니다.

<div class="info-box note" markdown="1">

**팁**: 이메일이 보이지 않으면 스팸 또는 정크 폴더를 확인하세요.

</div>

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/Academy-Docusign_Badge.png' | relative_url }}" alt="Docusign 완료 배지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Docusign 완료 배지</figcaption></figure>

## 📚 전술 자료

🔗 [개발자를 위한 Docusign](https://developers.docusign.com)

🔗 [개발자 계정 만들기](https://www.docusign.com/developers/sandbox)

🔗 [Docusign MCP 서버로 빌드하기](https://developers.docusign.com/platform/mcp-server/microsoft-copilot)

🔗 [Docusign MCP 개요](https://support.docusign.com/s/document-item?language=en_US&bundleId=ug3906200f-95c6-4a6b-90b1-f928c85961c6&topicId=con1438e5dd-ae84-435f-8b2e-028117782a6d.html&_LANG=enus)

🔗 [Docusign 계정을 Copilot Studio에 연결하기](https://support.docusign.com/s/document-item?language=en_US&elqTrackId=92dab223e52c434bb4d719365ec42701&elqTrack=true&bundleId=ug3906200f-95c6-4a6b-90b1-f928c85961c6&topicId=tsk6894353c-47ad-4dc9-8867-8a26ea379a65.html&_LANG=enus)

📖 [Microsoft MCP 서버 인증](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-certification)

📖 [Docusign MCP Demo 커넥터 (Microsoft Learn)](https://learn.microsoft.com/en-us/connectors/docusignmcpdemo/)
