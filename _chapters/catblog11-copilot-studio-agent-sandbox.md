---
layout: "chapter"
date: 2026-07-20
title: "새로운 Copilot Studio 에이전트 샌드박스"
short_title: "에이전트 샌드박스"
description: "Copilot Studio 에이전트 샌드박스가 모델의 추론을 실제 파일 생성, 계산 등 실행 가능한 작업으로 전환하는 방법과 외부 접근을 안전하게 관리하는 방법을 소개합니다."
order: 11
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/copilot-studio-agent-sandbox/"
source_author: "chrisgarty"
source_published: "2026-07-20"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/copilot-studio-agent-sandbox/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 chrisgarty(@chrisgarty) 원문 [The New Copilot Studio Agent Sandbox](https://microsoft.github.io/mcscatblog/posts/copilot-studio-agent-sandbox/)(2026-07-20)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-agent-sandbox/copilot-studio-agent-sandbox-cat.png' | relative_url }}" alt="샌드박스 라벨이 붙은 상자 안에서 노는 고양이" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

일반적으로 대규모 언어 모델에게 직접 시키지 말아야 할 두 가지가 있습니다. 바로 계산을 수행하는 것과 대용량의 정확한 페이로드(채워진 스프레드시트, 유효한 `.docx`, 긴 JSON 문서)를 생성하는 것입니다. 모델은 그럴듯한 결과를 *예측*할 뿐이지, 실제로 계산하지는 않습니다. 모델이 반환하는 숫자가 정확한 합계라는 보장이 없고, 모델이 내보내는 파일이 유효하다는 보장도 없습니다.

언어 모델이 진정으로 잘하는 것은 바로 그런 일을 처리하는 *코드를 작성*하는 것입니다. 몇 줄의 Python이면 열을 정확히 합산하거나, 매번 똑같은 방식으로 바이트 단위까지 파일을 구성할 수 있습니다. 하지만 코드는 실행할 수 있는 무언가가 있어야만 유용합니다. 그리고 그러려면 실행 환경이 필요합니다.

[GitHub Copilot 하네스](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/overview)로 구동되는 Copilot Studio 에이전트에서 그 실행 환경이 바로 **에이전트 샌드박스**입니다.

## 에이전트에게 샌드박스를 주는 이유

GitHub Copilot CLI 같은 코딩 에이전트를 직접 사용해 본 적이 있다면, 기본 개념이 친숙하게 느껴질 것입니다. 에이전트는 터미널에서 작업할 수 있습니다. 파일을 검사하고, 코드를 작성하고, 실행하고, 출력을 읽고, 수정하고, 다시 시도하는 식으로요.

Copilot Studio 샌드박스는 에이전트에게 그런 작업 환경을 제공합니다. 별도로 머신을 프로비저닝하고 관리할 필요 없이 말이죠. Python 런타임, 로컬 파일, 사전 설치된 라이브러리, 셸 도구를 갖춘 컨테이너 환경으로, Copilot Studio가 모두 관리합니다.

샌드박스는 더 넓은 에이전트 하네스의 일부입니다. Instructions, [Knowledge](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/knowledge-copilot-studio), [Skills](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/skills-overview), [Tools](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/tools-overview)는 모델이 태스크를 이해하고 수행하는 데 도움을 줍니다. [에이전트에게는 이제 Skills가 있습니다](https://microsoft.github.io/mcscatblog/posts/modern-mcs-agent-skills/)에서 설명한 것처럼, Skill은 필요할 때 태스크별 지침과 스크립트를 함께 가져옵니다. 샌드박스는 그 스크립트가 로컬에서 실행 가능한 작업을 처리할 공간을 제공합니다.

Knowledge를 예로 들어보겠습니다. Copilot Studio는 자체 검색 파이프라인에도 샌드박스를 활용합니다. 에이전트가 Knowledge에서 파일을 검색하면, 그 파일이 샌드박스에 저장되고 에이전트는 파일을 열어 Python으로 분석하거나 차트를 그릴 수 있습니다. 샌드박스 없이는 검색이 반환하는 스니펫에만 의존해야 합니다. 파일 전체가 샌드박스에 놓여 있으면 모든 행을 넘나들며 작업할 수 있습니다.

### Copilot Studio 에이전트 샌드박스의 가능성 시연

직접 해볼 수 있는 간단한 데모입니다. 의도적으로 매출액 열이 없는 가상의 주문 데이터인 [샘플 판매 데이터](https://microsoft.github.io/mcscatblog/posts/copilot-studio-agent-sandbox/)를 다운로드하세요. 합계를 조회하는 게 아니라 직접 계산해야 합니다. 에이전트를 만들고 CSV를 Knowledge 파일로 추가한 뒤, "지역별·분기별 매출 성장률을 보여주는 판매 데이터 차트를 생성해 줘"라고 요청해 보세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-agent-sandbox/knowledge-analysis-chart.png' | relative_url }}" alt="에이전트가 생성한 두 개의 차트: 지역별·분기별 총 매출 막대 차트와 각 지역의 매출 성장 추세 선 차트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>538개 행에서 매출을 계산하고, 지역별·분기별로 합산한 뒤, 커스텀 Skill 없이 새 Copilot Studio 에이전트가 직접 차트로 만든 결과입니다.</figcaption>
</figure>

### Skills로 에이전트 동작을 더 쉽게 반복 가능하게 만들기

위 데모에서 에이전트는 코드를 스스로 작성했습니다. Skills를 사용하면 코드를 미리 제공할 수 있습니다. 검토된 스크립트와 사용 방법에 대한 지침을 함께 담으면 특정 태스크가 매번 동일한 방식으로 실행됩니다. [문서 레드라이닝 예제](https://microsoft.github.io/mcscatblog/posts/redlining-documents-new-copilot-studio-experience/)가 이를 잘 보여줍니다. 샌드박스가 제공된 문서에 스크립트를 실행해 완성된 Word 파일을 생성합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-agent-sandbox/document-redlined.png' | relative_url }}" alt="삽입과 삭제가 변경 내용 추적으로 표시된 Word 문서" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>샌드박스에서 진짜 Word 변경 내용 추적(Track Changes)으로 생성된 `.docx` 파일.</figcaption>
</figure>

에이전트는 파일을 사용자에게 반환할 수 있으며, 추가 변경이 필요하면 샌드박스에서 수정할 수 있습니다.

## 실시간 생성 코드, 아니면 직접 패키징한 스크립트?

코드가 샌드박스에 도달하는 방법은 크게 두 가지입니다.

- **태스크용으로 생성된 코드.** 모델이 Python을 작성하고, 실행하고, 결과를 확인하고, 수정할 수 있습니다. 낯선 내보내기 파일을 이해하거나, 새로 업로드된 파일을 차트로 표현하는 방법을 찾는 것처럼 새로운 작업에 적합합니다. 다만 코드를 작성하고 반복하는 데 시간이 걸리고, 실행마다 구현이 달라질 수 있습니다.
- **Skill에 패키징된 스크립트.** 미리 작성된 스크립트는 즉시 실행할 준비가 되어 있습니다. 반복적인 작업에는 일반적으로 더 빠르고 일관되며, 팀이 다른 코드 자산처럼 테스트하고 버전 관리를 할 수 있습니다.

메이커가 모든 대화에서 두 경로 중 하나를 선택하는 것이 아닙니다. 설명이 명확한 Skills를 포함한 좋은 옵션을 모델에게 제공하면, 모델이 런타임에 무엇을 사용할지 결정합니다.

실용적인 원칙은 이렇습니다. 새로운 작업에는 모델이 코드를 생성할 여지를 주세요. 반복 작업에는 에이전트가 즉시 일관되게 실행할 수 있도록 검토된 스크립트가 담긴 Skill을 제공하세요. 그런 다음 [evals](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/analytics-agent-evaluation-intro)를 활용해 전체 에이전트가 여전히 의도대로 동작하는지 검증하세요. [품질 게이트 패턴](https://microsoft.github.io/mcscatblog/posts/copilot-studio-eval-gate-azure-devops/)은 그 검사를 자동화하는 한 가지 방법을 보여줍니다. 패키징된 Skills는 에이전트와 함께 이동하며 일반적인 [애플리케이션 수명 주기 관리(ALM)](https://learn.microsoft.com/microsoft-copilot-studio/guidance/alm) 프로세스를 따릅니다.

## 샌드박스가 가능하게 하는 것들

샌드박스에는 문서, 스프레드시트, PDF, 데이터, 차트, 이미지 작업을 위한 라이브러리가 함께 제공됩니다. 정확한 패키지 이름보다 중요한 것은 이 라이브러리들이 가능하게 하는 에이전틱 루프입니다. 에이전트는 파일을 만들고, 명령을 실행하고, 결과를 확인하고, 접근 방식을 조정하고, 새 명령을 실행하며 계속 반복할 수 있습니다.

즉, 에이전트는 다음과 같은 일을 할 수 있습니다.

- 비례 보너스 계산, 숫자에 대한 가상 시나리오 실행, 수식 검증 — 모두 모델이 아닌 코드로 계산합니다.
- 업로드된 스프레드시트를 정제된 워크북, 계산된 요약, 차트로 변환합니다.
- 문서를 비교해 레드라인된 Word 파일을 반환합니다.
- PDF에서 내용을 추출하고, 일련의 검사를 수행한 뒤, 결과 보고서를 생성합니다.
- 제공된 데이터를 프레젠테이션이나 다른 서식 있는 산출물로 변환합니다.

메이커 입장에서는 계산이나 파일 변환이 필요할 때마다 별도 서비스를 구축할 필요가 없어집니다.

## 샌드박스에서의 네트워크 외부 접근 없음

샌드박스에는 아웃바운드 네트워크 경로가 없습니다. 샌드박스에서 실행되는 코드는 어떤 라이브러리를 임포트하든 API를 호출하거나, 이메일을 보내거나, SharePoint에 파일을 쓸 수 없습니다.

예를 들어 `requests` Python 패키지가 설치되어 있지만, 이를 이용해 만든 것은 샌드박스 밖으로 나갈 수 없습니다. 샌드박스 외부에 접근하는 것은 여러분이 설정한 경로를 통해서만 가능합니다. 접지된 정보를 위한 Knowledge 소스, 그리고 실시간 데이터와 외부 액션을 위한 커넥터 및 MCP 서버 같은 Tools가 그것입니다.

관리자 입장에서 이 경계가 바로 안심의 근거입니다. 실행은 Copilot Studio가 관리하며, 그 두 가지 경로가 유일한 출구이기 때문에 에이전트가 외부에서 하는 모든 일이 거버넌스 통제와 [데이터 정책](https://learn.microsoft.com/microsoft-copilot-studio/admin-data-loss-prevention) 안에 머뭅니다.

## 샌드박스는 임시입니다

샌드박스는 작업 공간이지 영구 저장소가 아닙니다. 레드라이닝 에이전트가 `contract-redlined.docx`를 생성했다면, 그 파일을 사용자에게 반환하거나 설정된 Tool을 통해 어딘가에 저장해야 합니다. 다음 대화에서 샌드박스에 같은 파일이 남아 있을 것이라는 가정 하에 설계하지 마세요.

[에이전트 메모리](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/memory-overview)는 활성화 시 대화 간에 사실과 맥락을 유지합니다. 파일을 저장하지는 않으므로, 샌드박스 출력물을 보존하는 방법이 아닙니다.

## 샌드박스에서 무엇을 사용할 수 있는지 어떻게 알 수 있나요?

에이전트를 만들 때 코드를 작성하고 실행하게 하거나, Skill에 패키징할 스크립트를 직접 작성하는 경우, 어떤 것이 이미 샌드박스에 설치되어 있는지 알아야 합니다. 가장 간단한 방법은 에이전트에게 접근할 수 있는 런타임, 라이브러리, Tools, Skills를 직접 물어보는 것입니다.

반복 가능하고 상세한 목록을 얻으려면 [agent-harness-explorer](https://microsoft.github.io/cat-agent-skills/skills/agent-harness-explorer/) Skill이 자동으로 검사를 수행하고 독립형 HTML 보고서를 생성합니다. 2026-07-21 기준으로 아무것도 없는 Copilot Studio 에이전트에서 생성된 보고서는 **컨테이너** 안의 **Python 3.12.9**, **99개의 Python 라이브러리**, **11개의 내장 도구**, **8개의 Skills**, 그리고 해당 에이전트에 구성된 **MCP 서버 없음**을 보여줬습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-agent-sandbox/agent-harness-explorer-report-example.png' | relative_url }}" alt="런타임, 사용 가능한 기능, 도구, Skills, Python 라이브러리를 보여주는 에이전트 하네스 역량 보고서 예시" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>agent-harness-explorer Skill이 생성한 예시 보고서.</figcaption>
</figure>

에이전트를 만들고 에이전트 하네스 탐색기 보고서를 생성하는 방법:
1. [cat-agent-skills](https://microsoft.github.io/cat-agent-skills/) 스킬 라이브러리에서 [agent-harness-explorer](https://microsoft.github.io/cat-agent-skills/skills/agent-harness-explorer/) 번들(zip)을 다운로드합니다.
2. Copilot Studio에서 [GitHub Copilot 하네스](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/overview)를 사용하는 에이전트를 만들거나 엽니다.
3. Build 탭의 오른쪽 패널에서 "Skills +"를 클릭해 [기존 Skill을 추가](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/skills-add-existing)합니다.
4. zip 파일을 업로드하고 Skill이 로드될 때까지 기다립니다.
5. [Preview](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/preview-overview) 탭을 엽니다.
6. 에이전트 채팅에 "Please inspect the harness"(하네스/샌드박스/환경)를 입력합니다.
7. [활동 추적](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/authoring-activity-trace)을 검토해 보고서 생성에 사용된 도구와 스크립트를 확인합니다.
8. "harness-inspection-report" HTML 보고서를 열어 검토합니다.

[에이전트 메모리](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/memory-overview)가 활성화되어 있다면, 에이전트에게 "스냅샷을 캡처해 줘"라고 요청해 나중에 비교할 수 있도록 저장할 수 있습니다. 이런 비교를 통해 시간이 지나면서 추가된 기능을 확인할 수 있습니다.

## 행동할 준비 완료

샌드박스는 Copilot Studio 에이전트가 설명에서 멈추지 않고 직접 검사하고, 계산하고, 생성하고, 반복할 수 있게 해주는 핵심입니다. 계산은 모델이 아닌 코드가 처리하고, 파일은 실제 환경에서 빌드되고 검증되며, 한계는 명확합니다. 유일한 외부 경로는 여러분이 설정한 Knowledge와 Tools이고, 대화가 끝나면 아무것도 남지 않습니다.

Copilot Studio 에이전트가 이렇게 강력해졌으니, 다음 번에 만들 에이전트는 어떤 비즈니스 문제를 해결해 줄까요?
