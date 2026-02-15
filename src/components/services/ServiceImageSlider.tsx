import { useState, useEffect, useRef, useCallback, TouchEvent } from "react";

interface ServiceImageSliderProps {
  images: { src: string; alt: string }[];
}

export function ServiceImageSlider({ images }: ServiceImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const dragOffset = useRef(0);
  const containerWidth = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const extendedImages = [...images, ...images];
  const totalOriginal = images.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Seamless loop reset
  useEffect(() => {
    if (currentIndex >= totalOriginal) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - totalOriginal);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, totalOriginal]);

  // Auto-slide
  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    timerRef.current = setInterval(nextSlide, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, images.length]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    setIsTransitioning(false);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    dragOffset.current = 0;
    if (containerRef.current) {
      containerWidth.current = containerRef.current.offsetWidth;
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
    const diff = touchEndX.current - touchStartX.current;
    dragOffset.current = (diff / (containerWidth.current || 1)) * 100;
  };

  const handleTouchEnd = () => {
    setIsTransitioning(true);
    dragOffset.current = 0;
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        nextSlide();
      } else if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
    setIsPaused(false);
  };

  if (images.length === 0) return null;

  return (
    <section className="section-bg-2 relative py-4 md:py-8">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl">
          <div
            ref={containerRef}
            className="overflow-hidden rounded-2xl shadow-xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`flex ${isTransitioning ? "transition-transform duration-500 ease-out" : ""}`}
              style={{ transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset.current}%))` }}
            >
              {extendedImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="relative aspect-[5/4] sm:aspect-[4/3] md:aspect-[16/9]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
