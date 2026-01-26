import { Metadata } from 'next';

export const robots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export const bingSeoMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Connector - Best Affiliate Deals',
    template: '%s | Connector',
  },
  description: 'Discover the best affiliate deals curated for you.',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Connector',
  },
  twitter: {
    card: 'summary_large_image',
  },
  other: {
    'msvalidate.01': process.env.BING_VERIFICATION_CODE || '', // Critical for Bing
  },
};
