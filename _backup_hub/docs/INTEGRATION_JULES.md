# Jules & Bing Webmasters Integration

This document details the connection architecture between **Jules AI**, **Connector App**, and **Bing Webmasters API**.

## 🔗 OAuth 2.0 Flow

We use OAuth 2.0 to securely authorize access to Bing Webmasters data on behalf of the user.

### 1. Application Registration (Bing Webmasters)
- **Name:** Jules Connector
- **Redirect URI (Dev):** `http://localhost:3000/api/auth/callback/bing`
- **Redirect URI (Prod):** `https://connector-app-flame.vercel.app/api/auth/callback/bing`

### 2. Environment Variables
The application requires the following secrets (stored in Vercel Environment Variables):

| Variable | Description |
|---|---|
| `BING_CLIENT_ID` | OAuth Client ID from Bing Webmasters |
| `BING_CLIENT_SECRET` | OAuth Client Secret from Bing Webmasters |
| `NEXTAUTH_SECRET` | Secret for session encryption (if using NextAuth) |
| `NEXTAUTH_URL` | Base URL of the app (canonical) |

### 3. The Flow
1. User clicks "Connect Bing" in Connector App.
2. App redirects to Bing OAuth URL.
3. User grants permission.
4. Bing redirects back to `Redirect URI` with an authorization `code`.
5. Connector App exchanges `code` for `access_token` and `refresh_token`.
6. Tokens are securely stored (encrypted DB or session).
7. Jules AI uses the `access_token` to fetch SEO data.

## 🤖 Jules AI Role
- Jules does not store raw credentials.
- Jules interacts with the Connector API to request data.
- Connector handles the authentication and API calls to Bing.

## 🛡️ Best Practices
- **Token Rotation:** Refresh tokens are used to maintain access without re-login.
- **Least Privilege:** Request only necessary scopes from Bing.
- **Encryption:** Tokens must be encrypted at rest.
