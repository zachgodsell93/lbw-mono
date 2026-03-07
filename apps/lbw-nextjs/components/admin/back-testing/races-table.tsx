"use client";
import { useBacktesting } from "@/providers/backtesting-provider";
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewRaces, Race } from "@/lib/backtest";
import moment from "moment";
import CountdownText from "@/components/shared/countdown-text";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {};

export default function RacesTable({}: Props) {
  const { races } = useBacktesting();
  useEffect(() => {
    console.log("Races in RacesTable:", races);
  }, [races]);
  if (!races) return null;

  return (
    <Card className="max-sm:mx-4 min-w-full max-sm:w-screen ">
      <CardHeader>
        <CardTitle>Backtest Results</CardTitle>
        {/* <CardDescription>LBW results from the bot</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Date</span>
              </TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Race</TableHead>
              <TableHead className="hidden md:table-cell">Side</TableHead>
              <TableHead className="hidden md:table-cell">Stake</TableHead>
              <TableHead className="hidden md:table-cell">Profit</TableHead>
              <TableHead className="hidden md:table-cell">LB Price</TableHead>
              <TableHead className="hidden md:table-cell">BF Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {races?.map((result: NewRaces, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  {moment(result.meeting_datestamp).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell className="flex flex-col gap-y-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-md p-1 justify-center",
                      result.profit > 0
                        ? "border-green-500 bg-green-500/50"
                        : result.profit < 0
                        ? "border-red-500 bg-red-500/50"
                        : "border-gray-500 bg-gray-500/50"
                    )}
                  >
                    {result.profit > 0
                      ? "Won"
                      : result.profit < 0
                      ? "Lost"
                      : "No Bet"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="font-medium cursor-pointer hover:text-blue-500">
                        {result.venue} -{" "}
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          R{result.raceno}
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[800px] p-4">
                      <div className="grid grid-cols-3 gap-4">
                        {/* Track Info */}
                        <div className="space-y-2">
                          <h3 className="font-semibold">Track Information</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">
                              Venue:
                            </span>
                            <span>{result.venue}</span>
                            <span className="text-muted-foreground">
                              State:
                            </span>
                            <span>{result.venue_state}</span>
                            <span className="text-muted-foreground">Type:</span>
                            <span>{result.venue_type}</span>
                            <span className="text-muted-foreground">
                              Condition:
                            </span>
                            <span>{result.trackcondition}</span>
                            <span className="text-muted-foreground">
                              Rail Position:
                            </span>
                            <span>{result.meeting_railposition}</span>
                          </div>
                        </div>

                        {/* Horse Info */}
                        <div className="space-y-2">
                          <h3 className="font-semibold">Horse Details</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">
                              Number:
                            </span>
                            <span>{result.pf_horse_number}</span>
                            <span className="text-muted-foreground">Name:</span>
                            <span>{result.pf_horsename}</span>
                            <span className="text-muted-foreground">
                              Barrier:
                            </span>
                            <span>{result.barrier}</span>
                            <span className="text-muted-foreground">
                              Favourite:
                            </span>
                            <span>{result.favourite ? "Yes" : "No"}</span>
                          </div>
                        </div>

                        {/* Price Info */}
                        <div className="space-y-2">
                          <h3 className="font-semibold">Price Information</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">
                              9am Price:
                            </span>
                            <span>${result.price_9am?.toFixed(2)}</span>
                            <span className="text-muted-foreground">
                              11am Price:
                            </span>
                            <span>${result.price_11am?.toFixed(2)}</span>
                            <span className="text-muted-foreground">
                              Latest Price:
                            </span>
                            <span>${result.price_latest?.toFixed(2)}</span>
                            <span className="text-muted-foreground">
                              Price Jump:
                            </span>
                            <span>${result.price_jump?.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Rankings */}
                        <div className="space-y-2">
                          <h3 className="font-semibold">Rankings</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">
                              PF Rank:
                            </span>
                            <span>{result.pfairank}</span>
                            <span className="text-muted-foreground">
                              Class Diff:
                            </span>
                            <span>{result.clsdiff}</span>
                            <span className="text-muted-foreground">
                              Time Ranking:
                            </span>
                            <span>{result.time_ranking}</span>
                            <span className="text-muted-foreground">
                              Weight Class:
                            </span>
                            <span>{result.weight_class_ranl}</span>
                            <span className="text-muted-foreground">
                              Last 200/400/600:
                            </span>
                            <span>
                              {result.l200rank}/{result.l400rank}/
                              {result.l600rank}
                            </span>
                          </div>
                        </div>

                        {/* Results */}
                        <div className="space-y-2">
                          <h3 className="font-semibold">Results</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">
                              LB Result:
                            </span>
                            <span>{result.lb_result}</span>
                            <span className="text-muted-foreground">
                              BF Result:
                            </span>
                            <span>{result.bf_result}</span>
                            <span className="text-muted-foreground">
                              Predicted Position:
                            </span>
                            <span>{result.predicted_settle_position}</span>
                            <span className="text-muted-foreground">
                              Status:
                            </span>
                            <span>{result.status}</span>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-2">
                          <h3 className="font-semibold">Additional Details</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">
                              Market ID:
                            </span>
                            <span>{result.market_id}</span>
                            <span className="text-muted-foreground">
                              Selection ID:
                            </span>
                            <span>{result.selection_id}</span>
                            <span className="text-muted-foreground">
                              Event Date:
                            </span>
                            <span>
                              {moment(result.event_date).format(
                                "DD-MM-YYYY HH:mm"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>

                <TableCell>
                  <div className="flex flex-row">
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-md p-2",
                        result.decision === "Back"
                          ? "border-blue-500 bg-blue-500/50"
                          : result.decision === "Lay"
                          ? "border-pink-500 bg-pink-500/50"
                          : result.decision === "No Bet"
                          ? "border-orange-500 bg-orange-500/50"
                          : "border-gray-500 bg-gray-500/50"
                      )}
                    >
                      {result.decision === "Back"
                        ? "Back"
                        : result.decision === "Lay"
                        ? "Lay"
                        : result.decision === "No Bet"
                        ? "No Bet"
                        : "No Bet"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{result.stake}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    ${result.profit?.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row">
                    ${result.price_jump?.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row w-full gap-x-4">
                    {/* <FlucChart flucs={result.flucs} lp={result.price_latest} /> */}
                    <div className="flex flex-col text-right font-semibold">
                      <span>${result.bal?.toFixed(2)}</span>
                    </div>
                  </div>
                </TableCell>
                {/* <TableCell
              className={`${
                result.lbw_decision === "LAY"
                  ? "text-red-400"
                  : result.lbw_decision === "BACK"
                  ? "text-green-400"
                  : ""
              }`}
            >
              {result.price_jump &&
                `${result.lbw_decision ? result.lbw_decision : "NO BET"} ${
                  result.lbw_units ? `${result.lbw_units}U` : ""
                }`}
            </TableCell> */}
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
