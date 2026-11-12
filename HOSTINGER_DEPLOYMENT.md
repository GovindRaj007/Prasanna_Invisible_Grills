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

## What the build does

`npm run build` runs three steps:

1. `vite build` – client bundle in `dist/` (copies `public/`: `.htaccess`, `robots.txt`,
   images, OG images, IndexNow key file).
2. `vite build --ssr src/entry-server.tsx` – a temporary server bundle in `dist-server/`.
3. `node scripts/prerender.mjs` – renders **every route to static HTML** so crawlers
   (Google, Bing, ChatGPT/Claude/Perplexity bots) get the full content, title,
   description, canonical and JSON-LD without running JavaScript:
   - `dist/index.html`, `dist/about.html`, `dist/invisible-grills-hyderabad.html`, … (108 pages)
   - `dist/404.html` (noindex)
   - `dist/sitemap.xml` + `dist/sitemap-index.xml` (lastmod from git history)
   - `dist/llms.txt` (AI-assistant summary of the business, branches and pages)
   - The build **fails** if any page loses its H1, title, description or canonical.

In the browser the prerendered HTML is hydrated by React (`hydrateRoot`), so the site
still behaves as a single-page app after the first load.

## Single source of truth

- Phones, email, hours, branches (addresses + coordinates): `src/config/business.ts`
- Services and service-area locations: `src/config/seo.constants.ts`
- Routes (router, prerender, sitemap, llms.txt): `src/routes.ts`
- JSON-LD builders: `src/lib/schema.ts`

Adding a city: add it to `LOCATIONS`, create the five `src/pages/locations/<Service><City>.tsx`
files, and it is automatically routed, prerendered, linked and added to the sitemap.

## Server configuration — `public/.htaccess`

- HTTPS + non-www (301), `/index.html` → `/`, `/page.html` → `/page`, `/page/` → `/page`
- `/page` is served from the prerendered `page.html`
- Unknown URLs return a real **404** with `404.html` (no soft 404s)
- Compression, cache headers and security headers

## Images

Source images in `src/assets` are WebP (hero images also have a `-sm.webp` mobile
variant used via `srcset`). OG images in `public/og-images` are 1200×630 JPEGs under ~150 KB.

## After each deployment

- Search Console: submit `https://prasannainvisible.in/sitemap.xml` (remove old sitemap
  entries such as `sitemap-static.xml` / `sitemap-services-locations.xml` / `sitemap-images.xml`).
- Bing / ChatGPT search / Copilot: run `npm run indexnow` once the deploy is live to push
  all URLs to IndexNow. Also verify the site in Bing Webmaster Tools (import from Search Console).
