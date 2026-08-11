---
layout: "chapter"
date: 2026-03-17
title: "Microsoft Learn MCP Server"
short_title: "MS Learn MCP"
description: "Microsoft Learn Docs MCP Server를 Copilot Studio 에이전트에 연결해 실시간 문서 기반 답변을 구현하는 Special Ops 랩입니다."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/ms-learn-mcp/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-08-10"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/ms-learn-mcp/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [📚 Microsoft Learn MCP Server](https://microsoft.github.io/agent-academy/special-ops/ms-learn-mcp/)를 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# 📚 Microsoft Learn MCP Server

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/Academy_LearnMCP_Badge.png' | relative_url }}" alt="Microsoft Learn MCP Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Microsoft Learn MCP Badge</figcaption></figure>

이번 미션 **Operation Open Book**에서는 **Microsoft Learn Docs MCP Server**를 Copilot Studio 에이전트에 연결해, Microsoft Learn 문서를 실시간으로 조회하도록 구성합니다. 모델 내부 기억에만 의존하지 않고 최신 공식 문서를 근거로 답변하게 만들 수 있습니다.

<div class="info-box note" markdown="1">
**중요**: 이 미션은 Copilot Studio **새 작성 환경(New Experience)** 기준입니다. 화면이 다르면 오른쪽 위에서 New Experience를 켜고 진행하세요.
</div>

## 🔧 이 랩에서 만들 것

- Microsoft Learn Docs MCP Server에 연결된 Copilot Studio 에이전트
- `microsoft_docs_search` 등 MCP 도구를 사용할 수 있는 연결
- Microsoft 제품 질문에 대해 공식 문서를 근거로 답변하는 에이전트

## ⚙️ 사전 요구사항

- Microsoft Copilot Studio 체험판 또는 유료 계정
- 계정이 없다면 [course setup](https://microsoft.github.io/agent-academy/recruit/00-course-setup/) 참고

<div class="info-box note" markdown="1">
**참고**: 로컬 도구 설치가 필요 없습니다. Microsoft Learn MCP Server는 Microsoft에서 호스팅하는 원격 서버입니다.
</div>

### Microsoft Learn MCP Server란?

Microsoft Learn MCP Server는 에이전트에게 "실시간 문서 라이브러리 접근권"을 부여하는 것과 같습니다. 개별 문서를 지식으로 수동 등록하는 대신, 사용자 질문 시점에 문서를 바로 검색해 활용할 수 있습니다.

서버 엔드포인트:

```text
https://learn.microsoft.com/api/mcp
```

이 서버는 Model Context Protocol(MCP)을 구현합니다. MCP는 AI 모델이 외부 도구를 일관된 방식으로 호출하게 해 주는 오픈 표준입니다.

### 무엇을 할 수 있나요?

주요 도구 `microsoft_docs_search`로 Microsoft Learn 인덱스를 검색해 관련 문서를 찾습니다.

- Power Platform, Azure, Microsoft 365 등 제품 질문 답변
- 공식 최신 문서 링크 제공
- 실제 문서 기반 응답으로 환각(hallucination) 감소

또한 코드 샘플 탐색용 `microsoft_code_sample_search` 도구도 사용할 수 있습니다.

### 왜 중요한가요?

외부 grounding 없이 모델 기억만 사용하면 최신성이 떨어질 수 있습니다. 반면 MCP 서버를 연결하면 응답 시점마다 실시간 검색이 이뤄져 최신 문서 기반 답변을 생성할 수 있습니다.

## 🎯 시나리오

Zava 팀은 Microsoft 365, Azure, Power Platform 관련 내부 지원 에이전트를 만들고 있습니다. 수동 지식 베이스 대신 Microsoft Learn 실시간 검색으로 정확도와 최신성을 높이려 합니다. 여러분은 이 연결을 구현하는 에이전트 빌더입니다.

## 🧪 Lab 1.1 - 지원 에이전트 만들기

1. [Microsoft Copilot Studio](https://copilotstudio.microsoft.com)에 로그인하고 오른쪽 위 New Experience가 켜져 있는지 확인합니다.
1. 홈 화면의 **select what you want to build**에서 **Agent**를 선택합니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.1.01_new.png' | relative_url }}" alt="에이전트 만들기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 만들기</figcaption></figure>

1. 왼쪽 상단 **Name your agent**에 아래 이름을 입력합니다.

```text
Microsoft Product Support
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-02.png' | relative_url }}" alt="Name your agent" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 이름 입력</figcaption></figure>

1. 에이전트는 자동 저장되며, 필요하면 오른쪽 위 **Save**를 눌러 수동 저장할 수 있습니다.

## 🧪 Lab 1.2 - Microsoft Learn Docs MCP Server 연결

1. 오른쪽 구성 패널 **Tools**에서 **+ Add tool** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-03.png' | relative_url }}" alt="Add Tool" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>도구 추가</figcaption></figure>

1. **Model Context Protocol (MCP)** 탭에서 `Microsoft Learn` 검색 후 **Microsoft Learn Docs MCP Server** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-04.png' | relative_url }}" alt="Select MCP server" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 서버 선택</figcaption></figure>

1. 연결이 없다면 **Not connected** 드롭다운에서 **Create new connection** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-05.png' | relative_url }}" alt="Create new connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 연결 생성</figcaption></figure>

1. **Create**를 눌러 연결 생성

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-06.png' | relative_url }}" alt="Create connection confirm" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>연결 생성 확인</figcaption></figure>

1. **Add** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-07.png' | relative_url }}" alt="Add" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>도구 추가 완료</figcaption></figure>

1. Tools 패널의 서버 칩을 선택해 **Edit**를 열고, `microsoft_docs_search`, `microsoft_code_sample_search`, `microsoft_docs_fetch` 활성화 상태를 확인한 뒤 **Confirm**

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-08.png' | relative_url }}" alt="Observe MCP tools" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 도구 확인</figcaption></figure>

## 🧪 Lab 1.3 - 지시문(Instructions) 추가

1. Build 탭의 **Instructions** 필드를 선택하고 아래 내용을 붙여넣습니다.

```text
You are a helpful Microsoft documentation assistant. When a user asks a question about any Microsoft product, service, or technology, use the microsoft_docs_search tool to find relevant, accurate information from Microsoft Learn. If a user asks a question about a code sample, use the microsoft_code_sample_search tool to find a relevant code sample. Always cite the source documentation URL in your response. If the search does not return a relevant result, tell the user and suggest they visit https://learn.microsoft.com directly.
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-09.png' | relative_url }}" alt="Enter instructions" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Instructions 입력</figcaption></figure>

<div class="info-box note" markdown="1">
**팁**: MCP 도구 사용을 지시문에 명시해야 에이전트가 일반 지식 대신 MCP 도구를 우선 호출합니다.
</div>

1. 오른쪽 위 **Save**를 선택합니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-10.png' | relative_url }}" alt="Save" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>저장</figcaption></figure>

## 🧪 Lab 1.4 - 에이전트 테스트

1. 상단 **Preview** 탭으로 이동

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-11.png' | relative_url }}" alt="Open Preview tab" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview 탭</figcaption></figure>

1. 채팅 입력창에 아래 메시지 전송

```text
What types of agents can I build in Copilot Studio?
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-12.png' | relative_url }}" alt="Send test message" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>첫 테스트 메시지</figcaption></figure>

1. 최초 호출 시 **Permission Required** 카드가 보이면 **Allow** 선택

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-13.png' | relative_url }}" alt="Allow MCP connection" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>MCP 연결 허용</figcaption></figure>

1. 응답에서 `microsoft_docs_search` 호출과 문서 인용(Citations) 확인

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-14.png' | relative_url }}" alt="Grounded test result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>근거 기반 응답 확인</figcaption></figure>

<div class="info-box note" markdown="1">
**팁**: Preview 기본 모드는 도구 호출/계획을 보여주는 테스트 모드입니다. **End user preview**를 켜면 실제 최종 사용자 화면처럼 볼 수 있습니다.
</div>

1. **End user preview**를 켜고 후속 질문 전송

```text
What are the licensing requirements for Copilot Studio?
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-15.png' | relative_url }}" alt="Second test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>후속 질문 테스트</figcaption></figure>

1. 다시 인용 기반 응답을 확인합니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-16.png' | relative_url }}" alt="Follow-up cited result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>후속 질문 응답 확인</figcaption></figure>

<div class="info-box note" markdown="1">
**참고**: MCP 도구 호출 시 잠깐 지연이 발생할 수 있으며 정상 동작입니다.
</div>

1. **New chat**를 누르고 End user preview를 다시 끈 뒤 아래 메시지를 전송합니다.

```text
Find a good code sample for creating a PCF control
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-17.png' | relative_url }}" alt="New chat" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 채팅 시작</figcaption></figure>

1. 이번에는 `microsoft_code_sample_search`가 호출되는지 확인합니다.

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-18.png' | relative_url }}" alt="Code sample result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>코드 샘플 검색 결과</figcaption></figure>

## 🧪 Lab 1.5 - 폴백 동작 테스트

지시문의 폴백 규칙(`관련 결과가 없으면 learn.microsoft.com 방문 안내`)이 실제로 동작하는지 확인합니다.

<div class="info-box note" markdown="1">
**참고**: 새 Copilot Studio에서는 기존의 **Use general knowledge**, **Use information from the web** 토글이 사라졌습니다. 웹 grounding은 Build 탭의 **Search all websites** 지식 소스 제거로 제어합니다.
</div>

1. Build 탭 **Knowledge**에서 **Search all websites** 소스를 X(제거)로 삭제

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-19.png' | relative_url }}" alt="Remove Search all websites" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>웹 검색 지식 소스 제거</figcaption></figure>

1. 상단 **Save** 선택
1. Preview 탭으로 이동해 **New chat** 후 아래 메시지 전송

```text
What is the recipe for chocolate cake?
```

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-20.png' | relative_url }}" alt="Fallback test" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>폴백 테스트 질문</figcaption></figure>

1. 에이전트가 관련 Microsoft Learn 결과 없음 안내 또는 Microsoft 문서 범위로 유도하는지 확인

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/step-21.png' | relative_url }}" alt="Fallback test result" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>폴백 동작 확인</figcaption></figure>

## 🧪 Lab 1.6 - 보너스: Skill로 확장하기

지금까지 에이전트는 Microsoft Learn MCP Server에서 최신 기술 답변과 코드 샘플을 검색할 수 있게 됐습니다. 이 보너스 랩에서는 재사용 가능한 **Skill**을 추가해 에이전트가 가이드형 학습 경험(레슨, 학습 가이드, 퀴즈 등)을 제공하도록 확장합니다.

### Skill이란?

**Skill**은 요청이 해당 Skill의 목적에 맞을 때 에이전트가 로드하는 재사용 가능한 지시문 모음입니다. 이름과 설명으로 오케스트레이터가 사용 시점을 결정하며, Skill의 전체 지시문이 해당 작업을 수행하는 방법을 정의합니다. 이 랩에서는 `teach` Skill로 반복 가능한 학습 프로세스를 구현합니다.

에이전트의 핵심 지시문을 모든 대화에 적용되는 직원 핸드북이라고 생각하면, Skill은 특정 작업에서만 꺼내는 절차 카드입니다. Skill은 에이전트가 작업을 *어떻게* 처리할지를 안내하고, MCP 도구는 외부 역량과 최신 정보에 대한 접근을 제공합니다.

1. 에이전트의 **Build** 탭에서 **Skills** 옆의 **Add (+)** 선택

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_AddSkill.png' | relative_url }}" alt="Build 탭에서 Skill 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Build 탭에서 Skill 추가</figcaption></figure>

1. **Add skill** 대화 상자에서 **Create from blank** 선택

1. 아래 내용으로 필드 입력:

    **Name**:

    ```text
    teach
    ```

    **Description**:

    ```text
    Teach a user a new skill or concept through short, goal-focused lessons, practice, feedback, retrieval, and adaptive progression. Use when a user asks to learn, understand, practice, or become proficient in a topic over one or more conversations.
    ```

    **Instructions** (아래 내용을 그대로 붙여넣기):

    ````markdown
    # Teach

    Act as an adaptive teacher. Help the user build knowledge they can apply and retain—not merely read an explanation.

    ## Core approach

    - Tie teaching to a concrete real-world goal.
    - Teach one tightly scoped concept or skill at a time.
    - Keep explanations short enough to fit working memory.
    - Follow explanation with active practice and immediate feedback.
    - Adjust difficulty so the work is challenging but achievable.
    - Prefer trustworthy, current sources over unsupported claims.
    - Build long-term retention through retrieval, spacing, and interleaving.

    ## Start a learning journey

    Before teaching, determine:

    1. What the user wants to learn.
    2. Why they want to learn it and what they need to accomplish.
    3. What they already know or can already do.
    4. Their constraints, such as time, tools, accessibility, budget, or deadline.
    5. How they prefer to learn, if relevant.

    Do not conduct a long intake interview. Ask only the smallest number of questions needed to choose a useful first lesson. If the user's goal and level are already clear, begin immediately.

    Summarize the learning mission in this compact form:

    ```markdown
    **Goal:** {real-world outcome}
    **Success:** {observable abilities or deliverables}
    **Current level:** {relevant prior knowledge}
    **Constraints:** {important boundaries}
    ```

    Treat this mission as the compass for future lessons. If the goal changes, confirm the change with the user and update the summary.

    ## Choose what to teach next

    Select the smallest useful next step that:

    - directly supports the learning mission;
    - builds on demonstrated knowledge;
    - corrects an important misconception; or
    - removes the most immediate blocker.

    Do not reteach material the user has already demonstrated. Do not jump so far ahead that success depends on several unexplained concepts.

    If the user requests a specific lesson, honor that request unless a missing prerequisite makes it impractical. In that case, explain the prerequisite briefly and teach only what is necessary.

    ## Lesson pattern

    Use this sequence by default:

    1. **Outcome** — State what the user will be able to do by the end.
    2. **Explain** — Teach only the knowledge required for that outcome.
    3. **Example** — Show one concrete, mission-relevant example.
    4. **Practice** — Ask the user to retrieve, decide, create, explain, or perform something.
    5. **Feedback** — Identify what was correct, what needs adjustment, and why.
    6. **Transfer** — Give a slightly different scenario so the user applies the idea rather than copying it.
    7. **Recap** — Compress the lesson into a few durable takeaways.
    8. **Next step** — Recommend the next lesson or a short practice task.

    Keep each lesson focused on one tangible win. Break broad topics into multiple lessons.

    ## Teaching knowledge

    Make new information easy to acquire:

    - Use plain language before specialized terminology.
    - Connect unfamiliar ideas to something the user already knows.
    - Prefer examples from the user's stated goal or environment.
    - Distinguish facts, conventions, opinions, and uncertainty.
    - Cite high-quality sources when factual accuracy matters or when tools allow research.
    - Prefer primary documentation, peer-reviewed research, recognized experts, and strongly moderated practitioner communities.
    - Never invent a citation, source, or claim of consensus.

    When recommending a source, say what it is useful for. A short, curated list is better than a large link dump.

    ## Building durable skill

    Do not mistake recognition for mastery. Use active recall and application:

    - Ask the user to explain an idea in their own words.
    - Ask them to choose between plausible options and justify the choice.
    - Use realistic scenarios, exercises, simulations, or step-by-step performance.
    - Revisit important ideas after other material has intervened.
    - Mix related skills once each has been taught independently.
    - Give feedback as soon as possible.

    For multiple-choice questions:

    - Make distractors plausible.
    - Avoid clues from answer length, grammar, formatting, or position.
    - Keep answer choices similar in length when practical.
    - Explain why the selected answer is right or wrong after the user responds.

    Do not reveal an exercise's answer before the user attempts it unless they explicitly ask.

    ## Adapt to the learner

    Increase difficulty when the user can:

    - retrieve the concept without hints;
    - apply it in a new scenario;
    - explain their reasoning accurately; or
    - complete the skill with few errors.

    Reduce or restructure difficulty when the user:

    - repeatedly makes the same error;
    - cannot identify the first step;
    - is overloaded by terminology;
    - succeeds only by copying the example; or
    - says the pace or format is not working.

    When the user is stuck, provide the smallest useful hint first. Escalate from a hint, to a partial example, to a full explanation only as needed.

    ## Track learning in conversation

    Maintain a concise internal learning state from the conversation:

    - mission and success criteria;
    - concepts or skills the user has demonstrated;
    - misconceptions that were corrected;
    - unresolved questions or weak areas;
    - teaching preferences and constraints;
    - the most useful next step.

    Treat coverage and demonstrated learning differently. Record something as learned only when the user provides evidence through recall, explanation, application, or performance.

    When continuity may be lost or the user asks for a progress summary, provide:

    ```markdown
    ## Learning checkpoint

    **Mission:** {goal}
    **Demonstrated:** {what the user can now do}
    **Still developing:** {gaps or misconceptions}
    **Useful terms:** {term — concise definition}
    **Trusted resources:** {source — when to use it}
    **Recommended next step:** {next lesson or practice}
    ```

    The user can paste this checkpoint into a future conversation to resume.

    ## Terminology

    Build a glossary only when specialized terms genuinely help. Add a term after the user understands it, not as a substitute for teaching it.

    Each entry should use:

    ```markdown
    **Term:** One- or two-sentence definition.
    ```

    Use the chosen terminology consistently. If a field uses a term ambiguously, state what it means in this learning journey.

    ## Real-world wisdom

    Some judgment can only come from practice with real people and real conditions. When appropriate:

    - suggest a safe real-world exercise, project, or experiment;
    - recommend a reputable community, class, mentor, or practitioner;
    - distinguish general guidance from professional advice;
    - respect the user's choice not to join a community.

    ## Response style

    - Be encouraging but honest and specific.
    - Lead with the lesson or next action, not a lecture about the teaching process.
    - Ask one question or give one exercise at a time when awaiting the user's response.
    - Do not overwhelm the user with a full curriculum unless they ask for one.
    - Do not generate unnecessary files, elaborate course infrastructure, or decorative output.
    - Always invite relevant follow-up questions.

    ## Completion

    The learning journey is complete when the user can meet the observable success criteria in a realistic scenario with appropriate independence. End with:

    - a concise summary of demonstrated abilities;
    - a final transfer task or capstone, when useful;
    - a maintenance plan using spaced review or real-world practice; and
    - recommended advanced topics only if they support the user's goal.

    ````

1. **Create**를 선택해 Skill을 추가합니다. **Build** 탭의 **Skills** 섹션에 새 Skill이 표시됩니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_SkillConfig.png' | relative_url }}" alt="Skill 설정 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Add skill 대화 상자의 완성된 필드</figcaption></figure>

    <div class="info-box note" markdown="1">
    **팁**: Skill 설명은 에이전트가 Skill을 로드할 시점을 결정하는 데 도움이 됩니다. 설명에 학습 관련 요청임이 명시되어 있으므로 핵심 지시문을 수정하지 않아도 Skill이 호출됩니다.
    </div>

1. 페이지 상단의 **Preview** 탭 선택. **End user preview**는 꺼둔 상태로 Skill 및 도구 활동을 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_PreviewTab.png' | relative_url }}" alt="End user preview 꺼진 Preview 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>End user preview 꺼진 상태의 Preview 탭</figcaption></figure>

1. 대화 입력창에 아래 프롬프트를 입력하고 **Enter** 키 누르기:

    ```text
    Quiz me on the fundamentals of Power Automate
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_quizPrompt.png' | relative_url }}" alt="Power Automate 퀴즈 프롬프트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview에서 Power Automate 퀴즈 프롬프트</figcaption></figure>

1. 활동 추적에서 에이전트가 **teach** Skill을 로드하는지 확인합니다. 응답 내용은 다를 수 있지만, 퀴즈 시작 전에 경험 수준이나 학습 목표를 묻는 내용이 나와야 합니다. `Beginner`를 입력하고 **Enter** 누르기.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_quizSkillLevel.png' | relative_url }}" alt="Teach Skill이 경험 수준을 묻는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>teach Skill이 경험 수준 질문</figcaption></figure>

1. 첫 번째 퀴즈 문제에 답합니다. 에이전트가 다음 문제를 제시하기 전에 피드백과 설명을 제공하는지 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_quizresult.png' | relative_url }}" alt="답변 선택지와 대화형 퀴즈 문제" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>답변 선택지가 있는 대화형 퀴즈</figcaption></figure>

1. **New chat**를 선택하고 아래 광범위한 학습 요청을 입력한 뒤 **Enter** 누르기:

    ```text
    Help me learn everything I need to know about Copilot Cowork
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_prompt2.png' | relative_url }}" alt="Copilot Cowork 학습 프롬프트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Preview에서 Copilot Cowork 학습 프롬프트</figcaption></figure>

1. 활동 추적에서 에이전트가 **teach** Skill을 로드하고 `microsoft_docs_search`를 호출하는지 확인합니다. 순서와 정확한 레이블은 다를 수 있으며, 에이전트가 현재 경험과 학습 목표를 물어봐야 합니다.

1. 아래 내용을 입력하고 **Enter** 누르기:

    ```text
    I'm a complete beginner. I am familiar with M365 Copilot but not Copilot Cowork. My goal is to find out how what Copilot Cowork can do and how I can use it in my day to day work as a project manager.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_prompt2response.png' | relative_url }}" alt="학습자 경험과 프로젝트 매니저 목표 입력" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>학습자 경험 및 목표 입력 응답</figcaption></figure>

1. 응답을 검토합니다. 정확한 내용은 다를 수 있으나, 에이전트는 학습 목표를 요약하고 개요 설명 후 지식 확인 질문이나 실습 활동을 제시해야 합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/1.6_prompt2output.png' | relative_url }}" alt="맞춤형 Copilot Cowork 레슨 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>개인화된 Copilot Cowork 레슨 응답</figcaption></figure>

## ✅ 미션 완료

축하합니다! **Operation Open Book** 미션 완료입니다. Copilot Studio 에이전트가 이제 실시간 MCP 연결을 통해 Microsoft Learn 전체 문서 라이브러리에 접근합니다.

이번 랩에서 달성한 내용:

✅ **MCP 기본 개념 이해**: Model Context Protocol이 AI 에이전트에 실시간 도구 접근을 제공하는 방법 이해  
✅ **원격 MCP 연결**: 로컬 배포 없이 Copilot Studio에서 호스팅된 MCP 서버 등록 및 연결  
✅ **도구 활성화**: Copilot Studio 에이전트에서 MCP 노출 도구 활성화  
✅ **지시문 엔지니어링**: MCP 도구 사용을 유도하고 폴백 응답을 제어하는 지시문 작성  
✅ **Skill 작성**: 가이드형 학습과 최신 Microsoft Learn 콘텐츠를 결합한 재사용 가능한 teach Skill 생성 및 테스트

## 🏅 완료 배지 받기

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ms-learn-mcp/Academy_LearnMCP_Badge.png' | relative_url }}" alt="Learn MCP Badge" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Learn MCP Badge</figcaption></figure>

배지 신청 양식:

[https://aka.ms/agent-academy-special-ops/ms-learn-mcp/form](https://aka.ms/agent-academy-special-ops/ms-learn-mcp/form)

검토 후 Global AI Community에서 배지 안내 메일을 발송합니다.

<div class="info-box note" markdown="1">
**팁**: 메일이 보이지 않으면 스팸/정크 폴더를 확인하세요.
</div>

## 📚 전술 리소스

- 🔗 [Microsoft Copilot Studio ❤️ MCP]({{ '/chapters/academy-special-ops-mcs-mcp/' | relative_url }})
- 🔗 [Power Platform CLI MCP Server]({{ '/chapters/academy-special-ops-pac-cli-mcp/' | relative_url }})
- 📖 [Microsoft Learn MCP Server docs](https://learn.microsoft.com/microsoft-copilot-studio/connections-mcp)
- 📖 [Model Context Protocol overview](https://modelcontextprotocol.io/introduction)
- 📖 [Copilot Studio MCP connections](https://learn.microsoft.com/microsoft-copilot-studio/connections-mcp)
