'use client';

import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { I18N as I } from '../lib/i18n';
import { useLang, t } from '../lib/lang';
import { useBlogCursor } from '../lib/cursor';
import Nav from './Nav';

export default function LegalPageClient({ title, body, slug }) {
  const [lang, setLang] = useLang();
  useBlogCursor();

  return (
    <>
      <Nav lang={lang} setLang={setLang} mode="post" hideLangSwitch />
      <article style={{ paddingBottom: 80 }}>
        <div className="wrap" style={{ paddingTop: 48, paddingBottom: 24 }}>
          <Link
            href="/"
            data-hover
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 11,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
            }}
          >
            ← {lang === 'ja' ? 'ホーム' : lang === 'en' ? 'Back home' : 'Volver al inicio'}
          </Link>
        </div>
        <header
          className="wrap"
          style={{ paddingBottom: 40, borderBottom: '1px solid var(--rule)' }}
        >
          <h1
            style={{
              fontFamily: 'Familjen Grotesk, sans-serif',
              fontSize: 'clamp(40px, 7vw, 110px)',
              lineHeight: 0.92,
              letterSpacing: '-0.045em',
              fontWeight: 700,
              margin: 0,
              textTransform: 'uppercase',
              textWrap: 'balance',
              color: 'var(--ink)',
            }}
          >
            {title}
          </h1>
        </header>
        <section
          className="wrap"
          style={{
            paddingTop: 56,
            maxWidth: 780,
            fontFamily: 'Familjen Grotesk, sans-serif',
            fontSize: 18,
            lineHeight: 1.6,
            color: 'var(--ink-2)',
          }}
        >
          <div className="post-body">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </section>
        <footer className="bot" style={{ marginTop: 100 }}>
          <div className="wrap">
            <div className="row">
              <div>{t(I.footer.rights, lang)}</div>
              <div style={{ display: 'flex', gap: 24 }}>
                <a href={`mailto:${I.meta.email}`}>{I.meta.email}</a>
                {slug !== 'politica-privacidad' && (
                  <Link href="/politica-privacidad">Privacidad</Link>
                )}
                {slug !== 'aviso-legal' && <Link href="/aviso-legal">Aviso Legal</Link>}
                <Link href="/">← Home</Link>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}
