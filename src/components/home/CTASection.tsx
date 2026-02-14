import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function CTASection() {
  return (
    <section className="section-bg-4 relative py-16 md:py-24">
      <div className="absolute inset-0 grid-pattern-dark opacity-20" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm md:p-12">
          <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
            Ready to Protect Your Home?
          </h2>
          <p className="mb-8 text-lg text-white/70">
            Get a free site visit and quotation today. Our experts will assess your requirements 
            and provide the best solution for your needs.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full cta-gradient text-white hover:opacity-90 sm:w-auto"
              asChild
            >
              <Link to="/contact" className="flex items-center gap-2">
                Get Free Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              asChild
            >
              <a href="tel:+917339306098" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call: +91 73393 06098
              </a>
            </Button>

            <Button
              size="lg"
              className="w-full bg-[#25D366] text-white hover:bg-[#20BD5A] sm:w-auto"
              asChild
            >
              <a
                href="https://wa.me/917339306098"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
