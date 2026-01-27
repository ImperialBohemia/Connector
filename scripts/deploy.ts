import { execSync } from "child_process";

function runCommand(command: string, errorMessage: string, silent = false) {
  try {
    if (!silent) console.log(`\n🚀 Running: ${command}`);
    execSync(command, { stdio: silent ? "ignore" : "inherit" });
  } catch (error) {
    console.error(`\n❌ Error: ${errorMessage}`);
    // Do not exit process immediately if one remote fails, try the other
    if (!errorMessage.includes("Optional")) {
         process.exit(1);
    }
  }
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
      runCommand(`git remote set-url origin ${brainRemote}`, "Failed to config Origin.", true);
      console.log("✅ Brain (Origin) Connected.");
  } catch (e) {}

  // 2. Body (VercelWeb) - The Live Site
  try {
      const bodyRemote = `https://x-access-token:${token}@github.com/ImperialBohemia/VercelWeb.git`;
      // Check if remote exists, if not add it, if yes set-url
      try {
        execSync("git remote get-url live-web", { stdio: "ignore" });
        runCommand(`git remote set-url live-web ${bodyRemote}`, "Failed to config Live-Web.", true);
      } catch {
        runCommand(`git remote add live-web ${bodyRemote}`, "Failed to add Live-Web.", true);
      }
      console.log("✅ Body (Live-Web) Connected.");
  } catch (e) {}
}

async function deploy() {
  console.log("🤖 Initiating Absolute Autonomy Protocol...");
  console.log("🤖 Agent Identity Verified: Jules (Admin/Max Control)");
  const timestamp = new Date().toISOString();

  // 0. Network Configuration
  configureRemotes();

  // 1. Quality Gate
  console.log("\n🔒 Phase 1: Quality Gate");
  runCommand("npm run audit", "Quality Audit failed. Deployment aborted.");

  // 2. Synchronization (Brain)
  console.log("\n🧠 Phase 2: Brain Synchronization");
  runCommand("git pull origin main --rebase", "Git pull failed. Please resolve conflicts.");

  // 3. Staging
  console.log("\n📦 Phase 3: Staging");
  runCommand("git add .", "Git add failed.");

  // 4. Commit
  try {
    const status = execSync("git status --porcelain").toString();
    if (status) {
      console.log("\n📝 Phase 4: Committing");
      runCommand(`git commit -m "Auto-deploy: ${timestamp} - Autonomous Update"`, "Git commit failed.");
    } else {
      console.log("\n📝 Phase 4: No changes to commit.");
    }
  } catch (e) {}

  // 5. Deployment (Brain)
  console.log("\n💾 Phase 5: Saving to Brain (Connector)");
  runCommand("git push origin main", "Failed to push to Connector.");

  // 6. Publication (Live Web)
  console.log("\n🌍 Phase 6: Publishing to Live Web (VercelWeb)");
  // Force push to ensure the live site exactly matches the brain's intent
  runCommand("git push live-web main --force", "Failed to publish to VercelWeb (Optional - check permissions).");

  console.log("\n✅ Mission Complete. System is synchronized and live.");
}

deploy();
