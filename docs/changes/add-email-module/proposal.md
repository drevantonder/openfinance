# Change: Email module

## Why
People need a safe inbox to forward receipts and share verified emails with other modules.

## What Changes
- Receive and store incoming emails with metadata for module processing.
- Verify senders with DKIM/SPF and authorized user checks.
- Provide an inbox view with verification status and mailbox address.
- Allow users to verify, delete, and label emails.
- Expose hooks so other modules see only verified emails.
