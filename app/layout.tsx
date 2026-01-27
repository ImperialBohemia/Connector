import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { hexToRgb } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900`}>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --color-primary: ${primaryRgb};
            --color-secondary: ${secondaryRgb};
            --color-accent: ${accentRgb};
            --color-background: ${backgroundRgb};
          }
        `}} />

        <Header />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />

        {siteConfig.features.cookieConsent && <CookieConsent />}
      </body>
    </html>
  );
}
