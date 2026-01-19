## ADDED Requirements
### Requirement: Email intake
The system SHALL receive and store incoming emails for module processing.

#### Scenario: Email received
- **WHEN** an email is received by the email worker
- **THEN** the email content and metadata are stored for module processing

### Requirement: Sender verification
The system SHALL verify sender identity before exposing an email to other modules.

#### Scenario: Sender passes verification
- **WHEN** an email arrives from a sender that passes DKIM/SPF checks and matches an authorized user
- **THEN** the email is marked as verified

#### Scenario: Sender fails verification
- **WHEN** an email arrives from a sender that fails DKIM/SPF checks or does not match an authorized user
- **THEN** the email is marked as unverified

### Requirement: Email hooks
The system SHALL allow other modules to subscribe to new verified emails.

#### Scenario: Module subscribes to verified emails
- **WHEN** a module registers a hook for verified emails
- **THEN** it receives new verified email events

### Requirement: Verified email access
The system SHALL expose only verified emails to other modules.

#### Scenario: Module requests inbox data
- **WHEN** a module requests email data
- **THEN** only verified emails are returned

### Requirement: Inbox listing
The system SHALL provide an inbox view of stored emails with verification status and a mailbox address for sending or forwarding emails.

#### Scenario: User opens inbox
- **WHEN** a user opens the inbox
- **THEN** emails are listed with verified or unverified status and the mailbox address is visible

#### Scenario: User copies mailbox address
- **WHEN** a user taps the copy control for the mailbox address
- **THEN** the mailbox address is copied for sending or forwarding emails

### Requirement: Inbox actions
The system SHALL allow users to manually verify, delete, and label emails.

#### Scenario: User manually verifies an email
- **WHEN** a user marks an email as verified
- **THEN** the email status updates and becomes available to modules

#### Scenario: User deletes an email
- **WHEN** a user deletes an email
- **THEN** the email is removed from the inbox

#### Scenario: User labels an email
- **WHEN** a user adds a label to an email
- **THEN** the label is stored and shown in the inbox
