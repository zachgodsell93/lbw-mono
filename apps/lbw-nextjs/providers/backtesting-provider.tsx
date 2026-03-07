"use client";
import React, { useEffect, useState } from "react";
// import { getUser } from "../utils/supabaseClient";
import { supabase } from "@/utils/supabase/client";
import { Database } from "@/types/supabase.types";
import { NewRaces, Race } from "@/lib/backtest";
import { BacktestParams } from "@/app/api/backtest/route";
import { BacktestOptions } from "@/components/admin/back-testing/settings-panel";

export type User = Database["public"]["Views"]["user_information_full"]["Row"];
type RecentOrders = Database["public"]["Views"]["order_results_details"]["Row"];
type VenueType = Database["public"]["Tables"]["venue_types"]["Row"];
type Stats = {
  totalRaces: number;
  totalProfit: number;
  weeklyAvg: number;
  winPercent: number;
};

// initialize context
interface BacktestingContextType {
  races: NewRaces[];
  setRaces: React.Dispatch<React.SetStateAction<NewRaces[]>>;
  daily: {
    date: string;
    profit: number;
    race_count: number;
    target_hit: boolean;
  }[];
  stats: Stats;
  executeBacktest: (bts: BacktestOptions) => Promise<void>;
  getVenueTypes: () => Promise<VenueType[]>;
}

const initialState = {
  races: [],
  setRaces: () => {},
  stats: {
    totalRaces: 0,
    totalProfit: 0,
    weeklyAvg: 0,
    winPercent: 0,
  },
  daily: [],
  executeBacktest: async () => {},
  getVenueTypes: async () => [],
};

export const BacktestingContext =
  React.createContext<BacktestingContextType>(initialState);
BacktestingContext.displayName = "BacktestingContext";

// useDesigner to use context
export const useBacktesting = () => {
  const context = React.useContext(BacktestingContext);

  return context;
};

interface BacktestingProviderProps {
  children: React.ReactNode;
}

export const BacktestingProvider = ({ children }: BacktestingProviderProps) => {
  const [races, setRaces] = useState<NewRaces[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalRaces: 0,
    totalProfit: 0,
    weeklyAvg: 0,
    winPercent: 0,
  });
  const [daily, setDaily] = useState<
    {
      date: string;
      profit: number;
      race_count: number;
      target_hit: boolean;
    }[]
  >([]);

  const executeBacktest = async (bts: BacktestOptions) => {
    const response = await fetch("/api/backtest-new", {
      method: "POST",
      body: JSON.stringify(bts),
    });
    const data = await response.json();
    console.log(data);
    // console.log(data.daily);
    setRaces(data.new_races);
    setStats({
      totalRaces: data.totalRaces,
      totalProfit: data.total_profit,
      weeklyAvg: data.weekly_avg,
      winPercent: data.winPercent,
    });
  };

  const getVenueTypes = async (): Promise<VenueType[]> => {
    const { data, error } = await supabase.from("venue_types").select("*");
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  };

  return (
    <BacktestingContext.Provider
      value={{
        races,
        setRaces,
        stats,
        daily,
        executeBacktest,
        getVenueTypes,
      }}
    >
      {children}
    </BacktestingContext.Provider>
  );
};
