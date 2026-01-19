## ADDED Requirements
### Requirement: Core shell
The system SHALL provide a shared shell for authentication, navigation, and settings.

#### Scenario: Signed-in user opens the app
- **WHEN** a user signs in successfully
- **THEN** the shell loads the dashboard and settings access

### Requirement: Authentication
The system SHALL support sign-in and sign-out for users.

#### Scenario: User signs in
- **WHEN** a user signs in successfully
- **THEN** the dashboard is available and session access is granted

#### Scenario: User signs out
- **WHEN** a signed-in user signs out
- **THEN** the session is cleared and the user is returned to the login page

#### Scenario: User is unauthenticated
- **WHEN** a user is not signed in
- **THEN** the login page is shown

### Requirement: User accounts
The system SHALL store user profile data and roles for access control.

#### Scenario: User profile created
- **WHEN** a new user is invited or signs up
- **THEN** the system stores the user email, name, picture, and role

### Requirement: Dashboard widgets
The system SHALL allow modules (discrete feature areas enabled by configuration) to inject widgets into the dashboard.

#### Scenario: Required widgets present
- **WHEN** the dashboard renders and the Activity module is enabled
- **THEN** it includes expenses by top-level category and actual expenses vs income

#### Scenario: No widgets available
- **WHEN** the dashboard renders and no modules provide widgets
- **THEN** the dashboard shows a no-widgets state

### Requirement: Navigation patterns
The system SHALL provide a desktop sidebar and a mobile bottom navigation with a more menu.

#### Scenario: User switches navigation modes
- **WHEN** the user opens the app on desktop or mobile
- **THEN** the matching navigation pattern is shown

### Requirement: Extensible navigation
The system SHALL allow modules to optionally register navigation entries (label + route) with placement hints (primary navigation or settings).

#### Scenario: Module adds primary navigation entry
- **WHEN** a module registers a primary navigation entry
- **THEN** it appears in the current navigation layout (desktop sidebar or mobile bottom navigation)

#### Scenario: Module adds settings entry
- **WHEN** a module registers a settings entry with title, icon, slug, and renderable UI component
- **THEN** it appears as a section in the shared settings area

#### Scenario: Module registers no navigation
- **WHEN** a module registers no navigation entry
- **THEN** no navigation item is added for that module

### Requirement: Module registry
The system SHALL load zero or more modules enabled by instance configuration at startup.

#### Scenario: Module disabled by config
- **WHEN** a module is disabled in instance configuration
- **THEN** it is not loaded and exposes no navigation or widgets

#### Scenario: No modules enabled
- **WHEN** no modules are enabled in instance configuration
- **THEN** the shell still loads with empty navigation and dashboard

#### Scenario: Module adds primary navigation entry
- **WHEN** a module registers a primary navigation entry
- **THEN** it appears in the current navigation layout (desktop sidebar or mobile bottom navigation)

#### Scenario: Module adds settings entry
- **WHEN** a module registers a settings entry with title, icon, slug, and renderable UI component
- **THEN** it appears as a section in the shared settings area

#### Scenario: Module registers no navigation
- **WHEN** a module registers no navigation entry
- **THEN** no navigation item is added for that module

### Requirement: Admin settings
The system SHALL let admins manage user access and edit module variables.

#### Scenario: Admin updates global variables
- **WHEN** an admin updates a module variable in settings
- **THEN** the new value is saved and available to modules

### Requirement: Module variables
The system SHALL provide a shared settings store for module-owned variables, keyed by module id and variable key.

#### Scenario: Module reads own variable
- **WHEN** a module requests one of its variables
- **THEN** the latest configured value is returned

#### Scenario: Module reads allowlisted variable
- **WHEN** a module requests another module’s variable that is allowlisted for sharing
- **THEN** the latest configured value is returned
