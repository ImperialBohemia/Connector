import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const THEMES = {
  tech: {
    primary: "#0f172a",   // Slate 900
    secondary: "#334155", // Slate 700
    accent: "#3b82f6",    // Blue 500
    background: "#f8fafc" // Slate 50
  },
  health: {
    primary: "#064e3b",   // Emerald 900
    secondary: "#065f46", // Emerald 800
    accent: "#10b981",    // Emerald 500
    background: "#f0fdf4" // Emerald 50
  },
  finance: {
    primary: "#1e1b4b",   // Indigo 950
    secondary: "#312e81", // Indigo 900
    accent: "#6366f1",    // Indigo 500
    background: "#fafafa" // Neutral 50
  },
  minimal: {
    primary: "#171717",   // Neutral 900
    secondary: "#404040", // Neutral 700
    accent: "#171717",    // Neutral 900 (Black accent)
    background: "#ffffff" // White
  }
};

async function main() {
  console.log("🏭 CONNECTOR SITE FACTORY 🏭");
  console.log("----------------------------");

  const name = await question("Project Name (e.g., Best Coffee 2024): ");
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const description = await question("Description: ");
  const companyName = await question("Company Name (default: Imperial Bohemia): ") || "Imperial Bohemia";
  const companyEmail = await question("Company Email: ");

  console.log("\nAvailable Themes: " + Object.keys(THEMES).join(", "));
  let themeKey = await question("Select Theme (default: tech): ");
  if (!themeKey || !THEMES[themeKey as keyof typeof THEMES]) themeKey = "tech";

  const theme = THEMES[themeKey as keyof typeof THEMES];

  // Target Directory (sibling to current repo)
  const targetDir = path.resolve(process.cwd(), "..", slug);

  console.log(`\n🚀 Spawning project at: ${targetDir}`);

  if (fs.existsSync(targetDir)) {
    console.error("❌ Error: Target directory already exists!");
    rl.close();
    return;
  }

  // 1. Copy Files
  console.log("📦 Copying DNA...");
  const currentDir = process.cwd();

  const ignoreList = [
    'node_modules',
    '.git',
    '.next',
    'dist',
    '.vercel',
    '.env',
    '.env.local'
  ];

  fs.cpSync(currentDir, targetDir, {
    recursive: true,
    filter: (src) => {
      const basename = path.basename(src);
      return !ignoreList.includes(basename);
    }
  });

  // 2. Generate New Config
  console.log("🧬 Injecting Configuration...");
  const configContent = `export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: string;
  company: {
    name: string;
    email: string;
    address?: string;
  };
  socials: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  features: {
    cookieConsent: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: "${name}",
  description: "${description}",
  url: "https://${slug}.vercel.app",
  author: "${companyName}",
  company: {
    name: "${companyName}",
    email: "${companyEmail}",
  },
  socials: {
    twitter: "https://twitter.com/connector",
  },
  theme: {
    primary: "${theme.primary}",
    secondary: "${theme.secondary}",
    accent: "${theme.accent}",
    background: "${theme.background}",
  },
  features: {
    cookieConsent: true,
  },
};
`;

  fs.writeFileSync(path.join(targetDir, 'lib', 'config.ts'), configContent);

  // 3. Update Package.json
  const packageJsonPath = path.join(targetDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  packageJson.name = slug;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // 4. Initialize Git
  console.log("🌱 Initializing Git...");
  try {
    execSync('git init', { cwd: targetDir, stdio: 'ignore' });
    execSync('git add .', { cwd: targetDir, stdio: 'ignore' });
    execSync('git commit -m "Initial commit from Connector Factory"', { cwd: targetDir, stdio: 'ignore' });
    // Rename branch to main
    execSync('git branch -M main', { cwd: targetDir, stdio: 'ignore' });
  } catch (e) {
    console.error("⚠️ Git init failed (optional):", e);
  }

  console.log("\n✅ PROJECT SPAWNED SUCCESSFULLY!");
  console.log("--------------------------------");
  console.log(`To go live, run these commands:\n`);

  console.log(`cd ../${slug}`);
  console.log(`# Create GitHub Repo`);
  console.log(`gh repo create ${slug} --public --source=. --push`);
  console.log(`\n# Deploy to Vercel`);
  console.log(`vercel project add ${slug}`);
  console.log(`vercel --prod`);

  rl.close();
}

main();
