import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getAllPosts, getPost } from '@/lib/posts';
import { LOCALES } from '@/lib/urls';

// Per-post OG image: same poster system as the site-wide app/opengraph-image.jsx
// (dark canvas, IBM Plex Mono, hairlines, orange accent), with the post's own
// localized title and metadata instead of the studio tagline.
//
// This is a plain route handler (not the opengraph-image file convention) on
// purpose: the file convention derives the og:image URL from the internal
// segment path, so Spanish posts advertised /es/blog/<slug>/opengraph-image —
// a URL that next.config.js 308-redirects to the unprefixed one, and most
// social scrapers do not follow redirects on og:image. The page's
// generateMetadata now points og:image/twitter:image at the public URL
// (localeUrl), which this handler serves directly.
export const runtime = 'nodejs';

// Keep in sync with the og:image width/height in blog/[slug]/page.jsx.
const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getAllPosts().map((p) => ({ locale, slug: p.slug }))
  );
}

async function ttf(name) {
  return readFile(join(process.cwd(), 'app', 'fonts', name));
}

const LABEL = {
  es: 'Blog del estudio',
  en: 'Studio blog',
  ja: 'スタジオブログ',
};

export async function GET(request, { params }) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  const title = post?.title?.[locale] || post?.title?.es || slug;
  const category = post?.category?.[locale] || post?.category?.es || '';
  const [monoBold, monoRegular] = await Promise.all([
    ttf('IBMPlexMono-Bold.ttf'),
    ttf('IBMPlexMono-Regular.ttf'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0d13',
          color: '#eef1f6',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px 64px',
          fontFamily: 'IBM Plex Mono',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 72,
            right: 72,
            height: 1,
            background: '#2c3542',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 72,
            right: 72,
            height: 1,
            background: '#2c3542',
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: '#838d9e',
            fontFamily: 'IBM Plex Mono',
            fontWeight: 400,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 16,
                height: 16,
                background: '#4c7dff',
                borderRadius: 999,
              }}
            />
            <span style={{ color: '#4c7dff', fontWeight: 700 }}>Kimox Studio</span>
            <span>·</span>
            <span>{LABEL[locale] ?? LABEL.es}</span>
          </div>
          <span>{post?.date ?? ''}</span>
        </div>

        <div
          style={{
            display: 'flex',
            lineHeight: 1.12,
            fontWeight: 700,
            fontSize: title.length > 60 ? 52 : 64,
            letterSpacing: -1.5,
            color: '#eef1f6',
            fontFamily: 'IBM Plex Mono',
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 22,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: '#c3cad6',
            fontFamily: 'IBM Plex Mono',
            fontWeight: 400,
          }}
        >
          <span style={{ fontWeight: 700, color: '#eef1f6' }}>kimoxstudio.com</span>
          <span style={{ color: '#838d9e' }}>
            {[category, post?.read_time].filter(Boolean).join(' · ')}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'IBM Plex Mono', data: monoBold, weight: 700, style: 'normal' },
        { name: 'IBM Plex Mono', data: monoRegular, weight: 400, style: 'normal' },
      ],
    }
  );
}
