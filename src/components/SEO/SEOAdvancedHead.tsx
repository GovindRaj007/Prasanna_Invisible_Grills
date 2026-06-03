/**
 * Advanced SEO Head Component
 * Comprehensive SEO meta tags, JSON-LD schemas, and structured data
 */

import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateWebsiteSchema,
  generateFAQSchema,
  generateAggregateRatingSchema,
  getCanonicalUrl,
  getOgImageUrl,
  getFullUrl,
} from "@/config/seo.utils";
import { SITE_CONFIG, type Service, type Location, FAQ_DATA } from "@/config/seo.constants";

interface SEOAdvancedHeadProps {
  /**
   * Page title (50-60 characters recommended)
   */
  title: string;

  /**
   * Meta description (150-160 characters recommended)
   */
  description: string;

  /**
   * Page keywords (comma-separated, optional)
   */
  keywords?: string;

  /**
   * Canonical URL path (e.g., "/invisible-grills")
   */
  canonicalUrl: string;

  /**
   * OG image URL or path
   */
  ogImage?: string;

  /**
   * OG image alt text
   */
  ogImageAlt?: string;

  /**
   * Service object for service-specific schemas
   */
  service?: Service;

  /**
   * Location object for location-specific schemas
   */
  location?: Location;

  /**
   * Breadcrumb items for schema
   */
  breadcrumbs?: Array<{ label: string; url?: string }>;

  /**
   * FAQ items for schema
   */
  faqs?: Array<{ question: string; answer: string }>;

  /**
   * Custom JSON-LD schemas to add
   */
  customSchemas?: Record<string, any>[];

  /**
   * Override struct data defaults
   */
  structuredData?: Record<string, any>;

  /**
   * Additional meta tags
   */
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
    httpEquiv?: string;
  }>;

  /**
   * Additional link tags
   */
  additionalLinkTags?: Array<{
    rel: string;
    href: string;
    [key: string]: any;
  }>;

  /**
   * Should include Organization schema
   */
  includeOrganization?: boolean;

  /**
   * Should include LocalBusiness schema
   */
  includeLocalBusiness?: boolean;

  /**
   * Should include WebSite schema
   */
  includeWebsite?: boolean;

  /**
   * Article metadata for blog posts
   */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };

  /**
   * Custom Twitter card type
   */
  twitterCardType?: "summary" | "summary_large_image" | "app" | "player";

  /**
   * Twitter creator handle (without @)
   */
  twitterCreator?: string;
}

export function SEOAdvancedHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogImageAlt = SITE_CONFIG.name,
  service,
  location,
  breadcrumbs,
  faqs,
  customSchemas = [],
  structuredData,
  additionalMetaTags = [],
  additionalLinkTags = [],
  includeOrganization = true,
  includeLocalBusiness = location ? true : false,
  includeWebsite = true,
  article,
  twitterCardType = "summary_large_image",
  twitterCreator = "prasannagrills",
}: SEOAdvancedHeadProps) {
  const canonicalUrlFull = getCanonicalUrl(canonicalUrl);
  const ogImageUrl = getOgImageUrl(ogImage);

  // Generate all JSON-LD schemas
  const schemas: Record<string, any>[] = [];

  if (includeOrganization) {
    schemas.push(generateOrganizationSchema());
  }

  if (includeLocalBusiness && location) {
    schemas.push(generateLocalBusinessSchema(location));
  }

  if (includeWebsite) {
    schemas.push(generateWebsiteSchema());
  }

  if (service) {
    schemas.push(generateServiceSchema(service, location));
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  if (faqs && faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs));
  }

  // Add custom schemas
  schemas.push(...customSchemas);

  // Add article schema if applicable
  if (article) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      image: ogImageUrl,
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime,
      author: {
        "@type": "Organization",
        name: article.author || SITE_CONFIG.name,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        logo: {
          "@type": "ImageObject",
          url: getFullUrl("/logo-Prasanna-Invisible-Grills.png"),
        },
      },
      articleSection: article.section,
      keywords: article.tags?.join(", "),
    });
  }

  // Link tags for social profiles
  const linkTags: Array<{
    rel: string;
    href: string;
    [key: string]: any;
  }> = [
    {
      rel: "canonical",
      href: canonicalUrlFull,
    },
    {
      rel: "alternate",
      href: canonicalUrlFull,
      hrefLang: "en-IN",
    },
    {
      rel: "alternate",
      href: canonicalUrlFull,
      hrefLang: "te",
    },
    ...additionalLinkTags,
  ];

  // Meta tags
  const metaTags: Array<{
    name?: string;
    property?: string;
    content: string;
    httpEquiv?: string;
  }> = [
    // Essential meta tags
    {
      name: "description",
      content: description,
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, viewport-fit=cover",
    },
    {
      httpEquiv: "X-UA-Compatible",
      content: "ie=edge",
    },
    {
      name: "charset",
      content: "UTF-8",
    },

    // Keywords
    ...(keywords
      ? [
        {
          name: "keywords",
          content: keywords,
        },
      ]
      : []),

    // Open Graph
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:type",
      content: article ? "article" : "website",
    },
    {
      property: "og:url",
      content: canonicalUrlFull,
    },
    {
      property: "og:image",
      content: ogImageUrl,
    },
    {
      property: "og:image:alt",
      content: ogImageAlt,
    },
    {
      property: "og:locale",
      content: "en_IN",
    },
    {
      property: "og:site_name",
      content: SITE_CONFIG.name,
    },

    // Twitter Card
    {
      name: "twitter:card",
      content: twitterCardType,
    },
    {
      name: "twitter:site",
      content: `@${twitterCreator}`,
    },
    {
      name: "twitter:creator",
      content: `@${twitterCreator}`,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:image",
      content: ogImageUrl,
    },
    {
      name: "twitter:image:alt",
      content: ogImageAlt,
    },

    // Search Engine Optimization
    {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    {
      name: "googlebot",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    {
      name: "bingbot",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },

    // Mobile Optimization
    {
      name: "theme-color",
      content: "#3b82f6",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },

    // Contact Information
    {
      name: "phone_number",
      content: SITE_CONFIG.phoneNumber,
    },
    {
      name: "email",
      content: SITE_CONFIG.email,
    },

    // Geo-location
    {
      name: "geo.position",
      content: `${SITE_CONFIG.coordinates.latitude};${SITE_CONFIG.coordinates.longitude}`,
    },
    {
      name: "ICBM",
      content: `${SITE_CONFIG.coordinates.latitude}, ${SITE_CONFIG.coordinates.longitude}`,
    },

    // Accessibility
    {
      name: "accessibility",
      content: "WCAG2.1 Level AA",
    },

    // Language
    {
      httpEquiv: "content-language",
      content: "en-IN",
    },

    // Additional custom meta tags
    ...additionalMetaTags,
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Meta Tags */}
      {metaTags.map((tag, index) => {
        if (tag.property) {
          return <meta key={index} property={tag.property} content={tag.content} />;
        }
        if (tag.httpEquiv) {
          return <meta key={index} httpEquiv={tag.httpEquiv} content={tag.content} />;
        }
        return <meta key={index} name={tag.name} content={tag.content} />;
      })}

      {/* Link Tags */}
      {linkTags.map((tag, index) => (
        <link key={index} {...tag} />
      ))}

      {/* JSON-LD Schemas */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Preconnect to critical resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Permissions Policy */}
      <meta
        name="permissions-policy"
        content="geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
      />
    </Helmet>
  );
}

export default SEOAdvancedHead;
