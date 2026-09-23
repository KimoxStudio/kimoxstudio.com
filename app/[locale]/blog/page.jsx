import './blog.css';
import { getFeaturedAndOthers } from '@/lib/posts';
import { languageAlternates, localeUrl } from '@/lib/urls';
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
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: localeUrl(locale, '/blog'),
      languages: languageAlternates('/blog'),
    },
  };
}

export default function Page() {
  const { featured, others } = getFeaturedAndOthers();
  return <BlogClient featured={featured} others={others} />;
}
