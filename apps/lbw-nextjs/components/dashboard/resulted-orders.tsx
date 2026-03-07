"use client";
import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "../../providers/user-provider";
import { cn } from "@/lib/utils";
type Props = {};

export default function ResultedOrders({}: Props) {
  const { results } = useUser();
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Resulted Orders</CardTitle>
          <CardDescription>Orders that are finalised</CardDescription>
        </div>
        {/* <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Selection</TableHead>

              <TableHead className="">Side</TableHead>
              <TableHead className="text-right">Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results?.resultsReverse
              .filter((r) => r.profit_with_comm)
              .map((result) => (
                <TableRow key={result.bet_id}>
                  <TableCell>
                    <div className="font-medium">{result.selection_name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {result.venue} - {result.market_name}
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-md text-md",
                        result.side === "BACK"
                          ? "border-blue-500 bg-blue-500/50"
                          : "border-pink-500 bg-pink-500/30"
                      )}
                    >
                      {result.side}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-md text-md",
                        (result.profit_with_comm || 0) > 0
                          ? "border-green-500 bg-green-500/20"
                          : "border-red-500 bg-red-500/20"
                      )}
                    >
                      ${result.profit_with_comm?.toFixed(2)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            {/* <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-column">Sale</TableCell>
              <TableCell className="hidden xl:table-column">
                <Badge className="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-23
              </TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
