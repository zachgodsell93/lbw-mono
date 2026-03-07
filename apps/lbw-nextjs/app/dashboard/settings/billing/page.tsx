import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StripeProvider } from "@/providers/stripe-provider";
import Overview from "@/components/settings/billing/overview";

type Props = {};

export default function page({}: Props) {
  return (
    <StripeProvider>
      <main className="flex  flex-col gap-4 md:gap-8">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Billing & Subscription</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
          <div className="grid w-full gap-6">
            <Overview />
          </div>
        </div>
      </main>
    </StripeProvider>
  );
}
