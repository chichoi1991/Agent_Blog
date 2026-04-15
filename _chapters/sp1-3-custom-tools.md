---
layout: chapter
title: "Part 3: 커스텀 도구 추가 (FRED MCP + ThinQ MCP)"
short_title: "3. 커스텀 도구"
description: "특별 워크샵 - FRED Economic MCP와 ThinQ MCP 커스텀 도구 추가"
order: 4
category: special
parent: "sp1"
---

## Part 3: 커스텀 도구 추가 (FRED MCP + ThinQ MCP)

> **이전 단계:** [Part 2: Pre-built 도구 추가]({{ '/chapters/sp1-2-prebuilt-tools/' | relative_url }}) | **처음으로:** [개요]({{ '/chapters/sp1-0-overview/' | relative_url }})

---

이번 파트에서는 Microsoft가 기본 제공하지 않는 **커스텀 MCP 서버** 2종을 에이전트에 추가합니다.

- **FRED Economic MCP** — 미국 연방준비제도(Federal Reserve) 경제 데이터
- **ThinQ MCP** — LG IoT 가전 제품 제어·조회

두 서버 모두 Azure Container Apps에 배포된 사설 MCP 서버이며, URL과 API Key를 직접 입력하여 연결합니다.

<br>

---

## 1. MCP 도구 추가 방법 (공통)

에이전트 개요 화면에서 **도구** 섹션 → **+ 도구 추가** 를 클릭합니다.

도구 추가 팝업에서 **MCP** 탭 → 하단의 **모델 컨텍스트 프로토콜(MCP)** 옵션을 선택합니다.

> **Pre-built vs Custom:** Part 2에서 추가한 Work IQ 도구는 카탈로그에서 선택했지만, 커스텀 MCP는 **URL과 인증 정보를 직접 입력**합니다.

<br>

---

## 2. FRED Economic MCP 서버 연결

### 2-1. FRED MCP 소개

**FRED (Federal Reserve Economic Data)** 는 미국 세인트루이스 연방준비은행이 제공하는 81만개 이상의 경제 시계열 데이터베이스입니다. 이 MCP 서버를 통해 에이전트가 실시간 경제지표를 조회하고 분석할 수 있습니다.

| 항목 | 내용 |
|------|------|
| **데이터 소스** | [FRED (Federal Reserve Economic Data)](https://fred.stlouisfed.org/) |
| **시리즈 수** | 81만+ 경제 시계열 |
| **제공 도구** | 5개 테마 도구 + 1개 검색 도구 |
| **전송 방식** | Streamable HTTP |
| **배포 환경** | Azure Container Apps (Korea Central) |

### 2-2. 서버 URL 및 인증 정보 입력

아래 정보를 정확히 입력합니다:

| 항목 | 값 |
|------|-----|
| **서버 이름** | `FRED_Economic_MCP` |
| **서버 설명** | `미국 연방준비제도(FRED) 경제 데이터를 조회하는 MCP 서버입니다. 소비 수요, 원자재·환율, 거시경제, 산업 생산, EV·에너지 시장 등 5개 테마별 경제지표를 제공하고, 키워드로 81만개 이상의 시계열을 검색할 수 있습니다.` |
| **서버 URL** | `https://fred-mcp-python.purplehill-ba85d6d0.koreacentral.azurecontainerapps.io/mcp` |
| **인증** | `API 키` |
| **인증 유형** | `헤더` |
| **헤더 이름** | `x-fred-api-key` |
| **API 키 값** | `1fabe49779bd82ea8a3084354a89c038` |

입력이 완료되면 **만들기** 를 클릭합니다.

> **서버 설명이 중요한 이유:** Copilot Studio의 생성 AI 오케스트레이터는 서버 설명을 참고하여 언제 이 도구를 호출할지 판단합니다. 설명이 충분히 구체적이어야 에이전트가 올바르게 동작합니다.

### 2-3. 도구 목록 확인

연결 성공 시 아래 6개 도구가 표시됩니다:

| 도구명 | 설명 | 주요 시리즈 |
|--------|------|------------|
| `get-consumer-demand` | 소비 수요 지표 | PCEDG(내구재 소비), UMCSENT(소비자심리), HOUST(주택착공), HSN1F(주택판매), TOTALSA(자동차판매) |
| `get-cost-pressure` | 원가/마진 압박 지표 | DEXKOUS(원/달러 환율), DCOILWTICO(WTI 유가), WPUSI019011(구리 PPI), WPU101(철강 PPI), PCU325211325211(합성수지 PPI) |
| `get-macro-environment` | 거시경제 환경 | GDPC1(실질 GDP), CPIAUCSL(CPI), CUSR0000SAD(내구재 CPI), FEDFUNDS(연방기금금리), UNRATE(실업률), DGS10(10년 국채), DGS2(2년 국채) |
| `get-industry-production` | 산업/제조 동향 | INDPRO(산업생산지수), DGORDER(내구재 주문), AMTMNO(제조업 주문), IPMAN(제조업 생산) |
| `get-ev-energy-market` | EV/에너지 시장 | TOTALSA(자동차판매), AISRSA(재고비율), DCOILWTICO(유가), GASREGW(휘발유가), IPG3361T3S(자동차생산) |
| `search-fred-series` | FRED 시리즈 검색 | 키워드로 81만+ 시계열 탐색 |

### 2-4. 도구 파라미터

모든 테마 도구(`get-*`)는 동일한 파라미터를 사용합니다:

| 파라미터 | 타입 | 기본값 | 설명 |
|----------|------|--------|------|
| `indicator` | string (선택) | 전체 조회 | 특정 시리즈 ID만 조회 (예: `FEDFUNDS`) |
| `period` | enum | `1y` | 조회 기간: `6m`, `1y`, `3y`, `5y` |
| `units` | enum | `lin` | 데이터 변환: `lin`(원본), `chg`(변화량), `pch`(변화율%), `pc1`(전년대비%), `pca`(연율화), `log`(자연로그) |

`search-fred-series` 도구의 파라미터:

| 파라미터 | 타입 | 기본값 | 설명 |
|----------|------|--------|------|
| `query` | string (필수) | — | 검색 키워드 (예: `semiconductor production`) |
| `limit` | integer | `10` | 검색 결과 수 (1~50) |

> **실습 테스트:** 에이전트 테스트 창에서 "미국 실업률 최근 3년 추이를 보여줘"라고 입력하면 `get-macro-environment(indicator="UNRATE", period="3y")` 가 호출되어야 합니다.

<br>

---

## 3. ThinQ MCP 서버 연결

### 3-1. ThinQ MCP 소개

**ThinQ MCP** 는 LG ThinQ 플랫폼에 등록된 IoT 가전 제품을 조회·제어하는 MCP 서버입니다.

| 항목 | 내용 |
|------|------|
| **대상 기기** | 에어컨, 세탁기, 냉장고, 공기청정기, 건조기 등 |
| **제공 기능** | 디바이스 조회, 상태 확인, 제어 명령, 에너지 사용량 조회 |
| **전송 방식** | Streamable HTTP |
| **배포 환경** | Azure Container Apps (Korea Central) |

### 3-2. 서버 URL 및 인증 정보 입력

**+ 도구 추가** → **MCP** → **모델 컨텍스트 프로토콜(MCP)** 를 다시 선택하고, 아래 정보를 입력합니다:

| 항목 | 값 |
|------|-----|
| **서버 이름** | `ThinQ_MCP` |
| **서버 설명** | `LG ThinQ IoT 플랫폼의 스마트 가전 제품을 조회하고 제어하는 MCP 서버입니다. 에어컨, 세탁기, 냉장고 등의 상태 확인, 제어 명령 실행, 에너지 사용량 조회 기능을 제공합니다.` |
| **서버 URL** | `https://thinqmcp-http-typescript.kindmoss-12649bc0.koreacentral.azurecontainerapps.io/mcp` |
| **인증** | `API 키` |
| **인증 유형** | `헤더` |
| **헤더 이름** | `x-pat-token` |
| **API 키 값** | `thinqpat_60c3ea2d060b6bfe8978cc946b12d52cb69adbdab51e788d53a3` |

입력이 완료되면 **만들기** 를 클릭합니다.

### 3-3. 도구 목록 확인

연결 성공 시 아래 도구들이 표시됩니다:

| 도구명 | 설명 |
|--------|------|
| `getDevices` | 등록된 전체 디바이스 목록 조회 |
| `getDeviceStatus` | 특정 디바이스의 현재 상태 조회 (운전모드, 온도, 동작여부 등) |
| `controlDevice` | 디바이스 제어 명령 실행 (에어컨 온도 변경, 세탁기 시작 등) |
| `getEnergyUsage` | 기기별 에너지 사용량 조회 |

### 3-4. 도구 파라미터

`getDeviceStatus` / `controlDevice` / `getEnergyUsage`:

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `deviceId` | string (필수) | 디바이스 고유 ID (`getDevices`로 조회) |

`controlDevice` 추가 파라미터:

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `command` | string (필수) | 제어 명령 (예: `setTemperature`, `start`, `stop`) |
| `value` | string/number | 명령에 따른 값 (예: 온도 `24`) |

> **실습 테스트:** "등록된 가전 제품 목록을 보여줘"라고 입력하면 `getDevices`가 호출됩니다.

<br>

---

## 4. 전체 도구 확인

모든 도구 추가가 완료되면, 에이전트의 **도구** 섹션에서 아래와 같이 확인할 수 있어야 합니다:

| 도구 그룹 | 도구 수 | 유형 |
|-----------|---------|------|
| Work IQ Mail MCP | 4~5개 | Pre-built |
| Work IQ Teams MCP | 3~4개 | Pre-built |
| Work IQ Copilot MCP | 1~2개 | Pre-built |
| FRED Economic MCP | 6개 | Custom |
| ThinQ MCP | 4개 | Custom |

<br>

---

## 5. 통합 테스트

### 5-1. 단일 도구 테스트

에이전트 테스트 채팅에서 각 도구가 정상 동작하는지 확인합니다:

| 테스트 질문 | 기대 호출 도구 |
|------------|---------------|
| "미국 실업률 추이를 보여줘" | FRED `get-macro-environment` |
| "원/달러 환율 최근 6개월 데이터" | FRED `get-cost-pressure` |
| "등록된 가전 목록 보여줘" | ThinQ `getDevices` |
| "최근 받은 메일 정리해줘" | Work IQ Mail |
| "반도체 관련 경제지표를 검색해줘" | FRED `search-fred-series` |

### 5-2. 복합 시나리오 테스트

지침에 정의한 시나리오가 올바르게 동작하는지 확인합니다:

| 테스트 질문 | 기대 동작 |
|------------|-----------|
| "북미 시장 전략을 검토해줘" | SharePoint 검색 → FRED 조회 → 갭 분석 → Teams 어댑티브 카드 |
| "원자재 가격 변동에 따른 가격 정책을 재검토해줘" | SharePoint 검색 → FRED 원가지표 → 마진 분석 → Teams 알림 |
| "최근 보고 메일을 정리하고 시장 상황과 비교해줘" | Mail 조회 → FRED 검증 → 리스크 분석 → Teams 알림 |
| "신규 시장 진출에 대한 판단 의견 메일을 작성해줘" | FRED + SharePoint → 판단 메일 draft → Teams 알림 |

<br>

---

## ✅ Part 3 완료 체크리스트

- [ ] FRED Economic MCP가 연결되고 6개 도구가 활성화되었는가?
- [ ] ThinQ MCP가 연결되고 4개 도구가 활성화되었는가?
- [ ] 단일 도구 테스트가 모두 통과하는가?
- [ ] 복합 시나리오 테스트에서 여러 도구가 순차적으로 호출되는가?
- [ ] Teams 어댑티브 카드 알림이 정상 발송되는가?

<br>

---

## 🎉 워크샵 완료!

축하합니다! 내부 비즈니스 데이터와 외부 경제지표를 조합하여 CEO의 의사결정을 보조하는 에이전트가 완성되었습니다.

### 핵심 학습 포인트 정리

| 학습 포인트 | 내용 |
|------------|------|
| **지침 기반 오케스트레이션** | 토픽·플로우 없이 지침만으로 도구 호출 순서를 제어 |
| **도구 우선순위** | 지침에서 1순위(내부) → 2순위(Copilot) 순서를 명시하여 불필요한 호출 방지 |
| **복합 시나리오** | 여러 도구를 단계별로 조합하는 Multi-step 워크플로우를 지침으로 정의 |
| **안전 가드레일** | 제어 명령에 사용자 확인 필수 원칙을 지침에 포함 |
| **어댑티브 카드** | 모든 분석 결과를 Teams 알림으로 발송하여 CEO가 즉시 확인 |

### 다음 단계 제안

- SharePoint에 실제 전략 문서를 업로드하여 교차 분석 품질 향상
- FRED MCP에 추가 테마(예: Housing Market) 확장
- ThinQ MCP에 에너지 절감 자동화 로직 추가
- Teams 채널에 에이전트를 게시하여 경영진 전체 배포
