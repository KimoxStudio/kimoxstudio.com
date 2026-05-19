'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { I18N as I } from '../lib/i18n';
import { useLang, LANGS, t } from '../lib/lang';
import { useSmoothCursor } from '../lib/cursor';
import ThemeToggle from './ThemeToggle';

function Nav({ lang, setLang }) {
  return (
    <nav className="top">
      <div className="row">
        <a href="#top" className="logo">
          <span className="glyph">
            <img src="/logos/icon.svg" alt="Kimox Studio" />
          </span>
          <span>KIMOX·STUDIO</span>
        </a>
        <div className="links">
          <a href="#work">/{t(I.nav.work, lang).toLowerCase()}</a>
          <a href="#services">/{t(I.nav.services, lang).toLowerCase()}</a>
          <a href="#process">/{t(I.nav.process, lang).toLowerCase()}</a>
          <a href="#about">/{t(I.nav.about, lang).toLowerCase()}</a>
          <Link href="/blog">/{t(I.nav.blog, lang).toLowerCase()}</Link>
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
          <a href="#contact" className="cta-pill">
            {t(I.nav.contact, lang)} →
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero({ lang }) {
  const lines = t(I.hero.h1, lang);
  const heroBlocks = {
    es: [
      { k: 'ISSUE', v: '01 / 26' },
      { k: 'PUBLICADO', v: '2026.05' },
      { k: 'IDIOMA', v: lang.toUpperCase() },
      { k: 'PÁGINAS', v: '01 — 08' },
    ],
    en: [
      { k: 'ISSUE', v: '01 / 26' },
      { k: 'PUBLISHED', v: '2026.05' },
      { k: 'LANGUAGE', v: lang.toUpperCase() },
      { k: 'PAGES', v: '01 — 08' },
    ],
    ja: [
      { k: '号数', v: '01 / 26' },
      { k: '発行', v: '2026.05' },
      { k: '言語', v: lang.toUpperCase() },
      { k: 'ページ', v: '01 — 08' },
    ],
  };
  const metaBlocks = {
    es: [
      { k: 'Base', v: t(I.meta.location, lang) },
      { k: 'Áreas', v: 'Web · Móvil · SEO · Mantenimiento' },
      { k: 'Disponibles', v: 'Q2 2026 · 2 huecos' },
    ],
    en: [
      { k: 'Based', v: t(I.meta.location, lang) },
      { k: 'Fields', v: 'Web · Mobile · SEO · Maintenance' },
      { k: 'Available', v: 'Q2 2026 · 2 slots' },
    ],
    ja: [
      { k: '拠点', v: t(I.meta.location, lang) },
      { k: '分野', v: 'ウェブ · モバイル · SEO · 保守' },
      { k: '対応中', v: 'Q2 2026 · 2枠' },
    ],
  };
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="top-meta">
          {heroBlocks[lang].map((m, i) => (
            <div className="cell" key={i}>
              <b>{m.k}</b>
              <span>{m.v}</span>
            </div>
          ))}
        </div>
        <h1>
          {lines.map((ln, i) => (
            <span className="line" key={i}>
              {ln}
            </span>
          ))}
        </h1>
        <div className="bottom-grid">
          <p className="sub">{t(I.hero.sub, lang)}</p>
          <div className="col-meta">
            {metaBlocks[lang].map((m, i) => (
              <div className="group" key={i}>
                <b>{m.k}</b>
                {m.v}
              </div>
            ))}
          </div>
          <div className="ctas">
            <a className="btn-primary" href="#contact">
              <span>{t(I.hero.cta1, lang)}</span>
              <span className="arr">↗</span>
            </a>
            <a className="btn-secondary" href="#work">
              <span>{t(I.hero.cta2, lang)}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee({ lang }) {
  const items = t(I.hero.marquee, lang);
  const all = [];
  for (let r = 0; r < 4; r++) for (let i = 0; i < items.length; i++) all.push(items[i]);
  return (
    <div className="marquee">
      <div className="marquee-track">
        {all.map((it, i) => (
          <React.Fragment key={i}>
            <span className="item">{it}</span>
            <span className="star">+</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ n, label, meta, title }) {
  return (
    <div className="head">
      <span className="label">
        <b>§{n}</b> {label}
      </span>
      <span></span>
      <span className="meta">{meta}</span>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  );
}

function ManifestoSec({ lang }) {
  const title = t(I.manifesto.title, lang).replace(/(genérico|generic|汎用)/, (m) => `<em>${m}</em>`);
  return (
    <section className="poster-section manifesto">
      <div className="wrap">
        <SectionHead
          n="01"
          label={t(I.manifesto.label, lang)}
          meta={lang === 'ja' ? '私たちのルール' : lang === 'en' ? 'our rules' : 'nuestras reglas'}
          title={title}
        />
        <div className="grid">
          <div className="body">
            <p
              dangerouslySetInnerHTML={{
                __html: t(I.manifesto.body, lang).replace(
                  /(perdura|lasts|長く残る)/,
                  (m) => `<em>${m}</em>`
                ),
              }}
            />
            <div className="sig">
              <span className="dot"></span>
              <span>
                — {lang === 'ja' ? '創業者より' : lang === 'en' ? 'from the founders' : 'de los fundadores'}
              </span>
            </div>
          </div>
          <ul className="bullets">
            {t(I.manifesto.bullets, lang).map((b, i) => (
              <li key={i}>
                <span className="n">0{i + 1}</span>
                <span>{b}</span>
                <span className="arr">↗</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ServicesSec({ lang }) {
  const title = t(I.services.title, lang).replace(/(construimos|build|作る)/, (m) => `<em>${m}</em>`);
  return (
    <section className="poster-section services" id="services">
      <div className="wrap">
        <SectionHead
          n="02"
          label={t(I.services.label, lang)}
          meta={`3 ${lang === 'ja' ? '種類 · 個別見積もり可' : lang === 'en' ? 'tiers · custom on request' : 'niveles · a medida disponible'}`}
          title={title}
        />
        <div className="svc-table">
          {I.services.items.map((s, i) => (
            <a href="#contact" className="svc-row" key={i}>
              <span className="n">{s.n}</span>
              <h3>
                {t(s.title, lang)}
                <span className="small">
                  {lang === 'ja' ? 'サービス' : lang === 'en' ? 'service' : 'servicio'} 0{i + 1}
                </span>
              </h3>
              <div>
                <p className="desc">{t(s.body, lang)}</p>
                <ul className="bullets">
                  {t(s.bullets, lang).map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="price-cell">
                <span className="from">{t(I.services.fromLabel, lang)}</span>
                <span className="amount">
                  {typeof s.priceFrom === 'string' ? s.priceFrom : t(s.priceFrom, lang)}
                </span>
                <span className="iva">
                  {lang === 'ja' ? '税抜' : lang === 'en' ? 'ex. VAT' : 'sin IVA'}
                </span>
              </div>
              <span className="cta-cell">
                <span>{lang === 'ja' ? '依頼する' : lang === 'en' ? 'Inquire' : 'Pedir info'}</span>
                <span>→</span>
              </span>
            </a>
          ))}
        </div>
        <div className="svc-extras">
          <span className="label">{t(I.services.extras.label, lang)} →</span>
          {t(I.services.extras.items, lang).map((it, i) => (
            <span className="tag" key={i}>
              {it}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSec({ lang }) {
  const title = t(I.work.title, lang).replace(/(enviado|shipped|出荷)/, (m) => `<em>${m}</em>`);
  return (
    <section className="poster-section work" id="work">
      <div className="wrap">
        <SectionHead
          n="03"
          label={t(I.work.label, lang)}
          meta={`12+ ${lang === 'ja' ? '出荷済 · 3件表示' : lang === 'en' ? 'shipped · 3 shown' : 'enviados · 3 mostrados'}`}
          title={title}
        />
        <div className="proj-list">
          {I.work.items.map((p, i) => {
            const name = typeof p.name === 'string' ? p.name : t(p.name, lang);
            const url =
              typeof p.url === 'string' && p.url.includes('.') ? p.url : t(p.url, lang);
            const glyph = name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();
            return (
              <a
                className="proj-row"
                key={i}
                href={url.includes('.') ? `https://${url}` : '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="n col">{p.n}</span>
                <div className="name-block col">
                  <div className="name">{name}</div>
                  <div className="url">
                    {url} · {p.year}
                  </div>
                </div>
                <div className="desc col">
                  <span className="cat">{t(p.category, lang)}</span>
                  {t(p.body, lang)}
                </div>
                <div className="tags col">
                  {p.tags.map((tg, j) => (
                    <span key={j}>{tg}</span>
                  ))}
                </div>
                <div className="swatch">
                  <div className="glyph">{glyph}</div>
                  <div className="stripes"></div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSec({ lang }) {
  const title = t(I.process.title, lang).replace(
    /(trabajamos|work|働き方)/,
    (m) => `<em>${m}</em>`
  );
  return (
    <section className="poster-section process" id="process">
      <div className="wrap">
        <SectionHead
          n="04"
          label={t(I.process.label, lang)}
          meta={`4 ${lang === 'ja' ? 'ステップ' : lang === 'en' ? 'steps' : 'pasos'}`}
          title={title}
        />
        <div className="steps">
          {I.process.steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="num">{s.n}</div>
              <h3>{t(s.title, lang)}</h3>
              <p>{t(s.body, lang)}</p>
              <div className="tag">
                <span>
                  {lang === 'ja' ? 'ステップ' : 'STEP'} {i + 1} / {I.process.steps.length}
                </span>
                <span className="dot"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSec({ lang }) {
  const items = I.testimonials.items;
  const [idx, setIdx] = useState(0);
  const cur = items[idx];
  return (
    <section className="poster-section testimonials">
      <div className="wrap">
        <SectionHead
          n="05"
          label={t(I.testimonials.label, lang)}
          meta={`${items.length} ${lang === 'ja' ? '件' : lang === 'en' ? 'quotes' : 'citas'}`}
          title={lang === 'ja' ? '<em>声</em>' : lang === 'en' ? '<em>Voices.</em>' : '<em>Voces.</em>'}
        />
        <div className="quote-wrap">
          <div>
            <div className="quote-mark">"</div>
            <p className="t-quote">{t(cur.quote, lang)}</p>
            <div className="t-meta">
              <span className="avatar">{cur.name[0]}</span>
              <div>
                <span className="name">{cur.name}</span>
                <span className="role">{t(cur.role, lang)}</span>
              </div>
            </div>
            <div className="t-nav">
              <button onClick={() => setIdx((idx - 1 + items.length) % items.length)}>←</button>
              <button onClick={() => setIdx((idx + 1) % items.length)}>→</button>
              <span className="count">
                0{idx + 1} / 0{items.length}
              </span>
            </div>
          </div>
          <div className="t-side">
            {items.map((it, i) => (
              <div
                key={i}
                className={`pip ${i === idx ? 'active' : ''}`}
                onClick={() => setIdx(i)}
                data-hover
              >
                <span className="idx">0{i + 1}</span>
                <div>
                  <div className="nm">{it.name}</div>
                  <div className="rl">{t(it.role, lang)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamCardPhoto({ initials, index, lang }) {
  const photoRef = useRef(null);
  useEffect(() => {
    const photo = photoRef.current;
    if (!photo) return;
    const card = photo.closest('.team-card');
    if (!card) return;

    let hovering = false;
    let rafId = null;
    let pendingX = 0,
      pendingY = 0;

    const update = () => {
      rafId = null;
      const r = photo.getBoundingClientRect();
      const rx = Math.max(-1.4, Math.min(1.4, (pendingX - (r.left + r.width / 2)) / (r.width / 2)));
      const ry = Math.max(-1.4, Math.min(1.4, (pendingY - (r.top + r.height / 2)) / (r.height / 2)));
      photo.style.setProperty('--rx', rx.toFixed(3));
      photo.style.setProperty('--ry', ry.toFixed(3));
    };

    const onMove = (e) => {
      if (!hovering) return;
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      photo.style.setProperty('--rx', '0');
      photo.style.setProperty('--ry', '0');
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousemove', onMove);
    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousemove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="photo" ref={photoRef}>
      <span className="badge">
        {lang === 'ja' ? '写真' : lang === 'en' ? 'PHOTO' : 'FOTO'} 0{index + 1}
      </span>
      <span className="index">REPLACE_ME.JPG</span>
      <div className="stripes"></div>
      <div className="face">
        <div className="eyes">
          <div className="eye"></div>
          <div className="eye"></div>
        </div>
        <div className="mouth"></div>
        <div className="initial">{initials}</div>
      </div>
    </div>
  );
}

function AboutSec({ lang }) {
  const title = t(I.about.title, lang).replace(/(bien|well|丁寧に)/, (m) => `<em>${m}</em>`);
  return (
    <section className="poster-section about" id="about">
      <div className="wrap">
        <SectionHead
          n="06"
          label={t(I.about.label, lang)}
          meta={lang === 'ja' ? '私たちについて' : lang === 'en' ? 'the studio' : 'el estudio'}
          title={title}
        />
        <p>{t(I.about.body, lang)}</p>
        <div className="stats">
          {I.about.stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="num">{s.n}</div>
              <div className="lbl">{t(s.label, lang)}</div>
            </div>
          ))}
        </div>

        <div className="team-block">
          <div className="head-row">
            <span className="label">
              <b>§06.1</b> {t(I.about.teamLabel, lang)}
            </span>
            <span></span>
            <span className="label">
              {I.about.team.length}{' '}
              {lang === 'ja' ? '人' : lang === 'en' ? 'people' : 'personas'}
            </span>
            <h3>
              {t(I.about.teamLabel, lang)}
              <em>.</em>
            </h3>
          </div>
          <p className="sub-line">{t(I.about.teamSub, lang)}</p>
          <div className="team-grid">
            {I.about.team.map((p, i) => (
              <div className="team-card" key={i}>
                <TeamCardPhoto initials={p.initials} index={i} lang={lang} />
                <div className="name-row">
                  <h4 className="name">{p.name}</h4>
                  <span className="num">
                    0{i + 1} / 0{I.about.team.length}
                  </span>
                </div>
                <div className="role">{t(p.role, lang)}</div>
                <p className="bio">{t(p.bio, lang)}</p>
                <div className="skills">
                  {p.skills.map((sk, j) => (
                    <span key={j}>{sk}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSec({ lang }) {
  const [budget, setBudget] = useState(null);
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };
  const title = t(I.contact.title, lang).replace(/(algo|something|何か)/, (m) => `<em>${m}</em>`);
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="head">
          <span className="label">
            <b>§07</b> {t(I.contact.label, lang)}
          </span>
          <span></span>
          <span className="meta">
            {lang === 'ja'
              ? '24時間以内に返信'
              : lang === 'en'
                ? '24h reply window'
                : 'Respondemos en 24h'}
          </span>
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <div className="grid">
          <div>
            <p className="body">{t(I.contact.body, lang)}</p>
            <a href={`mailto:${I.meta.email}`} className="email-big">
              <span className="or">{t(I.contact.or, lang)}</span>
              <span className="em">{I.meta.email}</span>
            </a>
            <div className="info">
              <div>
                <b>{lang === 'ja' ? '拠点' : lang === 'en' ? 'BASED' : 'BASE'}</b> ·{' '}
                {t(I.meta.location, lang)}
              </div>
              <div>
                <b>{lang === 'ja' ? '対応中' : lang === 'en' ? 'AVAILABLE' : 'DISPONIBLES'}</b> · Q2
                2026 · 2 {lang === 'ja' ? '枠' : lang === 'en' ? 'slots' : 'huecos'}
              </div>
              <div>
                <b>{lang === 'ja' ? '言語' : lang === 'en' ? 'LANGUAGES' : 'IDIOMAS'}</b> · ES · EN ·
                JA
              </div>
            </div>
          </div>
          <form onSubmit={submit}>
            <div className="form-row">
              <div className="field">
                <label>
                  <span>01 · {t(I.contact.fields.name, lang)}</span>
                </label>
                <input type="text" required />
              </div>
              <div className="field">
                <label>
                  <span>02 · {t(I.contact.fields.email, lang)}</span>
                </label>
                <input type="email" required />
              </div>
            </div>
            <div className="field">
              <label>
                <span>03 · {t(I.contact.fields.budget, lang)}</span>
                <span className="opt">
                  {lang === 'ja' ? '任意' : lang === 'en' ? 'optional' : 'opcional'}
                </span>
              </label>
              <div className="budget-chips">
                {t(I.contact.budgets, lang).map((b, i) => (
                  <button
                    type="button"
                    key={i}
                    className={budget === i ? 'active' : ''}
                    onClick={() => setBudget(i)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>
                <span>04 · {t(I.contact.fields.message, lang)}</span>
              </label>
              <textarea
                required
                placeholder={
                  lang === 'ja' ? '...' : lang === 'en' ? 'Tell us...' : 'Cuéntanos...'
                }
              />
            </div>
            <div className="submit-row">
              <button type="submit" className="btn-primary">
                <span>
                  {sent
                    ? '✓ ' + (lang === 'ja' ? '送信しました' : lang === 'en' ? 'Sent' : 'Enviado')
                    : t(I.contact.fields.send, lang)}
                </span>
                <span className="arr">↗</span>
              </button>
              <span className="note">
                {lang === 'ja'
                  ? '返信は24時間以内'
                  : lang === 'en'
                    ? 'Reply within 24h'
                    : 'Respuesta en menos de 24h'}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer({ lang }) {
  return (
    <>
      <div className="footer-big" aria-hidden="true">
        <span className="row1">
          KIMOX<span className="orange-bit">·</span>
        </span>
        <span className="row2">
          STUDIO<span className="olive-bit">.</span>
        </span>
      </div>
      <footer className="bot">
        <div className="wrap">
          <div className="row">
            <div>{t(I.footer.rights, lang)}</div>
            <div style={{ display: 'flex', gap: 24 }}>
              <a href={`mailto:${I.meta.email}`}>{I.meta.email}</a>
              <Link href="/blog">{t(I.nav.blog, lang)}</Link>
              <a href="#top">{t(I.footer.backToTop, lang)}</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function LandingClient() {
  const [lang, setLang] = useLang();
  useSmoothCursor();
  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Marquee lang={lang} />
      <ManifestoSec lang={lang} />
      <ServicesSec lang={lang} />
      <WorkSec lang={lang} />
      <ProcessSec lang={lang} />
      <TestimonialsSec lang={lang} />
      <AboutSec lang={lang} />
      <ContactSec lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
