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
source_published: "2026-06-16"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/docusign-mcp/"
image: "/assets/academy/special-ops-docusign-mcp/0.0_02_SolutionDiagram.png"
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

Web Forms를 통해 조직은 안전한 브라우저 기반 양식을 통해 정보를 수집할 수 있으며, 이는 계약과 워크플로우에 자동으로 데이터를 입력할 수 있습니다.

1. Docusign 개발자 포털 홈 페이지에서 **Templates**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_01_Templates.png' | relative_url }}" alt="Templates 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Templates 선택</figcaption></figure>

1. 왼쪽 탐색 패널에서 **Start**를 선택합니다. **Web Forms**를 선택한 후 **Create Web Form**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_02_CreateWebForm.png' | relative_url }}" alt="Create Web Forms 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Form 생성</figcaption></figure>

1. Web Form 생성 방법을 선택합니다. **Start From Scratch**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_03_StartFromScratch.png' | relative_url }}" alt="Start from Scratch 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>처음부터 시작</figcaption></figure>

1. Web Form 이름을 입력합니다:

    ```text
    Request for your contact information
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_04_NameWebForm.png' | relative_url }}" alt="Web Form 이름 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Form 이름 입력</figcaption></figure>

1. Web Form 디자이너가 나타납니다. 기본적으로 3페이지 — Welcome page, Untitled page, Thank you page — 가 있습니다.

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

    **Page title**: `Your name`

    **Page subtitle**: `Please provide us with your name`

    **API reference name**: `Step_CandidateName`

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_06_YourNamePage.png' | relative_url }}" alt="Your Name 페이지 세부 정보 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Your Name 페이지</figcaption></figure>

1. 페이지 제목 섹션 아래의 **plus 아이콘**을 선택해 필드를 추가합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_07_AddField.png' | relative_url }}" alt="필드 추가를 위한 plus 아이콘 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>필드 추가</figcaption></figure>

1. **Text Field**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_08_SelectTextField.png' | relative_url }}" alt="Text Field 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Text Field 선택</figcaption></figure>

1. 다음 속성으로 필드를 업데이트합니다:

    | Field name    | Field description | Required field | API reference name    |
    |---------------|-------------------|----------------|-----------------------|
    | `First Name`  | `Your first name` | Yes            | `TextBox_FirstName`   |

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_09_FirstNameField.png' | relative_url }}" alt="필드 속성 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>First Name 필드 속성</figcaption></figure>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_10_FirstNameField.png' | relative_url }}" alt="필드 속성 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>First Name 필드 설정</figcaption></figure>

1. 다음 속성으로 나머지 **Text Fields**를 추가합니다:

    | Field name    | Field description  | Required field | API reference name   |
    |---------------|--------------------|----------------|----------------------|
    | `Middle Name` | `Your middle name` | No             | `TextBox_MiddleName` |
    | `Surname`     | `Your surname`     | Yes            | `TextBox_Surname`    |
    | `Full Name`   | `Your full name`   | Yes            | `TextBox_FullName`   |

    Text Fields를 추가한 후 왼쪽 패널의 **plus 아이콘**을 선택하고 **New Blank Page**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_12_AddNewBlankPage.png' | relative_url }}" alt="New Blank Page 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 빈 페이지 추가</figcaption></figure>

1. 새 페이지의 다음 필드를 업데이트합니다:

    **Page title**: `Address`

    **Page subtitle**: `Please provide us with your physical address`

    **API reference name**: `Step_CandidateAddress`

    다음 속성으로 나머지 **Text Fields**를 추가합니다:

    <div class="info-box note" markdown="1">
    **참고**: 아래 표는 일반적인 주소 형식을 보여줍니다. 조정할 수 있지만 나중 단계에서 필요하므로 변경 사항을 추적하세요. 이후 단계의 문제를 피하려면 다음 주소 형식을 사용하세요.
    </div>

    | Field name       | Field description | Required field | API reference name      |
    |------------------|-------------------|----------------|-------------------------|
    | `Address Line 1` | `Street Address`  | Yes            | `TextBox_AddressLine1`  |
    | `Address Line 2` | `Suburb/District` | Yes            | `TextBox_AddressLine2`  |
    | `City`           | `City`            | Yes            | `TextBox_City`          |
    | `Post Code`      | `Post Code`       | Yes            | `TextBox_PostCode`      |

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_13_AddressPage.png' | relative_url }}" alt="Address 페이지 세부 정보 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Address 페이지</figcaption></figure>

1. Text Fields를 추가한 후 왼쪽 패널에서 **Thank you page**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_14_FieldsAddedToAddressPage.png' | relative_url }}" alt="Thank you page 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Address 페이지 필드 추가 완료</figcaption></figure>

1. **Thank you page**의 다음 필드를 업데이트합니다:

    **Page title**: `✨ Thank you`

    **Page subtitle**: `We've received your form. Expect an email soon with documents to sign.`

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_15_ThankYouPageDetails.png' | relative_url }}" alt="Thank you page 세부 정보 업데이트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Thank you page 세부 정보</figcaption></figure>

1. Web Form 구성이 완료되었습니다. 최종 사용자 뷰를 보려면 **Preview**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_16_PreviewWebForm.png' | relative_url }}" alt="Preview 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Form 미리보기</figcaption></figure>

1. 이름을 입력하고 **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_17_CompleteYourNamePage.png' | relative_url }}" alt="Your Name 페이지 완성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>이름 페이지 완성</figcaption></figure>

1. **Address page**를 완성하고 **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_19_CompleteAddressPage.png' | relative_url }}" alt="Address 페이지 완성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>주소 페이지 완성</figcaption></figure>

1. 오류가 나타날 것입니다 — 미리보기 모드이기 때문에 정상입니다. **Create**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_22_Error.png' | relative_url }}" alt="Create 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>미리보기 모드 오류 (정상)</figcaption></figure>

1. Web Form을 활성화합니다. 디자이너 오른쪽 상단에서 **Activate**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_23_Activate.png' | relative_url }}" alt="Activate 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Form 활성화</figcaption></figure>

1. **Access setting** 필드가 있는 확인 모달이 나타납니다. 이후 랩에서 워크플로우 단계에서 사용될 것이므로 **Public**으로 두고 **Activate**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_24_Activate.png' | relative_url }}" alt="Activate 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>활성화 확인</figcaption></figure>

1. Web Form이 성공적으로 활성화되었다는 확인 메시지가 나타납니다. **Go to Web Forms**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_25_GoToWebForms.png' | relative_url }}" alt="Go to Web Forms 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Forms로 이동</figcaption></figure>

1. Web Form이 **Active** 상태로 표시됩니다. Web Form 빌드를 성공적으로 완료했습니다 👏

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.1_26_ActiveWebForm.png' | relative_url }}" alt="Active 상태의 Web Form" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>활성 Web Form</figcaption></figure>

## 🧪 1.2 문서 템플릿 생성

문서 템플릿은 계약 전송을 위한 재사용 가능한 설정으로 문서, 수신자 역할, 라우팅 순서, 메시지를 사전 정의할 수 있습니다.

이 랩 연습에서 두 가지 문서 템플릿을 만듭니다:

1. 고용 계약서
1. 직원 제안서

두 샘플 파일은 Docusign 개발자 포털의 Templates 섹션에서 다운로드할 수 있습니다.

1. **Templates**로 이동하고 왼쪽 메뉴에서 **Document Templates**를 선택합니다. **Create**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_01_SelectDocumentTemplates.png' | relative_url }}" alt="새 문서 템플릿 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>문서 템플릿 생성</figcaption></figure>

1. **Upload**를 선택해 파일을 업로드합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_02_SelectUpload.png' | relative_url }}" alt="Upload 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>파일 업로드</figcaption></figure>

1. **Sample Employment Agreement** 파일을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_03_SelectSampleEmploymentAgreement.png' | relative_url }}" alt="Sample Employment Agreement 파일 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>고용 계약서 샘플 선택</figcaption></figure>

1. **Name** 필드는 파일 이름으로 자동 채워집니다. **Agreement Type** 필드에서 **chevron 아이콘**을 선택하고 **Human Resources** 목록으로 스크롤해 **Offer Letter**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_04_AgreementType.png' | relative_url }}" alt="Offer Letter 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>계약 유형 선택</figcaption></figure>

1. **Fields** 왼쪽 패널에서 **Sender 1** 옆의 **chevron 아이콘**을 선택하고 **Edit recipients**를 선택합니다.

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

1. **Sender** 역할로 전환하고 `{EffectiveDate}` 플레이스홀더를 강조 표시한 후 왼쪽 메뉴에서 **Effective Date** 표준 필드를 선택합니다.

    <div class="info-box note" markdown="1">
    **참고**: 샘플 문서의 파란색 텍스트는 필드를 추가할 플레이스홀더를 나타냅니다. 이는 학습 목적으로만 사용되며 실제 프로덕션 템플릿에는 파란색 텍스트가 없습니다.
    </div>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_08_EffectiveDate.png' | relative_url }}" alt="Effective Date 필드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Effective Date 필드 추가</figcaption></figure>

1. `{EmployeeFullName}` 플레이스홀더를 강조 표시하고 **Fields** 패널의 **+ 아이콘**을 선택한 후 **Field**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_10_AddedEmployeeFullNameCustomField.png' | relative_url }}" alt="Employee Full Name 사용자 정의 필드 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>커스텀 필드 추가</figcaption></figure>

1. **Field Name**에 `Employee Full Name`을 입력하고 **+ 아이콘**을 선택해 새 사용자 정의 필드를 만듭니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_11_CreateEmployeeFullNameCustomField.png' | relative_url }}" alt="Employee Full Name 새 사용자 정의 필드 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>커스텀 필드 생성</figcaption></figure>

1. **Field Description**에 `The full name of the employee`를 입력하고 **Required Field** 옵션을 활성화합니다. **Field type**은 **Text**로 유지합니다.

1. 나머지 사용자 정의 필드를 추가하기 위해 같은 단계를 반복합니다:

    | Placeholder              | Field name             | Field description                      | Required field | Field Type         |
    |--------------------------|------------------------|----------------------------------------|----------------|--------------------|
    | **{EmployeePosition}**   | `Employee Position`    | `Position the employee is fulfilling`  | Yes            | Text               |
    | **{EmployeeStartDate}**  | `Start Date`           | `The start date of the employee`       | Yes            | Date               |
    | **{SalaryAmount}**       | `Salary`               | `The salary of the employee`           | Yes            | Text               |

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_14_CreateRemainingCustomFields.png' | relative_url }}" alt="나머지 사용자 정의 필드 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>나머지 커스텀 필드</figcaption></figure>

1. **Hiring Manager** 역할로 전환하고 `{ManagerSignature}` 플레이스홀더를 강조 표시한 후 **Fields** 패널에서 **Signature**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_17_AddSignatureField.png' | relative_url }}" alt="Hiring Manager 서명 필드 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>서명 필드 추가</figcaption></figure>

1. **Hiring Manager**와 **Employee** 역할의 나머지 필드를 추가합니다:

    | Role            | Placeholder                          | Field       |
    |-----------------|--------------------------------------|-------------|
    | Hiring Manager  | **{ManagerFullNameSignature}**       | Name        |
    | Hiring Manager  | **{ManagerSignedDateSignature}**     | Date Signed |
    | Employee        | **{EmployeeSignature}**              | Signature   |
    | Employee        | **{EmployeeFullNameSignature}**      | Name        |
    | Employee        | **{EmployeeSignedDateSignature}**    | Date Signed |

1. 오른쪽 상단에서 **Save as Draft**를 선택합니다. 그런 다음 **ellipsis 아이콘 (...)**을 선택하고 **Publish**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_21_PublishDocumentTemplate.png' | relative_url }}" alt="문서 템플릿 게시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>문서 템플릿 게시</figcaption></figure>

1. 이제 **Sample Offer Letter** 파일을 사용해 두 번째 문서 템플릿을 만듭니다. **+ Create new**를 선택합니다.

    이전 단계를 반복해 **Sample Offer Letter** 파일을 업로드하고 **Offer Letter**를 Agreement Type으로 선택합니다.

    다음 필드와 역할을 구성합니다 (이전과 동일한 방식):

    - **Hiring Manager**와 **Employee** 역할 생성
    - 제공된 테이블에 따라 Sender 역할의 플레이스홀더에 필드 매핑
    - Hiring Manager와 Employee 역할의 서명 필드 추가

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.2_32_Published.png' | relative_url }}" alt="Sample Offer Letter 게시됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Offer Letter 템플릿 게시 완료</figcaption></figure>

## 🧪 1.3 Docusign Workflow Builder 워크플로우 생성

HR 시나리오를 위해 다음을 처리해야 합니다:

- 고용 계약서와 제안서 전송
- 후보자가 서명하도록 함
- 그런 다음 관리자가 서명
- 최종 문서를 SharePoint에 저장

Workflow Builder가 이 모든 것을 수동 처리 대신 자동화할 수 있습니다. 빌드해 봅시다. 🏗️

1. **Agreements**로 이동하고 **Workflows**를 선택합니다. **Create Workflow**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_01_CreateWorkflow.png' | relative_url }}" alt="Workflows 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 생성</figcaption></figure>

1. **+Blank Workflow**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_02_BlankWorkflow.png' | relative_url }}" alt="Blank Workflow 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>빈 워크플로우 선택</figcaption></figure>

1. **ellipsis (...)** 아이콘을 선택하고 **Rename**을 선택해 워크플로우 이름을 지정합니다.

1. 다음 이름을 입력하고 **Save**를 선택합니다:

    ```text
    Send employment agreement and offer letter workflow
    ```

1. **Add workflow start**를 선택합니다. 이 단계에서 워크플로우가 시작되는 방식을 결정합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_05_AddWorkflowStart.png' | relative_url }}" alt="Add workflow start 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 시작 추가</figcaption></figure>

1. **From an API Call**을 선택해 Microsoft Copilot Studio에서 빌드한 에이전트가 Docusign MCP Demo 서버를 통해 워크플로우를 호출할 수 있도록 합니다. **Apply**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_06_WorkflowStartMethod.png' | relative_url }}" alt="워크플로우 시작 방법" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>API 호출로 시작</figcaption></figure>

1. 워크플로우 입력 매개변수 역할을 하는 변수를 추가합니다. 다음 변수를 만듭니다:

    | Variable type | Value                       |
    |:--------------|:----------------------------|
    | Text          | `Employee Full Name`        |
    | Email         | `Employee Email`            |
    | Text          | `Employee Position`         |
    | Date          | `Effective Date`            |
    | Text          | `Salary`                    |
    | Text          | `Hiring Manager Full Name`  |
    | Email         | `Hiring Manager Email`      |
    | Date          | `Due Signed Date`           |
    | Date          | `Start Date`                |

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_09_WorkflowStartVariables.png' | relative_url }}" alt="워크플로우 시작 변수" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 시작 변수</figcaption></figure>

1. API 호출 트리거 방법을 정의합니다. **Automated process**를 선택합니다. **Apply**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_11_SelectAutomatedProcess.png' | relative_url }}" alt="Automated process 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>자동화 프로세스 선택</figcaption></figure>

1. **Add a step**을 선택합니다.

1. **Set Up Invite**를 선택해 참가자를 워크플로우 단계에 추가합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_13_SetUpInvite.png' | relative_url }}" alt="Set Up Invite 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Set Up Invite</figcaption></figure>

1. **Configure**를 선택하고 **Add Participant**를 선택합니다.

1. **Employee** 역할 필드에 `Employee`를 입력하고 **Add**를 선택합니다. **Employee name**을 **Employee Full Name** 변수에 매핑하고 **Employee email**을 **Employee Email** 변수에 매핑합니다. **Apply**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_20_Apply.png' | relative_url }}" alt="Apply 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Set Up Invite 구성 완료</figcaption></figure>

1. **Add a step**을 선택하고 **Collect Data with Web Forms**를 선택합니다. **Configure**를 선택합니다.

1. **Request for contact information** Web Form을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_24_ChooseForm.png' | relative_url }}" alt="Web Form 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Web Form 선택</figcaption></figure>

1. **Employee** 참가자를 선택하고 **Full Name** 필드를 **Employee Full Name** 변수에 매핑합니다. **Apply**를 선택합니다.

1. **Add a step**을 선택하고 **Prepare a Document Template** 단계를 선택합니다.

1. **Step Name**을 `Generate Document - Employment Agreement`로 변경하고 **Sample Employment Agreement** 문서 템플릿을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_33_SelectSampleEmploymentAgreement.png' | relative_url }}" alt="Sample Employment Agreement 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>고용 계약서 템플릿 선택</figcaption></figure>

1. 다음 테이블에 따라 계약 필드를 매핑합니다:

    | Agreement Field    | Workflow Component           | Component Field      |
    |:-------------------|:-----------------------------|:---------------------|
    | Effective Date     | Variables from Workflow Start| Effective Date       |
    | Employee Full Name | Collect Data with Web Forms  | Full Name            |
    | Employee Position  | Variables from Workflow Start| Employee Position    |
    | Start Date         | Variables from Workflow Start| Start Date           |
    | Salary             | Variables from Workflow Start| Salary               |

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_37_AgreementFieldsConfigured.png' | relative_url }}" alt="계약 필드 구성 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>계약 필드 매핑</figcaption></figure>

1. 파일 이름을 구성합니다. **Use variables to customize a title**를 선택하고 Web Form의 **Full Name**, **Effective Date**를 사용한 후 `_EmploymentAgreement` 텍스트를 추가합니다. 파일 형식을 **.pdf**로 업데이트합니다. **Apply**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_40_TitleBuilderFieldConfigured.png' | relative_url }}" alt="제목 빌더 필드 구성 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>파일 이름 구성</figcaption></figure>

1. 두 번째 문서 템플릿 **Sample Offer Letter**를 추가하기 위해 동일한 과정을 반복합니다. **Step Name**을 `Generate Document - Offer Letter`로 지정하고 해당 테이블에 따라 필드를 매핑합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_44_ConfigureAgreementFields.png' | relative_url }}" alt="계약 필드 구성 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Offer Letter 필드 매핑</figcaption></figure>

1. **Add a step**을 선택하고 **Send Documents for Signature**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_47_SendDocumentsForSignature.png' | relative_url }}" alt="Send Documents for Signature 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>서명을 위한 문서 전송</figcaption></figure>

1. 생성된 두 문서를 선택하고 서명 순서를 설정합니다: **Employee**를 1, **Hiring Manager**를 2로 설정합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_54_SetASigningOrder.png' | relative_url }}" alt="서명 순서 설정 활성화" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>서명 순서 설정</figcaption></figure>

1. **Hiring Manager** 참가자를 추가하고 이름과 이메일을 Workflow Start 변수에 매핑합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_62_MapHiringManagerEmail.png' | relative_url }}" alt="Hiring Manager 이메일 매핑" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Hiring Manager 이메일 매핑</figcaption></figure>

1. 메시지를 구성합니다:

   제목: `Complete with Docusign: Employment Agreement and Offer Letter`

   메시지: `Please review and sign the Employment Agreement and Offer Letter.`

   **Apply**를 선택합니다.

1. **Add a step**을 선택하고 **Show a Confirmation Screen**을 선택합니다. **Employee** 참가자를 선택하고 **Apply**를 선택합니다.

1. App Center에서 SharePoint를 설치하고 SharePoint 계정에 연결합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_70_SelectAppCenter.png' | relative_url }}" alt="App Center 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>App Center</figcaption></figure>

1. SharePoint 단계에서 **Combined Envelope File** 변수를 선택하고 SharePoint 사이트, 드라이브, 폴더를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_82_SelectCombinedEnvelopFile.png' | relative_url }}" alt="Combined Envelope File 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Combined Envelope File 선택</figcaption></figure>

1. 파일 이름을 `env` + **Envelope ID** + `_` + **Full Name** (Web Form에서)으로 구성합니다. **Apply**를 선택합니다.

1. 워크플로우를 게시합니다. **Review & Publish**를 선택하고 단계를 따라 완료합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.3_105_WorkflowPublished.png' | relative_url }}" alt="워크플로우 게시됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 Published 상태</figcaption></figure>

## 🧪 1.4 워크플로우 테스트

Copilot Studio에서 에이전트를 빌드하기 전에 워크플로우를 실행해 테스트하는 것이 좋습니다.

1. 워크플로우를 열고 오른쪽 상단에서 **Start Instance**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_01_StartInstance.png' | relative_url }}" alt="Start Instance 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 인스턴스 시작</figcaption></figure>

1. 샘플 데이터로 필드를 채웁니다 (직원과 채용 관리자에게 접근할 수 있는 두 가지 다른 이메일 주소 사용).

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_02_EnterValuesForWorkflowStartVariables.png' | relative_url }}" alt="워크플로우 시작 변수에 값 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 시작 변수 입력</figcaption></figure>

1. **Start**를 선택합니다.

1. Employee 참가자 이메일 받은 편지함으로 이동해 Docusign 이메일을 열고 Web Form을 완성한 후 문서에 서명합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_05_SelectReview.png' | relative_url }}" alt="Review 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>이메일에서 Review 선택</figcaption></figure>

1. Web Form을 완성하고 고용 계약서와 제안서에 서명합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_13_AdoptAndSign.png' | relative_url }}" alt="Adopt and Sign 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>서명 채택 및 서명</figcaption></figure>

1. Hiring Manager 참가자 이메일로 이동해 문서에 서명합니다.

1. 서명된 문서가 SharePoint에 업로드되었는지 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.4_22_SignedDocumentAgreementsUploadedToSharePoint.png' | relative_url }}" alt="서명된 문서 SharePoint에 업로드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>SharePoint에 업로드된 서명 문서</figcaption></figure>

엔드투엔드 수동 워크플로우 테스트를 완료했습니다. 🎉

## 🧪 1.5 Microsoft Copilot Studio에서 맞춤형 에이전트 빌드, Docusign MCP Demo 연결, 워크플로우 트리거

### 사전 요구사항

- **새 솔루션**: 에이전트를 만들기 전에 새 솔루션을 만드세요.
- **새 환경 사용**: 이 랩은 새 Copilot Studio 환경을 의도적으로 사용합니다. Docusign MCP Demo 도구를 사용하려면 **New Experience**를 켜세요.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_00_ToggleNewExperience.png' | relative_url }}" alt="새 환경 토글" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 환경 활성화</figcaption></figure>

1. [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com)으로 이동해 Microsoft 365 직장 또는 학교 계정으로 로그인합니다.

1. 개발자 환경에 있는지 확인하고 **Agent**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_01_SelectAgent.png' | relative_url }}" alt="빈 에이전트 생성" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 생성</figcaption></figure>

1. 다음을 에이전트 이름으로 입력합니다:

   ```text
   Offer Management Agent
   ```

   다음을 에이전트 Instructions로 입력합니다:

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

   **Tools** 아래에서 오른쪽 패널의 **plus 아이콘**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_02_AgentNameInstructionsAddTool.png' | relative_url }}" alt="Tools 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 이름, Instructions 입력 및 도구 추가</figcaption></figure>

1. **Model Context Protocol (MCP)** 카테고리를 선택해 MCP 도구 목록을 필터링합니다. 스크롤을 내려 **Docusign MCP Demo**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_03_SelectDocusignMCPDemo.png' | relative_url }}" alt="Docusign MCP Demo 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Docusign MCP Demo 선택</figcaption></figure>

    <div class="info-box note" markdown="1">
    **경고**: 새 UI에서 `Docusign MCP Demo`나 `docusign`으로 검색하면 **Docusign MCP**(프로덕션 도구)가 반환될 수 있습니다. Docusign MCP를 선택하지 마세요. 검색 필드를 지우고 스크롤해 **Docusign MCP Demo**를 선택하세요.
    </div>

1. **Docusign MCP Server**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_04_SelectDocusignMCPServer.png' | relative_url }}" alt="Docusign MCP Server 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Docusign MCP Server 선택</figcaption></figure>

1. **chevron 아이콘**을 선택하고 **Create new connection**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_05_SelectCreateNewConnection.png' | relative_url }}" alt="새 연결 생성 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 연결 생성</figcaption></figure>

1. **Create**를 선택하고 Docusign 개발자 계정 자격 증명을 입력합니다.

1. 연결이 생성되면 녹색 체크 아이콘이 표시됩니다. **Next**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_08_ConnectionCreated.png' | relative_url }}" alt="Next 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 생성 완료</figcaption></figure>

1. Docusign MCP Demo 도구의 지원되는 액션 목록이 표시됩니다. **Confirm**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_09_ReviewDocusignMCPDemoCapabilities.png' | relative_url }}" alt="Confirm 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Docusign MCP Demo 기능 검토</figcaption></figure>

1. 에이전트를 저장하고 테스트합니다. **Preview** 탭을 선택하고 다음을 입력합니다:

   ```text
   Send an employment agreement and offer letter to [employee name], [email address]
   ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_12_TestOfferManagementAgent.png' | relative_url }}" alt="에이전트 테스트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Offer Management Agent 테스트</figcaption></figure>

1. 오케스트레이터가 **Docusign MCP Demo** 도구를 사용해 워크플로우 요구사항을 찾습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_13_OrchestratorInProgress.png' | relative_url }}" alt="오케스트레이터 진행 중" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>오케스트레이터 진행 중</figcaption></figure>

1. 에이전트가 필요한 정보 제공을 요청합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_14_WorkflowTriggerRequirementsIdentified.png' | relative_url }}" alt="워크플로우 트리거 요구사항 확인됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 트리거 요구사항</figcaption></figure>

1. 필요한 정보를 자연어로 제공합니다:

   ```text
   employee position is [position], effective date and start date is [MMMM d], salary is [salary dollar amount], reporting to [manager full name] [manager email address], and due signed date is [MMMM d]
   ```

1. 에이전트가 정보 요약을 제공하고 확인을 요청합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_16_ReviewMappedInformation.png' | relative_url }}" alt="매핑된 정보 검토" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>정보 검토 및 확인</figcaption></figure>

1. `Yes, information is correct.`를 입력하면 오케스트레이터가 워크플로우를 트리거합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.5_18_WorkflowSuccessfullyTriggered.png' | relative_url }}" alt="워크플로우 성공적으로 트리거됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 트리거 성공</figcaption></figure>

1. 이전과 동일한 워크플로우 완료 단계를 따릅니다 (Employee, Hiring Manager 서명, SharePoint 업로드 확인).

**축하합니다!** 🥳 **Docusign MCP Demo** 도구를 통해 에이전트에서 Workflow Builder 워크플로우를 호출하는 방법을 배웠습니다.

## 🧪🌟 1.6 보너스 - Work IQ Calendar 도구 추가 (멀티-MCP 기능)

테넌트에서 Frontier 기능이 활성화된 경우, 첫 번째 Microsoft MCP 서버(Work IQ Calendar)와 서드파티 서비스 MCP 서버(Docusign MCP Demo)를 결합하는 이 보너스 연습을 시도해 보세요.

에이전트는 HR 사전 온보딩 체크리스트를 검토하기 위한 Outlook 회의를 자동으로 생성하도록 업데이트됩니다.

1. 에이전트 Instructions에 Workflow Builder 워크플로우가 성공적으로 트리거된 후 Outlook 회의를 예약하도록 추가합니다:

   ```text
   When the workflow has successfully been triggered, schedule an Outlook meeting.
   ```

1. Instructions에 스케줄링 섹션을 추가합니다:

   ```text
   ## Schedule Outlook meeting
   When the workflow has successfully been triggered, use the `outlook-pre-onboarding-checklist-meeting` skill to create the Outlook meeting.
   ```

1. 샘플 스킬 패키지를 다운로드하고 업로드합니다 (`sample-skill-outlook-pre-onboarding-checklist-meeting.zip`).

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_06_SkillAdded.png' | relative_url }}" alt="스킬 추가됨" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>스킬 추가 완료</figcaption></figure>

1. **Work IQ Calendar (Preview)** 도구를 추가합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_08_SelectWorkIQCalendar.png' | relative_url }}" alt="Work IQ Calendar (Preview) 도구 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Work IQ Calendar 도구 선택</figcaption></figure>

1. 에이전트를 테스트합니다. 워크플로우가 성공적으로 트리거되면 오케스트레이터가 스킬을 처리하고 **Work IQ Calendar (Preview)** 도구를 호출해 유효 날짜 2영업일 전에 Outlook 회의를 만듭니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_15_CompletionOfWorkflowAndOutlookMeeting.png' | relative_url }}" alt="워크플로우 및 Outlook 회의 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>워크플로우 및 Outlook 회의 완료</figcaption></figure>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_16_ConfirmationOfOutlookMeeting.png' | relative_url }}" alt="Outlook 회의 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Outlook 회의 생성 확인</figcaption></figure>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/1.6_17_OutlookCalendar.png' | relative_url }}" alt="Outlook 캘린더의 회의 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Outlook 캘린더 회의</figcaption></figure>

## ✅ 미션 완료

축하합니다, 에이전트 — **Operation Docusign MCP** 완료! 이제 다음 스킬을 마스터했습니다:

✅ **워크플로우 기반 구축**: Docusign Web Form을 빌드하고, 재사용 가능한 문서 템플릿을 만들고, 전체 Workflow Builder 프로세스를 엔드투엔드로 조합했습니다.

✅ **프로세스 검증**: 실제 인스턴스를 실행하고, 참가자 입력을 수집하고, 서명을 획득하고, 문서 전달을 확인해 워크플로우를 수동으로 테스트했습니다.

✅ **에이전트 통합**: 커스텀 Copilot Studio 에이전트를 빌드하고 Docusign MCP Demo 도구를 연결해 자연어에서 Workflow Builder를 트리거했습니다.

✅ **입력 지향 오케스트레이션**: 대화형 프롬프트를 통해 워크플로우 시작 변수를 제공하고 성공적인 워크플로우 호출을 검증했습니다.

✅ **멀티-MCP 확장 (보너스)**: Work IQ Calendar (Preview)를 추가해 하나의 에이전트 경험에서 첫 번째 Microsoft와 서드파티 MCP 도구를 결합했습니다.

## 🏅 완료 배지 받기

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-docusign-mcp/Academy-Docusign_Badge.png' | relative_url }}" alt="Docusign MCP Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Docusign MCP Badge</figcaption></figure>

배지 요청 양식을 제출하고 모든 필수 질문에 답하세요:

[https://aka.ms/agent-academy-special-ops/docusign-mcp/form](https://aka.ms/agent-academy-special-ops/docusign-mcp/form)

제출이 검토되면 Global AI Community에서 배지 수령 안내 이메일을 받게 됩니다.

<div class="info-box note" markdown="1">
**팁**: 이메일이 보이지 않으면 스팸 또는 정크 폴더를 확인하세요.
</div>

## 📚 전술 자료

🔗 [개발자를 위한 Docusign](https://developers.docusign.com)

🔗 [개발자 계정 생성](https://www.docusign.com/developers/sandbox)

🔗 [Docusign MCP Server로 빌드](https://developers.docusign.com/platform/mcp-server/microsoft-copilot)

🔗 [Docusign MCP 개요](https://support.docusign.com/s/document-item?language=en_US&bundleId=ug3906200f-95c6-4a6b-90b1-f928c85961c6&topicId=con1438e5dd-ae84-435f-8b2e-028117782a6d.html&_LANG=enus)

📖 [Microsoft MCP 서버 인증](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-certification)

📖 [Docusign MCP Demo 커넥터 (Microsoft Learn)](https://learn.microsoft.com/en-us/connectors/docusignmcpdemo/)
