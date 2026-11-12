import { LOCATIONS, SERVICES } from "@/config/seo.constants";

/** Every indexable URL on the site – used by the router, prerenderer, sitemap and llms.txt. */
export const STATIC_ROUTES = ["/", "/about", "/contact"] as const;

export const SERVICE_ROUTES = SERVICES.map((s) => `/${s.slug}`);

export const LOCATION_ROUTES = SERVICES.flatMap((s) =>
  LOCATIONS.map((l) => ({ path: `/${s.slug}-${l.slug}`, service: s, location: l }))
);

export const ALL_ROUTES: string[] = [
  ...STATIC_ROUTES,
  ...SERVICE_ROUTES,
  ...LOCATION_ROUTES.map((r) => r.path),
];

/** "invisible-grills-balcony-hyderabad" -> "InvisibleGrillsBalconyHyderabad" (page component file name) */
export const routeToComponentName = (path: string) =>
  path
    .replace(/^\//, "")
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
