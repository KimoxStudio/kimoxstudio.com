import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getPost } from '@/lib/posts';

// Per-post OG image: same poster system as the site-wide app/opengraph-image.jsx
// (dark canvas, IBM Plex Mono, hairlines, orange accent), with the post's own
// localized title and metadata instead of the studio tagline.
export const runtime = 'nodejs';
export const alt = 'Kimox Studio — Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function ttf(name) {
  return readFile(join(process.cwd(), 'app', 'fonts', name));
}

const LABEL = {
  es: 'Blog del estudio',
  en: 'Studio blog',
  ja: 'スタジオブログ',
};

export default async function OG({ params }) {
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
