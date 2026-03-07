import moment from "moment";
import axios from "axios";
import { supabase } from "../lib/supabase";
import { log } from "../lib/logger";
import { strategyRef, BETFAIR_APP_KEY, BETFAIR_API_URL } from "../lib/constants";

// ─── Types ───────────────────────────────────────────────────────────

interface MasterSettings {
  id: number;
  active: boolean;
  min_runners: number;
  max_lay: number;
  max_odds_lay: number;
  max_back_price: number;
  min_odds: number;
  stop_loss: string;
  take_profit: string;
  lay_to_price: number;
  [key: string]: any;
}

interface BetfairMarketData {
  market_id: string;
  market_start_time: string;
  race_type: string;
  runner_count: number;
  starter_package_include: boolean;
  [key: string]: any;
}

interface UserFull {
  auth_id: string;
  ud_id: string;
  email: string;
  betfair_access_token: string;
  tbb4_bot: boolean;
  tbb4_package: number;
  tbb4_stake_size: number;
  tbb4_stop_loss: number;
  tbb4_take_profit: number;
  [key: string]: any;
}

interface PricesAndVolumes {
  raceTotalMatched: number;
  selectionId: number;
  totalMatched: number;
  percentage: number;
  BAB: number;
  BAL: number;
}

interface SelectionReturn {
  id: number;
  side: string;
  BAB: number;
  BAL: number;
  stake: number;
  selectionName: string;
  units: number;
}

// ─── Database Queries ────────────────────────────────────────────────

export async function getStarterPackageSettings(): Promise<MasterSettings | null> {
  const { data, error } = await supabase
    .from("tbb4_master_settings")
    .select("*")
    .eq("id", 2);

  if (error) {
    log({ message: "Failed to fetch starter package settings", status: 500, level: "error", data: { error } });
    return null;
  }
  return data[0] as MasterSettings;
}

export async function getStarterPackageUsers(): Promise<UserFull[]> {
  const { data, error } = await supabase
    .from("user_information_full")
    .select("*")
    .neq("betfair_access_token", null)
    .eq("tbb4_bot", true)
    .in("tbb4_package", [1, 2]);

  if (error) {
    log({ message: "Failed to fetch starter package users", status: 500, level: "error", data: { error } });
    return [];
  }
  return data as UserFull[];
}

export async function getBettingSystemUsers(systemId: number): Promise<UserFull[]> {
  const { data: bettingSystemUsers, error: bettingSystemError } = await supabase
    .from("user_betting_system")
    .select("auth_id")
    .eq("system_id", systemId);

  if (bettingSystemError) {
    log({ message: "Failed to fetch betting system users", status: 500, level: "error", data: { error: bettingSystemError, systemId } });
    return [];
  }

  const { data, error } = await supabase
    .from("user_information_full")
    .select("*")
    .neq("betfair_access_token", null)
    .eq("tbb4_bot", true)
    .in(
      "auth_id",
      bettingSystemUsers.map((user: any) => user.auth_id)
    );

  if (error) {
    log({ message: "Failed to fetch user information for betting system", status: 500, level: "error", data: { error, systemId } });
    return [];
  }
  return data as UserFull[];
}

export async function getRace(runnerCount: number): Promise<BetfairMarketData[] | null> {
  const currentTime = moment().utc().format("YYYY-MM-DDTHH:mm:00Z");

  const { data, error } = await supabase
    .from("betfair_market_data")
    .select("*")
    .eq("market_start_time", currentTime)
    .eq("race_type", "Thoroughbred")
    .gte("runner_count", runnerCount);

  if (data && data.length > 0) {
    return data as BetfairMarketData[];
  }
  if (error) {
    log({ message: "Failed to fetch race data", status: 500, level: "error", data: { error, runnerCount } });
  }
  return null;
}

export async function getSelections(marketId: string) {
  const { data, error } = await supabase
    .from("starter_package_selection_overrides")
    .select("*")
    .eq("market_id", marketId)
    .neq("side", "NO BET");

  if (error) {
    log({ message: "Failed to fetch selections", status: 500, level: "error", data: { error, marketId } });
    return [];
  }
  return data;
}

export async function getResults() {
  const today = moment().utc().format("YYYY-MM-DD");
  const { data, error } = await supabase
    .from("order_results_details")
    .select("*")
    .gte("order_placed_time", `${today}T00:00:00.000000Z`)
    .lte("order_placed_time", `${today}T23:59:59.000000Z`);

  return data ?? null;
}

export function getUsersPL(user: UserFull, data: any[]): number {
  const userRes = data.filter((u: any) => u.email === user.email);
  let total = 0;
  for (const item of userRes) {
    total += item.profit ?? 0;
  }
  log({
    message: "User P&L Calculated",
    status: 200,
    level: "info",
    data: { user: user.email, total, stopLoss: user.tbb4_stop_loss * -1, takeProfit: user.tbb4_take_profit },
  });
  return total;
}

// ─── Betfair API ─────────────────────────────────────────────────────

export async function getPricesAndVolume(
  marketId: string,
  accessToken: string,
  maxLay: number
): Promise<PricesAndVolumes[]> {
  const headers = {
    "X-Application": BETFAIR_APP_KEY,
    Authorization: `BEARER ${accessToken}`,
    Accept: "application/json",
  };
  const body = {
    jsonrpc: "2.0",
    method: "SportsAPING/v1.0/listMarketBook",
    params: {
      marketIds: [marketId],
      priceProjection: {
        priceData: ["EX_BEST_OFFERS", "EX_TRADED"],
      },
    },
  };

  try {
    const response = await axios.post(BETFAIR_API_URL, body, { headers });
    const runners = response.data.result[0].runners.filter(
      (runner: any) => runner.status === "ACTIVE"
    );
    const matchedAmount = response.data.result[0].totalMatched;

    const runnerTotalMatched: PricesAndVolumes[] = runners.map((runner: any) => {
      try {
        return {
          raceTotalMatched: matchedAmount,
          selectionId: runner.selectionId,
          totalMatched: runner.totalMatched,
          percentage: (runner.totalMatched / matchedAmount) * 100,
          BAB: runner.ex.availableToBack[0].price,
          BAL: runner.ex.availableToLay[0].price,
        };
      } catch {
        return {
          raceTotalMatched: matchedAmount,
          selectionId: runner.selectionId,
          totalMatched: runner.totalMatched,
          percentage: 0,
          BAB: 0,
          BAL: 0,
        };
      }
    });

    return runnerTotalMatched.sort((a, b) => b.percentage - a.percentage);
  } catch (err: any) {
    log({
      message: "Betfair getPricesAndVolume error",
      status: 500,
      level: "error",
      data: { marketId, error: err.message },
    });
    return [];
  }
}

export async function checkIfRaceHasBet(marketId: string, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_orders_placed")
    .select("market_id")
    .eq("market_id", marketId)
    .eq("user_id", userId);

  if (error) {
    log({ message: "Failed to check existing bets", status: 500, level: "error", data: { error, marketId, userId } });
  }
  return (data?.length ?? 0) > 0;
}

async function getLadbrokesSelection(horseName: string, horseNumber: number) {
  const { data, error } = await supabase
    .from("member_selections_ladbrokes_prices")
    .select("*")
    .eq("runner_name", horseName)
    .eq("runner_number", horseNumber)
    .gte("meeting_date", moment().utc().add(10, "hours").format("YYYY-MM-DD"))
    .eq("is_scratched", false);

  if (data && data.length > 0) {
    return data;
  }
  return null;
}

// ─── Price Calculation ───────────────────────────────────────────────

async function lbwPriceCalculation(
  user: UserFull,
  item: any,
  selections: SelectionReturn[],
  raceVolumeData: PricesAndVolumes[],
  masterSettings: MasterSettings
): Promise<SelectionReturn> {
  log({ message: "LBW Price Calculation", status: 200, level: "debug", data: { item } });

  const [number, ...rest] = item.selection_name.split(" ");
  const horse = rest.join(" ").replace(/[^a-zA-Z ]/g, "");
  log({ message: "Parsed Selection", status: 200, level: "debug", data: { number, horse } });
  const hn = parseInt(item.selection_name.split(".")[0]);
  const lb = await getLadbrokesSelection(horse, hn);

  const lbPrice = parseFloat(item.lbw_price);
  if (!lb || lb.length === 0) {
    log({
      message: "Cant find Selection for LBW Price Calc",
      status: 500,
      level: "error",
      data: { user: user.email, selections, horse, number },
    });
    return selections as any;
  }

  const jumpPrice = lb[0].price_jump;
  if (jumpPrice === 0 || !jumpPrice) {
    log({
      message: "Jump Price is not available",
      status: 500,
      level: "error",
      data: { user: user.email, selections, horse, number },
    });
    return selections as any;
  }

  log({
    message: "Jump Price",
    status: 200,
    level: "info",
    data: { user: user.email, selections, horse, number, jumpPrice },
  });

  const side = lbPrice > lb[0].price_jump ? "BACK" : "LAY";

  const volumeEntry = raceVolumeData.find((v) => v.selectionId === item.selection_id);
  if (!volumeEntry) {
    log({
      message: "No volume data for selection",
      status: 500,
      level: "error",
      data: { user: user.email, selectionId: item.selection_id },
    });
    return selections as any;
  }

  const { BAL, BAB } = volumeEntry;
  const layToPrice = masterSettings.lay_to_price;
  let stake: number;
  if (side === "LAY") {
    stake = user.tbb4_stake_size * Math.ceil(layToPrice / BAL);
  } else {
    stake = user.tbb4_stake_size * Math.ceil(layToPrice / BAB);
  }

  return { id: item.selection_id, side, BAB, BAL, stake, selectionName: item.selection_name, units: item.units };
}

// ─── Selection Processing ────────────────────────────────────────────

async function processSelections(
  user: UserFull,
  item: any,
  raceVolumeData: PricesAndVolumes[],
  masterSettings: MasterSettings
): Promise<SelectionReturn[]> {
  const selections: SelectionReturn[] = [];

  if (item.side.toLowerCase() === "lbw") {
    const lbwSelection = await lbwPriceCalculation(
      user,
      item,
      selections,
      raceVolumeData,
      masterSettings
    );
    if (lbwSelection) selections.push(lbwSelection);
  } else if (["back", "lay"].includes(item.side.toLowerCase())) {
    const volumeEntry = raceVolumeData.find((v) => v.selectionId === item.selection_id);
    if (!volumeEntry) {
      log({
        message: "No volume data for selection",
        status: 500,
        level: "error",
        data: { user: user.email, selectionId: item.selection_id },
      });
      return selections;
    }

    const { BAB, BAL } = volumeEntry;
    const layToPrice = masterSettings.lay_to_price;
    const priceForStake = item.side.toLowerCase() === "lay" ? BAL : BAB;
    const stake = user.tbb4_stake_size * Math.ceil(layToPrice / priceForStake);

    selections.push({
      id: item.selection_id,
      side: item.side,
      BAB,
      BAL,
      stake,
      selectionName: item.selection_name,
      units: item.units,
    });
  }

  log({
    message: "Selection Processed",
    status: 200,
    level: "info",
    data: { side: item.side.toLowerCase(), user: user.email, selection: item },
  });

  return selections;
}

// ─── Order Placement ─────────────────────────────────────────────────

async function placeOrder(
  accessToken: string,
  marketId: string,
  selectionId: number,
  price: number,
  size: number,
  side: string,
  customerRef: string,
  greyhound: boolean = false
) {
  log({
    message: "Place Order Request",
    status: 200,
    level: "debug",
    data: { marketId, selectionId, price, size, side, customerRef },
  });

  const headers = {
    "X-Application": BETFAIR_APP_KEY,
    Authorization: `BEARER ${accessToken}`,
    Accept: "application/json",
  };

  const body = {
    jsonrpc: "2.0",
    method: "SportsAPING/v1.0/placeOrders",
    params: {
      marketId,
      customerStrategyRef: customerRef,
      instructions: [
        {
          selectionId,
          handicap: 0,
          side,
          orderType: "LIMIT",
          limitOrder: {
            size,
            price,
            persistenceType: "MARKET_ON_CLOSE",
          },
        },
      ],
    },
  };

  const response = await axios.post(BETFAIR_API_URL, body, { headers });
  log({
    message: "Place Order Response",
    status: 200,
    level: "info",
    data: { order: body.params, response: response.data },
  });
  return response.data;
}

async function placeBets(
  user: UserFull,
  race: BetfairMarketData,
  selections: SelectionReturn[],
  masterSettings: MasterSettings
) {
  await Promise.all(
    selections.map(async (s) => {
      if (
        (s.side === "LAY" &&
          (s.BAL > masterSettings.max_odds_lay || s.BAL < masterSettings.min_odds)) ||
        (s.side === "BACK" &&
          (s.BAB > masterSettings.max_back_price || s.BAB < masterSettings.min_odds))
      ) {
        log({
          message: "Odds out of range",
          status: 200,
          level: "info",
          data: { odds: s.BAB, user: user.email, race, selection: s },
        });
        return;
      }

      const price = s.side === "BACK" ? s.BAB : s.BAL;
      log({
        message: "Placing Order",
        status: 200,
        level: "info",
        data: {
          user: user.email,
          selection_name: s.selectionName,
          side: s.side,
          stake: s.stake,
          units: s.units,
          price,
          market_id: race.market_id,
        },
      });

      const order = await placeOrder(
        user.betfair_access_token,
        race.market_id,
        s.id,
        price,
        s.stake,
        s.side,
        strategyRef,
        race.race_type === "Greyhound"
      );

      const orderPlacedData = order.result.instructionReports[0];
      log({
        message: "Order Placed",
        status: 200,
        level: "info",
        data: {
          user: user.email,
          selection_name: s.selectionName,
          stake: s.stake,
          units: s.units,
          race,
          order: orderPlacedData,
        },
      });

      await supabase.from("user_orders_placed").insert({
        user_id: user.ud_id,
        bet_id: orderPlacedData.betId,
        selection_id: orderPlacedData.instruction.selectionId,
        side: orderPlacedData.instruction.side,
        market_id: order.result.marketId,
        price: orderPlacedData.instruction.limitOrder.price,
        stake: orderPlacedData.instruction.limitOrder.size,
        placed_date: orderPlacedData.placedDate,
        customer_strategy_ref: strategyRef,
        percentage: (s as any).percentage,
        status: orderPlacedData.status,
        order_status: orderPlacedData.orderStatus,
      });
    })
  );
}

// ─── Main Orchestration ──────────────────────────────────────────────

async function placeBetsForTrendLbwUsers(
  users: UserFull[],
  race: BetfairMarketData,
  selection: any,
  masterSettings: MasterSettings
) {
  if (!race.starter_package_include) {
    log({
      message: "Race Not Included",
      level: "info",
      status: 200,
      data: { race },
    });
    return;
  }

  const results = await getResults();
  const startTime = new Date();

  const userPromises = users.map(async (user) => {
    try {
      log({
        message: "Processing User",
        status: 200,
        level: "info",
        data: { user: user.email, market_id: race.market_id },
      });

      const betPlaced = await checkIfRaceHasBet(race.market_id, user.ud_id);
      if (betPlaced) {
        log({
          message: "Bet Already Placed on this race",
          status: 200,
          level: "info",
          data: { user: user.email, race },
        });
        return;
      }

      const raceVolumeData = await getPricesAndVolume(
        race.market_id,
        user.betfair_access_token,
        masterSettings.max_lay
      );

      if (raceVolumeData.length < masterSettings.min_runners) {
        log({
          message: "Not Enough Runners",
          level: "info",
          status: 200,
          data: { user: user.email, race, runners: raceVolumeData.length },
        });
        return;
      }

      const profit = getUsersPL(user, results ?? []);
      if (
        profit <= parseInt(masterSettings.stop_loss) * user.tbb4_stake_size * -1 ||
        profit >= parseInt(masterSettings.take_profit) * user.tbb4_stake_size ||
        profit <= user.tbb4_stop_loss * -1 ||
        profit >= user.tbb4_take_profit
      ) {
        log({
          message: "User Hit SL or PL",
          status: 200,
          level: "info",
          data: {
            user: user.email,
            race,
            stopLoss: user.tbb4_stop_loss,
            takeProfit: user.tbb4_take_profit,
            currentProfit: profit,
          },
        });
        return;
      }

      const selections = await processSelections(
        user,
        selection,
        raceVolumeData,
        masterSettings
      );
      await placeBets(user, race, selections, masterSettings);
    } catch (err: any) {
      log({
        message: err.message || "Error",
        status: 500,
        level: "error",
        data: { user: user.email, race, details: err },
      });
    }
  });

  await Promise.all(userPromises);

  const endTime = new Date();
  const timeDifference = endTime.getTime() - startTime.getTime();

  log({
    message: "Time to complete",
    level: "info",
    status: 200,
    data: {
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      timeDifference: `${timeDifference}ms`,
    },
  });
}

// ─── Top-level Executor ──────────────────────────────────────────────

export async function executeStarterPackage(): Promise<boolean> {
  log({
    message: "starterPackageExecute: starting",
    status: 200,
    level: "info",
    data: { timestamp: new Date().toISOString() },
  });

  const settings = await getStarterPackageSettings();
  if (!settings) {
    log({
      message: "starterPackageExecute: exiting - no settings found",
      status: 200,
      level: "warning",
      data: {},
    });
    return false;
  }
  if (settings.active === false) {
    log({
      message: "starterPackageExecute: exiting - settings inactive",
      status: 200,
      level: "warning",
      data: { settingsId: settings.id },
    });
    return false;
  }

  log({
    message: "starterPackageExecute: settings loaded",
    status: 200,
    level: "info",
    data: {
      active: settings.active,
      min_runners: settings.min_runners,
      max_lay: settings.max_lay,
      max_odds_lay: settings.max_odds_lay,
      min_odds: settings.min_odds,
      stop_loss: settings.stop_loss,
      take_profit: settings.take_profit,
    },
  });

  // Get users: package users + betting system users, deduplicated
  const packageUsers = await getStarterPackageUsers();
  const bettingSystemUsers = await getBettingSystemUsers(2);
  const users = [...packageUsers, ...bettingSystemUsers].filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.auth_id === obj.auth_id)
  );

  if (users.length === 0) {
    log({
      message: "starterPackageExecute: exiting - no eligible users found",
      status: 200,
      level: "warning",
      data: { packageUsers: packageUsers.length, bettingSystemUsers: bettingSystemUsers.length },
    });
    return false;
  }

  log({
    message: "starterPackageExecute: users loaded",
    status: 200,
    level: "info",
    data: {
      packageUsers: packageUsers.length,
      bettingSystemUsers: bettingSystemUsers.length,
      totalUniqueUsers: users.length,
      userEmails: users.map((u) => u.email),
    },
  });

  const currentTime = moment().utc().format("YYYY-MM-DDTHH:mm:00Z");
  const races = await getRace(settings.min_runners);
  if (!races) {
    log({
      message: "starterPackageExecute: exiting - no races found at current time",
      status: 200,
      level: "info",
      data: { currentTimeUTC: currentTime, min_runners: settings.min_runners },
    });
    return false;
  }

  log({
    message: "starterPackageExecute: races found",
    status: 200,
    level: "info",
    data: {
      raceCount: races.length,
      races: races.map((r) => ({
        market_id: r.market_id,
        race_type: r.race_type,
        market_start_time: r.market_start_time,
        runner_count: r.runner_count,
        starter_package_include: r.starter_package_include,
      })),
    },
  });

  const selections = await getSelections(races[0].market_id);
  if (selections.length === 0) {
    log({
      message: "starterPackageExecute: exiting - no selections found for race",
      status: 200,
      level: "warning",
      data: { market_id: races[0].market_id },
    });
    return false;
  }

  // Race found — log from here onwards
  log({
    message: "Starter Package Execute Started",
    status: 200,
    level: "info",
    data: {
      timestamp: new Date().toISOString(),
      userCount: users.length,
      market_id: races[0].market_id,
      race_type: races[0].race_type,
      market_start_time: races[0].market_start_time,
    },
  });

  for (const selection of selections) {
    log({
      message: "Selection Chosen",
      status: 200,
      level: "info",
      data: {
        selection_name: selection.selection_name,
        side: selection.side,
        units: selection.units,
        selection_id: selection.selection_id,
        market_id: selection.market_id,
      },
    });
  }

  // Process all races and selections with proper awaiting
  await Promise.all(
    races.map(async (race) => {
      log({ message: "Started placing orders", status: 200, level: "info", data: { market_id: race.market_id, selectionCount: selections.length } });
      await Promise.all(
        selections.map(async (selection) => {
          await placeBetsForTrendLbwUsers(users, race, selection, settings);
        })
      );
    })
  );

  log({
    message: "starterPackageExecute: completed successfully",
    status: 200,
    level: "info",
    data: {
      racesProcessed: races.length,
      selectionsProcessed: selections.length,
      usersProcessed: users.length,
    },
  });

  return true;
}
