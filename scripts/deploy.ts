import { spawn, execSync } from "child_process";

// ----------------------------------------------------------------------------
// UTILITIES
// ----------------------------------------------------------------------------

async function run(command: string, errorMessage: string, silent = false): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!silent) console.log(`\n🚀 Executing: ${command}`);
    const child = spawn(command, { stdio: silent ? "ignore" : "inherit", shell: true });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        // Optional commands (like pushing to a remote that might be down) shouldn't crash the flow if handled
        if (errorMessage.includes("Optional")) {
          console.warn(`⚠️ Warning: ${errorMessage}`);
          resolve(); // Resolve anyway for optional steps
        } else {
          console.error(`❌ Error: ${errorMessage}`);
          reject(new Error(errorMessage));
        }
      }
    });
  });
}

function configureRemotes() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.log("⚠️ No GITHUB_TOKEN found. Manual auth required.");
    return;
  }

  console.log("\n🔑 Detected GITHUB_TOKEN. Configuring Network...");

  // 1. Brain (Connector) - The Source
  try {
    const brainRemote = `https://x-access-token:${token}@github.com/ImperialBohemia/Connector.git`;
    execSync(`git remote set-url origin ${brainRemote}`, { stdio: 'ignore' });
    console.log("✅ Brain (Origin) Connected.");
  } catch (e) {
    // Ignore if origin doesn't exist yet (unlikely)
  }

  // 2. Body (VercelWeb) - The Live Site
  try {
    const bodyRemote = `https://x-access-token:${token}@github.com/ImperialBohemia/VercelWeb.git`;
    try {
      execSync("git remote get-url live-web", { stdio: "ignore" });
      execSync(`git remote set-url live-web ${bodyRemote}`, { stdio: "ignore" });
    } catch {
      execSync(`git remote add live-web ${bodyRemote}`, { stdio: "ignore" });
    }
    console.log("✅ Body (Live-Web) Connected.");
  } catch (e) {
    console.log("⚠️ Could not configure Live-Web remote.");
  }
}

// ----------------------------------------------------------------------------
// DEPLOYMENT LOGIC
// ----------------------------------------------------------------------------

async function deploy() {
  console.log("🤖 Initiating Absolute Autonomy Protocol v2.0...");
  const timestamp = new Date().toISOString();
  const isDryRun = process.argv.includes("--dry-run");

  if (isDryRun) console.log("🧪 DRY RUN MODE ENABLED: No changes will be pushed.");

  try {
    // 0. Network Configuration
    configureRemotes();

    // 1. Quality Gate
    console.log("\n🔒 Phase 1: Quality Gate");
    await run("npm run audit", "Quality Audit failed. Deployment aborted.");

    // 2. Staging & Commit
    console.log("\n📦 Phase 2: Packaging");
    await run("git add .", "Git add failed.", true);

    // Check for changes
    const status = execSync("git status --porcelain").toString();
    if (status) {
      console.log("\n📝 Phase 3: Committing Changes");
      await run(`git commit -m "Auto-deploy: ${timestamp} - Connector v2.0 Update"`, "Git commit failed.");
    } else {
      console.log("\n📝 Phase 3: No changes to commit. Proceeding to synchronization.");
    }

    if (isDryRun) {
        console.log("\n🛑 Dry Run Complete. Skipping Push.");
        return;
    }

    // 4. Parallel Deployment (The Speed Upgrade)
    console.log("\n🚀 Phase 4: Parallel Deployment (Brain & Body)");

    const pushBrain = run("git push origin HEAD:main --force", "Failed to push to Connector (Brain).");
    const pushBody = run("git push live-web HEAD:main --force", "Failed to publish to VercelWeb (Body/Optional).");

    await Promise.all([pushBrain, pushBody]);

    console.log("\n✅ Mission Complete. Connector v2.0 System Synchronized.");

  } catch (error) {
    console.error("\n❌ ABORTING: Critical Failure in Deployment Protocol.");
    process.exit(1);
  }
}

deploy();
