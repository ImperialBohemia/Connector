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
    // Colors
    primary: string;   // Main brand color (Headers, Logos)
    secondary: string; // Secondary text/elements
    accent: string;    // CTAs, Links, Highlights
    background: string;// Main page background
    surface: string;   // Cards, Sidebars, Modals

    // Layout
    maxWidth: string;  // e.g. '1200px'
    borderRadius: string; // e.g. '0.5rem'

    // Typography
    fontHeading: string; // e.g. 'Inter'
    fontBody: string;    // e.g. 'Inter'
  };
  features: {
    cookieConsent: boolean;
    stickyHeader: boolean;
    heroOverlay: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: "Connector Reviews",
  description: "Expert reviews and comparisons for the best products. We help you find the best value instantly.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://connector-app-flame.vercel.app",
  author: "Imperial Bohemia",
  company: {
    name: "Imperial Bohemia",
    email: "business@imperialbohemia.com",
  },
  socials: {
    twitter: "https://twitter.com/connector",
  },
  theme: {
    // "Golden Master" Theme Configuration
    primary: "#0f172a",    // Slate 900 (Deep, Professional)
    secondary: "#475569",  // Slate 600 (Readable Contrast)
    accent: "#2563eb",     // Blue 600 (High-Trust Action)
    background: "#ffffff", // Pure White (Modern Clean)
    surface: "#f8fafc",    // Slate 50 (Subtle Separation)

    maxWidth: "1280px",
    borderRadius: "0.5rem", // 8px (Modern Standard)

    fontHeading: "Inter",
    fontBody: "Inter",
  },
  features: {
    cookieConsent: true,
    stickyHeader: true,
    heroOverlay: true,
  },
};
