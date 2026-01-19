## ADDED Requirements
### Requirement: Household members
The system SHALL allow admins to create household members with name and active status (default: enabled). Household members SHALL be scoped to a household.

#### Scenario: Household member created
- **WHEN** an admin creates a household member
- **THEN** the system stores the member name and active status

#### Scenario: Household members viewed
- **WHEN** a household member views household data
- **THEN** they can view household members

#### Scenario: Non-admin creates member
- **WHEN** a non-admin attempts to create a household member
- **THEN** the action is blocked

### Requirement: HECS debts
The system SHALL allow admins to create HECS debts linked to household members with balance, balance date, and scheduled additions.

#### Scenario: HECS debt created
- **WHEN** an admin creates a HECS debt
- **THEN** the system stores balance, balance date, scheduled additions, and the linked household member

#### Scenario: HECS debts viewed
- **WHEN** a household member views household data
- **THEN** they can view HECS debts

#### Scenario: HECS debt scheduled addition
- **WHEN** an admin adds a scheduled addition
- **THEN** the addition stores date and amount

### Requirement: Household settings
The system SHALL register a Household section in shared settings for managing household members and HECS debts.

#### Scenario: Household section shown
- **WHEN** an admin opens settings
- **THEN** a Household section is available

#### Scenario: Household section hidden
- **WHEN** a non-admin opens settings
- **THEN** the Household section is not available
