import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Transparency about how we fund this site.",
};

export default function DisclosurePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">Affiliate Disclosure</h1>

      <div className="prose prose-slate prose-lg">
        <p className="lead text-xl text-slate-600 mb-8">
          Transparency is a core value at <strong>{siteConfig.name}</strong>. We believe you have a right to know how we make money.
        </p>

        <h3>How We Are Funded</h3>
        <p>
          {siteConfig.name} is a reader-supported publication. To keep our content free for everyone, we use affiliate links.
        </p>
        <p>
          When you click on a link to a product on our site (such as Amazon, Best Buy, or Walmart) and make a purchase, we may earn a small commission.
          <strong>This comes at no extra cost to you.</strong>
        </p>

        <h3>Does This Influence Our Rankings?</h3>
        <p>
          <strong>No.</strong> Our system is designed to be autonomous and unbiased.
        </p>
        <ul>
          <li>We do not accept payments for positive reviews.</li>
          <li>We do not allow brands to influence our &quot;Best Value&quot; calculations.</li>
          <li>We rank products based on data: price, specs, and user satisfaction.</li>
        </ul>

        <h3>Amazon Associates Program</h3>
        <p>
          {siteConfig.name} is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
        </p>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 not-prose mt-8">
          <h4 className="font-bold text-yellow-800 mb-2">Our Promise</h4>
          <p className="text-sm text-yellow-900">
            We only recommend products that pass our strict quality analysis. If a product is bad, we will tell you, regardless of commission potential.
          </p>
        </div>
      </div>
    </div>
  );
}
