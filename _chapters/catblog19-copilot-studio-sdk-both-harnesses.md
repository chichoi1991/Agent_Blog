---
layout: "chapter"
date: 2026-10-21
title: "Copilot Studio 두 하네스에서 사용하는 하나의 SDK 클라이언트 (미리 보기)"
short_title: "두 하네스를 위한 하나의 SDK 클라이언트"
description: "Microsoft Entra ID 로그인부터 추론·도구 호출 표시까지, Copilot Studio 두 하네스에서 같은 클라이언트를 사용하는 방법을 살펴봅니다."
order: 19
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/copilot-studio-sdk-both-harnesses/"
source_author: "adilei"
source_published: "2026-10-21"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/copilot-studio-sdk-both-harnesses/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)(Microsoft Copilot Studio CAT)의 adilei(@adilei) 원문 [One SDK Client for Both Copilot Studio Harnesses (Preview)](https://microsoft.github.io/mcscatblog/posts/copilot-studio-sdk-both-harnesses/)(2026-10-21)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-sdk-both-harnesses/header.png' | relative_url }}" alt="하나의 Copilot Studio 클라이언트로 표준 하네스와 GitHub Copilot 하네스에 연결하는 채팅 앱" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

[수동 인증은 필요하지 않을 수 있습니다](https://microsoft.github.io/mcscatblog/posts/you-dont-need-manual-auth/)에서 에이전트를 **Microsoft로 인증**하도록 설정한 상태로 **Microsoft Entra ID 로그인**을 사용해 Copilot Studio 에이전트를 자체 앱에 넣는 방법을 소개했습니다. 앱은 Entra 앱 등록을 통해 로그인하고 Microsoft 365 Agents SDK를 사용해 에이전트와 통신합니다.

그런데 에이전트가 GitHub Copilot 하네스를 사용한다면 어떨까요?

새 버전 Copilot Studio 클라이언트가 GitHub Copilot 하네스를 지원합니다. **두 하네스 모두 동일한 클라이언트를 사용합니다.** 환경 ID와 에이전트 스키마 이름을 전달하고, 동일한 대화 메서드를 계속 사용하면 됩니다.

이 기능은 [JavaScript](https://github.com/microsoft/Agents-for-js) 및 [.NET](https://github.com/microsoft/Agents-for-net/tree/main/src/libraries/Client/Microsoft.Agents.CopilotStudio.Client) 클라이언트에 이미 포함되어 있으며 Python 지원도 계획되어 있습니다. 여기서는 React 샘플을 확장하므로 JavaScript를 사용합니다.

> **2026년 10월 미리 보기:** 이 글에서는 JavaScript 클라이언트 `1.10.0-beta.8.g158a2c07ad`를 사용합니다. [공식 통합 개요](https://learn.microsoft.com/en-us/microsoft-365/agents-sdk/integrate-with-mcs)에는 GitHub Copilot 하네스 에이전트가 아직 공식 지원되지 않는다고 나와 있으므로 미리 보기 예제로 봐 주세요.
>
> 이 클라이언트의 엔드포인트는 아직 지역별로 순차 배포 중입니다. [얼리 릴리스 환경](https://learn.microsoft.com/en-us/power-platform/admin/early-release)에서 먼저 테스트해 보세요.

## WebChat 환경 살펴보기

WebChat은 스트리밍, 사용자 지정 가능한 대화 기록, 확장 가능한 활동 그룹을 이미 지원합니다. 채팅 UI를 직접 작성할 필요가 줄어듭니다. **반드시 WebChat을 사용해야 하는 것은 아닙니다.** 이미 만족스러운 프런트엔드가 있다면 그곳에서 SDK를 사용하세요.

GitHub Copilot 하네스 에이전트는 답변과 함께 추론 및 도구 호출 활동을 보낼 수 있습니다. 클라이언트는 이 활동을 앱에 노출합니다. 아래는 에이전트가 요청을 처리하는 동안 활동 세부 정보를 접어 둔 WebChat 예입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-sdk-both-harnesses/activity-collapsed.png' | relative_url }}" alt="에이전트가 요청을 처리하고 Agent 활동 그룹은 접힌 상태" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>활동 세부 정보가 접힌 상태로 요청을 처리하는 에이전트.</figcaption>
</figure>

세부 정보가 필요하면 그룹을 펼쳐 추론과 도구 단계를 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-sdk-both-harnesses/activity-expanded.png' | relative_url }}" alt="추론 및 Finished로 표시된 Get items 도구 호출이 보이는 확장된 Agent 활동 그룹" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>추론과 Finished로 표시된 Get items 호출을 보여 주는 확장 보기.</figcaption>
</figure>

## React 샘플 사용하기

기존 [React WebChat 샘플](https://github.com/microsoft/Agents/tree/main/samples/nodejs/copilotstudio-webchat-react)에는 Microsoft 로그인과 Fluent 테마가 포함되어 있습니다. 추론이나 도구 호출은 표시하지 않지만, 이 글의 뒤에서 추가하겠습니다.

Node.js 22가 필요합니다. 샘플을 가져와 종속성을 업데이트하세요.

```bash
git clone https://github.com/microsoft/Agents.git
cd Agents
git checkout 1544bcae38f8865b1f095ffcf8df51561e302065
cd samples/nodejs/copilotstudio-webchat-react

npm install --save-exact \
  @microsoft/agents-copilotstudio-client@1.10.0-beta.8.g158a2c07ad \
  @microsoft/agents-activity@1.10.0-beta.8.g158a2c07ad \
  botframework-webchat@4.19.2 \
  botframework-webchat-fluent-theme@4.19.2 \
  rxjs@7.8.2
```

같은 코드에서 시작할 수 있도록 샘플 리비전과 패키지 버전을 고정했습니다. WebChat과 Fluent 테마는 같은 버전으로 유지하세요. 안정 버전에서 이 기능이 제공되는 시점은 [JavaScript 클라이언트 릴리스 노트](https://github.com/microsoft/Agents-for-js/releases)에서 확인하세요.

## 에이전트에 연결하기

**Microsoft로 인증**이 설정된 [게시 에이전트](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-fundamentals-publish-channels)와 해당 에이전트에 액세스할 수 있는 사용자가 필요합니다.

앱 등록은 [샘플 지침](https://github.com/microsoft/Agents/blob/1544bcae38f8865b1f095ffcf8df51561e302065/samples/nodejs/copilotstudio-webchat-react/README.md#3-create-an-application-registration-in-entra-id)을 따르세요.

1. 에이전트의 테넌트에 Entra 앱 등록을 만들거나 기존 등록을 사용합니다.
2. **단일 페이지 애플리케이션** 리디렉션 URI로 **`http://localhost:3000`**을 등록합니다.
3. **Power Platform API > 위임된 권한 > CopilotStudio.Copilots.Invoke**를 추가하고 조직 정책에 따라 동의를 받습니다.

브라우저에 클라이언트 암호를 넣거나 수동 인증으로 전환할 필요가 없습니다. 권한에 관한 자세한 내용은 [SDK 통합 가이드](https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-integrate-web-or-native-app-m365-agents-sdk#configure-your-app-registration-for-user-interactive-sign-in)를 참고하세요.

GitHub Copilot 하네스 UI에서는 현재 복사할 SDK 엔드포인트를 제공하지 않습니다. 클라이언트 설정과 샘플의 Microsoft Authentication Library(MSAL) 로그인 설정이 필요합니다.

| 값 | 사용처 | 확인 위치 |
|---|---|---|
| 환경 ID | Copilot Studio 클라이언트 | Copilot Studio URL에서 `/environments/` 다음에 오는 값 |
| [에이전트 스키마 이름](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/settings-overview#agent-details) | Copilot Studio 클라이언트 | GitHub Copilot 하네스: **… > Settings > Agent details**. 표준 하네스: **Settings > Advanced > Metadata** |
| 테넌트 ID 및 애플리케이션/클라이언트 ID | SPA 로그인(MSAL) | Entra 앱 등록의 **Overview** 페이지 |

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-sdk-both-harnesses/ghcp-schema-name.png' | relative_url }}" alt="Agent details가 선택된 에이전트 설정과 Identity 아래의 Schema name 복사 아이콘" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>복사 버튼을 사용하세요. 스키마 이름이 입력란에 표시되는 길이보다 길 수 있습니다.</figcaption>
</figure>

**`src/settings.js`**를 만듭니다. 샘플은 두 설정을 모두 이 파일에 저장합니다. MSAL이 로그인하고 액세스 토큰을 획득하면 샘플은 해당 토큰을 Copilot Studio 클라이언트에 전달합니다.

```javascript
import {
  AgentType, ConnectionSettings, PowerPlatformCloud
} from '@microsoft/agents-copilotstudio-client'

export class SampleConnectionSettings extends ConnectionSettings {
  constructor () {
    super({
      environmentId: 'YOUR_ENVIRONMENT_ID',
      schemaName: 'YOUR_AGENT_SCHEMA_NAME',
      cloud: PowerPlatformCloud.Prod,
      copilotAgentType: AgentType.Published
    })
    // Used by the sample's MSAL sign-in helper.
    this.tenantId = 'YOUR_TENANT_ID'
    this.appClientId = 'YOUR_APP_CLIENT_ID'
    this.authority = 'https://login.microsoftonline.com'
  }
}
```

`PowerPlatformCloud.Prod`를 사용하고 `directConnectUrl`은 설정하지 마세요.

`npm start`를 실행하고 **`http://localhost:3000`**을 연 다음 로그인하세요. 에이전트와 채팅할 수 있어야 합니다.

> 같은 환경의 두 하네스 각각에 게시된 에이전트에서 JavaScript 클라이언트를 테스트했고 같은 앱 등록을 사용했습니다. `schemaName`만 변경했습니다. 두 에이전트 모두 스트리밍 활동을 반환했고 같은 대화에서 인사와 후속 질문에 답했습니다.

## 추론 및 도구 호출 표시하기

이제 스크린샷처럼 추론과 도구 호출을 표시해 보겠습니다.

WebChat은 이미 [확장 가능한 활동 그룹](https://github.com/microsoft/BotFramework-WebChat/blob/v4.19.2/docs/CHAIN_OF_THOUGHTS.md)을 제공하므로 별도의 추론 패널을 만들 필요가 없습니다. SDK의 thought 및 tool-call 엔터티를 WebChat이 기대하는 형식으로 변환하면 됩니다.

현재 이 확장은 추론과 도구 호출이 어떻게 표시되는지 이해하고 시연하기 위한 방법입니다. 채팅 인터페이스에서 바로 사용할 수 있는 더 많은 옵션도 기대해 주세요.

이 글에는 도우미 모듈 두 개와 대체용 `Chat.tsx`가 포함되어 있습니다. React 샘플의 **`src/`** 디렉터리에 저장하세요.

- [activityDetails.ts](https://microsoft.github.io/mcscatblog/assets/posts/copilot-studio-sdk-both-harnesses/activityDetails.ts): thought 업데이트와 도구 상태 변경을 수집합니다.
- [agentActivity.ts](https://microsoft.github.io/mcscatblog/assets/posts/copilot-studio-sdk-both-harnesses/agentActivity.ts): 업데이트를 WebChat의 기본 그룹에 연결합니다.
- [Chat.tsx](https://microsoft.github.io/mcscatblog/assets/posts/copilot-studio-sdk-both-harnesses/Chat.tsx): 로그인, 오류 표시, 연결 정리를 포함한 전체 대체 컴포넌트입니다.

기존 `acquireToken.ts`는 그대로 둡니다. 로그인 방식이 아니라 활동 표시 방식을 바꾸는 것입니다. 다운로드 파일은 [MIT 라이선스](https://microsoft.github.io/mcscatblog/assets/posts/copilot-studio-sdk-both-harnesses/LICENSE.txt)로 제공됩니다.

### 연결 감싸기

`Chat.tsx`에서 도우미를 가져옵니다.

```typescript
import { createAgentActivityConnection } from './agentActivity'
```

그런 다음 `CopilotStudioWebChat.createConnection` 대신 다음을 사용합니다.

```typescript
const client = new CopilotStudioClient(settings, token)
const next = createAgentActivityConnection(
  client,
  { showReasoning: true, showToolCalls: true },
  {
    onBusyChange: setBusy,
    onError: failure => setError(failure.message)
  }
)
setConnection(next)
```

`setBusy`와 `setError`는 다운로드할 컴포넌트의 상태 설정 함수입니다. `showReasoning`과 `showToolCalls`는 SDK가 아니라 도우미의 옵션입니다. 각각을 따로 켜거나 둘 다 켜거나 모두 끌 수 있습니다.

### WebChat이 렌더링하도록 하기

렌더링에는 기존 샘플의 Fluent 구성 요소를 계속 사용합니다.

```tsx
<FluentThemeProvider variant="copilot">
  <Composer
    directLine={connection}
    disabled={busy || Boolean(error)}
    styleOptions={styleOptions}
  >
    <BasicWebChat />
  </Composer>
</FluentThemeProvider>
```

전체 컴포넌트에서 `styleOptions`는 컴포넌트 외부에 두고 `partGroupDefaultOpen: false`로 설정합니다. 예제에 집중할 수 있도록 파일 업로드도 비활성화했습니다.

## 에이전트에서 반환되는 내용

도우미는 SDK 활동을 다음과 같이 처리합니다.

| 콘텐츠 | 표시 |
|---|---|
| 스트리밍 중이거나 완료된 답변 텍스트 | 일반 WebChat 답변 |
| `thought` 엔터티 | 엔터티의 `text`를 사용한 추론 단계 |
| `toolCall` 엔터티 | `toolCallId`로 연결된 단계와 Started, Finished 또는 Failed 상태 |

thought 텍스트가 도착하면 도우미는 청크마다 메시지를 추가하는 대신 기존 단계를 업데이트합니다. 에이전트가 같은 도구를 두 번 호출하면 각각 별도의 호출로 남습니다. 각 턴에는 자체 그룹이 있고 중단된 턴은 중단 상태로 표시됩니다.

레거시 도구 이벤트도 처리합니다. 일반 메시지와 추천 답장은 그대로 전달됩니다. 도구 인수, 결과, 비공개 플래너 메타데이터는 활동 기록에 포함되지 않습니다.

> `showReasoning`은 서비스가 클라이언트에 보내는 추론만 표시합니다. 에이전트의 추론을 켜거나 모든 진행 업데이트를 thought로 간주하지는 않습니다. 실제 수신 내용은 하네스와 모델에 따라 다릅니다.

메시지 자체의 렌더링 방식을 바꾸려면 [WebChat 미들웨어 가이드](https://microsoft.github.io/mcscatblog/posts/webchat-middlewares/)에서 확장 지점을 확인하세요.
