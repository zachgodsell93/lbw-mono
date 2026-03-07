"use client";
import React from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRatings } from "@/providers/ratings-provider";
import moment from "moment";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import CountdownText from "../shared/countdown-text";
import { Badge } from "../ui/badge";

type Props = {};

export default function HorseRaceSelector({}: Props) {
  const { maxRaceNumber, selectorTableData, setRace, selectedRace, scrollRef } =
    useRatings();

  const handleScroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    // fetch data
  }, [selectedRace]);
  if (!selectorTableData) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Race</CardTitle>
        <CardDescription>
          Races will be available a day before race day. Races are updated to
          adjust for scratching
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Venue</TableHead>
              {Array.from({ length: maxRaceNumber }, (_, i) => (
                <TableHead key={i} className="text-center">
                  {i + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectorTableData.map((venue, index) => (
              <TableRow key={index} className="">
                <TableCell className="p-0 pl-4">{venue.venue.name}</TableCell>
                {venue.venue.races.map((race, index) => (
                  <TableCell key={index} className="p-0">
                    <Button
                      variant="outline"
                      className={cn("w-full rounded-none")}
                      onClick={() => {
                        setRace(race.event_id);
                        handleScroll();
                      }}
                    >
                      {moment(race.start_time) > moment().add(1, "minute") ? (
                        <CountdownText jumpTime={race.start_time} />
                      ) : (
                        <Badge
                          className="rounded-md border-red-700 bg-red-400/20"
                          variant="destructive"
                        >
                          Closed
                        </Badge>
                      )}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
