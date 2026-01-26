# AI Agent Instructions (AGENTS.md)

This file serves as the "brain" for any AI agent (including Jules) working on this repository. Follow these directives strictly to maintain world-class quality.

## 🧠 Core Philosophy
1. **Mobile First:** Always design and implement for mobile screens first. Desktop is an enhancement.
2. **Quality over Speed:** Code must be typed (TypeScript), linted, and formatted.
3. **Security First:** Never expose secrets. Use environment variables. Validate inputs.
4. **Documentation:** Update documentation if you change architecture or setup.

## 🛠️ Technical Standards

### Next.js & React
- Use **Server Components** by default. Use \`"use client"\` only when necessary (state, effects).
- Use **Tailwind CSS** for all styling. Avoid custom CSS files.
- Use `next/image` for all images (optimization).
- ensure `next/link` is used for internal navigation.

### TypeScript
- **No `any`**: Define interfaces and types.
- Use `type` over `interface` for consistency unless extending is required.

### Git & Workflow
- **Commit Messages**: Semantic commits (e.g., `feat:`, `fix:`, `docs:`, `chore:`).
- **Pre-commit**: Husky runs Prettier. Ensure your code passes formatting before submitting.

## 🤖 Knowledge Base

### Vercel Integration
- This repo is deployed on Vercel.
- Project Name: `connector-app`
- Production URL: `https://connector-app-flame.vercel.app`

### Jules & Bing Integration
- See `docs/INTEGRATION_JULES.md` for OAuth flows.
- **Do not** hardcode Client IDs or Secrets. Always refer to `.env` variables.

## 🚨 Troubleshooting
- If build fails, check `npm run lint` locally.
- If images don't load, check `next.config.ts` allowed domains.
- If Vercel deploy fails, check "Project Settings > Environment Variables".
