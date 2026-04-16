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

### 5-1. 단일 도구 테스트 — 기본 동작 확인

에이전트 테스트 채팅에서 각 도구가 정상 호출되는지 **간단한 프롬프트**부터 확인합니다:

**FRED 거시경제 (get-macro-environment):**

| # | 테스트 질문 | 기대 파라미터 |
|---|------------|--------------|
| 1 | "미국 실업률 추이를 보여줘" | `indicator=UNRATE, period=1y` |
| 2 | "CPI 3년 추이를 전년대비 변화율로 보여줘" | `indicator=CPIAUCSL, period=3y, units=pc1` |
| 3 | "연방기금금리 5년 데이터를 원본 수치로 조회해줘" | `indicator=FEDFUNDS, period=5y, units=lin` |
| 4 | "10년물과 2년물 국채금리를 비교해서 장단기 금리 역전 여부를 확인해줘" | `indicator` 없이 전체 조회 → DGS10, DGS2 비교 |
| 5 | "내구재 CPI(CUSR0000SAD) 3년 추이를 보여줘. 모니터·디스플레이 제품 가격이 오르고 있는지 분석해줘" | `indicator=CUSR0000SAD, period=3y` |

**FRED 소비 수요 (get-consumer-demand):**

| # | 테스트 질문 | 기대 파라미터 |
|---|------------|--------------|
| 6 | "미국 내구재 소비지출 최근 1년 데이터를 보여줘" | `indicator=PCEDG, period=1y` |
| 7 | "소비자심리지수 3년 추이를 전년대비 변화율로 보여줘" | `indicator=UMCSENT, period=3y, units=pc1` |
| 8 | "신규주택착공건수가 늘고 있어? 최근 6개월 데이터로 알려줘" | `indicator=HOUST, period=6m` |
| 9 | "미국 자동차 총판매량 전년대비 변화율을 보여줘" | `indicator=TOTALSA, units=pc1` |

**FRED 원가 압박 (get-cost-pressure):**

| # | 테스트 질문 | 기대 파라미터 |
|---|------------|--------------|
| 10 | "원/달러 환율 최근 6개월 추이를 알려줘" | `indicator=DEXKOUS, period=6m` |
| 11 | "WTI 원유 가격이 최근 어떻게 움직이고 있어?" | `indicator=DCOILWTICO` |
| 12 | "구리 PPI와 철강 PPI를 비교해서 보여줘" | `indicator` 없이 전체 조회 |
| 13 | "합성수지 PPI 추이를 보여줘. 모니터 하우징·플라스틱 부품 원가가 어떻게 변하고 있는지 분석해줘" | `indicator=PCU325211325211` |

**FRED 산업/제조 (get-industry-production):**

| # | 테스트 질문 | 기대 파라미터 |
|---|------------|--------------|
| 14 | "미국 산업생산지수 3년 추이를 전년동기대비 변화율로 조회해줘" | `indicator=INDPRO, period=3y, units=pc1` |
| 15 | "내구재 신규주문이 늘고 있어? IT 장비·디스플레이 관련 B2B 주문 회복 여부를 분석해줘" | `indicator=DGORDER` |
| 16 | "제조업 생산지수와 신규주문을 종합해서 공장 가동 상황을 분석해줘" | `indicator` 없이 전체 조회 |

**FRED EV/에너지 (get-ev-energy-market):**

| # | 테스트 질문 | 기대 파라미터 |
|---|------------|--------------|
| 17 | "자동차 재고/판매 비율이 어떻게 돼? 재고가 쌓이고 있어?" | `indicator=AISRSA` |
| 18 | "WTI 유가와 휘발유 소매가격을 함께 보여줘" | `indicator` 없이 전체 조회 |

**FRED 시리즈 검색 (search-fred-series):**

| # | 테스트 질문 | 기대 키워드 |
|---|------------|------------|
| 19 | "반도체 생산 관련 FRED 시리즈를 검색해줘" | `semiconductor production` |
| 20 | "computer and electronic product manufacturing 관련 시리즈를 검색해줘" | `computer electronic product manufacturing` |
| 21 | "display panel 또는 flat panel 관련 데이터가 FRED에 있는지 검색해줘" | `display panel` / `flat panel` |
| 22 | "information processing equipment 관련 지표를 찾아줘" | `information processing equipment` |

**Work IQ (메일/Teams/Copilot):**

| # | 테스트 질문 | 기대 호출 도구 |
|---|------------|---------------|
| 23 | "최근 1주일간 받은 메일 중 '시장 분석' 관련 메일을 정리해줘" | Work IQ Mail |
| 24 | "Teams에서 '디스플레이 원가' 키워드로 최근 대화를 검색해줘" | Work IQ Teams |
| 25 | "최근 받은 메일 중 컨설팅 보고서나 시장 리포트가 있는지 찾아줘" | Work IQ Mail |

**ThinQ (IoT):**

| # | 테스트 질문 | 기대 호출 도구 |
|---|------------|---------------|
| 26 | "등록된 가전 제품 목록을 보여줘" | ThinQ `getDevices` |

---

### 5-2. FRED 복합 분석 테스트 — 다중 도구 조합

하나의 질문으로 **여러 FRED 도구가 순차적으로 호출**되는지 확인합니다. 난이도(⭐) 순서로 정렬되어 있습니다.

**⭐ 2개 도구 조합 (기본):**

| # | 테스트 질문 | 기대 호출 순서 |
|---|------------|---------------|
| 1 | "환율과 원유가격을 함께 분석해서 수입 원가 영향을 알려줘" | `get-cost-pressure` (DEXKOUS + DCOILWTICO) → 종합 |
| 2 | "GDP와 실업률을 종합해서 미국 경기 상황을 평가해줘" | `get-macro-environment` (GDPC1 + UNRATE) → 종합 |
| 3 | "구리·합성수지 PPI와 환율을 함께 보고, 디스플레이 부품 수입 원가 압박 수준을 진단해줘" | `get-cost-pressure` (DEXKOUS + WPUSI019011 + PCU325211325211) → 종합 |
| 4 | "내구재 CPI와 내구재 소비지출을 비교해서, 모니터·디스플레이 가격 대비 소비가 늘고 있는지 분석해줘" | `get-macro-environment` (CUSR0000SAD) + `get-consumer-demand` (PCEDG) → 비교 |
| 5 | "소비자심리지수와 내구재 소비를 종합해서 IT 전자제품(모니터, TV) 소비 전망을 분석해줘" | `get-consumer-demand` (UMCSENT + PCEDG) → 전망 |

**⭐⭐ 3개 도구 조합 (중급):**

| # | 테스트 질문 | 기대 호출 순서 |
|---|------------|---------------|
| 6 | "환율·구리·합성수지 PPI로 원가 추세를 보고, 내구재 CPI로 가격 전가 여부를 확인해서, 디스플레이 마진 전망을 분석해줘" | `get-cost-pressure` → `get-macro-environment` (CUSR0000SAD) → 마진 분석 |
| 7 | "금리 역전 여부, GDP, 실업률을 확인하고, 산업생산지수와 내구재 주문 추이를 더해서 경기 침체 가능성과 제조업 영향을 평가해줘" | `get-macro-environment` → `get-industry-production` → 종합 판단 |
| 8 | "주택착공·소비자심리·내구재 소비지출을 종합해서 가정용 모니터·TV 디스플레이 수요 전망을 분석해줘" | `get-consumer-demand` (HOUST + UMCSENT + PCEDG) → 수요 전망 |
| 9 | "금리·GDP 환경을 확인하고, 내구재 주문 추이를 더해서 B2B 디스플레이 설비 투자 환경을 진단해줘" | `get-macro-environment` → `get-industry-production` (DGORDER) → B2B 투자 판단 |

**⭐⭐⭐ 4개+ 도구 조합 (고급):**

| # | 테스트 질문 | 기대 호출 순서 |
|---|------------|---------------|
| 10 | "환율·구리·합성수지 PPI로 디스플레이 원가 추세를 보고, 내구재 CPI와 소비자심리를 함께 분석해서 모니터 시장 수익성 전망을 평가해줘" | `get-cost-pressure` → `get-macro-environment` → `get-consumer-demand` → 수익성 종합 |
| 11 | "금리 역전 여부, GDP, 실업률, 산업생산지수를 종합하고, 환율·원자재 PPI까지 더해서 올해 디스플레이 제조업 투자 환경을 평가해줘" | `get-macro-environment` → `get-industry-production` → `get-cost-pressure` → 종합 판단 |
| 12 | "computer and electronic product manufacturing 시리즈를 검색한 후, 관련 지표와 환율·원자재 데이터, 내구재 CPI까지 종합해서 디스플레이 산업 경기를 종합 진단해줘" | `search-fred-series` → `get-cost-pressure` → `get-macro-environment` → 종합 진단 |

---

### 5-3. FRED + Work IQ 복합 분석 테스트 — 거시경제 × 내부 커뮤니케이션

FRED 경제 데이터와 **메일·Teams 대화·컨설팅 자료**를 결합하여 실전 업무 판단에 활용하는 시나리오입니다.

**⭐ 간단 — FRED + 메일/채팅 조합:**

| # | 테스트 질문 | 기대 동작 |
|---|------------|-----------|
| 1 | "최근 받은 메일 중 '시장 분석' 관련 메일을 정리하고, 미국 실업률과 GDP 추이도 함께 보여줘" | Work IQ Mail → `get-macro-environment` → 병렬 정보 제공 |
| 2 | "Teams에서 '원자재 가격' 관련 최근 대화를 검색하고, 실제 구리·철강·합성수지 PPI 추이를 함께 보여줘" | Work IQ Teams → `get-cost-pressure` → 대화 내용 vs 실제 데이터 비교 |
| 3 | "최근 메일에서 '환율' 키워드가 포함된 내용을 찾아주고, 원/달러 환율 최근 6개월 데이터도 조회해줘" | Work IQ Mail → `get-cost-pressure` (DEXKOUS) → 메일 내용과 실제 추이 비교 |

**⭐⭐ 중급 — 내부 자료 검증 + 경제 데이터 교차 분석:**

| # | 테스트 질문 | 기대 동작 |
|---|------------|-----------|
| 4 | "최근 받은 컨설팅 보고서 메일을 찾아서 주요 내용을 요약하고, 보고서에 언급된 경제지표를 FRED에서 실제 데이터로 검증해줘" | Work IQ Mail (컨설팅 메일 검색) → FRED 관련 도구 → 교차 검증 |
| 5 | "Teams에서 '디스플레이 시장' 관련 최근 논의를 검색하고, 내구재 소비·소비자심리·내구재 CPI 데이터로 팀 논의 내용을 팩트체크해줘" | Work IQ Teams → `get-consumer-demand` + `get-macro-environment` → 팩트체크 |
| 6 | "원자재 가격 변동에 따른 가격 정책을 재검토해줘. 관련 내부 메일과 Teams 대화를 찾고, FRED 환율·원자재 PPI 데이터로 근거를 보강해줘" | Work IQ Mail + Teams → `get-cost-pressure` → 가격 정책 검토 |
| 7 | "최근 메일에서 '북미 시장' 관련 보고를 찾아 정리하고, GDP·실업률·금리 데이터를 더해서 보고 내용이 현재 경기 상황과 부합하는지 평가해줘" | Work IQ Mail → `get-macro-environment` → 보고서 vs 실제 경기 비교 |

**⭐⭐⭐ 고급 — 종합 판단 + 커뮤니케이션 산출물:**

| # | 테스트 질문 | 기대 동작 |
|---|------------|-----------|
| 8 | "최근 보고 메일을 정리하고, 환율·원자재 PPI·내구재 CPI·산업생산지수를 조회해서 시장 상황과 비교 분석한 뒤, 주요 리스크 포인트를 정리해서 Teams에 카드로 공유해줘" | Work IQ Mail → `get-cost-pressure` + `get-macro-environment` + `get-industry-production` → 리스크 분석 → Teams 카드 |
| 9 | "Teams에서 '디스플레이 원가 상승' 관련 논의를 검색하고, 구리·합성수지 PPI와 환율 데이터로 원가 압박 수준을 분석해서, 대응 방안 의견 메일을 작성해줘" | Work IQ Teams → `get-cost-pressure` → 분석 → Work IQ Mail (메일 작성) |
| 10 | "내부 컨설팅 자료 메일과 Teams 논의를 종합 검색하고, FRED에서 GDP·금리·내구재 주문·환율 데이터를 조회해서, 올해 디스플레이 사업부 투자 환경 브리핑 메일을 작성해줘" | Work IQ Mail + Teams → `get-macro-environment` + `get-industry-production` + `get-cost-pressure` → 브리핑 메일 작성 |
| 11 | "신규 시장 진출에 대한 판단 의견 메일을 작성해줘. 관련 내부 자료를 메일과 Teams에서 찾고, GDP·금리·소비자심리·산업생산지수·환율 데이터를 모두 종합해서 근거를 만들어줘" | Work IQ Mail + Teams → `get-macro-environment` + `get-consumer-demand` + `get-industry-production` + `get-cost-pressure` → 판단 메일 작성 |
| 12 | "computer and electronic product manufacturing 시리즈를 FRED에서 검색하고, 관련 Teams 논의와 메일 보고 내용을 함께 정리해서, 디스플레이 산업 경기 전망 보고서를 Teams 카드로 공유해줘" | `search-fred-series` → Work IQ Teams + Mail → 종합 보고 → Teams 카드 |

---

### 5-4. 복합 시나리오 — 전체 워크플로우 테스트

에이전트의 **지침(Instructions)에 정의한 업무 시나리오**가 end-to-end로 동작하는지 확인합니다:

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

다음 단계에서 메일 수신 트리거를 추가합니다. ➡️ [Part 4: 메일 수신 트리거 추가]({{ '/chapters/sp1-4-trigger/' | relative_url }})
