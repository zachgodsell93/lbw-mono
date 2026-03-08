import axios from "axios";
import moment from "moment";
import { createServiceClient } from "@/utils/supabase/service";
import { log } from "@/lib/cron/logger";

const supabase = createServiceClient();

const LADBROKES_HEADERS = {
  From: "info@laybackandwin.com.au",
  "X-Partner": "Firenze Pty Ltd",
};

function getSydneyHour(): string {
  const sydneyHour = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Australia/Sydney" })
  ).getHours();
  return sydneyHour.toString().padStart(2, "0");
}

async function getMeetings() {
  const { data, error } = await supabase
    .from("ladbrokes_data")
    .select("*")
    .eq(
      "meeting_date",
      moment().add(599, "minutes").format("YYYY-MM-DD")
    )
    .eq("category", "T");

  if (error) {
    log({
      message: "getLadbrokesPrices: getMeetings failed",
      status: 500,
      level: "error",
      data: { error },
    });
    return [];
  }
  return data;
}

async function getRaceData(eventId: string) {
  const url = `https://api-affiliates.ladbrokes.com.au/affiliates/v1/racing/events/${eventId}`;
  const response = await axios.get(url, { headers: LADBROKES_HEADERS });
  return response.data.data;
}

async function handleRaceData(data: any, time: string) {
  try {
    const eventId = data.race.event_id;
    const runners = data.runners;

    if (!runners || runners.length === 0) {
      log({
        message: "getLadbrokesPrices: No runners found",
        status: 200,
        level: "warning",
        data: { race: data.race },
      });
      return;
    }

    const results = data.results;

    const cleanedRunners = runners.map((runner: any) => {
      if (time === "09") {
        return {
          entrant_id: runner.entrant_id,
          event_id: eventId,
          market_name: runner.market_name,
          is_scratched: runner.is_scratched,
          runner_name: runner.name.replace(/[^a-zA-Z ]/g, ""),
          barrier: runner.barrier,
          runner_number: runner.runner_number,
          price_open: runner.flucs_with_timestamp.open.fluc,
          flucs: `${runner.flucs}`,
          price_9am: runner.odds.fixed_win,
          place_9am: runner.odds.fixed_place,
          price_latest: runner.odds.fixed_win,
          place_latest: runner.odds.fixed_place,
          favourite: runner.favourite,
          market_mover: runner.mover,
        };
      } else {
        let runnerPos = null;
        try {
          runnerPos =
            results?.filter((result: any) => result.name === runner.name)
              .length > 0
              ? results.filter((result: any) => result.name === runner.name)[0]
                  .position
              : null;
        } catch (e) {
          console.warn(e);
        }

        return {
          entrant_id: runner.entrant_id,
          event_id: eventId,
          market_name: runner.market_name,
          is_scratched: runner.is_scratched,
          runner_name: runner.name.replace(/[^a-zA-Z ]/g, ""),
          barrier: runner.barrier,
          runner_number: runner.runner_number,
          price_open: runner.flucs_with_timestamp.open.fluc,
          flucs: `${runner.flucs}`,
          price_latest: runner.odds.fixed_win,
          place_latest: runner.odds.fixed_place,
          favourite: runner.favourite,
          market_mover: runner.mover,
          result: runnerPos
            ? runnerPos === 1
              ? "WINNER"
              : runnerPos === 2 || runnerPos === 3
              ? "PLACE"
              : "LOSER"
            : null,
        };
      }
    });

    const addRunners = await supabase
      .from("ladbrokes_prices")
      .upsert(cleanedRunners, { onConflict: "entrant_id" })
      .select();

    if (addRunners.error) {
      log({
        message: "getLadbrokesPrices: upsert error",
        status: 500,
        level: "error",
        data: { error: addRunners.error },
      });
    }
  } catch (e: any) {
    log({
      message: "getLadbrokesPrices: handleRaceData error",
      status: 500,
      level: "error",
      data: { error: e.message ?? e },
    });
  }
}

export async function executeLadbrokesPrices(): Promise<void> {
  const hour = getSydneyHour();

  const meetings = await getMeetings();
  if (meetings.length === 0) return;

  for (const meeting of meetings) {
    try {
      const race = await getRaceData(meeting.event_id);
      await handleRaceData(race, hour);
    } catch (e: any) {
      log({
        message: "getLadbrokesPrices: race processing error",
        status: 500,
        level: "error",
        data: { event_id: meeting.event_id, error: e.message ?? e },
      });
    }
  }

  log({
    message: "getLadbrokesPrices: finished processing all meetings",
    status: 200,
    level: "info",
    data: { meetingsProcessed: meetings.length },
  });
}
