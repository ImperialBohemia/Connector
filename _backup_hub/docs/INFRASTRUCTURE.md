# Infrastructure & Setup

This document outlines the infrastructure configuration for the **Connector** project. We use a high-availability, secure serverless architecture on Vercel.

## 🌍 Vercel Setup

- **Project Name:** `connector-app`
- **Framework:** Next.js
- **Region:** Default (auto-detect)
- **Node Version:** Latest LTS (20.x+)

### Security Headers
Configured in `vercel.json`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`: Restricted access to hardware APIs.

## 🐙 GitHub Repository

- **Organization:** ImperialBohemia
- **Repo:** Connector
- **Branch Protection:**
  - `main`: Requires PR, Status Checks.
  - No direct commits to main recommended.

### CI/CD
- **Vercel Integration:** Automatic deployment on push to `main` (Production) and branches (Preview).
- **GitHub Actions (Planned):** For running tests before deploy.

## 📱 Mobile First Strategy
- Tailwind config is set up with standard breakpoints.
- Design process: Mobile View -> Tablet -> Desktop.
- Performance: Core Web Vitals are monitored via Vercel Analytics.
