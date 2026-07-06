import { ReactNode, useEffect, useRef, useState } from "react";

type DeferredSectionProps = {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  once?: boolean;
};

export function DeferredSection({
  children,
  fallback = null,
  rootMargin = "200px 0px",
  once = true,
}: DeferredSectionProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldRender || typeof window === "undefined") return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldRender(true);
          if (once && observer) {
            observer.disconnect();
          }
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, rootMargin, shouldRender]);

  return <div ref={ref}>{shouldRender ? children : fallback}</div>;
}
