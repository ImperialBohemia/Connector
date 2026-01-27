# AGENTS.md

## Project Context
This repository contains the "Connector" project, a Programmatic SEO (pSEO) application designed to build "Algorithmic Arbitrage" sales pages.
The system connects AI agents, Google Sheets (CMS), and Bing IndexNow to generate high-conversion affiliate comparison sites.

## Architecture & Tech Stack
- **Framework**: Next.js (App Router), TypeScript, Tailwind CSS.
- **CMS**: Google Sheets (Headless CMS via `google-spreadsheet`).
- **Distribution**: Bing IndexNow via Vercel Cron.
- **Styling**: "Trust" based design + "Sales Psychology" triggers.

## Workflow: How to Create a New Sales Page
To generate a "Best Sale Comparison Page" for a new affiliate offer:
1.  **Add Row to Google Sheet**:
    - `slug`: e.g., `best-ai-video-tools-deal`.
    - `keyword`: Target intent (e.g., "Best AI Video Generator Deal").
    - `title`: Persuasive SEO Title.
    - `json_data`: JSON array of products. Mark the winner with `"isBestValue": true`.
    - `affiliate_link`: Your main affiliate tracking link.
2.  **Trigger Build**:
    - The system automatically picks up the new row on the next ISR revalidation (1 hour) or manual redeploy.
    - IndexNow script automatically submits the new URL to Bing.

## Data Structure (Google Sheets)
Required columns:
- `slug`
- `keyword`
- `title`
- `description`
- `intro_text`
- `json_data` (Format: `[{"name": "X", "price": "$$", "features": [], "isBestValue": true, "link": "..."}]`)
- `affiliate_link`

## SEO & Psychology Features
- **Bing Optimization**: Pages include "Key Takeaways" (for Copilot), `priceValidUntil` schema (for Deal snippets), and `FAQPage` schema.
- **Conversion**: "Verdict" section, "Best Value" badges, and Urgency triggers are hardcoded into the template.
