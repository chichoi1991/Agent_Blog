---
layout: chapter
date: 2026-07-10
title: "SPFx 실전 — 리스트 데이터를 읽는 대시보드 웹 파트 만들기"
short_title: "SPFx 실전 · 대시보드"
description: "SharePoint 리스트를 만들고, 그 리스트를 읽는 SPFx React 대시보드 웹 파트를 처음부터 개발해 App Catalog에 등록하고 페이지에 추가하는 전 과정을 코드와 함께 따라 합니다."
order: 2
category: m365
tags: ["SPFx", "SharePoint", "PnPjs", "React"]
---

<div class="info-box note" markdown="1">

**▶ 한 줄 요약** — SharePoint 사이트에 리스트를 만들고(UI), 그 리스트를 읽어 요약 카드+표로 보여주는 **SPFx React 웹 파트**를 개발합니다. **같은 사이트 리스트는 PnPjs로**, 다른 M365 데이터는 Graph로 가져오는 방법을 코드로 정리하고, **App Catalog 등록**까지 상세히 다룹니다.
</div>

> 이 글은 [SharePoint Framework(SPFx) 개요와 아키텍처]({{ '/chapters/m365-1-spfx-overview/' | relative_url }})의 후속 실습 편입니다.

---

## 0. 사전 준비 (환경설정)

SPFx 개발은 **Node.js + 전역 CLI 도구 3종**이 있으면 시작할 수 있습니다. 아래를 순서대로 설치·검증하세요.

### 0-1. 필요한 것

| 준비물 | 용도 | 검증 |
|--------|------|------|
| Node.js **LTS v22** | 런타임·빌드 (SPFx 1.23.2는 Node 22만 지원) | `node -v` → v22.x |
| Yeoman (`yo`) | 프로젝트 스캐폴딩 도구 | `yo --version` |
| SPFx Generator | SPFx 프로젝트 템플릿 | — |
| gulp-cli | (선택) 태스크 러너 | `gulp -v` |
| VS Code | 권장 에디터 | — |
| SharePoint | 사이트 생성/관리 권한 + App Catalog 접근(관리자) | — |

### 0-2. 설치 명령

```bash
# 1) Node 버전 확인 — 반드시 v22.x 여야 함
node -v          # → v22.x.x

# 2) 전역 CLI 도구 설치 (Yeoman + SPFx 제너레이터 + gulp)
npm install -g yo gulp-cli @microsoft/generator-sharepoint

# 3) 설치 확인
yo --version                              # Yeoman 버전
npm ls -g --depth=0 @microsoft/generator-sharepoint   # 제너레이터 설치 확인
```

<div class="info-box warning" markdown="1">

**Node 버전이 가장 흔한 함정입니다.** SPFx 1.23.2는 **Node 22 LTS**만 지원합니다. Node 24 등 상위 버전에서는 스캐폴딩·빌드가 `npm install` 단계에서 실패할 수 있으니, [nvm-windows](https://github.com/coreybutler/nvm-windows) 로 버전을 전환하세요.

```bash
nvm install 22.15.0
nvm use 22.15.0
node -v          # v22.15.0 확인 후 진행
```
</div>

<div class="info-box note" markdown="1">

**개발 테넌트가 없다면** [Microsoft 365 개발자 프로그램](https://aka.ms/o365devprogram)에서 무료 개발 테넌트를 발급받아 SharePoint Online + App Catalog를 사용할 수 있습니다.
</div>

---


## 1. 단계 A — SharePoint 사이트에서 리스트 직접 만들기

프로비저닝 스크립트 대신, **SharePoint UI에서 직접** 리스트를 만듭니다. 실무에서 가장 익숙한 방식입니다.

### 1-1. 리스트 생성
1. 대상 사이트 → **설정(⚙) → 사이트 콘텐츠** → 상단 **+ 새로 만들기 → 목록**.
2. **"어떻게 시작하시겠습니까?"** 대화상자에서 **빈 목록**을 선택.
3. 이름을 `Project Status` 로 지정 → **만들기**.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-01a-newmenu.png' | relative_url }}" alt="사이트 콘텐츠 새로 만들기">
  <figcaption>① 사이트 콘텐츠 → 새로 만들기 → 목록</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-01b-startdialog.png' | relative_url }}" alt="목록 시작 옵션">
  <figcaption>② 시작 방법 선택 — 빈 목록 / Form / Excel · CSV 가져오기 / 서식 파일. 여기서는 <strong>빈 목록</strong> 선택</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-01c-naming.png' | relative_url }}" alt="목록 이름 지정">
  <figcaption>③ 이름을 <code>Project Status</code> 로 지정 → 만들기</figcaption>
</figure>

### 1-2. 컬럼 추가
기본 `Title` 컬럼(프로젝트명)에 더해, 리스트 상단의 **+ 열 추가**로 아래 5개를 만듭니다. **내부 이름(고정)** 이 코드와 일치해야 하므로 표의 이름을 그대로 사용하세요.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-01d-columntypes.png' | relative_url }}" alt="열 만들기 - 컬럼 유형 선택">
  <figcaption>+ 열 추가 → "열 만들기"에서 컬럼 유형 선택 (텍스트 · 선택 항목 · 날짜 · 숫자 · 텍스트 여러 줄 등)</figcaption>
</figure>

| 표시 이름 | 유형 | 내부 이름 | 설정 |
|-----------|------|-----------|------|
| Owner | 한 줄 텍스트 | `Owner` | — |
| Status | 선택(Choice) | `PStatus` | 옵션: Not Started / In Progress / At Risk / Completed |
| Progress | 숫자 | `Progress` | 0–100 |
| Due Date | 날짜 | `DueDate` | 날짜만 |
| Notes | 여러 줄 텍스트 | `Notes` | — |

<div class="info-box warning" markdown="1">

**"표시 이름"과 "내부 이름"은 다릅니다.** SharePoint는 컬럼을 처음 만들 때의 이름으로 **내부 이름**을 고정합니다. 예를 들어 표시 이름을 `Status`로 바꾸고 싶다면, 먼저 `PStatus`로 만든 뒤 표시 이름만 나중에 변경하세요. 코드는 항상 **내부 이름**(`PStatus`, `DueDate` 등)으로 리스트를 읽습니다. 내부 이름은 리스트 설정 → 해당 열 클릭 시 URL의 `Field=` 값으로 확인할 수 있습니다.
</div>

### 1-3. 샘플 데이터 입력
표 형식(그리드) 편집으로 몇 행을 채웁니다. 예:

| Title | Owner | PStatus | Progress | DueDate | Notes |
|-------|-------|---------|----------|---------|-------|
| Website Redesign | Alice Kim | In Progress | 65 | 2026-08-15 | CMS 마이그레이션 진행 중 |
| Mobile App Launch | Brian Park | At Risk | 40 | 2026-07-31 | iOS 심사 지연 |
| CRM Integration | Alice Kim | Completed | 100 | 2026-06-30 | 운영 반영 완료 |

---

## 2. 단계 B — 대시보드 웹 파트 만들기 (핵심)

### 2-1. 프로젝트 스캐폴딩
빈 폴더에서 Yeoman 제너레이터를 실행합니다.

```bash
md project-dashboard; cd project-dashboard
yo @microsoft/sharepoint
```
프롬프트 응답:

| 질문 | 답 |
|------|-----|
| Solution name | `project-dashboard` |
| Component to create | **WebPart** |
| Web part name | `ProjectDashboard` |
| Framework | **React** |

생성이 끝나면 데이터 접근 라이브러리 **PnPjs**를 설치합니다.

```bash
npm install @pnp/sp --save
```

### 2-2. 웹 파트 진입점 — 속성창에 "리스트 이름" 추가
`src/webparts/projectDashboard/ProjectDashboardWebPart.ts` 에서 두 가지를 합니다: **①리스트 이름 속성 추가**, **②컴포넌트에 `context` 전달**(PnPjs 초기화에 필요).

```typescript
export interface IProjectDashboardWebPartProps {
  description: string;
  listName: string;               // ← 추가: 읽을 리스트 이름
}

// render() 안에서 컴포넌트에 listName 과 context 를 넘긴다
const element: React.ReactElement<IProjectDashboardProps> = React.createElement(
  ProjectDashboard,
  {
    description: this.properties.description,
    listName: this.properties.listName,          // ← 추가
    context: this.context                         // ← 추가 (PnPjs 초기화용)
  }
);

// 속성창(Property Pane)에 리스트 이름 입력 필드 추가
protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [{
      header: { description: strings.PropertyPaneDescription },
      groups: [{
        groupName: strings.BasicGroupName,
        groupFields: [
          PropertyPaneTextField('listName', { label: '리스트 이름 (표시 이름)' })
        ]
      }]
    }]
  };
}
```

컴포넌트가 받을 props 인터페이스 `components/IProjectDashboardProps.ts`:

```typescript
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IProjectDashboardProps {
  description: string;
  listName: string;
  context: WebPartContext;
}
```

### 2-3. 같은 사이트 리스트 읽기 — PnPjs (핵심)
`components/ProjectDashboard.tsx`. 여기가 **"같은 사이트의 리스트를 참조하는"** 부분입니다.

```typescript
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import styles from './ProjectDashboard.module.scss';
import { IProjectDashboardProps } from './IProjectDashboardProps';

interface IProject {
  Id: number; Title: string; Owner: string;
  PStatus: string; Progress: number; DueDate: string | null; Notes: string;
}

const ProjectDashboard: React.FC<IProjectDashboardProps> = (props) => {
  const { listName, context } = props;
  const [items, setItems] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = useCallback(async (): Promise<void> => {
    if (!listName) { setItems([]); return; }
    setLoading(true); setError('');
    try {
      // ★ 현재 사이트 컨텍스트로 PnPjs 초기화 → 같은 사이트 리스트 접근
      const sp = spfi().using(SPFx(context));
      const results: IProject[] = await sp.web.lists
        .getByTitle(listName)                            // ← 리스트 이름으로 참조
        .items
        .select('Id','Title','Owner','PStatus','Progress','DueDate','Notes')
        .top(500)();
      setItems(results);
    } catch (e) {
      setError(`리스트 "${listName}" 를 불러오지 못했습니다. 이름/권한을 확인하세요.`);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [listName, context]);

  useEffect(() => { void fetchItems(); }, [fetchItems]);

  if (!listName) return <p className={styles.hint}>속성창에서 리스트 이름을 입력하세요.</p>;
  if (loading)   return <p className={styles.hint}>불러오는 중…</p>;
  if (error)     return <p className={styles.error}>{error}</p>;

  // 집계
  const total = items.length;
  const completed = items.filter(i => i.PStatus === 'Completed').length;
  const inProgress = items.filter(i => i.PStatus === 'In Progress').length;
  const atRisk = items.filter(i => i.PStatus === 'At Risk').length;
  const avgProgress = total ? Math.round(items.reduce((s,i)=>s+(Number(i.Progress)||0),0)/total) : 0;

  return (
    <div className={styles.projectDashboard}>
      <h2 className={styles.title}>프로젝트 현황 · {listName} ({total})</h2>
      <div className={styles.cards}>
        <div className={styles.card}><div>진행 중</div><div>{inProgress}</div></div>
        <div className={styles.card}><div>위험</div><div>{atRisk}</div></div>
        <div className={styles.card}><div>완료</div><div>{completed}</div></div>
        <div className={styles.card}><div>평균 진행률</div><div>{avgProgress}%</div></div>
      </div>
      <table className={styles.table}>
        <thead><tr><th>프로젝트</th><th>담당자</th><th>상태</th><th>진행률</th><th>마감일</th></tr></thead>
        <tbody>
          {items.map(it => (
            <tr key={it.Id}>
              <td>{it.Title}</td><td>{it.Owner}</td><td>{it.PStatus}</td>
              <td>{Number(it.Progress)||0}%</td><td>{it.DueDate ? it.DueDate.substring(0,10) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectDashboard;
```

<div class="info-box note" markdown="1">

**동작 원리** — `spfi().using(SPFx(context))` 한 줄이 핵심입니다. `context`(웹 파트 컨텍스트)에는 **현재 사이트 URL과 로그인 사용자 토큰**이 들어 있어, PnPjs가 별도 인증 없이 **그 사용자 권한으로 현재 사이트의 리스트**를 읽습니다. `getByTitle(listName)` 은 **표시 이름**으로 리스트를 찾고, `select(...)` 의 필드는 컬럼의 **내부 이름**을 씁니다.
</div>

### 2-4. 데이터 연결의 핵심 개념 — 알아야 할 것들
코드로 넘어가기 전에, SPFx가 데이터에 접근하는 원리를 이루는 4가지 개념을 정리합니다. 이걸 알면 "왜 인증 코드가 없는지", "어디까지 접근되는지"가 이해됩니다.

**① 컨텍스트(context) — 모든 데이터 접근의 출발점**
웹 파트가 실행될 때 SPFx가 넘겨주는 `this.context` 객체에는 **현재 사이트 정보 + 로그인 사용자 신원**이 담겨 있습니다. 데이터 호출 도구(PnPjs·SPHttpClient·Graph)는 전부 이 `context`를 받아 동작합니다.
- `context.pageContext.web.absoluteUrl` — 현재 **사이트 URL** (예: `.../sites/ProjectHub`)
- `context.pageContext.user` — 현재 **로그인 사용자**
- `context.spHttpClient` / `context.msGraphClientFactory` — 인증이 내장된 호출 클라이언트

**② 사이트(Site)와 웹(Web) — "어디의" 데이터인가**
SharePoint 데이터는 **사이트(정확히는 web) 단위**로 격리됩니다. `sp.web.lists.getByTitle(...)` 은 "**현재 사이트의**" 리스트를 의미합니다. 다른 사이트의 리스트를 읽으려면 그 사이트를 명시하거나(PnPjs의 `Web(url)`), M365 전역을 다루는 **Graph**로 사이트 ID를 지정해야 합니다.

```typescript
// 현재 사이트 (기본)
await sp.web.lists.getByTitle("Project Status").items();

// 다른 사이트를 명시적으로 지정 (PnPjs)
import { Web } from "@pnp/sp/webs";
const otherWeb = Web([sp.web, "https://<tenant>.sharepoint.com/sites/OtherSite"]);
await otherWeb.lists.getByTitle("Tasks").items();
```

**③ 자동 SSO — 인증 코드가 없는 이유**
웹 파트는 **이미 로그인한 사용자의 브라우저 세션** 안에서 실행됩니다. 그래서 토큰을 직접 발급·저장할 필요 없이, 프레임워크가 각 호출에 사용자 토큰을 자동으로 붙입니다. → 로그인 화면·동의 팝업 없이 **그 사용자의 권한 범위**에서 데이터가 읽힙니다. (사용자가 못 보는 리스트는 코드로도 못 봅니다 — 권한은 사용자에 종속)

**④ 권한 경계 — "같은 사이트"는 승인 불필요, "울타리 밖"은 관리자 승인**
현재 사이트의 SharePoint 데이터(REST/PnPjs)는 사용자 권한만으로 접근되어 **추가 승인이 없습니다.** 반면 **Microsoft Graph**나 **외부 AAD API**는 조직 차원의 권한이라, `package-solution.json`에 권한을 선언하고 **테넌트 관리자가 승인**해야 비로소 호출됩니다(3-4 참고).

<div class="info-box note" markdown="1">

**한 줄 정리** — SPFx의 데이터 접근은 "**현재 사이트 + 현재 사용자**"가 기본값입니다. `context`가 그 두 가지를 실어 나르고, 자동 SSO가 인증을 처리하며, 그 울타리를 벗어날 때(다른 사이트·M365 전역·외부 API)만 방법과 승인이 달라집니다.
</div>

### 2-5. 다른 데이터는 어떻게? — 3가지 방법 비교
"같은 사이트 리스트"가 아니라 다른 데이터가 필요하면 방법이 갈립니다.

| 데이터 위치 | 방법 | 코드 진입점 | 관리자 승인 |
|-------------|------|-------------|-------------|
| **같은 사이트 리스트** (이 예제) | **PnPjs** | `spfi().using(SPFx(context))` | 불필요 |
| 같은 사이트, 라이브러리 없이 | SPHttpClient (SPFx 내장) | `context.spHttpClient.get(...)` | 불필요 |
| **다른 사이트·Teams·사용자·메일** 등 M365 | **Microsoft Graph** | `context.msGraphClientFactory.getClient('3')` | **필요** |
| 외부 시스템/커스텀 백엔드 | HttpClient / AAD-secured API | `context.aadHttpClientFactory` | 경우에 따라 |

**① SPHttpClient — 라이브러리 없이 같은 사이트 REST 직접 호출**
```typescript
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

const url = `${context.pageContext.web.absoluteUrl}`
  + `/_api/web/lists/getbytitle('Project Status')/items`
  + `?$select=Title,Owner,PStatus,Progress&$top=500`;
const res: SPHttpClientResponse = await context.spHttpClient.get(url, SPHttpClient.configurations.v1);
const json = await res.json();
const items = json.value;   // 리스트 아이템 배열
```

**② Microsoft Graph — 다른 사이트/Teams/사용자 등 M365 전반**
```typescript
import { MSGraphClientV3 } from '@microsoft/sp-http';

const client: MSGraphClientV3 = await context.msGraphClientFactory.getClient('3');
// 예: 다른 사이트의 리스트 아이템
const result = await client.api('/sites/{site-id}/lists/{list-id}/items').expand('fields').get();
// 예: 내 프로필 / 내 최근 파일 / 팀 멤버 등도 동일 패턴
```
> Graph를 쓰려면 `config/package-solution.json` 의 `webApiPermissionRequests` 에 권한을 선언하고, 테넌트 관리자가 **SharePoint 관리센터 → 고급 → API 액세스**에서 승인해야 합니다.

**③ 외부 AAD-secured API**
```typescript
const client = await context.aadHttpClientFactory.getClient('<AAD-App-Client-Id>');
const res = await client.get('https://api.contoso.com/orders', AadHttpClient.configurations.v1);
```

> 정리: **같은 사이트 리스트면 PnPjs가 가장 간결**하고 승인도 필요 없습니다. 사이트 울타리를 벗어나는 순간 **Graph**(+관리자 승인)로 갑니다.

### 2-6. 로컬 미리보기 → 빌드 → 패키징
```bash
npm run start                       # 호스팅형 workbench.aspx 에서 미리보기
npm run build                       # 프로덕션 빌드 + 패키징
# → sharepoint/solution/project-dashboard.sppkg 생성
```

<div class="info-box warning" markdown="1">

**로컬 Workbench에서는 리스트가 안 읽힙니다.** `localhost` Workbench 페이지는 SharePoint 사이트가 아니라 사용자 컨텍스트가 주입되지 않기 때문입니다. **리스트 조회 테스트는 반드시 호스팅형** `https://<tenant>.sharepoint.com/sites/<site>/_layouts/15/workbench.aspx` 에서 하세요.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-02.png' | relative_url }}" alt="Workbench에서 대시보드 웹 파트">
  <figcaption>호스팅형 Workbench에서 project-dashboard 웹 파트를 추가한 모습 — 도구 상자에 웹 파트가 나타나고, 리스트(Project Status) 데이터가 실제로 렌더링됩니다.</figcaption>
</figure>

---

## 3. 단계 C — App Catalog에 등록·배포 (상세)

`.sppkg` 는 웹 파트를 담은 **배포 패키지**입니다. 이것을 테넌트의 **App Catalog**(앱 카탈로그)에 올려야 사이트에서 쓸 수 있습니다.

<div class="info-box note" markdown="1">

**이 실습의 UI 기준 — 신규 "Manage apps" 페이지** — App Catalog 사이트(`/sites/appcatalog`)에 들어가면 상단에 *"A newer version of this page is now available. Try the new Manage Apps page"* 안내 배너가 뜹니다. 이번 실습은 그 **신규 Manage Apps UI**(`_layouts/15/tenantAppCatalog.aspx/manageApps`) 기준으로 진행했습니다. 클래식 라이브러리(`Apps for SharePoint`)에서도 동일하게 업로드할 수 있으며, 그 화면도 아래에 함께 표시합니다.
</div>

### 3-1. .sppkg 빌드
먼저 배포할 패키지를 프로덕션 빌드합니다.
```bash
cd project-dashboard
npm run build        # = heft test --production && heft package-solution --production
# 결과물: sharepoint/solution/project-dashboard.sppkg
```

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-02b-build.png' | relative_url }}" alt="npm run build 실행">
  <figcaption>npm run build 로 프로덕션 패키지(.sppkg) 생성</figcaption>
</figure>

### 3-2. App Catalog 접속 & .sppkg 업로드
1. `https://<tenant>.sharepoint.com/sites/appcatalog` 접속.
2. 상단 배너의 **"Try the new Manage Apps page"** 로 신규 UI 진입(또는 좌측 **Apps for SharePoint**).
3. **Upload** 클릭 또는 `sharepoint/solution/project-dashboard.sppkg` 를 **드래그**해 업로드.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-03a-manageapps.png' | relative_url }}" alt="신규 Manage apps 페이지">
  <figcaption>신규 <strong>Manage apps</strong> 페이지 — Upload 버튼과 Apps for SharePoint 목록</figcaption>
</figure>

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-03b-upload.png' | relative_url }}" alt=".sppkg 드래그 업로드">
  <figcaption>탐색기에서 project-dashboard.sppkg 를 라이브러리로 드래그해 업로드</figcaption>
</figure>

### 3-3. 앱 사용 설정(Enable) & 배포
업로드가 끝나면 **"Enable app"** 패널이 뜹니다.
- **"This app gets data from: SharePoint"** — 이 앱이 접근하는 데이터 출처를 표시(PnPjs로 같은 사이트 리스트만 읽으므로 SharePoint).
- **개발자/게시자를 신뢰할 때만** 사용 설정하라는 안내.
- **[Enable app]** 클릭.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-03c-enable.png' | relative_url }}" alt="Enable app 패널">
  <figcaption>Enable app — 데이터 출처(SharePoint) 확인 후 [Enable app] 클릭</figcaption>
</figure>

사용 설정이 완료되면 목록에서 앱의 **State 가 "Enabled"**(초록 체크)로 바뀝니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-03.png' | relative_url }}" alt="배포 완료된 앱">
  <figcaption>project-dashboard-client-side-solution 이 <strong>Enabled</strong> 상태로 등록됨 (App version 1.0.0.0)</figcaption>
</figure>

<div class="info-box note" markdown="1">

**"Added to all sites" 열** — 신규 UI에서 앱을 사용 설정할 때 "모든 사이트에 자동 추가" 옵션 지원 여부는 솔루션 설정(`skipFeatureDeployment`)에 따라 다릅니다. 이 예제는 각 사이트에서 개별로 앱을 추가하는 방식(열 값 `Not applicable`)입니다. 조직 전체 자동 배포가 필요하면 `package-solution.json`의 배포 옵션을 조정하세요.
</div>

### 3-4. (Graph/외부 API를 쓴 경우만) API 액세스 승인
이 예제 웹 파트는 PnPjs로 같은 사이트만 읽으므로 **이 단계가 필요 없습니다.** 다만 Graph나 외부 AAD API를 선언한 솔루션이라면:
1. **SharePoint 관리센터 → 고급(Advanced) → API 액세스** (신규 Manage apps 좌측 **API access**).
2. 대기 중인 권한 요청을 선택 → **승인**.

<div class="info-box note" markdown="1">

**업데이트 배포** — 코드를 고쳐 새 버전을 배포하려면, `package-solution.json` 의 `version` 을 올려 다시 `npm run build` → 새 `.sppkg` 를 **같은 라이브러리에 덮어쓰기 업로드** → 배포하면 됩니다. (데이터만 바뀌는 경우엔 재배포가 필요 없습니다 — 4단계 참고)
</div>

<div class="info-box note" markdown="1">

**App Catalog가 아직 없다면 (최초 1회)** — **SharePoint 관리센터 → 더 보기(More features) → 앱(Apps)** 에서 **App Catalog 사이트를 생성**해야 합니다. 생성 후 몇 분 뒤 `https://<tenant>.sharepoint.com/sites/appcatalog` 가 만들어집니다.
</div>

---

## 4. 단계 D — 사이트 페이지에 웹 파트 추가

1. 대상 사이트 → **설정(⚙) → 앱 추가** → `project-dashboard` **추가**(조직 전체 배포를 선택했다면 이미 사용 가능).
2. 페이지 **편집** → 캔버스에서 **+**(웹 파트 추가) → `project-dashboard` 검색해 삽입.
3. 웹 파트 **연필(속성)** 클릭 → **리스트 이름**에 `Project Status` 입력.
4. **게시(Publish)**.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-04.png' | relative_url }}" alt="페이지에 추가된 대시보드">
  <figcaption>페이지에 게시된 프로젝트 현황 대시보드 — 요약 카드(진행 중·위험·완료·평균 진행률) + 상태 배지·진행률 바가 있는 상세 표. 리스트 데이터를 실시간으로 읽어 렌더링합니다.</figcaption>
</figure>

<div class="info-box note" markdown="1">

**데이터가 바뀌면 재배포해야 하나? 아니요.** 웹 파트(코드)와 리스트(데이터)는 분리돼 있습니다. 대시보드는 페이지가 열릴 때마다 리스트를 실시간 호출하므로 **새로고침만으로 최신값**이 반영됩니다. 재빌드·재배포는 **코드가 바뀔 때만** 필요합니다.
</div>

---

## 5. 대시보드 외에 — SPFx로 할 수 있는 것들

웹 파트(대시보드)는 SPFx의 한 유형일 뿐입니다. SPFx는 **Extension(확장)** 과 **ACE**로 SharePoint의 다른 영역까지 커스터마이즈할 수 있습니다. 아래는 각 유형이 실제로 어떤 화면을 만드는지 보여주는 데모입니다.

### 5-1. Application Customizer — 페이지 상단/하단 영역 주입
페이지의 **Top·Bottom placeholder**에 커스텀 UI를 렌더링합니다. 전사 공지 배너, 전역 푸터처럼 **모든 페이지에 공통으로** 나타나는 요소에 사용합니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-05-appcustomizer.png' | relative_url }}" alt="Application Customizer 데모">
  <figcaption>상단 공지 배너 + 하단 전역 푸터를 Application Customizer 로 주입한 예시</figcaption>
</figure>

### 5-2. Field Customizer — 리스트 컬럼 커스텀 렌더링
리스트의 **특정 컬럼 값**을 기본 텍스트 대신 색상 배지·진행률 바 등으로 렌더링합니다. (대시보드 웹 파트 없이) 리스트 화면 자체를 개선할 때 사용합니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-06-fieldcustomizer.png' | relative_url }}" alt="Field Customizer 데모">
  <figcaption>Status 컬럼 → 색상 배지, Progress 컬럼 → 진행률 바로 렌더링</figcaption>
</figure>

### 5-3. Command Set — 리스트 툴바 커스텀 명령
리스트 툴바에 **커스텀 명령 버튼**을 추가합니다. 선택한 항목에 대해 외부 시스템 연동, 승인 요청, 일괄 처리 등 사용자 지정 작업을 실행합니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-07-commandset.png' | relative_url }}" alt="Command Set 데모">
  <figcaption>"승인 요청 보내기" · "PDF로 내보내기" 커스텀 명령을 툴바에 추가</figcaption>
</figure>

### 5-4. Adaptive Card Extension (ACE) — Viva Connections 카드
**Viva Connections 대시보드**에 표시되는 카드입니다. 데스크톱·Teams·모바일에서 동일하게 동작하며, **Viva Connections는 SPFx가 유일한 확장 수단**입니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-08-ace.png' | relative_url }}" alt="Adaptive Card Extension 데모">
  <figcaption>내 프로젝트 현황 · 승인 대기 · 이번 주 마감 카드를 ACE로 구현</figcaption>
</figure>

<div class="info-box note" markdown="1">

**공통점** — 위 4가지와 웹 파트 모두 **동일한 SPFx 프로젝트 구조·빌드·App Catalog 배포 파이프라인**을 씁니다. `yo @microsoft/sharepoint` 스캐폴딩 시 컴포넌트 유형만 다르게 선택하면 됩니다(WebPart / Extension → Application Customizer·Field Customizer·Command Set / ACE). 즉 이 글의 대시보드를 만들 줄 알면 나머지도 같은 방식으로 확장할 수 있습니다.
</div>

### 5-5. 실전 참고 — 커뮤니티 SPFx 샘플

직접 만들기 전에, **Microsoft 365 PnP 커뮤니티**가 공개한 400개 이상의 검증된 SPFx 샘플을 참고하면 빠릅니다. 아래는 실무에서 자주 쓰이는 대표 샘플입니다(모두 오픈소스, 복제해서 바로 빌드 가능).

| 샘플 | 무엇을 하나 | 참고 기법 |
|------|-------------|-----------|
| [**Organization Chart**](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-organization-chart) | 특정 사용자 기준 조직도를 그리고 상하 탐색 | Graph로 조직 관계 조회 |
| [**Calendar**](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-calendar) | 리스트 기반 이벤트를 달력(월·주·년)으로 표시, 카테고리별 색상 + 권한 체크 | **리스트 CRUD**(이 글 대시보드의 확장형) |
| [**Images & Videos Carousel**](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-carousel) | 사진 라이브러리의 이미지·동영상을 캐러셀로 지연 로딩 | **Graph + PnPjs 병행**, lazy loading |
| [**Using PnPJS with Microsoft Graph**](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-graph-pnpjs) | PnPjs로 Microsoft Graph를 호출해 Entra 그룹 목록 표시 | **PnPjs + Graph** 연동 패턴 |
| [**Birthdays**](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-birthdays) | 테넌트 루트의 "Birthdays" 리스트를 읽어 다가오는 생일 표시 | 리스트 조회 + (옵션)Azure Function 동기화 |

<div class="info-box note" markdown="1">

**샘플 활용 팁**
- 전체 갤러리: **[SharePoint Framework 샘플](https://pnp.github.io/sp-dev-fx-webparts/)** (웹 파트) · **[확장 샘플](https://pnp.github.io/sp-dev-fx-extensions/)** (Extension/ACE)
- 각 샘플 README의 **호환성 배지**(SPFx 버전 · Node 버전)를 반드시 확인하세요. 예: Organization Chart는 SPFx 1.22.1 + Node 22 기준입니다. Node 버전이 맞지 않으면 빌드가 실패합니다(트러블슈팅 7-3 참고).
- 복제 후 `npm install` → `npm run start`(Workbench 미리보기) → `npm run build`(패키징) 흐름은 이 글과 동일합니다.
</div>

---

## 6. 재사용 — 다른 부서 사이트에도 달기

`.sppkg` 가 조직 전체로 배포돼 있으면, **코드 재작성 없이** 그 부서 사이트 소유자가 ①페이지에 웹 파트 삽입 → ②리스트 이름 지정 → ③게시만 하면 됩니다.

> ⚠️ 단, 그 사이트에도 **같은 구조의 리스트**(단계 A의 컬럼)가 있어야 데이터가 표시됩니다. 없으면 속성창에서 그 사이트의 실제 리스트 이름을 지정하세요.

---

## 7. 트러블슈팅 — 실제로 겪은 문제와 해결

개발 환경을 처음 세팅할 때 실제로 부딪힌 문제들입니다. 대부분 **환경 설정** 단계에서 발생합니다.

### 7-1. Workbench 도구 상자에 웹 파트가 나타나지 않음

**증상**
> "웹 파트가 도구 상자에 나타나지 않습니다. 웹 파트 프로젝트에서 'gulp serve' 또는 'heft start'가 실행되고 있는지 확인하세요."

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-ts-workbench-error.png' | relative_url }}" alt="웹 파트가 도구 상자에 나타나지 않음 경고">
  <figcaption>개발 서버가 꺼진 상태로 Workbench를 열면 나타나는 경고</figcaption>
</figure>

**원인** — 호스팅형 Workbench(`workbench.aspx`)는 **로컬 개발 서버가 localhost에서 웹 파트 매니페스트를 서빙**하고 있어야 도구 상자에 웹 파트를 띄웁니다. 개발 서버가 꺼져 있으면 이 에러가 납니다.

**해결** — 프로젝트 폴더에서 개발 서버를 켠 **다음** Workbench를 새로고침합니다.
```bash
npm run start        # = heft start (이 창을 켠 채로 유지)
```
서버가 `https://localhost:4321` 에서 뜨면, Workbench 페이지를 **새로고침** → **+ (웹 파트 추가)** 목록에 웹 파트가 나타납니다.

**"디버그 스크립트를 허용하시겠습니까?" 대화상자** — 개발 서버로 로컬 스크립트를 로드하면 아래 보안 대화상자가 뜹니다. 반드시 **"디버그 스크립트 로드"**(왼쪽)를 클릭해야 웹 파트가 도구 상자에 나타납니다. "로드 안 함"을 누르면 로컬 웹 파트가 로드되지 않습니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-02a-debugscript.png' | relative_url }}" alt="디버그 스크립트 허용 대화상자">
  <figcaption>호스팅형 Workbench에서 로컬 스크립트 로드 시 나타나는 보안 대화상자 — <strong>"디버그 스크립트 로드"</strong>를 선택</figcaption>
</figure>

### 7-2. gulp 명령이 동작하지 않음 (Heft 프로젝트)

**증상** — `gulp serve` / `gulp trust-dev-cert` 실행 시 명령을 찾을 수 없음.

**원인** — SPFx **v1.22부터 툴체인이 gulp → Heft(RushStack)로 전환**되었습니다. v1.22+ 프로젝트에는 `gulpfile.js`가 없고 gulp도 설치되지 않습니다. 인터넷의 옛 문서·블로그가 gulp 명령을 쓰기 때문에 혼동하기 쉽습니다.

**내 프로젝트가 어느 쪽인지 확인**: `package.json`의 `scripts`를 보면 됩니다.
- `heft start` / `heft build` → **Heft 기반** (v1.22+)
- `gulp serve` / `gulp bundle` → gulp 기반 (v1.21 이하)

**해결** — Heft 명령으로 대체합니다.

| 용도 | gulp (구방식) | Heft (v1.22+) |
|------|--------------|----------------|
| 개발 서버 | `gulp serve` | `npm run start` (= `heft start`) |
| 인증서 신뢰 | `gulp trust-dev-cert` | `npx heft trust-dev-cert` |
| 빌드 | `gulp bundle --ship` | `npm run build` |
| 패키징 | `gulp package-solution --ship` | `heft package-solution --production` |

### 7-3. Node 버전 불일치로 빌드/설치 실패

**증상** — `npm install` 또는 `heft` 실행이 이유 없이 실패.

**원인** — SPFx 각 버전은 **특정 Node LTS만 지원**합니다(예: v1.23은 Node 22). 시스템에 Node 24 등 상위 버전이 깔려 있으면 스캐폴딩·설치·빌드가 깨집니다.

**해결** — [nvm-windows](https://github.com/coreybutler/nvm-windows)로 지원 버전으로 전환합니다.
```powershell
# 관리자 권한 PowerShell 필요 (nvm이 C:\Program Files\nodejs 심볼릭 링크를 갱신)
nvm install 22.15.0
nvm use 22.15.0
node -v        # v22.15.0 확인
```
> nvm-windows는 버전 전환 시 관리자 권한이 필요합니다. 일반 창에서는 `nvm use`가 조용히 실패할 수 있습니다.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-ts-nvm.png' | relative_url }}" alt="nvm으로 Node 22 설치·전환">
  <figcaption>관리자 PowerShell에서 nvm install 22.15.0 → nvm use 22.15.0 → node -v 로 v22.15.0 확인</figcaption>
</figure>

### 7-4. `npm install` — ETARGET: 특정 패키지 버전을 찾을 수 없음

**증상**
> `npm error code ETARGET`
> `No matching version found for @jsonjoy.com/fs-core@4.64.0.`

**원인** — npm이 **사내 프록시/미러 레지스트리**를 바라보고 있고, 그 미러에 최신 버전(예: `4.64.0`)이 아직 동기화되지 않았습니다. 공식 npm 레지스트리에는 있는데 프록시에는 없어서 나는 에러입니다. (`npm config get registry`로 확인 — 공식은 `https://registry.npmjs.org/`)

**해결** — 이번 설치만 공식 레지스트리를 쓰게 합니다.
```powershell
# 락파일·모듈 정리 후 공식 레지스트리로 재설치
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
npm install --registry https://registry.npmjs.org/
```
프로젝트에 고정하려면 폴더에 `.npmrc` 파일을 만들고 `registry=https://registry.npmjs.org/` 한 줄을 넣습니다.

### 7-5. `npm install` — EPERM: 파일 잠금 (OneDrive)

**증상** — 설치 중 `EPERM: operation not permitted, rmdir ...` 로 `node_modules` 정리 실패.

**원인** — 프로젝트가 **OneDrive 동기화 폴더** 안에 있어, OneDrive가 파일을 잠근 사이 npm이 삭제·이동을 못 합니다.

**해결**
- OneDrive를 **일시 중지**(작업표시줄 OneDrive 아이콘 → 동기화 일시 중지) 후 재시도, 또는
- 프로젝트를 OneDrive 밖(예: `C:\dev\`)으로 옮겨 개발.

### 7-6. `heft`/`node` 실행 시 UNKNOWN read 에러 (OneDrive 클라우드 전용 파일)

**증상**
> `Error: UNKNOWN: unknown error, read` (`errno: -4094`, `syscall: 'read'`)
> `readFileSync` → `defaultLoadImpl` 스택으로 `npx heft ...` 실행이 즉시 죽음.

**원인** — `node_modules` 안의 일부 파일이 OneDrive에 의해 **"클라우드 전용(Offline placeholder)"** 상태로 바뀌어, 로컬에 실제 내용이 없습니다. Node가 그 파일을 `require`하며 읽는 순간 실패합니다. (`npm install` 직후 OneDrive가 수만 개의 모듈 파일을 백그라운드로 업로드하며 로컬 본체를 비우는 것이 원인)

**해결 (권장) — 프로젝트를 OneDrive 밖으로 이동**
```powershell
New-Item -ItemType Directory -Force -Path "C:\dev"
# node_modules 는 제외하고 복사(새 위치에서 새로 설치)
robocopy "<OneDrive경로>\project-dashboard" "C:\dev\project-dashboard" /E /XD node_modules
cd C:\dev\project-dashboard
npm install --registry https://registry.npmjs.org/
npx heft trust-dev-cert
npm run start
```

**해결 (OneDrive에서 계속할 경우)**
- 탐색기에서 프로젝트 폴더 우클릭 → **"항상 이 장치에 유지"** 선택(파일을 로컬에 고정), 그리고 개발 중 **OneDrive 동기화 일시 중지**.
```powershell
# node_modules 를 로컬에 강제 유지(pinned)로 표시
attrib +P /S /D node_modules\*.*
```

<div class="info-box warning" markdown="1">

**근본 권장** — SPFx 개발은 `node_modules`가 수만 개 파일이라 OneDrive 동기화 폴더와 궁합이 나쁩니다(mmap 실패, EPERM, placeholder read가 반복). 안정적인 개발을 위해 **프로젝트를 OneDrive 밖(`C:\dev\` 등)에 두는 것**을 권장합니다.
</div>

### 7-7. 빌드 시 `Cannot find module '@pnp/sp'` (PnPjs 미설치)

**증상**
> `(TS2307) Cannot find module '@pnp/sp' or its corresponding type declarations.`
> webpack: `Module not found: Error: Can't resolve '@pnp/sp'` (webs/lists/items도 동일)

**원인** — 데이터 호출에 쓰는 **PnPjs(`@pnp/sp`)가 설치되지 않았습니다.** Yeoman 스캐폴딩은 PnPjs를 자동으로 넣지 않으므로, 별도 설치가 필요합니다. 특히 `package.json`의 `dependencies`에 `@pnp/sp`가 없는데 코드에서 `import { spfi } from '@pnp/sp'` 를 쓰면 이 에러가 납니다.

**해결** — PnPjs를 설치합니다. `heft start`가 watch 모드로 돌고 있다면 설치 후 자동 재컴파일됩니다.
```bash
npm install @pnp/sp --save
# (사내 프록시로 막히면) npm install @pnp/sp --save --registry https://registry.npmjs.org/
```
설치 후 `Found 0 errors` + `webpack compiled successfully` 가 뜨면 정상입니다.

<div class="info-box note" markdown="1">

**팁** — `package.json`의 `dependencies`에 `@pnp/sp`가 들어 있는지 먼저 확인하세요. 팀원과 프로젝트를 공유할 때 이 의존성이 빠져 있으면 `npm install` 후에도 컴파일이 깨집니다. `--save`로 설치하면 `package.json`에 기록되어 재발을 막습니다.
</div>

---

## 참고 링크

- [첫 웹 파트 만들기 튜토리얼](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)
- [SharePoint 리스트에 연결](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/connect-to-sharepoint)
- [Microsoft Graph 사용(MSGraphClient)](https://learn.microsoft.com/sharepoint/dev/spfx/use-msgraph)
- [PnPjs 문서](https://pnp.github.io/pnpjs/)
- 이전 글 → [SharePoint Framework(SPFx) 개요와 아키텍처]({{ '/chapters/m365-1-spfx-overview/' | relative_url }})
