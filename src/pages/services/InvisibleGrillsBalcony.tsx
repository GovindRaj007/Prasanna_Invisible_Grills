import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SEOHead } from "@/components/common/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, ArrowRight, CheckCircle2, Fence, Eye, Shield, Wind, Ruler, Sparkles } from "lucide-react";
import { InvisibleGrillsBalconyFAQ } from "@/components/faq/InvisibleGrillsBalconyFAQ";
import { ServiceImageSlider } from "@/components/services/ServiceImageSlider";

import heroBalconyGrill from "@/assets/hero-balcony-grill.jpg";
import heroInvisibleGrills from "@/assets/hero-invisible-grills.jpg";
import balconyGrill from "@/assets/balcony-invisible-grills.jpg";

const benefits = [
  "Unobstructed panoramic views from your balcony",
  "Child and pet safety with invisible protection",
  "316 marine-grade stainless steel cables",
  "Weather-resistant for all Indian climates",
  "Custom-fit installation for any balcony size",
  "10-year manufacturer warranty",
];

const features = [
  { icon: Eye, title: "Crystal Clear Views", description: "Ultra-thin cables maintain your balcony's open feel while providing complete safety." },
  { icon: Shield, title: "Maximum Safety", description: "High-tensile stainless steel cables rated for 200+ kg load capacity." },
  { icon: Wind, title: "All-Weather Durability", description: "Marine-grade 316 stainless steel resists corrosion from rain and humidity." },
  { icon: Ruler, title: "Perfect Custom Fit", description: "Every balcony is measured precisely for perfect cable spacing." },
  { icon: Fence, title: "Aesthetic Enhancement", description: "Modern design that complements contemporary architecture." },
  { icon: Sparkles, title: "Easy Maintenance", description: "Simple cleaning with water and mild soap. No painting required." },
];

const applications = [
  { title: "High-Rise Apartments", description: "Essential safety for balconies above the 2nd floor.", image: "🏢" },
  { title: "Villa Balconies", description: "Premium invisible grills that enhance your villa's architecture.", image: "🏠" },
  { title: "Terrace Gardens", description: "Protect terrace perimeters without blocking the open-air feel.", image: "🌿" },
  { title: "Commercial Spaces", description: "Restaurants, cafes, and office balconies benefit from safe transparent protection.", image: "🏬" },
];

const serviceImages = [
  { src: heroBalconyGrill, alt: "Invisible Grills for Balcony" },
  { src: heroInvisibleGrills, alt: "Premium Balcony Safety" },
  { src: balconyGrill, alt: "Modern Grill Solutions" },
];

export default function InvisibleGrillsBalcony() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Balcony Invisible Grill Installation",
    name: "Invisible Grills for Balcony",
    description: "Premium invisible grill installation for balconies. Provides child and pet safety with crystal clear unobstructed views. 316 marine-grade stainless steel cables, weather-resistant design, 10-year warranty.",
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
      description: "Professional balcony grill installation with 10-year warranty"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150"
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Balcony Grills | Invisible Safety Railings"
        description="Child-safe balcony grills with unobstructed views. Marine-grade stainless steel. Professional installation. 10-year warranty. 4.9★ rated."
        keywords="balcony grills, invisible balcony grills, balcony safety grills, child safety railings, balcony protection"
        ogImage="/images/balcony-grill-hero.jpg"
        canonicalUrl="/invisible-grills-balcony"
        structuredData={structuredData}
      />

      <section className="relative py-16 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBalconyGrill} alt="Invisible Grills for Balcony" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,8%,0.95)] via-[hsl(222,47%,10%,0.88)] to-[hsl(222,47%,10%,0.75)]" />
        </div>
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="container mt-[-2rem] relative z-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/" }, { label: "Invisible Grills for Balcony" }]} darkMode />
          <div className="mx-auto mt-8 max-w-4xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
              <Fence className="h-4 w-4 text-accent" /> Balcony Safety Specialist
            </span>
            <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl">Invisible Grills for Balcony</h1>
            <p className="mb-8 text-lg text-white/80 md:text-xl">
              Transform your balcony into a safe, open space with our premium invisible grills.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="cta-gradient text-white" asChild>
                <Link to="/contact" className="flex items-center gap-2">Get Free Quote <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                <a href="tel:+917339306098" className="flex items-center gap-2"><Phone className="h-5 w-5" /> Call: +91 73393 06098</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceImageSlider images={serviceImages} />

      <section className="section-bg-2 py-16 md:py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">Why Choose Us</span>
              <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">Premium Balcony Protection</h2>
              <p className="mb-8 text-lg text-white/80">Our invisible grills for balconies combine safety, aesthetics, and durability.</p>
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

      <section className="section-bg-3 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Applications</span>
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">Perfect for Every Balcony Type</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {applications.map((app, index) => (
              <div key={index} className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 border border-white/10 text-center">
                <span className="mb-4 inline-block text-4xl">{app.image}</span>
                <h3 className="mb-3 font-heading text-lg font-semibold text-white">{app.title}</h3>
                <p className="text-sm text-white/70">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-bg-4 py-16 md:py-20">
        <div className="container">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold text-white">Balcony Grills by Location</h2>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-4">
            {[
              { name: "Visakhapatnam", slug: "visakhapatnam" },
              { name: "Vijayawada", slug: "vijayawada" },
              { name: "Guntur", slug: "guntur" },
              { name: "Tirupati", slug: "tirupati" },
              { name: "Anantapur", slug: "anantapur" },
              { name: "Hyderabad", slug: "hyderabad" },
              { name: "Secunderabad", slug: "secunderabad" },
              { name: "Warangal", slug: "warangal" },
            ].map((loc) => (
              <Link key={loc.slug} to={`/invisible-grills-balcony-${loc.slug}`}
                className="flex items-center justify-between rounded-xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1 border border-white/10">
                <span className="font-medium text-white">{loc.name}</span>
                <ArrowRight className="h-4 w-4 text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InvisibleGrillsBalconyFAQ />

      <section className="section-bg-6 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">Ready to Protect Your Balcony?</h2>
            <p className="mb-8 text-lg text-white/80">Get a free site visit and quotation.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="cta-gradient text-white" asChild>
                <Link to="/contact" className="flex items-center gap-2">Book Free Site Visit <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                <a href="tel:+917339306098">Call: +91 73393 06098</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
