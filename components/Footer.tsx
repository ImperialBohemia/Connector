import React from 'react';
import { siteConfig } from '@/lib/config';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">{siteConfig.name}</h3>
            <p className="text-xs leading-relaxed">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/disclosure" className="hover:text-white transition">Affiliate Disclosure</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#" className="hover:text-white transition">Contact Support</Link></li>
              <li><Link href="#" className="hover:text-white transition">Editorial Guidelines</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
