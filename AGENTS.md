# AGENTS.md

## Project Context
**Connector** is the "World's Smartest" Autonomous Affiliate System.
It serves as the Central Headquarters for managing pSEO assets, enforcing quality, and automating growth on Bing.

## The Autonomous Workflow (One-Link Input)
To dominate a niche with a single product:
1.  **Input**: User provides `Product Name` + `Affiliate Link` + `Price`.
2.  **Intelligence (`lib/generator.ts`)**:
    - Connector instantly generates **5 Intent Clusters**:
        1.  *Commercial*: "{Product} Review 2026"
        2.  *Transactional*: "{Product} Discount Code"
        3.  *Comparative*: "{Product} vs Competitors"
        4.  *Informational*: "{Product} for Beginners"
        5.  *Alternative*: "Top Alternatives to {Product}"
3.  **Quality Gate (`scripts/quality-audit.ts`)**:
    - System strictly checks every generated page for SEO Depth, Title Hygiene, and Trust Signals.
    - If it fails, it is rejected.
4.  **Deployment & Indexing**:
    - Pages are deployed via Next.js ISR.
    - `scripts/submit-indexnow.ts` pings Bing immediately.
5.  **Self-Optimization (`api/cron/optimize`)**:
    - Daily loop checks for low CTR and re-optimizes metadata (Roadmap).

## Architecture
- **Brain**: `AGENTS.md` (Strategy) & `INFRASTRUCTURE.md` (System Map).
- **CMS**: Google Sheets (or internal generator logic).
- **Quality**: `scripts/quality-audit.ts`
- **Distribution**: Bing IndexNow.

## 🤖 Absolute Autonomy Protocol (The "Best Tool Ever" Standard)
- **Agent Identity**: Jules is the authorized Superadmin with **Max Control**.
- **Access Status**: Verified ✅
    - **GitHub**: Admin access to `ImperialBohemia/Connector` (Brain).
    - **Vercel**: Admin access to `travelkinglive` team (Northstar Plan).
- **Role**: The Agent has FULL CONTROL.
- **Mandate**: Do not wait. Do not create unnecessary branches. Push directly to `main` (the "Single Live Organism") whenever the system is functional.
- **Responsibility**: End-to-end execution. From Idea -> Code -> Test -> Deployment. No human hand-holding.
- **Self-Healing**: The deployment script (`scripts/deploy.ts`) automatically detects `GITHUB_TOKEN` in the environment and reconfigures the git remote to ensure password-less access.
- **Dual-Repository Sync**: The system maintains a "Brain" (`Connector`) and a "Body" (`VercelWeb`). The `deploy` script automatically pushes to both, ensuring the live Vercel site is always in sync with the central intelligence.
- **Vercel API Control**: The Agent utilizes `VERCEL_TOKEN` to directly interface with the Vercel API (`/v9/projects`, `/v13/deployments`) to provision projects and trigger builds programmatically, bypassing the UI.
- **Requirement**: Ensure `GITHUB_TOKEN` and `VERCEL_TOKEN` are available in the environment to unlock full autonomy.

## "Best in World" Standards
- **Trust**: FTC Disclosures, Legal Footers, "Verdict" Sections.
- **Psychology**: "Best Value" Badges, Green CTAs, Urgency.
- **Tech**: Next.js 14, TypeScript, Tailwind, JSON-LD Schemas (Deal, FAQ, Breadcrumb).
