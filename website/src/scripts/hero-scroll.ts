// Scroll-driven hero (see components/HeroMedia.astro).
// The hero section is taller than the screen and its inner box is sticky.
// While the visitor scrolls through it, this script draws the matching frame
// on a canvas, so the picture moves from "before" to "after".

type Connection = { saveData?: boolean; effectiveType?: string };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
// The picture reaches "after" a little before the hero lets go, so the result
// is visible for a moment while the hero is still pinned.
const SCRUB_END = 0.86;

export function initHeroScroll() {
  const hero = document.querySelector<HTMLElement>('[data-hero-scroll]');
  const sticky = hero?.querySelector<HTMLElement>('.hero__sticky');
  const media = hero?.querySelector<HTMLElement>('[data-hero-frames]');
  if (!hero || !sticky || !media) return;

  // Reduced motion: CSS shows a normal hero and <picture> serves the "after" still.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = media.querySelector('canvas');
  const ctx = canvas?.getContext('2d', { alpha: false });
  const portrait = matchMedia('(orientation: portrait) and (max-width: 899px)').matches;
  const base = portrait ? media.dataset.mobile : media.dataset.desktop;
  const end = portrait ? media.dataset.endMobile : media.dataset.endDesktop;
  const count = Number(media.dataset.heroFrames ?? 0);
  const conn = (navigator as Navigator & { connection?: Connection }).connection;

  if (!canvas || !ctx || !base || count < 2 || conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '')) {
    // No scrubbing: normal hero with the finished result.
    hero.classList.add('is-static');
    const img = media.querySelector<HTMLImageElement>('picture img');
    if (img && end) {
      const next = new Image();
      next.onload = () => {
        media.querySelectorAll('picture source').forEach((s) => s.remove());
        img.removeAttribute('srcset');
        img.src = end;
      };
      next.src = end;
    }
    return;
  }

  const frames: (HTMLImageElement | undefined)[] = new Array(count);
  let target = 0;
  let current = 0;
  let drawn = '';
  let running = false;

  const url = (i: number) => `${base}${String(i + 1).padStart(3, '0')}.webp`;

  // Nearest loaded frame at or below / at or above a position.
  const below = (i: number) => {
    for (let n = i; n >= 0; n--) if (frames[n]) return n;
    return -1;
  };
  const above = (i: number) => {
    for (let n = i; n < count; n++) if (frames[n]) return n;
    return -1;
  };

  const draw = (p: number) => {
    const f = clamp(p / SCRUB_END) * (count - 1);
    let a = below(Math.floor(f));
    let b = above(Math.ceil(f));
    if (a < 0) a = b;
    if (b < 0) b = a;
    if (a < 0) return;
    // Blend the two neighbouring frames, so the motion stays smooth even
    // while only the rough set has arrived.
    const mix = b > a ? clamp((f - a) / (b - a)) : 0;
    const key = `${a}:${b}:${mix.toFixed(2)}`;
    if (key === drawn) return;
    drawn = key;
    const first = frames[a]!;
    if (canvas.width !== first.naturalWidth) {
      canvas.width = first.naturalWidth;
      canvas.height = first.naturalHeight;
    }
    ctx.globalAlpha = 1;
    ctx.drawImage(first, 0, 0, canvas.width, canvas.height);
    if (mix > 0.01) {
      ctx.globalAlpha = mix;
      ctx.drawImage(frames[b]!, 0, 0, canvas.width, canvas.height);
    }
    canvas.classList.add('is-on');
  };

  // Progress line at the bottom edge and the fading "Scrollen" hint.
  const setProgress = (p: number) => {
    sticky.style.setProperty('--p', clamp(p / SCRUB_END).toFixed(3));
    sticky.style.setProperty('--hint', String(1 - clamp(p / 0.06)));
  };

  const measure = () => {
    const total = hero.offsetHeight - sticky.offsetHeight;
    target = total > 0 ? clamp(-hero.getBoundingClientRect().top / total) : 0;
  };

  const tick = () => {
    current += (target - current) * 0.16;
    if (Math.abs(target - current) < 0.0005) current = target;
    draw(current);
    setProgress(current);
    if (current !== target) requestAnimationFrame(tick);
    else running = false;
  };
  const requestTick = () => {
    if (running) return;
    running = true;
    requestAnimationFrame(tick);
  };
  const onScroll = () => {
    measure();
    requestTick();
  };

  const load = async (i: number) => {
    if (frames[i]) return;
    const img = new Image();
    img.decoding = 'async';
    img.src = url(i);
    try {
      await img.decode();
      frames[i] = img;
      drawn = ''; // a closer frame may now be available
      requestTick();
    } catch {
      // A missing frame is skipped; its neighbours are blended instead.
    }
  };

  // Load order: every 8th frame, then every 4th, every 2nd, then the rest.
  const order: number[] = [];
  const seen = new Set<number>();
  for (const stride of [8, 4, 2, 1]) {
    for (let i = 0; i < count; i += stride) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  if (!seen.has(count - 1)) order.splice(1, 0, count - 1);
  const preload = async () => {
    let next = 0;
    const worker = async () => {
      while (next < order.length) await load(order[next++]);
    };
    await Promise.all(Array.from({ length: 4 }, worker));
  };

  measure();
  current = target;
  setProgress(current);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  // Frames wait for the load event so they never compete with the first paint.
  const start = () => load(0).then(preload);
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}
