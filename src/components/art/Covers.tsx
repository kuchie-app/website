/**
 * Covers for six made-up series, used wherever the site shows a library.
 * Plain SVG and CSS, no Motion, so Astro can render them as static HTML.
 */
import { INK, PAPER, RibbonStatic, SCARF_FILL } from './Ribbon';
import './art.css';

export type Series = 'bookmark' | 'nightshift' | 'cranes' | 'rain' | 'moon' | 'ink';

export const SERIES: { id: Series; title: string; vol: number; unread: number }[] = [
  { id: 'bookmark', title: 'The Lost Bookmark', vol: 1, unread: 3 },
  { id: 'nightshift', title: 'Night Shift Library', vol: 4, unread: 0 },
  { id: 'cranes', title: 'Paper Cranes', vol: 2, unread: 12 },
  { id: 'rain', title: 'Rain Club', vol: 1, unread: 1 },
  { id: 'moon', title: 'Moon Delivery', vol: 3, unread: 0 },
  { id: 'ink', title: 'Ink & Ash', vol: 6, unread: 5 },
];

const BG: Record<Series, string> = {
  bookmark: INK,
  nightshift: '#2a2350',
  cranes: '#efe7d8',
  rain: '#3a4466',
  moon: '#e6dff9',
  ink: '#f4f0ea',
};

const LIGHT_TEXT: Record<Series, boolean> = {
  bookmark: true,
  nightshift: true,
  cranes: false,
  rain: true,
  moon: false,
  ink: false,
};

function Motif({ id }: { id: Series }) {
  switch (id) {
    case 'bookmark':
      return (
        <g transform="translate(14 44) scale(0.62)">
          <RibbonStatic fill={SCARF_FILL} paper={PAPER} />
        </g>
      );
    case 'nightshift':
      return (
        <g>
          <circle cx="66" cy="40" r="10" fill={PAPER} />
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <rect x="12" y={70 + r * 16} width="76" height="2" fill="#5a4aa8" />
              {[0, 1, 2, 3, 4, 5, 6].map((b) => (
                <rect key={b} x={14 + b * 10 + (r % 2) * 3} y={58 + r * 16} width="6" height="12" rx="1" fill={b % 3 === 0 ? '#b5aaff' : '#4a3f8f'} />
              ))}
            </g>
          ))}
        </g>
      );
    case 'cranes':
      return (
        <g fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round">
          <path d="M20 96 L50 62 L58 84 L86 70 L60 100 Z" fill="#fff" />
          <path d="M50 62 L60 100" />
          <path d="M60 46 L72 34 L75 42 L86 38 L76 50 Z" fill="#fff" />
        </g>
      );
    case 'rain':
      return (
        <g>
          <g stroke="#8f9ac6" strokeWidth="1.5" strokeLinecap="round">
            {Array.from({ length: 14 }, (_, i) => (
              <line key={i} x1={(i * 23) % 96} y1={(i * 31) % 70 + 30} x2={(i * 23) % 96 - 4} y2={(i * 31) % 70 + 42} />
            ))}
          </g>
          <path d="M22 84 A 28 28 0 0 1 78 84 Z" fill="#b5aaff" />
          <path d="M50 84 V 112 q0 6 -6 6" fill="none" stroke={PAPER} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );
    case 'moon':
      return (
        <g>
          <circle cx="54" cy="66" r="26" fill={INK} />
          <circle cx="64" cy="58" r="24" fill="#e6dff9" />
          <rect x="22" y="96" width="22" height="16" rx="2" fill="#6a58dc" />
          <path d="M22 102 h22 M33 96 v16" stroke="#e6dff9" strokeWidth="1.5" />
        </g>
      );
    case 'ink':
      return (
        <g>
          <path d="M50 44 C 76 44, 84 70, 76 90 C 68 110, 32 112, 24 88 C 18 70, 30 50, 52 50" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" opacity="0.92" />
          <circle cx="70" cy="104" r="4" fill={INK} />
        </g>
      );
  }
}

export function Cover({ id, title, vol, badge }: { id: Series; title: string; vol: number; badge?: number }) {
  const light = LIGHT_TEXT[id];
  return (
    <div className="kcover" style={{ background: BG[id], color: light ? PAPER : INK }}>
      <svg viewBox="0 0 100 133" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <Motif id={id} />
      </svg>
      <span className="kcover__title">{title}</span>
      <span className="kcover__vol">Vol. {vol}</span>
      {badge ? <span className="kcover__badge">{badge}</span> : null}
    </div>
  );
}
