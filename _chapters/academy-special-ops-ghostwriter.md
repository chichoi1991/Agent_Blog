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
source_published: "2026-08-07"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/ghostwriter/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [✍️ Operation Ghostwriter: A Marketing Content Agent Built on Skills](https://microsoft.github.io/agent-academy/special-ops/ghostwriter/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# ✍️ Operation Ghostwriter: Skills로 만드는 마케팅 콘텐츠 에이전트

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/ghostwriter-badge.png' | relative_url }}" alt="Operation Ghostwriter 배지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Operation Ghostwriter 배지</figcaption></figure>

에이전트 여러분, 이번 미션 **Operation Ghostwriter**의 목표는 방대한 지시 블록 없이도 마케팅 콘텐츠 에이전트를 만드는 것입니다. 네 가지 별도의 **Skills**를 작성하고, 오케스트레이터가 필요할 때 적합한 것을 꺼내 쓰도록 만듭니다. 하나의 에이전트. 일련의 Skills. 불필요한 군더더기 없음. ✍️🎯

<div class="info-box note" markdown="1">
**참고**: 이 미션에는 새 Copilot Studio 환경의 **GitHub Copilot harness** 기반 에이전트가 필요합니다. Skills는 standard harness나 Copilot Chat harness 기반 에이전트에서는 사용할 수 없습니다. 시작하기 전에 홈 페이지 왼쪽 위 토글에서 **새 환경(New experience)** 을 켜세요.
</div>

## 🎯 미션 목표

이 미션에서 배우는 내용:

- 항상 로드되는 **지시(Instructions)** 와 필요할 때만 로드되는 **Skills**를 분리하는 방법
- 오케스트레이터가 올바른 Skill을 선택하도록 돕는 라우팅 메타데이터 작성법
- Skill을 처음부터 만들기, 기존 Skill을 가져와 적용하기, AI로 초안 작성하기
- 개별 Skill의 경계와 여러 Skills의 오케스트레이션을 테스트하는 방법
- Memory가 대화 전반에 걸쳐 사용자 개인의 선호를 적용하는 방식

## 🔧 만들 것들

- 간결하고 항상 로드되는 지시만 담은 단일 **마케팅 콘텐츠 에이전트**
- 네 개의 핵심 **Skills** — `draft-blog-post`, `seo-audit`, `repurpose-to-social`, `brand-voice-check`
- 심화 랩에서 AI로 만드는 선택적 다섯 번째 Skill `video-script`
- 하나의 요청에 대해 오케스트레이터가 여러 Skills를 활성화하고 조합하는 작동 데모

## ❓ Skill이란?

**Skill**은 GitHub Copilot harness 기반 에이전트에서 사용할 수 있는 재사용 가능한 기능입니다. 작업에 필요할 때 오케스트레이터가 활성화할 수 있는 절차를 일반 Markdown으로 정의합니다. Skill에는 라우팅 메타데이터 역할을 하는 **이름(name)** 과 **설명(description)** 이 있고, Skill이 활성화된 이후에 의미를 갖는 지시와 선택적 보조 파일이 있습니다.

에이전트의 **지시(Instructions)** 는 직원 안내서와 같습니다 — 목적, 행동 방식, 해야 할 것과 하지 말아야 할 것을 담은 안내서. 모든 대화에서 에이전트는 답변하기 전에 이 안내서(지시)를 참조합니다. 따라서 지시는 짧고 유용하며 *모든* 대화에서 참이어야 군더더기가 생기지 않습니다.

반면 **Skill**은 그 상황이 문을 열고 들어올 때만 벽에서 꺼내는 코팅된 절차 카드와 같습니다. 절차 카드 40장을 모든 직원 이마에 붙여두지는 않죠. 벽에 걸어두고, 이름표를 명확히 달고, 필요한 것을 알아서 꺼낼 것이라고 믿습니다.

이 차이가 중요한 이유: 지시에 넣은 모든 내용은 **매 턴**마다 로드됩니다. 블로그 작성·SEO·소셜 재활용·브랜드 보이스를 모두 담은 1,500단어짜리 프롬프트는 매 요청마다 모델이 네 가지 규칙 세트를 모두 저울질하게 만듭니다. 관련 없는 지침이 주의를 두고 경쟁하기 때문에 응답이 느려지고, 비용이 커지고, 정확도가 떨어지는 경우가 많습니다. Skills는 이를 뒤집습니다: 모델은 각 Skill이 무엇을 위한 것인지 짧은 메뉴만 보고, 하나를 선택했을 때만 전체 절차를 로드합니다.


<div class="info-box note" markdown="1">
**참고**: Skill은 행동을 안내하는 절차입니다. 사실 저장소가 아닙니다. 에이전트에 사실이 필요하다면(제품 카탈로그나 가격 등) 그것은 Skill이 아닌 **Knowledge**에 속합니다. 외부 작업이 필요하다면(CMS에 게시하기 등) 그것은 **도구(Tool)** 에 속합니다. Skill은 "우리는 이것을 이렇게 합니다"라는 절차서입니다.
</div>

### 🗝️ 핵심 용어

| 용어 | 정의 |
|------|------|
| **지시(Instructions)** | 매 턴 로드되는 전역 행동 지침. 모든 대화에서 항상 사실인 것. |
| **Skill** | 필요할 때만 로드되는 재사용 가능한 절차. 때때로만 사실인 것. |
| **라우팅 메타데이터** | Skill의 `name` + `description`. 오케스트레이터가 어떤 Skill을 꺼낼지 결정하는 기준. |
| **Skill 파일** | Skill의 메타데이터, 지시, 예시를 담은 마크다운 파일. ZIP 패키지로 올릴 경우 이 파일의 이름은 반드시 `SKILL.md`여야 합니다. |
| **온디맨드 로딩** | 오케스트레이터가 작업이 Skill 설명과 일치할 때만 전체 본문을 로드. |

### 지시 하나 vs. 일련의 Skills

에이전트를 구축하는 두 가지 옵션을 살펴봅시다. 하나는 긴 지시 하나로, 다른 하나는 Skills를 활용하는 방식입니다.

#### 옵션 A — 모든 것을 담은 긴 지시

모든 절차가 인라인으로 작성되어 매 턴마다 모두 로드됩니다.

```text
You are Fabrikam Fitness's marketing content assistant.

When the user asks for a blog post: write 600–900 words with a hook in the first
two sentences, three or four descriptive subheads, lead with the customer benefit
before the product detail, and close with one call to action. Return markdown with
a suggested title.

When the user asks for an SEO check: verify the title tag is under 60 characters
and leads with the primary keyword; propose a 140–160 character meta description if
missing; confirm there is one H1 with keywords in at least one H2; check the primary
keyword appears in the first 100 words without stuffing. Return a checklist with fixes.

When the user asks for social posts: produce a LinkedIn version (~1,300 characters,
story hook, three takeaways, CTA), an X version (≤280 characters, one hashtag), and
an Instagram caption (punchy first line, 3–5 hashtags). Rewrite for each channel,
never truncate.

When the user asks about voice: energetic, confident, never salesy; short sentences;
plain words; no jargon like "synergy" or "leverage"; second person, active voice.
Return a verdict plus the top three fixes.
```

기술적으로는 작동합니다. 하지만 사용자가 "이거 더 짧게 해줘"라고만 말해도 모델은 매 턴 네 가지 절차를 모두 읽습니다. 누군가 소셜 포스트를 물어보는 동안 SEO 규칙이 주의를 두고 경쟁합니다. 그리고 LinkedIn 글자 수가 바뀌는 날에는 이 텍스트 벽을 편집한 뒤, 나머지 세 가지를 망가뜨리지 않았는지 확인하기 위해 네 가지 작업을 모두 다시 테스트해야 합니다.

#### 옵션 B — 라우팅만 하는 짧은 지시 + 세부 내용을 담은 Skills

에이전트의 지시가 교환원 수준으로 줄어듭니다.

```text
You are Fabrikam Fitness's marketing content assistant. Be concise, energetic,
and never salesy. Route each request to the right skill.
```

<div class="info-box note" markdown="1">
**참고**: 모던 오케스트레이터는 Skill 자체의 설명만으로 요청을 매칭할 수 있으므로, 지시에 Skill 라우팅을 일일이 적어둘 필요가 없습니다.
</div>

## ⚙️ 사전 준비

- **새 환경(New experience)** 이 활성화된 **Microsoft Copilot Studio** 환경 — [copilotstudio.microsoft.com](https://copilotstudio.microsoft.com). 계정이 없다면 [코스 설정](https://microsoft.github.io/agent-academy/recruit/00-course-setup/) 안내에서 무료 체험판을 확인하세요.
- **GitHub Copilot harness** 기반 에이전트. **새 환경**을 켜고 에이전트를 만들거나 열어서 **Build** 탭에 **Skills**가 표시되는지 확인합니다. 표시되지 않으면 관리자에게 해당 harness가 환경에서 사용 가능한지 문의하세요.
- 원하는 마크다운 편집기

<div class="info-box note" markdown="1">
**중요**: GitHub Copilot harness는 사용량 기반 과금을 사용합니다. 에이전트를 구축·미리 보기 테스트·평가·사용하는 과정에서 **Copilot Credits**가 소비될 수 있습니다. 시작 전에 [Copilot Credits 과금 개요](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/billing-credit-overview)를 확인하세요.
</div>

## 🏢 시나리오

**Fabrikam Fitness**는 D2C 스포츠 의류 브랜드입니다. 두 명뿐인 마케팅 팀이 거의 매주 제품 업데이트를 출시하면서 그에 딸린 반복 작업 — 릴리스 노트를 블로그 포스트로 바꾸고, SEO를 점검하고, 소셜 포스트로 줄이고, 모든 것이 Fabrikam답게 들리는지 확인하는 일 — 에 파묻혀 있습니다. 그들은 네 가지 일을 모두 처리하는 **에이전트 하나**를 원하지만, 첫 번째 버전은 느리고, 자기 규칙의 절반을 무시하며, 유지 관리가 불가능한 단일 거대 프롬프트였습니다. 여러분이 이를 모던 방식으로 재구축합니다: 간결한 지시 + 일련의 Skills.

## 🧬 Skill의 구조

만들기 전에 Skill이 실제로 무엇인지 살펴봅시다. 내부적으로 Skill은 상단에 작은 YAML 블록이 있는 일반 마크다운입니다. 단독 `.md` 파일로 업로드할 수 있고, Skill과 보조 파일을 ZIP으로 묶는 경우 메인 파일의 이름은 반드시 `SKILL.md`여야 합니다. 형식은 두 부분으로 구성됩니다.

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

**프런트 매터(`---` 사이)가 라우팅 메타데이터입니다.** 오케스트레이터는 어떤 Skill을 활성화할지 판단할 때 `name`과 `description`으로 요청과의 일치 여부를 결정합니다. 파일 캐비닛 서랍의 이름표라고 생각하세요: 오케스트레이터는 이름표를 읽고 어느 서랍을 열지 정합니다. 그래서 `description`이 파일 전체에서 가장 중요한 한 줄입니다. 막연한 "콘텐츠 작업에 도움" 대신 **"사용 시점… / 사용하지 않는 경우…"** 형식으로 작성하세요. `name`에는 소문자·숫자·하이픈만 사용하고, 하이픈으로 시작하거나 끝내지 마세요. 문장이 아니라 핸들이므로 짧고 동작 중심으로(`draft-blog-post`, `seo-audit`) 유지합니다.

**프런트 매터 아래 모든 내용이 본문**입니다 — 실제 절차와 예시. 이 지시는 오케스트레이터가 Skill을 활성화한 뒤 에이전트를 안내합니다. 절차는 집중된 상태로 유지하고, 해당 작업에 필요한 단계·제약·예시·관련 도구 참조만 담으세요.

Copilot Studio에서 Skill을 추가할 때 두 부분은 대화 상자의 세 필드에 깔끔하게 매핑됩니다.

| `SKILL.md`의 내용 | Copilot Studio 대화 상자 필드 | 표시 시점 |
|---|---|---|
| YAML `name` | **이름** 필드 | 항상(라우팅 메타데이터) |
| YAML `description` | **설명** 필드 | 항상(라우팅 메타데이터) |
| 프런트 매터 아래 본문 | **지시** 필드 | Skill이 실행될 때만 |

아래의 모든 방법이 결국 똑같은 파일을 만들어 내므로, 이름·설명·본문이라는 그림을 머릿속에 담아 두세요. 달라지는 것은 *누가 쓰느냐*뿐입니다.

## 🏗️ Skill을 만드는 세 가지 방법

Skill의 구조는 변하지 않으므로, 실제 질문은 그 내용을 어디서 가져오느냐입니다. 세 가지 선택지가 있고, 각각 노력과 제어권을 맞바꿉니다.

### ✍️ 1. 처음부터 작성

빈 파일을 열고 이름, 설명, 전체 절차까지 모든 줄을 직접 작성합니다. 완전한 제어권과 형식에 대한 깊은 이해를 얻을 수 있지만 가장 느린 방법이고, 실무에서는 대개 과합니다 — 누군가 이미 더 좋게 써 둔 절차를 손으로 다시 쓰는 셈이니까요. 학습과 진정으로 새로운 절차에 적합하며, 대부분의 시간을 여기에 쓰지는 않게 됩니다.

### 📋 2. 예시에서 시작

Skill은 이식 가능한 마크다운이므로 빈 페이지에서 시작할 필요가 거의 없습니다. [skills.sh](https://www.skills.sh/) 같은 커뮤니티 라이브러리에는 카피라이팅, SEO, 콜드 이메일, 콘텐츠 전략 등 기여된 절차가 있습니다. 이를 출발점으로 삼되, 모든 줄을 검토하고 동작을 검증한 뒤 이름·`description`·절차를 시나리오에 맞게 조정하고 업로드하세요.

<div class="info-box note" markdown="1">
**주의**: 직접 작성하지 않은 Skill은 **신뢰할 수 없는 코드**로 취급하세요. Skill은 에이전트의 행동을 조종하므로 추가 전 모든 줄을 읽어야 합니다 — 풀 리퀘스트를 검토하는 것처럼. 절대 맹목적으로 붙여넣지 마세요.
</div>

### 🤖 3. AI와 함께

대부분의 사람들이 놓치는 방법이지만, 종종 가장 좋은 방법입니다. Skill이 구조화된 마크다운일 뿐이므로 현대 AI 어시스턴트가 이를 탁월하게 작성합니다. 필요한 것을 평범한 언어로 설명하면 모델이 프런트 매터까지 포함한 완성도 높은 `SKILL.md`를 만들어 줍니다. 몇 가지 방법이 있습니다.

- **범용 어시스턴트** — Microsoft Copilot, ChatGPT, Claude 등. 이렇게 프롬프트해 보세요: *"블로그 포스트의 SEO를 감사하는 Copilot Studio 에이전트용 SKILL.md를 작성해 주세요. YAML 프런트 매터에 `name`과 '사용 시점… / 사용하지 않는 경우…' 형식의 `description`을 포함하고, 그 아래에 절차를 마크다운으로 작성해 주세요."*
- **Copilot Cowork 같은 에이전트 작업 공간** — 여러 턴에 걸쳐 파일을 다듬고 비평을 받은 뒤, 업로드할 수 있는 깔끔한 마크다운으로 내보냅니다.
- **지금 만들고 있는 에이전트의 미리 보기 패널** — Copilot Studio 에이전트 자체도 유능한 모델이므로, *미리 보기*에서 Skill 초안을 요청하고 그 결과를 새 Skill로 복사할 수 있습니다. Skills를 실행하는 엔진이 Skills 작성도 도와주는 셈입니다.

그런 다음 AI의 초안을 `.md` 파일로 저장해 업로드하면 됩니다. 같은 요령으로 2번 방법도 강화할 수 있습니다: skills.sh(또는 다른 Skill 공유 사이트)에서 Skill을 찾아 이 도구들에 붙여넣고 *"D2C 스포츠 의류 브랜드에 맞게 조정하고 설명을 더 좁혀 줘"*라고 요청하세요. 검토와 테스트만 거치면 되는 맞춤형 초안을 몇 초 만에 얻을 수 있습니다.

<div class="info-box note" markdown="1">
**주의**: AI가 작성한 Skill도 빌린 것과 같은 규칙이 적용됩니다: **신뢰하기 전 모든 줄을 읽으세요.** 모델은 빠른 초안을 제공하는 것이지, 승인 스탬프를 찍을 완성품이 아닙니다. 검토자는 여러분입니다.
</div>

## 🚪 Copilot Studio에 Skill을 추가하는 두 가지 방법

내용을 어떻게 작성했든, **Skill 추가** 대화 상자의 **두 가지 입구** 중 하나로 에이전트에 들어옵니다.

- **빈 곳에서 만들기** — `name`, `description`, 지시를 양식에 직접 입력하거나 붙여넣습니다. 처음부터 작성하거나 짧은 Skill을 붙여넣을 때 적합합니다.
- **Skill 업로드** — 완성된 마크다운 Skill 파일을 드래그하면 Copilot Studio가 세 필드를 자동으로 채웁니다. 예시나 AI, 동료에게서 받은 파일이 이미 있을 때 적합합니다.


## 🧪 Lab 1.1: 간결한 지시로 에이전트 만들기

모든 대화에서 항상 사실인 지시만으로 에이전트 셸을 구축합니다. 블로그 규칙, SEO 규칙 등 작업별 내용을 여기에 넣고 싶은 충동을 참으세요.

1. [Microsoft Copilot Studio](https://copilotstudio.microsoft.com)로 이동해 로그인합니다. 홈 페이지 상단의 **새 환경** 토글이 켜져 있는지 확인합니다.

1. 홈 페이지에서 **에이전트(Agent)** 를 선택합니다.

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

Copilot Studio 에이전트에서 Skills를 만들고 통합하는 여러 방법을 살펴볼 텐데, 먼저 처음부터 만드는 방식으로 시작합니다. 마케팅 콘텐츠 에이전트의 핵심 작업 중 하나가 블로그 포스트 초안 작성이므로, 이를 위한 집중된 카피라이팅 Skill을 만들겠습니다.

1. **Build** 편집기에서 오른쪽 구성 패널의 **Skills** 카드를 찾아 **Skill 추가**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.2_01_AddSkill-annotated.png' | relative_url }}" alt="에이전트 구성 패널의 Skill 추가 카드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 구성 패널의 Skill 추가 카드</figcaption></figure>

1. **Skill 추가** 대화 상자에는 두 가지 방법이 있습니다: **Skill 업로드**(마크다운 Skill 파일 드래그)와 **빈 곳에서 만들기**(필드에 직접 입력). **빈 곳에서 만들기**를 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.2_03_CreateFromBlank.png' | relative_url }}" alt="Skill 업로드와 빈 곳에서 만들기 탭이 있는 Skill 추가 대화 상자" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Skill 추가 대화 상자 — 빈 곳에서 만들기 선택</figcaption></figure>

1. 아래 입력값으로 필드를 채웁니다.

    다음을 **이름**으로 붙여넣습니다:

    ```text
    draft-blog-post
    ```

    다음을 **설명**으로 붙여넣습니다:

    ```text
    Use when the user wants to turn product notes, a changelog, or a raw idea into a full blog post or article. Do NOT use for social posts, SEO checks, or pure editing — those have their own skills.
    ```

    다음을 **지시**로 붙여넣습니다:

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

이번 랩에서는 Skill을 처음부터 작성하는 대신 기존 Skill 파일을 검토하고 업로드합니다. 이 패턴을 사용하면 검증된 절차를 재사용하면서도 점검과 유지 관리를 쉽게 유지할 수 있습니다.

계속하기 전에 준비된 세 개의 Skill 파일을 다운로드합니다.

다운로드 링크: [https://download-directory.github.io/?url=https://github.com/microsoft/agent-academy/tree/main/docs/special-ops/ghostwriter/assets/skills&filename=ghostwriter-skills](https://download-directory.github.io/?url=https://github.com/microsoft/agent-academy/tree/main/docs/special-ops/ghostwriter/assets/skills&filename=ghostwriter-skills)

1. 다운로드한 ZIP 파일을 압축 해제하고 `seo-audit.md`를 열어 검토합니다.

    <div class="info-box note" markdown="1">
    **주의**: Skill을 업로드하기 전에 반드시 읽으세요. `seo-audit.md`를 열어 모든 줄을 훑어보세요. Skill은 에이전트의 행동을 조종하므로 풀 리퀘스트를 검토하듯 검토해야 합니다. (이 파일은 안전합니다; 습관을 기르는 것이 핵심입니다.)
    </div>

1. **Build** 탭으로 돌아와 **Skills** 카드에서 **+ 버튼**을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.3_addskill.png' | relative_url }}" alt="Skill 추가" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Skill 추가 버튼</figcaption></figure>

1. 이번에는 **Skill 업로드** 옵션을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.3_uploadskill.png' | relative_url }}" alt="Skill 업로드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Skill 업로드 옵션 선택</figcaption></figure>

1. `seo-audit.md`를 업로드 영역에 드래그합니다(또는 탐색해 선택). Copilot Studio가 파일을 읽고 **이름**, **설명**, **지시**를 자동으로 채웁니다. YAML의 `name`과 `description`은 라우팅 메타데이터가 되고, 프런트 매터 아래의 모든 내용은 지시가 됩니다. **Skills** 아래의 `seo-audit` 항목을 선택해 결과를 확인합니다.

## 🧪 Lab 1.4: `repurpose-to-social` Skill 만들기

다음으로, 긴 콘텐츠를 개별 소셜 채널에 맞게 변환하는 Skill로 같은 업로드 패턴을 반복합니다.

1. 압축 해제된 Skill 파일에서 `repurpose-to-social.md`를 열어 빠르게 읽습니다.

1. **Skill 추가 → Skill 업로드**를 선택합니다.

1. `repurpose-to-social.md`를 업로드 영역에 드래그합니다. **Skills** 섹션에서 선택하고 모든 속성이 올바르게 매핑되었는지 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.4_skillfilled.png' | relative_url }}" alt="repurpose-to-social Skill 추가 완료" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>repurpose-to-social Skill 추가 완료</figcaption></figure>

## 🧪 Lab 1.5: `brand-voice-check` Skill 만들기

재사용 가능한 브랜드 보이스 검토 절차를 추가해 에이전트의 핵심 Skill 세트를 완성합니다.

1. 압축 해제된 Skill 파일에서 `brand-voice-check.md`를 열어 읽습니다.

1. **Skill 추가 → Skill 업로드**를 선택합니다.

1. `brand-voice-check.md`를 업로드 영역에 드래그합니다. **Skills** 섹션에서 선택하고 모든 속성이 올바르게 매핑되었는지 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.5_skillfilled.png' | relative_url }}" alt="네 개의 Skills가 모두 표시된 Skills 카드" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>네 개의 Skills가 모두 추가된 Skills 카드</figcaption></figure>

## 🧪 Lab 1.6: 멀티 Skill 오케스트레이션 테스트

이번이 결실을 보는 순간입니다. 에이전트에 복합 요청 하나를 던지고, 오케스트레이터가 여러 Skills를 활성화·조합해 하나의 결과를 만들어 내는 과정을 관찰합니다.

1. 에이전트 상단의 **미리 보기(Preview)** 탭을 선택합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.5_previewtab.png' | relative_url }}" alt="Fabrikam Content Agent의 미리 보기 탭" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Fabrikam Content Agent의 미리 보기 탭</figcaption></figure>

1. 다음 프롬프트를 복사해 붙여넣고 **Enter**를 누릅니다.

    ```text
    Create a complete launch content package from these product notes:

    Trailburst running shorts have four-way stretch, a hidden zip pocket,
    and launch this Friday.

    Produce a publish-ready blog post, audit its SEO, document the checks and
    recommended fixes, apply appropriate improvements, adapt the final post for
    LinkedIn and X, and ensure every deliverable follows the Fabrikam brand voice.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.6.01_prompt.png' | relative_url }}" alt="미리 보기에 입력한 복합 런치 패키지 프롬프트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>미리 보기에 입력한 복합 런치 패키지 프롬프트</figcaption></figure>

1. 활동 추적(activity trace)을 확인합니다. 이 복합 요청에서는 에이전트가 `draft-blog-post`, `seo-audit`, `repurpose-to-social`, `brand-voice-check` 네 개의 Skills를 모두 로드하는 것이 예상 결과입니다.

    오케스트레이터가 작업을 동적으로 계획하므로 순서는 달라질 수 있습니다. 빠진 것이 있다면 네 개의 Skills가 모두 연결되어 있는지 확인하고, 각 설명을 검토한 뒤 새 채팅을 시작해 같은 요청으로 다시 시도하세요. 실행할 때마다 계획과 출력이 달라질 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.6.02_chaining.png' | relative_url }}" alt="네 개의 Skills가 로드된 활동 추적" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>네 개의 Skills가 로드된 활동 추적</figcaption></figure>

1. 응답을 검토합니다. 마크다운 파일을 제공할 수도 있고, 채팅에 결과물을 바로 렌더링할 수도 있습니다. 파일을 만든 경우 파일을 선택해 내용을 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.6.03_file.png' | relative_url }}" alt="미리 보기에서 생성된 Trailburst 런치 패키지 파일" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>미리 보기에서 생성된 Trailburst 런치 패키지 파일</figcaption></figure>

1. 파일을 검토하고 다음 항목이 포함되어 있는지 확인합니다.

    - 완성된 블로그 포스트
    - 각 점검 항목, 발견 사항, 적용된 수정 사항을 보여 주는 SEO 감사 결과
    - 최종 블로그 포스트를 바탕으로 변환한 LinkedIn·X 포스트
    - Fabrikam 브랜드 보이스 검토 결과

    빠진 결과물이 있다면 **Build** 탭에서 네 개의 Skills가 모두 연결되어 있는지 확인하세요. 새 미리 보기 채팅을 시작해 요청을 다시 시도합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.6.04_filereview.png' | relative_url }}" alt="SEO 메타데이터가 포함된 생성 블로그 포스트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>SEO 메타데이터가 포함된 생성 블로그 포스트</figcaption></figure>

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.6.04_filereview2.png' | relative_url }}" alt="점검 항목과 적용된 수정 사항을 보여 주는 SEO 감사" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>점검 항목과 적용된 수정 사항을 보여 주는 SEO 감사</figcaption></figure>

### Skill 경계 테스트

좋은 Skill 설명은 오케스트레이터가 언제 Skill을 활성화하고 언제 그대로 둘지 판단하도록 돕습니다. 라우팅 작업을 마쳤다고 판단하기 전에 경계의 양쪽을 모두 테스트하세요.

1. **미리 보기**에서 **새 채팅(New chat)** 을 선택해 이전 요청이 이번 테스트에 영향을 주지 않도록 합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.6.06_newchat.png' | relative_url }}" alt="미리 보기 도구 모음의 새 채팅 버튼" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>미리 보기 도구 모음의 새 채팅 버튼</figcaption></figure>

1. 다음 요청을 입력합니다.

    ```text
    Suggest five names for a new Fabrikam trail-running shoe.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.6.07_newprompt.png' | relative_url }}" alt="새 미리 보기 채팅에 입력한 제품 네이밍 요청" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>새 미리 보기 채팅에 입력한 제품 네이밍 요청</figcaption></figure>

1. 응답을 확인합니다. 제품 이름 짓기는 네 Skills가 정의한 작업이 아니므로 어떤 Skill도 활성화되지 않아야 합니다. 에이전트는 일반 지시만으로 응답할 수 있습니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.6.08_response.png' | relative_url }}" alt="마케팅 Skills가 활성화되지 않은 일반 제품 네이밍 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>마케팅 Skills가 활성화되지 않은 일반 제품 네이밍 응답</figcaption></figure>

<div class="info-box note" markdown="1">
**팁**: 관련 없는 Skill이 활성화된다면 **설명**을 수정해 언제 사용하고 언제 사용하지 말아야 하는지를 더 명확히 밝히세요. 새 채팅을 시작해 같은 테스트를 반복하고, 활동 추적이 의도한 라우팅을 보여 줄 때까지 다듬습니다. Skill의 품질은 옳은 요청에 활성화되는 것만큼이나 잘못된 요청에 활성화되지 않는 데 달려 있습니다.
</div>

이것을 1,500단어짜리 프롬프트 하나로 유지 관리한다고 상상해 보세요. LinkedIn 글자 수를 바꾸려면 관련 없는 텍스트 벽을 편집하고 전부 다시 테스트해야 합니다. Skills를 사용하면 `repurpose-to-social`을 열어 한 줄만 바꾸면 되고 나머지 세 절차는 그대로입니다. 이것이 유지 관리 측면의 이득입니다.

<div class="info-box note" markdown="1">
**팁**: Skill이 발동되지 않아야 할 때 발동되거나(또는 발동되어야 할 때 발동되지 않는다면), 수정 포인트는 거의 항상 내부 지시가 아니라 **설명**입니다. "사용 시점…/사용하지 않는 경우…" 표현을 다듬고 다시 테스트하세요. 라우팅은 설명의 문제입니다.
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

## 🧠 보너스: Memory로 에이전트 개인화하기

Memory는 대화가 바뀌어도 개별 사용자의 유용한 선호를 에이전트가 기억하도록 해 줍니다. 지시·Knowledge·Skills를 대체하는 기능은 아니며, 팀이 공유하는 브랜드 규칙은 여전히 메이커가 관리하는 이 구성 요소들에 있어야 합니다.

<div class="info-box note" markdown="1">
**중요**: Memory는 GitHub Copilot harness 기반 에이전트의 미리 보기 기능이며 변경될 수 있습니다. 각 에이전트는 사용자별로 별도의 메모리를 유지합니다. 메모리는 해당 사용자에게만 비공개로 보이며 메이커나 다른 사용자는 볼 수 없습니다. 상호작용이 28일 동안 없으면 시스템이 해당 에이전트의 사용자 메모리를 삭제합니다. 그룹 채팅과 Microsoft Teams 채널에서는 Memory가 비활성화됩니다. Memory를 끄면 저장된 메모리를 사용하지 않지만 삭제되지는 않습니다. Memory가 켜진 에이전트를 사용하면 Copilot Credits가 소비될 수 있습니다.
</div>

1. 에이전트의 **Build** 탭을 엽니다.

1. 구성 요소 패널에서 **Memory**를 켭니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.8.01_memorytoggle.png' | relative_url }}" alt="에이전트 Build 패널에서 활성화한 Memory 토글" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>에이전트 Build 패널에서 활성화한 Memory 토글</figcaption></figure>

1. **미리 보기**를 열고 **새 채팅**을 선택합니다. 메모리가 활성화되었다는 안내 메시지가 표시됩니다. 다음 프롬프트를 복사해 붙여넣고 **Enter**를 누릅니다.

    ```text
    Remember that I prefer LinkedIn posts under 700 characters, with no emoji and one direct call to action.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.8.02_memoryprompt.png' | relative_url }}" alt="개인 LinkedIn 포스트 선호를 기억해 달라는 요청" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>개인 LinkedIn 포스트 선호를 기억해 달라는 요청</figcaption></figure>

1. 에이전트가 메모리를 저장했다는 확인 응답을 보냅니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.8.03_memoryconfirm.png' | relative_url }}" alt="LinkedIn 선호가 저장되었다는 에이전트 확인" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>LinkedIn 선호가 저장되었다는 에이전트 확인</figcaption></figure>

1. 새 채팅을 시작합니다. 메모리를 테스트하기 위해 다음 프롬프트를 복사해 붙여넣고 새 LinkedIn 포스트를 요청합니다.

    ```text
    Create a LinkedIn post about a new purple colorway for our Trailburst running shorts with four-way stretch and a hidden zip pocket. They launch Friday.
    ```

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.8.05_memorytest.png' | relative_url }}" alt="저장된 선호를 다시 말하지 않고 요청한 LinkedIn 포스트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>저장된 선호를 다시 말하지 않고 요청한 LinkedIn 포스트</figcaption></figure>

1. 응답이 `brand-voice-check` Skill을 활성화하고 저장된 선호(700자 미만, 이모지 없음, 직접적인 CTA 하나)를 적용하는지 확인합니다.

    <figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/1.8.06_memorytestresponse.png' | relative_url }}" alt="브랜드 보이스 Skill과 저장된 선호를 적용한 LinkedIn 응답" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>브랜드 보이스 Skill과 저장된 선호를 적용한 LinkedIn 응답</figcaption></figure>

1. 에이전트에게 무엇을 기억하고 있는지 물어봅니다.

    ```text
    What do you remember about my content preferences?
    ```

1. 응답에 LinkedIn 선호가 포함되어 있는지 확인합니다. 그런 다음 메모리 수명 주기를 마무리하기 위해 삭제합니다.

    ```text
    Forget my LinkedIn content preferences.
    ```

    특정 메모리는 채팅에서 업데이트하거나 삭제할 수 있습니다. 전체 메모리를 검토하거나 지우려면, 메모리가 활성화된 대화에서 에이전트가 제공하는 링크로 메모리 포털을 여세요.

## ✅ 미션 완료!

축하합니다, 에이전트 여러분 — **Operation Ghostwriter** 완료! 간결한 지시와 일련의 집중된 Skills, 그리고 필요할 때 적합한 것을 꺼내는 오케스트레이터로 실제 마케팅 콘텐츠 에이전트를 모던 방식으로 구축했습니다.

이 미션에서 달성한 것들:

- ✅ **지시 vs. Skills**: 항상 로드되는 지시와 온디맨드 Skill에 각각 무엇이 속하는지 파악했습니다.
- ✅ **라우팅 메타데이터**: Skill이 정확히 필요한 순간에 발동되도록 `name` + `description`을 작성할 수 있게 되었습니다.
- ✅ **멀티 Skill 오케스트레이션**: 거대한 프롬프트 하나 대신 집중된 Skills 네 개를 만들고, 오케스트레이터가 하나의 복합 요청을 위해 이들을 조합하는 모습을 확인했습니다.
- ✅ **빌리고 적용하기**: 커뮤니티의 절차를 가져와 신뢰하기 전에 검증해 다듬는 방법을 익혔습니다.
- ✅ **Memory로 개인화**: 선택 보너스 랩에서 사용자별 선호를 저장·재사용·확인·삭제해 봤습니다.

## 🏅 완료 배지 획득

<figure class="screenshot"><img src="{{ '/assets/academy/special-ops-ghostwriter/ghostwriter-badge.png' | relative_url }}" alt="Operation Ghostwriter 완료 배지" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')"><figcaption>Operation Ghostwriter 완료 배지</figcaption></figure>

축하합니다, 에이전트 여러분. 미션을 완수했습니다! 이제 배지를 받을 차례입니다.

배지 요청 양식을 제출하고 필수 질문에 모두 답하세요.

[https://aka.ms/agent-academy-special-ops/ghostwriter/form](https://aka.ms/agent-academy-special-ops/ghostwriter/form)

제출 내용이 검토되면 Global AI Community로부터 배지 수령 안내 메일을 받게 됩니다.

<div class="info-box note" markdown="1">
**팁**: 메일이 보이지 않으면 스팸 또는 정크 메일함을 확인하세요.
</div>

## 📚 참고 자료

- 📖 [Microsoft Copilot Studio 설명서](https://learn.microsoft.com/microsoft-copilot-studio/)
- 📖 [GitHub Copilot harness 에이전트의 Skills 개요](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/skills-overview)
- 📖 [기존 Skill 추가하기](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/skills-add-existing)
- 📖 [GitHub Copilot harness 에이전트의 지시 작성](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/authoring-instructions)
- 📖 [Copilot Credits 과금 개요](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/billing-credit-overview)
- 📖 [Memory 개요](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/memory-overview)
- 🔗 [skills.sh — 커뮤니티 에이전트 Skills](https://www.skills.sh/)
