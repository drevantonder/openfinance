---
name: syncing-to-specs
description: Sync change delta specs into current truth using intelligent merge.
---

# Syncing to Specs

Use when you want to update `docs/specs/` with deltas from a change without archiving it.

## Inputs

- `docs/changes/<slug>/specs/<capability>/spec.md`
- `docs/specs/<capability>/spec.md` (create if missing)

## Behavior

1. If change slug is not provided, ask which change to sync.
2. For each delta spec under `docs/changes/<slug>/specs/`:
   - Read the delta spec.
   - Read the current spec (or create if missing).
3. Apply changes with **intelligent merge**:
   - ADDED: add the requirement if it does not exist; if it exists, treat as MODIFIED.
   - MODIFIED: update only what the delta specifies (add scenarios, tweak text) while preserving existing scenarios and content not mentioned.
   - REMOVED: remove the entire requirement block.
   - RENAMED: rename the requirement header (if content changes, also apply MODIFIED).
4. Ensure every requirement still has at least one `#### Scenario:`.
5. Summarize changes by capability.

## Notes

- The delta expresses intent, not full replacement.
- Preserve existing content unless explicitly changed.
- If unclear, ask before editing.
