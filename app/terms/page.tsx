import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Legal conditions for using our international platform.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4 text-slate-900">Terms of Service</h1>
      <p className="text-slate-500 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-slate prose-lg max-w-none">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-12">
          <p className="text-sm font-bold text-red-900 uppercase tracking-widest mb-2">Important Legal Notice</p>
          <p className="text-red-800 text-sm">
            These Terms include a <strong>Mandatory Arbitration Agreement</strong> and a <strong>Class Action Waiver</strong>. 
            By using this Service, you agree to resolve disputes individually and waive your right to a jury trial, to the extent permitted by applicable law.
          </p>
        </div>

        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using {siteConfig.name} (&quot;the Service&quot;), operated by {siteConfig.company.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service. 
          If you do not agree, you must immediately cease using the Service.
        </p>

        <h3>2. Affiliate Disclaimer & Use of Data</h3>
        <p>
          Our Service functions as an autonomous data aggregator and affiliate publisher. We are not a retailer. 
          Any purchase you make is a direct contract between you and the third-party merchant (e.g., Amazon, Walmart). 
          We are not responsible for:
        </p>
        <ul>
          <li>Shipping, delivery, or fulfillment of products.</li>
          <li>Product warranty, safety, or quality.</li>
          <li>Returns, refunds, or customer support issues.</li>
        </ul>

        <h3>3. Intellectual Property Rights</h3>
        <p>
          All content, algorithms, text, graphics, and logos on this Service are the exclusive property of {siteConfig.company.name} and are protected by international copyright, trademark, and intellectual property laws. 
          You may not reproduce, distribute, or create derivative works without our express written consent.
        </p>

        <h3>4. Limitation of Liability (Maximum Protection)</h3>
        <p className="uppercase font-bold text-xs tracking-wider text-slate-500 mb-2">Read Carefully</p>
        <p>
          To the maximum extent permitted by applicable law, {siteConfig.company.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
          or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
        </p>
        <ul>
          <li>Your access to or use of or inability to access or use the Service;</li>
          <li>Any content obtained from the Service;</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
        </ul>
        <p>
          <strong>In no event shall our aggregate liability exceed the greater of one hundred U.S. dollars (U.S. $100.00) or the amount you paid us, if any, in the past six months.</strong>
        </p>

        <h3>5. Governing Law & Jurisdiction</h3>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the Czech Republic and the European Union, without regard to its conflict of law provisions. 
          Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located in Brno, Czech Republic, and the parties hereby irrevocably consent to the personal jurisdiction and venue therein.
        </p>

        <h3>6. User Conduct & Prohibited Acts</h3>
        <p>
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul>
          <li>Using web scrapers, bots, or other automated means to access the Service.</li>
          <li>Interfering with or disrupting the integrity or performance of the Service.</li>
          <li>Attempting to decipher, decompile, disassemble, or reverse engineer any of the software used to provide the Service.</li>
        </ul>

        <h3>7. Severability</h3>
        <p>
          If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect and enforceable.
        </p>

        <h3>8. Contact Information</h3>
        <p>
          For legal inquiries, please contact our Legal Department at: <br/>
          <strong>{siteConfig.company.email}</strong>
        </p>
      </div>
    </div>
  );
}
