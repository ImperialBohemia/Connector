import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  badge?: string;
  image: string;
  price: string;
  rating: number;
  description: string;
  affiliateLink: string;
  features: string[];
}

export const ProductCard = ({ title, badge, image, price, rating, description, affiliateLink, features }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full transform transition-all hover:scale-[1.02]">
      {badge && (
        <div className="bg-trust-blue text-white text-xs font-bold px-3 py-1 uppercase tracking-wide text-center">
          {badge}
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <div className="h-48 bg-white rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
           <Image
             src={image}
             alt={title}
             width={400}
             height={300}
             className="object-contain max-h-full"
             priority
           />
        </div>

        <h3 className="text-xl font-bold mb-2 text-slate-900">{title}</h3>

        <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-lg mr-1">{'★'.repeat(Math.floor(rating))}</span>
            <span className="text-slate-400 text-sm">({rating}/5)</span>
        </div>

        <p className="text-slate-600 text-sm mb-4 flex-1">{description}</p>

        <ul className="text-sm text-slate-500 mb-6 space-y-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
            <div className="text-2xl font-bold text-slate-900 mb-3">{price}</div>
            <a
              href={affiliateLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="block w-full bg-action-green hover:bg-action-hover text-white text-center font-bold py-3 px-4 rounded-lg transition-colors shadow-md"
            >
              Check Price on Amazon
            </a>
        </div>
      </div>
    </div>
  );
};
