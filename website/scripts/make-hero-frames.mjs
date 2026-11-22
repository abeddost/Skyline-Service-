// Builds the image sequences for the scroll hero from the source clips.
//
//   node scripts/make-hero-frames.mjs                 all clips listed below
//   node scripts/make-hero-frames.mjs umzug           only one
//
// For each clip it writes
//   public/assets/hero/<key>-desktop/001.webp ...     (frames the hero scrubs through)
//   public/assets/hero/<key>-mobile/001.webp ...
//   src/assets/hero/<key>-<desktop|mobile>-<start|end>.jpg   (first paint and fallback stills)
//
// Needs ffmpeg on the PATH. The frame count printed at the end must match
// FRAMES in src/components/HeroMedia.astro.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const SOURCES = resolve(import.meta.dirname, '../../skyline-hero-videos');
const clips = {
  buero: { desktop: '1-buero-desktop-16x9.mp4', mobile: '1-buero-mobile-9x16.mp4' },
  treppenhaus: { desktop: '2-treppenhaus-desktop-16x9.mp4', mobile: '2-treppenhaus-mobile-9x16.mp4' },
  entruempelung: { desktop: '3-entruempelung-desktop-16x9.mp4', mobile: '3-entruempelung-mobile-9x16.mp4' },
  umzug: { desktop: '4-umzug-desktop-16x9.mp4', mobile: '4-umzug-mobile-9x16.mp4' },
};
// Every 4th frame of a 24 fps, 10 s clip gives 61 frames. The hero blends
// between neighbouring frames, so this is enough for a smooth scrub.
const EVERY = Number(process.env.EVERY ?? 4);
const variants = {
  desktop: { width: Number(process.env.DW ?? 1280), quality: Number(process.env.DQ ?? 48) },
  mobile: { width: Number(process.env.MW ?? 540), quality: Number(process.env.MQ ?? 46) },
};
const OUT = process.env.OUT ? resolve(process.env.OUT) : resolve(import.meta.dirname, '../public/assets/hero');
const STILLS = resolve(import.meta.dirname, '../src/assets/hero');

const only = process.argv.slice(2);
for (const [key, files] of Object.entries(clips)) {
  if (only.length && !only.includes(key)) continue;
  for (const [variant, { width, quality }] of Object.entries(variants)) {
    const src = join(SOURCES, files[variant]);
    const tmp = mkdtempSync(join(tmpdir(), 'hero-frames-'));
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', src, '-vf', `select='not(mod(n\\,${EVERY}))'`, '-fps_mode', 'vfr', join(tmp, '%03d.png')]);
    const frames = readdirSync(tmp).sort();
    const dir = join(OUT, `${key}-${variant}`);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    let bytes = 0;
    for (const f of frames) {
      const out = join(dir, f.replace('.png', '.webp'));
      await sharp(join(tmp, f)).resize({ width }).webp({ quality, effort: 6 }).toFile(out);
      bytes += statSync(out).size;
    }
    if (!process.env.OUT) {
      mkdirSync(STILLS, { recursive: true });
      await sharp(join(tmp, frames[0])).jpeg({ quality: 92 }).toFile(join(STILLS, `${key}-${variant}-start.jpg`));
      await sharp(join(tmp, frames.at(-1))).jpeg({ quality: 92 }).toFile(join(STILLS, `${key}-${variant}-end.jpg`));
    }
    rmSync(tmp, { recursive: true, force: true });
    console.log(`${key}-${variant}: ${frames.length} frames, ${width}px wide, ${(bytes / 1024 / 1024).toFixed(2)} MB`);
  }
}
