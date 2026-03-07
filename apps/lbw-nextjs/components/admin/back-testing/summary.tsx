"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  Percent,
  Loader2,
  ArrowBigDown,
  ArrowBigUp,
} from "lucide-react";
import { useBacktesting } from "@/providers/backtesting-provider";
type Props = {};

type Stats = {
  totalRaces: number;
  totalProfit: number;
  weeklyAvg: number;
  winPercent: number;
};

export default function Summary({}: Props) {
  const [summary, setSummary] = useState<Stats>({
    totalRaces: 0,
    totalProfit: 0,
    weeklyAvg: 0,
    winPercent: 0,
  });
  const { races, stats } = useBacktesting();
  useEffect(() => {
    if (!races || !stats) return;
    setSummary(stats);
  }, [races, stats]);
  return (
    <div className="grid gap-4 w-full md:grid-cols-2 md:gap-8">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalProfit.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bets</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRaces}</div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Win %</CardTitle>
          <ArrowBigUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.winPercent}%</div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Avg.</CardTitle>
          <ArrowBigDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.weeklyAvg}</div>
        </CardContent>
      </Card>
    </div>
  );
}
