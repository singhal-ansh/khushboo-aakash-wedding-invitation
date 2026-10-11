# Khushboo & Aakash — Premium Wedding Website

A multi-page React + Tailwind CSS wedding experience with route transitions, scroll animations, cinematic imagery, a live countdown, bilingual English/Hindi UI, a gallery lightbox, a Google Maps venue page, and an optional ambient tone toggle. No RSVP form and no WhatsApp sharing.

## Pages
- `/` — cinematic welcome / landing experience
- `/invitation` — formal invitation letter
- `/celebrations` — full wedding itinerary and animated timeline
- `/gallery` — responsive gallery with image lightbox
- `/venue` — address, embedded Google Map, directions and copy address

## Run locally
Requires Node.js 18+.
```bash
npm install
npm run dev
```
Open the URL printed by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Customize before publishing
- Replace the sample Unsplash images with the couple's approved photos in `src/pages/Gallery.jsx`, `src/pages/Home.jsx`, and the CSS background URLs in `src/index.css`.
- The printed invitation doesn't specify a Doli time; it is deliberately shown as “Time to be confirmed.”
- English/Hindi switch is in the header. Some narrative copy is bilingual; event names and factual details remain in their original printed form where appropriate.
- The music control creates a soft ambient drone using Web Audio after the user taps it, avoiding autoplay issues. Replace it with properly licensed instrumental music if you prefer a real soundtrack.
- Venue address used: Emerald Greens, E-Block, Block D, Swarn Jayanti Puram, Govindpuram, Ghaziabad, Uttar Pradesh 201013.
- Fonts and sample photos load from Google Fonts and Unsplash, so internet access is required for those assets.

## Deploy
Push the project to GitHub and import the repository into Vercel. Vercel detects Vite automatically. The app uses client-side routes; for other static hosts, configure fallback rewrites to `index.html`.


## Cinematic opening (v2)
The site opens with a premium envelope, Khushboo weds Aakash, a live wedding countdown, and a tappable wax seal. Tapping the seal or the invitation button unfolds the envelope and swings open two ornate ceremonial gates before revealing the full multi-page website. The countdown is also present on the home page.

## v3 refresh
- Readable type scale (nothing under 11px), sticky header fixed, arch hero with a swaying marigold toran and falling petals.
- Hindi mode now covers every event, date and description (data lives in `src/data.js`).
- Opening envelope plays once per browser session; countdown logic is shared in `src/hooks.js`; app context lives in `src/context.js`.
- Gallery lightbox supports Esc and arrow keys; broken images no longer leave blank holes.
- Photos are still Unsplash samples: swap them in `Gallery.jsx`, `Home.jsx` hero and the CSS background URLs.
