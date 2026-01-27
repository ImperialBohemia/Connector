import { execSync } from "child_process";

// Configuration
const PROJECT_NAME = "connector-live";
const GITHUB_REPO = "ImperialBohemia/VercelWeb";
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

if (!VERCEL_TOKEN) {
  console.error("❌ VERCEL_TOKEN is required in environment variables.");
  process.exit(1);
}

function runCurl(description: string, command: string) {
  console.log(`\n🚀 ${description}...`);
  try {
    const result = execSync(command, { encoding: "utf-8" });
    console.log("✅ Success:", result);
    return JSON.parse(result);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    // Continue even if error (e.g. project already exists)
    return null;
  }
}

async function initVercel() {
  console.log(`🤖 Initiating Vercel Project Provisioning: ${PROJECT_NAME}`);

  // 1. Create Project
  const createProjectCmd = `curl -X POST https://api.vercel.com/v9/projects \\
    -H "Authorization: Bearer ${VERCEL_TOKEN}" \\
    -H "Content-Type: application/json" \\
    -d '{
      "name": "${PROJECT_NAME}",
      "framework": "nextjs",
      "gitRepository": {
        "type": "github",
        "repo": "${GITHUB_REPO}"
      }
    }'`;

  runCurl("Creating Vercel Project", createProjectCmd);

  // 2. Trigger Initial Deployment
  // Note: We need the repoId. For simplicity in this script we assume the previous step worked or we hardcode/fetch it.
  // In a robust version, we would parse the 'id' from step 1.
  // Fetching repo ID via GitHub API would be ideal, but here we rely on Vercel resolving it via the 'repo' string in the deployment payload.

  const triggerDeployCmd = `curl -X POST https://api.vercel.com/v13/deployments \\
    -H "Authorization: Bearer ${VERCEL_TOKEN}" \\
    -H "Content-Type: application/json" \\
    -d '{
      "name": "${PROJECT_NAME}",
      "gitSource": {
        "type": "github",
        "repo": "${GITHUB_REPO}",
        "ref": "main"
      }
    }'`;

  runCurl("Triggering Initial Deployment", triggerDeployCmd);

  console.log("\n✅ Vercel Initialization Sequence Complete.");
}

initVercel();
