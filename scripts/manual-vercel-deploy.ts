import { execSync } from "child_process";

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

if (!VERCEL_TOKEN) {
    console.error("❌ No VERCEL_TOKEN found.");
    process.exit(1);
}

console.log("🚀 Triggering Manual Vercel Deployment...");

try {
    // Using curl to hit the Vercel Deployments API
    // We target the 'connector-live' project
    // This forces a new deployment from the current git state linked to Vercel

    const response = execSync(`
        curl -X POST "https://api.vercel.com/v13/deployments" \
        -H "Authorization: Bearer ${VERCEL_TOKEN}" \
        -H "Content-Type: application/json" \
        -d '{
            "name": "connector-live",
            "gitSource": {
                "type": "github",
                "repoId": "ImperialBohemia/VercelWeb",
                "ref": "main"
            },
            "target": "production"
        }'
    `);

    console.log("✅ API Response:", response.toString());
    console.log("🌍 Check Vercel Dashboard for build status.");

} catch (e: any) {
    console.error("❌ Deployment Failed:", e.message);
}
