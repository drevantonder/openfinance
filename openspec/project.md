# Project Context

## Purpose

Open-source modular personal finance app that saves people time in managing money. Designed to remove busywork, provide real insight, and stay simple without being shallow. Built on strong foundations so the product can evolve quickly.

## Features

- Save time tracking expenses and income with photos, forwarded emails, and uploads with AI-powered extraction
- See how your budget compares to real spending, with simple trends and suggestions
- Set aside the right amount each week/fortnight/month for upcoming goals
- Plan big goals like a house deposit with projections and what-if scenarios
- Use it with your family so everyone can add expenses and see the same picture
- Web, iOS, and Android apps
- Open source so you can self-host and contribute

## Tech Stack

- Expo (mobile + web): fast native iOS/Android plus web for early momentum; native web later
- Tamagui: Expo-friendly UI kit for consistent styling
- Turborepo: simple monorepo wiring for apps/packages
- PNPM: fast package manager with workspace support
- Hono API: small, fast API layer that runs well on Cloudflare Workers
- Cloudflare Workers: low-ops edge runtime for API and email ingestion
- Cloudflare Email Workers: receive forwarded mail for processing
- Cloudflare AI Gateway: logging, caching, and analytics for LLM calls
- Cloudflare R2: low-cost blob storage for images, PDFs, and email files
- PowerSync: local-first sync so the mobile app stays fast and offline-friendly
- Postgres (Neon): PowerSync’s best fit with managed Postgres, no ops
- Better Auth: works with Neon and Expo
- Gemini 3 Flash: fast multimodal model for images, PDFs, and email text
- PostHog: analytics, performance, error tracking
- Expo Push Notifications: mobile push delivery

## Architecture Decisions

- Expo vs PWA/native: iOS PWA support is weak; Expo is the best cross-platform path today and still supports web. Shared TypeScript core keeps logic reusable if we add a dedicated web app later.
- Cloudflare: familiar stack with Email Workers, AI Gateway, R2, and good Neon integration.
- Modular architecture: features can be enabled by config now, with a path to per-household toggles, plugins, and region-specific variants later.
- Split testing stack: Jest + jest-expo for Expo UI (best supported), Vitest for shared logic, Vitest pool for Workers runtime accuracy.

## Project Conventions

### Code Style

- Formatting: Prettier + ESLint (Expo defaults: eslint-config-expo)
- Naming: camelCase for variables/functions, PascalCase for components/types, kebab-case for package names
- File naming: components in PascalCase, utilities in camelCase, packages/apps in kebab-case

### Architecture Patterns

- Monorepo with `apps/` and `packages/` and a shared TypeScript domain core
- Core shell (auth, navigation, settings) with opt-in feature modules
- Module registry with instance-level config toggles (per-household toggles later)
- Email ingestion via mailbox worker, normalized into a shared pipeline
- Receipt parsing pipeline: upload -> extract -> normalize -> validate -> persist
- Local-first sync for mobile using PowerSync

### Testing Strategy

- Vitest for shared/domain logic
- Vitest + @cloudflare/vitest-pool-workers for Workers/Hono API tests
- Jest + jest-expo for Expo UI/unit tests
- Maestro for critical mobile flows when UI exists

### Git Workflow

- Trunk-based development on `main`
- Short-lived branches when needed
- Conventional Commits required

## Domain Context

- Sources can arrive via upload, email forward, or API
- Receipts and sources can be merged for a single transaction
- Parsing accuracy and capture speed are primary differentiators
- Household is the primary account scope for now

## Important Constraints

- Security-first handling of user data and receipts
- Modules enabled per instance via config (no per-household toggles yet)

## External Dependencies

- Cloudflare Workers platform
- Cloudflare Email Workers
- Cloudflare AI Gateway
- Cloudflare R2
- Neon Postgres
- PowerSync
- Better Auth
- Gemini 3 Flash multimodal LLM (receipt OCR/parsing)
- Additional services TBD

## Future Direction (To Be Specced)

Lightweight placeholders for scope we know we want, but have not specified yet. Kept here to avoid losing direction without over-committing to details.

- [ ] Audit trail: record who changed what and when
- [ ] Bank integration: structured bank feed imports
- [ ] Internal transfers: transfer tracking between accounts
- [ ] Capture widgets: lock screen widget entry
- [ ] Capture live status: live activity updates during capture
- [ ] Capture shortcuts: Siri Shortcuts to launch capture
- [ ] Capture cropping: local cropping before upload
