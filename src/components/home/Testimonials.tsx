import { useState, useEffect, useRef, useCallback, TouchEvent } from "react";
import { Star, Quote } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getSiteUrl } from "@/lib/getSiteUrl";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Visakhapatnam",
    rating: 5,
    text: "Excellent service! The invisible grills look fantastic and provide complete peace of mind for our children. The installation team was professional and completed the work in just 4 hours.",
    service: "Invisible Grills",
  },
  {
    name: "Priya Sharma",
    location: "Vijayawada",
    rating: 5,
    text: "We got ceiling cloth hangers installed in our apartment. The pulley system works perfectly and saved so much balcony space. Highly recommended for anyone with a small balcony.",
    service: "Ceiling Cloth Hanger",
  },
  {
    name: "Venkat Rao",
    location: "Guntur",
    rating: 5,
    text: "The balcony invisible grills are top-notch quality. With two young kids at home, this investment gives us immense peace of mind. Thank you, Prasanna team!",
    service: "Balcony Grills",
  },
  {
    name: "Lakshmi Devi",
    location: "Tirupati",
    rating: 5,
    text: "From quotation to installation, everything was smooth and professional. The team was punctual, courteous, and left the place spotlessly clean after installation.",
    service: "Invisible Grills",
  },
  {
    name: "Suresh Reddy",
    location: "Anantapur",
    rating: 5,
    text: "Best window grills in the market. The invisible design maintains the aesthetic of our home while keeping our pets safe. Worth every rupee spent!",
    service: "Window Grills",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const siteUrl = getSiteUrl();

  // Use doubled array for seamless infinite loop
  const extendedTestimonials = [...testimonials, ...testimonials];
  const totalOriginal = testimonials.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // When we reach the cloned portion, instantly reset to the real portion
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
    if (isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
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

  const handleMouseDown = () => setIsPaused(true);
  const handleMouseUp = () => setIsPaused(false);
  const handleMouseLeave = () => setIsPaused(false);

  // Generate Review/AggregateRating Schema
  const aggregateReviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "Prasanna Invisible Grills",
    "url": siteUrl,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.9,
      "reviewCount": 150,
      "bestRating": 5,
      "worstRating": 1
    }
  };

  const reviewSchemas = testimonials.map((testimonial) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: parseFloat(testimonial.rating.toString()),
      bestRating: 5,
      worstRating: 1
    },
    reviewBody: testimonial.text,
    author: {
      "@type": "Person",
      name: testimonial.name
    },
    publisher: {
      "@type": "Organization",
      name: "Prasanna Invisible Grills"
    }
  }));

  return (
    <section className="section-bg-3 relative py-16 md:py-24 overflow-hidden">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(aggregateReviewSchema)}</script>
        {reviewSchemas.map((schema, index) => (
          <script key={index} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Testimonials
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our satisfied customers have to say 
            about their experience with Prasanna Invisible Grills.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div 
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Slider Container */}
          <div className="overflow-hidden mx-0 md:mx-12">
            <div 
              className={`flex ${isTransitioning ? "transition-transform duration-500 ease-out" : ""}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {extendedTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-2 md:px-4"
                >
                  <div className="relative rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 md:p-8 shadow-lg mx-auto max-w-2xl">
                    {/* Quote Icon */}
                    <Quote className="absolute right-6 top-6 h-10 w-10 text-white/10" />

                    {/* Rating */}
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="mb-6 text-lg text-white/80 leading-relaxed">{testimonial.text}</p>

                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-white/60">{testimonial.location}</p>
                      </div>
                      <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent">
                        {testimonial.service}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  (currentIndex % totalOriginal) === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
