# Testing

This doc summarizes the current testing bar and how to run it.

## Source of truth

Current truth for testing lives in `docs/specs/project-setup/spec.md`.

## Test bar

- Run `pnpm lint` and `pnpm test` before merge.
- Run `pnpm build` when changes touch `apps/**` or shared packages used by apps.
- For significant behavior or UI changes, ensure lint/test pass before merge.
- Maintain >=90% line and branch coverage; avoid coverage regressions.
- Run Maestro UI smoke flows for UI changes when flows exist in `maestro/` or `apps/**/maestro/`.

## Commands

- `pnpm lint`
- `pnpm test`
- `pnpm build`
