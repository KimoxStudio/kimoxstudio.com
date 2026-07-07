'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { KIcon } from './icons';
import { TEMPLATES, TPL_BY_KEY } from './templates';

const STATUS = {
  idea: { label: 'Idea', dot: 'var(--text-dim)', chip: 'neutral' },
  draft: { label: 'Borrador', dot: 'var(--warn)', chip: 'warn' },
  ready: { label: 'Listo', dot: 'var(--accent)', chip: 'accent' },
  published: { label: 'Publicado', dot: 'var(--text-mut)', chip: 'done' },
};
const STATUS_ORDER = ['idea', 'draft', 'ready', 'published'];
const PLATFORMS = [['ig', 'IG'], ['in', 'IN'], ['x', 'X'], ['tt', 'TT']];
const FORMAT_LABEL = { post: 'Post 4:5', story: 'Story 9:16', banner: 'Banner', avatar: 'Avatar' };
const FORMAT_FILTERS = [['todos', 'Todos'], ['post', 'Posts'], ['story', 'Stories'], ['banner', 'Banner'], ['avatar', 'Avatar']];

// ── Seed content (used only if Redis has no posts yet). ──
function seedPosts() {
  const mk = (templateKey, o) => {
    const m = TPL_BY_KEY[templateKey];
    return { id: 'p_' + templateKey + '_' + Math.random().toString(36).slice(2, 7), templateKey, title: m.name, type: m.type, format: m.format, w: m.w, h: m.h, platforms: ['in', 'ig'], caption: '', hashtags: '', notes: '', date: '', ...o };
  };
  return [
    mk('post-manifiesto', {
      status: 'published', platforms: ['in', 'ig'], date: '2026-07-06',
      caption: 'Hacemos software con alma propia. Sin plantillas, sin atajos, sin catálogo.\n\nSomos un estudio pequeño que diseña y programa aplicaciones web y móviles a medida — y que se mete a fondo en pocos proyectos a la vez.\n\nBienvenidos a Kimox Studio.',
      hashtags: '#desarrolloweb #software #diseñoweb #kimoxstudio #aplicacionesweb',
      notes: 'POST FIJADO. Presentación del estudio. Ancla del perfil.',
      advice: 'Tu post nº1: fíjalo arriba. Con 0 seguidores casi no tiene alcance orgánico, su trabajo es explicar Kimox en 2 segundos a quien llega desde tu web o un contacto. No lo borres.',
    }),
    mk('story-manifiesto', {
      status: 'ready', platforms: ['ig'], date: '2026-07-06',
      caption: 'Story de bienvenida. Añade sticker de link a kimoxstudio.com.',
      notes: 'Sube justo después del post fijado, con sticker de enlace.',
      advice: 'Súbela el mismo día del lanzamiento con sticker de link. Refuerza el lema y manda el primer tráfico a la web.',
    }),
    mk('post-proyecto', {
      status: 'ready', platforms: ['in', 'ig'], date: '2026-07-09',
      caption: 'MyMed ESP — plataforma de consulta médica que construimos de cero: autenticación, panel de paciente y búsqueda avanzada de medicamentos.\n\n¿Tienes una idea parecida? Hablamos.',
      hashtags: '#casodeexito #webapp #nextjs #desarrolloamedida #kimoxstudio',
      notes: 'Primer caso real. Enseña trabajo, genera confianza.',
      advice: 'Mostrar trabajo real es tu mejor comercial. En LinkedIn cuenta el "cómo" (decisión técnica, reto resuelto); en IG, el "qué" visual. Cierra siempre con un CTA suave a contacto.',
    }),
    mk('post-tip', {
      status: 'draft', platforms: ['in', 'x'], date: '2026-07-12',
      caption: 'Postgres antes que Mongo, casi siempre. JSONB, arrays, full-text y columnas generadas: es un Mongo con álgebra relacional — y te ahorra una migración cara dentro de dos años.\n\n¿En qué casos elegirías Mongo? Te leemos.',
      hashtags: '#backend #postgres #desarrollo #basededatos',
      notes: 'Contenido de autoridad técnica. Bueno para LinkedIn/X.',
      advice: 'Los tips técnicos te posicionan como referencia, no como "otra agencia". Termina con una pregunta abierta: los comentarios disparan el alcance mucho más que los likes.',
    }),
    mk('post-servicio', {
      status: 'draft', platforms: ['in', 'ig'], date: '2026-07-14',
      caption: 'Lo que construimos, claro y sin letra pequeña:\n\n· Landing pages desde 500€\n· Aplicaciones web desde 1.500€\n· Tu propia idea, a medida\n\nCuéntanos qué tienes en mente y te pasamos un plan honesto en 24h.',
      hashtags: '#preciosweb #desarrolloweb #emprendimiento #pymes #kimoxstudio',
      notes: 'Post de conversión. Precios transparentes = confianza.',
      advice: 'La transparencia de precios filtra clientes y genera confianza. Fija este post cuando quieras captar: es el que convierte visitas del perfil en mensajes.',
    }),
    mk('story-tip', {
      status: 'idea', platforms: ['ig'], date: '2026-07-16',
      caption: 'Story: el SEO no se pega al final, es arquitectura. Encuesta "¿tu web carga en <2s?"',
      notes: 'Story interactiva con sticker de encuesta.',
      advice: 'Las stories de interacción suben tu peso ante el algoritmo y te dan datos de tu audiencia. Rápidas de producir, ideales entre posts grandes.',
    }),
    mk('post-cita', {
      status: 'idea', platforms: ['in', 'ig'], date: '2026-07-19',
      caption: 'Hacemos producto, no plantillas.\n\nCada proyecto tiene su carácter, su idioma y sus rituales. Nuestro trabajo es escuchar lo que tu producto quiere ser y dárselo en código que perdura.',
      hashtags: '#diseñodeproducto #software #kimoxstudio',
      notes: 'Cita de marca, cierra la quincena reforzando el mensaje.',
      advice: 'Las citas de marca son facilísimas de producir en serie y refuerzan tu identidad. Alterna una cada semana entre el contenido de más trabajo.',
    }),
    mk('banner', {
      status: 'idea', platforms: ['in', 'x'], date: '',
      caption: 'Cabecera para los perfiles de LinkedIn y X.',
      notes: 'Actualiza la cabecera de todos los perfiles el día del lanzamiento.',
      advice: 'Un detalle que casi nadie cuida: la cabecera coherente en todos los perfiles hace que el estudio parezca sólido desde el minuto uno. Ponla antes del primer post.',
    }),
  ];
}

// ── PNG export: render template offscreen → SVG foreignObject → canvas ──
let _fontCssCache = null;
async function collectFontCss() {
  if (_fontCssCache != null) return _fontCssCache;
  const toDataURL = (url) => fetch(url).then((r) => r.blob()).then((b) => new Promise((res) => {
    const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = () => res(url); fr.readAsDataURL(b);
  })).catch(() => url);
  const rules = [];
  const pending = [];
  const seen = new Set();
  const scrape = (href) => {
    if (seen.has(href)) return; seen.add(href);
    pending.push(fetch(href).then((r) => r.text()).then((css) => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) rules.push({ css: m, base: href });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrape(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  for (const ss of document.styleSheets) {
    try {
      for (const r of ss.cssRules) if (r.type === CSSRule.FONT_FACE_RULE) rules.push({ css: r.cssText, base: ss.href || location.href });
    } catch { if (ss.href) scrape(ss.href); }
  }
  while (pending.length) await pending.shift();
  const out = (await Promise.all(rules.map(async (rule) => {
    let css = rule.css, m; const re = /url\((['"]?)([^'")]+)\1\)/g;
    while ((m = re.exec(rule.css))) {
      if (m[2].startsWith('data:')) continue;
      let abs; try { abs = new URL(m[2], rule.base).href; } catch { continue; }
      css = css.split(m[0]).join('url("' + await toDataURL(abs) + '")');
    }
    return css;
  }))).join('\n');
  _fontCssCache = out;
  return out;
}

async function inlineImages(clone) {
  const toDataURL = (url) => fetch(url).then((r) => r.blob()).then((b) => new Promise((res) => {
    const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = () => res(url); fr.readAsDataURL(b);
  })).catch(() => url);
  const imgs = [clone, ...clone.querySelectorAll('*')].filter((el) => el.tagName === 'IMG');
  await Promise.all(imgs.map(async (el) => {
    const s = el.getAttribute('src');
    if (s && !s.startsWith('data:')) el.setAttribute('src', await toDataURL(new URL(s, location.href).href));
  }));
}

function cloneWithStyles(src) {
  if (src.nodeType === 8 || (src.nodeType === 1 && src.tagName === 'SCRIPT')) return document.createTextNode('');
  const dst = src.cloneNode(false);
  if (src.nodeType === 1) {
    const cs = getComputedStyle(src);
    let txt = '';
    for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
    dst.setAttribute('style', txt + 'animation:none;transition:none;');
  }
  for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneWithStyles(c));
  return dst;
}

async function exportTemplate(tpl, filename) {
  const host = document.createElement('div');
  host.style.cssText = `position:fixed;left:-99999px;top:0;width:${tpl.w}px;height:${tpl.h}px;`;
  document.body.appendChild(host);
  const inner = document.createElement('div');
  inner.style.cssText = `width:${tpl.w}px;height:${tpl.h}px;position:relative;overflow:hidden;background:#0e0c0a;`;
  // studio-root class propagates the CSS variables the templates use.
  inner.className = 'studio-root';
  host.appendChild(inner);
  const iroot = ReactDOM.createRoot(inner);
  await new Promise((res) => { iroot.render(tpl.render()); requestAnimationFrame(() => requestAnimationFrame(res)); });
  try { await document.fonts.ready; } catch {}
  await new Promise((r) => setTimeout(r, 120));

  const [fontCss] = await Promise.all([collectFontCss()]);
  const clone = cloneWithStyles(inner);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  await inlineImages(clone);

  const xml = new XMLSerializer().serializeToString(clone);
  const px = 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tpl.w * px}" height="${tpl.h * px}" viewBox="0 0 ${tpl.w} ${tpl.h}"><foreignObject width="${tpl.w}" height="${tpl.h}">${fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : ''}${xml}</foreignObject></svg>`;
  const img = new Image();
  await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('svg load')); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); });
  const cv = document.createElement('canvas');
  cv.width = tpl.w * px; cv.height = tpl.h * px;
  cv.getContext('2d').drawImage(img, 0, 0);

  iroot.unmount(); host.remove();

  await new Promise((res) => cv.toBlob((blob) => {
    if (blob) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = filename; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }
    res();
  }, 'image/png'));
}

const slugify = (s) => (s || 'post').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'post';

function fmtDateShort(iso) {
  if (!iso) return '';
  try { return new Date(iso + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }); } catch { return iso; }
}
async function copyText(text) {
  if (!text || !text.trim()) return false;
  try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return true; } } catch {}
  try {
    const ta = document.createElement('textarea'); ta.value = text; ta.style.cssText = 'position:fixed;left:-9999px'; document.body.appendChild(ta);
    ta.select(); const ok = document.execCommand('copy'); ta.remove(); return ok;
  } catch { return false; }
}

// ── UI atoms ──
function FitPreview({ tpl, boxW, boxH, radius = 12, frame = true }) {
  if (!tpl) return null;
  const scale = Math.min(boxW / tpl.w, boxH / tpl.h);
  const dw = tpl.w * scale, dh = tpl.h * scale;
  return (
    <div style={{ width: boxW, height: boxH, borderRadius: radius, background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ width: dw, height: dh, position: 'relative', overflow: 'hidden', borderRadius: Math.max(4, radius * scale * 3), border: frame ? '1px solid var(--line-strong)' : '0', boxShadow: frame ? 'var(--sh-2)' : 'none' }}>
        <div style={{ width: tpl.w, height: tpl.h, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>{tpl.render()}</div>
      </div>
    </div>
  );
}

function DownloadPNG({ post, size = 'sm', block, label = 'Descargar PNG' }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);
  const go = async (e) => {
    e?.stopPropagation();
    const tpl = TPL_BY_KEY[post.templateKey];
    if (!tpl) return;
    setBusy(true); setErr(false);
    try { await exportTemplate(tpl, `${slugify(post.title)}-${tpl.w}x${tpl.h}.png`); }
    catch (ex) { console.error(ex); setErr(true); setTimeout(() => setErr(false), 2500); }
    finally { setBusy(false); }
  };
  return (
    <button className={`btn btn--secondary btn--${size} ${block ? 'btn--block' : ''}`} onClick={go} disabled={busy}>
      {busy ? <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--text-dim)', borderTopColor: 'var(--accent)', display: 'inline-block', animation: 'studio-spin .8s linear infinite' }} /> : <KIcon.Download size={15} c="var(--accent-ink)" />}
      {err ? 'Reintentar' : busy ? 'Generando…' : label}
    </button>
  );
}

function StatusPill({ status, sm }) {
  const s = STATUS[status] || STATUS.idea;
  const bg = { neutral: 'var(--surface-3)', warn: 'var(--warn-soft)', accent: 'var(--accent-soft)', done: 'var(--surface-2)' }[s.chip];
  const col = { neutral: 'var(--text-mut)', warn: 'var(--warn)', accent: 'var(--accent-ink)', done: 'var(--text-mut)' }[s.chip];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: sm ? '3px 9px' : '5px 11px', borderRadius: 999, background: bg, fontFamily: 'var(--font-mono)', fontSize: sm ? 10 : 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: col }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />{s.label}
    </span>
  );
}

function PlatformDots({ platforms, size = 20 }) {
  return (
    <div style={{ display: 'flex', gap: 5 }}>
      {PLATFORMS.filter(([id]) => platforms.includes(id)).map(([id, lbl]) => (
        <span key={id} style={{ width: size, height: size, borderRadius: 6, background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: size * 0.42, fontWeight: 700, color: 'var(--text-mut)' }}>{lbl}</span>
      ))}
    </div>
  );
}

function PostCard({ post, onOpen }) {
  const tpl = TPL_BY_KEY[post.templateKey];
  return (
    <button onClick={onOpen} style={{ textAlign: 'left', cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: 12, display: 'flex', flexDirection: 'column', gap: 11, width: 250, transition: 'border-color .15s, transform .12s' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; }}>
      <div style={{ position: 'relative' }}>
        <FitPreview tpl={tpl} boxW={226} boxH={196} />
        <div style={{ position: 'absolute', top: 8, left: 8 }}><StatusPill status={post.status} sm /></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', letterSpacing: '0.01em', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</span>
        <PlatformDots platforms={post.platforms} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span className="chip chip--neutral" style={{ fontSize: 9.5 }}>{post.type}</span>
        <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-dim)' }}>{FORMAT_LABEL[post.format]}</span>
        {post.date && <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-dim)', marginLeft: 'auto' }}>{fmtDateShort(post.date)}</span>}
      </div>
      {post.caption ? (
        <p style={{ fontSize: 12.5, color: 'var(--text-mut)', lineHeight: 1.4, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{post.caption}</p>
      ) : <p style={{ fontSize: 12.5, color: 'var(--text-dim)', fontStyle: 'italic', margin: 0 }}>Sin copy todavía…</p>}
    </button>
  );
}

function CopyChip({ text }) {
  const [done, setDone] = useState(false);
  const has = !!text?.trim();
  const go = async (e) => { e?.stopPropagation(); if (!has) return; if (await copyText(text)) { setDone(true); setTimeout(() => setDone(false), 1600); } };
  return (
    <button onClick={go} disabled={!has} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 0, cursor: has ? 'pointer' : 'default', color: done ? 'var(--accent-ink)' : 'var(--text-mut)', fontFamily: 'var(--font-ui)', fontSize: 11.5, fontWeight: 600, padding: '2px 4px', opacity: has ? 1 : 0.4 }}>
      {done ? <><KIcon.Check size={13} /> Copiado</> : <><KIcon.Copy size={13} /> Copiar</>}
    </button>
  );
}

function PublishCopyButton({ post }) {
  const [done, setDone] = useState(false);
  const text = [post.caption, post.hashtags].filter((s) => s?.trim()).join('\n\n');
  const has = !!text.trim();
  const go = async () => { if (!has) return; if (await copyText(text)) { setDone(true); setTimeout(() => setDone(false), 1800); } };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <button className="btn btn--secondary btn--md btn--block" disabled={!has} onClick={go}>
        {done ? <><KIcon.Check size={16} c="var(--accent-ink)" /> Copiado ✓ pégalo en tu post</> : <><KIcon.Copy size={16} /> Copiar para publicar</>}
      </button>
      <span style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'center' }}>Copia el texto y los hashtags juntos, listos para pegar.</span>
    </div>
  );
}

function Field({ label, action, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, minHeight: 18 }}>
        <span className="eyebrow">{label}</span>{action}
      </div>
      {children}
    </div>
  );
}

function PostDetail({ post, onChange, onDelete, onClose, onFullscreen }) {
  const tpl = TPL_BY_KEY[post.templateKey];
  const set = (patch) => onChange(patch);
  const togglePlatform = (id) => set({ platforms: post.platforms.includes(id) ? post.platforms.filter((p) => p !== id) : [...post.platforms, id] });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
        <div style={{ minWidth: 0 }}>
          <div className="eyebrow">Editar post</div>
          <input value={post.title} onChange={(e) => set({ title: e.target.value })} style={{ background: 'none', border: 0, outline: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, textTransform: 'uppercase', letterSpacing: '0.01em', color: 'var(--text)', width: '100%', padding: '2px 0' }} />
        </div>
        <button onClick={onClose} className="tap44" style={{ background: 'var(--surface-2)', border: 0, borderRadius: '50%', width: 38, height: 38, color: 'var(--text-mut)', cursor: 'pointer', flexShrink: 0 }}><KIcon.X size={20} /></button>
      </div>

      <div className="scroll-area" style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 18, minHeight: 0 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <button onClick={onFullscreen} title="Ver a tamaño real" style={{ border: 0, background: 'none', padding: 0, cursor: 'zoom-in', flexShrink: 0 }}>
            <FitPreview tpl={tpl} boxW={150} boxH={200} />
          </button>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              <span className="chip chip--neutral" style={{ fontSize: 10 }}>{post.type}</span>
              <span className="chip chip--neutral" style={{ fontSize: 10 }}>{tpl?.w}×{tpl?.h}</span>
            </div>
            <button className="btn btn--secondary btn--sm" onClick={onFullscreen}><KIcon.Search size={15} /> Ver a tamaño real</button>
            <DownloadPNG post={post} size="sm" block />
            <p style={{ fontSize: 11.5, color: 'var(--text-dim)', lineHeight: 1.45, margin: '2px 0 0' }}>Descarga el PNG a resolución real, listo para subir.</p>
          </div>
        </div>

        <Field label="Estado">
          <div style={{ display: 'flex', gap: 6, background: 'var(--surface-2)', borderRadius: 'var(--r-pill)', padding: 4, border: '1px solid var(--line)' }}>
            {STATUS_ORDER.map((st) => (
              <button key={st} onClick={() => set({ status: st })} style={{ flex: 1, border: 0, cursor: 'pointer', padding: '8px 4px', borderRadius: 'var(--r-pill)', fontFamily: 'var(--font-ui)', fontSize: 12.5, fontWeight: 600, background: post.status === st ? 'var(--accent)' : 'transparent', color: post.status === st ? 'var(--on-accent)' : 'var(--text-mut)' }}>{STATUS[st].label}</button>
            ))}
          </div>
        </Field>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Field label="Plataformas">
            <div style={{ display: 'flex', gap: 7 }}>
              {PLATFORMS.map(([id, lbl]) => {
                const on = post.platforms.includes(id);
                return <button key={id} onClick={() => togglePlatform(id)} className="tap44" style={{ width: 44, height: 44, borderRadius: 12, cursor: 'pointer', border: `1px solid ${on ? 'var(--accent)' : 'var(--line)'}`, background: on ? 'var(--accent-soft)' : 'var(--surface-2)', color: on ? 'var(--accent-ink)' : 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 }}>{lbl}</button>;
              })}
            </div>
          </Field>
          <Field label="Fecha sugerida">
            <input type="date" value={post.date} onChange={(e) => set({ date: e.target.value })} className="field mono" style={{ height: 44, fontSize: 13, colorScheme: 'dark' }} />
          </Field>
        </div>

        <Field label={`Copy / texto · ${post.caption.length} car.`} action={<CopyChip text={post.caption} />}>
          <textarea value={post.caption} onChange={(e) => set({ caption: e.target.value })} placeholder="Escribe el texto del post…" className="field" style={{ minHeight: 110, fontSize: 14, lineHeight: 1.5 }} />
        </Field>

        <Field label="Hashtags" action={<CopyChip text={post.hashtags} />}>
          <input value={post.hashtags} onChange={(e) => set({ hashtags: e.target.value })} placeholder="#desarrolloweb #kimoxstudio …" className="field mono" style={{ fontSize: 13 }} />
        </Field>

        <PublishCopyButton post={post} />

        {post.advice && (
          <Field label="Consejo">
            <p style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.55, margin: 0, background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>{post.advice}</p>
          </Field>
        )}

        <Field label="Notas internas">
          <textarea value={post.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="Idea, referencia, recordatorio…" className="field" style={{ minHeight: 56, fontSize: 13.5, lineHeight: 1.5 }} />
        </Field>

        <button onClick={onDelete} style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 0, color: 'var(--danger)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-ui)', padding: '6px 0' }}>
          <KIcon.Trash size={15} c="var(--danger)" /> Eliminar post
        </button>
      </div>
    </div>
  );
}

function TemplatePicker({ onPick, onClose }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
        <div>
          <div className="eyebrow">Nuevo post</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, textTransform: 'uppercase', letterSpacing: '0.01em' }}>Elige una plantilla</div>
        </div>
        <button onClick={onClose} className="tap44" style={{ background: 'var(--surface-2)', border: 0, borderRadius: '50%', width: 38, height: 38, color: 'var(--text-mut)', cursor: 'pointer' }}><KIcon.X size={20} /></button>
      </div>
      <div className="scroll-area" style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexWrap: 'wrap', gap: 16, alignContent: 'flex-start', minHeight: 0 }}>
        {TEMPLATES.map((tpl) => (
          <button key={tpl.key} onClick={() => onPick(tpl)} style={{ cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: 10, display: 'flex', flexDirection: 'column', gap: 9, width: 158 }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-line)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}>
            <FitPreview tpl={tpl} boxW={136} boxH={120} radius={8} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13, color: 'var(--text)', textAlign: 'left' }}>{tpl.name}</span>
              <span className="mono" style={{ fontSize: 10, color: 'var(--text-dim)', textAlign: 'left' }}>{FORMAT_LABEL[tpl.format]}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function FullscreenPreview({ post, onClose }) {
  const tpl = TPL_BY_KEY[post.templateKey];
  const [vp, setVp] = useState({ w: 0, h: 0 });
  useEffect(() => { const f = () => setVp({ w: innerWidth, h: innerHeight }); f(); addEventListener('resize', f); return () => removeEventListener('resize', f); }, []);
  if (!tpl || vp.w === 0) return null;
  const boxW = Math.min(vp.w - 48, 900), boxH = vp.h - 150;
  const scale = Math.min(boxW / tpl.w, boxH / tpl.h);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16, animation: 'studio-fade-in .2s' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: tpl.w * scale, height: tpl.h * scale, position: 'relative', overflow: 'hidden', borderRadius: 16, border: '1px solid var(--line-strong)', boxShadow: 'var(--sh-3)' }}>
        <div style={{ width: tpl.w, height: tpl.h, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>{tpl.render()}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }} onClick={(e) => e.stopPropagation()}>
        <span className="mono" style={{ fontSize: 12, color: 'var(--text-mut)' }}>{tpl.w}×{tpl.h}px · {Math.round(scale * 100)}%</span>
        <DownloadPNG post={post} size="md" />
        <button className="btn btn--secondary btn--md" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

// Calendar
const DOW = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
function DayPostChip({ post, onOpen }) {
  const s = STATUS[post.status] || STATUS.idea;
  return (
    <button onClick={() => onOpen(post.id)} title={post.title} style={{ display: 'flex', alignItems: 'center', gap: 5, width: '100%', textAlign: 'left', cursor: 'pointer', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 7, padding: '4px 6px' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</span>
    </button>
  );
}
function MonthGrid({ ym, posts, onOpen }) {
  const [y, mo] = ym.split('-').map(Number);
  const first = new Date(y, mo - 1, 1);
  const monthName = first.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(y, mo, 0).getDate();
  const startWd = (first.getDay() + 6) % 7;
  const byDay = {};
  posts.forEach((p) => { const d = Number(p.date.slice(8, 10)); (byDay[d] = byDay[d] || []).push(p); });
  const cells = [];
  for (let i = 0; i < startWd; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const todayISO = new Date().toISOString().slice(0, 10);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--text)' }}>{monthName}</span>
        <span className="mono" style={{ fontSize: 12, color: 'var(--text-dim)' }}>{posts.length} posts</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
        {DOW.map((d) => <div key={d} className="eyebrow" style={{ fontSize: 10, textAlign: 'center', padding: '2px 0' }}>{d}</div>)}
        {cells.map((d, i) => {
          if (d === null) return <div key={i} style={{ minHeight: 92 }} />;
          const iso = `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const isToday = iso === todayISO;
          const dayPosts = byDay[d] || [];
          return (
            <div key={i} style={{ minHeight: 92, borderRadius: 10, background: isToday ? 'var(--accent-soft)' : 'var(--surface)', border: `1px solid ${isToday ? 'var(--accent-line)' : 'var(--line)'}`, padding: 6, display: 'flex', flexDirection: 'column', gap: 4, overflow: 'hidden' }}>
              <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: isToday ? 'var(--accent-ink)' : 'var(--text-dim)' }}>{d}</span>
              {dayPosts.map((p) => <DayPostChip key={p.id} post={p} onOpen={onOpen} />)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function CalendarView({ posts, onOpen }) {
  const dated = posts.filter((p) => p.date);
  const undated = posts.filter((p) => !p.date);
  const months = [...new Set(dated.map((p) => p.date.slice(0, 7)))].sort();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      {months.length === 0 && <div style={{ padding: '30px 20px', textAlign: 'center', fontSize: 13.5, color: 'var(--text-mut)' }}>Ningún post tiene fecha aún. Asígnala desde el panel de detalle para verlo en el calendario.</div>}
      {months.map((m) => <MonthGrid key={m} ym={m} posts={dated.filter((p) => p.date.slice(0, 7) === m)} onOpen={onOpen} />)}
      {undated.length > 0 && (
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Sin fecha · backlog <span className="mono" style={{ color: 'var(--text-dim)' }}>{undated.length}</span></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {undated.map((p) => (
              <button key={p.id} onClick={() => onOpen(p.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 999, padding: '8px 14px' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: (STATUS[p.status] || STATUS.idea).dot }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-soft)' }}>{p.title}</span>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-dim)' }}>{FORMAT_LABEL[p.format]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, label, count, dot }) {
  return (
    <button onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, cursor: 'pointer', border: `1px solid ${active ? 'var(--accent-line)' : 'var(--line)'}`, background: active ? 'var(--accent-soft)' : 'var(--surface)', color: active ? 'var(--accent-ink)' : 'var(--text-mut)', fontFamily: 'var(--font-ui)', fontSize: 13.5, fontWeight: 600 }}>
      {dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot }} />}{label}
      <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: active ? 'var(--accent-ink)' : 'var(--text-dim)' }}>{count}</span>
    </button>
  );
}

// ── Password gate ──
function PasswordGate({ onUnlock }) {
  const [val, setVal] = useState('');
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr(false);
    try {
      const r = await fetch('/api/studio/auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password: val }),
      });
      if (r.ok) { onUnlock(); return; }
      setErr(true); setVal('');
    } catch { setErr(true); }
    finally { setBusy(false); }
  };
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 28px', background: 'radial-gradient(120% 80% at 50% -8%, var(--accent-soft), transparent 60%), var(--bg)' }}>
      <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <img src="/logos/icon.svg" alt="Kimox Studio" width={68} height={68} style={{ borderRadius: 16 }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--text)', lineHeight: 1 }}>Content Studio</div>
            <p style={{ color: 'var(--text-mut)', fontSize: 14, lineHeight: 1.5, margin: '12px 0 0', maxWidth: 320 }}>Panel interno de Kimox Studio. Introduce la contraseña para gestionar posts y calendario.</p>
          </div>
        </div>
        {err && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, width: '100%', padding: '11px 13px', background: 'var(--danger-soft)', border: '1px solid rgba(255,107,94,0.32)', borderRadius: 'var(--r-md)', animation: 'studio-pop-in .25s' }}>
            <KIcon.X size={16} c="var(--danger)" /><span style={{ fontSize: 13.5, color: 'var(--text-soft)' }}>Contraseña incorrecta. Inténtalo de nuevo.</span>
          </div>
        )}
        <form onSubmit={submit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', display: 'inline-flex', color: 'var(--text-dim)' }}><KIcon.Lock size={18} /></span>
            <input type="password" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Contraseña" className="field" autoFocus style={{ height: 54, fontSize: 16, paddingLeft: 44 }} />
          </div>
          <button type="submit" className="btn btn--primary btn--lg btn--block" style={{ height: 54 }} disabled={!val || busy}>{busy ? 'Verificando…' : 'Entrar'}</button>
        </form>
        <a href="/" style={{ color: 'var(--text-dim)', fontSize: 12.5, textDecoration: 'none', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>← Volver al sitio</a>
      </div>
    </main>
  );
}

const PLAYBOOK = {
  updated: '4 jul 2026',
  intro: 'El plan para captar tus primeros clientes desde redes y el blog, aquí mismo. Cada post trae su consejo y este panel resume la estrategia del estudio.',
  sections: [
    { icon: 'Rocket', title: 'El primer post', body: 'Empieza con el manifiesto (ya en Listo) y fíjalo arriba. Con 0 seguidores casi no tiene alcance: su trabajo es explicar Kimox en 2 segundos a quien llega desde tu web o un contacto, y llevarlo a contacto.' },
    { icon: 'Flame', title: 'Primeras 48 horas', body: '1) Post fijado de presentación. 2) Story de bienvenida con sticker de link. 3) A las 48h, tu primer caso real (MyMed ESP): mostrar trabajo genera más confianza que cualquier promesa.' },
    { icon: 'Compass', title: 'Cadencia semanal', body: '2-3 posts/semana en LinkedIn + stories en IG. Alterna: 1 de autoridad (tip técnico), 1 de trabajo (caso/proyecto) y 1 de marca (manifiesto/cita). La constancia pesa más que un viral suelto.' },
    { icon: 'Layers', title: 'El mensaje', body: 'Software con alma propia. Vende el producto a medida (sin plantillas), la cercanía (hablas con quien programa) y la transparencia (precios claros). El blog es tu motor de SEO a largo plazo.' },
    { icon: 'Chart', title: 'Qué mirar', body: 'Fíjate en clics al contacto, guardados y mensajes directos, no en los likes. Pide acciones concretas en el copy: "escríbenos", "guarda esto", "¿en qué caso lo usarías?".' },
  ],
};

function Playbook() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 24, background: 'var(--surface)', border: '1px solid var(--accent-line)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
      <button onClick={() => setOpen((v) => !v)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', background: 'none', border: 0, cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <KIcon.Rocket size={17} c="var(--accent)" />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--text)' }}>Plan de lanzamiento</span>
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-dim)' }}>actualizado {PLAYBOOK.updated}</span>
        </div>
        <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s', display: 'inline-flex' }}><KIcon.ChevD size={16} c="var(--text-dim)" /></span>
      </button>
      {open && (
        <div style={{ padding: '0 18px 18px' }}>
          <p style={{ fontSize: 13, color: 'var(--text-mut)', lineHeight: 1.55, margin: '0 0 16px' }}>{PLAYBOOK.intro}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PLAYBOOK.sections.map((s) => {
              const Ico = KIcon[s.icon];
              return (
                <div key={s.title} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--accent-soft)', border: '1px solid var(--accent-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ico size={16} c="var(--accent)" /></div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13.5, color: 'var(--text)' }}>{s.title}</div>
                    <p style={{ fontSize: 12.5, color: 'var(--text-mut)', lineHeight: 1.5, margin: '3px 0 0' }}>{s.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Manager (server-persisted) ──
function StudioManager({ initialPosts, onLock }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [view, setView] = useState('tablero');
  const [fStatus, setFStatus] = useState('todos');
  const [fFormat, setFFormat] = useState('todos');
  const [openId, setOpenId] = useState(null);
  const [picking, setPicking] = useState(false);
  const [fullId, setFullId] = useState(null);

  const persistOne = useCallback(async (post) => {
    try {
      await fetch('/api/studio/posts', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(post),
      });
    } catch (e) { console.error('persist failed', e); }
  }, []);

  const persistAll = useCallback(async (arr) => {
    try {
      await fetch('/api/studio/posts', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ replace: true, posts: arr }),
      });
    } catch (e) { console.error('persist failed', e); }
  }, []);

  const patchPostLocal = (id, patch) => {
    let updated;
    setPosts((ps) => ps.map((p) => {
      if (p.id !== id) return p;
      updated = { ...p, ...patch };
      return updated;
    }));
    // fire-and-forget server sync
    if (updated) persistOne(updated);
  };

  const deletePostLocal = async (id) => {
    setPosts((ps) => ps.filter((p) => p.id !== id));
    setOpenId(null);
    try { await fetch(`/api/studio/posts/${id}`, { method: 'DELETE' }); } catch {}
  };

  const addPost = (tpl) => {
    const m = TPL_BY_KEY[tpl.key];
    const np = { id: 'p_' + tpl.key + '_' + Math.random().toString(36).slice(2, 7), templateKey: tpl.key, title: m.name, type: m.type, format: m.format, w: m.w, h: m.h, platforms: ['in', 'ig'], caption: '', hashtags: '', notes: '', date: '', status: 'idea' };
    setPosts((ps) => [np, ...ps]);
    setPicking(false); setOpenId(np.id);
    persistOne(np);
  };

  const resetSeed = async () => {
    if (!confirm('¿Restaurar los posts de ejemplo? Se perderán tus cambios.')) return;
    const seeded = seedPosts();
    setPosts(seeded); setOpenId(null);
    await persistAll(seeded);
  };

  const counts = STATUS_ORDER.reduce((a, st) => { a[st] = posts.filter((p) => p.status === st).length; return a; }, {});
  const filtered = posts
    .filter((p) => (fStatus === 'todos' || p.status === fStatus) && (fFormat === 'todos' || p.format === fFormat))
    .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));

  const openPost = posts.find((p) => p.id === openId);
  const fullPost = posts.find((p) => p.id === fullId);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '14px 24px', background: 'rgba(14,12,10,0.86)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <img src="/logos/icon.svg" alt="" width={30} height={30} style={{ borderRadius: 8 }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Content Studio</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>kimoxstudio.com</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn btn--secondary btn--sm" onClick={onLock} title="Bloquear panel"><KIcon.Lock size={15} /> Bloquear</button>
          <button className="btn btn--primary btn--md" onClick={() => setPicking(true)}><KIcon.Plus size={18} sw={2.4} /> Nuevo post</button>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '26px 24px 100px' }}>
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, textTransform: 'uppercase', letterSpacing: '0.01em', margin: 0 }}>Calendario de contenido</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: 13.5, marginTop: 6, maxWidth: 600, lineHeight: 1.5 }}>
            Plan de lanzamiento de Kimox, ordenado por fecha. Toca cualquier post para ver copy, hashtags y consejo — se guarda solo en el servidor.
          </p>
        </div>

        <Playbook />

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <FilterChip active={fStatus === 'todos'} onClick={() => setFStatus('todos')} label="Todos" count={posts.length} />
          {STATUS_ORDER.map((st) => <FilterChip key={st} active={fStatus === st} onClick={() => setFStatus(st)} label={STATUS[st].label} count={counts[st]} dot={STATUS[st].dot} />)}
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24, alignItems: 'center' }}>
          <span className="eyebrow" style={{ marginRight: 4 }}>Formato</span>
          {FORMAT_FILTERS.map(([id, lbl]) => (
            <button key={id} onClick={() => setFFormat(id)} style={{ border: 0, cursor: 'pointer', padding: '6px 13px', borderRadius: 999, fontFamily: 'var(--font-ui)', fontSize: 12.5, fontWeight: 600, background: fFormat === id ? 'var(--surface-3)' : 'transparent', color: fFormat === id ? 'var(--text)' : 'var(--text-dim)' }}>{lbl}</button>
          ))}
          <button onClick={resetSeed} title="Restaurar ejemplos" style={{ marginLeft: 'auto', border: 0, cursor: 'pointer', background: 'none', color: 'var(--text-dim)', fontSize: 12, fontFamily: 'var(--font-ui)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <KIcon.Refresh size={13} /> Restaurar ejemplos
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 4, background: 'var(--surface-2)', borderRadius: 'var(--r-pill)', padding: 4, border: '1px solid var(--line)' }}>
            {[['tablero', 'Tablero', 'Grid'], ['calendario', 'Calendario', 'Calendar']].map(([id, l, ic]) => {
              const Ico = KIcon[ic];
              return <button key={id} onClick={() => setView(id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 0, cursor: 'pointer', padding: '7px 16px', borderRadius: 'var(--r-pill)', fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, background: view === id ? 'var(--accent)' : 'transparent', color: view === id ? 'var(--on-accent)' : 'var(--text-mut)' }}><Ico size={15} c={view === id ? 'var(--on-accent)' : 'var(--text-mut)'} /> {l}</button>;
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '60px 20px', textAlign: 'center' }}>
            <KIcon.Photo size={40} c="var(--text-dim)" />
            <span style={{ fontSize: 14, color: 'var(--text-mut)' }}>Ningún post con este filtro.</span>
            <button className="btn btn--primary btn--md" onClick={() => setPicking(true)}><KIcon.Plus size={17} sw={2.4} /> Crear el primero</button>
          </div>
        ) : view === 'calendario' ? (
          <CalendarView posts={filtered} onOpen={(id) => setOpenId(id)} />
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {filtered.map((p) => <PostCard key={p.id} post={p} onOpen={() => setOpenId(p.id)} />)}
          </div>
        )}
      </div>

      {openPost && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={() => setOpenId(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'relative', width: 'min(460px, 100%)', height: '100%', background: 'var(--surface)', borderLeft: '1px solid var(--line)', boxShadow: '-16px 0 50px rgba(0,0,0,.5)', animation: 'studio-drawer-in .3s var(--ease-out)' }}>
            <PostDetail post={openPost} onChange={(patch) => patchPostLocal(openPost.id, patch)} onDelete={() => deletePostLocal(openPost.id)} onClose={() => setOpenId(null)} onFullscreen={() => setFullId(openPost.id)} />
          </div>
        </div>
      )}

      {picking && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={() => setPicking(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
          <div style={{ position: 'relative', width: 'min(720px, 100%)', height: 'min(620px, 90vh)', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--sh-3)', animation: 'studio-pop-in .2s' }}>
            <TemplatePicker onPick={addPost} onClose={() => setPicking(false)} />
          </div>
        </div>
      )}

      {fullPost && <FullscreenPreview post={fullPost} onClose={() => setFullId(null)} />}
    </div>
  );
}

export default function StudioClient({ initialAuthed }) {
  const [authed, setAuthed] = useState(!!initialAuthed);
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  const loadPosts = useCallback(async () => {
    try {
      const r = await fetch('/api/studio/posts');
      if (!r.ok) throw new Error('load failed');
      const j = await r.json();
      let arr = Array.isArray(j.posts) ? j.posts : [];
      if (arr.length === 0) {
        arr = seedPosts();
        await fetch('/api/studio/posts', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ replace: true, posts: arr }),
        });
      }
      setPosts(arr);
    } catch (e) { console.error(e); setPosts(seedPosts()); }
    finally { setLoaded(true); }
  }, []);

  useEffect(() => {
    if (authed) loadPosts();
  }, [authed, loadPosts]);

  const lock = async () => {
    try { await fetch('/api/studio/auth', { method: 'DELETE' }); } catch {}
    setAuthed(false); setLoaded(false); setPosts([]);
  };

  return (
    <div className="studio-root">
      {!authed ? (
        <PasswordGate onUnlock={() => setAuthed(true)} />
      ) : !loaded ? (
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-dim)' }}>
          Cargando Studio…
        </main>
      ) : (
        <StudioManager initialPosts={posts} onLock={lock} />
      )}
    </div>
  );
}
