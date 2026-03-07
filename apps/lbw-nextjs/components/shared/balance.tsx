"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { betfairAccountRequest } from "@/utils/betfair";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "../../providers/user-provider";
import { Loader2 } from "lucide-react";
import { useLogger } from "next-axiom";

type Props = {};

export default function BalanceButton({}: Props) {
  const [balance, setBalance] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const log = useLogger();
  const { user } = useUser();
  React.useEffect(() => {
    log.info("Getting balance");
    if (user && loading) {
      const getBalance = async () => {
        let accessToken = user.betfair_access_token;
        if (!accessToken) {
          return;
        }
        let data = {
          wallet: "UK",
        };
        if (accessToken !== undefined || null) {
          let result = await betfairAccountRequest(
            accessToken,
            "getAccountFunds",
            data
          );

          // if (result.data.error?.code) {
          //   refreshUser();
          // }
          if (!result) {
            setBalance(0);
            return;
          }
          setBalance(result.data.result.availableToBetBalance);
        } else {
          setTimeout(() => {
            setBalance(0);
          }, 2000);
        }
      };
      getBalance();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [user, loading]);
  return (
    <Button
      variant="outline"
      onClick={() => setLoading(true)}
      className="hidden md:block"
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <span className="">${balance}</span>
      )}
    </Button>
  );
}
