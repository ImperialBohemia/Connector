import { execSync } from "child_process";

try {
    console.log("🚀 Force Pushing Golden Master to Live Web...");
    execSync("git push live-web golden-master:main --force", { stdio: "inherit" });
    console.log("✅ Success.");
} catch (e) {
    console.error("❌ Failed:", e.message);
}
