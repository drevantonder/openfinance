---
name: creating-changes
description: Create change proposals and delta specs for capability-scoped updates.
---

# Creating Changes

Use when creating or editing `docs/changes/<slug>/`.

## When to Create a Change

Create or update a change when you need to:

- Add features or capabilities
- Make breaking changes or architecture shifts
- Change security or performance behavior
- Document behavior changes before implementation

Skip a change for:

- Typos, formatting, or comments
- Small config tweaks
- Pure refactors with no behavior change
- Tests that only confirm existing behavior

## Before You Start

- Read `docs/project.md` for context.
- Check `docs/changes/` for existing work.
- Ask clarifying questions if requirements are unclear.

## Change Structure

```
docs/changes/<slug>/
├── proposal.md
├── specs/
│   └── <capability>/
│       └── spec.md
└── design.md (optional)
```

## proposal.md

Format:

```markdown
# Change: <short title>

## Why
<1-2 sentences>

## What Changes
- <bullet list>
```

## Delta Spec Format

Use delta sections and scenario formatting:

```markdown
## ADDED Requirements
### Requirement: New Feature
The system SHALL ...

#### Scenario: Basic case
- **WHEN** ...
- **THEN** ...
```

Rules:

- Every requirement MUST include at least one `#### Scenario:`.
- Use SHALL/MUST for normative requirements.
- Use `## ADDED|MODIFIED|REMOVED|RENAMED Requirements`.

### ADDED vs MODIFIED vs RENAMED

- ADDED: new capability. Prefer ADDED if the change is orthogonal.
- MODIFIED: changes behavior of an existing requirement. Always paste the full, updated requirement block (header + scenarios) to avoid losing details.
- RENAMED: name-only change. If behavior changes, use RENAMED (name) + MODIFIED (content).

**Example: MODIFIED**

```markdown
## MODIFIED Requirements
### Requirement: Receipt Capture
The system SHALL accept photos and PDFs.

#### Scenario: Photo upload
- **WHEN** a user uploads a photo
- **THEN** the system stores the image
```

**Example: RENAMED**

```markdown
## RENAMED Requirements
- FROM: `### Requirement: Login`
- TO: `### Requirement: User Authentication`
```

## design.md (Only When Needed)

Create `design.md` if any apply:

- Cross-cutting change (multiple services/modules)
- New external dependency or significant data model change
- Security, performance, or migration risk
- Ambiguity that benefits from technical decisions before coding

Minimal outline:

```markdown
## Context
## Goals / Non-Goals
## Decisions
## Risks / Trade-offs
## Migration Plan
## Open Questions
```

## Validation Checklist

- Spec delta sections exist (`ADDED/MODIFIED/REMOVED/RENAMED`).
- Every requirement uses `### Requirement:`.
- Every requirement has at least one `#### Scenario:`.
- Scenarios use `- **WHEN**` / `- **THEN**`.

## Decision Tree

```
New request?
├─ Behavior change or new capability? → Create/update a change
├─ Ambiguous or risky? → Create a change
└─ Formatting or refactor only? → Skip change
```
