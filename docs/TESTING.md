# Testing

This doc summarizes the current testing bar and how to run it.

## Source of truth

Current truth for testing lives in `docs/specs/project-setup/spec.md`.

## Test bar

- Run `pnpm lint` and `pnpm test` before merge.
- For behavior or UI changes, run lint/test before commit (policy only).
- Run `pnpm build` when changes touch `apps/**` or shared packages used by apps.
- Maintain >=90% line and branch coverage; avoid coverage regressions.
- Shared package test runner/coverage will be added once `packages/**` exist.
- Run Maestro UI smoke flows for UI changes when flows exist in `maestro/` or `apps/**/maestro/`.

## Commands

- `pnpm lint`
- `pnpm test`
- `pnpm build`
