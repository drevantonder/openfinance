---
name: adjusting-spec-driven-development-workflow
description: Adjust the spec driven development workflow to reduce drift and duplication.
---

# Adjusting the Spec Driven Development Workflow

Use when you want to adjust the SDD workflow, not to execute it.

## Inspiration

Primary inspiration is OPSX (OpenSpec experimental workflow):
- https://github.com/Fission-AI/OpenSpec/blob/main/docs/experimental-workflow.md

OPSX emphasizes action-based, iterative workflows and customizable artifacts.

## Why Read OpenSpec Skill Templates

- https://github.com/Fission-AI/OpenSpec/blob/main/src/core/templates/skill-templates.ts
- Shows how OpenSpec structures skills, guardrails, and iteration patterns
- Useful for aligning our skills and prompts with proven patterns

## Guidance

- Reduce drift between proposal, deltas, and any derived artifacts.
- Avoid duplicating content across files without a clear purpose.
- Prefer small, stable changes over large rewrites.
- Study `docs/` to see the current workflow structure, skills, and tools before changing it.
