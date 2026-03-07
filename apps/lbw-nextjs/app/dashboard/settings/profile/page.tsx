"use client";
import React from "react";
import Link from "next/link";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/providers/user-provider";
import { useTheme } from "next-themes";
// import { UserUpdate } from "@/providers/user-provider";

type Props = {};

export default function Profile({}: Props) {
  const { user, updateUserDetails } = useUser();
  const [userDetails, setUserDetails] = React.useState<any>(null);
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    if (user) {
      setUserDetails(user);
    }
  }, [user]);

  if (!user || !userDetails) return null;
  return (
    <main className="flex  flex-col gap-4 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <div className="grid w-full gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>
                To change your email, please contact support.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input
                  disabled
                  placeholder="email"
                  value={userDetails.email || ""}
                />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button disabled>Save</Button>
            </CardFooter>
          </Card>
          {/* <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle>Name</CardTitle>
              <CardDescription>
                Update your name to be displayed on the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <div className="flex flex-row gap-x-4">
                  <Input
                    placeholder="First Name"
                    value={userDetails.first_name || ""}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        first_name: e.target.value,
                      })
                    }
                    name="first-name"
                  />
                  <Input
                    placeholder="Last Name"
                    value={userDetails.last_name || ""}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        last_name: e.target.value,
                      })
                    }
                    name="last-name"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={() => updateUserDetails(userDetails)}>
                Save
              </Button>
            </CardFooter>
          </Card> */}
          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Change the theme of the LBW Platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                className="w-full"
                value={theme}
                onValueChange={(e) => {
                  setTheme(e);
                }}
              >
                <TabsList>
                  <TabsTrigger value="dark">Dark</TabsTrigger>
                  <TabsTrigger value="light">Light</TabsTrigger>
                  <TabsTrigger value="system">system</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
