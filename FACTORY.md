# 🏭 Connector Site Factory

This repository now functions as a "Master Template" (Seed) capable of spawning fully compliant, production-ready affiliate websites ("Offspring").

## 🚀 How to Spawn a New Site

We have a specialized script that handles the cloning, configuration, and initialization of new projects.

### 1. Run the Spawner
From the root of this repository, run:

```bash
tsx scripts/spawn-project.ts
```

### 2. Follow the Prompts
The script will ask for:
- **Project Name**: (e.g., "Best Coffee Machines 2024")
- **Description**: (For SEO meta tags)
- **Company Name**: (e.g., "Imperial Bohemia" or a niche brand)
- **Company Email**: (For Legal pages)
- **Theme**: Select a visual style (Tech Blue, Health Green, Finance Indigo, Minimal Mono)

### 3. Automatic Actions performed by the Script
1.  **Clones the Codebase**: Creates a clean copy in a sibling directory (`../your-project-slug`).
2.  **Injects DNA**: Rewrites `lib/config.ts` with your specific project details (Name, Colors, URLs).
3.  **Initializes Git**: Sets up a fresh Git repository.
4.  **Generates Launch Commands**: Outputs the exact `gh repo create` and `vercel project add` commands you need to run to go live.

## 🛠 Configuration (The DNA)

The heart of every site is `lib/config.ts`.

```typescript
export const siteConfig: SiteConfig = {
  name: "Your Site Name",
  theme: {
    primary: "#...",
    secondary: "#...",
    // ...
  },
  // ...
};
```

Everything flows from here:
- **Visuals**: `app/globals.css` and Tailwind read the `theme` colors.
- **Legal**: Privacy and Terms pages read the `company` details.
- **Metadata**: SEO titles and descriptions are auto-generated from `siteConfig`.

## 🎨 Adding New Themes

To add a new theme preset:
1. Open `scripts/spawn-project.ts`.
2. Add a new entry to the `THEMES` constant.
3. Run the spawner again to use it.
