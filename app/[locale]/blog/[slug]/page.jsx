import '../blog.css';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost } from '@/lib/posts';
import { BASE_URL, OG_LOCALES, ORG_ID, WEBSITE_ID, languageAlternates, localeUrl } from '@/lib/urls';
import { serializeJsonLd } from '@/lib/jsonld';
import BlogPostClient from '@/components/BlogPostClient';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

const SUFFIX = ' — Kimox Studio';
const TITLE_MAX = 60;
const BREADCRUMB = {
  home: { es: 'Inicio', en: 'Home', ja: 'ホーム' },
  blog: { es: 'Blog', en: 'Blog', ja: 'ブログ' },
};

// <title>: drop the sentence-final period (it would read ". — Kimox Studio")
// and only append the brand when the result still fits a search snippet.
function pageTitle(title) {
  const bare = title.replace(/[.。]+$/, '');
  return bare.length + SUFFIX.length <= TITLE_MAX ? bare + SUFFIX : bare;
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
    title: pageTitle(title),
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
      locale: OG_LOCALES[locale] ?? OG_LOCALES.es,
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

  // BlogPosting + BreadcrumbList structured data — only facts from the post's
  // own frontmatter; posts carry no personal byline, so the author is the
  // studio (the Organization node defined site-wide in the layout, by @id).
  // Every `<` is escaped (serializeJsonLd) so post-provided text containing a
  // literal </script> can never close the inline script tag early.
  const path = `/blog/${post.slug}`;
  const url = localeUrl(locale, path);
  const headline = post.title?.[locale] || post.title?.es || post.slug;
  const articleJsonLd = serializeJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline,
        description: post.excerpt?.[locale] || post.excerpt?.es,
        image: localeUrl(locale, `${path}/opengraph-image`),
        datePublished: post.date,
        // Posts have no separate "updated" field.
        dateModified: post.date,
        inLanguage: locale,
        mainEntityOfPage: url,
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@type': 'Organization', '@id': ORG_ID, name: 'Kimox Studio', url: BASE_URL },
        publisher: {
          '@type': 'Organization',
          '@id': ORG_ID,
          name: 'Kimox Studio',
          url: BASE_URL,
          logo: {
            '@type': 'ImageObject',
            // PNG, not SVG: Google doesn't reliably support SVG logos.
            url: `${BASE_URL}/icon.png`,
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: BREADCRUMB.home[locale] ?? BREADCRUMB.home.es, item: localeUrl(locale, '/') },
          { '@type': 'ListItem', position: 2, name: BREADCRUMB.blog[locale] ?? BREADCRUMB.blog.es, item: localeUrl(locale, '/blog') },
          { '@type': 'ListItem', position: 3, name: headline, item: url },
        ],
      },
    ],
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
