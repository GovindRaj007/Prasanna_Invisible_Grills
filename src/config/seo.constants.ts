/**
 * SEO Configuration Constants
 * Centralized SEO metadata for the entire application
 */

export const SITE_CONFIG = {
  name: "Prasanna Invisible Grills",
  shortName: "Prasanna Grills",
  description: "Premium invisible grills installation and ceiling cloth hangers with 10-year warranty across Andhra Pradesh & Telangana",
  longDescription: "Expert invisible grills installation for windows, balconies, and railings. Professional ceiling cloth hangers. 316 stainless steel materials. 10-year warranty. Free site visit & consultation. 4.9★ rated service across 16+ cities.",
  url: process.env.VITE_PUBLIC_SITE_URL || "https://prasannainvisible.in",
  phoneNumber: "+91-7339306098",
  whatsappNumber: "+917339306098",
  email: "info@prasannainvisible.in",
  address: {
    streetAddress: "MVP Colony",
    locality: "Visakhapatnam",
    region: "Andhra Pradesh",
    postalCode: "530017",
    country: "IN",
  },
  coordinates: {
    latitude: 17.7231,
    longitude: 83.0512,
  },
  socialProfiles: {
    facebook: "https://facebook.com/prasannainvisiblegrills",
    instagram: "https://instagram.com/prasannainvisiblegrills",
    youtube: "https://youtube.com/@prasannainvisiblegrills",
  },
  businessHours: {
    monday: "08:00-18:00",
    tuesday: "08:00-18:00",
    wednesday: "08:00-18:00",
    thursday: "08:00-18:00",
    friday: "08:00-18:00",
    saturday: "08:00-18:00",
    sunday: "closed",
  },
  keywords: {
    primary: "invisible grills, invisible grill installation, safety grills",
    secondary: "balcony grills, window grills, ceiling cloth hanger, dealer",
  },
};

/**
 * Services Configuration
 * Core services offered with keywords and metadata
 */
export const SERVICES = [
  {
    id: "invisible-grills",
    name: "Invisible Grills",
    slug: "invisible-grills",
    description: "Premium invisible grills for windows and balconies",
    longDescription: "Professional invisible grills installation using 316 stainless steel materials. Provides complete safety without compromising aesthetics. Perfect for apartments, villas, and penthouses.",
    keywords: [
      "invisible grills",
      "invisible window grills",
      "safety grills",
      "balcony grills",
      "pet safety",
      "child safety",
      "stainless steel grills",
      "modern grills",
      "frameless grills",
    ],
    features: [
      "316 Stainless Steel",
      "10-Year Warranty",
      "Professional Installation",
      "Invisible Design",
      "Child & Pet Safe",
      "Weather Resistant",
    ],
    price: "Custom Quote",
    image: "/og-images/invisible-grills-og.jpg",
    priority: "0.95",
  },
  {
    id: "invisible-grills-balcony",
    name: "Invisible Grills for Balcony",
    slug: "invisible-grills-balcony",
    description: "Safety grills specifically designed for balconies",
    longDescription: "Specialized invisible grill system for balcony safety. Maintains open views while providing complete protection. Ideal for high-rise apartments and modern buildings.",
    keywords: [
      "balcony invisible grills",
      "balcony safety grills",
      "balcony protection",
      "high-rise safety",
      "apartment safety",
      "balcony railings",
    ],
    features: [
      "Balcony-Specific Design",
      "High Load Capacity",
      "Weather Proof",
      "Easy Maintenance",
      "10-Year Warranty",
    ],
    price: "Custom Quote",
    image: "/og-images/balcony-invisible-grills-og.jpg",
    priority: "0.90",
  },
  {
    id: "invisible-grills-windows",
    name: "Invisible Grills for Windows",
    slug: "invisible-grills-windows",
    description: "Protective window grills with invisible design",
    longDescription: "Premium window grills that blend seamlessly with your décor. Provides security without visual obstruction. Perfect for maintaining architectural aesthetics.",
    keywords: [
      "window invisible grills",
      "window safety grills",
      "window protection",
      "window security",
      "home security windows",
      "burglar proof windows",
    ],
    features: [
      "Invisible Design",
      "Burglary Prevention",
      "View Preservation",
      "Easy Cleaning",
      "10-Year Warranty",
    ],
    price: "Custom Quote",
    image: "/og-images/window-invisible-grills-og.jpg",
    priority: "0.90",
  },
  {
    id: "ceiling-cloth-hanger",
    name: "Ceiling Cloth Hanger",
    slug: "ceiling-cloth-hanger",
    description: "Space-saving pulley system for clothes drying",
    longDescription: "Innovative ceiling-mounted cloth hanger system. Saves precious balcony and floor space. Perfect for apartments with limited outdoor space. Smooth pulley mechanism with heavy-load capacity.",
    keywords: [
      "ceiling cloth hanger",
      "roof cloth dryer",
      "pulley system",
      "space saving",
      "cloth drying rack",
      "balcony space saver",
    ],
    features: [
      "Pulley System",
      "Heavy Load Capacity",
      "Space Saving",
      "Easy Installation",
      "10-Year Warranty",
    ],
    price: "Custom Quote",
    image: "/og-images/ceiling-cloth-hanger-og.jpg",
    priority: "0.85",
  },
  {
    id: "invisible-grills-dealer",
    name: "Invisible Grills Dealer",
    slug: "invisible-grills-dealer",
    description: "Become a authorized dealer partner",
    longDescription: "Join our network of authorized dealers. Competitive margins, comprehensive support, and proven business model. Perfect business opportunity for entrepreneurs.",
    keywords: [
      "invisible grills dealer",
      "grill dealer",
      "franchise opportunity",
      "business partner",
      "dealer program",
    ],
    features: [
      "High Margins",
      "Proven Business Model",
      "Marketing Support",
      "Training",
      "Territory Protection",
    ],
    price: "Contact for Details",
    image: "/og-images/invisible-grills-dealer-og.jpg",
    priority: "0.80",
  },
] as const;

/**
 * Locations Configuration
 * Detailed location data with coordinates and keywords
 */
export const LOCATIONS = [
  // Andhra Pradesh
  {
    state: "Andhra Pradesh",
    city: "Visakhapatnam",
    slug: "visakhapatnam",
    latitude: 17.7231,
    longitude: 83.0512,
    keywords: ["Visakhapatnam", "Vizag", "Port City"],
    localities: ["Dwarakanagar", "Madhurawada", "Gajuwaka", "Vizag City"],
    priority: "0.95",
  },
  {
    state: "Andhra Pradesh",
    city: "Rajahmundry",
    slug: "rajahmundry",
    latitude: 17.3689,
    longitude: 81.7743,
    keywords: ["Rajahmundry", "Raj", "East Godavari"],
    localities: ["Railway New Town", "Indira Nagar", "Prakasam Nagar"],
    priority: "0.90",
  },
  {
    state: "Andhra Pradesh",
    city: "Vijayawada",
    slug: "vijayawada",
    latitude: 16.5062,
    longitude: 80.6480,
    keywords: ["Vijayawada", "Krishna City", "NTR City"],
    localities: ["Labbipet", "Patamata", "Bhavanipuram", "Kanuru"],
    priority: "0.90",
  },
  {
    state: "Andhra Pradesh",
    city: "Guntur",
    slug: "guntur",
    latitude: 16.3056,
    longitude: 80.4515,
    keywords: ["Guntur", "Potti Sri Ramulu", "Guntur City"],
    localities: ["Railway Kodad", "Suryaraopet", "Kushaiguda"],
    priority: "0.85",
  },
  {
    state: "Andhra Pradesh",
    city: "Tirupati",
    slug: "tirupati",
    latitude: 13.1939,
    longitude: 79.8941,
    keywords: ["Tirupati", "Tirupati Temple City", "SRIKALAHASTEESWARA"],
    localities: ["Renigunta", "Chandragiri", "A. Rangapuram"],
    priority: "0.85",
  },
  {
    state: "Andhra Pradesh",
    city: "Anantapur",
    slug: "anantapur",
    latitude: 14.5833,
    longitude: 77.6167,
    keywords: ["Anantapur", "Rayalaseema", "Dhone"],
    localities: ["Anantapur City", "Kalyandrug"],
    priority: "0.80",
  },
  // Telangana
  {
    state: "Telangana",
    city: "Hyderabad",
    slug: "hyderabad",
    latitude: 17.3850,
    longitude: 78.4867,
    keywords: ["Hyderabad", "IT City", "Pearl City"],
    localities: ["Kukatpally", "Gachibowli", "Madhapur", "Ameerpet", "Kondapur"],
    priority: "0.95",
  },
  {
    state: "Telangana",
    city: "Secunderabad",
    slug: "secunderabad",
    latitude: 17.3688,
    longitude: 78.5031,
    keywords: ["Secunderabad", "Cantonment"],
    localities: ["Monda Market", "Begumpet", "Trimulgherry"],
    priority: "0.90",
  },
  {
    state: "Telangana",
    city: "Gachibowli",
    slug: "gachibowli",
    latitude: 17.4435,
    longitude: 78.4435,
    keywords: ["Gachibowli", "HITEC City", "Hi-Tech City"],
    localities: ["JNTU", "Nanakramguda", "Indu Nagar"],
    priority: "0.88",
  },
  {
    state: "Telangana",
    city: "Kukatpally",
    slug: "kukatpally",
    latitude: 17.4603,
    longitude: 78.4164,
    keywords: ["Kukatpally", "Allwyn Colony"],
    localities: ["Allwyn Colony", "Saifabad", "Jala Vihar"],
    priority: "0.85",
  },
  {
    state: "Telangana",
    city: "Madhapur",
    slug: "madhapur",
    latitude: 17.4493,
    longitude: 78.4623,
    keywords: ["Madhapur", "Manikonda"],
    localities: ["Manikonda", "Marredpally"],
    priority: "0.85",
  },
  {
    state: "Telangana",
    city: "Shamshabad",
    slug: "shamshabad",
    latitude: 17.2695,
    longitude: 78.3697,
    keywords: ["Shamshabad", "Airport Area"],
    localities: ["Airport Zone", "RGI Airport"],
    priority: "0.80",
  },
  {
    state: "Telangana",
    city: "Kompally",
    slug: "kompally",
    latitude: 17.5531,
    longitude: 78.3992,
    keywords: ["Kompally", "Suraram"],
    localities: ["Suraram", "Pocharam"],
    priority: "0.78",
  },
  {
    state: "Telangana",
    city: "Miyapur",
    slug: "miyapur",
    latitude: 17.5117,
    longitude: 78.3306,
    keywords: ["Miyapur", "Miyarpur"],
    localities: ["Miyapur Main Road"],
    priority: "0.78",
  },
  {
    state: "Telangana",
    city: "Medchal",
    slug: "medchal",
    latitude: 17.3950,
    longitude: 78.6117,
    keywords: ["Medchal", "Malkajgiri"],
    localities: ["Medchal Town"],
    priority: "0.75",
  },
  {
    state: "Telangana",
    city: "Kondapur",
    slug: "kondapur",
    latitude: 17.4592,
    longitude: 78.5156,
    keywords: ["Kondapur", "Kondapur Market"],
    localities: ["Kondapur Market"],
    priority: "0.75",
  },
  {
    state: "Telangana",
    city: "Kokapet",
    slug: "kokapet",
    latitude: 17.3708,
    longitude: 78.4783,
    keywords: ["Kokapet", "Kokapet Main Road"],
    localities: ["Kokapet Area"],
    priority: "0.75",
  },
  {
    state: "Telangana",
    city: "Tellapur",
    slug: "tellapur",
    latitude: 17.4804,
    longitude: 78.5523,
    keywords: ["Tellapur", "Tech Mahindra"],
    localities: ["Tech Park", "Tellapur"],
    priority: "0.72",
  },
  {
    state: "Telangana",
    city: "Mahbubnagar",
    slug: "mahbubnagar",
    latitude: 16.7859,
    longitude: 77.6700,
    keywords: ["Mahbubnagar", "Mominpet"],
    localities: ["Mahbubnagar City"],
    priority: "0.70",
  },
  {
    state: "Telangana",
    city: "Warangal",
    slug: "warangal",
    latitude: 17.9689,
    longitude: 78.6294,
    keywords: ["Warangal", "Warangal Fort"],
    localities: ["Warangal City", "Kazipet"],
    priority: "0.70",
  },
] as const;

/**
 * FAQ Data
 * Comprehensive FAQ for schema and page rendering
 */
export const FAQ_DATA = [
  {
    id: "what-are-invisible-grills",
    question: "What are invisible grills?",
    answer: "Invisible grills are transparent security barriers made from stainless steel wires that provide safety without obstructing views. They're almost invisible from a distance, maintaining your property's aesthetic while ensuring security.",
    category: "General",
  },
  {
    id: "how-durable-are-they",
    question: "How long do invisible grills last?",
    answer: "Our invisible grills are made from 316-grade stainless steel and come with a 10-year warranty. With proper maintenance, they can last 20+ years, even in harsh weather conditions.",
    category: "Durability",
  },
  {
    id: "installation-time",
    question: "How long does installation take?",
    answer: "Professional installation typically takes 4-8 hours depending on size and complexity. Our expert team works efficiently while ensuring perfect installation quality.",
    category: "Installation",
  },
  {
    id: "cost-range",
    question: "What is the cost of invisible grills?",
    answer: "Cost varies based on size, location, and customization. We provide free site visits and personalized quotes. Typically range from ₹5,000 to ₹50,000+ depending on requirements.",
    category: "Pricing",
  },
  {
    id: "child-pet-safe",
    question: "Are invisible grills safe for children and pets?",
    answer: "Yes! Our invisible grills are specifically designed with child and pet safety in mind. The tight wire spacing prevents fingers from getting stuck and protects pets from falling or escaping.",
    category: "Safety",
  },
  {
    id: "maintenance-required",
    question: "What maintenance is required?",
    answer: "Minimal maintenance is needed. Occasional wiping with a damp cloth and mild soap keeps them clean. Stainless steel's corrosion-resistant properties mean virtually no rusting or degradation.",
    category: "Maintenance",
  },
  {
    id: "view-obstruction",
    question: "Do invisible grills obstruct the view?",
    answer: "No, the primary advantage of invisible grills is their transparency. The thin stainless steel wires are barely visible from a distance, preserving your views and natural light.",
    category: "Features",
  },
  {
    id: "customization-options",
    question: "Can invisible grills be customized?",
    answer: "Yes! We offer complete customization including different wire spacing, frame colors, and mounting options. We can adapt our grills to any window or balcony configuration.",
    category: "Customization",
  },
  {
    id: "installation-warranty",
    question: "What warranty do you provide?",
    answer: "We provide a comprehensive 10-year warranty covering materials and workmanship. Our warranty includes repairs and replacements for any manufacturing defects.",
    category: "Warranty",
  },
  {
    id: "free-consultation",
    question: "Do you offer free consultation?",
    answer: "Yes! We provide completely free site visits, consultations, and quotes. Our experts will assess your requirements and provide personalized solutions.",
    category: "Service",
  },
] as const;

/**
 * Generate location-specific keywords
 */
export function generateLocationKeywords(
  location: (typeof LOCATIONS)[number],
  service?: (typeof SERVICES)[number]
): string[] {
  const baseKeywords = [
    location.city,
    `${location.city} invisible grills`,
    `${location.city} safety grills`,
    `best invisible grills in ${location.city}`,
    `invisible grills near me ${location.city}`,
    `professional grill installation ${location.city}`,
  ];

  if (service) {
    baseKeywords.push(
      `${service.name} in ${location.city}`,
      `${service.name} near me ${location.city}`,
      `${service.slug} ${location.city}`,
      `best ${service.name.toLowerCase()} in ${location.city}`
    );
  }

  return baseKeywords;
}

/**
 * Get all service+location combinations
 */
export function getAllServiceLocationCombinations() {
  return SERVICES.flatMap(service =>
    LOCATIONS.map(location => ({
      service,
      location,
      route: `/${service.slug}-${location.slug}`,
    }))
  );
}

export type Service = (typeof SERVICES)[number];
export type Location = (typeof LOCATIONS)[number];
export type FAQ = (typeof FAQ_DATA)[number];
