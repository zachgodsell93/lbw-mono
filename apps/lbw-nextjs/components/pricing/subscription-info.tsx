"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "../ui/separator";
import { usePayment } from "@/providers/payment-provider";
import { Icons } from "../shared/icons";
import { cn } from "@/lib/utils";
type Props = {};

function SubscriptionInfo({}: Props) {
  const { product } = usePayment();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Subscription Information</CardTitle>
        <CardDescription>
          Below are the details of your subscription
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex flex-row w-full justify-between">
            <span className="font-bold text-lg">Product</span>
            <span className=" font-bold"></span>
          </div>
          <div className="flex flex-row w-full justify-between">
            <span className="font-bold underline">
              {product?.title} Subscription
            </span>
            <span className=" font-bold"></span>
          </div>
          <ul className="space-y-2 text-left text-sm font-medium leading-normal">
            {product?.benefits.map((feature: any) => (
              <li className="flex items-start gap-x-3" key={feature}>
                <Icons.check className="size-5 shrink-0 text-blue-500" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>

          <Label className="pt-4">Discount Code</Label>
          <div className="flex items-center w-full lg:w-2/3 gap-x-4 flex-row align-middle">
            <Input />
            <Button>Apply</Button>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between pt-4">
        <div className="flex flex-row w-full justify-between">
          <span className="font-bold">Total due today</span>
          <span className="">
            <span className={cn(product?.trial ? "line-through" : "font-bold")}>
              ${product?.prices.weekly}
            </span>
            {product?.trial && (
              <span className="font-bold ml-4">
                ${product?.prices.weeklyTrial}
              </span>
            )}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SubscriptionInfo;
