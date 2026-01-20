---
name: gtr-git-worktree-runner
description: Use git-worktree-runner (gtr) for isolated worktree workflows.
---

# Git Worktree Runner (gtr)

Use gtr to create and manage git worktrees. Always use worktrees for ralph‑tui changes; optional for human/agentic work.

## When to use

- Required: ralph‑tui changes
- Optional: human or agentic sessions that benefit from isolation

## Basic commands

```bash
git gtr new <branch>        # Create worktree for branch
git gtr go <branch>          # Print path to worktree
git gtr list                 # List worktrees
git gtr rm <branch>          # Remove worktree
```

## Ralph‑tui workflow

Create a worktree for the branch, navigate, and run ralph‑tui:

```bash
git gtr new <branch>
cd "$(git gtr go <branch>)"
ralph-tui run --prd docs/changes/<slug>/prd.json
```

## More details

Run `git gtr --help` or `git gtr new --help` for full options and examples.
