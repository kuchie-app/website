/**
 * Extensions: package slips arrive at a desk one at a time and get an ink
 * stamp, Verified or Refused, with the reason. It starts when the desk scrolls
 * into view and can be replayed.
 */
import { useEffect, useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from 'motion/react';
import type { HomeCopy } from '../../i18n/home';
import './stamp.css';

interface Props {
  c: HomeCopy['safety'];
  guideHref: string;
  rtl: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function StampCheck({ c, guideHref, rtl }: Props) {
  const side = rtl ? -1 : 1;
  const desk = useRef<HTMLDivElement>(null);
  const inView = useInView(desk, { amount: 0.5, once: false });
  const reduce = useReducedMotion() ?? false;
  const total = c.slips.length;
  const [shown, setShown] = useState(reduce ? total : 0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    if (shown >= total) return;
    const id = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 300 : 1300);
    return () => clearTimeout(id);
  }, [inView, shown, total, reduce, run]);

  const restart = () => {
    setShown(0);
    setRun((r) => r + 1);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="stamp" aria-labelledby="stamp-title">
        <div className="wrap stamp__grid">
          <div className="stamp__copy">
            <p className="folio mono">
              <b>04</b>
              <span>{c.folio}</span>
            </p>
            <h2 id="stamp-title" className="h2" data-reveal="title">
              {c.title}
            </h2>
            <p className="lead-text">{c.lede}</p>
            <p className="stamp__link">
              <a className="link link-accent" href={guideHref}>
                {c.link}
                <svg className="arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </p>
          </div>

          <div className="desk" ref={desk}>
            <div className="desk__surface" aria-hidden={false}>
              {c.slips.map((slip, i) => {
                const ok = i < 2;
                const state = i < shown - 1 ? 'pile' : i === shown - 1 ? 'current' : 'waiting';
                const pileIndex = i;
                const target =
                  state === 'pile'
                    ? { x: side * (112 + pileIndex * 6), y: 70 + pileIndex * 10, rotate: side * (-6 + pileIndex * 4), scale: 0.62, opacity: 1 }
                    : state === 'current'
                      ? { x: 0, y: 0, rotate: -1.5, scale: 1, opacity: 1 }
                      : { x: side * -40, y: -160, rotate: -8, scale: 0.95, opacity: 0 };
                return (
                  <m.div
                    key={`${run}-${i}`}
                    className="slip"
                    initial={{ x: side * -40, y: -160, rotate: -8, scale: 0.95, opacity: 0 }}
                    animate={target}
                    transition={{ duration: reduce ? 0 : 0.6, ease }}
                    style={{ zIndex: state === 'current' ? 10 : i }}
                  >
                    <span className="slip__hole" />
                    <span className="mono slip__label">APK</span>
                    <span className="slip__name mono">{slip.name}</span>
                    <span className="slip__check">{slip.check}</span>
                    {state !== 'waiting' && (
                      <m.span
                        className={`seal ${ok ? 'seal--ok' : 'seal--no'}`}
                        initial={reduce ? false : { scale: 2.2, opacity: 0, rotate: -18 }}
                        animate={{ scale: 1, opacity: 1, rotate: -9 }}
                        transition={{ duration: 0.22, delay: reduce ? 0 : 0.55, ease: [0.5, 0, 0.75, 0] }}
                      >
                        {slip.verdict}
                      </m.span>
                    )}
                  </m.div>
                );
              })}
            </div>
            <div className="desk__foot">
              <span className="mono">
                {Math.min(shown, total)} / {total}
              </span>
              <button type="button" className="desk__replay mono" onClick={restart} disabled={shown < total}>
                {c.replay}
              </button>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
