/**
 * JSON-LD builders. Entities use stable @id URIs so Google / Bing / AI
 * answer engines can merge them into a single knowledge-graph entity:
 *   #organization  – the brand
 *   #website       – the site
 *   #branch-<id>   – each physical branch (HomeAndConstructionBusiness)
 * Page-level nodes (Service, WebPage, FAQPage, BreadcrumbList) reference these.
 *
 * No aggregateRating / review markup: self-published ratings are not eligible
 * for rich results and must reflect real, verifiable reviews.
 */
import {
  BRANCHES,
  BUSINESS,
  ORGANIZATION_ID,
  PHONES,
  SITE_URL,
  WEBSITE_ID,
  Branch,
  branchMapsUrl,
  branchSchemaId,
} from "@/config/business";
import { LOCATIONS, LocationInfo, ServiceInfo } from "@/config/seo.constants";

type JsonLd = Record<string, unknown>;

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "/" : path}`;


const statePlace = (state: string) => ({
  "@type": "State",
  name: state,
  containedInPlace: { "@type": "Country", name: "India" },
});

export const cityPlace = (loc: LocationInfo) => ({
  "@type": loc.parentCity ? "Place" : "City",
  name: loc.parentCity ? `${loc.city}, ${loc.parentCity}` : loc.city,
  ...(loc.altNames?.length ? { alternateName: loc.altNames } : {}),
  geo: { "@type": "GeoCoordinates", latitude: loc.latitude, longitude: loc.longitude },
  containedInPlace: statePlace(loc.state),
});

const openingHours = () => [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: BUSINESS.hours.days,
    opens: BUSINESS.hours.opens,
    closes: BUSINESS.hours.closes,
  },
];

const contactPoints = () =>
  [PHONES.primary, PHONES.secondary].map((p) => ({
    "@type": "ContactPoint",
    telephone: p.e164,
    contactType: "customer service",
    areaServed: ["IN-TG", "IN-AP"],
    availableLanguage: BUSINESS.languages,
  }));

export const branchNode = (b: Branch): JsonLd => ({
  "@type": "HomeAndConstructionBusiness",
  "@id": branchSchemaId(b),
  name: `${BUSINESS.name} – ${b.area}, ${b.city}`,
  url: `${SITE_URL}/contact`,
  image: BUSINESS.image,
  logo: BUSINESS.logo,
  telephone: PHONES.primary.e164,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  address: {
    "@type": "PostalAddress",
    streetAddress: b.streetAddress,
    addressLocality: b.city,
    addressRegion: b.state,
    postalCode: b.postalCode,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: b.latitude, longitude: b.longitude },
  hasMap: branchMapsUrl(b),
  openingHoursSpecification: openingHours(),
  areaServed: LOCATIONS.filter((l) => b.serves.includes(l.slug)).map(cityPlace),
  parentOrganization: { "@id": ORGANIZATION_ID },
});

/** Site-wide entity graph – rendered on every page by Layout. */
export const siteGraph = (): JsonLd => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: BUSINESS.name,
      alternateName: BUSINESS.alternateName,
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: BUSINESS.logo, width: 600, height: 211 },
      image: BUSINESS.image,
      description: BUSINESS.description,
      email: BUSINESS.email,
      telephone: PHONES.primary.e164,
      foundingDate: BUSINESS.foundingYear,
      contactPoint: contactPoints(),
      address: branchNode(BRANCHES[0]).address,
      areaServed: [statePlace("Telangana"), statePlace("Andhra Pradesh")],
      knowsAbout: [
        "Invisible grills",
        "Balcony safety grills",
        "Window safety grills",
        "SS316 stainless steel cable grills",
        "Child and pet safety for balconies",
        "Ceiling cloth drying hangers",
      ],
      department: BRANCHES.map((b) => ({ "@id": branchSchemaId(b) })),
      sameAs: [BUSINESS.googleMapsUrl],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: BUSINESS.name,
      inLanguage: "en-IN",
      publisher: { "@id": ORGANIZATION_ID },
    },
    ...BRANCHES.map(branchNode),
  ],
});

export const webPageNode = (opts: {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  image?: string;
}): JsonLd => ({
  "@type": opts.type ?? "WebPage",
  "@id": `${absoluteUrl(opts.path)}#webpage`,
  url: absoluteUrl(opts.path),
  name: opts.title,
  description: opts.description,
  inLanguage: "en-IN",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORGANIZATION_ID },
  ...(opts.image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(opts.image) } } : {}),
});

export const serviceNode = (opts: {
  service: ServiceInfo;
  path: string;
  name?: string;
  description?: string;
  location?: LocationInfo;
  branch?: Branch;
}): JsonLd => ({
  "@type": "Service",
  "@id": `${absoluteUrl(opts.path)}#service`,
  name: opts.name ?? opts.service.seoName,
  serviceType: opts.service.serviceType,
  description: opts.description ?? opts.service.description,
  url: absoluteUrl(opts.path),
  image: absoluteUrl(opts.service.ogImage),
  provider: { "@id": opts.branch ? branchSchemaId(opts.branch) : ORGANIZATION_ID },
  brand: { "@id": ORGANIZATION_ID },
  areaServed: opts.location
    ? cityPlace(opts.location)
    : [statePlace("Telangana"), statePlace("Andhra Pradesh"), ...LOCATIONS.filter((l) => !l.parentCity).map(cityPlace)],
  availableChannel: {
    "@type": "ServiceChannel",
    servicePhone: { "@type": "ContactPoint", telephone: PHONES.primary.e164 },
    serviceUrl: `${SITE_URL}/contact`,
  },
});

export const faqNode = (faqs: { question: string; answer: string }[], path?: string): JsonLd => ({
  "@type": "FAQPage",
  ...(path ? { "@id": `${absoluteUrl(path)}#faq` } : {}),
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export const graph = (...nodes: JsonLd[]): JsonLd => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

