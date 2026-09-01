'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { I18N as I } from '../lib/i18n';
import { LANGS, t } from '../lib/lang';
import ThemeToggle from './ThemeToggle';

// Landing section ids the nav links point at, in document order. Used to mark
// the link for whichever section is currently crossing the viewport.
const SECTIONS = ['services', 'process', 'work', 'about', 'contact'];

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
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuId = 'nav-mobile-menu';
  const menuButtonRef = React.useRef(null);
  const menuPanelRef = React.useRef(null);
  const navRef = React.useRef(null);
  // The backdrop is portaled to document.body (see render below) instead of
  // rendered as a descendant of <nav>. `nav.top` has `backdrop-filter`,
  // which establishes a containing block for `position: fixed` descendants
  // in Chromium/Firefox — if the backdrop stayed nested inside it, `fixed`
  // would resolve against nav's own ~68px box instead of the viewport.
  // Portals only work client-side, so it's deferred until after mount.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Escape-to-close + return focus to the toggle button when the mobile
  // panel closes via keyboard, plus a focus trap: Tab/Shift+Tab wrap
  // between the first and last focusable elements inside the panel so
  // focus can't escape onto content behind it while it's open.
  React.useEffect(() => {
    if (!menuOpen) return;
    const FOCUSABLE = 'a[href], button:not([disabled])';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key === 'Tab') {
        const panel = menuPanelRef.current;
        if (!panel) return;
        const focusable = Array.from(panel.querySelectorAll(FOCUSABLE));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    // Move focus into the panel once it opens.
    menuPanelRef.current?.querySelector('a, button')?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Close the mobile panel automatically if the viewport grows back past
  // the breakpoint where it's rendered (e.g. rotating a tablet).
  React.useEffect(() => {
    if (!menuOpen) return;
    const mql = window.matchMedia('(min-width: 1101px)');
    const onChange = () => {
      if (mql.matches) setMenuOpen(false);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [menuOpen]);

  // While the mobile panel is open, isolate it from the rest of the page:
  // sibling content (everything rendered alongside <nav>, i.e. the page
  // sections) is marked `inert` (or `aria-hidden` as a fallback) so a
  // screen reader in browse mode can't wander into it, and body scroll is
  // locked so the page underneath can't be scrolled while the panel stays
  // pinned. Both are reverted on close/unmount.
  React.useEffect(() => {
    if (!menuOpen) return;
    const navEl = navRef.current;
    const parent = navEl?.parentElement;
    const supportsInert = typeof HTMLElement !== 'undefined' && 'inert' in HTMLElement.prototype;
    // Exclude the portaled backdrop itself — it's a sibling of <nav> in the
    // DOM (appended to document.body), but it's the click-to-close target
    // for the open panel, not background content to isolate.
    const siblings = parent
      ? Array.from(parent.children).filter(
          (el) => el !== navEl && !el.classList.contains('nav-mobile-backdrop')
        )
      : [];
    siblings.forEach((el) => {
      if (supportsInert) {
        el.inert = true;
      } else {
        el.setAttribute('aria-hidden', 'true');
      }
    });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      siblings.forEach((el) => {
        if (supportsInert) {
          el.inert = false;
        } else {
          el.removeAttribute('aria-hidden');
        }
      });
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

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

  // Shared by the backdrop click, Escape, and every mobile link: closes the
  // panel and moves focus off whatever's currently focused inside it, back
  // to the toggle button. Without this, clicking a mobile link leaves focus
  // on the just-activated <a> while the panel re-renders `aria-hidden`,
  // which is an ARIA-invalid state (focused element inside aria-hidden).
  const closeAndReturnFocus = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      {mounted &&
        createPortal(
          <div
            className={`nav-mobile-backdrop${menuOpen ? ' open' : ''}`}
            aria-hidden="true"
            onClick={closeAndReturnFocus}
          />,
          document.body
        )}
      <nav className="top" ref={navRef}>
        <div className="row">
          <HomeOrAnchor href={mode === 'landing' ? '#top' : '/'} className="logo" data-hover>
            <span className="glyph">
              <img src="/logos/icon.svg" alt="Kimox Studio" />
            </span>
            <span>KIMOX·STUDIO</span>
          </HomeOrAnchor>
          <div className="links">
            <HomeOrAnchor href={sectionLink('work')} className={sectionClass('work')}>
              {t(I.nav.work, lang)}
            </HomeOrAnchor>
            <HomeOrAnchor href={sectionLink('services')} className={sectionClass('services')}>
              {t(I.nav.services, lang)}
            </HomeOrAnchor>
            <HomeOrAnchor href={sectionLink('process')} className={sectionClass('process')}>
              {t(I.nav.process, lang)}
            </HomeOrAnchor>
            <HomeOrAnchor href={sectionLink('about')} className={sectionClass('about')}>
              {t(I.nav.about, lang)}
            </HomeOrAnchor>
            <HomeOrAnchor href="/blog" className={activeBlog ? 'active' : undefined}>
              {t(I.nav.blog, lang)}
            </HomeOrAnchor>
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
            <button
              type="button"
              ref={menuButtonRef}
              className="nav-burger"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? t(I.nav.menuClose, lang) : t(I.nav.menuOpen, lang)}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        <div
          id={menuId}
          ref={menuPanelRef}
          className={`nav-mobile${menuOpen ? ' open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={t(I.nav.menuOpen, lang)}
          aria-hidden={!menuOpen}
        >
          <div className="nav-mobile-links">
            <HomeOrAnchor
              href={sectionLink('contact')}
              className="cta-pill"
              tabIndex={menuOpen ? undefined : -1}
              onClick={closeAndReturnFocus}
            >
              {t(I.nav.contact, lang)} →
            </HomeOrAnchor>
            <HomeOrAnchor
              href={sectionLink('work')}
              className={sectionClass('work')}
              tabIndex={menuOpen ? undefined : -1}
              onClick={closeAndReturnFocus}
            >
              {t(I.nav.work, lang)}
            </HomeOrAnchor>
            <HomeOrAnchor
              href={sectionLink('services')}
              className={sectionClass('services')}
              tabIndex={menuOpen ? undefined : -1}
              onClick={closeAndReturnFocus}
            >
              {t(I.nav.services, lang)}
            </HomeOrAnchor>
            <HomeOrAnchor
              href={sectionLink('process')}
              className={sectionClass('process')}
              tabIndex={menuOpen ? undefined : -1}
              onClick={closeAndReturnFocus}
            >
              {t(I.nav.process, lang)}
            </HomeOrAnchor>
            <HomeOrAnchor
              href={sectionLink('about')}
              className={sectionClass('about')}
              tabIndex={menuOpen ? undefined : -1}
              onClick={closeAndReturnFocus}
            >
              {t(I.nav.about, lang)}
            </HomeOrAnchor>
            <HomeOrAnchor
              href="/blog"
              className={activeBlog ? 'active' : undefined}
              tabIndex={menuOpen ? undefined : -1}
              onClick={closeAndReturnFocus}
            >
              {t(I.nav.blog, lang)}
            </HomeOrAnchor>
            {!hideLangSwitch && (
              <div className="lang-switch">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    className={lang === l.code ? 'active' : ''}
                    tabIndex={menuOpen ? undefined : -1}
                    onClick={() => setLang(l.code)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
