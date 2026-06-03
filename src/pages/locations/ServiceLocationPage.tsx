import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SEOHead } from "@/components/common/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  CheckCircle2,
  ArrowRight,
  Star,
  Building,
} from "lucide-react";
import { CTASection } from "@/components/home/CTASection";
import { getSiteUrl } from "@/lib/getSiteUrl";

interface ServiceLocationProps {
  service: string;
  serviceSlug: string;
  location: string;
  locationSlug: string;
  description: string;
  localities: string[];
  benefits: string[];
  mapEmbedUrl: string;
}

const services = [
  { name: "Invisible Grills", slug: "invisible-grills" },
  { name: "Invisible Grills Dealer", slug: "invisible-grills-dealer" },
  { name: "Invisible Grills for Balcony", slug: "invisible-grills-balcony" },
  { name: "Invisible Grill for Windows", slug: "invisible-grills-windows" },
  { name: "Ceiling Cloth Hanger", slug: "ceiling-cloth-hanger" },
];

export function ServiceLocationPage({
  service,
  serviceSlug,
  location,
  locationSlug,
  description,
  localities,
  benefits,
  mapEmbedUrl,
}: ServiceLocationProps) {
  const siteUrl = getSiteUrl();
  const pageTitle = `${service} in ${location}`;
  const pageUrl = `/${serviceSlug}-${locationSlug}`;
  
  // SEO-optimized title (50-60 chars) and description (150-160 chars) following Yoast guidelines
  const seoTitle = `${service} in ${location} | Prasanna`;
  
  const seoDescription = `${service} in ${location}. Expert installation with 316 stainless steel materials. Serving ${localities[0]}, ${localities[1] || location} & nearby areas. 10-year warranty. Free quotes.`;
  
  const seoKeywords = `${service.toLowerCase()} ${location.toLowerCase()}, best ${service.toLowerCase()} in ${location}, ${service.toLowerCase()} near me, professional ${service.toLowerCase()}, ${service.toLowerCase()} installation, affordable ${service.toLowerCase()}, expert ${service.toLowerCase()}`;

  // Determine OG image based on service slug - use service-specific images
  const getOgImage = (slug: string): string => {
    switch (slug) {
      case "invisible-grills":
        return "/og-images/invisible-grills-og.jpg";
      case "invisible-grills-dealer":
        return "/og-images/invisible-grills-dealer-og.jpg";
      case "invisible-grills-balcony":
        return "/og-images/balcony-invisible-grills-og.jpg";
      case "invisible-grills-windows":
        return "/og-images/window-invisible-grills-og.jpg";
      case "ceiling-cloth-hanger":
        return "/og-images/ceiling-cloth-hanger-og.jpg";
      default:
        return "/og-images/prasanna-invisible-grills-og.jpg";
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Prasanna Invisible Grills - ${location}`,
    image: `${siteUrl}${getOgImage(serviceSlug)}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location,
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.7231",
      longitude: "83.0512"
    },
    telephone: "+917339306098",
    email: "info@prasannainvisible.in",
    url: siteUrl,
    sameAs: ["https://facebook.com", "https://instagram.com"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services in ${location}`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Invisible Grill Installation"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Balcony Invisible Grills"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Window Invisible Grills"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ceiling Cloth Hanger"
          }
        }
      ]
    }
  };

  return (
    <Layout>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        ogImage={getOgImage(serviceSlug)}
        canonicalUrl={pageUrl}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="hero-gradient py-8 md:py-20">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: service, href: `/${serviceSlug}` },
              { label: location },
            ]}
            darkMode={true}
          />
          
          <div className="mt-8 max-w-4xl">
            <div className="mb-4 flex items-center gap-2 text-white/80">
              <MapPin className="h-5 w-5" />
              <span>Serving {location} & surrounding areas</span>
            </div>
            <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {pageTitle}
            </h1>
            <p className="mb-8 text-xl text-white/80">{description}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="cta-gradient" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Get Free Quote <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                asChild
              >
              <a href="tel:+917339306098" data-track="call" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" /> Call Now
                </a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                <Star className="h-4 w-4 fill-accent text-accent" />
                4.9 Rating in {location}
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                <Building className="h-4 w-4" />
                500+ Installations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us in This Location */}
      <section className="section-bg-1 relative py-16 md:py-24">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-heading text-3xl font-bold text-foreground md:text-4xl">
                Why Choose Us for {service} in {location}?
              </h2>
              <p className="mb-8 text-muted-foreground">
                As the leading provider of {service.toLowerCase()} in {location}, we understand 
                the unique requirements of local residential and commercial properties. Our team 
                has extensive experience serving clients across {location} and nearby areas.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas Covered */}
            <div className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-8 shadow-lg border border-white/10">
              <h3 className="mb-6 font-heading text-xl font-semibold text-white">
                Areas We Serve in {location}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {localities.map((locality, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-white/80"
                  >
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>{locality}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-white/60">
                Don't see your area? Contact us – we likely serve your location too!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-bg-2 relative py-8 md:py-12">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="container relative z-10">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold text-white">
            Our Service Area in {location}
          </h2>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Service area map for ${location}`}
            />
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-bg-3 relative py-16 md:py-24">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative z-10">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold text-foreground">
            Other Services in {location}
          </h2>
          <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
            {services
              .filter((s) => s.slug !== serviceSlug)
              .map((s) => (
                <Link
                  key={s.slug}
                  to={`/${s.slug}-${locationSlug}`}
                  className="flex items-center justify-between rounded-xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1 border border-white/10"
                >
                  <span className="font-medium text-white">{s.name} in {location}</span>
                  <ArrowRight className="h-4 w-4 text-accent" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
