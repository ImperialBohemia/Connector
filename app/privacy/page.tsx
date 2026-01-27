import { siteConfig } from "@/lib/config";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
      <div className="prose prose-slate">
        <p>At {siteConfig.name}, we prioritize your privacy. This policy outlines how we handle your data.</p>
        <h3>1. Data Collection</h3>
        <p>We do not collect personal data directly. We use generic analytics to improve our content.</p>
        <h3>2. Affiliate Links</h3>
        <p>Clicking on product links may direct you to third-party retailer sites (e.g., Amazon). These sites may use cookies to track sales for commission purposes.</p>
        <h3>3. Contact</h3>
        <p>For inquiries, please contact {siteConfig.company.email}.</p>
        <p>Company: {siteConfig.company.name}</p>
      </div>
    </div>
  );
}
