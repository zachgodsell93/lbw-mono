import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultStats } from "./OurResultsChart";
import {
  ArrowBigDown,
  ArrowBigUp,
  DollarSign,
  Loader2,
  Percent,
} from "lucide-react";
type Props = {
  metrics: ResultStats | null;
};

export default function OurResultsMetrics({ metrics }: Props) {
  return (
    <div className="grid gap-4 w-full grid-cols-2 md:grid-cols-4 md:gap-8">
      <Card className="border-yellow-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Units</CardTitle>
          <ArrowBigDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {!metrics ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>{metrics.members_plus.units.toFixed(2)}</>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Units/Week Avg</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {!metrics ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>{metrics?.members_plus.weekly_average.toFixed(2)} Units</>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ROI</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {!metrics ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>{(metrics.members_plus.roi * 100).toFixed(2)}%</>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Strike Rate</CardTitle>
          <ArrowBigUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {!metrics ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>{(metrics.members_plus.strike_rate * 100).toFixed(2)}%</>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
