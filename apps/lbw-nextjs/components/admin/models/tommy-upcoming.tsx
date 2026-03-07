"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { cn } from "@/lib/utils";
import { TommyData, useTommy, TommyUpcoming } from "@/providers/tommy-provider";
type Props = {};

export default function TommyResults({}: Props) {
  const { races } = useTommy();
  if (!races) return null;
  return (
    <Card className="max-sm:mx-4 min-w-full max-sm:w-screen ">
      <CardHeader>
        <CardTitle>Upcoming Races</CardTitle>
        <CardDescription>Tommys upcoming races</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <MetricsTop /> */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Count</span>
              </TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Race</TableHead>
              <TableHead className="hidden md:table-cell">Selection</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Side</TableHead>
              <TableHead className="hidden md:table-cell">Prob.</TableHead>
              <TableHead className="sr-only">Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {races.map((result: TommyUpcoming, index: number) => (
              <TableRow key={index} className="font-bold">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {moment(result.market_start_time).format("h:mma")}
                </TableCell>
                <TableCell>
                  {result.venue_name} - R{result.raceno}
                </TableCell>
                <TableCell>
                  {result.horse_number}. {result.horse_name}
                </TableCell>
                <TableCell>
                  {result.price_jump
                    ? result.price_jump.toFixed(2)
                    : result.price_latest?.toFixed(2)}
                </TableCell>
                <TableCell>
                  {" "}
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-md rounded-sm",
                      result.side === "BACK"
                        ? "border-blue-500"
                        : "border-pink-500"
                    )}
                  >
                    {result.side}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="hidden md:inline">
                    {result.prob_winner?.toFixed(2)}{" "}
                    {result.ml_winner === "LOSER"
                      ? "-L"
                      : result.ml_winner === "WINNER"
                      ? "-W"
                      : ""}
                  </span>
                </TableCell>
              </TableRow>
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
