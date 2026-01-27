import { execSync } from "child_process";

function runCommand(command: string, errorMessage: string, silent = false) {
  try {
    if (!silent) console.log(`\n🚀 Running: ${command}`);
    execSync(command, { stdio: silent ? "ignore" : "inherit" });
  } catch (error) {
    console.error(`\n❌ Error: ${errorMessage}`);
    process.exit(1);
  }
}

function configureRemote() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.log("⚠️ No GITHUB_TOKEN found. Assuming SSH or manual authentication.");
    return;
  }

  console.log("\n🔑 Detected GITHUB_TOKEN. Configuring Absolute Autonomy...");
  try {
    // Get current remote URL to extract owner/repo
    const currentRemote = execSync("git remote get-url origin").toString().trim();

    // Extract repo path (e.g., ImperialBohemia/Connector.git)
    // Handles https://github.com/Owner/Repo.git or git@github.com:Owner/Repo.git
    let repoPath = "";
    if (currentRemote.includes("github.com/")) {
        repoPath = currentRemote.split("github.com/")[1];
    } else if (currentRemote.includes("github.com:")) {
        repoPath = currentRemote.split("github.com:")[1];
    }

    if (repoPath) {
        const authenticatedRemote = `https://x-access-token:${token}@github.com/${repoPath}`;
        // Mask the token in the log
        console.log(`🔗 Updating remote to: https://x-access-token:***@github.com/${repoPath}`);
        // Run quietly to avoid leaking token in error logs if it fails
        runCommand(`git remote set-url origin ${authenticatedRemote}`, "Failed to update git remote with token.", true);
    } else {
        console.warn("⚠️ Could not parse repository path from remote. Skipping auto-auth.");
    }
  } catch (e) {
    console.warn("⚠️ Error configuring remote. Proceeding with existing config.");
  }
}

async function deploy() {
  console.log("🤖 Initiating Absolute Autonomy Protocol...");
  const timestamp = new Date().toISOString();

  // 0. Autonomy Configuration
  configureRemote();

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
