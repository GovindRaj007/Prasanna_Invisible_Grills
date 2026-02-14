import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the minimum order quantity for dealership?",
    answer: "For retail dealers, the minimum order is 50 running feet per month. Contractor partners need 100 running feet, and exclusive distributors require 500 running feet monthly. We also offer flexible terms for new dealers starting out."
  },
  {
    question: "What support do you provide to dealers?",
    answer: "We provide comprehensive support including installation training, marketing materials, product catalogs, lead sharing in your territory, technical assistance, and after-sales support. Our team is available for on-site training and ongoing guidance."
  },
  {
    question: "How do I apply for exclusive territory rights?",
    answer: "Exclusive territory rights are available for committed distributors. Submit your application through our contact form, and our business development team will assess your market potential, experience, and investment capacity to determine eligibility."
  },
  {
    question: "What is the profit margin for dealers?",
    answer: "Dealer margins vary based on the partnership level. Retail dealers typically earn 25-30%, contractor partners 20-25%, and exclusive distributors can earn up to 35% margin. Volume-based incentives are also available."
  },
  {
    question: "Do you provide product warranty for dealer sales?",
    answer: "Yes, all products sold through authorized dealers carry our standard 10-year manufacturer warranty. This covers material defects and corrosion. Dealers receive warranty claim support and replacement assistance."
  },
  {
    question: "What is the delivery timeline for bulk orders?",
    answer: "Standard bulk orders are dispatched within 5-7 business days. Express delivery within 3 days is available at additional cost. We maintain ready stock for popular sizes and configurations."
  },
];

export function InvisibleGrillsDealerFAQ() {
  return (
    <section className="section-bg-1 pt-8 pb-12 md:py-16">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="container relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            FAQs
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Dealer & Wholesale FAQs
          </h2>
          <p className="text-lg text-muted-foreground">
            Common questions about becoming an invisible grills dealer.
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
