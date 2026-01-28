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
    primary: string; // Deep Black
    secondary: string; // Rich Charcoal
    accent: string; // Metallic Gold
    background: string; // Pure Black
  };
  features: {
    cookieConsent: boolean;
  };
  verification: {
    google?: string;
    bing?: string;
    yandex?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Connector Live",
  description: "The world's premier autonomous review system. Defining luxury and value through data-driven analysis.",
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
    primary: "#050505",   // Deep Black
    secondary: "#1a1a1a", // Rich Charcoal
    accent: "#D4AF37",    // Metallic Gold
    background: "#000000", // Pure Black
  },
  features: {
    cookieConsent: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  },
};
