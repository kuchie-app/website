import { useEffect } from 'react';

/**
 * Scenes hydrate when they come into view. If the page jumped there (a link,
 * a reload mid-page), Motion has not seen a scroll yet, so scroll by one
 * pixel and back. Nobody sees it, and the scene measures where it is.
 */
export function useSyncScroll() {
  useEffect(() => {
    const nudge = () => {
      const y = window.scrollY;
      if (y <= 0) return;
      window.scrollTo({ top: y - 1, behavior: 'instant' });
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }));
    };
    const late = window.setTimeout(nudge, 120);
    return () => window.clearTimeout(late);
  }, []);
}
