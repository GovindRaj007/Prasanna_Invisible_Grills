import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How much weight can a ceiling cloth hanger hold?",
    answer: "Our ceiling cloth hangers are designed for heavy-duty use. The 4-rod model holds up to 25 kg, the 6-rod model up to 35 kg, and the 8-rod premium model can handle up to 50 kg of wet clothes. All hangers are tested to 1.5x their rated capacity for safety."
  },
  {
    question: "Can ceiling hangers be installed on any type of ceiling?",
    answer: "Yes, we can install on concrete, RCC, and false ceilings with proper reinforcement. For false ceilings, we use specialized mounting brackets that anchor to the main ceiling above. Our technicians assess your ceiling type during the site visit."
  },
  {
    question: "How does the pulley system work?",
    answer: "The pulley system allows you to lower the hanger to a comfortable height for loading clothes, then raise it to the ceiling for drying. Simply pull the rope to lower, and use the locking cleat to secure it at any height. No electricity required."
  },
  {
    question: "How long does installation take?",
    answer: "Professional installation typically takes 2-3 hours for standard models. This includes drilling, mounting the ceiling brackets, installing the pulley mechanism, and testing the system. We clean up all debris after installation."
  },
  {
    question: "Are ceiling cloth hangers rust-proof?",
    answer: "Yes, all our hangers feature stainless steel pipes with powder-coated finish and rust-resistant pulleys. The materials are specifically chosen to withstand humidity from wet clothes and bathroom steam."
  },
  {
    question: "What warranty is provided with ceiling cloth hangers?",
    answer: "We provide a 5-year warranty covering manufacturing defects, pulley mechanism issues, and structural problems. The warranty includes free replacement parts and service calls for covered issues."
  },
];

export function CeilingClothHangerFAQ() {
  return (
    <section className="section-bg-1 pt-8 pb-12 md:py-16">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="container relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            FAQs
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Ceiling Cloth Hanger FAQs
          </h2>
          <p className="text-lg text-muted-foreground">
            Common questions about ceiling-mounted cloth drying systems.
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
