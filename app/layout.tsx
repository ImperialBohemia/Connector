import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://connector-app-flame.vercel.app"),
  title: "Top Product Comparisons",
  description: "Expert reviews and comparisons for the best products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-slate-900 text-white py-4 shadow-md">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="font-bold text-xl tracking-tight">Connector Reviews</div>
            <nav>
              <ul className="flex space-x-6 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400 transition">Top Picks</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Guides</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Imperial Bohemia. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
