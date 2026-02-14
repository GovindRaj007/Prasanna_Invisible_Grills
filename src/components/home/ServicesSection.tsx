import { Link } from "react-router-dom";
import { ArrowRight, Grid3X3, Store, Fence, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroInvisibleGrills from "@/assets/hero-invisible-grills.jpg";
import heroDealer from "@/assets/hero-dealer.jpg";
import heroCeilingHanger from "@/assets/hero-ceiling-hanger.jpg";
import heroBalconyGrill from "@/assets/hero-balcony-grill.jpg";
import heroWindowGrill from "@/assets/hero-window-grill.jpg";

const services = [
  {
    icon: Grid3X3,
    title: "Invisible Grills",
    description:
      "Modern stainless steel cable grills that provide maximum safety while maintaining unobstructed views. Perfect for balconies, windows, and staircases.",
    href: "/invisible-grills",
    features: ["316 Marine Grade Steel", "Virtually Invisible", "10-Year Warranty"],
    image: heroInvisibleGrills,
  },
  {
    icon: Store,
    title: "Invisible Grills Dealer",
    description:
      "Partner with us for wholesale invisible grills. Access dealer pricing, installation training, and exclusive territory rights to grow your business.",
    href: "/invisible-grills-dealer",
    features: ["Wholesale Pricing", "Installation Training", "Territory Rights"],
    image: heroDealer,
  },
  {
    icon: Fence,
    title: "Invisible Grills for Balcony",
    description:
      "Premium balcony protection with crystal-clear views. Custom-fit solutions for all balcony types with child and pet safety as the priority.",
    href: "/invisible-grills-balcony",
    features: ["Clear Views", "Custom Fit", "Child-Safe"],
    image: heroBalconyGrill,
  },
  {
    icon: Grid3X3,
    title: "Invisible Grill for Windows",
    description:
      "Secure your windows with virtually invisible grills. Maximum safety for children and pets while maintaining natural ventilation.",
    href: "/invisible-grills-windows",
    features: ["Window Safety", "Full Ventilation", "Child Protection"],
    image: heroWindowGrill,
  },
  {
    icon: Shirt,
    title: "Ceiling Cloth Hanger",
    description:
      "Space-saving pulley-operated cloth drying systems for modern apartments. Rust-proof stainless steel construction with easy operation.",
    href: "/ceiling-cloth-hanger",
    features: ["Pulley System", "Space Saving", "Rust-Proof"],
    image: heroCeilingHanger,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-bg-1 py-8 md:py-12">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Our Services
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Complete Safety Solutions for Your Property
          </h2>
          <p className="text-lg text-muted-foreground">
            From invisible grills to ceiling hangers, we provide comprehensive 
            products tailored to your specific needs and requirements.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.href}
              className="group relative overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Service Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Reduced shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(222,47%,11%,0.7)]" />
                {/* Badge */}
                <span className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
                  Popular
                </span>
              </div>

              {/* Content with gradient background */}
              <div className="bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-5">
                {/* Title */}
                <h3 className="mb-2 font-heading text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm text-white/70 line-clamp-3">{service.description}</p>

                {/* Features */}
                <ul className="mb-4 space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-white/60">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors group-hover:text-accent">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" className="cta-gradient text-white hover:opacity-90" asChild>
            <Link to="/contact" className="flex items-center gap-2">
              Request Free Site Visit
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
