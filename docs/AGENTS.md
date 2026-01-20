# Spec Driven Development (SDD) Workflow Instructions

## TL;DR Quick Checklist

- Read `docs/project.md` for context.
- Choose a verb-led change slug.
- Create `docs/changes/<slug>/proposal.md` and delta specs under `docs/changes/<slug>/specs/`.
- Validate spec format.
- For ralph‑tui: create a worktree with gtr-git-worktree-runner.
- Implement via chosen path.
- Review implementation.
- Sync to `docs/specs/`.
- Archive by moving `docs/changes/<slug>/` to `docs/changes/archive/<date>-<slug>/`.

## Directory Structure

```
docs/
├── project.md
├── specs/                      # Current truth (empty for now)
└── changes/
    ├── <slug>/
    │   ├── proposal.md         # Why + what changes
    │   ├── specs/              # Delta specs by capability
    │   │   └── <capability>/
    │   │       └── spec.md
    │   ├── prd.json            # Ralph TUI tasks (optional)
    │   └── design.md           # Optional technical decisions
    └── archive/
```

## Decision Tree

```
New request?
├─ Behavior change or new capability? → Create/update a change
├─ Ambiguous or risky? → Create a change
└─ Formatting or refactor only? → Skip change
```

## Creating Changes

1. Read `docs/project.md` for context.
2. Choose a unique, verb-led change slug.
3. Create `docs/changes/<slug>/proposal.md` with Why + What Changes.
4. Create delta specs at `docs/changes/<slug>/specs/<capability>/spec.md`.

## Actions

- Create or update `proposal.md` and delta specs to clarify requirements.
- Choose an implementation path (see below).
- Validate spec format.
- Implement the change.
- Review implementation against the spec.
- Sync to `docs/specs/` when implementation is accepted.
- Archive when work is complete.

## Implementation Paths

- Ralph TUI (AFK loop): after spec approval, use `implementing-with-ralph-tui` skill to generate `docs/changes/<slug>/prd.json`, create a worktree with gtr, then run `ralph-tui run --prd docs/changes/<slug>/prd.json` from the worktree.
- HITL Ralph loop: after spec approval, use `implementing-with-ralph-tui` skill to generate `docs/changes/<slug>/prd.json`, create a worktree with gtr, run one iteration from the worktree, review, adjust spec, repeat.
- Agentic session: use an assistant (OpenCode, Claude Code, Cursor, etc.) with optional gtr worktree.
- Human implementation: no agent loop; optional gtr worktree.

## Approval Gate

- Do not start implementation until the change proposal/spec is reviewed and approved.
- Implementation is done only via the selected run/implement mode (AFK/HITL/agentic), not eagerly.
- Runtime artifacts (code, scripts, configs) are created or edited only during a selected implementation path; spec work is limited to proposal/spec/design/prd.json.
- Do not sync to `docs/specs/` until implementation has been reviewed and accepted.

## Skills

- `creating-changes` for proposal/delta authoring, examples, and validation tips.
- `implementing-with-ralph-tui` for prd.json schema and ralph-tui execution (run outside opencode).
- `syncing-to-specs` for promoting specs with intelligent merge.
- `archiving-changes` for archiving changes (syncs by default).
- `gtr-git-worktree-runner` for isolated worktree workflows (required for ralph‑tui, optional otherwise).
- `adjusting-spec-driven-development-workflow` for improving the workflow itself.

## Worktree Management

Use git-worktree-runner (gtr) to create isolated worktrees for parallel work:
- Required for ralph‑tui changes
- Optional for human/agentic sessions
- See `gtr-git-worktree-runner` skill for commands and workflow details

## Sync to Current Truth

When changes in `docs/changes/` have been implemented and reviewed, suggest using the `syncing-to-specs` skill to promote and merge specs into `docs/specs/`.

## Archive

When changes have been synced suggest using the `archiving-changes` skill to archive changes in `docs/changes/` to `docs/changes/archive/`.
