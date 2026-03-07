import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "../shared/header-section";

const pricingFaqData = [
  {
    id: "item-1",
    question: "Do you offer a free trial?",
    answer:
      "We don't offer a free trial, we do however have a moneyback guarantee on our Pro and Premium Subcriptions",
  },
  {
    id: "item-2",
    question: "How much does the Basic plan cost?",
    answer:
      "Our Plans start from $59 a week, if you choose to pay monthly you get an additional 20% off",
  },
  {
    id: "item-3",
    question: "What is the price of the Pro Monthly plan?",
    answer:
      "The Pro Monthly plan is available for $99 per week. It offers advanced features and a money back guarentee if we don't hit our 10 units a week",
  },
  {
    id: "item-4",
    question: "Why are your services so expensive compared to others?",
    answer:
      "We believe what we offer is completely unique to what is in the market at the moment, its a completely integrated and automated platform. Our platform is a premium platform that offers more value than what we charge. To develop a model that is consistently profitable and scalable, we need to charge a premium price. We also offer a money back guarantee if we don't hit our 10 units a week target.",
  },
  //   {
  //     id: "item-5",
  //     question: "Is there a trial period for the paid plans?",
  //     answer:
  //       "We offer a 14-day free trial for both the Pro Monthly and Pro Annual plans. It's a great way to experience all the features before committing to a paid subscription.",
  //   },
];

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Explore our FAQ to find quick answers to common
            inquiries. If you need further assistance, don't hesitate to
            contact us."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
