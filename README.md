# Monochrome Artist Portfolio (React + Vite + Tailwind)

Minimal, gallery-first portfolio for a female sketch artist. Strict black/white/grey palette, subtle motion, and strong accessibility.

## Features

- Gallery-first layout with responsive grid (4/2/1 columns)
- Artwork cards with lazy-loaded responsive images (`webp` + `jpg` fallback)
- Fullscreen lightbox modal with keyboard navigation and focus trap
- Hash-based routing (Home, Gallery, About, Contact) without extra libs
- Tailwind CSS for spacing/typography; Framer Motion for subtle animations
- Local JSON data source: `src/data/artworks.json`
- SEO basics: title, meta description, OG tags

## Structure

```
src/
	assets/
		images/               # store responsive variants: name-480.webp/jpg, -1024, -2048
	components/
		Navbar.jsx
		Footer.jsx
		GalleryGrid.jsx
		ArtworkCard.jsx
		ArtworkModal.jsx
	data/
		artworks.json
	pages/
		Home.jsx
		Gallery.jsx
		About.jsx
		Contact.jsx
	App.jsx
```

## Add Artworks

Edit `src/data/artworks.json` and add items like:

```
{
	"id": 6,
	"title": "Untitled Study",
	"year": "2024",
	"medium": "Graphite on paper",
	"image": "/assets/images/art6",
	"alt": "Close-up graphite sketch of a face"
}
```

Place responsive images in `src/assets/images/` using this pattern:

- `art6-480.webp`, `art6-1024.webp`, `art6-2048.webp`
- `art6-480.jpg`, `art6-1024.jpg`, `art6-2048.jpg`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

### Vercel

- Import the repo in Vercel
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

### Netlify

- New site from Git
- Build command: `npm run build`
- Publish directory: `dist`

## SEO & OG

- Base meta tags are in `index.html`.
- Pages set `document.title` and meta description on mount.
- For per-artwork OG images, generate static images and reference in `index.html` or a head manager if later added.

## Accessibility

- Each artwork includes `alt` text from JSON.
- Modal uses `role="dialog"`, traps focus, supports Esc/Left/Right.
- Focus returns to the trigger on close.

## QA Checklist

- Gallery shows correct grid on mobile (1 col), tablet (2), desktop (4).
- Clicking artwork opens modal with image and metadata.
- Keyboard works: Esc closes, arrows navigate.
- No UI colors beyond black/white/grey.
- Lighthouse: Performance ≥ 80, Accessibility ≥ 90.

## Commit Style

Use small focused commits, e.g.:

- `feat(gallery): add responsive GalleryGrid`
- `chore: add artworks.json`
- `feat(modal): artwork lightbox with keyboard nav`
