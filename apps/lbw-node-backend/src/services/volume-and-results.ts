import axios from "axios";
import moment from "moment";
import { supabase } from "../lib/supabase";
import { log } from "../lib/logger";
import { BETFAIR_APP_KEY, BETFAIR_API_URL } from "../lib/constants";

async function getJohn() {
  const { data, error } = await supabase
    .from("user_information_full")
    .select("*")
    .eq("email", "john@laybackandwin.com.au");

  if (error) {
    log({
      message: "getVolumeAndResults: getJohn failed",
      status: 500,
      level: "error",
      data: { error },
    });
    return null;
  }
  return data[0];
}

// Races starting in next 30 min or up to 1 min ago (volume snapshots)
async function getVolumeRaces() {
  const startTime = moment()
    .utc()
    .subtract(1, "minutes")
    .format("YYYY-MM-DDTHH:mm:00Z");
  const endTime = moment()
    .utc()
    .add(30, "minutes")
    .format("YYYY-MM-DDTHH:mm:00Z");

  const { data, error } = await supabase
    .from("betfair_market_data")
    .select("*")
    .gte("market_start_time", startTime)
    .lte("market_start_time", endTime);

  if (data && data.length > 0) {
    return data.map((race: any) => race.market_id);
  } else {
    if (error) {
      log({
        message: "getVolumeAndResults: getVolumeRaces failed",
        status: 500,
        level: "error",
        data: { error },
      });
    }
    return null;
  }
}

// Races from last 20 minutes (for settling results)
async function getSettledRaces() {
  const startTime = moment()
    .utc()
    .subtract(20, "minutes")
    .format("YYYY-MM-DDTHH:mm:00Z");

  const { data, error } = await supabase
    .from("betfair_market_data")
    .select("*")
    .gte("market_start_time", startTime)
    .lte("market_start_time", moment().utc().format("YYYY-MM-DDTHH:mm:00Z"));

  if (data && data.length > 0) {
    return data.map((race: any) => race.market_id);
  } else {
    if (error) {
      log({
        message: "getVolumeAndResults: getSettledRaces failed",
        status: 500,
        level: "error",
        data: { error },
      });
    }
    return null;
  }
}

async function betfairBettingRequest(
  accessToken: string,
  requestMethod: string,
  paramData: any
) {
  log({
    message: "getVolumeAndResults: betfair request",
    status: 200,
    level: "info",
    data: {
      method: requestMethod,
      tokenPreview: accessToken
        ? `${accessToken.slice(0, 4)}...${accessToken.slice(-4)}`
        : "MISSING",
      marketIdCount: paramData?.marketIds?.length ?? 0,
    },
  });

  const headers = {
    "X-Application": BETFAIR_APP_KEY,
    Authorization: `BEARER ${accessToken}`,
    Accept: "application/json",
  };
  const data = {
    jsonrpc: "2.0",
    method: `SportsAPING/v1.0/${requestMethod}`,
    params: paramData,
  };

  try {
    const response = await axios.post(BETFAIR_API_URL, data, { headers });
    return response.data;
  } catch (err: any) {
    log({
      message: "getVolumeAndResults: betfair request failed",
      status: err.response?.status ?? 500,
      level: "error",
      data: {
        httpStatus: err.response?.status,
        responseBody: err.response?.data,
        method: requestMethod,
      },
    });
    throw err;
  }
}

async function fetchMarketBooks(accessToken: string, marketIds: string[]) {
  const marketBook = await betfairBettingRequest(
    accessToken,
    "listMarketBook",
    {
      marketIds: marketIds,
      priceProjection: {
        priceData: ["EX_BEST_OFFERS", "EX_TRADED"],
      },
    }
  );

  return marketBook.result;
}

export async function executeVolumeAndResults(): Promise<void> {
  const john = await getJohn();
  if (!john) return;

  const accessToken = john.betfair_access_token;
  if (!accessToken) {
    log({
      message: "getVolumeAndResults: no access token",
      status: 400,
      level: "warning",
      data: {},
    });
    return;
  }

  log({
    message: "getVolumeAndResults: token info",
    status: 200,
    level: "info",
    data: {
      tokenLastRefresh: john.token_last_refresh ?? "unknown",
      email: john.email,
    },
  });

  // 1. Volume data for upcoming races (30 min pre-race to 1 min post-jump)
  const volumeMarketIds = await getVolumeRaces();
  if (volumeMarketIds && volumeMarketIds.length > 0) {
    const volumeResults = await fetchMarketBooks(accessToken, volumeMarketIds);
    if (volumeResults) {
      for (const market of volumeResults) {
        if (!market.runners) continue;
        const raceTotalMatched = market.totalMatched || 0;

        const runnerData = market.runners.map((runner: any) => {
          const selectionMatched = runner.totalMatched || 0;
          const percentage =
            raceTotalMatched > 0
              ? (selectionMatched / raceTotalMatched) * 100
              : 0;
          let bab = 0;
          let bal = 0;
          try {
            bab = runner.ex?.availableToBack?.[0]?.price || 0;
            bal = runner.ex?.availableToLay?.[0]?.price || 0;
          } catch {
            // prices unavailable
          }
          return {
            selectionId: runner.selectionId,
            selectionMatched,
            percentage,
            bab,
            bal,
            status: runner.status,
          };
        });

        // Sort by percentage descending to assign rank
        runnerData.sort(
          (a: any, b: any) => b.percentage - a.percentage
        );

        for (let i = 0; i < runnerData.length; i++) {
          const runner = runnerData[i];
          const upsertData: any = {
            selection_id: runner.selectionId,
            market_id: market.marketId,
            bab: runner.bab,
            bal: runner.bal,
            race_total_matched: raceTotalMatched,
            selection_matched: runner.selectionMatched,
            percentage: runner.percentage,
            rank: i + 1,
          };

          // Only set result when status is terminal (not ACTIVE)
          if (runner.status !== "ACTIVE") {
            upsertData.result = runner.status;
          }

          const { error } = await supabase
            .from("selection_volume_and_prices")
            .upsert(upsertData, { onConflict: "selection_id,market_id" });

          if (error) {
            log({
              message: "getVolumeAndResults: upsert volume failed",
              status: 500,
              level: "error",
              data: {
                error,
                selectionId: runner.selectionId,
                marketId: market.marketId,
              },
            });
          }
        }
      }

      log({
        message: "getVolumeAndResults: volume data processed",
        status: 200,
        level: "info",
        data: { marketsProcessed: volumeResults.length },
      });
    }
  }

  // 2. Results for recently completed races (20 min lookback)
  const settledMarketIds = await getSettledRaces();
  if (settledMarketIds && settledMarketIds.length > 0) {
    const settledResults = await fetchMarketBooks(
      accessToken,
      settledMarketIds
    );
    if (settledResults) {
      for (const market of settledResults) {
        if (!market.runners) continue;

        for (const runner of market.runners) {
          if (runner.status === "ACTIVE") continue;

          const { error } = await supabase
            .from("selection_volume_and_prices")
            .update({ result: runner.status })
            .eq("selection_id", runner.selectionId)
            .eq("market_id", market.marketId);

          if (error) {
            log({
              message: "getVolumeAndResults: update runner result failed",
              status: 500,
              level: "error",
              data: {
                error,
                selectionId: runner.selectionId,
                marketId: market.marketId,
              },
            });
          }
        }
      }

      log({
        message: "getVolumeAndResults: results processed",
        status: 200,
        level: "info",
        data: { marketsProcessed: settledResults.length },
      });
    }
  }
}
