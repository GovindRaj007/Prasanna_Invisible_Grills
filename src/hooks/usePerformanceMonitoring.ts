import { useEffect } from "react";

export function usePerformanceMonitoring() {
  useEffect(() => {
    // Monitor long tasks using PerformanceObserver
    if (typeof PerformanceObserver === "undefined") return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ((entry as PerformanceEntry).duration > 50) {
          console.warn("Long task detected:", {
            name: entry.name,
            duration: (entry as PerformanceEntry).duration,
          });
        }
      }
    });

    try {
      observer.observe({ entryTypes: ["longtask"] });
    } catch (e) {
      // PerformanceObserver for long task is not supported in all browsers
    }

    return () => observer.disconnect();
  }, []);
}
