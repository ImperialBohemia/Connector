import { getSheetData } from "@/lib/sheets";
import { ReviewPage } from "@/components/templates/ReviewPage";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Force static generation for these routes
export const dynamicParams = false;

// ISR Revalidation (1 hour)
export const revalidate = 3600;

// Generate segments for all slugs in the Sheet
export async function generateStaticParams() {
  const data = await getSheetData();
  return data.map((page) => ({
    slug: page.slug,
  }));
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getSheetData();
  const page = data.find((p) => p.slug === params.slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  const baseUrl = "https://connector-app-flame.vercel.app";
  // Use hero image for OG if available
  const ogImage = page.heroImage || `https://via.placeholder.com/1200x630.png?text=${encodeURIComponent(page.title)}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${baseUrl}/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${baseUrl}/${page.slug}`,
      siteName: "Connector Reviews",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "article",
      authors: [page.author],
      publishedTime: new Date().toISOString(), // In real app, store this in DB
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getSheetData();
  const page = data.find((p) => p.slug === params.slug);

  if (!page) {
    notFound();
  }

  const baseUrl = "https://connector-app-flame.vercel.app";
  const validUntil = new Date();
  validUntil.setFullYear(validUntil.getFullYear() + 1);
  const validUntilIso = validUntil.toISOString().split('T')[0];

  // JSON-LD Structured Data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": page.title,
      "item": `${baseUrl}/${page.slug}`
    }]
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Product",
      "name": page.title, // Generally the "Best X" category
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": page.verdict.score,
      "bestRating": "10",
      "worstRating": "1"
    },
    "author": {
      "@type": "Person",
      "name": page.author
    },
    "reviewBody": page.verdict.summary
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      <ReviewPage
        title={page.title}
        subtitle={page.subtitle}
        author={page.author}
        date={page.date}
        heroImage={page.heroImage}
        verdict={page.verdict}
        products={page.products}
        content={page.content}
        faq={page.faq}
      />
    </>
  );
}
