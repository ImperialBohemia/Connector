import { siteConfig } from "../lib/config";

/**
 * THE BRIDGE BUILDER: Connects to Vercel API to retrieve the live URL.
 * Now with Self-Healing: Automatically creates the project if it doesn't exist.
 */
export async function getVercelDeployment() {
  const token = process.env.VERCEL_TOKEN;
  
  if (!token) {
    console.warn("⚠️ VERCEL_TOKEN missing. Cannot fetch live URL status.");
    return siteConfig.url; // Fallback to config URL
  }

  const projectName = "connector-live"; // Or derive from siteConfig.name slugified

  try {
    console.log("🔍 Checking Vercel Project Status...");
    
    // 1. Check if Project Exists
    const checkResponse = await fetch(`https://api.vercel.com/v9/projects/${projectName}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (checkResponse.ok) {
        console.log("✅ Vercel Project Exists.");
        const data = await checkResponse.json();
        // Return the latest deployment URL or the main production alias
        return `https://${projectName}.vercel.app`; 
    } else if (checkResponse.status === 404) {
        console.log("⚠️ Project NOT FOUND. Initiating Auto-Creation Protocol...");
        
        // 2. Create Project
        const createResponse = await fetch(`https://api.vercel.com/v9/projects`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: projectName,
                framework: "nextjs",
                gitRepository: {
                    type: "github",
                    repo: "ImperialBohemia/VercelWeb" 
                }
            })
        });

        if (createResponse.ok) {
            console.log("🚀 Project Created Successfully on Vercel!");
            return `https://${projectName}.vercel.app`;
        } else {
            console.error("❌ Failed to create Vercel project:", await createResponse.text());
            return siteConfig.url;
        }
    }

    return siteConfig.url; 

  } catch (error) {
    console.error("Vercel API connection failed:", error);
    return siteConfig.url;
  }
}

// Allow standalone execution
if (require.main === module) {
    getVercelDeployment().then(url => {
        console.log(`\n🌍 LIVE PREVIEW: ${url}`);
    });
}
