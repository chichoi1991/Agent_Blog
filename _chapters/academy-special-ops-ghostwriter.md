---
layout: "chapter"
title: "✍️ Operation Ghostwriter: Skills로 만드는 마케팅 콘텐츠 에이전트"
short_title: "Operation Ghostwriter"
description: "하나의 거대한 지시 블록 대신 Skills를 활용해 마케팅 콘텐츠 에이전트를 모던 방식으로 구축하는 Special Ops 랩입니다."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/ghostwriter/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-07-24"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/ghostwriter/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [✍️ Operation Ghostwriter: A Marketing Content Agent Built on Skills](https://microsoft.github.io/agent-academy/special-ops/ghostwriter/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# ✍️ Operation Ghostwriter: Skills로 만드는 마케팅 콘텐츠 에이전트

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/ghostwriter-badge.png' | relative_url }}" alt="Operation Ghostwriter 배지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Operation Ghostwriter 배지</figcaption></figure>

에이전트 여러분, 이번 미션 **Operation Ghostwriter**의 목표는 방대한 지시 블록 없이도 마케팅 콘텐츠 에이전트를 만드는 것입니다. 네 가지 별도의 **Skills**를 작성하고, 오케스트레이터가 필요할 때 적합한 것을 꺼내 쓰도록 만듭니다. 하나의 에이전트. 일련의 Skills. 불필요한 군더더기 없음. ✍️🎯

<div class="info-box note" markdown="1">
**참고**: 이 미션은 **새 Copilot Studio 작성 환경(New Experience)** 과 **Skills** 기능을 사용합니다. 시작 전 홈 페이지 왼쪽 위 토글에서 **새 환경**을 켜고, 환경에 Skills가 활성화되어 있는지 확인하세요(사전 준비 참고).
</div>

## 🔧 만들 것들

- 간결한 지시만 담은 단일 **마케팅 콘텐츠 에이전트**
- 네 개의 집중된 **Skills** — `draft-blog-post`, `seo-audit`, `repurpose-to-social`, `brand-voice-check` — 각각 `SKILL.md`로 작성
- 오케스트레이터가 하나의 대화 전반에 걸쳐 Skills를 선택하고 연결하는 작동 데모

## ❓ Skill이란?

**Skill**은 모던 Copilot Studio 환경에서 제공하는 새 기능입니다. `SKILL.md` 파일에 일반 Markdown으로 작성하는 재사용 가능한 절차로, 오케스트레이터가 해당 작업이 실제로 필요할 때만 가져옵니다. **이름**과 **설명**이 라우팅 메타데이터 역할(항상 오케스트레이터에게 표시)을 하고, 전체 지시 및 예시 파일은 시나리오가 일치할 때만 로드됩니다.

개념을 이렇게 생각해 보세요. 에이전트의 **지시(Instructions)** 는 직원 안내서입니다 — 목적, 행동 방식, 해야 할 것과 하지 말아야 할 것을 담은 안내서. 모든 대화에서 에이전트는 지시를 참조하고 답변합니다. 지시는 모든 대화에서 항상 사실이어야 하므로 짧고 유용하게 유지해야 합니다.

반면 **Skill**은 그 상황이 발생할 때만 꺼내는 절차 카드입니다. 절차 카드 40장을 직원 이마에 붙여두지는 않죠. 벽에 걸어두고, 이름표를 명확히 달고, 필요한 것을 꺼낼 것을 믿습니다.

이 차이가 중요한 이유: 지시에 넣은 모든 내용은 **매 턴**마다 로드됩니다. 블로그 작성·SEO·소셜 재활용·브랜드 보이스를 모두 담은 1,500단어짜리 프롬프트는 사용자가 "이거 더 짧게 해줘"라고 말할 때도 네 가지 규칙 세트를 모두 로드합니다. Skills는 이를 뒤집습니다: 모델은 각 Skill이 무엇을 위한 것인지 짧은 메뉴만 보고, 하나를 선택할 때만 전체 절차를 로드합니다.

<div class="info-box note" markdown="1">
**참고**: Skill은 행동을 안내하는 절차입니다. 사실 저장소가 아닙니다. 에이전트에 사실이 필요하다면(제품 카탈로그나 가격 등) 그것은 Skill이 아닌 **Knowledge**에 속합니다. 외부 작업이 필요하다면(CMS에 게시하기 등) 그것은 **도구(Tool)** 에 속합니다. Skill은 "우리는 이것을 이렇게 합니다"라는 절차서입니다.
</div>

### 🗝️ 핵심 용어

| 용어 | 정의 |
|------|------|
| **지시(Instructions)** | 매 턴 로드되는 전역 행동 지침. 모든 대화에서 항상 사실인 것. |
| **Skill** | 필요할 때만 로드되는 재사용 가능한 절차. 때때로만 사실인 것. |
| **라우팅 메타데이터** | Skill의 `name` + `description`. 오케스트레이터가 어떤 Skill을 꺼낼지 결정하는 기준. |
| **`SKILL.md`** | Skill의 메타데이터, 지시, 예시를 담은 마크다운 파일. |
| **온디맨드 로딩** | 오케스트레이터가 작업이 Skill 설명과 일치할 때만 전체 본문을 로드. |

### 지시 하나 vs. 일련의 Skills

에이전트를 구축하는 두 가지 옵션을 살펴봅시다.

#### 옵션 A — 모든 것을 담은 긴 지시

모든 절차가 인라인으로 작성되어 매 턴마다 모두 로드됩니다.

```text
You are Fabrikam Fitness's marketing content assistant.

When the user asks for a blog post: write 600–900 words with a hook in the first
two sentences, three or four descriptive subheads, lead with the customer benefit
before the product detail, and close with one call to action. Return markdown with
a suggested title.

When the user asks for an SEO check: verify the title tag is under 60 characters...
(이하 생략)
```

기술적으로 작동하지만, 사용자가 "이거 더 짧게 해줘"라고 말할 때도 네 가지 절차를 모두 읽습니다. SEO 규칙이 소셜 포스트 요청 처리 중에도 주의를 차지합니다. LinkedIn 글자 수가 바뀌면 이 벽 같은 텍스트를 편집하고 네 가지 기능을 모두 다시 테스트해야 합니다.

#### 옵션 B — 라우팅만 하는 짧은 지시 + 세부 내용을 담은 Skills

에이전트의 지시가 교환원 수준으로 줄어듭니다.

```text
You are Fabrikam Fitness's marketing content assistant. Be concise, energetic,
and never salesy. Route each request to the right skill:

- If the user wants a blog post or article, use the draft-blog-post skill.
- If the user wants an SEO check, use the seo-audit skill.
- If the user wants social posts, use the repurpose-to-social skill.
- If the user wants a voice or tone check, use the brand-voice-check skill.
```

"600–900 단어", "60자 미만", "280자 이하" 같은 세부 내용은 모두 지시에서 빠져 다음 Labs에서 만들 네 개의 `SKILL.md` 파일로 이동합니다. 필요한 절차만 로드되고, 지시는 한눈에 파악 가능하며, LinkedIn 글자 수를 변경할 때는 해당 Skill 하나만 수정하면 나머지 세 가지는 그대로입니다.

<div class="info-box note" markdown="1">
**참고**: 모던 오케스트레이터는 Skill의 설명만으로도 요청을 매칭할 수 있으므로 위의 라우팅 줄들은 의도를 명확히 하기 위한 것이지 필수는 아닙니다. 어느 쪽이든 규칙은 같습니다: 세부 내용은 Skill에, 지시는 간결하게.
</div>

## ⚙️ 사전 준비

- **새 환경(Modern experience)** 이 활성화된 **Microsoft Copilot Studio** 환경 — [copilotstudio.microsoft.com](https://copilotstudio.microsoft.com). 계정이 없다면 [코스 설정](https://microsoft.github.io/agent-academy/recruit/00-course-setup/) 안내에서 무료 체험판을 확인하세요.
- 환경에서 **에이전트 만들기** 및 **Skills 추가** 권한
- 마크다운 편집에 대한 기본 이해(네 개의 작은 `SKILL.md` 파일을 작성합니다)

## 🏢 시나리오

**Fabrikam Fitness**는 D2C 스포츠 의류 브랜드입니다. 두 명의 마케팅 팀이 매주 제품 업데이트를 출시하면서 블로그 포스트 작성, SEO 검토, 소셜 포스트 편집, 브랜드 보이스 확인 등 반복 작업에 매몰되어 있습니다. 그들은 네 가지 일을 모두 처리하는 **에이전트 하나**를 원하지만, 첫 번째 초안은 느리고, 절반의 규칙을 무시하며, 유지 관리가 불가능한 단일 거대 프롬프트였습니다. 여러분이 모던 방식으로 재구축합니다: 간결한 지시 + 일련의 Skills.

## 🧬 Skill의 구조

만들기 전에 Skill이 실제로 무엇인지 살펴봅시다. 내부적으로 Skill은 `SKILL.md`라는 단일 파일입니다. 상단에 작은 YAML 블록이 있는 일반 마크다운. 두 부분으로 구성됩니다.

```markdown
---
name: seo-audit
description: Use when the user asks to check or improve the SEO of a draft — title
  tags, meta description, keywords, headings. Do NOT use to write new content.
---

# SEO audit for Fabrikam content

Given a piece of content, review and report on:

1. Title tag: under 60 characters and leads with the primary keyword?
2. Meta description: 140–160 characters?
3. ...나머지 절차...
```

**프런트 매터(`---` 사이)가 라우팅 메타데이터입니다.** `name`과 `description`만 있으며, 오케스트레이터가 기본적으로 보는 유일한 부분입니다. 파일 캐비닛 서랍의 이름표와 같습니다: 오케스트레이터는 내용을 꺼내지 않고도 모든 Skill의 이름표를 읽어 어느 서랍을 열지 결정합니다. 그래서 `description`이 전체 파일에서 가장 중요한 줄입니다. **"사용 시점… / 사용하지 않는 경우…"** 형식으로 작성하세요. `name`은 짧고 동사적으로(`draft-blog-post`, `seo-audit`) — 문장이 아닌 핸들입니다.

**프런트 매터 아래 모든 내용이 본문**입니다 — 실제 절차 및 예시. 이것은 오케스트레이터가 이 Skill을 선택한 **후에만** 로드됩니다.

Copilot Studio에서 Skill을 추가할 때 두 부분은 대화 상자의 세 필드에 깔끔하게 매핑됩니다.

| `SKILL.md`의 내용 | Copilot Studio 대화 상자 필드 | 표시 시점 |
|---|---|---|
| YAML `name` | **이름** 필드 | 항상(라우팅 메타데이터) |
| YAML `description` | **설명** 필드 | 항상(라우팅 메타데이터) |
| 프런트 매터 아래 본문 | **지시** 필드 | Skill이 실행될 때만 |

## 🏗️ Skill을 만드는 세 가지 방법

Skill의 구조는 변하지 않으므로, 실제 질문은 내용을 어디서 가져오느냐입니다.

### ✍️ 1. 처음부터 작성

빈 파일을 열고 이름, 설명, 전체 절차를 직접 작성합니다. 완전한 제어권을 갖지만 가장 느린 방법입니다. 학습과 진정으로 새로운 절차에 적합합니다.

### 📋 2. 예시에서 시작

Skill은 이식 가능한 마크다운이므로 빈 페이지에서 시작할 필요가 거의 없습니다. [skills.sh](https://www.skills.sh/) 같은 커뮤니티 라이브러리에는 카피라이팅, SEO, 콘텐츠 전략 등 검증된 절차가 가득합니다. 그대로 사용하거나 브랜드에 맞게 조정한 뒤 `SKILL.md`로 저장해 업로드합니다.

<div class="info-box note" markdown="1">
**주의**: 직접 작성하지 않은 Skill은 **신뢰할 수 없는 코드**로 취급하세요. Skill은 에이전트의 행동을 조종하므로 추가 전 모든 줄을 읽어야 합니다 — 풀 리퀘스트를 검토하는 것처럼. 절대 맹목적으로 붙여넣지 마세요.
</div>

### 🤖 3. AI와 함께

대부분의 사람들이 놓치는 방법이지만, 종종 가장 좋은 방법입니다. Skill이 구조화된 마크다운이므로 현대 AI 도구들이 탁월하게 작성합니다. 평범한 언어로 원하는 것을 설명하고 AI가 프런트 매터까지 포함한 완성도 높은 `SKILL.md`를 생성하도록 합니다.

- **범용 어시스턴트** — Microsoft Copilot, ChatGPT, Claude에 이렇게 프롬프트합니다: *"블로그 포스트의 SEO를 검사하는 Copilot Studio 에이전트용 SKILL.md를 작성해 주세요. YAML 프런트 매터에 `name`과 `description`(사용 시점/사용하지 않는 경우 형식)을 포함하고 마크다운으로 절차를 작성해 주세요."*
- **Copilot Cowork** 같은 에이전트 작업 공간에서 반복하고 검토 후 깔끔한 마크다운을 내보냅니다.
- **구축 중인 에이전트 자체의 미리 보기 패널.** 에이전트 자체가 Skill을 초안화하고 복사할 수 있습니다.

<div class="info-box note" markdown="1">
**주의**: AI가 작성한 Skill도 빌린 것과 같은 규칙이 적용됩니다: **신뢰하기 전 모든 줄을 읽으세요.** 모델은 빠른 초안을 제공하는 것이지, 승인 스탬프를 찍을 완성품이 아닙니다.
</div>

## 🚪 Copilot Studio에 Skill을 추가하는 두 가지 방법

내용을 어떻게 작성했든, **Skill 추가** 대화 상자의 **두 가지 입구** 중 하나로 에이전트에 들어옵니다.

- **빈 곳에서 만들기** — 이름, 설명, 지시를 양식에 직접 입력하거나 붙여넣습니다. 처음부터 작성하거나 짧은 Skill을 붙여넣을 때 적합합니다.
- **Skill 업로드** — 완성된 `SKILL.md` 파일을 드래그하면 Copilot Studio가 세 필드를 자동으로 채웁니다. 이미 파일이 있을 때 적합합니다.

## 🧪 Lab 1.1: 간결한 지시로 에이전트 만들기

모든 대화에서 항상 사실인 지시만으로 에이전트 셸을 구축합니다. 블로그 규칙, SEO 규칙 등 작업별 내용을 여기에 넣고 싶은 충동을 참으세요.

1. [Microsoft Copilot Studio](https://copilotstudio.microsoft.com)로 이동해 로그인합니다. 홈 페이지 상단의 **새 환경** 토글이 켜져 있는지 확인합니다.

1. 홈 페이지에서 **또는 빌드할 항목 선택** 아래 **에이전트**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.1_01_CreateAgent.png' | relative_url }}" alt="Copilot Studio 홈 페이지에서 에이전트 선택" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Copilot Studio 홈 페이지에서 에이전트 선택</figcaption></figure>

1. 에이전트의 **Build** 편집기로 바로 이동됩니다. **에이전트 이름 지정** 필드를 선택하고 다음을 붙여넣습니다.

    ```text
    Fabrikam Content Agent
    ```

1. **지시** 필드를 선택하고 전역 행동만 붙여넣습니다.

    ```text
    You are Fabrikam Fitness's marketing content assistant.
    You help the marketing team turn product updates into on-brand content.
    Be concise, energetic, and never salesy. When a request matches one of your
    skills, use that skill. Ask a clarifying question only if the request is
    genuinely ambiguous.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.1_02_Instructions-annotated.png' | relative_url }}" alt="간결한 프롬프트가 입력된 지시 필드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>간결한 전역 지시만 입력된 지시 필드</figcaption></figure>

1. 상단 명령 모음에서 **저장**을 선택합니다.

<div class="info-box note" markdown="1">
**주의**: 여기에 없어야 할 것들에 주목하세요: 단어 수, SEO 체크리스트, 브랜드 보이스 규칙이 없습니다. 그것들은 절차입니다. Skills에 속합니다. 체크리스트를 지시에 붙여넣고 싶은 충동이 생긴다면, 그것이 바로 Skill을 만들어야 한다는 신호입니다.
</div>

## 🧪 Lab 1.2: 처음부터 `draft-blog-post` Skill 만들기

먼저 처음부터 만드는 방식으로 시작합니다. 마케팅 콘텐츠 에이전트가 할 일 중 하나는 웹사이트 블로그 포스트 초안 작성입니다. 이를 위한 카피라이팅 Skill을 만들겠습니다.

1. **Build** 편집기에서 오른쪽 구성 패널의 **Skills** 카드를 찾아 **Skill 추가**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.2_01_AddSkill-annotated.png' | relative_url }}" alt="에이전트 구성 패널의 Skill 추가 카드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 구성 패널의 Skill 추가 카드</figcaption></figure>

1. **Skill 추가** 대화 상자에는 두 가지 방법이 있습니다: **Skill 업로드**(SKILL.md 파일 드래그)와 **빈 곳에서 만들기**(필드에 직접 입력). **빈 곳에서 만들기**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.2_03_CreateFromBlank.png' | relative_url }}" alt="Skill 업로드와 빈 곳에서 만들기 탭이 있는 Skill 추가 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Skill 추가 대화 상자 — 빈 곳에서 만들기 선택</figcaption></figure>

1. 다음을 필드에 입력합니다.

    **이름**:

    ```text
    draft-blog-post
    ```

    **설명**:

    ```text
    Use when the user wants to turn product notes, a changelog, or a raw idea into a full blog post or article. Do NOT use for social posts, SEO checks, or pure editing — those have their own skills.
    ```

    **지시**:

    ````markdown
    # Draft a Fabrikam blog post

    When drafting a blog post from the provided source material:

    1. Open with a hook in the first two sentences — a customer pain or a bold claim.
    2. Target 600–900 words with three or four descriptive subheads.
    3. Lead with the customer benefit before any product detail.
    4. Close with one clear call to action.
    5. Return the draft in markdown with a suggested title and the subheads as `##`.

    ## Example
    Input: "New Trailburst running shorts — 4-way stretch, hidden zip pocket, launches Friday."
    Output: a titled post opening on the frustration of pockets that bounce, three
    subheads (Move Freely, Carry What Matters, Get Yours Friday), and a CTA.
    ````

1. **만들기**를 선택해 Skill을 추가합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.2_04_CreateBlogSKill.png' | relative_url }}" alt="draft-blog-post Skill 만들기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>draft-blog-post Skill 만들기 완료</figcaption></figure>

<div class="info-box note" markdown="1">
**팁**: 에이전트를 구축할 때 좋은 관행은 새 기능을 추가할 때마다 조기에 자주 테스트하는 것입니다. 테스트 단계는 마지막에 있지만, 지금 바로 테스트해 볼 수도 있습니다.
</div>

## 🧪 Lab 1.3: 예시에서 `seo-audit` Skill 만들기

계속하기 전에 준비된 세 개의 Skill 파일을 다운로드합니다. 원문 페이지([https://microsoft.github.io/agent-academy/special-ops/ghostwriter/](https://microsoft.github.io/agent-academy/special-ops/ghostwriter/))에서 Skill 파일 ZIP을 다운로드합니다.

1. 다운로드한 ZIP 파일을 압축 해제하고 `seo-audit.md`를 열어 검토합니다.

    <div class="info-box note" markdown="1">
    **주의**: Skill을 업로드하기 전에 반드시 읽으세요. `seo-audit.md`를 열어 모든 줄을 훑어보세요. Skill은 에이전트의 행동을 조종하므로 풀 리퀘스트를 검토하듯 검토해야 합니다. (이 파일은 안전합니다; 습관을 기르는 것이 핵심입니다.)
    </div>

1. **Build** 탭으로 돌아와 **Skills** 카드에서 **+ 버튼**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.3_addskill.png' | relative_url }}" alt="Skill 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Skill 추가 버튼</figcaption></figure>

1. 이번에는 **Skill 업로드** 옵션을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.3_uploadskill.png' | relative_url }}" alt="Skill 업로드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Skill 업로드 옵션 선택</figcaption></figure>

1. `seo-audit.md`를 업로드 영역에 드래그합니다(또는 탐색해 선택). Copilot Studio가 파일을 읽고 **이름**, **설명**, **지시**를 자동으로 채웁니다. **Skills** 아래의 `seo-audit` 항목을 선택해 결과를 확인합니다.

## 🧪 Lab 1.4: `repurpose-to-social` Skill 만들기

1. 압축 해제된 Skill 파일에서 `repurpose-to-social.md`를 열어 빠르게 읽습니다.

1. **Skill 추가 → Skill 업로드**를 선택합니다.

1. `repurpose-to-social.md`를 업로드 영역에 드래그합니다. **Skills** 섹션에서 선택하고 모든 속성이 올바르게 매핑되었는지 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.4_skillfilled.png' | relative_url }}" alt="repurpose-to-social Skill 추가 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>repurpose-to-social Skill 추가 완료</figcaption></figure>

## 🧪 Lab 1.5: `brand-voice-check` Skill 만들기

1. 압축 해제된 Skill 파일에서 `brand-voice-check.md`를 열어 읽습니다.

1. **Skill 추가 → Skill 업로드**를 선택합니다.

1. `brand-voice-check.md`를 업로드 영역에 드래그합니다. **Skills** 섹션에서 선택하고 모든 속성이 올바르게 매핑되었는지 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.5_skillfilled.png' | relative_url }}" alt="네 개의 Skills가 모두 표시된 Skills 카드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>네 개의 Skills가 모두 추가된 Skills 카드</figcaption></figure>

## 🧪 Lab 1.6: Skills 오케스트레이션 테스트

이제 실제로 작동하는지 확인합니다. 각 요청이 필요한 Skill만 활성화하고 에이전트가 자연스럽게 Skills를 연결하는지 테스트합니다.

1. 에이전트 상단의 **미리 보기** 탭을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.5_previewtab.png' | relative_url }}" alt="미리 보기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>미리 보기 탭</figcaption></figure>

1. `draft-blog-post` Skill이 호출되는지 테스트합니다. 다음 프롬프트를 입력하고 **Enter**를 누릅니다.

    ```text
    Draft a blog post from these notes: Trailburst shorts, 4-way stretch, hidden zip pocket, launches Friday.
    ```

1. 에이전트 응답을 확인합니다. `draft-blog-post` Skill이 호출되고 Skill 지시에 따라 블로그 초안을 만드는지 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.5_blogresponse.png' | relative_url }}" alt="블로그 응답 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>draft-blog-post Skill이 생성한 블로그 초안 응답</figcaption></figure>

1. `seo-audit` Skill을 테스트합니다. 다음 프롬프트를 입력하고 **Enter**를 누릅니다.

    ```text
    Now run an SEO audit on it.
    ```

1. 에이전트 응답을 확인합니다. `seo-audit` Skill이 호출되고 권장 수정 사항이 담긴 SEO 체크리스트를 반환하는지 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.5_seoskillresponse.png' | relative_url }}" alt="SEO 감사 응답 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>seo-audit Skill의 SEO 체크리스트 응답</figcaption></figure>

1. `repurpose-to-social` Skill을 테스트합니다. 미리 보기 패널에서 다음 프롬프트를 입력하고 **Enter**를 누릅니다.

    ```text
    Make me LinkedIn and X posts so I can repurpose this blog.
    ```

1. 에이전트 응답을 확인합니다. `repurpose-to-social` Skill이 호출되고 플랫폼별 포스트를 반환하는지 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.5_repurposeresponse.png' | relative_url }}" alt="소셜 포스트 재활용 응답 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>repurpose-to-social Skill의 플랫폼별 포스트 응답</figcaption></figure>

1. `brand-voice-check` Skill을 테스트합니다. 미리 보기 패널에서 다음 프롬프트를 입력하고 **Enter**를 누릅니다.

    ```text
    Does the LinkedIn one sound like us?
    ```

1. 에이전트 응답을 확인합니다. `brand-voice-check` Skill이 호출되고 Fabrikam 보이스 기준으로 콘텐츠를 평가하는지 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.5_voicecheckreponse.png' | relative_url }}" alt="브랜드 보이스 평가 응답 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>brand-voice-check Skill의 브랜드 보이스 평가 응답</figcaption></figure>

1. 각 턴이 **다른** Skill을 트리거했음을 주목하세요. `draft-blog-post`, `seo-audit`, `repurpose-to-social`, `brand-voice-check` 순으로, 에이전트의 핵심 지시에는 절차적 세부 내용이 전혀 없었습니다.

이것을 1,500단어짜리 프롬프트로 유지 관리한다고 상상해 보세요. LinkedIn 글자 수를 변경하면 관련 없는 텍스트 벽을 편집하고 모든 것을 다시 테스트해야 합니다. Skills를 사용하면 `repurpose-to-social` 한 줄만 변경하면 되고 다른 세 가지 절차는 그대로입니다.

<div class="info-box note" markdown="1">
**팁**: Skill이 발동되지 않아야 할 때 발동되거나(또는 발동되어야 할 때 발동되지 않는다면), 수정 포인트는 거의 항상 **설명**이지 내부 지시가 아닙니다. "사용 시점…/사용하지 않는 경우…" 언어를 다듬고 다시 테스트하세요. 라우팅은 설명 문제입니다.
</div>

## 🧪 Lab 1.7 (심화): AI로 Skill 만들기

처음부터와 예시에서 Skills를 작성해 봤습니다. 세 번째(그리고 종종 최선의) 방법은 AI가 초안을 작성하게 하는 것입니다. Skill이 이식 가능한 마크다운이므로 모델이 탁월하게 작성할 수 있습니다. 이 방식에서는 작성자가 아닌 편집자가 됩니다.

마케팅 콘텐츠 에이전트에 빠진 것 중 하나는 홍보 콘텐츠용 브랜드 영상 스크립트 작성입니다. Copilot Studio 에이전트 내에서 직접 커스텀 Skill을 만드는 방법을 살펴봅시다.

1. 에이전트의 **미리 보기** 탭으로 이동합니다. 기존 대화가 있다면 **새 채팅**을 선택합니다.

1. 채팅 창에 다음을 입력하고 **Enter**를 누릅니다.

    ````text
    Write a Skill file (a SKILL.md) for a Microsoft Copilot Studio agent.

    About the agent:
    The agent is the Fabrikam Content Agent for Fabrikam Fitness, an athletic
    apparel brand that sells directly to consumers. Its voice is energetic and
    confident, never salesy: short sentences, plain words, second person, and no
    corporate jargon.

    It already has these Skills, so the new one must not overlap with them:
    draft-blog-post, seo-audit, repurpose-to-social (writes social captions), and
    brand-voice-check.

    What to build:
    A Skill named video-script that turns product notes into a video script. It
    handles two formats and picks based on what the user asks for.

    1. Short-form (TikTok, Reels, or YouTube Shorts, about 15 to 55 seconds):
       a strong hook in the first 2 seconds, a shot-by-shot flow, on-screen text
       cues, a spoken line for each shot, and one call to action.
    2. Long-form (YouTube, about 4 to 8 minutes): a hook intro, 3 to 5 titled
       segments, B-roll and shot ideas for each segment, a spoken script or
       talking points, and a closing call to action to subscribe and shop.

    If the user does not say which format they want, ask once, then default to
    short-form.

    How to format the answer:
    Give one SKILL.md file inside a single markdown code block, with two parts.

    1. YAML front matter at the top with two fields:
       name: a short lowercase handle with dashes, for example video-script.
       description: one or two sentences that say when to use the Skill and when
       not to. Make it specific enough that the agent picks this Skill instead of
       repurpose-to-social, since that one writes captions, not scripts.
    2. A body below the front matter with a short title, a numbered set of steps
       that first decides short-form or long-form and then lists the rules for
       each, and an Example section showing one short-form script and one
       long-form script.

    Keep everything in the Fabrikam voice. Use real numbers and clear structure.
    Reply with only the SKILL.md code block and nothing else.
    ````

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.7_skillprompt.png' | relative_url }}" alt="Skill 작성 프롬프트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>AI에게 Skill 작성을 요청하는 프롬프트</figcaption></figure>

1. **제공된 마크다운을 검토합니다.** 안전하고 정확한지 확인하고 필요한 수정을 한 뒤 오른쪽 위의 **복사** 아이콘을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.7_reviewcopy.png' | relative_url }}" alt="마크다운 검토 및 복사" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>AI가 생성한 SKILL.md 검토 및 복사</figcaption></figure>

<div class="info-box note" markdown="1">
**참고**: Skill 응답은 AI 생성이므로 매번 다르게 나타납니다.
</div>

1. **Build** 탭을 선택해 에이전트 구성으로 돌아갑니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.7-addskill.png' | relative_url }}" alt="Build 탭으로 이동" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Build 탭으로 돌아가기</figcaption></figure>

1. **Skills** 옆의 **+ 버튼**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.7_plusskill.png' | relative_url }}" alt="Skills 추가 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Skills 추가 + 버튼</figcaption></figure>

1. **빈 곳에서 만들기**를 선택합니다. 이전 단계에서 만든 마크다운 파일에 따라 **이름**, **설명**, **지시**를 입력하고 **만들기**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.7_createskill.png' | relative_url }}" alt="Skill 만들기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>AI가 초안화한 Skill로 만들기</figcaption></figure>

1. **미리 보기** 탭으로 이동합니다. **새 채팅**을 선택해 새 테스트 세션을 시작합니다. 다음을 입력하고 **Enter**를 누릅니다.

    ```text
    Help me write a script for a short-form video about the launch of our new Trailburst running shorts with 4-way stretch and a hidden zip pocket. They launch Friday.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.7_testprompt.png' | relative_url }}" alt="테스트 프롬프트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>video-script Skill 테스트 프롬프트</figcaption></figure>

1. 응답을 검토해 `video-script` Skill이 호출되고 좋은 스크립트가 생성되는지 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.7-test.png' | relative_url }}" alt="응답 검토" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>video-script Skill이 생성한 스크립트 응답</figcaption></figure>

## ✅ 미션 완료!

축하합니다, 에이전트 여러분 — **Operation Ghostwriter** 완료! 간결한 지시와 일련의 집중된 Skills, 그리고 필요할 때 적합한 것을 꺼내는 오케스트레이터로 실제 마케팅 콘텐츠 에이전트를 모던 방식으로 구축했습니다.

이 미션에서 달성한 것들:

✅ **지시 vs. Skills**: 항상-활성화 지시 vs. 온디맨드 Skill에 각각 무엇이 속하는지 파악  
✅ **라우팅 메타데이터**: Skill이 정확히 원할 때 발동되도록 `name` + `description` 작성 방법  
✅ **일련의 Skills**: 하나의 거대한 프롬프트 대신 네 개의 집중된 Skills 구축 — 오케스트레이터가 대화에서 연결하는 모습 확인  
✅ **빌리고 적용하기**: 커뮤니티의 절차를 활용하고 신뢰하기 전 검증하는 방법

## 🏅 완료 배지 획득

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/ghostwriter-badge.png' | relative_url }}" alt="Operation Ghostwriter 완료 배지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Operation Ghostwriter 완료 배지</figcaption></figure>

<div class="info-box note" markdown="1">
**참고**: 이 미션의 배지 요청은 아직 열려 있지 않습니다. 미션이 공개되기 전에 완료 양식이 추가될 예정입니다.
</div>

## 📚 참고 자료

- 📖 [Microsoft Copilot Studio 설명서](https://learn.microsoft.com/microsoft-copilot-studio/)
- 📖 [에이전트 지시 작성](https://learn.microsoft.com/microsoft-copilot-studio/authoring-instructions)
- 🔗 [skills.sh — 커뮤니티 에이전트 Skills](https://www.skills.sh/)
