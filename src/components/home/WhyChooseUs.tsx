import { Shield, Clock, Award, Wrench, HeadphonesIcon, BadgeCheck } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Premium Quality Materials",
    description:
      "We use only 316-grade marine stainless steel and high-tensile nylon ensuring maximum durability and corrosion resistance.",
  },
  {
    icon: Clock,
    title: "Quick Installation",
    description:
      "Our expert team completes most installations within a single day, minimizing disruption to your daily routine.",
  },
  {
    icon: Award,
    title: "10-Year Warranty",
    description:
      "All our installations come with a comprehensive 10-year warranty covering materials and workmanship.",
  },
  {
    icon: Wrench,
    title: "Professional Expertise",
    description:
      "Over 8 years of experience with 10,000+ successful installations across residential and commercial properties.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Customer Support",
    description:
      "Round-the-clock customer service to address any concerns or maintenance requirements promptly.",
  },
  {
    icon: BadgeCheck,
    title: "Certified & Insured",
    description:
      "Fully licensed, ISO certified, and comprehensively insured for your complete peace of mind.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-bg-2 relative py-16 md:py-24">
      <div className="absolute inset-0 grid-pattern-dark opacity-30" />
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-accent">
            Why Choose Us
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
            Our Difference
          </h2>
          <p className="text-lg text-white/70">
            When it comes to your family's safety, settle for nothing less than the best. 
            Here's why thousands trust us with their homes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-gradient-to-br from-[hsl(215,25%,15%)] via-[hsl(217,30%,20%)] to-[hsl(220,35%,18%)] p-6 border border-white/10 transition-all hover:border-accent/30"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent transition-all group-hover:bg-accent group-hover:text-white">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold text-white">
                {reason.title}
              </h3>
              <p className="text-sm text-white/70">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
