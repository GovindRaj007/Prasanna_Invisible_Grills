import { useEffect } from "react";

export function useGTMTracking() {
  useEffect(() => {
    const handleTrackingClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-track]") as HTMLAnchorElement | null;
      
      if (target && window.dataLayer) {
        const trackType = target.getAttribute("data-track");
        const href = target.getAttribute("href");
        
        window.dataLayer.push({
          event: "click_tracking",
          click_type: trackType,
          click_url: href,
        });
      }
    };

    document.addEventListener("click", handleTrackingClick, true);
    return () => document.removeEventListener("click", handleTrackingClick, true);
  }, []);
}
