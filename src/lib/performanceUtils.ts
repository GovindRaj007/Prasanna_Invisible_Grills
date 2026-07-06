/**
 * Performance utilities for the homepage
 * Optimizes image loading, script execution, and resource hints
 */

/**
 * Add resource hints for DNS prefetch and preconnect
 */
export function addResourceHints() {
  const hints = [
    { rel: "dns-prefetch", href: "https://cdn.example.com" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  ];

  hints.forEach(hint => {
    const link = document.createElement("link");
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossOrigin) {
      link.crossOrigin = hint.crossOrigin;
    }
    document.head.appendChild(link);
  });
}

/**
 * Monitor Largest Contentful Paint (LCP)
 */
export function measureLCP() {
  if (typeof PerformanceObserver !== "undefined") {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (process.env.MODE === "development") {
          console.log("LCP:", {
            time: lastEntry.renderTime || lastEntry.loadTime,
            element: (lastEntry as any).element?.tagName || "unknown",
          });
        }
      });
      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      // LCP observer not supported
    }
  }
}
