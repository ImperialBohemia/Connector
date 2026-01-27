export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: string;
  company: {
    name: string;
    email: string;
    address?: string;
  };
  socials: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  theme: {
    primary: string; // e.g. #0f172a (slate-900)
    secondary: string; // e.g. #334155 (slate-700)
    accent: string; // e.g. #2563eb (blue-600)
    background: string; // e.g. #f8fafc (slate-50)
  };
  features: {
    cookieConsent: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: "Connector Live",
  description: "The world's smartest autonomous review system. We help you find the best value instantly through data-driven analysis.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://connector-live.vercel.app",
  author: "Imperial Bohemia",
  company: {
    name: "Imperial Bohemia",
    email: "business@imperialbohemia.com",
  },
  socials: {
    twitter: "https://twitter.com/connector",
  },
  theme: {
    primary: "#0f172a",   // Slate 900
    secondary: "#334155", // Slate 700
    accent: "#2563eb",    // Blue 600
    background: "#f8fafc", // Slate 50
  },
  features: {
    cookieConsent: true,
  },
};
