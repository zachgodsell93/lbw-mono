"use client";
import React from "react";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTrend } from "@/providers/trend-provider";
import { TrendResults } from "@/types/customData.types";
import { SparkAreaChart, SparkLineChart, SparkBarChart } from "@tremor/react";
import { ArrowRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CountdownText from "@/components/shared/countdown-text";

type Props = {};

export default function ResultsTable({}: Props) {
  const { botResults, updateSelection } = useTrend();

  const Decision = ({
    lbPrice,
    priceLatest,
  }: {
    lbPrice: string;
    priceLatest: string;
  }) => {
    const dec = lbPrice > priceLatest ? "LAY" : "BACK";
    return (
      <Badge variant="outline" className="rounded-md border-red-500 w-fit">
        {lbPrice}
      </Badge>
    );
  };

  return (
    <Card className="max-sm:mx-4 min-w-full max-sm:w-screen ">
      <CardHeader>
        <CardTitle>LBW Results Today</CardTitle>
        {/* <CardDescription>LBW results from the bot</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Count</span>
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Race</TableHead>
              <TableHead className="hidden md:table-cell">Selection</TableHead>
              <TableHead className="hidden md:table-cell">Side</TableHead>
              <TableHead className="hidden md:table-cell">LBW Price</TableHead>
              <TableHead className="hidden md:table-cell">1 Min Price</TableHead>
              <TableHead className="hidden md:table-cell">Decision</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {botResults?.map((result: TrendResults, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-y-4">
                    {moment(result.start_time).format("h:mma")}
                    {moment() < moment(result.start_time) && (
                      <CountdownText
                        boxClass="w-fit"
                        jumpTime={result.start_time ? result.start_time : ""}
                      />
                    )}
                    {moment() > moment(result.start_time) && (
                      <Badge
                        variant="outline"
                        className="rounded-md border-red-500 w-fit"
                      >
                        Closed
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{result.venue_name}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    Race {result.race_number}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row">
                    {result.runner_number}. {result.runner_name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row">
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-md p-2",
                        result.side === "BACK"
                          ? "border-blue-500 bg-blue-500/50"
                          : result.side === "LAY"
                          ? "border-pink-500 bg-pink-500/50"
                          : result.side === "LBW"
                          ? "border-purple-500 bg-purple-500/50"
                          : result.side === "TREND"
                          ? "border-orange-500 bg-orange-500/50"
                          : "border-gray-500 bg-gray-500/50"
                      )}
                    >
                      {result.side === "BACK"
                        ? "Back"
                        : result.side === "LAY"
                        ? "Lay"
                        : result.side === "LBW"
                        ? "LBW"
                        : result.side === "TREND"
                        ? "Trend"
                        : "No Bet"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row">
                    ${result.lbw_price?.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row items-center gap-1">
                    ${result.price_1min?.toFixed(2) ?? '-'}
                    {result.price_1min_captured_at && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs space-y-1">
                              <p>Race Start: {moment(result.race_start_time).format("h:mm:ss a")}</p>
                              <p>Captured: {moment(result.price_1min_captured_at).format("h:mm:ss a")}</p>
                              <p>Offset: {moment(result.race_start_time).diff(moment(result.price_1min_captured_at), 'seconds')}s before jump</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {result.price_1min && (
                    <Decision
                      lbPrice={result.lbw_price?.toString() || ""}
                      priceLatest={result.price_1min?.toString() || ""}
                    />
                  )}
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

const FlucChart = ({ flucs, lp }: { flucs: any; lp: any }) => {
  const [flucData, setFlucData] = React.useState([]);
  const [support, setSupport] = React.useState(false);

  React.useEffect(() => {
    let d = flucs.split(",").map((item: any, index: number) => ({
      c: index,
      fluc: parseFloat(item),
    }));
    // Add lp to flucs at end
    if (lp) d.push({ c: d.length, fluc: lp });
    console.log(d);
    setFlucData(d);
    const lastFluc = d[d.length - 1].fluc;
    const firstFluc = d[0].fluc;
    if (lastFluc < firstFluc) {
      setSupport(true);
    } else {
      setSupport(false);
    }
  }, [flucs]);

  return (
    <SparkAreaChart
      className=""
      data={flucData}
      index="index"
      categories={["fluc"]}
      colors={[support ? "green" : "red"]}
    />
  );
};

const DecisionButton = ({
  current,
  decision,
  id,
  marketId,
  updateSelection,
  startTime,
}: {
  current: any;
  decision: any;
  id: any;
  marketId: any;
  updateSelection: any;
  startTime: any;
}) => {
  const disabled =
    moment().diff(moment(startTime), "minutes") < 2 ? false : true;

  return (
    <button
      disabled={disabled}
      className={`w-full ${
        current.toLowerCase() === "back" &&
        decision === "Back" &&
        disabled === false
          ? "bg-blue-400"
          : current.toLowerCase() === "lay" &&
            decision.toLowerCase() === "Lay" &&
            disabled === false
          ? "bg-pink-400"
          : current.toLowerCase() === "trend" &&
            decision.toLowerCase() === "Trend" &&
            disabled === false
          ? "bg-orange-400"
          : current.toLowerCase() === "lbw" &&
            decision.toLowerCase() === "Lbw" &&
            disabled === false
          ? "bg-purple-400"
          : current.toLowerCase() === "no bet" &&
            decision.toLowerCase() === "No Bet" &&
            disabled === false
          ? "bg-gray-400"
          : "bg-transparent"
      } ${
        decision === "Back" && disabled === false
          ? "border-blue-400 hover:bg-blue-600 active:bg-blue-800"
          : decision === "Lay" && disabled === false
          ? "border-pink-500 hover:bg-pink-600 active:bg-pink-800"
          : decision === "Lbw" && disabled === false
          ? "border-purple-500 hover:bg-purple-600 active:bg-purple-800"
          : decision === "Trend" && disabled === false
          ? "border-orange-400 hover:bg-orange-600 active:bg-orange-800"
          : decision === "No Bet" && disabled === false
          ? "border-gray-400 hover:bg-gray-600 active:bg-gray-800"
          : ""
      } ${
        disabled === true ? "text-gray-700" : "text-white"
      } border text-sm font-bold px-1 py-0.5 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150`}
      onClick={() => updateSelection(id, marketId, decision)}
    >
      {decision}
    </button>
  );
};
