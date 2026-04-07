---
layout: chapter
title: "가이드의 전제"
short_title: "가이드의 전제"
description: "이 가이드가 전제하는 Copilot Studio의 가능 범위, 한계, 그리고 직접 개발(SI)과의 경계 기준을 정리합니다."
order: 0
icon: "📋"
category: guide
---

## 1. 이 챕터를 먼저 읽어야 하는 이유

Copilot Studio를 처음 접하면 "이걸로 뭘 만들 수 있지?"라는 기대와 함께, "그럼 우리 시스템도 이걸로 되나?"라는 질문이 바로 따라옵니다. 이 챕터에서는 **Copilot Studio로 할 수 있는 것과 할 수 없는 것**을 명확히 구분하고, **직접 개발(SI)과의 경계**를 실무 기준으로 정리합니다.

결론부터 말씀드리면:

> **Copilot Studio는 "빠르게 만들고, 안전하게 쓰는 Enterprise Agent 플랫폼"이지, "모든 걸 대신해주는 만능 AI 개발 툴"이 아닙니다.**

이 포지션을 처음에 명확히 이해하고 시작하면, 이후 라이선스·기능·비용·보안 관련 혼란이 크게 줄어듭니다.

---

## 2. Copilot Studio로 가능한 범위

Microsoft Copilot Studio는 **로우코드(Low-Code) 기반의 Agent 빌더**입니다. 그래픽 도구로 대화형 AI Agent를 코드 작성 없이 또는 최소한의 설정만으로 구현할 수 있습니다. 데이터 과학자나 전문 개발자 없이도 Agent를 쉽게 만들 수 있도록 설계되어 있으며, 필요에 따라 프로코드(Pro-Code) 확장도 가능합니다.

> 📖 **참조**: [Copilot Studio overview – What is an agent?](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/fundamentals-what-is-copilot-studio)

### 2.1 자연어 기반 대화형 Agent

Agent는 사용자의 자연어 질문을 이해하고, 적절한 응답을 제공하는 **AI 기반 대화 봇**입니다. 다음과 같은 시나리오에서 활용합니다:

- **FAQ 봇**: 영업시간 안내, 제품 정보, 자주 묻는 질문 자동 응답
- **사내 가이드 봇**: 인사 정책, IT 매뉴얼, 복리후생 안내
- **고객 지원 봇**: 주문 추적, 반품 처리, 계정 문의 대응
- **업무 자동화 봇**: 승인 요청, 이메일 발송, 데이터 조회

Copilot Studio는 두 가지 방식으로 대화를 처리합니다:

1. **Topics(토픽)**: 미리 설계된 대화 흐름으로, "트리거 문구 → 질문 → 조건 분기 → Action → 응답"의 정형 패턴
2. **Generative Answers(생성형 응답)**: Knowledge 소스를 기반으로 LLM이 자동 생성한 답변

**Generative Orchestration**을 활성화하면, 전통적인 NLU(Natural Language Understanding) 대신 **LLM 기반 다중 의도 인식**이 작동합니다. 하나의 발화에서 여러 의도를 동시에 파악하고, 적절한 Topic·Action·Knowledge를 자동으로 체이닝합니다.

> 📖 **참조**: [Explore AI capabilities in Copilot Studio](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/guidance/ai-capabilities)

<div class="info-box note">
<b>📌 핵심이 되는 설계 철학</b><br>
Copilot Studio는 더 이상 수백 개의 Topic을 일일이 작성하는 방식이 아닙니다. <b>핵심 업무용 Topic</b>만 설계하고, 나머지는 <b>AI 기반 생성형 응답</b>에 맡기는 <b>하이브리드 방식</b>이 기본 철학입니다. 모든 질문에 대해 Topic을 하나씩 만들 필요가 없다는 점이 기존 챗봇 솔루션과의 가장 큰 차이입니다.
</div>

### 2.2 사내 데이터 기반 응답 (Knowledge)

Agent에 **Knowledge 소스**를 연결하면, 사내 문서와 데이터를 기반으로 생성형 응답을 제공합니다. RAG(Retrieval-Augmented Generation) 방식으로 동작하여, 검색된 콘텐츠를 요약·검증한 후 **출처(Citation)**와 함께 응답합니다.

**지원되는 Knowledge 소스:**

| 소스 유형 | 유형 | 설명 | 제한 수량 | 인증 |
|---|---|---|---|---|
| **Public website** | External | Bing을 통해 제공된 웹사이트에서 검색 결과 반환 | Generative 모드: 25개 URL / Classic 모드: 4개 URL | 없음 |
| **Documents** | Internal | Dataverse에 업로드된 문서 콘텐츠에서 검색 | Generative 모드: 전체 / Classic 모드: Dataverse 파일 스토리지 한도 | 없음 |
| **SharePoint** | Internal | SharePoint URL에 연결, GraphSearch로 결과 반환 | Generative 모드: 25개 URL / Classic 모드: 4개 URL (노드당) | Entra ID 인증 |
| **Dataverse** | Internal | 구성된 Dataverse 환경에 연결, RAG 기반 검색 | Generative 모드: 무제한 / Classic 모드: 2개 소스 (소스당 15개 테이블) | Entra ID 인증 |
| **Enterprise data (커넥터)** | Internal | Microsoft Search로 인덱싱된 조직 데이터에 커넥터를 통해 연결 | Generative 모드: 무제한 / Classic 모드: Agent당 2개 | Entra ID 인증 |

> 📖 **참조**: [Knowledge sources summary](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/knowledge-copilot-studio) · [Quotas and limits](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/requirements-quotas)

**Work IQ(Tenant Graph Grounding)**를 활성화하면, Copilot Studio 에이전트는 SharePoint 검색시 Semantic Search를 활용하게 됩니다. 이를 통해 검색 성능을 향상시킬 수 있습니다. (기본 활성화 상태)

또한 Sharepoint를 참고하는 경우 **원본 데이터 권한을 그대로 상속**합니다. 사용자가 접근 권한이 없는 문서 및 사이트는 응답에 포함되지 않으므로, 에이전트를 위한 별도 권한 관리를 하지 않고 기존 M365 환경에서 이용하던 권한관리와 동일한 경험을 제공합니다.

<div class="info-box tip">
<b>💡 실무 팁 — Knowledge 소스 최적화</b>
<ul>
<li><b>Word 문서</b>는 목차·제목 구분(탐색 구조)이 잘 되어 있을수록 검색 정확도가 높습니다.</li>
<li><b>PPT 파일</b>은 마스터 레이아웃이 깔끔하게 정리된 파일이 파싱 정확도가 좋습니다.</li>
<li><b>SharePoint</b> 연결 시 Document Library가 아닌 <b>사이트 URL</b>을 입력하세요. Document Library 직접 연결은 지원되지 않습니다.</li>
<li><b>XLSX와 같은 구조화된 엑셀 파일 데이터</b>는 업로드 가능하지만, Agent가 코드를 실행할 수 없으므로 <b>분석형 질문에는 최적의 응답을 기대하기 어렵습니다</b>. 따라서 행,열 기반 쿼리를 통한 데이터 조회가 필요한 시나리오라면 지식소스에 추가하는것으로 원하는 결과물을 얻기 어렵습니다. (커넥터와 플로우를 통한 작업 필요)</li>
</ul>
</div>

### 2.3 Power Platform 연계 자동화

- Agent 도구에서 흐름을 통해 **Power Automate**와의 네이티브 연계를 통해 승인 요청, 이메일 발송, 데이터 기록 등의 자동화 워크플로우를 Agent에서 직접 실행할 수 있습니다.
- Outlook, Teams, SharePoint, Dataverse, SAP, Salesforce 등 **표준·프리미엄 커넥터**를 활용한 사내 시스템 연동이 가능합니다.
- **Agent Flow**를 통해 Power Automate 플로우를 Copilot Studio 컨텍스트 내에서 실행하고, 결과를 대화에 반환할 수 있습니다.

> 📖 **참조**: [Use actions with custom agents](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-plugin-actions) · [Call Power Automate flows](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-flow)

### 2.4 외부 시스템 연동

- HTTP 요청 기반으로 외부 REST API를 호출하거나, **1,000개 이상의 표준/프리미엄 커넥터**를 통해 다양한 서비스와 연동합니다.
- **커스텀 커넥터**를 생성하여 사내·대외 시스템과 데이터를 주고받을 수 있습니다.
- **MCP(Model Context Protocol)** 프로토콜을 통해 외부 MCP 서버를 도ㄴ구(Tool)로 직접 연결할 수 있습니다.

> 📖 **참조**: [Custom connectors overview](https://learn.microsoft.com/ko-kr/connectors/custom-connectors/) · [Connector reference](https://learn.microsoft.com/ko-kr/connectors/connector-reference/)

<div class="info-box warning">
<b>⚠️ 실무 주의 — 외부에서 Copilot Studio Agent를 호출하려면?</b>
Copilot Studio Agent는 <b>일반 REST API 형태로 외부에서 직접 호출할 수 없으며</b>, A2A·MCP 형태의 inbound endpoint도 제공하지 않습니다. 외부 시스템(AI Foundry, 자체 Agent Framework 등)에서 Copilot Studio를 호출하려면 아래 3가지 방식 중 하나를 선택해야 합니다.
<br><br>
<table>
<tr><th>방식</th><th>적합 시나리오</th><th>특징</th><th>참조</th></tr>
<tr>
<td><b>M365 Agents SDK<br>Copilot Studio client</b></td>
<td>사용자 컨텍스트(Delegated) 기반 호출<br>Teams·웹앱·M365 환경</td>
<td>✅ 공식 권장 경로, SDK 기반 개발 편의성<br>⚠️ Service principal/daemon 미지원 → 이 경우 Direct Line 사용</td>
<td><a href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-integrate-web-or-native-app-m365-agents-sdk">Learn</a></td>
</tr>
<tr>
<td><b>Direct Line API</b></td>
<td>백엔드 서비스, daemon, orchestrator<br>비-Microsoft 프레임워크</td>
<td>✅ 가장 범용적, HTTP/WebSocket 모두 지원<br>⚠️ 토큰·conversation lifecycle 등 개발량이 큼</td>
<td><a href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-web-security">Learn</a></td>
</tr>
<tr>
<td><b>Power Platform<br>Connector wrapper</b></td>
<td>PoC, low-code 우선, 기존 Power Platform 운영</td>
<td>✅ 가장 빠른 구현, Power Automate/Power Apps에서 바로 호출<br>⚠️ Throttling(300 calls/60sec/connection), 대규모 orchestration에는 불리</td>
<td><a href="https://learn.microsoft.com/en-us/connectors/microsoftcopilotstudio/">Learn</a></td>
</tr>
</table>
<br>
반대로 <b>Copilot Studio → 외부 agent</b> 방향은 <a href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents">Connected Agents</a>를 통해 <b><a href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent">Foundry agent</a>, <a href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-microsoft-365-agents-sdk-agent">M365 Agents SDK agent</a>, <a href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent">A2A agent</a></b> 연결이 지원되며, <b><a href="https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/introducing-model-context-protocol-mcp-in-copilot-studio-simplified-integration-with-ai-apps-and-agents/">MCP</a>는 외부 tools/resources를 가져오는 방향(outbound)</b>으로 동작합니다.
</div>

### 2.5 AI 기반 고급 기능

Copilot Studio는 단순 챗봇을 넘어 다양한 AI 기능을 제공합니다.

| AI 기능 | 설명 | 제한/고려사항 | 참조 |
|---|---|---|---|
| **Generative Orchestration** | 다중 의도 인식, Topic·Knowledge·Action 자동 체이닝 | 오케스트레이션 길이 제한 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/advanced-generative-actions) |
| **Generative Answers** | Knowledge 소스 기반 동적 답변 생성, 요약 및 출처 | 데이터 품질에 좌우 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/nlu-boost-node) |
| **Generative Builder** | 자연어로 Topic 생성 및 업데이트 | 사람의 검증 필요 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/nlu-authoring) |
| **Computer Use** | 화면을 시각적으로 해석하여 데스크톱 작업 자동화 | 전용 머신 필요, Preview | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/computer-use) |
| **AI Prompts** | AI 모델에 직접 지침을 주어 맞춤형 응답 생성 | 모델에 따라 성능 차이 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/prompts-overview) |
| **AI Approvals** | 사전 정의 기준에 따른 승인 자동 결정 | 아직 발전 중 | [Learn](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/flows-advanced-approvals) |

### 2.6 멀티 채널 배포

만들어진 Agent는 다양한 채널에 동시 배포가 가능합니다:

- **Microsoft Teams** — 가장 대표적인 사내 배포 채널
- **웹사이트** — iframe 임베드 또는 커스텀 웹 채팅
- **Microsoft 365 Copilot** — Copilot Chat 내 Agent 플러그인으로 노출
- **Facebook Messenger, Slack, WhatsApp** — B2C 고객 대응
- **Direct Line API** — 커스텀 앱 연동

> 📖 **참조**: [Publish and deploy your agent](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/publication-fundamentals-publish-channels)

### 2.7 다국어 지원

- 한국어를 포함한 [다수 언어를 지원](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/authoring-language-support)합니다.
- 에이전트 생성시, 주언어 설정을 통해 한국어를 기반으로  **인식/응답이 가능한 에이전트를 **생성 할 수 있습니다.
- 한국어 참조 자료(Knowledge)도 문제 없이 잘 동작합니다.

---

## 3. Copilot Studio로는 한계가 있는 범위

Copilot Studio는 강력한 도구이지만, 모든 시나리오에 적합하지는 않습니다. 아래는 [공식 문서](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/system-service-card-copilot-studio#limitations)와 실무 경험, 내부 고객 사례에서 확인된 한계들입니다.

### 3.1 복잡한 비즈니스 로직 처리

- 다단계 조건 분기, 복잡한 계산, 대규모 데이터 처리가 필요한 경우 Topics 흐름만으로는 구현이 어렵습니다.
- 이 경우 **Power Automate** 또는 **Azure Functions** 등 외부 로직으로 분리해야 합니다.
- **장시간 상태 유지(Stateful)**나 **복합 트랜잭션 처리**는 직접 개발(Azure/SI)이 권장됩니다.

### 3.2 고도화된 UI/UX 커스터마이징

- **Adaptive Card 지원이 제한적**이며, 기본 텍스트 포맷팅을 넘어서는 커스텀 렌더링이 필요하면 별도 Agent SDK를 통해 프론트엔드와 연결한 개발이 필요합니다.
- API 호출, Action, 응답 포맷팅에 대한 세밀한 개발자 제어가 제한됩니다.

> 📖 **참조**: [Choose the right tool – Copilot Studio Pros/Cons](https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/declarative-agent-tool-comparison#copilot-studio)

### 3.3 데이터 처리 제약 (구체적 수치)

| 제한 항목 | 수치 | 비고 |
|---|---|---|
| **커넥터 페이로드** | 5MB (공공 클라우드), 450KB (GCC) | 대용량 데이터는 분할 필요 |
| **SharePoint 파일 수** | Knowledge 소스당 1,000파일 / 50폴더 | 하위 10레벨까지 |
| **SharePoint 파일 크기** | M365 Copilot 있으면 200MB, 없으면 7MB | Enhanced Search 필요 |
| **파일 업로드** | 최대 500개, 개당 512MB | SharePoint Knowledge 별도 |
| **Topics 수** | Agent당 1,000개 (Dataverse 환경) | |
| **트리거 문구** | Topic당 200개 | |
| **지침(Instructions)** | 8,000자 | Copilot Agent 기준 |
| **SharePoint 리스트** | 최대 2,048행만 쿼리 가능 | 대량 데이터 시 주의 |

> 📖 **참조**: [Quotas and limits for Copilot Studio](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/requirements-quotas)

**추가 제약 사항:**
- **Loop 파일**을 Knowledge 소스로 직접 사용할 수 없습니다 (현재 Feature In Review 상태).
- SharePoint의 **Classic ASPX 페이지**, **SPFx 컴포넌트가 포함된 Modern 페이지**, **커스텀 CSS/아코디언 네비 사이트**는 Generative Answers에 사용되지 않습니다.
- 파일명을 직접 참조하는 질문(예: "file-name.pdf에 뭐라고 했어?")에는 답변할 수 없습니다.

### 3.4 실시간 양방향 데이터 동기화

- Copilot Studio는 기본적으로 **요청-응답(Request-Response)** 패턴으로 동작합니다.
- WebSocket 기반 실시간 동기화, 이벤트 스트리밍 등은 지원하지 않습니다.

### 3.5 소스 제어 및 CI/CD

- Power Platform은 **Solution 기반 ALM**을 공식 지원하며, [Power Platform Build Tools](https://learn.microsoft.com/ko-kr/power-platform/alm/devops-build-tools)(Azure DevOps)와 [GitHub Actions for Power Platform](https://learn.microsoft.com/ko-kr/power-platform/alm/devops-github-actions)을 통해 CI/CD 파이프라인을 구성할 수 있습니다.
- [Power Platform CLI(`pac`)](https://learn.microsoft.com/ko-kr/power-platform/developer/cli/introduction)로 Solution을 개별 파일로 분해(unpack)하여 Git에 커밋하고, PR 기반 코드 리뷰 워크플로우를 적용할 수 있습니다.
- [Pipelines in Power Platform](https://learn.microsoft.com/ko-kr/power-platform/alm/pipelines) 기능을 사용하면 Admin Center 내에서 코드 없이 Dev → Test → Prod 환경 간 배포 파이프라인을 구성할 수 있습니다.
- Copilot Studio의 [VS Code 확장](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/visual-studio-code-extension-overview)을 통해 Agent를 YAML 파일로 로컬에서 편집하고, `pac copilot` 명령으로 push/pull하여 Git 연동이 가능합니다.
- 다만, **Copilot Studio UI에서 직접 Git 연동이나 PR 생성을 수행하는 기능은 내장되어 있지 않으므로**, 위 도구들을 조합하여 ALM 파이프라인을 별도로 구성해야 합니다.

### 3.6 온프레미스 전용 환경

- Copilot Studio는 **클라우드 기반 SaaS 서비스**이므로, 완전한 온프레미스 환경에서의 운영은 불가합니다.
- 하지만 On-Premises Data Gateway 및 Azure vNET을 활용한 하이브리드 구성은 가능합니다.

> 📖 **참조**:<br> [Power Platform vNet 설정 및 구성](https://learn.microsoft.com/ko-kr/power-platform/admin/vnet-support-setup-configure?tabs=existing%2Csingle&pivots=manual#option-1-use-the-power-platform-admin-center) <br> [실습: 코파일럿 스튜디오와 VNet 통합하기](https://github.com/baby-crows/Copilot-Studio-Hands-on/blob/main/CPS-Vnet-Integration/%EC%BD%94%ED%8C%8C%EC%9D%BC%EB%9F%BF%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%EC%99%80%20VNet%20%ED%86%B5%ED%95%A9%ED%95%98%EA%B8%B0.md)

<div class="info-box warning">
<b>⚠️ Copilot Studio를 처음 시작할 때 가장 많이 오해하는 TOP 5</b>
<ol>
<li><b>"M365 Copilot 있으면 Studio 다 되는 거죠?"</b> → ❌ 외부 채널 배포·Author 권한은 별도입니다. Copilot Author Role 또는 Studio User가 필요합니다.</li>
<li><b>"프리미엄 커넥터 경고가 떠요"</b> → 실제 제한은 "배포 채널"에 따라 다릅니다. 커넥터 자체의 제한이 아니므로 오해하지 마세요.</li>
<li><b>"지식 소스로 파일 올리면 비용이 안 드나요?"</b> → Knowledge 소스에 파일 직접 업로드를 선택하면  <b>Dataverse 스토리지가 소비</b>됩니다. </li>
<li><b>"네트워크 차단이 안 풀려요"</b> → Copilot Studio는 Power Platform URL 접근이 필수입니다. <b>Conditional Access / MDCA / Proxy</b>와 충돌하는 사례가 빈번하므로, 보안팀과 사전 협의가 필요합니다.</li>
<li><b>"에이전트가 사람처럼 알아서 다 해주겠죠?"</b> → 명확한 <b>Role / Tool / Output 제약</b>을 지침에 정의해야 합니다. 프롬프트로 형식을 강제하지 않으면 실패 확률이 높아집니다.</li>
</ol>
</div>

<div class="info-box tip">
<b>💡 실무 경험에서 확인된 크레딧 관련 주의사항</b>
<ul>
<li>Copilot Studio <b>테스트 패널(Test Panel)</b>에서의 테스트는 크레딧이 <b>차감되지 않습니다</b>.</li>
<li>게시(Publish) 후 실제 채널에서의 사용은 <b>답변 정확도와 무관하게 차감</b>됩니다. 답변 실패 시에도 마찬가지입니다.</li>
<li>메시지 수 모니터링은 <b>Power Platform Admin Center</b>에서 확인할 수 있습니다.</li>
<li>커넥터가 <b>DLP(Data Loss Prevention)</b>에 의해 차단될 수 있으며, 이는 테넌트/환경 수준 정책을 확인해야 합니다.</li>
</ul>
</div>

---

## 4. Copilot Studio ↔ 직접 개발(SI) 경계 기준

### 4.1 판단 기준표

| 판단 기준 | Copilot Studio 단독 | Copilot Studio + Azure 확장 | 직접 개발(SI) |
|---|---|---|---|
| **대화 복잡도** | 단순 FAQ, 안내, 정보 조회, 3단계 이하 분기 | 중간~높은 복잡도, 조건 분기 + Action 체이닝 + 멀티 에이전트 | 다단계 분기, 장기 맥락 유지, 복잡한 대화 흐름 |
| **데이터 소스** | SharePoint, 웹사이트, Dataverse, 업로드 문서 | + 사내 DB(Azure Functions·Data Gateway·VNet 경유), 커스텀 커넥터, HTTP API, MCP 서버 | 사내 DB 직접 연동, 레거시 시스템, 대량 비정형 데이터 |
| **비즈니스 로직** | Knowledge 기반 응답, 간단한 Topic 분기 | Agent Flow·Azure Functions·API Management로 중간 복잡도 로직 처리 | 복잡한 트랜잭션, 계산 로직, 다중 시스템 정합성 |
| **UI/UX 요구** | 기본 채팅 UI, 텍스트/이미지 응답 | Adaptive Card, 구조화된 응답 포맷 | 커스텀 대시보드, 시각화, 키오스크/네이티브 앱 |
| **배포 채널** | Teams, 웹, M365 Copilot (기본 제공) | + Slack, Facebook, WhatsApp, Direct Line | 자체 앱, 키오스크, 임베디드, 완전 커스텀 |
| **유지보수 주체** | 현업/시민개발자 단독 운영 | 시민개발자 + IT/개발팀 or COE 협업 | 전문 개발팀 |
| **구축 기간** | 수 일 | 수 주 | 수 주 ~ 수 개월 |
| **인증/보안** | Entra ID 기본 연동 | Entra ID + OAuth2 커넥터 + VNet/Private Endpoint | 커스텀 인증, mTLS, SAML 등 |
| **소스 제어** | Solution Export/Import | + pac CLI, Build Tools, GitHub Actions | Git, Azure DevOps 전체 CI/CD |
| **AI 엔진** | Copilot Studio 기본 제공 LLM | + AI Prompts, Reasoning 모델, Foundry Agent 연동 | 자체 모델, 특화 RAG 파이프라인 |
| **인프라 연동** | 없음 (Knowledge 소스만) | Azure Functions, Data Gateway, VNet으로 사내 DB·온프레미스 연동 가능 | 제약 없음 |
| **비용 구조** | M365 Copilot B2E 무료 범위 내 | Copilot Credits + Azure 리소스 비용 | Azure/인프라 비용 직접 관리 |

### 4.2 Copilot Studio vs 직접 개발(SI) vs Azure AI Foundry

실무에서 가장 빈번하게 비교 요청을 받는 세 가지 옵션을 정리합니다.

| 구분 | Copilot Studio | 직접 개발(SI) | Azure AI Foundry |
|---|---|---|---|
| **개발 방식** | Low-code (그래픽 + YAML) | Full-code | Model / Prompt 중심 |
| **구축 속도** | ✅ 매우 빠름 (수일~수주) | ❌ 느림 (수주~수개월) | ⚠️ 중간 |
| **유지보수** | ✅ 현업 담당자 가능 | ❌ 전문 개발팀 필요 | ⚠️ ML 전문 인력 필요 |
| **복잡 로직** | ⚠️ 제한적 (Power Automate Flow로 보완 가능) | ✅ 최적 | ✅ 가능 |
| **PoC 용이성** | ✅ 최적 | ❌ 어려움 | ⚠️ 중간 |
| **거버넌스** | ✅ Power Platform 기본 제공 | ❌ 직접 설계 | ⚠️ 별도 구성 |
| **프론트엔드** | ✅ Microsoft 기본 제공 | ❌ 반드시 직접 구현 | ❌ 직접 구현 |
| **채널 관리** | ✅ Teams/웹/Slack 등 내장 | ❌ 직접 구현 | ❌ 직접 구현 |

> **중요**: Copilot Studio는 **Agent 제품화 도구**, Foundry는 **AI 엔진**, SI는 **시스템 구축** — 세 가지는 경쟁이 아닌 보완 관계입니다. 에이전트 개발을 하려는 사용자, 목적, 난이도에 따라 적절하게 취사선택 및 조합을 하여 최적화된 비용으로 에이전트 개발 및 운영을 가능케 합니다.

### 4.3 실무 의사결정 프레임워크

```
요구사항 분석
  ├─ ① 70% 이상 Studio로 커버 가능?
  │    ├─ Yes → Copilot Studio 기본 + 나머지 PA/Azure 보완
  │    └─ No → ② 대화형 UI가 핵심인가?
  │         ├─ Yes → 혼합 구조 (Studio 프론트 + Azure 백엔드)
  │         └─ No → 직접 개발 (SI)
  │
  ├─ ③ 유지보수 주체가 현업인가?
  │    ├─ Yes → Copilot Studio 우선 (시민개발자 자율 운영)
  │    └─ No → 직접 개발 가능성 높음
  │
  └─ ④ 전사 확산 계획이 있는가?
       ├─ Yes → Studio (거버넌스, 채널 관리 내장)
       └─ No → 목적에 따라 선택
```

### 4.4 실제 기업 고객의 피드백

국내 엔터프라이즈 고객의 Copilot Studio 도입 검토에서 반복적으로 나타나는 피드백을 정리합니다.

**👍 긍정적 피드백 (공통):**
- **PoC 속도 체감**: "이렇게 빨리 돌아가는 Agent를 본 적 없다"
- **현업 자율 수정**: "IT 부서 거치지 않고 직접 수정할 수 있다"
- **M365 Copilot 결합**: "기존 Copilot Chat에 우리 전용 Agent가 붙으니 체감 가치가 올라간다"

**👎 반복적 이슈:**
- **라이선스/권한 구조** 이해의 어려움
- **프리미엄 커넥터 경고** 메시지에 대한 오해
- **네트워크/보안팀과의 충돌** (CA 정책, Proxy 설정)

**❓ 단골 질문:**
- "외부 시스템도 호출할 수 있나?" → **커넥터를 이용하여 시스템 호출이 가능합니다.**
- "비용이 폭증하지 않나?" → **M365 Copilot 사용자는 B2E 무료** (조건 있음, Ch1에서 상세 설명)
- "사람이 승인 안 하면 자동으로 실행되나?" → **지침에서 제약 조건을 명확히 설정해야 함**

<div class="info-box tip">
<b>💡 실무 팁 — 도입 판단 원칙</b>
"어디까지 Copilot Studio로 할 수 있는가"는 기능의 존재 여부보다, <b>유지보수 가능성 과 확장 가능성</b>을 기준으로 판단하세요. <br>
70% 이상의 요구사항이 Studio로 커버된다면 Studio를 기본으로 택하되, 나머지 30%는 Power Automate나 Azure Functions로 보완하는 **혼합 구조**를 권장합니다.
</div>

<div class="info-box note">
<b>📌 거버넌스 관점에서의 Copilot Studio</b>
Copilot Studio는 Power Platform의 거버넌스 체계를 기본 탑재하고 있습니다:
<ul>
<li><b>환경(Environment) 분리</b>: Dev / Test / Prod 환경 관리</li>
<li><b>DLP(Data Loss Prevention)</b>: 커넥터 사용 제어, 외부 데이터 반출 차단</li>
<li><b>역할 기반 접근</b>: Entra ID + Dataverse 보안 역할</li>
<li><b>감사 로그</b>: Microsoft Purview + Sentinel 연계</li>
<li><b>ALM(Application Lifecycle Management)</b>: Solution 단위 패키징, 환경 간 이관</li>
</ul>
— <em><a href="https://learn.microsoft.com/ko-kr/microsoft-365/copilot/extensibility/copilot-studio-experience#copilot-studio-governance-principles" target="_blank">Learn: Copilot Studio governance principles</a></em>
</div>
