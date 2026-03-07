"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login, passwordReset } from "./action";
import BackButton from "@/components/shared/back-button";
import { Loader2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    if (!params || params.toString().length < 1) return;
    const error = params.get("error");
    const success = params.get("success");
    if (success) setSuccess(success);
    if (error) setError(error);
    setLoading(false);
  }, [params]);

  return (
    <div className="w-full grid h-screen">
      <div className="absolute top-0 left-0 p-4 md:p-10 ">
        <BackButton />
      </div>

      <Card className="mx-auto my-auto max-w-sm">
        {/* {newUser && (
          <Card className=" max-w-sm mt-4 mx-4 bg-green-300/20">
            <CardHeader>
              <CardTitle className="text-2xl">Confirm Email</CardTitle>
              <CardDescription>
                Before you can login please confirm your email
              </CardDescription>
            </CardHeader>
          </Card>
        )} */}
        <CardHeader>
          <Image
            src={"/logos/horse.svg"}
            className="mx-auto"
            width={100}
            height={100}
            alt="Lay Back and Win"
          />
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                {error && (
                  <div className="flex items-center bg-red-500/50 p-4 rounded-lg">
                    <p className="text-red-200">
                      There was an issue with your login. Please try again.{" "}
                      <br />
                      <br />
                      <span className="underline">{error}</span>
                    </p>
                  </div>
                )}
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="underline" variant="link">
                        Reset Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <form action={passwordReset}>
                        <DialogHeader>
                          <DialogTitle>Forgot password</DialogTitle>
                          <DialogDescription>
                            Enter your email to send a password reset link
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="flex flex-col gap-4">
                            {success && (
                              <div className="flex items-center bg-green-500/50 p-4 rounded-lg">
                                <p className="text-green-200">
                                  Your password reset has been sent. Please
                                  check your spam/junk folder
                                </p>
                              </div>
                            )}
                            <Label htmlFor="name" className="text-left">
                              Email
                            </Label>
                            <Input
                              id="email-reset"
                              name="email-reset"
                              placeholder="joe@email.com"
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            className="w-full"
                            type="submit"
                            onClick={() => {
                              setLoading(true);
                            }}
                          >
                            Send Password Reset
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button
                type="submit"
                onClick={() => setLoading(true)}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
