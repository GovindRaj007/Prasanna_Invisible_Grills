/**
 * Single source of truth for business identity (NAP), branches and hours.
 * Every visible address/phone/hours block and every JSON-LD schema reads from
 * here so the details stay identical across the site, Google Business Profile
 * and directory listings (NAP consistency is a core local-SEO signal).
 */

export const SITE_URL = "https://prasannainvisible.in";

export interface Phone {
  /** E.164 format for tel: links and schema */
  e164: string;
  /** Human-readable format */
  display: string;
  label: string;
}

export const PHONES: { primary: Phone; secondary: Phone } = {
  primary: { e164: "+917339306098", display: "+91 73393 06098", label: "Primary" },
  secondary: { e164: "+918328376098", display: "+91 83283 76098", label: "Secondary" },
};

export const BUSINESS = {
  name: "Prasanna Invisible Grills",
  alternateName: ["Prasanna Invisible Grills and Nets", "Prasanna Grills"],
  shortName: "Prasanna Grills",
  description:
    "Invisible grills installation for balconies and windows (SS316 marine-grade stainless steel cables), ceiling cloth hangers and invisible grill dealership/wholesale, with branches in Hyderabad, Visakhapatnam and Vijayawada serving Telangana and Andhra Pradesh.",
  email: "info@prasannainvisible.in",
  foundingYear: "2015",
  installations: "3,500+",
  whatsapp: "917339306098",
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-images/prasanna-invisible-grills-og.jpg`,
  priceRange: "₹₹",
  languages: ["English", "Telugu", "Hindi"],
  /** Same hours every day of the week */
  hours: {
    opens: "08:00",
    closes: "18:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    label: "Mon – Sun: 8:00 AM – 6:00 PM",
    short: "Open all 7 days, 8 AM – 6 PM",
  },
  googleReviewUrl: "https://g.page/r/CU35q4qYY1cSEAI/review",
  /** Google Business Profile (Visakhapatnam listing) */
  googleMapsUrl: "https://www.google.com/maps?cid=1321634522469235021",
} as const;

export const whatsappLink = (text = "Hi, I'm interested in your invisible grills services.") =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;

export interface Branch {
  id: string;
  /** City badge shown in the UI */
  city: string;
  /** Neighbourhood / area label */
  area: string;
  state: "Telangana" | "Andhra Pradesh";
  stateCode: "TG" | "AP";
  streetAddress: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  /** Location page slugs (from LOCATIONS) this branch primarily serves */
  serves: string[];
  /** Google Maps URL (GBP listing where one exists) */
  mapsUrl?: string;
}

/** Hyderabad branches first, as requested. */
export const BRANCHES: Branch[] = [
  {
    id: "hyderabad-kollur",
    city: "Hyderabad",
    area: "Kollur",
    state: "Telangana",
    stateCode: "TG",
    streetAddress: "Anvita Ivana, Block B, Flat 803, Nehru Outer Ring Road, Kollur",
    postalCode: "500034",
    latitude: 17.409985246685782,
    longitude: 78.4467274576717,
    serves: ["hyderabad", "tellapur", "kokapet", "miyapur", "shamshabad", "mahbubnagar", "secunderabad"],
  },
  {
    id: "hyderabad-gachibowli-kondapur",
    city: "Hyderabad",
    area: "Gachibowli – Kondapur",
    state: "Telangana",
    stateCode: "TG",
    streetAddress:
      "Door No. 2-11, Gachibowli – Kondapur Road, beside NF Glass & Aluminium Works, Sri Maruthi Nagar Colony, Serilingampally",
    postalCode: "500019",
    latitude: 17.466917564179937,
    longitude: 78.33679936244543,
    serves: ["gachibowli", "kondapur", "madhapur", "kukatpally", "kompally", "medchal", "warangal"],
  },
  {
    id: "visakhapatnam-kakani-nagar",
    city: "Visakhapatnam",
    area: "Kakani Nagar",
    state: "Andhra Pradesh",
    stateCode: "AP",
    streetAddress: "21-34/1, Viman Nagar, Kakani Nagar",
    postalCode: "530009",
    // Coordinates taken from the verified Google Business Profile pin for this address.
    latitude: 17.7384594,
    longitude: 83.2258118,
    serves: ["visakhapatnam", "rajahmundry"],
    mapsUrl: "https://www.google.com/maps?cid=1321634522469235021",
  },
  {
    id: "vijayawada-tadepalli",
    city: "Vijayawada",
    area: "Tadepalli",
    state: "Andhra Pradesh",
    stateCode: "AP",
    streetAddress: "22/11, Tadepalli, Vijayawada – Guntur Road",
    postalCode: "522501",
    latitude: 16.480379185212353,
    longitude: 80.61451506931321,
    serves: ["vijayawada", "guntur", "tirupati", "anantapur"],
  },
];

export const branchFullAddress = (b: Branch) =>
  `${b.streetAddress}, ${b.city}, ${b.state} ${b.postalCode}`;

export const branchMapsUrl = (b: Branch) =>
  b.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${b.latitude},${b.longitude}`;

export const branchDirectionsUrl = (b: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${b.latitude},${b.longitude}`;

export const branchEmbedUrl = (b: Branch) =>
  `https://maps.google.com/maps?q=${b.latitude},${b.longitude}&z=15&output=embed`;

export const branchSchemaId = (b: Branch) => `${SITE_URL}/#branch-${b.id}`;

/** Great-circle distance in km. */
export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/** Branch that serves a location slug (falls back to geographic nearest). */
export function branchForLocation(slug: string, lat?: number, lng?: number): Branch {
  const direct = BRANCHES.find((b) => b.serves.includes(slug));
  if (direct) return direct;
  if (lat === undefined || lng === undefined) return BRANCHES[0];
  return [...BRANCHES].sort(
    (a, b) => distanceKm(lat, lng, a.latitude, a.longitude) - distanceKm(lat, lng, b.latitude, b.longitude)
  )[0];
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
