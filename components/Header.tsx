import React from 'react';
import { siteConfig } from '@/lib/config';
import Link from 'next/link';

export function Header() {
  return (
    <>
      {/* Top Bar Compliance */}
      <div className="bg-slate-950 text-slate-500 text-xs py-2 text-center border-b border-slate-800">
        <p>{siteConfig.name} is reader-supported. We may earn a commission if you buy through our links.</p>
      </div>

      <header className="bg-white text-slate-900 py-4 shadow-sm sticky top-0 z-50 border-b border-slate-100">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="bg-accent text-white w-8 h-8 flex items-center justify-center rounded-lg">
              {siteConfig.name.charAt(0)}
            </span>
            {siteConfig.name}
          </Link>
          <nav>
            <ul className="flex space-x-6 text-sm font-medium text-slate-600">
              <li><Link href="/" className="hover:text-accent transition">Top Picks</Link></li>
              <li><Link href="/guides" className="hover:text-accent transition">Guides</Link></li>
              <li><Link href="/about" className="hover:text-accent transition">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
