import './blog.css';
import { getFeaturedAndOthers } from '@/lib/posts';
import { BASE_URL, languageAlternates, localeUrl } from '@/lib/urls';
import BlogClient from '@/components/BlogClient';

// Localized index metadata — same copy as BlogClient's hero (existing site
// copy, not new text).
const META = {
  es: {
    title: 'Blog — Kimox Studio',
    description:
      'Cuaderno del estudio: notas técnicas sobre desarrollo web, SEO, diseño de producto y migraciones.',
  },
  en: {
    title: 'Blog — Kimox Studio',
    description:
      "The studio's notebook: technical notes on web development, SEO, product design and migrations.",
  },
  ja: {
    title: 'ブログ — Kimox Studio',
    description:
      'スタジオのノート: ウェブ開発、SEO、プロダクトデザイン、移行に関する技術メモ。',
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] ?? META.es;
  const url = localeUrl(locale, '/blog');
  // Explicit openGraph/twitter: Next.js does not merge these objects field by
  // field across segments — without them this page would inherit the layout's
  // entire openGraph (home og:url/title/description) verbatim. Same pattern as
  // blog/[slug]/page.jsx; the image is the site-wide poster the layout uses.
  const ogImage = {
    url: `${BASE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: m.title,
  };
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: languageAlternates('/blog'),
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: 'Kimox Studio',
      type: 'website',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: [ogImage.url],
    },
  };
}

export default function Page() {
  const { featured, others } = getFeaturedAndOthers();
  return <BlogClient featured={featured} others={others} />;
}
