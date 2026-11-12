import { ReactNode, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingCTA } from "@/components/common/FloatingCTA";
import { ReviewVideoModal } from "@/components/common/ReviewVideoModal";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { REVIEW_VIDEO_CONFIG } from "@/config/reviewVideoConfig";
import { siteGraph } from "@/lib/schema";

interface LayoutProps {
  children: ReactNode;
}

// Built once – identical on every page (Organization, WebSite, branches).
const SITE_GRAPH = JSON.stringify(siteGraph());

export function Layout({ children }: LayoutProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{SITE_GRAPH}</script>
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar onOpenVideoModal={() => setIsVideoModalOpen(true)} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
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
