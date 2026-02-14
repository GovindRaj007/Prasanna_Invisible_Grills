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
    question: "What material are invisible grills made of?",
    answer:
      "Our invisible grills are made from 316 marine-grade stainless steel cables, which offer superior corrosion resistance. The frame is made of powder-coated aluminum. This combination ensures durability, aesthetic appeal, and long-lasting performance even in coastal areas.",
  },
  {
    question: "Do invisible grills obstruct the view from my balcony?",
    answer:
      "Not at all! That's the primary advantage of invisible grills. The thin 2mm stainless steel cables are barely visible from normal viewing distances, allowing you to enjoy unobstructed views of the outside. They're designed to be virtually invisible while providing maximum safety.",
  },
  {
    question: "How much weight can invisible grills withstand?",
    answer:
      "Our invisible grills can withstand up to 600 kg of impact force per cable. The entire system is designed to handle significant pressure, making them safe for children and pets. They meet international safety standards for fall protection.",
  },
  {
    question: "How long does invisible grill installation take?",
    answer:
      "Most invisible grill installations are completed within 4-8 hours for a standard balcony or window. Larger projects covering multiple areas may take 1-2 days. Our team ensures minimal disruption to your daily routine.",
  },
  {
    question: "What is the cost of invisible grill installation?",
    answer:
      "The cost of invisible grills depends on various factors including the area to be covered and specific requirements. For accurate pricing tailored to your needs, we recommend calling us directly at +91 7339306098. Our team will provide a free site visit and a detailed quotation with transparent pricing and no hidden charges.",
  },
  {
    question: "How do I maintain invisible grills?",
    answer:
      "Maintenance is minimal. Simply wipe the cables with a damp cloth every few months to remove dust. Avoid using abrasive cleaners or chemicals. We also offer annual maintenance services to ensure optimal performance.",
  },
  {
    question: "What warranty do you provide on invisible grills?",
    answer:
      "We provide a comprehensive 10-year warranty on all invisible grill installations, covering both materials and workmanship. This includes free replacement of any defective components during the warranty period.",
  },
];

export function InvisibleGrillsFAQ() {
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
    <section className="section-bg-3 relative pt-8 pb-12 md:py-16">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            FAQ
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Invisible Grills FAQs
          </h2>
          <p className="text-lg text-muted-foreground">
            Common questions about invisible grill installation, materials, and maintenance.
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
