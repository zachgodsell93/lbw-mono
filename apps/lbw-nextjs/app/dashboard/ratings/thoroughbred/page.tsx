import BestOfTheDayTable from "@/components/ratings/best-of-the-day-table";
import HorseRaceSelector from "@/components/ratings/horse-race-selector";
import HorseRacingTable from "@/components/ratings/horse-racing-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { Metadata } from "next";
import DaySelector from "@/components/ratings/day-selector";

export const metadata: Metadata = {
  title: "Horse Racing Form",
  description: "Lay Back and Win horse form ratings.",
};

type Props = {};

export default function page({}: Props) {
  return (
    <main className="grid items-start gap-4 min-w-full pt-10 sm:px-6">
      <Tabs defaultValue="all">
        <div className="flex flex-row gap-x-6">
          <TabsList>
            <TabsTrigger value="all">All Races</TabsTrigger>
            <TabsTrigger value="best">Best Bets</TabsTrigger>
          </TabsList>
          <DaySelector />
        </div>
        <TabsContent value="all">
          <HorseRaceSelector />
          <HorseRacingTable />
        </TabsContent>
        <TabsContent value="best">
          <BestOfTheDayTable />
        </TabsContent>
      </Tabs>
    </main>
  );
}
