"use client";
import React, { useEffect } from "react";
import { getUsersUpcomingRaces } from "@/utils/user";
import { supabase } from "@/utils/supabase/client";
import { Database } from "@/types/supabase.types";
import moment from "moment";
import { useUser } from "./user-provider";

const initialState = {
  upcomingRaces: null,
  refreshUpcomingRaces: () => {},
};

type LayOnly = Database["public"]["Tables"]["lay_only_premium"]["Row"];

// initialize context
interface UpcomingRacesContextType {
  upcomingRaces: LayOnly[] | null;
  refreshUpcomingRaces: () => void;
}
export const UpcomingRacesContext =
  React.createContext<UpcomingRacesContextType>(initialState);
UpcomingRacesContext.displayName = "UpcomingRacesContext";

// useDesigner to use context
export const useUpcomingRaces = () => {
  const context = React.useContext(UpcomingRacesContext);

  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UpcomingRacesProvider = ({ children }: UserProviderProps) => {
  const [upcomingRaces, setUpcomingRaces] = React.useState<LayOnly[] | null>(
    null
  );
  const { user } = useUser();
  const refreshUpcomingRaces = async () => {};

  useEffect(() => {
    const fetchUpcomingRaces = async () => {
      if (!user) return;
      const data = await getUsersUpcomingRaces();
      console.log("uc", data);
      setUpcomingRaces(data);
    };
    fetchUpcomingRaces();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchUpcomingRaces = async () => {
        if (!user) return;
        const data = await getUsersUpcomingRaces();
        console.log("uc", data);
        setUpcomingRaces(data);
      };
      fetchUpcomingRaces();
    }, 60000);
    return () => clearInterval(interval);
  }, [upcomingRaces]);
  return (
    <UpcomingRacesContext.Provider
      value={{ upcomingRaces, refreshUpcomingRaces }}
    >
      {children}
    </UpcomingRacesContext.Provider>
  );
};
