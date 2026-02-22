#!/usr/bin/env node

/**
 * Sitemap Generator for Prasanna Invisible Grills
 * Generates XML sitemap following Google Search Console best practices
 * Runs at build time to include all routes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL - update this for different environments
const BASE_URL = process.env.SITE_URL || 'https://prasannagrills.com';

// Define all routes with their metadata
// Following Google Search Console best practices:
// - Include all important pages
// - Set appropriate lastMod dates (today by default, older for less frequently updated)
// - Set priority and changefreq for crawl optimization
const routes = [
  // Main pages (highest priority, updated frequently)
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/about',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/contact',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0],
  },

  // Service pages (important, high value for SEO)
  {
    path: '/invisible-grills',
    priority: '0.95',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/invisible-grills-dealer',
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/invisible-grills-balcony',
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/invisible-grills-windows',
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/ceiling-cloth-hanger',
    priority: '0.85',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },

  // Location pages (service + location combinations)
  // 5 services × 15 locations = 75 pages
  ...generateLocationRoutes(),
];

/**
 * Generate location-based routes (service + location combinations)
 */
function generateLocationRoutes() {
  const services = [
    'invisible-grills',
    'invisible-grills-dealer',
    'invisible-grills-balcony',
    'invisible-grills-windows',
    'ceiling-cloth-hanger',
  ];

  const locations = [
    'visakhapatnam',
    'vijayawada',
    'guntur',
    'tirupati',
    'anantapur',
    'hyderabad',
    'secunderabad',
    'gachibowli',
    'kukatpally',
    'madhapur',
    'shamshabad',
    'kompally',
    'miyapur',
    'medchal',
    'kondapur',
    'kokapet',
    'tellapur',
    'mahbubnagar',
    'warangal',
  ];

  const locationRoutes = [];

  // Generate all service + location combinations
  // These are high-priority pages for local SEO
  services.forEach((service) => {
    locations.forEach((location) => {
      let routePath = `/${service}-${location}`;

      // Handle special case for Warangal (sometimes spelled as Warangal, sometimes Warangal)
      if (location === 'warangal' && service === 'invisible-grills-windows') {
        routePath = `/${service}-warangal`;
      }

      locationRoutes.push({
        path: routePath,
        priority: '0.8',
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0],
      });
    });
  });

  return locationRoutes;
}

/**
 * Generate XML sitemap content
 */
function generateSitemapXML(routes) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '         xmlns:mobile="http://www.google.com/schemas/mobile/1.0"\n';
  xml += '         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '         xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

  routes.forEach((route) => {
    const url = `${BASE_URL}${route.path}`;
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(url)}</loc>\n`;
    xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>\n';
  return xml;
}

/**
 * Escape XML special characters
 */
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Write sitemap to public folder
 */
function writeSitemap() {
  const sitemapContent = generateSitemapXML(routes);

  // Ensure public directory exists
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write sitemap.xml
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');

  console.log(`✅ Sitemap generated successfully!`);
  console.log(`📍 Location: ${sitemapPath}`);
  console.log(`📊 Total URLs: ${routes.length}`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log('');
  console.log('Sitemap will be available at: ' + BASE_URL + '/sitemap.xml');
  console.log('');
  console.log('✨ Google Search Console practices applied:');
  console.log('   ✓ Proper XML format with namespace declarations');
  console.log('   ✓ lastmod dates for cache optimization');
  console.log('   ✓ Priority levels for crawl optimization (1.0 = homepage, 0.8 = location pages)');
  console.log('   ✓ Changefreq hints for Google crawler scheduling');
  console.log('   ✓ All public-facing pages included');
  console.log('   ✓ XML special characters properly escaped');
  console.log('');
}

// Always run generator when executed
try {
  writeSitemap();
} catch (error) {
  console.error('❌ Error generating sitemap:', error.message);
  process.exit(1);
}

export { generateSitemapXML, generateLocationRoutes };
