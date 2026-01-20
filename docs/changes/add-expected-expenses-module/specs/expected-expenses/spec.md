## ADDED Requirements
### Requirement: Expected expense targets
The system SHALL allow users to create expected expense targets with title, amount, activity category, and active status (default: enabled). The activity category type MUST be expense.

#### Scenario: Expected expense target created
- **WHEN** a user creates an expected expense target
- **THEN** the system stores title, amount, activity category, and active status

#### Scenario: Category type mismatch
- **WHEN** a user selects a non-expense activity category
- **THEN** the system blocks saving and prompts for an expense category

### Requirement: Target schedules
The system SHALL support recurring and once-off schedules for expected expense targets, and recurring targets SHALL reset each period with no carryover.

#### Scenario: Recurring target schedule
- **WHEN** a user selects a recurring schedule
- **THEN** they can choose weekly, fortnightly, monthly, quarterly, or yearly with optional start and end dates

#### Scenario: Once-off target schedule
- **WHEN** a user selects a once-off schedule
- **THEN** they must set a target date for the expected expense target

#### Scenario: Recurring period reset
- **WHEN** a recurring period ends
- **THEN** the next period starts with the full target amount and no carryover

### Requirement: Expected expenses settings
The system SHALL register an Expected Expenses section in shared settings to create, update, and delete expected expense targets.

#### Scenario: Expected expenses section shown
- **WHEN** a user opens settings
- **THEN** an Expected Expenses section is available

#### Scenario: Expected expense target managed
- **WHEN** a user edits an expected expense target
- **THEN** the updated target details are saved

### Requirement: Target export hooks
The system SHALL expose a read-only export of expected expense targets for other modules to consume, including target id, title, amount, activity category id, schedule, and active status.

#### Scenario: Module reads expected expense targets
- **WHEN** another module requests expected expense targets
- **THEN** the latest active targets are returned with target id, title, amount, activity category id, schedule, and active status

### Requirement: Savings targets
The system SHALL allow savings targets as once-off expected expense targets with a target date.

#### Scenario: Savings target created
- **WHEN** a user creates a savings target
- **THEN** the target includes a target date
