import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/common/SEOHead";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Award, Users, Clock, Target, CheckCircle2 } from "lucide-react";
import { CTASection } from "@/components/home/CTASection";

import heroAbout from "@/assets/hero-about.jpg";

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Clock, value: "8+", label: "Years Experience" },
  { icon: Award, value: "100%", label: "Satisfaction Rate" },
  { icon: Target, value: "19", label: "Cities Covered" },
];

const values = [
  {
    title: "Safety First",
    description: "Every installation is done with the highest safety standards. We never compromise on quality.",
  },
  {
    title: "Customer Focus",
    description: "Your satisfaction is our priority. We listen, understand, and deliver solutions that exceed expectations.",
  },
  {
    title: "Integrity",
    description: "Transparent pricing, honest advice, and genuine materials. We build relationships based on trust.",
  },
  {
    title: "Excellence",
    description: "We continuously improve our products and services to provide the best solutions available.",
  },
];

export default function About() {
  return (
    <Layout>
      <SEOHead
        title="About Us"
        description="Learn about Prasanna Invisible Grills - 8+ years of experience providing premium invisible grills and home utility solutions in Visakhapatnam, Rajahmundry, Vijayawada, Guntur, Tirupati, and Anantapur. 10,000+ satisfied customers."
        keywords="about Prasanna Grills, invisible grills company, invisible grills Andhra Pradesh, Visakhapatnam grills company"
        canonicalUrl="/about"
      />

      {/* Hero with Background Image */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroAbout} 
            alt="Prasanna Invisible Grills Office" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,8%,0.95)] via-[hsl(222,47%,10%,0.88)] to-[hsl(222,47%,10%,0.75)]" />
        </div>
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="container relative z-10">
          <Breadcrumbs items={[{ label: "About" }]} darkMode />
          <h1 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">
            About Prasanna Invisible Grills
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/80">
            For over 8 years, we've been dedicated to protecting families across 
            Andhra Pradesh with premium invisible grills and home utility solutions.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section-bg-4 relative border-b border-white/10 py-12">
        <div className="absolute inset-0 grid-pattern-dark opacity-40" />
        <div className="container relative z-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-accent" />
                <div className="font-heading text-3xl font-bold text-white md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-bg-1 relative py-16 md:py-24">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-heading text-3xl font-bold text-foreground md:text-4xl">Our Story</h2>
            <div className="space-y-4 rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-8 text-white/80">
              <p>
                Prasanna Invisible Grills was founded in 2015 with a simple mission: 
                to provide families with the highest quality safety solutions without compromising 
                on aesthetics. What started as a small operation in Visakhapatnam has grown into a 
                trusted name serving thousands of customers across Andhra Pradesh.
              </p>
              <p>
                Our founder, driven by a personal experience of seeing the need for better 
                balcony safety solutions in high-rise apartments, set out to bring international 
                standards of invisible grill technology to Indian homes. Today, we're proud to 
                have installed over 10,000 safety systems, each one custom-designed and 
                professionally installed by our trained technicians.
              </p>
              <p>
                We source only the best materials – 316 marine-grade stainless steel cables, 
                rust-proof aluminum frames, and premium pulley mechanisms for our ceiling hangers – 
                ensuring that every installation stands the test of time. Our commitment to quality 
                is backed by our industry-leading 10-year warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-bg-2 relative py-16 md:py-24">
        <div className="absolute inset-0 grid-pattern-dark opacity-20" />
        <div className="container relative z-10">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-white md:text-4xl">
            Our Core Values
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="rounded-2xl bg-gradient-to-br from-[hsl(215,25%,15%)] via-[hsl(217,30%,20%)] to-[hsl(220,35%,18%)] p-6 border border-white/10">
                <CheckCircle2 className="mb-4 h-8 w-8 text-accent" />
                <h3 className="mb-2 font-heading text-lg font-semibold text-white">{value.title}</h3>
                <p className="text-sm text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="section-bg-3 relative py-16 md:py-24">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-heading text-3xl font-bold text-foreground md:text-4xl">
              Why Families Trust Us
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              We understand that protecting your family is not just a service – it's a 
              responsibility. That's why we go above and beyond to ensure every installation 
              meets the highest standards of safety and quality.
            </p>
            <div className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-8">
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-white/90">ISO-certified quality management system</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-white/90">Trained and verified installation technicians</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-white/90">Comprehensive insurance coverage for all projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-white/90">Post-installation support and annual maintenance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-white/90">Transparent pricing with no hidden costs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
