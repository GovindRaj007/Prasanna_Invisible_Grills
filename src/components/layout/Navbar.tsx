import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewVideoButton } from "@/components/common/ReviewVideoButton";
import { ReviewVideoPreview } from "@/components/common/ReviewVideoPreview";
import { REVIEW_VIDEO_CONFIG } from "@/config/reviewVideoConfig";
import { SERVICES, LOCATIONS_BY_STATE } from "@/config/seo.constants";
import { PHONES } from "@/config/business";
import logoImage from "@/assets/logo-Prasanna-invisible-grills.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const services = SERVICES.map((s) => ({ name: s.name, href: "/" + s.slug, slug: s.slug }));

const locationsByState = Object.fromEntries(
  Object.entries(LOCATIONS_BY_STATE).map(([state, locs]) => [state, locs.map((l) => ({ name: l.city, slug: l.slug }))])
) as Record<string, { name: string; slug: string }[]>;

interface NavbarProps {
  onOpenVideoModal: () => void;
}

export function Navbar({ onOpenVideoModal }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordionValue, setMobileAccordionValue] = useState<string>("");
  const [mobileStateAccordionValue, setMobileStateAccordionValue] = useState<string>("");
  const location = useLocation();
  
  // Handle browser back button when mobile menu is open
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // If menu is open, close it instead of navigating back
      if (mobileOpen) {
        setMobileOpen(false);
      }
    };

    // Push a history state when menu opens to intercept the back button
    if (mobileOpen) {
      window.history.pushState({ mobileMenuOpen: true }, "");
      window.addEventListener("popstate", handlePopState);
      
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [mobileOpen]);

  const isActive = (path: string) => location.pathname === path;

  const handleLogoClick = () => {
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[hsl(222,47%,11%,0.92)] via-[hsl(217,33%,17%,0.88)] to-[hsl(215,25%,22%,0.85)] backdrop-blur-xl">
      <nav className="container flex h-[4.5rem] items-center justify-between md:h-20">
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center cursor-pointer transition-transform hover:scale-105 focus:outline-none"
          aria-label="Prasanna Invisible Grills - Go to Home"
        >
          <img src={logoImage} alt="Prasanna Invisible Grills" width={191} height={67} className="h-[4.2rem] w-auto md:h-[4.5rem]" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          <Link
            to="/"
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 ${
              isActive("/") ? "text-accent" : "text-white"
            }`}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 rounded-md px-4 py-2 text-base font-medium text-white transition-colors hover:bg-white/10">
              Services
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full z-50 hidden w-72 rounded-lg border border-white/10 bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-2 shadow-xl backdrop-blur-xl group-hover:block">
              {services.map((service) => (
                <Link
                  key={service.href}
                  to={service.href}
                  className="block rounded-md px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Locations Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 rounded-md px-4 py-2 text-base font-medium text-white transition-colors hover:bg-white/10">
              Locations
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full z-50 hidden w-[30rem] rounded-lg border border-white/10 bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] shadow-xl backdrop-blur-xl group-hover:block max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 p-4">
                {Object.entries(locationsByState).map(([state, locations]) => (
                  <div key={state}>
                    <p className="mb-2 px-2 text-sm font-semibold text-accent">{state}</p>
                    <ul className="space-y-0.5">
                      {locations.map((loc) => (
                        <li key={loc.slug}>
                          <Link
                            to={"/invisible-grills-" + loc.slug}
                            className="block rounded-md px-2 py-1.5 text-sm text-white/85 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            {loc.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/about"
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 ${
              isActive("/about") ? "text-accent" : "text-white"
            }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 ${
              isActive("/contact") ? "text-accent" : "text-white"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <ReviewVideoButton onClick={onOpenVideoModal} />
          <div className="flex flex-col items-center">
            <a href={`tel:${PHONES.primary.e164}`} data-track="call" className="flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors">
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
          </div>
          <Button size="sm" className="cta-gradient text-white" asChild>
            <Link to="/contact">Get Free Quote</Link>
          </Button>
        </div>

        {/* Mobile Menu - Side Drawer */}
        <div className="flex items-center gap-2 lg:hidden">
          <ReviewVideoButton variant="compact" onClick={onOpenVideoModal} />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="rounded-md p-2 text-white lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[300px] sm:w-[340px] bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] border-l border-white/10 p-0 overflow-y-auto"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">Mobile navigation menu for Prasanna Invisible Grills</SheetDescription>
            <div className="flex flex-col h-full">
              {/* Logo in drawer */}
              <img src={logoImage} alt="Prasanna Invisible Grills" className="mb-2 h-[4rem] w-[70%] ml-4 mt-2" />

              {/* Navigation Links */}
              <div className="flex-1 px-4 py-4 space-y-1">
                <SheetClose asChild>
                  <Link
                    to="/"
                    className="block rounded-md px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                  >
                    Home
                  </Link>
                </SheetClose>
                
                <Accordion 
                  type="single" 
                  collapsible 
                  value={mobileAccordionValue}
                  onValueChange={setMobileAccordionValue}
                  className="w-full"
                >
                  {/* Services Accordion */}
                  <AccordionItem value="services" className="border-b-0">
                    <AccordionTrigger className="px-4 py-3 text-sm font-medium text-white hover:no-underline hover:bg-white/10 [&[data-state=open]>svg]:rotate-180">
                      Services
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <div className="space-y-1 pl-4 pb-2">
                        {services.map((service) => (
                          <SheetClose asChild key={service.href}>
                            <Link
                              to={service.href}
                              className="block rounded-md px-4 py-2.5 text-sm text-white/80 hover:bg-white/10"
                            >
                              {service.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Locations Accordion */}
                  <AccordionItem value="locations" className="border-b-0">
                    <AccordionTrigger className="px-4 py-3 text-sm font-medium text-white hover:no-underline hover:bg-white/10 [&[data-state=open]>svg]:rotate-180">
                      Locations
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <Accordion 
                        type="single" 
                        collapsible 
                        className="w-full pl-2"
                        value={mobileStateAccordionValue}
                        onValueChange={setMobileStateAccordionValue}
                      >
                        {Object.entries(locationsByState).map(([state, locations]) => (
                          <AccordionItem key={state} value={state} className="border-b-0">
                            <AccordionTrigger className="px-4 py-2.5 text-sm font-semibold text-accent hover:no-underline hover:bg-white/10">
                              {state}
                            </AccordionTrigger>
                            <AccordionContent className="pb-0">
                              <Accordion type="single" collapsible className="w-full pl-2">
                                {locations.map((loc) => (
                                  <AccordionItem key={loc.slug} value={loc.slug} className="border-b-0">
                                    <AccordionTrigger className="px-4 py-2 text-sm font-medium text-white/90 hover:no-underline hover:bg-white/10">
                                      {loc.name}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-0">
                                      <div className="space-y-1 pb-2 pl-4">
                                        {services.map((service) => (
                                          <SheetClose asChild key={`${service.slug}-${loc.slug}`}>
                                            <Link
                                              to={`/${service.slug}-${loc.slug}`}
                                              className="block rounded-md px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
                                            >
                                              {service.name}
                                            </Link>
                                          </SheetClose>
                                        ))}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <SheetClose asChild>
                  <Link
                    to="/about"
                    className="block rounded-md px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                  >
                    About
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    to="/contact"
                    className="block rounded-md px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                  >
                    Contact
                  </Link>
                </SheetClose>

                {/* Video Preview in Mobile Menu */}
                <div className="mt-4 border-t border-white/10 pt-4">
                  <ReviewVideoPreview
                    posterImage={REVIEW_VIDEO_CONFIG.posterImage}
                    onClick={() => {
                      onOpenVideoModal();
                      setMobileOpen(false);
                    }}
                    title={REVIEW_VIDEO_CONFIG.title}
                  />
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="px-4 pb-6 pt-2 border-t border-white/10 space-y-3">
                <div className="flex flex-col space-y-2">
                  <a href={`tel:${PHONES.primary.e164}`} data-track="call" className="flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors">
                    <Phone className="h-4 w-4" />
                    Call: {PHONES.primary.display}
                  </a>
                </div>
                <SheetClose asChild>
                  <Button asChild className="w-full cta-gradient text-white">
                    <Link to="/contact">Get Free Quote</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
