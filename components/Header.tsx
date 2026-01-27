import React from 'react';
import { siteConfig } from '@/lib/config';
import Link from 'next/link';

export function Header() {
  return (
    <>
      {/* Top Bar Compliance */}
      <div className="bg-black text-slate-500 text-[10px] md:text-xs py-2 text-center border-b border-white/5 tracking-widest uppercase font-medium">
        <p>
          <span className="text-gold-500 mr-2">✦</span>
          {siteConfig.name} is reader-supported. We may earn a commission if you buy through our links.
          <span className="text-gold-500 ml-2">✦</span>
        </p>
      </div>

      <header className="bg-black/80 backdrop-blur-xl text-white py-4 shadow-2xl sticky top-0 z-50 border-b border-white/10 transition-all">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="font-serif font-bold text-xl tracking-tight flex items-center gap-3 group">
            <span className="bg-gold-gradient text-black w-8 h-8 flex items-center justify-center rounded shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform duration-300">
              {siteConfig.name.charAt(0)}
            </span>
            <span className="group-hover:text-gold-400 transition-colors tracking-wide">{siteConfig.name}</span>
          </Link>
          <nav>
            <ul className="flex space-x-8 text-sm font-medium text-slate-400">
              <li><Link href="/" className="hover:text-gold-400 transition-colors uppercase tracking-widest text-xs">Top Picks</Link></li>
              <li><Link href="/guides" className="hover:text-gold-400 transition-colors uppercase tracking-widest text-xs">Journal</Link></li>
              <li><Link href="/about" className="hover:text-gold-400 transition-colors uppercase tracking-widest text-xs">About AI</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
