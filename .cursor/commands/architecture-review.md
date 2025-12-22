---
name: "Architecture Review"
description: "Review architecture compliance using Architecture Guardian"
agent: "Architecture Guardian"
tags: ["architecture", "review", "compliance", "rules"]
---

# Architecture Review

## Overview

Review code or implementation plans for architecture rule compliance using the **Architecture Guardian** agent. This performs a lightweight compliance check focusing on rule violations and proposes minimal fixes.

## Agent

**Use**: @Architecture Guardian

**Report Location**: For full audits, reports are saved to `report/architecture/architecture-review-{timestamp}.md` (timestamp format: YYYY-MM-DD-HHMMSS)

The Architecture Guardian performs a read-only review checking:

-   Clean Architecture boundaries (Domain → Usecases → Infrastructure → Presentation)
-   Layer separation (no Supabase in UI, no business logic in UI)
-   React Query + Zustand usage (React Query for server state, Zustand for UI state only)
-   SCSS variables usage (no hardcoded values)
-   Supabase usage (only in infrastructure layer)
-   Accessibility compliance (WCAG 2.1 AA)

## Steps

1. **Scan Code/Plan**

    - Review provided files or implementation plan
    - Identify scope of changes

2. **Check Architecture Rules**

    - **Clean Architecture**: Verify layer separation and boundaries
    - **Domain**: Verify pure TypeScript, no external dependencies
    - **Usecases**: Verify orchestration using repositories (ports)
    - **Infrastructure**: Verify Supabase implementations only
    - **Presentation**: Verify no business logic, React Query hooks, Zustand stores
    - **SCSS Variables**: Verify no hardcoded values
    - **Accessibility**: Verify shared/a11y/ utilities usage

3. **List Violations**

    - Group violations by category (Domain, Usecases, Infrastructure, Presentation, SCSS, A11y)
    - For each violation: file path, line number, rule violated, minimal fix

4. **Propose Fixes**
    - Provide minimal, targeted fixes (diffs only, no full rewrites)
    - Focus on violations, not style preferences
    - If no violations found, confirm compliance briefly

## Architecture Review Checklist

### Clean Architecture / Layer Separation

-   [ ] No Supabase calls in UI
-   [ ] No business logic in UI components
-   [ ] Domain layer is pure TypeScript
-   [ ] Usecases use repositories (ports)
-   [ ] Infrastructure implements ports only
-   [ ] Presentation uses React Query hooks and Zustand stores

### SCSS Variables

-   [ ] No hardcoded values (colors, spacing, sizes)
-   [ ] All values use variables from styles/variables/\*
-   [ ] Missing variables added to styles/variables/\*

### Supabase Usage

-   [ ] Supabase only in infrastructure layer
-   [ ] UI uses React Query hooks → usecases → repositories

### Accessibility

-   [ ] Accessibility utilities from shared/a11y/ used
-   [ ] All interactive elements have proper ARIA attributes
-   [ ] Semantic HTML used where appropriate

### Domain-Specific Database Rules (Optional)

-   [ ] Project-specific database invariants verified (e.g. reference tables, foreign keys, constrained enums)

## Output Format

The Architecture Guardian outputs using a standardized template:

```
# Architecture Compliance Review

**Description:** Brief 1-2 sentence summary of the review scope and findings.

**Status:** ✅ OK for merge | ⚠️ Refused | 🔴 Blocked

## Alerts

{ONLY_LIST_ALERTS_IF_VIOLATIONS_FOUND}

### 🔴 High Risk
- `file:line` - **Rule:** {rule} - **Recommandation:** {minimal_fix_or_action}

### ⚠️ Medium Risk
- `file:line` - **Rule:** {rule} - **Recommandation:** {minimal_fix_or_action}

### ℹ️ Low Risk
- `file:line` - **Rule:** {rule} - **Recommandation:** {minimal_fix_or_action}

{IF_NO_VIOLATIONS:}
No violations detected. The code respects the architecture rules.
```

**Important:** Alerts are only listed if violations are found. If the code is compliant, the report will clearly state that no violations were detected.

## Important Notes

-   **Read-only review**: This agent does not modify files, only identifies violations
-   **Minimal fixes**: Proposes targeted diffs, not full rewrites
-   **Concise output**: Focuses on violations, not explanations
-   **Quick checks**: Lightweight compliance verification
-   **Can be called by**: PM Agent (plan review), Dev Agent (self-review), or directly
