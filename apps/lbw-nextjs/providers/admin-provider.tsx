"use client";
import React, { useEffect } from "react";
// import { getUser } from "../utils/supabaseClient";
import { supabase } from "@/utils/supabase/client";
import { Database } from "@/types/supabase.types";
import moment from "moment";
import { useUser } from "./user-provider";

export type User = Database["public"]["Views"]["user_information_full"]["Row"];
type RecentOrders = Database["public"]["Views"]["order_results_details"]["Row"];

// initialize context
interface AdminContextType {
  admin: boolean;
  userInformation: User[] | null;
  baseUserInformation: User[] | null;
  setUserInformation: React.Dispatch<React.SetStateAction<User[] | null>>;
  userRecentOrders: RecentOrders[] | null;
  handleDeactivate: (id: string) => void;
  updatePackage: (id: number, packageId: number) => void;
  updateStaking: (
    id: string,
    packageId: number,
    stake: number,
    stopLoss: number,
    takeProfit: number
  ) => void;
}

const initialState = {
  admin: false,
  userInformation: null,
  baseUserInformation: null,
  setUserInformation: () => {},
  userRecentOrders: null,
  handleDeactivate: () => {},
  updatePackage: () => {},
  updateStaking: () => {},
};

export const AdminContext = React.createContext<AdminContextType>(initialState);
AdminContext.displayName = "AdminContext";

// useDesigner to use context
export const useAdmin = () => {
  const context = React.useContext(AdminContext);

  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [admin, setAdmin] = React.useState<boolean>(false);
  const [baseUserInformation, setBaseUserInformation] = React.useState<
    User[] | null
  >(null);
  const [userInformation, setUserInformation] = React.useState<User[] | null>(
    null
  );
  const [userRecentOrders, setUserRecentOrders] = React.useState<
    RecentOrders[] | null
  >(null);
  const { user } = useUser();

  const getUsersInformationFull = async () => {
    const { data, error } = await supabase
      .from("user_information_full")
      .select("*")
      .gte("tbb4_package", 0)
      .order("tbb4_bot", { ascending: false })
      .order("last_sign_in_at", { ascending: false });
    if (error) {
      console.error(error);
    } else {
      setUserInformation(data);
      setBaseUserInformation(data);
    }
  };

  const banUser = async (id: string) => {
    const { data, error } = await supabase.auth.admin.updateUserById(id, {
      ban_duration: "36000h30m",
    });
  };

  const handleDeactivate = async (id: string) => {
    const { data: userDetails, error: userDetailsError } = await supabase
      .from("user_details")
      .select("*")
      .eq("auth_id", id);

    if (userDetailsError) {
      console.error(userDetailsError);
      return;
    }

    const { data: userSettings, error: userSettingsError } = await supabase
      .from("user_settings")
      .update({
        betfair_access_token: null,
        betfair_refresh_token: null,
        betfair_vendor_client_id: null,
        tbb4_bot: false,
        tbb4_stake_size: 0,
      })
      .eq("id", userDetails[0].settings_id);

    if (userSettingsError) {
      console.error(userSettingsError);
      return;
    }

    await banUser(id);
  };

  const updatePackage = async (id: number, packageId: number) => {
    const { data, error } = await supabase
      .from("user_subscription")
      .update({ tbb4_package: packageId })
      .eq("id", id);
  };

  const updateStaking = async (
    id: string,
    packageId: number,
    stake: number,
    stopLoss: number,
    takeProfit: number
  ) => {
    const { data, error } = await supabase
      .from("user_settings")
      .update({
        tbb4_stake_size: stake,
        tbb4_stop_loss: stopLoss,
        tbb4_take_profit: takeProfit,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
    } else {
      console.log("Staking updated successfully");
    }
  };

  const getUsersRecentOrders = async () => {
    const { data, error } = await supabase
      .from("order_results_details")
      .select("*")
      .eq("race_type", "Thoroughbred")
      .limit(400);
    if (error) {
      console.error(error);
    } else {
      setUserRecentOrders(data);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.admin === true) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    }
  }, [user]);

  useEffect(() => {
    getUsersInformationFull();
    getUsersRecentOrders();
  }, []);
  return (
    <AdminContext.Provider
      value={{
        admin,
        userInformation,
        baseUserInformation,
        setUserInformation,
        userRecentOrders,
        handleDeactivate,
        updatePackage,
        updateStaking,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
