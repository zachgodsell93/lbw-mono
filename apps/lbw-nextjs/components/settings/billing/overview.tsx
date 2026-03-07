"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStripeUser } from "@/providers/stripe-provider";
import { Label } from "@/components/ui/label";
import moment from "moment";
import Image from "next/image";
import { useUser } from "@/providers/user-provider";

type Props = {};

type CardImage = { [key: string]: string };
const cardImage: CardImage = {
  visa: "1",
  mastercard: "2",
  amex: "22",
};

export default function Overview({}: Props) {
  const { subscription, product, paymentMethod, customer } = useStripeUser();
  const { user } = useUser();

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Overview</CardTitle>
        {/* <CardDescription>
          Manage your Lay Back and Win Subscription and payment settings
        </CardDescription> */}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col justify-between gap-6">
          <div className="flex flex-row justify-between ">
            <Label className="font-bold">Current Plan</Label>
            <span>{product?.name}</span>
          </div>
          <div className="flex flex-row justify-between">
            <Label className="font-bold">Next Payment</Label>
            <span>
              {moment
                .unix(subscription?.current_period_end as number)
                .format("DD MMM")}{" "}
              - $
              {(
                (subscription?.items.data[0].price.unit_amount || 0) / 100
              ).toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <Label className="font-bold">Credit On Account</Label>
            {customer?.balance && (
              <span>{((customer?.balance * -1) / 100).toFixed(2)} - $</span>
            )}
          </div>

          <div className="flex flex-row justify-between">
            <Label>Payment Method</Label>
            <div className="flex flex-row gap-x-2">
              <Image
                alt={paymentMethod?.card?.brand || "card"}
                src={`/images/card-icons/${
                  cardImage[`${paymentMethod?.card?.brand}`]
                }.png`}
                height={20}
                width={40}
              />
              {paymentMethod?.card?.last4}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            // open new tab with url
            const url = `https://billing.stripe.com/p/login/4gw4gIe3k2ucbM47ss?prefilled_email=${user.email}`;
            window.open(url, "_blank");
          }}
        >
          Change, Update or Cancel Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
