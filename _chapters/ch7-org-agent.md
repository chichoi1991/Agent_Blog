---
layout: chapter
title: "조직 공용 Agent 운영"
short_title: "조직 공용 Agent"
description: "개인 Agent와 조직 Agent의 차이, 조직 Agent 등록 프로세스, 전사 공용 Agent 운영 시 유의사항을 정리합니다."
order: 7
icon: "🏢"
---

## 개인 Agent와 조직 Agent 차이

| 구분 | 개인 Agent | 조직 Agent |
|---|---|---|
| **목적** | 개인 업무 생산성 향상 | 팀/부서/전사 공통 업무 지원 |
| **작성자** | 개인 (시민개발자) | 전담 팀 또는 지정 담당자 |
| **관리 환경** | 개인/기본 환경 | **전용 운영 환경(Production)** |
| **Knowledge** | 개인 문서, 소규모 데이터 | 공식 사내 문서, 정책 |
| **배포 범위** | 본인 또는 소수 공유 | 특정 부서 또는 조직 전체 |
| **거버넌스** | 느슨함 | 엄격한 승인/검토 프로세스 |
| **유지보수** | 작성자 본인 | 전담 운영팀 (IT/CoE) |

> 📖 **참조**: [Copilot Studio governance principles](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/copilot-studio-experience#copilot-studio-governance-principles)

---

## 조직 Agent 등록 프로세스

### 권장 단계

```
1. 요구사항 정의 및 기획 → 대상 업무, 사용자, Knowledge, 성공 기준(KPI)
2. PoC / 프로토타입 → 개발 환경에서 핵심 시나리오 구현 + 파일럿 테스트
3. 내부 검토 및 승인 → IT/보안팀, 법무/컴플라이언스, 관리자 승인
4. 운영 환경 배포 → Production 환경 이전, Teams Admin 등록
5. 공지 및 교육 → 조직 내 안내, 사용 가이드 배포
6. 운영 모니터링 → Analytics 활용, 미응답 질문 리뷰, 지속 개선
```

---

## 거버넌스 체크리스트

조직 공용 Agent를 운영할 때 반드시 확인해야 할 항목입니다.

| 영역 | 체크 항목 | 참조 |
|---|---|---|
| **환경 분리** | Dev / Test / Prod 환경을 분리하여 관리 | [Learn](https://learn.microsoft.com/en-us/power-platform/admin/environments-overview) |
| **권한 최소화** | Agent 편집 권한(Maker)은 최소 인원에게만 부여 | |
| **DLP 정책** | 커넥터 사용 제어, 외부 데이터 반출 차단 설정 | [Learn](https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention) |
| **민감 데이터 통제** | MIP(Sensitivity Label) 기반 Agent 접근 차단 가능 | |
| **인증 강제** | Anonymous 인증 금지, Entra ID 기반 인증 필수 | |
| **라이선스/과금 명확화** | Copilot Credits vs PA Premium 경로 구분 | Ch1 참조 |
| **감사 로그** | Microsoft Purview Audit Log + Sentinel 연계 | [Learn](https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-overview) |
| **ALM** | Solution 단위 패키징, 환경 간 Export/Import | |
| **변경 관리** | 지침·Knowledge 변경 시 검토→승인→게시 프로세스 | |

<div class="info-box tip">
<strong>💡 실무 팁 — 하나의 업무 영역부터 시작하세요</strong>
조직 공용 Agent를 처음 도입할 때는 <strong>하나의 업무 영역</strong>에 집중하세요. "모든 것을 다 해결하는 Agent"보다 <strong>"특정 업무를 확실하게 처리하는 Agent"</strong>가 사용자 신뢰를 빠르게 확보합니다. 성공 사례를 만든 후 다른 업무 영역으로 확장하는 것이 가장 효과적인 전략입니다.
</div>

---

## 조직 Agent 활용 예시

### (예) HR 가이드 Agent

| 항목 | 설정 |
|---|---|
| **역할** | 인사 정책 안내 전문 Agent |
| **Knowledge** | SharePoint의 인사 정책 문서, 복리후생 안내, 취업규칙 |
| **주요 Topic** | 연차 신청 방법, 출장비 정산, 복리후생 문의 |
| **Actions** | 잔여 연차 조회 (HR 시스템 API), 경조사 신청 (Power Automate) |
| **배포 채널** | Teams (전사 배포) |

### (예) IT 헬프데스크 Agent

| 항목 | 설정 |
|---|---|
| **역할** | IT 장애·요청 접수 및 자가 해결 안내 Agent |
| **Knowledge** | SharePoint의 IT FAQ, 매뉴얼, 설치 가이드 |
| **주요 Topic** | 비밀번호 초기화, VPN 연결, 프린터 설정, 장비 신청 |
| **Actions** | IT 티켓 생성 (ServiceNow API), 비밀번호 리셋 요청 (Power Automate) |
| **배포 채널** | Teams (전사) + 사내 포털 (웹 임베드) |

### 모니터링 — Application Insights 연동

대규모 Agent 운영 시에는 기본 Analytics 외에 **Application Insights**를 연동하여 더 상세한 로그를 수집할 수 있습니다.

- **대화 로그**: 사용자 질문, Agent 응답, 사용된 Knowledge/Action 추적
- **성능 모니터링**: 응답 시간, Flow 실행 시간, 외부 API 지연
- **감사 대응**: 보안/규정 감사에 필요한 대화 이력 보존

<div class="info-box note">
<strong>📌 다음 챕터 미리보기</strong>
조직 Agent 운영 방법을 익혔습니다. 마지막 <strong>Chapter 8</strong>에서는 참고할 공식 문서 링크와 향후 아키텍처 확장 방향을 정리합니다.
</div>
