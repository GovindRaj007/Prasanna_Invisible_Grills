# Hostinger Deployment (GitHub)

The site is deployed by importing this GitHub repository into Hostinger.
Hostinger runs the build on every push to `master` and publishes `dist/`.

## Hostinger settings

| Setting           | Value           |
| ----------------- | --------------- |
| Framework         | Vite            |
| Branch            | `master`        |
| Node.js version   | 22.x (see `.nvmrc`; minimum 20.19) |
| Install command   | `npm install`   |
| Build command     | `npm run build` |
| Output directory  | `dist`          |

Optional environment variable: `SITE_URL` (defaults to `https://prasannainvisible.in`).

## What the build does

1. `scripts/generate-sitemaps-enhanced.js` regenerates all sitemaps in `public/`
   with today's `lastmod` (they are git-ignored, so they're always fresh).
2. `vite build` bundles the app and copies `public/` (incl. `.htaccess`,
   `robots.txt`, sitemaps, images) into `dist/`.

## Server configuration — `public/.htaccess`

Handles HTTPS + non-www redirects, `/index.html` → `/`, SPA routing
(all routes → `index.html`), compression, cache headers and security headers.

## Images

Optimized images in `public/optimized-images/` are committed. After adding or
changing images in `public/og-images` or `public/images`, run locally and commit:

```bash
npm run build:images
```

## After first deployment

- Enable SSL for the domain in hPanel.
- Submit `https://prasannainvisible.in/sitemap-index.xml` in Google Search Console.
