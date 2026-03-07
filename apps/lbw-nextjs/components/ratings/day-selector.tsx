"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useRatings } from "@/providers/ratings-provider";
type Props = {};

export default function DaySelector({}: Props) {
  const { changeDate } = useRatings();

  return (
    <Tabs defaultValue="today" onValueChange={(value) => changeDate(value)}>
      <TabsList>
        <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
        <TabsTrigger value="today">Today</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
