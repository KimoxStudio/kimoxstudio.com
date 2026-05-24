'use client';

import React from 'react';
import Link from 'next/link';
import { I18N as I } from '../lib/i18n';
import { LANGS, t } from '../lib/lang';
import ThemeToggle from './ThemeToggle';

/**
 * Shared site nav.
 * `mode` — 'landing' uses in-page anchors (#section); anything else builds links to /#section.
 * `activeBlog` — adds `active` class on the Blog link.
 */
export default function Nav({ lang, setLang, mode = 'landing', activeBlog = false }) {
  const sectionLink = (section) => (mode === 'landing' ? `#${section}` : `/#${section}`);
  const HomeOrAnchor = ({ href, children, ...rest }) =>
    mode === 'landing' ? (
      <a href={href} {...rest}>
        {children}
      </a>
    ) : (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );

  return (
    <nav className="top">
      <div className="row">
        <HomeOrAnchor href={mode === 'landing' ? '#top' : '/'} className="logo" data-hover>
          <span className="glyph">
            <img src="/logos/icon.svg" alt="Kimox Studio" />
          </span>
          <span>KIMOX·STUDIO</span>
        </HomeOrAnchor>
        <div className="links">
          <HomeOrAnchor href={sectionLink('work')}>
            /{t(I.nav.work, lang).toLowerCase()}
          </HomeOrAnchor>
          <HomeOrAnchor href={sectionLink('services')}>
            /{t(I.nav.services, lang).toLowerCase()}
          </HomeOrAnchor>
          <HomeOrAnchor href={sectionLink('process')}>
            /{t(I.nav.process, lang).toLowerCase()}
          </HomeOrAnchor>
          <HomeOrAnchor href={sectionLink('about')}>
            /{t(I.nav.about, lang).toLowerCase()}
          </HomeOrAnchor>
          <Link href="/blog" className={activeBlog ? 'active' : ''}>
            /{t(I.nav.blog, lang).toLowerCase()}
          </Link>
        </div>
        <div className="right">
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
          <HomeOrAnchor href={sectionLink('contact')} className="cta-pill">
            {t(I.nav.contact, lang)} →
          </HomeOrAnchor>
        </div>
      </div>
    </nav>
  );
}
