import { getSheetData, PageData, ProductData } from "@/lib/sheets";
import { ArrowRight, Star, Zap, ShieldCheck, Globe, Trophy } from 'lucide-react';
import Link from "next/link";
import { ProductCard } from "@/components/affiliate/ProductCard";

export const revalidate = 3600;

function Hero({ page }: { page: PageData }) {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={page.heroImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop"}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-600/30 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30 backdrop-blur-sm">
          {new Date().getFullYear()} Official Guide
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
          We Test the World&apos;s Best Products So You Don&apos;t Have To.
        </h1>
        <p className="text-xl text-slate-300 mb-8 font-light max-w-2xl mx-auto">
          Unbiased reviews, rigorous testing, and data-driven comparisons to help you find the perfect match.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${page.slug}`} className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-600/20">
            Read Latest Review
          </Link>
          <button className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm">
            Browse Categories
          </button>
        </div>
      </div>
    </section>
  );
}

function FeaturedReview({ page }: { page: PageData }) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Featured Review</h2>
          <Link href={`/${page.slug}`} className="text-blue-600 font-semibold hover:underline flex items-center gap-2">
            View All Reviews <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-12">
           <div className="relative group overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.products[0].imageUrl}
                alt={page.products[0].name}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded font-bold text-xs shadow-md flex items-center gap-1">
                 <Trophy size={14} /> Editor&apos;s Choice
              </div>
           </div>

           <div>
              <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <span className="bg-slate-100 px-2 py-1 rounded">Tech</span>
                <span>•</span>
                <span>{page.date}</span>
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {page.title}
              </h3>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                {page.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                 {page.products[0].features.slice(0, 3).map((f, i) => (
                    <span key={i} className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm">
                       {f}
                    </span>
                 ))}
              </div>

              <div className="flex items-center gap-6">
                <Link
                  href={`/${page.slug}`}
                  className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors"
                >
                  Read Full Review
                </Link>
                <div className="flex flex-col">
                   <span className="text-sm text-slate-500">Verdict Score</span>
                   <span className="text-xl font-bold text-slate-900">{page.verdict.score}/10</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
  const props = [
    {
      icon: <Zap className="text-yellow-500" size={32} />,
      title: "Data-Driven",
      desc: "We analyze thousands of data points to find the true best value, not just the most expensive."
    },
    {
      icon: <ShieldCheck className="text-green-500" size={32} />,
      title: "Unbiased Testing",
      desc: "We buy our own products and never accept payment for positive reviews."
    },
    {
      icon: <Globe className="text-blue-500" size={32} />,
      title: "Global Research",
      desc: "Our team scours the globe to find hidden gems that mainstream sites miss."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {props.map((p, i) => (
            <div key={i} className="text-center p-6 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
              <p className="text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const data = await getSheetData();
  // For the homepage, we'll feature the first product/page in the sheet as the "Main Story"
  const featuredPage = data[0];

  if (!featuredPage) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-slate-50">
      <Hero page={featuredPage} />
      <ValueProps />
      <FeaturedReview page={featuredPage} />

      {/* Recent Reviews Grid (if more data exists) */}
      {data.length > 1 && (
        <section className="py-20 bg-white border-t border-slate-100">
           <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">More Expert Reviews</h2>
              <div className="grid md:grid-cols-3 gap-8">
                 {data.slice(1).map((page, idx) => (
                    <div key={idx} className="group cursor-pointer">
                       <Link href={`/${page.slug}`}>
                         <div className="overflow-hidden rounded-xl mb-4 h-64 relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={page.products[0].imageUrl}
                              alt={page.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                         </div>
                         <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                           {page.title}
                         </h3>
                         <p className="text-slate-500 line-clamp-2">{page.description}</p>
                       </Link>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      )}
    </main>
  );
}
