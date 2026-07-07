'use client';
import React from 'react';
import { KIcon } from './icons';

// Kimox Content Studio — social templates (poster aesthetic).
// Each render() returns the piece at real size (w x h, scale 1).

const A = '#ff5c28';
const OLIVE = '#c5cf8e';
const TEXT = '#f3efe4';
const MUT = '#a49e90';
const DIM = '#726c5f';
const BG = '#0e0c0a';
const SURF = '#17150f';

export function BrandRow({ mark = 52, word = 30, dom = 18, color = TEXT }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: mark * 0.32 }}>
      <img src="/logos/icon.svg" alt="" width={mark} height={mark} style={{ display: 'block', borderRadius: mark * 0.14 }} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: word, letterSpacing: '0.02em', textTransform: 'uppercase', color }}>
          Kimox<span style={{ color: A }}>·</span>Studio
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: dom, color: DIM, marginTop: word * 0.16, letterSpacing: '0.04em' }}>
          kimoxstudio.com
        </span>
      </div>
    </div>
  );
}

function PosterBG({ children, glow = true, pad = 72, inner = true }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: glow
        ? 'radial-gradient(120% 72% at 50% -12%, rgba(255,92,40,0.16), transparent 55%), linear-gradient(180deg, #17150f 0%, #0e0c0a 62%)'
        : BG,
    }}>
      {inner && <div style={{ position: 'absolute', inset: 30, border: '1px solid rgba(243,239,228,0.10)', borderRadius: 28, pointerEvents: 'none' }} />}
      <div style={{ position: 'absolute', inset: 0, padding: pad, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}

function Eyebrow({ children, size = 22, color = A }) {
  return <span style={{ fontFamily: 'var(--font-mono)', fontSize: size, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color }}>{children}</span>;
}

const disp = (size, ls = '-0.03em') => ({ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: size, lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: ls, color: TEXT });
const serifEm = { fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, textTransform: 'none', color: A };

// Stories 1080x1920
function StoryManifiesto() {
  return (
    <PosterBG pad={92}>
      <Eyebrow size={26}>Kimox · manifiesto</Eyebrow>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={disp(150)}>
          Software<br />con <span style={serifEm}>alma</span><br />propia.
        </div>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 40, lineHeight: 1.4, color: MUT, margin: '56px 0 0', maxWidth: 760 }}>
          Diseñamos y programamos aplicaciones web y móviles que cargan con los valores de tu marca.
        </p>
      </div>
      <BrandRow mark={68} word={44} dom={26} />
    </PosterBG>
  );
}
function StoryTip() {
  return (
    <PosterBG pad={92}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Eyebrow size={26}>Tip técnico</Eyebrow>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 600, color: DIM }}>01 / SEO</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 44 }}>
        <div style={{ width: 112, height: 112, borderRadius: 28, background: 'rgba(255,92,40,0.13)', border: '1px solid rgba(255,92,40,0.38)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KIcon.Target size={62} c={A} />
        </div>
        <div style={disp(104)}>El SEO no se pega al final. Es <span style={serifEm}>arquitectura</span>.</div>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 40, lineHeight: 1.45, color: MUT, margin: 0, maxWidth: 780 }}>
          URLs limpias, HTML semántico y velocidad desde la primera línea. Ningún plugin arregla una base mal puesta.
        </p>
      </div>
      <BrandRow mark={68} word={44} dom={26} />
    </PosterBG>
  );
}
function StoryPromo() {
  return (
    <PosterBG pad={92} glow>
      <BrandRow mark={68} word={44} dom={26} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow size={28}>Tu idea, en código</Eyebrow>
        <div style={{ ...disp(128), marginTop: 26 }}>
          ¿Tienes<br />una <span style={serifEm}>idea</span>?
        </div>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 40, lineHeight: 1.4, color: MUT, margin: '44px 0 0', maxWidth: 720 }}>
          Landing desde 500€ · Apps web desde 1.500€ · Tu proyecto a medida. Cuéntanos y te pasamos un plan.
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, height: 132, background: A, borderRadius: 999, color: BG }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 48, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Escríbenos · kimoxstudio.com</span>
      </div>
    </PosterBG>
  );
}

// Posts 1080x1350
function PostManifiesto() {
  return (
    <PosterBG pad={76}>
      <Eyebrow>Kimox · manifiesto</Eyebrow>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={disp(122)}>
          Sin plantillas.<br />Sin atajos.<br /><span style={serifEm}>Sin</span> software<br />de catálogo.
        </div>
      </div>
      <BrandRow />
    </PosterBG>
  );
}
function PostTip() {
  return (
    <PosterBG pad={76}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Eyebrow>Tip · dev</Eyebrow>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 600, color: DIM }}>03</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 34 }}>
        <KIcon.Code size={86} c={A} />
        <div style={disp(94)}>Postgres antes que Mongo. Casi siempre.</div>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 36, lineHeight: 1.45, color: MUT, margin: 0 }}>
          JSONB, arrays, full-text y columnas generadas. Es un Mongo con álgebra relacional — y te ahorra migraciones caras.
        </p>
      </div>
      <BrandRow />
    </PosterBG>
  );
}
function PostProyecto() {
  return (
    <PosterBG pad={76}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Eyebrow>Proyecto · web app</Eyebrow>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 600, color: OLIVE }}>2025</span>
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={disp(116)}>MyMed<br />ESP</div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
        <div style={{ width: 560, height: 360, borderRadius: 24, background: SURF, border: '1px solid rgba(243,239,228,0.12)', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent 0 26px, rgba(255,92,40,0.05) 26px 27px)' }} />
          <div style={{ position: 'absolute', top: 26, left: 26, right: 26, height: 46, borderRadius: 12, background: A, display: 'flex', alignItems: 'center', paddingLeft: 20, fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600, color: BG }}>mymedesp.com</div>
          <div style={{ position: 'absolute', top: 96, left: 26, width: 300, height: 20, borderRadius: 6, background: 'rgba(243,239,228,0.18)' }} />
          <div style={{ position: 'absolute', top: 130, left: 26, width: 220, height: 20, borderRadius: 6, background: 'rgba(243,239,228,0.10)' }} />
          <div style={{ position: 'absolute', bottom: 30, left: 26, right: 26, height: 90, borderRadius: 14, background: 'rgba(197,207,142,0.14)', border: '1px solid rgba(197,207,142,0.3)' }} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 34, lineHeight: 1.35, color: MUT, margin: 0, maxWidth: 620 }}>
          Plataforma de consulta médica: auth, panel de paciente y búsqueda avanzada de medicamentos.
        </p>
        <BrandRow mark={44} word={26} dom={16} />
      </div>
    </PosterBG>
  );
}
function PostServicio() {
  const rows = [
    ['Landing pages', 'desde 500€'],
    ['Aplicaciones web', 'desde 1.500€'],
    ['Tu propia idea', 'a medida'],
  ];
  return (
    <PosterBG pad={76} glow>
      <Eyebrow>Servicios · 2026</Eyebrow>
      <div style={{ marginTop: 18 }}>
        <div style={disp(104)}>Lo que<br /><span style={serifEm}>construimos</span>.</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
        {rows.map(([name, price], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: '30px 34px', background: i === 0 ? 'rgba(255,92,40,0.13)' : SURF, border: `1px solid ${i === 0 ? 'rgba(255,92,40,0.38)' : 'rgba(243,239,228,0.10)'}`, borderRadius: 22 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 52, textTransform: 'uppercase', letterSpacing: '-0.02em', color: TEXT }}>{name}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 34, fontWeight: 600, color: A, whiteSpace: 'nowrap' }}>{price}</span>
          </div>
        ))}
      </div>
      <BrandRow />
    </PosterBG>
  );
}
function PostCita() {
  return (
    <PosterBG pad={76}>
      <Eyebrow>Kimox</Eyebrow>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={disp(112)}>
          Hacemos <span style={serifEm}>producto</span>, no plantillas.
        </div>
      </div>
      <BrandRow />
    </PosterBG>
  );
}

// Banner 1500x500
function Banner() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'radial-gradient(80% 160% at 12% 50%, rgba(255,92,40,0.16), transparent 55%), linear-gradient(120deg, #17150f 0%, #0e0c0a 70%)', display: 'flex', alignItems: 'center', padding: '0 96px', gap: 56 }}>
      <img src="/logos/icon.svg" alt="" width={168} height={168} style={{ borderRadius: 26, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 100, lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.02em', color: TEXT }}>
          Kimox<span style={{ color: A }}>·</span>Studio
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 36, color: MUT, marginTop: 10 }}>Software con alma propia · web & móvil</div>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 600, color: A, flexShrink: 0 }}>kimoxstudio.com</span>
    </div>
  );
}

// Avatars 1080x1080
function AvatarMark() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 38%, rgba(255,92,40,0.18), transparent 60%), #0e0c0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src="/logos/icon.svg" alt="" width={640} height={640} style={{ borderRadius: 150, boxShadow: '0 0 120px rgba(255,92,40,0.3)' }} />
    </div>
  );
}
function AvatarWord() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: A, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 620, textTransform: 'uppercase', color: BG, lineHeight: 0.8 }}>K</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 56, letterSpacing: '0.28em', color: BG, marginTop: 10 }}>STUDIO</span>
    </div>
  );
}

export const TEMPLATES = [
  { key: 'post-manifiesto', name: 'Manifiesto', type: 'Manifiesto', format: 'post', w: 1080, h: 1350, render: () => <PostManifiesto /> },
  { key: 'post-servicio', name: 'Servicios · precios', type: 'Promo', format: 'post', w: 1080, h: 1350, render: () => <PostServicio /> },
  { key: 'post-proyecto', name: 'Proyecto · caso', type: 'Proyecto', format: 'post', w: 1080, h: 1350, render: () => <PostProyecto /> },
  { key: 'post-tip', name: 'Tip técnico', type: 'Tip', format: 'post', w: 1080, h: 1350, render: () => <PostTip /> },
  { key: 'post-cita', name: 'Cita de marca', type: 'Cita', format: 'post', w: 1080, h: 1350, render: () => <PostCita /> },
  { key: 'story-manifiesto', name: 'Manifiesto', type: 'Manifiesto', format: 'story', w: 1080, h: 1920, render: () => <StoryManifiesto /> },
  { key: 'story-tip', name: 'Tip técnico', type: 'Tip', format: 'story', w: 1080, h: 1920, render: () => <StoryTip /> },
  { key: 'story-promo', name: 'Promo servicios', type: 'Promo', format: 'story', w: 1080, h: 1920, render: () => <StoryPromo /> },
  { key: 'banner', name: 'Banner LinkedIn / X', type: 'Banner', format: 'banner', w: 1500, h: 500, render: () => <Banner /> },
  { key: 'avatar-mark', name: 'Avatar · logo', type: 'Avatar', format: 'avatar', w: 1080, h: 1080, render: () => <AvatarMark /> },
  { key: 'avatar-word', name: 'Avatar · inicial', type: 'Avatar', format: 'avatar', w: 1080, h: 1080, render: () => <AvatarWord /> },
];

export const TPL_BY_KEY = Object.fromEntries(TEMPLATES.map((t) => [t.key, t]));
