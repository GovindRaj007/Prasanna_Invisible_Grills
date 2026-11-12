import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SEOHead } from "@/components/common/SEOHead";
import { BranchCard, CityBadge } from "@/components/common/BranchList";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/details-accordion";
import { Link } from "react-router-dom";
import { MapPin, Phone, CheckCircle2, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { CTASection } from "@/components/home/CTASection";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { BUSINESS, PHONES, branchFullAddress, branchForLocation, whatsappLink } from "@/config/business";
import { SERVICES, getLocation, getService, type ServiceInfo } from "@/config/seo.constants";
import { faqNode, graph, serviceNode, webPageNode } from "@/lib/schema";

interface ServiceLocationProps {
  service: string;
  serviceSlug: string;
  location: string;
  locationSlug: string;
  /** Page-specific intro paragraph */
  description: string;
  /** Localities covered in this city (page-specific) */
  localities: string[];
  /** Page-specific benefit bullets */
  benefits: string[];
  /** @deprecated map is generated from location data */
  mapEmbedUrl?: string;
}

type Spec = { label: string; value: string };

const SPECS: Record<string, Spec[]> = {
  grills: [
    { label: "Cable material", value: "SS316 marine-grade stainless steel" },
    { label: "Cable thickness", value: "2 mm / 3 mm" },
    { label: "Cable spacing", value: "2–3 inches (customisable)" },
    { label: "Frame / track", value: "Powder-coated aluminium" },
    { label: "Warranty", value: "10 years (material & workmanship)" },
    { label: "Site visit & quote", value: "Free" },
  ],
  "ceiling-cloth-hanger": [
    { label: "Models", value: "4-rod, 6-rod and 8-rod" },
    { label: "Load capacity", value: "25 kg / 35 kg / 50 kg" },
    { label: "Operation", value: "Pulley – lower, load, raise" },
    { label: "Installation time", value: "2–3 hours" },
    { label: "Warranty", value: "5 years" },
    { label: "Site visit & quote", value: "Free" },
  ],
  "invisible-grills-dealer": [
    { label: "Products", value: "SS316 cables, aluminium tracks, fittings" },
    { label: "Dealer types", value: "Retail dealer, contractor partner, distributor" },
    { label: "Minimum order", value: "From 50 running feet / month" },
    { label: "Training", value: "Installation training for your team" },
    { label: "Supply area", value: "Telangana & Andhra Pradesh" },
    { label: "Enquiry", value: "Free consultation" },
  ],
};

const specsFor = (slug: string) => SPECS[slug] ?? SPECS.grills;

/** Title/H1 phrasing per service, matched to how people search (Search Console queries). */
const KEYWORD_PHRASE: Record<string, string> = {
  "invisible-grills": "Invisible Grills",
  "invisible-grills-balcony": "Invisible Grills for Balcony",
  "invisible-grills-windows": "Invisible Grills for Windows",
  "ceiling-cloth-hanger": "Ceiling Cloth Hanger Installation",
  "invisible-grills-dealer": "Invisible Grills Dealer & Supplier",
};

const sameCityBranchFor = (b: { city: string }, city: string, parentCity?: string) =>
  b.city === city || parentCity === b.city;

function installTime(slug: string) {
  switch (slug) {
    case "invisible-grills-windows":
      return "about 2–4 hours per window; a typical 3BHK is finished in 1–2 days";
    case "ceiling-cloth-hanger":
      return "2–3 hours for a standard model, including fixing the brackets and testing the pulley";
    case "invisible-grills-balcony":
      return "3–6 hours for a standard balcony, usually in a single visit";
    default:
      return "4–8 hours for a standard balcony or window; larger projects take 1–2 days";
  }
}

const warranty = (slug: string) =>
  slug === "ceiling-cloth-hanger"
    ? "a 5-year warranty covering the pulley mechanism, rods and brackets"
    : "a 10-year warranty on SS316 cables, tracks and workmanship";

function buildFaqs(svc: ServiceInfo, city: string, localities: string[], branchText: string) {
  const name = svc.seoName.toLowerCase();
  const areas = `${localities.slice(0, 6).join(", ")} and nearby areas`;
  if (svc.slug === "invisible-grills-dealer") {
    return [
      {
        question: `Where can I buy invisible grill materials wholesale in ${city}?`,
        answer: `Prasanna Invisible Grills supplies SS316 invisible grill cables, aluminium tracks and fittings at wholesale prices to contractors, builders and retailers in ${city}. Call ${PHONES.primary.display} for current dealer pricing.`,
      },
      {
        question: `Do you offer an invisible grills dealership in ${city}?`,
        answer: `Yes. We appoint retail dealers, contractor partners and distributors in ${city}, with installation training for your team and marketing support. Minimum orders start at 50 running feet per month.`,
      },
      {
        question: `Is there an invisible grills supplier near me in ${city}?`,
        answer: branchText,
      },
      {
        question: `Which areas in ${city} do you supply?`,
        answer: `We supply and support dealers across ${city}, including ${areas}.`,
      },
    ];
  }
  const costFactors =
    svc.slug === "ceiling-cloth-hanger"
      ? "the model (4, 6 or 8 rods), the ceiling type and the number of units"
      : "the area in square feet, cable thickness (2 mm or 3 mm), spacing and mounting type";
  return [
    {
      question: svc.slug === "ceiling-cloth-hanger" ? `What is the ceiling cloth hanger price in ${city}?` : `What is the price of ${name} in ${city}?`,
      answer: `The cost of ${name} in ${city} depends on ${costFactors}. We visit your home in ${city} for free, take measurements and give a written quote with no hidden charges. Call ${PHONES.primary.display} or WhatsApp for an estimate.`,
    },
    {
      question: `Which areas in ${city} do you cover?`,
      answer: `We install ${name} across ${city}, including ${areas}.`,
    },
    {
      question: `Is there an invisible grills installer near me in ${city}?`,
      answer: branchText,
    },
    {
      question: `How long does ${name} installation take?`,
      answer: `Installation takes ${installTime(svc.slug)}. Our own trained team does the installation and clears the site afterwards.`,
    },
    {
      question: `What warranty do you give on ${name} in ${city}?`,
      answer: `Every installation in ${city} comes with ${warranty(svc.slug)}.`,
    },
  ];
}

export function ServiceLocationPage({
  service,
  serviceSlug,
  location,
  locationSlug,
  description,
  localities,
  benefits,
}: ServiceLocationProps) {
  const svc = getService(serviceSlug) ?? SERVICES[0];
  const loc = getLocation(locationSlug);
  const state = loc?.state ?? "Telangana";
  const branch = branchForLocation(locationSlug, loc?.latitude, loc?.longitude);
  const sameCityBranch = sameCityBranchFor(branch, location, loc?.parentCity);
  const pagePath = `/${serviceSlug}-${locationSlug}`;
  const isDealer = serviceSlug === "invisible-grills-dealer";

  // Search Console: the dominant query shape is "<service phrase> in <city>", and
  // Visakhapatnam is searched as "vizag" as often as by its full name.
  const cityLabel = loc?.searchAlias ? `${location} (${loc.searchAlias})` : location;
  const h1 = `${KEYWORD_PHRASE[serviceSlug] ?? svc.seoName} in ${cityLabel}`;
  // Short per-page intros are extended with the service description.
  const intro = description.length < 90 ? `${description} ${svc.description}` : description;
  const seoTitle = h1;
  const topAreas = localities.slice(0, 3).join(", ");
  const branchNote = sameCityBranchFor(branch, location, loc?.parentCity)
    ? `Local branch in ${branch.area}.`
    : `Serving ${localities.slice(0, 2).join(", ")} & nearby.`;
  const call = ` Call ${PHONES.primary.display}.`;
  const descriptionLead: Record<string, string> = {
    "invisible-grills": `Invisible grills in ${cityLabel} for balconies & windows – SS316 cables, 10-year warranty, free site visit. ${branchNote}`,
    "invisible-grills-balcony": `Invisible grills for balcony in ${cityLabel} – child & pet-safe SS316 cables, 10-year warranty, free site visit. ${branchNote}`,
    "invisible-grills-windows": `Invisible grills for windows in ${cityLabel} – sliding, casement & French windows, SS316 cables, 10-year warranty. ${branchNote}`,
    "ceiling-cloth-hanger": `Ceiling cloth hanger installation in ${cityLabel} – pulley drying racks (4, 6 & 8 rod), 25–50 kg, 5-year warranty. ${branchNote}`,
    "invisible-grills-dealer": `Invisible grills dealer & wholesale supplier in ${cityLabel} – SS316 cables, tracks & fittings for contractors, builders & grill suppliers.`,
  };
  const rawDescription = (descriptionLead[serviceSlug] ?? descriptionLead["invisible-grills"]) + call;
  // Keep under ~160 chars: drop the phone CTA first, then the branch note.
  const seoDescription = [rawDescription, rawDescription.replace(call, ""), rawDescription.replace(call, "").replace(` ${branchNote}`, "")].find(
    (d) => d.length <= 160
  ) ?? rawDescription.replace(call, "");

  const branchText = `${location} is served by our ${branch.area}, ${branch.city} branch (${branchFullAddress(branch)}). All branches are open ${BUSINESS.hours.label.replace("Mon – Sun: ", "Monday to Sunday, ")}.`;
  const faqs = buildFaqs(svc, location, localities, branchText);

  const nearby = (loc?.nearby ?? [])
    .map((slug) => getLocation(slug))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const mapQuery = encodeURIComponent(`${location}, ${loc?.parentCity ? `${loc.parentCity}, ` : ""}${state}`);

  const structuredData = graph(
    webPageNode({ path: pagePath, title: h1, description: seoDescription, image: svc.ogImage }),
    ...(loc
      ? [serviceNode({ service: svc, path: pagePath, name: h1, description: seoDescription, location: loc, branch })]
      : []),
    faqNode(faqs, pagePath)
  );

  return (
    <Layout>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        ogImage={svc.ogImage}
        ogImageAlt={h1}
        canonicalUrl={pagePath}
        structuredData={structuredData}
      />

      {/* Hero */}
      <section className="hero-gradient py-8 md:py-20">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: svc.name, href: `/${serviceSlug}` },
              { label: location },
            ]}
            darkMode={true}
          />

          <div className="mt-6 max-w-4xl md:mt-8">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-white/80">
              <CityBadge city={location} state={state} />
              {loc?.parentCity && <span className="text-sm">{loc.parentCity}</span>}
            </div>
            <h1 className="mb-6 font-heading text-3xl font-bold text-white md:text-5xl lg:text-6xl">{h1}</h1>
            <p className="mb-8 text-lg text-white/80 md:text-xl">{intro}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="cta-gradient" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  {isDealer ? "Enquire for Dealership" : "Get Free Site Visit"} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                asChild
              >
                <a href={`tel:${PHONES.primary.e164}`} data-track="call" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" /> {PHONES.primary.display}
                </a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white">
              <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
                {serviceSlug === "ceiling-cloth-hanger" ? "5-year warranty" : isDealer ? "Genuine SS316 material" : "10-year warranty"}
              </span>
              <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                {BUSINESS.hours.short}
              </span>
              <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                {branch.area} branch
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Answer-first summary (what AI answers & featured snippets quote) */}
      <section className="section-bg-1 relative py-12 md:py-16">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative z-10">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
                {svc.seoName} in {location} – quick answer
              </h2>
              <p className="mb-4 text-muted-foreground">
                {BUSINESS.name} provides {svc.seoName.toLowerCase()} in {location}, {state}, covering {topAreas}{" "}
                and nearby areas. {svc.summary}
              </p>
              <p className="mb-6 text-muted-foreground">
                Customers in {location} are served by our{" "}
                <strong className="text-foreground">
                  {branch.area}, {branch.city}
                </strong>{" "}
                branch{sameCityBranch ? ", so site visits are quick to arrange" : ""}. Call{" "}
                <a href={`tel:${PHONES.primary.e164}`} data-track="call" className="font-semibold text-primary hover:underline">
                  {PHONES.primary.display}
                </a>{" "}
                or{" "}
                <a href={`tel:${PHONES.secondary.e164}`} data-track="call" className="font-semibold text-primary hover:underline">
                  {PHONES.secondary.display}
                </a>{" "}
                – we're open {BUSINESS.hours.label.replace("Mon – Sun: ", "every day, ")}.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {svc.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-foreground">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 shadow-lg lg:col-span-2">
              <h3 className="mb-4 font-heading text-lg font-semibold text-white">
                {isDealer ? "Dealer details" : "Specifications"}
              </h3>
              <dl className="space-y-3 text-sm">
                {specsFor(serviceSlug).map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-4 border-b border-white/10 pb-2">
                    <dt className="text-white/60">{spec.label}</dt>
                    <dd className="text-right font-medium text-white">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Why us + areas */}
      <section className="section-bg-2 relative py-12 md:py-16">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="container relative z-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-heading text-2xl font-bold text-white md:text-3xl">
                Why choose us for {svc.seoName.toLowerCase()} in {location}?
              </h2>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-white/90">{benefit}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mb-4 mt-10 font-heading text-xl font-semibold text-white">
                {isDealer ? `How dealership works in ${location}` : `How installation works in ${location}`}
              </h3>
              <ol className="space-y-3 text-white/80">
                {(isDealer
                  ? [
                      `Call or WhatsApp us with your business details in ${location}.`,
                      "We discuss monthly volumes, product range and territory.",
                      "You receive dealer pricing, samples and installation training.",
                      `Regular supply is dispatched from our ${branch.city} branch.`,
                    ]
                  : [
                      `Call or WhatsApp to book a free site visit anywhere in ${location}.`,
                      "We measure on site and give a written quote the same day.",
                      `Our ${branch.area} branch team installs on your chosen date – ${installTime(serviceSlug).split(";")[0]}.`,
                      `We hand over with ${warranty(serviceSlug)} and care instructions.`,
                    ]
                ).map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 font-heading text-xl font-semibold text-white">Areas we serve in {location}</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {localities.map((locality) => (
                    <li key={locality} className="flex items-center gap-2 text-white/80">
                      <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{locality}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-heading text-lg font-semibold text-white">Your nearest branch</h3>
                <BranchCard branch={branch} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-bg-1 relative py-8 md:py-12">
        <div className="container relative z-10">
          <h2 className="mb-6 text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
            Our service area in {location}
          </h2>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src={`https://maps.google.com/maps?q=${mapQuery}&z=12&output=embed`}
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${location}, ${state}`}
            />
          </div>
        </div>
      </section>

      {/* Local FAQs (visible + FAQPage schema) */}
      <section className="section-bg-3 relative py-12 md:py-16">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative z-10">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
            {svc.seoName} in {location} – FAQs
          </h2>
          <Accordion type="single" className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                defaultOpen={i === 0}
                className="rounded-xl border border-white/10 bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] px-5"
              >
                <AccordionTrigger className="text-left font-heading text-base font-semibold text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/75">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Internal links: other services here + same service nearby */}
      <section className="section-bg-2 relative py-12 md:py-16">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="container relative z-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 font-heading text-2xl font-bold text-white">Other services in {location}</h2>
            <div className="grid gap-3">
              {SERVICES.filter((s) => s.slug !== serviceSlug).map((s) => (
                <Link
                  key={s.slug}
                  to={`/${s.slug}-${locationSlug}`}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/10"
                >
                  <span className="font-medium text-white">
                    {s.seoName} in {location}
                  </span>
                  <ArrowRight className="h-4 w-4 text-accent" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          {nearby.length > 0 && (
            <div>
              <h2 className="mb-6 font-heading text-2xl font-bold text-white">
                {svc.seoName} near {location}
              </h2>
              <div className="grid gap-3">
                {nearby.map((n) => (
                  <Link
                    key={n.slug}
                    to={`/${serviceSlug}-${n.slug}`}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    <span className="font-medium text-white">
                      {svc.seoName} in {n.city}
                    </span>
                    <ArrowRight className="h-4 w-4 text-accent" aria-hidden="true" />
                  </Link>
                ))}
                <a
                  href={whatsappLink(`Hi, I need ${service.toLowerCase()} in ${location}.`)}
                  data-track="whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 p-4 text-white transition-all hover:bg-[#25D366]/20"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp us about {location}
                  </span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
