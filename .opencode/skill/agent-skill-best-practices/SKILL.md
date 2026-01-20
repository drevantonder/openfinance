---
name: agent-skill-best-practices
description: Provides best practices for writing Agent Skills. Use when creating or refining SKILL.md content.
---

# Agent Skill Best Practices

## Core Principles

- Keep SKILL.md concise; Claude already knows basics.
- Write a specific, third-person description that includes what + when.
- Favor stable concepts over volatile paths and time-sensitive info.
- Use progressive disclosure: link to extra files from SKILL.md.
- Keep references one level deep to avoid partial reads.

## Naming Guidance

- Use lowercase and hyphens; keep names short and descriptive.
- Prefer gerund names when possible (e.g., `writing-docs`).

## Quality Checklist

- Description includes what + when, third-person.
- Body is short and avoids redundant context.
- Terminology is consistent.
- No brittle file paths unless they are stable interfaces.
- Examples match the intended output format.

## Progressive Disclosure Tips

- For large skills, split reference docs and link from SKILL.md.
- Keep long files readable with a table of contents.
- Use scripts for deterministic work when needed.
