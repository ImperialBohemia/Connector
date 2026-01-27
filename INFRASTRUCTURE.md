# Infrastructure Index

This document maps the external systems (GitHub & Vercel) that power the **Connector**.
It serves as a "Brain Extension" to ensure rapid configuration and troubleshooting.

## 1. GitHub Configuration
**Status:** ✅ **Active** (Absolute Autonomy Pipeline)
**Workflow:** `.github/workflows/autonomy.yml`

### Pipeline Architecture: "Chat -> Live Web"
1.  **Trigger**: Any push to `main` (initiated by Agent Jules).
2.  **Action**:
    *   Installs dependencies (`npm ci`).
    *   Executes `npm run deploy` (The "Connector" script).
3.  **Deployment Logic**:
    *   **Brain Sync**: Pushes code to `ImperialBohemia/Connector`.
    *   **Live Body Sync**: Force pushes code to `ImperialBohemia/VercelWeb`.
    *   **Vercel Build**: Automatically triggered by the push to `VercelWeb`.

---

## 2. Visual Verification System ("Connector Eyes")
The system is self-aware and verifies its own visual integrity.

| Verification Level | Tool | Check |
| :--- | :--- | :--- |
| **Logic** | `npm run audit` | SEO depth, keyword density, title length. |
| **Visual (Mobile)** | `verification/verify_final.py` | iPhone 13 rendering of Verdict Box, Sticky Headers, readability. |
| **Visual (Desktop)** | `verification/verify_final.py` | 1280px layout, Sidebar presence, Trust Signals. |
| **Legal** | `verification/verify_final.py` | Existence of Footer Links (Privacy/Terms) & Cookie Consent. |

---

## 2. Vercel Configuration
**Project Name:** `connector-app`
**Production URL:** `https://connector-app-flame.vercel.app`

### 2.1 Environment Variables (Required)
The following keys **must** be present in Vercel Project Settings > Environment Variables.

| Variable | Purpose | Location in Code |
| :--- | :--- | :--- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google Sheets CMS Auth | `lib/sheets.ts` |
| `GOOGLE_PRIVATE_KEY` | Google Sheets CMS Auth | `lib/sheets.ts` |
| `GOOGLE_SHEET_ID` | Google Sheets CMS Database ID | `lib/sheets.ts` |
| `INDEXNOW_KEY` | Bing Indexing Authentication | `scripts/submit-indexnow.ts` |
| `CRON_SECRET` | Secures Cron API endpoints | `api/cron/*` |
| `NEXT_PUBLIC_SITE_URL` | Absolute URLs for SEO/Sitemap | `app/layout.tsx` |

### 2.2 Cron Jobs (`vercel.json`)
The system performs automated tasks via Vercel Cron.

| Path | Schedule | Purpose |
| :--- | :--- | :--- |
| `/api/cron/indexnow` | `0 0 * * *` (Daily) | Pings Bing with updated URLs. |

---

## 3. Data Flow Architecture

```mermaid
graph TD
    User[User/Agent] -->|Update Row| Sheets[Google Sheets]
    Sheets -->|ISR Revalidation| Vercel[Vercel Deployment]
    Vercel -->|Generate| Pages[Static Pages (First Web)]
    Vercel -->|Cron| IndexNow[IndexNow Script]
    IndexNow -->|Ping| Bing[Bing Search Engine]
    Bing -->|Traffic| Pages
```

## 4. Operational Commands
*   **Audit Quality:** `npm run audit`
*   **Manual IndexNow:** `npm run indexnow`
*   **Local Dev:** `npm run dev`
