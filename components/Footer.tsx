import React from 'react';
import { siteConfig } from '@/lib/config';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black text-slate-400 py-20 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white font-serif font-bold text-xl mb-6 flex items-center gap-3">
              <span className="bg-gold-gradient w-8 h-8 flex items-center justify-center rounded text-xs text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                 {siteConfig.name.charAt(0)}
              </span>
              {siteConfig.name}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500 mb-8 font-light">
              {siteConfig.description}
            </p>
            <div className="text-xs text-slate-600 border-l-2 border-gold-900 pl-3">
                <p className="uppercase tracking-widest text-[10px] mb-1 text-gold-700">System Status</p>
                <p className="text-gold-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Operational
                </p>
            </div>
          </div>

          <div>
            <h4 className="text-gold-500 font-bold mb-8 tracking-[0.2em] text-xs uppercase">Company</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
              <li><Link href="/guides" className="hover:text-gold-400 transition-colors">Methodology</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-500 font-bold mb-8 tracking-[0.2em] text-xs uppercase">Legal</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclosure" className="hover:text-gold-400 transition-colors">Affiliate Disclosure</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-500 font-bold mb-8 tracking-[0.2em] text-xs uppercase">Exclusive Access</h4>
            <p className="text-sm text-slate-500 mb-6 font-light">
              Join the inner circle for early access to autonomous deal findings.
            </p>
            <form className="flex gap-2">
                <input
                    type="email"
                    placeholder="Enter email"
                    className="bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-gold-500/50 transition-colors placeholder:text-slate-700"
                />
                <button className="bg-gold-gradient text-black px-6 py-3 rounded text-sm font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    Join
                </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-700 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 opacity-50 hover:opacity-100 transition-opacity">
             <span>Designed by Jules (AI)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
