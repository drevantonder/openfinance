# V2 Architecture Reference (Legacy)

> **Note:** This is a short-lived legacy reference from the earlier V2 design. It is copied here to avoid context loss while we migrate intent and requirements into the new docs workflow, and will be deleted once that migration is complete. It is **not** the current source of truth. Use `docs/project.md` and `docs/specs/` for current direction.

---

# V2 Architecture Specification

> **Context:** This document outlines the architecture and requirements for the complete rewrite of the application (referred to as V2).
> **Logic Reference:** For specific business rules (Tax, HECS, TMN), see `docs/DOMAIN.md`.

## 3. Feature Modules

### Budget vs Reality Module (rename to Budgeting Module)
**Goal:** Compare expected targets to actuals and recommend adjustments, including cash-on-hand guidance and target allocations.

**Key Features:**
- **Target Inputs:** Expected Expenses targets (export hook) + Expected Income (from Income module).
- **Actual Inputs:** Activity transactions and balances.
- **Cash Planning:** Recommend current cash-on-hand to stay on track; break down recommended cash by target.
- **Automated Matching:** AI + Fuzzy match (Category/Merchant) to link actuals to expected targets.
- **Suggestions:**
  - "Unplanned expense appeared 3+ times" → Suggest adding expected expense.
  - "Expected expense unused for 2+ months" → Suggest disabling.
  - "Repeated non-recorded expense" → Suggest adding.

**User Interface:**
- **Dashboard Widget:** "Budgeting" or "Expected vs Reality" chart.
- **Matching UI:** Interface to confirm or correct matches.

### Income Sources Module
**Goal:** Define revenue streams.

**Data Entities:**
- **Source:** Title, Type (Salary/Centrelink/etc), Start/End Date, Enabled (Default: Yes), **User Link**.
- *Logic:* Every income source is linked to a specific User. Household Income is a computed view summing all active Users.

**User Interface:**
- **Income Settings:** CRUD interface for sources.

### Power to Change Module
**Goal:** Specific functionality for missionary work.

**Key Features:**
- **Income Source:** Adds "TMN" (Total Monthly Needs) type.
- **Claim Forms:** Assist with generating reimbursement claims from Expenses.

---

## 4. Wealth & Assets Modules

### Assets Core
**Goal:** Track net worth and project future growth.

**Data Entities:**
- **Asset Types:** Bank Accounts, **Physical Cash** (Wallet/Stash), Stocks, Crypto.
- **Surplus Strategy:** Max investable surplus, target allocations, Investment Frequency.
- **History:** Daily snapshots (Midnight UTC) of all asset balances for historical graphing.
- *Note:* Bank balances are currently manual updates. System snapshots the 'last known' balance until automated integration is built.

**Key Features:**
- **Projection Engine:** Project asset growth based on surplus and investment returns.
- **Notifications:** Alert when surplus thresholds are reached ("Ready to invest").
- **FHSS Support:** First Home Super Saver scheme logic (15% tax vs marginal).

**User Interface:**
- **Assets Page:**
  - Projection Charts.
  - Investment/Cash Management (Edit/Delete Holdings).
  - **Countdown UI:** "Days until next recommended investment".

### Stock Market
**Goal:** Track equity investments.

**Key Features:**
- **Market Data:** Fetch prices via `yahoo-finance2`.
- **Holdings:** Track quantity and cost basis.
- **Projection:** Estimate growth based on historical/assumed returns.
- *Integration:* Adds projected growth to Assets Module.

### Crypto
**Goal:** Track cryptocurrency investments.

**Key Features:**
- Fetch live values.
- Track holdings and project growth.

---

## 5. Domain Modules

### House Goal Module
**Goal:** Model the path to purchasing a home in Australia.
*(See `docs/DOMAIN.md` for detailed Calculation Rules)*

**Data Entities:**
- Target Date, Target Price.
- Costs (Stamp Duty, Legal, Pest/Building).

**Key Features:**
- **Borrowing Power:** Calculate Serviceability and DTI limits (uses Household income/HECS).
- **Deposit Projection:** Use Assets Module to project deposit at Target Date.
- **Buying Costs:** Calculate Stamp Duty (including FHB concessions) and waivers.
- **"What If" Scenarios:**
  - "Increase TMN by $500?"
  - "Delay purchase 6 months?"
  - **Calculations:** Instant slider-based recalculation.

---

## 6. Quality & Testing Strategy

**Goal:** Ensure correctness of financial logic and stability of the mobile app.

### 6.1 Domain Logic Testing
- **Scope:** All logic in `packages/domain` (Tax, HECS, DTI, Projections).
- **Tool:** `Vitest`.
- **Standard:** **100% Test Coverage** required. No PR merges without full coverage for domain logic.
- **Structure:**
  - Unit tests for individual calculators (e.g., `calculateIncomeTax`).
  - Scenario tests for complex flows (e.g., "Full 5-year projection for a couple with HECS").

### 6.2 Mobile App Testing
- **Tool:** `Maestro` (End-to-End testing).
- **Scope:** Critical user flows (Login, Capture Expense, View Dashboard).
- **Standard:** Smoke tests must pass on CI.

### 6.3 API Testing
- **Tool:** `Vitest` (Integration mode).
- **Scope:** API endpoints (Hono).
- **Strategy:** Test against a temporary Postgres instance to verify DB writes and PowerSync logic.

---

## 7. Migration Strategy

**Goal:** Transition data from V1 (Cloudflare D1) to V2 (Neon Postgres) with zero data loss.

### 7.1 Data Mapping
- **Users:** Migrated to Better Auth tables.
- **Expenses:** Mapped to new `Transaction` schema.
- **Assets:** Snapshots preserved for historical graphs.

### 7.2 Migration Process
1.  **Export:** Create a script to dump D1 data to JSON.
2.  **Transform:** TypeScript script to map JSON -> V2 Schema.
3.  **Import:** Bulk insert into Neon Postgres.
4.  **Verify:** Automated check of totals (e.g., "Sum of all expenses in V1 == Sum in V2").

---

## 8. Implementation Timeline

### Phase 0: Foundation
- **Core:** Auth, Database, Sync, User Settings.
- **Testing:** Setup Vitest & CI pipeline.
- **Communication:** Email Module (Worker + Inbox).
- **Finance:** Expense & Income Module (Capture, AI, Management).

### Phase 1: Wealth & Strategy
- **Domain:** Migrate and test all logic in `packages/domain`.
- **Modules:** Budget, Household, Assets, Stocks, Crypto.
- **Feature:** House Goal & Projections.
- **Integration:** Power to Change logic.

### Phase 2 / Future
- **Integrations:** Frollo (Bank Sync).
- **Platform:** Web App (full framework), Android Widgets.
- **Advanced:** Multi-tenant/Multi-family support, MCP Server, Siri Integration.
- **Self-Hosting:** Option to self-host Postgres/PowerSync.

---

## 9. Open Decisions & Unknowns
- **Deployment:** Use EAS (Expo Application Services) or just Cloudflare? Or both?
- **Backup:** How to backup R2 storage? (Potential: Sync R2 -> Backblaze B2).
- **Stock/Crypto:** Confirm handling of dividends and distributions.
