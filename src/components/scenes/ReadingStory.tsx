/**
 * Reading: a sticky iPhone whose screen changes with each step.
 * 01 the webtoon strip scrolls with the page, 02 pages turn right to left,
 * 03 Liquid Glass controls appear, 04 the Dynamic Island shows a download
 * with the bookmark scarf and a progress ring, as the app does.
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
import { BookPage, WebtoonStrip } from './Comic';
import { useSyncScroll } from './useSyncScroll';
import './reading.css';

interface Props {
  k: KiriSources;
  c: HomeCopy['reading'];
  rtl: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;

const ScarfGlyph = () => (
  <svg viewBox="18 16 94 94" width="22" height="22" aria-hidden="true">
    <path fill="#b5aaff" d="M23 92c14-12 18-29 28-42 13-18 31-23 54-24L94 40l13 11c-19 0-30 5-40 17-9 11-13 23-25 32l-2-13z" />
    <path fill="#f4f0ea" d="m31 70 5-28 23-10c-9 7-16 18-21 29z" />
  </svg>
);

export default function ReadingStory({ k, c, rtl }: Props) {
  const steps = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!phone.current) return;
    const ro = new ResizeObserver(([entry]) => setScale((entry?.contentRect.width ?? 300) / 290));
    ro.observe(phone.current);
    return () => ro.disconnect();
  }, []);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: steps, offset: ['start center', 'end center'] });
  useSyncScroll();
  const p = useSpring(scrollYProgress, { stiffness: 160, damping: 32 });

  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setStep(v <= 0 ? 0 : Math.min(3, Math.floor(v * 4)));
  });

  // 01: the strip scrolls with the page.
  const stripY = useTransform(p, [0, 0.25], reduce ? [0, 0] : [0, -760]);

  // 02: pages keep turning while this step is active.
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (step !== 1 || reduce) return;
    const id = setInterval(() => setPage((n) => n + 1), 1500);
    return () => clearInterval(id);
  }, [step, reduce]);

  // 03: the selected reading mode slides from Webtoon to Right to left.
  const [modeIdx, setModeIdx] = useState(0);
  useEffect(() => {
    if (step !== 2) return setModeIdx(0);
    const id = setTimeout(() => setModeIdx(1), 450);
    return () => clearTimeout(id);
  }, [step]);

  // 04: the download ring fills as you scroll through the last step.
  const ring = useTransform(p, [0.78, 0.98], [0, 1]);
  const dash = useTransform(ring, (v) => 1 - v);

  const paged = step === 1 || step === 2;
  const enterX = rtl ? '100%' : '-100%';
  const exitX = rtl ? '-100%' : '100%';
  const pageLabel = `${(paged ? 13 + page : 12)} / 48`;

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="reading" aria-labelledby="reading-title">
        <div className="wrap reading__grid">
          <div className="reading__stage" aria-hidden="true">
            <div className="rphone" ref={phone}>
              <div className="rphone__screen">
                <m.div
                  className="island"
                  animate={step === 3 ? { width: '86%', height: 54 * scale, borderRadius: 28 * scale } : { width: 92 * scale, height: 27 * scale, borderRadius: 14 * scale }}
                  transition={{ duration: 0.5, ease }}
                >
                  <AnimatePresence>
                    {step === 3 && (
                      <m.div
                        className="island__content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.25 } }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      >
                        <ScarfGlyph />
                        <span className="island__text">
                          <b>{c.phone.downloading}</b>
                          <i className="mono">{c.phone.pages}</i>
                        </span>
                        <svg className="island__ring" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="14" pathLength="1" />
                          <m.circle cx="18" cy="18" r="14" pathLength="1" style={{ strokeDashoffset: dash }} />
                        </svg>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
                <div className={`rphone__status ${paged ? 'is-dark' : ''}`}>
                  <span>9:41</span>
                  <span className="mono">82%</span>
                </div>

                <m.div className="rphone__strip" style={{ y: stripY }}>
                  <WebtoonStrip k={k} active={step === 0} />
                </m.div>

                <AnimatePresence>
                  {paged && (
                    <m.div
                      className="paged"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      <AnimatePresence initial={false}>
                        <m.div
                          key={page}
                          className="paged__sheet"
                          initial={{ x: enterX, rotateY: rtl ? -18 : 18, opacity: 0.6 }}
                          animate={{ x: 0, rotateY: 0, opacity: 1 }}
                          exit={{ x: exitX, rotateY: rtl ? 18 : -18, opacity: 0.6 }}
                          transition={{ duration: 0.6, ease }}
                        >
                          <BookPage k={k} n={(page % 4) + 1} active />
                        </m.div>
                      </AnimatePresence>
                    </m.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {step === 2 && (
                    <m.div
                      className="rphone__top"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                        <path d={rtl ? 'm9 18 6-6-6-6' : 'm15 18-6-6 6-6'} />
                      </svg>
                      <span>
                        <b>{c.phone.series}</b>
                        <i>{c.phone.chapter}</i>
                      </span>
                    </m.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {step === 2 && (
                    <m.div
                      className="rphone__sheet rglass"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <span className="mono">{c.phone.mode}</span>
                      <div className="rphone__modes">
                        <m.div
                          className="rphone__pill"
                          animate={{ x: modeIdx % 2 ? 'calc(100% + 6px)' : '0%', y: modeIdx > 1 ? 'calc(100% + 6px)' : '0%' }}
                          transition={{ duration: 0.4, ease }}
                          aria-hidden="true"
                        />
                        {c.phone.modes.map((label, i) => (
                          <span key={label} className={i === modeIdx ? 'is-on' : ''}>
                            <em>{label}</em>
                          </span>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>

                <div className="rphone__slider rglass">
                  <span className="mono">{pageLabel}</span>
                  <span className="rphone__track">
                    <m.span animate={{ scaleX: paged ? 0.27 + (page % 6) * 0.02 : 0.25 }} transition={{ duration: 0.5, ease }} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="reading__steps" ref={steps}>
            <header className="reading__head">
              <p className="folio mono">
                <b>03</b>
                <span>{c.folio}</span>
              </p>
            </header>
            {c.steps.map((s, i) => (
              <m.article
                key={s.tag}
                className="rstep"
                animate={{ opacity: step === i ? 1 : 0.28 }}
                transition={{ duration: 0.35, ease }}
              >
                <span className="mono rstep__tag">
                  0{i + 1} · {s.tag}
                </span>
                <h3 id={i === 0 ? 'reading-title' : undefined}>{s.title}</h3>
                <p>{s.body}</p>
              </m.article>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
