import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Are invisible grills safe for high-rise balconies?",
    answer: "Absolutely. Our invisible grills are made from 316 marine-grade stainless steel cables with a load capacity of over 200 kg per cable. They meet international safety standards and are specifically designed for high-rise apartments. The cables are spaced at 25-40mm to prevent children and pets from passing through."
  },
  {
    question: "Will invisible grills block my balcony view?",
    answer: "No, that's the primary advantage! Our cables are only 2.5mm thick and virtually invisible from a distance. You maintain unobstructed views of the city skyline, garden, or natural surroundings while having complete safety protection."
  },
  {
    question: "How long does balcony invisible grill installation take?",
    answer: "For a standard-size balcony, installation typically takes 3-4 hours. Larger balconies or complex configurations may take up to 6 hours. We complete most residential installations in a single visit."
  },
  {
    question: "Can invisible grills be installed on curved balconies?",
    answer: "Yes, we specialize in custom installations for all balcony types including curved, angular, and irregular shapes. Our team takes precise measurements and creates custom frames to perfectly fit your balcony's unique design."
  },
  {
    question: "How do I clean invisible grills on my balcony?",
    answer: "Cleaning is simple. Use a soft cloth with water and mild soap to wipe down the cables and frames periodically. The stainless steel construction means no rust or corrosion, and no special maintenance products are required."
  },
  {
    question: "What warranty do balcony invisible grills come with?",
    answer: "We provide a comprehensive 10-year warranty covering material defects, corrosion, and structural issues. This includes free replacement of any component that fails under normal use conditions."
  },
];

export function InvisibleGrillsBalconyFAQ() {
  return (
    <section className="section-bg-1 pt-8 pb-12 md:py-16">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="container relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            FAQs
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Balcony Invisible Grill FAQs
          </h2>
          <p className="text-lg text-muted-foreground">
            Common questions about invisible grills for balconies.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="mb-4 rounded-lg border border-border/50 bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] px-6"
              >
                <AccordionTrigger className="text-left text-white hover:no-underline">
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
