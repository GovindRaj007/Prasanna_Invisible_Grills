#!/usr/bin/env node
/**
 * Post-build static generation (runs after `vite build` + `vite build --ssr`).
 *
 *  1. Prerenders every route to dist/<route>.html (home -> dist/index.html) with its
 *     own <title>, meta description, canonical, Open Graph and JSON-LD in the HTML.
 *  2. Writes dist/404.html (noindex) – served with a real 404 status by .htaccess.
 *  3. Generates dist/sitemap.xml (+ sitemap-index.xml) with git-based <lastmod>.
 *  4. Generates dist/llms.txt for AI assistants / answer engines.
 *  5. Validates every page (one H1, one canonical, title, description) and fails the
 *     build on SEO regressions.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, process.env.PRERENDER_OUT || "dist");
const serverEntry = path.join(root, "dist-server", "entry-server.js");

const mod = await import(pathToFileURL(serverEntry).href);
const { render, ALL_ROUTES, SERVICES, LOCATIONS, BRANCHES, BUSINESS, PHONES, SITE_URL, branchFullAddress } = mod;

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
  throw new Error("dist/index.html is missing <!--app-head--> / <!--app-html--> placeholders");
}

const toFile = (route) => (route === "/" ? "index.html" : `${route.replace(/^\//, "")}.html`);
const absUrl = (route) => (route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`);

function inject({ head, html }) {
  return template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
}

// ---------------------------------------------------------------------------
// lastmod from git history of the files that make up each page
// ---------------------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const gitAvailable = (() => {
  try {
    execFileSync("git", ["rev-parse", "--is-inside-work-tree"], { cwd: root, stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
})();

function lastModified(files) {
  if (!gitAvailable) return today;
  try {
    const dirty = execFileSync("git", ["status", "--porcelain", "--", ...files], { cwd: root }).toString().trim();
    if (dirty) return today;
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], { cwd: root }).toString().trim();
    return iso ? iso.slice(0, 10) : today;
  } catch {
    return today;
  }
}

const pascal = (route) =>
  route.replace(/^\//, "").split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");

const SHARED = ["src/config/business.ts", "src/components/layout/Footer.tsx"];
function sourceFiles(route) {
  if (route === "/") return ["src/pages/Index.tsx", "src/components/home", ...SHARED];
  if (route === "/about") return ["src/pages/About.tsx", ...SHARED];
  if (route === "/contact") return ["src/pages/Contact.tsx", ...SHARED];
  if (SERVICES.some((s) => `/${s.slug}` === route)) {
    const name = pascal(route);
    return [`src/pages/services/${name}.tsx`, `src/components/faq/${name}FAQ.tsx`, ...SHARED];
  }
  return [
    `src/pages/locations/${pascal(route)}.tsx`,
    "src/pages/locations/ServiceLocationPage.tsx",
    "src/config/seo.constants.ts",
    ...SHARED,
  ];
}

// ---------------------------------------------------------------------------
// Render + validate
// ---------------------------------------------------------------------------
const problems = [];
const pages = [];

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

function validate(route, out, { expectIndex }) {
  const count = (re) => (out.match(re) || []).length;
  const h1 = count(/<h1[\s>]/g);
  const canon = count(/rel="canonical"/g);
  const title = decode((out.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || "");
  const desc = decode((out.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/) || [])[1] || "");
  const noindex = /<meta[^>]*name="robots"[^>]*content="noindex/.test(out);
  if (h1 !== 1) problems.push(`${route}: expected 1 <h1>, found ${h1}`);
  if (!title) problems.push(`${route}: missing <title>`);
  if (!desc) problems.push(`${route}: missing meta description`);
  if (expectIndex) {
    if (canon !== 1) problems.push(`${route}: expected 1 canonical, found ${canon}`);
    if (noindex) problems.push(`${route}: indexable page rendered noindex (route not matched?)`);
    const canonHref = (out.match(/rel="canonical"[^>]*href="([^"]+)"|href="([^"]+)"[^>]*rel="canonical"/) || []).slice(1).find(Boolean);
    if (canonHref && canonHref !== absUrl(route)) problems.push(`${route}: canonical points to ${canonHref}`);
  }
  if (title.length > 70) problems.push(`${route}: title is ${title.length} chars: "${title}"`);
  if (desc.length > 165)problems.push(`${route}: description is ${desc.length} chars`);
  return { title, desc };
}

for (const route of ALL_ROUTES) {
  const result = await render(route);
  const out = inject(result);
  const meta = validate(route, out, { expectIndex: true });
  fs.writeFileSync(path.join(dist, toFile(route)), out);
  pages.push({ route, ...meta, lastmod: lastModified(sourceFiles(route)) });
}

{
  const out = inject(await render("/__not-found__"));
  validate("/404", out, { expectIndex: false });
  if (!/noindex/.test(out)) problems.push("/404: missing noindex");
  fs.writeFileSync(path.join(dist, "404.html"), out);
}

// ---------------------------------------------------------------------------
// sitemap.xml
// ---------------------------------------------------------------------------
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]);

function ogImageFor(route) {
  const svc = [...SERVICES].sort((a, b) => b.slug.length - a.slug.length).find((s) => route === `/${s.slug}` || route.startsWith(`/${s.slug}-`));
  return svc ? svc.ogImage : "/og-images/prasanna-invisible-grills-og.jpg";
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map(
    (p) => `  <url>
    <loc>${esc(absUrl(p.route))}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <image:image>
      <image:loc>${esc(SITE_URL + ogImageFor(p.route))}</image:loc>
    </image:image>
  </url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

const newest = pages.map((p) => p.lastmod).sort().at(-1);
fs.writeFileSync(
  path.join(dist, "sitemap-index.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${newest}</lastmod>
  </sitemap>
</sitemapindex>
`
);

// ---------------------------------------------------------------------------
// llms.txt  (https://llmstxt.org) – concise, factual site map for AI assistants
// ---------------------------------------------------------------------------
const byState = (state) => LOCATIONS.filter((l) => l.state === state);
const cityLine = (l) =>
  `- ${l.parentCity ? `${l.city} (${l.parentCity})` : l.city}: ` +
  SERVICES.map((s) => `[${s.seoName}](${SITE_URL}/${s.slug}-${l.slug})`).join(" · ");

const llms = `# ${BUSINESS.name}

> ${BUSINESS.description}

## Key facts

- Business: ${BUSINESS.name} (also known as ${BUSINESS.alternateName.join(", ")}), operating since ${BUSINESS.foundingYear}, ${BUSINESS.installations} installations completed
- Phone: ${PHONES.primary.display} (primary), ${PHONES.secondary.display} (secondary); WhatsApp ${PHONES.primary.display}
- Email: ${BUSINESS.email}
- Hours (all branches): ${BUSINESS.hours.label}
- Website: ${SITE_URL}/
- Material: SS316 marine-grade stainless steel cables (2 mm / 3 mm), 2–3 inch spacing, powder-coated aluminium tracks
- Warranty: 10 years on invisible grills; 5 years on ceiling cloth hangers
- Free site visit, measurement and written quote

## Branches

${BRANCHES.map((b) => `- ${b.city} – ${b.area}: ${branchFullAddress(b)} (${b.latitude}, ${b.longitude})`).join("\n")}

## Services

${SERVICES.map((s) => `- [${s.name}](${SITE_URL}/${s.slug}): ${s.summary}`).join("\n")}

## Service areas – Telangana

${byState("Telangana").map(cityLine).join("\n")}

## Service areas – Andhra Pradesh

${byState("Andhra Pradesh").map(cityLine).join("\n")}

## Company

- [About ${BUSINESS.name}](${SITE_URL}/about)
- [Contact, branches and directions](${SITE_URL}/contact)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;
fs.writeFileSync(path.join(dist, "llms.txt"), llms);

// ---------------------------------------------------------------------------
fs.rmSync(path.join(root, "dist-server"), { recursive: true, force: true });

console.log(`Prerendered ${pages.length} pages + 404.html, sitemap.xml (${pages.length} URLs), llms.txt`);
if (problems.length) {
  console.error(`\nSEO validation failed (${problems.length}):\n - ` + problems.join("\n - "));
  process.exit(1);
}
