"use client";
import React, { useEffect } from "react";
// import { getUser } from "../utils/supabaseClient";
import { supabase } from "@/utils/supabase/client";
import { Database } from "@/types/supabase.types";
import moment from "moment";
import { set } from "date-fns";

type User = Database["public"]["Views"]["user_information_full"]["Row"];
export type ResultsT =
  Database["public"]["Views"]["order_results_details"]["Row"];
type UpdateSettings = Database["public"]["Tables"]["user_settings"]["Update"];
type TommyResults = Database["public"]["Views"]["tommy_two_results"]["Row"];
export type TommySel =
  Database["public"]["Views"]["ml_tommy_selections"]["Row"];

export interface TommyUpcoming extends TommySel {
  side: string;
  profit: number;
}
export interface TommyData extends TommyResults {
  side: string;
  profit: number;
}

// initialize context
interface TommyContextType {
  results: TommyData[] | null;
  races: TommyUpcoming[] | null;
  stats: Stats | null;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  startDate: string;
  endDate: string;
}

const initialState = {
  results: null,
  races: null,
  stats: null,
  setStartDate: (date: string) => {},
  setEndDate: (date: string) => {},
  startDate: "",
  endDate: "",
};

export const TommyContext = React.createContext<TommyContextType>(initialState);
TommyContext.displayName = "TommyContext";

// useDesigner to use context
export const useTommy = () => {
  const context = React.useContext(TommyContext);

  return context;
};

interface TommyProviderProps {
  children: React.ReactNode;
}

interface Stats {
  layCount: number;
  backCount: number;
  layProfit: number;
  backProfit: number;
  bangRate: number;
  backRate: number;
  profit: number;
}

export const TommyProvider = ({ children }: TommyProviderProps) => {
  const [results, setResults] = React.useState<TommyData[] | null>(null);
  const [races, setRaces] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [endDate, setEndDate] = React.useState(
    moment().format("YYYY-MM-DD 14:00:00")
  );
  const [startDate, setStartDate] = React.useState(
    moment().format("YYYY-MM-DD 14:00:00")
  );

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("tommy_two_results")
      .select("*")
      .gte("meeting_datestamp", startDate)
      .lte("start_time", endDate)
      .order("start_time", { ascending: true });

    if (error) {
      console.log("Getting Timid Data Error: ", error);
    }
    if (data) {
      console.log("Length", data.length);
      data
        // .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
        .filter((item) => item.price_9am < 10);
      console.log(data.length);
      const timidData = data.filter(
        (item) =>
          ((item.price_9am !== null && item.price_9am < 10) ||
            (item.price_latest !== null && item.price_latest < 10)) &&
          (item.ml_winner !== null || item.predicted_outcome === 1) &&
          item.price_9am &&
          (item.bal < 9.01 || item.bal === null)
      );

      for (const item of timidData) {
        item.side =
          // item.predicted_outcome === 0 &&
          item.prob_winner < 0.33 && item.price_latest < 10
            ? "LAY"
            : item.predicted_outcome === 1 && item.prob_winner > 0.65
            ? "BACK"
            : null;
        if (item.result) {
          if (item.side === "LAY") {
            if (item.result === "WINNER") {
              item.profit = item.bal * -1 + 1;
            } else {
              item.profit = 0.93;
            }
          } else {
            if (item.result === "WINNER") {
              item.profit = item.bal - 1.07;
            } else {
              item.profit = -1;
            }
          }
        }
      }

      // Group items by start_time
      const groupedData = timidData.reduce((acc, item) => {
        const key = item.start_time;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});

      // Filter items within each group
      const filteredData = Object.values(groupedData).flatMap((group: any) => {
        const layItems = group.filter((item: any) => item.side === "LAY");
        const backItems = group.filter((item: any) => item.side === "BACK");

        const filteredLayItems = layItems.reduce((acc: any, item: any) => {
          const existingItem = acc.find(
            (accItem: any) => accItem.start_time === item.start_time
          );
          if (!existingItem) {
            acc.push(item);
          } else {
            if (item.prob_winner < existingItem.prob_winner) {
              // Replace existing item with the one having lower prob_winner
              acc = acc.filter((accItem: any) => accItem !== existingItem);
              acc.push(item);
            }
          }
          return acc;
        }, []);

        return [...filteredLayItems, ...backItems];
      });
      const totalProfit = filteredData.reduce(
        (acc, item) => (acc += item.profit || 0),
        0
      );

      const layProfit = filteredData
        .filter((item) => item.side === "LAY")
        .reduce((acc, item) => (acc += item.profit || 0), 0);

      const backProfit = filteredData
        .filter((item) => item.side === "BACK")
        .reduce((acc, item) => (acc += item.profit || 0), 0);

      const layCount = filteredData.filter(
        (item) => item.side === "LAY"
      ).length;
      const backCount = filteredData.filter(
        (item) => item.side === "BACK"
      ).length;

      const bangRate =
        (filteredData.filter(
          (item) => item.side === "LAY" && item.result === "WINNER"
        ).length /
          layCount) *
        100;

      const backRate =
        (filteredData.filter(
          (item) => item.side === "BACK" && item.result === "WINNER"
        ).length /
          backCount) *
        100;

      setStats({
        ...stats,
        layCount,
        backCount,
        layProfit,
        backProfit,
        bangRate,
        backRate,
        profit: totalProfit,
      });

      const upcoming = filteredData.filter(
        (item) => item.result === null || item.result === undefined
      );
      const resulted = filteredData.filter(
        (item) => item.result !== null && item.result !== undefined
      );
      setRaces(upcoming);
      setResults(resulted);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <TommyContext.Provider
      value={{
        results,
        races,
        stats,
        setStartDate,
        setEndDate,
        startDate,
        endDate,
      }}
    >
      {children}
    </TommyContext.Provider>
  );
};
