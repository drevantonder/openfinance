## MODIFIED Requirements
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

## ADDED Requirements
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
