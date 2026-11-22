import type { ImageMetadata } from 'astro';

const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.jpg', { eager: true });
const sliders = import.meta.glob<{ default: ImageMetadata }>('../assets/slider/*.jpg', { eager: true });

export function photo(key: string): ImageMetadata {
  const hit = photos[`../assets/img/${key}.jpg`];
  if (!hit) throw new Error(`Unknown photo: ${key}`);
  return hit.default;
}

export function sliderPair(key: string): { before: ImageMetadata; after: ImageMetadata } {
  const before = sliders[`../assets/slider/${key}-before.jpg`];
  const after = sliders[`../assets/slider/${key}-after.jpg`];
  if (!before || !after) throw new Error(`Unknown before/after pair: ${key}`);
  return { before: before.default, after: after.default };
}
