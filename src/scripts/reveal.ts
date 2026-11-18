/**
 * Scroll reveals without a library: IntersectionObserver plus the Web
 * Animations API. `data-reveal` fades and rises; `data-reveal="wipe"` inks a
 * panel in from its start edge. `data-count` numbers count up once.
 * Revealed elements get `is-revealed` for CSS that follows them.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const rtl = document.documentElement.dir === 'rtl';

function reveal(el: HTMLElement) {
  const delay = Number(el.dataset.revealDelay ?? 0);
  const kind = el.dataset.reveal;
  const finish = () => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.classList.add('is-revealed');
  };
  if (kind === 'title') {
    finish();
    el.animate(
      [
        { clipPath: 'inset(0 0 100% 0)', transform: 'translate3d(0, 0.4em, 0)' },
        { clipPath: 'inset(0 0 -10% 0)', transform: 'none' },
      ],
      { duration: 900, delay, easing: EASE, fill: 'backwards' },
    ).finished.catch(() => {});
    return;
  }
  if (kind === 'pop') {
    finish();
    el.animate(
      [
        { opacity: 0, transform: 'translate3d(0, 40px, 0) scale(0.85) rotate(-6deg)' },
        { opacity: 1, transform: 'translate3d(0, -8px, 0) scale(1.03) rotate(2deg)', offset: 0.6 },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 800, delay, easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)', fill: 'backwards' },
    ).finished.catch(() => {});
    return;
  }
  if (kind === 'wipe') {
    const from = rtl ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.classList.add('is-revealed');
    el.animate([{ clipPath: from }, { clipPath: 'inset(0 0 0 0)' }], { duration: 700, delay, easing: EASE, fill: 'backwards' })
      .finished.then(() => (el.style.clipPath = ''))
      .catch(() => {});
    return;
  }
  el.animate(
    [
      { opacity: 0, transform: 'translate3d(0, 12px, 0)' },
      { opacity: 1, transform: 'none' },
    ],
    { duration: 700, delay, easing: EASE, fill: 'backwards' },
  )
    .finished.catch(() => {})
    .finally(finish);
  finish();
}

function countUp(el: HTMLElement) {
  const to = Number(el.dataset.count);
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / 1100);
    el.textContent = String(Math.round(to * (1 - Math.pow(1 - t, 3))));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
const countEls = document.querySelectorAll<HTMLElement>('[data-count]');

if (reduced || !('IntersectionObserver' in window)) {
  document.documentElement.classList.remove('js');
  revealEls.forEach((el) => el.classList.add('is-revealed'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        if (el.dataset.count !== undefined) countUp(el);
        else reveal(el);
      }
    },
    { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
  );
  revealEls.forEach((el) => observer.observe(el));
  countEls.forEach((el) => {
    el.textContent = '0';
    observer.observe(el);
  });
}
