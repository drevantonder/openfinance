---
name: rejecting-changes
description: Use this skill to reject an implementation, extract learnings, and update change artifacts (proposal, specs, prd.json) before cleaning up the worktree for a retry.
---

# Rejecting Changes

Use when an implementation has failed review and needs to be discarded, but the learnings must be preserved for a better retry.

## Behavior

1. **Analyze Failure**: Study `review.md` findings, the failed implementation code, and the current change artifacts (`proposal.md`, `specs/`, `prd.json`). Identify root causes (e.g., ambiguous specs, missing requirements, poor story breakdown, testing gaps).
2. **Extract Learnings**:
   - Update `proposal.md`: Clarify ambiguous scope, add missing constraints, or refine the "Why" statement.
   - Update `specs/`: Add missing requirements, clarify scenarios, or tighten acceptance conditions based on what was missed.
   - Update `prd.json`:
     - Adjust story breakdown if stories were too large or small.
     - Add missing stories identified during review.
     - Reset `passes: true` to `false` for any stories relevant to the retry (or all of them).
     - Remove completion metadata (`completionNotes`, `metadata`) to prepare for a fresh run.
3. **User Review**: Present the updated artifacts to the user. Explain *why* these changes will lead to a successful implementation next time.
4. **Cleanup**: Only AFTER the user approves the artifact updates:
   - Guide the user to delete the worktree and branch.
   - Ensure the updated artifacts are preserved in the main branch (e.g., by stashing/copying them over before branch deletion if they were edited in the worktree, or editing them directly in main).

## Guardrails

- **Do not delete prematurely**: Never clean up the worktree/branch until the user has explicitly approved the artifact updates.
- **Preserve intent**: Do not change the core goal of the change unless the review revealed it was fundamentally flawed.
- **Reset state**: Ensure `prd.json` is ready for a fresh run (no stale `passes: true` or completion notes).
