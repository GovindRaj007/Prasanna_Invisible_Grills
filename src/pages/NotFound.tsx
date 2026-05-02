import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEOHead } from "@/components/common/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page Not Found | Prasanna Invisible Grills"
        description="Page not found. Return to Prasanna Invisible Grills for invisible grill solutions across Andhra Pradesh & Telangana."
        keywords="invisible grills, invisible grills near me, best invisible grills, Prasanna"
        canonicalUrl="/404"
        ogImage="/og-images/prasanna-invisible-grills-og.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Page Not Found - Prasanna Invisible Grills",
          "description": "Error page - please return to home",
          "url": "https://prasannainvisible.in/404",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Prasanna Invisible Grills",
            "url": "https://prasannainvisible.in"
          }
        }}
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
