## Requirements

### Requirement: Monorepo workspace
The system SHALL define a PNPM workspace with apps and packages folders.

#### Scenario: Workspace structure exists
- **WHEN** a developer opens the repository root
- **THEN** apps/ and packages/ folders are present and registered in pnpm-workspace.yaml

### Requirement: Turborepo wiring
The system SHALL include a Turborepo pipeline that runs the workspace scripts.

#### Scenario: Run dev tasks
- **WHEN** a developer runs the turbo dev task
- **THEN** Turbo executes the dev scripts for configured workspaces

#### Scenario: Run quality tasks
- **WHEN** a developer runs turbo lint, test, or build
- **THEN** Turbo executes the matching workspace scripts

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
