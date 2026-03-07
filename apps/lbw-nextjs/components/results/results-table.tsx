"use client";
import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResultsT } from "../../providers/user-provider";
import moment from "moment";
import { cn } from "@/lib/utils";
import MetricsTop from "../dashboard/metrics-top";

type Props = {
  results: ResultsT[];
};

export default function ResultsTable({ results }: Props) {
  React.useEffect(() => {}, [results]);
  return (
    <Card className="max-sm:mx-4 min-w-full max-sm:w-screen ">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>
          A list of all results across all race codes. With export and filtering
          options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MetricsTop />
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
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="text-right">Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.reverse().map((result, index) => (
              <TableRow key={index} className="font-bold">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {moment(result.event_date).format("DD MMM YYYY")}
                </TableCell>
                <TableCell>
                  {result.venue} - {result.market_name?.split(" ")[0]}
                </TableCell>
                <TableCell>{result.selection_name}</TableCell>
                <TableCell>
                  {" "}
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-md rounded-sm",
                      result.side === "BACK"
                        ? "border-blue-500"
                        : "border-pink-500"
                    )}
                  >
                    {result.side}
                  </Badge>
                </TableCell>
                <TableCell>${result.price_matched?.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-md rounded-sm",
                      (result.profit_with_comm || 0) > 0
                        ? "border-green-500"
                        : "border-red-500"
                    )}
                  >
                    ${result.profit_with_comm?.toFixed(2)}
                  </Badge>
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
