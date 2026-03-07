"use client";
import React from "react";
import PageFade from "@/components/shared/page-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Percent,
  ArrowBigUp,
  ArrowBigDown,
  Loader2,
} from "lucide-react";
import { useUser } from "@/providers/user-provider";
import { useTommy } from "@/providers/tommy-provider";
import { stat } from "fs";
import { cn } from "@/lib/utils";

type Props = {};

export default function TommyMetrics({}: Props) {
  const { stats, results } = useTommy();
  if (!stats) return null;
  return (
    <div className="grid gap-4 w-full md:grid-cols-2 md:gap-8">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "text-2xl font-bold",
              stats.profit > 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {!results ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>{stats.profit?.toFixed(1)}U</>
            )}
          </div>
        </CardContent>
      </Card>

      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ratio/Split</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {!results ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <div className="flex flex-col">
                <div className="flex flex-row w-full">
                  {stats.backCount + stats.layCount} - {stats.backCount}B -{" "}
                  {stats.layCount}L (
                  {(
                    (stats.backCount / (stats.backCount + stats.layCount)) *
                    100
                  ).toFixed(0)}
                  %B -{" "}
                  {(
                    (stats.layCount / (stats.backCount + stats.layCount)) *
                    100
                  ).toFixed(0)}
                  %L)
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bang %</CardTitle>
          <ArrowBigUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "text-2xl font-bold",
              stats.bangRate < 12 ? "text-green-400" : "text-red-400"
            )}
          >
            {!results ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>{stats.bangRate.toFixed(2)}%</>
            )}
          </div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Back Strike %</CardTitle>
          <ArrowBigDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "text-2xl font-bold",
              stats.backRate > 24.9 ? "text-green-400" : "text-red-400"
            )}
          >
            {!results ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>{stats.backRate.toFixed(2)}%</>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
