import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SEOHead } from "@/components/common/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, ArrowRight, CheckCircle2, Grid3X3, Eye, Shield, Wind, Ruler, Sparkles } from "lucide-react";
import { InvisibleGrillsWindowsFAQ } from "@/components/faq/InvisibleGrillsWindowsFAQ";
import { ServiceImageSlider } from "@/components/services/ServiceImageSlider";

import heroWindowGrill from "@/assets/hero-window-grill.jpg";
import heroInvisibleGrills from "@/assets/window-invisible-grill.jpg";
import windowGrill from "@/assets/service-invisible-grills-3.jpg";

const benefits = [
  "Complete child and pet safety for all windows",
  "Unobstructed views and natural light",
  "316 marine-grade stainless steel cables",
  "Allows full ventilation unlike traditional grills",
  "Custom-fit for sliding, casement, and French windows",
  "10-year manufacturer warranty",
];

const features = [
  { icon: Eye, title: "Crystal Clear Views", description: "Ultra-thin cables are virtually invisible, maintaining your window's aesthetics." },
  { icon: Shield, title: "Maximum Safety", description: "High-tensile stainless steel cables rated for 200+ kg load capacity." },
  { icon: Wind, title: "Full Ventilation", description: "Unlike traditional iron grills, invisible grills allow complete airflow." },
  { icon: Ruler, title: "Custom Fit Design", description: "Every window is measured precisely. We work with all window types." },
  { icon: Grid3X3, title: "Modern Aesthetics", description: "Sleek, contemporary design that enhances your home's exterior." },
  { icon: Sparkles, title: "Low Maintenance", description: "Simple cleaning with water and mild soap. No rusting, no painting." },
];

const windowTypes = [
  { title: "Sliding Windows", description: "Custom frames that accommodate the sliding mechanism.", image: "🪟" },
  { title: "Casement Windows", description: "Designed to work with outward-opening casement windows.", image: "🚪" },
  { title: "French Windows", description: "Elegant solutions for floor-to-ceiling French windows.", image: "🏠" },
  { title: "Fixed Glass Windows", description: "Simple, permanent installation for fixed glass panels.", image: "🖼️" },
];

const locations = [
  { name: "Visakhapatnam", slug: "visakhapatnam" },
  { name: "Rajahmundry", slug: "rajahmundry" },
  { name: "Vijayawada", slug: "vijayawada" },
  { name: "Guntur", slug: "guntur" },
  { name: "Tirupati", slug: "tirupati" },
  { name: "Anantapur", slug: "anantapur" },
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Secunderabad", slug: "secunderabad" },
  { name: "Gachibowli", slug: "gachibowli" },
  { name: "Kukatpally", slug: "kukatpally" },
  { name: "Madhapur", slug: "madhapur" },
  { name: "Warangal", slug: "warangal" },
];

const serviceImages = [
  { src: heroWindowGrill, alt: "Invisible Grill for Windows" },
  { src: heroInvisibleGrills, alt: "Modern Window Protection" },
  { src: windowGrill, alt: "Safety Grill Solutions" },
];

export default function InvisibleGrillsWindows() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Window Invisible Grill Installation",
    name: "Invisible Grills for Windows",
    description: "Professional invisible grill installation for windows. Provides child safety, burglar prevention, and pet containment while maintaining crystal clear views. 316 marine-grade stainless steel, easy maintenance, 10-year warranty.",
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
      price: "On Request",
      description: "Professional window grill installation with 10-year warranty"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 150,
      bestRating: 5,
      worstRating: 1
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Window Grills | Invisible Safety Grilles"
        description="Window safety grills with invisible design. Burglar prevention, child safety & pet containment. Expert installation. 10-year warranty."
        keywords="window grills, invisible window grills, window safety, burglar prevention grills, child safety windows"
        ogImage="/images/window-grill-hero.jpg"
        canonicalUrl="/invisible-grills-windows"
        structuredData={structuredData}
      />

      <section className="relative py-16 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroWindowGrill} alt="Invisible Grill for Windows" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,8%,0.95)] via-[hsl(222,47%,10%,0.88)] to-[hsl(222,47%,10%,0.75)]" />
        </div>
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="container mt-[-2rem] relative z-10">
          <Breadcrumbs items={[{ label: "Services", href: "/" }, { label: "Invisible Grill for Windows" }]} darkMode />
          <div className="mx-auto mt-8 max-w-4xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
              <Grid3X3 className="h-4 w-4 text-accent" /> Window Safety Specialist
            </span>
            <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl">Invisible Grill for Windows</h1>
            <p className="mb-8 text-lg text-white/80 md:text-xl">
              Secure your windows with virtually invisible grills. Maximum safety while maintaining clear views.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="cta-gradient text-white" asChild>
                <Link to="/contact" className="flex items-center gap-2">Get Free Quote <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                <a href="tel:+917339306098" data-track="call" className="flex items-center gap-2"><Phone className="h-5 w-5" /> Call: +91 73393 06098</a>
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
              <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">Premium Window Protection</h2>
              <p className="mb-8 text-lg text-white/80">Our invisible grills for windows combine safety, aesthetics, and durability.</p>
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
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Window Types</span>
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">Solutions for Every Window</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {windowTypes.map((type, index) => (
              <div key={index} className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 border border-white/10 text-center">
                <span className="mb-4 inline-block text-4xl">{type.image}</span>
                <h3 className="mb-3 font-heading text-lg font-semibold text-white">{type.title}</h3>
                <p className="text-sm text-white/70">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-bg-4 py-16 md:py-20">
        <div className="container">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold text-white">Window Grills by Location</h2>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-4">
            {locations.map((loc) => (
              <Link key={loc.slug} to={`/invisible-grills-windows-${loc.slug}`}
                className="flex items-center justify-between rounded-xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1 border border-white/10">
                <span className="font-medium text-white">{loc.name}</span>
                <ArrowRight className="h-4 w-4 text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InvisibleGrillsWindowsFAQ />


      <section className="section-bg-6 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">Ready to Secure Your Windows?</h2>
            <p className="mb-8 text-lg text-white/80">Get a free site visit and quotation.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="cta-gradient text-white" asChild>
                <Link to="/contact" className="flex items-center gap-2">Book Free Site Visit <ArrowRight className="h-5 w-5" /></Link>
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
