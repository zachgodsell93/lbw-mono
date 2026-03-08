import axios from "axios";
import moment from "moment";
import { createServiceClient } from "@/utils/supabase/service";
import { log } from "@/lib/cron/logger";

const supabase = createServiceClient();

const LADBROKES_HEADERS = {
  From: "info@laybackandwin.com.au",
  "X-Partner": "Firenze Pty Ltd",
};

async function getMeetings() {
  const { data, error } = await supabase
    .from("ladbrokes_data")
    .select("*")
    .gte("start_time", moment().add(110, "minutes").toISOString())
    .lte("start_time", moment().add(120, "minutes").toISOString())
    .eq("category", "T");

  if (error) {
    log({
      message: "ladbrokesPriceTwo: getMeetings failed",
      status: 500,
      level: "error",
      data: { error },
    });
    return [];
  }
  return data;
}

async function getMeetingsOneMin() {
  const { data, error } = await supabase
    .from("ladbrokes_data")
    .select("*")
    .gte("start_time", moment().add(30, "seconds").toISOString())
    .lte("start_time", moment().add(90, "seconds").toISOString())
    .eq("category", "T");

  if (error) {
    log({
      message: "ladbrokesPriceTwo: getMeetingsOneMin failed",
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

async function handleRaceData(data: any) {
  try {
    const eventId = data.race.event_id;
    const runners = data.runners;

    if (!runners || runners.length === 0) {
      log({
        message: "ladbrokesPriceTwo: No runners found",
        status: 200,
        level: "warning",
        data: { race: data.race },
      });
      return;
    }

    const cleanedRunners = runners.map((runner: any) => {
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
        price_11am: runner.odds.fixed_win,
        place_11am: runner.odds.fixed_place,
        price_latest: runner.odds.fixed_win,
        place_latest: runner.odds.fixed_place,
        favourite: runner.favourite,
        market_mover: runner.mover,
      };
    });

    const addRunners = await supabase
      .from("ladbrokes_prices")
      .upsert(cleanedRunners, { onConflict: "entrant_id" })
      .select();

    if (addRunners.error) {
      log({
        message: "ladbrokesPriceTwo: upsert error (2min)",
        status: 500,
        level: "error",
        data: { error: addRunners.error },
      });
    }
  } catch (e: any) {
    log({
      message: "ladbrokesPriceTwo: handleRaceData error",
      status: 500,
      level: "error",
      data: { error: e.message ?? e },
    });
  }
}

async function handleRaceDataOneMin(data: any, raceStartTime: string) {
  try {
    const eventId = data.race.event_id;
    const runners = data.runners;
    const capturedAt = new Date().toISOString();

    if (!runners || runners.length === 0) {
      log({
        message: "ladbrokesPriceTwo: No runners found (1min)",
        status: 200,
        level: "warning",
        data: { race: data.race },
      });
      return;
    }

    const cleanedRunners = runners.map((runner: any) => {
      return {
        entrant_id: runner.entrant_id,
        event_id: eventId,
        price_1min: runner.odds.fixed_win,
        place_1min: runner.odds.fixed_place,
        price_1min_captured_at: capturedAt,
        race_start_time: raceStartTime,
      };
    });

    const addRunners = await supabase
      .from("ladbrokes_prices")
      .upsert(cleanedRunners, { onConflict: "entrant_id" })
      .select();

    if (addRunners.error) {
      log({
        message: "ladbrokesPriceTwo: upsert error (1min)",
        status: 500,
        level: "error",
        data: { error: addRunners.error },
      });
    }
  } catch (e: any) {
    log({
      message: "ladbrokesPriceTwo: handleRaceDataOneMin error",
      status: 500,
      level: "error",
      data: { error: e.message ?? e },
    });
  }
}

export async function executeLadbrokesPriceTwo(): Promise<void> {
  // 2 minutes out
  const meetings = await getMeetings();
  for (const meeting of meetings) {
    try {
      const raceData = await getRaceData(meeting.event_id);
      await handleRaceData(raceData);
    } catch (e: any) {
      log({
        message: "ladbrokesPriceTwo: race processing error (2min)",
        status: 500,
        level: "error",
        data: { event_id: meeting.event_id, error: e.message ?? e },
      });
    }
  }

  // 1 minute out
  const meetingsOneMin = await getMeetingsOneMin();
  for (const meeting of meetingsOneMin) {
    try {
      const raceData = await getRaceData(meeting.event_id);
      await handleRaceDataOneMin(raceData, meeting.start_time);
    } catch (e: any) {
      log({
        message: "ladbrokesPriceTwo: race processing error (1min)",
        status: 500,
        level: "error",
        data: { event_id: meeting.event_id, error: e.message ?? e },
      });
    }
  }

  log({
    message: "ladbrokesPriceTwo: finished processing all meetings",
    status: 200,
    level: "info",
    data: { meetings2min: meetings.length, meetings1min: meetingsOneMin.length },
  });
}
