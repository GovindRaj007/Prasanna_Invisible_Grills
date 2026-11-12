import { SITE_URL } from "@/config/business";

/**
 * Canonical site origin. Always the production domain (never window.location),
 * so canonicals, OG URLs and schema never point at a preview/staging host and
 * server-rendered HTML matches client hydration.
 */
export function getSiteUrl(): string {
  return SITE_URL;
}
