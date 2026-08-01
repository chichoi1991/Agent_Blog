# -*- coding: utf-8 -*-
# Agent Platform Advisor — 한글화 번역 맵

module ApaKo
  def self.norm(s)
    s.to_s.gsub(/\s+/, ' ').strip
  end

  MAP = {}

  def self.t(en, ko)
    MAP[norm(en)] = ko
  end

  # ===== QUESTIONS =====
  t 'Who is building this agent?', '이 에이전트를 만드는 사람은 누구인가요?'
  t 'Some platforms are designed for makers using low-code tools, while others require professional development skills.',
    '어떤 플랫폼은 로우코드 도구를 쓰는 메이커를 위해 설계되었고, 어떤 플랫폼은 전문 개발 역량을 요구합니다.'
  t 'Business user or subject matter expert — no coding experience',
    '현업 사용자 또는 업무 전문가 — 코딩 경험 없음'
  t 'Low-code maker or IT professional — comfortable with drag-and-drop tools and configuration',
    '로우코드 메이커 또는 IT 전문가 — 드래그 앤 드롭 도구와 설정 작업에 익숙함'
  t 'Professional developer — writes code and builds software',
    '전문 개발자 — 코드를 작성하고 소프트웨어를 구축함'
  t 'Data scientist or AI/ML engineer — works with AI models and data infrastructure',
    '데이터 사이언티스트 또는 AI/ML 엔지니어 — AI 모델과 데이터 인프라를 다룸'

  t 'Who will use this agent?', '이 에이전트를 사용할 대상은 누구인가요?'
  t 'Will this agent be used by a small internal group, a broad internal audience, or external users such as customers or partners?',
    '소규모 내부 팀이 사용하나요, 사내 전반의 폭넓은 사용자가 쓰나요, 아니면 고객·파트너 같은 외부 사용자가 쓰나요?'
  t 'Me or a small internal team — quick agent for a bounded group',
    '나 또는 소규모 내부 팀 — 한정된 그룹을 위한 빠른 에이전트'
  t 'A department or broad internal audience — many employees need a managed agent',
    '부서 또는 사내 전반 — 다수 임직원이 사용할 관리형 에이전트가 필요함'
  t 'External users — customers, partners, or the public',
    '외부 사용자 — 고객, 파트너 또는 일반 대중'
  t 'Not decided yet', '아직 결정하지 않음'

  t 'Where will users interact with this agent?', '사용자는 이 에이전트를 어디에서 사용하나요?'
  t 'Think about where people will access or use the agent in their day-to-day work.',
    '실제 업무 흐름에서 사람들이 이 에이전트에 접근하고 사용할 위치를 생각해 보세요.'
  t 'Inside Microsoft 365 Copilot chat — Microsoft365.com, Office.com, or Teams desktop/web',
    'Microsoft 365 Copilot 채팅 내부 — Microsoft365.com, Office.com 또는 Teams 데스크톱/웹'
  t 'In a custom app — a website or mobile app your team builds',
    '커스텀 앱 내부 — 팀이 직접 만든 웹사이트 또는 모바일 앱'
  t 'Running automatically in the background — triggered by events, not by a person chatting with it',
    '백그라운드에서 자동 실행 — 사람의 대화가 아닌 이벤트로 트리거됨'
  t 'Multiple places, or not decided yet', '여러 곳에서 사용 또는 아직 결정하지 않음'

  t 'What should this agent do?', '이 에이전트는 어떤 일을 해야 하나요?'
  t 'What type of work do you want this agent to handle? Choose the option that best represents the most advanced task you expect it to perform.',
    '이 에이전트가 처리할 업무 유형은 무엇인가요? 수행할 것으로 예상되는 가장 고난도 작업을 기준으로 선택하세요.'
  t 'Answer questions in a single exchange — Q&A, lookups, or summaries',
    '한 번의 문답으로 응답 — Q&A, 정보 조회 또는 요약'
  t 'Have a back-and-forth conversation and remember context',
    '여러 차례 대화를 주고받으며 맥락을 기억'
  t 'Create or analyze content inside Copilot — documents, charts, images, or lightweight data analysis',
    'Copilot 내부에서 콘텐츠 생성·분석 — 문서, 차트, 이미지 또는 간단한 데이터 분석'
  t 'Complete multi-step tasks — follow a process, check multiple systems, or take actions like submitting forms or updating records',
    '다단계 작업 수행 — 프로세스를 따라가고, 여러 시스템을 조회하며, 양식 제출이나 레코드 갱신 같은 액션 실행'
  t 'Manage complex workflows — coordinate multiple agents or handle long-running processes',
    '복잡한 워크플로 관리 — 여러 에이전트를 조율하거나 장기 실행 프로세스를 처리'

  t 'What information does this agent need to access?', '이 에이전트는 어떤 정보에 접근해야 하나요?'
  t 'Where does the information this agent needs currently live? Pick the option closest to where the information lives today.',
    '이 에이전트가 필요로 하는 정보는 현재 어디에 있나요? 지금 정보가 위치한 곳과 가장 가까운 항목을 선택하세요.'
  t 'Microsoft 365 content — SharePoint, OneDrive, Teams, Outlook, or people data',
    'Microsoft 365 콘텐츠 — SharePoint, OneDrive, Teams, Outlook 또는 조직 구성원 데이터'
  t 'Business systems already available through Microsoft 365 Copilot connectors — like Jira, ServiceNow, GitHub, or Azure DevOps',
    'Microsoft 365 Copilot 커넥터로 이미 연결 가능한 업무 시스템 — Jira, ServiceNow, GitHub, Azure DevOps 등'
  t 'Dataverse, custom connectors, or direct business APIs your team can expose to the agent',
    'Dataverse, 커스텀 커넥터 또는 팀이 에이전트에 직접 노출할 수 있는 업무 API'
  t 'A mix — Microsoft 365 content plus connector-backed business systems',
    '혼합 — Microsoft 365 콘텐츠와 커넥터 기반 업무 시스템을 함께 사용'
  t 'Public websites or uploaded files — scoped web sources, PDFs, Office files, or other embedded content',
    '공개 웹사이트 또는 업로드 파일 — 범위 지정 웹 소스, PDF, Office 파일 등 임베드된 콘텐츠'
  t 'Custom RAG, Azure AI Search, private indexes, Foundry IQ knowledge bases, or large-scale retrieval managed by engineering',
    '커스텀 RAG, Azure AI Search, 프라이빗 인덱스, Foundry IQ 지식 베이스 또는 엔지니어링이 운영하는 대규모 검색 시스템'

  # ===== HARD RULES =====
  t 'Complex agent orchestration — Agent Builder and M365 Copilot are not suitable for multi-agent or long-running orchestration',
    '복잡한 에이전트 오케스트레이션 — Agent Builder와 M365 Copilot은 멀티 에이전트나 장기 실행 오케스트레이션에 적합하지 않습니다'
  t 'Multi-step action workflows — Agent Builder cannot submit forms, update records, or take actions across systems',
    '다단계 액션 워크플로 — Agent Builder는 양식 제출, 레코드 갱신, 시스템 간 액션 실행을 할 수 없습니다'
  t 'External user audience — Agent Builder and M365 Copilot cannot publish externally',
    '외부 사용자 대상 — Agent Builder와 M365 Copilot은 외부에 게시할 수 없습니다'
  t 'Custom app deployment — Agent Builder can only run inside Microsoft 365',
    '커스텀 앱 배포 — Agent Builder는 Microsoft 365 내부에서만 실행됩니다'
  t 'Background execution — Agent Builder has no event-driven or autonomous capabilities',
    '백그라운드 실행 — Agent Builder에는 이벤트 기반 또는 자율 실행 기능이 없습니다'
  t 'Direct business system integration — Agent Builder cannot directly connect to Dataverse, custom connectors, or business APIs',
    '업무 시스템 직접 연동 — Agent Builder는 Dataverse, 커스텀 커넥터, 업무 API에 직접 연결할 수 없습니다'
  t 'Custom retrieval architecture — Agent Builder cannot directly use custom RAG, Azure AI Search, private indexes, Foundry IQ, or engineering-managed retrieval systems',
    '커스텀 검색 아키텍처 — Agent Builder는 커스텀 RAG, Azure AI Search, 프라이빗 인덱스, Foundry IQ, 엔지니어링 운영 검색 시스템을 직접 사용할 수 없습니다'

  # ===== PERSONA / TIEBREAKERS =====
  t 'Copilot Studio is recommended over Agent Builder for data scientists and AI/ML engineers because it supports curated model selection, agent evaluations, Foundry IQ integration, code-first development via the VS Code extension, and more flexible orchestration — capabilities that Agent Builder does not offer.',
    '데이터 사이언티스트와 AI/ML 엔지니어에게는 Agent Builder보다 Copilot Studio를 권장합니다. 큐레이션된 모델 선택, 에이전트 평가, Foundry IQ 연동, VS Code 확장을 통한 코드 우선 개발, 더 유연한 오케스트레이션을 지원하기 때문입니다. 이는 Agent Builder가 제공하지 않는 기능입니다.'
  t 'When the builder is a professional developer and scores are equal, Copilot Studio is the better fit — it supports code-first authoring via the VS Code extension while Agent Builder is no-code only.',
    '제작자가 전문 개발자이고 점수가 동일한 경우 Copilot Studio가 더 적합합니다. VS Code 확장을 통한 코드 우선 작성을 지원하는 반면 Agent Builder는 노코드 전용이기 때문입니다.'
  t 'When the builder is a data scientist or AI/ML engineer and scores are equal, Copilot Studio is preferred — it provides a faster path to production agents while Foundry is reserved for deeper custom orchestration.',
    '제작자가 데이터 사이언티스트 또는 AI/ML 엔지니어이고 점수가 동일한 경우 Copilot Studio를 권장합니다. 프로덕션 에이전트로 가는 더 빠른 경로를 제공하며, Foundry는 더 깊은 커스텀 오케스트레이션에 적합하기 때문입니다.'

  # ===== THRESHOLDS =====
  t 'Strong fit', '매우 적합'
  t 'This platform is well-aligned with your requirements across all dimensions.',
    '모든 측면에서 요구사항과 잘 부합하는 플랫폼입니다.'
  t 'Good fit', '적합'
  t 'This platform meets most of your requirements with minor tradeoffs.',
    '일부 트레이드오프는 있지만 대부분의 요구사항을 충족합니다.'
  t 'Partial fit', '부분 적합'
  t 'This platform can address your scenario but may require workarounds.',
    '시나리오를 처리할 수 있지만 우회 방법이 필요할 수 있습니다.'
  t 'Not recommended', '권장하지 않음'
  t 'This platform is unlikely to meet your requirements in this scenario.',
    '이 시나리오에서는 요구사항을 충족하기 어려운 플랫폼입니다.'

  # ===== VALID PAIRS =====
  t 'Build in Copilot Studio, extend with custom code in Foundry.',
    'Copilot Studio에서 구축하고, Foundry에서 커스텀 코드로 확장하세요.'
  t 'Microsoft 365 Copilot for end users, Copilot Studio for customization and extension.',
    '최종 사용자에게는 Microsoft 365 Copilot을, 커스터마이징과 확장에는 Copilot Studio를 사용하세요.'
  t 'Agent Builder for Microsoft 365-native agents, Microsoft 365 Copilot for broader extensibility.',
    'Microsoft 365 네이티브 에이전트에는 Agent Builder를, 더 폭넓은 확장성에는 Microsoft 365 Copilot을 사용하세요.'

  # ===== CROSS-QUESTION NOTES =====
  t 'You selected a background, event-driven agent but also chose simple Q&A. Background agents typically process events automatically rather than answering user questions. Consider whether your agent is event-driven or conversational.',
    '백그라운드 이벤트 기반 에이전트를 선택했지만 단순 Q&A도 함께 선택하셨습니다. 백그라운드 에이전트는 사용자 질문에 답하기보다 이벤트를 자동 처리하는 것이 일반적입니다. 이 에이전트가 이벤트 기반인지 대화형인지 다시 검토해 보세요.'
  t "You selected external users but want the agent inside Microsoft 365 apps. External users typically can't access your organization's Teams, SharePoint, or Outlook. Your agent may need a custom web deployment to reach them.",
    '외부 사용자를 선택했지만 에이전트를 Microsoft 365 앱 내부에 두려고 하셨습니다. 외부 사용자는 일반적으로 조직의 Teams, SharePoint, Outlook에 접근할 수 없습니다. 외부 사용자에게 도달하려면 커스텀 웹 배포가 필요할 수 있습니다.'
  t 'Complex multi-agent orchestration typically requires professional development skills. Consider partnering with your development team, or selecting a simpler task type that matches your experience level.',
    '복잡한 멀티 에이전트 오케스트레이션은 일반적으로 전문 개발 역량을 요구합니다. 개발팀과 협업하거나, 현재 경험 수준에 맞는 더 단순한 작업 유형을 선택하는 것을 검토해 보세요.'
  t 'Direct business system integrations like Dataverse, custom connectors, or APIs usually require technical expertise to configure. Consider whether your IT or development team will help set up data access for the agent.',
    'Dataverse, 커스텀 커넥터, API 같은 업무 시스템 직접 연동은 보통 기술적 전문성이 필요합니다. IT팀 또는 개발팀이 에이전트의 데이터 접근 설정을 지원할 수 있는지 확인해 보세요.'
  t 'Custom retrieval architectures like Azure AI Search, private indexes, Foundry IQ, or large-scale RAG usually require engineering expertise. Consider partnering with your development or data platform team before building the agent.',
    'Azure AI Search, 프라이빗 인덱스, Foundry IQ, 대규모 RAG 같은 커스텀 검색 아키텍처는 보통 엔지니어링 전문성이 필요합니다. 에이전트를 구축하기 전에 개발팀 또는 데이터 플랫폼팀과 협업을 검토해 보세요.'
  t 'Microsoft Foundry is the right platform for this scenario, but it requires professional development skills and Azure expertise. Consider partnering with your development team to build and maintain this agent.',
    '이 시나리오에는 Microsoft Foundry가 적합하지만, 전문 개발 역량과 Azure 전문성이 필요합니다. 에이전트를 구축하고 운영하기 위해 개발팀과의 협업을 검토해 보세요.'

  # ===== AGENT BUILDER =====
  t 'Create lightweight agents in minutes without writing code, grounded in Microsoft 365 content, scoped web, uploaded files, and admin-enabled Copilot connectors',
    '코드 작성 없이 몇 분 만에 경량 에이전트를 만들 수 있습니다. Microsoft 365 콘텐츠, 범위 지정 웹, 업로드 파일, 관리자가 승인한 Copilot 커넥터를 근거로 동작합니다'
  t 'Best suited for no-code, small-team declarative agents inside Microsoft 365 Copilot.',
    'Microsoft 365 Copilot 내부에서 소규모 팀이 쓰는 노코드 선언형 에이전트에 가장 적합합니다.'
  t 'Create no-code agents in Microsoft 365 Copilot', 'Microsoft 365 Copilot에서 노코드 에이전트 만들기'
  t 'Choose Agent Builder when you want to create agents without writing any code, using Microsoft 365 content, scoped web sources, uploaded files, or business data already exposed through Microsoft 365 Copilot connectors. Ideal for business users who need Q&A, summarization, lookup, or lightweight content and data-analysis helpers for themselves or a small team.',
    '코드를 전혀 작성하지 않고 에이전트를 만들고 싶을 때 Agent Builder를 선택하세요. Microsoft 365 콘텐츠, 범위 지정 웹 소스, 업로드 파일, Microsoft 365 Copilot 커넥터로 이미 연결된 업무 데이터를 활용합니다. 본인이나 소규모 팀을 위한 Q&A, 요약, 정보 조회, 가벼운 콘텐츠·데이터 분석 도우미가 필요한 현업 사용자에게 이상적입니다.'
  t 'The right starting point for business users who want to build lightweight declarative agents directly inside Microsoft 365 Copilot without writing code.',
    '코드 작성 없이 Microsoft 365 Copilot 내부에서 바로 경량 선언형 에이전트를 만들고 싶은 현업 사용자에게 알맞은 출발점입니다.'
  t 'No-code creators building for themselves or a small internal team',
    '본인 또는 소규모 내부 팀을 위해 만드는 노코드 제작자'
  t 'Agents grounded in Microsoft 365 content, scoped web, uploaded files, or admin-enabled Copilot connectors',
    'Microsoft 365 콘텐츠, 범위 지정 웹, 업로드 파일, 관리자 승인 Copilot 커넥터를 근거로 하는 에이전트'
  t 'Q&A, summarization, lookup, coaching, and lightweight document, chart, image, or data-analysis scenarios',
    'Q&A, 요약, 정보 조회, 코칭 및 가벼운 문서·차트·이미지·데이터 분석 시나리오'
  t "Can't be shared with people outside your organization", '조직 외부 사용자와 공유할 수 없음'
  t "Broad department or organization-wide agents usually need Copilot Studio's deployment and governance controls",
    '부서 전반 또는 전사 규모 에이전트는 일반적으로 Copilot Studio의 배포·거버넌스 제어가 필요함'
  t 'External business data must be available through Microsoft 365 Copilot connectors; direct APIs, Dataverse, custom databases, private search indexes, and custom retrieval require Copilot Studio or Foundry',
    '외부 업무 데이터는 Microsoft 365 Copilot 커넥터로 연결되어야 함. 직접 API, Dataverse, 커스텀 데이터베이스, 프라이빗 검색 인덱스, 커스텀 검색은 Copilot Studio 또는 Foundry가 필요함'
  t 'Not suitable for custom action logic, approvals, branching workflows, or external system updates',
    '커스텀 액션 로직, 승인, 분기 워크플로, 외부 시스템 갱신에는 부적합'
  t "Copy the agent to Copilot Studio when you outgrow Agent Builder's sharing, integration, lifecycle, or governance limits",
    'Agent Builder의 공유·통합·수명주기·거버넌스 한계를 넘어서면 에이전트를 Copilot Studio로 복사하세요'
  t 'No evaluation or testing tools — quality assurance is manual',
    '평가·테스트 도구 없음 — 품질 검증은 수동으로 해야 함'
  t 'No lifecycle management — no versioning, environments, or CI/CD',
    '수명주기 관리 없음 — 버전 관리, 환경 분리, CI/CD 미지원'
  t 'Minimal observability — limited visibility into agent behavior and usage',
    '관측성 최소 — 에이전트 동작과 사용 현황 가시성이 제한적'

  t 'Career Coach', '커리어 코치'
  t 'Personalized career development plans, skill gap analysis, and actionable advice',
    '맞춤형 경력 개발 계획, 역량 격차 분석, 실행 가능한 조언'
  t 'Corporate Communications Crafter', '사내 커뮤니케이션 작성 도우미'
  t 'On-brand internal and external communications — announcements, newsletters, exec updates',
    '브랜드 톤에 맞는 내·외부 커뮤니케이션 — 공지, 뉴스레터, 임원 보고'
  t 'Customer Insight Assistant', '고객 인사이트 어시스턴트'
  t 'Detailed customer profiles including industry, priorities, leadership, and competitors',
    '산업, 우선순위, 리더십, 경쟁사를 포함한 상세 고객 프로필'
  t 'Idea Coach', '아이디어 코치'
  t 'Guided brainstorming sessions with creative exercises to develop and refine ideas',
    '아이디어를 발전시키고 다듬는 창의적 훈련 중심의 가이드형 브레인스토밍'
  t 'Interview Question Assistant', '면접 질문 어시스턴트'
  t 'Tailored, high-quality interview questions based on role and job description',
    '직무와 채용 공고에 맞춘 고품질 면접 질문'
  t 'Learning Coach', '학습 코치'
  t 'Structured learning plans and topic summaries tailored to individual knowledge gaps',
    '개인별 지식 격차에 맞춘 구조화된 학습 계획과 주제 요약'
  t 'Meeting Coach', '회의 코치'
  t 'Structured agendas, role assignments, and real-time guidance to run effective meetings',
    '효과적인 회의 운영을 위한 구조화된 안건, 역할 배정, 실시간 가이드'
  t 'Prompt Coach', '프롬프트 코치'
  t 'Guides users in crafting well-structured Copilot prompts through interactive feedback',
    '대화형 피드백을 통해 잘 구성된 Copilot 프롬프트 작성을 안내'
  t 'Request for Proposal Assistant', 'RFP 제안서 어시스턴트'
  t 'Generates tailored RFP response drafts from existing proposal content and templates',
    '기존 제안 콘텐츠와 템플릿을 활용해 맞춤형 RFP 응답 초안 생성'
  t 'Quiz Tutor', '퀴즈 튜터'
  t 'Interactive quizzes based on training content to reinforce learning and knowledge retention',
    '학습 강화와 지식 정착을 위한 교육 콘텐츠 기반 대화형 퀴즈'
  t 'Scrum Assistant', '스크럼 어시스턴트'
  t 'Real-time guidance on scrum ceremonies, backlog management, and Agile best practices',
    '스크럼 세리머니, 백로그 관리, 애자일 모범 사례에 대한 실시간 가이드'
  t 'Text Translator Assistant', '텍스트 번역 어시스턴트'
  t 'Translates text, adjusts tone for professional communication, and improves writing quality',
    '텍스트 번역, 비즈니스 커뮤니케이션에 맞는 톤 조정, 문장 품질 개선'
  t 'Writing Coach', '글쓰기 코치'
  t 'Detailed feedback on clarity, coherence, grammar, and tone to elevate writing quality',
    '명확성, 일관성, 문법, 톤에 대한 상세 피드백으로 글의 품질을 향상'

  # ===== M365 COPILOT =====
  t 'Built-in, permission-aware AI across Microsoft 365 Copilot Chat, Search, Word, Excel, PowerPoint, Outlook, Teams, Loop, Pages, Notebooks, and Microsoft-built agents',
    'Microsoft 365 Copilot 채팅, 검색, Word, Excel, PowerPoint, Outlook, Teams, Loop, Pages, Notebooks 및 Microsoft 제공 에이전트 전반에 내장된 권한 인식 AI'
  t "Fits scenarios where Microsoft 365 Copilot's built-in chat, search, app, notebook, and first-party agent capabilities already cover the need.",
    'Microsoft 365 Copilot의 기본 채팅, 검색, 앱 연동, 노트북, 자사 에이전트 기능만으로 이미 요구가 충족되는 시나리오에 적합합니다.'
  t 'Use built-in AI across Microsoft 365', 'Microsoft 365 전반의 내장 AI 활용하기'
  t 'Use Microsoft 365 Copilot when employees need built-in, permission-aware help across Microsoft 365 Copilot Chat, Copilot Search, Word, Excel, PowerPoint, Outlook, Teams, Loop, Pages, Notebooks, and Microsoft-built agents like Researcher, Analyst, Facilitator, and Interpreter. Ideal when the work can be handled by existing Microsoft 365 experiences rather than a custom agent.',
    '임직원이 Microsoft 365 Copilot 채팅, Copilot 검색, Word, Excel, PowerPoint, Outlook, Teams, Loop, Pages, Notebooks 및 Researcher, Analyst, Facilitator, Interpreter 같은 Microsoft 제공 에이전트 전반에서 권한을 인식하는 내장 지원이 필요할 때 사용하세요. 커스텀 에이전트를 만들지 않고 기존 Microsoft 365 경험만으로 처리 가능한 업무에 이상적입니다.'
  t "Best when built-in Microsoft 365 Copilot capabilities already meet most of what users need — chat, search, app-native assistance, collaborative pages and notebooks, and Microsoft-built agents grounded in each user's permitted work content, connected sources, and the web.",
    'Microsoft 365 Copilot의 내장 기능만으로 사용자 요구가 대부분 충족될 때 가장 좋습니다. 채팅, 검색, 앱 내 지원, 협업 페이지와 노트북, 그리고 각 사용자에게 허용된 업무 콘텐츠·연결 소스·웹을 근거로 동작하는 Microsoft 제공 에이전트를 포함합니다.'
  t 'Ad hoc, user-initiated questions, summaries, and drafting',
    '사용자가 직접 시작하는 즉흥적 질문, 요약, 초안 작성'
  t 'Working through a task yourself rather than handing it off',
    '업무를 위임하기보다 직접 진행하며 처리'
  t 'Specialized jobs a Microsoft-built agent already handles',
    'Microsoft 제공 에이전트가 이미 처리하는 전문 업무'
  t 'Grounded in your Microsoft 365 context (email, meetings, files, messages)',
    'Microsoft 365 컨텍스트(메일, 회의, 파일, 메시지)를 근거로 동작'
  t 'You stay in the loop — it does not run a multi-step task end to end on its own',
    '사용자가 계속 관여해야 함 — 다단계 작업을 처음부터 끝까지 스스로 수행하지 않음'
  t 'Not always-on or proactively monitoring', '상시 실행이나 선제적 모니터링은 하지 않음'
  t 'Use Cowork instead when you want to delegate a bounded, multi-step deliverable',
    '범위가 정해진 다단계 산출물을 위임하고 싶다면 Cowork를 사용하세요'
  t 'Use Scout instead when work should continue or act over time',
    '업무가 지속적으로 진행되거나 시간에 걸쳐 실행되어야 한다면 Scout를 사용하세요'

  t 'Copilot Chat', 'Copilot 채팅'
  t 'Ask, summarize, and draft in the flow of work', '업무 흐름 속에서 질문하고, 요약하고, 초안을 작성'
  t 'The conversational front door to Microsoft 365 Copilot — you ask, iterate, and get answers, summaries, and drafts yourself, grounded in your email, meetings, files, and messages. Call a specialized agent from here whenever a task needs one.',
    'Microsoft 365 Copilot의 대화형 관문입니다. 메일, 회의, 파일, 메시지를 근거로 직접 질문하고 반복하며 답변·요약·초안을 얻습니다. 전문 에이전트가 필요한 작업이면 여기서 바로 호출할 수 있습니다.'
  t 'Built-in agents — Researcher, Analyst, Facilitator, Interpreter',
    '내장 에이전트 — Researcher, Analyst, Facilitator, Interpreter'
  t 'Purpose-built agents for specialized jobs', '전문 업무를 위해 설계된 목적형 에이전트'
  t 'Start with the agent built for the job — Researcher for source-cited deep research, Analyst for data analysis in Python, Facilitator for meeting notes and follow-ups, Interpreter for live translation. They run inside Microsoft 365 Copilot alongside chat, so you can move between them without switching products.',
    '업무에 맞게 만들어진 에이전트로 시작하세요. 출처가 표기된 심층 리서치는 Researcher, Python 기반 데이터 분석은 Analyst, 회의록과 후속 조치는 Facilitator, 실시간 통역은 Interpreter입니다. 모두 Microsoft 365 Copilot 안에서 채팅과 함께 동작하므로 제품을 옮기지 않고 전환할 수 있습니다.'

  t 'Built-in Copilot capabilities and agents', '내장 Copilot 기능 및 에이전트'
  t 'Permission-aware chat for drafting, summarizing, answering questions, and working across Microsoft 365 content and the web',
    'Microsoft 365 콘텐츠와 웹 전반에서 초안 작성, 요약, 질의응답을 수행하는 권한 인식 채팅'
  t 'Copilot Search', 'Copilot 검색'
  t 'AI-powered universal search across Microsoft 365 and connected third-party sources, with natural-language queries and handoff to chat',
    'Microsoft 365와 연결된 서드파티 소스를 아우르는 AI 통합 검색. 자연어 질의와 채팅 연계를 지원'
  t 'Copilot Pages and Notebooks', 'Copilot Pages 및 Notebooks'
  t 'Persistent, shareable workspaces for synthesizing content and grounding Copilot on curated material; stored in SharePoint Embedded/Loop containers',
    '콘텐츠를 종합하고 큐레이션된 자료를 Copilot의 근거로 삼는 지속형 공유 작업 공간. SharePoint Embedded/Loop 컨테이너에 저장'
  t 'Sales agent', 'Sales 에이전트'
  t 'Seller productivity in Teams, Outlook, and CRM apps', 'Teams, Outlook, CRM 앱에서의 영업 생산성 지원'
  t 'Service agent', 'Service 에이전트'
  t 'Customer service agent assistance across support channels', '지원 채널 전반의 고객 서비스 상담 지원'
  t 'Finance agent', 'Finance 에이전트'
  t 'Financial workflows, analysis, and reconciliation in Excel and Outlook',
    'Excel과 Outlook에서의 재무 워크플로, 분석, 대사 처리'
  t 'Employee Self-Service Agent', '직원 셀프서비스 에이전트'
  t 'HR and IT self-service within Teams for policies, FAQs, and requests',
    'Teams 내에서 정책, FAQ, 요청을 처리하는 HR·IT 셀프서비스'
  t 'SharePoint Agent', 'SharePoint 에이전트'
  t 'Q&A grounded in a specific SharePoint site or document library',
    '특정 SharePoint 사이트 또는 문서 라이브러리를 근거로 하는 Q&A'
  t 'Facilitator Agent', 'Facilitator 에이전트'
  t 'Meeting facilitation, collaborative real-time notes, Q&A, timeline markers, action items, and preview Planner/Word integrations in Teams',
    'Teams에서 회의 진행, 실시간 공동 노트, Q&A, 타임라인 마커, 액션 아이템 및 Planner/Word 연동(미리 보기) 제공'
  t 'Researcher Agent', 'Researcher 에이전트'
  t 'Performs deeper, source-cited, multi-step research across web and work content to produce structured reports, visuals, and recommendations',
    '웹과 업무 콘텐츠를 아우르는 출처 표기 다단계 심층 리서치로 구조화된 보고서, 시각 자료, 권고안을 생성'
  t 'Analyst Agent', 'Analyst 에이전트'
  t 'Transforms complex data into clear insights, charts, and visualizations using Python',
    'Python을 활용해 복잡한 데이터를 명확한 인사이트, 차트, 시각화로 변환'
  t 'Interpreter Agent', 'Interpreter 에이전트'
  t 'Real-time speech-to-speech interpretation in Teams meetings across nine languages, with optional voice simulation and included monthly capacity',
    'Teams 회의에서 9개 언어 실시간 음성 통역 제공. 음성 시뮬레이션 옵션과 월간 사용량 포함'
  t 'Project Manager Agent', 'Project Manager 에이전트'
  t 'Automates project plan creation, task tracking, and status reporting in Planner (preview)',
    'Planner에서 프로젝트 계획 수립, 작업 추적, 상태 보고를 자동화(미리 보기)'
  t 'Channel Agent', 'Channel 에이전트'
  t 'Teams channel expert for summarizing conversations, managing tasks, and boosting productivity (preview)',
    '대화 요약, 작업 관리, 생산성 향상을 지원하는 Teams 채널 전문 에이전트(미리 보기)'
  t 'Community Agent', 'Community 에이전트'
  t 'Accelerates knowledge sharing and surfaces expertise across org communities in Viva Engage (preview)',
    'Viva Engage의 조직 커뮤니티 전반에서 지식 공유를 가속하고 전문성을 발굴(미리 보기)'

  # ===== COPILOT STUDIO =====
  t 'Build governed enterprise agents that combine knowledge, tools, workflows, event triggers, human review, connected agents, evaluation, monitoring, and multi-channel deployment',
    '지식, 도구, 워크플로, 이벤트 트리거, 사람의 검토, 연결된 에이전트, 평가, 모니터링, 멀티 채널 배포를 결합한 거버넌스 기반 엔터프라이즈 에이전트를 구축합니다'
  t 'The governed low-code platform for enterprise agents that need actions, workflows, connectors, evaluation, monitoring, and broad deployment.',
    '액션, 워크플로, 커넥터, 평가, 모니터링, 광범위한 배포가 필요한 엔터프라이즈 에이전트를 위한 거버넌스 기반 로우코드 플랫폼입니다.'
  t 'Build governed enterprise agents and workflows', '거버넌스 기반 엔터프라이즈 에이전트와 워크플로 구축'
  t 'Choose Copilot Studio when you need agents that go beyond quick knowledge lookup — connecting to CRMs, databases, APIs, MCP servers, workflows, Microsoft 365 context, and other agents. Great for makers and IT teams building governed agents that can reason, take actions, evaluate quality, and deploy across channels.',
    '단순 지식 조회를 넘어서는 에이전트가 필요할 때 Copilot Studio를 선택하세요. CRM, 데이터베이스, API, MCP 서버, 워크플로, Microsoft 365 컨텍스트, 다른 에이전트와 연결됩니다. 추론하고, 액션을 실행하고, 품질을 평가하고, 여러 채널에 배포하는 거버넌스 기반 에이전트를 만드는 메이커와 IT팀에게 적합합니다.'
  t 'The best low-code platform for governed enterprise agents — connect to outside systems, automate business processes, use generative orchestration, evaluate quality, monitor behavior, and deploy to websites, Teams, Microsoft 365, and more.',
    '거버넌스 기반 엔터프라이즈 에이전트를 위한 최적의 로우코드 플랫폼입니다. 외부 시스템 연결, 업무 프로세스 자동화, 생성형 오케스트레이션, 품질 평가, 동작 모니터링, 웹사이트·Teams·Microsoft 365 등으로의 배포를 지원합니다.'
  t 'Low-code makers and IT pros', '로우코드 메이커 및 IT 전문가'
  t 'Agents connecting to external APIs, CRM, ERP, Dataverse, databases, MCP servers, or custom connectors',
    '외부 API, CRM, ERP, Dataverse, 데이터베이스, MCP 서버, 커스텀 커넥터에 연결되는 에이전트'
  t 'Event-triggered, scheduled, or user-triggered workflows with actions, branching, human review, and approvals',
    '액션, 분기, 사람의 검토, 승인을 포함한 이벤트·일정·사용자 트리거 워크플로'
  t 'Agent-to-agent orchestration — child agents, connected Copilot Studio agents, and A2A integrations',
    '에이전트 간 오케스트레이션 — 하위 에이전트, 연결된 Copilot Studio 에이전트, A2A 연동'
  t 'Automating legacy web or desktop apps with computer use when no API exists',
    'API가 없는 레거시 웹·데스크톱 앱을 컴퓨터 사용 기능으로 자동화'
  t 'Multi-turn conversational experiences with generative orchestration, Microsoft IQ context, and optional per-user memory in the new experience',
    '생성형 오케스트레이션, Microsoft IQ 컨텍스트, 새 경험의 사용자별 메모리(선택)를 활용한 멀티턴 대화 경험'
  t 'Internal and external-facing deployment', '내부 및 외부 대상 배포'
  t 'Built-in evaluation test sets, activity maps, analytics, monitoring, and tenant-wide agent inventory',
    '내장 평가 테스트 세트, 활동 맵, 분석, 모니터링, 테넌트 전체 에이전트 인벤토리'
  t 'Complex ML pipelines or custom model training require Foundry',
    '복잡한 ML 파이프라인이나 커스텀 모델 학습은 Foundry가 필요함'
  t 'Highly custom, high-scale, or code-first multi-agent orchestration is better served by Foundry',
    '고도로 커스터마이즈되거나 대규모이거나 코드 우선인 멀티 에이전트 오케스트레이션은 Foundry가 더 적합함'
  t 'Supports curated GA, preview, and experimental models, including deep reasoning models; use Foundry for arbitrary bring-your-own model hosting, custom model training, model routing, and full runtime control',
    '심층 추론 모델을 포함한 큐레이션된 GA·미리 보기·실험 모델을 지원함. 임의의 자체 모델 호스팅, 커스텀 모델 학습, 모델 라우팅, 완전한 런타임 제어가 필요하면 Foundry를 사용'
  t 'Memory is available in the new experience preview with per-user/per-agent storage and lifecycle limits; use Foundry when you need custom memory architecture, longer retention, or application-controlled memory',
    '메모리는 새 경험 미리 보기에서 사용자별·에이전트별 저장소와 수명주기 제한과 함께 제공됨. 커스텀 메모리 아키텍처, 더 긴 보존 기간, 애플리케이션 제어 메모리가 필요하면 Foundry를 사용'
  t 'Computer use requires careful credential, supervision, access-control, observability, and cost governance',
    '컴퓨터 사용 기능은 자격 증명, 감독, 접근 제어, 관측성, 비용 거버넌스를 신중히 관리해야 함'
  t 'Copilot Credits can scale quickly with generative answers, agent actions, tenant graph grounding, workflows, reasoning models, voice, and computer use',
    '생성형 답변, 에이전트 액션, 테넌트 그래프 그라운딩, 워크플로, 추론 모델, 음성, 컴퓨터 사용에 따라 Copilot 크레딧이 빠르게 증가할 수 있음'
  t '🛠️ <strong>Developer tip:</strong> You can build Copilot Studio agents in YAML using the <a href="https://learn.microsoft.com/microsoft-copilot-studio/authoring-overview" target="_blank" rel="noopener noreferrer">Copilot Studio extension for VS Code</a>',
    '🛠️ <strong>개발자 팁:</strong> <a href="https://learn.microsoft.com/microsoft-copilot-studio/authoring-overview" target="_blank" rel="noopener noreferrer">VS Code용 Copilot Studio 확장</a>을 사용하면 YAML로 Copilot Studio 에이전트를 만들 수 있습니다'

  # ===== FOUNDRY =====
  t 'A developer platform and managed agent runtime for building, deploying, evaluating, and operating production-grade agents with full code, model, tool, identity, networking, and observability control',
    '코드, 모델, 도구, ID, 네트워킹, 관측성을 완전히 제어하며 프로덕션급 에이전트를 구축·배포·평가·운영하는 개발자 플랫폼이자 관리형 에이전트 런타임입니다'
  t 'The right choice when production agents need code-first control, managed hosting, custom retrieval, advanced tooling, identity, observability, or strict compliance.',
    '프로덕션 에이전트에 코드 우선 제어, 관리형 호스팅, 커스텀 검색, 고급 도구, ID, 관측성, 엄격한 규정 준수가 필요할 때 적합합니다.'
  t 'Build and operate production-grade agentic systems', '프로덕션급 에이전트 시스템 구축 및 운영'
  t 'Choose Microsoft Foundry when your team needs a managed agent runtime with full developer control — prompt agents, hosted code agents, custom protocols, Foundry models, toolboxes, MCP, Foundry IQ, private networking, agent identity, tracing, evaluation, monitoring, and publishing to Microsoft 365 or custom apps. Built for professional developers, architects, and ML engineers.',
    '팀이 완전한 개발자 제어권을 갖춘 관리형 에이전트 런타임이 필요할 때 Microsoft Foundry를 선택하세요. 프롬프트 에이전트, 호스팅 코드 에이전트, 커스텀 프로토콜, Foundry 모델, 툴박스, MCP, Foundry IQ, 프라이빗 네트워킹, 에이전트 ID, 추적, 평가, 모니터링, Microsoft 365 및 커스텀 앱으로의 게시를 지원합니다. 전문 개발자, 아키텍트, ML 엔지니어를 위해 만들어졌습니다.'
  t 'The right choice when your team needs to build and operate production-grade agents as software — with managed endpoints, versioning, custom code, model catalog access, custom retrieval, agent identity, private networking, tracing, evaluation, and monitoring.',
    '프로덕션급 에이전트를 소프트웨어로 구축하고 운영해야 할 때 적합합니다. 관리형 엔드포인트, 버전 관리, 커스텀 코드, 모델 카탈로그 접근, 커스텀 검색, 에이전트 ID, 프라이빗 네트워킹, 추적, 평가, 모니터링을 제공합니다.'
  t 'Professional developers, architects, and ML engineers', '전문 개발자, 아키텍트, ML 엔지니어'
  t 'Prompt agents when you want Foundry to run the agent without maintaining application code',
    '애플리케이션 코드를 유지보수하지 않고 Foundry가 에이전트를 실행하게 하려면 프롬프트 에이전트를 사용'
  t 'Hosted agents when you need your own code, Agent Framework, LangGraph, OpenAI Agents SDK, Anthropic Agent SDK, GitHub Copilot SDK, or custom frameworks',
    '자체 코드, Agent Framework, LangGraph, OpenAI Agents SDK, Anthropic Agent SDK, GitHub Copilot SDK, 커스텀 프레임워크가 필요하면 호스팅 에이전트를 사용'
  t 'Agents embedded in custom-built applications, backend services, APIs, webhooks, voice systems, or custom protocols',
    '자체 구축 애플리케이션, 백엔드 서비스, API, 웹훅, 음성 시스템, 커스텀 프로토콜에 임베드되는 에이전트'
  t 'Custom RAG and enterprise retrieval with Foundry IQ, Azure AI Search, Azure Blob Storage, SharePoint, OneLake, web sources, citations, ACLs, and Purview sensitivity labels',
    'Foundry IQ, Azure AI Search, Azure Blob Storage, SharePoint, OneLake, 웹 소스, 인용, ACL, Purview 민감도 레이블을 활용한 커스텀 RAG 및 엔터프라이즈 검색'
  t 'Foundry Toolboxes and MCP-compatible tool bundles with centralized authentication, versioning, and policy enforcement',
    '중앙 집중식 인증, 버전 관리, 정책 적용을 갖춘 Foundry 툴박스 및 MCP 호환 도구 번들'
  t 'Dedicated Microsoft Entra agent identities, RBAC, private networking, content filters, and bring-your-own Azure resources',
    '전용 Microsoft Entra 에이전트 ID, RBAC, 프라이빗 네트워킹, 콘텐츠 필터, 자체 Azure 리소스 사용'
  t 'Full development lifecycle — versioning, stable endpoints, rollback, publishing, tracing, evaluation, optimization, monitoring, and Application Insights integration',
    '전체 개발 수명주기 — 버전 관리, 안정적 엔드포인트, 롤백, 게시, 추적, 평가, 최적화, 모니터링, Application Insights 연동'
  t 'Publishing agents to Microsoft 365 Copilot, Teams, custom apps, services, and the Entra Agent Registry',
    'Microsoft 365 Copilot, Teams, 커스텀 앱, 서비스, Entra 에이전트 레지스트리로 에이전트 게시'
  t 'Strict compliance, data residency, private networking, or security requirements',
    '엄격한 규정 준수, 데이터 상주, 프라이빗 네트워킹, 보안 요구사항'
  t 'Higher implementation complexity and time-to-value', '구현 복잡도가 높고 가치 실현까지 시간이 더 걸림'
  t 'Requires Azure expertise and development resources', 'Azure 전문성과 개발 리소스가 필요함'
  t 'Hosted agents add container compute, framework, protocol, and operational responsibilities',
    '호스팅 에이전트는 컨테이너 컴퓨팅, 프레임워크, 프로토콜, 운영 책임이 추가됨'
  t 'Some capabilities, including selected tools, optimizer, A2A, and portions of agentic retrieval, may be preview depending on API version, region, and setup',
    '일부 도구, 옵티마이저, A2A, 에이전틱 검색의 일부 기능은 API 버전·리전·구성에 따라 미리 보기 상태일 수 있음'
  t 'Use Copilot Studio for low-code departmental workflows, Dataverse/custom connector automations, and fast maker-led delivery',
    '로우코드 부서 워크플로, Dataverse·커스텀 커넥터 자동화, 메이커 주도의 빠른 구현에는 Copilot Studio를 사용'
  t 'Use Agent Builder for simple no-code Microsoft 365 Copilot knowledge agents',
    '단순한 노코드 Microsoft 365 Copilot 지식 에이전트에는 Agent Builder를 사용'

  # ===== COWORK =====
  t 'A ready-made agent inside Microsoft 365 Copilot that plans and completes multi-step work on your behalf — and can be extended with custom skills and plugins',
    'Microsoft 365 Copilot 내부에서 다단계 업무를 대신 계획하고 완료하는 완성형 에이전트입니다. 커스텀 스킬과 플러그인으로 확장할 수 있습니다'
  t 'Best for delegating a bounded, multi-step Microsoft 365 deliverable on demand.',
    '범위가 정해진 다단계 Microsoft 365 산출물을 필요할 때 위임하는 데 가장 적합합니다.'
  t 'Delegate multi-step Microsoft 365 work on demand', '다단계 Microsoft 365 업무를 필요할 때 위임하기'
  t 'Cowork acts as your AI delegate inside Microsoft 365 Copilot — you describe an outcome, it creates a plan, works through the steps, and pauses for approval before sensitive actions. Ideal for meeting prep, inbox and calendar cleanup, deep research, and coordinated document sets, with human-in-the-loop checkpoints.',
    'Cowork는 Microsoft 365 Copilot 내부의 AI 대리인입니다. 원하는 결과를 설명하면 계획을 세우고 단계를 진행하며, 민감한 작업 전에는 승인을 위해 멈춥니다. 회의 준비, 받은 편지함·일정 정리, 심층 리서치, 연계된 문서 세트 작성에 이상적이며 사람이 확인하는 체크포인트를 제공합니다.'
  t 'Delegate a defined, multi-step outcome across Microsoft 365 and get the work package completed — with approvals and checkpoints before sensitive actions.',
    'Microsoft 365 전반에 걸친 명확한 다단계 결과물을 위임하고 완성된 업무 패키지를 받으세요. 민감한 작업 전에는 승인과 체크포인트가 제공됩니다.'
  t 'Handing off a bounded, multi-step Microsoft 365 deliverable on demand',
    '범위가 정해진 다단계 Microsoft 365 산출물을 필요할 때 위임'
  t 'Meeting packets, inbox and calendar cleanup, deep research, coordinated document sets',
    '회의 자료 묶음, 받은 편지함·일정 정리, 심층 리서치, 연계된 문서 세트'
  t 'Human-in-the-loop control — progress updates, approval checkpoints, pause/resume/cancel',
    '사람이 개입하는 제어 — 진행 상황 업데이트, 승인 체크포인트, 일시정지·재개·취소'
  t 'Grounded in your Microsoft 365 context (email, meetings, files, messages) via Work IQ',
    'Work IQ를 통해 Microsoft 365 컨텍스트(메일, 회의, 파일, 메시지)를 근거로 동작'
  t 'Extending the experience with custom skills and plugins',
    '커스텀 스킬과 플러그인으로 경험 확장'
  t 'On demand and user-initiated — not always-on or proactively monitoring',
    '필요할 때 사용자가 시작함 — 상시 실행이나 선제적 모니터링은 아님'
  t 'Centered on Microsoft 365 — no desktop, shell, browser, or local-file runtime',
    'Microsoft 365 중심 — 데스크톱, 셸, 브라우저, 로컬 파일 런타임은 없음'
  t 'Usage-based billing through Copilot Credits', 'Copilot 크레딧 기반의 사용량 과금'
  t 'Take actions like sending email or posting in Teams require explicit approval',
    '메일 발송이나 Teams 게시 같은 액션은 명시적 승인이 필요함'
  t 'Use Microsoft 365 Copilot (Copilot Chat) instead when you just want to ask and iterate yourself',
    '직접 질문하고 반복하며 진행하고 싶다면 Microsoft 365 Copilot(Copilot 채팅)을 사용하세요'
  t 'Use Scout instead when work should run continuously or reach beyond Microsoft 365',
    '업무가 지속적으로 실행되거나 Microsoft 365를 넘어서야 한다면 Scout를 사용하세요'

  # ===== SCOUT =====
  t 'An always-on personal Autopilot desktop app that works autonomously across your files, shell, browser, and Microsoft 365 — and can be extended with custom skills and plugins',
    '파일, 셸, 브라우저, Microsoft 365 전반에서 자율적으로 동작하는 상시 실행 개인 Autopilot 데스크톱 앱입니다. 커스텀 스킬과 플러그인으로 확장할 수 있습니다'
  t 'Best for always-on, proactive follow-through across desktop, browser, and Microsoft 365.',
    '데스크톱, 브라우저, Microsoft 365 전반에서 상시 선제적으로 후속 조치를 이어가는 데 가장 적합합니다.'
  t 'An always-on personal autonomous agent', '상시 실행되는 개인 자율 에이전트'
  t "Scout is Microsoft's first Autopilot — an always-on personal agent with its own identity that works autonomously across files, shell, browser, and Microsoft 365, including in the background on schedules or triggers. Ideal for proactive monitoring, coordination, and follow-through that spans local and cloud environments. Currently a Frontier preview.",
    'Scout는 Microsoft의 첫 번째 Autopilot입니다. 자체 ID를 가진 상시 실행 개인 에이전트로 파일, 셸, 브라우저, Microsoft 365 전반에서 자율적으로 동작하며, 일정이나 트리거에 따라 백그라운드에서도 실행됩니다. 로컬과 클라우드 환경을 아우르는 선제적 모니터링, 조율, 후속 조치에 이상적입니다. 현재 Frontier 미리 보기입니다.'
  t 'An always-on Autopilot that proactively keeps work moving across desktop, browser, local files, and Microsoft 365 — even when you are not prompting it.',
    '사용자가 지시하지 않아도 데스크톱, 브라우저, 로컬 파일, Microsoft 365 전반에서 업무를 선제적으로 이어가는 상시 실행 Autopilot입니다.'
  t 'Continuous, proactive follow-through rather than one-time tasks',
    '일회성 작업이 아닌 지속적·선제적 후속 조치'
  t 'Scheduled or condition-triggered work via heartbeat mode and automations',
    '하트비트 모드와 오토메이션을 통한 일정 기반 또는 조건 트리거 작업'
  t 'Acting across local files, shell commands, browser automation, code, and Microsoft 365',
    '로컬 파일, 셸 명령, 브라우저 자동화, 코드, Microsoft 365 전반에서 실행'
  t 'Delegating work to specialized sub-agents', '전문 하위 에이전트에게 업무 위임'
  t 'Monitoring for risks like stalled decisions and upcoming deliverables',
    '지연된 의사결정, 임박한 산출물 같은 리스크 모니터링'
  t 'Frontier preview — capabilities, access, and commercialization details can change',
    'Frontier 미리 보기 — 기능, 접근 권한, 상용화 세부사항이 변경될 수 있음'
  t 'Gated through Frontier enrollment, Intune policy, attestation, and GitHub Copilot licensing',
    'Frontier 등록, Intune 정책, 증명, GitHub Copilot 라이선스를 통해 접근이 제한됨'
  t 'Desktop application for Windows and macOS', 'Windows 및 macOS용 데스크톱 애플리케이션'
  t 'Sensitive actions (sending email, writing files, running commands) require approval',
    '민감한 작업(메일 발송, 파일 쓰기, 명령 실행)에는 승인이 필요함'
  t 'Use Cowork instead when the work is a bounded Microsoft 365 deliverable done on demand',
    '범위가 정해진 Microsoft 365 산출물을 필요할 때 처리하는 업무라면 Cowork를 사용하세요'
end
