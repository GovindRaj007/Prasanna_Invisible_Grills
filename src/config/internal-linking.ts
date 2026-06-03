/**
 * Internal Linking Utilities
 * Helps generate optimal internal links for SEO
 */

import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { SERVICES, LOCATIONS } from "@/config/seo.constants";

interface InternalLinkProps {
  to: string;
  children: ReactNode;
  title?: string;
  rel?: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * SEO-optimized internal link component
 * Automatically adds aria labels and title attributes
 */
export function SEOLink({
  to,
  children,
  title,
  rel,
  className,
  ariaLabel,
}: InternalLinkProps) {
  return (
    <Link
      to={to}
      title={title}
      rel={rel}
      className={className}
      aria-label={ariaLabel || title}
    >
      {children}
    </Link>
  );
}

/**
 * Generate service link
 */
export function ServiceLink({
  serviceSlug,
  children,
  className,
}: {
  serviceSlug: string;
  children: ReactNode;
  className?: string;
}) {
  const service = SERVICES.find(s => s.slug === serviceSlug);
  return (
    <SEOLink
      to={`/${serviceSlug}`}
      title={service?.name}
      ariaLabel={service?.description}
      className={className}
    >
      {children || service?.name}
    </SEOLink>
  );
}

/**
 * Generate location link
 */
export function LocationLink({
  locationSlug,
  serviceSlug,
  children,
  className,
}: {
  locationSlug: string;
  serviceSlug?: string;
  children: ReactNode;
  className?: string;
}) {
  const location = LOCATIONS.find(l => l.slug === locationSlug);
  const path = serviceSlug ? `/${serviceSlug}-${locationSlug}` : `/locations/${locationSlug}`;
  
  return (
    <SEOLink
      to={path}
      title={`Services in ${location?.city}`}
      ariaLabel={`${location?.city} services`}
      className={className}
    >
      {children || `${location?.city}`}
    </SEOLink>
  );
}

/**
 * Generate service + location link
 */
export function ServiceLocationLink({
  serviceSlug,
  locationSlug,
  children,
  className,
}: {
  serviceSlug: string;
  locationSlug: string;
  children?: ReactNode;
  className?: string;
}) {
  const service = SERVICES.find(s => s.slug === serviceSlug);
  const location = LOCATIONS.find(l => l.slug === locationSlug);
  const path = `/${serviceSlug}-${locationSlug}`;
  const title = `${service?.name} in ${location?.city}`;

  return (
    <SEOLink
      to={path}
      title={title}
      ariaLabel={title}
      className={className}
    >
      {children || title}
    </SEOLink>
  );
}

/**
 * Generate all service location combinations for sitemap or navigation
 */
export function getAllServiceLocationPaths() {
  return SERVICES.flatMap(service =>
    LOCATIONS.map(location => ({
      path: `/${service.slug}-${location.slug}`,
      service: service.slug,
      location: location.slug,
      title: `${service.name} in ${location.city}`,
    }))
  );
}

/**
 * Get related service links for a current service
 */
export function getRelatedServices(currentServiceSlug: string) {
  return SERVICES.filter(s => s.slug !== currentServiceSlug).slice(0, 3);
}

/**
 * Get nearby locations for a current location
 */
export function getNearbyLocations(currentLocationSlug: string, limit: number = 5) {
  const currentLocation = LOCATIONS.find(l => l.slug === currentLocationSlug);
  if (!currentLocation) return [];

  // Simple: return locations from same state first, then others
  const sameState = LOCATIONS.filter(
    l => l.slug !== currentLocationSlug && l.state === currentLocation.state
  );
  const differentState = LOCATIONS.filter(
    l => l.slug !== currentLocationSlug && l.state !== currentLocation.state
  );

  return [...sameState, ...differentState].slice(0, limit);
}

/**
 * Generate internal linking strategy markup
 * Ensures proper linking for SEO crawlability
 */
export function generateInternalLinkingMarkup() {
  return {
    homepage: [
      ...SERVICES.map(s => `/${s.slug}`),
      "/about",
      "/contact",
    ],
    servicePage: (serviceSlug: string) => [
      "/",
      "/about",
      "/contact",
      ...LOCATIONS.map(l => `/${serviceSlug}-${l.slug}`).slice(0, 5),
    ],
    locationPage: (serviceSlug: string, locationSlug: string) => [
      "/",
      `/${serviceSlug}`,
      ...getNearbyLocations(locationSlug, 3).map(l => `/${serviceSlug}-${l.slug}`),
    ],
  };
}

/**
 * Breadcrumb structure for navigation
 */
export interface BreadcrumbItem {
  label: string;
  url?: string;
}

export function generateBreadcrumbs(
  serviceSlug?: string,
  locationSlug?: string
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", url: "/" },
  ];

  if (serviceSlug) {
    const service = SERVICES.find(s => s.slug === serviceSlug);
    breadcrumbs.push({
      label: service?.name || serviceSlug,
      url: `/${serviceSlug}`,
    });
  }

  if (locationSlug && serviceSlug) {
    const location = LOCATIONS.find(l => l.slug === locationSlug);
    breadcrumbs.push({
      label: `${location?.city || locationSlug}`,
    });
  }

  return breadcrumbs;
}

/**
 * Related content suggestion for internal linking
 */
export interface RelatedContent {
  services: typeof SERVICES;
  locations: typeof LOCATIONS;
  breadcrumbs: BreadcrumbItem[];
}

export function getRelatedContent(
  serviceSlug?: string,
  locationSlug?: string
): RelatedContent {
  return {
    services: getRelatedServices(serviceSlug || ""),
    locations: getNearbyLocations(locationSlug || ""),
    breadcrumbs: generateBreadcrumbs(serviceSlug, locationSlug),
  };
}
