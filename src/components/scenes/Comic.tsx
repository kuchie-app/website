/**
 * "The Lost Bookmark", laid out as comic pages and as a webtoon strip.
 *
 * A storm rolls in while Kiri reads. The window bursts open and the wind tears
 * the Bookmark Scarf away into the night. Lightning, a leap across the roofs,
 * the scarf whipping on a spire in the rain, the catch, and dawn.
 *
 * Panels are ink frames on paper. The scenery is SVG (../art/StoryScenes);
 * Kiri steps into each panel when the page comes into view.
 */
import type { CSSProperties, ReactNode } from 'react';
import { m } from 'motion/react';
import type { KiriSources } from '../../data/kiri';
import { RibbonStatic } from '../art/Ribbon';
import { SceneBeam, SceneDawn, SceneDesk, SceneHome } from '../art/StoryScenes';
import { SceneBurst, SceneCatch, SceneLeap, SceneLightning, SceneSpire, SceneStorm, SceneTorn } from '../art/DramaScenes';
import './comic.css';

type Fx = 'zoom' | 'shake' | 'push';

/** A panel. `fx` moves the "camera" when the panel plays: a slow zoom out, a push in, or a shake on impact. */
export function Panel({
  className = '',
  style,
  children,
  fx,
  active = false,
  delay = 0,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  fx?: Fx;
  active?: boolean;
  delay?: number;
}) {
  if (!fx) {
    return (
      <div className={`cp ${className}`} style={style}>
        {children}
      </div>
    );
  }
  const anim =
    fx === 'shake'
      ? { x: [0, -5, 5, -3, 3, 0], y: [0, 3, -3, 2, 0] }
      : fx === 'zoom'
        ? { scale: [1.14, 1] }
        : { scale: [1, 1.06] };
  return (
    <div className={`cp ${className}`} style={style}>
      <m.div
        className="cp__cam"
        initial={false}
        animate={active ? anim : { x: 0, y: 0, scale: fx === 'zoom' ? 1.14 : 1 }}
        transition={{ duration: fx === 'shake' ? 0.45 : 2.4, delay: active ? delay : 0, ease: fx === 'shake' ? 'easeOut' : [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.div>
    </div>
  );
}

/** Manga sound effect lettering that pops onto the panel. */
function Sfx({
  text,
  active,
  delay = 0.4,
  top = '8%',
  side = 'end',
  rotate = -10,
  size = 1.6,
}: {
  text: string;
  active: boolean;
  delay?: number;
  top?: string;
  side?: 'start' | 'end';
  rotate?: number;
  size?: number;
}) {
  return (
    <m.span
      className={`sfx sfx--${side}`}
      lang="ja"
      style={{ top, fontSize: `${size}em`, rotate: `${rotate}deg` }}
      initial={false}
      animate={active ? { opacity: [0, 1, 1], scale: [0.3, 1.2, 1] } : { opacity: 0, scale: 0.3 }}
      transition={{ duration: 0.45, delay: active ? delay : 0, ease: 'easeOut' }}
      aria-hidden="true"
    >
      {text}
    </m.span>
  );
}

type Enter = 'left' | 'right' | 'up' | 'run';

/** Kiri inside a panel: steps in when the panel plays. */
function Actor({
  src,
  active,
  enter = 'up',
  side = 'end',
  size = 52,
  delay = 0.25,
  bob = false,
}: {
  src: string;
  active: boolean;
  enter?: Enter;
  side?: 'start' | 'end' | 'center';
  size?: number;
  delay?: number;
  bob?: boolean;
}) {
  const from = {
    left: { x: '-60%', y: 0, opacity: 0 },
    right: { x: '60%', y: 0, opacity: 0 },
    up: { x: 0, y: '40%', opacity: 0 },
    run: { x: '-140%', y: 0, opacity: 1 },
  }[enter];
  const to = enter === 'run' ? { x: ['-140%', '10%', '0%'], y: 0, opacity: 1 } : { x: 0, y: 0, opacity: 1 };
  return (
    <m.div
      className={`actor actor--${side}`}
      style={{ width: `${size}%` }}
      initial={false}
      animate={active ? to : from}
      transition={{ duration: enter === 'run' ? 1.4 : 0.7, delay: active ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      <m.img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        animate={active && bob ? { y: ['0%', '-6%', '0%'] } : { y: '0%' }}
        transition={active && bob ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.7 } : { duration: 0.3 }}
      />
    </m.div>
  );
}

/** Book pages in reading order. `active` plays the page's moments. */
export function BookPage({ n, active, k }: { n: number; active: boolean; k: KiriSources }) {
  const folio = <span className="bp__folio">{n}</span>;
  switch (n) {
    case 1:
      return (
        <div className="bp bp--grid-a">
          <Panel className="span-2" fx="zoom" active={active}>
            <SceneStorm active={active} />
            <Sfx text="ゴロゴロ" active={active} delay={1.3} top="10%" side="start" rotate={-6} size={1.3} />
          </Panel>
          <Panel>
            <SceneDesk active={active} />
            <Actor src={k.ready} active={active} side="end" size={58} delay={0.6} />
          </Panel>
          <Panel fx="shake" active={active} delay={1.4}>
            <SceneBurst active={active} />
            <Actor src={k.error} active={active} enter="right" side="end" size={60} delay={1.5} />
            <Sfx text="バンッ" active={active} delay={1.3} top="6%" side="start" rotate={-12} size={1.7} />
          </Panel>
          {folio}
        </div>
      );
    case 2:
      return (
        <div className="bp bp--grid-b">
          <Panel className="span-2" fx="push" active={active}>
            <SceneTorn active={active} />
            <Actor src={k.fetchFailed} active={active} side="start" size={40} delay={0.2} />
            <Sfx text="ビュオッ" active={active} delay={0.5} top="10%" side="end" rotate={-14} size={1.8} />
          </Panel>
          <Panel fx="shake" active={active} delay={1.2}>
            <SceneLightning active={active} />
            <Sfx text="ピシャッ" active={active} delay={1.2} top="8%" side="start" rotate={8} size={1.4} />
          </Panel>
          <Panel>
            <SceneLeap active={active} />
            <Actor src={k.jump} active={active} enter="run" side="start" size={62} delay={1.6} />
            <Sfx text="ダッ" active={active} delay={1.9} top="12%" side="end" rotate={-8} size={1.6} />
          </Panel>
          {folio}
        </div>
      );
    case 3:
      return (
        <div className="bp bp--grid-c">
          <Panel fx="zoom" active={active}>
            <SceneSpire active={active} />
            <Sfx text="ザァァ" active={active} delay={0.4} top="8%" side="start" rotate={-4} size={1.3} />
          </Panel>
          <Panel>
            <SceneBeam active={active} />
            <Actor src={k.intro} active={active} enter="left" side="start" size={62} delay={0.9} />
          </Panel>
          <Panel className="span-2" fx="shake" active={active} delay={1.9}>
            <SceneCatch active={active} />
            <Actor src={k.jump} active={active} side="start" size={34} delay={1.5} bob />
            <Sfx text="ドンッ!!" active={active} delay={1.9} top="10%" side="end" rotate={-10} size={2.1} />
          </Panel>
          {folio}
        </div>
      );
    case 4:
      return (
        <div className="bp bp--grid-a">
          <Panel className="span-2" fx="zoom" active={active}>
            <SceneHome active={active} />
          </Panel>
          <Panel>
            <SceneDawn active={active} />
            <Actor src={k.complete} active={active} side="center" size={70} delay={0.8} />
          </Panel>
          <Panel>
            <SceneDesk active={active} />
            <Actor src={k.offline} active={active} side="end" size={58} delay={1.2} />
          </Panel>
          {folio}
        </div>
      );
    default:
      return (
        <div className="bp bp--end">
          <svg className="bp__end-mark" viewBox="18 16 94 94" aria-hidden="true">
            <RibbonStatic fill="#6a58dc" paper="#18142d" />
          </svg>
          <span className="bp__end-text">to be continued</span>
          {folio}
        </div>
      );
  }
}

/** The same story as one vertical strip, for the phone's webtoon mode. */
export function WebtoonStrip({ active = true, k }: { active?: boolean; k: KiriSources }) {
  const panels: [ReactNode, number][] = [
    [<><SceneStorm active={active} /><Sfx text="ゴロゴロ" active={active} delay={1.2} side="start" size={1.2} /></>, 190],
    [<><SceneDesk active={active} /><Actor src={k.ready} active={active} side="end" size={52} delay={0.4} /></>, 200],
    [<><SceneBurst active={active} /><Actor src={k.error} active={active} enter="right" side="end" size={50} delay={0.6} /><Sfx text="バンッ" active={active} delay={0.5} side="start" size={1.5} /></>, 200],
    [<><SceneTorn active={active} /><Actor src={k.fetchFailed} active={active} side="start" size={44} delay={0.3} /><Sfx text="ビュオッ" active={active} delay={0.5} size={1.5} /></>, 220],
    [<><SceneLightning active={active} /><Sfx text="ピシャッ" active={active} delay={0.4} side="start" size={1.3} /></>, 190],
    [<><SceneLeap active={active} /><Actor src={k.jump} active={active} enter="run" side="start" size={48} delay={0.4} /></>, 200],
    [<><SceneSpire active={active} /><Sfx text="ザァァ" active={active} delay={0.3} side="start" size={1.2} /></>, 210],
    [<><SceneCatch active={active} /><Actor src={k.jump} active={active} side="start" size={40} delay={0.4} bob /><Sfx text="ドンッ!!" active={active} delay={0.6} size={1.8} /></>, 210],
    [<><SceneDawn active={active} /><Actor src={k.complete} active={active} side="center" size={56} delay={0.3} /></>, 200],
  ];
  return (
    <div className="strip">
      {panels.map(([scene, h], i) => (
        <Panel key={i} className={i === 0 ? 'strip__p strip__p--first' : 'strip__p'} style={{ height: h }}>
          {scene}
        </Panel>
      ))}
    </div>
  );
}
