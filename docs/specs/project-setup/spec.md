## Requirements

### Requirement: Monorepo workspace
The system SHALL define a PNPM workspace with apps and packages folders.

#### Scenario: Workspace structure exists
- **WHEN** a developer opens the repository root
- **THEN** apps/ and packages/ folders are present and registered in pnpm-workspace.yaml

### Requirement: Turborepo wiring
The system SHALL include a Turborepo pipeline that runs the workspace scripts and supports required quality gates.

#### Scenario: Run dev tasks
- **WHEN** a developer runs the turbo dev task
- **THEN** Turbo executes the dev scripts for configured workspaces

#### Scenario: Run quality tasks
- **WHEN** a developer runs turbo lint, test, or build
- **THEN** Turbo executes the matching workspace scripts

#### Scenario: Quality gates before merge
- **WHEN** a change is ready to merge
- **THEN** lint and test have been run successfully

#### Scenario: Build gating for app changes
- **WHEN** a change touches `apps/**` or shared packages used by the apps
- **THEN** the build task is run before merge

### Requirement: Test bar
The system SHALL require running lint and tests before merging changes that introduce or modify behavior.

#### Scenario: Significant change merged
- **WHEN** a change introduces or alters runtime behavior or user-facing UI
- **THEN** lint and test are run successfully before merge

### Requirement: Coverage target
The system SHALL maintain at least 90% line and branch coverage for workspace unit tests, without regressions.

#### Scenario: Coverage tracked
- **WHEN** coverage is reported for workspace tests
- **THEN** overall line and branch coverage are at least 90%

#### Scenario: Coverage regression
- **WHEN** a change would drop coverage below the target
- **THEN** the change adds tests or the coverage regression is resolved before merge

### Requirement: UI smoke flows
The system SHALL run UI smoke flows for UI changes when Maestro flows exist.

#### Scenario: UI change detected
- **WHEN** a change touches user-facing UI and Maestro flows exist in `maestro/` or `apps/**/maestro/`
- **THEN** the UI smoke flows run before merge

### Requirement: Expo app scaffold
The system SHALL provide an Expo app at apps/mobile with Expo Router enabled.

#### Scenario: Start development
- **WHEN** a developer runs the app development script
- **THEN** the Expo dev server starts with Router enabled

### Requirement: Expo web support
The system SHALL support web builds for the Expo app.

#### Scenario: Run web in development
- **WHEN** a developer starts the Expo app
- **THEN** the app can be opened in a web browser

### Requirement: App identity
The system SHALL define the Expo app name, slug, and bundle identifier.

#### Scenario: App metadata present
- **WHEN** the Expo app config is read
- **THEN** name is OpenFinance, slug is openfinance, and bundle id is com.andrevantonder.openfinance
