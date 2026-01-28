import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate & Editorial Disclosure",
  description: "Our commitment to transparency, honesty, and FTC compliance.",
};

export default function DisclosurePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-slate-900">Affiliate & Editorial Disclosure</h1>

      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-2xl text-slate-600 mb-8 font-light leading-relaxed">
          Transparency is the foundation of trust. At <strong>{siteConfig.name}</strong>, we believe you have an absolute right to know how our business works and how we remain unbiased.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-8 my-10 rounded-r-lg">
          <h3 className="text-blue-900 font-bold text-xl mb-4 mt-0">FTC Compliance Statement</h3>
          <p className="text-blue-800 m-0">
            In compliance with the Federal Trade Commission (FTC) guidelines, please assume the following about links and posts on this site:
            Any/all of the links on {siteConfig.url} are affiliate links of which we receive a small commission from sales of certain items, but the price is the same for you.
          </p>
        </div>

        <h3>1. How We Are Funded</h3>
        <p>
          {siteConfig.name} is a 100% reader-supported publication. We do not accept venture capital, we do not have a paywall, and we do not clutter our reviews with annoying pop-up ads.
        </p>
        <p>
          Instead, we have relationships with retailers like Amazon, Walmart, Best Buy, and others. If you click a link on our site and make a purchase, the retailer contributes a small portion of the sale to our &quot;coffee fund.&quot;
        </p>

        <h3>2. Our &quot;Ironclad&quot; Editorial Independence</h3>
        <p>
          <strong>Does money affect our reviews? Absolutely not.</strong> Here is why:
        </p>
        <ul>
          <li>
            <strong>Blind Testing:</strong> Our writers and researchers often do not know which products offer higher commissions. They focus solely on performance data.
          </li>
          <li>
            <strong>Return Policy:</strong> If we recommend a bad product and you return it, we make <strong>zero</strong> commission. We are financially incentivized to only recommend products you will love and keep.
          </li>
          <li>
            <strong>No Paid Placements:</strong> We do not accept money from brands to rank their products higher. &quot;Best Value&quot; badges are earned by math, not marketing budgets.
          </li>
        </ul>

        <h3>3. Amazon Associates Disclosure</h3>
        <p>
          {siteConfig.name} is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
        </p>
        <p>
          As an Amazon Associate, we earn from qualifying purchases.
        </p>

        <h3>4. Accuracy of Information</h3>
        <p>
          While we make every effort to ensure that product information (price, specs, availability) is correct at the time of publication, these factors change rapidly. 
          Please double-check the final price and details on the retailer&apos;s site before purchasing.
        </p>

        <h3>5. Health & Financial Disclaimer</h3>
        <p>
          Nothing on this website constitutes professional medical, legal, or financial advice. 
          Always consult with a certified professional before making significant health or financial decisions based on online information.
        </p>
      </div>
    </div>
  );
}
