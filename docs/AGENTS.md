# Spec Driven Development (SDD) Workflow Instructions

## Quick Checklist

- Study `docs/` for context to avoid making mistakes by assumptions
- On completion of workflow actions, suggest:
  - 1) To continue iterating based on feedback
  - 2+) Any actions that make sense to follow the completed action

## Workflow Actions

- Use `creating-changes` skill to create or update a change/spec delta
- Implement via user chosen path. (see below)
  - Do not start implementation unless the user has reviewed the proposal & spec and approved. (Implicit approval can be given. e.g can we create prd.json now)
  - Do not write or edit code unless an implementation method has been chosen by the user
- Review implementation and iterate if needed.
- Merge/commit as needed
- Use `syncing-specs` skill to sync spec deltas to `docs/specs/`.
  - Only sync spec deltas to `docs/specs` that have been implemented
- Use `archiving-changes` skill to archive `docs/changes/<slug>/` to `docs/changes/archive/<date>-<slug>/`.
- Adjust this workflow (using `adjusting-spec-driven-development-workflow`) and skills when issues are identified
(Not necessarily in this order, but typically follow this flow)

## Directory Structure

```
docs/
├── project.md
├── specs/                      # Current truth matching the implementation
└── changes/
    ├── <slug>/
    │   ├── proposal.md         # Why + what changes
    │   ├── specs/              # Delta specs by capability to be implemented
    │   │   └── <capability>/
    │   │       └── spec.md
    │   ├── prd.json            # Ralph TUI tasks (optional)
    │   └── design.md           # Optional technical decisions
    └── archive/                # Archived changes (either implemented or rejected)
```

## Decision Tree

```
New request?
├─ Behavior change or new capability? → Create/update a change
├─ Ambiguous or risky? → Create a change
└─ Formatting or refactor only? → Skip change
```

## Implementation Method

- Ralph TUI (AFK loop): after spec approval, use `implementing-with-ralph-tui` skill to generate `docs/changes/<slug>/prd.json`, create a worktree with gtr, then run `ralph-tui run --prd docs/changes/<slug>/prd.json` from the worktree. Squash story commits before merging.
- HITL Ralph loop: after spec approval, use `implementing-with-ralph-tui` skill to generate `docs/changes/<slug>/prd.json`, create a worktree with gtr, run one iteration from the worktree, review, adjust spec, repeat. Squash story commits before merging.
- Agentic session: use an assistant (OpenCode, Claude Code, Cursor, etc.) with optional gtr worktree.
- Human implementation: no agent loop; optional gtr worktree.

## Skills

- `creating-changes` for proposal/delta authoring, examples, and validation tips.
- `implementing-with-ralph-tui` for prd.json schema and ralph-tui execution (run outside opencode).
- `syncing-to-specs` for promoting specs with intelligent merge.
- `archiving-changes` for archiving changes.
- `gtr-git-worktree-runner` for isolated worktree workflows.
- `adjusting-spec-driven-development-workflow` for adjusting the workflow itself.

Note: `ralph-tui-create-json` skill is for a PRD.md → prd.json workflow. We do not use PRD.md because specs replace it. Use `implementing-with-ralph-tui` skill first for workflow, then use `ralph-tui-create-json` skill for prd.json structure and best practices.

## Worktree Management

Use git-worktree-runner (gtr) to create isolated worktrees for parallel work:

- Required for ralph‑tui changes
- Optional for human/agentic sessions
- See `gtr-git-worktree-runner` skill for commands and workflow details
