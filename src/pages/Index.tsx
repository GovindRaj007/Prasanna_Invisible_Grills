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
import { ORGANIZATION_ID, SITE_URL } from "@/config/business";
import { REVIEW_VIDEO_CONFIG } from "@/config/reviewVideoConfig";
import { graph, webPageNode } from "@/lib/schema";

const TITLE = "Invisible Grills for Balcony & Windows | Prasanna Invisible Grills";
const DESCRIPTION =
  "Invisible grills for balconies & windows with SS316 cables and a 10-year warranty, plus ceiling cloth hangers. Branches in Hyderabad, Vizag & Vijayawada.";

const structuredData = graph(
  {
    ...webPageNode({
      path: "/",
      title: TITLE,
      description: DESCRIPTION,
      image: "/og-images/prasanna-invisible-grills-og.jpg",
    }),
    mainEntity: { "@id": ORGANIZATION_ID },
  },
  {
    "@type": "VideoObject",
    "@id": `${SITE_URL}/#review-video`,
    name: REVIEW_VIDEO_CONFIG.title,
    description: REVIEW_VIDEO_CONFIG.description,
    thumbnailUrl: `${SITE_URL}${REVIEW_VIDEO_CONFIG.posterImage}`,
    contentUrl: `${SITE_URL}${REVIEW_VIDEO_CONFIG.url}`,
    uploadDate: REVIEW_VIDEO_CONFIG.uploadDate,
    duration: REVIEW_VIDEO_CONFIG.duration,
    publisher: { "@id": ORGANIZATION_ID },
  }
);

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title={TITLE}
        description={DESCRIPTION}
        canonicalUrl="/"
        structuredData={structuredData}
      />
      <HeroSlider />
      <DeferredSection>
        <ImageShowcase />
      </DeferredSection>
      <DeferredSection>
        <ServicesSection />
      </DeferredSection>
      <DeferredSection>
        <WhyChooseUs />
      </DeferredSection>
      <DeferredSection>
        <Testimonials />
      </DeferredSection>
      <DeferredSection>
        <ServiceAreas />
      </DeferredSection>
      <DeferredSection>
        <FAQ />
      </DeferredSection>
      <DeferredSection>
        <CTASection />
      </DeferredSection>
    </Layout>
  );
};

export default Index;
