/**
 * SEO content configuration: services and service-area locations.
 * Business identity (phones, branches, hours) lives in ./business.ts.
 *
 * NOTE: scripts/generate-sitemaps-enhanced.js and scripts/prerender.mjs
 * derive the route list from App routes; keep slugs here in sync with App.tsx.
 */

export type ServiceSlug =
  | "invisible-grills"
  | "invisible-grills-balcony"
  | "invisible-grills-windows"
  | "ceiling-cloth-hanger"
  | "invisible-grills-dealer";

export interface ServiceInfo {
  slug: ServiceSlug;
  /** Navigation / card name */
  name: string;
  /** Name used in "<seoName> in <City>" titles and H1s */
  seoName: string;
  /** schema.org serviceType */
  serviceType: string;
  description: string;
  ogImage: string;
  /** Short answer-first summary used on location pages and llms.txt */
  summary: string;
  highlights: string[];
}

export const SERVICES: ServiceInfo[] = [
  {
    slug: "invisible-grills",
    name: "Invisible Grills",
    seoName: "Invisible Grills",
    serviceType: "Invisible grill installation",
    description:
      "Invisible grills installation for balconies, windows, staircases and terraces using SS316 marine-grade stainless steel cables with a 10-year warranty.",
    ogImage: "/og-images/invisible-grills-og.jpg",
    summary:
      "Invisible grills are tensioned SS316 stainless-steel cables (2–3 mm) fixed vertically in aluminium tracks at 2–3 inch spacing. They protect children and pets from falls without blocking the view, light or airflow.",
    highlights: [
      "SS316 marine-grade stainless steel cables",
      "2–3 inch spacing — child & pet safe",
      "Installed in 4–8 hours for a typical balcony",
      "10-year warranty on material and workmanship",
    ],
  },
  {
    slug: "invisible-grills-balcony",
    name: "Invisible Grills for Balcony",
    seoName: "Invisible Grills for Balcony",
    serviceType: "Balcony invisible grill installation",
    description:
      "Balcony invisible grills for apartments, villas and high-rises — open views with fall protection for children and pets, SS316 cables and a 10-year warranty.",
    ogImage: "/og-images/balcony-invisible-grills-og.jpg",
    summary:
      "Balcony invisible grills replace bulky iron grills or nets with near-invisible SS316 cables, keeping the balcony open while stopping falls. They suit high-rise apartments where builders or associations don't allow external grills.",
    highlights: [
      "Ideal for high-rise apartments and gated communities",
      "No change to the building's elevation",
      "Weather, UV and rust resistant",
      "Free site measurement and quote",
    ],
  },
  {
    slug: "invisible-grills-windows",
    name: "Invisible Grill for Windows",
    seoName: "Invisible Grills for Windows",
    serviceType: "Window invisible grill installation",
    description:
      "Window invisible grills for sliding, casement and French windows — child-safe protection that keeps light, ventilation and views, with a 10-year warranty.",
    ogImage: "/og-images/window-invisible-grills-og.jpg",
    summary:
      "Window invisible grills are fitted inside or outside the window frame with SS316 cables, so windows stay openable for ventilation while children and pets are protected. A typical window takes 2–4 hours to install.",
    highlights: [
      "Works with sliding, casement and French windows",
      "Keeps ventilation and natural light",
      "2–4 hours per window",
      "Rust-proof, low maintenance",
    ],
  },
  {
    slug: "ceiling-cloth-hanger",
    name: "Ceiling Cloth Hanger",
    seoName: "Ceiling Cloth Hanger",
    serviceType: "Ceiling cloth hanger installation",
    description:
      "Ceiling-mounted pulley cloth drying hangers for balconies and utility areas — space-saving, rust-proof, quick installation.",
    ogImage: "/og-images/ceiling-cloth-hanger-og.jpg",
    summary:
      "A ceiling cloth hanger is a pulley-operated drying rack mounted on the balcony or utility ceiling. Rods are lowered to hang clothes and raised to dry them overhead, freeing floor and railing space.",
    highlights: [
      "Pulley-operated — lower, load and raise",
      "Stainless steel / aluminium rust-proof rods",
      "Holds 25–50 kg depending on model",
      "Installed in 2–3 hours, 5-year warranty",
    ],
  },
  {
    slug: "invisible-grills-dealer",
    name: "Invisible Grills Dealer",
    seoName: "Invisible Grills Dealer",
    serviceType: "Invisible grill dealership and wholesale supply",
    description:
      "Invisible grills dealer and wholesale supplier — SS316 cables, tracks and accessories for contractors, builders and retailers, with dealership opportunities.",
    ogImage: "/og-images/invisible-grills-dealer-og.jpg",
    summary:
      "As an invisible grills dealer and wholesale supplier, Prasanna supplies SS316 cables, aluminium tracks and fittings to contractors, builders and retailers, and offers dealership with installation training.",
    highlights: [
      "Wholesale SS316 cables, tracks and fittings",
      "Bulk pricing for builders and contractors",
      "Dealership with installation training",
      "Supply across Telangana and Andhra Pradesh",
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export interface LocationInfo {
  city: string;
  slug: string;
  state: "Telangana" | "Andhra Pradesh";
  /** City (metro) the area belongs to, used for schema containedInPlace */
  parentCity?: string;
  altNames?: string[];
  /** Alternate name people actually search with (shown in titles/H1), e.g. "Vizag" */
  searchAlias?: string;
  latitude: number;
  longitude: number;
  localities: string[];
  /** Neighbouring location slugs for internal linking */
  nearby: string[];
}

/** Telangana (Hyderabad) first, matching branch priority. */
export const LOCATIONS: LocationInfo[] = [
  {
    city: "Hyderabad", slug: "hyderabad", state: "Telangana", latitude: 17.385, longitude: 78.4867,
    localities: ["Banjara Hills", "Jubilee Hills", "Hitech City", "Madhapur", "Kondapur", "Gachibowli", "Kukatpally", "Kollur"],
    nearby: ["secunderabad", "gachibowli", "kondapur", "madhapur", "kukatpally", "kokapet"],
  },
  {
    city: "Secunderabad", slug: "secunderabad", state: "Telangana", parentCity: "Hyderabad", latitude: 17.4399, longitude: 78.4983,
    localities: ["Begumpet", "Trimulgherry", "Bowenpally", "Marredpally", "Tarnaka", "Sainikpuri"],
    nearby: ["hyderabad", "kompally", "medchal", "kukatpally"],
  },
  {
    city: "Gachibowli", slug: "gachibowli", state: "Telangana", parentCity: "Hyderabad", latitude: 17.4401, longitude: 78.3489,
    localities: ["Financial District", "Nanakramguda", "Raidurg", "Khajaguda", "Gopanpally", "Wipro Circle"],
    nearby: ["kondapur", "madhapur", "kokapet", "tellapur", "miyapur"],
  },
  {
    city: "Kondapur", slug: "kondapur", state: "Telangana", parentCity: "Hyderabad", latitude: 17.4615, longitude: 78.3657,
    localities: ["Botanical Garden", "Jayabheri Enclave", "Kothaguda", "Hafeezpet", "Masjid Banda", "Raghavendra Colony"],
    nearby: ["gachibowli", "madhapur", "miyapur", "kukatpally"],
  },
  {
    city: "Madhapur", slug: "madhapur", state: "Telangana", parentCity: "Hyderabad", latitude: 17.4483, longitude: 78.3915,
    localities: ["Ayyappa Society", "Kavuri Hills", "Cyber Towers", "Hitech City", "Durgam Cheruvu", "Image Gardens"],
    nearby: ["gachibowli", "kondapur", "kukatpally", "hyderabad"],
  },
  {
    city: "Kukatpally", slug: "kukatpally", state: "Telangana", parentCity: "Hyderabad", latitude: 17.4948, longitude: 78.3996,
    localities: ["KPHB Colony", "Allwyn Colony", "Moosapet", "Balaji Nagar", "Nizampet", "Pragathi Nagar"],
    nearby: ["miyapur", "kondapur", "madhapur", "kompally"],
  },
  {
    city: "Miyapur", slug: "miyapur", state: "Telangana", parentCity: "Hyderabad", latitude: 17.4968, longitude: 78.3614,
    localities: ["Chandanagar", "BHEL", "Lingampally", "Hafeezpet", "Ameenpur", "Bachupally"],
    nearby: ["kukatpally", "kondapur", "tellapur", "gachibowli"],
  },
  {
    city: "Kokapet", slug: "kokapet", state: "Telangana", parentCity: "Hyderabad", latitude: 17.3976, longitude: 78.3399,
    localities: ["Financial District", "Narsingi", "Gandipet", "Puppalguda", "Manikonda", "Neopolis"],
    nearby: ["gachibowli", "tellapur", "shamshabad", "madhapur"],
  },
  {
    city: "Tellapur", slug: "tellapur", state: "Telangana", parentCity: "Hyderabad", latitude: 17.4686, longitude: 78.2878,
    localities: ["Osman Nagar", "Nallagandla", "Kollur", "Gopanpally", "Gowlidoddi", "Ameenpur"],
    nearby: ["gachibowli", "miyapur", "kokapet", "kondapur"],
  },
  {
    city: "Kompally", slug: "kompally", state: "Telangana", parentCity: "Hyderabad", latitude: 17.536, longitude: 78.484,
    localities: ["Gundlapochampally", "Petbasheerabad", "Kandlakoya", "Suchitra", "Jeedimetla", "Dulapally"],
    nearby: ["medchal", "secunderabad", "kukatpally"],
  },
  {
    city: "Medchal", slug: "medchal", state: "Telangana", parentCity: "Hyderabad", latitude: 17.629, longitude: 78.481,
    localities: ["Shamirpet", "Alwal", "Malkajgiri", "Yapral", "Kompally", "Gowdavelly"],
    nearby: ["kompally", "secunderabad"],
  },
  {
    city: "Shamshabad", slug: "shamshabad", state: "Telangana", parentCity: "Hyderabad", latitude: 17.2403, longitude: 78.4294,
    localities: ["RGI Airport", "Mamidipally", "Budvel", "Kishanguda", "Satamrai", "Tukkuguda"],
    nearby: ["kokapet", "hyderabad", "mahbubnagar"],
  },
  {
    city: "Mahbubnagar", slug: "mahbubnagar", state: "Telangana", latitude: 16.7375, longitude: 78.0081,
    localities: ["Town Centre", "Jadcherla", "Pillalamarri", "Devarakadra", "Bhootpur", "New Town"],
    nearby: ["shamshabad", "hyderabad"],
  },
  {
    city: "Warangal", slug: "warangal", state: "Telangana", latitude: 17.9784, longitude: 79.6,
    altNames: ["Hanamkonda"],
    localities: ["Hanamkonda", "Kazipet", "Subedari", "Hunter Road", "Balasamudram", "Nakkalagutta"],
    nearby: ["hyderabad", "secunderabad"],
  },
  {
    city: "Visakhapatnam", slug: "visakhapatnam", state: "Andhra Pradesh", latitude: 17.6868, longitude: 83.2185,
    altNames: ["Vizag", "Vishakhapatnam", "Vishakapatnam"],
    searchAlias: "Vizag",
    localities: ["Kakani Nagar", "MVP Colony", "Madhurawada", "Gajuwaka", "Seethammadhara", "Beach Road", "PM Palem", "Siripuram"],
    nearby: ["rajahmundry"],
  },
  {
    city: "Rajahmundry", slug: "rajahmundry", state: "Andhra Pradesh", latitude: 17.0005, longitude: 81.804,
    altNames: ["Rajamahendravaram"],
    localities: ["Danavaipeta", "Tilak Road", "Prakash Nagar", "Morampudi", "Lalacheruvu", "Innespeta"],
    nearby: ["visakhapatnam", "vijayawada"],
  },
  {
    city: "Vijayawada", slug: "vijayawada", state: "Andhra Pradesh", latitude: 16.5062, longitude: 80.648,
    altNames: ["Bezawada"],
    localities: ["Benz Circle", "Tadepalli (Tadepalle)", "Labbipet", "Patamata", "Gunadala", "Bhavanipuram", "Kanuru"],
    nearby: ["guntur", "rajahmundry"],
  },
  {
    city: "Guntur", slug: "guntur", state: "Andhra Pradesh", latitude: 16.3067, longitude: 80.4365,
    localities: ["Brodipet", "Arundelpet", "Lakshmipuram", "Kothapet", "Mangalagiri", "Amaravati Road"],
    nearby: ["vijayawada"],
  },
  {
    city: "Tirupati", slug: "tirupati", state: "Andhra Pradesh", latitude: 13.6288, longitude: 79.4192,
    localities: ["Alipiri", "Tiruchanur", "Renigunta Road", "Balaji Colony", "KT Road", "Air Bypass Road"],
    nearby: ["anantapur"],
  },
  {
    city: "Anantapur", slug: "anantapur", state: "Andhra Pradesh", latitude: 14.6819, longitude: 77.6006,
    altNames: ["Anantapuramu"],
    localities: ["Clock Tower", "Saptagiri Circle", "Ram Nagar", "Kamalanagar", "JNTU Road", "Rudrampeta"],
    nearby: ["tirupati"],
  },
];

export const getLocation = (slug: string) => LOCATIONS.find((l) => l.slug === slug);

export const LOCATIONS_BY_STATE = {
  Telangana: LOCATIONS.filter((l) => l.state === "Telangana"),
  "Andhra Pradesh": LOCATIONS.filter((l) => l.state === "Andhra Pradesh"),
} as const;
