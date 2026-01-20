---
name: archiving-changes
description: Archive completed changes and optionally sync specs first.
---

# Archiving Changes

Use when a change is complete and ready to archive.

## Behavior

1. If change slug is not provided, ask which change to archive.
2. **Default to syncing specs first** using `syncing-to-specs` unless the user explicitly says skip.
3. Move `docs/changes/<slug>/` to `docs/changes/archive/<date>-<slug>/`.
4. Remind the user to validate formatting after archive.

## Notes

- Be transparent when syncing before archive.
- If the change is docs-only and should not update current specs, skip sync.
