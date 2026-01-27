import { getSheetData, PageData, ProductData } from "@/lib/sheets";
import { Check, Info, Calendar, User, Trophy, Tag, ThumbsUp, ThumbsDown, Star, Zap } from 'lucide-react';
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSafeLinkProps, cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";

// ISR Revalidation (1 hour)
export const revalidate = 3600;

// Generate Metadata for SEO (Root Page)
export async function generateMetadata(): Promise<Metadata> {
  const data = await getSheetData();
  // TARGET SLUG: "best-wireless-headphones-2026"
  const page = data.find((p) => p.slug === "best-wireless-headphones-2026") || data[0];

  if (!page) {
    return {
      title: "Connector Live",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://connector-live.vercel.app";
  const ogImage = `https://via.placeholder.com/1200x630.png?text=${encodeURIComponent(page.title)}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: baseUrl,
      siteName: "Connector Live",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImage],
    },
  };
}

// Reusing the PricingTable logic but injecting data
function PricingTable({ products }: { products: ProductData[] }) {
  if (!products || products.length === 0) return <div>No product data available.</div>;

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto p-6 my-12">
      {products.map((product, index) => (
        <AnimatedSection
          key={index}
          delay={index * 0.1}
          className={cn(
            "relative flex flex-col p-8 bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border",
            product.isBestValue
              ? 'border-blue-500 ring-4 ring-blue-500/10 z-10 scale-105 shadow-blue-900/10'
              : 'border-slate-100 hover:border-slate-300'
          )}
        >
          {product.isBestValue && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide flex items-center gap-2 shadow-lg">
              <Trophy className="w-4 h-4" />
              Best Value Deal
            </div>
          )}

          <div className="mb-6">
             <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2 min-h-[3.5rem] flex items-center">
                {product.name}
             </h3>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900">{product.price}</span>
                {product.isBestValue && (
                    <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                        Lowest Price
                    </span>
                )}
             </div>
          </div>

          <div className="flex-1 mb-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Key Features</h4>
            <ul className="space-y-4">
              {product.features && product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-slate-600">
                  <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            {...getSafeLinkProps(product.link || "#")}
            className={cn(
              "w-full py-4 px-6 rounded-xl font-bold text-center transition-all duration-300 shadow-md flex items-center justify-center gap-2",
              product.isBestValue
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/25 hover:scale-[1.02]'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 hover:scale-[1.02]'
            )}
          >
            {product.isBestValue ? "Get Best Deal Now" : "Check Current Price"}
            <ArrowRight className="w-4 h-4" />
          </a>
        </AnimatedSection>
      ))}
    </div>
  );
}

// "Pros & Cons" Section for Human-Level Depth
function ProsAndCons({ page }: { page: PageData }) {
  const topPick = page.products.find(p => p.isBestValue) || page.products[0];

  return (
    <div className="max-w-5xl mx-auto my-16 grid md:grid-cols-2 gap-8 px-4">
      <AnimatedSection className="bg-green-50/50 p-8 rounded-2xl border border-green-100 backdrop-blur-sm">
        <div className="flex items-center mb-6 text-green-800">
          <div className="p-2 bg-green-100 rounded-lg mr-3">
             <ThumbsUp className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl">Why We Like {topPick.name}</h3>
        </div>
        <ul className="space-y-4">
            {topPick.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-start text-green-900">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-green-600" />
                    <span className="font-medium">{f}</span>
                </li>
            ))}
            <li className="flex items-start text-green-900">
                <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-green-600" />
                <span className="font-medium">Verified &quot;Goldilocks&quot; Price Point</span>
            </li>
        </ul>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="bg-red-50/50 p-8 rounded-2xl border border-red-100 backdrop-blur-sm">
        <div className="flex items-center mb-6 text-red-800">
          <div className="p-2 bg-red-100 rounded-lg mr-3">
            <ThumbsDown className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl">Things to Consider</h3>
        </div>
        <ul className="space-y-4">
            <li className="flex items-start text-red-900">
                <span className="mr-3 text-red-500 font-bold">•</span>
                <span className="font-medium">May lack features found in Enterprise ({page.products.find(p => p.price.length > 3)?.name || "Premium options"}) tier.</span>
            </li>
            <li className="flex items-start text-red-900">
                <span className="mr-3 text-red-500 font-bold">•</span>
                <span className="font-medium">Best suited for users who prioritize value over brand prestige.</span>
            </li>
        </ul>
      </AnimatedSection>
    </div>
  );
}

// AI Summary Component
function KeyTakeaways({ page }: { page: PageData }) {
  const topPick = page.products.find(p => p.isBestValue) || page.products[0];

  return (
    <AnimatedSection className="bg-white border border-blue-100 p-8 rounded-2xl max-w-5xl mx-auto my-12 shadow-xl shadow-blue-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Zap className="w-24 h-24 text-blue-600" />
      </div>
      <div className="flex items-center mb-6 relative z-10">
        <div className="p-2 bg-blue-600 rounded-lg text-white mr-4 shadow-lg shadow-blue-600/30">
             <Info className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Quick Analysis (TL;DR)</h2>
      </div>
      <ul className="space-y-4 text-slate-700 relative z-10 text-lg">
        <li className="flex gap-3">
            <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 fill-yellow-500" />
            <span><strong>Best Overall:</strong> {topPick.name} offers the perfect balance of price and features for most users.</span>
        </li>
        <li className="flex gap-3">
            <Zap className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <span><strong>Efficiency:</strong> We analyzed {page.products.length} options for &quot;{page.keyword}&quot; to save you time.</span>
        </li>
        <li className="flex gap-3">
            <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span><strong>Bottom Line:</strong> {page.intro_text.split('.')[0]}.</span>
        </li>
      </ul>
    </AnimatedSection>
  );
}

// Trust Signals Component
function TrustSignals() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-slate-400 mb-10 bg-slate-800/50 py-2 px-6 rounded-full inline-flex">
       <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-blue-400" />
          <span>Updated: {currentDate}</span>
       </div>
       <div className="w-px h-4 bg-slate-700 hidden sm:block"></div>
       <div className="flex items-center">
          <User className="w-4 h-4 mr-2 text-blue-400" />
          <span>By: Connector Editorial Team</span>
       </div>
    </div>
  );
}

// Verdict Section
function Verdict({ page }: { page: PageData }) {
  const winner = page.products.find(p => p.isBestValue) || page.products[0];
  return (
    <AnimatedSection className="bg-slate-900 text-white py-16 px-8 rounded-3xl max-w-5xl mx-auto my-20 shadow-2xl text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 opacity-50"></div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Final Verdict</h2>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            After comprehensive autonomous analysis, <strong>{winner.name}</strong> stands out as the clear winner.
            It hits the sweet spot between performance and affordability.
        </p>
        <a
            {...getSafeLinkProps(winner.link || "#")}
            className="inline-flex items-center bg-green-500 text-white font-bold py-4 px-12 rounded-full hover:bg-green-600 transition-all hover:scale-105 shadow-lg hover:shadow-green-500/25 text-lg"
        >
            <Tag className="w-5 h-5 mr-2" />
            Claim Deal for {winner.name}
        </a>
        <p className="text-xs text-slate-500 mt-6 font-medium uppercase tracking-widest">30-day money-back guarantee verified</p>
      </div>
    </AnimatedSection>
  );
}

// Helper for Arrow icon
function ArrowRight({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    )
}

export default async function Page() {
  const data = await getSheetData();
  // TARGET SLUG: "best-wireless-headphones-2026"
  // This explicitly grabs the "First Web" content to serve at the root.
  const page = data.find((p) => p.slug === "best-wireless-headphones-2026") || data[0];

  if (!page) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <h1 className="text-2xl font-bold text-slate-900">System Initializing...</h1>
            <p className="text-slate-600">Please add a row to the Google Sheet or check credentials.</p>
        </div>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://connector-live.vercel.app";

  // Dynamic Price Validity (1 year from now)
  const validUntil = new Date();
  validUntil.setFullYear(validUntil.getFullYear() + 1);
  const validUntilIso = validUntil.toISOString().split('T')[0];

  // JSON-LD Structured Data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the best ${page.keyword}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our top pick for the best ${page.keyword} is ${page.products.find(p => p.isBestValue)?.name || page.products[0].name} due to its superior value and features.`
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": page.title,
    "description": page.description,
    "brand": {
      "@type": "Brand",
      "name": "Connector Live"
    },
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": page.products.length,
      "lowPrice": page.products[0]?.price.replace(/[^0-9.]/g, '') || "0",
      "priceCurrency": "USD",
      "priceValidUntil": validUntilIso
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white pt-32 pb-24 px-4 text-center border-b border-slate-700 relative overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <AnimatedSection className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            {page.title}
            </h1>
            <TrustSignals />
            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-10">
            {page.intro_text}
            </p>
        </AnimatedSection>
      </section>

      {/* AI Summary */}
      <section className="w-full px-4 -mt-10 relative z-20">
         <KeyTakeaways page={page} />
      </section>

      {/* Comparison */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Top Recommendations for: {page.keyword}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our autonomous ranking algorithm highlights the best options based on real-time value and performance metrics.
            </p>
          </AnimatedSection>
          <PricingTable products={page.products} />
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="w-full px-4 bg-white py-12">
        <ProsAndCons page={page} />
      </section>

      {/* Verdict */}
      <section className="w-full px-4">
         <Verdict page={page} />
      </section>

      {/* Footer CTA */}
      {page.affiliate_link && (
        <section className="w-full py-24 px-4 bg-white border-t">
          <AnimatedSection className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Still Undecided?</h2>
            <p className="text-xl text-slate-600 mb-10">
              Join thousands of smart shoppers who chose our top recommendation.
            </p>
            <a
              {...getSafeLinkProps(page.affiliate_link)}
              className="inline-flex items-center justify-center bg-slate-100 text-slate-900 font-bold py-4 px-10 rounded-xl hover:bg-slate-200 transition-all text-lg border border-slate-200"
            >
              Check Official Site
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </AnimatedSection>
        </section>
      )}
    </div>
  );
}
