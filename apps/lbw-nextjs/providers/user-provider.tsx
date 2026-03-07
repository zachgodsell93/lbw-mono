"use client";
import React, { useEffect } from "react";
// import { getUser } from "../utils/supabaseClient";
import { supabase } from "@/utils/supabase/client";
import { Database } from "@/types/supabase.types";
import moment from "moment";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

type User = Database["public"]["Views"]["user_information_full"]["Row"];
export type UserUpdate = Database["public"]["Tables"]["user_details"]["Update"];
export type ResultsBase =
  Database["public"]["Views"]["order_results_details"]["Row"];
export interface ResultsT extends ResultsBase {
  running_profit: number;
  date: string;
  time: string;
}
type UpdateSettings = Database["public"]["Tables"]["user_settings"]["Update"];
type Results = {
  results: ResultsT[];
  resultsReverse: ResultsT[];
  profit: number;
  profit_w_comms: number;
  lays: number;
  backs: number;
  match_rate: number;
};

// initialize context
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  updateUserDetails: (user: any) => void;
  results: Results | null;
  handleResults: (startDate?: string, endDate?: string) => void;
  storeUserDetails: (user: any) => void;
  refreshUser: () => void;
  updateUserSetting: (settings: UpdateSettings) => void;
  dates: { from: string; to: string };
  updateUserBettingsystem: (bettingSystemId: number) => void;
}

const initialState = {
  user: null,
  updateUserDetails: () => {},
  setUser: () => {},
  results: null,
  handleResults: (startDate?: string, endDate?: string) => {},
  storeUserDetails: (user: any) => {},
  refreshUser: () => {},
  updateUserSetting: (settings: UpdateSettings) => {},
  dates: { from: "", to: "" },
  updateUserBettingsystem: (bettingSystemId: number) => {},
};

export const getUser = async (): Promise<User | null> => {
  const user = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  const { data, error } = await supabase
    .from("user_information_full")
    .select("*")
    .eq("auth_id", user?.data?.user?.id)
    .single();

  if (error) {
    return null;
  }
  return data;
};

export const getResults = async (
  startDate?: string,
  endDate?: string
): Promise<ResultsT[] | null> => {
  const user = await supabase.auth.getUser();

  if (!user) {
    return null;
  }
  if (!endDate) {
    endDate = moment().format("YYYY-MM-DD");
  }
  if (!startDate) {
    startDate = moment().format("YYYY-MM-DD");
  }

  const { data, error } = await supabase
    .from("order_results_details")
    .select("*")
    .eq("auth_id", user?.data.user?.id)
    .gte("event_date", startDate)
    .lte("event_date", endDate)
    .order("order_placed_time", { ascending: false });

  if (error) {
    return null;
  }
  console.log("res", data);
  return data;
};

export const UserContext = React.createContext<UserContextType>(initialState);
UserContext.displayName = "UserContext";

// useDesigner to use context
export const useUser = () => {
  const context = React.useContext(UserContext);

  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [results, setResults] = React.useState<Results | null>(null);
  const [updating, setUpdating] = React.useState(false);
  const [dates, setDates] = React.useState<{ from: string; to: string }>({
    from: moment().format("YYYY-MM-DD"),
    to: moment().add(1, "day").format("YYYY-MM-DD"),
  });

  const storeUserDetails = (user: any) => {
    setUser(user);
  };

  const pathname = usePathname();

  const updateUserDetails = async (user: User) => {
    const { data, error } = await supabase
      .from("user_details")
      .update(user)
      .eq("id", user?.auth_id);
    if (error) {
      return null;
    }
    return data;
  };

  const updateUserBettingsystem = async (bettingSystemId: number) => {
    const { error } = await supabase
      .from("user_betting_system")
      .update({ system_id: bettingSystemId })
      .eq("auth_id", user?.auth_id)
      .eq("race_type", "Thoroughbred");

    if (error) {
      return null;
    }
    return true;
  };

  const updateUserSetting = async (settings: UpdateSettings) => {
    const { data, error } = await supabase
      .from("user_settings")
      .update(settings)
      .eq("id", user?.us_id);
    if (error) {
      console.log("error", error);
      return null;
    }
    refreshUser();
    return data;
  };

  // Refreshes the users data
  const refreshUser = async () => {
    if (user) return;
    const u = await getUser();

    if (!u) {
      return;
    }
    storeUserDetails(u);
    setUser(u);
  };

  // Handle results data for the user
  const handleResults = async (startDate?: string, endDate?: string) => {
    if (startDate && endDate) {
      setDates({ from: startDate, to: endDate });
    }
    if (!startDate && !endDate) {
      startDate = dates.from;
      endDate = dates.to;
    }
    const res = await getResults(startDate, endDate);
    if (!res) {
      return;
    }
    const profit = res.reduce((acc, curr) => acc + (curr.profit || 0), 0);
    const prof_w_comms = res.reduce(
      (acc, curr) => acc + (curr.profit_with_comm || 0),
      0
    );
    // if side === back, it's a back bet
    const backs = res.filter((r) => r.side === "BACK").length;
    const lays = res.filter((r) => r.side === "LAY").length;
    const matchRate = res.filter((r) => r.profit).length / res.length;
    let runningTotal = 0;
    res.sort((a, b) => {
      return (
        moment(a.order_placed_time).unix() - moment(b.order_placed_time).unix()
      );
    });
    for (const item of res) {
      if (item.profit_with_comm) {
        runningTotal = runningTotal + item.profit_with_comm;
      }
      item.running_profit = runningTotal;
      item.date = moment(item.order_placed_time).format("DD-MM-YYYY");
      item.time = moment(item.order_placed_time).format("hh:mm");
    }

    const resR = res.slice().reverse();

    setResults({
      results: res,
      resultsReverse: resR,
      profit,
      profit_w_comms: prof_w_comms,
      backs,
      lays,
      match_rate: matchRate,
    });
  };

  React.useEffect(() => {
    refreshUser();
    if (!results?.results || results.results.length === 0) {
      handleResults();
    }
  }, []);

  // Update results every minute
  React.useEffect(() => {
    const interval = setInterval(() => {
      handleResults();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (!user) return;
    posthog.identify(
      user.email as string, // Replace 'distinct_id' with your user's unique identifier
      { email: user.email }
    );
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUserDetails,
        results,
        refreshUser,
        handleResults,
        updateUserSetting,
        storeUserDetails,
        dates,
        updateUserBettingsystem,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
