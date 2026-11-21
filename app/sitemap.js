import { getAllPosts } from '../lib/posts';
import { LOCALES, languageAlternates, localeUrl } from '../lib/urls';
import { SERVICE_PAGES } from '../lib/service-pages';

// One entry per language variant of every page (es unprefixed, /en, /ja),
// each carrying the full hreflang alternates map so the three variants
// cross-reference each other.
export default function sitemap() {
  const posts = getAllPosts();
  const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : new Date();

  const perLocale = (path, extra) =>
    LOCALES.map((locale) => ({
      url: localeUrl(locale, path),
      alternates: { languages: languageAlternates(path) },
      ...extra,
    }));

  return [
    ...perLocale('/', { changeFrequency: 'monthly', priority: 1 }),
    // Spanish-only service pages: no /en or /ja variant, so no alternates.
    ...SERVICE_PAGES.map(({ path }) => ({
      url: localeUrl('es', path),
      changeFrequency: 'monthly',
      priority: 0.9,
    })),
    ...perLocale('/blog', {
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    ...posts.flatMap((post) =>
      perLocale(`/blog/${post.slug}`, {
        lastModified: post.date ? new Date(post.date) : undefined,
        changeFrequency: 'yearly',
        priority: 0.6,
      })
    ),
  ];
}
