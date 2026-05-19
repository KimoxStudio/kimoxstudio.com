'use client';

import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { I18N as I } from '../lib/i18n';
import { useLang, LANGS, t } from '../lib/lang';
import { useBlogCursor } from '../lib/cursor';
import ThemeToggle from './ThemeToggle';

function dedent(s) {
  if (!s) return '';
  const lines = s.split('\n');
  const indents = lines
    .filter((l) => l.trim().length > 0)
    .map((l) => l.match(/^ */)[0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return min > 0 ? lines.map((l) => l.slice(min)).join('\n') : s;
}

function Nav({ lang, setLang }) {
  return (
    <nav className="top">
      <div className="row">
        <Link href="/" className="logo" data-hover>
          <span className="dot">
            <img src="/logos/icon.svg" alt="Kimox Studio" />
          </span>
          <span>
            Kimox<span style={{ color: 'var(--orange)' }}>.</span>Studio
          </span>
        </Link>
        <div className="links">
          <Link href="/#work">{t(I.nav.work, lang)}</Link>
          <Link href="/#services">{t(I.nav.services, lang)}</Link>
          <Link href="/#process">{t(I.nav.process, lang)}</Link>
          <Link href="/#about">{t(I.nav.about, lang)}</Link>
          <Link href="/blog" className="active">
            {t(I.nav.blog, lang)}
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ThemeToggle />
          <div className="lang-switch">
            {LANGS.map((l) => (
              <button
                key={l.code}
                className={lang === l.code ? 'active' : ''}
                onClick={() => setLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <Link
            href="/#contact"
            style={{
              background: 'var(--ink)',
              color: 'var(--bg)',
              padding: '10px 18px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {t(I.nav.contact, lang)} →
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function BlogPostClient({ post }) {
  const [lang, setLang] = useLang();
  useBlogCursor();

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <article style={{ paddingBottom: 80 }}>
        <div className="wrap" style={{ paddingTop: 48, paddingBottom: 24 }}>
          <Link
            href="/blog"
            data-hover
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 11,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
            }}
          >
            ← {lang === 'ja' ? 'ブログ' : lang === 'en' ? 'Back to blog' : 'Volver al blog'}
          </Link>
        </div>
        <header
          className="wrap"
          style={{ paddingBottom: 40, borderBottom: '1px solid var(--rule)' }}
        >
          <div
            style={{
              display: 'flex',
              gap: 16,
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 11,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
              marginBottom: 24,
            }}
          >
            <span style={{ color: 'var(--orange)', fontWeight: 600 }}>
              {t(post.category, lang)}
            </span>
            <span>{post.date}</span>
            <span>· {post.read_time}</span>
          </div>
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
            {t(post.title, lang)}
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
          <p
            style={{
              fontSize: 24,
              lineHeight: 1.4,
              marginBottom: 40,
              color: 'var(--ink)',
              fontWeight: 500,
            }}
          >
            {t(post.excerpt, lang)}
          </p>
          <div className="post-body">
            <ReactMarkdown>{dedent(t(post.body, lang) || post.content)}</ReactMarkdown>
          </div>
        </section>
        <footer className="bot" style={{ marginTop: 100 }}>
          <div className="wrap">
            <div className="row">
              <div>{t(I.footer.rights, lang)}</div>
              <div style={{ display: 'flex', gap: 24 }}>
                <a href={`mailto:${I.meta.email}`}>{I.meta.email}</a>
                <Link href="/">← Home</Link>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}
