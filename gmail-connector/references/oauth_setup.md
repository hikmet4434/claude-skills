# Gmail OAuth 2.0 Setup Guide

## Overview

This guide walks through setting up OAuth 2.0 authentication for Gmail API access.

## Prerequisites

1. Google Account
2. Google Cloud Console access

## Step-by-Step Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project (e.g., "Gmail Connector")
4. Click "Create"

### 2. Enable Gmail API

1. In the sidebar, go to "APIs & Services" → "Library"
2. Search for "Gmail API"
3. Click on "Gmail API"
4. Click "Enable"

### 3. Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" user type
3. Fill in required fields:
   - App name
   - User support email
   - Developer contact email
4. Click "Save and Continue"
5. On Scopes page, add these scopes:
   ```
   https://www.googleapis.com/auth/gmail.readonly
   https://www.googleapis.com/auth/gmail.send
   https://www.googleapis.com/auth/gmail.modify
   https://www.googleapis.com/auth/gmail.compose
   ```
6. Click "Save and Continue"
7. Add test users (your email for testing)
8. Click "Save and Continue"

### 4. Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: "Web application"
4. Name: "Gmail Connector"
5. Add Authorized redirect URI: `http://localhost:8080/oauth2callback`
6. Click "Create"
7. Copy the **Client ID** and **Client Secret**

### 5. Environment Configuration

Create a `.env` file with your credentials:

```env
GMAIL_CLIENT_ID=your_client_id_here
GMAIL_CLIENT_SECRET=your_client_secret_here
GMAIL_REDIRECT_URI=http://localhost:8080/oauth2callback
```

**Important**: Never commit this file to version control!

## Token Management

### Initial Authorization Flow

```
1. User initiates connection
2. Generate authorization URL with scopes
3. User grants permission in browser
4. Receive authorization code
5. Exchange code for tokens
6. Store refresh token securely
7. Use access token for API calls
```

### Token Refresh Flow

Access tokens expire after 1 hour. Implement automatic refresh:

```python
# Check token expiration before each request
if token_expired():
    new_token = refresh_access_token(refresh_token)
    store_new_token(new_token)
```

## Testing Your Setup

### OAuth Playground

Use [Google OAuth Playground](https://developers.google.com/oauthplayground/) to test:

1. Click gear icon (settings)
2. Check "Use your own OAuth credentials"
3. Enter your Client ID and Secret
4. Select required scopes
5. Click "Authorize" and complete the flow

### Verify Permissions

After authorization, test each scope:

```python
# Test read access
messages = gmail_service.users().messages().list(
    userId='me',
    maxResults=1
).execute()

# Test send capability
# (Send a test email to yourself)

# Test label management
labels = gmail_service.users().labels().list(
    userId='me'
).execute()
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Redirect URI mismatch" | Verify redirect URI in Cloud Console matches exactly |
| "Access denied" | Add your email as test user in OAuth consent screen |
| "Token expired" | Implement automatic token refresh |
| "Quota exceeded" | Implement request throttling and backoff |

## Security Checklist

- [ ] OAuth credentials stored securely (not in code)
- [ ] Refresh tokens encrypted at rest
- [ ] HTTPS only for all API calls
- [ ] Minimum required scopes requested
- [ ] Token expiration handled properly
- [ ] Sensitive data not logged

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `GMAIL_CLIENT_ID` | OAuth Client ID | Yes |
| `GMAIL_CLIENT_SECRET` | OAuth Client Secret | Yes |
| `GMAIL_REDIRECT_URI` | Callback URL | Yes |
| `GMAIL_TOKEN_FILE` | Path for token storage | No (default: ./token.json) |