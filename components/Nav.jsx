'use client';

import React from 'react';
import Link from 'next/link';
import { I18N as I } from '../lib/i18n';
import { LANGS, t } from '../lib/lang';
import ThemeToggle from './ThemeToggle';

// Landing section ids the nav links point at, in document order. Used to mark
// the link for whichever section is currently crossing the viewport.
const SECTIONS = ['work', 'services', 'process', 'about', 'contact'];

/**
 * Shared site nav.
 * `mode` — 'landing' uses in-page anchors (#section); anything else builds links to /#section.
 * `activeBlog` — adds `active` class on the Blog link.
 * `hideLangSwitch` — hides the ES/EN/JA switcher, for routes with no per-language content (e.g. legal pages).
 */
export default function Nav({
  lang,
  setLang,
  mode = 'landing',
  activeBlog = false,
  hideLangSwitch = false,
}) {
  const [activeSection, setActiveSection] = React.useState(null);
  // Sections are rendered by sibling templates/islands, so they may not all be
  // in the DOM on the nav's first effect. Rescan a few times until they are.
  const [scan, setScan] = React.useState(0);

  React.useEffect(() => {
    if (mode !== 'landing') return;
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    if (els.length < SECTIONS.length && scan < 5) {
      const retry = setTimeout(() => setScan((n) => n + 1), 250);
      return () => clearTimeout(retry);
    }
    if (!els.length) return;

    // Zero-height band across the middle of the viewport: a section is active
    // while it is the one crossing that line. Nothing matches over the hero,
    // which is intentional — no link is marked at the top of the page.
    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        setActiveSection(SECTIONS.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mode, scan]);

  const sectionLink = (section) => (mode === 'landing' ? `#${section}` : `/#${section}`);
  const sectionClass = (section) => (activeSection === section ? 'active' : undefined);
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
          <HomeOrAnchor href={sectionLink('work')} className={sectionClass('work')}>
            /proyectos
          </HomeOrAnchor>
          <HomeOrAnchor href={sectionLink('services')} className={sectionClass('services')}>
            /servicios
          </HomeOrAnchor>
          <HomeOrAnchor href={sectionLink('process')} className={sectionClass('process')}>
            /proceso
          </HomeOrAnchor>
          <HomeOrAnchor href={sectionLink('about')} className={sectionClass('about')}>
            /nosotros
          </HomeOrAnchor>
          <HomeOrAnchor href="#">/blog</HomeOrAnchor>
        </div>
        <div className="right">
          <ThemeToggle />
          {!hideLangSwitch && (
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
          )}
          <HomeOrAnchor href={sectionLink('contact')} className="cta-pill">
            {t(I.nav.contact, lang)} →
          </HomeOrAnchor>
        </div>
      </div>
    </nav>
  );
}
