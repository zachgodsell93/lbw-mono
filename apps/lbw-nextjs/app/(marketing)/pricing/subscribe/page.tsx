"use client";
import PaymentForm from "@/components/pricing/payment-form";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import { stripePromise } from "@/lib/stripe";
import PageFade from "@/components/shared/page-fade";
import CustomerDetails from "@/components/pricing/customer-details";
import SubscriptionInfo from "@/components/pricing/subscription-info";
import { usePayment } from "@/providers/payment-provider";
import { Appearance, StripeElementsOptions } from "@stripe/stripe-js";

type Props = {};

function Subscribe({}: Props) {
  const { clientSecret } = usePayment();

  const appearance: Appearance = {
    theme: "night",
    variables: {
      colorBackground: "#000",
      colorPrimary: "#0D85F2",
    },
  };
  const options: StripeElementsOptions = {
    clientSecret: clientSecret || "",
    appearance: appearance,
  };
  useEffect(() => {
    console.log("clientSecret", clientSecret);
  }, [clientSecret]);

  return (
    <PageFade>
      <main className="flex flex-col-reverse lg:flex-row gap-4 pt-10 px-6 lg:px-40">
        <div className="flex flex-col w-full gap-y-4 lg:w-2/3">
          <CustomerDetails />
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm clientSecret={clientSecret} />
            </Elements>
          )}
        </div>
        <div className="flex flex-col w-full lg:w-1/3">
          <SubscriptionInfo />
        </div>
      </main>
    </PageFade>
  );
}

export default Subscribe;
