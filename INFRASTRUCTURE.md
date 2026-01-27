# Infrastructure Index

This document maps the external systems (GitHub & Vercel) that power the **Connector**.
It serves as a "Brain Extension" to ensure rapid configuration and troubleshooting.

## 1. GitHub Configuration
**Status:** ⚠️ **Critical Gap Detected** (No workflows found)
**Requirement:** The system requires a CI/CD pipeline to ensure "Absolute Autonomy".

### Recommended Workflow: `.github/workflows/jules.yml`
*   **Triggers:** Push to `main`, Pull Request.
*   **Jobs:**
    *   `quality-gate`: Runs `npm run lint`, `npm run build`, `npm run audit`.
    *   `deploy`: (Optional if linked to Vercel Git integration, otherwise via Vercel CLI).
*   **Permissions Needed:**
    *   `contents: write` (To push auto-fixes or tags).
    *   `pull-requests: write` (To comment on PRs).

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
