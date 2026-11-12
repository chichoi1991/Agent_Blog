---
layout: "chapter"
title: "Copilot Studio 하네스 두 가지를 위한 하나의 SDK 클라이언트 (프리뷰)"
short_title: "하나의 SDK, 두 하네스"
description: "Microsoft Entra ID 로그인과 GitHub Copilot 하네스 에이전트의 추론·도구 호출을 지원하는 Copilot Studio 클라이언트 구성 방법을 알아봅니다."
order: 19
category: "catblog"
source_url: "https://microsoft.github.io/mcscatblog/posts/copilot-studio-sdk-both-harnesses/"
source_author: "adilei"
source_published: "2026-10-21"
source_blog: "The Custom Engine (Microsoft Copilot Studio CAT)"
canonical_url: "https://microsoft.github.io/mcscatblog/posts/copilot-studio-sdk-both-harnesses/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [The Custom Engine](https://microsoft.github.io/mcscatblog/)
(Microsoft Copilot Studio CAT)의 adilei(@adilei) 원문
[One SDK Client for Both Copilot Studio Harnesses (Preview)](https://microsoft.github.io/mcscatblog/posts/copilot-studio-sdk-both-harnesses/)(2026-10-21)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-sdk-both-harnesses/header.png' | relative_url }}" alt="하나의 Copilot Studio 클라이언트를 통해 표준 및 GitHub Copilot 하네스에 연결하는 채팅 애플리케이션" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
</figure>

[You Probably Don't Need Manual Authentication](https://microsoft.github.io/mcscatblog/posts/2025-11-18-you-dont-need-manual-auth/) 글에서는 에이전트를 **Microsoft Entra ID 로그인**을 사용하는 자체 앱에 넣으면서 에이전트의 **Authenticate with Microsoft** 설정을 유지하는 방법을 소개했습니다. 앱은 Entra 앱 등록을 사용해 로그인하고 Microsoft 365 Agents SDK로 에이전트와 통신합니다.

그렇다면 에이전트가 GitHub Copilot 하네스를 사용한다면 어떨까요?

새 버전 Copilot Studio 클라이언트는 GitHub Copilot 하네스를 지원합니다. **두 하네스에 같은 클라이언트를 사용할 수 있습니다.** 환경 ID와 에이전트 스키마 이름을 전달하고, 동일한 대화 메서드를 계속 사용하면 됩니다.

이 기능은 [JavaScript](https://github.com/microsoft/Agents-for-js)와 [.NET](https://github.com/microsoft/Agents-for-net/tree/main/src/libraries/Client/Microsoft.Agents.CopilotStudio.Client) 클라이언트에 이미 포함되어 있으며 Python 지원도 계획되어 있습니다. React 샘플을 확장하므로 여기서는 JavaScript를 사용합니다.

> **2026년 10월 프리뷰:** 이 글에서는 JavaScript 클라이언트 `1.10.0-beta.8.g158a2c07ad`를 사용합니다. [공식 통합 개요](https://learn.microsoft.com/en-us/microsoft-365/agents-sdk/integrate-with-mcs)에는 GitHub Copilot 하네스 에이전트가 아직 공식 지원되지 않는 것으로 나와 있으므로 프리뷰 예제로 봐야 합니다. 클라이언트 엔드포인트는 지역별로 순차 배포 중이므로 [Early release 환경](https://learn.microsoft.com/en-us/power-platform/admin/early-release)에서 먼저 테스트하세요.

## WebChat 경험

WebChat은 스트리밍, 사용자 지정 가능한 대화 기록, 확장 가능한 활동 그룹을 이미 지원합니다. 직접 작성해야 할 채팅 UI가 상당히 줄어듭니다. 물론 필수는 아닙니다. 이미 만족스러운 프런트엔드가 있다면 그곳에서 SDK를 사용하면 됩니다.

GitHub Copilot 하네스 에이전트는 답변과 함께 추론 및 도구 호출 활동을 보낼 수 있습니다. 클라이언트는 이 활동을 앱에 제공합니다. 다음은 에이전트가 요청을 처리하는 동안 활동 세부 정보가 접힌 WebChat 예시입니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-sdk-both-harnesses/activity-collapsed.png' | relative_url }}" alt="Agent 활동 그룹을 접은 상태로 요청을 처리하는 에이전트" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>활동 세부 정보가 접힌 상태로 요청을 처리하는 에이전트</figcaption>
</figure>

세부 정보가 필요하면 그룹을 펼쳐 추론과 도구 단계를 확인할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-sdk-both-harnesses/activity-expanded.png' | relative_url }}" alt="추론과 Finished 상태의 Get items 도구 호출이 표시된 확장된 Agent 활동 그룹" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>추론과 Finished 상태의 Get items 호출을 보여주는 확장 화면</figcaption>
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

같은 코드에서 시작할 수 있도록 샘플 리비전과 패키지 버전을 고정했습니다. WebChat과 Fluent 테마는 같은 버전으로 유지합니다. 이 지원이 안정 버전에 포함되면 [JavaScript 클라이언트 릴리스 노트](https://github.com/microsoft/Agents-for-js/releases)를 확인하세요.

## 에이전트 연결

인증을 **Authenticate with Microsoft**로 설정한 [게시된 에이전트](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-fundamentals-publish-channels)와 해당 에이전트에 액세스할 수 있는 사용자가 필요합니다.

앱 등록은 [샘플 안내](https://github.com/microsoft/Agents/blob/1544bcae38f8865b1f095ffcf8df51561e302065/samples/nodejs/copilotstudio-webchat-react/README.md#3-create-an-application-registration-in-entra-id)를 따릅니다.

1. 에이전트 테넌트에서 Entra 앱 등록을 만들거나 기존 등록을 사용합니다.
2. **Single-page application** 리디렉션 URI로 **`http://localhost:3000`**을 등록합니다.
3. **Power Platform API > Delegated permissions > CopilotStudio.Copilots.Invoke**를 추가하고 조직 정책에 따라 동의를 부여합니다.

브라우저에 클라이언트 암호를 두거나 수동 인증으로 전환할 필요가 없습니다. 권한 정보는 [SDK 통합 가이드](https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-integrate-web-or-native-app-m365-agents-sdk#configure-your-app-registration-for-user-interactive-sign-in)를 참고하세요.

GitHub Copilot 하네스 UI에서는 현재 복사할 SDK 엔드포인트를 제공하지 않습니다. 클라이언트 설정과 샘플의 Microsoft Authentication Library(MSAL) 로그인 설정이 필요합니다.

| 값 | 사용처 | 확인 위치 |
|---|---|---|
| Environment ID | Copilot Studio 클라이언트 | Copilot Studio URL의 `/environments/` 다음 값 |
| [Agent schema name](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/settings-overview#agent-details) | Copilot Studio 클라이언트 | GitHub Copilot 하네스: **… > Settings > Agent details**. 표준 하네스: **Settings > Advanced > Metadata** |
| Tenant ID 및 application/client ID | SPA 로그인(MSAL) | Entra 앱 등록의 **Overview** 페이지 |

<figure class="screenshot">
  <img src="{{ '/assets/catblog/copilot-studio-sdk-both-harnesses/ghcp-schema-name.png' | relative_url }}" alt="Identity 아래 Schema name 복사 아이콘이 선택된 에이전트 설정" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('pending')">
  <figcaption>여기에서 복사 버튼을 사용합니다. 스키마 이름이 입력란에 다 표시되지 않을 수 있습니다.</figcaption>
</figure>

**`src/settings.js`**를 만듭니다. 샘플은 두 설정을 이곳에 저장합니다. MSAL은 로그인하고 액세스 토큰을 획득한 뒤 Copilot Studio 클라이언트에 전달합니다.

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

`npm start`를 실행하고 **`http://localhost:3000`**을 열어 로그인합니다. 이제 에이전트와 채팅할 수 있습니다.

> 같은 환경의 각 하네스에 게시된 에이전트를 대상으로 동일한 앱 등록을 사용해 JavaScript 클라이언트를 확인했습니다. `schemaName`만 바꿨습니다. 두 에이전트 모두 스트리밍 활동을 반환했고, 동일 대화에서 인사와 후속 질문에 답했습니다.

## 추론 및 도구 호출 표시

이제 스크린샷처럼 추론과 도구 호출을 표시해 보겠습니다.

WebChat은 [확장 가능한 활동 그룹](https://github.com/microsoft/BotFramework-WebChat/blob/v4.19.2/docs/CHAIN_OF_THOUGHTS.md)을 이미 지원하므로 별도 추론 패널을 만들 필요가 없습니다. SDK의 thought 및 tool-call 엔터티를 WebChat이 기대하는 형식으로 변환하면 됩니다.

현재 이 확장은 추론과 도구 호출 표시 방법을 이해하고 시연하기 위한 것입니다. 채팅 인터페이스에서 바로 사용할 수 있는 추가 옵션도 기대해 주세요.

이 글에 포함된 두 헬퍼 모듈과 대체 `Chat.tsx`를 React 샘플의 **`src/`** 디렉터리에 저장합니다.

- [`activityDetails.ts`](https://microsoft.github.io/mcscatblog/assets/posts/copilot-studio-sdk-both-harnesses/activityDetails.ts): thought 업데이트와 도구 상태 변경을 수집합니다.
- [`agentActivity.ts`](https://microsoft.github.io/mcscatblog/assets/posts/copilot-studio-sdk-both-harnesses/agentActivity.ts): 업데이트를 WebChat의 기본 그룹과 연결합니다.
- [`Chat.tsx`](https://microsoft.github.io/mcscatblog/assets/posts/copilot-studio-sdk-both-harnesses/Chat.tsx): 로그인, 오류 표시, 연결 정리를 포함한 전체 대체 컴포넌트입니다.

기존 `acquireToken.ts`는 유지합니다. 로그인 방식이 아니라 활동 표시 방식을 바꾸는 것입니다. 다운로드 파일은 [MIT 라이선스](https://microsoft.github.io/mcscatblog/assets/posts/copilot-studio-sdk-both-harnesses/LICENSE.txt)로 제공됩니다.

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

`setBusy`와 `setError`는 다운로드 가능한 컴포넌트의 상태 설정 함수입니다. `showReasoning`과 `showToolCalls`는 SDK가 아니라 이 헬퍼의 옵션입니다. 둘 중 하나만 켜거나 모두 켜고 끌 수 있습니다.

### WebChat으로 렌더링

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

전체 컴포넌트에서 `styleOptions`는 컴포넌트 외부에 두고 `partGroupDefaultOpen: false`를 설정합니다. 예제에 집중할 수 있도록 파일 업로드도 비활성화했습니다.

## 에이전트가 반환하는 내용

헬퍼가 SDK 활동을 다음과 같이 처리합니다.

| 내용 | 표시 |
|---|---|
| 스트리밍 또는 완료된 답변 텍스트 | 일반 WebChat 답변 |
| `thought` 엔터티 | 엔터티의 `text`를 사용하는 추론 단계 |
| `toolCall` 엔터티 | `toolCallId`로 연결된 이름 있는 단계 및 Started, Finished, Failed 상태 |

추론 텍스트가 도착하면 헬퍼는 청크마다 메시지를 추가하는 대신 기존 단계를 업데이트합니다. 에이전트가 같은 도구를 두 번 호출하면 별개의 호출 두 건으로 유지합니다. 각 턴에는 자체 그룹이 있고, 중단된 턴은 중단 상태로 표시됩니다.

기존 도구 이벤트도 처리합니다. 일반 메시지와 추천 답글은 그대로 전달합니다. 도구 인수, 결과, 비공개 플래너 메타데이터는 활동 기록에 포함하지 않습니다.

> `showReasoning`은 서비스가 클라이언트로 보내는 추론만 표시합니다. 에이전트의 추론을 켜거나 모든 진행 업데이트를 thought로 처리하지 않습니다. 수신 내용은 하네스와 모델에 따라 다릅니다.

메시지 자체의 렌더링을 바꾸려면 [WebChat 미들웨어 가이드](https://microsoft.github.io/mcscatblog/posts/2026-02-02-webchat-middlewares/)에서 확장 지점을 확인하세요.
