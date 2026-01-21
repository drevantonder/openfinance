# Review Log: add-core-system

## Open Issues
- [x] R1: Auth flow uses provider registry (resolved in Review 3)
- [x] R2: Session context loads and clears properly (resolved in Review 3)
- [x] R3: Module settings sections render UI components (resolved in Review 5)
- [x] R4: Desktop layout renders sidebar + content (resolved in Review 3)
- [x] R5: Mobile nav now supports `/(tabs)` entries (resolved in Review 4)
- [x] R6: Mobile tests build core before running (resolved in Review 3)

## Review 1 — <date> — agentic
**Checks**: 
- [ ] lint
- [ ] test
- [ ] build

**Findings**:
- R1: Auth flow bypasses provider registry: login and sign-out instantiate `MockAuthProvider` directly instead of using `ProviderRegistry` (provider selection config not honored).
  - Files: `apps/mobile/app/login.tsx`, `apps/mobile/app/(tabs)/settings.tsx`
- R2: Session context unused state + stuck loading: `isLoading` never flips, `setIsLoading` unused, `useEffect` unused (likely lint failure; session bootstrap missing).
  - File: `apps/mobile/contexts/session-context.tsx`
- R3: Module settings sections not implemented: module registry only defines `settings` label/description; settings screen never uses `getSettingsSections()` and does not render module sections per spec.
  - Files: `packages/core/src/modules.ts`, `apps/mobile/app/(tabs)/settings.tsx`
- R4: Desktop layout renders sidebar only: desktop returns `<DesktopSidebar />` without any screen content (`Tabs`/`Slot`), so views will not render on desktop.
  - File: `apps/mobile/app/(tabs)/_layout.tsx`
- R5: Mobile nav too strict + missing route: nav entries filtered to `index`/`settings` only; any other module routes are ignored. If `moreNavEntries` exists, `Tabs.Screen name="more"` has no route file.
  - File: `apps/mobile/app/(tabs)/_layout.tsx`
- R6: Test fragility: Jest maps `@openfinance/core` to `packages/core/dist` but build not guaranteed before tests.
  - File: `apps/mobile/jest.config.js`

**Decision**: needs-fix

## Review 2 - 2026-01-21 - agentic
**Checks**:
- [x] lint
- [x] test
- [x] build
- [x] spec-scan

**Findings**:
- R1: Auth flow bypasses provider registry still present: `login.tsx` and `settings.tsx` instantiate `MockAuthProvider` directly, so provider selection config remains unused.
- R2: Session context remains incomplete: `isLoading` never flips, `setIsLoading` unused, and auth session bootstrap via provider registry is missing.
- R3: Module settings sections still unrendered: settings screen never uses `getSettingsSections()` and module settings definitions are not surfaced in UI.
- R4: Desktop layout still renders sidebar only: `TabLayout` returns `<DesktopSidebar />` without rendering tab content; build warns about layout children in `(tabs)/_layout`.
- R5: Mobile nav still filters entries to `index/settings` only and registers a `more` tab without a route file; module routes beyond `index/settings` remain hidden.
- R6: Jest config still maps `@openfinance/core` to `dist`, which is fragile without an enforced build step before tests.

**Decision**: needs-fix

## Review 3 - 2026-01-21 - agentic
**Checks**:
- [x] lint
- [x] test
- [x] build
- [x] spec-scan

**Findings**:
- R3: Module settings sections only render labels/descriptions with placeholder text; no icon, slug, or renderable UI component is surfaced per spec.
- R5: Mobile tabs filter out module navigation entries targeting `/(tabs)`, so the Activity entry never appears in the bottom nav.

**Decision**: needs-fix

## Review 4 - 2026-01-21 - agentic
**Checks**:
- [x] lint
- [x] test
- [x] build
- [x] spec-scan

**Findings**:
- R3: Module settings sections now render icon/slug metadata, but settings entries still do not expose a renderable UI component per spec.

**Decision**: needs-fix

## Review 5 - 2026-01-21 - agentic
**Checks**:
- [x] lint
- [x] test
- [x] build
- [x] spec-scan

**Findings**:
- None.

**Decision**: pass
