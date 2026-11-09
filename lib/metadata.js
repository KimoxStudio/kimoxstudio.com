import { BASE_URL, OG_LOCALES, languageAlternates, localeUrl } from './urls';

export const SITE_NAME = 'Kimox Studio';

// Size of the site-wide poster (app/opengraph-image).
const OG_IMAGE_SIZE = { width: 1200, height: 630 };
const SITE_POSTER = `${BASE_URL}/opengraph-image`;

/**
 * Page metadata for a localized public route: canonical, hreflang alternates
 * and explicit openGraph / twitter blocks. The blocks are explicit because
 * Next.js does not merge them across segments: without them a page inherits
 * the layout's og:url / title / description verbatim.
 */
export function buildMetadata({ locale, path, title, description }) {
  const url = localeUrl(locale, path);
  const ogImage = { url: SITE_POSTER, ...OG_IMAGE_SIZE, alt: title };
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale] ?? OG_LOCALES.es,
      type: 'website',
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
