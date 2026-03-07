"use server";
import { Database } from "@/types/supabase.types";
import { createClient } from "./server";
import moment from "moment";
import { WebsiteResults } from "@/types/customData.types";

interface ResultStats {
  members: {
    units: number;
    strike_rate: number;
    roi: number;
    weekly_average: number;
  };
  members_plus: {
    units: number;
    strike_rate: number;
    roi: number;
    weekly_average: number;
  };
}

export interface OurResultsReturn {
  results: WebsiteResults[];
  stats: ResultStats;
}

export interface ErrorReturn {
  error: string;
}

export const getOurResults = async (
  timeFrame: string
): Promise<OurResultsReturn | ErrorReturn> => {
  const supabase = await createClient();
  const dateDiff = timeFrame === "all" ? 1000 : timeFrame === "month" ? 31 : 7;
  const { data, error } = await supabase
    .from("website_results")
    .select("*")
    .gte(
      "event_date",
      moment().subtract(dateDiff, "days").format("YYYY-MM-DD")
    );

  if (error) {
    console.log(error);
    return { error: "Error fetching results" };
  }

  // Calculate total units, strike rate and roi
  const stats: ResultStats = {
    members_plus: {
      units: 0,
      strike_rate: 0,
      roi: 0,
      weekly_average: 0,
    },
    members: {
      units: 0,
      strike_rate: 0,
      roi: 0,
      weekly_average: 0,
    },
  };

  data.reverse();
  let rt = 0;
  data.forEach((item: any) => {
    rt = rt + item.units;
    item.members_plus_total = rt;
  });

  // create a key that is total for the day and then map over that
  let currentDay: string | null = null;
  let dailyTotal: number = 0;
  let mTotal: number = 0;

  data.forEach((item) => {
    const orderPlacedDate = moment(item.event_date).format("YYYY-MM-DD");
    const formatedDate = moment(item.event_date).format("DD MMM YYYY");

    // Check if it's a new day
    if (currentDay !== orderPlacedDate) {
      currentDay = orderPlacedDate;
      dailyTotal = 0; // Reset daily total for a new day
    }

    // Check if adding the current item will exceed the daily limit
    if (dailyTotal <= 3) {
      dailyTotal += item.units;
      mTotal += item.units;
      item.members_units = item.units;
    } else {
      item.members_units = 0;
      mTotal = mTotal; // Don't exceed the daily limit
    }

    item.members_total = mTotal;
    item.date_formated = formatedDate;
  });

  //Standard Members
  data.forEach((item: any) => {
    stats.members.units = stats.members.units + item.members_units;
  });

  stats.members.strike_rate =
    data.filter((item: any) => item.members_units > 0).length /
    data.filter((item: any) => item.members_units !== 0).length;
  stats.members.roi =
    stats.members.units /
    data.filter((item: any) => item.members_units !== 0).length;

  // Members Plus
  data.forEach((item: any) => {
    stats.members_plus.units = stats.members_plus.units + item.units;
  });

  stats.members_plus.strike_rate =
    data.filter((item: any) => item.units > 0).length / data.length;
  stats.members_plus.roi = stats.members_plus.units / data.length;

  const uniqueDays = new Set(
    data.map((item) => moment(item.event_date).format("YYYY-MM-DD"))
  );
  const numberOfUniqueDays = uniqueDays.size;
  const weeks = Math.ceil(numberOfUniqueDays / 7);

  stats.members.weekly_average = stats.members.units / weeks;
  stats.members_plus.weekly_average = stats.members_plus.units / weeks;

  // setResultStats(stats);

  // setResults(data);

  return {
    results: data,
    stats: stats,
  };
};
