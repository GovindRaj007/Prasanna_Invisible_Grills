import { useState, useEffect, useCallback, useRef, TouchEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Grid3X3, Store, Fence, Shirt } from "lucide-react";

import heroInvisibleGrills from "@/assets/hero-invisible-grills.jpg";
import heroDealer from "@/assets/hero-dealer.jpg";
import heroCeilingHanger from "@/assets/hero-ceiling-hanger.jpg";
import heroBalconyGrill from "@/assets/hero-balcony-grill.jpg";
import heroWindowGrill from "@/assets/hero-window-grill.jpg";

const slides = [
  {
    id: 1,
    icon: Grid3X3,
    title: "Invisible Grills",
    subtitle: "Premium Stainless Steel Protection",
    description: "Experience unobstructed views with our marine-grade SS316 invisible grills. Child-safe, rust-proof, and aesthetically superior protection for your balconies and windows.",
    image: heroInvisibleGrills,
    keywords: ["Child Safety", "Rust-Proof", "10-Year Warranty"],
    href: "/invisible-grills",
    cta: "Explore Invisible Grills",
  },
  {
    id: 2,
    icon: Store,
    title: "Invisible Grills Dealer",
    subtitle: "Authorized Dealership & Wholesale",
    description: "Partner with us for wholesale invisible grills. Access dealer pricing, installation training, and exclusive territory rights to grow your business.",
    image: heroDealer,
    keywords: ["Wholesale Pricing", "Dealer Training", "Territory Rights"],
    href: "/invisible-grills-dealer",
    cta: "Become a Dealer",
  },
  {
    id: 3,
    icon: Fence,
    title: "Invisible Grills for Balcony",
    subtitle: "Premium Balcony Protection",
    description: "Transform your balcony into a safe, open space with crystal-clear views. Custom-fit solutions for apartments and villas with maximum safety.",
    image: heroBalconyGrill,
    keywords: ["Balcony Safety", "Clear Views", "Custom Fit"],
    href: "/invisible-grills-balcony",
    cta: "Protect Your Balcony",
  },
  {
    id: 4,
    icon: Grid3X3,
    title: "Invisible Grills for Window",
    subtitle: "Invisible Window Protection",
    description: "Secure your windows with virtually invisible grills. Maximum safety for children and pets while maintaining clear views and natural ventilation.",
    image: heroWindowGrill,
    keywords: ["Window Safety", "Child Protection", "Clear Views"],
    href: "/invisible-grills-windows",
    cta: "Secure Windows",
  },
  {
    id: 5,
    icon: Shirt,
    title: "Ceiling Cloth Hanger",
    subtitle: "Space-Saving Drying Solutions",
    description: "Maximize your space with our premium ceiling-mounted cloth drying systems. Pulley-operated, rust-proof, and designed for the modern Indian home.",
    image: heroCeilingHanger,
    keywords: ["Pulley System", "Space Saving", "Rust-Proof"],
    href: "/ceiling-cloth-hanger",
    cta: "Explore Hangers",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const minSwipeDistance = 50;

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  // Auto-slide with pause support
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(nextSlide, 6000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [nextSlide, isPaused]);

  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left - next slide
        nextSlide();
      } else {
        // Swiped right - previous slide
        prevSlide();
      }
    }
    
    setIsPaused(false);
  };

  const handleMouseDown = () => {
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsPaused(false);
  };

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative h-[100svh] min-h-[600px] max-h-[800px] overflow-hidden md:min-h-[600px] md:max-h-[900px]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Images */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 hero-slide-active" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="h-full w-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,8%,0.92)] via-[hsl(222,47%,10%,0.85)] to-[hsl(222,47%,10%,0.7)]" />
        </div>
      ))}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern-dark opacity-30" />

      {/* Content */}
      <div className="container mt-[-2rem] z-10 flex h-full items-center">
        <div className="max-w-3xl  ">
          {/* Badge */}
          <div 
            key={`badge-${currentSlide}`}
            className="hero-content-animate mb-4 md:mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white backdrop-blur-sm"
          >
            <slide.icon className="h-3 w-3 md:h-4 md:w-4 text-accent" />
            India's Premium Safety Grill Specialists
          </div>

          {/* Title */}
          <h1 
            key={`title-${currentSlide}`}
            className="hero-content-animate mb-2 md:mb-3 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
            style={{ animationDelay: "0.1s" }}
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <h2 
            key={`subtitle-${currentSlide}`}
            className="hero-content-animate mb-4 md:mb-6 font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-accent"
            style={{ animationDelay: "0.2s" }}
          >
            {slide.subtitle}
          </h2>

          {/* Description */}
          <p 
            key={`desc-${currentSlide}`}
            className="hero-content-animate mb-6 md:mb-8 max-w-2xl text-sm md:text-xl lg:text-lg text-white/80 line-clamp-3 md:line-clamp-none"
            style={{ animationDelay: "0.3s" }}
          >
            {slide.description}
          </p>

          {/* Keywords */}
          <div 
            key={`keywords-${currentSlide}`}
            className="hero-content-animate mb-6 md:mb-8 flex flex-wrap gap-2 md:gap-3"
            style={{ animationDelay: "0.4s" }}
          >
            {slide.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm text-white/90 backdrop-blur-sm"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div 
            key={`cta-${currentSlide}`}
            className="hero-content-animate flex flex-col items-start gap-3 sm:flex-row md:gap-4"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              size="lg"
              className="cta-gradient text-white hover:opacity-90 h-11 md:h-12 text-sm md:text-base px-5 md:px-6"
              asChild
            >
              <Link to={slide.href} className="flex items-center gap-2">
                {slide.cta}
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 h-11 md:h-12 text-sm md:text-base px-5 md:px-6"
              asChild
            >
              <a href="tel:+919876543210" className="flex items-center gap-2">
                <Phone className="h-4 w-4 md:h-5 md:w-5" />
                +91 98765 43210
              </a>
            </Button>
          </div>
        </div>
      </div>


      {/* Slide Indicators */}
      <div className="absolute bottom-[13%] md:bottom-32 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 md:w-10 bg-accent shadow-lg shadow-accent/50"
                : "w-2 md:w-3 bg-white/40 hover:bg-white/60 hover:scale-125"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom wave - seamless merge with curves */}
      <div className="absolute -bottom-0.5 left-0 right-0 z-10 w-full leading-none overflow-visible">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 Q360,10 720,30 T1440,30 L1440,90 L0,90 Z"
            fill="hsl(215 25% 97%)"
          />
        </svg>
      </div>
    </section>
  );
}
