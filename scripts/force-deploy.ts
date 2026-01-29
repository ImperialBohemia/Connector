import { execSync } from "child_process";

/**
 * THE FORCE DEPLOYER: Bypasses Git/GitHub and pushes files directly to Vercel.
 * Use this when the "System" is too slow or Git is broken.
 */
function main() {
  console.log("🚀 INITIATING FORCE DEPLOYMENT (Bypassing Git)...");

  if (!process.env.VERCEL_TOKEN) {
    console.error("❌ Error: VERCEL_TOKEN is missing.");
    process.exit(1);
  }

  try {
    // We use npx to run vercel without installing it globally
    // --prod: Go straight to production
    // --yes: Skip confirmation prompts
    // --token: Authenticate

    console.log("📦 Packaging and Uploading to Vercel...");

    // We need to capture stdout to find the URL
    const output = execSync(`npx vercel deploy --prod --token=${process.env.VERCEL_TOKEN} --yes`, {
        stdio: 'pipe', // Capture output
        encoding: 'utf-8'
    });

    console.log(output);
    console.log("\n✅ FORCE DEPLOY SUCCESS!");

    // Attempt to extract URL from output (Vercel usually prints it at the end)
    const lines = output.split('\n');
    const url = lines.find(line => line.startsWith('https://'));

    if (url) {
        console.log(`\n🌍 LIVE URL: ${url}`);
    } else {
        console.log("\n⚠️  Could not parse URL from output, but deployment finished.");
    }

  } catch (error: any) {
    console.error("\n❌ DEPLOYMENT FAILED:");
    // Print the stdout/stderr from the failed command if available
    if (error.stdout) console.log(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
    process.exit(1);
  }
}

main();
