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
    "@type": "LocalBusiness",
    name: "Prasanna Invisible Grills",
    description:
      "Premium invisible grills and home utility solutions for residential and commercial properties in Visakhapatnam, Vijayawada, Guntur, Tirupati, and Anantapur.",
    url: "https://prasannagrills.com",
    telephone: "+919876543210",
    email: "info@prasannagrills.com",
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
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "17:00",
      },
    ],
    priceRange: "₹₹",
    areaServed: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Anantapur"],
    sameAs: ["https://facebook.com", "https://instagram.com"],
  };

  return (
    <Layout>
      <SEOHead
        title="Premium Invisible Grills & Ceiling Hangers"
        description="Prasanna Invisible Grills offers premium invisible grill installation, balcony grills, and ceiling cloth hangers in Visakhapatnam, Vijayawada, Guntur, Tirupati, and Anantapur. 10-year warranty, professional installation."
        keywords="invisible grills, balcony grills, ceiling cloth hanger, invisible grill dealer, balcony safety, child safety grills, invisible grill installation Visakhapatnam, invisible grills Vijayawada, ceiling hanger Guntur"
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
