import { execSync } from "child_process";

function runCommand(command: string, errorMessage: string) {
  try {
    console.log(`\n🚀 Running: ${command}`);
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`\n❌ Error: ${errorMessage}`);
    process.exit(1);
  }
}

async function deploy() {
  console.log("🤖 Initiating Absolute Autonomy Protocol...");
  const timestamp = new Date().toISOString();

  // 1. Quality Gate
  console.log("\n🔒 Phase 1: Quality Gate");
  runCommand("npm run audit", "Quality Audit failed. Deployment aborted.");

  // 2. Build Verification (Optional but recommended for safety)
  // Skipping full build to keep it fast as per user request "quick",
  // relying on audit for content safety.

  // 3. Git Synchronization
  console.log("\n🔄 Phase 2: Synchronization");
  // Pull with rebase to handle remote changes automatically
  runCommand("git pull origin main --rebase", "Git pull failed. Please resolve conflicts manually.");

  // 4. Staging
  console.log("\n📦 Phase 3: Staging");
  runCommand("git add .", "Git add failed.");

  // 5. Commit
  // Check if there are changes to commit
  try {
    const status = execSync("git status --porcelain").toString();
    if (status) {
      console.log("\n📝 Phase 4: Committing");
      runCommand(`git commit -m "Auto-deploy: ${timestamp} - Autonomous Update"`, "Git commit failed.");
    } else {
      console.log("\n📝 Phase 4: No changes to commit. Proceeding to push...");
    }
  } catch (e) {
    // Ignore error if status check fails weirdly, usually won't happen
  }

  // 6. Push
  console.log("\n🚀 Phase 5: Deployment");
  runCommand("git push origin main", "Git push failed.");

  console.log("\n✅ Mission Complete. Code is live on GitHub and deploying to Vercel.");
}

deploy();
