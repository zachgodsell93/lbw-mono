"use client";
import React, { useEffect } from "react";
// import { getUser } from "../utils/supabaseClient";
import { supabase } from "@/utils/supabase/client";
import { Database } from "@/types/supabase.types";
import moment from "moment";
import { useUser } from "./user-provider";
import { TrendMarketData, TrendResults } from "@/types/customData.types";
import { set } from "date-fns";
import { useToast } from "../components/ui/use-toast";
import { usePathname } from "next/navigation";
import { useLogger } from "next-axiom";

type User = Database["public"]["Views"]["user_information_full"]["Row"];
export type ResultsT =
  Database["public"]["Views"]["order_results_details"]["Row"];

type BotSettingsType =
  Database["public"]["Tables"]["tbb4_master_settings"]["Row"];

export type RaceData = Database["public"]["Tables"]["lay_only_premium"]["Row"];

// initialize context
interface LayOnlyContextType {
  marketData: RaceData[];
  customSelections: any;
  botSettings: BotSettingsType | null;
  botResults: any;
  racingData: () => void;
  setCustomSelections: (customSelections: any) => void;
  saveSettingsHandler: () => void;
  setBotSettings: (settings: BotSettingsType) => void;
  botStatusHandler: (active: boolean) => void;
}

const initialState = {
  marketData: [],
  customSelections: [],
  botSettings: null,
  botResults: [],
  racingData: () => {},
  setCustomSelections: () => {},
  saveSettingsHandler: () => {},
  setBotSettings: () => {},
  botStatusHandler: () => {},
};

export const LayOnlyContext =
  React.createContext<LayOnlyContextType>(initialState);
LayOnlyContext.displayName = "LayOnlyContext";

// useDesigner to use context
export const useLayOnly = () => {
  const context = React.useContext(LayOnlyContext);

  return context;
};

interface LayOnlyProviderProps {
  children: React.ReactNode;
}

export const LayOnlyProvider = ({ children }: LayOnlyProviderProps) => {
  const log = useLogger();
  // Table states
  const [marketData, setMarketData] = React.useState<RaceData[]>([]);
  const [customSelections, setCustomSelections] = React.useState([]);
  const [excludeDisabled, setExcludeDisabled] = React.useState(false);

  //   Settings Panel states
  const [botSettings, setBotSettings] = React.useState<BotSettingsType | null>(
    null
  );

  const { user } = useUser();
  const { toast } = useToast();

  const getMasterSettings = async () => {
    const { data, error } = await supabase
      .from("tbb4_master_settings")
      .select("*")
      .eq("id", 2);
    // console.log(data);
    if (error) return;
    setBotSettings(data[0]);
  };

  const saveSettingsHandler = async () => {
    const { data, error } = await supabase
      .from("tbb4_master_settings")
      .upsert(botSettings)
      .eq("id", 2)
      .select("*");

    if (data) {
      // update bot settings state
      log.info("Trend Settings Updated", {
        user: user?.email as string,
        data: data,
      });
      setBotSettings(data[0]);
      toast({
        title: "Settings Saved",
        description: "Settings have been saved successfully",
        variant: "success",
        duration: 5000,
      });
    }
    if (error) {
      log.error("Trend Settings Update Failed", {
        user: user?.email as string,
        error: error,
      });
    }
  };

  const botStatusHandler = async (active: boolean) => {
    if (!botSettings) return;
    const { data, error } = await supabase
      .from("tbb4_master_settings")
      .update({ active: active })
      .eq("id", 2)
      .select("*");
    // update bot settings state
    if (data) {
      log.info("Trend Bot Status Updated", {
        user: user?.email as string,
        data: data,
      });
      setBotSettings(data[0]);
    }
    if (error) {
      log.error("Trend Bot Status Update Failed", {
        user: user?.email as string,
        error: error,
      });
    }
  };

  const racingData = async () => {
    const { data, error } = await supabase
      .from("lay_only_premium")
      .select("*")
      .gte("market_start_time", moment().format("YYYY-MM-DD 00:00:00"))
      .order("market_start_time", { ascending: true });
    if (error) {
      log.error("Lay Only Racing Data Fetch Failed", {
        error: error,
      });

      setMarketData([]);
      return;
    }
    console.log(data);
    setMarketData(data);
  };

  const [botResults, setBotResults] = React.useState<TrendResults[]>([]);

  const pathname = usePathname();

  React.useEffect(() => {
    getMasterSettings();
    if (pathname.includes("/lay-only")) {
      racingData();
    }
  }, [pathname]);

  return (
    <LayOnlyContext.Provider
      value={{
        marketData,
        customSelections,
        botSettings,
        botResults,
        racingData,
        botStatusHandler,
        saveSettingsHandler,
        setCustomSelections,
        setBotSettings,
      }}
    >
      {children}
    </LayOnlyContext.Provider>
  );
};
