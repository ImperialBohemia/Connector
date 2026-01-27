"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  credit?: {
    photographer: string;
    username: string;
  };
}

export function OptimizedImage({ src, alt, width, height, className, credit }: OptimizedImageProps) {
  const [error, setError] = useState(false);

  // Fallback for failed images (placeholders based on keywords)
  const fallbackSrc = `https://source.unsplash.com/800x600/?${alt.split(" ").slice(0, 2).join(",")}`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        onError={() => setError(true)}
        unoptimized={true} // Allow external domains without config for now
      />
      {credit && (
        <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1 py-0.5 rounded backdrop-blur-sm opacity-60 hover:opacity-100 transition-opacity">
          Photo by <a href={`https://unsplash.com/@${credit.username}?utm_source=connector&utm_medium=referral`} target="_blank" rel="nofollow noopener noreferrer" className="underline">{credit.photographer}</a> on Unsplash
        </div>
      )}
    </div>
  );
}
