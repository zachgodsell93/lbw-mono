"use client";
import React, { use } from "react";
import {
  CreditCard,
  DollarSign,
  Users,
  Activity,
  Percent,
  ArrowBigDown,
  ArrowBigUp,
  Loader2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useUser } from "../../providers/user-provider";
import { motion } from "framer-motion";
type Props = {};

export default function MetricsTop({}: Props) {
  const { results } = useUser();
  return (
    <div className="grid gap-4 w-full md:grid-cols-2 md:gap-8">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {!results ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>${results?.profit_w_comms.toFixed(2)}</>
            )}
          </div>
        </CardContent>
      </Card>

      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Match</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {!results ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                {results.match_rate
                  ? (results.match_rate * 100).toFixed(2)
                  : "0"}
                %
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Backs</CardTitle>
          <ArrowBigUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {!results ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>{results.backs}</>
            )}
          </div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lays</CardTitle>
          <ArrowBigDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {!results ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>{results.lays}</>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
