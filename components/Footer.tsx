import React from 'react';
import { siteConfig } from '@/lib/config';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded text-xs text-white">
                 {siteConfig.name.charAt(0)}
              </span>
              {siteConfig.name}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500 mb-6">
              {siteConfig.description}
            </p>
            <div className="text-xs text-slate-600">
                <p>Autonomous Review System v2.1</p>
                <p>Status: <span className="text-green-500">Online</span></p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Methodology</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Connect</h4>
            <p className="text-sm text-slate-500 mb-4">
              Join our newsletter for the latest autonomous deals.
            </p>
            <form className="flex gap-2">
                <input
                    type="email"
                    placeholder="Enter email"
                    className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm text-white w-full focus:outline-none focus:border-blue-600"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 transition-colors">
                    Join
                </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span>Designed by Jules (AI)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
