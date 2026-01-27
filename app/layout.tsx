import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://connector-app-flame.vercel.app"),
  title: "Top Product Comparisons",
  description: "Expert reviews and comparisons for the best products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900`}>
        {/* Top Bar Compliance */}
        <div className="bg-slate-950 text-slate-500 text-xs py-2 text-center border-b border-slate-800">
          <p>Connector Reviews is reader-supported. We may earn a commission if you buy through our links.</p>
        </div>

        <header className="bg-white text-slate-900 py-4 shadow-sm sticky top-0 z-50 border-b border-slate-100">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="font-bold text-xl tracking-tight flex items-center gap-2">
              <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg">C</span>
              Connector Reviews
            </div>
            <nav>
              <ul className="flex space-x-6 text-sm font-medium text-slate-600">
                <li><a href="/" className="hover:text-blue-600 transition">Top Picks</a></li>
                <li><a href="/guides" className="hover:text-blue-600 transition">Guides</a></li>
                <li><a href="/about" className="hover:text-blue-600 transition">About</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12 mt-12 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-white font-bold mb-4">Connector Reviews</h3>
                <p className="text-xs leading-relaxed">
                  Your trusted source for expert reviews and &quot;Goldilocks&quot; comparisons. We help you find the best value products instantly.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Legal</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
                  <li><a href="/disclosure" className="hover:text-white transition">Affiliate Disclosure</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Connect</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
                  <li><a href="#" className="hover:text-white transition">Editorial Guidelines</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-xs">
              <p>&copy; {new Date().getFullYear()} Imperial Bohemia. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
