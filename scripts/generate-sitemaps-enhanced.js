#!/usr/bin/env node

/**
 * Enterprise-Grade Sitemap Generator
 * Generates 3 optimized sitemaps: static pages, services+locations, images
 * Follows Google Sitemap Protocol with image metadata
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.SITE_URL || 'https://prasannainvisible.in';

/**
 * Data matching seo.constants.ts
 */
const SERVICES = [
  { slug: 'invisible-grills', priority: '0.95', changefreq: 'weekly' },
  { slug: 'invisible-grills-balcony', priority: '0.90', changefreq: 'weekly' },
  { slug: 'invisible-grills-windows', priority: '0.90', changefreq: 'weekly' },
  { slug: 'ceiling-cloth-hanger', priority: '0.85', changefreq: 'monthly' },
  { slug: 'invisible-grills-dealer', priority: '0.80', changefreq: 'monthly' },
];

const LOCATIONS = [
  { city: 'Visakhapatnam', slug: 'visakhapatnam', priority: '0.95' },
  { city: 'Rajahmundry', slug: 'rajahmundry', priority: '0.90' },
  { city: 'Vijayawada', slug: 'vijayawada', priority: '0.90' },
  { city: 'Guntur', slug: 'guntur', priority: '0.85' },
  { city: 'Tirupati', slug: 'tirupati', priority: '0.85' },
  { city: 'Anantapur', slug: 'anantapur', priority: '0.80' },
  { city: 'Hyderabad', slug: 'hyderabad', priority: '0.95' },
  { city: 'Secunderabad', slug: 'secunderabad', priority: '0.90' },
  { city: 'Gachibowli', slug: 'gachibowli', priority: '0.88' },
  { city: 'Kukatpally', slug: 'kukatpally', priority: '0.85' },
  { city: 'Madhapur', slug: 'madhapur', priority: '0.85' },
  { city: 'Shamshabad', slug: 'shamshabad', priority: '0.80' },
  { city: 'Kompally', slug: 'kompally', priority: '0.78' },
  { city: 'Miyapur', slug: 'miyapur', priority: '0.78' },
  { city: 'Medchal', slug: 'medchal', priority: '0.75' },
  { city: 'Kondapur', slug: 'kondapur', priority: '0.75' },
  { city: 'Kokapet', slug: 'kokapet', priority: '0.75' },
  { city: 'Tellapur', slug: 'tellapur', priority: '0.72' },
  { city: 'Mahbubnagar', slug: 'mahbubnagar', priority: '0.70' },
  { city: 'Warangal', slug: 'warangal', priority: '0.70' },
];

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/contact', priority: '0.9', changefreq: 'daily' },
  { path: '/invisible-grills', priority: '0.95', changefreq: 'weekly' },
  { path: '/invisible-grills-balcony', priority: '0.90', changefreq: 'weekly' },
  { path: '/invisible-grills-windows', priority: '0.90', changefreq: 'weekly' },
  { path: '/ceiling-cloth-hanger', priority: '0.85', changefreq: 'monthly' },
  { path: '/invisible-grills-dealer', priority: '0.80', changefreq: 'monthly' },
];

const OG_IMAGES = [
  { path: '/og-images/prasanna-invisible-grills-og.jpg', title: 'Prasanna Invisible Grills' },
  { path: '/og-images/invisible-grills-og.jpg', title: 'Invisible Grills Service' },
  { path: '/og-images/balcony-invisible-grills-og.jpg', title: 'Balcony Invisible Grills' },
  { path: '/og-images/window-invisible-grills-og.jpg', title: 'Window Invisible Grills' },
  { path: '/og-images/ceiling-cloth-hanger-og.jpg', title: 'Ceiling Cloth Hanger' },
  { path: '/og-images/invisible-grills-dealer-og.jpg', title: 'Invisible Grills Dealer' },
];

/**
 * Escape XML special characters
 */
function escapeXml(str) {
  return String(str).replace(/[&<>"']/g, (char) => {
    const chars = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };
    return chars[char] || char;
  });
}

/**
 * Generate XML URL entry
 */
function generateUrlEntry(loc, priority, changefreq, lastmod = null, images = []) {
  const lastModDate = lastmod || new Date().toISOString().split('T')[0];

  let imageXml = '';
  if (images.length > 0) {
    imageXml = images.map((img) => `
      <image:image>
        <image:loc>${escapeXml(img.url)}</image:loc>
        <image:title>${escapeXml(img.title)}</image:title>
        <image:caption>${escapeXml(img.caption || '')}</image:caption>
      </image:image>`).join('');
  }

  return `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageXml ? `${imageXml}\n  ` : ''}
  </url>`;
}

/**
 * Generate Sitemap 1: Static Pages + Services
 */
function generateStaticPagesSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Add static pages
  STATIC_PAGES.forEach((page) => {
    const imageUrl = page.path === '/' ? `${BASE_URL}/og-images/prasanna-invisible-grills-og.jpg` : null;
    const images = imageUrl ? [{ url: imageUrl, title: 'Prasanna Invisible Grills', caption: 'Premium invisible grills and safety solutions' }] : [];
    xml += generateUrlEntry(`${BASE_URL}${page.path}`, page.priority, page.changefreq, null, images);
  });

  xml += '\n</urlset>';
  return xml;
}

/**
 * Generate Sitemap 2: Services + Locations (500 URLs)
 */
function generateServicesLocationsSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  const urlCount = {};
  let totalUrls = 0;

  // Generate all service+location combinations
  SERVICES.forEach((service) => {
    LOCATIONS.forEach((location) => {
      if (totalUrls >= 49900) return; // Sitemap limit is 50,000 but we stay under

      const path = `/${service.slug}-${location.slug}`;
      const priority = Math.min(
        parseFloat(service.priority),
        parseFloat(location.priority)
      ).toFixed(2);

      xml += generateUrlEntry(`${BASE_URL}${path}`, priority, 'weekly');
      totalUrls++;
      urlCount[service.slug] = (urlCount[service.slug] || 0) + 1;
    });
  });

  xml += '\n</urlset>';
  return { xml, totalUrls, urlCount };
}

/**
 * Generate Sitemap 3: Images (all OG images)
 */
function generateImagesSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Homepage with all OG images
  let homeImages = OG_IMAGES.map((img) => ({
    url: `${BASE_URL}${img.path}`,
    title: img.title,
    caption: 'Premium invisible grills and safety solutions',
  }));

  xml += generateUrlEntry(`${BASE_URL}/`, '1.0', 'weekly', null, homeImages);

  // Service pages with relevant images
  SERVICES.forEach((service) => {
    let serviceImage = OG_IMAGES.find((img) => img.path.includes(service.slug));
    if (!serviceImage) {
      serviceImage = OG_IMAGES[0]; // Fallback to main image
    }

    xml += generateUrlEntry(
      `${BASE_URL}/${service.slug}`,
      service.priority,
      'weekly',
      null,
      [{ url: `${BASE_URL}${serviceImage.path}`, title: serviceImage.title, caption: `${serviceImage.title} - Professional Installation` }]
    );
  });

  xml += '\n</urlset>';
  return xml;
}

/**
 * Generate Sitemap Index
 */
function generateSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-static.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-services-locations.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-images.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;
}

/**
 * Generate legacy sitemap.xml for backward compatibility
 */
function generateLegacySitemap() {
  const staticXml = generateStaticPagesSitemap();
  const { xml: servicesXml } = generateServicesLocationsSitemap();
  const imagesXml = generateImagesSitemap();

  // Merge into single sitemap
  const combined = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticXml.split('</urlset>')[0].split('<urlset')[1].split('>')[1]}
${servicesXml.split('</urlset>')[0].split('<urlset')[1].split('>')[1]}
${imagesXml.split('</urlset>')[0].split('<urlset')[1].split('>')[1]}
</urlset>`;

  return combined;
}

/**
 * Write sitemaps to disk
 */
function writeSitemaps() {
  const publicDir = path.join(__dirname, '../public');

  // Sitemap 1: Static pages
  const staticXml = generateStaticPagesSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-static.xml'), staticXml);

  // Sitemap 2: Services + Locations
  const { xml: servicesXml, totalUrls, urlCount } = generateServicesLocationsSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-services-locations.xml'), servicesXml);

  // Sitemap 3: Images
  const imagesXml = generateImagesSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-images.xml'), imagesXml);

  // Sitemap Index
  const sitemapIndex = generateSitemapIndex();
  fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);

  // Legacy sitemap.xml for backward compatibility
  const legacySitemap = generateLegacySitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), legacySitemap);

  console.log('\n✅ Sitemaps generated successfully!\n');
  console.log('📊 Sitemap Statistics:');
  console.log(`   Static Pages: ${STATIC_PAGES.length} URLs`);
  console.log(`   Services + Locations: ${totalUrls} URLs`);
  console.log(`   Total: ${STATIC_PAGES.length + totalUrls} URLs`);
  console.log('\n📂 Generated Files:');
  console.log(`   ✓ sitemap-static.xml (${STATIC_PAGES.length} pages)`);
  console.log(`   ✓ sitemap-services-locations.xml (${totalUrls} combinations)`);
  console.log(`   ✓ sitemap-images.xml (${OG_IMAGES.length} images)`);
  console.log(`   ✓ sitemap-index.xml (main index)`);
  console.log(`   ✓ sitemap.xml (legacy - backward compatibility)\n`);

  console.log('🌐 Base URL:', BASE_URL);
  console.log('\n📈 Services breakdown:');
  Object.entries(urlCount).forEach(([service, count]) => {
    console.log(`   ${service}: ${count} locations`);
  });

  console.log('\n✨ Best Practices Applied:');
  console.log('   ✓ Priority hierarchy based on business value');
  console.log('   ✓ Image metadata for social preview optimization');
  console.log('   ✓ Proper changefreq hints for crawler scheduling');
  console.log('   ✓ XML special characters properly escaped');
  console.log('   ✓ Sitemaps under 50MB and 50k URLs limit');
  console.log('   ✓ Sitemap index for multiple sitemaps');
  console.log('   ✓ Backward compatibility with legacy sitemap.xml\n');
}

// Execute
try {
  writeSitemaps();
} catch (error) {
  console.error('❌ Error generating sitemaps:', error);
  process.exit(1);
}
