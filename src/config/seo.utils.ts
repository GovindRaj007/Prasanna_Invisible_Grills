/**
 * Advanced SEO Utilities
 * Handles canonical URLs, JSON-LD schemas, metadata generation
 */

import { SITE_CONFIG, SERVICES, LOCATIONS, type Service, type Location } from "./seo.constants";
import { getSiteUrl } from "@/lib/getSiteUrl";

/**
 * Generate canonical URL for a page
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = getSiteUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generate full URL for any path
 */
export function getFullUrl(path: string): string {
  return getCanonicalUrl(path);
}

/**
 * Generate OG image URL with fallback
 */
export function getOgImageUrl(imagePath?: string): string {
  const baseUrl = getSiteUrl();
  if (!imagePath) {
    return `${baseUrl}/og-images/prasanna-invisible-grills-og.jpg`;
  }
  return imagePath.startsWith("http")
    ? imagePath
    : `${baseUrl}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;
}

/**
 * Organization JSON-LD Schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getSiteUrl()}/#organization`,
    name: SITE_CONFIG.name,
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/logo-Prasanna-Invisible-Grills.png`,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.phoneNumber,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.locality,
      addressRegion: SITE_CONFIG.address.region,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.coordinates.latitude,
      longitude: SITE_CONFIG.coordinates.longitude,
    },
    sameAs: Object.values(SITE_CONFIG.socialProfiles),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150+",
      bestRating: "5",
      worstRating: "1",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: SITE_CONFIG.phoneNumber,
      email: SITE_CONFIG.email,
      areaServed: ["AP", "TS"],
      availableLanguage: ["en", "te", "hi"],
    },
  };
}

/**
 * LocalBusiness JSON-LD Schema
 */
export function generateLocalBusinessSchema(location?: Location) {
  const currentLocation = location || LOCATIONS[0];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${getSiteUrl()}/#business-${currentLocation.slug}`,
    name: `${SITE_CONFIG.name} - ${currentLocation.city}`,
    description: `${SITE_CONFIG.name} in ${currentLocation.city}. Professional invisible grills and ceiling cloth hanger installation.`,
    url: getSiteUrl(),
    telephone: SITE_CONFIG.phoneNumber,
    email: SITE_CONFIG.email,
    image: `${getSiteUrl()}/og-images/invisible-grills-og.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: currentLocation.city,
      addressRegion: currentLocation.state,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "closed",
        closes: "closed",
      },
    ],
    priceRange: "₹5000-₹50000",
    areaServed: [currentLocation.city, currentLocation.state],
  };
}

/**
 * Service JSON-LD Schema
 */
export function generateServiceSchema(service: Service, location?: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${getSiteUrl()}/#service-${service.slug}${location ? `-${location.slug}` : ""}`,
    name: service.name,
    description: service.longDescription,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_CONFIG.name,
      url: getSiteUrl(),
      telephone: SITE_CONFIG.phoneNumber,
    },
    serviceType: service.name,
    areaServed: location
      ? {
        "@type": "Place",
        name: `${location.city}, ${location.state}`,
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.latitude,
          longitude: location.longitude,
        },
      }
      : {
        "@type": "AdministrativeArea",
        name: "Andhra Pradesh, Telangana",
      },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: service.price === "Custom Quote" ? undefined : service.price,
      description: service.description,
    },
  };
}

/**
 * BreadcrumbList JSON-LD Schema
 */
export function generateBreadcrumbSchema(items: Array<{ label: string; url?: string }>) {
  const baseUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.url ? `${baseUrl}${item.url.startsWith("/") ? item.url : `/${item.url}`}` : undefined,
    })),
  };
}

/**
 * WebSite JSON-LD Schema (for site search)
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    url: getSiteUrl(),
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getSiteUrl()}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * FAQ Schema JSON-LD
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Review/AggregateRating Schema
 */
export function generateAggregateRatingSchema(
  name: string,
  ratingValue: number = 4.9,
  reviewCount: number = 150
) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    name: name,
    ratingValue: ratingValue.toString(),
    reviewCount: reviewCount.toString(),
    bestRating: "5",
    worstRating: "1",
  };
}

/**
 * Image Metadata for Schema
 */
export function generateImageMetadata(
  imageUrl: string,
  title: string,
  description: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: imageUrl,
    name: title,
    description: description,
    contentUrl: imageUrl,
  };
}

/**
 * Generate meta description with keyword targeting
 */
export function generateMetaDescription(
  baseDescription: string,
  keywords?: string[],
  maxLength: number = 160
): string {
  let description = baseDescription;

  if (keywords && keywords.length > 0) {
    const keywordString = keywords.slice(0, 2).join(" • ");
    if ((description + " " + keywordString).length <= maxLength) {
      description += " " + keywordString;
    }
  }

  return description.substring(0, maxLength);
}

/**
 * Generate title tag with keyword optimization
 */
export function generateTitle(
  mainKeyword: string,
  brandName: string = SITE_CONFIG.name,
  maxLength: number = 60
): string {
  const title = `${mainKeyword} | ${brandName}`;
  return title.substring(0, maxLength);
}

/**
 * Generate internal links for better SEO
 */
export function generateInternalLinks(
  currentPath: string,
  service?: Service,
  location?: Location
) {
  const baseUrl = getSiteUrl();
  const links = [
    { rel: "home", href: `${baseUrl}/` },
    { rel: "canonical", href: getCanonicalUrl(currentPath) },
  ];

  if (service) {
    links.push({
      rel: "related",
      href: `${baseUrl}/${service.slug}`,
      title: service.name,
    });
  }

  if (location) {
    links.push({
      rel: "related",
      href: `${baseUrl}/${service?.slug}-${location.slug}` || `${baseUrl}/locations/${location.slug}`,
      title: `Services in ${location.city}`,
    });
  }

  return links;
}

/**
 * Generate sitemap entry with priority and changefreq
 */
export function generateSitemapEntry(
  path: string,
  priority: string = "0.8",
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "weekly",
  images?: Array<{ url: string; title: string; caption: string }>
) {
  return {
    loc: getCanonicalUrl(path),
    changefreq,
    priority,
    lastmod: new Date().toISOString().split("T")[0],
    images: images || [],
  };
}

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find(s => s.slug === slug);
}

/**
 * Get location by slug
 */
export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find(l => l.slug === slug);
}

/**
 * Extract all unique keywords from services and locations
 */
export function getAllKeywords(): string[] {
  const keywords = new Set<string>();

  SERVICES.forEach(service => {
    service.keywords.forEach(kw => keywords.add(kw));
  });

  LOCATIONS.forEach(location => {
    keywords.add(location.city);
    keywords.add(`${location.city} invisible grills`);
    keywords.add(`${location.city} safety grills`);
    location.keywords.forEach(kw => keywords.add(kw));
  });

  return Array.from(keywords);
}

/**
 * Cache control headers generator
 */
export function getCacheControlHeader(
  type: "static" | "dynamic" | "html" = "dynamic"
): string {
  const cacheHeaders = {
    static: "public, max-age=31536000, immutable", // 1 year for versioned assets
    dynamic: "public, max-age=3600, stale-while-revalidate=86400", // 1 hour with 1 day stale
    html: "public, max-age=3600, stale-while-revalidate=604800", // 1 hour with 1 week stale
  };
  return cacheHeaders[type];
}

/**
 * Generate ETag for content versioning
 */
export function generateETag(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `W/"${Math.abs(hash).toString(36)}"`;
}
