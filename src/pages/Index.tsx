import { Layout } from "@/components/layout/Layout";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ImageShowcase } from "@/components/home/ImageShowcase";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { FAQ } from "@/components/home/FAQ";
import { CTASection } from "@/components/home/CTASection";
import { DeferredSection } from "@/components/common/DeferredSection";
import { SEOHead } from "@/components/common/SEOHead";
import { HOME_SEO_KEYWORDS } from "@/config/seo.constants";
import { getSiteUrl } from "@/lib/getSiteUrl";

const Index = () => {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Prasanna Invisible Grills",
    description:
      "Premium invisible grills and home utility solutions for residential and commercial properties in Visakhapatnam, Rajahmundry, Vijayawada, Guntur, Tirupati, and Anantapur.",
    url: siteUrl,
    telephone: "+917339306098",
    email: "info@prasannainvisible.in",
    image: `${siteUrl}/logo-Prasanna-Invisible-Grills.png`,
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
        title="Invisible Grills Installation in Andhra Pradesh, Telangana & Hyderabad"
        description="Invisible grills, invisible grill fitting, invisible grill installation, balcony invisible grills, window invisible grills, and ceiling cloth hanger installation across Andhra Pradesh, Telangana, Hyderabad, Vizag, Vijayawada, Guntur, Tirupati, and Rajahmundry."
        keywords={HOME_SEO_KEYWORDS.join(", ")}
        ogImage="/og-images/prasanna-invisible-grills-og.jpg"
        canonicalUrl="/"
        structuredData={structuredData}
      />
      <HeroSlider />
      <DeferredSection rootMargin="300px 0px 300px 0px">
        <ImageShowcase />
      </DeferredSection>
      <DeferredSection rootMargin="300px 0px 300px 0px">
        <ServicesSection />
      </DeferredSection>
      <DeferredSection rootMargin="400px 0px 400px 0px">
        <WhyChooseUs />
      </DeferredSection>
      <DeferredSection rootMargin="400px 0px 400px 0px">
        <Testimonials />
      </DeferredSection>
      <DeferredSection rootMargin="400px 0px 400px 0px">
        <ServiceAreas />
      </DeferredSection>
      <DeferredSection rootMargin="300px 0px 300px 0px">
        <FAQ />
      </DeferredSection>
      <DeferredSection rootMargin="200px 0px 200px 0px">
        <CTASection />
      </DeferredSection>
    </Layout>
  );
};

export default Index;
