"use client";
import React, { useEffect } from "react";
import { CreditCard, DollarSign, Users, Activity, Percent } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { useUser } from "../../providers/user-provider";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUpcomingRaces } from "../../providers/upcoming-races-provider";
import CountdownText from "../shared/countdown-text";
import { set } from "date-fns";
type Props = {
  metricRef: React.RefObject<HTMLDivElement>;
};

export default function NextUp({ metricRef }: Props) {
  const nextUpRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | null>(null);
  const { results } = useUser();
  const { upcomingRaces } = useUpcomingRaces();
  useEffect(() => {
    if (!metricRef.current) return;
    const metricsTopHeight = metricRef.current.clientHeight;
    const heightAdj = metricsTopHeight;
    setHeight(heightAdj);
  }, []);
  useEffect(() => {}, [height]);
  if (!metricRef) return null;

  return (
    <Card
      style={{ maxHeight: height ? `${height}px` : "auto" }}
      className={cn(
        `xl:col-span-2 overflow-y-scroll no-scrollbar max-h-[${height}px]`
      )}
    >
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Next Up</CardTitle>
        </div>
        {/* <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button> */}
      </CardHeader>
      <CardContent>
        <Table className="overflow-y-scroll">
          <TableHeader>
            <TableRow>
              <TableHead>Race Type</TableHead>

              <TableHead className="">Race</TableHead>
              {/* <TableHead className="text-right"></TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!upcomingRaces ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No upcoming
                </TableCell>
              </TableRow>
            ) : (
              <>
                {upcomingRaces.slice(0, 6).map((result) => (
                  <TableRow key={result.selection_id}>
                    <TableCell className="text-right">
                      <CountdownText
                        boxClass="w-fit float-left"
                        jumpTime={
                          result.market_start_time
                            ? result.market_start_time
                            : ""
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{result.venue}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        R{result.race_number}
                      </div>
                    </TableCell>
                    {/* <TableCell className="">{result.horse_name}</TableCell> */}
                  </TableRow>
                ))}
              </>
            )}

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
