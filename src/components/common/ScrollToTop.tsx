import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

// Store scroll positions for each route
const scrollPositions: Record<string, number> = {};

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    // Check if user is navigating back (scroll position exists for this route)
    const isNavigatingBack = pathname in scrollPositions;
    const savedPosition = scrollPositions[pathname];

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      if (hash) {
        // If there's a hash (like #services), scroll to that element
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }

      // If navigating back and we have a saved position, restore it
      if (isNavigatingBack && savedPosition !== undefined) {
        window.scrollTo(0, savedPosition);
      } else {
        // Otherwise, scroll to top for new page navigation
        window.scrollTo(0, 0);
      }
    }, 0);

    // Save current scroll position before leaving the page
    const handleBeforeUnload = () => {
      scrollPositions[pathname] = window.scrollY;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    // Also save position when route changes
    return () => {
      scrollPositions[pathname] = window.scrollY;
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname, hash]);

  // Handle scroll to detect footer visibility
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) {
        setIsFooterVisible(false);
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      // Show button when footer starts becoming visible (top of footer at 80% of viewport)
      setIsFooterVisible(footerRect.top <= window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isFooterVisible && (
        <button
          onClick={scrollToTop}
          className="fixed left-6 bottom-8 z-40 flex h-12 w-12 items-center justify-center rounded-lg bg-accent hover:bg-accent-hover transition-colors duration-200 shadow-lg hover:shadow-xl"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp className="h-6 w-6 text-white" />
        </button>
      )}
    </>
  );
}
