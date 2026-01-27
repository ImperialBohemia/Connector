import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  rating: number; // 1-5
  imageUrl: string;
  affiliateLink: string;
  badge?: string; // "Best Overall", "Best Value"
}

export function ProductCard({ name, description, price, rating, imageUrl, affiliateLink, badge }: ProductCardProps) {
  return (
    <div className="group relative bg-surface border border-slate-200 rounded-lg overflow-hidden transition-all hover:shadow-xl hover:border-accent/20">
      {badge && (
        <div className="absolute top-0 left-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10 shadow-sm">
          {badge}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Image Section */}
        <div className="w-full md:w-1/3 aspect-[4/3] relative rounded-md overflow-hidden bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(rating) ? 0 : 2} className="text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-secondary font-medium">{rating}/5</span>
            </div>

            <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
              {name}
            </h3>

            <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4 border-t border-slate-100 pt-4">
            <span className="text-2xl font-bold text-primary">{price}</span>
            <a
              href={affiliateLink}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-accent/20 animate-pulse-slow"
            >
              Check Price <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
