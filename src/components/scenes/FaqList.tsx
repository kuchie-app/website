/** FAQ accordion: answers open with a height animation, the plus turns into a cross. */
import { useId, useState } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="faq-list">
        {items.map((item, i) => {
          const isOpen = open === i;
          const panelId = `${base}-${i}`;
          return (
            <div className="faq-item" key={item.q}>
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{item.q}</span>
                  <m.svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease }}
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </m.svg>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={panelId}
                    key="a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p>{item.a}</p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </LazyMotion>
  );
}
