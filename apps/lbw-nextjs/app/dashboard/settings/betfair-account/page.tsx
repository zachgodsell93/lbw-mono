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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/providers/user-provider";
import { cn } from "@/lib/utils";
import axios from "axios";
import { supabase } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import BetfairCodeHandler from "@/components/settings/betfair-code-handler";

type Props = {};

export default function BetfairAccount({}: Props) {
  const [complete, setComplete] = React.useState(false);
  const [code, setCode] = React.useState<string | null | undefined>("");
  const [open, setOpen] = React.useState(false);

  const { user } = useUser();
  const params = useSearchParams();
  const router = useRouter();

  const betfairAccess = () => {
    const url =
      "https://identitysso.betfair.com/view/vendor-login?client_id=117531&response_type=code&redirect_uri=dashboard/settings/betfair-account";
    window.open(url, "_blank");
  };

  const signupBetfair = async () => {
    const url =
      "https://register.betfair.com.au/account/registration?clkID=660860_3C9FD1C7179140B683E834BA556D2CAA&rfr=660860&ttp=111&pid=4653327&bid=11207";
    window.open(url, "_blank");
  };

  const disconnectBetfair = async () => {
    const url = `/api/betfair-disconnect`;

    const config = {
      url: url,
      method: "post",
      crossdomain: true,
      data: {
        vendor_id: user?.betfair_vendor_client_id,
        access_token: user?.betfair_access_token,
      },
    };

    const res = await axios(config);
    console.log(res);
    window.location.reload();
  };

  // TODO: Add in handler for URL params

  React.useEffect(() => {
    const code = params.get("code");
    if (code && user) {
      setCode(code);
      setOpen(true);
    }
  }, [user, code]);

  return (
    <main className="flex  flex-col gap-4 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <div className="grid w-full gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
              <CardDescription>
                Status of your Betfair Account with Lay Back and Win
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-4">
                <div>
                  <Label className="mr-2">Connection</Label>
                  <ActiveBadge betfairToken={user?.betfair_access_token} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              {user?.betfair_access_token ? (
                <Button onClick={disconnectBetfair} variant="destructive">
                  Disconnect Betfair
                </Button>
              ) : (
                <div className="flex gap-x-4">
                  <Button
                    onClick={signupBetfair}
                    className="bg-yellow-400"
                    variant="default"
                  >
                    Sign Up to Betfair
                  </Button>
                  <Button onClick={betfairAccess} variant="default">
                    Connect Betfair
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
          <BetfairCodeHandler
            openHandler={setOpen}
            open={open}
            code={code}
            user={user}
          />
        </div>
      </div>
    </main>
  );
}

const ActiveBadge = ({
  betfairToken,
}: {
  betfairToken: string | null | undefined;
}) => (
  <Badge
    variant="outline"
    className={cn(
      "text-md b",
      !betfairToken ? "border-red-300" : "border-green-300"
    )}
  >
    {betfairToken ? "Active" : "Inactive"}
  </Badge>
);
