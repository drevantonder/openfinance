# Project Context

## Purpose

Open source expense tracker focused on fast receipt capture, beautiful UX, and a simple API. Core flows include mobile/web upload, email mailbox ingestion, and automated receipt parsing.

## Tech Stack

- Expo (mobile + web)
- Turborepo monorepo
- Cloudflare Workers + Email Workers
- Multimodal LLM receipt parsing (Gemini 3 Flash)

## Project Conventions

### Code Style

- Formatting: Prettier + ESLint (Expo defaults)
- Naming: camelCase for variables/functions, PascalCase for components/types, kebab-case for package names
- File naming: components in PascalCase, utilities in camelCase, packages/apps in kebab-case

### Architecture Patterns

- Monorepo with `apps/` and `packages/`
- Edge-first services on Cloudflare Workers
- Email ingestion via mailbox worker, normalized into a common receipt pipeline
- Receipt parsing pipeline: upload -> extract -> normalize -> validate -> persist
- Public API exposes core expense/receipt models with stable versioning

### Testing Strategy

- Prefer testing core parsing and API behaviors before UI polish

### Git Workflow

- Trunk-based development on `main`
- Short-lived branches when needed
- Conventional Commits required

## Domain Context

- Receipts can arrive via upload, email forward, or API
- Parsing accuracy and UX are primary differentiators
- Data model centered on expenses, receipts, merchants, and line items

## Important Constraints

- Security-first handling of user data and receipts
- No explicit regulatory constraints yet

## External Dependencies

- Cloudflare Workers platform
- Cloudflare Email Workers
- Gemini 3 Flash multimodal LLM (receipt OCR/parsing)
- Additional services TBD
