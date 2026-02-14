import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SEOHead } from "@/components/common/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Shield,
  Eye,
  Wrench,
  Award,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";
import { InvisibleGrillsFAQ } from "@/components/faq/InvisibleGrillsFAQ";
import { CTASection } from "@/components/home/CTASection";
import { ServiceImageSlider } from "@/components/services/ServiceImageSlider";

import heroInvisibleGrills from "@/assets/hero-invisible-grills.jpg";
import heroBalconyGrill from "@/assets/hero-balcony-grill.jpg";
import heroWindowGrill from "@/assets/hero-window-grill.jpg";

const features = [
  {
    icon: Shield,
    title: "Maximum Safety",
    description: "Withstands up to 600kg of impact force, providing robust protection for your family.",
  },
  {
    icon: Eye,
    title: "Virtually Invisible",
    description: "2mm stainless steel cables are barely visible, maintaining your view and aesthetics.",
  },
  {
    icon: Wrench,
    title: "Easy Installation",
    description: "Professional installation completed in 4-8 hours with minimal disruption.",
  },
  {
    icon: Award,
    title: "10-Year Warranty",
    description: "Comprehensive warranty covering materials and workmanship for complete peace of mind.",
  },
];

const applications = [
  "Balcony Safety",
  "Window Protection",
  "Staircase Railings",
  "Terrace Barriers",
  "Swimming Pool Fencing",
  "Commercial Buildings",
];

const specifications = [
  { label: "Cable Material", value: "316 Marine Grade Stainless Steel" },
  { label: "Cable Diameter", value: "2mm / 3mm options" },
  { label: "Cable Spacing", value: "2-3 inches (customizable)" },
  { label: "Frame Material", value: "Powder-coated Aluminum" },
  { label: "Breaking Strength", value: "600+ kg per cable" },
  { label: "Corrosion Resistance", value: "High (Marine Grade)" },
];

const locations = [
  { name: "Visakhapatnam", slug: "visakhapatnam" },
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
  { src: heroInvisibleGrills, alt: "Invisible Grills Installation" },
  { src: heroBalconyGrill, alt: "Balcony Invisible Grills" },
  { src: heroWindowGrill, alt: "Window Invisible Grills" },
];

export default function InvisibleGrills() {
  return (
    <Layout>
      <SEOHead
        title="Invisible Grills Installation"
        description="Premium invisible grill installation services using 316 marine-grade stainless steel. Safe, aesthetic, and durable solutions for balconies, windows, and staircases. 10-year warranty."
        keywords="invisible grills, invisible grill installation, balcony grills, stainless steel grills, window safety grills, modern balcony safety"
        canonicalUrl="/invisible-grills"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroInvisibleGrills} alt="Invisible Grills Installation" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,8%,0.95)] via-[hsl(222,47%,10%,0.88)] to-[hsl(222,47%,10%,0.75)]" />
        </div>
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="container mt-[-2rem] relative z-10">
          <Breadcrumbs items={[{ label: "Services", href: "/invisible-grills" }, { label: "Invisible Grills" }]} darkMode />
          <div className="mt-8 max-w-4xl">
            <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Invisible Grills Installation
            </h1>
            <p className="mb-8 text-xl text-white/80">
              Transform your living spaces with our premium invisible grill solutions. 
              Experience unobstructed views without compromising on safety.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="cta-gradient" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Get Free Quote <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                <a href="tel:+917339306098" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" /> Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slider */}
      <ServiceImageSlider images={serviceImages} />

      {/* Features */}
      <section className="section-bg-1 relative py-16 md:py-24">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative z-10">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
            Why Choose Our Invisible Grills?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 shadow-lg">
                <feature.icon className="mb-4 h-10 w-10 text-accent" />
                <h3 className="mb-2 font-heading text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section-bg-2 relative py-16 md:py-24">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">Applications & Use Cases</h2>
              <p className="mb-8 text-white/70">
                Our invisible grills are versatile solutions suitable for various residential and commercial applications.
              </p>
              <ul className="grid grid-cols-2 gap-3">
                {applications.map((app, index) => (
                  <li key={index} className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[hsl(215,25%,15%)] via-[hsl(217,30%,20%)] to-[hsl(220,35%,18%)] p-8 border border-white/10">
              <h3 className="mb-6 font-heading text-xl font-semibold text-white">Technical Specifications</h3>
              <dl className="space-y-4">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between border-b border-white/10 pb-2">
                    <dt className="text-white/60">{spec.label}</dt>
                    <dd className="font-medium text-white">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Links */}
      <section className="section-bg-5 relative py-16 md:py-24">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative z-10">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold text-foreground">Invisible Grills by Location</h2>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-4">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/invisible-grills-${loc.slug}`}
                className="flex items-center justify-between rounded-xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <span className="font-medium text-white">{loc.name}</span>
                <ArrowRight className="h-4 w-4 text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InvisibleGrillsFAQ />
      <CTASection />
    </Layout>
  );
}
