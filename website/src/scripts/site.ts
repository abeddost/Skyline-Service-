// All behaviour of the site. Plain DOM code, no animation libraries.
import { initHeroScroll } from './hero-scroll';
import { initConfigurator } from './configurator';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ----- header -----
const header = document.querySelector<HTMLElement>('[data-header]');
const menuBtn = document.querySelector<HTMLButtonElement>('[data-menu-btn]');
const mobileNav = document.querySelector<HTMLElement>('[data-mobile-nav]');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const setMenu = (open: boolean) => {
  header?.classList.toggle('is-open', open);
  mobileNav?.classList.toggle('is-open', open);
  menuBtn?.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
};
menuBtn?.addEventListener('click', () => setMenu(!mobileNav?.classList.contains('is-open')));
mobileNav?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

// ----- reveal on scroll -----
const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduce || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealEls.forEach((el) => io.observe(el));
}

// ----- before / after comparison -----
// Drag anywhere on the picture, tap "Vorher" / "Nachher", or use the arrow
// keys. Up and down swipes still scroll the page (touch-action: pan-y).
document.querySelectorAll<HTMLElement>('[data-ba]').forEach((ba) => {
  const stage = ba.querySelector<HTMLElement>('[data-ba-stage]');
  const range = ba.querySelector<HTMLInputElement>('input[type="range"]');
  if (!stage || !range) return;

  let pos = 50;
  let touched = false;
  let anim = 0;

  const set = (value: number) => {
    pos = Math.min(100, Math.max(0, value));
    stage.style.setProperty('--pos', `${pos}%`);
    range.value = String(Math.round(pos));
  };
  const glide = (to: number, ms = 350) => {
    cancelAnimationFrame(anim);
    if (reduce) return set(to);
    const from = pos;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / ms);
      set(from + (to - from) * (1 - Math.pow(1 - t, 3)));
      if (t < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  };
  const fromPointer = (e: PointerEvent) => {
    const r = stage.getBoundingClientRect();
    set(((e.clientX - r.left) / r.width) * 100);
  };

  let dragging = false;
  stage.addEventListener('pointerdown', (e) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = true;
    touched = true;
    cancelAnimationFrame(anim);
    stage.setPointerCapture(e.pointerId);
    fromPointer(e);
  });
  stage.addEventListener('pointermove', (e) => {
    if (dragging) fromPointer(e);
  });
  const stop = () => (dragging = false);
  stage.addEventListener('pointerup', stop);
  stage.addEventListener('pointercancel', stop);

  ba.querySelectorAll<HTMLButtonElement>('[data-ba-set]').forEach((btn) =>
    btn.addEventListener('click', () => {
      touched = true;
      // A second tap on the same label goes back to the middle.
      const to = Number(btn.dataset.baSet);
      glide(Math.abs(pos - to) < 1 ? 50 : to);
    }),
  );
  range.addEventListener('input', () => {
    touched = true;
    set(Number(range.value));
  });
  set(50);

  // One short wiggle when the comparison first comes into view shows that
  // the divider can be moved.
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (touched) return;
        glide(64, 450);
        setTimeout(() => !touched && glide(38, 600), 480);
        setTimeout(() => !touched && glide(50, 450), 1120);
      },
      { threshold: 0.6 },
    );
    io.observe(stage);
  }
});

// ----- "show all comparisons" on phones -----
const baGrid = document.querySelector<HTMLElement>('[data-ba-grid]');
const baMore = document.querySelector<HTMLButtonElement>('[data-ba-more]');
baMore?.addEventListener('click', () => {
  baGrid?.classList.add('is-open');
  baMore.hidden = true;
});

// ----- sticky bar hides while the configurator is on screen -----
const bar = document.querySelector<HTMLElement>('[data-sticky-bar]');
const cfg = document.querySelector<HTMLElement>('[data-cfg]');
if (bar && cfg && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => bar.classList.toggle('is-hidden', entry.isIntersecting), {
    threshold: 0.15,
  }).observe(cfg);
}

// ----- WhatsApp button: one pulse after 8 seconds -----
const fab = document.querySelector<HTMLElement>('[data-wa-fab]');
if (fab && !reduce) setTimeout(() => fab.classList.add('is-pulse'), 8000);

// ----- click events for analytics (only does something once a tag manager
// with consent is added; see README) -----
document.addEventListener('click', (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
  const w = window as Window & { dataLayer?: unknown[] };
  if (el) w.dataLayer?.push({ event: el.dataset.track });
});

initConfigurator();
initHeroScroll();
