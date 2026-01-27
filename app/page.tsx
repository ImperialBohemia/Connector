import { PricingTable } from "@/components/PricingTable";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section (Attention) */}
      <section className="w-full bg-slate-900 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Top Rated Products Reviewed
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
          We analyze thousands of reviews to bring you the best options on the market.
          Unbiased. Comprehensive. Trustworthy.
        </p>
      </section>

      {/* Comparison Section (Interest & Desire) */}
      <section className="w-full py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            Our Top Recommendations
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            After extensive research, we have selected these three products based on performance, value, and reliability.
          </p>
          <PricingTable />
        </div>
      </section>

      {/* Trust/Info Section (Action/Reinforcement) */}
      <section className="w-full py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How We Rank</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Our "Goldilocks" ranking system identifies the best trade-off between price and performance.
            We highlight the <strong>Budget</strong> choice for savings, the <strong>Premium</strong> choice for no-compromise quality,
            and the <strong>Best Value</strong> choice that sits perfectly in the middle.
          </p>
        </div>
      </section>
    </div>
  );
}
