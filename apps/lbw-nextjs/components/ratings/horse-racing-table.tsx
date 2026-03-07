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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "../ui/select";

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

import { useRatings } from "@/providers/ratings-provider";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import PageFade from "../shared/page-fade";

import { SelectorTableData, VenueRaces } from "@/providers/ratings-provider";
import { Badge } from "../ui/badge";

type Props = {};

export default function HorseRacingTable({}: Props) {
  const {
    maxRaceNumber,
    selectorTableData,
    setRace,
    selectedRace,
    selectedRaceData,
    scrollRef,
  } = useRatings();
  if (!selectedRaceData || !selectedRace) return null;
  return (
    <PageFade>
      <Card
        id="horse-racing-card"
        ref={scrollRef}
        className="max-sm:mx-4 min-w-full max-sm:w-screen "
      >
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row items-center gap-x-6">
              {/* {selectedRaceData[0].meeting_track_name} R
              {selectedRaceData[0].raceno} */}
              <div className="flex w-1/4">
                <DropDownVenue
                  venue={selectedRaceData[0].meeting_track_name}
                  venues={selectorTableData}
                />
              </div>
              <div className="flex w-1/4">
                <ToggleRace
                  //   venue={selectedRace.venue.name}
                  races={selectedRace}
                />
              </div>
            </div>
          </CardTitle>
          {/* <CardDescription>
          A list of all results across all race codes. With export and filtering
          options
        </CardDescription> */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Horse</TableHead>
                <TableHead className="">LBW Rank</TableHead>
                <TableHead className="">Late Speed Rank</TableHead>
                <TableHead className="">All Horse Strength Rating</TableHead>
                <TableHead className="">LBW Price</TableHead>
                <TableHead className="text-center">Win</TableHead>
                <TableHead className="text-center">Place</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedRaceData.map((horse, index) => (
                <TableRow key={index}>
                  <TableCell className=" text-nowrap w-[20%] font-bold">
                    <div className="flex flex-row items-center">
                      <Image
                        unoptimized
                        src={
                          horse.colors_file_name
                            ? `https://content.betfair.com/feeds_images/Horses/SilkColours/${horse.colors_file_name}`
                            : "/logos/horse.svg"
                        }
                        className="w-8 h-8 mr-2"
                        width={30}
                        height={20}
                        alt="horse"
                      />
                      {horse.pf_horse_number}. {horse.pf_horsename} <br />
                      <ResultBadge result={horse.lb_result} />
                    </div>
                  </TableCell>

                  <TableCell>
                    <RankedButton rank={horse.pfairank} />
                  </TableCell>
                  <TableCell>
                    <RankedButton
                      rank={parseFloat(
                        (
                          ((horse.l200rank || 0) +
                            (horse.l400rank || 0) +
                            (horse.l600_rank || 0)) /
                          3
                        )?.toFixed(1)
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <RankedButton
                      rank={Math.min(horse.pfaiscore || 0 + 2, 100)}
                    />
                  </TableCell>
                  <TableCell>
                    <OddsButton odds={horse.pfaiprice || 0} />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <div className="flex flex-row justify-around">
                      <OddsButton
                        odds={horse.price_latest || 0}
                        lbw_odds={horse.pfaiprice}
                        rank={horse.pfairank}
                      />
                      <OddsButton odds={horse.place_latest || 0} />
                    </div>
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
    </PageFade>
  );
}

const ResultBadge = ({ result }: { result: string | null }) => {
  if (!result) return <></>;
  return (
    <Badge
      className={cn(
        result === "WINNER"
          ? "bg-green-500/20 border-green-400"
          : result === "PLACE"
          ? "bg-yellow-500/20 border-yellow-500"
          : "bg-red-500/20 border-red-500",
        "rounded-md p-1 text-xs text-white ml-4 text-center"
      )}
    >
      {result}
    </Badge>
  );
};

const OddsButton = ({
  odds,
  lbw_odds,
  rank,
}: {
  odds: number;
  lbw_odds?: number | null;
  rank?: number | null;
}) => {
  if (!lbw_odds || odds > 10 || !rank)
    return (
      <Button variant="outline" className={cn("")}>
        ${odds.toFixed(2)}
      </Button>
    );
  return (
    <Button
      variant="outline"
      className={cn(
        lbw_odds < odds && rank < 3 && "bg-blue-500/20 border-blue-500",
        lbw_odds > odds &&
          odds < 4 &&
          rank > 1 &&
          "border-pink-500 bg-pink-500/20"
      )}
    >
      ${odds.toFixed(2)}
    </Button>
  );
};

const ToggleRace = ({ races }: { races: SelectorTableData }) => {
  const { setRace } = useRatings();
  return (
    <ToggleGroup
      type="single"
      className="w-full border rounded-md p-2 flex-wrap justify-between"
    >
      {races.venue.races.map((race, index) => (
        <ToggleGroupItem
          onClick={() => setRace(race.event_id)}
          key={index}
          value={race.raceno.toString()}
        >
          {race.raceno}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

const DropDownVenue = ({
  venues,
  venue,
}: {
  venues: SelectorTableData[];
  venue: string | null;
}) => {
  const { setRace } = useRatings();
  return (
    <Select
      defaultValue={venue || ""}
      value={venue || ""}
      //   defaultValue={botSettings?.bet_side}
      onValueChange={(e) => {
        setRace(
          venues.filter((item) => item.venue.name === e)[0].venue.races[0]
            .event_id
        );
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Venue" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {venues.map((venue, index) => (
            <SelectItem key={index} value={venue.venue.name}>
              {venue.venue.name}
            </SelectItem>
          ))}
          {/* <SelectItem value="Back">Back</SelectItem>
          <SelectItem value="Lay">Lay</SelectItem>
          <SelectItem value="Both">Both</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const RankedButton = ({ rank }: { rank: number | null }) => {
  if (!rank || rank === 25) return null;

  return (
    <Button
      variant={rank && rank <= 3.99 ? "outline" : "ghost"}
      className={cn(
        rank && rank < 4 && rank >= 3
          ? "border-orange-300 bg-orange-300/30"
          : rank && rank >= 2 && rank <= 2.99
          ? "border-slate-300 bg-slate-300/30"
          : rank && rank < 2
          ? "border-green-300 bg-green-300/30"
          : "",
        "w-full"
      )}
    >
      {rank}
    </Button>
  );
};
