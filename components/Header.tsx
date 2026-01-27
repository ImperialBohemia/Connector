import React from 'react';
import { siteConfig } from '@/lib/config';
import Link from 'next/link';
import { Search } from 'lucide-react';

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

      <header className="bg-black/60 backdrop-blur-md text-white py-4 shadow-none sticky top-0 z-50 border-b border-white/10 transition-all">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="font-serif font-bold text-2xl tracking-tight flex items-center gap-3 group">
            <span className="bg-gold-gradient text-black w-9 h-9 flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform duration-300">
              {siteConfig.name.charAt(0)}
            </span>
            <span className="group-hover:text-gold-400 transition-colors tracking-wide uppercase text-lg">{siteConfig.name}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <ul className="flex space-x-10 text-xs font-bold uppercase tracking-[0.15em] text-slate-300">
              {['Top Picks', 'Journal', 'Philosophy'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Philosophy' ? '/about' : item === 'Journal' ? '/guides' : '/'}
                    className="relative group py-2 hover:text-gold-400 transition-colors"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
            </button>
            <button className="hidden md:block border border-gold-500/50 text-gold-500 px-6 py-2 rounded-none uppercase text-[10px] font-bold tracking-[0.2em] hover:bg-gold-500 hover:text-black transition-all shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                Subscribe
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
