'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { I18N as I } from '../lib/i18n';
import { useLang, t } from '../lib/lang';
import { useBlogCursor } from '../lib/cursor';
import Nav from './Nav';

const BLOG = {
  hero: {
    eyebrow: { es: 'Cuaderno', en: 'Notebook', ja: 'ノート' },
    title: {
      es: ['Notas desde', ' el taller.'],
      en: ['Notes from', ' the workshop.'],
      ja: ['工房からの', 'ノート。'],
    },
    sub: {
      es: 'Apuntes técnicos, recetas, reflexiones de diseño y todo lo que aprendemos mientras construimos.',
      en: 'Technical notes, recipes, design reflections, and everything we learn while building.',
      ja: '技術ノート、レシピ、デザインの考察、そして作りながら学んだことすべて。',
    },
  },
  categories: {
    es: ['Todos', 'Desarrollo', 'SEO', 'Diseño', 'Migraciones', 'Carrera'],
    en: ['All', 'Development', 'SEO', 'Design', 'Migrations', 'Career'],
    ja: ['すべて', '開発', 'SEO', 'デザイン', '移行', 'キャリア'],
  },
  featuredBadge: { es: 'Destacado', en: 'Featured', ja: '注目' },
  loadMore: { es: 'Ver más entradas →', en: 'Load more posts →', ja: 'もっと見る →' },
  postCount: { es: 'entradas', en: 'posts', ja: '記事' },
  sortBy: { es: 'Más recientes', en: 'Most recent', ja: '最新順' },
  subscribe: {
    title: {
      es: 'Una vez al mes. Sin trucos. Sólo cosas <em>útiles</em>.',
      en: 'Once a month. No tricks. Only <em>useful</em> things.',
      ja: '月に1回。トリックなし。<em>役立つ</em>ことだけ。',
    },
    body: {
      es: 'Recibe un email mensual con los mejores artículos del estudio, recursos que hemos encontrado y descuentos para suscriptores.',
      en: "Get one monthly email with the studio's best articles, resources we've found, and subscriber-only discounts.",
      ja: 'スタジオの厳選記事、見つけたリソース、購読者限定の割引を月1通でお届けします。',
    },
    placeholder: { es: 'tu@email.com', en: 'you@email.com', ja: 'you@email.com' },
    cta: { es: 'Apuntarme', en: 'Subscribe', ja: '登録する' },
  },
  readArticle: { es: 'Leer el artículo →', en: 'Read the article →', ja: '記事を読む →' },
};

export default function BlogClient({ featured, others }) {
  const [lang, setLang] = useLang();
  const [cat, setCat] = useState(0);
  useBlogCursor();

  const cats = t(BLOG.categories, lang);
  const filtered =
    cat === 0 ? others : others.filter((p) => t(p.category, lang) === cats[cat]);

  return (
    <>
      <Nav lang={lang} setLang={setLang} mode="blog" activeBlog />
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">
            {t(BLOG.hero.eyebrow, lang)} · {others.length + (featured ? 1 : 0)}{' '}
            {t(BLOG.postCount, lang)}
          </span>
          <h1>
            {t(BLOG.hero.title, lang).map((part, i) =>
              i === 1 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>
            )}
          </h1>
          <p className="sub">{t(BLOG.hero.sub, lang)}</p>
        </div>
      </section>

      <div className="wrap">
        <div className="filters">
          <span className="label">
            {lang === 'ja' ? 'カテゴリ' : lang === 'en' ? 'Filter' : 'Filtrar'} ↓
          </span>
          {cats.map((c, i) => (
            <button
              key={i}
              className={cat === i ? 'active' : ''}
              onClick={() => setCat(i)}
              data-hover
            >
              {c}
            </button>
          ))}
          <span className="right">
            <b>{filtered.length + (featured ? 1 : 0)}</b> {t(BLOG.postCount, lang)} ·{' '}
            {t(BLOG.sortBy, lang)} ↓
          </span>
        </div>

        {featured && (
          <Link href={`/blog/${featured.slug}`} className="featured" data-hover>
            <div>
              <span className="badge">{t(BLOG.featuredBadge, lang)}</span>
              <div className="meta">
                <span className="cat">{t(featured.category, lang)}</span>
                <span>{featured.date}</span>
                <span>· {featured.read_time}</span>
              </div>
              <h2>{t(featured.title, lang)}</h2>
              <p>{t(featured.excerpt, lang)}</p>
              <span className="read">{t(BLOG.readArticle, lang)}</span>
            </div>
            <div className="visual">
              <span className="tag">CASE STUDY · 01</span>
              <div className="glyph">{featured.glyph || 'N→'}</div>
            </div>
          </Link>
        )}

        <div className="grid-label">
          <b>{lang === 'ja' ? 'アーカイブ' : lang === 'en' ? 'Archive' : 'Archivo'}</b>
          <span>
            · {filtered.length} {t(BLOG.postCount, lang)}
          </span>
        </div>

        <div className="posts-grid">
          {filtered.map((p, i) => (
            <Link
              className={`post c-${(i % 6) + 1}`}
              href={`/blog/${p.slug}`}
              key={p.slug}
              data-hover
            >
              <div className="cover">
                <span className="num">N·{String(i + 2).padStart(2, '0')}</span>
                <div className="stripes"></div>
                <div className="pattern">{p.glyph || '✦'}</div>
              </div>
              <div className="meta">
                <span className="cat">{t(p.category, lang)}</span>
                <span>{p.date}</span>
                <span>· {p.read_time}</span>
              </div>
              <h3>{t(p.title, lang)}</h3>
              <p className="excerpt">{t(p.excerpt, lang)}</p>
              <span className="read-more">
                {lang === 'ja' ? '続きを読む →' : lang === 'en' ? 'Read it →' : 'Leer →'}
              </span>
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 80 }}>
          <button
            data-hover
            style={{
              padding: '14px 28px',
              background: 'transparent',
              border: '1.5px solid var(--ink)',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {t(BLOG.loadMore, lang)}
          </button>
        </div>
      </div>

      <footer className="bot">
        <div className="wrap">
          <div className="row">
            <div>{t(I.footer.rights, lang)}</div>
            <div style={{ display: 'flex', gap: 24 }}>
              <a href={`mailto:${I.meta.email}`} data-hover>
                {I.meta.email}
              </a>
              <Link href="/" data-hover>
                ← {lang === 'ja' ? 'ホームへ' : lang === 'en' ? 'Back home' : 'Volver al home'}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
