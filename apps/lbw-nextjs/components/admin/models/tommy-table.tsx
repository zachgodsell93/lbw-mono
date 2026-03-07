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
import { TommyData, useTommy } from "@/providers/tommy-provider";
type Props = {};

export default function TommyTable({}: Props) {
  const { results, stats } = useTommy();
  if (!results) return null;
  return (
    <Card className="max-sm:mx-4 min-w-full max-sm:w-screen ">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>
          A list of all results across all race codes. With export and filtering
          options
        </CardDescription>
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
              <TableHead className="hidden md:table-cell">Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result: TommyData, index: number) => (
              <TableRow key={index} className="font-bold">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {moment(result.start_time).format("h:mma")}
                </TableCell>
                <TableCell>
                  {result.venue_name} - R{result.raceno}
                </TableCell>
                <TableCell>
                  {result.horse_number}. {result.horse_name}
                </TableCell>
                <TableCell>
                  <Price {...result} />
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
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-md rounded-sm",
                      (result.profit || 0) > 0
                        ? "border-green-500"
                        : "border-red-500"
                    )}
                  >
                    ${result.profit?.toFixed(2)}
                  </Badge>
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

const Price = (data: any) => {
  if (data.side === "BACK") {
    if (data.bab) {
      return `$${data.bab.toFixed(2)}`;
    } else {
      return `$${data.price_latest.toFixed(2)}`;
    }
  } else {
    if (data.bal) {
      return `$${data.bal.toFixed(2)}`;
    } else {
      return `$${data.price_latest.toFixed(2)}`;
    }
  }
};
