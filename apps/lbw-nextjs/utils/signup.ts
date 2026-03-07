"use server";
import { createClient } from "./supabase/server";
import moment from "moment";

interface Details {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  mobile?: string;
}

export const searchForExistingCustomer = async (email: string) => {
  const supabase = await createClient();
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
  expiration: Date,
  package_id: number
) => {
  const supabase = await createClient();
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

export const createUser = async (details: Details) => {
  if (!details.email || !details.password)
    return { error: "No email or password provided" };
  const sb = await createClient();
  const { data, error } = await sb.auth.signUp({
    email: details.email,
    password: details.password,
  });
  if (error) {
    console.error(error);
    return { error: error };
  }
  if (!data || !data.user) {
    return { error: "No data returned" };
  }
  const id = data.user.id;

  return { id: id };
};

export const createUserDetails = async (details: Details, id: string) => {
  const sb = await createClient();
  const { data, error } = await sb
    .from("user_details")
    .insert([
      {
        auth_id: id,
        first_name: details.firstName,
        last_name: details.lastName,
        email: details.email,
      },
    ])
    .select("*");
  if (error) {
    console.error(error);
    return { error: error };
  }
  if (!data) {
    return { error: "No data returned" };
  }
  return { id: parseInt(data[0].id) };
};

export const createCustomerSubscription = async (package_id: number) => {
  const sb = await createClient();
  const { data, error } = await sb
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
    return { error: error };
  }

  return { id: parseInt(data[0].id) };
};

export const createCustomerSettings = async () => {
  const sb = await createClient();
  const { data, error } = await sb
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
    console.error(error);
    return { error: error };
  }
  if (!data || !data[0] || data.length === 0) {
    return { error: "No data returned" };
  }
  const id = data[0].id;
  return { id: id };
};

export const addSubandSettingsToUser = async (
  userId: number | string,
  settings_id: string | number,
  sub_id: number | string
) => {
  const supabase = await createClient();
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
