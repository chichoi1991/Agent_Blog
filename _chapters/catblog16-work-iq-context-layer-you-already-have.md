---
layout: "chapter"
date: 2026-08-24
title: "Work IQ: 사용 방식, 라이선싱, 통제 방법"
short_title: "Work IQ 사용·라이선싱·통제"
description: "Work IQ가 어떻게 사용되는지, Copilot Credit이 언제 소비되는지, Microsoft 365와 Power Platform 관리 센터에서 통제를 어떻게 구성하는지 설명합니다."
order: 16
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/work-iq-context-layer-you-already-have/"
source_author: "asfjordhoj"
source_published: "2026-08-24"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/work-iq-context-layer-you-already-have/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 asfjordhoj(@asfjordhoj) 원문 [Work IQ: How It's Used, Licensed, and Controlled](https://microsoft.github.io/mcscatblog/posts/work-iq-context-layer-you-already-have/)(2026-08-24)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/work-iq-context-layer-you-already-have/header.png' | relative_url }}" alt="이메일, 회의, 채팅, 파일을 연결하는 Work IQ와 나란히 동작하는 에이전트 용량 통제 및 사용자 지출 통제" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

[Work IQ](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq/)는 에이전트를 위한 Microsoft의 업무 지능(workplace intelligence) 레이어입니다. 사용자가 접근 권한을 가진 정보를 사용해, 이메일·회의·채팅·파일·연결된 비즈니스 시스템 전반의 업무를 에이전트가 이해하도록 돕습니다.

Work IQ는 Microsoft 365 Copilot 경험에 내장되거나, 에이전트가 도구로 사용하거나, 사용자 지정 애플리케이션이 API로 호출할 수 있습니다. 이름은 같지만 라이선싱과 청구 통제는 사용 방식에 따라 달라집니다.

이 가이드는 세 가지 실무 질문에 답합니다. Work IQ를 어떻게 사용하는지, 언제 Copilot Credit을 소비하는지, 그리고 그 사용량을 어디서 통제하는지입니다.

## 시나리오부터 시작하기

Microsoft 365 Copilot은 **근거 확보(grounding)**, 즉 업무 정보를 활용해 답변에 근거를 더하는 데 Work IQ를 사용합니다. 선언형 에이전트(declarative agent)는 지침·지식·작업을 통해 이 Copilot 경험을 사용자 지정합니다. Copilot Studio에서는 에이전트의 빌드·실행 경험인 **하네스(harness)**를 선택하고, **Model Context Protocol(MCP)**을 통해 Work IQ를 도구로 연결합니다.

아래 비교표는 **2026년 9월** [Copilot Credit 라이선싱 가이드](https://aka.ms/CopilotCredits/LicensingGuide)와 [Copilot Studio 라이선싱 가이드](https://go.microsoft.com/fwlink/?linkid=2320995)를 기준으로 합니다. 종량제(metered) 사용은 Copilot Credit으로 청구되는 사용을 의미합니다.

| 시나리오 | Work IQ 사용·구성 방식 | 라이선싱: 포함인가 종량제인가? |
| --- | --- | --- |
| 라이선스가 있는 사용자의 **Microsoft 365 Copilot** | 사용자가 업무 관련 질문을 합니다. Work IQ 근거 확보는 기본 내장되어 있어 별도 연결이 필요 없습니다. | 네이티브 Work IQ 근거 확보는 Microsoft 365 Copilot 경험에 포함됩니다. |
| [Agent Builder](https://learn.microsoft.com/microsoft-365-copilot/extensibility/agent-builder)로 만든 선언형 에이전트 | Agent Builder에서 SharePoint나 Copilot 커넥터 같은 지원되는 지식 원본을 선택합니다. 에이전트는 Copilot의 기본 근거 확보를 사용하며 별도 Work IQ 연결이 필요 없습니다. | Microsoft 채널에서 문서화된 조건과 공정 사용 기준에 따라, 자격을 갖춘 Microsoft 365 Copilot 라이선스 사용자에게 포함됩니다. |
| [Microsoft 365 Agents Toolkit](https://learn.microsoft.com/microsoft-365-copilot/extensibility/declarative-agent-tool-comparison)(프로코드)로 만든 선언형 에이전트 | 에이전트의 [매니페스트](https://learn.microsoft.com/microsoft-365/copilot/extensibility/declarative-agent-manifest-1.8)에 SharePoint, 이메일, Teams 메시지 등 필요한 Microsoft 365 기능을 선언합니다. 이것이 근거 확보를 구성하며 별도 Work IQ API·도구 연결이 필요 없습니다. | Microsoft 채널에서 문서화된 조건과 공정 사용 기준에 따라, 자격을 갖춘 Microsoft 365 Copilot 라이선스 사용자에게 포함됩니다. |
| **Cowork** | 사용자가 자신의 업무 맥락을 활용하는 작업을 시작합니다. Work IQ는 기본 내장되어 있어 별도 연결이 필요 없습니다. | Copilot Credit을 소비합니다. Microsoft 365 Copilot 라이선스**와** 사용량 기반 청구 활성화가 모두 필요합니다. |
| **Copilot Studio, 표준 하네스** | 통합 Work IQ 연동이 지원되지 않습니다. | 해당 없음. |
| **Copilot Studio, GitHub Copilot 하네스** | 통합 Work IQ MCP 도구를 추가합니다. 에이전트는 필요할 때 이를 호출합니다. | Microsoft 365 Copilot 라이선스가 있는 사용자를 포함해 Copilot Credit을 소비합니다. |
| **사용자 지정 클라이언트 또는 자체 솔루션** | 애플리케이션이 자체 경험에서 업무 맥락을 사용하기 위해 Work IQ API를 호출합니다. | Copilot Credit을 소비합니다. Microsoft 365 Copilot 라이선스는 필요 없지만, [해당 사용자에 대해 사용량 기반 청구가 활성화되어 있어야 합니다](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq/enable-work-iq#prerequisites). |

선언형 에이전트 행은 자격을 갖춘 Microsoft 365 Copilot 라이선스 사용자의 사용을 설명합니다. 해당 라이선스가 없는 사용자의 경우, SharePoint나 Copilot 커넥터 데이터에 접근하는 에이전트는 사용량 기반 청구가 활성화되어 있으면 Copilot Credit을 소비합니다. 이 요금은 별도의 Work IQ API 호출이 아니라 선언형 에이전트를 사용한 데 대한 것입니다. 이는 Agent Builder와 Agents Toolkit 중 어느 도구로 만든 에이전트든 동일하게 적용됩니다. [선언형 에이전트 라이선싱 안내](https://learn.microsoft.com/microsoft-365/copilot/extensibility/cost-considerations#declarative-agents)와 [작성 도구별 지원 사용자](https://learn.microsoft.com/microsoft-365/copilot/extensibility/declarative-agent-tool-comparison#tool-requirements-and-access)를 참고하세요.

## Work IQ 사용량을 관리하는 위치

Copilot Studio 에이전트가 Work IQ를 사용하면 두 세트의 통제가 병렬로 적용됩니다. **Power Platform 관리 센터(PPAC)**에서는 에이전트 환경의 용량과 사용 한도를 구성합니다. **Microsoft 365 관리 센터(MAC)**에서는 사용자의 Work IQ 지출 정책을 구성하며, 이는 Work IQ에 대한 접근과 지출 한도를 통제합니다. 하나를 구성한다고 다른 하나도 함께 구성되지는 않습니다.

앞의 비교표에서 종량제로 표시된 시나리오에 대해, 다음 통제를 구성해야 합니다.

| 대상 | 관리 센터 | 통제 항목 |
| --- | --- | --- |
| **Work IQ를 사용하는 Copilot Studio, GitHub Copilot 하네스** | [**PPAC**](https://learn.microsoft.com/power-platform/admin/manage-usage-github-copilot-harness)와 [**MAC**](https://learn.microsoft.com/microsoft-365/copilot/usage-based-billing-manage-copilot-credits) | PPAC로 에이전트 환경 용량과 한도를 관리합니다. MAC으로 해당 사용자를 위한 필수 Work IQ 지출 정책을 구성합니다. |
| **Work IQ API를 호출하는 사용자 지정 클라이언트 또는 자체 솔루션** | [**MAC**](https://learn.microsoft.com/microsoft-365/copilot/usage-based-billing-manage-copilot-credits) | 호출하는 사용자의 **Work IQ 지출 정책**: 사용자·그룹 범위, 청구 방식, 정책 및 사용자별 지출 한도, 임계값 알림. |
| **Cowork** | [**MAC**](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-admin-governance) | **Cowork**를 선택하고 대상 사용자·그룹으로 범위를 지정한 지출 정책과 청구 방식, 지출 한도, 알림. |

선불 Copilot Credit 용량 팩은 [두 관리 센터 중 어느 쪽에서 관리되는 경험에도 자금을 지원](https://learn.microsoft.com/power-platform/admin/manage-usage-github-copilot-harness#coordinate-capacity-across-admin-centers)할 수 있습니다. Power Platform 환경에 할당됐거나 Copilot Studio가 소비한 용량은 지원되는 Microsoft 365 경험에 사용할 수 있는 용량을 줄입니다. 통제는 여전히 별개로 유지됩니다.

대표적인 작업을 직접 시도해 본 뒤, 이를 반복할 사용자 수와 빈도를 반영해 사용량을 추정하세요. 짧은 질문과 여러 단계로 이루어진 작업은 소비하는 크레딧 양이 다를 수 있습니다.

## 통제 구성 방법

### MAC: Work IQ와 Cowork 지출 정책

[지출 정책 설정 가이드](https://learn.microsoft.com/microsoft-365/copilot/usage-based-billing-manage-copilot-credits)에 따라 사용량 기반 청구를 활성화한 다음, 각 서비스를 누가 사용할 수 있는지 구성하세요.

1. **Copilot > 비용 관리 > 구성**에서 지출 정책을 추가하거나 편집합니다.
2. **모든 사용자** 또는 특정 보안 그룹을 선택합니다. 의도한 용도에 따라 **에이전트 및 서비스 선택**에서 **Work IQ**, **Cowork**, 또는 둘 다를 선택합니다.
3. 청구 방식을 선택하고 정책의 월별 지출 한도와 선택적인 사용자별 한도를 설정합니다. 청구 방식은 전역(Global) 또는 결제(Billing) 관리자가 관리합니다.
4. 임계값 알림을 구성하고 검토를 담당할 사람을 지정합니다. 같은 사용자를 대상으로 하는 다른 정책도 함께 검토하세요.

이 Work IQ 정책은 사용자 지정 애플리케이션과 Copilot Studio MCP 연동 모두에 적용됩니다. [Studio 설정 가이드](https://learn.microsoft.com/microsoft-copilot-studio/add-work-iq)는 Work IQ 사용을 위한 별도의 지출 정책을 명시적으로 요구합니다.

지출 정책은 한도를 설정할 뿐 크레딧의 일부를 예약해 두지는 않습니다. 선불 크레딧 또는 종량제가 실제 자금을 제공합니다.

<div class="info-box warning" markdown="1">
[Cowork 지출 정책은 범위 내 모든 사용자에게 접근 권한을 부여](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-access)하며, 한도가 매우 낮더라도 마찬가지입니다. 접근을 막으려면 Cowork를 선택하는 모든 정책에서 해당 사용자를 제외하세요. 한도 적용은 실제 소비보다 지연될 수 있으므로, 한도에 도달한 뒤에도 추가 작업이 시작될 수 있습니다.
</div>

지출 승인이 데이터 접근 권한을 부여하지는 않습니다. [테넌트 활성화와 동의](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq/enable-work-iq)는 여전히 별개의 전제 조건으로 남아 있습니다.

### PPAC: Studio 환경 용량과 에이전트 한도

GitHub Copilot 하네스 에이전트를 빌드·테스트·평가·실행하는 것은 크레딧을 소비할 수 있습니다. 테스트 전에 [환경 및 에이전트 통제](https://learn.microsoft.com/power-platform/admin/manage-usage-github-copilot-harness)를 구성하세요.

1. **라이선싱 > Copilot Studio > Copilot Credit 관리**로 이동해 환경을 선택하고 선불 크레딧 할당량을 설정합니다.
2. **용량 초과분(Capacity overages)**을 검토합니다. 할당량이 소진된 후 환경이 테넌트의 미할당 크레딧을 사용하지 못하게 하려면 **테넌트의 사용 가능한 용량에서 가져오기**를 해제하세요.
3. 환경에 종량제 청구 요금제가 있는지 확인하세요. 이 요금제는 선불 크레딧이 소진된 후에도 계속 사용할 수 있도록 자금을 지원할 수 있습니다.
4. **라이선싱 > Copilot Studio > 에이전트 관리**에서 에이전트를 선택하고 월별 한도를 설정한 다음 알림을 구성합니다. 에이전트 한도를 강제하려면 **사용 중단(Stop usage)**을 켜세요.

환경 할당량은 그 환경의 에이전트들이 공유하는 용량이고, 에이전트 한도는 개별 에이전트 하나의 사용량을 제한합니다. Azure 예산 알림은 알림을 보낼 뿐 Copilot Studio 소비를 중단시키지는 않습니다.

[GitHub Copilot 하네스 비용 통제](https://microsoft.github.io/mcscatblog/posts/copilot-harness-cost-governance/) 가이드에서 이러한 설정을 더 자세히 다룹니다.

두 관리 센터를 서로 다른 팀이 관리한다면, 에이전트 이름·환경·대상 사용자·Work IQ 사용 사례를 두 팀 모두와 공유하세요.

## 자주 묻는 질문

### Copilot Studio에서 Work IQ를 어떻게 추가하나요?

Copilot Studio에서 [통합 Work IQ 연동(미리 보기)](https://learn.microsoft.com/microsoft-copilot-studio/add-work-iq)은 **GitHub Copilot 하네스**에서만 사용할 수 있습니다.

에이전트에서 **도구 > 도구 추가 > Model Context Protocol**로 이동해 **Work IQ(미리 보기)**를 선택하고 Work IQ 연결을 만들거나 선택하세요. 연결 절차와 전제 조건은 연결된 설정 가이드를 따르세요.

에이전트 지침을 사용해 언제 Work IQ를 참조해야 하는지 설명한 다음, 이메일·회의·채팅·파일의 맥락이 필요한 프롬프트로 테스트하세요. 도구를 추가하면 매 메시지마다 호출을 강제하는 것이 아니라 사용 가능하게 만들 뿐입니다.

### 표준 하네스는 어떤가요?

표준 하네스는 통합 Work IQ 연동을 지원하지 않습니다. 다음 두 가지가 혼동을 일으킬 수 있습니다.

[**의미 검색을 통한 테넌트 그래프 근거 확보(Tenant graph grounding with semantic search)**](https://learn.microsoft.com/microsoft-copilot-studio/knowledge-copilot-studio#tenant-graph-grounding-with-semantic-search)는 에이전트의 **Generative AI** 페이지에 Work IQ 관련 토글로 나타났습니다. 이는 지식 검색을 개선하며 항상 통합 Work IQ 연동과는 별개였습니다. 활성화하면 Microsoft 365 Copilot 라이선스 사용자에게는 사용량이 무과금(zero-rated)으로 처리되어 Copilot Credit이 청구되지 않습니다. 해당 라이선스가 없는 사용자의 사용은 [Copilot Studio 청구 요율](https://learn.microsoft.com/microsoft-copilot-studio/requirements-messages-management#copilot-credits-billing-rates)에 따라 크레딧을 소비합니다.

표준 하네스에서 사용할 수 있는 일부 개별 MCP 도구도 설명에 여전히 Work IQ를 언급합니다. 이 설명은 개별 도구를 가리키는 것이지 통합 Work IQ 연동에 대한 지원을 의미하지 않습니다. 이러한 개별 도구는 향후 폐기될 가능성이 높습니다.

### 이건 그냥 지식 원본을 추가하는 것 아닌가요?

[지식 원본](https://learn.microsoft.com/microsoft-copilot-studio/knowledge-copilot-studio)은 선택한 원본에서 관련 콘텐츠를 가져오고, Copilot Studio 에이전트는 그 콘텐츠를 사용해 응답을 생성합니다. Work IQ의 대화형 [`ask` 도구](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq/mcp/tool-reference)는 로그인한 사용자의 메일·회의·채팅·파일에 걸친 업무 맥락을 추론한 다음 생성된 응답을 에이전트에 반환합니다.

같은 에이전트가 둘 다 사용할 수 있습니다. 회의 준비 에이전트는 승인된 브리핑 형식을 위해 지식 원본을 참조하고, 사용자의 최근 업무 맥락을 위해 Work IQ를 참조할 수 있습니다. [언제 도구와 지식을 사용할지 설명하는 지침](https://microsoft.github.io/mcscatblog/posts/influence-orchestration-knowledge/)을 활용하세요.

## 실전에 적용하기

작업 하나를 정하고, 에이전트가 Work IQ를 어떻게 사용할지 결정한 다음, 테스트 전에 그 시나리오에 맞는 통제를 구성하세요.

여전히 이메일, 회의록, 파일을 손으로 짜맞추고 있는 작업이 있나요? 그것이 여러분의 첫 Work IQ 사용 사례가 될 수 있을까요? 댓글로 공유해 주세요.
