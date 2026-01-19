# AGENTS.md

## Beads

Use `bd` for all issue tracking (create/update/close/sync).
Track multi-step or multi-session work in Beads.
Run `bd sync` at session end.

## Beads Viewer (bv)

Use `bv` as the Beads triage sidecar (don’t parse `.beads/*.jsonl` directly).
Only use `bv --robot-*` flags; bare `bv` opens a TUI and blocks.
Start with `bv --robot-triage`.
Quick pick: `bv --robot-next`.
Planning: `bv --robot-plan`.
Scope with `--label` / `--recipe`.

<!-- OPENSPEC:START -->
## OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

## OpenSpec (Project)

Planning/proposals/specs live in OpenSpec.
When you need project context (purpose, stack, conventions, constraints), read `openspec/project.md`.
When a change is approved and ready to implement, convert OpenSpec plans/specs into Beads issues for tracking.

## Ralph-tui (Ralph loops)

Ralph-tui runs your agent in a loop: pick task -> run -> log progress -> repeat.
It pulls tasks from Beads epics (`beads-bv`) or a `prd.json`.

Suggest it when: scope is clear, multi-step, acceptance-criteria heavy, and benefits from autonomous iterations + tests.
Avoid when: hotfix/quick change, unclear scope, or risky work without strong tests.

Commands:
- `ralph-tui run --tracker beads-bv --epic <id>`
- `ralph-tui run --prd ./prd.json`
- `ralph-tui status`, `ralph-tui logs`, `ralph-tui resume`

Config:
- `.ralph-tui/config.toml`: `agent`, `tracker`, `maxIterations`, `progressFile`, `autoCommit`.
- `autoCommit` commits per task; still follow session close + push workflow.

## Audience & Language

Apply these rules whenever you write copy, names, or specs.

- **User-facing copy** (UI strings, feature lists, onboarding, README intro): use family-friendly, everyday money words; keep it short and human; avoid finance/enterprise jargon.
- **Developer docs/specs**: be concise and precise; still avoid enterprise tone; prefer the same everyday terms users see so internal names don’t drift (e.g. avoid “ledger,” use “expenses/income/budget”).
- **README**: start with a friendly, practical overview + features; get more technical in later sections (self-hosting, contributing, security, dev setup).

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:

   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```

5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**

- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
