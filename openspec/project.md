# Project Context

## Purpose

Open-source modular personal finance platform with mobile capture, web dashboard, and API. Focus on fast receipt capture, email ingestion, and AI parsing, while allowing feature modules to be enabled per instance.

## Tech Stack

- Expo (mobile + web)
- Turborepo monorepo
- Hono API on Cloudflare Workers
- Neon Postgres + PowerSync (local-first sync)
- Cloudflare R2 (blob storage)
- Better Auth
- Multimodal LLM receipt parsing (Gemini 3 Flash)

## Project Conventions

### Code Style

- Formatting: Prettier + ESLint (Expo defaults)
- Naming: camelCase for variables/functions, PascalCase for components/types, kebab-case for package names
- File naming: components in PascalCase, utilities in camelCase, packages/apps in kebab-case

### Architecture Patterns

- Monorepo with `apps/` and `packages/`
- Core shell (auth, navigation, settings) with feature modules
- Module registry with instance-level config toggles
- Email ingestion via mailbox worker, normalized into a shared pipeline
- Receipt parsing pipeline: upload -> extract -> normalize -> validate -> persist
- Public API exposes canonical transaction model (expenses + income)

### Testing Strategy

- Prefer testing domain logic and API behaviors before UI polish

### Git Workflow

- Trunk-based development on `main`
- Short-lived branches when needed
- Conventional Commits required

## Domain Context

- Transactions include expenses and income/deposits
- Sources can arrive via upload, email forward, or API
- Parsing accuracy and UX are primary differentiators
- Modules include budgeting, assets, projections, household, and others

## Important Constraints

- Security-first handling of user data and receipts
- Modules enabled per instance via config (tenant toggles later)

## External Dependencies

- Cloudflare Workers platform
- Cloudflare Email Workers
- Cloudflare R2
- Neon Postgres
- PowerSync
- Better Auth
- Gemini 3 Flash multimodal LLM (receipt OCR/parsing)
- Additional services TBD
