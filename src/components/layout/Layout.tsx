import { ReactNode, useEffect, useState } from "react";
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
      "uploadDate": new Date().toISOString().split('T')[0],
      "duration": "PT2M30S", // Update with actual duration
      "interactionCount": "100", // Update with actual view count
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
  );
}
