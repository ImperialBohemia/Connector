import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { ArrowRight, Laptop, Headphones, Watch, Camera } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buying Guides",
  description: "Explore our comprehensive buying guides for the best tech.",
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
      <h1 className="text-4xl font-bold mb-4 text-slate-900 text-center">Expert Buying Guides</h1>
      <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
        Deep dives into the latest technology. We help you cut through the noise.
      </p>

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
              View Guides <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
