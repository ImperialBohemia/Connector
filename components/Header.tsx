import React from 'react';
import { siteConfig } from '@/lib/config';
import Link from 'next/link';

export function Header() {
  return (
    <>
      {/* Top Bar Compliance */}
      <div className="bg-slate-950 text-slate-400 text-xs py-2 text-center border-b border-slate-800 tracking-wide">
        <p>{siteConfig.name} is reader-supported. We may earn a commission if you buy through our links.</p>
      </div>

      <header className="bg-white/80 backdrop-blur-md text-slate-900 py-4 shadow-sm sticky top-0 z-50 border-b border-slate-100 transition-all">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2 group">
            <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg shadow-md group-hover:bg-blue-700 transition-colors">
              {siteConfig.name.charAt(0)}
            </span>
            <span className="group-hover:text-blue-600 transition-colors">{siteConfig.name}</span>
          </Link>
          <nav>
            <ul className="flex space-x-8 text-sm font-medium text-slate-600">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Top Picks</Link></li>
              <li><Link href="/guides" className="hover:text-blue-600 transition-colors">Buying Guides</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About AI</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
