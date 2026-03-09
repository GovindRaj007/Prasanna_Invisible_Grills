import { ReactNode, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingCTA } from "@/components/common/FloatingCTA";
import { ReviewVideoModal } from "@/components/common/ReviewVideoModal";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { REVIEW_VIDEO_CONFIG } from "@/config/reviewVideoConfig";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Add VideoObject structured data for SEO
  useEffect(() => {
    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "Customer Review - Prasanna Invisible Grills",
      "description": "Watch our satisfied customers share their experience with Prasanna Invisible Grills. Premium invisible grills for windows, balconies, and more.",
      "thumbnailUrl": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=450&fit=crop",
      "uploadDate": new Date().toISOString(),
      "duration": "PT2M30S",
      "contentUrl": "https://prasannainvisible.in/videos/customer-reviews.mp4",
      "interactionCount": "100",
      "author": {
        "@type": "Organization",
        "name": "Prasanna Invisible Grills"
      }
    };

    // Create script tag
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(videoSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        {/* Global SEO Meta Tags for All Pages */}
        {/* Ensure crawlability and indexing priority */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        
        {/* DNS Prefetch for Critical Resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Organization Global Schema */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Prasanna Invisible Grills",
          "url": "https://prasannainvisible.in",
          "logo": "https://prasannainvisible.in/og-image.jpg",
          "description": "Premium invisible grills installation and ceiling cloth hangers for windows, balconies, and railings. Professional installation with 10-year warranty.",
          "telephone": "+917339306098",
          "email": "info@prasannainvisible.in",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Visakhapatnam",
            "addressLocality": "Visakhapatnam",
            "addressRegion": "Andhra Pradesh",
            "postalCode": "530016",
            "addressCountry": "IN"
          },
          "sameAs": [
            "https://facebook.com",
            "https://instagram.com"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "telephone": "+917339306098",
            "email": "info@prasannainvisible.in"
          }
        })}</script>

        {/* Website Schema for Sitelinks */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://prasannainvisible.in",
          "name": "Prasanna Invisible Grills",
          "description": "Premium invisible grills installation and ceiling cloth hangers",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://prasannainvisible.in/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        })}</script>
      </Helmet>
      
      <div className="flex min-h-screen flex-col">
        <Navbar onOpenVideoModal={() => setIsVideoModalOpen(true)} />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
        <ScrollToTop />
        <ReviewVideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoUrl={REVIEW_VIDEO_CONFIG.url}
          posterImage={REVIEW_VIDEO_CONFIG.posterImage}
          title={REVIEW_VIDEO_CONFIG.title}
        />
      </div>
    </>
  );
}
