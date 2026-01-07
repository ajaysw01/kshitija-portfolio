# Kshitija Dabhade — Graphite Sketch Portfolio

> **A professional portfolio website, crafted with care and gifted to Kshitija for her birthday.**

This is a minimal, gallery-first portfolio for Kshitija Dabhade, a talented graphite sketch artist. The site features a strict black/white/grey palette, elegant motion, and strong accessibility. All artworks are original graphite sketches.

## ✨ Features

- **Gallery-first layout** — Responsive grid (4/2/1 columns)
- **Artwork cards** — Lazy-loaded images for fast performance
- **Fullscreen lightbox** — Keyboard navigation, focus trap, and accessibility
- **Simple navigation** — Home, Gallery, About, Contact (hash-based, no extra libraries)
- **Modern stack** — React, Vite, Tailwind CSS, Framer Motion
- **SEO optimized** — Title, meta description, OG tags
- **Accessible** — Alt text, keyboard support, focus management
- **Easy to update** — Add new artworks via a single JSON file

## 🗂️ Project Structure

```
src/
  assets/
    images/           # All artwork images
  components/
    Navbar.jsx
    Footer.jsx
    GalleryGrid.jsx
    ArtworkCard.jsx
    ArtworkModal.jsx
  data/
    artworks.json     # All artwork metadata
  pages/
    Home.jsx
    Gallery.jsx
    About.jsx
    Contact.jsx
  App.jsx
```

## 🖼️ Adding New Artworks

To add a new sketch:

1. Place your image in `src/assets/images/` (e.g. `art7.jpg`).
2. Add an entry to `src/data/artworks.json`:

   ```json
   {
     "id": 7,
     "title": "New Portrait",
     "year": "2026",
     "medium": "Graphite Sketch",
     "image": "/assets/images/art7.jpg",
     "alt": "Description of the sketch"
   }
   ```

## 🚀 Development

```bash
npm install
npm run dev
```

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 🌐 Deployment

### Vercel

- Import the repo in Vercel
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

### Netlify

- New site from Git
- Build command: `npm run build`
- Publish directory: `dist`

## 🔍 SEO & Open Graph

- Base meta tags are in `index.html`.
- Each page sets its own `document.title` and meta description.
- For per-artwork OG images, generate static images and reference in `index.html` or a head manager if needed.

## ♿ Accessibility

- Each artwork includes descriptive `alt` text.
- Modal uses `role="dialog"`, traps focus, supports Esc/Left/Right.
- Focus returns to the trigger on close.

## ✅ QA Checklist

- Gallery shows correct grid on mobile (1 col), tablet (2), desktop (4)
- Clicking artwork opens modal with image and metadata
- Keyboard works: Esc closes, arrows navigate
- No UI colors beyond black/white/grey
- No search or filter bar in gallery (all graphite sketches)
- Lighthouse: Performance ≥ 80, Accessibility ≥ 90

## 📝 Commit Style

Use small, focused commits. Example:

- `feat(gallery): add responsive GalleryGrid`
- `chore: add artworks.json`
- `feat(modal): artwork lightbox with keyboard nav`

---

### 🎁 Made with love and gifted to Kshitija — Happy Birthday!
