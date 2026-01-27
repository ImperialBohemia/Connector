import { ArrowRight, Check, X, ShieldCheck, Clock, Award } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ProductCard } from "@/components/affiliate/ProductCard";
import { siteConfig } from "@/lib/config";

interface ReviewTemplateProps {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  heroImage: string;
  verdict: {
    summary: string;
    score: number;
    pros: string[];
    cons: string[];
  };
  products: any[];
  content: string; // HTML/Markdown content
  faq: { question: string; answer: string }[];
}

export function ReviewPage({ title, subtitle, author, date, heroImage, verdict, products, content, faq }: ReviewTemplateProps) {
  return (
    <article className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[500px] flex items-end">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={heroImage}
            alt={title}
            width={1920}
            height={1080}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent opacity-90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pb-12 md:pb-16 max-w-[1280px]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-blue-200 mb-4 text-sm font-semibold tracking-wide uppercase">
              <span className="bg-accent/20 text-accent px-2 py-0.5 rounded border border-accent/30">Review</span>
              <span>{date}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-sm">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6 font-light">
              {subtitle}
            </p>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
                 {author.charAt(0)}
               </div>
               <div className="text-sm">
                 <p className="text-white font-medium">By {author}</p>
                 <p className="text-slate-400">Expert Reviewer</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-[1280px] -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Content Column */}
          <div className="lg:col-span-8">

            {/* The Verdict Box (Sticky-ish feel) */}
            <div className="bg-white rounded-xl shadow-xl border-t-4 border-accent p-6 md:p-8 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <Award className="text-accent" /> The Verdict
                </h2>
                <div className="text-3xl font-black text-primary bg-slate-100 px-4 py-2 rounded-lg">
                  {verdict.score}<span className="text-lg text-secondary font-medium">/10</span>
                </div>
              </div>

              <p className="text-lg text-secondary leading-relaxed mb-8 border-l-4 border-slate-200 pl-4 italic">
                &quot;{verdict.summary}&quot;
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                    <span className="bg-green-100 p-1 rounded-full"><Check size={14} /></span> What We Like
                  </h3>
                  <ul className="space-y-3">
                    {verdict.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-secondary">
                        <Check size={16} className="text-green-600 mt-0.5 shrink-0" /> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                    <span className="bg-red-100 p-1 rounded-full"><X size={14} /></span> What We Don&apos;t Like
                  </h3>
                  <ul className="space-y-3">
                    {verdict.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-secondary">
                        <X size={16} className="text-red-500 mt-0.5 shrink-0" /> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Introduction Content */}
            <div
              className="prose prose-lg prose-slate max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: content }} // In real app, parse Markdown properly
            />

            {/* Top Picks Section */}
            <h2 className="text-3xl font-bold text-primary mb-8 scroll-mt-24" id="top-picks">Top Picks for 2026</h2>
            <div className="space-y-8 mb-16">
              {products.map((product, idx) => (
                <ProductCard
                  key={idx}
                  {...product}
                  badge={idx === 0 ? "🏆 Best Overall" : idx === 1 ? "💰 Best Value" : undefined}
                />
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-surface rounded-xl p-8 mb-12">
               <h2 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
               <div className="space-y-6">
                 {faq.map((item, i) => (
                   <div key={i} className="border-b border-slate-200 last:border-0 pb-6 last:pb-0">
                     <h3 className="font-semibold text-lg text-primary mb-2">{item.question}</h3>
                     <p className="text-secondary leading-relaxed">{item.answer}</p>
                   </div>
                 ))}
               </div>
            </div>

          </div>

          {/* Sidebar (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              {/* Table of Contents */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
                <h3 className="font-bold text-sm text-secondary uppercase tracking-wider mb-4 border-b pb-2">Contents</h3>
                <nav className="space-y-2">
                  <a href="#top-picks" className="block text-accent hover:underline text-sm font-medium">Top Picks 2026</a>
                  <a href="#verdict" className="block text-slate-600 hover:text-accent text-sm">Our Verdict</a>
                  <a href="#guide" className="block text-slate-600 hover:text-accent text-sm">Buying Guide</a>
                  <a href="#faq" className="block text-slate-600 hover:text-accent text-sm">FAQ</a>
                </nav>
              </div>

              {/* Trust Box */}
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="text-green-600" size={24} />
                  <h4 className="font-bold text-primary">Why Trust Us?</h4>
                </div>
                <p className="text-xs text-secondary leading-relaxed mb-4">
                  We spend thousands of hours researching and testing products to help you make the best choice. We may earn a commission if you buy through our links.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                   <Clock size={14} /> Updated: {date}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </article>
  );
}
