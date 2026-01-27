import React from 'react';
import { Check } from 'lucide-react';

interface Product {
  name: string;
  price: string;
  features: string[];
  isBestValue?: boolean;
  link: string;
}

// Placeholder data - in a real app this would come from props or a CMS
const products: Product[] = [
  {
    name: "Budget Choice",
    price: "$$",
    features: ["Essential features", "Good reliability", "Standard build quality"],
    link: "#",
  },
  {
    name: "Top Pick (Best Value)",
    price: "$$$",
    features: ["Excellent performance", "Great build quality", "Best price-to-performance ratio", "Highly rated"],
    isBestValue: true,
    link: "#",
  },
  {
    name: "Premium Selection",
    price: "$$$$",
    features: ["Top-tier performance", "Premium materials", "Advanced features", "Luxury branding"],
    link: "#",
  },
];

export function PricingTable() {
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
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-slate-600">
                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href={product.link}
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
