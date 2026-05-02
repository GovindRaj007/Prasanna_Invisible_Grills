import { Layout } from "@/components/layout/Layout";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ImageShowcase } from "@/components/home/ImageShowcase";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { FAQ } from "@/components/home/FAQ";
import { CTASection } from "@/components/home/CTASection";
import { SEOHead } from "@/components/common/SEOHead";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Prasanna Invisible Grills",
    description:
      "Premium invisible grills and home utility solutions for residential and commercial properties in Visakhapatnam, Rajahmundry, Vijayawada, Guntur, Tirupati, and Anantapur.",
    url: "https://prasannainvisible.in",
    telephone: "+917339306098",
    email: "info@prasannainvisible.in",
    image: "https://prasannainvisible.in/logo-Prasanna-Invisible-Grills.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "MVP Colony",
      addressLocality: "Visakhapatnam",
      addressRegion: "Andhra Pradesh",
      postalCode: "530017",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.7231",
      longitude: "83.0512",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    areaServed: [
      { "@type": "City", "name": "Visakhapatnam" },
      { "@type": "City", "name": "Rajahmundry" },
      { "@type": "City", "name": "Vijayawada" },
      { "@type": "City", "name": "Guntur" },
      { "@type": "City", "name": "Tirupati" },
      { "@type": "City", "name": "Anantapur" },
      { "@type": "City", "name": "Hyderabad" },
      {"@type": "City", "name": "Mahbubnagar" },
      {"@type": "City", "name": "Warangal" },
      { "@type": "City", "name": "Telangana" }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 150,
      bestRating: 5,
      worstRating: 1
    },
    sameAs: ["https://facebook.com", "https://instagram.com"],
  };

  return (
    <Layout>
      <SEOHead
        title="Invisible Grills Across Andhra & Telangana | Prasanna"
        description="Expert invisible grills installation across Andhra Pradesh & Telangana. 8+ years, 6000+ homes. Premium safety solutions with 10-year warranty. Free quotes."
        keywords="invisible grills, invisible grills installation, invisible grills near me, best invisible grills, balcony grills, ceiling cloth hanger, Andhra Pradesh, Telangana"
        ogImage="/og-images/prasanna-invisible-grills-og.jpg"
        canonicalUrl="/"
        structuredData={structuredData}
      />
      <HeroSlider />
      <ImageShowcase />
      <ServicesSection />
      <WhyChooseUs />
      <Testimonials />
      <ServiceAreas />
      <FAQ />
      <CTASection />
    </Layout>
  );
};

export default Index;
