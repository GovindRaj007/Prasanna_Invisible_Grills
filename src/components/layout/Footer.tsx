import { Link } from "react-router-dom";
import { Phone, Mail, Clock, Star } from "lucide-react";
import logoImage from "@/assets/logo-Prasanna-invisible-grills.webp";
import { BRANCHES, BUSINESS, PHONES } from "@/config/business";
import { LOCATIONS_BY_STATE, SERVICES } from "@/config/seo.constants";
import { BranchCard } from "@/components/common/BranchList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/details-accordion";

export function Footer() {
  return (
    <footer className="border-t bg-foreground text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-3">
            <Link to="/" aria-label={`${BUSINESS.name} – Home`} className="inline-flex">
              <img
                src={logoImage}
                alt={BUSINESS.name}
                width={182}
                height={64}
                loading="lazy"
                decoding="async"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Invisible grills, balcony &amp; window safety grills and ceiling cloth hangers – installed by our
              own teams across Telangana and Andhra Pradesh since {BUSINESS.foundingYear}.
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <div className="space-y-1">
                  {[PHONES.primary, PHONES.secondary].map((p) => (
                    <a key={p.e164} href={`tel:${p.e164}`} data-track="call" className="block text-sm hover:text-primary">
                      {p.display}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${BUSINESS.email}`} className="text-sm hover:text-primary">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm text-primary-foreground/80">{BUSINESS.hours.label}</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a
                  href={BUSINESS.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Leave a Google Review
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-2">
            <h3 className="mb-4 font-heading text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/${service.slug}`}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-primary"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/80 transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/80 transition-colors hover:text-primary">
                  Contact &amp; Branches
                </Link>
              </li>
            </ul>
          </nav>

          {/* Service Areas (all links present in HTML for crawlers) */}
          <nav aria-label="Service areas" className="lg:col-span-3">
            <h3 className="mb-4 font-heading text-lg font-semibold">Service Areas</h3>
            <Accordion type="multiple" className="w-full">
              {Object.entries(LOCATIONS_BY_STATE).map(([state, locations], i) => (
                <AccordionItem
                  key={state}
                  value={state}
                  defaultOpen={i === 0}
                  className="border-b border-primary-foreground/10"
                >
                  <AccordionTrigger className="py-2 text-sm font-medium text-primary hover:no-underline">
                    {state}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3">
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-1 pl-1">
                      {locations.map((loc) => (
                        <li key={loc.slug}>
                          <Link
                            to={`/invisible-grills-${loc.slug}`}
                            className="text-xs text-primary-foreground/70 transition-colors hover:text-primary"
                          >
                            Invisible Grills {loc.city}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </nav>

          {/* Branches */}
          <div className="lg:col-span-4">
            <h3 className="mb-4 font-heading text-lg font-semibold">Our Branches</h3>
            <ul className="grid gap-5 sm:grid-cols-2">
              {BRANCHES.map((b) => (
                <BranchCard key={b.id} branch={b} variant="compact" />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container flex flex-col items-center justify-center gap-4 py-6 md:flex-row">
          <div className="text-center text-sm text-primary-foreground/60">
            <p>
              © {BUSINESS.foundingYear}–{new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
            </p>
            <p className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-foreground">
              Made with ❤️ in Hyderabad
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
