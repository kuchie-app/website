/**
 * The Bookmark Scarf from the app icon, drawn as an animatable SVG group.
 * Three flutter shapes share one path structure, so Motion can morph between
 * them. Coordinates are the icon's 128-unit grid.
 */
import { m } from 'motion/react';

export const SCARF = {
  rest: 'M23 92c14-12 18-29 28-42 13-18 31-23 54-24L94 40l13 11c-19 0-30 5-40 17-9 11-13 23-25 32l-2-13z',
  up: 'M23 90c15-14 20-27 30-40 13-16 30-21 52-20L95 42l12 12c-18 1-29 6-39 18-9 10-14 21-26 30l-1-12z',
  down: 'M24 94c13-10 16-31 26-44 13-20 32-25 55-26L93 38l14 10c-20-1-31 4-41 16-9 12-12 25-24 34l-2-14z',
};
export const SCARF_PAPER = 'm31 70 5-28 23-10c-9 7-16 18-21 29z';

export const INK = '#18142d';
export const PAPER = '#f4f0ea';
export const SCARF_FILL = '#b5aaff';
export const VIOLET = '#6a58dc';

interface RibbonProps {
  /** Flutter continuously while true. */
  flutter?: boolean;
  /** Draw an ink outline, as in the comic panels. */
  outline?: boolean;
  fill?: string;
  paper?: string;
  speed?: number;
}

/** Use inside an <svg>; position it with a wrapping <g transform>. */
export function Ribbon({ flutter = false, outline = false, fill = SCARF_FILL, paper = PAPER, speed = 1.6 }: RibbonProps) {
  return (
    <g>
      <m.path
        d={SCARF.rest}
        fill={fill}
        stroke={outline ? INK : 'none'}
        strokeWidth={outline ? 3 : 0}
        strokeLinejoin="round"
        animate={flutter ? { d: [SCARF.rest, SCARF.up, SCARF.rest, SCARF.down, SCARF.rest] } : { d: SCARF.rest }}
        transition={flutter ? { duration: speed, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.6 }}
      />
      <path d={SCARF_PAPER} fill={paper} stroke={outline ? INK : 'none'} strokeWidth={outline ? 2.5 : 0} strokeLinejoin="round" />
    </g>
  );
}

/** A static version for pages without Motion. */
export function RibbonStatic({ fill = SCARF_FILL, paper = PAPER }: { fill?: string; paper?: string }) {
  return (
    <g>
      <path d={SCARF.rest} fill={fill} />
      <path d={SCARF_PAPER} fill={paper} />
    </g>
  );
}
