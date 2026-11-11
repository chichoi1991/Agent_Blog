---
layout: "chapter"
date: 2026-10-21
title: "Copilot Studio 두 하네스를 위한 단일 SDK 클라이언트 (미리 보기)"
short_title: "Copilot Studio SDK 클라이언트"
description: "Microsoft Entra ID 로그인으로 Standard 및 GitHub Copilot 하네스 에이전트에 연결하는 Copilot Studio 클라이언트와 추론·도구 호출 표시 방법을 소개합니다."
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
  <img src="{{ '/assets/catblog/copilot-studio-sdk-both-harnesses/header.png' | relative_url }}" alt="하나의 Copilot Studio 클라이언트가 표준 및 GitHub Copilot 하네스와 연결되는 채팅 앱" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

[수동 인증은 필요하지 않을 수 있습니다](https://microsoft.github.io/mcscatblog/posts/you-dont-need-manual-auth/)에서 에이전트의 **Microsoft로 인증** 설정을 유지하면서 **Microsoft Entra ID 로그인**을 사용하는 앱에 Copilot Studio 에이전트를 연결하는 방법을 소개했습니다. 앱은 Entra 앱 등록을 통해 로그인하고 Microsoft 365 Agents SDK로 에이전트와 통신합니다.

그렇다면 에이전트가 GitHub Copilot 하네스를 사용한다면 어떨까요?

새 버전의 Copilot Studio 클라이언트는 GitHub Copilot 하네스를 지원합니다. **두 하네스 모두 동일한 클라이언트를 사용할 수 있습니다.** 환경 ID와 에이전트 스키마 이름을 전달하고, 동일한 대화 메서드를 사용하면 됩니다.

이 기능은 [JavaScript](https://github.com/microsoft/Agents-for-js) 및 [.NET](https://github.com/microsoft/Agents-for-net/tree/main/src/libraries/Client/Microsoft.Agents.CopilotStudio.Client) 클라이언트에 포함됐으며, Python 지원은 예정되어 있습니다. React 샘플을 확장하므로 여기서는 JavaScript를 사용합니다.

> **2026년 10월 미리 보기:** 이 글에서는 JavaScript 클라이언트 `1.10.0-beta.8.g158a2c07ad`를 사용합니다. [공식 통합 개요](https://learn.microsoft.com/en-us/microsoft-365/agents-sdk/integrate-with-mcs)에는 GitHub Copilot 하네스 에이전트가 아직 공식 지원되지 않는다고 나와 있으므로 미리 보기 예제로 참고하세요.
>
> 클라이언트 엔드포인트는 지역별로 순차 배포 중이므로 [조기 릴리스 환경](https://learn.microsoft.com/en-us/power-platform/admin/early-release)에서 먼저 테스트하세요.

## WebChat 경험

WebChat은 스트리밍, 사용자 지정 가능한 대화 기록, 펼칠 수 있는 활동 그룹을 기본 제공합니다. 직접 작성할 UI가 상당히 줄어듭니다. **물론 필수는 아닙니다.** 이미 원하는 프런트엔드가 있다면 SDK를 그곳에서 사용하면 됩니다.

GitHub Copilot 하네스 에이전트는 답변과 함께 추론 및 도구 호출 활동을 보낼 수 있습니다. 클라이언트는 해당 활동을 앱에 제공합니다. 다음은 에이전트가 요청을 처리하는 동안 활동 세부 정보가 접힌 WebChat 예시입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-sdk-both-harnesses/activity-collapsed.png' | relative_url }}" alt="Agent 활동 그룹을 접은 상태로 요청을 처리하는 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>활동 세부 정보를 접은 상태로 요청을 처리하는 에이전트.</figcaption>
</figure>

세부 정보를 보려면 그룹을 펼쳐 추론과 도구 단계를 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-sdk-both-harnesses/activity-expanded.png' | relative_url }}" alt="Finished로 표시된 추론 및 Get items 도구 호출을 보여 주는 펼쳐진 Agent 활동 그룹" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>추론과 Finished 상태의 Get items 호출을 보여 주는 펼친 보기.</figcaption>
</figure>

## React 샘플 사용

기존 [React WebChat 샘플](https://github.com/microsoft/Agents/tree/main/samples/nodejs/copilotstudio-webchat-react)에는 Microsoft 로그인과 Fluent 테마가 포함되어 있습니다. 추론이나 도구 호출은 표시하지 않지만, 이 글의 뒷부분에서 추가합니다.

Node.js 22가 필요합니다. 샘플을 가져와 종속성을 업데이트합니다.

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

동일한 코드로 시작하도록 샘플 리비전과 패키지 버전을 고정했습니다. WebChat과 Fluent 테마는 동일한 버전을 사용하세요. 안정 버전에 기능이 포함되면 [JavaScript 클라이언트 릴리스 노트](https://github.com/microsoft/Agents-for-js/releases)를 확인하세요.

## 에이전트에 연결

인증을 **Microsoft로 인증**으로 설정한 [게시된 에이전트](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-fundamentals-publish-channels)와 해당 에이전트에 액세스할 수 있는 사용자가 필요합니다.

앱 등록은 [샘플 지침](https://github.com/microsoft/Agents/blob/1544bcae38f8865b1f095ffcf8df51561e302065/samples/nodejs/copilotstudio-webchat-react/README.md#3-create-an-application-registration-in-entra-id)을 따릅니다.

1. 에이전트 테넌트에 Entra 앱 등록을 만들거나 기존 등록을 사용합니다.
2. **Single-page application** 리디렉션 URI로 **`http://localhost:3000`**을 등록합니다.
3. **Power Platform API > Delegated permissions > CopilotStudio.Copilots.Invoke**를 추가하고 조직 정책에 따라 동의를 받습니다.

브라우저에 클라이언트 암호를 넣거나 수동 인증으로 전환할 필요는 없습니다. 권한에 관한 자세한 내용은 [SDK 통합 가이드](https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-integrate-web-or-native-app-m365-agents-sdk#configure-your-app-registration-for-user-interactive-sign-in)를 참고하세요.

GitHub Copilot 하네스 UI에서는 복사 가능한 SDK 엔드포인트를 아직 제공하지 않습니다. 클라이언트 및 샘플의 Microsoft Authentication Library(MSAL) 로그인에 필요한 설정은 다음과 같습니다.

| 값 | 사용처 | 확인 위치 |
|---|---|---|
| Environment ID | Copilot Studio 클라이언트 | Copilot Studio URL의 `/environments/` 다음 값 |
| [Agent schema name](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/settings-overview#agent-details) | Copilot Studio 클라이언트 | GitHub Copilot 하네스: **… > Settings > Agent details**. 표준 하네스: **Settings > Advanced > Metadata** |
| Tenant ID 및 application/client ID | SPA 로그인(MSAL) | Entra 앱 등록의 **Overview** 페이지 |

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-sdk-both-harnesses/ghcp-schema-name.png' | relative_url }}" alt="Agent details가 선택된 에이전트 설정과 Identity 아래의 Schema name 복사 아이콘" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>복사 버튼을 사용하세요. 스키마 이름은 필드에 모두 표시되지 않을 수 있습니다.</figcaption>
</figure>

**`src/settings.js`**를 만듭니다. 샘플은 두 설정을 이 파일에 저장합니다. MSAL은 로그인하고 액세스 토큰을 받아 Copilot Studio 클라이언트에 전달합니다.

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

`PowerPlatformCloud.Prod`를 사용하고 `directConnectUrl`은 설정하지 않습니다.

`npm start`를 실행하고 **`http://localhost:3000`**을 연 뒤 로그인하면 에이전트와 대화할 수 있습니다.

> 같은 환경에서 각 하네스의 게시된 에이전트를 동일한 앱 등록으로 테스트했습니다. `schemaName`만 바꿨으며, 두 에이전트 모두 스트리밍 활동을 반환했고 같은 대화에서 인사와 후속 질문에 답했습니다.

## 추론 및 도구 호출 표시

이제 스크린샷처럼 추론과 도구 호출을 표시해 보겠습니다.

WebChat에는 [펼칠 수 있는 활동 그룹](https://github.com/microsoft/BotFramework-WebChat/blob/v4.19.2/docs/CHAIN_OF_THOUGHTS.md)이 이미 있으므로 별도 추론 패널을 만들 필요가 없습니다. SDK의 thought 및 tool-call 엔터티를 WebChat 형식으로 변환하면 됩니다.

현재 이 확장은 추론과 도구 호출 표시를 이해하고 시연하기 위한 방법입니다. 채팅 인터페이스에서 바로 사용할 수 있는 더 많은 옵션도 기대해 주세요.

두 개의 헬퍼 모듈과 교체용 `Chat.tsx`를 이 글에 포함했습니다. React 샘플의 **`src/`** 디렉터리에 저장합니다.

- [activityDetails.ts](https://microsoft.github.io/mcscatblog/assets/posts/copilot-studio-sdk-both-harnesses/activityDetails.ts): thought 업데이트와 도구 상태 변경을 수집합니다.
- [agentActivity.ts](https://microsoft.github.io/mcscatblog/assets/posts/copilot-studio-sdk-both-harnesses/agentActivity.ts): 업데이트를 WebChat의 기본 그룹에 연결합니다.
- [Chat.tsx](https://microsoft.github.io/mcscatblog/assets/posts/copilot-studio-sdk-both-harnesses/Chat.tsx): 로그인, 오류 표시, 연결 정리를 포함한 전체 교체 컴포넌트입니다.

기존 `acquireToken.ts`는 그대로 둡니다. 로그인 방식이 아니라 활동 표시 방식을 바꿉니다. 다운로드 파일은 [MIT 라이선스](https://microsoft.github.io/mcscatblog/assets/posts/copilot-studio-sdk-both-harnesses/LICENSE.txt)로 제공됩니다.

### 연결 감싸기

`Chat.tsx`에서 헬퍼를 가져옵니다.

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

`setBusy`와 `setError`는 다운로드 가능한 컴포넌트의 상태 setter입니다. `showReasoning`과 `showToolCalls`는 SDK가 아니라 헬퍼의 옵션입니다. 각각 켜거나 끄고, 둘 다 설정하지 않을 수도 있습니다.

### WebChat 렌더링

렌더링에는 샘플의 Fluent 컴포넌트를 계속 사용합니다.

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

전체 컴포넌트에서 `styleOptions`는 컴포넌트 바깥에 두고 `partGroupDefaultOpen: false`를 설정합니다. 예제에 집중할 수 있도록 파일 업로드도 비활성화했습니다.

## 에이전트가 반환하는 내용

헬퍼가 SDK 활동을 다음과 같이 처리합니다.

| 콘텐츠 | 표시 |
|---|---|
| 스트리밍 또는 완성된 답변 텍스트 | 일반 WebChat 답변 |
| `thought` 엔터티 | 엔터티의 `text`를 사용하는 추론 단계 |
| `toolCall` 엔터티 | `toolCallId`로 연결되는 이름 있는 단계와 Started, Finished 또는 Failed 상태 |

thought 텍스트가 도착하면 헬퍼는 청크마다 메시지를 추가하는 대신 기존 단계를 업데이트합니다. 에이전트가 같은 도구를 두 번 호출하면 각각 별개의 호출로 표시됩니다. 각 턴은 자체 그룹을 가지며, 중단된 턴은 중단 상태로 표시됩니다.

이전 형식의 도구 이벤트도 처리합니다. 일반 메시지와 추천 답변은 그대로 전달합니다. 도구 인수, 결과, 비공개 플래너 메타데이터는 활동 기록에 포함하지 않습니다.

> `showReasoning`은 서비스가 클라이언트로 보내는 추론만 표시합니다. 에이전트의 추론을 켜거나 모든 진행 업데이트를 thought로 취급하지 않습니다. 수신 내용은 하네스와 모델에 따라 다릅니다.

메시지 렌더링을 바꾸려면 [WebChat 미들웨어 가이드](https://microsoft.github.io/mcscatblog/posts/webchat-middlewares/)에서 확장 지점을 확인하세요.
