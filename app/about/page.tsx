import { siteConfig } from "@/lib/config";
import { Bot, CheckCircle, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name}, the world's smartest autonomous review system.`,
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">The Future of Product Reviews</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            {siteConfig.name} is not just another review site. It is an autonomous intelligence designed to find the absolute best value for you, instantly.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-6 text-blue-600">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Driven Analysis</h3>
            <p className="text-slate-600">
              Our algorithms analyze thousands of data points, reviews, and specifications to rank products without human bias.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-6 text-green-600">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Unbiased Truth</h3>
            <p className="text-slate-600">
              We prioritize value. Our &quot;Best Value&quot; badge isn&apos;t for sale—it&apos;s mathematically determined based on price-to-performance ratio.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-100 p-4 rounded-full mb-6 text-purple-600">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Updates</h3>
            <p className="text-slate-600">
              The market moves fast. Our system constantly monitors prices and availability to ensure our recommendations are always current.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <div className="prose prose-lg prose-slate mx-auto">
            <p>
              In a world flooded with sponsored content and fake reviews, finding the truth is hard.
              <strong>{siteConfig.name}</strong> was built to solve this.
            </p>
            <p>
              We believe that the &quot;best&quot; product isn&apos;t always the most expensive one. It&apos;s the one that respects your wallet while delivering the features you actually need.
            </p>
            <p>
              By automating the research process, we remove emotional bias and marketing fluff, leaving you with cold, hard facts and clear winners.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
