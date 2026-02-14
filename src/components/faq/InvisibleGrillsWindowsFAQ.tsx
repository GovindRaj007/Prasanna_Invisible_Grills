import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    question: "Are invisible grills suitable for all window types?",
    answer: "Yes, our invisible grills can be installed on sliding windows, casement windows, French windows, and fixed glass windows. We custom-design the frame and cable spacing to fit any window size and style.",
  },
  {
    question: "Will invisible grills on windows affect ventilation?",
    answer: "Not at all. The thin stainless steel cables (2-3mm) allow complete airflow. Unlike traditional iron grills, invisible grills don't obstruct natural ventilation, keeping your home well-aerated.",
  },
  {
    question: "How do invisible window grills protect children and pets?",
    answer: "The high-tensile cables are spaced 2-3 inches apart, preventing children and pets from squeezing through or accidentally falling. Each cable can withstand 200+ kg of force, making them extremely safe.",
  },
  {
    question: "Can I still clean my windows with invisible grills installed?",
    answer: "Yes, the wide cable spacing allows easy access for window cleaning. For larger windows, we can include an openable section that allows full access for cleaning and maintenance.",
  },
  {
    question: "What is the cost of invisible grills for windows?",
    answer: "The cost depends on various factors including window size, type, and specific requirements. For accurate pricing tailored to your windows, we recommend calling us at +91 7339306098. Our team will provide a free measurement and detailed quotation with transparent pricing.",
  },
  {
    question: "How long does window invisible grill installation take?",
    answer: "Most window installations are completed within 2-4 hours per window. For a typical 3BHK apartment with 6-8 windows, the entire installation can be finished in 1-2 days.",
  },
];

export function InvisibleGrillsWindowsFAQ() {
  const schemaData = {
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
    <section className="section-bg-1 relative pt-8 pb-12 md:py-16">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            FAQs
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Window Invisible Grills FAQ
          </h2>
          <p className="text-lg text-muted-foreground">
            Common questions about invisible grill installation for windows.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border/50 bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg text-white hover:no-underline">
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