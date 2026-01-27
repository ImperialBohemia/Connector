# AGENTS.md

## Project Context
This repository contains the "Connector" project, a Next.js application designed to build affiliate comparison sites using a Programmatic SEO (pSEO) architecture.
The system is designed to enable "Algorithmic Arbitrage" via high-ticket affiliate marketing and rapid distribution.

## Architecture & Tech Stack
- **Framework**: Next.js (App Router), TypeScript, Tailwind CSS.
- **CMS**: Google Sheets (Headless CMS via `google-spreadsheet`).
- **Distribution**: Bing IndexNow via automated scripts.
- **Styling**: "Trust" based design (Deep Blues, Greys, No Emojis).

## Data Structure (Google Sheets)
Each row in the connected Google Sheet represents a landing page.
Required columns:
- `slug`: URL segment (unique ID).
- `keyword`: Main target keyword.
- `title`: SEO Title.
- `description`: Meta description.
- `json_data`: JSON string containing specific product data (prices, features).
- `affiliate_link`: Monetization URL.

## Operational Rules
- **Bing Verification**: Handled via `app/[filename]/route.ts`.
- **Indexing**: Run `npm run indexnow` to submit new URLs (requires `INDEXNOW_KEY`).
- **Secrets**:
    - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
    - `GOOGLE_PRIVATE_KEY`
    - `GOOGLE_SHEET_ID`
    - `BING_API_KEY` (for verification)
    - `INDEXNOW_KEY` (for submission)
- **Files**: Do not touch `dist` or build artifacts.
