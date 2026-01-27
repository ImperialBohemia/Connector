import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { hexToRgb } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const primaryRgb = hexToRgb(siteConfig.theme.primary);
  const secondaryRgb = hexToRgb(siteConfig.theme.secondary);
  const accentRgb = hexToRgb(siteConfig.theme.accent);
  const backgroundRgb = hexToRgb(siteConfig.theme.background);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-black text-slate-200 selection:bg-gold-500 selection:text-black`}>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --color-primary: ${primaryRgb};
            --color-secondary: ${secondaryRgb};
            --color-accent: ${accentRgb};
            --color-background: ${backgroundRgb};
          }
        `}} />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-black focus:top-0 focus:left-0"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="min-h-screen">
          {children}
        </main>

        <Footer />

        {siteConfig.features.cookieConsent && <CookieConsent />}
      </body>
    </html>
  );
}
