"use client";
import React, { useEffect, useRef } from "react";
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
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useTrend, SelectionSheet } from "@/providers/trend-provider";
import { TrendMarketData } from "@/types/customData.types";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Loader2, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import CountdownText from "@/components/shared/countdown-text";

// Hook to track user activity for smart refresh
const useUserActivity = (inactivityTimeout = 30 * 60 * 1000) => {
  const [isActive, setIsActive] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(true);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    const updateActivity = () => {
      lastActivityRef.current = Date.now();
      setIsActive(true);
    };

    const checkActivity = () => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      if (timeSinceLastActivity > inactivityTimeout) {
        setIsActive(false);
      }
    };

    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    const handleFocusIn = (e: FocusEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        setIsInputFocused(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        setIsInputFocused(false);
      }
    };

    // Track mouse movement
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("mousedown", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("scroll", updateActivity);
    window.addEventListener("touchstart", updateActivity);

    // Track visibility
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Track input focus
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    // Check activity periodically
    const activityInterval = setInterval(checkActivity, 10000);

    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("mousedown", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("scroll", updateActivity);
      window.removeEventListener("touchstart", updateActivity);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      clearInterval(activityInterval);
    };
  }, [inactivityTimeout]);

  const canRefresh = isVisible && isActive && !isInputFocused;
  return { isActive, isVisible, isInputFocused, canRefresh };
};
type Props = {};

function SelectionsTable({}: Props) {
  const { selectionSheet, updateSelection, refreshSelectionSheet } = useTrend();
  const { canRefresh } = useUserActivity();
  const [lastRefresh, setLastRefresh] = React.useState(Date.now());

  // Sort selections by start time
  const sortedSelections = React.useMemo(() => {
    const now = moment();
    return [...selectionSheet].sort((a, b) => {
      const aTime = moment(a.start_time);
      const bTime = moment(b.start_time);
      const aIsPast = aTime.isBefore(now);
      const bIsPast = bTime.isBefore(now);

      // If one is past and other isn't, past goes to bottom
      if (aIsPast && !bIsPast) return 1;
      if (!aIsPast && bIsPast) return -1;

      // Otherwise sort by start time
      return aTime.diff(bTime);
    });
  }, [selectionSheet]);

  // Auto-refresh at 15 seconds past every minute
  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    const doRefresh = () => {
      if (canRefresh) {
        console.log("Auto-refreshing selections table...");
        refreshSelectionSheet();
        setLastRefresh(Date.now());
      } else {
        console.log("Skipping refresh - user inactive, window hidden, or input focused");
      }
    };

    // Calculate ms until next :15
    const now = new Date();
    const next = new Date(now);
    next.setSeconds(15, 0);
    if (now.getSeconds() >= 15) {
      next.setMinutes(next.getMinutes() + 1);
    }
    const msUntilNext = next.getTime() - now.getTime();

    const initialTimeout = setTimeout(() => {
      doRefresh();
      interval = setInterval(doRefresh, 60000);
    }, msUntilNext);

    return () => {
      clearTimeout(initialTimeout);
      if (interval) clearInterval(interval);
    };
  }, [canRefresh, refreshSelectionSheet]);

  return (
    <Card className="min-w-full max-sm:w-screen ">
      <CardHeader>
        <CardTitle>
          Selections
          {/* <Button
            className="w-2/12 float-right"
            onClick={() => setRefresh(true)}
          >
            {refresh === true ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              "Refresh"
            )}
          </Button> */}
        </CardTitle>
        <CardDescription>
          Make Your Selections For Each Race Here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32"></TableHead>
              <TableHead className="hidden lg:table-cell">Start Time</TableHead>
              <TableHead>Race</TableHead>
              <TableHead className="hidden md:table-cell">Runner</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>LBW Price</TableHead>
              <TableHead>LBW Decision</TableHead>
              <TableHead className="text-right">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSelections.map((market: SelectionSheet, idx: number) => (
              <>
                <TableRow key={market.market_id}>
                  <TableCell className="hidden lg:table-cell">
                    <CountdownText jumpTime={market.start_time || ""} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {moment(market.start_time).format("h:mma")}
                  </TableCell>

                  <TableCell>
                    <div className="font-medium">{market.venue_name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      Race {market.race_number}
                    </div>
                  </TableCell>
                  <TableCell>
                    {market.runner_number}. {market.runner_name}
                  </TableCell>
                  <TableCell>{market.rank ?? "-"}</TableCell>
                  <TableCell>
                    <PriceSection
                      lbPrice={market.lbw_price || 0}
                      priceLatest={market.price_latest || 0}
                      price1min={market.price_1min || 0}
                      startTime={market.start_time || ""}
                      rowNumber={idx}
                      horseName={market.runner_name || ""}
                      selectionId={market.selection_id}
                      marketId={market.market_id}
                      price1minCapturedAt={market.price_1min_captured_at}
                      raceStartTime={market.race_start_time}
                    />
                  </TableCell>
                  <TableCell>
                    <DecisionBadge
                      lbPrice={market.lbw_price?.toString() || ""}
                      price1min={market.price_1min?.toString() || ""}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-row justify-end items-center gap-x-6">
                      <Button
                        variant="outline"
                        className={cn(
                          "border-green-500 hover:bg-green-500/40",
                          market.side === "LBW" ? "bg-green-500/80" : ""
                        )}
                        onClick={() => {
                          updateSelection(
                            market.selection_id,
                            market.market_id,
                            "LBW"
                          );
                        }}
                        size="sm"
                      >
                        LBW
                      </Button>
                      <Button
                        variant="outline"
                        className={cn(
                          "border-blue-500 hover:bg-blue-500/40",
                          market.side === "BACK" ? "bg-blue-500/80" : ""
                        )}
                        onClick={() => {
                          updateSelection(
                            market.selection_id,
                            market.market_id,
                            "BACK"
                          );
                        }}
                        size="sm"
                      >
                        Back
                      </Button>
                      <Button
                        variant="outline"
                        className={cn(
                          "border-pink-500 hover:bg-pink-500/40",
                          market.side === "LAY" ? "bg-pink-500/80" : ""
                        )}
                        onClick={() => {
                          updateSelection(
                            market.selection_id,
                            market.market_id,
                            "LAY"
                          );
                        }}
                        size="sm"
                      >
                        Lay
                      </Button>
                      <Button
                        variant="outline"
                        className={cn(
                          "border-purple-500 hover:bg-purple-500/40",
                          market.side === "NO BET" ? "bg-purple-500/80" : ""
                        )}
                        onClick={() => {
                          updateSelection(
                            market.selection_id,
                            market.market_id,
                            "NO BET"
                          );
                        }}
                        size="sm"
                      >
                        No Bet
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </>
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

const DecisionBadge = ({
  lbPrice,
  price1min,
}: {
  lbPrice: string;
  price1min: string;
}) => {
  // Convert to numbers for proper comparison
  const lbPriceNum = parseFloat(lbPrice) || 0;
  const price1minNum = parseFloat(price1min) || 0;

  const colorStyle =
    lbPriceNum > price1minNum
      ? "bg-green-500/20 border-green-500"
      : "bg-red-500/20 border-red-500";
  const text = lbPriceNum > price1minNum ? "Back" : "Lay";
  return (
    <Badge className={cn("rounded-md text-white", colorStyle)}>{text}</Badge>
  );
};

const PriceSection = ({
  lbPrice,
  priceLatest,
  price1min,
  startTime,
  rowNumber,
  horseName,
  selectionId,
  marketId,
  price1minCapturedAt,
  raceStartTime,
}: {
  lbPrice: number;
  priceLatest: number;
  price1min: number;
  startTime: string;
  rowNumber: number;
  horseName: string;
  selectionId: any;
  marketId: any;
  price1minCapturedAt?: string | null;
  raceStartTime?: string | null;
}) => {
  const { updateLbwPrice } = useTrend();

  const [lbwPrice, setLbwPrice] = React.useState(lbPrice);
  const [latestPrice, setLatestPrice] = React.useState(priceLatest);
  const [oneMinPrice, setOneMinPrice] = React.useState(price1min);
  const [editValue, setEditValue] = React.useState("");

  // Determine if race is closed (start time is in the past)
  const isRaceClosed = React.useMemo(() => {
    if (!startTime) return false;
    return moment(startTime).isBefore(moment());
  }, [startTime]);

  // Keep local state in sync with prop changes (from table-level polling)
  useEffect(() => {
    setLbwPrice(lbPrice);
    setLatestPrice(priceLatest);
    setOneMinPrice(price1min);
  }, [lbPrice, priceLatest, price1min]);

  useEffect(() => {
    setEditValue(lbwPrice.toFixed(2));
  }, [lbwPrice]);

  const handleSave = () => {
    const parsed = parseFloat(editValue);
    if (!isNaN(parsed) && parsed !== lbwPrice) {
      setLbwPrice(parsed);
      updateLbwPrice(selectionId, marketId, parsed);
    } else {
      setEditValue(lbwPrice.toFixed(2));
    }
  };

  // Display 1min price for closed races, latest price for open races
  const displayPrice = isRaceClosed ? oneMinPrice : latestPrice;
  const priceLabel = isRaceClosed ? "1min" : "Latest";

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-1">
        <span>LBW: $</span>
        <Input
          type="number"
          step="0.01"
          className="w-20 h-7 px-1 text-sm"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
      </div>
      <div className="flex items-center gap-1">
        {priceLabel}: ${displayPrice.toFixed(2)}
        {isRaceClosed && price1minCapturedAt && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs space-y-1">
                  <p>Race Start: {moment(raceStartTime).format("h:mm:ss a")}</p>
                  <p>Captured: {moment(price1minCapturedAt).format("h:mm:ss a")}</p>
                  <p>Offset: {moment(raceStartTime).diff(moment(price1minCapturedAt), 'seconds')}s before jump</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default SelectionsTable;
