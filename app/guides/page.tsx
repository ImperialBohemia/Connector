import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { ArrowRight, Laptop, Headphones, Watch, Camera, FlaskConical, Scale, ShieldCheck, Eye } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology & Buying Guides",
  description: "How we test: Our rigorous, unbiased process for finding the best tech.",
};

export default function GuidesPage() {
  const categories = [
    { name: "Audio", icon: Headphones, slug: "best-wireless-headphones-2026" },
    { name: "Laptops", icon: Laptop, slug: "#" },
    { name: "Wearables", icon: Watch, slug: "#" },
    { name: "Cameras", icon: Camera, slug: "#" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Methodology & Buying Guides</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
          We don&apos;t just list specs. We test. Here is exactly how we ensure our reviews are the most accurate on the web.
        </p>
      </header>

      {/* Methodology Section (The "Truth" Block) */}
      <section className="mb-24">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

          <h2 className="text-3xl font-bold mb-12 text-center relative z-10">Our Testing Protocol</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <FlaskConical className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">1. Lab Testing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We measure tangible metrics like battery life (in hours), audio frequency response, and screen brightness (nits) using standardized tools.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <Scale className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">2. Comparative Analysis</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We never test in a vacuum. Every product is compared side-by-side with its top 3 competitors to find the true &quot;Best Value.&quot;
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <Eye className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">3. Real World Usage</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Lab numbers aren&apos;t enough. We live with the products for at least 7 days to discover quirks, comfort issues, and UX flaws.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-10 h-10 text-gold-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">4. Editorial Independence</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We accept no payment for positive reviews. Our writers are separated from our revenue team. Truth is our only currency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <h2 className="text-2xl font-bold mb-8 text-slate-900 border-b pb-4">Latest Deep Dives</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <Link
            href={`/${cat.slug}`}
            key={i}
            className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="bg-slate-50 group-hover:bg-blue-50 p-6 rounded-full mb-6 transition-colors">
              <cat.icon className="w-10 h-10 text-slate-600 group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">{cat.name}</h3>
            <span className="text-sm text-blue-600 font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              View Guide <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
