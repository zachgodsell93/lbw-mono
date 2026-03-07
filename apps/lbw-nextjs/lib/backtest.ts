import moment from "moment";
import { supabase } from "@/utils/supabase/client";
import { BacktestParams } from "@/app/api/backtest/route";
import { Database } from "@/types/supabase.types";
import { BacktestOptions } from "@/components/admin/back-testing/settings-panel";

export type Race = Database["public"]["Views"]["backtesting"]["Row"];

export interface NewRaces extends Race {
  profit: number;
  decision: string;
  stake?: number;
}

export const getRaces = async (
  start_date: string,
  end_date: string,
  min_odds: number,
  max_odds: number,
  barrier_min: number,
  barrier_max: number,
  min_track_condition: number,
  max_track_condition: number,
  venues: string[]
): Promise<Race[]> => {
  const { data, error } = await supabase
    .from("backtesting")
    .select("*")
    .gte("meeting_datestamp", start_date)
    .lte("meeting_datestamp", end_date)
    .gte("bal", min_odds)
    .lte("bal", max_odds)
    .lt("predicted_settle_position", 20)
    .gte("pfairank", 2)
    .gte("weight_class_ranl", 2)
    .lte("weight_class_ranl", 10)
    .gte("time_ranking", 2)
    .lte("time_ranking", 20)

    // .gte("barrier", barrier_min)
    // .lte("barrier", barrier_max)
    .in("venue", venues)
    // .gte("trackcondition", min_track_condition)
    // .lte("trackcondition", max_track_condition)
    .order("meeting_datestamp", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};

interface CalculateResultParams {
  race: Race;
}

// Lay all selections within the specified parameters
const calculateLayOnly = (req: CalculateResultParams): NewRaces => {
  const { race } = req;
  const winner = race.lb_result === "WINNER";
  const price = race.bal;
  if (!price) {
    return {
      ...race,
      stake: 0,
      profit: 0,
      decision: "No Bet",
    };
  }
  const stake = Math.ceil(10 / price);

  // Calculate the profit
  // If winner then negative stake times odds plus 1
  // If loser then stake times commision
  // Lay side the loser is a winner for us
  const profit = winner ? stake * -1 * price + stake : stake * 0.93;

  return {
    ...race,
    stake,
    profit,
    decision: "Lay",
  };
};

export const layOnly = (races: Race[]) => {
  let total_profit = 0;
  let new_races: NewRaces[] = [];
  races.forEach((race) => {
    const profit = calculateLayOnly({
      race,
    });
    if (profit?.profit === 0) {
      return;
    }
    total_profit += profit.profit;
    new_races.push(profit as NewRaces);
  });
  // const minDate = moment(races[0].meeting_datestamp).format("DD/MM/YYYY");
  // const maxDate = moment(races[races.length - 1].meeting_datestamp).format(
  //   "DD/MM/YYYY"
  // );

  // const weeks = moment(maxDate).diff(moment(minDate), "weeks");
  const weeks = 1;
  const weekly_avg = Math.round(new_races.length / weeks);
  const winPercent = Math.round(
    (new_races.filter((race) => race.profit > 0).length / new_races.length) *
      100
  );
  const totalRaces = new_races.length;

  return { new_races, total_profit, weekly_avg, winPercent, totalRaces };
};
