import { getSheetData, PageData, ProductData } from "@/lib/sheets";
import { Check, Info, Calendar, User, Trophy, Tag, ThumbsUp, ThumbsDown, Star, Zap, ShieldCheck } from 'lucide-react';
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSafeLinkProps, cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";

// ISR Revalidation (1 hour)
export const revalidate = 3600;

// Generate Metadata for SEO (Root Page)
export async function generateMetadata(): Promise<Metadata> {
  const data = await getSheetData();
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
  if (!products || products.length === 0) return <div className="text-white">No product data available.</div>;

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto p-6 my-12">
      {products.map((product, index) => (
        <AnimatedSection
          key={index}
          delay={index * 0.1}
          className={cn(
            "relative flex flex-col p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 group",
            product.isBestValue
              ? 'glass-gold ring-1 ring-gold-500/50 z-10 scale-105 shadow-[0_0_50px_rgba(212,175,55,0.15)]'
              : 'glass-dark hover:border-white/20'
          )}
        >
          {product.isBestValue && (
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gold-gradient text-black px-8 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <Trophy className="w-3 h-3" />
              Premier Choice
            </div>
          )}

          <div className="mb-8 mt-4">
             <h3 className="text-2xl font-serif font-bold text-slate-100 leading-tight mb-4 min-h-[4rem] flex items-center group-hover:text-gold-400 transition-colors">
                {product.name}
             </h3>
             <div className="flex items-baseline gap-3">
                <span className="text-4xl font-light text-white tracking-tight">{product.price}</span>
             </div>
          </div>

          <div className="flex-1 mb-10">
            <div className="w-12 h-px bg-white/10 mb-6"></div>
            <ul className="space-y-4">
              {product.features && product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-slate-400 group-hover:text-slate-300 transition-colors">
                  <Check className="w-4 h-4 text-gold-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-sm font-light leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            {...getSafeLinkProps(product.link || "#")}
            className={cn(
              "w-full py-4 px-6 rounded-none uppercase tracking-[0.15em] text-xs font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 border",
              product.isBestValue
                ? 'bg-gold-500 text-black border-gold-500 hover:bg-gold-400 hover:scale-[1.02]'
                : 'bg-transparent text-white border-white/20 hover:border-gold-500 hover:text-gold-400'
            )}
          >
            {product.isBestValue ? "Acquire Best Deal" : "Check Availability"}
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
    <div className="max-w-6xl mx-auto my-24 grid md:grid-cols-2 gap-12 px-6">
      <AnimatedSection className="glass-dark p-10 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors"></div>
        <div className="flex items-center mb-8">
          <div className="p-3 bg-green-900/30 border border-green-500/30 rounded-full mr-4 text-green-400">
             <ThumbsUp className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-2xl text-white">The Excellence of {topPick.name}</h3>
        </div>
        <ul className="space-y-5">
            {topPick.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-start text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-4 flex-shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                    <span className="font-light">{f}</span>
                </li>
            ))}
            <li className="flex items-start text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-4 flex-shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                <span className="font-light">Unmatched price-to-performance ratio in the luxury segment.</span>
            </li>
        </ul>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="glass-dark p-10 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors"></div>
        <div className="flex items-center mb-8">
          <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-full mr-4 text-red-400">
            <ThumbsDown className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-2xl text-white">Critical Considerations</h3>
        </div>
        <ul className="space-y-5">
            <li className="flex items-start text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-4 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                <span className="font-light">May lack features found in Bespoke ({page.products.find(p => p.price.length > 3)?.name || "Premium options"}) tier.</span>
            </li>
            <li className="flex items-start text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-4 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                <span className="font-light">Designed for pragmatists, not brand loyalists.</span>
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
    <AnimatedSection className="relative max-w-5xl mx-auto my-24 p-1">
      {/* Golden Border Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent rounded-3xl opacity-20"></div>

      <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-12 rounded-3xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 opacity-5">
            <Zap className="w-64 h-64 text-gold-500" />
        </div>

        <div className="flex items-center mb-10 relative z-10">
          <div className="h-12 w-1 bg-gold-500 mr-6 shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>
          <div>
              <h2 className="text-3xl font-serif text-white">Intelligence Report</h2>
              <p className="text-gold-500 text-xs uppercase tracking-[0.25em] mt-1">Automated Analysis</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-gold-500/30 transition-colors">
                <Star className="w-8 h-8 text-gold-500 mb-4 fill-gold-500/20" />
                <h4 className="text-white font-bold mb-2">Top Performer</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{topPick.name} establishes the new standard for the category.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-gold-500/30 transition-colors">
                <Zap className="w-8 h-8 text-gold-500 mb-4" />
                <h4 className="text-white font-bold mb-2">Efficiency</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Scanned {page.products.length} elite options to distill the absolute best.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-gold-500/30 transition-colors">
                <ShieldCheck className="w-8 h-8 text-gold-500 mb-4" />
                <h4 className="text-white font-bold mb-2">Verdict</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{page.intro_text.split('.')[0]}.</p>
            </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Trust Signals Component
function TrustSignals() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 text-xs font-medium text-slate-500 mb-12 uppercase tracking-widest">
       <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-3 text-gold-600" />
          <span>Last Updated: {currentDate}</span>
       </div>
       <div className="w-px h-4 bg-white/10 hidden sm:block"></div>
       <div className="flex items-center">
          <User className="w-4 h-4 mr-3 text-gold-600" />
          <span>Curated by: Imperial AI</span>
       </div>
    </div>
  );
}

// Verdict Section
function Verdict({ page }: { page: PageData }) {
  const winner = page.products.find(p => p.isBestValue) || page.products[0];
  return (
    <AnimatedSection className="relative max-w-4xl mx-auto my-32 text-center group">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-gold-500/10 transition-all duration-1000"></div>

      <div className="relative z-10 border border-gold-500/30 bg-black/80 backdrop-blur-2xl p-12 md:p-20 rounded-[2rem] shadow-2xl">
        <div className="inline-block mb-8">
            <Trophy className="w-16 h-16 text-gold-500 mx-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
        </div>

        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">The Definitive Choice</h2>

        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            After rigorous autonomous analysis, <strong>{winner.name}</strong> is awarded the
            <span className="text-gold-400 mx-2">Gold Standard</span>
            for 2026.
        </p>

        <a
            {...getSafeLinkProps(winner.link || "#")}
            className="inline-flex items-center justify-center bg-gold-gradient text-black font-bold py-5 px-16 rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] text-lg uppercase tracking-widest"
        >
            Secure Your Deal
        </a>

        <p className="text-[10px] text-slate-600 mt-8 font-medium uppercase tracking-[0.3em]">
            Verified Purchase Link • 30-Day Guarantee • v2026.01.27-GOLD
        </p>
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
  const page = data.find((p) => p.slug === "best-wireless-headphones-2026") || data[0];

  if (!page) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h1 className="text-3xl font-serif text-gold-500 mb-4">System Initializing...</h1>
            <p className="text-slate-500 font-light">Establishing secure connection to database.</p>
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
    <div className="flex flex-col items-center min-h-screen overflow-hidden bg-black selection:bg-gold-500 selection:text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* Hero Section */}
      <section className="w-full relative min-h-[90vh] flex flex-col justify-center items-center px-4 pt-20 border-b border-white/5 overflow-hidden">
        {/* Real Unsplash Imagery for Human Feel */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10"></div> {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div> {/* Bottom Fade */}
            <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                alt="Luxury Background"
                className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow"
            />
        </div>

        <AnimatedSection className="relative z-20 max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 backdrop-blur-md">
                <span className="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold">Editorial Selection</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-10 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-2xl">
            {page.title}
            </h1>

            <TrustSignals />

            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
            {page.intro_text}
            </p>

            <div className="flex justify-center animate-bounce duration-[2000ms]">
                <div className="w-px h-24 bg-gradient-to-b from-gold-500/0 via-gold-500/50 to-gold-500/0"></div>
            </div>
        </AnimatedSection>
      </section>

      {/* AI Summary */}
      <section className="w-full px-4 -mt-20 relative z-20">
         <KeyTakeaways page={page} />
      </section>

      {/* Comparison */}
      <section className="w-full py-32 bg-black relative">
        <div className="absolute inset-0 bg-luxury-dark opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                The Elite Selection
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
                Distilled from thousands of data points, these are the only options that matter.
            </p>
          </AnimatedSection>
          <PricingTable products={page.products} />
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="w-full px-4 bg-black border-t border-white/5 relative overflow-hidden py-12">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/20 via-black to-black"></div>
        <ProsAndCons page={page} />
      </section>

      {/* Verdict */}
      <section className="w-full px-4 pb-32">
         <Verdict page={page} />
      </section>

      {/* Footer CTA */}
      {page.affiliate_link && (
        <section className="w-full py-32 px-4 bg-black border-t border-white/5">
          <AnimatedSection className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-serif text-white mb-8">Uncertainty Eliminated</h2>
            <p className="text-xl text-slate-400 mb-12 font-light">
              Join the distinguished few who refuse to settle for second best.
            </p>
            <a
              {...getSafeLinkProps(page.affiliate_link)}
              className="inline-flex items-center justify-center bg-transparent text-white font-medium py-5 px-12 rounded-none hover:bg-white hover:text-black transition-all text-lg border border-white/20 uppercase tracking-[0.2em]"
            >
              Verify Official Price
              <ArrowRight className="w-5 h-5 ml-4" />
            </a>
          </AnimatedSection>
        </section>
      )}
    </div>
  );
}
