/**
 * Dynamic Site URL Utility
 * Handles different deployment environments (Vercel, local, production)
 * Used for constructing SEO URLs, structured data, and metadata
 */

/**
 * Get the current site URL based on environment
 * Works correctly on:
 * - Vercel production deployments
 * - Vercel preview deployments  
 * - Local development
 * - Custom domains
 *
 * @returns {string} The base URL without trailing slash
 */
export function getSiteUrl(): string {
  // In browser environment
  if (typeof window !== "undefined") {
    const protocol = window.location.protocol;
    const host = window.location.host;
    return `${protocol}//${host}`;
  }

  // Server-side or fallback
  return "https://prasannainvisible.in";
}

/**
 * Get the full URL for a given path
 * @param {string} path - The path (e.g., '/invisible-grills', '/contact')
 * @returns {string} The full URL
 */
export function getFullUrl(path: string): string {
  const baseUrl = getSiteUrl();
  // Remove trailing slash from baseUrl and leading slash from path if needed
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Get the canonical URL for current page
 * @param {string} path - The current page path
 * @returns {string} The canonical URL
 */
export function getCanonicalUrl(path: string): string {
  return getFullUrl(path);
}

/**
 * Get the sitemap URL
 * @returns {string} The sitemap URL
 */
export function getSitemapUrl(): string {
  return `${getSiteUrl()}/sitemap.xml`;
}

/**
 * Get the OG image URL
 * @param {string} imagePath - The image path (e.g., 'prasanna-invisible-grills-og.jpg')
 * @returns {string} The full OG image URL
 */
export function getOgImageUrl(imagePath: string): string {
  return `${getSiteUrl()}/og-images/${imagePath}`;
}

/**
 * Get breadcrumb item URL
 * @param {string} href - The href path
 * @returns {string} The full breadcrumb URL
 */
export function getBreadcrumbUrl(href: string): string {
  if (href.startsWith("http")) {
    return href; // Already a full URL
  }
  return getFullUrl(href);
}
