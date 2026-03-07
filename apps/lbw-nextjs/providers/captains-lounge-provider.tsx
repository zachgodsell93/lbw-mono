"use client";
import React, { useEffect } from "react";
import { useUser } from "./user-provider";
import { supabase } from "@/utils/supabase/client";
import { Database } from "@/types/supabase.types";
import { log } from "next-axiom";

// initialize context
interface CLContenxtType {
  strategies:
    | Database["public"]["Tables"]["cl_user_strategies"]["Row"][]
    | null;
  filterStrategy: (type: {
    type: "Thoroughbred" | "Greyhound" | "Harness";
  }) => Database["public"]["Tables"]["cl_user_strategies"]["Row"] | null;
  getStrategies: () => Promise<any>;
  updateStrategy: (
    type: { type: "Thoroughbred" | "Greyhound" | "Harness" },
    settings: Database["public"]["Tables"]["cl_user_strategies"]["Update"]
  ) => Promise<any>;
  CLUser: Database["public"]["Views"]["captains_lounge_full"]["Row"] | null;
  getCLUser: () => Promise<any>;
}
const initialState = {
  strategies: null,
  filterStrategy: () => null,
  getStrategies: async () => {},
  updateStrategy: async () => {},
  CLUser: null,
  getCLUser: async () => {},
};

export const CLContext = React.createContext<CLContenxtType>(initialState);
CLContext.displayName = "PaymentContext";

// useDesigner to use context
export const useCaptainsLounge = () => {
  const context = React.useContext(CLContext);

  return context;
};

interface CLProviderProps {
  children: React.ReactNode;
}

interface StrategyType {
  type: "Thoroughbred" | "Greyhound" | "Harness";
}

export type Strategies =
  Database["public"]["Tables"]["cl_user_strategies"]["Row"];
type CLUser = Database["public"]["Views"]["captains_lounge_full"]["Row"];
export type StrategyUpdate =
  Database["public"]["Tables"]["cl_user_strategies"]["Update"];

export const CLProvider = ({ children }: CLProviderProps) => {
  const [strategies, setStrategies] = React.useState<Strategies[] | null>(null);
  const [CLUser, setCLUser] = React.useState<CLUser | null>(null);

  const { user } = useUser();

  const getStrategies = async () => {
    const { data, error } = await supabase
      .from("cl_user_strategies")
      .select("*")
      .eq("user_id", user?.auth_id);
    if (data) {
      console.log("initial strat", data);

      setStrategies(data);
    }
    if (error) {
      console.log("error", error);
    }
  };

  const filterStrategy = (type: StrategyType): Strategies | null => {
    if (!strategies) return null;
    return strategies.filter((strategy) => strategy.race_type === type.type)[0];
  };

  const getCLUser = async () => {
    const { data, error } = await supabase
      .from("captains_lounge_full")
      .select("*")
      .eq("auth_id", user?.auth_id);
    if (data) {
      setCLUser(data[0]);
      return data[0];
    }
    if (error) {
      return error;
    }
  };

  const updateStrategy = async (
    type: StrategyType,
    settings: StrategyUpdate
  ) => {
    const { data, error } = await supabase
      .from("cl_user_strategies")
      .update(settings)
      .eq("user_id", user?.auth_id)
      .eq("race_type", type.type);
    if (data) {
      console.log(data);
      log.info("Captains Lounge Strat Updated", {
        user: user?.email as string,
        data: data,
      });
      return data;
    }
    if (error) {
      log.error("Issue Upating Captains Lounge strat", {
        user: user?.email as string,
        data: data,
      });
      return error;
    }
  };

  useEffect(() => {
    if (!user) return;
    getStrategies();
  }, [user]);
  if (!strategies) return null;
  return (
    <CLContext.Provider
      value={{
        strategies,
        filterStrategy,
        getStrategies,
        updateStrategy,
        CLUser,
        getCLUser,
      }}
    >
      {children}
    </CLContext.Provider>
  );
};
