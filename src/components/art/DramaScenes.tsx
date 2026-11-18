/**
 * The dramatic beats of "The Lost Bookmark": a storm rolls in, the window
 * bursts open, the scarf is torn away, lightning, a leap across the rooftops,
 * the scarf whipping on a spire in the rain, and the catch.
 *
 * Same 200 × 150 grid as StoryScenes. Each scene plays when `active` is true.
 */
import { m } from 'motion/react';
import { INK, PAPER, Ribbon, SCARF_FILL } from './Ribbon';
import type { SceneProps } from './StoryScenes';
import './art.css';

const ease = [0.22, 1, 0.36, 1] as const;
const NIGHT_A = '#1a1533';
const NIGHT_B = '#3d3380';
const WARM = '#f7dec0';
const ROOFS = 'M0 104h18V84h22v14h14V70h26v22h12V80h24v18h14V76h30v20h14V88h26v62H0z';

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg className="art" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {children}
    </svg>
  );
}

function Sky({ id, from = NIGHT_A, to = NIGHT_B }: { id: string; from?: string; to?: string }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill={`url(#${id})`} />
    </>
  );
}

/** Radial speed lines converging on (cx, cy), drawn in ink on paper. */
function SpeedLines({ cx, cy, count = 28, color = INK, opacity = 0.5 }: { cx: number; cy: number; count?: number; color?: string; opacity?: number }) {
  return (
    <g stroke={color} strokeLinecap="round" opacity={opacity}>
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        const r1 = 34 + ((i * 37) % 22);
        const r2 = 180;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * r1}
            y1={cy + Math.sin(a) * r1}
            x2={cx + Math.cos(a) * r2}
            y2={cy + Math.sin(a) * r2}
            strokeWidth={i % 3 === 0 ? 2.2 : 1}
          />
        );
      })}
    </g>
  );
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 20 q0 -12 12 -12 q4 -10 16 -8 q8 -8 18 0 q14 -2 14 12 q8 2 8 8 z"
      fill="#2a2452"
      stroke="#5a4eab"
      strokeWidth="1.5"
    />
  );
}

function Bolt({ d, active, delay = 0 }: { d: string; active: boolean; delay?: number }) {
  return (
    <m.path
      d={d}
      fill="none"
      stroke={PAPER}
      strokeWidth="2.4"
      strokeLinejoin="round"
      initial={false}
      animate={active ? { opacity: [0, 1, 0, 1, 0] } : { opacity: 0 }}
      transition={{ duration: 0.9, delay, times: [0, 0.1, 0.25, 0.35, 1], repeat: active ? Infinity : 0, repeatDelay: 2.6 }}
    />
  );
}

/* A · The storm rolls in over the city. */
export function SceneStorm({ active }: SceneProps) {
  const windows = [[24, 90], [60, 78], [98, 86], [122, 86], [150, 84], [182, 96]];
  return (
    <Svg>
      <Sky id="sky-storm" />
      <m.g initial={false} animate={{ x: active ? 0 : -60 }} transition={{ duration: 2.4, ease }}>
        <Cloud x={10} y={14} s={1.3} />
        <Cloud x={84} y={6} s={1.6} />
        <Cloud x={150} y={20} s={1.1} />
      </m.g>
      <Bolt active={active} d="M128 34 l-8 18 h8 l-10 22" delay={1.2} />
      <path d={ROOFS} fill={INK} />
      {windows.map(([x, y], i) => (
        <m.rect key={i} x={x} y={y} width="4" height="5" initial={false} animate={{ fill: active ? WARM : '#2f2952' }} transition={{ duration: 0.3, delay: active ? 0.4 + i * 0.15 : 0 }} />
      ))}
    </Svg>
  );
}

/* B · The window bursts open; pages fly. */
export function SceneBurst({ active }: SceneProps) {
  const papers = [
    { x: [20, 120], y: [100, 20], r: [0, 260] },
    { x: [30, 170], y: [110, 60], r: [0, -200] },
    { x: [40, 90], y: [96, -10], r: [0, 320] },
  ];
  return (
    <Svg>
      <rect width="200" height="150" fill="#e7e1fa" />
      <SpeedLines cx={20} cy={60} count={18} color="#7e70c9" opacity={0.45} />
      <rect x="0" y="0" width="60" height="150" fill={NIGHT_A} />
      <m.path d="M60 0 L 60 150 L 96 140 L 96 10 Z" fill="#fff" stroke={INK} strokeWidth="2.5" initial={false} animate={active ? { skewY: [0, -14, 6, -4, 0] } : { skewY: 0 }} transition={{ duration: 1.2, ease: 'easeOut' }} style={{ originX: 0, originY: 0.5 }} />
      {papers.map((pp, i) => (
        <m.rect
          key={i}
          width="16"
          height="20"
          fill="#fff"
          stroke={INK}
          strokeWidth="1.5"
          initial={false}
          animate={active ? { x: pp.x, y: pp.y, rotate: pp.r, opacity: [1, 1, 0] } : { x: pp.x[0], y: pp.y[0], rotate: 0, opacity: 0 }}
          transition={{ duration: 1.6, delay: 0.2 + i * 0.15, ease }}
        />
      ))}
    </Svg>
  );
}

/* C · The scarf is torn away, out of the window and into the storm. */
export function SceneTorn({ active }: SceneProps) {
  return (
    <Svg>
      <rect width="200" height="150" fill={PAPER} />
      <SpeedLines cx={150} cy={40} count={32} opacity={0.55} />
      <rect x="128" y="14" width="56" height="60" fill={NIGHT_A} stroke={INK} strokeWidth="3" />
      <line x1="156" y1="14" x2="156" y2="74" stroke={INK} strokeWidth="2" />
      <m.g
        initial={false}
        animate={active ? { x: [0, 70, 130], y: [0, -40, -66], scale: [1, 0.7, 0.25], rotate: [0, -20, -40] } : { x: 0, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.5, 0, 0.2, 1] }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <g transform="translate(20 50) scale(0.7)">
          <Ribbon outline flutter={active} speed={0.5} />
        </g>
      </m.g>
    </Svg>
  );
}

/* D · Lightning. The scarf is a silhouette over the roofs. */
export function SceneLightning({ active }: SceneProps) {
  return (
    <Svg>
      <Sky id="sky-flash" from="#120f24" to="#2a2452" />
      <m.rect width="200" height="150" fill="#fff" initial={false} animate={active ? { opacity: [0, 0.95, 0.1, 0.8, 0] } : { opacity: 0 }} transition={{ duration: 1, delay: 0.3, times: [0, 0.08, 0.2, 0.3, 1] }} />
      <Bolt active={active} d="M70 0 l-12 40 h14 l-18 46" delay={0.3} />
      <path d={ROOFS} fill={INK} />
      <m.g initial={false} animate={active ? { x: [0, 30], y: [0, -8] } : { x: 0, y: 0 }} transition={{ duration: 2.4, ease }}>
        <g transform="translate(96 20) scale(0.5)">
          <Ribbon flutter={active} speed={0.6} fill={INK} paper={INK} />
        </g>
      </m.g>
    </Svg>
  );
}

/* E · Kiri leaps across a gap between roofs. */
export function SceneLeap({ active }: SceneProps) {
  return (
    <Svg>
      <rect width="200" height="150" fill="#2c2a45" />
      <g stroke="#6f68a8" strokeWidth="1.4" strokeLinecap="round" opacity="0.7">
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1={-20 + i * 16} y1={150} x2={40 + i * 16} y2={0} />
        ))}
      </g>
      <path d="M0 150 V 112 H 70 V 150 Z M128 150 V 96 H 200 V 150 Z" fill={INK} />
      <g className={active ? 'rain is-on' : 'rain'} stroke="#8f88c0" strokeWidth="1.2" strokeLinecap="round">
        {Array.from({ length: 16 }, (_, i) => {
          const x = (i * 41) % 210;
          const y = (i * 29) % 150;
          return <line key={i} x1={x} y1={y} x2={x - 5} y2={y + 14} />;
        })}
      </g>
    </Svg>
  );
}

/* F · On a spire, in the rain, the scarf whips in the wind. */
export function SceneSpire({ active }: SceneProps) {
  return (
    <Svg>
      <rect width="200" height="150" fill="#24223c" />
      <g className={active ? 'rain is-on' : 'rain'} stroke="#8f88c0" strokeWidth="1.5" strokeLinecap="round">
        {Array.from({ length: 28 }, (_, i) => {
          const x = (i * 37) % 210;
          const y = (i * 53) % 150;
          return <line key={i} x1={x} y1={y} x2={x - 6} y2={y + 16} />;
        })}
      </g>
      <path d="M96 150 V 60 L 104 20 L 112 60 V 150 Z" fill={INK} />
      <path d="M60 150 V 110 H 150 V 150 Z" fill={INK} />
      <g transform="translate(104 30) scale(0.42) rotate(10 64 64)">
        <Ribbon flutter={active} speed={0.35} />
      </g>
    </Svg>
  );
}

/* G · The catch. An impact frame. */
export function SceneCatch({ active }: SceneProps) {
  return (
    <Svg>
      <rect width="200" height="150" fill="#fff" />
      <m.g initial={false} animate={{ opacity: active ? 1 : 0.3, scale: active ? 1 : 0.8 }} transition={{ duration: 0.4, delay: active ? 0.5 : 0 }} style={{ originX: 0.5, originY: 0.5 }}>
        <SpeedLines cx={130} cy={56} count={40} opacity={0.7} />
      </m.g>
      <m.circle cx="130" cy="56" initial={false} animate={active ? { r: [0, 70], opacity: [0.9, 0] } : { r: 0, opacity: 0 }} transition={{ duration: 0.8, delay: 0.55 }} fill={SCARF_FILL} />
      <m.g initial={false} animate={active ? { x: [40, 0], y: [-30, 0], rotate: [-30, 0] } : { x: 40, y: -30, rotate: -30 }} transition={{ duration: 0.6, delay: 0.3, ease }}>
        <g transform="translate(104 26) scale(0.42)">
          <Ribbon outline flutter={active} speed={1.4} />
        </g>
      </m.g>
    </Svg>
  );
}
