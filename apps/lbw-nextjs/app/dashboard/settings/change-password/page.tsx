"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/providers/user-provider";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/utils/supabase/client";

type Props = {};

export default function ChangePassword({}: Props) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { toast } = useToast();

  const savePassword = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      return toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }

    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully",
      variant: "success",
    });
  };

  const { user } = useUser();
  return (
    <main className="flex  flex-col gap-4 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Change Password</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <div className="grid w-full gap-6">
          <Card x-chunk="dashboard-04-chunk-2">
            <form onSubmit={savePassword}>
              <CardHeader>
                {/* <CardTitle>Change</CardTitle> */}
                <CardDescription>Update your password below</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-x-4">
                    <Input
                      type="password"
                      placeholder="New Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="Confirm Password "
                      name="confirm-password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {password !== confirmPassword && password.length < 8 && (
                    <div className="bg-red-400/30 p-2 rounded-md">
                      <p className="text-red-400">
                        Your password must be at least 8 characters long
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button type="submit">Save New Password</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </main>
  );
}
