import { getRaces, layOnly } from "@/lib/backtest";

export interface BacktestParams {
  min_odds: number;
  min_runners: number;
  max_odds: number;
  take_profit: number;
  stop_loss: number;
  lay_only: boolean;
  pass_key: string;
  start_date: string;
  end_date: string;
  jump_price_action: string;
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    min_odds,
    min_runners,
    max_odds,
    take_profit,
    stop_loss,
    pass_key,
    lay_only,
    start_date,
    end_date,
    jump_price_action,
  } = body as BacktestParams;

  if (
    !min_odds ||
    !min_runners ||
    !max_odds ||
    !take_profit ||
    !stop_loss ||
    !pass_key
  ) {
    return new Response("Missing required fields", { status: 400 });
  }

  if (pass_key !== process.env.BACKTEST_PASS_KEY) {
    return new Response("Invalid pass key", { status: 401 });
  }

  const bts = {
    min_odds,
    min_runners,
    max_odds,
    take_profit,
    stop_loss,
    lay_only,
    start_date,
    end_date,
    jump_price_action,
    pass_key,
  };

  const races = {};

  // if (!races || races.length === 0) {
  //   return new Response("No races found", { status: 400 });
  // }

  // // if (races) {
  // //   console.log(races.length);
  // //   // console.log the first 10 races
  // //   console.log(races.slice(0, 10));
  // //   return new Response(JSON.stringify(races), { status: 200 });
  // // }

  // if (bts.lay_only) {
  //   console.log("Lay Only");
  //   const layOnlyRaces = layOnly(races, bts);
  //   console.log(layOnlyRaces.total_profit);
  //   const takeProfitStopLoss = calculateTakeProfitStopLoss(
  //     layOnlyRaces.new_races,
  //     bts
  //   );
  //   console.log("takeProfitStopLoss", takeProfitStopLoss);
  //   return new Response(JSON.stringify(takeProfitStopLoss), {
  //     status: 200,
  //   });
  // }

  // if (bts.jump_price_action === "Back") {
  //   const backRaces = lbwBackUnder(
  //     bts.min_odds,
  //     bts.max_odds,
  //     bts.min_runners,
  //     races
  //   );
  //   const takeProfitStopLoss = calculateTakeProfitStopLoss(
  //     backRaces.new_races,
  //     bts
  //   );
  //   console.log("takeProfitStopLoss", takeProfitStopLoss);
  //   return new Response(JSON.stringify(takeProfitStopLoss), {
  //     status: 200,
  //   });
  // }

  // if (bts.jump_price_action === "Lay") {
  //   const layRaces = lbwBackOver(
  //     bts.min_odds,
  //     bts.max_odds,
  //     bts.min_runners,
  //     races
  //   );
  //   console.log(layRaces.new_races.slice(0, 10));
  //   const takeProfitStopLoss = calculateTakeProfitStopLoss(
  //     layRaces.new_races,
  //     bts
  //   );
  //   console.log("takeProfitStopLoss", takeProfitStopLoss);
  //   return new Response(JSON.stringify(takeProfitStopLoss), {
  //     status: 200,
  //   });
  // }

  console.log("[API] backtest completed successfully");
  return new Response(JSON.stringify(races), { status: 200 });
}
