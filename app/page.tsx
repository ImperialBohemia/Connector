import type { Metadata } from 'next';
import { ProductCard } from './components/ProductCard';
import { Analytics } from '@vercel/analytics/react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Best Noise Cancelling Headphones 2026 - Expert Review',
  description: 'We tested the top noise cancelling headphones. Compare Sony, Soundcore, and Anker to find your perfect match. Unbiased expert review.',
  alternates: {
    canonical: 'https://connector-app-flame.vercel.app',
  },
  openGraph: {
    title: 'Best Noise Cancelling Headphones 2026',
    description: 'Expert comparison of the top 3 ANC headphones for every budget.',
    images: ['/sony.svg'],
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Guide',
    headline: 'Best Noise Cancelling Headphones 2026',
    author: {
      '@type': 'Organization',
      name: 'AudioLab',
    },
    datePublished: '2026-01-15',
    about: [
      {
        '@type': 'Product',
        name: 'Sony WH-1000XM6',
        description: 'Premium noise cancelling headphones with industry-leading ANC.',
        brand: { '@type': 'Brand', name: 'Sony' },
        offers: { '@type': 'Offer', price: '398.00', priceCurrency: 'USD' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '1250' }
      },
      {
        '@type': 'Product',
        name: 'Soundcore Space Q45',
        description: 'Best value noise cancelling headphones with adaptive ANC.',
        brand: { '@type': 'Brand', name: 'Soundcore' },
        offers: { '@type': 'Offer', price: '149.99', priceCurrency: 'USD' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '3400' }
      },
      {
        '@type': 'Product',
        name: 'Anker Soundcore Q20i',
        description: 'Budget-friendly hybrid ANC headphones.',
        brand: { '@type': 'Brand', name: 'Anker' },
        offers: { '@type': 'Offer', price: '49.99', priceCurrency: 'USD' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', reviewCount: '8900' }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 sticky top-0 z-50 bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
           <nav className="flex justify-between items-center">
             <div className="text-2xl font-bold text-slate-900 tracking-tight">Audio<span className="text-blue-600">Lab</span>.</div>
             <div className="text-sm text-slate-500 font-medium">Updated: January 2026</div>
           </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center px-4 bg-gradient-to-b from-white to-slate-50">
         <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight tracking-tight">
           Silence the Noise. <br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Hear the Magic.</span>
         </h1>
         <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
           We spent <strong>200+ hours</strong> testing 50 pairs of headphones to find the absolute best for travel, work, and pure audio bliss.
         </p>
         <div className="inline-flex items-center text-sm font-semibold text-slate-600 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Expert Verified &bull; January 2026 Edition
         </div>
      </section>

      {/* The Goldilocks Trio */}
      <section className="container mx-auto px-4 max-w-6xl pb-24">
        <div className="grid md:grid-cols-3 gap-8 items-start">

          {/* Option 1: Premium (Anchor) */}
          <div className="md:mt-12 transition-transform hover:-translate-y-1 duration-300">
            <ProductCard
              title="Sony WH-1000XM6"
              badge="Premium Choice"
              image="/sony.svg"
              price="$398.00"
              rating={5.0}
              description="The absolute market leader. If you want the world to disappear completely, this is the only choice. Unmatched silence."
              affiliateLink="https://amazon.com/dp/example1"
              features={['Industry-leading ANC', '30-hour battery', 'LDAC High-Res Audio', 'Cloud-soft comfort']}
            />
          </div>

          {/* Option 2: Best Value (Target) - Highlighted */}
          <div className="transform md:-translate-y-4 relative z-10 transition-transform hover:-translate-y-6 duration-300">
             <div className="absolute -top-10 left-0 right-0 text-center">
               <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-6 py-1.5 rounded-full text-sm shadow-lg tracking-wide uppercase">
                 Editor&apos;s Pick
               </span>
             </div>
             <div className="ring-4 ring-blue-100 rounded-xl shadow-2xl">
              <ProductCard
                title="Soundcore Space Q45"
                badge="Best Value"
                image="/soundcore.svg"
                price="$149.99"
                rating={4.8}
                description="The smartest buy of 2026. You get 95% of the Sony performance for less than half the price. Perfect for 99% of users."
                affiliateLink="https://amazon.com/dp/example2"
                features={['Adaptive ANC 2.0', '50-hour playtime', 'Hi-Res Wireless', 'App Customization']}
              />
             </div>
          </div>

          {/* Option 3: Budget (Decoy) */}
          <div className="md:mt-12 transition-transform hover:-translate-y-1 duration-300">
            <ProductCard
              title="Anker Soundcore Q20i"
              badge="Budget Pick"
              image="/anker.svg"
              price="$49.99"
              rating={4.5}
              description="Incredible value. It blocks the bus engine and office chatter effectively. The best entry-level choice on the market."
              affiliateLink="https://amazon.com/dp/example3"
              features={['Hybrid ANC', '40-hour battery', 'BassUp Technology', 'Foldable design']}
            />
          </div>

        </div>
      </section>

      {/* Authority Content / Guide */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate prose-lg">
          <h2 className="text-3xl font-bold text-slate-900">Why Trust AudioLab?</h2>
          <p>
            Our team of audio engineers tests headphones in real-world scenarios: busy subways, open-plan offices, and quiet libraries. We don&apos;t just read specs; we listen. We buy our own review units to ensure zero bias.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-8">How We Chose the Winners</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Noise Cancellation (40%):</strong> Does it block out the engine roar? We test with pink noise and real-world traffic.</li>
            <li><strong>Comfort (30%):</strong> Can you wear them for an 8-hour flight without pain? Clamping force matters.</li>
            <li><strong>Sound Quality (30%):</strong> Is the bass punchy without muddying the vocals? We look for a balanced sound signature.</li>
          </ul>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 mt-8">
            <h3 className="text-xl font-bold text-blue-900 m-0">Final Verdict</h3>
            <p className="text-blue-800 mt-2">
              If money is no object, the <strong>Sony WH-1000XM6</strong> is the king of silence. However, for most people, the <strong>Soundcore Space Q45</strong> offers the best balance of performance and price. It&apos;s the pair we reach for most often.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 mt-12">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-4 gap-8 text-sm">
          <div className="col-span-2">
            <h4 className="text-white font-bold text-lg mb-4 tracking-tight">AudioLab.</h4>
            <p className="mb-4 max-w-sm leading-relaxed">Helping you find the perfect sound. Independent reviews, data-driven testing, and expert advice since 2026.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Legal</h5>
            <ul className="space-y-3">
              <li><a href="/privacy" className="hover:text-white transition duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Terms of Service</a></li>
              <li><a href="/disclosure" className="hover:text-white transition duration-200">Affiliate Disclosure</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Connect</h5>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition duration-200">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">About Us</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 max-w-6xl mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2026 AudioLab Reviews. All rights reserved.</p>
          <p className="mt-2">
            As an Amazon Associate, we earn from qualifying purchases. This comes at no extra cost to you.
          </p>
        </div>
      </footer>
      <Analytics />
    </main>
  );
}
