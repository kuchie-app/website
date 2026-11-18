/**
 * How Kuchie works: an iPhone that tilts into an isometric view and comes
 * apart into its three layers (reader, library, source). Further down, the
 * source layer switches from Local to Server. The toggle does the same by
 * hand. CSS 3D, driven by Motion's useScroll.
 */
import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import type { HomeCopy } from '../../i18n/home';
import type { KiriSources } from '../../data/kiri';
import { Panel } from './Comic';
import { Cover, SERIES } from '../art/Covers';
import { SceneCity, SceneEscape, SceneRooftops } from '../art/StoryScenes';
import { useSyncScroll } from './useSyncScroll';
import './how.css';

type Mode = 'local' | 'server';

interface Props {
  k: KiriSources;
  c: HomeCopy['how'];
}

const ease = [0.22, 1, 0.36, 1] as const;

function FileIcon({ kind }: { kind: 'file' | 'folder' | 'store' | 'server' | 'library' | 'queue' }) {
  const d = {
    file: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5',
    folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z',
    store: 'M12 3 4 7.5v9L12 21l8-4.5v-9L12 3ZM12 12 4.5 7.8M12 12l7.5-4.2M12 12v8.6',
    server: 'M5 4h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 9h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2ZM7 7.5h.01M7 16.5h.01',
    library: 'M4 19V5h4v14M9 19V8h4v11M14.5 6.5l3-.8 3.5 12.3M3 19h18',
    queue: 'M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 19h14',
  }[kind];
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function HowItWorks({ k, c }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  useSyncScroll();
  const p = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.6 });

  // Upright phone → isometric view → layers apart.
  const rx = useTransform(p, [0, 0.16], reduce ? [56, 56] : [8, 56]);
  const rz = useTransform(p, [0, 0.16], reduce ? [-38, -38] : [-6, -38]);
  const spread = useTransform(p, [0.14, 0.4], reduce ? [1, 1] : [0, 1]);
  // Smaller screens get a shorter stack so the layers stay clear of the text.
  const [reach, setReach] = useState(250);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 719px)');
    const update = () => setReach(mq.matches ? 150 : 250);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const zReader = useTransform(spread, (v) => 8 + v * (reach - 8));
  const zLibrary = useTransform(spread, (v) => 4 + v * (reach / 2 - 4));
  const frameOpacity = useTransform(spread, [0, 0.4], [1, 0]);
  const labelOpacity = useTransform(spread, [0.6, 1], [0, 1]);

  // The source switches with scroll; the toggle overrides it until the next switch point.
  const [mode, setMode] = useState<Mode>('local');
  const lastAuto = useRef<Mode>('local');
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const auto: Mode = v > 0.64 ? 'server' : 'local';
    if (auto !== lastAuto.current) {
      lastAuto.current = auto;
      setMode(auto);
    }
  });

  const active = c[mode];

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="how" aria-labelledby="how-title">
        <div className="how__track" ref={track}>
          <div className="how__frame">
            <div className="wrap how__grid">
              <div className="how__copy">
                <p className="folio mono">
                  <b>02</b>
                  <span>{c.folio}</span>
                </p>
                <h2 id="how-title" className="h2" data-reveal="title">
                  {c.title}
                </h2>
                <p className="lead-text">{c.lede}</p>

                <div className="how__switch" role="group" aria-label={`${c.local.tab} / ${c.server.tab}`}>
                  <m.span
                    className="how__thumb"
                    animate={{ x: mode === 'server' ? '100%' : '0%' }}
                    transition={{ duration: 0.35, ease }}
                    aria-hidden="true"
                  />
                  {(['local', 'server'] as const).map((m_) => (
                    <button key={m_} type="button" aria-pressed={mode === m_} onClick={() => setMode(m_)}>
                      <span>{c[m_].tab}</span>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={mode}
                    className="how__mode"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <p>{active.body}</p>
                  </m.div>
                </AnimatePresence>
                <p className="how__note mono">{c.switch}</p>
              </div>

              <div className="how__stage" aria-hidden="true">
                <m.div className="iso" style={{ rotateX: rx, rotateZ: rz }}>
                  {/* Source: the base of the phone */}
                  <div className="slab slab--source">
                    <AnimatePresence mode="wait" initial={false}>
                      <m.div
                        key={mode}
                        className={`src src--${mode}`}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.35, ease }}
                      >
                        {mode === 'local' ? (
                          <>
                            {(['file', 'folder', 'store'] as const).map((kind, i) => (
                              <div className="src__row" key={kind}>
                                <FileIcon kind={kind} />
                                <span>{c.local.items[i]}</span>
                                <em className="mono">{c.local.metas[i]}</em>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            <div className="src__server">
                              <span className="src__led" />
                              <span className="src__led src__led--2" />
                              <FileIcon kind="server" />
                            </div>
                            {(['server', 'library', 'queue'] as const).map((kind, i) => (
                              <div className="src__row" key={kind}>
                                <FileIcon kind={kind} />
                                <span>{c.server.items[i]}</span>
                                <em className="mono">{c.server.metas[i]}</em>
                              </div>
                            ))}
                          </>
                        )}
                      </m.div>
                    </AnimatePresence>
                  </div>

                  {/* Library */}
                  <m.div className="slab slab--library" style={{ z: zLibrary }}>
                    <div className="lib">
                      {SERIES.map((sr) => (
                        <Cover key={sr.id} id={sr.id} title={sr.title} vol={sr.vol} badge={sr.unread || undefined} />
                      ))}
                    </div>
                  </m.div>

                  {/* Reader: the screen */}
                  <m.div className="slab slab--reader" style={{ z: zReader }}>
                    <div className="reader">
                      <Panel style={{ height: '30%' }}><SceneCity active /></Panel>
                      <Panel style={{ height: '36%' }}>
                        <SceneEscape active />
                        <img className="actor actor--start" src={k.error} alt="" style={{ width: '46%' }} loading="lazy" />
                      </Panel>
                      <Panel style={{ height: '30%' }}>
                        <SceneRooftops active={false} />
                        <img className="actor actor--start" src={k.jump} alt="" style={{ width: '50%' }} loading="lazy" />
                      </Panel>
                      <span className="reader__bar" />
                    </div>
                    <m.div className="slab__frame" style={{ opacity: frameOpacity }} />
                  </m.div>
                </m.div>
                <m.ol className="how__legend" style={{ opacity: labelOpacity }}>
                  {[
                    [c.layers.reader.name, c.layers.reader.note],
                    [c.layers.library.name, c.layers.library.note],
                    [c.layers.source.name, active.tab],
                  ].map(([name, note], i) => (
                    <li key={i} style={{ '--row': i } as React.CSSProperties}>
                      <span className="mono how__legend-n">0{i + 1}</span>
                      <b>{name}</b>
                      <span className="mono how__legend-note">{note}</span>
                    </li>
                  ))}
                </m.ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
