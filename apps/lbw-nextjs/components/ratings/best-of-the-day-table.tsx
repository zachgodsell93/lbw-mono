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
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRatings } from "@/providers/ratings-provider";
import moment from "moment";
import CountdownText from "../shared/countdown-text";
import { PuntingFormLadbrokesData } from "@/types/customData.types";
import { cn } from "@/lib/utils";

type Props = {};

export default function BestOfTheDayTable({}: Props) {
  const { bestOfDayData } = useRatings();

  if (!bestOfDayData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Best Bets of the Day</CardTitle>
        <CardDescription>
          The best backs, lays and value bets of the day identified by our
          models and team.<b> All selections are finalised by 9am AEST</b>.
          <br />
          <br />
          Lays and Backs we recommend that you place a unit stake. For Value of
          the day we recommend half unit on the win, and 3 units on the place.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-full gap-y-4">
          <Tabs defaultValue="backs">
            <TabsList>
              <TabsTrigger value="backs">Backs</TabsTrigger>
              <TabsTrigger value="lays">Lays</TabsTrigger>
              <TabsTrigger value="value">Value</TabsTrigger>
            </TabsList>
            <TabsContent value="backs">
              <DataTable data={bestOfDayData.backs} />
            </TabsContent>
            <TabsContent value="lays">
              <DataTable data={bestOfDayData.lays} />
            </TabsContent>
            <TabsContent value="value">
              <DataTable data={bestOfDayData.value} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}

const DataTable = ({ data }: { data: PuntingFormLadbrokesData[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Start Time</TableHead>
          <TableHead className="">Race</TableHead>
          <TableHead className="">Selection</TableHead>
          <TableHead className="">Win</TableHead>
          <TableHead className="">Place</TableHead>
          <TableHead className="">Result</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index} className="">
            <TableCell className="">
              <CountdownText jumpTime={row.start_time || "00:00"} />
            </TableCell>
            <TableCell className="">
              {row.meeting_track_name} - R{row.raceno}
            </TableCell>
            <TableCell className="">
              {row.pf_horse_number}. {row.pf_horsename}
            </TableCell>
            <TableCell colSpan={2}>
              <div className="flex flex-row justify-around">
                <OddsButton odds={row.price_latest || 0} />
                <OddsButton odds={row.place_latest || 0} />
              </div>
            </TableCell>
            <TableCell className="">
              {row.lb_result !== null && (
                <ResultBadge
                  result={row.lb_result as "WINNER" | "PLACE" | "LOSER" | null}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const OddsButton = ({ odds }: { odds: number }) => {
  return (
    <Button variant="outline" className={cn("")}>
      ${odds.toFixed(2)}
    </Button>
  );
};

const ResultBadge = ({
  result,
}: {
  result: "WINNER" | "PLACE" | "LOSER" | null;
}) => {
  return (
    <Badge
      className={cn(
        "rounded-md px-2 py-1 text-sm text-primary border-2",
        result === "WINNER" && "bg-green-500/30 border-green-500",
        result === "PLACE" && "bg-yellow-500/30 border-yellow-500",
        result === "LOSER" && "bg-red-500/30 border-red-500"
      )}
    >
      {result}
    </Badge>
  );
};
