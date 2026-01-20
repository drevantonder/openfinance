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
5. Confirm the change is reviewed and approved before creating `docs/changes/<slug>/prd.json`.
6. Produce `docs/changes/<slug>/prd.json` using the ralph-tui JSON schema only when the user chooses the Ralph TUI path.
7. Stories must cover implementation only; do not add stories for creating specs that already exist in `docs/changes/<slug>/specs/`.
8. Ask the user to review the prd.json and request edits if needed. If no edits, ask which run/implement mode to use.
9. Implementation is done only via the selected run/implement mode (AFK/HITL/agentic), not eagerly.
10. Only suggest running `ralph-tui run --prd docs/changes/<slug>/prd.json` after the user confirms the prd.json.
11. Remind the user to run ralph-tui outside opencode.

## prd.json Schema

## Location

Always write `prd.json` at `docs/changes/<slug>/prd.json`.

Root fields:
- `name` (required)
- `description` (optional)
- `branchName` (optional)
- `userStories` (required array)

Per-story fields:
- `id` (required)
- `title` (required)
- `passes` (required)
- `description`, `acceptanceCriteria`, `priority`, `dependsOn` (optional, include when useful)

Example (full):
```json
{
  "name": "Change name",
  "description": "Short overview",
  "userStories": [
    {
      "id": "US-001",
      "title": "Short title",
      "description": "As a user, I want ...",
      "acceptanceCriteria": ["Criterion 1", "Criterion 2"],
      "priority": 1,
      "passes": false,
      "dependsOn": []
    }
  ]
}
```

Example (minimal):
```json
{
  "name": "My Task",
  "userStories": [
    {
      "id": "US-001",
      "title": "First task",
      "passes": false
    }
  ]
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
- The JSON tracker validates schema and will report missing fields like `name`, `userStories`, or `passes`.
