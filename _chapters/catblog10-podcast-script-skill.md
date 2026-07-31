---
layout: "chapter"
date: 2026-07-28
title: "매일 받아보는 정보를 실제로 듣고 싶은 팟캐스트로 만들기"
short_title: "Daily Digest 팟캐스트 Skill"
description: "문서, 이메일, 보도 자료를 두 진행자가 대화하는 팟캐스트 에피소드로 변환하는 Copilot Studio Skill — 멀티 보이스 SSML, Azure Text to Speech, 그리고 휴대폰으로 청취까지."
order: 10
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/podcast-script-skill/"
source_author: "raemone"
source_published: "2026-07-28"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/podcast-script-skill/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 raemone(@raemone) 원문 [Turn Your Daily Digest Into a Podcast You'll Actually Listen To](https://microsoft.github.io/mcscatblog/posts/podcast-script-skill/)(2026-07-28)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/podcast-script-skill/header.jpg' | relative_url }}" alt="매일 받아보는 정보를 실제로 듣고 싶은 팟캐스트로 만들기" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

매일 아침 7시 12분, 프레스 리뷰가 받은 편지함에 도착합니다. 헤드라인 열다섯 개, 각 세 문단. 분명 공을 들인 누군가가 큐레이션한 내용입니다. 그런데 매일 아침 열어 보고, 4초 만에 스크롤을 다 내리고는, '나중에 제대로 읽어야지'라고 혼자 다짐합니다.

그리고 제대로 읽는 날은 오지 않습니다.

답답한 것은, 매일 눈은 바쁘지만 귀는 한가한 40분의 황금 시간대가 있다는 점입니다. 출퇴근길, 트레드밀 위, 요리하는 동안. 그 이메일의 내용을 전부 흡수하기에 충분한 시간인데, 읽는 데는 쓸 수 없는 시간이죠.

그래서 이메일을 받아 팟캐스트 에피소드로 돌려주는 에이전트를 만들었습니다. 두 명의 진행자가 실제 대화를 나누는 약 6분짜리 에피소드가 지하철 안 헤드폰으로 흘러나옵니다.

오늘의 목차:

1. **실제로 원했던 것** — 그리고 요약이 그 답이 아닌 이유
2. **Azure Speech 엔드포인트** — 생성과 에이전트 연결
3. **Skill** — 무엇을 하는지, 왜 Skill이어야 했는지
4. **Teams와 M365 Copilot에 게시**해 휴대폰에서 사용하기
5. **팟캐스트 같은 소리를 결정하는 SSML 세부 사항**

> 이 글은 **GitHub Copilot 하네스**가 필요합니다. Skill은 Standard 하네스가 아닌 GitHub Copilot 하네스에서만 동작하며, 전체 기능이 Skill에 의존합니다. 아직 [사용해 보지 않았다면](https://techcommunity.microsoft.com/blog/copilot-studio-blog/meet-the-new-copilot-studio-rebuilt-for-more-complex-multi-step-work/4526488) 이 글은 빌드 가이드가 아닌 미리보기로 참고하세요.

---

## 실제로 원했던 것

목표를 정확히 짚어보겠습니다. "이메일을 요약해줘"가 아닙니다. 그 프레스 리뷰를 에이전트로 요약해본 적이 있습니다. 돌아오는 건 글머리 기호 목록인데, 읽기에는 나쁘지 않지만 듣기에는 최악입니다. 글머리 기호를 그대로 읽으면 비상 대피 안내 방송처럼 들립니다.

들을 수 있는 콘텐츠의 핵심은 두 사람 사이의 마찰입니다. 한 사람이 숫자를 말하면 다른 사람이 "잠깐, 기준이 뭔데요?"라고 되묻는 식입니다. 그 대화 교환이 사실을 머릿속에 남깁니다. NotebookLM의 오디오 오버뷰 형식이 빠르게 퍼진 이유가 바로 그것이고, 제가 받은 편지함에서 원했던 형식이 바로 그것입니다.

그래서 에이전트는 세 가지 결과물을 만들어냅니다:

| 결과물 | 용도 |
| --- | --- |
| `<slug>_Podcast_Script.txt` | 사람이 읽을 수 있는 대본. `NOVA:` / `MILES:` 레이블이 붙어 있어 듣기 전에 훑어볼 수 있음 |
| `<slug>_Podcast.ssml` | 기계가 처리하는 결과물. 멀티 보이스 SSML 형식으로 Text to Speech 서비스에 바로 전달 |
| `<slug>_Podcast.wav` | 원할 경우 생성되는 내레이션 에피소드 |

소스는 거의 무엇이든 됩니다. 뉴스레터, 프레스 리뷰, 채팅에 붙여 넣은 기사 모음, PDF, 문서. 아무것도 없어도 됩니다. 그냥 주제만 주면 에피소드를 만들어줍니다. 회의 전에 검토했어야 할 12페이지 아키텍처 문서에도 사용해봤는데, 훑어보는 것보다 실제로 더 나은 준비가 됐습니다.

완성된 결과물을 먼저 보여드리겠습니다. 무엇을 목표로 하는지 미리 확인해두세요.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/podcast-script-skill/agent-full-run.png' | relative_url }}" alt="Copilot Studio 테스트 창에서 팟캐스트 에이전트가 세그먼트 요약 테이블과 생성된 오디오 파일을 보여주는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>다이제스트를 붙여 넣으면 세그먼트 분류가 나오고, 오디오 생성을 승인하면 `.wav` 파일이 만들어집니다. 전체 루프가 하나의 대화로 완결됩니다.</figcaption>
</figure>

## 1부: Azure Speech 엔드포인트

에이전트가 실제로 오디오를 합성할 곳이 필요합니다. Azure AI Speech 리소스가 그 역할을 하며, 준비하는 데 약 3분 걸립니다.

### Speech 리소스 만들기

[Azure 포털](https://portal.azure.com/#create/Microsoft.CognitiveServicesSpeechServices)에서 **Speech service** 리소스를 만듭니다. 중요한 선택 사항은 두 가지입니다:

- **지역(Region).** 가까운 지역을 선택하고 메모해두세요. 커넥터는 표시 이름이 아닌 짧은 코드(`westeurope`, `eastus` 등)를 요구합니다.
- **가격 책정 계층.** 무료 계층에는 신경망 TTS 문자를 매월 일정 분량 사용할 수 있어, 실제로 커밋하기 전에 전체 기능을 검증하기에 충분합니다. 6분짜리 에피소드는 약 5,000자의 음성 텍스트입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/podcast-script-skill/azure-create-speech.png' | relative_url }}" alt="Azure 포털에서 Speech service 리소스를 만드는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>지역과 가격 계층이 유일한 두 가지 결정 사항입니다. 지역 문자열을 메모해두세요. 잠시 후 필요합니다.</figcaption>
</figure>

### 키와 지역 가져오기

배포가 완료되면 리소스를 열고 **리소스 관리** → **키 및 엔드포인트**로 이동합니다. 필요한 것은 **KEY 1**과 **위치/지역** 값뿐입니다. [커넥터는 엔드포인트 URL이 필요하지 않습니다](https://learn.microsoft.com/connectors/azuretexttospeech/).

<figure class="screenshot">
  <img src="{{ '/assets/catblog/podcast-script-skill/azure-keys-endpoint.png' | relative_url }}" alt="Speech 리소스의 키 및 엔드포인트 블레이드에서 키와 지역 필드를 보여주는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Key 1과 지역 문자열. 둘 다 Power Platform 연결에 직접 입력하고 다른 곳에는 넣지 않습니다.</figcaption>
</figure>

> 키는 다른 자격 증명과 동일하게 취급하세요. Power Platform 연결에만 입력하고, Skill 파일, 지시 사항, 변수에는 절대 넣지 마세요. 키를 직접 다루고 싶지 않다면, 커넥터는 리소스 ID에 대한 Microsoft Entra ID 인증도 지원합니다. 개인 데모 이상의 용도라면 이 방법이 더 나은 선택입니다.

### 사용 가능한 음성 확인하기

기본 캐스트는 `en-US-AvaMultilingualNeural`과 `en-US-AndrewMultilingualNeural`을 사용합니다. 두 음성 모두 표준 신경망 음성이지만 지역에 따라 가용성이 다를 수 있으므로, 선택한 지역의 [지원 음성 목록](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts)을 진행 전에 확인해두는 것이 좋습니다.

## 2부: 에이전트에 커넥터 연결하기

Copilot Studio로 이동합니다. 에이전트에서 **Tools** → **Add a tool** → **Connector**로 가서 **Azure Text to speech**를 검색합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/podcast-script-skill/add-tts-connector.png' | relative_url }}" alt="Copilot Studio 에이전트에서 Azure Text to speech 커넥터를 도구로 추가하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>커넥터는 세 가지 작업을 제공합니다. 그 중 하나만 필요합니다.</figcaption>
</figure>

**Convert text to speech with SSML** 작업을 추가합니다. 이것이 핵심입니다. 형제 작업인 *Convert text to speech*는 일반 문자열과 단일 음성 이름을 받아, 한 명의 진행자가 단조롭게 읽어주는 결과물을 냅니다. SSML 작업이야말로 두 명의 화자, 줄 단위 운율 제어, 제어된 일시 정지를 가능하게 합니다.

연결을 만들 때 **API Key** 인증을 선택하고 Azure 포털에서 가져온 두 값을 입력합니다:

| 필드 | 값 |
| --- | --- |
| Account Key | Speech 리소스의 Key 1 |
| Region | 지역 짧은 코드, 예: `westeurope` |

<figure class="screenshot">
  <img src="{{ '/assets/catblog/podcast-script-skill/create-connection.png' | relative_url }}" alt="계정 키와 지역으로 Azure Text to speech 연결을 만드는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>두 개의 필드. 지역은 사람들이 자주 틀리는 부분으로, 친숙한 이름이 아닌 짧은 코드입니다.</figcaption>
</figure>

이 커넥터를 사용하기 전에 알아둘 두 가지:

- **프리미엄 커넥터**이므로 일반적인 Power Platform 라이선스 규칙이 적용됩니다.
- **연결당 60초에 100회 호출 제한**이 있습니다. 하루에 에피소드 하나를 만드는 용도로는 관계없지만, 문서 배치 처리를 고려한다면 중요한 제한입니다.

도구가 추가되면, 에이전트 도구 목록에서 설명이 여전히 의미 있게 읽히는지 확인하세요. 에이전트는 설명을 기반으로 도구를 선택하며, Skill은 이름으로 이 도구를 찾도록 지시합니다. 설명이 크게 바뀌면 도구 전달이 끊깁니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/podcast-script-skill/tools-list.png' | relative_url }}" alt="에이전트의 Tools 탭에 SSML 텍스트-음성 변환 도구가 나열된 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>Skill이 예상하는 도구 모습.</figcaption>
</figure>

## 3부: Skill 추가하기

배관이 준비됐으니, 이제 흥미로운 부분인 지시 사항입니다.

### Skill이어야 하는 이유

이 모든 내용을 에이전트의 지시 사항 블록 하나에 작성할 수도 있었습니다. 시도해봤습니다. 두 가지 이유로 나쁜 아이디어였습니다.

첫 번째는 지침이 길다는 점입니다. 소스 자료 파싱, 편집 기준에 따른 항목 순위 결정, 대화체 대화 작성, 합성기를 위한 숫자 표기, 유효한 멀티 보이스 SSML 출력. 이 모든 것이 수천 단어의 매우 구체적인 절차로 합산됩니다. 에이전트 지시 사항에 있으면 누군가 그냥 "안녕"이라고 말하는 턴을 포함해 모든 턴에서 컨텍스트를 차지합니다.

두 번째는 상황에 따라 다르다는 점입니다. 제 에이전트가 하는 일 대부분은 팟캐스트와 무관합니다. [Copilot Studio에서 Skill이 작동하는 방법](https://microsoft.github.io/mcscatblog/posts/modern-mcs-agent-skills/)에 관한 Roel의 글이 이 규칙을 잘 정리해줍니다: 모든 대화에서 적용되는 지침은 지시 사항에, 특정 시나리오에만 적용되는 지침은 Skill에 넣으라고. 이건 그야말로 시나리오에 특화된 케이스입니다.

### 다운로드 및 업로드

처음부터 작성할 필요가 없습니다. Skill은 CAT Skill 라이브러리에 공개되어 있습니다: [Podcast Script Generator](https://microsoft.github.io/cat-agent-skills/skills/generating-podcast-script/). 거기서 다운로드하면 아래 설명과 완전히 동일한 파일을 받을 수 있습니다.

Skill은 세 개의 파일이 있는 폴더입니다:

```text
generating-podcast-script/
├── SKILL.md        # 프론트매터 + 11단계 절차
├── README.md       # 사람을 위한 설명
└── metadata.json   # 이름, 설명, 태그, 버전
```

폴더를 압축해 에이전트의 **Skills** 탭에서 **Add a Skill** → **Upload**로 업로드합니다. 단독 `SKILL.md` 파일도 가능하지만, ZIP을 사용하면 README와 메타데이터가 함께 보관됩니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/podcast-script-skill/upload-skill.png' | relative_url }}" alt="Copilot Studio Skills 탭에서 팟캐스트 Skill ZIP을 업로드하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>ZIP을 업로드하면 Skill이 에이전트의 일부가 되어 솔루션과 함께 이동됩니다.</figcaption>
</figure>

라우팅 신호는 프론트매터의 `description`이며, 후속 요청까지 명시적으로 처리하도록 의도적으로 작성되어 있습니다:

```yaml
name: generating-podcast-script
description: >
  Use this skill whenever the user asks to write, generate, or create a
  podcast script or podcast episode, from a topic, or from source material
  such as a news digest, newsletter, email review, or set of articles, and
  optionally convert it to audio with Azure Text-to-Speech. Handles the
  initial request and every follow-up refinement (source, topic, length,
  cast, narration) in the same task.
```

마지막 문장은 한참 시간을 낭비했던 버그 때문에 넣었습니다. 없으면 Skill이 "팟캐스트로 만들어줘"에는 잘 동작했다가, "실제로 더 짧게 해줘"라고 하면 조용히 컨텍스트에서 빠져나가 에이전트가 아무 규칙도 적용하지 않은 대본을 즉흥으로 만들어버렸습니다. Skill이 후속 요청도 담당한다고 명시적으로 말하자 해결됐습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/podcast-script-skill/skill-added.png' | relative_url }}" alt="에이전트 Skills 탭에 팟캐스트 Skill이 등록된 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>이름과 설명이 라우팅 메타데이터입니다. 그 외 모든 것은 팟캐스트 요청이 들어올 때만 로드됩니다.</figcaption>
</figure>

## Skill이 실제로 하는 것

흥미로운 부분은 "팟캐스트 생성"이 아니라 그 순서입니다. Skill은 에이전트를 11단계로 안내하고, 이 순서가 출력물이 뒤죽박죽이 되지 않도록 유지합니다.

**쓰기 전에 먼저 파싱합니다.** 소스 자료가 주어지면, 첫 번째 패스에서 모든 항목을 추출합니다: 헤드라인, 출처, 날짜, 핵심 사실 주장, 수치나 인용, "그래서 뭐가 중요한가". 같은 사건을 다루는 중복 내용은 병합됩니다. 푸터, 면책조항, 구독 취소 텍스트, 이미지 캡션은 버려집니다. 실제 뉴스레터를 다룰 때 결과물이 쓸 만한 이유가 바로 이 단계 덕분입니다. 실제 뉴스레터는 약 30퍼센트가 상투적인 문구이기 때문입니다.

**편집 판단을 내립니다.** 남은 항목들은 뉴스 가치와 영향도를 기준으로 순위가 매겨집니다. 상위 4~6개는 완전한 세그먼트를 받고, 나머지는 단일 짧은 라운드로 정리됩니다. 에피소드와 단순 목록의 차이가 여기 있으며, 원샷 프롬프트로 시도할 때 대부분 건너뛰는 단계가 바로 이것입니다.

**눈이 아닌 입을 위해 씁니다.** 축약형을 어디에나 씁니다. 대부분의 줄은 30단어 이하입니다. 긴 설명은 다른 진행자가 끼어들 수 있도록 두세 번의 교환으로 나뉩니다. 복잡한 개념마다 구체적인 비유 하나. 한 진행자가 청자가 궁금할 만한 질문을 정기적으로 물어보고 다른 진행자가 풀어줍니다.

여기에 규칙이 있고, 그 규칙이 중요합니다. 사실에 반응하는 것은 괜찮습니다. "그 숫자, 충격적이네요"는 괜찮습니다. 사람, 기업, 정치에 대한 만들어낸 의견은 안 됩니다. 미확인 주장은 공개적으로 표시됩니다: "보고서는 이것을 미확인으로 명시적으로 표현합니다." 헤드라인은 절대 그대로 읽지 않고 구어체로 바꿔 말합니다. 출처는 이름으로 표시됩니다.

**길이를 실제 목표로 예산합니다.** 모든 것은 분당 약 150개의 말 단어를 기준으로 비용이 계산됩니다. 짧은 것은 약 450단어, 중간은 약 900단어, 긴 것은 약 1,800단어이며, 에이전트는 10퍼센트 이내로 맞추려 합니다. 6분짜리는 6분입니다. 고정된 출퇴근 시간을 중심으로 습관을 만들 때 이것은 매우 중요합니다.

### 출연진

두 명의 고정 진행자, 항상 동일한 성격:

- **Nova**는 리드입니다. 따뜻하고, 호기심 많고, 빠릅니다. 아젠다를 이끌고, 청취자가 궁금해하는 질문을 던지며, 전문 용어를 일상 언어로 바꿉니다.
- **Miles**는 분석가입니다. 차분하고, 건조하며, 정확합니다. 맥락, 숫자, 주의사항, 2차 영향을 제공합니다. 가끔 Nova의 의견에 반박합니다.

둘 다 내레이터가 아닙니다. 마이크가 아닌 서로에게 말합니다. "팟캐스트에 오신 것을 환영합니다"도 없고, 채널 브랜딩도, 음악 신호도 없습니다. 에피소드는 자료에서 가장 놀라운 단일 사실로 콜드 오픈합니다. 무엇이든 여는 올바른 방법이 그것입니다.

모두 바꿀 수 있습니다. 다른 이름, 다른 음성, 단일 진행자, 다른 언어. Nova와 Miles는 결정하지 않아도 되게 해주는 기본값일 뿐입니다.

### 실행하기

다이제스트를 에이전트에 붙여 넣고 요청합니다:

```text
Here's this morning's press review. Make it a six-minute episode
and give me the audio.
```

에이전트가 파싱하고, 순위를 매기고, 두 파일을 작성한 다음, 오디오 생성 여부를 묻기 **전에** 세그먼트와 대략적인 재생 시간이 담긴 테이블을 보여줍니다. 이 검토 단계를 유지하세요. 합성 후보다 텍스트에서 순서를 수정하는 것이 훨씬 저렴합니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/podcast-script-skill/segment-table.png' | relative_url }}" alt="오디오 생성을 제안하기 전에 에이전트가 세그먼트별 요약 테이블을 보여주는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>여섯 세그먼트, 짧은 라운드, 그리고 예상 재생 시간. 승인하면 커넥터를 호출합니다.</figcaption>
</figure>

승인하면 에이전트가 SSML을 `outputFormat: riff-24khz-16bit-mono-pcm`으로 `ConvertTextToSpeechWithSSML`에 넘기고, base64 응답을 디코딩해 다운로드 가능한 `.wav` 파일로 저장합니다.

## 4부: 휴대폰에서 사용하기

이 부분이 데모를 습관으로 만드는 단계이며, 간단한 프롬프트 실행 대신 굳이 만들 가치가 있는 이유입니다.

에이전트를 게시한 다음, **Channels**에서 **Microsoft 365 Copilot**과 **Microsoft Teams** 채널을 활성화합니다. 두 채널 모두 Henry의 [Teams 및 M365 Copilot 배포](https://microsoft.github.io/mcscatblog/posts/copilot-studio-teams-deployment/) 글에 자세히 다루고 있으므로, 관리자 승인 흐름을 여기서 다시 설명하지 않겠습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/podcast-script-skill/channels.png' | relative_url }}" alt="에이전트에 Teams 및 Microsoft 365 Copilot 채널을 활성화하는 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>에이전트 하나로 두 개의 채널. 모바일 클라이언트도 자동으로 포함됩니다.</figcaption>
</figure>

이렇게 하면 실제로 중요한 것을 얻을 수 있습니다. Teams 모바일은 반환된 `.wav` 파일을 재생 가능한 첨부 파일로 렌더링하므로, 평일 아침이 이런 모습이 됩니다:

1. 휴대폰의 Teams에서 에이전트에 프레스 리뷰를 전달하거나 붙여 넣기
2. 주머니에 폰 넣고 코트 입기
3. 문을 나설 때쯤 채팅에 오디오가 대기 중
4. 재생 탭, 헤드폰 꽂고, 걷기

<figure class="screenshot">
  <img src="{{ '/assets/catblog/podcast-script-skill/teams-mobile-audio.jpg' | relative_url }}" alt="Teams 모바일에서 생성된 팟캐스트 에피소드가 재생 가능한 첨부 파일로 표시된 화면" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>이 모든 작업의 목적, 휴대폰 채팅 스레드에 담겨 있습니다.</figcaption>
</figure>

> 오디오 재생 동작은 채널마다 다릅니다. Teams 모바일은 첨부 파일을 잘 처리하지만, 다른 채널은 플레이어 대신 다운로드로 제공할 수 있습니다. 아침 루틴을 만들기 전에 실제로 사용할 채널에서 먼저 테스트해보세요.

## 소리를 결정하는 요소

위의 모든 것은 배관과 편집입니다. 이 부분은 기계적이며, 첫 번째 시도에서 실패했던 부분이기도 합니다.

### 합성기가 망가뜨릴 것은 모두 풀어 쓰기

TTS 엔진은 기호에 대해 확신을 가지고 틀립니다. 그래서 숫자나 약어는 음성 텍스트에 그대로 남기지 않습니다:

- `2026` 대신 "twenty twenty-six"
- `$3.2B` 대신 "three point two billion dollars"
- `~15%` 대신 "about fifteen percent"
- 약어는 첫 언급 시 풀어 쓰고, 이후 줄여서 사용
- 철자별 약어는 `<say-as interpret-as="characters">API</say-as>` 처리
- 발음이 어색한 고유명사는 `<sub alias="phonetic spelling">Name</sub>` 처리
- 영어 줄 안의 프랑스어 구문은 `<lang xml:lang="fr-FR">` 로 감싸기

스마트 따옴표, 줄표(em dash), 별표, 밑줄, URL은 넣지 않습니다. 이 모든 것이 예상치 못한 방식으로 읽히거나 XML을 조용히 깨트립니다.

### 턴당 음성 요소 하나

가장 많은 시간을 낭비한 규칙이므로 직접적으로 말씀드립니다.

멀티 보이스 SSML 문서에서 두 개의 `<voice>` 요소 사이에 직접 배치된 `<break>` 요소는 유효하지 않으며 합성이 실패합니다. "이상하게 들린다"가 아니라, 실패합니다. 턴 사이에 원하는 일시 정지는 **이전 턴 텍스트 끝**, 해당 턴의 `<prosody>` 안에 있어야 합니다. 두 개의 `<voice>` 요소는 서로 바로 붙어 있어야 합니다.

```xml
<speak version="1.0"
       xmlns="http://www.w3.org/2001/10/synthesis"
       xmlns:mstts="http://www.w3.org/2001/mstts"
       xml:lang="en-US">
  <voice name="en-US-AvaMultilingualNeural">
    <mstts:express-as style="excited">
      <prosody rate="+8%" pitch="+3%">Okay, so the number that stopped me cold
      this morning was forty percent. <break time="300ms"/> Forty percent, in one
      quarter. <break time="250ms"/></prosody>
    </mstts:express-as>
  </voice>
  <voice name="en-US-AndrewMultilingualNeural">
    <mstts:express-as style="chat">
      <prosody rate="-2%" pitch="-4%">Right, and the part everyone's skipping is
      that it's off a very small base. <break time="250ms"/> Context matters
      here. <break time="700ms"/></prosody>
    </mstts:express-as>
  </voice>
</speak>
```

뒤에 붙는 일시 정지를 확인하세요. 250ms는 다음 턴 전 간격입니다. 700ms는 다음 세그먼트 전의 긴 간격입니다. 두 `<voice>` 요소 사이에는 아무것도 없습니다.

### 전달을 다양하게 하지 않으면 단조로워짐

전체 문서에 단일 `rate`와 `pitch`를 적용하면 공항 안내 방송처럼 들립니다. Skill은 진행자별 기준치를 설정합니다. Nova는 `rate="+6%" pitch="+2%"`, Miles는 `rate="-2%" pitch="-4%"`. 그리고 문장의 감정에 맞게 줄별로 조금씩 조정합니다.

`<mstts:express-as>`가 나머지를 담당합니다: 잡담에는 `chat`, 설명에는 `friendly`, 이야기의 사실적 핵심에는 `narration-professional`, 콜드 오픈에는 아껴서 `excited`. 스타일은 서비스에서 지원되지 않는 스타일이 조용히 무시되기 때문에 구조적이 아닌 선택적으로 설정됩니다. `excited`를 지원하지 않는 음성으로 교체해도 약간의 색감을 잃을 뿐, 에피소드 전체가 망가지지 않습니다.

`<emphasis level="moderate">`는 세그먼트당 하나 또는 두 개의 핵심 용어에만 사용됩니다. 그 이상이면 강조가 의미를 잃습니다.

> Copilot Studio에서 무언가를 디버깅하기 전에, 생성된 SSML을 Speech Studio의 [Audio Content Creation](https://speech.microsoft.com/audiocontentcreation)에 붙여 넣으세요. 커넥터가 알려주지 않는 잘못된 줄을 정확히 알려줍니다.

## 솔직한 트레이드오프

**즉각적이지 않습니다.** 6분짜리 에피소드를 파싱, 순위 결정, 작성, 합성하는 것은 진짜 작업입니다. "실행해두고 신발 신으러 가는" 작업이지, 채팅 응답이 아닙니다.

**긴 에피소드는 분할이 필요합니다.** SSML은 40,000자 이하로 유지됩니다. 에피소드가 단일 합성 호출 한도를 넘으면, 에이전트가 세그먼트 경계에서 분할하고, 각 부분을 합성한 다음, 디코딩된 오디오를 순서대로 이어붙입니다. 작동하지만 움직이는 부품이 더 많아집니다.

**편집 판단은 여전히 판단입니다.** 순위 결정은 소스 자료에서 무엇이 중요한지에 대한 에이전트의 의견입니다. 대체로 타당하고 가끔 틀립니다. 그래서 Skill이 내레이션 전에 세그먼트 테이블을 보여주는 것입니다. 동의하지 않으면 순서를 바꾸세요.

**쓰레기가 들어오면 자신 있는 쓰레기가 나옵니다.** 소스 자료가 빈약하면 두 사람이 별것도 아닌 내용에 열정적으로 이야기하는 6분이 됩니다. Skill은 시간을 채우기 위해 사실을 만들어내지 않지만, 뉴스레터가 지루했다는 것도 알려주지 않습니다.

## 다음 단계

명백한 확장은 루프에서 저를 완전히 제거하는 것입니다. 받은 편지함에 자율 트리거를 달고, 프레스 리뷰가 도착하면 Skill이 실행되고, `.wav` 파일이 이미 동기화되어 있는 OneDrive 폴더에 저장됩니다. Giorgio의 [회의 대화록 분석기](https://microsoft.github.io/mcscatblog/posts/meeting-transcript-analyzer/)가 이미 기본적으로 그런 구조입니다. 다른 문제를 대상으로 할 뿐이죠. 아직 연결하지 않았습니다. 자동화하기 전에 출력물이 충분히 좋은지 확인하고 싶었는데, 이제 됐습니다. 다음 주말 프로젝트가 됐습니다.

다른 방향은 뉴스가 아닌 소스 자료입니다. 잘 팔로우하지 않는 제품의 릴리스 노트. 가끔 기여하는 리포지토리의 체인지로그. 아무도 읽지 않은 그 아키텍처 문서. 정보는 진짜 유용하지만 형식이 진짜 거부감을 주는 것들, 업무용 받은 편지함에 들어오는 내용 중 실망스러운 양을 차지하는 것들.

Skill 지시 사항을 어디까지 밀어붙일 수 있는지 궁금하다면, 이 Skill이 적당한 스트레스 테스트입니다. 에이전트에게 편집 작업, 창작 글쓰기, 엄격한 XML 생성을 단일 패스에 요청하며, 각각의 제약이 서로 약간 충돌합니다. 어디서 삐걱거리는지 관찰하는 것이 얌전한 Skill보다 Skill 지시 작성에 대해 더 많이 가르쳐줬습니다. 덧붙여, SSML 실패를 처음 발견한 방법은 에이전트가 자신의 단계를 내레이션하도록 만든 것이었는데, 그것이 [토픽에 관한 글](https://microsoft.github.io/mcscatblog/posts/power-of-topics-copilot-studio/)에서 소개한 첫 번째 트릭입니다.

그래서: 받은 편지함에서 계속 읽으려다 못 읽는 것은 무엇인가요? 이 에이전트를 처음으로 가리킬 대상이 그것입니다.
