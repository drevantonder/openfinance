---
name: implementing-with-ralph-tui
description: Generate prd.json from change deltas and run ralph-tui (AFK or HITL).
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
3. Infer story split and dependencies from proposal + deltas. Only ask if unclear.
4. Infer quality gates from context (typecheck/test/build as relevant) and include them in each story without overloading criteria.
5. Set priorities using the ralph-tui convention (lower = higher):
   - 1 = highest priority
   - 2 = medium priority (default)
   - 3 = lower priority
   - 4+ = backlog
   Do not use incremental priorities; they should be semantic, not order-based.
6. Infer a short description from `proposal.md`.
7. Confirm the change is reviewed and approved before creating `docs/changes/<slug>/prd.json`.
8. If user asks to create or generate `prd.json`, treat that as implicit approval and proceed without a separate approval prompt.
9. Produce `docs/changes/<slug>/prd.json` using the ralph-tui JSON schema only when user chooses Ralph TUI path.
10. Write prd.json at `docs/changes/<slug>/prd.json` (not a tasks/ folder).
11. Stories must cover implementation only; do not add stories for creating specs that already exist in `docs/changes/<slug>/specs/`.
12. Ask the user to review prd.json and request edits if needed. If no edits, ask which run/implement mode to use.
13. Before running ralph-tui, offer to help create a worktree using gtr-git-worktree-runner:
   ```bash
   git gtr new <branch>
   cd "$(git gtr go <branch>)"
   ralph-tui run --prd docs/changes/<slug>/prd.json
   ```
14. Remind the user that ralph-tui creates per-story commits; offer to squash before merging.
15. Implementation is done only via the selected run/implement mode (AFK/HITL/agentic), not eagerly.
16. Only suggest running `ralph-tui run --prd docs/changes/<slug>/prd.json` after user confirms prd.json.
17. Remind the user to run ralph-tui outside opencode.


## Modes

- AFK loop: run `ralph-tui run --prd docs/changes/<slug>/prd.json` outside opencode.
- HITL loop: run one iteration outside opencode, review, adjust spec, repeat.
