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
import { ArrowRight } from "lucide-react";
import CountdownText from "@/components/shared/countdown-text";

type Props = {};

export default function AllResultsTable({}: Props) {
  const { botResults, updateSelection } = useTrend();

  return (
    <Card className="max-sm:mx-4 min-w-full max-sm:w-screen ">
      <CardHeader>
        <CardTitle>All LBW Results Today</CardTitle>
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
              <TableHead className="hidden md:table-cell">
                Side - Units
              </TableHead>
              <TableHead className="hidden md:table-cell">LBW</TableHead>
              <TableHead className="hidden md:table-cell">Jump </TableHead>
              <TableHead className="">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {botResults?.map((result: TrendResults, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-y-4">
                    {moment(result.start_time).format("h:mma")}
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
                <TableCell
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
                </TableCell>
                <TableCell>
                  <div className="flex flex-row">
                    ${result.lbw_price?.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row w-full gap-x-4">
                    {/* <FlucChart flucs={result.flucs} lp={result.price_latest} /> */}
                    <div className="flex flex-col text-right font-semibold">
                      <span
                        className={`${
                          (result.lbw_price || 0) < (result.price_jump || 0)
                            ? "text-green-400"
                            : (result.lbw_price || 0) < (result.price_jump || 0)
                            ? "text-red-400"
                            : "text-primary-text"
                        }`}
                      >
                        ${result.price_jump?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className={`${
                    result.lbw_decision === "LAY"
                      ? "text-red-400"
                      : result.lbw_decision === "BACK"
                      ? "text-green-400"
                      : ""
                  }`}
                >
                  {result.betResult}
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
            decision === "Lay" &&
            disabled === false
          ? "bg-pink-400"
          : current.toLowerCase() === "trend" &&
            decision === "Trend" &&
            disabled === false
          ? "bg-orange-400"
          : current.toLowerCase() === "lbw" &&
            decision === "Lbw" &&
            disabled === false
          ? "bg-purple-400"
          : current.toLowerCase() === "no bet" &&
            decision === "No Bet" &&
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
