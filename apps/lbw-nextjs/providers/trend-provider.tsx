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
type UpdateSettings = Database["public"]["Tables"]["user_settings"]["Update"];
type BotSettingsType =
  Database["public"]["Tables"]["tbb4_master_settings"]["Row"];
export type SelectionSheet =
  Database["public"]["Views"]["member_selections_ladbrokes_prices"]["Row"];
// initialize context
interface TrendContextType {
  marketData: any;
  customSelections: any;
  botSettings: BotSettingsType | null;
  botResults: any;
  selectionSheet: any;
  racingData: () => void;
  setCustomSelections: (customSelections: any) => void;
  addRemoveCustomSelection: (
    selectionId: any,
    marketId: any,
    side: any,
    selection_name: any,
    units: any
  ) => void;
  updateCustomSelectionStake: (
    selectionId: any,
    marketId: any,
    units: any
  ) => void;
  includeRaceHandler: (id: any, include: any) => void;
  listRunners: (id: any, options: boolean) => void;
  saveSettingsHandler: () => void;
  botStatusHandler: (active: boolean) => void;
  updateSelection: (id: any, marketId: any, decision: any) => void;
  setBotSettings: (settings: BotSettingsType) => void;
  updateLbwPrice: (selectionId: any, marketId: any, price: number) => void;
  getRaceData: (marketId: string) => Promise<any[]>;
  getLbwPriceByHorseName: (
    horseName: string,
    date: string
  ) => Promise<{ lbw_price: number; price_latest: number; price_1min: number } | null>;
  refreshSelectionSheet: () => void;
}

const initialState = {
  marketData: null,
  customSelections: [],
  botSettings: null,
  botResults: [],
  selectionSheet: [],
  racingData: () => {},
  updateCustomSelectionStake: () => {},
  addRemoveCustomSelection: () => {},
  includeRaceHandler: () => {},
  listRunners: () => {},
  saveSettingsHandler: () => {},
  botStatusHandler: () => {},
  updateSelection: () => {},
  setBotSettings: () => {},
  updateLbwPrice: () => {},
  getRaceData: async () => [],
  getLbwPriceByHorseName: async () => null,
  setCustomSelections: () => {},
  refreshSelectionSheet: () => {},
};

export const TrendContext = React.createContext<TrendContextType>(initialState);
TrendContext.displayName = "TrendContext";

// useDesigner to use context
export const useTrend = () => {
  const context = React.useContext(TrendContext);

  return context;
};

interface TrendProviderProps {
  children: React.ReactNode;
}

export const TrendProvider = ({ children }: TrendProviderProps) => {
  const log = useLogger();
  // Table states
  const [marketData, setMarketData] = React.useState<TrendMarketData[] | null>(
    null
  );
  const [customSelections, setCustomSelections] = React.useState([]);
  const [excludeDisabled, setExcludeDisabled] = React.useState(false);

  //   Settings Panel states
  const [botSettings, setBotSettings] = React.useState<BotSettingsType | null>(
    null
  );
  const [settingsSavedSuccess, setSettingsSavedSuccess] = React.useState(null);
  const [botStatus, setBotStatus] = React.useState(false);
  const [settingsChanged, setSettingsChanged] = React.useState(false);
  const [selectionSheet, setSelectionSheet] = React.useState([]);
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

  const getRaceData = async (marketId: string) => {
    const { data, error } = await supabase
      .from("betfair_market_data")
      .select("*")
      .eq("market_id", marketId);

    if (error) return [];
    if (data.length === 0) return [];
    return data;
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
      setBotStatus(!botSettings.active);
    }
    if (error) {
      log.error("Trend Bot Status Update Failed", {
        user: user?.email as string,
        error: error,
      });
    }
  };

  //   TODO: add parameter types
  const includeRaceHandler = async (id: any, include: any) => {
    console.log(id, include);
    const ex = include === "Include" ? true : false;
    const { data, error } = await supabase
      .from("betfair_market_data")
      .update({ starter_package_include: ex })
      .eq("id", id);

    if (error) return;
    setMarketData((prev: any) => {
      const updated = prev.map((item: any) => {
        if (item.id === id) {
          item.starter_package_include = ex;
        }
        return item;
      });
      return updated;
    });
    // await racingData();
  };

  const listRunners = async (id: any, options: boolean) => {
    // update marketData options to true or false
    setMarketData((prev: any) => {
      const updated = prev.map((item: any) => {
        if (item.id === id) {
          item.options = options;
        }
        return item;
      });
      return updated;
    });
  };

  const getSelections = async (id: any) => {
    const { data, error } = await supabase
      .from("betfair_selection_data")
      .select("*")
      .eq("market_id", id)
      .order("runner_name", { ascending: true });

    if (error) return;

    data.forEach((item) => {
      item.horse_number = parseInt(item.runner_name.split(".")[0]);
    });
    data.sort((a, b) => a.horse_number - b.horse_number);
    return data;
  };

  const racingData = async () => {
    const s = await supabase
      .from("tbb4_master_settings")
      .select("*")
      .eq("id", 2);

    if (s.error) return;

    const botSettings = s.data[0];
    let raceTypes = [
      botSettings.horse ? "Thoroughbred" : null,
      botSettings.greyhound ? "Greyhound" : null,
      botSettings.harness ? "Harness" : null,
    ].filter((rt) => rt !== null);

    console.log(raceTypes);
    const now = moment().utc().format();
    const rawData = await supabase
      .from("betfair_market_data")
      .select("*")
      .gt("market_start_time", now)
      .in("race_type", raceTypes)
      .order("market_start_time", { ascending: true });

    if (rawData.error) return;
    const data = rawData.data;
    data.forEach(async (item) => {
      item.options = false;
      item.runners = await getSelections(item.market_id);
    });

    setMarketData(data);
  };

  const getCustomSelections = async () => {
    const { data, error } = await supabase
      .from("starter_package_selection_overrides")
      .select("*");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to get custom selections, refresh the page",
        duration: 5000,
      });
      return;
    }
    //@ts-ignore
    setCustomSelections(data);
  };

  const updateCustomSelectionStake = async (
    selectionId: any,
    marketId: any,
    units: any
  ) => {
    const newUnit = units === "one" ? 1 : 2;
    const { data, error } = await supabase
      .from("starter_package_selection_overrides")
      .update({
        selection_id: selectionId,
        market_id: marketId,
        units: newUnit,
      })
      .eq("selection_id", selectionId)
      .eq("market_id", marketId);
  };

  const updateLbwPrice = async (
    selectionId: any,
    marketId: any,
    price: number
  ) => {
    const { data, error } = await supabase
      .from("starter_package_selection_overrides")
      .update({
        selection_id: selectionId,
        market_id: marketId,
        lbw_price: price,
      })
      .eq("selection_id", selectionId)
      .eq("market_id", marketId);

    if (error) {
      console.error(error);
      return;
    }

    setSelectionSheet((prev: any) => {
      const updated = prev.map((item: any) => {
        if (item.selection_id === selectionId && item.market_id === marketId) {
          return { ...item, lbw_price: price };
        }
        return item;
      });
      return updated;
    });
  };

  const addRemoveCustomSelection = async (
    selectionId: any,
    marketId: any,
    side: any,
    selection_name: any,
    units: any
  ) => {
    const exists = customSelections.filter(
      (cs: any) => cs.selection_id === selectionId
    );

    console.log(exists);

    if (exists.length > 0) {
      const { data, error } = await supabase
        .from("starter_package_selection_overrides")
        .delete()
        .eq("selection_id", selectionId);
      // update custom selections state
      setCustomSelections((prev: any) => {
        return prev.filter((cs: any) => cs.selection_id !== selectionId);
      });
    } else {
      const { data, error } = await supabase
        .from("starter_package_selection_overrides")
        .insert([
          {
            selection_id: selectionId,
            market_id: marketId,
            side: side,
            selection_name: selection_name,
            units: units ? units : 1,
          },
        ]);
      // update custom selections state
      // @ts-ignore
      setCustomSelections((prev: any) => {
        return [
          ...prev,
          {
            selection_id: selectionId,
            market_id: marketId,
            side: side,
            selection_name: selection_name,
            units: units ? units : 1,
          },
        ];
      });
    }
  };

  const getLbwPriceByHorseName = async (horseName: string, date: string) => {
    // Convert date from DD-MM-YYYY to YYYY-MM-DD format
    const formatDate = (dateStr: string) => {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return dateStr; // Return as-is if format is unexpected
    };

    const formattedDate = formatDate(date);

    const { data, error } = await supabase
      .from("member_selections_ladbrokes_prices")
      .select("*")
      .eq("meeting_date", formattedDate)
      .like("runner_name", `%${horseName}%`);
    if (error) return null;
    if (data.length === 0) return null;
    return {
      lbw_price: data[0].lbw_price || 0,
      price_latest: data[0].price_latest || 0,
      price_1min: data[0].price_1min || 0,
    };
  };

  const [botResults, setBotResults] = React.useState<TrendResults[]>([]);

  const updateSelection = async (id: any, marketId: any, decision: any) => {
    try {
      const { data, error } = await supabase
        .from("starter_package_selection_overrides")
        .update({ side: decision })
        .eq("selection_id", id)
        .eq("market_id", marketId);

      if (error) {
        console.error(error);
        return;
      }

      // Update local state
      setSelectionSheet((prev: any) => {
        const updated = prev.map((item: any) => {
          if (item.selection_id === id && item.market_id === marketId) {
            return { ...item, side: decision };
          }
          return item;
        });
        return updated;
      });

      // Update botResults if needed
      setBotResults((prev: any) => {
        const updated = prev.map((item: any) => {
          if (item.selection_id === id && item.market_id === marketId) {
            return { ...item, side: decision };
          }
          return item;
        });
        return updated;
      });
    } catch (error) {
      console.error("Error updating selection:", error);
    }
  };

  const getSelectionSheet = async () => {
    const { data, error } = await supabase
      .from("member_selections_ladbrokes_prices")
      .select("*")
      .eq("meeting_date", moment().format("YYYY-MM-DD"))
      .order("start_time", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to get selection sheet",
        variant: "destructive",
        duration: 5000,
      });
    }
    if (data) {
      //@ts-ignore
      setSelectionSheet(data);
    }
  };

  const pathname = usePathname();

  React.useEffect(() => {
    getMasterSettings();
    if (pathname.includes("/trend")) {
      // racingData();
      getCustomSelections();
      // getLadbrokesOdds();
      getSelectionSheet();
    }
  }, [pathname]);

  return (
    <TrendContext.Provider
      value={{
        marketData,
        customSelections,
        botSettings,
        botResults,
        selectionSheet,
        racingData,
        botStatusHandler,
        saveSettingsHandler,
        setCustomSelections,
        addRemoveCustomSelection,
        updateCustomSelectionStake,
        includeRaceHandler,
        listRunners,
        updateSelection,
        setBotSettings,
        updateLbwPrice,
        getRaceData,
        getLbwPriceByHorseName,
        refreshSelectionSheet: getSelectionSheet,
      }}
    >
      {children}
    </TrendContext.Provider>
  );
};
