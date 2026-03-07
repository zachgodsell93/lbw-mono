import { getRaces, layOnly } from "@/lib/backtest";

import { BacktestOptions } from "@/components/admin/back-testing/settings-panel";
import { Race } from "@/lib/backtest";

export async function POST(req: Request) {
  const body = await req.json();

  const { ...backtestOptions } = body as BacktestOptions;

  if (!backtestOptions.pass_key) {
    return new Response("Missing required fields", { status: 400 });
  }

  if (backtestOptions.pass_key !== process.env.BACKTEST_PASS_KEY) {
    return new Response("Invalid pass key", { status: 401 });
  }

  console.log(backtestOptions);
  let races: Race[] = await getRaces(
    backtestOptions.start_date,
    backtestOptions.end_date,
    backtestOptions.min_odds ?? 1,
    backtestOptions.max_odds ?? 10,
    backtestOptions.barriers.min_barrier ?? 0,
    backtestOptions.barriers.max_barrier ?? 100,
    backtestOptions.track_condition.min.value ?? 0,
    backtestOptions.track_condition.max.value ?? 100,
    backtestOptions.selected_tracks
  );

  console.log(races.length);

  // Fill in the null values with a 0
  races = races.map((race) => {
    return {
      ...race,
      l200rank: race.l200rank ?? 0,
      l400rank: race.l400rank ?? 0,
      l600rank: race.l600rank ?? 0,
      barrier: race.barrier ?? 100,
      trackcondition: race.trackcondition ?? 0,
    };
  });

  races = races.filter((race) => {
    return (
      (race.barrier ?? 0) >= (backtestOptions.barriers.min_barrier ?? 0) &&
      (race.barrier ?? 0) <= (backtestOptions.barriers.max_barrier ?? 100)
    );
  });

  if (backtestOptions.speed_ratings[200].type === "Over") {
    races = races.filter(
      (race) =>
        (race.l200rank ?? 0) >= (backtestOptions.speed_ratings[200].value ?? 0)
    );
  } else {
    races = races.filter(
      (race) =>
        (race.l200rank ?? 20) <= (backtestOptions.speed_ratings[200].value ?? 0)
    );
  }

  if (backtestOptions.speed_ratings[400].type === "Over") {
    races = races.filter(
      (race) =>
        (race.l400rank ?? 0) >= (backtestOptions.speed_ratings[400].value ?? 0)
    );
  } else {
    races = races.filter(
      (race) =>
        (race.l400rank ?? 20) <= (backtestOptions.speed_ratings[400].value ?? 0)
    );
  }

  if (backtestOptions.speed_ratings[600].type === "Over") {
    races = races.filter(
      (race) =>
        (race.l600rank ?? 0) >= (backtestOptions.speed_ratings[600].value ?? 0)
    );
  } else {
    races = races.filter(
      (race) =>
        (race.l600rank ?? 20) <= (backtestOptions.speed_ratings[600].value ?? 0)
    );
  }

  if (backtestOptions.early_settle_position.type === "Over") {
    races = races.filter(
      (race) =>
        (race.predicted_settle_position ?? 0) >=
        (backtestOptions.early_settle_position.value ?? 0)
    );
  } else {
    races = races.filter(
      (race) =>
        (race.predicted_settle_position ?? 20) <=
        (backtestOptions.early_settle_position.value ?? 0)
    );
  }

  console.log(races.length);
  const { new_races, total_profit, weekly_avg, winPercent, totalRaces } =
    layOnly(races);
  // console.log(new_races.length);
  console.log(total_profit);

  console.log(`[API] backtest-new completed successfully totalRaces=${totalRaces} totalProfit=${total_profit}`);
  return new Response(
    JSON.stringify({
      new_races,
      total_profit,
      weekly_avg,
      winPercent,
      totalRaces,
    }),
    {
      status: 200,
    }
  );
}
