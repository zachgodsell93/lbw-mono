"use client";

import { useState } from "react";
import Link from "next/link";

import { pricingData } from "@/config/subscriptions";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import { SubscriptionPlan } from "@/config/subscriptions";
import { usePayment } from "@/providers/payment-provider";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

interface PricingCardsProps {
  userId?: string;
  //   subscriptionPlan?: UserSubscriptionPlan;
}

export function PricingCards({ userId }: PricingCardsProps) {
  //   const isYearlyDefault =
  //     !subscriptionPlan?.stripeCustomerId || subscriptionPlan.interval === "year" ? true : false;
  const [isMonthly, setIsMonthly] = useState<boolean>(false);

  const toggleBilling = () => {
    setIsMonthly(!isMonthly);
  };

  const PricingCard = ({ offer }: { offer: SubscriptionPlan }) => {
    const router = useRouter();
    const { setProduct } = usePayment();

    const handleSelectPlan = () => {
      setProduct({ ...offer, isWeekly: !isMonthly });
      router.push("/pricing/subscribe");
    };
    return (
      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-3xl border shadow-sm",
          offer.title.toLocaleLowerCase() === "pro"
            ? "-m-0.5 border-2 border-blue-400"
            : ""
        )}
        key={offer.title}
      >
        <div className="min-h-[150px] items-start space-y-4 bg-muted/50 p-6">
          <p className="flex font-urban text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {offer.title}
          </p>
          {offer.trial && (
            <Badge
              className={cn(
                "ml-2 absolute top-0 right-10 text-lg font-bold rounded-md bg-green-500/30 text-white border-green-500"
              )}
            >
              Trial Available
            </Badge>
          )}
          <div className="flex flex-row">
            <div className="flex items-end">
              <div className="flex text-left text-3xl font-semibold leading-6">
                {isMonthly && offer.prices.monthly > 0 ? (
                  <>
                    <span className="mr-2 text-muted-foreground/80 line-through">
                      ${offer.prices.weekly}
                    </span>
                    <span>${offer.prices.monthly / 4}</span>
                  </>
                ) : (
                  `$${offer.prices.weekly}`
                )}
              </div>
              <div className="-mb-1 ml-2 text-left text-sm font-medium text-muted-foreground">
                <div>/week</div>
              </div>
            </div>
          </div>

          {offer.prices.monthly > 0 ? (
            <div className="text-left text-sm text-muted-foreground">
              {isMonthly
                ? `$${offer.prices.monthly} will be charged when monthly`
                : offer.trial === true
                ? "once your 7 day trial ends"
                : "when charged weekly"}
            </div>
          ) : null}
        </div>

        <div className="flex h-full flex-col justify-between gap-16 p-6">
          <ul className="space-y-2 text-left text-sm font-medium leading-normal">
            {offer.benefits.map((feature: any) => (
              <li className="flex items-start gap-x-3" key={feature}>
                <Icons.check className="size-5 shrink-0 text-blue-500" />
                <p>{feature}</p>
              </li>
            ))}

            {offer.limitations.length > 0 &&
              offer.limitations.map((feature: any) => (
                <li
                  className="flex items-start text-muted-foreground"
                  key={feature}
                >
                  <Icons.close className="mr-3 size-5 shrink-0" />
                  <p>{feature}</p>
                </li>
              ))}
          </ul>
          <Button disabled={offer.disabled} onClick={() => handleSelectPlan()}>
            {offer.disabled ? "Coming Soon" : "Sign Up Now"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <section className="container flex flex-col items-center text-center">
      <HeaderSection label="Pricing" title="Start at full speed !" />

      <div className="mb-4 mt-10 flex items-center gap-5">
        <ToggleGroup
          type="single"
          size="sm"
          defaultValue={isMonthly ? "monthly" : "weekly"}
          onValueChange={toggleBilling}
          aria-label="toggle-year"
          className="h-9 overflow-hidden rounded-full border bg-background p-1 *:h-7 *:text-muted-foreground"
        >
          <ToggleGroupItem
            value="monthly"
            className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
            aria-label="Toggle yearly billing"
          >
            Monthly (-20%)
          </ToggleGroupItem>
          <ToggleGroupItem
            value="weekly"
            className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
            aria-label="Toggle monthly billing"
          >
            Weekly
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="mx-auto grid max-w-6xl gap-5 bg-inherit py-5 md:grid-cols-3 lg:grid-cols-3">
        {pricingData.map((offer) => (
          <PricingCard offer={offer} key={offer.title} />
        ))}
      </div>

      <p className="mt-3 text-balance text-center text-base text-muted-foreground">
        Email{" "}
        <a
          className="font-medium text-primary hover:underline"
          href="mailto:info@laybackandwin.com.au"
        >
          info@laybackandwin.com.au
        </a>{" "}
        for to contact our support team.
        <br />
      </p>
    </section>
  );
}
