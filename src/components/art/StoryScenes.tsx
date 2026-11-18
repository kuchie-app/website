/**
 * "The Lost Bookmark": a wordless story told in panels. The Bookmark Scarf
 * slips out of a book one night, rides the wind over the city, gets caught in
 * the rain, is found by a reading lamp and comes home at dawn, closing the book
 * in the pose of the app icon.
 *
 * Each scene is an SVG that plays its moment when `active` turns true.
 * Scenes are drawn on a 200 × 150 grid and fill their panel (slice).
 */
import { m } from 'motion/react';
import { INK, PAPER, Ribbon, SCARF_FILL, VIOLET } from './Ribbon';
import './art.css';

export interface SceneProps {
  active: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;
const NIGHT_A = '#221c43';
const NIGHT_B = '#4b3f9c';
const WARM = '#f7dec0';
const DIM = '#2f2952';

function Svg({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <svg className="art" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label}>
      {children}
    </svg>
  );
}

function NightSky({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={NIGHT_A} />
          <stop offset="1" stopColor={NIGHT_B} />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill={`url(#${id})`} />
    </>
  );
}

const ROOFS = 'M0 104h18V84h22v14h14V70h26v22h12V80h24v18h14V76h30v20h14V88h26v62H0z';

/* 1 · A quiet city at night. Windows light up one by one. */
export function SceneCity({ active }: SceneProps) {
  const windows = [
    [24, 90], [30, 90], [60, 78], [66, 86], [98, 86], [122, 86], [150, 84], [156, 92], [182, 96],
  ];
  return (
    <Svg>
      <NightSky id="sky-city" />
      {[[30, 22], [62, 36], [118, 18], [92, 44], [176, 30]].map(([x, y], i) => (
        <m.circle key={i} cx={x} cy={y} r="1.3" fill={PAPER} initial={false} animate={{ opacity: active ? [0.3, 1, 0.6] : 0.3 }} transition={{ duration: 2.4, delay: i * 0.3, repeat: active ? Infinity : 0, repeatType: 'mirror' }} />
      ))}
      <circle cx="160" cy="38" r="16" fill={PAPER} />
      <circle cx="166" cy="34" r="16" fill={NIGHT_A} opacity="0.22" />
      <path d={ROOFS} fill={INK} />
      {windows.map(([x, y], i) => (
        <m.rect key={i} x={x} y={y} width="4" height="5" initial={false} animate={{ fill: active ? WARM : DIM }} transition={{ duration: 0.3, delay: active ? 0.3 + i * 0.12 : 0 }} />
      ))}
    </Svg>
  );
}

/* 2 · An open book under a lamp, the scarf resting in its pages. */
export function SceneDesk({ active }: SceneProps) {
  return (
    <Svg>
      <rect width="200" height="150" fill={PAPER} />
      <m.ellipse cx="100" cy="112" rx="88" ry="30" fill="#e5ddfa" initial={false} animate={{ opacity: active ? 1 : 0.5 }} transition={{ duration: 0.8 }} />
      <line x1="0" y1="124" x2="200" y2="124" stroke={INK} strokeWidth="2" />
      <path d="M100 118 C 80 108, 52 106, 34 112 L 34 84 C 52 78, 80 80, 100 90 Z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M100 118 C 120 108, 148 106, 166 112 L 166 84 C 148 78, 120 80, 100 90 Z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M48 92h36M48 98h40M118 92h36M116 98h40" stroke="#c9c2dc" strokeWidth="2" strokeLinecap="round" />
      <m.g initial={false} animate={active ? { rotate: [0, -3, 2, 0] } : { rotate: 0 }} transition={{ duration: 1.2, delay: 0.4 }} style={{ originX: 0.5, originY: 0.5 }}>
        <g transform="translate(78 54) scale(0.42) rotate(18 64 64)">
          <Ribbon outline flutter={false} />
        </g>
      </m.g>
      <path d="M150 14 v40 M138 54 h24 l-6 -14 h-12 z" fill={INK} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    </Svg>
  );
}

/* 3 · The wind comes in through the curtain. */
export function SceneWind({ active }: SceneProps) {
  const lines = ['M10 40 C 60 30, 100 50, 160 36', 'M0 70 C 50 60, 110 80, 190 62', 'M20 100 C 70 92, 120 110, 180 96'];
  return (
    <Svg>
      <rect width="200" height="150" fill="#ebe5f8" />
      <rect x="8" y="8" width="184" height="134" fill="none" stroke={INK} strokeWidth="3" />
      <m.path d="M150 8 C 150 60, 170 90, 192 142 L 192 8 Z" fill="#fff" stroke={INK} strokeWidth="2" initial={false} animate={active ? { skewX: [0, -8, 4, -3, 0] } : { skewX: 0 }} transition={{ duration: 1.8, ease: 'easeInOut' }} style={{ originX: 1, originY: 0 }} />
      {lines.map((d, i) => (
        <m.path key={d} d={d} fill="none" stroke={VIOLET} strokeWidth="2.5" strokeLinecap="round" initial={false} animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }} transition={{ duration: 0.8, delay: active ? 0.2 + i * 0.18 : 0, ease }} />
      ))}
    </Svg>
  );
}

/* 4 · The scarf slips out and flies through the window. */
export function SceneEscape({ active }: SceneProps) {
  return (
    <Svg>
      <NightSky id="sky-escape" />
      <circle cx="40" cy="34" r="12" fill={PAPER} />
      <rect x="110" y="20" width="80" height="110" fill="none" stroke={PAPER} strokeWidth="3" opacity="0.5" />
      <line x1="150" y1="20" x2="150" y2="130" stroke={PAPER} strokeWidth="2" opacity="0.4" />
      <m.path d="M20 140 C 60 120, 90 80, 150 50 S 200 20, 220 10" fill="none" stroke={SCARF_FILL} strokeWidth="1.6" strokeDasharray="3 5" initial={false} animate={{ pathLength: active ? 1 : 0 }} transition={{ duration: 1.6, ease }} />
      <m.g initial={false} animate={active ? { x: [0, 60, 150], y: [0, -40, -110], rotate: [0, -8, -18] } : { x: 0, y: 0, rotate: 0 }} transition={{ duration: 2, ease }}>
        <g transform="translate(6 96) scale(0.5)">
          <Ribbon flutter={active} speed={0.9} />
        </g>
      </m.g>
    </Svg>
  );
}

/* 5 · Over the rooftops, fast. */
export function SceneRooftops({ active }: SceneProps) {
  return (
    <Svg>
      <rect width="200" height="150" fill={PAPER} />
      <g stroke="#d9d0f4" strokeWidth="2">
        {Array.from({ length: 14 }, (_, i) => {
          const y = 8 + i * 10;
          return <line key={i} x1="0" y1={y} x2="200" y2={y} />;
        })}
      </g>
      <m.g initial={false} animate={active ? { x: [0, -100] } : { x: 0 }} transition={active ? { duration: 2.4, repeat: Infinity, ease: 'linear' } : { duration: 0 }}>
        <path d="M0 120h20v-14h16v-10h20v24h18v-18h22v18h24v-12h18v12h20v-20h22v20h20v30H0zM200 120h20v-14h16v-10h20v24h18v-18h22v18h24v-12h18v12h20v-20h22v20h20v30H200z" fill={INK} />
      </m.g>
      <g transform="translate(58 22) scale(0.66)">
        <Ribbon outline flutter={active} speed={0.8} />
      </g>
    </Svg>
  );
}

/* 6 · Rain. The scarf is caught on a lamp post. */
export function SceneRain({ active }: SceneProps) {
  return (
    <Svg>
      <rect width="200" height="150" fill="#2c2a45" />
      <g className={active ? 'rain is-on' : 'rain'} stroke="#8f88c0" strokeWidth="1.4" strokeLinecap="round">
        {Array.from({ length: 22 }, (_, i) => {
          const x = (i * 37) % 210;
          const y = (i * 53) % 150;
          return <line key={i} x1={x} y1={y} x2={x - 5} y2={y + 14} />;
        })}
      </g>
      <path d="M120 150 V 50 q0 -12 -12 -12 h-16" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M80 36 h24 l-4 8 h-16 z" fill={INK} />
      <m.ellipse cx="92" cy="56" rx="24" ry="12" fill={WARM} initial={false} animate={{ opacity: active ? [0.25, 0.5, 0.35] : 0.2 }} transition={{ duration: 1.8, repeat: active ? Infinity : 0, repeatType: 'mirror' }} />
      <g transform="translate(108 52) scale(0.34) rotate(70 64 64)">
        <Ribbon flutter={active} speed={2.4} />
      </g>
      <rect y="138" width="200" height="12" fill={INK} />
    </Svg>
  );
}

/* 7 · A reading lamp sweeps the street. */
export function SceneBeam({ active }: SceneProps) {
  return (
    <Svg>
      <rect width="200" height="150" fill="#1d1a33" />
      <rect x="14" y="18" width="46" height="52" fill={WARM} stroke={INK} strokeWidth="3" />
      <line x1="37" y1="18" x2="37" y2="70" stroke={INK} strokeWidth="2" />
      <m.path d="M40 50 L 200 10 L 200 120 Z" fill={WARM} initial={false} animate={active ? { rotate: [-14, 8, 0], opacity: [0, 0.35, 0.3] } : { rotate: -14, opacity: 0 }} transition={{ duration: 2.2, ease }} style={{ originX: 0, originY: 0.36 }} />
      <m.g initial={false} animate={{ opacity: active ? 1 : 0.2 }} transition={{ duration: 0.6, delay: active ? 1.4 : 0 }}>
        <g transform="translate(140 52) scale(0.34) rotate(60 64 64)">
          <Ribbon />
        </g>
      </m.g>
      <path d="M0 150 V 128 H 200 V 150 Z" fill={INK} />
    </Svg>
  );
}

/* 8 · Found. The scarf drifts back down into the book. */
export function SceneReturn({ active }: SceneProps) {
  return (
    <Svg>
      <rect width="200" height="150" fill="#ebe5f8" />
      <path d="M100 136 C 76 124, 46 122, 26 128 L 26 96 C 46 90, 76 92, 100 104 Z" fill="#fff" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M100 136 C 124 124, 154 122, 174 128 L 174 96 C 154 90, 124 92, 100 104 Z" fill="#fff" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <m.g initial={false} animate={active ? { x: [-30, -10, 0], y: [-60, -20, 0], rotate: [-30, -10, 10] } : { x: -30, y: -60, rotate: -30 }} transition={{ duration: 2.2, ease }}>
        <g transform="translate(70 40) scale(0.5)">
          <Ribbon outline flutter={active} speed={2} />
        </g>
      </m.g>
    </Svg>
  );
}

/* 9 · Home. The book is closed, the scarf hangs out of it: the app icon. */
export function SceneHome({ active }: SceneProps) {
  return (
    <Svg>
      <rect width="200" height="150" fill={INK} />
      <m.g initial={false} animate={{ scale: active ? 1 : 0.92, opacity: active ? 1 : 0.6 }} transition={{ duration: 0.9, ease }} style={{ originX: 0.5, originY: 0.5 }}>
        <g transform="translate(36 10) scale(1)">
          <Ribbon flutter={active} speed={3.2} />
        </g>
      </m.g>
    </Svg>
  );
}

/* 10 · Dawn over the city. */
export function SceneDawn({ active }: SceneProps) {
  return (
    <Svg>
      <defs>
        <linearGradient id="sky-dawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b8aef2" />
          <stop offset="1" stopColor={WARM} />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="url(#sky-dawn)" />
      <m.circle cx="100" r="20" fill="#fff6e4" initial={false} animate={{ cy: active ? 96 : 130 }} transition={{ duration: 2, ease }} />
      <path d={ROOFS} fill={INK} />
    </Svg>
  );
}
