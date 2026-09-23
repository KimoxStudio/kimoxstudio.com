import '../blog.css';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost } from '@/lib/posts';
import { BASE_URL, languageAlternates, localeUrl } from '@/lib/urls';
import BlogPostClient from '@/components/BlogPostClient';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = post.title?.[locale] || post.title?.es || post.slug;
  const description = post.excerpt?.[locale] || post.excerpt?.es;
  const path = `/blog/${post.slug}`;
  // Public og:image URL. Built with localeUrl (not the file convention) so the
  // Spanish/default locale advertises the real unprefixed URL instead of the
  // internal /es/... path that next.config.js 308-redirects — most social
  // scrapers don't follow redirects on og:image.
  const ogImage = {
    url: localeUrl(locale, `${path}/opengraph-image`),
    width: 1200,
    height: 630,
    alt: title,
  };
  return {
    title: `${title} — Kimox Studio`,
    description,
    alternates: {
      canonical: localeUrl(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: localeUrl(locale, path),
      siteName: 'Kimox Studio',
      type: 'article',
      publishedTime: post.date,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export default async function Page({ params }) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // BlogPosting structured data — only facts from the post's own
  // frontmatter; the author is the studio (posts carry no personal byline).
  const articleJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title?.[locale] || post.title?.es || post.slug,
    description: post.excerpt?.[locale] || post.excerpt?.es,
    datePublished: post.date,
    inLanguage: locale,
    mainEntityOfPage: localeUrl(locale, `/blog/${post.slug}`),
    author: {
      '@type': 'Organization',
      name: 'Kimox Studio',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kimox Studio',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        // PNG, not SVG: Google doesn't reliably support SVG logos in
        // structured data (same reason the favicon moved to app/icon.png).
        url: `${BASE_URL}/icon.png`,
      },
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJsonLd }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
