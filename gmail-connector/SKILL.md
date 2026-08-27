---
name: gmail-connector
description: Connect to Gmail accounts using OAuth 2.0 for secure access. Use when users want to read emails, send messages, manage drafts, or organize emails with labels. Trigger phrases include "connect my Gmail", "check my emails", "send an email", "manage Gmail drafts", "organize my inbox", "Gmail labels".
---

# Gmail Connector Skill

Connect and manage Gmail accounts securely using OAuth 2.0 authentication.

## Authentication Setup

### OAuth 2.0 Configuration

1. **Prerequisites**:
   - Google Cloud Console project with Gmail API enabled
   - OAuth 2.0 credentials (Client ID and Client Secret)

2. **Required Scopes**:
   - `https://www.googleapis.com/auth/gmail.readonly` - Read emails
   - `https://www.googleapis.com/auth/gmail.send` - Send emails
   - `https://www.googleapis.com/auth/gmail.modify` - Manage labels
   - `https://www.googleapis.com/auth/gmail.compose` - Draft operations

3. **Environment Variables** (store securely):
   ```
   GMAIL_CLIENT_ID=your_client_id
   GMAIL_CLIENT_SECRET=your_client_secret
   GMAIL_REDIRECT_URI=http://localhost:8080/oauth2callback
   ```

## Core Operations

### 1. Connect Gmail Account

**Process**:
1. Generate OAuth authorization URL
2. User grants permissions
3. Exchange authorization code for tokens
4. Store refresh token securely

**Implementation**:
- Use Google Auth Library for token management
- Implement secure token storage
- Handle token refresh automatically

### 2. Read Emails

**Capabilities**:
- List inbox messages with pagination
- Search emails by subject, sender, date, content
- Get message details (headers, body, attachments)
- Filter by labels (INBOX, SPAM, STARRED, etc.)

**Usage**:
```
Action: list_messages
Parameters:
  - max_results: number (default: 10)
  - label: string (optional)
  - query: string (optional)
```

### 3. Send Emails

**Capabilities**:
- Compose and send new emails
- Reply to existing threads
- Add attachments (files, inline images)
- Set CC/BCC recipients

**Usage**:
```
Action: send_email
Parameters:
  - to: string (required)
  - subject: string (required)
  - body: string (required)
  - cc: string[] (optional)
  - bcc: string[] (optional)
  - attachments: string[] (optional)
```

### 4. Manage Drafts

**Capabilities**:
- Create new drafts
- Update existing drafts
- Delete drafts
- List all drafts

**Usage**:
```
Action: manage_drafts
Parameters:
  - action: create | update | delete | list
  - draft_id: string (required for update/delete)
  - to: string (required for create/update)
  - subject: string (required for create/update)
  - body: string (required for create/update)
```

### 5. Manage Labels/Folders

**Capabilities**:
- List all labels
- Create custom labels
- Apply/remove labels from messages
- Manage label settings

**Usage**:
```
Action: manage_labels
Parameters:
  - action: list | create | apply | remove
  - label_name: string (required for create)
  - message_id: string (required for apply/remove)
```

## Error Handling

| Error Code | Description | Resolution |
|------------|-------------|------------|
| AUTH_001 | OAuth token expired | Refresh token automatically |
| AUTH_002 | Invalid credentials | Re-authenticate user |
| QUOTA_001 | API quota exceeded | Wait and retry with backoff |
| QUOTA_002 | Rate limit hit | Implement request throttling |

## Security Best Practices

1. **Token Storage**: Never store tokens in plain text; use encrypted storage
2. **Refresh Tokens**: Implement automatic refresh before expiration
3. **Scopes**: Request minimum required scopes only
4. **HTTPS**: Always use secure connections for API calls
5. **Logging**: Never log sensitive email content or tokens

## Quick Reference

| Operation | Method | Required Scope |
|-----------|--------|----------------|
| Read inbox | `messages.list` | gmail.readonly |
| Send email | `messages.send` | gmail.send |
| Create draft | `drafts.create` | gmail.compose |
| Manage labels | `labels.create` | gmail.modify |

## Testing

Run validation:
```bash
python scripts/quick_validate.py /workspace/temp-skills/gmail-connector
```

Package skill:
```bash
python scripts/package_skill.py /workspace/temp-skills/gmail-connector
```