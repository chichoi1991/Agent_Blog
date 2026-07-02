---
layout: "chapter"
title: "🎯 Power Platform 테넌트 거버넌스 전략 개선 계획"
short_title: "PP 거버넌스 계획"
description: "AI가 생성한 Power Platform 테넌트 거버넌스 전략 개선 계획 예시입니다. 우선순위별 설정 권장사항, 단계별 구현 로드맵, CLI 명령, 모니터링 전략을 포함합니다."
order: 999
category: "academy-labs"
parent: "aspecialops"
source_url: "https://microsoft.github.io/agent-academy/special-ops/pac-cli-mcp/power-platform-plan/"
source_author: "Copilot Studio Agent Academy"
source_blog: "Copilot Studio Agent Academy"
source_published: "2026-02-20"
canonical_url: "https://microsoft.github.io/agent-academy/special-ops/pac-cli-mcp/power-platform-plan/"
---

<div class="info-box note" markdown="1">
**원문 번역 게시물** — 이 글은 [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/)의 원문 [🎯 Power Platform Tenant Governance Strategic Improvement Plan](https://microsoft.github.io/agent-academy/special-ops/pac-cli-mcp/power-platform-plan/)을 한글로 옮긴 것입니다. 원문 표현이 우선합니다.
</div>

# 🎯 Power Platform 테넌트 거버넌스 전략 개선 계획

## 1. 📊 현재 테넌트 구성 평가

### 환경 개요

귀하의 테넌트는 다음과 같은 **개발 중심 조직** 특성을 보여줍니다:

- **총 16개 환경** (기본 1개, 프로덕션 2개, 개발자 3개, 샌드박스 10개)
- **활성 개발 커뮤니티**를 시사하는 다수의 사용자 환경
- 일부 제한이 이미 적용된 **혼합 거버넌스 접근 방식**

### 모범 사례 대비 현재 설정 분석

#### ✅ **긍정적인 구성**

- **개발자 환경 제한됨** (`disableDeveloperEnvironmentCreationByNonAdminUsers: true`)
- **모든 사용자와 공유 비활성화** Power Apps의 경우 (`disableShareWithEveryone: true`)
- **앱 인사이트 활성화됨** (`enableCanvasAppInsights: true`)
- **Copilot 피드백 비활성화** (개인 정보 고려)
- **게스트 만들기 비활성화됨** (`enableGuestsToMake: false`)

#### ⚠️ **우려 사항**

- **체험 환경 제한 없음** - 누구든 체험 환경을 만들 수 있음
- **일반 환경 생성 개방** - 비관리자가 환경을 만들 수 있음
- **용량 할당 제한 없음** - 환경 관리자가 용량을 광범위하게 할당 가능
- **연결 공유 허용** - 사용자가 연결을 광범위하게 공유 가능
- **포털 생성 제한 없음** - 비관리자가 Power Pages 사이트를 만들 수 있음
- **제한된 보고 투명성** - 환경 관리자를 위한 테넌트 보고가 활성화되지 않음

---

## 2. 📋 우선순위별 설정 업데이트 권장사항

### 🔴 **CRITICAL 우선순위** (2주 이내 구현)

#### 보안 및 접근 제어

| 설정 | 현재 | 권장 | 위험 수준 |
|------|------|------|----------|
| `disableTrialEnvironmentCreationByNonAdminUsers` | `false` | `true` | **높음** |
| `disableEnvironmentCreationByNonAdminUsers` | `false` | `true` | **높음** |
| `disableCapacityAllocationByEnvironmentAdmins` | `false` | `true` | **중간** |
| `disablePortalsCreationByNonAdminUsers` | `false` | `true` | **중간** |

### 🟠 **HIGH 우선순위** (4-6주 이내 구현)

#### 향상된 거버넌스 및 모니터링

| 설정 | 현재 | 권장 | 위험 수준 |
|------|------|------|----------|
| `enableTenantCapacityReportForEnvironmentAdmins` | `false` | `true` | **중간** |
| `enableTenantLicensingReportForEnvironmentAdmins` | `false` | `true` | **중간** |
| `enableDefaultEnvironmentRouting` | `false` | `true` | **낮음** |
| `disableConnectionSharingWithEveryone` | `false` | `true` | **중간** |

### 🟡 **MEDIUM 우선순위** (8-12주 이내 구현)

#### 정책 관리 및 규정 준수

| 설정 | 현재 | 권장 | 위험 수준 |
|------|------|------|----------|
| `enableDesktopFlowDataPolicyManagement` | `false` | `true` | **낮음** |
| `disableBillingPolicyCreationByNonAdminUsers` | `false` | `true` | **낮음** |
| `enableDeleteDisabledUserInAllEnvironments` | `false` | `true` | **낮음** |

### 🟢 **LOW 우선순위** (3-6개월 이내 구현)

#### 사용자 경험 및 분석

| 설정 | 현재 | 권장 | 위험 수준 |
|------|------|------|----------|
| `enableTenantSummaryReportForEnvironmentAdmins` | `false` | `true` | **매우 낮음** |
| `disableUnusedLicenseAssignment` | `false` | `true` | **매우 낮음** |

---

## 3. 🗓️ 단계별 구현 로드맵

### **1단계: 보안 기반 구축** (1-2주차) 🔴

**목표**: 기본 보안 제어 구축

**구현 단계**:

1. **1주차**: 환경 생성 제한
1. **2주차**: 포털 생성 및 용량 할당 제어

**이해관계자 커뮤니케이션**:

- 구현 1주 전 이메일 알림
- Admin Center 공지
- 내부 거버넌스 문서 업데이트

### **2단계: 향상된 모니터링** (3-6주차) 🟠

**목표**: 가시성 및 거버넌스 역량 향상

**구현 단계**:

1. **3-4주차**: 환경 관리자를 위한 보고 활성화
1. **5-6주차**: 연결 공유 제한 및 기본 환경 라우팅 구현

**이해관계자 커뮤니케이션**:

- 환경 관리자를 위한 교육 세션
- 업데이트된 보고 접근 문서

### **3단계: 정책 최적화** (7-12주차) 🟡

**목표**: 고급 정책 관리 구현

**구현 단계**:

1. **7-9주차**: Desktop Flow 데이터 정책 관리
1. **10-12주차**: 청구 정책 제한 및 사용자 관리

### **4단계: 분석 및 최적화** (13-24주차) 🟢

**목표**: 사용자 경험 및 리소스 관리 미세 조정

---

## 4. 🔧 구현을 위한 특정 CLI 명령

### **1단계 명령** (Critical - 1-2주차)

```powershell
# 체험 환경 생성 제한
pac admin update-tenant-settings --setting-name "disableTrialEnvironmentCreationByNonAdminUsers" --setting-value "true"

# 일반 환경 생성 제한
pac admin update-tenant-settings --setting-name "disableEnvironmentCreationByNonAdminUsers" --setting-value "true"

# 환경 관리자의 용량 할당 제한
pac admin update-tenant-settings --setting-name "disableCapacityAllocationByEnvironmentAdmins" --setting-value "true"

# 비관리자의 포털 생성 제한
pac admin update-tenant-settings --setting-name "disablePortalsCreationByNonAdminUsers" --setting-value "true"
```

### **2단계 명령** (High - 3-6주차)

```powershell
# 환경 관리자를 위한 용량 보고 활성화
pac admin update-tenant-settings --setting-name "powerPlatform.licensing.enableTenantCapacityReportForEnvironmentAdmins" --setting-value "true"

# 환경 관리자를 위한 라이선스 보고 활성화
pac admin update-tenant-settings --setting-name "powerPlatform.licensing.enableTenantLicensingReportForEnvironmentAdmins" --setting-value "true"

# 기본 환경 라우팅 활성화
pac admin update-tenant-settings --setting-name "powerPlatform.governance.enableDefaultEnvironmentRouting" --setting-value "true"

# 모든 사용자와의 연결 공유 비활성화
pac admin update-tenant-settings --setting-name "powerPlatform.powerApps.disableConnectionSharingWithEveryone" --setting-value "true"
```

### **3단계 명령** (Medium - 7-12주차)

```powershell
# Desktop Flow 데이터 정책 관리 활성화
pac admin update-tenant-settings --setting-name "powerPlatform.governance.policy.enableDesktopFlowDataPolicyManagement" --setting-value "true"

# 비관리자의 청구 정책 생성 비활성화
pac admin update-tenant-settings --setting-name "powerPlatform.licensing.disableBillingPolicyCreationByNonAdminUsers" --setting-value "true"

# 모든 환경에서 비활성화된 사용자 삭제 활성화
pac admin update-tenant-settings --setting-name "powerPlatform.userManagementSettings.enableDeleteDisabledUserInAllEnvironments" --setting-value "true"
```

### **검증 명령**

```powershell
# 비교를 위한 현재 설정 내보내기
pac admin list-tenant-settings --settings-file "tenant-settings-$(Get-Date -Format 'yyyy-MM-dd').json"

# 변경 사항 모니터링을 위한 모든 환경 나열
pac admin list

# 특정 환경 세부 정보 확인
pac env list
```

---

## 5. 📈 구현 후 주요 모니터링 포인트

### **즉각적인 모니터링** (첫 30일)

- **환경 생성 요청**: 환경 접근을 위한 지원 티켓 추적
- **사용자 피드백**: 헬프데스크 티켓 및 사용자 불만 모니터링
- **관리자 업무량**: 환경 프로비저닝에 소요되는 관리자 시간 추적
- **규정 준수 지표**: 새 정책 준수 모니터링

### **지속적인 모니터링** (월간)

- **리소스 활용**: 환경 전반의 용량 소비
- **라이선스 사용**: 미사용 라이선스 할당 추적
- **보안 사고**: 무단 접근 시도 모니터링
- **정책 위반**: 데이터 정책 준수 추적

### **분기별 검토**

- **거버넌스 효과**: 정책이 생산성에 미치는 영향 평가
- **비용 최적화**: 용량 및 라이선스 효율성 분석
- **사용자 만족도**: 메이커 및 환경 관리자 설문
- **정책 조정**: 사용 패턴에 따른 설정 검토 및 조정

### **권장 모니터링 명령**

```powershell
# 월간 용량 검토
pac admin list --type "Production" 
pac admin list --type "Sandbox"

# 분기별 설정 감사
pac admin list-tenant-settings --settings-file "quarterly-audit-$(Get-Date -Format 'yyyy-MM-dd').json"

# 환경 활용 추적
pac env list --filter "dev"
```

---

## 🎯 성공 지표 및 KPI

### **보안 지표**

- 무단 환경 생성 감소: **목표 >95%**
- 보안 사고 감소: **6개월 내 50% 감소 목표**
- 규정 준수 점수 향상: **>90% 정책 준수 목표**

### **거버넌스 지표**

- 관리자 감독 효율성: **관리자 오버헤드 30% 감소 목표**
- 환경 수명 주기 관리: **환경 요청 처리 2일 이내 목표**
- 리소스 최적화: **용량 활용 20% 개선 목표**

### **사용자 경험 지표**

- 개발자 생산성 유지: **유의미한 감소 없음 목표**
- 지원 티켓 볼륨: **전환 기간 중 10% 미만 증가 목표**
- 사용자 만족도 점수: **6개월 후 >4.0/5.0 목표**

---

## ⚠️ 위험 평가 및 완화

### **높은 위험 항목**

1. **사용자 저항** - 교육 및 명확한 커뮤니케이션 제공
1. **생산성 영향** - 피드백 루프를 통한 점진적 롤아웃 구현
1. **관리자 부담** - 충분한 인력과 프로세스 자동화 확보

### **중간 위험 항목**

1. **레거시 환경 의존성** - 기존 환경 감사 및 문서화
1. **통합 영향** - 개발 환경에서 먼저 변경 사항 테스트

### **완화 전략**

- **파일럿 프로그램**: 먼저 소규모 사용자 그룹으로 테스트
- **롤백 계획**: 각 설정에 대한 롤백 절차 문서화
- **커뮤니케이션 계획**: 이해관계자들에게 지속적으로 정보 제공
- **교육 프로그램**: 관리자 및 파워 유저를 위한 포괄적인 교육

---

## 📋 구현 체크리스트

### **구현 전**

- [ ] 백업을 위한 현재 테넌트 설정 내보내기
- [ ] 기존 환경 의존성 문서화
- [ ] 예정된 변경 사항에 대해 이해관계자 알림
- [ ] 롤백 절차 준비
- [ ] 교육 세션 예약

### **1단계: 보안 기반**

- [ ] 체험 환경 생성 설정 업데이트
- [ ] 일반 환경 생성 설정 업데이트
- [ ] 용량 할당 설정 업데이트
- [ ] 포털 생성 설정 업데이트
- [ ] 변경 사항 확인 및 영향 모니터링

### **2단계: 향상된 모니터링**

- [ ] 테넌트 용량 보고 활성화
- [ ] 테넌트 라이선스 보고 활성화
- [ ] 기본 환경 라우팅 활성화
- [ ] 연결 공유 설정 업데이트
- [ ] 새 보고서에 대해 환경 관리자 교육

### **3단계: 정책 최적화**

- [ ] Desktop Flow 데이터 정책 관리 활성화
- [ ] 청구 정책 생성 설정 업데이트
- [ ] 사용자 관리 설정 활성화
- [ ] 피드백에 따라 정책 검토 및 조정

### **4단계: 분석 및 최적화**

- [ ] 테넌트 요약 보고 활성화
- [ ] 미사용 라이선스 할당 관리 구성
- [ ] 모든 설정에 대한 분기별 검토 수행
- [ ] 사용 패턴 및 피드백에 따라 최적화

---

## 📚 추가 리소스

### **Microsoft 문서**

- [Power Platform 관리](https://docs.microsoft.com/power-platform/admin/)
- [Power Platform CLI 참조](https://docs.microsoft.com/power-platform/developer/cli/introduction)
- [테넌트 설정 참조](https://docs.microsoft.com/power-platform/admin/tenant-settings)

### **모범 사례 가이드**

- [Power Platform 거버넌스 프레임워크](https://docs.microsoft.com/power-platform/guidance/adoption/governance)
- [환경 전략](https://docs.microsoft.com/power-platform/guidance/adoption/environment-strategy)
- [보안 및 규정 준수](https://docs.microsoft.com/power-platform/admin/security/)

### **교육 리소스**

- [Power Platform 관리 학습 경로](https://docs.microsoft.com/learn/paths/power-plat-administrator/)
- [Power Platform CLI 교육](https://docs.microsoft.com/learn/modules/power-platform-cli/)

---

*이 전략 계획은 개발자 생산성과 사용자 만족도를 유지하면서 Power Platform 테넌트를 엔터프라이즈급 거버넌스를 위한 준비 상태로 만드는 것을 목표로 합니다. 단계별 접근 방식은 보안, 규정 준수, 운영 효율성을 체계적으로 개선하면서 최소한의 중단을 보장합니다.*
