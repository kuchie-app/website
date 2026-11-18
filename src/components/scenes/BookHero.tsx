/**
 * Hero: a 3D tankōbon next to the headline. Scrolling opens the cover and
 * turns its pages; each spread plays its part of "The Lost Bookmark" when it
 * comes into view. The ribbon bookmark is the Bookmark Scarf and swings with
 * scroll speed; on desktop the book leans a little toward the pointer.
 *
 * CSS 3D transforms driven by Motion. No WebGL.
 */
import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react';
import type { KiriSources } from '../../data/kiri';
import { Ribbon } from '../art/Ribbon';
import { BookPage } from './Comic';
import { useSyncScroll } from './useSyncScroll';
import './book.css';

export interface BookHeroProps {
  k: KiriSources;
  lines: string[];
  lede: string;
  download: { href: string; label: string };
  altstore: { href: string; label: string };
  meta: string[];
  hint: string;
  cover: { title: string; subtitle: string; volume: string };
  rtl: boolean;
}

function Leaf({
  index,
  rotate,
  front,
  back,
}: {
  index: number;
  rotate: MotionValue<number>;
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  const shade = useTransform(rotate, (v) => Math.sin((Math.abs(v) / 180) * Math.PI) * 0.34);
  const backShade = useTransform(rotate, (v) => Math.sin((Math.abs(v) / 180) * Math.PI) * 0.24);
  // Motion applies translateZ outside the rotation, so the stacking order has
  // to be swapped by hand once a leaf has turned: the last turned leaf is on top.
  const z = useTransform(rotate, (v) => (Math.abs(v) > 90 ? (index + 1) * 3 : (3 - index) * 3));
  return (
    <m.div className="leaf" style={{ rotateY: rotate, z }}>
      <div className="leaf__face leaf__front">
        {front}
        <m.span className="leaf__shade" style={{ opacity: shade }} />
      </div>
      <div className="leaf__face leaf__back">
        {back}
        <m.span className="leaf__shade leaf__shade--back" style={{ opacity: backShade }} />
      </div>
    </m.div>
  );
}

export default function BookHero(props: BookHeroProps) {
  const { k, lines, lede, download, altstore, meta, hint, cover, rtl } = props;
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress: p, scrollY } = useScroll({ target: track, offset: ['start start', 'end end'] });
  useSyncScroll();
  const smooth = useSpring(p, { stiffness: 140, damping: 30, mass: 0.6 });
  const prog = reduce ? p : smooth;

  // Cover and two leaves turn one after another.
  const coverRot = useTransform(prog, [0.03, 0.28], [0, -179], { clamp: true });
  const leaf1Rot = useTransform(prog, [0.36, 0.58], [0, -179], { clamp: true });
  const leaf2Rot = useTransform(prog, [0.66, 0.88], [0, -179], { clamp: true });

  // How many leaves have turned decides which spread is showing.
  const [spread, setSpread] = useState(0);
  useMotionValueEvent(prog, 'change', (v) => {
    setSpread(v < 0.16 ? 0 : v < 0.47 ? 1 : v < 0.77 ? 2 : 3);
  });

  // The drama: when the scarf is torn away (spread 2) it flies out of the book
  // with a flash of lightning; when it's caught (spread 3) it flies back in.
  const [flight, setFlight] = useState<{ dir: 'out' | 'in'; id: number } | null>(null);
  const lastSpread = useRef(0);
  useEffect(() => {
    const prev = lastSpread.current;
    lastSpread.current = spread;
    if (reduce) return;
    if (spread === 2 && prev === 1) setFlight({ dir: 'out', id: Date.now() });
    else if (spread === 3 && prev === 2) setFlight({ dir: 'in', id: Date.now() });
  }, [spread, reduce]);

  // The book turns to face the reader as it opens, and slides so the spread is centred.
  const rotY = useTransform(prog, [0, 0.28], [-26, -4]);
  const rotX = useTransform(prog, [0, 0.28, 1], [14, 20, 24]);
  const x = useTransform(prog, [0.03, 0.28], [0, 50]);
  const hintOpacity = useTransform(p, [0, 0.05], [1, 0]);

  // A small lean toward the pointer, desktop only.
  const tiltX = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      tiltY.set((e.clientX / innerWidth - 0.5) * 8);
      tiltX.set((e.clientY / innerHeight - 0.5) * -6);
    };
    addEventListener('pointermove', onMove, { passive: true });
    return () => removeEventListener('pointermove', onMove);
  }, [reduce, tiltX, tiltY]);

  // The ribbon swings with scroll speed.
  const velocity = useVelocity(scrollY);
  const swing = useSpring(useTransform(velocity, [-2500, 0, 2500], [16, 0, -16]), { stiffness: 120, damping: 10 });

  // Right-to-left languages open the book the other way, like Arabic books.
  const dir = rtl ? -1 : 1;
  const cRot = useTransform(coverRot, (v) => v * dir);
  const l1Rot = useTransform(leaf1Rot, (v) => v * dir);
  const l2Rot = useTransform(leaf2Rot, (v) => v * dir);
  const bookX = useTransform(x, (v) => `${v * dir}%`);
  const bookRotY = useTransform([rotY, tiltY], ([a, b]: number[]) => a! * dir + b!);
  const bookRotX = useTransform([rotX, tiltX], ([a, b]: number[]) => a! + b!);

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="cover" aria-labelledby="hero-title">
        <div className="wrap cover__grid">
          <div className="cover__copy">
            <h1 id="hero-title" className="cover__title">
              {lines.map((line, i) => (
                <span className="cover__line" key={i} style={{ '--i': i } as React.CSSProperties}>
                  <span>{line}</span>
                </span>
              ))}
            </h1>
            <p className="cover__lede">{lede}</p>
            <div className="cover__actions">
              <a className="btn btn-primary" href={download.href}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 19h14" />
                </svg>
                {download.label}
              </a>
              <a className="link" href={altstore.href}>
                {altstore.label}
                <svg className="arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
            <p className="cover__meta mono">
              {meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </p>
          </div>

          <div className="cover__track" ref={track}>
            <div className="cover__stage">
              <m.div
                className="book-wrap"
                initial={reduce ? false : { opacity: 0, y: 40, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <m.div className="book" style={{ rotateX: bookRotX, rotateY: bookRotY, x: bookX }} aria-hidden="true">
                  <div className="book__back" />
                  <div className="book__spine" />
                  <div className="book__edge book__edge--side" />
                  <div className="book__edge book__edge--top" />
                  <div className="book__edge book__edge--bottom" />

                  <m.div className="book__ribbon" style={{ rotate: swing }}>
                    <svg viewBox="0 0 16 96" preserveAspectRatio="none">
                      <path d="M0 0h16v96l-8-9-8 9z" />
                    </svg>
                  </m.div>

                  <div className="book__page-static">
                    <BookPage k={k} n={5} active={spread === 3} />
                  </div>

                  <Leaf index={2} rotate={l2Rot} front={<BookPage k={k} n={3} active={spread === 2} />} back={<BookPage k={k} n={4} active={spread === 3} />} />
                  <Leaf index={1} rotate={l1Rot} front={<BookPage k={k} n={1} active={spread === 1} />} back={<BookPage k={k} n={2} active={spread === 2} />} />
                  <Leaf
                    index={0}
                    rotate={cRot}
                    front={
                      <div className="cover-art">
                        <span className="cover-art__vol mono">{cover.volume}</span>
                        <span className="cover-art__title">{cover.title}</span>
                        <span className="cover-art__sub">{cover.subtitle}</span>
                        <svg className="cover-art__scene" viewBox="0 0 200 260" aria-hidden="true">
                          <circle cx="150" cy="70" r="20" fill="#f4f0ea" />
                          <path d="M0 214h22v-22h26v14h16v-30h30v24h14v-14h28v20h16v-26h34v20h14v74H0z" fill="#0d0b1c" />
                          <g transform="translate(20 92) scale(1.25)">
                            <Ribbon flutter={!reduce && spread === 0} speed={2.6} />
                          </g>
                        </svg>
                      </div>
                    }
                    back={
                      <div className="inside-cover">
                        <svg viewBox="18 16 94 94" width="44" height="44" aria-hidden="true">
                          <Ribbon fill="#6a58dc" paper="#18142d" />
                        </svg>
                        <span className="mono">ex libris</span>
                        <span className="inside-cover__line" />
                      </div>
                    }
                  />
                </m.div>
                <div className="book__shadow" />

                <AnimatePresence>
                  {flight && (
                    <m.div
                      key={flight.id}
                      className="flyer"
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      animate={
                        flight.dir === 'out'
                          ? { x: ['40%', '-60%', '-190%'], y: ['-10%', '-90%', '-170%'], scale: [0.5, 1.7, 0.5], rotate: [0, -35, -80], opacity: [0, 1, 0] }
                          : { x: ['-200%', '-70%', '40%'], y: ['-170%', '-80%', '-10%'], scale: [0.5, 1.5, 0.4], rotate: [-80, -20, 0], opacity: [0, 1, 0] }
                      }
                      transition={{ duration: 1.6, ease: [0.45, 0, 0.2, 1], times: [0, 0.45, 1] }}
                      onAnimationComplete={() => setFlight(null)}
                    >
                      <svg viewBox="18 16 94 94">
                        <Ribbon flutter speed={0.45} />
                      </svg>
                    </m.div>
                  )}
                </AnimatePresence>

                {/* Kiri reacts to each spread: waves, reads, chases the scarf, celebrates. */}
                <div className="companion" aria-hidden="true">
                  <AnimatePresence mode="wait" initial={false}>
                    <m.div
                      key={spread}
                      className="companion__body"
                      initial={reduce ? false : { y: -36, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: 12, opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
                      transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                    >
                      <m.img
                        src={[k.intro, k.ready, k.sitting, k.jump][spread]}
                        alt=""
                        decoding="async"
                        animate={reduce ? undefined : spread === 0 || spread === 3 ? { y: ['0%', '-7%', '0%'] } : { y: '0%' }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </m.div>
                  </AnimatePresence>
                  <span className="companion__shadow" />
                </div>
              </m.div>
              <AnimatePresence>
                {flight?.dir === 'out' && (
                  <m.div
                    key={`flash-${flight.id}`}
                    className="stage-flash"
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.32, 0.04, 0.22, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, times: [0, 0.08, 0.2, 0.3, 1] }}
                  />
                )}
              </AnimatePresence>
              <m.p className="cover__hint mono" style={{ opacity: hintOpacity }}>
                {hint}
              </m.p>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
