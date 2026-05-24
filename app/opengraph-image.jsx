import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Kimox Studio — Software con alma que habla tu idioma';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function ttf(name) {
  return readFile(join(process.cwd(), 'app', 'fonts', name));
}

export default async function OG() {
  const [monoBold, monoBoldItalic, monoRegular] = await Promise.all([
    ttf('IBMPlexMono-Bold.ttf'),
    ttf('IBMPlexMono-BoldItalic.ttf'),
    ttf('IBMPlexMono-Regular.ttf'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0e0c0a',
          color: '#f3efe4',
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
            background: '#3a3833',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 72,
            right: 72,
            height: 1,
            background: '#3a3833',
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
            color: '#8a8576',
            fontFamily: 'IBM Plex Mono',
            fontWeight: 400,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 16,
                height: 16,
                background: '#ff5c28',
                borderRadius: 999,
              }}
            />
            <span style={{ color: '#ff5c28', fontWeight: 700 }}>
              Kimox Studio
            </span>
            <span>·</span>
            <span>Estudio independiente</span>
          </div>
          <span>§ 01 / 06</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1.05,
            fontWeight: 700,
            fontSize: 92,
            letterSpacing: -3,
            color: '#f3efe4',
            fontFamily: 'IBM Plex Mono',
          }}
        >
          <span>Software con alma</span>
          <span style={{ display: 'flex' }}>
            que habla&nbsp;
            <span
              style={{
                color: '#ff5c28',
                fontStyle: 'italic',
                fontFamily: 'IBM Plex Mono Italic',
              }}
            >
              tu idioma.
            </span>
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 22,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: '#c8c2b3',
            fontFamily: 'IBM Plex Mono',
            fontWeight: 400,
          }}
        >
          <span style={{ fontWeight: 700, color: '#f3efe4' }}>
            kimoxstudio.com
          </span>
          <span style={{ color: '#8a8576' }}>Web · Móvil · A medida</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'IBM Plex Mono', data: monoBold, weight: 700, style: 'normal' },
        { name: 'IBM Plex Mono', data: monoRegular, weight: 400, style: 'normal' },
        { name: 'IBM Plex Mono Italic', data: monoBoldItalic, weight: 700, style: 'italic' },
      ],
    },
  );
}
