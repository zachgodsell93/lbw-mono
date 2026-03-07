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
import { setNewPassword } from "./action";
import BackButton from "@/components/shared/back-button";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState<string | null>(null);
  const [passwordConfirm, setPasswordConfirm] = React.useState<string | null>(
    null
  );
  const [passwordMeetsRequirements, setPasswordMeetsRequirements] =
    React.useState(false);

  const router = useRouter();

  async function setNewPassword() {
    if (!password) return;
    const { error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) {
      alert("There was an error resetting your password. Please try again.");
    }
    router.push(`/dashboard`);
  }

  useEffect(() => {
    if (!password || !passwordConfirm) return;
    if (password === passwordConfirm && password.length > 8) {
      setPasswordMeetsRequirements(true);
    } else {
      setPasswordMeetsRequirements(false);
    }
  }, [password, passwordConfirm]);

  return (
    <div className="w-full grid h-screen">
      {/* <div className="absolute top-0 left-0 p-4 md:p-10 ">
        <BackButton />
      </div> */}

      <Card className="mx-auto my-auto min-w-[500px]">
        <CardHeader>
          <Image
            src={"/logos/horse.svg"}
            className="mx-auto"
            width={100}
            height={100}
            alt="Lay Back and Win"
          />
          <CardTitle className="text-2xl">Password Reset</CardTitle>
          <CardDescription>Please set your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input
                id="password-confirm"
                name="password-confirm"
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            {passwordMeetsRequirements === false && (
              <div className="bg-red-400/30 p-2 rounded-md">
                <p className="text-red-400 text-center">
                  Your password must be at least 8 characters long
                </p>
              </div>
            )}
            <Button
              type="submit"
              onClick={() => {
                setLoading(true);
                setNewPassword();
              }}
              className="w-full"
              disabled={!passwordMeetsRequirements || loading}
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "Set New Password"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
