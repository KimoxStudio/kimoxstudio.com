import '../../blog/blog.css';
import { notFound } from 'next/navigation';
import { getAllProjects, getProject } from '@/lib/projects';
import { BASE_URL, OG_LOCALES, languageAlternates, localeUrl } from '@/lib/urls';
import { serializeJsonLd } from '@/lib/jsonld';
import Nav from '@/components/Nav';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

const BREADCRUMB = {
  home: { es: 'Inicio', en: 'Home', ja: 'ホーム' },
  projects: { es: 'Proyectos', en: 'Projects', ja: 'プロジェクト' },
};

const SUFFIX = ' — Kimox Studio';

const pick = (field, locale) => field?.[locale] || field?.es || '';

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const path = `/projects/${project.slug}`;
  const title = project.name + SUFFIX;
  const description = pick(project.body, locale);
  const url = localeUrl(locale, path);
  // Explicit openGraph/twitter: Next.js does not merge these across segments,
  // so without them this page would inherit the layout's home og:url/title.
  // Same pattern as blog/page.jsx; the image is the site-wide poster.
  const ogImage = { url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: title };
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
      siteName: 'Kimox Studio',
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

export default async function Page({ params }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  // The layout's dynamicParams = false does not cascade to this segment.
  if (!project) notFound();

  const path = `/projects/${project.slug}`;
  const breadcrumbJsonLd = serializeJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: BREADCRUMB.home[locale] ?? BREADCRUMB.home.es, item: localeUrl(locale, '/') },
      { '@type': 'ListItem', position: 2, name: BREADCRUMB.projects[locale] ?? BREADCRUMB.projects.es, item: `${localeUrl(locale, '/')}#work` },
      { '@type': 'ListItem', position: 3, name: project.name, item: localeUrl(locale, path) },
    ],
  });
  const shots = project.responsive;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <Nav lang={locale} mode="post" />
      <main>
        <article>
          <header>
            {project.logo && <img src={project.logo} alt="" />}
            <p>{pick(project.category, locale)}</p>
            <h1>{project.name}</h1>
            <p>{project.year}</p>
          </header>
          <p>{pick(project.body, locale)}</p>
          <ul>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p>
            <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer">{project.url}</a>
          </p>
          {shots &&
            Object.entries(shots).map(([device, images]) => (
              <section key={device}>
                {images.map((src, i) => (
                  <img key={src} src={src} alt={`${project.name} — ${device} ${i + 1}`} loading="lazy" />
                ))}
              </section>
            ))}
        </article>
      </main>
    </>
  );
}
