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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePayment } from "@/providers/payment-provider";
import { useRouter } from "next/navigation";

type Props = {};

export default function CustomerDetails({}: Props) {
  const {
    customerDetails,
    product,
    setCustomerDetails,
    createCustomer,
    createSubscription,
    setClientSecret,
    setCustomerDetailsComplete,
    customerDetailsComplete,
  } = usePayment();

  const handleSubmit = async () => {
    setCustomerDetails({
      ...customerDetails,
      name: `${customerDetails.first_name} ${customerDetails.last_name}`,
    });
    setCustomerDetailsComplete(true);
    if (typeof window === "undefined") return;
    // @ts-ignore
    window.sessionStorage.setItem("newEmail", customerDetails.email);
    // @ts-ignore
    window.sessionStorage.setItem(
      "newCustomer",
      JSON.stringify(customerDetails)
    );
    // @ts-ignore
    window.sessionStorage.setItem("newProduct", JSON.stringify(product));
    const cust = await createCustomer(
      `${customerDetails.first_name} ${customerDetails.last_name}`,
      customerDetails.email
    );

    const id = cust.id;
    console.log("stripe customer", cust);

    if (!id) {
      console.log("issue creating customer");
      return;
    }

    const sub = await createSubscription(id);
    console.log("subscription", sub);
    setClientSecret(sub.clientSecret);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Subscribe</CardTitle>
        <CardDescription>
          Enter your details below to subscribe to our Pro Plan
        </CardDescription>
      </CardHeader>
      {!customerDetailsComplete && (
        <>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="First Name"
                    type="text"
                    value={customerDetails.first_name}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Last Name</Label>
                  <Input
                    id="last-name"
                    placeholder="Last Name"
                    value={customerDetails.last_name}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@email.com"
                    value={customerDetails.email}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Mobile</Label>
                  <Input
                    id="name"
                    type="tel"
                    placeholder="0400 000 000"
                    value={customerDetails.mobile}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        mobile: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Back</Button>
            <Button onClick={handleSubmit}>Next</Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
