## ADDED Requirements
### Requirement: Activity transactions
The system SHALL store financial activity transactions for expenses and income with merchant names, titles, dates, totals, currencies, exchange rates, and status.

#### Scenario: Activity transaction captured
- **WHEN** an expense or income transaction is created
- **THEN** the system stores the merchant name, title, created date, invoice date, incurred date, original total, original currency, converted total, converted currency, tax total, exchange rate, and status

### Requirement: Activity line items
The system SHALL store line items with units, quantities, costs, tax flags, and categories for activity transactions.

#### Scenario: Activity line items stored
- **WHEN** an expense or income transaction includes line items
- **THEN** each line item includes unit, quantity, cost, taxable status, and category

### Requirement: Activity sources
The system SHALL store sources with type (image, email, manual) and raw content for each activity transaction.

#### Scenario: Activity source captured
- **WHEN** a source is added to an expense or income transaction
- **THEN** the system stores the source type and raw content

### Requirement: Source metadata
The system SHALL store the AI model version used when a source is processed.

#### Scenario: Activity source processed
- **WHEN** a source for an expense or income transaction is processed by AI
- **THEN** the AI model version is stored with the source metadata

### Requirement: Activity categories
The system SHALL store activity categories with titles, descriptions, colors, parent categories, and a category type (expense or income). Category descriptions SHALL be provided to AI extraction to improve categorization. Activity categories SHALL be scoped to a household.

#### Scenario: Activity category created
- **WHEN** an activity category is created
- **THEN** the category includes title, description, color, optional parent category, and a category type

#### Scenario: Category description used for extraction
- **WHEN** the system runs AI categorization
- **THEN** activity category descriptions are provided as context

#### Scenario: Household categories shared
- **WHEN** a household member views categories
- **THEN** household categories are available to them

### Requirement: Category access control
The system SHALL allow only admins to create, update, or delete activity categories.

#### Scenario: Admin edits category
- **WHEN** an admin updates an activity category
- **THEN** the changes are saved

#### Scenario: Non-admin edits category
- **WHEN** a non-admin attempts to update an activity category
- **THEN** the action is blocked

### Requirement: Category settings entry
The system SHALL register a settings entry for managing activity categories in the shared settings area for admins and explain that descriptions help auto-categorization.

#### Scenario: Category settings shown
- **WHEN** an admin opens settings
- **THEN** an Activity Categories section is available for managing categories

#### Scenario: Category settings hidden
- **WHEN** a non-admin opens settings
- **THEN** the Activity Categories section is not available

#### Scenario: Category description guidance shown
- **WHEN** an admin edits an activity category
- **THEN** helper text explains that descriptions improve automatic categorization

### Requirement: Activity capture entry points
The system SHALL provide capture entry points for expense and income activity intake.

#### Scenario: User taps capture
- **WHEN** the user triggers capture from the primary capture action
- **THEN** the system opens the capture flow

### Requirement: Photo stack capture
The system SHALL allow users to capture multiple receipt images and PDFs in a photo stack for background processing.

#### Scenario: User captures multiple receipts
- **WHEN** a user adds multiple receipt images or PDFs
- **THEN** they are grouped into a photo stack for background processing

### Requirement: Email capture
The system SHALL extract attachments and body text (HTML or text) from the verified email inbox for activity processing.

#### Scenario: Email extracted
- **WHEN** a verified email is available in the inbox
- **THEN** attachments and body text are extracted for activity processing

### Requirement: Activity AI processing
The system SHALL use multimodal AI to extract expense and income activity data from sources.

#### Scenario: Source processed
- **WHEN** a receipt image, PDF, or email body is processed
- **THEN** the system extracts merchant, dates, totals, and line items

### Requirement: Input filtering
The system SHALL filter non-activity inputs without deleting them and allow users to include them after review.

#### Scenario: Input filtered
- **WHEN** the system detects a non-activity input
- **THEN** it is filtered from the activity feed but remains available to review and include

### Requirement: Source aggregation
The system SHALL aggregate multiple sources for a single activity transaction using all available sources together.

#### Scenario: Sources aggregated
- **WHEN** an expense or income transaction has multiple sources
- **THEN** the system uses all sources together to derive activity details

### Requirement: Source de-duplication
The system SHALL merge duplicate sources using confidence scores before transaction-level merging.

#### Scenario: Duplicate sources detected
- **WHEN** two sources are detected as duplicates
- **THEN** they are merged into a single source using confidence scores

### Requirement: Activity transaction de-duplication
The system SHALL merge duplicate expense or income transactions using confidence scores and re-process when details conflict.

#### Scenario: Duplicate transactions detected
- **WHEN** two activity transactions are detected as duplicates
- **THEN** they are merged into a single transaction using confidence scores

#### Scenario: Duplicate merge conflict
- **WHEN** duplicate transactions disagree on key details during a merge
- **THEN** the transaction is re-processed and marked needs-review for human confirmation

#### Scenario: Duplicate merge undone
- **WHEN** a user undoes a duplicate merge
- **THEN** the original transactions are restored

### Requirement: Activity notifications
The system SHALL notify users when new expense or income activity is detected.

#### Scenario: New activity detected
- **WHEN** a new expense or income transaction is detected
- **THEN** a notification is sent to the user

### Requirement: Activity feed sorting
The system SHALL default activity feed sorting to invoice date descending, with options for processed date and total.

#### Scenario: Activity feed default sort
- **WHEN** a user opens the activity feed
- **THEN** items are sorted by invoice date descending

#### Scenario: Activity feed alternate sort
- **WHEN** a user selects a different sort
- **THEN** items can be sorted by processed date or total

### Requirement: Activity feed filtering
The system SHALL allow activity feed filtering by category, source, cost, date, and status.

#### Scenario: Activity feed filters applied
- **WHEN** a user applies filters
- **THEN** the feed shows only items matching the selected filters

### Requirement: Activity feed search
The system SHALL support search across merchant, category, amount, date, source, and status, including amount and date filtering.

#### Scenario: Activity feed search
- **WHEN** a user enters a search query or filters by amount or date
- **THEN** matching activity transactions are shown in the feed

### Requirement: Activity feed indicators
The system SHALL show indicators for processing, duplicate, needs-review, and confirmed activity statuses.

#### Scenario: Activity feed indicators shown
- **WHEN** activity transactions are listed in the feed
- **THEN** processing, duplicate, needs-review, and confirmed indicators are visible

### Requirement: Bulk actions
The system SHALL provide bulk actions for delete, reprocess, and merge in the activity feed.

#### Scenario: Bulk actions applied
- **WHEN** a user selects multiple transactions
- **THEN** they can delete, reprocess, or merge the selected items

### Requirement: Detail view conflict warning
The system SHALL highlight conflicts when sources disagree.

#### Scenario: Conflict detected
- **WHEN** sources for a transaction disagree on key details
- **THEN** the detail view highlights the conflict

### Requirement: Detail view split layout
The system SHALL show a split view of parsed details and source content in the transaction detail view.

#### Scenario: Detail view opened
- **WHEN** a user opens a transaction
- **THEN** parsed details and source content are shown in a split layout

### Requirement: Source tabs
The system SHALL show source tabs labeled with AI-determined document names for each source.

#### Scenario: Source tabs rendered
- **WHEN** multiple sources are attached to a transaction
- **THEN** each source tab displays a document name derived by AI

### Requirement: Detail edit mode
The system SHALL provide a receipt-style edit layout for transaction details.

#### Scenario: Detail edit mode opened
- **WHEN** a user enters edit mode
- **THEN** the transaction details are shown in a receipt-style layout

### Requirement: Capture navigation
The system SHALL present capture as the primary action in navigation.

#### Scenario: Capture action visible
- **WHEN** the user views the main navigation
- **THEN** the capture action is prominent on mobile and desktop

### Requirement: Dashboard widgets
The system SHALL provide dashboard widgets for top-level category spending and actual expenses vs income.

#### Scenario: Dashboard widgets present
- **WHEN** the dashboard loads and the module is enabled
- **THEN** the widgets show top-level category spending and actual expenses vs income
