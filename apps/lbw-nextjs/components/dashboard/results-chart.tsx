"use client";
import React from "react";
import { LineChart } from "@tremor/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "../../providers/user-provider";
type Props = {};
export default function ResultsChart({}: Props) {
  const { results } = useUser();
  const customTooltip = (props: { payload: any; active: any }) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="custom-tooltip bg-lbw-secondary-lighter border border-border rounded-lg border-opacity-30 text-primary-text p-2 font-bold">
        {payload[0].payload.profit ? (
          <>
            <p className="label">
              🏁 {payload[0].payload.event_name.split(" ")[1]}
            </p>
            <p className="intro">🐴 {payload[0].payload.selection_name} </p>
            <p className="side">
              {payload[0].payload.side} @ $
              {payload[0].payload.order_price.toFixed(2)}
            </p>
            <br />
            <p className="desc">
              Result: ${payload[0].payload.profit_with_comm.toFixed(2)}
            </p>
            <p className="desc">
              Running Total: ${payload[0].payload.running_profit.toFixed(2)}
            </p>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle data-testid="chart-title">Daily Results Chart</CardTitle>
          <CardDescription></CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <LineChart
          data-testid="line-chart"
          className="h-[400px]"
          data={results?.results || []}
          index="time"
          showGridLines={true}
          tickGap={20}
          showLegend={false}
          noDataText="No Results to show"
          categories={["running_profit"]}
          showAnimation={true}
          // colors={["blue"]}
          yAxisWidth={30}
          customTooltip={customTooltip}
        />
      </CardContent>
    </Card>
  );
}
