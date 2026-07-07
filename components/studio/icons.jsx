'use client';
import React from 'react';

const S = ({ d, size = 18, c = 'currentColor', sw = 1.8, fill = 'none', children, vb = '24' }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${vb} ${vb}`}
    fill={fill}
    stroke={fill === 'none' ? c : 'none'}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {children || <path d={d} />}
  </svg>
);

export const KIcon = {
  Plus: (p) => <S {...p} d="M12 5v14M5 12h14" />,
  X: (p) => <S {...p} d="M18 6 6 18M6 6l12 12" />,
  Check: (p) => <S {...p} d="M20 6 9 17l-5-5" />,
  Search: (p) => (
    <S {...p}>
      <circle cx={11} cy={11} r={7} />
      <path d="m21 21-4.3-4.3" />
    </S>
  ),
  Download: (p) => <S {...p} d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />,
  Trash: (p) => <S {...p} d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7" />,
  Refresh: (p) => <S {...p} d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16m0 5v-5h5" />,
  ChevD: (p) => <S {...p} d="m6 9 6 6 6-6" />,
  ChevL: (p) => <S {...p} d="m15 18-6-6 6-6" />,
  ChevR: (p) => <S {...p} d="m9 18 6-6-6-6" />,
  Lock: (p) => (
    <S {...p}>
      <rect x={4} y={11} width={16} height={10} rx={2} />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </S>
  ),
  Calendar: (p) => (
    <S {...p}>
      <rect x={3} y={5} width={18} height={16} rx={2} />
      <path d="M3 10h18M8 3v4m8-4v4" />
    </S>
  ),
  Grid: (p) => (
    <S {...p}>
      <rect x={4} y={4} width={7} height={7} rx={1} />
      <rect x={13} y={4} width={7} height={7} rx={1} />
      <rect x={4} y={13} width={7} height={7} rx={1} />
      <rect x={13} y={13} width={7} height={7} rx={1} />
    </S>
  ),
  Photo: (p) => (
    <S {...p}>
      <rect x={3} y={4} width={18} height={16} rx={2} />
      <circle cx={8.5} cy={9.5} r={1.5} />
      <path d="m3 17 5-4 4 3 4-4 5 4" />
    </S>
  ),
  Copy: (p) => (
    <S {...p}>
      <rect x={9} y={9} width={11} height={11} rx={2} />
      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
    </S>
  ),
  Spark: (p) => <S {...p} d="M12 3v6m0 6v6m9-9h-6m-6 0H3m14.5-6.5-4 4m-5 5-4 4m0-13 4 4m5 5 4 4" />,
  Compass: (p) => (
    <S {...p}>
      <circle cx={12} cy={12} r={9} />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </S>
  ),
  Flame: (p) => <S {...p} d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3s0 2 2 2c1.5 0 1-3 1-4s1-4 1-5Z" />,
  Target: (p) => (
    <S {...p}>
      <circle cx={12} cy={12} r={8} />
      <circle cx={12} cy={12} r={4} />
      <circle cx={12} cy={12} r={0.6} fill="currentColor" stroke="none" />
    </S>
  ),
  Chart: (p) => <S {...p} d="M4 20V10m5 10V4m5 16v-7m5 7V8" />,
  Layers: (p) => <S {...p} d="m12 3 9 5-9 5-9-5 9-5Zm9 9-9 5-9-5m18 4-9 5-9-5" />,
  Code: (p) => <S {...p} d="m8 8-4 4 4 4m8-8 4 4-4 4m-2-11-4 14" />,
  Rocket: (p) => <S {...p} d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5c.6-.6.6-1.6 0-2.2s-1.9-.9-2.5-.3ZM9 13l-2-2c1-4 4-8 9-9 1 5-1 8-5 9l-2 2ZM14 8a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />,
};
