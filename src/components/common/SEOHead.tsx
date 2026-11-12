import { Helmet } from "react-helmet-async";
import { BUSINESS, SITE_URL } from "@/config/business";

interface SEOHeadProps {
  /** Page title without brand; brand is appended when it fits (~65 chars). */
  title: string;
  description: string;
  /** Path of the canonical URL, e.g. "/invisible-grills-hyderabad" */
  canonicalUrl: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  /** One or more JSON-LD objects */
  structuredData?: object | object[];
  /** Set for pages that must not be indexed (404, thank-you, etc.) */
  noindex?: boolean;
}

const MAX_TITLE = 65;

export function buildTitle(title: string) {
  if (title.includes(BUSINESS.name)) return title;
  const full = `${title} | ${BUSINESS.name}`;
  if (full.length <= MAX_TITLE) return full;
  const short = `${title} | ${BUSINESS.shortName}`;
  return short.length <= MAX_TITLE + 5 ? short : title;
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = "/og-images/prasanna-invisible-grills-og.jpg",
  ogImageAlt,
  ogType = "website",
  structuredData,
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = buildTitle(title);
  const url = canonicalUrl === "/" ? `${SITE_URL}/` : `${SITE_URL}${canonicalUrl}`;
  const image = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
  const robots = noindex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const jsonLd = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {!noindex && <link rel="canonical" href={url} />}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt ?? title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
