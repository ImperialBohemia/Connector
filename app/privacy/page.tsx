import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Global Privacy Shield: GDPR, CCPA, and Data Protection.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4 text-slate-900">Global Privacy Policy</h1>
      <p className="text-slate-500 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-slate prose-lg max-w-none">
        <p>
          Your privacy is critically important to us. At {siteConfig.name}, we follow a fundamental principle:
          <strong>We don&apos;t ask you for personal information unless we truly need it.</strong>
        </p>

        <h3>1. Who We Are (Data Controller)</h3>
        <p>
          For the purposes of the General Data Protection Regulation (GDPR), the Data Controller is: <br/>
          <strong>{siteConfig.company.name}</strong> <br/>
          Contact: {siteConfig.company.email}
        </p>

        <h3>2. Information We Collect</h3>
        <p>We collect information in two ways:</p>
        <ul>
          <li>
            <strong>Information you give us:</strong> For example, if you subscribe to our newsletter or contact us, we collect your email address.
          </li>
          <li>
            <strong>Information we get from your use of our services:</strong> We collect non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request.
          </li>
        </ul>

        <h3>3. Cookies & Tracking Technologies</h3>
        <p>
          We use cookies to help us identify and track visitors, their usage of our website, and their website access preferences.
        </p>
        <p>
          <strong>Affiliate Cookies:</strong> When you click on a link to an external vendor (e.g., Amazon), a cookie may be placed on your device to track the referral. This allows the merchant to pay us a commission.
          This process is anonymized and does not share your personal identity with us.
        </p>

        <div className="bg-slate-100 p-6 rounded-lg my-8">
          <h4 className="font-bold mb-2">Your Rights Under GDPR (Europe)</h4>
          <ul className="text-sm list-disc pl-5 space-y-1">
            <li>The right to access, update or to delete the information we have on you.</li>
            <li>The right of rectification (correction of errors).</li>
            <li>The right to object to processing.</li>
            <li>The right to data portability.</li>
          </ul>
        </div>

        <div className="bg-slate-100 p-6 rounded-lg my-8">
          <h4 className="font-bold mb-2">Your Rights Under CCPA (California)</h4>
          <p className="text-sm mb-2">Under the California Consumer Privacy Act, you have the right to request that we disclose certain information to you about our collection and use of your personal information over the past 12 months.</p>
          <p className="text-sm"><strong>Do Not Sell My Personal Information:</strong> We do not sell your personal data. We are an ad-supported and affiliate-supported platform.</p>
        </div>

        <h3>4. Data Security</h3>
        <p>
          The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure.
          While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
        </p>

        <h3>5. Third-Party Links</h3>
        <p>
          Our Service may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party&apos;s site.
          We strongly advise you to review the Privacy Policy and terms and conditions of every site you visit.
        </p>
        <p>
          We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites, products or services.
        </p>

        <h3>6. Changes to This Privacy Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </div>
    </div>
  );
}
