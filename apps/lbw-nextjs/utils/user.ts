import moment from "moment";
import { Database } from "@/types/supabase.types";
import { supabase } from "./supabase/client";
import Stripe from "stripe";

type User = Database["public"]["Views"]["user_information_full"]["Row"];
type LayOnly = Database["public"]["Tables"]["lay_only_premium"]["Row"];
type LadbrokesPrices =
  Database["public"]["Views"]["member_selections_ladbrokes_prices"]["Row"];

export const getUsersUpcomingRaces = async (): Promise<LayOnly[]> => {
  const { data, error } = await supabase
    .from("lay_only_premium")
    .select("*")
    .gt("market_start_time", moment().utc().format("YYYY-MM-DD HH:mm"))
    .order("market_start_time", { ascending: true });

  if (error) {
    console.log(error);
    return [];
  }
  console.log("upcoming races", data);
  // Remove duplicats based on venue and race number
  const uniqueRaces = data.filter(
    (race, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.venue_name === race.venue_name && t.race_number === race.race_number
      )
  );
  return uniqueRaces;
};

export const getCustomerById = async (id: string) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-04-10",
  });
  const customer = (await stripe.customers.retrieve(id)) as Stripe.Customer;
  return customer;
};

export const searchForExistingCustomer = async (email: string) => {
  const { data, error } = await supabase
    .from("user_information_full")
    .select("*")
    .eq("email", email);

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};

export const updateSubscriptionExpiration = async (
  sub_id: number,
  expiration: string,
  package_id: number
) => {
  const { data, error } = await supabase
    .from("user_subscription")
    .update({ expires: expiration, tbb4_package: package_id })
    .eq("id", sub_id);

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};

export const createCustomerLogin = async (
  email: string,
  first_name: string,
  last_name: string
) => {
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    email_confirm: true,
  });

  if (error) {
    console.log(error);
    return null;
  }
  if (data) {
    const { data: newUserData, error: newUserError } = await supabase
      .from("user_details")
      .insert([
        {
          email: email,
          first_name: first_name,
          last_name: last_name,
          auth_id: data.user.id,
        },
      ])
      .select("*");
    if (newUserError) {
      console.log(newUserError);
      return null;
    }

    return newUserData[0];
  }
};

export const createCustomerSettings = async () => {
  const { data, error } = await supabase
    .from("user_settings")
    .insert([
      {
        tbb4_stake_size: 1,
        tbb4_take_profit: 1,
        tbb4_stop_loss: 1,
        tbb4_bot: false,
        admin: false,
      },
    ])
    .select("*");

  if (error) {
    console.log(error);
    return null;
  }

  return data[0].id;
};

export const createCustomerSubscription = async (package_id: number) => {
  const { data, error } = await supabase
    .from("user_subscription")
    .insert([
      {
        tbb4_package: package_id,
        expires: moment().add(8, "days").format("YYYY-MM-DD"),
        tbb4: true,
        tbb3: true,
        captains_lounge: package_id === 3 ? true : false,
      },
    ])
    .select("*");

  if (error) {
    console.log(error);
    return null;
  }

  return data[0].id;
};

export const addSubandSettingsToUser = async (
  userId: number,
  settings_id: number,
  sub_id: number
) => {
  const { data, error } = await supabase
    .from("user_details")
    .update({ settings_id: settings_id, subscription_id: sub_id })
    .eq("id", userId);

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};
