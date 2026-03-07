"use client";
import React from "react";
import { Database } from "@/types/supabase.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart } from "@tremor/react";
import { WebsiteResults } from "@/types/customData.types";
import moment from "moment";

export interface ResultStats {
  members: {
    units: number;
    strike_rate: number;
    roi: number;
    weekly_average: number;
  };
  members_plus: {
    units: number;
    strike_rate: number;
    roi: number;
    weekly_average: number;
  };
}

export interface OurResultsReturn {
  results: WebsiteResults;
  stats: ResultStats;
}

type Props = {
  results: WebsiteResults[];
};

function OurResultsChart({ results }: Props) {
  if (!results) return null;
  const customTooltip = (props: { payload: any; active: any }) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="custom-tooltip bg-lbw-secondary-lighter border border-border rounded-lg border-opacity-30 text-primary-text p-2 font-bold">
        {payload[0].payload.members_plus_total ? (
          <>
            <p className="desc">
              Pro Subscription:
              {payload[0].payload.members_plus_total?.toFixed(2)} Units
            </p>
            <p className="desc">
              Date:{" "}
              {moment(payload[0].payload.order_placed_time).format(
                "DD MMM YYYY"
              )}
            </p>
            <p className="desc">Venue: {payload[0].payload.venue}</p>
            <p className="desc">
              Selection: {payload[0].payload.side}
              {" - "}
              {payload[0].payload.selection_name}
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
          data={results || []}
          index="date_formated"
          showGridLines={true}
          tickGap={20}
          showLegend={false}
          noDataText="No Results to show"
          categories={["members_plus_total"]}
          showAnimation={true}
          colors={["yellow", "blue"]}
          yAxisWidth={50}
          customTooltip={customTooltip}
        />
      </CardContent>
    </Card>
  );
}

export default OurResultsChart;
