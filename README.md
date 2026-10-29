# Orbit Nine — React landing page

Built with React 19 + Vite. Pixel-matched to the `Desktop - 3` design at 1440px, responsive down to 320px.

## Run
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build
```

## Structure
- `src/App.jsx` — page composition (14 sections)
- `src/components/Header.jsx` — fixed glass nav, mobile burger menu
- `src/components/Sections1-3.jsx` — all sections, content kept in data arrays at the top of each section
- `src/components/ui.jsx` — Button, Eyebrow, Accent, Icon, Arrow
- `src/styles.css` — design tokens (`:root`) + section styles; breakpoints at 1380 / 1180 / 960 / 760px
- `src/assets/` — photography and icons exported from the design at 2x (WebP/PNG)

## Notes
- Photography and icons were extracted from the supplied design PNG (text removed from backgrounds).
  Swap in original source photos/SVGs when available for maximum sharpness — keep the same file names.
- Icons are rendered with `mix-blend-mode: screen` so their glow sits naturally on dark surfaces.
- Font: Inter (self-hosted via `@fontsource/inter`).
