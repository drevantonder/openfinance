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
2. Infer story split and dependencies from the proposal + deltas. Only ask if unclear.
3. Infer quality gates from context (typecheck/test/build as relevant) and include them in each story without overloading criteria.
4. Infer a short description from `proposal.md`.
5. Produce `docs/changes/<slug>/prd.json` using the ralph-tui JSON schema only when the user chooses the Ralph TUI path.
6. Stories must cover implementation only; do not add stories for creating specs that already exist in `docs/changes/<slug>/specs/`.
7. Ask the user to review the prd.json and request edits if needed.
8. Only suggest running `ralph-tui run --prd docs/changes/<slug>/prd.json` after the user confirms the prd.json.
9. Remind the user to run ralph-tui outside opencode.

## prd.json Schema

## Location

Always write `prd.json` at `docs/changes/<slug>/prd.json`.

Root fields:
- `title` (required)
- `description` (optional)
- `stories` (required array)

Per-story fields:
- `id` (required)
- `title` (required)
- `acceptanceCriteria` (required)
- `passes` (required)
- `description`, `dependsOn` (optional, include when useful)

Example (full):
```json
{
  "title": "Change name",
  "description": "Short overview",
  "stories": [
    {
      "id": "US-001",
      "title": "Short title",
      "description": "As a user, I want ...",
      "acceptanceCriteria": ["Criterion 1", "Criterion 2"],
      "dependsOn": [],
      "passes": false
    }
  ]
}
```

Example (minimal story):
```json
{
  "id": "US-002",
  "title": "Short title",
  "acceptanceCriteria": ["Criterion 1"],
  "passes": false
}
```

## Modes

- AFK loop: run `ralph-tui run --prd docs/changes/<slug>/prd.json` outside opencode.
- HITL loop: run one iteration outside opencode, review, adjust spec, repeat.

## Review and Re-run

- Review can be human-only or human with AI assistance.
- If changes miss requirements, set affected story `passes` to false.
- Optionally refine acceptance criteria or split stories.
- Re-run `ralph-tui run --prd docs/changes/<slug>/prd.json` after updates.

## Notes

- Keep stories small enough for one agent iteration.
- Ralph TUI updates `passes` during runs; manual review can flip them back as needed.
- Read upstream schema docs if unsure: https://ralph-tui.com/docs/plugins/trackers/json
