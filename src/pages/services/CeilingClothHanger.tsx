import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SEOHead } from "@/components/common/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, ArrowRight, CheckCircle2, Shirt, ArrowUpDown, Maximize2, Droplets, Hammer, Timer } from "lucide-react";
import { CeilingClothHangerFAQ } from "@/components/faq/CeilingClothHangerFAQ";
import { ServiceImageSlider } from "@/components/services/ServiceImageSlider";

import heroCeilingHanger from "@/assets/hero-ceiling-hanger.jpg";
import ceilingHanger2 from "@/assets/ceiling-hanger-2.jpg";

const benefits = [
  "Space-saving pulley system for small balconies",
  "Heavy-duty capacity - holds 40+ kg of wet clothes",
  "Rust-proof stainless steel construction",
  "Easy lift-and-lower mechanism",
  "Dries clothes faster with ceiling height airflow",
  "5-year warranty on all components",
];

const features = [
  { icon: ArrowUpDown, title: "Pulley Lift System", description: "Smooth pulley mechanism to easily raise and lower the hanger." },
  { icon: Maximize2, title: "Space Optimization", description: "Utilize ceiling space efficiently for small apartments." },
  { icon: Droplets, title: "Quick Drying", description: "Elevated position allows better air circulation." },
  { icon: Hammer, title: "Durable Construction", description: "Heavy-gauge stainless steel pipes with rust-proof finish." },
  { icon: Shirt, title: "Multiple Rods", description: "Available in 4-rod, 6-rod, and 8-rod configurations." },
  { icon: Timer, title: "Quick Installation", description: "Professional installation completed in 2-3 hours." },
];

const configurations = [
  { title: "4-Rod Economy", size: "4 feet × 2 feet", capacity: "Up to 25 kg", ideal: "1-2 BHK apartments" },
  { title: "6-Rod Standard", size: "5 feet × 2.5 feet", capacity: "Up to 35 kg", ideal: "2-3 BHK apartments" },
  { title: "8-Rod Premium", size: "6 feet × 3 feet", capacity: "Up to 50 kg", ideal: "Large families/villas" },
];

const serviceImages = [
    {src: ceilingHanger2, alt: "Ceiling Cloth Hanger in Installation" },
  { src: heroCeilingHanger, alt: "Ceiling Cloth Hanger Use" },
];

export default function CeilingClothHanger() {
  const structuredData = {
    "@context": "https://schema.org", "@type": "Product",
    name: "Ceiling Cloth Hanger",
    description: "Premium ceiling-mounted cloth drying system with pulley mechanism.",
    brand: { "@type": "Brand", name: "Prasanna" },
    offers: { "@type": "AggregateOffer", priceCurrency: "INR", lowPrice: "2499", availability: "https://schema.org/InStock" },
  };

  return (
    <Layout>
      <SEOHead
        title="Ceiling Cloth Hanger | Pulley Cloth Drying System"
        description="Premium ceiling cloth hanger with pulley system. Space-saving cloth drying solution for apartments. Rust-proof, 40+ kg capacity, 5-year warranty."
        keywords="ceiling cloth hanger, pulley cloth hanger, ceiling cloth dryer, balcony cloth hanger"
        canonicalUrl="/ceiling-cloth-hanger"
        structuredData={structuredData}
      />

      <section className="relative py-16 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCeilingHanger} alt="Ceiling Cloth Hanger Installation" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,8%,0.95)] via-[hsl(222,47%,10%,0.88)] to-[hsl(222,47%,10%,0.75)]" />
        </div>
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="container mt-[-2rem] relative z-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/" }, { label: "Ceiling Cloth Hanger" }]} darkMode />
          <div className="mx-auto mt-8 max-w-4xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
              <Shirt className="h-4 w-4 text-accent" /> Home Utility Solutions
            </span>
            <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl">Ceiling Cloth Hanger</h1>
            <p className="mb-8 text-lg text-white/80 md:text-xl">
              Maximize your space with our premium ceiling-mounted cloth drying systems.
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
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">Why Ceiling Hangers</span>
              <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">Smart Drying Solution for Modern Homes</h2>
              <p className="mb-8 text-lg text-white/80">Our ceiling cloth hangers are the perfect solution for apartments with limited balcony space.</p>
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
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Configurations</span>
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">Choose Your Perfect Size</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {configurations.map((config, index) => (
              <div key={index} className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 border border-white/10">
                <h3 className="mb-4 font-heading text-xl font-semibold text-white">{config.title}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between"><span className="text-white/60">Size:</span><span className="text-white">{config.size}</span></div>
                  <div className="flex justify-between"><span className="text-white/60">Capacity:</span><span className="text-white">{config.capacity}</span></div>
                  <div className="flex justify-between"><span className="text-white/60">Ideal for:</span><span className="text-white">{config.ideal}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-bg-4 py-16 md:py-20">
        <div className="container">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold text-white">Ceiling Hangers by Location</h2>
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
              <Link key={loc.slug} to={`/ceiling-cloth-hanger-${loc.slug}`}
                className="flex items-center justify-between rounded-xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1 border border-white/10">
                <span className="font-medium text-white">{loc.name}</span>
                <ArrowRight className="h-4 w-4 text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CeilingClothHangerFAQ />

      <section className="section-bg-6 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">Ready to Save Space?</h2>
            <p className="mb-8 text-lg text-white/80">Get a free consultation and find the perfect ceiling cloth hanger.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="cta-gradient text-white" asChild>
                <Link to="/contact" className="flex items-center gap-2">Book Installation <ArrowRight className="h-5 w-5" /></Link>
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
