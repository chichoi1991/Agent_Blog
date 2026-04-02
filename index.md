---
layout: default
title: "홈"
---

<section class="hero">
  <span class="hero-badge">Microsoft Copilot Studio 실무 가이드</span>
  <h1>Copilot Studio로 시작하는<br>Agent 기반 업무 자동화</h1>
  <p>비개발자도, 개발자도 함께 활용할 수 있는 Copilot Studio 실무 가이드입니다. 도입 검토부터 배포·운영까지, 단계별로 안내합니다.</p>
</section>

<section class="chapters-section">
  <h2 class="section-title">📖 가이드 목차</h2>
  <p class="section-subtitle">각 챕터를 클릭하면 상세 내용을 확인할 수 있습니다.</p>

  <div class="chapters-grid">

    <a href="{{ '/chapters/ch0-guide-premise/' | relative_url }}" class="chapter-card">
      <div class="card-top">
        <div class="card-icon icon-guide">📋</div>
        <span class="card-chapter">Chapter 0</span>
      </div>
      <h3 class="card-title">가이드의 전제</h3>
      <p class="card-desc">Copilot Studio로 가능한 것과 한계, 직접 개발(SI)과의 경계 기준을 정리합니다.</p>
      <div class="card-tags">
        <span class="card-tag">가능 범위</span>
        <span class="card-tag">한계</span>
        <span class="card-tag">SI 경계</span>
      </div>
    </a>

    <a href="{{ '/chapters/ch1-overview/' | relative_url }}" class="chapter-card">
      <div class="card-top">
        <div class="card-icon icon-overview">🌐</div>
        <span class="card-chapter">Chapter 1</span>
      </div>
      <h3 class="card-title">Copilot Studio 개요 및 접속</h3>
      <p class="card-desc">Copilot Studio에 접속하는 방법, 라이선스 요건, 유사 서비스와의 차이를 설명합니다.</p>
      <div class="card-tags">
        <span class="card-tag">접속 URL</span>
        <span class="card-tag">라이선스</span>
        <span class="card-tag">서비스 비교</span>
      </div>
    </a>

    <a href="{{ '/chapters/ch2-ui-overview/' | relative_url }}" class="chapter-card">
      <div class="card-top">
        <div class="card-icon icon-ui">🖥️</div>
        <span class="card-chapter">Chapter 2</span>
      </div>
      <h3 class="card-title">Copilot Studio 화면 구성 이해</h3>
      <p class="card-desc">Agent 개념과 주요 메뉴(Topics, Generative Answers, Actions, Knowledge)를 파악합니다.</p>
      <div class="card-tags">
        <span class="card-tag">Agent</span>
        <span class="card-tag">Topics</span>
        <span class="card-tag">Knowledge</span>
      </div>
    </a>

    <a href="{{ '/chapters/ch3-semi-dev-agent/' | relative_url }}" class="chapter-card">
      <div class="card-top">
        <div class="card-icon icon-agent">⚙️</div>
        <span class="card-chapter">Chapter 3</span>
      </div>
      <h3 class="card-title">반개발형 Agent 만들기</h3>
      <p class="card-desc">대화 설계, 변수·상태 관리, Action 기반 처리 흐름 등 핵심 구축 방법을 다룹니다.</p>
      <div class="card-tags">
        <span class="card-tag">대화 설계</span>
        <span class="card-tag">변수 관리</span>
        <span class="card-tag">Action</span>
      </div>
    </a>

    <a href="{{ '/chapters/ch4-external-integration/' | relative_url }}" class="chapter-card">
      <div class="card-top">
        <div class="card-icon icon-connect">🔗</div>
        <span class="card-chapter">Chapter 4</span>
      </div>
      <h3 class="card-title">외부 시스템 연동 방식</h3>
      <p class="card-desc">Power Automate, 표준 커넥터, HTTP API, 인증 방식 등 외부 연동 전략을 안내합니다.</p>
      <div class="card-tags">
        <span class="card-tag">Power Automate</span>
        <span class="card-tag">API</span>
        <span class="card-tag">인증</span>
      </div>
    </a>

    <a href="{{ '/chapters/ch5-selection-guide/' | relative_url }}" class="chapter-card">
      <div class="card-top">
        <div class="card-icon icon-compare">⚖️</div>
        <span class="card-chapter">Chapter 5</span>
      </div>
      <h3 class="card-title">Copilot Studio vs 직접 개발 선택 가이드</h3>
      <p class="card-desc">Studio에 적합한 요구사항, SI가 필요한 경우, 혼합 구조 패턴을 비교합니다.</p>
      <div class="card-tags">
        <span class="card-tag">적합성 판단</span>
        <span class="card-tag">혼합 구조</span>
      </div>
    </a>

    <a href="{{ '/chapters/ch6-deployment/' | relative_url }}" class="chapter-card">
      <div class="card-top">
        <div class="card-icon icon-deploy">🚀</div>
        <span class="card-chapter">Chapter 6</span>
      </div>
      <h3 class="card-title">배포 및 사용 범위 설정</h3>
      <p class="card-desc">Teams 배포, Web App 배포, 사용자·조직별 사용 범위 관리 방법을 다룹니다.</p>
      <div class="card-tags">
        <span class="card-tag">Teams</span>
        <span class="card-tag">Web App</span>
        <span class="card-tag">범위 관리</span>
      </div>
    </a>

    <a href="{{ '/chapters/ch7-org-agent/' | relative_url }}" class="chapter-card">
      <div class="card-top">
        <div class="card-icon icon-org">🏢</div>
        <span class="card-chapter">Chapter 7</span>
      </div>
      <h3 class="card-title">조직 공용 Agent 운영</h3>
      <p class="card-desc">개인 Agent vs 조직 Agent, 등록 프로세스, 전사 운영 유의사항을 정리합니다.</p>
      <div class="card-tags">
        <span class="card-tag">조직 Agent</span>
        <span class="card-tag">등록 프로세스</span>
        <span class="card-tag">운영</span>
      </div>
    </a>

    <a href="{{ '/chapters/ch8-references/' | relative_url }}" class="chapter-card">
      <div class="card-top">
        <div class="card-icon icon-ref">📚</div>
        <span class="card-chapter">Chapter 8</span>
      </div>
      <h3 class="card-title">참고 자료 및 확장 방향</h3>
      <p class="card-desc">공식 문서, 연계 자료, 향후 아키텍처 확장 방향을 제시합니다.</p>
      <div class="card-tags">
        <span class="card-tag">공식 문서</span>
        <span class="card-tag">확장 방향</span>
      </div>
    </a>

  </div>
</section>
