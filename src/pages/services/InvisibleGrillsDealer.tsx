import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SEOHead } from "@/components/common/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, ArrowRight, CheckCircle2, Store, Award, TrendingUp, Users, Truck, Package } from "lucide-react";
import { InvisibleGrillsDealerFAQ } from "@/components/faq/InvisibleGrillsDealerFAQ";
import { SERVICE_SEO_KEYWORDS, SERVICES } from "@/config/seo.constants";
import { ServiceImageSlider } from "@/components/services/ServiceImageSlider";

import heroDealer from "@/assets/hero-dealer.jpg";
import dealerInventory1 from "@/assets/invisible-grills-dealer-1.jpg";
import dealerInventory2 from "@/assets/invisible-grills-dealer-2.jpg";
import dealerInventory3 from "@/assets/invisible-grills-dealer-3.jpg";
import dealerInventory4 from "@/assets/invisible-grills-dealer-4.jpg";

const benefits = [
  "Official authorized dealership with genuine products",
  "Bulk order discounts for contractors and builders",
  "Complete technical support and installation training",
  "Marketing materials and lead generation support",
  "Exclusive territory rights available",
  "Quick dispatch and delivery across South India",
];

const features = [
  { icon: Store, title: "Authorized Dealership", description: "Become an official dealer with exclusive rights in your area." },
  { icon: Package, title: "Wholesale Pricing", description: "Competitive wholesale rates for bulk orders." },
  { icon: Award, title: "Quality Assurance", description: "All products come with manufacturer warranty." },
  { icon: Users, title: "Training & Support", description: "Complete installation training for your team." },
  { icon: Truck, title: "Pan-India Delivery", description: "Quick dispatch across AP, Telangana, and neighboring states." },
  { icon: TrendingUp, title: "Business Growth", description: "Marketing support and lead sharing in your territory." },
];

const dealershipTypes = [
  { title: "Retail Dealer", description: "Perfect for hardware stores and home improvement centers.", minOrder: "50 running feet/month" },
  { title: "Contractor Partner", description: "Ideal for contractors who want direct material access.", minOrder: "100 running feet/month" },
  { title: "Exclusive Distributor", description: "Territory-exclusive distribution rights with maximum benefits.", minOrder: "500 running feet/month" },
];

const serviceImages = [
  { src: heroDealer, alt: "Invisible Grills Dealership" },
  { src: dealerInventory1, alt: "Dealer Inventory Products" },
  { src: dealerInventory2, alt: "Wholesale Invisible Grill wire" },
  { src: dealerInventory3, alt: "Dealer Showroom items" },
  { src: dealerInventory4, alt: "Dealer installation items" },
];

export default function InvisibleGrillsDealer() {
  const serviceMeta = SERVICES.find((s) => s.slug === "invisible-grills-dealer");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Dealership & Wholesale Opportunity",
    name: "Invisible Grills Dealership & Wholesale",
    description: "Become an authorized invisible grills dealer with exclusive territory rights. Access wholesale pricing, professional training, marketing support, and bulk order benefits. Perfect for hardware stores, contractors, and distributors.",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Prasanna Invisible Grills",
      telephone: "+917339306098",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Visakhapatnam",
        addressRegion: "Andhra Pradesh",
        addressCountry: "IN"
      }
    },
    areaServed: [
      { "@type": "City", "name": "Visakhapatnam" },
      { "@type": "City", "name": "Rajahmundry" },
      { "@type": "City", "name": "Vijayawada" },
      { "@type": "City", "name": "Guntur" },
      { "@type": "City", "name": "Tirupati" },
      { "@type": "City", "name": "Anantapur" },
      { "@type": "City", "name": "Hyderabad" },
      { "@type": "City", "name": "Mahbubnagar" },
      { "@type": "City", "name": "Warangal" },
      { "@type": "City", "name": "Telangana" }
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      description: "Wholesale pricing with exclusive territory rights"
    }
  };

  return (
    <Layout>
      <SEOHead
        title={`${serviceMeta?.name || "Invisible Grills Dealer Program"} | Prasanna`}
        description={serviceMeta?.longDescription || "Become an authorized invisible grills dealer with wholesale pricing, training, and exclusive territory rights. Grow your business in Hyderabad, Andhra Pradesh, and Telangana with trusted support."}
        keywords={SERVICE_SEO_KEYWORDS.dealer.join(", ")}
        ogImage="/og-images/invisible-grills-dealer-og.jpg"
        canonicalUrl="/invisible-grills-dealer"
        structuredData={structuredData}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroDealer} alt="Invisible Grills Dealership" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,8%,0.95)] via-[hsl(222,47%,10%,0.88)] to-[hsl(222,47%,10%,0.75)]" />
        </div>
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="container mt-[-2rem] relative z-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/" }, { label: "Invisible Grills Dealer" }]} darkMode />
          <div className="mx-auto mt-8 max-w-4xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
              <Store className="h-4 w-4 text-accent" /> Dealership Opportunity
            </span>
            <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl">Invisible Grills Dealership & Wholesale</h1>
            <p className="mb-8 text-lg text-white/80 md:text-xl">
              Partner with Prasanna Invisible Grills for authorized dealership. Access wholesale pricing, training, and exclusive territory rights.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="cta-gradient text-white" asChild>
                <Link to="/contact" className="flex items-center gap-2">Apply for Dealership <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                <a href="tel:+917339306098" data-track="call" className="flex items-center gap-2"><Phone className="h-5 w-5" /> Call: +91 73393 06098</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceImageSlider images={serviceImages} />

      {/* Benefits */}
      <section className="section-bg-2 py-16 md:py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">Dealer Benefits</span>
              <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">Why Partner With Prasanna?</h2>
              <p className="mb-8 text-lg text-white/80">Join our growing network of successful dealers across South India.</p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-white/90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.slice(0, 4).map((feature, index) => (
                <div key={index} className="rounded-xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 border border-white/10">
                  <feature.icon className="mb-4 h-8 w-8 text-accent" />
                  <h3 className="mb-2 font-heading text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dealership Types */}
      <section className="section-bg-3 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Partnership Options</span>
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">Choose Your Partnership Level</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {dealershipTypes.map((type, index) => (
              <div key={index} className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 border border-white/10">
                <h3 className="mb-3 font-heading text-xl font-semibold text-white">{type.title}</h3>
                <p className="mb-4 text-white/70">{type.description}</p>
                <div className="rounded-lg bg-white/5 px-4 py-2">
                  <span className="text-sm text-white/60">Min. Order: </span>
                  <span className="text-sm font-medium text-accent">{type.minOrder}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-bg-4 py-16 md:py-20">
        <div className="container">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold text-white">Dealer Network by Location</h2>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-4">
            {[
              { name: "Visakhapatnam", slug: "visakhapatnam" },
              { name: "Rajahmundry", slug: "rajahmundry" },
              { name: "Vijayawada", slug: "vijayawada" },
              { name: "Guntur", slug: "guntur" },
              { name: "Tirupati", slug: "tirupati" },
              { name: "Anantapur", slug: "anantapur" },
              { name: "Hyderabad", slug: "hyderabad" },
              { name: "Secunderabad", slug: "secunderabad" },
              { name: "Warangal", slug: "warangal" },
            ].map((loc) => (
              <Link key={loc.slug} to={`/invisible-grills-dealer-${loc.slug}`}
                className="flex items-center justify-between rounded-xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1 border border-white/10">
                <span className="font-medium text-white">{loc.name}</span>
                <ArrowRight className="h-4 w-4 text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InvisibleGrillsDealerFAQ />

      <section className="section-bg-6 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">Ready to Become a Dealer?</h2>
            <p className="mb-8 text-lg text-white/80">Contact us today to discuss dealership opportunities.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="cta-gradient text-white" asChild>
                <Link to="/contact" className="flex items-center gap-2">Apply Now <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                <a href="tel:+917339306098" data-track="call">Call: +91 73393 06098</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
