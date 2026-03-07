import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "../../providers/user-provider";
import axios from "axios";
import { supabase, supabaseKey } from "@/utils/supabase/client";
import { useUpcomingRaces } from "../../providers/upcoming-races-provider";
import Image from "next/image";
import { getRunnerData, getUnsettled } from "@/utils/betfair";

type Props = {};

export default function UpcomingOrders({}: Props) {
  const [marketData, setMarketData] = React.useState<any>([]);
  const [unsettled, setUnsettled] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { user } = useUser();
  const { upcomingRaces } = useUpcomingRaces();

  const racingData = async () => {
    setMarketData(upcomingRaces);
  };
  // Executed upon load
  React.useEffect(() => {
    racingData();
    getUnsettled(user).then((res) => {
      setUnsettled(res);
    });
  }, []);

  // Fetches race data every 60 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      racingData();
      getUnsettled(user).then((res) => {
        setUnsettled(res);
      });
      setLoading(false);
    }, 12020);
    return () => clearInterval(interval);
  }, [marketData]);
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Pending Orders</CardTitle>
          <CardDescription>Orders pending a result</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead className=" ">Side</TableHead>
              <TableHead className="">Selection</TableHead>
              <TableHead className="">Venue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unsettled?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center justify-center">
                  {loading ? (
                    <Loader2 className="h-10 w-10 animate-spin mx-auto self-center" />
                  ) : (
                    "No pending orders"
                  )}
                </TableCell>
              </TableRow>
            )}
            {unsettled?.map((r: any) => (
              <TableRow key={r.id}>
                <TableCell
                  className={`${
                    r.status === "EXECUTABLE"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {r.status === "EXECUTABLE" ? "Waiting" : "Matched"}
                </TableCell>
                <TableCell>{r.side}</TableCell>
                <TableCell className="flex flex-row items-center">
                  <Image
                    className="w-6 h-6 mr-2 bg-"
                    unoptimized
                    width={24}
                    height={24}
                    src={
                      r.selection_silks_url === null
                        ? "/logos/horse.svg"
                        : `https://content.betfair.com/feeds_images/Horses/SilkColours/${r.selection_silks_url}`
                    }
                    alt={r.selection_name}
                  />
                  {r.selection_name}
                </TableCell>
                <TableCell>{r.venue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
