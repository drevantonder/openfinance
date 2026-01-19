## ADDED Requirements
### Requirement: Household members
The system SHALL allow users to create household members with name and active status (default: enabled). Household members SHALL be scoped to a household.

#### Scenario: Household member created
- **WHEN** a user creates a household member
- **THEN** the system stores the member name and active status

#### Scenario: Household members viewed
- **WHEN** a household member views household data
- **THEN** they can view household members

### Requirement: HECS debts
The system SHALL allow users to create HECS debts linked to household members with balance, balance date, and scheduled additions.

#### Scenario: HECS debt created
- **WHEN** a user creates a HECS debt
- **THEN** the system stores balance, balance date, scheduled additions, and the linked household member

#### Scenario: HECS debts viewed
- **WHEN** a household member views household data
- **THEN** they can view HECS debts

#### Scenario: HECS debt scheduled addition
- **WHEN** a user adds a scheduled addition
- **THEN** the addition stores date and amount

### Requirement: Household settings
The system SHALL register a Household section in shared settings for managing household members and HECS debts.

#### Scenario: Household section shown
- **WHEN** a user opens settings
- **THEN** a Household section is available
