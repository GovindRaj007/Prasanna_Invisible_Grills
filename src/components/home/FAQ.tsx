import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    question: "What are invisible grills and how do they work?",
    answer:
      "Invisible grills are modern safety systems made from high-tensile stainless steel cables (typically 316 marine grade) stretched between aluminum frames. They provide robust protection against falls while maintaining clear, unobstructed views from balconies and windows. The cables are spaced 2-3 inches apart, making them virtually invisible from a distance.",
  },
  {
    question: "Are invisible grills safe for children and pets?",
    answer:
      "Absolutely! Our invisible grills are specifically designed with child and pet safety as the primary concern. They can withstand up to 600 kg of impact force and feature cable spacing that prevents any possibility of slipping through. All materials are non-toxic and certified safe for residential use.",
  },
  {
    question: "How long does the installation process take?",
    answer:
      "Most installations are completed within 4-8 hours for a standard apartment. Larger properties or complex installations may take 1-2 days. Our team ensures minimal disruption to your daily routine and leaves the installation area clean and tidy after completion.",
  },
  {
    question: "What warranty do you provide on your installations?",
    answer:
      "We provide a comprehensive 10-year warranty on all our invisible grill installations, covering both materials and workmanship. For ceiling cloth hangers, we offer a 5-year warranty. This includes free replacement of any defective components and complimentary maintenance checks during the warranty period.",
  },
  {
    question: "Do invisible grills obstruct the view from my balcony?",
    answer:
      "Not at all! That's the primary advantage of invisible grills. The thin stainless steel cables are barely visible from normal viewing distances, allowing you to enjoy unobstructed views of the outside. They're designed to be virtually invisible while providing maximum safety.",
  },
  {
    question: "How do I maintain invisible grills?",
    answer:
      "Maintenance is minimal. We recommend wiping the cables with a damp cloth every few months to remove dust and debris. Avoid using abrasive cleaners. Our team also provides annual maintenance services to ensure optimal performance and longevity of your installation.",
  },
  {
    question: "Do you provide services in my area?",
    answer:
      "We currently serve all major areas in Visakhapatnam, Rajahmundry, Vijayawada, Guntur, Tirupati, and Anantapur. For locations outside these cities, please contact us for availability. We're constantly expanding our service areas across Andhra Pradesh.",
  },
  {
    question: "What is the cost of invisible grill installation?",
    answer:
      "The cost of invisible grills depends on various factors including the area to be covered and specific requirements. For accurate pricing tailored to your needs, we recommend calling us directly at +91 7339306098. Our team will provide a free site visit and a detailed quotation with transparent pricing and no hidden charges.",
  },
];

export function FAQ() {
  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="section-bg-5 relative py-16 md:py-24">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            FAQ
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our invisible grills and 
            installation services.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border/50 bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-heading text-base font-semibold text-white hover:no-underline md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
