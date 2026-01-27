import { getSheetData, PageData, ProductData } from "@/lib/sheets";
import { Check } from 'lucide-react';
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Force static generation for these routes
export const dynamicParams = false;

// ISR Revalidation (1 hour)
export const revalidate = 3600;

// Generate segments for all slugs in the Sheet
export async function generateStaticParams() {
  const data = await getSheetData();
  return data.map((page) => ({
    slug: page.slug,
  }));
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getSheetData();
  const page = data.find((p) => p.slug === params.slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.title,
    description: page.description,
  };
}

// Reusing the PricingTable logic but injecting data
function PricingTable({ products }: { products: ProductData[] }) {
  if (!products || products.length === 0) return <div>No product data available.</div>;

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto p-6 my-12">
      {products.map((product, index) => (
        <div
          key={index}
          className={`relative flex flex-col p-8 bg-white rounded-lg shadow-lg border-2 ${
            product.isBestValue ? 'border-blue-600 shadow-blue-100 scale-105 z-10' : 'border-slate-200'
          }`}
        >
          {product.isBestValue && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
              Best Value
            </div>
          )}
          <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
          <div className="text-3xl font-bold text-slate-800 mb-6">{product.price}</div>

          <ul className="flex-1 mb-8 space-y-3">
            {product.features && product.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-slate-600">
                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href={product.link || "#"}
            className={`w-full py-3 px-6 rounded-md font-semibold text-center transition-colors ${
              product.isBestValue
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            Check Price
          </a>
        </div>
      ))}
    </div>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getSheetData();
  const page = data.find((p) => p.slug === params.slug);

  if (!page) {
    notFound();
  }

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": page.title,
    "description": page.description,
    "brand": {
      "@type": "Brand",
      "name": "Connector Reviews"
    },
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": page.products.length,
      "lowPrice": page.products[0]?.price.replace(/[^0-9.]/g, '') || "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="w-full bg-slate-900 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          {page.title}
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
          {page.intro_text}
        </p>
      </section>

      {/* Comparison Section */}
      <section className="w-full py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            Top Recommendations for: {page.keyword}
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Our algorithmic ranking highlights the best options based on value and performance.
          </p>
          <PricingTable products={page.products} />
        </div>
      </section>

      {/* CTA Section */}
      {page.affiliate_link && (
        <section className="w-full py-20 px-4 bg-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Ready to choose?</h2>
            <a
              href={page.affiliate_link}
              className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-green-700 transition"
            >
              Get Started with the Winner
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
