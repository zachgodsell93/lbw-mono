import { PricingCards } from "@/components/pricing/pricing-cards";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { Skeleton } from "@/components/ui/skeleton";
// import { getUserSubscriptionPlan } from '@/lib/subscription';

export const metadata = {
  title: "Pricing",
};

export default async function PricingPage() {
  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
