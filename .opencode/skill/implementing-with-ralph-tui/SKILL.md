---
name: implementing-with-ralph-tui
description: Use this skill to orchestrate autonomous implementation loops with ralph-tui. It guides you through creating a bite-sized, spec-aligned task list (prd.json) and setting up the execution environment.
---

# Implementing with Ralph TUI

Use when executing a change via ralph-tui.

## Inputs

- `docs/changes/<slug>/proposal.md`
- `docs/changes/<slug>/specs/*/spec.md`
- `docs/changes/<slug>/design.md` (optional)
- Any other files in the change folder (specs take priority)

## Behavior

1. Study all files in `docs/changes/<slug>/`, with emphasis on delta specs under `specs/`.
2. Use `ralph-tui-create-json` skill for prd.json structure, acceptance criteria formatting, and dependency conventions (we do not create prd.json from PRD.md).
3. **Story Sizing**: Each story must be bite-sized and completable in ONE ralph-tui iteration (~one agent context window). If a requirement is large, split it into multiple stories.
4. **Coverage Map**: Each story MUST note the requirement(s) it covers in the `notes` field (e.g., `Covers: Req:Auth, Req:Shell`). Ensure every requirement in the delta specs is covered by at least one story.
5. **Acceptance Criteria**: Use spec-derived behavioral criteria. Do NOT include implementation-specific details (e.g., "Use ProviderRegistry") unless they are explicitly in the spec.
6. **Quality Gates**: Append standard quality gates to every story:
   - `pnpm lint` passes
   - `pnpm test` passes (require "Tests added/updated for new behavior" and "Coverage >=90% not regressed" unless justified in `notes`)
   - `pnpm build` passes
7. Infer story split and dependencies from proposal + deltas. Only ask if unclear.
8. Set priorities using the ralph-tui convention (lower = higher):
   - 1 = highest priority
   - 2 = medium priority (default)
   - 3 = lower priority
   - 4+ = backlog
   Do not use incremental priorities; they should be semantic, not order-based.
9. Infer a short description from `proposal.md`.
10. Produce `docs/changes/<slug>/prd.json` using the ralph-tui JSON schema only when user chooses Ralph TUI path.
11. Write prd.json at `docs/changes/<slug>/prd.json` (not a tasks/ folder).
12. Stories must cover implementation only; do not add stories for creating specs that already exist in `docs/changes/<slug>/specs/`.
13. Ask the user to review prd.json.
14. Before running ralph-tui, offer to help create a worktree using gtr-git-worktree-runner:
   ```bash
   git gtr new <branch>
   cd "$(git gtr go <branch>)"
   ralph-tui run --prd docs/changes/<slug>/prd.json
   ```
15. Remind the user that ralph-tui creates per-story commits; offer to squash before merging.
16. Implementation is done only via the selected run/implement mode (AFK/HITL/agentic), not eagerly.
17. Remind the user to run ralph-tui outside opencode.


## Modes

- AFK loop: run `ralph-tui run --prd docs/changes/<slug>/prd.json` outside opencode.
- HITL loop: run one iteration outside opencode, review, adjust spec, repeat.
