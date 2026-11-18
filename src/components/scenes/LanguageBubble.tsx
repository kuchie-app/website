/** A speech bubble that says "Library" in the app's languages, one after another. */
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m, useInView, useReducedMotion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

export default function LanguageBubble({ words }: { words: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduce = useReducedMotion() ?? false;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 1600);
    return () => clearInterval(id);
  }, [inView, reduce, words.length]);

  return (
    <LazyMotion features={domAnimation} strict>
      <span className="lbubble" ref={ref} aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={i}
            className="lbubble__word"
            dir="auto"
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease }}
          >
            {words[i]}
          </m.span>
        </AnimatePresence>
      </span>
    </LazyMotion>
  );
}
