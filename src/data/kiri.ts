import { getImage } from 'astro:assets';
import complete from '../assets/kiri/complete.png';
import error from '../assets/kiri/error.png';
import fetchFailed from '../assets/kiri/fetch-failed.png';
import intro from '../assets/kiri/intro.png';
import sitting from '../assets/kiri/kiri-loading.png';
import ready from '../assets/kiri/kiri-ready.png';
import jump from '../assets/kiri/loading.png';
import offline from '../assets/kiri/offline.png';

/** Kiri, Kuchie's character, in the poses the story uses. */
// Only the lavender-hood Kiri is used. The dark side-view model is retired.
// complete: happy, reading · error: sad, torn pages · fetchFailed: worried · intro: smiling, reading
// sitting/ready: sitting, reading · jump: jumping for joy · offline: cosy, reading with a snack
const poses = { complete, error, fetchFailed, intro, sitting, ready, jump, offline };

export type KiriPose = keyof typeof poses;
export type KiriSources = Record<KiriPose, string>;

/** Optimised WebP URLs for every pose, for the React scenes. */
export async function kiriSources(width = 320): Promise<KiriSources> {
  const entries = await Promise.all(
    Object.entries(poses).map(async ([name, src]) => {
      const img = await getImage({ src, width, format: 'webp', quality: 80 });
      return [name, img.src] as const;
    }),
  );
  return Object.fromEntries(entries) as KiriSources;
}
