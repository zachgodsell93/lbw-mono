import axios from "axios";
import { supabase, supabaseKey } from "./supabase/client";

export async function betfairAccountRequest(
  accessToken: string,
  apiEndpoint: string,
  betfairData: any
) {
  const url = "https://sb.laybackandwin.au/functions/v1/betfairAccountRequest";

  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6c3BjdG55eW1kZ3Jlb3htb2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM2MTg1OTAsImV4cCI6MjAwOTE5NDU5MH0.QPi1YUJc8WolXyoMGJWuzDa9x2jGAd794mElafHWecM",
    "Content-Type": "application/json",
  };
  const data = {
    accessToken: accessToken,
    requestMethod: apiEndpoint,
    betfairData: betfairData,
  };

  var config = {
    method: "post",
    url: url,
    headers: headers,
    data: data,
    // crossdomain: true,
  };
  try {
    let d = await axios(config);
    if (d.status !== 200) return;

    return d;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const getRunnerData = async (
  token: string,
  marketId: string,
  selectionId: string
) => {
  let config = {
    url: "https://sb.laybackandwin.au/functions/v1/betfairBettingRequest",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + supabaseKey,
    },
    data: {
      accessToken: token,
      requestMethod: "listMarketCatalogue",
      betfairData: {
        filter: {
          marketIds: [marketId],
        },
        marketProjection: [
          "MARKET_DESCRIPTION",
          "RUNNER_DESCRIPTION",
          "RUNNER_METADATA",
        ],
        maxResults: 1,
      },
    },
  };
  try {
    let d = await axios(config);
    if (d.status !== 200) return;
    let market = d.data.result[0];
    let runners = d.data.result[0].runners;
    let runnerData = runners.filter(
      (item: any) => item.selectionId === selectionId
    )[0];
    // console.log(market);
    return {
      // venue: market.venue,
      marketName: market.marketName,
      runnerName: runnerData.runnerName,
      silkUrl: runnerData.metadata.COLOURS_FILENAME,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getUnsettled = async (user: any) => {
  let token = user?.betfair_access_token;
  if (!token) return;
  let config = {
    url: "https://sb.laybackandwin.au/functions/v1/betfairBettingRequest",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + supabaseKey,
    },
    data: {
      accessToken: token,
      requestMethod: "listCurrentOrders",
      betfairData: {
        orderBy: "BY_PLACE_TIME",
        customerStrategyRefs: ["TBB4-TEST"],
        orderProjection: "ALL",
      },
    },
  };
  try {
    let d = await axios(config);
    if (d.data.error) return;
    if (d.status !== 200) return;
    let currentOrders = d.data.result.currentOrders;
    //   console.log(currentOrders);
    var co = await Promise.all(
      currentOrders.map(async (item: any, index: number) => {
        const { data, error } = await supabase
          .from("betfair_market_data")
          .select("venue, market_id")
          .eq("market_id", item.marketId)
          .limit(1);
        if (error) {
          return;
        }
        if (!data[0]) return;
        const venue = data[0].venue;

        let runnerData = await getRunnerData(
          token,
          item.marketId,
          item.selectionId
        );
        if (!runnerData) return;
        return {
          ...item,
          selection_name: runnerData.runnerName,
          market_name: runnerData.marketName,
          race_number: runnerData.marketName.split(" ")[1],
          venue: `${venue} - ${runnerData.marketName.split(" ")[0]}`,
          selection_silks_url: runnerData.silkUrl,
        };
      })
    );

    //   let data = {};
    return co;
  } catch (e) {
    console.log(e);
    return null;
  }

  // console.log(co);
};
