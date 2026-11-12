import { useState, useRef,  TouchEvent } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LOCATIONS_BY_STATE, SERVICES } from "@/config/seo.constants";

const services = SERVICES.map((s) => ({ name: s.name, slug: s.slug }));

const areasByState = {
  Telangana: LOCATIONS_BY_STATE.Telangana,
  "Andhra Pradesh": LOCATIONS_BY_STATE["Andhra Pradesh"],
};

interface LocationSliderProps {
  areas: readonly (typeof areasByState)["Telangana"][number][];
  stateName: string;
}

function LocationSlider({ areas, stateName }: LocationSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const dragOffset = useRef(0);
  const [dragPx, setDragPx] = useState(0);
  const isDragging = useRef(false);
  const minSwipeDistance = 50;

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < areas.length - 1;

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < areas.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isDragging.current = true;
    setDragPx(0);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
    const diff = touchEndX.current - touchStartX.current;
    setDragPx(diff);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    setDragPx(0);
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && canScrollRight) {
        scrollRight();
      } else if (swipeDistance < 0 && canScrollLeft) {
        scrollLeft();
      }
    }
  };

  return (
    <div className="relative">
      {/* Navigation Icon - Left */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors shadow-lg"
          aria-label="Previous location"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Navigation Icon - Right */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors shadow-lg"
          aria-label="Next location"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Cards Container */}
      <div 
        className="overflow-hidden mx-6 md:mx-12"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className={`flex gap-4 ${isDragging.current ? "" : "transition-transform duration-500 ease-out"}`}
          style={{ transform: `translateX(calc(-${currentIndex * 85}% - ${currentIndex * 16}px + ${dragPx}px))` }}
        >
          {areas.map((area, index) => (
            <div
              key={index}
              className="w-[85%] md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] flex-shrink-0"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 h-full">
                {/* City Header */}
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">{area.city}</h3>
                    <p className="text-xs text-white/70">{stateName}</p>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4 space-y-1.5">
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      to={`/${service.slug}-${area.slug}`}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/15"
                    >
                      <span className="truncate">{service.name}</span>
                      <ArrowRight className="h-3 w-3 shrink-0" />
                    </Link>
                  ))}
                </div>

                {/* Localities */}
                <div>
                  <p className="mb-2 text-xs font-medium text-white/60">Popular Areas:</p>
                  <p className="text-xs text-white/80">{area.localities.slice(0, 3).join(" • ")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator for Mobile */}
      <div className="flex justify-center gap-2 mt-6 md:hidden">
        {areas.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-accent"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to ${areas[index].city}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ServiceAreas() {
  return (
    <section className="section-bg-6 relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 grid-pattern-dark opacity-20" />
      <div className="container relative z-10 px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            Service Areas
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
            Invisible Grills Across Telangana &amp; Andhra Pradesh
          </h2>
          <p className="text-lg text-white/80">
            Branches in Hyderabad, Visakhapatnam and Vijayawada with installation teams covering
            {" "}{areasByState.Telangana.length + areasByState["Andhra Pradesh"].length} cities and areas. Find our services in your city.
          </p>
        </div>

        {/* State Tabs */}
        <Tabs defaultValue="telangana" className="w-full">
          <TabsList className="mx-auto mb-8 flex w-fit gap-2 bg-white/10 p-1.5 rounded-full">
            <TabsTrigger 
              value="telangana" 
              className="rounded-full px-6 py-2 text-sm font-medium text-white/70 data-[state=active]:bg-accent data-[state=active]:text-white transition-all"
            >
              Telangana
            </TabsTrigger>
            <TabsTrigger 
              value="andhra-pradesh" 
              className="rounded-full px-6 py-2 text-sm font-medium text-white/70 data-[state=active]:bg-accent data-[state=active]:text-white transition-all"
            >
              Andhra Pradesh
            </TabsTrigger>
          </TabsList>

          {/* forceMount keeps both states' links in the HTML for crawlers */}
          <TabsContent value="telangana" forceMount className="mt-0 data-[state=inactive]:hidden">
            <LocationSlider areas={areasByState["Telangana"]} stateName="Telangana" />
          </TabsContent>

          <TabsContent value="andhra-pradesh" forceMount className="mt-0 data-[state=inactive]:hidden">
            <LocationSlider areas={areasByState["Andhra Pradesh"]} stateName="Andhra Pradesh" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
