# Connector: Autonomous pSEO Engine

**Connector** is a world-class Programmatic SEO system designed for Algorithmic Arbitrage. It automates the creation of high-converting, Bing-optimized affiliate sites from a single product input.

## 🚀 Features

*   **Autonomous Intelligence**: Turns 1 link into 5 intent-based clusters (Review, Discount, Alternatives, etc.).
*   **Bing Dominance**: Automated IndexNow submission and AI-optimized content (Key Takeaways, FAQ Schemas).
*   **Sales Psychology**: "Hypnotic" copywriting, Pulse animations, and "Best Value" triggers.
*   **Quality Gate**: Built-in audit system prevents low-quality content from being deployed.
*   **Compliance**: Full legal pages, FTC disclosures, and Trust signals.

## 🛠 Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Styling**: Tailwind CSS + Shadcn principles
*   **CMS**: Google Sheets (Headless)
*   **Auth**: Google Service Accounts
*   **Scripts**: TypeScript (`tsx`)

## ⚡ Quick Start

### 1. Setup Environment
Create a `.env` file with your credentials:
```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email@...
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
GOOGLE_SHEET_ID=your-sheet-id
INDEXNOW_KEY=your-bing-key
CRON_SECRET=your-secret
```

### 2. Verify Bing Ownership
Place your Bing verification file (e.g., `1234abc.txt`) in the `public/` folder.

### 3. Run Development
```bash
npm install
npm run dev
```

### 4. Deploy Content
Add a row to your Google Sheet with the product details.
To manually verify quality before push:
```bash
npm run audit
```
To submit new URLs to Bing:
```bash
npm run indexnow
```

## 🧠 Operational Manual
Refer to `AGENTS.md` for detailed internal logic and agent instructions.

---
© 2026 Imperial Bohemia. Built for dominance.
