---
name: reviewing-changes
description: Use this skill to evaluate implementation quality, track technical debt via an append-only log, and generate a fix queue (prd.json) when a change does not meet the specification.
---

# Reviewing Changes

Use this skill when you need to verify that an implementation (after a ralph-tui loop, agentic session, or human work) correctly fulfills the requirements defined in the change's delta specs.

## Behavior

1. **Study**: Study the `proposal.md`, delta specs in `specs/`, and the current implementation code.
2. **Run Checks**: Execute the project's verification suite (`pnpm lint`, `pnpm test`, `pnpm build`) and perform a thorough spec-to-code mapping. You MUST have objective data from tests or code analysis before proceeding to pre-review.
3. **Pre-review**: Study `docs/changes/<slug>/review.md` if it exists.
   - For each item in the **Open Issues** list, verify thoroughly that it has been addressed using the checks and tests run in step 2.
   - If you cannot confirm an issue is resolved, do NOT mark it as resolved. Instead, require better checks or tests.
   - Mark resolved issues as `[x]`.
   - Update text of existing issues if the nature of the failure has changed.
   - Note regressed issues as `[ ] <issue> (regressed)`.
4. **Append Review**: Add a new `## Review N` block to `review.md`.
   - List new findings with IDs (`R1`, `R2`, etc.).
   - State the **Decision**: `pass | needs-fix | reject`.
5. **No Code Edits**: Do NOT modify application code during review.
6. **If `needs-fix`**:
   - Update `docs/changes/<slug>/prd.json` to act as a fix queue.
   - **Reopen** stories that failed: set `passes: false` and update `acceptanceCriteria` to include the missing/failed behavior.
   - **Add new** stories for gaps: Title `Fix: <summary>`, use spec-derived criteria, and note the issue ID (e.g., `Issue: R1`).
   - Ask the user to review the updated `prd.json`.
7. **If `reject`**:
   - Suggest cleaning up the implementation branch/worktree.
   - Recommend updating `proposal.md`, `specs/`, or `prd.json` with learnings before a clean retry.
8. **If `pass`**:
   - Suggest syncing specs and archiving the change.

## review.md Format

```markdown
# Review Log: <slug>

## Open Issues
- [ ] R1: <summary> (since Review 1)
- [x] R2: <summary> (resolved in Review 2)

## Review 1 - <date> - <mode>
**Checks**: lint, test, build, spec-scan
**Findings**:
- R1: ...
- R2: ...
**Decision**: needs-fix

## Review 2 - <date> - <mode>
**Checks**: ...
**Findings**:
- R3: ...
**Decision**: needs-fix
```

## Note on IDs
Use sequential IDs (`R1`, `R2`, ...) across the entire review log to keep tracking simple.
