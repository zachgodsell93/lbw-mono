"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useTrend } from "@/providers/trend-provider";
import { TrendMarketData } from "@/types/customData.types";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RaceData, useLayOnly } from "@/providers/lay-only";
type Props = {};

function SelectionsTable({}: Props) {
  const { marketData, racingData } = useLayOnly();
  const scratchedClass = (isScratched: boolean) => {
    return isScratched ? "line-through" : "";
  };
  useEffect(() => {
    racingData();
  }, []);

  if (!marketData) return null;

  return (
    <Card className="min-w-full max-sm:w-screen ">
      <CardHeader>
        <CardTitle>Selections</CardTitle>
        <CardDescription>Lay Selections for Today</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden lg:table-cell">Start Time</TableHead>
              <TableHead>Race</TableHead>
              <TableHead>Horse</TableHead>
              <TableHead>Expected Units</TableHead>

              <TableHead className="text-right">Side</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketData
              .sort((a, b) => {
                // First, compare scratched status
                if (a.is_scratched !== b.is_scratched) {
                  return a.is_scratched ? 1 : -1; // Scratched horses go to bottom
                }
                // Then sort by market start time
                return (
                  new Date(a.market_start_time ?? "").getTime() -
                  new Date(b.market_start_time ?? "").getTime()
                );
              })
              .map((market: RaceData) => (
                <>
                  <TableRow key={market.entrant_id}>
                    <TableCell
                      className={cn(
                        "hidden lg:table-cell",
                        scratchedClass(market.is_scratched ?? false)
                      )}
                    >
                      {moment(market.market_start_time).format("h:mma")}
                    </TableCell>

                    <TableCell
                      className={scratchedClass(market.is_scratched ?? false)}
                    >
                      <div className="font-medium">{market.venue}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        R{market.race_number}
                      </div>
                    </TableCell>
                    <TableCell
                      className={scratchedClass(market.is_scratched ?? false)}
                    >
                      <div className="font-medium">
                        {market.horse_number}. {market.horse_name}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        Current Price: ${market.price_latest}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        Our Lay Price: $
                        {market.price_latest
                          ? (market.price_latest * 1.1).toFixed(2)
                          : "No Price"}
                      </div>
                    </TableCell>
                    <TableCell
                      className={scratchedClass(market.is_scratched ?? false)}
                    >
                      <div className="font-medium">
                        Units:
                        {market.price_latest
                          ? Math.ceil(10 / market.price_latest)
                          : "No Price"}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        Expected Liability:{" "}
                        {market.price_latest
                          ? (
                              Math.ceil((10 / market.price_latest) * 1.1) *
                                market.price_latest -
                              Math.ceil((10 / market.price_latest) * 1.1)
                            ).toFixed(2)
                          : "No Price"}{" "}
                        Units
                      </div>
                    </TableCell>
                    <TableCell className="flex gap-x-4 justify-end">
                      {market.lay ? (
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-md p-2",
                            "border-pink-500 bg-pink-500/50"
                          )}
                        >
                          Lay
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-md p-2",
                            "border-blue-500 bg-blue-500/50"
                          )}
                        >
                          Back
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </CardContent>
      {/* <CardFooter>
    <div className="text-xs text-muted-foreground">
      Showing <strong>1-10</strong> of <strong>32</strong> products
    </div>
  </CardFooter> */}
    </Card>
  );
}

export default SelectionsTable;
