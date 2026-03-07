"use client";
import React from "react";
import Strategy from "@/components/captains-lounge/strategy";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

type Props = {};

type RaceTypes = "Thoroughbred" | "Greyhound" | "Harness";

function Page({}: Props) {
  const [raceCode, setRaceCode] = React.useState<RaceTypes>("Thoroughbred");
  return (
    <main className="grid items-start gap-4 min-w-full pt-10 sm:px-6">
      <div className="flex flex-row items-center w-full">
        <Tabs
          defaultValue={raceCode}
          onValueChange={(e) =>
            e === "Thoroughbred" || e === "Greyhound" || e === "Harness"
              ? setRaceCode(e)
              : setRaceCode("Thoroughbred")
          }
          className="min-w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="Thoroughbred">Thoroughbred</TabsTrigger>
            <TabsTrigger value="Greyhound">Greyhound</TabsTrigger>
            <TabsTrigger value="Harness">Harness</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex w-full">
        <Strategy raceCode={raceCode} />
      </div>
    </main>
  );
}

export default Page;
