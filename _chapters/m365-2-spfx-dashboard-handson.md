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

| 준비물 | 버전/명령 | 검증 |
|--------|-----------|------|
| Node.js | **LTS v22** (SPFx 1.23.2는 Node 22만 지원) | `node -v` → v22.x |
| Yeoman + SPFx Generator | `npm i -g yo @microsoft/generator-sharepoint` | `yo --version` |
| VS Code | 권장 에디터 | — |
| SharePoint | 사이트 생성/관리 권한 + App Catalog 접근(관리자) | — |

<div class="info-box warning" markdown="1">

**Node 버전이 가장 흔한 함정입니다.** SPFx 1.23.2는 **Node 22 LTS**만 지원합니다. Node 24 등 상위 버전에서는 스캐폴딩·빌드가 실패할 수 있으니, [nvm-windows](https://github.com/coreybutler/nvm-windows) 같은 도구로 **22 LTS로 맞춰** 두세요.
</div>

---

## 1. 단계 A — SharePoint 사이트에서 리스트 직접 만들기

프로비저닝 스크립트 대신, **SharePoint UI에서 직접** 리스트를 만듭니다. 실무에서 가장 익숙한 방식입니다.

### 1-1. 리스트 생성
1. 대상 사이트 → **설정(⚙) → 앱 추가 → 목록(List)** 또는 **+ 새로 만들기 → 목록**.
2. **빈 목록**을 선택하고 이름을 `Project Status` 로 지정 → 만들기.

### 1-2. 컬럼 추가
기본 `Title` 컬럼(프로젝트명)에 더해, **+ 열 추가**로 아래 5개를 만듭니다. **내부 이름(고정)** 이 코드와 일치해야 하므로 표의 이름을 그대로 사용하세요.

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

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-01.png' | relative_url }}" alt="Project Status 리스트">
  <figcaption>SharePoint UI로 만든 Project Status 리스트 (캡처 예정)</figcaption>
</figure>

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

### 2-4. 다른 데이터는 어떻게? — 3가지 방법 비교
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

### 2-5. 로컬 미리보기 → 빌드 → 패키징
```bash
npm run start                       # 호스팅형 workbench.aspx 에서 미리보기
npm run build                       # 프로덕션 빌드 + 패키징
# → sharepoint/solution/project-dashboard.sppkg 생성
```

<div class="info-box warning" markdown="1">

**로컬 Workbench에서는 리스트가 안 읽힙니다.** `localhost` Workbench 페이지는 SharePoint 사이트가 아니라 사용자 컨텍스트가 주입되지 않기 때문입니다. **리스트 조회 테스트는 반드시 호스팅형** `https://<tenant>.sharepoint.com/sites/<site>/_layouts/15/workbench.aspx` 에서 하세요.
</div>

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-02.png' | relative_url }}" alt="대시보드 웹 파트 미리보기">
  <figcaption>호스팅형 Workbench에서 대시보드 미리보기 (캡처 예정)</figcaption>
</figure>

---

## 3. 단계 C — App Catalog에 등록·배포 (상세)

`.sppkg` 는 웹 파트를 담은 **배포 패키지**입니다. 이것을 테넌트의 **App Catalog**(앱 카탈로그)에 올려야 사이트에서 쓸 수 있습니다.

### 3-1. App Catalog가 없다면 먼저 생성 (관리자, 최초 1회)
테넌트에 App Catalog가 아직 없을 수 있습니다.
1. **SharePoint 관리센터**(`https://<tenant>-admin.sharepoint.com`) 접속.
2. 좌측 **더 보기(More features) → 앱(Apps) → 열기**.
3. **App Catalog** 링크가 없으면 안내에 따라 **새 앱 카탈로그 사이트 생성**을 선택. 몇 분 뒤 `https://<tenant>.sharepoint.com/sites/appcatalog` 가 만들어집니다.

### 3-2. .sppkg 업로드
1. `https://<tenant>.sharepoint.com/sites/appcatalog` 접속.
2. 좌측 **Apps for SharePoint**(SharePoint용 앱) 라이브러리 열기.
3. `sharepoint/solution/project-dashboard.sppkg` 를 라이브러리에 **드래그해 업로드**.

### 3-3. 배포 범위 선택
업로드하면 신뢰 대화상자가 뜹니다.
- **"이 솔루션을 조직의 모든 사이트에서 사용할 수 있도록…"** 체크 → 모든 사이트에서 앱 추가 없이 사용 가능.
- 체크하지 않으면 사이트별로 개별 추가해야 합니다.
- **배포(Deploy)** 클릭.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-03.png' | relative_url }}" alt="App Catalog 업로드·배포">
  <figcaption>App Catalog에 .sppkg 업로드 후 배포 대화상자 (캡처 예정)</figcaption>
</figure>

### 3-4. (Graph/외부 API를 쓴 경우만) API 액세스 승인
이 예제 웹 파트는 PnPjs로 같은 사이트만 읽으므로 **이 단계가 필요 없습니다.** 다만 Graph나 외부 AAD API를 선언한 솔루션이라면:
1. **SharePoint 관리센터 → 고급(Advanced) → API 액세스**.
2. 대기 중인 권한 요청을 선택 → **승인**.

<div class="info-box note" markdown="1">

**업데이트 배포** — 코드를 고쳐 새 버전을 배포하려면, `package-solution.json` 의 `version` 을 올려 다시 `npm run build` → 새 `.sppkg` 를 **같은 라이브러리에 덮어쓰기 업로드** → 배포하면 됩니다. (데이터만 바뀌는 경우엔 재배포가 필요 없습니다 — 4단계 참고)
</div>

---

## 4. 단계 D — 사이트 페이지에 웹 파트 추가

1. 대상 사이트 → **설정(⚙) → 앱 추가** → `project-dashboard` **추가**(조직 전체 배포를 선택했다면 이미 사용 가능).
2. 페이지 **편집** → 캔버스에서 **+**(웹 파트 추가) → `project-dashboard` 검색해 삽입.
3. 웹 파트 **연필(속성)** 클릭 → **리스트 이름**에 `Project Status` 입력.
4. **게시(Publish)**.

<figure class="screenshot">
  <img src="{{ '/assets/image/m365/m365-2-04.png' | relative_url }}" alt="페이지에 추가된 대시보드">
  <figcaption>페이지에 게시된 프로젝트 현황 대시보드 (캡처 예정)</figcaption>
</figure>

<div class="info-box note" markdown="1">

**데이터가 바뀌면 재배포해야 하나? 아니요.** 웹 파트(코드)와 리스트(데이터)는 분리돼 있습니다. 대시보드는 페이지가 열릴 때마다 리스트를 실시간 호출하므로 **새로고침만으로 최신값**이 반영됩니다. 재빌드·재배포는 **코드가 바뀔 때만** 필요합니다.
</div>

---

## 5. 재사용 — 다른 부서 사이트에도 달기

`.sppkg` 가 조직 전체로 배포돼 있으면, **코드 재작성 없이** 그 부서 사이트 소유자가 ①페이지에 웹 파트 삽입 → ②리스트 이름 지정 → ③게시만 하면 됩니다.

> ⚠️ 단, 그 사이트에도 **같은 구조의 리스트**(단계 A의 컬럼)가 있어야 데이터가 표시됩니다. 없으면 속성창에서 그 사이트의 실제 리스트 이름을 지정하세요.

---

## 참고 링크

- [첫 웹 파트 만들기 튜토리얼](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)
- [SharePoint 리스트에 연결](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/connect-to-sharepoint)
- [Microsoft Graph 사용(MSGraphClient)](https://learn.microsoft.com/sharepoint/dev/spfx/use-msgraph)
- [PnPjs 문서](https://pnp.github.io/pnpjs/)
- 이전 글 → [SharePoint Framework(SPFx) 개요와 아키텍처]({{ '/chapters/m365-1-spfx-overview/' | relative_url }})
