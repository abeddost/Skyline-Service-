# Mainstadt Reinigung & Gebäudeservice website

German website for Mainstadt Reinigung & Gebäudeservice Frankfurt, Inh. Rasheed Khodjazada (Frankfurt am Main; formerly Skyline Service): cleaning, moving and junk removal. Static site built with Astro, made to be hosted on Vercel.

## Run it

```bash
npm install
npm run dev       # local development, http://localhost:4321
npm run build     # writes the finished site to dist/
npm run preview   # serves dist/ locally
```

## Put it on Vercel

1. Import the project in Vercel and set **Root Directory** to `website`. Vercel detects Astro on its own.
2. Add the environment variable `SITE_URL` with the public address, for example `https://skyline-service.vercel.app`. Canonical links, the sitemap, `robots.txt` and share images are built from it. The planned domain is **mainstadt-reinigung.de**: once it is registered and connected in Vercel, set `SITE_URL` to `https://mainstadt-reinigung.de` and redeploy.
3. Redirect the old address `skyline-service.netlify.app` to the new one, because printed cards and flyers show it.

## Open points for the owner (TODO)

Nothing below is used on the site until it is confirmed.

- [ ] **WhatsApp:** confirm that 0176 80012487 is reachable on WhatsApp. Every enquiry button depends on it.
- [ ] **E-mail:** the site shows `afgrasheed301@gmail.com`. Change `business.email` in `src/config.ts` if another address should appear.
- [ ] **Service area:** which towns outside Frankfurt are served? Town pages (Offenbach, Eschborn, Bad Vilbel, Neu-Isenburg) are switched off until then (`flags.cityPages`).
- [ ] **Opening hours:** not shown and not in the structured data yet.
- [ ] **Weekend work:** the FAQ "Reinigen Sie auch am Wochenende?" is left out until answered.
- [ ] **How fast a quote arrives:** the FAQ "Wie schnell bekomme ich ein Angebot?" is left out until answered.
- [ ] **Autoaufbereitung:** registered as a trade but not on the flyer. Switched off (`flags.autoaufbereitung`); the page and its photo still have to be made.
- [ ] **Impressum:** add the USt-IdNr. or Wirtschafts-Identifikationsnummer if there is one.
- [ ] **Datenschutz and Impressum:** both are drafts that match what the site does. Have them checked, for example with the eRecht24 generator or by a lawyer.
- [ ] **Google Business Profile and Instagram:** add the links to `sameAs` in `src/lib/schema.ts` once they exist.
- [ ] **Map position:** add `geo` (latitude and longitude from Google Maps) in `src/lib/schema.ts`.
- [ ] **Real reviews:** the reviews section does not exist yet and must only ever show real Google reviews.
- [ ] **Real photos:** every photo, every before/after pair and every hero picture is AI-generated and labelled "Symbolbild". Replace them with real job photos when available, then set `flags.beforeAfterIsSymbolic` to `false`.
- [ ] **Scroll hero for Gebäudereinigung and Sonderreinigung:** these two pages still open with a photo. Once clips exist, add them as described under "Scroll hero" below.
- [ ] **Intro video (with sound, separate from the scroll hero):** not made yet. Put the files in `public/assets/video/` (`intro-16x9.mp4`, `intro-9x16.mp4`, `intro.vtt`, `intro-poster.webp`) and set `flags.introVideo` to `true`.
- [ ] **QR code in the footer:** left out until the final domain is known.

## How enquiries work

There is no contact form and no server. The Angebots-Konfigurator collects the answers in the browser and opens WhatsApp with a readable summary; the visitor sends it there. Answers are kept in the browser's local storage so they survive a page change. Phone and e-mail are shown as plain links.

## What is not on the site

- **No tracking and no cookies**, so there is no cookie banner. The click events (`click_call`, `click_whatsapp`, `form_start`, `form_step`, `generate_lead`) are already pushed to `window.dataLayer` if one exists. Before adding Google Analytics, Google Ads or the Meta Pixel, add a consent banner and extend the Datenschutzerklärung.
- **No animation libraries.** GSAP and Lenis were removed. All behaviour is in `src/scripts/` (about 10 KB of JavaScript in total).
- **Lighthouse has not been measured yet.** Run it in Chrome DevTools (Lighthouse tab, mobile) against the deployed site.

## Scroll hero

The homepage and four service pages (Büro, Treppenhaus, Umzug, Entrümpelung) open with a hero that fills the screen and stays pinned while the visitor scrolls. Scrolling moves the picture from "before" to "after"; a thin line at the bottom edge shows how far along it is. The source clips are in `../skyline-hero-videos/`. They are not played as video: each is cut into 61 still frames that the page draws on a canvas.

How it is kept from slowing the page down:

- The first thing a visitor gets is one small still image (20 to 60 KB), the first frame.
- The frames (about 1 MB per page on phones, 1.5 MB on desktop) are only fetched after the page has finished loading: every 8th frame first, then the ones in between. The hero blends neighbouring frames, so it already moves smoothly with the first few.
- Phones in portrait get the 9:16 set, everything else the 16:9 set.
- With reduced motion, data saver, a 2G connection or without JavaScript there is no pinned scrolling: visitors get a normal one-screen hero with the finished "after" picture.

To add or replace a clip, for example for Gebäudereinigung:

1. Put the two source files (16:9 and 9:16) in `../skyline-hero-videos/` and add them to the `clips` list at the top of `scripts/make-hero-frames.mjs` under a short key such as `gebaeude`.
2. Run `node scripts/make-hero-frames.mjs gebaeude` in the `website` folder (needs ffmpeg). It writes the frames to `public/assets/hero/gebaeude-desktop/` and `-mobile/` and the first and last frame to `src/assets/hero/`.
3. Add `video: 'gebaeude'` and a `videoAlt` text to that service in `src/data/services.ts`.

Files under `/assets/` are cached by browsers for 30 days (`vercel.json`). If a replaced clip has to show up immediately, use a new key.

## Look and layout

- **Colours and fonts** are set once at the top of `src/styles/global.css`: near-black backgrounds, off-white text, one accent colour, pill-shaped buttons. Headings use Saira, body text uses Manrope (both self-hosted). The look follows hf-autopflege.de, which the owner named as the reference.
- **One light section:** the comparison tables on the service pages sit on a light background (`section--light`), everything else is dark.
- **Page order:** every page starts with what it is about and the main action, then the content in order of importance. Service pages: hero, what is included, comparison table (where a service has options to compare), before/after, quote request, who it is for, then optional reading (details and questions) as accordions.
- **Before/after:** drag anywhere on the picture with mouse or finger, tap "Vorher" or "Nachher" to see one picture completely, or use the arrow keys. The homepage shows one comparison per service (three on phones, the rest behind "Alle 6 Vergleiche zeigen"); each links to its service page.
- **Phones:** a fixed bar at the bottom keeps "Anrufen", "WhatsApp" and "Angebot" one tap away on every page.
- The first Frankfurt scroll hero (image frames, script, gallery) is kept in `../_archive/old-frankfurt-hero/` and is not deployed.

## Accent colour

The accent (buttons, highlighted words, icons, the logo in header and footer) is one setting: the six `--accent…` lines at the top of `src/styles/global.css`. Change them and the whole site follows.

Four files carry the colour as fixed values and have to be changed by hand to match: `public/favicon.svg`, `public/assets/brand/logo.svg`, `public/assets/brand/logo-icon.svg` (three colour stops each) and the two pictures `public/apple-touch-icon.png` and `public/og-default.jpg`.

## Where things are

| What | Where |
|---|---|
| Name, address, phone, e-mail, feature switches | `src/config.ts` |
| Texts of the six service pages | `src/data/services.ts` |
| Homepage | `src/pages/index.astro` |
| Service page template | `src/pages/[slug].astro` |
| Quote configurator | `src/components/Configurator.astro`, `src/scripts/configurator.ts` |
| Homepage hero | `src/components/Hero.astro` |
| Hero of the other pages | `src/components/PageHero.astro` |
| Scroll hero (stills, frames, fallbacks) | `src/components/HeroMedia.astro`, `src/scripts/hero-scroll.ts`, `public/assets/hero/`, `src/assets/hero/` |
| Building hero frames from a clip | `scripts/make-hero-frames.mjs` |
| Before/after comparison | `src/components/BeforeAfter.astro`, behaviour in `src/scripts/site.ts` |
| Comparison tables on service pages | `compare` in `src/data/services.ts` |
| Colours, fonts, all styles | `src/styles/global.css` |
| Structured data (JSON-LD) | `src/lib/schema.ts` |
| Photos | `src/assets/img/`, before/after pairs in `src/assets/slider/` |
| Logo files | `public/assets/brand/`, `public/favicon.svg` |

Name, address and phone are read from `src/config.ts` everywhere (header, footer, Impressum, structured data), so they only ever need changing in one place.
