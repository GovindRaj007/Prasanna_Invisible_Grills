import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Store scroll positions for each route
const scrollPositions: Record<string, number> = {};

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

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

  return null;
}
