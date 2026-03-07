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
import { Icons } from "../shared/icons";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { usePayment } from "@/providers/payment-provider";
import { Loader2 } from "lucide-react";

type Props = {};

function NewAccountDetails({}: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const [passwordChecks, setPasswordChecks] = React.useState({
    password: "",
    confirmPassword: "",
    longEnough: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordMatch: false,
    passwordMeetsRequirements: false,
  });
  const [customerDetails, setCustomerDetails] = React.useState({
    email: "",
    first_name: "",
    last_name: "",
  });
  const [product, setProduct] = React.useState({
    packageId: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password =
      e.target.id === "password" ? e.target.value : passwordChecks.password;
    const confirmPassword =
      e.target.id === "confirm-password"
        ? e.target.value
        : passwordChecks.confirmPassword;
    const longEnough = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/g.test(password);
    const passwordMatch = password === confirmPassword;
    setPasswordChecks({
      password,
      confirmPassword,
      longEnough,
      hasNumber,
      hasSpecialChar,
      passwordMatch,
      passwordMeetsRequirements:
        longEnough && hasNumber && hasSpecialChar && passwordMatch,
    });
  };
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // @ts-ignore
    // if (typeof window !== "undefined") {
    // const product = JSON.parse(sessionStorage.getItem("newProduct") || "");
    // const customerDetails = JSON.parse(
    //   // @ts-ignore
    //   sessionStorage.getItem("newCustomer") || ""
    // );
    try {
      console.log("product", product);
      console.log("customerDetails", customerDetails);
      if (!product) return;

      const newUserRequest = await axios.post("/api/create-user", {
        customerDetails,
        product,
        password: passwordChecks.password,
      });
      setIsLoading(false);
      if (newUserRequest.status !== 200) {
        setIsError(true);
        return;
      }
      if (newUserRequest.status === 200) {
        router.push("/pricing/confirm-email");
      }
    } catch (error) {
      setIsLoading(false);

      setIsError(true);
    }
    // }
  };

  const passwordChecksArray = [
    {
      check: passwordChecks.longEnough,
      message: "Password must be at least 8 characters long",
    },
    {
      check: passwordChecks.hasNumber,
      message: "Password must contain at least one number",
    },
    {
      check: passwordChecks.hasSpecialChar,
      message: "Password must contain at least one special character",
    },
    {
      check: passwordChecks.passwordMatch,
      message: "Passwords must match",
    },
  ];

  React.useEffect(() => {
    if (!params || params.toString().length < 1) return;
    const email = params.get("customer_email");
    const first_name = params.get("first_name");
    const last_name = params.get("last_name");
    const product = params.get("product");
    if (!email || !first_name || !last_name || !product) return;
    // @ts-ignore
    setCustomerDetails({
      email,
      first_name,
      last_name,
    });

    // @ts-ignore
    setProduct({
      packageId: product,
    });
    // if (success) setSuccess(success);
    // if (error) setError(error);
    setIsLoading(false);
  }, [params]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Setup Lay Back and Win Account</CardTitle>
        <CardDescription>
          Create your password below for the Lay Back and Win account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4 pt-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email/Username</Label>
              <Input
                id="first-name"
                placeholder={customerDetails.email}
                type="text"
                disabled
                value={customerDetails.email}
              />
              <span className="text-sm text-muted-foreground italic">
                If you need to change your email please contact support to have
                it changed
              </span>
            </div>
            <div className="flex">
              <ul className="space-y-2 text-left text-sm font-medium leading-normal">
                {passwordChecksArray.map((feature: any, index: number) => (
                  <li className="flex items-start gap-x-3" key={index}>
                    {feature.check === true ? (
                      <Icons.check className="size-5 shrink-0 text-green-500" />
                    ) : (
                      <Icons.close className="mr-3 size-5 shrink-0" />
                    )}
                    <p
                      className={
                        feature.check === true
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {feature.message}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col space-y-1.5 pt-4">
              <Label htmlFor="name">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Confirm Password</Label>
              <Input
                id="confirm-password"
                placeholder="Confirm Password"
                type="password"
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
          </div>
        </form>
        {isError && (
          <div className="bg-red-400 border-red-700 rounded-md p-4 mt-4">
            <span>
              There was an issue creating your account. Please{" "}
              <a href="">contact support</a> to finish setting up your account
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex w-full justify-between">
        <Button
          disabled={!passwordChecks.passwordMeetsRequirements || isError}
          onClick={handleSubmit}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Complete Sign Up"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default NewAccountDetails;
