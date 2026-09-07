---
layout: "chapter"
lang: en
date: 2026-02-20
title: "Power Platform Tenant Governance Strategic Improvement Plan"
short_title: "PP Governance Plan"
description: "An example AI-generated strategic improvement plan for Power Platform tenant governance, including prioritized setting recommendations, a phased implementation roadmap, CLI commands, and monitoring strategy."
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
**Translated article** — This article is based on [🎯 Power Platform Tenant Governance Strategic Improvement Plan](https://microsoft.github.io/agent-academy/special-ops/pac-cli-mcp/power-platform-plan/) from the [Copilot Studio Agent Academy](https://microsoft.github.io/agent-academy/). The original wording takes precedence.
</div>

# 🎯 Power Platform Tenant Governance Strategic Improvement Plan

## 1. 📊 Current tenant configuration assessment

### Environment overview

Your tenant shows the characteristics of a **development-focused organization**:

- **16 total environments** (1 default, 2 production, 3 developer, 10 sandbox)
- Multiple user environments that suggest an **active development community**
- A **mixed governance approach** with some restrictions already applied

### Current settings analysis against best practices

#### ✅ **Positive configurations**

- **Developer environments restricted** (`disableDeveloperEnvironmentCreationByNonAdminUsers: true`)
- **Share with Everyone disabled** for Power Apps (`disableShareWithEveryone: true`)
- **App insights enabled** (`enableCanvasAppInsights: true`)
- **Copilot feedback disabled** (privacy consideration)
- **Guest making disabled** (`enableGuestsToMake: false`)

#### ⚠️ **Areas of concern**

- **Trial environments unrestricted** - Anyone can create trial environments
- **General environment creation open** - Non-admins can create environments
- **Capacity allocation unrestricted** - Environment admins can allocate capacity broadly
- **Connection sharing permissive** - Users can share connections broadly
- **Portal creation unrestricted** - Non-admins can create Power Pages sites
- **Limited reporting transparency** - Tenant reporting is not enabled for environment admins

---

## 2. 📋 Prioritized settings update recommendations

### 🔴 **CRITICAL priority** (implement within 2 weeks)

#### Security and access control

| Setting | Current | Recommended | Risk Level |
|------|------|------|----------|
| `disableTrialEnvironmentCreationByNonAdminUsers` | `false` | `true` | **High** |
| `disableEnvironmentCreationByNonAdminUsers` | `false` | `true` | **High** |
| `disableCapacityAllocationByEnvironmentAdmins` | `false` | `true` | **Medium** |
| `disablePortalsCreationByNonAdminUsers` | `false` | `true` | **Medium** |

### 🟠 **HIGH priority** (implement within 4-6 weeks)

#### Enhanced governance and monitoring

| Setting | Current | Recommended | Risk Level |
|------|------|------|----------|
| `enableTenantCapacityReportForEnvironmentAdmins` | `false` | `true` | **Medium** |
| `enableTenantLicensingReportForEnvironmentAdmins` | `false` | `true` | **Medium** |
| `enableDefaultEnvironmentRouting` | `false` | `true` | **Low** |
| `disableConnectionSharingWithEveryone` | `false` | `true` | **Medium** |

### 🟡 **MEDIUM priority** (implement within 8-12 weeks)

#### Policy management and compliance

| Setting | Current | Recommended | Risk Level |
|------|------|------|----------|
| `enableDesktopFlowDataPolicyManagement` | `false` | `true` | **Low** |
| `disableBillingPolicyCreationByNonAdminUsers` | `false` | `true` | **Low** |
| `enableDeleteDisabledUserInAllEnvironments` | `false` | `true` | **Low** |

### 🟢 **LOW priority** (implement within 3-6 months)

#### User experience and analytics

| Setting | Current | Recommended | Risk Level |
|------|------|------|----------|
| `enableTenantSummaryReportForEnvironmentAdmins` | `false` | `true` | **Very Low** |
| `disableUnusedLicenseAssignment` | `false` | `true` | **Very Low** |

---

## 3. 🗓️ Phased implementation roadmap

### **Phase 1: Security foundation** (weeks 1-2) 🔴

**Objective**: Establish baseline security controls

**Implementation steps**:

1. **Week 1**: Environment creation restrictions
1. **Week 2**: Portal creation and capacity allocation controls

**Stakeholder communication**:

- Email notification 1 week before implementation
- Admin Center announcement
- Update internal governance documentation

### **Phase 2: Enhanced monitoring** (weeks 3-6) 🟠

**Objective**: Improve visibility and governance capabilities

**Implementation steps**:

1. **Weeks 3-4**: Enable reporting for environment administrators
1. **Weeks 5-6**: Implement connection sharing restrictions and default environment routing

**Stakeholder communication**:

- Training sessions for environment administrators
- Updated reporting access documentation

### **Phase 3: Policy optimization** (weeks 7-12) 🟡

**Objective**: Implement advanced policy management

**Implementation steps**:

1. **Weeks 7-9**: Desktop Flow data policy management
1. **Weeks 10-12**: Billing policy restrictions and user management

### **Phase 4: Analytics and optimization** (weeks 13-24) 🟢

**Objective**: Fine-tune user experience and resource management

---

## 4. 🔧 Specific CLI commands for implementation

### **Phase 1 commands** (Critical - weeks 1-2)

```powershell
# Restrict trial environment creation
pac admin update-tenant-settings --setting-name "disableTrialEnvironmentCreationByNonAdminUsers" --setting-value "true"

# Restrict general environment creation
pac admin update-tenant-settings --setting-name "disableEnvironmentCreationByNonAdminUsers" --setting-value "true"

# Restrict capacity allocation by environment admins
pac admin update-tenant-settings --setting-name "disableCapacityAllocationByEnvironmentAdmins" --setting-value "true"

# Restrict portal creation by non-admins
pac admin update-tenant-settings --setting-name "disablePortalsCreationByNonAdminUsers" --setting-value "true"
```

### **Phase 2 commands** (High - weeks 3-6)

```powershell
# Enable capacity reporting for environment admins
pac admin update-tenant-settings --setting-name "powerPlatform.licensing.enableTenantCapacityReportForEnvironmentAdmins" --setting-value "true"

# Enable licensing reporting for environment admins
pac admin update-tenant-settings --setting-name "powerPlatform.licensing.enableTenantLicensingReportForEnvironmentAdmins" --setting-value "true"

# Enable default environment routing
pac admin update-tenant-settings --setting-name "powerPlatform.governance.enableDefaultEnvironmentRouting" --setting-value "true"

# Disable connection sharing with everyone
pac admin update-tenant-settings --setting-name "powerPlatform.powerApps.disableConnectionSharingWithEveryone" --setting-value "true"
```

### **Phase 3 commands** (Medium - weeks 7-12)

```powershell
# Enable desktop flow data policy management
pac admin update-tenant-settings --setting-name "powerPlatform.governance.policy.enableDesktopFlowDataPolicyManagement" --setting-value "true"

# Disable billing policy creation by non-admins
pac admin update-tenant-settings --setting-name "powerPlatform.licensing.disableBillingPolicyCreationByNonAdminUsers" --setting-value "true"

# Enable delete disabled users in all environments
pac admin update-tenant-settings --setting-name "powerPlatform.userManagementSettings.enableDeleteDisabledUserInAllEnvironments" --setting-value "true"
```

### **Verification commands**

```powershell
# Export current settings for comparison
pac admin list-tenant-settings --settings-file "tenant-settings-$(Get-Date -Format 'yyyy-MM-dd').json"

# List all environments to monitor changes
pac admin list

# Check specific environment details
pac env list
```

---

## 5. 📈 Key monitoring points after implementation

### **Immediate monitoring** (first 30 days)

- **Environment creation requests**: Track support tickets for environment access
- **User feedback**: Monitor helpdesk tickets and user complaints
- **Admin workload**: Track admin time spent on environment provisioning
- **Compliance metrics**: Monitor adherence to new policies

### **Ongoing monitoring** (monthly)

- **Resource utilization**: Capacity consumption across environments
- **License usage**: Track unused license assignments
- **Security incidents**: Monitor unauthorized access attempts
- **Policy violations**: Track data policy compliance

### **Quarterly reviews**

- **Governance effectiveness**: Assess policy impact on productivity
- **Cost optimization**: Analyze capacity and licensing efficiency
- **User satisfaction**: Survey makers and environment administrators
- **Policy adjustments**: Review and refine settings based on usage patterns

### **Recommended monitoring commands**

```powershell
# Monthly capacity review
pac admin list --type "Production" 
pac admin list --type "Sandbox"

# Quarterly settings audit
pac admin list-tenant-settings --settings-file "quarterly-audit-$(Get-Date -Format 'yyyy-MM-dd').json"

# Environment utilization tracking
pac env list --filter "dev"
```

---

## 🎯 Success metrics and KPIs

### **Security metrics**

- Reduction in unauthorized environment creation: **Target >95%**
- Decrease in security incidents: **Target 50% reduction within 6 months**
- Compliance score improvement: **Target >90% policy adherence**

### **Governance metrics**

- Admin oversight efficiency: **Target 30% reduction in admin overhead**
- Environment lifecycle management: **Target environment request fulfillment within 2 days**
- Resource optimization: **Target 20% improvement in capacity utilization**

### **User experience metrics**

- Developer productivity maintenance: **Target no significant decrease**
- Support ticket volume: **Target less than 10% increase during transition**
- User satisfaction score: **Target >4.0/5.0 after 6 months**

---

## ⚠️ Risk assessment and mitigation

### **High-risk items**

1. **User resistance** - Provide training and clear communication
1. **Productivity impact** - Implement gradual rollout with feedback loops
1. **Admin burden** - Ensure sufficient staffing and process automation

### **Medium-risk items**

1. **Legacy environment dependencies** - Audit and document existing environments
1. **Integration impact** - Test changes in development environments first

### **Mitigation strategies**

- **Pilot program**: Test with a small user group first
- **Rollback plan**: Document rollback procedures for each setting
- **Communication plan**: Keep stakeholders continuously informed
- **Training program**: Comprehensive training for admins and power users

---

## 📋 Implementation checklist

### **Pre-implementation**

- [ ] Export current tenant settings for backup
- [ ] Document existing environment dependencies
- [ ] Notify stakeholders of upcoming changes
- [ ] Prepare rollback procedures
- [ ] Schedule training sessions

### **Phase 1: Security foundation**

- [ ] Update trial environment creation settings
- [ ] Update general environment creation settings
- [ ] Update capacity allocation settings
- [ ] Update portal creation settings
- [ ] Verify changes and monitor impact

### **Phase 2: Enhanced monitoring**

- [ ] Enable tenant capacity reporting
- [ ] Enable tenant licensing reporting
- [ ] Enable default environment routing
- [ ] Update connection sharing settings
- [ ] Train environment administrators on new reports

### **Phase 3: Policy optimization**

- [ ] Enable Desktop Flow data policy management
- [ ] Update billing policy creation settings
- [ ] Enable user management settings
- [ ] Review and adjust policies based on feedback

### **Phase 4: Analytics and optimization**

- [ ] Enable tenant summary reporting
- [ ] Configure unused license assignment management
- [ ] Conduct quarterly review of all settings
- [ ] Optimize based on usage patterns and feedback

---

## 📚 Additional resources

### **Microsoft documentation**

- [Power Platform administration](https://docs.microsoft.com/power-platform/admin/)
- [Power Platform CLI reference](https://docs.microsoft.com/power-platform/developer/cli/introduction)
- [Tenant settings reference](https://docs.microsoft.com/power-platform/admin/tenant-settings)

### **Best-practice guides**

- [Power Platform governance framework](https://docs.microsoft.com/power-platform/guidance/adoption/governance)
- [Environment strategy](https://docs.microsoft.com/power-platform/guidance/adoption/environment-strategy)
- [Security and compliance](https://docs.microsoft.com/power-platform/admin/security/)

### **Training resources**

- [Power Platform administration learning path](https://docs.microsoft.com/learn/paths/power-plat-administrator/)
- [Power Platform CLI training](https://docs.microsoft.com/learn/modules/power-platform-cli/)

---

*This strategic plan positions your Power Platform tenant for enterprise-grade governance while maintaining developer productivity and user satisfaction. The phased approach ensures minimal disruption while systematically improving security, compliance, and operational efficiency.*
