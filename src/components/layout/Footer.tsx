import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import logoImage from "@/assets/logo-Prasanna-invisible-grills.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  { name: "Invisible Grills", href: "/invisible-grills" },
  { name: "Invisible Grills Dealer", href: "/invisible-grills-dealer" },
  { name: "Invisible Grills for Balcony", href: "/invisible-grills-balcony" },
  { name: "Invisible Grill for Windows", href: "/invisible-grills-windows" },
  { name: "Ceiling Cloth Hanger", href: "/ceiling-cloth-hanger" },
];

const locationsByState = {
  "Andhra Pradesh": [
    { name: "Visakhapatnam", href: "/invisible-grills-visakhapatnam" },
    { name: "Vijayawada", href: "/invisible-grills-vijayawada" },
    { name: "Guntur", href: "/invisible-grills-guntur" },
    { name: "Tirupati", href: "/invisible-grills-tirupati" },
    { name: "Anantapur", href: "/invisible-grills-anantapur" },
  ],
  "Telangana": [
    { name: "Hyderabad", href: "/invisible-grills-hyderabad" },
    { name: "Secunderabad", href: "/invisible-grills-secunderabad" },
    { name: "Gachibowli", href: "/invisible-grills-gachibowli" },
    { name: "Kukatpally", href: "/invisible-grills-kukatpally" },
    { name: "Madhapur", href: "/invisible-grills-madhapur" },
    { name: "Shamshabad", href: "/invisible-grills-shamshabad" },
    { name: "Kompally", href: "/invisible-grills-kompally" },
    { name: "Miyapur", href: "/invisible-grills-miyapur" },
    { name: "Medchal", href: "/invisible-grills-medchal" },
    { name: "Kondapur", href: "/invisible-grills-kondapur" },
    { name: "Kokapet", href: "/invisible-grills-kokapet" },
    { name: "Tellapur", href: "/invisible-grills-tellapur" },
    { name: "Mahbubnagar", href: "/invisible-grills-mahbubnagar" },
    { name: "Warangal", href: "/invisible-grills-warangal" },
  ],
};

export function Footer() {
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t bg-foreground text-primary-foreground">
      <Helmet>
        {/* NAP Consistency & Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Prasanna Invisible Grills",
            "url": "https://prasannainvisible.in",
            "email": "info@prasannainvisible.in",
            "logo": "https://prasannainvisible.in/images/logo-prasanna.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-7339306098",
              "contactType": "customer service",
              "areaServed": ["AP", "TS"],
              "availableLanguage": ["en", "te", "hi"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "MVP Colony",
              "addressLocality": "Visakhapatnam",
              "addressRegion": "Andhra Pradesh",
              "postalCode": "530017",
              "addressCountry": "IN"
            }
          })}
        </script>

        {/* Opening Hours Specification */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Prasanna Invisible Grills",
            "url": "https://prasannainvisible.in",
            "email": "info@prasannainvisible.in",
            "telephone": "+91-7339306098",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "17.7231",
              "longitude": "83.0512"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "08:00",
                "closes": "19:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "09:00",
                "closes": "18:00"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "MVP Colony",
              "addressLocality": "Visakhapatnam",
              "addressRegion": "Andhra Pradesh",
              "postalCode": "530017",
              "addressCountry": "IN"
            },
            "areaServed": [
              { "@type": "City", "name": "Visakhapatnam" },
              { "@type": "City", "name": "Vijayawada" },
              { "@type": "City", "name": "Guntur" },
              { "@type": "City", "name": "Tirupati" },
              { "@type": "City", "name": "Anantapur" },
              { "@type": "City", "name": "Hyderabad" },
              { "@type": "City", "name": "Mahbubnagar" },
              { "@type": "City", "name": "Warangal" },
              { "@type": "City", "name": "Telangana" }
            ],
            "sameAs": [
              "https://www.facebook.com/prasannainvisiblegrills",
              "https://www.instagram.com/prasannainvisiblegrills",
              "https://g.page/CU35q4qYY1cSEAI"
            ]
          })}
        </script>
      </Helmet>
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <button 
              onClick={handleLogoClick}
              className="flex items-center cursor-pointer transition-transform hover:scale-105 focus:outline-none"
              aria-label="Prasanna Invisible Grills - Go to Home"
            >
              <img src={logoImage} alt="Prasanna Invisible Grills" className="h-[4rem] w-auto" />
            </button>
            <p className="text-sm text-primary-foreground/80">
              Your trusted partner for premium invisible grills and home utility solutions. 
              Protecting families across Andhra Pradesh & Telangana since 2015.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    to={service.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-primary"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">Service Areas</h3>
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(locationsByState).map(([state, locations]) => (
                <AccordionItem key={state} value={state} className="border-b border-primary-foreground/10">
                  <AccordionTrigger className="py-2 text-sm font-medium text-primary hover:no-underline">
                    {state}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <ul className="space-y-1 pl-2">
                      {locations.map((location) => (
                        <li key={location.href}>
                          <Link
                            to={location.href}
                            className="text-xs text-primary-foreground/70 transition-colors hover:text-primary"
                          >
                            {location.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Info with NAP Consistency */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="space-y-1">
                  <a href="tel:+917339306098" className="block text-sm hover:text-primary">
                    +91 7339306098
                  </a>
                  <a href="tel:+918328376098" className="block text-sm hover:text-primary">
                    +91 8328376098
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@prasannainvisible.in" className="text-sm hover:text-primary">
                  info@prasannainvisible.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-primary-foreground/80">
                  21-34/1, Viman Nagar,<br />
                  Kakani Nagar, Visakhapatnam – 530009
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-primary-foreground/80">
                  Mon - Sat: 9:00 AM - 7:00 PM<br />
                  Sunday: 10:00 AM - 5:00 PM
                </span>
              </li>
              <li className="flex items-center gap-3 mt-4 pt-3 border-t border-primary-foreground/10">
                <a 
                  href="https://g.page/r/CU35q4qYY1cSEAI/review" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  ⭐ Leave a Google Review
                </a>
              </li>
              <li className="flex items-center gap-3">
                <a 
                  href="https://www.google.com/maps/place/Prasanna+Invisible+Grills/@17.7384594,83.2258118,17z/data=!3m1!4b1!4m6!3m5!1s0x858f2b0d6606a653:0x125763988aabf94d!8m2!3d17.7384594!4d83.2258118!16s%2Fg%2F11y_zxc_5h?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container flex flex-col items-center justify-center gap-4 py-6 md:flex-row">
          <div className="text-center text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} Prasanna Invisible Grills. All rights reserved.</p>
            <p className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-foreground">Made with ❤️ in Hyderabad</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
